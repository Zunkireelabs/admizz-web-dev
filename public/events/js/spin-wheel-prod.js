// Spin Wheel Demo - Wheel-first flow with anonymous spin, 3-spin gate,
// multi-step conversational form. Forked from spin-wheel.js — keeps the
// rigged prize algorithm and Google Sheets submission identical.
(function () {
    'use strict';

    var STORAGE_COUNT = 'admizz_spin_count';
    var STORAGE_FORM = 'admizz_spin_form_submitted';
    var MAX_FREE_SPINS = 3;
    var SOURCE_TAG = 'AdmizzEdu-Spin-And-Win';
    var THANK_YOU_URL = 'https://admizzeducation.com/thank-you/';

    var SB_URL = 'https://ldsgsdjixzsljgkcktqu.supabase.co/rest/v1/spin_win_leads';
    var SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkc2dzZGppeHpzbGpna2NrdHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NTU1NDEsImV4cCI6MjA4NTMzMTU0MX0.855wGImOj-uNFYSqIyXF-Id4B9dO1siQoT2WdQKxusA';
    var SB_HEADERS = { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY, 'Content-Type': 'application/json' };

    var DESTINATION_FLAGS = {
        'UK': '🇬🇧', 'USA': '🇺🇸', 'Australia': '🇦🇺', 'Canada': '🇨🇦',
        'Denmark': '🇩🇰', 'Finland': '🇫🇮', 'Germany': '🇩🇪', 'India': '🇮🇳',
        'New Zealand': '🇳🇿', 'UAE': '🇦🇪', 'France': '🇫🇷', 'Dubai': '🇦🇪',
        'South Korea': '🇰🇷', 'Nepal': '🇳🇵', 'Japan': '🇯🇵'
    };

    var SCRIPT_URLS = {
        primary: 'https://script.google.com/macros/s/AKfycbxeAGAIM_pZTsgj-7-cqvt__hBfI4wbQRztMVfZ2jaF9LarsRcbl0FRvkco_R8R9KWxkQ/exec',
        secondary: 'https://script.google.com/macros/s/AKfycbwEhcdBi59eIdC45UQ8bHWYuOQYyP929Hipq93d9Rp6ILzRX7ZJCCGH6OoGbn2OPprL/exec',
        nepal: 'https://script.google.com/macros/s/AKfycbx_eRs4VvnE3Mcd2dz8jO6e5E1MzcWmGxfO6vXgYqoubjTkg0DiIq3aARfVkIl8_m3KAg/exec'
    };

    // Same 9 prizes as live, in the same order — keeps rigged algorithm intact
    var PRIZES = [
        { text: 'Laptop',    color: '#4ECDC4' },
        { text: 'Phone',     color: '#FF6B9D' },
        { text: 'Tablet',    color: '#A29BFE' },
        { text: 'Watch',     color: '#C44569' },
        { text: 'Earbuds',   color: '#FCB69F' },
        { text: 'Flight',    color: '#FFA726' },
        { text: 'Movie',     color: '#FF7675' },
        { text: 'Recharge',  color: '#667eea' },
        { text: 'Test Prep', color: '#E056FD' }
    ];
    var NUM_SEGMENTS = PRIZES.length;
    var SEGMENT_ANGLE = (2 * Math.PI) / NUM_SEGMENTS;

    function _sdInit() {
        var canvas = document.getElementById('wheelCanvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');

        var spinBtn = document.getElementById('sdSpinBtn');
        var counterEl = document.getElementById('sdSpinCounter');
        var resultModal = document.getElementById('sdResultModal');
        var resultPrizeEl = document.getElementById('sdResultPrize');
        var spinsLeftEl = document.getElementById('sdSpinsLeft');
        var claimBtn = document.getElementById('sdClaimBtn');
        var tryAgainBtn = document.getElementById('sdTryAgainBtn');
        var formModal = document.getElementById('sdFormModal');
        var formBody = document.getElementById('sdFormBody');
        var formNextBtn = document.getElementById('sdFormNext');
        var formBackBtn = document.getElementById('sdFormBack');
        var formCloseBtn = document.getElementById('sdFormClose');
        var progressEl = document.getElementById('sdProgress');

        var currentRotation = 0;
        var isAnimating = false;
        var lastPrize = '';
        var openModalName = null;
        var historyPushed = false;

        // ---- Storage helpers (graceful in incognito) ----
        function safeGet(key) {
            try { return localStorage.getItem(key); } catch (e) { return null; }
        }
        function safeSet(key, val) {
            try { localStorage.setItem(key, val); } catch (e) { /* ignore */ }
        }
        function getSpinCount() {
            var n = parseInt(safeGet(STORAGE_COUNT) || '0', 10);
            return isNaN(n) ? 0 : n;
        }
        function incrementSpinCount() {
            safeSet(STORAGE_COUNT, String(getSpinCount() + 1));
        }
        function isFormSubmitted() {
            return safeGet(STORAGE_FORM) === 'true';
        }
        function spinsRemaining() {
            return Math.max(0, MAX_FREE_SPINS - getSpinCount());
        }

        // ---- Counter chip UI ----
        function updateCounterChip() {
            if (!counterEl) return;
            var n = spinsRemaining();
            var label;
            if (isFormSubmitted()) {
                label = 'You’re all set!';
                counterEl.dataset.state = 'done';
            } else if (n === 0) {
                label = 'No free spins left';
                counterEl.dataset.state = 'empty';
            } else if (n === 1) {
                label = '1 spin remaining';
                counterEl.dataset.state = 'low';
            } else {
                label = n + ' spins remaining';
                counterEl.dataset.state = 'ok';
            }
            counterEl.textContent = label;
        }

        function updateSpinButtonState() {
            if (!spinBtn) return;
            var done = isFormSubmitted();
            var n = spinsRemaining();
            spinBtn.disabled = done;
            if (done) {
                spinBtn.textContent = 'Spin used';
                spinBtn.classList.remove('is-ready');
            } else if (n === 0) {
                spinBtn.textContent = 'Fill Form to Spin';
                spinBtn.classList.add('is-gated');
            } else {
                spinBtn.textContent = 'SPIN!';
                spinBtn.classList.remove('is-gated');
                spinBtn.classList.add('is-ready');
            }
        }

        // ---- Canvas: responsive size with devicePixelRatio scaling ----
        var cssSize = 340;
        function setupCanvas() {
            cssSize = Math.min(340, Math.max(240, Math.floor(window.innerWidth * 0.8)));
            // On wider screens, cap to 340; on phones, allow down to 240 floor
            var dpr = window.devicePixelRatio || 1;
            canvas.style.width = cssSize + 'px';
            canvas.style.height = cssSize + 'px';
            canvas.width = Math.floor(cssSize * dpr);
            canvas.height = Math.floor(cssSize * dpr);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            drawWheel(currentRotation);
        }

        function drawWheel(rotation) {
            rotation = rotation || 0;
            var size = cssSize;
            var centerX = size / 2;
            var centerY = size / 2;
            var radius = Math.min(centerX, centerY) - 10;

            ctx.clearRect(0, 0, size, size);
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotation);

            for (var i = 0; i < NUM_SEGMENTS; i++) {
                var startAngle = i * SEGMENT_ANGLE - Math.PI / 2;
                var endAngle = startAngle + SEGMENT_ANGLE;

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, radius, startAngle, endAngle);
                ctx.closePath();
                ctx.fillStyle = PRIZES[i].color;
                ctx.fill();

                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.save();
                ctx.rotate(startAngle + SEGMENT_ANGLE / 2);
                ctx.textAlign = 'right';
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 13px Montserrat, sans-serif';
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 2;
                ctx.fillText(PRIZES[i].text, radius - 18, 4);
                ctx.restore();
            }

            // Center hub
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(28, size * 0.11), 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.strokeStyle = '#0066cc';
            ctx.lineWidth = 4;
            ctx.stroke();

            ctx.restore();

            // Outer ring
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 8;
            ctx.stroke();
        }

        // ---- Spin (rigged: same algorithm as live) ----
        function spinWheel(onComplete) {
            isAnimating = true;
            var spinDuration = 5000;

            // Excluded: Laptop (0), Phone (1), Tablet (2). 6 winnable segments.
            var commonSegments = [3, 4, 5, 6, 7, 8];
            var targetSegment = commonSegments[Math.floor(Math.random() * commonSegments.length)];

            var segStart = targetSegment * SEGMENT_ANGLE - Math.PI / 2;
            var jitter = (0.2 + Math.random() * 0.6) * SEGMENT_ANGLE;
            var targetR = 3 * Math.PI / 2 - segStart - jitter;
            targetR = ((targetR % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

            var fullRotations = (5 + Math.floor(Math.random() * 4)) * 2 * Math.PI;
            var currentR = currentRotation % (2 * Math.PI);
            if (currentR < 0) currentR += 2 * Math.PI;
            var extraAngle = targetR - currentR;
            if (extraAngle < 0) extraAngle += 2 * Math.PI;

            var totalRotation = fullRotations + extraAngle;
            var targetRotation = currentRotation + totalRotation;
            var startTime = Date.now();
            var startRotation = currentRotation;

            function animate() {
                var elapsed = Date.now() - startTime;
                var progress = Math.min(elapsed / spinDuration, 1);
                var easeOut = 1 - Math.pow(1 - progress, 3);
                currentRotation = startRotation + (targetRotation - startRotation) * easeOut;
                drawWheel(currentRotation);
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    currentRotation = targetRotation;
                    drawWheel(currentRotation);
                    isAnimating = false;
                    onComplete(PRIZES[targetSegment].text);
                }
            }
            requestAnimationFrame(animate);
        }

        // ---- Modal helpers ----
        function lockBodyScroll() { document.body.classList.add('sd-modal-open'); }
        function unlockBodyScroll() { document.body.classList.remove('sd-modal-open'); }

        function openModal(el, name) {
            el.classList.add('is-open');
            el.setAttribute('aria-hidden', 'false');
            openModalName = name;
            lockBodyScroll();
            if (!historyPushed) {
                try { history.pushState({ sdModal: name }, ''); historyPushed = true; } catch (e) {}
            }
        }
        function closeModal(el) {
            el.classList.remove('is-open');
            el.setAttribute('aria-hidden', 'true');
            openModalName = null;
            unlockBodyScroll();
        }
        function closeAllModals() {
            if (resultModal) closeModal(resultModal);
            if (formModal) closeModal(formModal);
        }

        window.addEventListener('popstate', function () {
            if (openModalName) {
                closeAllModals();
                historyPushed = false;
            }
        });

        // ---- Result modal ----
        function showResultModal(prize) {
            lastPrize = prize;
            if (resultPrizeEl) resultPrizeEl.textContent = prize;
            var n = spinsRemaining();
            if (spinsLeftEl) spinsLeftEl.textContent = String(n);
            if (tryAgainBtn) {
                if (n <= 0) {
                    tryAgainBtn.style.display = 'none';
                } else {
                    tryAgainBtn.style.display = '';
                }
            }
            openModal(resultModal, 'result');
        }

        if (claimBtn) {
            claimBtn.addEventListener('click', function () {
                closeModal(resultModal);
                openFormFlow(false);
            });
        }
        if (tryAgainBtn) {
            tryAgainBtn.addEventListener('click', function () {
                closeModal(resultModal);
                // Re-trigger a spin (counter already updated when wheel was spun)
                triggerSpin();
            });
        }
        // Backdrop click on result modal: close, return to hero
        if (resultModal) {
            resultModal.addEventListener('click', function (e) {
                if (e.target === resultModal) closeModal(resultModal);
            });
        }

        // ---- Spin trigger ----
        function triggerSpin() {
            if (isAnimating) return;
            if (isFormSubmitted()) return; // already done
            if (spinsRemaining() <= 0) {
                openFormFlow(true); // gate flow
                return;
            }
            incrementSpinCount();
            updateCounterChip();
            spinWheel(function (prize) {
                updateCounterChip();
                updateSpinButtonState();
                showResultModal(prize);
            });
        }
        if (spinBtn) {
            spinBtn.addEventListener('click', triggerSpin);
        }

        // ---- Multi-step form ----
        var formData = {};
        var currentStep = 0;
        var isGateFlow = false;
        var supabaseLeadId = null;

        var STEPS = [
            { id: 'name',    title: function() { return 'Hi there! 👋 I\'m Pooja. What\'s your name?'; },
              render: renderName, validate: validateName, save: saveName },
            { id: 'email',   title: function() { return 'Nice to meet you, ' + (formData.firstName || 'you') + '! 🎉 Where should I email your prize details?'; },
              render: renderEmail, validate: validateEmail, save: saveEmail },
            { id: 'phone',   title: function() { return 'And what\'s the best phone number to reach you on?'; },
              render: renderPhone, validate: validatePhone, save: savePhone },
            { id: 'city',    title: function() { return 'Got it! Which city are you based in?'; },
              render: renderCity, validate: validateCity, save: saveCity },
            { id: 'destin',  title: function() { return 'Amazing! 🌍 Which country are you dreaming of studying in?'; },
              render: renderDestination, validate: validateRequired('preferedDestination'), save: saveSelect('preferedDestination') },
            { id: 'level',   title: function() { return 'Great choice! What level of study are you aiming for?'; },
              render: renderLevel, validate: validateRequired('studyLevel'), save: saveSelect('studyLevel') },
            { id: 'program', title: function() { return 'Almost there! What program interests you the most?'; },
              render: renderProgram, validate: validateRequired('studyProgram'), save: saveSelect('studyProgram') },
            { id: 'consent', title: function() { return 'Last step, once you confirm & I\'ll make sure your ' + (lastPrize || 'prize') + ' gift reaches you. 🎁'; },
              render: renderConsent, validate: validateConsent, save: saveConsent }
        ];

        function openFormFlow(gateFlow) {
            isGateFlow = !!gateFlow;
            currentStep = 0;
            formData = {};
            supabaseLeadId = null;
            renderStep();
            openModal(formModal, 'form');
        }

        function renderProgress() {
            if (!progressEl) return;
            var pct = Math.round(((currentStep + 1) / STEPS.length) * 100);
            progressEl.innerHTML =
                '<div class="sd-progress-bar-wrap">' +
                    '<div class="sd-progress-bar-fill" style="width:' + pct + '%"></div>' +
                '</div>' +
                '<span class="sd-step-count">Step ' + (currentStep + 1) + ' of ' + STEPS.length + '</span>';
        }

        function renderStep() {
            renderProgress();
            formBody.innerHTML = '';
            var step = STEPS[currentStep];

            var wrap = document.createElement('div');
            wrap.className = 'sd-step';

            // Gate-flow intro shown above the first step only
            if (isGateFlow && currentStep === 0) {
                var intro = document.createElement('div');
                intro.className = 'sd-gate-intro';
                intro.innerHTML =
                    '<div class="sd-gate-prize">You won: <strong>' + escapeHtml(lastPrize || 'a prize') + '</strong></div>' +
                    '<p>You’ve used all 3 free spins. Tell us a bit about yourself to claim your prize.</p>';
                wrap.appendChild(intro);
            }

            // Chat row: avatar + speech bubble
            var chatRow = document.createElement('div');
            chatRow.className = 'sd-chat-row';
            var avatar = document.createElement('div');
            avatar.className = 'sd-chat-avatar';
            avatar.textContent = '🎓';
            chatRow.appendChild(avatar);
            var bubble = document.createElement('div');
            bubble.className = 'sd-chat-bubble';
            bubble.textContent = step.title();
            chatRow.appendChild(bubble);
            wrap.appendChild(chatRow);

            // Reply area
            var replyArea = document.createElement('div');
            replyArea.className = 'sd-reply-area';
            var content = document.createElement('div');
            content.className = 'sd-step-content';
            replyArea.appendChild(content);
            step.render(content);
            var error = document.createElement('div');
            error.className = 'sd-step-error';
            error.id = 'sdStepError';
            replyArea.appendChild(error);
            wrap.appendChild(replyArea);

            formBody.appendChild(wrap);

            // Update navigation buttons
            formBackBtn.style.visibility = currentStep === 0 ? 'hidden' : '';
            formNextBtn.textContent = (currentStep === STEPS.length - 1) ? 'Submit' : 'Continue →';

            // Auto-focus first input (delayed so iOS doesn't fight us)
            setTimeout(function () {
                var firstInput = content.querySelector('input, select, textarea');
                if (firstInput && !('ontouchstart' in window)) firstInput.focus();
            }, 80);
        }

        function showError(msg) {
            var el = document.getElementById('sdStepError');
            if (el) el.textContent = msg || '';
        }

        // Step renderers
        function renderName(c) {
            c.innerHTML =
                '<div class="sd-field-row">' +
                '<input type="text" id="sdFirstName" name="Name" placeholder="First name" autocomplete="given-name" value="' + esc(formData.firstName) + '" required>' +
                '<input type="text" id="sdLastName" name="Last Name" placeholder="Last name" autocomplete="family-name" value="' + esc(formData.lastName) + '" required>' +
                '</div>';
        }
        function renderEmail(c) {
            c.innerHTML =
                '<input type="email" id="sdEmail" name="Email" placeholder="you@example.com" inputmode="email" autocomplete="email" autocapitalize="none" value="' + esc(formData.email) + '" required>' +
                '<label class="sd-input-label">Enter your email here</label>';
        }
        var COUNTRY_LIST = [
            { code: 'NP', dial: '+977', name: 'Nepal', def: true },
            { code: 'IN', dial: '+91',  name: 'India' },
            { code: 'PK', dial: '+92',  name: 'Pakistan' },
            { code: 'BD', dial: '+880', name: 'Bangladesh' },
            { code: 'LK', dial: '+94',  name: 'Sri Lanka' },
            { code: 'GB', dial: '+44',  name: 'United Kingdom' },
            { code: 'US', dial: '+1',   name: 'United States' },
            { code: 'AU', dial: '+61',  name: 'Australia' },
            { code: 'CA', dial: '+1',   name: 'Canada' },
            { code: 'NZ', dial: '+64',  name: 'New Zealand' },
            { code: 'DE', dial: '+49',  name: 'Germany' },
            { code: 'FR', dial: '+33',  name: 'France' },
            { code: 'DK', dial: '+45',  name: 'Denmark' },
            { code: 'FI', dial: '+358', name: 'Finland' },
            { code: 'AE', dial: '+971', name: 'United Arab Emirates' },
            { code: 'SG', dial: '+65',  name: 'Singapore' },
            { code: 'MY', dial: '+60',  name: 'Malaysia' },
            { code: 'TH', dial: '+66',  name: 'Thailand' },
            { code: 'JP', dial: '+81',  name: 'Japan' },
            { code: 'CN', dial: '+86',  name: 'China' }
        ];
        function renderPhone(c) {
            var html = '<div class="sd-field-row sd-phone-row"><select id="sdCountry" name="Country" required>';
            var opts = (window.SD_COUNTRIES && window.SD_COUNTRIES.length > 1 ? window.SD_COUNTRIES : COUNTRY_LIST);
            for (var i = 0; i < opts.length; i++) {
                var o = opts[i];
                var selected = (formData.country ? formData.country : (o.def ? o.code : '')) === o.code ? ' selected' : '';
                html += '<option value="' + esc(o.code) + '" data-code="' + esc(o.dial) + '"' + selected + '>' +
                    esc(o.name) + ' (' + esc(o.dial) + ')</option>';
            }
            html += '</select>';
            html += '<input type="tel" id="sdPhone" name="PhoneNo" placeholder="e.g. 9841234567" inputmode="tel" autocomplete="tel-national" value="' + esc(formData.phone) + '" required>';
            html += '</div>';
            c.innerHTML = html;
        }
        function renderCity(c) {
            c.innerHTML =
                '<input type="text" id="sdCity" name="City" placeholder="e.g. Kathmandu" autocomplete="address-level2" value="' + esc(formData.city) + '" required>';
        }
        function renderDestination(c) {
            renderChips(c, 'preferedDestination', window.SD_DESTINATIONS || [], formData.preferedDestination, DESTINATION_FLAGS);
        }
        function renderLevel(c) {
            renderChips(c, 'studyLevel', window.SD_LEVELS || [], formData.studyLevel, null);
        }
        function renderProgram(c) {
            renderChips(c, 'studyProgram', window.SD_PROGRAMS || [], formData.studyProgram, null);
        }
        function renderConsent(c) {
            c.innerHTML =
                '<label class="sd-consent">' +
                '<input type="checkbox" id="sdTerms"' + (formData.terms ? ' checked' : '') + '>' +
                '<span>I agree to the <a href="https://admizzeducation.com/privacy-policy" target="_blank" rel="noopener noreferrer" class="sd-consent-link">Terms &amp; Conditions</a> and to be contacted by Admizz about my prize.</span>' +
                '</label>';
        }

        function renderChips(c, name, items, current, flagMap) {
            var html = '<input type="hidden" name="' + name + '" value="' + esc(current || '') + '">';
            html += '<div class="sd-chip-group">';
            for (var i = 0; i < items.length; i++) {
                var v = items[i];
                var flag = flagMap ? (flagMap[v] || '') : '';
                var sel = current === v ? ' is-selected' : '';
                html += '<button type="button" class="sd-chip' + sel + '" data-value="' + esc(v) + '">' +
                    (flag ? flag + ' ' : '') + esc(v) + '</button>';
            }
            html += '</div>';
            c.innerHTML = html;
            var hidden = c.querySelector('input[type="hidden"]');
            var chips = c.querySelectorAll('.sd-chip');
            chips.forEach(function (chip) {
                chip.addEventListener('click', function () {
                    chips.forEach(function (ch) { ch.classList.remove('is-selected'); });
                    this.classList.add('is-selected');
                    hidden.value = this.getAttribute('data-value');
                });
            });
        }

        function buildSelect(id, name, placeholder, items, current) {
            var html = '<select id="' + id + '" name="' + name + '" required>';
            html += '<option value="">' + esc(placeholder) + '</option>';
            for (var i = 0; i < items.length; i++) {
                var v = items[i];
                html += '<option value="' + esc(v) + '"' + (current === v ? ' selected' : '') + '>' + esc(v) + '</option>';
            }
            html += '</select>';
            return html;
        }

        // Validators
        function validateName() {
            var fn = (document.getElementById('sdFirstName') || {}).value || '';
            var ln = (document.getElementById('sdLastName') || {}).value || '';
            if (!fn.trim()) return 'Please enter your first name';
            if (!ln.trim()) return 'Please enter your last name';
            return null;
        }
        function validateEmail() {
            var v = ((document.getElementById('sdEmail') || {}).value || '').trim();
            if (!v) return 'Please enter your email';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email';
            return null;
        }
        function validatePhone() {
            var c = ((document.getElementById('sdCountry') || {}).value || '').trim();
            var p = ((document.getElementById('sdPhone') || {}).value || '').trim();
            if (!c) return 'Please pick your country';
            // Strip dial code, ensure at least 6 digits remaining
            var digits = p.replace(/\D/g, '');
            if (digits.length < 7) return 'Please enter a valid phone number';
            return null;
        }
        function validateCity() {
            var v = ((document.getElementById('sdCity') || {}).value || '').trim();
            if (!v) return 'Please enter your city';
            return null;
        }
        function validateRequired(name) {
            return function () {
                var el = document.querySelector('[name="' + name + '"]');
                if (!el || !el.value) return 'Please make a selection';
                return null;
            };
        }
        function validateConsent() {
            var t = document.getElementById('sdTerms');
            if (!t || !t.checked) return 'Please accept the Terms & Conditions to continue';
            return null;
        }

        // Savers
        function saveName() {
            formData.firstName = document.getElementById('sdFirstName').value.trim();
            formData.lastName = document.getElementById('sdLastName').value.trim();
        }
        function saveEmail() { formData.email = document.getElementById('sdEmail').value.trim(); }
        function savePhone() {
            formData.country = document.getElementById('sdCountry').value;
            formData.phone = document.getElementById('sdPhone').value.trim();
        }
        function saveCity() { formData.city = document.getElementById('sdCity').value.trim(); }
        function saveSelect(name) {
            return function () {
                formData[name] = document.querySelector('[name="' + name + '"]').value;
            };
        }
        function saveConsent() { formData.terms = document.getElementById('sdTerms').checked; }

        // ---- Partial capture to Supabase ----
        function syncToSupabase(completedStep) {
            if (completedStep === 1) {
                // After email step — INSERT partial lead
                var payload = {
                    first_name: formData.firstName || '',
                    last_name:  formData.lastName  || '',
                    email:      formData.email     || '',
                    source:     'website',
                    status:     'new'
                };
                fetch(SB_URL, {
                    method: 'POST',
                    headers: Object.assign({}, SB_HEADERS, { 'Prefer': 'return=representation' }),
                    body: JSON.stringify(payload)
                })
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    if (data && data[0] && data[0].id) supabaseLeadId = data[0].id;
                })
                .catch(function(err) { console.warn('Supabase partial insert failed:', err); });

            } else if (supabaseLeadId) {
                // After subsequent steps — UPDATE existing record
                var update = {};
                if (completedStep === 2) { update.country = getCountryName(formData.country); update.phone = formData.phone || ''; }
                if (completedStep === 3) { update.city = formData.city || ''; }
                if (completedStep === 4) { update.preferred_destination = formData.preferedDestination || ''; }
                if (completedStep === 5) { update.study_level = formData.studyLevel || ''; }
                if (completedStep === 6) { update.study_program = formData.studyProgram || ''; }

                if (Object.keys(update).length > 0) {
                    fetch(SB_URL + '?id=eq.' + supabaseLeadId, {
                        method: 'PATCH',
                        headers: Object.assign({}, SB_HEADERS, { 'Prefer': 'return=minimal' }),
                        body: JSON.stringify(update)
                    }).catch(function(err) { console.warn('Supabase partial update failed:', err); });
                }
            }
        }

        // Navigation
        function goNext() {
            var step = STEPS[currentStep];
            var err = step.validate();
            if (err) { showError(err); return; }
            step.save();
            showError('');
            if (currentStep === STEPS.length - 1) {
                submitForm();
            } else {
                var completedStep = currentStep;
                currentStep += 1;
                renderStep();
                syncToSupabase(completedStep);
            }
        }
        function goBack() {
            if (currentStep === 0) return;
            // Save current step's value if possible (best-effort, ignore validation)
            try { STEPS[currentStep].save(); } catch (e) {}
            currentStep -= 1;
            renderStep();
        }

        if (formNextBtn) formNextBtn.addEventListener('click', goNext);
        if (formBackBtn) formBackBtn.addEventListener('click', goBack);
        if (formCloseBtn) formCloseBtn.addEventListener('click', function () { closeModal(formModal); });

        // Allow Enter key on inputs to advance
        if (formBody) {
            formBody.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && e.target && e.target.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    goNext();
                }
            });
        }

        // ---- Save to Supabase ----
        function getCountryName(code) {
            for (var i = 0; i < COUNTRY_LIST.length; i++) {
                if (COUNTRY_LIST[i].code === code) return COUNTRY_LIST[i].name;
            }
            return code || '';
        }

        function saveToSupabase() {
            var payload = {
                first_name:            formData.firstName || '',
                last_name:             formData.lastName  || '',
                email:                 formData.email     || '',
                phone:                 formData.phone     || '',
                country:               getCountryName(formData.country),
                city:                  formData.city      || '',
                preferred_destination: formData.preferedDestination || '',
                study_level:           formData.studyLevel          || '',
                study_program:         formData.studyProgram        || '',
                prize:                 lastPrize || '',
                source:                'website',
                status:                'new'
            };
            var url    = supabaseLeadId ? SB_URL + '?id=eq.' + supabaseLeadId : SB_URL;
            var method = supabaseLeadId ? 'PATCH' : 'POST';
            fetch(url, {
                method: method,
                headers: Object.assign({}, SB_HEADERS, { 'Prefer': 'return=minimal' }),
                body: JSON.stringify(payload)
            }).catch(function (err) {
                console.warn('Supabase save failed:', err);
            });
        }

        // ---- Submit to Google Sheets ----
        function buildPayload() {
            var fd = new FormData();
            fd.append('Name', formData.firstName || '');
            fd.append('Last Name', formData.lastName || '');
            fd.append('Email', formData.email || '');
            fd.append('Country', formData.country || '');
            fd.append('PhoneNo', formData.phone || '');
            fd.append('City', formData.city || '');
            fd.append('preferedDestination', formData.preferedDestination || '');
            fd.append('studyLevel', formData.studyLevel || '');
            fd.append('studyProgram', formData.studyProgram || '');
            fd.append('Prize', lastPrize || '');
            fd.append('Src', SOURCE_TAG);

            var now = new Date();
            fd.append('Date', now.toDateString());
            fd.append('Time', now.toLocaleTimeString());

            var params = new URLSearchParams(window.location.search);
            ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (k) {
                fd.append(k, params.get(k) || '');
            });
            fd.append('referrer_url', document.referrer || 'Direct');
            fd.append('landing_page', window.location.href);
            return fd;
        }

        function submitForm() {
            formNextBtn.disabled = true;
            formNextBtn.textContent = 'Submitting…';
            var fd = buildPayload();
            saveToSupabase();
            var country = formData.country;
            var requests;
            if (country === 'NP') {
                requests = [
                    fetch(SCRIPT_URLS.primary, { method: 'POST', body: fd }),
                    fetch(SCRIPT_URLS.secondary, { method: 'POST', body: fd }),
                    fetch(SCRIPT_URLS.nepal, { method: 'POST', body: fd })
                ];
            } else {
                requests = [
                    fetch(SCRIPT_URLS.primary, { method: 'POST', body: fd }),
                    fetch(SCRIPT_URLS.secondary, { method: 'POST', body: fd })
                ];
            }
            Promise.all(requests).catch(function (err) {
                console.error('Demo form submit error:', err);
            }).finally(function () {
                safeSet(STORAGE_FORM, 'true');
                showSuccessState();
            });
        }

        function showSuccessState() {
            if (progressEl) {
                var fill = progressEl.querySelector('.sd-progress-bar-fill');
                if (fill) fill.style.width = '100%';
                var count = progressEl.querySelector('.sd-step-count');
                if (count) count.textContent = 'Done!';
            }
            formBody.innerHTML =
                '<div class="sd-success">' +
                '<div class="sd-success-icon">🎉</div>' +
                '<h2>You’re all set!</h2>' +
                '<p>We’ll be in touch about your <strong>' + escapeHtml(lastPrize || 'prize') + '</strong>.</p>' +
                '<p class="sd-success-sub">Redirecting you in a moment…</p>' +
                '</div>';
            formNextBtn.style.display = 'none';
            formBackBtn.style.visibility = 'hidden';
            updateCounterChip();
            updateSpinButtonState();
            setTimeout(function () {
                window.location.href = THANK_YOU_URL;
            }, 2500);
        }

        // ---- Utility ----
        function esc(v) {
            if (v === undefined || v === null) return '';
            return String(v).replace(/"/g, '&quot;').replace(/</g, '&lt;');
        }
        function escapeHtml(v) {
            if (v === undefined || v === null) return '';
            return String(v)
                .replace(/&/g, '&amp;').replace(/</g, '&lt;')
                .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        // ---- Init ----
        setupCanvas();
        updateCounterChip();
        updateSpinButtonState();

        // Debounced resize
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setupCanvas, 150);
        });
    }
    // Run immediately if DOM is already ready (e.g. after Next.js hydration),
    // otherwise wait for DOMContentLoaded.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _sdInit);
    } else {
        _sdInit();
    }
})();

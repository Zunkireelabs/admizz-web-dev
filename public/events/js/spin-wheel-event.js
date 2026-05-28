// Spin Wheel - Event Page (Gated Form Version)
function _spinWheelEventInit() {
    const canvas = document.getElementById('wheelCanvas');
    const showFormBtn = document.getElementById('showSpinFormBtn');
    const contentPanel = document.getElementById('spinContentPanel');
    const formPanel = document.getElementById('spinFormPanel');
    const spinningPanel = document.getElementById('spinSpinningPanel');
    const backBtn = document.getElementById('spinBackBtn');
    const spinForm = document.getElementById('spinWheelForm');
    const spinSubmitBtn = document.getElementById('spinSubmitBtn');
    const resultOverlay = document.getElementById('spinResultOverlay');
    const resultModal = document.getElementById('spinResultModal');
    const resultPrize = document.getElementById('spinResultPrize');
    const resultClose = document.getElementById('spinResultClose');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const prizes = [
        { text: 'Laptop', color: '#4ECDC4' },
        { text: 'Phone', color: '#FF6B9D' },
        { text: 'Tablet', color: '#A29BFE' },
        { text: 'Watch', color: '#C44569' },
        { text: 'Earbuds', color: '#FCB69F' },
        { text: 'Flight', color: '#FFA726' },
        { text: 'Movie', color: '#FF7675' },
        { text: 'Recharge', color: '#667eea' },
        { text: 'Test Prep', color: '#E056FD' }
    ];

    const numSegments = prizes.length;
    const segmentAngle = (2 * Math.PI) / numSegments;
    let currentRotation = 0;

    const SCRIPT_URLS = {
        primary: "https://script.google.com/macros/s/AKfycbxeAGAIM_pZTsgj-7-cqvt__hBfI4wbQRztMVfZ2jaF9LarsRcbl0FRvkco_R8R9KWxkQ/exec",
        secondary: "https://script.google.com/macros/s/AKfycbwEhcdBi59eIdC45UQ8bHWYuOQYyP929Hipq93d9Rp6ILzRX7ZJCCGH6OoGbn2OPprL/exec",
        nepal: "https://script.google.com/macros/s/AKfycbx_eRs4VvnE3Mcd2dz8jO6e5E1MzcWmGxfO6vXgYqoubjTkg0DiIq3aARfVkIl8_m3KAg/exec"
    };

    function drawWheel(rotation) {
        rotation = rotation || 0;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        for (let i = 0; i < numSegments; i++) {
            const startAngle = i * segmentAngle - Math.PI / 2;
            const endAngle = startAngle + segmentAngle;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = prizes[i].color;
            ctx.fill();

            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.save();
            ctx.rotate(startAngle + segmentAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px Montserrat, sans-serif';
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 2;
            ctx.fillText(prizes[i].text, radius - 20, 5);
            ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(0, 0, 40, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#0066cc';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.restore();

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 8;
        ctx.stroke();
    }

    drawWheel();

    if (showFormBtn) {
        showFormBtn.addEventListener('click', function() {
            contentPanel.style.display = 'none';
            formPanel.style.display = 'block';
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', function() {
            formPanel.style.display = 'none';
            contentPanel.style.display = 'block';
        });
    }

    const spinCountryCode = document.getElementById('spinCountryCode');
    const spinPhone = document.getElementById('spinPhone');
    if (spinCountryCode && spinPhone) {
        function getSpinDialCode() {
            const opt = spinCountryCode.options[spinCountryCode.selectedIndex];
            return (opt && opt.getAttribute('data-code')) || '';
        }

        const initialCode = getSpinDialCode();
        if (initialCode && !spinPhone.value.startsWith(initialCode)) {
            spinPhone.value = initialCode;
        }

        spinCountryCode.addEventListener('change', function() {
            spinPhone.value = getSpinDialCode();
        });

        spinPhone.addEventListener('input', function() {
            const code = getSpinDialCode();
            if (code && !this.value.startsWith(code)) {
                this.value = code;
            }
        });
    }

    async function submitFormData(prize) {
        const prizeInput = document.getElementById('spin-prize-input');
        if (prizeInput) prizeInput.value = prize;

        const currentDateTime = new Date();
        const dateInput = document.getElementById('spin-date-input');
        const timeInput = document.getElementById('spin-time-input');
        if (dateInput) dateInput.value = currentDateTime.toDateString();
        if (timeInput) timeInput.value = currentDateTime.toLocaleTimeString();

        const urlParams = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(field => {
            const element = document.getElementById('spin-' + field.replace('_', '-'));
            if (element) element.value = urlParams.get(field) || '';
        });

        const referrerInput = document.getElementById('spin-referrer');
        const landingInput = document.getElementById('spin-landing');
        if (referrerInput) referrerInput.value = document.referrer || 'Direct';
        if (landingInput) landingInput.value = window.location.href;

        const formData = new FormData(spinForm);
        const country = document.getElementById('spinCountryCode') ? document.getElementById('spinCountryCode').value : '';

        try {
            if (country === 'NP') {
                await Promise.all([
                    fetch(SCRIPT_URLS.primary, { method: 'POST', body: formData }),
                    fetch(SCRIPT_URLS.secondary, { method: 'POST', body: formData }),
                    fetch(SCRIPT_URLS.nepal, { method: 'POST', body: formData })
                ]);
            } else {
                await Promise.all([
                    fetch(SCRIPT_URLS.primary, { method: 'POST', body: formData }),
                    fetch(SCRIPT_URLS.secondary, { method: 'POST', body: formData })
                ]);
            }
        } catch (error) {
            console.error('Form submission error:', error);
        }
    }

    if (spinForm) {
        spinForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const firstName = document.getElementById('spinFirstName').value.trim();
            const lastName = document.getElementById('spinLastName').value.trim();
            const email = document.getElementById('spinEmail').value.trim();
            const phone = document.getElementById('spinPhone').value.trim();
            const city = document.getElementById('spinCity').value.trim();
            const destination = document.getElementById('spinDestination').value;
            const studyLevel = document.getElementById('spinStudyLevel').value;
            const studyProgram = document.getElementById('spinStudyProgram').value;
            const terms = document.getElementById('spinTerms').checked;

            if (!firstName || !lastName || !email || !phone || !city || !destination || !studyLevel || !studyProgram || !terms) {
                alert('Please fill in all fields and agree to Terms & Conditions');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            spinSubmitBtn.disabled = true;
            spinSubmitBtn.textContent = 'Spinning...';

            formPanel.style.display = 'none';
            spinningPanel.style.display = 'block';

            spinWheel();
        });
    }

    function spinWheel() {
        const spinDuration = 5000;
        var commonSegments = [3, 4, 5, 6, 7, 8];
        var targetSegment = commonSegments[Math.floor(Math.random() * commonSegments.length)];

        var segStart = targetSegment * segmentAngle - Math.PI / 2;
        var jitter = (0.2 + Math.random() * 0.6) * segmentAngle;
        let targetR = 3 * Math.PI / 2 - segStart - jitter;
        targetR = ((targetR % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        const fullRotations = (5 + Math.floor(Math.random() * 4)) * 2 * Math.PI;
        let currentR = currentRotation % (2 * Math.PI);
        if (currentR < 0) currentR += 2 * Math.PI;
        let extraAngle = targetR - currentR;
        if (extraAngle < 0) extraAngle += 2 * Math.PI;

        const totalRotation = fullRotations + extraAngle;
        const targetRotation = currentRotation + totalRotation;

        const startTime = Date.now();
        const startRotation = currentRotation;

        var wheelSection = document.getElementById('spinWheelSection');
        if (wheelSection) {
            wheelSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            currentRotation = startRotation + (targetRotation - startRotation) * easeOut;
            drawWheel(currentRotation);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                currentRotation = targetRotation;
                drawWheel(currentRotation);

                var prize = prizes[targetSegment].text;
                showResult(prize);

                if (resultClose) {
                    resultClose.disabled = true;
                    resultClose.textContent = 'Saving...';
                }
                dataSaved = false;

                submitFormData(prize).finally(function() {
                    dataSaved = true;
                    if (resultClose) {
                        resultClose.disabled = false;
                        resultClose.textContent = 'Continue';
                    }
                });
            }
        }

        requestAnimationFrame(animate);
    }

    var dataSaved = false;

    function showResult(prize) {
        spinningPanel.style.display = 'none';
        contentPanel.style.display = 'block';

        resultPrize.textContent = prize;
        resultOverlay.classList.add('active');
        resultModal.classList.add('active');
    }

    if (resultClose) resultClose.addEventListener('click', closeResultAndRedirect);
    if (resultOverlay) resultOverlay.addEventListener('click', closeResultAndRedirect);

    function closeResultAndRedirect() {
        if (!dataSaved) return;
        resultOverlay.classList.remove('active');
        resultModal.classList.remove('active');
        setTimeout(() => {
            window.location.href = 'https://admizzeducation.com/thank-you/';
        }, 300);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _spinWheelEventInit);
} else {
    _spinWheelEventInit();
}

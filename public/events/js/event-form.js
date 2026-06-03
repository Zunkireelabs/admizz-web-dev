// Event Form JavaScript - Validation & Submission

// ─── Affiliate tracking helpers ──────────────────────────────────────────
// Mirror of src/lib/affiliate/* — we duplicate here so this vanilla-JS file
// stays self-contained. Keys are NEXT_PUBLIC_* equivalents (public by design).
// Read from window if Init component injected them (preferred), else fall back to baked constants.
// The fallback only matters until next deploy — the Init component sets these from NEXT_PUBLIC_* env vars.
var ADMIZZ_SB_URL  = (window.__ADMIZZ_SB_URL  || 'https://ldsgsdjixzsljgkcktqu.supabase.co');
var ADMIZZ_SB_ANON = (window.__ADMIZZ_SB_ANON || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkc2dzZGppeHpzbGpna2NrdHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NTU1NDEsImV4cCI6MjA4NTMzMTU0MX0.855wGImOj-uNFYSqIyXF-Id4B9dO1siQoT2WdQKxusA');

function _admizzReadRefCookie() {
    var match = (document.cookie || '').split('; ').find(function (c) { return c.indexOf('admizz_ref=') === 0; });
    if (!match) return null;
    try { return decodeURIComponent(match.split('=')[1] || '') || null; }
    catch (_) { return null; }
}

function _admizzGenUuid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    // RFC4122 v4 fallback
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function _admizzSbHeaders() {
    return {
        'apikey': ADMIZZ_SB_ANON,
        'Authorization': 'Bearer ' + ADMIZZ_SB_ANON,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
    };
}

function _admizzCalcTier(count) {
    if (count >= 30) return 'Admizz Legend';
    if (count >= 15) return 'Elite Partner';
    if (count >= 5)  return 'Rising Star';
    return 'Starter';
}

// Flag-emoji lookup matching createReferralFromRegistration parsing
var _ADMIZZ_FLAGS = {
    'UK': '🇬🇧', 'United Kingdom': '🇬🇧',
    'USA': '🇺🇸', 'United States': '🇺🇸',
    'Canada': '🇨🇦',
    'Australia': '🇦🇺',
    'New Zealand': '🇳🇿',
    'Germany': '🇩🇪', 'France': '🇫🇷',
    'India': '🇮🇳', 'Nepal': '🇳🇵',
    'South Korea': '🇰🇷', 'Korea': '🇰🇷',
    'UAE': '🇦🇪', 'Dubai': '🇦🇪',
    'Other': '🌍',
};

// Fire-and-forget: write a register_leads row + (if cookie present) an
// affiliate_referrals row. Never blocks the user's success redirect.
// RLS blocks direct anon access to the affiliates table, so we go through
// create_referral_for_registration() which is SECURITY DEFINER.
function _admizzPersistEventLead(payload) {
    var leadId = _admizzGenUuid();
    var refCode = _admizzReadRefCookie();
    var pageSlug = (window.location.pathname || '').replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'event';
    var source = 'event-' + pageSlug.replace(/^events-/, '');

    var fullName = ((payload.firstName || '') + ' ' + (payload.lastName || '')).trim();
    var email    = (payload.email || '').trim();

    var leadRow = {
        id:           leadId,
        full_name:    fullName,
        email:        email,
        phone:        (payload.phone || '').trim(),
        countries:    payload.studyDestination || '',
        intake:       '',
        field:        payload.studyProgram || '',
        education:    payload.studyLevel || '',
        contact_pref: '',
        status:       'new',
        source:       source,
    };

    // Step 1: insert the lead (anon INSERT is allowed by RLS)
    fetch(ADMIZZ_SB_URL + '/rest/v1/register_leads', {
        method: 'POST',
        headers: _admizzSbHeaders(),
        body: JSON.stringify(leadRow),
    })
    .then(function (r) {
        if (!r.ok) { console.warn('[admizz lead]', r.status); return; }
        if (!refCode) return; // no affiliate to credit

        // Step 2: single RPC call handles lookup + insert + recompute under
        // elevated privileges. Returns true if credited, false if code unknown.
        var destinationName = (payload.studyDestination || 'Other').toString();
        var flag = _ADMIZZ_FLAGS[destinationName] || '🌍';

        return fetch(ADMIZZ_SB_URL + '/rest/v1/rpc/create_referral_for_registration', {
            method: 'POST',
            headers: _admizzSbHeaders(),
            body: JSON.stringify({
                p_code:        refCode,
                p_lead_id:     leadId,
                p_email:       email,
                p_full_name:   fullName,
                p_destination: destinationName,
                p_flag_emoji:  flag,
            }),
        }).then(function (rr) {
            if (!rr.ok) { console.warn('[admizz referral rpc]', rr.status); return; }
            return rr.json().then(function (ok) {
                if (ok === false) console.info('[admizz referral] code not active:', refCode);
            });
        });
    })
    .catch(function (err) { console.warn('[admizz event tracking]', err && err.message); });
}

function _eventFormInit() {
    const eventForm = document.getElementById('eventDetailsForm') || document.getElementById('admissionForm');
    const submitBtn = document.getElementById('submit');

    if (!eventForm) return;

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const countryCode = document.getElementById('countryCode');
    const phoneNumber = document.getElementById('phoneNumber');
    const studyDestination = document.getElementById('studyDestination');
    const studyLevel = document.getElementById('studyLevel');
    const studyProgram = document.getElementById('studyProgram');
    const cityName = document.getElementById('cityName');
    const termsConditions = document.getElementById('termsConditions');

    const CRM_ENDPOINT = 'https://dev-lead-crm.zunkireelabs.com/api/public/submit/admizz/uk-education-expo-2026';
    const CRM_API_KEY  = 'crm_live_UVtPfdXD6lIZ0S5lSeny9Clv3jKzbGUGM8sgK2Gm3tw';

    if (countryCode && phoneNumber) {
        function getDialCode() {
            const opt = countryCode.options[countryCode.selectedIndex];
            return (opt && opt.getAttribute('data-code')) || '';
        }

        function ensurePrefix() {
            const code = getDialCode();
            if (code && !phoneNumber.value.startsWith(code)) {
                phoneNumber.value = code;
            }
        }

        ensurePrefix();

        countryCode.addEventListener('change', function() {
            phoneNumber.value = getDialCode();
        });

        phoneNumber.addEventListener('input', function() {
            const code = getDialCode();
            if (code && !this.value.startsWith(code)) {
                this.value = code;
            }
        });
    }

    function showError(field) {
        if (!field) return;
        field.classList.add('error');
        field.style.borderColor = '#e04562';
    }

    function clearError(field) {
        if (!field) return;
        field.classList.remove('error');
        field.style.borderColor = '#ddd';
    }

    function isValidEmail(emailValue) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    }

    if (firstName) firstName.addEventListener('input', () => clearError(firstName));
    if (lastName) lastName.addEventListener('input', () => clearError(lastName));
    if (email) {
        email.addEventListener('input', () => {
            if (email.value.length > 0 && !isValidEmail(email.value)) {
                showError(email);
            } else {
                clearError(email);
            }
        });
    }
    if (phoneNumber) {
        phoneNumber.addEventListener('input', () => {
            clearError(phoneNumber);
            if (countryCode) clearError(countryCode);
        });
    }
    if (studyDestination) studyDestination.addEventListener('change', () => clearError(studyDestination));

    eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;

        if (!firstName || firstName.value.trim().length < 1) { showError(firstName); isValid = false; }
        if (!lastName || lastName.value.trim().length < 1) { showError(lastName); isValid = false; }
        if (!email || !isValidEmail(email.value)) { showError(email); isValid = false; }
        if (!phoneNumber || phoneNumber.value.length < 13) {
            showError(phoneNumber);
            if (countryCode) showError(countryCode);
            isValid = false;
        }
        if (!studyDestination || studyDestination.value.length === 0) { showError(studyDestination); isValid = false; }
        if (!termsConditions || !termsConditions.checked) {
            isValid = false;
            alert('Please agree to the Terms & Conditions');
        }

        if (!isValid) return;

        const urlParams = new URLSearchParams(window.location.search);

        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.style.opacity = '0.7';

        try {
            await fetch(CRM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + CRM_API_KEY,
                },
                body: JSON.stringify({
                    first_name: firstName.value.trim(),
                    last_name:  lastName.value.trim(),
                    email:      email.value.trim(),
                    phone:      phoneNumber.value.trim(),
                    custom_fields: {
                        study_destination: studyDestination ? studyDestination.value : '',
                        study_level:       studyLevel       ? studyLevel.value       : '',
                        study_program:     studyProgram     ? studyProgram.value     : '',
                        city:              cityName         ? cityName.value.trim()  : '',
                        utm_source:        urlParams.get('utm_source')   || '',
                        utm_medium:        urlParams.get('utm_medium')   || '',
                        utm_campaign:      urlParams.get('utm_campaign') || '',
                        utm_term:          urlParams.get('utm_term')     || '',
                        utm_content:       urlParams.get('utm_content')  || '',
                        referrer_url:      document.referrer || 'Direct',
                        landing_page:      window.location.href,
                    },
                }),
            });

            // Fire-and-forget: write a local lead row + (if cookie present) credit the affiliate.
            // Never blocks the redirect — tracking failures are silent.
            try {
                _admizzPersistEventLead({
                    firstName:        firstName.value.trim(),
                    lastName:         lastName.value.trim(),
                    email:            email.value.trim(),
                    phone:            phoneNumber.value.trim(),
                    studyDestination: studyDestination ? studyDestination.value : '',
                    studyLevel:       studyLevel       ? studyLevel.value       : '',
                    studyProgram:     studyProgram     ? studyProgram.value     : '',
                });
            } catch (_) { /* ignore */ }

            const thankYouUrl = eventForm.getAttribute('data-thank-you') || 'https://admizzeducation.com/thank-you/';
            window.location.href = thankYouUrl;

        } catch (error) {
            console.error('Form submission error:', error);
            alert('An error occurred while submitting the form. Please try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _eventFormInit);
} else {
    _eventFormInit();
}

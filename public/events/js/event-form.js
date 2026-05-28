// Event Form JavaScript - Validation & Submission
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
    const termsConditions = document.getElementById('termsConditions');

    const SCRIPT_URLS = {
        primary: "https://script.google.com/macros/s/AKfycbxeAGAIM_pZTsgj-7-cqvt__hBfI4wbQRztMVfZ2jaF9LarsRcbl0FRvkco_R8R9KWxkQ/exec",
        secondary: "https://script.google.com/macros/s/AKfycbwEhcdBi59eIdC45UQ8bHWYuOQYyP929Hipq93d9Rp6ILzRX7ZJCCGH6OoGbn2OPprL/exec",
        nepal: "https://script.google.com/macros/s/AKfycbx_eRs4VvnE3Mcd2dz8jO6e5E1MzcWmGxfO6vXgYqoubjTkg0DiIq3aARfVkIl8_m3KAg/exec"
    };

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

        const dateInput = document.getElementById('date-input');
        const timeInput = document.getElementById('time-input');
        const currentDateTime = new Date();
        if (dateInput) dateInput.value = currentDateTime.toDateString();
        if (timeInput) timeInput.value = currentDateTime.toLocaleTimeString();

        const urlParams = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(field => {
            const element = document.getElementById(field);
            if (element) element.value = urlParams.get(field) || '';
        });

        const referrerUrl = document.getElementById('referrer_url');
        const landingPage = document.getElementById('landing_page');
        if (referrerUrl) referrerUrl.value = document.referrer || 'Direct';
        if (landingPage) landingPage.value = window.location.href;

        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.style.opacity = '0.7';

        try {
            if (countryCode && countryCode.value === 'NP') {
                await Promise.all([
                    fetch(SCRIPT_URLS.primary, { method: 'POST', body: new FormData(eventForm) }),
                    fetch(SCRIPT_URLS.secondary, { method: 'POST', body: new FormData(eventForm) }),
                    fetch(SCRIPT_URLS.nepal, { method: 'POST', body: new FormData(eventForm) })
                ]);
            } else {
                await Promise.all([
                    fetch(SCRIPT_URLS.primary, { method: 'POST', body: new FormData(eventForm) }),
                    fetch(SCRIPT_URLS.secondary, { method: 'POST', body: new FormData(eventForm) })
                ]);
            }

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

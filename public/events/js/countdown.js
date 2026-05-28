// Countdown Timer for Admission Week
function _countdownInit() {
    const countdownElement = document.getElementById('countdown-timer');
    if (!countdownElement) return;

    const targetDate = countdownElement.dataset.target;
    if (!targetDate) return;

    const target = new Date(targetDate).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = target - now;

        if (difference <= 0) {
            document.getElementById('countdown-days').textContent = '00';
            document.getElementById('countdown-hours').textContent = '00';
            document.getElementById('countdown-minutes').textContent = '00';
            document.getElementById('countdown-seconds').textContent = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
        document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _countdownInit);
} else {
    _countdownInit();
}

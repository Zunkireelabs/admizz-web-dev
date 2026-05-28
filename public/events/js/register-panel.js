// Register Panel Slide-in Functionality
function _registerPanelInit() {
    const panel = document.getElementById('registerPanel');
    const overlay = document.getElementById('registerOverlay');
    const openBtn = document.getElementById('openRegisterPanel');
    const closeBtn = document.getElementById('closeRegisterPanel');
    const backBtn = document.getElementById('backRegisterPanel');
    const headerRegisterBtn = document.querySelector('.header-register-btn');

    function openPanel() {
        panel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openPanel);
    if (headerRegisterBtn) {
        headerRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openPanel();
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (backBtn) backBtn.addEventListener('click', closePanel);

    const mobileBackBtn = document.getElementById('mobileBackBtn');
    if (mobileBackBtn) mobileBackBtn.addEventListener('click', closePanel);

    if (overlay) overlay.addEventListener('click', closePanel);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && panel && panel.classList.contains('active')) {
            closePanel();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _registerPanelInit);
} else {
    _registerPanelInit();
}

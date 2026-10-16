// True once the visitor has moved between pages inside the site since the page was loaded.
// document.referrer can't tell us this: it only reflects the first page load, not client-side navigation.
let navigatedInApp = false;

export const markInAppNav = () => {
  navigatedInApp = true;
};

export const hasInAppHistory = () => navigatedInApp;

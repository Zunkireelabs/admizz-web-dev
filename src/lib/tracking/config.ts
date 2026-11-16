// Ad-platform tracking config (CRET-13).
//
// Meta Pixel ID comes from Admizz's Meta Events Manager (sent by Manish Sah, 15 Nov 2026).
// A pixel ID is public by design: it is visible in every page's source, so it lives here
// rather than in a CI secret.
export const META_PIXEL_ID = "2163929454061954";

// Tracking only runs on the live site, so dev/staging/localhost traffic never pollutes
// the ad accounts. To test anywhere else, open any page with ?pixel_test=1 (remembered
// for the browser tab); ?pixel_test=0 turns it off again.
export const PRODUCTION_HOSTS = ["admizzeducation.com", "www.admizzeducation.com"];
export const PIXEL_TEST_PARAM = "pixel_test";
export const PIXEL_TEST_STORAGE_KEY = "admizz_pixel_test";

// User matching sends the lead's email/phone/name/city to the ad platforms with each
// conversion: Meta "advanced matching" (hashed in the browser by the pixel) and Google
// "enhanced conversions" (user_data in the dataLayer, hashed by the Google tag). More
// leads get matched to an ad click, so reporting and optimisation improve.
// Off until Admizz approves sharing lead contact data with Meta and Google.
export const AD_USER_MATCHING = false;

/**
 * Inline <head> script: decides whether tracking is on for this host, then loads the
 * standard Meta Pixel base code and fires the first PageView. Runs before React
 * hydrates, so quick bounces are still counted. Later client-side navigations are
 * counted by the pixel itself (it listens to history.pushState), so we must NOT fire
 * PageView again on route changes or every page would count twice.
 */
export function metaPixelBootstrapScript(): string {
  return `(function(){
var on=${JSON.stringify(PRODUCTION_HOSTS)}.indexOf(location.hostname)>-1;
try{var m=location.search.match(/[?&]${PIXEL_TEST_PARAM}=([01])/);
if(m){m[1]==='1'?sessionStorage.setItem('${PIXEL_TEST_STORAGE_KEY}','1'):sessionStorage.removeItem('${PIXEL_TEST_STORAGE_KEY}');}
if(sessionStorage.getItem('${PIXEL_TEST_STORAGE_KEY}')==='1')on=true;}catch(e){}
window.__admizzTrackingOn=on;
if(!on)return;
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');
})();`;
}

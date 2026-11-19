// Pages of the affiliate portal. The site header/footer and the website chat bubble are both
// hidden here, so the two places that need the list share this one definition.
export const PORTAL_ROUTES = ["/affiliate-dashboard", "/affiliate-admin"];

export function isPortalPath(pathname: string): boolean {
  return PORTAL_ROUTES.some((route) => pathname.startsWith(route));
}

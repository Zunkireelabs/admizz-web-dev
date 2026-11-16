// Conversion tracking for ad platforms (CRET-13).
//
// One call per successful form submit sends the conversion to:
//   - the Meta Pixel (standard event, so Meta ads can optimise for it),
//   - Google Ads (conversion "Website lead (form submit)", student leads only),
//   - GA4 (generate_lead etc., for reporting; GA4's generate_lead is also imported into
//     Google Ads and must stay a SECONDARY conversion there, or leads count twice), and
//   - the GTM dataLayer (for anything set up in GTM-TX24X74T).
// Ad platforms only receive it on the live host (see config.ts); the dataLayer always does.
//
// Each conversion gets one event ID. It goes to the pixel AND into the CRM lead
// (custom_fields.meta_event_id), so a later server-side send of the same lead to Meta's
// Conversions API is de-duplicated against the browser event instead of counted twice.
//
// Usage in a form:
//   const eventId = newEventId();
//   ...post to CRM with custom_fields: { ...leadTrackingFields(eventId), ... }
//   ...on success: trackConversion({ eventId, formName: "consultation-popup" });

import {
  AD_USER_MATCHING,
  GA4_ID,
  GOOGLE_ADS_CONTACT_LABEL,
  GOOGLE_ADS_ID,
  GOOGLE_ADS_LEAD_LABEL,
  META_PIXEL_ID,
} from "./config";
import { getAdAttribution } from "./clickIds";

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    dataLayer?: Record<string, unknown>[];
    __admizzTrackingOn?: boolean;
  }
}

/**
 * lead         – a student asking for counselling / an enquiry (the main conversion).
 * registration – signing up for an event or workshop.
 * application  – applying to the affiliate (partner) programme. Not a student lead.
 */
export type ConversionType = "lead" | "registration" | "application";

const META_EVENT: Record<ConversionType, string> = {
  lead: "Lead",
  registration: "CompleteRegistration",
  application: "SubmitApplication",
};

// GA4 event names. Never "sign_up": that GA4 event is already a PRIMARY Google Ads
// conversion ("Sign Up") fed by something else, and must not be mixed with these.
const GA4_EVENT: Record<ConversionType, string> = {
  lead: "generate_lead",
  registration: "event_registration",
  application: "affiliate_application",
};

const DATALAYER_EVENT: Record<ConversionType, string> = {
  lead: "generate_lead",
  registration: "event_registration",
  application: "affiliate_application",
};

export interface LeadUser {
  email?: string | null;
  /** Full number with country code, any formatting, e.g. "+977 9801234567". */
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  /** ISO 3166-1 alpha-2, e.g. "NP". */
  countryCode?: string | null;
}

export interface ConversionOptions {
  eventId: string;
  /** Stable, lowercase name of the form, e.g. "consultation-popup". Shows up in reports. */
  formName: string;
  type?: ConversionType;
  /** Extra non-personal details for reporting, e.g. { destination: "UK", study_level: "Masters" }. */
  details?: Record<string, string | number | null | undefined>;
  /** Only sent when AD_USER_MATCHING is on (see config.ts). */
  user?: LeadUser;
}

export function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
  }
}

/** Fields to merge into the CRM lead's custom_fields. Null values are dropped. */
export function leadTrackingFields(eventId: string): Record<string, string> {
  const fields: Record<string, string | null> = { ...getAdAttribution(), meta_event_id: eventId };
  return Object.fromEntries(
    Object.entries(fields).filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
}

function cleanDetails(details: ConversionOptions["details"]): Record<string, string | number> {
  if (!details) return {};
  return Object.fromEntries(
    Object.entries(details).filter(
      (entry): entry is [string, string | number] => entry[1] !== null && entry[1] !== undefined && entry[1] !== "",
    ),
  );
}

/** Meta advanced-matching keys. Plain values are hashed by the pixel before sending. */
function metaUserData(user: LeadUser): Record<string, string> {
  const lower = (v?: string | null) => (v ? v.trim().toLowerCase() : "");
  const data: Record<string, string> = {
    em: lower(user.email),
    ph: (user.phone ?? "").replace(/\D/g, ""),
    fn: lower(user.firstName),
    ln: lower(user.lastName),
    ct: lower(user.city).replace(/[^a-z]/g, ""),
    country: lower(user.countryCode),
  };
  return Object.fromEntries(Object.entries(data).filter(([, v]) => v));
}

/** Google enhanced conversions shape for GTM's "user-provided data" variable. */
function googleUserData(user: LeadUser): Record<string, unknown> {
  const phoneDigits = (user.phone ?? "").replace(/\D/g, "");
  return {
    ...(user.email ? { email: user.email.trim().toLowerCase() } : {}),
    ...(phoneDigits ? { phone_number: `+${phoneDigits}` } : {}),
    address: {
      ...(user.firstName ? { first_name: user.firstName.trim() } : {}),
      ...(user.lastName ? { last_name: user.lastName.trim() } : {}),
      ...(user.city ? { city: user.city.trim() } : {}),
      ...(user.countryCode ? { country: user.countryCode.trim().toUpperCase() } : {}),
    },
  };
}

/** gtag is defined by the <head> Google tag script; ad/analytics sends are live-host only. */
function liveGtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined" || !window.__admizzTrackingOn || !window.gtag) return null;
  return window.gtag;
}

function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Fire a conversion. Safe to call anywhere: never throws, no-op on the server. */
export function trackConversion({ eventId, formName, type = "lead", details, user }: ConversionOptions): void {
  if (typeof window === "undefined") return;
  try {
    const params = { content_name: formName, content_category: type, ...cleanDetails(details) };
    const shareUser = AD_USER_MATCHING && user;

    if (window.fbq) {
      if (shareUser) {
        const userData = metaUserData(user);
        if (Object.keys(userData).length) window.fbq("init", META_PIXEL_ID, userData);
      }
      window.fbq("track", META_EVENT[type], params, { eventID: eventId });
    }

    const gtag = liveGtag();
    if (gtag) {
      if (GA4_ID) {
        gtag("event", GA4_EVENT[type], {
          send_to: GA4_ID,
          form_name: formName,
          conversion_type: type,
          event_id: eventId,
          ...cleanDetails(details),
        });
      }
      // Only student leads count as the Google Ads conversion the campaigns bid on.
      if (type === "lead" && GOOGLE_ADS_LEAD_LABEL) {
        if (shareUser) gtag("set", "user_data", googleUserData(user));
        gtag("event", "conversion", {
          send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
          // Google Ads drops a second conversion with the same transaction_id.
          transaction_id: eventId,
        });
      }
    }

    pushDataLayer({
      event: DATALAYER_EVENT[type],
      event_id: eventId,
      form_name: formName,
      conversion_type: type,
      ...cleanDetails(details),
      ...(shareUser ? { user_data: googleUserData(user) } : {}),
    });
  } catch (err) {
    console.warn("[tracking] conversion not sent:", err);
  }
}

export type ContactChannel = "whatsapp" | "phone" | "email";

/** A click on a WhatsApp / phone / email link. Meta standard event "Contact". */
export function trackContact(channel: ContactChannel): void {
  if (typeof window === "undefined") return;
  try {
    const params = { content_name: channel, content_category: window.location.pathname };
    window.fbq?.("track", "Contact", params);
    const gtag = liveGtag();
    if (gtag) {
      if (GA4_ID) gtag("event", "contact_click", { send_to: GA4_ID, contact_channel: channel });
      if (GOOGLE_ADS_CONTACT_LABEL) gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONTACT_LABEL}` });
    }
    pushDataLayer({ event: "contact_click", contact_channel: channel, page_path: window.location.pathname });
  } catch (err) {
    console.warn("[tracking] contact not sent:", err);
  }
}

export type AnalyticsEvent =
  | "hero_cta_clicked"
  | "coverage_check_started"
  | "coverage_check_completed"
  | "plan_viewed"
  | "plan_compared"
  | "plan_recommended"
  | "package_selected"
  | "installation_form_started"
  | "installation_request_submitted"
  | "renewal_portal_clicked"
  | "whatsapp_clicked";

export type EventPayload = Record<string, string | number | boolean | undefined>;
export type AnalyticsProvider = (event: AnalyticsEvent, payload?: EventPayload) => void;

let provider: AnalyticsProvider | null = null;
export function setAnalyticsProvider(next: AnalyticsProvider | null) { provider = next; }
export function track(event: AnalyticsEvent, payload?: EventPayload) { provider?.(event, payload); }

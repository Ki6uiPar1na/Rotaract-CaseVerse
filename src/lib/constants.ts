export const SITE_NAME = "CaseVerse 2026";
export const SITE_TAGLINE = "Where Strategy Meets Sustainability";

export const STORAGE_KEYS = {
  REGISTRATION_DRAFT: "caseverse_registration_draft",
  REGISTRATIONS: "caseverse_registrations",
  DASHBOARD_STATE: "caseverse_dashboard_state",
} as const;

export const SPONSOR_CATEGORIES = [
  { key: "title", label: "Title Sponsor" },
  { key: "gold", label: "Gold Sponsor" },
  { key: "silver", label: "Silver Sponsor" },
  { key: "media", label: "Media Partner" },
  { key: "knowledge", label: "Knowledge Partner" },
  { key: "strategic", label: "Strategic Partner" },
  { key: "supporting", label: "Supporting Organization" },
] as const;

export const NEWS_CATEGORIES = [
  { key: "announcement", label: "Announcements" },
  { key: "event-update", label: "Event Updates" },
  { key: "result", label: "Results" },
  { key: "general", label: "General" },
] as const;

export const TIMELINE_TYPES = {
  "pre-event": { label: "Pre-Event", color: "text-muted" },
  registration: { label: "Registration", color: "text-primary" },
  round: { label: "Competition", color: "text-accent" },
  finale: { label: "Finale", color: "text-accent" },
} as const;

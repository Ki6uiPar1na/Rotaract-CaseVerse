const BASE = "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ─── Registrations ────────────────────────────────────────────────────
export const api = {
  registrations: {
    list: () => request<import("@/types/registration").RegistrationSubmission[]>("/registrations"),
    get: (id: string) => request<import("@/types/registration").RegistrationSubmission>(`/registrations/${id}`),
    create: (data: import("@/types/registration").RegistrationSubmission) =>
      request("/registrations", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<import("@/types/registration").RegistrationSubmission>) =>
      request(`/registrations/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: string) => request(`/registrations/${id}`, { method: "DELETE" }),
  },
  sponsors: {
    list: () => request<import("@/types/sponsor").Sponsor[]>("/sponsors"),
    create: (data: import("@/types/sponsor").Sponsor) =>
      request("/sponsors", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: import("@/types/sponsor").Sponsor) =>
      request(`/sponsors/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: string) => request(`/sponsors/${id}`, { method: "DELETE" }),
  },
  judges: {
    list: () => request<import("@/types/judge").Judge[]>("/judges"),
    create: (data: import("@/types/judge").Judge) =>
      request("/judges", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: import("@/types/judge").Judge) =>
      request(`/judges/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: string) => request(`/judges/${id}`, { method: "DELETE" }),
  },
  news: {
    list: () => request<import("@/types/news").NewsArticle[]>("/news"),
    get: (slug: string) => request<import("@/types/news").NewsArticle>(`/news/${slug}`),
    create: (data: import("@/types/news").NewsArticle) =>
      request("/news", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: import("@/types/news").NewsArticle) =>
      request(`/news/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: string) => request(`/news/${id}`, { method: "DELETE" }),
  },
  results: {
    list: () => request<import("@/types/result").ResultPhase[]>("/results"),
    update: (id: string, data: import("@/types/result").ResultPhase) =>
      request(`/results/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  },
  timeline: {
    list: () => request<import("@/types/timeline").TimelineItem[]>("/timeline"),
    create: (data: import("@/types/timeline").TimelineItem) =>
      request("/timeline", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: import("@/types/timeline").TimelineItem) =>
      request(`/timeline/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: string) => request(`/timeline/${id}`, { method: "DELETE" }),
  },
  site: {
    get: () => request<Record<string, unknown>>("/site"),
    update: (data: Record<string, unknown>) =>
      request("/site", { method: "PUT", body: JSON.stringify(data) }),
  },
};

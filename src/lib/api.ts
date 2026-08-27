import siteData from "@/data/site.json";
import sponsorsData from "@/data/sponsors.json";
import judgesData from "@/data/judges.json";
import newsData from "@/data/news.json";
import timelineData from "@/data/timeline.json";
import resultsData from "@/data/results.json";
import { storage } from "@/lib/storage";
import type { RegistrationSubmission } from "@/types/registration";
import type { Sponsor } from "@/types/sponsor";
import type { Judge } from "@/types/judge";
import type { NewsArticle } from "@/types/news";
import type { TimelineItem } from "@/types/timeline";
import type { ResultPhase } from "@/types/result";

const BASE = "/api";
const REGISTRATIONS_KEY = "caseverse_registrations";

async function request<T>(path: string, options?: RequestInit, fallback?: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      ...options,
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      if (fallback !== undefined) return fallback;
      throw new Error(`API error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    if (fallback !== undefined) return fallback;
    throw err;
  }
}

function getLocalRegistrations(): RegistrationSubmission[] {
  return storage.get<RegistrationSubmission[]>(REGISTRATIONS_KEY) || [];
}

function saveLocalRegistration(sub: RegistrationSubmission): void {
  const list = getLocalRegistrations();
  const index = list.findIndex((r) => r.registrationId === sub.registrationId);
  if (index >= 0) {
    list[index] = { ...list[index], ...sub };
  } else {
    list.unshift(sub);
  }
  storage.set(REGISTRATIONS_KEY, list);
}

// ─── API Client ───────────────────────────────────────────────────────
export const api = {
  registrations: {
    list: async () => {
      try {
        return await request<RegistrationSubmission[]>("/registrations");
      } catch {
        return getLocalRegistrations();
      }
    },
    get: async (id: string) => {
      try {
        return await request<RegistrationSubmission>(`/registrations/${id}`);
      } catch {
        const found = getLocalRegistrations().find(
          (r) => r.registrationId.toUpperCase() === id.toUpperCase()
        );
        if (found) return found;
        throw new Error("Registration not found");
      }
    },
    create: async (data: RegistrationSubmission) => {
      saveLocalRegistration(data);
      try {
        return await request("/registrations", { method: "POST", body: JSON.stringify(data) });
      } catch {
        return { ok: true };
      }
    },
    update: async (id: string, data: Partial<RegistrationSubmission>) => {
      const list = getLocalRegistrations();
      const item = list.find((r) => r.registrationId.toUpperCase() === id.toUpperCase());
      if (item) {
        Object.assign(item, data);
        storage.set(REGISTRATIONS_KEY, list);
      }
      try {
        return await request(`/registrations/${id}`, { method: "PUT", body: JSON.stringify(data) });
      } catch {
        return { ok: true };
      }
    },
    remove: async (id: string) => {
      const list = getLocalRegistrations().filter((r) => r.registrationId.toUpperCase() !== id.toUpperCase());
      storage.set(REGISTRATIONS_KEY, list);
      try {
        return await request(`/registrations/${id}`, { method: "DELETE" });
      } catch {
        return { ok: true };
      }
    },
  },
  sponsors: {
    list: () => request<Sponsor[]>("/sponsors", undefined, sponsorsData as Sponsor[]),
    create: (data: Sponsor) =>
      request("/sponsors", { method: "POST", body: JSON.stringify(data) }, { ok: true }),
    update: (id: string, data: Sponsor) =>
      request(`/sponsors/${id}`, { method: "PUT", body: JSON.stringify(data) }, { ok: true }),
    remove: (id: string) => request(`/sponsors/${id}`, { method: "DELETE" }, { ok: true }),
  },
  judges: {
    list: () => request<Judge[]>("/judges", undefined, judgesData as Judge[]),
    create: (data: Judge) =>
      request("/judges", { method: "POST", body: JSON.stringify(data) }, { ok: true }),
    update: (id: string, data: Judge) =>
      request(`/judges/${id}`, { method: "PUT", body: JSON.stringify(data) }, { ok: true }),
    remove: (id: string) => request(`/judges/${id}`, { method: "DELETE" }, { ok: true }),
  },
  news: {
    list: () => request<NewsArticle[]>("/news", undefined, newsData as unknown as NewsArticle[]),
    get: async (slug: string) => {
      const fallback = (newsData as unknown as NewsArticle[]).find((n) => n.slug === slug);
      if (fallback) {
        return request<NewsArticle>(`/news/${slug}`, undefined, fallback);
      }
      return request<NewsArticle>(`/news/${slug}`);
    },
    create: (data: NewsArticle) =>
      request("/news", { method: "POST", body: JSON.stringify(data) }, { ok: true }),
    update: (id: string, data: NewsArticle) =>
      request(`/news/${id}`, { method: "PUT", body: JSON.stringify(data) }, { ok: true }),
    remove: (id: string) => request(`/news/${id}`, { method: "DELETE" }, { ok: true }),
  },
  results: {
    list: () => request<ResultPhase[]>("/results", undefined, resultsData as unknown as ResultPhase[]),
    update: (id: string, data: ResultPhase) =>
      request(`/results/${id}`, { method: "PUT", body: JSON.stringify(data) }, { ok: true }),
  },
  timeline: {
    list: () => request<TimelineItem[]>("/timeline", undefined, timelineData as unknown as TimelineItem[]),
    create: (data: TimelineItem) =>
      request("/timeline", { method: "POST", body: JSON.stringify(data) }, { ok: true }),
    update: (id: string, data: TimelineItem) =>
      request(`/timeline/${id}`, { method: "PUT", body: JSON.stringify(data) }, { ok: true }),
    remove: (id: string) => request(`/timeline/${id}`, { method: "DELETE" }, { ok: true }),
  },
  site: {
    get: () => request<Record<string, unknown>>("/site", undefined, siteData as Record<string, unknown>),
    update: (data: Record<string, unknown>) =>
      request("/site", { method: "PUT", body: JSON.stringify(data) }, { ok: true }),
  },
};

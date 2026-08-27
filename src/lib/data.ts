import siteData from "@/data/site.json";
import competitionData from "@/data/competition.json";
import roundsData from "@/data/rounds.json";
import timelineData from "@/data/timeline.json";
import sponsorsData from "@/data/sponsors.json";
import judgesData from "@/data/judges.json";
import newsData from "@/data/news.json";
import faqData from "@/data/faq.json";
import organizersData from "@/data/organizers.json";
import resultsData from "@/data/results.json";

import type { Sponsor } from "@/types/sponsor";
import type { Judge } from "@/types/judge";
import type { Organizer } from "@/types/organizer";
import type { TimelineItem } from "@/types/timeline";
import type { ResultPhase } from "@/types/result";
import type { NewsArticle } from "@/types/news";

const staticData = {
  site: siteData as Record<string, unknown>,
  competition: competitionData as Record<string, unknown>,
  rounds: roundsData as Record<string, unknown>[],
  timeline: timelineData as unknown as TimelineItem[],
  sponsors: sponsorsData as Sponsor[],
  judges: judgesData as Judge[],
  news: newsData as unknown as NewsArticle[],
  faq: faqData as { question: string; answer: string }[],
  organizers: organizersData as Organizer[],
  results: resultsData as unknown as ResultPhase[],
};

export const data = staticData;

const cache: Record<string, unknown> = {};

async function apiFetch<T>(path: string, fallback: T): Promise<T> {
  if (cache[path]) return cache[path] as T;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`/api${path}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return fallback;
    const result = await res.json();
    cache[path] = result;
    return result;
  } catch {
    return fallback;
  }
}

export function clearCache() {
  Object.keys(cache).forEach((k) => delete cache[k]);
}

export async function getSite() {
  return apiFetch<Record<string, unknown>>("/site", staticData.site);
}

export async function getCompetition() {
  return apiFetch<Record<string, unknown>>("/competition", staticData.competition);
}

export async function getRounds() {
  return apiFetch<Record<string, unknown>[]>("/rounds", staticData.rounds);
}

export async function getRoundById(id: string) {
  const rounds = await getRounds();
  return rounds.find((r) => r.id === id) || staticData.rounds.find((r) => r.id === id);
}

export async function getTimeline() {
  return apiFetch<TimelineItem[]>("/timeline", staticData.timeline);
}

export async function getSponsors() {
  return apiFetch<Sponsor[]>("/sponsors", staticData.sponsors);
}

export async function getSponsorsByCategory(category: string) {
  const sponsors = await getSponsors();
  return sponsors.filter((s) => s.category === category);
}

export async function getJudges() {
  return apiFetch<Judge[]>("/judges", staticData.judges);
}

export async function getNews() {
  return apiFetch<NewsArticle[]>("/news", staticData.news);
}

export async function getNewsBySlug(slug: string) {
  const news = await getNews();
  return news.find((n) => n.slug === slug) || staticData.news.find((n) => n.slug === slug);
}

export async function getFeaturedNews() {
  const news = await getNews();
  return news.filter((n) => n.featured);
}

export async function getFaq() {
  return apiFetch<{ question: string; answer: string }[]>("/faq", staticData.faq);
}

export async function getOrganizers() {
  return apiFetch<Organizer[]>("/organizers", staticData.organizers);
}

export async function getResults() {
  return apiFetch<ResultPhase[]>("/results", staticData.results);
}

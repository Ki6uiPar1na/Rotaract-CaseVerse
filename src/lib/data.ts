import type { Sponsor } from "@/types/sponsor";
import type { Judge } from "@/types/judge";
import type { Organizer } from "@/types/organizer";
import type { TimelineItem } from "@/types/timeline";
import type { ResultPhase } from "@/types/result";
import type { NewsArticle } from "@/types/news";

const cache: Record<string, unknown> = {};

async function apiFetch<T>(path: string): Promise<T> {
  if (cache[path]) return cache[path] as T;
  const res = await fetch(`/api${path}`);
  if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
  const data = await res.json();
  cache[path] = data;
  return data;
}

export function clearCache() {
  Object.keys(cache).forEach((k) => delete cache[k]);
}

export async function getSite() {
  return apiFetch<Record<string, unknown>>("/site");
}

export async function getCompetition() {
  return apiFetch<Record<string, unknown>>("/competition");
}

export async function getRounds() {
  return apiFetch<Record<string, unknown>[]>("/rounds");
}

export async function getRoundById(id: string) {
  const rounds = await getRounds();
  return rounds.find((r) => r.id === id);
}

export async function getTimeline() {
  return apiFetch<TimelineItem[]>("/timeline");
}

export async function getSponsors() {
  return apiFetch<Sponsor[]>("/sponsors");
}

export async function getSponsorsByCategory(category: string) {
  const sponsors = await getSponsors();
  return sponsors.filter((s) => s.category === category);
}

export async function getJudges() {
  return apiFetch<Judge[]>("/judges");
}

export async function getNews() {
  return apiFetch<NewsArticle[]>("/news");
}

export async function getNewsBySlug(slug: string) {
  const news = await getNews();
  return news.find((n) => n.slug === slug);
}

export async function getFeaturedNews() {
  const news = await getNews();
  return news.filter((n) => n.featured);
}

export async function getFaq() {
  return apiFetch<{ question: string; answer: string }[]>("/faq");
}

export async function getOrganizers() {
  return apiFetch<Organizer[]>("/organizers");
}

export async function getResults() {
  return apiFetch<ResultPhase[]>("/results");
}

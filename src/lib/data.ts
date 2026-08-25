import site from "@/data/site.json";
import competition from "@/data/competition.json";
import rounds from "@/data/rounds.json";
import timeline from "@/data/timeline.json";
import sponsorsData from "@/data/sponsors.json";
import judgesData from "@/data/judges.json";
import news from "@/data/news.json";
import faq from "@/data/faq.json";
import organizersData from "@/data/organizers.json";
import resultsData from "@/data/results.json";
import type { Sponsor } from "@/types/sponsor";
import type { Judge } from "@/types/judge";
import type { Organizer } from "@/types/organizer";
import type { TimelineItem } from "@/types/timeline";
import type { ResultPhase } from "@/types/result";
import type { NewsArticle } from "@/types/news";

const sponsors = sponsorsData as Sponsor[];
const judges = judgesData as Judge[];
const organizers = organizersData as Organizer[];
const typedTimeline = timeline as unknown as TimelineItem[];
const results = resultsData as ResultPhase[];
const typedNews = news as NewsArticle[];

export const data = {
  site,
  competition,
  rounds,
  timeline: typedTimeline,
  sponsors,
  judges,
  news: typedNews,
  faq,
  organizers,
  results,
};

export function getSite() {
  return data.site;
}

export function getCompetition() {
  return data.competition;
}

export function getRounds() {
  return data.rounds;
}

export function getRoundById(id: string) {
  return data.rounds.find((r) => r.id === id);
}

export function getTimeline() {
  return data.timeline;
}

export function getSponsors() {
  return data.sponsors;
}

export function getSponsorsByCategory(category: string) {
  return data.sponsors.filter((s) => s.category === category);
}

export function getJudges() {
  return data.judges;
}

export function getNews() {
  return data.news;
}

export function getNewsBySlug(slug: string) {
  return data.news.find((n) => n.slug === slug);
}

export function getFeaturedNews() {
  return data.news.filter((n) => n.featured);
}

export function getFaq() {
  return data.faq;
}

export function getOrganizers() {
  return data.organizers;
}

export function getResults() {
  return data.results;
}

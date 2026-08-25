export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  category: string;
  website?: string;
  description?: string;
}

export type SponsorCategory =
  | "title"
  | "gold"
  | "silver"
  | "media"
  | "knowledge"
  | "strategic"
  | "supporting";

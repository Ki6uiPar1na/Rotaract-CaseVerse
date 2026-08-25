export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: string;
  contentFormat: "plain" | "markdown";
  featured?: boolean;
  tags?: string[];
  linkUrl?: string;
}

export type NewsCategory = "announcement" | "event-update" | "result" | "general";

export interface ResultPhase {
  id: string;
  label: string;
  title: string;
  status: "upcoming" | "published";
  description: string;
  results: ResultEntry[];
}

export interface ResultEntry {
  rank: number;
  teamName: string;
  university: string;
  members?: string[];
}

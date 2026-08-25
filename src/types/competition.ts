export interface Competition {
  title: string;
  description: string;
  eligibility: string[];
  teamSize: { min: number; max: number };
  targetParticipation: number;
  format: string;
  sdgs: number[];
  venue: string;
}

export interface Round {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  requirements: string[];
  guidelines: string[];
  documents?: RoundDocument[];
  faq?: FAQItem[];
}

export interface RoundDocument {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Finale {
  title: string;
  venue: string;
  address: string;
  components: FinaleComponent[];
  finalistCount: number | null;
  assessmentAreas: string[];
}

export interface FinaleComponent {
  title: string;
  description: string;
}

export interface Prize {
  place: string;
  title: string;
  description?: string;
  icon: string;
}

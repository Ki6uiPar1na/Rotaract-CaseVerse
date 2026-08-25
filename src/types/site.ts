export interface SiteConfig {
  name: string;
  tagline: string;
  subtitle: string;
  year: number;
  registrationDeadline: string;
  countdownTarget: string;
  venue: Venue;
  contact: Contact;
  socials: Social[];
}

export interface Venue {
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface Contact {
  phone: string;
  email: string;
  website: string;
}

export interface Social {
  platform: string;
  url: string;
}

export interface NavigationItem {
  label: string;
  path: string;
  children?: NavigationItem[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface SDG {
  id: number;
  title: string;
  description: string;
  icon: string;
  link?: string;
}

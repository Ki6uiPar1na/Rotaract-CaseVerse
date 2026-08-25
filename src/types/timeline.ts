export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: "pre-event" | "registration" | "round" | "finale";
  status: "upcoming" | "active" | "completed";
}

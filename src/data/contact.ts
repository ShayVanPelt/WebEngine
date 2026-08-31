export const budgetOptions = [
  "Under $1,000",
  "$1,000–$1,500",
  "$1,500–$2,500",
  "$2,500+",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "ASAP",
  "1–2 months",
  "2–3 months",
  "No specific deadline",
] as const;

export type BudgetOption = (typeof budgetOptions)[number];
export type TimelineOption = (typeof timelineOptions)[number];

export interface ContactFormData {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  currentWebsite?: string;
  businessDescription: string;
  projectGoals: string;
  budget: BudgetOption;
  timeline: TimelineOption;
}

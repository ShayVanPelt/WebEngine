export const projectTypeOptions = [
  {
    value: "business-website",
    label: "Business Website",
    description: "$1,500+ — standard professional site",
  },
  {
    value: "custom",
    label: "Custom Project",
    description: "Functionality beyond a standard website",
  },
] as const;

export const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-2-months", label: "1–2 months" },
  { value: "2-3-months", label: "2–3 months" },
  { value: "flexible", label: "No specific deadline" },
] as const;

export type ProjectType = (typeof projectTypeOptions)[number]["value"];
export type TimelineOption = (typeof timelineOptions)[number]["value"];

export interface ContactFormData {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  currentWebsite?: string;
  businessDescription: string;
  projectGoals: string;
  projectType: ProjectType;
  timeline: TimelineOption;
}

export function getProjectTypeLabel(value: ProjectType): string {
  const option = projectTypeOptions.find((o) => o.value === value);
  return option ? `${option.label} — ${option.description}` : value;
}

export function getTimelineLabel(value: TimelineOption): string {
  const option = timelineOptions.find((o) => o.value === value);
  return option?.label ?? value;
}

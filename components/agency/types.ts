export type ThemeMode = "light" | "dark";

export type ThemePalette = {
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  primary: string;
};

export type ServiceItem = {
  title: string;
  detail: string;
  tag?: string;
  outcome?: string;
};

export type MetricItem = {
  label: string;
  value: string;
};

export type ProcessStep = {
  title: string;
  detail: string;
};

export type WorkItem = {
  title: string;
  category: string;
  summary: string;
  impact: string;
  stack: string[];
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  specialty: string;
};

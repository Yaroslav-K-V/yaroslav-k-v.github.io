export type ProjectCategory = 'all' | 'ai' | 'fullstack' | 'desktop';

export type ProjectBadge = 'Live Service' | 'Desktop App' | 'Open Source' | 'In Progress';

export interface ProjectDossierData {
  problemStatement: string;
  scopeObjectives: string[];
  keyDecisions: { title: string; reasoning: string }[];
  stackMatrix: { category: string; items: string[] }[];
  metrics: { label: string; value: string }[];
  architectureLayers: { name: string; detail: string }[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  categories: ProjectCategory[];
  badge: ProjectBadge;
  features: string[];
  architecture?: string[];
  note?: string;
  tech: string[];
  github?: string;
  url?: string;
  image?: string;
  video?: string;
  dossier?: ProjectDossierData;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  program: string;
  period: string;
  note?: string;
  highlights: string[];
  link?: {
    text: string;
    url: string;
  };
}

export type PageRoute = 'welcome' | 'about' | 'projects' | 'contacts';

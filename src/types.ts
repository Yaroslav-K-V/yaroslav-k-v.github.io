export type ProjectCategory = 'all' | 'ai' | 'fullstack' | 'desktop';

export type ProjectBadge = 'Live Service' | 'Desktop App' | 'Open Source' | 'In Progress';

export interface Project {
  id: number;
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

export type PageRoute = 'welcome' | 'about' | 'projects' | 'research' | 'contacts';

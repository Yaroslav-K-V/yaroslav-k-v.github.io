import { ExperienceItem } from '../types';

export const experience: ExperienceItem[] = [
  {
    id: 'grenergy',
    role: 'AI Agent Developer Intern',
    company: 'Grenergy LLC',
    location: 'Istanbul, Türkiye',
    program: 'Erasmus+ traineeship',
    period: 'Jun 2026 – Sep 2026',
    note: 'Continuing remotely as volunteer contributor',
    highlights: [
      'Contributed to meetbadi.com — live meeting transcription, translation, and AI summary service for Google Meet, Zoom, and Teams.',
      'Developed and maintained the website and Chrome extension frontend using TypeScript and React.',
      'Designed and integrated backend services, authentication flows, and PostgreSQL tables with Supabase.',
      'Engineered desktop application features utilizing Go and Wails.',
      'Implemented LLM inference workflows via OpenRouter for multi-language translation and meeting digest generation.'
    ],
    link: {
      text: 'meetbadi.com',
      url: 'https://meetbadi.com'
    }
  }
];

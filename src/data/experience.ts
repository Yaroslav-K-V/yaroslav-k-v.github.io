import { ExperienceItem } from '../types';

export const experience: ExperienceItem[] = [
  {
    id: 'grenergy',
    role: 'AI Agent Developer Intern',
    company: 'Grenergy LLC',
    location: 'Hybrid, Istanbul',
    program: 'Internship',
    period: 'Jun 2026 – Aug 2026',
    highlights: [
      'Maintained a production web platform (web app, Chrome extension, Supabase backend): updated layouts and features, fixed bugs, and kept existing sites and tools running reliably.',
      'Wrote Python and TypeScript/JavaScript scripts and integrations that automated routine work, processed data, and connected third-party services (OpenRouter, Stripe, Resend) via REST APIs with authentication and error handling.',
      'Maintained and extended data-backed dashboard and tooling views on top of PostgreSQL/Supabase, including debugging data and integration issues reported by users.',
      'Worked in GitHub with organized branches, commits, and pull requests; wrote technical documentation to support handover and onboarding.',
      'Used Claude Code and agentic AI workflows daily to explore the codebase, plan changes, write code, and debug; reviewed AI output for correctness before shipping.',
      'Supported Linux VPS hosting and CI/CD deployment pipelines, helping deliver fixes and small tools reliably.'
    ],
    link: {
      text: 'meetbadi.com',
      url: 'https://meetbadi.com'
    }
  }
];

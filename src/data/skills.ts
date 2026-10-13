export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface CompetencyMatrix {
  id: string;
  index: string;
  title: string;
  tag: string;
  summary: string;
  primarySkills: string[];
  secondarySkills: string[];
  frameworks: string[];
}

export const competencyMatrices: CompetencyMatrix[] = [
  {
    id: 'frontend',
    index: '01',
    title: 'Frontend',
    tag: 'Web · client',
    summary: 'Web interfaces, layouts, and browser tooling maintained in production.',
    primarySkills: ['JavaScript', 'TypeScript', 'HTML/CSS', 'React (foundational)'],
    secondarySkills: ['Chrome Extensions', 'Responsive Layouts', 'Bug Fixing'],
    frameworks: ['React', 'Chrome Extension MV3', 'REST-backed UIs']
  },
  {
    id: 'backend',
    index: '02',
    title: 'Scripting & Backend',
    tag: 'APIs & integrations',
    summary: 'Scripting, REST integrations, and data-backed tooling views.',
    primarySkills: ['Python', 'Flask', 'REST APIs', 'pytest'],
    secondarySkills: ['Node.js (foundational)', 'Third-party Integrations', 'Auth & Error Handling'],
    frameworks: ['Flask', 'Node.js', 'OpenRouter', 'Stripe', 'Resend']
  },
  {
    id: 'ai-workflow',
    index: '03',
    title: 'AI-Assisted Development & Hosting',
    tag: 'Workflow & delivery',
    summary: 'Daily agentic AI workflows plus version control and deployment basics.',
    primarySkills: ['Claude Code (daily)', 'Agentic Workflows', 'MCP', 'Prompt Engineering'],
    secondarySkills: ['LLM Integration', 'RAG', 'Cursor (familiar)', 'pandas'],
    frameworks: ['Git & GitHub (branches, PRs)', 'CI/CD', 'Linux/VPS', 'Supabase', 'PostgreSQL']
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: ['JavaScript', 'TypeScript', 'HTML/CSS', 'React (foundational)', 'Chrome Extensions']
  },
  {
    title: 'Scripting & Backend',
    skills: [
      'Python',
      'Flask',
      'Node.js (foundational)',
      'REST APIs',
      'Third-party integrations',
      'pytest'
    ]
  },
  {
    title: 'Data & Tooling',
    skills: ['PostgreSQL', 'Supabase', 'dashboards', 'pandas', 'Jupyter Notebook']
  },
  {
    title: 'AI-Assisted Development (daily)',
    skills: [
      'Claude Code',
      'Cursor (familiar)',
      'Agentic workflows',
      'MCP',
      'LLM Integration',
      'RAG',
      'Prompt Engineering'
    ]
  },
  {
    title: 'Workflow & Hosting',
    skills: ['Git', 'GitHub (branches, commits, pull requests)', 'CI/CD', 'Linux/VPS', 'deployment & hosting basics']
  },
  {
    title: 'Spoken Languages',
    skills: ['Ukrainian — Native', 'English — B2 (C1 Reading)']
  }
];

export const certifications = [
  {
    provider: 'Vanderbilt University',
    title: 'AI Agents with Model Context Protocol Specialization',
    date: 'Sep 2026',
    detail: 'Credential ID: 7GNJTGZNZJJU • Model Context Protocol (MCP), Agentic AI architectures, tool orchestration, and GenAI workflows'
  },
  {
    provider: 'Vanderbilt University',
    title: 'Generative AI Software Engineering Specialization',
    date: 'Sep 2026',
    detail: 'Credential ID: 8XRRZ8TGWFKL • Software engineering with LLMs, prompt patterns, software architecture & design'
  },
  {
    provider: 'Sooezy Academy',
    title: 'Agentic AI Sooezy - Season 1',
    date: 'Aug 2026',
    detail: 'Credential ID: SOOEZY-1E4FAF • Agentic AI development, autonomous coding workflows, Claude Code'
  },
  {
    provider: 'IBM',
    title: 'Fundamentals of AI Agents Using RAG and LangChain',
    date: 'Mar 2026',
    detail: 'RAG-based systems with LangChain, embeddings, vector stores, and multi-step reasoning agents'
  },
  {
    provider: 'IBM',
    title: 'Python for Data Science, AI & Development',
    date: 'Feb 2026',
    detail: 'Data analysis and manipulation with pandas & NumPy; REST APIs, JSON data, and Python fundamentals'
  }
];

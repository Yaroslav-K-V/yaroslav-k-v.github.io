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
    id: 'systems-languages',
    index: '01',
    title: 'Systems & Languages',
    tag: 'CORE // COMPILED & TYPED',
    summary: 'Strong foundational grasp of compiled and strictly typed languages, memory paradigms, async event loops, and relational queries.',
    primarySkills: ['C#', 'Python', 'TypeScript', 'SQL'],
    secondarySkills: ['Go', 'JavaScript', 'HTML5 / CSS3'],
    frameworks: ['.NET 8/9', 'FastAPI', 'Node.js', 'PostgreSQL', 'SQLite', 'Tailwind CSS']
  },
  {
    id: 'ai-data',
    index: '02',
    title: 'AI & Applied Data',
    tag: 'DATA // AGENTS & INFERENCE',
    summary: 'Autonomous LLM agent orchestration, deterministic function calling, structured extraction pipelines, and vector semantic retrieval.',
    primarySkills: ['LLM Agents', 'ETL Pipelines', 'Pandas', 'RAG Systems'],
    secondarySkills: ['OpenRouter API', 'LangChain', 'NumPy', 'Data Analysis / EDA'],
    frameworks: ['Qdrant', 'pgvector', 'Structured Outputs', 'Multi-Provider Fallbacks', 'Prompt Optimization']
  },
  {
    id: 'arch-tools',
    index: '03',
    title: 'Architecture & Tools',
    tag: 'INFRA // PATTERNS & PIPELINES',
    summary: 'Domain-driven modular systems, clean layered boundaries, automated testing verification, and containerized deployment pipelines.',
    primarySkills: ['Clean Architecture', 'Docker', 'Git', 'CI/CD Workflows'],
    secondarySkills: ['MVVM & Repository Pattern', 'Automated Testing / pytest', 'AST Parsing'],
    frameworks: ['Supabase (Auth & RLS)', 'GitHub Actions', 'Wails (Go + Web)', 'PySide6', 'WPF / WinForms']
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Systems & Languages',
    skills: ['C#', 'Python', 'TypeScript', 'SQL', 'Go', 'JavaScript', 'HTML5', 'CSS3']
  },
  {
    title: 'AI & Applied Data',
    skills: [
      'LLM Agents',
      'ETL Pipelines',
      'Pandas',
      'RAG Architectures',
      'OpenRouter',
      'LangChain',
      'Qdrant',
      'NumPy',
      'Vector Search',
      'Data Analysis (EDA)'
    ]
  },
  {
    title: 'Architecture & Tooling',
    skills: [
      'Clean Architecture',
      'Docker',
      'Git',
      'CI/CD Workflows',
      'MVVM & Repository',
      'Supabase',
      'PostgreSQL',
      'pytest',
      'AST Parsing',
      'Wails',
      'FastAPI',
      'React'
    ]
  }
];

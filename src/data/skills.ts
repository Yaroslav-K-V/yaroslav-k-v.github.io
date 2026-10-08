export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'C#', 'HTML', 'CSS', 'Go', 'SQL']
  },
  {
    title: 'Tools & Frameworks',
    skills: [
      'React',
      'FastAPI',
      'Flask',
      'Supabase',
      'PostgreSQL',
      'Git',
      'Wails',
      'PySide6',
      '.NET / WinForms',
      'pytest',
      'LangChain',
      'pandas',
      'pywebview'
    ]
  },
  {
    title: 'Core Concepts',
    skills: [
      'Clean Architecture',
      'REST APIs',
      'Object-Oriented Programming (OOP)',
      'MVVM & Repository Pattern',
      'AST Parsing',
      'LLM Prompt Engineering & Agents',
      'Data Analysis & EDA',
      'Version Control (Git)'
    ]
  }
];

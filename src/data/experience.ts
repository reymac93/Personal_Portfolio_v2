export type Experience = {
  id: string
  role: string
  company: string
  mode: string
  period: string
  start: string
  end: string
  current?: boolean
  summary: string
  highlights: string[]
  metrics: { value: string; label: string }[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    id: 'helenhood',
    role: 'Senior Full Stack & AI/ML Engineer',
    company: 'Helenhood Inc',
    mode: 'On-site',
    period: 'Sep 2022 — Present',
    start: '2022-09',
    end: 'Present',
    current: true,
    summary:
      'Own the path from model notebook to production endpoint — building the pipelines, services, and monitoring that keep ML features reliable inside enterprise applications.',
    highlights: [
      'Designed and implemented machine learning models with Python (scikit-learn, TensorFlow), delivering predictive solutions that automated workflows and cut manual intervention across enterprise applications.',
      'Built and maintained data pipelines in Python and FastAPI, handling preprocessing, transformation, and feature engineering for structured and unstructured datasets in production.',
      'Deployed models to production behind FastAPI on AWS and Azure, supporting both real-time and batch inference without sacrificing scalability.',
      'Developed backend services in Python (FastAPI, Django) and Node.js, integrating AI capabilities directly into product surfaces.',
      'Ran advanced analysis with Pandas and NumPy to turn complex datasets into decisions the business could act on.',
      'Tuned hyperparameters and validation strategy to reach 25% faster inference and 30% shorter training time against baseline.',
      'Instrumented deployed models with cloud-native monitoring, catching bottlenecks early and lifting system uptime by 15%.',
    ],
    metrics: [
      { value: '25%', label: 'faster inference' },
      { value: '30%', label: 'less training time' },
      { value: '15%', label: 'uptime gain' },
    ],
    stack: [
      'Python',
      'FastAPI',
      'Django',
      'Node.js',
      'TensorFlow',
      'scikit-learn',
      'Pandas',
      'AWS',
      'Azure',
    ],
  },
  {
    id: 'pointwest',
    role: 'Full Stack Developer',
    company: 'Pointwest Technologies',
    mode: 'Remote',
    period: 'Jan 2019 — Jul 2022',
    start: '2019-01',
    end: '2022-07',
    summary:
      'Delivered backend services and interfaces for high-traffic web applications, and led the refactor that broke a legacy system into something maintainable.',
    highlights: [
      'Developed backend services in Node.js, Python (Django, FastAPI), PHP, and Golang for applications handling high traffic and dense business logic.',
      'Built and maintained RESTful APIs for frontend clients and third-party integrations, holding data consistency across distributed systems.',
      'Developed responsive interfaces with React, Angular, JavaScript, HTML, and CSS, tuned for usability, accessibility, and performance.',
      'Designed and optimized PostgreSQL, MySQL, and MongoDB schemas — indexing and normalization work that improved query efficiency and cut storage overhead.',
      'Integrated external APIs and automation services to remove manual steps from enterprise workflows.',
      'Refactored legacy systems into modular, scalable architectures: 40% performance gain, less downtime, and 20+ developer hours saved per sprint.',
      'Implemented CI/CD pipelines with Docker and Git, shortening release cycles by 35%.',
    ],
    metrics: [
      { value: '40%', label: 'performance gain' },
      { value: '35%', label: 'faster releases' },
      { value: '20+', label: 'dev hours/sprint saved' },
    ],
    stack: [
      'Node.js',
      'Python',
      'Django',
      'Golang',
      'PHP',
      'React',
      'Angular',
      'PostgreSQL',
      'MongoDB',
      'Docker',
    ],
  },
  {
    id: 'arcanys',
    role: 'Software Engineer',
    company: 'Arcanys',
    mode: 'Remote',
    period: 'Sep 2014 — Nov 2018',
    start: '2014-09',
    end: '2018-11',
    summary:
      'Built the frontend foundations — component systems, validation, and performance work — for enterprise and consumer applications.',
    highlights: [
      'Developed responsive interfaces with AngularJS, jQuery, JavaScript, HTML5, and CSS3, delivering cross-browser experiences for enterprise and consumer products.',
      'Built modular UI components with dynamic validation and state management, cutting duplication and speeding up frontend cycles on large projects.',
      'Integrated frontends with Node.js, Python/Django, and Laravel APIs for reliable data exchange.',
      'Designed and optimized WordPress themes and Salesforce CMS modules so non-technical teams could own their own content.',
      'Improved UI performance to reach 30% faster load times and 25% lower rendering delay versus earlier implementations.',
      'Worked inside Agile delivery — sprint planning through release — contributing to a 20% reduction in feature delivery timelines.',
    ],
    metrics: [
      { value: '30%', label: 'faster load times' },
      { value: '25%', label: 'less render delay' },
      { value: '20%', label: 'shorter delivery' },
    ],
    stack: [
      'AngularJS',
      'JavaScript',
      'jQuery',
      'HTML5',
      'CSS3',
      'Laravel',
      'Django',
      'WordPress',
      'Salesforce CMS',
    ],
  },
]

export const certifications = [
  {
    title: 'React & Next.js: Modern Full-Stack Development',
    issuer: 'LinkedIn Learning',
    year: '2025',
  },
  {
    title: 'PostgreSQL Performance Optimization & Query Tuning',
    issuer: 'LinkedIn Learning',
    year: '2025',
  },
  {
    title: 'AI-Assisted Development: Maximizing Productivity with ChatGPT & Copilot',
    issuer: 'LinkedIn Learning',
    year: '2025',
  },
] as const

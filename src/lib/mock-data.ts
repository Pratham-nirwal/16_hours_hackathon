export interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  healthScore: number;
  lastCommit: string;
  goodFirstIssues: number;
  ciStatus: 'passing' | 'failing' | 'warning';
  language: string;
  license: string;
  contributors: number;
  topics: string[];
  signals: string[];
  trend: 'up' | 'down' | 'stable';
  healthBreakdown: {
    activity: number;
    community: number;
    documentation: number;
    freshness: number;
    compatibility: number;
  };
  avgIssueResponseTime: string;
  prMergeRate: number;
  activeContributors: number;
  contributorDiversity: number;
  codeCoverage: number;
  hasGoodDocs: boolean;
  hasWiki: boolean;
  hasWebsite: boolean;
}

export interface Issue {
  id: string;
  title: string;
  repoName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  labels: string[];
  repoHealthScore: number;
}

export const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    stars: 218000,
    healthScore: 87,
    lastCommit: '2 days ago',
    goodFirstIssues: 12,
    ciStatus: 'passing',
    language: 'JavaScript',
    license: 'MIT',
    contributors: 1542,
    topics: ['react', 'ui', 'components', 'framework'],
    signals: ['Active', 'Good Docs', 'Beginner Friendly'],
    trend: 'up',
    healthBreakdown: {
      activity: 92,
      community: 88,
      documentation: 95,
      freshness: 85,
      compatibility: 75,
    },
    avgIssueResponseTime: '< 2 days',
    prMergeRate: 76,
    activeContributors: 245,
    contributorDiversity: 89,
    codeCoverage: 84,
    hasGoodDocs: true,
    hasWiki: true,
    hasWebsite: true,
  },
  {
    id: '2',
    name: 'tensorflow',
    description: 'An Open Source Machine Learning Framework for Everyone',
    stars: 182000,
    healthScore: 82,
    lastCommit: '5 hours ago',
    goodFirstIssues: 34,
    ciStatus: 'passing',
    language: 'Python',
    license: 'Apache 2.0',
    contributors: 3124,
    topics: ['machine-learning', 'deep-learning', 'neural-networks'],
    signals: ['Active', 'Good Docs', 'Large Community'],
    trend: 'stable',
    healthBreakdown: {
      activity: 88,
      community: 85,
      documentation: 90,
      freshness: 78,
      compatibility: 69,
    },
    avgIssueResponseTime: '3 days',
    prMergeRate: 68,
    activeContributors: 412,
    contributorDiversity: 156,
    codeCoverage: 79,
    hasGoodDocs: true,
    hasWiki: true,
    hasWebsite: true,
  },
  {
    id: '3',
    name: 'fastapi',
    description: 'FastAPI framework, high performance, easy to learn, fast to code, ready for production',
    stars: 67000,
    healthScore: 91,
    lastCommit: '1 day ago',
    goodFirstIssues: 8,
    ciStatus: 'passing',
    language: 'Python',
    license: 'MIT',
    contributors: 478,
    topics: ['python', 'api', 'async', 'rest'],
    signals: ['Active', 'Good Docs', 'Beginner Friendly', 'Modern'],
    trend: 'up',
    healthBreakdown: {
      activity: 95,
      community: 90,
      documentation: 98,
      freshness: 92,
      compatibility: 80,
    },
    avgIssueResponseTime: '< 1 day',
    prMergeRate: 82,
    activeContributors: 124,
    contributorDiversity: 45,
    codeCoverage: 92,
    hasGoodDocs: true,
    hasWiki: false,
    hasWebsite: true,
  },
  {
    id: '4',
    name: 'vue',
    description: 'The Progressive JavaScript Framework',
    stars: 205000,
    healthScore: 85,
    lastCommit: '3 days ago',
    goodFirstIssues: 15,
    ciStatus: 'passing',
    language: 'TypeScript',
    license: 'MIT',
    contributors: 892,
    topics: ['vue', 'framework', 'frontend', 'reactive'],
    signals: ['Active', 'Good Docs', 'Large Community'],
    trend: 'up',
    healthBreakdown: {
      activity: 89,
      community: 87,
      documentation: 93,
      freshness: 80,
      compatibility: 76,
    },
    avgIssueResponseTime: '2 days',
    prMergeRate: 74,
    activeContributors: 178,
    contributorDiversity: 67,
    codeCoverage: 88,
    hasGoodDocs: true,
    hasWiki: true,
    hasWebsite: true,
  },
  {
    id: '5',
    name: 'svelte',
    description: 'Cybernetically enhanced web apps',
    stars: 73000,
    healthScore: 88,
    lastCommit: '1 day ago',
    goodFirstIssues: 6,
    ciStatus: 'passing',
    language: 'TypeScript',
    license: 'MIT',
    contributors: 543,
    topics: ['svelte', 'framework', 'compiler', 'reactive'],
    signals: ['Active', 'Good Docs', 'Modern', 'Innovative'],
    trend: 'up',
    healthBreakdown: {
      activity: 91,
      community: 84,
      documentation: 89,
      freshness: 93,
      compatibility: 83,
    },
    avgIssueResponseTime: '< 2 days',
    prMergeRate: 79,
    activeContributors: 98,
    contributorDiversity: 34,
    codeCoverage: 86,
    hasGoodDocs: true,
    hasWiki: false,
    hasWebsite: true,
  },
  {
    id: '6',
    name: 'axios',
    description: 'Promise based HTTP client for the browser and node.js',
    stars: 103000,
    healthScore: 69,
    lastCommit: '12 days ago',
    goodFirstIssues: 3,
    ciStatus: 'warning',
    language: 'JavaScript',
    license: 'MIT',
    contributors: 412,
    topics: ['http', 'client', 'promise', 'ajax'],
    signals: ['Good Docs', 'Widely Used'],
    trend: 'down',
    healthBreakdown: {
      activity: 62,
      community: 75,
      documentation: 85,
      freshness: 58,
      compatibility: 65,
    },
    avgIssueResponseTime: '5 days',
    prMergeRate: 58,
    activeContributors: 45,
    contributorDiversity: 23,
    codeCoverage: 76,
    hasGoodDocs: true,
    hasWiki: false,
    hasWebsite: false,
  },
  {
    id: '7',
    name: 'nextjs',
    description: 'The React Framework for Production',
    stars: 118000,
    healthScore: 89,
    lastCommit: '4 hours ago',
    goodFirstIssues: 18,
    ciStatus: 'passing',
    language: 'JavaScript',
    license: 'MIT',
    contributors: 2678,
    topics: ['react', 'nextjs', 'ssr', 'framework'],
    signals: ['Active', 'Good Docs', 'Production Ready', 'Modern'],
    trend: 'up',
    healthBreakdown: {
      activity: 94,
      community: 91,
      documentation: 92,
      freshness: 88,
      compatibility: 80,
    },
    avgIssueResponseTime: '< 1 day',
    prMergeRate: 81,
    activeContributors: 324,
    contributorDiversity: 78,
    codeCoverage: 85,
    hasGoodDocs: true,
    hasWiki: true,
    hasWebsite: true,
  },
  {
    id: '8',
    name: 'deno',
    description: 'A modern runtime for JavaScript and TypeScript',
    stars: 92000,
    healthScore: 83,
    lastCommit: '6 hours ago',
    goodFirstIssues: 21,
    ciStatus: 'passing',
    language: 'Rust',
    license: 'MIT',
    contributors: 876,
    topics: ['runtime', 'typescript', 'javascript', 'secure'],
    signals: ['Active', 'Good Docs', 'Beginner Friendly', 'Modern'],
    trend: 'up',
    healthBreakdown: {
      activity: 87,
      community: 80,
      documentation: 88,
      freshness: 85,
      compatibility: 75,
    },
    avgIssueResponseTime: '2 days',
    prMergeRate: 73,
    activeContributors: 156,
    contributorDiversity: 45,
    codeCoverage: 81,
    hasGoodDocs: true,
    hasWiki: true,
    hasWebsite: true,
  },
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Improve error message for missing required props',
    repoName: 'react',
    difficulty: 'Beginner',
    timeEstimate: '~2 hours',
    labels: ['good-first-issue', 'documentation', 'error-messages'],
    repoHealthScore: 87,
  },
  {
    id: '2',
    title: 'Add TypeScript examples to the tutorial',
    repoName: 'fastapi',
    difficulty: 'Beginner',
    timeEstimate: '~3 hours',
    labels: ['good-first-issue', 'documentation', 'typescript'],
    repoHealthScore: 91,
  },
  {
    id: '3',
    title: 'Fix typo in contribution guide',
    repoName: 'tensorflow',
    difficulty: 'Beginner',
    timeEstimate: '~30 min',
    labels: ['good-first-issue', 'documentation'],
    repoHealthScore: 82,
  },
  {
    id: '4',
    title: 'Implement caching for API responses',
    repoName: 'vue',
    difficulty: 'Intermediate',
    timeEstimate: '~5 hours',
    labels: ['enhancement', 'performance'],
    repoHealthScore: 85,
  },
  {
    id: '5',
    title: 'Add dark mode support to component library',
    repoName: 'svelte',
    difficulty: 'Intermediate',
    timeEstimate: '~4 hours',
    labels: ['enhancement', 'ui', 'good-first-issue'],
    repoHealthScore: 88,
  },
  {
    id: '6',
    title: 'Update README with new CLI commands',
    repoName: 'deno',
    difficulty: 'Beginner',
    timeEstimate: '~1 hour',
    labels: ['good-first-issue', 'documentation'],
    repoHealthScore: 83,
  },
];

export const featuredCollections = [
  {
    title: "Editor's Picks",
    description: 'Curated selection of exceptional projects',
    count: 24,
    icon: 'star',
  },
  {
    title: 'Rising Stars',
    description: 'Fast-growing projects with strong momentum',
    count: 37,
    icon: 'trending-up',
  },
  {
    title: 'Beginner Friendly',
    description: 'Great first-time contribution opportunities',
    count: 56,
    icon: 'heart',
  },
];

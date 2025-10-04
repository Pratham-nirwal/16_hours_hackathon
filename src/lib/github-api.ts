const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  license: { spdx_id: string; name: string } | null;
  open_issues_count: number;
  watchers_count: number;
  forks_count: number;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  has_wiki: boolean;
  has_pages: boolean;
  homepage: string | null;
}

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubRepo[];
}

interface SearchOptions {
  query: string;
  language?: string[];
  stars?: string;
  pushed?: string;
  created?: string;
  license?: string;
  goodFirstIssues?: boolean;
  topics?: string[];
  sort?: 'stars' | 'forks' | 'updated' | 'best-match';
  order?: 'asc' | 'desc';
  perPage?: number;
  page?: number;
}

export async function searchRepositories(options: SearchOptions): Promise<GitHubSearchResponse> {
  let queryParts: string[] = [options.query || 'stars:>1000'];

  if (options.language && options.language.length > 0) {
    const langQuery = options.language.map(lang => `language:${lang}`).join(' ');
    queryParts.push(`(${langQuery})`);
  }

  if (options.stars) {
    queryParts.push(`stars:${options.stars}`);
  }

  if (options.pushed) {
    queryParts.push(`pushed:${options.pushed}`);
  }

  if (options.created) {
    queryParts.push(`created:${options.created}`);
  }

  if (options.license) {
    queryParts.push(`license:${options.license}`);
  }

  if (options.goodFirstIssues) {
    queryParts.push('good-first-issues:>0');
  }

  if (options.topics && options.topics.length > 0) {
    options.topics.forEach(topic => {
      queryParts.push(`topic:${topic}`);
    });
  }

  const queryString = queryParts.join(' ');
  const params = new URLSearchParams({
    q: queryString,
    sort: options.sort || 'stars',
    order: options.order || 'desc',
    per_page: String(options.perPage || 30),
    page: String(options.page || 1),
  });

  const response = await fetch(`${GITHUB_API_BASE}/search/repositories?${params}`, {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getRepositoryDetails(owner: string, repo: string): Promise<GitHubRepo> {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getRepositoryContributors(owner: string, repo: string): Promise<number> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?per_page=1`, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!response.ok) {
      return 0;
    }

    const linkHeader = response.headers.get('Link');
    if (linkHeader) {
      const match = linkHeader.match(/page=(\d+)>; rel="last"/);
      if (match) {
        return parseInt(match[1]);
      }
    }

    const contributors = await response.json();
    return contributors.length;
  } catch (error) {
    return 0;
  }
}

export async function getGoodFirstIssues(owner: string, repo: string): Promise<number> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/search/issues?q=repo:${owner}/${repo}+label:"good first issue"+state:open`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    return data.total_count || 0;
  } catch (error) {
    return 0;
  }
}

export async function getRepositoryWorkflows(owner: string, repo: string): Promise<boolean> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/workflows`, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.total_count > 0;
  } catch (error) {
    return false;
  }
}

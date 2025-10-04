import type { Repository } from './mock-data';

interface GitHubRepoData {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  license: { spdx_id: string; name: string } | null;
  open_issues_count: number;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  has_wiki: boolean;
  has_pages: boolean;
  homepage: string | null;
  contributors?: number;
  goodFirstIssues?: number;
  hasCI?: boolean;
}

export function calculateHealthScore(repo: GitHubRepoData): number {
  const scores: number[] = [];

  const activityScore = calculateActivityScore(repo.pushed_at);
  scores.push(activityScore);

  const communityScore = calculateCommunityScore(
    repo.stargazers_count,
    repo.contributors || 0
  );
  scores.push(communityScore);

  const documentationScore = calculateDocumentationScore(
    repo.description,
    repo.has_wiki,
    repo.has_pages,
    repo.homepage
  );
  scores.push(documentationScore);

  const freshnessScore = calculateFreshnessScore(repo.created_at, repo.pushed_at);
  scores.push(freshnessScore);

  const compatibilityScore = calculateCompatibilityScore(
    repo.license,
    repo.hasCI,
    repo.topics
  );
  scores.push(compatibilityScore);

  const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  return Math.round(averageScore);
}

function calculateActivityScore(pushedAt: string): number {
  const daysSinceLastPush = getDaysSince(pushedAt);

  if (daysSinceLastPush <= 7) return 95;
  if (daysSinceLastPush <= 14) return 90;
  if (daysSinceLastPush <= 30) return 85;
  if (daysSinceLastPush <= 60) return 75;
  if (daysSinceLastPush <= 90) return 65;
  if (daysSinceLastPush <= 180) return 50;
  return 30;
}

function calculateCommunityScore(stars: number, contributors: number): number {
  let score = 0;

  if (stars >= 50000) score += 50;
  else if (stars >= 10000) score += 45;
  else if (stars >= 5000) score += 40;
  else if (stars >= 1000) score += 35;
  else if (stars >= 500) score += 25;
  else score += 15;

  if (contributors >= 500) score += 50;
  else if (contributors >= 100) score += 45;
  else if (contributors >= 50) score += 40;
  else if (contributors >= 20) score += 30;
  else if (contributors >= 10) score += 20;
  else score += 10;

  return Math.min(100, score);
}

function calculateDocumentationScore(
  description: string | null,
  hasWiki: boolean,
  hasPages: boolean,
  homepage: string | null
): number {
  let score = 0;

  if (description && description.length > 20) score += 25;
  if (hasWiki) score += 25;
  if (hasPages) score += 25;
  if (homepage) score += 25;

  return score;
}

function calculateFreshnessScore(createdAt: string, pushedAt: string): number {
  const daysSinceCreation = getDaysSince(createdAt);
  const daysSinceLastPush = getDaysSince(pushedAt);

  if (daysSinceCreation < 365) {
    if (daysSinceLastPush <= 30) return 95;
    if (daysSinceLastPush <= 90) return 85;
    return 70;
  }

  if (daysSinceLastPush <= 7) return 95;
  if (daysSinceLastPush <= 30) return 85;
  if (daysSinceLastPush <= 90) return 70;
  if (daysSinceLastPush <= 180) return 55;
  return 35;
}

function calculateCompatibilityScore(
  license: { spdx_id: string; name: string } | null,
  hasCI: boolean | undefined,
  topics: string[]
): number {
  let score = 0;

  if (license) score += 40;
  if (hasCI) score += 30;
  if (topics && topics.length > 0) score += 30;

  return score;
}

function getDaysSince(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getTimeAgo(dateString: string): string {
  const days = getDaysSince(dateString);

  if (days === 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  const years = Math.floor(days / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

export function transformGitHubRepoToRepository(
  githubRepo: GitHubRepoData
): Repository {
  const healthScore = calculateHealthScore(githubRepo);
  const [owner] = githubRepo.full_name.split('/');

  const healthBreakdown = {
    activity: calculateActivityScore(githubRepo.pushed_at),
    community: calculateCommunityScore(githubRepo.stargazers_count, githubRepo.contributors || 0),
    documentation: calculateDocumentationScore(
      githubRepo.description,
      githubRepo.has_wiki,
      githubRepo.has_pages,
      githubRepo.homepage
    ),
    freshness: calculateFreshnessScore(githubRepo.created_at, githubRepo.pushed_at),
    compatibility: calculateCompatibilityScore(
      githubRepo.license,
      githubRepo.hasCI,
      githubRepo.topics
    ),
  };

  const daysSinceLastPush = getDaysSince(githubRepo.pushed_at);
  let trend: 'up' | 'down' | 'stable' = 'stable';
  if (daysSinceLastPush <= 7) trend = 'up';
  else if (daysSinceLastPush > 90) trend = 'down';

  const signals: string[] = [];
  if (daysSinceLastPush <= 7) signals.push('Active');
  if (githubRepo.has_wiki || githubRepo.has_pages || githubRepo.homepage) signals.push('Good Docs');
  if (githubRepo.goodFirstIssues && githubRepo.goodFirstIssues > 0) signals.push('Beginner Friendly');
  if (githubRepo.stargazers_count >= 10000) signals.push('Large Community');
  if (getDaysSince(githubRepo.created_at) < 730) signals.push('Modern');

  return {
    id: String(githubRepo.id),
    name: githubRepo.name,
    description: githubRepo.description || 'No description available',
    stars: githubRepo.stargazers_count,
    healthScore,
    lastCommit: getTimeAgo(githubRepo.pushed_at),
    goodFirstIssues: githubRepo.goodFirstIssues || 0,
    ciStatus: githubRepo.hasCI ? 'passing' : 'warning',
    language: githubRepo.language || 'Unknown',
    license: githubRepo.license?.name || 'No License',
    contributors: githubRepo.contributors || 0,
    topics: githubRepo.topics || [],
    signals,
    trend,
    healthBreakdown,
    avgIssueResponseTime: '< 2 days',
    prMergeRate: 75,
    activeContributors: Math.floor((githubRepo.contributors || 0) * 0.3),
    contributorDiversity: Math.floor((githubRepo.contributors || 0) * 0.5),
    codeCoverage: 80,
    hasGoodDocs: !!(githubRepo.has_wiki || githubRepo.has_pages || githubRepo.homepage),
    hasWiki: githubRepo.has_wiki,
    hasWebsite: !!githubRepo.homepage,
  };
}

import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { FilterSidebar } from './FilterSidebar';
import { RepositoryCard } from './RepositoryCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader as Loader2 } from 'lucide-react';
import type { Repository } from '../lib/mock-data';
import { searchRepositories, getRepositoryContributors, getGoodFirstIssues, getRepositoryWorkflows } from '../lib/github-api';
import { transformGitHubRepoToRepository } from '../lib/health-calculator';

export interface FilterOptions {
  languages: string[];
  activityDays: number;
  healthRange: [number, number];
  hasGoodFirstIssues: boolean;
  minIssues: number;
  hasCi: boolean;
  hasDocs: boolean;
  license: string;
}

interface SearchResultsPageProps {
  initialQuery?: string;
  onViewDetails: (repo: Repository) => void;
  onCompare: (repos: Repository[]) => void;
}

export function SearchResultsPage({
  initialQuery = '',
  onViewDetails,
  onCompare
}: SearchResultsPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('health');
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [comparing, setComparing] = useState<string[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    languages: [],
    activityDays: 30,
    healthRange: [0, 100],
    hasGoodFirstIssues: false,
    minIssues: 0,
    hasCi: false,
    hasDocs: false,
    license: '',
  });

  const handleBookmark = (repoId: string) => {
    setBookmarked(prev =>
      prev.includes(repoId) ? prev.filter(id => id !== repoId) : [...prev, repoId]
    );
  };

  const handleCompare = (repoId: string) => {
    setComparing(prev => {
      const newComparing = prev.includes(repoId) 
        ? prev.filter(id => id !== repoId) 
        : prev.length < 3 
          ? [...prev, repoId] 
          : prev;
      
      if (newComparing.length > 1) {
        const selectedRepos = repositories.filter(r => newComparing.includes(r.id));
        setTimeout(() => onCompare(selectedRepos), 100);
      }
      
      return newComparing;
    });
  };

  useEffect(() => {
    performSearch();
  }, []);

  const performSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const pushedDate = new Date();
      pushedDate.setDate(pushedDate.getDate() - filters.activityDays);
      const pushedFilter = `>${pushedDate.toISOString().split('T')[0]}`;

      const licenseMap: Record<string, string> = {
        'mit': 'mit',
        'apache': 'apache-2.0',
        'gpl': 'gpl-3.0',
        'bsd': 'bsd-3-clause',
      };

      const searchOptions = {
        query: searchQuery || 'stars:>1000',
        language: filters.languages.length > 0 ? filters.languages : undefined,
        pushed: pushedFilter,
        license: filters.license ? licenseMap[filters.license] : undefined,
        goodFirstIssues: filters.hasGoodFirstIssues,
        sort: 'stars' as const,
        perPage: 30,
      };

      const response = await searchRepositories(searchOptions);

      const enrichedRepos = await Promise.all(
        response.items.map(async (item) => {
          const [owner, repoName] = item.full_name.split('/');

          const [contributors, goodFirstIssues, hasCI] = await Promise.all([
            getRepositoryContributors(owner, repoName),
            getGoodFirstIssues(owner, repoName),
            getRepositoryWorkflows(owner, repoName),
          ]);

          return transformGitHubRepoToRepository({
            ...item,
            contributors,
            goodFirstIssues,
            hasCI,
          });
        })
      );

      let filteredRepos = enrichedRepos.filter((repo) => {
        if (repo.healthScore < filters.healthRange[0] || repo.healthScore > filters.healthRange[1]) {
          return false;
        }

        if (filters.minIssues > 0 && repo.goodFirstIssues < filters.minIssues) {
          return false;
        }

        if (filters.hasCi && repo.ciStatus !== 'passing') {
          return false;
        }

        if (filters.hasDocs && !repo.hasGoodDocs) {
          return false;
        }

        return true;
      });

      setRepositories(filteredRepos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    performSearch();
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const sortedRepos = [...repositories].sort((a, b) => {
    switch (sortBy) {
      case 'health':
        return b.healthScore - a.healthScore;
      case 'stars':
        return b.stars - a.stars;
      case 'activity':
        return a.lastCommit.localeCompare(b.lastCommit);
      case 'issues':
        return b.goodFirstIssues - a.goodFirstIssues;
      default:
        return 0;
    }
  });

  return (
    <div className="flex h-screen">
      <FilterSidebar onFilterChange={handleFilterChange} onApplyFilters={performSearch} />

      <div className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-background sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              className="mb-4"
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {loading ? 'Searching...' : `Showing ${repositories.length} repositories`}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health">Health Score (default)</SelectItem>
                    <SelectItem value="stars">Stars</SelectItem>
                    <SelectItem value="activity">Recent Activity</SelectItem>
                    <SelectItem value="issues">Good First Issues</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 mb-2">Error: {error}</p>
              <button
                onClick={performSearch}
                className="text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && repositories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No repositories found. Try adjusting your search or filters.</p>
            </div>
          )}

          {!loading && !error && repositories.length > 0 && (
            <div className="grid gap-6">
              {sortedRepos.map((repo) => (
                <RepositoryCard
                  key={repo.id}
                  repo={repo}
                  onViewDetails={() => onViewDetails(repo)}
                  onBookmark={() => handleBookmark(repo.id)}
                  isBookmarked={bookmarked.includes(repo.id)}
                  onCompare={() => handleCompare(repo.id)}
                  isComparing={comparing.includes(repo.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

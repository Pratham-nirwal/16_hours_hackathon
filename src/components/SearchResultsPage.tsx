import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { FilterSidebar } from './FilterSidebar';
import { RepositoryCard } from './RepositoryCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Repository } from '../lib/mock-data';

interface SearchResultsPageProps {
  repositories: Repository[];
  initialQuery?: string;
  onViewDetails: (repo: Repository) => void;
  onCompare: (repos: Repository[]) => void;
}

export function SearchResultsPage({ 
  repositories, 
  initialQuery = '',
  onViewDetails,
  onCompare 
}: SearchResultsPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('health');
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [comparing, setComparing] = useState<string[]>([]);

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
      <FilterSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-background sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              className="mb-4"
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {repositories.length} repositories
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
        </div>
      </div>
    </div>
  );
}

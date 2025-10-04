import { useState } from 'react';
import { Menu, Home, Search, Bookmark, GitPullRequest } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { SearchResultsPage } from './components/SearchResultsPage';
import { RepositoryDetailPage } from './components/RepositoryDetailPage';
import { BookmarksPage } from './components/BookmarksPage';
import { ContributorDashboard } from './components/ContributorDashboard';
import { HealthScoreModal } from './components/HealthScoreModal';
import { ComparisonModal } from './components/ComparisonModal';
import { Button } from './components/ui/button';
import { mockRepositories, type Repository } from './lib/mock-data';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type Page = 'landing' | 'search' | 'details' | 'bookmarks' | 'contribute';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [bookmarkedRepos, setBookmarkedRepos] = useState<Repository[]>([]);
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [comparingRepos, setComparingRepos] = useState<Repository[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const handleViewDetails = (repo: Repository) => {
    setSelectedRepo(repo);
    setCurrentPage('details');
    window.scrollTo(0, 0);
  };

  const handleAddBookmark = (repo: Repository) => {
    if (!bookmarkedRepos.find(r => r.id === repo.id)) {
      setBookmarkedRepos([...bookmarkedRepos, repo]);
      toast.success('Repository bookmarked!');
    }
  };

  const handleRemoveBookmark = (repoId: string) => {
    setBookmarkedRepos(bookmarkedRepos.filter(r => r.id !== repoId));
    toast.success('Bookmark removed');
  };

  const handleCompare = (repos: Repository[]) => {
    setComparingRepos(repos);
    setShowComparisonModal(true);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const getSimilarRepos = (repo: Repository) => {
    return mockRepositories
      .filter(r => r.id !== repo.id && r.language === repo.language)
      .slice(0, 4);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <header className="border-b border-border bg-background sticky top-0 z-50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <button
                  onClick={() => handleNavigate('landing')}
                  className="text-xl flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <Search className="w-5 h-5" />
                  </div>
                  <span>RepoHealth</span>
                </button>
                <nav className="hidden md:flex gap-6">
                  <button
                    onClick={() => handleNavigate('landing')}
                    className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${
                      currentPage === 'landing' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </button>
                  <button
                    onClick={() => handleNavigate('search')}
                    className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${
                      currentPage === 'search' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    Search
                  </button>
                  <button
                    onClick={() => handleNavigate('bookmarks')}
                    className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${
                      currentPage === 'bookmarks' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    Bookmarks
                    {bookmarkedRepos.length > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-1.5 rounded-full">
                        {bookmarkedRepos.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => handleNavigate('contribute')}
                    className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${
                      currentPage === 'contribute' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <GitPullRequest className="w-4 h-4" />
                    Contribute
                  </button>
                </nav>
              </div>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        {currentPage === 'landing' && (
          <LandingPage onSearch={handleSearch} />
        )}

        {currentPage === 'search' && (
          <SearchResultsPage
            repositories={mockRepositories}
            initialQuery={searchQuery}
            onViewDetails={handleViewDetails}
            onCompare={handleCompare}
          />
        )}

        {currentPage === 'details' && selectedRepo && (
          <RepositoryDetailPage
            repo={selectedRepo}
            onShowHealthModal={() => setShowHealthModal(true)}
            similarRepos={getSimilarRepos(selectedRepo)}
            onViewRepo={handleViewDetails}
          />
        )}

        {currentPage === 'bookmarks' && (
          <BookmarksPage
            bookmarkedRepos={bookmarkedRepos}
            onViewDetails={handleViewDetails}
            onRemoveBookmark={handleRemoveBookmark}
          />
        )}

        {currentPage === 'contribute' && (
          <ContributorDashboard
            onViewRepo={(repoName) => {
              const repo = mockRepositories.find(r => r.name === repoName);
              if (repo) handleViewDetails(repo);
            }}
          />
        )}

        {/* Footer */}
        <footer className="border-t border-border bg-muted/30 py-12 mt-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h4 className="mb-3">RepoHealth</h4>
                <p className="text-sm text-muted-foreground">
                  Find healthy repos, not just popular ones.
                </p>
              </div>
              <div>
                <h4 className="mb-3 text-sm">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Features</a></li>
                  <li><a href="#" className="hover:text-foreground">Methodology</a></li>
                  <li><a href="#" className="hover:text-foreground">API</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                  <li><a href="#" className="hover:text-foreground">Blog</a></li>
                  <li><a href="#" className="hover:text-foreground">Community</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">About</a></li>
                  <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                  <li><a href="#" className="hover:text-foreground">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              © 2025 RepoHealth. Made with ❤️ for open source developers.
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <HealthScoreModal
        isOpen={showHealthModal}
        onClose={() => setShowHealthModal(false)}
        repo={selectedRepo || undefined}
      />

      <ComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        repositories={comparingRepos}
      />

      <Toaster />
    </>
  );
}
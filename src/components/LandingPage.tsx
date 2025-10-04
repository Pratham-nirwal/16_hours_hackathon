import { useState } from 'react';
import { Star, TrendingUp, Heart, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface LandingPageProps {
  onSearch: (query: string) => void;
}

export function LandingPage({ onSearch }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const quickFilters = ['JavaScript', 'Python', 'Active Last 30 Days', 'Good First Issues'];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl mb-4">
            Find Healthy Repos, Not Just Popular Ones
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover active, well-maintained open-source projects using our comprehensive health score 
            instead of relying solely on star counts
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        <div className="max-w-3xl mx-auto flex flex-wrap gap-2 justify-center">
          {quickFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
              onClick={() => {
                setSearchQuery(filter);
                onSearch(filter);
              }}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-2 border-red-200 bg-background">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <h3>Old Way (Stars)</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span>popular-but-abandoned</span>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>156k</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Last commit: 2 years ago</p>
                    <p className="text-xs text-red-500 mt-1">No active maintenance</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span>trendy-framework</span>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>89k</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Last commit: 8 months ago</p>
                    <p className="text-xs text-red-500 mt-1">Breaking changes, poor docs</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-green-200 bg-background">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <h3>New Way (Health Score)</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span>fastapi</span>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 border-2 border-green-500/20 flex items-center justify-center text-green-500 text-sm">
                          91
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Last commit: 1 day ago</p>
                    <p className="text-xs text-green-500 mt-1">Active, well-documented, beginner-friendly</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span>svelte</span>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 border-2 border-green-500/20 flex items-center justify-center text-green-500 text-sm">
                          88
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Last commit: 1 day ago</p>
                    <p className="text-xs text-green-500 mt-1">Modern, innovative, great community</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-center mb-12">Featured Collections</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="mb-2">Editor's Picks</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Curated selection of exceptional projects
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">24 repositories</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="mb-2">Rising Stars</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Fast-growing projects with strong momentum
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">37 repositories</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="mb-2">Beginner Friendly</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Great first-time contribution opportunities
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">56 repositories</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Why Star Count Isn't Enough */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-center mb-12">Why star count isn't enough</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="mb-2">Activity Matters</h4>
                <p className="text-sm text-muted-foreground">
                  A repository with 10k stars but no commits in 2 years is less valuable than an active project with 1k stars
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="mb-2">Community Health</h4>
                <p className="text-sm text-muted-foreground">
                  Fast response times and good contributor diversity indicate a healthy, sustainable project
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="mb-2">Documentation Quality</h4>
                <p className="text-sm text-muted-foreground">
                  Great docs make or break the developer experience. We check for completeness and clarity
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="mb-2">Production Ready</h4>
                <p className="text-sm text-muted-foreground">
                  CI/CD status, test coverage, and compatibility signals help you choose production-ready projects
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => onSearch('')}>
              Explore Repositories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

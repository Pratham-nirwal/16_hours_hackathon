import { useState } from 'react';
import { X, Download, Move, Bookmark } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { HealthScoreBadge } from './HealthScoreBadge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Repository } from '../lib/mock-data';

interface BookmarksPageProps {
  bookmarkedRepos: Repository[];
  onViewDetails: (repo: Repository) => void;
  onRemoveBookmark: (repoId: string) => void;
}

export function BookmarksPage({ bookmarkedRepos, onViewDetails, onRemoveBookmark }: BookmarksPageProps) {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (repoId: string) => {
    setSelectedItems(prev =>
      prev.includes(repoId) ? prev.filter(id => id !== repoId) : [...prev, repoId]
    );
  };

  const handleBulkMove = () => {
    // Handle bulk move logic
    setSelectedItems([]);
  };

  const handleBulkRemove = () => {
    selectedItems.forEach(id => onRemoveBookmark(id));
    setSelectedItems([]);
  };

  const handleExport = () => {
    // Handle export logic
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <h1 className="mb-6">My Collections</h1>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">
              All Bookmarks
              <Badge variant="secondary" className="ml-2">
                {bookmarkedRepos.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="explore">To Explore</TabsTrigger>
            <TabsTrigger value="production">Using in Production</TabsTrigger>
            <TabsTrigger value="create">+ Create Collection</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {selectedItems.length > 0 && (
              <div className="bg-muted p-4 rounded-lg mb-6 flex items-center justify-between">
                <span className="text-sm">
                  {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                  <Select onValueChange={handleBulkMove}>
                    <SelectTrigger className="w-48">
                      <Move className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Move to..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="explore">To Explore</SelectItem>
                      <SelectItem value="production">Using in Production</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={handleBulkRemove}>
                    Remove
                  </Button>
                  <Button variant="outline" onClick={handleExport}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            )}

            {bookmarkedRepos.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarkedRepos.map((repo) => (
                  <Card key={repo.id} className="p-4 relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(repo.id)}
                        onChange={() => handleSelectItem(repo.id)}
                        className="cursor-pointer"
                      />
                      <button
                        onClick={() => onRemoveBookmark(repo.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mb-3 pr-16">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base">{repo.name}</h3>
                        <HealthScoreBadge score={repo.healthScore} size="sm" showLabel={false} />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {repo.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="outline" className="text-xs">All Bookmarks</Badge>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => onViewDetails(repo)}
                    >
                      View Details
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2">No bookmarks yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start bookmarking great repos to keep track of them
                </p>
                <Button onClick={() => window.location.href = '#search'}>
                  Explore Repositories
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="explore" className="mt-6">
            <div className="text-center py-16">
              <p className="text-muted-foreground">No repositories in this collection</p>
            </div>
          </TabsContent>

          <TabsContent value="production" className="mt-6">
            <div className="text-center py-16">
              <p className="text-muted-foreground">No repositories in this collection</p>
            </div>
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <Card className="p-6 max-w-md mx-auto">
              <h3 className="mb-4">Create New Collection</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Collection name"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Description (optional)"
                  className="w-full p-2 border rounded"
                  rows={3}
                />
                <Button className="w-full">Create Collection</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

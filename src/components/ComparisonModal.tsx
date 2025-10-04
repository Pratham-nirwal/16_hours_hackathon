import { X, Star, Clock, Users, GitPullRequest } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { HealthScoreBadge } from './HealthScoreBadge';
import { Progress } from './ui/progress';
import type { Repository } from '../lib/mock-data';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  repositories: Repository[];
}

export function ComparisonModal({ isOpen, onClose, repositories }: ComparisonModalProps) {
  const maxRepos = 3;
  const emptySlots = maxRepos - repositories.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compare Repositories</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-6 py-4">
          {repositories.map((repo) => (
            <div key={repo.id} className="border rounded-lg p-4">
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-base mb-2">{repo.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {repo.description}
                </p>
                <div className="flex justify-center mb-4">
                  <HealthScoreBadge score={repo.healthScore} size="md" showLabel={false} />
                </div>
              </div>

              {/* Health Breakdown */}
              <div className="mb-4 space-y-2">
                <h4 className="text-sm mb-2">Health Breakdown</h4>
                {Object.entries(repo.healthBreakdown).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs capitalize">{key}</span>
                      <span className="text-xs">{value}</span>
                    </div>
                    <Progress value={value} className="h-1" />
                  </div>
                ))}
              </div>

              {/* Key Metrics */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-4 h-4" />
                    <span>Stars</span>
                  </div>
                  <span>{(repo.stars / 1000).toFixed(0)}k</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Last commit</span>
                  </div>
                  <span>{repo.lastCommit}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GitPullRequest className="w-4 h-4" />
                    <span>Good first issues</span>
                  </div>
                  <span>{repo.goodFirstIssues}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Contributors</span>
                  </div>
                  <span>{repo.contributors}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Language</span>
                  <span>{repo.language}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">License</span>
                  <span>{repo.license}</span>
                </div>
              </div>

              <Button className="w-full mt-4">
                Choose This Repo
              </Button>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: emptySlots }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="border-2 border-dashed rounded-lg p-4 flex items-center justify-center"
            >
              <div className="text-center text-muted-foreground">
                <p className="text-sm mb-2">Add another repository</p>
                <Button variant="outline" size="sm">
                  + Add
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

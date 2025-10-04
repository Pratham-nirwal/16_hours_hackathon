import { Star, Clock, Target, CheckCircle2, AlertCircle, ExternalLink, Bookmark } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { HealthScoreBadge } from './HealthScoreBadge';
import type { Repository } from '../lib/mock-data';

interface RepositoryCardProps {
  repo: Repository;
  onViewDetails: () => void;
  onBookmark?: () => void;
  isBookmarked?: boolean;
  onCompare?: () => void;
  isComparing?: boolean;
}

export function RepositoryCard({ 
  repo, 
  onViewDetails, 
  onBookmark, 
  isBookmarked = false,
  onCompare,
  isComparing = false 
}: RepositoryCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl">{repo.name}</h3>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">{repo.description}</p>
        </div>
        <div className="flex items-start gap-2">
          <HealthScoreBadge score={repo.healthScore} size="sm" showLabel={false} />
          <Button
            variant="ghost"
            size="icon"
            onClick={onBookmark}
            className={isBookmarked ? 'text-yellow-500' : ''}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Star className="w-4 h-4" />
          <span>{(repo.stars / 1000).toFixed(0)}k</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{repo.lastCommit}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Target className="w-4 h-4" />
          <span>{repo.goodFirstIssues} good first issues</span>
        </div>
        <div className="flex items-center gap-1">
          {repo.ciStatus === 'passing' ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <AlertCircle className="w-4 h-4 text-yellow-500" />
          )}
          <span className="text-sm text-muted-foreground">CI {repo.ciStatus}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {repo.signals.map((signal) => (
          <Badge key={signal} variant="secondary" className="text-xs">
            {signal}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <Badge variant="outline">{repo.language}</Badge>
          <span>•</span>
          <span>{repo.license}</span>
          <span>•</span>
          <span>{repo.contributors} contributors</span>
          <span>•</span>
          <div className="flex gap-1">
            {repo.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button onClick={onViewDetails} className="flex-1">
          View Details
        </Button>
        {onCompare && (
          <Button 
            onClick={onCompare} 
            variant={isComparing ? "default" : "outline"}
          >
            {isComparing ? 'Added' : 'Compare'}
          </Button>
        )}
      </div>
    </div>
  );
}

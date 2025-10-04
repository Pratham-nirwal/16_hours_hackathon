import { useState } from 'react';
import { Target, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { HealthScoreBadge } from './HealthScoreBadge';
import type { Issue } from '../lib/mock-data';
import { mockIssues, mockRepositories } from '../lib/mock-data';

interface ContributorDashboardProps {
  onViewRepo: (repoName: string) => void;
}

export function ContributorDashboard({ onViewRepo }: ContributorDashboardProps) {
  const [language, setLanguage] = useState('all');
  const [difficulty, setDifficulty] = useState('all');

  const recommendedRepos = mockRepositories.filter(r => r.goodFirstIssues > 5).slice(0, 3);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Intermediate':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Advanced':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <h1 className="mb-6">Contribute to Open Source</h1>

        {/* Filter Bar */}
        <div className="bg-card border rounded-lg p-4 mb-6 flex flex-wrap gap-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
            </SelectContent>
          </Select>

          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="cursor-pointer">react</Badge>
            <Badge variant="outline" className="cursor-pointer">api</Badge>
            <Badge variant="outline" className="cursor-pointer">cli</Badge>
            <Badge variant="outline" className="cursor-pointer">documentation</Badge>
          </div>
        </div>

        {/* Recommended For You */}
        <div className="mb-8">
          <h2 className="mb-4">Recommended for You</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {recommendedRepos.map((repo) => (
              <Card key={repo.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base mb-1">{repo.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {repo.description}
                    </p>
                  </div>
                  <HealthScoreBadge score={repo.healthScore} size="sm" showLabel={false} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">{repo.language}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {repo.goodFirstIssues} good first issues
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Issues
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Good First Issues Feed */}
        <div>
          <h2 className="mb-4">Good First Issues</h2>
          <div className="space-y-4">
            {mockIssues.map((issue) => (
              <Card key={issue.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base">{issue.title}</h3>
                      <Badge className={`text-xs ${getDifficultyColor(issue.difficulty)}`}>
                        {issue.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                      <button 
                        onClick={() => onViewRepo(issue.repoName)}
                        className="hover:text-primary hover:underline"
                      >
                        {issue.repoName}
                      </button>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{issue.timeEstimate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        <span>Health: {issue.repoHealthScore}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {issue.labels.map((label) => (
                        <Badge key={label} variant="secondary" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button size="sm">
                      View on GitHub
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

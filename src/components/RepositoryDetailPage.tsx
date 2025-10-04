import { useState } from 'react';
import { ExternalLink, Bookmark, Share2, Info, Code, FileText, Globe, TrendingUp, Users, GitPullRequest, Clock } from 'lucide-react';
import { HealthScoreBadge } from './HealthScoreBadge';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import type { Repository } from '../lib/mock-data';

interface RepositoryDetailPageProps {
  repo: Repository;
  onShowHealthModal: () => void;
  similarRepos: Repository[];
  onViewRepo: (repo: Repository) => void;
}

export function RepositoryDetailPage({ repo, onShowHealthModal, similarRepos, onViewRepo }: RepositoryDetailPageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const radarData = [
    {
      dimension: 'Activity',
      score: repo.healthBreakdown.activity,
      fullMark: 100,
    },
    {
      dimension: 'Community',
      score: repo.healthBreakdown.community,
      fullMark: 100,
    },
    {
      dimension: 'Documentation',
      score: repo.healthBreakdown.documentation,
      fullMark: 100,
    },
    {
      dimension: 'Freshness',
      score: repo.healthBreakdown.freshness,
      fullMark: 100,
    },
    {
      dimension: 'Compatibility',
      score: repo.healthBreakdown.compatibility,
      fullMark: 100,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="mb-2">{repo.name}</h1>
              <p className="text-muted-foreground max-w-3xl">{repo.description}</p>
            </div>
            <HealthScoreBadge score={repo.healthScore} size="lg" trend={repo.trend} />
          </div>

          <div className="flex items-center gap-3">
            <Button>
              <ExternalLink className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
            <Button
              variant={isBookmarked ? "default" : "outline"}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Health Breakdown Panel */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mb-1">Health Breakdown</h2>
              <button 
                onClick={onShowHealthModal}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <Info className="w-3 h-3" />
                How is this calculated?
              </button>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-1">{repo.healthScore}/100</div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="dimension" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Health Score"
                    dataKey="score"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {Object.entries(repo.healthBreakdown).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="capitalize text-sm">{key}</span>
                    <span className="text-sm">{value}/100</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="mb-3">Good First Issues</h3>
            <div className="mb-4">
              <Badge className="text-lg px-3 py-1">{repo.goodFirstIssues} open issues</Badge>
            </div>
            <div className="space-y-2 mb-4">
              <div className="text-sm p-2 bg-muted rounded">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Beginner</Badge>
                  <span className="text-xs">Fix typo in README</span>
                </div>
              </div>
              <div className="text-sm p-2 bg-muted rounded">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Beginner</Badge>
                  <span className="text-xs">Add TypeScript example</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Start Contributing
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="mb-3">Documentation</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                <a href="#" className="hover:underline">README</a>
              </div>
              {repo.hasWiki && (
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4" />
                  <a href="#" className="hover:underline">Wiki</a>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                <a href="#" className="hover:underline">API Docs</a>
              </div>
              {repo.hasWebsite && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4" />
                  <a href="#" className="hover:underline">Website</a>
                </div>
              )}
            </div>
            <Badge variant="secondary" className="w-full justify-center">
              ✓ Complete README
            </Badge>
          </Card>

          <Card className="p-6">
            <h3 className="mb-3">Get Started</h3>
            <div className="mb-4">
              <div className="bg-muted p-3 rounded font-mono text-xs">
                npm install {repo.name}
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                View Quickstart
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Available via npm, yarn
              </p>
            </div>
          </Card>
        </div>

        {/* Community Health Indicators */}
        <Card className="p-6 mb-6">
          <h2 className="mb-4">Community Health Indicators</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl mb-1">{repo.avgIssueResponseTime}</div>
              <p className="text-xs text-muted-foreground">Avg issue response</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <GitPullRequest className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl mb-1">{repo.prMergeRate}%</div>
              <p className="text-xs text-muted-foreground">PR merge rate</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl mb-1">{repo.activeContributors}</div>
              <p className="text-xs text-muted-foreground">Active contributors</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl mb-1">{repo.contributorDiversity} orgs</div>
              <p className="text-xs text-muted-foreground">Contributor diversity</p>
            </div>
          </div>
        </Card>

        {/* Technical Details */}
        <Card className="p-6 mb-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="technical">
              <AccordionTrigger>
                <h3>Technical Details</h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div>
                    <h4 className="mb-2">CI/CD Status</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={repo.ciStatus === 'passing' ? 'default' : 'secondary'}>
                        ✓ All checks passing
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2">Code Coverage</h4>
                    <div className="flex items-center gap-4">
                      <Progress value={repo.codeCoverage} className="flex-1" />
                      <span className="text-sm">{repo.codeCoverage}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2">Package Stats</h4>
                    <p className="text-sm text-muted-foreground">
                      {repo.contributors} contributors • {repo.license} license
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Similar Repositories */}
        <div>
          <h2 className="mb-4">Similar Repositories</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {similarRepos.slice(0, 4).map((similar) => (
              <Card 
                key={similar.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onViewRepo(similar)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-base">{similar.name}</h4>
                  <HealthScoreBadge score={similar.healthScore} size="sm" showLabel={false} />
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {similar.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Compare
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

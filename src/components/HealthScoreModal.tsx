import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import type { Repository } from '../lib/mock-data';

interface HealthScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  repo?: Repository;
}

export function HealthScoreModal({ isOpen, onClose, repo }: HealthScoreModalProps) {
  if (!repo) return null;

  const breakdown = repo.healthBreakdown;
  const calculations = [
    { signal: 'Activity', rawScore: breakdown.activity, weight: 30, contribution: (breakdown.activity * 0.3).toFixed(1) },
    { signal: 'Community', rawScore: breakdown.community, weight: 25, contribution: (breakdown.community * 0.25).toFixed(1) },
    { signal: 'Documentation', rawScore: breakdown.documentation, weight: 15, contribution: (breakdown.documentation * 0.15).toFixed(1) },
    { signal: 'Freshness', rawScore: breakdown.freshness, weight: 15, contribution: (breakdown.freshness * 0.15).toFixed(1) },
    { signal: 'Compatibility', rawScore: breakdown.compatibility, weight: 15, contribution: (breakdown.compatibility * 0.15).toFixed(1) },
  ];

  const total = calculations.reduce((sum, calc) => sum + parseFloat(calc.contribution), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>How We Calculate Health Scores</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="mb-3">Formula</h3>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              Health Score = (Activity × 30%) + (Community × 25%) + <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Documentation × 15%) + (Freshness × 15%) + <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Compatibility × 15%)
            </div>
          </div>

          <div>
            <h3 className="mb-3">Example Calculation for {repo.name}</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 text-sm">Signal</th>
                    <th className="text-right p-3 text-sm">Raw Score</th>
                    <th className="text-right p-3 text-sm">Weight</th>
                    <th className="text-right p-3 text-sm">Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.map((calc, idx) => (
                    <tr key={calc.signal} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                      <td className="p-3 text-sm">{calc.signal}</td>
                      <td className="p-3 text-sm text-right">{calc.rawScore}/100</td>
                      <td className="p-3 text-sm text-right">{calc.weight}%</td>
                      <td className="p-3 text-sm text-right">{calc.contribution}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-border bg-muted">
                    <td colSpan={3} className="p-3 font-semibold">Total</td>
                    <td className="p-3 text-right font-semibold">{total.toFixed(1)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="weights">
              <AccordionTrigger>
                <h4>Why these weights?</h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2 text-sm">
                  <div>
                    <p className="font-medium mb-1">Activity (30%)</p>
                    <p className="text-muted-foreground">
                      The most important indicator of a healthy project. Measures commit frequency, 
                      release cadence, and ongoing development.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Community (25%)</p>
                    <p className="text-muted-foreground">
                      Evaluates issue response times, PR merge rates, contributor diversity, and 
                      community engagement.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Documentation (15%)</p>
                    <p className="text-muted-foreground">
                      Checks for README completeness, API documentation, examples, and overall 
                      documentation quality.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Freshness (15%)</p>
                    <p className="text-muted-foreground">
                      Analyzes how recently the project has been updated, including commits, releases, 
                      and dependency updates.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Compatibility (15%)</p>
                    <p className="text-muted-foreground">
                      Assesses CI/CD status, test coverage, cross-platform support, and dependency 
                      health.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="border-t pt-4">
            <h4 className="mb-3">Disagree with this score?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Help us improve our scoring algorithm by sharing your feedback.
            </p>
            <Textarea 
              placeholder="Tell us why you think this score doesn't reflect the project's health..."
              className="mb-3"
            />
            <Button>Submit Feedback</Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <a href="#" className="text-primary hover:underline">
              Read our full methodology documentation →
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

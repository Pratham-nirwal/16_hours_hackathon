import { useState } from 'react';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [activityDays, setActivityDays] = useState([30]);
  const [healthRange, setHealthRange] = useState([0, 100]);
  const [hasGoodFirstIssues, setHasGoodFirstIssues] = useState(false);
  const [minIssues, setMinIssues] = useState('');
  const [hasCi, setHasCi] = useState(false);
  const [hasDocs, setHasDocs] = useState(false);
  const [license, setLicense] = useState('');

  const languages = [
    { name: 'JavaScript', count: 247 },
    { name: 'Python', count: 189 },
    { name: 'TypeScript', count: 145 },
    { name: 'Rust', count: 78 },
    { name: 'Go', count: 92 },
  ];

  const handleLanguageToggle = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const handleClearAll = () => {
    setSelectedLanguages([]);
    setActivityDays([30]);
    setHealthRange([0, 100]);
    setHasGoodFirstIssues(false);
    setMinIssues('');
    setHasCi(false);
    setHasDocs(false);
    setLicense('');
  };

  return (
    <div className="w-80 bg-card border-r border-border p-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-6">
        <h3>Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleClearAll}>
          Clear all
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="mb-3 block">Language</Label>
          <div className="space-y-2">
            {languages.map((lang) => (
              <div key={lang.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedLanguages.includes(lang.name)}
                    onCheckedChange={() => handleLanguageToggle(lang.name)}
                  />
                  <span className="text-sm">{lang.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">({lang.count})</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-3 block">Activity</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Last commit within: {activityDays[0]} days
          </p>
          <Slider
            value={activityDays}
            onValueChange={setActivityDays}
            min={7}
            max={180}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>7d</span>
            <span>30d</span>
            <span>90d</span>
            <span>180d</span>
          </div>
        </div>

        <div>
          <Label className="mb-3 block">Health Score</Label>
          <div className="px-2 py-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-md mb-2 h-2" />
          <Slider
            value={healthRange}
            onValueChange={setHealthRange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{healthRange[0]}</span>
            <span>{healthRange[1]}</span>
          </div>
        </div>

        <div>
          <Label className="mb-3 block">Contribution Friendly</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="good-first-issues" className="text-sm font-normal">
                Has good-first-issues
              </Label>
              <Switch
                id="good-first-issues"
                checked={hasGoodFirstIssues}
                onCheckedChange={setHasGoodFirstIssues}
              />
            </div>
            <div>
              <Label htmlFor="min-issues" className="text-sm font-normal mb-1 block">
                Minimum issues
              </Label>
              <Input
                id="min-issues"
                type="number"
                placeholder="0"
                value={minIssues}
                onChange={(e) => setMinIssues(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="mb-3 block">Quality Indicators</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="ci-passing" className="text-sm font-normal">
                CI Passing
              </Label>
              <Switch
                id="ci-passing"
                checked={hasCi}
                onCheckedChange={setHasCi}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="has-docs" className="text-sm font-normal">
                Has Documentation
              </Label>
              <Switch
                id="has-docs"
                checked={hasDocs}
                onCheckedChange={setHasDocs}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="license" className="mb-3 block">
            License
          </Label>
          <Select value={license} onValueChange={setLicense}>
            <SelectTrigger id="license">
              <SelectValue placeholder="Select license" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mit">MIT</SelectItem>
              <SelectItem value="apache">Apache 2.0</SelectItem>
              <SelectItem value="gpl">GPL v3</SelectItem>
              <SelectItem value="bsd">BSD</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

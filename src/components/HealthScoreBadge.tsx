import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface HealthScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  trend?: 'up' | 'down' | 'stable';
}

export function HealthScoreBadge({ score, size = 'md', showLabel = true, trend }: HealthScoreBadgeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20';
    if (score >= 60) return 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20';
    return 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20';
  };

  const getLabel = (score: number) => {
    if (score >= 80) return 'Highly Recommended';
    if (score >= 60) return 'Promising';
    return 'Needs Review';
  };

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizeClasses[size]} ${getColor(score)} rounded-full flex items-center justify-center border-2 relative`}>
        <span className="font-semibold">{score}</span>
        {trend && size !== 'sm' && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center border border-border">
            <TrendIcon className="w-3 h-3" />
          </div>
        )}
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground">{getLabel(score)}</span>
      )}
    </div>
  );
}

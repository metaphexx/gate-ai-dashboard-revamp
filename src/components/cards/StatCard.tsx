
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent' | 'warning' | 'destructive';
  className?: string;
  animated?: boolean;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  variant = 'default',
  className,
  animated = true
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const numericValue = typeof value === 'string' ? 
    parseFloat(value.replace(/[^0-9.-]/g, '')) : value;

  useEffect(() => {
    setIsVisible(true);
    if (animated && typeof numericValue === 'number' && !isNaN(numericValue)) {
      const duration = 1500;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(numericValue);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [numericValue, animated]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'glass-card border-primary/20 shadow-glow-primary hover:shadow-glow-primary';
      case 'accent':
        return 'glass-card border-accent/20 shadow-glow-accent hover:shadow-glow-accent';
      case 'warning':
        return 'glass-card border-warning/20 shadow-lg hover:shadow-xl';
      case 'destructive':
        return 'glass-card border-destructive/20 shadow-lg hover:shadow-xl';
      default:
        return 'glass-card hover:shadow-xl';
    }
  };

  const getIconVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-primary bg-primary/10 p-2 rounded-lg';
      case 'accent':
        return 'text-accent bg-accent/10 p-2 rounded-lg';
      case 'warning':
        return 'text-warning bg-warning/10 p-2 rounded-lg';
      case 'destructive':
        return 'text-destructive bg-destructive/10 p-2 rounded-lg';
      default:
        return 'text-muted-foreground bg-muted/50 p-2 rounded-lg';
    }
  };

  const formatDisplayValue = () => {
    if (typeof value === 'string' && value.includes('%')) {
      return `${displayValue}%`;
    } else if (typeof value === 'string' && value.includes('K')) {
      return `${(displayValue / 1000).toFixed(1)}K`;
    } else if (typeof value === 'string' && value.includes('M')) {
      return `${(displayValue / 1000000).toFixed(1)}M`;
    }
    return animated && typeof numericValue === 'number' ? displayValue : value;
  };

  return (
    <div 
      className={cn(
        "group relative p-6 rounded-xl transition-all duration-300 hover:scale-105",
        getVariantStyles(),
        isVisible ? "animate-slide-up" : "opacity-0",
        className
      )}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
            {title}
          </div>
          <div className={cn("transition-transform duration-300 group-hover:scale-110", getIconVariantStyles())}>
            {icon}
          </div>
        </div>
        
        <div className="mb-3">
          <div className={cn(
            "text-3xl font-bold transition-all duration-300",
            variant === 'primary' && "text-gradient-primary",
            variant === 'accent' && "text-gradient-accent",
            variant === 'default' && "text-foreground"
          )}>
            {formatDisplayValue()}
          </div>
        </div>
        
        {trend && (
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300",
              trend.isPositive 
                ? "bg-accent/10 text-accent" 
                : "bg-destructive/10 text-destructive"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {trend.isPositive ? "+" : ""}{trend.value}%
            </div>
            <span className="text-xs text-muted-foreground">vs. last period</span>
          </div>
        )}

        {/* Subtle glow effect for primary and accent variants */}
        {(variant === 'primary' || variant === 'accent') && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        )}
      </div>
    </div>
  );
};

export default StatCard;

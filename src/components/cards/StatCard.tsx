
import React from 'react';
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
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  variant = 'default',
  className
}: StatCardProps) => {
  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-primary';
      case 'accent':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'destructive':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={cn(
      "bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-500 text-sm font-medium">
          {title}
        </div>
        <div className={cn("p-2 rounded-lg bg-gray-50", getIconColor())}>
          {icon}
        </div>
      </div>
      
      <div className="mb-3">
        <div className="text-2xl font-bold text-gray-900">
          {value}
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            trend.isPositive 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trend.isPositive ? "+" : ""}{trend.value}%
          </div>
          <span className="text-xs text-gray-500">vs. last period</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;

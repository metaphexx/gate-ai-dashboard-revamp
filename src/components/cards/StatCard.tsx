
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn("bg-white p-5 rounded-lg shadow-sm border border-gray-100", className)}>
      <div className="flex items-center justify-between">
        <div className="text-gray-500 text-sm font-medium">{title}</div>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      
      {trend && (
        <div className="mt-2 flex items-center">
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded",
              trend.isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            )}
          >
            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-gray-500 ml-2">vs. last period</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;

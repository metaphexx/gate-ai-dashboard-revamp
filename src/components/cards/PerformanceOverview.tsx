
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const data = {
  allTime: [
    { subject: 'Writing', accuracy: 25, trend: 'down' },
    { subject: 'Abstract', accuracy: 35, trend: 'up' },
    { subject: 'Reading', accuracy: 40, trend: 'same' },
    { subject: 'Quantitative', accuracy: 50, trend: 'up' },
  ],
  lastWeek: [
    { subject: 'Writing', accuracy: 30, trend: 'up' },
    { subject: 'Abstract', accuracy: 32, trend: 'down' },
    { subject: 'Reading', accuracy: 45, trend: 'up' },
    { subject: 'Quantitative', accuracy: 55, trend: 'up' },
  ]
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <ArrowUp size={14} className="text-accent" />;
    case 'down':
      return <ArrowDown size={14} className="text-destructive" />;
    default:
      return <Minus size={14} className="text-gray-400" />;
  }
};

const PerformanceOverview = () => {
  const [timeRange, setTimeRange] = useState<'allTime' | 'lastWeek'>('allTime');
  
  const chartData = data[timeRange];
  
  // Custom tooltip style with the new color
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-100 shadow-md rounded-md">
          <p className="text-[#009dff] font-medium">{`${label}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Performance by Subject</h3>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant={timeRange === 'allTime' ? 'default' : 'outline'}
            onClick={() => setTimeRange('allTime')}
            className="h-8 text-xs"
          >
            All Time
          </Button>
          <Button 
            size="sm" 
            variant={timeRange === 'lastWeek' ? 'default' : 'outline'}
            onClick={() => setTimeRange('lastWeek')}
            className="h-8 text-xs"
          >
            Last 7 Days
          </Button>
        </div>
      </div>
      
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            barSize={30}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="subject" fontSize={12} tickMargin={5} />
            <YAxis tickFormatter={(value) => `${value}%`} fontSize={12} />
            <Tooltip 
              content={<CustomTooltip />}
            />
            <Bar dataKey="accuracy" fill="#009dff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm font-medium bg-gray-50 px-3 py-2 rounded">
          <span className="text-gray-700">Subject</span>
          <span className="text-gray-700">Accuracy</span>
        </div>
        
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm px-3">
            <span>{item.subject}</span>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${
                item.accuracy >= 70 ? 'text-accent' :
                item.accuracy >= 40 ? 'text-warning' :
                'text-destructive'
              }`}>
                {item.accuracy}%
              </span>
              {getTrendIcon(item.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceOverview;

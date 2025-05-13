
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const data = [
  { week: 'Week 1', accuracy: 45, questions: 20 },
  { week: 'Week 2', accuracy: 52, questions: 25 },
  { week: 'Week 3', accuracy: 48, questions: 30 },
  { week: 'Week 4', accuracy: 62, questions: 22 },
  { week: 'Week 5', accuracy: 57, questions: 28 },
  { week: 'Week 6', accuracy: 63, questions: 35 },
  { week: 'Week 7', accuracy: 68, questions: 32 },
  { week: 'Week 8', accuracy: 73, questions: 40 },
];

// Calculate trend: current week compared to previous week
const calculateTrend = () => {
  if (data.length < 2) return { value: 0, isPositive: false };
  
  const currentAccuracy = data[data.length - 1].accuracy;
  const previousAccuracy = data[data.length - 2].accuracy;
  const difference = currentAccuracy - previousAccuracy;
  
  return {
    value: Math.abs(difference),
    isPositive: difference >= 0
  };
};

const AccuracyTrendChart = () => {
  const trend = calculateTrend();
  const latestAccuracy = data.length > 0 ? data[data.length - 1].accuracy : 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Performance Trend</h3>
          <div className="flex items-center">
            <Badge className={cn("ml-2", trend.isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>
              {trend.isPositive ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {trend.value}% since last week
            </Badge>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" fontSize={12} tickMargin={5} />
              <YAxis 
                domain={[0, 100]} 
                fontSize={12} 
                tickFormatter={(value) => `${value}%`}
                label={{ value: "Accuracy (%)", angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Accuracy']}
                labelFormatter={(value) => `${value}`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#3B82F6"
                activeDot={{ r: 8, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                dot={{ r: 4, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-gray-500 flex justify-between">
          <div>Latest: {latestAccuracy}% accuracy</div>
          <div>{data[data.length - 1].questions} questions</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccuracyTrendChart;

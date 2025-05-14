
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface TimeItem {
  name: string;
  value: number;
  color: string;
}

interface AverageTimeSectionProps {
  avgTimeData: TimeItem[];
}

const CustomAvgTimeTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-md rounded-md">
        <p className="font-medium">{data.name}</p>
        <p>{data.value} minutes per question</p>
        <p className="text-xs text-gray-500">{Math.round(data.value * 60)} seconds average</p>
      </div>
    );
  }
  return null;
};

const AverageTimeSection: React.FC<AverageTimeSectionProps> = ({ avgTimeData }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-0">
        <h3 className="text-xl font-medium">Average Time per Sub-Type</h3>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={avgTimeData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              barSize={10}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis
                type="number"
                label={{ value: 'Minutes', position: 'insideBottom', offset: -5 }}
                tickMargin={5}
                domain={[0, 'dataMax + 0.5']}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={120}
                tick={{ fontSize: 12 }}
                tickMargin={5}
                axisLine={false}
              />
              <Tooltip content={<CustomAvgTimeTooltip />} />
              <Bar
                dataKey="value"
                className="animate-[fade-in_1s_ease-out]"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              >
                {avgTimeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    fillOpacity={0.85}
                    className="hover:fill-opacity-100"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AverageTimeSection;

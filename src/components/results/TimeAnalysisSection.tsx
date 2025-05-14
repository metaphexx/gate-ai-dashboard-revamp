
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';

interface TimeData {
  name: string;
  value: number;
  color: string;
}

interface TimeAnalysisSectionProps {
  timeData: TimeData[];
  totalTime: string;
}

const CustomTimeTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-md rounded-md">
        <p className="font-medium">{data.name}</p>
        <p>{data.value}% of total time</p>
        <p className="text-xs text-gray-500">~{Math.round(data.value * 0.2)}m</p>
      </div>
    );
  }
  return null;
};

const TimeAnalysisSection: React.FC<TimeAnalysisSectionProps> = ({ timeData, totalTime }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-0">
        <h3 className="text-xl font-medium">Time Analysis</h3>
      </CardHeader>
      <CardContent className="flex flex-col items-center pt-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={timeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                className="animate-[fade-in_1s_ease-out]"
              >
                {timeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
                <Label
                  position="center"
                  content={({ viewBox }) => {
                    const { cx, cy } = viewBox as { cx: number; cy: number };
                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-medium"
                      >
                        <tspan x={cx} y={cy - 10} className="text-lg font-bold">
                          {totalTime}
                        </tspan>
                        <tspan x={cx} y={cy + 15} className="text-xs text-muted-foreground">
                          Total Time
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
              <Tooltip content={<CustomTimeTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full flex flex-wrap justify-center gap-4 mt-4">
          {timeData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm" style={{ color: item.color }}>
                {item.name}: <span className="font-semibold">{item.value}%</span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeAnalysisSection;


import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

// Subjects to filter by
const SUBJECTS = ['All', 'Quantitative', 'Abstract', 'Writing', 'Reading'];

// Data for each subject
const allData = {
  All: [
    { week: 'Week 1', accuracy: 45, questions: 20 },
    { week: 'Week 2', accuracy: 52, questions: 25 },
    { week: 'Week 3', accuracy: 48, questions: 30 },
    { week: 'Week 4', accuracy: 62, questions: 22 },
    { week: 'Week 5', accuracy: 57, questions: 28 },
    { week: 'Week 6', accuracy: 63, questions: 35 },
    { week: 'Week 7', accuracy: 68, questions: 32 },
    { week: 'Week 8', accuracy: 73, questions: 40 },
  ],
  Quantitative: [
    { week: 'Week 1', accuracy: 50, questions: 10 },
    { week: 'Week 2', accuracy: 55, questions: 12 },
    { week: 'Week 3', accuracy: 52, questions: 15 },
    { week: 'Week 4', accuracy: 67, questions: 12 },
    { week: 'Week 5', accuracy: 60, questions: 14 },
    { week: 'Week 6', accuracy: 72, questions: 18 },
    { week: 'Week 7', accuracy: 75, questions: 15 },
    { week: 'Week 8', accuracy: 78, questions: 20 },
  ],
  Abstract: [
    { week: 'Week 1', accuracy: 35, questions: 5 },
    { week: 'Week 2', accuracy: 48, questions: 8 },
    { week: 'Week 3', accuracy: 42, questions: 10 },
    { week: 'Week 4', accuracy: 60, questions: 5 },
    { week: 'Week 5', accuracy: 55, questions: 6 },
    { week: 'Week 6', accuracy: 58, questions: 8 },
    { week: 'Week 7', accuracy: 65, questions: 7 },
    { week: 'Week 8', accuracy: 70, questions: 10 },
  ],
  Writing: [
    { week: 'Week 1', accuracy: 40, questions: 3 },
    { week: 'Week 2', accuracy: 45, questions: 3 },
    { week: 'Week 3', accuracy: 48, questions: 4 },
    { week: 'Week 4', accuracy: 55, questions: 3 },
    { week: 'Week 5', accuracy: 52, questions: 5 },
    { week: 'Week 6', accuracy: 56, questions: 6 },
    { week: 'Week 7', accuracy: 60, questions: 5 },
    { week: 'Week 8', accuracy: 65, questions: 6 },
  ],
  Reading: [
    { week: 'Week 1', accuracy: 55, questions: 2 },
    { week: 'Week 2', accuracy: 58, questions: 2 },
    { week: 'Week 3', accuracy: 52, questions: 1 },
    { week: 'Week 4', accuracy: 65, questions: 2 },
    { week: 'Week 5', accuracy: 60, questions: 3 },
    { week: 'Week 6', accuracy: 68, questions: 3 },
    { week: 'Week 7', accuracy: 70, questions: 5 },
    { week: 'Week 8', accuracy: 75, questions: 4 },
  ],
};

// Calculate trend: current week compared to previous week
const calculateTrend = (data: any[]) => {
  if (data.length < 2) return { value: 0, isPositive: false };
  
  const currentAccuracy = data[data.length - 1].accuracy;
  const previousAccuracy = data[data.length - 2].accuracy;
  const difference = currentAccuracy - previousAccuracy;
  
  return {
    value: Math.abs(difference),
    isPositive: difference >= 0
  };
};

// Custom tooltip component with enhanced information
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const currentWeekData = payload[0].payload;
    const weekIndex = parseInt(label.split(' ')[1]) - 1;
    const previousWeekData = weekIndex > 0 ? allData.All[weekIndex - 1] : null;
    
    const difference = previousWeekData 
      ? currentWeekData.accuracy - previousWeekData.accuracy
      : 0;
    
    const trendText = previousWeekData
      ? `${difference >= 0 ? '↑' : '↓'} ${Math.abs(difference)}% from ${previousWeekData.week}`
      : '';
    
    const trendColor = difference >= 0 ? 'text-green-500' : 'text-red-500';

    return (
      <div className="bg-white p-3 border border-gray-100 shadow-md rounded-md">
        <p className="text-lg font-medium">{label}</p>
        <p className="text-[#009dff] font-medium">Accuracy: {payload[0].value}%</p>
        <p className="text-gray-600">Questions: {currentWeekData.questions}</p>
        {previousWeekData && (
          <p className={trendColor}>{trendText}</p>
        )}
      </div>
    );
  }
  return null;
};

const AccuracyTrendChart = () => {
  const [subject, setSubject] = useState<string>('All');
  const data = allData[subject as keyof typeof allData];
  
  const trend = calculateTrend(data);
  const latestAccuracy = data.length > 0 ? data[data.length - 1].accuracy : 0;
  const latestWeekData = data[data.length - 1];
  const previousWeekData = data.length > 1 ? data[data.length - 2] : null;
  
  const weekDifference = previousWeekData 
    ? latestWeekData.accuracy - previousWeekData.accuracy
    : 0;

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-lg font-semibold">Performance Trend</h3>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="w-full sm:w-40">
              <Select 
                defaultValue="All" 
                onValueChange={(value) => setSubject(value)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((subj) => (
                    <SelectItem key={subj} value={subj}>
                      {subj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Badge className={cn("w-fit", trend.isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>
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
                ticks={[0, 50, 70, 85, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Target benchmark line */}
              <ReferenceLine y={70} stroke="#888" strokeDasharray="3 3" label={{ 
                value: "Target: 70%",
                position: "right",
                fill: "#888",
                fontSize: 11
              }} />
              
              {/* Performance bands */}
              <ReferenceLine y={85} stroke="#22C55E" strokeOpacity={0.3} strokeWidth={1} />
              <ReferenceLine y={70} stroke="#3B82F6" strokeOpacity={0.3} strokeWidth={1} />
              <ReferenceLine y={50} stroke="#F59E0B" strokeOpacity={0.3} strokeWidth={1} />
              
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#3B82F6"
                activeDot={{ r: 8, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                dot={{ r: 4, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                strokeWidth={3}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-700 mr-2">Latest:</span> 
            <span className="font-medium">{latestAccuracy}% accuracy</span> 
            {weekDifference !== 0 && (
              <span className={cn("ml-2 flex items-center text-sm", 
                weekDifference > 0 ? "text-green-500" : "text-red-500")}>
                {weekDifference > 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(weekDifference)}%
              </span>
            )}
          </div>
          <div className="text-gray-500">{latestWeekData.questions} questions</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccuracyTrendChart;

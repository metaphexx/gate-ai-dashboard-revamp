
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartLegendContent 
} from '@/components/ui/chart';

const data = [
  { name: 'Writing', value: 67, color: '#F59E0B' },
  { name: 'Abstract Reasoning', value: 40, color: '#EF4444' },
  { name: 'Reading Comprehension', value: 75, color: '#38C172' },
  { name: 'Quantitative Reasoning', value: 77, color: '#38C172' },
];

// Define chart configuration for colors
const chartConfig = {
  writing: { color: '#F59E0B' },
  abstract: { color: '#EF4444' },
  reading: { color: '#38C172' },
  quantitative: { color: '#38C172' }
};

const SubjectPerformance = () => {
  return (
    <div className="h-64">
      <ChartContainer config={chartConfig}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent formatter={(value) => `${value}%`} />} />
          <Legend
            content={<ChartLegendContent />}
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default SubjectPerformance;

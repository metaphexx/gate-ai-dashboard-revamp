
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Day 1', score: 30 },
  { day: 'Day 2', score: 45 },
  { day: 'Day 3', score: 42 },
  { day: 'Day 4', score: 50 },
  { day: 'Day 5', score: 55 },
  { day: 'Day 6', score: 65 },
  { day: 'Day 7', score: 62 },
];

const ProgressChart = () => {
  return (
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
          <XAxis dataKey="day" fontSize={12} tickMargin={5} />
          <YAxis domain={[0, 100]} fontSize={12} tickFormatter={(value) => `${value}%`} />
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Score']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#4263EB"
            activeDot={{ r: 8, fill: '#4263EB', stroke: '#fff', strokeWidth: 2 }}
            dot={{ r: 4, fill: '#4263EB', stroke: '#fff', strokeWidth: 2 }}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;


import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  {
    name: 'Writing',
    correct: 25,
    incorrect: 75,
  },
  {
    name: 'Abstract',
    correct: 35,
    incorrect: 65,
  },
  {
    name: 'Reading',
    correct: 40,
    incorrect: 60,
  },
  {
    name: 'Quantitative',
    correct: 50,
    incorrect: 50,
  },
];

const PerformanceChart = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
          stackOffset="expand"
          barSize={30}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" fontSize={12} tickMargin={5} />
          <YAxis tickFormatter={(value) => `${value}%`} fontSize={12} />
          <Tooltip 
            formatter={(value, name) => [`${value}%`, name === 'correct' ? 'Correct' : 'Incorrect']}
            labelFormatter={(label) => `${label} Performance`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="correct" stackId="a" fill="#38C172" name="Correct" radius={[4, 4, 0, 0]} />
          <Bar dataKey="incorrect" stackId="a" fill="#EF4444" name="Incorrect" radius={[0, 0, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;

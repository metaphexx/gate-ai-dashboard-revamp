
import React, { useEffect, useState } from 'react';
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

const AnimatedProgressChart = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedData, setAnimatedData] = useState<typeof data>([]);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Skip animation on server-side rendering
    if (typeof window === 'undefined') {
      setAnimatedData(data);
      setAnimationFinished(true);
      return;
    }

    // Draw the chart point by point
    if (currentIndex <= data.length && !animationFinished) {
      const timer = setTimeout(() => {
        setAnimatedData(data.slice(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);

        // Update the displayed value to the latest data point
        if (currentIndex < data.length) {
          setDisplayValue(data[currentIndex].score);
        }

        // Check if animation is complete
        if (currentIndex >= data.length - 1) {
          setAnimationFinished(true);
        }
      }, 200); // Time between each point appearing

      return () => clearTimeout(timer);
    }
  }, [currentIndex, animationFinished]);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={animatedData}
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
            stroke="#009dff"
            activeDot={{ r: 8, fill: '#009dff', stroke: '#fff', strokeWidth: 2 }}
            dot={{ r: 4, fill: '#009dff', stroke: '#fff', strokeWidth: 2 }}
            strokeWidth={3}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>

      {!animationFinished && (
        <div className="text-center mt-2 text-sm font-medium text-gray-700">
          Latest: <span className="text-[#009dff]">{displayValue}%</span>
        </div>
      )}
      
      {animationFinished && (
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm font-medium">
            Latest: <span className="text-[#009dff]">{data[data.length - 1].score}%</span>
          </div>
          <div className="text-xs text-gray-500">
            40 questions
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedProgressChart;

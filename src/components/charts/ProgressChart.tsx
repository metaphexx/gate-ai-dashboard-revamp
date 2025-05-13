
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
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    // Skip animation on server-side rendering
    if (typeof window === 'undefined') {
      setAnimatedData(data);
      setAnimationFinished(true);
      return;
    }

    // Reset animation state when component mounts
    setCurrentIndex(0);
    setAnimatedData([]);
    setAnimationFinished(false);

    // Draw the chart point by point with faster animation
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
      }, 150); // Faster animation: 150ms between each point appearing

      return () => clearTimeout(timer);
    }
  }, [currentIndex, animationFinished]);

  // For the stroke animation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Animate the stroke dashoffset
    let startTime: number;
    const duration = 1000; // 1 second animation (faster)
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate progress as a value between 0 and 1
      const progress = Math.min(elapsed / duration, 1);
      setAnimationProgress(progress);
      
      // Continue animation until complete
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="h-64">
      <style>
        {`
          .animated-line {
            stroke-dasharray: 1000;
            stroke-dashoffset: ${1000 - (animationProgress * 1000)};
            transition: stroke-dashoffset 50ms ease-out;
          }
        `}
      </style>
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
            className="animated-line"
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

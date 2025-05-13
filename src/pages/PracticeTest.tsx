
import React from 'react';
import TestCard from '@/components/cards/TestCard';
import DashboardSidebar from '@/components/DashboardSidebar';

// Mock data for the test cards
const testData = [
  {
    id: 1,
    title: 'Abstract Reasoning',
    questions: 37,
    duration: 20,
    description: 'Test your pattern recognition and logic with non-verbal, visual problems.',
    imagePath: '/abstract-reasoning.jpg',
  },
  {
    id: 2,
    title: 'Writing Test',
    questions: 1,
    duration: 25,
    description: 'Evaluate your ability to think creatively, express ideas clearly, and structure writing.',
    imagePath: '/writing-test.jpg',
    isNew: true,
  },
  {
    id: 3,
    title: 'Reading Comprehension',
    questions: 38,
    duration: 10,
    description: 'Assess your ability to recognize words quickly and understand complex text passages.',
    imagePath: '/reading-comprehension.jpg',
  },
  {
    id: 4,
    title: 'Quantitative Reasoning',
    questions: 10,
    duration: 10,
    description: 'Evaluate your ability to interpret and analyze numerical data in various formats.',
    imagePath: '/quantitative-reasoning.jpg',
  },
];

const PracticeTest = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="pb-6">
          <h1 className="text-2xl font-bold text-gray-900">Practice Test</h1>
          <p className="text-gray-500">Select a test to practice your skills</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testData.map((test) => (
            <TestCard
              key={test.id}
              title={test.title}
              questions={test.questions}
              duration={test.duration}
              description={test.description}
              imagePath={test.imagePath}
              isNew={test.isNew}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeTest;

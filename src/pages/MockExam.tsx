
import React from 'react';
import TestCard from '@/components/cards/TestCard';
import DashboardSidebar from '@/components/DashboardSidebar';

// Mock data for the mock exam
const mockExamData = [
  {
    id: 1,
    title: 'Full Length Mock Exam 1',
    questions: 90,
    duration: 180,
    description: 'Complete mock exam that simulates the actual GATE exam experience. Covers all sections: Verbal, Quantitative, and Integrated Reasoning.',
    imagePath: '/mock-exam-1.jpg',
    isNew: true,
    hasAI: false,
  },
  {
    id: 2,
    title: 'Full Length Mock Exam 2',
    questions: 85,
    duration: 170,
    description: 'Advanced comprehensive mock exam with adaptive questions based on your performance in previous tests.',
    imagePath: '/mock-exam-2.jpg',
    isNew: false,
    hasAI: true,
  },
  {
    id: 3,
    title: 'Sectional Mock: Quantitative',
    questions: 35,
    duration: 60,
    description: 'Focus on quantitative reasoning with this specialized mock exam. Great for strengthening your math skills.',
    imagePath: '/mock-exam-3.jpg',
    isNew: false,
    hasAI: false,
  },
  {
    id: 4,
    title: 'Sectional Mock: Verbal',
    questions: 40,
    duration: 60,
    description: 'Concentrate on verbal reasoning and reading comprehension with this sectional mock exam.',
    imagePath: '/mock-exam-4.jpg',
    isNew: false,
    hasAI: true,
  },
  {
    id: 5,
    title: 'Timed Mock Challenge',
    questions: 50,
    duration: 75,
    description: 'Test your speed and accuracy under time pressure with this challenging mock exam designed to improve your time management.',
    imagePath: '/mock-exam-5.jpg',
    isNew: true,
    hasAI: false,
  }
];

const MockExam = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="pb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mock Exam</h1>
          <p className="text-gray-500">Complete full-length exams that simulate the real test experience</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockExamData.map((exam) => (
            <TestCard
              key={exam.id}
              title={exam.title}
              questions={exam.questions}
              duration={exam.duration}
              description={exam.description}
              imagePath={exam.imagePath}
              isNew={exam.isNew}
              hasAI={exam.hasAI}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockExam;

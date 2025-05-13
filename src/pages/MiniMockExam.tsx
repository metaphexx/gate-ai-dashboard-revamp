
import React from 'react';
import TestCard from '@/components/cards/TestCard';
import DashboardSidebar from '@/components/DashboardSidebar';

// Mock data for the mini mock exam
const mockExamData = [
  {
    id: 1,
    title: 'Mini Mock Test',
    questions: 16,
    duration: 20,
    description: 'This free mock test consists of 16 questions and has a duration of 20 minutes. The test includes a range of question types: Quantitative Reasoning, Abstract Reasoning, and Reading Comprehension.',
    imagePath: '/mini-mock-exam.jpg',
    isNew: true,
    hasAI: false,
  }
];

const MiniMockExam = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="pb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mini Mock Exam</h1>
          <p className="text-gray-500">Short practice exams with mixed question types</p>
        </div>

        <div className="flex flex-wrap gap-6">
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

export default MiniMockExam;

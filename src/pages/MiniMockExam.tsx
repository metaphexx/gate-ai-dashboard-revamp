
import React from 'react';
import TestCard from '@/components/cards/TestCard';
import MobileLayout from '@/components/MobileLayout';

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
    <MobileLayout>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="pb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mini Mock Exam</h1>
          <p className="text-gray-500">Short practice exams with mixed question types</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
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
    </MobileLayout>
  );
};

export default MiniMockExam;

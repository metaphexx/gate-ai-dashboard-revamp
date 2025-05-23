
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import HistoryCard from '@/components/cards/HistoryCard';

// Mock data for exam history
const mockExamHistory = [
  {
    id: 1,
    title: 'Full Length Mock Exam 1',
    date: '22/04/2025',
    description: 'This mock GATE exam provides an accurate representation of the real GATE exam by providing students an opportunity to practice their skills in reading comprehension, quantitative reasoning, abstract reasoning and writing. Please note the time limits for each section',
    feedback: 'Skipped',
    attemptCount: 3
  },
  {
    id: 2,
    title: 'Mini Mock Test',
    date: '03/02/2025',
    description: 'This Free Mock test consists of 16 questions and has a duration of 20 minutes. The test consists of a range of question types, Quantitative Reasoning, Abstract Reasoning, Reading Comprehension and Writing.',
    feedback: 'Skipped',
    attemptCount: 1
  }
];

const practiceTestHistory = [
  {
    id: 1,
    title: 'Abstract Reasoning',
    date: '11/04/2025',
    description: 'An abstract reasoning test (ART) is a type of aptitude test that measures a candidate\'s ability to identify patterns, relationships, and rules in visual or abstract information',
    feedback: 'Skipped',
    attemptCount: 1
  },
  {
    id: 2,
    title: 'Writing Test',
    date: '02/04/2025',
    description: 'The Communicating Ideas in Writing section of the GATE (Gifted and Talented Education) test assesses a student\'s ability to think creatively, express ideas clearly, and structure their writing effectively.',
    feedback: 'Skipped',
    attemptCount: 12
  },
  {
    id: 3,
    title: 'Reading Comprehension',
    date: '28/02/2025',
    description: 'Some people learn comprehension skills through education or instruction and others learn through direct experiences.Proficient reading depends on the ability to recognize words quickly and effortlessly. It is also determined by an individual\'s cognitive development.',
    feedback: 'Skipped',
    attemptCount: 6
  }
];

const ExamHistory = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
        <div className="pb-2">
          <h1 className="text-2xl font-bold text-gray-900">History</h1>
          <p className="text-gray-500">View your past exams and performance</p>
        </div>

        {/* Mock Exams Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Mock Exams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockExamHistory.map((exam) => (
              <HistoryCard 
                key={exam.id}
                title={exam.title}
                date={exam.date}
                description={exam.description}
                feedback={exam.feedback}
                attemptCount={exam.attemptCount}
              />
            ))}
          </div>
          <div className="flex justify-end items-center gap-2 mt-6">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Practice Tests Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">Practice Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceTestHistory.map((test) => (
              <HistoryCard 
                key={test.id}
                title={test.title}
                date={test.date}
                description={test.description}
                feedback={test.feedback}
                attemptCount={test.attemptCount}
              />
            ))}
          </div>
          <div className="flex justify-end items-center gap-2 mt-6">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamHistory;

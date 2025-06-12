
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import HistoryCard from '@/components/cards/HistoryCard';

// Enhanced mock data structure with retake support
const mockExamHistory = [
  {
    id: 'mock-1',
    examId: 'full-mock-1',
    attemptId: 'attempt-1',
    title: 'Full Length Mock Exam 1',
    date: '22/04/2025',
    description: 'This mock GATE exam provides an accurate representation of the real GATE exam by providing students an opportunity to practice their skills in reading comprehension, quantitative reasoning, abstract reasoning and writing. Please note the time limits for each section',
    feedback: 'Skipped',
    attemptCount: 3,
    isRetakeable: true,
    questions: [
      // This would contain the exact questions from the original attempt
      { id: 'q1', type: 'multiple-choice', content: '...' },
      { id: 'q2', type: 'abstract-reasoning', content: '...' }
    ]
  },
  {
    id: 'mock-2',
    examId: 'mini-mock-1',
    attemptId: 'attempt-2',
    title: 'Mini Mock Test',
    date: '03/02/2025',
    description: 'This Free Mock test consists of 16 questions and has a duration of 20 minutes. The test consists of a range of question types, Quantitative Reasoning, Abstract Reasoning, Reading Comprehension and Writing.',
    feedback: 'Skipped',
    attemptCount: 1,
    isRetakeable: true,
    questions: []
  }
];

const practiceTestHistory = [
  {
    id: 'practice-1',
    examId: 'abstract-reasoning-1',
    attemptId: 'attempt-3',
    title: 'Abstract Reasoning',
    date: '11/04/2025',
    description: 'An abstract reasoning test (ART) is a type of aptitude test that measures a candidate\'s ability to identify patterns, relationships, and rules in visual or abstract information',
    feedback: 'Skipped',
    attemptCount: 1,
    isRetakeable: true,
    questions: []
  },
  {
    id: 'practice-2',
    examId: 'writing-test-1',
    attemptId: 'attempt-4',
    title: 'Writing Test',
    date: '02/04/2025',
    description: 'The Communicating Ideas in Writing section of the GATE (Gifted and Talented Education) test assesses a student\'s ability to think creatively, express ideas clearly, and structure their writing effectively.',
    feedback: 'Skipped',
    attemptCount: 12,
    isRetakeable: true,
    questions: []
  },
  {
    id: 'practice-3',
    examId: 'reading-comp-1',
    attemptId: 'attempt-5',
    title: 'Reading Comprehension',
    date: '28/02/2025',
    description: 'Some people learn comprehension skills through education or instruction and others learn through direct experiences.Proficient reading depends on the ability to recognize words quickly and effortlessly. It is also determined by an individual\'s cognitive development.',
    feedback: 'Skipped',
    attemptCount: 6,
    isRetakeable: true,
    questions: []
  }
];

const ExamHistory = () => {
  const navigate = useNavigate();

  const handleRetake = (id: string, examType: 'mock' | 'practice') => {
    // Find the original exam data
    const allExams = [...mockExamHistory, ...practiceTestHistory];
    const examData = allExams.find(exam => exam.id === id);
    
    if (!examData) return;

    // Navigate to appropriate test page with original questions
    if (examType === 'mock') {
      if (examData.title === 'Mini Mock Test') {
        navigate('/mini-mock', { 
          state: { 
            isRetake: true, 
            originalQuestions: examData.questions,
            examId: examData.examId,
            attemptId: examData.attemptId
          } 
        });
      } else {
        navigate('/mock', { 
          state: { 
            isRetake: true, 
            originalQuestions: examData.questions,
            examId: examData.examId,
            attemptId: examData.attemptId
          } 
        });
      }
    } else {
      // Practice tests
      if (examData.title === 'Abstract Reasoning') {
        navigate('/abstract-reasoning-prestart', { 
          state: { 
            isRetake: true, 
            originalQuestions: examData.questions,
            examId: examData.examId,
            attemptId: examData.attemptId
          } 
        });
      } else if (examData.title === 'Writing Test') {
        navigate('/writing-test', { 
          state: { 
            isRetake: true, 
            originalQuestions: examData.questions,
            examId: examData.examId,
            attemptId: examData.attemptId
          } 
        });
      } else if (examData.title === 'Reading Comprehension') {
        navigate('/reading-comprehension-test', { 
          state: { 
            isRetake: true, 
            originalQuestions: examData.questions,
            examId: examData.examId,
            attemptId: examData.attemptId
          } 
        });
      }
    }
  };

  const handleViewReport = (id: string) => {
    // Navigate to results/report page
    console.log(`Viewing report for exam: ${id}`);
    // This would navigate to a detailed report page
  };

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
                id={exam.id}
                title={exam.title}
                date={exam.date}
                description={exam.description}
                feedback={exam.feedback}
                attemptCount={exam.attemptCount}
                examType="mock"
                isRetakeable={exam.isRetakeable}
                onRetake={handleRetake}
                onViewReport={handleViewReport}
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
                id={test.id}
                title={test.title}
                date={test.date}
                description={test.description}
                feedback={test.feedback}
                attemptCount={test.attemptCount}
                examType="practice"
                isRetakeable={test.isRetakeable}
                onRetake={handleRetake}
                onViewReport={handleViewReport}
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

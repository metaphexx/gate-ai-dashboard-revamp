
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import HistoryCard from '@/components/cards/HistoryCard';

// Enhanced mock data structure with individual attempts
const mockExamHistory = [
  {
    id: 'mock-1',
    examId: 'full-mock-1',
    attemptId: 'attempt-1',
    title: 'Full Length Mock Exam 1',
    date: '22/04/2025 10:30 AM',
    description: 'This mock GATE exam provides an accurate representation of the real GATE exam by providing students an opportunity to practice their skills in reading comprehension, quantitative reasoning, abstract reasoning and writing. Please note the time limits for each section',
    feedback: 'Skipped',
    attemptCount: 3,
    attemptNumber: 1,
    totalAttempts: 3,
    score: 0,
    isRetakeable: true,
    questions: [
      { id: 'q1', type: 'multiple-choice', content: '...' },
      { id: 'q2', type: 'abstract-reasoning', content: '...' }
    ]
  },
  {
    id: 'mock-2',
    examId: 'mini-mock-1',
    attemptId: 'attempt-2',
    title: 'Mini Mock Test',
    date: '03/02/2025 2:15 PM',
    description: 'This Free Mock test consists of 16 questions and has a duration of 20 minutes. The test consists of a range of question types, Quantitative Reasoning, Abstract Reasoning, Reading Comprehension and Writing.',
    feedback: 'Skipped',
    attemptCount: 1,
    attemptNumber: 1,
    totalAttempts: 1,
    score: 0,
    isRetakeable: true,
    questions: []
  }
];

// Individual practice test attempts - each attempt gets its own card
const practiceTestHistory = [
  // Abstract Reasoning attempts
  {
    id: 'practice-1-attempt-1',
    examId: 'abstract-reasoning-1',
    attemptId: 'ar-attempt-1',
    title: 'Abstract Reasoning',
    date: '11/04/2025 9:30 AM',
    description: 'An abstract reasoning test (ART) is a type of aptitude test that measures a candidate\'s ability to identify patterns, relationships, and rules in visual or abstract information',
    feedback: 'Completed',
    attemptNumber: 1,
    totalAttempts: 1,
    score: 85,
    timeSpent: '12 min',
    isRetakeable: true,
    questions: [
      { id: 'ar-q1', type: 'pattern-matching', content: '...' },
      { id: 'ar-q2', type: 'sequence', content: '...' }
    ]
  },
  
  // Writing Test attempts (multiple)
  {
    id: 'practice-2-attempt-1',
    examId: 'writing-test-1',
    attemptId: 'wt-attempt-1',
    title: 'Writing Test',
    date: '28/02/2025 10:15 AM',
    description: 'The Communicating Ideas in Writing section of the GATE (Gifted and Talented Education) test assesses a student\'s ability to think creatively, express ideas clearly, and structure their writing effectively.',
    feedback: 'Completed',
    attemptNumber: 1,
    totalAttempts: 12,
    score: 78,
    timeSpent: '25 min',
    isRetakeable: true,
    questions: [
      { id: 'wt-q1', type: 'creative-writing', content: '...' },
      { id: 'wt-q2', type: 'essay', content: '...' }
    ]
  },
  {
    id: 'practice-2-attempt-2',
    examId: 'writing-test-1',
    attemptId: 'wt-attempt-2',
    title: 'Writing Test',
    date: '01/03/2025 3:45 PM',
    description: 'The Communicating Ideas in Writing section of the GATE (Gifted and Talented Education) test assesses a student\'s ability to think creatively, express ideas clearly, and structure their writing effectively.',
    feedback: 'Completed',
    attemptNumber: 2,
    totalAttempts: 12,
    score: 92,
    timeSpent: '23 min',
    isRetakeable: true,
    questions: [
      { id: 'wt2-q1', type: 'creative-writing', content: '...' },
      { id: 'wt2-q2', type: 'essay', content: '...' }
    ]
  },
  {
    id: 'practice-2-attempt-3',
    examId: 'writing-test-1',
    attemptId: 'wt-attempt-3',
    title: 'Writing Test',
    date: '05/03/2025 11:20 AM',
    description: 'The Communicating Ideas in Writing section of the GATE (Gifted and Talented Education) test assesses a student\'s ability to think creatively, express ideas clearly, and structure their writing effectively.',
    feedback: 'Skipped',
    attemptNumber: 3,
    totalAttempts: 12,
    score: 0,
    timeSpent: '5 min',
    isRetakeable: true,
    questions: [
      { id: 'wt3-q1', type: 'creative-writing', content: '...' },
      { id: 'wt3-q2', type: 'essay', content: '...' }
    ]
  },
  
  // Reading Comprehension attempts (multiple)
  {
    id: 'practice-3-attempt-1',
    examId: 'reading-comp-1',
    attemptId: 'rc-attempt-1',
    title: 'Reading Comprehension',
    date: '25/02/2025 2:30 PM',
    description: 'Some people learn comprehension skills through education or instruction and others learn through direct experiences.Proficient reading depends on the ability to recognize words quickly and effortlessly.',
    feedback: 'Completed',
    attemptNumber: 1,
    totalAttempts: 6,
    score: 88,
    timeSpent: '18 min',
    isRetakeable: true,
    questions: [
      { id: 'rc-q1', type: 'comprehension', content: '...' },
      { id: 'rc-q2', type: 'inference', content: '...' }
    ]
  },
  {
    id: 'practice-3-attempt-2',
    examId: 'reading-comp-1',
    attemptId: 'rc-attempt-2',
    title: 'Reading Comprehension',
    date: '28/02/2025 4:15 PM',
    description: 'Some people learn comprehension skills through education or instruction and others learn through direct experiences.Proficient reading depends on the ability to recognize words quickly and effortlessly.',
    feedback: 'Completed',
    attemptNumber: 2,
    totalAttempts: 6,
    score: 95,
    timeSpent: '16 min',
    isRetakeable: true,
    questions: [
      { id: 'rc2-q1', type: 'comprehension', content: '...' },
      { id: 'rc2-q2', type: 'inference', content: '...' }
    ]
  },
  {
    id: 'practice-3-attempt-3',
    examId: 'reading-comp-1',
    attemptId: 'rc-attempt-3',
    title: 'Reading Comprehension',
    date: '02/03/2025 1:45 PM',
    description: 'Some people learn comprehension skills through education or instruction and others learn through direct experiences.Proficient reading depends on the ability to recognize words quickly and effortlessly.',
    feedback: 'Skipped',
    attemptNumber: 3,
    totalAttempts: 6,
    score: 0,
    timeSpent: '3 min',
    isRetakeable: true,
    questions: [
      { id: 'rc3-q1', type: 'comprehension', content: '...' },
      { id: 'rc3-q2', type: 'inference', content: '...' }
    ]
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
            attemptId: examData.attemptId,
            originalAttemptDate: examData.date
          } 
        });
      } else {
        navigate('/mock', { 
          state: { 
            isRetake: true, 
            originalQuestions: examData.questions,
            examId: examData.examId,
            attemptId: examData.attemptId,
            originalAttemptDate: examData.date
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
            attemptId: examData.attemptId,
            originalAttemptDate: examData.date
          } 
        });
      } else if (examData.title === 'Writing Test') {
        navigate('/writing-test', { 
          state: { 
            isRetake: true, 
            originalQuestions: examData.questions,
            examId: examData.examId,
            attemptId: examData.attemptId,
            originalAttemptDate: examData.date
          } 
        });
      } else if (examData.title === 'Reading Comprehension') {
        navigate('/reading-comprehension-test', { 
          state: { 
            isRetake: true, 
            originalQuestions: examData.questions,
            examId: examData.examId,
            attemptId: examData.attemptId,
            originalAttemptDate: examData.date
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

  // Sort practice tests by date (newest first)
  const sortedPracticeTests = [...practiceTestHistory].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <MobileLayout>
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-8">
        <div className="pb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">History</h1>
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
                attemptCount={exam.attemptNumber}
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
          <p className="text-sm text-gray-600 mb-4">Each attempt is shown separately - retake any specific attempt to get the same questions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPracticeTests.map((test) => (
              <HistoryCard 
                key={test.id}
                id={test.id}
                title={`${test.title} - Attempt ${test.attemptNumber}/${test.totalAttempts}`}
                date={test.date}
                description={test.description}
                feedback={test.feedback}
                attemptCount={test.attemptNumber}
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
    </MobileLayout>
  );
};

export default ExamHistory;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatProvider } from "@/contexts/ChatContext";
import { VideoProgressProvider } from "@/contexts/VideoProgressContext";
import Index from "./pages/Index";
import SkillsTrainer from "./pages/SkillsTrainer";
import MemoryGame from "./pages/MemoryGame";
import ArithmeticGame from "./pages/ArithmeticGame";
import PracticeTest from "./pages/PracticeTest";
import MiniMockExam from "./pages/MiniMockExam";
import MockExam from "./pages/MockExam";
import ExamInProgress from "./pages/ExamInProgress";
import ExamHistory from "./pages/ExamHistory";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import VideoTutorials from "./pages/VideoTutorials";
import VideoLessons from "./pages/VideoLessons";
import QuantitativeReasoningLessons from "./pages/QuantitativeReasoningLessons";
import ReadingComprehensionLessons from "./pages/ReadingComprehensionLessons";
import WritingLessons from "./pages/WritingLessons";
import AbstractReasoningLessons from "./pages/AbstractReasoningLessons";
import NotFound from "./pages/NotFound";
import AbstractReasoningPreStart from "./pages/AbstractReasoningPreStart";
import AbstractReasoningTest from "./pages/AbstractReasoningTest";
import AbstractReasoningResults from "./pages/AbstractReasoningResults";
import AbstractReasoningFeedback from "./pages/AbstractReasoningFeedback";
import AbstractReasoningSolution from "./pages/AbstractReasoningSolution";
import ReadingComprehensionPreStart from "./pages/ReadingComprehensionPreStart";
import ReadingComprehensionTest from "./pages/ReadingComprehensionTest";
import ReadingComprehensionResults from "./pages/ReadingComprehensionResults";
import ReadingComprehensionSolution from "./pages/ReadingComprehensionSolution";
import WritingPreStart from "./pages/WritingPreStart";
import WritingTest from "./pages/WritingTest";
import WritingResults from "./pages/WritingResults";
import WritingSolution from "./pages/WritingSolution";
import ChatWithElliot from "./pages/ChatWithElliot";
import QuantitativeReasoningPracticeTest from './pages/QuantitativeReasoningPracticeTest';
import StudyNotes from './pages/StudyNotes';
import StudyNotesSubject from './pages/StudyNotesSubject';
import StudyNotesTopic from './pages/StudyNotesTopic';
import AdminDashboard from './pages/AdminDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VideoProgressProvider>
        <ChatProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/skills-trainer" element={<SkillsTrainer />} />
                <Route path="/memory-game" element={<MemoryGame />} />
                <Route path="/arithmetic-game" element={<ArithmeticGame />} />
                <Route path="/practice" element={<PracticeTest />} />
                <Route path="/abstract-reasoning-prestart" element={<AbstractReasoningPreStart />} />
                <Route path="/abstract-reasoning-test" element={<AbstractReasoningTest />} />
                <Route path="/abstract-reasoning-results" element={<AbstractReasoningResults />} />
                <Route path="/abstract-reasoning-feedback" element={<AbstractReasoningFeedback />} />
                <Route path="/abstract-reasoning-solution" element={<AbstractReasoningSolution />} />
                <Route path="/reading-comprehension-prestart" element={<ReadingComprehensionPreStart />} />
                <Route path="/reading-comprehension-test" element={<ReadingComprehensionTest />} />
                <Route path="/reading-comprehension-results" element={<ReadingComprehensionResults />} />
                <Route path="/reading-comprehension-solution" element={<ReadingComprehensionSolution />} />
                <Route path="/writing-prestart" element={<WritingPreStart />} />
                <Route path="/writing-test" element={<WritingTest />} />
                <Route path="/writing-results" element={<WritingResults />} />
                <Route path="/writing-solution" element={<WritingSolution />} />
                <Route path="/mini-mock" element={<MiniMockExam />} />
                <Route path="/mock" element={<MockExam />} />
                <Route path="/progress" element={<ExamInProgress />} />
                <Route path="/history" element={<ExamHistory />} />
                <Route path="/chat" element={<ChatWithElliot />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<Support />} />
                <Route path="/video-tutorials" element={<VideoTutorials />} />
                <Route path="/video-lessons" element={<VideoLessons />} />
                <Route path="/video-lessons/quantitative-reasoning" element={<QuantitativeReasoningLessons />} />
                <Route path="/video-lessons/reading-comprehension" element={<ReadingComprehensionLessons />} />
                <Route path="/video-lessons/writing" element={<WritingLessons />} />
                <Route path="/video-lessons/abstract-reasoning" element={<AbstractReasoningLessons />} />
                <Route path="/practice-test/quantitative-reasoning" element={<QuantitativeReasoningPracticeTest />} />
                <Route path="/study-notes" element={<StudyNotes />} />
                <Route path="/study-notes/:subjectId" element={<StudyNotesSubject />} />
                <Route path="/study-notes/:subjectId/:topicId" element={<StudyNotesTopic />} />
                <Route path="/admin" element={<AdminDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </BrowserRouter>
        </ChatProvider>
      </VideoProgressProvider>
    </QueryClientProvider>
  );
}

export default App;

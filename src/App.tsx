
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SkillsTrainer from "./pages/SkillsTrainer";
import PracticeTest from "./pages/PracticeTest";
import MiniMockExam from "./pages/MiniMockExam";
import MockExam from "./pages/MockExam";
import ExamInProgress from "./pages/ExamInProgress";
import ExamHistory from "./pages/ExamHistory";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import VideoTutorials from "./pages/VideoTutorials";
import NotFound from "./pages/NotFound";
import AbstractReasoningTest from "./pages/AbstractReasoningTest";
import AbstractReasoningResults from "./pages/AbstractReasoningResults";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/skills-trainer" element={<SkillsTrainer />} />
            <Route path="/practice" element={<PracticeTest />} />
            <Route path="/abstract-reasoning-test" element={<AbstractReasoningTest />} />
            <Route path="/abstract-reasoning-results" element={<AbstractReasoningResults />} />
            <Route path="/mini-mock" element={<MiniMockExam />} />
            <Route path="/mock" element={<MockExam />} />
            <Route path="/progress" element={<ExamInProgress />} />
            <Route path="/history" element={<ExamHistory />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/video-tutorials" element={<VideoTutorials />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;


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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/skills-trainer" element={<SkillsTrainer />} />
          <Route path="/practice" element={<PracticeTest />} />
          <Route path="/mini-mock" element={<MiniMockExam />} />
          <Route path="/mock" element={<MockExam />} />
          <Route path="/progress" element={<ExamInProgress />} />
          <Route path="/history" element={<ExamHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

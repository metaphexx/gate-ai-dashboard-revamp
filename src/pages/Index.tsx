
import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import WelcomeBanner from '@/components/WelcomeBanner';
import TierSummary from '@/components/cards/TierSummary';
import RecentActivityCard from '@/components/cards/RecentActivityCard';
import SmartRecommendations from '@/components/cards/SmartRecommendations';
import PerformanceOverview from '@/components/cards/PerformanceOverview';
import StudyStreakCard from '@/components/cards/StudyStreakCard';
import QuestionBankStatus from '@/components/cards/QuestionBankStatus';
import VideoTutorialCard from '@/components/cards/VideoTutorialCard';
import AccuracyTrendChart from '@/components/charts/AccuracyTrendChart';
import ChatBanner from '@/components/chat/ChatBanner';
import ChatPanel from '@/components/chat/ChatPanel';
import FloatingChatButton from '@/components/chat/FloatingChatButton';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <MobileLayout>
      <main className="flex-1 p-3 sm:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-2">GATE AI Online Question Bank</h1>
              <p className="text-gray-500 text-sm sm:text-base">Track your GATE exam preparation progress on the Dashboard!</p>
            </div>
          </header>
          
          {/* Welcome Banner and Video Tutorial - At the top */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
            <div className="lg:col-span-3">
              <WelcomeBanner />
            </div>
            <div className="lg:col-span-1">
              <VideoTutorialCard />
            </div>
          </section>
          
          {/* Chat Banner - Above Your Progress */}
          <section className="mb-4">
            <ChatBanner onOpenChat={() => setIsChatOpen(true)} />
          </section>

          {/* Tier Summary */}
          <section className="mb-4">
            <TierSummary />
          </section>
          
          {/* Performance Overview & Study Progress Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <div className="lg:col-span-2">
              <PerformanceOverview />
            </div>
            <div>
              <StudyStreakCard />
            </div>
          </section>
          
          {/* Recent Activity & Smart Recommendations */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <RecentActivityCard />
            <SmartRecommendations />
          </section>
          
          {/* Accuracy Trend Chart */}
          <section className="mb-4">
            <AccuracyTrendChart />
          </section>
          
          {/* Question Bank Status */}
          <section className="mb-4">
            <QuestionBankStatus />
          </section>
        </div>
      </main>

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={() => setIsChatOpen(true)} />

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </MobileLayout>
  );
};

export default Index;

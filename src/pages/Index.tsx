
import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import WelcomeBanner from '@/components/WelcomeBanner';
import TierSummary from '@/components/cards/TierSummary';
import RecentActivityCard from '@/components/cards/RecentActivityCard';
import SmartRecommendations from '@/components/cards/SmartRecommendations';
import PerformanceOverview from '@/components/cards/PerformanceOverview';
import StudyStreakCard from '@/components/cards/StudyStreakCard';
import QuestionBankStatus from '@/components/cards/QuestionBankStatus';
import VideoTutorialCard from '@/components/cards/VideoTutorialCard';
import AccuracyTrendChart from '@/components/charts/AccuracyTrendChart';
import UserProfileBadge from '@/components/UserProfileBadge';

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-500">Track your GATE exam preparation progress</p>
            </div>
            <UserProfileBadge />
          </header>
          
          {/* Performance Overview & Study Streak - Moved to top */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <PerformanceOverview />
            </div>
            <StudyStreakCard />
          </section>
          
          {/* Welcome Banner and Video Tutorial side by side */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-3">
              <WelcomeBanner />
            </div>
            <div className="lg:col-span-1">
              <VideoTutorialCard />
            </div>
          </section>
          
          {/* Tier Summary */}
          <section className="mb-6">
            <TierSummary />
          </section>
          
          {/* Recent Activity & Smart Recommendations - Moved after Performance & Study Streak */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RecentActivityCard />
            <SmartRecommendations />
          </section>
          
          {/* Accuracy Trend Chart */}
          <section className="mb-6">
            <AccuracyTrendChart />
          </section>
          
          {/* Question Bank Status */}
          <section className="mb-6">
            <QuestionBankStatus />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;

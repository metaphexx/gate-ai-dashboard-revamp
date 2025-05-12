
import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import WelcomeBanner from '@/components/WelcomeBanner';
import StatCard from '@/components/cards/StatCard';
import RecentActivityCard from '@/components/cards/RecentActivityCard';
import QuestionBankCard from '@/components/cards/QuestionBankCard';
import ProgressTrackerCard from '@/components/cards/ProgressTrackerCard';
import PerformanceChart from '@/components/charts/PerformanceChart';
import ProgressChart from '@/components/charts/ProgressChart';
import SubjectPerformance from '@/components/charts/SubjectPerformance';
import { FileCheck, Clock, CheckCircle, Target } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-500">Track your GATE exam preparation progress</p>
          </header>
          
          <section className="mb-6">
            <WelcomeBanner />
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard 
              title="Total Questions Attempted" 
              value={137} 
              icon={<FileCheck size={20} />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard 
              title="Total Time Spent" 
              value="11h 23m" 
              icon={<Clock size={20} />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard 
              title="Average Accuracy" 
              value="43%" 
              icon={<CheckCircle size={20} />}
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard 
              title="Exam Readiness" 
              value="67%" 
              icon={<Target size={20} />}
              trend={{ value: 3, isPositive: true }}
            />
          </section>
          
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Subject Performance</h3>
              <SubjectPerformance />
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Performance by Topic</h3>
              <PerformanceChart />
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Progress Over Time</h3>
              <ProgressChart />
            </div>
          </section>
          
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <QuestionBankCard />
            </div>
            
            <div className="lg:col-span-1">
              <div className="grid grid-cols-1 gap-6">
                <RecentActivityCard />
                <ProgressTrackerCard />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;

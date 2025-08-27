import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AnalyticsHub } from '@/components/admin/AnalyticsHub';
import { UserManagement } from '@/components/admin/UserManagement';
import { ContentPerformance } from '@/components/admin/ContentPerformance';
import { ExamTracking } from '@/components/admin/ExamTracking';
import { RetentionAnalytics } from '@/components/admin/RetentionAnalytics';
import { GrowthMetrics } from '@/components/admin/GrowthMetrics';
import { PredictiveInsights } from '@/components/admin/PredictiveInsights';
import { CommunicationHub } from '@/components/admin/CommunicationHub';
import { TutorInsights } from '@/components/admin/TutorInsights';
import { DataVisualization } from '@/components/admin/DataVisualization';
import { AdminOverview } from '@/components/admin/AdminOverview';
import { SidebarProvider } from '@/components/ui/sidebar';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminOverview />;
      case 'analytics':
        return <AnalyticsHub />;
      case 'users':
        return <UserManagement />;
      case 'content':
        return <ContentPerformance />;
      case 'exams':
        return <ExamTracking />;
      case 'retention':
        return <RetentionAnalytics />;
      case 'growth':
        return <GrowthMetrics />;
      case 'insights':
        return <PredictiveInsights />;
      case 'communication':
        return <CommunicationHub />;
      case 'tutors':
        return <TutorInsights />;
      case 'visualization':
        return <DataVisualization />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <AdminHeader />
        <div className="flex flex-1 w-full">
          <AdminSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
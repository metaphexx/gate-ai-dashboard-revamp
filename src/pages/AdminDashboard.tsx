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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float [animation-delay:2s]" />
        
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <AdminHeader />
          <main className="flex-1 overflow-auto p-6 relative">
            <div className="backdrop-blur-sm">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
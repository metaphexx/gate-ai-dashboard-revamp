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
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

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
        {/* Mobile Header with Menu Button */}
        {isMobile && (
          <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-card border-b border-border">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileOpen(true)}
                className="h-9 w-9 p-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="font-semibold text-foreground">Admin Dashboard</h1>
            </div>
          </div>
        )}
        
        {/* Desktop Header */}
        {!isMobile && <AdminHeader />}
        
        <div className="flex flex-1 w-full">
          {/* Desktop Sidebar Trigger */}
          {!isMobile && (
            <div className="absolute top-20 left-4 z-10">
              <SidebarTrigger className="h-8 w-8" />
            </div>
          )}
          
          {/* Sidebar */}
          <AdminSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
            mobileOpen={mobileOpen}
            onMobileClose={() => setMobileOpen(false)}
          />
          
          {/* Main Content */}
          <main className={cn(
            "flex-1 overflow-auto",
            isMobile ? "p-4" : "p-6"
          )}>
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
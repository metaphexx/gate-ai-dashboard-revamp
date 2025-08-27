import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar
} from '@/components/ui/sidebar';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  FileText,
  GraduationCap,
  Repeat,
  BarChart3,
  Brain,
  MessageSquare,
  UserCheck,
  PieChart,
  ShieldCheck,
  X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const adminMenuItems = [
  {
    title: "Dashboard",
    items: [
      { 
        id: 'overview', 
        name: "Overview", 
        icon: LayoutDashboard,
        description: "System overview & key metrics"
      },
      { 
        id: 'analytics', 
        name: "Analytics Hub", 
        icon: TrendingUp,
        description: "Real-time metrics & engagement"
      }
    ]
  },
  {
    title: "Management",
    items: [
      { 
        id: 'users', 
        name: "User Management", 
        icon: Users,
        description: "User profiles & behavior"
      },
      { 
        id: 'content', 
        name: "Content Performance", 
        icon: FileText,
        description: "Question bank & video insights"
      },
      { 
        id: 'exams', 
        name: "Exam Tracking", 
        icon: GraduationCap,
        description: "Practice & exam analytics"
      }
    ]
  },
  {
    title: "Analytics",
    items: [
      { 
        id: 'retention', 
        name: "Retention Analytics", 
        icon: Repeat,
        description: "Cohort & churn analysis"
      },
      { 
        id: 'growth', 
        name: "Growth Metrics", 
        icon: BarChart3,
        description: "Acquisition & conversion"
      },
      { 
        id: 'insights', 
        name: "AI Insights", 
        icon: Brain,
        description: "Predictive analytics & alerts"
      }
    ]
  },
  {
    title: "Operations",
    items: [
      { 
        id: 'communication', 
        name: "Communication Hub", 
        icon: MessageSquare,
        description: "Messaging & support"
      },
      { 
        id: 'tutors', 
        name: "Tutor Insights", 
        icon: UserCheck,
        description: "Staff performance & activity"
      },
      { 
        id: 'visualization', 
        name: "Data Export", 
        icon: PieChart,
        description: "Reports & visualizations"
      }
    ]
  }
];

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

// Mobile Sidebar Component (Drawer)
const MobileAdminSidebar = ({ 
  activeSection, 
  onSectionChange, 
  mobileOpen = false, 
  onMobileClose 
}: AdminSidebarProps) => {
  const handleItemClick = (sectionId: string) => {
    onSectionChange(sectionId);
    onMobileClose?.(); // Close drawer after selection
  };

  return (
    <Drawer open={mobileOpen} onOpenChange={(open) => !open && onMobileClose?.()}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <DrawerTitle className="text-lg font-semibold text-foreground">Admin Dashboard</DrawerTitle>
                <p className="text-sm text-muted-foreground">GATE AI Management</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>
        
        <div className="flex-1 overflow-auto p-4">
          {adminMenuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground px-2 mb-3 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-4 rounded-lg transition-all duration-200 text-left",
                      "min-h-[48px]", // Touch-friendly height
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground active:bg-muted/80"
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

// Desktop Sidebar Component
const DesktopAdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar 
      className={cn(
        "transition-all duration-300 ease-in-out border-r border-border bg-card",
        collapsed ? "w-16" : "w-72"
      )} 
      variant="sidebar"
    >
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-foreground">Admin Dashboard</h2>
              <p className="text-xs text-muted-foreground">GATE AI Management</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex-1 overflow-auto py-4">
        {adminMenuItems.map((section, idx) => (
          <SidebarGroup key={idx} className="mb-6">
            {!collapsed && (
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 mb-2 uppercase tracking-wider">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(item.id)}
                      className={cn(
                        "w-full justify-start transition-all duration-200 group relative",
                        collapsed ? "px-3 py-3" : "px-3 py-3",
                        activeSection === item.id
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                      )}
                      title={collapsed ? item.name : undefined} // Tooltip for collapsed state
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 text-left ml-3">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-muted-foreground opacity-80">{item.description}</div>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

// Main Admin Sidebar Component
export const AdminSidebar = ({ activeSection, onSectionChange, mobileOpen, onMobileClose }: AdminSidebarProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileAdminSidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        mobileOpen={mobileOpen}
        onMobileClose={onMobileClose}
      />
    );
  }

  return (
    <DesktopAdminSidebar
      activeSection={activeSection}
      onSectionChange={onSectionChange}
    />
  );
};
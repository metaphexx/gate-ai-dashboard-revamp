import React from 'react';
import { NavLink } from 'react-router-dom';
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
  Settings,
  ShieldCheck
} from 'lucide-react';
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
}

export const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className={cn(collapsed ? "w-16" : "w-80")} variant="sidebar">
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
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 mb-2 uppercase">
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
                        "w-full justify-start px-3 py-3 transition-colors",
                        activeSection === item.id
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
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
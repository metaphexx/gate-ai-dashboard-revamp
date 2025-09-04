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
  LayoutDashboard,
  TrendingUp,
  Users,
  FileText,
  GraduationCap,
  Repeat,
  BarChart3,
  MessageSquare,
  UserCheck,
  PieChart,
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
    <Sidebar className="border-r border-border" collapsible="icon">
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
      
      <SidebarContent>
        {adminMenuItems.map((section, idx) => (
          <SidebarGroup key={idx}>
            {!collapsed && (
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="gap-3">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      size="lg"
                      onClick={() => onSectionChange(item.id)}
                      className={cn(
                        "w-full justify-start transition-all duration-200",
                        activeSection === item.id
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                      )}
                      tooltip={collapsed ? item.name : undefined}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 text-left">
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
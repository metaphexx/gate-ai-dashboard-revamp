import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh]">
            <DrawerHeader className="text-left">
              <DrawerTitle>Navigation</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4 overflow-y-auto">
              <DashboardSidebar />
            </div>
          </DrawerContent>
        </Drawer>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">GATE AI</span>
        </div>
      </header>

      {/* Mobile Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
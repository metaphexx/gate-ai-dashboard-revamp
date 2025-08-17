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
import UserProfileBadge from '@/components/UserProfileBadge';
import Logo from '@/components/Logo';
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
          <DrawerContent className="h-[90vh] w-full max-w-none">
            <DrawerHeader className="text-left border-b border-gray-200">
              <DrawerTitle className="text-lg font-semibold">Navigation</DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto">
              <DashboardSidebar isMobile={true} />
            </div>
          </DrawerContent>
        </Drawer>
        
        <div className="flex-1 flex justify-center">
          <Logo />
        </div>
        
        <UserProfileBadge />
      </header>

      {/* Mobile Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
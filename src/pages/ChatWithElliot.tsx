
import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import ChatPanel from '@/components/chat/ChatPanel';

const ChatWithElliot = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <main className="flex-1 relative">
        <ChatPanel isOpen={true} onClose={() => window.history.back()} />
      </main>
    </div>
  );
};

export default ChatWithElliot;

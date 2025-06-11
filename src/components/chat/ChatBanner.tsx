
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatBannerProps {
  onOpenChat: () => void;
}

const ChatBanner = ({ onOpenChat }: ChatBannerProps) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 max-w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center text-white font-bold text-lg">
            E
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900">Hey, I'm Elliot, your virtual assistant</h3>
            <p className="text-gray-500 text-sm">You can ask me anything related to your exam preparation.</p>
          </div>
        </div>
        <Button 
          onClick={onOpenChat}
          className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-6 py-2 rounded-md font-medium"
        >
          ASK ELLIOT
        </Button>
      </div>
    </div>
  );
};

export default ChatBanner;

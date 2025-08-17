
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatBannerProps {
  onOpenChat: () => void;
}

const ChatBanner = ({ onOpenChat }: ChatBannerProps) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden flex-shrink-0">
            <img 
              src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" 
              alt="Elliot Avatar" 
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base sm:text-lg text-gray-900 leading-tight">Hey, I'm Elliot, your virtual assistant</h3>
            <p className="text-gray-500 text-sm mt-1">You can ask me anything related to your exam preparation.</p>
          </div>
        </div>
        <Button 
          onClick={onOpenChat}
          className="bg-[#009dff] hover:bg-[#0080ff] text-white px-6 py-2 rounded-md font-medium w-full sm:w-auto"
        >
          ASK ELLIOT
        </Button>
      </div>
    </div>
  );
};

export default ChatBanner;

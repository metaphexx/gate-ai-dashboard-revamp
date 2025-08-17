
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton = ({ onClick }: FloatingChatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 bg-[#009dff] hover:bg-[#0080ff] text-white rounded-full w-12 h-12 md:w-14 md:h-14 shadow-lg z-40 flex items-center justify-center"
      size="icon"
    >
      <img 
        src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" 
        alt="Elliot Avatar" 
        className="w-6 h-6 md:w-8 md:h-8 rounded-full"
      />
    </Button>
  );
};

export default FloatingChatButton;


import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const VideoTutorialCard = () => {
  return (
    <HoverCard openDelay={300} closeDelay={200}>
      <HoverCardTrigger>
        <Card className="overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-blue-100">
          <div className="relative cursor-pointer h-full flex flex-col">
            {/* Gradient background with play button */}
            <div className="bg-gradient-to-r from-blue-600 to-[#009dff] h-24 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-10"></div>
              
              <PlayCircle 
                size={44} 
                className="text-white transition-transform transform hover:scale-110"
                strokeWidth={1.5}
                fill="rgba(255,255,255,0.1)"
              />
            </div>
            
            <CardContent className="p-3 bg-white flex-grow flex flex-col justify-center">
              <h3 className="font-semibold text-sm">Getting Started</h3>
              <p className="text-gray-500 text-xs">Quick platform overview (2:15)</p>
            </CardContent>
          </div>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0 overflow-hidden">
        <div className="relative bg-gray-100 aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle size={50} className="text-[#009dff]" fill="rgba(255,255,255,0.8)" strokeWidth={1.5} />
          </div>
        </div>
        <div className="p-3">
          <h4 className="font-semibold">Platform Tutorial</h4>
          <p className="text-sm text-gray-600 mt-1">Learn how to use all features of the GATE exam preparation platform to maximize your score.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default VideoTutorialCard;


import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const VideoTutorialCard = () => {
  return (
    <Card className="overflow-hidden h-full shadow-md hover:shadow-lg transition-shadow">
      <div className="relative cursor-pointer group h-full flex flex-col justify-between">
        {/* Dark background with gradient */}
        <div className="bg-slate-800 relative h-24 flex items-center justify-center">
          {/* Play button */}
          <div className="relative z-10">
            <PlayCircle 
              size={42} 
              className="text-[#009dff] group-hover:scale-110 transition-transform" 
              fill="#f8fafc"
              strokeWidth={1.5}
            />
          </div>
          
          {/* Optional overlay for hover effect */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <CardContent className="p-3 bg-white flex flex-col">
          <h3 className="font-semibold">Let's Get Started</h3>
          <p className="text-gray-500 text-xs">Watch the tutorial to learn how to use the platform</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default VideoTutorialCard;

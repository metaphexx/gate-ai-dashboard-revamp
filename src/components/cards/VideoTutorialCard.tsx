
import React from 'react';
import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const VideoTutorialCard = () => {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative cursor-pointer group h-full flex flex-col">
        {/* Video thumbnail - we'd use an actual thumbnail in a real app */}
        <div className="bg-gradient-to-br from-gray-700 to-gray-900 h-32 w-full flex items-center justify-center relative">
          {/* This would be an actual image in a real app */}
          <div className="flex flex-col items-center justify-center text-white">
            <div className="w-12 h-12 rounded-full bg-[#009dff]/80 flex items-center justify-center
                group-hover:bg-[#009dff] transition-colors">
              <Play size={24} fill="white" className="ml-1" />
            </div>
          </div>
          
          {/* Overlay for hover effect */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-white text-center">
              <p className="font-medium text-sm">Click to Watch</p>
            </div>
          </div>
        </div>
        
        <CardContent className="p-3 flex-grow flex flex-col justify-center">
          <h3 className="font-semibold text-base">Let's Get Started</h3>
          <p className="text-gray-500 text-xs">Watch the tutorial to learn how to use the platform</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default VideoTutorialCard;

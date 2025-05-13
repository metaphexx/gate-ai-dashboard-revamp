
import React from 'react';
import { AspectRatio } from './ui/aspect-ratio';

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-36">
        <AspectRatio ratio={3 / 1}>
          <img 
            src="/lovable-uploads/348c5da7-861f-48c6-aa6b-cf3202685210.png" 
            alt="Everest Tutoring" 
            className="object-contain h-full w-full"
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default Logo;

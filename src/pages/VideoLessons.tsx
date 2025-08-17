
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Clock, BookOpen } from 'lucide-react';

const videoLessonsData = [
  {
    id: 'reading-comprehension',
    title: 'Reading Comprehension',
    description: 'Master reading strategies, analyze texts, and improve comprehension skills for GATE success.',
    videoCount: 12,
    totalDuration: '2h 45m',
    thumbnail: '/reading-comprehension.jpg',
    progress: 25,
    route: '/video-lessons/reading-comprehension'
  },
  {
    id: 'writing',
    title: 'Writing',
    description: 'Learn essay structure, argumentation techniques, and writing strategies for high scores.',
    videoCount: 8,
    totalDuration: '1h 30m',
    thumbnail: '/writing-test.jpg',
    progress: 0,
    route: '/video-lessons/writing'
  },
  {
    id: 'quantitative-reasoning',
    title: 'Quantitative Reasoning',
    description: 'Build strong foundations in arithmetic, algebra, and quantitative reasoning.',
    videoCount: 15,
    totalDuration: '3h 20m',
    thumbnail: '/quantitative-reasoning.jpg',  
    progress: 60,
    route: '/video-lessons/quantitative-reasoning'
  },
  {
    id: 'abstract-reasoning',
    title: 'Abstract Reasoning',
    description: 'Develop pattern recognition and logical thinking skills for complex problems.',
    videoCount: 10,
    totalDuration: '2h 15m',
    thumbnail: '/abstract-reasoning.jpg',
    progress: 10,
    route: '/video-lessons/abstract-reasoning'
  }
];

const VideoLessons = () => {
  const navigate = useNavigate();

  const handleSubjectClick = (route: string) => {
    navigate(route);
  };

  return (
    <MobileLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Video Lessons</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Comprehensive video tutorials for each section of the GATE exam
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {videoLessonsData.map((subject) => (
              <Card 
                key={subject.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-blue-100"
                onClick={() => handleSubjectClick(subject.route)}
              >
                <div className="relative">
                  <img 
                    src={subject.thumbnail} 
                    alt={subject.title}
                    className="w-full h-32 sm:h-40 object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <PlayCircle size={40} className="text-white" fill="rgba(255,255,255,0.2)" strokeWidth={1.5} />
                  </div>
                  <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {subject.totalDuration}
                  </div>
                </div>
                
                <CardContent className="p-4 sm:p-5">
                  <div className="mb-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {subject.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {subject.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {subject.videoCount} videos
                      </span>
                      <span>{subject.progress}% complete</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-[#009dff] to-[#80dfff] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-[#009dff] hover:bg-[#009dff]/90 text-sm sm:text-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubjectClick(subject.route);
                    }}
                  >
                    {subject.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default VideoLessons;

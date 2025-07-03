
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Heart, 
  BookmarkPlus, 
  ChevronDown, 
  CheckCircle,
  Clock,
  Users,
  Globe
} from 'lucide-react';
import { useVideoProgress } from '@/contexts/VideoProgressContext';

const mathematicsLessons = {
  title: 'Mathematics',
  totalLessons: 15,
  totalDuration: '3h 20m',
  language: 'English',
  learners: 1247,
  lastUpdated: 'December 2024',
  lessons: [
    {
      id: 'math-intro',
      title: 'Introduction to GATE Mathematics',
      duration: '8:45',
      videoUrl: 'https://example.com/video1', // This would be your Vimeo/hosted URL
      description: 'Overview of mathematical concepts tested in GATE'
    },
    {
      id: 'arithmetic-basics',
      title: 'Arithmetic Fundamentals',
      duration: '12:30',
      videoUrl: 'https://example.com/video2',
      description: 'Basic arithmetic operations and problem-solving strategies'
    },
    {
      id: 'percentages',
      title: 'Percentages and Ratios',
      duration: '15:20',
      videoUrl: 'https://example.com/video3',
      description: 'Understanding percentages, ratios, and proportions'
    }
  ]
};

const MathematicsLessons = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const { getVideoProgress, updateVideoProgress, markVideoCompleted } = useVideoProgress();

  const lesson = mathematicsLessons.lessons[currentLesson];

  // Load saved progress when lesson changes
  useEffect(() => {
    const progress = getVideoProgress('mathematics', lesson.id);
    if (progress && videoRef.current) {
      videoRef.current.currentTime = progress.currentTime;
      setCurrentTime(progress.currentTime);
    }
  }, [currentLesson, lesson.id, getVideoProgress]);

  // Save progress periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && isPlaying) {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        
        updateVideoProgress('mathematics', lesson.id, {
          currentTime,
          duration,
          completed: currentTime / duration > 0.9 // Mark as completed if 90% watched
        });

        if (currentTime / duration > 0.9) {
          markVideoCompleted('mathematics', lesson.id);
        }
      }
    }, 5000); // Save every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, lesson.id, updateVideoProgress, markVideoCompleted]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentLesson < mathematicsLessons.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/video-lessons')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mathematics</h1>
              <p className="text-sm text-gray-600">GATE Exam Preparation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <Card className="overflow-hidden">
                <div className="relative bg-black aspect-video">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                    onEnded={() => setIsPlaying(false)}
                  >
                    <source src={lesson.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center gap-4 text-white">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePrevious}
                        disabled={currentLesson === 0}
                        className="text-white hover:bg-white/20"
                      >
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePlayPause}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNext}
                        disabled={currentLesson === mathematicsLessons.lessons.length - 1}
                        className="text-white hover:bg-white/20"
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex-1 mx-4">
                        <div className="text-xs mb-1">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-1">
                          <div 
                            className="bg-[#009dff] h-1 rounded-full transition-all"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Lesson Info */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl font-semibold mb-2">{lesson.title}</h2>
                      <p className="text-gray-600 text-sm">{lesson.description}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Favourite</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <BookmarkPlus className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Watch Later</span>
                      </Button>
                    </div>
                  </div>

                  {/* Transcript Toggle */}
                  <Button
                    variant="ghost"
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="w-full sm:w-auto"
                  >
                    {showTranscript ? 'Hide' : 'Show'} Transcript
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showTranscript ? 'rotate-180' : ''}`} />
                  </Button>

                  {showTranscript && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        Transcript content would go here. This would be the full text of the video lesson...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Course Details */}   
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Total Lessons</div>
                      <div className="font-semibold">{mathematicsLessons.totalLessons}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Duration</div>
                      <div className="font-semibold">{mathematicsLessons.totalDuration}</div>  
                    </div>
                    <div>
                      <div className="text-gray-500">Language</div>
                      <div className="font-semibold flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {mathematicsLessons.language}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Learners</div>
                      <div className="font-semibold flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {mathematicsLessons.learners.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Lesson List */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lessons</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {mathematicsLessons.lessons.map((lessonItem, index) => {
                    const progress = getVideoProgress('mathematics', lessonItem.id);
                    const isCompleted = progress?.completed || false;
                    const isActive = index === currentLesson;
                    
                    return (
                      <div
                        key={lessonItem.id}
                        className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                          isActive ? 'bg-blue-50 border-l-4 border-l-[#009dff]' : ''
                        }`}
                        onClick={() => setCurrentLesson(index)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <div className={`w-5 h-5 rounded-full border-2 ${
                                isActive ? 'border-[#009dff] bg-[#009dff]' : 'border-gray-300'
                              }`}>
                                {isActive && <div className="w-1 h-1 bg-white rounded-full m-1.5" />}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium text-sm mb-1 ${
                              isActive ? 'text-[#009dff]' : 'text-gray-900'
                            }`}>
                              {lessonItem.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {lessonItem.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathematicsLessons;

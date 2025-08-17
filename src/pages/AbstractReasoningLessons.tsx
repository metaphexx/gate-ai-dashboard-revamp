
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import EnhancedVideoPlayer, { VideoPlayerRef } from '@/components/EnhancedVideoPlayer';
import AnalyticsDashboard from '@/components/video/AnalyticsDashboard';
import LessonSearch, { FilterOptions } from '@/components/video/LessonSearch';
import NoteTaking from '@/components/video/NoteTaking';
import AchievementSystem from '@/components/video/AchievementSystem';
import DiscussionSystem from '@/components/video/DiscussionSystem';
import SmartRecommendations from '@/components/video/SmartRecommendations';
import FloatingChatButton from '@/components/chat/FloatingChatButton';
import ChatPanel from '@/components/chat/ChatPanel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  Heart, 
  BookmarkPlus, 
  ChevronDown, 
  CheckCircle,
  Clock,
  Users,
  Globe,
  Play,
  BarChart3,
  MessageSquare,
  Trophy,
  Lightbulb,
  HelpCircle,
  Bot,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { useVideoProgress } from '@/contexts/VideoProgressContext';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const abstractReasoningLessons = {
  title: 'Abstract Reasoning',
  totalLessons: 10,
  totalDuration: '2h 15m',
  language: 'English',
  learners: 934,
  lastUpdated: 'December 2024',
  lessons: [
    {
      id: 'abstract-intro',
      title: 'Introduction to Abstract Reasoning',
      duration: '13:30',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Overview of abstract reasoning concepts and pattern recognition'
    },
    {
      id: 'pattern-recognition',
      title: 'Pattern Recognition Fundamentals',
      duration: '16:45',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      description: 'Learn to identify and analyze various types of patterns'
    },
    {
      id: 'logical-sequences',
      title: 'Logical Sequences and Progressions',
      duration: '14:20',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      description: 'Master sequential reasoning and logical progressions'
    },
    {
      id: 'spatial-reasoning',
      title: 'Spatial Reasoning and Transformations',
      duration: '12:15',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      description: 'Develop skills in spatial visualization and transformations'
    }
  ]
};

const AbstractReasoningLessons = () => {
  const navigate = useNavigate();
  const videoRef = useRef<VideoPlayerRef>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [activeTab, setActiveTab] = useState('lesson');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    completed: true,
    inProgress: true,
    notStarted: true,
    sortBy: 'title',
    sortOrder: 'asc'
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [quizScores, setQuizScores] = useState<number[]>([]);
  const [totalWatchTime, setTotalWatchTime] = useState(0);
  const [notesCount, setNotesCount] = useState(0);
  const [showSmartPrompt, setShowSmartPrompt] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [pauseCount, setPauseCount] = useState(0);
  
  const { getVideoProgress, updateVideoProgress, markVideoCompleted, getLastWatchedVideo } = useVideoProgress();
  const { toast } = useToast();

  const lesson = abstractReasoningLessons.lessons[currentLesson];

  // Load the last watched video on mount
  useEffect(() => {
    const lastWatchedId = getLastWatchedVideo('abstract-reasoning');
    if (lastWatchedId) {
      const lastIndex = abstractReasoningLessons.lessons.findIndex(l => l.id === lastWatchedId);
      if (lastIndex !== -1) {
        setCurrentLesson(lastIndex);
      }
    }
  }, [getLastWatchedVideo]);

  // Smart prompt logic
  useEffect(() => {
    const checkForSmartPrompt = () => {
      const timeSinceLastInteraction = Date.now() - lastInteractionTime;
      
      if (timeSinceLastInteraction > 30000 || pauseCount >= 3) {
        setShowSmartPrompt(true);
      }
    };

    const interval = setInterval(checkForSmartPrompt, 10000);
    return () => clearInterval(interval);
  }, [lastInteractionTime, pauseCount]);

  const activateElliotChat = () => {
    setActiveTab('elliot');
    setShowSmartPrompt(false);
    setTimeout(() => {
      tabsRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const handleVideoTimeUpdate = (currentTime: number, duration: number) => {
    setCurrentTime(currentTime);
    setLastInteractionTime(Date.now());
    updateVideoProgress('abstract-reasoning', lesson.id, {
      currentTime,
      duration,
      completed: currentTime / duration > 0.9
    });

    if (currentTime / duration > 0.9) {
      markVideoCompleted('abstract-reasoning', lesson.id);
    }
  };

  const handleVideoPause = () => {
    setPauseCount(prev => prev + 1);
    setLastInteractionTime(Date.now());
  };

  const handleVideoEnded = () => {
    markVideoCompleted('abstract-reasoning', lesson.id);
    toast({
      title: "Lesson completed!",
      description: `You've finished "${lesson.title}"`,
      action: (
        <Button 
          size="sm" 
          onClick={() => navigate('/abstract-reasoning-prestart')}
        >
          Practice Now
        </Button>
      ),
    });

    setShowSmartPrompt(true);

    if (autoPlayNext && currentLesson < abstractReasoningLessons.lessons.length - 1) {
      setTimeout(() => {
        handleNext();
      }, 2000);
    }
  };

  const handleNext = () => {
    if (currentLesson < abstractReasoningLessons.lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(prev => prev - 1);
    }
  };

  const handleLessonSelect = (index: number) => {
    setCurrentLesson(index);
  };

  const handleAddToFavorites = () => {
    toast({
      title: "Added to Favorites",
      description: `"${lesson.title}" has been added to your favorites`,
    });
  };

  const handleAddToWatchLater = () => {
    toast({
      title: "Added to Watch Later",
      description: `"${lesson.title}" has been added to your watch later list`,
    });
  };

  const getInitialTime = () => {
    const progress = getVideoProgress('abstract-reasoning', lesson.id);
    return progress?.currentTime || 0;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleQuizComplete = (score: number) => {
    setQuizScores([...quizScores, score]);
  };

  // Filter and sort lessons based on search and filters
  const filteredLessons = abstractReasoningLessons.lessons.filter(lessonItem => {
    const progress = getVideoProgress('abstract-reasoning', lessonItem.id);
    const matchesSearch = lessonItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lessonItem.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isCompleted = progress?.completed || false;
    const hasProgress = progress && progress.currentTime > 0;
    const isNotStarted = !progress || progress.currentTime === 0;
    
    const matchesStatus = (
      (filters.completed && isCompleted) ||
      (filters.inProgress && hasProgress && !isCompleted) ||
      (filters.notStarted && isNotStarted)
    );
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    const aProgress = getVideoProgress('abstract-reasoning', a.id);
    const bProgress = getVideoProgress('abstract-reasoning', b.id);
    
    let comparison = 0;
    switch (filters.sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'duration':
        comparison = parseInt(a.duration.split(':')[0]) * 60 + parseInt(a.duration.split(':')[1]) -
                    (parseInt(b.duration.split(':')[0]) * 60 + parseInt(b.duration.split(':')[1]));
        break;
      case 'progress':
        const aPercent = aProgress ? (aProgress.currentTime / aProgress.duration) * 100 : 0;
        const bPercent = bProgress ? (bProgress.currentTime / bProgress.duration) * 100 : 0;
        comparison = aPercent - bPercent;
        break;
    }
    
    return filters.sortOrder === 'asc' ? comparison : -comparison;
  });

  // Analytics data
  const completedLessons = abstractReasoningLessons.lessons.filter(l => {
    const progress = getVideoProgress('abstract-reasoning', l.id);
    return progress?.completed;
  }).length;

  const averageScore = quizScores.length > 0 ? 
    Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;

  const userStats = {
    lessonsCompleted: completedLessons,
    totalWatchTime: totalWatchTime,
    streak: 4,
    averageScore,
    notesCount,
    quizzesTaken: quizScores.length
  };

  const userPerformance = {
    weakAreas: ['Spatial Reasoning', 'Complex Patterns'],
    strongAreas: ['Pattern Recognition', 'Logical Sequences'],
    learningStyle: 'Visual learner with preference for step-by-step pattern analysis'
  };

  const isMobile = useIsMobile();
  
  // Primary tabs for mobile (scrollable)
  const primaryTabs = [
    { id: 'lesson', label: 'Lesson', icon: Play },
    { id: 'notes', label: 'Notes', icon: MessageSquare },
    { id: 'practice', label: 'Practice', icon: Trophy },
    { id: 'elliot', label: 'Ask Elliot', icon: Bot },
  ];

  // Secondary tabs (in overflow menu on mobile)
  const secondaryTabs = [
    { id: 'discussion', label: 'Discussion', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  return (
    <MobileLayout>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
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
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Abstract Reasoning</h1>
              <p className="text-sm text-gray-600">GATE Exam Preparation</p>
            </div>
          </div>

          {/* Smart Prompt */}
          {showSmartPrompt && (
            <Card className="mb-4 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center">
                      <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot" className="w-6 h-6 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900">Need help with this lesson?</h4>
                      <p className="text-sm text-blue-700">
                        {pauseCount >= 3 ? "I noticed you've paused several times. Let me help explain this concept!" : 
                         getVideoProgress('abstract-reasoning', lesson.id)?.completed ? "Great job completing this lesson! Ready for practice recommendations?" :
                         "I'm here to help you understand abstract reasoning concepts better!"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={activateElliotChat} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Ask Elliot
                    </Button>
                    <Button onClick={() => setShowSmartPrompt(false)} variant="ghost" size="sm">
                      ×
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analytics Dashboard */}
          <AnalyticsDashboard
            totalWatchTime={totalWatchTime}
            completedLessons={completedLessons}
            totalLessons={abstractReasoningLessons.lessons.length}
            averageScore={averageScore}
            streak={4}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Enhanced Video Player */}
              <Card className="overflow-hidden">
                <EnhancedVideoPlayer
                  ref={videoRef}
                  src={lesson.videoUrl}
                  onTimeUpdate={handleVideoTimeUpdate}
                  onEnded={handleVideoEnded}
                  onPause={handleVideoPause}
                  initialTime={getInitialTime()}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  hasNext={currentLesson < abstractReasoningLessons.lessons.length - 1}
                  hasPrevious={currentLesson > 0}
                />
              </Card>

              {/* Tabbed Content */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4" ref={tabsRef}>
                {isMobile ? (
                  <div className="flex items-center gap-2 w-full overflow-hidden">
                    {/* Scrollable primary tabs */}
                    <ScrollArea className="flex-1 overflow-hidden">
                      <div className="flex gap-1 pb-2">
                        {primaryTabs.map((tab) => {
                          const Icon = tab.icon;
                          const isActive = activeTab === tab.id;
                          return (
                            <Button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              variant={isActive ? "default" : "outline"}
                              size="sm"
                              className={`min-w-[65px] whitespace-nowrap flex-shrink-0 h-9 px-2 ${
                                isActive 
                                  ? 'bg-[#009dff] hover:bg-[#0080ff] text-white' 
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              <Icon className="w-4 h-4 mr-1" />
                              <span className="text-xs">{tab.label}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </ScrollArea>
                    
                    {/* Overflow menu for secondary tabs */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 w-9 px-0 flex-shrink-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="h-[50vh]">
                        <SheetHeader>
                          <SheetTitle>More Options</SheetTitle>
                        </SheetHeader>
                        <div className="grid grid-cols-1 gap-3 mt-4">
                          {secondaryTabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                              <Button
                                key={tab.id}
                                onClick={() => {
                                  setActiveTab(tab.id);
                                }}
                                variant={activeTab === tab.id ? "default" : "outline"}
                                className="justify-start h-12 text-left"
                              >
                                <Icon className="w-5 h-5 mr-3" />
                                {tab.label}
                              </Button>
                            );
                          })}
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                ) : (
                  <TabsList className="grid w-full grid-cols-7">
                    <TabsTrigger value="lesson">Lesson</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                    <TabsTrigger value="elliot">
                      <Bot className="w-4 h-4 mr-1" />
                      Ask Elliot
                    </TabsTrigger>
                    <TabsTrigger value="discussion">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Discussion
                    </TabsTrigger>
                    <TabsTrigger value="analytics">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="achievements">
                      <Trophy className="w-4 h-4 mr-1" />
                      Achievements
                    </TabsTrigger>
                  </TabsList>
                )}

                <TabsContent value="lesson" className="space-y-4">
                  {/* Lesson Info */}
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h2 className="text-lg sm:text-xl font-semibold mb-2">{lesson.title}</h2>
                          <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {lesson.duration}
                            </span>
                            <span>Lesson {currentLesson + 1} of {abstractReasoningLessons.lessons.length}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleAddToFavorites}
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Favorite</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleAddToWatchLater}
                          >
                            <BookmarkPlus className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Watch Later</span>
                          </Button>
                        </div>
                      </div>

                      {/* Elliot Quick Help Section */}
                      <Card className="mb-4 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center">
                              <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot" className="w-6 h-6 rounded-full" />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-900">Need help with this lesson?</h4>
                              <p className="text-sm text-blue-700">Elliot can explain concepts, provide pattern analysis tips, and answer questions about {lesson.title.toLowerCase()}.</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={activateElliotChat}
                              className="text-blue-700 border-blue-200 hover:bg-blue-100"
                            >
                              <HelpCircle className="w-4 h-4 mr-1" />
                              Explain this concept
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={activateElliotChat}
                              className="text-blue-700 border-blue-200 hover:bg-blue-100"
                            >
                              <Lightbulb className="w-4 h-4 mr-1" />
                              Pattern analysis tips
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={activateElliotChat}
                              className="text-blue-700 border-blue-200 hover:bg-blue-100"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Ask questions
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Auto-play toggle */}
                      <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                        <input 
                          type="checkbox" 
                          id="autoplay" 
                          checked={autoPlayNext}
                          onChange={(e) => setAutoPlayNext(e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="autoplay" className="text-sm text-gray-700">
                          Auto-play next lesson
                        </label>
                      </div>

                      {/* Show Practice Button for completed lessons */}
                      {getVideoProgress('abstract-reasoning', lesson.id)?.completed && (
                        <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-green-900">Lesson Completed!</h4>
                              <p className="text-sm text-green-700">Ready to practice your abstract reasoning skills?</p>
                            </div>
                            <Button 
                              onClick={() => navigate('/abstract-reasoning-prestart')}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Practice Now
                            </Button>
                          </div>
                        </div>
                      )}

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
                            Transcript content would go here. This would be the full text of the video lesson including timestamps and searchable content...
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
                          <div className="font-semibold">{abstractReasoningLessons.totalLessons}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Duration</div>
                          <div className="font-semibold">{abstractReasoningLessons.totalDuration}</div>  
                        </div>
                        <div>
                          <div className="text-gray-500">Language</div>
                          <div className="font-semibold flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {abstractReasoningLessons.language}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Learners</div>
                          <div className="font-semibold flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {abstractReasoningLessons.learners.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes">
                  <NoteTaking videoId={lesson.id} currentTime={currentTime} />
                </TabsContent>

                <TabsContent value="practice">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Play className="w-5 h-5 text-blue-600" />
                        Practice What You've Learned
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">
                        Ready to test your abstract reasoning skills? Take the practice test to apply what you've learned.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          onClick={() => navigate('/abstract-reasoning-prestart')}
                          className="flex-1"
                          size="lg"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Abstract Reasoning Test
                        </Button>
                        
                        <Button 
                          variant="outline"
                          onClick={() => navigate('/practice')}
                          className="flex-1"
                        >
                          View All Tests
                        </Button>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Apply pattern recognition techniques you've learned</li>
                          <li>• Practice with various abstract reasoning questions</li>
                          <li>• Improve your logical thinking and problem-solving</li>
                          <li>• Build confidence for the actual exam</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="elliot">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-[#009dff]" />
                        Chat with Elliot
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="h-96">
                        <ChatPanel 
                          isOpen={true}
                          onClose={() => setActiveTab('lesson')}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="discussion">
                  <DiscussionSystem lessonId={lesson.id} />
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="space-y-4">
                    <SmartRecommendations 
                      currentLessonId={lesson.id}
                      userPerformance={userPerformance}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="achievements">
                  <AchievementSystem stats={userStats} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar - Lesson List */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lessons ({abstractReasoningLessons.lessons.length})</CardTitle>
                  <LessonSearch
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                    searchQuery={searchQuery}
                    filters={filters}
                  />
                </CardHeader>
                <CardContent className="p-0">
                  {filteredLessons.map((lessonItem, index) => {
                    const progress = getVideoProgress('abstract-reasoning', lessonItem.id);
                    const isCompleted = progress?.completed || false;
                    const isActive = index === currentLesson;
                    const watchProgress = progress ? (progress.currentTime / progress.duration) * 100 : 0;
                    
                    return (
                      <div
                        key={lessonItem.id}
                        className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                          isActive ? 'bg-blue-50 border-l-4 border-l-[#009dff]' : ''
                        }`}
                        onClick={() => handleLessonSelect(index)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : isActive ? (
                              <div className="w-5 h-5 rounded-full border-2 border-[#009dff] bg-[#009dff] flex items-center justify-center">
                                <Play className="w-2 h-2 text-white fill-white" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium text-sm mb-1 ${
                              isActive ? 'text-[#009dff]' : 'text-gray-900'
                            }`}>
                              {lessonItem.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <Clock className="w-3 h-3" />
                              {lessonItem.duration}
                            </div>
                            {progress && watchProgress > 0 && !isCompleted && (
                              <div className="w-full bg-gray-200 rounded-full h-1 mb-1">
                                <div 
                                  className="bg-[#009dff] h-1 rounded-full transition-all"
                                  style={{ width: `${Math.min(watchProgress, 100)}%` }}
                                />
                              </div>
                            )}
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

      {/* Sticky Bottom Navigation for Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-30">
          <div className="flex items-center justify-between max-w-sm sm:max-w-lg mx-auto px-2 gap-2">
            <Button
              onClick={handlePrevious}
              disabled={currentLesson === 0}
              variant="outline"
              size="sm"
              className="min-h-[44px] px-3 disabled:opacity-50 flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span className="text-xs">Previous</span>
            </Button>
            
            <div className="text-center px-2 flex-1 min-w-0">
              <div className="text-xs text-gray-600 mb-1">
                Lesson {currentLesson + 1} of {abstractReasoningLessons.lessons.length}
              </div>
              <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-1 mx-auto">
                <div 
                  className="bg-[#009dff] h-1 rounded-full transition-all"
                  style={{ width: `${((currentLesson + 1) / abstractReasoningLessons.lessons.length) * 100}%` }}
                />
              </div>
            </div>
            
            <Button
              onClick={handleNext}
              disabled={currentLesson === abstractReasoningLessons.lessons.length - 1}
              variant="outline"
              size="sm"
              className="min-h-[44px] px-3 disabled:opacity-50 flex-shrink-0"
            >
              <span className="text-xs">Next</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={activateElliotChat} />
    </MobileLayout>
  );
};

export default AbstractReasoningLessons;

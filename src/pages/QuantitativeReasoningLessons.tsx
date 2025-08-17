import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import EnhancedVideoPlayer, { VideoPlayerRef } from '@/components/EnhancedVideoPlayer';
import AnalyticsDashboard from '@/components/video/AnalyticsDashboard';
import LessonSearch, { FilterOptions } from '@/components/video/LessonSearch';
import NoteTaking from '@/components/video/NoteTaking';
import QuizIntegration from '@/components/video/QuizIntegration';
import AchievementSystem from '@/components/video/AchievementSystem';
import DiscussionSystem from '@/components/video/DiscussionSystem';
import SmartRecommendations from '@/components/video/SmartRecommendations';
import FloatingChatButton from '@/components/chat/FloatingChatButton';
import ChatPanel from '@/components/chat/ChatPanel';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
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
  List,
  MoreHorizontal,
  FileText
} from 'lucide-react';
import { useVideoProgress } from '@/contexts/VideoProgressContext';
import { useToast } from '@/hooks/use-toast';

const quantitativeReasoningLessons = {
  title: 'Quantitative Reasoning',
  totalLessons: 15,
  totalDuration: '3h 20m',
  language: 'English',
  learners: 1247,
  lastUpdated: 'December 2024',
  lessons: [
    {
      id: 'math-intro',
      title: 'Introduction to GATE Quantitative Reasoning',
      duration: '8:45',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Overview of quantitative concepts tested in GATE'
    },
    {
      id: 'arithmetic-basics',
      title: 'Arithmetic Fundamentals',
      duration: '12:30',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      description: 'Basic arithmetic operations and problem-solving strategies'
    },
    {
      id: 'percentages',
      title: 'Percentages and Ratios',
      duration: '15:20',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      description: 'Understanding percentages, ratios, and proportions'
    },
    {
      id: 'algebra-basics',
      title: 'Algebraic Expressions',
      duration: '18:45',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      description: 'Working with variables and algebraic expressions'
    }
  ]
};

const QuantitativeReasoningLessons = () => {
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

  const lesson = quantitativeReasoningLessons.lessons[currentLesson];

  // Load the last watched video on mount
  useEffect(() => {
    const lastWatchedId = getLastWatchedVideo('quantitative-reasoning');
    if (lastWatchedId) {
      const lastIndex = quantitativeReasoningLessons.lessons.findIndex(l => l.id === lastWatchedId);
      if (lastIndex !== -1) {
        setCurrentLesson(lastIndex);
      }
    }
  }, [getLastWatchedVideo]);

  // Smart prompt logic
  useEffect(() => {
    const checkForSmartPrompt = () => {
      const timeSinceLastInteraction = Date.now() - lastInteractionTime;
      
      // Show smart prompt if user has been inactive for 30 seconds or paused multiple times
      if (timeSinceLastInteraction > 30000 || pauseCount >= 3) {
        setShowSmartPrompt(true);
      }
    };

    const interval = setInterval(checkForSmartPrompt, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [lastInteractionTime, pauseCount]);

  const activateElliotChat = () => {
    setActiveTab('elliot');
    setShowSmartPrompt(false);
    // Smooth scroll to tabs section
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
    updateVideoProgress('quantitative-reasoning', lesson.id, {
      currentTime,
      duration,
      completed: currentTime / duration > 0.9
    });

    if (currentTime / duration > 0.9) {
      markVideoCompleted('quantitative-reasoning', lesson.id);
    }
  };

  const handleVideoPause = () => {
    setPauseCount(prev => prev + 1);
    setLastInteractionTime(Date.now());
  };

  const handleVideoEnded = () => {
    markVideoCompleted('quantitative-reasoning', lesson.id);
    toast({
      title: "Lesson completed!",
      description: `You've finished "${lesson.title}"`,
      action: (
        <Button 
          size="sm" 
          onClick={() => navigate(`/practice-test/quantitative-reasoning?topic=${getPracticeTopicId(lesson.id)}`)}
        >
          Practice Now
        </Button>
      ),
    });

    // Show smart prompt for practice recommendations
    setShowSmartPrompt(true);

    if (autoPlayNext && currentLesson < quantitativeReasoningLessons.lessons.length - 1) {
      setTimeout(() => {
        handleNext();
      }, 2000);
    }
  };

  const getPracticeTopicId = (lessonId: string): string => {
    const lessonToPracticeMap: { [key: string]: string } = {
      'math-intro': 'problem-solving',
      'arithmetic-basics': 'multiplication-division', 
      'percentages': 'ratios-unit-conversions',
      'algebra-basics': 'algebra'
    };
    return lessonToPracticeMap[lessonId] || 'problem-solving';
  };

  const handleNext = () => {
    if (currentLesson < quantitativeReasoningLessons.lessons.length - 1) {
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
    const progress = getVideoProgress('quantitative-reasoning', lesson.id);
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
  const filteredLessons = quantitativeReasoningLessons.lessons.filter(lessonItem => {
    const progress = getVideoProgress('quantitative-reasoning', lessonItem.id);
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
    const aProgress = getVideoProgress('quantitative-reasoning', a.id);
    const bProgress = getVideoProgress('quantitative-reasoning', b.id);
    
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
  const completedLessons = quantitativeReasoningLessons.lessons.filter(l => {
    const progress = getVideoProgress('quantitative-reasoning', l.id);
    return progress?.completed;
  }).length;

  const averageScore = quizScores.length > 0 ? 
    Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;

  const userStats = {
    lessonsCompleted: completedLessons,
    totalWatchTime: totalWatchTime,
    streak: 4, // Mock data
    averageScore,
    notesCount,
    quizzesTaken: quizScores.length
  };

  const userPerformance = {
    weakAreas: ['Algebraic Expressions', 'Word Problems'],
    strongAreas: ['Percentages', 'Basic Arithmetic'],
    learningStyle: 'Visual learner with preference for step-by-step explanations'
  };

  const isMobile = useIsMobile();
  
  // All tabs for mobile (horizontally scrollable)
  const allTabs = [
    { id: 'lesson', label: 'Lesson', icon: Play },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'elliot', label: 'Ask Elliot', icon: Bot },
    { id: 'practice', label: 'Practice', icon: Trophy },
    { id: 'discussion', label: 'Discussion', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  return (
    <MobileLayout>
      <div className="flex-1 overflow-y-auto">
        <div className={`max-w-7xl mx-auto ${isMobile ? 'p-2' : 'p-4 sm:p-6'}`}>
          {/* Header */}
          <div className={`flex items-center gap-3 ${isMobile ? 'mb-3 px-2' : 'gap-4 mb-6'}`}>
            <Button 
              variant="ghost" 
              size={isMobile ? "sm" : "default"}
              onClick={() => navigate('/video-lessons')}
              className={isMobile ? "h-8 w-8 p-0" : "p-2"}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'}`}>
                Quantitative Reasoning
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">GATE Exam Preparation</p>
            </div>
            
            {/* Lesson Selector for Mobile */}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 px-3">
                    <List className="w-4 h-4 mr-1" />
                    <span className="text-xs">Lessons</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] p-0">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle>Lessons ({quantitativeReasoningLessons.lessons.length})</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-80px)]">
                    <div className="p-2">
                      <LessonSearch
                        onSearch={handleSearch}
                        onFilter={handleFilter}
                        searchQuery={searchQuery}
                        filters={filters}
                      />
                      <div className="mt-4 space-y-1">
                        {filteredLessons.map((lessonItem, index) => {
                          const progress = getVideoProgress('quantitative-reasoning', lessonItem.id);
                          const isCompleted = progress?.completed || false;
                          const isActive = index === currentLesson;
                          const watchProgress = progress ? (progress.currentTime / progress.duration) * 100 : 0;
                          
                          return (
                            <div
                              key={lessonItem.id}
                              className={`p-3 rounded-lg cursor-pointer transition-colors min-h-[64px] ${
                                isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
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
                                  <h4 className={`font-medium text-sm mb-1 line-clamp-2 ${
                                    isActive ? 'text-[#009dff]' : 'text-gray-900'
                                  }`}>
                                    {lessonItem.title}
                                  </h4>
                                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                    <Clock className="w-3 h-3" />
                                    {lessonItem.duration}
                                  </div>
                                  {progress && watchProgress > 0 && !isCompleted && (
                                    <div className="w-full bg-gray-200 rounded-full h-1">
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
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            )}
            
            {/* Elliot Quick Access for Mobile */}
            {isMobile && (
              <Button 
                onClick={activateElliotChat}
                size="sm" 
                className="h-8 px-3 bg-[#009dff] hover:bg-[#0080ff] text-white"
              >
                <Bot className="w-4 h-4 mr-1" />
                <span className="text-xs">Elliot</span>
              </Button>
            )}
          </div>

          {/* Smart Prompt - Enhanced for Mobile */}
          {showSmartPrompt && (
            <Card className={`border-blue-200 bg-blue-50 ${isMobile ? 'mb-2 mx-2' : 'mb-4'}`}>
              <CardContent className={isMobile ? "p-3" : "p-4"}>
                <div className={`flex ${isMobile ? 'flex-col gap-3' : 'items-center justify-between'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center flex-shrink-0">
                      <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot" className="w-9 h-9 rounded-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium text-blue-900 ${isMobile ? 'text-sm' : ''}`}>Need help with this lesson?</h4>
                      <p className={`text-blue-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {pauseCount >= 3 ? "I noticed you've paused several times. Let me help explain this concept!" : 
                         getVideoProgress('quantitative-reasoning', lesson.id)?.completed ? "Great job completing this lesson! Ready for practice recommendations?" :
                         "I'm here to help you understand quantitative reasoning concepts better!"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={activateElliotChat} 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 min-h-[40px] px-4"
                    >
                      Ask Elliot
                    </Button>
                    <Button 
                      onClick={() => setShowSmartPrompt(false)} 
                      variant="ghost" 
                      size="sm"
                      className="min-h-[40px] min-w-[40px] p-0"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analytics Dashboard - Optimized for Mobile */}
          <div className={isMobile ? "px-2" : ""}>
            <AnalyticsDashboard
              totalWatchTime={totalWatchTime}
              completedLessons={completedLessons}
              totalLessons={quantitativeReasoningLessons.lessons.length}
              averageScore={averageScore}
              streak={4}
            />
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${isMobile ? 'px-2' : ''}`}>
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
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
                  hasNext={currentLesson < quantitativeReasoningLessons.lessons.length - 1}
                  hasPrevious={currentLesson > 0}
                />
              </Card>

              {/* Tabbed Content - Enhanced Mobile Navigation */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4" ref={tabsRef}>
                {isMobile || window.innerWidth < 1024 ? (
                  <div className="w-full overflow-hidden">
                    {/* All tabs scrollable horizontally */}
                    <ScrollArea className="w-full">
                      <div className="flex gap-1 pb-2 cursor-grab active:cursor-grabbing" style={{ scrollBehavior: 'smooth' }}>
                        {allTabs.map((tab) => {
                          const Icon = tab.icon;
                          const isActive = activeTab === tab.id;
                          return (
                            <Button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              variant={isActive ? "default" : "outline"}
                              size="sm"
                              className={`min-w-[70px] whitespace-nowrap flex-shrink-0 h-9 px-3 ${
                                isActive 
                                  ? 'bg-[#009dff] hover:bg-[#0080ff] text-white' 
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              <Icon className="w-4 h-4 mr-1.5" />
                              <span className="text-xs">{tab.label}</span>
                            </Button>
                          );
                        })}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
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
                       <div className="mb-4">
                         <div className="mb-4">
                           <h2 className="text-lg sm:text-xl font-semibold mb-2">{lesson.title}</h2>
                           <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                         </div>
                         
                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                           <div className="flex items-center gap-4 text-sm text-gray-500">
                             <span className="flex items-center gap-1">
                               <Clock className="w-4 h-4" />
                               {lesson.duration}
                             </span>
                             <span>Lesson {currentLesson + 1} of {quantitativeReasoningLessons.lessons.length}</span>
                           </div>
                           
                           <div className="flex gap-2 sm:flex-shrink-0">
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
                       </div>

                      {/* Elliot Quick Help Section */}
                      <Card className="mb-4 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardContent className="p-4 md:p-6">
                          <div className="flex items-center gap-3 mb-3 md:mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center flex-shrink-0">
                              <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot" className="w-9 h-9 rounded-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-900 md:text-base">Need help with this lesson?</h4>
                              <p className="text-sm md:text-base text-blue-700">Elliot can explain concepts, provide study tips, and answer questions about {lesson.title.toLowerCase()}.</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 md:gap-3 md:flex-row md:justify-start">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={activateElliotChat}
                              className="text-blue-700 border-blue-200 hover:bg-blue-100 md:px-4 md:py-2"
                            >
                              <HelpCircle className="w-4 h-4 mr-1" />
                              Explain this concept
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={activateElliotChat}
                              className="text-blue-700 border-blue-200 hover:bg-blue-100 md:px-4 md:py-2"
                            >
                              <Lightbulb className="w-4 h-4 mr-1" />
                              Study tips
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={activateElliotChat}
                              className="text-blue-700 border-blue-200 hover:bg-blue-100 md:px-4 md:py-2"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Ask questions
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Auto-play toggle */}
                      <div className="flex items-center gap-3 mb-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                        <input 
                          type="checkbox" 
                          id="autoplay" 
                          checked={autoPlayNext}
                          onChange={(e) => setAutoPlayNext(e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="autoplay" className="text-sm md:text-base text-gray-700">
                          Auto-play next lesson
                        </label>
                      </div>

                      {/* Show Practice Button for completed lessons */}
                      {getVideoProgress('quantitative-reasoning', lesson.id)?.completed && (
                        <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-green-900">Lesson Completed!</h4>
                              <p className="text-sm text-green-700">Ready to practice what you've learned?</p>
                            </div>
                            <Button 
                              onClick={() => navigate(`/practice-test/quantitative-reasoning?topic=${getPracticeTopicId(lesson.id)}`)}
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
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm md:text-base">
                        <div>
                          <div className="text-gray-500">Total Lessons</div>
                          <div className="font-semibold">{quantitativeReasoningLessons.totalLessons}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Duration</div>
                          <div className="font-semibold">{quantitativeReasoningLessons.totalDuration}</div>  
                        </div>
                        <div>
                          <div className="text-gray-500">Language</div>
                          <div className="font-semibold flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {quantitativeReasoningLessons.language}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Learners</div>
                          <div className="font-semibold flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {quantitativeReasoningLessons.learners.toLocaleString()}
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
                  <QuizIntegration lessonId={lesson.id} onQuizComplete={handleQuizComplete} />
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

            {/* Sidebar - Hidden on Mobile (accessible via sheet) */}
            {!isMobile && (
               <div className="space-y-4 md:space-y-2 lg:space-y-4">
                <Card>
                   <CardHeader className="md:pt-3 lg:pt-6">
                    <CardTitle className="text-lg">Lessons ({quantitativeReasoningLessons.lessons.length})</CardTitle>
                    <LessonSearch
                      onSearch={handleSearch}
                      onFilter={handleFilter}
                      searchQuery={searchQuery}
                      filters={filters}
                    />
                  </CardHeader>
                  <CardContent className="p-0">
                    {filteredLessons.map((lessonItem, index) => {
                      const progress = getVideoProgress('quantitative-reasoning', lessonItem.id);
                      const isCompleted = progress?.completed || false;
                      const isActive = index === currentLesson;
                      const watchProgress = progress ? (progress.currentTime / progress.duration) * 100 : 0;
                      
                      return (
                        <div
                          key={lessonItem.id}
                          className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors min-h-[64px] ${
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
            )}
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
                Lesson {currentLesson + 1} of {quantitativeReasoningLessons.lessons.length}
              </div>
              <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-1 mx-auto">
                <div 
                  className="bg-[#009dff] h-1 rounded-full transition-all"
                  style={{ width: `${((currentLesson + 1) / quantitativeReasoningLessons.lessons.length) * 100}%` }}
                />
              </div>
            </div>
            
            <Button
              onClick={handleNext}
              disabled={currentLesson === quantitativeReasoningLessons.lessons.length - 1}
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

      {/* Floating Chat Button - Enhanced positioning for mobile */}
      <FloatingChatButton 
        onClick={activateElliotChat}
      />
    </MobileLayout>
  );
};

export default QuantitativeReasoningLessons;

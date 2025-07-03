import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import EnhancedVideoPlayer, { VideoPlayerRef } from '@/components/EnhancedVideoPlayer';
import AnalyticsDashboard from '@/components/video/AnalyticsDashboard';
import LessonSearch, { FilterOptions } from '@/components/video/LessonSearch';
import NoteTaking from '@/components/video/NoteTaking';
import QuizIntegration from '@/components/video/QuizIntegration';
import AchievementSystem from '@/components/video/AchievementSystem';
import DiscussionSystem from '@/components/video/DiscussionSystem';
import SmartRecommendations from '@/components/video/SmartRecommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Lightbulb
} from 'lucide-react';
import { useVideoProgress } from '@/contexts/VideoProgressContext';
import { useToast } from '@/hooks/use-toast';

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
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Overview of mathematical concepts tested in GATE'
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

const MathematicsLessons = () => {
  const navigate = useNavigate();
  const videoRef = useRef<VideoPlayerRef>(null);
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
  
  const { getVideoProgress, updateVideoProgress, markVideoCompleted, getLastWatchedVideo } = useVideoProgress();
  const { toast } = useToast();

  const lesson = mathematicsLessons.lessons[currentLesson];

  // Load the last watched video on mount
  useEffect(() => {
    const lastWatchedId = getLastWatchedVideo('mathematics');
    if (lastWatchedId) {
      const lastIndex = mathematicsLessons.lessons.findIndex(l => l.id === lastWatchedId);
      if (lastIndex !== -1) {
        setCurrentLesson(lastIndex);
      }
    }
  }, [getLastWatchedVideo]);

  const handleVideoTimeUpdate = (currentTime: number, duration: number) => {
    setCurrentTime(currentTime);
    updateVideoProgress('mathematics', lesson.id, {
      currentTime,
      duration,
      completed: currentTime / duration > 0.9
    });

    if (currentTime / duration > 0.9) {
      markVideoCompleted('mathematics', lesson.id);
    }
  };

  const handleVideoEnded = () => {
    markVideoCompleted('mathematics', lesson.id);
    toast({
      title: "Lesson completed!",
      description: `You've finished "${lesson.title}"`,
    });

    if (autoPlayNext && currentLesson < mathematicsLessons.lessons.length - 1) {
      setTimeout(() => {
        handleNext();
      }, 2000);
    }
  };

  const handleNext = () => {
    if (currentLesson < mathematicsLessons.lessons.length - 1) {
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
    const progress = getVideoProgress('mathematics', lesson.id);
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
  const filteredLessons = mathematicsLessons.lessons.filter(lessonItem => {
    const progress = getVideoProgress('mathematics', lessonItem.id);
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
    const aProgress = getVideoProgress('mathematics', a.id);
    const bProgress = getVideoProgress('mathematics', b.id);
    
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
  const completedLessons = mathematicsLessons.lessons.filter(l => {
    const progress = getVideoProgress('mathematics', l.id);
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

          {/* Analytics Dashboard */}
          <AnalyticsDashboard
            totalWatchTime={totalWatchTime}
            completedLessons={completedLessons}
            totalLessons={mathematicsLessons.lessons.length}
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
                  initialTime={getInitialTime()}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  hasNext={currentLesson < mathematicsLessons.lessons.length - 1}
                  hasPrevious={currentLesson > 0}
                />
              </Card>

              {/* Tabbed Content */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="lesson">Lesson</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
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
                            <span>Lesson {currentLesson + 1} of {mathematicsLessons.lessons.length}</span>
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
                </TabsContent>

                <TabsContent value="notes">
                  <NoteTaking videoId={lesson.id} currentTime={currentTime} />
                </TabsContent>

                <TabsContent value="quiz">
                  <QuizIntegration lessonId={lesson.id} onQuizComplete={handleQuizComplete} />
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
                  <CardTitle className="text-lg">Lessons ({mathematicsLessons.lessons.length})</CardTitle>
                  <LessonSearch
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                    searchQuery={searchQuery}
                    filters={filters}
                  />
                </CardHeader>
                <CardContent className="p-0">
                  {filteredLessons.map((lessonItem, index) => {
                    const progress = getVideoProgress('mathematics', lessonItem.id);
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
                            {/* Progress bar for partially watched videos */}
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
    </div>
  );
};

export default MathematicsLessons;

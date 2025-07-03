
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface VideoProgress {
  videoId: string;
  currentTime: number;
  duration: number;
  completed: boolean;
  lastWatched: Date;
}

interface SubjectProgress {
  [videoId: string]: VideoProgress;
}

interface VideoProgressContextType {
  getVideoProgress: (subjectId: string, videoId: string) => VideoProgress | null;
  updateVideoProgress: (subjectId: string, videoId: string, progress: Partial<VideoProgress>) => void;
  getSubjectProgress: (subjectId: string) => number;
  markVideoCompleted: (subjectId: string, videoId: string) => void;
  getLastWatchedVideo: (subjectId: string) => string | null;
}

const VideoProgressContext = createContext<VideoProgressContextType | undefined>(undefined);

export const VideoProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progressData, setProgressData] = useState<{ [subjectId: string]: SubjectProgress }>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('videoProgress');
    if (savedProgress) {
      try {
        setProgressData(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Error loading video progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('videoProgress', JSON.stringify(progressData));
  }, [progressData]);

  const getVideoProgress = (subjectId: string, videoId: string): VideoProgress | null => {
    return progressData[subjectId]?.[videoId] || null;
  };

  const updateVideoProgress = (subjectId: string, videoId: string, progress: Partial<VideoProgress>) => {
    setProgressData(prev => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        [videoId]: {
          ...prev[subjectId]?.[videoId],
          ...progress,
          videoId,
          lastWatched: new Date()
        } as VideoProgress
      }
    }));
  };

  const getSubjectProgress = (subjectId: string): number => {
    const subjectData = progressData[subjectId];
    if (!subjectData) return 0;
    
    const videos = Object.values(subjectData);
    if (videos.length === 0) return 0;
    
    const completedCount = videos.filter(video => video.completed).length;
    return Math.round((completedCount / videos.length) * 100);
  };

  const markVideoCompleted = (subjectId: string, videoId: string) => {
    updateVideoProgress(subjectId, videoId, { completed: true });
  };

  const getLastWatchedVideo = (subjectId: string): string | null => {
    const subjectData = progressData[subjectId];
    if (!subjectData) return null;
    
    const videos = Object.values(subjectData);
    if (videos.length === 0) return null;
    
    const sortedVideos = videos.sort((a, b) => 
      new Date(b.lastWatched).getTime() - new Date(a.lastWatched).getTime()
    );
    
    return sortedVideos[0]?.videoId || null;
  };

  return (
    <VideoProgressContext.Provider value={{
      getVideoProgress,
      updateVideoProgress,
      getSubjectProgress,
      markVideoCompleted,
      getLastWatchedVideo
    }}>
      {children}
    </VideoProgressContext.Provider>
  );
};

export const useVideoProgress = () => {
  const context = useContext(VideoProgressContext);
  if (context === undefined) {
    throw new Error('useVideoProgress must be used within a VideoProgressProvider');
  }
  return context;
};

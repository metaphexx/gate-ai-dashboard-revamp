
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Clock, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import UserProfileBadge from '@/components/UserProfileBadge';
import FloatingChatButton from '@/components/chat/FloatingChatButton';
import ChatPanel from '@/components/chat/ChatPanel';
import { ChatProvider } from '@/contexts/ChatContext';
import { studyNotesData } from '@/data/studyNotesData';

const StudyNotesTopic = () => {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const subject = studyNotesData.find(s => s.id === subjectId);
  const topic = subject?.topics.find(t => t.id === topicId);

  // Navigation logic for prev/next topics
  const currentTopicIndex = subject?.topics.findIndex(t => t.id === topicId) ?? -1;
  const prevTopic = currentTopicIndex > 0 ? subject?.topics[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex < (subject?.topics.length ?? 0) - 1 ? subject?.topics[currentTopicIndex + 1] : null;

  if (!subject || !topic) {
    return (
      <MobileLayout>
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Topic Not Found</h1>
            <Button onClick={() => navigate(`/study-notes/${subjectId}`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {subject?.title || 'Subject'}
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  // Enhanced content renderer with varied colors
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements = [];
    let currentSection = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('# ')) {
        if (currentSection.length > 0) {
          elements.push(
            <div key={elements.length} className="mb-6">
              {currentSection}
            </div>
          );
          currentSection = [];
        }
        // Main headings in dark blue
        elements.push(
          <div key={elements.length} className="mb-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 mt-6 first:mt-0">
              {line.substring(2)}
            </h2>
          </div>
        );
      } else if (line.startsWith('## ')) {
        if (currentSection.length > 0) {
          elements.push(
            <div key={elements.length} className="mb-4">
              {currentSection}
            </div>
          );
          currentSection = [];
        }
        const headingText = line.substring(3);
        // Key concepts and important sections in purple, others in navy
        const isKeySection = headingText.toLowerCase().includes('key') || 
                           headingText.toLowerCase().includes('important') ||
                           headingText.toLowerCase().includes('strategies') ||
                           headingText.toLowerCase().includes('properties') ||
                           headingText.toLowerCase().includes('characteristics');
        
        elements.push(
          <div key={elements.length} className="mb-4">
            <h3 className={`text-xl font-semibold mb-3 mt-4 ${
              isKeySection ? 'text-purple-600' : 'text-blue-900'
            }`}>
              {headingText}
            </h3>
          </div>
        );
      } else if (line.startsWith('- ')) {
        if (currentSection.length === 0 || !Array.isArray(currentSection[currentSection.length - 1])) {
          currentSection.push([]);
        }
        const lastElement = currentSection[currentSection.length - 1];
        if (Array.isArray(lastElement)) {
          lastElement.push(
            <li key={lastElement.length} className="mb-2">
              <p className="text-gray-700">{line.substring(2)}</p>
            </li>
          );
        }
      } else if (line.startsWith('**') && line.endsWith('**')) {
        // Bold statements - use orange for emphasis
        currentSection.push(
          <div key={currentSection.length} className="mb-4">
            <p className="text-orange-600 font-bold">
              {line.substring(2, line.length - 2)}
            </p>
          </div>
        );
      } else if (line.toLowerCase().includes('answer:') || line.toLowerCase().includes('solution:')) {
        // Answers and solutions in green
        currentSection.push(
          <div key={currentSection.length} className="mb-4">
            <p className="text-green-600 font-semibold">
              {line}
            </p>
          </div>
        );
      } else if (line.toLowerCase().includes('question:') || line.toLowerCase().includes('example')) {
        // Questions and examples in teal
        currentSection.push(
          <div key={currentSection.length} className="mb-4">
            <p className="text-teal-600 font-medium">
              {line}
            </p>
          </div>
        );
      } else if (line) {
        currentSection.push(
          <div key={currentSection.length} className="mb-4">
            <p className="text-gray-700 leading-relaxed">
              {line}
            </p>
          </div>
        );
      }
    }
    
    if (currentSection.length > 0) {
      elements.push(
        <div key={elements.length} className="mb-6">
          {currentSection.map((item, index) => {
            if (Array.isArray(item)) {
              return (
                <ul key={index} className="list-disc list-inside mb-4 space-y-1">
                  {item}
                </ul>
              );
            }
            return item;
          })}
        </div>
      );
    }
    
    return elements;
  };

  return (
    <ChatProvider>
      <MobileLayout>
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    onClick={() => navigate(`/study-notes/${subjectId}`)}
                    className="text-[#009dff] hover:text-blue-400"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to {subject.title}
                  </Button>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{topic.title}</h1>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">{topic.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ~{topic.estimatedTime} min read
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Topic Navigation */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/study-notes/${subjectId}/${prevTopic?.id}`)}
                      disabled={!prevTopic}
                      className="flex items-center gap-1 text-xs sm:text-sm"
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                      {prevTopic ? 'Previous' : 'First Topic'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/study-notes/${subjectId}/${nextTopic?.id}`)}
                      disabled={!nextTopic}
                      className="flex items-center gap-1 text-xs sm:text-sm"
                    >
                      {nextTopic ? 'Next' : 'Last Topic'}
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                  <UserProfileBadge />
                </div>
              </div>
          </div>

          {/* Main Content */}
          <div className="p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    Study Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  <div className="space-y-4">
                    {renderContent(topic.content)}
                  </div>
                  
                    {/* Video Examples Section */}
                    {topic.examples && topic.examples.some(example => example.videoId) && (
                      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                        <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-3 sm:mb-4">Practice Videos</h3>
                        <div className="mb-4">
                          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                              src={`https://www.youtube.com/embed/${topic.examples.find(example => example.videoId)?.videoId}`}
                              title={topic.examples.find(example => example.videoId)?.title}
                              frameBorder="0"
                              allowFullScreen
                              className="absolute top-0 left-0 w-full h-full rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Bottom Navigation */}
                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/study-notes/${subjectId}/${prevTopic?.id}`)}
                          disabled={!prevTopic}
                          className="flex items-center justify-center gap-2 w-full sm:w-auto text-xs sm:text-sm"
                        >
                          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="truncate">
                            {prevTopic ? `Previous: ${prevTopic.title}` : 'First Topic'}
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/study-notes/${subjectId}/${nextTopic?.id}`)}
                          disabled={!nextTopic}
                          className="flex items-center justify-center gap-2 w-full sm:w-auto text-xs sm:text-sm"
                        >
                          <span className="truncate">
                            {nextTopic ? `Next: ${nextTopic.title}` : 'Last Topic'}
                          </span>
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <FloatingChatButton onClick={() => setIsChatOpen(true)} />

        {/* Chat Panel */}
        <ChatPanel 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)}
        />
      </MobileLayout>
    </ChatProvider>
  );
};

export default StudyNotesTopic;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Play, BookOpen } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import UserProfileBadge from '@/components/UserProfileBadge';
import { studyNotesData } from '@/data/studyNotesData';

const StudyNotesTopic = () => {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  const navigate = useNavigate();

  const subject = studyNotesData.find(s => s.id === subjectId);
  const topic = subject?.topics.find(t => t.id === topicId);

  if (!subject || !topic) {
    return (
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Topic Not Found</h1>
            <Button onClick={() => navigate(`/study-notes/${subjectId}`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {subject?.title || 'Subject'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to render markdown-style content
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
        elements.push(
          <h2 key={elements.length} className="text-2xl font-bold text-gray-900 mb-4 mt-8 first:mt-0">
            {line.substring(2)}
          </h2>
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
        elements.push(
          <h3 key={elements.length} className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            {line.substring(3)}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        if (currentSection.length === 0 || !Array.isArray(currentSection[currentSection.length - 1])) {
          currentSection.push([]);
        }
        const lastElement = currentSection[currentSection.length - 1];
        if (Array.isArray(lastElement)) {
          lastElement.push(
            <li key={lastElement.length} className="flex items-start space-x-3 mb-2">
              <span className="flex-shrink-0 w-2 h-2 bg-[#009dff] rounded-full mt-2"></span>
              <p className="text-gray-700 leading-relaxed">{line.substring(2)}</p>
            </li>
          );
        }
      } else if (line.startsWith('**') && line.endsWith('**')) {
        currentSection.push(
          <p key={currentSection.length} className="text-gray-700 leading-relaxed mb-3">
            <strong>{line.substring(2, line.length - 2)}</strong>
          </p>
        );
      } else if (line) {
        currentSection.push(
          <p key={currentSection.length} className="text-gray-700 leading-relaxed mb-3">
            {line}
          </p>
        );
      }
    }
    
    if (currentSection.length > 0) {
      elements.push(
        <div key={elements.length} className="mb-6">
          {currentSection.map((item, index) => {
            if (Array.isArray(item)) {
              return <ul key={index} className="space-y-2 mb-4">{item}</ul>;
            }
            return item;
          })}
        </div>
      );
    }
    
    return elements;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/study-notes/${subjectId}`)}
                className="text-[#009dff] hover:text-blue-400"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {subject.title}
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
                <p className="text-gray-600 mt-1">{topic.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ~{topic.estimatedTime} min read
                  </Badge>
                  <Badge variant="secondary">
                    {topic.examples.length} example{topic.examples.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
            </div>
            <UserProfileBadge />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Topic Content */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Study Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <div className="space-y-4">
                  {renderContent(topic.content)}
                </div>
              </CardContent>
            </Card>

            {/* Examples Section */}
            {topic.examples.length > 0 && (
              <div className="space-y-8">
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Examples</h2>
                </div>
                
                {topic.examples.map((example, index) => (
                  <Card key={example.id} className="mb-8">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{example.title}</CardTitle>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          ~{example.readingTime} min
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Question */}
                      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h3 className="font-semibold text-gray-900 mb-3 text-lg">Question:</h3>
                        <p className="text-gray-800 text-lg leading-relaxed">{example.question}</p>
                      </div>

                      {/* Steps */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-lg">Step-by-Step Solution:</h3>
                        <div className="space-y-4">
                          {example.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                              <span className="flex-shrink-0 w-8 h-8 bg-[#009dff] text-white rounded-full flex items-center justify-center text-sm font-medium">
                                {stepIndex + 1}
                              </span>
                              <p className="text-gray-700 leading-relaxed text-base pt-1">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Answer */}
                      <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h3 className="font-semibold text-gray-900 mb-3 text-lg">Final Answer:</h3>
                        <p className="text-gray-800 font-medium text-lg">{example.answer}</p>
                      </div>

                      {/* Video Embed */}
                      {example.videoId && (
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                            <Play className="w-5 h-5" />
                            Video Tutorial
                          </h3>
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${example.videoId}`}
                              title={`Video tutorial for ${example.title}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg"
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyNotesTopic;

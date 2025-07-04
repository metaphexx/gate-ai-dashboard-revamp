
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
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
                </div>
              </div>
            </div>
            <UserProfileBadge />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
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
                
                {/* Examples Section */}
                {topic.examples && topic.examples.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-purple-600 mb-4">Practice Examples</h3>
                    <div className="space-y-6">
                      {topic.examples.map((example) => (
                        <Card key={example.id} className="bg-gray-50">
                          <CardContent className="p-6">
                            <h4 className="text-lg font-medium text-teal-600 mb-2">{example.title}</h4>
                            <p className="text-teal-700 font-medium mb-4">{example.question}</p>
                            
                            {example.videoId && (
                              <div className="mb-4">
                                <iframe
                                  width="100%"
                                  height="315"
                                  src={`https://www.youtube.com/embed/${example.videoId}`}
                                  title={example.title}
                                  frameBorder="0"
                                  allowFullScreen
                                  className="rounded-lg"
                                />
                              </div>
                            )}
                            
                            <div className="space-y-2">
                              <h5 className="font-medium text-orange-600">Step-by-step solution:</h5>
                              <ol className="list-decimal list-inside space-y-1">
                                {example.steps.map((step, index) => (
                                  <li key={index} className="text-gray-700">{step}</li>
                                ))}
                              </ol>
                            </div>
                            
                            <div className="mt-4 p-3 bg-green-50 rounded-lg">
                              <p className="text-green-700 font-semibold">Final Answer: {example.answer}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyNotesTopic;

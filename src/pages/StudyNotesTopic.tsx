
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

  // Simplified content renderer with clean styling
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
          <div key={elements.length} className="mb-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 mt-6 first:mt-0">
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
        elements.push(
          <div key={elements.length} className="mb-4">
            <h3 className="text-xl font-semibold text-blue-600 mb-3 mt-4">
              {line.substring(3)}
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
        currentSection.push(
          <div key={currentSection.length} className="mb-4">
            <p className="text-gray-800 font-bold">
              {line.substring(2, line.length - 2)}
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

  // Simplified examples rendering integrated into content
  const renderExamples = () => {
    if (topic.examples.length === 0) return null;

    return (
      <div className="mt-8 space-y-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Practice Examples
        </h2>
        
        {topic.examples.map((example, index) => (
          <div key={example.id} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Example {index + 1}: {example.title}
            </h3>

            <div className="mb-4">
              <p className="font-medium text-gray-800 mb-2">Question:</p>
              <p className="text-gray-700 mb-4">{example.question}</p>
            </div>

            <div className="mb-4">
              <p className="font-medium text-gray-800 mb-3">Solution:</p>
              <ol className="list-decimal list-inside space-y-2">
                {example.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-gray-700 leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mb-4">
              <p className="font-medium text-gray-800 mb-2">Answer:</p>
              <p className="text-blue-600 font-semibold">{example.answer}</p>
            </div>

            {example.videoId && (
              <div className="mb-6">
                <p className="font-medium text-gray-800 mb-3">Video Tutorial:</p>
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
          </div>
        ))}
      </div>
    );
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
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  Study Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                {/* Main Content */}
                <div className="space-y-4">
                  {renderContent(topic.content)}
                </div>

                {/* Integrated Examples */}
                {renderExamples()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyNotesTopic;

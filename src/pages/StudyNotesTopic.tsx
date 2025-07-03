
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

  // Enhanced content renderer with color variations and integrated examples
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements = [];
    let currentSection = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('# ')) {
        if (currentSection.length > 0) {
          elements.push(
            <div key={elements.length} className="mb-8">
              {currentSection}
            </div>
          );
          currentSection = [];
        }
        elements.push(
          <div key={elements.length} className="mb-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 mt-8 first:mt-0 border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 rounded-r-lg">
              {line.substring(2)}
            </h2>
          </div>
        );
      } else if (line.startsWith('## ')) {
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
            <h3 className="text-2xl font-semibold text-green-600 mb-4 mt-6 border-l-3 border-green-400 pl-3 bg-green-50 py-2 rounded-r">
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
            <li key={lastElement.length} className="flex items-start space-x-3 mb-3 p-2 hover:bg-orange-50 rounded transition-colors">
              <span className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-2"></span>
              <p className="text-gray-700 leading-relaxed font-medium">{line.substring(2)}</p>
            </li>
          );
        }
      } else if (line.startsWith('**') && line.endsWith('**')) {
        currentSection.push(
          <div key={currentSection.length} className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4 rounded-r">
            <p className="text-gray-800 font-bold text-lg">
              {line.substring(2, line.length - 2)}
            </p>
          </div>
        );
      } else if (line) {
        // Check if it's a key concept or important term
        const isKeyTerm = line.includes('important') || line.includes('key') || line.includes('essential') || line.includes('fundamental');
        const isMathConcept = line.includes('equation') || line.includes('formula') || line.includes('solve') || line.includes('calculate');
        
        let className = "text-gray-700 leading-relaxed mb-4 text-base";
        let bgClass = "";
        
        if (isKeyTerm) {
          bgClass = "bg-purple-50 border-l-2 border-purple-400 pl-4 py-2 rounded-r";
          className = "text-purple-800 leading-relaxed mb-4 text-base font-medium";
        } else if (isMathConcept) {
          bgClass = "bg-indigo-50 border-l-2 border-indigo-400 pl-4 py-2 rounded-r";
          className = "text-indigo-800 leading-relaxed mb-4 text-base font-medium";
        }
        
        currentSection.push(
          <div key={currentSection.length} className={bgClass}>
            <p className={className}>
              {line}
            </p>
          </div>
        );
      }
    }
    
    if (currentSection.length > 0) {
      elements.push(
        <div key={elements.length} className="mb-8">
          {currentSection.map((item, index) => {
            if (Array.isArray(item)) {
              return (
                <div key={index} className="bg-orange-25 p-4 rounded-lg mb-6">
                  <ul className="space-y-1">{item}</ul>
                </div>
              );
            }
            return item;
          })}
        </div>
      );
    }
    
    return elements;
  };

  // Render integrated examples within the content
  const renderIntegratedExamples = () => {
    if (topic.examples.length === 0) return null;

    return (
      <div className="mt-12 border-t-2 border-gradient-to-r from-blue-200 to-green-200 pt-8">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-3">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-lg">📚</span>
            Practice Examples & Step-by-Step Solutions
          </h2>
          <p className="text-blue-600 font-medium">Work through these examples to master the concepts above</p>
        </div>
        
        <div className="space-y-8">
          {topic.examples.map((example, index) => (
            <div key={example.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
              {/* Example Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                    #{index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800">{example.title}</h3>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 font-medium">
                  <Clock className="w-3 h-3 mr-1" />
                  ~{example.readingTime} min
                </Badge>
              </div>

              {/* Question */}
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
                <h4 className="font-bold text-blue-800 mb-3 text-lg flex items-center gap-2">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">?</span>
                  Question:
                </h4>
                <p className="text-blue-900 text-lg leading-relaxed font-medium">{example.question}</p>
              </div>

              {/* Step-by-Step Solution */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm">📝</span>
                  Step-by-Step Solution:
                </h4>
                <div className="space-y-3">
                  {example.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-l-2 border-orange-400">
                      <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                        {stepIndex + 1}
                      </span>
                      <p className="text-gray-800 leading-relaxed text-base pt-1 font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Answer */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg border-l-4 border-green-500 mb-6">
                <h4 className="font-bold text-green-800 mb-3 text-lg flex items-center gap-2">
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">✓</span>
                  Final Answer:
                </h4>
                <p className="text-green-900 font-bold text-xl bg-white p-3 rounded border border-green-200">{example.answer}</p>
              </div>

              {/* Video Tutorial */}
              {example.videoId && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2 text-lg">
                    <Play className="w-5 h-5 bg-purple-600 text-white p-1 rounded-full" />
                    Video Tutorial
                  </h4>
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
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
                  <Badge variant="secondary" className="flex items-center gap-1 bg-blue-100 text-blue-700">
                    <Clock className="w-3 h-3" />
                    ~{topic.estimatedTime} min read
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
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
            
            {/* Single Integrated Study Notes Card */}
            <Card className="shadow-lg border-2 border-gray-100">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  Complete Study Guide
                </CardTitle>
                <p className="text-blue-100 mt-2">Everything you need to master this topic in one place</p>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none p-8">
                {/* Main Content */}
                <div className="space-y-4">
                  {renderContent(topic.content)}
                </div>

                {/* Integrated Examples */}
                {renderIntegratedExamples()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyNotesTopic;

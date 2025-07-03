
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, Clock, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Play, BookOpen, Lightbulb } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import UserProfileBadge from '@/components/UserProfileBadge';
import { studyNotesData, StudyExample } from '@/data/studyNotesData';

const StudyNotesTopic = () => {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  const navigate = useNavigate();
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [openExamples, setOpenExamples] = useState<{ [key: string]: boolean }>({});
  const [openConcepts, setOpenConcepts] = useState<{ [key: string]: boolean }>({});

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

  const toggleExample = (exampleId: string) => {
    setOpenExamples(prev => ({ ...prev, [exampleId]: !prev[exampleId] }));
  };

  const toggleConcept = (conceptIndex: number) => {
    setOpenConcepts(prev => ({ ...prev, [conceptIndex]: !prev[conceptIndex] }));
  };

  const handlePrevious = () => {
    if (currentExampleIndex > 0) {
      setCurrentExampleIndex(currentExampleIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentExampleIndex < topic.examples.length - 1) {
      setCurrentExampleIndex(currentExampleIndex + 1);
    }
  };

  const currentExample = topic.examples[currentExampleIndex];

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
              </div>
            </div>
            <UserProfileBadge />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Topic Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Introduction to {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">{topic.introduction}</p>
              </CardContent>
            </Card>

            {/* Key Concepts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Key Concepts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topic.keyConcepts.map((concept, index) => (
                  <Collapsible 
                    key={index}
                    open={openConcepts[index] || false}
                    onOpenChange={() => toggleConcept(index)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto text-left bg-blue-50 hover:bg-blue-100"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900">{concept.title}</h3>
                        </div>
                        {openConcepts[index] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="bg-white p-4 rounded-lg mt-2 border border-blue-200">
                        <p className="text-gray-700 mb-3 leading-relaxed">{concept.content}</p>
                        {concept.points && (
                          <ul className="space-y-2">
                            {concept.points.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-2 h-2 bg-[#009dff] rounded-full mt-2"></span>
                                <p className="text-gray-600 leading-relaxed">{point}</p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>

            {/* Examples Section Header */}
            {topic.examples.length > 0 && (
              <div className="bg-white border-b border-gray-200 px-6 py-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">
                      Example {currentExampleIndex + 1} of {topic.examples.length}
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      ~{currentExample.readingTime} min read
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      disabled={currentExampleIndex === 0}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNext}
                      disabled={currentExampleIndex === topic.examples.length - 1}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Current Example */}
            {currentExample && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">{currentExample.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Question */}
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Question:</h3>
                    <p className="text-gray-800 text-lg leading-relaxed">{currentExample.question}</p>
                  </div>

                  {/* Steps */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 text-lg">Step-by-Step Solution:</h3>
                    <div className="space-y-4">
                      {currentExample.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <span className="flex-shrink-0 w-8 h-8 bg-[#009dff] text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <p className="text-gray-700 leading-relaxed text-base pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Answer */}
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Final Answer:</h3>
                    <p className="text-gray-800 font-medium text-lg">{currentExample.answer}</p>
                  </div>

                  {/* Video Embed */}
                  {currentExample.videoId && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                        <Play className="w-5 h-5" />
                        Related Video Tutorial
                      </h3>
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${currentExample.videoId}`}
                          title={`Video tutorial for ${currentExample.title}`}
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
            )}

            {/* All Examples Overview */}
            {topic.examples.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">All Examples in {topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topic.examples.map((example, index) => (
                      <Collapsible 
                        key={example.id}
                        open={openExamples[example.id] || false}
                        onOpenChange={() => toggleExample(example.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className={`w-full justify-between p-4 h-auto text-left ${
                              index === currentExampleIndex ? 'bg-blue-50 border border-blue-200' : ''
                            }`}
                          >
                            <div>
                              <p className="font-medium">{example.title}</p>
                              <p className="text-sm text-gray-500">~{example.readingTime} min read</p>
                            </div>
                            {openExamples[example.id] ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{example.question}</p>
                          <Button
                            size="sm"
                            onClick={() => setCurrentExampleIndex(index)}
                            variant={index === currentExampleIndex ? "default" : "outline"}
                          >
                            {index === currentExampleIndex ? "Currently Viewing" : "View Example"}
                          </Button>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Sticky Navigation (Mobile) */}
        {topic.examples.length > 1 && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden z-10">
            <div className="bg-white rounded-full shadow-lg border border-gray-200 flex items-center space-x-2 px-4 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={currentExampleIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium px-2">
                {currentExampleIndex + 1}/{topic.examples.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                disabled={currentExampleIndex === topic.examples.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyNotesTopic;


import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Clock, Target, Shuffle } from 'lucide-react';

const mathSubtopics = [
  {
    id: 'fractions-decimals',
    title: 'Fractions & Decimals',
    description: 'Work with fractions, decimals, and their conversions',
    questions: 10,
    estimatedTime: '8 min',
    difficulty: 'Medium',
  },
  {
    id: 'time',
    title: 'Time',
    description: 'Time calculations, schedules, and duration problems',
    questions: 10,
    estimatedTime: '8 min',
    difficulty: 'Easy',
  },
  {
    id: 'algebra',
    title: 'Algebra',
    description: 'Algebraic expressions, equations, and problem solving',
    questions: 10,
    estimatedTime: '10 min',
    difficulty: 'Hard',
  },
  {
    id: 'geometry',
    title: 'Geometry',
    description: 'Shapes, angles, area, and geometric relationships',
    questions: 10,
    estimatedTime: '8 min',
    difficulty: 'Medium',
  },
  {
    id: 'graph-table-interpretation',
    title: 'Graph & Table Interpretation',
    description: 'Reading and analyzing graphs, charts, and tables',
    questions: 10,
    estimatedTime: '9 min',
    difficulty: 'Medium',
  },
  {
    id: 'multiplication-division',
    title: 'Multiplication & Division',
    description: 'Advanced multiplication and division problems',
    questions: 10,
    estimatedTime: '8 min',
    difficulty: 'Easy',
  },
  {
    id: 'area-perimeter',
    title: 'Area & Perimeter',
    description: 'Calculate area and perimeter of various shapes',
    questions: 10,
    estimatedTime: '8 min',
    difficulty: 'Medium',
  },
  {
    id: 'spatial-reasoning',
    title: 'Spatial Reasoning',
    description: '3D visualization and spatial relationship problems',
    questions: 10,
    estimatedTime: '10 min',
    difficulty: 'Hard',
  },
  {
    id: 'ratios-unit-conversions',
    title: 'Ratios & Unit Conversions',
    description: 'Ratios, proportions, and unit conversion problems',
    questions: 10,
    estimatedTime: '8 min',
    difficulty: 'Medium',
  },
  {
    id: 'probability',
    title: 'Probability',
    description: 'Basic probability and statistical concepts',
    questions: 10,
    estimatedTime: '8 min',
    difficulty: 'Medium',
  },
  {
    id: 'patterns-sequences',
    title: 'Patterns & Sequences',
    description: 'Number patterns, sequences, and series',
    questions: 10,
    estimatedTime: '8 min',
    difficulty: 'Medium',
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    description: 'Word problems and multi-step problem solving',
    questions: 10,
    estimatedTime: '10 min',
    difficulty: 'Hard',
  }
];

const MathematicsPracticeTest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedTopic = searchParams.get('topic');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartTest = (subtopicId: string) => {
    // Navigate to actual practice test with the specific subtopic
    navigate(`/practice-test?subject=mathematics&topic=${subtopicId}`);
  };

  const handleStartRandomMix = () => {
    // Navigate to practice test with random mix parameter
    navigate(`/practice-test?subject=mathematics&topic=random-mix`);
  };

  // If a specific topic is selected (from video lesson), show that topic's test
  if (selectedTopic && selectedTopic !== 'random-mix') {
    const topic = mathSubtopics.find(t => t.id === selectedTopic);
    if (topic) {
      return (
        <div className="flex h-screen overflow-hidden">
          <DashboardSidebar />
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/practice-test/mathematics')}
                  className="p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Practice Test: {topic.title}</h1>
                  <p className="text-gray-600">Test your knowledge on this specific topic</p>
                </div>
              </div>

              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                  <p className="text-gray-600">{topic.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{topic.questions}</div>
                      <div className="text-sm text-gray-500">Questions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{topic.estimatedTime}</div>
                      <div className="text-sm text-gray-500">Est. Time</div>
                    </div>
                    <div>
                      <Badge className={getDifficultyColor(topic.difficulty)}>
                        {topic.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button 
                      size="lg" 
                      onClick={() => handleStartTest(topic.id)}
                      className="w-full sm:w-auto"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Practice Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/practice')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mathematics Practice Tests</h1>
              <p className="text-gray-600">Choose a specific topic to practice - 10 questions each</p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">{mathSubtopics.length}</div>
                    <div className="text-sm text-gray-500">Topics Available</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shuffle className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-sm text-gray-500">Random Mix Option</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">10</div>
                    <div className="text-sm text-gray-500">Questions Each</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Random Mix Card */}
          <div className="mb-6">
            <Card 
              className="overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50"
              onClick={handleStartRandomMix}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 flex items-center gap-2 text-purple-700">
                      <Shuffle className="w-5 h-5" />
                      Random Mix Challenge
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-3">
                      Test your overall math skills with a random selection of questions from all topics
                    </p>
                    <Badge className="bg-purple-100 text-purple-800">
                      Mixed Difficulty
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    10 questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    8-10 min
                  </span>
                </div>
                
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartRandomMix();
                  }}
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Start Random Mix
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mathSubtopics.map((topic) => (
              <Card 
                key={topic.id} 
                className="overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer border-2 border-transparent hover:border-blue-100"
                onClick={() => handleStartTest(topic.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {topic.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                      <Badge className={getDifficultyColor(topic.difficulty)}>
                        {topic.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {topic.questions} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {topic.estimatedTime}
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartTest(topic.id);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathematicsPracticeTest;

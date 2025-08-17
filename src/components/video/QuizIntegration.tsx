
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Play, ArrowRight } from 'lucide-react';

interface QuizIntegrationProps {
  lessonId: string;
  onQuizComplete?: (score: number) => void;
}

const QuizIntegration: React.FC<QuizIntegrationProps> = ({ lessonId }) => {
  const navigate = useNavigate();

  // Map lesson IDs to practice test topics
  const lessonToPracticeMap: { [key: string]: string } = {
    // Quantitative Reasoning lessons
    'math-intro': 'problem-solving',
    'arithmetic-basics': 'multiplication-division', 
    'percentages': 'ratios-unit-conversions',
    'algebra-basics': 'algebra',
    'fractions-decimals': 'fractions-decimals',
    'time': 'time',
    'geometry': 'geometry',
    'graph-interpretation': 'graph-table-interpretation',
    'area-perimeter': 'area-perimeter',
    'spatial-reasoning': 'spatial-reasoning',
    'probability': 'probability',
    'patterns': 'patterns-sequences',
    'problem-solving': 'problem-solving',
    
    // Reading Comprehension lessons
    'reading-fundamentals': 'reading-comprehension',
    'reading-strategies': 'reading-comprehension',
    'critical-analysis': 'reading-comprehension',
    'inference-skills': 'reading-comprehension',
    'vocabulary-context': 'reading-comprehension',
    'text-structure': 'reading-comprehension',
    'main-ideas': 'reading-comprehension',
    'supporting-details': 'reading-comprehension',
    
    // Abstract Reasoning lessons
    'pattern-recognition': 'abstract-reasoning',
    'spatial-visualization': 'abstract-reasoning',
    'logical-sequences': 'abstract-reasoning',
    'analogical-reasoning': 'abstract-reasoning',
    'matrix-reasoning': 'abstract-reasoning',
    'series-completion': 'abstract-reasoning',
    'diagrammatic-reasoning': 'abstract-reasoning',
    'conceptual-reasoning': 'abstract-reasoning',
    
    // Writing lessons
    'essay-structure': 'writing',
    'grammar-mechanics': 'writing',
    'persuasive-writing': 'writing',
    'argumentative-essays': 'writing',
    'descriptive-writing': 'writing',
    'narrative-techniques': 'writing',
    'research-writing': 'writing',
    'editing-revision': 'writing'
  };

  const practiceTopicId = lessonToPracticeMap[lessonId] || 'problem-solving';

  const handleStartPracticeTest = () => {
    // Determine the correct route based on the practice topic
    let route = '/practice-test/mathematics';
    
    if (practiceTopicId === 'reading-comprehension') {
      route = '/reading-comprehension-test';
    } else if (practiceTopicId === 'abstract-reasoning') {
      route = '/abstract-reasoning-test';
    } else if (practiceTopicId === 'writing') {
      route = '/writing-test';
    } else {
      route = `/practice-test/mathematics?topic=${practiceTopicId}`;
    }
    
    navigate(route);
  };

  const handleViewAllTopics = () => {
    // Determine the correct route based on the practice topic
    let route = '/practice-test/mathematics';
    
    if (practiceTopicId === 'reading-comprehension') {
      route = '/reading-comprehension-test';
    } else if (practiceTopicId === 'abstract-reasoning') {
      route = '/abstract-reasoning-test';
    } else if (practiceTopicId === 'writing') {
      route = '/writing-test';
    } else {
      route = '/practice-test/mathematics';
    }
    
    navigate(route);
  };

  return (
    <div className="space-y-4 pb-16 md:pb-0">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Practice What You've Learned
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Ready to test your knowledge? Take a practice test on this specific topic to reinforce what you've learned.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleStartPracticeTest}
              className="flex-1 h-24 sm:h-11 text-base sm:text-sm px-8"
            >
              <Play className="w-4 h-4 mr-2" />
              Practice This Topic
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleViewAllTopics}
              className="flex-1 h-20 sm:h-11 text-base sm:text-sm"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              View All Topics
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-2">
            <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Test your understanding with targeted questions</li>
              <li>• Get instant feedback on your performance</li>
              <li>• Identify areas that need more practice</li>
              <li>• Track your progress across all math topics</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizIntegration;

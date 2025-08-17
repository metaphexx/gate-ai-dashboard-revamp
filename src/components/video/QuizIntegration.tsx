
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
    'problem-solving': 'problem-solving'
  };

  const practiceTopicId = lessonToPracticeMap[lessonId] || 'problem-solving';

  const handleStartPracticeTest = () => {
    navigate(`/practice-test/mathematics?topic=${practiceTopicId}`);
  };

  const handleViewAllTopics = () => {
    navigate('/practice-test/mathematics');
  };

  return (
    <div className="space-y-4 pb-10">
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
              className="flex-1 h-16 sm:h-11 text-base sm:text-sm"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Practice This Topic
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleViewAllTopics}
              className="flex-1 h-16 sm:h-11 text-base sm:text-sm"
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


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText, Sparkles, Play } from 'lucide-react';

interface TestCardProps {
  title: string;
  questions: number;
  duration: number;
  description: string;
  imagePath: string;
  isNew?: boolean;
  hasAI?: boolean;
  customPath?: string;
}

const TestCard: React.FC<TestCardProps> = ({
  title,
  questions,
  duration,
  description,
  imagePath,
  isNew = false,
  hasAI = false,
  customPath
}) => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    if (customPath) {
      navigate(customPath);
    } else {
      // Default navigation logic based on title - navigate to prestart pages
      const path = title.toLowerCase().replace(/\s+/g, '-');
      if (path === 'abstract-reasoning') {
        navigate('/abstract-reasoning-prestart');
      } else if (path === 'writing-test') {
        navigate('/writing-prestart');
      } else if (path === 'reading-comprehension') {
        navigate('/reading-comprehension-prestart');
      } else if (path === 'quantitative-reasoning') {
        navigate('/practice-test?subject=mathematics');
      }
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group w-full">
      <div className="relative">
        <img 
          src={imagePath} 
          alt={title}
          className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {isNew && (
          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
            New
          </Badge>
        )}
        {hasAI && (
          <Badge className="absolute top-2 left-2 bg-purple-500 hover:bg-purple-600 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            {questions} {questions === 1 ? 'question' : 'questions'}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration} min
          </span>
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleStartTest}
        >
          <Play className="w-4 h-4 mr-2" />
          Start Test
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestCard;

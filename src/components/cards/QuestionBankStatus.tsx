
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionType {
  type: string;
  attempted: number;
  total: number;
  avgTime: string;
}

const questions: QuestionType[] = [
  { 
    type: 'Abstract Reasoning', 
    attempted: 42, 
    total: 80, 
    avgTime: '3m 12s' 
  },
  { 
    type: 'Reading Comprehension', 
    attempted: 30, 
    total: 60, 
    avgTime: '4m 45s' 
  },
  { 
    type: 'Writing', 
    attempted: 15, 
    total: 40, 
    avgTime: '5m 20s' 
  },
  { 
    type: 'Quantitative Reasoning', 
    attempted: 50, 
    total: 100, 
    avgTime: '2m 30s' 
  },
];

const QuestionBankStatus = () => {
  const [expanded, setExpanded] = useState(false);
  
  // Only show 2 subjects when collapsed
  const displayedQuestions = expanded ? questions : questions.slice(0, 2);
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Question Bank Status</h3>
        <Button size="sm" variant="outline" className="text-primary">Practice Now</Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3 font-medium">Subject</th>
              <th className="pb-3 font-medium">Progress</th>
              <th className="pb-3 font-medium">Avg Time</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {displayedQuestions.map((q, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="py-3 font-medium">{q.type}</td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(q.attempted / q.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{q.attempted}/{q.total}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-500 flex items-center">
                  <Clock size={14} className="mr-1" />
                  {q.avgTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {questions.length > 2 && (
        <div className="mt-3 text-center">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setExpanded(!expanded)}
            className="text-xs"
          >
            {expanded ? (
              <>Show Less <ChevronUp size={14} className="ml-1" /></>
            ) : (
              <>Show All Subjects <ChevronDown size={14} className="ml-1" /></>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionBankStatus;

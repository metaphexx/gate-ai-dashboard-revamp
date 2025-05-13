
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  AlertTriangle, 
  Clock,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface QuestionType {
  type: string;
  attempted: number;
  total: number;
  avgTime: string;
  accuracy: number;
}

const questions: QuestionType[] = [
  { 
    type: 'Quantitative Reasoning', 
    attempted: 22, 
    total: 38, 
    avgTime: '1:45 min/q',
    accuracy: 77
  },
  { 
    type: 'Abstract Reasoning', 
    attempted: 15, 
    total: 37, 
    avgTime: '2:20 min/q',
    accuracy: 40
  },
  { 
    type: 'Writing', 
    attempted: 18, 
    total: 26, 
    avgTime: '3:10 min/q',
    accuracy: 67
  },
  { 
    type: 'Reading Comprehension', 
    attempted: 20, 
    total: 38, 
    avgTime: '4:15 min/q',
    accuracy: 75
  },
];

const getActionData = (accuracy: number) => {
  if (accuracy >= 70) {
    return {
      text: 'Continue',
      icon: <Check className="text-green-600" size={18} />,
      color: 'text-green-600'
    };
  } else if (accuracy >= 60) {
    return {
      text: 'Practice More',
      icon: <Clock className="text-amber-600" size={18} />,
      color: 'text-amber-600'
    };
  } else {
    return {
      text: 'Needs Review',
      icon: <AlertTriangle className="text-red-600" size={18} />,
      color: 'text-red-600'
    };
  }
};

const QuestionBankStatus = () => {
  const totalQuestions = questions.reduce((sum, q) => sum + q.total, 0);
  
  return (
    <Card className="border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 flex items-center justify-between border-b bg-white">
        <h3 className="text-lg font-semibold">Question Bank Status</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{totalQuestions} total questions</span>
          <Button size="sm" variant="link" className="text-[#009dff] p-0 flex items-center">
            View All <ChevronRight size={16} />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white border-b">
            <TableRow className="border-b">
              <TableHead className="py-3 px-6 text-xs uppercase text-gray-500 font-medium">Subject Area</TableHead>
              <TableHead className="py-3 px-6 text-xs uppercase text-gray-500 font-medium">Attempted</TableHead>
              <TableHead className="py-3 px-6 text-xs uppercase text-gray-500 font-medium">Accuracy</TableHead>
              <TableHead className="py-3 px-6 text-xs uppercase text-gray-500 font-medium">Avg. Time</TableHead>
              <TableHead className="py-3 px-6 text-xs uppercase text-gray-500 font-medium">Suggested Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {questions.map((q, idx) => {
              const actionData = getActionData(q.accuracy);
              return (
                <TableRow key={idx} className="hover:bg-gray-50">
                  <TableCell className="py-4 px-6">
                    <div>
                      <div className="font-medium">{q.type}</div>
                      <div className="text-xs text-gray-500">{q.total} questions</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#009dff] h-2 rounded-full" 
                          style={{ width: `${(q.attempted / q.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{q.attempted}/{q.total}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      q.accuracy >= 70 ? "bg-green-100 text-green-800" : 
                      q.accuracy >= 60 ? "bg-yellow-100 text-yellow-800" : 
                      "bg-red-100 text-red-800"
                    )}>
                      {q.accuracy}%
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-600">{q.avgTime}</TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      {actionData.icon}
                      <span className={actionData.color}>
                        {actionData.text}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default QuestionBankStatus;

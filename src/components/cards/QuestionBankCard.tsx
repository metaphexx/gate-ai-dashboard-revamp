
import React from 'react';

interface QuestionType {
  type: string;
  attempted: number;
  total: number;
  accuracy?: number;
  timeSpent?: string;
}

const questions: QuestionType[] = [
  { 
    type: 'Abstract Reasoning', 
    attempted: 42, 
    total: 80, 
    accuracy: 65, 
    timeSpent: '2h 15m' 
  },
  { 
    type: 'Reading Comprehension', 
    attempted: 30, 
    total: 60, 
    accuracy: 48, 
    timeSpent: '3h 20m' 
  },
  { 
    type: 'Writing', 
    attempted: 15, 
    total: 40, 
    accuracy: 73, 
    timeSpent: '1h 45m' 
  },
  { 
    type: 'Quantitative Reasoning', 
    attempted: 50, 
    total: 100, 
    accuracy: 32, 
    timeSpent: '4h 10m' 
  },
];

const QuestionBankCard = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Question Bank</h3>
        <button className="text-primary hover:text-primary/80 text-sm">Practice Now</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3 font-medium">Question Type</th>
              <th className="pb-3 font-medium">Progress</th>
              <th className="pb-3 font-medium">Accuracy</th>
              <th className="pb-3 font-medium">Time Spent</th>
              <th className="pb-3 font-medium">Suggested Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {questions.map((q, idx) => (
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
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    q.accuracy && q.accuracy >= 70 ? 'bg-green-100 text-green-800' :
                    q.accuracy && q.accuracy >= 40 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {q.accuracy}%
                  </span>
                </td>
                <td className="py-3 text-gray-500">{q.timeSpent}</td>
                <td className="py-3">
                  <span className={`text-xs font-medium ${
                    q.accuracy && q.accuracy >= 70 ? 'text-green-600' :
                    q.accuracy && q.accuracy >= 40 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {q.accuracy && q.accuracy >= 70 ? 'Keep Practicing' :
                     q.accuracy && q.accuracy >= 40 ? 'Needs Review' :
                     'Critical Review'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionBankCard;

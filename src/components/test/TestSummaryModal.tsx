
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Flag, CheckCircle } from 'lucide-react';

interface TestSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  questions: any[];
  answers: (string | null)[];
  flaggedQuestions: boolean[];
}

const TestSummaryModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  questions,
  answers,
  flaggedQuestions
}: TestSummaryModalProps) => {
  const unansweredCount = answers.filter(answer => answer === null).length;
  const flaggedCount = flaggedQuestions.filter(flagged => flagged).length;
  
  const getUnansweredNumbers = () => {
    return answers
      .map((answer, index) => answer === null ? index + 1 : null)
      .filter(num => num !== null);
  };
  
  const getFlaggedNumbers = () => {
    return flaggedQuestions
      .map((flagged, index) => flagged ? index + 1 : null)
      .filter(num => num !== null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="flex items-center text-xl">
          <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
          Test Summary
        </DialogTitle>
        <DialogDescription>
          Please review your test before submitting.
        </DialogDescription>
        
        <div className="py-4">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              {unansweredCount > 0 ? (
                <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
              ) : (
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              )}
              <h3 className="font-medium">Unanswered Questions</h3>
            </div>
            
            {unansweredCount > 0 ? (
              <div>
                <p className="text-yellow-600 mb-1">
                  You have {unansweredCount} unanswered {unansweredCount === 1 ? 'question' : 'questions'}.
                </p>
                <div className="flex flex-wrap gap-2">
                  {getUnansweredNumbers().map(num => (
                    <span key={`unanswered-${num}`} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                      Question {num}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-green-600">All questions have been answered.</p>
            )}
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              {flaggedCount > 0 ? (
                <Flag className="w-5 h-5 mr-2 text-orange-500" />
              ) : (
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              )}
              <h3 className="font-medium">Flagged Questions</h3>
            </div>
            
            {flaggedCount > 0 ? (
              <div>
                <p className="text-orange-600 mb-1">
                  You have {flaggedCount} flagged {flaggedCount === 1 ? 'question' : 'questions'} for review.
                </p>
                <div className="flex flex-wrap gap-2">
                  {getFlaggedNumbers().map(num => (
                    <span key={`flagged-${num}`} className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                      Question {num}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-green-600">No questions have been flagged.</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Return to Test
          </Button>
          <Button 
            onClick={onSubmit}
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
          >
            Submit Anyway
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestSummaryModal;


import React from 'react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/MobileLayout';

const ExamInProgress = () => {
  return (
    <MobileLayout>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="pb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Exam Progress</h1>
          <p className="text-gray-500">Track your current exam sessions</p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/abstract-reasoning.jpg" 
                alt="Exam in progress" 
                className="h-[120px] sm:h-[150px] rounded-lg"
              />
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No pending exam available</h2>
              <p className="text-gray-600">
                Currently, there are no pending exams available at the moment.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                onClick={() => window.location.href = '/'}
              >
                Back To Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ExamInProgress;

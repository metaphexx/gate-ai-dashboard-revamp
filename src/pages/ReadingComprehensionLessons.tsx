
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ReadingComprehensionLessons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/video-lessons')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Reading Comprehension</h1>
              <p className="text-sm text-gray-600">Coming Soon</p>
            </div>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-500">Reading Comprehension lessons will be available soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingComprehensionLessons;


import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, BookOpen } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import UserProfileBadge from '@/components/UserProfileBadge';
import { studyNotesData } from '@/data/studyNotesData';

const StudyNotes = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Study Notes</h1>
            <p className="text-gray-600 mt-1">Comprehensive study materials organized by subject</p>
          </div>
          <UserProfileBadge />
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyNotesData.map((subject) => (
              <Link key={subject.id} to={`/study-notes/${subject.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group h-full">
                  <div className="relative">
                    <img 
                      src={subject.imagePath} 
                      alt={subject.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className={`absolute top-2 right-2 w-3 h-3 ${subject.color} rounded-full`}></div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg group-hover:text-[#009dff] transition-colors">
                      {subject.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">{subject.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {subject.topics.length} {subject.topics.length === 1 ? 'topic' : 'topics'}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {subject.topics.reduce((total, topic) => total + topic.examples.length, 0)} examples
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {Math.round(subject.topics.reduce((total, topic) => total + topic.estimatedTime, 0) / 60)}h study time
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyNotes;

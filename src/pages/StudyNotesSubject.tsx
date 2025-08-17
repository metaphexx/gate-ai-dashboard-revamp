
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Clock, FileText, ChevronRight } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import UserProfileBadge from '@/components/UserProfileBadge';
import { studyNotesData } from '@/data/studyNotesData';

const StudyNotesSubject = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const subject = studyNotesData.find(s => s.id === subjectId);

  if (!subject) {
    return (
      <MobileLayout>
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Subject Not Found</h1>
            <Button onClick={() => navigate('/study-notes')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Study Notes
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  const filteredTopics = subject.topics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MobileLayout>
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/study-notes')}
                className="text-[#009dff] hover:text-blue-400"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Study Notes
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{subject.title}</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">{subject.description}</p>
              </div>
            </div>
            <div className="self-start sm:self-center">
              <UserProfileBadge />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-6 pb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Topics List */}
        <div className="px-4 sm:px-6 pb-6">
          <div className="space-y-4">
            {filteredTopics.map((topic) => (
              <Link key={topic.id} to={`/study-notes/${subjectId}/${topic.id}`}>
                <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#009dff] transition-colors mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {topic.examples.length} examples
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            ~{topic.estimatedTime} min
                          </span>
                        </div>
                      </div>
                      
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#009dff] transition-colors ml-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No topics found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default StudyNotesSubject;

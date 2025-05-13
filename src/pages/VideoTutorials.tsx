
import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Search } from 'lucide-react';

const videoData = [
  {
    id: 1,
    title: "GATE EXAM Sample Quick Walkthrough - Abstract Reasoning - WA 2025",
    category: "GATE Walkthroughs",
    thumbnail: "/abstract-reasoning.jpg",
    duration: "11:03",
    year: "Year 6"
  },
  {
    id: 2,
    title: "GATE EXAM Sample Full Walkthrough - Reading Comprehension - WA 2025",
    category: "GATE Walkthroughs",
    thumbnail: "/reading-comprehension.jpg",
    duration: "34:54",
    year: "Year 5",
    isNew: true
  },
  {
    id: 3,
    title: "GATE EXAM Sample Full Walkthrough - Writing - WA 2025",
    category: "GATE Walkthroughs",
    thumbnail: "/writing-test.jpg",
    duration: "23:26",
    year: "Year 6"
  },
  {
    id: 4,
    title: "GATE EXAM Sample Full Walkthrough - Quantitative Reasoning - WA 2025",
    category: "GATE Walkthroughs",
    thumbnail: "/quantitative-reasoning.jpg",
    duration: "52:53",
    year: "Year 4",
    isPopular: true
  },
  {
    id: 8,
    title: "GATE Exam Tips and Tricks for Year 4 Students",
    category: "Short Lessons",
    thumbnail: "/mock-exam-4.jpg",
    duration: "04:15",
    year: "Year 4"
  }
];

const VideoTutorials = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Updated tabs without ATAR Tips
  const tabs = ["All", "GATE Walkthroughs", "Short Lessons", "Student Picks"];

  // Filter videos based on active tab and search query
  const filteredVideos = videoData.filter(video => {
    const matchesTab = activeTab === "All" || video.category === activeTab;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.year.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Video Tutorials</h1>
              <p className="text-sm text-gray-500 mt-1">Explore walkthroughs, teaching clips, and revision tips.</p>
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search videos..." 
                className="pl-9 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Category Tabs */}
          <div className="flex overflow-x-auto gap-3 mt-4 border-b border-gray-200 pb-2 mb-6">
            {tabs.map(tab => (
              <button 
                key={tab}
                className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${
                  activeTab === tab 
                    ? "text-[#009dff] border-b-2 border-[#009dff]" 
                    : "text-gray-600 hover:text-[#009dff]"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {filteredVideos.map(video => (
              <div key={video.id} className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition border border-gray-100">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full aspect-video object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button className="bg-[#009dff] hover:bg-[#009dff]/90 rounded-full w-12 h-12 p-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </span>
                  {video.isNew && (
                    <span className="absolute top-2 left-2 bg-[#009dff] text-white text-xs px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                  {video.isPopular && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                
                <div className="p-3 space-y-1">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-500">{video.category} | {video.year}</p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No videos found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoTutorials;

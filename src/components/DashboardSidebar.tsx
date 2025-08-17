import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import UpgradeAccountCard from './UpgradeAccountCard';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileCheck, 
  Clock, 
  Settings, 
  HelpCircle,
  User,
  Video,
  MessageCircle,
  NotebookPen
} from 'lucide-react';

interface DashboardSidebarProps {
  isMobile?: boolean;
}

const DashboardSidebar = ({ isMobile = false }: DashboardSidebarProps) => {
  const menuItems = [
    {
      title: "Learn",
      items: [
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
        { name: "Skills Trainer", icon: <BookOpen size={20} />, path: "/skills-trainer" },
        { name: "Practice Test", icon: <FileCheck size={20} />, path: "/practice" },
        { name: "Mini Mock Exam", icon: <FileCheck size={20} />, path: "/mini-mock" },
        { name: "Mock Exam", icon: <FileCheck size={20} />, path: "/mock" },
        { name: "Exam in Progress", icon: <Clock size={20} />, path: "/progress" },
        { name: "Exam History", icon: <Clock size={20} />, path: "/history" },
        { name: "Video Lessons", icon: <Video size={20} />, path: "/video-lessons" },
        { name: "Video Tutorials", icon: <Video size={20} />, path: "/video-tutorials" },
        { name: "Study Notes", icon: <NotebookPen size={20} />, path: "/study-notes" }
      ]
    },
    {
      title: "Help",
      items: [
        { name: "Chat with Elliot", icon: <MessageCircle size={20} />, path: "/chat" },
        { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
        { name: "Support", icon: <HelpCircle size={20} />, path: "/support" }
      ]
    }
  ];

  if (isMobile) {
    return (
      <div className="bg-white flex flex-col h-full">
        {/* Scrollable navigation content */}
        <div className="flex-1 overflow-y-auto p-4">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-8">
              <div className="text-sm font-semibold text-gray-700 px-2 mb-4 uppercase tracking-wide">
                {section.title}
              </div>
              <div className="space-y-2">
                {section.items.map((item, i) => (
                  <Link 
                    key={i} 
                    to={item.path}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group min-h-[48px]"
                  >
                    <span className="text-gray-500 group-hover:text-[#009dff] mr-4 flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-base">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Sticky upgrade card at bottom */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 z-10">
          <UpgradeAccountCard />
        </div>
      </div>
    );
  }

  return (
    <aside className="bg-white border-r border-gray-200 w-64 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Logo />
      </div>
      
      <div className="flex-1 overflow-y-auto pt-2">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            <div className="text-xs font-semibold text-gray-500 px-5 mb-2 uppercase">
              {section.title}
            </div>
            <div className="space-y-1">
              {section.items.map((item, i) => (
                <Link 
                  key={i} 
                  to={item.path}
                  className="flex items-center px-5 py-2 text-gray-700 hover:bg-primary-light hover:text-primary transition-colors group"
                >
                  <span className="text-gray-500 group-hover:text-[#009dff] mr-3">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Sticky upgrade card */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 z-10">
        <UpgradeAccountCard />
      </div>
    </aside>
  );
};

export default DashboardSidebar;

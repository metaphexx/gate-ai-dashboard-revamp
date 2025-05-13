
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
  Video
} from 'lucide-react';

const DashboardSidebar = () => {
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
        { name: "Video Tutorials", icon: <Video size={20} />, path: "/video-tutorials" }
      ]
    },
    {
      title: "Help",
      items: [
        { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
        { name: "Support", icon: <HelpCircle size={20} />, path: "/support" }
      ]
    }
  ];

  return (
    <aside className="bg-white border-r border-gray-200 w-64 h-screen flex flex-col">
      <div className="p-5 border-b border-gray-200">
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
      
      <div className="flex justify-center w-full mt-auto mb-4">
        <UpgradeAccountCard />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 rounded-full p-2">
            <User size={20} className="text-gray-500" />
          </div>
          <div>
            <p className="font-medium text-sm">Hari</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

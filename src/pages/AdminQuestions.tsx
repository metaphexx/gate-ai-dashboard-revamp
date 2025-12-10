import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Eye, 
  Pencil, 
  Trash2, 
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Users,
  Settings,
  Video,
  FileQuestion,
  FileText,
  GraduationCap,
  Package,
  Globe,
  BookOpen,
  Calendar,
  Layers,
  Award,
  Home,
  Menu,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock questions data
const mockQuestionsData = [
  {
    id: 1,
    sno: 1,
    question: "What is the next shape in this sequence?",
    subType: "Pattern Recognition",
    questionTypeName: "Abstract Reasoning",
    prompt: "Identify the pattern",
    instruction: "Select the correct answer",
    explanation: "The shapes follow a rotation pattern",
    sourceType: "Image",
    status: "Active",
    hasImage: true,
    image: "/abstract-reasoning.jpg"
  },
  {
    id: 2,
    sno: 2,
    question: "Calculate the value of x in the equation",
    subType: "Algebra",
    questionTypeName: "Quantitative Reasoning",
    prompt: "Solve for x",
    instruction: "Show your working",
    explanation: "Use algebraic manipulation",
    sourceType: "Text",
    status: "Active",
    hasImage: false
  },
  {
    id: 3,
    sno: 3,
    question: "Which figure completes the analogy?",
    subType: "Analogies",
    questionTypeName: "Abstract Reasoning",
    prompt: "Complete the analogy",
    instruction: "Choose the best match",
    explanation: "The relationship between shapes",
    sourceType: "Image",
    status: "Active",
    hasImage: true,
    image: "/abstract-reasoning.jpg"
  },
  {
    id: 4,
    sno: 4,
    question: "Read the passage and answer the question",
    subType: "Comprehension",
    questionTypeName: "Reading Comprehension",
    prompt: "Based on the passage",
    instruction: "Select the best answer",
    explanation: "Direct inference from text",
    sourceType: "Text",
    status: "Inactive",
    hasImage: false
  },
  {
    id: 5,
    sno: 5,
    question: "Identify the pattern that does not belong",
    subType: "Odd One Out",
    questionTypeName: "Abstract Reasoning",
    prompt: "Find the odd one",
    instruction: "Select the different pattern",
    explanation: "One shape breaks the pattern",
    sourceType: "Image",
    status: "Active",
    hasImage: true,
    image: "/abstract-reasoning.jpg"
  },
];

// Sidebar menu items matching the screenshot
const sidebarMenuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, section: 'LEARN' },
  { 
    id: 'users', 
    name: 'Users', 
    icon: Users, 
    hasSubmenu: true,
    submenu: [
      { id: 'all-users', name: 'All Users' },
      { id: 'user-roles', name: 'User Roles' },
    ]
  },
  { 
    id: 'masters', 
    name: 'Masters', 
    icon: Layers, 
    hasSubmenu: true,
    submenu: [
      { id: 'categories', name: 'Categories' },
      { id: 'subjects', name: 'Subjects' },
    ]
  },
  { id: 'video-upload', name: 'Video Upload', icon: Video },
  { id: 'question-type', name: 'Question Type', icon: FileQuestion },
  { id: 'question-subtype', name: 'Question SubType', icon: FileText },
  { id: 'questions', name: 'Questions', icon: FileQuestion, active: true },
  { id: 'exam-model', name: 'Exam Model', icon: BookOpen },
  { id: 'exam', name: 'Exam', icon: GraduationCap },
  { id: 'practice-exam', name: 'Practice Exam', icon: Award },
  { id: 'courses', name: 'Courses', icon: BookOpen },
  { id: 'package', name: 'Package', icon: Package },
  { id: 'assign-package', name: 'Assign Package', icon: Package },
  { id: 'country', name: 'Country', icon: Globe },
  { id: 'country-year', name: 'Country wise year level', icon: Calendar },
  { id: 'competitive', name: 'Competitive Exams', icon: Award },
  { id: 'template', name: 'Template', icon: FileText },
  { id: 'settings', name: 'Settings', icon: Settings },
];

const AdminQuestions = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeStatus, setActiveStatus] = useState<'Active' | 'Inactive'>('Active');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredQuestions = mockQuestionsData.filter(q => 
    activeStatus === 'Active' ? q.status === 'Active' : q.status === 'Inactive'
  );

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleViewQuestion = (questionId: number) => {
    navigate(`/admin/questions/preview/${questionId}`);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-[#2d4a6f]">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/82f6f431-25e0-4a39-9922-6438ca528afc.png" 
            alt="Everest Tutoring" 
            className="h-10 w-auto"
          />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">LEARN</div>
        {sidebarMenuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => item.hasSubmenu ? toggleSubmenu(item.id) : null}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                item.active 
                  ? 'bg-[#009dff] text-white' 
                  : 'text-gray-300 hover:bg-[#2d4a6f] hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </div>
              {item.hasSubmenu && (
                expandedMenus.includes(item.id) 
                  ? <ChevronDown className="h-4 w-4" />
                  : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {item.hasSubmenu && expandedMenus.includes(item.id) && (
              <div className="bg-[#162d47] py-1">
                {item.submenu?.map((sub) => (
                  <button
                    key={sub.id}
                    className="w-full px-12 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#1e3a5f] text-left"
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-[#1e3a5f] text-white flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-[#1e3a5f] text-white border-none">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-white shadow-sm px-3 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button 
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Home className="h-4 w-4 hidden sm:block" />
            <span className="hidden sm:inline">/</span>
            <span>Questions</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 p-3 md:p-6 overflow-x-hidden">
          <div className="bg-white rounded-lg shadow">
            {/* Title and action buttons */}
            <div className="px-3 md:px-6 py-3 md:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h1 className="text-lg md:text-xl font-semibold text-gray-800">Questions</h1>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <div className="flex rounded-md overflow-hidden border border-gray-300">
                  <button
                    onClick={() => setActiveStatus('Active')}
                    className={`flex-1 px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors ${
                      activeStatus === 'Active'
                        ? 'bg-[#009dff] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    ACTIVE
                  </button>
                  <button
                    onClick={() => setActiveStatus('Inactive')}
                    className={`flex-1 px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors ${
                      activeStatus === 'Inactive'
                        ? 'bg-[#009dff] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    INACTIVE
                  </button>
                </div>
                <Button className="bg-[#009dff] hover:bg-[#008ae6] text-white text-sm">
                  Add new
                </Button>
              </div>
            </div>

            {/* Filters - Responsive grid */}
            <div className="px-3 md:px-6 py-3 md:py-4 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Question Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abstract">Abstract Reasoning</SelectItem>
                  <SelectItem value="quantitative">Quantitative Reasoning</SelectItem>
                  <SelectItem value="reading">Reading Comprehension</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Question SubType" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pattern">Pattern Recognition</SelectItem>
                  <SelectItem value="algebra">Algebra</SelectItem>
                  <SelectItem value="analogies">Analogies</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Year Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year5">Year 5</SelectItem>
                  <SelectItem value="year6">Year 6</SelectItem>
                  <SelectItem value="year7">Year 7</SelectItem>
                </SelectContent>
              </Select>

              <Input placeholder="Question" className="h-10" />
              <Input placeholder="Prompt" className="h-10" />
              <Input placeholder="Instruction" className="h-10" />
            </div>

            {/* Table - with horizontal scroll on mobile */}
            <ScrollArea className="w-full">
              <div className="min-w-[800px]">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-12 md:w-16">S.No</TableHead>
                      <TableHead className="min-w-[150px]">Question</TableHead>
                      <TableHead className="hidden md:table-cell">Sub Type</TableHead>
                      <TableHead>Question Type</TableHead>
                      <TableHead className="hidden lg:table-cell">Prompt</TableHead>
                      <TableHead className="hidden lg:table-cell">Instruction</TableHead>
                      <TableHead className="hidden xl:table-cell">Explanation</TableHead>
                      <TableHead className="hidden md:table-cell">Source</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-24 md:w-32">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuestions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell className="text-xs md:text-sm">{question.sno}</TableCell>
                        <TableCell className="max-w-[120px] md:max-w-[200px] truncate text-xs md:text-sm">{question.question}</TableCell>
                        <TableCell className="hidden md:table-cell text-xs md:text-sm">{question.subType}</TableCell>
                        <TableCell className="text-xs md:text-sm">{question.questionTypeName}</TableCell>
                        <TableCell className="hidden lg:table-cell text-xs md:text-sm">{question.prompt}</TableCell>
                        <TableCell className="hidden lg:table-cell text-xs md:text-sm">{question.instruction}</TableCell>
                        <TableCell className="hidden xl:table-cell max-w-[150px] truncate text-xs md:text-sm">{question.explanation}</TableCell>
                        <TableCell className="hidden md:table-cell text-xs md:text-sm">{question.sourceType}</TableCell>
                        <TableCell>
                          <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium ${
                            question.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {question.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 md:space-x-2">
                            <button
                              onClick={() => handleViewQuestion(question.id)}
                              className="p-1 md:p-1.5 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                              title="View Question"
                            >
                              <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            </button>
                            <button
                              className="p-1 md:p-1.5 rounded bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors"
                              title="Edit Question"
                            >
                              <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            </button>
                            <button
                              className="p-1 md:p-1.5 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                              title="Delete Question"
                            >
                              <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>

            {/* Pagination - Responsive */}
            <div className="px-3 md:px-6 py-3 md:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs md:text-sm text-gray-600">
                Showing 1 to {filteredQuestions.length} of {filteredQuestions.length} entries
              </div>
              <Pagination>
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious href="#" className="h-8 md:h-9 px-2 md:px-3 text-xs md:text-sm" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive className="h-8 w-8 md:h-9 md:w-9 text-xs md:text-sm">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="hidden sm:block">
                    <PaginationLink href="#" className="h-8 w-8 md:h-9 md:w-9 text-xs md:text-sm">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="hidden sm:block">
                    <PaginationLink href="#" className="h-8 w-8 md:h-9 md:w-9 text-xs md:text-sm">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" className="h-8 md:h-9 px-2 md:px-3 text-xs md:text-sm" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminQuestions;

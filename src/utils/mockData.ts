// Mock data generators for admin dashboard

export const generateMockUsers = (count: number = 100) => {
  const users = [];
  const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown', 'Emma Davis'];
  const subjects = ['Writing', 'Abstract Reasoning', 'Reading Comprehension', 'Quantitative Reasoning'];
  
  for (let i = 1; i <= count; i++) {
    users.push({
      id: i,
      name: names[i % names.length],
      email: `user${i}@example.com`,
      registrationDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalTests: Math.floor(Math.random() * 50) + 1,
      averageScore: Math.floor(Math.random() * 40) + 60,
      studyTime: Math.floor(Math.random() * 100) + 10,
      favoriteSubject: subjects[Math.floor(Math.random() * subjects.length)],
      tier: Math.random() > 0.3 ? 'Premium' : 'Free',
      status: Math.random() > 0.1 ? 'Active' : 'Inactive'
    });
  }
  return users;
};

export const generateRealTimeMetrics = () => ({
  onlineUsers: Math.floor(Math.random() * 150) + 50,
  activeTests: Math.floor(Math.random() * 30) + 10,
  systemHealth: Math.random() > 0.1 ? 'Healthy' : 'Warning',
  errorRate: (Math.random() * 2).toFixed(2) + '%',
  responseTime: Math.floor(Math.random() * 100) + 50 + 'ms'
});

export const generateEngagementData = () => {
  const days = 30;
  const data = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    data.push({
      date: date.toISOString().split('T')[0],
      dau: Math.floor(Math.random() * 500) + 200,
      wau: Math.floor(Math.random() * 2000) + 1000,
      mau: Math.floor(Math.random() * 5000) + 3000,
      sessionDuration: Math.floor(Math.random() * 30) + 15,
      testsCompleted: Math.floor(Math.random() * 100) + 50,
      newRegistrations: Math.floor(Math.random() * 50) + 10
    });
  }
  
  return data;
};

export const generateQuestionBankData = () => ([
  {
    id: 1,
    question: "What is the next pattern in the sequence?",
    subject: "Abstract Reasoning",
    difficulty: "Hard",
    correctRate: 35,
    attempts: 1250,
    avgTime: 120,
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    question: "Calculate the compound interest...",
    subject: "Quantitative Reasoning",
    difficulty: "Medium",
    correctRate: 68,
    attempts: 890,
    avgTime: 95,
    lastUpdated: "2024-01-20"
  },
  {
    id: 3,
    question: "Read the passage and answer...",
    subject: "Reading Comprehension",
    difficulty: "Easy",
    correctRate: 82,
    attempts: 1560,
    avgTime: 180,
    lastUpdated: "2024-01-18"
  }
]);

export const generateVideoLessonData = () => ([
  {
    id: 1,
    title: "Introduction to Abstract Patterns",
    subject: "Abstract Reasoning",
    duration: 1200,
    views: 2450,
    completionRate: 78,
    avgWatchTime: 936,
    dropoffPoints: [180, 450, 820],
    rating: 4.6,
    lastUpdated: "2024-01-10"
  },
  {
    id: 2,
    title: "Mathematical Problem Solving",
    subject: "Quantitative Reasoning",
    duration: 1800,
    views: 1890,
    completionRate: 65,
    avgWatchTime: 1170,
    dropoffPoints: [300, 900, 1500],
    rating: 4.3,
    lastUpdated: "2024-01-12"
  }
]);

export const generateExamData = () => {
  const exams = ['Mock Exam 1', 'Mock Exam 2', 'Mini Mock', 'Practice Test'];
  const sections = ['Writing', 'Abstract Reasoning', 'Reading Comprehension', 'Quantitative Reasoning'];
  
  return exams.map((exam, index) => ({
    name: exam,
    attempts: Math.floor(Math.random() * 1000) + 500,
    avgScore: Math.floor(Math.random() * 30) + 65,
    passRate: Math.floor(Math.random() * 40) + 60,
    avgDuration: Math.floor(Math.random() * 60) + 90,
    completionRate: Math.floor(Math.random() * 20) + 75,
    sections: sections.map(section => ({
      name: section,
      avgScore: Math.floor(Math.random() * 40) + 55,
      avgTime: Math.floor(Math.random() * 30) + 20
    }))
  }));
};

export const generateCohortData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return months.map(month => ({
    month,
    newUsers: Math.floor(Math.random() * 200) + 100,
    month1: Math.floor(Math.random() * 30) + 70,
    month3: Math.floor(Math.random() * 20) + 50,
    month6: Math.floor(Math.random() * 15) + 35
  }));
};

export const generateAcquisitionData = () => ([
  { channel: 'Organic Search', users: 1250, cost: 0, conversion: 12.5 },
  { channel: 'Social Media', users: 890, cost: 2500, conversion: 8.9 },
  { channel: 'Referrals', users: 650, cost: 0, conversion: 15.2 },
  { channel: 'Paid Ads', users: 420, cost: 5200, conversion: 6.8 },
  { channel: 'Email Marketing', users: 380, cost: 800, conversion: 18.7 },
  { channel: 'Direct', users: 320, cost: 0, conversion: 22.1 }
]);

export const generateAlerts = () => ([
  {
    id: 1,
    type: 'warning',
    title: 'High Drop-off Rate',
    message: 'Abstract Reasoning Mock Exam has 45% drop-off rate',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    severity: 'medium'
  },
  {
    id: 2,
    type: 'info',
    title: 'Peak Usage Detected',
    message: 'Current online users: 185 (150% above average)',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    severity: 'low'
  },
  {
    id: 3,
    type: 'error',
    title: 'System Performance',
    message: 'Response time increased by 30% in the last hour',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    severity: 'high'
  }
]);

export const generateTutorData = () => ([
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    subject: 'Abstract Reasoning',
    questionsCreated: 245,
    videosCreated: 12,
    studentRating: 4.8,
    responseTime: '2.3 hours',
    activeHours: 35,
    contributions: 89
  },
  {
    id: 2,
    name: 'Prof. Mike Chen',
    subject: 'Quantitative Reasoning',
    questionsCreated: 189,
    videosCreated: 8,
    studentRating: 4.6,
    responseTime: '3.1 hours',
    activeHours: 28,
    contributions: 72
  },
  {
    id: 3,
    name: 'Dr. Emma Davis',
    subject: 'Reading Comprehension',
    questionsCreated: 167,
    videosCreated: 15,
    studentRating: 4.9,
    responseTime: '1.8 hours',
    activeHours: 42,
    contributions: 95
  }
]);

export const generateSystemMetrics = () => ({
  uptime: '99.97%',
  totalUsers: 12547,
  totalTests: 45892,
  totalQuestions: 2847,
  totalVideos: 156,
  storageUsed: '2.4TB',
  bandwidthUsed: '892GB',
  apiCalls: 1547829
});
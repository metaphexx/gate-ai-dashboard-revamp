
export interface StudyExample {
  id: string;
  title: string;
  question: string;
  steps: string[];
  answer: string;
  videoId?: string;
  readingTime: number;
}

export interface StudyTopic {
  id: string;
  title: string;
  description: string;
  examples: StudyExample[];
  estimatedTime: number;
}

export interface StudySubject {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  topics: StudyTopic[];
  color: string;
}

export const studyNotesData: StudySubject[] = [
  {
    id: 'quantitative-reasoning',
    title: 'Quantitative Reasoning',
    description: 'Mathematical concepts, algebra, arithmetic, and problem-solving techniques',
    imagePath: '/quantitative-reasoning.jpg',
    color: 'bg-blue-500',
    topics: [
      {
        id: 'algebra',
        title: 'Algebra',
        description: 'Linear equations, quadratic equations, and algebraic expressions',
        estimatedTime: 45,
        examples: [
          {
            id: 'linear-equations',
            title: 'Solving Linear Equations',
            question: 'Solve for x: 3x + 7 = 22',
            steps: [
              'Start with the equation: 3x + 7 = 22',
              'Subtract 7 from both sides: 3x = 22 - 7',
              'Simplify: 3x = 15',
              'Divide both sides by 3: x = 15 ÷ 3'
            ],
            answer: 'x = 5',
            videoId: 'dQw4w9WgXcQ',
            readingTime: 3
          },
          {
            id: 'quadratic-equations',
            title: 'Quadratic Equations',
            question: 'Solve: x² - 5x + 6 = 0',
            steps: [
              'Identify coefficients: a = 1, b = -5, c = 6',
              'Factor the equation: (x - 2)(x - 3) = 0',
              'Set each factor to zero: x - 2 = 0 or x - 3 = 0',
              'Solve: x = 2 or x = 3'
            ],
            answer: 'x = 2 or x = 3',
            videoId: 'dQw4w9WgXcQ',
            readingTime: 4
          }
        ]
      },
      {
        id: 'arithmetic',
        title: 'Arithmetic',
        description: 'Basic operations, percentages, ratios, and proportions',
        estimatedTime: 30,
        examples: [
          {
            id: 'percentage-calculations',
            title: 'Percentage Calculations',
            question: 'If 25% of a number is 40, what is the number?',
            steps: [
              'Let the unknown number be x',
              'Set up the equation: 25% of x = 40',
              'Convert percentage: 0.25 × x = 40',
              'Solve for x: x = 40 ÷ 0.25'
            ],
            answer: 'The number is 160',
            videoId: 'dQw4w9WgXcQ',
            readingTime: 2
          }
        ]
      }
    ]
  },
  {
    id: 'reading-comprehension',
    title: 'Reading Comprehension',
    description: 'Text analysis, inference, and critical reading strategies',
    imagePath: '/reading-comprehension.jpg',
    color: 'bg-green-500',
    topics: [
      {
        id: 'inference-techniques',
        title: 'Making Inferences',
        description: 'Learn to read between the lines and draw logical conclusions',
        estimatedTime: 25,
        examples: [
          {
            id: 'basic-inference',
            title: 'Basic Inference Skills',
            question: 'What can you infer from this passage?',
            steps: [
              'Read the passage carefully',
              'Identify explicit information',
              'Look for implicit clues',
              'Draw logical conclusions based on evidence'
            ],
            answer: 'Practice with sample passages to develop inference skills',
            videoId: 'dQw4w9WgXcQ',
            readingTime: 5
          }
        ]
      }
    ]
  },
  {
    id: 'abstract-reasoning',
    title: 'Abstract Reasoning',
    description: 'Pattern recognition, logical sequences, and spatial reasoning',
    imagePath: '/abstract-reasoning.jpg',
    color: 'bg-purple-500',
    topics: [
      {
        id: 'pattern-recognition',
        title: 'Pattern Recognition',
        description: 'Identify and predict patterns in sequences and shapes',
        estimatedTime: 35,
        examples: [
          {
            id: 'sequence-patterns',
            title: 'Number Sequences',
            question: 'Find the next number in the sequence: 2, 6, 12, 20, ?',
            steps: [
              'Look at the differences between consecutive terms',
              'Differences: 6-2=4, 12-6=6, 20-12=8',
              'The differences form a pattern: 4, 6, 8 (increasing by 2)',
              'Next difference should be 10, so 20 + 10 = 30'
            ],
            answer: '30',
            videoId: 'dQw4w9WgXcQ',
            readingTime: 3
          }
        ]
      }
    ]
  },
  {
    id: 'writing',
    title: 'Writing Skills',
    description: 'Essay structure, grammar, and effective communication techniques',
    imagePath: '/writing-test.jpg',
    color: 'bg-orange-500',
    topics: [
      {
        id: 'essay-structure',
        title: 'Essay Structure',
        description: 'Learn to organize and structure compelling essays',
        estimatedTime: 40,
        examples: [
          {
            id: 'five-paragraph-essay',
            title: 'Five-Paragraph Essay Structure',
            question: 'How do you structure a five-paragraph essay?',
            steps: [
              'Introduction: Hook, background, thesis statement',
              'Body Paragraph 1: First main point with evidence',
              'Body Paragraph 2: Second main point with evidence',
              'Body Paragraph 3: Third main point with evidence',
              'Conclusion: Restate thesis, summarize points, closing thought'
            ],
            answer: 'A well-structured five-paragraph essay follows the introduction-body-conclusion format with clear transitions',
            videoId: 'dQw4w9WgXcQ',
            readingTime: 6
          }
        ]
      }
    ]
  }
];

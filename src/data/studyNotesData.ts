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
  content: string; // Single content field for all educational material
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
        content: `
# Introduction to Algebra

Algebra is the branch of mathematics that uses letters and symbols to represent numbers and quantities in formulas and equations. It forms the foundation for solving mathematical problems systematically and is essential for understanding relationships between variables.

## Variables and Constants

In algebra, we use letters (usually x, y, z) to represent unknown values called variables. Constants are fixed numbers that do not change their value.

- Variables can represent any number and change in value
- Constants remain the same throughout the equation
- We use variables to create general formulas that work for many situations

## Key Strategies for Linear Equations

A linear equation is an equation where the highest power of the variable is 1. The general form is ax + b = c, where a, b, and c are constants.

**Essential properties of linear equations:**
- Linear equations graph as straight lines
- They have at most one solution
- The solution represents where the line crosses the x-axis
- Use inverse operations to isolate the variable

Example 1: Basic Linear Equation

Question: Solve for x in the equation 2x + 5 = 13

Step-by-step solution:
1. Start with: 2x + 5 = 13
2. Subtract 5 from both sides: 2x = 8
3. Divide both sides by 2: x = 4

Final Answer: x = 4

## Important Characteristics of Quadratic Equations

Quadratic equations contain a variable raised to the power of 2. The standard form is ax² + bx + c = 0, where a ≠ 0.

**Key properties to remember:**
- Quadratic equations can have 0, 1, or 2 real solutions
- They graph as parabolas (U-shaped curves)
- Can be solved by factoring, completing the square, or using the quadratic formula
- The discriminant (b² - 4ac) tells us the number of real solutions

Example 2: Factoring Quadratic Equations

Question: Factor and solve x² - 7x + 12 = 0

Step-by-step approach:
1. Look for two numbers that multiply to 12 and add to -7
2. Those numbers are -3 and -4
3. Factor: (x - 3)(x - 4) = 0
4. Set each factor to zero: x - 3 = 0 or x - 4 = 0

Final Answer: x = 3 or x = 4

## Key Strategies for Success

There are systematic approaches to solving algebraic equations that ensure accuracy and efficiency:

**Essential solving techniques:**
1. Always perform the same operation on both sides of the equation
2. Work in reverse order of operations (PEMDAS backwards)
3. Combine like terms before isolating variables
4. Check your solution by substituting back into the original equation

The key to success in algebra is understanding that equations represent balanced relationships, and whatever you do to one side must be done to the other to maintain that balance.
        `,
        estimatedTime: 45,
        examples: [
          {
            id: 'linear-equations',
            title: 'Solving Linear Equations',
            question: 'Solve for x: 3x + 7 = 22',
            steps: [
              'Start with the equation: 3x + 7 = 22',
              'Our goal is to isolate x by getting it alone on one side',
              'Subtract 7 from both sides to eliminate the constant term: 3x + 7 - 7 = 22 - 7',
              'Simplify: 3x = 15',
              'Divide both sides by 3 to isolate x: 3x ÷ 3 = 15 ÷ 3',
              'Final answer: x = 5',
              'Check: Substitute x = 5 back into original equation: 3(5) + 7 = 15 + 7 = 22 ✓'
            ],
            answer: 'x = 5',
            videoId: 'dQw4w9WgXcQ',
            readingTime: 3
          },
          {
            id: 'quadratic-equations',
            title: 'Solving Quadratic Equations by Factoring',
            question: 'Solve: x² - 5x + 6 = 0',
            steps: [
              'Identify the quadratic equation in standard form: x² - 5x + 6 = 0',
              'Look for two numbers that multiply to give +6 and add to give -5',
              'Those numbers are -2 and -3 because: (-2) × (-3) = 6 and (-2) + (-3) = -5',
              'Factor the equation: (x - 2)(x - 3) = 0',
              'Apply the zero product property: if AB = 0, then A = 0 or B = 0',
              'Set each factor equal to zero: x - 2 = 0 or x - 3 = 0',
              'Solve each equation: x = 2 or x = 3',
              'Check both solutions in the original equation'
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
        content: `
# Introduction to Arithmetic

Arithmetic forms the foundation of all mathematics, dealing with basic operations on numbers. Understanding arithmetic is crucial for developing number sense and solving real-world problems involving calculations, percentages, and proportional relationships.

## Percentage Calculations

Percentages represent parts of a whole expressed as fractions of 100. They are essential for understanding proportions, discounts, interest rates, and statistical data.

Key concepts to remember:
- Percent means "per hundred" - 25% = 25/100 = 0.25
- To find a percentage of a number: multiply the number by the decimal form
- To find what percentage one number is of another: divide and multiply by 100
- Percentage increase/decrease: (new - old)/old × 100

## Ratios and Proportions

Ratios compare quantities, while proportions state that two ratios are equal. These concepts are fundamental in scaling, unit conversions, and solving real-world problems.

Understanding ratios and proportions:
- A ratio compares two or more quantities (e.g., 3:2 or 3/2)
- A proportion states that two ratios are equal (a/b = c/d)
- Cross multiplication: if a/b = c/d, then ad = bc
- Unit rates compare quantities with different units (miles per hour, cost per item)

Mastering these concepts will help you solve many practical problems in daily life, from cooking recipes to financial calculations.
        `,
        estimatedTime: 30,
        examples: [
          {
            id: 'percentage-calculations',
            title: 'Finding the Whole from a Percentage',
            question: 'If 25% of a number is 40, what is the number?',
            steps: [
              'Let the unknown number be x',
              'Translate the problem: "25% of x equals 40"',
              'Set up the equation: 25% × x = 40',
              'Convert percentage to decimal: 0.25 × x = 40',
              'Solve for x by dividing both sides by 0.25: x = 40 ÷ 0.25',
              'Calculate: x = 40 × (1/0.25) = 40 × 4 = 160',
              'Check: 25% of 160 = 0.25 × 160 = 40 ✓'
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
        content: `
# Making Inferences

Inference is the ability to understand information that is not explicitly stated in a text. It involves using context clues, background knowledge, and logical reasoning to draw conclusions about what the author means beyond the literal words on the page.

## Types of Inferences

There are different levels of inference, from simple context clues to complex analytical reasoning:

- **Literal inference**: directly stated information
- **Interpretive inference**: reading between the lines
- **Critical inference**: evaluating and analyzing information
- **Creative inference**: extending ideas beyond the text

## Context Clues

Context clues help us understand unfamiliar words and concepts by examining the surrounding text. These are essential tools for any reader:

- **Definition clues**: the meaning is directly stated
- **Example clues**: examples help clarify meaning
- **Contrast clues**: opposite meanings provide hints
- **Inference clues**: meaning must be reasoned from context

Developing strong inference skills takes practice, but it's one of the most valuable reading comprehension abilities you can develop.
        `,
        estimatedTime: 25,
        examples: [
          {
            id: 'basic-inference',
            title: 'Drawing Conclusions from Context',
            question: 'Read this passage and identify what can be inferred: "Sarah grabbed her umbrella and rain boots before heading out. The weather forecast had been accurate after all."',
            steps: [
              'Read the passage carefully and identify explicit information',
              'Note the key details: umbrella, rain boots, weather forecast was accurate',
              'Consider what these details suggest about conditions',
              'The umbrella and rain boots suggest preparation for wet weather',
              'The phrase "forecast had been accurate" implies it was predicted to rain',
              'Combine these clues to draw a logical conclusion'
            ],
            answer: 'We can infer that it is raining or about to rain, and Sarah prepared appropriately based on an accurate weather forecast.',
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
        content: `
# Pattern Recognition

Pattern recognition is the ability to identify regularities and relationships in data, sequences, or visual information. This skill is fundamental to logical thinking and problem-solving across many disciplines.

## Number Sequences

Number sequences follow specific rules or patterns that can be identified and used to predict future terms:

- **Arithmetic sequences**: constant difference between terms
- **Geometric sequences**: constant ratio between terms
- **Fibonacci sequences**: each term is the sum of the two preceding terms
- Look for differences, ratios, or other mathematical relationships

## Visual Patterns

Visual patterns involve shapes, colors, positions, and transformations that follow logical rules:

- **Rotation**: shapes turning around a central point
- **Reflection**: shapes flipping across an axis
- **Translation**: shapes moving position without changing orientation
- **Scaling**: shapes changing size while maintaining proportions

The key to success in pattern recognition is systematic analysis and careful observation of relationships between elements.
        `,
        estimatedTime: 35,
        examples: [
          {
            id: 'sequence-patterns',
            title: 'Analyzing Number Sequences',
            question: 'Find the next number in the sequence: 2, 6, 12, 20, ?',
            steps: [
              'First, look at the given sequence: 2, 6, 12, 20, ?',
              'Calculate the differences between consecutive terms:',
              '6 - 2 = 4, 12 - 6 = 6, 20 - 12 = 8',
              'The first differences are: 4, 6, 8',
              'Notice that these differences form their own pattern: they increase by 2 each time',
              'The next difference should be: 8 + 2 = 10',
              'Therefore, the next term is: 20 + 10 = 30',
              'Verify the pattern: 2, 6(+4), 12(+6), 20(+8), 30(+10)'
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
        content: `
# Essay Structure

Effective essay writing requires clear organization, logical flow, and persuasive argumentation. A well-structured essay guides readers through your ideas systematically and convincingly.

## The Five-Paragraph Essay

The five-paragraph essay is a fundamental structure that provides a clear framework for organizing ideas and arguments:

- **Introduction**: Hook, background information, and thesis statement
- **Body paragraphs**: Each focuses on one main point with evidence
- **Conclusion**: Restates thesis and summarizes key arguments
- **Transitions**: Connect ideas between and within paragraphs

## Thesis Development

A strong thesis statement is the backbone of any effective essay, providing focus and direction for your argument:

- Make a clear, specific claim that can be supported with evidence
- Position it at the end of your introduction paragraph
- Ensure it addresses the prompt or question directly
- Preview the main points you will discuss in the body

## Evidence and Support

Strong essays use various types of evidence to support their claims and convince readers:

- **Facts, statistics, and data** provide concrete support
- **Expert opinions and quotations** add authority
- **Examples and anecdotes** make abstract concepts concrete
- Always explain how evidence supports your argument

Remember: the goal is to create a logical, compelling argument that guides your reader from introduction to conclusion.
        `,
        estimatedTime: 40,
        examples: [
          {
            id: 'five-paragraph-essay',
            title: 'Structuring a Five-Paragraph Essay',
            question: 'How do you organize a five-paragraph essay about the benefits of reading?',
            steps: [
              'Introduction Paragraph: Start with a hook about reading\'s impact on society',
              'Provide background: briefly mention different types of reading benefits',
              'End with thesis: "Reading regularly provides cognitive, emotional, and social benefits that enhance quality of life"',
              'Body Paragraph 1: Focus on cognitive benefits (improved memory, critical thinking)',
              'Body Paragraph 2: Discuss emotional benefits (stress reduction, empathy development)',
              'Body Paragraph 3: Explore social benefits (cultural understanding, communication skills)',
              'Conclusion: Restate thesis in new words, summarize main points, end with call to action'
            ],
            answer: 'A well-structured five-paragraph essay follows the introduction-body-conclusion format with clear transitions and focused paragraphs that support the central thesis.',
            videoId: 'dQw4w9WgXcQ',
            readingTime: 6
          }
        ]
      }
    ]
  }
];

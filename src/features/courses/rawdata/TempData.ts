interface ContentItem {
  label: string;
  timer: string;
}

interface DataItem {
  title: string;
  content: ContentItem[];
}

export const datas: DataItem[] = [
  {
    title: 'Welcome to JavaScript',
    content: [
      { label: 'Welcome to the course', timer: '21:32' },
      { label: 'What is JavaScript?', timer: '51:33' },
      { label: 'Setting up the environment', timer: '11:26' },
      { label: 'Your first JavaScript code', timer: '55:32' },
      { label: 'Data types in JavaScript', timer: '57:15' },
      { label: "Let's practice", timer: '25:10' },
    ],
  },
  {
    title: 'JavaScript Fundamentals Part 1',
    content: [
      { label: 'Variables and data types', timer: '01:32' },
      { label: 'Operators', timer: '01:32' },
      { label: 'Operator precedence', timer: '01:32' },
      { label: 'Strings and template literals', timer: '01:32' },
      { label: 'Taking decisions: if/else statements', timer: '01:32' },
      { label: 'Type conversion and coercion', timer: '01:32' },
      { label: 'Truthy and falsy values', timer: '01:32' },
    ],
  },
  {
    title: 'JavaScript Fundamentals Part 2',
    content: [
      { label: 'Equality operators: == vs. ===', timer: '01:32' },
      { label: 'Logical operators', timer: '01:32' },
      { label: 'The switch statement', timer: '01:32' },
      { label: 'Statements and expressions', timer: '01:32' },
      { label: 'The conditional (ternary) operator', timer: '01:32' },
      { label: 'Coding challenge #1', timer: '01:32' },
    ],
  },
  {
    title: 'Functions',
    content: [
      { label: 'Functions', timer: '01:32' },
      { label: 'Function declarations vs. expressions', timer: '01:32' },
      { label: 'Arrow functions', timer: '01:32' },
      { label: 'Functions calling other functions', timer: '01:32' },
      { label: 'Reviewing functions', timer: '01:32' },
      { label: 'Introduction to arrays', timer: '01:32' },
      { label: 'Objects', timer: '01:32' },
    ],
  },
  {
    title: 'Data Structures',
    content: [
      { label: 'Arrays', timer: '01:32' },
      { label: 'Introduction to arrays', timer: '01:32' },
      { label: 'Basic array operations (methods)', timer: '01:32' },
      { label: 'Introduction to objects', timer: '01:32' },
      { label: 'Dot vs. bracket notation', timer: '01:32' },
      { label: 'Object methods', timer: '01:32' },
      { label: 'Iteration: the for loop', timer: '01:32' },
    ],
  },
  {
    title: 'A Closer Look at Functions',
    content: [
      { label: 'Functions', timer: '01:32' },
      { label: 'Function declarations vs. expressions', timer: '01:32' },
      { label: 'Arrow functions', timer: '01:32' },
      { label: 'Functions calling other functions', timer: '01:32' },
      { label: 'Reviewing functions', timer: '01:32' },
      { label: 'Introduction to arrays', timer: '01:32' },
      { label: 'Objects', timer: '01:32' },
    ],
  },
  {
    title: 'Working with Arrays',
    content: [
      { label: 'Arrays', timer: '01:32' },
      { label: 'Introduction to arrays', timer: '01:32' },
      { label: 'Basic array operations (methods)', timer: '01:32' },
      { label: 'Introduction to objects', timer: '01:32' },
      { label: 'Dot vs. bracket notation', timer: '01:32' },
      { label: 'Object methods', timer: '01:32' },
      { label: 'Iteration: the for loop', timer: '01:32' },
    ],
  },
  {
    title: 'Objects',
    content: [
      { label: 'Objects', timer: '01:32' },
      { label: 'Introduction to arrays', timer: '01:32' },
      { label: 'Basic array operations (methods)', timer: '01:32' },
      { label: 'Introduction to objects', timer: '01:32' },
      { label: 'Dot vs. bracket notation', timer: '01:32' },
      { label: 'Object methods', timer: '01:32' },
      { label: 'Iteration: the for loop', timer: '01:32' },
    ],
  },
  {
    title: "Completing the 'Guess My Number' Project",
    content: [
      { label: 'Project: "Guess My Number!"', timer: '01:32' },
      { label: 'Selecting elements', timer: '01:32' },
      { label: 'Manipulating styles', timer: '01:32' },
      { label: 'Implementing game logic', timer: '01:32' },
      { label: 'Handling click events', timer: '01:32' },
      { label: 'Implementing high scores', timer: '01:32' },
      { label: 'Refactoring the code', timer: '01:32' },
      { label: 'Coding challenge #2', timer: '01:32' },
    ],
  },
  {
    title: 'End of the Course',
    content: [
      { label: 'Congratulations on finishing the course!', timer: '01:32' },
      { label: 'Join our community', timer: '01:32' },
      { label: 'What to do next?', timer: '01:32' },
      { label: 'Bonus: my personal tips on learning to code', timer: '01:32' },
    ],
  },
];

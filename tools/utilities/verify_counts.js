// Verify getAllPracticeProblems totals
const fs = require('fs');
const content = fs.readFileSync('src/services/progressService.js', 'utf8');

// Extract getAllPracticeProblems
const problemsMatch = content.match(/export const getAllPracticeProblems[\s\S]*?return \{([\s\S]*?)\n {2}\}/);
const problemEntries = [...problemsMatch[1].matchAll(/'([^']+)':\s*(\d+)/g)];

const algorithmTopics = [
  'Advanced Graphs', 'Arrays', 'Backtracking', 'Binary Search',
  'Binary Search Trees', 'Binary Trees', 'Bit Manipulation',
  'Dynamic Programming', 'Famous Algorithms', 'Graphs',
  'Greedy Algorithms', 'Hash Tables', 'Heaps', 'Intervals',
  'Linked Lists', 'Math & Geometry', 'Queues', 'Recursion',
  'Searching', 'Sliding Window', 'Sorting', 'Stacks',
  'Strings', 'Trees', 'Trie', 'Two Pointers', 'Union Find'
];

let total = 0;
console.log('Algorithm Topics in getAllPracticeProblems():');
algorithmTopics.forEach(topic => {
  const entry = problemEntries.find(([_, name]) => name === topic);
  const count = entry ? parseInt(entry[2]) : 0;
  if (entry) {
    console.log(`  ${topic}: ${count}`);
    total += count;
  } else {
    console.log(`  ❌ ${topic}: NOT FOUND`);
  }
});
console.log(`\nTotal: ${total}`);

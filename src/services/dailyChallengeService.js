// Daily Challenge Service - Pick a random problem each day

const DAILY_CHALLENGE_KEY = 'daily_challenge';

// List of problems available for daily challenge
// Format: { id, title, difficulty, category, page }
const CHALLENGE_PROBLEMS = [
  // Arrays
  { id: 'arrays-1', title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', page: 'arrays' },
  { id: 'arrays-2', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', category: 'Arrays', page: 'arrays' },
  { id: 'arrays-3', title: 'Contains Duplicate', difficulty: 'Easy', category: 'Arrays', page: 'arrays' },
  { id: 'arrays-4', title: 'Product of Array Except Self', difficulty: 'Medium', category: 'Arrays', page: 'arrays' },
  { id: 'arrays-5', title: 'Maximum Subarray', difficulty: 'Medium', category: 'Arrays', page: 'arrays' },

  // Strings
  { id: 'strings-1', title: 'Valid Anagram', difficulty: 'Easy', category: 'Strings', page: 'strings' },
  { id: 'strings-2', title: 'Valid Palindrome', difficulty: 'Easy', category: 'Strings', page: 'strings' },
  { id: 'strings-3', title: 'Longest Substring Without Repeating', difficulty: 'Medium', category: 'Strings', page: 'strings' },
  { id: 'strings-4', title: 'Longest Palindromic Substring', difficulty: 'Medium', category: 'Strings', page: 'strings' },

  // Binary Search
  { id: 'binary-search-1', title: 'Binary Search', difficulty: 'Easy', category: 'Binary Search', page: 'binary-search' },
  { id: 'binary-search-2', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', category: 'Binary Search', page: 'binary-search' },
  { id: 'binary-search-3', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', category: 'Binary Search', page: 'binary-search' },

  // Linked Lists
  { id: 'linked-lists-1', title: 'Reverse Linked List', difficulty: 'Easy', category: 'Linked Lists', page: 'linked-lists' },
  { id: 'linked-lists-2', title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked Lists', page: 'linked-lists' },
  { id: 'linked-lists-3', title: 'Linked List Cycle', difficulty: 'Easy', category: 'Linked Lists', page: 'linked-lists' },
  { id: 'linked-lists-4', title: 'Remove Nth Node From End', difficulty: 'Medium', category: 'Linked Lists', page: 'linked-lists' },

  // Trees
  { id: 'trees-1', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', category: 'Trees', page: 'trees' },
  { id: 'trees-2', title: 'Invert Binary Tree', difficulty: 'Easy', category: 'Trees', page: 'trees' },
  { id: 'trees-3', title: 'Validate Binary Search Tree', difficulty: 'Medium', category: 'Trees', page: 'binary-trees' },
  { id: 'trees-4', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Trees', page: 'binary-trees' },

  // Dynamic Programming
  { id: 'dp-1', title: 'Climbing Stairs', difficulty: 'Easy', category: 'Dynamic Programming', page: 'dynamic-programming' },
  { id: 'dp-2', title: 'Coin Change', difficulty: 'Medium', category: 'Dynamic Programming', page: 'dynamic-programming' },
  { id: 'dp-3', title: 'Longest Increasing Subsequence', difficulty: 'Medium', category: 'Dynamic Programming', page: 'dynamic-programming' },
  { id: 'dp-4', title: 'House Robber', difficulty: 'Medium', category: 'Dynamic Programming', page: 'dynamic-programming' },

  // Graphs
  { id: 'graphs-1', title: 'Number of Islands', difficulty: 'Medium', category: 'Graphs', page: 'graphs' },
  { id: 'graphs-2', title: 'Clone Graph', difficulty: 'Medium', category: 'Graphs', page: 'graphs' },
  { id: 'graphs-3', title: 'Course Schedule', difficulty: 'Medium', category: 'Graphs', page: 'graphs' },

  // Stacks
  { id: 'stacks-1', title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stacks', page: 'stacks' },
  { id: 'stacks-2', title: 'Min Stack', difficulty: 'Medium', category: 'Stacks', page: 'stacks' },

  // Hash Tables
  { id: 'hash-1', title: 'Group Anagrams', difficulty: 'Medium', category: 'Hash Tables', page: 'hash-tables' },
  { id: 'hash-2', title: 'Top K Frequent Elements', difficulty: 'Medium', category: 'Hash Tables', page: 'hash-tables' },

  // Two Pointers
  { id: 'two-pointers-1', title: 'Container With Most Water', difficulty: 'Medium', category: 'Two Pointers', page: 'two-pointers' },
  { id: 'two-pointers-2', title: '3Sum', difficulty: 'Medium', category: 'Two Pointers', page: 'two-pointers' },

  // Sliding Window
  { id: 'sliding-window-1', title: 'Maximum Sum Subarray of Size K', difficulty: 'Easy', category: 'Sliding Window', page: 'sliding-window' },
  { id: 'sliding-window-2', title: 'Minimum Window Substring', difficulty: 'Hard', category: 'Sliding Window', page: 'sliding-window' },

  // Heaps
  { id: 'heaps-1', title: 'Kth Largest Element', difficulty: 'Medium', category: 'Heaps', page: 'heaps' },
  { id: 'heaps-2', title: 'Merge K Sorted Lists', difficulty: 'Hard', category: 'Heaps', page: 'heaps' },

  // Backtracking
  { id: 'backtracking-1', title: 'Subsets', difficulty: 'Medium', category: 'Backtracking', page: 'backtracking' },
  { id: 'backtracking-2', title: 'Permutations', difficulty: 'Medium', category: 'Backtracking', page: 'backtracking' },
  { id: 'backtracking-3', title: 'Combination Sum', difficulty: 'Medium', category: 'Backtracking', page: 'backtracking' },
];

/**
 * Generate a seeded random number based on date
 * Same seed = same result for the day
 */
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

/**
 * Get today's date seed (consistent across the day)
 */
const getTodaySeed = () => {
  const today = new Date();
  // Use YYYYMMDD as seed
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
};

/**
 * Get today's daily challenge
 */
export const getDailyChallenge = () => {
  const seed = getTodaySeed();
  const randomIndex = Math.floor(seededRandom(seed) * CHALLENGE_PROBLEMS.length);
  const challenge = CHALLENGE_PROBLEMS[randomIndex];

  return {
    ...challenge,
    date: new Date().toISOString().split('T')[0],
    xpMultiplier: 2 // 2x XP for daily challenge
  };
};

/**
 * Check if today's challenge is completed
 */
export const isDailyChallengeCompleted = (userId) => {
  try {
    const key = `${DAILY_CHALLENGE_KEY}_${userId || 'anonymous'}`;
    const stored = localStorage.getItem(key);
    if (!stored) return false;

    const data = JSON.parse(stored);
    const today = new Date().toISOString().split('T')[0];

    return data.completedDate === today;
  } catch (error) {
    console.error('Error checking daily challenge:', error);
    return false;
  }
};

/**
 * Mark today's challenge as completed
 */
export const completeDailyChallenge = (userId) => {
  try {
    const key = `${DAILY_CHALLENGE_KEY}_${userId || 'anonymous'}`;
    const today = new Date().toISOString().split('T')[0];
    const challenge = getDailyChallenge();

    // Get existing data
    const stored = localStorage.getItem(key);
    const data = stored ? JSON.parse(stored) : { history: [] };

    // Update data
    data.completedDate = today;
    data.history = data.history || [];
    data.history.push({
      date: today,
      problemId: challenge.id,
      completedAt: new Date().toISOString()
    });

    // Keep only last 30 days of history
    if (data.history.length > 30) {
      data.history = data.history.slice(-30);
    }

    localStorage.setItem(key, JSON.stringify(data));

    // Dispatch event
    window.dispatchEvent(new CustomEvent('dailyChallengeCompleted', {
      detail: { challenge, date: today }
    }));

    return true;
  } catch (error) {
    console.error('Error completing daily challenge:', error);
    return false;
  }
};

/**
 * Get daily challenge streak (consecutive days completed)
 */
export const getDailyChallengeStreak = (userId) => {
  try {
    const key = `${DAILY_CHALLENGE_KEY}_${userId || 'anonymous'}`;
    const stored = localStorage.getItem(key);
    if (!stored) return 0;

    const data = JSON.parse(stored);
    const history = data.history || [];

    if (history.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sort history by date descending
    const sortedHistory = [...history].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );

    // Count consecutive days
    let checkDate = new Date(today);

    for (const entry of sortedHistory) {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((checkDate - entryDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 0 || diffDays === 1) {
        streak++;
        checkDate = entryDate;
      } else {
        break;
      }
    }

    return streak;
  } catch (error) {
    console.error('Error getting daily challenge streak:', error);
    return 0;
  }
};

/**
 * Get all available challenge problems
 */
export const getAllChallengeProblems = () => {
  return CHALLENGE_PROBLEMS;
};

/**
 * Get difficulty color
 */
export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy': return '#10b981';
    case 'Medium': return '#f59e0b';
    case 'Hard': return '#ef4444';
    default: return '#6b7280';
  }
};

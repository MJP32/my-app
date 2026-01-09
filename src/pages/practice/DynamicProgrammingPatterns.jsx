import { useState } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import Breadcrumb from '../../components/Breadcrumb'

function DynamicProgrammingPatterns({ onBack, breadcrumb }) {
  const [expandedSections, setExpandedSections] = useState({})

  const patterns = [
    {
      id: 1,
      name: 'Linear DP (1D)',
      icon: '📈',
      color: '#3b82f6',
      difficulty: 'Fundamental',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n) or O(1) optimized',
      description: 'Foundation of DP. Breaking problems into subproblems and building solutions incrementally.',
      whyMatters: 'This is the foundation of DP. If you can\'t solve Linear DP, you\'ll struggle with everything else. These problems teach you the core concept of breaking problems into subproblems and building solutions incrementally.',
      visualization: {
        type: 'linear',
        title: 'Climbing Stairs Example',
        example: 'Ways to climb n=5 stairs (1 or 2 steps at a time)',
        formula: 'dp[i] = dp[i-1] + dp[i-2]',
        states: [
          { i: 0, value: 1, label: 'Base', note: '1 way to stay' },
          { i: 1, value: 1, label: 'Base', note: '1 way (1 step)' },
          { i: 2, value: 2, label: '1+1', note: 'dp[1]+dp[0]' },
          { i: 3, value: 3, label: '2+1', note: 'dp[2]+dp[1]' },
          { i: 4, value: 5, label: '3+2', note: 'dp[3]+dp[2]' },
          { i: 5, value: 8, label: '5+3', note: 'dp[4]+dp[3]' }
        ],
        keyInsight: 'Each state only depends on previous 1-2 states → O(1) space possible'
      },
      problems: [
        { name: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy' },
        { name: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium' },
        { name: 'Min Cost Climbing Stairs', url: 'https://leetcode.com/problems/min-cost-climbing-stairs/', difficulty: 'Easy' },
        { name: 'Word Break', url: 'https://leetcode.com/problems/word-break/', difficulty: 'Medium' },
        { name: 'Decode Ways', url: 'https://leetcode.com/problems/decode-ways/', difficulty: 'Medium' },
        { name: 'House Robber II', url: 'https://leetcode.com/problems/house-robber-ii/', difficulty: 'Medium' }
      ]
    },
    {
      id: 2,
      name: 'Longest Increasing Subsequence (LIS)',
      icon: '📊',
      color: '#10b981',
      difficulty: 'Important',
      timeComplexity: 'O(n²) or O(n log n) with binary search',
      spaceComplexity: 'O(n)',
      description: 'One of the most important DP patterns with O(n log n) optimization.',
      whyMatters: 'LIS is one of the most important DP patterns with applications in version control systems, patience sorting, box stacking problems, and more. The O(n log n) solution using binary search is a must-know optimization technique.',
      visualization: {
        type: 'lis',
        title: 'LIS Example',
        array: [10, 9, 2, 5, 3, 7, 101, 18],
        dp: [1, 1, 1, 2, 2, 3, 4, 4],
        lis: [2, 5, 7, 101],
        lisIndices: [2, 3, 5, 6],
        formula: 'dp[i] = max(dp[j] + 1) for all j < i where arr[j] < arr[i]',
        steps: [
          { idx: 0, val: 10, dp: 1, note: 'Base case' },
          { idx: 2, val: 2, dp: 1, note: 'Start new sequence' },
          { idx: 3, val: 5, dp: 2, note: '2 < 5, extend' },
          { idx: 5, val: 7, dp: 3, note: '5 < 7, extend' },
          { idx: 6, val: 101, dp: 4, note: '7 < 101, extend' }
        ],
        keyInsight: 'For O(n log n): maintain sorted list of smallest tail elements'
      },
      problems: [
        { name: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium' },
        { name: 'Number of Longest Increasing Subsequence', url: 'https://leetcode.com/problems/number-of-longest-increasing-subsequence/', difficulty: 'Medium' },
        { name: 'Russian Doll Envelopes', url: 'https://leetcode.com/problems/russian-doll-envelopes/', difficulty: 'Hard' },
        { name: 'Maximum Length of Pair Chain', url: 'https://leetcode.com/problems/maximum-length-of-pair-chain/', difficulty: 'Medium' },
        { name: 'Find the Longest Valid Obstacle Course at Each Position', url: 'https://leetcode.com/problems/find-the-longest-valid-obstacle-course-at-each-position/', difficulty: 'Hard' }
      ]
    },
    {
      id: 3,
      name: 'Knapsack (0/1, Unbounded, Bounded)',
      icon: '🎒',
      color: '#8b5cf6',
      difficulty: 'Versatile',
      timeComplexity: 'O(n * target)',
      spaceComplexity: 'O(target)',
      description: 'Resource allocation and optimization problems.',
      whyMatters: 'One of the most versatile DP patterns. Appears in resource allocation, optimization problems, and many interview questions. Understanding the difference between 0/1 and unbounded variants is crucial.',
      visualization: {
        type: 'knapsack',
        title: '0/1 Knapsack Example',
        example: 'Items: weights=[1,2,3], values=[6,10,12], Capacity=5',
        variants: [
          { name: '0/1 Knapsack', desc: 'Each item used at most once', formula: 'dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])' },
          { name: 'Unbounded', desc: 'Each item can be used unlimited times', formula: 'dp[w] = max(dp[w], dp[w-wt[i]] + val[i])' },
          { name: 'Bounded', desc: 'Each item has a limited quantity', formula: 'Convert to 0/1 or use binary representation' }
        ],
        table: {
          headers: ['w\\i', '0', '1(1,6)', '2(2,10)', '3(3,12)'],
          rows: [
            { w: 0, values: [0, 0, 0, 0] },
            { w: 1, values: [0, 6, 6, 6] },
            { w: 2, values: [0, 6, 10, 10] },
            { w: 3, values: [0, 6, 16, 12] },
            { w: 4, values: [0, 6, 16, 18] },
            { w: 5, values: [0, 6, 16, 22], highlight: true }
          ]
        },
        keyInsight: 'Space optimization: iterate weights backwards in 0/1, forwards in unbounded'
      },
      problems: [
        { name: 'Partition Equal Subset Sum', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', difficulty: 'Medium', type: '0/1 Knapsack' },
        { name: 'Target Sum', url: 'https://leetcode.com/problems/target-sum/', difficulty: 'Medium', type: '0/1 Knapsack' },
        { name: 'Last Stone Weight II', url: 'https://leetcode.com/problems/last-stone-weight-ii/', difficulty: 'Medium', type: '0/1 Knapsack' },
        { name: 'Ones and Zeroes', url: 'https://leetcode.com/problems/ones-and-zeroes/', difficulty: 'Medium', type: '0/1 Knapsack' },
        { name: 'Partition Array Into Two Arrays to Minimize Sum Difference', url: 'https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/', difficulty: 'Hard', type: '0/1 Knapsack' },
        { name: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium', type: 'Unbounded' },
        { name: 'Coin Change 2', url: 'https://leetcode.com/problems/coin-change-2/', difficulty: 'Medium', type: 'Unbounded' },
        { name: 'Combination Sum IV', url: 'https://leetcode.com/problems/combination-sum-iv/', difficulty: 'Medium', type: 'Unbounded' },
        { name: 'Perfect Squares', url: 'https://leetcode.com/problems/perfect-squares/', difficulty: 'Medium', type: 'Unbounded' },
        { name: 'Minimum Cost For Tickets', url: 'https://leetcode.com/problems/minimum-cost-for-tickets/', difficulty: 'Medium', type: 'Unbounded' }
      ]
    },
    {
      id: 4,
      name: 'Grid DP',
      icon: '🔲',
      color: '#f59e0b',
      difficulty: 'Common',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n) or O(n) optimized',
      description: '2D state space with multiple transition directions.',
      whyMatters: 'Extremely common in interviews, especially at FAANG. Tests your ability to think in 2D state space and handle multiple transition directions.',
      visualization: {
        type: 'grid',
        title: 'Unique Paths Example',
        example: '3x3 grid: Count paths from top-left to bottom-right',
        grid: [
          [1, 1, 1],
          [1, 2, 3],
          [1, 3, 6]
        ],
        arrows: [
          { from: [0,0], to: [0,1], label: '→' },
          { from: [0,0], to: [1,0], label: '↓' }
        ],
        formula: 'dp[i][j] = dp[i-1][j] + dp[i][j-1]',
        transitions: [
          { cell: [1,1], value: 2, calc: 'dp[0][1] + dp[1][0] = 1 + 1' },
          { cell: [2,2], value: 6, calc: 'dp[1][2] + dp[2][1] = 3 + 3', highlight: true }
        ],
        keyInsight: 'Can optimize to O(n) space by processing row by row'
      },
      problems: [
        { name: 'Unique Paths', url: 'https://leetcode.com/problems/unique-paths/', difficulty: 'Medium' },
        { name: 'Unique Paths II', url: 'https://leetcode.com/problems/unique-paths-ii/', difficulty: 'Medium' },
        { name: 'Minimum Path Sum', url: 'https://leetcode.com/problems/minimum-path-sum/', difficulty: 'Medium' },
        { name: 'Maximal Square', url: 'https://leetcode.com/problems/maximal-square/', difficulty: 'Medium' },
        { name: 'Maximal Rectangle', url: 'https://leetcode.com/problems/maximal-rectangle/', difficulty: 'Hard' },
        { name: 'Minimum Falling Path Sum', url: 'https://leetcode.com/problems/minimum-falling-path-sum/', difficulty: 'Medium' },
        { name: 'Count Square Submatrices with All Ones', url: 'https://leetcode.com/problems/count-square-submatrices-with-all-ones/', difficulty: 'Medium' },
        { name: 'Triangle', url: 'https://leetcode.com/problems/triangle/', difficulty: 'Medium' }
      ]
    },
    {
      id: 5,
      name: 'String DP',
      icon: '📝',
      color: '#ef4444',
      difficulty: 'Ubiquitous',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      description: 'Text processing and string manipulation.',
      whyMatters: 'Text processing and string manipulation problems are ubiquitous. This pattern appears in bioinformatics, text editors, version control systems, and natural language processing.',
      visualization: {
        type: 'string',
        title: 'LCS Example (Longest Common Subsequence)',
        example: 'Find LCS of "ABCDE" and "ACE"',
        strings: { s1: 'ABCDE', s2: 'ACE' },
        table: {
          headers: ['', '', 'A', 'B', 'C', 'D', 'E'],
          rows: [
            { char: '', values: [0, 0, 0, 0, 0, 0] },
            { char: 'A', values: [0, 1, 1, 1, 1, 1] },
            { char: 'C', values: [0, 1, 1, 2, 2, 2] },
            { char: 'E', values: [0, 1, 1, 2, 2, 3], highlight: true }
          ]
        },
        formula: 'if s1[i]==s2[j]: dp[i][j] = dp[i-1][j-1] + 1\nelse: dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
        result: { lcs: 'ACE', length: 3 },
        keyInsight: 'Diagonal move = match, horizontal/vertical = skip character'
      },
      problems: [
        { name: 'Longest Common Subsequence', url: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'Medium' },
        { name: 'Edit Distance', url: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Hard' },
        { name: 'Delete Operation for Two Strings', url: 'https://leetcode.com/problems/delete-operation-for-two-strings/', difficulty: 'Medium' },
        { name: 'Minimum ASCII Delete Sum for Two Strings', url: 'https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/', difficulty: 'Medium' },
        { name: 'Shortest Common Supersequence', url: 'https://leetcode.com/problems/shortest-common-supersequence/', difficulty: 'Hard' },
        { name: 'Longest Palindromic Subsequence', url: 'https://leetcode.com/problems/longest-palindromic-subsequence/', difficulty: 'Medium' },
        { name: 'Longest Palindromic Substring', url: 'https://leetcode.com/problems/longest-palindromic-substring/', difficulty: 'Medium' },
        { name: 'Palindromic Substrings', url: 'https://leetcode.com/problems/palindromic-substrings/', difficulty: 'Medium' },
        { name: 'Regular Expression Matching', url: 'https://leetcode.com/problems/regular-expression-matching/', difficulty: 'Hard' },
        { name: 'Wildcard Matching', url: 'https://leetcode.com/problems/wildcard-matching/', difficulty: 'Hard' }
      ]
    },
    {
      id: 6,
      name: 'Interval DP',
      icon: '⏱️',
      color: '#ec4899',
      difficulty: 'Advanced',
      timeComplexity: 'O(n³)',
      spaceComplexity: 'O(n²)',
      description: 'Problems in ranges/intervals for scheduling and optimization.',
      whyMatters: 'Tests ability to think about problems in ranges/intervals. Common in scheduling, matrix chain multiplication type problems, and game theory.',
      visualization: {
        type: 'interval',
        title: 'Matrix Chain Multiplication Concept',
        example: 'Optimal order to multiply matrices A(10x30), B(30x5), C(5x60)',
        concept: 'dp[i][j] = min cost to multiply matrices from i to j',
        formula: 'dp[i][j] = min(dp[i][k] + dp[k+1][j] + cost(i,k,j)) for i ≤ k < j',
        diagram: [
          { range: '[0,0]', value: 0, note: 'Single matrix' },
          { range: '[1,1]', value: 0, note: 'Single matrix' },
          { range: '[2,2]', value: 0, note: 'Single matrix' },
          { range: '[0,1]', value: 1500, note: '10×30×5' },
          { range: '[1,2]', value: 9000, note: '30×5×60' },
          { range: '[0,2]', value: 4500, note: 'min((AB)C, A(BC))', highlight: true }
        ],
        keyInsight: 'Process by increasing interval length (len=1, then 2, then 3...)'
      },
      problems: [
        { name: 'Burst Balloons', url: 'https://leetcode.com/problems/burst-balloons/', difficulty: 'Hard' },
        { name: 'Minimum Score Triangulation of Polygon', url: 'https://leetcode.com/problems/minimum-score-triangulation-of-polygon/', difficulty: 'Medium' },
        { name: 'Minimum Cost Tree From Leaf Values', url: 'https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/', difficulty: 'Medium' },
        { name: 'Unique Binary Search Trees', url: 'https://leetcode.com/problems/unique-binary-search-trees/', difficulty: 'Medium' },
        { name: 'Unique Binary Search Trees II', url: 'https://leetcode.com/problems/unique-binary-search-trees-ii/', difficulty: 'Medium' },
        { name: 'Minimum Cost to Merge Stones', url: 'https://leetcode.com/problems/minimum-cost-to-merge-stones/', difficulty: 'Hard' },
        { name: 'Guess Number Higher or Lower II', url: 'https://leetcode.com/problems/guess-number-higher-or-lower-ii/', difficulty: 'Medium' }
      ]
    },
    {
      id: 7,
      name: 'State Machine DP',
      icon: '🔄',
      color: '#06b6d4',
      difficulty: 'Important',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      description: 'State transitions with specific rules.',
      whyMatters: 'Models problems where you transition between different states with specific rules. Critical for stock trading problems and any scenario with state transitions.',
      visualization: {
        type: 'stateMachine',
        title: 'Stock Trading with Cooldown',
        example: 'prices = [1, 2, 3, 0, 2]',
        states: [
          { name: 'hold', desc: 'Holding stock', color: '#3b82f6' },
          { name: 'sold', desc: 'Just sold (cooldown)', color: '#ef4444' },
          { name: 'rest', desc: 'Not holding, can buy', color: '#10b981' }
        ],
        transitions: [
          { from: 'rest', to: 'hold', action: 'BUY', formula: 'hold = rest - price' },
          { from: 'hold', to: 'sold', action: 'SELL', formula: 'sold = hold + price' },
          { from: 'sold', to: 'rest', action: 'COOLDOWN', formula: 'rest = sold' },
          { from: 'rest', to: 'rest', action: 'WAIT', formula: 'rest = rest' },
          { from: 'hold', to: 'hold', action: 'WAIT', formula: 'hold = hold' }
        ],
        example_trace: [
          { day: 0, price: 1, hold: -1, sold: 0, rest: 0 },
          { day: 1, price: 2, hold: -1, sold: 1, rest: 0 },
          { day: 2, price: 3, hold: -1, sold: 2, rest: 1 },
          { day: 3, price: 0, hold: 1, sold: -1, rest: 2 },
          { day: 4, price: 2, hold: 1, sold: 3, rest: 2, highlight: true }
        ],
        keyInsight: 'Each state only depends on previous day → O(1) space'
      },
      problems: [
        { name: 'Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy' },
        { name: 'Best Time to Buy and Sell Stock II', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/', difficulty: 'Medium' },
        { name: 'Best Time to Buy and Sell Stock III', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/', difficulty: 'Hard' },
        { name: 'Best Time to Buy and Sell Stock IV', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/', difficulty: 'Hard' },
        { name: 'Best Time to Buy and Sell Stock with Cooldown', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/', difficulty: 'Medium' },
        { name: 'Best Time to Buy and Sell Stock with Transaction Fee', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/', difficulty: 'Medium' }
      ]
    },
    {
      id: 8,
      name: 'Tree DP',
      icon: '🌳',
      color: '#22c55e',
      difficulty: 'Advanced',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) where h is height',
      description: 'Tree traversal combined with DP.',
      whyMatters: 'Combines tree traversal with DP. Important for system design (like designing file systems) and optimization problems on hierarchical structures.',
      visualization: {
        type: 'tree',
        title: 'House Robber III Example',
        example: 'Max money without robbing adjacent houses in tree',
        tree: {
          value: 3,
          children: [
            { value: 2, children: [null, { value: 3 }] },
            { value: 3, children: [null, { value: 1 }] }
          ]
        },
        concept: 'For each node, return (rob_this, skip_this)',
        states: [
          { node: 'leaf(3)', rob: 3, skip: 0 },
          { node: 'leaf(1)', rob: 1, skip: 0 },
          { node: 'node(2)', rob: '2+0=2', skip: '0+3=3' },
          { node: 'node(3)', rob: '3+0=3', skip: '0+1=1' },
          { node: 'root(3)', rob: '3+3+1=7', skip: 'max(2,3)+max(3,1)=6', highlight: true }
        ],
        formula: 'rob = node.val + left.skip + right.skip\nskip = max(left.rob, left.skip) + max(right.rob, right.skip)',
        result: 7,
        keyInsight: 'Post-order DFS: process children before parent'
      },
      problems: [
        { name: 'House Robber III', url: 'https://leetcode.com/problems/house-robber-iii/', difficulty: 'Medium' },
        { name: 'Binary Tree Maximum Path Sum', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'Hard' },
        { name: 'Diameter of Binary Tree', url: 'https://leetcode.com/problems/diameter-of-binary-tree/', difficulty: 'Easy' },
        { name: 'Binary Tree Cameras', url: 'https://leetcode.com/problems/binary-tree-cameras/', difficulty: 'Hard' },
        { name: 'Maximum Sum BST in Binary Tree', url: 'https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/', difficulty: 'Hard' },
        { name: 'Difference Between Maximum and Minimum Price Sum', url: 'https://leetcode.com/problems/difference-between-maximum-and-minimum-price-sum/', difficulty: 'Hard' }
      ]
    },
    {
      id: 9,
      name: 'Digit DP',
      icon: '🔢',
      color: '#a855f7',
      difficulty: 'Specialized',
      timeComplexity: 'O(log N * digits)',
      spaceComplexity: 'O(log N)',
      description: 'Counting numbers with certain properties.',
      whyMatters: 'Specialized pattern for counting numbers with certain properties. Appears in competitive programming and some advanced interviews.',
      visualization: {
        type: 'digit',
        title: 'Count Numbers with No Consecutive 1s',
        example: 'Count numbers from 1 to 100 with no consecutive 1s in binary',
        concept: 'Process digit by digit, track constraints',
        states: [
          { name: 'pos', desc: 'Current digit position (right to left)' },
          { name: 'tight', desc: 'Are we still bounded by N?' },
          { name: 'prev', desc: 'Was previous digit 1?' }
        ],
        formula: 'dp(pos, tight, prev) = sum of valid choices at pos',
        example_trace: [
          { n: '1100100', pos: 6, tight: true, prev: false, choices: '0,1' },
          { n: '1100100', pos: 5, tight: true, prev: true, choices: '0 only (no consecutive 1s)' },
          { n: '1100100', pos: 4, tight: false, prev: false, choices: '0,1' }
        ],
        keyInsight: 'Memoize on (pos, tight, prev) - tight flag limits choices'
      },
      problems: [
        { name: 'Number of Digit One', url: 'https://leetcode.com/problems/number-of-digit-one/', difficulty: 'Hard' },
        { name: 'Count Numbers with Unique Digits', url: 'https://leetcode.com/problems/count-numbers-with-unique-digits/', difficulty: 'Medium' },
        { name: 'Numbers At Most N Given Digit Set', url: 'https://leetcode.com/problems/numbers-at-most-n-given-digit-set/', difficulty: 'Hard' },
        { name: 'Numbers With Repeated Digits', url: 'https://leetcode.com/problems/numbers-with-repeated-digits/', difficulty: 'Hard' },
        { name: 'Count Special Integers', url: 'https://leetcode.com/problems/count-special-integers/', difficulty: 'Hard' }
      ]
    },
    {
      id: 10,
      name: 'Game Theory DP (Minimax)',
      icon: '🎮',
      color: '#f97316',
      difficulty: 'Advanced',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n²)',
      description: 'Two-player games with optimal play.',
      whyMatters: 'Models two-player games where both play optimally. Important for AI, game development, and adversarial scenarios.',
      visualization: {
        type: 'game',
        title: 'Stone Game (Predict the Winner)',
        example: 'piles = [5, 3, 4, 5], players take from ends',
        concept: 'dp[i][j] = max score difference player can achieve from piles[i..j]',
        formula: 'dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1])',
        table: {
          piles: [5, 3, 4, 5],
          dp: [
            [5, 2, 4, 1],
            [0, 3, 1, 4],
            [0, 0, 4, 1],
            [0, 0, 0, 5]
          ]
        },
        trace: [
          { range: '[0,0]', value: 5, note: 'Only pile 5' },
          { range: '[0,1]', value: 2, note: 'Take 5, opponent gets 3 → 5-3=2' },
          { range: '[0,3]', value: 1, note: 'Optimal play → P1 wins by 1', highlight: true }
        ],
        keyInsight: 'Positive final value = first player wins'
      },
      problems: [
        { name: 'Predict the Winner', url: 'https://leetcode.com/problems/predict-the-winner/', difficulty: 'Medium' },
        { name: 'Stone Game', url: 'https://leetcode.com/problems/stone-game/', difficulty: 'Medium' },
        { name: 'Stone Game II', url: 'https://leetcode.com/problems/stone-game-ii/', difficulty: 'Medium' },
        { name: 'Stone Game III', url: 'https://leetcode.com/problems/stone-game-iii/', difficulty: 'Hard' },
        { name: 'Can I Win', url: 'https://leetcode.com/problems/can-i-win/', difficulty: 'Medium' },
        { name: 'Stone Game IV', url: 'https://leetcode.com/problems/stone-game-iv/', difficulty: 'Hard' }
      ]
    },
    {
      id: 11,
      name: 'Bitmask DP',
      icon: '🔣',
      color: '#6366f1',
      difficulty: 'Advanced',
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(2^n)',
      description: 'Tracking subsets for small sets (≤20 elements).',
      whyMatters: 'Powerful technique for problems with small sets (≤20 elements) where you need to track subsets. Essential for Traveling Salesman Problem variants and NP-hard problem approximations.',
      visualization: {
        type: 'bitmask',
        title: 'TSP with Bitmask',
        example: '4 cities, find shortest tour visiting all',
        concept: 'dp[mask][i] = min cost to visit cities in mask, ending at i',
        bitmask: {
          n: 4,
          examples: [
            { mask: '0001', binary: 1, meaning: 'Visited city 0 only' },
            { mask: '0101', binary: 5, meaning: 'Visited cities 0 and 2' },
            { mask: '1111', binary: 15, meaning: 'Visited all cities' }
          ]
        },
        formula: 'dp[mask | (1<<j)][j] = min(dp[mask][i] + dist[i][j])',
        trace: [
          { mask: '0001', city: 0, cost: 0, note: 'Start at city 0' },
          { mask: '0011', city: 1, cost: 10, note: 'Visit city 1' },
          { mask: '0111', city: 2, cost: 25, note: 'Visit city 2' },
          { mask: '1111', city: 3, cost: 35, note: 'Visit city 3', highlight: true }
        ],
        keyInsight: '2^n states × n transitions = O(n² × 2^n) total'
      },
      problems: [
        { name: 'Partition to K Equal Sum Subsets', url: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets/', difficulty: 'Medium' },
        { name: 'Shortest Path Visiting All Nodes', url: 'https://leetcode.com/problems/shortest-path-visiting-all-nodes/', difficulty: 'Hard' },
        { name: 'Find the Shortest Superstring', url: 'https://leetcode.com/problems/find-the-shortest-superstring/', difficulty: 'Hard' },
        { name: 'Smallest Sufficient Team', url: 'https://leetcode.com/problems/smallest-sufficient-team/', difficulty: 'Hard' },
        { name: 'Number of Ways to Wear Different Hats to Each Other', url: 'https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other/', difficulty: 'Hard' },
        { name: 'Minimum Number of Work Sessions to Finish the Tasks', url: 'https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/', difficulty: 'Medium' }
      ]
    },
    {
      id: 12,
      name: 'DP on Subsequences',
      icon: '📐',
      color: '#14b8a6',
      difficulty: 'Critical',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
      description: 'Array partitioning and subset generation.',
      whyMatters: 'Critical for array partitioning and subset generation problems. Teaches how to handle exponential search spaces efficiently.',
      visualization: {
        type: 'subsequence',
        title: 'Distinct Subsequences',
        example: 'Count subsequences of "rabbbit" that equal "rabbit"',
        strings: { s: 'rabbbit', t: 'rabbit' },
        table: {
          headers: ['', '', 'r', 'a', 'b', 'b', 'b', 'i', 't'],
          rows: [
            { char: '', values: [1, 1, 1, 1, 1, 1, 1, 1] },
            { char: 'r', values: [0, 1, 1, 1, 1, 1, 1, 1] },
            { char: 'a', values: [0, 0, 1, 1, 1, 1, 1, 1] },
            { char: 'b', values: [0, 0, 0, 1, 2, 3, 3, 3] },
            { char: 'b', values: [0, 0, 0, 0, 1, 3, 3, 3] },
            { char: 'i', values: [0, 0, 0, 0, 0, 0, 3, 3] },
            { char: 't', values: [0, 0, 0, 0, 0, 0, 0, 3], highlight: true }
          ]
        },
        formula: 'if s[i]==t[j]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]\nelse: dp[i][j] = dp[i-1][j]',
        result: 3,
        keyInsight: 'Match char: include it OR skip it; No match: must skip'
      },
      problems: [
        { name: 'Distinct Subsequences', url: 'https://leetcode.com/problems/distinct-subsequences/', difficulty: 'Hard' },
        { name: 'Distinct Subsequences II', url: 'https://leetcode.com/problems/distinct-subsequences-ii/', difficulty: 'Hard' },
        { name: 'Arithmetic Slices II - Subsequence', url: 'https://leetcode.com/problems/arithmetic-slices-ii-subsequence/', difficulty: 'Hard' },
        { name: 'Number of Unique Good Subsequences', url: 'https://leetcode.com/problems/number-of-unique-good-subsequences/', difficulty: 'Hard' },
        { name: 'Constrained Subsequence Sum', url: 'https://leetcode.com/problems/constrained-subsequence-sum/', difficulty: 'Hard' }
      ]
    },
    {
      id: 13,
      name: 'Probability DP',
      icon: '🎲',
      color: '#84cc16',
      difficulty: 'Specialized',
      timeComplexity: 'O(n * k)',
      spaceComplexity: 'O(n * k)',
      description: 'Modeling uncertain outcomes and probability.',
      whyMatters: 'Models uncertain outcomes. Important for risk analysis, game development, and any scenario involving randomness or probability.',
      visualization: {
        type: 'probability',
        title: 'Knight Probability in Chessboard',
        example: 'n=3 board, k=2 moves, start at (0,0)',
        concept: 'dp[k][i][j] = probability of being at (i,j) after k moves',
        formula: 'dp[k][i][j] = Σ dp[k-1][prev] / 8 for each valid prev position',
        moves: [
          { dx: 2, dy: 1 }, { dx: 2, dy: -1 },
          { dx: -2, dy: 1 }, { dx: -2, dy: -1 },
          { dx: 1, dy: 2 }, { dx: 1, dy: -2 },
          { dx: -1, dy: 2 }, { dx: -1, dy: -2 }
        ],
        trace: [
          { k: 0, pos: '(0,0)', prob: 1.0, note: 'Start position' },
          { k: 1, pos: '(2,1)', prob: 0.125, note: '1/8 chance to land here' },
          { k: 1, pos: '(1,2)', prob: 0.125, note: '1/8 chance to land here' },
          { k: 1, pos: 'off-board', prob: 0.75, note: '6/8 moves go off' },
          { k: 2, total: 0.0625, note: 'Sum all on-board probs', highlight: true }
        ],
        keyInsight: 'Each move has 1/8 probability; sum probabilities from all valid predecessors'
      },
      problems: [
        { name: 'Knight Probability in Chessboard', url: 'https://leetcode.com/problems/knight-probability-in-chessboard/', difficulty: 'Medium' },
        { name: 'Soup Servings', url: 'https://leetcode.com/problems/soup-servings/', difficulty: 'Medium' },
        { name: 'New 21 Game', url: 'https://leetcode.com/problems/new-21-game/', difficulty: 'Medium' },
        { name: 'Toss Strange Coins', url: 'https://leetcode.com/problems/toss-strange-coins/', difficulty: 'Medium' },
        { name: 'Probability of a Two Boxes Having The Same Number of Distinct Balls', url: 'https://leetcode.com/problems/probability-of-a-two-boxes-having-the-same-number-of-distinct-balls/', difficulty: 'Hard' }
      ]
    }
  ]

  const toggleSection = (patternId) => {
    setExpandedSections(prev => ({ ...prev, [patternId]: !prev[patternId] }))
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getDifficultyBadgeColor = (level) => {
    const colors = {
      'Fundamental': '#3b82f6',
      'Important': '#10b981',
      'Versatile': '#8b5cf6',
      'Common': '#f59e0b',
      'Ubiquitous': '#ef4444',
      'Advanced': '#ec4899',
      'Specialized': '#a855f7',
      'Critical': '#14b8a6'
    }
    return colors[level] || '#6b7280'
  }

  // Flatten patterns for keyboard navigation
  const allPatterns = patterns
  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: allPatterns,
    onSelect: (pattern) => toggleSection(pattern.id),
    onBack,
    enabled: true,
    gridColumns: 1,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onBack}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              ← Back
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              📈 Dynamic Programming Patterns
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <Breadcrumb breadcrumb={breadcrumb} />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '2rem',
          lineHeight: '1.8'
        }}>
          Master 13 essential DP patterns for coding interviews. Each pattern represents a fundamental approach to solving dynamic programming problems.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#1e3a8a', borderRadius: '8px', border: '1px solid #3b82f6' }}>
            <span style={{ fontWeight: '700', color: '#60a5fa' }}>{patterns.length}</span>
            <span style={{ color: '#93c5fd', marginLeft: '0.5rem' }}>Patterns</span>
          </div>
          <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#064e3b', borderRadius: '8px', border: '1px solid #10b981' }}>
            <span style={{ fontWeight: '700', color: '#34d399' }}>{patterns.reduce((sum, p) => sum + p.problems.length, 0)}</span>
            <span style={{ color: '#6ee7b7', marginLeft: '0.5rem' }}>Practice Problems</span>
          </div>
        </div>

        {/* Patterns Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {patterns.map((pattern, index) => (
            <div
              key={pattern.id}
              ref={(el) => itemRefs.current[index] = el}
              style={{
                backgroundColor: '#1f2937',
                borderRadius: '12px',
                border: `2px solid ${focusedIndex === index || expandedSections[pattern.id] ? pattern.color : '#374151'}`,
                boxShadow: focusedIndex === index ? `0 0 0 3px ${pattern.color}40` : '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'all 0.2s',
                overflow: 'hidden'
              }}
            >
              {/* Pattern Header - Clickable */}
              <button
                onClick={() => toggleSection(pattern.id)}
                tabIndex={focusedIndex === index ? 0 : -1}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.5rem',
                  backgroundColor: expandedSections[pattern.id] ? `${pattern.color}20` : '#1f2937',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!expandedSections[pattern.id]) {
                    e.currentTarget.style.backgroundColor = '#374151'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!expandedSections[pattern.id]) {
                    e.currentTarget.style.backgroundColor = '#1f2937'
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div style={{
                    fontSize: '2rem',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: `${pattern.color}30`,
                    borderRadius: '10px'
                  }}>{pattern.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white', margin: 0 }}>
                        Pattern {pattern.id}: {pattern.name}
                      </h2>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backgroundColor: getDifficultyBadgeColor(pattern.difficulty) + '30',
                        color: getDifficultyBadgeColor(pattern.difficulty)
                      }}>
                        {pattern.difficulty}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: '#9ca3af', fontWeight: '500' }}>
                        {pattern.problems.length} problems
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0, marginBottom: '0.5rem' }}>
                      {pattern.description}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Time:</span>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: '#34d399',
                          backgroundColor: '#064e3b',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px'
                        }}>{pattern.timeComplexity}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Space:</span>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: '#a78bfa',
                          backgroundColor: '#4c1d95',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px'
                        }}>{pattern.spaceComplexity}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '1.25rem', color: '#9ca3af', marginLeft: '1rem' }}>
                  {expandedSections[pattern.id] ? '▼' : '▶'}
                </span>
              </button>

              {/* Pattern Details - Expandable */}
              {expandedSections[pattern.id] && (
                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                  {/* Why This Matters */}
                  <div style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                    padding: '1.25rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    border: '1px solid #3b82f6'
                  }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#93c5fd', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      💡 Why This Pattern Matters
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#dbeafe', lineHeight: '1.6', margin: 0 }}>
                      {pattern.whyMatters}
                    </p>
                  </div>

                  {/* Pattern Visualization */}
                  {pattern.visualization && (
                    <div style={{
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      marginBottom: '1.5rem',
                      border: `1px solid ${pattern.color}40`
                    }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        📊 {pattern.visualization.title}
                      </h3>

                      {/* Example */}
                      <div style={{
                        backgroundColor: '#1e293b',
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        marginBottom: '1rem',
                        border: '1px solid #334155'
                      }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Example: </span>
                        <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontFamily: 'monospace' }}>{pattern.visualization.example}</span>
                      </div>

                      {/* Formula */}
                      <div style={{
                        backgroundColor: '#0f172a',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        border: '1px solid #1e3a8a',
                        fontFamily: 'monospace'
                      }}>
                        <div style={{ color: '#60a5fa', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: '600' }}>RECURRENCE:</div>
                        <pre style={{
                          color: '#fbbf24',
                          fontSize: '0.9rem',
                          margin: 0,
                          whiteSpace: 'pre-wrap',
                          lineHeight: '1.6'
                        }}>{pattern.visualization.formula}</pre>
                      </div>

                      {/* Visualization Content based on type */}
                      {pattern.visualization.states && pattern.visualization.type === 'linear' && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>DP Array Evolution:</div>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {pattern.visualization.states.map((state, idx) => (
                              <div key={idx} style={{
                                backgroundColor: '#1e3a8a',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '6px',
                                textAlign: 'center',
                                minWidth: '60px',
                                border: '1px solid #3b82f6'
                              }}>
                                <div style={{ color: '#93c5fd', fontSize: '0.7rem' }}>i={state.i}</div>
                                <div style={{ color: '#fbbf24', fontSize: '1.1rem', fontWeight: '700' }}>{state.value}</div>
                                <div style={{ color: '#64748b', fontSize: '0.65rem' }}>{state.note}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* LIS Visualization */}
                      {pattern.visualization.type === 'lis' && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Array & DP Values:</div>
                          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem' }}>
                            {pattern.visualization.array.map((val, idx) => (
                              <div key={idx} style={{
                                backgroundColor: pattern.visualization.lisIndices.includes(idx) ? '#065f46' : '#1e3a8a',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                textAlign: 'center',
                                minWidth: '45px',
                                border: pattern.visualization.lisIndices.includes(idx) ? '2px solid #10b981' : '1px solid #3b82f6'
                              }}>
                                <div style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: '600' }}>{val}</div>
                                <div style={{ color: '#fbbf24', fontSize: '0.75rem' }}>dp={pattern.visualization.dp[idx]}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ color: '#10b981', fontSize: '0.85rem' }}>
                            LIS: [{pattern.visualization.lis.join(' → ')}] (length: {pattern.visualization.lis.length})
                          </div>
                        </div>
                      )}

                      {/* Knapsack Visualization */}
                      {pattern.visualization.type === 'knapsack' && pattern.visualization.variants && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Knapsack Variants:</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {pattern.visualization.variants.map((variant, idx) => (
                              <div key={idx} style={{
                                backgroundColor: '#1e293b',
                                padding: '0.75rem 1rem',
                                borderRadius: '6px',
                                border: '1px solid #374151'
                              }}>
                                <div style={{ color: '#a78bfa', fontWeight: '600', fontSize: '0.9rem' }}>{variant.name}</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{variant.desc}</div>
                                <code style={{ color: '#fbbf24', fontSize: '0.75rem' }}>{variant.formula}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Grid Visualization */}
                      {pattern.visualization.type === 'grid' && pattern.visualization.grid && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>DP Grid:</div>
                          <div style={{ display: 'inline-block', backgroundColor: '#0f172a', padding: '0.5rem', borderRadius: '6px' }}>
                            {pattern.visualization.grid.map((row, i) => (
                              <div key={i} style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.25rem' }}>
                                {row.map((cell, j) => (
                                  <div key={j} style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: i === 2 && j === 2 ? '#065f46' : '#1e3a8a',
                                    border: i === 2 && j === 2 ? '2px solid #10b981' : '1px solid #3b82f6',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fbbf24',
                                    fontWeight: '600'
                                  }}>{cell}</div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* String DP Table */}
                      {pattern.visualization.type === 'string' && pattern.visualization.table && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>DP Table:</div>
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{ borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                              <thead>
                                <tr>
                                  {pattern.visualization.table.headers.map((h, i) => (
                                    <th key={i} style={{ padding: '0.5rem', backgroundColor: '#1e3a8a', color: '#93c5fd', border: '1px solid #3b82f6' }}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {pattern.visualization.table.rows.map((row, i) => (
                                  <tr key={i}>
                                    <td style={{ padding: '0.5rem', backgroundColor: '#1e3a8a', color: '#93c5fd', border: '1px solid #3b82f6', fontWeight: '600' }}>{row.char}</td>
                                    {row.values.map((v, j) => (
                                      <td key={j} style={{
                                        padding: '0.5rem',
                                        backgroundColor: row.highlight && j === row.values.length - 1 ? '#065f46' : '#0f172a',
                                        color: '#fbbf24',
                                        border: '1px solid #374151',
                                        textAlign: 'center'
                                      }}>{v}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {pattern.visualization.result && (
                            <div style={{ marginTop: '0.75rem', color: '#10b981' }}>
                              Result: {pattern.visualization.result.lcs} (length: {pattern.visualization.result.length})
                            </div>
                          )}
                        </div>
                      )}

                      {/* State Machine Visualization */}
                      {pattern.visualization.type === 'stateMachine' && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>States:</div>
                          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            {pattern.visualization.states.map((state, idx) => (
                              <div key={idx} style={{
                                backgroundColor: state.color + '20',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: `2px solid ${state.color}`
                              }}>
                                <span style={{ color: state.color, fontWeight: '600' }}>{state.name}</span>
                                <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '0.5rem' }}>({state.desc})</span>
                              </div>
                            ))}
                          </div>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Transitions:</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {pattern.visualization.transitions.slice(0, 3).map((t, idx) => (
                              <div key={idx} style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
                                <span style={{ color: '#f59e0b' }}>{t.from}</span>
                                <span style={{ color: '#94a3b8' }}> → </span>
                                <span style={{ color: '#10b981' }}>{t.to}</span>
                                <span style={{ color: '#94a3b8' }}> ({t.action}): </span>
                                <code style={{ color: '#fbbf24' }}>{t.formula}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tree DP Visualization */}
                      {pattern.visualization.type === 'tree' && pattern.visualization.states && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Node States (rob, skip):</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {pattern.visualization.states.map((state, idx) => (
                              <div key={idx} style={{
                                backgroundColor: state.highlight ? '#065f46' : '#1e293b',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                border: state.highlight ? '2px solid #10b981' : '1px solid #374151',
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'center'
                              }}>
                                <span style={{ color: '#93c5fd', fontWeight: '600', minWidth: '80px' }}>{state.node}</span>
                                <span style={{ color: '#94a3b8' }}>rob=</span>
                                <span style={{ color: '#fbbf24' }}>{state.rob}</span>
                                <span style={{ color: '#94a3b8' }}>skip=</span>
                                <span style={{ color: '#a78bfa' }}>{state.skip}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{ marginTop: '0.75rem', color: '#10b981', fontWeight: '600' }}>
                            Answer: {pattern.visualization.result}
                          </div>
                        </div>
                      )}

                      {/* Interval DP Diagram */}
                      {pattern.visualization.type === 'interval' && pattern.visualization.diagram && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Interval Values:</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {pattern.visualization.diagram.map((item, idx) => (
                              <div key={idx} style={{
                                backgroundColor: item.highlight ? '#065f46' : '#1e293b',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                border: item.highlight ? '2px solid #10b981' : '1px solid #374151',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                              }}>
                                <span style={{ color: '#93c5fd', fontFamily: 'monospace', minWidth: '50px' }}>{item.range}</span>
                                <span style={{ color: '#fbbf24', fontWeight: '600' }}>{item.value}</span>
                                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.note}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bitmask Visualization */}
                      {pattern.visualization.type === 'bitmask' && pattern.visualization.bitmask && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Bitmask Examples (n={pattern.visualization.bitmask.n}):</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {pattern.visualization.bitmask.examples.map((ex, idx) => (
                              <div key={idx} style={{
                                backgroundColor: '#1e293b',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                border: '1px solid #374151',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                              }}>
                                <code style={{ color: '#fbbf24', backgroundColor: '#0f172a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{ex.mask}</code>
                                <span style={{ color: '#94a3b8' }}>=</span>
                                <span style={{ color: '#a78bfa' }}>{ex.binary}</span>
                                <span style={{ color: '#94a3b8' }}>→</span>
                                <span style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>{ex.meaning}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Digit DP States */}
                      {pattern.visualization.type === 'digit' && pattern.visualization.states && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>DP States:</div>
                          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {pattern.visualization.states.map((state, idx) => (
                              <div key={idx} style={{
                                backgroundColor: '#1e3a8a',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid #3b82f6',
                                textAlign: 'center'
                              }}>
                                <div style={{ color: '#fbbf24', fontWeight: '600' }}>{state.name}</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{state.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Game Theory Table */}
                      {pattern.visualization.type === 'game' && pattern.visualization.trace && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Game Trace:</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {pattern.visualization.trace.map((step, idx) => (
                              <div key={idx} style={{
                                backgroundColor: step.highlight ? '#065f46' : '#1e293b',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                border: step.highlight ? '2px solid #10b981' : '1px solid #374151',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                              }}>
                                <span style={{ color: '#93c5fd', fontFamily: 'monospace' }}>{step.range}</span>
                                <span style={{ color: '#fbbf24', fontWeight: '600' }}>{step.value}</span>
                                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{step.note}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Probability Trace */}
                      {pattern.visualization.type === 'probability' && pattern.visualization.trace && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Probability Trace:</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {pattern.visualization.trace.map((step, idx) => (
                              <div key={idx} style={{
                                backgroundColor: step.highlight ? '#065f46' : '#1e293b',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                border: step.highlight ? '2px solid #10b981' : '1px solid #374151',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                              }}>
                                <span style={{ color: '#93c5fd' }}>k={step.k}</span>
                                {step.pos && <span style={{ color: '#a78bfa' }}>{step.pos}</span>}
                                <span style={{ color: '#fbbf24', fontWeight: '600' }}>p={step.prob || step.total}</span>
                                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{step.note}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Subsequence Table */}
                      {pattern.visualization.type === 'subsequence' && pattern.visualization.table && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                            s="{pattern.visualization.strings.s}" → t="{pattern.visualization.strings.t}"
                          </div>
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{ borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                              <thead>
                                <tr>
                                  {pattern.visualization.table.headers.map((h, i) => (
                                    <th key={i} style={{ padding: '0.4rem', backgroundColor: '#1e3a8a', color: '#93c5fd', border: '1px solid #3b82f6' }}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {pattern.visualization.table.rows.map((row, i) => (
                                  <tr key={i}>
                                    <td style={{ padding: '0.4rem', backgroundColor: '#1e3a8a', color: '#93c5fd', border: '1px solid #3b82f6', fontWeight: '600' }}>{row.char}</td>
                                    {row.values.map((v, j) => (
                                      <td key={j} style={{
                                        padding: '0.4rem',
                                        backgroundColor: row.highlight && j === row.values.length - 1 ? '#065f46' : '#0f172a',
                                        color: '#fbbf24',
                                        border: '1px solid #374151',
                                        textAlign: 'center'
                                      }}>{v}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div style={{ marginTop: '0.75rem', color: '#10b981' }}>
                            Result: {pattern.visualization.result} distinct subsequences
                          </div>
                        </div>
                      )}

                      {/* Key Insight */}
                      <div style={{
                        backgroundColor: '#14532d',
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid #22c55e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ fontSize: '1rem' }}>💡</span>
                        <span style={{ color: '#86efac', fontSize: '0.9rem' }}>{pattern.visualization.keyInsight}</span>
                      </div>
                    </div>
                  )}

                  {/* Problems List */}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                    📋 Practice Problems
                  </h3>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {pattern.problems.map((problem, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1rem',
                          backgroundColor: '#111827',
                          borderRadius: '8px',
                          border: '1px solid #374151',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1f2937'
                          e.currentTarget.style.borderColor = pattern.color
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#111827'
                          e.currentTarget.style.borderColor = '#374151'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#d1d5db' }}>
                              {idx + 1}. {problem.name}
                            </span>
                            {problem.type && (
                              <span style={{
                                fontSize: '0.7rem',
                                color: '#9ca3af',
                                padding: '0.15rem 0.5rem',
                                backgroundColor: '#374151',
                                borderRadius: '4px',
                                fontWeight: '600'
                              }}>
                                {problem.type}
                              </span>
                            )}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            backgroundColor: getDifficultyColor(problem.difficulty) + '30',
                            color: getDifficultyColor(problem.difficulty)
                          }}>
                            {problem.difficulty}
                          </span>
                          <a
                            href={problem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#FFA116',
                              color: 'white',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              display: 'inline-block',
                              transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#FF8C00'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#FFA116'}
                        >
                          LeetCode ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

        {/* Summary Footer */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: '#1f2937',
          borderRadius: '12px',
          border: '2px solid #374151',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
            📊 Learning Path Recommendation
          </h3>
          <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto' }}>
            <strong style={{ color: '#60a5fa' }}>Start with:</strong> Linear DP → Knapsack → Grid DP → String DP<br/>
            <strong style={{ color: '#34d399' }}>Then master:</strong> LIS → State Machine → Tree DP<br/>
            <strong style={{ color: '#f59e0b' }}>Advanced patterns:</strong> Interval DP → Bitmask DP → Game Theory<br/>
            <strong style={{ color: '#ec4899' }}>Specialized:</strong> Digit DP → DP on Subsequences → Probability DP
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ padding: '1rem 2rem', backgroundColor: '#1e3a8a', borderRadius: '8px', border: '1px solid #3b82f6' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#60a5fa' }}>13</div>
              <div style={{ fontSize: '0.875rem', color: '#93c5fd' }}>Patterns</div>
            </div>
            <div style={{ padding: '1rem 2rem', backgroundColor: '#064e3b', borderRadius: '8px', border: '1px solid #10b981' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#34d399' }}>{patterns.reduce((sum, p) => sum + p.problems.length, 0)}</div>
              <div style={{ fontSize: '0.875rem', color: '#6ee7b7' }}>Total Problems</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DynamicProgrammingPatterns

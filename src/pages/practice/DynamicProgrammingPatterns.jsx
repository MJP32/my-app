import { useState } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function DynamicProgrammingPatterns({ onBack }) {
  const [expandedSections, setExpandedSections] = useState({})

  const patterns = [
    {
      id: 1,
      name: 'Linear DP (1D)',
      icon: '📈',
      color: '#3b82f6',
      difficulty: 'Fundamental',
      description: 'Foundation of DP. Breaking problems into subproblems and building solutions incrementally.',
      whyMatters: 'This is the foundation of DP. If you can\'t solve Linear DP, you\'ll struggle with everything else. These problems teach you the core concept of breaking problems into subproblems and building solutions incrementally.',
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
      description: 'One of the most important DP patterns with O(n log n) optimization.',
      whyMatters: 'LIS is one of the most important DP patterns with applications in version control systems, patience sorting, box stacking problems, and more. The O(n log n) solution using binary search is a must-know optimization technique.',
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
      description: 'Resource allocation and optimization problems.',
      whyMatters: 'One of the most versatile DP patterns. Appears in resource allocation, optimization problems, and many interview questions. Understanding the difference between 0/1 and unbounded variants is crucial.',
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
      description: '2D state space with multiple transition directions.',
      whyMatters: 'Extremely common in interviews, especially at FAANG. Tests your ability to think in 2D state space and handle multiple transition directions.',
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
      description: 'Text processing and string manipulation.',
      whyMatters: 'Text processing and string manipulation problems are ubiquitous. This pattern appears in bioinformatics, text editors, version control systems, and natural language processing.',
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
      description: 'Problems in ranges/intervals for scheduling and optimization.',
      whyMatters: 'Tests ability to think about problems in ranges/intervals. Common in scheduling, matrix chain multiplication type problems, and game theory.',
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
      description: 'State transitions with specific rules.',
      whyMatters: 'Models problems where you transition between different states with specific rules. Critical for stock trading problems and any scenario with state transitions.',
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
      description: 'Tree traversal combined with DP.',
      whyMatters: 'Combines tree traversal with DP. Important for system design (like designing file systems) and optimization problems on hierarchical structures.',
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
      description: 'Counting numbers with certain properties.',
      whyMatters: 'Specialized pattern for counting numbers with certain properties. Appears in competitive programming and some advanced interviews.',
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
      description: 'Two-player games with optimal play.',
      whyMatters: 'Models two-player games where both play optimally. Important for AI, game development, and adversarial scenarios.',
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
      description: 'Tracking subsets for small sets (≤20 elements).',
      whyMatters: 'Powerful technique for problems with small sets (≤20 elements) where you need to track subsets. Essential for Traveling Salesman Problem variants and NP-hard problem approximations.',
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
      description: 'Array partitioning and subset generation.',
      whyMatters: 'Critical for array partitioning and subset generation problems. Teaches how to handle exponential search spaces efficiently.',
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
      description: 'Modeling uncertain outcomes and probability.',
      whyMatters: 'Models uncertain outcomes. Important for risk analysis, game development, and any scenario involving randomness or probability.',
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
    onSelect: (pattern) => setSelectedPattern(pattern),
    onBack,
    enabled: true,
    gridColumns: 1,
    loop: true
  })

  return (
    <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
          ← Back
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>
          🎯 Dynamic Programming Patterns
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '1rem' }}>
          Master 13 essential DP patterns for coding interviews
        </p>
        <p style={{ fontSize: '1rem', color: '#4b5563', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          Each pattern represents a fundamental approach to solving dynamic programming problems.
          Understanding these patterns will help you recognize and solve most DP problems efficiently.
        </p>
      </div>

      {/* Patterns Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {patterns.map((pattern, index) => (
          <div
            key={pattern.id}
            ref={(el) => itemRefs.current[index] = el}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: `2px solid ${focusedIndex === index ? pattern.color : '#e5e7eb'}`,
              boxShadow: focusedIndex === index ? `0 0 0 3px ${pattern.color}40` : '0 2px 8px rgba(0,0,0,0.08)',
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
                backgroundColor: expandedSections[pattern.id] ? `${pattern.color}10` : 'white',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{pattern.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                      Pattern {pattern.id}: {pattern.name}
                    </h2>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: getDifficultyBadgeColor(pattern.difficulty) + '20',
                      color: getDifficultyBadgeColor(pattern.difficulty)
                    }}>
                      {pattern.difficulty}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                      {pattern.problems.length} problems
                    </span>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#6b7280', margin: 0 }}>
                    {pattern.description}
                  </p>
                </div>
              </div>
              <span style={{ fontSize: '1.5rem', color: '#6b7280', marginLeft: '1rem' }}>
                {expandedSections[pattern.id] ? '▼' : '▶'}
              </span>
            </button>

            {/* Pattern Details - Expandable */}
            {expandedSections[pattern.id] && (
              <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                {/* Why This Matters */}
                <div style={{
                  backgroundColor: `${pattern.color}08`,
                  padding: '1.25rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  borderLeft: `4px solid ${pattern.color}`
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    💡 Why This Pattern Matters
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    {pattern.whyMatters}
                  </p>
                </div>

                {/* Problems List */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
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
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6'
                        e.currentTarget.style.borderColor = pattern.color
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb'
                        e.currentTarget.style.borderColor = '#e5e7eb'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937' }}>
                            {idx + 1}. {problem.name}
                          </span>
                          {problem.type && (
                            <span style={{
                              fontSize: '0.7rem',
                              color: '#6b7280',
                              padding: '0.15rem 0.5rem',
                              backgroundColor: '#e5e7eb',
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
                          backgroundColor: getDifficultyColor(problem.difficulty) + '20',
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
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '2px solid #e5e7eb',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
          📊 Learning Path Recommendation
        </h3>
        <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto' }}>
          <strong>Start with:</strong> Linear DP → Knapsack → Grid DP → String DP<br/>
          <strong>Then master:</strong> LIS → State Machine → Tree DP<br/>
          <strong>Advanced patterns:</strong> Interval DP → Bitmask DP → Game Theory<br/>
          <strong>Specialized:</strong> Digit DP → DP on Subsequences → Probability DP
        </p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>13</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Patterns</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{patterns.reduce((sum, p) => sum + p.problems.length, 0)}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Problems</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DynamicProgrammingPatterns

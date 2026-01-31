import { useState, useEffect } from 'react'
import { getCompletedProblems } from '../services/progressService'
import { getBookmarks } from '../services/bookmarkService'
import { getCurrentUser } from '../services/authService'
import Breadcrumb from '../components/Breadcrumb'
import WeeklyProgressChart from '../components/charts/WeeklyProgressChart'
import ActivityHeatmap from '../components/charts/ActivityHeatmap'

function ProgressDashboard({ onBack, onNavigate }) {
  const currentUser = getCurrentUser()
  const [completedProblems, setCompletedProblems] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [, setRefreshKey] = useState(0)

  useEffect(() => {
    loadData()

    const handleProgressUpdate = () => {
      setRefreshKey(prev => prev + 1)
      loadData()
    }
    const handleBookmarkUpdate = () => loadData()

    window.addEventListener('progressUpdate', handleProgressUpdate)
    window.addEventListener('bookmarkUpdate', handleBookmarkUpdate)

    return () => {
      window.removeEventListener('progressUpdate', handleProgressUpdate)
      window.removeEventListener('bookmarkUpdate', handleBookmarkUpdate)
    }
  }, [])

  const loadData = () => {
    const completed = getCompletedProblems()
    setCompletedProblems(completed)
    setBookmarks(getBookmarks())
  }

  // Convert problemId to page name for navigation
  const getPageNameFromProblemId = (problemId) => {
    // problemId format: PageName-number
    // e.g., "Arrays-1" -> "Arrays"
    // e.g., "Dynamic Programming-5" -> "Dynamic Programming"
    // e.g., "Hash Tables-3" -> "Hash Tables"

    // Find the last dash followed by a number
    const lastDashIndex = problemId.lastIndexOf('-')
    if (lastDashIndex > 0) {
      const afterDash = problemId.substring(lastDashIndex + 1)
      // Check if what's after the dash is a number
      if (/^\d+$/.test(afterDash)) {
        // Return everything before the last dash
        return problemId.substring(0, lastDashIndex)
      }
    }
    // If no number found, return as-is
    return problemId
  }

  const handleProblemClick = (problemId) => {
    const pageName = getPageNameFromProblemId(problemId)
    if (onNavigate) {
      onNavigate(pageName)
    }
  }

  // Parse problem IDs to extract categories
  const parseCategory = (problemId) => {
    // Use the same logic as getPageNameFromProblemId to extract category name
    const lastDashIndex = problemId.lastIndexOf('-')
    if (lastDashIndex > 0) {
      const afterDash = problemId.substring(lastDashIndex + 1)
      // Check if what's after the dash is a number
      if (/^\d+$/.test(afterDash)) {
        // Return everything before the last dash as the category
        return problemId.substring(0, lastDashIndex)
      }
    }
    return problemId
  }

  // Group completed problems by category
  const completedByCategory = completedProblems.reduce((acc, problemId) => {
    const category = parseCategory(problemId)
    if (!acc[category]) acc[category] = []
    acc[category].push(problemId)
    return acc
  }, {})

  // Calculate statistics
  const totalCompleted = completedProblems.length
  const totalBookmarked = bookmarks.length
  const categoriesStarted = Object.keys(completedByCategory).length

  // Recent activity (last 10)
  const recentActivity = [...completedProblems].slice(-10).reverse()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'path', label: 'Learning Path', icon: '🎯' },
    { id: 'completed', label: 'Completed', icon: '✅' },
    { id: 'bookmarks', label: 'Bookmarks', icon: '⭐' },
  ]

  // Learning path - topics ordered from easiest to hardest
  const learningPath = [
    // Fundamentals (Easiest)
    { category: 'Fundamentals', difficulty: 'Beginner', color: '#10b981', topics: [
      { name: 'Arrays', problems: 21, icon: '📊', description: 'Basic array operations and manipulations' },
      { name: 'Strings', problems: 11, icon: '📝', description: 'String manipulation and pattern matching' },
      { name: 'Hash Tables', problems: 11, icon: '#️⃣', description: 'Hash maps, sets, and frequency counting' },
      { name: 'Stacks', problems: 8, icon: '📚', description: 'LIFO data structure and applications' },
      { name: 'Queues', problems: 4, icon: '🚶', description: 'FIFO data structure and BFS preparation' },
    ]},
    // Core Algorithms (Easy-Medium)
    { category: 'Core Algorithms', difficulty: 'Easy-Medium', color: '#3b82f6', topics: [
      { name: 'Two Pointers', problems: 5, icon: '👆', description: 'Efficient array traversal techniques' },
      { name: 'Sliding Window', problems: 9, icon: '🪟', description: 'Subarray and substring problems' },
      { name: 'Binary Search', problems: 5, icon: '🔍', description: 'Efficient searching in sorted data' },
      { name: 'Searching', problems: 2, icon: '🔎', description: 'Linear and binary search algorithms' },
      { name: 'Sorting', problems: 4, icon: '📈', description: 'Sorting algorithms and applications' },
      { name: 'Linked Lists', problems: 12, icon: '🔗', description: 'Node-based data structures' },
    ]},
    // Intermediate (Medium)
    { category: 'Intermediate', difficulty: 'Medium', color: '#f59e0b', topics: [
      { name: 'Recursion', problems: 8, icon: '🔄', description: 'Recursive problem-solving patterns' },
      { name: 'Trees', problems: 6, icon: '🌳', description: 'Tree traversals and manipulations' },
      { name: 'Binary Trees', problems: 17, icon: '🌲', description: 'Binary tree specific algorithms' },
      { name: 'Binary Search Trees', problems: 3, icon: '🌿', description: 'BST operations and properties' },
      { name: 'Heaps', problems: 6, icon: '⛰️', description: 'Priority queues and heap operations' },
      { name: 'Math & Geometry', problems: 9, icon: '📐', description: 'Mathematical and geometric algorithms' },
    ]},
    // Advanced Data Structures (Medium-Hard)
    { category: 'Advanced Data Structures', difficulty: 'Medium-Hard', color: '#8b5cf6', topics: [
      { name: 'Graphs', problems: 9, icon: '🕸️', description: 'Graph traversal and basic algorithms' },
      { name: 'Trie', problems: 5, icon: '🔤', description: 'Prefix trees for string operations' },
      { name: 'Union Find', problems: 4, icon: '🔗', description: 'Disjoint set data structure' },
      { name: 'Intervals', problems: 7, icon: '📏', description: 'Interval merging and scheduling' },
      { name: 'Data Structures', problems: 1, icon: '🏗️', description: 'Custom data structure implementations' },
    ]},
    // Advanced Algorithms (Hard)
    { category: 'Advanced Algorithms', difficulty: 'Hard', color: '#ef4444', topics: [
      { name: 'Dynamic Programming', problems: 17, icon: '🧩', description: 'Optimization and memoization' },
      { name: 'Dynamic Programming Patterns', problems: 89, icon: '🎨', description: 'Advanced DP patterns and techniques' },
      { name: 'Backtracking', problems: 11, icon: '↩️', description: 'Exhaustive search with pruning' },
      { name: 'Greedy Algorithms', problems: 4, icon: '🎯', description: 'Local optimal choices' },
      { name: 'Advanced Graphs', problems: 5, icon: '🗺️', description: 'Shortest paths, MST, topological sort' },
      { name: 'Bit Manipulation', problems: 7, icon: '💻', description: 'Binary operations and tricks' },
      { name: 'Famous Algorithms', problems: 3, icon: '🏆', description: 'Classic algorithms every developer should know' },
    ]},
    // Java Features
    { category: 'Java Features', difficulty: 'Intermediate', color: '#f97316', topics: [
      { name: 'Streams', problems: 0, icon: '🌊', description: 'Java Stream API for functional data processing' },
      { name: 'Streams Advanced', problems: 0, icon: '🌀', description: 'Advanced stream operations and collectors' },
      { name: 'Lambdas', problems: 4, icon: 'λ', description: 'Lambda expressions and method references' },
      { name: 'Lambdas Advanced', problems: 0, icon: '⚡', description: 'Advanced lambda patterns and techniques' },
      { name: 'Functional Interfaces', problems: 4, icon: '🔗', description: 'Predicate, Function, Consumer, Supplier' },
      { name: 'Collections Framework', problems: 0, icon: '📦', description: 'Lists, Sets, Maps, and Queues' },
      { name: 'Optional', problems: 0, icon: '❓', description: 'Null-safe programming with Optional' },
    ]},
    // Modern Java Versions
    { category: 'Modern Java Versions', difficulty: 'Intermediate-Advanced', color: '#0ea5e9', topics: [
      { name: 'Java 8', problems: 0, icon: '🎯', description: 'Lambdas, Streams, Optional, Date/Time API' },
      { name: 'Java 11', problems: 0, icon: '🔧', description: 'HTTP Client, var keyword, String methods' },
      { name: 'Java 15', problems: 0, icon: '📝', description: 'Text blocks, sealed classes preview, records preview' },
      { name: 'Java 21', problems: 0, icon: '🚀', description: 'Virtual threads, pattern matching, sequenced collections' },
      { name: 'Java 24', problems: 0, icon: '🔮', description: 'Preview features and experimental capabilities' },
    ]},
    // Core Java Fundamentals
    { category: 'Core Java Fundamentals', difficulty: 'Beginner-Intermediate', color: '#06b6d4', topics: [
      { name: 'Object-Oriented Programming', problems: 0, icon: '🎭', description: 'Classes, inheritance, polymorphism, encapsulation' },
      { name: 'Exception Handling', problems: 0, icon: '⚠️', description: 'Try-catch, custom exceptions, best practices' },
      { name: 'File I/O', problems: 6, icon: '📁', description: 'File reading, writing, and NIO' },
      { name: 'Generics', problems: 4, icon: '🔷', description: 'Type parameters and generic programming' },
      { name: 'JVM Internals', problems: 5, icon: '⚙️', description: 'JVM architecture, class loading, bytecode' },
      { name: 'Memory Management', problems: 4, icon: '🧠', description: 'Heap, stack, garbage collection' },
    ]},
    // Concurrency
    { category: 'Concurrency', difficulty: 'Advanced', color: '#a855f7', topics: [
      { name: 'Concurrency', problems: 0, icon: '🔀', description: 'Concurrent programming fundamentals' },
      { name: 'Multithreading', problems: 0, icon: '🧵', description: 'Threads, synchronization, locks' },
    ]},
    // Python Operations
    { category: 'Python Operations', difficulty: 'Beginner', color: '#22c55e', topics: [
      { name: 'Set Operations', problems: 0, icon: '🔢', description: 'Python set operations and methods' },
      { name: 'Map Operations', problems: 0, icon: '🗺️', description: 'Dictionary operations and comprehensions' },
    ]},
    // System Design
    { category: 'System Design', difficulty: 'Advanced', color: '#ec4899', topics: [
      { name: 'Design Patterns Practice', problems: 0, icon: '🏛️', description: 'Gang of Four design patterns' },
      { name: 'LRU Cache', problems: 0, icon: '💾', description: 'Least Recently Used cache implementation' },
      { name: 'Rate Limiter', problems: 0, icon: '⏱️', description: 'Rate limiting algorithms and implementations' },
      { name: 'Design Problems', problems: 0, icon: '🎨', description: 'System design interview problems' },
    ]},
  ]

  // Calculate progress for each topic
  const getTopicProgress = (topicName) => {
    const topicIdMap = {
      // Algorithm topics
      'Binary Search': 'BinarySearch',
      'Dynamic Programming': 'DynamicProgramming',
      'Dynamic Programming Patterns': 'DynamicProgrammingPatterns',
      'Hash Tables': 'HashTables',
      'Linked Lists': 'LinkedLists',
      'Two Pointers': 'TwoPointers',
      'Sliding Window': 'SlidingWindow',
      'Binary Trees': 'BinaryTrees',
      'Binary Search Trees': 'BinarySearchTrees',
      'Advanced Graphs': 'AdvancedGraphs',
      'Greedy Algorithms': 'GreedyAlgorithms',
      'Bit Manipulation': 'BitManipulation',
      'Union Find': 'UnionFind',
      'Math & Geometry': 'MathGeometry',
      'Famous Algorithms': 'FamousAlgorithms',
      'Data Structures': 'DataStructures',
      // Java topics
      'Streams Advanced': 'StreamsAdvanced',
      'Lambdas Advanced': 'LambdasAdvanced',
      'Functional Interfaces': 'FunctionalInterfaces',
      'Collections Framework': 'CollectionsFramework',
      'Object-Oriented Programming': 'ObjectOrientedProgramming',
      'Exception Handling': 'ExceptionHandling',
      'File I/O': 'FileIO',
      'JVM Internals': 'JVMInternals',
      'Memory Management': 'MemoryManagement',
      // Java versions
      'Java 8': 'Java8',
      'Java 11': 'Java11',
      'Java 15': 'Java15',
      'Java 21': 'Java21',
      'Java 24': 'Java24',
      // Python topics
      'Set Operations': 'SetOperations',
      'Map Operations': 'MapOperations',
      // System Design topics
      'Design Patterns Practice': 'DesignPatternsPractice',
      'LRU Cache': 'LRUCache',
      'Rate Limiter': 'RateLimiter',
      'Design Problems': 'DesignProblems'
    }
    const prefix = topicIdMap[topicName] || topicName
    return completedProblems.filter(id => id.startsWith(prefix)).length
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1f2937)',
      color: 'white',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Breadcrumb
            breadcrumbStack={[
              { name: 'Progress Dashboard', icon: '📊' }
            ]}
            onMainMenu={onBack}
            colors={{
              primary: '#f59e0b',
              primaryHover: '#fbbf24',
              bg: 'rgba(245, 158, 11, 0.1)',
              border: 'rgba(245, 158, 11, 0.3)',
              arrow: '#f59e0b',
              hoverBg: 'rgba(245, 158, 11, 0.2)'
            }}
          />
        </div>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(to right, #f59e0b, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Progress Dashboard
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>
            Track your learning journey and achievements
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <StatCard
            icon="✅"
            value={totalCompleted}
            label="Problems Completed"
            color="#10b981"
          />
          <StatCard
            icon="⭐"
            value={totalBookmarked}
            label="Bookmarked"
            color="#f59e0b"
          />
          <StatCard
            icon="📁"
            value={categoriesStarted}
            label="Categories Started"
            color="#3b82f6"
          />
          <StatCard
            icon="🔥"
            value={calculateStreak(completedProblems)}
            label="Day Streak"
            color="#ef4444"
          />
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid #374151',
          paddingBottom: '0.5rem'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: activeTab === tab.id ? '#374151' : 'transparent',
                color: activeTab === tab.id ? '#f59e0b' : '#9ca3af',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Activity Charts */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <WeeklyProgressChart userId={currentUser?.uid} />
              <ActivityHeatmap userId={currentUser?.uid} weeks={12} />
            </div>

            {/* Category and Recent Activity Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Progress by Category */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #374151'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b', marginBottom: '1rem' }}>
                Progress by Category
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Object.entries(completedByCategory).slice(0, 8).map(([category, problems]) => (
                  <button
                    key={category}
                    onClick={() => handleProblemClick(problems[0])}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      const progressBar = e.currentTarget.querySelector('.progress-fill')
                      if (progressBar) progressBar.style.backgroundColor = '#22c55e'
                    }}
                    onMouseLeave={(e) => {
                      const progressBar = e.currentTarget.querySelector('.progress-fill')
                      if (progressBar) progressBar.style.backgroundColor = '#10b981'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>{category}</span>
                      <span style={{ color: '#10b981', fontWeight: '600' }}>{problems.length}</span>
                    </div>
                    <div style={{
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div
                        className="progress-fill"
                        style={{
                          height: '100%',
                          width: `${Math.min(problems.length * 10, 100)}%`,
                          backgroundColor: '#10b981',
                          borderRadius: '3px',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #374151'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b', marginBottom: '1rem' }}>
                Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {recentActivity.length > 0 ? recentActivity.map((problemId, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleProblemClick(problemId)}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: '#374151',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      width: '100%',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                  >
                    <span style={{ color: '#10b981' }}>✓</span>
                    <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>
                      {problemId.replace(/-/g, ' ')}
                    </span>
                  </button>
                )) : (
                  <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                    No completed problems yet. Start practicing!
                  </p>
                )}
              </div>
            </div>
            </div>
          </div>
        )}

        {activeTab === 'path' && (
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #374151'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b', marginBottom: '0.5rem' }}>
                🎯 Recommended Learning Path
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                Follow this sequence from easiest to hardest to build your skills progressively
              </p>
            </div>

            {learningPath.map((section, sectionIdx) => {
              const sectionCompleted = section.topics.reduce((sum, t) => sum + getTopicProgress(t.name), 0)
              const sectionTotal = section.topics.reduce((sum, t) => sum + t.problems, 0)
              const sectionPercent = sectionTotal > 0 ? Math.round((sectionCompleted / sectionTotal) * 100) : 0

              return (
                <div key={sectionIdx} style={{ marginBottom: '2rem' }}>
                  {/* Section Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: `${section.color}15`,
                    borderRadius: '8px',
                    border: `1px solid ${section.color}40`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: section.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '700'
                      }}>
                        {sectionIdx + 1}
                      </span>
                      <div>
                        <div style={{ color: section.color, fontWeight: '700', fontSize: '1rem' }}>
                          {section.category}
                        </div>
                        <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                          {section.difficulty}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: section.color, fontWeight: '700', fontSize: '1.1rem' }}>
                        {sectionPercent}%
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                        {sectionCompleted}/{sectionTotal}
                      </div>
                    </div>
                  </div>

                  {/* Topics Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '0.75rem',
                    paddingLeft: '1rem'
                  }}>
                    {section.topics.map((topic, topicIdx) => {
                      const completed = getTopicProgress(topic.name)
                      const percent = topic.problems > 0 ? Math.round((completed / topic.problems) * 100) : 0
                      const isComplete = percent === 100

                      return (
                        <button
                          key={topicIdx}
                          onClick={() => onNavigate && onNavigate(topic.name)}
                          style={{
                            padding: '1rem',
                            backgroundColor: isComplete ? 'rgba(16, 185, 129, 0.1)' : '#374151',
                            borderRadius: '10px',
                            border: isComplete ? '2px solid #10b981' : '1px solid #4b5563',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = `0 4px 12px ${section.color}30`
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1.25rem' }}>{topic.icon}</span>
                            <span style={{
                              color: isComplete ? '#10b981' : '#f9fafb',
                              fontWeight: '600',
                              fontSize: '0.9rem'
                            }}>
                              {topic.name}
                            </span>
                            {isComplete && <span style={{ color: '#10b981' }}>✓</span>}
                          </div>
                          <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                            {topic.description}
                          </div>
                          {/* Progress Bar */}
                          <div style={{
                            height: '6px',
                            backgroundColor: '#1f2937',
                            borderRadius: '3px',
                            overflow: 'hidden',
                            marginBottom: '0.25rem'
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${percent}%`,
                              backgroundColor: isComplete ? '#10b981' : section.color,
                              borderRadius: '3px',
                              transition: 'width 0.3s'
                            }} />
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.7rem',
                            color: '#6b7280'
                          }}>
                            <span>{completed}/{topic.problems}</span>
                            <span style={{ color: isComplete ? '#10b981' : section.color }}>{percent}%</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Summary */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>
                💡 <strong style={{ color: '#f59e0b' }}>Tip:</strong> Complete each section before moving to the next for optimal learning.
                Master fundamentals before tackling advanced topics.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'completed' && (
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981', marginBottom: '1rem' }}>
              All Completed Problems ({totalCompleted})
            </h3>
            {Object.entries(completedByCategory).map(([category, problems]) => (
              <div key={category} style={{ marginBottom: '1.5rem' }}>
                <button
                  onClick={() => handleProblemClick(problems[0])}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    marginBottom: '0.75rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <h4 style={{ color: '#f59e0b', margin: 0 }}>
                    {category} ({problems.length})
                  </h4>
                </button>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {problems.map(problemId => (
                    <button
                      key={problemId}
                      onClick={() => handleProblemClick(problemId)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#374151',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        color: '#d1d5db',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#4b5563'
                        e.currentTarget.style.color = '#10b981'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#374151'
                        e.currentTarget.style.color = '#d1d5db'
                      }}
                    >
                      {problemId.split('-').pop()}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {totalCompleted === 0 && (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                No completed problems yet. Start practicing!
              </p>
            )}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b', marginBottom: '1rem' }}>
              Bookmarked Problems ({totalBookmarked})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {bookmarks.length > 0 ? bookmarks.map((bookmark, idx) => (
                <button
                  key={idx}
                  onClick={() => handleProblemClick(bookmark.problemId)}
                  style={{
                    padding: '1rem',
                    backgroundColor: '#374151',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    width: '100%',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                >
                  <div>
                    <div style={{ color: '#f9fafb', fontWeight: '600' }}>
                      {bookmark.title || bookmark.problemId}
                    </div>
                    {bookmark.category && (
                      <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                        {bookmark.category}
                      </div>
                    )}
                  </div>
                  {bookmark.difficulty && (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor:
                        bookmark.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.2)' :
                        bookmark.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' :
                        'rgba(239, 68, 68, 0.2)',
                      color:
                        bookmark.difficulty === 'Easy' ? '#10b981' :
                        bookmark.difficulty === 'Medium' ? '#f59e0b' :
                        '#ef4444'
                    }}>
                      {bookmark.difficulty}
                    </span>
                  )}
                </button>
              )) : (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                  No bookmarked problems. Click the star icon on any problem to bookmark it!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ icon, value, label, color }) {
  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #1f2937, #111827)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid #374151',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontSize: '2.5rem', fontWeight: '800', color, marginBottom: '0.25rem' }}>
        {value}
      </div>
      <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{label}</div>
    </div>
  )
}

// Calculate streak (simplified - would need timestamp data for real implementation)
function calculateStreak(completedProblems) {
  // Placeholder - return count as "streak" for demo
  return Math.min(completedProblems.length, 30)
}

export default ProgressDashboard

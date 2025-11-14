import { useState, useEffect } from 'react'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'

function Python({ onBack, onSelectItem }) {
  const pythonSections = [
    {
      title: 'Fundamentals',
      icon: '📚',
      color: '#3b82f6',
      topics: [
        {
          id: 'Core Python',
          name: 'Core Python',
          icon: '🐍',
          color: '#3776ab',
          complexity: 'Beginner to Intermediate',
          description: 'Python fundamentals including data types, control structures, functions, OOP, modules, file I/O, and exception handling.'
        },
        {
          id: 'Python OOP',
          name: 'Object-Oriented Programming',
          icon: '🏗️',
          color: '#059669',
          complexity: 'Intermediate to Advanced',
          description: 'Complete OOP guide: classes, objects, inheritance, encapsulation, polymorphism, magic methods, abstract classes, dataclasses, and design patterns.'
        },
        {
          id: 'Index Slicing',
          name: 'Index Slicing',
          icon: '✂️',
          color: '#2563eb',
          complexity: 'Beginner',
          description: 'Master Python sequence indexing and slicing: positive/negative indices, slice notation [start:stop:step], string/list/tuple slicing, and slice objects.'
        },
        {
          id: 'Bitwise Operations',
          name: 'Bitwise Operations',
          icon: '⚙️',
          color: '#0891b2',
          complexity: 'Beginner to Intermediate',
          description: 'Master bitwise operators: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>), bit manipulation tricks, masks, and practical applications.'
        }
      ]
    },
    {
      title: 'Data Structures & Collections',
      icon: '🗂️',
      color: '#8b5cf6',
      topics: [
        {
          id: 'Python Set Operations',
          name: 'Set Operations',
          icon: '🎯',
          color: '#059669',
          complexity: 'Beginner to Intermediate',
          description: 'Master Python set operations: union, intersection, difference, symmetric difference, subset, superset, and disjoint operations.'
        },
        {
          id: 'Python Dict Operations',
          name: 'Dictionary Operations',
          icon: '🗺️',
          color: '#8b5cf6',
          complexity: 'Beginner to Intermediate',
          description: 'Master Python dictionary operations: get, keys, values, items, update, pop, setdefault, fromkeys, and comprehensions.'
        },
        {
          id: 'Python Tuples',
          name: 'Tuple Operations',
          icon: '🎯',
          color: '#0ea5e9',
          complexity: 'Beginner to Intermediate',
          description: 'Master Python tuples: creation, unpacking, immutability, named tuples, tuple vs list, and common patterns like swapping and multiple returns.'
        },
        {
          id: 'List Comprehension',
          name: 'List Comprehension',
          icon: '📋',
          color: '#7c3aed',
          complexity: 'Intermediate',
          description: 'Concise list creation with comprehensions: filtering, mapping, nested comprehensions, dict/set comprehensions, and generator expressions.'
        }
      ]
    },
    {
      title: 'Functional Programming',
      icon: 'λ',
      color: '#db2777',
      topics: [
        {
          id: 'Lambda',
          name: 'Lambda Functions',
          icon: 'λ',
          color: '#db2777',
          complexity: 'Intermediate',
          description: 'Anonymous functions with lambda: syntax, use cases with map/filter/reduce, sorting with key functions, and functional programming patterns.'
        },
        {
          id: 'Python Map Functions',
          name: 'Map Functions (Functional)',
          icon: '🗺️',
          color: '#10b981',
          complexity: 'Intermediate',
          description: 'Master Python functional programming: map(), filter(), reduce(), zip(), enumerate(), any(), all(), sorted(), and combining multiple operations.'
        }
      ]
    },
    {
      title: 'Modules & Utilities',
      icon: '🔧',
      color: '#f59e0b',
      topics: [
        {
          id: 'Itertools',
          name: 'Itertools',
          icon: '🔄',
          color: '#6366f1',
          complexity: 'Intermediate',
          description: 'Efficient iteration tools: combinatorics (permutations, combinations), infinite iterators (count, cycle), grouping, accumulating, and chaining iterators.'
        },
        {
          id: 'Collections Module',
          name: 'Collections Module',
          icon: '🗂️',
          color: '#10b981',
          complexity: 'Intermediate',
          description: 'Specialized containers: Counter for counting, defaultdict for default values, deque for fast ends operations, namedtuple for readable data, OrderedDict, ChainMap.'
        },
        {
          id: 'Sorting Functions',
          name: 'Sorting Functions',
          icon: '🔤',
          color: '#a855f7',
          complexity: 'Beginner to Intermediate',
          description: 'Master Python sorting: sorted(), sort(), key functions, dictionary sorting, multi-level sorting, custom comparisons, and performance optimization.'
        },
        {
          id: 'Bisect Functions',
          name: 'Bisect Functions',
          icon: '🔍',
          color: '#059669',
          complexity: 'Intermediate',
          description: 'Binary search operations on sorted sequences: bisect_left, bisect_right, insort_left, insort_right for efficient searching and insertion in sorted lists.'
        },
        {
          id: 'Python String Methods',
          name: 'String Methods',
          icon: '📝',
          color: '#f97316',
          complexity: 'Beginner to Intermediate',
          description: 'Master Python string manipulation: case conversion, strip/trim, search, validation, split/join, replace, formatting, and encoding methods.'
        }
      ]
    },
    {
      title: 'Advanced Topics',
      icon: '🚀',
      color: '#64748b',
      topics: [
        {
          id: 'Python Advanced',
          name: 'Python Advanced',
          icon: '🚀',
          color: '#646464',
          complexity: 'Advanced',
          description: 'Decorators, generators, context managers, metaclasses, descriptors, async/await patterns, and advanced OOP concepts.'
        },
        {
          id: 'Async Python',
          name: 'Async Python',
          icon: '⚡',
          color: '#ffd43b',
          complexity: 'Advanced',
          description: 'Asyncio, coroutines, event loops, async/await, concurrent programming, and building high-performance async applications.'
        }
      ]
    },
    {
      title: 'Web Development',
      icon: '🌐',
      color: '#10b981',
      topics: [
        {
          id: 'Web Frameworks',
          name: 'Web Frameworks',
          icon: '🌐',
          color: '#092e20',
          complexity: 'Intermediate',
          description: 'Django, Flask, FastAPI for building web applications, RESTful APIs, authentication, databases, and deployment.'
        }
      ]
    },
    {
      title: 'Data Science & Machine Learning',
      icon: '🤖',
      color: '#ec4899',
      topics: [
        {
          id: 'Data Science',
          name: 'Data Science',
          icon: '📊',
          color: '#ff6f00',
          complexity: 'Intermediate',
          description: 'NumPy, Pandas, data manipulation, visualization with Matplotlib/Seaborn, statistical analysis, and Jupyter notebooks.'
        },
        {
          id: 'Machine Learning',
          name: 'Machine Learning',
          icon: '🤖',
          color: '#00acc1',
          complexity: 'Advanced',
          description: 'Scikit-learn, TensorFlow, PyTorch, neural networks, deep learning, model training, evaluation, and deployment.'
        }
      ]
    },
    {
      title: 'Reference & Best Practices',
      icon: '📖',
      color: '#06b6d4',
      topics: [
        {
          id: 'Python Heaps',
          name: 'Heaps Reference (heapq)',
          icon: '📚',
          color: '#dc2626',
          complexity: 'Reference',
          description: 'Complete reference documentation for Python heapq module with examples, complexity analysis, and use cases for all methods.'
        },
        {
          id: 'Python Pitfalls',
          name: 'Common Pitfalls & Gotchas',
          icon: '⚠️',
          color: '#f59e0b',
          complexity: 'All Levels',
          description: 'Learn common Python mistakes and how to avoid them: set/tuple confusion, mutable defaults, closures, and more.'
        },
        {
          id: 'Python Regex',
          name: 'Regular Expressions',
          icon: '🔍',
          color: '#8b5cf6',
          complexity: 'Medium',
          description: 'Master pattern matching, validation, and text processing with Python\'s re module. Learn regex patterns, groups, and common use cases.'
        }
      ]
    },
    {
      title: 'Interview Preparation',
      icon: '🎯',
      color: '#dc2626',
      topics: [
        {
          id: 'LeetCode Patterns',
          name: 'LeetCode Patterns',
          icon: '🎯',
          color: '#ef4444',
          complexity: 'All Levels',
          description: 'Master 15 essential problem-solving patterns for coding interviews: Two Pointers, Sliding Window, DFS/BFS, DP, Backtracking, and more with Python examples.'
        }
      ]
    }
  ]

  // Flatten all topics for keyboard navigation
  const allTopics = pythonSections.flatMap(section => section.topics)

  // Enable keyboard navigation
  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: allTopics,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.6rem 1.25rem',
            fontSize: '0.95rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0
        }}>
          🐍 Python Topics
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <p style={{
        fontSize: '1rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '1.5rem',
        lineHeight: '1.6'
      }}>
        Master Python from basics to advanced topics including web development, data science, and machine learning.
        Select a topic to explore in depth.
      </p>

      {pythonSections.map((section, sectionIndex) => {
        const sectionStartIndex = pythonSections
          .slice(0, sectionIndex)
          .reduce((sum, s) => sum + s.topics.length, 0)

        return (
          <div key={section.title} style={{ marginBottom: '2rem' }}>
            {/* Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              borderLeft: `5px solid ${section.color}`,
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{section.icon}</span>
              <h2 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                {section.title}
              </h2>
            </div>

            {/* Topic Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              {section.topics.map((topic, topicIndex) => {
                const globalIndex = sectionStartIndex + topicIndex
                return (
                  <button
                    key={topic.id}
                    ref={(el) => itemRefs.current[globalIndex] = el}
                    onClick={() => onSelectItem(topic.id)}
                    tabIndex={focusedIndex === globalIndex ? 0 : -1}
                    role="link"
                    aria-label={`${topic.name} - ${topic.complexity}. ${topic.description}`}
                    style={{
                      backgroundColor: 'white',
                      padding: '1rem',
                      borderRadius: '10px',
                      border: `2px solid ${topic.color}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: focusedIndex === globalIndex ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: focusedIndex === globalIndex
                        ? `0 0 0 3px ${topic.color}40, 0 8px 16px rgba(0,0,0,0.15)`
                        : '0 2px 8px rgba(0,0,0,0.08)',
                      textAlign: 'left',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${topic.color}40, 0 8px 16px rgba(0,0,0,0.15)`
                    }}
                    onMouseLeave={(e) => {
                      if (focusedIndex !== globalIndex) {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{
                        fontSize: '2rem',
                        lineHeight: 1
                      }}>
                        {topic.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: '#1f2937',
                          margin: 0,
                          marginBottom: '0.25rem'
                        }}>
                          {topic.name}
                        </h3>
                        <div style={{
                          display: 'inline-block',
                          padding: '0.2rem 0.6rem',
                          backgroundColor: topic.color,
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          borderRadius: '4px'
                        }}>
                          {topic.complexity}
                        </div>
                      </div>
                    </div>

                    <p style={{
                      fontSize: '0.85rem',
                      color: '#6b7280',
                      lineHeight: '1.5',
                      margin: '0.5rem 0'
                    }}>
                      {topic.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      color: topic.color,
                      fontWeight: '600',
                      marginTop: '0.75rem'
                    }}>
                      <span>Explore Topic</span>
                      <span>→</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Python

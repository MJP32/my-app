import { useState, useEffect } from 'react'

function Python({ onBack, onSelectItem, initialCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || null)

  // Update selectedCategory when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory])

  const categories = [
    {
      id: 'fundamentals',
      name: 'Fundamentals',
      icon: '📚',
      color: '#3b82f6',
      description: 'Core Python concepts including data types, control structures, functions, OOP, and essential programming foundations.',
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
      id: 'data-structures',
      name: 'Data Structures & Collections',
      icon: '🗂️',
      color: '#8b5cf6',
      description: 'Python built-in data structures and collections module for efficient data manipulation and storage.',
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
      id: 'algorithms',
      name: 'Algorithms',
      icon: '🔄',
      color: '#ef4444',
      description: 'Classic algorithms implemented in Python including sorting, searching, and graph algorithms.',
      topics: [
        {
          id: 'Sorting Algorithms',
          name: 'Sorting Algorithms',
          icon: '📊',
          color: '#ef4444',
          complexity: 'All Levels',
          description: 'Master 11 sorting algorithms: Bubble, Selection, Insertion, Merge, Quick, Heap, Counting, Radix, Bucket, Tim, and Shell sort with Python implementations.'
        },
        {
          id: 'String Algorithms',
          name: 'String Algorithms',
          icon: '🔤',
          color: '#8b5cf6',
          complexity: 'Medium-Hard',
          description: 'Master string pattern matching algorithms: Rabin-Karp, KMP, Z-Algorithm, Boyer-Moore, Aho-Corasick, Suffix Arrays, and more.'
        },
        {
          id: 'DP Patterns',
          name: 'DP Patterns',
          icon: '📈',
          color: '#3b82f6',
          complexity: 'All Levels',
          description: 'Master 13 essential Dynamic Programming patterns: Linear DP, LIS, Knapsack, Grid DP, String DP, Interval DP, State Machine, Tree DP, and more.'
        }
      ]
    },
    {
      id: 'functional',
      name: 'Functional Programming',
      icon: 'λ',
      color: '#db2777',
      description: 'Functional programming paradigms in Python including lambda functions, map, filter, reduce, and higher-order functions.',
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
      id: 'modules',
      name: 'Modules & Utilities',
      icon: '🔧',
      color: '#f59e0b',
      description: 'Essential Python modules and utility functions for iterators, collections, sorting, searching, and string manipulation.',
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
      id: 'advanced',
      name: 'Advanced Topics',
      icon: '🚀',
      color: '#64748b',
      description: 'Advanced Python concepts including decorators, generators, context managers, metaclasses, and async programming.',
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
      id: 'web',
      name: 'Web Development',
      icon: '🌐',
      color: '#10b981',
      description: 'Python web frameworks and tools for building modern web applications and RESTful APIs.',
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
      id: 'data-science',
      name: 'Data Science & ML',
      icon: '🤖',
      color: '#ec4899',
      description: 'Data science libraries and machine learning frameworks for analysis, visualization, and model building.',
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
      id: 'reference',
      name: 'Reference & Best Practices',
      icon: '📖',
      color: '#06b6d4',
      description: 'Reference documentation, common pitfalls, and best practices for writing clean, efficient Python code.',
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
      id: 'interview',
      name: 'Interview Preparation',
      icon: '🎯',
      color: '#dc2626',
      description: 'Essential patterns and techniques for coding interviews with Python implementations.',
      topics: [
        {
          id: 'LeetCode Patterns',
          name: 'LeetCode Patterns',
          icon: '🎯',
          color: '#ef4444',
          complexity: 'All Levels',
          description: 'Master 31 essential problem-solving patterns for coding interviews: Two Pointers, Sliding Window, DFS/BFS, DP, Backtracking, and more with Python examples.'
        }
      ]
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={onBack}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Menu
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {selectedCategory
                ? `${categories.find(c => c.id === selectedCategory)?.icon} ${categories.find(c => c.id === selectedCategory)?.name}`
                : '🐍 Python Topics'}
            </h1>
          </div>
        </div>

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          {selectedCategory
            ? categories.find(c => c.id === selectedCategory)?.description
            : 'Master Python from basics to advanced topics including web development, data science, and machine learning.'}
        </p>

        {/* Back to categories button */}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              background: '#374151',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            ← Back to Categories
          </button>
        )}

        {/* Categories View */}
        {!selectedCategory && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${category.color}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'left',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-0.5rem)'
                  e.currentTarget.style.boxShadow = `0 25px 50px -12px ${category.color}40`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '2.5rem' }}>{category.icon}</span>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: category.color,
                      marginBottom: '0.25rem'
                    }}>
                      {category.name}
                    </h3>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#9ca3af'
                    }}>
                      {category.topics.length} {category.topics.length === 1 ? 'topic' : 'topics'}
                    </span>
                  </div>
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#d1d5db',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {category.description}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {category.topics.slice(0, 3).map(topic => (
                    <span
                      key={topic.id}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#374151',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        color: '#d1d5db'
                      }}
                    >
                      {topic.name}
                    </span>
                  ))}
                  {category.topics.length > 3 && (
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: category.color,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      color: 'white'
                    }}>
                      +{category.topics.length - 3} more
                    </span>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  color: category.color,
                  fontWeight: '600',
                  marginTop: '1rem'
                }}>
                  <span>Explore</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Topics within Category View */}
        {selectedCategory && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories
              .find(c => c.id === selectedCategory)
              ?.topics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => onSelectItem(topic.id)}
                  style={{
                    background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${topic.color}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'left',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-0.5rem)'
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${topic.color}50`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>{topic.icon}</span>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#93c5fd',
                        marginBottom: '0.25rem'
                      }}>
                        {topic.name}
                      </h3>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.6rem',
                        backgroundColor: topic.color,
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        borderRadius: '0.25rem'
                      }}>
                        {topic.complexity}
                      </span>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#d1d5db',
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {topic.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: topic.color,
                    fontWeight: '600',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid #374151'
                  }}>
                    <span>Open Topic</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Python

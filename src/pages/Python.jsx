import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import Breadcrumb from '../components/Breadcrumb'
import CollapsibleSidebar from '../components/CollapsibleSidebar'
import { useTheme } from '../contexts/ThemeContext'

const PYTHON_COLORS = {
  primary: '#60a5fa',
  primaryHover: '#93c5fd',
  bg: 'rgba(55, 118, 171, 0.1)',
  border: 'rgba(55, 118, 171, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(55, 118, 171, 0.2)',
  topicBg: 'rgba(55, 118, 171, 0.2)'
}

function Python({ onBack, onSelectItem, breadcrumb }) {
  const { isDark } = useTheme()

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
        },
        {
          id: 'Python Deque',
          name: 'Deque (Double-Ended Queue)',
          icon: '🔄',
          color: '#f59e0b',
          complexity: 'Intermediate',
          description: 'Master Python deque: O(1) appends and pops from both ends, rotating, maxlen for bounded queues, and use cases for stacks and sliding windows.'
        },
        {
          id: 'Python Counter',
          name: 'Counter',
          icon: '🔢',
          color: '#10b981',
          complexity: 'Beginner to Intermediate',
          description: 'Master Python Counter: counting elements, most_common(), arithmetic operations, and practical use cases for frequency analysis.'
        },
        {
          id: 'Python DefaultDict',
          name: 'defaultdict',
          icon: '📦',
          color: '#6366f1',
          complexity: 'Intermediate',
          description: 'Master Python defaultdict: automatic default values, factory functions, grouping data, and avoiding KeyError exceptions.'
        },
        {
          id: 'Python NamedTuple',
          name: 'namedtuple',
          icon: '🏷️',
          color: '#ec4899',
          complexity: 'Intermediate',
          description: 'Master Python namedtuple: creating lightweight classes, field access by name, immutability, and replacing simple classes.'
        },
        {
          id: 'Python ChainMap',
          name: 'ChainMap',
          icon: '🔗',
          color: '#14b8a6',
          complexity: 'Intermediate',
          description: 'Master Python ChainMap: combining multiple dictionaries, layered configurations, and efficient dictionary chaining.'
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
        },
        {
          id: 'Python Combinations',
          name: 'Combining Keywords',
          icon: '🔗',
          color: '#f97316',
          complexity: 'Intermediate to Advanced',
          description: 'Master combining Python keywords and functions together: sorted() + lambda, map() + filter(), Counter + most_common(), heapq operations, and more.'
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
        },
        {
          id: 'Math Functions',
          name: 'Math Functions',
          icon: '🔢',
          color: '#0891b2',
          complexity: 'Beginner to Intermediate',
          description: 'Python math module: abs, round, pow, sqrt, floor, ceil, factorial, gcd, log, trigonometry, and constants like pi and e.'
        },
        {
          id: 'Builtin Functions',
          name: 'Built-in Functions',
          icon: '🧰',
          color: '#dc2626',
          complexity: 'Beginner to Intermediate',
          description: 'Essential Python built-ins: type(), isinstance(), len(), range(), print(), input(), id(), hash(), dir(), vars(), and more.'
        },
        {
          id: 'Functools',
          name: 'Functools',
          icon: '🔧',
          color: '#7c3aed',
          complexity: 'Intermediate to Advanced',
          description: 'Higher-order functions: lru_cache, partial, reduce, wraps, singledispatch, total_ordering, and cmp_to_key for functional programming.'
        },
        {
          id: 'Copy Module',
          name: 'Copy Module',
          icon: '📋',
          color: '#059669',
          complexity: 'Intermediate',
          description: 'Shallow vs deep copying: copy.copy(), copy.deepcopy(), custom __copy__/__deepcopy__, and common pitfalls with mutable objects.'
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
          id: 'Decorators',
          name: 'Decorators',
          icon: '🎀',
          color: '#e11d48',
          complexity: 'Intermediate to Advanced',
          description: 'Function and class decorators, decorator factories, @wraps, stacking decorators, and real-world patterns like memoization and authentication.'
        },
        {
          id: 'Generators',
          name: 'Generators',
          icon: '🔄',
          color: '#7c3aed',
          complexity: 'Intermediate to Advanced',
          description: 'Generator functions, yield/yield from, generator expressions, lazy evaluation, infinite sequences, and coroutine-style generators.'
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

  // Create flat list of all topics for keyboard navigation
  const allTopics = categories.flatMap(cat => cat.topics)

  // Single keyboard navigation for all topics
  const { focusedIndex: focusedTopicIndex, itemRefs: topicRefs } = useKeyboardNavigation({
    items: allTopics,
    onSelect: (topic) => onSelectItem(topic.id),
    onBack,
    enabled: true,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)'
        : 'linear-gradient(to bottom right, #f8fafc, #dbeafe, #f8fafc)',
      color: isDark ? '#f9fafb' : '#1f2937',
      padding: '1.5rem',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      <div style={{
        maxWidth: '80rem',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={[{ name: 'Python', icon: '🐍' }]}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={PYTHON_COLORS}
        />

        {/* Collapsible Sidebar for quick topic navigation */}
        <CollapsibleSidebar
          items={categories.flatMap(cat => cat.topics)}
          selectedIndex={-1}
          onSelect={(index) => {
            const allTopics = categories.flatMap(cat => cat.topics)
            onSelectItem(allTopics[index].id)
          }}
          title="Topics"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={PYTHON_COLORS.primary}
        />

        {/* Description */}
        <p style={{
          fontSize: '1.2rem',
          color: isDark ? '#d1d5db' : '#4b5563',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Master Python from basics to advanced topics including web development, data science, and machine learning.
        </p>

        {/* Organized Topic Categories */}
        {categories.map((category, catIndex) => {
          // Calculate the start index for this category's topics
          const categoryStartIndex = categories
            .slice(0, catIndex)
            .reduce((sum, cat) => sum + cat.topics.length, 0)

          return (
          <div key={category.id} style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: category.color,
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>{category.icon}</span>
              {category.name}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}>
              {category.topics.map((topic, topicIndex) => {
                const globalIndex = categoryStartIndex + topicIndex
                return (
                <button
                  key={topic.id}
                  ref={(el) => topicRefs.current[globalIndex] = el}
                  tabIndex={focusedTopicIndex === globalIndex ? 0 : -1}
                  role="link"
                  aria-label={`${topic.name}. ${topic.description}`}
                  onClick={() => onSelectItem(topic.id)}
                  style={{
                    background: isDark
                      ? 'linear-gradient(145deg, #1e293b, #0f172a)'
                      : 'linear-gradient(145deg, #ffffff, #f9fafb)',
                    border: `2px solid ${focusedTopicIndex === globalIndex ? topic.color : topic.color + '40'}`,
                    borderRadius: '12px',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    transform: focusedTopicIndex === globalIndex ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: focusedTopicIndex === globalIndex ? `0 12px 24px -8px ${topic.color}30` : 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 12px 24px -8px ${topic.color}30`
                    e.currentTarget.style.borderColor = topic.color
                  }}
                  onMouseLeave={(e) => {
                    if (focusedTopicIndex !== globalIndex) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = `${topic.color}40`
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>{topic.icon}</span>
                    <h3 style={{
                      color: topic.color,
                      fontSize: '1rem',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      {topic.name}
                    </h3>
                  </div>
                  <p style={{
                    color: isDark ? '#9ca3af' : '#6b7280',
                    fontSize: '0.875rem',
                    lineHeight: '1.4',
                    margin: 0
                  }}>
                    {topic.description}
                  </p>
                </button>
              )})}
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}

export default Python

import { useState, useEffect } from 'react'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { isProblemCompleted } from '../services/progressService'
import Breadcrumb from '../components/Breadcrumb'
import CollapsibleSidebar from '../components/CollapsibleSidebar'
import { useTheme } from '../contexts/ThemeContext'

const PRACTICE_COLORS = {
  primary: '#93c5fd',
  primaryHover: '#bfdbfe',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
}

const tabCategories = {
  all: { label: 'All', ids: null },
  fundamentals: { label: 'Core Fundamentals', ids: ['Data Structures', 'Algorithms'] },
  languages: { label: 'Programming Languages', ids: ['Java Features', 'Core Java Fundamentals', 'Concurrency', 'Python Operations'] },
  design: { label: 'System Design', ids: ['System Design'] },
  interview: { label: 'Interview Prep', ids: ['AI Interview'] }
}

function Practice({ onBack, onSelectItem, breadcrumb, initialCategory, onInitialCategoryUsed }) {
  const { isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all')
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [itemProgress, setItemProgress] = useState({})
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory)
      onInitialCategoryUsed?.()
    }
  }, [initialCategory])

  // Map of subcategory items to their problem counts
  const problemCounts = {
    // Data Structures
    'Arrays': 21,
    'Strings': 11,
    'Linked Lists': 12,
    'Stacks': 8,
    'Queues': 4,
    'Hash Tables': 11,
    'Trees': 6,
    'Binary Trees': 17,
    'Binary Search Trees': 3,
    'Heaps': 6,
    'Graphs': 9,
    'Trie': 5,
    // Algorithms
    'Searching': 2,
    'Binary Search': 5,
    'Sorting': 4,
    'Recursion': 8,
    'Dynamic Programming': 17,
    'Dynamic Programming Patterns': 89,
    'Sliding Window': 9,
    'Backtracking': 11,
    'Intervals': 7,
    'Math & Geometry': 9,
    'Advanced Graphs': 5,
    'Greedy Algorithms': 4,
    'Famous Algorithms': 3,
    'Union Find': 4,
    'Two Pointers': 5,
    'Bit Manipulation': 7,
    'Data Structures': 1,
    // Java Features
    'Streams': 0,
    'Streams Advanced': 0,
    'Lambdas': 4,
    'Lambdas Advanced': 0,
    'Functional Interfaces': 4,
    'Collections Framework': 0,
    'Optional': 0,
    // Concurrency
    'Concurrency': 0,
    'Multithreading': 0,
    // Core Java Fundamentals
    'Object-Oriented Programming': 0,
    'Exception Handling': 0,
    'File I/O': 6,
    'JVM Internals': 5,
    'Memory Management': 4,
    'Generics': 4,
    // System Design
    'Design Patterns Practice': 4,
    'LRU Cache': 4,
    'Rate Limiter': 4,
    'Design Problems': 5,
    'File Uploader': 4,
    'Spring Batch Process': 8,
    // Python Operations
    'Set Operations': 8,
    'Map Operations': 10
  }

  // Calculate completion progress for each item
  useEffect(() => {
    const progress = {}

    Object.keys(problemCounts).forEach(itemName => {
      const totalCount = problemCounts[itemName]
      let completedCount = 0

      // Check each problem in this category
      // Problem IDs are stored as "CategoryName-1", "CategoryName-2", etc.
      for (let i = 1; i <= totalCount; i++) {
        const problemId = `${itemName}-${i}`
        if (isProblemCompleted(problemId)) {
          completedCount++
        }
      }

      progress[itemName] = {
        completed: completedCount,
        total: totalCount,
        percentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
      }
    })

    setItemProgress(progress)
  }, [refreshKey])

  // Calculate overall category progress
  const getCategoryProgress = (subcategory) => {
    let totalCompleted = 0
    let totalProblems = 0

    subcategory.items.forEach(item => {
      if (itemProgress[item]) {
        totalCompleted += itemProgress[item].completed
        totalProblems += itemProgress[item].total
      }
    })

    return {
      completed: totalCompleted,
      total: totalProblems,
      percentage: totalProblems > 0 ? Math.round((totalCompleted / totalProblems) * 100) : 0
    }
  }

  // Listen for progress updates
  useEffect(() => {
    const handleProgressUpdate = () => {
      setRefreshKey(prev => prev + 1)
    }
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  // Organized into logical groups
  const categoryGroups = [
    {
      title: 'Core Fundamentals',
      icon: '📚',
      color: '#3b82f6',
      categories: [
        {
          id: 'Data Structures',
          name: 'Data Structures',
          icon: '📊',
          color: '#3b82f6',
          count: 113,
          items: ['Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 'Hash Tables', 'Trees', 'Binary Trees', 'Binary Search Trees', 'Heaps', 'Graphs', 'Trie']
        },
        {
          id: 'Algorithms',
          name: 'Algorithms',
          icon: '🎯',
          color: '#8b5cf6',
          count: 195,
          items: ['Searching', 'Binary Search', 'Sorting', 'Recursion', 'Dynamic Programming', 'Dynamic Programming Patterns', 'Sliding Window', 'Backtracking', 'Intervals', 'Math & Geometry', 'Advanced Graphs', 'Greedy Algorithms', 'Famous Algorithms', 'Union Find', 'Trie', 'Two Pointers', 'Bit Manipulation', 'Data Structures']
        }
      ]
    },
    {
      title: 'Programming Languages',
      icon: '💻',
      color: '#f59e0b',
      categories: [
        {
          id: 'Java Features',
          name: 'Java Features',
          icon: '☕',
          color: '#f59e0b',
          count: 8,
          items: ['Streams', 'Streams Advanced', 'Lambdas', 'Lambdas Advanced', 'Functional Interfaces', 'Collections Framework', 'Optional']
        },
        {
          id: 'Core Java Fundamentals',
          name: 'Core Java Fundamentals',
          icon: '⚙️',
          color: '#6366f1',
          count: 19,
          items: ['Object-Oriented Programming', 'Exception Handling', 'File I/O', 'JVM Internals', 'Memory Management', 'Generics']
        },
        {
          id: 'Concurrency',
          name: 'Concurrency',
          icon: '🔀',
          color: '#10b981',
          count: 0,
          items: ['Concurrency', 'Multithreading']
        },
        {
          id: 'Python Operations',
          name: 'Python Operations',
          icon: '🐍',
          color: '#3776ab',
          count: 18,
          items: ['Set Operations', 'Map Operations']
        }
      ]
    },
    {
      title: 'System Design',
      icon: '🛠️',
      color: '#ec4899',
      categories: [
        {
          id: 'System Design',
          name: 'System Design',
          icon: '🛠️',
          color: '#ec4899',
          count: 29,
          items: ['Design Patterns Practice', 'LRU Cache', 'Rate Limiter', 'Design Problems', 'File Uploader', 'Spring Batch Process']
        }
      ]
    },
    {
      title: 'Interview Prep',
      icon: '🤖',
      color: '#8b5cf6',
      categories: [
        {
          id: 'AI Interview',
          name: 'AI Interview',
          icon: '🤖',
          color: '#8b5cf6',
          count: 0,
          items: ['AI Interview']
        }
      ]
    }
  ]

  // Flatten for navigation
  const subcategories = categoryGroups.flatMap(group => group.categories)

  const filteredSubcategories = activeCategory === 'all'
    ? subcategories
    : subcategories.filter(sub => tabCategories[activeCategory].ids.includes(sub.id))

  // Build breadcrumb stack based on current navigation state
  const buildBreadcrumbStack = () => {
    const stack = [{ name: 'Practice', icon: '💪' }]
    if (selectedSubcategory) {
      stack.push({ name: selectedSubcategory.name, icon: selectedSubcategory.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      // Clicked on Practice - go back to main categories
      setSelectedSubcategory(null)
    }
  }

  // Hook for subcategories view
  const { focusedIndex: focusedSubcategoryIndex, itemRefs: subcategoryRefs } = useKeyboardNavigation({
    items: filteredSubcategories,
    onSelect: (subcategory) => setSelectedSubcategory(subcategory),
    onBack,
    enabled: !selectedSubcategory,
    gridColumns: 2,
    loop: true
  })

  // Hook for items view within a subcategory
  const currentItems = selectedSubcategory ? selectedSubcategory.items.map(item => ({ id: item, name: item })) : []
  const { focusedIndex: focusedItemIndex, itemRefs: itemRefs } = useKeyboardNavigation({
    items: currentItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack: () => setSelectedSubcategory(null),
    enabled: !!selectedSubcategory,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)'
        : 'linear-gradient(to bottom right, #f8fafc, #dbeafe, #f8fafc)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={PRACTICE_COLORS}
        />

        {/* Collapsible Sidebar for quick topic navigation */}
        <CollapsibleSidebar
          items={filteredSubcategories}
          selectedIndex={selectedSubcategory ? filteredSubcategories.findIndex(s => s.name === selectedSubcategory.name) : -1}
          onSelect={(index) => setSelectedSubcategory(filteredSubcategories[index])}
          title="Topics"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={PRACTICE_COLORS.primary}
        />

        {!selectedSubcategory ? (
          <>
            <p style={{
              fontSize: '1.2rem',
              color: '#d1d5db',
              textAlign: 'center',
              marginBottom: '2rem',
              lineHeight: '1.8'
            }}>
              Master coding concepts through hands-on practice problems. Choose a category to start solving problems
              and build your programming skills with real-world challenges.
            </p>

            {/* Category Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '2rem',
              borderBottom: '2px solid #374151',
              overflowX: 'auto'
            }}>
              {Object.entries(tabCategories).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  style={{
                    padding: '1rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    backgroundColor: activeCategory === key ? '#3b82f6' : 'transparent',
                    color: activeCategory === key ? 'white' : '#9ca3af',
                    border: 'none',
                    borderRadius: '8px 8px 0 0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== key) {
                      e.target.style.backgroundColor = '#374151'
                      e.target.style.color = '#d1d5db'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== key) {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#9ca3af'
                    }
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredSubcategories.map((subcategory, index) => (
                <button
                  key={subcategory.id}
                  ref={(el) => subcategoryRefs.current[index] = el}
                  onClick={() => setSelectedSubcategory(subcategory)}
                  tabIndex={focusedSubcategoryIndex === index ? 0 : -1}
                  role="link"
                  aria-label={`${subcategory.name} category. ${subcategory.count} practice problems.`}
                  style={{
                    background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${subcategory.color}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    transform: focusedSubcategoryIndex === index ? 'translateY(-0.5rem)' : 'translateY(0)',
                    boxShadow: focusedSubcategoryIndex === index
                      ? `0 25px 50px -12px ${subcategory.color}50`
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-0.5rem)'
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${subcategory.color}50`
                  }}
                  onMouseLeave={(e) => {
                    if (focusedSubcategoryIndex !== index) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>{subcategory.icon}</span>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#93c5fd',
                      marginBottom: '0.25rem'
                    }}>
                      {subcategory.name}
                    </h3>
                  </div>

                  {/* Category progress */}
                  {Object.keys(itemProgress).length > 0 && subcategory.count > 0 && (() => {
                    const progress = getCategoryProgress(subcategory)
                    return (
                      <div style={{ margin: '0.75rem 0' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            color: subcategory.color
                          }}>
                            {progress.completed}/{progress.total} Complete
                          </span>
                          <span style={{
                            fontSize: '0.8rem',
                            color: '#9ca3af',
                            fontWeight: '600'
                          }}>
                            ({progress.percentage}%)
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: '#374151',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${progress.percentage}%`,
                            height: '100%',
                            backgroundColor: subcategory.color,
                            borderRadius: '4px',
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                      </div>
                    )
                  })()}

                  <p style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#d1d5db',
                    margin: '0.5rem 0'
                  }}>
                    {subcategory.count} Total Problems
                  </p>

                  <div style={{
                    fontSize: '0.85rem',
                    color: '#9ca3af',
                    lineHeight: '1.5',
                    marginTop: '0.75rem'
                  }}>
                    {subcategory.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} style={{ marginBottom: '0.2rem' }}>
                        • {item}
                      </div>
                    ))}
                    {subcategory.items.length > 3 && (
                      <div style={{ fontStyle: 'italic', color: '#6b7280' }}>
                        + {subcategory.items.length - 3} more
                      </div>
                    )}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: subcategory.color,
                    fontWeight: '600',
                    paddingTop: '0.75rem',
                    marginTop: '0.75rem',
                    borderTop: '1px solid #374151'
                  }}>
                    <span>Explore Topic</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p style={{
              fontSize: '1.2rem',
              color: '#d1d5db',
              textAlign: 'center',
              marginBottom: '2rem',
              lineHeight: '1.8'
            }}>
              Select a practice problem to start coding. Track your progress and improve your skills!
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}>
              {selectedSubcategory.items.map((item, index) => (
                <button
                  key={item}
                  ref={(el) => itemRefs.current[index] = el}
                  onClick={() => onSelectItem(item)}
                  tabIndex={focusedItemIndex === index ? 0 : -1}
                  role="link"
                  aria-label={`${item} practice problem`}
                  style={{
                    background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${selectedSubcategory.color}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    transform: focusedItemIndex === index ? 'translateY(-0.5rem)' : 'translateY(0)',
                    boxShadow: focusedItemIndex === index
                      ? `0 25px 50px -12px ${selectedSubcategory.color}50`
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-0.5rem)'
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${selectedSubcategory.color}50`
                  }}
                  onMouseLeave={(e) => {
                    if (focusedItemIndex !== index) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: selectedSubcategory.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#93c5fd',
                      margin: 0
                    }}>
                      {item}
                    </h3>
                  </div>

                  {/* Progress indicator */}
                  {itemProgress[item] && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '0.8rem',
                          color: '#9ca3af',
                          fontWeight: '600'
                        }}>
                          Progress
                        </span>
                        <span style={{
                          fontSize: '0.8rem',
                          color: selectedSubcategory.color,
                          fontWeight: '700'
                        }}>
                          {itemProgress[item].completed}/{itemProgress[item].total}
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#374151',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${itemProgress[item].percentage}%`,
                          height: '100%',
                          backgroundColor: selectedSubcategory.color,
                          borderRadius: '4px',
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                      <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.8rem',
                        color: itemProgress[item].percentage === 100 ? '#10b981' : '#9ca3af',
                        fontWeight: '600',
                        textAlign: 'center'
                      }}>
                        {itemProgress[item].percentage === 100 ? '✓ Complete!' : `${itemProgress[item].percentage}% Complete`}
                      </div>
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: selectedSubcategory.color,
                    fontWeight: '600',
                    paddingTop: '0.75rem',
                    marginTop: '0.75rem',
                    borderTop: '1px solid #374151'
                  }}>
                    <span>Start Practice</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Practice

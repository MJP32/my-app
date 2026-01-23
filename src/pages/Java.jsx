import { useState, useEffect } from 'react'

function Java({ onBack, onSelectItem, initialCategory }) {
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
      icon: '☕',
      color: '#f59e0b',
      description: 'Core Java programming fundamentals including OOP principles, collections framework, exception handling, and JVM internals.',
      topics: [
        {
          id: 'Core Java',
          name: 'Core Java',
          icon: '☕',
          color: '#f59e0b',
          complexity: 'Beginner to Intermediate',
          description: 'Comprehensive Java programming fundamentals including OOP principles, collections framework, exception handling, multithreading, and JVM internals.'
        }
      ]
    },
    {
      id: 'modern-java',
      name: 'Modern Java (8-11)',
      icon: '🎯',
      color: '#3b82f6',
      description: 'Revolutionary features that shaped modern Java development including lambdas, streams, and functional programming.',
      topics: [
        {
          id: 'Java 8',
          name: 'Java 8',
          icon: '🎯',
          color: '#3b82f6',
          complexity: 'Intermediate',
          description: 'Lambda expressions, Stream API, functional interfaces, default methods, and the revolutionary changes that shaped modern Java development.'
        },
        {
          id: 'Java 11',
          name: 'Java 11 LTS',
          icon: '🔧',
          color: '#8b5cf6',
          complexity: 'Intermediate',
          description: 'Long-Term Support release featuring HTTP Client API, local-variable syntax for lambda parameters, and essential performance improvements.'
        }
      ]
    },
    {
      id: 'recent-releases',
      name: 'Recent Releases (15-21)',
      icon: '🚀',
      color: '#10b981',
      description: 'Latest stable Java releases with text blocks, sealed classes, virtual threads, pattern matching, and record patterns.',
      topics: [
        {
          id: 'Java 15',
          name: 'Java 15',
          icon: '📝',
          color: '#10b981',
          complexity: 'Advanced',
          description: 'Text blocks, sealed classes (preview), hidden classes, and the Edwards-Curve Digital Signature Algorithm for enhanced security.'
        },
        {
          id: 'Java 21',
          name: 'Java 21 LTS',
          icon: '🚀',
          color: '#ec4899',
          complexity: 'Advanced',
          description: 'Long-Term Support with virtual threads, pattern matching, record patterns, sequenced collections, and significant performance enhancements.'
        }
      ]
    },
    {
      id: 'preview',
      name: 'Preview Features',
      icon: '🔮',
      color: '#06b6d4',
      description: 'Cutting-edge preview features and next-generation JVM capabilities coming in future Java releases.',
      topics: [
        {
          id: 'Java 24',
          name: 'Java 24 Preview',
          icon: '🔮',
          color: '#06b6d4',
          complexity: 'Expert Level',
          description: 'Cutting-edge preview features including advanced pattern matching, class-file API improvements, and next-generation JVM capabilities.'
        }
      ]
    },
    {
      id: 'internals',
      name: 'Java Internals',
      icon: '⚙️',
      color: '#f97316',
      description: 'Deep dive into Java internals - collections, concurrency, memory management, and JVM mechanics. Essential knowledge for FAANG interviews.',
      topics: [
        {
          id: 'HashMap - Internal Workings',
          name: 'HashMap Internals',
          icon: '🗺️',
          color: '#f97316',
          complexity: 'Advanced',
          description: 'Deep dive into Java HashMap: hash function, bucket array, collision handling with chaining, treeification (Java 8+), load factor, and resizing.'
        },
        {
          id: 'Blocking Queue',
          name: 'Blocking Queue',
          icon: '🚦',
          color: '#eab308',
          complexity: 'Advanced',
          description: 'Master Java BlockingQueue: producer-consumer pattern, ArrayBlockingQueue vs LinkedBlockingQueue, put/take operations, and custom implementation.'
        },
        {
          id: 'ConcurrentHashMap - Internal Workings',
          name: 'ConcurrentHashMap Internals',
          icon: '🔐',
          color: '#22c55e',
          complexity: 'Advanced',
          description: 'Understand ConcurrentHashMap internals: lock-free reads, per-bucket locking, CAS operations, Java 7 segments vs Java 8+ node locking.'
        },
        {
          id: 'ThreadPoolExecutor - Internal Workings',
          name: 'ThreadPoolExecutor Internals',
          icon: '⚙️',
          color: '#3b82f6',
          complexity: 'Advanced',
          description: 'Master ThreadPoolExecutor: 7 core parameters, work queue types, rejection policies, ctl field internals, Worker class, and task execution flow.'
        },
        {
          id: 'CompletableFuture - Internal Workings',
          name: 'CompletableFuture Internals',
          icon: '🔮',
          color: '#8b5cf6',
          complexity: 'Advanced',
          description: 'Deep dive into CompletableFuture: async composition, completion stages, thenApply vs thenCompose, exception handling, and internal mechanism.'
        },
        {
          id: 'ArrayList - Internal Workings',
          name: 'ArrayList Internals',
          icon: '📋',
          color: '#06b6d4',
          complexity: 'Intermediate',
          description: 'Master ArrayList internals: dynamic array growth (1.5x), amortized O(1) add, element shifting, fail-fast iterators, and vs LinkedList comparison.'
        },
        {
          id: 'LinkedHashMap - Internal Workings',
          name: 'LinkedHashMap Internals',
          icon: '🔗',
          color: '#14b8a6',
          complexity: 'Advanced',
          description: 'Understand LinkedHashMap: insertion vs access order, doubly-linked list, LRU cache implementation, removeEldestEntry, and when to use over HashMap.'
        },
        {
          id: 'ReentrantLock - Internal Workings',
          name: 'ReentrantLock Internals',
          icon: '🔒',
          color: '#ef4444',
          complexity: 'Advanced',
          description: 'Master ReentrantLock: AQS framework, fair vs non-fair locks, CLH queue, Conditions, lock interruptibly, tryLock, and comparison with synchronized.'
        },
        {
          id: 'Atomic & CAS - Internal Workings',
          name: 'Atomic & CAS Internals',
          icon: '⚛️',
          color: '#a855f7',
          complexity: 'Advanced',
          description: 'Deep dive into AtomicInteger, CAS operations, lock-free programming, ABA problem, AtomicReference, and LongAdder for high-contention counting.'
        },
        {
          id: 'String Pool - Internal Workings',
          name: 'String Pool Internals',
          icon: '📝',
          color: '#f59e0b',
          complexity: 'Intermediate',
          description: 'Understand String Pool: interning, immutability benefits, compile-time optimization, Compact Strings (Java 9+), and memory tuning.'
        },
        {
          id: 'JVM Memory Model',
          name: 'JVM Memory Model',
          icon: '🧠',
          color: '#ec4899',
          complexity: 'Advanced',
          description: 'Master JVM memory: heap, stack, metaspace, object layout, volatile visibility, happens-before relationships, and memory barriers.'
        },
        {
          id: 'TreeMap - Internal Workings',
          name: 'TreeMap Internals',
          icon: '🌳',
          color: '#84cc16',
          complexity: 'Advanced',
          description: 'Understand TreeMap: Red-Black tree implementation, O(log n) operations, tree rotations, NavigableMap methods, and when to use over HashMap.'
        },
        {
          id: 'Garbage Collection',
          name: 'Garbage Collection',
          icon: '🗑️',
          color: '#6366f1',
          complexity: 'Advanced',
          description: 'Master GC: generational collection, G1/ZGC/Shenandoah collectors, GC roots, marking algorithms, tuning, and choosing the right collector.'
        },
        {
          id: 'Virtual Threads (Java 21)',
          name: 'Virtual Threads',
          icon: '🧵',
          color: '#0ea5e9',
          complexity: 'Advanced',
          description: 'Understand Virtual Threads: Project Loom, carrier threads, thread pinning, million-thread scalability, structured concurrency, and migration.'
        },
        {
          id: 'Synchronized Internals',
          name: 'Synchronized Internals',
          icon: '🔐',
          color: '#dc2626',
          complexity: 'Advanced',
          description: 'Master synchronized: object monitors, Mark Word, biased/thin/fat locks, lock inflation, wait/notify, and comparison with ReentrantLock.'
        },
        {
          id: 'PriorityQueue - Internal Workings',
          name: 'PriorityQueue Internals',
          icon: '📊',
          color: '#0891b2',
          complexity: 'Intermediate',
          description: 'Deep dive into PriorityQueue: binary heap in array, sift up/down operations, heapify algorithm, and common interview patterns.'
        },
        {
          id: 'ForkJoinPool - Internal Workings',
          name: 'ForkJoinPool Internals',
          icon: '🔀',
          color: '#7c3aed',
          complexity: 'Advanced',
          description: 'Master ForkJoinPool: work-stealing algorithm, fork/join operations, RecursiveTask vs RecursiveAction, and parallel stream internals.'
        },
        {
          id: 'CountDownLatch & CyclicBarrier',
          name: 'CountDownLatch & CyclicBarrier',
          icon: '🚦',
          color: '#059669',
          complexity: 'Advanced',
          description: 'Understand thread synchronization: CountDownLatch for one-time events, CyclicBarrier for reusable sync points, and Phaser for advanced coordination.'
        },
        {
          id: 'Semaphore - Internal Workings',
          name: 'Semaphore Internals',
          icon: '🎫',
          color: '#ea580c',
          complexity: 'Advanced',
          description: 'Deep dive into Semaphore: permit-based synchronization, fair vs non-fair modes, connection pooling patterns, and rate limiting.'
        },
        {
          id: 'Class Loading',
          name: 'Class Loading',
          icon: '📦',
          color: '#4f46e5',
          complexity: 'Advanced',
          description: 'Master JVM class loading: loading phases, delegation model, custom ClassLoaders, Metaspace, and class unloading.'
        },
        {
          id: 'Java NIO',
          name: 'Java NIO',
          icon: '📡',
          color: '#0284c7',
          complexity: 'Advanced',
          description: 'Deep dive into Java NIO: ByteBuffer internals, channels and selectors, non-blocking I/O, memory-mapped files, and high-performance networking.'
        }
      ]
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #78350f, #111827)',
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
                background: '#f59e0b',
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
                e.currentTarget.style.background = '#d97706'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f59e0b'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Menu
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {selectedCategory
                ? `${categories.find(c => c.id === selectedCategory)?.icon} ${categories.find(c => c.id === selectedCategory)?.name}`
                : '☕ Java Topics'}
            </h1>
          </div>
        </div>

        {/* Dark themed Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#fbbf24',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.2)'
              e.currentTarget.style.color = '#fcd34d'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#fbbf24'
            }}
          >
            <span>☕</span> Java
          </button>
          {selectedCategory && (
            <>
              <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>→</span>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fbbf24',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.2)'
                  e.currentTarget.style.color = '#fcd34d'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#fbbf24'
                }}
              >
                {categories.find(c => c.id === selectedCategory)?.name}
              </button>
            </>
          )}
          <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>→</span>
          <span style={{
            color: '#e2e8f0',
            fontSize: '0.9rem',
            fontWeight: '600',
            padding: '0.25rem 0.75rem',
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            borderRadius: '4px'
          }}>
            {selectedCategory ? 'Topics' : 'Java Topics'}
          </span>
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
            : 'Master Java from fundamentals to cutting-edge features. Explore versions, advanced concepts, and best practices.'}
        </p>

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
                        color: '#fbbf24',
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

export default Java

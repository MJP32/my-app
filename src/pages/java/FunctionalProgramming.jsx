import { useState, useEffect, useRef } from 'react'
import { useModalFocus } from '../../hooks/useModalFocus'
import Breadcrumb from '../../components/Breadcrumb'

function FunctionalProgramming({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  // Comprehensive modal focus management
  const { modalRef, firstFocusableRef } = useModalFocus(onBack)

  const concepts = [
    {
      id: 'pure-functions',
      name: 'Pure Functions',
      icon: '🔄',
      color: '#9333ea',
      description: 'Functions that always return the same output for the same input and have no side effects',
      details: [
        {
          name: 'Deterministic Behavior',
          explanation: 'Pure functions always produce the same output for the same input parameters. This predictability makes code easier to test, debug, and reason about. For example, add(2, 3) will always return 5, no matter how many times you call it.'
        },
        {
          name: 'No Side Effects',
          explanation: 'Pure functions don\'t modify external state or perform I/O operations. They don\'t change global variables, modify input parameters, or interact with the outside world. This isolation makes code safer and more maintainable.'
        },
        {
          name: 'Referential Transparency',
          explanation: 'A function call can be replaced with its result value without changing the program\'s behavior. This property enables compiler optimizations like memoization and makes code easier to refactor and parallelize.'
        },
        {
          name: 'Enhanced Testability',
          explanation: 'Pure functions are extremely easy to test because they have no dependencies on external state. You can test them in isolation with simple input-output assertions, without complex mocking or setup.'
        },
        {
          name: 'Thread Safety',
          explanation: 'Since pure functions don\'t modify shared state, they are inherently thread-safe and can be safely called from multiple threads concurrently without synchronization.'
        }
      ]
    },
    {
      id: 'lambda-expressions',
      name: 'Lambda Expressions',
      icon: 'λ',
      color: '#8b5cf6',
      description: 'Concise way to represent anonymous functions in Java 8+',
      details: [
        {
          name: 'Anonymous Functions',
          explanation: 'Lambdas provide a clean syntax for creating functions without naming them. Instead of verbose anonymous classes, you can write (x, y) -> x + y. This reduces boilerplate and makes code more readable.'
        },
        {
          name: 'Functional Interfaces',
          explanation: 'Lambdas implement functional interfaces (interfaces with a single abstract method). Java provides built-in interfaces like Predicate, Function, Consumer, and Supplier that cover common use cases.'
        },
        {
          name: 'Method References',
          explanation: 'Method references (::) are shorthand for lambdas that call a single method. String::toUpperCase is equivalent to s -> s.toUpperCase(). This makes code even more concise and readable.'
        },
        {
          name: 'Closure Capability',
          explanation: 'Lambdas can capture variables from their enclosing scope. Captured variables must be effectively final, ensuring thread safety and preventing subtle bugs from mutable captured state.'
        },
        {
          name: 'Type Inference',
          explanation: 'The compiler can often infer lambda parameter types from context, allowing you to write (x, y) -> x + y instead of (Integer x, Integer y) -> x + y. This reduces verbosity while maintaining type safety.'
        }
      ]
    },
    {
      id: 'higher-order-functions',
      name: 'Higher-Order Functions',
      icon: '📈',
      color: '#a855f7',
      description: 'Functions that take other functions as parameters or return functions',
      details: [
        {
          name: 'Functions as Parameters',
          explanation: 'Higher-order functions accept other functions as arguments, enabling flexible, reusable code. For example, a filterList function that takes a Predicate can filter any list with any condition, maximizing code reuse.'
        },
        {
          name: 'Functions as Return Values',
          explanation: 'Functions can create and return other functions, enabling function factories and currying. This allows you to create specialized functions from general ones, like createMultiplier(3) returning a function that multiplies by 3.'
        },
        {
          name: 'Callback Patterns',
          explanation: 'Higher-order functions enable callback patterns where you pass behavior to be executed later. This is fundamental to asynchronous programming and event handling in modern applications.'
        },
        {
          name: 'Abstraction and Reuse',
          explanation: 'By separating the control flow from the specific operation, higher-order functions enable powerful abstractions. You can write general-purpose utilities that work with any type and any operation.'
        },
        {
          name: 'Pipeline Construction',
          explanation: 'Higher-order functions allow building processing pipelines by chaining operations. Each function takes data and a transformation, applies it, and passes the result to the next stage.'
        }
      ]
    },
    {
      id: 'immutability',
      name: 'Immutability',
      icon: '🔒',
      color: '#f59e0b',
      description: 'Creating objects whose state cannot be changed after creation',
      details: [
        {
          name: 'Immutable Objects',
          explanation: 'Immutable objects have state that cannot change after construction. All fields are final, and there are no setter methods. Any "modification" creates a new instance with the changed values, leaving the original unchanged.'
        },
        {
          name: 'Defensive Copying',
          explanation: 'When creating immutable classes that contain mutable fields (like collections), use defensive copying. Copy mutable parameters in the constructor and return copies from getters to prevent external modification.'
        },
        {
          name: 'Thread Safety Benefits',
          explanation: 'Immutable objects are inherently thread-safe since their state can never change. Multiple threads can safely access them without synchronization, eliminating race conditions and improving performance in concurrent applications.'
        },
        {
          name: 'Simplified Reasoning',
          explanation: 'With immutability, you can reason about an object\'s state more easily since it never changes after creation. This eliminates temporal coupling bugs where the order of method calls matters.'
        },
        {
          name: 'Safe Sharing and Caching',
          explanation: 'Immutable objects can be freely shared and cached without worrying about consistency issues. Multiple parts of your application can reference the same instance safely, reducing memory overhead.'
        }
      ]
    },
    {
      id: 'stream-api',
      name: 'Stream API',
      icon: '🌊',
      color: '#06b6d4',
      description: 'Declarative, functional-style processing of sequences',
      details: [
        {
          name: 'Declarative Processing',
          explanation: 'Streams let you declare what you want to do with data, not how to do it. Instead of explicit loops and conditionals, you chain operations like filter, map, and reduce to express your intent clearly and concisely.'
        },
        {
          name: 'Lazy Evaluation',
          explanation: 'Intermediate stream operations are lazy - they don\'t execute until a terminal operation is called. This allows optimizations like short-circuiting and fusion, improving performance by avoiding unnecessary computation.'
        },
        {
          name: 'Parallel Processing',
          explanation: 'Streams can be processed in parallel with a simple .parallel() call. The Stream API handles the complexity of splitting work across threads, making it easy to leverage multi-core processors for better performance.'
        },
        {
          name: 'Rich Operation Set',
          explanation: 'Streams provide a comprehensive set of operations: filter, map, flatMap, reduce, collect, sorted, distinct, limit, skip, and more. These building blocks can be combined to express complex data transformations elegantly.'
        },
        {
          name: 'Integration with Collections',
          explanation: 'Collections provide stream() and parallelStream() methods for easy conversion. Streams can be collected back to various collection types using Collectors, providing seamless integration with existing code.'
        }
      ]
    },
    {
      id: 'function-composition',
      name: 'Function Composition',
      icon: '🔗',
      color: '#ec4899',
      description: 'Combining simple functions to build complex operations',
      details: [
        {
          name: 'compose() Method',
          explanation: 'Function.compose() combines two functions where the parameter function executes first. f.compose(g) creates a new function that computes f(g(x)). This follows mathematical function composition notation.'
        },
        {
          name: 'andThen() Method',
          explanation: 'Function.andThen() chains functions in execution order. f.andThen(g) creates a function that computes g(f(x)). This reads more naturally when thinking about sequential data transformations.'
        },
        {
          name: 'Building Complex Pipelines',
          explanation: 'By composing simple, focused functions, you can build sophisticated data transformation pipelines. Each function does one thing well, and composition combines them into powerful operations.'
        },
        {
          name: 'Reusability Through Composition',
          explanation: 'Small, composable functions are highly reusable. You can mix and match them in different combinations to create new behaviors without writing new code, following the DRY principle.'
        },
        {
          name: 'Predicate and Consumer Composition',
          explanation: 'Predicates support and(), or(), and negate() for logical composition. Consumers support andThen() for sequential side effects. These compositions enable expressive, readable condition and action chains.'
        }
      ]
    },
    {
      id: 'reactive-programming',
      name: 'Reactive Programming',
      icon: '⚡',
      color: '#ef4444',
      description: 'Asynchronous, event-driven programming with data streams',
      details: [
        {
          name: 'Asynchronous Streams',
          explanation: 'Reactive programming treats data as streams that emit values over time. Instead of requesting data, you react to it as it arrives. This is ideal for event-driven systems, real-time updates, and handling unpredictable data sources.'
        },
        {
          name: 'Backpressure Handling',
          explanation: 'Reactive systems handle situations where data arrives faster than it can be processed. Backpressure strategies (buffer, drop, throttle) prevent memory overflow and system overload by controlling the flow of data.'
        },
        {
          name: 'CompletableFuture',
          explanation: 'Java\'s CompletableFuture provides composable asynchronous programming. You can chain async operations with thenApply, thenCompose, and thenCombine, creating complex async workflows with clean, readable code.'
        },
        {
          name: 'Event-Driven Architecture',
          explanation: 'Reactive systems are built around events and messages. Components react to events rather than calling each other directly, resulting in loosely coupled, scalable systems that handle high loads gracefully.'
        },
        {
          name: 'Error Handling',
          explanation: 'Reactive streams provide sophisticated error handling with operators like onError, retry, and fallback. Errors propagate through the stream, and you can handle them at any point with appropriate recovery strategies.'
        }
      ]
    }
  ]

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  const handleBackToGrid = () => {
    setSelectedConcept(null)
  }


  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #78350f, #111827)', color: 'white', padding: '1.5rem' }}>
    <div ref={modalRef} style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            ref={firstFocusableRef}
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(147, 51, 234, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7e22ce'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            ← Back to Menu
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(to right, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Functional Programming
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#f3e8ff',
                color: '#7e22ce',
                borderRadius: '6px',
                marginTop: '0.25rem',
                display: 'inline-block'
              }}>
                {currentSubcategory}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8b5cf6'}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8b5cf6'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(concept)}
              style={{
                backgroundColor: `${concept.color}0D`,
                padding: '2rem',
                borderRadius: '12px',
                border: `2px solid ${concept.color}33`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 24px ${concept.color}40`
                e.currentTarget.style.borderColor = `${concept.color}66`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = `${concept.color}33`
              }}
            >
              <div>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                  {concept.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#fbbf24',
                  margin: '0 0 0.5rem 0'
                }}>
                  {concept.name}
                </h3>
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: '#d1d5db',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {concept.description}
              </p>
            </div>
          ))
        ) : (
          <>
            {/* Sidebar */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <button
                onClick={handleBackToGrid}
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: '2px solid #374151',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d97706'
                  e.currentTarget.style.borderColor = '#374151'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f59e0b'
                  e.currentTarget.style.borderColor = '#374151'
                }}
              >
                ← Back to All
              </button>

              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  onClick={() => handleConceptClick(concept)}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    backgroundColor: selectedConcept.id === concept.id ? `${concept.color}1A` : 'rgba(31, 41, 55, 0.5)',
                    border: `2px solid ${selectedConcept.id === concept.id ? concept.color : '#374151'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.5)'
                      e.currentTarget.style.borderColor = '#4b5563'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)'
                      e.currentTarget.style.borderColor = '#374151'
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                    {concept.icon}
                  </div>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#fbbf24'
                  }}>
                    {concept.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Main content area */}
            <div>
              <div style={{
                backgroundColor: `${selectedConcept.color}0D`,
                padding: '2rem',
                borderRadius: '12px',
                border: `2px solid ${selectedConcept.color}33`,
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '3rem' }}>
                    {selectedConcept.icon}
                  </div>
                  <div>
                    <h2 style={{
                      fontSize: '2rem',
                      fontWeight: '800',
                      color: '#fbbf24',
                      margin: 0
                    }}>
                      {selectedConcept.name}
                    </h2>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#d1d5db',
                      margin: '0.5rem 0 0 0',
                      lineHeight: '1.6'
                    }}>
                      {selectedConcept.description}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                {selectedConcept.details.map((detail, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                      padding: '1.5rem',
                      borderRadius: '10px',
                      border: '2px solid #374151',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = selectedConcept.color
                      e.currentTarget.style.boxShadow = `0 4px 12px ${selectedConcept.color}20`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#374151'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#fbbf24',
                      margin: '0 0 0.75rem 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        backgroundColor: selectedConcept.color,
                        color: 'white',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: '700'
                      }}>
                        {idx + 1}
                      </span>
                      {detail.name}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: '#d1d5db',
                      margin: 0,
                      lineHeight: '1.7',
                      paddingLeft: '2.25rem'
                    }}>
                      {detail.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  )
}

export default FunctionalProgramming

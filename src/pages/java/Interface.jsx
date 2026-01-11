import { useState, useEffect, useRef } from 'react'
import { useModalFocus } from '../../hooks/useModalFocus'
import Breadcrumb from '../../components/Breadcrumb'

function Interface({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  // Comprehensive modal focus management
  const { modalRef, firstFocusableRef } = useModalFocus(onBack)

  const concepts = [
    {
      id: 'contract-programming',
      name: 'Contract Programming',
      icon: '📜',
      color: '#9333ea',
      description: 'Design approach where interfaces define behavioral contracts that implementations must fulfill',
      details: [
        {
          name: 'Interface as Contract',
          explanation: 'Interfaces define a contract - what operations are available and what behavior is expected. Implementations provide the "how" while the interface provides the "what". This separation allows clients to depend on contracts rather than concrete implementations.'
        },
        {
          name: 'Multiple Implementations',
          explanation: 'One interface can have many implementations, each providing different behavior while honoring the same contract. This enables polymorphism where different objects can be used interchangeably if they implement the same interface.'
        },
        {
          name: 'Type Safety with Generics',
          explanation: 'Generic interfaces provide compile-time type safety. Repository<User> and Repository<Product> ensure you can\'t accidentally mix types. The compiler catches type errors before runtime, preventing bugs and improving code reliability.'
        },
        {
          name: 'Documentation and Expectations',
          explanation: 'Good contracts include detailed documentation of preconditions, postconditions, and exceptions. This makes the interface self-documenting and helps developers understand exactly how to implement or use it correctly.'
        }
      ]
    },
    {
      id: 'dependency-injection',
      name: 'Dependency Injection',
      icon: '💉',
      color: '#8b5cf6',
      description: 'Pattern where objects receive dependencies from external sources rather than creating them',
      details: [
        {
          name: 'Constructor Injection',
          explanation: 'Dependencies are passed through the constructor, making them explicit, required, and immutable. This is the preferred method because it ensures objects are fully initialized and dependencies are clear. Constructor injection makes objects easier to test and reason about.'
        },
        {
          name: 'Dependency Inversion Principle',
          explanation: 'High-level modules should depend on abstractions (interfaces), not concrete implementations. Both high and low-level modules depend on interfaces. This inverts the traditional dependency structure and makes code more flexible and maintainable.'
        },
        {
          name: 'Mock Testing Benefits',
          explanation: 'Dependency injection makes testing easy by allowing mock implementations. You can inject test doubles instead of real dependencies, enabling isolated unit testing without external services, databases, or APIs. This makes tests fast, reliable, and independent.'
        },
        {
          name: 'Loose Coupling',
          explanation: 'Objects don\'t know about concrete dependencies, only interfaces. This loose coupling makes code more flexible - you can swap implementations without changing consumers. It also makes components more reusable across different contexts.'
        }
      ]
    },
    {
      id: 'strategy-pattern',
      name: 'Strategy Pattern',
      icon: '🎲',
      color: '#a855f7',
      description: 'Defines family of algorithms, encapsulates each one, and makes them interchangeable at runtime',
      details: [
        {
          name: 'Algorithm Encapsulation',
          explanation: 'Each algorithm is encapsulated in its own class implementing a common interface. This separates the algorithm from the code that uses it, making both easier to understand, test, and maintain independently.'
        },
        {
          name: 'Runtime Flexibility',
          explanation: 'Strategies can be selected and changed at runtime based on context or configuration. The client can switch between different algorithms dynamically without code changes, enabling flexible, adaptive behavior.'
        },
        {
          name: 'Eliminate Conditionals',
          explanation: 'Instead of complex if-else or switch statements to select behavior, you select a strategy object. This reduces cyclomatic complexity, makes code more maintainable, and makes it easy to add new strategies without modifying existing code.'
        },
        {
          name: 'Real-World Applications',
          explanation: 'Strategy pattern is used everywhere: payment processing (credit card vs PayPal), compression algorithms (ZIP vs GZIP), sorting strategies (by name vs price), and validation rules. It\'s one of the most practical design patterns.'
        }
      ]
    },
    {
      id: 'factory-pattern',
      name: 'Factory Pattern',
      icon: '🏭',
      color: '#f59e0b',
      description: 'Creates objects through interface without specifying exact class',
      details: [
        {
          name: 'Factory Method',
          explanation: 'Subclasses decide which class to instantiate. The factory method is defined in an abstract class, and concrete subclasses override it to create specific types. This follows the Open-Closed Principle - open for extension, closed for modification.'
        },
        {
          name: 'Abstract Factory',
          explanation: 'Creates families of related objects without specifying concrete classes. For example, a WindowsFactory creates Windows-style buttons and checkboxes, while MacFactory creates Mac-style components. This ensures consistent object families.'
        },
        {
          name: 'Simple Factory',
          explanation: 'A centralized factory class with a method that creates objects based on parameters. While not a "gang of four" pattern, it\'s practical for simple cases. It encapsulates object creation logic in one place, making it easy to manage.'
        },
        {
          name: 'Decoupling Creation',
          explanation: 'Clients don\'t use "new" directly - they call factory methods. This decouples client code from concrete classes, making it easier to change or extend what gets created without changing client code. It also allows for object pooling or caching.'
        }
      ]
    },
    {
      id: 'adapter-pattern',
      name: 'Adapter Pattern',
      icon: '🔌',
      color: '#06b6d4',
      description: 'Allows incompatible interfaces to work together by wrapping existing class',
      details: [
        {
          name: 'Interface Translation',
          explanation: 'Adapters convert one interface into another that clients expect. They act as translators between incompatible interfaces, making it possible to use existing code with new systems without modifying either one.'
        },
        {
          name: 'Legacy Integration',
          explanation: 'Adapters are crucial for integrating legacy systems. You can\'t modify old code, but you can wrap it with an adapter that provides a modern interface. This allows gradual modernization without big-bang rewrites.'
        },
        {
          name: 'Third-Party Libraries',
          explanation: 'When using third-party libraries with different interfaces than your application expects, adapters provide a consistent interface. This also isolates your code from external dependencies, making it easier to swap libraries later.'
        },
        {
          name: 'Object vs Class Adapters',
          explanation: 'Object adapters use composition - they hold a reference to the adapted object. Class adapters use inheritance. Object adapters are more flexible and follow composition-over-inheritance principle, making them the preferred approach in most cases.'
        }
      ]
    },
    {
      id: 'interface-segregation',
      name: 'Interface Segregation',
      icon: '✂️',
      color: '#ec4899',
      description: 'SOLID principle stating interfaces should be small and focused',
      details: [
        {
          name: 'Small, Focused Interfaces',
          explanation: 'Instead of one large interface with many methods, create multiple small interfaces with few methods each. Clients should not be forced to depend on methods they don\'t use. This makes code more flexible and reduces coupling.'
        },
        {
          name: 'Role-Based Interfaces',
          explanation: 'Design interfaces around roles or capabilities: Readable, Writable, Closeable, Seekable. Objects implement only the interfaces for capabilities they support. This prevents forcing objects to implement methods that don\'t make sense for them.'
        },
        {
          name: 'Avoiding Fat Interfaces',
          explanation: 'Fat interfaces force implementations to provide methods they don\'t need, often throwing UnsupportedOperationException or leaving empty implementations. This violates LSP and makes code fragile. Segregated interfaces prevent this problem.'
        },
        {
          name: 'Evolution and Maintenance',
          explanation: 'Small interfaces are easier to evolve and maintain. Adding a method to a large interface breaks all implementations. With segregated interfaces, you can add new interfaces without affecting existing code. Java 8 default methods also help with evolution.'
        }
      ]
    },
    {
      id: 'api-design',
      name: 'API Design',
      icon: '🎨',
      color: '#ef4444',
      description: 'Principles for designing clear, consistent, and maintainable APIs',
      details: [
        {
          name: 'Clear and Consistent Naming',
          explanation: 'Use consistent naming conventions: create/find/update/delete for CRUD, is/has for booleans, get for simple retrieval. Method names should clearly describe what they do. Parameters and returns should be well-documented with preconditions and exceptions.'
        },
        {
          name: 'Immutability and Builder Pattern',
          explanation: 'Prefer immutable configuration objects with builder pattern for complex setup. Builders provide a fluent, readable API for constructing objects with many optional parameters. Immutability makes objects thread-safe and easier to reason about.'
        },
        {
          name: 'Versioning Strategy',
          explanation: 'Plan for API evolution from the start. Use deprecation annotations, maintain backward compatibility, and version interfaces when making breaking changes. Consider using semantic versioning and providing migration paths for deprecated APIs.'
        },
        {
          name: 'Fail-Fast Design',
          explanation: 'Validate inputs eagerly and throw exceptions early with clear messages. Don\'t return null - use Optional for potentially missing values. Make invalid states unrepresentable. A well-designed API makes it hard to use incorrectly.'
        }
      ]
    },
    {
      id: 'polymorphism',
      name: 'Polymorphism via Interfaces',
      icon: '🎭',
      color: '#6366f1',
      description: 'Using interfaces to achieve runtime polymorphism',
      details: [
        {
          name: 'Interface Polymorphism',
          explanation: 'Different classes implementing the same interface can be treated uniformly. A List can be an ArrayList, LinkedList, or Vector - client code doesn\'t know or care. This enables writing generic, reusable code that works with any implementation.'
        },
        {
          name: 'Programming to Interfaces',
          explanation: 'Declare variables with interface types, not implementation types: List<String> not ArrayList<String>. This makes code more flexible - you can change implementations without changing client code. It\'s a fundamental best practice in Java.'
        },
        {
          name: 'Functional Interfaces',
          explanation: 'Interfaces with one abstract method (SAM) enable lambda expressions and method references. Predicate, Function, Consumer, and Supplier are functional interfaces that power Java\'s functional programming features and stream API.'
        },
        {
          name: 'Substitutability',
          explanation: 'Any implementation of an interface can substitute for another in client code. This is the Liskov Substitution Principle in action. It enables dependency injection, testing with mocks, and flexible architectures where behavior can be configured or changed at runtime.'
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #78350f, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
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
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
          >
            ← Back to Menu
          </button>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: '800',
              background: 'linear-gradient(to right, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Interface-Based Design
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#78350f',
                color: '#fbbf24',
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
                  backgroundColor: '#374151',
                  color: '#d1d5db',
                  border: '2px solid #4b5563',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8'
                  e.currentTarget.style.borderColor = '#6b7280'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#374151'
                  e.currentTarget.style.borderColor = '#4b5563'
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
                    backgroundColor: selectedConcept.id === concept.id ? `${concept.color}1A` : '#1f2937',
                    border: `2px solid ${selectedConcept.id === concept.id ? concept.color : '#374151'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = '#374151'
                      e.currentTarget.style.borderColor = '#4b5563'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = '#1f2937'
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

export default Interface

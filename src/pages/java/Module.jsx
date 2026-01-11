import { useState, useEffect, useRef } from 'react'
import { useModalFocus } from '../../hooks/useModalFocus'
import Breadcrumb from '../../components/Breadcrumb'

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null|module|exports|requires|provides|uses|opens|with|to|transitive)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Map|HashMap|Set|HashSet|ServiceLoader|Optional|Module|ModuleDescriptor|ModuleLayer|ModuleFinder|Configuration|Path|Paths)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/\b([A-Z][a-zA-Z0-9_]*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')
      .replace(/\b(\d+\.?\d*[fFdDlL]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      padding: '1rem',
      borderRadius: '8px',
      overflowX: 'auto',
      fontSize: '0.9rem',
      lineHeight: '1.5',
      border: '2px solid #8b5cf6',
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      whiteSpace: 'pre',
      textAlign: 'left',
      margin: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function Module({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  // Comprehensive modal focus management
  const { modalRef, firstFocusableRef } = useModalFocus(onBack)

  const concepts = [
    {
      id: 1,
      name: 'Domain-Driven Design',
      icon: '🏗️',
      color: '#9333ea',
      description: 'Strategic design patterns for complex business domains with ubiquitous language, bounded contexts, and rich domain models.',
      details: [
        { name: 'Ubiquitous Language', explanation: 'Domain-specific terminology shared between technical and business teams. Business concepts modeled directly in code using domain terms like "deposit" and "withdraw" instead of generic terms.' },
        { name: 'Bounded Context', explanation: 'Clear boundaries between different domain models. Same entity (Customer) has different meanings in Sales vs Support contexts, enabling independent evolution.' },
        { name: 'Aggregates', explanation: 'Consistency boundaries grouping related entities. Order aggregate maintains invariants like total matching line items, accessed only through aggregate root.' },
        { name: 'Domain Events', explanation: 'Record things that happened in the domain. Events like OrderPlaced enable loose coupling between bounded contexts and eventual consistency patterns.' }
      ]
    },
    {
      id: 2,
      name: 'Bounded Contexts',
      icon: '🔲',
      color: '#a855f7',
      description: 'Define clear boundaries between different domain models to manage complexity and enable independent evolution.',
      details: [
        { name: 'Context Mapping', explanation: 'Relationships between bounded contexts: Shared Kernel (shared code), Customer/Supplier (dependency relationship), Anti-Corruption Layer (translate external models).' },
        { name: 'Integration Patterns', explanation: 'How contexts communicate: REST APIs for Customer/Supplier, events for loosely coupled contexts, adapters to translate between models.' }
      ]
    },
    {
      id: 3,
      name: 'Microservices Patterns',
      icon: '🔧',
      color: '#8b5cf6',
      description: 'Architectural patterns for building distributed systems with independent, loosely coupled services.',
      details: [
        { name: 'Service Discovery', explanation: 'Dynamic service location with Eureka/Consul. Services register themselves, clients discover via service name, enables load balancing and failover.' },
        { name: 'API Gateway', explanation: 'Single entry point for all clients. Handles routing, authentication, rate limiting, circuit breaking, and protocol translation.' }
      ]
    },
    {
      id: 4,
      name: 'Event Sourcing',
      icon: '📜',
      color: '#f59e0b',
      description: 'Store all changes to application state as a sequence of events, enabling complete audit trails and temporal queries.',
      details: [
        { name: 'Event Store', explanation: 'Persist domain events instead of current state. Rebuild aggregate state by replaying events. Enables time travel, complete audit trail, and event-driven architectures.' },
        { name: 'Event Replay', explanation: 'Reconstruct aggregate state from event stream. Apply events in order to rebuild current state. Supports temporal queries and debugging.' }
      ]
    },
    {
      id: 5,
      name: 'CQRS',
      icon: '🔄',
      color: '#ec4899',
      description: 'Command Query Responsibility Segregation separates read and write operations for optimized performance and scalability.',
      details: [
        { name: 'Command Side', explanation: 'Write model validates commands and generates events. Optimized for consistency and transaction boundaries. Events stored in event store.' },
        { name: 'Query Side', explanation: 'Read model denormalized for fast queries. Built from events via projections. Multiple read models possible for different query patterns.' }
      ]
    },
    {
      id: 6,
      name: 'Hexagonal Architecture',
      icon: '⬡',
      color: '#14b8a6',
      description: 'Ports and Adapters pattern isolates business logic from external concerns, enabling independent testing and evolution.',
      details: [
        { name: 'Ports', explanation: 'Interfaces defining how domain interacts with outside world. OrderRepository port defines what domain needs, not how it\'s implemented.' },
        { name: 'Adapters', explanation: 'Implementations of ports. JpaOrderRepository adapter implements persistence, REST controller adapter drives the application. Easily swappable.' }
      ]
    },
    {
      id: 7,
      name: 'Saga Pattern',
      icon: '🔁',
      color: '#ef4444',
      description: 'Manage distributed transactions across microservices with compensating transactions for failure recovery.',
      details: [
        { name: 'Choreography', explanation: 'Event-driven coordination. Each service listens to events and publishes new ones. Decentralized, loosely coupled, but harder to understand flow.' },
        { name: 'Orchestration', explanation: 'Centralized coordinator manages saga flow. Easier to understand and debug. Coordinator handles compensation on failures in reverse order.' }
      ]
    },
    {
      id: 8,
      name: 'API Composition',
      icon: '🔗',
      color: '#6366f1',
      description: 'Combine data from multiple services to implement queries that span multiple microservices.',
      details: [
        { name: 'Backend for Frontend', explanation: 'API optimized for specific client type. Mobile BFF returns minimal data, Admin BFF returns comprehensive data. Reduces chattiness.' },
        { name: 'Parallel Composition', explanation: 'Fetch from multiple services concurrently using CompletableFuture. Combine results into single response. Improves performance over sequential calls.' }
      ]
    }
  ]

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }


  // Use ref to access current selectedConcept in event handler
  const selectedConceptRef = useRef(selectedConcept)
  useEffect(() => {
    selectedConceptRef.current = selectedConcept
  }, [selectedConcept])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentSelectedConcept = selectedConceptRef.current

      // Handle Escape to go back
      if (e.key === 'Escape') {
        if (currentSelectedConcept) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedConcept(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
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
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1f2937',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              📦 Modular Architecture
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

      <p style={{
        fontSize: '1.2rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Modular Architecture: Domain-driven design with bounded contexts and modular programming techniques. Covers event sourcing, CQRS, and hexagonal architecture.
      </p>

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
                e.currentTarget.style.backgroundColor = `${concept.color}1A`
                e.currentTarget.style.borderColor = concept.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 16px ${concept.color}33`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${concept.color}0D`
                e.currentTarget.style.borderColor = `${concept.color}33`
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{concept.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: concept.color,
                  margin: '0 0 0.5rem 0'
                }}>
                  {concept.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {concept.description.substring(0, 100)}...
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: concept.color,
                marginTop: '1rem'
              }}>
                Click to explore →
              </div>
            </div>
          ))
        ) : (
          <>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                Architecture Patterns
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {concepts.map((concept, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleConceptClick(concept)}
                    style={{
                      backgroundColor: selectedConcept?.name === concept.name
                        ? `${concept.color}26`
                        : `${concept.color}0D`,
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedConcept?.name === concept.name
                        ? `3px solid ${concept.color}`
                        : `2px solid ${concept.color}33`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedConcept?.name !== concept.name) {
                        e.currentTarget.style.backgroundColor = `${concept.color}1A`
                        e.currentTarget.style.borderColor = concept.color
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedConcept?.name !== concept.name) {
                        e.currentTarget.style.backgroundColor = `${concept.color}0D`
                        e.currentTarget.style.borderColor = `${concept.color}33`
                      }
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{concept.icon}</div>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: selectedConcept?.name === concept.name ? concept.color : '#1f2937',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {concept.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  backgroundColor: selectedConcept.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '1.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                ← Back to All Patterns
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: '3rem' }}>{selectedConcept.icon}</span>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: selectedConcept.color,
                  margin: 0
                }}>
                  {selectedConcept.name}
                </h3>
              </div>

              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                lineHeight: '1.8',
                marginBottom: '2rem'
              }}>
                {selectedConcept.description}
              </p>

              {selectedConcept.details.map((detail, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#f9fafb',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `2px solid ${selectedConcept.color}33`,
                  marginBottom: '1rem'
                }}>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: selectedConcept.color,
                    marginBottom: '0.75rem'
                  }}>
                    {detail.name}
                  </h4>
                  <p style={{
                    fontSize: '1rem',
                    color: '#374151',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    {detail.explanation}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Module

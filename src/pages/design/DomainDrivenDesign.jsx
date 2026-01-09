import { useState } from 'react'
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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|LinkedList|HashMap|TreeMap|HashSet|TreeSet|Map|Set|Queue|Deque|Collection|Arrays|Collections|Thread|Runnable|Executor|ExecutorService|CompletableFuture|Stream|Optional|Path|Files|Pattern|Matcher|StringBuilder|StringBuffer|Integer|Double|Float|Long|Short|Byte|Character|Boolean|Object|System|Math|Scanner|BufferedReader|FileReader|FileWriter|PrintWriter|InputStream|OutputStream|Exception|RuntimeException|IOException|SQLException|WeakReference|SoftReference|PhantomReference|ReferenceQueue)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function DomainDrivenDesign({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const { modalRef, firstFocusableRef } = useModalFocus(onBack)

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentContent = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.includes('// ═══════════════════════════════════════════════════════════════════════════')) {
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentContent.join('\n')
          })
          currentContent = []
        }

        if (i + 1 < lines.length && lines[i + 1].includes('// ✦')) {
          currentSection = lines[i + 1].replace('// ✦', '').trim()
          i += 2
          continue
        }
      }

      if (currentSection) {
        currentContent.push(line)
      }
    }

    if (currentSection && currentContent.length > 0) {
      sections.push({
        title: currentSection,
        code: currentContent.join('\n')
      })
    }

    return sections
  }

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
    setExpandedSections({})
  }

  const dddPatterns = [
    {
      name: 'Bounded Context',
      icon: '🗺️',
      explanation: `A Bounded Context is a central pattern in DDD that defines explicit boundaries within which a domain model is valid. Each bounded context has its own ubiquitous language and can be independently developed and deployed.

Key Benefits:
• Clear boundaries and responsibilities
• Independent evolution of models
• Reduces coupling between domains
• Enables team autonomy
• Supports microservices architecture
• Prevents model confusion across contexts
• Facilitates strategic design decisions
• Allows multiple models of same concept

Context Mapping Patterns: Shared Kernel, Customer-Supplier, Conformist, Anti-Corruption Layer, Separate Ways, Open Host Service.

Technologies: Spring Boot microservices, API Gateway, GraphQL Federation, Event-Driven Integration.`,
      diagram: () => (
        <svg viewBox="0 0 700 400" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="bc1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="bc2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="bc3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect x="30" y="50" width="200" height="280" rx="12" fill="url(#bc1)" stroke="#0d9488" strokeWidth="3" />
          <text x="130" y="80" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Order Context</text>
          <rect x="50" y="100" width="160" height="50" rx="6" fill="rgba(255,255,255,0.2)" />
          <text x="130" y="128" fontSize="12" fill="white" textAnchor="middle">Order Aggregate</text>
          <rect x="50" y="170" width="160" height="50" rx="6" fill="rgba(255,255,255,0.2)" />
          <text x="130" y="198" fontSize="12" fill="white" textAnchor="middle">Customer Entity</text>
          <rect x="50" y="240" width="160" height="50" rx="6" fill="rgba(255,255,255,0.2)" />
          <text x="130" y="268" fontSize="12" fill="white" textAnchor="middle">Product VO</text>
          
          <rect x="260" y="50" width="200" height="280" rx="12" fill="url(#bc2)" stroke="#0891b2" strokeWidth="3" />
          <text x="360" y="80" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Payment Context</text>
          <rect x="280" y="100" width="160" height="50" rx="6" fill="rgba(255,255,255,0.2)" />
          <text x="360" y="128" fontSize="12" fill="white" textAnchor="middle">Payment Aggregate</text>
          <rect x="280" y="170" width="160" height="50" rx="6" fill="rgba(255,255,255,0.2)" />
          <text x="360" y="198" fontSize="12" fill="white" textAnchor="middle">Transaction Entity</text>
          <rect x="280" y="240" width="160" height="50" rx="6" fill="rgba(255,255,255,0.2)" />
          <text x="360" y="268" fontSize="12" fill="white" textAnchor="middle">Money VO</text>

          <rect x="490" y="50" width="180" height="280" rx="12" fill="url(#bc3)" stroke="#7c3aed" strokeWidth="3" />
          <text x="580" y="80" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Shipping Context</text>
          <rect x="510" y="100" width="140" height="50" rx="6" fill="rgba(255,255,255,0.2)" />
          <text x="580" y="128" fontSize="12" fill="white" textAnchor="middle">Shipment</text>
          <rect x="510" y="170" width="140" height="50" rx="6" fill="rgba(255,255,255,0.2)" />
          <text x="580" y="198" fontSize="12" fill="white" textAnchor="middle">Address VO</text>

          <path d="M 230 190 L 260 190" stroke="#fbbf24" strokeWidth="3" strokeDasharray="5,5" />
          <text x="245" y="182" fontSize="10" fill="#fbbf24" fontWeight="600" textAnchor="middle">ACL</text>
          <path d="M 460 190 L 490 190" stroke="#fbbf24" strokeWidth="3" strokeDasharray="5,5" />
          <text x="475" y="182" fontSize="10" fill="#fbbf24" fontWeight="600" textAnchor="middle">ACL</text>

          <text x="350" y="370" fontSize="13" fill="#6b7280" textAnchor="middle" fontStyle="italic">
            Each context has its own model and ubiquitous language
          </text>
        </svg>
      ),
      codeExample: `// PLACEHOLDER - See implementation`
    }
  ]

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #111827, #1f2937, #111827)',
      minHeight: '100vh',
      padding: '2rem'
    }}>
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        padding: '2rem',
        maxWidth: '1600px',
        margin: '0 auto',
        backgroundColor: '#111827',
        borderRadius: '16px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        border: '3px solid rgba(20, 184, 166, 0.4)'
      }}>
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
              backgroundColor: '#14b8a6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(20, 184, 166, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d9488'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#14b8a6'}
          >
            ← Back to Menu
          </button>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'white',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Domain Driven Design
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#ccfbf1',
                color: '#115e59',
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
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
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
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8b5cf6'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        backgroundColor: 'rgba(20, 184, 166, 0.15)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(20, 184, 166, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#d1d5db',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Domain-Driven Design (DDD) is a software development approach that focuses on modeling complex business domains through strategic and tactical patterns. It emphasizes collaboration between technical and domain experts using ubiquitous language.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          dddPatterns.map((pattern, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(pattern)}
              style={{
                backgroundColor: 'rgba(20, 184, 166, 0.05)',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid rgba(20, 184, 166, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.1)'
                e.currentTarget.style.borderColor = '#14b8a6'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(20, 184, 166, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{pattern.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#14b8a6',
                  margin: '0 0 0.5rem 0'
                }}>
                  {pattern.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#d1d5db',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {pattern.explanation.substring(0, 100)}...
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#14b8a6',
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
                color: 'white',
                marginBottom: '1.5rem'
              }}>
                DDD Patterns
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {dddPatterns.map((pattern, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleConceptClick(pattern)}
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedConcept?.name === pattern.name
                        ? '2px solid #14b8a6'
                        : '2px solid rgba(20, 184, 166, 0.2)',
                      backgroundColor: selectedConcept?.name === pattern.name
                        ? 'rgba(20, 184, 166, 0.2)'
                        : 'rgba(20, 184, 166, 0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedConcept?.name !== pattern.name) {
                        e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.15)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedConcept?.name !== pattern.name) {
                        e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.1)'
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{pattern.icon}</span>
                      <span style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: selectedConcept?.name === pattern.name ? '#14b8a6' : 'white'
                      }}>
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              backgroundColor: '#111827',
              borderRadius: '12px',
              padding: '2rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <span style={{ fontSize: '3rem' }}>{selectedConcept.icon}</span>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: 'white',
                  margin: 0
                }}>
                  {selectedConcept.name}
                </h2>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                {selectedConcept.diagram && selectedConcept.diagram()}
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#14b8a6',
                  margin: '0 0 1rem 0'
                }}>
                  Explanation
                </h4>
                <p style={{
                  fontSize: '1rem',
                  color: '#d1d5db',
                  lineHeight: '1.8',
                  whiteSpace: 'pre-line',
                  margin: 0
                }}>
                  {selectedConcept.explanation}
                </p>
              </div>

              <div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#14b8a6',
                  margin: '0 0 1rem 0'
                }}>
                  Code Examples
                </h4>
                {(() => {
                  const sections = parseCodeSections(selectedConcept.codeExample)
                  if (sections.length === 0) {
                    return (
                      <div style={{
                        backgroundColor: '#1e293b',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '2px solid #334155'
                      }}>
                        <SyntaxHighlighter code={selectedConcept.codeExample} />
                      </div>
                    )
                  }
                  return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {sections.map((section, index) => {
                        const sectionKey = `${selectedConcept.name}-${index}`
                        const isExpanded = expandedSections[sectionKey]
                        return (
                          <div
                            key={index}
                            style={{
                              backgroundColor: '#1f2937',
                              borderRadius: '12px',
                              border: '2px solid rgba(20, 184, 166, 0.3)',
                              overflow: 'hidden'
                            }}
                          >
                            <button
                              onClick={() => toggleSection(sectionKey)}
                              style={{
                                width: '100%',
                                padding: '1.25rem',
                                backgroundColor: isExpanded ? 'rgba(20, 184, 166, 0.25)' : '#1f2937',
                                border: 'none',
                                borderBottom: isExpanded ? '2px solid rgba(20, 184, 166, 0.3)' : 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                                textAlign: 'left'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.25)'
                              }}
                              onMouseLeave={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.style.backgroundColor = '#1f2937'
                                }
                              }}
                            >
                              <span style={{
                                fontSize: '1.05rem',
                                fontWeight: '700',
                                color: '#14b8a6'
                              }}>
                                {section.title}
                              </span>
                              <span style={{
                                fontSize: '1.5rem',
                                color: '#14b8a6',
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                              }}>
                                ▼
                              </span>
                            </button>
                            {isExpanded && (
                              <div style={{
                                backgroundColor: '#1e293b',
                                padding: '1.5rem'
                              }}>
                                <SyntaxHighlighter code={section.code} />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  )
}

export default DomainDrivenDesign

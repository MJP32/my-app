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

    // Store protected content with placeholders
    const protectedContent = []
    let placeholder = 0

    // Protect comments first
    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting to remaining code
    highlighted = highlighted
      // Keywords - purple
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')

      // Boolean and primitives - blue
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')

      // Types and classes - light green
      .replace(/\b(String|List|ArrayList|LinkedList|HashMap|TreeMap|HashSet|TreeSet|Map|Set|Queue|Deque|Collection|Arrays|Collections|Thread|Runnable|Executor|ExecutorService|CompletableFuture|Stream|Optional|Path|Files|Pattern|Matcher|StringBuilder|StringBuffer|Integer|Double|Float|Long|Short|Byte|Character|Boolean|Object|System|Math|Scanner|BufferedReader|FileReader|FileWriter|PrintWriter|InputStream|OutputStream|Exception|RuntimeException|IOException|SQLException|WeakReference|SoftReference|PhantomReference|ReferenceQueue)\b/g, '<span style="color: #4ec9b0;">$1</span>')

      // Annotations - yellow
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

      // Numbers - light green
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')

      // Method calls - yellow
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    // Restore protected content
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

function EventDrivenArchitecture({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
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

  const edaPatterns = [
    {
      name: 'Publish-Subscribe (Pub/Sub)',
      icon: '📢',
      explanation: `Publish-Subscribe is a messaging pattern where publishers emit events without knowledge of subscribers. Subscribers express interest in event types and receive matching events asynchronously. This decouples publishers from consumers, enabling scalable, loosely-coupled architectures.

Key Benefits:
• Loose coupling between publishers and subscribers
• Dynamic subscription management at runtime
• Multiple subscribers can receive the same event
• Scalable fan-out of events to many consumers
• Publishers don't need to know about subscribers
• Supports both point-to-point and broadcast patterns
• Easy to add new subscribers without modifying publishers
• Ideal for real-time data distribution and notifications

Technologies: Apache Kafka, RabbitMQ, AWS SNS/SQS, Azure Service Bus, Google Pub/Sub, Redis Pub/Sub, Spring Cloud Stream.`,
      diagram: () => (
        <svg viewBox="0 0 700 400" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="pubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="subGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowPub" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#ec4899" />
            </marker>
          </defs>
          <rect x="50" y="50" width="160" height="80" rx="10" fill="url(#pubGrad)" />
          <text x="130" y="85" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Publisher 1</text>
          <text x="130" y="105" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">OrderService</text>
          <rect x="50" y="160" width="160" height="80" rx="10" fill="url(#pubGrad)" />
          <text x="130" y="195" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Publisher 2</text>
          <text x="130" y="215" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">InventoryService</text>
          <rect x="270" y="120" width="160" height="100" rx="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
          <text x="350" y="155" fontSize="15" fontWeight="bold" fill="#78350f" textAnchor="middle">Topic/Exchange</text>
          <text x="350" y="180" fontSize="12" fill="#78350f" opacity="0.8" textAnchor="middle">"order-events"</text>
          <rect x="490" y="30" width="150" height="60" rx="8" fill="url(#subGrad)" />
          <text x="565" y="58" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">EmailService</text>
          <rect x="490" y="110" width="150" height="60" rx="8" fill="url(#subGrad)" />
          <text x="565" y="138" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">NotificationService</text>
          <rect x="490" y="190" width="150" height="60" rx="8" fill="url(#subGrad)" />
          <text x="565" y="218" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">AnalyticsService</text>
          <rect x="490" y="270" width="150" height="60" rx="8" fill="url(#subGrad)" />
          <text x="565" y="298" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">AuditService</text>
          <line x1="210" y1="90" x2="270" y2="150" stroke="#ec4899" strokeWidth="3" markerEnd="url(#arrowPub)" />
          <line x1="210" y1="200" x2="270" y2="180" stroke="#ec4899" strokeWidth="3" markerEnd="url(#arrowPub)" />
          <line x1="430" y1="150" x2="490" y2="60" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowPub)" />
          <line x1="430" y1="160" x2="490" y2="140" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowPub)" />
          <line x1="430" y1="175" x2="490" y2="220" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowPub)" />
          <line x1="430" y1="190" x2="490" y2="300" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowPub)" />
          <text x="350" y="365" fontSize="13" fill="#6b7280" textAnchor="middle" fontStyle="italic">
            Publishers emit → Topic routes → Subscribers consume
          </text>
        </svg>
      ),
      codeExample: `// PLACEHOLDER - See full code`
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
        border: '3px solid rgba(236, 72, 153, 0.4)'
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
              backgroundColor: '#ec4899',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(236, 72, 153, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#db2777'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ec4899'}
          >
            ← Back to Design
          </button>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'white',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Event Driven Architecture
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: 'rgba(236, 72, 153, 0.3)',
                color: '#f9a8d4',
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
        backgroundColor: 'rgba(236, 72, 153, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(236, 72, 153, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Event-Driven Architecture (EDA) is a software design pattern where system components communicate through events.
          Events represent state changes or significant occurrences, enabling loosely-coupled, scalable, and reactive systems.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {edaPatterns.map((pattern, idx) => (
          <div
            key={idx}
            onClick={() => handleConceptClick(pattern)}
            style={{
              backgroundColor: 'rgba(236, 72, 153, 0.05)',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid rgba(236, 72, 153, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.1)'
              e.currentTarget.style.borderColor = '#ec4899'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(236, 72, 153, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.05)'
              e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{pattern.icon}</div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#ec4899',
                margin: '0 0 0.5rem 0'
              }}>
                {pattern.name}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {pattern.explanation.substring(0, 100)}...
              </p>
            </div>
            <div style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#ec4899',
              marginTop: '1rem'
            }}>
              Click to explore →
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default EventDrivenArchitecture;

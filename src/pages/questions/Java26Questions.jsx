import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function Java26Questions({ onBack, breadcrumb, problemLimit }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const [activeCategory, setActiveCategory] = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'java'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'java'
          codeLines = []
        } else {
          // End of code block
          inCodeBlock = false
          const codeString = codeLines.join('\n')
          result.push(
            <div key={`code-${lineIndex}`} style={{ margin: '1.5rem 0', textAlign: 'left' }}>
              <SyntaxHighlighter
                language={codeLanguage}
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  padding: '1rem',
                  textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#000000'
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          )
          codeLines = []
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      // Empty lines for spacing
      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

      // Bullet points (lines starting with -)
      const bulletMatch = line.match(/^(\s*)-\s+(.+)$/)
      if (bulletMatch) {
        const indentLevel = bulletMatch[1].length
        const bulletContent = bulletMatch[2]
        result.push(
          <div
            key={lineIndex}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginLeft: `${indentLevel * 0.5 + 1}rem`,
              marginTop: '0.5rem',
              textAlign: 'left',
              lineHeight: '1.6'
            }}
          >
            <span style={{
              color: '#3b82f6',
              marginRight: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: '1.4'
            }}>
              •
            </span>
            <span style={{ flex: 1 }}>{bulletContent}</span>
          </div>
        )
        continue
      }

      // Bold section headers (e.g., **What is RFQ?**)
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
        continue
      }

      // Numbered section headers (e.g., **1. Client Initiates:**)
      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
        continue
      }

      // Regular text with subtle left padding
      result.push(
        <div
          key={lineIndex}
          style={{
            textAlign: 'left',
            marginTop: '0.25rem',
            paddingLeft: '0.5rem',
            lineHeight: '1.6',
            color: '#e5e7eb'
          }}
        >
          {line}
        </div>
      )
    }

    return result
  }

  const questions = [
    {
      id: 1,
      category: 'Overview',
      question: 'What is Java 26 and when is it released?',
      difficulty: 'Easy',
      answer: `**Java 26 (JDK 26):**
- The feature release that follows the Java 25 LTS
- Targeted for **March 2026** under the six-month cadence
- A non-LTS release (next LTS after 25 is expected to be 29)

**Important - status:**
- At the time of writing, JDK 26 is in early access / rampdown
- The JEP list is still being finalized
- Treat the features here as **targeted/candidate** and confirm against the official JDK 26 schedule and JEP index

**Trying it out:**
\`\`\`java
// Check version
//   java --version
//
// Compile and run preview features
//   javac --release 26 --enable-preview Main.java
//   java --enable-preview Main
\`\`\`

**Themes carried forward from Java 25:**
- Project Valhalla (value classes)
- Project Leyden (faster startup via AOT)
- Stable / lazy constants
- Structured concurrency
- Primitive types in patterns`
    },
    {
      id: 2,
      category: 'Valhalla',
      question: 'What are Value Classes and Objects (Project Valhalla) targeted for Java 26?',
      difficulty: 'Hard',
      answer: `**Value Classes & Objects (Project Valhalla) - preview/proposed:**
- A value class declares that its instances have **no identity**
- Instances are defined solely by their field values (like \`int\` or a record\`s contents)
- Without identity, the JVM may **flatten** instances inline and avoid heap allocation

\`\`\`java
// Proposed syntax (preview - subject to change before GA)
value class Point {
    private final int x;
    private final int y;
    Point(int x, int y) { this.x = x; this.y = y; }
    int x() { return x; }
    int y() { return y; }
}

Point[] line = new Point[1000];   // potentially stored inline (no per-element heap object)
\`\`\`

**Why it matters:**
- Combines the abstraction of objects with the memory/perf profile of primitives
- Better cache locality, fewer allocations, less pointer chasing
- Foundation for specialized generics over primitives in the future

**Caveat:** exact syntax, semantics (e.g. \`==\`), and the JEP number may change. Verify against the final JDK 26 release notes.`
    },
    {
      id: 3,
      category: 'Language Features',
      question: 'How do Lazy Constants / Stable Values evolve in Java 26?',
      difficulty: 'Medium',
      answer: `**Lazy Constants / Stable Values (continued preview):**
- A holder initialized **at most once**, then treated by the JVM as a constant
- Gives safe lazy initialization with final-field performance
- No \`volatile\` fields and no double-checked locking

\`\`\`java
class Registry {
    private final StableValue<Index> index = StableValue.of();

    Index index() {
        return index.orElseSet(this::buildIndex);  // computed once, then constant-folded
    }
}
\`\`\`

**Benefits:**
- Decouples *when* initialization happens from *how fast* later reads are
- Replaces hand-written lazy-holder idioms
- Plays well with startup-time optimizations (Project Leyden)

**Note:** API names/shape are still settling across preview rounds; confirm against final JDK 26 docs.`
    },
    {
      id: 4,
      category: 'Concurrency',
      question: 'What is the state of Structured Concurrency and Primitive Patterns in Java 26?',
      difficulty: 'Medium',
      answer: `**Structured Concurrency (continued preview):**
- \`StructuredTaskScope\` models a group of subtasks as one unit of work
- Parent waits for all children; failure/cancellation propagates - no orphaned tasks
- Joiner strategies make all-success / any-success patterns concise

\`\`\`java
try (var scope = StructuredTaskScope.open()) {
    var a = scope.fork(() -> callServiceA());
    var b = scope.fork(() -> callServiceB());
    scope.join();                 // wait for both
    return combine(a.get(), b.get());
}
\`\`\`

**Primitive Types in Patterns (continued preview):**
- Primitive patterns in \`instanceof\` and \`switch\` advance another round toward finalization
- Uniform, exhaustive, range-checked matching across reference and primitive types

\`\`\`java
String classify(Object o) {
    return switch (o) {
        case Integer i when i > 0 -> "positive int";
        case int n               -> "int " + n;
        case String s            -> "text " + s;
        default                  -> "other";
    };
}
\`\`\`

**Reminder:** both remain preview features in JDK 26 - enable with \`--enable-preview\`.`
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const limitedQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const questionsForCategoryCount = limitedQuestions.filter(q =>
    activeDifficulty === 'All' || q.difficulty === activeDifficulty
  )
  const categoryCounts = questionsForCategoryCount.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1
    return acc
  }, {})
  const availableCategories = ['All', ...Object.keys(categoryCounts).sort((a, b) => {
    const diff = categoryCounts[b] - categoryCounts[a]
    return diff !== 0 ? diff : a.localeCompare(b)
  })]

  const difficultyOrder = ['Easy', 'Medium', 'Hard']
  const difficultyCounts = limitedQuestions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1
    return acc
  }, {})
  const availableDifficulties = ['All', ...difficultyOrder.filter(d => difficultyCounts[d])]

  const displayQuestions = limitedQuestions.filter(q =>
    (activeCategory === 'All' || q.category === activeCategory) &&
    (activeDifficulty === 'All' || q.difficulty === activeDifficulty)
  )
  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Overview': '#64748b',
      'Valhalla': '#8b5cf6',
      'Language Features': '#22c55e',
      'Concurrency': '#3b82f6'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
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
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#f9fafb',
          margin: 0
        }}>
          Java 26 Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <CollapsibleSidebar
        items={displayQuestions}
        selectedIndex={expandedQuestion ? displayQuestions.findIndex(q => q.id === expandedQuestion) : -1}
        onSelect={(index) => toggleQuestion(displayQuestions[index].id)}
        title="Questions"
        getItemLabel={(item) => `${item.id}. ${item.category}`}
        getItemIcon={() => '❓'}
        primaryColor="#3b82f6"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Java 26 interview questions covering the latest features and enhancements in this release.
      </p>


      {/* Difficulty Filter Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '0.75rem',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: '600', marginRight: '0.25rem' }}>Difficulty:</span>
        {availableDifficulties.map((diff) => {
          const isActive = activeDifficulty === diff
          const count = diff === 'All' ? limitedQuestions.length : (difficultyCounts[diff] || 0)
          const color = diff === 'Easy' ? '#22c55e' : diff === 'Medium' ? '#f59e0b' : diff === 'Hard' ? '#ef4444' : '#3b82f6'
          return (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                fontWeight: isActive ? '700' : '500',
                background: isActive ? `${color}25` : 'rgba(31, 41, 55, 0.6)',
                color: isActive ? color : '#9ca3af',
                border: `1px solid ${isActive ? color : '#374151'}`,
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `${color}15`
                  e.currentTarget.style.color = color
                  e.currentTarget.style.borderColor = `${color}80`
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)'
                  e.currentTarget.style.color = '#9ca3af'
                  e.currentTarget.style.borderColor = '#374151'
                }
              }}
            >
              <span>{diff}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.1rem 0.4rem',
                borderRadius: '999px',
                background: isActive ? color : '#374151',
                color: isActive ? '#fff' : '#9ca3af',
                fontWeight: '700',
                minWidth: '1.5rem',
                textAlign: 'center'
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Category Filter Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #374151'
      }}>
        {availableCategories.map((cat) => {
          const isActive = activeCategory === cat
          const count = cat === 'All' ? questionsForCategoryCount.length : (categoryCounts[cat] || 0)
          const color = cat === 'All' ? '#3b82f6' : getCategoryColor(cat)
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 0.9rem',
                fontSize: '0.85rem',
                fontWeight: isActive ? '700' : '500',
                background: isActive ? `${color}25` : 'rgba(31, 41, 55, 0.6)',
                color: isActive ? color : '#9ca3af',
                border: `1px solid ${isActive ? color : '#374151'}`,
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `${color}15`
                  e.currentTarget.style.color = color
                  e.currentTarget.style.borderColor = `${color}80`
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)'
                  e.currentTarget.style.color = '#9ca3af'
                  e.currentTarget.style.borderColor = '#374151'
                }
              }}
            >
              <span>{cat}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.1rem 0.45rem',
                borderRadius: '999px',
                background: isActive ? color : '#374151',
                color: isActive ? '#fff' : '#9ca3af',
                fontWeight: '700',
                minWidth: '1.5rem',
                textAlign: 'center'
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayQuestions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#374151'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: getCategoryColor(q.category),
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {q.category}
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                  <CompletionCheckbox problemId={`Java26Questions-${q.id}`} />
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  color: getCategoryColor(q.category),
                  fontWeight: 'bold',
                  transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
              </div>
            </button>

            {expandedQuestion === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  textAlign: 'left'
                }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(249, 115, 22, 0.15)',
        borderRadius: '12px',
        border: '2px solid #f97316'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fb923c', marginBottom: '0.5rem' }}>
          Java 26 Key Features
        </h3>
        <ul style={{ color: '#fdba74', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Stream Gatherers - Custom intermediate stream operations</li>
          <li>Class-File API (Second Preview) - Parse and generate class files</li>
          <li>Scoped Values (Third Preview) - Better alternative to ThreadLocal</li>
          <li>Primitive Patterns (Preview) - Pattern matching on primitive types</li>
          <li>Structured Concurrency (Second Preview) - Simplified concurrent programming</li>
          <li>Foreign Function & Memory API - Native interop improvements</li>
        </ul>
      </div>
    </div>
  )
}

export default Java26Questions

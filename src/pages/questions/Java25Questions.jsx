import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function Java25Questions({ onBack, breadcrumb, problemLimit }) {
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
      category: 'Language Features',
      question: 'What are Compact Source Files and instance main methods in Java 25 (JEP 512)?',
      difficulty: 'Easy',
      answer: `**Compact Source Files & Instance main (JEP 512) - finalized in Java 25:**
- Write a runnable program with no class declaration
- No \`public static\`, no \`String[] args\` required
- \`main\` can be an instance method with no parameters
- New \`java.lang.IO\` class provides \`println\`/\`print\`/\`readln\`

**Before (classic):**
\`\`\`java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

**After (Java 25):**
\`\`\`java
void main() {
    IO.println("Hello, World!");
}
\`\`\`

**Why it matters:**
- Removes ceremony that confuses beginners
- A compact source file is wrapped in an implicitly declared class
- Top-level fields and helper methods are allowed
- Run a single file directly: \`java Hello.java\`

**Notes:**
- Great for learning, scripts, and small tools
- You can still evolve into a normal class later`
    },
    {
      id: 2,
      category: 'Language Features',
      question: 'How do Module Import Declarations (JEP 511) and Flexible Constructor Bodies (JEP 513) work?',
      difficulty: 'Medium',
      answer: `**Module Import Declarations (JEP 511) - finalized:**
- \`import module M;\` imports the entire public API exported by module M
- Replaces many single-type imports with one line

\`\`\`java
import module java.base;   // List, Map, Set, Stream, Optional, Path, ...

void main() {
    var upper = List.of("a", "b").stream()
                    .map(String::toUpperCase)
                    .toList();
    IO.println(upper);
}
\`\`\`

**Flexible Constructor Bodies (JEP 513) - finalized:**
- Statements may run BEFORE an explicit \`super(...)\` or \`this(...)\`
- The prologue must not reference the instance being constructed
- Lets you validate arguments before delegating

\`\`\`java
class PositivePoint extends Point {
    PositivePoint(int x, int y) {
        if (x < 0 || y < 0)                       // prologue
            throw new IllegalArgumentException();
        super(x, y);                              // explicit super after checks
    }
}
\`\`\`

**Benefit:** no more static helper methods just to validate constructor args.`
    },
    {
      id: 3,
      category: 'Concurrency',
      question: 'Explain Scoped Values (JEP 506) finalized in Java 25 and how they compare to ThreadLocal.',
      difficulty: 'Medium',
      answer: `**Scoped Values (JEP 506) - finalized in Java 25:**
- An immutable value bound for the dynamic extent of a call
- Shared with all methods and child virtual threads in that scope
- No parameter threading required

\`\`\`java
static final ScopedValue<User> CURRENT_USER = ScopedValue.newInstance();

void handle(Request req) {
    ScopedValue.where(CURRENT_USER, req.user())
               .run(() -> processRequest());
}

void processRequest() {
    User u = CURRENT_USER.get();   // available throughout the scope
}
\`\`\`

**Scoped Values vs ThreadLocal:**

| Aspect | ScopedValue | ThreadLocal |
|--------|-------------|-------------|
| Mutability | Immutable | Mutable (set anytime) |
| Lifetime | Bounded by scope | Until removed / GC |
| Cleanup | Automatic at scope end | Manual remove() (leak risk) |
| Virtual threads | Cheap to inherit | Costly per-thread copies |

**Why it matters:** with millions of virtual threads, ThreadLocal is expensive and leak-prone; ScopedValues are cheap, safe, and clearly scoped.`
    },
    {
      id: 4,
      category: 'Pattern Matching',
      question: 'What are Primitive Types in Patterns (JEP 507) in Java 25?',
      difficulty: 'Medium',
      answer: `**Primitive Types in Patterns, instanceof, and switch (JEP 507) - preview:**
- Pattern matching now works with primitive types
- \`instanceof\` performs a safe range check
- \`switch\` can match primitive values and use guards
- Record deconstruction can bind primitive components

\`\`\`java
// Safe range check
if (i instanceof byte b) {   // only matches if i fits in a byte
    use(b);
}

// switch over a primitive with patterns and guards
String describe(int x) {
    return switch (x) {
        case 0                -> "zero";
        case int n when n < 0 -> "negative";
        default               -> "positive";
    };
}

// primitive components in a record pattern
record Point(int x, int y) {}
if (p instanceof Point(int x, int y)) { plot(x, y); }
\`\`\`

**Why it matters:** closes a gap so exhaustive, type-safe matching works uniformly for both reference and primitive types. (Preview - enable with \`--enable-preview\`.)`
    },
    {
      id: 5,
      category: 'Performance',
      question: 'What performance and runtime improvements ship in Java 25 (Compact Object Headers, Generational Shenandoah, AOT)?',
      difficulty: 'Hard',
      answer: `**1) Compact Object Headers (JEP 519) - finalized as product:**
- 64-bit object headers shrink from 96-128 bits to 64 bits
- Less heap footprint, better cache density, faster allocation

\`\`\`java
java -XX:+UseCompactObjectHeaders -jar app.jar
\`\`\`

**2) Generational Shenandoah (JEP 521) - finalized:**
- Collects young objects separately from old ones
- Better throughput, fewer full-heap cycles, still low pause times

\`\`\`java
java -XX:+UseShenandoahGC -XX:ShenandoahGCMode=generational -jar app.jar
\`\`\`

**3) Ahead-of-Time profiling & ergonomics (JEP 514 / 515, Project Leyden):**
- Simpler AOT setup and method-profile recording ahead of time
- JIT produces optimized code sooner -> faster warmup

\`\`\`java
java -XX:AOTMode=record -XX:AOTConfiguration=app.aotconf -jar app.jar
java -XX:AOTMode=create -XX:AOTConfiguration=app.aotconf -XX:AOTCache=app.aot -jar app.jar
java -XX:AOTCache=app.aot -jar app.jar
\`\`\`

**Also in Java 25:** Key Derivation Function API (JEP 510, final), PEM encodings (JEP 470, preview), Stable Values (JEP 502, preview), Structured Concurrency (JEP 505, preview), JFR CPU-time profiling (experimental), removal of the 32-bit x86 port (JEP 503).

**Bottom line:** Java 25 is an LTS focused on simpler on-ramp syntax plus real memory and startup wins for servers.`
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
      'Language Features': '#22c55e',
      'Concurrency': '#3b82f6',
      'Pattern Matching': '#8b5cf6',
      'Performance': '#ec4899'
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
          Java 25 Interview Questions
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
        Java 25 interview questions covering the latest features and enhancements in this release.
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
                  <CompletionCheckbox problemId={`Java25Questions-${q.id}`} />
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
          Java 25 Key Features
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

export default Java25Questions

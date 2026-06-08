/**
 * Java 25 LTS Features
 *
 * Covers new Java 25 features including Module Import Declarations,
 * Scoped Values, Stream Gatherers, and Class-File API.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const JAVA25_COLORS = {
  primary: '#14b8a6',
  primaryHover: '#2dd4bf',
  bg: 'rgba(20, 184, 166, 0.1)',
  border: 'rgba(20, 184, 166, 0.3)',
  arrow: '#14b8a6',
  hoverBg: 'rgba(20, 184, 166, 0.2)',
  topicBg: 'rgba(20, 184, 166, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]


// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Java25({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'language-on-ramp',
      name: 'Language On-Ramp',
      icon: '🚀',
      color: '#22c55e',
      description: 'Java 25 (LTS) finalizes features that make small programs and beginner code far simpler: compact source files, an instance main method, and module import declarations.',
      details: [
        {
          name: 'Compact Source Files & Instance main (JEP 512)',
          explanation: 'Finalized in Java 25. You can write a runnable program without a class declaration, without "public static", and without String[] args. A compact source file holds fields and methods at the top level wrapped in an implicitly declared class. main may be an instance method with no parameters. The new java.lang.IO class provides println/print/readln so beginners do not need System.out.',
          codeExample: `// Hello.java  (Java 25, finalized)
void main() {
    IO.println("Hello, World!");
}

// Run directly, no explicit compile step:
//   java Hello.java

// Top-level fields and helper methods are allowed too:
String greeting = "Hi";

void main() {
    IO.println(greeting + ", from " + name());
}

String name() { return "Java 25"; }`
        },
        {
          name: 'Module Import Declarations (JEP 511)',
          explanation: 'Finalized in Java 25. "import module M;" imports the entire public API exported by module M in a single line, removing the need for many single-type imports. The compiler resolves the transitive exports of the named module. Ideal for scripts and learning.',
          codeExample: `// One line pulls in List, Map, Set, Stream, Optional, Path, etc.
import module java.base;

void main() {
    var names = List.of("Ann", "Bob", "Cy");
    var upper = names.stream()
                     .map(String::toUpperCase)
                     .toList();
    IO.println(upper);
}`
        },
        {
          name: 'Flexible Constructor Bodies (JEP 513)',
          explanation: 'Finalized in Java 25. Statements may appear BEFORE an explicit super(...) or this(...) call, as long as they do not reference the instance under construction. This lets you validate arguments or prepare values before delegating, instead of resorting to static helper methods.',
          codeExample: `class PositivePoint extends Point {
    PositivePoint(int x, int y) {
        // Prologue: runs BEFORE super() (Java 25)
        if (x < 0 || y < 0)
            throw new IllegalArgumentException("must be positive");
        super(x, y);   // explicit super call after validation
    }
}`
        }
      ]
    },
    {
      id: 'concurrency',
      name: 'Concurrency',
      icon: '🧵',
      color: '#3b82f6',
      description: 'Scoped Values become a final feature, and Structured Concurrency continues to mature, giving virtual-thread code safer data sharing and lifecycle handling.',
      details: [
        {
          name: 'Scoped Values (JEP 506 - final)',
          explanation: 'Scoped Values are finalized in Java 25. A ScopedValue binds an immutable value for the dynamic extent of a callable, sharing it with every method (and child virtual thread) called within that scope without passing parameters. Unlike ThreadLocal, the binding is immutable and automatically cleared when the scope ends - cheaper and safer, especially with millions of virtual threads.',
          codeExample: `static final ScopedValue<User> CURRENT_USER = ScopedValue.newInstance();

void handle(Request req) {
    ScopedValue.where(CURRENT_USER, req.user())
               .run(() -> processRequest());  // bound for this call tree
}

void processRequest() {
    User u = CURRENT_USER.get();   // no parameter threading needed
    audit(u);
}`
        },
        {
          name: 'Structured Concurrency (JEP 505 - preview)',
          explanation: 'Still in preview in Java 25 (with a refined API). StructuredTaskScope treats a group of concurrent subtasks as a single unit of work: if one fails or the scope is cancelled, the rest are cancelled too, and the parent always waits for all children. This eliminates thread leaks and orphaned tasks.',
          codeExample: `try (var scope = StructuredTaskScope.open()) {
    var user  = scope.fork(() -> fetchUser(id));
    var order = scope.fork(() -> fetchOrder(id));

    scope.join();           // wait for both; propagate failures

    return new Response(user.get(), order.get());
}   // both subtasks guaranteed complete or cancelled here`
        }
      ]
    },
    {
      id: 'pattern-matching',
      name: 'Pattern Matching',
      icon: '🧩',
      color: '#8b5cf6',
      description: 'Primitive types gain first-class support in patterns, instanceof, and switch - closing a long-standing gap in Java pattern matching.',
      details: [
        {
          name: 'Primitive Types in Patterns (JEP 507 - preview)',
          explanation: 'Third preview in Java 25. You can now use primitive type patterns in instanceof and switch, and the language performs safe range checks. switch can match on primitive values directly, and record deconstruction patterns can bind primitive components - making exhaustive, type-safe matching work uniformly across reference and primitive types.',
          codeExample: `// instanceof with safe primitive range check
if (i instanceof byte b) {       // true only if i fits in a byte
    use(b);
}

// switch over a primitive with patterns
String describe(int x) {
    return switch (x) {
        case 0      -> "zero";
        case int n when n < 0 -> "negative";
        default     -> "positive";
    };
}

// primitive component patterns in record deconstruction
record Point(int x, int y) {}
if (p instanceof Point(int x, int y)) { plot(x, y); }`
        }
      ]
    },
    {
      id: 'stable-values',
      name: 'Stable Values',
      icon: '⚡',
      color: '#f59e0b',
      description: 'A new API for deferred, at-most-once initialization that the JVM can constant-fold like a final field - safe lazy initialization without the synchronization boilerplate.',
      details: [
        {
          name: 'Stable Values API (JEP 502 - preview)',
          explanation: 'Preview in Java 25. A StableValue is a holder that is set at most once, after which it is treated by the JVM as effectively final and can be constant-folded. It gives you thread-safe lazy initialization (computed on first use) without double-checked locking or volatile fields, decoupling the timing of initialization from its constant-like performance.',
          codeExample: `class Config {
    // Holder, not yet computed
    private final StableValue<Logger> logger = StableValue.of();

    Logger logger() {
        // Computed at most once, thread-safe, then constant-folded
        return logger.orElseSet(() -> Logger.create("app"));
    }
}`
        }
      ]
    },
    {
      id: 'runtime-performance',
      name: 'Runtime & Performance',
      icon: '🏎️',
      color: '#ec4899',
      description: 'Java 25 ships memory and startup wins: compact object headers go to production, Shenandoah gains a generational mode, and ahead-of-time profiling speeds up warmup.',
      details: [
        {
          name: 'Compact Object Headers (JEP 519 - final)',
          explanation: 'Finalized as a product feature in Java 25. Object headers on 64-bit HotSpot shrink from 96-128 bits down to 64 bits, reducing heap footprint and improving cache density and allocation throughput for object-heavy workloads. Enabled with -XX:+UseCompactObjectHeaders.',
          codeExample: `# Smaller headers -> less heap, better cache locality
java -XX:+UseCompactObjectHeaders -jar app.jar

# Especially impactful for apps with many small objects
# (typical savings of several percent of live heap)`
        },
        {
          name: 'Generational Shenandoah (JEP 521 - final)',
          explanation: 'Shenandoah\'s generational mode is finalized in Java 25. By collecting young objects separately from old ones, it improves throughput and reduces the frequency of full-heap work while keeping Shenandoah\'s characteristic low pause times.',
          codeExample: `# Low-pause GC with a generational mode
java -XX:+UseShenandoahGC -XX:ShenandoahGCMode=generational -jar app.jar`
        },
        {
          name: 'Ahead-of-Time Profiling & Ergonomics (JEP 514 / 515)',
          explanation: 'Building on Project Leyden, Java 25 makes AOT setup simpler (JEP 514 command-line ergonomics) and records method execution profiles ahead of time (JEP 515) so the JIT can produce optimized code sooner. The result is faster warmup and time-to-peak-performance for server applications.',
          codeExample: `# Record an AOT cache from a training run, then run with it
java -XX:AOTMode=record -XX:AOTConfiguration=app.aotconf -jar app.jar
java -XX:AOTMode=create -XX:AOTConfiguration=app.aotconf -XX:AOTCache=app.aot -jar app.jar
java -XX:AOTCache=app.aot -jar app.jar   # faster startup & warmup`
        }
      ]
    },
    {
      id: 'security-apis',
      name: 'Security & APIs',
      icon: '🔐',
      color: '#06b6d4',
      description: 'New cryptographic building blocks: a standard Key Derivation Function API and convenient PEM encoding/decoding of keys and certificates.',
      details: [
        {
          name: 'Key Derivation Function API (JEP 510 - final)',
          explanation: 'Finalized in Java 25. A standard KDF API (e.g. HKDF, Argon2) lets applications derive additional keys from a secret in a uniform, provider-backed way - important for modern protocols and for post-quantum readiness.',
          codeExample: `KDF hkdf = KDF.getInstance("HKDF-SHA256");

AlgorithmParameterSpec params =
    HKDFParameterSpec.ofExtract()
                     .addIKM(inputKeyMaterial)
                     .addSalt(salt)
                     .thenExpand(info, 32);

SecretKey derived = hkdf.deriveKey("AES", params);`
        },
        {
          name: 'PEM Encodings of Cryptographic Objects (JEP 470 - preview)',
          explanation: 'Preview in Java 25. New PEMEncoder and PEMDecoder types make it easy to convert keys, certificates, and other crypto objects to and from the ubiquitous PEM text format, instead of hand-rolling Base64 plus header/footer handling.',
          codeExample: `// Decode a PEM-encoded private key
PEMDecoder decoder = PEMDecoder.of();
PrivateKey key = decoder.decode(pemText, PrivateKey.class);

// Encode a public key back to PEM
PEMEncoder encoder = PEMEncoder.of();
String pem = encoder.encodeToString(publicKey);`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Java', icon: '☕', page: 'Java' },
      { name: 'Java 25', icon: '🆕', page: 'Java 25' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #2dd4bf, #14b8a6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(20, 184, 166, 0.2)',
    border: '1px solid rgba(20, 184, 166, 0.3)',
    borderRadius: '0.5rem',
    color: '#2dd4bf',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Java 25 LTS Features</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={JAVA25_COLORS}
        />
      </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={JAVA25_COLORS.primary}
      />


      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics - Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Concept */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={JAVA25_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >&larr;</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >&rarr;</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >X</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default Java25

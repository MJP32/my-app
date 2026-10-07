/**
 * Java 27
 *
 * Released features of JDK 27 (GA September 2026): G1 and compact object
 * headers by default, post-quantum TLS, JFR redaction, and continuing previews.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const JAVA27_COLORS = {
  primary: '#6366f1',
  primaryHover: '#818cf8',
  bg: 'rgba(99, 102, 241, 0.1)',
  border: 'rgba(99, 102, 241, 0.3)',
  arrow: '#6366f1',
  hoverBg: 'rgba(99, 102, 241, 0.2)',
  topicBg: 'rgba(99, 102, 241, 0.2)'
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

function Java27({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'about-java-27',
      name: 'About Java 27',
      icon: '📦',
      color: '#64748b',
      description: 'Java 27 (JDK 27) reached General Availability on 15 September 2026. It is a non-LTS feature release with 9 JEPs, focused on better runtime defaults, post-quantum TLS, safer JFR recordings, and more preview rounds.',
      details: [
        {
          name: 'Release Overview',
          explanation: 'Java 27 is the current feature release, supported until Java 28 ships in March 2027. The next LTS after Java 25 is expected to be Java 29 (September 2027). The headline changes in 27 are defaults rather than new syntax: G1 everywhere and compact object headers on by default mean many applications get smaller heaps and more consistent GC behavior just by upgrading.',
          codeExample: `// JDK 27 JEPs (GA 15 September 2026)
//
// Final
//   JEP 523  Make G1 the Default Garbage Collector in All Environments
//   JEP 527  Post-Quantum Hybrid Key Exchange for TLS 1.3
//   JEP 534  Compact Object Headers by Default
//   JEP 536  JFR In-Process Data Redaction
//
// Preview / Incubator
//   JEP 531  Lazy Constants                            (3rd preview)
//   JEP 532  Primitive Types in Patterns, instanceof,
//            and switch                                (5th preview)
//   JEP 533  Structured Concurrency                    (7th preview)
//   JEP 537  Vector API                                (12th incubator)
//   JEP 538  PEM Encodings of Cryptographic Objects    (3rd preview)`
        },
        {
          name: 'Upgrade Checklist',
          explanation: 'Because two JVM defaults change, re-check memory and GC settings when moving to 27. Small containers that previously got Serial GC now get G1, and every object header shrinks. Both are usually wins, but capacity-planning numbers and GC logs will look different.',
          codeExample: `# Verify which GC and header layout you are running with
java -Xlog:gc -version
java -XX:+PrintFlagsFinal -version | grep -E "UseG1GC|UseSerialGC|UseCompactObjectHeaders"

# Restore the old behavior if you need to
java -XX:+UseSerialGC ...               # Serial GC on small machines
java -XX:-UseCompactObjectHeaders ...   # 96-bit headers

# Preview features still require
javac --release 27 --enable-preview Main.java
java --enable-preview Main`
        }
      ]
    },
    {
      id: 'runtime-defaults',
      name: 'New Runtime Defaults',
      icon: '⚙️',
      color: '#3b82f6',
      description: 'JEP 523 makes G1 the default collector everywhere, and JEP 534 turns on compact object headers by default. No code changes needed.',
      details: [
        {
          name: 'G1 Everywhere (JEP 523)',
          explanation: 'G1 has been the default for server-class machines since JDK 9, but the JVM still chose Serial GC in constrained environments: a single CPU or less than 1792 MB of memory. That is a common shape for containers, so the same app could get different collectors depending on its pod size. G1 is now competitive with Serial at all heap sizes, so it is the default in every environment.',
          codeExample: `// Before JDK 27 (ergonomics):
//   1 CPU or < 1792 MB RAM  ->  Serial GC
//   otherwise               ->  G1
//
// JDK 27:
//   always                  ->  G1
//
// Opt back in to Serial explicitly if you measured it to be better:
//   java -XX:+UseSerialGC -jar app.jar`
        },
        {
          name: 'Compact Object Headers by Default (JEP 534)',
          explanation: 'Every Java object carries a header. Compact object headers shrink it from 96 bits to 64 bits on 64-bit platforms, which cuts heap use and improves cache locality. The feature was experimental in JDK 24 (JEP 450), became a product option in JDK 25 (JEP 519), and is now on by default. Reported results include 22% less heap and 8% less CPU on SPECjbb2015, and around 15% fewer GCs with G1 and Parallel.',
          codeExample: `// Object header on 64-bit JVMs
//
//   Before:  [ mark word 64 bits ][ class pointer 32 bits ]  = 96 bits
//   JDK 27:  [ mark word + class pointer packed into 64 bits ]
//
// Most benefit: apps with many small objects (collections, DTOs,
// boxed values), where the header is a large share of each object.
//
// Disable if needed:
//   java -XX:-UseCompactObjectHeaders -jar app.jar`
        }
      ]
    },
    {
      id: 'post-quantum-tls',
      name: 'Post-Quantum TLS',
      icon: '🛡️',
      color: '#ef4444',
      description: 'JEP 527 adds hybrid key exchange to TLS 1.3, combining ML-KEM with classic elliptic curves. X25519MLKEM768 is enabled and preferred by default.',
      details: [
        {
          name: 'Hybrid Key Exchange (JEP 527)',
          explanation: 'Attackers can record encrypted traffic today and decrypt it once quantum computers can break elliptic-curve key exchange ("harvest now, decrypt later"). A hybrid scheme combines the quantum-resistant ML-KEM algorithm with a traditional one such as X25519, and stays secure as long as either remains unbroken. JDK 27 places X25519MLKEM768 first in the default named-groups list, so TLS 1.3 connections to servers that support it are protected with no code changes.',
          codeExample: `// Default named groups in JDK 27 (most preferred first):
//   X25519MLKEM768, x25519, secp256r1, secp384r1, secp521r1,
//   x448, ffdhe2048, ffdhe3072, ffdhe4096
//
// Also available but not enabled by default:
//   SecP256r1MLKEM768, SecP384r1MLKEM1024
//
// Override globally:
//   java -Djdk.tls.namedGroups="X25519MLKEM768,x25519" ...`
        },
        {
          name: 'Configuring Groups in Code',
          explanation: 'To control the key-exchange groups for a specific connection, set them on SSLParameters. This is useful when a partner requires a particular hybrid scheme or when you need to stay on classic groups for an older peer.',
          codeExample: `SSLSocket tlsSock = (SSLSocket) SSLContext.getDefault()
        .getSocketFactory().createSocket();

SSLParameters params = tlsSock.getSSLParameters();

// Two hybrid KEM schemes, then two traditional schemes
params.setNamedGroups(new String[] {
    "SecP256r1MLKEM768", "X25519MLKEM768", "secp256r1", "x25519"
});
tlsSock.setSSLParameters(params);`
        }
      ]
    },
    {
      id: 'jfr-redaction',
      name: 'JFR Data Redaction',
      icon: '🙈',
      color: '#f59e0b',
      description: 'JEP 536: JDK Flight Recorder now redacts secrets from command-line arguments, environment variables, and system properties before they are written to a recording.',
      details: [
        {
          name: 'What Gets Redacted',
          explanation: 'JFR recordings are often attached to support tickets or shared with other teams, and they used to capture the full command line, environment, and system properties, including passwords and tokens. JFR now replaces sensitive values with [REDACTED] inside the JVM, before any data is written. Built-in filters match names such as *password*, *token*, *secret*, *credential*, *api*key*, *auth*, *private*key*, *passphrase* and *pwd*.',
          codeExample: `// Recorded before JDK 27
//   jdk.InitialSystemProperty  db.password = hunter2
//   jdk.InitialEnvironmentVariable  API_TOKEN = abc123
//
// Recorded in JDK 27
//   jdk.InitialSystemProperty  db.password = [REDACTED]
//   jdk.InitialEnvironmentVariable  API_TOKEN = [REDACTED]`
        },
        {
          name: 'Custom Redaction Filters',
          explanation: 'Use -XX:FlightRecorderOptions with redact-key (environment variable and system property names) and redact-argument (command-line arguments). Filters are case-insensitive globs separated by semicolons. Prefix the first filter with + to add to the built-in defaults instead of replacing them, or use redact-argument=none to turn argument redaction off.',
          codeExample: `# Redact keys containing "confidential" and URLs with embedded credentials
java -XX:FlightRecorderOptions:'redact-key=confidential,redact-argument=https://*:*@*' \\
     -XX:StartFlightRecording -jar app.jar

# Keep the defaults and add your own
java -XX:FlightRecorderOptions:'redact-key=+*internal*' ...

# See what was redacted
java -Xlog:jfr+redact=debug ...`
        }
      ]
    },
    {
      id: 'previews',
      name: 'Preview APIs',
      icon: '🧪',
      color: '#8b5cf6',
      description: 'Lazy Constants (third preview), Structured Concurrency (seventh preview), primitive patterns (fifth preview), PEM encodings (third preview) and the Vector API (twelfth incubator) continue toward finalization.',
      details: [
        {
          name: 'Lazy Constants (JEP 531)',
          explanation: 'The third preview trims the API to its core: the low-level isInitialized() and orElse() methods are gone, and Set.ofLazy joins List.ofLazy and Map.ofLazy. A LazyConstant is computed once on first get() and then treated by the JVM as a constant.',
          codeExample: `class OrderController {
    private final LazyConstant<Logger> logger
        = LazyConstant.of(() -> Logger.create(OrderController.class));

    void submitOrder(User user, List<Product> products) {
        logger.get().info("order started");
    }
}

// Lazy collections
List<Connection> pool = List.ofLazy(10, i -> openConnection(i));
Map<Locale, Messages> bundles = Map.ofLazy(locales, Messages::load);
Set<Feature> enabled = Set.ofLazy(allFeatures, f -> flags.isOn(f));   // new in 27`
        },
        {
          name: 'Structured Concurrency (JEP 533)',
          explanation: 'The seventh preview makes failure handling explicit: join() now throws ExecutionException when a subtask fails, StructuredTaskScope and Joiner gain a type parameter for that exception, and timeouts surface as a CancelledByTimeoutException cause. A new open(UnaryOperator) overload keeps the default join policy while letting you tweak configuration such as the timeout.',
          codeExample: `Response handle() throws ExecutionException, InterruptedException {
    try (var scope = StructuredTaskScope.open()) {
        Subtask<String>  user  = scope.fork(() -> findUser());
        Subtask<Integer> order = scope.fork(() -> fetchOrder());
        scope.join();
        return new Response(user.get(), order.get());
    }
}

// Default policy plus a timeout
try (var scope = StructuredTaskScope.open(cf -> cf.withTimeout(Duration.ofSeconds(2)))) {
    ...
}`
        },
        {
          name: 'Primitive Patterns, PEM & Vector API',
          explanation: 'Primitive types in patterns (JEP 532) repeat unchanged from JDK 26 to gather more feedback. The PEM API (JEP 538) is reworked: PEM becomes an ordinary class instead of a record, DEREncodable is renamed BinaryEncodable, withFactory becomes withFactoriesOf, and a CryptoException type is added. The Vector API (JEP 537) remains incubating until Valhalla value classes arrive.',
          codeExample: `// Primitive patterns nested in record patterns (JEP 532)
if (json instanceof JsonObject(var map)
    && map.get("age") instanceof JsonNumber(int a)) {
    System.out.println("age " + a);   // matches only if it fits in an int
}

// PEM (JEP 538)
String pem = PEMEncoder.of().withEncryption(password).encodeToString(privateKey);
PrivateKey key = PEMDecoder.of().withDecryption(password)
                           .decode(pem, PrivateKey.class);`
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
      { name: 'Java 27', icon: '🆕', page: 'Java 27' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #312e81 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #818cf8, #6366f1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(99, 102, 241, 0.2)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '0.5rem',
    color: '#818cf8',
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
        <h1 style={titleStyle}>Java 27</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'
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
          colors={JAVA27_COLORS}
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
        primaryColor={JAVA27_COLORS.primary}
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
            onClick={() => { setSelectedConceptIndex(index); setSelectedDetailIndex(0) }}
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
              colors={JAVA27_COLORS}
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

export default Java27

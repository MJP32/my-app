import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|super|this|null|default)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean|var)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Map|HashMap|Optional|Exception|Override|Integer|Long|Tracer|Span|SpanCustomizer|Tracing|CurrentTraceContext|Propagation|Sampler|Reporter|Sender|AsyncReporter|OkHttpSender|BraveTracer|Observation|ObservationHandler|MeterRegistry|Configuration|Bean|Component|Autowired|RestTemplate|WebClient|RestController|GetMapping|Service)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

function Zipkin({ onBack, breadcrumb }) {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
            background: 'rgba(139, 92, 246, 0.2)',
            color: '#c4b5fd',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(139, 92, 246, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(139, 92, 246, 0.2)'
          }}
        >
          Back
        </button>
      </div>

      {breadcrumb && (
        <Breadcrumb
          breadcrumbStack={[
            breadcrumb.section && { name: breadcrumb.section.name, icon: breadcrumb.section.icon, onClick: breadcrumb.section.onClick },
            breadcrumb.category && { name: breadcrumb.category.name, onClick: breadcrumb.category.onClick },
            breadcrumb.topic && { name: breadcrumb.topic }
          ].filter(Boolean)}
          colors={breadcrumb.colors}
          onMainMenu={breadcrumb.onMainMenu}
        />
      )}

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0.5rem',
        background: 'linear-gradient(to right, #a78bfa, #8b5cf6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Zipkin Distributed Tracing
      </h1>
      <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Distributed tracing system for monitoring and troubleshooting microservices architectures
      </p>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #374151',
        overflowX: 'auto',
        flexWrap: 'nowrap'
      }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'architecture', label: 'Architecture' },
          { id: 'spans', label: 'Spans & Traces' },
          { id: 'integration', label: 'Integration' },
          { id: 'ui', label: 'UI Features' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab.id ? '#8b5cf6' : 'transparent',
              color: activeSection === tab.id ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== tab.id) {
                e.target.style.backgroundColor = '#374151'
                e.target.style.color = '#d1d5db'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== tab.id) {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#9ca3af'
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div style={{
        backgroundColor: '#1f2937',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        {activeSection === 'overview' && (
          <div>
            <h2 style={{ color: '#a78bfa', marginBottom: '1.5rem', fontSize: '1.8rem' }}>What is Zipkin?</h2>
            <div style={{ color: '#d1d5db', lineHeight: '1.8', fontSize: '1.05rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                Zipkin is a distributed tracing system that helps gather timing data needed to troubleshoot latency problems in microservice architectures.
                It manages both the collection and lookup of this data through a simple UI.
              </p>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Key Features</h3>
              <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>End-to-end latency tracking across services</li>
                <li style={{ marginBottom: '0.5rem' }}>Service dependency visualization</li>
                <li style={{ marginBottom: '0.5rem' }}>Performance bottleneck identification</li>
                <li style={{ marginBottom: '0.5rem' }}>Root cause analysis for failures</li>
                <li style={{ marginBottom: '0.5rem' }}>Trace timeline visualization</li>
              </ul>

              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Running Zipkin Server via Docker</div>
                <SyntaxHighlighter code={`// Start Zipkin server with Docker
// docker run -d -p 9411:9411 openzipkin/zipkin

// Or run with Elasticsearch storage backend
// docker run -d -p 9411:9411 \\
//   -e STORAGE_TYPE=elasticsearch \\
//   -e ES_HOSTS=http://elasticsearch:9200 \\
//   openzipkin/zipkin

// Verify Zipkin is running - visit http://localhost:9411

// Programmatic health check from your application
import java.net.HttpURLConnection;
import java.net.URL;

public class ZipkinHealthCheck {
    public static boolean isZipkinRunning(String zipkinUrl) {
        try {
            URL url = new URL(zipkinUrl + "/health");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(3000);
            int responseCode = conn.getResponseCode();
            return responseCode == 200;
        } catch (Exception e) {
            return false;
        }
    }
}`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>When to Use Zipkin</h3>
              <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Microservices architectures with multiple service calls</li>
                <li style={{ marginBottom: '0.5rem' }}>Debugging latency issues in distributed systems</li>
                <li style={{ marginBottom: '0.5rem' }}>Understanding service dependencies</li>
                <li style={{ marginBottom: '0.5rem' }}>Performance monitoring and optimization</li>
              </ul>

              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Maven Dependencies for Zipkin with Spring Boot</div>
                <SyntaxHighlighter code={`// pom.xml - Spring Boot 3.x with Micrometer Tracing
// <dependency>
//     <groupId>io.micrometer</groupId>
//     <artifactId>micrometer-tracing-bridge-brave</artifactId>
// </dependency>
// <dependency>
//     <groupId>io.zipkin.reporter2</groupId>
//     <artifactId>zipkin-reporter-brave</artifactId>
// </dependency>

// Minimal configuration in application.properties
// management.tracing.sampling.probability=1.0
// management.zipkin.tracing.endpoint=http://localhost:9411/api/v2/spans

// With this setup, Spring Boot auto-configures tracing
@RestController
public class HelloController {
    // Every request is automatically traced
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Zipkin tracing is active!";
    }
}`} />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'architecture' && (
          <div>
            <h2 style={{ color: '#a78bfa', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Zipkin Architecture</h2>
            <div style={{ color: '#d1d5db', lineHeight: '1.8', fontSize: '1.05rem' }}>
              <h3 style={{ color: '#8b5cf6', marginTop: '1.5rem', marginBottom: '1rem' }}>Components</h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>1. Collector</h4>
                <p style={{ marginBottom: '0.5rem' }}>
                  Receives trace data from instrumented applications via HTTP, Kafka, or RabbitMQ.
                  Validates and stores the data for querying.
                </p>
                <div style={{
                  backgroundColor: '#111827',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginTop: '0.75rem'
                }}>
                  <SyntaxHighlighter code={`// Configuring span reporting via HTTP sender
import zipkin2.reporter.AsyncReporter;
import zipkin2.reporter.okhttp3.OkHttpSender;
import zipkin2.Span;

public class CollectorConfig {
    public AsyncReporter<Span> spanReporter() {
        // Send spans to Zipkin collector via HTTP
        OkHttpSender sender = OkHttpSender.create(
            "http://localhost:9411/api/v2/spans"
        );
        return AsyncReporter.create(sender);
    }
}`} />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>2. Storage</h4>
                <p style={{ marginBottom: '0.5rem' }}>
                  Stores span data. Supports multiple backends:
                </p>
                <ul style={{ marginLeft: '1.5rem' }}>
                  <li>In-memory (for testing)</li>
                  <li>MySQL/MariaDB</li>
                  <li>Elasticsearch</li>
                  <li>Cassandra</li>
                </ul>
                <div style={{
                  backgroundColor: '#111827',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginTop: '0.75rem'
                }}>
                  <SyntaxHighlighter code={`// Zipkin storage configuration via environment variables
// In-memory (dev/testing only):
// STORAGE_TYPE=mem

// Elasticsearch:
// STORAGE_TYPE=elasticsearch
// ES_HOSTS=http://elasticsearch:9200
// ES_INDEX=zipkin
// ES_INDEX_REPLICAS=1

// Cassandra:
// STORAGE_TYPE=cassandra3
// CASSANDRA_CONTACT_POINTS=cassandra:9042
// CASSANDRA_KEYSPACE=zipkin2

// MySQL:
// STORAGE_TYPE=mysql
// MYSQL_HOST=mysql
// MYSQL_TCP_PORT=3306
// MYSQL_USER=zipkin
// MYSQL_PASS=zipkin`} />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>3. Query Service</h4>
                <p style={{ marginBottom: '0.5rem' }}>
                  Provides API to find and retrieve traces from storage.
                  Powers the Zipkin UI with trace data.
                </p>
                <div style={{
                  backgroundColor: '#111827',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginTop: '0.75rem'
                }}>
                  <SyntaxHighlighter code={`// Querying Zipkin API programmatically
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class ZipkinQueryClient {
    private final HttpClient client = HttpClient.newHttpClient();
    private final String baseUrl;

    public ZipkinQueryClient(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    // GET /api/v2/traces?serviceName=my-service&limit=10
    public String findTraces(String serviceName, int limit) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + "/api/v2/traces"
                + "?serviceName=" + serviceName
                + "&limit=" + limit))
            .GET()
            .build();
        HttpResponse<String> response = client.send(
            request, HttpResponse.BodyHandlers.ofString()
        );
        return response.body();
    }

    // GET /api/v2/trace/{traceId}
    public String getTrace(String traceId) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + "/api/v2/trace/" + traceId))
            .GET()
            .build();
        HttpResponse<String> response = client.send(
            request, HttpResponse.BodyHandlers.ofString()
        );
        return response.body();
    }
}`} />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>4. Web UI</h4>
                <p style={{ marginBottom: '0.5rem' }}>
                  Visualizes traces, service dependencies, and performance metrics.
                  Allows searching and filtering of traces.
                </p>
                <div style={{
                  backgroundColor: '#111827',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginTop: '0.75rem'
                }}>
                  <SyntaxHighlighter code={`// Docker Compose for Zipkin with Elasticsearch
// docker-compose.yml
// version: "3"
// services:
//   zipkin:
//     image: openzipkin/zipkin
//     ports:
//       - "9411:9411"
//     environment:
//       - STORAGE_TYPE=elasticsearch
//       - ES_HOSTS=http://elasticsearch:9200
//     depends_on:
//       - elasticsearch
//
//   elasticsearch:
//     image: docker.elastic.co/elasticsearch/elasticsearch:7.17.0
//     environment:
//       - discovery.type=single-node
//       - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
//     ports:
//       - "9200:9200"
//
// Access the UI at http://localhost:9411/zipkin/`} />
                </div>
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Data Flow</h3>
              <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Instrumented applications send span data to Collector</li>
                <li style={{ marginBottom: '0.5rem' }}>Collector validates and persists to Storage</li>
                <li style={{ marginBottom: '0.5rem' }}>UI queries data via Query Service</li>
                <li style={{ marginBottom: '0.5rem' }}>Users analyze traces through Web UI</li>
              </ol>

              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Brave Tracer Setup (Manual Instrumentation)</div>
                <SyntaxHighlighter code={`import brave.Tracing;
import brave.sampler.Sampler;
import zipkin2.reporter.AsyncReporter;
import zipkin2.reporter.okhttp3.OkHttpSender;

public class TracingConfig {
    public static Tracing createTracing(String serviceName) {
        // 1. Configure where to send spans
        OkHttpSender sender = OkHttpSender.create(
            "http://localhost:9411/api/v2/spans"
        );

        // 2. Create async reporter (batches spans)
        AsyncReporter reporter = AsyncReporter.create(sender);

        // 3. Build the tracer
        Tracing tracing = Tracing.newBuilder()
            .localServiceName(serviceName)
            .spanReporter(reporter)
            .sampler(Sampler.ALWAYS_SAMPLE) // sample all in dev
            .build();

        // 4. The tracer is now ready to create spans
        // Spans flow: App -> Reporter -> Sender -> Collector -> Storage
        return tracing;
    }
}`} />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'spans' && (
          <div>
            <h2 style={{ color: '#a78bfa', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Spans and Traces</h2>
            <div style={{ color: '#d1d5db', lineHeight: '1.8', fontSize: '1.05rem' }}>
              <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>What is a Span?</h3>
              <p style={{ marginBottom: '1rem' }}>
                A span represents a single operation in a distributed system. Each span contains:
              </p>
              <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Trace ID</strong>: Unique identifier for the entire request flow</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Span ID</strong>: Unique identifier for this operation</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Parent Span ID</strong>: Links to parent operation</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Service Name</strong>: Which service created this span</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Operation Name</strong>: What operation was performed</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Timestamps</strong>: Start time and duration</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Tags</strong>: Key-value metadata (HTTP status, error flags)</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Annotations</strong>: Timed events during the span</li>
              </ul>

              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Creating and Configuring Spans with Brave</div>
                <SyntaxHighlighter code={`import brave.Span;
import brave.Tracer;
import brave.Tracing;

public class SpanExample {
    private final Tracer tracer;

    public SpanExample(Tracing tracing) {
        this.tracer = tracing.tracer();
    }

    public void processRequest(String requestId) {
        // Create a new span (becomes root if no active trace)
        Span span = tracer.newTrace().name("process-request");
        span.start();

        try {
            // Tag with metadata for searchability
            span.tag("request.id", requestId);
            span.tag("http.method", "POST");
            span.tag("http.url", "/api/orders");

            // Annotate timed events within the span
            span.annotate("validation.start");
            validateRequest(requestId);
            span.annotate("validation.complete");

            // Create a child span for a sub-operation
            Span childSpan = tracer.newChild(span.context())
                .name("db-query");
            childSpan.start();
            try {
                childSpan.tag("db.type", "postgresql");
                childSpan.tag("db.statement", "SELECT * FROM orders");
                queryDatabase();
            } finally {
                childSpan.finish();
            }
        } catch (Exception e) {
            span.tag("error", e.getMessage());
            span.error(e);
        } finally {
            span.finish(); // records duration and reports span
        }
    }
}`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Trace Structure</h3>
              <p style={{ marginBottom: '1rem' }}>
                A trace is a collection of spans that share the same trace ID, representing the complete journey of a request through your system.
              </p>

              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Trace Context Propagation Across Services</div>
                <SyntaxHighlighter code={`import brave.Span;
import brave.Tracer;
import brave.propagation.TraceContext;

public class TraceStructureExample {
    private final Tracer tracer;

    // A trace tree structure:
    // TraceId: abc123
    //   Span A (root) - API Gateway       [0ms ---- 500ms]
    //     Span B (child of A) - Auth Svc     [50ms -- 150ms]
    //     Span C (child of A) - Order Svc    [160ms ------- 480ms]
    //       Span D (child of C) - DB Query      [200ms - 300ms]
    //       Span E (child of C) - Cache Lookup  [310ms - 340ms]

    public void demonstrateTraceHierarchy() {
        // Root span shares its traceId with all children
        Span root = tracer.newTrace().name("api-gateway").start();

        try {
            // Child span inherits the traceId
            Span authSpan = tracer.newChild(root.context())
                .name("auth-service").start();
            authSpan.tag("auth.method", "JWT");
            authSpan.finish();

            // Another child of root
            Span orderSpan = tracer.newChild(root.context())
                .name("order-service").start();
            try {
                // Grandchild span - still same traceId
                Span dbSpan = tracer.newChild(orderSpan.context())
                    .name("db-query").start();
                dbSpan.tag("db.type", "mysql");
                dbSpan.finish();
            } finally {
                orderSpan.finish();
            }
        } finally {
            root.finish();
        }
    }
}`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Common Annotations</h3>
              <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>cs (Client Send)</strong>: Client sent request</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>sr (Server Receive)</strong>: Server received request</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>ss (Server Send)</strong>: Server sent response</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>cr (Client Receive)</strong>: Client received response</li>
              </ul>

              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Using Annotations to Mark Lifecycle Events</div>
                <SyntaxHighlighter code={`import brave.Span;
import brave.Tracer;

@Service
public class PaymentService {
    private final Tracer tracer;

    public PaymentService(Tracer tracer) {
        this.tracer = tracer;
    }

    public void processPayment(String orderId, double amount) {
        Span span = tracer.nextSpan().name("process-payment").start();
        try (Tracer.SpanInScope ws = tracer.withSpanInScope(span)) {
            span.tag("order.id", orderId);
            span.tag("payment.amount", String.valueOf(amount));

            // Custom annotations mark important lifecycle points
            span.annotate("fraud.check.start");
            boolean isFraud = checkFraud(orderId, amount);
            span.annotate("fraud.check.end");

            if (isFraud) {
                span.tag("payment.status", "rejected");
                span.tag("error", "fraud detected");
                return;
            }

            span.annotate("payment.gateway.start");
            boolean success = chargeCard(orderId, amount);
            span.annotate("payment.gateway.end");

            span.tag("payment.status", success ? "completed" : "failed");
        } finally {
            span.finish();
        }
    }
}`} />
              </div>

              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#111827',
                borderRadius: '8px',
                borderLeft: '4px solid #8b5cf6',
                marginBottom: '1.5rem'
              }}>
                <strong>Example:</strong> A user request flows through API Gateway &rarr; Auth Service &rarr; Order Service &rarr; Database.
                This creates one trace with multiple spans, one for each service interaction.
              </div>

              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Multi-Service Trace Example with HTTP Propagation</div>
                <SyntaxHighlighter code={`import brave.Span;
import brave.Tracer;
import brave.propagation.B3Propagation;
import brave.http.HttpTracing;

// API Gateway creates root span and propagates context
@RestController
public class ApiGatewayController {
    @Autowired private Tracer tracer;
    @Autowired private RestTemplate restTemplate; // auto-instrumented

    @GetMapping("/api/orders/{id}")
    public Order getOrder(String id) {
        // Spring auto-creates span for this controller method
        // RestTemplate auto-injects B3 headers into outgoing request:
        //   X-B3-TraceId: 463ac35c9f6413ad
        //   X-B3-SpanId: a2fb4a1d1a96d312
        //   X-B3-ParentSpanId: 0020000000000001
        //   X-B3-Sampled: 1

        // This call propagates the trace to order-service
        Order order = restTemplate.getForObject(
            "http://order-service/orders/" + id, Order.class
        );
        return order;
    }
}

// Order Service receives trace context from B3 headers
@RestController
public class OrderController {
    @Autowired private Tracer tracer;

    @GetMapping("/orders/{id}")
    public Order getOrder(String id) {
        // Span auto-created as child of API Gateway span
        // Same traceId, different spanId
        Span current = tracer.currentSpan();
        current.tag("order.id", id);
        return findOrder(id);
    }
}`} />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'integration' && (
          <div>
            <h2 style={{ color: '#a78bfa', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Spring Boot Integration</h2>
            <div style={{ color: '#d1d5db', lineHeight: '1.8', fontSize: '1.05rem' }}>
              <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>Dependencies</h3>
              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Spring Boot 2.x (Sleuth) vs 3.x (Micrometer Tracing)</div>
                <SyntaxHighlighter code={`// === Spring Boot 2.x with Sleuth ===
// <dependency>
//     <groupId>org.springframework.cloud</groupId>
//     <artifactId>spring-cloud-starter-zipkin</artifactId>
// </dependency>
// <dependency>
//     <groupId>org.springframework.cloud</groupId>
//     <artifactId>spring-cloud-starter-sleuth</artifactId>
// </dependency>

// === Spring Boot 3.x with Micrometer Tracing ===
// <dependency>
//     <groupId>io.micrometer</groupId>
//     <artifactId>micrometer-tracing-bridge-brave</artifactId>
// </dependency>
// <dependency>
//     <groupId>io.zipkin.reporter2</groupId>
//     <artifactId>zipkin-reporter-brave</artifactId>
// </dependency>
// <dependency>
//     <groupId>org.springframework.boot</groupId>
//     <artifactId>spring-boot-starter-actuator</artifactId>
// </dependency>`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Configuration</h3>
              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>application.yml - Zipkin and Tracing Config</div>
                <SyntaxHighlighter code={`// application.yml for Spring Boot 2.x (Sleuth)
// spring:
//   application:
//     name: my-service
//   zipkin:
//     base-url: http://localhost:9411
//     sender:
//       type: web  # or kafka, rabbit
//   sleuth:
//     sampler:
//       probability: 1.0  # 100% in dev, use 0.1 for 10% in prod

// application.yml for Spring Boot 3.x (Micrometer)
// spring:
//   application:
//     name: my-service
// management:
//   tracing:
//     sampling:
//       probability: 1.0
//   zipkin:
//     tracing:
//       endpoint: http://localhost:9411/api/v2/spans

// Logging pattern with trace/span IDs for log correlation
// logging:
//   pattern:
//     level: "%5p [%X{traceId},%X{spanId}]"`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Custom Spans</h3>
              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Programmatic Span Creation with Tracer</div>
                <SyntaxHighlighter code={`@Service
public class OrderService {
    private final Tracer tracer;

    public OrderService(Tracer tracer) {
        this.tracer = tracer;
    }

    public Order processOrder(OrderRequest request) {
        // Create custom span
        Span span = tracer.nextSpan().name("process-order");
        try (Tracer.SpanInScope ws = tracer.withSpan(span.start())) {
            // Add custom tags for searchability in Zipkin UI
            span.tag("order.id", request.getOrderId());
            span.tag("customer.id", request.getCustomerId());
            span.tag("order.total", String.valueOf(request.getTotal()));

            // Add annotation to mark lifecycle events
            span.annotate("validation.start");
            validateOrder(request);
            span.annotate("validation.complete");

            // Business logic here
            Order order = createOrder(request);
            span.tag("order.status", order.getStatus());

            return order;
        } catch (Exception e) {
            span.tag("error", e.getMessage());
            throw e;
        } finally {
            span.end();
        }
    }
}`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Declarative Tracing with @NewSpan</h3>
              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Annotation-Based Span Creation</div>
                <SyntaxHighlighter code={`import org.springframework.cloud.sleuth.annotation.NewSpan;
import org.springframework.cloud.sleuth.annotation.SpanTag;

@Service
public class InventoryService {

    // @NewSpan creates a new child span automatically
    @NewSpan("check-inventory")
    public boolean checkStock(
            @SpanTag("product.id") String productId,
            @SpanTag("quantity") int quantity) {
        // Span is auto-created with name "check-inventory"
        // Tags product.id and quantity are auto-added
        return getStock(productId) >= quantity;
    }

    // You can also use @ContinueSpan to add tags to current span
    // @ContinueSpan(log = "reserve-stock")
    // public void reserveStock(
    //     @SpanTag("product.id") String productId) { ... }
}

// Spring Boot 3.x uses Micrometer Observation API instead
@Service
public class InventoryServiceV3 {

    private final ObservationRegistry registry;

    public boolean checkStock(String productId, int qty) {
        return Observation.createNotStarted("check-inventory", registry)
            .lowCardinalityKeyValue("product.type", "physical")
            .highCardinalityKeyValue("product.id", productId)
            .observe(() -> getStock(productId) >= qty);
    }
}`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Log Correlation</h3>
              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Correlating Logs with Trace and Span IDs</div>
                <SyntaxHighlighter code={`import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

@Service
public class PaymentService {
    private static final Logger log = LoggerFactory.getLogger(PaymentService.class);

    // Sleuth/Micrometer auto-populates MDC with traceId and spanId
    // Log output automatically includes trace context:
    // 2024-01-15 10:23:45.123 INFO [my-service,abc123,def456]
    //   c.e.PaymentService : Processing payment for order 789

    public void processPayment(String orderId) {
        // traceId and spanId are automatically in MDC
        log.info("Processing payment for order {}", orderId);

        // You can access trace context in code
        String traceId = MDC.get("traceId");
        String spanId = MDC.get("spanId");

        // Include traceId in error responses for debugging
        try {
            chargeCustomer(orderId);
            log.info("Payment successful for order {}", orderId);
        } catch (Exception e) {
            log.error("Payment failed for order {}. TraceId: {}",
                orderId, traceId, e);
            throw new PaymentException(
                "Payment failed. Reference: " + traceId, e);
        }
    }
}`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Async Operations</h3>
              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Trace Propagation in Async and Reactive Code</div>
                <SyntaxHighlighter code={`import org.springframework.scheduling.annotation.Async;
import java.util.concurrent.CompletableFuture;

@Service
public class NotificationService {

    // Sleuth auto-propagates trace context to @Async methods
    @Async
    public CompletableFuture<Boolean> sendNotification(String userId) {
        // This runs in a different thread, but the trace context
        // is automatically propagated by Sleuth's executor wrapper
        log.info("Sending notification to user {}", userId);
        return CompletableFuture.completedFuture(true);
    }
}

// For custom executors, wrap them with Sleuth-aware decorator
@Configuration
public class AsyncConfig {

    @Bean
    public Executor taskExecutor(BeanFactory beanFactory) {
        // LazyTraceExecutor wraps executor to propagate context
        return new LazyTraceExecutor(
            beanFactory, Executors.newFixedThreadPool(5)
        );
    }
}

// WebClient (reactive) trace propagation
@Configuration
public class WebClientConfig {
    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        // Spring auto-configures trace header injection
        return builder
            .baseUrl("http://order-service")
            .build();
        // Outgoing requests automatically include B3 headers:
        // X-B3-TraceId, X-B3-SpanId, X-B3-Sampled
    }
}`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Custom Sampling Strategy</h3>
              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Rate-Limited and Path-Based Sampling</div>
                <SyntaxHighlighter code={`import brave.sampler.Sampler;
import brave.sampler.RateLimitingSampler;
import brave.http.HttpRuleSampler;
import brave.http.HttpRequest;

@Configuration
public class SamplingConfig {

    // Rate-limited sampler: max 10 traces per second
    @Bean
    public Sampler rateLimitedSampler() {
        return RateLimitingSampler.create(10);
    }

    // Path-based sampling for HTTP requests
    @Bean
    public HttpRuleSampler httpSampler() {
        return HttpRuleSampler.newBuilder()
            // Always trace errors (health checks, etc.)
            .addRule(null, "/actuator/health", 0.0f)
            // Sample 100% of payment endpoints
            .addRule(null, "/api/payments/**", 1.0f)
            // Sample 10% of general API traffic
            .addRule(null, "/api/**", 0.1f)
            .build();
    }

    // Custom sampler based on business logic
    @Bean
    public Sampler customSampler() {
        return new Sampler() {
            @Override
            public boolean isSampled(long traceId) {
                // Always sample in non-prod environments
                String env = System.getenv("ENVIRONMENT");
                if (!"production".equals(env)) return true;
                // In production, sample 5%
                return (traceId % 100) < 5;
            }
        };
    }
}`} />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'ui' && (
          <div>
            <h2 style={{ color: '#a78bfa', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Zipkin UI Features</h2>
            <div style={{ color: '#d1d5db', lineHeight: '1.8', fontSize: '1.05rem' }}>
              <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>Trace Search</h3>
              <p style={{ marginBottom: '1rem' }}>
                Search for traces by:
              </p>
              <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Service name</li>
                <li style={{ marginBottom: '0.5rem' }}>Span name (operation)</li>
                <li style={{ marginBottom: '0.5rem' }}>Tags (e.g., http.status_code=500)</li>
                <li style={{ marginBottom: '0.5rem' }}>Duration threshold (slow requests)</li>
                <li style={{ marginBottom: '0.5rem' }}>Time range</li>
              </ul>

              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Querying Traces via Zipkin API</div>
                <SyntaxHighlighter code={`// Search traces using Zipkin HTTP API (v2)
// These match the same filters available in the UI

// Find traces by service name and time range
// GET /api/v2/traces?serviceName=order-service
//     &endTs=1705334625000
//     &lookback=3600000
//     &limit=20

// Find slow traces (duration > 5 seconds)
// GET /api/v2/traces?serviceName=order-service
//     &minDuration=5000000

// Find error traces by tag
// GET /api/v2/traces?serviceName=order-service
//     &annotationQuery=http.status_code=500

// Look up a specific trace by ID
// GET /api/v2/trace/463ac35c9f6413ad

// Java client example for automated alerting
public class TraceSearchClient {
    private final String zipkinUrl;

    public List<List<Span>> findSlowTraces(
            String service, long minDurationMicros) throws Exception {
        String url = String.format(
            "%s/api/v2/traces?serviceName=%s&minDuration=%d",
            zipkinUrl, service, minDurationMicros
        );
        // Parse JSON response into span objects
        HttpResponse<String> response = HttpClient.newHttpClient()
            .send(HttpRequest.newBuilder()
                .uri(URI.create(url)).build(),
                HttpResponse.BodyHandlers.ofString());
        return parseTraces(response.body());
    }
}`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Trace Timeline</h3>
              <p style={{ marginBottom: '1rem' }}>
                Visualizes the complete request flow showing:
              </p>
              <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Service call hierarchy</li>
                <li style={{ marginBottom: '0.5rem' }}>Time spent in each service</li>
                <li style={{ marginBottom: '0.5rem' }}>Network latency between services</li>
                <li style={{ marginBottom: '0.5rem' }}>Parallel vs sequential operations</li>
                <li style={{ marginBottom: '0.5rem' }}>Error locations</li>
              </ul>

              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Adding Rich Tags for Better Timeline Visualization</div>
                <SyntaxHighlighter code={`@RestController
public class OrderController {
    @Autowired private Tracer tracer;

    @GetMapping("/api/orders/{id}")
    public Order getOrder(String id) {
        Span span = tracer.currentSpan();

        // HTTP tags appear in the timeline detail panel
        span.tag("http.method", "GET");
        span.tag("http.url", "/api/orders/" + id);
        span.tag("http.status_code", "200");

        // Business-specific tags for filtering
        span.tag("order.id", id);
        span.tag("order.type", "standard");

        // Annotations appear as markers on the timeline bar
        span.annotate("cache.check");
        Order cached = checkCache(id);
        if (cached != null) {
            span.annotate("cache.hit");
            span.tag("cache.result", "hit");
            return cached;
        }
        span.annotate("cache.miss");
        span.tag("cache.result", "miss");

        span.annotate("db.query.start");
        Order order = queryDatabase(id);
        span.annotate("db.query.end");

        // Error tags highlight spans in red in the timeline
        if (order == null) {
            span.tag("error", "Order not found: " + id);
        }
        return order;
    }
}`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Dependencies Graph</h3>
              <p style={{ marginBottom: '1rem' }}>
                Shows service dependency map with:
              </p>
              <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Which services call which services</li>
                <li style={{ marginBottom: '0.5rem' }}>Call volume between services</li>
                <li style={{ marginBottom: '0.5rem' }}>Error rates per service</li>
                <li style={{ marginBottom: '0.5rem' }}>Performance hotspots</li>
              </ul>

              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Fetching Service Dependencies from the API</div>
                <SyntaxHighlighter code={`// Zipkin Dependencies API
// GET /api/v2/dependencies?endTs=1705334625000&lookback=86400000
// Returns JSON array of service links:
// [
//   { "parent": "api-gateway", "child": "auth-service", "callCount": 1523 },
//   { "parent": "api-gateway", "child": "order-service", "callCount": 4210 },
//   { "parent": "order-service", "child": "inventory-service", "callCount": 4180 },
//   { "parent": "order-service", "child": "payment-service", "callCount": 3890,
//     "errorCount": 23 }
// ]

// Programmatic dependency monitoring
public class DependencyMonitor {
    private final String zipkinUrl;

    // Fetch and alert on error-heavy dependencies
    public void checkDependencyHealth() throws Exception {
        long now = System.currentTimeMillis();
        long oneDayAgo = 86400000L;

        String url = String.format(
            "%s/api/v2/dependencies?endTs=%d&lookback=%d",
            zipkinUrl, now, oneDayAgo
        );

        // Parse response and check error rates
        List<Dependency> deps = fetchDependencies(url);
        for (Dependency dep : deps) {
            if (dep.errorCount > 0) {
                double errorRate = (double) dep.errorCount / dep.callCount;
                if (errorRate > 0.05) { // > 5% error rate
                    alertTeam(dep.parent, dep.child, errorRate);
                }
            }
        }
    }
}`} />
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Best Practices</h3>
              <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Use sampling in production (10-20%) to reduce overhead</li>
                <li style={{ marginBottom: '0.5rem' }}>Add meaningful tags for business context</li>
                <li style={{ marginBottom: '0.5rem' }}>Set up alerts for high latency traces</li>
                <li style={{ marginBottom: '0.5rem' }}>Regularly review dependency graphs for architecture issues</li>
                <li style={{ marginBottom: '0.5rem' }}>Use Elasticsearch for better query performance at scale</li>
              </ul>

              <div style={{
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem' }}>Production Best Practices Configuration</div>
                <SyntaxHighlighter code={`@Configuration
public class ZipkinProductionConfig {

    // Best Practice 1: Use Kafka sender for reliability
    @Bean
    public Sender kafkaSender() {
        return KafkaSender.newBuilder()
            .bootstrapServers("kafka:9092")
            .topic("zipkin")
            .build();
    }

    // Best Practice 2: Add meaningful service tags globally
    @Bean
    public SpanCustomizer spanCustomizer(Tracing tracing) {
        return tracing.currentTraceContext()
            .get() != null ? tracing.tracer().currentSpanCustomizer()
            : null;
    }

    // Best Practice 3: Tag spans with environment context
    @Bean
    public SpanHandler environmentTagger() {
        return new SpanHandler() {
            @Override
            public boolean end(
                    TraceContext context, MutableSpan span, Cause cause) {
                span.tag("environment", System.getenv("ENV"));
                span.tag("version", System.getenv("APP_VERSION"));
                span.tag("region", System.getenv("AWS_REGION"));
                return true; // keep the span
            }
        };
    }

    // Best Practice 4: Exclude health check endpoints
    @Bean
    public HttpTracingCustomizer skipHealthChecks() {
        return builder -> builder.serverSampler(
            HttpRuleSampler.newBuilder()
                .addRule(null, "/actuator/**", 0.0f)
                .addRule(null, "/health", 0.0f)
                .build()
        );
    }
}`} />
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default Zipkin

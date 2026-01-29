import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

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
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
        >
          Back to Frameworks
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(to right, #a78bfa, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0
        }}>
          Zipkin Distributed Tracing
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'center',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Distributed tracing system for monitoring and troubleshooting microservices architectures
      </p>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #374151',
        overflowX: 'auto'
      }}>
        {['overview', 'architecture', 'spans', 'integration', 'ui'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            style={{
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab ? '#8b5cf6' : 'transparent',
              color: activeSection === tab ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== tab) {
                e.target.style.backgroundColor = '#374151'
                e.target.style.color = '#d1d5db'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== tab) {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#9ca3af'
              }
            }}
          >
            {tab}
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

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>When to Use Zipkin</h3>
              <ul style={{ marginLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Microservices architectures with multiple service calls</li>
                <li style={{ marginBottom: '0.5rem' }}>Debugging latency issues in distributed systems</li>
                <li style={{ marginBottom: '0.5rem' }}>Understanding service dependencies</li>
                <li style={{ marginBottom: '0.5rem' }}>Performance monitoring and optimization</li>
              </ul>
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
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>3. Query Service</h4>
                <p style={{ marginBottom: '0.5rem' }}>
                  Provides API to find and retrieve traces from storage.
                  Powers the Zipkin UI with trace data.
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>4. Web UI</h4>
                <p style={{ marginBottom: '0.5rem' }}>
                  Visualizes traces, service dependencies, and performance metrics.
                  Allows searching and filtering of traces.
                </p>
              </div>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Data Flow</h3>
              <ol style={{ marginLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Instrumented applications send span data to Collector</li>
                <li style={{ marginBottom: '0.5rem' }}>Collector validates and persists to Storage</li>
                <li style={{ marginBottom: '0.5rem' }}>UI queries data via Query Service</li>
                <li style={{ marginBottom: '0.5rem' }}>Users analyze traces through Web UI</li>
              </ol>
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

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Trace Structure</h3>
              <p style={{ marginBottom: '1rem' }}>
                A trace is a collection of spans that share the same trace ID, representing the complete journey of a request through your system.
              </p>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Common Annotations</h3>
              <ul style={{ marginLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>cs (Client Send)</strong>: Client sent request</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>sr (Server Receive)</strong>: Server received request</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>ss (Server Send)</strong>: Server sent response</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>cr (Client Receive)</strong>: Client received response</li>
              </ul>

              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#111827',
                borderRadius: '8px',
                borderLeft: '4px solid #8b5cf6'
              }}>
                <strong>Example:</strong> A user request flows through API Gateway → Auth Service → Order Service → Database.
                This creates one trace with multiple spans, one for each service interaction.
              </div>
            </div>
          </div>
        )}

        {activeSection === 'integration' && (
          <div>
            <h2 style={{ color: '#a78bfa', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Spring Boot Integration</h2>
            <div style={{ color: '#d1d5db', lineHeight: '1.8', fontSize: '1.05rem' }}>
              <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>Dependencies</h3>
              <pre style={{
                backgroundColor: '#111827',
                padding: '1rem',
                borderRadius: '8px',
                overflow: 'auto',
                marginBottom: '1.5rem'
              }}>
{`<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>`}
              </pre>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Configuration</h3>
              <pre style={{
                backgroundColor: '#111827',
                padding: '1rem',
                borderRadius: '8px',
                overflow: 'auto',
                marginBottom: '1.5rem'
              }}>
{`# application.yml
spring:
  application:
    name: my-service
  zipkin:
    base-url: http://localhost:9411
    sender:
      type: web  # or kafka, rabbit
  sleuth:
    sampler:
      probability: 1.0  # Sample 100% of traces (use 0.1 for 10% in prod)`}
              </pre>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Custom Spans</h3>
              <pre style={{
                backgroundColor: '#111827',
                padding: '1rem',
                borderRadius: '8px',
                overflow: 'auto',
                marginBottom: '1.5rem'
              }}>
{`@Service
public class OrderService {
    private final Tracer tracer;

    public OrderService(Tracer tracer) {
        this.tracer = tracer;
    }

    public Order processOrder(OrderRequest request) {
        // Create custom span
        Span span = tracer.nextSpan().name("process-order");
        try (Tracer.SpanInScope ws = tracer.withSpan(span.start())) {
            // Add custom tags
            span.tag("order.id", request.getOrderId());
            span.tag("customer.id", request.getCustomerId());

            // Add annotation
            span.annotate("validation.start");
            validateOrder(request);
            span.annotate("validation.complete");

            // Business logic here
            Order order = createOrder(request);

            return order;
        } finally {
            span.end();
        }
    }
}`}
              </pre>

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Async Operations</h3>
              <pre style={{
                backgroundColor: '#111827',
                padding: '1rem',
                borderRadius: '8px',
                overflow: 'auto'
              }}>
{`@Async
public CompletableFuture<Result> asyncOperation() {
    // Sleuth automatically propagates trace context to async methods
    // No additional code needed!
    return CompletableFuture.completedFuture(processData());
}`}
              </pre>
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

              <h3 style={{ color: '#8b5cf6', marginTop: '2rem', marginBottom: '1rem' }}>Best Practices</h3>
              <ul style={{ marginLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Use sampling in production (10-20%) to reduce overhead</li>
                <li style={{ marginBottom: '0.5rem' }}>Add meaningful tags for business context</li>
                <li style={{ marginBottom: '0.5rem' }}>Set up alerts for high latency traces</li>
                <li style={{ marginBottom: '0.5rem' }}>Regularly review dependency graphs for architecture issues</li>
                <li style={{ marginBottom: '0.5rem' }}>Use Elasticsearch for better query performance at scale</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default Zipkin

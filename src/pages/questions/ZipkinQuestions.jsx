import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function ZipkinQuestions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

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
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
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

      // Bold section headers
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

      // Numbered section headers
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

      // Regular text
      result.push(
        <div key={lineIndex} style={{ marginTop: '0.5rem', textAlign: 'left' }}>
          {line}
        </div>
      )
    }

    return result
  }

  const questions = [
    {
      id: 1,
      category: 'Fundamentals',
      difficulty: 'Medium',
      question: 'What is Zipkin and explain its architecture and components for distributed tracing',
      answer: `**Zipkin:**
Open-source distributed tracing system that helps gather timing data needed to troubleshoot latency problems in service architectures

**Key Features:**
- Collects timing data for microservices
- Provides dependency analysis between services
- Visualizes trace data as timelines
- Helps identify performance bottlenecks
- Supports multiple transport protocols (HTTP, Kafka, RabbitMQ)
- Storage backends (In-memory, MySQL, Cassandra, Elasticsearch)
- Query and visualization interface

**Architecture Components:**

**1. Instrumentation Libraries:**
\`\`\`yaml
# Client libraries for various languages/frameworks
- Spring Cloud Sleuth (Java/Spring Boot)
- Brave (Java)
- Zipkin-js (Node.js)
- Zipkin-go (Go)
- Py_zipkin (Python)
\`\`\`

**2. Transport Layer:**
\`\`\`yaml
# How spans are sent to Zipkin
HTTP:
  - Direct HTTP POST to Zipkin server
  - Simple but couples services to Zipkin

Kafka:
  - Asynchronous messaging
  - Better for high throughput
  - Decouples services from Zipkin

RabbitMQ:
  - Message queue based transport
  - Provides reliability and buffering
\`\`\`

**3. Collector:**
\`\`\`java
// Receives and validates trace data
public class ZipkinCollector {
  // Accepts spans via HTTP, Kafka, RabbitMQ
  // Validates and sanitizes incoming spans
  // Stores spans in backend storage

  @PostMapping("/api/v2/spans")
  public ResponseEntity<Void> collectSpans(
    @RequestBody List<Span> spans
  ) {
    // Validate spans
    // Store in database
    return ResponseEntity.accepted().build();
  }
}
\`\`\`

**4. Storage:**
\`\`\`yaml
# Supported storage backends
In-Memory:
  - For development/testing
  - Fast but not persistent
  - Limited capacity

MySQL:
  - Relational storage
  - Good for small deployments
  - Schema-based

Cassandra:
  - Distributed NoSQL
  - High write throughput
  - Scalable

Elasticsearch:
  - Full-text search capabilities
  - Good query performance
  - Popular for production
\`\`\`

**5. API/Query Service:**
\`\`\`java
// REST API for querying traces
public class ZipkinAPI {
  // GET /api/v2/traces?serviceName=order-service
  // GET /api/v2/trace/{traceId}
  // GET /api/v2/services
  // GET /api/v2/spans?serviceName=order-service

  @GetMapping("/api/v2/trace/{traceId}")
  public List<Span> getTrace(@PathVariable String traceId) {
    return storage.getTrace(traceId);
  }
}
\`\`\`

**6. Web UI:**
\`\`\`yaml
# Browser-based interface for:
- Searching traces by service, span name, tags
- Visualizing trace timelines
- Analyzing service dependencies
- Viewing trace details and annotations
\`\`\`

**Trace Data Model:**

**Span Structure:**
\`\`\`json
{
  "traceId": "1234567890abcdef",
  "id": "abcdef1234567890",
  "parentId": "fedcba0987654321",
  "name": "get /api/orders",
  "timestamp": 1609459200000000,
  "duration": 150000,
  "kind": "SERVER",
  "localEndpoint": {
    "serviceName": "order-service",
    "ipv4": "192.168.1.10",
    "port": 8080
  },
  "remoteEndpoint": {
    "serviceName": "api-gateway",
    "ipv4": "192.168.1.5",
    "port": 8080
  },
  "tags": {
    "http.method": "GET",
    "http.path": "/api/orders/123",
    "http.status_code": "200",
    "error": "false"
  },
  "annotations": [
    {
      "timestamp": 1609459200050000,
      "value": "cache.miss"
    }
  ]
}
\`\`\``
    },
    {
      id: 2,
      category: 'Integration',
      difficulty: 'Medium',
      question: 'How do you integrate Zipkin with Spring Boot microservices?',
      answer: `**Spring Boot + Zipkin Integration:**

**1. Dependencies:**
\`\`\`xml
<!-- pom.xml -->
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-sleuth-zipkin</artifactId>
</dependency>
\`\`\`

**2. Configuration:**
\`\`\`yaml
# application.yml
spring:
  application:
    name: order-service

  sleuth:
    sampler:
      probability: 1.0  # Sample 100% of requests (use 0.1 for 10% in prod)

  zipkin:
    base-url: http://localhost:9411
    enabled: true
    sender:
      type: web  # or kafka, rabbit

    # For Kafka transport
    # sender:
    #   type: kafka
    # kafka:
    #   topic: zipkin

# Logging with trace IDs
logging:
  pattern:
    level: '%5p [\${spring.application.name:},%X{traceId:-},%X{spanId:-}]'
\`\`\`

**3. Automatic Instrumentation:**
\`\`\`java
// Spring Cloud Sleuth automatically traces:
// - REST controllers
// - RestTemplate calls
// - WebClient calls
// - Feign clients
// - Messaging (RabbitMQ, Kafka)
// - Scheduled tasks
// - Async operations

@RestController
public class OrderController {

  @Autowired
  private RestTemplate restTemplate;

  @GetMapping("/orders/{id}")
  public Order getOrder(@PathVariable Long id) {
    // This call is automatically traced
    Payment payment = restTemplate.getForObject(
      "http://payment-service/payments/" + id,
      Payment.class
    );

    return new Order(id, payment);
  }
}
\`\`\`

**4. Custom Spans:**
\`\`\`java
@Service
public class OrderService {

  @Autowired
  private Tracer tracer;

  public Order processOrder(Long orderId) {
    // Create custom span
    Span span = tracer.nextSpan().name("process-order");

    try (Tracer.SpanInScope ws = tracer.withSpan(span.start())) {
      // Add custom tags
      span.tag("order.id", orderId.toString());
      span.tag("order.type", "standard");

      // Add event/annotation
      span.annotate("validation.started");

      // Business logic
      Order order = validateAndProcess(orderId);

      span.annotate("validation.completed");

      return order;
    } catch (Exception e) {
      span.tag("error", e.getMessage());
      throw e;
    } finally {
      span.end();
    }
  }

  // Using @NewSpan annotation
  @NewSpan(name = "calculate-total")
  public BigDecimal calculateTotal(Order order) {
    // Automatically creates a new span
    return order.getItems().stream()
      .map(Item::getPrice)
      .reduce(BigDecimal.ZERO, BigDecimal::add);
  }

  // Continue existing span
  @ContinueSpan
  public void updateInventory(@SpanTag("order.id") Long orderId) {
    // Continues current span and adds orderId as tag
  }
}
\`\`\`

**5. RestTemplate Configuration:**
\`\`\`java
@Configuration
public class RestTemplateConfig {

  @Bean
  @LoadBalanced  // If using service discovery
  public RestTemplate restTemplate() {
    return new RestTemplate();
    // Sleuth automatically adds tracing interceptors
  }
}
\`\`\`

**6. WebClient Configuration:**
\`\`\`java
@Configuration
public class WebClientConfig {

  @Bean
  public WebClient webClient() {
    return WebClient.builder()
      .build();
    // Sleuth automatically adds tracing filters
  }
}

@Service
public class PaymentClient {

  @Autowired
  private WebClient webClient;

  public Mono<Payment> getPayment(Long id) {
    return webClient.get()
      .uri("http://payment-service/payments/" + id)
      .retrieve()
      .bodyToMono(Payment.class);
    // Trace context automatically propagated
  }
}
\`\`\`

**7. Baggage Propagation:**
\`\`\`yaml
# application.yml
spring:
  sleuth:
    baggage:
      remote-fields: user-id, request-id
      correlation-fields: user-id, request-id
\`\`\`

\`\`\`java
@RestController
public class ApiController {

  @Autowired
  private BaggageField userIdField;

  @GetMapping("/api/resource")
  public Resource getResource(@RequestHeader("user-id") String userId) {
    // Set baggage that will propagate to all downstream services
    userIdField.updateValue(userId);

    // Call downstream service - userId will be in trace context
    return processResource();
  }
}
\`\`\`

**8. Kafka Integration:**
\`\`\`xml
<dependency>
  <groupId>org.springframework.kafka</groupId>
  <artifactId>spring-kafka</artifactId>
</dependency>
\`\`\`

\`\`\`java
@Configuration
public class KafkaConfig {

  @Bean
  public ProducerFactory<String, Order> producerFactory() {
    Map<String, Object> config = new HashMap<>();
    config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
    // Sleuth adds tracing headers automatically
    return new DefaultKafkaProducerFactory<>(config);
  }
}

@Service
public class OrderPublisher {

  @Autowired
  private KafkaTemplate<String, Order> kafkaTemplate;

  public void publishOrder(Order order) {
    // Trace context automatically added to Kafka headers
    kafkaTemplate.send("orders", order);
  }
}

@KafkaListener(topics = "orders")
public void consumeOrder(Order order, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) {
  // Trace context automatically extracted from headers
  processOrder(order);
}
\`\`\``
    },
    {
      id: 3,
      category: 'Advanced',
      difficulty: 'Hard',
      question: 'Explain Zipkin sampling strategies and performance optimization techniques',
      answer: `**Sampling Strategies:**

**1. Probability-Based Sampling:**
\`\`\`yaml
# application.yml
spring:
  sleuth:
    sampler:
      probability: 0.1  # Sample 10% of requests
\`\`\`

\`\`\`java
// Custom probability sampler
@Configuration
public class SamplingConfig {

  @Bean
  public Sampler customSampler() {
    return Sampler.create(0.1f);  // 10% sampling
  }
}
\`\`\`

**2. Rate-Limiting Sampler:**
\`\`\`java
@Configuration
public class SamplingConfig {

  @Bean
  public Sampler rateLimitingSampler() {
    // Sample max 10 traces per second
    return RateLimitingSampler.create(10);
  }
}
\`\`\`

**3. Custom Sampling Logic:**
\`\`\`java
@Component
public class CustomSampler extends Sampler {

  @Override
  public boolean isSampled(long traceId) {
    // Sample based on custom logic
    return shouldSample(traceId);
  }

  private boolean shouldSample(long traceId) {
    // Always sample errors
    if (hasError()) {
      return true;
    }

    // Sample 100% of admin requests
    if (isAdminRequest()) {
      return true;
    }

    // Sample 10% of regular requests
    return traceId % 10 == 0;
  }
}
\`\`\`

**4. Per-Operation Sampling:**
\`\`\`java
@Configuration
public class OperationSamplingConfig {

  @Bean
  public Sampler operationSampler() {
    return new Sampler() {
      @Override
      public boolean isSampled(long traceId) {
        String operation = getCurrentOperation();

        // High-value operations - sample 100%
        if (operation.startsWith("/api/payment")) {
          return true;
        }

        // Health checks - sample 1%
        if (operation.startsWith("/actuator/health")) {
          return traceId % 100 == 0;
        }

        // Default - sample 10%
        return traceId % 10 == 0;
      }
    };
  }
}
\`\`\`

**Performance Optimization:**

**1. Async Reporting:**
\`\`\`java
@Configuration
public class ZipkinConfig {

  @Bean
  public Sender kafkaSender() {
    // Use Kafka for async, non-blocking reporting
    return KafkaSender.newBuilder()
      .bootstrapServers("localhost:9092")
      .topic("zipkin")
      .encoding(Encoding.JSON)
      .messageMaxBytes(1000000)
      .build();
  }

  @Bean
  public AsyncReporter<Span> spanReporter() {
    return AsyncReporter.builder(kafkaSender())
      .queuedMaxSpans(1000)  // Buffer size
      .messageTimeout(1, TimeUnit.SECONDS)
      .build();
  }
}
\`\`\`

**2. Batching:**
\`\`\`java
@Bean
public AsyncReporter<Span> batchingReporter(Sender sender) {
  return AsyncReporter.builder(sender)
    .queuedMaxSpans(10000)
    .queuedMaxBytes(10000000)
    .messageMaxBytes(5000000)
    .messageTimeout(1, TimeUnit.SECONDS)
    .closeTimeout(1, TimeUnit.SECONDS)
    .build();
}
\`\`\`

**3. Storage Optimization (Elasticsearch):**
\`\`\`yaml
# zipkin-server configuration
zipkin:
  storage:
    type: elasticsearch
    elasticsearch:
      hosts: http://localhost:9200
      index: zipkin
      date-separator: '-'
      index-shards: 5
      index-replicas: 1
      # Retention policy
      autocomplete-ttl: 3600000  # 1 hour
      autocomplete-cardinality: 20000
\`\`\`

**4. Index Optimization:**
\`\`\`json
{
  "settings": {
    "index": {
      "number_of_shards": 5,
      "number_of_replicas": 1,
      "requests.cache.enable": true,
      "refresh_interval": "30s"
    }
  },
  "mappings": {
    "properties": {
      "traceId": {
        "type": "keyword",
        "norms": false
      },
      "timestamp_millis": {
        "type": "date",
        "format": "epoch_millis"
      }
    }
  }
}
\`\`\`

**5. Span Filtering:**
\`\`\`java
@Component
public class SpanFilter extends BraveTracingFilter {

  @Override
  public boolean isTraced(HttpServletRequest request) {
    String path = request.getRequestURI();

    // Don't trace health checks
    if (path.startsWith("/actuator/health")) {
      return false;
    }

    // Don't trace static resources
    if (path.startsWith("/static/") || path.endsWith(".css") || path.endsWith(".js")) {
      return false;
    }

    return super.isTraced(request);
  }
}
\`\`\`

**6. Reduced Span Size:**
\`\`\`java
@Configuration
public class TracingConfig {

  @Bean
  public SpanHandler spanHandler() {
    return new SpanHandler() {
      @Override
      public boolean end(TraceContext context, MutableSpan span, Cause cause) {
        // Remove large tags
        span.tag("http.request.body", null);
        span.tag("http.response.body", null);

        // Keep only essential tags
        return true;
      }
    };
  }
}
\`\`\`

**7. Data Retention:**
\`\`\`bash
# Curator for Elasticsearch cleanup
curator delete indices --older-than 7 --time-unit days --timestring '%Y-%m-%d'

# Cassandra TTL
CREATE TABLE zipkin2.span (
  trace_id blob,
  ts_uuid timeuuid,
  ...
) WITH default_time_to_live = 604800;  -- 7 days
\`\`\`

**8. Query Optimization:**
\`\`\`java
// Use indexed fields for queries
GET /api/v2/traces?serviceName=order-service&minDuration=100000

// Limit lookback window
GET /api/v2/traces?serviceName=order-service&lookback=3600000  // 1 hour

// Limit result size
GET /api/v2/traces?serviceName=order-service&limit=10
\`\`\`

**Monitoring Zipkin:**
\`\`\`yaml
# Zipkin server metrics endpoint
management:
  metrics:
    export:
      prometheus:
        enabled: true
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus

# Key metrics to monitor:
- zipkin.collector.messages (incoming spans)
- zipkin.collector.spans (processed spans)
- zipkin.storage.throttle (storage backpressure)
- zipkin.query.requests (query load)
\`\`\``
    },
    {
      id: 4,
      category: 'Troubleshooting',
      difficulty: 'Medium',
      question: 'How do you troubleshoot common Zipkin issues and analyze traces for performance problems?',
      answer: `**Common Issues:**

**1. Missing Traces:**
\`\`\`yaml
# Check sampling configuration
spring:
  sleuth:
    sampler:
      probability: 1.0  # Ensure sampling in dev

# Enable debug logging
logging:
  level:
    org.springframework.cloud.sleuth: DEBUG
    zipkin2: DEBUG
\`\`\`

**2. Trace Context Not Propagating:**
\`\`\`java
// Verify headers are being sent
@Component
public class TracingInterceptor implements ClientHttpRequestInterceptor {

  @Override
  public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) {
    // Check for tracing headers
    System.out.println("X-B3-TraceId: " + request.getHeaders().getFirst("X-B3-TraceId"));
    System.out.println("X-B3-SpanId: " + request.getHeaders().getFirst("X-B3-SpanId"));

    return execution.execute(request, body);
  }
}
\`\`\`

**3. Performance Analysis:**

**Identify Slow Services:**
\`\`\`
# In Zipkin UI:
1. Search for traces with high duration
2. Filter: minDuration=1000000 (1 second in microseconds)
3. Sort by duration
4. Identify service with longest span
\`\`\`

**Analyze Dependencies:**
\`\`\`
# Zipkin Dependencies View shows:
- Call graph between services
- Call volumes
- Error rates
- Average latencies

# Look for:
- Chatty services (too many calls)
- Long-running operations
- Services with high error rates
\`\`\`

**4. Debug Span Creation:**
\`\`\`java
@Component
public class DebugTracingHandler extends SpanHandler {

  @Override
  public boolean end(TraceContext context, MutableSpan span, Cause cause) {
    System.out.println("Span: " + span.name() +
                       ", Duration: " + span.finishTimestamp() - span.startTimestamp() +
                       ", Tags: " + span.tags());
    return true;
  }
}
\`\`\`

**5. Storage Connection Issues:**
\`\`\`yaml
# Increase timeout and retry settings
zipkin:
  storage:
    elasticsearch:
      timeout: 10000
      max-requests: 64
      pipeline: _none

# Monitor Zipkin logs for storage errors
logging:
  level:
    zipkin2.storage: DEBUG
\`\`\`

**Performance Analysis Techniques:**

**1. Critical Path Analysis:**
\`\`\`
# In trace timeline:
- Identify the critical path (longest sequential chain)
- Focus optimization on spans in critical path
- Parallel operations don't block critical path
\`\`\`

**2. Database Query Analysis:**
\`\`\`java
// Add custom tags for DB queries
@Aspect
public class DatabaseTracingAspect {

  @Autowired
  private Tracer tracer;

  @Around("execution(* javax.sql.DataSource.getConnection(..))")
  public Object traceConnection(ProceedingJoinPoint pjp) throws Throwable {
    Span span = tracer.nextSpan().name("db.connection");
    try (Tracer.SpanInScope ws = tracer.withSpan(span.start())) {
      span.tag("db.type", "mysql");
      return pjp.proceed();
    } finally {
      span.end();
    }
  }
}
\`\`\`

**3. Cache Analysis:**
\`\`\`java
@Service
public class CachedDataService {

  @Autowired
  private Tracer tracer;

  public Data getData(String key) {
    Span span = tracer.currentSpan();

    Data cached = cache.get(key);
    if (cached != null) {
      span.tag("cache", "hit");
      span.annotate("cache.hit");
      return cached;
    }

    span.tag("cache", "miss");
    span.annotate("cache.miss");

    Data data = fetchFromDb(key);
    cache.put(key, data);
    return data;
  }
}
\`\`\`

**Best Practices:**
\`\`\`yaml
# 1. Use meaningful span names
Good: "mysql.query.users"
Bad: "query"

# 2. Add relevant tags
- http.method, http.path, http.status
- db.type, db.statement
- cache.hit, cache.miss
- error information

# 3. Use annotations for important events
- Validation start/end
- Cache operations
- External API calls

# 4. Keep spans focused
- One span per logical operation
- Don't create too many nested spans
- Balance detail vs overhead

# 5. Sample appropriately
- 100% in development
- 10-20% in production
- 100% for errors
- 100% for critical paths
\`\`\``
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#ef4444',
      'Integration': '#3b82f6',
      'Advanced': '#7c3aed',
      'Troubleshooting': '#f59e0b'
    }
    return colors[category] || '#6b7280'
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': '#10b981',
      'Medium': '#f59e0b',
      'Hard': '#dc2626'
    }
    return colors[difficulty] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
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
          textAlign: 'left',
            fontWeight: '600',
            backgroundColor: '#4b5563',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#1d4ed8'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#93c5fd',
          margin: 0
        }}>
          Zipkin Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#9ca3af',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive Zipkin questions covering distributed tracing, instrumentation, sampling, and performance optimization.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((q) => (
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
                  ? `${getCategoryColor(q.category)}25`
                  : '#1f2937',
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
                  e.currentTarget.style.backgroundColor = '#1f2937'
                }
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', textAlign: 'left' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getCategoryColor(q.category),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.category}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getDifficultyColor(q.difficulty),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: '#f9fafb',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{
                fontSize: '1.5rem',
                color: getCategoryColor(q.category),
                fontWeight: 'bold',
                marginLeft: '1rem',
                transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ▼
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
          textAlign: 'left',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  fontFamily: 'system-ui, -apple-system, sans-serif',

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
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        borderRadius: '12px',
        border: '2px solid #3b82f6'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#93c5fd', marginBottom: '0.5rem', textAlign: 'left' }}>
          💡 Zipkin Best Practices
        </h3>
        <ul style={{ color: '#bfdbfe', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Use appropriate sampling rates (10-20% in production)</li>
          <li>Always sample errors and critical paths</li>
          <li>Use meaningful span names and tags</li>
          <li>Implement async reporting with batching</li>
          <li>Configure proper data retention policies</li>
          <li>Monitor Zipkin server performance</li>
          <li>Use Elasticsearch for production storage</li>
          <li>Analyze trace timelines to identify bottlenecks</li>
        </ul>
      </div>
    </div>
  )
}

export default ZipkinQuestions

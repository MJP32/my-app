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
      .replace(/\b(String|List|ArrayList|Map|HashMap|Optional|Exception|Override|Integer|Long|Component|Bean|Configuration|Autowired|Health|HealthIndicator|MeterRegistry|Counter|Timer|Gauge|Endpoint|ReadOperation|WriteOperation|SecurityFilterChain|HttpSecurity)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

function Actuator({ onBack, breadcrumb }) {
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
          background: 'linear-gradient(to right, #6ee7b7, #34d399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0
        }}>
          Spring Boot Actuator
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Production-ready features to help monitor and manage Spring Boot applications
      </p>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #374151',
        overflowX: 'auto'
      }}>
        {['overview', 'endpoints', 'metrics', 'health', 'configuration'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            style={{
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab ? '#10b981' : 'transparent',
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

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              What is Spring Boot Actuator?
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Spring Boot Actuator provides production-ready features for monitoring and managing Spring Boot applications.
              It includes built-in endpoints for health checks, metrics, application info, and more.
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Key Benefit:</strong> Out-of-the-box observability without writing custom monitoring code
              </p>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              Getting Started - Maven Dependency
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// build.gradle
dependencies {
    implementation "org.springframework.boot:spring-boot-starter-actuator"
    implementation "io.micrometer:micrometer-registry-prometheus"
}

// Or Maven pom.xml
// <dependency>
//     <groupId>org.springframework.boot</groupId>
//     <artifactId>spring-boot-starter-actuator</artifactId>
// </dependency>
// <dependency>
//     <groupId>io.micrometer</groupId>
//     <artifactId>micrometer-registry-prometheus</artifactId>
// </dependency>`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Key Features
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                { icon: '📊', title: 'Metrics Collection', desc: 'JVM metrics, HTTP request metrics, database connection pool stats' },
                { icon: '💚', title: 'Health Checks', desc: 'Monitor application health and dependencies status' },
                { icon: '📝', title: 'Application Info', desc: 'Build info, git commit details, custom application metadata' },
                { icon: '⚙️', title: 'Configuration', desc: 'View application configuration and environment properties' },
                { icon: '🔍', title: 'Auditing', desc: 'Track security events and user actions' },
                { icon: '🎯', title: 'HTTP Trace', desc: 'View recent HTTP requests and responses' }
              ].map((feature, index) => (
                <div key={index} style={{
                  backgroundColor: '#1f2937',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #374151'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Basic Actuator Application
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              A minimal Spring Boot application with Actuator enabled and a custom info contributor:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@SpringBootApplication
public class ActuatorDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ActuatorDemoApplication.class, args);
    }

    // Custom InfoContributor to add runtime details
    @Bean
    public InfoContributor runtimeInfoContributor() {
        return builder -> {
            Map<String, Object> runtimeInfo = new HashMap<>();
            runtimeInfo.put("javaVersion", System.getProperty("java.version"));
            runtimeInfo.put("availableProcessors",
                Runtime.getRuntime().availableProcessors());
            runtimeInfo.put("maxMemory",
                Runtime.getRuntime().maxMemory() / (1024 * 1024) + " MB");
            builder.withDetail("runtime", runtimeInfo);
        };
    }
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Endpoints Section */}
      {activeSection === 'endpoints' && (
        <div style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
            Common Actuator Endpoints
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { endpoint: '/actuator/health', method: 'GET', desc: 'Shows application health status', color: '#10b981' },
              { endpoint: '/actuator/info', method: 'GET', desc: 'Display application information', color: '#3b82f6' },
              { endpoint: '/actuator/metrics', method: 'GET', desc: 'List all available metrics', color: '#8b5cf6' },
              { endpoint: '/actuator/metrics/{name}', method: 'GET', desc: 'Get specific metric details', color: '#8b5cf6' },
              { endpoint: '/actuator/env', method: 'GET', desc: 'Show environment properties', color: '#f59e0b' },
              { endpoint: '/actuator/beans', method: 'GET', desc: 'List all Spring beans', color: '#06b6d4' },
              { endpoint: '/actuator/mappings', method: 'GET', desc: 'Display all @RequestMapping paths', color: '#ec4899' },
              { endpoint: '/actuator/prometheus', method: 'GET', desc: 'Prometheus-formatted metrics', color: '#ef4444' }
            ].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <div style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: item.color,
                  color: 'white',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}>
                  {item.method}
                </div>
                <div style={{ flex: 1 }}>
                  <code style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#6ee7b7',
                    backgroundColor: '#064e3b',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    {item.endpoint}
                  </code>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '0.25rem 0 0 0' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '2rem', marginBottom: '1rem' }}>
            Custom Actuator Endpoint
          </h3>
          <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Create custom endpoints to expose application-specific operational data:
          </p>
          <div style={{
            backgroundColor: '#1e1e1e',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid #374151',
            marginBottom: '1.5rem'
          }}>
            <SyntaxHighlighter code={`@Component
@Endpoint(id = "features")
public class FeaturesEndpoint {

    private final Map<String, Boolean> featureFlags = new ConcurrentHashMap<>();

    public FeaturesEndpoint() {
        featureFlags.put("darkMode", true);
        featureFlags.put("betaSearch", false);
        featureFlags.put("newCheckout", true);
    }

    // GET /actuator/features
    @ReadOperation
    public Map<String, Boolean> getAllFeatures() {
        return Collections.unmodifiableMap(featureFlags);
    }

    // GET /actuator/features/{name}
    @ReadOperation
    public Boolean getFeature(@Selector String name) {
        return featureFlags.get(name);
    }

    // POST /actuator/features/{name}
    @WriteOperation
    public void setFeature(@Selector String name, boolean enabled) {
        featureFlags.put(name, enabled);
    }
}`} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '1rem' }}>
            WebMvcEndpointHandlerMapping - Expose via REST
          </h3>
          <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Extend actuator with a web-specific endpoint for richer HTTP interactions:
          </p>
          <div style={{
            backgroundColor: '#1e1e1e',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid #374151'
          }}>
            <SyntaxHighlighter code={`@Component
@RestControllerEndpoint(id = "cache-management")
public class CacheManagementEndpoint {

    @Autowired
    private CacheManager cacheManager;

    // GET /actuator/cache-management
    @GetMapping(produces = "application/json")
    public Map<String, Object> getCacheStats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        for (String cacheName : cacheManager.getCacheNames()) {
            Cache cache = cacheManager.getCache(cacheName);
            stats.put(cacheName, Map.of(
                "type", cache.getClass().getSimpleName(),
                "nativeCache", cache.getNativeCache().toString()
            ));
        }
        return stats;
    }

    // DELETE /actuator/cache-management/{cacheName}
    @DeleteMapping("/{cacheName}")
    public ResponseEntity<Void> evictCache(
            @PathVariable String cacheName) {
        Cache cache = cacheManager.getCache(cacheName);
        if (cache != null) {
            cache.clear();
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}`} />
          </div>
        </div>
      )}

      {/* Metrics Section */}
      {activeSection === 'metrics' && (
        <div style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
            Available Metrics
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {[
              { category: 'JVM Metrics', metrics: ['jvm.memory.used', 'jvm.memory.max', 'jvm.gc.pause', 'jvm.threads.live'] },
              { category: 'HTTP Metrics', metrics: ['http.server.requests', 'http.server.requests.count', 'http.server.requests.max'] },
              { category: 'Database Metrics', metrics: ['jdbc.connections.active', 'jdbc.connections.max', 'hikaricp.connections.usage'] },
              { category: 'System Metrics', metrics: ['system.cpu.usage', 'system.load.average.1m', 'process.uptime'] }
            ].map((group, index) => (
              <div key={index} style={{
                backgroundColor: '#1f2937',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#d1d5db', marginBottom: '1rem' }}>
                  {group.category}
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {group.metrics.map((metric, idx) => (
                    <li key={idx} style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                      <code style={{ backgroundColor: '#064e3b', color: '#6ee7b7', padding: '0.125rem 0.375rem', borderRadius: '3px' }}>
                        {metric}
                      </code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '2rem', marginBottom: '1rem' }}>
            Custom Metrics with Micrometer
          </h3>
          <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Use Micrometer to register custom counters, gauges, and timers for your business logic:
          </p>
          <div style={{
            backgroundColor: '#1e1e1e',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid #374151',
            marginBottom: '1.5rem'
          }}>
            <SyntaxHighlighter code={`@Component
public class OrderMetrics {

    private final Counter ordersPlaced;
    private final Counter ordersFailed;
    private final Timer orderProcessingTime;
    private final AtomicInteger activeOrders = new AtomicInteger(0);

    public OrderMetrics(MeterRegistry registry) {
        // Counter - tracks total number of events
        this.ordersPlaced = Counter.builder("orders.placed")
            .description("Total orders placed")
            .tag("type", "all")
            .register(registry);

        this.ordersFailed = Counter.builder("orders.failed")
            .description("Total failed orders")
            .register(registry);

        // Timer - tracks duration and count
        this.orderProcessingTime = Timer.builder("orders.processing.time")
            .description("Time to process an order")
            .publishPercentiles(0.5, 0.95, 0.99)
            .register(registry);

        // Gauge - tracks current value
        Gauge.builder("orders.active", activeOrders, AtomicInteger::get)
            .description("Currently active orders")
            .register(registry);
    }

    public void recordOrderPlaced() {
        ordersPlaced.increment();
        activeOrders.incrementAndGet();
    }

    public void recordOrderCompleted(long durationMs) {
        orderProcessingTime.record(durationMs, TimeUnit.MILLISECONDS);
        activeOrders.decrementAndGet();
    }

    public void recordOrderFailed() {
        ordersFailed.increment();
        activeOrders.decrementAndGet();
    }
}`} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '1rem' }}>
            Timed Annotation for Method-Level Metrics
          </h3>
          <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Use annotations to automatically instrument method execution times:
          </p>
          <div style={{
            backgroundColor: '#1e1e1e',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid #374151'
          }}>
            <SyntaxHighlighter code={`@Configuration
public class MetricsConfig {

    // Enable @Timed annotation support
    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }
}

@Service
public class PaymentService {

    // Automatically creates timer metric: "payment.process"
    @Timed(value = "payment.process",
           description = "Time to process payment",
           percentiles = {0.5, 0.95, 0.99})
    public PaymentResult processPayment(PaymentRequest request) {
        // Business logic here
        return gateway.charge(request);
    }

    @Timed(value = "payment.refund", histogram = true)
    public RefundResult processRefund(String transactionId) {
        return gateway.refund(transactionId);
    }
}`} />
          </div>
        </div>
      )}

      {/* Health Section */}
      {activeSection === 'health' && (
        <div style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
            Health Indicators
          </h2>
          <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1.5rem' }}>
            Actuator automatically configures health indicators based on dependencies in your classpath:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              { name: 'Database', indicator: 'db', status: 'UP' },
              { name: 'Disk Space', indicator: 'diskSpace', status: 'UP' },
              { name: 'Redis', indicator: 'redis', status: 'UP' },
              { name: 'RabbitMQ', indicator: 'rabbit', status: 'UP' },
              { name: 'Elasticsearch', indicator: 'elasticsearch', status: 'UP' },
              { name: 'MongoDB', indicator: 'mongo', status: 'UP' }
            ].map((health, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: '#064e3b',
                borderRadius: '8px',
                border: '2px solid #10b981'
              }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: '#d1d5db' }}>{health.name}</div>
                  <code style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{health.indicator}</code>
                </div>
                <div style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {health.status}
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '2rem', marginBottom: '1rem' }}>
            Custom Health Indicator
          </h3>
          <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Implement custom health checks for external services, APIs, or business-critical resources:
          </p>
          <div style={{
            backgroundColor: '#1e1e1e',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid #374151',
            marginBottom: '1.5rem'
          }}>
            <SyntaxHighlighter code={`@Component
public class ExternalApiHealthIndicator implements HealthIndicator {

    private final RestTemplate restTemplate;
    private final String apiBaseUrl;

    public ExternalApiHealthIndicator(
            RestTemplate restTemplate,
            @Value("\${external.api.base-url}") String apiBaseUrl) {
        this.restTemplate = restTemplate;
        this.apiBaseUrl = apiBaseUrl;
    }

    @Override
    public Health health() {
        try {
            long startTime = System.currentTimeMillis();
            ResponseEntity<String> response = restTemplate
                .getForEntity(apiBaseUrl + "/health", String.class);
            long responseTime = System.currentTimeMillis() - startTime;

            if (response.getStatusCode().is2xxSuccessful()) {
                return Health.up()
                    .withDetail("url", apiBaseUrl)
                    .withDetail("responseTimeMs", responseTime)
                    .withDetail("status", response.getStatusCode().value())
                    .build();
            }

            return Health.down()
                .withDetail("url", apiBaseUrl)
                .withDetail("status", response.getStatusCode().value())
                .build();

        } catch (Exception ex) {
            return Health.down()
                .withDetail("url", apiBaseUrl)
                .withDetail("error", ex.getMessage())
                .build();
        }
    }
}`} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '1rem' }}>
            Composite Health with Health Groups
          </h3>
          <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Group health indicators for Kubernetes liveness and readiness probes:
          </p>
          <div style={{
            backgroundColor: '#1e1e1e',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid #374151'
          }}>
            <SyntaxHighlighter code={`@Component
public class DatabaseHealthIndicator implements HealthIndicator {

    @Autowired
    private DataSource dataSource;

    @Override
    public Health health() {
        try (Connection conn = dataSource.getConnection()) {
            if (conn.isValid(3)) {
                return Health.up()
                    .withDetail("database", conn.getMetaData().getDatabaseProductName())
                    .withDetail("version", conn.getMetaData().getDatabaseProductVersion())
                    .build();
            }
        } catch (Exception e) {
            return Health.down(e).build();
        }
        return Health.down().withDetail("error", "Connection invalid").build();
    }
}

// application.yml configuration for health groups:
// management:
//   endpoint:
//     health:
//       group:
//         liveness:
//           include: livenessState
//         readiness:
//           include: readinessState, db, redis
//       probes:
//         enabled: true
//
// Kubernetes probes:
//   GET /actuator/health/liveness  -> liveness probe
//   GET /actuator/health/readiness -> readiness probe`} />
          </div>
        </div>
      )}

      {/* Configuration Section */}
      {activeSection === 'configuration' && (
        <div style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
            Configuration Example
          </h2>
          <div style={{
            backgroundColor: '#1f2937',
            color: '#e5e7eb',
            padding: '1.5rem',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0 }}>{`# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
      base-path: /actuator

  endpoint:
    health:
      show-details: when-authorized
      probes:
        enabled: true

  metrics:
    export:
      prometheus:
        enabled: true
    tags:
      application: \${spring.application.name}
      environment: \${spring.profiles.active}

# Enable specific endpoints
info:
  app:
    name: My Application
    version: 1.0.0
    description: Production Spring Boot App`}</pre>
          </div>

          <div style={{
            marginTop: '1.5rem',
            backgroundColor: '#064e3b',
            padding: '1rem',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981'
          }}>
            <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
              <strong>Security Note:</strong> Always secure your actuator endpoints in production! Use Spring Security to restrict access.
            </p>
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '2rem', marginBottom: '1rem' }}>
            Securing Actuator Endpoints
          </h3>
          <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Use Spring Security to restrict actuator access to authorized users only:
          </p>
          <div style={{
            backgroundColor: '#1e1e1e',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid #374151',
            marginBottom: '1.5rem'
          }}>
            <SyntaxHighlighter code={`@Configuration
public class ActuatorSecurityConfig {

    @Bean
    public SecurityFilterChain actuatorSecurityFilterChain(
            HttpSecurity http) throws Exception {
        return http
            .securityMatcher("/actuator/**")
            .authorizeHttpRequests(auth -> auth
                // Health and info are public
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/actuator/info").permitAll()
                // Prometheus endpoint for monitoring stack
                .requestMatchers("/actuator/prometheus").hasRole("MONITORING")
                // All other endpoints require ADMIN
                .anyRequest().hasRole("ADMIN")
            )
            .httpBasic(Customizer.withDefaults())
            .build();
    }

    @Bean
    public UserDetailsService actuatorUsers() {
        var monitoring = User.withUsername("prometheus")
            .password("{bcrypt}$2a$10$...")
            .roles("MONITORING")
            .build();

        var admin = User.withUsername("admin")
            .password("{bcrypt}$2a$10$...")
            .roles("ADMIN", "MONITORING")
            .build();

        return new InMemoryUserDetailsManager(monitoring, admin);
    }
}`} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '1rem' }}>
            Prometheus + Grafana Integration
          </h3>
          <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Configure Micrometer to export metrics in Prometheus format for dashboarding:
          </p>
          <div style={{
            backgroundColor: '#1e1e1e',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid #374151',
            marginBottom: '1.5rem'
          }}>
            <SyntaxHighlighter code={`@Configuration
public class PrometheusMetricsConfig {

    @Bean
    public MeterRegistryCustomizer<MeterRegistry> commonTags() {
        return registry -> registry.config()
            .commonTags(
                "application", "order-service",
                "environment", "production",
                "region", "us-east-1"
            );
    }

    // Custom metric binder for domain-specific metrics
    @Bean
    public MeterBinder queueSizeMetrics(OrderQueue orderQueue) {
        return registry -> {
            Gauge.builder("order.queue.size", orderQueue, OrderQueue::size)
                .description("Number of orders waiting in queue")
                .tag("priority", "all")
                .register(registry);

            Gauge.builder("order.queue.oldest.age.seconds",
                    orderQueue, q -> q.oldestAgeSeconds())
                .description("Age of oldest order in queue")
                .register(registry);
        };
    }
}

// prometheus.yml scrape config:
// scrape_configs:
//   - job_name: 'spring-boot-app'
//     metrics_path: '/actuator/prometheus'
//     scrape_interval: 15s
//     basic_auth:
//       username: 'prometheus'
//       password: 'secret'
//     static_configs:
//       - targets: ['localhost:8080']`} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '1rem' }}>
            Custom Actuator Configuration Bean
          </h3>
          <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Programmatically customize endpoint behavior and CORS settings:
          </p>
          <div style={{
            backgroundColor: '#1e1e1e',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid #374151'
          }}>
            <SyntaxHighlighter code={`@Configuration
public class ActuatorConfig {

    // Customize CORS for actuator endpoints
    @Bean
    public CorsEndpointProperties corsProperties() {
        var cors = new CorsEndpointProperties();
        cors.setAllowedOrigins(List.of("https://monitoring.example.com"));
        cors.setAllowedMethods(List.of("GET", "POST"));
        return cors;
    }

    // Customize health endpoint to include detailed status
    @Bean
    public HttpCodeStatusMapper httpCodeStatusMapper() {
        return statusCode -> {
            if ("DOWN".equals(statusCode)) {
                return 503; // Service Unavailable
            }
            if ("OUT_OF_SERVICE".equals(statusCode)) {
                return 503;
            }
            return 200;
        };
    }

    // Register shutdown hook for graceful metrics export
    @Bean
    public ApplicationListener<ContextClosedEvent> shutdownHook(
            MeterRegistry registry) {
        return event -> {
            if (registry instanceof PrometheusMeterRegistry prometheus) {
                // Push final metrics before shutdown
                prometheus.scrape();
            }
        };
    }
}`} />
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Actuator

import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function ActuatorQuestions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c', '#0891b2']
    let colorIndex = 0

    return lines.map((line, lineIndex) => {
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
      }

      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
      }

      return <div key={lineIndex}>{line}</div>
    })
  }

  const questions = [
    {
      id: 1,
      category: 'Fundamentals',
      difficulty: 'Medium',
      question: 'What is Spring Boot Actuator and explain its key endpoints and monitoring capabilities',
      answer: `**Spring Boot Actuator:**
Production-ready features to help you monitor and manage your application when it's deployed to production

**Key Features:**
- Health checks and application status
- Metrics collection (JVM, HTTP, database)
- Application configuration details
- Request mapping information
- Thread dump and heap dump
- Audit events
- HTTP trace information
- Custom endpoints

**Common Endpoints:**

**1. /actuator/health:**
\`\`\`json
{
  "status": "UP",
  "components": {
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 500000000000,
        "free": 250000000000,
        "threshold": 10485760
      }
    },
    "db": {
      "status": "UP",
      "details": {
        "database": "PostgreSQL",
        "validationQuery": "isValid()"
      }
    }
  }
}
\`\`\`

**2. /actuator/metrics:**
\`\`\`json
{
  "names": [
    "jvm.memory.used",
    "jvm.memory.max",
    "http.server.requests",
    "system.cpu.usage",
    "jdbc.connections.active",
    "cache.gets",
    "logback.events"
  ]
}
\`\`\`

**3. /actuator/metrics/{metricName}:**
\`\`\`json
{
  "name": "http.server.requests",
  "measurements": [
    {
      "statistic": "COUNT",
      "value": 1523.0
    },
    {
      "statistic": "TOTAL_TIME",
      "value": 12.5
    },
    {
      "statistic": "MAX",
      "value": 0.152
    }
  ],
  "availableTags": [
    {
      "tag": "uri",
      "values": ["/api/users", "/api/orders"]
    },
    {
      "tag": "method",
      "values": ["GET", "POST", "PUT"]
    },
    {
      "tag": "status",
      "values": ["200", "404", "500"]
    }
  ]
}
\`\`\`

**4. /actuator/info:**
\`\`\`yaml
# application.yml
info:
  app:
    name: Order Service
    description: Handles order processing
    version: 1.2.3
  build:
    artifact: order-service
    version: 1.2.3
    time: 2024-01-15T10:30:00Z
\`\`\`

\`\`\`json
{
  "app": {
    "name": "Order Service",
    "description": "Handles order processing",
    "version": "1.2.3"
  },
  "build": {
    "artifact": "order-service",
    "version": "1.2.3",
    "time": "2024-01-15T10:30:00Z"
  }
}
\`\`\`

**5. /actuator/env:**
\`\`\`json
{
  "activeProfiles": ["production"],
  "propertySources": [
    {
      "name": "systemProperties",
      "properties": {
        "java.version": {
          "value": "17.0.1"
        }
      }
    },
    {
      "name": "applicationConfig",
      "properties": {
        "server.port": {
          "value": 8080
        },
        "spring.datasource.url": {
          "value": "******"  // Sanitized sensitive values
        }
      }
    }
  ]
}
\`\`\`

**6. /actuator/beans:**
\`\`\`json
{
  "contexts": {
    "application": {
      "beans": {
        "orderService": {
          "scope": "singleton",
          "type": "com.example.OrderService",
          "dependencies": ["orderRepository", "kafkaTemplate"]
        }
      }
    }
  }
}
\`\`\`

**7. /actuator/mappings:**
\`\`\`json
{
  "contexts": {
    "application": {
      "mappings": {
        "dispatcherServlets": {
          "dispatcherServlet": [
            {
              "handler": "com.example.OrderController#getOrder(Long)",
              "predicate": "{GET [/api/orders/{id}]}",
              "details": {
                "requestMappingConditions": {
                  "methods": ["GET"],
                  "patterns": ["/api/orders/{id}"]
                }
              }
            }
          ]
        }
      }
    }
  }
}
\`\`\`

**8. /actuator/threaddump:**
\`\`\`json
{
  "threads": [
    {
      "threadName": "http-nio-8080-exec-1",
      "threadId": 25,
      "threadState": "RUNNABLE",
      "stackTrace": [
        {
          "methodName": "processRequest",
          "className": "com.example.OrderController",
          "lineNumber": 45
        }
      ]
    }
  ]
}
\`\`\``
    },
    {
      id: 2,
      category: 'Configuration',
      difficulty: 'Medium',
      question: 'How do you configure and secure Spring Boot Actuator endpoints?',
      answer: `**Basic Configuration:**

**1. Dependencies:**
\`\`\`xml
<!-- pom.xml -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!-- For Prometheus metrics -->
<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
\`\`\`

**2. Endpoint Configuration:**
\`\`\`yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus  # Specific endpoints
        # include: '*'  # All endpoints (NOT recommended for production)
        exclude: threaddump,heapdump  # Exclude sensitive endpoints

      base-path: /actuator  # Default base path
      path-mapping:
        health: healthcheck  # Custom path: /actuator/healthcheck

  endpoint:
    health:
      show-details: when-authorized  # always, never, when-authorized
      show-components: when-authorized
      probes:
        enabled: true  # Kubernetes probes

    info:
      enabled: true

    metrics:
      enabled: true

  server:
    port: 9090  # Separate management port
    address: 127.0.0.1  # Only localhost access
\`\`\`

**3. Security Configuration:**
\`\`\`java
@Configuration
@EnableWebSecurity
public class ActuatorSecurityConfig {

  @Bean
  public SecurityFilterChain actuatorSecurity(HttpSecurity http) throws Exception {
    http
      .requestMatcher(EndpointRequest.toAnyEndpoint())
      .authorizeHttpRequests(auth -> auth
        // Public endpoints
        .requestMatchers(EndpointRequest.to(HealthEndpoint.class)).permitAll()
        .requestMatchers(EndpointRequest.to(InfoEndpoint.class)).permitAll()

        // Admin only endpoints
        .requestMatchers(EndpointRequest.to(
          MetricsEndpoint.class,
          PrometheusScrapingEndpoint.class
        )).hasRole("ADMIN")

        // Sensitive endpoints - admin with specific permissions
        .requestMatchers(EndpointRequest.to(
          ShutdownEndpoint.class,
          ThreadDumpEndpoint.class,
          HeapDumpEndpoint.class
        )).hasRole("SUPER_ADMIN")

        .anyRequest().authenticated()
      )
      .httpBasic();

    return http.build();
  }
}
\`\`\`

**4. Spring Security with Basic Auth:**
\`\`\`yaml
# application.yml
spring:
  security:
    user:
      name: admin
      password: \${ACTUATOR_PASSWORD}  # From environment variable
      roles: ADMIN

management:
  endpoints:
    web:
      exposure:
        include: '*'
  endpoint:
    health:
      show-details: when-authorized
\`\`\`

**5. Custom Security for Specific Endpoints:**
\`\`\`java
@Configuration
public class ActuatorSecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
      .authorizeHttpRequests(auth -> auth
        // Health endpoint - public
        .requestMatchers("/actuator/health").permitAll()
        .requestMatchers("/actuator/health/**").permitAll()

        // Info endpoint - public
        .requestMatchers("/actuator/info").permitAll()

        // Prometheus - requires API key
        .requestMatchers("/actuator/prometheus").hasAuthority("SCOPE_metrics")

        // All other actuator endpoints - admin only
        .requestMatchers("/actuator/**").hasRole("ADMIN")

        .anyRequest().authenticated()
      )
      .httpBasic(Customizer.withDefaults())
      .build();
  }
}
\`\`\`

**6. IP Whitelisting:**
\`\`\`java
@Component
public class ActuatorIPFilter implements Filter {

  private static final Set<String> ALLOWED_IPS = Set.of(
    "127.0.0.1",
    "10.0.0.0/8",  // Internal network
    "172.31.45.100"  // Monitoring server
  );

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {

    HttpServletRequest httpRequest = (HttpServletRequest) request;
    String requestURI = httpRequest.getRequestURI();

    if (requestURI.startsWith("/actuator")) {
      String remoteAddr = request.getRemoteAddr();

      if (!isAllowedIP(remoteAddr)) {
        ((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN);
        return;
      }
    }

    chain.doFilter(request, response);
  }

  private boolean isAllowedIP(String ip) {
    return ALLOWED_IPS.contains(ip);
  }
}
\`\`\`

**7. Sanitizing Sensitive Data:**
\`\`\`yaml
# application.yml
management:
  endpoint:
    env:
      show-values: when-authorized  # Hide sensitive values
      keys-to-sanitize: password,secret,key,token,credential

    configprops:
      show-values: when-authorized
      keys-to-sanitize: password,secret,key,token
\`\`\`

**8. Custom Sanitizer:**
\`\`\`java
@Component
public class CustomSanitizer implements SanitizingFunction {

  private static final Set<String> SENSITIVE_KEYS = Set.of(
    "password", "secret", "key", "token", "apikey", "credential"
  );

  @Override
  public SanitizableData apply(SanitizableData data) {
    String key = data.getKey().toLowerCase();

    for (String sensitive : SENSITIVE_KEYS) {
      if (key.contains(sensitive)) {
        return data.withValue("******");
      }
    }

    return data;
  }
}
\`\`\`

**9. CORS Configuration:**
\`\`\`yaml
# application.yml
management:
  endpoints:
    web:
      cors:
        allowed-origins: https://monitoring.example.com
        allowed-methods: GET,POST
        allowed-headers: '*'
        max-age: 3600
\`\`\`

**10. Production Best Practices:**
\`\`\`yaml
# application-production.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
        exclude: env,beans,configprops,threaddump,heapdump

  endpoint:
    health:
      show-details: when-authorized
      show-components: when-authorized

    shutdown:
      enabled: false  # Disable shutdown endpoint

  server:
    port: 9090  # Separate port
    address: 127.0.0.1  # Localhost only

  metrics:
    export:
      prometheus:
        enabled: true
        step: 1m

# Use with reverse proxy (nginx) for external access
\`\`\``
    },
    {
      id: 3,
      category: 'Custom Endpoints',
      difficulty: 'Hard',
      question: 'How do you create custom Actuator endpoints and health indicators?',
      answer: `**Custom Health Indicator:**

**1. Simple Health Indicator:**
\`\`\`java
@Component
public class DatabaseHealthIndicator implements HealthIndicator {

  @Autowired
  private DataSource dataSource;

  @Override
  public Health health() {
    try (Connection conn = dataSource.getConnection()) {
      if (conn.isValid(1)) {
        return Health.up()
          .withDetail("database", "PostgreSQL")
          .withDetail("validationQuery", "isValid()")
          .build();
      }
    } catch (SQLException e) {
      return Health.down()
        .withDetail("error", e.getMessage())
        .withException(e)
        .build();
    }

    return Health.down().build();
  }
}
\`\`\`

**2. Advanced Health Indicator:**
\`\`\`java
@Component
public class ExternalServiceHealthIndicator extends AbstractHealthIndicator {

  @Autowired
  private RestTemplate restTemplate;

  private static final String SERVICE_URL = "https://api.external-service.com/health";

  @Override
  protected void doHealthCheck(Health.Builder builder) {
    try {
      long startTime = System.currentTimeMillis();

      ResponseEntity<String> response = restTemplate.exchange(
        SERVICE_URL,
        HttpMethod.GET,
        null,
        String.class
      );

      long responseTime = System.currentTimeMillis() - startTime;

      if (response.getStatusCode().is2xxSuccessful()) {
        builder.up()
          .withDetail("service", "external-service")
          .withDetail("responseTime", responseTime + "ms")
          .withDetail("status", response.getStatusCode().value());
      } else {
        builder.down()
          .withDetail("status", response.getStatusCode().value())
          .withDetail("reason", "Unhealthy status code");
      }
    } catch (Exception e) {
      builder.down()
        .withDetail("error", e.getMessage())
        .withException(e);
    }
  }
}
\`\`\`

**3. Composite Health Indicator:**
\`\`\`java
@Component
public class CacheHealthIndicator implements HealthIndicator {

  @Autowired
  private CacheManager cacheManager;

  @Override
  public Health health() {
    Health.Builder builder = new Health.Builder();
    Map<String, Object> details = new HashMap<>();

    try {
      Collection<String> cacheNames = cacheManager.getCacheNames();
      details.put("cacheCount", cacheNames.size());
      details.put("cacheNames", cacheNames);

      for (String cacheName : cacheNames) {
        Cache cache = cacheManager.getCache(cacheName);
        if (cache != null) {
          details.put(cacheName + ".size", getCacheSize(cache));
        }
      }

      builder.up();
    } catch (Exception e) {
      builder.down();
      details.put("error", e.getMessage());
    }

    return builder.withDetails(details).build();
  }

  private int getCacheSize(Cache cache) {
    // Implementation depends on cache provider
    return 0;
  }
}
\`\`\`

**4. Custom Actuator Endpoint:**
\`\`\`java
@Endpoint(id = "deploymentInfo")
public class DeploymentInfoEndpoint {

  @ReadOperation
  public Map<String, Object> deploymentInfo() {
    Map<String, Object> info = new HashMap<>();
    info.put("deployedAt", System.getProperty("deployment.time"));
    info.put("environment", System.getProperty("spring.profiles.active"));
    info.put("version", System.getProperty("app.version"));
    info.put("hostname", getHostname());
    info.put("region", System.getProperty("aws.region"));
    return info;
  }

  private String getHostname() {
    try {
      return InetAddress.getLocalHost().getHostName();
    } catch (UnknownHostException e) {
      return "unknown";
    }
  }
}

@Configuration
public class EndpointConfig {
  @Bean
  public DeploymentInfoEndpoint deploymentInfoEndpoint() {
    return new DeploymentInfoEndpoint();
  }
}
\`\`\`

**5. Endpoint with Parameters:**
\`\`\`java
@Endpoint(id = "cacheControl")
public class CacheControlEndpoint {

  @Autowired
  private CacheManager cacheManager;

  @ReadOperation
  public Map<String, Object> getCacheInfo(
    @Selector String cacheName
  ) {
    Cache cache = cacheManager.getCache(cacheName);
    if (cache == null) {
      return Map.of("error", "Cache not found");
    }

    return Map.of(
      "name", cacheName,
      "size", getCacheSize(cache),
      "stats", getCacheStats(cache)
    );
  }

  @WriteOperation
  public void evictCache(@Selector String cacheName) {
    Cache cache = cacheManager.getCache(cacheName);
    if (cache != null) {
      cache.clear();
    }
  }

  @DeleteOperation
  public void evictCacheKey(
    @Selector String cacheName,
    @Selector String key
  ) {
    Cache cache = cacheManager.getCache(cacheName);
    if (cache != null) {
      cache.evict(key);
    }
  }

  private int getCacheSize(Cache cache) {
    return 0;  // Implementation specific
  }

  private Map<String, Object> getCacheStats(Cache cache) {
    return new HashMap<>();  // Implementation specific
  }
}
\`\`\`

**6. Web-only Endpoint:**
\`\`\`java
@WebEndpoint(id = "systemStatus")
public class SystemStatusEndpoint {

  @ReadOperation
  public ResponseEntity<Map<String, Object>> getSystemStatus() {
    Map<String, Object> status = new HashMap<>();

    Runtime runtime = Runtime.getRuntime();
    status.put("processors", runtime.availableProcessors());
    status.put("freeMemory", runtime.freeMemory());
    status.put("totalMemory", runtime.totalMemory());
    status.put("maxMemory", runtime.maxMemory());

    OperatingSystemMXBean osBean = ManagementFactory.getOperatingSystemMXBean();
    status.put("systemLoadAverage", osBean.getSystemLoadAverage());

    return ResponseEntity.ok(status);
  }
}
\`\`\`

**7. Custom Metrics:**
\`\`\`java
@Component
public class OrderMetrics {

  private final Counter orderCounter;
  private final Timer orderProcessingTime;
  private final Gauge activeOrders;

  public OrderMetrics(MeterRegistry registry) {
    this.orderCounter = Counter.builder("orders.created")
      .description("Total number of orders created")
      .tag("type", "online")
      .register(registry);

    this.orderProcessingTime = Timer.builder("orders.processing.time")
      .description("Order processing time")
      .tag("type", "standard")
      .register(registry);

    this.activeOrders = Gauge.builder("orders.active", this, OrderMetrics::getActiveOrderCount)
      .description("Number of active orders")
      .register(registry);
  }

  public void recordOrderCreated() {
    orderCounter.increment();
  }

  public void recordOrderProcessing(Runnable task) {
    orderProcessingTime.record(task);
  }

  private double getActiveOrderCount() {
    // Return active order count
    return 0.0;
  }
}
\`\`\`

**8. Info Contributor:**
\`\`\`java
@Component
public class CustomInfoContributor implements InfoContributor {

  @Autowired
  private ApplicationContext context;

  @Override
  public void contribute(Info.Builder builder) {
    Map<String, Object> customInfo = new HashMap<>();

    customInfo.put("beanCount", context.getBeanDefinitionCount());
    customInfo.put("startupDate", context.getStartupDate());
    customInfo.put("activeProfiles", context.getEnvironment().getActiveProfiles());

    builder.withDetail("application", customInfo);
  }
}
\`\`\`

**Using Custom Endpoints:**
\`\`\`bash
# Read operation
GET /actuator/deploymentInfo

# Read with selector
GET /actuator/cacheControl/userCache

# Write operation
POST /actuator/cacheControl/userCache

# Delete operation
DELETE /actuator/cacheControl/userCache/user123
\`\`\``
    },
    {
      id: 4,
      category: 'Monitoring',
      difficulty: 'Hard',
      question: 'How do you integrate Spring Boot Actuator with Prometheus and Grafana for monitoring?',
      answer: `**Prometheus Integration:**

**1. Dependencies:**
\`\`\`xml
<!-- pom.xml -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
\`\`\`

**2. Configuration:**
\`\`\`yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus,metrics

  endpoint:
    prometheus:
      enabled: true

  metrics:
    export:
      prometheus:
        enabled: true
        step: 1m  # Scrape interval

    tags:
      application: \${spring.application.name}
      environment: \${spring.profiles.active}
      region: us-east-1

    distribution:
      percentiles-histogram:
        http.server.requests: true
      sla:
        http.server.requests: 10ms,50ms,100ms,200ms,500ms,1s,2s

server:
  port: 8080

# Separate management port for metrics
# management:
#   server:
#     port: 9090
\`\`\`

**3. Prometheus Configuration:**
\`\`\`yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'spring-boot-app'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['localhost:8080']
        labels:
          application: 'order-service'
          environment: 'production'

  - job_name: 'spring-boot-multiple'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets:
        - 'order-service:8080'
        - 'payment-service:8080'
        - 'inventory-service:8080'
    relabel_configs:
      - source_labels: [__address__]
        target_label: instance
\`\`\`

**4. Custom Metrics for Prometheus:**
\`\`\`java
@Component
public class BusinessMetrics {

  private final MeterRegistry registry;
  private final Counter orderCounter;
  private final Timer orderTimer;
  private final DistributionSummary orderValueDistribution;

  public BusinessMetrics(MeterRegistry registry) {
    this.registry = registry;

    // Counter
    this.orderCounter = Counter.builder("orders_total")
      .description("Total number of orders")
      .tags("type", "online", "status", "completed")
      .register(registry);

    // Timer (includes count, total time, max)
    this.orderTimer = Timer.builder("order_processing_duration_seconds")
      .description("Order processing time")
      .tags("operation", "create")
      .publishPercentiles(0.5, 0.95, 0.99)  // p50, p95, p99
      .register(registry);

    // Distribution Summary
    this.orderValueDistribution = DistributionSummary.builder("order_value_dollars")
      .description("Order value distribution")
      .baseUnit("dollars")
      .publishPercentiles(0.5, 0.95, 0.99)
      .register(registry);

    // Gauge
    Gauge.builder("inventory_level", this, BusinessMetrics::getInventoryLevel)
      .description("Current inventory level")
      .tags("product", "widget")
      .register(registry);
  }

  public void recordOrder(BigDecimal amount) {
    orderCounter.increment();
    orderValueDistribution.record(amount.doubleValue());
  }

  public void recordProcessingTime(Runnable task) {
    orderTimer.record(task);
  }

  private double getInventoryLevel() {
    // Return current inventory level
    return 100.0;
  }
}
\`\`\`

**5. JVM Metrics (Auto-configured):**
\`\`\`promql
# CPU Usage
system_cpu_usage
process_cpu_usage

# Memory
jvm_memory_used_bytes{area="heap"}
jvm_memory_max_bytes{area="heap"}
jvm_memory_committed_bytes{area="heap"}

# GC
jvm_gc_pause_seconds_count
jvm_gc_pause_seconds_sum
jvm_gc_memory_promoted_bytes_total
jvm_gc_memory_allocated_bytes_total

# Threads
jvm_threads_live_threads
jvm_threads_daemon_threads
jvm_threads_peak_threads

# Classes
jvm_classes_loaded_classes
jvm_classes_unloaded_classes_total
\`\`\`

**6. HTTP Metrics:**
\`\`\`promql
# Request rate
rate(http_server_requests_seconds_count{uri="/api/orders"}[5m])

# Average response time
rate(http_server_requests_seconds_sum[5m]) / rate(http_server_requests_seconds_count[5m])

# P95 latency
histogram_quantile(0.95, http_server_requests_seconds_bucket)

# Error rate
sum(rate(http_server_requests_seconds_count{status=~"5.."}[5m])) / sum(rate(http_server_requests_seconds_count[5m]))
\`\`\`

**7. Grafana Dashboard JSON:**
\`\`\`json
{
  "dashboard": {
    "title": "Spring Boot Application Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_server_requests_seconds_count{application='order-service'}[5m])",
            "legendFormat": "{{uri}} - {{method}}"
          }
        ]
      },
      {
        "title": "P95 Latency",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_server_requests_seconds_bucket{application='order-service'}[5m]))",
            "legendFormat": "{{uri}}"
          }
        ]
      },
      {
        "title": "JVM Memory",
        "type": "graph",
        "targets": [
          {
            "expr": "jvm_memory_used_bytes{application='order-service',area='heap'}",
            "legendFormat": "Used"
          },
          {
            "expr": "jvm_memory_max_bytes{application='order-service',area='heap'}",
            "legendFormat": "Max"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(rate(http_server_requests_seconds_count{application='order-service',status=~'5..'}[5m])) / sum(rate(http_server_requests_seconds_count{application='order-service'}[5m])) * 100"
          }
        ]
      }
    ]
  }
}
\`\`\`

**8. Alert Rules:**
\`\`\`yaml
# prometheus-alerts.yml
groups:
  - name: spring_boot_alerts
    interval: 30s
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_server_requests_seconds_count{status=~"5.."}[5m]))
          /
          sum(rate(http_server_requests_seconds_count[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate on {{ $labels.application }}"
          description: "Error rate is {{ $value | humanizePercentage }}"

      - alert: HighMemoryUsage
        expr: |
          jvm_memory_used_bytes{area="heap"}
          /
          jvm_memory_max_bytes{area="heap"} > 0.9
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage on {{ $labels.application }}"

      - alert: SlowResponseTime
        expr: |
          histogram_quantile(0.95,
            rate(http_server_requests_seconds_bucket[5m])
          ) > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Slow response time on {{ $labels.uri }}"
\`\`\``
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#ef4444',
      'Configuration': '#3b82f6',
      'Custom Endpoints': '#7c3aed',
      'Monitoring': '#f59e0b'
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
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#111827', minHeight: '100vh' }}>
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
          color: '#1f2937',
          margin: 0
        }}>
          Spring Boot Actuator Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive Spring Boot Actuator questions covering endpoints, monitoring, custom health indicators, and Prometheus integration.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#e5e7eb'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.1)'
                : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'white',
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
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'white'
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
                  color: '#1f2937',
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
                backgroundColor: '#fafafa',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
          textAlign: 'left',
                  lineHeight: '1.8',
                  color: '#374151',
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
        backgroundColor: '#dcfce7',
        borderRadius: '12px',
        border: '2px solid #10b981'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#065f46', marginBottom: '0.5rem', textAlign: 'left' }}>
          💡 Actuator Best Practices
        </h3>
        <ul style={{ color: '#064e3b', lineHeight: '1.8', margin: '0.5rem 0', textAlign: 'left' }}>
          <li>Secure sensitive endpoints with proper authentication</li>
          <li>Use separate management port for actuator endpoints</li>
          <li>Sanitize sensitive configuration values</li>
          <li>Implement IP whitelisting for production</li>
          <li>Only expose necessary endpoints in production</li>
          <li>Create custom health indicators for critical dependencies</li>
          <li>Monitor actuator metrics with Prometheus/Grafana</li>
          <li>Set up alerts for critical metrics</li>
        </ul>
      </div>
    </div>
  )
}

export default ActuatorQuestions

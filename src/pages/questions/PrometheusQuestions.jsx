import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'

function PrometheusQuestions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'yaml'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'yaml'
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
      question: 'What is Prometheus and explain its architecture',
      answer: `**Prometheus:**
Open-source monitoring and alerting toolkit designed for reliability and scalability

**Key Features:**
- Multi-dimensional data model with time series identified by metric name and key-value pairs
- PromQL - powerful query language
- No reliance on distributed storage (autonomous single server nodes)
- Pull model over HTTP for time series collection
- Pushing time series via intermediary gateway
- Service discovery and static configuration for targets
- Multiple modes of graphing and dashboarding support

**Architecture Components:**

**1. Prometheus Server:**
\`\`\`yaml
# Main component that:
- Scrapes and stores metrics
- Evaluates alerting rules
- Serves PromQL queries
\`\`\`

**2. Client Libraries:**
\`\`\`java
// Instrument application code
import io.prometheus.client.Counter;
import io.prometheus.client.Histogram;

public class MyService {
    static final Counter requests = Counter.build()
        .name("http_requests_total")
        .help("Total HTTP requests")
        .labelNames("method", "endpoint")
        .register();

    static final Histogram requestDuration = Histogram.build()
        .name("http_request_duration_seconds")
        .help("HTTP request latency")
        .register();
}
\`\`\`

**3. Pushgateway:**
For short-lived batch jobs that can't be scraped

**4. Exporters:**
Expose metrics from third-party systems (JMX, MySQL, etc.)

**5. Alertmanager:**
Handles alerts sent by Prometheus server

**Data Model:**
\`\`\`
# Metric structure
<metric name>{<label name>=<label value>, ...}

# Examples
http_requests_total{method="POST", endpoint="/api/users"} 1027
api_request_duration_seconds{method="GET", endpoint="/api/products"} 0.234
\`\`\`

**Metric Types:**

**1. Counter:**
Cumulative metric that only increases
\`\`\`java
Counter httpRequests = Counter.build()
    .name("http_requests_total")
    .help("Total HTTP requests")
    .register();

httpRequests.inc();  // Increment by 1
httpRequests.inc(5); // Increment by 5
\`\`\`

**2. Gauge:**
Can go up or down (memory usage, temperature)
\`\`\`java
Gauge inProgressRequests = Gauge.build()
    .name("requests_in_progress")
    .help("Current requests being processed")
    .register();

inProgressRequests.inc();
inProgressRequests.dec();
inProgressRequests.set(42);
\`\`\`

**3. Histogram:**
Samples observations (request durations, response sizes)
\`\`\`java
Histogram requestDuration = Histogram.build()
    .name("http_request_duration_seconds")
    .help("HTTP request latency")
    .buckets(0.1, 0.5, 1, 2, 5)
    .register();

requestDuration.observe(0.234);
\`\`\`

**4. Summary:**
Similar to histogram but calculates configurable quantiles
\`\`\`java
Summary requestLatency = Summary.build()
    .name("http_request_latency_seconds")
    .help("Request latency")
    .quantile(0.5, 0.05)   // 50th percentile with 5% error
    .quantile(0.9, 0.01)   // 90th percentile with 1% error
    .quantile(0.99, 0.001) // 99th percentile with 0.1% error
    .register();

requestLatency.observe(0.456);
\`\`\`

**Configuration (prometheus.yml):**
\`\`\`yaml
global:
  scrape_interval: 15s      # How often to scrape targets
  evaluation_interval: 15s  # How often to evaluate rules

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'my-application'
    static_configs:
      - targets: ['localhost:8080']
    metrics_path: '/actuator/prometheus'
    scrape_interval: 10s

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
\`\`\`

**Scrape Process:**
\`\`\`
1. Prometheus pulls metrics from /metrics endpoint
2. Metrics exposed in Prometheus format
3. Data stored in time-series database
4. PromQL queries retrieve and aggregate data
5. Alerts evaluated based on rules
6. Alertmanager handles notifications
\`\`\``
    },
    {
      id: 2,
      category: 'PromQL',
      difficulty: 'Hard',
      question: 'Explain PromQL query language with practical examples',
      answer: `**PromQL (Prometheus Query Language):**

**Basic Queries:**

**1. Instant Vector (single time series):**
\`\`\`promql
# Get current value
http_requests_total

# With label filter
http_requests_total{method="GET"}

# Multiple label filters
http_requests_total{method="GET", status="200"}

# Regex matching
http_requests_total{endpoint=~"/api/.*"}

# Negative matching
http_requests_total{status!="200"}
\`\`\`

**2. Range Vector (time range):**
\`\`\`promql
# Last 5 minutes
http_requests_total[5m]

# Last hour
http_requests_total[1h]

# Last day
http_requests_total[1d]
\`\`\`

**Functions:**

**1. rate() - Per-second rate:**
\`\`\`promql
# Request rate per second over last 5 minutes
rate(http_requests_total[5m])

# With label aggregation
rate(http_requests_total{job="api"}[5m])
\`\`\`

**2. increase() - Total increase:**
\`\`\`promql
# Total increase in last hour
increase(http_requests_total[1h])
\`\`\`

**3. irate() - Instant rate:**
\`\`\`promql
# High-resolution rate (last 2 points)
irate(http_requests_total[5m])
\`\`\`

**Aggregation Operators:**

**1. sum() - Sum across dimensions:**
\`\`\`promql
# Total requests across all instances
sum(rate(http_requests_total[5m]))

# Sum by label
sum by (method) (rate(http_requests_total[5m]))

# Sum without specific label
sum without (instance) (rate(http_requests_total[5m]))
\`\`\`

**2. avg() - Average:**
\`\`\`promql
# Average response time by endpoint
avg by (endpoint) (http_request_duration_seconds)
\`\`\`

**3. max() / min():**
\`\`\`promql
# Maximum memory usage
max(process_memory_bytes)

# Minimum by pod
min by (pod) (process_cpu_seconds_total)
\`\`\`

**4. count():**
\`\`\`promql
# Number of instances
count(up)

# Number of pods per namespace
count by (namespace) (kube_pod_info)
\`\`\`

**5. topk() / bottomk():**
\`\`\`promql
# Top 10 endpoints by request count
topk(10, sum by (endpoint) (rate(http_requests_total[5m])))

# Bottom 5 by memory
bottomk(5, process_memory_bytes)
\`\`\`

**Advanced Queries:**

**1. Calculate Error Rate:**
\`\`\`promql
# Error rate percentage
sum(rate(http_requests_total{status=~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))
* 100
\`\`\`

**2. Calculate Latency Percentiles:**
\`\`\`promql
# 95th percentile latency
histogram_quantile(0.95,
  sum by (le) (rate(http_request_duration_seconds_bucket[5m]))
)

# 99th percentile by endpoint
histogram_quantile(0.99,
  sum by (endpoint, le) (rate(http_request_duration_seconds_bucket[5m]))
)
\`\`\`

**3. Calculate SLA/SLO:**
\`\`\`promql
# Availability SLA (% of successful requests)
sum(rate(http_requests_total{status="200"}[5m]))
/
sum(rate(http_requests_total[5m]))
* 100

# Latency SLO (% of requests under 500ms)
sum(rate(http_request_duration_seconds_bucket{le="0.5"}[5m]))
/
sum(rate(http_request_duration_seconds_count[5m]))
* 100
\`\`\`

**4. Rate of Change:**
\`\`\`promql
# Memory growth rate
deriv(process_memory_bytes[1h])
\`\`\`

**5. Prediction:**
\`\`\`promql
# Predict disk full in 4 hours
predict_linear(node_filesystem_avail_bytes[1h], 4 * 3600) < 0
\`\`\`

**Binary Operators:**

**1. Arithmetic:**
\`\`\`promql
# CPU usage percentage
100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory usage percentage
(node_memory_Active_bytes / node_memory_MemTotal_bytes) * 100
\`\`\`

**2. Comparison:**
\`\`\`promql
# Instances with high CPU
avg by (instance) (rate(node_cpu_seconds_total[5m])) > 0.8

# Pods with low memory
container_memory_usage_bytes < 100 * 1024 * 1024
\`\`\`

**Practical Examples:**

**1. Request Rate per Endpoint:**
\`\`\`promql
sum by (endpoint) (rate(http_requests_total[5m]))
\`\`\`

**2. Average Request Duration:**
\`\`\`promql
rate(http_request_duration_seconds_sum[5m])
/
rate(http_request_duration_seconds_count[5m])
\`\`\`

**3. Throughput (requests per minute):**
\`\`\`promql
rate(http_requests_total[5m]) * 60
\`\`\`

**4. Error Budget Consumption:**
\`\`\`promql
# 99.9% SLO, calculate error budget used
(1 - (
  sum(rate(http_requests_total{status="200"}[30d]))
  /
  sum(rate(http_requests_total[30d]))
)) / (1 - 0.999) * 100
\`\`\`

**5. Multi-Service Join:**
\`\`\`promql
# Join metrics from different services
sum by (service) (rate(http_requests_total[5m]))
*
on (service) group_left
max by (service) (service_version_info)
\`\`\`

**Time Functions:**
\`\`\`promql
# Current time
time()

# Day of week
day_of_week()

# Hour of day
hour()
\`\`\``
    },
    {
      id: 3,
      category: 'Alerting',
      difficulty: 'Medium',
      question: 'How do you configure alerting rules in Prometheus?',
      answer: `**Alerting in Prometheus:**

**Architecture:**
\`\`\`
Prometheus Server → Evaluates Rules → Sends Alerts → Alertmanager → Routes Alerts → Receivers
\`\`\`

**Alert Rules Configuration:**

**1. Basic Alert Rule:**
\`\`\`yaml
# /etc/prometheus/alerts.yml
groups:
  - name: example_alerts
    interval: 30s
    rules:
      - alert: HighRequestLatency
        expr: http_request_duration_seconds > 1
        for: 5m
        labels:
          severity: warning
          component: api
        annotations:
          summary: "High request latency on {{ $labels.instance }}"
          description: "Request latency is {{ $value }} seconds"
\`\`\`

**2. Multiple Severity Levels:**
\`\`\`yaml
groups:
  - name: api_alerts
    rules:
      # Warning at 80%
      - alert: HighCPUUsage
        expr: avg by (instance) (rate(process_cpu_seconds_total[5m])) > 0.8
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "CPU usage above 80% on {{ $labels.instance }}"
          description: "CPU usage is {{ $value | humanizePercentage }}"

      # Critical at 95%
      - alert: CriticalCPUUsage
        expr: avg by (instance) (rate(process_cpu_seconds_total[5m])) > 0.95
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "CRITICAL: CPU usage above 95% on {{ $labels.instance }}"
          description: "Immediate action required. CPU at {{ $value | humanizePercentage }}"
\`\`\`

**3. Common Alert Rules:**

**Service Down:**
\`\`\`yaml
- alert: ServiceDown
  expr: up == 0
  for: 1m
  labels:
    severity: critical
  annotations:
    summary: "Service {{ $labels.job }} is down"
    description: "{{ $labels.instance }} has been down for more than 1 minute"
\`\`\`

**High Error Rate:**
\`\`\`yaml
- alert: HighErrorRate
  expr: |
    sum(rate(http_requests_total{status=~"5.."}[5m])) by (job)
    /
    sum(rate(http_requests_total[5m])) by (job)
    > 0.05
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "High error rate on {{ $labels.job }}"
    description: "Error rate is {{ $value | humanizePercentage }}"
\`\`\`

**Disk Space Low:**
\`\`\`yaml
- alert: DiskSpaceLow
  expr: |
    (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 < 10
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Low disk space on {{ $labels.instance }}"
    description: "Only {{ $value }}% disk space remaining on {{ $labels.mountpoint }}"
\`\`\`

**Memory Pressure:**
\`\`\`yaml
- alert: HighMemoryUsage
  expr: |
    (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 90
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "High memory usage on {{ $labels.instance }}"
    description: "Memory usage is {{ $value }}%"
\`\`\`

**Pod Restart Loop:**
\`\`\`yaml
- alert: PodRestartingTooOften
  expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Pod {{ $labels.pod }} restarting frequently"
    description: "Pod has restarted {{ $value }} times in last 15 minutes"
\`\`\`

**Alertmanager Configuration:**

**1. Basic Setup:**
\`\`\`yaml
# alertmanager.yml
global:
  resolve_timeout: 5m
  slack_api_url: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL'

route:
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  receiver: 'team-notifications'

  routes:
    # Critical alerts to PagerDuty
    - match:
        severity: critical
      receiver: pagerduty
      continue: true

    # Warning alerts to Slack
    - match:
        severity: warning
      receiver: slack

receivers:
  - name: 'team-notifications'
    email_configs:
      - to: 'team@example.com'

  - name: 'slack'
    slack_configs:
      - channel: '#alerts'
        title: '{{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'

  - name: 'pagerduty'
    pagerduty_configs:
      - service_key: 'YOUR_SERVICE_KEY'
\`\`\`

**2. Advanced Routing:**
\`\`\`yaml
route:
  receiver: 'default'
  routes:
    # Database alerts to DBA team
    - match:
        component: database
      receiver: dba-team
      routes:
        - match:
            severity: critical
          receiver: dba-oncall

    # API alerts to API team
    - match_re:
        service: ^api-.*
      receiver: api-team
      group_by: [alertname, endpoint]

    # Infrastructure alerts
    - match:
        component: infrastructure
      receiver: infra-team
      group_wait: 30s
      group_interval: 5m
\`\`\`

**3. Inhibition Rules:**
Suppress alerts when other alerts are firing
\`\`\`yaml
inhibit_rules:
  # Don't alert on instance down if datacenter is down
  - source_match:
      alertname: DatacenterDown
    target_match:
      alertname: InstanceDown
    equal: ['datacenter']

  # Don't alert on high latency if service is down
  - source_match:
      severity: critical
      alertname: ServiceDown
    target_match_re:
      severity: warning
      alertname: .*Latency.*
    equal: ['service']
\`\`\`

**4. Notification Templates:**
\`\`\`yaml
templates:
  - '/etc/alertmanager/templates/*.tmpl'

receivers:
  - name: 'slack-detailed'
    slack_configs:
      - channel: '#production-alerts'
        title: '{{ .GroupLabels.alertname }}'
        text: |-
          {{ range .Alerts }}
          *Alert:* {{ .Annotations.summary }}
          *Description:* {{ .Annotations.description }}
          *Severity:* {{ .Labels.severity }}
          *Instance:* {{ .Labels.instance }}
          *Time:* {{ .StartsAt.Format "2006-01-02 15:04:05" }}
          {{ end }}
\`\`\`

**Testing Alerts:**
\`\`\`bash
# Send test alert
curl -X POST http://localhost:9093/api/v1/alerts -d '[
  {
    "labels": {
      "alertname": "TestAlert",
      "severity": "warning"
    },
    "annotations": {
      "summary": "This is a test alert"
    }
  }
]'

# Check alert status
curl http://localhost:9090/api/v1/alerts

# Check Alertmanager status
curl http://localhost:9093/api/v1/alerts
\`\`\``
    },
    {
      id: 4,
      category: 'Integration',
      difficulty: 'Medium',
      question: 'How do you integrate Prometheus with Spring Boot applications?',
      answer: `**Spring Boot + Prometheus Integration:**

**1. Add Dependencies:**
\`\`\`xml
<!-- pom.xml -->
<dependencies>
    <!-- Spring Boot Actuator -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>

    <!-- Micrometer Prometheus Registry -->
    <dependency>
        <groupId>io.micrometer</groupId>
        <artifactId>micrometer-registry-prometheus</artifactId>
    </dependency>
</dependencies>
\`\`\`

**2. Application Configuration:**
\`\`\`yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus,metrics
  metrics:
    export:
      prometheus:
        enabled: true
    distribution:
      percentiles-histogram:
        http.server.requests: true
    tags:
      application: \${spring.application.name}
      environment: \${spring.profiles.active}
\`\`\`

**3. Custom Metrics:**

**Counter Example:**
\`\`\`java
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final Counter orderCounter;
    private final Counter orderFailureCounter;

    public OrderService(MeterRegistry registry) {
        this.orderCounter = Counter.builder("orders_created_total")
            .description("Total number of orders created")
            .tag("type", "order")
            .register(registry);

        this.orderFailureCounter = Counter.builder("orders_failed_total")
            .description("Total number of failed orders")
            .tag("type", "order")
            .register(registry);
    }

    public void createOrder(Order order) {
        try {
            // Create order logic
            orderCounter.increment();
        } catch (Exception e) {
            orderFailureCounter.increment();
            throw e;
        }
    }
}
\`\`\`

**Gauge Example:**
\`\`\`java
import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Component;

@Component
public class QueueMetrics {
    private final Queue<Message> messageQueue = new ConcurrentLinkedQueue<>();

    public QueueMetrics(MeterRegistry registry) {
        Gauge.builder("queue_size", messageQueue, Queue::size)
            .description("Current queue size")
            .tag("queue", "messages")
            .register(registry);

        Gauge.builder("queue_capacity", this, QueueMetrics::getCapacity)
            .description("Maximum queue capacity")
            .tag("queue", "messages")
            .register(registry);
    }

    public int getCapacity() {
        return 1000;
    }
}
\`\`\`

**Timer Example:**
\`\`\`java
import io.micrometer.core.instrument.Timer;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    private final Timer paymentTimer;

    public PaymentService(MeterRegistry registry) {
        this.paymentTimer = Timer.builder("payment_processing_duration")
            .description("Payment processing time")
            .tag("service", "payment")
            .register(registry);
    }

    public void processPayment(Payment payment) {
        paymentTimer.record(() -> {
            // Payment processing logic
            Thread.sleep(100);
        });
    }

    // Alternative: manual timing
    public void processPaymentManual(Payment payment) {
        Timer.Sample sample = Timer.start();
        try {
            // Payment processing logic
        } finally {
            sample.stop(paymentTimer);
        }
    }
}
\`\`\`

**Distribution Summary (Histogram):**
\`\`\`java
import io.micrometer.core.instrument.DistributionSummary;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final DistributionSummary orderValueSummary;

    public OrderService(MeterRegistry registry) {
        this.orderValueSummary = DistributionSummary.builder("order_value")
            .description("Distribution of order values")
            .baseUnit("dollars")
            .tag("type", "order")
            .register(registry);
    }

    public void recordOrder(double value) {
        orderValueSummary.record(value);
    }
}
\`\`\`

**4. Custom Metrics Configuration:**
\`\`\`java
import io.micrometer.core.aop.TimedAspect;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MetricsConfig {

    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }

    @Bean
    public MeterRegistryCustomizer<MeterRegistry> metricsCommonTags() {
        return registry -> registry.config()
            .commonTags(
                "application", "my-service",
                "region", "us-east-1"
            );
    }
}
\`\`\`

**5. Using @Timed Annotation:**
\`\`\`java
import io.micrometer.core.annotation.Timed;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping("/{id}")
    @Timed(value = "product.get", description = "Time to get product")
    public Product getProduct(@PathVariable Long id) {
        return productService.findById(id);
    }

    @PostMapping
    @Timed(
        value = "product.create",
        description = "Time to create product",
        percentiles = {0.5, 0.95, 0.99}
    )
    public Product createProduct(@RequestBody Product product) {
        return productService.save(product);
    }
}
\`\`\`

**6. Custom Health Indicators:**
\`\`\`java
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        if (checkService()) {
            return Health.up()
                .withDetail("status", "Service is healthy")
                .withDetail("customMetric", 42)
                .build();
        }
        return Health.down()
            .withDetail("status", "Service is unhealthy")
            .withDetail("error", "Connection failed")
            .build();
    }

    private boolean checkService() {
        // Health check logic
        return true;
    }
}
\`\`\`

**7. Prometheus Configuration:**
\`\`\`yaml
# prometheus.yml
scrape_configs:
  - job_name: 'spring-boot-app'
    metrics_path: '/actuator/prometheus'
    scrape_interval: 15s
    static_configs:
      - targets: ['localhost:8080']
    relabel_configs:
      - source_labels: [__address__]
        target_label: instance
        regex: '([^:]+)(?::\\d+)?'
        replacement: '$1'
\`\`\`

**8. Example Metrics Endpoint Response:**
\`\`\`
# HELP orders_created_total Total number of orders created
# TYPE orders_created_total counter
orders_created_total{application="my-app",environment="prod",type="order"} 1523.0

# HELP payment_processing_duration_seconds Payment processing time
# TYPE payment_processing_duration_seconds summary
payment_processing_duration_seconds_count{application="my-app",service="payment"} 542.0
payment_processing_duration_seconds_sum{application="my-app",service="payment"} 54.2
payment_processing_duration_seconds_max{application="my-app",service="payment"} 0.523

# HELP jvm_memory_used_bytes The amount of used memory
# TYPE jvm_memory_used_bytes gauge
jvm_memory_used_bytes{application="my-app",area="heap",id="PS Eden Space"} 5.24288E8
\`\`\`

**9. Monitoring Queries:**
\`\`\`promql
# Request rate
rate(http_server_requests_seconds_count{application="my-app"}[5m])

# Average response time
rate(http_server_requests_seconds_sum{application="my-app"}[5m])
/
rate(http_server_requests_seconds_count{application="my-app"}[5m])

# Error rate
rate(http_server_requests_seconds_count{application="my-app",status=~"5.."}[5m])
\`\`\``
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#ef4444',
      'PromQL': '#3b82f6',
      'Alerting': '#f59e0b',
      'Integration': '#10b981'
    }
    return colors[category] || '#6b7280'
  }

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Medium' ? '#f59e0b' : '#dc2626'
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
          color: '#93c5fd',
          margin: 0
        }}>
          Prometheus Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive Prometheus questions covering monitoring, metrics, PromQL, alerting, and Spring Boot integration.
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
                  color: '#e2e8f0',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                  <CompletionCheckbox problemId={`PrometheusQuestions-${q.id}`} />
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
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: '2px solid #6366f1'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem', textAlign: 'left' }}>
          Prometheus Monitoring Best Practices
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Use labels wisely - avoid high cardinality</li>
          <li>Instrument application code with meaningful metrics</li>
          <li>Set up comprehensive alerting rules with proper thresholds</li>
          <li>Monitor SLIs/SLOs to track service reliability</li>
          <li>Use recording rules for frequently computed queries</li>
          <li>Implement proper service discovery for dynamic environments</li>
        </ul>
      </div>
    </div>
  )
}

export default PrometheusQuestions

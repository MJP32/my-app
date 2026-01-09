import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(#.*$|\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
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
      .replace(/\b(scrape_configs|job_name|static_configs|targets|metrics_path|scheme|labels|alerting|alertmanagers|rule_files|global|scrape_interval|evaluation_interval|external_labels|relabel_configs|metric_relabel_configs)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(sum|rate|irate|increase|avg|min|max|count|by|without|group_left|group_right|on|ignoring|offset|bool|and|or|unless)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(\d+\.?\d*[smhd]?)\b/g, '<span style="color: #b5cea8;">$1</span>')

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
      <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </pre>
  )
}

function Prometheus({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const topics = [
    {
      id: 1,
      name: 'Prometheus Fundamentals',
      icon: '📊',
      color: '#e85d1f',
      description: 'Time-series database and monitoring system',
      content: {
        explanation: 'Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays results, and triggers alerts when conditions are met. Its multi-dimensional data model and powerful query language make it ideal for modern cloud-native environments.',
        keyPoints: [
          'Time-Series Database: Stores metrics with timestamp and labels',
          'Pull Model: Scrapes metrics from HTTP endpoints',
          'Multi-dimensional Data: Labels for flexible querying',
          'PromQL: Powerful query language for data aggregation',
          'Service Discovery: Auto-discover targets (Kubernetes, Consul, EC2)',
          'Alertmanager: Handle alerts and notifications',
          'Exporters: Collect metrics from third-party systems',
          'Federation: Scale across multiple Prometheus servers'
        ],
        codeExample: `# prometheus.yml - Main Configuration
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    cluster: 'production'
    region: 'us-east-1'

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets: ['localhost:9093']

# Load alerting rules
rule_files:
  - 'alerts/*.yml'
  - 'recording_rules/*.yml'

# Scrape configurations
scrape_configs:
  # Prometheus self-monitoring
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Node Exporter (system metrics)
  - job_name: 'node'
    static_configs:
      - targets:
          - 'localhost:9100'
          - 'server1:9100'
          - 'server2:9100'
        labels:
          environment: 'production'

  # Application metrics
  - job_name: 'spring-boot-app'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['app1:8080', 'app2:8080']

  # Kubernetes service discovery
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\\d+)?;(\\d+)
        replacement: $1:$2
        target_label: __address__

# Docker Compose Deployment
version: '3'
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - ./alerts:/etc/prometheus/alerts
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=30d'
      - '--web.enable-lifecycle'

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'

volumes:
  prometheus-data:`
      }
    },
    {
      id: 2,
      name: 'PromQL Queries',
      icon: '🔍',
      color: '#3b82f6',
      description: 'Query language for metrics analysis',
      content: {
        explanation: 'PromQL (Prometheus Query Language) is a functional query language for selecting and aggregating time-series data. It supports instant vectors, range vectors, scalars, and aggregation operators. PromQL enables complex metric analysis, rate calculations, predictions, and alerting conditions.',
        keyPoints: [
          'Instant Vectors: Set of time series at a single timestamp',
          'Range Vectors: Set of time series over a time range',
          'Aggregation: sum, avg, min, max, count, topk, bottomk',
          'Rate Calculations: rate(), irate(), increase() for counters',
          'Math Operations: Arithmetic operators between metrics',
          'Label Matching: Filter by labels with =, !=, =~, !~',
          'Functions: histogram_quantile, predict_linear, time()',
          'Recording Rules: Pre-compute expensive queries'
        ],
        codeExample: `# Basic Metric Selection
# Get current CPU usage
node_cpu_seconds_total

# Filter by labels
node_cpu_seconds_total{mode="idle", instance="localhost:9100"}

# Regex label matching
http_requests_total{status=~"5..", method!="GET"}

# Rate Calculations
# Request rate per second (5m window)
rate(http_requests_total[5m])

# Instant rate (more sensitive to spikes)
irate(http_requests_total[1m])

# Total increase over time range
increase(http_requests_total[1h])

# Aggregation Operations
# Total requests per second across all instances
sum(rate(http_requests_total[5m]))

# Average by status code
avg(rate(http_requests_total[5m])) by (status)

# Top 5 endpoints by request count
topk(5, sum(rate(http_requests_total[5m])) by (path))

# 95th percentile response time
histogram_quantile(0.95,
  rate(http_request_duration_seconds_bucket[5m])
)

# CPU usage percentage
100 - (avg by (instance) (
  rate(node_cpu_seconds_total{mode="idle"}[5m])
) * 100)

# Memory usage percentage
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes)
/ node_memory_MemTotal_bytes * 100

# Disk I/O rate
rate(node_disk_written_bytes_total[5m])

# Advanced Queries
# Error rate (4xx + 5xx) percentage
sum(rate(http_requests_total{status=~"[45].."}[5m]))
/ sum(rate(http_requests_total[5m])) * 100

# Predict disk full time (linear regression)
predict_linear(
  node_filesystem_avail_bytes[1h],
  24 * 3600
) < 0

# Service availability (SLI)
sum(rate(http_requests_total{status="200"}[5m]))
/ sum(rate(http_requests_total[5m]))

# Request latency P99
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
)

# Recording Rules (prometheus-rules.yml)
groups:
  - name: api_metrics
    interval: 10s
    rules:
      # Pre-compute expensive query
      - record: job:http_requests:rate5m
        expr: sum(rate(http_requests_total[5m])) by (job)

      - record: job:http_errors:rate5m
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) by (job)

      - record: job:http_error_rate
        expr: |
          job:http_errors:rate5m / job:http_requests:rate5m

# Query API Examples
# HTTP API for instant queries
curl 'http://localhost:9090/api/v1/query?query=up'

# Range query
curl 'http://localhost:9090/api/v1/query_range?query=rate(http_requests_total[5m])&start=2024-01-01T00:00:00Z&end=2024-01-01T01:00:00Z&step=15s'

# Label values
curl 'http://localhost:9090/api/v1/label/job/values'`
      }
    },
    {
      id: 3,
      name: 'Alerting Rules',
      icon: '🚨',
      color: '#ef4444',
      description: 'Alert configuration and Alertmanager',
      content: {
        explanation: 'Prometheus alerting separates into two parts: alert rules in Prometheus define conditions, while Alertmanager handles notifications. This separation allows flexible routing, grouping, and notification handling. Alerts support severity levels, annotations, and various notification channels.',
        keyPoints: [
          'Alert Rules: Define when to trigger alerts',
          'Alertmanager: Handles alert routing and notifications',
          'Severity Levels: critical, warning, info',
          'Grouping: Combine related alerts',
          'Inhibition: Suppress dependent alerts',
          'Silencing: Temporarily mute alerts',
          'Notification Channels: Email, Slack, PagerDuty, Webhook',
          'Alert States: inactive, pending, firing'
        ],
        codeExample: `# Alert Rules (alerts/alerts.yml)
groups:
  - name: instance_alerts
    interval: 30s
    rules:
      # Instance down alert
      - alert: InstanceDown
        expr: up == 0
        for: 5m
        labels:
          severity: critical
          team: infrastructure
        annotations:
          summary: "Instance {{ $labels.instance }} is down"
          description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 5 minutes."

      # High CPU usage
      - alert: HighCPUUsage
        expr: |
          100 - (avg by (instance) (
            rate(node_cpu_seconds_total{mode="idle"}[5m])
          ) * 100) > 80
        for: 10m
        labels:
          severity: warning
          team: infrastructure
        annotations:
          summary: "High CPU usage on {{ $labels.instance }}"
          description: "CPU usage is above 80% (current: {{ $value }}%)"

      # High memory usage
      - alert: HighMemoryUsage
        expr: |
          (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes)
          / node_memory_MemTotal_bytes * 100 > 90
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High memory usage on {{ $labels.instance }}"
          description: "Memory usage is above 90% (current: {{ $value }}%)"

  - name: application_alerts
    rules:
      # High error rate
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m])) by (job)
          / sum(rate(http_requests_total[5m])) by (job) > 0.05
        for: 5m
        labels:
          severity: critical
          team: backend
        annotations:
          summary: "High error rate for {{ $labels.job }}"
          description: "Error rate is {{ $value | humanizePercentage }}"

      # Slow API response
      - alert: SlowAPIResponse
        expr: |
          histogram_quantile(0.95,
            sum(rate(http_request_duration_seconds_bucket[5m])) by (le, path)
          ) > 2
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Slow API response for {{ $labels.path }}"
          description: "P95 latency is {{ $value }}s"

      # Low request throughput
      - alert: LowRequestThroughput
        expr: |
          sum(rate(http_requests_total[5m])) < 10
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: "Low request throughput"
          description: "Request rate is only {{ $value }} req/s"

# Alertmanager Configuration (alertmanager.yml)
global:
  resolve_timeout: 5m
  slack_api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
  pagerduty_url: 'https://events.pagerduty.com/v2/enqueue'

# Templates for notifications
templates:
  - '/etc/alertmanager/templates/*.tmpl'

# Route tree for alert routing
route:
  receiver: 'default'
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h

  routes:
    # Critical alerts go to PagerDuty
    - match:
        severity: critical
      receiver: pagerduty
      continue: true

    # Infrastructure team alerts
    - match:
        team: infrastructure
      receiver: infrastructure-slack
      group_by: ['alertname', 'instance']

    # Backend team alerts
    - match:
        team: backend
      receiver: backend-slack

# Inhibition rules (suppress dependent alerts)
inhibit_rules:
  # If instance is down, suppress other alerts for that instance
  - source_match:
      alertname: InstanceDown
    target_match_re:
      alertname: .*
    equal: ['instance']

  # If high error rate, suppress slow response alerts
  - source_match:
      alertname: HighErrorRate
    target_match:
      alertname: SlowAPIResponse
    equal: ['job']

# Receivers (notification channels)
receivers:
  - name: 'default'
    email_configs:
      - to: 'team@example.com'
        from: 'alertmanager@example.com'
        smarthost: 'smtp.example.com:587'
        auth_username: 'alertmanager'
        auth_password: 'password'

  - name: 'pagerduty'
    pagerduty_configs:
      - service_key: 'YOUR_PAGERDUTY_KEY'
        description: '{{ range .Alerts }}{{ .Annotations.summary }}\\n{{ end }}'

  - name: 'infrastructure-slack'
    slack_configs:
      - channel: '#infrastructure-alerts'
        title: '{{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.description }}\\n{{ end }}'
        color: '{{ if eq .Status "firing" }}danger{{ else }}good{{ end }}'

  - name: 'backend-slack'
    slack_configs:
      - channel: '#backend-alerts'
        title: '{{ .GroupLabels.alertname }}'

  - name: 'webhook'
    webhook_configs:
      - url: 'http://myservice:8080/alerts'
        send_resolved: true

# Silencing alerts (via amtool CLI)
amtool silence add alertname=HighCPUUsage instance=server1:9100 \\
  --comment="Planned maintenance" \\
  --duration=2h

# View active alerts
amtool alert query

# Silence management
amtool silence query
amtool silence expire <silence-id>`
      }
    },
    {
      id: 4,
      name: 'Service Discovery & Exporters',
      icon: '🎯',
      color: '#10b981',
      description: 'Dynamic target discovery and metric exporters',
      content: {
        explanation: 'Prometheus supports various service discovery mechanisms to automatically discover and scrape targets in dynamic environments. Exporters bridge the gap between Prometheus and third-party systems, exposing metrics in Prometheus format. This enables monitoring of databases, message queues, cloud services, and custom applications.',
        keyPoints: [
          'Kubernetes SD: Auto-discover pods, services, endpoints',
          'Consul SD: Service registry integration',
          'EC2/Azure/GCP SD: Cloud provider integration',
          'File SD: JSON/YAML file-based discovery',
          'Node Exporter: System metrics (CPU, memory, disk)',
          'Blackbox Exporter: Probe external endpoints',
          'Custom Exporters: Application-specific metrics',
          'Pushgateway: Short-lived jobs and batch processes'
        ],
        codeExample: `# Kubernetes Service Discovery
scrape_configs:
  # Discover Kubernetes pods
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: ['default', 'production']

    relabel_configs:
      # Only scrape pods with annotation
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true

      # Custom metrics path
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)

      # Pod name as label
      - source_labels: [__meta_kubernetes_pod_name]
        action: replace
        target_label: kubernetes_pod_name

      # Namespace as label
      - source_labels: [__meta_kubernetes_namespace]
        action: replace
        target_label: kubernetes_namespace

  # Discover Kubernetes services
  - job_name: 'kubernetes-services'
    kubernetes_sd_configs:
      - role: service

    relabel_configs:
      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_port]
        action: replace
        regex: (.+)
        target_label: __address__
        replacement: $1

# Consul Service Discovery
scrape_configs:
  - job_name: 'consul-services'
    consul_sd_configs:
      - server: 'consul:8500'
        services: ['web', 'api', 'database']
    relabel_configs:
      - source_labels: [__meta_consul_tags]
        regex: .*,production,.*
        action: keep

# EC2 Auto Discovery
scrape_configs:
  - job_name: 'ec2-instances'
    ec2_sd_configs:
      - region: us-east-1
        access_key: YOUR_ACCESS_KEY
        secret_key: YOUR_SECRET_KEY
        port: 9100
        filters:
          - name: tag:Environment
            values: [production]

# File-based Service Discovery
scrape_configs:
  - job_name: 'file-sd'
    file_sd_configs:
      - files:
          - '/etc/prometheus/targets/*.json'
          - '/etc/prometheus/targets/*.yml'
        refresh_interval: 5m

# targets/web-servers.json
[
  {
    "targets": ["server1:9100", "server2:9100"],
    "labels": {
      "job": "node",
      "environment": "production",
      "region": "us-east-1"
    }
  },
  {
    "targets": ["app1:8080", "app2:8080"],
    "labels": {
      "job": "application",
      "environment": "production"
    }
  }
]

# Node Exporter (System Metrics)
docker run -d \\
  --name=node-exporter \\
  --net="host" \\
  --pid="host" \\
  -v "/:/host:ro,rslave" \\
  prom/node-exporter:latest \\
  --path.rootfs=/host

# Blackbox Exporter (HTTP/DNS/TCP Probes)
# blackbox.yml
modules:
  http_2xx:
    prober: http
    timeout: 5s
    http:
      valid_http_versions: ["HTTP/1.1", "HTTP/2.0"]
      valid_status_codes: [200]
      method: GET
      follow_redirects: true

  http_post_json:
    prober: http
    http:
      method: POST
      headers:
        Content-Type: application/json
      body: '{"key":"value"}'

# Prometheus config for blackbox
scrape_configs:
  - job_name: 'blackbox'
    metrics_path: /probe
    params:
      module: [http_2xx]
    static_configs:
      - targets:
          - https://example.com
          - https://api.example.com/health
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: blackbox-exporter:9115

# Custom Application Exporter (Go)
package main

import (
    "net/http"
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
    requestsTotal = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total",
            Help: "Total number of HTTP requests",
        },
        []string{"path", "method", "status"},
    )

    requestDuration = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "http_request_duration_seconds",
            Help: "HTTP request latency",
            Buckets: []float64{.005, .01, .025, .05, .1, .25, .5, 1, 2.5, 5, 10},
        },
        []string{"path", "method"},
    )
)

func init() {
    prometheus.MustRegister(requestsTotal)
    prometheus.MustRegister(requestDuration)
}

func main() {
    http.Handle("/metrics", promhttp.Handler())
    http.ListenAndServe(":8080", nil)
}

# Pushgateway (for batch jobs)
echo "batch_job_duration_seconds 45.2" | curl --data-binary @- \\
  http://pushgateway:9091/metrics/job/batch_job/instance/server1

# Spring Boot Actuator (Java)
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: prometheus
  metrics:
    export:
      prometheus:
        enabled: true

# Maven dependency
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>`
      }
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#111827', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Back to DevOps
        </button>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: 'white',
          margin: '1rem 0 0.5rem 0'
        }}>
          📊 Prometheus
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#9ca3af', margin: 0 }}>
          Open-source monitoring and alerting toolkit
        </p>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      {!selectedTopic ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: '#1f2937',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${topic.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 0 0 4px ${topic.color}40, 0 12px 24px rgba(0,0,0,0.4)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>
                {topic.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#9ca3af', lineHeight: '1.6' }}>
                {topic.description}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTopic(null)}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: selectedTopic.color,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            ← Back to Topics
          </button>

          <div style={{
            backgroundColor: '#1f2937',
            padding: '2rem',
            borderRadius: '12px',
            border: `3px solid ${selectedTopic.color}`,
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>{selectedTopic.icon}</div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', margin: 0 }}>
                {selectedTopic.name}
              </h2>
            </div>

            <div style={{ fontSize: '1.05rem', color: '#d1d5db', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {selectedTopic.content.explanation}
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
              Key Points:
            </h3>
            <ul style={{ color: '#d1d5db', lineHeight: '1.8', marginBottom: '2rem' }}>
              {selectedTopic.content.keyPoints.map((point, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{point}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
              Code Example:
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.5rem',
              borderRadius: '8px',
              overflow: 'auto'
            }}>
              <SyntaxHighlighter code={selectedTopic.content.codeExample} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Prometheus

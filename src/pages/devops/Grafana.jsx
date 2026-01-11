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
      .replace(/\b(datasource|dashboard|panel|query|visualization|alert|notification|provisioning|interval|format|transform|legend|threshold|annotation)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(prometheus|graphite|elasticsearch|influxdb|mysql|postgres|cloudwatch|azure|loki|tempo|sum|avg|rate|increase)\b/gi, '<span style="color: #569cd6;">$1</span>')
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

function Grafana({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const topics = [
    {
      id: 1,
      name: 'Grafana Dashboards',
      icon: '📈',
      color: '#f57c00',
      description: 'Creating and customizing dashboards',
      content: {
        explanation: 'Grafana is an open-source analytics and visualization platform that transforms time-series data into insightful dashboards. It supports multiple data sources, provides rich visualization options, and enables real-time monitoring. Dashboards combine panels with graphs, stats, tables, and custom visualizations.',
        keyPoints: [
          'Panels: Individual visualization units (Graph, Stat, Table, Gauge)',
          'Rows: Group related panels together',
          'Variables: Dynamic dashboard parameters',
          'Templating: Create reusable dashboard templates',
          'Time Range: Flexible time selection and refresh',
          'Annotations: Mark events on time series',
          'Sharing: Export, snapshot, embed dashboards',
          'Themes: Light and dark mode support'
        ],
        codeExample: `# Dashboard JSON Structure
{
  "dashboard": {
    "title": "Application Performance",
    "tags": ["app", "production"],
    "timezone": "browser",
    "refresh": "30s",

    "panels": [
      {
        "id": 1,
        "title": "Request Rate",
        "type": "graph",
        "datasource": "Prometheus",
        "gridPos": {"h": 8, "w": 12, "x": 0, "y": 0},

        "targets": [
          {
            "expr": "sum(rate(http_requests_total[5m])) by (job)",
            "legendFormat": "{{job}}",
            "refId": "A"
          }
        ],

        "fieldConfig": {
          "defaults": {
            "unit": "reqps",
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {"value": null, "color": "green"},
                {"value": 80, "color": "yellow"},
                {"value": 100, "color": "red"}
              ]
            }
          }
        },

        "options": {
          "legend": {"displayMode": "table", "placement": "bottom"},
          "tooltip": {"mode": "multi"}
        }
      },

      {
        "id": 2,
        "title": "Error Rate",
        "type": "stat",
        "datasource": "Prometheus",
        "gridPos": {"h": 4, "w": 6, "x": 12, "y": 0},

        "targets": [
          {
            "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) * 100",
            "refId": "A"
          }
        ],

        "fieldConfig": {
          "defaults": {
            "unit": "percent",
            "decimals": 2,
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {"value": null, "color": "green"},
                {"value": 1, "color": "yellow"},
                {"value": 5, "color": "red"}
              ]
            }
          }
        }
      }
    ],

    "templating": {
      "list": [
        {
          "name": "datasource",
          "type": "datasource",
          "query": "prometheus"
        },
        {
          "name": "job",
          "type": "query",
          "datasource": "Prometheus",
          "query": "label_values(up, job)",
          "multi": true,
          "includeAll": true
        },
        {
          "name": "instance",
          "type": "query",
          "datasource": "Prometheus",
          "query": "label_values(up{job=\"$job\"}, instance)"
        }
      ]
    },

    "annotations": {
      "list": [
        {
          "name": "Deployments",
          "datasource": "Prometheus",
          "expr": "ALERTS{alertname=\"DeploymentEvent\"}",
          "iconColor": "blue",
          "enable": true
        }
      ]
    },

    "time": {
      "from": "now-6h",
      "to": "now"
    },

    "timepicker": {
      "refresh_intervals": ["5s", "10s", "30s", "1m", "5m", "15m", "30m", "1h"]
    }
  }
}

# Provisioning Dashboard (YAML)
# provisioning/dashboards/dashboard.yml
apiVersion: 1

providers:
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    options:
      path: /etc/grafana/dashboards

# Docker Compose with Grafana
version: '3'
services:
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-piechart-panel
    volumes:
      - grafana-data:/var/lib/grafana
      - ./provisioning:/etc/grafana/provisioning
      - ./dashboards:/etc/grafana/dashboards
    networks:
      - monitoring

  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    networks:
      - monitoring

volumes:
  grafana-data:

networks:
  monitoring:`
      }
    },
    {
      id: 2,
      name: 'Data Sources & Queries',
      icon: '🔗',
      color: '#1976d2',
      description: 'Connecting and querying data sources',
      content: {
        explanation: 'Grafana supports numerous data sources including Prometheus, InfluxDB, Elasticsearch, MySQL, PostgreSQL, and cloud providers. Each data source has a specific query editor optimized for its query language. Grafana transforms raw queries into beautiful visualizations.',
        keyPoints: [
          'Prometheus: PromQL queries for time-series metrics',
          'InfluxDB: Flux or InfluxQL for measurements',
          'Elasticsearch: Lucene queries for logs',
          'MySQL/PostgreSQL: SQL queries for relational data',
          'Cloud Monitoring: AWS CloudWatch, Azure Monitor, GCP',
          'Loki: LogQL for log aggregation',
          'Mixed Data Source: Combine multiple sources in one panel',
          'Query Variables: Dynamic queries with template variables'
        ],
        codeExample: `# Prometheus Data Source Configuration
# provisioning/datasources/prometheus.yml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    jsonData:
      httpMethod: POST
      timeInterval: 30s
    editable: false

  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    jsonData:
      maxLines: 1000

  - name: MySQL
    type: mysql
    url: mysql:3306
    database: myapp
    user: grafana
    secureJsonData:
      password: secret

# Prometheus Queries in Dashboard
# CPU Usage
100 - (avg by (instance) (
  rate(node_cpu_seconds_total{mode="idle"}[5m])
) * 100)

# Memory Usage
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes)
/ node_memory_MemTotal_bytes * 100

# Request Rate
rate(http_requests_total[5m])

# Error Rate Percentage
sum(rate(http_requests_total{status=~"5.."}[5m]))
/ sum(rate(http_requests_total[5m])) * 100

# P95 Latency
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
)

# Loki Queries (LogQL)
# Filter logs by label
{job="webapp", level="error"}

# Count errors per minute
sum(count_over_time({job="webapp", level="error"}[1m]))

# Extract and count specific pattern
sum(count_over_time({job="webapp"} |= "timeout" [5m])) by (host)

# MySQL Query Example
SELECT
  UNIX_TIMESTAMP(timestamp) as time_sec,
  metric_value,
  metric_name
FROM metrics
WHERE
  timestamp BETWEEN FROM_UNIXTIME($__from) AND FROM_UNIXTIME($__to)
  AND metric_name = 'cpu_usage'
ORDER BY timestamp

# Elasticsearch Query
{
  "query": {
    "bool": {
      "filter": [
        {"range": {"@timestamp": {"gte": "$__from", "lte": "$__to"}}},
        {"term": {"level": "error"}}
      ]
    }
  },
  "aggs": {
    "errors_over_time": {
      "date_histogram": {
        "field": "@timestamp",
        "interval": "$__interval"
      }
    }
  }
}

# InfluxDB Query (Flux)
from(bucket: "metrics")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "cpu")
  |> filter(fn: (r) => r["_field"] == "usage_idle")
  |> aggregateWindow(every: v.windowPeriod, fn: mean)

# CloudWatch Query
{
  "namespace": "AWS/EC2",
  "metricName": "CPUUtilization",
  "dimensions": {
    "InstanceId": ["$instance"]
  },
  "statistic": "Average",
  "period": "300"
}

# Mixed Data Source Example
# Panel with multiple data sources
{
  "targets": [
    {
      "datasource": "Prometheus",
      "expr": "rate(requests[5m])",
      "refId": "A"
    },
    {
      "datasource": "MySQL",
      "rawSql": "SELECT * FROM orders WHERE created_at > NOW() - INTERVAL 5 MINUTE",
      "refId": "B"
    }
  ]
}

# Transform Query Results
# Using Grafana transformations
{
  "transformations": [
    {
      "id": "organize",
      "options": {
        "excludeByName": {"Time": false},
        "renameByName": {"Value": "Request Rate"}
      }
    },
    {
      "id": "calculateField",
      "options": {
        "mode": "binary",
        "reduce": {"reducer": "sum"}
      }
    }
  ]
}`
      }
    },
    {
      id: 3,
      name: 'Alerting',
      icon: '🔔',
      color: '#d32f2f',
      description: 'Alert rules and notification channels',
      content: {
        explanation: 'Grafana Alerting (Grafana 8+) provides unified alerting across all data sources. It evaluates alert rules at regular intervals, manages alert states, and routes notifications to various channels. Supports multi-dimensional alerts, silences, and notification policies for comprehensive alerting workflows.',
        keyPoints: [
          'Alert Rules: Define conditions using queries',
          'Contact Points: Notification destinations (email, Slack, PagerDuty)',
          'Notification Policies: Route alerts based on labels',
          'Silences: Temporarily mute alerts',
          'Alert States: Normal, Pending, Alerting, NoData, Error',
          'Alert Groups: Group related alerts',
          'Provisioning: Configure alerts as code',
          'Alert History: Track alert state changes'
        ],
        codeExample: `# Alert Rule Configuration (YAML Provisioning)
# provisioning/alerting/alert_rules.yml
apiVersion: 1

groups:
  - name: application_alerts
    folder: Application
    interval: 1m
    rules:
      - uid: high_error_rate
        title: High Error Rate
        condition: A
        data:
          - refId: A
            queryType: ''
            relativeTimeRange:
              from: 300
              to: 0
            datasourceUid: prometheus
            model:
              expr: |
                sum(rate(http_requests_total{status=~"5.."}[5m]))
                / sum(rate(http_requests_total[5m])) * 100 > 5
              refId: A
        noDataState: NoData
        execErrState: Error
        for: 5m
        annotations:
          description: "Error rate is {{ $values.A }}%"
          summary: "High error rate detected"
        labels:
          severity: critical
          team: backend

      - uid: high_cpu
        title: High CPU Usage
        condition: A
        data:
          - refId: A
            datasourceUid: prometheus
            model:
              expr: |
                100 - (avg by (instance) (
                  rate(node_cpu_seconds_total{mode="idle"}[5m])
                ) * 100) > 80
        for: 10m
        annotations:
          description: "CPU usage on {{ $labels.instance }} is {{ $values.A }}%"
        labels:
          severity: warning

# Contact Points Configuration
# provisioning/alerting/contact_points.yml
apiVersion: 1

contactPoints:
  - name: email-alerts
    receivers:
      - uid: email-1
        type: email
        settings:
          addresses: team@example.com
        disableResolveMessage: false

  - name: slack-critical
    receivers:
      - uid: slack-1
        type: slack
        settings:
          url: https://hooks.slack.com/services/YOUR/WEBHOOK
          recipient: '#alerts-critical'
          title: 'Grafana Alert'
          text: |
            {{ range .Alerts }}
            **Alert:** {{ .Labels.alertname }}
            **Status:** {{ .Status }}
            **Description:** {{ .Annotations.description }}
            {{ end }}

  - name: pagerduty
    receivers:
      - uid: pd-1
        type: pagerduty
        settings:
          integrationKey: YOUR_PAGERDUTY_KEY
          severity: critical

  - name: webhook
    receivers:
      - uid: webhook-1
        type: webhook
        settings:
          url: http://myservice:8080/alerts
          httpMethod: POST

# Notification Policies
# provisioning/alerting/notification_policies.yml
apiVersion: 1

policies:
  - receiver: email-alerts
    group_by: ['alertname', 'cluster']
    group_wait: 30s
    group_interval: 5m
    repeat_interval: 12h

    routes:
      # Critical alerts to PagerDuty
      - receiver: pagerduty
        matchers:
          - severity = critical
        continue: true

      # Backend team alerts to Slack
      - receiver: slack-critical
        matchers:
          - team = backend
        group_by: ['alertname']

      # All other alerts to email
      - receiver: email-alerts

# Silence Configuration
# Create silence via API
curl -X POST http://localhost:3000/api/alertmanager/grafana/api/v2/silences \\
  -H "Content-Type: application/json" \\
  -u admin:admin \\
  -d '{
    "matchers": [
      {"name": "alertname", "value": "HighCPU", "isRegex": false},
      {"name": "instance", "value": "server1", "isRegex": false}
    ],
    "startsAt": "2024-01-01T00:00:00Z",
    "endsAt": "2024-01-01T02:00:00Z",
    "createdBy": "admin",
    "comment": "Planned maintenance"
  }'

# Alert Rule via API
curl -X POST http://localhost:3000/api/ruler/grafana/api/v1/rules/application \\
  -H "Content-Type: application/json" \\
  -u admin:admin \\
  -d '{
    "name": "high_memory",
    "interval": "1m",
    "rules": [
      {
        "grafana_alert": {
          "title": "High Memory Usage",
          "condition": "A",
          "data": [{
            "refId": "A",
            "queryType": "",
            "relativeTimeRange": {"from": 300, "to": 0},
            "datasourceUid": "prometheus",
            "model": {
              "expr": "(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 90",
              "refId": "A"
            }
          }],
          "noDataState": "NoData",
          "execErrState": "Error"
        },
        "for": "5m",
        "annotations": {
          "description": "Memory usage is high on {{ $labels.instance }}"
        },
        "labels": {
          "severity": "warning"
        }
      }
    ]
  }'

# Test Contact Point
curl -X POST http://localhost:3000/api/alertmanager/grafana/config/api/v1/receivers/test \\
  -H "Content-Type: application/json" \\
  -u admin:admin \\
  -d '{
    "receivers": [{
      "name": "test",
      "grafana_managed_receiver_configs": [{
        "type": "slack",
        "settings": {
          "url": "https://hooks.slack.com/services/YOUR/WEBHOOK"
        }
      }]
    }],
    "alert": {
      "annotations": {"description": "Test alert"},
      "labels": {"alertname": "TestAlert"}
    }
  }'`
      }
    },
    {
      id: 4,
      name: 'Provisioning & Automation',
      icon: '⚙️',
      color: '#388e3c',
      description: 'Infrastructure as Code for Grafana',
      content: {
        explanation: 'Grafana provisioning enables configuration as code, allowing dashboards, data sources, alerts, and plugins to be version controlled and automatically deployed. This approach ensures consistency across environments, simplifies disaster recovery, and enables GitOps workflows.',
        keyPoints: [
          'Dashboard Provisioning: Auto-load dashboards from files',
          'Data Source Provisioning: Configure sources via YAML',
          'Alert Provisioning: Define alerts as code',
          'Plugin Provisioning: Auto-install required plugins',
          'API: Programmatic configuration management',
          'Terraform Provider: Infrastructure as Code',
          'Environment Variables: Dynamic configuration',
          'Version Control: Track configuration changes'
        ],
        codeExample: `# Complete Provisioning Structure
/etc/grafana/
├── grafana.ini
└── provisioning/
    ├── dashboards/
    │   ├── dashboard.yml
    │   └── dashboards/
    │       ├── app-metrics.json
    │       └── system-metrics.json
    ├── datasources/
    │   ├── prometheus.yml
    │   └── loki.yml
    ├── plugins/
    │   └── plugins.yml
    ├── alerting/
    │   ├── alert_rules.yml
    │   ├── contact_points.yml
    │   └── notification_policies.yml
    └── notifiers/
        └── notifiers.yml

# Dashboard Provisioning
# provisioning/dashboards/dashboard.yml
apiVersion: 1

providers:
  - name: 'production-dashboards'
    orgId: 1
    folder: 'Production'
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    allowUiUpdates: true
    options:
      path: /etc/grafana/provisioning/dashboards

# Data Source Provisioning
# provisioning/datasources/datasources.yml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    jsonData:
      httpMethod: POST
      timeInterval: 30s
      queryTimeout: 60s
    version: 1
    editable: false

  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    jsonData:
      maxLines: 1000

  - name: Tempo
    type: tempo
    access: proxy
    url: http://tempo:3200

  - name: PostgreSQL
    type: postgres
    url: postgres:5432
    database: grafana
    user: grafana
    secureJsonData:
      password: \${POSTGRES_PASSWORD}
    jsonData:
      sslmode: disable
      maxOpenConns: 10
      maxIdleConns: 5

# Plugin Provisioning
# provisioning/plugins/plugins.yml
apiVersion: 1

apps:
  - type: grafana-clock-panel
  - type: grafana-piechart-panel
  - type: grafana-worldmap-panel

# grafana.ini Configuration
[server]
protocol = http
http_port = 3000
domain = grafana.example.com
root_url = %(protocol)s://%(domain)s/

[database]
type = postgres
host = postgres:5432
name = grafana
user = grafana
password = \${POSTGRES_PASSWORD}

[security]
admin_user = \${ADMIN_USER}
admin_password = \${ADMIN_PASSWORD}
secret_key = \${SECRET_KEY}

[auth]
disable_login_form = false

[auth.anonymous]
enabled = false

[auth.generic_oauth]
enabled = true
name = OAuth
client_id = \${OAUTH_CLIENT_ID}
client_secret = \${OAUTH_CLIENT_SECRET}
auth_url = https://oauth.example.com/authorize
token_url = https://oauth.example.com/token

[smtp]
enabled = true
host = smtp.example.com:587
user = grafana@example.com
password = \${SMTP_PASSWORD}
from_address = grafana@example.com

# Dockerfile with Provisioning
FROM grafana/grafana:latest

# Copy provisioning files
COPY provisioning/ /etc/grafana/provisioning/

# Install plugins
RUN grafana-cli plugins install grafana-clock-panel && \\
    grafana-cli plugins install grafana-piechart-panel

# Environment variables
ENV GF_SECURITY_ADMIN_USER=admin
ENV GF_SECURITY_ADMIN_PASSWORD=\${ADMIN_PASSWORD}
ENV GF_INSTALL_PLUGINS=grafana-clock-panel

# Terraform Grafana Provider
terraform {
  required_providers {
    grafana = {
      source = "grafana/grafana"
      version = "~> 1.40"
    }
  }
}

provider "grafana" {
  url  = "http://localhost:3000"
  auth = "admin:admin"
}

# Create Data Source
resource "grafana_data_source" "prometheus" {
  type = "prometheus"
  name = "Prometheus"
  url  = "http://prometheus:9090"

  json_data_encoded = jsonencode({
    httpMethod = "POST"
    timeInterval = "30s"
  })
}

# Create Dashboard
resource "grafana_dashboard" "metrics" {
  config_json = file("dashboards/metrics.json")
  folder      = grafana_folder.monitoring.id
}

# Create Alert Rule
resource "grafana_rule_group" "alerts" {
  name             = "application_alerts"
  folder_uid       = grafana_folder.monitoring.uid
  interval_seconds = 60

  rule {
    name = "high_error_rate"
    condition = "A"

    data {
      ref_id = "A"
      query_type = ""
      relative_time_range {
        from = 600
        to   = 0
      }
      datasource_uid = grafana_data_source.prometheus.uid
      model = jsonencode({
        expr = "rate(http_errors[5m]) > 0.05"
      })
    }

    for         = "5m"
    annotations = {
      description = "Error rate is high"
    }
    labels = {
      severity = "critical"
    }
  }
}

# API Usage Examples
# Create Dashboard via API
curl -X POST http://localhost:3000/api/dashboards/db \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer \${API_KEY}" \\
  -d @dashboard.json

# Get All Dashboards
curl http://localhost:3000/api/search \\
  -H "Authorization: Bearer \${API_KEY}"

# Create Data Source
curl -X POST http://localhost:3000/api/datasources \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer \${API_KEY}" \\
  -d '{
    "name": "Prometheus",
    "type": "prometheus",
    "url": "http://prometheus:9090",
    "access": "proxy",
    "isDefault": true
  }'

# Create API Key
curl -X POST http://localhost:3000/api/auth/keys \\
  -H "Content-Type: application/json" \\
  -u admin:admin \\
  -d '{
    "name": "automation-key",
    "role": "Admin"
  }'`
      }
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f5f3ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
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
          ← Back to DevOps
        </button>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: '1rem 0 0.5rem 0'
        }}>
          📈 Grafana
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', margin: 0 }}>
          Open-source analytics and monitoring platform
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
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${topic.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 0 0 4px ${topic.color}40, 0 12px 24px rgba(0,0,0,0.2)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                {topic.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>
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
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: `3px solid ${selectedTopic.color}`,
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>{selectedTopic.icon}</div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937', margin: 0 }}>
                {selectedTopic.name}
              </h2>
            </div>

            <div style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {selectedTopic.content.explanation}
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              Key Points:
            </h3>
            <ul style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
              {selectedTopic.content.keyPoints.map((point, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{point}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
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

export default Grafana

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function GrafanaQuestions({ onBack, breadcrumb, problemLimit }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'json'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'json'
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
      question: 'What is Grafana and explain its architecture and core components',
      answer: `**Grafana:**
Open-source analytics and interactive visualization web application that provides charts, graphs, and alerts for monitoring

**Key Features:**
- Multi-datasource support (Prometheus, InfluxDB, Elasticsearch, MySQL, etc.)
- Rich visualization options (graphs, heatmaps, tables, gauges)
- Advanced dashboarding capabilities with templating
- Alerting and notification system
- User authentication and authorization
- Plugin architecture for extensibility
- Panel and dashboard sharing

**Architecture Components:**

**1. Grafana Server:**
\`\`\`yaml
# Core backend service
- HTTP API server
- Database for storing dashboards/users/alerts
- Query engine for datasources
- Alerting engine
- Plugin management
\`\`\`

**2. Data Sources:**
\`\`\`yaml
# Supported backends:
Time-series databases:
  - Prometheus
  - InfluxDB
  - Graphite
  - TimescaleDB

Logging systems:
  - Loki
  - Elasticsearch
  - Splunk

SQL databases:
  - MySQL
  - PostgreSQL
  - Microsoft SQL Server

Cloud platforms:
  - AWS CloudWatch
  - Azure Monitor
  - Google Cloud Monitoring
\`\`\`

**3. Dashboard Structure:**
\`\`\`json
{
  "dashboard": {
    "title": "Application Metrics",
    "panels": [
      {
        "id": 1,
        "type": "graph",
        "title": "Request Rate",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} - {{endpoint}}"
          }
        ]
      }
    ],
    "templating": {
      "list": [
        {
          "name": "environment",
          "type": "query",
          "datasource": "Prometheus",
          "query": "label_values(up, environment)"
        }
      ]
    }
  }
}
\`\`\`

**4. Configuration:**
\`\`\`ini
# grafana.ini
[server]
http_port = 3000
domain = grafana.example.com
root_url = https://grafana.example.com

[database]
type = postgres
host = localhost:5432
name = grafana
user = grafana
password = secret

[auth]
disable_login_form = false
oauth_auto_login = false

[security]
admin_user = admin
admin_password = admin

[smtp]
enabled = true
host = smtp.gmail.com:587
user = alerts@example.com
password = secret
from_address = alerts@example.com
from_name = Grafana
\`\`\`

**Panel Types:**

**1. Time Series (Graph):**
\`\`\`
- Line charts
- Bar charts
- Area charts
- Stacked series
- Multiple Y-axes
\`\`\`

**2. Stat:**
\`\`\`
- Single value display
- Sparklines
- Gauge visualization
- Thresholds and coloring
\`\`\`

**3. Gauge:**
\`\`\`
- Circular gauge
- Progress bars
- Threshold markers
\`\`\`

**4. Bar Chart:**
\`\`\`
- Horizontal/vertical bars
- Grouped/stacked bars
- Time-based or value-based
\`\`\`

**5. Heatmap:**
\`\`\`
- Distribution visualization
- Time-series bucketing
- Color gradients
\`\`\`

**6. Table:**
\`\`\`
- Tabular data display
- Column formatting
- Sorting and filtering
\`\`\`

**7. Logs:**
\`\`\`
- Log stream visualization
- Log level highlighting
- Log context
\`\`\`

**User Management:**
\`\`\`yaml
# Organization-based multi-tenancy
Organizations:
  - Each org has own dashboards
  - Users can belong to multiple orgs
  - Separate permissions per org

Roles:
  - Admin: Full control
  - Editor: Create/edit dashboards
  - Viewer: Read-only access

Teams:
  - Group users within org
  - Assign permissions to teams
  - Manage dashboard access
\`\`\``
    },
    {
      id: 2,
      category: 'Dashboards',
      difficulty: 'Medium',
      question: 'Explain Grafana dashboard creation, panels, and templating variables',
      answer: `**Dashboard Creation:**

**1. Basic Dashboard Structure:**
\`\`\`json
{
  "dashboard": {
    "id": null,
    "uid": "app-metrics",
    "title": "Application Performance",
    "tags": ["application", "performance"],
    "timezone": "browser",
    "refresh": "30s",
    "time": {
      "from": "now-6h",
      "to": "now"
    },
    "panels": []
  }
}
\`\`\`

**2. Panel Configuration:**
\`\`\`json
{
  "id": 1,
  "gridPos": {
    "h": 8,
    "w": 12,
    "x": 0,
    "y": 0
  },
  "type": "timeseries",
  "title": "HTTP Request Rate",
  "datasource": {
    "type": "prometheus",
    "uid": "prometheus-1"
  },
  "targets": [
    {
      "expr": "rate(http_requests_total{job=\\"$job\\", instance=\\"$instance\\"}[5m])",
      "legendFormat": "{{method}} {{endpoint}}",
      "refId": "A"
    }
  ],
  "fieldConfig": {
    "defaults": {
      "color": {
        "mode": "palette-classic"
      },
      "unit": "reqps",
      "thresholds": {
        "mode": "absolute",
        "steps": [
          { "value": 0, "color": "green" },
          { "value": 100, "color": "yellow" },
          { "value": 200, "color": "red" }
        ]
      }
    }
  }
}
\`\`\`

**Templating Variables:**

**1. Query Variable:**
\`\`\`json
{
  "name": "environment",
  "type": "query",
  "label": "Environment",
  "datasource": "Prometheus",
  "query": "label_values(up, environment)",
  "refresh": 1,
  "multi": false,
  "includeAll": false,
  "current": {
    "text": "production",
    "value": "production"
  }
}
\`\`\`

**2. Custom Variable:**
\`\`\`json
{
  "name": "region",
  "type": "custom",
  "label": "Region",
  "query": "us-east-1,us-west-2,eu-west-1",
  "multi": true,
  "includeAll": true,
  "allValue": ".*"
}
\`\`\`

**3. Interval Variable:**
\`\`\`json
{
  "name": "interval",
  "type": "interval",
  "auto": true,
  "auto_count": 30,
  "auto_min": "10s",
  "options": [
    { "text": "1m", "value": "1m" },
    { "text": "5m", "value": "5m" },
    { "text": "15m", "value": "15m" },
    { "text": "1h", "value": "1h" }
  ]
}
\`\`\`

**4. Datasource Variable:**
\`\`\`json
{
  "name": "datasource",
  "type": "datasource",
  "label": "Data Source",
  "query": "prometheus",
  "multi": false,
  "includeAll": false
}
\`\`\`

**5. Ad-hoc Filter Variable:**
\`\`\`json
{
  "name": "filters",
  "type": "adhoc",
  "datasource": "Prometheus"
}
\`\`\`

**Using Variables in Queries:**

**Prometheus Query:**
\`\`\`promql
# Single variable
rate(http_requests_total{environment="$environment"}[5m])

# Multiple selection
rate(http_requests_total{instance=~"$instance"}[5m])

# All selection with regex
rate(http_requests_total{region=~"$region"}[5m])

# Interval variable
rate(http_requests_total[$interval])

# Chained variables
rate(http_requests_total{
  environment="$environment",
  region="$region",
  instance=~"$instance"
}[$interval])
\`\`\`

**Advanced Panel Features:**

**1. Transformations:**
\`\`\`json
{
  "transformations": [
    {
      "id": "organize",
      "options": {
        "excludeByName": {
          "job": true
        },
        "indexByName": {},
        "renameByName": {
          "instance": "Server"
        }
      }
    },
    {
      "id": "merge",
      "options": {}
    },
    {
      "id": "calculateField",
      "options": {
        "mode": "reduceRow",
        "reduce": {
          "reducer": "sum"
        },
        "replaceFields": false
      }
    }
  ]
}
\`\`\`

**2. Overrides:**
\`\`\`json
{
  "overrides": [
    {
      "matcher": {
        "id": "byName",
        "options": "Errors"
      },
      "properties": [
        {
          "id": "color",
          "value": {
            "mode": "fixed",
            "fixedColor": "red"
          }
        },
        {
          "id": "custom.fillOpacity",
          "value": 10
        }
      ]
    }
  ]
}
\`\`\`

**3. Links:**
\`\`\`json
{
  "links": [
    {
      "title": "View Logs",
      "url": "/d/logs?var-instance=$instance&from=$__from&to=$__to",
      "type": "dashboard"
    },
    {
      "title": "External Metrics",
      "url": "https://metrics.example.com/instance/$instance",
      "type": "link",
      "targetBlank": true
    }
  ]
}
\`\`\`

**4. Repeat Panels:**
\`\`\`json
{
  "repeat": "instance",
  "repeatDirection": "h",
  "maxPerRow": 3
}
\`\`\`

**Dashboard JSON Model Export:**
\`\`\`bash
# Export dashboard
curl -H "Authorization: Bearer $API_KEY" \
  http://grafana.example.com/api/dashboards/uid/app-metrics

# Import dashboard
curl -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d @dashboard.json \
  http://grafana.example.com/api/dashboards/db
\`\`\`

**Row Configuration:**
\`\`\`json
{
  "type": "row",
  "collapsed": false,
  "title": "Database Metrics",
  "panels": []
}
\`\`\``
    },
    {
      id: 3,
      category: 'PromQL Integration',
      difficulty: 'Hard',
      question: 'How do you use PromQL in Grafana for advanced visualizations?',
      answer: `**PromQL in Grafana:**

**1. Basic Query Configuration:**
\`\`\`json
{
  "targets": [
    {
      "expr": "rate(http_requests_total[5m])",
      "legendFormat": "{{method}} - {{endpoint}}",
      "instant": false,
      "range": true,
      "refId": "A"
    }
  ]
}
\`\`\`

**2. Multiple Queries with Math:**
\`\`\`promql
# Query A: Total requests
rate(http_requests_total[5m])

# Query B: Error requests
rate(http_requests_total{status=~"5.."}[5m])

# Query C (Expression): Error percentage
($B / $A) * 100
\`\`\`

**3. Template Variable Queries:**
\`\`\`promql
# Get all environments
label_values(up, environment)

# Get instances for selected environment
label_values(up{environment="$environment"}, instance)

# Get endpoints with traffic
label_values(http_requests_total{instance="$instance"}, endpoint)

# Get metric names
label_values(__name__)

# Custom filter
query_result(
  count by (service) (
    rate(http_requests_total{environment="$environment"}[5m])
  )
)
\`\`\`

**4. Advanced Aggregations:**

**Request Rate by Service:**
\`\`\`promql
sum by (service) (
  rate(http_requests_total{
    environment="$environment",
    region=~"$region"
  }[$interval])
)
\`\`\`

**P95 Latency:**
\`\`\`promql
histogram_quantile(0.95,
  sum by (le, service) (
    rate(http_request_duration_seconds_bucket{
      environment="$environment"
    }[$interval])
  )
)
\`\`\`

**Error Rate with Threshold:**
\`\`\`promql
(
  sum by (service) (
    rate(http_requests_total{status=~"5.."}[$interval])
  )
  /
  sum by (service) (
    rate(http_requests_total[$interval])
  )
) > 0.01
\`\`\`

**5. Time Shift Comparisons:**
\`\`\`promql
# Current week
rate(http_requests_total[5m])

# Previous week comparison
rate(http_requests_total[5m] offset 1w)

# Week-over-week change
(
  rate(http_requests_total[5m])
  -
  rate(http_requests_total[5m] offset 1w)
) / rate(http_requests_total[5m] offset 1w) * 100
\`\`\`

**6. Subqueries:**
\`\`\`promql
# Maximum 5-minute rate over 1 hour
max_over_time(
  rate(http_requests_total[5m])[1h:]
)

# Average of P99 latency over time
avg_over_time(
  histogram_quantile(0.99,
    rate(http_request_duration_seconds_bucket[5m])
  )[1h:5m]
)
\`\`\`

**7. Legend Format Templates:**
\`\`\`
# Basic labels
{{method}} {{endpoint}}

# With instance name
{{instance}} - {{method}}

# Custom formatting
{{service}} [{{environment}}] - {{__name__}}

# Calculated legend
Error Rate: {{method}}
\`\`\`

**8. Table Transformations:**
\`\`\`promql
# Instant query for table
topk(10,
  sum by (endpoint, method) (
    rate(http_requests_total[$interval])
  )
)

# With multiple metrics
sum by (service) (rate(http_requests_total[$interval]))
and
sum by (service) (rate(http_request_duration_seconds_sum[$interval]))
  /
sum by (service) (rate(http_request_duration_seconds_count[$interval]))
\`\`\`

**9. Alert Query Examples:**
\`\`\`promql
# High error rate
sum by (service) (
  rate(http_requests_total{status=~"5.."}[5m])
) / sum by (service) (
  rate(http_requests_total[5m])
) > 0.05

# High latency
histogram_quantile(0.95,
  sum by (le) (
    rate(http_request_duration_seconds_bucket[5m])
  )
) > 0.5

# Service down
up{job="my-service"} == 0

# Memory usage critical
(
  node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes
) / node_memory_MemTotal_bytes > 0.9
\`\`\`

**10. Stat Panel with Calculations:**
\`\`\`json
{
  "targets": [
    {
      "expr": "sum(rate(http_requests_total[$interval]))",
      "legendFormat": "RPS",
      "instant": true
    }
  ],
  "options": {
    "reduceOptions": {
      "values": false,
      "fields": "",
      "calcs": ["lastNotNull"]
    },
    "text": {
      "titleSize": 20,
      "valueSize": 40
    }
  }
}
\`\`\`

**11. Advanced Regex Filtering:**
\`\`\`promql
# Exclude specific endpoints
rate(http_requests_total{endpoint!~"/health|/metrics"}[5m])

# Multiple label filters
rate(http_requests_total{
  environment="production",
  region=~"us-.*",
  instance!~".*-canary-.*"
}[5m])
\`\`\`

**12. Recording Rule Usage:**
\`\`\`promql
# Use pre-computed recording rule
job:http_requests:rate5m{environment="$environment"}

# Instead of computing every time
rate(http_requests_total{environment="$environment"}[5m])
\`\`\`

**13. Binary Operators:**
\`\`\`promql
# Memory usage percentage
100 * (
  1 - (
    node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes
  )
)

# Requests per instance ratio
(
  sum by (instance) (rate(http_requests_total[5m]))
  /
  sum(rate(http_requests_total[5m]))
) * 100
\`\`\`

**14. Vector Matching:**
\`\`\`promql
# Join with metadata
rate(http_requests_total[5m])
* on (instance) group_left (version, environment)
  app_version_info
\`\`\``
    },
    {
      id: 4,
      category: 'Alerting',
      difficulty: 'Medium',
      question: 'How do you configure alerting and notifications in Grafana?',
      answer: `**Grafana Alerting:**

**1. Alert Rule Configuration:**
\`\`\`json
{
  "alert": {
    "name": "High Error Rate",
    "message": "Error rate is above 5% on {{$labels.service}}",
    "for": "5m",
    "conditions": [
      {
        "evaluator": {
          "params": [0.05],
          "type": "gt"
        },
        "operator": {
          "type": "and"
        },
        "query": {
          "params": ["A", "5m", "now"]
        },
        "reducer": {
          "params": [],
          "type": "last"
        },
        "type": "query"
      }
    ],
    "noDataState": "no_data",
    "executionErrorState": "alerting"
  }
}
\`\`\`

**2. Notification Channels:**

**Slack Configuration:**
\`\`\`json
{
  "name": "Slack Alerts",
  "type": "slack",
  "settings": {
    "url": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL",
    "recipient": "#alerts",
    "username": "Grafana",
    "icon_emoji": ":warning:",
    "mentionChannel": "here",
    "token": ""
  },
  "sendReminder": true,
  "frequency": "15m"
}
\`\`\`

**Email Configuration:**
\`\`\`json
{
  "name": "Email Alerts",
  "type": "email",
  "settings": {
    "addresses": "team@example.com;oncall@example.com",
    "singleEmail": false
  },
  "sendReminder": true,
  "frequency": "30m"
}
\`\`\`

**PagerDuty Configuration:**
\`\`\`json
{
  "name": "PagerDuty Critical",
  "type": "pagerduty",
  "settings": {
    "integrationKey": "YOUR_INTEGRATION_KEY",
    "severity": "critical",
    "autoResolve": true,
    "messageInDetails": false
  }
}
\`\`\`

**Webhook Configuration:**
\`\`\`json
{
  "name": "Custom Webhook",
  "type": "webhook",
  "settings": {
    "url": "https://api.example.com/alerts",
    "httpMethod": "POST",
    "username": "",
    "password": "",
    "authorization": "Bearer token"
  }
}
\`\`\`

**3. Alert Rule Examples:**

**Database Connection Pool:**
\`\`\`json
{
  "alert": {
    "name": "Database Connection Pool Exhausted",
    "message": "Connection pool usage above 90% on {{$labels.instance}}",
    "for": "5m",
    "frequency": "1m",
    "handler": 1,
    "conditions": [
      {
        "evaluator": {
          "params": [0.9],
          "type": "gt"
        },
        "query": {
          "params": ["A", "5m", "now"]
        },
        "reducer": {
          "params": [],
          "type": "avg"
        }
      }
    ]
  },
  "targets": [
    {
      "expr": "hikaricp_connections_active / hikaricp_connections_max"
    }
  ]
}
\`\`\`

**Memory Alert:**
\`\`\`json
{
  "alert": {
    "name": "High Memory Usage",
    "message": "Memory usage above 85% on {{$labels.instance}}",
    "for": "10m",
    "conditions": [
      {
        "evaluator": {
          "params": [85],
          "type": "gt"
        },
        "query": {
          "params": ["A", "5m", "now"]
        },
        "reducer": {
          "params": [],
          "type": "avg"
        }
      }
    ]
  },
  "targets": [
    {
      "expr": "(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100"
    }
  ]
}
\`\`\`

**Response Time Alert:**
\`\`\`json
{
  "alert": {
    "name": "High Response Time",
    "message": "P95 response time above 500ms",
    "for": "5m",
    "conditions": [
      {
        "evaluator": {
          "params": [0.5],
          "type": "gt"
        },
        "query": {
          "params": ["A", "5m", "now"]
        },
        "reducer": {
          "params": [],
          "type": "last"
        }
      }
    ]
  },
  "targets": [
    {
      "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
    }
  ]
}
\`\`\`

**4. Unified Alerting (Grafana 8+):**

**Alert Rule:**
\`\`\`yaml
apiVersion: 1
groups:
  - name: application_alerts
    interval: 1m
    rules:
      - uid: error_rate_alert
        title: High Error Rate
        condition: A
        data:
          - refId: A
            datasourceUid: prometheus
            model:
              expr: |
                sum by (service) (
                  rate(http_requests_total{status=~"5.."}[5m])
                ) / sum by (service) (
                  rate(http_requests_total[5m])
                ) > 0.05
              intervalMs: 1000
              maxDataPoints: 43200
        noDataState: NoData
        execErrState: Alerting
        for: 5m
        annotations:
          summary: High error rate detected
          description: 'Service {{ $labels.service }} has error rate of {{ $value | humanizePercentage }}'
        labels:
          severity: warning
          team: backend
\`\`\`

**5. Contact Point:**
\`\`\`yaml
apiVersion: 1
contactPoints:
  - name: team-slack
    receivers:
      - uid: slack-1
        type: slack
        settings:
          url: https://hooks.slack.com/services/XXX
          recipient: '#alerts'
          text: |
            {{ range .Alerts }}
            *Alert:* {{ .Labels.alertname }}
            *Severity:* {{ .Labels.severity }}
            *Summary:* {{ .Annotations.summary }}
            *Description:* {{ .Annotations.description }}
            {{ end }}
\`\`\`

**6. Notification Policies:**
\`\`\`yaml
apiVersion: 1
policies:
  - receiver: default-email
    group_by: ['alertname', 'cluster']
    group_wait: 30s
    group_interval: 5m
    repeat_interval: 12h
    routes:
      - receiver: critical-pagerduty
        matchers:
          - severity = critical
        continue: true
      - receiver: team-slack
        matchers:
          - severity = warning
        group_wait: 1m
\`\`\`

**7. Silences:**
\`\`\`json
{
  "matchers": [
    {
      "name": "alertname",
      "value": "HighMemoryUsage",
      "isRegex": false
    },
    {
      "name": "instance",
      "value": "server-1",
      "isRegex": false
    }
  ],
  "startsAt": "2024-01-15T10:00:00Z",
  "endsAt": "2024-01-15T18:00:00Z",
  "comment": "Planned maintenance",
  "createdBy": "admin"
}
\`\`\`

**8. Alert Testing:**
\`\`\`bash
# Test alert via API
curl -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "dashboardId": 1,
    "panelId": 1
  }' \
  http://grafana.example.com/api/alerts/test

# Trigger test notification
curl -X POST \
  -H "Authorization: Bearer $API_KEY" \
  http://grafana.example.com/api/alert-notifications/1/test
\`\`\`

**9. Provisioning Alerts:**
\`\`\`yaml
# /etc/grafana/provisioning/alerting/alerts.yaml
apiVersion: 1
groups:
  - name: production_alerts
    folder: Alerts
    interval: 1m
    rules:
      - uid: slo_breach
        title: SLO Breach
        condition: A
        data:
          - refId: A
            datasourceUid: prometheus
            model:
              expr: |
                (
                  sum(rate(http_requests_total{status="200"}[30d]))
                  /
                  sum(rate(http_requests_total[30d]))
                ) < 0.999
        for: 15m
        annotations:
          description: 'SLO breach: availability is {{ $value | humanizePercentage }}'
\`\`\``
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#ef4444',
      'Dashboards': '#3b82f6',
      'PromQL Integration': '#7c3aed',
      'Alerting': '#f59e0b'
    }
    return colors[category] || '#6b7280'
  }

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Medium' ? '#f59e0b' : '#dc2626'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
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
          Grafana Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <CollapsibleSidebar
        items={displayQuestions}
        selectedIndex={expandedQuestion ? displayQuestions.findIndex(q => q.id === expandedQuestion) : -1}
        onSelect={(index) => toggleQuestion(displayQuestions[index].id)}
        title="Questions"
        getItemLabel={(item) => `${item.id}. ${item.category}`}
        getItemIcon={() => '❓'}
        primaryColor="#3b82f6"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive Grafana questions covering dashboards, panels, data sources, alerting, and templating.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayQuestions.map((q) => (
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
                  <CompletionCheckbox problemId={`GrafanaQuestions-${q.id}`} />
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
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        borderRadius: '12px',
        border: '2px solid #f59e0b'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fbbf24', marginBottom: '0.5rem', textAlign: 'left' }}>
          Grafana Best Practices
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Use template variables for reusable dashboards</li>
          <li>Organize dashboards into folders by team or service</li>
          <li>Set up proper alert notification channels and routing</li>
          <li>Use dashboard provisioning for version control</li>
          <li>Implement proper RBAC and user management</li>
          <li>Optimize queries to reduce database load</li>
          <li>Use dashboard links for navigation between related dashboards</li>
          <li>Set appropriate data retention policies</li>
        </ul>
      </div>
    </div>
  )
}

export default GrafanaQuestions

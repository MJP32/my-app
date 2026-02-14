import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function DynatraceQuestions({ onBack, breadcrumb, problemLimit }) {
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

      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'yaml'
          codeLines = []
        } else {
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

      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

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
      question: 'What is Dynatrace and explain its OneAgent architecture',
      answer: `**Dynatrace:**
An AI-powered, full-stack observability platform that provides automatic and intelligent monitoring of applications, infrastructure, and user experience

**Key Capabilities:**
- Full-stack monitoring (infrastructure, application, digital experience)
- AI-powered root cause analysis (Davis AI)
- Automatic discovery and instrumentation
- Real user monitoring (RUM) and synthetic monitoring
- Cloud-native support (Kubernetes, serverless, microservices)
- Code-level visibility without manual instrumentation

**OneAgent Architecture:**

**1. OneAgent Components:**
\`\`\`
┌──────────────────────────────────────────┐
│              Host Machine                │
│  ┌────────────────────────────────────┐  │
│  │           OneAgent                 │  │
│  │  ┌──────────┐  ┌───────────────┐  │  │
│  │  │  Process  │  │  OS Monitoring│  │  │
│  │  │  Agent    │  │  Module       │  │  │
│  │  └────┬─────┘  └───────┬───────┘  │  │
│  │       │                │          │  │
│  │  ┌────▼────────────────▼───────┐  │  │
│  │  │   Data Collection Module    │  │  │
│  │  └────────────┬────────────────┘  │  │
│  └───────────────┼────────────────────┘  │
│                  │ (encrypted)           │
│         ┌────────▼─────────┐             │
│         │  ActiveGate      │             │
│         │  (optional)      │             │
│         └────────┬─────────┘             │
└──────────────────┼───────────────────────┘
                   │
          ┌────────▼─────────┐
          │  Dynatrace       │
          │  Cluster/SaaS    │
          └──────────────────┘
\`\`\`

**2. OneAgent Deployment:**
\`\`\`bash
# Linux installation
wget -O Dynatrace-OneAgent.sh \\
  "https://{your-environment}.live.dynatrace.com/api/v1/deployment/installer/agent/unix/default/latest?Api-Token={token}"
chmod +x Dynatrace-OneAgent.sh
sudo ./Dynatrace-OneAgent.sh
\`\`\`

**Kubernetes Deployment:**
\`\`\`yaml
apiVersion: dynatrace.com/v1beta1
kind: DynaKube
metadata:
  name: dynakube
  namespace: dynatrace
spec:
  apiUrl: https://{environment-id}.live.dynatrace.com/api
  tokens: dynakube
  oneAgent:
    cloudNativeFullStack:
      image: ""
  activeGate:
    capabilities:
      - routing
      - kubernetes-monitoring
\`\`\`

**3. Auto-Instrumentation:**
\`\`\`
Supported Technologies (auto-detected):
- Java (JVM bytecode instrumentation)
- .NET / .NET Core
- Node.js
- PHP
- Go
- Python

What OneAgent captures automatically:
- Service calls and dependencies
- Database queries with bind values
- HTTP requests/responses
- Message queue operations
- Exception details with stack traces
- Method-level hot spots
\`\`\`

**4. Smartscape Topology:**
\`\`\`
Automatic dependency mapping:
- Host → Process → Service → Application
- Cross-tier relationships
- Database connections
- Message queue links
- Cloud infrastructure relationships

Smartscape automatically detects:
- New services and processes
- Topology changes
- Communication patterns
- Load balancer configurations
\`\`\`

**5. Data Model:**
\`\`\`yaml
Entities:
  Host:
    - CPU, memory, disk, network metrics
    - Process list and resource usage
  Process Group:
    - Grouped by technology and configuration
    - JVM metrics for Java processes
  Service:
    - Response time, throughput, error rate
    - Top requests and failure analysis
  Application:
    - User actions and page loads
    - JavaScript errors
    - User session details
\`\`\``
    },
    {
      id: 2,
      category: 'Davis AI',
      difficulty: 'Hard',
      question: 'How does Davis AI detect and analyze problems in Dynatrace?',
      answer: `**Davis AI Engine:**
Dynatrace's deterministic AI engine that automatically detects anomalies, identifies root causes, and provides precise answers

**1. Anomaly Detection:**
\`\`\`
Davis baselines every metric automatically:
- Response time baselines (per service, per request)
- Error rate baselines
- Throughput baselines
- Infrastructure metric baselines

Detection Methods:
- Statistical baselines (seasonal patterns)
- Multi-dimensional correlation
- Topology-aware analysis
- Automatic threshold adjustment

No manual threshold configuration needed
\`\`\`

**2. Problem Detection Flow:**
\`\`\`
1. Metric anomaly detected (e.g., response time spike)
2. Davis correlates with topology (Smartscape)
3. Identifies affected components across the stack
4. Determines root cause vs. symptoms
5. Creates a single problem card
6. Assigns precise root cause

Example Problem Card:
┌─────────────────────────────────────┐
│ PROBLEM: Response time degradation  │
│ Impact: 2 services, 500 users      │
│ Root Cause: Database connection     │
│            pool exhaustion          │
│ Duration: 15 minutes               │
│ Status: Open                        │
└─────────────────────────────────────┘
\`\`\`

**3. Root Cause Analysis:**
\`\`\`
Davis AI determines root cause by:

Vertical Analysis (within a host):
- Process → JVM → GC → Memory pressure
- Host → CPU saturation → noisy neighbor

Horizontal Analysis (across services):
- Service A → Service B → Database
- API Gateway → Microservice → Cache

Infrastructure Correlation:
- Deployment events
- Configuration changes
- Cloud provider issues
- Network problems
\`\`\`

**4. Event Correlation:**
\`\`\`
Davis correlates multiple signals:

Example: Slow Application Response
Symptoms detected:
  1. Frontend: Increased page load time
  2. Service A: Response time degradation
  3. Service B: Response time degradation
  4. Database: Connection pool at 100%
  5. Host: High CPU on DB server

Davis conclusion:
  Root Cause: Database server CPU saturation
  Impact chain: DB CPU → Connection pool → Service B → Service A → Frontend
  Affected users: 1,250

All correlated into ONE problem, not 5 separate alerts
\`\`\`

**5. Custom Anomaly Detection:**
\`\`\`yaml
# Settings → Anomaly Detection → Services
Service Anomaly Detection:
  Response Time:
    Detection: Auto (recommended)
    Sensitivity: Medium
    # Or fixed threshold:
    # Detection: Fixed
    # Threshold: 500ms

  Error Rate:
    Detection: Auto
    Sensitivity: High

  Throughput:
    Detection: Auto
    Sensitivity: Low

# Custom metric events via API
POST /api/v2/settings/objects
{
  "schemaId": "builtin:anomaly-detection.metric-events",
  "value": {
    "summary": "High heap usage",
    "enabled": true,
    "eventType": "CUSTOM_ALERT",
    "modelProperties": {
      "type": "STATIC_THRESHOLD",
      "threshold": 90,
      "alertOnNoData": false,
      "violatingSamples": 3,
      "samples": 5,
      "dealertingSamples": 5
    },
    "queryDefinition": {
      "type": "METRIC_KEY",
      "metricKey": "jvm.memory.heap.used",
      "aggregation": "AVG"
    }
  }
}
\`\`\`

**6. Alerting Integration:**
\`\`\`yaml
# Problem notification profiles
Alerting Profile:
  Name: Production Critical
  Severity Rules:
    - Availability: Include
    - Error: Include
    - Slowdown: Include (> 10 min duration)
    - Resource: Include (> 15 min duration)
    - Custom: Include
  Filters:
    - Management Zone: Production
    - Tag: [environment:prod]

# Integration channels
Notifications:
  - Slack: #incidents channel
  - PagerDuty: P1 escalation policy
  - ServiceNow: Auto-create incident
  - Webhook: Custom automation
  - Email: Team distribution list
\`\`\`

**7. Davis AI vs Traditional Monitoring:**
\`\`\`
Traditional Monitoring:
- Manual threshold configuration
- Alert storms (100+ alerts for one issue)
- No automatic root cause
- Requires domain expertise to correlate
- Reactive investigation

Davis AI:
- Automatic baseline learning
- Single problem card for correlated issues
- Automatic root cause identification
- Topology-aware correlation
- Proactive detection before user impact
\`\`\``
    },
    {
      id: 3,
      category: 'Distributed Tracing',
      difficulty: 'Hard',
      question: 'Explain PurePath distributed tracing in Dynatrace',
      answer: `**PurePath Distributed Tracing:**
Dynatrace's end-to-end distributed tracing technology that captures every transaction across all tiers with code-level visibility

**1. PurePath Architecture:**
\`\`\`
User Browser/Mobile
    │
    ▼ (JavaScript agent)
┌─────────┐    ┌─────────┐    ┌─────────┐
│ Web App  │───▶│ API Svc │───▶│ Auth Svc│
│ (Node)   │    │ (Java)  │    │ (.NET)  │
└─────────┘    └────┬────┘    └─────────┘
                    │
               ┌────▼────┐    ┌──────────┐
               │ Order   │───▶│PostgreSQL│
               │ Service │    │ Database │
               │ (Java)  │    └──────────┘
               └────┬────┘
                    │
               ┌────▼────┐
               │  Kafka  │
               │  Queue  │
               └────┬────┘
                    │
               ┌────▼─────┐
               │ Inventory │
               │ Service   │
               │ (Go)      │
               └───────────┘

PurePath captures the ENTIRE flow with:
- Timing for each hop
- Code-level method traces
- Database query details
- Queue message details
\`\`\`

**2. What PurePath Captures:**
\`\`\`
For each transaction:
- End-to-end response time
- Time spent in each service
- Database queries with execution plans
- External API calls
- Queue operations (publish/consume)
- Method-level hot spots
- CPU and wait time breakdown
- Exception details with full stack traces
- HTTP headers and parameters

Code-Level Detail:
- Method execution time
- SQL statements with bind values
- Connection pool wait time
- Serialization/deserialization overhead
- Third-party library calls
\`\`\`

**3. PurePath vs OpenTelemetry:**
\`\`\`
PurePath (Dynatrace):
- Automatic instrumentation (no code changes)
- Code-level visibility out of the box
- Captures 100% of transactions (intelligent sampling)
- Integrated with Davis AI for analysis
- Proprietary trace context propagation

OpenTelemetry:
- Manual or SDK-based instrumentation
- Community-driven, vendor-neutral
- Requires sampling strategy configuration
- Analysis depends on backend tool
- W3C Trace Context standard

Dynatrace can ingest OpenTelemetry data:
\`\`\`

\`\`\`yaml
# OpenTelemetry integration
# Send OTLP traces to Dynatrace
OTEL_EXPORTER_OTLP_ENDPOINT: https://{env}.live.dynatrace.com/api/v2/otlp
OTEL_EXPORTER_OTLP_HEADERS: "Authorization=Api-Token {token}"
OTEL_SERVICE_NAME: my-service

# Dynatrace enriches OTLP spans with:
# - Topology context (Smartscape)
# - AI-based analysis
# - Infrastructure correlation
\`\`\`

**4. Service Flow Analysis:**
\`\`\`
Service Flow View shows:
- Request flow between services
- Response time contribution per tier
- Error propagation path
- Throughput at each hop
- Database and messaging dependencies

Filtering:
- By time range
- By response time threshold
- By error status
- By specific request attributes
- By user session
\`\`\`

**5. Request Attributes:**
\`\`\`yaml
# Capture custom request attributes
# Settings → Server-side service monitoring → Request attributes

Request Attribute:
  Name: Order ID
  Data Source: Request Header
  Header Name: X-Order-ID

Request Attribute:
  Name: Customer Tier
  Data Source: Java Method Parameter
  Class: com.example.OrderService
  Method: processOrder
  Parameter: 1  # First parameter
  Type: String

# Use in analysis:
# Filter PurePaths by Order ID
# Group response times by Customer Tier
\`\`\`

**6. Multidimensional Analysis:**
\`\`\`
Analyze service performance by:
- Request type (URL, operation name)
- Response time distribution
- Error type and rate
- Geographic location
- Browser/device type
- Custom request attributes

Top Requests View:
- Sorted by total time contribution
- Shows count, avg response time, error rate
- Drill down to individual PurePaths
- Compare time periods
\`\`\`

**7. Database Analysis:**
\`\`\`
Database Insights from PurePaths:
- Top SQL statements by execution time
- Slow query identification
- Connection pool utilization
- Execution plan analysis
- N+1 query detection
- Bind value capture for debugging

Example analysis:
  SELECT * FROM orders WHERE customer_id = ?
  Avg execution: 45ms
  Max execution: 2,300ms
  Call count: 15,000/min
  Failure rate: 0.1%
\`\`\`

**8. Exception Analysis:**
\`\`\`
PurePath Exception Details:
- Full stack trace
- Method that threw the exception
- Request context (URL, parameters)
- Upstream service that triggered it
- Frequency and first/last occurrence
- Impact on end users

Exception grouping:
- By exception class
- By throwing method
- By service
- By deployment version
\`\`\``
    },
    {
      id: 4,
      category: 'SLOs',
      difficulty: 'Medium',
      question: 'How do you configure SLOs and automation in Dynatrace?',
      answer: `**Service Level Objectives (SLOs) in Dynatrace:**

**1. SLO Configuration:**
\`\`\`yaml
# Creating an SLO via API
POST /api/v2/slo
{
  "name": "Payment Service Availability",
  "description": "99.9% availability for payment processing",
  "metricExpression": "100*(builtin:service.errors.server.successCount:splitBy())/(builtin:service.requestCount.server:splitBy())",
  "evaluationType": "AGGREGATE",
  "filter": "type(SERVICE),entityName(PaymentService)",
  "target": 99.9,
  "warning": 99.95,
  "timeframe": "-30d"
}
\`\`\`

**2. SLO Types:**
\`\`\`
Availability SLO:
- Measures successful request percentage
- Target: 99.9% (allows 43.2 min downtime/month)
- Metric: Success count / Total count * 100

Latency SLO:
- Measures requests within time threshold
- Target: 95% of requests {'<'} 500ms
- Metric: Fast requests / Total count * 100

Custom SLO:
- Based on any Dynatrace metric
- Flexible evaluation criteria
- Business-specific objectives
\`\`\`

**3. Error Budget:**
\`\`\`
Error Budget Calculation:
  SLO Target: 99.9%
  Time Window: 30 days
  Total minutes: 43,200

  Allowed failure: 0.1% = 43.2 minutes
  Current availability: 99.85%
  Error budget consumed: 150%
  Error budget remaining: -21.6 minutes (EXCEEDED)

Error Budget Policies:
  > 50% consumed: Warning to team
  > 75% consumed: Freeze non-critical deployments
  > 100% consumed: Incident response activated
\`\`\`

**4. SLO Dashboard:**
\`\`\`yaml
# Dashboard tile configuration
SLO Dashboard Elements:
  - SLO status tile (current %)
  - Error budget burn rate
  - SLO trend over time
  - Related problem cards
  - Remaining error budget

# Multi-SLO view
Service SLOs:
  Payment Service:
    Availability: 99.92% (target: 99.9%) ✅
    Latency P95: 98.5% (target: 95%) ✅
  Order Service:
    Availability: 99.71% (target: 99.9%) ❌
    Latency P95: 93.2% (target: 95%) ❌
\`\`\`

**5. Dynatrace Automation (Workflows):**
\`\`\`yaml
# Workflow: Auto-remediation for high error rate
Workflow:
  Name: Auto-Scale on Error Budget Burn
  Trigger:
    Type: Davis Problem
    Filter:
      problemType: ERROR_EVENT
      managementZone: Production

  Actions:
    - name: Validate problem
      action: dynatrace.jira.connector
      input:
        summary: "SLO breach: {{problem.title}}"
        description: "{{problem.rootCauseEntity}}"

    - name: Scale up
      action: dynatrace.kubernetes.connector
      input:
        action: scale
        namespace: production
        deployment: "{{problem.affectedEntity}}"
        replicas: "+2"
      condition: "{{problem.severityLevel}} == AVAILABILITY"

    - name: Notify team
      action: dynatrace.slack.connector
      input:
        channel: "#incidents"
        message: "Auto-scaled {{problem.affectedEntity}} due to SLO breach"
\`\`\`

**6. Metric API for Custom Dashboards:**
\`\`\`bash
# Query SLO status
GET /api/v2/slo/{slo-id}?from=now-7d&to=now&timeFrame=GTF

# Response
{
  "name": "Payment Availability",
  "evaluatedPercentage": 99.92,
  "status": "SUCCESS",
  "target": 99.9,
  "warning": 99.95,
  "errorBudget": 72.5,
  "relatedOpenProblems": 0
}

# Query metrics
GET /api/v2/metrics/query?metricSelector=builtin:service.response.time:percentile(95)&entitySelector=type(SERVICE),entityName(PaymentService)
\`\`\`

**7. Management Zones:**
\`\`\`yaml
# Organize monitoring by team/environment
Management Zone:
  Name: Production - Payment Team
  Rules:
    - Type: Service
      Condition:
        - Tag: [team:payments]
        - Tag: [env:production]
    - Type: Host
      Condition:
        - Host group: payment-hosts
    - Type: Process Group
      Condition:
        - Technology: Java
        - Tag: [team:payments]

# Apply SLOs per management zone
# Apply alerting profiles per zone
# Role-based access control per zone
\`\`\`

**8. Site Reliability Guardian:**
\`\`\`yaml
# Automated release validation
Guardian:
  Name: Production Release Validation
  Objectives:
    - name: Error Rate
      type: DQL
      query: >
        fetch dt.entity.service
        | filter entity.name == "PaymentService"
        | lookup [timeseries err=builtin:service.errors.server.rate], sourceField:id, lookupField:dt.entity.service
      target: "<= 0.1%"

    - name: Response Time P95
      type: DQL
      query: >
        timeseries rt=builtin:service.response.time:percentile(95),
        filter: in(dt.entity.service, "SERVICE-ABC123")
      target: "<= 500ms"

    - name: Throughput
      type: DQL
      query: >
        timeseries tp=builtin:service.requestCount.total:value,
        filter: in(dt.entity.service, "SERVICE-ABC123")
      target: ">= 1000/min"

  Comparison:
    window: 30m
    baseline: previous_week
\`\`\``
    }
  ]

  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#ef4444',
      'Davis AI': '#3b82f6',
      'Distributed Tracing': '#7c3aed',
      'SLOs': '#10b981'
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
          color: '#6f2da8',
          margin: 0
        }}>
          Dynatrace Interview Questions
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
        primaryColor="#6f2da8"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive Dynatrace questions covering OneAgent architecture, Davis AI, distributed tracing, and SLO management.
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
                  <CompletionCheckbox problemId={`DynatraceQuestions-${q.id}`} />
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
        backgroundColor: 'rgba(111, 45, 168, 0.15)',
        borderRadius: '12px',
        border: '2px solid #6f2da8'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#c084fc', marginBottom: '0.5rem', textAlign: 'left' }}>
          Dynatrace Best Practices
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Deploy OneAgent on all hosts for full topology visibility</li>
          <li>Define management zones to organize by team and environment</li>
          <li>Configure SLOs aligned with business objectives</li>
          <li>Use request attributes for business context in traces</li>
          <li>Set up alerting profiles to route problems to the right teams</li>
          <li>Leverage Davis AI instead of manual threshold configuration</li>
        </ul>
      </div>
    </div>
  )
}

export default DynatraceQuestions

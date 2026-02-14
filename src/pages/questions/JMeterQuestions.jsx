import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function JMeterQuestions({ onBack, breadcrumb, problemLimit }) {
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

      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'java'
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
      question: 'What is Apache JMeter and explain its test plan architecture',
      answer: `**Apache JMeter:**
An open-source load testing tool designed to measure performance and functional behavior of web applications and services

**Key Capabilities:**
- Load and performance testing of HTTP/HTTPS, SOAP, REST, FTP, JDBC, LDAP, JMS
- Stress testing to find breaking points
- Regression testing to verify performance after changes
- Supports distributed testing across multiple machines
- Extensible via plugins and custom samplers

**Test Plan Architecture:**

**1. Test Plan:**
The root element that contains all test elements
\`\`\`xml
<TestPlan>
  {'<'}stringProp name="TestPlan.comments">My Load Test</stringProp>
  {'<'}boolProp name="TestPlan.functional_mode">false</boolProp>
  {'<'}boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
</TestPlan>
\`\`\`

**2. Thread Groups:**
Simulate concurrent users
\`\`\`xml
<ThreadGroup>
  {'<'}stringProp name="ThreadGroup.num_threads">100</stringProp>
  {'<'}stringProp name="ThreadGroup.ramp_time">60</stringProp>
  {'<'}stringProp name="ThreadGroup.duration">300</stringProp>
  {'<'}boolProp name="ThreadGroup.scheduler">true</boolProp>
</ThreadGroup>
\`\`\`

**3. Samplers:**
Send requests to the server
\`\`\`java
// HTTP Request Sampler configuration
Protocol: https
Server Name: api.example.com
Port: 443
Method: POST
Path: /api/orders
Content-Type: application/json
Body Data: {"productId": "${productId}", "quantity": ${quantity}}
\`\`\`

**4. Config Elements:**
\`\`\`
- HTTP Header Manager: Set request headers
- HTTP Cookie Manager: Handle cookies/sessions
- CSV Data Set Config: Parameterize with external data
- User Defined Variables: Set reusable variables
- HTTP Request Defaults: Set default connection settings
\`\`\`

**5. Listeners:**
\`\`\`
- View Results Tree: Detailed request/response data
- Summary Report: Aggregate statistics
- Aggregate Report: Detailed statistics with percentiles
- Backend Listener: Export metrics to InfluxDB/Graphite
\`\`\`

**6. Assertions:**
\`\`\`java
// Response Assertion
Response Code: 200
Response Message: OK

// JSON Assertion
JSON Path: $.status
Expected Value: success

// Duration Assertion
Duration (ms): 2000  // Fail if response > 2 seconds
\`\`\`

**7. Timers:**
\`\`\`
- Constant Timer: Fixed delay between requests
- Gaussian Random Timer: Normally distributed delay
- Uniform Random Timer: Random delay within range
- Constant Throughput Timer: Control request rate
\`\`\`

**Execution Flow:**
\`\`\`
Test Plan
  └── Thread Group (100 users, 60s ramp-up)
       ├── HTTP Header Manager
       ├── HTTP Cookie Manager
       ├── CSV Data Set Config
       ├── HTTP Request: Login
       │    └── Response Assertion (200 OK)
       ├── HTTP Request: Browse Products
       │    └── JSON Assertion
       ├── HTTP Request: Add to Cart
       ├── HTTP Request: Checkout
       │    └── Duration Assertion ({'<'} 3s)
       └── Listeners (Summary Report)
\`\`\``
    },
    {
      id: 2,
      category: 'Test Design',
      difficulty: 'Hard',
      question: 'How do you design data-driven tests and use scripting in JMeter?',
      answer: `**Data-Driven Testing in JMeter:**

**1. CSV Data Set Config:**
\`\`\`
Filename: test_data.csv
Variable Names: username, password, email
Delimiter: ,
Recycle on EOF: True
Stop Thread on EOF: False
Sharing Mode: All Threads
\`\`\`

**CSV File Example:**
\`\`\`
username,password,email
john_doe,Pass123!,john@example.com
jane_smith,Pass456!,jane@example.com
bob_wilson,Pass789!,bob@example.com
\`\`\`

**2. Using Variables in Requests:**
\`\`\`java
// HTTP Request body with CSV variables
{
  "username": "\${username}",
  "password": "\${password}",
  "email": "\${email}"
}

// URL parameters
/api/users/\${userId}?action=\${action}
\`\`\`

**3. JSR223 Groovy Scripting:**

**Pre-Processor (setup before request):**
\`\`\`groovy
// Generate dynamic data
import java.util.UUID
import java.time.Instant

def orderId = UUID.randomUUID().toString()
def timestamp = Instant.now().toString()

vars.put("orderId", orderId)
vars.put("timestamp", timestamp)

// Generate random quantity between 1 and 10
def quantity = new Random().nextInt(10) + 1
vars.put("quantity", String.valueOf(quantity))

log.info("Generated orderId: " + orderId)
\`\`\`

**Post-Processor (extract from response):**
\`\`\`groovy
// Extract token from JSON response
import groovy.json.JsonSlurper

def response = prev.getResponseDataAsString()
def json = new JsonSlurper().parseText(response)

def token = json.accessToken
vars.put("authToken", token)

// Store for correlation
props.put("sharedToken", token)

log.info("Extracted token: " + token)
\`\`\`

**4. JSON Extractor:**
\`\`\`
Variable Name: authToken
JSON Path Expression: $.data.token
Match No: 1
Default Value: TOKEN_NOT_FOUND
\`\`\`

**5. Regular Expression Extractor:**
\`\`\`
Reference Name: sessionId
Regular Expression: Set-Cookie: JSESSIONID=(.+?);
Template: $1$
Match No: 1
\`\`\`

**6. Correlation (Dynamic Values):**
\`\`\`groovy
// Extract CSRF token from HTML
import java.util.regex.Pattern

def response = prev.getResponseDataAsString()
def pattern = Pattern.compile('name="_csrf" value="(.+?)"')
def matcher = pattern.matcher(response)

if (matcher.find()) {
    vars.put("csrfToken", matcher.group(1))
}
\`\`\`

**7. BeanShell vs JSR223:**
\`\`\`
JSR223 + Groovy (Recommended):
- Compiled and cached for performance
- Full Java/Groovy API access
- Better string handling and closures

BeanShell (Legacy):
- Interpreted at runtime (slower)
- Limited language features
- Use only for backward compatibility
\`\`\`

**8. Test Data Management:**
\`\`\`groovy
// JDBC PreProcessor for database-driven data
import java.sql.DriverManager

def conn = DriverManager.getConnection(
    "jdbc:postgresql://localhost:5432/testdb",
    "user", "password"
)
def stmt = conn.prepareStatement(
    "SELECT id, name FROM products WHERE active = true LIMIT 100"
)
def rs = stmt.executeQuery()

def productIds = []
while (rs.next()) {
    productIds.add(rs.getString("id"))
}

vars.put("productIds", productIds.join(","))
conn.close()
\`\`\`

**9. Parameterized Headers:**
\`\`\`
HTTP Header Manager:
  Authorization: Bearer \${authToken}
  X-Request-ID: \${__UUID()}
  X-Correlation-ID: \${correlationId}
  Content-Type: application/json
\`\`\``
    },
    {
      id: 3,
      category: 'Distributed Testing',
      difficulty: 'Hard',
      question: 'How do you set up and run distributed load tests with JMeter?',
      answer: `**Distributed Testing Architecture:**

**Overview:**
\`\`\`
                    ┌──────────────┐
                    │   Controller │
                    │   (Master)   │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────▼─────┐ ┌───▼───┐ ┌─────▼─────┐
        │  Worker 1  │ │Worker2│ │  Worker 3  │
        │  (Slave)   │ │(Slave)│ │  (Slave)   │
        └─────┬──────┘ └───┬───┘ └─────┬──────┘
              │            │            │
              └────────────┼────────────┘
                           │
                    ┌──────▼───────┐
                    │  Target SUT  │
                    └──────────────┘
\`\`\`

**1. Worker (Slave) Configuration:**
\`\`\`bash
# jmeter.properties on each worker
server_port=1099
server.rmi.localport=4000
server.rmi.ssl.disable=false

# Start worker in server mode
jmeter-server -Djava.rmi.server.hostname=192.168.1.101
\`\`\`

**2. Controller (Master) Configuration:**
\`\`\`bash
# jmeter.properties on controller
remote_hosts=192.168.1.101:1099,192.168.1.102:1099,192.168.1.103:1099

# Run distributed test from CLI
jmeter -n -t test_plan.jmx \\
  -R 192.168.1.101,192.168.1.102,192.168.1.103 \\
  -l results.jtl \\
  -e -o report_output
\`\`\`

**3. Non-GUI Mode (Production Testing):**
\`\`\`bash
# Single machine
jmeter -n -t load_test.jmx \\
  -l results.jtl \\
  -j jmeter.log \\
  -e -o html_report \\
  -Jthreads=500 \\
  -Jrampup=120 \\
  -Jduration=600

# Distributed mode
jmeter -n -t load_test.jmx \\
  -R worker1,worker2,worker3 \\
  -l results.jtl \\
  -e -o html_report \\
  -Gthreads=200 \\
  -Grampup=60
\`\`\`

**4. Thread Distribution:**
\`\`\`
Controller Thread Group: 300 threads
Workers: 3 machines

Distribution:
- Worker 1: 300 threads
- Worker 2: 300 threads
- Worker 3: 300 threads
Total: 900 threads (each worker runs full thread count)

Note: Each worker runs the FULL thread count.
To split load, divide threads by worker count.
\`\`\`

**5. Handling Shared Resources:**
\`\`\`groovy
// CSV files must be present on ALL workers at same path
// OR use __CSVRead function with absolute paths

// Property sharing between controller and workers
// -G sets global properties (sent to all workers)
// -J sets local properties (controller only)

// In test plan, use:
def threads = props.get("threads") ?: "100"
def rampup = props.get("rampup") ?: "60"
\`\`\`

**6. Docker-Based Distribution:**
\`\`\`yaml
# docker-compose.yml
version: '3'
services:
  controller:
    image: justb4/jmeter:latest
    volumes:
      - ./test:/test
      - ./results:/results
    command: >
      -n -t /test/load_test.jmx
      -R worker1,worker2,worker3
      -l /results/results.jtl
      -e -o /results/report

  worker1:
    image: justb4/jmeter:latest
    command: -s -Jserver.rmi.localport=4000
    expose:
      - "1099"
      - "4000"

  worker2:
    image: justb4/jmeter:latest
    command: -s -Jserver.rmi.localport=4000
    expose:
      - "1099"
      - "4000"

  worker3:
    image: justb4/jmeter:latest
    command: -s -Jserver.rmi.localport=4000
    expose:
      - "1099"
      - "4000"
\`\`\`

**7. CI/CD Integration:**
\`\`\`groovy
// Jenkinsfile
pipeline {
    agent any
    stages {
        stage('Performance Test') {
            steps {
                sh '''
                    jmeter -n -t tests/load_test.jmx \\
                      -l results/results.jtl \\
                      -e -o results/report \\
                      -Jthreads=100 \\
                      -Jrampup=30 \\
                      -Jduration=300
                '''
            }
            post {
                always {
                    perfReport sourceDataFiles: 'results/results.jtl',
                        errorFailedThreshold: 5,
                        errorUnstableThreshold: 3
                    publishHTML([
                        reportDir: 'results/report',
                        reportFiles: 'index.html',
                        reportName: 'JMeter Report'
                    ])
                }
            }
        }
    }
}
\`\`\`

**8. Monitoring Workers:**
\`\`\`bash
# Check worker status
jmeter -n -t test.jmx -R worker1 -X  # Stop after test

# Worker logs
tail -f jmeter-server.log

# Resource monitoring during test
top -b -n 1 | head -20
vmstat 5
iostat -x 5
\`\`\``
    },
    {
      id: 4,
      category: 'Analysis',
      difficulty: 'Medium',
      question: 'How do you analyze JMeter results and generate performance reports?',
      answer: `**JMeter Results Analysis:**

**1. Key Performance Metrics:**
\`\`\`
- Throughput: Requests per second the server handles
- Response Time: Time from request sent to response received
  - Average, Median, 90th/95th/99th percentile
- Error Rate: Percentage of failed requests
- Concurrent Users: Active threads at any point
- Bandwidth: Data transferred per second
- Latency: Time to first byte received
- Connect Time: TCP connection establishment time
\`\`\`

**2. HTML Dashboard Report:**
\`\`\`bash
# Generate report from results file
jmeter -g results.jtl -o html_report/

# Generate during test execution
jmeter -n -t test.jmx -l results.jtl -e -o html_report/

# Report sections:
# - Dashboard (summary statistics)
# - Charts (response times, throughput, errors)
# - Statistics table (per-request breakdown)
# - Errors table (error categories)
\`\`\`

**3. Report Configuration:**
\`\`\`
# reportgenerator.properties
jmeter.reportgenerator.overall_granularity=60000
jmeter.reportgenerator.apdex_satisfied_threshold=500
jmeter.reportgenerator.apdex_tolerated_threshold=1500
jmeter.reportgenerator.graph.responseTimePercentiles.title=Response Time Percentiles
\`\`\`

**4. Backend Listener (Real-Time Monitoring):**
\`\`\`
# InfluxDB Backend Listener
influxdbUrl: http://influxdb:8086/write?db=jmeter
application: my-app
measurement: jmeter
percentiles: 90;95;99
testTitle: Load Test - Sprint 42

# Grafana Dashboard for Real-Time View:
# Import dashboard ID 5496 for JMeter metrics
\`\`\`

**5. Analyzing Response Times:**
\`\`\`
Performance Thresholds:
- Excellent: {'<'} 200ms (average)
- Good: 200ms - 500ms
- Acceptable: 500ms - 1000ms
- Poor: 1000ms - 3000ms
- Unacceptable: > 3000ms

Key Indicators:
- p90 > 2x average → High variance, investigate outliers
- p99 > 5x average → Tail latency issues
- Increasing trend → Resource exhaustion or memory leak
- Sudden spikes → GC pauses or connection pool limits
\`\`\`

**6. Interpreting Throughput:**
\`\`\`
Throughput Patterns:
- Flat throughput + increasing response time = Server saturated
- Decreasing throughput + errors = Server failing
- Linear throughput increase = Server scaling well
- Throughput plateau = Bottleneck reached

Bottleneck Identification:
- CPU > 80%: Compute-bound (optimize code)
- Memory growing: Memory leak (profile heap)
- Disk I/O high: Storage-bound (add caching)
- Network saturated: Bandwidth limit (compress, CDN)
- Thread pool full: Connection-bound (tune pool size)
\`\`\`

**7. JTL Results File Analysis:**
\`\`\`
# CSV format fields
timeStamp,elapsed,label,responseCode,responseMessage,
threadName,dataType,success,failureMessage,bytes,
sentBytes,grpThreads,allThreads,URL,Latency,
IdleTime,Connect

# Example analysis with command line
# Average response time per request
awk -F',' 'NR>1 {sum[$3]+=$2; count[$3]++}
  END {for (k in sum) print k, sum[k]/count[k]}' results.jtl

# Error rate
awk -F',' 'NR>1 {total++; if($8=="false") errors++}
  END {print "Error Rate:", errors/total*100"%"}' results.jtl
\`\`\`

**8. Comparison Reports:**
\`\`\`bash
# Compare two test runs
# Use JMeter CMDRunner plugin
java -jar CMDRunner.jar --tool Reporter \\
  --generate-csv comparison.csv \\
  --input-jtl baseline.jtl \\
  --plugin-type ResponseTimesPercentiles

# Performance regression detection
# Compare p95 between runs:
# If current p95 > baseline p95 * 1.1 → regression detected
\`\`\`

**9. Apdex Score:**
\`\`\`
Apdex = (Satisfied + Tolerated/2) / Total Samples

Thresholds (configurable):
- Satisfied: Response {'<'} 500ms
- Tolerated: 500ms {'<'} Response {'<'} 1500ms
- Frustrated: Response > 1500ms

Rating Scale:
- 0.94 - 1.00: Excellent
- 0.85 - 0.93: Good
- 0.70 - 0.84: Fair
- 0.50 - 0.69: Poor
- 0.00 - 0.49: Unacceptable
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
      'Test Design': '#3b82f6',
      'Distributed Testing': '#7c3aed',
      'Analysis': '#10b981'
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
          color: '#dc2626',
          margin: 0
        }}>
          JMeter Interview Questions
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
        primaryColor="#dc2626"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive JMeter questions covering load testing fundamentals, test design, distributed testing, and performance analysis.
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
                  <CompletionCheckbox problemId={`JMeterQuestions-${q.id}`} />
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
        backgroundColor: 'rgba(220, 38, 38, 0.15)',
        borderRadius: '12px',
        border: '2px solid #dc2626'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fca5a5', marginBottom: '0.5rem', textAlign: 'left' }}>
          JMeter Best Practices
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Always run performance tests in non-GUI mode</li>
          <li>Use CSV Data Set Config for parameterized testing</li>
          <li>Add appropriate think times between requests</li>
          <li>Monitor server resources during test execution</li>
          <li>Use JSR223 + Groovy instead of BeanShell for scripting</li>
          <li>Generate HTML reports for comprehensive analysis</li>
        </ul>
      </div>
    </div>
  )
}

export default JMeterQuestions

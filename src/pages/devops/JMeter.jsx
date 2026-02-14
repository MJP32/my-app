import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

const JMETER_COLORS = {
  primary: '#dc2626',
  primaryHover: '#ef4444',
  bg: 'rgba(220, 38, 38, 0.1)',
  border: 'rgba(220, 38, 38, 0.3)',
  arrow: '#dc2626',
  hoverBg: 'rgba(220, 38, 38, 0.2)',
  topicBg: 'rgba(220, 38, 38, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

const JMeterTestPlanDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="jmtPlanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dc2626" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#991b1b" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="170" rx="10" fill="url(#jmtPlanGrad)" stroke="#dc2626" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">JMeter Test Plan Hierarchy</text>
    <rect x="260" y="35" width="180" height="28" rx="5" fill="#1e3a5f" stroke="#dc2626" strokeWidth="2"/>
    <text x="350" y="54" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Test Plan</text>
    <line x1="350" y1="63" x2="350" y2="73" stroke="#94a3b8" strokeWidth="1.5"/>
    <rect x="240" y="73" width="220" height="25" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="350" y="90" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Thread Group (Virtual Users)</text>
    <line x1="265" y1="98" x2="265" y2="108" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="350" y1="98" x2="350" y2="108" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="435" y1="98" x2="435" y2="108" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="180" y1="98" x2="180" y2="108" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="520" y1="98" x2="520" y2="108" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="180" y1="98" x2="520" y2="98" stroke="#94a3b8" strokeWidth="1"/>
    <rect x="20" y="108" width="100" height="24" rx="3" fill="#374151" stroke="#22c55e" strokeWidth="1"/>
    <text x="70" y="124" textAnchor="middle" fill="#4ade80" fontSize="8">Sampler</text>
    <rect x="130" y="108" width="100" height="24" rx="3" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="180" y="124" textAnchor="middle" fill="#fbbf24" fontSize="8">Timer</text>
    <rect x="240" y="108" width="100" height="24" rx="3" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="290" y="124" textAnchor="middle" fill="#a78bfa" fontSize="8">Assertion</text>
    <rect x="350" y="108" width="100" height="24" rx="3" fill="#374151" stroke="#ec4899" strokeWidth="1"/>
    <text x="400" y="124" textAnchor="middle" fill="#f472b6" fontSize="8">Listener</text>
    <rect x="460" y="108" width="100" height="24" rx="3" fill="#374151" stroke="#06b6d4" strokeWidth="1"/>
    <text x="510" y="124" textAnchor="middle" fill="#22d3ee" fontSize="8">Config Element</text>
    <rect x="570" y="108" width="100" height="24" rx="3" fill="#374151" stroke="#ef4444" strokeWidth="1"/>
    <text x="620" y="124" textAnchor="middle" fill="#f87171" fontSize="8">Pre/Post Proc</text>
    <text x="350" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">Test plans saved as .jmx (XML) — version-controllable</text>
  </svg>
)

const DataDrivenDiagram = () => (
  <svg viewBox="0 0 700 150" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="dataDrvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#15803d" stopOpacity="0.05"/>
      </linearGradient>
      <marker id="arrowData" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#22c55e"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="140" rx="10" fill="url(#dataDrvGrad)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">Data-Driven Testing Loop</text>
    <rect x="20" y="45" width="90" height="50" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="65" y="65" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">CSV File</text>
    <text x="65" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">users.csv</text>
    <line x1="110" y1="70" x2="140" y2="70" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowData)"/>
    <rect x="145" y="45" width="110" height="50" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="200" y="63" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="bold">CSV Data Set</text>
    <text x="200" y="77" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="bold">Config</text>
    <text x="200" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7">row → variables</text>
    <line x1="255" y1="70" x2="285" y2="70" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowData)"/>
    <rect x="290" y="45" width="90" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="335" y="65" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Variables</text>
    <text x="335" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">$&#123;user&#125;, $&#123;pass&#125;</text>
    <line x1="380" y1="70" x2="410" y2="70" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowData)"/>
    <rect x="415" y="45" width="110" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="470" y="65" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">HTTP Sampler</text>
    <text x="470" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">POST /api/login</text>
    <line x1="525" y1="70" x2="555" y2="70" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowData)"/>
    <rect x="560" y="45" width="110" height="50" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="615" y="65" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Extractor</text>
    <text x="615" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">$.token → var</text>
    <path d="M615,95 L615,120 L65,120 L65,95" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrowData)"/>
    <text x="340" y="117" textAnchor="middle" fill="#94a3b8" fontSize="8">Next iteration → next CSV row</text>
  </svg>
)

const DistributedTestingDiagram = () => (
  <svg viewBox="0 0 700 170" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="distGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowDist" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
      </marker>
      <marker id="arrowDistBack" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#22c55e"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="160" rx="10" fill="url(#distGrad)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">JMeter Distributed Testing</text>
    <rect x="20" y="50" width="140" height="65" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="90" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Controller</text>
    <text x="90" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">Sends test plan</text>
    <text x="90" y="98" textAnchor="middle" fill="#94a3b8" fontSize="8">Aggregates results</text>
    <line x1="160" y1="65" x2="220" y2="45" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowDist)"/>
    <line x1="160" y1="82" x2="220" y2="82" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowDist)"/>
    <line x1="160" y1="100" x2="220" y2="120" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowDist)"/>
    <rect x="225" y="35" width="120" height="26" rx="4" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="285" y="52" textAnchor="middle" fill="#60a5fa" fontSize="9">Worker 1 (100 users)</text>
    <rect x="225" y="70" width="120" height="26" rx="4" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="285" y="87" textAnchor="middle" fill="#60a5fa" fontSize="9">Worker 2 (100 users)</text>
    <rect x="225" y="105" width="120" height="26" rx="4" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="285" y="122" textAnchor="middle" fill="#60a5fa" fontSize="9">Worker 3 (100 users)</text>
    <text x="285" y="148" textAnchor="middle" fill="#94a3b8" fontSize="8">RMI protocol</text>
    <line x1="345" y1="48" x2="440" y2="70" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowDist)"/>
    <line x1="345" y1="83" x2="440" y2="83" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowDist)"/>
    <line x1="345" y1="118" x2="440" y2="96" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowDist)"/>
    <rect x="445" y="55" width="120" height="55" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="505" y="75" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Target Server</text>
    <text x="505" y="93" textAnchor="middle" fill="#94a3b8" fontSize="8">300 total users</text>
    <rect x="590" y="55" width="80" height="55" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="630" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Results</text>
    <text x="630" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7">.jtl file</text>
    <text x="630" y="102" textAnchor="middle" fill="#94a3b8" fontSize="7">aggregated</text>
  </svg>
)

const AnalysisReportingDiagram = () => (
  <svg viewBox="0 0 700 150" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="analysisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#b45309" stopOpacity="0.05"/>
      </linearGradient>
      <marker id="arrowAnalysis" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="140" rx="10" fill="url(#analysisGrad)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">Analysis &amp; Reporting Pipeline</text>
    <rect x="20" y="45" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#dc2626" strokeWidth="1.5"/>
    <text x="70" y="65" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">JTL Results</text>
    <text x="70" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">CSV / XML</text>
    <line x1="120" y1="70" x2="160" y2="70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAnalysis)"/>
    <rect x="165" y="38" width="140" height="65" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="235" y="58" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Dashboard</text>
    <text x="235" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Generator</text>
    <text x="235" y="88" textAnchor="middle" fill="#94a3b8" fontSize="7">jmeter -g -o</text>
    <text x="235" y="98" textAnchor="middle" fill="#94a3b8" fontSize="7">APDEX, percentiles</text>
    <line x1="305" y1="55" x2="345" y2="48" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowAnalysis)"/>
    <line x1="305" y1="70" x2="345" y2="78" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowAnalysis)"/>
    <line x1="305" y1="90" x2="345" y2="108" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowAnalysis)"/>
    <rect x="350" y="35" width="150" height="28" rx="4" fill="#374151" stroke="#22c55e" strokeWidth="1"/>
    <text x="425" y="53" textAnchor="middle" fill="#4ade80" fontSize="9">HTML Report</text>
    <rect x="350" y="68" width="150" height="28" rx="4" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="425" y="86" textAnchor="middle" fill="#60a5fa" fontSize="9">Grafana Dashboard</text>
    <rect x="350" y="101" width="150" height="28" rx="4" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="425" y="119" textAnchor="middle" fill="#a78bfa" fontSize="9">Backend Listener</text>
    <rect x="530" y="55" width="140" height="40" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="1.5"/>
    <text x="600" y="72" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="bold">InfluxDB + Grafana</text>
    <text x="600" y="86" textAnchor="middle" fill="#94a3b8" fontSize="7">Real-time visualization</text>
    <line x1="500" y1="82" x2="525" y2="75" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowAnalysis)"/>
  </svg>
)

const AdvancedTechniquesDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="advGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="170" rx="10" fill="url(#advGrad)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">Load Testing Tool Comparison</text>
    <rect x="20" y="38" width="80" height="20" rx="3" fill="#374151" stroke="#94a3b8" strokeWidth="1"/>
    <text x="60" y="52" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Tool</text>
    <rect x="105" y="38" width="85" height="20" rx="3" fill="#374151" stroke="#94a3b8" strokeWidth="1"/>
    <text x="147" y="52" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Language</text>
    <rect x="195" y="38" width="100" height="20" rx="3" fill="#374151" stroke="#94a3b8" strokeWidth="1"/>
    <text x="245" y="52" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Users/Machine</text>
    <rect x="300" y="38" width="120" height="20" rx="3" fill="#374151" stroke="#94a3b8" strokeWidth="1"/>
    <text x="360" y="52" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Key Strength</text>
    <rect x="425" y="38" width="245" height="20" rx="3" fill="#374151" stroke="#94a3b8" strokeWidth="1"/>
    <text x="547" y="52" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Best For</text>
    <rect x="20" y="62" width="80" height="22" rx="3" fill="#1e3a5f" stroke="#dc2626" strokeWidth="1.5"/>
    <text x="60" y="77" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">JMeter</text>
    <text x="147" y="77" textAnchor="middle" fill="#e2e8f0" fontSize="8">GUI / XML</text>
    <text x="245" y="77" textAnchor="middle" fill="#e2e8f0" fontSize="8">~500-1K</text>
    <text x="360" y="77" textAnchor="middle" fill="#e2e8f0" fontSize="8">Protocol breadth</text>
    <text x="547" y="77" textAnchor="middle" fill="#e2e8f0" fontSize="8">Enterprise, multi-protocol, non-dev teams</text>
    <rect x="20" y="88" width="80" height="22" rx="3" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="60" y="103" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Gatling</text>
    <text x="147" y="103" textAnchor="middle" fill="#e2e8f0" fontSize="8">Scala/Java</text>
    <text x="245" y="103" textAnchor="middle" fill="#e2e8f0" fontSize="8">~10K</text>
    <text x="360" y="103" textAnchor="middle" fill="#e2e8f0" fontSize="8">Async I/O</text>
    <text x="547" y="103" textAnchor="middle" fill="#e2e8f0" fontSize="8">Java/Scala teams, CI/CD integration</text>
    <rect x="20" y="114" width="80" height="22" rx="3" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="60" y="129" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">k6</text>
    <text x="147" y="129" textAnchor="middle" fill="#e2e8f0" fontSize="8">JavaScript</text>
    <text x="245" y="129" textAnchor="middle" fill="#e2e8f0" fontSize="8">~30K</text>
    <text x="360" y="129" textAnchor="middle" fill="#e2e8f0" fontSize="8">Developer UX</text>
    <text x="547" y="129" textAnchor="middle" fill="#e2e8f0" fontSize="8">Modern stack, Grafana users</text>
    <rect x="20" y="140" width="80" height="22" rx="3" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="60" y="155" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Locust</text>
    <text x="147" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="8">Python</text>
    <text x="245" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="8">~5K</text>
    <text x="360" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="8">Easy scripting</text>
    <text x="547" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="8">Python teams, complex scenarios</text>
  </svg>
)

const SyntaxHighlighter = ({ code }) => (
  <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.85rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace" }}>
    {code}
  </pre>
)

function JMeter({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'jmeter-fundamentals',
      name: 'JMeter Fundamentals',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Apache JMeter is an open-source load testing tool for analyzing and measuring performance of web applications, REST APIs, databases, and other services. It supports HTTP, HTTPS, JDBC, LDAP, JMS, SMTP, and FTP protocols. JMeter uses a thread-based model where each virtual user is a Java thread.',
      diagram: JMeterTestPlanDiagram,
      details: [
        {
          name: 'Test Plan Structure',
          explanation: 'A JMeter Test Plan is the root element containing all test components. It consists of Thread Groups (virtual users), Samplers (requests), Logic Controllers (flow control), Listeners (result collection), Config Elements (shared settings), Pre/Post Processors, Assertions, and Timers. Test plans are saved as .jmx files (XML format) and can be version-controlled.',
          codeExample: `<!-- JMeter Test Plan Structure (.jmx) -->
<!-- Test Plan Hierarchy:

Test Plan
├── Thread Group (virtual users)
│   ├── Config Elements (shared settings)
│   │   ├── HTTP Request Defaults
│   │   ├── CSV Data Set Config
│   │   └── HTTP Header Manager
│   ├── Pre Processors (run before each sampler)
│   │   └── JSR223 PreProcessor
│   ├── Samplers (actual requests)
│   │   ├── HTTP Request
│   │   ├── JDBC Request
│   │   └── JSR223 Sampler
│   ├── Post Processors (extract from response)
│   │   ├── JSON Extractor
│   │   ├── Regular Expression Extractor
│   │   └── JSR223 PostProcessor
│   ├── Assertions (validate response)
│   │   ├── Response Assertion
│   │   └── JSON Assertion
│   ├── Timers (pacing between requests)
│   │   ├── Constant Timer
│   │   ├── Gaussian Random Timer
│   │   └── Constant Throughput Timer
│   └── Logic Controllers (flow control)
│       ├── If Controller
│       ├── Loop Controller
│       └── Transaction Controller
└── Listeners (results)
    ├── View Results Tree (debug)
    ├── Summary Report
    └── Aggregate Report
-->

<!-- Key JMeter properties -->
<!-- jmeter.properties or user.properties -->
# HTTP connection settings
httpclient4.retrycount=0
hc.parameters.file=hc.parameters

# Result file format
jmeter.save.saveservice.output_format=csv
jmeter.save.saveservice.response_data.on_error=true`
        },
        {
          name: 'Thread Groups',
          explanation: 'Thread Groups define the number of virtual users, ramp-up period, and loop count. Each thread represents one virtual user executing the test plan independently. JMeter provides several Thread Group types: standard Thread Group, Stepping Thread Group (gradual ramp), Ultimate Thread Group (custom schedule), and Concurrency Thread Group (from plugins). The ramp-up period controls how quickly threads start.',
          codeExample: `<!-- Standard Thread Group Configuration -->
<!-- 100 users, 30s ramp-up, loop forever for 5 minutes -->

<!-- In JMeter GUI:
   Thread Group:
     Number of Threads (users): 100
     Ramp-Up Period (seconds): 30
     Loop Count: ∞ (Infinite)
     Duration (seconds): 300
     Startup delay (seconds): 0
-->

<!-- CLI equivalent for test execution -->
jmeter -n -t test-plan.jmx \\
  -Jthreads=100 \\
  -Jrampup=30 \\
  -Jduration=300

<!-- Using properties in Thread Group (parameterized) -->
<!-- Number of Threads: \${__P(threads,50)} -->
<!-- Ramp-Up: \${__P(rampup,10)} -->
<!-- Duration: \${__P(duration,120)} -->

<!-- === Thread Group Types === -->

<!-- 1. Standard Thread Group -->
<!-- All threads start within ramp-up, run N loops or for duration -->

<!-- 2. Stepping Thread Group (requires plugin) -->
<!-- Adds N threads every M seconds — better for finding breakpoint -->
<!-- Example: Add 10 users every 30 seconds up to 200 users -->

<!-- 3. Concurrency Thread Group (requires plugin) -->
<!-- Maintains target concurrency regardless of response time -->
<!-- Better model for "100 concurrent users" scenarios -->

<!-- 4. Ultimate Thread Group (requires plugin) -->
<!-- Custom schedule: start threads, hold, shutdown per row -->
<!-- Best for complex load profiles (spike, soak, stress) -->

<!-- === Load Profiles === -->
<!-- Spike Test: 0 → 500 users in 5 seconds -->
<!-- Soak Test: 50 users for 8 hours -->
<!-- Stress Test: 10 → 1000 users, 10/min increase -->
<!-- Breakpoint Test: increase until errors appear -->`
        },
        {
          name: 'HTTP Samplers',
          explanation: 'HTTP Request samplers send HTTP/HTTPS requests and capture responses. They support all HTTP methods (GET, POST, PUT, DELETE, PATCH), request bodies (form data, JSON, XML, multipart), file uploads, redirects, and cookies. HTTP Request Defaults can set shared properties like server, port, and protocol across all samplers in a Thread Group.',
          codeExample: `<!-- HTTP Request Defaults (shared across Thread Group) -->
<!-- Server: api.example.com -->
<!-- Port: 443 -->
<!-- Protocol: https -->
<!-- Content Encoding: UTF-8 -->

<!-- === GET Request === -->
<!-- HTTP Request:
  Method: GET
  Path: /api/users
  Parameters:
    page=1
    size=20
    sort=name,asc
-->

<!-- === POST Request with JSON body === -->
<!-- HTTP Request:
  Method: POST
  Path: /api/users
  Body Data:
  {
    "name": "\${username}",
    "email": "\${email}",
    "role": "USER"
  }
-->

<!-- HTTP Header Manager (set Content-Type) -->
<!-- Name: Content-Type    Value: application/json -->
<!-- Name: Authorization   Value: Bearer \${access_token} -->

<!-- === File Upload (multipart) === -->
<!-- HTTP Request:
  Method: POST
  Path: /api/upload
  Files Upload:
    File Path: /data/test-file.pdf
    Parameter Name: file
    MIME Type: application/pdf
-->

<!-- === Cookie Manager (auto-handles cookies) === -->
<!-- HTTP Cookie Manager:
  Clear cookies each iteration: true
  Cookie Policy: standard
  Implementation: HC4CookieHandler
-->

<!-- === Cache Manager (simulate browser caching) === -->
<!-- HTTP Cache Manager:
  Clear cache each iteration: true
  Use Cache-Control/Expires: true
  Max Number of elements: 5000
-->`
        },
        {
          name: 'Timers & Pacing',
          explanation: 'Timers add delays between requests to simulate realistic user think time. Without timers, JMeter fires requests as fast as possible (useful for stress testing, but not realistic). Constant Throughput Timer maintains a target requests/sec rate. Gaussian Random Timer adds natural variation. Precise Throughput Timer distributes requests evenly across threads.',
          codeExample: `<!-- === Timer Types === -->

<!-- 1. Constant Timer — fixed delay -->
<!-- Thread Delay: 1000 ms (1 second between requests) -->

<!-- 2. Gaussian Random Timer — realistic think time -->
<!-- Deviation: 500 ms -->
<!-- Constant Delay Offset: 2000 ms -->
<!-- Result: random delay between 1500-2500ms (bell curve) -->

<!-- 3. Uniform Random Timer — even distribution -->
<!-- Random Delay Maximum: 3000 ms -->
<!-- Constant Delay Offset: 1000 ms -->
<!-- Result: random delay between 1000-4000ms (flat distribution) -->

<!-- 4. Constant Throughput Timer — target RPS -->
<!-- Target throughput: 600 per minute (= 10 RPS) -->
<!-- Calculate based on: All active threads in current group -->
<!-- NOTE: This is per-MINUTE, not per-second! -->

<!-- 5. Precise Throughput Timer (recommended) -->
<!-- Target Throughput: 10.0 -->
<!-- Throughput Period: 1 (second) -->
<!-- Duration: 300 seconds -->
<!-- Better than Constant Throughput Timer: -->
<!--   - More accurate at low RPS -->
<!--   - Distributes requests evenly across threads -->

<!-- === Pacing Strategies === -->

<!-- Strategy 1: Think Time (between requests) -->
<!-- Add Gaussian Random Timer to each request -->
<!-- Simulates user reading/thinking between actions -->

<!-- Strategy 2: Transaction Pacing (between iterations) -->
<!-- Use Flow Control Action sampler at end of loop -->
<!-- Target: each user completes 1 transaction every 30 seconds -->

<!-- Strategy 3: Target RPS (throughput control) -->
<!-- Use Precise Throughput Timer at Thread Group level -->
<!-- Target: exactly 100 requests per second total -->
<!-- JMeter adjusts delays to maintain target -->`
        },
        {
          name: 'Running from CLI',
          explanation: 'For actual load testing, always run JMeter in non-GUI (CLI) mode. GUI mode consumes significant memory and CPU for rendering results, reducing the load generation capacity. CLI mode uses the -n flag and writes results to a .jtl file for later analysis. Use -l for results file, -e for generating HTML report after test, and -o for report output directory.',
          codeExample: `# === JMeter CLI Execution ===

# Basic non-GUI execution
jmeter -n -t test-plan.jmx -l results.jtl

# With HTML report generation
jmeter -n -t test-plan.jmx -l results.jtl -e -o report/

# With custom properties
jmeter -n -t test-plan.jmx \\
  -l results.jtl \\
  -Jthreads=200 \\
  -Jrampup=60 \\
  -Jduration=600 \\
  -Jserver=api.staging.example.com

# JVM tuning for large tests
export JVM_ARGS="-Xms2g -Xmx4g -XX:+UseG1GC"
jmeter -n -t test-plan.jmx -l results.jtl

# === Key CLI Flags ===
# -n    Non-GUI mode (required for load testing)
# -t    Test plan file (.jmx)
# -l    Results log file (.jtl)
# -e    Generate HTML report after test
# -o    HTML report output directory
# -j    JMeter log file
# -J    Define property (Jname=value)
# -G    Define global property (for distributed)
# -R    Remote servers list (for distributed testing)
# -H/-P Proxy host/port

# Generate report from existing results
jmeter -g results.jtl -o report/

# === JMeter Properties File ===
# jmeter.properties or user.properties
# Set globally instead of -J flags:
# threads=200
# rampup=60
# duration=600

# === Typical CI/CD Integration ===
# 1. Run JMeter in CI pipeline
# 2. Parse results.jtl for pass/fail criteria
# 3. Fail build if: error_rate > 1% OR p99 > 500ms`
        }
      ]
    },
    {
      id: 'data-driven',
      name: 'Data-Driven Testing',
      icon: '📊',
      color: '#22c55e',
      description: 'JMeter supports parameterized tests using CSV files, databases, random generators, and functions. Data-driven testing enables realistic load simulation by varying user credentials, search terms, product IDs, and other inputs across virtual users. This prevents cache-friendly identical requests that skew results.',
      diagram: DataDrivenDiagram,
      details: [
        {
          name: 'CSV Data Set Config',
          explanation: 'CSV Data Set Config reads data from CSV files and assigns values to JMeter variables for each thread/iteration. Each row is consumed by one iteration, and columns map to variable names. Configure sharing mode to control how threads consume data: "All threads" shares across all Thread Groups, "Current thread group" shares within the group, and "Current thread" gives each thread its own copy.',
          codeExample: `<!-- CSV Data Set Config -->
<!-- Filename: users.csv -->
<!-- Variable Names: username,password,email -->
<!-- Delimiter: , -->
<!-- Recycle on EOF: true -->
<!-- Stop thread on EOF: false -->
<!-- Sharing mode: All threads -->

<!-- users.csv content: -->
<!-- john,pass123,john@example.com -->
<!-- jane,pass456,jane@example.com -->
<!-- bob,pass789,bob@example.com -->

<!-- Using in HTTP Request: -->
<!-- POST /api/login -->
<!-- Body: {"username": "\${username}", "password": "\${password}"} -->

<!-- === Sharing Modes === -->
<!-- All threads: rows distributed round-robin to all threads -->
<!--   Thread 1 gets row 1, Thread 2 gets row 2, etc. -->
<!--   On next iteration, Thread 1 gets row 4, etc. -->

<!-- Current thread group: each thread group gets its own copy -->
<!--   Useful when different groups need different data -->

<!-- Current thread: each thread gets its own copy of the file -->
<!--   Thread 1 always starts at row 1 -->
<!--   Useful for session-specific data -->

<!-- === Multiple CSV files === -->
<!-- Use multiple CSV Data Set Config elements: -->
<!-- 1. users.csv → username, password -->
<!-- 2. products.csv → productId, productName -->
<!-- 3. addresses.csv → street, city, zip -->

<!-- === Large Data Sets === -->
<!-- For millions of rows, use Random CSV Data Set Config (plugin) -->
<!-- Or use __CSVRead() function for on-demand reading -->
<!-- \${__CSVRead(users.csv,0)} reads column 0 of next row -->`
        },
        {
          name: 'Extractors & Variables',
          explanation: 'Post Processors extract values from responses for use in subsequent requests (correlation). JSON Extractor uses JSONPath, Regular Expression Extractor uses regex, CSS Selector Extractor uses CSS selectors, and Boundary Extractor uses left/right boundaries. Extracted values are stored in JMeter variables accessible via ${variable_name} syntax. This is essential for dynamic values like session tokens, CSRF tokens, and created resource IDs.',
          codeExample: `<!-- === JSON Extractor === -->
<!-- Apply to: Main sample only -->
<!-- Variable names: userId -->
<!-- JSON Path expressions: $.data.id -->
<!-- Match No.: 1 (first match, 0=random, -1=all) -->
<!-- Default Values: NOT_FOUND -->

<!-- Response: {"data": {"id": 12345, "name": "John"}} -->
<!-- Result: \${userId} = 12345 -->

<!-- Extract array values -->
<!-- JSON Path: $.items[*].id -->
<!-- Match No.: -1 (all matches) -->
<!-- Result: \${userId_1}, \${userId_2}, ... \${userId_matchNr} -->

<!-- === Regular Expression Extractor === -->
<!-- Reference Name: csrfToken -->
<!-- Regular Expression: name="csrf_token" value="(.+?)" -->
<!-- Template: $1$ -->
<!-- Match No.: 1 -->

<!-- === Correlation Workflow (Dynamic Values) === -->
<!--
  Step 1: Login → POST /api/auth
    Response: {"token": "eyJhbG..."}
    JSON Extractor: $.token → access_token

  Step 2: Get User → GET /api/users/me
    Header: Authorization: Bearer \${access_token}
    Response: {"id": 42, "name": "John"}
    JSON Extractor: $.id → userId

  Step 3: Update User → PUT /api/users/\${userId}
    Header: Authorization: Bearer \${access_token}
    Body: {"name": "John Updated"}
-->

<!-- === JMeter Functions === -->
<!-- \${__Random(1,1000,)} — random number -->
<!-- \${__RandomString(10,abcdef123,)} — random string -->
<!-- \${__UUID()} — UUID v4 -->
<!-- \${__time(yyyy-MM-dd,)} — current date -->
<!-- \${__threadNum} — current thread number -->
<!-- \${__iterationNum} — current iteration -->`
        },
        {
          name: 'Assertions',
          explanation: 'Assertions validate that responses meet expected criteria. Failed assertions mark the sample as failed in results. Response Assertion checks status code, response body, or headers against patterns. JSON Assertion validates JSON structure. Duration Assertion fails requests that exceed a time threshold. Size Assertion checks response size. Always add assertions to detect functional errors during load tests.',
          codeExample: `<!-- === Response Assertion === -->
<!-- Apply to: Main sample only -->
<!-- Field to test: Response Code -->
<!-- Pattern Matching Rules: Equals -->
<!-- Patterns to Test: 200 -->

<!-- Response Body contains text -->
<!-- Field to test: Text Response -->
<!-- Pattern Matching Rules: Contains -->
<!-- Patterns to Test: "success":true -->

<!-- Response Body matches JSON -->
<!-- Field to test: Text Response -->
<!-- Pattern Matching Rules: Matches (regex) -->
<!-- Patterns to Test: .*"status":"(OK|CREATED)".* -->

<!-- === JSON Assertion === -->
<!-- JSON Path: $.data.items -->
<!-- Expected Value: (leave empty) -->
<!-- Additionally assert value: false -->
<!-- Expect null: false -->
<!-- → Just validates that $.data.items exists -->

<!-- JSON Path: $.data.total -->
<!-- Expected Value: 100 -->
<!-- Additionally assert value: true -->
<!-- → Validates $.data.total == 100 -->

<!-- === Duration Assertion === -->
<!-- Duration in milliseconds: 2000 -->
<!-- → Fails any request taking longer than 2 seconds -->
<!-- CRITICAL for SLA validation in load tests -->

<!-- === Size Assertion === -->
<!-- Response Size Field: Full Response -->
<!-- Size: 1048576 (1MB) -->
<!-- Comparison: {'<'} (less than) -->
<!-- → Fails if response exceeds 1MB -->

<!-- === JSR223 Assertion (custom logic) === -->
// Groovy script for complex validation
import groovy.json.JsonSlurper

def json = new JsonSlurper().parseText(prev.getResponseDataAsString())
if (json.data.items.size() < 1) {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage("Expected items but got empty array")
}`
        },
        {
          name: 'Logic Controllers',
          explanation: 'Logic Controllers determine the order and conditions under which samplers execute. Transaction Controller groups requests into a logical transaction for aggregate timing. If Controller enables conditional execution. Loop Controller repeats requests N times. ForEach Controller iterates over extracted array values. Random Controller picks random child samplers. These enable realistic user workflow simulation.',
          codeExample: `<!-- === Transaction Controller === -->
<!-- Groups requests into a "transaction" for aggregate timing -->
<!-- Name: Login Flow -->
<!-- Generate parent sample: true -->
<!--   Children: GET /login, POST /auth, GET /dashboard -->
<!--   Result: one "Login Flow" entry with total time -->

<!-- === If Controller === -->
<!-- Condition: \${__groovy(vars.get("userType") == "admin")} -->
<!--   Children: GET /admin/dashboard -->
<!-- → Only admin users access admin dashboard -->

<!-- === Loop Controller === -->
<!-- Loop Count: 5 -->
<!--   Children: POST /api/orders -->
<!-- → Each user creates 5 orders per iteration -->

<!-- === ForEach Controller === -->
<!-- Input variable prefix: productId -->
<!-- Output variable name: currentProductId -->
<!-- Start index: 1 -->
<!-- End index: (leave empty for all matches) -->
<!--   Children: GET /api/products/\${currentProductId} -->
<!-- → Iterates over all productId_1, productId_2, etc. -->

<!-- === While Controller === -->
<!-- Condition: \${__groovy(vars.get("status") != "COMPLETED")} -->
<!--   Children: GET /api/orders/\${orderId}/status -->
<!--             Constant Timer (2000ms) -->
<!-- → Polls until order completes -->

<!-- === Random Order Controller === -->
<!-- Randomizes execution order of children -->
<!-- Simulates users browsing different pages randomly -->

<!-- === Runtime Controller === -->
<!-- Runtime (seconds): 60 -->
<!-- → Execute children for 60 seconds regardless of loop count -->

<!-- === Complete User Journey Example -->
<!-- Thread Group (100 users, 60s ramp-up)
  ├── Transaction: Login
  │   ├── GET /login
  │   └── POST /auth (extract token)
  ├── Transaction: Browse
  │   ├── GET /products (extract productIds)
  │   └── ForEach productId:
  │       └── GET /products/\${currentProductId}
  ├── If: \${__Random(1,10,)} {'<'}= 3 (30% add to cart)
  │   ├── Transaction: Add to Cart
  │   │   └── POST /cart/items
  │   └── Transaction: Checkout
  │       ├── POST /orders
  │       └── GET /orders/\${orderId}
  └── Transaction: Logout
      └── POST /logout
-->`
        },
        {
          name: 'JDBC & Database Testing',
          explanation: 'JMeter can directly load test databases using JDBC Request samplers. Configure a JDBC Connection Configuration with the database URL, driver, and credentials. Then use JDBC Request samplers to execute SQL queries, stored procedures, or prepared statements. This is useful for testing database performance independently of the application layer.',
          codeExample: `<!-- === JDBC Connection Configuration === -->
<!-- Variable Name (pool): myDB -->
<!-- Database URL: jdbc:postgresql://localhost:5432/myapp -->
<!-- JDBC Driver: org.postgresql.Driver -->
<!-- Username: loadtest_user -->
<!-- Password: \${db_password} -->
<!-- Connection Pool:
     Max Connections: 10
     Max Wait (ms): 5000
     Auto Commit: true
-->

<!-- Place PostgreSQL JDBC driver in JMeter's lib/ directory -->
<!-- Download: https://jdbc.postgresql.org/ -->

<!-- === JDBC Request: Select === -->
<!-- Variable Name: myDB -->
<!-- Query Type: Select Statement -->
<!-- Query: SELECT id, name, email FROM users WHERE status = ? LIMIT 100 -->
<!-- Parameter values: ACTIVE -->
<!-- Parameter types: VARCHAR -->
<!-- Variable names: userId,userName,userEmail -->
<!-- Result variable name: queryResult -->

<!-- === JDBC Request: Insert === -->
<!-- Query Type: Update Statement -->
<!-- Query: INSERT INTO orders (user_id, product_id, quantity)
           VALUES (?, ?, ?) -->
<!-- Parameter values: \${userId},\${productId},\${__Random(1,10,)} -->
<!-- Parameter types: INTEGER,INTEGER,INTEGER -->

<!-- === JDBC Request: Stored Procedure === -->
<!-- Query Type: Callable Statement -->
<!-- Query: {call process_order(?, ?, ?)} -->
<!-- Parameter values: \${orderId},\${userId},OUT -->
<!-- Parameter types: INTEGER,INTEGER,VARCHAR -->
<!-- OUT direction for last parameter -->

<!-- === JDBC Request: Prepared Statement === -->
<!-- Query Type: Prepared Select Statement -->
<!-- Query: SELECT * FROM products
           WHERE category = ? AND price BETWEEN ? AND ?
           ORDER BY popularity DESC LIMIT ? -->
<!-- Parameter values: \${category},\${minPrice},\${maxPrice},20 -->
<!-- Parameter types: VARCHAR,DECIMAL,DECIMAL,INTEGER -->

<!-- === Database Performance Testing Tips === -->
<!-- 1. Use connection pooling (not new connection per request) -->
<!-- 2. Test with realistic data volumes -->
<!-- 3. Monitor DB metrics alongside JMeter results -->
<!-- 4. Use CSV Data Set for varied query parameters -->
<!-- 5. Add Duration Assertion for query SLA validation -->`
        }
      ]
    },
    {
      id: 'distributed-testing',
      name: 'Distributed Testing',
      icon: '🌐',
      color: '#8b5cf6',
      description: 'JMeter supports distributed testing where a controller node coordinates multiple worker nodes to generate higher load. This overcomes single-machine limitations (CPU, memory, network). Workers execute the test plan independently and report results back to the controller. Typical setup: 1 controller + N workers, each worker generating portion of total load.',
      diagram: DistributedTestingDiagram,
      details: [
        {
          name: 'Controller-Worker Setup',
          explanation: 'In distributed mode, the controller sends the test plan to all workers, which execute independently and stream results back. The controller aggregates results. Workers must have JMeter installed and the jmeter-server process running. The controller connects to workers via RMI (Remote Method Invocation). All machines must be on the same network or have proper firewall rules.',
          codeExample: `# === Distributed JMeter Architecture ===
# Controller (orchestrator) → sends test plan to workers
# Workers (load generators) → execute tests, return results

# === Worker Setup (on each worker machine) ===
# 1. Install JMeter (same version as controller)
# 2. Start JMeter server process
cd /opt/jmeter/bin
./jmeter-server

# Or specify RMI host explicitly (required if multiple NICs)
./jmeter-server -Djava.rmi.server.hostname=192.168.1.101

# === Controller Configuration ===
# jmeter.properties or user.properties:
# remote_hosts=192.168.1.101,192.168.1.102,192.168.1.103

# === Run Distributed Test ===
# Start test on all remote workers
jmeter -n -t test-plan.jmx -l results.jtl -R 192.168.1.101,192.168.1.102,192.168.1.103

# Or use -r to use remote_hosts from properties
jmeter -n -t test-plan.jmx -l results.jtl -r

# === Port Configuration ===
# Default RMI port: 1099
# jmeter.properties:
# server.rmi.port=1099
# server.rmi.localport=4000
# client.rmi.localport=4001

# === SSL for RMI (recommended) ===
# Generate keystore on each machine:
keytool -genkey -keyalg RSA -alias rmi \\
  -keystore rmi_keystore.jks \\
  -storepass changeit -keypass changeit \\
  -validity 365 -keysize 2048

# jmeter.properties:
# server.rmi.ssl.keystore.file=rmi_keystore.jks
# server.rmi.ssl.keystore.password=changeit

# === Load Distribution ===
# 500 total users across 5 workers:
# Set Thread Group to 100 users
# Each worker runs 100 users = 500 total
# Ramp-up applies per worker (30s = all workers ramp independently)`
        },
        {
          name: 'Docker & Kubernetes',
          explanation: 'Running JMeter in containers enables elastic scaling of load generators. Docker images package JMeter with required plugins and configurations. Kubernetes Jobs or Deployments can spin up N worker pods on demand. The controller can run locally or in-cluster. Container-based distributed testing integrates naturally with CI/CD pipelines and cloud infrastructure.',
          codeExample: `# === Dockerfile for JMeter Worker ===
FROM eclipse-temurin:21-jre

ARG JMETER_VERSION=5.6.3
RUN apt-get update && apt-get install -y wget unzip && \\
    wget https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-\${JMETER_VERSION}.tgz && \\
    tar -xzf apache-jmeter-\${JMETER_VERSION}.tgz -C /opt && \\
    ln -s /opt/apache-jmeter-\${JMETER_VERSION} /opt/jmeter && \\
    rm apache-jmeter-\${JMETER_VERSION}.tgz

# Install plugins
COPY plugins/ /opt/jmeter/lib/ext/
COPY test-data/ /data/

ENV PATH="/opt/jmeter/bin:\${PATH}"
ENV JVM_ARGS="-Xms1g -Xmx2g"

EXPOSE 1099 4000
CMD ["jmeter-server"]

# === Docker Compose (local distributed) ===
# docker-compose.yml
# services:
#   jmeter-worker-1:
#     build: .
#     ports: ["1099"]
#   jmeter-worker-2:
#     build: .
#     ports: ["1099"]
#   jmeter-worker-3:
#     build: .
#     ports: ["1099"]

# === Kubernetes Job for Load Test ===
# apiVersion: batch/v1
# kind: Job
# metadata:
#   name: jmeter-workers
# spec:
#   parallelism: 5        # 5 worker pods
#   completions: 5
#   template:
#     spec:
#       containers:
#       - name: jmeter
#         image: myregistry/jmeter:5.6.3
#         resources:
#           requests:
#             cpu: "2"
#             memory: "4Gi"
#           limits:
#             cpu: "4"
#             memory: "8Gi"
#         volumeMounts:
#         - name: test-plan
#           mountPath: /test
#         - name: results
#           mountPath: /results
#       volumes:
#       - name: test-plan
#         configMap:
#           name: jmeter-test-plan
#       - name: results
#         persistentVolumeClaim:
#           claimName: jmeter-results`
        },
        {
          name: 'Plugins & Extensions',
          explanation: 'JMeter Plugins Manager provides essential extensions: Custom Thread Groups (Stepping, Ultimate, Concurrency), Throughput Shaping Timer, PerfMon Server Agent (system metrics), Flexible File Writer, and additional graph types. Install via the Plugins Manager JAR or CLI. Key plugins for production load testing include jpgc-casutg (custom thread groups) and jpgc-perfmon (server monitoring).',
          codeExample: `# === Install JMeter Plugins Manager ===
# Download plugins-manager.jar to lib/ext/
wget -P /opt/jmeter/lib/ext/ \\
  https://jmeter-plugins.org/get/

# Install plugins via CLI
./PluginsManagerCMD.sh install \\
  jpgc-casutg,\\       # Custom Thread Groups
  jpgc-perfmon,\\      # Server Performance Monitoring
  jpgc-tst,\\          # Throughput Shaping Timer
  jpgc-graphs-basic,\\ # Basic Graphs
  jpgc-graphs-additional  # Additional Graphs

# === Key Plugins ===

# 1. Custom Thread Groups (jpgc-casutg)
#    - Concurrency Thread Group: maintain target concurrency
#    - Stepping Thread Group: gradual ramp with steps
#    - Ultimate Thread Group: complex load profiles

# 2. Throughput Shaping Timer
#    Define exact RPS schedule:
#    Time 0-60s:   ramp from 0 to 100 RPS
#    Time 60-300s: hold at 100 RPS
#    Time 300-360s: ramp to 500 RPS
#    Time 360-600s: hold at 500 RPS

# 3. PerfMon Server Agent
#    Monitor target server CPU, Memory, Disk, Network
#    Run agent on target: ./startAgent.sh
#    Add PerfMon Collector listener in JMeter
#    Correlate server metrics with response times

# 4. Flexible File Writer
#    Custom result output format
#    Write specific fields to CSV/XML

# 5. Dummy Sampler
#    Test plan logic without real requests
#    Returns configurable response codes and data

# === Groovy Scripting (JSR223) ===
# Always use Groovy (not BeanShell) for performance
# JSR223 Sampler, Pre/Post Processor, Assertion
# Access: vars, props, prev, ctx, log, SampleResult`
        },
        {
          name: 'CI/CD Integration',
          explanation: 'JMeter integrates with CI/CD pipelines (Jenkins, GitLab CI, GitHub Actions) for automated performance testing. Run tests in non-GUI mode, capture results in JTL format, generate HTML reports, and apply pass/fail criteria based on response time percentiles and error rates. Use the Performance Plugin for Jenkins or custom scripts for other CI systems.',
          codeExample: `# === GitHub Actions Workflow ===
# .github/workflows/performance-test.yml
# name: Performance Test
# on:
#   push:
#     branches: [main]
# jobs:
#   load-test:
#     runs-on: ubuntu-latest
#     steps:
#     - uses: actions/checkout@v4
#     - name: Run JMeter
#       run: |
#         wget -q https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-5.6.3.tgz
#         tar -xzf apache-jmeter-5.6.3.tgz
#         apache-jmeter-5.6.3/bin/jmeter -n \\
#           -t tests/load-test.jmx \\
#           -l results.jtl \\
#           -e -o report/ \\
#           -Jthreads=50 -Jduration=120
#     - name: Check Results
#       run: python scripts/check-performance.py results.jtl
#     - uses: actions/upload-artifact@v4
#       with:
#         name: jmeter-report
#         path: report/

# === Performance Gate Script (check-performance.py) ===
import csv, sys

thresholds = {
    'error_rate_max': 1.0,        # Max 1% error rate
    'p99_latency_max_ms': 500,    # Max 500ms P99
    'avg_latency_max_ms': 200,    # Max 200ms average
    'throughput_min_rps': 50      # Min 50 requests/sec
}

with open(sys.argv[1]) as f:
    reader = csv.DictReader(f)
    results = list(reader)

total = len(results)
errors = sum(1 for r in results if r['success'] == 'false')
latencies = sorted([int(r['elapsed']) for r in results])

error_rate = (errors / total) * 100
p99 = latencies[int(total * 0.99)]
avg = sum(latencies) / total

print(f"Error Rate: {error_rate:.2f}%")
print(f"P99 Latency: {p99}ms")
print(f"Avg Latency: {avg:.0f}ms")

if error_rate > thresholds['error_rate_max']:
    print(f"FAIL: Error rate {error_rate:.2f}% exceeds {thresholds['error_rate_max']}%")
    sys.exit(1)
if p99 > thresholds['p99_latency_max_ms']:
    print(f"FAIL: P99 {p99}ms exceeds {thresholds['p99_latency_max_ms']}ms")
    sys.exit(1)
print("PASS: All performance thresholds met")`
        },
        {
          name: 'Cloud Load Testing',
          explanation: 'Cloud-based load testing uses cloud VMs or managed services to generate load from multiple geographic regions. BlazeMeter, OctoPerf, and Azure Load Testing natively support JMeter test plans. For self-managed cloud testing, use Terraform or cloud CLI to provision VMs, deploy JMeter workers, run tests, and tear down infrastructure automatically.',
          codeExample: `# === AWS-based Distributed JMeter ===

# 1. Provision EC2 instances with Terraform
# resource "aws_instance" "jmeter_worker" {
#   count         = 5
#   ami           = "ami-xxxxx"  # Ubuntu with JMeter pre-installed
#   instance_type = "c5.2xlarge" # 8 vCPU, 16 GB RAM
#   key_name      = "jmeter-key"
#   tags = {
#     Name = "jmeter-worker-\${count.index}"
#   }
# }

# 2. Deploy test plan to all workers
for host in \${WORKER_IPS}; do
  scp test-plan.jmx test-data/ \${host}:/opt/jmeter/
done

# 3. Start JMeter server on all workers
for host in \${WORKER_IPS}; do
  ssh \${host} "/opt/jmeter/bin/jmeter-server &"
done

# 4. Run distributed test from controller
jmeter -n -t test-plan.jmx \\
  -l results.jtl \\
  -R \${WORKER_IPS} \\
  -Jthreads=200 \\
  -Jduration=600

# 5. Collect results and generate report
jmeter -g results.jtl -o report/

# 6. Tear down infrastructure
terraform destroy -auto-approve

# === Sizing Guide ===
# Per worker machine:
#   HTTP tests: ~500-1000 threads per vCPU core
#   HTTPS tests: ~200-500 threads per vCPU core
#   JDBC tests: ~100-200 threads per vCPU core
#
# Example: 5000 virtual users over HTTPS
#   = 5000 / 300 threads per core ≈ 17 cores needed
#   = 3 x c5.2xlarge (8 cores each = 24 cores)
#
# Monitor worker CPU: keep below 80%
# If CPU > 80%, add more workers (don't increase threads)

# === Geographic Distribution ===
# Deploy workers in multiple regions:
#   us-east-1: 3 workers (East Coast users)
#   eu-west-1: 2 workers (European users)
#   ap-southeast-1: 1 worker (APAC users)
# Simulates realistic global traffic patterns`
        }
      ]
    },
    {
      id: 'analysis-reporting',
      name: 'Analysis & Reporting',
      icon: '📈',
      color: '#f59e0b',
      description: 'JMeter generates detailed test results in JTL (CSV/XML) format. The built-in HTML report dashboard provides response time charts, throughput graphs, error analysis, and percentile distributions. Listeners like Aggregate Report and Summary Report provide real-time metrics during test execution. Results can also be fed to Grafana via InfluxDB for live dashboards.',
      diagram: AnalysisReportingDiagram,
      details: [
        {
          name: 'HTML Dashboard Report',
          explanation: 'JMeter\'s HTML Dashboard Report generates a comprehensive static HTML report from JTL results. It includes: APDEX score, response time percentiles (P50, P90, P95, P99), throughput over time, response time over time, error percentage, top errors by type, and per-request statistics. Generate it using the -e -o flags during test execution or post-test with -g flag.',
          codeExample: `# Generate HTML report during test
jmeter -n -t test.jmx -l results.jtl -e -o report/

# Generate HTML report from existing results
jmeter -g results.jtl -o report/

# === HTML Report Sections ===
# 1. Dashboard
#    - APDEX (Application Performance Index): 0.0-1.0
#    - Total requests, error %, throughput
#    - Response time summary (min, max, avg, P50, P90, P95, P99)

# 2. Charts
#    - Response Times Over Time
#    - Response Time Percentiles Over Time
#    - Active Threads Over Time
#    - Bytes Throughput Over Time
#    - Transactions Per Second
#    - Response Codes Per Second
#    - Latency Over Time

# 3. Statistics Table
#    Per-request breakdown:
#    - Samples count
#    - Error %
#    - Average, Min, Max, P50, P90, P95, P99
#    - Throughput (req/sec)
#    - Received/Sent KB/sec

# === Customize Report ===
# reportgenerator.properties:
# jmeter.reportgenerator.apdex_satisfied_threshold=500
# jmeter.reportgenerator.apdex_tolerated_threshold=1500
# jmeter.reportgenerator.overall_granularity=10000
# jmeter.reportgenerator.graph.responseTimeOverTime.exclude_controllers=true

# === Result File Configuration ===
# For best reports, ensure these in jmeter.properties:
# jmeter.save.saveservice.output_format=csv
# jmeter.save.saveservice.data_type=true
# jmeter.save.saveservice.label=true
# jmeter.save.saveservice.response_code=true
# jmeter.save.saveservice.response_message=true
# jmeter.save.saveservice.successful=true
# jmeter.save.saveservice.thread_name=true
# jmeter.save.saveservice.time=true
# jmeter.save.saveservice.timestamp_format=ms
# jmeter.save.saveservice.bytes=true
# jmeter.save.saveservice.connect_time=true`
        },
        {
          name: 'Real-time with Grafana',
          explanation: 'For real-time visualization during load tests, JMeter can stream results to InfluxDB via the Backend Listener. Grafana dashboards then query InfluxDB to display live response times, throughput, error rates, and thread counts. This setup enables monitoring load tests as they run and correlating with server metrics (CPU, memory) from Prometheus/node_exporter.',
          codeExample: `<!-- === Backend Listener Configuration === -->
<!-- Backend Listener Implementation:
     org.apache.jmeter.visualizers.backend.influxdb.InfluxdbBackendListenerClient
-->
<!-- influxdbUrl: http://influxdb:8086/write?db=jmeter -->
<!-- application: my-api-load-test -->
<!-- measurement: jmeter -->
<!-- summaryOnly: false -->
<!-- samplersRegex: .* -->
<!-- percentiles: 50;90;95;99 -->
<!-- testTitle: Load Test - v2.1.0 -->

<!-- === InfluxDB Setup === -->
<!-- docker-compose.yml:
  influxdb:
    image: influxdb:1.8
    ports: ["8086:8086"]
    environment:
      INFLUXDB_DB: jmeter
      INFLUXDB_HTTP_AUTH_ENABLED: "false"

  grafana:
    image: grafana/grafana:latest
    ports: ["3000:3000"]
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
-->

<!-- === Grafana Dashboard Panels === -->
<!--
Panel 1: Response Time (P50, P90, P99)
  Query: SELECT percentile("elapsed", 99) FROM "jmeter"
         WHERE time > now() - 5m GROUP BY time(10s)

Panel 2: Throughput (req/sec)
  Query: SELECT count("elapsed") FROM "jmeter"
         WHERE time > now() - 5m GROUP BY time(10s)

Panel 3: Error Rate
  Query: SELECT 100 * count("elapsed") FROM "jmeter"
         WHERE "success" = 'false' GROUP BY time(10s)
       / SELECT count("elapsed") FROM "jmeter"
         GROUP BY time(10s)

Panel 4: Active Threads
  Query: SELECT last("allThreads") FROM "jmeter"
         WHERE time > now() - 5m GROUP BY time(10s)

Panel 5: Response Time Distribution (Histogram)
  Query: SELECT "elapsed" FROM "jmeter"
         WHERE time > now() - 5m
-->

<!-- Import pre-built dashboard: Grafana Dashboard ID 5496 -->`
        },
        {
          name: 'Key Metrics & SLAs',
          explanation: 'Performance test results should be evaluated against predefined SLAs (Service Level Agreements). Key metrics include: throughput (requests/sec), response time percentiles (P50, P90, P95, P99), error rate (%), and APDEX score. Understanding the relationship between concurrency, throughput, and response time (Little\'s Law) is essential for capacity planning and interview discussions.',
          codeExample: `// === Key Performance Metrics ===

// 1. Response Time Percentiles
//    P50 (median): typical user experience
//    P90: 90% of requests faster than this
//    P95: standard SLA threshold
//    P99: tail latency (most affected users)
//    Max: absolute worst case (often outlier)
//
//    Rule: P99 matters more than average!
//    Average = 100ms but P99 = 5000ms means 1% get terrible experience

// 2. Throughput
//    Requests per second (RPS) / Transactions per second (TPS)
//    Should plateau or increase during ramp-up
//    Decreasing throughput = system saturated

// 3. Error Rate
//    Total errors / Total requests × 100
//    Types: HTTP 4xx (client), HTTP 5xx (server), timeouts
//    SLA typically: < 0.1% for critical paths

// 4. APDEX Score (Application Performance Index)
//    Formula: (Satisfied + Tolerating/2) / Total
//    Satisfied: response < T (e.g., 500ms)
//    Tolerating: response < 4T (e.g., 2000ms)
//    Frustrated: response >= 4T
//    Score: 0.0 (worst) to 1.0 (perfect)
//    Target: > 0.85

// === Little's Law ===
// L = λ × W
// L = concurrent users in system
// λ = arrival rate (throughput)
// W = average response time
//
// Example: 100 RPS × 0.2s avg response = 20 concurrent connections
// To support 1000 concurrent users at 200ms response:
//   λ = L / W = 1000 / 0.2 = 5000 RPS needed

// === SLA Template ===
// Metric           | Target    | Critical
// P50 Response     | < 200ms   | < 500ms
// P99 Response     | < 1000ms  | < 3000ms
// Error Rate       | < 0.1%    | < 1.0%
// Throughput       | > 500 RPS | > 200 RPS
// APDEX            | > 0.9     | > 0.7`
        },
        {
          name: 'Bottleneck Identification',
          explanation: 'Identifying performance bottlenecks requires correlating JMeter results with server-side metrics. Common bottlenecks: CPU saturation (flat throughput, increasing response time), memory pressure (GC pauses), database contention (slow queries), network bandwidth, thread pool exhaustion, and connection pool limits. The response time breakdown (connect time vs. processing time vs. first byte) reveals where time is spent.',
          codeExample: `// === Bottleneck Identification Patterns ===

// Pattern 1: CPU Bottleneck
// Symptoms in JMeter:
//   - Throughput plateaus as users increase
//   - Response time increases linearly
//   - No errors (just slow)
// Server metrics: CPU > 80%, low I/O wait
// Fix: Scale horizontally, optimize hot code paths

// Pattern 2: Memory/GC Bottleneck
// Symptoms in JMeter:
//   - Periodic latency spikes (every N seconds)
//   - Throughput drops during spikes
//   - Some timeouts during long GC pauses
// Server metrics: High GC frequency, heap near max
// Fix: Increase heap, tune GC, reduce allocations

// Pattern 3: Database Bottleneck
// Symptoms in JMeter:
//   - Response time increases with more users
//   - Some requests timeout
//   - Connect time is low, server time is high
// Server metrics: DB CPU high, slow query log growing
// Fix: Add indexes, optimize queries, read replicas

// Pattern 4: Connection Pool Exhaustion
// Symptoms in JMeter:
//   - Sudden jump in response time at specific user count
//   - Connect time increases dramatically
//   - Errors: "Connection pool exhausted"
// Server metrics: All pool connections active, threads waiting
// Fix: Increase pool size, reduce connection hold time

// Pattern 5: Thread Pool Exhaustion
// Symptoms in JMeter:
//   - Request queuing (increasing latency)
//   - Rejections (HTTP 503)
//   - Throughput drops
// Server metrics: All threads active, queue filling
// Fix: Increase thread pool, async processing

// === Diagnostic Approach ===
// 1. Run baseline test (low load) → record metrics
// 2. Gradually increase load → find inflection point
// 3. At inflection point, check:
//    a. Server CPU, Memory, Disk I/O, Network
//    b. Database metrics (connections, queries, locks)
//    c. JMeter connect time vs server processing time
//    d. Error types and when they start appearing
// 4. The first metric to hit its limit IS the bottleneck`
        },
        {
          name: 'Test Types & Strategies',
          explanation: 'Different test types answer different questions: Load test verifies expected production traffic, Stress test finds the breaking point, Soak test detects memory leaks over time, Spike test validates auto-scaling, and Breakpoint test determines maximum capacity. Each requires different Thread Group configuration and duration. Know which test to recommend in interviews.',
          codeExample: `// === Performance Test Types ===

// 1. LOAD TEST — "Can we handle expected traffic?"
//    Users: expected peak (e.g., 500 concurrent)
//    Duration: 30-60 minutes
//    Ramp-up: gradual (5-10 minutes)
//    Goal: verify SLAs at expected load
//    Thread Group: 500 users, 600s ramp-up, 3600s duration

// 2. STRESS TEST — "What's our breaking point?"
//    Users: beyond expected (2x-5x normal)
//    Duration: until failure
//    Ramp-up: continuous increase (stepping)
//    Goal: find capacity limits and failure modes
//    Thread Group: Stepping — add 50 users every 2 min up to 2000

// 3. SOAK TEST (Endurance) — "Any memory leaks?"
//    Users: moderate sustained load (50-70% capacity)
//    Duration: 4-24 hours
//    Ramp-up: quick
//    Goal: detect memory leaks, resource exhaustion, log growth
//    Thread Group: 200 users for 8 hours

// 4. SPIKE TEST — "Can we handle sudden traffic?"
//    Users: sudden burst (0 → peak → 0)
//    Duration: short bursts with recovery periods
//    Ramp-up: near-instant
//    Goal: validate auto-scaling, circuit breakers
//    Thread Group: Ultimate — 0→1000 in 5s, hold 60s, drop to 0

// 5. BREAKPOINT TEST — "What's our max capacity?"
//    Users: continuously increasing
//    Duration: until error rate exceeds threshold
//    Goal: determine maximum throughput & user capacity
//    Thread Group: Stepping — add 10 users/30s until 3% error rate

// === Test Execution Order (recommended) ===
// 1. Smoke test (5-10 users, 2 min) → verify test works
// 2. Load test (expected users, 30 min) → verify SLAs
// 3. Stress test (2x users, until failure) → find limits
// 4. Soak test (70% capacity, 8+ hours) → find leaks
// 5. Spike test (sudden bursts) → validate resilience`
        }
      ]
    },
    {
      id: 'advanced-jmeter',
      name: 'Advanced Techniques',
      icon: '🔧',
      color: '#ef4444',
      description: 'Advanced JMeter techniques include Groovy scripting for complex logic, correlation for dynamic applications, WebSocket and gRPC testing, API testing patterns, and comparison with modern alternatives like Gatling and k6. These topics frequently appear in senior-level performance engineering interviews.',
      diagram: AdvancedTechniquesDiagram,
      details: [
        {
          name: 'Groovy Scripting',
          explanation: 'JSR223 elements with Groovy are the recommended way to add custom logic in JMeter. Groovy compiles to bytecode (unlike BeanShell which interprets), making it 10-100x faster. Use Groovy for request signing, custom assertions, data transformation, conditional logic, and dynamic request generation. Access JMeter context via vars, props, prev, ctx, and log objects.',
          codeExample: `// === JSR223 PreProcessor — Sign API Request ===
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import java.util.Base64

def apiKey = vars.get("apiKey")
def secret = vars.get("apiSecret")
def timestamp = System.currentTimeMillis().toString()
def body = vars.get("requestBody") ?: ""

// Create HMAC-SHA256 signature
def message = timestamp + body
def mac = Mac.getInstance("HmacSHA256")
mac.init(new SecretKeySpec(secret.getBytes(), "HmacSHA256"))
def signature = Base64.getEncoder().encodeToString(mac.doFinal(message.getBytes()))

vars.put("timestamp", timestamp)
vars.put("signature", signature)

// === JSR223 PostProcessor — Complex Extraction ===
import groovy.json.JsonSlurper

def response = prev.getResponseDataAsString()
def json = new JsonSlurper().parseText(response)

// Extract and transform data
def activeUsers = json.data.users.findAll { it.status == "ACTIVE" }
vars.put("activeUserCount", activeUsers.size().toString())

// Store as CSV for later use
activeUsers.eachWithIndex { user, i ->
    vars.put("activeUser_\${i+1}", user.id.toString())
}
vars.put("activeUser_matchNr", activeUsers.size().toString())

// === JSR223 Sampler — Custom Request ===
import org.apache.http.client.methods.*
import org.apache.http.impl.client.*
import org.apache.http.entity.StringEntity

def client = HttpClients.createDefault()
def post = new HttpPost("https://api.example.com/batch")
post.setHeader("Content-Type", "application/json")
post.setEntity(new StringEntity('{"ids": [1,2,3]}'))

def response = client.execute(post)
def statusCode = response.getStatusLine().getStatusCode()

SampleResult.setResponseCode(statusCode.toString())
SampleResult.setResponseData(
    org.apache.http.util.EntityUtils.toString(response.getEntity()), "UTF-8")
SampleResult.setSuccessful(statusCode == 200)`
        },
        {
          name: 'WebSocket Testing',
          explanation: 'JMeter can test WebSocket applications using the WebSocket Samplers plugin (by Peter Doornbosch). It supports opening connections, sending/receiving text and binary frames, and validating responses. This is essential for testing real-time applications like chat, trading platforms, and live dashboards. Configure connection timeout, read timeout, and message patterns.',
          codeExample: `<!-- === WebSocket Testing with JMeter === -->
<!-- Install: WebSocket Samplers by Peter Doornbosch plugin -->

<!-- Step 1: Open WebSocket Connection -->
<!-- WebSocket Open Connection:
  Server: ws.example.com
  Port: 443
  Protocol: wss
  Path: /ws/chat
  Connect Timeout: 5000
  Read Timeout: 10000
-->

<!-- Step 2: Send Text Frame -->
<!-- WebSocket Single Write Sampler:
  Connection: use existing
  Data: {"type":"subscribe","channel":"trades"}
-->

<!-- Step 3: Read Response Frame -->
<!-- WebSocket Single Read Sampler:
  Connection: use existing
  Read Timeout: 5000
  Optional: Regex for expected message
-->

<!-- Step 4: Send and Receive (request-response) -->
<!-- WebSocket request-response Sampler:
  Data: {"type":"ping"}
  Read Timeout: 5000
  Response (regex): .*pong.*
-->

<!-- Step 5: Close Connection -->
<!-- WebSocket Close:
  Close Status: 1000 (Normal Closure)
-->

<!-- === Full WebSocket Chat Test Plan ===
Thread Group (50 users)
├── WebSocket Open Connection (ws://chat.example.com/ws)
├── WebSocket Write: {"action":"join","room":"general"}
├── WebSocket Read (wait for join confirmation)
├── Loop Controller (10 iterations)
│   ├── WebSocket Write: {"action":"message","text":"Hello \${__UUID()}"}
│   ├── WebSocket Read (wait for broadcast)
│   └── Gaussian Random Timer (1000-3000ms)
├── WebSocket Write: {"action":"leave"}
└── WebSocket Close
-->

<!-- === Extracting from WebSocket Responses ===
  Use JSON Extractor on WebSocket Read responses
  Same as HTTP — extract values for subsequent messages
-->`
        },
        {
          name: 'Correlation Patterns',
          explanation: 'Correlation handles dynamic values (session IDs, CSRF tokens, timestamps) that change with every request. Record a script, identify dynamic values by comparing two recordings, then add extractors to capture and reuse them. Common correlation targets: authentication tokens, anti-forgery tokens, dynamic URLs, and server-generated IDs. This is the most time-consuming part of JMeter scripting.',
          codeExample: `<!-- === Correlation Workflow === -->

<!-- Step 1: Record baseline script (Recording Template) -->
<!-- Step 2: Run twice, diff responses → find dynamic values -->
<!-- Step 3: Add extractors for each dynamic value -->

<!-- === Example: Full Auth Correlation === -->

<!-- Request 1: GET /login (extract CSRF token) -->
<!-- Regex Extractor:
  Reference Name: csrf_token
  Regular Expression: name="csrf_token" value="(.+?)"
  Template: $1$
  Match No.: 1
-->

<!-- Request 2: POST /login (use CSRF, extract session) -->
<!-- Body: username=\${user}&password=\${pass}&csrf=\${csrf_token} -->
<!-- Response Header Extractor:
  Reference Name: session_cookie
  Regular Expression: Set-Cookie: JSESSIONID=(.+?);
  Template: $1$
-->
<!-- Or use HTTP Cookie Manager (auto-handles cookies) -->

<!-- Request 3: POST /api/orders (extract order ID) -->
<!-- JSON Extractor:
  Variable: orderId
  JSON Path: $.data.orderId
-->

<!-- Request 4: GET /api/orders/\${orderId}/status -->
<!-- Uses extracted orderId -->

<!-- === Auto-Correlation (Recording Template) === -->
<!-- JMeter's HTTP(S) Test Script Recorder can auto-detect: -->
<!-- 1. Add regex extractors for detected dynamic values -->
<!-- 2. Replace hardcoded values with variable references -->
<!-- Configure in: Test Script Recorder → Correlation Rules -->

<!-- === Handling OAuth 2.0 Flows === -->
<!-- 1. POST /oauth/token → extract access_token, refresh_token
     JSON Extractor: $.access_token → access_token
     JSON Extractor: $.expires_in → expires_in
-->
<!-- 2. All API requests: Authorization: Bearer \${access_token} -->
<!-- 3. Token refresh (If Controller):
     Condition: \${__groovy(
       System.currentTimeMillis() > Long.parseLong(vars.get("tokenExpiry"))
     )}
     → POST /oauth/token with refresh_token
     → Update access_token variable
-->`
        },
        {
          name: 'JMeter vs Alternatives',
          explanation: 'JMeter competes with Gatling (Scala DSL, better resource usage), k6 (JavaScript, developer-friendly), Locust (Python), and wrk/hey (simple HTTP benchmarks). JMeter\'s strengths are its GUI for non-developers, protocol support breadth, and plugin ecosystem. Its weaknesses are memory overhead per thread and verbose XML test plans. Know the trade-offs for interview discussions.',
          codeExample: `// === Performance Testing Tool Comparison ===

// JMeter
// + GUI for test creation and debugging
// + Widest protocol support (HTTP, JDBC, LDAP, JMS, FTP)
// + Huge plugin ecosystem
// + Good for non-developers (GUI-driven)
// + Strong distributed testing support
// - Thread-per-user model (high memory)
// - ~500 threads per GB RAM
// - Verbose XML test plans (.jmx)
// - Harder to version control

// Gatling (gatling.io)
// + Code-as-test (Scala/Java DSL)
// + Better resource usage (async I/O, actor model)
// + ~10,000 users per machine
// + Git-friendly source code
// + Beautiful HTML reports
// - Steeper learning curve (Scala)
// - HTTP/WebSocket only (no JDBC, JMS)
// - Fewer plugins

// k6 (k6.io, by Grafana Labs)
// + JavaScript test scripts (developer-friendly)
// + Written in Go (very efficient)
// + ~30,000 users per machine
// + Great Grafana integration
// + Modern CLI experience
// - HTTP/WebSocket/gRPC only
// - No GUI
// - Extensions via Go (not JS plugins)

// Locust (locust.io)
// + Python scripts (easy to learn)
// + Distributed by default
// + Good for complex scenarios
// - Lower throughput than k6/Gatling
// - Python GIL limitations

// === When to Use What ===
// JMeter: Enterprise, multi-protocol, non-dev teams
// Gatling: Java/Scala teams, CI/CD integration
// k6: Developer-led testing, modern stack, Grafana users
// Locust: Python teams, complex logic
// wrk/hey: Quick HTTP benchmarks, smoke tests`
        },
        {
          name: 'Interview Scenarios',
          explanation: 'Common performance testing interview questions cover test planning, result analysis, tool selection, and bottleneck diagnosis. Be prepared to design a load test for a given scenario, interpret results, identify bottlenecks, and recommend optimizations. Knowing JMeter specifics (Thread Groups, Timers, Assertions) plus general performance concepts (Little\'s Law, percentiles, saturation) is key.',
          codeExample: `// === Interview Question Examples ===

// Q: "Design a load test for an e-commerce checkout flow."
// A: 1. Test plan with Transaction Controller per step:
//       Browse (60%) → Add to Cart (30%) → Checkout (10%)
//    2. CSV data: user accounts, product IDs, payment methods
//    3. Timers: Gaussian 2-5s between page views
//    4. Thread Group: Stepping — 0 to 500 users, +50/min
//    5. Assertions: 200 status, response < 2s, valid JSON
//    6. Metrics: P99 < 3s, error rate < 0.1%, throughput > 100 TPS

// Q: "Load test shows P50=100ms but P99=5000ms. What's wrong?"
// A: Large gap between P50 and P99 indicates:
//    - GC pauses (check JFR for jdk.GarbageCollection)
//    - Database lock contention (some queries wait on locks)
//    - Thread pool saturation (requests queue at peak)
//    - External service timeouts (downstream dependency)
//    Steps: check error types, correlate with server metrics,
//    look at response time distribution (bimodal?)

// Q: "How many JMeter threads do you need for 10,000 RPS?"
// A: Depends on response time (Little's Law):
//    If avg response = 100ms: threads = 10000 × 0.1 = 1000
//    If avg response = 500ms: threads = 10000 × 0.5 = 5000
//    Plus think time: if 2s think time, each thread does
//    1/(0.1+2) = 0.47 RPS, so need 10000/0.47 ≈ 21,300 threads
//    → Distributed: 5 machines × ~4000 threads each

// Q: "JMeter vs Gatling — when would you choose each?"
// A: JMeter: multi-protocol (JDBC, JMS), GUI for team adoption,
//    existing .jmx test plans, plugin needs (PerfMon, Custom)
//    Gatling: CI/CD-first, code review of tests, higher load
//    per machine, Java/Scala team, better reports out of box

// Q: "Your soak test shows throughput slowly decreasing over 4 hours."
// A: Classic memory leak or resource exhaustion pattern:
//    1. Check heap growth (JFR/GC logs) → memory leak
//    2. Check DB connection pool → connection leak
//    3. Check thread count → thread leak
//    4. Check file descriptors → handle leak
//    5. Check log file size → disk filling up`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedConceptIndex !== null) {
        setSelectedConceptIndex(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1a0f0f, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <Breadcrumb
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          section={breadcrumb?.section}
          category={breadcrumb?.category}
          topic={breadcrumb?.topic || 'Apache JMeter'}
          colors={breadcrumb?.colors || JMETER_COLORS}
        />

        <CollapsibleSidebar
          items={concepts}
          selectedIndex={selectedConceptIndex}
          onSelect={(index) => { setSelectedConceptIndex(index); setSelectedDetailIndex(0) }}
          title="Topics"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={JMETER_COLORS.primary}
        />

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          {onPrevious ? (
            <button onClick={onPrevious} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(220, 38, 38, 0.2)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '0.5rem', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>
              ← {previousName || 'Previous'}
            </button>
          ) : <div />}
          {onNext ? (
            <button onClick={onNext} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(220, 38, 38, 0.2)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '0.5rem', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>
              {nextName || 'Next'} →
            </button>
          ) : <div />}
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#dc2626' }}>Apache JMeter</h1>
        <p style={{ fontSize: '1.1rem', color: '#d1d5db', marginBottom: '2rem', lineHeight: '1.6' }}>
          Open-source load testing tool for performance analysis of web applications, REST APIs, databases, and distributed systems.
        </p>

        {/* Concept Cards Grid */}
        {selectedConceptIndex === null && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {concepts.map((concept, index) => (
              <button
                key={concept.id}
                onClick={() => { setSelectedConceptIndex(index); setSelectedDetailIndex(0) }}
                style={{
                  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${concept.color}40`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'left',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = concept.color
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 10px 30px ${concept.color}20`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${concept.color}40`
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '2rem' }}>{concept.icon}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: concept.color }}>{concept.name}</h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: '1.6' }}>{concept.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.75rem' }}>
                  {concept.details.map((d, i) => (
                    <span key={i} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: `${concept.color}15`, border: `1px solid ${concept.color}30`, borderRadius: '0.25rem', color: concept.color }}>{d.name}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Concept Detail View */}
        {selectedConcept && (
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '0.75rem', border: `2px solid ${selectedConcept.color}40`, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{selectedConcept.icon}</span>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: selectedConcept.color }}>{selectedConcept.name}</h2>
              </div>
              <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button key={i} onClick={() => setSelectedDetailIndex(i)} style={{ padding: '0.5rem 1rem', background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)', border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`, borderRadius: '0.5rem', color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedDetailIndex === i ? '600' : '400', transition: 'all 0.2s' }}>{detail.name}</button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = selectedConcept.diagram
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  {DiagramComponent && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  {detail.codeExample && (
                    <div style={{ marginTop: '1rem' }}>
                      <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: '600' }}>Code Example</h4>
                      <div style={{
                        background: '#1e1e1e',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        border: '1px solid #333',
                        overflow: 'auto',
                        maxHeight: '400px'
                      }}>
                        <SyntaxHighlighter code={detail.codeExample} />
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

export default JMeter

import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

const DYNATRACE_COLORS = {
  primary: '#6f2da8',
  primaryHover: '#8b5cf6',
  bg: 'rgba(111, 45, 168, 0.1)',
  border: 'rgba(111, 45, 168, 0.3)',
  arrow: '#6f2da8',
  hoverBg: 'rgba(111, 45, 168, 0.2)',
  topicBg: 'rgba(111, 45, 168, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

const OneAgentArchDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="dtArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6f2da8" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowDtArch" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#dtArchGrad)" stroke="#6f2da8" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">Dynatrace Architecture</text>
    <rect x="20" y="40" width="170" height="95" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="105" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Host + OneAgent</text>
    <rect x="30" y="65" width="70" height="22" rx="3" fill="#374151" stroke="#22c55e" strokeWidth="1"/>
    <text x="65" y="80" textAnchor="middle" fill="#4ade80" fontSize="7">Process 1</text>
    <rect x="110" y="65" width="70" height="22" rx="3" fill="#374151" stroke="#22c55e" strokeWidth="1"/>
    <text x="145" y="80" textAnchor="middle" fill="#4ade80" fontSize="7">Process 2</text>
    <rect x="30" y="93" width="70" height="22" rx="3" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="65" y="108" textAnchor="middle" fill="#fbbf24" fontSize="7">Service A</text>
    <rect x="110" y="93" width="70" height="22" rx="3" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="145" y="108" textAnchor="middle" fill="#fbbf24" fontSize="7">Service B</text>
    <text x="105" y="130" textAnchor="middle" fill="#94a3b8" fontSize="7">Auto-discovered</text>
    <line x1="190" y1="85" x2="240" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowDtArch)"/>
    <rect x="245" y="55" width="140" height="60" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="315" y="77" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">ActiveGate</text>
    <text x="315" y="93" textAnchor="middle" fill="#94a3b8" fontSize="8">Data routing</text>
    <text x="315" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">API endpoint</text>
    <line x1="385" y1="85" x2="435" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowDtArch)"/>
    <rect x="440" y="40" width="230" height="95" rx="6" fill="#1e3a5f" stroke="#6f2da8" strokeWidth="2"/>
    <text x="555" y="60" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">Dynatrace Cluster</text>
    <text x="555" y="77" textAnchor="middle" fill="#94a3b8" fontSize="8">(SaaS or Managed)</text>
    <rect x="455" y="87" width="60" height="20" rx="3" fill="#374151" stroke="#ef4444" strokeWidth="1"/>
    <text x="485" y="101" textAnchor="middle" fill="#f87171" fontSize="7">Davis AI</text>
    <rect x="525" y="87" width="60" height="20" rx="3" fill="#374151" stroke="#22c55e" strokeWidth="1"/>
    <text x="555" y="101" textAnchor="middle" fill="#4ade80" fontSize="7">Smartscape</text>
    <rect x="595" y="87" width="60" height="20" rx="3" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="625" y="101" textAnchor="middle" fill="#fbbf24" fontSize="7">Grail</text>
    <text x="555" y="128" textAnchor="middle" fill="#94a3b8" fontSize="7">Metrics, Traces, Logs, Events</text>
  </svg>
)

const DavisAIDiagram = () => (
  <svg viewBox="0 0 700 170" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="davisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#15803d" stopOpacity="0.05"/>
      </linearGradient>
      <marker id="arrowDavis" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#22c55e"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="160" rx="10" fill="url(#davisGrad)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">Davis AI — Root Cause Analysis</text>
    <rect x="20" y="40" width="100" height="30" rx="4" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="70" y="59" textAnchor="middle" fill="#60a5fa" fontSize="9">Metrics</text>
    <rect x="20" y="75" width="100" height="30" rx="4" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="70" y="94" textAnchor="middle" fill="#a78bfa" fontSize="9">Topology</text>
    <rect x="20" y="110" width="100" height="30" rx="4" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="70" y="129" textAnchor="middle" fill="#fbbf24" fontSize="9">Traces</text>
    <line x1="120" y1="55" x2="175" y2="80" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrowDavis)"/>
    <line x1="120" y1="90" x2="175" y2="90" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrowDavis)"/>
    <line x1="120" y1="125" x2="175" y2="100" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrowDavis)"/>
    <rect x="180" y="55" width="150" height="70" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="2"/>
    <text x="255" y="78" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Davis AI</text>
    <text x="255" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">Anomaly Detection</text>
    <text x="255" y="110" textAnchor="middle" fill="#94a3b8" fontSize="8">Causal Correlation</text>
    <line x1="330" y1="90" x2="370" y2="90" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowDavis)"/>
    <rect x="375" y="50" width="160" height="80" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="455" y="72" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Problem Card</text>
    <text x="455" y="88" textAnchor="middle" fill="#94a3b8" fontSize="8">Root cause identified</text>
    <text x="455" y="102" textAnchor="middle" fill="#94a3b8" fontSize="8">Affected entities listed</text>
    <text x="455" y="116" textAnchor="middle" fill="#94a3b8" fontSize="8">ONE problem, not N alerts</text>
    <line x1="535" y1="75" x2="570" y2="60" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowDavis)"/>
    <line x1="535" y1="105" x2="570" y2="110" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowDavis)"/>
    <rect x="575" y="45" width="95" height="28" rx="4" fill="#374151" stroke="#f97316" strokeWidth="1"/>
    <text x="622" y="63" textAnchor="middle" fill="#fb923c" fontSize="8">Notifications</text>
    <rect x="575" y="98" width="95" height="28" rx="4" fill="#374151" stroke="#06b6d4" strokeWidth="1"/>
    <text x="622" y="116" textAnchor="middle" fill="#22d3ee" fontSize="8">Workflows</text>
    <text x="622" y="148" textAnchor="middle" fill="#94a3b8" fontSize="8">Auto-remediation</text>
  </svg>
)

const PurePathDiagram = () => (
  <svg viewBox="0 0 700 170" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="ppGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#b45309" stopOpacity="0.05"/>
      </linearGradient>
      <marker id="arrowPP" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="160" rx="10" fill="url(#ppGrad)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">PurePath — End-to-End Distributed Trace</text>
    <rect x="20" y="40" width="100" height="45" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="70" y="58" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Browser</text>
    <text x="70" y="73" textAnchor="middle" fill="#94a3b8" fontSize="7">12ms</text>
    <line x1="120" y1="62" x2="155" y2="62" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowPP)"/>
    <rect x="160" y="40" width="120" height="45" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="220" y="58" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Service A</text>
    <text x="220" y="73" textAnchor="middle" fill="#94a3b8" fontSize="7">180ms</text>
    <line x1="280" y1="62" x2="315" y2="62" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowPP)"/>
    <rect x="320" y="40" width="120" height="45" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="380" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Service B</text>
    <text x="380" y="73" textAnchor="middle" fill="#94a3b8" fontSize="7">95ms</text>
    <line x1="440" y1="62" x2="475" y2="62" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowPP)"/>
    <rect x="480" y="40" width="120" height="45" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="540" y="58" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Database</text>
    <text x="540" y="73" textAnchor="middle" fill="#94a3b8" fontSize="7">15ms</text>
    <rect x="20" y="100" width="580" height="18" rx="3" fill="#374151" stroke="#94a3b8" strokeWidth="0.5"/>
    <rect x="20" y="100" width="40" height="18" rx="3" fill="#3b82f680"/>
    <rect x="60" y="100" width="290" height="18" rx="3" fill="#22c55e80"/>
    <rect x="350" y="100" width="150" height="18" rx="3" fill="#8b5cf680"/>
    <rect x="500" y="100" width="100" height="18" rx="3" fill="#ef444480"/>
    <text x="310" y="114" textAnchor="middle" fill="#e2e8f0" fontSize="8">Timing waterfall — total: 302ms</text>
    <rect x="620" y="40" width="55" height="78" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="1.5"/>
    <text x="647" y="60" textAnchor="middle" fill="#22d3ee" fontSize="7" fontWeight="bold">100%</text>
    <text x="647" y="73" textAnchor="middle" fill="#22d3ee" fontSize="7">capture</text>
    <text x="647" y="86" textAnchor="middle" fill="#94a3b8" fontSize="6">No</text>
    <text x="647" y="96" textAnchor="middle" fill="#94a3b8" fontSize="6">sampling</text>
    <text x="350" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Auto-instrumented: Java, .NET, Node.js, Go, Python — no code changes</text>
  </svg>
)

const SLODiagram = () => (
  <svg viewBox="0 0 700 150" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="sloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.05"/>
      </linearGradient>
      <marker id="arrowSlo" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="140" rx="10" fill="url(#sloGrad)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">SLO Lifecycle — From Metric to Action</text>
    <rect x="20" y="45" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="70" y="65" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">SLI Metric</text>
    <text x="70" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">success rate</text>
    <line x1="120" y1="70" x2="150" y2="70" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowSlo)"/>
    <rect x="155" y="45" width="105" height="50" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="207" y="63" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">SLO Target</text>
    <text x="207" y="80" textAnchor="middle" fill="#4ade80" fontSize="9">99.9%</text>
    <line x1="260" y1="70" x2="290" y2="70" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowSlo)"/>
    <rect x="295" y="45" width="115" height="50" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="352" y="63" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Error Budget</text>
    <text x="352" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">0.1% = 43 min/mo</text>
    <line x1="410" y1="70" x2="440" y2="70" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowSlo)"/>
    <rect x="445" y="45" width="110" height="50" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="500" y="63" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Burn Rate</text>
    <text x="500" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">Alert at 10x</text>
    <line x1="555" y1="70" x2="585" y2="70" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowSlo)"/>
    <rect x="590" y="45" width="80" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="630" y="65" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Action</text>
    <text x="630" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">page / ticket</text>
    <text x="350" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Multi-window burn rate alerts: 14.4x/1h (page), 6x/6h (ticket), 3x/3d (dashboard)</text>
  </svg>
)

const WorkflowAutomationDiagram = () => (
  <svg viewBox="0 0 700 170" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="wfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowWf" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#06b6d4"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="160" rx="10" fill="url(#wfGrad)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">Self-Healing Automation Loop</text>
    <rect x="20" y="50" width="110" height="50" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="75" y="70" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Davis Problem</text>
    <text x="75" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7">CPU saturation</text>
    <line x1="130" y1="75" x2="165" y2="75" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowWf)"/>
    <rect x="170" y="50" width="95" height="50" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="217" y="70" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Trigger</text>
    <text x="217" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7">auto or manual</text>
    <line x1="265" y1="75" x2="300" y2="75" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowWf)"/>
    <rect x="305" y="38" width="180" height="75" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="395" y="55" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Workflow Steps</text>
    <rect x="315" y="63" width="160" height="18" rx="3" fill="#374151" stroke="#22c55e" strokeWidth="1"/>
    <text x="395" y="76" textAnchor="middle" fill="#4ade80" fontSize="8">1. Remediate (scale pods)</text>
    <rect x="315" y="84" width="160" height="18" rx="3" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="395" y="97" textAnchor="middle" fill="#60a5fa" fontSize="8">2. Validate (check CPU)</text>
    <line x1="485" y1="75" x2="520" y2="75" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowWf)"/>
    <rect x="525" y="50" width="140" height="50" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="2"/>
    <text x="595" y="68" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Self-Healing</text>
    <text x="595" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">Close problem</text>
    <path d="M595,100 L595,140 L75,140 L75,100" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrowWf)"/>
    <text x="350" y="137" textAnchor="middle" fill="#94a3b8" fontSize="8">Feedback loop — learn from remediation outcomes</text>
  </svg>
)

const SyntaxHighlighter = ({ code }) => (
  <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.85rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace" }}>
    {code}
  </pre>
)

function Dynatrace({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'oneagent-architecture',
      name: 'OneAgent & Architecture',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Dynatrace OneAgent is a single agent that auto-discovers and instruments all processes, services, and infrastructure. It uses code-level injection (bytecode for Java, CLR for .NET) for deep visibility without code changes. OneAgent reports to Dynatrace Cluster (SaaS or Managed) via ActiveGate for data routing and API access.',
      diagram: OneAgentArchDiagram,
      details: [
        {
          name: 'OneAgent Deployment',
          explanation: 'OneAgent installs as a single binary per host that auto-discovers all processes, services, containers, and cloud infrastructure. It uses OS-level hooks for infrastructure metrics and bytecode injection (Java, .NET, Node.js, PHP, Go) for code-level tracing. OneAgent detects technology stacks automatically — no manual configuration. In Kubernetes, deploy as a DaemonSet for full cluster coverage.',
          codeExample: `# === OneAgent Installation ===

# Linux — download and run installer
wget -O Dynatrace-OneAgent.sh \\
  "https://{your-env}.live.dynatrace.com/api/v1/deployment/installer/agent/unix/default/latest?Api-Token={token}"
chmod +x Dynatrace-OneAgent.sh
sudo ./Dynatrace-OneAgent.sh --set-app-log-content-access=true

# === Kubernetes Deployment (Dynatrace Operator) ===
# Install Dynatrace Operator via Helm
helm repo add dynatrace https://raw.githubusercontent.com/Dynatrace/dynatrace-operator/main/config/helm/repos/stable
helm install dynatrace-operator dynatrace/dynatrace-operator \\
  --namespace dynatrace --create-namespace

# DynKube custom resource — full-stack monitoring
# apiVersion: dynatrace.com/v1beta2
# kind: DynKube
# metadata:
#   name: dynakube
#   namespace: dynatrace
# spec:
#   apiUrl: https://{env-id}.live.dynatrace.com/api
#   tokens: dynakube      # Secret with apiToken + paasToken
#   oneAgent:
#     cloudNativeFullStack:  # Full K8s + container + code-level
#       resources:
#         requests:
#           cpu: 100m
#           memory: 256Mi
#   activeGate:
#     capabilities:
#       - routing
#       - kubernetes-monitoring

# === Docker Container Monitoring ===
# OneAgent on host auto-detects containers
# Or inject via environment variable:
docker run -e LD_PRELOAD=/opt/dynatrace/oneagent/agent/lib64/liboneagentproc.so \\
  -e DT_TENANT={tenant-id} \\
  -e DT_TENANTTOKEN={token} \\
  myapp:latest

# === Technology Support ===
# Auto-instrumented: Java, .NET, Node.js, PHP, Go, Python
# Infrastructure: Linux, Windows, VMware, AWS, Azure, GCP
# Containers: Docker, Kubernetes, OpenShift, ECS, EKS, AKS, GKE
# Databases: Oracle, SQL Server, PostgreSQL, MySQL, MongoDB
# Messaging: Kafka, RabbitMQ, ActiveMQ, IBM MQ`
        },
        {
          name: 'Smartscape Topology',
          explanation: 'Smartscape is Dynatrace\'s real-time dependency map that auto-discovers all entities (hosts, processes, services, applications) and their relationships. It shows vertical dependencies (app → service → process → host) and horizontal dependencies (service-to-service calls). Smartscape enables impact analysis — if a host goes down, you can instantly see which services and users are affected.',
          codeExample: `// === Smartscape Entity Model ===

// Vertical Stack (top to bottom):
// Application → Service → Process Group → Host
//
// Application: "MyWebApp" (browser-side, detected via RUM)
//   ↓ calls
// Service: "OrderService" (server-side, auto-detected)
//   ↓ runs on
// Process Group: "java -jar order-service.jar" (all instances)
//   ↓ runs on
// Host: "ip-10-0-1-42" (EC2 instance)

// Horizontal Dependencies (service-to-service):
// OrderService → PaymentService → BankGateway
// OrderService → InventoryService → PostgreSQL
// OrderService → NotificationService → Kafka → EmailWorker

// === Smartscape API ===
// GET /api/v2/entities?entitySelector=type("SERVICE")
// Response:
// {
//   "entities": [
//     {
//       "entityId": "SERVICE-A1B2C3D4E5F6",
//       "displayName": "OrderService",
//       "properties": {
//         "serviceType": "WEB_SERVICE",
//         "softwareTechnologies": [
//           {"type": "JAVA", "version": "21.0.1"}
//         ]
//       },
//       "fromRelationships": {
//         "calls": ["SERVICE-X7Y8Z9..."]  // services this calls
//       },
//       "toRelationships": {
//         "calledBy": ["SERVICE-P1Q2R3..."]  // called by these
//       }
//     }
//   ]
// }

// === Impact Analysis ===
// If host "ip-10-0-1-42" has CPU saturation:
// Smartscape shows: Host → 3 Process Groups → 5 Services → 2 Apps
// Impact: OrderService, PaymentService affected
// Users affected: ~2,400 (from RUM data)
// Automatic root cause: "CPU saturation on ip-10-0-1-42"`
        },
        {
          name: 'ActiveGate',
          explanation: 'ActiveGate is a proxy/router between OneAgents and Dynatrace Cluster. It handles data routing, API endpoint access, remote plugin execution, and monitoring of cloud platforms (AWS, Azure, GCP). Environment ActiveGate runs in your network for data routing. Cluster ActiveGate (Managed only) handles cluster communication. ActiveGate enables monitoring of network-restricted environments.',
          codeExample: `# === ActiveGate Roles ===

# 1. Environment ActiveGate — data routing
#    - Routes OneAgent data to Dynatrace Cluster
#    - Required when OneAgents can't reach internet directly
#    - Provides local API endpoint for integrations
#    - Executes remote plugins (custom extensions)

# 2. Cluster ActiveGate (Managed only)
#    - Internal cluster communication
#    - Handles multi-node Managed deployments

# === ActiveGate Installation ===
wget -O ActiveGate.sh \\
  "https://{env}.live.dynatrace.com/api/v1/deployment/installer/gateway/unix/latest?Api-Token={token}"
chmod +x ActiveGate.sh
sudo ./ActiveGate.sh

# === ActiveGate Capabilities ===
# Configure in Dynatrace UI → Deployment → ActiveGates

# Cloud monitoring (pull metrics from cloud APIs):
#   - AWS CloudWatch metrics
#   - Azure Monitor metrics
#   - GCP Monitoring metrics

# Extension execution:
#   - Custom JMX extensions
#   - SNMP monitoring
#   - WMI (Windows) monitoring
#   - StatsD/Telegraf ingest

# Synthetic monitoring:
#   - Private synthetic location
#   - Run browser monitors behind firewall

# === Kubernetes ActiveGate ===
# Deployed as part of DynKube with capabilities:
#   routing: data routing for OneAgents
#   kubernetes-monitoring: K8s API metrics
#   dynatrace-api: local API endpoint

# === Network Configuration ===
# OneAgent → ActiveGate: port 9999 (configurable)
# ActiveGate → Dynatrace Cluster: port 443 (HTTPS)
# Only ActiveGate needs internet access`
        },
        {
          name: 'Grail Data Lakehouse',
          explanation: 'Grail is Dynatrace\'s data lakehouse that stores all observability data (metrics, logs, traces, events, business data) in a unified platform. It replaces the previous separate storage for metrics, logs, and traces. Grail uses DQL (Dynatrace Query Language) for querying and supports massive scale with automatic data tiering. Data is retained based on configurable policies.',
          codeExample: `// === Grail Architecture ===
// All data flows into one lakehouse:
// Metrics + Logs + Traces + Events + Business Data
//
// Benefits over separate stores:
// - Correlate logs with traces with metrics in one query
// - No data silos between observability pillars
// - Unified retention policies
// - Single query language (DQL) for everything

// === DQL (Dynatrace Query Language) ===

// Query logs
fetch logs
| filter loglevel == "ERROR"
| filter dt.entity.service == "SERVICE-A1B2C3"
| sort timestamp desc
| limit 100

// Query metrics
fetch dt.metrics("builtin:service.response.time")
| filter dt.entity.service == "SERVICE-A1B2C3"
| fields timestamp, avg, min, max, percentile(95)

// Query spans (distributed traces)
fetch spans
| filter service.name == "OrderService"
| filter duration > 5000000000  // > 5 seconds (nanoseconds)
| sort duration desc
| limit 20

// Join logs with traces
fetch logs
| filter trace_id != ""
| lookup [fetch spans | filter span.kind == "SERVER"], sourceField:trace_id, lookupField:trace_id
| fields timestamp, content, lookup.service.name, lookup.duration

// Business analytics
fetch bizevents
| filter event.type == "com.myapp.order.completed"
| summarize totalRevenue = sum(order.amount),
            orderCount = count(),
            avgOrderValue = avg(order.amount)
            by bin(timestamp, 1h)

// === Data Retention ===
// Default retention:
//   Metrics: 10 years (aggregated)
//   Logs: 35 days
//   Traces: 10 days
//   Events: 35 days
//   Business events: 35 days
// Configurable per data type in Settings → Data retention`
        },
        {
          name: 'Dynatrace API',
          explanation: 'Dynatrace provides extensive REST APIs for automation: Environment API v2 (entities, metrics, logs, problems), Configuration API (settings, alerting profiles), and Account Management API. APIs are authenticated with API tokens scoped to specific permissions. The API is essential for CI/CD integration, custom dashboards, and automating Dynatrace configuration as code.',
          codeExample: `# === Dynatrace API Authentication ===
# Create API token in: Settings → Integration → Dynatrace API
# Scopes: Read entities, Read metrics, Read logs, etc.

# Base URL: https://{env-id}.live.dynatrace.com/api/v2

# === Get all services ===
curl -X GET "https://{env}.live.dynatrace.com/api/v2/entities?entitySelector=type(SERVICE)" \\
  -H "Authorization: Api-Token {token}"

# === Query metrics ===
curl -X GET "https://{env}.live.dynatrace.com/api/v2/metrics/query?\\
metricSelector=builtin:service.response.time:percentile(95)&\\
entitySelector=type(SERVICE),entityName(OrderService)&\\
from=now-1h" \\
  -H "Authorization: Api-Token {token}"

# === Get active problems ===
curl -X GET "https://{env}.live.dynatrace.com/api/v2/problems?\\
problemSelector=status(OPEN)" \\
  -H "Authorization: Api-Token {token}"

# === Push custom metrics (Metric Ingest) ===
curl -X POST "https://{env}.live.dynatrace.com/api/v2/metrics/ingest" \\
  -H "Authorization: Api-Token {token}" \\
  -H "Content-Type: text/plain" \\
  -d 'custom.orders.processed,env=prod,region=us-east 42'

# === Push custom events ===
curl -X POST "https://{env}.live.dynatrace.com/api/v2/events/ingest" \\
  -H "Authorization: Api-Token {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "eventType": "CUSTOM_DEPLOYMENT",
    "title": "Deployed v2.1.0",
    "entitySelector": "type(SERVICE),entityName(OrderService)",
    "properties": {
      "version": "2.1.0",
      "deployer": "jenkins",
      "commit": "abc1234"
    }
  }'

# === Configuration as Code (Monaco) ===
# Dynatrace Monaco CLI for managing config as code
# monaco deploy -e environments.yaml -p my-project/
# Manages: dashboards, alerting, SLOs, management zones`
        }
      ]
    },
    {
      id: 'davis-ai',
      name: 'Davis AI Engine',
      icon: '🤖',
      color: '#22c55e',
      description: 'Davis is Dynatrace\'s AI engine that provides automatic root cause analysis, anomaly detection, and problem correlation. It uses topology-aware analysis (Smartscape) to understand entity relationships and determine causality. Davis detects anomalies in real-time using adaptive baselining — no manual threshold configuration needed.',
      diagram: DavisAIDiagram,
      details: [
        {
          name: 'Anomaly Detection',
          explanation: 'Davis automatically learns normal behavior patterns for every entity (response time, error rate, throughput, CPU, memory) and detects deviations without manual thresholds. It uses adaptive baselining that accounts for hourly, daily, and weekly patterns. Anomalies are classified as: response time degradation, error rate increase, throughput drop, or infrastructure issue. Sensitivity is auto-tuned but can be adjusted per service.',
          codeExample: `// === How Davis Anomaly Detection Works ===

// 1. BASELINE LEARNING (automatic)
//    Davis observes metrics for each entity over time:
//    - Response time: normal = 50-80ms (weekday), 30-50ms (weekend)
//    - Error rate: normal = 0.01-0.05%
//    - Throughput: normal = 500-800 req/s (peak), 100-200 req/s (night)
//    Baselines are per-entity and time-of-day aware

// 2. ANOMALY DETECTION
//    Davis compares current metrics against learned baselines
//    Types of anomalies:
//    - Response time degradation (P50 or P90 above baseline)
//    - Error rate increase (above baseline + absolute threshold)
//    - Throughput drop (unexpected decrease)
//    - Infrastructure (CPU, memory, disk above threshold)

// 3. SENSITIVITY CONFIGURATION
//    Settings → Anomaly Detection → Services
//    Per-service overrides:
//    - Response time: Auto (default), Fixed threshold, Off
//    - Error rate: Auto, Fixed, Off
//    - Throughput: Auto, Fixed, Off

// === Anomaly Detection API ===
// Get anomaly detection settings for a service
// GET /api/config/v1/anomalyDetection/services/{serviceId}
// Response:
// {
//   "responseTimeDegradation": {
//     "detectionMode": "DETECT_AUTOMATICALLY",
//     "automaticDetection": {
//       "responseTimeDegradationMilliseconds": 100,
//       "responseTimeDegradationPercent": 50,
//       "slowestResponseTimeDegradationMilliseconds": 1000
//     }
//   },
//   "failureRateIncrease": {
//     "detectionMode": "DETECT_AUTOMATICALLY",
//     "automaticDetection": {
//       "failingServiceCallPercentageIncreaseAbsolute": 0
//     }
//   }
// }`
        },
        {
          name: 'Root Cause Analysis',
          explanation: 'When Davis detects anomalies across multiple entities, it correlates them using Smartscape topology to determine the root cause. Instead of firing separate alerts for every affected component, Davis opens ONE problem with the root cause identified. For example: if a database is slow, causing 5 services to degrade and 2 applications to have errors, Davis identifies the database as the root cause and groups everything into a single problem.',
          codeExample: `// === Davis Root Cause Analysis Flow ===

// Step 1: Multiple anomalies detected simultaneously
// - OrderService: response time 500ms → 3000ms
// - PaymentService: response time 200ms → 2500ms
// - InventoryService: response time 100ms → 2000ms
// - WebApp: error rate 0.01% → 5%
// - PostgreSQL process: CPU 90%

// Step 2: Davis consults Smartscape topology
// WebApp → OrderService → PostgreSQL
// WebApp → PaymentService → PostgreSQL
// WebApp → InventoryService → PostgreSQL
// (All three services depend on the same database)

// Step 3: Davis identifies root cause
// ROOT CAUSE: PostgreSQL CPU saturation
// IMPACT: 3 services degraded, 1 application affected
// Result: ONE problem opened, not 5 separate alerts

// === Problem Card Structure ===
// {
//   "problemId": "P-12345678",
//   "displayId": "P-123",
//   "title": "Response time degradation",
//   "status": "OPEN",
//   "severityLevel": "PERFORMANCE",
//   "impactLevel": "APPLICATION",
//   "rootCauseEntity": {
//     "entityId": "PROCESS_GROUP-DB1234",
//     "name": "PostgreSQL",
//     "entityType": "PROCESS_GROUP"
//   },
//   "affectedEntities": [
//     {"name": "OrderService", "type": "SERVICE"},
//     {"name": "PaymentService", "type": "SERVICE"},
//     {"name": "InventoryService", "type": "SERVICE"},
//     {"name": "WebApp", "type": "APPLICATION"}
//   ],
//   "evidenceDetails": {
//     "evidenceType": "METRIC",
//     "displayName": "CPU saturation",
//     "entity": "PostgreSQL",
//     "metric": "builtin:host.cpu.usage",
//     "value": 95.2
//   }
// }

// === AI-Powered Features ===
// - Problem grouping: related anomalies = 1 problem
// - Impact analysis: which users/revenue affected
// - Remediation suggestions: "Scale database" or "Add index"
// - Davis CoPilot: natural language queries about problems`
        },
        {
          name: 'Problem Notifications',
          explanation: 'Davis problems can trigger notifications via multiple channels: email, Slack, PagerDuty, OpsGenie, ServiceNow, Jira, webhooks, and custom integrations. Alerting Profiles filter which problems generate notifications based on severity, impact, tags, and management zones. This ensures the right team gets alerted for the right issues without notification fatigue.',
          codeExample: `// === Alerting Profile Configuration ===
// Settings → Alerting → Alerting Profiles

// Profile: "Production Critical"
// Severity rules:
//   - Availability: notify immediately
//   - Error: notify after 5 minutes
//   - Slowdown: notify after 15 minutes
//   - Resource: notify after 10 minutes
//   - Custom: notify after 5 minutes
// Filters:
//   - Management zone: "Production"
//   - Tags: "tier:critical"

// === Integration Examples ===

// Slack Integration
// Settings → Integration → Problem Notifications → Slack
// Webhook URL: https://hooks.slack.com/services/T.../B.../xxx
// Channel: #prod-alerts
// Message format: includes problem details, root cause, affected entities

// PagerDuty Integration
// Integration key from PagerDuty service
// Severity mapping:
//   Availability → P1 (Critical)
//   Error → P2 (High)
//   Slowdown → P3 (Medium)
//   Resource → P3 (Medium)

// Webhook (custom)
// POST to: https://api.example.com/dynatrace-webhook
// Payload:
// {
//   "ProblemID": "P-12345",
//   "ProblemTitle": "Response time degradation",
//   "State": "OPEN",
//   "ProblemSeverity": "PERFORMANCE",
//   "ProblemURL": "https://{env}.live.dynatrace.com/#problems/...",
//   "ImpactedEntities": [...],
//   "RootCauseEntity": {...},
//   "Tags": "env:production,team:backend"
// }

// === Management Zones ===
// Logical grouping of entities for access control and alerting
// Example zones:
//   "Production" → all prod hosts, services, apps
//   "Team-Backend" → services tagged team:backend
//   "Region-US" → hosts in us-east/us-west
// Each zone can have different alerting profiles`
        },
        {
          name: 'Davis CoPilot',
          explanation: 'Davis CoPilot is Dynatrace\'s generative AI assistant (built on Davis AI + LLM). It allows natural language queries about your environment: "Why was OrderService slow yesterday?", "Show me error trends for the past week", "What changed before the last incident?". CoPilot generates DQL queries, creates dashboards, and explains problems in plain language.',
          codeExample: `// === Davis CoPilot Natural Language Queries ===

// "Why was OrderService slow yesterday at 3pm?"
// CoPilot generates:
fetch dt.metrics("builtin:service.response.time")
| filter dt.entity.service == "SERVICE-A1B2C3"
| filter timestamp >= "2024-01-15T14:00:00Z"
       and timestamp {'<'}= "2024-01-15T16:00:00Z"
| fields timestamp, avg, percentile(95), max

// Then correlates with:
fetch events
| filter dt.entity.service == "SERVICE-A1B2C3"
| filter timestamp >= "2024-01-15T14:00:00Z"
// Finds: deployment event at 14:55, config change at 14:50

// "Show me top errors across all services today"
// CoPilot generates:
fetch logs
| filter loglevel == "ERROR"
| filter timestamp >= now() - 24h
| summarize errorCount = count() by dt.entity.service, content
| sort errorCount desc
| limit 20

// "What's the current health of our production environment?"
// CoPilot summarizes:
// - Active problems: 2 (1 performance, 1 resource)
// - Services: 47 healthy, 3 degraded
// - Hosts: 24 healthy, 1 high CPU
// - Applications: all healthy
// - SLO status: 12/15 met, 3 at risk

// "Create a dashboard for the checkout flow"
// CoPilot auto-creates dashboard with:
// - Response time chart for checkout services
// - Error rate panel
// - Throughput panel
// - Infrastructure health for underlying hosts
// - SLO status tiles

// === Automation with Davis ===
// Auto-remediation workflows:
// Problem detected → Davis identifies root cause →
// Trigger workflow → Execute runbook →
// Validate fix → Close problem
//
// Example: CPU high → Scale up pods → Verify CPU normal → Close`
        },
        {
          name: 'Custom Metrics & Events',
          explanation: 'Dynatrace supports custom metrics via the Metrics API (push), OneAgent SDK (in-code), and OpenTelemetry. Custom events mark deployments, config changes, and business events. Metric expressions allow combining and transforming metrics for SLOs and dashboards. Business events (BizEvents) track business KPIs alongside technical metrics.',
          codeExample: `// === Push Custom Metrics ===
// Metric Ingest API (line protocol format)
// Format: metric.key,dimension=value value [timestamp]

// Push via API
curl -X POST "https://{env}.live.dynatrace.com/api/v2/metrics/ingest" \\
  -H "Authorization: Api-Token {token}" \\
  -H "Content-Type: text/plain" \\
  -d 'custom.orders.revenue,region=us-east,product=premium 149.99
custom.orders.count,region=us-east 1
custom.cart.abandonment.rate,region=us-east 12.5'

// === OneAgent SDK (Java) ===
import com.dynatrace.oneagent.sdk.OneAgentSDKFactory;
import com.dynatrace.oneagent.sdk.api.OneAgentSDK;
import com.dynatrace.oneagent.sdk.api.metric.*;

OneAgentSDK sdk = OneAgentSDKFactory.createInstance();

// Counter metric
IntegerCounter orderCounter = sdk.metricFactory()
    .createIntegerCounterMetric("custom.orders.processed",
        "orders", "Number of processed orders");
orderCounter.increase(1);

// Gauge metric
DoubleGaugeMetric queueDepth = sdk.metricFactory()
    .createDoubleGaugeMetric("custom.queue.depth",
        "items", "Current queue depth");
queueDepth.setValue(42.0);

// === OpenTelemetry Integration ===
// Dynatrace natively ingests OpenTelemetry data
// Configure OTLP exporter to Dynatrace endpoint:
// OTEL_EXPORTER_OTLP_ENDPOINT=https://{env}.live.dynatrace.com/api/v2/otlp
// OTEL_EXPORTER_OTLP_HEADERS=Authorization=Api-Token {token}

// === Business Events (BizEvents) ===
// Track business KPIs alongside technical metrics
curl -X POST "https://{env}.live.dynatrace.com/api/v2/bizevents/ingest" \\
  -H "Authorization: Api-Token {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "specversion": "1.0",
    "type": "com.myapp.order.completed",
    "source": "order-service",
    "data": {
      "orderId": "ORD-12345",
      "customerId": "CUST-6789",
      "amount": 149.99,
      "currency": "USD",
      "items": 3,
      "paymentMethod": "credit_card"
    }
  }'

// Query business events with DQL:
fetch bizevents
| filter event.type == "com.myapp.order.completed"
| summarize revenue = sum(amount), orders = count() by bin(timestamp, 1h)`
        }
      ]
    },
    {
      id: 'purepath-tracing',
      name: 'PurePath Distributed Tracing',
      icon: '🔗',
      color: '#f59e0b',
      description: 'PurePath is Dynatrace\'s distributed tracing technology that captures every transaction end-to-end across all tiers — from browser/mobile through load balancers, microservices, message queues, and databases. Unlike sampling-based APM tools, Dynatrace captures ALL transactions (100%) and uses adaptive traffic management for storage efficiency.',
      diagram: PurePathDiagram,
      details: [
        {
          name: 'End-to-End Tracing',
          explanation: 'PurePath captures the complete transaction flow from the user\'s browser through every service, database call, and external dependency. Each PurePath shows the waterfall of calls with timing, showing exactly where time is spent. Unlike OpenTelemetry which requires manual instrumentation, Dynatrace auto-instruments all supported technologies. PurePaths are linked to the user session for full user-to-code visibility.',
          codeExample: `// === PurePath Example: Order Checkout ===

// PurePath waterfall:
// ├── Browser: click "Place Order" (12ms client-side)
// │   └── XHR POST /api/orders (network: 8ms)
// │
// ├── Nginx: reverse proxy (2ms)
// │
// ├── OrderService (Java, 245ms total)
// │   ├── Spring Controller: POST /api/orders (1ms)
// │   ├── OrderValidator.validate() (15ms)
// │   ├── → PaymentService POST /pay (180ms)
// │   │   ├── PaymentController.processPayment() (2ms)
// │   │   ├── FraudDetector.check() (45ms)
// │   │   ├── → Stripe API POST /charges (120ms)
// │   │   └── PaymentRepository.save() (8ms)
// │   │       └── PostgreSQL INSERT (5ms)
// │   ├── → InventoryService PUT /reserve (35ms)
// │   │   ├── InventoryController.reserve() (1ms)
// │   │   ├── StockChecker.verify() (12ms)
// │   │   └── InventoryRepository.update() (18ms)
// │   │       └── PostgreSQL UPDATE (15ms)
// │   └── → Kafka PRODUCE "order-events" (10ms)
// │
// └── Total end-to-end: 267ms

// === PurePath Data in API ===
// GET /api/v2/spans?spanSelector=serviceName("OrderService")
// Response includes:
// - Span ID, Trace ID, Parent Span ID
// - Service name, operation name
// - Start time, duration
// - Status (OK, ERROR)
// - Attributes (HTTP method, URL, status code)
// - Database statements (sanitized)
// - Exception details (if error)

// === Key Metrics from PurePaths ===
// Service flow: which services call which
// Response time breakdown: where time is spent
// Failure rate: which calls fail
// Database hotspots: slow queries, N+1 patterns
// Exception analysis: root cause exceptions`
        },
        {
          name: 'Service Flow Analysis',
          explanation: 'Service Flow visualizes the call graph between services for a specific timeframe or filtered by specific requests. It shows request count, response time, and error rate on each edge. This reveals: which services have the most dependencies, where latency accumulates, which paths have high error rates, and potential single points of failure. Filter by specific endpoints, time ranges, or request attributes.',
          codeExample: `// === Service Flow Visualization ===
// Navigate: Services → OrderService → Service Flow

// Visual representation:
//
// [Browser App]
//     │ 1,200 req/min, 250ms avg
//     ▼
// [API Gateway]
//     │ 1,200 req/min, 5ms overhead
//     ├─────────────────────────────┐
//     ▼                             ▼
// [OrderService]              [UserService]
// 800 req/min, 180ms          400 req/min, 45ms
//     │          │                  │
//     ▼          ▼                  ▼
// [PaymentSvc] [InventorySvc]  [PostgreSQL]
// 800/min      800/min          400/min
// 120ms        35ms             8ms
//     │
//     ▼
// [Stripe API]
// 800/min, 95ms
// 0.1% errors  ← potential concern

// === Key Analysis from Service Flow ===

// 1. Bottleneck identification:
//    PaymentService takes 120ms → 48% of total latency
//    Stripe API external call is 95ms of that

// 2. Fan-out detection:
//    OrderService calls 2 downstream services synchronously
//    Consider: parallel calls, async processing

// 3. Error propagation:
//    Stripe 0.1% errors → propagates to PaymentService → OrderService
//    Need: circuit breaker, retry with backoff

// 4. Database hotspot:
//    PostgreSQL called by both UserService and InventoryService
//    Shared database = coupling risk

// === Filtering Service Flow ===
// Filter by: response time > 1s (slow requests only)
// Filter by: errors only
// Filter by: specific endpoint (POST /api/orders)
// Filter by: specific user (from session)
// Compare: this week vs last week`
        },
        {
          name: 'Database Analysis',
          explanation: 'Dynatrace auto-captures every database statement executed within PurePaths, showing execution time, row count, and connection pool usage. It detects performance anti-patterns: N+1 query problems, slow queries, missing indexes (via execution plan analysis), and connection pool exhaustion. Database statements are grouped by normalized query pattern for aggregate analysis.',
          codeExample: `// === Database Monitoring Features ===

// 1. Top Database Statements
//    Sorted by: total execution time, call count, or avg time
//    Shows normalized queries (parameters replaced with ?)
//
//    Example:
//    | Query Pattern                        | Calls  | Avg   | Total  |
//    |--------------------------------------|--------|-------|--------|
//    | SELECT * FROM orders WHERE user_id=? | 45,000 | 8ms   | 360s   |
//    | INSERT INTO audit_log (...)          | 12,000 | 2ms   | 24s    |
//    | SELECT * FROM products WHERE id IN(?)|  3,000 | 45ms  | 135s   |
//    | UPDATE inventory SET qty=? WHERE...  |  2,500 | 15ms  | 37.5s  |

// 2. N+1 Query Detection
//    Dynatrace detects when a service makes N individual queries
//    instead of 1 batch query within a single PurePath:
//    ⚠️ "OrderService executes 50 individual SELECT statements
//        to products table per request. Consider batch query."

// 3. Connection Pool Analysis
//    Metrics: active connections, idle connections, wait time
//    Alert: pool exhaustion (all connections busy, threads waiting)

// 4. Execution Plan Analysis (PostgreSQL, Oracle)
//    Detects: sequential scans on large tables (missing index)
//    Shows: estimated vs actual rows, cost

// === Database Metrics via DQL ===
fetch dt.metrics("builtin:tech.generic.db.sql.responseTime")
| filter dt.entity.service == "SERVICE-A1B2C3"
| fields timestamp, avg, max, percentile(95)

// Database statement analysis
fetch dt.metrics("builtin:service.dbChildCallCount")
| filter dt.entity.service == "SERVICE-A1B2C3"
| sort avg desc

// === Backtrace Feature ===
// From a slow query, backtrace shows:
// Query: SELECT * FROM orders WHERE status='PENDING'
// Called by: OrderService.getPendingOrders() (line 142)
// Called by: OrderScheduler.processDaily() (line 56)
// Trigger: Cron job at 02:00 UTC`
        },
        {
          name: 'OpenTelemetry Integration',
          explanation: 'Dynatrace natively supports OpenTelemetry (OTLP) for traces, metrics, and logs. You can send OTel data alongside OneAgent data, enriching PurePaths with custom spans. Dynatrace adds its own context propagation (W3C Trace Context) that works alongside OTel. This enables monitoring polyglot environments where some services use OneAgent and others use OTel SDKs.',
          codeExample: `// === OpenTelemetry + Dynatrace ===

// Option 1: OneAgent + OTel enrichment
// OneAgent provides base instrumentation
// OTel SDK adds custom spans for business logic
// Both appear in the same PurePath

// Java example with OTel SDK + OneAgent:
import io.opentelemetry.api.trace.*;

Tracer tracer = GlobalOpenTelemetry.getTracer("order-service");

public Order processOrder(OrderRequest request) {
    // OneAgent auto-captures Spring Controller span
    // Add custom business span:
    Span span = tracer.spanBuilder("process-order")
        .setAttribute("order.type", request.getType())
        .setAttribute("order.items", request.getItemCount())
        .startSpan();
    try (Scope scope = span.makeCurrent()) {
        // Business logic...
        return order;
    } finally {
        span.end();
    }
}

// Option 2: Pure OpenTelemetry (no OneAgent)
// Configure OTLP exporter to Dynatrace:

// Environment variables:
// OTEL_SERVICE_NAME=order-service
// OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
// OTEL_EXPORTER_OTLP_ENDPOINT=https://{env}.live.dynatrace.com/api/v2/otlp
// OTEL_EXPORTER_OTLP_HEADERS=Authorization=Api-Token dt0c01.xxx
// OTEL_METRICS_EXPORTER=otlp
// OTEL_LOGS_EXPORTER=otlp

// Or in code (Java):
// SdkTracerProvider tracerProvider = SdkTracerProvider.builder()
//     .addSpanProcessor(BatchSpanProcessor.builder(
//         OtlpHttpSpanExporter.builder()
//             .setEndpoint("https://{env}.live.dynatrace.com/api/v2/otlp/v1/traces")
//             .addHeader("Authorization", "Api-Token xxx")
//             .build())
//         .build())
//     .build();

// === W3C Trace Context ===
// Dynatrace uses W3C Trace Context for propagation:
// traceparent: 00-{trace-id}-{span-id}-01
// tracestate: {dt-specific-data}
// Compatible with all OTel-instrumented services`
        },
        {
          name: 'Session Replay & RUM',
          explanation: 'Real User Monitoring (RUM) captures every user session in the browser/mobile, linking user actions to backend PurePaths. Session Replay records visual playback of user interactions (clicks, scrolls, inputs). This connects user experience to technical performance: you can see exactly what the user did, when they experienced errors, and trace the backend call that caused the issue.',
          codeExample: `// === Real User Monitoring (RUM) Setup ===

// Automatic: OneAgent JavaScript injection
// Dynatrace auto-injects RUM JavaScript into HTML pages
// No code changes needed (requires OneAgent on web server)

// Manual: JavaScript tag
// Settings → Web & Mobile → Applications → Setup
// <script type="text/javascript" src="https://{env}.js-agent.dynatrace.com/..." ></script>

// === User Session Data Captured ===
// - Page load times (visually complete, DOM interactive, fully loaded)
// - XHR/Fetch requests and timings
// - JavaScript errors
// - User actions (clicks, inputs, navigation)
// - Geographic location (from IP)
// - Browser, OS, device type
// - Apdex score per page
// - User flow (page-to-page navigation)

// === Session Replay Features ===
// Visual playback of user sessions:
// - See exactly what the user saw
// - Replay clicks, scrolls, form interactions
// - Privacy: PII masking (passwords, credit cards auto-masked)
// - Filter: replay sessions with errors or slow performance

// === User Action to PurePath Correlation ===
// User Session → User Action → PurePath
//
// Example:
// Session: user@example.com, Chrome, US-East
//   Action: "click on Place Order" (12:45:03 UTC)
//     └── PurePath: POST /api/orders
//         ├── OrderService (180ms)
//         ├── PaymentService (120ms)
//         └── Database (15ms)
//   Action: "page load /confirmation" (12:45:04 UTC)
//     └── PurePath: GET /api/orders/12345
//         Response: 200 OK, 45ms

// === User Session Query (DQL) ===
fetch dt.entity.user_session
| filter applicationName == "MyWebApp"
| filter userExperienceScore == "FRUSTRATED"
| fields timestamp, userId, duration, errors, actions
| sort timestamp desc`
        }
      ]
    },
    {
      id: 'slo-management',
      name: 'SLOs & Service Level',
      icon: '🎯',
      color: '#ef4444',
      description: 'Dynatrace SLO management defines, tracks, and alerts on Service Level Objectives. SLOs are built on metrics (response time, availability, error rate) with configurable targets and evaluation windows. SLO dashboards show burn rate, error budget remaining, and historical compliance. SLOs integrate with alerting for proactive burn-rate notifications.',
      diagram: SLODiagram,
      details: [
        {
          name: 'Defining SLOs',
          explanation: 'SLOs in Dynatrace define a target for a service metric over a time window. The SLI (Service Level Indicator) is the underlying metric — typically availability, response time percentile, or error rate. The SLO target is the percentage of time the SLI must meet the threshold (e.g., 99.9% of requests under 500ms). Error budget is the allowed amount of failure (0.1% = ~43 minutes/month for 99.9% SLO).',
          codeExample: `// === SLO Configuration ===
// Navigate: SLOs → Add new SLO

// Example 1: Availability SLO
// Name: "OrderService Availability"
// SLI: Metric expression
//   builtin:service.errors.server.successCount
//   / builtin:service.requestCount.server * 100
// Filter: Service = OrderService
// Target: 99.95%
// Warning: 99.97%
// Timeframe: Rolling 30 days

// Example 2: Latency SLO
// Name: "OrderService P95 Latency"
// SLI: Metric expression
//   builtin:service.response.time:percentile(95)
// Filter: Service = OrderService
// Target: 95% of time, P95 < 500ms
// Timeframe: Rolling 7 days

// === SLO via API ===
curl -X POST "https://{env}.live.dynatrace.com/api/v2/slo" \\
  -H "Authorization: Api-Token {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "OrderService Availability",
    "enabled": true,
    "metricExpression": "100*(builtin:service.errors.server.successCount:splitBy())/(builtin:service.requestCount.server:splitBy())",
    "evaluationType": "AGGREGATE",
    "filter": "type(SERVICE),entityName(OrderService)",
    "target": 99.95,
    "warning": 99.97,
    "timeframe": "-30d",
    "errorBudgetBurnRate": {
      "fastBurnMinutes": 60,
      "burnRateVisualizationEnabled": true
    }
  }'

// === Error Budget ===
// 99.95% SLO over 30 days:
// Error budget = 0.05% = 21.6 minutes of downtime allowed
// Budget consumed: 8.5 min → 39% used → healthy
// Budget consumed: 19 min → 88% used → at risk
// Budget consumed: 22 min → 102% used → BREACHED`
        },
        {
          name: 'Burn Rate Alerting',
          explanation: 'Burn rate measures how fast you\'re consuming your error budget. A burn rate of 1.0 means you\'ll exactly exhaust the budget by the end of the window. A burn rate of 10.0 means you\'re consuming budget 10x faster than sustainable. Google SRE recommends multi-window burn rate alerting: a fast window (1h) catches acute incidents and a slow window (6h) catches gradual degradation.',
          codeExample: `// === Burn Rate Calculation ===
// Burn Rate = (error rate during window) / (allowed error rate)
//
// Example: 99.9% SLO (0.1% error budget)
//   Current error rate: 0.5% over last hour
//   Burn rate = 0.5% / 0.1% = 5.0x
//   Meaning: consuming budget 5x faster than sustainable
//   At this rate: budget exhausted in 30 days / 5 = 6 days

// === Multi-Window Burn Rate Alerts ===
// (Google SRE recommended approach)

// Page-level alert (wake someone up):
//   Fast burn: 14.4x burn rate over 1 hour
//   AND 14.4x burn rate over 5 minutes
//   → Consumes 2% of 30-day budget in 1 hour

// Ticket-level alert (create ticket):
//   Slow burn: 6x burn rate over 6 hours
//   AND 6x burn rate over 30 minutes
//   → Consumes 5% of 30-day budget in 6 hours

// Low urgency (dashboard):
//   3x burn rate over 3 days
//   AND 3x burn rate over 6 hours

// === Dynatrace SLO Alerting Configuration ===
// Settings → SLOs → [Your SLO] → Alert Settings
//
// Alert when error budget burn rate is:
//   Fast burn threshold: 10x
//   Fast burn time window: 1h
//   Alerting profile: "Production Critical"
//
// Alert when error budget remaining < 25%:
//   Send notification to: #sre-team Slack channel

// === SLO Dashboard Widgets ===
// 1. SLO tile: current % + trend arrow
// 2. Error budget remaining: percentage + time
// 3. Burn rate chart: burn rate over time
// 4. SLI metric chart: underlying metric trend
// 5. Error budget consumed: cumulative over window`
        },
        {
          name: 'Management Zones',
          explanation: 'Management Zones partition the Dynatrace environment into logical segments for access control, alerting, and SLO scoping. Zones are defined by rules matching entity properties (host group, tags, technology, cloud provider). Each zone can have separate alerting profiles, SLOs, and dashboard views. Teams see only their zone\'s data, enabling multi-team use of a single Dynatrace environment.',
          codeExample: `// === Management Zone Configuration ===
// Settings → Preferences → Management Zones

// Zone: "Production Backend"
// Rules:
//   - Host group name = "prod-backend"
//   - OR Service tag = "env:production" AND "tier:backend"
//   - OR Process group technology = Java

// Zone: "Team-Payments"
// Rules:
//   - Service tag contains "team:payments"
//   - Include related hosts and processes: true
//   - Include database services: true

// === Access Control with Zones ===
// IAM → Groups → "Backend Team"
//   Permissions:
//     - View environment: Management Zone "Production Backend"
//     - Configure environment: Management Zone "Production Backend"
//     - NOT other zones → team sees only their services

// === Zone-Scoped Features ===

// SLOs scoped to zone:
// "Production Backend Availability"
// Filter: Management Zone "Production Backend"
// Metric: builtin:service.errors.server.successCount

// Alerting scoped to zone:
// Alerting Profile "Payments Critical"
// Filter: Management Zone "Team-Payments"
// Severity: Availability → immediate
// Notify: payments-oncall@example.com

// Dashboards scoped to zone:
// "Team Payments Overview"
// All tiles filtered to Management Zone "Team-Payments"
// Shared with: Payments team group

// === Tags Best Practice ===
// Consistent tagging enables flexible zone rules:
// env: production | staging | development
// team: payments | orders | platform
// tier: frontend | backend | database
// criticality: critical | standard | low
//
// Auto-tagging rules:
// Settings → Tags → Auto-tagging
// Rule: If host group contains "prod" → tag "env:production"
// Rule: If K8s namespace = "payments" → tag "team:payments"`
        },
        {
          name: 'Synthetic Monitoring',
          explanation: 'Synthetic monitoring runs automated tests from global locations to detect availability and performance issues before users encounter them. Browser monitors execute real browser interactions (click, type, navigate). HTTP monitors check API endpoints. Synthetic tests run on a schedule (every 1-60 minutes) from Dynatrace\'s global network or private ActiveGate locations behind firewalls.',
          codeExample: `// === Browser Monitor ===
// Simulates real user journey in a browser

// Example: Checkout Flow Monitor
// Frequency: every 5 minutes
// Locations: US-East, EU-West, APAC-Tokyo
// Steps:
//   1. Navigate to https://shop.example.com
//      Validation: page title contains "Shop"
//   2. Click "Products" link
//      Wait for: CSS selector ".product-grid" visible
//   3. Click first product
//      Wait for: CSS selector ".product-detail" visible
//   4. Click "Add to Cart"
//      Validation: cart count > 0
//   5. Click "Checkout"
//      Validation: page contains "Order Summary"
// Performance thresholds:
//   Page load: < 3 seconds (warning), < 5 seconds (critical)
//   Availability: 99.5% minimum

// === HTTP Monitor ===
// Simulates API health checks

// Example: API Health Monitor
// Frequency: every 1 minute
// Locations: 5 global locations
// Requests:
//   GET https://api.example.com/health
//   Validation: status == 200, body contains "UP"
//   Threshold: response < 500ms

//   POST https://api.example.com/api/auth
//   Body: {"username":"synthetic","password":"***"}
//   Validation: status == 200, body contains "token"
//   Threshold: response < 1000ms

// === Private Synthetic Location ===
// For internal apps behind firewall:
// Deploy ActiveGate with synthetic capability
// ActiveGate acts as synthetic test execution point
// Monitor internal APIs, staging environments

// === Synthetic + SLO ===
// Use synthetic availability as SLI:
// SLO: "Public API Availability"
// SLI: Synthetic monitor success rate
// Target: 99.9% (allows ~43 min downtime/month)
// Advantage: detects issues before any real user is affected

// === Outage Detection ===
// If synthetic fails from 2+ locations simultaneously:
// → Davis opens problem: "Availability issue detected"
// → Before any real user reports the issue
// → Triggers PagerDuty alert for on-call engineer`
        },
        {
          name: 'Interview Scenarios',
          explanation: 'Dynatrace interview questions typically cover: OneAgent vs agent-based APM, how Davis AI root cause analysis works, PurePath tracing vs sampling, SLO/SLI definitions, and how to troubleshoot production issues using Dynatrace. Senior roles expect knowledge of Grail/DQL, configuration as code (Monaco), and integration with CI/CD pipelines.',
          codeExample: `// === Common Interview Questions ===

// Q: "How does Dynatrace differ from Prometheus + Grafana?"
// A: Dynatrace is full-stack APM with:
//    - Auto-instrumentation (no manual setup)
//    - AI root cause analysis (Davis)
//    - Distributed tracing (PurePath) built-in
//    - User session correlation (RUM + backend)
//    Prometheus + Grafana: metrics only, manual instrumentation,
//    no tracing, no root cause analysis, but open source + free

// Q: "A service is slow in production. Walk me through Dynatrace."
// A: 1. Check Davis problems → any active alerts?
//    2. Service screen → response time chart → when did it start?
//    3. Service flow → which downstream call is slow?
//    4. PurePaths → drill into slow transactions
//    5. Database analysis → any slow queries?
//    6. Host metrics → CPU, memory, disk I/O
//    7. Compare with deployment events → did a deploy cause it?

// Q: "How would you set up SLOs for a payment service?"
// A: Define 3 SLOs:
//    1. Availability: 99.99% success rate (4 min/month budget)
//    2. Latency: 99.5% of requests < 500ms P95
//    3. Error budget: burn rate alerts at 10x (page), 3x (ticket)
//    Scope: Management Zone "Team-Payments"
//    Alert: PagerDuty for burn rate > 10x over 1 hour
//    Dashboard: SLO tiles + burn rate chart for team

// Q: "How does Davis determine root cause?"
// A: 1. Detects anomalies on multiple entities simultaneously
//    2. Maps all affected entities via Smartscape topology
//    3. Traces causal chain: which entity anomaly started first?
//    4. Identifies the earliest anomaly as root cause
//    5. Groups all related anomalies into ONE problem
//    Example: DB slow → 5 services slow → 2 apps have errors
//    Davis: "Root cause: Database CPU saturation"

// Q: "OneAgent vs OpenTelemetry — when to use which?"
// A: OneAgent: full auto-instrumentation, Davis AI, RUM, Session Replay
//    OTel: vendor-neutral, custom spans, polyglot environments
//    Best practice: OneAgent for core services + OTel for custom spans
//    Dynatrace ingests both and merges into unified PurePaths`
        }
      ]
    },
    {
      id: 'workflows-automation',
      name: 'Workflows & Automation',
      icon: '⚙️',
      color: '#06b6d4',
      description: 'Dynatrace Workflows enable automated responses to problems, SLO breaches, and scheduled tasks. Workflows chain actions: trigger on Davis problem → run remediation script → validate fix → close problem. Integration with Ansible, Terraform, Kubernetes, and cloud APIs enables self-healing infrastructure. This is Dynatrace\'s approach to AIOps and closed-loop remediation.',
      diagram: WorkflowAutomationDiagram,
      details: [
        {
          name: 'Workflow Engine',
          explanation: 'Dynatrace Workflows is a visual automation engine that chains actions triggered by events (problems, SLO breaches, schedules, API calls). Each workflow consists of a trigger, one or more actions, and optional conditions. Actions include: run JavaScript, call HTTP endpoint, send notification, execute Kubernetes action, query DQL, and more. Workflows replace the older "Auto-remediation" feature with a more flexible approach.',
          codeExample: `// === Workflow Structure ===
// Trigger → Condition → Action(s) → Result

// === Example Workflow: Auto-Scale on High CPU ===
// Trigger: Davis problem with root cause "CPU saturation"
// Condition: Affected entity has tag "auto-scale:enabled"
// Actions:
//   1. Run DQL to get current pod count
//   2. Call Kubernetes API to scale deployment +2 replicas
//   3. Wait 5 minutes
//   4. Run DQL to verify CPU dropped below 70%
//   5. If yes → add comment to problem "Auto-scaled, CPU normalized"
//   6. If no → send Slack alert "Auto-scale didn't resolve CPU issue"

// === Workflow Definition (JSON) ===
{
  "title": "Auto-Scale on CPU Saturation",
  "trigger": {
    "type": "davis-problem",
    "config": {
      "categories": ["RESOURCE"],
      "entityTags": ["auto-scale:enabled"]
    }
  },
  "tasks": {
    "get_deployment": {
      "action": "dynatrace.automations:run-javascript",
      "input": {
        "script": "const entity = execution.params.event.rootCauseEntity; return entity;"
      }
    },
    "scale_up": {
      "action": "dynatrace.automations:http-function",
      "input": {
        "url": "https://k8s-api/apis/apps/v1/namespaces/prod/deployments/{{ result('get_deployment').name }}/scale",
        "method": "PATCH",
        "body": "{\"spec\":{\"replicas\": {{ result('get_deployment').replicas + 2 }} }}"
      }
    },
    "verify": {
      "action": "dynatrace.automations:run-javascript",
      "conditions": { "delay": "5m" },
      "input": {
        "script": "const result = await fetch(dql('fetch dt.metrics(\"builtin:host.cpu.usage\")|filter entityId==\"{entity}\"|last(5m)|avg'))"
      }
    }
  }
}

// === Common Workflow Triggers ===
// - Davis problem opened/updated/closed
// - SLO error budget < threshold
// - Scheduled (cron expression)
// - API call (webhook)
// - Metric threshold crossed`
        },
        {
          name: 'CI/CD Integration',
          explanation: 'Dynatrace integrates with CI/CD pipelines to provide deployment validation, performance gates, and release comparison. Push deployment events to Dynatrace, then use Davis to detect regressions. Quality gates in pipelines can query Dynatrace SLOs and metrics to automatically pass/fail deployments. The Dynatrace Monaco CLI manages configuration as code for GitOps workflows.',
          codeExample: `# === Deployment Event Push ===
# Notify Dynatrace of deployments for change correlation

curl -X POST "https://{env}.live.dynatrace.com/api/v2/events/ingest" \\
  -H "Authorization: Api-Token {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "eventType": "CUSTOM_DEPLOYMENT",
    "title": "Deployed order-service v2.1.0",
    "entitySelector": "type(SERVICE),entityName(OrderService)",
    "properties": {
      "dt.event.deployment.name": "order-service",
      "dt.event.deployment.version": "2.1.0",
      "dt.event.deployment.ci_back_link": "https://jenkins/job/deploy/42",
      "dt.event.deployment.remediation_action_link": "https://jenkins/job/rollback/",
      "approver": "jane.doe",
      "commit": "abc1234def"
    }
  }'

# === Quality Gate in CI/CD Pipeline ===
# Query SLO status after deployment

# Jenkins pipeline example:
# stage('Performance Gate') {
#   steps {
#     script {
#       def response = httpRequest(
#         url: "https://{env}.live.dynatrace.com/api/v2/slo/{sloId}",
#         customHeaders: [[name: 'Authorization', value: "Api-Token \${DT_TOKEN}"]]
#       )
#       def slo = readJSON(text: response.content)
#       if (slo.status == "FAILURE" || slo.errorBudgetBurnRate.burnRateValue > 5) {
#         error("SLO violated after deployment. Rolling back.")
#       }
#     }
#   }
# }

# === Monaco — Configuration as Code ===
# Install: npm install -g @dynatrace/monaco-cli

# Project structure:
# monaco-project/
# ├── environments.yaml
# ├── alerting-profiles/
# │   └── production-critical.json
# ├── dashboards/
# │   └── team-overview.json
# ├── slo/
# │   └── order-service-availability.json
# └── auto-tags/
#     └── environment-tags.json

# Deploy configuration:
monaco deploy -e environments.yaml -p monaco-project/

# Pull existing config from environment:
monaco download -e environments.yaml -p downloaded-config/

# Version control config alongside application code`
        },
        {
          name: 'Site Reliability Guardian',
          explanation: 'Site Reliability Guardian (SRG) automates release validation by comparing key metrics before and after deployment. It runs a series of checks (SLO status, error rate, response time) and produces a pass/warning/fail verdict. SRG integrates with CI/CD pipelines as a quality gate and with workflows for automated rollback on failure. This codifies the SRE release validation process.',
          codeExample: `// === Site Reliability Guardian ===
// Automated release validation workflow

// Configuration:
// 1. Define objectives (what to validate):
//    - SLO: OrderService availability > 99.95%
//    - Metric: P95 response time < 500ms
//    - Metric: Error rate < 0.5%
//    - Metric: CPU usage < 70%

// 2. Define comparison:
//    Compare: 30 min after deployment
//    Against: 30 min before deployment
//    OR against: previous release baseline

// 3. Define thresholds:
//    Pass: all objectives met
//    Warning: 1 objective marginal (within 10% of threshold)
//    Fail: any objective breached

// === SRG in CI/CD Pipeline ===
// 1. Deploy new version
// 2. Wait 10 minutes (warmup)
// 3. Trigger SRG evaluation
// 4. SRG compares pre/post metrics
// 5. Returns verdict: PASS / WARNING / FAIL
// 6. On FAIL → trigger rollback workflow

// API trigger for SRG evaluation:
// POST /platform/automation/v1/executions
// {
//   "workflowId": "srg-order-service",
//   "input": {
//     "deployment": {
//       "version": "2.1.0",
//       "service": "OrderService",
//       "startTime": "2024-01-15T10:00:00Z"
//     }
//   }
// }

// === SRG Result ===
// {
//   "verdict": "PASS",
//   "objectives": [
//     {"name": "Availability", "status": "PASS", "actual": 99.98, "target": 99.95},
//     {"name": "P95 Latency", "status": "PASS", "actual": 320, "target": 500},
//     {"name": "Error Rate", "status": "PASS", "actual": 0.02, "target": 0.5},
//     {"name": "CPU Usage", "status": "WARNING", "actual": 65, "target": 70}
//   ],
//   "comparison": {
//     "baseline": "v2.0.9",
//     "current": "v2.1.0",
//     "improvments": ["P95 latency improved by 12%"],
//     "regressions": ["CPU usage increased by 8%"]
//   }
// }`
        },
        {
          name: 'Cloud Automation',
          explanation: 'Dynatrace integrates with cloud platforms (AWS, Azure, GCP) for infrastructure monitoring and automated remediation. It pulls CloudWatch/Azure Monitor/GCP metrics via ActiveGate, monitors serverless functions (Lambda, Azure Functions), and can trigger cloud-native scaling actions. Dynatrace\'s cloud integration provides unified visibility across multi-cloud environments.',
          codeExample: `// === AWS Integration ===
// ActiveGate pulls CloudWatch metrics automatically
// Supported services: EC2, RDS, Lambda, ECS, EKS, S3, SQS, etc.

// AWS Lambda monitoring:
// OneAgent Lambda Layer auto-instruments Node.js, Python, Java
// Captures: invocations, duration, errors, cold starts
// Links Lambda invocations to PurePath traces

// === Kubernetes Monitoring ===
// Full-stack K8s monitoring with Dynatrace Operator

// Metrics captured:
// - Cluster: node count, resource utilization
// - Workloads: pod restarts, OOMKills, resource limits
// - Containers: CPU, memory, network per container
// - Services: request rate, latency, errors
// - Events: K8s events correlated with Davis problems

// DQL query for K8s pod restarts:
fetch dt.entity.cloud_application
| filter isNotNull(properties.k8s.pod.restart_count)
| filter properties.k8s.pod.restart_count > 5
| fields entityName, properties.k8s.namespace,
         properties.k8s.pod.restart_count
| sort properties.k8s.pod.restart_count desc

// === Auto-Remediation Example ===
// Problem: Pod OOMKilled repeatedly
// Workflow:
// 1. Davis detects: "Container OOMKilled" problem
// 2. Workflow triggers: get current memory limit
// 3. Action: kubectl patch deployment to increase memory limit
// 4. Verify: pod running, no more OOMKills
// 5. Result: self-healing without human intervention

// === Multi-Cloud Dashboard ===
// Single pane of glass across AWS + Azure + GCP:
// - Infrastructure health per cloud provider
// - Cost metrics alongside performance
// - Cross-cloud service dependencies via Smartscape
// - Unified alerting regardless of cloud provider`
        },
        {
          name: 'Log Management',
          explanation: 'Dynatrace ingests, processes, and analyzes logs alongside metrics and traces in Grail. Logs are automatically correlated with PurePaths via trace context. Log analytics uses DQL for powerful querying, pattern detection, and anomaly detection. Davis AI detects unusual log patterns and error spikes. Log data enrichment automatically adds context (service name, host, K8s namespace) to every log line.',
          codeExample: `// === Log Ingestion Methods ===

// 1. OneAgent (automatic)
//    Reads log files from discovered processes
//    Adds context: host, process group, service, K8s namespace
//    Configure: Settings → Log Monitoring → Log sources

// 2. Fluentd/FluentBit/Logstash
//    Forward logs via OTLP or Dynatrace Log Ingest API
//    Useful for centralized log shipping

// 3. API (direct push)
curl -X POST "https://{env}.live.dynatrace.com/api/v2/logs/ingest" \\
  -H "Authorization: Api-Token {token}" \\
  -H "Content-Type: application/json" \\
  -d '[{
    "content": "Order ORD-12345 failed: payment declined",
    "log.source": "order-service",
    "severity": "error",
    "trace_id": "abc123def456",
    "span_id": "789ghi",
    "custom.order_id": "ORD-12345"
  }]'

// === Log Analytics with DQL ===

// Error log analysis
fetch logs
| filter loglevel == "ERROR"
| filter dt.entity.service == "SERVICE-A1B2C3"
| sort timestamp desc
| limit 100

// Log pattern detection
fetch logs
| filter loglevel == "ERROR"
| summarize count = count() by content
| sort count desc
| limit 10

// Correlate logs with traces
fetch logs
| filter trace_id == "abc123def456"
| sort timestamp asc
// Shows all log entries from the same transaction

// Log-based metric
fetch logs
| filter content contains "payment declined"
| summarize declinedCount = count() by bin(timestamp, 5m)

// === Automatic Log Enrichment ===
// Dynatrace adds to every log line:
// - dt.entity.host: HOST-xxxxx
// - dt.entity.process_group: PROCESS_GROUP-xxxxx
// - dt.entity.service: SERVICE-xxxxx (if within PurePath)
// - trace_id, span_id (if within PurePath)
// - k8s.namespace, k8s.pod.name (if in K8s)
// No manual configuration needed`
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
      background: 'linear-gradient(to bottom right, #111827, #1a0f2e, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <Breadcrumb
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          section={breadcrumb?.section}
          category={breadcrumb?.category}
          topic={breadcrumb?.topic || 'Dynatrace'}
          colors={breadcrumb?.colors || DYNATRACE_COLORS}
        />

        <CollapsibleSidebar
          items={concepts}
          selectedIndex={selectedConceptIndex}
          onSelect={(index) => { setSelectedConceptIndex(index); setSelectedDetailIndex(0) }}
          title="Topics"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={DYNATRACE_COLORS.primary}
        />

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          {onPrevious ? (
            <button onClick={onPrevious} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(111, 45, 168, 0.2)', border: '1px solid rgba(111, 45, 168, 0.3)', borderRadius: '0.5rem', color: '#8b5cf6', cursor: 'pointer', fontSize: '0.85rem' }}>
              ← {previousName || 'Previous'}
            </button>
          ) : <div />}
          {onNext ? (
            <button onClick={onNext} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(111, 45, 168, 0.2)', border: '1px solid rgba(111, 45, 168, 0.3)', borderRadius: '0.5rem', color: '#8b5cf6', cursor: 'pointer', fontSize: '0.85rem' }}>
              {nextName || 'Next'} →
            </button>
          ) : <div />}
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#6f2da8' }}>Dynatrace</h1>
        <p style={{ fontSize: '1.1rem', color: '#d1d5db', marginBottom: '2rem', lineHeight: '1.6' }}>
          Full-stack observability platform with AI-powered root cause analysis, distributed tracing, and automated remediation.
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

export default Dynatrace

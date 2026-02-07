import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const GRAFANA_COLORS = {
  primary: '#f57c00',
  primaryHover: '#ff9800',
  bg: 'rgba(245, 124, 0, 0.1)',
  border: 'rgba(245, 124, 0, 0.3)',
  arrow: '#f57c00',
  hoverBg: 'rgba(245, 124, 0, 0.2)',
  topicBg: 'rgba(245, 124, 0, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

// Grafana Dashboard Structure Diagram
const GrafanaDashboardDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowGrafana" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f57c00" />
      </marker>
    </defs>

    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Grafana Dashboard Structure</text>

    {/* Dashboard container */}
    <rect x="50" y="40" width="600" height="145" rx="8" fill="rgba(245, 124, 0, 0.1)" stroke="#f57c00" strokeWidth="2"/>
    <text x="70" y="60" fill="#f57c00" fontSize="11" fontWeight="bold">Dashboard: Application Performance</text>

    {/* Row 1 - Panels */}
    <rect x="70" y="70" width="180" height="50" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="160" y="92" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Graph Panel</text>
    <text x="160" y="108" textAnchor="middle" fill="#fcd34d" fontSize="7">Request Rate</text>

    <rect x="260" y="70" width="100" height="50" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="310" y="92" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Stat Panel</text>
    <text x="310" y="108" textAnchor="middle" fill="#86efac" fontSize="7">Error %</text>

    <rect x="370" y="70" width="100" height="50" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="420" y="92" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Gauge</text>
    <text x="420" y="108" textAnchor="middle" fill="#c4b5fd" fontSize="7">CPU Usage</text>

    <rect x="480" y="70" width="150" height="50" rx="4" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1.5"/>
    <text x="555" y="92" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Table Panel</text>
    <text x="555" y="108" textAnchor="middle" fill="#f9a8d4" fontSize="7">Top Endpoints</text>

    {/* Row 2 - More Panels */}
    <rect x="70" y="130" width="280" height="45" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="1.5"/>
    <text x="210" y="152" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Time Series Panel</text>
    <text x="210" y="166" textAnchor="middle" fill="#67e8f9" fontSize="7">Latency P50/P95/P99</text>

    <rect x="360" y="130" width="270" height="45" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="495" y="152" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Heatmap Panel</text>
    <text x="495" y="166" textAnchor="middle" fill="#fca5a5" fontSize="7">Response Time Distribution</text>
  </svg>
)

// Data Sources Feeding Grafana Diagram
const DataSourceDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowDS" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f57c00" />
      </marker>
    </defs>

    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Multiple Data Sources Feeding Grafana</text>

    {/* Data sources on left */}
    <rect x="30" y="45" width="110" height="35" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="85" y="67" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Prometheus</text>

    <rect x="30" y="90" width="110" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="85" y="112" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Loki</text>

    <rect x="30" y="135" width="110" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="85" y="157" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">InfluxDB</text>

    {/* More data sources */}
    <rect x="560" y="45" width="110" height="35" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="615" y="67" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Elasticsearch</text>

    <rect x="560" y="90" width="110" height="35" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="1.5"/>
    <text x="615" y="112" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">CloudWatch</text>

    <rect x="560" y="135" width="110" height="35" rx="4" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1.5"/>
    <text x="615" y="157" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">MySQL</text>

    {/* Grafana in center */}
    <rect x="250" y="70" width="200" height="70" rx="8" fill="rgba(245, 124, 0, 0.3)" stroke="#f57c00" strokeWidth="2"/>
    <text x="350" y="100" textAnchor="middle" fill="#f57c00" fontSize="12" fontWeight="bold">Grafana</text>
    <text x="350" y="120" textAnchor="middle" fill="#ff9800" fontSize="8">Unified Visualization</text>

    {/* Arrows */}
    <line x1="140" y1="62" x2="245" y2="95" stroke="#f87171" strokeWidth="1.5"/>
    <line x1="140" y1="107" x2="245" y2="105" stroke="#fbbf24" strokeWidth="1.5"/>
    <line x1="140" y1="152" x2="245" y2="115" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="555" y1="62" x2="455" y2="95" stroke="#a78bfa" strokeWidth="1.5"/>
    <line x1="555" y1="107" x2="455" y2="105" stroke="#22d3ee" strokeWidth="1.5"/>
    <line x1="555" y1="152" x2="455" y2="115" stroke="#f472b6" strokeWidth="1.5"/>
  </svg>
)

// Alerting Flow Diagram
const AlertingFlowDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowAlert" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f57c00" />
      </marker>
    </defs>

    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Grafana Alerting Flow</text>

    {/* Alert Rule */}
    <rect x="30" y="60" width="120" height="60" rx="6" fill="rgba(245, 124, 0, 0.3)" stroke="#f57c00" strokeWidth="2"/>
    <text x="90" y="85" textAnchor="middle" fill="#f57c00" fontSize="10" fontWeight="bold">Alert Rule</text>
    <text x="90" y="102" textAnchor="middle" fill="#ff9800" fontSize="7">Condition Check</text>
    <text x="90" y="115" textAnchor="middle" fill="#ff9800" fontSize="7">Every 1m</text>

    {/* Evaluation */}
    <rect x="180" y="60" width="120" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="240" y="85" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Evaluate</text>
    <text x="240" y="102" textAnchor="middle" fill="#fcd34d" fontSize="7">Query Data</text>
    <text x="240" y="115" textAnchor="middle" fill="#fcd34d" fontSize="7">Check Threshold</text>

    {/* Alert State */}
    <rect x="330" y="60" width="120" height="60" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="390" y="85" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Alert State</text>
    <text x="390" y="102" textAnchor="middle" fill="#fca5a5" fontSize="7">Pending/Firing</text>
    <text x="390" y="115" textAnchor="middle" fill="#fca5a5" fontSize="7">for: 5m</text>

    {/* Notification Policy */}
    <rect x="480" y="60" width="120" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="540" y="85" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Route</text>
    <text x="540" y="102" textAnchor="middle" fill="#c4b5fd" fontSize="7">Match Labels</text>
    <text x="540" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="7">Group Alerts</text>

    {/* Contact Points */}
    <rect x="550" y="135" width="60" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="580" y="157" textAnchor="middle" fill="#4ade80" fontSize="8">Slack</text>

    <rect x="480" y="135" width="60" height="35" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="510" y="157" textAnchor="middle" fill="#22d3ee" fontSize="8">Email</text>

    <rect x="620" y="135" width="60" height="35" rx="4" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="650" y="157" textAnchor="middle" fill="#f472b6" fontSize="8">PagerDuty</text>

    {/* Arrows */}
    <line x1="150" y1="90" x2="175" y2="90" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowAlert)"/>
    <line x1="300" y1="90" x2="325" y2="90" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowAlert)"/>
    <line x1="450" y1="90" x2="475" y2="90" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowAlert)"/>
    <line x1="510" y1="120" x2="510" y2="130" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="540" y1="120" x2="580" y2="130" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="570" y1="120" x2="650" y2="130" stroke="#64748b" strokeWidth="1.5"/>
  </svg>
)

// Templating and Variables Diagram
const TemplatingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Dashboard Templating with Variables</text>

    {/* Variable Dropdowns */}
    <rect x="50" y="45" width="600" height="40" rx="4" fill="rgba(30, 41, 59, 0.8)" stroke="#475569" strokeWidth="1"/>
    <text x="70" y="70" fill="#94a3b8" fontSize="9">Variables:</text>

    <rect x="130" y="52" width="100" height="26" rx="3" fill="rgba(245, 124, 0, 0.3)" stroke="#f57c00" strokeWidth="1"/>
    <text x="180" y="70" textAnchor="middle" fill="#f57c00" fontSize="8">$datasource</text>

    <rect x="240" y="52" width="100" height="26" rx="3" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="290" y="70" textAnchor="middle" fill="#4ade80" fontSize="8">$environment</text>

    <rect x="350" y="52" width="100" height="26" rx="3" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="70" textAnchor="middle" fill="#fbbf24" fontSize="8">$service</text>

    <rect x="460" y="52" width="100" height="26" rx="3" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="510" y="70" textAnchor="middle" fill="#a78bfa" fontSize="8">$instance</text>

    {/* Query with variables */}
    <rect x="50" y="100" width="600" height="65" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#334155" strokeWidth="1"/>
    <text x="70" y="120" fill="#94a3b8" fontSize="9">Query using variables:</text>
    <text x="70" y="140" fill="#f87171" fontSize="9" fontFamily="monospace">rate(http_requests_total{'{'}</text>
    <text x="230" y="140" fill="#4ade80" fontSize="9" fontFamily="monospace">env="$environment"</text>
    <text x="380" y="140" fill="#fbbf24" fontSize="9" fontFamily="monospace">, service="$service"</text>
    <text x="530" y="140" fill="#f87171" fontSize="9" fontFamily="monospace">{'}'}[5m])</text>
    <text x="70" y="158" fill="#64748b" fontSize="8">Variables dynamically filter data across all panels</text>
  </svg>
)

// Provisioning Diagram
const ProvisioningDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowProv" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f57c00" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Grafana Provisioning Architecture</text>

    {/* Config Files */}
    <rect x="50" y="45" width="150" height="80" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="125" y="70" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Config Files</text>
    <text x="125" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">dashboards.yaml</text>
    <text x="125" y="103" textAnchor="middle" fill="#fcd34d" fontSize="8">datasources.yaml</text>
    <text x="125" y="118" textAnchor="middle" fill="#fcd34d" fontSize="8">alerting.yaml</text>

    {/* Grafana Instance */}
    <rect x="280" y="45" width="180" height="80" rx="8" fill="rgba(245, 124, 0, 0.3)" stroke="#f57c00" strokeWidth="2"/>
    <text x="370" y="75" textAnchor="middle" fill="#f57c00" fontSize="12" fontWeight="bold">Grafana</text>
    <text x="370" y="95" textAnchor="middle" fill="#ff9800" fontSize="8">/provisioning/</text>
    <text x="370" y="110" textAnchor="middle" fill="#ff9800" fontSize="8">Auto-reload on change</text>

    {/* Terraform */}
    <rect x="540" y="40" width="100" height="45" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="590" y="60" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Terraform</text>
    <text x="590" y="77" textAnchor="middle" fill="#c4b5fd" fontSize="8">grafana_*</text>

    {/* Kubernetes */}
    <rect x="540" y="95" width="100" height="45" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="590" y="115" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">K8s</text>
    <text x="590" y="132" textAnchor="middle" fill="#86efac" fontSize="8">ConfigMaps</text>

    {/* Git */}
    <rect x="700" y="55" width="80" height="60" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="740" y="80" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Git</text>
    <text x="740" y="98" textAnchor="middle" fill="#fbcfe8" fontSize="8">Version</text>
    <text x="740" y="111" textAnchor="middle" fill="#fbcfe8" fontSize="8">Control</text>

    {/* Arrows */}
    <path d="M 200 85 L 275 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowProv)"/>
    <path d="M 460 70 L 535 60" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3"/>
    <path d="M 460 100 L 535 115" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3"/>
    <path d="M 640 85 L 695 85" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3"/>

    {/* Footer */}
    <rect x="100" y="150" width="600" height="35" rx="4" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1"/>
    <text x="400" y="172" textAnchor="middle" fill="#4ade80" fontSize="9">Infrastructure as Code: Dashboards, Data Sources, Alerts all versioned and reproducible</text>
  </svg>
)

// Panel Types Diagram
const PanelTypesDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Grafana Panel Types</text>

    {/* Row 1 */}
    <rect x="50" y="45" width="140" height="65" rx="6" fill="rgba(245, 124, 0, 0.2)" stroke="#f57c00" strokeWidth="2"/>
    <text x="120" y="70" textAnchor="middle" fill="#f57c00" fontSize="10" fontWeight="bold">Time Series</text>
    <text x="120" y="88" textAnchor="middle" fill="#ff9800" fontSize="7">Line/Area Charts</text>
    <text x="120" y="100" textAnchor="middle" fill="#ff9800" fontSize="7">Multiple queries</text>

    <rect x="210" y="45" width="140" height="65" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="280" y="70" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Stat</text>
    <text x="280" y="88" textAnchor="middle" fill="#86efac" fontSize="7">Single value</text>
    <text x="280" y="100" textAnchor="middle" fill="#86efac" fontSize="7">Thresholds</text>

    <rect x="370" y="45" width="140" height="65" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="440" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Gauge</text>
    <text x="440" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="7">Progress indicator</text>
    <text x="440" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="7">Min/Max ranges</text>

    <rect x="530" y="45" width="140" height="65" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="600" y="70" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Bar Chart</text>
    <text x="600" y="88" textAnchor="middle" fill="#fbcfe8" fontSize="7">Comparisons</text>
    <text x="600" y="100" textAnchor="middle" fill="#fbcfe8" fontSize="7">Horizontal/Vertical</text>

    {/* Row 2 */}
    <rect x="130" y="125" width="140" height="65" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="200" y="150" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Table</text>
    <text x="200" y="168" textAnchor="middle" fill="#67e8f9" fontSize="7">Tabular data</text>
    <text x="200" y="180" textAnchor="middle" fill="#67e8f9" fontSize="7">Sorting/filtering</text>

    <rect x="290" y="125" width="140" height="65" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="360" y="150" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Heatmap</text>
    <text x="360" y="168" textAnchor="middle" fill="#fca5a5" fontSize="7">Distribution</text>
    <text x="360" y="180" textAnchor="middle" fill="#fca5a5" fontSize="7">Time buckets</text>

    <rect x="450" y="125" width="140" height="65" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="520" y="150" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Logs</text>
    <text x="520" y="168" textAnchor="middle" fill="#fcd34d" fontSize="7">Log messages</text>
    <text x="520" y="180" textAnchor="middle" fill="#fcd34d" fontSize="7">Search/Filter</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Grafana({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'dashboards',
      name: 'Grafana Dashboards',
      icon: '📊',
      color: '#f57c00',
      description: 'Panel types: Time series, Stat, Gauge, Bar chart, Table, Heatmap, Logs. Row-based layout with drag-drop. JSON model for version control.',
      diagram: GrafanaDashboardDiagram,
      details: [
        {
          name: 'Dashboard Basics & Panels',
          diagram: PanelTypesDiagram,
          explanation: 'Grafana is an open-source analytics and visualization platform that transforms time-series data into insightful dashboards. Dashboards are the primary way to display data in Grafana, consisting of one or more panels arranged in rows. Panels are the building blocks - common types include Graph/Time Series for line charts, Stat for single values with thresholds, Gauge for showing progress, Table for tabular data, Heatmap for distribution visualization, Bar chart for comparisons, and Logs for log data. Each panel can have its own data source and queries.',
          codeExample: `// Dashboard JSON Structure
{
  "dashboard": {
    "id": null,
    "uid": "app-performance",
    "title": "Application Performance",
    "tags": ["production", "api"],
    "timezone": "browser",
    "schemaVersion": 38,
    "refresh": "30s",
    "time": {
      "from": "now-6h",
      "to": "now"
    },
    "panels": [],
    "templating": { "list": [] },
    "annotations": { "list": [] }
  },
  "folderId": 0,
  "folderUid": "prod-dashboards",
  "overwrite": false
}

// Time Series Panel JSON
{
  "id": 1,
  "type": "timeseries",
  "title": "Request Rate",
  "gridPos": { "x": 0, "y": 0, "w": 12, "h": 8 },
  "datasource": { "type": "prometheus", "uid": "prometheus" },
  "targets": [
    {
      "expr": "rate(http_requests_total{job=\\"api\\"}[5m])",
      "legendFormat": "{{method}} {{path}}",
      "refId": "A"
    }
  ],
  "fieldConfig": {
    "defaults": {
      "color": { "mode": "palette-classic" },
      "custom": {
        "drawStyle": "line",
        "lineWidth": 2,
        "fillOpacity": 10
      },
      "unit": "reqps"
    }
  }
}`
        },
        {
          name: 'Variables & Templating',
          diagram: TemplatingDiagram,
          explanation: 'Variables make dashboards dynamic and reusable. Types include: Query variables (populated from data source), Custom variables (predefined values), Datasource variables (switch between data sources), Interval variables (time granularity). Variables appear as dropdowns and can be used in queries with $variable syntax. They enable filtering and reuse across environments and services.',
          codeExample: `// Template Variables Configuration
{
  "templating": {
    "list": [
      {
        "name": "datasource",
        "type": "datasource",
        "query": "prometheus",
        "current": { "text": "Prometheus", "value": "prometheus" },
        "hide": 0
      },
      {
        "name": "environment",
        "type": "query",
        "datasource": { "type": "prometheus", "uid": "$datasource" },
        "query": "label_values(up, env)",
        "refresh": 2,
        "sort": 1,
        "multi": false,
        "includeAll": true,
        "allValue": ".*"
      },
      {
        "name": "service",
        "type": "query",
        "datasource": { "type": "prometheus", "uid": "$datasource" },
        "query": "label_values(up{env=~\\"$environment\\"}, service)",
        "refresh": 2,
        "sort": 1,
        "multi": true,
        "includeAll": true
      },
      {
        "name": "interval",
        "type": "interval",
        "query": "1m,5m,15m,1h,6h,1d",
        "current": { "text": "5m", "value": "5m" },
        "auto": true,
        "auto_min": "1m"
      }
    ]
  }
}

// Using Variables in PromQL
rate(http_requests_total{env=~"$environment", service=~"$service"}[$interval])`
        },
        {
          name: 'Annotations & Sharing',
          explanation: 'Annotations mark events on time series graphs - deployments, incidents, or other significant events. They can be created manually or from data sources and are shared across panels. Dashboards can be shared via link (with current time range and variables), snapshot (static export), embed (iframe for external sites), or export as JSON for version control. Public dashboards allow anonymous viewing.',
          codeExample: `// Annotations Configuration
{
  "annotations": {
    "list": [
      {
        "name": "Deployments",
        "datasource": { "type": "prometheus", "uid": "prometheus" },
        "enable": true,
        "iconColor": "#2196F3",
        "expr": "changes(deployment_timestamp{app=~\\"$service\\"}[1m]) > 0",
        "titleFormat": "Deployment",
        "textFormat": "{{app}} deployed version {{version}}",
        "tagKeys": "app,version",
        "type": "dashboard"
      },
      {
        "name": "Incidents",
        "datasource": { "type": "loki", "uid": "loki" },
        "enable": true,
        "iconColor": "#F44336",
        "expr": "{job=\\"incidents\\"} |= \\"severity=critical\\"",
        "titleFormat": "Incident",
        "type": "dashboard"
      }
    ]
  }
}

// Embed Panel in External Site
<iframe
  src="https://grafana.example.com/d-solo/app-performance/
    application-performance?orgId=1&panelId=1&from=now-6h&to=now&theme=dark"
  width="800"
  height="400"
  frameborder="0">
</iframe>

// Public Dashboard Configuration
{
  "uid": "app-performance",
  "isPublic": true,
  "publicDashboard": {
    "isEnabled": true,
    "annotationsEnabled": false,
    "timeSelectionEnabled": true
  }
}`
        }
      ]
    },
    {
      id: 'data-sources',
      name: 'Data Sources & Queries',
      icon: '🔗',
      color: '#1976d2',
      description: 'Native support for Prometheus, Loki, InfluxDB, Elasticsearch, CloudWatch, MySQL/PostgreSQL. Mixed data source queries in single panel.',
      diagram: DataSourceDiagram,
      details: [
        {
          name: 'Prometheus & PromQL',
          explanation: 'Prometheus is the most common data source for Grafana, using PromQL for queries. Example queries: rate(http_requests_total[5m]) for request rate, histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) for P95 latency. Supports instant and range queries. Prometheus alerting rules can be visualized and exemplar traces can link to distributed tracing systems.',
          codeExample: `# Prometheus Data Source Provisioning
# /etc/grafana/provisioning/datasources/prometheus.yaml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false
    jsonData:
      timeInterval: "15s"
      httpMethod: POST
      exemplarTraceIdDestinations:
        - name: traceID
          datasourceUid: tempo

# Common PromQL Queries
# Request Rate
rate(http_requests_total{job="api"}[5m])

# Error Rate Percentage
sum(rate(http_requests_total{status=~"5.."}[5m]))
  / sum(rate(http_requests_total[5m])) * 100

# P95 Latency
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
)

# CPU Usage by Instance
100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory Usage
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes)
  / node_memory_MemTotal_bytes * 100`
        },
        {
          name: 'Loki & SQL Databases',
          explanation: 'Loki is Grafana\'s log aggregation system using LogQL. Filter logs by label: {job="webapp"}. Pattern matching: {job="webapp"} |= "error". Metrics from logs: sum(count_over_time({job="webapp"}[1m])). For SQL databases (MySQL, PostgreSQL), use time-based queries with $__timeFilter() macro and $__timeGroup() for grouping. Table transformations are available for both.',
          codeExample: `# Loki Data Source Provisioning
apiVersion: 1
datasources:
  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    jsonData:
      maxLines: 1000
      derivedFields:
        - name: TraceID
          matcherRegex: "traceID=(\\\\w+)"
          url: '$\${__value.raw}'
          datasourceUid: tempo

# LogQL Query Examples
{job="webapp", env="production"}
{job="webapp"} |= "error"
{job="webapp"} | json | level="error"
sum(rate({job="webapp"} |= "error" [5m])) by (service)

# PostgreSQL Data Source
datasources:
  - name: PostgreSQL
    type: postgres
    url: postgres-server:5432
    database: metrics_db
    user: grafana_reader
    secureJsonData:
      password: \${PG_PASSWORD}
    jsonData:
      sslmode: require
      postgresVersion: 1500

# SQL Query with Macros
SELECT
  $__timeGroup(created_at, $__interval) AS time,
  service_name AS metric,
  avg(response_time_ms) AS value
FROM api_requests
WHERE $__timeFilter(created_at)
  AND environment = '$environment'
GROUP BY 1, 2
ORDER BY 1`
        },
        {
          name: 'Cloud & Mixed Sources',
          explanation: 'Native support for AWS CloudWatch, Azure Monitor, and Google Cloud Monitoring. Query metrics and logs from cloud services using IAM roles or service accounts. Panels can query multiple data sources simultaneously using Mixed mode - each query can target a different source. Transformations can join data from multiple queries for correlating metrics across systems.',
          codeExample: `# AWS CloudWatch Data Source
apiVersion: 1
datasources:
  - name: CloudWatch
    type: cloudwatch
    jsonData:
      authType: default  # Uses IAM role
      defaultRegion: us-east-1
      customMetricsNamespaces: "CustomApp,MyService"
      assumeRoleArn: arn:aws:iam::123456789:role/GrafanaCloudWatch

# CloudWatch Query
{
  "region": "us-east-1",
  "namespace": "AWS/EC2",
  "metricName": "CPUUtilization",
  "dimensions": { "InstanceId": ["i-1234567890abcdef0"] },
  "statistics": ["Average"],
  "period": "300"
}

# Mixed Data Source Panel
{
  "datasource": { "type": "mixed", "uid": "-- Mixed --" },
  "targets": [
    {
      "datasource": { "type": "prometheus", "uid": "prometheus" },
      "expr": "rate(http_requests_total[5m])",
      "legendFormat": "Request Rate (Prometheus)",
      "refId": "A"
    },
    {
      "datasource": { "type": "cloudwatch", "uid": "cloudwatch" },
      "namespace": "AWS/ApplicationELB",
      "metricName": "RequestCount",
      "legendFormat": "Request Count (CloudWatch)",
      "refId": "B"
    }
  ],
  "transformations": [
    { "id": "merge", "options": {} }
  ]
}`
        }
      ]
    },
    {
      id: 'alerting',
      name: 'Alerting',
      icon: '🔔',
      color: '#d32f2f',
      description: 'Unified alerting with contact points (Slack/PagerDuty/Email). Silences for maintenance, notification policies for routing, alert groups for correlation.',
      diagram: AlertingFlowDiagram,
      details: [
        {
          name: 'Alert Rules & States',
          explanation: 'Alert rules define conditions using queries with evaluation interval (how often to check) and "for" duration (how long condition must be true). Multiple conditions can be combined with AND/OR. Alerts have states: Normal (condition not met), Pending (condition met, waiting for "for" duration), Alerting/Firing (condition sustained), NoData (query returned no data), Error (query failed). Configure NoData and Error handling per rule.',
          codeExample: `# Alert Rule Provisioning YAML
apiVersion: 1
groups:
  - orgId: 1
    name: api-alerts
    folder: Production Alerts
    interval: 1m
    rules:
      - uid: high-error-rate
        title: High Error Rate
        condition: C
        data:
          - refId: A
            datasourceUid: prometheus
            model:
              expr: sum(rate(http_requests_total{status=~"5.."}[5m]))
          - refId: B
            datasourceUid: prometheus
            model:
              expr: sum(rate(http_requests_total[5m]))
          - refId: C
            datasourceUid: __expr__
            model:
              type: math
              expression: ($A / $B) * 100 > 5
        for: 5m
        annotations:
          summary: "Error rate is {{ $values.C }}%"
          description: "Error rate exceeded 5% threshold"
        labels:
          severity: critical
          team: platform
        noDataState: NoData    # Options: OK, NoData, Alerting
        execErrState: Error    # Options: OK, Error, Alerting`
        },
        {
          name: 'Contact Points & Routing',
          explanation: 'Contact points define where alerts are sent - Email, Slack, PagerDuty, OpsGenie, Microsoft Teams, Webhook, and more. Configure message templates with alert labels and annotations. Notification policies route alerts to contact points based on labels using tree structure with nested routes. Configure group_by to batch related alerts, and timing: group_wait, group_interval, repeat_interval.',
          codeExample: `# Contact Points Provisioning
apiVersion: 1
contactPoints:
  - orgId: 1
    name: platform-team
    receivers:
      - uid: slack-platform
        type: slack
        settings:
          recipient: "#platform-alerts"
          token: \${SLACK_TOKEN}
          text: |
            {{ range .Alerts }}
            *{{ .Labels.alertname }}*
            Status: {{ .Status }}
            Severity: {{ .Labels.severity }}
            {{ end }}
      - uid: pagerduty-platform
        type: pagerduty
        settings:
          integrationKey: \${PAGERDUTY_KEY}
          severity: "{{ .CommonLabels.severity }}"

# Notification Policies
apiVersion: 1
policies:
  - orgId: 1
    receiver: default-receiver
    group_by: ['alertname', 'service']
    group_wait: 30s
    group_interval: 5m
    repeat_interval: 4h
    routes:
      - receiver: pagerduty-oncall
        matchers:
          - severity = critical
        group_wait: 0s
        repeat_interval: 1h
      - receiver: slack-warnings
        matchers:
          - severity = warning
        repeat_interval: 12h`
        },
        {
          name: 'Silences & Provisioning',
          explanation: 'Silences temporarily mute alerts during maintenance windows. Match alerts by labels, set start/end time. Silences don\'t prevent alert evaluation, just notification. Define alerts as code using YAML files in provisioning/alerting/ directory for rules, contact points, notification policies. Version control and automated deployment with GitOps. Test alerts in staging before production.',
          codeExample: `# Create Silence via API
# POST /api/alertmanager/grafana/api/v2/silences
{
  "matchers": [
    { "name": "service", "value": "api-gateway", "isEqual": true },
    { "name": "env", "value": "production", "isEqual": true }
  ],
  "startsAt": "2024-01-15T00:00:00Z",
  "endsAt": "2024-01-15T04:00:00Z",
  "createdBy": "platform-team",
  "comment": "Scheduled maintenance for API gateway upgrade"
}

# Mute Time Intervals
apiVersion: 1
muteTimes:
  - orgId: 1
    name: nights-and-weekends
    time_intervals:
      - times:
          - start_time: "22:00"
            end_time: "06:00"
        weekdays: ["monday:friday"]
      - weekdays: ["saturday", "sunday"]

# Complete Provisioning Structure
/etc/grafana/provisioning/alerting/
├── alert-rules.yaml
├── contactpoints.yaml
├── policies.yaml
└── mute-times.yaml`
        }
      ]
    },
    {
      id: 'provisioning',
      name: 'Provisioning & Automation',
      icon: '⚙️',
      color: '#388e3c',
      description: 'YAML-based dashboard and data source provisioning. Terraform provider for resource management. Docker/Kubernetes deployment with ConfigMaps.',
      diagram: ProvisioningDiagram,
      details: [
        {
          name: 'Dashboard & Data Source Provisioning',
          explanation: 'Auto-load dashboards from files in provisioning/dashboards/. Configure folder, update interval, and source path. Dashboard JSON files are automatically loaded. Set disableDeletion to protect dashboards, allowUiUpdates enables editing. For data sources, configure via YAML in provisioning/datasources/ with type, URL, access mode, and authentication. Use environment variables for secrets.',
          codeExample: `# Dashboard Provisioning
# /etc/grafana/provisioning/dashboards/default.yaml
apiVersion: 1
providers:
  - name: 'default'
    orgId: 1
    folder: 'Production'
    folderUid: 'production'
    type: file
    disableDeletion: true
    allowUiUpdates: false
    updateIntervalSeconds: 30
    options:
      path: /var/lib/grafana/dashboards
      foldersFromFilesStructure: true

# Data Source Provisioning
# /etc/grafana/provisioning/datasources/datasources.yaml
apiVersion: 1
deleteDatasources:
  - name: Old-Prometheus
    orgId: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false
    uid: prometheus
    jsonData:
      timeInterval: "15s"
      httpMethod: POST
      manageAlerts: true

  - name: PostgreSQL
    type: postgres
    url: postgres:5432
    database: app_db
    user: grafana
    secureJsonData:
      password: \${PG_PASSWORD}`
        },
        {
          name: 'Terraform Provider',
          explanation: 'Manage Grafana resources with Terraform using the grafana provider. Create data sources, dashboards, folders, alert rules programmatically. grafana_dashboard resource accepts JSON config, grafana_data_source for connections. Supports organizational units and state management for drift detection. Integrates with CI/CD pipelines for GitOps workflows.',
          codeExample: `# Terraform Grafana Provider
terraform {
  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 2.0"
    }
  }
}

provider "grafana" {
  url  = "https://grafana.example.com"
  auth = var.grafana_api_key
}

# Create Folder
resource "grafana_folder" "production" {
  title = "Production"
  uid   = "production"
}

# Create Data Source
resource "grafana_data_source" "prometheus" {
  type = "prometheus"
  name = "Prometheus"
  url  = "http://prometheus:9090"

  json_data_encoded = jsonencode({
    httpMethod   = "POST"
    manageAlerts = true
  })
}

# Create Dashboard from JSON
resource "grafana_dashboard" "api_performance" {
  folder      = grafana_folder.production.id
  config_json = file("dashboards/api-performance.json")
  overwrite   = true
}

# Service Account for API access
resource "grafana_service_account" "automation" {
  name = "automation"
  role = "Editor"
}

resource "grafana_service_account_token" "automation" {
  name               = "automation-token"
  service_account_id = grafana_service_account.automation.id
}`
        },
        {
          name: 'Docker & Kubernetes',
          explanation: 'Official Docker image: grafana/grafana. Mount volumes for persistence and provisioning. Use ConfigMaps for provisioning in Kubernetes. Helm chart available for deployment. Environment variables for configuration override grafana.ini settings using GF_SECTION_KEY=value pattern. Init containers can prepare dashboards.',
          codeExample: `# Docker Compose Configuration
version: '3.8'
services:
  grafana:
    image: grafana/grafana:10.2.0
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=\${GRAFANA_ADMIN_PASSWORD}
      - GF_USERS_ALLOW_SIGN_UP=false
      - GF_SERVER_ROOT_URL=https://grafana.example.com
    volumes:
      - grafana-data:/var/lib/grafana
      - ./provisioning:/etc/grafana/provisioning
      - ./dashboards:/var/lib/grafana/dashboards
    restart: unless-stopped

# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    spec:
      containers:
        - name: grafana
          image: grafana/grafana:10.2.0
          ports:
            - containerPort: 3000
          env:
            - name: GF_SECURITY_ADMIN_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: grafana-secrets
                  key: admin-password
          volumeMounts:
            - name: datasources
              mountPath: /etc/grafana/provisioning/datasources
            - name: dashboards
              mountPath: /var/lib/grafana/dashboards
      volumes:
        - name: datasources
          configMap:
            name: grafana-datasources
        - name: dashboards
          configMap:
            name: grafana-dashboards

# Helm Installation
helm install grafana grafana/grafana \\
  --set adminPassword=secret \\
  --set persistence.enabled=true`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'DevOps', icon: '🛠️', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'Grafana', icon: '📊', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Grafana', icon: '📊' })
    }

    return stack
  }

  const handleBreadcrumbClick = (index) => {
    const stack = buildBreadcrumbStack()
    if (stack[index].onClick) {
      stack[index].onClick()
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #78350f 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ff9800, #f57c00)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(245, 124, 0, 0.2)',
    border: '1px solid rgba(245, 124, 0, 0.3)',
    borderRadius: '0.5rem',
    color: '#f57c00',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  const navButtonStyle = {
    padding: '0.75rem 1.25rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            style={backButtonStyle}
            onClick={onBack}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(245, 124, 0, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(245, 124, 0, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to DevOps
          </button>
          <h1 style={titleStyle}>Grafana</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              style={navButtonStyle}
              onClick={onNext}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={GRAFANA_COLORS}
        />
      </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={GRAFANA_COLORS.primary}
      />


      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics • Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Concept */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={GRAFANA_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >→</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="yaml"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default Grafana

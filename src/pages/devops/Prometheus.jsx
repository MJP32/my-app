import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

const PROMETHEUS_COLORS = {
  primary: '#e85d1f',
  primaryHover: '#ff7043',
  bg: 'rgba(232, 93, 31, 0.1)',
  border: 'rgba(232, 93, 31, 0.3)',
  arrow: '#e85d1f',
  hoverBg: 'rgba(232, 93, 31, 0.2)',
  topicBg: 'rgba(232, 93, 31, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// Prometheus Architecture Diagram - Pull-based architecture with targets, scraping, storage
const PrometheusArchitectureDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="promArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Prometheus Pull-Based Architecture</text>

    {/* Targets */}
    <rect x="30" y="60" width="100" height="45" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="80" y="80" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">App :8080</text>
    <text x="80" y="95" textAnchor="middle" fill="#86efac" fontSize="8">/metrics</text>

    <rect x="30" y="115" width="100" height="45" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="80" y="135" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Node :9100</text>
    <text x="80" y="150" textAnchor="middle" fill="#86efac" fontSize="8">Exporter</text>

    <rect x="30" y="170" width="100" height="45" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="80" y="190" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">MySQL :9104</text>
    <text x="80" y="205" textAnchor="middle" fill="#86efac" fontSize="8">Exporter</text>

    {/* Service Discovery */}
    <rect x="170" y="100" width="100" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="220" y="125" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Service</text>
    <text x="220" y="142" textAnchor="middle" fill="#fcd34d" fontSize="9">Discovery</text>
    <text x="220" y="155" textAnchor="middle" fill="#fcd34d" fontSize="7">K8s/Consul/EC2</text>

    {/* Prometheus Server */}
    <rect x="310" y="70" width="180" height="120" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Prometheus Server</text>
    <rect x="325" y="105" width="70" height="30" rx="4" fill="rgba(255,255,255,0.2)"/>
    <text x="360" y="124" textAnchor="middle" fill="white" fontSize="8">Scraper</text>
    <rect x="405" y="105" width="70" height="30" rx="4" fill="rgba(255,255,255,0.2)"/>
    <text x="440" y="124" textAnchor="middle" fill="white" fontSize="8">TSDB</text>
    <rect x="325" y="145" width="70" height="30" rx="4" fill="rgba(255,255,255,0.2)"/>
    <text x="360" y="164" textAnchor="middle" fill="white" fontSize="8">PromQL</text>
    <rect x="405" y="145" width="70" height="30" rx="4" fill="rgba(255,255,255,0.2)"/>
    <text x="440" y="164" textAnchor="middle" fill="white" fontSize="8">Rules</text>

    {/* Alertmanager */}
    <rect x="530" y="60" width="110" height="55" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="585" y="85" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Alertmanager</text>
    <text x="585" y="102" textAnchor="middle" fill="#fca5a5" fontSize="8">{`Route & Notify`}</text>

    {/* Grafana */}
    <rect x="530" y="130" width="110" height="55" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="585" y="155" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Grafana</text>
    <text x="585" y="172" textAnchor="middle" fill="#c4b5fd" fontSize="8">Dashboards</text>

    {/* Remote Storage */}
    <rect x="680" y="95" width="100" height="55" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="730" y="118" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Remote</text>
    <text x="730" y="135" textAnchor="middle" fill="#67e8f9" fontSize="8">Storage</text>

    {/* Arrows */}
    <line x1="130" y1="82" x2="165" y2="115" stroke="#60a5fa" strokeWidth="1.5"/>
    <line x1="130" y1="137" x2="165" y2="130" stroke="#60a5fa" strokeWidth="1.5"/>
    <line x1="130" y1="192" x2="165" y2="145" stroke="#60a5fa" strokeWidth="1.5"/>
    <line x1="270" y1="130" x2="305" y2="130" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#promArrow)"/>
    <text x="287" y="122" fill="#93c5fd" fontSize="7">targets</text>

    <path d="M 310 100 Q 280 82, 130 82" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#promArrow)"/>
    <text x="200" y="72" fill="#4ade80" fontSize="7">PULL /metrics</text>

    <line x1="490" y1="87" x2="525" y2="87" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#promArrow)"/>
    <text x="507" y="80" fill="#f87171" fontSize="7">alerts</text>

    <line x1="490" y1="157" x2="525" y2="157" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#promArrow)"/>
    <text x="507" y="150" fill="#a78bfa" fontSize="7">query</text>

    <line x1="490" y1="122" x2="675" y2="122" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#promArrow)"/>
    <text x="582" y="115" fill="#22d3ee" fontSize="7">remote write</text>
  </svg>
)

// Metric Types Diagram - Counter, Gauge, Histogram, Summary
const MetricTypesDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Prometheus Metric Types</text>

    {/* Counter */}
    <rect x="30" y="50" width="170" height="130" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="115" y="75" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">Counter</text>
    <polyline points="50,160 80,150 110,135 140,115 170,90" fill="none" stroke="#60a5fa" strokeWidth="2"/>
    <text x="115" y="178" textAnchor="middle" fill="#93c5fd" fontSize="9">Only increases</text>
    <text x="115" y="100" textAnchor="end" fill="#60a5fa" fontSize="8">http_requests_total</text>

    {/* Gauge */}
    <rect x="220" y="50" width="170" height="130" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="305" y="75" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">Gauge</text>
    <polyline points="240,130 270,110 300,140 330,100 360,120" fill="none" stroke="#4ade80" strokeWidth="2"/>
    <text x="305" y="178" textAnchor="middle" fill="#86efac" fontSize="9">Up and down</text>
    <text x="305" y="100" textAnchor="end" fill="#4ade80" fontSize="8">temperature_celsius</text>

    {/* Histogram */}
    <rect x="410" y="50" width="170" height="130" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="495" y="75" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">Histogram</text>
    <rect x="430" y="140" width="20" height="30" fill="#fbbf24"/>
    <rect x="455" y="120" width="20" height="50" fill="#fbbf24"/>
    <rect x="480" y="100" width="20" height="70" fill="#fbbf24"/>
    <rect x="505" y="130" width="20" height="40" fill="#fbbf24"/>
    <rect x="530" y="150" width="20" height="20" fill="#fbbf24"/>
    <text x="495" y="178" textAnchor="middle" fill="#fcd34d" fontSize="9">Buckets + count + sum</text>

    {/* Summary */}
    <rect x="600" y="50" width="170" height="130" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="685" y="75" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">Summary</text>
    <line x1="620" y1="130" x2="750" y2="130" stroke="#a78bfa" strokeWidth="1"/>
    <text x="630" y="110" fill="#c4b5fd" fontSize="9">p50</text>
    <line x1="620" y1="115" x2="750" y2="115" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3"/>
    <text x="630" y="100" fill="#c4b5fd" fontSize="9">p90</text>
    <line x1="620" y1="95" x2="750" y2="95" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3"/>
    <text x="630" y="145" fill="#c4b5fd" fontSize="9">p99</text>
    <line x1="620" y1="150" x2="750" y2="150" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3"/>
    <text x="685" y="178" textAnchor="middle" fill="#c4b5fd" fontSize="9">Quantiles + count + sum</text>
  </svg>
)

// PromQL Diagram - Query flow and examples
const PromQLDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="promqlArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">PromQL Query Flow</text>

    {/* Query Input */}
    <rect x="30" y="50" width="180" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">PromQL Query</text>
    <text x="120" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">rate(http_requests[5m])</text>

    {/* Selection */}
    <rect x="250" y="50" width="140" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="320" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Selector</text>
    <text x="320" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">{'{job="api"}'}</text>

    {/* Functions */}
    <rect x="430" y="50" width="140" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="500" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Functions</text>
    <text x="500" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">rate, sum, avg, max</text>

    {/* Result */}
    <rect x="610" y="50" width="160" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="690" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Result</text>
    <text x="690" y="95" textAnchor="middle" fill="#86efac" fontSize="8">Instant/Range Vector</text>

    {/* Arrows */}
    <line x1="210" y1="80" x2="245" y2="80" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#promqlArrow)"/>
    <line x1="390" y1="80" x2="425" y2="80" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#promqlArrow)"/>
    <line x1="570" y1="80" x2="605" y2="80" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#promqlArrow)"/>

    {/* Common Operations */}
    <rect x="50" y="130" width="700" height="75" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="400" y="150" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Common PromQL Operations</text>

    <text x="80" y="172" fill="#93c5fd" fontSize="9">rate() - per-second rate</text>
    <text x="80" y="192" fill="#93c5fd" fontSize="9">irate() - instant rate</text>

    <text x="260" y="172" fill="#93c5fd" fontSize="9">sum() by (label)</text>
    <text x="260" y="192" fill="#93c5fd" fontSize="9">avg() without (label)</text>

    <text x="440" y="172" fill="#93c5fd" fontSize="9">histogram_quantile()</text>
    <text x="440" y="192" fill="#93c5fd" fontSize="9">increase() over time</text>

    <text x="620" y="172" fill="#93c5fd" fontSize="9">topk(n, metric)</text>
    <text x="620" y="192" fill="#93c5fd" fontSize="9">offset 1h</text>
  </svg>
)

// Alerting Diagram - Alertmanager integration flow
const AlertingDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="alertArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f87171" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Prometheus Alerting Flow</text>

    {/* Prometheus with Alert Rules */}
    <rect x="30" y="55" width="160" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Prometheus</text>
    <rect x="45" y="90" width="130" height="35" rx="4" fill="rgba(255,255,255,0.2)"/>
    <text x="110" y="108" textAnchor="middle" fill="white" fontSize="9">Alert Rules</text>
    <text x="110" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="7">expr: up == 0</text>

    {/* Alert States */}
    <rect x="230" y="55" width="130" height="80" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="295" y="78" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Alert States</text>
    <text x="295" y="98" textAnchor="middle" fill="#fcd34d" fontSize="9">Inactive</text>
    <text x="295" y="113" textAnchor="middle" fill="#fcd34d" fontSize="9">Pending (for: 5m)</text>
    <text x="295" y="128" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Firing</text>

    {/* Alertmanager */}
    <rect x="400" y="45" width="180" height="100" rx="8" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="490" y="70" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Alertmanager</text>
    <rect x="415" y="80" width="70" height="25" rx="4" fill="rgba(239, 68, 68, 0.3)"/>
    <text x="450" y="97" textAnchor="middle" fill="#fca5a5" fontSize="8">Grouping</text>
    <rect x="495" y="80" width="70" height="25" rx="4" fill="rgba(239, 68, 68, 0.3)"/>
    <text x="530" y="97" textAnchor="middle" fill="#fca5a5" fontSize="8">Inhibition</text>
    <rect x="415" y="110" width="70" height="25" rx="4" fill="rgba(239, 68, 68, 0.3)"/>
    <text x="450" y="127" textAnchor="middle" fill="#fca5a5" fontSize="8">Silencing</text>
    <rect x="495" y="110" width="70" height="25" rx="4" fill="rgba(239, 68, 68, 0.3)"/>
    <text x="530" y="127" textAnchor="middle" fill="#fca5a5" fontSize="8">Routing</text>

    {/* Notification Channels */}
    <rect x="620" y="45" width="70" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="655" y="67" textAnchor="middle" fill="#4ade80" fontSize="9">Slack</text>

    <rect x="700" y="45" width="80" height="35" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="740" y="67" textAnchor="middle" fill="#a78bfa" fontSize="9">PagerDuty</text>

    <rect x="620" y="90" width="70" height="35" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="655" y="112" textAnchor="middle" fill="#22d3ee" fontSize="9">Email</text>

    <rect x="700" y="90" width="80" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="740" y="112" textAnchor="middle" fill="#fbbf24" fontSize="9">Webhook</text>

    {/* Arrows */}
    <line x1="190" y1="95" x2="225" y2="95" stroke="#f87171" strokeWidth="2" markerEnd="url(#alertArrow)"/>
    <text x="207" y="88" fill="#f87171" fontSize="7">eval</text>

    <line x1="360" y1="95" x2="395" y2="95" stroke="#f87171" strokeWidth="2" markerEnd="url(#alertArrow)"/>
    <text x="377" y="88" fill="#f87171" fontSize="7">fire</text>

    <line x1="580" y1="62" x2="615" y2="62" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#alertArrow)"/>
    <line x1="580" y1="107" x2="615" y2="107" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#alertArrow)"/>

    {/* Alert Example */}
    <rect x="100" y="160" width="600" height="45" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1"/>
    <text x="400" y="180" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Alert Rule Example</text>
    <text x="400" y="197" textAnchor="middle" fill="#fca5a5" fontSize="9">{`alert: HighErrorRate | expr: rate(errors[5m]) &gt; 0.1 | for: 5m | severity: critical`}</text>
  </svg>
)

// Exporters Diagram
const ExportersDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Prometheus Exporters Ecosystem</text>
    <rect x="30" y="50" width="140" height="70" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Node Exporter</text>
    <text x="100" y="95" textAnchor="middle" fill="#86efac" fontSize="8">CPU, Memory, Disk</text>
    <text x="100" y="110" textAnchor="middle" fill="#86efac" fontSize="8">:9100/metrics</text>
    <rect x="190" y="50" width="140" height="70" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="260" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Blackbox</text>
    <text x="260" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">HTTP, TCP, ICMP</text>
    <text x="260" y="110" textAnchor="middle" fill="#93c5fd" fontSize="8">:9115/probe</text>
    <rect x="350" y="50" width="140" height="70" rx="8" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="420" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">DB Exporters</text>
    <text x="420" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">MySQL, Postgres</text>
    <text x="420" y="110" textAnchor="middle" fill="#fcd34d" fontSize="8">MongoDB, Redis</text>
    <rect x="510" y="50" width="140" height="70" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="580" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Custom</text>
    <text x="580" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">Client Libraries</text>
    <text x="580" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="8">Go, Java, Python</text>
    <rect x="670" y="50" width="110" height="70" rx="8" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="725" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Pushgateway</text>
    <text x="725" y="95" textAnchor="middle" fill="#fca5a5" fontSize="8">Batch Jobs</text>
    <text x="725" y="110" textAnchor="middle" fill="#fca5a5" fontSize="8">:9091/metrics</text>
    <rect x="300" y="140" width="200" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="170" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Prometheus Server</text>
    <line x1="100" y1="120" x2="300" y2="150" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4"/>
    <line x1="260" y1="120" x2="350" y2="145" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4"/>
    <line x1="420" y1="120" x2="400" y2="140" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4"/>
    <line x1="580" y1="120" x2="450" y2="145" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4"/>
    <line x1="725" y1="120" x2="500" y2="150" stroke="#f87171" strokeWidth="1.5" strokeDasharray="4"/>
  </svg>
)

// Operations Best Practices Diagram
const OperationsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">{`Prometheus Operations & HA`}</text>
    <rect x="30" y="50" width="220" height="130" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">High Availability</text>
    <rect x="50" y="90" width="80" height="35" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="90" y="112" textAnchor="middle" fill="#93c5fd" fontSize="9">Prom 1</text>
    <rect x="150" y="90" width="80" height="35" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="190" y="112" textAnchor="middle" fill="#93c5fd" fontSize="9">Prom 2</text>
    <text x="140" y="145" textAnchor="middle" fill="#93c5fd" fontSize="8">Same targets</text>
    <text x="140" y="160" textAnchor="middle" fill="#93c5fd" fontSize="8">Load balanced queries</text>
    <rect x="280" y="50" width="220" height="130" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="390" y="75" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Remote Storage</text>
    <rect x="300" y="90" width="70" height="30" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="335" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="8">Thanos</text>
    <rect x="380" y="90" width="70" height="30" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="415" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="8">Cortex</text>
    <rect x="340" y="130" width="80" height="30" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="380" y="150" textAnchor="middle" fill="#c4b5fd" fontSize="8">VictoriaMetrics</text>
    <rect x="530" y="50" width="240" height="130" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">{`Security & Monitoring`}</text>
    <text x="560" y="100" fill="#86efac" fontSize="9">• TLS for scraping</text>
    <text x="560" y="118" fill="#86efac" fontSize="9">• Basic auth</text>
    <text x="560" y="136" fill="#86efac" fontSize="9">• Cardinality limits</text>
    <text x="560" y="154" fill="#86efac" fontSize="9">• Recording rules</text>
    <text x="560" y="172" fill="#86efac" fontSize="9">• Snapshot backups</text>
  </svg>
)

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

function Prometheus({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'architecture',
      name: 'Prometheus Architecture',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Pull-based scraping at configurable intervals (default 15s). TSDB with 2-hour blocks, compacted to long-term storage. WAL for crash recovery. Service discovery: Kubernetes, Consul, EC2, file-based.',
      diagram: PrometheusArchitectureDiagram,
      details: [
        {
          name: 'Pull Model',
          explanation: 'Prometheus uses a pull-based model where it actively scrapes metrics from HTTP endpoints at configured intervals. This allows Prometheus to know immediately when a target is down (scrape fails). Targets expose metrics at /metrics endpoint in a text-based format. The pull model simplifies target configuration and enables easy service discovery.',
          codeExample: `# prometheus.yml - Basic scrape configuration
global:
  scrape_interval: 15s     # How often to scrape targets
  evaluation_interval: 15s # How often to evaluate rules

scrape_configs:
  # Scrape Prometheus itself
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Scrape application metrics
  - job_name: 'api-server'
    metrics_path: /metrics    # Default endpoint
    scheme: http              # or https
    static_configs:
      - targets:
          - 'api-server-1:8080'
          - 'api-server-2:8080'
        labels:
          env: production
          team: backend`
        },
        {
          name: 'Time Series Database',
          explanation: 'Prometheus includes its own custom time-series database (TSDB) optimized for metrics storage. Data is stored with timestamps and labels for multi-dimensional querying. The database uses efficient compression and supports both local and remote storage. Retention policies control how long data is kept locally.',
          codeExample: `# Prometheus TSDB Configuration (command line flags)
prometheus \\
  --storage.tsdb.path=/prometheus/data \\
  --storage.tsdb.retention.time=15d \\
  --storage.tsdb.retention.size=50GB \\
  --storage.tsdb.wal-compression \\
  --storage.tsdb.min-block-duration=2h \\
  --storage.tsdb.max-block-duration=36h

# PromQL queries for TSDB metrics
prometheus_tsdb_head_series              # Current number of series
prometheus_tsdb_head_chunks              # Current number of chunks
prometheus_tsdb_compactions_total        # Total compactions
prometheus_tsdb_head_samples_appended_total  # Samples ingested

# Check storage status
prometheus_tsdb_storage_blocks_bytes     # Total storage used`
        },
        {
          name: 'Service Discovery',
          explanation: 'Prometheus supports various service discovery mechanisms: Kubernetes SD for pods, services, and endpoints; Consul SD for service registries; EC2, Azure, and GCP SD for cloud instances; File-based SD using JSON/YAML files. This enables automatic target discovery in dynamic environments without manual configuration.',
          codeExample: `# Kubernetes Service Discovery
scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      # Only scrape pods with annotation
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      # Use custom port from annotation
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        target_label: __address__
        regex: (.+)
        replacement: \${1}

  # Consul Service Discovery
  - job_name: 'consul-services'
    consul_sd_configs:
      - server: 'consul.example.com:8500'
        services: ['api', 'web', 'database']

  # File-based Service Discovery
  - job_name: 'file-sd'
    file_sd_configs:
      - files:
          - '/etc/prometheus/targets/*.json'
        refresh_interval: 5m`
        },
        {
          name: 'Configuration',
          explanation: 'The prometheus.yml configuration file defines global settings (scrape_interval, evaluation_interval), alerting rules, scrape configurations for each job, and service discovery settings. Relabel configs allow transforming discovered targets and labels before scraping. Hot-reload is supported with --web.enable-lifecycle flag.',
          codeExample: `# Complete prometheus.yml example
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
        - targets: ['alertmanager:9093']

# Rule files for alerts and recording rules
rule_files:
  - '/etc/prometheus/rules/*.yml'

scrape_configs:
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node1:9100', 'node2:9100']
    # Relabel configuration
    relabel_configs:
      - source_labels: [__address__]
        target_label: instance
        regex: '([^:]+):\\d+'
        replacement: '\${1}'
    # Metric relabeling (post-scrape)
    metric_relabel_configs:
      - source_labels: [__name__]
        regex: 'go_.*'
        action: drop`
        },
        {
          name: 'Federation',
          explanation: 'Prometheus federation allows one Prometheus server to scrape selected time series from another Prometheus server. This enables hierarchical setups where global Prometheus aggregates data from multiple data center Prometheus instances. Use for scaling and aggregating metrics across clusters.',
          codeExample: `# Global Prometheus - Federation Configuration
scrape_configs:
  # Federate from datacenter Prometheus instances
  - job_name: 'federate-dc1'
    scrape_interval: 30s
    honor_labels: true
    metrics_path: '/federate'
    params:
      'match[]':
        # Only pull aggregated metrics
        - '{job=~".*"}'
        - 'up'
        - 'job:http_requests:rate5m'
        - 'job:errors:rate5m'
    static_configs:
      - targets:
          - 'prometheus-dc1.example.com:9090'
        labels:
          datacenter: 'dc1'

  - job_name: 'federate-dc2'
    scrape_interval: 30s
    honor_labels: true
    metrics_path: '/federate'
    params:
      'match[]':
        - 'job:http_requests:rate5m'
        - 'job:errors:rate5m'
    static_configs:
      - targets:
          - 'prometheus-dc2.example.com:9090'
        labels:
          datacenter: 'dc2'`
        },
        {
          name: 'Remote Storage',
          explanation: 'For long-term storage beyond local retention, Prometheus supports remote write and remote read protocols. Popular backends include Thanos, Cortex, Victoria Metrics, and InfluxDB. Remote write sends samples to external systems; remote read queries external systems for historical data.',
          codeExample: `# Remote Write Configuration
remote_write:
  - url: "http://thanos-receive:19291/api/v1/receive"
    write_relabel_configs:
      # Only send production metrics
      - source_labels: [env]
        regex: production
        action: keep
    queue_config:
      capacity: 10000
      max_shards: 50
      max_samples_per_send: 5000

  # Write to Victoria Metrics
  - url: "http://victoria-metrics:8428/api/v1/write"
    basic_auth:
      username: prometheus
      password_file: /etc/prometheus/vm_password

# Remote Read Configuration
remote_read:
  - url: "http://thanos-query:9090/api/v1/read"
    read_recent: false  # Don't read recent data from remote

  - url: "http://victoria-metrics:8428/api/v1/read"
    required_matchers:
      env: production`
        }
      ]
    },
    {
      id: 'metrics',
      name: 'Metric Types',
      icon: '📊',
      color: '#10b981',
      description: 'Counter (monotonic increment only), Gauge (up/down values), Histogram (buckets for quantiles), Summary (client-side percentiles). Labels for dimensions: metric_name{job="api", instance="host:9090"}. Naming: snake_case with unit suffix (_seconds, _bytes_total).',
      diagram: MetricTypesDiagram,
      details: [
        {
          name: 'Counter',
          explanation: 'A counter is a cumulative metric that only increases or resets to zero. Use for counting requests, completed tasks, or errors. Always use rate() or increase() to get meaningful values since raw counter values are not useful. Example: http_requests_total, errors_total. Never use for values that can decrease.',
          codeExample: `# Counter Instrumentation (Python)
from prometheus_client import Counter

# Define counter
http_requests_total = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

# Increment counter
http_requests_total.labels(
    method='GET',
    endpoint='/api/users',
    status='200'
).inc()

# PromQL queries for counters
rate(http_requests_total[5m])           # Per-second rate
increase(http_requests_total[1h])       # Total increase over 1 hour
sum(rate(http_requests_total[5m])) by (endpoint)  # Rate per endpoint

# Java instrumentation
Counter requestsTotal = Counter.build()
    .name("http_requests_total")
    .help("Total HTTP requests")
    .labelNames("method", "status")
    .register();
requestsTotal.labels("GET", "200").inc();`
        },
        {
          name: 'Gauge',
          explanation: 'A gauge represents a value that can go up and down. Use for current values like temperature, memory usage, or queue size. Can be set to arbitrary values. Example: node_memory_available_bytes, temperature_celsius, active_connections. Ideal for snapshots of current state.',
          codeExample: `# Gauge Instrumentation (Python)
from prometheus_client import Gauge

# Define gauge
active_connections = Gauge(
    'active_connections',
    'Number of active connections',
    ['service']
)
temperature_celsius = Gauge(
    'temperature_celsius',
    'Current temperature'
)

# Set gauge value
active_connections.labels(service='api').set(42)
temperature_celsius.set(23.5)

# Increment/decrement gauge
active_connections.labels(service='api').inc()
active_connections.labels(service='api').dec(5)

# PromQL queries for gauges
avg_over_time(temperature_celsius[1h])    # Average over time
max_over_time(active_connections[24h])    # Maximum over 24 hours
delta(temperature_celsius[1h])            # Change over time
predict_linear(temperature_celsius[1h], 3600)  # Predict 1h ahead`
        },
        {
          name: 'Histogram',
          explanation: 'Histograms sample observations and count them in configurable buckets. Creates three time series: _bucket (cumulative counts), _sum (sum of observed values), _count (number of observations). Use histogram_quantile() to calculate percentiles. Ideal for request latencies where you need to calculate quantiles server-side.',
          codeExample: `# Histogram Instrumentation (Python)
from prometheus_client import Histogram

# Define histogram with custom buckets
request_latency = Histogram(
    'http_request_duration_seconds',
    'HTTP request latency',
    ['method', 'endpoint'],
    buckets=[0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0]
)

# Observe a value
request_latency.labels(method='GET', endpoint='/api').observe(0.25)

# Context manager for timing
with request_latency.labels(method='POST', endpoint='/api').time():
    process_request()

# PromQL queries for histograms
# Calculate 95th percentile latency
histogram_quantile(0.95,
  rate(http_request_duration_seconds_bucket[5m])
)

# Calculate median (p50) per endpoint
histogram_quantile(0.50,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (endpoint, le)
)

# Average request duration
rate(http_request_duration_seconds_sum[5m])
  / rate(http_request_duration_seconds_count[5m])`
        },
        {
          name: 'Summary',
          explanation: 'Summaries are similar to histograms but calculate quantiles client-side. Creates _sum, _count, and configurable quantile time series. Quantiles are calculated over a sliding time window. Cannot aggregate summaries across instances. Use when you know exactly which quantiles you need and don\'t need to aggregate.',
          codeExample: `# Summary Instrumentation (Python)
from prometheus_client import Summary

# Define summary with quantiles
request_latency = Summary(
    'http_request_duration_seconds',
    'HTTP request latency',
    ['method'],
    # Configure quantiles (phi, error)
    # Requires more memory than histograms
)

# Go client with specific quantiles
import (
    "github.com/prometheus/client_golang/prometheus"
)

requestDuration := prometheus.NewSummaryVec(
    prometheus.SummaryOpts{
        Name: "http_request_duration_seconds",
        Help: "Request latency distribution",
        Objectives: map[float64]float64{
            0.5:  0.05,   // p50 with 5% error
            0.9:  0.01,   // p90 with 1% error
            0.99: 0.001,  // p99 with 0.1% error
        },
        MaxAge: 10 * time.Minute,
    },
    []string{"method"},
)

# PromQL for summaries
http_request_duration_seconds{quantile="0.95"}  # p95 directly available
# Note: Cannot aggregate quantiles across instances!`
        },
        {
          name: 'Labels',
          explanation: 'Labels are key-value pairs that identify different dimensions of a metric. Example: http_requests_total{method="GET", status="200", path="/api"}. Labels enable powerful multi-dimensional querying. Avoid high-cardinality labels (user_id, request_id) as they explode storage and query performance.',
          codeExample: `# Good Label Usage
http_requests_total{
  method="GET",
  endpoint="/api/users",
  status="200",
  service="user-api"
}

# PromQL label selectors
http_requests_total{method="GET"}                    # Exact match
http_requests_total{method!="POST"}                  # Not equal
http_requests_total{endpoint=~"/api/.*"}             # Regex match
http_requests_total{status!~"5.."}                   # Negative regex

# Aggregation by labels
sum(rate(http_requests_total[5m])) by (service)      # Group by service
sum(rate(http_requests_total[5m])) without (instance) # Exclude instance

# Label manipulation in PromQL
label_replace(
  http_requests_total,
  "short_endpoint",        # New label name
  "$1",                    # Replacement
  "endpoint",              # Source label
  "/api/(.*)"              # Regex
)

# BAD: High cardinality labels (AVOID!)
# http_requests_total{user_id="12345"}    # Creates millions of series
# http_requests_total{request_id="uuid"}  # Unbounded cardinality`
        },
        {
          name: 'Naming Conventions',
          explanation: 'Follow naming conventions: use snake_case, include unit suffix (_seconds, _bytes, _total), prefix with subsystem. Counter names should end with _total. Use _info suffix for info metrics with constant value 1. Example: http_request_duration_seconds, node_memory_bytes_total. Consistent naming improves usability.',
          codeExample: `# Naming Convention Examples

# Counters - end with _total
http_requests_total{method="GET", status="200"}
errors_total{type="validation", service="api"}
processed_jobs_total{queue="high-priority"}

# Gauges - current value, include unit
node_memory_available_bytes
temperature_celsius
queue_length{queue="orders"}
active_connections{service="database"}

# Histograms - include unit (usually _seconds or _bytes)
http_request_duration_seconds_bucket{le="0.1"}
http_request_duration_seconds_sum
http_request_duration_seconds_count
http_response_size_bytes_bucket{le="1000"}

# Info metrics - constant value of 1, use _info suffix
node_info{version="1.2.3", os="linux", arch="amd64"} 1
app_build_info{version="2.0.0", commit="abc123"} 1

# Subsystem prefix pattern
myapp_http_requests_total
myapp_database_connections_active
myapp_cache_hits_total
myapp_cache_misses_total`
        }
      ]
    },
    {
      id: 'promql',
      name: 'PromQL Queries',
      icon: '🔍',
      color: '#f59e0b',
      description: 'rate(http_requests_total[5m]), increase(), histogram_quantile() for time series. Aggregations: sum/avg/max by(job). Recording rules for expensive queries: record: job:rate5m expr: sum(rate(...)) by(job). Selectors: {job="api", method=~"GET|POST"}.',
      diagram: PromQLDiagram,
      details: [
        {
          name: 'Selectors',
          explanation: 'Select time series by metric name and labels. Use {} for label matching: metric{label="value"}. Matchers: = (equals), != (not equals), =~ (regex match), !~ (negative regex). Range selectors [5m] return range vectors for functions like rate(). Instant selectors return single values.',
          codeExample: `# Instant Vector Selectors
http_requests_total                               # All series for metric
http_requests_total{job="api"}                    # Filter by job label
http_requests_total{method="GET", status="200"}   # Multiple labels
http_requests_total{status=~"2.."}                # Regex match (2xx)
http_requests_total{job!="internal"}              # Not equal
http_requests_total{path!~"/health.*"}            # Negative regex

# Range Vector Selectors (for rate, increase, etc.)
http_requests_total[5m]                           # Last 5 minutes of data
http_requests_total{job="api"}[1h]                # 1 hour range
http_requests_total[30m:5m]                       # Subquery: 30m window, 5m step

# Offset Modifier - query historical data
http_requests_total offset 1h                     # Value 1 hour ago
rate(http_requests_total[5m] offset 1d)           # Rate from yesterday

# @ Modifier - query at specific time
http_requests_total @ 1609459200                  # At Unix timestamp
http_requests_total @ start()                     # At query start time`
        },
        {
          name: 'Rate Functions',
          explanation: 'rate() calculates per-second average rate over time range - use for counters. irate() calculates instant rate using last two data points - more sensitive to spikes. increase() returns total increase over range. Always use these with counters, never with gauges. Example: rate(http_requests_total[5m]).',
          codeExample: `# rate() - Per-second average rate (smoothed)
rate(http_requests_total[5m])
# Best for: alerting, dashboards, general use
# Uses all data points in range for accuracy

# irate() - Instant rate (last two points only)
irate(http_requests_total[5m])
# Best for: volatile, fast-moving counters
# More responsive to spikes, but noisier

# increase() - Total increase over time range
increase(http_requests_total[1h])
# Returns: total count increase, not per-second

# Common patterns
# Requests per second by endpoint
sum(rate(http_requests_total[5m])) by (endpoint)

# Error rate percentage
sum(rate(http_requests_total{status=~"5.."}[5m]))
  / sum(rate(http_requests_total[5m])) * 100

# Rate of change comparison (current vs 1 hour ago)
rate(http_requests_total[5m])
  / rate(http_requests_total[5m] offset 1h)

# IMPORTANT: Never use rate/irate on gauges!
# Use delta() or deriv() for gauges instead`
        },
        {
          name: 'Aggregation',
          explanation: 'Aggregate across dimensions: sum(), avg(), min(), max(), count(), topk(), bottomk(). Use by() to preserve labels: sum(rate(requests[5m])) by (service). Use without() to exclude labels. stddev() for standard deviation. quantile() for calculating percentiles from gauges.',
          codeExample: `# Basic Aggregations
sum(http_requests_total)                    # Total across all series
avg(node_cpu_usage)                         # Average value
min(response_time_seconds)                  # Minimum
max(response_time_seconds)                  # Maximum
count(up)                                   # Count of series

# Aggregation with label preservation
sum(rate(http_requests_total[5m])) by (service)
avg(node_memory_usage) by (instance, job)
sum(rate(http_requests_total[5m])) without (instance, pod)

# Top/Bottom K
topk(5, sum(rate(http_requests_total[5m])) by (endpoint))
bottomk(3, avg_over_time(response_time[1h]))

# Statistical aggregations
stddev(response_time_seconds)               # Standard deviation
stdvar(response_time_seconds)               # Variance
quantile(0.95, response_time_seconds)       # 95th percentile (gauge only)

# Count aggregations
count_values("version", build_info)         # Count by label value
group(up) by (job)                          # Group without aggregating

# Combining aggregations
avg(sum(rate(http_requests_total[5m])) by (instance)) by (job)`
        },
        {
          name: 'Binary Operators',
          explanation: 'Arithmetic: +, -, *, /, %, ^. Comparison: ==, !=, >, <, >=, <= (use bool modifier for 0/1 output). Logical: and, or, unless. Vector matching: on(), ignoring(), group_left(), group_right() for joining metrics with different labels.',
          codeExample: `# Arithmetic Operators
node_memory_total - node_memory_available        # Memory used
http_requests_total / 1000                       # Convert to thousands
node_cpu_seconds_total * 100                     # Percentage

# Comparison Operators (filter results)
http_requests_total > 1000                       # Only values > 1000
up == 0                                          # Down instances
rate(errors_total[5m]) >= 0.1                    # Error rate >= 10%

# Comparison with bool (return 0 or 1)
up == bool 1                                     # Returns 1 if up, 0 if down

# Logical/Set Operators
up{job="api"} and up{job="web"}                  # Intersection
up{job="api"} or up{job="web"}                   # Union
up{job="api"} unless up{status="maintenance"}   # Difference

# Vector Matching - join metrics with different labels
# One-to-one matching
http_errors_total / on(instance, job) http_requests_total

# Many-to-one with group_left (left side has more labels)
rate(http_requests_total[5m])
  * on(instance) group_left(version)
  app_info

# Ignoring specific labels
http_requests_total / ignoring(status) http_requests_total`
        },
        {
          name: 'Functions',
          explanation: 'Time functions: time(), timestamp(). Label functions: label_replace(), label_join(). Aggregation over time: avg_over_time(), max_over_time(). Prediction: predict_linear() for trend analysis. histogram_quantile() for percentiles from histograms. absent() to detect missing metrics.',
          codeExample: `# Histogram Quantile - calculate percentiles
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
)
histogram_quantile(0.99,
  rate(http_request_duration_seconds_bucket[5m])
)

# Time Functions
time()                                     # Current Unix timestamp
timestamp(up)                              # Timestamp of each sample

# Aggregation Over Time (for range vectors)
avg_over_time(cpu_usage[1h])               # Average over 1 hour
max_over_time(memory_usage[24h])           # Maximum in 24 hours
min_over_time(response_time[1h])
sum_over_time(http_requests_total[1d])

# Prediction
predict_linear(node_filesystem_free_bytes[1h], 4*3600)
# Predict value 4 hours from now based on 1h trend

# Label Manipulation
label_replace(up, "short_instance", "$1", "instance", "(.*):.*")
label_join(up, "full_path", "/", "job", "instance")

# Missing/Present Detection
absent(up{job="critical-service"})         # Returns 1 if no series exists
absent_over_time(up{job="api"}[5m])        # No data in 5 minutes
present_over_time(up[1h])                  # Had data in last hour

# Clamping and Rounding
clamp(cpu_usage, 0, 100)                   # Clamp between 0-100
clamp_min(value, 0)                        # Minimum of 0
round(value, 0.1)                          # Round to nearest 0.1`
        },
        {
          name: 'Recording Rules',
          explanation: 'Pre-compute frequently used or expensive queries. Store results as new time series. Improve dashboard performance and enable complex alerting. Define in rule files: record: job:http_requests:rate5m, expr: sum(rate(http_requests_total[5m])) by (job). Use recording rules for any query used in multiple places.',
          codeExample: `# /etc/prometheus/rules/recording_rules.yml
groups:
  - name: http_recording_rules
    interval: 30s  # Evaluation interval for this group
    rules:
      # Request rate by job (5m window)
      - record: job:http_requests:rate5m
        expr: sum(rate(http_requests_total[5m])) by (job)

      # Error rate percentage by service
      - record: job:http_errors:ratio_rate5m
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m])) by (job)
          / sum(rate(http_requests_total[5m])) by (job)

      # p95 latency by endpoint
      - record: endpoint:http_latency:p95_5m
        expr: |
          histogram_quantile(0.95,
            sum(rate(http_request_duration_seconds_bucket[5m]))
            by (endpoint, le)
          )

      # Aggregated node metrics for federation
      - record: instance:node_cpu:avg_rate5m
        expr: |
          avg by (instance) (
            rate(node_cpu_seconds_total{mode!="idle"}[5m])
          )

# prometheus.yml - reference rule files
rule_files:
  - '/etc/prometheus/rules/*.yml'

# Use recording rules in alerts and dashboards
# job:http_requests:rate5m{job="api"} > 1000`
        }
      ]
    },
    {
      id: 'alerting',
      name: 'Alerting & Alertmanager',
      icon: '🚨',
      color: '#ef4444',
      description: 'Alert rules: expr: rate(errors[5m]) > 0.1, for: 5m, severity: critical. Alertmanager routing by labels, grouping with group_wait: 10s, repeat_interval: 12h. Inhibition suppresses cascading alerts. Receivers: Slack, PagerDuty, Email, Webhook.',
      diagram: AlertingDiagram,
      details: [
        {
          name: 'Alert Rules',
          explanation: 'Define alert conditions in rule files. Structure: alert (name), expr (PromQL condition), for (duration before firing), labels (severity, team), annotations (summary, description with template variables). Alerts transition: inactive → pending → firing. Use meaningful "for" duration to avoid flapping.',
          codeExample: `# /etc/prometheus/rules/alerts.yml
groups:
  - name: availability_alerts
    rules:
      # Instance down alert
      - alert: InstanceDown
        expr: up == 0
        for: 5m
        labels:
          severity: critical
          team: infrastructure
        annotations:
          summary: "Instance {{ $labels.instance }} down"
          description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 5 minutes."
          runbook_url: "https://wiki.example.com/runbooks/instance-down"

      # High error rate alert
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m])) by (job)
          / sum(rate(http_requests_total[5m])) by (job) > 0.05
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High error rate on {{ $labels.job }}"
          description: "Error rate is {{ $value | humanizePercentage }}"

      # Disk space alert
      - alert: DiskSpaceRunningOut
        expr: |
          predict_linear(node_filesystem_free_bytes[6h], 24*3600) < 0
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Disk will be full within 24 hours"`
        },
        {
          name: 'Alertmanager Config',
          explanation: 'Configure routing tree, receivers, and global settings. Route tree matches alerts by labels and sends to appropriate receivers. Receivers define notification channels (Slack, PagerDuty, email, webhook). Use continue: true to send to multiple receivers. Configure resolve_timeout for auto-resolution notifications.',
          codeExample: `# alertmanager.yml
global:
  resolve_timeout: 5m
  smtp_smarthost: 'smtp.example.com:587'
  smtp_from: 'alertmanager@example.com'
  slack_api_url: 'https://hooks.slack.com/services/XXX/YYY/ZZZ'

# Routing tree
route:
  receiver: 'default-receiver'
  group_by: ['alertname', 'job']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h

  # Child routes
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty-critical'
      continue: true  # Also send to Slack

    - match:
        severity: critical
      receiver: 'slack-critical'

    - match_re:
        service: (api|web)
      receiver: 'slack-backend-team'

# Receivers
receivers:
  - name: 'default-receiver'
    email_configs:
      - to: 'team@example.com'

  - name: 'slack-critical'
    slack_configs:
      - channel: '#alerts-critical'
        send_resolved: true

  - name: 'pagerduty-critical'
    pagerduty_configs:
      - service_key: '<pagerduty-key>'

  - name: 'slack-backend-team'
    slack_configs:
      - channel: '#backend-alerts'`
        },
        {
          name: 'Grouping',
          explanation: 'Group related alerts to reduce notification noise. Configure group_by labels in routes. group_wait: how long to wait before sending first notification. group_interval: wait before sending new notifications for a group. repeat_interval: wait before re-sending resolved and firing alerts.',
          codeExample: `# alertmanager.yml - Grouping Configuration
route:
  receiver: 'default'
  # Group alerts by these labels
  group_by: ['alertname', 'cluster', 'service']

  # Wait 30s to buffer alerts before sending first notification
  # Helps batch multiple alerts firing at once
  group_wait: 30s

  # Wait 5m before sending notifications about new alerts
  # added to an existing group
  group_interval: 5m

  # Re-send notifications every 4 hours for firing alerts
  repeat_interval: 4h

  routes:
    # Critical alerts - shorter wait times
    - match:
        severity: critical
      group_wait: 10s
      group_interval: 1m
      repeat_interval: 1h

    # Aggregate all warnings by cluster
    - match:
        severity: warning
      group_by: ['cluster']
      group_wait: 1m
      repeat_interval: 12h

    # Don't group disk alerts - send immediately
    - match:
        alertname: DiskSpaceLow
      group_by: ['...']  # Each alert in its own group
      group_wait: 0s`
        },
        {
          name: 'Inhibition',
          explanation: 'Suppress notifications for certain alerts when other alerts are firing. Example: if InstanceDown is firing, suppress all other alerts for that instance. Define source_match and target_match with common labels (equal). Prevents cascading alert storms during outages.',
          codeExample: `# alertmanager.yml - Inhibition Rules
inhibit_rules:
  # If instance is down, suppress all other alerts for that instance
  - source_match:
      alertname: 'InstanceDown'
    target_match_re:
      alertname: '.+'
    equal: ['instance']

  # If cluster is down, suppress service-level alerts
  - source_match:
      alertname: 'ClusterDown'
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['cluster']

  # Critical alerts suppress warnings for same service
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'service']

  # Database down suppresses query alerts
  - source_match:
      alertname: 'DatabaseDown'
    target_match_re:
      alertname: 'Database.*'
    equal: ['instance', 'database']

  # Maintenance mode suppresses all alerts
  - source_match:
      alertname: 'MaintenanceMode'
    target_match_re:
      alertname: '.+'
    equal: ['environment']`
        },
        {
          name: 'Silencing',
          explanation: 'Temporarily mute notifications for specific alerts. Create via Alertmanager UI or amtool CLI. Define matchers (labels), creator, comment, and duration. Use for planned maintenance or known issues. Silences don\'t prevent alert evaluation, only notifications.',
          codeExample: `# Create silence via amtool CLI
# Silence all alerts for instance during maintenance
amtool silence add \\
  --alertmanager.url=http://alertmanager:9093 \\
  --author="oncall@example.com" \\
  --comment="Scheduled maintenance window" \\
  --duration=2h \\
  instance="server1:9090"

# Silence specific alert
amtool silence add \\
  alertname="HighCPU" \\
  severity="warning" \\
  --duration=1h \\
  --comment="Known issue, fix in progress"

# Silence with regex matcher
amtool silence add \\
  instance=~"staging-.*" \\
  --duration=4h \\
  --comment="Staging environment testing"

# List active silences
amtool silence query

# Expire (remove) a silence
amtool silence expire <silence-id>

# Silence via API
curl -X POST http://alertmanager:9093/api/v2/silences \\
  -H "Content-Type: application/json" \\
  -d '{
    "matchers": [
      {"name": "instance", "value": "server1:9090", "isRegex": false}
    ],
    "startsAt": "2024-01-15T00:00:00Z",
    "endsAt": "2024-01-15T04:00:00Z",
    "createdBy": "admin",
    "comment": "Maintenance window"
  }'`
        },
        {
          name: 'Notification Templates',
          explanation: 'Customize notification messages using Go templates. Access alert data: .Status, .Labels, .Annotations, .StartsAt, .EndsAt. Define templates in separate files. Use {{range .Alerts}} to iterate. Include runbooks, dashboard links, and relevant context in notifications.',
          codeExample: `# /etc/alertmanager/templates/slack.tmpl
{{ define "slack.title" }}
[{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{ .Alerts.Firing | len }}{{ end }}] {{ .GroupLabels.alertname }}
{{ end }}

{{ define "slack.text" }}
{{ range .Alerts }}
*Alert:* {{ .Labels.alertname }}
*Severity:* {{ .Labels.severity }}
*Instance:* {{ .Labels.instance }}
*Description:* {{ .Annotations.description }}
*Started:* {{ .StartsAt.Format "2006-01-02 15:04:05" }}
{{ if .Annotations.runbook_url }}*Runbook:* {{ .Annotations.runbook_url }}{{ end }}
---
{{ end }}
{{ end }}

# alertmanager.yml - Use templates
templates:
  - '/etc/alertmanager/templates/*.tmpl'

receivers:
  - name: 'slack-notifications'
    slack_configs:
      - channel: '#alerts'
        title: '{{ template "slack.title" . }}'
        text: '{{ template "slack.text" . }}'
        send_resolved: true
        actions:
          - type: button
            text: 'Runbook'
            url: '{{ (index .Alerts 0).Annotations.runbook_url }}'
          - type: button
            text: 'Dashboard'
            url: 'https://grafana.example.com/d/alerts'`
        }
      ]
    },
    {
      id: 'exporters',
      name: 'Exporters & Instrumentation',
      icon: '📡',
      color: '#8b5cf6',
      description: 'Node Exporter (CPU, memory, disk), Blackbox Exporter (HTTP probes, SSL certs), Custom Exporters expose /metrics endpoint. Application instrumentation via client libraries (Python, Go, Java). Pushgateway for batch jobs. Database exporters: mysqld, postgres, mongodb.',
      diagram: ExportersDiagram,
      details: [
        {
          name: 'Node Exporter',
          explanation: 'Collects system metrics from Linux/Unix machines: CPU, memory, disk, network, filesystem. Run as daemon on each host. Metrics include node_cpu_seconds_total, node_memory_MemAvailable_bytes, node_disk_read_bytes_total. Essential for infrastructure monitoring.',
          codeExample: `# Install and run Node Exporter
wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz
tar xvfz node_exporter-*.tar.gz
./node_exporter --web.listen-address=":9100"

# prometheus.yml - Scrape Node Exporter
scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['node1:9100', 'node2:9100', 'node3:9100']

# Key Node Exporter metrics and PromQL queries

# CPU Usage (percentage)
100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory Usage (percentage)
(1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100

# Disk Usage (percentage)
(1 - node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100

# Network throughput (bytes/sec)
rate(node_network_receive_bytes_total[5m])
rate(node_network_transmit_bytes_total[5m])

# Disk I/O
rate(node_disk_read_bytes_total[5m])
rate(node_disk_written_bytes_total[5m])`
        },
        {
          name: 'Blackbox Exporter',
          explanation: 'Probes external endpoints over HTTP, HTTPS, DNS, TCP, and ICMP. Configure probe modules in blackbox.yml. Use for endpoint availability, SSL certificate expiry, DNS resolution time. Scrape configuration passes target as parameter. Returns probe_success and timing metrics.',
          codeExample: `# blackbox.yml - Probe configuration
modules:
  http_2xx:
    prober: http
    timeout: 5s
    http:
      valid_http_versions: ["HTTP/1.1", "HTTP/2.0"]
      valid_status_codes: [200, 201, 204]
      method: GET
      follow_redirects: true

  http_post_2xx:
    prober: http
    http:
      method: POST
      body: '{"test": "data"}'

  tcp_connect:
    prober: tcp
    timeout: 5s

  icmp_ping:
    prober: icmp
    timeout: 5s

# prometheus.yml - Scrape via Blackbox Exporter
scrape_configs:
  - job_name: 'blackbox-http'
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

# PromQL queries
probe_success                            # 1 = success, 0 = failure
probe_duration_seconds                   # Total probe duration
probe_ssl_earliest_cert_expiry - time()  # Seconds until SSL expiry`
        },
        {
          name: 'Custom Exporters',
          explanation: 'Write custom exporters for systems without native metrics. Use client libraries: prometheus-client (Python), client_golang, client_java. Implement Collector interface or use simple gauge/counter helpers. Expose /metrics HTTP endpoint. Follow metric naming and labeling conventions.',
          codeExample: `# Python Custom Exporter
from prometheus_client import start_http_server, Gauge, Counter, Histogram
import time

# Define metrics
REQUEST_COUNT = Counter(
    'myapp_requests_total',
    'Total requests',
    ['method', 'endpoint']
)

PROCESSING_TIME = Histogram(
    'myapp_processing_seconds',
    'Time spent processing',
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0]
)

QUEUE_SIZE = Gauge(
    'myapp_queue_size',
    'Current queue size',
    ['queue_name']
)

# Update metrics
REQUEST_COUNT.labels(method='GET', endpoint='/api').inc()

with PROCESSING_TIME.time():
    process_request()

QUEUE_SIZE.labels(queue_name='orders').set(get_queue_length())

# Start metrics server
start_http_server(8000)

# Go Custom Exporter
package main

import (
    "net/http"
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promhttp"
)

var requestsTotal = prometheus.NewCounterVec(
    prometheus.CounterOpts{
        Name: "myapp_requests_total",
        Help: "Total requests",
    },
    []string{"method"},
)

func init() {
    prometheus.MustRegister(requestsTotal)
}

func main() {
    http.Handle("/metrics", promhttp.Handler())
    http.ListenAndServe(":8000", nil)
}`
        },
        {
          name: 'Application Instrumentation',
          explanation: 'Instrument application code directly using client libraries. Add metrics for business logic: requests, latencies, errors, queue depths. Use middleware for web frameworks. Include request path, status code, method as labels. Track SLIs (Service Level Indicators) like latency percentiles and error rates.',
          codeExample: `# Flask/Python Application Instrumentation
from flask import Flask, request
from prometheus_client import Counter, Histogram, generate_latest
import time

app = Flask(__name__)

# Define SLI metrics
REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP request latency',
    ['method', 'endpoint', 'status'],
    buckets=[0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5]
)

REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

# Middleware for automatic instrumentation
@app.before_request
def before_request():
    request.start_time = time.time()

@app.after_request
def after_request(response):
    latency = time.time() - request.start_time
    REQUEST_LATENCY.labels(
        method=request.method,
        endpoint=request.path,
        status=response.status_code
    ).observe(latency)
    REQUEST_COUNT.labels(
        method=request.method,
        endpoint=request.path,
        status=response.status_code
    ).inc()
    return response

@app.route('/metrics')
def metrics():
    return generate_latest()

# Business metrics
ORDERS_PROCESSED = Counter('orders_processed_total', 'Orders processed', ['status'])
ORDERS_PROCESSED.labels(status='success').inc()`
        },
        {
          name: 'Pushgateway',
          explanation: 'For short-lived jobs that can\'t be scraped (batch jobs, cron jobs). Jobs push metrics to Pushgateway; Prometheus scrapes Pushgateway. Use sparingly - breaks pull model guarantees. Set job and instance labels when pushing. Delete metrics after job completion to avoid stale data.',
          codeExample: `# Push metrics from batch job (Python)
from prometheus_client import CollectorRegistry, Gauge, Counter, push_to_gateway

registry = CollectorRegistry()

# Define metrics
duration = Gauge(
    'batch_job_duration_seconds',
    'Duration of batch job',
    registry=registry
)
records_processed = Counter(
    'batch_job_records_processed_total',
    'Records processed by batch job',
    registry=registry
)

# Run job and record metrics
start_time = time.time()
process_records(1000)
duration.set(time.time() - start_time)
records_processed.inc(1000)

# Push to Pushgateway
push_to_gateway(
    'pushgateway:9091',
    job='nightly-etl',
    registry=registry
)

# Push via curl
cat <<EOF | curl --data-binary @- http://pushgateway:9091/metrics/job/backup/instance/server1
backup_duration_seconds 120.5
backup_size_bytes 1073741824
backup_success 1
EOF

# Delete metrics after job completion
curl -X DELETE http://pushgateway:9091/metrics/job/backup/instance/server1

# prometheus.yml - Scrape Pushgateway
scrape_configs:
  - job_name: 'pushgateway'
    honor_labels: true  # Use pushed labels
    static_configs:
      - targets: ['pushgateway:9091']`
        },
        {
          name: 'Database Exporters',
          explanation: 'Specialized exporters for databases: mysqld_exporter, postgres_exporter, mongodb_exporter, redis_exporter. Expose database-specific metrics: connections, queries, replication lag, buffer pool stats. Configure via DSN environment variables. Essential for database monitoring.',
          codeExample: `# MySQL Exporter
export DATA_SOURCE_NAME='user:password@(hostname:3306)/'
./mysqld_exporter --web.listen-address=":9104"

# PostgreSQL Exporter
export DATA_SOURCE_NAME='postgresql://user:pass@localhost:5432/postgres?sslmode=disable'
./postgres_exporter --web.listen-address=":9187"

# prometheus.yml - Scrape database exporters
scrape_configs:
  - job_name: 'mysql'
    static_configs:
      - targets: ['mysql-exporter:9104']

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

# Key database metrics and queries

# MySQL
mysql_global_status_connections           # Total connections
mysql_global_status_threads_connected     # Active connections
mysql_global_status_slow_queries          # Slow queries count
rate(mysql_global_status_queries[5m])     # Queries per second

# PostgreSQL
pg_stat_activity_count                    # Active connections by state
pg_stat_database_tup_fetched              # Rows fetched
pg_replication_lag                        # Replication lag in bytes

# Redis Exporter
redis_connected_clients                   # Connected clients
redis_memory_used_bytes                   # Memory usage
rate(redis_commands_processed_total[5m])  # Commands per second

# MongoDB Exporter
mongodb_connections{state="current"}      # Current connections
mongodb_op_counters_total                 # Operations count`
        }
      ]
    },
    {
      id: 'operations',
      name: 'Operations & Best Practices',
      icon: '⚙️',
      color: '#06b6d4',
      description: 'HA: run multiple instances, shard by environment/service. Monitor prometheus_tsdb_head_series cardinality. Remote storage: Thanos, Cortex, Victoria Metrics. TLS/basic-auth for scraping. Snapshot API for backups. Recovery and retention policies.',
      diagram: OperationsDiagram,
      details: [
        {
          name: 'High Availability',
          explanation: 'Run multiple Prometheus instances scraping the same targets. Use a load balancer or service mesh for query distribution. Consider Thanos or Cortex for global query view and deduplication. Alertmanager has built-in clustering for HA. Use remote storage for durability.',
          codeExample: `# HA Prometheus Setup - Two identical instances
# prometheus-1.yml and prometheus-2.yml (identical config)
global:
  scrape_interval: 15s
  external_labels:
    replica: prometheus-1  # Different for each instance

scrape_configs:
  - job_name: 'app'
    static_configs:
      - targets: ['app:8080']

# Alertmanager Clustering
alertmanager --cluster.listen-address=0.0.0.0:9094 \\
  --cluster.peer=alertmanager-2:9094

# alertmanager.yml for cluster
global:
  resolve_timeout: 5m

# Both Prometheus instances send to both Alertmanagers
alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager-1:9093
            - alertmanager-2:9093

# Thanos Sidecar for HA + Long-term storage
# Run alongside each Prometheus
thanos sidecar \\
  --tsdb.path=/prometheus/data \\
  --prometheus.url=http://localhost:9090 \\
  --objstore.config-file=bucket.yml \\
  --grpc-address=0.0.0.0:10901

# Query through Thanos Query (deduplicates)
thanos query \\
  --store=prometheus-1:10901 \\
  --store=prometheus-2:10901 \\
  --query.replica-label=replica`
        },
        {
          name: 'Performance Tuning',
          explanation: 'Monitor cardinality with prometheus_tsdb_head_series. Reduce label cardinality to avoid explosion. Use recording rules for expensive queries. Tune scrape_interval based on metric volatility. Increase storage retention with --storage.tsdb.retention.time. Use SSD storage for TSDB.',
          codeExample: `# Monitor Prometheus performance
prometheus_tsdb_head_series                    # Total active series (cardinality)
prometheus_tsdb_head_chunks                    # Memory usage indicator
prometheus_engine_query_duration_seconds       # Query latency
rate(prometheus_rule_evaluation_failures_total[5m])

# Alert on high cardinality
- alert: HighCardinality
  expr: prometheus_tsdb_head_series > 1000000
  for: 1h
  annotations:
    summary: "Cardinality is too high"

# Drop high-cardinality labels
metric_relabel_configs:
  - source_labels: [request_id]
    action: labeldrop
  - source_labels: [__name__]
    regex: 'go_gc_.*'
    action: drop

# Command line performance flags
prometheus \\
  --storage.tsdb.retention.time=30d \\
  --storage.tsdb.retention.size=100GB \\
  --query.max-concurrency=20 \\
  --query.timeout=2m \\
  --storage.tsdb.wal-compression

# Recording rules for expensive queries
groups:
  - name: aggregations
    interval: 30s
    rules:
      - record: job:http_requests:rate5m
        expr: sum(rate(http_requests_total[5m])) by (job)

# Scrape interval tuning
scrape_configs:
  - job_name: 'volatile-metrics'
    scrape_interval: 10s    # More frequent for fast-changing metrics
  - job_name: 'stable-metrics'
    scrape_interval: 60s    # Less frequent for slow-changing metrics`
        },
        {
          name: 'Security',
          explanation: 'Enable TLS for scraping sensitive targets. Use basic auth or bearer token authentication. Secure Prometheus web UI with reverse proxy authentication. Limit metric exposure with relabel_configs (drop sensitive labels). Network segmentation for internal metrics.',
          codeExample: `# TLS configuration for scraping
scrape_configs:
  - job_name: 'secure-app'
    scheme: https
    tls_config:
      ca_file: /etc/prometheus/ca.crt
      cert_file: /etc/prometheus/client.crt
      key_file: /etc/prometheus/client.key
      insecure_skip_verify: false

# Basic authentication
  - job_name: 'authenticated-app'
    basic_auth:
      username: prometheus
      password_file: /etc/prometheus/password

# Bearer token authentication
  - job_name: 'token-auth-app'
    bearer_token_file: /etc/prometheus/token

# Prometheus web.config.yml for secure UI
basic_auth_users:
  admin: $2y$10$... # bcrypt hashed password

tls_server_config:
  cert_file: /etc/prometheus/server.crt
  key_file: /etc/prometheus/server.key

# Start with security config
prometheus --web.config.file=/etc/prometheus/web.config.yml

# Drop sensitive labels
metric_relabel_configs:
  - source_labels: [password, token, secret]
    action: labeldrop
  - source_labels: [__name__]
    regex: '.*_password.*|.*_secret.*'
    action: drop`
        },
        {
          name: 'Monitoring Prometheus',
          explanation: 'Monitor Prometheus itself using its own metrics. Key metrics: prometheus_tsdb_head_series (cardinality), prometheus_engine_query_duration_seconds (query performance), scrape_duration_seconds (scrape latency). Alert on high scrape failures, query timeouts, and storage issues.',
          codeExample: `# Key Prometheus self-monitoring metrics

# Scraping health
up                                              # Target availability
scrape_duration_seconds                         # Scrape latency
scrape_samples_scraped                          # Samples per scrape
rate(prometheus_target_scrape_pool_sync_total[5m])

# TSDB health
prometheus_tsdb_head_series                     # Active time series
prometheus_tsdb_head_chunks                     # Active chunks
prometheus_tsdb_compactions_total               # Compaction count
prometheus_tsdb_head_samples_appended_total     # Ingestion rate

# Query engine
prometheus_engine_query_duration_seconds        # Query latency
prometheus_engine_queries                       # Query count
prometheus_engine_queries_concurrent_max        # Concurrent query limit

# Alert rules evaluation
prometheus_rule_evaluation_duration_seconds
prometheus_rule_group_last_duration_seconds

# Self-monitoring alerts
groups:
  - name: prometheus-self
    rules:
      - alert: PrometheusTargetDown
        expr: up == 0
        for: 5m

      - alert: PrometheusScrapeSlowing
        expr: scrape_duration_seconds > 10
        for: 5m

      - alert: PrometheusHighCardinality
        expr: prometheus_tsdb_head_series > 2000000
        for: 1h

      - alert: PrometheusRuleFailures
        expr: rate(prometheus_rule_evaluation_failures_total[5m]) > 0
        for: 5m`
        },
        {
          name: 'Backup & Recovery',
          explanation: 'TSDB data stored in --storage.tsdb.path directory. Use snapshot API for consistent backups: POST /api/v1/admin/tsdb/snapshot. Consider remote write for continuous backup. Test recovery procedures regularly. Document retention policies and storage capacity planning.',
          codeExample: `# Enable admin API for snapshots
prometheus --web.enable-admin-api --storage.tsdb.path=/prometheus/data

# Create snapshot via API
curl -X POST http://localhost:9090/api/v1/admin/tsdb/snapshot
# Returns: {"status":"success","data":{"name":"20240115T100000Z-abc123"}}

# Snapshot is created in: /prometheus/data/snapshots/<name>

# Backup script
#!/bin/bash
SNAPSHOT_DIR="/prometheus/data/snapshots"
BACKUP_DIR="/backup/prometheus"

# Create snapshot
SNAPSHOT=$(curl -s -X POST http://localhost:9090/api/v1/admin/tsdb/snapshot | jq -r '.data.name')

# Copy to backup location
cp -r "$SNAPSHOT_DIR/$SNAPSHOT" "$BACKUP_DIR/$SNAPSHOT"

# Clean old snapshots
find $SNAPSHOT_DIR -maxdepth 1 -type d -mtime +1 -exec rm -rf {} \\;

# Recovery procedure
# 1. Stop Prometheus
# 2. Clear data directory (keep snapshots)
rm -rf /prometheus/data/*  # Keep snapshots dir

# 3. Copy snapshot data back
cp -r /backup/prometheus/20240115T100000Z-abc123/* /prometheus/data/

# 4. Restart Prometheus
systemctl start prometheus

# Continuous backup with remote write
remote_write:
  - url: "http://backup-storage:8428/api/v1/write"
    queue_config:
      capacity: 10000
      max_shards: 200`
        },
        {
          name: 'Scaling Strategies',
          explanation: 'Vertical scaling: increase CPU/memory/storage for single instance. Horizontal scaling: shard by environment, service, or region. Use federation for aggregating from multiple Prometheus. Consider Thanos for long-term storage and global querying. Implement proper capacity planning.',
          codeExample: `# Functional Sharding - Split by job/service
# prometheus-infra.yml
scrape_configs:
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node1:9100', 'node2:9100']
  - job_name: 'kubernetes'
    kubernetes_sd_configs:
      - role: node

# prometheus-apps.yml
scrape_configs:
  - job_name: 'api-servers'
    static_configs:
      - targets: ['api1:8080', 'api2:8080']
  - job_name: 'web-servers'
    static_configs:
      - targets: ['web1:8080', 'web2:8080']

# Hashmod sharding for large target sets
# prometheus-shard-0.yml (handles ~50% of targets)
scrape_configs:
  - job_name: 'large-job'
    relabel_configs:
      - source_labels: [__address__]
        modulus: 2
        target_label: __tmp_hash
        action: hashmod
      - source_labels: [__tmp_hash]
        regex: 0
        action: keep

# prometheus-shard-1.yml (handles other ~50%)
# Same config but regex: 1

# Thanos for global querying across shards
thanos query \\
  --store=prometheus-infra:10901 \\
  --store=prometheus-apps:10901 \\
  --store=prometheus-shard-0:10901 \\
  --store=prometheus-shard-1:10901 \\
  --store=thanos-store:10901  # Long-term storage

# Capacity planning formulas
# Memory: ~3KB per active series
# Disk: series * samples_per_series * 2 bytes * retention_days`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  // Handle keyboard navigation
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
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

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

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'DevOps', icon: '🔧', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'Prometheus', icon: '📊', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Prometheus', icon: '📊' })
    }

    return stack
  }

  const handleBreadcrumbClick = (index) => {
    const stack = buildBreadcrumbStack()
    if (stack[index].onClick) {
      stack[index].onClick()
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #93c5fd, #60a5fa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#60a5fa',
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

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            style={backButtonStyle}
            onClick={onBack}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to DevOps
          </button>
          <h1 style={titleStyle}>Prometheus</h1>
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
          onMainMenu={breadcrumb?.onMainMenu}
          colors={PROMETHEUS_COLORS}
        />
      </div>

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

      {/* Concept Detail Modal */}
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
              onMainMenu={breadcrumb?.onMainMenu}
              colors={PROMETHEUS_COLORS}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <h2 style={{ color: selectedConcept.color, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button onClick={handlePreviousConcept} disabled={selectedConceptIndex === 0} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>{selectedConceptIndex + 1}/{concepts.length}</span>
                <button onClick={handleNextConcept} disabled={selectedConceptIndex === concepts.length - 1} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>→</button>
                <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
              </div>
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
              const DiagramComponent = detail.diagram || selectedConcept.diagram
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
        </div>
      )}
    </div>
  )
}

export default Prometheus

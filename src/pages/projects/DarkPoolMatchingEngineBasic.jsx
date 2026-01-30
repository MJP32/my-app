/**
 * Dark Pool Matching Engine - Basic
 *
 * Enterprise-grade streaming platform and real-time risk analytics for rates trading operations.
 * Processing millions of events daily with high availability and fault tolerance.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * Main topic colors - zinc theme
 */
const DARKPOOLBASIC_COLORS = {
  primary: '#71717a',
  primaryHover: '#a1a1aa',
  bg: 'rgba(113, 113, 122, 0.1)',
  border: 'rgba(113, 113, 122, 0.3)',
  arrow: '#71717a',
  hoverBg: 'rgba(113, 113, 122, 0.2)',
  topicBg: 'rgba(113, 113, 122, 0.2)'
}

/**
 * Alternating colors for subtopic detail explanations
 */
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const RequirementsFlowDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Requirements to Implementation Flow
    </text>
    <rect x="50" y="60" width="140" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Trading Desk</text>
    <text x="120" y="105" textAnchor="middle" fill="white" fontSize="10">Requirements</text>

    <rect x="240" y="60" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="310" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Technical</text>
    <text x="310" y="105" textAnchor="middle" fill="white" fontSize="10">Analysis</text>

    <rect x="430" y="60" width="140" height="60" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="500" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Solution</text>
    <text x="500" y="105" textAnchor="middle" fill="white" fontSize="10">Design</text>

    <rect x="620" y="60" width="140" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="690" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Implementation</text>

    <line x1="190" y1="90" x2="235" y2="90" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead1)"/>
    <line x1="380" y1="90" x2="425" y2="90" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead1)"/>
    <line x1="570" y1="90" x2="615" y2="90" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead1)"/>
  </svg>
)

const KafkaStreamingDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Kafka Streaming Architecture
    </text>
    <rect x="80" y="70" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Market Data</text>
    <text x="140" y="108" textAnchor="middle" fill="white" fontSize="10">Producers</text>

    <rect x="80" y="180" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="200" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Trade Events</text>
    <text x="140" y="213" textAnchor="middle" fill="white" fontSize="10">Producers</text>

    <rect x="300" y="120" width="150" height="80" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="375" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Kafka</text>
    <text x="375" y="172" textAnchor="middle" fill="white" fontSize="11">Cluster</text>

    <rect x="560" y="70" width="120" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="620" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Risk</text>
    <text x="620" y="108" textAnchor="middle" fill="white" fontSize="10">Consumers</text>

    <rect x="560" y="180" width="120" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="620" y="200" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Analytics</text>
    <text x="620" y="213" textAnchor="middle" fill="white" fontSize="10">Consumers</text>

    <line x1="200" y1="95" x2="295" y2="145" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
    <line x1="200" y1="205" x2="295" y2="175" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
    <line x1="450" y1="145" x2="555" y2="95" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
    <line x1="450" y1="175" x2="555" y2="205" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
  </svg>
)

const EventProcessingDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Event Processing Pipeline
    </text>
    <rect x="50" y="70" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Trade</text>
    <text x="100" y="108" textAnchor="middle" fill="white" fontSize="10">Events</text>

    <rect x="50" y="145" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="165" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Market</text>
    <text x="100" y="178" textAnchor="middle" fill="white" fontSize="10">Data</text>

    <rect x="50" y="220" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="240" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Position</text>
    <text x="100" y="253" textAnchor="middle" fill="white" fontSize="10">Updates</text>

    <rect x="230" y="145" width="120" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="290" y="175" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Event</text>
    <text x="290" y="192" textAnchor="middle" fill="white" fontSize="11">Router</text>

    <rect x="450" y="70" width="110" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="505" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Risk</text>
    <text x="505" y="108" textAnchor="middle" fill="white" fontSize="10">Calculator</text>

    <rect x="450" y="145" width="110" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="505" y="165" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">P&L</text>
    <text x="505" y="178" textAnchor="middle" fill="white" fontSize="10">Engine</text>

    <rect x="450" y="220" width="110" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="505" y="240" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Position</text>
    <text x="505" y="253" textAnchor="middle" fill="white" fontSize="10">Tracker</text>

    <line x1="150" y1="95" x2="225" y2="160" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
    <line x1="150" y1="170" x2="225" y2="180" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
    <line x1="150" y1="245" x2="225" y2="200" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
    <line x1="350" y1="160" x2="445" y2="95" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
    <line x1="350" y1="180" x2="445" y2="170" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
    <line x1="350" y1="200" x2="445" y2="245" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
  </svg>
)

const FlinkStreamingDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Flink Stream Processing Pipeline
    </text>
    <rect x="80" y="120" width="120" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Market Data</text>
    <text x="140" y="160" textAnchor="middle" fill="white" fontSize="10">Stream</text>

    <rect x="280" y="120" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Flink</text>
    <text x="350" y="160" textAnchor="middle" fill="white" fontSize="11">Processing</text>

    <rect x="280" y="50" width="140" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="white" fontSize="10">Windowing &</text>
    <text x="350" y="85" textAnchor="middle" fill="white" fontSize="10">Aggregation</text>

    <rect x="280" y="200" width="140" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="350" y="220" textAnchor="middle" fill="white" fontSize="10">Pattern</text>
    <text x="350" y="235" textAnchor="middle" fill="white" fontSize="10">Detection</text>

    <rect x="500" y="120" width="120" height="60" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="560" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Risk</text>
    <text x="560" y="160" textAnchor="middle" fill="white" fontSize="10">Calculations</text>

    <line x1="200" y1="150" x2="275" y2="150" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead4)"/>
    <line x1="350" y1="120" x2="350" y2="105" stroke="#71717a" strokeWidth="2" strokeDasharray="5,5"/>
    <line x1="350" y1="180" x2="350" y2="195" stroke="#71717a" strokeWidth="2" strokeDasharray="5,5"/>
    <line x1="420" y1="150" x2="495" y2="150" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead4)"/>
  </svg>
)

const FaultTolerantDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Fault-Tolerant Processing Architecture
    </text>
    <rect x="70" y="120" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="150" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Kafka</text>
    <text x="120" y="165" textAnchor="middle" fill="white" fontSize="10">Source</text>

    <rect x="250" y="120" width="130" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="315" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Stream</text>
    <text x="315" y="160" textAnchor="middle" fill="white" fontSize="10">Processor</text>

    <rect x="250" y="50" width="130" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="315" y="70" textAnchor="middle" fill="white" fontSize="10">Checkpoint</text>
    <text x="315" y="85" textAnchor="middle" fill="white" fontSize="10">Storage</text>

    <rect x="250" y="200" width="130" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="315" y="220" textAnchor="middle" fill="white" fontSize="10">State</text>
    <text x="315" y="235" textAnchor="middle" fill="white" fontSize="10">Backend</text>

    <rect x="470" y="120" width="100" height="60" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="520" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Database</text>
    <text x="520" y="160" textAnchor="middle" fill="white" fontSize="10">Sink</text>

    <line x1="170" y1="150" x2="245" y2="150" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead5)"/>
    <line x1="315" y1="120" x2="315" y2="105" stroke="#71717a" strokeWidth="2" strokeDasharray="5,5"/>
    <line x1="315" y1="180" x2="315" y2="195" stroke="#71717a" strokeWidth="2" strokeDasharray="5,5"/>
    <line x1="380" y1="150" x2="465" y2="150" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead5)"/>
  </svg>
)

const PositionPnLDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead6" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Real-Time Position & P&L Monitoring System
    </text>
    <rect x="50" y="80" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Trade</text>
    <text x="100" y="113" textAnchor="middle" fill="white" fontSize="10">Feed</text>

    <rect x="50" y="170" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="190" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Market</text>
    <text x="100" y="203" textAnchor="middle" fill="white" fontSize="10">Data</text>

    <rect x="230" y="80" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="290" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Position</text>
    <text x="290" y="113" textAnchor="middle" fill="white" fontSize="10">Engine</text>

    <rect x="230" y="170" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="290" y="190" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">P&L</text>
    <text x="290" y="203" textAnchor="middle" fill="white" fontSize="10">Calculator</text>

    <rect x="440" y="60" width="120" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="500" y="80" textAnchor="middle" fill="white" fontSize="10">Real-time</text>
    <text x="500" y="93" textAnchor="middle" fill="white" fontSize="10">Dashboard</text>

    <rect x="440" y="130" width="120" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="500" y="150" textAnchor="middle" fill="white" fontSize="10">Risk</text>
    <text x="500" y="163" textAnchor="middle" fill="white" fontSize="10">Alerts</text>

    <rect x="440" y="200" width="120" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="500" y="220" textAnchor="middle" fill="white" fontSize="10">Historical</text>
    <text x="500" y="233" textAnchor="middle" fill="white" fontSize="10">Analytics</text>

    <line x1="150" y1="105" x2="225" y2="105" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead6)"/>
    <line x1="150" y1="195" x2="225" y2="105" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead6)"/>
    <line x1="150" y1="195" x2="225" y2="195" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead6)"/>
    <line x1="290" y1="130" x2="290" y2="165" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead6)"/>
    <line x1="350" y1="105" x2="435" y2="85" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead6)"/>
    <line x1="350" y1="195" x2="435" y2="85" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead6)"/>
    <line x1="350" y1="195" x2="435" y2="155" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead6)"/>
    <line x1="350" y1="195" x2="435" y2="225" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead6)"/>
  </svg>
)

const ReactiveSystemDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead7" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Reactive Trading System Architecture
    </text>
    <rect x="70" y="70" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="90" textAnchor="middle" fill="white" fontSize="10">Trade</text>
    <text x="120" y="103" textAnchor="middle" fill="white" fontSize="10">Requests</text>

    <rect x="70" y="170" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="190" textAnchor="middle" fill="white" fontSize="10">Market</text>
    <text x="120" y="203" textAnchor="middle" fill="white" fontSize="10">Events</text>

    <rect x="250" y="70" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="310" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">WebFlux</text>
    <text x="310" y="103" textAnchor="middle" fill="white" fontSize="10">Controller</text>

    <rect x="250" y="170" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="310" y="190" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Reactor</text>
    <text x="310" y="203" textAnchor="middle" fill="white" fontSize="10">Pipeline</text>

    <rect x="250" y="125" width="90" height="40" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="295" y="148" textAnchor="middle" fill="white" fontSize="10">Validation</text>

    <rect x="460" y="120" width="110" height="60" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="515" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Execution</text>
    <text x="515" y="160" textAnchor="middle" fill="white" fontSize="10">Engine</text>

    <line x1="170" y1="95" x2="245" y2="95" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead7)"/>
    <line x1="170" y1="195" x2="245" y2="195" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead7)"/>
    <line x1="310" y1="120" x2="310" y2="125" stroke="#71717a" strokeWidth="2"/>
    <line x1="310" y1="165" x2="310" y2="170" stroke="#71717a" strokeWidth="2"/>
    <line x1="340" y1="145" x2="455" y2="145" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead7)"/>
  </svg>
)

const CoherenceCachingDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead8" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Coherence Caching Architecture
    </text>
    <rect x="80" y="60" width="110" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="135" y="88" textAnchor="middle" fill="white" fontSize="10">Trading App 1</text>

    <rect x="80" y="125" width="110" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="135" y="153" textAnchor="middle" fill="white" fontSize="10">Trading App 2</text>

    <rect x="80" y="190" width="110" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="135" y="218" textAnchor="middle" fill="white" fontSize="10">Trading App 3</text>

    <rect x="310" y="120" width="150" height="80" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="385" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Coherence</text>
    <text x="385" y="172" textAnchor="middle" fill="white" fontSize="11">Cache Grid</text>

    <rect x="570" y="130" width="100" height="60" rx="8" fill="#6b7280" stroke="#9ca3af" strokeWidth="2"/>
    <text x="620" y="163" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Database</text>

    <line x1="190" y1="85" x2="305" y2="145" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead8)"/>
    <line x1="190" y1="150" x2="305" y2="160" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead8)"/>
    <line x1="190" y1="215" x2="305" y2="175" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead8)"/>
    <line x1="460" y1="160" x2="565" y2="160" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead8)"/>
  </svg>
)

const MultiTierCachingDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead9" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Multi-Tier Distributed Caching Architecture
    </text>
    <rect x="60" y="60" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="80" textAnchor="middle" fill="white" fontSize="9">Application</text>
    <text x="110" y="93" textAnchor="middle" fill="white" fontSize="9">Node 1</text>

    <rect x="60" y="130" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="150" textAnchor="middle" fill="white" fontSize="9">Application</text>
    <text x="110" y="163" textAnchor="middle" fill="white" fontSize="9">Node 2</text>

    <rect x="60" y="200" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="220" textAnchor="middle" fill="white" fontSize="9">Application</text>
    <text x="110" y="233" textAnchor="middle" fill="white" fontSize="9">Node 3</text>

    <rect x="200" y="60" width="90" height="45" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="245" y="85" textAnchor="middle" fill="white" fontSize="10">L1 Cache</text>

    <rect x="200" y="130" width="90" height="45" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="245" y="155" textAnchor="middle" fill="white" fontSize="10">L1 Cache</text>

    <rect x="200" y="200" width="90" height="45" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="245" y="225" textAnchor="middle" fill="white" fontSize="10">L1 Cache</text>

    <rect x="350" y="120" width="140" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="420" y="148" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">L2 Distributed</text>
    <text x="420" y="163" textAnchor="middle" fill="white" fontSize="10">Cache Cluster</text>

    <rect x="560" y="130" width="100" height="60" rx="8" fill="#6b7280" stroke="#9ca3af" strokeWidth="2"/>
    <text x="610" y="163" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Database</text>

    <line x1="160" y1="85" x2="195" y2="85" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead9)"/>
    <line x1="160" y1="155" x2="195" y2="155" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead9)"/>
    <line x1="160" y1="225" x2="195" y2="225" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead9)"/>
    <line x1="290" y1="85" x2="345" y2="140" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead9)"/>
    <line x1="290" y1="155" x2="345" y2="155" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead9)"/>
    <line x1="290" y1="225" x2="345" y2="170" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead9)"/>
    <line x1="490" y1="155" x2="555" y2="160" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead9)"/>
  </svg>
)

const APIIntegrationDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead10" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      API Integration Architecture
    </text>
    <rect x="50" y="55" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="83" textAnchor="middle" fill="white" fontSize="10">Trading UI</text>

    <rect x="50" y="120" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="148" textAnchor="middle" fill="white" fontSize="10">Risk App</text>

    <rect x="50" y="185" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="213" textAnchor="middle" fill="white" fontSize="10">Analytics</text>

    <rect x="240" y="120" width="120" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="300" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">API</text>
    <text x="300" y="160" textAnchor="middle" fill="white" fontSize="10">Gateway</text>

    <rect x="450" y="65" width="110" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="505" y="93" textAnchor="middle" fill="white" fontSize="10">Risk API</text>

    <rect x="450" y="130" width="110" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="505" y="158" textAnchor="middle" fill="white" fontSize="10">Position API</text>

    <rect x="450" y="195" width="110" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="505" y="215" textAnchor="middle" fill="white" fontSize="9">Market</text>
    <text x="505" y="228" textAnchor="middle" fill="white" fontSize="9">Data API</text>

    <line x1="150" y1="80" x2="235" y2="135" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead10)"/>
    <line x1="150" y1="145" x2="235" y2="150" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead10)"/>
    <line x1="150" y1="210" x2="235" y2="165" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead10)"/>
    <line x1="360" y1="135" x2="445" y2="90" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead10)"/>
    <line x1="360" y1="150" x2="445" y2="155" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead10)"/>
    <line x1="360" y1="165" x2="445" y2="220" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead10)"/>
  </svg>
)

const RiskVisualizationDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead11" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Risk Visualization Platform
    </text>
    <rect x="60" y="70" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="90" textAnchor="middle" fill="white" fontSize="10">Position</text>
    <text x="110" y="103" textAnchor="middle" fill="white" fontSize="10">Data</text>

    <rect x="60" y="140" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="160" textAnchor="middle" fill="white" fontSize="10">Market</text>
    <text x="110" y="173" textAnchor="middle" fill="white" fontSize="10">Data</text>

    <rect x="60" y="210" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="230" textAnchor="middle" fill="white" fontSize="10">Greeks</text>
    <text x="110" y="243" textAnchor="middle" fill="white" fontSize="10">Calculator</text>

    <rect x="240" y="140" width="130" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="305" y="165" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Risk</text>
    <text x="305" y="180" textAnchor="middle" fill="white" fontSize="10">Aggregation</text>
    <text x="305" y="193" textAnchor="middle" fill="white" fontSize="10">Engine</text>

    <rect x="460" y="70" width="110" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="515" y="90" textAnchor="middle" fill="white" fontSize="10">Dashboard</text>
    <text x="515" y="103" textAnchor="middle" fill="white" fontSize="10">UI</text>

    <rect x="460" y="140" width="110" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="515" y="168" textAnchor="middle" fill="white" fontSize="10">Heat Maps</text>

    <rect x="460" y="210" width="110" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="515" y="230" textAnchor="middle" fill="white" fontSize="10">Scenario</text>
    <text x="515" y="243" textAnchor="middle" fill="white" fontSize="10">Analysis</text>

    <line x1="160" y1="95" x2="235" y2="160" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead11)"/>
    <line x1="160" y1="165" x2="235" y2="175" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead11)"/>
    <line x1="160" y1="235" x2="235" y2="190" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead11)"/>
    <line x1="370" y1="160" x2="455" y2="95" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead11)"/>
    <line x1="370" y1="175" x2="455" y2="165" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead11)"/>
    <line x1="370" y1="190" x2="455" y2="235" stroke="#71717a" strokeWidth="2" markerEnd="url(#arrowhead11)"/>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function DarkPoolMatchingEngineBasic({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'technical-leadership',
      name: 'Technical Leadership & Requirements Analysis',
      icon: '🎯',
      color: '#3b82f6',
      description: 'Led technical discussions with rates trading desk for real-time analytics solutions',
      diagram: RequirementsFlowDiagram,
      details: [
        {
          name: 'Requirements Analysis',
          diagram: RequirementsFlowDiagram,
          explanation: 'Led technical discussions with rates trading desk to analyze complex risk calculation requirements and design streaming solutions for real-time analytics. Enabled traders to capture market opportunities 3x faster through optimized technical architecture. Bridged gap between trading desk requirements and technical implementation. Designed streaming solutions aligned with business objectives and risk management needs.',
          codeExample: `// Requirements gathering approach
public class RequirementsAnalysis {
    private TradingDeskRequirements tradingRequirements;
    private TechnicalCapabilities technicalCapabilities;

    public StreamingSolution analyzeAndDesign() {
        // Gather business requirements
        List<RiskRequirement> requirements =
            tradingRequirements.getRiskCalculationNeeds();

        // Analyze technical constraints
        TechnicalConstraints constraints =
            technicalCapabilities.assessConstraints();

        // Design solution architecture
        return StreamingSolutionBuilder.create()
            .withRequirements(requirements)
            .withConstraints(constraints)
            .optimizeForLatency()
            .build();
    }
}`
        },
        {
          name: 'Business Impact',
          explanation: '3x faster market opportunity capture through optimized technical architecture. Direct collaboration with trading desk resulted in solutions that significantly improved trading execution speed and decision-making capabilities. The technical implementations were designed to align perfectly with business objectives while maintaining system reliability.',
          codeExample: `// Performance metrics tracking
public class BusinessImpactMetrics {
    private static final int PREVIOUS_LATENCY_MS = 3000;
    private static final int CURRENT_LATENCY_MS = 1000;

    public PerformanceImprovement calculateImprovement() {
        double improvementFactor =
            (double) PREVIOUS_LATENCY_MS / CURRENT_LATENCY_MS;

        return PerformanceImprovement.builder()
            .improvementFactor(improvementFactor)  // 3x faster
            .previousLatency(PREVIOUS_LATENCY_MS)
            .currentLatency(CURRENT_LATENCY_MS)
            .impactDescription("3x faster market opportunity capture")
            .build();
    }
}`
        },
        {
          name: 'Solution Architecture',
          explanation: 'Designed streaming solutions aligned with business objectives and risk management needs. The architecture incorporated real-time event processing, distributed caching, and reactive programming patterns to meet the stringent performance and reliability requirements of institutional trading operations.',
          codeExample: `// Solution architecture design
@Configuration
public class StreamingArchitecture {

    @Bean
    public KafkaStreamsConfig kafkaStreams() {
        return KafkaStreamsConfig.builder()
            .applicationId("rates-trading-platform")
            .bootstrapServers(kafkaBootstrapServers)
            .processingGuarantee(ProcessingGuarantee.EXACTLY_ONCE)
            .build();
    }

    @Bean
    public RiskCalculationPipeline riskPipeline(
            KafkaStreamsConfig config) {
        return new RiskCalculationPipeline(config)
            .withRealtimeProcessing()
            .withDistributedCaching()
            .withFaultTolerance();
    }
}`
        }
      ]
    },
    {
      id: 'kafka-streaming',
      name: 'Kafka-Based Streaming Platform',
      icon: '🚀',
      color: '#ef4444',
      description: 'Architected high-throughput streaming platform processing millions of messages for real-time risk calculations',
      diagram: KafkaStreamingDiagram,
      details: [
        {
          name: 'Architecture Design',
          diagram: KafkaStreamingDiagram,
          explanation: 'Architected Kafka-based streaming platform processing millions of messages for real-time risk calculations. The platform is designed to handle $3B+ daily notional trading volume with enterprise-grade reliability. Achieved 99.999% uptime (less than 5 minutes downtime per year) through careful system design and redundancy.',
          codeExample: `// Kafka streaming configuration
@Configuration
public class KafkaStreamingPlatform {

    @Bean
    public Properties kafkaConfig() {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG,
                 "risk-calculation-platform");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG,
                 "kafka-cluster:9092");
        props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG,
                 StreamsConfig.EXACTLY_ONCE_V2);
        props.put(StreamsConfig.NUM_STREAM_THREADS_CONFIG, 8);
        return props;
    }

    @Bean
    public StreamsBuilder kafkaStreamsBuilder() {
        return new StreamsBuilder();
    }
}`
        },
        {
          name: 'High Availability',
          explanation: 'Achieved 99.999% uptime (less than 5 minutes downtime per year) through distributed system design. The platform is designed for horizontal scalability and fault tolerance across distributed systems. Multiple availability zones, automatic failover, and health monitoring ensure continuous operation.',
          codeExample: `// High availability configuration
public class HighAvailabilitySetup {

    public KafkaCluster configureCluster() {
        return KafkaCluster.builder()
            .withReplicationFactor(3)  // Data replicated 3x
            .withMinInSyncReplicas(2)  // Ensure consistency
            .withAvailabilityZones(
                List.of("us-east-1a", "us-east-1b", "us-east-1c"))
            .withAutomaticFailover(true)
            .withHealthChecks(
                HealthCheck.every(Duration.ofSeconds(30)))
            .build();
    }
}`
        },
        {
          name: 'Performance Metrics',
          explanation: 'Supporting $3B+ daily notional trading volume with low-latency message processing. The platform processes millions of messages per day with consistent throughput and reliability. Performance monitoring and optimization ensure the system scales with business growth.',
          codeExample: `// Performance monitoring
@Service
public class PerformanceMonitor {
    private final MeterRegistry meterRegistry;

    public void trackMessageProcessing(String topic) {
        Counter.builder("kafka.messages.processed")
            .tag("topic", topic)
            .description("Messages processed per topic")
            .register(meterRegistry)
            .increment();
    }

    public void trackTradingVolume(BigDecimal notional) {
        meterRegistry.gauge("trading.volume.daily",
            notional.doubleValue());
        // Target: $3B+ daily notional
    }
}`
        }
      ]
    },
    {
      id: 'event-processing',
      name: 'High-Volume Event Processing System',
      icon: '⚡',
      color: '#10b981',
      description: 'Delivered scalable event processing handling 5M+ messages/day for intraday risk computation',
      diagram: EventProcessingDiagram,
      details: [
        {
          name: 'Processing Pipeline',
          diagram: EventProcessingDiagram,
          explanation: 'Delivered event processing system handling 5M+ messages/day for intraday risk computation. Real-time processing of trade events, market data updates, and risk calculations with intelligent load balancing. The system implements efficient message routing and processing pipelines optimized for throughput and latency.',
          codeExample: `// Event processing pipeline
@Service
public class EventProcessingPipeline {

    @StreamListener("trade-events")
    public void processTradeEvent(TradeEvent event) {
        CompletableFuture.runAsync(() -> {
            // Route to appropriate processor
            EventRouter.route(event)
                .to(RiskCalculator.class)
                .withPriority(event.getPriority())
                .process();
        });
    }

    @StreamListener("market-data")
    public void processMarketData(MarketDataEvent event) {
        // High-frequency market data processing
        marketDataCache.update(event);
        triggerRiskRecalculation(event.getSymbol());
    }
}`
        },
        {
          name: 'Message Routing',
          explanation: 'Implemented efficient message routing and processing pipelines with intelligent load balancing. The system uses event-driven architecture to distribute workload across multiple processors. Message deduplication and idempotency mechanisms ensure data integrity.',
          codeExample: `// Intelligent message routing
public class EventRouter {
    private final LoadBalancer loadBalancer;
    private final MessageDeduplicator deduplicator;

    public void route(Event event) {
        // Check for duplicates
        if (deduplicator.isDuplicate(event.getId())) {
            return;  // Skip duplicate
        }

        // Route based on event type and load
        Processor processor = loadBalancer.selectProcessor(
            event.getType(),
            event.getPriority()
        );

        processor.process(event)
            .whenComplete((result, error) -> {
                if (error != null) {
                    handleError(event, error);
                }
            });
    }
}`
        },
        {
          name: 'Resilience Patterns',
          explanation: 'Built message deduplication and idempotency mechanisms to ensure data integrity. Implemented circuit breakers and fallback mechanisms for resilient processing. The system includes monitoring dashboards showing real-time message throughput and processing latency, with event schema evolution strategy allowing backward-compatible changes.',
          codeExample: `// Circuit breaker pattern
@Service
public class ResilientProcessor {

    @CircuitBreaker(name = "riskCalculation",
                   fallbackMethod = "fallbackCalculation")
    @Retry(name = "riskCalculation")
    public RiskMetrics calculateRisk(Position position) {
        return riskCalculationService.calculate(position);
    }

    private RiskMetrics fallbackCalculation(
            Position position, Exception ex) {
        // Return cached or estimated values
        return riskCache.getOrEstimate(position);
    }
}`
        }
      ]
    },
    {
      id: 'apache-flink',
      name: 'Apache Flink Complex Event Processing',
      icon: '🌊',
      color: '#8b5cf6',
      description: 'Implemented Flink for millisecond-latency market data processing',
      diagram: FlinkStreamingDiagram,
      details: [
        {
          name: 'Stream Processing',
          diagram: FlinkStreamingDiagram,
          explanation: 'Implemented Apache Flink for complex event processing in rates trading systems. Reduced market data latency from seconds to milliseconds - critical for trading decisions. Built stateful stream processing for complex financial calculations with real-time aggregations, windowing, and pattern detection.',
          codeExample: `// Flink stream processing
public class FlinkStreamProcessor {

    public void setupStreamProcessing(StreamExecutionEnvironment env) {
        DataStream<MarketData> marketDataStream = env
            .addSource(new KafkaSource<>("market-data-topic"))
            .keyBy(MarketData::getSymbol);

        // Windowed aggregation
        marketDataStream
            .window(TumblingEventTimeWindows.of(Time.seconds(1)))
            .aggregate(new RiskAggregator())
            .addSink(new KafkaSink<>("risk-metrics-topic"));

        // Pattern detection
        Pattern<MarketData, ?> pattern = Pattern
            .<MarketData>begin("start")
            .where(new PriceSpike())
            .next("alert")
            .where(new VolumeIncrease());
    }
}`
        },
        {
          name: 'Latency Optimization',
          explanation: 'Reduced market data latency from seconds to milliseconds - critical for trading decisions. The optimization involved tuning Flink operators, optimizing serialization, and implementing efficient state management. Low latency enables traders to respond to market changes in real-time.',
          codeExample: `// Latency-optimized configuration
public class LatencyOptimization {

    public StreamExecutionEnvironment configure() {
        StreamExecutionEnvironment env =
            StreamExecutionEnvironment.getExecutionEnvironment();

        // Optimize for low latency
        env.setBufferTimeout(1L);  // 1ms buffer timeout
        env.enableCheckpointing(5000);  // 5 second checkpoints

        // Use RocksDB for efficient state
        env.setStateBackend(new RocksDBStateBackend(
            "hdfs://checkpoints", true));

        return env;
    }
}`
        },
        {
          name: 'Complex Event Patterns',
          explanation: 'Enabled real-time aggregations, windowing, and pattern detection on market data. Flink provides powerful APIs for detecting complex event patterns, time-based windows, and stateful computations. These capabilities enable sophisticated risk analytics and market monitoring.',
          codeExample: `// Complex event pattern detection
public class MarketPatternDetector {

    public DataStream<Alert> detectPatterns(
            DataStream<MarketData> stream) {

        Pattern<MarketData, ?> complexPattern = Pattern
            .<MarketData>begin("priceSpike")
            .where(evt -> evt.getPriceChange() > 0.05)
            .next("volumeSurge")
            .where(evt -> evt.getVolume() > avgVolume * 2)
            .within(Time.minutes(5));

        return CEP.pattern(stream, complexPattern)
            .select(new PatternSelectFunction<>() {
                public Alert select(Map<String, List<MarketData>> pattern) {
                    return Alert.createHighPriority(pattern);
                }
            });
    }
}`
        }
      ]
    },
    {
      id: 'fault-tolerant',
      name: 'Fault-Tolerant Stream Processing',
      icon: '🛡️',
      color: '#f59e0b',
      description: 'Developed exactly-once semantics ensuring zero data loss',
      diagram: FaultTolerantDiagram,
      details: [
        {
          name: 'Exactly-Once Semantics',
          diagram: FaultTolerantDiagram,
          explanation: 'Developed fault-tolerant stream processing with exactly-once semantics for financial data. Ensuring zero data loss through distributed checkpointing and state management. 100% accuracy in P&L calculations - critical for financial compliance and regulatory requirements. Implemented idempotent processing and transactional guarantees across distributed systems.',
          codeExample: `// Exactly-once processing configuration
public class ExactlyOnceProcessing {

    public Properties configureExactlyOnce() {
        Properties props = new Properties();

        // Enable exactly-once semantics (EOS)
        props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG,
                 StreamsConfig.EXACTLY_ONCE_V2);

        // Transaction timeout
        props.put(StreamsConfig.TRANSACTION_TIMEOUT_CONFIG, 30000);

        // Commit interval for checkpointing
        props.put(StreamsConfig.COMMIT_INTERVAL_MS_CONFIG, 100);

        return props;
    }
}`
        },
        {
          name: 'State Management',
          explanation: 'Built automatic recovery mechanisms with state restoration from latest checkpoints. Designed distributed state backends using RocksDB for efficient state storage and retrieval. The system maintains consistent state across failures and restarts. Created monitoring and alerting for checkpoint failures and recovery scenarios.',
          codeExample: `// Distributed state management
public class StateManagement {

    @Bean
    public StateBackend rocksDBStateBackend() {
        RocksDBStateBackend backend = new RocksDBStateBackend(
            "hdfs://namenode:8020/flink/checkpoints",
            true  // Enable incremental checkpoints
        );

        // Configure RocksDB options
        backend.setDbStoragePath("/tmp/rocksdb");
        backend.setPredefinedOptions(
            PredefinedOptions.SPINNING_DISK_OPTIMIZED);

        return backend;
    }
}`
        },
        {
          name: 'Recovery & Testing',
          explanation: 'Implemented exactly-once delivery guarantees between Kafka and downstream systems. Developed comprehensive testing framework for fault injection and recovery validation. The system is tested for various failure scenarios including network partitions, node failures, and resource exhaustion.',
          codeExample: `// Fault injection testing
@Test
public class FaultToleranceTest {

    @Test
    public void testRecoveryFromCheckpoint() {
        // Simulate processing
        streamProcessor.processEvents(testEvents);

        // Inject failure
        simulateNodeFailure();

        // Verify recovery
        streamProcessor.restartFromCheckpoint();

        // Assert no data loss
        assertThat(processedEvents)
            .hasSize(testEvents.size())
            .containsExactlyElementsOf(testEvents);
    }
}`
        }
      ]
    },
    {
      id: 'position-pnl',
      name: 'Real-Time Position & P&L Monitoring',
      icon: '📊',
      color: '#06b6d4',
      description: 'Built monitoring engine improving desk profitability by 12%',
      diagram: PositionPnLDiagram,
      details: [
        {
          name: 'Real-Time Engine',
          diagram: PositionPnLDiagram,
          explanation: 'Built real-time position and P&L monitoring engine for rates trading desk. Providing instant visibility into trading positions and profit/loss metrics across all asset classes. Improved trading decisions through real-time analytics, risk insights, and market exposure tracking. Increased desk profitability by 12% through better risk management.',
          codeExample: `// Real-time P&L monitoring
@Service
public class PnLMonitoringEngine {

    @StreamListener("trade-executions")
    public void updatePosition(TradeExecution trade) {
        Position position = positionRepository
            .findBySymbol(trade.getSymbol())
            .orElse(new Position(trade.getSymbol()));

        // Update position
        position.addTrade(trade);

        // Calculate real-time P&L
        BigDecimal marketPrice = marketDataService
            .getCurrentPrice(trade.getSymbol());
        BigDecimal pnl = position.calculatePnL(marketPrice);

        // Publish update
        pnlUpdatePublisher.publish(
            PnLUpdate.of(trade.getSymbol(), pnl));
    }
}`
        },
        {
          name: 'Greeks & Analytics',
          explanation: 'Implemented real-time Greeks calculation for swaptions and bonds portfolio. Created aggregated views showing desk-level, trader-level, and instrument-level P&L. Built alerting system for position limits, risk thresholds, and unusual P&L movements. Integrated with market data feeds for mark-to-market valuations.',
          codeExample: `// Greeks calculation for derivatives
public class GreeksCalculator {

    public Greeks calculateGreeks(Swaption swaption,
                                  MarketData market) {
        // Calculate option Greeks
        double delta = calculateDelta(swaption, market);
        double gamma = calculateGamma(swaption, market);
        double vega = calculateVega(swaption, market);
        double theta = calculateTheta(swaption, market);
        double rho = calculateRho(swaption, market);

        return Greeks.builder()
            .delta(delta)
            .gamma(gamma)
            .vega(vega)
            .theta(theta)
            .rho(rho)
            .build();
    }
}`
        },
        {
          name: 'P&L Attribution',
          explanation: 'Designed historical P&L attribution analysis showing profit drivers by risk factor. The system breaks down P&L into components like price movements, theta decay, volatility changes, and interest rate shifts. This analysis helps traders understand sources of profit and loss.',
          codeExample: `// P&L attribution analysis
public class PnLAttribution {

    public AttributionBreakdown analyzePnL(
            Portfolio portfolio, DateRange period) {

        BigDecimal pricePnL = calculatePriceEffect(portfolio);
        BigDecimal thetaPnL = calculateThetaDecay(portfolio);
        BigDecimal vegaPnL = calculateVolatilityEffect(portfolio);
        BigDecimal rhoPnL = calculateRateEffect(portfolio);

        return AttributionBreakdown.builder()
            .priceEffect(pricePnL)
            .thetaDecay(thetaPnL)
            .volatilityEffect(vegaPnL)
            .rateEffect(rhoPnL)
            .totalPnL(pricePnL.add(thetaPnL)
                             .add(vegaPnL)
                             .add(rhoPnL))
            .build();
    }
}`
        }
      ]
    },
    {
      id: 'spring-reactor',
      name: 'Reactive Programming with Spring Reactor',
      icon: '⚛️',
      color: '#ec4899',
      description: 'Leveraged reactive programming for high-frequency trading systems',
      diagram: ReactiveSystemDiagram,
      details: [
        {
          name: 'Reactive Architecture',
          diagram: ReactiveSystemDiagram,
          explanation: 'Leveraged Spring Reactor for reactive programming in high-frequency trading systems. Handling 50K+ trades per second during peak market volatility periods. Non-blocking, asynchronous processing for maximum throughput and resource efficiency. Back-pressure handling to prevent system overload during unexpected market spikes.',
          codeExample: `// Reactive trading system
@RestController
public class ReactiveTradingController {

    @PostMapping("/trades")
    public Mono<TradeConfirmation> executeTrade(
            @RequestBody TradeRequest request) {

        return Mono.just(request)
            .flatMap(this::validateTrade)
            .flatMap(this::checkRiskLimits)
            .flatMap(this::executeTrade)
            .flatMap(this::persistTrade)
            .map(TradeConfirmation::from)
            .timeout(Duration.ofMillis(100))
            .onErrorResume(this::handleTradeError);
    }
}`
        },
        {
          name: 'Non-Blocking I/O',
          explanation: 'Built reactive REST APIs using WebFlux for real-time trade execution. Designed operator chains for complex event transformations with minimal latency. Created custom schedulers optimized for financial processing workloads. The reactive approach maximizes hardware utilization and system throughput.',
          codeExample: `// WebFlux configuration
@Configuration
public class WebFluxConfig {

    @Bean
    public WebClient tradingWebClient() {
        return WebClient.builder()
            .baseUrl("http://trading-engine")
            .defaultHeader(HttpHeaders.CONTENT_TYPE,
                          MediaType.APPLICATION_JSON_VALUE)
            .exchangeStrategies(ExchangeStrategies.builder()
                .codecs(configurer -> configurer
                    .defaultCodecs()
                    .maxInMemorySize(16 * 1024 * 1024))
                .build())
            .build();
    }
}`
        },
        {
          name: 'Back-Pressure & Error Handling',
          explanation: 'Implemented reactive streams for end-to-end non-blocking data flow. Back-pressure handling prevents system overload by signaling upstream producers to slow down when consumers cannot keep up. Implemented reactive error handling and retry strategies for transient failures.',
          codeExample: `// Back-pressure and error handling
public class ReactivePipeline {

    public Flux<RiskMetrics> processMarketData(
            Flux<MarketData> dataStream) {

        return dataStream
            .onBackpressureBuffer(10000,
                BufferOverflowStrategy.DROP_OLDEST)
            .map(this::enrichWithReferenceData)
            .flatMap(this::calculateRisk, 8)  // Concurrency: 8
            .retryWhen(Retry.backoff(3, Duration.ofSeconds(1))
                .filter(throwable ->
                    throwable instanceof TransientException))
            .doOnError(error ->
                log.error("Processing error", error));
    }
}`
        }
      ]
    },
    {
      id: 'oracle-coherence',
      name: 'Oracle Coherence Caching Solution',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Implemented distributed caching reducing latency by 80%',
      diagram: CoherenceCachingDiagram,
      details: [
        {
          name: 'Caching Strategy',
          diagram: CoherenceCachingDiagram,
          explanation: 'Implemented caching solution using Oracle Coherence reducing market data access latency by 80%. Directly improving trading execution speed through faster data access. Distributed in-memory data grid for high-performance caching with real-time data synchronization across multiple trading applications.',
          codeExample: `// Oracle Coherence configuration
@Configuration
public class CoherenceConfiguration {

    @Bean
    public NamedCache<String, MarketData> marketDataCache() {
        return CacheFactory.getCache("market-data-cache");
    }

    @Bean
    public CacheService cacheService() {
        CacheService service = new CacheService();

        // Configure near cache for ultra-low latency
        service.setFrontCacheEnabled(true);
        service.setFrontCacheSize(10000);
        service.setExpiryDelay(30, TimeUnit.SECONDS);

        return service;
    }
}`
        },
        {
          name: 'Performance Impact',
          explanation: '80% latency reduction directly improving trading execution speed. The caching layer stores frequently accessed data like market prices, reference data, and position information in memory. This eliminates expensive database queries and network calls during time-critical trading operations.',
          codeExample: `// Cache-optimized market data access
@Service
public class MarketDataService {
    private final NamedCache<String, MarketData> cache;

    public MarketData getMarketData(String symbol) {
        // Try cache first (sub-millisecond)
        MarketData data = cache.get(symbol);

        if (data == null) {
            // Cache miss - fetch from database (80ms+)
            data = database.query(symbol);
            cache.put(symbol, data);
        }

        return data;
        // 80% latency reduction: 80ms -> 16ms avg
    }
}`
        },
        {
          name: 'Data Grid Architecture',
          explanation: 'Distributed in-memory data grid for high-performance caching. Real-time data synchronization across multiple trading applications. Coherence provides automatic data partitioning, replication, and failover capabilities. The distributed nature ensures no single point of failure.',
          codeExample: `// Distributed cache operations
public class DistributedCacheOperations {

    public void updateMarketData(MarketData data) {
        // Update propagates to all nodes
        cache.invoke(data.getSymbol(), entry -> {
            entry.setValue(data);

            // Trigger listeners on all nodes
            return null;
        });
    }

    @EntryUpdated
    public void onMarketDataUpdate(CacheEntryEvent event) {
        // Notification received on all nodes
        MarketData updated = (MarketData) event.getValue();
        notifyTradingApplications(updated);
    }
}`
        }
      ]
    },
    {
      id: 'distributed-caching',
      name: 'Distributed Caching Layer',
      icon: '🗄️',
      color: '#8b5cf6',
      description: 'Designed caching layer reducing database load by 90%',
      diagram: MultiTierCachingDiagram,
      details: [
        {
          name: 'Multi-Tier Architecture',
          diagram: MultiTierCachingDiagram,
          explanation: 'Designed distributed caching layer reducing database load by 90%. Significantly improved response times for data-intensive operations across trading applications. Multi-tier caching architecture with L1 (local), L2 (distributed) for optimal performance. Implemented intelligent cache invalidation strategies ensuring data consistency.',
          codeExample: `// Multi-tier caching configuration
@Configuration
public class MultiTierCaching {

    @Bean
    public CacheManager cacheManager() {
        return CacheManagerBuilder.newCacheManagerBuilder()
            .with(CacheManagerBuilder.persistence(
                "cache-storage"))
            .withCache("market-data",
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(
                        String.class,
                        MarketData.class,
                        ResourcePoolsBuilder.newResourcePoolsBuilder()
                            .heap(10000, EntryUnit.ENTRIES)  // L1
                            .offheap(100, MemoryUnit.MB)     // L2
                            .disk(1, MemoryUnit.GB))         // L3
                    .withExpiry(ExpiryPolicyBuilder
                        .timeToLiveExpiration(
                            Duration.ofMinutes(5))))
            .build(true);
    }
}`
        },
        {
          name: 'Cache Strategies',
          explanation: 'Built cache warming strategies for frequently accessed reference data. Designed TTL-based and event-driven cache eviction policies. Implemented read-through and write-through caching patterns for database synchronization. Created cache monitoring and metrics for hit rates, eviction rates, and performance analysis.',
          codeExample: `// Caching strategies implementation
@Service
public class CachingStrategy {

    @Cacheable(value = "reference-data",
               key = "#id",
               unless = "#result == null")
    public ReferenceData getReferenceData(String id) {
        return database.fetchReferenceData(id);
    }

    @CacheEvict(value = "reference-data", key = "#id")
    public void invalidateCache(String id) {
        // Event-driven cache invalidation
    }

    @Scheduled(cron = "0 0 6 * * *")  // 6 AM daily
    public void warmCache() {
        // Pre-load frequently accessed data
        List<String> hotKeys = getFrequentlyAccessedKeys();
        hotKeys.forEach(this::getReferenceData);
    }
}`
        },
        {
          name: 'Performance Optimization',
          explanation: 'Optimized memory usage with compression and serialization strategies. The caching layer uses efficient serialization formats like Kryo or Protocol Buffers. Compression reduces memory footprint for large cached objects. Monitoring tracks cache effectiveness and identifies optimization opportunities.',
          codeExample: `// Cache performance optimization
@Configuration
public class CacheOptimization {

    @Bean
    public Serializer<MarketData> optimizedSerializer() {
        return new KryoSerializer<>(MarketData.class,
            config -> {
                config.setRegistrationRequired(false);
                config.setReferences(false);  // No circular refs
                config.setWarnUnregisteredClasses(false);
            });
    }

    @Bean
    public CompressionCodec compressionCodec() {
        return new LZ4Codec();  // Fast compression
    }

    // Result: 90% database load reduction
    // Cache hit rate: 95%+
    // Average response time: <5ms
}`
        }
      ]
    },
    {
      id: 'restful-apis',
      name: 'RESTful APIs for Risk Metrics',
      icon: '🔌',
      color: '#3b82f6',
      description: 'Created APIs enabling integration with 20+ trading applications',
      diagram: APIIntegrationDiagram,
      details: [
        {
          name: 'API Design',
          diagram: APIIntegrationDiagram,
          explanation: 'Created RESTful APIs for real-time risk metrics and position visualization. Enabling front-office integration with 20+ trading applications and systems. Standardized API contracts using OpenAPI/Swagger specifications for risk data consumption. Real-time streaming endpoints using Server-Sent Events for live market data.',
          codeExample: `// RESTful API for risk metrics
@RestController
@RequestMapping("/api/v1/risk")
public class RiskMetricsAPI {

    @GetMapping("/positions/{traderId}")
    public ResponseEntity<List<Position>> getPositions(
            @PathVariable String traderId) {

        List<Position> positions =
            riskService.getPositionsByTrader(traderId);

        return ResponseEntity.ok()
            .cacheControl(CacheControl.maxAge(5, TimeUnit.SECONDS))
            .body(positions);
    }

    @GetMapping(value = "/live-risk/{traderId}",
                produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<RiskMetrics>> streamRisk(
            @PathVariable String traderId) {

        return riskStreamService.streamRiskMetrics(traderId)
            .map(metrics -> ServerSentEvent.<RiskMetrics>builder()
                .data(metrics)
                .event("risk-update")
                .build());
    }
}`
        },
        {
          name: 'Security & Rate Limiting',
          explanation: 'Implemented OAuth2 and JWT-based authentication for secure API access. Built rate limiting and throttling mechanisms to protect backend systems. The API gateway enforces authentication, authorization, and quota management. Security is critical for protecting sensitive financial data.',
          codeExample: `// API security configuration
@Configuration
@EnableWebSecurity
public class APISecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        return http
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.decoder(jwtDecoder())))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/risk/**")
                    .hasRole("TRADER")
                .anyRequest().authenticated())
            .build();
    }

    @Bean
    public RateLimiter rateLimiter() {
        return RateLimiter.of("api-limiter",
            RateLimiterConfig.custom()
                .limitForPeriod(1000)  // 1000 requests
                .limitRefreshPeriod(Duration.ofSeconds(1))
                .build());
    }
}`
        },
        {
          name: 'API Management',
          explanation: 'Designed versioned API endpoints ensuring backward compatibility. Created comprehensive API documentation with examples and integration guides. Built API gateway with request routing, load balancing, and circuit breaking. Implemented WebSocket endpoints for bi-directional real-time communication.',
          codeExample: `// API versioning and documentation
@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Risk Metrics API",
        version = "1.0",
        description = "Real-time risk and position APIs"
    ),
    servers = {
        @Server(url = "https://api.trading.com/v1",
                description = "Production"),
        @Server(url = "https://api-staging.trading.com/v1",
                description = "Staging")
    }
)
public class APIDocumentation {

    @Operation(summary = "Get trader positions",
               description = "Returns all positions for trader")
    @ApiResponses({
        @ApiResponse(responseCode = "200",
                     description = "Success"),
        @ApiResponse(responseCode = "404",
                     description = "Trader not found")
    })
    public void getPositions() { }
}`
        }
      ]
    },
    {
      id: 'risk-visualization',
      name: 'Enhanced Risk Visualization',
      icon: '📈',
      color: '#10b981',
      description: 'Direct collaboration delivering visualization for $10B+ portfolio',
      diagram: RiskVisualizationDiagram,
      details: [
        {
          name: 'Dashboard Design',
          diagram: RiskVisualizationDiagram,
          explanation: 'Direct collaboration with rates trading desk resulted in enhanced risk visualization for swaptions and bonds portfolio worth $10B+ notional value. Real-time dashboards showing Greeks (Delta, Gamma, Vega, Theta), sensitivities, and risk exposures. Interactive visualizations enabling rapid risk assessment and decision-making.',
          codeExample: `// Risk visualization data service
@Service
public class RiskVisualizationService {

    public DashboardData getDashboardData(String traderId) {
        Portfolio portfolio =
            portfolioService.getPortfolio(traderId);

        // Calculate Greeks for entire portfolio
        Greeks portfolioGreeks =
            calculatePortfolioGreeks(portfolio);

        // Risk concentrations by dimension
        Map<String, BigDecimal> byCurrency =
            calculateRiskByCurrency(portfolio);
        Map<String, BigDecimal> byMaturity =
            calculateRiskByMaturity(portfolio);
        Map<String, BigDecimal> byCounterparty =
            calculateRiskByCounterparty(portfolio);

        return DashboardData.builder()
            .greeks(portfolioGreeks)
            .riskByCurrency(byCurrency)
            .riskByMaturity(byMaturity)
            .riskByCounterparty(byCounterparty)
            .build();
    }
}`
        },
        {
          name: 'Interactive Analytics',
          explanation: 'Built heat maps showing risk concentrations by maturity, currency, and counterparty. Designed drill-down capabilities from portfolio to individual position level. Implemented scenario analysis tools for stress testing and what-if analysis. Created real-time P&L attribution charts showing profit drivers by risk factor.',
          codeExample: `// Interactive analytics and drill-down
@RestController
public class InteractiveAnalyticsAPI {

    @GetMapping("/risk-heatmap")
    public HeatMapData getRiskHeatMap(
            @RequestParam String dimension) {

        return switch (dimension) {
            case "maturity" ->
                heatMapService.byMaturity();
            case "currency" ->
                heatMapService.byCurrency();
            case "counterparty" ->
                heatMapService.byCounterparty();
            default ->
                throw new IllegalArgumentException(
                    "Unknown dimension: " + dimension);
        };
    }

    @PostMapping("/scenario-analysis")
    public ScenarioResult runScenario(
            @RequestBody ScenarioRequest scenario) {

        return scenarioEngine.analyze(
            scenario.getPortfolio(),
            scenario.getMarketShifts()
        );
    }
}`
        },
        {
          name: 'Monitoring & Alerts',
          explanation: 'Built limit monitoring displays with visual indicators for threshold breaches. Integrated with Excel via API for ad-hoc analysis and custom reporting. The visualization platform provides traders with comprehensive views of risk exposures and enables proactive risk management.',
          codeExample: `// Risk monitoring and alerts
@Service
public class RiskMonitoringService {

    @Scheduled(fixedRate = 5000)  // Every 5 seconds
    public void monitorRiskLimits() {
        List<Position> positions =
            positionRepository.findAllActive();

        positions.forEach(position -> {
            RiskMetrics risk =
                calculateRisk(position);

            // Check against limits
            if (risk.getDelta() > limits.getMaxDelta()) {
                alertService.sendAlert(
                    Alert.deltaLimit(position, risk));
            }

            if (risk.getVega() > limits.getMaxVega()) {
                alertService.sendAlert(
                    Alert.vegaLimit(position, risk));
            }
        });
    }
}`
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
      { name: 'Projects', icon: '💼', page: 'Projects' },
      { name: 'Dark Pool Engine', icon: '⚡', page: 'Dark Pool Engine' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
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
        if (selectedConcept) {
          setSelectedConceptIndex(null)
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
    background: 'linear-gradient(135deg, #0f172a 0%, #3f3f46 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #a1a1aa, #71717a)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(113, 113, 122, 0.2)',
    border: '1px solid rgba(113, 113, 122, 0.3)',
    borderRadius: '0.5rem',
    color: '#a1a1aa',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Dark Pool Matching Engine - Basic</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(113, 113, 122, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(113, 113, 122, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={DARKPOOLBASIC_COLORS}
        />
      </div>

      {/* Introduction */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '1rem',
        padding: '2rem',
        border: '1px solid rgba(113, 113, 122, 0.3)'
      }}>
        <p style={{
          fontSize: '1.125rem',
          color: '#94a3b8',
          lineHeight: '1.8',
          margin: 0,
          textAlign: 'center'
        }}>
          Enterprise-grade streaming platform and real-time risk analytics for rates trading operations.
          Processing millions of events daily with high availability and fault tolerance for $10B+ portfolio management.
        </p>
      </div>

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
              onMainMenu={breadcrumb?.onMainMenu}
              colors={DARKPOOLBASIC_COLORS}
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
                      language="java"
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

export default DarkPoolMatchingEngineBasic

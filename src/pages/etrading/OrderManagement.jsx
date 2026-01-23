import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const ETRADING_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// Order Lifecycle State Machine Diagram
const OrderLifecycleDiagram = () => (
  <svg viewBox="0 0 800 400" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    {/* States */}
    <rect x="50" y="170" width="80" height="40" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="90" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">NEW</text>

    <rect x="180" y="170" width="100" height="40" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="230" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PENDING</text>

    <rect x="330" y="170" width="100" height="40" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="380" y="195" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ACKNOWLEDGED</text>

    <rect x="480" y="100" width="110" height="40" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="535" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PARTIAL FILL</text>

    <rect x="640" y="170" width="80" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="680" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">FILLED</text>

    <rect x="480" y="240" width="110" height="40" rx="8" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="535" y="265" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PENDING CANCEL</text>

    <rect x="640" y="300" width="90" height="40" rx="8" fill="#64748b" stroke="#94a3b8" strokeWidth="2"/>
    <text x="685" y="325" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">CANCELLED</text>

    <rect x="180" y="300" width="80" height="40" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="220" y="325" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">REJECTED</text>

    {/* Arrows */}
    <line x1="130" y1="190" x2="175" y2="190" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <line x1="280" y1="190" x2="325" y2="190" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 430 180 Q 450 120, 475 120" fill="none" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <line x1="590" y1="120" x2="660" y2="165" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 535 140 Q 535 155, 535 155 L 535 155" fill="none" stroke="#4ade80" strokeWidth="2"/>
    <path d="M 550 140 C 600 140, 620 150, 635 170" fill="none" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 430 200 Q 450 260, 475 260" fill="none" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <line x1="590" y1="260" x2="640" y2="305" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 230 210 L 230 295" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)"/>

    {/* Labels */}
    <text x="400" y="30" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Order Lifecycle State Machine</text>
    <text x="152" y="183" fill="#94a3b8" fontSize="9">submit</text>
    <text x="295" y="183" fill="#94a3b8" fontSize="9">ack</text>
    <text x="445" y="145" fill="#94a3b8" fontSize="9">fill</text>
    <text x="445" y="235" fill="#94a3b8" fontSize="9">cancel</text>
    <text x="208" y="255" fill="#ef4444" fontSize="9">reject</text>
  </svg>
)

// OMS Architecture Diagram
const OMSArchitectureDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    {/* Client Layer */}
    <rect x="50" y="30" width="700" height="60" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="55" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">Client Layer</text>
    <rect x="80" y="50" width="80" height="30" rx="4" fill="#3b82f6"/>
    <text x="120" y="70" textAnchor="middle" fill="white" fontSize="10">Trader UI</text>
    <rect x="180" y="50" width="80" height="30" rx="4" fill="#3b82f6"/>
    <text x="220" y="70" textAnchor="middle" fill="white" fontSize="10">API Client</text>
    <rect x="280" y="50" width="80" height="30" rx="4" fill="#3b82f6"/>
    <text x="320" y="70" textAnchor="middle" fill="white" fontSize="10">FIX Client</text>

    {/* OMS Core */}
    <rect x="150" y="120" width="500" height="100" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="145" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">Order Management System (OMS)</text>
    <rect x="170" y="160" width="90" height="45" rx="4" fill="#22c55e"/>
    <text x="215" y="178" textAnchor="middle" fill="white" fontSize="9">Order</text>
    <text x="215" y="192" textAnchor="middle" fill="white" fontSize="9">Validation</text>
    <rect x="280" y="160" width="90" height="45" rx="4" fill="#22c55e"/>
    <text x="325" y="178" textAnchor="middle" fill="white" fontSize="9">Risk</text>
    <text x="325" y="192" textAnchor="middle" fill="white" fontSize="9">Engine</text>
    <rect x="390" y="160" width="90" height="45" rx="4" fill="#22c55e"/>
    <text x="435" y="178" textAnchor="middle" fill="white" fontSize="9">Smart Order</text>
    <text x="435" y="192" textAnchor="middle" fill="white" fontSize="9">Router</text>
    <rect x="500" y="160" width="90" height="45" rx="4" fill="#22c55e"/>
    <text x="545" y="178" textAnchor="middle" fill="white" fontSize="9">Position</text>
    <text x="545" y="192" textAnchor="middle" fill="white" fontSize="9">Manager</text>

    {/* Execution Layer */}
    <rect x="150" y="250" width="500" height="70" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="275" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">Execution Layer</text>
    <rect x="180" y="285" width="100" height="25" rx="4" fill="#8b5cf6"/>
    <text x="230" y="302" textAnchor="middle" fill="white" fontSize="10">NYSE Gateway</text>
    <rect x="300" y="285" width="100" height="25" rx="4" fill="#8b5cf6"/>
    <text x="350" y="302" textAnchor="middle" fill="white" fontSize="10">NASDAQ Gateway</text>
    <rect x="420" y="285" width="100" height="25" rx="4" fill="#8b5cf6"/>
    <text x="470" y="302" textAnchor="middle" fill="white" fontSize="10">Dark Pool</text>

    {/* Arrows */}
    <line x1="400" y1="90" x2="400" y2="115" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow2)"/>
    <line x1="400" y1="220" x2="400" y2="245" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow2)"/>
  </svg>
)

// Validation Pipeline Diagram
const ValidationPipelineDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Order Validation Pipeline</text>

    {/* Pipeline stages */}
    <rect x="30" y="60" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Syntactic</text>
    <text x="80" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Validation</text>

    <rect x="180" y="60" width="100" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="230" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Semantic</text>
    <text x="230" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Validation</text>

    <rect x="330" y="60" width="100" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="380" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Risk</text>
    <text x="380" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Checks</text>

    <rect x="480" y="60" width="100" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="530" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Regulatory</text>
    <text x="530" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Compliance</text>

    <rect x="630" y="60" width="100" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="680" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Route to</text>
    <text x="680" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Market</text>

    {/* Arrows */}
    <line x1="130" y1="90" x2="175" y2="90" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow3)"/>
    <line x1="280" y1="90" x2="325" y2="90" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow3)"/>
    <line x1="430" y1="90" x2="475" y2="90" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow3)"/>
    <line x1="580" y1="90" x2="625" y2="90" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow3)"/>

    {/* Labels */}
    <text x="80" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Required fields</text>
    <text x="80" y="158" textAnchor="middle" fill="#64748b" fontSize="9">Format checks</text>
    <text x="230" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Business rules</text>
    <text x="230" y="158" textAnchor="middle" fill="#64748b" fontSize="9">Instrument valid</text>
    <text x="380" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Position limits</text>
    <text x="380" y="158" textAnchor="middle" fill="#64748b" fontSize="9">Credit checks</text>
    <text x="530" y="145" textAnchor="middle" fill="#64748b" fontSize="9">MiFID II</text>
    <text x="530" y="158" textAnchor="middle" fill="#64748b" fontSize="9">Best execution</text>
  </svg>
)

// FIX Session Diagram
const FIXSessionDiagram = () => (
  <svg viewBox="0 0 700 300" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">FIX Session Message Flow</text>

    {/* OMS */}
    <rect x="50" y="50" width="120" height="220" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">OMS</text>
    <line x1="110" y1="85" x2="110" y2="260" stroke="#22c55e" strokeWidth="2" strokeDasharray="4"/>

    {/* Exchange */}
    <rect x="530" y="50" width="120" height="220" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Exchange</text>
    <line x1="590" y1="85" x2="590" y2="260" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4"/>

    {/* Messages */}
    <line x1="115" y1="100" x2="585" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow4)"/>
    <text x="350" y="95" textAnchor="middle" fill="#60a5fa" fontSize="10">Logon (A)</text>

    <line x1="585" y1="130" x2="115" y2="130" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow4)"/>
    <text x="350" y="125" textAnchor="middle" fill="#60a5fa" fontSize="10">Logon (A) - Accepted</text>

    <line x1="115" y1="160" x2="585" y2="160" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow4)"/>
    <text x="350" y="155" textAnchor="middle" fill="#fbbf24" fontSize="10">NewOrderSingle (D)</text>

    <line x1="585" y1="190" x2="115" y2="190" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow4)"/>
    <text x="350" y="185" textAnchor="middle" fill="#4ade80" fontSize="10">ExecutionReport (8) - New</text>

    <line x1="585" y1="220" x2="115" y2="220" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow4)"/>
    <text x="350" y="215" textAnchor="middle" fill="#4ade80" fontSize="10">ExecutionReport (8) - Filled</text>

    <line x1="115" y1="250" x2="585" y2="250" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow4)"/>
    <text x="350" y="245" textAnchor="middle" fill="#94a3b8" fontSize="10">Heartbeat (0)</text>
  </svg>
)

// Order States Diagram
const OrderStatesDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Order State Transitions</text>
    {['NEW', 'PENDING', 'ACK', 'PARTIAL', 'FILLED'].map((state, i) => (
      <g key={i}>
        <rect x={50 + i * 130} y="50" width="100" height="40" rx="6" fill={['#3b82f6', '#f59e0b', '#8b5cf6', '#06b6d4', '#22c55e'][i]}/>
        <text x={100 + i * 130} y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{state}</text>
        {i < 4 && <line x1={150 + i * 130} y1="70" x2={175 + i * 130} y2="70" stroke="#4ade80" strokeWidth="2"/>}
      </g>
    ))}
    <rect x="200" y="120" width="90" height="35" rx="4" fill="#ef4444"/>
    <text x="245" y="142" textAnchor="middle" fill="white" fontSize="9">REJECTED</text>
    <rect x="410" y="120" width="90" height="35" rx="4" fill="#64748b"/>
    <text x="455" y="142" textAnchor="middle" fill="white" fontSize="9">CANCELLED</text>
    <line x1="115" y1="90" x2="200" y2="120" stroke="#ef4444" strokeWidth="1.5"/>
    <line x1="375" y1="90" x2="410" y2="120" stroke="#64748b" strokeWidth="1.5"/>
  </svg>
)

// Order Types Diagram
const OrderTypesDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Order Types Comparison</text>
    <rect x="50" y="45" width="140" height="55" rx="6" fill="#3b82f6"/>
    <text x="120" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MARKET</text>
    <text x="120" y="88" textAnchor="middle" fill="#bfdbfe" fontSize="8">Best price, immediate</text>
    <rect x="210" y="45" width="140" height="55" rx="6" fill="#22c55e"/>
    <text x="280" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">LIMIT</text>
    <text x="280" y="88" textAnchor="middle" fill="#bbf7d0" fontSize="8">Specified price or better</text>
    <rect x="370" y="45" width="140" height="55" rx="6" fill="#f59e0b"/>
    <text x="440" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">STOP</text>
    <text x="440" y="88" textAnchor="middle" fill="#fef3c7" fontSize="8">Trigger at threshold</text>
    <rect x="530" y="45" width="140" height="55" rx="6" fill="#8b5cf6"/>
    <text x="600" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ICEBERG</text>
    <text x="600" y="88" textAnchor="middle" fill="#ddd6fe" fontSize="8">Hidden total size</text>
    <rect x="150" y="120" width="400" height="45" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6"/>
    <text x="350" y="147" textAnchor="middle" fill="#60a5fa" fontSize="10">Algorithmic: TWAP, VWAP for minimizing market impact</text>
  </svg>
)

// Time In Force Diagram
const TimeInForceDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Time In Force Options</text>
    <rect x="50" y="50" width="100" height="50" rx="4" fill="#3b82f6"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">DAY</text>
    <text x="100" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Market close</text>
    <rect x="170" y="50" width="100" height="50" rx="4" fill="#22c55e"/>
    <text x="220" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">GTC</text>
    <text x="220" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Until cancelled</text>
    <rect x="290" y="50" width="100" height="50" rx="4" fill="#f59e0b"/>
    <text x="340" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">IOC</text>
    <text x="340" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Immediate/Cancel</text>
    <rect x="410" y="50" width="100" height="50" rx="4" fill="#ef4444"/>
    <text x="460" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">FOK</text>
    <text x="460" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">Fill or Kill</text>
    <rect x="530" y="50" width="120" height="50" rx="4" fill="#8b5cf6"/>
    <text x="590" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MOC/LOC</text>
    <text x="590" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">At market close</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="10">scheduler.schedule() for expiry • handleIOC/FOK for immediate logic</text>
  </svg>
)

// Event-Driven Architecture Diagram
const EventDrivenArchDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Event Sourcing in OMS</text>
    <rect x="50" y="50" width="100" height="45" rx="4" fill="#3b82f6"/>
    <text x="100" y="77" textAnchor="middle" fill="white" fontSize="9">Command</text>
    <line x1="150" y1="72" x2="180" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <rect x="180" y="50" width="100" height="45" rx="4" fill="#22c55e"/>
    <text x="230" y="77" textAnchor="middle" fill="white" fontSize="9">Event</text>
    <line x1="280" y1="72" x2="310" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <rect x="310" y="40" width="180" height="65" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b"/>
    <text x="400" y="62" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Event Store</text>
    <text x="400" y="80" textAnchor="middle" fill="#fef3c7" fontSize="8">Append-only, immutable</text>
    <text x="400" y="95" textAnchor="middle" fill="#fef3c7" fontSize="8">Complete audit trail</text>
    <line x1="490" y1="72" x2="520" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <rect x="520" y="50" width="100" height="45" rx="4" fill="#8b5cf6"/>
    <text x="570" y="77" textAnchor="middle" fill="white" fontSize="9">Read Model</text>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="10">Replay events → Rebuild state at any point in time</text>
  </svg>
)

// Order Routing Diagram
const OrderRoutingDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Smart Order Router (SOR)</text>
    <rect x="50" y="50" width="100" height="50" rx="6" fill="#3b82f6"/>
    <text x="100" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Order</text>
    <rect x="200" y="35" width="180" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="290" y="60" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Smart Order Router</text>
    <text x="290" y="80" textAnchor="middle" fill="#bbf7d0" fontSize="8">Best price strategy</text>
    <text x="290" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="8">Minimize impact</text>
    <line x1="150" y1="75" x2="195" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="380" y1="55" x2="450" y2="50" stroke="#4ade80" strokeWidth="2"/>
    <line x1="380" y1="75" x2="450" y2="90" stroke="#4ade80" strokeWidth="2"/>
    <line x1="380" y1="95" x2="450" y2="130" stroke="#4ade80" strokeWidth="2"/>
    <rect x="450" y="35" width="100" height="30" rx="4" fill="#f59e0b"/>
    <text x="500" y="55" textAnchor="middle" fill="white" fontSize="9">NYSE</text>
    <rect x="450" y="75" width="100" height="30" rx="4" fill="#8b5cf6"/>
    <text x="500" y="95" textAnchor="middle" fill="white" fontSize="9">NASDAQ</text>
    <rect x="450" y="115" width="100" height="30" rx="4" fill="#ef4444"/>
    <text x="500" y="135" textAnchor="middle" fill="white" fontSize="9">Dark Pool</text>
    <text x="350" y="175" textAnchor="middle" fill="#64748b" fontSize="9">Route based on: Price, Liquidity, Fees, Latency</text>
  </svg>
)

// Position Management Diagram
const PositionMgmtDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Real-Time Position Tracking</text>
    <rect x="50" y="50" width="100" height="45" rx="4" fill="#3b82f6"/>
    <text x="100" y="77" textAnchor="middle" fill="white" fontSize="9">Fill Event</text>
    <line x1="150" y1="72" x2="180" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <rect x="180" y="40" width="200" height="65" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="280" y="62" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Position Service</text>
    <text x="280" y="80" textAnchor="middle" fill="#bbf7d0" fontSize="8">Qty + Avg Cost + P&L</text>
    <text x="280" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="8">ConcurrentMap storage</text>
    <line x1="380" y1="72" x2="410" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <rect x="410" y="50" width="100" height="45" rx="4" fill="#ef4444"/>
    <text x="460" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Risk Engine</text>
    <text x="460" y="85" textAnchor="middle" fill="#fecaca" fontSize="8">Limit checks</text>
    <rect x="540" y="50" width="110" height="45" rx="4" fill="#8b5cf6"/>
    <text x="595" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">P&L Calc</text>
    <text x="595" y="85" textAnchor="middle" fill="#ddd6fe" fontSize="8">Realized/Unrealized</text>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="9">positions.compute() for atomic updates • Async persistence</text>
  </svg>
)

// Duplicate Detection Diagram
const DuplicateDetectionDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Duplicate Order Detection</text>
    <rect x="50" y="50" width="100" height="50" rx="4" fill="#3b82f6"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">New Order</text>
    <text x="100" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">ClOrdId: ABC123</text>
    <rect x="200" y="45" width="150" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b"/>
    <text x="275" y="68" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">ClOrdId Cache</text>
    <text x="275" y="85" textAnchor="middle" fill="#fef3c7" fontSize="8">24h TTL, 1M entries</text>
    <text x="275" y="100" textAnchor="middle" fill="#fef3c7" fontSize="8">Exact duplicate check</text>
    <rect x="400" y="45" width="150" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="475" y="68" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Hash Cache</text>
    <text x="475" y="85" textAnchor="middle" fill="#ddd6fe" fontSize="8">5s TTL, 100K entries</text>
    <text x="475" y="100" textAnchor="middle" fill="#ddd6fe" fontSize="8">Similar order check</text>
    <rect x="600" y="50" width="70" height="50" rx="4" fill="#22c55e"/>
    <text x="635" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Pass</text>
    <text x="635" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Route</text>
    <line x1="150" y1="75" x2="195" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="350" y1="75" x2="395" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="550" y1="75" x2="595" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Prevents costly trading errors • Rapid-fire pattern detection</text>
  </svg>
)

// Credit Check Diagram
const CreditCheckDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Credit & Margin Checks</text>
    <rect x="50" y="50" width="150" height="55" rx="6" fill="#3b82f6"/>
    <text x="125" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Buying Power</text>
    <text x="125" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">Available - Pending</text>
    <rect x="230" y="50" width="150" height="55" rx="6" fill="#f59e0b"/>
    <text x="305" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Margin Check</text>
    <text x="305" y="92" textAnchor="middle" fill="#fef3c7" fontSize="8">Initial margin required</text>
    <rect x="410" y="50" width="150" height="55" rx="6" fill="#ef4444"/>
    <text x="485" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Credit Limit</text>
    <text x="485" y="92" textAnchor="middle" fill="#fecaca" fontSize="8">Max utilization</text>
    <rect x="590" y="50" width="70" height="55" rx="4" fill="#22c55e"/>
    <text x="625" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">OK</text>
    <line x1="200" y1="77" x2="225" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <line x1="380" y1="77" x2="405" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <line x1="560" y1="77" x2="585" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="9">Reserve on submit • Release on cancel • Update on fill</text>
  </svg>
)

// Fill Processing Diagram
const FillProcessingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Execution Report Processing</text>
    <rect x="50" y="50" width="110" height="50" rx="4" fill="#3b82f6"/>
    <text x="105" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">ExecReport</text>
    <text x="105" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">From venue</text>
    <rect x="190" y="50" width="110" height="50" rx="4" fill="#22c55e"/>
    <text x="245" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Update Order</text>
    <text x="245" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Qty, AvgPx, State</text>
    <rect x="330" y="50" width="110" height="50" rx="4" fill="#f59e0b"/>
    <text x="385" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Position</text>
    <text x="385" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">applyFill()</text>
    <rect x="470" y="50" width="110" height="50" rx="4" fill="#8b5cf6"/>
    <text x="525" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Publish Event</text>
    <text x="525" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">OrderFilledEvent</text>
    <line x1="160" y1="75" x2="185" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="300" y1="75" x2="325" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="440" y1="75" x2="465" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Handle: NEW, PARTIAL_FILL, FILL, CANCELED, REJECTED, TRADE_CANCEL</text>
  </svg>
)

// Trade Booking Diagram
const TradeBookingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Trade Booking Pipeline</text>
    <rect x="50" y="50" width="100" height="50" rx="4" fill="#3b82f6"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Execution</text>
    <text x="100" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Raw fill</text>
    <rect x="180" y="50" width="100" height="50" rx="4" fill="#22c55e"/>
    <text x="230" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Enrich</text>
    <text x="230" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Reference data</text>
    <rect x="310" y="50" width="100" height="50" rx="4" fill="#f59e0b"/>
    <text x="360" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Allocate</text>
    <text x="360" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Split accounts</text>
    <rect x="440" y="50" width="100" height="50" rx="4" fill="#8b5cf6"/>
    <text x="490" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Book</text>
    <text x="490" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">Create trades</text>
    <rect x="570" y="50" width="100" height="50" rx="4" fill="#ef4444"/>
    <text x="620" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Publish</text>
    <text x="620" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">Downstream</text>
    <line x1="150" y1="75" x2="175" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="280" y1="75" x2="305" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="410" y1="75" x2="435" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="540" y1="75" x2="565" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Settlement: T+2 equities, T+1 bonds, T+0 FX</text>
  </svg>
)

// Reconciliation Diagram
const ReconciliationDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">End-of-Day Reconciliation</text>
    <rect x="50" y="50" width="150" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="125" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">OMS Trades</text>
    <text x="125" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="8">Internal records</text>
    <rect x="500" y="50" width="150" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="575" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Venue Reports</text>
    <text x="575" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="8">External records</text>
    <rect x="275" y="40" width="150" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="65" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Compare</text>
    <text x="350" y="85" textAnchor="middle" fill="#bbf7d0" fontSize="8">Qty, Price, Side</text>
    <text x="350" y="100" textAnchor="middle" fill="#bbf7d0" fontSize="8">Match or Break</text>
    <line x1="200" y1="80" x2="270" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="425" y1="80" x2="495" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <rect x="200" y="145" width="130" height="40" rx="4" fill="#22c55e"/>
    <text x="265" y="170" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Matched</text>
    <rect x="370" y="145" width="130" height="40" rx="4" fill="#ef4444"/>
    <text x="435" y="170" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Breaks → Alert</text>
  </svg>
)

// FIX Session Mgmt Diagram
const FIXSessionMgmtDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">FIX Session Lifecycle</text>
    <rect x="50" y="50" width="100" height="45" rx="4" fill="#3b82f6"/>
    <text x="100" y="77" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Logon (A)</text>
    <rect x="180" y="50" width="100" height="45" rx="4" fill="#22c55e"/>
    <text x="230" y="77" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Connected</text>
    <rect x="310" y="50" width="100" height="45" rx="4" fill="#f59e0b"/>
    <text x="360" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Heartbeat</text>
    <text x="360" y="88" textAnchor="middle" fill="#fef3c7" fontSize="7">(0) every 30s</text>
    <rect x="440" y="50" width="100" height="45" rx="4" fill="#8b5cf6"/>
    <text x="490" y="77" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Test Request</text>
    <rect x="570" y="50" width="100" height="45" rx="4" fill="#64748b"/>
    <text x="620" y="77" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Logout (5)</text>
    <line x1="150" y1="72" x2="175" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <line x1="280" y1="72" x2="305" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <line x1="410" y1="72" x2="435" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <line x1="540" y1="72" x2="565" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Sequence numbers ensure ordered delivery • Auto-reconnect on failure</text>
    <text x="350" y="150" textAnchor="middle" fill="#64748b" fontSize="8">Missing sequences trigger Resend Request (2)</text>
  </svg>
)

// Message Mapping Diagram
const MessageMappingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">FIX Message Mapping</text>
    <rect x="50" y="50" width="150" height="80" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="125" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Internal Order</text>
    <text x="125" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="8">symbol, side, qty</text>
    <text x="125" y="110" textAnchor="middle" fill="#bfdbfe" fontSize="8">price, tif, type</text>
    <rect x="275" y="40" width="150" height="100" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="65" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">FIX Encoder</text>
    <text x="350" y="85" textAnchor="middle" fill="#bbf7d0" fontSize="8">ClOrdID (11)</text>
    <text x="350" y="100" textAnchor="middle" fill="#bbf7d0" fontSize="8">Symbol (55)</text>
    <text x="350" y="115" textAnchor="middle" fill="#bbf7d0" fontSize="8">Side (54)</text>
    <text x="350" y="130" textAnchor="middle" fill="#bbf7d0" fontSize="8">OrderQty (38)</text>
    <rect x="500" y="50" width="150" height="80" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b"/>
    <text x="575" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">NewOrderSingle</text>
    <text x="575" y="95" textAnchor="middle" fill="#fef3c7" fontSize="8">MsgType=D</text>
    <text x="575" y="110" textAnchor="middle" fill="#fef3c7" fontSize="8">To venue</text>
    <line x1="200" y1="90" x2="270" y2="90" stroke="#4ade80" strokeWidth="2"/>
    <line x1="425" y1="90" x2="495" y2="90" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="9">OrderCancelRequest (F) • OrderCancelReplaceRequest (G)</text>
  </svg>
)

function OrderManagement({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'order-lifecycle',
      name: 'Order Lifecycle',
      icon: '🔄',
      color: '#f59e0b',
      description: 'Complete order state machine from creation to completion',
      diagram: OrderLifecycleDiagram,
      details: [
        {
          name: 'Order States',
          diagram: OrderStatesDiagram,
          explanation: 'Orders progress through defined states: New, Pending, Acknowledged, PartiallyFilled, Filled, Cancelled, Rejected, Expired. Each transition triggers events for downstream systems. State machine enforces valid transitions and prevents invalid operations.',
          codeExample: `// Order State Machine
public enum OrderState {
    NEW,              // Just created
    PENDING_NEW,      // Sent to venue, awaiting ack
    ACKNOWLEDGED,     // Venue accepted order
    PARTIALLY_FILLED, // Some quantity executed
    FILLED,           // Fully executed
    PENDING_CANCEL,   // Cancel request sent
    CANCELLED,        // Successfully cancelled
    REJECTED,         // Venue rejected order
    EXPIRED           // Time-in-force expired
}

public class Order {
    private String orderId;
    private String clientOrderId;
    private OrderState state;
    private String symbol;
    private Side side;
    private OrderType orderType;
    private long quantity;
    private long filledQuantity;
    private long remainingQuantity;
    private BigDecimal price;
    private BigDecimal avgFillPrice;
    private TimeInForce tif;
    private Instant createTime;
    private Instant lastUpdateTime;
    private List<Execution> executions;

    public void transition(OrderState newState, String reason) {
        if (!isValidTransition(this.state, newState)) {
            throw new InvalidStateTransitionException(
                "Cannot transition from " + this.state + " to " + newState);
        }

        OrderState oldState = this.state;
        this.state = newState;
        this.lastUpdateTime = Instant.now();

        // Publish state change event
        eventBus.publish(new OrderStateChangeEvent(
            this.orderId, oldState, newState, reason));
    }

    private boolean isValidTransition(OrderState from, OrderState to) {
        return VALID_TRANSITIONS.get(from).contains(to);
    }

    private static final Map<OrderState, Set<OrderState>> VALID_TRANSITIONS = Map.of(
        NEW, Set.of(PENDING_NEW, REJECTED),
        PENDING_NEW, Set.of(ACKNOWLEDGED, REJECTED),
        ACKNOWLEDGED, Set.of(PARTIALLY_FILLED, FILLED, PENDING_CANCEL, EXPIRED),
        PARTIALLY_FILLED, Set.of(PARTIALLY_FILLED, FILLED, PENDING_CANCEL),
        PENDING_CANCEL, Set.of(CANCELLED, FILLED, REJECTED)
    );
}`
        },
        {
          name: 'Order Types',
          diagram: OrderTypesDiagram,
          explanation: 'Different order types serve different trading strategies. Market orders execute immediately at best available price. Limit orders specify maximum buy or minimum sell price. Stop orders trigger when price reaches threshold. Iceberg orders hide true size.',
          codeExample: `// Order Type Implementations
public enum OrderType {
    MARKET,      // Execute immediately at market price
    LIMIT,       // Execute at specified price or better
    STOP,        // Trigger market order when stop price hit
    STOP_LIMIT,  // Trigger limit order when stop price hit
    ICEBERG,     // Show only portion of total size
    TWAP,        // Time-weighted average price
    VWAP         // Volume-weighted average price
}

public class OrderFactory {

    public static Order createMarketOrder(String symbol, Side side, long quantity) {
        return Order.builder()
            .orderId(generateOrderId())
            .symbol(symbol)
            .side(side)
            .orderType(OrderType.MARKET)
            .quantity(quantity)
            .timeInForce(TimeInForce.IOC)  // Immediate or cancel
            .build();
    }

    public static Order createLimitOrder(String symbol, Side side,
                                          long quantity, BigDecimal price) {
        return Order.builder()
            .orderId(generateOrderId())
            .symbol(symbol)
            .side(side)
            .orderType(OrderType.LIMIT)
            .quantity(quantity)
            .price(price)
            .timeInForce(TimeInForce.DAY)
            .build();
    }

    public static Order createIcebergOrder(String symbol, Side side,
                                            long totalQuantity, long displayQuantity,
                                            BigDecimal price) {
        return Order.builder()
            .orderId(generateOrderId())
            .symbol(symbol)
            .side(side)
            .orderType(OrderType.ICEBERG)
            .quantity(totalQuantity)
            .displayQuantity(displayQuantity)  // Visible size
            .price(price)
            .timeInForce(TimeInForce.DAY)
            .build();
    }
}`
        },
        {
          name: 'Time In Force',
          diagram: TimeInForceDiagram,
          explanation: 'Time-in-force determines how long an order remains active. DAY orders expire at market close. GTC (Good Till Cancelled) persists until filled or cancelled. IOC (Immediate Or Cancel) fills what it can immediately. FOK (Fill Or Kill) requires complete fill or nothing.',
          codeExample: `// Time In Force Handler
public enum TimeInForce {
    DAY,      // Good for the trading day
    GTC,      // Good Till Cancelled
    IOC,      // Immediate Or Cancel
    FOK,      // Fill Or Kill
    GTD,      // Good Till Date
    OPG,      // At the Opening
    MOC,      // Market On Close
    LOC       // Limit On Close
}

@Service
public class TimeInForceHandler {
    private final ScheduledExecutorService scheduler;
    private final OrderRepository orderRepository;

    public void applyTimeInForce(Order order) {
        switch (order.getTimeInForce()) {
            case DAY -> scheduleExpiry(order, getMarketClose());
            case GTD -> scheduleExpiry(order, order.getExpireDate());
            case IOC -> handleIOC(order);
            case FOK -> handleFOK(order);
            case OPG -> scheduleForOpen(order);
            case MOC, LOC -> scheduleForClose(order);
            case GTC -> {} // No expiry, handled manually
        }
    }

    private void handleIOC(Order order) {
        // IOC: Fill what's available immediately, cancel the rest
        scheduler.schedule(() -> {
            Order current = orderRepository.findById(order.getOrderId());
            if (current.getRemainingQuantity() > 0) {
                cancelRemainingQuantity(current, "IOC - Immediate timeout");
            }
        }, 100, TimeUnit.MILLISECONDS);  // Brief window for fills
    }

    private void handleFOK(Order order) {
        // FOK: Must fill entire quantity or cancel
        scheduler.schedule(() -> {
            Order current = orderRepository.findById(order.getOrderId());
            if (current.getFilledQuantity() < current.getQuantity()) {
                // Not fully filled - cancel entire order
                cancelOrder(current, "FOK - Full fill not achieved");
                // Reverse any partial fills if needed
                if (current.getFilledQuantity() > 0) {
                    reverseFills(current);
                }
            }
        }, 50, TimeUnit.MILLISECONDS);
    }

    private void scheduleExpiry(Order order, Instant expiryTime) {
        long delayMs = Duration.between(Instant.now(), expiryTime).toMillis();
        scheduler.schedule(() -> {
            expireOrder(order.getOrderId());
        }, delayMs, TimeUnit.MILLISECONDS);
    }

    private void expireOrder(String orderId) {
        Order order = orderRepository.findById(orderId);
        if (order.isActive()) {
            order.transition(OrderState.EXPIRED, "Time-in-force expired");
            orderRepository.save(order);
            eventPublisher.publish(new OrderExpiredEvent(order));
        }
    }
}`
        }
      ]
    },
    {
      id: 'oms-architecture',
      name: 'OMS Architecture',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Design patterns for high-performance order management systems',
      diagram: OMSArchitectureDiagram,
      details: [
        {
          name: 'Event-Driven Architecture',
          diagram: EventDrivenArchDiagram,
          explanation: 'OMS uses event sourcing to maintain order state. Every state change is an immutable event. Events are persisted for audit and replay. Event handlers update read models asynchronously. This enables point-in-time recovery and complete audit trail.',
          codeExample: `// Event-Driven OMS
public interface OrderEvent {
    String getOrderId();
    Instant getTimestamp();
    long getSequenceNumber();
}

public record OrderCreatedEvent(
    String orderId,
    String symbol,
    Side side,
    OrderType orderType,
    long quantity,
    BigDecimal price,
    Instant timestamp,
    long sequenceNumber
) implements OrderEvent {}

public record OrderFilledEvent(
    String orderId,
    String executionId,
    long filledQuantity,
    BigDecimal fillPrice,
    String venue,
    Instant timestamp,
    long sequenceNumber
) implements OrderEvent {}

@Service
public class OrderEventProcessor {
    private final EventStore eventStore;
    private final OrderRepository orderRepository;

    @EventHandler
    public void handle(OrderCreatedEvent event) {
        // Persist event
        eventStore.append(event);

        // Update read model
        Order order = Order.fromCreatedEvent(event);
        orderRepository.save(order);

        // Publish for downstream consumers
        eventBus.publish(event);
    }

    @EventHandler
    public void handle(OrderFilledEvent event) {
        eventStore.append(event);

        Order order = orderRepository.findById(event.orderId());
        order.applyFill(event.filledQuantity(), event.fillPrice());
        orderRepository.save(order);

        eventBus.publish(event);
    }

    // Replay events to rebuild state
    public Order rehydrateOrder(String orderId) {
        List<OrderEvent> events = eventStore.getEvents(orderId);
        Order order = new Order();
        for (OrderEvent event : events) {
            order.apply(event);
        }
        return order;
    }
}`
        },
        {
          name: 'Order Routing',
          diagram: OrderRoutingDiagram,
          explanation: 'Smart Order Router (SOR) determines optimal venue for execution. Considers price, liquidity, fees, and latency. Supports multiple routing strategies: best price, minimize market impact, or specific venue. Real-time venue connectivity monitoring.',
          codeExample: `// Smart Order Router
@Service
public class SmartOrderRouter {
    private final Map<String, VenueConnector> venues;
    private final MarketDataService marketData;
    private final RoutingStrategy defaultStrategy;

    public RoutingDecision route(Order order) {
        // Get current market state across venues
        Map<String, VenueQuote> quotes = getVenueQuotes(order.getSymbol());

        // Apply routing strategy
        RoutingStrategy strategy = selectStrategy(order);
        List<VenueAllocation> allocations = strategy.allocate(order, quotes);

        // Validate allocations
        validateAllocations(order, allocations);

        return new RoutingDecision(order.getOrderId(), allocations);
    }

    private RoutingStrategy selectStrategy(Order order) {
        // Large orders use TWAP/VWAP to minimize impact
        if (order.getQuantity() > getLargeOrderThreshold(order.getSymbol())) {
            return new MinimizeImpactStrategy();
        }

        // Small orders route to best price
        return new BestPriceStrategy();
    }
}

public class BestPriceStrategy implements RoutingStrategy {
    @Override
    public List<VenueAllocation> allocate(Order order, Map<String, VenueQuote> quotes) {
        // Find best price across venues
        VenueQuote best = quotes.values().stream()
            .filter(q -> q.hasLiquidity(order.getSide(), order.getQuantity()))
            .min(Comparator.comparing(q ->
                order.getSide() == Side.BUY ? q.getAsk() : q.getBid().negate()))
            .orElseThrow(() -> new NoLiquidityException(order.getSymbol()));

        return List.of(new VenueAllocation(best.getVenue(), order.getQuantity()));
    }
}`
        },
        {
          name: 'Position Management',
          diagram: PositionMgmtDiagram,
          explanation: 'Real-time position tracking across all accounts and instruments. Positions update on every fill. Supports multiple position keeping methods: trade date, settlement date, and economic. Integration with risk systems for limit monitoring.',
          codeExample: `// Real-time Position Management
@Service
public class PositionService {
    private final ConcurrentMap<PositionKey, Position> positions = new ConcurrentHashMap<>();
    private final PositionRepository repository;
    private final RiskEngine riskEngine;

    @Value
    public static class PositionKey {
        String accountId;
        String symbol;
    }

    public void applyFill(Order order, Execution execution) {
        PositionKey key = new PositionKey(order.getAccountId(), order.getSymbol());

        positions.compute(key, (k, existing) -> {
            Position position = existing != null ? existing : new Position(k);

            // Update position based on side
            long signedQty = order.getSide() == Side.BUY
                ? execution.getQuantity()
                : -execution.getQuantity();

            position.setQuantity(position.getQuantity() + signedQty);

            // Update average cost
            if (signedQty > 0 && position.getQuantity() > 0) {
                // Adding to long position
                double totalCost = (position.getAvgCost() * (position.getQuantity() - signedQty))
                    + (execution.getPrice() * signedQty);
                position.setAvgCost(totalCost / position.getQuantity());
            }

            // Calculate unrealized P&L
            double marketPrice = marketData.getLastPrice(order.getSymbol());
            position.setUnrealizedPnl(
                (marketPrice - position.getAvgCost()) * position.getQuantity()
            );

            // Update realized P&L if closing
            if ((existing != null && existing.getQuantity() > 0 && position.getQuantity() < existing.getQuantity())
                || (existing != null && existing.getQuantity() < 0 && position.getQuantity() > existing.getQuantity())) {
                double realizedPnl = (execution.getPrice() - position.getAvgCost())
                    * Math.abs(signedQty);
                position.setRealizedPnl(position.getRealizedPnl() + realizedPnl);
            }

            return position;
        });

        // Notify risk engine
        Position updated = positions.get(key);
        riskEngine.onPositionUpdate(updated);

        // Persist asynchronously
        repository.saveAsync(updated);
    }

    public Position getPosition(String accountId, String symbol) {
        return positions.get(new PositionKey(accountId, symbol));
    }

    public List<Position> getAccountPositions(String accountId) {
        return positions.entrySet().stream()
            .filter(e -> e.getKey().getAccountId().equals(accountId))
            .map(Map.Entry::getValue)
            .toList();
    }

    public double getNetExposure(String accountId) {
        return getAccountPositions(accountId).stream()
            .mapToDouble(p -> p.getQuantity() * marketData.getLastPrice(p.getSymbol()))
            .sum();
    }
}`
        }
      ]
    },
    {
      id: 'order-validation',
      name: 'Order Validation',
      icon: '✅',
      color: '#22c55e',
      description: 'Pre-trade checks and validation rules',
      diagram: ValidationPipelineDiagram,
      details: [
        {
          name: 'Validation Pipeline',
          diagram: ValidationPipelineDiagram,
          explanation: 'Orders pass through multiple validation stages before routing. Syntactic validation checks required fields. Semantic validation verifies business rules. Risk checks ensure limits are not breached. Regulatory checks enforce compliance rules.',
          codeExample: `// Order Validation Pipeline
@Service
public class OrderValidationPipeline {
    private final List<OrderValidator> validators;

    public ValidationResult validate(Order order) {
        List<ValidationError> errors = new ArrayList<>();

        for (OrderValidator validator : validators) {
            try {
                validator.validate(order);
            } catch (ValidationException e) {
                errors.add(new ValidationError(
                    validator.getName(),
                    e.getCode(),
                    e.getMessage()
                ));

                // Fail fast on critical errors
                if (e.isCritical()) {
                    break;
                }
            }
        }

        return errors.isEmpty()
            ? ValidationResult.success()
            : ValidationResult.failure(errors);
    }
}

// Individual validators
@Component
@Order(1)
public class SyntacticValidator implements OrderValidator {
    @Override
    public void validate(Order order) {
        Objects.requireNonNull(order.getSymbol(), "Symbol is required");
        Objects.requireNonNull(order.getSide(), "Side is required");

        if (order.getQuantity() <= 0) {
            throw new ValidationException("INVALID_QTY", "Quantity must be positive");
        }

        if (order.getOrderType() == OrderType.LIMIT && order.getPrice() == null) {
            throw new ValidationException("MISSING_PRICE", "Limit orders require price");
        }
    }
}

@Component
@Order(2)
public class RiskValidator implements OrderValidator {
    private final RiskService riskService;

    @Override
    public void validate(Order order) {
        // Check order size limits
        if (order.getQuantity() > riskService.getMaxOrderSize(order.getSymbol())) {
            throw new ValidationException("SIZE_LIMIT", "Order exceeds max size limit");
        }

        // Check notional limits
        BigDecimal notional = calculateNotional(order);
        if (notional.compareTo(riskService.getMaxNotional()) > 0) {
            throw new ValidationException("NOTIONAL_LIMIT", "Order exceeds notional limit");
        }

        // Check position limits
        long projectedPosition = riskService.getProjectedPosition(
            order.getSymbol(), order.getSide(), order.getQuantity());
        if (Math.abs(projectedPosition) > riskService.getPositionLimit(order.getSymbol())) {
            throw new ValidationException("POSITION_LIMIT", "Order would breach position limit");
        }
    }
}`
        },
        {
          name: 'Duplicate Detection',
          diagram: DuplicateDetectionDiagram,
          explanation: 'Prevent duplicate orders from reaching the market. Use client order ID for idempotency. Time-window based detection for similar orders. Hash-based detection for exact duplicates. Critical for preventing costly trading errors.',
          codeExample: `// Duplicate Order Detection
@Service
public class DuplicateDetectionService {
    // Client order ID tracking for idempotency
    private final Cache<String, Order> clientOrderIdCache;
    // Recent order hashes for similarity detection
    private final Cache<Long, Order> orderHashCache;
    // Time window for similar order detection
    private static final Duration SIMILARITY_WINDOW = Duration.ofSeconds(5);

    public DuplicateDetectionService() {
        this.clientOrderIdCache = Caffeine.newBuilder()
            .expireAfterWrite(24, TimeUnit.HOURS)
            .maximumSize(1_000_000)
            .build();

        this.orderHashCache = Caffeine.newBuilder()
            .expireAfterWrite(SIMILARITY_WINDOW)
            .maximumSize(100_000)
            .build();
    }

    public DuplicateCheckResult checkForDuplicate(Order order) {
        // 1. Check for exact duplicate by client order ID
        Order existing = clientOrderIdCache.getIfPresent(order.getClientOrderId());
        if (existing != null) {
            return DuplicateCheckResult.exactDuplicate(
                "Duplicate client order ID: " + order.getClientOrderId(),
                existing
            );
        }

        // 2. Check for similar order (same characteristics within time window)
        long orderHash = computeOrderHash(order);
        Order similarOrder = orderHashCache.getIfPresent(orderHash);
        if (similarOrder != null) {
            return DuplicateCheckResult.possibleDuplicate(
                "Similar order detected within " + SIMILARITY_WINDOW.toSeconds() + "s",
                similarOrder
            );
        }

        // 3. Additional checks for suspicious patterns
        if (detectRapidFire(order)) {
            return DuplicateCheckResult.warning(
                "Rapid-fire order pattern detected"
            );
        }

        // No duplicate - register this order
        clientOrderIdCache.put(order.getClientOrderId(), order);
        orderHashCache.put(orderHash, order);

        return DuplicateCheckResult.notDuplicate();
    }

    private long computeOrderHash(Order order) {
        // Hash key characteristics (not including order ID or timestamps)
        return Objects.hash(
            order.getSymbol(),
            order.getSide(),
            order.getOrderType(),
            order.getQuantity(),
            order.getPrice(),
            order.getAccountId()
        );
    }

    private boolean detectRapidFire(Order order) {
        // Check for multiple orders to same symbol in short period
        String key = order.getAccountId() + ":" + order.getSymbol();
        RateLimiter limiter = orderRateLimiters.computeIfAbsent(
            key, k -> RateLimiter.create(10.0)  // 10 orders per second max
        );
        return !limiter.tryAcquire();
    }
}`
        },
        {
          name: 'Credit & Margin Checks',
          diagram: CreditCheckDiagram,
          explanation: 'Verify sufficient buying power before order submission. Real-time credit utilization tracking. Margin calculations for leveraged products. Integration with clearing and settlement systems.',
          codeExample: `// Credit and Margin Check Service
@Service
public class CreditCheckService {
    private final AccountService accountService;
    private final MarginCalculator marginCalculator;
    private final ConcurrentMap<String, CreditState> creditStates = new ConcurrentHashMap<>();

    public CreditCheckResult checkCredit(Order order) {
        Account account = accountService.getAccount(order.getAccountId());
        CreditState creditState = getCreditState(order.getAccountId());

        // Calculate order value
        BigDecimal orderValue = calculateOrderValue(order);

        // Check available buying power
        BigDecimal availableBuyingPower = creditState.getBuyingPower()
            .subtract(creditState.getPendingOrderValue());

        if (orderValue.compareTo(availableBuyingPower) > 0) {
            return CreditCheckResult.rejected(
                "Insufficient buying power. Required: " + orderValue +
                ", Available: " + availableBuyingPower
            );
        }

        // Calculate margin requirement for leveraged products
        if (isMarginProduct(order.getSymbol())) {
            BigDecimal marginRequired = marginCalculator.calculateInitialMargin(order);
            BigDecimal availableMargin = creditState.getExcessMargin();

            if (marginRequired.compareTo(availableMargin) > 0) {
                return CreditCheckResult.rejected(
                    "Insufficient margin. Required: " + marginRequired +
                    ", Available: " + availableMargin
                );
            }
        }

        // Check credit limits
        if (account.hasCreditLimit()) {
            BigDecimal projectedUtilization = creditState.getCreditUtilization()
                .add(orderValue);
            if (projectedUtilization.compareTo(account.getCreditLimit()) > 0) {
                return CreditCheckResult.rejected(
                    "Order would exceed credit limit"
                );
            }
        }

        // Reserve buying power for pending order
        creditState.reserveBuyingPower(order.getOrderId(), orderValue);

        return CreditCheckResult.approved(orderValue);
    }

    public void onOrderFilled(Order order, Execution execution) {
        CreditState state = getCreditState(order.getAccountId());

        // Release reserved buying power
        state.releaseReservation(order.getOrderId());

        // Update actual utilization
        BigDecimal fillValue = execution.getPrice()
            .multiply(BigDecimal.valueOf(execution.getQuantity()));

        if (order.getSide() == Side.BUY) {
            state.deductBuyingPower(fillValue);
        } else {
            state.addBuyingPower(fillValue);
        }
    }

    public void onOrderCancelled(Order order) {
        // Release any reserved buying power
        getCreditState(order.getAccountId())
            .releaseReservation(order.getOrderId());
    }
}`
        }
      ]
    },
    {
      id: 'execution-reports',
      name: 'Execution Reports',
      icon: '📄',
      color: '#8b5cf6',
      description: 'Processing fills and execution notifications',
      details: [
        {
          name: 'Fill Processing',
          diagram: FillProcessingDiagram,
          explanation: 'Execution reports notify the OMS of order status changes. Partial fills update remaining quantity. Full fills complete the order. Busted trades reverse previous fills. All executions must be persisted and reconciled.',
          codeExample: `// Execution Report Processing
@Service
public class ExecutionReportProcessor {
    private final OrderRepository orderRepository;
    private final PositionService positionService;
    private final EventPublisher eventPublisher;

    @Transactional
    public void processExecutionReport(ExecutionReport report) {
        Order order = orderRepository.findByClOrdId(report.getClOrdId())
            .orElseThrow(() -> new UnknownOrderException(report.getClOrdId()));

        switch (report.getExecType()) {
            case NEW:
                handleNewAck(order, report);
                break;
            case PARTIAL_FILL:
            case FILL:
                handleFill(order, report);
                break;
            case CANCELED:
                handleCancel(order, report);
                break;
            case REJECTED:
                handleReject(order, report);
                break;
            case TRADE_CANCEL:
                handleBust(order, report);
                break;
        }
    }

    private void handleFill(Order order, ExecutionReport report) {
        // Create execution record
        Execution execution = Execution.builder()
            .executionId(report.getExecId())
            .orderId(order.getOrderId())
            .quantity(report.getLastQty())
            .price(report.getLastPx())
            .venue(report.getLastMkt())
            .timestamp(report.getTransactTime())
            .build();

        // Update order state
        order.addExecution(execution);
        order.setFilledQuantity(order.getFilledQuantity() + report.getLastQty());
        order.setRemainingQuantity(order.getQuantity() - order.getFilledQuantity());
        order.setAvgFillPrice(calculateAvgPrice(order.getExecutions()));

        if (order.getRemainingQuantity() == 0) {
            order.transition(OrderState.FILLED, "Fully filled");
        } else {
            order.transition(OrderState.PARTIALLY_FILLED, "Partial fill");
        }

        orderRepository.save(order);

        // Update positions
        positionService.applyFill(order, execution);

        // Publish fill event
        eventPublisher.publish(new OrderFilledEvent(order, execution));
    }
}`
        },
        {
          name: 'Trade Booking',
          diagram: TradeBookingDiagram,
          explanation: 'Booking converts executions into trade records. Allocations split fills across accounts. Trade enrichment adds reference data. Downstream systems (risk, P&L, settlement) consume booked trades.',
          codeExample: `// Trade Booking Service
@Service
public class TradeBookingService {
    private final TradeRepository tradeRepository;
    private final AllocationEngine allocationEngine;
    private final TradeEnrichmentService enrichmentService;
    private final EventPublisher eventPublisher;

    @Transactional
    public List<BookedTrade> bookExecution(Execution execution, Order order) {
        // 1. Create base trade from execution
        Trade trade = Trade.builder()
            .tradeId(generateTradeId())
            .executionId(execution.getExecutionId())
            .orderId(order.getOrderId())
            .symbol(order.getSymbol())
            .side(order.getSide())
            .quantity(execution.getQuantity())
            .price(execution.getPrice())
            .venue(execution.getVenue())
            .tradeDate(LocalDate.now())
            .settlementDate(calculateSettlementDate(order.getSymbol()))
            .tradeTime(execution.getTimestamp())
            .build();

        // 2. Enrich with reference data
        enrichmentService.enrich(trade);

        // 3. Allocate across accounts (for block orders)
        List<Allocation> allocations;
        if (order.hasAllocationInstructions()) {
            allocations = allocationEngine.allocate(trade, order.getAllocationInstructions());
        } else {
            // Single account - no allocation needed
            allocations = List.of(new Allocation(order.getAccountId(), trade.getQuantity()));
        }

        // 4. Create booked trades per allocation
        List<BookedTrade> bookedTrades = new ArrayList<>();
        for (Allocation alloc : allocations) {
            BookedTrade bookedTrade = BookedTrade.builder()
                .bookingId(generateBookingId())
                .trade(trade)
                .accountId(alloc.getAccountId())
                .allocatedQuantity(alloc.getQuantity())
                .grossValue(trade.getPrice().multiply(BigDecimal.valueOf(alloc.getQuantity())))
                .commission(calculateCommission(trade, alloc))
                .fees(calculateFees(trade, alloc))
                .netValue(calculateNetValue(trade, alloc))
                .status(BookingStatus.PENDING)
                .build();

            tradeRepository.save(bookedTrade);
            bookedTrades.add(bookedTrade);
        }

        // 5. Publish for downstream systems
        for (BookedTrade bt : bookedTrades) {
            eventPublisher.publish(new TradeBookedEvent(bt));
        }

        return bookedTrades;
    }

    private LocalDate calculateSettlementDate(String symbol) {
        // T+2 for equities, T+1 for government bonds, T+0 for FX
        InstrumentType type = instrumentService.getType(symbol);
        return switch (type) {
            case EQUITY -> LocalDate.now().plusDays(2);
            case GOVERNMENT_BOND -> LocalDate.now().plusDays(1);
            case FX -> LocalDate.now();
            default -> LocalDate.now().plusDays(2);
        };
    }
}`
        },
        {
          name: 'Reconciliation',
          diagram: ReconciliationDiagram,
          explanation: 'End-of-day reconciliation ensures OMS matches venue records. Compare fills, quantities, and prices. Identify breaks for investigation. Generate exception reports. Critical for regulatory compliance.',
          codeExample: `// Trade Reconciliation Service
@Service
public class ReconciliationService {
    private final TradeRepository tradeRepository;
    private final VenueReportService venueReportService;
    private final AlertService alertService;

    @Scheduled(cron = "0 0 18 * * MON-FRI")  // 6 PM daily
    public ReconciliationReport runEndOfDayRecon() {
        LocalDate tradeDate = LocalDate.now();
        ReconciliationReport report = new ReconciliationReport(tradeDate);

        // Get our trades
        Map<String, Trade> ourTrades = tradeRepository
            .findByTradeDate(tradeDate).stream()
            .collect(Collectors.toMap(Trade::getExecutionId, t -> t));

        // Get venue reports
        for (String venue : getActiveVenues()) {
            List<VenueTrade> venueTrades = venueReportService.getTrades(venue, tradeDate);

            for (VenueTrade venueTrade : venueTrades) {
                Trade ourTrade = ourTrades.remove(venueTrade.getExecutionId());

                if (ourTrade == null) {
                    // Missing in our system
                    report.addBreak(new ReconciliationBreak(
                        BreakType.MISSING_INTERNAL,
                        venueTrade.getExecutionId(),
                        "Trade exists at venue but not in OMS",
                        venueTrade
                    ));
                } else {
                    // Compare details
                    List<String> differences = compareTrades(ourTrade, venueTrade);
                    if (!differences.isEmpty()) {
                        report.addBreak(new ReconciliationBreak(
                            BreakType.MISMATCH,
                            ourTrade.getExecutionId(),
                            String.join("; ", differences),
                            ourTrade, venueTrade
                        ));
                    } else {
                        report.addMatched(ourTrade);
                    }
                }
            }
        }

        // Any remaining trades are missing at venue
        for (Trade unmatched : ourTrades.values()) {
            report.addBreak(new ReconciliationBreak(
                BreakType.MISSING_EXTERNAL,
                unmatched.getExecutionId(),
                "Trade exists in OMS but not at venue"
            ));
        }

        // Generate alerts for breaks
        if (report.hasBreaks()) {
            alertService.sendAlert(
                AlertLevel.WARNING,
                "Reconciliation breaks detected: " + report.getBreakCount()
            );
        }

        // Persist report
        reconReportRepository.save(report);

        return report;
    }

    private List<String> compareTrades(Trade ours, VenueTrade venue) {
        List<String> diffs = new ArrayList<>();

        if (ours.getQuantity() != venue.getQuantity()) {
            diffs.add("Quantity: " + ours.getQuantity() + " vs " + venue.getQuantity());
        }
        if (!ours.getPrice().equals(venue.getPrice())) {
            diffs.add("Price: " + ours.getPrice() + " vs " + venue.getPrice());
        }
        if (!ours.getSide().equals(venue.getSide())) {
            diffs.add("Side: " + ours.getSide() + " vs " + venue.getSide());
        }

        return diffs;
    }
}`
        }
      ]
    },
    {
      id: 'fix-integration',
      name: 'FIX Connectivity',
      icon: '🔌',
      color: '#ef4444',
      description: 'Order routing via FIX protocol',
      diagram: FIXSessionDiagram,
      details: [
        {
          name: 'FIX Session Management',
          diagram: FIXSessionMgmtDiagram,
          explanation: 'FIX sessions connect OMS to trading venues. Logon/logout handshakes establish sessions. Heartbeats monitor connection health. Sequence numbers ensure message ordering. Automatic reconnection on failure.',
          codeExample: `// FIX Session Handler
public class FixSessionHandler implements Application {
    private final OrderService orderService;
    private final SessionID sessionId;

    @Override
    public void onCreate(SessionID sessionId) {
        log.info("FIX session created: {}", sessionId);
    }

    @Override
    public void onLogon(SessionID sessionId) {
        log.info("FIX session logged on: {}", sessionId);
        // Mark venue as connected
        venueStatusService.setConnected(sessionId.getTargetCompID(), true);
    }

    @Override
    public void onLogout(SessionID sessionId) {
        log.warn("FIX session logged out: {}", sessionId);
        venueStatusService.setConnected(sessionId.getTargetCompID(), false);
    }

    @Override
    public void fromApp(Message message, SessionID sessionId) {
        String msgType = message.getHeader().getString(MsgType.FIELD);

        switch (msgType) {
            case MsgType.EXECUTION_REPORT:
                handleExecutionReport(message);
                break;
            case MsgType.ORDER_CANCEL_REJECT:
                handleCancelReject(message);
                break;
            case MsgType.BUSINESS_MESSAGE_REJECT:
                handleBusinessReject(message);
                break;
        }
    }

    public void sendNewOrder(Order order) {
        NewOrderSingle nos = new NewOrderSingle();
        nos.set(new ClOrdID(order.getClientOrderId()));
        nos.set(new Symbol(order.getSymbol()));
        nos.set(new Side(order.getSide() == Side.BUY ? '1' : '2'));
        nos.set(new OrderQty(order.getQuantity()));
        nos.set(new OrdType(mapOrderType(order.getOrderType())));

        if (order.getPrice() != null) {
            nos.set(new Price(order.getPrice().doubleValue()));
        }

        nos.set(new TimeInForce(mapTimeInForce(order.getTif())));
        nos.set(new TransactTime(LocalDateTime.now()));

        Session.sendToTarget(nos, sessionId);
    }
}`
        },
        {
          name: 'Message Mapping',
          diagram: MessageMappingDiagram,
          explanation: 'Convert internal order representation to FIX messages. Handle venue-specific custom tags. Map order types and time-in-force values. Parse execution reports back to internal format. Maintain tag dictionaries per venue.',
          codeExample: `// FIX Message Mapping Service
@Service
public class FixMessageMapper {
    private final Map<String, VenueConfiguration> venueConfigs;

    // Convert internal order to FIX NewOrderSingle
    public NewOrderSingle toFixMessage(Order order, String venue) {
        VenueConfiguration config = venueConfigs.get(venue);
        NewOrderSingle nos = new NewOrderSingle();

        // Standard FIX fields
        nos.set(new ClOrdID(order.getClientOrderId()));
        nos.set(new Symbol(mapSymbol(order.getSymbol(), venue)));
        nos.set(new Side(mapSide(order.getSide())));
        nos.set(new OrderQty(order.getQuantity()));
        nos.set(new OrdType(mapOrderType(order.getOrderType())));
        nos.set(new TimeInForce(mapTimeInForce(order.getTimeInForce())));
        nos.set(new TransactTime(LocalDateTime.now()));

        if (order.getPrice() != null) {
            nos.set(new Price(order.getPrice().doubleValue()));
        }

        // Venue-specific custom tags
        if (config.requiresAccount()) {
            nos.setString(1, order.getAccountId());  // Tag 1 = Account
        }

        // Custom tags for execution instructions
        if (order.hasDisplayQuantity()) {
            nos.setInt(111, (int) order.getDisplayQuantity());  // MaxFloor for iceberg
        }

        // Venue-specific tags (e.g., NYSE specific tags)
        config.getCustomTags().forEach((tag, valueMapper) -> {
            String value = valueMapper.apply(order);
            if (value != null) {
                nos.setString(tag, value);
            }
        });

        return nos;
    }

    // Parse FIX ExecutionReport to internal representation
    public ExecutionReport fromFixMessage(Message message) throws FieldNotFound {
        return ExecutionReport.builder()
            .clOrdId(message.getString(ClOrdID.FIELD))
            .orderId(message.isSetField(OrderID.FIELD) ? message.getString(OrderID.FIELD) : null)
            .execId(message.getString(ExecID.FIELD))
            .execType(mapExecType(message.getChar(ExecType.FIELD)))
            .ordStatus(mapOrdStatus(message.getChar(OrdStatus.FIELD)))
            .symbol(message.getString(Symbol.FIELD))
            .side(mapSideFromFix(message.getChar(Side.FIELD)))
            .orderQty(message.getDecimal(OrderQty.FIELD).longValue())
            .lastQty(message.isSetField(LastQty.FIELD) ? message.getDecimal(LastQty.FIELD).longValue() : 0)
            .lastPx(message.isSetField(LastPx.FIELD) ? message.getDecimal(LastPx.FIELD) : null)
            .cumQty(message.getDecimal(CumQty.FIELD).longValue())
            .leavesQty(message.getDecimal(LeavesQty.FIELD).longValue())
            .transactTime(message.getUtcTimeStamp(TransactTime.FIELD).toInstant())
            .text(message.isSetField(Text.FIELD) ? message.getString(Text.FIELD) : null)
            .build();
    }

    private char mapOrderType(OrderType type) {
        return switch (type) {
            case MARKET -> OrdType.MARKET;
            case LIMIT -> OrdType.LIMIT;
            case STOP -> OrdType.STOP;
            case STOP_LIMIT -> OrdType.STOP_LIMIT;
            default -> OrdType.LIMIT;
        };
    }

    private char mapTimeInForce(TimeInForce tif) {
        return switch (tif) {
            case DAY -> quickfix.field.TimeInForce.DAY;
            case GTC -> quickfix.field.TimeInForce.GOOD_TILL_CANCEL;
            case IOC -> quickfix.field.TimeInForce.IMMEDIATE_OR_CANCEL;
            case FOK -> quickfix.field.TimeInForce.FILL_OR_KILL;
            default -> quickfix.field.TimeInForce.DAY;
        };
    }
}`
        }
      ]
    }
  ]

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

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'eTrading', icon: '📈', page: 'eTrading' },
      { name: 'Order Management', icon: '📋', page: 'Order Management' }
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
    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(245, 158, 11, 0.2)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '0.5rem',
    color: '#fbbf24',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Order Management System</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to eTrading
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={ETRADING_COLORS}
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
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={ETRADING_COLORS}
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
                  {DiagramComponent && (
                    <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', border: '1px solid #334155' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  {detail.codeExample && (
                    <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ padding: '1rem', margin: 0, borderRadius: '0.5rem', fontSize: '0.8rem', border: '1px solid #334155', background: '#0f172a' }} codeTagProps={{ style: { background: 'transparent' } }}>{detail.codeExample}</SyntaxHighlighter>
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

export default OrderManagement

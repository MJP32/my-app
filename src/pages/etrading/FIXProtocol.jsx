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

// FIX Message Structure Diagram
const FIXMessageDiagram = () => (
  <svg viewBox="0 0 750 200" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem 0' }}>
    <text x="375" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">FIX Message Structure</text>
    {/* Header */}
    <rect x="30" y="50" width="140" height="70" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Header</text>
    <text x="100" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="9">8=FIX.4.4</text>
    <text x="100" y="108" textAnchor="middle" fill="#bfdbfe" fontSize="9">35=D (MsgType)</text>
    {/* Body */}
    <rect x="190" y="50" width="350" height="70" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="365" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Body (Message-Specific Fields)</text>
    <text x="365" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="9">55=AAPL | 54=1 (Buy) | 38=1000 | 40=2 (Limit)</text>
    <text x="365" y="108" textAnchor="middle" fill="#bbf7d0" fontSize="9">44=150.50 | 59=0 (Day) | 11=ORDER123</text>
    {/* Trailer */}
    <rect x="560" y="50" width="140" height="70" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="630" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Trailer</text>
    <text x="630" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="9">10=128</text>
    <text x="630" y="108" textAnchor="middle" fill="#ddd6fe" fontSize="9">(Checksum)</text>
    {/* Arrows */}
    <path d="M 170 85 L 185 85" stroke="#4ade80" strokeWidth="2" markerEnd="url(#fixArrow)"/>
    <path d="M 540 85 L 555 85" stroke="#4ade80" strokeWidth="2" markerEnd="url(#fixArrow)"/>
    <defs>
      <marker id="fixArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    {/* Labels */}
    <text x="100" y="145" textAnchor="middle" fill="#64748b" fontSize="10">Session layer</text>
    <text x="365" y="145" textAnchor="middle" fill="#64748b" fontSize="10">Application layer</text>
    <text x="630" y="145" textAnchor="middle" fill="#64748b" fontSize="10">Validation</text>
    <text x="375" y="175" textAnchor="middle" fill="#94a3b8" fontSize="11">Tag=Value pairs separated by SOH (0x01) delimiter</text>
  </svg>
)

// FIX Session State Diagram
const FIXSessionStateDiagram = () => (
  <svg viewBox="0 0 700 280" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="fixStateArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">FIX Session State Machine</text>
    {/* States */}
    <circle cx="100" cy="140" r="45" fill="#64748b" stroke="#94a3b8" strokeWidth="2"/>
    <text x="100" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">DISCONN</text>
    <text x="100" y="150" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ECTED</text>

    <circle cx="270" cy="140" r="45" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="270" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">LOGON</text>
    <text x="270" y="150" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">SENT</text>

    <circle cx="440" cy="140" r="45" fill="#22c55e" stroke="#4ade80" strokeWidth="3"/>
    <text x="440" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">LOGGED</text>
    <text x="440" y="150" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">IN</text>

    <circle cx="600" cy="140" r="45" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="600" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">LOGOUT</text>
    <text x="600" y="150" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">SENT</text>

    {/* Transitions */}
    <path d="M 145 140 L 220 140" stroke="#4ade80" strokeWidth="2" markerEnd="url(#fixStateArrow)"/>
    <text x="182" y="130" textAnchor="middle" fill="#4ade80" fontSize="9">Connect</text>

    <path d="M 315 140 L 390 140" stroke="#4ade80" strokeWidth="2" markerEnd="url(#fixStateArrow)"/>
    <text x="352" y="130" textAnchor="middle" fill="#4ade80" fontSize="9">Logon ACK</text>

    <path d="M 485 140 L 550 140" stroke="#ef4444" strokeWidth="2" markerEnd="url(#fixStateArrow)"/>
    <text x="517" y="130" textAnchor="middle" fill="#f87171" fontSize="9">Logout</text>

    <path d="M 600 185 Q 600 240, 350 240 Q 100 240, 100 185" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#fixStateArrow)"/>
    <text x="350" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9">Disconnect</text>

    {/* Heartbeat loop */}
    <path d="M 440 95 Q 440 60, 480 60 Q 520 60, 520 95" fill="none" stroke="#22c55e" strokeWidth="2"/>
    <path d="M 520 95 Q 520 80, 480 80 Q 440 80, 440 95" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#fixStateArrow)"/>
    <text x="480" y="50" textAnchor="middle" fill="#4ade80" fontSize="8">Heartbeat</text>
  </svg>
)

// FIX Order Flow Diagram
const FIXOrderFlowDiagram = () => (
  <svg viewBox="0 0 700 320" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="fixFlowArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">FIX Order Message Flow</text>
    {/* Buy Side / Sell Side */}
    <rect x="40" y="50" width="120" height="240" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Buy Side</text>
    <rect x="540" y="50" width="120" height="240" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Sell Side</text>
    {/* Messages */}
    <line x1="160" y1="100" x2="540" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#fixFlowArrow)"/>
    <rect x="280" y="85" width="140" height="25" rx="4" fill="#f59e0b"/>
    <text x="350" y="103" textAnchor="middle" fill="white" fontSize="10">NewOrderSingle (D)</text>

    <line x1="540" y1="145" x2="160" y2="145" stroke="#22c55e" strokeWidth="2" markerEnd="url(#fixFlowArrow)"/>
    <rect x="270" y="130" width="160" height="25" rx="4" fill="#22c55e"/>
    <text x="350" y="148" textAnchor="middle" fill="white" fontSize="10">ExecutionReport (8) New</text>

    <line x1="540" y1="190" x2="160" y2="190" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#fixFlowArrow)"/>
    <rect x="265" y="175" width="170" height="25" rx="4" fill="#3b82f6"/>
    <text x="350" y="193" textAnchor="middle" fill="white" fontSize="10">ExecutionReport (8) Fill</text>

    <line x1="160" y1="235" x2="540" y2="235" stroke="#ef4444" strokeWidth="2" markerEnd="url(#fixFlowArrow)"/>
    <rect x="270" y="220" width="160" height="25" rx="4" fill="#ef4444"/>
    <text x="350" y="238" textAnchor="middle" fill="white" fontSize="10">OrderCancelRequest (F)</text>

    <line x1="540" y1="280" x2="160" y2="280" stroke="#64748b" strokeWidth="2" markerEnd="url(#fixFlowArrow)"/>
    <rect x="255" y="265" width="190" height="25" rx="4" fill="#64748b"/>
    <text x="350" y="283" textAnchor="middle" fill="white" fontSize="10">ExecutionReport (8) Canceled</text>
  </svg>
)

// Message Structure Detail Diagram
const MessageStructureDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">FIX Tag=Value Format</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="#3b82f6"/>
    <text x="140" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Tag Number</text>
    <text x="140" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">35, 55, 38, 44...</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="#22c55e"/>
    <text x="350" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">= Delimiter</text>
    <text x="350" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Separates tag from value</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="#f59e0b"/>
    <text x="560" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Value</text>
    <text x="560" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">String, int, float, char</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">SOH (0x01) terminates each field | Example: 35=D^55=AAPL^38=1000^</text>
  </svg>
)

// FIX Versions Diagram
const FIXVersionsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">FIX Protocol Versions</text>
    {[
      { ver: 'FIX 4.0', year: '1995', desc: 'Basic', color: '#64748b' },
      { ver: 'FIX 4.2', year: '2001', desc: 'Widely used', color: '#3b82f6' },
      { ver: 'FIX 4.4', year: '2004', desc: 'Most common', color: '#22c55e' },
      { ver: 'FIX 5.0', year: '2008', desc: 'Transport agnostic', color: '#f59e0b' },
      { ver: 'FIXML', year: 'XML', desc: 'XML format', color: '#8b5cf6' }
    ].map((v, i) => (
      <g key={i}>
        <rect x={35 + i * 132} y="50" width="115" height="55" rx="4" fill={v.color}/>
        <text x={92 + i * 132} y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{v.ver}</text>
        <text x={92 + i * 132} y="90" textAnchor="middle" fill="white" fontSize="8">{v.desc}</text>
      </g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">FIX 4.4 is industry standard | FIX 5.0 separates session from application</text>
  </svg>
)

// Message Types Diagram
const MsgTypesDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Key FIX Message Types (Tag 35)</text>
    {[
      { type: 'A', name: 'Logon', color: '#22c55e' },
      { type: 'D', name: 'NewOrder', color: '#3b82f6' },
      { type: '8', name: 'ExecReport', color: '#f59e0b' },
      { type: 'F', name: 'Cancel', color: '#ef4444' },
      { type: 'G', name: 'Replace', color: '#8b5cf6' }
    ].map((m, i) => (
      <g key={i}>
        <rect x={35 + i * 132} y="50" width="115" height="55" rx="4" fill={m.color}/>
        <text x={92 + i * 132} y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{m.type}</text>
        <text x={92 + i * 132} y="90" textAnchor="middle" fill="white" fontSize="8">{m.name}</text>
      </g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Admin: 0-5, A-5 | Application: 6-z, AA-ZZ</text>
  </svg>
)

// Session Lifecycle Diagram
const SessionLifecycleDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">FIX Session Lifecycle</text>
    {['Connect', 'Logon', 'Trading', 'Logout', 'Disconnect'].map((state, i) => (
      <g key={i}>
        <rect x={35 + i * 132} y="50" width="115" height="55" rx="4" fill={['#3b82f6', '#f59e0b', '#22c55e', '#8b5cf6', '#64748b'][i]}/>
        <text x={92 + i * 132} y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{state}</text>
        {i < 4 && <line x1={150 + i * 132} y1="77" x2={167 + i * 132} y2="77" stroke="#4ade80" strokeWidth="2"/>}
      </g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Heartbeats maintain connection | Test Request detects dead sessions</text>
  </svg>
)

// Sequence Numbers Diagram
const SeqNumDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">FIX Sequence Number Management</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="#3b82f6"/>
    <text x="140" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MsgSeqNum (34)</text>
    <text x="140" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Outbound counter</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="#22c55e"/>
    <text x="350" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Expected SeqNum</text>
    <text x="350" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Inbound validation</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="#ef4444"/>
    <text x="560" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Gap Fill / Resend</text>
    <text x="560" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">Recovery mechanism</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Reset at start of day | PosDupFlag for retransmits | ResendRequest for gaps</text>
  </svg>
)

// Heartbeat Diagram
const HeartbeatDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Heartbeat & Test Request`}</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Heartbeat (0)</text>
    <text x="150" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Sent every HB interval</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#f59e0b"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Test Request (1)</text>
    <text x="380" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Probe silent counterparty</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#ef4444"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Timeout</text>
    <text x="585" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">Force disconnect</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Typical interval: 30s | TestReqID echoed in response HB</text>
  </svg>
)

// New Order Single Diagram
const NewOrderDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">NewOrderSingle (D) Key Fields</text>
    {[
      { tag: '11', name: 'ClOrdID', color: '#3b82f6' },
      { tag: '55', name: 'Symbol', color: '#22c55e' },
      { tag: '54', name: 'Side', color: '#f59e0b' },
      { tag: '38', name: 'OrderQty', color: '#8b5cf6' },
      { tag: '40', name: 'OrdType', color: '#ef4444' }
    ].map((f, i) => (
      <g key={i}>
        <rect x={35 + i * 132} y="50" width="115" height="55" rx="4" fill={f.color}/>
        <text x={92 + i * 132} y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{f.tag}</text>
        <text x={92 + i * 132} y="90" textAnchor="middle" fill="white" fontSize="8">{f.name}</text>
      </g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">OrdType: 1=Market, 2=Limit | Side: 1=Buy, 2=Sell | TimeInForce: 0=Day</text>
  </svg>
)

// Execution Report Diagram
const ExecReportDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">ExecutionReport (8) States</text>
    {[
      { status: '0', name: 'New', color: '#3b82f6' },
      { status: '1', name: 'PartFill', color: '#f59e0b' },
      { status: '2', name: 'Filled', color: '#22c55e' },
      { status: '4', name: 'Canceled', color: '#ef4444' },
      { status: '8', name: 'Rejected', color: '#64748b' }
    ].map((s, i) => (
      <g key={i}>
        <rect x={35 + i * 132} y="50" width="115" height="55" rx="4" fill={s.color}/>
        <text x={92 + i * 132} y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{s.status}</text>
        <text x={92 + i * 132} y="90" textAnchor="middle" fill="white" fontSize="8">{s.name}</text>
      </g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">OrdStatus (39) | ExecType (150) | CumQty (14) | LeavesQty (151)</text>
  </svg>
)

// Market Data Request Diagram
const MDRequestDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Market Data Request (V)</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="#3b82f6"/>
    <text x="140" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SubscriptionType</text>
    <text x="140" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">0=Snap, 1=Sub, 2=Unsub</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="#22c55e"/>
    <text x="350" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MarketDepth</text>
    <text x="350" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">0=Full, N=Top N</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="#f59e0b"/>
    <text x="560" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MDEntryTypes</text>
    <text x="560" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">0=Bid, 1=Offer, 2=Trade</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">NoRelatedSym group lists symbols | MDReqID for correlation</text>
  </svg>
)

// Incremental Refresh Diagram
const IncrRefreshDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Market Data Incremental Refresh (X)</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MDUpdateAction</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">0=New, 1=Change, 2=Delete</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">NoMDEntries Group</text>
    <text x="380" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Repeating updates</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Snapshot (W)</text>
    <text x="585" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Full book refresh</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Sequence-based recovery | MDEntryID for order book levels</text>
  </svg>
)

function FIXProtocol({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'fix-basics',
      name: 'FIX Fundamentals',
      icon: '📋',
      color: '#10b981',
      description: 'Core concepts of the FIX protocol',
      diagram: FIXMessageDiagram,
      details: [
        {
          name: 'Message Structure',
          diagram: MessageStructureDiagram,
          explanation: 'FIX messages are tag=value pairs separated by SOH (0x01). Header contains session info (BeginString, MsgType, SenderCompID). Body contains business data. Trailer includes checksum for validation. Standard tags are defined in FIX specification.',
          codeExample: `// FIX Message Structure
// Example: New Order Single (MsgType=D)
8=FIX.4.4|9=148|35=D|49=SENDER|56=TARGET|34=12|52=20240115-10:30:00.000|
11=ORD001|55=AAPL|54=1|38=100|40=2|44=150.25|59=0|10=123|

// Tag breakdown:
// 8  = BeginString (FIX version)
// 9  = BodyLength
// 35 = MsgType (D = New Order Single)
// 49 = SenderCompID
// 56 = TargetCompID
// 34 = MsgSeqNum
// 52 = SendingTime
// 11 = ClOrdID (client order ID)
// 55 = Symbol
// 54 = Side (1=Buy, 2=Sell)
// 38 = OrderQty
// 40 = OrdType (2=Limit)
// 44 = Price
// 59 = TimeInForce (0=Day)
// 10 = CheckSum

// Java FIX message creation with QuickFIX/J
import quickfix.field.*;
import quickfix.fix44.NewOrderSingle;

NewOrderSingle order = new NewOrderSingle();
order.set(new ClOrdID("ORD001"));
order.set(new Symbol("AAPL"));
order.set(new Side(Side.BUY));
order.set(new OrderQty(100));
order.set(new OrdType(OrdType.LIMIT));
order.set(new Price(150.25));
order.set(new TimeInForce(TimeInForce.DAY));
order.set(new TransactTime(LocalDateTime.now()));`
        },
        {
          name: 'FIX Versions',
          diagram: FIXVersionsDiagram,
          explanation: 'FIX 4.2 is widely used for equities trading. FIX 4.4 added support for multi-leg orders and allocations. FIX 5.0 introduced transport independence (FIXT). Different venues may use different versions. Backward compatibility is important.',
          codeExample: `// FIX Version Configuration
// QuickFIX/J - Version-specific message factories

// FIX 4.2 - Basic equities
import quickfix.fix42.NewOrderSingle;  // FIX 4.2
import quickfix.fix42.MessageFactory;

// FIX 4.4 - Most common, supports multi-leg
import quickfix.fix44.NewOrderSingle;  // FIX 4.4
import quickfix.fix44.MessageFactory;
import quickfix.fix44.NewOrderMultileg;  // Multi-leg support

// FIX 5.0 - Transport layer separation (FIXT)
import quickfix.fix50sp2.NewOrderSingle;  // FIX 5.0 SP2
import quickfix.fixt11.MessageFactory;    // FIXT 1.1 transport

// Version detection and routing
public class FixVersionRouter {
    public MessageFactory getFactory(String beginString) {
        switch (beginString) {
            case "FIX.4.2":
                return new quickfix.fix42.MessageFactory();
            case "FIX.4.4":
                return new quickfix.fix44.MessageFactory();
            case "FIXT.1.1":
                return new quickfix.fixt11.MessageFactory();
            default:
                throw new UnsupportedVersionException(beginString);
        }
    }

    // Version-aware message creation
    public Message createNewOrder(String version, Order order) {
        switch (version) {
            case "FIX.4.2":
                return createFix42Order(order);
            case "FIX.4.4":
                return createFix44Order(order);
            default:
                throw new UnsupportedVersionException(version);
        }
    }
}`
        },
        {
          name: 'Message Types',
          diagram: MsgTypesDiagram,
          explanation: 'Session messages: Logon (A), Heartbeat (0), Logout (5). Order messages: New Order (D), Cancel (F), Replace (G). Execution messages: Execution Report (8), Cancel Reject (9). Market data: Snapshot (W), Incremental (X). Quote: Quote Request (R), Quote (S).',
          codeExample: `// FIX Message Type Constants
public class FixMessageTypes {
    // Session messages
    public static final String LOGON = "A";
    public static final String HEARTBEAT = "0";
    public static final String TEST_REQUEST = "1";
    public static final String RESEND_REQUEST = "2";
    public static final String REJECT = "3";
    public static final String SEQUENCE_RESET = "4";
    public static final String LOGOUT = "5";

    // Order messages
    public static final String NEW_ORDER_SINGLE = "D";
    public static final String ORDER_CANCEL_REQUEST = "F";
    public static final String ORDER_CANCEL_REPLACE = "G";
    public static final String ORDER_STATUS_REQUEST = "H";

    // Execution messages
    public static final String EXECUTION_REPORT = "8";
    public static final String ORDER_CANCEL_REJECT = "9";

    // Market data
    public static final String MARKET_DATA_REQUEST = "V";
    public static final String MARKET_DATA_SNAPSHOT = "W";
    public static final String MARKET_DATA_INCREMENTAL = "X";

    // Quotes
    public static final String QUOTE_REQUEST = "R";
    public static final String QUOTE = "S";
}

// Message router based on type
public class FixMessageRouter {
    private final Map<String, MessageHandler<?>> handlers = new HashMap<>();

    public void route(Message message, SessionID session) {
        String msgType = message.getHeader().getString(MsgType.FIELD);
        MessageHandler handler = handlers.get(msgType);

        if (handler != null) {
            handler.handle(message, session);
        } else {
            log.warn("No handler for message type: {}", msgType);
        }
    }
}`
        }
      ]
    },
    {
      id: 'session-management',
      name: 'Session Layer',
      icon: '🔗',
      color: '#3b82f6',
      description: 'FIX session establishment and maintenance',
      diagram: FIXSessionStateDiagram,
      details: [
        {
          name: 'Session Lifecycle',
          diagram: SessionLifecycleDiagram,
          explanation: 'Sessions begin with Logon handshake. Heartbeats maintain connection liveness. Sequence numbers ensure ordered delivery. Gap fill handles missed messages. Logout gracefully terminates session.',
          codeExample: `// QuickFIX/J Session Configuration
// quickfix.cfg
[DEFAULT]
ConnectionType=initiator
HeartBtInt=30
ReconnectInterval=5
StartTime=00:00:00
EndTime=00:00:00
UseDataDictionary=Y
DataDictionary=FIX44.xml
ValidateUserDefinedFields=N
ValidateFieldsOutOfOrder=N
ResetOnLogon=Y
ResetOnLogout=Y
ResetOnDisconnect=Y

[SESSION]
BeginString=FIX.4.4
SenderCompID=MYAPP
TargetCompID=EXCHANGE
SocketConnectHost=fix.exchange.com
SocketConnectPort=9823
FileStorePath=store
FileLogPath=log

// Session handler
public class FixSessionHandler implements Application {
    @Override
    public void onLogon(SessionID sessionId) {
        log.info("Logged on: {}", sessionId);
        // Mark connection as ready
        connectionStatus.setConnected(sessionId, true);
    }

    @Override
    public void onLogout(SessionID sessionId) {
        log.info("Logged out: {}", sessionId);
        connectionStatus.setConnected(sessionId, false);
    }

    @Override
    public void toAdmin(Message message, SessionID sessionId) {
        // Customize admin messages (e.g., add password to Logon)
        if (message instanceof Logon) {
            ((Logon) message).set(new Password(getPassword()));
            ((Logon) message).set(new ResetSeqNumFlag(true));
        }
    }

    @Override
    public void fromAdmin(Message message, SessionID sessionId)
            throws RejectLogon {
        // Handle admin messages
        if (message instanceof Reject) {
            log.warn("Session reject: {}", message);
        }
    }
}`
        },
        {
          name: 'Sequence Numbers',
          diagram: SeqNumDiagram,
          explanation: 'Both sides maintain inbound and outbound sequence numbers. Messages must be processed in sequence order. Gap detection triggers ResendRequest. PossDupFlag marks retransmitted messages. Sequence reset for session recovery.',
          codeExample: `// Sequence Number Management
public class SequenceManager {
    private final AtomicLong outSeqNum = new AtomicLong(1);
    private final AtomicLong expectedInSeqNum = new AtomicLong(1);
    private final MessageStore messageStore;

    public void onMessageSent(Message message) {
        long seqNum = outSeqNum.getAndIncrement();
        message.getHeader().setInt(MsgSeqNum.FIELD, (int) seqNum);
        messageStore.store(seqNum, message);
    }

    public void onMessageReceived(Message message) throws GapDetectedException {
        int receivedSeqNum = message.getHeader().getInt(MsgSeqNum.FIELD);
        long expected = expectedInSeqNum.get();

        if (receivedSeqNum > expected) {
            // Gap detected - request resend
            throw new GapDetectedException(expected, receivedSeqNum);
        } else if (receivedSeqNum < expected) {
            // Duplicate or out of order
            if (message.getHeader().getBoolean(PossDupFlag.FIELD)) {
                // Expected duplicate during resend
                return;
            }
            throw new DuplicateMessageException(receivedSeqNum);
        }

        expectedInSeqNum.incrementAndGet();
    }

    public void sendResendRequest(SessionID session, long beginSeqNo, long endSeqNo) {
        ResendRequest resend = new ResendRequest();
        resend.set(new BeginSeqNo((int) beginSeqNo));
        resend.set(new EndSeqNo((int) endSeqNo));  // 0 = infinity
        Session.sendToTarget(resend, session);
    }
}`
        },
        {
          name: 'Heartbeat & Test Request',
          diagram: HeartbeatDiagram,
          explanation: 'Heartbeat messages sent at configured intervals (typically 30s). Test Request forces immediate heartbeat response. Used to detect dead connections. Missing heartbeats trigger disconnect. Connection health monitoring.',
          codeExample: `// Heartbeat and Connection Health
public class HeartbeatMonitor {
    private final int heartbeatInterval;  // seconds
    private volatile long lastReceived;
    private volatile long lastSent;

    // Check connection health
    public boolean isConnectionHealthy() {
        long now = System.currentTimeMillis();
        long timeSinceLastReceived = now - lastReceived;

        // Allow 1.5x heartbeat interval + network latency
        long maxAllowedDelay = (long) (heartbeatInterval * 1.5 * 1000) + 2000;

        return timeSinceLastReceived < maxAllowedDelay;
    }

    // Send Test Request to verify connection
    public void sendTestRequest(SessionID session) {
        TestRequest testReq = new TestRequest();
        String testReqId = "TEST-" + System.currentTimeMillis();
        testReq.set(new TestReqID(testReqId));

        Session.sendToTarget(testReq, session);

        // Expect Heartbeat with matching TestReqID
        pendingTestRequests.put(testReqId, System.currentTimeMillis());
    }

    // Handle incoming Heartbeat
    public void onHeartbeat(Heartbeat heartbeat) {
        lastReceived = System.currentTimeMillis();

        // Check if this is response to Test Request
        if (heartbeat.isSetField(TestReqID.FIELD)) {
            String testReqId = heartbeat.getString(TestReqID.FIELD);
            Long sentTime = pendingTestRequests.remove(testReqId);

            if (sentTime != null) {
                long roundTrip = System.currentTimeMillis() - sentTime;
                metrics.recordLatency("fix.heartbeat.rtt", roundTrip);
            }
        }
    }

    // Scheduled heartbeat check
    @Scheduled(fixedRate = 1000)
    public void checkHeartbeats() {
        for (SessionID session : activeSessions) {
            if (!isConnectionHealthy(session)) {
                log.warn("Connection unhealthy for {}, sending test request", session);
                sendTestRequest(session);
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'order-messages',
      name: 'Order Flow',
      icon: '📝',
      color: '#f59e0b',
      description: 'Order submission and execution messages',
      diagram: FIXOrderFlowDiagram,
      details: [
        {
          name: 'New Order Single',
          diagram: NewOrderDiagram,
          explanation: 'Submit new order to venue. Required fields: ClOrdID, Symbol, Side, OrderQty, OrdType. Optional: Price, TimeInForce, Account. Venue responds with Execution Report. ClOrdID must be unique per session.',
          codeExample: `// Order Message Flow
public class FixOrderService {
    private final Session session;
    private final OrderIdGenerator idGenerator;

    public void sendNewOrder(Order order) {
        NewOrderSingle nos = new NewOrderSingle();

        // Required fields
        nos.set(new ClOrdID(idGenerator.generate()));
        nos.set(new Symbol(order.getSymbol()));
        nos.set(new Side(order.getSide() == Side.BUY ? '1' : '2'));
        nos.set(new OrderQty(order.getQuantity()));
        nos.set(new OrdType(mapOrderType(order.getType())));
        nos.set(new TransactTime(LocalDateTime.now()));

        // Conditional fields
        if (order.getType() == OrderType.LIMIT) {
            nos.set(new Price(order.getPrice().doubleValue()));
        }

        // Optional fields
        nos.set(new TimeInForce(mapTimeInForce(order.getTif())));
        nos.set(new Account(order.getAccount()));

        // Custom/venue-specific fields
        if (order.getMinQty() != null) {
            nos.set(new MinQty(order.getMinQty()));
        }

        Session.sendToTarget(nos, session.getSessionID());
    }

    public void sendCancelRequest(String origClOrdId, Order order) {
        OrderCancelRequest cancel = new OrderCancelRequest();
        cancel.set(new OrigClOrdID(origClOrdId));
        cancel.set(new ClOrdID(idGenerator.generate()));
        cancel.set(new Symbol(order.getSymbol()));
        cancel.set(new Side(order.getSide() == Side.BUY ? '1' : '2'));
        cancel.set(new TransactTime(LocalDateTime.now()));

        Session.sendToTarget(cancel, session.getSessionID());
    }

    public void sendReplaceRequest(String origClOrdId, Order order,
                                    Long newQty, BigDecimal newPrice) {
        OrderCancelReplaceRequest replace = new OrderCancelReplaceRequest();
        replace.set(new OrigClOrdID(origClOrdId));
        replace.set(new ClOrdID(idGenerator.generate()));
        replace.set(new Symbol(order.getSymbol()));
        replace.set(new Side(order.getSide() == Side.BUY ? '1' : '2'));
        replace.set(new OrdType(mapOrderType(order.getType())));
        replace.set(new TransactTime(LocalDateTime.now()));

        if (newQty != null) {
            replace.set(new OrderQty(newQty));
        }
        if (newPrice != null) {
            replace.set(new Price(newPrice.doubleValue()));
        }

        Session.sendToTarget(replace, session.getSessionID());
    }
}`
        },
        {
          name: 'Execution Report',
          diagram: ExecReportDiagram,
          explanation: 'Venue sends Execution Report for all order events. ExecType indicates event: New (0), Fill (F), Cancel (4), Replace (5), Reject (8). OrdStatus shows current state. Contains fill details: LastQty, LastPx, CumQty, AvgPx.',
          codeExample: `// Execution Report Handler
public class ExecutionReportHandler implements MessageHandler<ExecutionReport> {

    @Override
    public void handle(ExecutionReport report, SessionID session) {
        String clOrdId = report.getString(ClOrdID.FIELD);
        char execType = report.getChar(ExecType.FIELD);
        char ordStatus = report.getChar(OrdStatus.FIELD);

        switch (execType) {
            case ExecType.NEW:
                handleNewAck(report);
                break;

            case ExecType.PARTIAL_FILL:
            case ExecType.FILL:
                handleFill(report);
                break;

            case ExecType.CANCELED:
                handleCanceled(report);
                break;

            case ExecType.REPLACED:
                handleReplaced(report);
                break;

            case ExecType.REJECTED:
                handleRejected(report);
                break;

            case ExecType.PENDING_NEW:
            case ExecType.PENDING_CANCEL:
            case ExecType.PENDING_REPLACE:
                handlePending(report);
                break;
        }
    }

    private void handleFill(ExecutionReport report) {
        Execution exec = Execution.builder()
            .execId(report.getString(ExecID.FIELD))
            .clOrdId(report.getString(ClOrdID.FIELD))
            .orderId(report.getString(OrderID.FIELD))
            .lastQty(report.getLong(LastQty.FIELD))
            .lastPx(BigDecimal.valueOf(report.getDouble(LastPx.FIELD)))
            .cumQty(report.getLong(CumQty.FIELD))
            .avgPx(BigDecimal.valueOf(report.getDouble(AvgPx.FIELD)))
            .leavesQty(report.getLong(LeavesQty.FIELD))
            .transactTime(report.getUtcTimeStamp(TransactTime.FIELD))
            .build();

        orderService.applyExecution(exec);
    }
}`
        }
      ]
    },
    {
      id: 'market-data',
      name: 'Market Data',
      icon: '📊',
      color: '#ef4444',
      description: 'Real-time price and quote messages',
      details: [
        {
          name: 'Market Data Request',
          diagram: MDRequestDiagram,
          explanation: 'Subscribe to market data for specific symbols. Request types: Snapshot, Subscribe, Unsubscribe. Entry types: Bid, Offer, Trade, Index. Market depth levels configurable. Aggregated or full book data.',
          codeExample: `// Market Data Subscription
public class MarketDataService {
    private final Session session;

    public void subscribe(String symbol, int depth) {
        MarketDataRequest request = new MarketDataRequest();

        // Request ID for tracking
        request.set(new MDReqID(generateRequestId()));

        // Subscription type: 1 = Snapshot + Updates
        request.set(new SubscriptionRequestType(
            SubscriptionRequestType.SNAPSHOT_PLUS_UPDATES));

        // Market depth
        request.set(new MarketDepth(depth));  // 0 = full book

        // Entry types
        MarketDataRequest.NoMDEntryTypes entryTypes =
            new MarketDataRequest.NoMDEntryTypes();
        entryTypes.set(new MDEntryType(MDEntryType.BID));
        request.addGroup(entryTypes);

        entryTypes = new MarketDataRequest.NoMDEntryTypes();
        entryTypes.set(new MDEntryType(MDEntryType.OFFER));
        request.addGroup(entryTypes);

        entryTypes = new MarketDataRequest.NoMDEntryTypes();
        entryTypes.set(new MDEntryType(MDEntryType.TRADE));
        request.addGroup(entryTypes);

        // Symbols
        MarketDataRequest.NoRelatedSym symbols =
            new MarketDataRequest.NoRelatedSym();
        symbols.set(new Symbol(symbol));
        request.addGroup(symbols);

        Session.sendToTarget(request, session.getSessionID());
    }

    // Handle market data snapshot
    public void onMarketDataSnapshot(MarketDataSnapshotFullRefresh snapshot) {
        String symbol = snapshot.getString(Symbol.FIELD);
        Quote quote = new Quote(symbol);

        int numEntries = snapshot.getInt(NoMDEntries.FIELD);
        for (int i = 1; i <= numEntries; i++) {
            Group entry = snapshot.getGroup(i, NoMDEntries.FIELD);
            char entryType = entry.getChar(MDEntryType.FIELD);
            double price = entry.getDouble(MDEntryPx.FIELD);
            double size = entry.getDouble(MDEntrySize.FIELD);

            switch (entryType) {
                case MDEntryType.BID:
                    quote.setBid(price, size);
                    break;
                case MDEntryType.OFFER:
                    quote.setAsk(price, size);
                    break;
            }
        }

        quoteCache.update(symbol, quote);
    }
}`
        },
        {
          name: 'Incremental Refresh',
          diagram: IncrRefreshDiagram,
          explanation: 'Efficient updates for changing data. Only changed entries are sent. UpdateAction: New (0), Change (1), Delete (2). Sequence numbers for ordering. Client maintains book state locally.',
          codeExample: `// Market Data Incremental Refresh Handler
public class IncrementalRefreshHandler {
    private final OrderBookCache bookCache;

    public void onIncrementalRefresh(MarketDataIncrementalRefresh refresh) {
        int numEntries = refresh.getInt(NoMDEntries.FIELD);

        for (int i = 1; i <= numEntries; i++) {
            Group entry = refresh.getGroup(i, NoMDEntries.FIELD);

            String symbol = entry.getString(Symbol.FIELD);
            char entryType = entry.getChar(MDEntryType.FIELD);
            char updateAction = entry.getChar(MDUpdateAction.FIELD);
            double price = entry.getDouble(MDEntryPx.FIELD);
            double size = entry.getDouble(MDEntrySize.FIELD);
            int level = entry.isSetField(MDEntryPositionNo.FIELD)
                ? entry.getInt(MDEntryPositionNo.FIELD) : 1;

            OrderBook book = bookCache.getBook(symbol);

            switch (updateAction) {
                case MDUpdateAction.NEW:
                    // Add new price level
                    book.addLevel(entryType, level, price, size);
                    break;

                case MDUpdateAction.CHANGE:
                    // Update existing level
                    book.updateLevel(entryType, level, price, size);
                    break;

                case MDUpdateAction.DELETE:
                    // Remove level
                    book.deleteLevel(entryType, level);
                    break;

                case MDUpdateAction.DELETE_THRU:
                    // Delete all levels up to specified
                    book.deleteLevelsThru(entryType, level);
                    break;

                case MDUpdateAction.DELETE_FROM:
                    // Delete all levels from specified
                    book.deleteLevelsFrom(entryType, level);
                    break;
            }
        }

        // Notify listeners of book update
        for (String symbol : getUpdatedSymbols(refresh)) {
            bookCache.notifyUpdate(symbol);
        }
    }

    // Maintain sequence for gap detection
    private final AtomicLong lastSeqNum = new AtomicLong(0);

    public boolean validateSequence(MarketDataIncrementalRefresh refresh) {
        long seqNum = refresh.getLong(MDSeqNum.FIELD);
        long expected = lastSeqNum.get() + 1;

        if (seqNum != expected) {
            log.warn("Gap in market data: expected {}, got {}", expected, seqNum);
            requestSnapshot();  // Resync with full snapshot
            return false;
        }

        lastSeqNum.set(seqNum);
        return true;
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
      { name: 'FIX Protocol', icon: '📡', page: 'FIX Protocol' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #065f46 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #6ee7b7, #10b981)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#6ee7b7',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>FIX Protocol</h1>
        <button style={backButtonStyle} onClick={onBack}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'; e.currentTarget.style.transform = 'translateY(0)' }}>
          ← Back to eTrading
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb breadcrumbStack={buildBreadcrumbStack()} onBreadcrumbClick={handleBreadcrumbClick} colors={ETRADING_COLORS} />
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {concepts.map((concept) => (
          <div key={concept.id} onClick={() => setSelectedConceptIndex(concepts.indexOf(concept))}
            style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: `1px solid ${concept.color}40`, cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`; e.currentTarget.style.borderColor = concept.color }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${concept.color}40` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>{concept.details.length} topics • Click to explore</div>
          </div>
        ))}
      </div>

      {selectedConcept && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }} onClick={() => setSelectedConceptIndex(null)}>
          <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '1rem', padding: '2rem', maxWidth: '1200px', maxHeight: '92vh', overflow: 'auto', border: `1px solid ${selectedConcept.color}40` }} onClick={(e) => e.stopPropagation()}>
            <Breadcrumb breadcrumbStack={buildBreadcrumbStack()} onBreadcrumbClick={handleBreadcrumbClick} colors={ETRADING_COLORS} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <h2 style={{ color: selectedConcept.color, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}><span>{selectedConcept.icon}</span>{selectedConcept.name}</h2>
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
                  {detail.codeExample && (<SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ padding: '1rem', margin: 0, borderRadius: '0.5rem', fontSize: '0.8rem', border: '1px solid #334155', background: '#0f172a' }} codeTagProps={{ style: { background: 'transparent' } }}>{detail.codeExample}</SyntaxHighlighter>)}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default FIXProtocol

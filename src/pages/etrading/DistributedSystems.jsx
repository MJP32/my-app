import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const ETRADING_COLORS = { primary: '#4ade80', primaryHover: '#86efac', bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', arrow: '#22c55e', hoverBg: 'rgba(34, 197, 94, 0.2)', topicBg: 'rgba(34, 197, 94, 0.2)' }

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// Raft Consensus Diagram
const RaftDiagram = () => (
  <svg viewBox="0 0 700 280" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="raftArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Raft Consensus - Log Replication</text>
    {/* Leader */}
    <circle cx="350" cy="100" r="50" fill="#22c55e" stroke="#4ade80" strokeWidth="3"/>
    <text x="350" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">LEADER</text>
    <text x="350" y="112" textAnchor="middle" fill="white" fontSize="10">Node 1</text>
    {/* Followers */}
    <circle cx="150" cy="200" r="40" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="150" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">FOLLOWER</text>
    <text x="150" y="212" textAnchor="middle" fill="white" fontSize="9">Node 2</text>
    <circle cx="350" cy="220" r="40" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="350" y="215" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">FOLLOWER</text>
    <text x="350" y="232" textAnchor="middle" fill="white" fontSize="9">Node 3</text>
    <circle cx="550" cy="200" r="40" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="550" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">FOLLOWER</text>
    <text x="550" y="212" textAnchor="middle" fill="white" fontSize="9">Node 4</text>
    {/* Log replication arrows */}
    <line x1="310" y1="135" x2="185" y2="170" stroke="#4ade80" strokeWidth="2" markerEnd="url(#raftArrow)"/>
    <line x1="350" y1="150" x2="350" y2="175" stroke="#4ade80" strokeWidth="2" markerEnd="url(#raftArrow)"/>
    <line x1="390" y1="135" x2="515" y2="170" stroke="#4ade80" strokeWidth="2" markerEnd="url(#raftArrow)"/>
    {/* Labels */}
    <text x="230" y="145" fill="#4ade80" fontSize="9">AppendEntries</text>
    <text x="430" y="145" fill="#4ade80" fontSize="9">AppendEntries</text>
    <text x="350" y="268" textAnchor="middle" fill="#64748b" fontSize="10">Committed when majority (3 of 4) acknowledges</text>
  </svg>
)

// Event Sourcing Diagram
const EventSourcingDiagram = () => (
  <svg viewBox="0 0 750 220" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="esArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="375" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Event Sourcing Pattern</text>
    {/* Events */}
    <rect x="30" y="60" width="100" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">OrderCreated</text>
    <text x="80" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="8">seq: 1</text>
    <rect x="150" y="60" width="100" height="45" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="200" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">OrderFilled</text>
    <text x="200" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="8">seq: 2, qty: 500</text>
    <rect x="270" y="60" width="100" height="45" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="320" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">OrderFilled</text>
    <text x="320" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="8">seq: 3, qty: 500</text>
    <rect x="390" y="60" width="100" height="45" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="440" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">OrderComplete</text>
    <text x="440" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="8">seq: 4</text>
    {/* Event Store */}
    <rect x="510" y="50" width="100" height="65" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Event Store</text>
    <text x="560" y="95" textAnchor="middle" fill="#fcd34d" fontSize="9">(Kafka/DB)</text>
    {/* Aggregate */}
    <rect x="630" y="50" width="100" height="65" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="680" y="75" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Order State</text>
    <text x="680" y="95" textAnchor="middle" fill="#fca5a5" fontSize="9">Filled: 1000</text>
    {/* Arrows */}
    <line x1="490" y1="82" x2="505" y2="82" stroke="#4ade80" strokeWidth="2" markerEnd="url(#esArrow)"/>
    <line x1="610" y1="82" x2="625" y2="82" stroke="#4ade80" strokeWidth="2" markerEnd="url(#esArrow)"/>
    {/* Timeline */}
    <line x1="30" y1="130" x2="490" y2="130" stroke="#64748b" strokeWidth="2"/>
    <text x="260" y="150" textAnchor="middle" fill="#64748b" fontSize="10">Event Timeline (Immutable Append-Only Log)</text>
    {/* Benefits */}
    <text x="200" y="180" textAnchor="middle" fill="#4ade80" fontSize="10">✓ Complete audit trail</text>
    <text x="400" y="180" textAnchor="middle" fill="#4ade80" fontSize="10">✓ Time-travel debugging</text>
    <text x="600" y="180" textAnchor="middle" fill="#4ade80" fontSize="10">✓ Replay to rebuild state</text>
  </svg>
)

// Circuit Breaker Diagram
const CircuitBreakerDiagram = () => (
  <svg viewBox="0 0 700 250" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="cbArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Circuit Breaker State Machine</text>
    {/* States */}
    <circle cx="150" cy="130" r="55" fill="#22c55e" stroke="#4ade80" strokeWidth="3"/>
    <text x="150" y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CLOSED</text>
    <text x="150" y="142" textAnchor="middle" fill="white" fontSize="9">(Normal)</text>
    <circle cx="350" cy="130" r="55" fill="#ef4444" stroke="#f87171" strokeWidth="3"/>
    <text x="350" y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">OPEN</text>
    <text x="350" y="142" textAnchor="middle" fill="white" fontSize="9">(Fail Fast)</text>
    <circle cx="550" cy="130" r="55" fill="#f59e0b" stroke="#fbbf24" strokeWidth="3"/>
    <text x="550" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">HALF-OPEN</text>
    <text x="550" y="142" textAnchor="middle" fill="white" fontSize="9">(Testing)</text>
    {/* Transitions */}
    <path d="M 205 115 Q 280 70, 295 115" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#cbArrow)"/>
    <text x="250" y="65" textAnchor="middle" fill="#f87171" fontSize="9">Failure threshold</text>
    <path d="M 405 130 L 490 130" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#cbArrow)"/>
    <text x="447" y="120" textAnchor="middle" fill="#fbbf24" fontSize="9">Timeout</text>
    <path d="M 550 185 Q 550 220, 350 220 Q 150 220, 150 185" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#cbArrow)"/>
    <text x="350" y="238" textAnchor="middle" fill="#4ade80" fontSize="9">Success threshold met</text>
    <path d="M 520 180 Q 440 200, 380 180" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#cbArrow)"/>
    <text x="450" y="195" textAnchor="middle" fill="#f87171" fontSize="8">Any failure</text>
  </svg>
)

// Consistent Hashing Diagram
const ConsistentHashDiagram = () => (
  <svg viewBox="0 0 400 400" style={{ width: '100%', maxWidth: '400px', height: 'auto', margin: '1rem 0' }}>
    <text x="200" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Consistent Hash Ring</text>
    {/* Ring */}
    <circle cx="200" cy="210" r="140" fill="none" stroke="#64748b" strokeWidth="3"/>
    {/* Nodes */}
    <circle cx="200" cy="70" r="20" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="200" y="74" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">N1</text>
    <circle cx="330" cy="150" r="20" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="330" y="154" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">N2</text>
    <circle cx="330" cy="270" r="20" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="330" y="274" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">N3</text>
    <circle cx="200" cy="350" r="20" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="200" y="354" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">N4</text>
    <circle cx="70" cy="270" r="20" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="70" y="274" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">N5</text>
    <circle cx="70" cy="150" r="20" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="70" y="154" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">N6</text>
    {/* Keys */}
    <circle cx="265" cy="95" r="8" fill="#fbbf24"/>
    <text x="285" y="99" fill="#fbbf24" fontSize="9">K1→N2</text>
    <circle cx="350" cy="210" r="8" fill="#fbbf24"/>
    <text x="370" y="214" fill="#fbbf24" fontSize="9">K2→N3</text>
    <circle cx="135" cy="95" r="8" fill="#fbbf24"/>
    <text x="115" y="80" fill="#fbbf24" fontSize="9">K3→N1</text>
    <text x="200" y="390" textAnchor="middle" fill="#64748b" fontSize="10">Keys hash to ring position, assigned to next node clockwise</text>
  </svg>
)

// State Machine Replication Diagram
const StateMachineRepDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">State Machine Replication</text>
    <rect x="50" y="50" width="100" height="70" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Command</text>
    <text x="100" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">CREATE_ORDER</text>
    <text x="100" y="107" textAnchor="middle" fill="#bfdbfe" fontSize="8">idx: 42</text>
    <rect x="180" y="40" width="100" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="230" y="63" textAnchor="middle" fill="#4ade80" fontSize="9">Node 1 ✓</text>
    <rect x="180" y="80" width="100" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="230" y="103" textAnchor="middle" fill="#4ade80" fontSize="9">Node 2 ✓</text>
    <rect x="310" y="40" width="100" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="360" y="63" textAnchor="middle" fill="#4ade80" fontSize="9">Node 3 ✓</text>
    <rect x="440" y="50" width="100" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="490" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Same State</text>
    <text x="490" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">Deterministic</text>
    <text x="490" y="107" textAnchor="middle" fill="#c4b5fd" fontSize="8">Execution</text>
    <rect x="570" y="50" width="100" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="620" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Snapshot</text>
    <text x="620" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">Fast Recovery</text>
    <line x1="150" y1="57" x2="175" y2="57" stroke="#4ade80" strokeWidth="2"/>
    <line x1="150" y1="97" x2="175" y2="97" stroke="#4ade80" strokeWidth="2"/>
    <line x1="280" y1="57" x2="305" y2="57" stroke="#4ade80" strokeWidth="2"/>
    <line x1="410" y1="85" x2="435" y2="85" stroke="#8b5cf6" strokeWidth="2"/>
    <line x1="540" y1="85" x2="565" y2="85" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">All nodes apply same commands in same order → identical state</text>
  </svg>
)

// Quorum Systems Diagram
const QuorumDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Quorum-Based Consistency (W + R &gt; N)`}</text>
    <rect x="50" y="50" width="180" height="90" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Write Quorum (W=3)</text>
    <circle cx="90" cy="110" r="20" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="90" y="114" textAnchor="middle" fill="white" fontSize="9">N1 ✓</text>
    <circle cx="140" cy="110" r="20" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="140" y="114" textAnchor="middle" fill="white" fontSize="9">N2 ✓</text>
    <circle cx="190" cy="110" r="20" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="190" y="114" textAnchor="middle" fill="white" fontSize="9">N3 ✓</text>
    <rect x="260" y="50" width="180" height="90" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Read Quorum (R=3)</text>
    <circle cx="300" cy="110" r="20" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="300" y="114" textAnchor="middle" fill="white" fontSize="9">N2 ✓</text>
    <circle cx="350" cy="110" r="20" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="350" y="114" textAnchor="middle" fill="white" fontSize="9">N3 ✓</text>
    <circle cx="400" cy="110" r="20" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="114" textAnchor="middle" fill="white" fontSize="9">N4 ✓</text>
    <rect x="470" y="60" width="180" height="70" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="560" y="85" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Overlap Guaranteed</text>
    <text x="560" y="105" textAnchor="middle" fill="#86efac" fontSize="9">N=5, W=3, R=3</text>
    <text x="560" y="120" textAnchor="middle" fill="#86efac" fontSize="8">At least 1 node in common</text>
    <text x="350" y="165" textAnchor="middle" fill="#64748b" fontSize="9">Strong consistency when quorums overlap • Trade-off: availability vs consistency</text>
  </svg>
)

// Reliable Delivery Diagram
const ReliableDeliveryDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Reliable Message Delivery</text>
    <rect x="50" y="50" width="100" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Producer</text>
    <text x="100" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">msg-id: 123</text>
    <rect x="180" y="50" width="120" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="240" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Dedup Cache</text>
    <text x="240" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">Check processed</text>
    <rect x="330" y="50" width="120" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="390" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Process</text>
    <text x="390" y="92" textAnchor="middle" fill="#86efac" fontSize="8">Idempotent</text>
    <rect x="480" y="40" width="80" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="520" y="63" textAnchor="middle" fill="white" fontSize="9">ACK ✓</text>
    <rect x="480" y="80" width="80" height="35" rx="4" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="520" y="103" textAnchor="middle" fill="white" fontSize="9">DLQ ✗</text>
    <rect x="590" y="50" width="80" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="630" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Retry</text>
    <text x="630" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">Backoff</text>
    <line x1="150" y1="80" x2="175" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="300" y1="80" x2="325" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="450" y1="57" x2="475" y2="57" stroke="#22c55e" strokeWidth="2"/>
    <line x1="450" y1="97" x2="475" y2="97" stroke="#ef4444" strokeWidth="2"/>
    <line x1="560" y1="80" x2="585" y2="80" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="9">At-least-once delivery • Idempotency keys • Dead letter queue for failures</text>
  </svg>
)

// Backpressure Diagram
const BackpressureDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Backpressure Flow Control</text>
    <rect x="50" y="50" width="100" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Producer</text>
    <text x="100" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">1000 msg/s</text>
    <rect x="180" y="40" width="180" height="80" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="270" y="60" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Bounded Queue</text>
    <rect x="195" y="70" width="25" height="35" rx="2" fill="#22c55e"/>
    <rect x="225" y="70" width="25" height="35" rx="2" fill="#22c55e"/>
    <rect x="255" y="70" width="25" height="35" rx="2" fill="#22c55e"/>
    <rect x="285" y="70" width="25" height="35" rx="2" fill="#f59e0b"/>
    <rect x="315" y="70" width="25" height="35" rx="2" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b"/>
    <text x="270" y="118" textAnchor="middle" fill="#fcd34d" fontSize="8">Capacity: 5</text>
    <rect x="390" y="50" width="100" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="440" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Consumer</text>
    <text x="440" y="92" textAnchor="middle" fill="#fca5a5" fontSize="8">100 msg/s</text>
    <rect x="520" y="40" width="150" height="80" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="595" y="60" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Strategies</text>
    <text x="595" y="78" textAnchor="middle" fill="#c4b5fd" fontSize="8">• Drop oldest</text>
    <text x="595" y="93" textAnchor="middle" fill="#c4b5fd" fontSize="8">• Block producer</text>
    <text x="595" y="108" textAnchor="middle" fill="#c4b5fd" fontSize="8">• Rate limit</text>
    <line x1="150" y1="80" x2="175" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="360" y1="80" x2="385" y2="80" stroke="#ef4444" strokeWidth="2"/>
    <line x1="490" y1="80" x2="515" y2="80" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Handle slow consumers • Prevent memory exhaustion • Reactive streams support</text>
  </svg>
)

// Leader Election Diagram
const LeaderElectionDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Leader Election with Lease</text>
    <circle cx="120" cy="100" r="45" fill="#22c55e" stroke="#4ade80" strokeWidth="3"/>
    <text x="120" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">LEADER</text>
    <text x="120" y="112" textAnchor="middle" fill="white" fontSize="9">Node 1</text>
    <circle cx="280" cy="100" r="40" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="280" y="95" textAnchor="middle" fill="white" fontSize="10">Follower</text>
    <text x="280" y="112" textAnchor="middle" fill="white" fontSize="9">Node 2</text>
    <circle cx="420" cy="100" r="40" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="420" y="95" textAnchor="middle" fill="white" fontSize="10">Follower</text>
    <text x="420" y="112" textAnchor="middle" fill="white" fontSize="9">Node 3</text>
    <rect x="520" y="60" width="150" height="80" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="595" y="85" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">ZK/etcd</text>
    <text x="595" y="105" textAnchor="middle" fill="#fcd34d" fontSize="8">Lease: 30s TTL</text>
    <text x="595" y="120" textAnchor="middle" fill="#fcd34d" fontSize="8">Epoch: 42</text>
    <line x1="165" y1="100" x2="235" y2="100" stroke="#4ade80" strokeWidth="2" strokeDasharray="5"/>
    <line x1="320" y1="100" x2="375" y2="100" stroke="#4ade80" strokeWidth="2" strokeDasharray="5"/>
    <line x1="460" y1="100" x2="515" y2="100" stroke="#f59e0b" strokeWidth="2"/>
    <text x="200" y="85" textAnchor="middle" fill="#4ade80" fontSize="8">heartbeat</text>
    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="9">Single leader coordination • Automatic failover • Fencing tokens prevent split-brain</text>
  </svg>
)

// Distributed Lock Diagram
const DistributedLockDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Distributed Lock with TTL</text>
    <rect x="50" y="50" width="100" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Client A</text>
    <text x="100" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">SETNX lock</text>
    <rect x="180" y="50" width="140" height="60" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="250" y="70" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Redis</text>
    <text x="250" y="88" textAnchor="middle" fill="#fca5a5" fontSize="8">lock:resource = A</text>
    <text x="250" y="103" textAnchor="middle" fill="#fca5a5" fontSize="8">TTL: 30s</text>
    <rect x="350" y="50" width="100" height="60" rx="6" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Client B</text>
    <text x="400" y="92" textAnchor="middle" fill="#64748b" fontSize="8">BLOCKED</text>
    <rect x="480" y="40" width="80" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="520" y="63" textAnchor="middle" fill="white" fontSize="9">Acquired</text>
    <rect x="480" y="80" width="80" height="35" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="520" y="103" textAnchor="middle" fill="#a78bfa" fontSize="9">Release</text>
    <rect x="590" y="50" width="80" height="60" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="630" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Lua</text>
    <text x="630" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">Atomic</text>
    <line x1="150" y1="80" x2="175" y2="80" stroke="#22c55e" strokeWidth="2"/>
    <line x1="320" y1="80" x2="345" y2="80" stroke="#ef4444" strokeWidth="2"/>
    <line x1="560" y1="57" x2="585" y2="57" stroke="#22c55e" strokeWidth="2"/>
    <line x1="560" y1="97" x2="585" y2="97" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="9">Mutual exclusion • TTL prevents deadlock • Atomic check-and-delete</text>
  </svg>
)

// Barrier Synchronization Diagram
const BarrierSyncDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Distributed Barrier Synchronization</text>
    <circle cx="100" cy="90" r="30" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="100" y="94" textAnchor="middle" fill="white" fontSize="9">Node 1 ✓</text>
    <circle cx="200" cy="90" r="30" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="200" y="94" textAnchor="middle" fill="white" fontSize="9">Node 2 ✓</text>
    <circle cx="300" cy="90" r="30" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="300" y="94" textAnchor="middle" fill="white" fontSize="9">Node 3...</text>
    <rect x="360" y="50" width="20" height="80" rx="4" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="370" y="140" textAnchor="middle" fill="#f87171" fontSize="9">Barrier</text>
    <rect x="410" y="60" width="140" height="60" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="480" y="85" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">All Ready</text>
    <text x="480" y="105" textAnchor="middle" fill="#86efac" fontSize="8">Barrier opens</text>
    <rect x="580" y="60" width="100" height="60" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="630" y="85" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Proceed</text>
    <text x="630" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="8">Market Open</text>
    <line x1="130" y1="90" x2="165" y2="90" stroke="#4ade80" strokeWidth="2"/>
    <line x1="230" y1="90" x2="265" y2="90" stroke="#4ade80" strokeWidth="2"/>
    <line x1="330" y1="90" x2="355" y2="90" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="385" y1="90" x2="405" y2="90" stroke="#22c55e" strokeWidth="2"/>
    <line x1="550" y1="90" x2="575" y2="90" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="220" y="140" textAnchor="middle" fill="#64748b" fontSize="9">Wait for N parties • Trading session gates • EOD processing</text>
  </svg>
)

// Partition Strategies Diagram
const PartitionStrategiesDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Data Partition Strategies</text>
    <rect x="50" y="50" width="180" height="90" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Hash Partition</text>
    <text x="140" y="90" textAnchor="middle" fill="#93c5fd" fontSize="8">hash(key) % N</text>
    <text x="140" y="105" textAnchor="middle" fill="#93c5fd" fontSize="8">Even distribution</text>
    <text x="140" y="120" textAnchor="middle" fill="#93c5fd" fontSize="8">No ordering</text>
    <rect x="260" y="50" width="180" height="90" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Range Partition</text>
    <text x="350" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="8">A-M → P1, N-Z → P2</text>
    <text x="350" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="8">Ordered scans</text>
    <text x="350" y="120" textAnchor="middle" fill="#c4b5fd" fontSize="8">Hot spots risk</text>
    <rect x="470" y="50" width="180" height="90" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="70" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Composite Key</text>
    <text x="560" y="90" textAnchor="middle" fill="#fcd34d" fontSize="8">account|order</text>
    <text x="560" y="105" textAnchor="middle" fill="#fcd34d" fontSize="8">Co-locate related</text>
    <text x="560" y="120" textAnchor="middle" fill="#fcd34d" fontSize="8">Locality benefits</text>
    <text x="350" y="165" textAnchor="middle" fill="#64748b" fontSize="9">Choose based on access pattern • Monitor for hot partitions</text>
  </svg>
)

// Partition Assignment Diagram
const PartitionAssignmentDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Kafka Partition Assignment</text>
    <rect x="50" y="50" width="160" height="100" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="130" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Topic: Orders</text>
    <rect x="65" y="85" width="40" height="25" rx="3" fill="#3b82f6"/>
    <text x="85" y="102" textAnchor="middle" fill="white" fontSize="8">P0</text>
    <rect x="115" y="85" width="40" height="25" rx="3" fill="#3b82f6"/>
    <text x="135" y="102" textAnchor="middle" fill="white" fontSize="8">P1</text>
    <rect x="165" y="85" width="40" height="25" rx="3" fill="#3b82f6"/>
    <text x="185" y="102" textAnchor="middle" fill="white" fontSize="8">P2</text>
    <rect x="90" y="120" width="40" height="25" rx="3" fill="#3b82f6"/>
    <text x="110" y="137" textAnchor="middle" fill="white" fontSize="8">P3</text>
    <rect x="140" y="120" width="40" height="25" rx="3" fill="#3b82f6"/>
    <text x="160" y="137" textAnchor="middle" fill="white" fontSize="8">P4</text>
    <rect x="250" y="50" width="200" height="100" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Consumer Group</text>
    <rect x="265" y="90" width="80" height="50" rx="4" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1"/>
    <text x="305" y="110" textAnchor="middle" fill="#4ade80" fontSize="8">Consumer 1</text>
    <text x="305" y="125" textAnchor="middle" fill="#86efac" fontSize="7">P0, P1</text>
    <rect x="355" y="90" width="80" height="50" rx="4" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1"/>
    <text x="395" y="110" textAnchor="middle" fill="#4ade80" fontSize="8">Consumer 2</text>
    <text x="395" y="125" textAnchor="middle" fill="#86efac" fontSize="7">P2, P3, P4</text>
    <rect x="490" y="60" width="170" height="80" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="575" y="80" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Sticky Assignor</text>
    <text x="575" y="100" textAnchor="middle" fill="#fcd34d" fontSize="8">Minimize movement</text>
    <text x="575" y="115" textAnchor="middle" fill="#fcd34d" fontSize="8">Cooperative rebalance</text>
    <text x="575" y="130" textAnchor="middle" fill="#fcd34d" fontSize="8">Preserve locality</text>
    <line x1="210" y1="100" x2="245" y2="100" stroke="#4ade80" strokeWidth="2"/>
    <line x1="450" y1="100" x2="485" y2="100" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="9">Consumer group coordination • Partition ownership • Rebalancing strategies</text>
  </svg>
)

// Retry Strategies Diagram
const RetryStrategiesDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Exponential Backoff with Jitter</text>
    <rect x="50" y="50" width="100" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Attempt 1</text>
    <text x="100" y="92" textAnchor="middle" fill="#fca5a5" fontSize="8">FAIL</text>
    <rect x="180" y="60" width="60" height="40" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="210" y="85" textAnchor="middle" fill="#fbbf24" fontSize="8">100ms</text>
    <rect x="260" y="50" width="100" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="310" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Attempt 2</text>
    <text x="310" y="92" textAnchor="middle" fill="#fca5a5" fontSize="8">FAIL</text>
    <rect x="380" y="55" width="60" height="50" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="410" y="75" textAnchor="middle" fill="#fbbf24" fontSize="8">200ms</text>
    <text x="410" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">+jitter</text>
    <rect x="460" y="50" width="100" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="510" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Attempt 3</text>
    <text x="510" y="92" textAnchor="middle" fill="white" fontSize="8">SUCCESS</text>
    <rect x="590" y="50" width="80" height="60" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="630" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Max</text>
    <text x="630" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">5 retries</text>
    <line x1="150" y1="80" x2="175" y2="80" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="240" y1="80" x2="255" y2="80" stroke="#ef4444" strokeWidth="2"/>
    <line x1="360" y1="80" x2="375" y2="80" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="440" y1="80" x2="455" y2="80" stroke="#22c55e" strokeWidth="2"/>
    <line x1="560" y1="80" x2="585" y2="80" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="9">base × 2^attempt + random jitter • Prevents thundering herd • Deadline aware</text>
  </svg>
)

// Bulkhead Pattern Diagram
const BulkheadDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Bulkhead Pattern - Failure Isolation</text>
    <rect x="50" y="50" width="180" height="100" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Order Pool</text>
    <text x="140" y="88" textAnchor="middle" fill="#93c5fd" fontSize="8">20 threads</text>
    <rect x="70" y="95" width="50" height="40" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="95" y="120" textAnchor="middle" fill="white" fontSize="8">15 busy</text>
    <rect x="130" y="95" width="50" height="40" rx="4" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1"/>
    <text x="155" y="120" textAnchor="middle" fill="#94a3b8" fontSize="8">5 free</text>
    <rect x="260" y="50" width="180" height="100" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Risk Pool</text>
    <text x="350" y="88" textAnchor="middle" fill="#fca5a5" fontSize="8">5 threads (FULL)</text>
    <rect x="280" y="95" width="50" height="40" rx="4" fill="#ef4444" stroke="#f87171" strokeWidth="1"/>
    <text x="305" y="120" textAnchor="middle" fill="white" fontSize="8">5 busy</text>
    <rect x="340" y="95" width="50" height="40" rx="4" fill="rgba(239, 68, 68, 0.5)" stroke="#ef4444" strokeWidth="1"/>
    <text x="365" y="120" textAnchor="middle" fill="#fca5a5" fontSize="8">rejected</text>
    <rect x="470" y="50" width="180" height="100" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="560" y="70" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Market Data</text>
    <text x="560" y="88" textAnchor="middle" fill="#86efac" fontSize="8">10 threads</text>
    <rect x="490" y="95" width="50" height="40" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="515" y="120" textAnchor="middle" fill="white" fontSize="8">8 busy</text>
    <rect x="550" y="95" width="50" height="40" rx="4" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1"/>
    <text x="575" y="120" textAnchor="middle" fill="#94a3b8" fontSize="8">2 free</text>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="9">Isolated thread pools • Semaphore limits • Risk service full doesn't block orders</text>
  </svg>
)

// Tracing Implementation Diagram
const TracingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Distributed Trace - Request Flow</text>
    <rect x="50" y="50" width="100" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Gateway</text>
    <text x="100" y="88" textAnchor="middle" fill="#bfdbfe" fontSize="7">trace-id: abc</text>
    <rect x="180" y="50" width="100" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="230" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Order Svc</text>
    <text x="230" y="88" textAnchor="middle" fill="#bbf7d0" fontSize="7">span-id: 001</text>
    <rect x="310" y="50" width="100" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="360" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Risk Svc</text>
    <text x="360" y="88" textAnchor="middle" fill="#ddd6fe" fontSize="7">span-id: 002</text>
    <rect x="440" y="50" width="100" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="490" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Exec Svc</text>
    <text x="490" y="88" textAnchor="middle" fill="#fef3c7" fontSize="7">span-id: 003</text>
    <rect x="570" y="50" width="100" height="50" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="620" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Jaeger</text>
    <text x="620" y="88" textAnchor="middle" fill="#a5f3fc" fontSize="7">Collector</text>
    <line x1="150" y1="75" x2="175" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="280" y1="75" x2="305" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="410" y1="75" x2="435" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="540" y1="75" x2="565" y2="75" stroke="#22d3ee" strokeWidth="2"/>
    <text x="165" y="67" textAnchor="middle" fill="#4ade80" fontSize="7">→</text>
    <text x="295" y="67" textAnchor="middle" fill="#4ade80" fontSize="7">→</text>
    <text x="425" y="67" textAnchor="middle" fill="#4ade80" fontSize="7">→</text>
    <rect x="50" y="115" width="620" height="25" rx="4" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="100" y="132" textAnchor="middle" fill="#22d3ee" fontSize="8">Gateway: 5ms</text>
    <text x="230" y="132" textAnchor="middle" fill="#22d3ee" fontSize="8">Order: 10ms</text>
    <text x="360" y="132" textAnchor="middle" fill="#22d3ee" fontSize="8">Risk: 3ms</text>
    <text x="490" y="132" textAnchor="middle" fill="#22d3ee" fontSize="8">Exec: 15ms</text>
    <text x="620" y="132" textAnchor="middle" fill="#22d3ee" fontSize="8">Total: 33ms</text>
  </svg>
)

// Metrics Aggregation Diagram
const MetricsDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RED Metrics - Rate, Errors, Duration</text>
    <rect x="50" y="50" width="180" height="100" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Rate</text>
    <text x="140" y="92" textAnchor="middle" fill="#93c5fd" fontSize="9">orders.total</text>
    <text x="140" y="110" textAnchor="middle" fill="#93c5fd" fontSize="8">1,500 req/sec</text>
    <rect x="75" y="120" width="40" height="15" rx="2" fill="#3b82f6"/>
    <rect x="120" y="125" width="40" height="10" rx="2" fill="#3b82f6"/>
    <rect x="165" y="118" width="40" height="17" rx="2" fill="#3b82f6"/>
    <rect x="260" y="50" width="180" height="100" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Errors</text>
    <text x="350" y="92" textAnchor="middle" fill="#fca5a5" fontSize="9">orders.errors</text>
    <text x="350" y="110" textAnchor="middle" fill="#fca5a5" fontSize="8">0.5% error rate</text>
    <rect x="285" y="120" width="40" height="5" rx="2" fill="#ef4444"/>
    <rect x="330" y="122" width="40" height="3" rx="2" fill="#ef4444"/>
    <rect x="375" y="118" width="40" height="7" rx="2" fill="#ef4444"/>
    <rect x="470" y="50" width="180" height="100" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="560" y="70" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Duration</text>
    <text x="560" y="92" textAnchor="middle" fill="#86efac" fontSize="9">orders.latency</text>
    <text x="560" y="108" textAnchor="middle" fill="#86efac" fontSize="8">p50: 5ms</text>
    <text x="560" y="123" textAnchor="middle" fill="#86efac" fontSize="8">p99: 25ms</text>
    <rect x="495" y="132" width="60" height="8" rx="2" fill="#22c55e"/>
    <rect x="560" y="132" width="60" height="4" rx="2" fill="#f59e0b"/>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="9">Prometheus counters/histograms • Percentile calculations • Alerting thresholds</text>
  </svg>
)

// Log Correlation Diagram
const LogCorrelationDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Log Correlation via Trace ID</text>
    <rect x="50" y="45" width="600" height="25" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="70" y="62" fill="#60a5fa" fontSize="8">gateway</text>
    <text x="150" y="62" fill="#93c5fd" fontSize="8">trace:abc123</text>
    <text x="280" y="62" fill="#93c5fd" fontSize="8">"Received order request"</text>
    <text x="520" y="62" fill="#64748b" fontSize="8">10:30:00.001</text>
    <rect x="50" y="75" width="600" height="25" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="70" y="92" fill="#4ade80" fontSize="8">order-svc</text>
    <text x="150" y="92" fill="#86efac" fontSize="8">trace:abc123</text>
    <text x="280" y="92" fill="#86efac" fontSize="8">"Processing order ORD-001"</text>
    <text x="520" y="92" fill="#64748b" fontSize="8">10:30:00.005</text>
    <rect x="50" y="105" width="600" height="25" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="70" y="122" fill="#a78bfa" fontSize="8">risk-svc</text>
    <text x="150" y="122" fill="#c4b5fd" fontSize="8">trace:abc123</text>
    <text x="280" y="122" fill="#c4b5fd" fontSize="8">"Risk check passed"</text>
    <text x="520" y="122" fill="#64748b" fontSize="8">10:30:00.008</text>
    <line x1="150" y1="57" x2="150" y2="122" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3"/>
    <text x="155" y="90" fill="#fbbf24" fontSize="7">MDC</text>
    <text x="350" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Structured JSON logs • MDC context propagation • ELK stack aggregation</text>
  </svg>
)

function DistributedSystems({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    { id: 'consensus', name: 'Consensus & Replication', icon: '🤝', color: '#3b82f6', description: 'Agreement protocols for distributed state', diagram: RaftDiagram,
      details: [
        { name: 'Raft Consensus', explanation: 'Leader-based consensus protocol. Leader election via randomized timeouts. Log replication to followers. Committed when majority acknowledges. Used in Aeron Cluster, etcd.',
          codeExample: `// Raft State Machine (Simplified)
public class RaftNode {
    enum State { FOLLOWER, CANDIDATE, LEADER }

    private State state = State.FOLLOWER;
    private int currentTerm = 0;
    private String votedFor = null;
    private List<LogEntry> log = new ArrayList<>();
    private int commitIndex = 0;

    // Leader election
    public void startElection() {
        state = State.CANDIDATE;
        currentTerm++;
        votedFor = nodeId;
        int votesReceived = 1;  // Vote for self

        // Request votes from all peers
        RequestVoteRequest request = new RequestVoteRequest(
            currentTerm,
            nodeId,
            log.size() - 1,
            getLastLogTerm()
        );

        for (RaftPeer peer : peers) {
            CompletableFuture<RequestVoteResponse> future = peer.requestVote(request);
            future.thenAccept(response -> {
                if (response.isVoteGranted()) {
                    synchronized (this) {
                        votesReceived++;
                        if (votesReceived > (peers.size() + 1) / 2 && state == State.CANDIDATE) {
                            becomeLeader();
                        }
                    }
                }
            });
        }
    }

    // Log replication (leader)
    public void appendEntry(Command command) {
        if (state != State.LEADER) {
            throw new NotLeaderException(leaderId);
        }

        LogEntry entry = new LogEntry(currentTerm, command);
        log.add(entry);

        // Replicate to followers
        for (RaftPeer peer : peers) {
            replicateLog(peer);
        }
    }

    private void replicateLog(RaftPeer peer) {
        int nextIndex = peer.getNextIndex();

        AppendEntriesRequest request = new AppendEntriesRequest(
            currentTerm,
            nodeId,
            nextIndex - 1,
            getLogTerm(nextIndex - 1),
            log.subList(nextIndex, log.size()),
            commitIndex
        );

        peer.appendEntries(request).thenAccept(response -> {
            if (response.isSuccess()) {
                peer.setNextIndex(log.size());
                peer.setMatchIndex(log.size() - 1);
                updateCommitIndex();
            } else {
                peer.decrementNextIndex();
                replicateLog(peer);  // Retry with lower index
            }
        });
    }
}` },
        { name: 'State Machine Replication', diagram: StateMachineRepDiagram, explanation: 'Replicate state across nodes. All nodes apply same commands in same order. Deterministic state machines. Snapshot for fast recovery. Event sourcing pattern.',
          codeExample: `// State Machine Replication
public class ReplicatedStateMachine {
    private final Map<String, Order> orderState = new ConcurrentHashMap<>();
    private final List<Command> commandLog = new ArrayList<>();
    private long lastAppliedIndex = 0;

    // Apply command deterministically
    public synchronized void apply(Command command, long index) {
        if (index <= lastAppliedIndex) {
            return;  // Already applied
        }

        switch (command.getType()) {
            case CREATE_ORDER:
                Order order = new Order(command.getOrderId(), command.getDetails());
                orderState.put(order.getId(), order);
                break;

            case UPDATE_ORDER:
                Order existing = orderState.get(command.getOrderId());
                if (existing != null) {
                    existing.update(command.getDetails());
                }
                break;

            case CANCEL_ORDER:
                orderState.remove(command.getOrderId());
                break;
        }

        commandLog.add(command);
        lastAppliedIndex = index;
    }

    // Create snapshot for fast recovery
    public Snapshot createSnapshot() {
        return new Snapshot(
            lastAppliedIndex,
            new HashMap<>(orderState),
            System.currentTimeMillis()
        );
    }

    // Restore from snapshot + replay commands
    public void restore(Snapshot snapshot, List<Command> commandsSinceSnapshot) {
        orderState.clear();
        orderState.putAll(snapshot.getState());
        lastAppliedIndex = snapshot.getLastIndex();

        for (Command cmd : commandsSinceSnapshot) {
            apply(cmd, cmd.getIndex());
        }
    }
}` },
        { name: 'Quorum Systems', diagram: QuorumDiagram, explanation: 'Majority-based decision making. Read and write quorums. Configurable consistency levels. Trade-off between availability and consistency.',
          codeExample: `// Quorum-based Replication
public class QuorumReplicator {
    private final List<ReplicaNode> replicas;
    private final int writeQuorum;
    private final int readQuorum;

    public QuorumReplicator(List<ReplicaNode> replicas) {
        this.replicas = replicas;
        int n = replicas.size();
        // W + R > N ensures overlap (strong consistency)
        this.writeQuorum = (n / 2) + 1;
        this.readQuorum = (n / 2) + 1;
    }

    public CompletableFuture<WriteResult> write(String key, String value, long version) {
        AtomicInteger acks = new AtomicInteger(0);
        CompletableFuture<WriteResult> result = new CompletableFuture<>();

        for (ReplicaNode replica : replicas) {
            replica.writeAsync(key, value, version)
                .thenAccept(ack -> {
                    if (acks.incrementAndGet() >= writeQuorum) {
                        result.complete(WriteResult.success(version));
                    }
                })
                .exceptionally(e -> {
                    log.warn("Write to {} failed", replica.getId(), e);
                    return null;
                });
        }

        return result;
    }

    public CompletableFuture<ReadResult> read(String key) {
        List<CompletableFuture<VersionedValue>> futures = new ArrayList<>();

        for (ReplicaNode replica : replicas) {
            futures.add(replica.readAsync(key));
        }

        return CompletableFuture.supplyAsync(() -> {
            List<VersionedValue> values = new ArrayList<>();
            int responses = 0;

            for (CompletableFuture<VersionedValue> f : futures) {
                try {
                    values.add(f.get(100, TimeUnit.MILLISECONDS));
                    if (++responses >= readQuorum) break;
                } catch (Exception e) {
                    // Continue to next replica
                }
            }

            // Return value with highest version
            return values.stream()
                .max(Comparator.comparing(VersionedValue::getVersion))
                .map(ReadResult::success)
                .orElse(ReadResult.notFound());
        });
    }
}` }
      ]
    },
    { id: 'messaging', name: 'Messaging Patterns', icon: '📬', color: '#8b5cf6', description: 'Reliable message passing', diagram: EventSourcingDiagram,
      details: [
        { name: 'Event Sourcing', explanation: 'Store events, not state. Replay events to rebuild state. Complete audit trail. Time-travel debugging. Enables CQRS pattern.',
          codeExample: `// Event Sourcing for Order Management
public class OrderAggregate {
    private String orderId;
    private OrderState state;
    private List<OrderEvent> uncommittedEvents = new ArrayList<>();

    // Apply event to update state
    public void apply(OrderEvent event) {
        if (event instanceof OrderCreated) {
            this.orderId = ((OrderCreated) event).getOrderId();
            this.state = OrderState.NEW;
        } else if (event instanceof OrderFilled) {
            this.state = OrderState.FILLED;
        } else if (event instanceof OrderCancelled) {
            this.state = OrderState.CANCELLED;
        }
    }

    // Business logic produces events
    public void createOrder(CreateOrderCommand cmd) {
        if (state != null) {
            throw new IllegalStateException("Order already exists");
        }

        OrderCreated event = new OrderCreated(
            cmd.getOrderId(),
            cmd.getSymbol(),
            cmd.getQuantity(),
            cmd.getPrice(),
            Instant.now()
        );

        apply(event);
        uncommittedEvents.add(event);
    }

    public void cancel(CancelOrderCommand cmd) {
        if (state != OrderState.NEW) {
            throw new IllegalStateException("Cannot cancel order in state: " + state);
        }

        OrderCancelled event = new OrderCancelled(orderId, cmd.getReason(), Instant.now());
        apply(event);
        uncommittedEvents.add(event);
    }
}

// Event Store
@Service
public class EventStore {
    private final KafkaTemplate<String, OrderEvent> kafka;

    public void save(OrderAggregate aggregate) {
        for (OrderEvent event : aggregate.getUncommittedEvents()) {
            kafka.send("order-events", aggregate.getOrderId(), event);
        }
        aggregate.markEventsAsCommitted();
    }

    public OrderAggregate load(String orderId) {
        OrderAggregate aggregate = new OrderAggregate();

        // Replay all events for this order
        List<OrderEvent> events = kafka.receive("order-events", orderId);
        for (OrderEvent event : events) {
            aggregate.apply(event);
        }

        return aggregate;
    }
}` },
        { name: 'Reliable Delivery', diagram: ReliableDeliveryDiagram, explanation: 'At-least-once vs exactly-once semantics. Idempotency for safe retries. Deduplication strategies. Dead letter queues for failures.',
          codeExample: `// Reliable Message Delivery with Idempotency
@Service
public class ReliableMessageProcessor {
    private final DeduplicationCache dedupeCache;
    private final DeadLetterQueue dlq;

    @KafkaListener(topics = "orders")
    public void processMessage(ConsumerRecord<String, OrderEvent> record) {
        String messageId = record.headers()
            .lastHeader("message-id").value().toString();

        // Idempotency check - skip if already processed
        if (dedupeCache.isDuplicate(messageId)) {
            log.info("Duplicate message {}, skipping", messageId);
            return;
        }

        try {
            // Process message
            OrderEvent event = record.value();
            orderService.process(event);

            // Mark as processed (with TTL for cache cleanup)
            dedupeCache.markProcessed(messageId, Duration.ofHours(24));

        } catch (TransientException e) {
            // Retriable error - throw to trigger retry
            throw e;

        } catch (PermanentException e) {
            // Non-retriable - send to dead letter queue
            dlq.send(record, e.getMessage());
            dedupeCache.markProcessed(messageId, Duration.ofHours(24));
        }
    }
}

// Exactly-once with Kafka transactions
@Service
public class ExactlyOnceProcessor {
    private final KafkaTemplate<String, Object> kafka;

    @Transactional
    public void processAndPublish(OrderEvent event) {
        // Read-process-write in single transaction
        Order order = orderService.process(event);

        // Transactional produce
        kafka.executeInTransaction(ops -> {
            ops.send("order-updates", order.getId(), order);
            return null;
        });
    }
}` },
        { name: 'Backpressure', diagram: BackpressureDiagram, explanation: 'Handle slow consumers. Bounded queues with rejection. Rate limiting producers. Flow control mechanisms. Reactive streams support.',
          codeExample: `// Backpressure Handling
public class BackpressureHandler {
    private final BlockingQueue<Message> queue;
    private final AtomicLong dropped = new AtomicLong(0);

    public BackpressureHandler(int capacity) {
        this.queue = new ArrayBlockingQueue<>(capacity);
    }

    // Non-blocking offer with metrics
    public boolean offer(Message message) {
        boolean accepted = queue.offer(message);
        if (!accepted) {
            dropped.incrementAndGet();
            metrics.incrementCounter("messages.dropped");
        }
        return accepted;
    }

    // Blocking with timeout
    public boolean offerWithTimeout(Message message, Duration timeout)
            throws InterruptedException {
        return queue.offer(message, timeout.toMillis(), TimeUnit.MILLISECONDS);
    }
}

// Reactive Streams backpressure
public class ReactiveOrderProcessor {
    public Flux<ProcessedOrder> processOrders(Flux<Order> orders) {
        return orders
            // Buffer with overflow strategy
            .onBackpressureBuffer(1000,
                dropped -> log.warn("Dropped order: {}", dropped.getId()),
                BufferOverflowStrategy.DROP_OLDEST)

            // Rate limit processing
            .limitRate(100)

            // Process with bounded concurrency
            .flatMap(order -> processAsync(order), 10)

            // Handle slow consumer
            .onBackpressureDrop(order ->
                dlq.send(order, "Consumer too slow"));
    }

    // Pull-based consumer with demand signaling
    public void subscribe(Publisher<Order> publisher) {
        publisher.subscribe(new Subscriber<Order>() {
            private Subscription subscription;

            @Override
            public void onSubscribe(Subscription s) {
                this.subscription = s;
                s.request(10);  // Initial demand
            }

            @Override
            public void onNext(Order order) {
                process(order);
                subscription.request(1);  // Request next after processing
            }
        });
    }
}` }
      ]
    },
    { id: 'coordination', name: 'Distributed Coordination', icon: '🎯', color: '#22c55e', description: 'Coordinating distributed processes',
      details: [
        { name: 'Leader Election', diagram: LeaderElectionDiagram, explanation: 'Single leader for coordination. Lease-based leadership. Automatic failover. Fencing tokens prevent split-brain. ZooKeeper, etcd recipes.',
          codeExample: `// Leader Election with Lease
@Service
public class LeaderElectionService {
    private final CuratorFramework zookeeper;
    private final LeaderLatch leaderLatch;
    private volatile boolean isLeader = false;

    public LeaderElectionService(CuratorFramework zookeeper, String path) {
        this.zookeeper = zookeeper;
        this.leaderLatch = new LeaderLatch(zookeeper, path, nodeId);

        leaderLatch.addListener(new LeaderLatchListener() {
            @Override
            public void isLeader() {
                log.info("Became leader");
                isLeader = true;
                onBecomeLeader();
            }

            @Override
            public void notLeader() {
                log.info("Lost leadership");
                isLeader = false;
                onLoseLeadership();
            }
        });
    }

    @PostConstruct
    public void start() throws Exception {
        leaderLatch.start();
    }

    public boolean isLeader() {
        return isLeader;
    }

    // Fencing token to prevent stale leader actions
    public long getFencingToken() {
        if (!isLeader) {
            throw new NotLeaderException();
        }
        return leaderLatch.getLeaderEpoch();
    }

    // Protected operation with fencing
    public void doLeaderWork(long fencingToken) {
        // Verify we still have valid leadership
        if (fencingToken != getFencingToken()) {
            throw new StaleLeaderException();
        }

        // Safe to proceed with leader-only work
        processOrders();
    }
}` },
        { name: 'Distributed Locks', diagram: DistributedLockDiagram, explanation: 'Mutual exclusion across nodes. Lock with TTL to prevent deadlocks. Redlock algorithm for Redis. ZooKeeper ephemeral nodes. Use sparingly - contention bottleneck.',
          codeExample: `// Distributed Lock with Redis
@Service
public class DistributedLockService {
    private final RedisTemplate<String, String> redis;
    private final String nodeId = UUID.randomUUID().toString();

    public Optional<Lock> tryAcquire(String resource, Duration ttl) {
        String lockKey = "lock:" + resource;
        String lockValue = nodeId + ":" + System.currentTimeMillis();

        // SET NX with TTL (atomic)
        Boolean acquired = redis.opsForValue()
            .setIfAbsent(lockKey, lockValue, ttl);

        if (Boolean.TRUE.equals(acquired)) {
            return Optional.of(new Lock(lockKey, lockValue, ttl));
        }
        return Optional.empty();
    }

    public void release(Lock lock) {
        // Lua script for atomic check-and-delete
        String script = """
            if redis.call('get', KEYS[1]) == ARGV[1] then
                return redis.call('del', KEYS[1])
            else
                return 0
            end
            """;

        redis.execute(new DefaultRedisScript<>(script, Long.class),
            List.of(lock.getKey()), lock.getValue());
    }

    // Usage with try-with-resources
    public void executeWithLock(String resource, Runnable task) {
        Optional<Lock> lock = tryAcquire(resource, Duration.ofSeconds(30));

        if (lock.isEmpty()) {
            throw new LockAcquisitionException("Could not acquire lock: " + resource);
        }

        try {
            task.run();
        } finally {
            release(lock.get());
        }
    }
}` },
        { name: 'Barrier Synchronization', diagram: BarrierSyncDiagram, explanation: 'Wait for multiple processes. Trading session barriers. EOD processing gates. Distributed CountDownLatch equivalent.',
          codeExample: `// Distributed Barrier with ZooKeeper
public class DistributedBarrier {
    private final CuratorFramework zk;
    private final String barrierPath;
    private final int parties;

    public DistributedBarrier(CuratorFramework zk, String name, int parties) {
        this.zk = zk;
        this.barrierPath = "/barriers/" + name;
        this.parties = parties;
    }

    public void await() throws Exception {
        // Create our node
        String nodePath = zk.create()
            .withMode(CreateMode.EPHEMERAL_SEQUENTIAL)
            .forPath(barrierPath + "/node_", new byte[0]);

        while (true) {
            // Get all waiting nodes
            List<String> children = zk.getChildren().forPath(barrierPath);

            if (children.size() >= parties) {
                // All parties arrived - barrier opens
                log.info("Barrier {} opened with {} parties", barrierPath, parties);
                return;
            }

            // Wait for changes
            CountDownLatch latch = new CountDownLatch(1);
            zk.getChildren()
                .usingWatcher((CuratorWatcher) event -> latch.countDown())
                .forPath(barrierPath);

            latch.await();
        }
    }
}

// Trading Session Barrier
@Service
public class TradingSessionBarrier {
    private final DistributedBarrier marketOpenBarrier;

    @Scheduled(cron = "0 25 9 * * MON-FRI")  // 9:25 AM
    public void prepareForOpen() {
        // All trading engines must be ready
        try {
            marketOpenBarrier.await();
            log.info("All systems ready - market opening");
            tradingEngine.enableTrading();
        } catch (Exception e) {
            log.error("Barrier wait failed", e);
            alertService.critical("Market open barrier failed");
        }
    }
}` }
      ]
    },
    { id: 'partitioning', name: 'Data Partitioning', icon: '📊', color: '#f59e0b', description: 'Scaling data across nodes', diagram: ConsistentHashDiagram,
      details: [
        { name: 'Consistent Hashing', explanation: 'Distribute data across nodes evenly. Minimal redistribution on node changes. Virtual nodes for balance. Hash ring implementation. Used in caches and databases.',
          codeExample: `// Consistent Hash Ring
public class ConsistentHashRing<T> {
    private final TreeMap<Long, T> ring = new TreeMap<>();
    private final int virtualNodes;
    private final HashFunction hashFunction;

    public ConsistentHashRing(int virtualNodes) {
        this.virtualNodes = virtualNodes;
        this.hashFunction = Hashing.murmur3_128();
    }

    public void addNode(T node) {
        for (int i = 0; i < virtualNodes; i++) {
            long hash = hash(node.toString() + "#" + i);
            ring.put(hash, node);
        }
    }

    public void removeNode(T node) {
        for (int i = 0; i < virtualNodes; i++) {
            long hash = hash(node.toString() + "#" + i);
            ring.remove(hash);
        }
    }

    public T getNode(String key) {
        if (ring.isEmpty()) {
            return null;
        }

        long hash = hash(key);

        // Find first node clockwise from hash
        Map.Entry<Long, T> entry = ring.ceilingEntry(hash);
        if (entry == null) {
            // Wrap around to first node
            entry = ring.firstEntry();
        }

        return entry.getValue();
    }

    // Get N replicas for a key
    public List<T> getNodes(String key, int count) {
        if (ring.isEmpty()) {
            return Collections.emptyList();
        }

        Set<T> nodes = new LinkedHashSet<>();
        long hash = hash(key);

        NavigableMap<Long, T> tailMap = ring.tailMap(hash, true);

        for (T node : tailMap.values()) {
            nodes.add(node);
            if (nodes.size() >= count) break;
        }

        // Wrap around if needed
        if (nodes.size() < count) {
            for (T node : ring.values()) {
                nodes.add(node);
                if (nodes.size() >= count) break;
            }
        }

        return new ArrayList<>(nodes);
    }

    private long hash(String key) {
        return hashFunction.hashString(key, StandardCharsets.UTF_8).asLong();
    }
}` },
        { name: 'Partition Strategies', diagram: PartitionStrategiesDiagram, explanation: 'Range partitioning for ordered data. Hash partitioning for even distribution. Composite keys for locality. Hot partition detection. Rebalancing strategies.',
          codeExample: `// Partition Strategy Implementations
public interface PartitionStrategy {
    int getPartition(String key, int numPartitions);
}

// Hash partitioning - even distribution
public class HashPartitioner implements PartitionStrategy {
    @Override
    public int getPartition(String key, int numPartitions) {
        return Math.abs(key.hashCode()) % numPartitions;
    }
}

// Range partitioning - ordered data locality
public class RangePartitioner implements PartitionStrategy {
    private final NavigableMap<String, Integer> ranges;

    public RangePartitioner(List<String> boundaries) {
        this.ranges = new TreeMap<>();
        for (int i = 0; i < boundaries.size(); i++) {
            ranges.put(boundaries.get(i), i);
        }
    }

    @Override
    public int getPartition(String key, int numPartitions) {
        Map.Entry<String, Integer> entry = ranges.floorEntry(key);
        return entry != null ? entry.getValue() : 0;
    }
}

// Composite key for co-location
public class CompositeKeyPartitioner implements PartitionStrategy {
    @Override
    public int getPartition(String compositeKey, int numPartitions) {
        // Key format: "accountId|orderId"
        // Partition by accountId for order locality
        String partitionKey = compositeKey.split("\\\\|")[0];
        return Math.abs(partitionKey.hashCode()) % numPartitions;
    }
}

// Hot partition detection
@Service
public class PartitionMonitor {
    @Scheduled(fixedRate = 1000)
    public void detectHotPartitions() {
        Map<Integer, Long> messageCounts = metricsService.getPartitionCounts();
        double avg = messageCounts.values().stream()
            .mapToLong(Long::longValue).average().orElse(0);

        for (Map.Entry<Integer, Long> entry : messageCounts.entrySet()) {
            if (entry.getValue() > avg * 3) {  // 3x average
                alertService.warn("Hot partition detected: " + entry.getKey());
            }
        }
    }
}` },
        { name: 'Partition Assignment', diagram: PartitionAssignmentDiagram, explanation: 'Consumer group coordination. Kafka partition assignment. Sticky assignment for locality. Cooperative rebalancing. Partition ownership tracking.',
          codeExample: `// Custom Partition Assignor
public class StickySymbolAssignor extends AbstractPartitionAssignor {
    @Override
    public Map<String, List<TopicPartition>> assign(
            Map<String, Integer> partitionsPerTopic,
            Map<String, Subscription> subscriptions) {

        Map<String, List<TopicPartition>> assignment = new HashMap<>();

        // Initialize empty assignments
        for (String memberId : subscriptions.keySet()) {
            assignment.put(memberId, new ArrayList<>());
        }

        // Get previous assignment for stickiness
        Map<TopicPartition, String> previousOwnership = new HashMap<>();
        for (var entry : subscriptions.entrySet()) {
            for (TopicPartition tp : entry.getValue().ownedPartitions()) {
                previousOwnership.put(tp, entry.getKey());
            }
        }

        // Assign partitions with preference for previous owner
        for (var topicEntry : partitionsPerTopic.entrySet()) {
            String topic = topicEntry.getKey();
            int numPartitions = topicEntry.getValue();

            for (int p = 0; p < numPartitions; p++) {
                TopicPartition tp = new TopicPartition(topic, p);
                String previousOwner = previousOwnership.get(tp);

                if (previousOwner != null && subscriptions.containsKey(previousOwner)) {
                    // Sticky - assign to previous owner
                    assignment.get(previousOwner).add(tp);
                } else {
                    // Round-robin to least loaded consumer
                    String leastLoaded = assignment.entrySet().stream()
                        .min(Comparator.comparingInt(e -> e.getValue().size()))
                        .map(Map.Entry::getKey)
                        .orElseThrow();
                    assignment.get(leastLoaded).add(tp);
                }
            }
        }

        return assignment;
    }

    @Override
    public String name() {
        return "sticky-symbol";
    }
}` }
      ]
    },
    { id: 'resilience', name: 'Fault Tolerance', icon: '🛡️', color: '#ef4444', description: 'Building resilient systems', diagram: CircuitBreakerDiagram,
      details: [
        { name: 'Circuit Breaker', explanation: 'Prevent cascade failures. Open circuit on repeated failures. Half-open for testing recovery. Close when service recovers. Hystrix, Resilience4j.',
          codeExample: `// Circuit Breaker Implementation
public class CircuitBreaker {
    enum State { CLOSED, OPEN, HALF_OPEN }

    private final AtomicReference<State> state = new AtomicReference<>(State.CLOSED);
    private final AtomicInteger failureCount = new AtomicInteger(0);
    private final AtomicInteger successCount = new AtomicInteger(0);
    private volatile long lastFailureTime = 0;

    private final int failureThreshold;
    private final int successThreshold;
    private final long timeout;

    public <T> T execute(Supplier<T> operation, Supplier<T> fallback) {
        if (!allowRequest()) {
            return fallback.get();
        }

        try {
            T result = operation.get();
            onSuccess();
            return result;
        } catch (Exception e) {
            onFailure();
            return fallback.get();
        }
    }

    private boolean allowRequest() {
        State currentState = state.get();

        if (currentState == State.CLOSED) {
            return true;
        }

        if (currentState == State.OPEN) {
            // Check if timeout has passed
            if (System.currentTimeMillis() - lastFailureTime >= timeout) {
                // Transition to half-open
                if (state.compareAndSet(State.OPEN, State.HALF_OPEN)) {
                    successCount.set(0);
                    return true;
                }
            }
            return false;
        }

        // Half-open: allow limited requests
        return true;
    }

    private void onSuccess() {
        State currentState = state.get();

        if (currentState == State.HALF_OPEN) {
            if (successCount.incrementAndGet() >= successThreshold) {
                // Enough successes, close the circuit
                state.set(State.CLOSED);
                failureCount.set(0);
            }
        } else if (currentState == State.CLOSED) {
            failureCount.set(0);
        }
    }

    private void onFailure() {
        lastFailureTime = System.currentTimeMillis();

        State currentState = state.get();

        if (currentState == State.HALF_OPEN) {
            // Any failure in half-open reopens circuit
            state.set(State.OPEN);
        } else if (currentState == State.CLOSED) {
            if (failureCount.incrementAndGet() >= failureThreshold) {
                state.set(State.OPEN);
            }
        }
    }
}` },
        { name: 'Retry Strategies', diagram: RetryStrategiesDiagram, explanation: 'Exponential backoff with jitter. Max retry limits. Idempotency requirements. Circuit breaker integration. Deadline propagation.',
          codeExample: `// Retry with Exponential Backoff and Jitter
public class RetryPolicy {
    private final int maxRetries;
    private final Duration baseDelay;
    private final Duration maxDelay;
    private final Random random = new Random();

    public <T> T execute(Supplier<T> operation) throws Exception {
        Exception lastException = null;

        for (int attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return operation.get();
            } catch (TransientException e) {
                lastException = e;

                if (attempt == maxRetries) {
                    throw e;
                }

                Duration delay = calculateDelay(attempt);
                log.warn("Attempt {} failed, retrying in {}ms", attempt + 1, delay.toMillis());
                Thread.sleep(delay.toMillis());
            }
        }

        throw lastException;
    }

    private Duration calculateDelay(int attempt) {
        // Exponential backoff: base * 2^attempt
        long exponentialMs = baseDelay.toMillis() * (1L << attempt);

        // Cap at max delay
        long cappedMs = Math.min(exponentialMs, maxDelay.toMillis());

        // Add jitter (0-100% of delay) to prevent thundering herd
        long jitterMs = (long) (cappedMs * random.nextDouble());

        return Duration.ofMillis(cappedMs + jitterMs);
    }
}

// Retry with deadline propagation
public class DeadlineAwareRetry {
    public <T> T executeWithDeadline(Supplier<T> operation, Instant deadline) {
        while (Instant.now().isBefore(deadline)) {
            try {
                return operation.get();
            } catch (TransientException e) {
                Duration remaining = Duration.between(Instant.now(), deadline);
                if (remaining.toMillis() < 100) {
                    throw new DeadlineExceededException("No time for retry");
                }
                // Brief pause before retry
                sleep(Math.min(100, remaining.toMillis() / 2));
            }
        }
        throw new DeadlineExceededException("Deadline exceeded");
    }
}` },
        { name: 'Bulkhead Pattern', diagram: BulkheadDiagram, explanation: 'Isolate failures to components. Thread pool isolation. Semaphore isolation. Prevent resource exhaustion. Service mesh implementation.',
          codeExample: `// Bulkhead Pattern - Thread Pool Isolation
@Service
public class BulkheadService {
    // Separate thread pools for different services
    private final ExecutorService orderPool = Executors.newFixedThreadPool(20);
    private final ExecutorService marketDataPool = Executors.newFixedThreadPool(10);
    private final ExecutorService riskPool = Executors.newFixedThreadPool(5);

    private final Semaphore orderSemaphore = new Semaphore(100);
    private final Semaphore riskSemaphore = new Semaphore(50);

    // Thread pool isolation
    public CompletableFuture<Order> processOrder(OrderRequest request) {
        return CompletableFuture.supplyAsync(() -> {
            return orderService.process(request);
        }, orderPool);
    }

    // Semaphore isolation for bounded concurrency
    public RiskResult checkRisk(Order order) {
        if (!riskSemaphore.tryAcquire()) {
            throw new BulkheadFullException("Risk check bulkhead full");
        }

        try {
            return riskService.check(order);
        } finally {
            riskSemaphore.release();
        }
    }
}

// Resilience4j Bulkhead
@Service
public class ResilientOrderService {
    private final Bulkhead bulkhead = Bulkhead.of("order-service",
        BulkheadConfig.custom()
            .maxConcurrentCalls(25)
            .maxWaitDuration(Duration.ofMillis(100))
            .build());

    public Order processOrder(OrderRequest request) {
        return Bulkhead.decorateSupplier(bulkhead, () ->
            orderService.process(request)
        ).get();
    }

    // Monitor bulkhead metrics
    @Scheduled(fixedRate = 1000)
    public void reportMetrics() {
        BulkheadMetrics metrics = bulkhead.getMetrics();
        log.info("Bulkhead - available: {}, waiting: {}",
            metrics.getAvailableConcurrentCalls(),
            metrics.getMaxAllowedConcurrentCalls() -
            metrics.getAvailableConcurrentCalls());
    }
}` }
      ]
    },
    { id: 'observability', name: 'Distributed Tracing', icon: '🔍', color: '#06b6d4', description: 'Observing distributed systems',
      details: [
        { name: 'Tracing Implementation', diagram: TracingDiagram, explanation: 'Track requests across services. Span hierarchy for call trees. Context propagation via headers. Sampling strategies. OpenTelemetry standard.',
          codeExample: `// Distributed Tracing with OpenTelemetry
@Component
public class OrderServiceTracing {
    private final Tracer tracer;

    public OrderServiceTracing(OpenTelemetry openTelemetry) {
        this.tracer = openTelemetry.getTracer("order-service");
    }

    public void processOrder(Order order, Context parentContext) {
        // Create child span
        Span span = tracer.spanBuilder("processOrder")
            .setParent(parentContext)
            .setAttribute("order.id", order.getId())
            .setAttribute("order.symbol", order.getSymbol())
            .setAttribute("order.quantity", order.getQuantity())
            .startSpan();

        try (Scope scope = span.makeCurrent()) {
            // Validate order
            Span validationSpan = tracer.spanBuilder("validateOrder")
                .startSpan();
            try {
                validateOrder(order);
            } finally {
                validationSpan.end();
            }

            // Risk check (calls external service)
            Span riskSpan = tracer.spanBuilder("riskCheck")
                .setAttribute("risk.check.type", "pre-trade")
                .startSpan();
            try {
                RiskResult result = riskService.check(order);
                riskSpan.setAttribute("risk.approved", result.isApproved());
            } finally {
                riskSpan.end();
            }

            // Route order
            Span routeSpan = tracer.spanBuilder("routeOrder")
                .startSpan();
            try {
                executionService.route(order);
            } finally {
                routeSpan.end();
            }

            span.setStatus(StatusCode.OK);
        } catch (Exception e) {
            span.setStatus(StatusCode.ERROR, e.getMessage());
            span.recordException(e);
            throw e;
        } finally {
            span.end();
        }
    }
}

// Context propagation in HTTP
@Component
public class TracingFilter implements Filter {
    private final TextMapPropagator propagator;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
        HttpServletRequest request = (HttpServletRequest) req;

        // Extract trace context from incoming headers
        Context context = propagator.extract(
            Context.current(),
            request,
            new TextMapGetter<HttpServletRequest>() {
                @Override
                public String get(HttpServletRequest carrier, String key) {
                    return carrier.getHeader(key);
                }
            }
        );

        try (Scope scope = context.makeCurrent()) {
            chain.doFilter(req, res);
        }
    }
}` },
        { name: 'Metrics Aggregation', diagram: MetricsDiagram, explanation: 'Collect metrics across services. RED metrics (Rate, Errors, Duration). Percentile calculations. Time-series databases. Prometheus, InfluxDB.',
          codeExample: `// Metrics Collection and Aggregation
@Component
public class TradingMetrics {
    private final MeterRegistry registry;

    // RED metrics - Rate, Errors, Duration
    private final Counter orderCounter;
    private final Counter errorCounter;
    private final Timer orderLatency;
    private final DistributionSummary orderSize;

    public TradingMetrics(MeterRegistry registry) {
        this.registry = registry;

        this.orderCounter = Counter.builder("orders.total")
            .tag("service", "order-gateway")
            .register(registry);

        this.errorCounter = Counter.builder("orders.errors")
            .tag("service", "order-gateway")
            .register(registry);

        this.orderLatency = Timer.builder("orders.latency")
            .publishPercentiles(0.5, 0.95, 0.99)
            .publishPercentileHistogram()
            .register(registry);

        this.orderSize = DistributionSummary.builder("orders.size")
            .publishPercentiles(0.5, 0.95, 0.99)
            .register(registry);
    }

    public void recordOrder(Order order, long startNanos, boolean success) {
        orderCounter.increment();
        orderSize.record(order.getQuantity());

        long latencyNanos = System.nanoTime() - startNanos;
        orderLatency.record(latencyNanos, TimeUnit.NANOSECONDS);

        if (!success) {
            errorCounter.increment();
        }

        // Gauge for current positions
        Gauge.builder("positions.count", positions, Map::size)
            .register(registry);
    }
}

// Prometheus endpoint configuration
@Configuration
public class MetricsConfig {
    @Bean
    public MeterRegistryCustomizer<MeterRegistry> commonTags() {
        return registry -> registry.config()
            .commonTags("application", "trading-engine")
            .commonTags("environment", System.getenv("ENV"));
    }
}` },
        { name: 'Log Correlation', diagram: LogCorrelationDiagram, explanation: 'Correlate logs via trace ID. Structured logging format. Log aggregation (ELK stack). Search and analysis. Alert correlation.',
          codeExample: `// Log Correlation with MDC
@Component
public class CorrelationFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        try {
            String traceId = extractOrGenerateTraceId((HttpServletRequest) req);
            String spanId = UUID.randomUUID().toString().substring(0, 8);

            // Set MDC for log correlation
            MDC.put("traceId", traceId);
            MDC.put("spanId", spanId);
            MDC.put("service", "order-service");

            // Propagate to response headers
            ((HttpServletResponse) res).setHeader("X-Trace-Id", traceId);

            chain.doFilter(req, res);
        } finally {
            MDC.clear();
        }
    }

    private String extractOrGenerateTraceId(HttpServletRequest req) {
        String traceId = req.getHeader("X-Trace-Id");
        return traceId != null ? traceId : UUID.randomUUID().toString();
    }
}

// Structured logging configuration (logback)
// Pattern: {"timestamp":"%d","level":"%p","traceId":"%X{traceId}","service":"%X{service}","message":"%m"}%n

// Usage in service
@Service
@Slf4j
public class OrderService {
    public void processOrder(Order order) {
        MDC.put("orderId", order.getId());
        MDC.put("symbol", order.getSymbol());

        log.info("Processing order");
        // Output: {"timestamp":"2024-01-15T10:30:00","level":"INFO","traceId":"abc123",
        //          "service":"order-service","orderId":"ORD-001","symbol":"AAPL",
        //          "message":"Processing order"}

        try {
            // Process...
            log.info("Order processed successfully");
        } catch (Exception e) {
            log.error("Order processing failed", e);
            throw e;
        } finally {
            MDC.remove("orderId");
            MDC.remove("symbol");
        }
    }
}` }
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
    const stack = [{ name: 'eTrading', icon: '📈' }, { name: 'Distributed Systems', icon: '🌐' }]
    if (selectedConcept) stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) onBack()
    else if (index === 1 && selectedConcept) setSelectedConceptIndex(null)
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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)', padding: '2rem', fontFamily: 'system-ui' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Distributed Systems</h1>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '0.5rem', color: '#60a5fa', cursor: 'pointer' }}>← Back to eTrading</button>
      </div>
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}><Breadcrumb breadcrumbStack={buildBreadcrumbStack()} onBreadcrumbClick={handleBreadcrumbClick} colors={ETRADING_COLORS} onMainMenu={breadcrumb?.onMainMenu} /></div>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {concepts.map((c, index) => (
          <div key={c.id} onClick={() => setSelectedConceptIndex(index)} style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: `1px solid ${c.color}40`, cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = c.color }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = `${c.color}40` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}><span style={{ fontSize: '2.5rem' }}>{c.icon}</span><h3 style={{ color: c.color, margin: 0 }}>{c.name}</h3></div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{c.description}</p>
          </div>
        ))}
      </div>
      {selectedConcept && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }} onClick={() => setSelectedConceptIndex(null)}>
          <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '1rem', padding: '2rem', width: '95vw', maxWidth: '1400px', height: '90vh', overflow: 'auto', border: `1px solid ${selectedConcept.color}40` }} onClick={(e) => e.stopPropagation()}>
            <Breadcrumb breadcrumbStack={buildBreadcrumbStack()} onBreadcrumbClick={handleBreadcrumbClick} colors={ETRADING_COLORS} onMainMenu={breadcrumb?.onMainMenu} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <h2 style={{ color: selectedConcept.color, margin: 0, fontSize: '1.25rem' }}>{selectedConcept.icon} {selectedConcept.name}</h2>
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
              const d = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = d.diagram || selectedConcept.diagram
              return (
                <div>
                  {DiagramComponent && (
                    <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', border: '1px solid #334155' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{d.name}</h3>
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{d.explanation}</p>
                  {d.codeExample && <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ padding: '1rem', margin: 0, borderRadius: '0.5rem', fontSize: '0.8rem', border: '1px solid #334155', background: '#0f172a' }} codeTagProps={{ style: { background: 'transparent' } }}>{d.codeExample}</SyntaxHighlighter>}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default DistributedSystems

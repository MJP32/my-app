import { useState, useEffect, useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

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

// Aeron Architecture Diagram
const AeronArchDiagram = () => (
  <svg viewBox="0 0 700 280" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="aeronArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Messaging Architecture</text>
    {/* Publisher */}
    <rect x="50" y="80" width="120" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Publisher</text>
    <text x="110" y="130" textAnchor="middle" fill="#bfdbfe" fontSize="9">aeron.addPublication()</text>
    <text x="110" y="145" textAnchor="middle" fill="#bfdbfe" fontSize="8">offer(buffer)</text>
    {/* Media Driver */}
    <rect x="220" y="60" width="180" height="120" rx="8" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="310" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Media Driver</text>
    <rect x="235" y="105" width="70" height="25" rx="4" fill="#ea580c"/>
    <text x="270" y="122" textAnchor="middle" fill="white" fontSize="8">Sender</text>
    <rect x="315" y="105" width="70" height="25" rx="4" fill="#ea580c"/>
    <text x="350" y="122" textAnchor="middle" fill="white" fontSize="8">Receiver</text>
    <rect x="235" y="140" width="150" height="25" rx="4" fill="#c2410c"/>
    <text x="310" y="157" textAnchor="middle" fill="white" fontSize="8">Conductor (Control)</text>
    {/* Subscriber */}
    <rect x="450" y="80" width="120" height="80" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="510" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Subscriber</text>
    <text x="510" y="130" textAnchor="middle" fill="#bbf7d0" fontSize="9">aeron.addSubscription()</text>
    <text x="510" y="145" textAnchor="middle" fill="#bbf7d0" fontSize="8">poll(handler)</text>
    {/* Shared Memory */}
    <rect x="180" y="200" width="260" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="310" y="220" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Shared Memory (Memory-Mapped Files)</text>
    <text x="310" y="238" textAnchor="middle" fill="#c4b5fd" fontSize="9">Zero-copy IPC • Lock-free ring buffers</text>
    {/* Arrows */}
    <line x1="170" y1="120" x2="215" y2="120" stroke="#4ade80" strokeWidth="2" markerEnd="url(#aeronArrow)"/>
    <line x1="400" y1="120" x2="445" y2="120" stroke="#4ade80" strokeWidth="2" markerEnd="url(#aeronArrow)"/>
    <line x1="110" y1="160" x2="110" y2="195" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#aeronArrow)"/>
    <line x1="510" y1="160" x2="510" y2="195" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#aeronArrow)"/>
  </svg>
)

// Aeron Cluster Diagram
const AeronClusterDiagram = () => (
  <svg viewBox="0 0 700 260" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="clusterArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Cluster - Consensus-Based Replication</text>
    {/* Leader */}
    <circle cx="350" cy="100" r="50" fill="#22c55e" stroke="#4ade80" strokeWidth="3"/>
    <text x="350" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">LEADER</text>
    <text x="350" y="112" textAnchor="middle" fill="white" fontSize="9">Node 1</text>
    {/* Followers */}
    <circle cx="180" cy="180" r="40" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="180" y="175" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">FOLLOWER</text>
    <text x="180" y="192" textAnchor="middle" fill="white" fontSize="9">Node 2</text>
    <circle cx="520" cy="180" r="40" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="520" y="175" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">FOLLOWER</text>
    <text x="520" y="192" textAnchor="middle" fill="white" fontSize="9">Node 3</text>
    {/* Log replication */}
    <line x1="310" y1="135" x2="210" y2="150" stroke="#4ade80" strokeWidth="2" markerEnd="url(#clusterArrow)"/>
    <line x1="390" y1="135" x2="490" y2="150" stroke="#4ade80" strokeWidth="2" markerEnd="url(#clusterArrow)"/>
    {/* Labels */}
    <text x="240" y="130" fill="#4ade80" fontSize="9">Log replication</text>
    <text x="430" y="130" fill="#4ade80" fontSize="9">Log replication</text>
    {/* Benefits */}
    <rect x="150" y="230" width="400" height="25" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155"/>
    <text x="350" y="247" textAnchor="middle" fill="#64748b" fontSize="10">Raft consensus • State machine replication • Automatic failover</text>
  </svg>
)

// Pub/Sub Pattern Diagram
const PubSubDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="pubsubArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Aeron Publication & Subscription`}</text>
    {/* Publisher */}
    <rect x="50" y="70" width="100" height="100" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Publisher</text>
    <text x="100" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="8">Channel: UDP</text>
    <text x="100" y="135" textAnchor="middle" fill="#bfdbfe" fontSize="8">Stream: 1001</text>
    <text x="100" y="150" textAnchor="middle" fill="#93c5fd" fontSize="8">offer(buffer)</text>
    {/* Channel */}
    <rect x="200" y="90" width="200" height="60" rx="6" fill="rgba(249, 115, 22, 0.3)" stroke="#f97316" strokeWidth="2"/>
    <text x="300" y="115" textAnchor="middle" fill="#fb923c" fontSize="10" fontWeight="bold">aeron:udp?endpoint=224.0.1.1:40456</text>
    <text x="300" y="135" textAnchor="middle" fill="#fdba74" fontSize="9">Multicast • Reliable • Ordered</text>
    {/* Subscribers */}
    <rect x="450" y="50" width="100" height="55" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="500" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Subscriber 1</text>
    <text x="500" y="92" textAnchor="middle" fill="#bbf7d0" fontSize="8">poll(handler)</text>
    <rect x="450" y="115" width="100" height="55" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="500" y="140" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Subscriber 2</text>
    <text x="500" y="157" textAnchor="middle" fill="#bbf7d0" fontSize="8">poll(handler)</text>
    {/* Arrows */}
    <line x1="150" y1="120" x2="195" y2="120" stroke="#4ade80" strokeWidth="2" markerEnd="url(#pubsubArrow)"/>
    <line x1="400" y1="105" x2="445" y2="80" stroke="#4ade80" strokeWidth="2" markerEnd="url(#pubsubArrow)"/>
    <line x1="400" y1="135" x2="445" y2="140" stroke="#4ade80" strokeWidth="2" markerEnd="url(#pubsubArrow)"/>
  </svg>
)

// What is Aeron Diagram
const WhatIsAeronDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron: High-Performance Messaging</text>
    {['Zero-Copy', 'Lock-Free', 'Multicast', 'UDP/IPC', 'µs Latency'].map((feat, i) => (
      <g key={i}><rect x={35 + i * 132} y="50" width="115" height="55" rx="4" fill={['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ef4444'][i]}/><text x={92 + i * 132} y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{feat}</text></g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Java/C++/C | Real Tick Holdings | Used by major trading firms</text>
  </svg>
)

// Media Driver Diagram
const MediaDriverDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Media Driver Components</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="#f97316"/>
    <text x="140" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Sender Thread</text>
    <text x="140" y="90" textAnchor="middle" fill="#fed7aa" fontSize="8">Outbound messages</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="#22c55e"/>
    <text x="350" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Receiver Thread</text>
    <text x="350" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Inbound messages</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="#3b82f6"/>
    <text x="560" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Conductor Thread</text>
    <text x="560" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Control plane</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Embedded or Standalone | Shared memory for IPC | Busy-spin for low latency</text>
  </svg>
)

// Transport Types Diagram
const TransportTypesDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Transport Types</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">UDP Unicast/Multicast</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">aeron:udp?endpoint=host:port</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">IPC (Shared Memory)</text>
    <text x="380" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">aeron:ipc (sub-µs)</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Spy (Passive)</text>
    <text x="585" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">aeron-spy:aeron:</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Choose based on: IPC for same-host, UDP for network, Spy for monitoring</text>
  </svg>
)

// Publication Diagram
const PublicationDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Publication API</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">addPublication()</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Channel + StreamId</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">offer(buffer)</text>
    <text x="380" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Returns position or error</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#ef4444"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Back Pressure</text>
    <text x="585" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">BACK_PRESSURED</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">tryClaim() for zero-copy | Exclusive for single writer | Concurrent for multiple</text>
  </svg>
)

// Subscription Diagram
const SubscriptionDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Subscription API</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">addSubscription()</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Channel + StreamId</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">poll(handler, limit)</text>
    <text x="380" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">FragmentHandler callback</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Image</text>
    <text x="585" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Per-connection view</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">controlledPoll() for flow control | hasNoImages() check | Position tracking</text>
  </svg>
)

// Reliable Delivery Diagram
const ReliableDeliveryDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Reliable Messaging</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">NAK-based Retransmit</text>
    <text x="150" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Detect gaps, request resend</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Flow Control</text>
    <text x="380" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Receiver window</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Ordered Delivery</text>
    <text x="585" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Per-stream sequence</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Status messages for liveness | Term buffers for storage | Publication limit for backpressure</text>
  </svg>
)

// Raft Consensus Diagram
const RaftConsensusDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Cluster Raft Consensus</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Leader Election</text>
    <text x="150" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Timeout triggers vote</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Log Replication</text>
    <text x="380" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Leader to followers</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Commit</text>
    <text x="585" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Quorum ack (N/2+1)</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">State machine replication | Deterministic replay | Snapshot-based recovery</text>
  </svg>
)

// Snapshots Diagram
const SnapshotsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Cluster Snapshots & Recovery`}</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Snapshot</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Periodic state capture</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#f59e0b"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Log Truncation</text>
    <text x="380" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Discard before snapshot</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#22c55e"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Recovery</text>
    <text x="585" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Load + replay log</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">ClusteredService.onTakeSnapshot() | Minimal log replay on startup</text>
  </svg>
)

// Client Interaction Diagram
const ClientInteractionDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Cluster Client Interaction</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">AeronCluster.offer()</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Client sends to leader</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">onSessionMessage()</text>
    <text x="380" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Service processes</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">egressPublisher</text>
    <text x="585" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Response to client</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Session-based | Correlation ID for request-response | Cluster redirect on failover</text>
  </svg>
)

// Latency Optimization Diagram
const LatencyOptDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Latency Optimization</text>
    {['Busy Spin', 'Core Pinning', 'NUMA Aware', 'Huge Pages', 'Pre-touch'].map((opt, i) => (
      <g key={i}><rect x={35 + i * 132} y="50" width="115" height="55" rx="4" fill={['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'][i]}/><text x={92 + i * 132} y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{opt}</text></g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">IdleStrategy: Busy/Yielding/Sleeping | Single-digit µs latency achievable</text>
  </svg>
)

// Memory Management Diagram
const MemoryMgmtDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Memory Management</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Direct Buffers</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Off-heap, GC-free</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Memory-Mapped Files</text>
    <text x="380" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Shared memory IPC</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Buffer Pooling</text>
    <text x="585" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Reuse allocations</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Agrona library | MutableDirectBuffer | Zero-allocation hot paths</text>
  </svg>
)

// Network Tuning Diagram
const NetworkTuningDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Aeron Network Tuning</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Socket Buffers</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">SO_RCVBUF/SNDBUF</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MTU Tuning</text>
    <text x="380" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Jumbo frames (9000)</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Kernel Bypass</text>
    <text x="585" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">DPDK, ef_vi</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Multicast groups | Network interrupt coalescing | IRQ affinity</text>
  </svg>
)

// Event Sourcing Diagram
const EventSourcingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Event Sourcing with Aeron</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Command</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Intent to change state</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Event (Log)</text>
    <text x="380" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Immutable fact stored</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Projection</text>
    <text x="585" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Derived state view</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Aeron Archive for event log | Replay for rebuild | CQRS pattern</text>
  </svg>
)

// Request-Response Diagram
const ReqRespDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Request-Response with Aeron</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Request Channel</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Client → Server</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Correlation ID</text>
    <text x="380" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Match req to resp</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Response Channel</text>
    <text x="585" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Server → Client</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Per-client response pub | Async callback | Timeout handling</text>
  </svg>
)

// Market Data Distribution Diagram
const MDDistributionDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Market Data with Aeron Multicast</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Publisher (1)</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Feed handler</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#f59e0b"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">UDP Multicast</text>
    <text x="380" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">224.0.1.x:port</text>
    <rect x="510" y="50" width="150" height="55" rx="4" fill="#22c55e"/>
    <text x="585" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Subscribers (N)</text>
    <text x="585" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Trading engines</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">One-to-many efficient | SBE encoding | Sequence for gap detection</text>
  </svg>
)

function AeronMessaging({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'aeron-fundamentals',
      name: 'Aeron Fundamentals',
      icon: '⚡',
      color: '#f97316',
      description: 'High-performance messaging library for low-latency, high-throughput systems',
      diagram: AeronArchDiagram,
      details: [
        {
          name: 'What is Aeron?',
          diagram: WhatIsAeronDiagram,
          explanation: 'Aeron is an efficient, reliable, low-latency message transport library. Developed by Real Logic, it is designed for high-frequency trading and financial systems. Supports UDP unicast, UDP multicast, and IPC (shared memory). Achieves sub-microsecond latencies for IPC and single-digit microseconds for network transport.',
          codeExample: `// Aeron Publisher Setup
import io.aeron.Aeron;
import io.aeron.Publication;
import io.aeron.driver.MediaDriver;
import org.agrona.concurrent.UnsafeBuffer;

public class AeronPublisher {
    private static final String CHANNEL = "aeron:udp?endpoint=localhost:40123";
    private static final int STREAM_ID = 1001;

    public static void main(String[] args) {
        // Start embedded media driver (or connect to external)
        MediaDriver driver = MediaDriver.launchEmbedded();

        // Create Aeron instance
        Aeron.Context ctx = new Aeron.Context()
            .aeronDirectoryName(driver.aeronDirectoryName());

        try (Aeron aeron = Aeron.connect(ctx);
             Publication publication = aeron.addPublication(CHANNEL, STREAM_ID)) {

            // Wait for subscriber to connect
            while (!publication.isConnected()) {
                Thread.sleep(10);
            }

            // Prepare message buffer
            UnsafeBuffer buffer = new UnsafeBuffer(new byte[256]);

            // Send messages
            for (int i = 0; i < 1_000_000; i++) {
                String message = "Order-" + i;
                buffer.putStringWithoutLengthAscii(0, message);

                // Offer message (non-blocking)
                long result = publication.offer(buffer, 0, message.length());

                if (result < 0) {
                    // Handle back pressure
                    if (result == Publication.BACK_PRESSURED) {
                        Thread.yield();
                        i--;  // Retry
                    } else if (result == Publication.NOT_CONNECTED) {
                        System.out.println("Subscriber disconnected");
                        break;
                    }
                }
            }
        }
    }
}`
        },
        {
          name: 'Media Driver',
          diagram: MediaDriverDiagram,
          explanation: 'The Media Driver is the core component that handles all I/O operations. Can run embedded (same process) or standalone (separate process). Manages network sockets, shared memory buffers, and congestion control. Conductor thread handles control plane; sender/receiver threads handle data plane.',
          codeExample: `// Media Driver Configuration
import io.aeron.driver.MediaDriver;
import io.aeron.driver.ThreadingMode;

public class OptimizedMediaDriver {
    public static MediaDriver launch() {
        MediaDriver.Context ctx = new MediaDriver.Context()
            // Threading: DEDICATED for lowest latency
            .threadingMode(ThreadingMode.DEDICATED)

            // Conductor runs admin tasks
            .conductorIdleStrategy(new BusySpinIdleStrategy())

            // Sender/Receiver for network I/O
            .senderIdleStrategy(new BusySpinIdleStrategy())
            .receiverIdleStrategy(new BusySpinIdleStrategy())

            // Buffer sizes
            .publicationTermBufferLength(16 * 1024 * 1024)  // 16MB
            .ipcTermBufferLength(64 * 1024 * 1024)          // 64MB for IPC

            // Directory for shared memory files
            .aeronDirectoryName("/dev/shm/aeron-trading")

            // Delete directory on start (clean slate)
            .dirDeleteOnStart(true)

            // Pre-touch pages to avoid page faults
            .preTouchMappedMemory(true);

        return MediaDriver.launch(ctx);
    }
}`
        },
        {
          name: 'Transport Types',
          diagram: TransportTypesDiagram,
          explanation: 'Aeron supports multiple transport mechanisms: UDP Unicast (point-to-point), UDP Multicast (one-to-many), IPC via shared memory (same machine, lowest latency). Choose based on deployment topology and latency requirements. IPC achieves ~100 nanosecond latencies.',
          codeExample: `// Transport Configuration Examples

// UDP Unicast - Point to point
String unicastChannel = "aeron:udp?endpoint=192.168.1.10:40123";
Publication unicastPub = aeron.addPublication(unicastChannel, STREAM_ID);

// UDP Multicast - One to many (efficient for market data)
String multicastChannel = "aeron:udp?endpoint=224.0.1.1:40456|interface=192.168.1.1";
Publication multicastPub = aeron.addPublication(multicastChannel, STREAM_ID);

// IPC - Same machine, shared memory (lowest latency ~100ns)
String ipcChannel = "aeron:ipc";
Publication ipcPub = aeron.addPublication(ipcChannel, STREAM_ID);

// Subscriber for each transport
Subscription unicastSub = aeron.addSubscription(unicastChannel, STREAM_ID);
Subscription multicastSub = aeron.addSubscription(multicastChannel, STREAM_ID);
Subscription ipcSub = aeron.addSubscription(ipcChannel, STREAM_ID);

// Multi-destination cast (MDC) - one publication, multiple endpoints
String mdcChannel = "aeron:udp?control-mode=dynamic|control=192.168.1.1:40124";
Publication mdcPub = aeron.addPublication(mdcChannel, STREAM_ID);

// Add destinations dynamically
mdcPub.addDestination("aeron:udp?endpoint=192.168.1.20:40123");
mdcPub.addDestination("aeron:udp?endpoint=192.168.1.21:40123");

// Reliable multicast with manual control
String reliableMulticast = "aeron:udp?endpoint=224.0.1.1:40456" +
    "|reliable=true" +
    "|ttl=4" +                    // Time-to-live for multicast
    "|mtu=1408";                  // MTU size`
        }
      ]
    },
    {
      id: 'publications-subscriptions',
      name: 'Publications & Subscriptions',
      icon: '📤',
      color: '#3b82f6',
      description: 'Core messaging patterns for sending and receiving messages',
      diagram: PubSubDiagram,
      details: [
        {
          name: 'Publication (Sending)',
          diagram: PublicationDiagram,
          explanation: 'Publications send messages to a channel/stream. offer() is non-blocking and returns immediately. tryClaim() allows zero-copy writes for better performance. Back pressure is indicated by negative return values. Multiple publishers can share a stream with exclusive publications.',
          codeExample: `// High-Performance Publishing with Zero-Copy
import io.aeron.Publication;
import io.aeron.logbuffer.BufferClaim;

public class ZeroCopyPublisher {
    private final Publication publication;
    private final BufferClaim bufferClaim = new BufferClaim();

    public boolean publishOrder(Order order) {
        // Try to claim buffer space (zero-copy)
        int length = order.encodedLength();
        long result = publication.tryClaim(length, bufferClaim);

        if (result > 0) {
            // Write directly to claimed buffer
            order.encode(bufferClaim.buffer(), bufferClaim.offset());
            bufferClaim.commit();
            return true;
        }

        // Handle back pressure
        if (result == Publication.BACK_PRESSURED) {
            return false;  // Caller should retry
        } else if (result == Publication.NOT_CONNECTED) {
            throw new IllegalStateException("No subscribers connected");
        } else if (result == Publication.ADMIN_ACTION) {
            return false;  // Rotation in progress, retry
        }

        return false;
    }

    // Batch publishing for throughput
    public int publishBatch(List<Order> orders) {
        int published = 0;
        for (Order order : orders) {
            if (publishOrder(order)) {
                published++;
            } else {
                break;  // Back pressure, stop batch
            }
        }
        return published;
    }
}`
        },
        {
          name: 'Subscription (Receiving)',
          diagram: SubscriptionDiagram,
          explanation: 'Subscriptions receive messages via poll() method. FragmentHandler processes each message fragment. Controlled poll limits messages per call for fairness. Image represents connection to a specific publisher. Unavailable images indicate publisher disconnect.',
          codeExample: `// Subscription with Fragment Assembly
import io.aeron.Subscription;
import io.aeron.logbuffer.FragmentHandler;
import io.aeron.logbuffer.Header;
import org.agrona.DirectBuffer;

public class OrderSubscriber {
    private final Subscription subscription;
    private final OrderProcessor processor;

    // Fragment handler for incoming messages
    private final FragmentHandler fragmentHandler = new FragmentHandler() {
        @Override
        public void onFragment(DirectBuffer buffer, int offset, int length, Header header) {
            // Decode order from buffer
            Order order = Order.decode(buffer, offset, length);

            // Process the order
            processor.processOrder(order);

            // Access metadata
            int sessionId = header.sessionId();
            long position = header.position();
        }
    };

    public void run() {
        // Busy spin for lowest latency
        while (true) {
            // Poll for up to 10 fragments
            int fragmentsRead = subscription.poll(fragmentHandler, 10);

            if (fragmentsRead == 0) {
                // No messages, could yield or do other work
                Thread.yield();
            }
        }
    }

    // Controlled poll for fairness across multiple subscriptions
    public int pollMultiple(List<Subscription> subscriptions, int limit) {
        int totalFragments = 0;
        for (Subscription sub : subscriptions) {
            totalFragments += sub.controlledPoll(
                (buffer, offset, length, header) -> {
                    processMessage(buffer, offset, length);
                    return ControlledFragmentHandler.Action.CONTINUE;
                },
                limit
            );
        }
        return totalFragments;
    }
}`
        },
        {
          name: 'Reliable Delivery',
          diagram: ReliableDeliveryDiagram,
          explanation: 'Aeron provides reliable, ordered delivery with loss recovery. NAK-based retransmission requests missing data. Flow control prevents overwhelming slow consumers. Loss detection via gap in position. Configurable retransmit timeout and window.',
          codeExample: `// Reliable Delivery with Loss Handling
public class ReliableSubscriber {
    private final Subscription subscription;
    private long lastPosition = 0;

    // Unavailable counter handler - detect gaps
    private final UnavailableCounterHandler unavailableHandler =
        (registrationId, counterId) -> {
            log.warn("Counter unavailable: {}", counterId);
        };

    // Image availability handler - publisher connected/disconnected
    private final AvailableImageHandler imageAvailable = image -> {
        log.info("Publisher connected: sessionId={}, position={}",
            image.sessionId(), image.position());
        lastPosition = image.position();
    };

    private final UnavailableImageHandler imageUnavailable = image -> {
        log.warn("Publisher disconnected: sessionId={}, position={}",
            image.sessionId(), image.position());
    };

    public void subscribe(String channel, int streamId) {
        subscription = aeron.addSubscription(
            channel, streamId,
            imageAvailable,
            imageUnavailable
        );
    }

    public void poll() {
        int fragments = subscription.poll((buffer, offset, length, header) -> {
            long currentPosition = header.position();

            // Check for gaps (loss occurred, but Aeron recovered)
            if (currentPosition > lastPosition + length) {
                log.info("Gap detected and recovered: {} -> {}",
                    lastPosition, currentPosition);
            }

            lastPosition = currentPosition;
            processMessage(buffer, offset, length);
        }, 10);

        // Check subscription status
        for (Image image : subscription.images()) {
            // Monitor for slow consumer
            if (image.position() < image.joinPosition()) {
                log.warn("Subscriber falling behind");
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'aeron-cluster',
      name: 'Aeron Cluster',
      icon: '🏗️',
      color: '#22c55e',
      description: 'Consensus-based clustering for fault-tolerant trading systems',
      diagram: AeronClusterDiagram,
      details: [
        {
          name: 'Raft Consensus',
          diagram: RaftConsensusDiagram,
          explanation: 'Aeron Cluster implements Raft consensus protocol for fault tolerance. Single leader handles all writes; followers replicate. Automatic leader election on failure. Consistent state across all cluster nodes. Used for critical trading services like order management.',
          codeExample: `// Aeron Cluster Service Implementation
import io.aeron.cluster.service.ClusteredService;
import io.aeron.cluster.service.Cluster;
import io.aeron.logbuffer.Header;
import org.agrona.DirectBuffer;

public class TradingClusterService implements ClusteredService {
    private final OrderBook orderBook = new OrderBook();
    private Cluster cluster;

    @Override
    public void onStart(Cluster cluster, Image snapshotImage) {
        this.cluster = cluster;

        // Restore state from snapshot if available
        if (snapshotImage != null) {
            restoreFromSnapshot(snapshotImage);
        }
    }

    @Override
    public void onSessionMessage(ClientSession session,
                                  long timestamp,
                                  DirectBuffer buffer,
                                  int offset,
                                  int length,
                                  Header header) {
        // Decode message type
        int msgType = buffer.getInt(offset);

        switch (msgType) {
            case MessageTypes.NEW_ORDER:
                handleNewOrder(session, buffer, offset + 4);
                break;
            case MessageTypes.CANCEL_ORDER:
                handleCancelOrder(session, buffer, offset + 4);
                break;
            case MessageTypes.MARKET_DATA:
                handleMarketData(buffer, offset + 4);
                break;
        }
    }

    private void handleNewOrder(ClientSession session,
                                DirectBuffer buffer, int offset) {
        Order order = Order.decode(buffer, offset);

        // Process order through matching engine
        List<Trade> trades = orderBook.processOrder(order);

        // Send response back to client
        for (Trade trade : trades) {
            sendTradeConfirmation(session, trade);
        }
    }

    @Override
    public void onTakeSnapshot(ExclusivePublication snapshotPublication) {
        // Serialize current state for recovery
        orderBook.snapshot(snapshotPublication);
    }

    @Override
    public void onRoleChange(Cluster.Role newRole) {
        System.out.println("Role changed to: " + newRole);
        // LEADER, FOLLOWER, or CANDIDATE
    }
}`
        },
        {
          name: 'Snapshots & Recovery',
          diagram: SnapshotsDiagram,
          explanation: 'Periodic snapshots capture service state for fast recovery. New nodes bootstrap from snapshot + replay of recent log. Snapshot frequency balances recovery time vs I/O overhead. Timer-based snapshots triggered by cluster. Consistent snapshots across all services.',
          codeExample: `// Snapshot and Recovery Implementation
public class TradingClusterService implements ClusteredService {
    private final OrderBook orderBook = new OrderBook();
    private final PositionTracker positions = new PositionTracker();

    @Override
    public void onTakeSnapshot(ExclusivePublication snapshot) {
        // Serialize order book state
        UnsafeBuffer buffer = new UnsafeBuffer(new byte[1024 * 1024]);
        int offset = 0;

        // Write order book
        offset += orderBook.serialize(buffer, offset);

        // Write positions
        offset += positions.serialize(buffer, offset);

        // Publish snapshot
        while (snapshot.offer(buffer, 0, offset) < 0) {
            idle();
        }

        log.info("Snapshot taken: {} bytes", offset);
    }

    @Override
    public void onStart(Cluster cluster, Image snapshotImage) {
        if (snapshotImage != null) {
            // Restore from snapshot
            snapshotImage.poll((buffer, offset, length, header) -> {
                int readOffset = offset;

                // Restore order book
                readOffset += orderBook.deserialize(buffer, readOffset);

                // Restore positions
                positions.deserialize(buffer, readOffset);

                log.info("Restored from snapshot at position {}",
                    header.position());
            }, 1);
        }

        // After snapshot restore, cluster will replay any
        // messages received since snapshot was taken
    }
}`
        },
        {
          name: 'Client Interaction',
          diagram: ClientInteractionDiagram,
          explanation: 'Clients connect via Aeron Cluster client library. Ingress sends requests to cluster; egress receives responses. Automatic failover to new leader on leadership change. Session management handles reconnection. Backpressure propagated to clients.',
          codeExample: `// Aeron Cluster Client
public class TradingClusterClient {
    private AeronCluster aeronCluster;
    private final EgressListener egressListener;

    public void connect(String ingressEndpoints) {
        aeronCluster = AeronCluster.connect(
            new AeronCluster.Context()
                .egressListener(egressListener)
                .ingressChannel("aeron:udp")
                .ingressEndpoints(ingressEndpoints)  // "0=host1:9010,1=host2:9010,2=host3:9010"
                .egressChannel("aeron:udp?endpoint=localhost:0")
        );
    }

    public boolean sendOrder(Order order) {
        UnsafeBuffer buffer = new UnsafeBuffer(new byte[256]);
        int length = order.encode(buffer, 0);

        // Offer to cluster (routes to leader automatically)
        long result = aeronCluster.offer(buffer, 0, length);

        if (result > 0) {
            return true;
        } else if (result == Publication.NOT_CONNECTED) {
            log.warn("Cluster not connected, will retry after reconnect");
            return false;
        } else if (result == Publication.BACK_PRESSURED) {
            log.warn("Cluster back pressured");
            return false;
        }
        return false;
    }

    // Poll for responses
    public void pollResponses() {
        aeronCluster.pollEgress();
    }

    // Egress listener for responses
    private final EgressListener egressListener = new EgressListener() {
        @Override
        public void onMessage(long clusterSessionId, long timestamp,
                              DirectBuffer buffer, int offset, int length,
                              Header header) {
            // Handle response from cluster
            Response response = Response.decode(buffer, offset);
            responseHandler.handle(response);
        }

        @Override
        public void onNewLeader(long clusterSessionId, long leadershipTermId,
                                int leaderMemberId, String ingressEndpoints) {
            log.info("New leader elected: memberId={}", leaderMemberId);
        }
    };
}`
        }
      ]
    },
    {
      id: 'performance-tuning',
      name: 'Performance Tuning',
      icon: '🚀',
      color: '#ef4444',
      description: 'Optimizing Aeron for ultra-low latency trading applications',
      details: [
        {
          name: 'Latency Optimization',
          diagram: LatencyOptDiagram,
          explanation: 'Achieving sub-microsecond latencies requires careful tuning. Use busy-spin idle strategies (no sleeping). Pin threads to CPU cores to avoid context switches. Use huge pages for memory (2MB instead of 4KB). Disable transparent huge pages (THP) in Linux. Pre-touch memory to avoid page faults.',
          codeExample: `// Ultra-Low Latency Configuration
public class LowLatencySetup {

    public static MediaDriver createOptimizedDriver() {
        // JVM arguments for low latency:
        // -XX:+UseNUMA
        // -XX:+AlwaysPreTouch
        // -XX:-UseBiasedLocking
        // -XX:+UnlockExperimentalVMOptions
        // -XX:+UseEpsilonGC (or ZGC with -XX:+ZUncommit)

        return MediaDriver.launch(new MediaDriver.Context()
            .threadingMode(ThreadingMode.DEDICATED)
            .conductorIdleStrategy(new BusySpinIdleStrategy())
            .senderIdleStrategy(new NoOpIdleStrategy())
            .receiverIdleStrategy(new NoOpIdleStrategy())
            .termBufferSparseFile(false)
            .preTouchMappedMemory(true)
            .performStorageChecks(false)
        );
    }

    public static void pinThreadToCore(int coreId) {
        // Use Affinity library for thread pinning
        // Linux: taskset or cgroups
        AffinityLock lock = AffinityLock.acquireLock(coreId);
        // Thread now runs only on specified core
    }

    // Measure latency with nano-precision
    public static void measureLatency() {
        long[] latencies = new long[1_000_000];

        for (int i = 0; i < latencies.length; i++) {
            long start = System.nanoTime();
            // Perform operation
            publishAndReceive();
            latencies[i] = System.nanoTime() - start;
        }

        // Calculate percentiles
        Arrays.sort(latencies);
        System.out.println("50th: " + latencies[500_000] + " ns");
        System.out.println("99th: " + latencies[990_000] + " ns");
        System.out.println("99.9th: " + latencies[999_000] + " ns");
    }
}`
        },
        {
          name: 'Memory Management',
          diagram: MemoryMgmtDiagram,
          explanation: 'Avoid garbage collection during trading hours. Use object pooling and recycling. DirectBuffer for off-heap memory. Flyweight pattern for message encoding/decoding (SBE). Pre-allocate all buffers at startup. Monitor GC pauses with -Xlog:gc.',
          codeExample: `// Zero-GC Message Processing
import org.agrona.concurrent.UnsafeBuffer;
import uk.co.real_logic.sbe.*;

public class ZeroGCProcessor {
    // Pre-allocated encoder/decoder (flyweight pattern)
    private final OrderEncoder orderEncoder = new OrderEncoder();
    private final OrderDecoder orderDecoder = new OrderDecoder();

    // Pre-allocated buffer (reused)
    private final UnsafeBuffer buffer = new UnsafeBuffer(new byte[4096]);

    // Object pool for orders
    private final ObjectPool<Order> orderPool = new ObjectPool<>(
        Order::new, 10000);

    public void encodeOrder(Order order) {
        // Wrap buffer - no allocation
        orderEncoder.wrap(buffer, 0);

        // Encode fields directly into buffer
        orderEncoder
            .orderId(order.getOrderId())
            .symbol(order.getSymbol())
            .side(order.getSide())
            .quantity(order.getQuantity())
            .price(order.getPrice());
    }

    public Order decodeOrder(DirectBuffer buffer, int offset) {
        // Get order from pool - no allocation
        Order order = orderPool.acquire();

        // Wrap and decode
        orderDecoder.wrap(buffer, offset, OrderDecoder.BLOCK_LENGTH,
                         OrderDecoder.SCHEMA_VERSION);

        order.setOrderId(orderDecoder.orderId());
        order.setSymbol(orderDecoder.symbol());
        order.setSide(orderDecoder.side());
        order.setQuantity(orderDecoder.quantity());
        order.setPrice(orderDecoder.price());

        return order;
    }

    public void releaseOrder(Order order) {
        order.reset();
        orderPool.release(order);
    }
}`
        },
        {
          name: 'Network Tuning',
          diagram: NetworkTuningDiagram,
          explanation: 'Linux kernel tuning for network performance. Increase socket buffer sizes (rmem_max, wmem_max). Disable Nagle algorithm. Use kernel bypass (DPDK, ef_vi) for extreme latency. Consider InfiniBand or Solarflare NICs. CPU affinity for network interrupts.',
          codeExample: `// Linux Network Tuning for Low Latency

/* /etc/sysctl.conf settings */
// Increase socket buffer sizes
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.core.rmem_default = 16777216
net.core.wmem_default = 16777216

// Increase network backlog
net.core.netdev_max_backlog = 300000
net.core.somaxconn = 65535

// TCP tuning
net.ipv4.tcp_rmem = 4096 87380 134217728
net.ipv4.tcp_wmem = 4096 65536 134217728
net.ipv4.tcp_no_metrics_save = 1
net.ipv4.tcp_moderate_rcvbuf = 0

/* CPU affinity for network interrupts */
// Set IRQ affinity (run as script)
// echo 2 > /proc/irq/[IRQ_NUMBER]/smp_affinity
// This pins network interrupt to CPU 1

/* Java Application Settings */
// Aeron media driver with network optimization
MediaDriver.Context ctx = new MediaDriver.Context()
    // Socket buffer sizes
    .socketRcvbufLength(2 * 1024 * 1024)
    .socketSndbufLength(2 * 1024 * 1024)

    // Multicast TTL
    .socketMulticastTtl(4)

    // Loss detection
    .imageLivenessTimeoutNs(TimeUnit.SECONDS.toNanos(10))
    .publicationUnblockTimeoutNs(TimeUnit.SECONDS.toNanos(10))

    // Disable Nagle
    .socketTcpNoDelay(true);

/* For extreme low latency: Kernel bypass with Solarflare */
// Use ef_vi or DPDK for sub-microsecond latency
// Requires specialized NICs and drivers`
        }
      ]
    },
    {
      id: 'trading-patterns',
      name: 'Trading System Patterns',
      icon: '📊',
      color: '#8b5cf6',
      description: 'Common architecture patterns using Aeron for trading systems',
      details: [
        {
          name: 'Event Sourcing',
          diagram: EventSourcingDiagram,
          explanation: 'Aeron Archive enables event sourcing by persisting all messages. Replay events to rebuild state after restart. Point-in-time recovery by replaying to specific position. Audit trail for regulatory compliance. Enables time-travel debugging.',
          codeExample: `// Aeron Archive for Event Sourcing
import io.aeron.archive.client.AeronArchive;
import io.aeron.archive.client.RecordingDescriptorConsumer;

public class TradingEventStore {
    private final AeronArchive archive;

    public void startRecording(String channel, int streamId) {
        // Start recording all messages on channel
        long subscriptionId = archive.startRecording(
            channel, streamId, SourceLocation.LOCAL);

        System.out.println("Recording started: " + subscriptionId);
    }

    public void replayEvents(long recordingId,
                              long fromPosition,
                              FragmentHandler handler) {
        // Replay recorded messages
        try (Subscription replay = archive.replay(
                recordingId,
                fromPosition,
                Long.MAX_VALUE,  // Replay all
                "aeron:udp?endpoint=localhost:0",
                REPLAY_STREAM_ID)) {

            while (true) {
                int fragments = replay.poll(handler, 100);
                if (fragments == 0 && replay.isClosed()) {
                    break;  // Replay complete
                }
            }
        }
    }

    // Find recordings for a stream
    public List<RecordingDescriptor> findRecordings(int streamId) {
        List<RecordingDescriptor> recordings = new ArrayList<>();

        archive.listRecordingsForUri(
            0, Integer.MAX_VALUE,
            "aeron:udp",
            streamId,
            (controlSessionId, correlationId, recordingId,
             startTimestamp, stopTimestamp, startPosition, stopPosition,
             initialTermId, segmentFileLength, termBufferLength,
             mtuLength, sessionId, streamIdFound, strippedChannel,
             originalChannel, sourceIdentity) -> {
                recordings.add(new RecordingDescriptor(
                    recordingId, startTimestamp, stopTimestamp,
                    startPosition, stopPosition));
            });

        return recordings;
    }
}`
        },
        {
          name: 'Request-Response',
          diagram: ReqRespDiagram,
          explanation: 'Build RPC-style communication over Aeron. Client sends request with correlation ID. Server processes and responds with same correlation ID. Client matches response to pending request. Use dedicated streams for requests and responses.',
          codeExample: `// Request-Response Pattern over Aeron
public class AeronRpcClient {
    private final Publication requestPub;
    private final Subscription responseSub;
    private final Map<Long, CompletableFuture<Response>> pending = new ConcurrentHashMap<>();
    private final AtomicLong correlationId = new AtomicLong(0);

    public CompletableFuture<Response> sendRequest(Request request) {
        long corrId = correlationId.incrementAndGet();
        CompletableFuture<Response> future = new CompletableFuture<>();

        pending.put(corrId, future);

        // Encode request with correlation ID
        UnsafeBuffer buffer = new UnsafeBuffer(new byte[512]);
        buffer.putLong(0, corrId);
        int length = 8 + request.encode(buffer, 8);

        // Send request
        while (requestPub.offer(buffer, 0, length) < 0) {
            Thread.yield();
        }

        // Timeout handling
        future.orTimeout(5, TimeUnit.SECONDS)
            .whenComplete((r, e) -> pending.remove(corrId));

        return future;
    }

    // Poll for responses (run in separate thread)
    public void pollResponses() {
        responseSub.poll((buffer, offset, length, header) -> {
            long corrId = buffer.getLong(offset);
            Response response = Response.decode(buffer, offset + 8, length - 8);

            CompletableFuture<Response> future = pending.remove(corrId);
            if (future != null) {
                future.complete(response);
            }
        }, 10);
    }
}

// Server side
public class AeronRpcServer {
    private final FragmentHandler handler = (buffer, offset, length, header) -> {
        long corrId = buffer.getLong(offset);
        Request request = Request.decode(buffer, offset + 8, length - 8);

        Response response = processRequest(request);

        // Send response with same correlation ID
        UnsafeBuffer respBuffer = new UnsafeBuffer(new byte[512]);
        respBuffer.putLong(0, corrId);
        int respLength = 8 + response.encode(respBuffer, 8);

        responsePub.offer(respBuffer, 0, respLength);
    };
}`
        },
        {
          name: 'Market Data Distribution',
          diagram: MDDistributionDiagram,
          explanation: 'Multicast market data to multiple consumers. Single publisher, many subscribers. Gap detection and recovery for missed data. Conflation for slow consumers. Aeron handles reliable multicast automatically.',
          codeExample: `// Market Data Distribution via Multicast
public class MarketDataDistributor {
    private final Publication publication;
    private final QuoteEncoder encoder = new QuoteEncoder();
    private final UnsafeBuffer buffer = new UnsafeBuffer(new byte[128]);

    public MarketDataDistributor() {
        // Multicast channel for market data
        String channel = "aeron:udp?endpoint=224.0.1.1:40456" +
            "|interface=192.168.1.1" +
            "|ttl=4";

        publication = aeron.addPublication(channel, MARKET_DATA_STREAM);
    }

    public void publishQuote(Quote quote) {
        encoder.wrap(buffer, 0)
            .symbolId(quote.getSymbolId())
            .bid(quote.getBidAsLong())
            .ask(quote.getAskAsLong())
            .bidSize(quote.getBidSize())
            .askSize(quote.getAskSize())
            .timestamp(System.nanoTime());

        int length = encoder.encodedLength();

        // Offer with back-pressure handling
        long result = publication.offer(buffer, 0, length);
        if (result < 0) {
            handleBackPressure(result, quote);
        }
    }
}

// Market Data Consumer with Gap Detection
public class MarketDataConsumer {
    private final Map<Integer, Long> lastSeqBySymbol = new ConcurrentHashMap<>();

    private final FragmentHandler handler = (buffer, offset, length, header) -> {
        QuoteDecoder decoder = new QuoteDecoder();
        decoder.wrap(buffer, offset);

        int symbolId = decoder.symbolId();
        long timestamp = decoder.timestamp();

        // Check for gaps
        Long lastTimestamp = lastSeqBySymbol.get(symbolId);
        if (lastTimestamp != null && timestamp < lastTimestamp) {
            log.warn("Out of order quote for symbol {}", symbolId);
            return;  // Discard stale quote
        }

        lastSeqBySymbol.put(symbolId, timestamp);

        Quote quote = new Quote(
            symbolId,
            decoder.bid(),
            decoder.ask(),
            decoder.bidSize(),
            decoder.askSize()
        );

        quoteHandler.onQuote(quote);
    };
}`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  const handlePreviousConcept = useCallback(() => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }, [selectedConceptIndex])

  const handleNextConcept = useCallback(() => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }, [selectedConceptIndex, concepts.length])

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'eTrading', icon: '📈', page: 'eTrading' },
      { name: 'Aeron Messaging', icon: '⚡', page: 'Aeron Messaging' }
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
  }, [selectedConcept, selectedConceptIndex, onBack, handlePreviousConcept, handleNextConcept])

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #7c2d12 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #fb923c, #f97316)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(249, 115, 22, 0.2)',
    border: '1px solid rgba(249, 115, 22, 0.3)',
    borderRadius: '0.5rem',
    color: '#fb923c',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Aeron Messaging</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(249, 115, 22, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(249, 115, 22, 0.2)'
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
          onMainMenu={breadcrumb?.onMainMenu || onBack}
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
        primaryColor={ETRADING_COLORS.primary}
      />


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
              onMainMenu={breadcrumb?.onMainMenu || onBack}
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

export default AeronMessaging

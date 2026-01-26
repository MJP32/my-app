/**
 * WhatsApp System Design - Tab Template Format
 *
 * A comprehensive system design page for building a messaging platform like WhatsApp
 * with real-time messaging, end-to-end encryption, group chats, and media sharing.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#25d366',
  primaryHover: '#34eb77',
  bg: 'rgba(37, 211, 102, 0.1)',
  border: 'rgba(37, 211, 102, 0.3)',
  arrow: '#25d366',
  hoverBg: 'rgba(37, 211, 102, 0.2)',
  topicBg: 'rgba(37, 211, 102, 0.2)'
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
// SVG GRADIENT DEFINITIONS
// =============================================================================

const SvgDefs = () => (
  <defs>
    <linearGradient id="whatsappGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#25d366" />
      <stop offset="100%" stopColor="#128c7e" />
    </linearGradient>
    <linearGradient id="darkGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#128c7e" />
      <stop offset="100%" stopColor="#075e54" />
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#8b5cf6" />
      <stop offset="100%" stopColor="#6366f1" />
    </linearGradient>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#3b82f6" />
      <stop offset="100%" stopColor="#1d4ed8" />
    </linearGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#f97316" />
      <stop offset="100%" stopColor="#ea580c" />
    </linearGradient>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ef4444" />
      <stop offset="100%" stopColor="#dc2626" />
    </linearGradient>
    <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ec4899" />
      <stop offset="100%" stopColor="#db2777" />
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#06b6d4" />
      <stop offset="100%" stopColor="#0891b2" />
    </linearGradient>
    <linearGradient id="grayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#475569" />
      <stop offset="100%" stopColor="#334155" />
    </linearGradient>
    <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#25d366" />
    </marker>
    <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
    </marker>
    <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#f97316" />
    </marker>
    <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6" />
    </marker>
    <marker id="arrowPink" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#ec4899" />
    </marker>
    <marker id="arrowWhite" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#ffffff" />
    </marker>
  </defs>
)

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const MessagingArchitectureDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <SvgDefs />
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      WhatsApp High-Level Architecture
    </text>

    {/* Clients */}
    <rect x="50" y="60" width="80" height="40" rx="6" fill="url(#whatsappGreen)" />
    <text x="90" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">iOS</text>

    <rect x="150" y="60" width="80" height="40" rx="6" fill="url(#whatsappGreen)" />
    <text x="190" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Android</text>

    <rect x="250" y="60" width="80" height="40" rx="6" fill="url(#whatsappGreen)" />
    <text x="290" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Web</text>

    {/* Gateway */}
    <rect x="300" y="130" width="200" height="40" rx="6" fill="url(#purpleGrad)" />
    <text x="400" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">WebSocket Gateway (6000+ servers)</text>

    {/* Services */}
    <rect x="100" y="200" width="100" height="35" rx="6" fill="url(#darkGreen)" />
    <text x="150" y="222" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Message Service</text>

    <rect x="220" y="200" width="100" height="35" rx="6" fill="url(#orangeGrad)" />
    <text x="270" y="222" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Group Service</text>

    <rect x="340" y="200" width="100" height="35" rx="6" fill="url(#pinkGrad)" />
    <text x="390" y="222" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Presence</text>

    <rect x="460" y="200" width="100" height="35" rx="6" fill="url(#redGrad)" />
    <text x="510" y="222" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Media Service</text>

    <rect x="580" y="200" width="100" height="35" rx="6" fill="url(#cyanGrad)" />
    <text x="630" y="222" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Notifications</text>

    {/* Storage */}
    <rect x="550" y="60" width="80" height="40" rx="6" fill="url(#grayGrad)" />
    <text x="590" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Cassandra</text>

    <rect x="650" y="60" width="80" height="40" rx="6" fill="url(#cyanGrad)" />
    <text x="690" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Redis</text>

    {/* Arrows */}
    <line x1="190" y1="100" x2="350" y2="130" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <line x1="400" y1="170" x2="400" y2="195" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" />
    <line x1="510" y1="200" x2="590" y2="105" stroke="#64748b" strokeWidth="1.5" />
  </svg>
)

const MessageFlowDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <SvgDefs />
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Message Delivery Flow
    </text>

    {/* Sender */}
    <rect x="30" y="70" width="80" height="60" rx="8" fill="url(#whatsappGreen)" />
    <text x="70" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Sender</text>
    <text x="70" y="115" textAnchor="middle" fill="white" fontSize="8">Encrypt</text>

    {/* Gateway */}
    <rect x="160" y="70" width="100" height="60" rx="8" fill="url(#purpleGrad)" />
    <text x="210" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Gateway</text>

    {/* Message Service */}
    <rect x="310" y="70" width="100" height="60" rx="8" fill="url(#darkGreen)" />
    <text x="360" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Message</text>
    <text x="360" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Service</text>

    {/* Redis Check */}
    <rect x="460" y="70" width="80" height="60" rx="8" fill="url(#cyanGrad)" />
    <text x="500" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Redis</text>
    <text x="500" y="110" textAnchor="middle" fill="white" fontSize="8">Online?</text>

    {/* Receiver Online */}
    <rect x="590" y="50" width="80" height="50" rx="8" fill="url(#whatsappGreen)" />
    <text x="630" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Receiver</text>
    <text x="630" y="90" textAnchor="middle" fill="white" fontSize="8">Online</text>

    {/* Receiver Offline */}
    <rect x="590" y="120" width="80" height="50" rx="8" fill="url(#orangeGrad)" />
    <text x="630" y="145" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Queue</text>
    <text x="630" y="160" textAnchor="middle" fill="white" fontSize="8">+ Push</text>

    {/* Arrows */}
    <line x1="110" y1="100" x2="155" y2="100" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <line x1="260" y1="100" x2="305" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" />
    <line x1="410" y1="100" x2="455" y2="100" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <line x1="540" y1="85" x2="585" y2="75" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <line x1="540" y1="115" x2="585" y2="140" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowOrange)" />
  </svg>
)

const WebSocketDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <SvgDefs />
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      WebSocket Real-time Connection
    </text>

    {/* Client */}
    <rect x="50" y="60" width="100" height="80" rx="8" fill="url(#whatsappGreen)" />
    <text x="100" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Client</text>
    <text x="100" y="110" textAnchor="middle" fill="white" fontSize="9">Persistent</text>
    <text x="100" y="125" textAnchor="middle" fill="white" fontSize="9">Connection</text>

    {/* Bidirectional arrows */}
    <line x1="150" y1="90" x2="280" y2="90" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <line x1="280" y1="110" x2="150" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />
    <text x="215" y="80" textAnchor="middle" fill="#25d366" fontSize="9">Send Message</text>
    <text x="215" y="130" textAnchor="middle" fill="#3b82f6" fontSize="9">Receive Push</text>

    {/* Gateway */}
    <rect x="280" y="60" width="140" height="80" rx="8" fill="url(#purpleGrad)" />
    <text x="350" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">WebSocket</text>
    <text x="350" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Gateway</text>
    <text x="350" y="130" textAnchor="middle" fill="white" fontSize="9">50K connections/server</text>

    {/* Heartbeat */}
    <rect x="480" y="60" width="120" height="80" rx="8" fill="url(#pinkGrad)" />
    <text x="540" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Heartbeat</text>
    <text x="540" y="110" textAnchor="middle" fill="white" fontSize="9">Every 30s</text>
    <text x="540" y="125" textAnchor="middle" fill="white" fontSize="9">TTL: 60s</text>

    {/* Redis */}
    <rect x="660" y="60" width="100" height="80" rx="8" fill="url(#cyanGrad)" />
    <text x="710" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Redis</text>
    <text x="710" y="115" textAnchor="middle" fill="white" fontSize="9">Presence</text>

    <line x1="420" y1="100" x2="475" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" />
    <line x1="600" y1="100" x2="655" y2="100" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowPink)" />
  </svg>
)

const EncryptionDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <SvgDefs />
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Signal Protocol: End-to-End Encryption
    </text>

    {/* User A */}
    <rect x="30" y="50" width="120" height="130" rx="8" fill="#0f172a" stroke="#25d366" strokeWidth="2" />
    <text x="90" y="75" textAnchor="middle" fill="#25d366" fontSize="11" fontWeight="bold">User A (Sender)</text>
    <rect x="45" y="90" width="90" height="30" rx="4" fill="url(#darkGreen)" />
    <text x="90" y="110" textAnchor="middle" fill="white" fontSize="9">Identity Key</text>
    <rect x="45" y="130" width="90" height="30" rx="4" fill="url(#whatsappGreen)" />
    <text x="90" y="150" textAnchor="middle" fill="white" fontSize="9">Encrypt</text>

    {/* Server */}
    <rect x="320" y="50" width="160" height="130" rx="8" fill="url(#grayGrad)" />
    <text x="400" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">WhatsApp Server</text>
    <rect x="345" y="100" width="110" height="40" rx="4" fill="#1e293b" />
    <text x="400" y="125" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Cannot Read</text>
    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="9">***encrypted***</text>

    {/* User B */}
    <rect x="650" y="50" width="120" height="130" rx="8" fill="#0f172a" stroke="#25d366" strokeWidth="2" />
    <text x="710" y="75" textAnchor="middle" fill="#25d366" fontSize="11" fontWeight="bold">User B (Receiver)</text>
    <rect x="665" y="90" width="90" height="30" rx="4" fill="url(#darkGreen)" />
    <text x="710" y="110" textAnchor="middle" fill="white" fontSize="9">Identity Key</text>
    <rect x="665" y="130" width="90" height="30" rx="4" fill="url(#whatsappGreen)" />
    <text x="710" y="150" textAnchor="middle" fill="white" fontSize="9">Decrypt</text>

    {/* Arrows */}
    <line x1="150" y1="115" x2="315" y2="115" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <line x1="480" y1="115" x2="645" y2="115" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <text x="230" y="105" textAnchor="middle" fill="#25d366" fontSize="9">Encrypted</text>
    <text x="560" y="105" textAnchor="middle" fill="#25d366" fontSize="9">Encrypted</text>
  </svg>
)

const DoubleRatchetDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <SvgDefs />
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Double Ratchet Algorithm - Perfect Forward Secrecy
    </text>

    <rect x="50" y="50" width="700" height="110" rx="8" fill="#0f172a" stroke="#25d366" strokeWidth="2" />

    {/* Message Keys */}
    <rect x="80" y="70" width="80" height="35" rx="4" fill="url(#blueGrad)" />
    <text x="120" y="92" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Msg Key 1</text>

    <rect x="200" y="70" width="80" height="35" rx="4" fill="url(#blueGrad)" />
    <text x="240" y="92" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Msg Key 2</text>

    <rect x="320" y="70" width="80" height="35" rx="4" fill="url(#blueGrad)" />
    <text x="360" y="92" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Msg Key 3</text>

    <rect x="440" y="70" width="80" height="35" rx="4" fill="url(#purpleGrad)" />
    <text x="480" y="92" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Ratchet</text>

    <rect x="560" y="70" width="80" height="35" rx="4" fill="url(#whatsappGreen)" />
    <text x="600" y="92" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Msg Key 4</text>

    <rect x="680" y="70" width="60" height="35" rx="4" fill="url(#whatsappGreen)" />
    <text x="710" y="92" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">...</text>

    {/* Arrows */}
    <line x1="160" y1="87" x2="195" y2="87" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <line x1="280" y1="87" x2="315" y2="87" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <line x1="400" y1="87" x2="435" y2="87" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" />
    <line x1="520" y1="87" x2="555" y2="87" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <line x1="640" y1="87" x2="675" y2="87" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowGreen)" />

    <text x="400" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">
      Each message uses a unique key - compromising one key doesn't affect others
    </text>
  </svg>
)

const CassandraStorageDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <SvgDefs />
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Cassandra Message Storage - Horizontal Scaling
    </text>

    {/* Partition explanation */}
    <rect x="50" y="50" width="200" height="100" rx="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
    <text x="150" y="75" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Partition Key: user_id</text>
    <text x="150" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">All messages for user</text>
    <text x="150" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">on same node</text>
    <text x="150" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Clustering: timestamp</text>

    {/* Nodes */}
    <rect x="300" y="50" width="80" height="45" rx="6" fill="url(#grayGrad)" />
    <text x="340" y="77" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Node 1</text>

    <rect x="400" y="50" width="80" height="45" rx="6" fill="url(#grayGrad)" />
    <text x="440" y="77" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Node 2</text>

    <rect x="500" y="50" width="80" height="45" rx="6" fill="url(#grayGrad)" />
    <text x="540" y="77" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Node 3</text>

    <rect x="600" y="50" width="80" height="45" rx="6" fill="url(#grayGrad)" />
    <text x="640" y="77" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Node N</text>

    <text x="570" y="75" textAnchor="middle" fill="#64748b" fontSize="14">...</text>

    {/* Replication */}
    <rect x="300" y="120" width="380" height="60" rx="8" fill="#0f172a" stroke="#25d366" strokeWidth="2" />
    <text x="490" y="145" textAnchor="middle" fill="#25d366" fontSize="11" fontWeight="bold">Replication Factor = 3 | Consistency: QUORUM</text>
    <text x="490" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">Data replicated across 3 nodes for fault tolerance</text>

    {/* Stats */}
    <rect x="700" y="80" width="90" height="80" rx="6" fill="url(#whatsappGreen)" />
    <text x="745" y="105" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">100B msgs</text>
    <text x="745" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">/day</text>
    <text x="745" y="145" textAnchor="middle" fill="white" fontSize="8">1000+ nodes</text>
  </svg>
)

const GroupChatDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <SvgDefs />
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Group Message Fan-out (Write Amplification)
    </text>

    {/* Sender */}
    <rect x="30" y="70" width="80" height="80" rx="8" fill="url(#whatsappGreen)" />
    <text x="70" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Sender</text>
    <text x="70" y="120" textAnchor="middle" fill="white" fontSize="8">1 Message</text>
    <text x="70" y="135" textAnchor="middle" fill="white" fontSize="8">Sender Key</text>

    {/* Group Service */}
    <rect x="160" y="70" width="120" height="80" rx="8" fill="url(#orangeGrad)" />
    <text x="220" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Group Service</text>
    <text x="220" y="115" textAnchor="middle" fill="white" fontSize="8">Validate member</text>
    <text x="220" y="130" textAnchor="middle" fill="white" fontSize="8">Fan-out to N</text>

    {/* Kafka */}
    <rect x="330" y="80" width="100" height="60" rx="8" fill="url(#redGrad)" />
    <text x="380" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Kafka</text>
    <text x="380" y="125" textAnchor="middle" fill="white" fontSize="8">Async queue</text>

    {/* Members */}
    <rect x="480" y="50" width="70" height="35" rx="6" fill="#0f172a" stroke="#25d366" strokeWidth="2" />
    <text x="515" y="72" textAnchor="middle" fill="#25d366" fontSize="9">Member B</text>

    <rect x="480" y="95" width="70" height="35" rx="6" fill="#0f172a" stroke="#25d366" strokeWidth="2" />
    <text x="515" y="117" textAnchor="middle" fill="#25d366" fontSize="9">Member C</text>

    <rect x="480" y="140" width="70" height="35" rx="6" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
    <text x="515" y="162" textAnchor="middle" fill="#64748b" fontSize="9">Member D</text>

    {/* Read Receipts */}
    <rect x="600" y="70" width="90" height="80" rx="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
    <text x="645" y="95" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Receipts</text>
    <text x="645" y="115" textAnchor="middle" fill="#25d366" fontSize="8">B: Read</text>
    <text x="645" y="130" textAnchor="middle" fill="#25d366" fontSize="8">C: Delivered</text>
    <text x="645" y="145" textAnchor="middle" fill="#64748b" fontSize="8">D: Pending</text>

    {/* Arrows */}
    <line x1="110" y1="110" x2="155" y2="110" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <line x1="280" y1="110" x2="325" y2="110" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowOrange)" />
    <line x1="430" y1="95" x2="475" y2="70" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />
    <line x1="430" y1="110" x2="475" y2="110" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />
    <line x1="430" y1="125" x2="475" y2="155" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />
    <line x1="550" y1="100" x2="595" y2="100" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" />

    <text x="720" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Max 256</text>
    <text x="720" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">members</text>
  </svg>
)

const PresenceSystemDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <SvgDefs />
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Presence System - Online Status & Last Seen
    </text>

    {/* Online User */}
    <rect x="50" y="50" width="100" height="80" rx="8" fill="#0f172a" stroke="#25d366" strokeWidth="2" />
    <circle cx="100" cy="80" r="15" fill="url(#whatsappGreen)" />
    <text x="100" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
    <circle cx="120" cy="90" r="6" fill="#25d366" />
    <text x="100" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Online</text>

    {/* Heartbeat */}
    <line x1="150" y1="90" x2="230" y2="90" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <text x="190" y="80" textAnchor="middle" fill="#25d366" fontSize="9">Heartbeat 30s</text>

    {/* Presence Service */}
    <rect x="235" y="50" width="120" height="80" rx="8" fill="url(#pinkGrad)" />
    <text x="295" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Presence</text>
    <text x="295" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Service</text>
    <text x="295" y="115" textAnchor="middle" fill="white" fontSize="8">Update Redis</text>

    {/* Redis */}
    <rect x="410" y="50" width="150" height="80" rx="8" fill="url(#cyanGrad)" />
    <text x="485" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Redis Cluster</text>
    <rect x="425" y="85" width="120" height="35" rx="4" fill="#0891b2" />
    <text x="485" y="102" textAnchor="middle" fill="white" fontSize="8">user:123:presence</text>
    <text x="485" y="115" textAnchor="middle" fill="white" fontSize="7">TTL: 60s</text>

    {/* Offline User */}
    <rect x="620" y="50" width="100" height="80" rx="8" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
    <circle cx="670" cy="80" r="15" fill="#64748b" />
    <text x="670" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
    <text x="670" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Offline</text>

    {/* Arrow */}
    <line x1="355" y1="90" x2="405" y2="90" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowPink)" />

    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="10">
      300M concurrent users tracked in Redis Cluster
    </text>
  </svg>
)

const ScalingDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <SvgDefs />
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      WhatsApp Scale & Infrastructure
    </text>

    {/* Scale numbers */}
    <rect x="50" y="50" width="140" height="70" rx="8" fill="url(#whatsappGreen)" />
    <text x="120" y="75" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">2B</text>
    <text x="120" y="95" textAnchor="middle" fill="white" fontSize="10">Users</text>
    <text x="120" y="110" textAnchor="middle" fill="white" fontSize="8">600M DAU</text>

    <rect x="210" y="50" width="140" height="70" rx="8" fill="url(#blueGrad)" />
    <text x="280" y="75" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">100B</text>
    <text x="280" y="95" textAnchor="middle" fill="white" fontSize="10">Messages/Day</text>
    <text x="280" y="110" textAnchor="middle" fill="white" fontSize="8">1.2M QPS</text>

    <rect x="370" y="50" width="140" height="70" rx="8" fill="url(#purpleGrad)" />
    <text x="440" y="75" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">300M</text>
    <text x="440" y="95" textAnchor="middle" fill="white" fontSize="10">Concurrent</text>
    <text x="440" y="110" textAnchor="middle" fill="white" fontSize="8">Connections</text>

    <rect x="530" y="50" width="140" height="70" rx="8" fill="url(#orangeGrad)" />
    <text x="600" y="75" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">6000+</text>
    <text x="600" y="95" textAnchor="middle" fill="white" fontSize="10">WS Servers</text>
    <text x="600" y="110" textAnchor="middle" fill="white" fontSize="8">50K conn/server</text>

    <rect x="690" y="50" width="90" height="70" rx="8" fill="url(#cyanGrad)" />
    <text x="735" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">500TB</text>
    <text x="735" y="95" textAnchor="middle" fill="white" fontSize="10">Media/Day</text>

    {/* Infrastructure */}
    <rect x="50" y="140" width="720" height="45" rx="8" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
    <text x="120" y="167" textAnchor="middle" fill="#94a3b8" fontSize="9">Multi-cloud (AWS + GCP)</text>
    <text x="280" y="167" textAnchor="middle" fill="#94a3b8" fontSize="9">Kubernetes + Istio</text>
    <text x="440" y="167" textAnchor="middle" fill="#94a3b8" fontSize="9">20 Global Regions</text>
    <text x="600" y="167" textAnchor="middle" fill="#94a3b8" fontSize="9">Erlang/Go/Node.js</text>
  </svg>
)

const MediaServiceDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <SvgDefs />
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Media Upload & CDN Delivery
    </text>

    {/* Client */}
    <rect x="50" y="60" width="100" height="60" rx="8" fill="url(#whatsappGreen)" />
    <text x="100" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Client</text>
    <text x="100" y="100" textAnchor="middle" fill="white" fontSize="8">Encrypt locally</text>

    {/* Media Service */}
    <rect x="200" y="60" width="100" height="60" rx="8" fill="url(#redGrad)" />
    <text x="250" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Media</text>
    <text x="250" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Service</text>

    {/* S3 */}
    <rect x="350" y="60" width="100" height="60" rx="8" fill="url(#orangeGrad)" />
    <text x="400" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S3</text>
    <text x="400" y="100" textAnchor="middle" fill="white" fontSize="8">Presigned URL</text>

    {/* Lambda */}
    <rect x="500" y="60" width="100" height="60" rx="8" fill="url(#purpleGrad)" />
    <text x="550" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Lambda</text>
    <text x="550" y="100" textAnchor="middle" fill="white" fontSize="8">Thumbnails</text>

    {/* CDN */}
    <rect x="650" y="60" width="100" height="60" rx="8" fill="url(#blueGrad)" />
    <text x="700" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CloudFront</text>
    <text x="700" y="100" textAnchor="middle" fill="white" fontSize="8">95% cache hit</text>

    {/* Arrows */}
    <line x1="150" y1="90" x2="195" y2="90" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    <line x1="300" y1="90" x2="345" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowOrange)" />
    <line x1="450" y1="90" x2="495" y2="90" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowOrange)" />
    <line x1="600" y1="90" x2="645" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" />

    <text x="400" y="150" textAnchor="middle" fill="#64748b" fontSize="10">
      500TB/day media upload | AES-256 encryption | Lifecycle to Glacier after 90 days
    </text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function WhatsApp({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'messaging-architecture',
      name: 'Messaging Architecture',
      icon: '🏗️',
      color: '#25d366',
      description: 'High-level system architecture for handling billions of messages daily with microservices, WebSocket gateways, and distributed storage.',
      diagram: MessagingArchitectureDiagram,
      details: [
        {
          name: 'System Overview',
          diagram: MessagingArchitectureDiagram,
          explanation: 'WhatsApp architecture consists of multiple layers: Client Layer (iOS, Android, Web, Desktop), Gateway Layer (6000+ WebSocket servers handling 50K connections each), Service Layer (Message, Group, Media, Presence, Notification services), and Data Layer (Cassandra for messages, PostgreSQL for users, Redis for caching, S3 for media). The system handles 2 billion users, 100 billion messages/day, and maintains 300 million concurrent connections.',
          codeExample: `// WhatsApp Scale Estimates
Daily Active Users (DAU): 600 million
Total Messages/Day: ~100 billion
Messages/Second (QPS): ~1.2 million
Peak Traffic: ~4 million QPS
Concurrent Connections: ~300 million
WebSocket Servers: ~6,000
Connections per Server: ~50,000

// Storage Requirements
Message Size: ~100 bytes average
Daily Message Storage: ~10 TB
Media per Day: ~1 billion files
Daily Media Storage: ~500 TB
5-Year Storage: ~18 PB messages

// Bandwidth
Message Traffic: ~120 MB/s
Media Upload: ~6 GB/s
Media Download: ~60 GB/s
Total: ~530 Gbps (peak ~2 Tbps)`
        },
        {
          name: 'Message Routing',
          diagram: MessageFlowDiagram,
          explanation: 'Messages flow through the system in a specific path: (1) Sender encrypts message with Signal Protocol, (2) Message sent via persistent WebSocket to Gateway, (3) Gateway routes to Message Service, (4) Message Service stores encrypted blob in Cassandra, (5) Presence check in Redis to determine if recipient is online, (6) If online: push via WebSocket to recipient, (7) If offline: queue message and send push notification via FCM/APNS, (8) Delivery receipts sent back to sender (sent, delivered, read).',
          codeExample: `// Message Delivery Flow
class MessageService {
    public void handleMessage(Message msg) {
        // 1. Validate message (already E2E encrypted by client)
        validateMessage(msg);

        // 2. Store in Cassandra (encrypted blob)
        cassandra.write(msg.recipientId, msg);

        // 3. Check recipient presence
        boolean online = redis.get("presence:" + msg.recipientId);

        if (online) {
            // 4a. Get WebSocket server for recipient
            String serverId = redis.get("ws:" + msg.recipientId);
            // Push via internal message bus
            kafka.send("delivery-" + serverId, msg);
        } else {
            // 4b. Queue for later + push notification
            offlineQueue.add(msg.recipientId, msg);
            notificationService.send(msg.recipientId,
                "New message from " + msg.senderName);
        }

        // 5. Send delivery receipt to sender
        sendReceipt(msg.senderId, msg.id, "SENT");
    }
}`
        },
        {
          name: 'Service Layer',
          explanation: 'The service layer consists of specialized microservices: (1) Message Service - routes messages, handles delivery receipts, manages offline queues, (2) Group Chat Service - fan-out on write, member management, sender key distribution, (3) Media Service - upload/download, compression, thumbnail generation, CDN integration, (4) Presence Service - online/offline status, last seen, typing indicators, (5) Auth Service - phone verification, session management, key storage, (6) Notification Service - FCM/APNS push, batching, quiet hours.',
          codeExample: `// Service Layer Configuration
services:
  message-service:
    instances: 500
    language: Go
    scaling: message-queue-depth > 10K

  group-service:
    instances: 200
    language: Go
    scaling: cpu > 70%

  media-service:
    instances: 300
    language: Node.js
    scaling: upload-qps > 50K

  presence-service:
    instances: 100
    language: Erlang
    scaling: heartbeat-qps > 1M

  auth-service:
    instances: 50
    language: Go
    scaling: auth-requests > 10K/s

  notification-service:
    instances: 100
    language: Node.js
    scaling: notification-queue > 100K`
        }
      ]
    },
    {
      id: 'realtime-communication',
      name: 'Real-time Communication',
      icon: '⚡',
      color: '#8b5cf6',
      description: 'WebSocket connections for instant message delivery with sub-100ms latency, heartbeat protocol, and connection management at scale.',
      diagram: WebSocketDiagram,
      details: [
        {
          name: 'WebSocket Gateway',
          diagram: WebSocketDiagram,
          explanation: 'WhatsApp uses persistent WebSocket connections for real-time bidirectional communication. Each Gateway server handles ~50,000 concurrent connections (300M users = 6,000 servers). Connection lifecycle: (1) Client sends WebSocket upgrade request, (2) Load balancer routes based on consistent hashing, (3) Auth Service validates JWT, (4) Connection established and stored in Redis (user_id -> server_id). Messages flow bidirectionally without polling overhead.',
          codeExample: `// WebSocket Gateway - Erlang/OTP
-module(ws_gateway).
-behaviour(cowboy_websocket).

init(Req, State) ->
    %% Authenticate JWT token
    Token = cowboy_req:header(<<"authorization">>, Req),
    case auth_service:validate(Token) of
        {ok, UserId} ->
            %% Register in Redis
            redis:set(<<"ws:", UserId/binary>>, node()),
            redis:set(<<"presence:", UserId/binary>>, <<"online">>),
            {cowboy_websocket, Req, #{user_id => UserId}};
        error ->
            {stop, Req, State}
    end.

websocket_handle({text, Msg}, State) ->
    %% Route message to Message Service
    DecodedMsg = jsx:decode(Msg),
    message_service:handle(DecodedMsg),
    {ok, State}.

websocket_info({push, Msg}, State) ->
    %% Push message to client
    {reply, {text, jsx:encode(Msg)}, State}.

terminate(_Reason, _Req, #{user_id := UserId}) ->
    %% Cleanup on disconnect
    redis:del(<<"ws:", UserId/binary>>),
    redis:expire(<<"presence:", UserId/binary>>, 60).`
        },
        {
          name: 'Heartbeat Protocol',
          explanation: 'Heartbeat mechanism maintains connection health and presence: (1) Client sends ping every 30 seconds, (2) Server responds with pong, (3) Server updates presence in Redis with 60s TTL, (4) If no heartbeat received: connection considered dead after TTL expires, (5) Presence marked offline, queued messages sent via push notification. This approach scales to 300M concurrent users with ~10M heartbeats/second.',
          codeExample: `// Heartbeat Protocol
class HeartbeatManager {
    private static final int PING_INTERVAL = 30_000; // 30 seconds
    private static final int PRESENCE_TTL = 60; // 60 seconds

    public void onPing(String userId) {
        // Update presence TTL in Redis
        redis.setex("presence:" + userId, PRESENCE_TTL, "online");
        redis.setex("lastSeen:" + userId, PRESENCE_TTL,
            System.currentTimeMillis());

        // Send pong
        webSocket.send(userId, new Pong());
    }

    public void onConnectionLost(String userId) {
        // TTL will auto-expire, triggering offline status
        // Any new messages will be queued
        log.info("Connection lost for user: " + userId);
    }

    public PresenceStatus getPresence(String userId) {
        String status = redis.get("presence:" + userId);
        if (status == null) {
            // User is offline, return last seen
            Long lastSeen = redis.get("lastSeen:" + userId);
            return new PresenceStatus(false, lastSeen);
        }
        return new PresenceStatus(true, null);
    }
}

// Redis Memory for Presence
// 300M users * 50 bytes = ~15 GB
// Distributed across Redis Cluster nodes`
        },
        {
          name: 'Connection Scaling',
          diagram: ScalingDiagram,
          explanation: 'Scaling WebSocket connections requires careful architecture: (1) Consistent hashing routes users to same server for session affinity, (2) Connection registry in Redis maps user_id to server_id, (3) Cross-server communication via internal message bus (Kafka/RabbitMQ), (4) Graceful shutdown: drain connections before scaling down, (5) Auto-scaling on CPU > 70% or connections > 45K, (6) Each server: 16-core, 64GB RAM, handles 50K connections (~5KB per connection).',
          codeExample: `// Connection Load Balancer Configuration
upstream websocket_gateway {
    # Consistent hashing based on user_id
    hash $arg_user_id consistent;

    server gateway-1.whatsapp.com:443;
    server gateway-2.whatsapp.com:443;
    # ... 6000 servers

    keepalive 10000;  # Connection pool
}

// Kubernetes Auto-scaling
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  scaleTargetRef:
    name: websocket-gateway
  minReplicas: 1000
  maxReplicas: 10000
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        averageUtilization: 70
  - type: External
    external:
      metric:
        name: connections_per_pod
      target:
        averageValue: 45000
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60`
        }
      ]
    },
    {
      id: 'e2e-encryption',
      name: 'End-to-End Encryption',
      icon: '🔐',
      color: '#ef4444',
      description: 'Signal Protocol implementation with Perfect Forward Secrecy, Double Ratchet Algorithm, and key management for maximum privacy.',
      diagram: EncryptionDiagram,
      details: [
        {
          name: 'Signal Protocol',
          diagram: EncryptionDiagram,
          explanation: 'WhatsApp uses the Signal Protocol for end-to-end encryption. Key components: (1) Identity Key Pair - long-term public/private keys for each user, (2) Prekeys Bundle - 100 one-time keys uploaded to server for first contact, (3) Session Key - derived from Diffie-Hellman key exchange, (4) Message Key - unique ephemeral key per message. Server stores only encrypted blobs and cannot decrypt content - only recipient with private key can decrypt.',
          codeExample: `// Signal Protocol Key Exchange (Simplified)
class SignalProtocol {
    // Initial key exchange (X3DH - Extended Triple Diffie-Hellman)
    public Session createSession(String recipientId) {
        // 1. Fetch recipient's prekey bundle from server
        PrekeyBundle bundle = server.getPrekeyBundle(recipientId);

        // 2. Compute shared secret using DH
        // SK = DH(IK_A, SPK_B) || DH(EK_A, IK_B) ||
        //      DH(EK_A, SPK_B) || DH(EK_A, OPK_B)
        byte[] sharedSecret = computeSharedSecret(
            myIdentityKey,
            myEphemeralKey,
            bundle.identityKey,
            bundle.signedPrekey,
            bundle.oneTimePrekey
        );

        // 3. Derive root key and chain key
        byte[] rootKey = HKDF.derive(sharedSecret, "root");
        byte[] chainKey = HKDF.derive(sharedSecret, "chain");

        return new Session(recipientId, rootKey, chainKey);
    }

    // Encrypt message with current chain key
    public byte[] encrypt(Session session, String plaintext) {
        // Derive message key from chain key
        byte[] messageKey = session.deriveMessageKey();

        // Encrypt with AES-256-CBC
        return AES.encrypt(plaintext, messageKey);
    }
}`
        },
        {
          name: 'Double Ratchet',
          diagram: DoubleRatchetDiagram,
          explanation: 'The Double Ratchet Algorithm provides Perfect Forward Secrecy (PFS): (1) DH Ratchet - derives new shared secret when sender/receiver switch, (2) Symmetric Key Ratchet - derives new chain key for each message, (3) Each message encrypted with unique ephemeral key, (4) Compromising one key does not affect past or future messages. Key rotation happens automatically with each message exchange.',
          codeExample: `// Double Ratchet Implementation
class DoubleRatchet {
    private byte[] rootKey;
    private byte[] sendingChainKey;
    private byte[] receivingChainKey;
    private KeyPair dhKeyPair;
    private byte[] remoteDhPublicKey;

    public byte[] ratchetEncrypt(String plaintext) {
        // 1. Derive message key from chain key
        byte[] messageKey = deriveMessageKey(sendingChainKey);

        // 2. Step the sending chain forward
        sendingChainKey = stepChainKey(sendingChainKey);

        // 3. Encrypt message
        byte[] ciphertext = AES.encrypt(plaintext, messageKey);

        // 4. Include DH public key in header
        return packMessage(dhKeyPair.publicKey, ciphertext);
    }

    public String ratchetDecrypt(byte[] message) {
        // 1. Unpack message
        byte[] senderDhKey = extractDhKey(message);
        byte[] ciphertext = extractCiphertext(message);

        // 2. If new DH key, perform DH ratchet
        if (!Arrays.equals(senderDhKey, remoteDhPublicKey)) {
            performDhRatchet(senderDhKey);
        }

        // 3. Derive message key
        byte[] messageKey = deriveMessageKey(receivingChainKey);
        receivingChainKey = stepChainKey(receivingChainKey);

        // 4. Decrypt
        return AES.decrypt(ciphertext, messageKey);
    }

    private void performDhRatchet(byte[] newRemoteKey) {
        remoteDhPublicKey = newRemoteKey;
        // Derive new root key and chain keys
        byte[] dhOutput = DH.compute(dhKeyPair.privateKey, newRemoteKey);
        rootKey = HKDF.derive(rootKey, dhOutput, "root");
        receivingChainKey = HKDF.derive(rootKey, dhOutput, "chain");

        // Generate new DH key pair for sending
        dhKeyPair = DH.generateKeyPair();
        dhOutput = DH.compute(dhKeyPair.privateKey, newRemoteKey);
        sendingChainKey = HKDF.derive(rootKey, dhOutput, "chain");
    }
}`
        },
        {
          name: 'Key Management',
          explanation: 'Key management is critical for E2E encryption: (1) Identity keys stored securely on device (never sent to server), (2) Prekeys (100 one-time keys) uploaded to server for first contact, (3) Server stores only public keys - cannot decrypt messages, (4) Key verification: users can verify identity keys via QR code or 60-digit number, (5) Multi-device: each device has its own key pair, messages sent to all devices, (6) Key backup: encrypted backup of keys using user password (optional).',
          codeExample: `// Key Management Service
class KeyManagement {
    // Generate identity keys on registration
    public KeyPair generateIdentityKeys() {
        KeyPair identityKeys = Curve25519.generateKeyPair();

        // Store private key in secure enclave
        secureStorage.store("identity_private",
            identityKeys.privateKey);

        // Upload public key to server
        server.registerIdentityKey(userId,
            identityKeys.publicKey);

        return identityKeys;
    }

    // Generate and upload prekeys
    public void uploadPrekeys(int count) {
        List<Prekey> prekeys = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            KeyPair kp = Curve25519.generateKeyPair();
            prekeys.add(new Prekey(i, kp.publicKey));
            // Store private keys locally
            secureStorage.store("prekey_" + i, kp.privateKey);
        }

        // Sign with identity key
        byte[] signature = sign(identityKey, prekeys);

        // Upload to server
        server.uploadPrekeys(userId, prekeys, signature);
    }

    // Verify contact's identity
    public String getVerificationCode(String contactId) {
        byte[] myKey = identityKey.publicKey;
        byte[] theirKey = server.getIdentityKey(contactId);

        // Generate 60-digit verification code
        byte[] combined = concat(myKey, theirKey);
        return SHA256.hash(combined)
            .substring(0, 60)
            .replaceAll("(.{5})", "$1 ");
    }
}`
        }
      ]
    },
    {
      id: 'message-storage',
      name: 'Message Storage',
      icon: '💾',
      color: '#3b82f6',
      description: 'Cassandra for message storage with horizontal scaling, PostgreSQL for users and groups, and Redis for caching and presence.',
      diagram: CassandraStorageDiagram,
      details: [
        {
          name: 'Cassandra Design',
          diagram: CassandraStorageDiagram,
          explanation: 'Cassandra is used for message storage due to its write-heavy optimization and linear scaling: (1) Partition Key: user_id ensures all messages for a user on same node, (2) Clustering Key: timestamp for chronological ordering, (3) Replication Factor: 3 for fault tolerance, (4) Consistency: QUORUM (2/3 nodes) balances availability and consistency, (5) 1000+ nodes handle 100B messages/day, (6) TTL: messages auto-deleted after 30 days (configurable).',
          codeExample: `// Cassandra Schema for Messages
CREATE KEYSPACE whatsapp WITH replication = {
    'class': 'NetworkTopologyStrategy',
    'us-east': 3,
    'us-west': 3,
    'eu-west': 3,
    'ap-south': 3
};

CREATE TABLE messages (
    user_id UUID,           -- Partition key
    conversation_id UUID,
    message_id TIMEUUID,    -- Clustering key
    sender_id UUID,
    encrypted_content BLOB, -- E2E encrypted
    message_type TEXT,      -- text, image, video
    media_url TEXT,
    created_at TIMESTAMP,
    delivery_status TEXT,   -- sent, delivered, read
    PRIMARY KEY ((user_id), conversation_id, message_id)
) WITH CLUSTERING ORDER BY (conversation_id ASC, message_id DESC)
  AND default_time_to_live = 2592000  -- 30 days TTL
  AND gc_grace_seconds = 864000;

-- Write path (100B messages/day)
-- Partition by user_id = even distribution
-- Each partition ~100 MB max (compact storage)

-- Read path (fetch last 50 messages)
SELECT * FROM messages
WHERE user_id = ? AND conversation_id = ?
ORDER BY message_id DESC
LIMIT 50;`
        },
        {
          name: 'PostgreSQL for Users',
          explanation: 'PostgreSQL handles relational data (users, groups, contacts): (1) Sharding: hash-based on user_id with 128 shards, (2) Read Replicas: 5 replicas per master for read scaling, (3) Indexes: B-tree on phone_number, username for fast lookups, (4) Connection Pooling: PgBouncer for efficient connections, (5) ACID transactions for critical operations (registration, group membership), (6) PITR backup for disaster recovery.',
          codeExample: `-- User Schema (PostgreSQL)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    phone_country_code VARCHAR(5) NOT NULL,
    display_name VARCHAR(100),
    profile_photo_url TEXT,
    about TEXT DEFAULT 'Hey there! I am using WhatsApp.',
    identity_public_key BYTEA NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_seen_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active'
);

CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_created ON users(created_at);

-- Group Schema
CREATE TABLE groups (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    photo_url TEXT,
    creator_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    max_members INT DEFAULT 256,
    encryption_key_version INT DEFAULT 1
);

CREATE TABLE group_members (
    group_id UUID REFERENCES groups(id),
    user_id UUID REFERENCES users(id),
    role VARCHAR(20) DEFAULT 'member', -- admin, member
    joined_at TIMESTAMP DEFAULT NOW(),
    sender_key BYTEA, -- Encrypted sender key for E2E
    PRIMARY KEY (group_id, user_id)
);

-- Sharding config
-- Shard key: user_id % 128
-- Each shard: ~15M users`
        },
        {
          name: 'Redis Caching',
          explanation: 'Redis Cluster provides multi-layer caching: (1) Presence Cache: online/offline status with 60s TTL (~1.5TB for 300M users), (2) Session Cache: user sessions, WebSocket mappings with 24h TTL (~500GB), (3) Message Cache: recent messages for fast retrieval with 1h TTL (~2TB), (4) Group Cache: member lists, metadata for fast fan-out, (5) Cluster mode: 100 shards with 2 replicas each, (6) Eviction: LRU policy, (7) Persistence: RDB snapshots every 15 minutes.',
          codeExample: `// Redis Cache Patterns
class RedisCacheService {

    // Presence Cache (TTL: 60s, refreshed by heartbeat)
    public void setOnline(String userId) {
        redis.setex("presence:" + userId, 60, "online");
    }

    public boolean isOnline(String userId) {
        return "online".equals(redis.get("presence:" + userId));
    }

    // Session Cache (TTL: 24h)
    public void setSession(String userId, Session session) {
        String key = "session:" + userId;
        redis.hset(key, "ws_server", session.wsServer);
        redis.hset(key, "device_id", session.deviceId);
        redis.hset(key, "token", session.token);
        redis.expire(key, 86400);
    }

    // Message Cache (Write-through, TTL: 1h)
    public void cacheMessage(String conversationId, Message msg) {
        String key = "messages:" + conversationId;
        redis.zadd(key, msg.timestamp, serialize(msg));
        redis.expire(key, 3600);
        // Trim to last 100 messages
        redis.zremrangeByRank(key, 0, -101);
    }

    // Group Members Cache (TTL: 5 min)
    public List<String> getGroupMembers(String groupId) {
        String key = "group:" + groupId + ":members";
        Set<String> members = redis.smembers(key);
        if (members.isEmpty()) {
            // Cache miss - fetch from PostgreSQL
            members = db.getGroupMembers(groupId);
            redis.sadd(key, members.toArray(new String[0]));
            redis.expire(key, 300);
        }
        return new ArrayList<>(members);
    }
}

// Redis Cluster Config
// 100 shards * 3 (1 master + 2 replicas) = 300 nodes
// Memory: ~4 TB total across cluster
// Operations: ~5M ops/second`
        }
      ]
    },
    {
      id: 'group-messaging',
      name: 'Group Messaging',
      icon: '👥',
      color: '#f97316',
      description: 'Fan-out on write strategy for group messages, Sender Key protocol for efficient group encryption, and message delivery tracking.',
      diagram: GroupChatDiagram,
      details: [
        {
          name: 'Fan-out Strategy',
          diagram: GroupChatDiagram,
          explanation: 'WhatsApp uses fan-out on write for groups (up to 256 members): (1) Sender sends single encrypted message, (2) Group Service validates sender membership, (3) Fetches member list from Redis cache, (4) Creates N copies (one per member), (5) Each copy stored in member\'s Cassandra partition, (6) Async fan-out via Kafka for scalability, (7) Online members receive via WebSocket, offline via push notification. Trade-off: write amplification but faster reads.',
          codeExample: `// Group Message Fan-out Service
class GroupMessageService {

    public void handleGroupMessage(GroupMessage msg) {
        // 1. Validate sender is group member
        if (!groupService.isMember(msg.groupId, msg.senderId)) {
            throw new UnauthorizedException();
        }

        // 2. Get group members from cache
        List<String> members = redis.getGroupMembers(msg.groupId);

        // 3. Publish to Kafka for async fan-out
        kafka.send("group-fanout", new FanoutEvent(
            msg.groupId,
            msg.messageId,
            msg.senderId,
            msg.encryptedContent, // Encrypted with sender key
            members
        ));
    }

    // Kafka Consumer - handles fan-out
    @KafkaListener(topics = "group-fanout")
    public void processFanout(FanoutEvent event) {
        for (String memberId : event.members) {
            if (memberId.equals(event.senderId)) continue;

            // Store in each member's partition
            cassandra.write(memberId, event.toMessage());

            // Deliver or queue
            if (presenceService.isOnline(memberId)) {
                String wsServer = redis.get("ws:" + memberId);
                kafka.send("delivery-" + wsServer,
                    event.toDeliveryEvent(memberId));
            } else {
                offlineQueue.add(memberId, event.messageId);
                notificationService.notifyGroupMessage(
                    memberId, event.groupId, event.senderId);
            }
        }
    }
}`
        },
        {
          name: 'Sender Key Protocol',
          explanation: 'Sender Key protocol enables efficient group encryption: (1) Group creator generates sender key (shared secret), (2) Sender key distributed to all members via encrypted 1-on-1 messages, (3) Each message encrypted once with sender key, (4) All members can decrypt with same key, (5) Key rotation: when member leaves, new sender key generated and redistributed, (6) This provides forward secrecy - removed members cannot read new messages.',
          codeExample: `// Sender Key Distribution Protocol
class SenderKeyProtocol {

    // Called when group is created or member joins
    public void distributeSenderKey(String groupId, String memberId) {
        // 1. Get or generate sender key for this group
        byte[] senderKey = getSenderKey(groupId);

        // 2. Get session with new member (Signal Protocol)
        Session session = signalProtocol.getSession(memberId);

        // 3. Encrypt sender key for this member
        byte[] encryptedKey = session.encrypt(senderKey);

        // 4. Send via 1-on-1 message
        messageService.send(new Message(
            type: "SENDER_KEY_DISTRIBUTION",
            groupId: groupId,
            encryptedContent: encryptedKey
        ));
    }

    // Called when member leaves group
    public void rotateSenderKey(String groupId, String removedMemberId) {
        // 1. Generate new sender key
        byte[] newSenderKey = generateSenderKey();
        storeSenderKey(groupId, newSenderKey);

        // 2. Get remaining members
        List<String> members = groupService.getMembers(groupId);
        members.remove(removedMemberId);

        // 3. Distribute to all remaining members
        for (String memberId : members) {
            distributeSenderKey(groupId, memberId);
        }

        // Removed member cannot decrypt new messages
        // (they don't have the new sender key)
    }

    public byte[] encryptGroupMessage(String groupId, String plaintext) {
        byte[] senderKey = getSenderKey(groupId);
        // Single encryption for all members
        return AES.encrypt(plaintext, senderKey);
    }
}`
        },
        {
          name: 'Read Receipts',
          explanation: 'Group read receipts are aggregated: (1) Each member sends delivery/read receipt, (2) Receipts collected per message, (3) Sender sees aggregated status (e.g., "Read by 15/20"), (4) Detailed view shows individual status, (5) Receipt batching: send every 2s or 50 receipts to reduce traffic, (6) Privacy: users can disable read receipts, (7) Optimization: only track recent messages (7 days).',
          codeExample: `// Group Read Receipts Service
class GroupReceiptService {

    // Handle individual receipt
    public void handleReceipt(Receipt receipt) {
        String key = "receipts:" + receipt.groupId + ":" +
                     receipt.messageId;

        // Store individual receipt
        redis.hset(key, receipt.userId, receipt.status.name());
        redis.expire(key, 604800); // 7 days

        // Check if should notify sender
        if (shouldNotify(receipt)) {
            notifySender(receipt);
        }
    }

    // Get aggregated receipts for message
    public AggregatedReceipt getReceipts(String groupId,
                                          String messageId) {
        String key = "receipts:" + groupId + ":" + messageId;
        Map<String, String> receipts = redis.hgetall(key);

        int delivered = 0, read = 0, pending = 0;
        for (String status : receipts.values()) {
            switch (status) {
                case "READ": read++; break;
                case "DELIVERED": delivered++; break;
                default: pending++;
            }
        }

        int total = groupService.getMemberCount(groupId) - 1;
        pending = total - delivered - read;

        return new AggregatedReceipt(delivered, read, pending);
    }

    // Batch receipts to reduce traffic
    private final Map<String, List<Receipt>> pendingBatch =
        new ConcurrentHashMap<>();

    @Scheduled(fixedRate = 2000) // Every 2 seconds
    public void flushBatch() {
        pendingBatch.forEach((userId, receipts) -> {
            if (!receipts.isEmpty()) {
                sendBatchToSender(userId, receipts);
                receipts.clear();
            }
        });
    }
}`
        }
      ]
    },
    {
      id: 'media-service',
      name: 'Media Service',
      icon: '📎',
      color: '#ec4899',
      description: 'Upload and download media with E2E encryption, compression, thumbnail generation, S3 storage, and CDN delivery.',
      diagram: MediaServiceDiagram,
      details: [
        {
          name: 'Upload Pipeline',
          diagram: MediaServiceDiagram,
          explanation: 'Media upload flow with E2E encryption: (1) User selects media (images/videos/docs up to 2GB), (2) Client generates AES-256 encryption key, (3) Media encrypted locally (never uploaded unencrypted), (4) Request presigned S3 URL from Media Service, (5) Upload encrypted blob directly to S3, (6) S3 triggers Lambda for processing (compression, thumbnails), (7) Send message with media reference + encryption key (encrypted via Signal Protocol).',
          codeExample: `// Media Upload Service
class MediaUploadService {

    public UploadResponse initiateUpload(UploadRequest request) {
        // 1. Generate unique media ID
        String mediaId = UUID.randomUUID().toString();

        // 2. Generate presigned S3 URL (valid 15 min)
        String s3Key = String.format("media/%s/%s/%s/%s",
            LocalDate.now().getYear(),
            LocalDate.now().getMonthValue(),
            request.userId,
            mediaId
        );

        URL presignedUrl = s3.generatePresignedUrl(
            BUCKET_NAME, s3Key,
            Duration.ofMinutes(15),
            HttpMethod.PUT
        );

        // 3. Store metadata
        mediaMetadata.save(new MediaMetadata(
            mediaId,
            request.userId,
            request.fileType,
            request.fileSize,
            s3Key,
            "UPLOADING"
        ));

        return new UploadResponse(mediaId, presignedUrl);
    }

    // Lambda triggered on S3 upload complete
    @SqsListener("media-processing")
    public void processMedia(S3Event event) {
        String s3Key = event.getObject().getKey();
        MediaMetadata meta = mediaMetadata.getByS3Key(s3Key);

        // Download encrypted blob
        byte[] encryptedData = s3.getObject(s3Key);

        // Generate encrypted thumbnail (for images/videos)
        if (meta.isImageOrVideo()) {
            byte[] thumbnail = generateThumbnail(encryptedData);
            s3.putObject(s3Key + "_thumb", thumbnail);
        }

        // Update CDN cache
        cdn.invalidate(s3Key);

        // Mark as ready
        meta.setStatus("READY");
        mediaMetadata.save(meta);
    }
}`
        },
        {
          name: 'Download & CDN',
          explanation: 'Media download optimized with CDN: (1) Recipient receives message with media reference + decryption key, (2) Client requests download URL from Media Service, (3) Service returns CloudFront CDN URL (media cached at edge), (4) Download encrypted blob from CDN (95% cache hit rate), (5) Client decrypts locally with AES-256 key, (6) Display to user, cache locally for faster re-access. CDN has 200+ edge locations globally.',
          codeExample: `// Media Download Service
class MediaDownloadService {

    public DownloadResponse getDownloadUrl(DownloadRequest request) {
        // 1. Verify user has access
        if (!messageService.hasAccess(request.userId,
                                       request.messageId)) {
            throw new UnauthorizedException();
        }

        // 2. Get media metadata
        MediaMetadata meta = mediaMetadata.get(request.mediaId);

        // 3. Generate signed CloudFront URL (valid 1 hour)
        String cdnUrl = cloudFront.getSignedUrl(
            meta.s3Key,
            Duration.ofHours(1),
            CloudFrontSigner.PRIVATE_KEY
        );

        // 4. Return URL and metadata
        return new DownloadResponse(
            cdnUrl,
            meta.fileType,
            meta.fileSize,
            meta.thumbnailUrl
        );
    }
}

// CloudFront Configuration
Distribution:
  Origins:
    - S3 bucket: whatsapp-media-prod
  CacheBehavior:
    PathPattern: "/media/*"
    TTL: 604800  # 7 days
    ViewerProtocolPolicy: https-only
    CachePolicy: CachingOptimized
  PriceClass: PriceClass_All  # All edge locations

// Cache Statistics
// Total edge locations: 200+
// Cache hit rate: 95%
// P50 latency: 20ms
// P99 latency: 150ms`
        },
        {
          name: 'Compression',
          explanation: 'Media compression reduces bandwidth and storage: (1) Images: JPEG/WebP with 80% quality, max 1600px width, average 200KB from 2MB, (2) Videos: H.264 codec, 720p max, 1.5Mbps bitrate, 70% size reduction, (3) Audio: Opus codec, 32kbps for voice, high quality preserved, (4) Documents: no compression (already compressed), (5) Progressive download for large videos, (6) Adaptive quality based on network conditions.',
          codeExample: `// Media Compression Service
class MediaCompressionService {

    public CompressedMedia compressImage(byte[] original) {
        BufferedImage img = ImageIO.read(
            new ByteArrayInputStream(original));

        // Resize if too large
        if (img.getWidth() > 1600) {
            double ratio = 1600.0 / img.getWidth();
            img = resize(img,
                (int)(img.getWidth() * ratio),
                (int)(img.getHeight() * ratio));
        }

        // Compress to WebP (80% quality)
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        ImageIO.write(img, "webp", out);

        // Average: 2MB -> 200KB (90% reduction)
        return new CompressedMedia(out.toByteArray(), "webp");
    }

    public CompressedMedia compressVideo(File video) {
        // FFmpeg command for compression
        String[] cmd = {
            "ffmpeg", "-i", video.getPath(),
            "-vf", "scale=-2:720",        // Max 720p
            "-c:v", "libx264",            // H.264 codec
            "-b:v", "1500k",              // 1.5 Mbps bitrate
            "-preset", "medium",
            "-c:a", "aac",
            "-b:a", "128k",
            "-movflags", "+faststart",    // Progressive download
            outputPath
        };

        Process process = Runtime.getRuntime().exec(cmd);
        process.waitFor();

        // Average: 70% size reduction
        return new CompressedMedia(
            Files.readAllBytes(outputPath), "mp4");
    }

    public CompressedMedia compressAudio(byte[] audio) {
        // Opus codec for voice messages
        // 32kbps for voice, maintains quality
        return opusEncoder.encode(audio, 32000);
    }
}`
        }
      ]
    },
    {
      id: 'scaling-infrastructure',
      name: 'Scaling & Infrastructure',
      icon: '📈',
      color: '#06b6d4',
      description: 'Global infrastructure with multi-cloud deployment, auto-scaling, load balancing, and performance optimizations.',
      diagram: ScalingDiagram,
      details: [
        {
          name: 'Global Scale',
          diagram: ScalingDiagram,
          explanation: 'WhatsApp operates at massive scale: 2B total users, 600M DAU, 100B messages/day (1.2M QPS, 4M peak), 300M concurrent WebSocket connections, 500TB media/day. Infrastructure: 6000+ WebSocket servers, 1000+ Cassandra nodes, 300 Redis nodes, deployed across 20 global regions. Technology stack: Erlang/Elixir for WebSocket (OTP for concurrency), Go for Message Service (high throughput), Node.js for API Gateway.',
          codeExample: `// Infrastructure Overview
┌─────────────────────────────────────────────────────────┐
│                     SCALE METRICS                        │
├─────────────────────────────────────────────────────────┤
│ Total Users:           2,000,000,000                    │
│ Daily Active Users:    600,000,000                      │
│ Messages/Day:          100,000,000,000                  │
│ Messages/Second:       1,200,000 (4M peak)              │
│ Concurrent Connections: 300,000,000                     │
│ Media Uploads/Day:     1,000,000,000                    │
│ Media Storage/Day:     500 TB                           │
├─────────────────────────────────────────────────────────┤
│                     INFRASTRUCTURE                       │
├─────────────────────────────────────────────────────────┤
│ WebSocket Servers:     6,000+ (50K conn/server)         │
│ Cassandra Nodes:       1,000+ (RF=3, QUORUM)            │
│ Redis Nodes:           300 (100 shards x 3 replicas)    │
│ PostgreSQL Shards:     128 (5 replicas each)            │
│ Kafka Brokers:         200+                             │
│ S3 Storage:            Petabytes                        │
│ CDN Edge Locations:    200+                             │
│ Global Regions:        20                               │
├─────────────────────────────────────────────────────────┤
│                     TECHNOLOGY STACK                     │
├─────────────────────────────────────────────────────────┤
│ WebSocket Gateway:     Erlang/Elixir (OTP)              │
│ Message Service:       Go                               │
│ Media Service:         Node.js                          │
│ API Gateway:           Node.js                          │
│ Orchestration:         Kubernetes + Istio               │
│ Cloud:                 Multi-cloud (AWS + GCP)          │
└─────────────────────────────────────────────────────────┘`
        },
        {
          name: 'Auto-scaling',
          explanation: 'Auto-scaling policies ensure capacity matches demand: (1) WebSocket Gateway: scale on CPU > 70% or connections > 45K, (2) Message Service: scale on Kafka queue depth > 10K, (3) Media Service: scale on upload QPS > 50K, (4) Cooldown: 5 minutes between scaling events, (5) Min/Max: 100-10,000 instances per service, (6) Predictive scaling: pre-scale before expected peaks (6-10 PM local), (7) Regional isolation: independent scaling per region.',
          codeExample: `// Kubernetes Auto-scaling Configuration
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: websocket-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: websocket-gateway
  minReplicas: 1000
  maxReplicas: 10000
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Pods
    pods:
      metric:
        name: websocket_connections
      target:
        type: AverageValue
        averageValue: "45000"
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60

---
# Predictive Scaling for Peak Hours
apiVersion: autoscaling.k8s.io/v1alpha1
kind: MultidimPodAutoscaler
spec:
  predictiveScaling:
    enabled: true
    mode: ForecastAndScale
    metricSpecifications:
    - targetUtilization: 60
      predictedCapacityBuffer: 20
    scheduledScaleUp:
    - schedule: "0 17 * * *"  # 5 PM local
      minReplicas: 2000`
        },
        {
          name: 'Performance Optimization',
          explanation: 'Performance optimizations across the stack: (1) Message Batching: batch delivery receipts every 2s or 50 receipts, (2) Connection Pooling: 100 connections per service to databases, (3) Compression: GZIP for messages > 1KB, Protobuf for binary serialization (70% bandwidth reduction), (4) Lazy Loading: load chat history on demand (50 messages at a time), (5) CDN: edge caching with 95% hit rate, (6) Database: denormalization, materialized views, partition pruning.',
          codeExample: `// Performance Optimizations

// 1. Message Batching
class ReceiptBatcher {
    private Queue<Receipt> batch = new ConcurrentLinkedQueue<>();

    @Scheduled(fixedRate = 2000)
    public void flush() {
        List<Receipt> receipts = new ArrayList<>();
        Receipt r;
        while ((r = batch.poll()) != null && receipts.size() < 50) {
            receipts.add(r);
        }
        if (!receipts.isEmpty()) {
            sendBatch(receipts);
        }
    }
}

// 2. Connection Pooling
HikariConfig config = new HikariConfig();
config.setMaximumPoolSize(100);
config.setMinimumIdle(20);
config.setConnectionTimeout(5000);
config.setIdleTimeout(300000);

// 3. Compression
public byte[] compress(Message msg) {
    if (msg.size() > 1024) {
        return gzip(protobuf.serialize(msg));
    }
    return protobuf.serialize(msg);
}

// 4. Lazy Loading
public List<Message> getMessages(String convId, String cursor) {
    // Fetch 50 messages starting from cursor
    return cassandra.execute(
        "SELECT * FROM messages " +
        "WHERE conversation_id = ? " +
        "AND message_id < ? " +
        "ORDER BY message_id DESC " +
        "LIMIT 50",
        convId, cursor
    );
}

// 5. CDN Optimization
// CloudFront + Brotli compression for web
// HTTP/3 with QUIC for faster uploads

// 6. Database Optimization
// Cassandra: compaction, bloom filters
// Read path: 99th percentile < 10ms`
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
      { name: 'System Design', icon: '🏛️', page: 'SystemDesign' },
      { name: 'WhatsApp', icon: '💬', page: 'WhatsApp' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #25d366, #128c7e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(37, 211, 102, 0.2)',
    border: '1px solid rgba(37, 211, 102, 0.3)',
    borderRadius: '0.5rem',
    color: '#25d366',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>WhatsApp System Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(37, 211, 102, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(37, 211, 102, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to System Design
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={TOPIC_COLORS}
        />
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
              {concept.details.length} topics - Click to explore
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
              maxWidth: '1200px',
              width: '100%',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={TOPIC_COLORS}
            />

            {/* Modal Header */}
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
                >Prev</button>
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
                >Next</button>
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
                >Close</button>
              </div>
            </div>

            {/* Detail Tabs */}
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

            {/* Detail Content */}
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

export default WhatsApp

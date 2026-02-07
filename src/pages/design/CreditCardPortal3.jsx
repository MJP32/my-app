/**
 * Credit Card Portal System Design
 *
 * Comprehensive system design for a credit card portal serving 10M users
 * with 30M transactions/day using CQRS, Event Sourcing, and Saga patterns.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#8b5cf6',
  primaryHover: '#a78bfa',
  bg: 'rgba(139, 92, 246, 0.1)',
  border: 'rgba(139, 92, 246, 0.3)',
  arrow: '#8b5cf6',
  hoverBg: 'rgba(139, 92, 246, 0.2)',
  topicBg: 'rgba(139, 92, 246, 0.2)'
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

const ArchitectureOverviewDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowPurple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">9-Layer Architecture - Credit Card Portal</text>

    {/* Client Layer */}
    <rect x="20" y="50" width="100" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="70" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Client Apps</text>
    <text x="70" y="82" textAnchor="middle" fill="#bfdbfe" fontSize="7">Web/Mobile</text>

    {/* API Gateway */}
    <rect x="140" y="50" width="100" height="45" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="190" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">API Gateway</text>
    <text x="190" y="82" textAnchor="middle" fill="#ddd6fe" fontSize="7">Kong + Auth</text>

    {/* Core Services */}
    <rect x="260" y="50" width="100" height="45" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="310" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Core Services</text>
    <text x="310" y="82" textAnchor="middle" fill="#bbf7d0" fontSize="7">Saga Pattern</text>

    {/* Transaction Services */}
    <rect x="380" y="50" width="100" height="45" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="430" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Transaction</text>
    <text x="430" y="82" textAnchor="middle" fill="#fef3c7" fontSize="7">Event Sourcing</text>

    {/* Event Bus */}
    <rect x="500" y="50" width="100" height="45" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="550" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Kafka</text>
    <text x="550" y="82" textAnchor="middle" fill="#fbcfe8" fontSize="7">30M events/day</text>

    {/* Databases */}
    <rect x="620" y="50" width="100" height="45" rx="6" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="670" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">8 Databases</text>
    <text x="670" y="82" textAnchor="middle" fill="#c7d2fe" fontSize="7">Polyglot</text>

    {/* Arrows */}
    <line x1="120" y1="72" x2="135" y2="72" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)"/>
    <line x1="240" y1="72" x2="255" y2="72" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)"/>
    <line x1="360" y1="72" x2="375" y2="72" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)"/>
    <line x1="480" y1="72" x2="495" y2="72" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)"/>
    <line x1="600" y1="72" x2="615" y2="72" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)"/>

    {/* Metrics */}
    <rect x="100" y="130" width="600" height="50" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="155" textAnchor="middle" fill="#94a3b8" fontSize="11">
      10M Users | 30M Txn/Day | 347 TPS Avg | 1735 TPS Peak | 99.9% Uptime
    </text>

    {/* Design Patterns */}
    <rect x="100" y="200" width="140" height="30" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="170" y="220" textAnchor="middle" fill="#4ade80" fontSize="10">CQRS Pattern</text>

    <rect x="260" y="200" width="140" height="30" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="330" y="220" textAnchor="middle" fill="#fbbf24" fontSize="10">Event Sourcing</text>

    <rect x="420" y="200" width="140" height="30" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="1"/>
    <text x="490" y="220" textAnchor="middle" fill="#f472b6" fontSize="10">Saga Pattern</text>

    <rect x="580" y="200" width="140" height="30" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="650" y="220" textAnchor="middle" fill="#f87171" fontSize="10">Circuit Breaker</text>
  </svg>
)

const CQRSDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
      <marker id="arrowPink" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
      <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">CQRS Architecture - Read/Write Separation</text>

    {/* Command Side */}
    <rect x="50" y="50" width="300" height="120" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="200" y="75" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">COMMAND SIDE (Write)</text>

    <rect x="70" y="90" width="120" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="130" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Command</text>
    <text x="130" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Services</text>
    <text x="130" y="142" textAnchor="middle" fill="#bbf7d0" fontSize="8">POST/PUT/DELETE</text>

    <rect x="210" y="90" width="120" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="270" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Write DBs</text>
    <text x="270" y="130" textAnchor="middle" fill="#ddd6fe" fontSize="8">PostgreSQL</text>
    <text x="270" y="142" textAnchor="middle" fill="#ddd6fe" fontSize="8">MongoDB</text>

    {/* Query Side */}
    <rect x="450" y="50" width="300" height="120" rx="8" fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="600" y="75" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">QUERY SIDE (Read)</text>

    <rect x="470" y="90" width="120" height="60" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="530" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Query</text>
    <text x="530" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Services</text>
    <text x="530" y="142" textAnchor="middle" fill="#fbcfe8" fontSize="8">GET Requests</text>

    <rect x="610" y="90" width="120" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="670" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Read DBs</text>
    <text x="670" y="130" textAnchor="middle" fill="#ddd6fe" fontSize="8">Elasticsearch</text>
    <text x="670" y="142" textAnchor="middle" fill="#ddd6fe" fontSize="8">Redis Cache</text>

    {/* Event Bus */}
    <rect x="300" y="200" width="200" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="225" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Apache Kafka</text>
    <text x="400" y="245" textAnchor="middle" fill="#fef3c7" fontSize="9">30M events/day</text>

    {/* Arrows */}
    <line x1="190" y1="120" x2="205" y2="120" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
    <line x1="590" y1="120" x2="605" y2="120" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowPink)"/>

    <path d="M 270 155 L 270 185 L 300 200" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)"/>
    <path d="M 500 200 L 530 185 L 530 155" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)"/>

    {/* Labels */}
    <text x="280" y="180" fill="#f59e0b" fontSize="9">Publish</text>
    <text x="480" y="180" fill="#f59e0b" fontSize="9">Subscribe</text>

    {/* Eventual Consistency Note */}
    <rect x="280" y="280" width="240" height="40" rx="6" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="305" textAnchor="middle" fill="#fbbf24" fontSize="10">Eventual Consistency: 5-15 min lag</text>
  </svg>
)

const EventSourcingDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Event Sourcing - Immutable Event Log</text>

    {/* Events Timeline */}
    <line x1="50" y1="100" x2="750" y2="100" stroke="#475569" strokeWidth="3"/>

    {/* Event 1 */}
    <rect x="80" y="60" width="120" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Application</text>
    <text x="140" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="8">Created</text>
    <circle cx="140" cy="100" r="8" fill="#3b82f6" stroke="white" strokeWidth="2"/>

    {/* Event 2 */}
    <rect x="230" y="60" width="120" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="290" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Credit Check</text>
    <text x="290" y="100" textAnchor="middle" fill="#bbf7d0" fontSize="8">Passed</text>
    <circle cx="290" cy="100" r="8" fill="#22c55e" stroke="white" strokeWidth="2"/>

    {/* Event 3 */}
    <rect x="380" y="60" width="120" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="440" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Account</text>
    <text x="440" y="100" textAnchor="middle" fill="#ddd6fe" fontSize="8">Created</text>
    <circle cx="440" cy="100" r="8" fill="#8b5cf6" stroke="white" strokeWidth="2"/>

    {/* Event 4 */}
    <rect x="530" y="60" width="120" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="590" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Transaction</text>
    <text x="590" y="100" textAnchor="middle" fill="#fef3c7" fontSize="8">Posted</text>
    <circle cx="590" cy="100" r="8" fill="#f59e0b" stroke="white" strokeWidth="2"/>

    {/* Event 5 */}
    <rect x="680" y="60" width="100" height="50" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="730" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Balance</text>
    <text x="730" y="100" textAnchor="middle" fill="#fbcfe8" fontSize="8">Updated</text>
    <circle cx="730" cy="100" r="8" fill="#ec4899" stroke="white" strokeWidth="2"/>

    {/* Event Store */}
    <rect x="250" y="160" width="300" height="80" rx="8" fill="rgba(99, 102, 241, 0.1)" stroke="#6366f1" strokeWidth="2"/>
    <text x="400" y="190" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">PostgreSQL Event Store</text>
    <text x="400" y="210" textAnchor="middle" fill="#94a3b8" fontSize="10">Append-Only | Immutable | 30M events/day</text>
    <text x="400" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">Never UPDATE or DELETE - only INSERT</text>

    {/* Arrow to Event Store */}
    <line x1="400" y1="115" x2="400" y2="155" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
  </svg>
)

const SagaDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="sagaArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
      <marker id="compensateArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Saga Pattern - Card Application Flow</text>

    {/* Saga Orchestrator */}
    <rect x="320" y="50" width="160" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Saga Orchestrator</text>
    <text x="400" y="90" textAnchor="middle" fill="#fef3c7" fontSize="9">Coordinates Steps</text>

    {/* Step 1 */}
    <rect x="50" y="140" width="140" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="120" y="165" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1. Validate App</text>
    <text x="120" y="180" textAnchor="middle" fill="#bbf7d0" fontSize="8">App Service</text>
    <text x="120" y="195" textAnchor="middle" fill="#86efac" fontSize="7">Comp: Mark Invalid</text>

    {/* Step 2 */}
    <rect x="220" y="140" width="140" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="290" y="165" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2. Credit Check</text>
    <text x="290" y="180" textAnchor="middle" fill="#bfdbfe" fontSize="8">Bureau API</text>
    <text x="290" y="195" textAnchor="middle" fill="#93c5fd" fontSize="7">Comp: Cancel Inquiry</text>

    {/* Step 3 */}
    <rect x="390" y="140" width="140" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="460" y="165" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3. Create Acct</text>
    <text x="460" y="180" textAnchor="middle" fill="#ddd6fe" fontSize="8">Account Service</text>
    <text x="460" y="195" textAnchor="middle" fill="#c4b5fd" fontSize="7">Comp: Delete Acct</text>

    {/* Step 4 */}
    <rect x="560" y="140" width="140" height="60" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="630" y="165" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">4. Issue Card</text>
    <text x="630" y="180" textAnchor="middle" fill="#fbcfe8" fontSize="8">Card Service</text>
    <text x="630" y="195" textAnchor="middle" fill="#f9a8d4" fontSize="7">Comp: Cancel Card</text>

    {/* Forward arrows */}
    <line x1="190" y1="170" x2="215" y2="170" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#sagaArrow)"/>
    <line x1="360" y1="170" x2="385" y2="170" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#sagaArrow)"/>
    <line x1="530" y1="170" x2="555" y2="170" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#sagaArrow)"/>

    {/* Compensating transaction arrow */}
    <path d="M 630 205 L 630 240 L 120 240 L 120 205" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="5,5" markerEnd="url(#compensateArrow)"/>
    <text x="400" y="255" textAnchor="middle" fill="#ef4444" fontSize="9">On Failure: Execute Compensating Transactions</text>

    {/* Orchestrator connections */}
    <line x1="350" y1="100" x2="120" y2="135" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="380" y1="100" x2="290" y2="135" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="420" y1="100" x2="460" y2="135" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="450" y1="100" x2="630" y2="135" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3"/>
  </svg>
)

const DatabaseDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">8 Database Technologies - Polyglot Persistence</text>

    {/* Write Side DBs */}
    <rect x="30" y="50" width="360" height="120" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="210" y="75" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">WRITE SIDE (4 Databases)</text>

    <rect x="45" y="90" width="80" height="65" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="85" y="110" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MongoDB</text>
    <text x="85" y="123" textAnchor="middle" fill="#bbf7d0" fontSize="7">Transactions</text>
    <text x="85" y="145" textAnchor="middle" fill="#86efac" fontSize="7">5 Shards</text>

    <rect x="135" y="90" width="80" height="65" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="175" y="110" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PostgreSQL</text>
    <text x="175" y="123" textAnchor="middle" fill="#bfdbfe" fontSize="7">Accounts</text>
    <text x="175" y="145" textAnchor="middle" fill="#93c5fd" fontSize="7">1P + 2R</text>

    <rect x="225" y="90" width="80" height="65" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="265" y="110" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Event Store</text>
    <text x="265" y="123" textAnchor="middle" fill="#ddd6fe" fontSize="7">PostgreSQL</text>
    <text x="265" y="145" textAnchor="middle" fill="#c4b5fd" fontSize="7">Append-only</text>

    <rect x="315" y="90" width="65" height="65" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="347" y="110" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Redis</text>
    <text x="347" y="123" textAnchor="middle" fill="#fecaca" fontSize="7">Idempotency</text>
    <text x="347" y="145" textAnchor="middle" fill="#fca5a5" fontSize="7">24h TTL</text>

    {/* Read Side DBs */}
    <rect x="410" y="50" width="360" height="120" rx="8" fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="590" y="75" textAnchor="middle" fill="#ec4899" fontSize="11" fontWeight="bold">READ SIDE (4 Databases)</text>

    <rect x="425" y="90" width="80" height="65" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="465" y="110" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Redis</text>
    <text x="465" y="123" textAnchor="middle" fill="#fecaca" fontSize="7">Cache</text>
    <text x="465" y="145" textAnchor="middle" fill="#fca5a5" fontSize="7">92% hit</text>

    <rect x="515" y="90" width="80" height="65" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="555" y="110" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Elastic</text>
    <text x="555" y="123" textAnchor="middle" fill="#fef3c7" fontSize="7">Search</text>
    <text x="555" y="145" textAnchor="middle" fill="#fde68a" fontSize="7">3 nodes</text>

    <rect x="605" y="90" width="80" height="65" rx="6" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="645" y="110" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">InfluxDB</text>
    <text x="645" y="123" textAnchor="middle" fill="#c7d2fe" fontSize="7">Time-series</text>
    <text x="645" y="145" textAnchor="middle" fill="#a5b4fc" fontSize="7">90-day</text>

    <rect x="695" y="90" width="65" height="65" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="727" y="110" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Snowflake</text>
    <text x="727" y="123" textAnchor="middle" fill="#cffafe" fontSize="7">Warehouse</text>
    <text x="727" y="145" textAnchor="middle" fill="#a5f3fc" fontSize="7">Multi-TB</text>

    {/* Kafka in the middle */}
    <rect x="320" y="200" width="160" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="225" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Apache Kafka</text>
    <text x="400" y="242" textAnchor="middle" fill="#fef3c7" fontSize="9">Connects Write to Read</text>

    {/* Arrows */}
    <path d="M 210 175 L 210 210 L 315 220" stroke="#f59e0b" strokeWidth="2" fill="none"/>
    <path d="M 485 220 L 590 210 L 590 175" stroke="#f59e0b" strokeWidth="2" fill="none"/>

    {/* Legend */}
    <text x="400" y="290" textAnchor="middle" fill="#64748b" fontSize="9">Eventual Consistency: 5-15 min lag between Write and Read sides</text>
  </svg>
)

const FlowDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="flowArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Transaction Flow - End to End</text>

    {/* Step 1: Client */}
    <rect x="30" y="60" width="100" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1. Client</text>
    <text x="80" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="8">POST /txn</text>
    <text x="80" y="112" textAnchor="middle" fill="#93c5fd" fontSize="7">HTTPS</text>

    {/* Step 2: Gateway */}
    <rect x="150" y="60" width="100" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="200" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2. Gateway</text>
    <text x="200" y="100" textAnchor="middle" fill="#ddd6fe" fontSize="8">Auth + Rate</text>
    <text x="200" y="112" textAnchor="middle" fill="#c4b5fd" fontSize="7">JWT Valid</text>

    {/* Step 3: Command */}
    <rect x="270" y="60" width="100" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="320" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3. Command</text>
    <text x="320" y="100" textAnchor="middle" fill="#bbf7d0" fontSize="8">Validate</text>
    <text x="320" y="112" textAnchor="middle" fill="#86efac" fontSize="7">Idempotent</text>

    {/* Step 4: Fraud */}
    <rect x="390" y="60" width="100" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="440" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">4. Fraud ML</text>
    <text x="440" y="100" textAnchor="middle" fill="#fecaca" fontSize="8">XGBoost</text>
    <text x="440" y="112" textAnchor="middle" fill="#fca5a5" fontSize="7">&lt;100ms</text>

    {/* Step 5: Write */}
    <rect x="510" y="60" width="100" height="60" rx="6" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="560" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">5. Write</text>
    <text x="560" y="100" textAnchor="middle" fill="#c7d2fe" fontSize="8">MongoDB</text>
    <text x="560" y="112" textAnchor="middle" fill="#a5b4fc" fontSize="7">Event Store</text>

    {/* Step 6: Kafka */}
    <rect x="630" y="60" width="100" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="680" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">6. Kafka</text>
    <text x="680" y="100" textAnchor="middle" fill="#fef3c7" fontSize="8">Publish</text>
    <text x="680" y="112" textAnchor="middle" fill="#fde68a" fontSize="7">Event</text>

    {/* Arrows */}
    <line x1="130" y1="90" x2="145" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#flowArrow)"/>
    <line x1="250" y1="90" x2="265" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#flowArrow)"/>
    <line x1="370" y1="90" x2="385" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#flowArrow)"/>
    <line x1="490" y1="90" x2="505" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#flowArrow)"/>
    <line x1="610" y1="90" x2="625" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#flowArrow)"/>

    {/* Async consumers */}
    <rect x="200" y="170" width="120" height="50" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="260" y="195" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Projections</text>
    <text x="260" y="210" textAnchor="middle" fill="#fbcfe8" fontSize="8">Update Read DBs</text>

    <rect x="340" y="170" width="120" height="50" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="400" y="195" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Notifications</text>
    <text x="400" y="210" textAnchor="middle" fill="#cffafe" fontSize="8">Email/SMS/Push</text>

    <rect x="480" y="170" width="120" height="50" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="540" y="195" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Analytics</text>
    <text x="540" y="210" textAnchor="middle" fill="#a7f3d0" fontSize="8">InfluxDB Stats</text>

    {/* Kafka to consumers */}
    <path d="M 680 125 L 680 145 L 260 145 L 260 165" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="4,4"/>
    <path d="M 680 145 L 400 145 L 400 165" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="4,4"/>
    <path d="M 680 145 L 540 145 L 540 165" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="4,4"/>

    <text x="400" y="255" textAnchor="middle" fill="#64748b" fontSize="9">Async Processing via Kafka Consumer Groups</text>
  </svg>
)

const GatewayDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">API Gateway - Security Layer</text>

    {/* Gateway components */}
    <rect x="50" y="60" width="700" height="150" rx="12" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Kong API Gateway</text>

    <rect x="80" y="110" width="120" height="70" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Load Balancer</text>
    <text x="140" y="150" textAnchor="middle" fill="#bfdbfe" fontSize="8">NGINX/ALB</text>
    <text x="140" y="165" textAnchor="middle" fill="#93c5fd" fontSize="7">30M req/day</text>

    <rect x="220" y="110" width="120" height="70" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="280" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">WAF</text>
    <text x="280" y="150" textAnchor="middle" fill="#fecaca" fontSize="8">SQL/XSS/DDoS</text>
    <text x="280" y="165" textAnchor="middle" fill="#fca5a5" fontSize="7">Layer 7</text>

    <rect x="360" y="110" width="120" height="70" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="420" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Auth Service</text>
    <text x="420" y="150" textAnchor="middle" fill="#bbf7d0" fontSize="8">OAuth 2.0 + JWT</text>
    <text x="420" y="165" textAnchor="middle" fill="#86efac" fontSize="7">15min expiry</text>

    <rect x="500" y="110" width="120" height="70" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="560" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Rate Limiter</text>
    <text x="560" y="150" textAnchor="middle" fill="#fef3c7" fontSize="8">Token Bucket</text>
    <text x="560" y="165" textAnchor="middle" fill="#fde68a" fontSize="7">1000/min</text>

    <rect x="640" y="110" width="90" height="70" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="685" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Router</text>
    <text x="685" y="150" textAnchor="middle" fill="#ddd6fe" fontSize="8">Service</text>
    <text x="685" y="165" textAnchor="middle" fill="#c4b5fd" fontSize="7">Discovery</text>
  </svg>
)

const ObservabilityDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Observability Stack - Monitoring & Tracing`}</text>

    {/* Components */}
    <rect x="50" y="60" width="160" height="80" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="130" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Prometheus</text>
    <text x="130" y="108" textAnchor="middle" fill="#fef3c7" fontSize="9">Metrics Collection</text>
    <text x="130" y="125" textAnchor="middle" fill="#fde68a" fontSize="8">15s scrape interval</text>

    <rect x="230" y="60" width="160" height="80" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="310" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Grafana</text>
    <text x="310" y="108" textAnchor="middle" fill="#bbf7d0" fontSize="9">Visualization</text>
    <text x="310" y="125" textAnchor="middle" fill="#86efac" fontSize="8">Real-time Dashboards</text>

    <rect x="410" y="60" width="160" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="490" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ELK Stack</text>
    <text x="490" y="108" textAnchor="middle" fill="#bfdbfe" fontSize="9">Centralized Logging</text>
    <text x="490" y="125" textAnchor="middle" fill="#93c5fd" fontSize="8">100GB logs/day</text>

    <rect x="590" y="60" width="160" height="80" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="670" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Jaeger</text>
    <text x="670" y="108" textAnchor="middle" fill="#ddd6fe" fontSize="9">Distributed Tracing</text>
    <text x="670" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="8">End-to-end traces</text>

    {/* Alerts */}
    <rect x="200" y="160" width="400" height="40" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1"/>
    <text x="400" y="185" textAnchor="middle" fill="#f87171" fontSize="10">{`Alerts: Latency &gt;500ms | Error Rate &gt;1% | CPU &gt;80% | PagerDuty Integration`}</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function CreditCardPortal3({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'architecture',
      name: 'System Architecture',
      icon: '🏗️',
      color: '#8b5cf6',
      description: '9-layer microservices architecture handling 10M users, 30M transactions/day with 99.9% uptime SLA.',
      diagram: ArchitectureOverviewDiagram,
      details: [
        {
          name: 'Architecture Layers',
          diagram: ArchitectureOverviewDiagram,
          explanation: 'The Credit Card Portal uses a 9-layer architecture: (1) Client Apps (Web/Mobile), (2) API Gateway (Kong), (3) Core Services (Card, Account, Payment), (4) Transaction Services (Processor, Fraud Detection), (5) Analytics Services (Data Pipeline, Reporting), (6) Event Bus (Kafka), (7) Data Layer (8 databases), (8) Observability (Prometheus, Grafana, Jaeger), (9) External Services (Payment Gateway, Credit Bureau). Each layer has clear responsibilities with well-defined interfaces between them.',
          codeExample: `// Service Layer Example - Account Service
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;
    private final EventPublisher eventPublisher;

    @PostMapping
    public ResponseEntity<Account> createAccount(
            @RequestBody @Valid CreateAccountRequest request,
            @RequestHeader("Idempotency-Key") String idempotencyKey) {

        // Check idempotency to prevent duplicate account creation
        if (idempotencyStore.exists(idempotencyKey)) {
            return ResponseEntity.ok(idempotencyStore.get(idempotencyKey));
        }

        Account account = accountService.create(request);

        // Publish event to Kafka for CQRS sync
        eventPublisher.publish(new AccountCreatedEvent(account));

        // Store for idempotency (24h TTL)
        idempotencyStore.put(idempotencyKey, account, Duration.ofHours(24));

        return ResponseEntity.status(HttpStatus.CREATED).body(account);
    }
}`
        },
        {
          name: 'Capacity Planning',
          explanation: 'The system is designed to handle: 10M active users, 30M transactions/day (347 TPS avg, 1735 TPS peak), 10M account views/day (116 views/sec, 1160 peak). Storage: 30GB/day transactions (10.95TB/year). Kafka handles 60GB/day (694KB/sec). Redis caches 10% hot data (10GB for 1M active users). MongoDB uses 5 shards with 2M users per shard. PostgreSQL uses 1 primary + 2 read replicas for account data.',
          codeExample: `// Capacity Calculations for 10M Users

// Transactions
transactions_per_day = 10M users × 3 txn/user = 30M txn/day
tps_average = 30M / 86,400 sec = 347 TPS
tps_peak = 347 × 5 = 1,735 TPS (5x peak factor)

// Storage (Transactions)
storage_per_day = 30M txn × 1KB = 30GB/day
storage_per_year = 30GB × 365 = 10.95TB/year
storage_per_shard = 10.95TB / 5 shards = 2.19TB/shard/year

// MongoDB Sharding
users_per_shard = 10M / 5 = 2M users/shard
writes_per_shard = 30M / 5 = 6M writes/day/shard

// Redis Cache Memory
active_users = 10M × 10% = 1M users (hot data)
cache_memory = 1M × 10KB = 10GB
cluster_size = 3 masters × 8GB = 24GB (2.4x overhead)

// Kafka Throughput
events_per_day = 30M events × 2KB = 60GB/day
throughput = 60GB / 86,400 sec = 694KB/sec
cluster_capacity = 3 brokers × 100MB/sec = 300MB/sec ✓`
        },
        {
          name: 'Design Patterns',
          explanation: 'The architecture implements several key patterns: CQRS (Command Query Responsibility Segregation) for read/write separation, Event Sourcing for immutable audit logs, Saga Pattern for distributed transactions, Circuit Breaker for fault tolerance, Database-per-Service for data isolation, Cache-Aside for performance, and API Gateway for centralized security. Each pattern addresses specific challenges in distributed systems.',
          codeExample: `// Key Design Patterns Summary

1. CQRS Pattern
   - Write: POST/PUT/DELETE → Command Services → Write DBs
   - Read: GET → Query Services → Read DBs (cached)
   - Sync: Kafka events update read models (5-15 min lag)

2. Event Sourcing
   - Every state change stored as immutable event
   - Event Store: PostgreSQL append-only table
   - Replay capability for debugging/recovery

3. Saga Pattern (Orchestration)
   Step 1: Validate Application → App Service
   Step 2: Credit Check → Bureau API (Circuit Breaker)
   Step 3: Create Account → Account Service
   Step 4: Issue Card → Card Service
   On Failure: Execute compensating transactions

4. Circuit Breaker (Resilience4j)
   - Closed: Normal operation
   - Open: After 5 failures in 10 seconds
   - Half-Open: Allow 1 request to test recovery
   - Fallback: Queue for manual review

5. Cache-Aside Pattern
   Read: Check Redis → If miss, query DB → Cache result
   Write: Update DB → Invalidate cache
   TTL: 5 min for balances, 1 min for transactions`
        }
      ]
    },
    {
      id: 'cqrs',
      name: 'CQRS Pattern',
      icon: '⚡',
      color: '#22c55e',
      description: 'Command Query Responsibility Segregation separates read and write operations for optimal performance and scalability.',
      diagram: CQRSDiagram,
      details: [
        {
          name: 'Command Side (Write)',
          diagram: CQRSDiagram,
          explanation: 'The Command Side handles all write operations (POST, PUT, DELETE). Command Services validate requests, check idempotency keys in Redis, execute business logic, write to optimized databases (PostgreSQL for ACID, MongoDB for high throughput), and publish events to Kafka. The write path is optimized for consistency and durability with normalized schemas. Key metrics: 347 TPS average, <50ms write latency (p95).',
          codeExample: `// Command Side - Payment Processing
@Service
public class PaymentCommandService {

    private final RedisTemplate<String, String> redis;
    private final AccountRepository accountRepo;
    private final EventStore eventStore;
    private final KafkaTemplate<String, PaymentEvent> kafka;

    @Transactional
    public Payment processPayment(PaymentCommand cmd) {
        // 1. Check idempotency (prevent duplicate charges)
        String key = "idempotency:" + cmd.getIdempotencyKey();
        if (redis.hasKey(key)) {
            return redis.opsForValue().get(key);
        }

        // 2. Validate and execute
        Account account = accountRepo.findById(cmd.getAccountId());
        Payment payment = account.processPayment(cmd.getAmount());

        // 3. Store event (Event Sourcing)
        PaymentProcessedEvent event = new PaymentProcessedEvent(
            payment.getId(),
            cmd.getAccountId(),
            cmd.getAmount(),
            Instant.now()
        );
        eventStore.append(event);  // Immutable log

        // 4. Publish to Kafka (async read model sync)
        kafka.send("payments", event);

        // 5. Store for idempotency (24h TTL)
        redis.opsForValue().set(key, payment, Duration.ofHours(24));

        return payment;
    }
}`
        },
        {
          name: 'Query Side (Read)',
          explanation: 'The Query Side handles all read operations (GET). Query Services check Redis cache first (<1ms), then query denormalized read databases (Elasticsearch for search, InfluxDB for time-series, PostgreSQL replicas). The read path is optimized for speed with 92% cache hit rate. Read models are updated asynchronously via Kafka projections with 5-15 minute eventual consistency lag. Key metrics: 10M reads/day, <10ms query latency (p99).',
          codeExample: `// Query Side - Account Balance Query
@Service
public class AccountQueryService {

    private final RedisTemplate<String, AccountView> cache;
    private final AccountReadRepository readRepo;

    public AccountView getAccountBalance(String accountId) {
        // 1. Check cache first (92% hit rate, <1ms)
        String cacheKey = "account:" + accountId;
        AccountView cached = cache.opsForValue().get(cacheKey);
        if (cached != null) {
            return cached;  // Cache hit!
        }

        // 2. Query read replica (cache miss)
        AccountView account = readRepo.findById(accountId);

        // 3. Cache for next request (5 min TTL)
        cache.opsForValue().set(cacheKey, account, Duration.ofMinutes(5));

        return account;
    }

    // Kafka consumer updates cache when write events arrive
    @KafkaListener(topics = "account-events")
    public void handleAccountEvent(AccountEvent event) {
        // Invalidate cache to ensure consistency
        String cacheKey = "account:" + event.getAccountId();
        cache.delete(cacheKey);

        // Update read model (Elasticsearch, etc.)
        AccountView view = AccountView.fromEvent(event);
        readRepo.save(view);
    }
}`
        },
        {
          name: 'Eventual Consistency',
          explanation: 'CQRS introduces eventual consistency between write and read models. Writes go to the Command Side immediately, while the Query Side updates asynchronously via Kafka (5-15 min lag). This trade-off enables independent scaling: add read replicas without affecting write throughput. For critical reads (balance checks), we can query the write database directly. The system clearly communicates data freshness to users.',
          codeExample: `// Handling Eventual Consistency

// Trade-offs:
// - Write Side: Strong consistency (ACID)
// - Read Side: Eventual consistency (5-15 min lag)

// Strategy 1: Query write DB for critical data
@GetMapping("/accounts/{id}/balance")
public Balance getBalance(@PathVariable String accountId,
                          @RequestParam(defaultValue = "false") boolean realtime) {
    if (realtime) {
        // Query write DB directly (slower but consistent)
        return writeRepo.getBalance(accountId);
    }
    // Query read model (faster but may be stale)
    return readRepo.getBalance(accountId);
}

// Strategy 2: Include freshness indicator
@GetMapping("/accounts/{id}/transactions")
public TransactionResponse getTransactions(@PathVariable String accountId) {
    TransactionView view = readRepo.findTransactions(accountId);
    return TransactionResponse.builder()
        .transactions(view.getTransactions())
        .lastUpdated(view.getLastUpdated())  // Show data age
        .isStale(view.isOlderThan(Duration.ofMinutes(5)))
        .build();
}

// Strategy 3: Optimistic UI with confirmation
// Client shows pending transaction immediately
// Background poll confirms when read model catches up`
        }
      ]
    },
    {
      id: 'event-sourcing',
      name: 'Event Sourcing',
      icon: '📝',
      color: '#f59e0b',
      description: 'Immutable event log storing all state changes for audit trail, debugging, and compliance (PCI DSS).',
      diagram: EventSourcingDiagram,
      details: [
        {
          name: 'Event Store',
          diagram: EventSourcingDiagram,
          explanation: 'Every state change is stored as an immutable event in PostgreSQL. Events are never updated or deleted - only appended. The Event Store provides: complete audit trail for PCI DSS compliance, ability to replay events to rebuild state, temporal queries (state at any point in time), and debugging support. Events are partitioned by timestamp and indexed by eventId/aggregateId. Stores 30M events/day.',
          codeExample: `// Event Store Schema (PostgreSQL)
CREATE TABLE events (
    event_id        UUID PRIMARY KEY,
    aggregate_id    UUID NOT NULL,
    aggregate_type  VARCHAR(100) NOT NULL,
    event_type      VARCHAR(100) NOT NULL,
    event_data      JSONB NOT NULL,
    metadata        JSONB,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    version         BIGINT NOT NULL
) PARTITION BY RANGE (created_at);

-- Partitioned by month for performance
CREATE TABLE events_2024_01 PARTITION OF events
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- Indexes for query patterns
CREATE INDEX idx_events_aggregate ON events (aggregate_id, version);
CREATE INDEX idx_events_type ON events (event_type, created_at);

-- NEVER UPDATE OR DELETE - append only!
-- Old partitions archived to S3 for compliance

// Event Types
ApplicationCreated { applicationId, userId, creditScore, timestamp }
CreditCheckPassed  { applicationId, bureauId, score, timestamp }
AccountCreated     { accountId, userId, creditLimit, timestamp }
TransactionPosted  { txnId, accountId, amount, merchant, timestamp }
PaymentProcessed   { paymentId, accountId, amount, timestamp }
FraudAlertRaised   { alertId, txnId, riskScore, timestamp }`
        },
        {
          name: 'Event Replay',
          explanation: 'Events can be replayed to rebuild application state, recover from corruption, or create new projections. Replay is used for: disaster recovery (rebuild read models from events), debugging (see exact sequence of state changes), new feature development (backfill new read models with historical data), and compliance audits (prove transaction history). The process is idempotent - replaying the same events produces the same state.',
          codeExample: `// Event Replay for Recovery
@Service
public class EventReplayService {

    private final EventStore eventStore;
    private final ProjectionRegistry projections;

    // Rebuild a specific aggregate from events
    public Account rebuildAccount(String accountId) {
        List<DomainEvent> events = eventStore.getEvents(accountId);

        Account account = new Account();
        for (DomainEvent event : events) {
            account.apply(event);  // Replay each event
        }
        return account;  // Reconstructed state
    }

    // Rebuild entire read model from Event Store
    public void rebuildReadModel(String projectionName) {
        Projection projection = projections.get(projectionName);
        projection.reset();  // Clear existing data

        // Stream all events and replay
        eventStore.streamAll()
            .filter(projection::handles)
            .forEach(event -> {
                projection.project(event);
                checkpoint(event.getEventId());
            });
    }

    // Create new projection from historical events
    public void backfillNewProjection(String projectionName,
                                       Instant fromDate) {
        Projection projection = projections.get(projectionName);

        eventStore.streamFrom(fromDate)
            .filter(projection::handles)
            .forEach(projection::project);
    }
}`
        },
        {
          name: 'Kafka Integration',
          explanation: 'Events flow from the Event Store to Apache Kafka for distribution to multiple consumers. Kafka provides: publish-subscribe messaging (30M events/day), consumer groups for parallel processing, at-least-once delivery guarantees, and message ordering within partitions. Topics include ApplicationCreated, TransactionPosted, PaymentProcessed, FraudAlert, and BalanceUpdated. Consumers include Data Pipeline, Notification Service, and Analytics.',
          codeExample: `// Kafka Event Publishing
@Component
public class EventPublisher {

    private final KafkaTemplate<String, DomainEvent> kafka;
    private final EventStore eventStore;

    @TransactionalEventListener
    public void publishEvent(DomainEvent event) {
        // 1. Store in Event Store first (source of truth)
        eventStore.append(event);

        // 2. Publish to Kafka for distribution
        String topic = event.getClass().getSimpleName();
        String key = event.getAggregateId();  // Partition key

        kafka.send(topic, key, event)
            .whenComplete((result, ex) -> {
                if (ex != null) {
                    // Kafka publish failed - will retry
                    log.error("Failed to publish event", ex);
                    retryQueue.add(event);
                }
            });
    }
}

// Consumer Groups (parallel processing)
// Group: data-pipeline (updates Elasticsearch, InfluxDB)
// Group: notifications (sends Email, SMS, Push)
// Group: analytics (aggregates for reports)

@KafkaListener(
    topics = "TransactionPosted",
    groupId = "data-pipeline"
)
public void handleTransaction(TransactionPostedEvent event) {
    // Update Elasticsearch index
    elasticClient.index(event);

    // Update InfluxDB metrics
    influxClient.write(event.toMetric());

    // Invalidate Redis cache
    redis.delete("account:" + event.getAccountId());
}`
        }
      ]
    },
    {
      id: 'saga',
      name: 'Saga Pattern',
      icon: '🔄',
      color: '#ec4899',
      description: 'Distributed transaction management using orchestration with compensating transactions for rollback.',
      diagram: SagaDiagram,
      details: [
        {
          name: 'Saga Orchestration',
          diagram: SagaDiagram,
          explanation: 'The Saga pattern manages distributed transactions across microservices without 2-phase commit. An Orchestrator coordinates the saga steps, executing each local transaction in sequence. If any step fails, the Orchestrator triggers compensating transactions to undo changes. This maintains data consistency while allowing each service to have its own database. Used for card applications spanning multiple services.',
          codeExample: `// Saga Orchestrator - Card Application
@Component
public class CardApplicationSaga {

    private final ApplicationService appService;
    private final CreditBureauClient bureauClient;
    private final AccountService accountService;
    private final CardService cardService;

    @Transactional
    public SagaResult execute(ApplicationRequest request) {
        SagaContext context = new SagaContext();

        try {
            // Step 1: Validate Application
            Application app = appService.validate(request);
            context.setApplication(app);

            // Step 2: Credit Check (external API)
            CreditReport report = bureauClient.check(request.getSsn());
            if (report.getScore() < 650) {
                throw new CreditCheckFailedException();
            }
            context.setCreditReport(report);

            // Step 3: Create Account
            Account account = accountService.create(app, report);
            context.setAccount(account);

            // Step 4: Issue Card
            Card card = cardService.issue(account);
            context.setCard(card);

            return SagaResult.success(context);

        } catch (Exception e) {
            // Execute compensating transactions in reverse order
            compensate(context);
            return SagaResult.failure(e.getMessage());
        }
    }

    private void compensate(SagaContext context) {
        if (context.getCard() != null) {
            cardService.cancelCard(context.getCard().getId());
        }
        if (context.getAccount() != null) {
            accountService.closeAccount(context.getAccount().getId());
        }
        if (context.getCreditReport() != null) {
            bureauClient.cancelInquiry(context.getCreditReport().getId());
        }
        if (context.getApplication() != null) {
            appService.markInvalid(context.getApplication().getId());
        }
    }
}`
        },
        {
          name: 'Compensating Transactions',
          explanation: 'Each saga step has a compensating transaction that undoes its effects. Compensations are executed in reverse order when a step fails. They must be idempotent (safe to execute multiple times) since they may be retried. Examples: CreateAccount compensates with DeleteAccount, IssueCard compensates with CancelCard, DebitBalance compensates with CreditBalance.',
          codeExample: `// Compensating Transaction Examples

// Original: Create Account
@Transactional
public Account createAccount(Application app, CreditReport report) {
    Account account = Account.builder()
        .userId(app.getUserId())
        .creditLimit(calculateLimit(report))
        .status(AccountStatus.ACTIVE)
        .build();
    return accountRepository.save(account);
}

// Compensation: Close Account (idempotent)
@Transactional
public void closeAccount(String accountId) {
    Account account = accountRepository.findById(accountId);
    if (account != null && account.getStatus() != AccountStatus.CLOSED) {
        account.setStatus(AccountStatus.CLOSED);
        account.setClosedAt(Instant.now());
        account.setCloseReason("SAGA_COMPENSATION");
        accountRepository.save(account);

        // Publish event for downstream cleanup
        eventPublisher.publish(new AccountClosedEvent(accountId));
    }
    // Idempotent: no error if already closed
}

// Compensation must handle:
// 1. Already compensated (idempotent)
// 2. Partial state (graceful handling)
// 3. Concurrent compensations (locking)
// 4. Network failures (retry with backoff)`
        },
        {
          name: 'Circuit Breaker Integration',
          explanation: 'External service calls (Credit Bureau) use Circuit Breaker pattern for resilience. States: Closed (normal), Open (failing - reject fast), Half-Open (testing recovery). After 5 failures in 10 seconds, circuit opens and requests fail fast with fallback. This prevents cascade failures and allows external services to recover. Implemented with Resilience4j.',
          codeExample: `// Circuit Breaker for External API Calls
@Component
public class CreditBureauClient {

    private final WebClient webClient;
    private final CircuitBreakerRegistry registry;

    @CircuitBreaker(name = "creditBureau", fallbackMethod = "fallback")
    @Retry(name = "creditBureau", maxAttempts = 3)
    @TimeLimiter(name = "creditBureau", timeoutDuration = 3s)
    public CreditReport check(String ssn) {
        return webClient.post()
            .uri("/credit-check")
            .bodyValue(new CreditCheckRequest(ssn))
            .retrieve()
            .bodyToMono(CreditReport.class)
            .block();
    }

    // Fallback when circuit is open
    public CreditReport fallback(String ssn, Exception e) {
        log.warn("Credit check failed, queueing for manual review", e);

        // Queue for manual review instead of failing
        manualReviewQueue.add(new ManualReviewRequest(ssn));

        throw new CircuitOpenException("Credit Bureau unavailable");
    }
}

// Circuit Breaker Configuration (application.yml)
resilience4j:
  circuitbreaker:
    instances:
      creditBureau:
        slidingWindowSize: 10
        failureRateThreshold: 50
        waitDurationInOpenState: 30s
        permittedNumberOfCallsInHalfOpenState: 3
  retry:
    instances:
      creditBureau:
        maxAttempts: 3
        waitDuration: 500ms
        exponentialBackoffMultiplier: 2`
        }
      ]
    },
    {
      id: 'databases',
      name: 'Database Architecture',
      icon: '💾',
      color: '#6366f1',
      description: '8 database technologies implementing polyglot persistence optimized for different access patterns.',
      diagram: DatabaseDiagram,
      details: [
        {
          name: 'Write Side Databases',
          diagram: DatabaseDiagram,
          explanation: 'Write databases are optimized for consistency and durability: MongoDB (5 shards, 2M users/shard) for high-throughput transactions, PostgreSQL (1 Primary + 2 Replicas) for ACID account operations, PostgreSQL Event Store for immutable audit logs, and Redis for idempotency keys (24h TTL) and rate limiting. All use normalized schemas with strong consistency guarantees.',
          codeExample: `// Write Side Database Configuration

// 1. MongoDB (Transactions) - High Write Throughput
{
  "cluster": "atlas-cluster",
  "shards": 5,
  "shardKey": { "userId": "hashed" },
  "usersPerShard": "2M",
  "writeConcern": "majority",
  "readConcern": "linearizable"
}

// 2. PostgreSQL (Accounts) - ACID Transactions
-- Primary for writes, 2 replicas for reads
CREATE TABLE accounts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    balance DECIMAL(15,2) NOT NULL,
    credit_limit DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    version BIGINT NOT NULL  -- Optimistic locking
);

-- Sync replication to 1 replica (consistency)
-- Async replication to 2nd replica (availability)

// 3. Redis (Idempotency + Rate Limiting)
// Idempotency: SETEX key value 86400 (24h TTL)
// Rate Limit: INCR user:rate:123 + EXPIRE 60`
        },
        {
          name: 'Read Side Databases',
          diagram: DatabaseDiagram,
          explanation: 'Read databases are optimized for query speed with denormalized data: Redis Cache (92% hit rate, <1ms) for hot data, Elasticsearch (3-node cluster) for full-text search, InfluxDB for real-time time-series metrics (1-sec granularity, 90-day retention), and Snowflake for historical analytics (multi-TB, nightly ETL). Updated asynchronously via Kafka with 5-15 min eventual consistency.',
          codeExample: `// Read Side Database Configuration

// 1. Redis Cache - Ultra-Fast Reads
{
  "cluster": "3 masters + 3 replicas",
  "hashSlots": 16384,
  "evictionPolicy": "allkeys-lru",
  "maxMemory": "24GB",
  "hitRate": "92%",
  "latency": "<1ms"
}

// Cache patterns:
SET account:{id} {json} EX 300  // 5 min TTL
SET transactions:{id} {json} EX 60  // 1 min TTL

// 2. Elasticsearch - Full-Text Search
{
  "cluster": "3 nodes",
  "indices": "transactions-{YYYY-MM}",  // Monthly rollover
  "shardsPerIndex": 5,
  "replicasPerShard": 1,
  "refreshInterval": "5s"
}

// 3. InfluxDB - Time-Series Metrics
CREATE DATABASE metrics
  WITH DURATION 90d  // 90-day retention
  REPLICATION 2
  SHARD DURATION 7d  // Weekly shards

// 4. Snowflake - Historical Analytics
-- Nightly batch ETL from MongoDB
-- Multi-TB storage, 5+ year retention
-- Separate compute warehouses for BI`
        },
        {
          name: 'Kafka Event Bus',
          explanation: 'Apache Kafka connects write and read databases as the event bus. Configuration: 3-node cluster, replication factor 3, 10 partitions per topic, 30M events/day. Topics: ApplicationCreated, TransactionPosted, PaymentProcessed, FraudAlert, BalanceUpdated. Consumer groups enable parallel processing: data-pipeline (updates read DBs), notifications (sends alerts), analytics (aggregates metrics).',
          codeExample: `// Kafka Configuration

// Cluster Setup
brokers: 3
replicationFactor: 3
minInSyncReplicas: 2
partitions: 10 per topic

// Topics and Throughput
topics:
  ApplicationCreated: 100K events/day
  TransactionPosted: 30M events/day
  PaymentProcessed: 5M events/day
  FraudAlert: 10K events/day
  BalanceUpdated: 30M events/day

// Consumer Groups
consumer-groups:
  data-pipeline:
    topics: [TransactionPosted, PaymentProcessed, BalanceUpdated]
    consumers: 10
    action: Update Elasticsearch, InfluxDB, Redis
    lag: 5-15 minutes (acceptable)

  notifications:
    topics: [TransactionPosted, FraudAlert]
    consumers: 5
    action: Send Email, SMS, Push
    lag: <1 minute (critical for fraud)

  analytics:
    topics: [TransactionPosted, PaymentProcessed]
    consumers: 3
    action: Aggregate for InfluxDB dashboards
    lag: 15 minutes (acceptable)

// Schema Registry (Avro)
schemas:
  TransactionPosted:
    fields: [txnId, accountId, amount, merchant, timestamp]
    compatibility: BACKWARD`
        }
      ]
    },
    {
      id: 'flows',
      name: 'Feature Flows',
      icon: '🔀',
      color: '#3b82f6',
      description: 'End-to-end request flows for card applications, transactions, payments, and analytics.',
      diagram: FlowDiagram,
      details: [
        {
          name: 'Transaction Flow',
          diagram: FlowDiagram,
          explanation: 'Transaction flow (<100ms): (1) Client POST → (2) API Gateway validates JWT, checks rate limit → (3) Command Service validates, checks idempotency → (4) Fraud Detection ML scores (XGBoost, <50ms) → (5) Write to MongoDB (transaction) and Event Store → (6) Publish to Kafka → (7) Async: Projections update Elasticsearch/Redis, Notifications send alerts, Analytics update InfluxDB.',
          codeExample: `// Transaction Flow - Step by Step

// 1. Client Request
POST /api/transactions
Authorization: Bearer <jwt>
Idempotency-Key: uuid-123
{
  "accountId": "acc-456",
  "amount": 2450.00,
  "merchantId": "airline-789",
  "category": "travel"
}

// 2. API Gateway (Kong)
- Validate JWT (15 min expiry)
- Check rate limit (1000 req/min)
- Log request to ELK
- Route to Transaction Service

// 3. Command Service
- Check idempotency key in Redis
- Validate account exists and active
- Check sufficient credit limit

// 4. Fraud Detection (XGBoost ML)
{
  "riskScore": 12,  // 0-100
  "decision": "APPROVE",
  "features": {
    "amountDeviation": 1.2,
    "locationRisk": "LOW",
    "merchantRisk": "LOW",
    "velocityScore": 0.3
  },
  "latency": "47ms"
}

// 5. Write to Databases
MongoDB: Insert transaction document
Event Store: Append TransactionPosted event

// 6. Publish to Kafka
Topic: TransactionPosted
Partition: hash(accountId) % 10

// 7. Async Consumers
- Elasticsearch: Index for search
- Redis: Invalidate account cache
- Notifications: SMS confirmation
- InfluxDB: Update spending metrics`
        },
        {
          name: 'Application Flow',
          explanation: 'Card application flow (5-10 seconds) uses Saga pattern: (1) Client submits application → (2) Gateway validates, rate limits (10 apps/day) → (3) Saga Orchestrator coordinates → (4) Step 1: Validate application data → (5) Step 2: Call Credit Bureau API (Circuit Breaker, 3s timeout) → (6) Step 3: Create account in PostgreSQL → (7) Step 4: Issue card → (8) Publish ApplicationCreated to Kafka → (9) Send confirmation email.',
          codeExample: `// Card Application Saga Flow

// Timeline: 5-10 seconds total
// Pattern: Saga Orchestration with Compensating Transactions

Step 1: Validate Application (50ms)
  Service: Application Service
  Action: Validate personal info, check duplicates
  Compensate: Mark application as invalid

Step 2: Credit Check (2-3s)
  Service: Credit Bureau API (external)
  Action: Pull credit report, get score
  Circuit Breaker: 3s timeout, 3 retries
  Fallback: Queue for manual review
  Compensate: Cancel credit inquiry

Step 3: Create Account (100ms)
  Service: Account Service
  Action: Create account in PostgreSQL
  Credit Limit: Based on credit score
  Compensate: Close and delete account

Step 4: Issue Card (500ms)
  Service: Card Service
  Action: Generate card number, set PIN
  Compensate: Cancel card issuance

// On Success:
Publish: ApplicationCreated event to Kafka
Email: Send approval confirmation
SMS: Send card arrival ETA

// On Failure (any step):
Execute compensations in reverse order
Email: Send rejection with reason
Log: Full saga trace for debugging`
        },
        {
          name: 'Analytics Flow',
          explanation: 'Analytics flow (real-time to 15-min lag): (1) Kafka Streams consumes TransactionPosted events → (2) Windowed aggregations (1-min, 5-min, 1-hour) → (3) Write to InfluxDB (1-sec granularity) → (4) Grafana dashboards query InfluxDB → (5) For historical analytics, nightly ETL to Snowflake (2 AM, 2-hour window) → (6) Tableau/BI tools query Snowflake for reports.',
          codeExample: `// Real-Time Analytics Pipeline

// Kafka Streams Topology
StreamsBuilder builder = new StreamsBuilder();

KStream<String, TransactionEvent> transactions =
    builder.stream("TransactionPosted");

// Windowed aggregation: spending by category
KTable<Windowed<String>, SpendingStats> categoryStats =
    transactions
        .groupBy((key, txn) -> txn.getCategory())
        .windowedBy(TimeWindows.of(Duration.ofMinutes(5)))
        .aggregate(
            SpendingStats::new,
            (key, txn, stats) -> stats.add(txn.getAmount()),
            Materialized.as("category-stats-store")
        );

// Write to InfluxDB
categoryStats.toStream()
    .foreach((window, stats) -> {
        Point point = Point.measurement("spending_by_category")
            .tag("category", window.key())
            .addField("total", stats.getTotal())
            .addField("count", stats.getCount())
            .addField("average", stats.getAverage())
            .time(window.window().end(), WritePrecision.MS);
        influxDB.write(point);
    });

// Grafana Dashboard Query (InfluxQL)
SELECT mean("total") FROM "spending_by_category"
WHERE time > now() - 24h
GROUP BY time(1h), "category"

// Nightly ETL to Snowflake
-- Runs at 2 AM, 2-hour window
COPY INTO snowflake.transactions
FROM @mongodb_stage/transactions/
FILE_FORMAT = (TYPE = 'JSON');`
        }
      ]
    },
    {
      id: 'gateway',
      name: 'API Gateway',
      icon: '🚪',
      color: '#8b5cf6',
      description: 'Kong API Gateway providing authentication, rate limiting, routing, and security (WAF, DDoS protection).',
      diagram: GatewayDiagram,
      details: [
        {
          name: 'Authentication & Authorization',
          diagram: GatewayDiagram,
          explanation: 'Authentication uses OAuth 2.0 with JWT tokens. Access tokens expire in 15 minutes, refresh tokens in 7 days. JWT contains userId, roles, and permissions. The gateway validates tokens on every request without hitting the auth service (signature verification). MFA required for high-value operations. API keys used for 3rd party integrations with scoped permissions.',
          codeExample: `// JWT Token Structure
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user-123",
    "iss": "creditcard-portal",
    "iat": 1704067200,
    "exp": 1704068100,  // 15 min expiry
    "roles": ["customer"],
    "permissions": ["read:account", "write:transaction"],
    "mfa_verified": true
  },
  "signature": "..."
}

// Kong JWT Plugin Configuration
plugins:
  - name: jwt
    config:
      secret_is_base64: false
      claims_to_verify:
        - exp  # Expiration
        - iss  # Issuer
      run_on_preflight: true

// Refresh Token Flow
POST /oauth/token
{
  "grant_type": "refresh_token",
  "refresh_token": "rt_xxxxx",
  "client_id": "mobile-app"
}

// Response
{
  "access_token": "eyJhbG...",
  "token_type": "Bearer",
  "expires_in": 900,  // 15 min
  "refresh_token": "rt_yyyyy"  // Rotated
}`
        },
        {
          name: 'Rate Limiting',
          explanation: 'Rate limiting uses Token Bucket algorithm implemented in Redis. Default: 1000 requests/minute per user. Burst: 100 requests allowed instantly. Premium users get higher limits. Trusted sources (payment networks) bypass rate limiting. Response includes X-RateLimit headers showing remaining quota. 429 Too Many Requests returned when exceeded.',
          codeExample: `// Rate Limiting with Token Bucket (Redis)

// Kong Rate Limiting Plugin
plugins:
  - name: rate-limiting
    config:
      second: null
      minute: 1000  # 1000 req/min per user
      hour: null
      policy: redis
      redis_host: redis-cluster
      redis_port: 6379
      identifier: consumer  # Per user

// Token Bucket Algorithm (Lua in Kong)
local function check_rate_limit(user_id, limit, window)
    local key = "rate:" .. user_id
    local current = redis.call("INCR", key)

    if current == 1 then
        redis.call("EXPIRE", key, window)
    end

    if current > limit then
        return false, limit - current  -- Exceeded
    end

    return true, limit - current  -- Allowed
end

// Response Headers
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1704067260

// When Exceeded
HTTP/1.1 429 Too Many Requests
Retry-After: 45
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Retry after 45 seconds."
}`
        },
        {
          name: 'Security (WAF & DDoS)',
          explanation: 'Web Application Firewall (WAF) protects against SQL injection, XSS, and OWASP Top 10. DDoS protection at Layer 7 with anomaly detection. All traffic is TLS 1.3. IP reputation checking blocks known bad actors. Geo-blocking for regions not served. Request/response logging for security audits (100GB logs/day, 7-day hot, 90-day cold storage).',
          codeExample: `// WAF Configuration (ModSecurity rules)

# SQL Injection Prevention
SecRule ARGS "@detectSQLi" \\
    "id:942100,\\
    phase:2,\\
    block,\\
    msg:'SQL Injection Attack Detected',\\
    logdata:'Matched Data: %{TX.0}'"

# XSS Prevention
SecRule ARGS "@detectXSS" \\
    "id:941100,\\
    phase:2,\\
    block,\\
    msg:'XSS Attack Detected'"

# DDoS Protection Rules
SecRule IP:REQUESTS_PER_SECOND "@gt 100" \\
    "id:900001,\\
    phase:1,\\
    block,\\
    msg:'DDoS - Request rate too high'"

// TLS Configuration
ssl_protocols TLSv1.3;
ssl_ciphers 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256';
ssl_prefer_server_ciphers on;
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;

// IP Reputation Check
- name: ip-restriction
  config:
    deny:
      - known_bad_ips.txt
    allow:
      - trusted_partners.txt`
        }
      ]
    },
    {
      id: 'observability',
      name: 'Observability',
      icon: '📊',
      color: '#10b981',
      description: 'Prometheus metrics, Grafana dashboards, ELK logging, and Jaeger distributed tracing.',
      diagram: ObservabilityDiagram,
      details: [
        {
          name: 'Metrics (Prometheus + Grafana)',
          diagram: ObservabilityDiagram,
          explanation: 'Prometheus scrapes metrics from all services every 15 seconds. Key metrics: request latency (p50, p95, p99), error rate, throughput, CPU/memory usage, database connection pool, Kafka consumer lag. Grafana dashboards visualize real-time data. Alerts trigger when: latency >500ms, error rate >1%, CPU >80%. 30-day retention for metrics.',
          codeExample: `// Prometheus Metrics Instrumentation (Spring Boot)

@Component
public class MetricsConfig {

    private final MeterRegistry registry;

    // Request latency histogram
    private final Timer requestLatency = Timer.builder("http_request_duration")
        .publishPercentiles(0.5, 0.95, 0.99)
        .register(registry);

    // Transaction counter
    private final Counter transactionCounter = Counter.builder("transactions_total")
        .tag("status", "success")
        .register(registry);

    // Kafka consumer lag gauge
    private final AtomicLong consumerLag = registry.gauge(
        "kafka_consumer_lag",
        new AtomicLong(0)
    );
}

// Prometheus scrape config
scrape_configs:
  - job_name: 'credit-card-portal'
    scrape_interval: 15s
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app]
        regex: credit-card-.*
        action: keep

// Alert Rules
groups:
  - name: credit-card-alerts
    rules:
      - alert: HighLatency
        expr: http_request_duration_seconds{quantile="0.99"} > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"

      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.01
        for: 2m
        labels:
          severity: critical`
        },
        {
          name: 'Logging (ELK Stack)',
          explanation: 'Centralized logging with Elasticsearch, Logstash, Kibana (ELK). All services log in JSON format with correlation IDs for tracing. 100GB logs/day ingested. Hot storage: 7 days (fast queries). Cold storage: 90 days (compliance). Log levels: ERROR (always), WARN (important), INFO (requests), DEBUG (development). PII masked in logs.',
          codeExample: `// Structured JSON Logging (Logback)

<appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder">
        <includeMdcKeyName>correlationId</includeMdcKeyName>
        <includeMdcKeyName>userId</includeMdcKeyName>
        <includeMdcKeyName>requestId</includeMdcKeyName>
    </encoder>
</appender>

// Log Output (JSON)
{
  "@timestamp": "2024-01-01T12:00:00.000Z",
  "level": "INFO",
  "logger": "TransactionService",
  "message": "Transaction processed",
  "correlationId": "abc-123",
  "userId": "user-456",
  "requestId": "req-789",
  "transactionId": "txn-012",
  "amount": "***MASKED***",  // PII masked
  "duration_ms": 47,
  "service": "transaction-service",
  "pod": "txn-service-pod-abc"
}

// Kibana Query Examples
// Find all errors for a user
userId: "user-456" AND level: "ERROR"

// Trace a request across services
correlationId: "abc-123"

// Slow transactions
duration_ms: >500 AND message: "Transaction processed"`
        },
        {
          name: 'Distributed Tracing (Jaeger)',
          explanation: 'Jaeger traces requests across all microservices. Each request gets a trace ID propagated via headers. Spans show timing for each service call, database query, and external API. Used to debug latency issues and understand request flow. Sampling rate: 1% for normal traffic, 100% for errors. Trace retention: 7 days.',
          codeExample: `// OpenTelemetry Tracing Configuration

@Configuration
public class TracingConfig {

    @Bean
    public Tracer jaegerTracer() {
        return new JaegerTracer.Builder("transaction-service")
            .withSampler(new ProbabilisticSampler(0.01))  // 1% sampling
            .withReporter(new RemoteReporter.Builder()
                .withSender(new HttpSender("http://jaeger:14268/api/traces"))
                .build())
            .build();
    }
}

// Trace Propagation Headers
traceparent: 00-abc123-def456-01
tracestate: jaeger=abc123

// Creating Spans
@Traced
public Payment processPayment(PaymentRequest request) {
    Span span = tracer.buildSpan("process-payment").start();
    try (Scope scope = tracer.activateSpan(span)) {
        span.setTag("account.id", request.getAccountId());
        span.setTag("amount", request.getAmount());

        // Child span for fraud check
        Span fraudSpan = tracer.buildSpan("fraud-check").start();
        FraudResult result = fraudService.check(request);
        fraudSpan.setTag("risk.score", result.getScore());
        fraudSpan.finish();

        // Continue with payment...
        return payment;
    } finally {
        span.finish();
    }
}

// Jaeger UI shows:
// transaction-service (parent span, 150ms)
//   ├── fraud-check (47ms)
//   ├── mongodb-write (23ms)
//   ├── event-store-append (15ms)
//   └── kafka-publish (8ms)`
        }
      ]
    }
  ]

  // Navigation handlers
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

  // Breadcrumb configuration
  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'System Design', icon: '🏗️', page: 'design' },
      { name: 'Credit Card Portal', icon: '💳', page: 'CreditCardPortal3' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
    }
  }

  // Keyboard navigation
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

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #4c1d95 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(139, 92, 246, 0.2)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#a78bfa',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Credit Card Portal</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '1rem' }}>
            System Design for 10M Users | 30M Transactions/Day | CQRS + Event Sourcing
          </p>
        </div>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to Design
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={TOPIC_COLORS}
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
        primaryColor={TOPIC_COLORS.primary}
      />


      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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

      {/* Modal */}
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

export default CreditCardPortal3

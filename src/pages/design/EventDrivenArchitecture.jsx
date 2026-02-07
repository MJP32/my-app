import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#ec4899',
  primaryHover: '#f472b6',
  bg: 'rgba(236, 72, 153, 0.1)',
  border: 'rgba(236, 72, 153, 0.3)',
  arrow: '#ec4899',
  hoverBg: 'rgba(236, 72, 153, 0.2)',
  topicBg: 'rgba(236, 72, 153, 0.2)'
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
// SVG DIAGRAM COMPONENTS
// =============================================================================

const EventDrivenOverviewDiagram = () => (
  <svg viewBox="0 0 900 400" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1.5rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="producerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="brokerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="consumerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
      <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
      </marker>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.2"/>
      </filter>
    </defs>

    <text x="450" y="30" fontSize="18" fontWeight="bold" fill="#e5e7eb" textAnchor="middle">Event-Driven Architecture Overview</text>

    <rect x="30" y="80" width="180" height="260" rx="12" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
    <text x="120" y="105" fontSize="14" fontWeight="bold" fill="#10b981" textAnchor="middle">EVENT PRODUCERS</text>

    <rect x="50" y="125" width="140" height="55" rx="8" fill="url(#producerGrad)" filter="url(#shadow)" />
    <text x="120" y="150" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Order Service</text>
    <text x="120" y="168" fontSize="10" fill="rgba(255,255,255,0.8)" textAnchor="middle">OrderCreated</text>

    <rect x="50" y="195" width="140" height="55" rx="8" fill="url(#producerGrad)" filter="url(#shadow)" />
    <text x="120" y="220" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Payment Service</text>
    <text x="120" y="238" fontSize="10" fill="rgba(255,255,255,0.8)" textAnchor="middle">PaymentProcessed</text>

    <rect x="50" y="265" width="140" height="55" rx="8" fill="url(#producerGrad)" filter="url(#shadow)" />
    <text x="120" y="290" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">User Service</text>
    <text x="120" y="308" fontSize="10" fill="rgba(255,255,255,0.8)" textAnchor="middle">UserRegistered</text>

    <rect x="330" y="100" width="240" height="220" rx="16" fill="url(#brokerGrad)" filter="url(#shadow)" />
    <text x="450" y="135" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">EVENT BROKER</text>

    <rect x="355" y="155" width="190" height="40" rx="6" fill="rgba(255,255,255,0.2)" />
    <text x="450" y="180" fontSize="11" fill="white" textAnchor="middle">Topic: orders</text>

    <rect x="355" y="205" width="190" height="40" rx="6" fill="rgba(255,255,255,0.2)" />
    <text x="450" y="230" fontSize="11" fill="white" textAnchor="middle">Topic: payments</text>

    <rect x="355" y="255" width="190" height="40" rx="6" fill="rgba(255,255,255,0.2)" />
    <text x="450" y="280" fontSize="11" fill="white" textAnchor="middle">Topic: users</text>

    <rect x="690" y="80" width="180" height="260" rx="12" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" />
    <text x="780" y="105" fontSize="14" fontWeight="bold" fill="#8b5cf6" textAnchor="middle">EVENT CONSUMERS</text>

    <rect x="710" y="125" width="140" height="55" rx="8" fill="url(#consumerGrad)" filter="url(#shadow)" />
    <text x="780" y="150" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Email Service</text>
    <text x="780" y="168" fontSize="10" fill="rgba(255,255,255,0.8)" textAnchor="middle">Send notifications</text>

    <rect x="710" y="195" width="140" height="55" rx="8" fill="url(#consumerGrad)" filter="url(#shadow)" />
    <text x="780" y="220" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Analytics Service</text>
    <text x="780" y="238" fontSize="10" fill="rgba(255,255,255,0.8)" textAnchor="middle">Track metrics</text>

    <rect x="710" y="265" width="140" height="55" rx="8" fill="url(#consumerGrad)" filter="url(#shadow)" />
    <text x="780" y="290" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Inventory Service</text>
    <text x="780" y="308" fontSize="10" fill="rgba(255,255,255,0.8)" textAnchor="middle">Update stock</text>

    <path d="M190,152 Q260,152 330,175" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowGreen)" />
    <path d="M190,222 Q260,222 330,225" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowGreen)" />
    <path d="M190,292 Q260,292 330,275" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowGreen)" />

    <path d="M570,175 Q640,152 710,152" fill="none" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowOrange)" />
    <path d="M570,225 Q640,222 710,222" fill="none" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowOrange)" />
    <path d="M570,275 Q640,292 710,292" fill="none" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowOrange)" />

    <text x="260" y="370" fontSize="11" fill="#9ca3af" textAnchor="middle">Publish Events</text>
    <text x="640" y="370" fontSize="11" fill="#9ca3af" textAnchor="middle">{`Subscribe & Consume`}</text>
  </svg>
)

const EventSourcingDiagram = () => (
  <svg viewBox="0 0 900 420" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1.5rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="eventStoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="commandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="projectionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
      </marker>
      <marker id="arrowPink" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#ec4899" />
      </marker>
      <marker id="arrowTeal" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#14b8a6" />
      </marker>
    </defs>

    <text x="450" y="30" fontSize="18" fontWeight="bold" fill="#e5e7eb" textAnchor="middle">Event Sourcing Pattern</text>

    <rect x="30" y="160" width="140" height="80" rx="10" fill="url(#commandGrad)" />
    <text x="100" y="195" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Command</text>
    <text x="100" y="215" fontSize="10" fill="rgba(255,255,255,0.8)" textAnchor="middle">CreateOrder</text>

    <rect x="220" y="160" width="140" height="80" rx="10" fill="#4b5563" stroke="#6b7280" strokeWidth="2" />
    <text x="290" y="195" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Command</text>
    <text x="290" y="212" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Handler</text>

    <rect x="410" y="100" width="180" height="200" rx="12" fill="url(#eventStoreGrad)" />
    <text x="500" y="130" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">EVENT STORE</text>
    <text x="500" y="148" fontSize="10" fill="rgba(255,255,255,0.7)" textAnchor="middle">(Source of Truth)</text>

    <rect x="425" y="165" width="150" height="28" rx="4" fill="rgba(255,255,255,0.15)" />
    <text x="500" y="184" fontSize="9" fill="white" textAnchor="middle">1. OrderCreated - 10:01</text>

    <rect x="425" y="200" width="150" height="28" rx="4" fill="rgba(255,255,255,0.15)" />
    <text x="500" y="219" fontSize="9" fill="white" textAnchor="middle">2. ItemAdded - 10:02</text>

    <rect x="425" y="235" width="150" height="28" rx="4" fill="rgba(255,255,255,0.15)" />
    <text x="500" y="254" fontSize="9" fill="white" textAnchor="middle">3. PaymentReceived - 10:05</text>

    <rect x="425" y="270" width="150" height="28" rx="4" fill="rgba(255,255,255,0.2)" />
    <text x="500" y="289" fontSize="9" fill="white" textAnchor="middle">4. OrderShipped - 10:15</text>

    <rect x="650" y="90" width="140" height="70" rx="8" fill="url(#projectionGrad)" />
    <text x="720" y="120" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Order View</text>
    <text x="720" y="138" fontSize="9" fill="rgba(255,255,255,0.8)" textAnchor="middle">Read Model</text>

    <rect x="650" y="175" width="140" height="70" rx="8" fill="url(#projectionGrad)" />
    <text x="720" y="205" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Analytics View</text>
    <text x="720" y="223" fontSize="9" fill="rgba(255,255,255,0.8)" textAnchor="middle">Read Model</text>

    <rect x="650" y="260" width="140" height="70" rx="8" fill="url(#projectionGrad)" />
    <text x="720" y="290" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Search Index</text>
    <text x="720" y="308" fontSize="9" fill="rgba(255,255,255,0.8)" textAnchor="middle">Read Model</text>

    <rect x="200" y="320" width="180" height="60" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />
    <text x="290" y="348" fontSize="11" fontWeight="600" fill="#e5e7eb" textAnchor="middle">Aggregate</text>
    <text x="290" y="365" fontSize="9" fill="#9ca3af" textAnchor="middle">Rebuild by replaying events</text>

    <path d="M170,200 L215,200" fill="none" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowPink)" />
    <path d="M360,200 L405,200" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />
    <path d="M590,125 L645,125" fill="none" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)" />
    <path d="M590,210 L645,210" fill="none" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)" />
    <path d="M590,295 L645,295" fill="none" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)" />

    <path d="M500,300 L500,330 L385,350" fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowBlue)" />

    <text x="100" y="400" fontSize="10" fill="#9ca3af" textAnchor="middle">Write Side</text>
    <text x="500" y="400" fontSize="10" fill="#9ca3af" textAnchor="middle">Immutable Event Log</text>
    <text x="720" y="400" fontSize="10" fill="#9ca3af" textAnchor="middle">Read Side (Projections)</text>
  </svg>
)

const CQRSDiagram = () => (
  <svg viewBox="0 0 900 450" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1.5rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="writeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="readGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
      </marker>
      <marker id="arrowGreenCQRS" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#22c55e" />
      </marker>
      <marker id="arrowIndigo" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#6366f1" />
      </marker>
    </defs>

    <text x="450" y="30" fontSize="18" fontWeight="bold" fill="#e5e7eb" textAnchor="middle">CQRS - Command Query Responsibility Segregation</text>

    <rect x="380" y="60" width="140" height="60" rx="10" fill="#374151" stroke="#4b5563" strokeWidth="2" />
    <text x="450" y="95" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Client / UI</text>

    <rect x="50" y="170" width="350" height="230" rx="12" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
    <text x="225" y="195" fontSize="14" fontWeight="bold" fill="#ef4444" textAnchor="middle">WRITE SIDE (Commands)</text>

    <rect x="80" y="220" width="120" height="50" rx="8" fill="url(#writeGrad)" />
    <text x="140" y="250" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Command</text>

    <rect x="80" y="290" width="120" height="50" rx="8" fill="url(#writeGrad)" />
    <text x="140" y="320" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Command Handler</text>

    <rect x="250" y="255" width="120" height="80" rx="8" fill="url(#dbGrad)" />
    <text x="310" y="290" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Write DB</text>
    <text x="310" y="310" fontSize="9" fill="rgba(255,255,255,0.7)" textAnchor="middle">(Normalized)</text>

    <rect x="500" y="170" width="350" height="230" rx="12" fill="rgba(34, 197, 94, 0.08)" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" />
    <text x="675" y="195" fontSize="14" fontWeight="bold" fill="#22c55e" textAnchor="middle">READ SIDE (Queries)</text>

    <rect x="700" y="220" width="120" height="50" rx="8" fill="url(#readGrad)" />
    <text x="760" y="250" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Query</text>

    <rect x="700" y="290" width="120" height="50" rx="8" fill="url(#readGrad)" />
    <text x="760" y="320" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Query Handler</text>

    <rect x="530" y="255" width="120" height="80" rx="8" fill="url(#dbGrad)" />
    <text x="590" y="290" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Read DB</text>
    <text x="590" y="310" fontSize="9" fill="rgba(255,255,255,0.7)" textAnchor="middle">(Denormalized)</text>

    <path d="M370,295 L530,295" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="8,4" />
    <text x="450" y="285" fontSize="9" fill="#a5b4fc" textAnchor="middle">Event Sync</text>

    <path d="M410,120 L180,220" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
    <path d="M490,120 L720,220" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreenCQRS)" />

    <path d="M140,270 L140,285" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
    <path d="M200,315 L245,295" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />

    <path d="M760,270 L760,285" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreenCQRS)" />
    <path d="M700,315 L655,295" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreenCQRS)" />

    <text x="225" y="420" fontSize="10" fill="#9ca3af" textAnchor="middle">Optimized for writes</text>
    <text x="675" y="420" fontSize="10" fill="#9ca3af" textAnchor="middle">Optimized for reads</text>
  </svg>
)

const SagaPatternDiagram = () => (
  <svg viewBox="0 0 950 500" style={{ width: '100%', maxWidth: '950px', height: 'auto', margin: '1.5rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="sagaStepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="compensateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="orchestratorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowAmber" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
      </marker>
      <marker id="arrowRedComp" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
      </marker>
      <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="475" y="30" fontSize="18" fontWeight="bold" fill="#e5e7eb" textAnchor="middle">Saga Pattern - Distributed Transactions</text>

    <rect x="30" y="55" width="890" height="180" rx="12" fill="rgba(245, 158, 11, 0.05)" stroke="#f59e0b" strokeWidth="2" />
    <text x="475" y="80" fontSize="14" fontWeight="bold" fill="#f59e0b" textAnchor="middle">Choreography-based Saga (Event-driven)</text>

    <rect x="60" y="100" width="130" height="60" rx="8" fill="url(#sagaStepGrad)" />
    <text x="125" y="125" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Order Service</text>
    <text x="125" y="143" fontSize="9" fill="rgba(255,255,255,0.8)" textAnchor="middle">Create Order</text>

    <rect x="250" y="100" width="130" height="60" rx="8" fill="url(#sagaStepGrad)" />
    <text x="315" y="125" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Payment Service</text>
    <text x="315" y="143" fontSize="9" fill="rgba(255,255,255,0.8)" textAnchor="middle">Process Payment</text>

    <rect x="440" y="100" width="130" height="60" rx="8" fill="url(#sagaStepGrad)" />
    <text x="505" y="125" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Inventory Service</text>
    <text x="505" y="143" fontSize="9" fill="rgba(255,255,255,0.8)" textAnchor="middle">Reserve Items</text>

    <rect x="630" y="100" width="130" height="60" rx="8" fill="url(#sagaStepGrad)" />
    <text x="695" y="125" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Shipping Service</text>
    <text x="695" y="143" fontSize="9" fill="rgba(255,255,255,0.8)" textAnchor="middle">Schedule Delivery</text>

    <rect x="820" y="100" width="80" height="60" rx="8" fill="#22c55e" />
    <text x="860" y="135" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Done</text>

    <path d="M190,130 L245,130" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)" />
    <text x="217" y="120" fontSize="8" fill="#fbbf24">OrderCreated</text>

    <path d="M380,130 L435,130" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)" />
    <text x="407" y="120" fontSize="8" fill="#fbbf24">PaymentDone</text>

    <path d="M570,130 L625,130" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)" />
    <text x="597" y="120" fontSize="8" fill="#fbbf24">ItemsReserved</text>

    <path d="M760,130 L815,130" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)" />

    <path d="M315,165 Q315,195 190,195 L125,195 L125,165" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrowRedComp)" />
    <text x="220" y="210" fontSize="8" fill="#f87171">PaymentFailed - Cancel Order</text>

    <rect x="30" y="260" width="890" height="220" rx="12" fill="rgba(139, 92, 246, 0.05)" stroke="#8b5cf6" strokeWidth="2" />
    <text x="475" y="285" fontSize="14" fontWeight="bold" fill="#8b5cf6" textAnchor="middle">Orchestration-based Saga (Central Coordinator)</text>

    <rect x="380" y="310" width="190" height="70" rx="10" fill="url(#orchestratorGrad)" />
    <text x="475" y="340" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Saga Orchestrator</text>
    <text x="475" y="360" fontSize="10" fill="rgba(255,255,255,0.8)" textAnchor="middle">OrderSagaOrchestrator</text>

    <rect x="60" y="415" width="120" height="50" rx="8" fill="#4b5563" stroke="#6b7280" strokeWidth="2" />
    <text x="120" y="445" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">Order Service</text>

    <rect x="230" y="415" width="120" height="50" rx="8" fill="#4b5563" stroke="#6b7280" strokeWidth="2" />
    <text x="290" y="445" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">Payment Service</text>

    <rect x="400" y="415" width="120" height="50" rx="8" fill="#4b5563" stroke="#6b7280" strokeWidth="2" />
    <text x="460" y="445" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">Inventory Service</text>

    <rect x="570" y="415" width="120" height="50" rx="8" fill="#4b5563" stroke="#6b7280" strokeWidth="2" />
    <text x="630" y="445" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">Shipping Service</text>

    <path d="M420,380 L120,410" fill="none" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" />
    <path d="M445,380 L290,410" fill="none" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" />
    <path d="M475,380 L460,410" fill="none" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" />
    <path d="M505,380 L630,410" fill="none" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" />

    <rect x="750" y="310" width="150" height="100" rx="8" fill="rgba(0,0,0,0.2)" />
    <text x="825" y="330" fontSize="10" fontWeight="600" fill="#e5e7eb" textAnchor="middle">Legend</text>
    <line x1="770" y1="350" x2="800" y2="350" stroke="#f59e0b" strokeWidth="2" />
    <text x="820" y="354" fontSize="9" fill="#9ca3af">Forward flow</text>
    <line x1="770" y1="375" x2="800" y2="375" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,3" />
    <text x="832" y="379" fontSize="9" fill="#9ca3af">Compensation</text>
  </svg>
)

const EventBrokerComparisonDiagram = () => (
  <svg viewBox="0 0 950 520" style={{ width: '100%', maxWidth: '950px', height: 'auto', margin: '1.5rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="kafkaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1a1a2e', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="rabbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6600', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#e55d00', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="eventBridgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff9900', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#eb8c00', stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <text x="475" y="30" fontSize="18" fontWeight="bold" fill="#e5e7eb" textAnchor="middle">Event Broker Comparison</text>

    <rect x="30" y="60" width="280" height="440" rx="12" fill="rgba(0, 0, 0, 0.3)" stroke="#374151" strokeWidth="2" />
    <rect x="30" y="60" width="280" height="60" rx="12" fill="url(#kafkaGrad)" />
    <text x="170" y="97" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Apache Kafka</text>

    <text x="50" y="145" fontSize="11" fontWeight="600" fill="#10b981">Best For:</text>
    <text x="50" y="165" fontSize="10" fill="#9ca3af">High-throughput event streaming</text>
    <text x="50" y="180" fontSize="10" fill="#9ca3af">Log aggregation, real-time analytics</text>

    <text x="50" y="210" fontSize="11" fontWeight="600" fill="#3b82f6">Model:</text>
    <text x="50" y="230" fontSize="10" fill="#9ca3af">Distributed commit log</text>
    <text x="50" y="245" fontSize="10" fill="#9ca3af">Partitioned topics</text>

    <text x="50" y="275" fontSize="11" fontWeight="600" fill="#f59e0b">Guarantees:</text>
    <text x="50" y="295" fontSize="10" fill="#9ca3af">At-least-once (configurable)</text>
    <text x="50" y="310" fontSize="10" fill="#9ca3af">Exactly-once with transactions</text>

    <text x="50" y="340" fontSize="11" fontWeight="600" fill="#8b5cf6">Throughput:</text>
    <rect x="50" y="350" width="200" height="12" rx="6" fill="#1f2937" />
    <rect x="50" y="350" width="190" height="12" rx="6" fill="#22c55e" />
    <text x="260" y="360" fontSize="10" fill="#9ca3af">1M+/sec</text>

    <text x="50" y="390" fontSize="11" fontWeight="600" fill="#ec4899">Retention:</text>
    <text x="50" y="410" fontSize="10" fill="#9ca3af">Configurable (time/size)</text>
    <text x="50" y="425" fontSize="10" fill="#9ca3af">Replayable messages</text>

    <text x="50" y="455" fontSize="11" fontWeight="600" fill="#14b8a6">Cons:</text>
    <text x="50" y="475" fontSize="10" fill="#f87171">{`Complex setup & operations`}</text>
    <text x="50" y="490" fontSize="10" fill="#f87171">No native routing patterns</text>

    <rect x="335" y="60" width="280" height="440" rx="12" fill="rgba(255, 102, 0, 0.1)" stroke="#ff6600" strokeWidth="2" />
    <rect x="335" y="60" width="280" height="60" rx="12" fill="url(#rabbitGrad)" />
    <text x="475" y="97" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">RabbitMQ</text>

    <text x="355" y="145" fontSize="11" fontWeight="600" fill="#10b981">Best For:</text>
    <text x="355" y="165" fontSize="10" fill="#9ca3af">Complex routing, task queues</text>
    <text x="355" y="180" fontSize="10" fill="#9ca3af">Request-reply patterns</text>

    <text x="355" y="210" fontSize="11" fontWeight="600" fill="#3b82f6">Model:</text>
    <text x="355" y="230" fontSize="10" fill="#9ca3af">Traditional message broker</text>
    <text x="355" y="245" fontSize="10" fill="#9ca3af">Exchanges, Queues, Bindings</text>

    <text x="355" y="275" fontSize="11" fontWeight="600" fill="#f59e0b">Guarantees:</text>
    <text x="355" y="295" fontSize="10" fill="#9ca3af">At-most-once (default)</text>
    <text x="355" y="310" fontSize="10" fill="#9ca3af">At-least-once with confirms</text>

    <text x="355" y="340" fontSize="11" fontWeight="600" fill="#8b5cf6">Throughput:</text>
    <rect x="355" y="350" width="200" height="12" rx="6" fill="#1f2937" />
    <rect x="355" y="350" width="100" height="12" rx="6" fill="#f59e0b" />
    <text x="565" y="360" fontSize="10" fill="#9ca3af">50K/sec</text>

    <text x="355" y="390" fontSize="11" fontWeight="600" fill="#ec4899">Routing:</text>
    <text x="355" y="410" fontSize="10" fill="#9ca3af">Direct, Topic, Fanout, Headers</text>
    <text x="355" y="425" fontSize="10" fill="#9ca3af">Rich routing capabilities</text>

    <text x="355" y="455" fontSize="11" fontWeight="600" fill="#14b8a6">Cons:</text>
    <text x="355" y="475" fontSize="10" fill="#f87171">Lower throughput vs Kafka</text>
    <text x="355" y="490" fontSize="10" fill="#f87171">No message replay</text>

    <rect x="640" y="60" width="280" height="440" rx="12" fill="rgba(255, 153, 0, 0.1)" stroke="#ff9900" strokeWidth="2" />
    <rect x="640" y="60" width="280" height="60" rx="12" fill="url(#eventBridgeGrad)" />
    <text x="780" y="97" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">AWS EventBridge</text>

    <text x="660" y="145" fontSize="11" fontWeight="600" fill="#10b981">Best For:</text>
    <text x="660" y="165" fontSize="10" fill="#9ca3af">Serverless event routing</text>
    <text x="660" y="180" fontSize="10" fill="#9ca3af">AWS service integration</text>

    <text x="660" y="210" fontSize="11" fontWeight="600" fill="#3b82f6">Model:</text>
    <text x="660" y="230" fontSize="10" fill="#9ca3af">Serverless event bus</text>
    <text x="660" y="245" fontSize="10" fill="#9ca3af">Rules-based routing</text>

    <text x="660" y="275" fontSize="11" fontWeight="600" fill="#f59e0b">Guarantees:</text>
    <text x="660" y="295" fontSize="10" fill="#9ca3af">At-least-once delivery</text>
    <text x="660" y="310" fontSize="10" fill="#9ca3af">Built-in retry policies</text>

    <text x="660" y="340" fontSize="11" fontWeight="600" fill="#8b5cf6">Throughput:</text>
    <rect x="660" y="350" width="200" height="12" rx="6" fill="#1f2937" />
    <rect x="660" y="350" width="60" height="12" rx="6" fill="#8b5cf6" />
    <text x="870" y="360" fontSize="10" fill="#9ca3af">10K+/sec</text>

    <text x="660" y="390" fontSize="11" fontWeight="600" fill="#ec4899">Integration:</text>
    <text x="660" y="410" fontSize="10" fill="#9ca3af">100+ AWS services</text>
    <text x="660" y="425" fontSize="10" fill="#9ca3af">SaaS app connectors</text>

    <text x="660" y="455" fontSize="11" fontWeight="600" fill="#14b8a6">Cons:</text>
    <text x="660" y="475" fontSize="10" fill="#f87171">AWS lock-in</text>
    <text x="660" y="490" fontSize="10" fill="#f87171">Limited to 24hr archive</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function EventDrivenArchitecture({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'pub-sub',
      name: 'Publish-Subscribe (Pub/Sub)',
      icon: '📢',
      color: '#10b981',
      description: 'Messaging pattern where publishers emit events without knowledge of subscribers. Enables loosely-coupled, scalable architectures.',
      diagram: EventDrivenOverviewDiagram,
      details: [
        {
          name: 'Core Concepts',
          diagram: EventDrivenOverviewDiagram,
          explanation: `Publish-Subscribe is a messaging pattern where publishers emit events without knowledge of subscribers. Subscribers express interest in event types and receive matching events asynchronously. This decouples publishers from consumers, enabling scalable, loosely-coupled architectures.

Key Benefits:
- Loose coupling between publishers and subscribers
- Dynamic subscription management at runtime
- Multiple subscribers can receive the same event
- Scalable fan-out of events to many consumers
- Publishers don't need to know about subscribers
- Easy to add new subscribers without modifying publishers`,
          codeExample: `// Spring Boot Kafka Publisher
@Service
public class OrderEventPublisher {
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public OrderEventPublisher(KafkaTemplate<String, OrderEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishOrderCreated(Order order) {
        OrderEvent event = new OrderEvent("ORDER_CREATED", order);
        kafkaTemplate.send("order-events", order.getId(), event);
    }
}`
        },
        {
          name: 'Kafka Subscribers',
          explanation: `Kafka consumers subscribe to topics and process events asynchronously. Consumer groups enable parallel processing and fault tolerance. Each consumer in a group handles a subset of partitions, ensuring each message is processed exactly once per group.

Consumer Group Benefits:
- Load balancing across group members
- Automatic partition rebalancing on consumer failure
- Horizontal scaling by adding consumers
- Independent offset management per group`,
          codeExample: `// Kafka Subscriber with Consumer Group
@KafkaListener(topics = "order-events", groupId = "email-service")
public void handleOrderEvent(OrderEvent event) {
    if ("ORDER_CREATED".equals(event.getType())) {
        emailService.sendOrderConfirmation(event.getOrder());
    }
}

// Multiple consumers in same group share partitions
@KafkaListener(topics = "order-events", groupId = "analytics-service")
public void trackOrderMetrics(OrderEvent event) {
    metricsService.recordOrderEvent(event);
}

// Different group = separate copy of all messages
@KafkaListener(topics = "order-events", groupId = "audit-service")
public void auditOrderEvent(OrderEvent event) {
    auditService.logEvent(event);
}`
        },
        {
          name: 'Message Routing',
          explanation: `Different messaging systems offer various routing patterns. Topic-based routing sends messages to all subscribers of a topic. Content-based routing examines message content to determine destinations. Header-based routing uses message metadata for routing decisions.

Common Routing Patterns:
- Direct: One-to-one message delivery
- Topic: Pattern-based routing (e.g., "order.*")
- Fanout: Broadcast to all bound queues
- Headers: Route based on message attributes`,
          codeExample: `// RabbitMQ Topic Exchange Configuration
@Configuration
public class RabbitMQConfig {

    @Bean
    public TopicExchange orderExchange() {
        return new TopicExchange("order.exchange");
    }

    @Bean
    public Queue emailQueue() {
        return new Queue("email.queue");
    }

    @Bean
    public Queue analyticsQueue() {
        return new Queue("analytics.queue");
    }

    // Route order.created.* to email queue
    @Bean
    public Binding emailBinding() {
        return BindingBuilder
            .bind(emailQueue())
            .to(orderExchange())
            .with("order.created.*");
    }

    // Route all order.* to analytics queue
    @Bean
    public Binding analyticsBinding() {
        return BindingBuilder
            .bind(analyticsQueue())
            .to(orderExchange())
            .with("order.#");
    }
}`
        }
      ]
    },
    {
      id: 'event-sourcing',
      name: 'Event Sourcing',
      icon: '📚',
      color: '#3b82f6',
      description: 'Store application state as a sequence of immutable events. Enables complete audit trail, time-travel debugging, and event replay.',
      diagram: EventSourcingDiagram,
      details: [
        {
          name: 'Core Pattern',
          diagram: EventSourcingDiagram,
          explanation: `Event Sourcing is a pattern where the state of an application is determined by a sequence of events. Instead of storing just the current state, all changes are stored as immutable events in an append-only log (Event Store).

Key Concepts:
- Events are immutable facts that happened in the past
- Current state is derived by replaying all events
- Event Store is the single source of truth
- Supports temporal queries (state at any point in time)
- Natural audit trail of all changes
- Enables event replay for debugging/recovery`,
          codeExample: `// Event Sourcing with Aggregate
public class OrderAggregate {
    private String orderId;
    private OrderStatus status;
    private List<OrderItem> items = new ArrayList<>();
    private List<DomainEvent> changes = new ArrayList<>();

    // Rebuild state from events
    public static OrderAggregate fromHistory(List<DomainEvent> events) {
        OrderAggregate aggregate = new OrderAggregate();
        events.forEach(aggregate::apply);
        return aggregate;
    }

    // Command handler - validate and emit event
    public void createOrder(CreateOrderCommand cmd) {
        if (orderId != null) {
            throw new IllegalStateException("Order already exists");
        }
        apply(new OrderCreatedEvent(cmd.getOrderId(), cmd.getCustomerId()));
    }

    // Event handler - update state
    private void apply(OrderCreatedEvent event) {
        this.orderId = event.getOrderId();
        this.status = OrderStatus.PENDING;
        this.changes.add(event);
    }
}`
        },
        {
          name: 'Event Store',
          explanation: `The Event Store is an append-only database that stores all events. Events are never updated or deleted. Each event includes metadata like timestamp, aggregate ID, and version number. The store supports efficient retrieval by aggregate ID and version range.

Event Store Requirements:
- Append-only (immutable)
- Ordered by sequence/version
- Support aggregate stream queries
- Optimistic concurrency control
- Efficient replay capabilities`,
          codeExample: `// Event Store Implementation
@Repository
public class EventStore {

    private final JdbcTemplate jdbcTemplate;

    public void saveEvents(String aggregateId, List<DomainEvent> events,
                          int expectedVersion) {
        // Optimistic concurrency check
        int currentVersion = getCurrentVersion(aggregateId);
        if (currentVersion != expectedVersion) {
            throw new ConcurrencyException("Aggregate modified concurrently");
        }

        int version = expectedVersion;
        for (DomainEvent event : events) {
            jdbcTemplate.update(
                "INSERT INTO events (aggregate_id, version, event_type, " +
                "event_data, timestamp) VALUES (?, ?, ?, ?, ?)",
                aggregateId,
                ++version,
                event.getClass().getSimpleName(),
                serializeEvent(event),
                Instant.now()
            );
        }
    }

    public List<DomainEvent> getEvents(String aggregateId) {
        return jdbcTemplate.query(
            "SELECT * FROM events WHERE aggregate_id = ? ORDER BY version",
            (rs, i) -> deserializeEvent(rs.getString("event_data")),
            aggregateId
        );
    }
}`
        },
        {
          name: 'Projections & Snapshots',
          explanation: `Projections are read models built by processing events. They can be optimized for specific query patterns. Snapshots periodically capture aggregate state to avoid replaying all events from the beginning, improving performance for aggregates with many events.

Projection Types:
- Synchronous: Updated in same transaction as events
- Asynchronous: Updated via event handlers/subscriptions
- Catchup: Rebuilt from event stream on demand`,
          codeExample: `// Projection Handler
@Component
public class OrderProjectionHandler {

    private final OrderViewRepository viewRepo;

    @EventHandler
    public void on(OrderCreatedEvent event) {
        OrderView view = new OrderView();
        view.setOrderId(event.getOrderId());
        view.setCustomerId(event.getCustomerId());
        view.setStatus("PENDING");
        view.setCreatedAt(event.getTimestamp());
        viewRepo.save(view);
    }

    @EventHandler
    public void on(OrderShippedEvent event) {
        OrderView view = viewRepo.findById(event.getOrderId())
            .orElseThrow();
        view.setStatus("SHIPPED");
        view.setShippedAt(event.getTimestamp());
        viewRepo.save(view);
    }
}

// Snapshot for performance optimization
@Service
public class SnapshotService {

    public void createSnapshot(OrderAggregate order, int version) {
        Snapshot snapshot = new Snapshot();
        snapshot.setAggregateId(order.getId());
        snapshot.setState(serialize(order));
        snapshot.setVersion(version);
        snapshotRepo.save(snapshot);
    }
}`
        }
      ]
    },
    {
      id: 'cqrs',
      name: 'CQRS Pattern',
      icon: '⚡',
      color: '#8b5cf6',
      description: 'Separate read and write models for optimal performance. Write model normalized for consistency, read model denormalized for speed.',
      diagram: CQRSDiagram,
      details: [
        {
          name: 'Core Architecture',
          diagram: CQRSDiagram,
          explanation: `Command Query Responsibility Segregation (CQRS) separates read and write operations into different models. Commands change state (writes), while Queries return data (reads). Each side can be optimized independently.

Key Benefits:
- Separate optimization for reads and writes
- Different data models for each side
- Write model: normalized for consistency
- Read model: denormalized for performance
- Independent scaling of read/write workloads
- Often combined with Event Sourcing`,
          codeExample: `// Command Side - Write Operations
@Service
public class OrderCommandService {

    private final EventStore eventStore;

    @Transactional
    public void handle(CreateOrderCommand cmd) {
        // Load or create aggregate
        OrderAggregate order = new OrderAggregate();

        // Execute command (validates and produces events)
        order.createOrder(cmd);

        // Persist events
        eventStore.save(order.getId(), order.getChanges(), 0);
    }

    @Transactional
    public void handle(AddItemCommand cmd) {
        List<DomainEvent> events = eventStore.getEvents(cmd.getOrderId());
        OrderAggregate order = OrderAggregate.fromHistory(events);

        order.addItem(cmd.getProductId(), cmd.getQuantity());

        eventStore.save(order.getId(), order.getChanges(), events.size());
    }
}`
        },
        {
          name: 'Query Side',
          explanation: `The query side maintains denormalized read models optimized for specific use cases. Read models can use different storage technologies (SQL, NoSQL, Search) based on query requirements. They are eventually consistent with the write side.

Read Model Benefits:
- Pre-computed aggregations
- Optimized indexes for queries
- Multiple views of same data
- Technology flexibility (SQL, MongoDB, Elasticsearch)`,
          codeExample: `// Query Side - Read Operations
@Service
public class OrderQueryService {

    private final OrderViewRepository readRepo;
    private final ElasticsearchClient searchClient;

    // Simple lookup from read model
    public OrderView getOrder(String orderId) {
        return readRepo.findById(orderId)
            .orElseThrow(() -> new NotFoundException("Order not found"));
    }

    // Complex query from search index
    public List<OrderView> searchOrders(OrderSearchCriteria criteria) {
        return searchClient.search(s -> s
            .index("orders")
            .query(q -> q.bool(b -> {
                if (criteria.getStatus() != null) {
                    b.filter(f -> f.term(t -> t.field("status")
                        .value(criteria.getStatus())));
                }
                if (criteria.getCustomerId() != null) {
                    b.filter(f -> f.term(t -> t.field("customerId")
                        .value(criteria.getCustomerId())));
                }
                return b;
            }))
            .sort(so -> so.field(f -> f.field("createdAt").order(SortOrder.Desc)))
        );
    }
}`
        },
        {
          name: 'Event Sync & Consistency',
          explanation: `Read models are updated by consuming events from the write side. This creates eventual consistency between models. Event handlers update projections asynchronously, with mechanisms for handling failures and ensuring at-least-once processing.

Consistency Considerations:
- Eventual consistency between read/write models
- Event ordering within aggregate
- Idempotent event handlers
- Retry and dead-letter handling`,
          codeExample: `// Event Handler updates Read Model
@Component
public class OrderReadModelUpdater {

    private final OrderViewRepository viewRepo;

    @KafkaListener(topics = "order-events", groupId = "order-read-model")
    public void handleEvent(DomainEvent event) {
        try {
            // Idempotent handling - check if already processed
            if (isEventProcessed(event.getEventId())) {
                return;
            }

            if (event instanceof OrderCreatedEvent e) {
                createOrderView(e);
            } else if (event instanceof ItemAddedEvent e) {
                updateOrderWithItem(e);
            } else if (event instanceof OrderShippedEvent e) {
                updateOrderStatus(e.getOrderId(), "SHIPPED");
            }

            markEventProcessed(event.getEventId());

        } catch (Exception ex) {
            // Send to dead-letter topic for manual handling
            deadLetterService.send(event, ex);
            throw ex; // Trigger retry
        }
    }

    private void createOrderView(OrderCreatedEvent event) {
        OrderView view = new OrderView();
        view.setOrderId(event.getOrderId());
        view.setStatus("PENDING");
        viewRepo.save(view);
    }
}`
        }
      ]
    },
    {
      id: 'saga-pattern',
      name: 'Saga Pattern',
      icon: '🔄',
      color: '#f59e0b',
      description: 'Manage distributed transactions across services with compensating actions. Supports choreography and orchestration approaches.',
      diagram: SagaPatternDiagram,
      details: [
        {
          name: 'Saga Overview',
          diagram: SagaPatternDiagram,
          explanation: `The Saga pattern manages distributed transactions across multiple services without using two-phase commit. It breaks a transaction into a sequence of local transactions, each publishing events that trigger the next step.

Two Approaches:
1. Choreography: Services react to events autonomously
2. Orchestration: Central coordinator directs the saga

Compensating Transactions:
- If a step fails, previous steps must be undone
- Each service implements a compensating action
- Ensures eventual consistency across services`,
          codeExample: `// Saga State tracking
public class OrderSagaState {
    private String orderId;
    private String customerId;
    private BigDecimal amount;

    private boolean orderCreated;
    private boolean paymentProcessed;
    private boolean inventoryReserved;
    private boolean shipmentScheduled;

    private String paymentId;
    private String reservationId;
    private String shipmentId;

    // Track what needs compensation
    public boolean needsCompensation() {
        return orderCreated || paymentProcessed || inventoryReserved;
    }
}`
        },
        {
          name: 'Orchestration Saga',
          explanation: `In orchestration-based sagas, a central orchestrator coordinates the saga steps. It sends commands to services and handles their responses. This provides better visibility into saga state and easier debugging, but creates a single point of control.

Orchestrator Responsibilities:
- Maintain saga state
- Send commands to participants
- Handle responses and failures
- Trigger compensating transactions`,
          codeExample: `// Orchestration-based Saga
@Service
public class OrderSagaOrchestrator {

    @Autowired private OrderService orderService;
    @Autowired private PaymentService paymentService;
    @Autowired private InventoryService inventoryService;
    @Autowired private ShippingService shippingService;

    public void createOrder(CreateOrderRequest request) {
        OrderSagaState saga = new OrderSagaState(request);

        try {
            // Step 1: Create Order
            Order order = orderService.createPendingOrder(request);
            saga.setOrderId(order.getId());
            saga.setOrderCreated(true);

            // Step 2: Process Payment
            Payment payment = paymentService.processPayment(order);
            saga.setPaymentId(payment.getId());
            saga.setPaymentProcessed(true);

            // Step 3: Reserve Inventory
            Reservation reservation = inventoryService.reserve(order);
            saga.setReservationId(reservation.getId());
            saga.setInventoryReserved(true);

            // Step 4: Confirm Order
            orderService.confirmOrder(order.getId());

        } catch (Exception e) {
            compensate(saga);
            throw new SagaFailedException(e);
        }
    }

    private void compensate(OrderSagaState saga) {
        if (saga.isInventoryReserved()) {
            inventoryService.release(saga.getReservationId());
        }
        if (saga.isPaymentProcessed()) {
            paymentService.refund(saga.getPaymentId());
        }
        if (saga.isOrderCreated()) {
            orderService.cancel(saga.getOrderId());
        }
    }
}`
        },
        {
          name: 'Choreography Saga',
          explanation: `In choreography-based sagas, services communicate through events without a central coordinator. Each service listens for relevant events and publishes its own. This is more decoupled but can be harder to track and debug.

Choreography Benefits:
- No single point of failure/control
- Services are loosely coupled
- Each service owns its logic
- Natural fit for event-driven systems`,
          codeExample: `// Choreography-based Saga - Order Service
@Service
public class OrderService {

    @Autowired private EventPublisher eventPublisher;

    public Order createOrder(CreateOrderRequest request) {
        Order order = orderRepository.save(new Order(request));

        // Publish event to trigger next step
        eventPublisher.publish(new OrderCreatedEvent(
            order.getId(),
            order.getCustomerId(),
            order.getTotal()
        ));

        return order;
    }

    // Listen for payment failure to compensate
    @EventListener
    public void on(PaymentFailedEvent event) {
        Order order = orderRepository.findById(event.getOrderId())
            .orElseThrow();
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}

// Payment Service listens and reacts
@Service
public class PaymentService {

    @EventListener
    public void on(OrderCreatedEvent event) {
        try {
            Payment payment = processPayment(event);
            eventPublisher.publish(new PaymentCompletedEvent(
                event.getOrderId(),
                payment.getId()
            ));
        } catch (PaymentException e) {
            eventPublisher.publish(new PaymentFailedEvent(
                event.getOrderId(),
                e.getMessage()
            ));
        }
    }
}`
        }
      ]
    },
    {
      id: 'event-brokers',
      name: 'Event Broker Comparison',
      icon: '📊',
      color: '#ec4899',
      description: 'Compare Kafka, RabbitMQ, and AWS EventBridge for different use cases including throughput, guarantees, and routing patterns.',
      diagram: EventBrokerComparisonDiagram,
      details: [
        {
          name: 'Apache Kafka',
          diagram: EventBrokerComparisonDiagram,
          explanation: `Apache Kafka is a distributed streaming platform optimized for high-throughput, fault-tolerant event streaming. It uses a partitioned log model where messages are retained for configurable periods, enabling replay and multiple consumer groups.

Best For:
- High-throughput event streaming (millions/sec)
- Log aggregation and real-time analytics
- Event sourcing and CQRS
- Stream processing with Kafka Streams

Key Features:
- Distributed commit log with partitions
- Configurable retention (time/size based)
- Exactly-once semantics with transactions
- Consumer groups for parallel processing`,
          codeExample: `// Kafka Producer Configuration
@Configuration
public class KafkaProducerConfig {

    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
            StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
            JsonSerializer.class);

        // Durability settings
        config.put(ProducerConfig.ACKS_CONFIG, "all");
        config.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
        config.put(ProducerConfig.RETRIES_CONFIG, 3);

        return new DefaultKafkaProducerFactory<>(config);
    }

    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}

// Kafka Consumer with error handling
@KafkaListener(
    topics = "order-events",
    groupId = "order-processor",
    containerFactory = "kafkaListenerContainerFactory"
)
public void processOrder(OrderEvent event, Acknowledgment ack) {
    try {
        orderService.process(event);
        ack.acknowledge();
    } catch (Exception e) {
        // Don't ack - will be redelivered
        throw e;
    }
}`
        },
        {
          name: 'RabbitMQ',
          explanation: `RabbitMQ is a traditional message broker supporting multiple messaging patterns including pub/sub, work queues, and RPC. It excels at complex routing scenarios and provides rich exchange types for flexible message distribution.

Best For:
- Complex routing requirements
- Task/work queue distribution
- Request-reply (RPC) patterns
- Lower-latency point-to-point messaging

Exchange Types:
- Direct: Route by exact routing key match
- Topic: Pattern-based routing (wildcards)
- Fanout: Broadcast to all bound queues
- Headers: Route based on message headers`,
          codeExample: `// RabbitMQ Configuration with Routing
@Configuration
public class RabbitMQConfig {

    @Bean
    public TopicExchange orderExchange() {
        return new TopicExchange("order.exchange");
    }

    @Bean
    public Queue orderCreatedQueue() {
        return QueueBuilder.durable("order.created.queue")
            .withArgument("x-dead-letter-exchange", "dlx.exchange")
            .build();
    }

    @Bean
    public Binding orderCreatedBinding() {
        return BindingBuilder
            .bind(orderCreatedQueue())
            .to(orderExchange())
            .with("order.created.#");  // Matches order.created.eu, order.created.us
    }

    // Message listener with manual acknowledgment
    @RabbitListener(queues = "order.created.queue")
    public void handleOrderCreated(OrderEvent event, Channel channel,
                                   @Header(AmqpHeaders.DELIVERY_TAG) long tag) {
        try {
            orderService.process(event);
            channel.basicAck(tag, false);
        } catch (Exception e) {
            // Reject and requeue
            channel.basicNack(tag, false, true);
        }
    }
}`
        },
        {
          name: 'AWS EventBridge',
          explanation: `AWS EventBridge is a serverless event bus for building event-driven applications. It integrates natively with AWS services and SaaS applications, using rules-based routing to filter and transform events.

Best For:
- Serverless/AWS-native applications
- SaaS integration (Zendesk, Shopify, etc.)
- Cross-account event routing
- Schema-driven development

Key Features:
- Rules-based event routing
- Content-based filtering
- Built-in schema registry
- Archive and replay capabilities`,
          codeExample: `// AWS EventBridge - Publishing Events
@Service
public class EventBridgePublisher {

    private final EventBridgeClient eventBridge;

    public void publishOrderCreated(Order order) {
        PutEventsRequestEntry entry = PutEventsRequestEntry.builder()
            .source("com.myapp.orders")
            .detailType("OrderCreated")
            .detail(toJson(order))
            .eventBusName("custom-events")
            .build();

        eventBridge.putEvents(PutEventsRequest.builder()
            .entries(entry)
            .build());
    }
}

// Lambda handler as EventBridge target
public class OrderEventHandler implements RequestHandler<EventBridgeEvent, Void> {

    @Override
    public Void handleRequest(EventBridgeEvent event, Context context) {
        String detailType = event.getDetailType();

        if ("OrderCreated".equals(detailType)) {
            Order order = parseOrder(event.getDetail());
            processNewOrder(order);
        }

        return null;
    }
}

// CloudFormation rule definition
/*
OrderCreatedRule:
  Type: AWS::Events::Rule
  Properties:
    EventBusName: custom-events
    EventPattern:
      source:
        - com.myapp.orders
      detail-type:
        - OrderCreated
      detail:
        status:
          - PENDING
    Targets:
      - Arn: !GetAtt OrderProcessorLambda.Arn
        Id: order-processor
*/`
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
      { name: 'Design', icon: '🎨', page: 'Design' },
      { name: 'Event Driven Architecture', icon: '📡', page: 'Event Driven Architecture' }
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
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        if (selectedConceptIndex > 0) {
          setSelectedConceptIndex(selectedConceptIndex - 1)
          setSelectedDetailIndex(0)
        }
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        if (selectedConceptIndex < concepts.length - 1) {
          setSelectedConceptIndex(selectedConceptIndex + 1)
          setSelectedDetailIndex(0)
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack, concepts.length])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #4a1942 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #f472b6, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(236, 72, 153, 0.2)',
    border: '1px solid rgba(236, 72, 153, 0.3)',
    borderRadius: '0.5rem',
    color: '#f472b6',
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
        <h1 style={titleStyle}>Event Driven Architecture</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Design
        </button>
      </div>

      {/* Breadcrumb navigation */}
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


      {/* Introduction Section */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        background: 'rgba(236, 72, 153, 0.05)',
        borderRadius: '1rem',
        padding: '2rem',
        border: '1px solid rgba(236, 72, 153, 0.2)'
      }}>
        <p style={{
          color: '#e5e7eb',
          fontSize: '1.1rem',
          lineHeight: '1.8',
          margin: 0,
          textAlign: 'center'
        }}>
          Event-Driven Architecture (EDA) is a software design pattern where system components communicate through events.
          Events represent state changes or significant occurrences, enabling loosely-coupled, scalable, and reactive systems.
        </p>
        <EventDrivenOverviewDiagram />
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
                  <div style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {detail.explanation}
                  </div>

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

export default EventDrivenArchitecture

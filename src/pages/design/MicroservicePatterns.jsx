/**
 * Microservice Patterns - Tab Template Format
 *
 * A comprehensive guide to microservice architecture patterns including
 * API Gateway, Circuit Breaker, Service Discovery, Saga, CQRS, Event Sourcing, and Sidecar.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#a78bfa',
  primaryHover: '#c4b5fd',
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

const APIGatewayDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="apiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowAPI" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#apiGrad)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">API Gateway Pattern</text>
    <rect x="20" y="45" width="80" height="100" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="60" y="70" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Clients</text>
    <rect x="30" y="80" width="60" height="20" rx="3" fill="#374151"/>
    <text x="60" y="94" textAnchor="middle" fill="#94a3b8" fontSize="7">Web</text>
    <rect x="30" y="105" width="60" height="20" rx="3" fill="#374151"/>
    <text x="60" y="119" textAnchor="middle" fill="#94a3b8" fontSize="7">Mobile</text>
    <rect x="30" y="130" width="60" height="10" rx="2" fill="#374151"/>
    <text x="60" y="138" textAnchor="middle" fill="#94a3b8" fontSize="6">IoT</text>
    <path d="M100 95 L150 95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowAPI)"/>
    <rect x="150" y="40" width="150" height="110" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="225" y="60" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">API Gateway</text>
    <text x="225" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Authentication</text>
    <text x="225" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Rate Limiting</text>
    <text x="225" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Load Balancing</text>
    <text x="225" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Request Routing</text>
    <text x="225" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Kong/AWS API GW</text>
    <path d="M300 70 L340 70" stroke="#3b82f6" strokeWidth="1.5"/>
    <path d="M300 95 L340 95" stroke="#3b82f6" strokeWidth="1.5"/>
    <path d="M300 120 L340 120" stroke="#3b82f6" strokeWidth="1.5"/>
    <rect x="340" y="45" width="90" height="35" rx="4" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="385" y="67" textAnchor="middle" fill="#fbbf24" fontSize="8">User Service</text>
    <rect x="340" y="85" width="90" height="35" rx="4" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="385" y="107" textAnchor="middle" fill="#a78bfa" fontSize="8">Order Service</text>
    <rect x="340" y="125" width="90" height="20" rx="4" fill="#374151" stroke="#ec4899" strokeWidth="1"/>
    <text x="385" y="139" textAnchor="middle" fill="#f472b6" fontSize="8">Payment Service</text>
    <rect x="450" y="45" width="130" height="100" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="515" y="63" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Benefits</text>
    <text x="515" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">Single entry point</text>
    <text x="515" y="95" textAnchor="middle" fill="#94a3b8" fontSize="7">Cross-cutting concerns</text>
    <text x="515" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">Protocol translation</text>
    <text x="515" y="125" textAnchor="middle" fill="#94a3b8" fontSize="7">Response aggregation</text>
    <text x="515" y="140" textAnchor="middle" fill="#6b7280" fontSize="6">API composition</text>
    <rect x="600" y="45" width="80" height="100" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="640" y="63" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Concerns</text>
    <text x="640" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">SPOF risk</text>
    <text x="640" y="95" textAnchor="middle" fill="#94a3b8" fontSize="7">Latency</text>
    <text x="640" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">Complexity</text>
    <text x="640" y="125" textAnchor="middle" fill="#6b7280" fontSize="6">Scale it!</text>
  </svg>
)

const CircuitBreakerDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="cbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowCB" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/></marker>
      <marker id="arrowCB2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/></marker>
      <marker id="arrowCB3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#10b981"/></marker>
      <marker id="arrowCB4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/></marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#cbGrad)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">Circuit Breaker Pattern</text>
    <rect x="20" y="45" width="140" height="100" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="90" y="63" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">CLOSED</text>
    <text x="90" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Normal operation</text>
    <text x="90" y="95" textAnchor="middle" fill="#94a3b8" fontSize="7">Requests pass through</text>
    <text x="90" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">Count failures</text>
    <text x="90" y="130" textAnchor="middle" fill="#6b7280" fontSize="6">threshold: 5 failures</text>
    <path d="M160 75 L200 55" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowCB)"/>
    <text x="180" y="55" textAnchor="middle" fill="#fbbf24" fontSize="7">failures</text>
    <rect x="200" y="35" width="140" height="55" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="270" y="55" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">OPEN</text>
    <text x="270" y="72" textAnchor="middle" fill="#94a3b8" fontSize="8">Fail fast, no calls</text>
    <text x="270" y="85" textAnchor="middle" fill="#6b7280" fontSize="6">timeout: 30 seconds</text>
    <path d="M340 62 L380 62" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowCB2)"/>
    <text x="360" y="55" textAnchor="middle" fill="#60a5fa" fontSize="7">timeout</text>
    <rect x="380" y="35" width="140" height="55" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="450" y="55" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">HALF-OPEN</text>
    <text x="450" y="72" textAnchor="middle" fill="#94a3b8" fontSize="8">Test with limited calls</text>
    <text x="450" y="85" textAnchor="middle" fill="#6b7280" fontSize="6">1 test request</text>
    <path d="M450 90 L450 110 L90 110 L90 100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowCB3)"/>
    <text x="270" y="120" textAnchor="middle" fill="#34d399" fontSize="7">success - CLOSED</text>
    <path d="M520 62 L560 62 L560 45 L270 45 L270 35" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCB4)"/>
    <text x="415" y="40" textAnchor="middle" fill="#f87171" fontSize="7">failure - OPEN</text>
    <rect x="540" y="75" width="140" height="70" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="610" y="93" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Implementation</text>
    <text x="610" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">Resilience4j</text>
    <text x="610" y="125" textAnchor="middle" fill="#94a3b8" fontSize="7">Hystrix (deprecated)</text>
    <text x="610" y="140" textAnchor="middle" fill="#6b7280" fontSize="6">Spring Cloud Circuit Breaker</text>
  </svg>
)

const ServiceDiscoveryDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="sdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#059669" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowSD" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/></marker>
      <marker id="arrowSD2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#10b981"/></marker>
      <marker id="arrowSD3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/></marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#sdGrad)" stroke="#10b981" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">Service Discovery Pattern</text>
    <rect x="20" y="45" width="200" height="100" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="63" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Service Registry</text>
    <text x="120" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Eureka / Consul / Zookeeper</text>
    <rect x="30" y="90" width="85" height="20" rx="3" fill="#374151"/>
    <text x="72" y="104" textAnchor="middle" fill="#94a3b8" fontSize="6">user-svc: 10.0.0.1:8080</text>
    <rect x="125" y="90" width="85" height="20" rx="3" fill="#374151"/>
    <text x="167" y="104" textAnchor="middle" fill="#94a3b8" fontSize="6">order-svc: 10.0.0.2:8081</text>
    <rect x="30" y="115" width="180" height="20" rx="3" fill="#374151"/>
    <text x="120" y="129" textAnchor="middle" fill="#94a3b8" fontSize="6">payment-svc: 10.0.0.3:8082, 10.0.0.4:8082</text>
    <rect x="260" y="45" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="310" y="65" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Service A</text>
    <text x="310" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">Needs Service B</text>
    <path d="M260 70 L220 70" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrowSD)"/>
    <text x="240" y="62" textAnchor="middle" fill="#fbbf24" fontSize="6">1. Query</text>
    <path d="M220 75 L260 75" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowSD2)"/>
    <text x="240" y="85" textAnchor="middle" fill="#34d399" fontSize="6">2. Address</text>
    <rect x="400" y="45" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="450" y="65" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Service B</text>
    <text x="450" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">10.0.0.5:8083</text>
    <path d="M360 70 L400 70" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowSD3)"/>
    <text x="380" y="62" textAnchor="middle" fill="#60a5fa" fontSize="6">3. Call</text>
    <path d="M450 95 L450 115 L120 115" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4"/>
    <text x="280" y="130" textAnchor="middle" fill="#f472b6" fontSize="6">Heartbeat / Registration</text>
    <rect x="530" y="40" width="150" height="55" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="605" y="58" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Client-Side LB</text>
    <text x="605" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7">Ribbon / LoadBalancer</text>
    <text x="605" y="88" textAnchor="middle" fill="#6b7280" fontSize="6">Service picks instance</text>
    <rect x="530" y="100" width="150" height="45" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="605" y="118" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Server-Side LB</text>
    <text x="605" y="133" textAnchor="middle" fill="#94a3b8" fontSize="7">Registry routes requests</text>
  </svg>
)

const SagaPatternDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="sagaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowSaga" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#10b981"/></marker>
      <marker id="arrowSaga2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/></marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#sagaGrad)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">Saga Pattern - Distributed Transactions</text>
    <rect x="20" y="45" width="95" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="67" y="65" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">T1: Order</text>
    <text x="67" y="82" textAnchor="middle" fill="#94a3b8" fontSize="7">Create Order</text>
    <path d="M115 70 L140 70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowSaga)"/>
    <rect x="140" y="45" width="95" height="50" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="187" y="65" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">T2: Payment</text>
    <text x="187" y="82" textAnchor="middle" fill="#94a3b8" fontSize="7">Process Payment</text>
    <path d="M235 70 L260 70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowSaga)"/>
    <rect x="260" y="45" width="95" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="307" y="65" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">T3: Inventory</text>
    <text x="307" y="82" textAnchor="middle" fill="#94a3b8" fontSize="7">Reserve Stock</text>
    <path d="M355 70 L380 70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowSaga)"/>
    <rect x="380" y="45" width="95" height="50" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="427" y="65" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">T4: Shipping</text>
    <text x="427" y="82" textAnchor="middle" fill="#94a3b8" fontSize="7">Create Shipment</text>
    <text x="250" y="108" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Compensation (Rollback)</text>
    <path d="M427 100 L427 120 L67 120 L67 95" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowSaga2)"/>
    <rect x="85" y="115" width="75" height="25" rx="3" fill="#374151" stroke="#ef4444" strokeWidth="1"/>
    <text x="122" y="131" textAnchor="middle" fill="#f87171" fontSize="6">Cancel Order</text>
    <rect x="175" y="115" width="75" height="25" rx="3" fill="#374151" stroke="#ef4444" strokeWidth="1"/>
    <text x="212" y="131" textAnchor="middle" fill="#f87171" fontSize="6">Refund</text>
    <rect x="265" y="115" width="75" height="25" rx="3" fill="#374151" stroke="#ef4444" strokeWidth="1"/>
    <text x="302" y="131" textAnchor="middle" fill="#f87171" fontSize="6">Release Stock</text>
    <rect x="495" y="40" width="90" height="55" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="540" y="58" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="bold">Choreography</text>
    <text x="540" y="73" textAnchor="middle" fill="#94a3b8" fontSize="6">Events trigger</text>
    <text x="540" y="85" textAnchor="middle" fill="#94a3b8" fontSize="6">next steps</text>
    <rect x="600" y="40" width="85" height="55" rx="6" fill="#1e3a5f" stroke="#84cc16" strokeWidth="2"/>
    <text x="642" y="58" textAnchor="middle" fill="#a3e635" fontSize="8" fontWeight="bold">Orchestration</text>
    <text x="642" y="73" textAnchor="middle" fill="#94a3b8" fontSize="6">Central</text>
    <text x="642" y="85" textAnchor="middle" fill="#94a3b8" fontSize="6">coordinator</text>
    <rect x="495" y="100" width="190" height="45" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="590" y="118" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">Eventual Consistency</text>
    <text x="590" y="133" textAnchor="middle" fill="#94a3b8" fontSize="7">No distributed locks, compensate on failure</text>
  </svg>
)

const CQRSDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="cqrsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowCQRS" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#10b981"/></marker>
      <marker id="arrowCQRS2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/></marker>
      <marker id="arrowCQRS3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/></marker>
      <marker id="arrowCQRS4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#06b6d4"/></marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#cqrsGrad)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">CQRS - Command Query Responsibility Segregation</text>
    <rect x="20" y="45" width="80" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="60" y="70" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Client</text>
    <text x="60" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7">UI / API</text>
    <path d="M100 55 L140 55" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowCQRS)"/>
    <text x="120" y="48" textAnchor="middle" fill="#34d399" fontSize="7">Commands</text>
    <path d="M100 85 L140 85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowCQRS2)"/>
    <text x="120" y="95" textAnchor="middle" fill="#fbbf24" fontSize="7">Queries</text>
    <rect x="140" y="35" width="130" height="35" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="205" y="50" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Command Handler</text>
    <text x="205" y="63" textAnchor="middle" fill="#94a3b8" fontSize="7">Write operations</text>
    <rect x="140" y="75" width="130" height="35" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="205" y="90" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Query Handler</text>
    <text x="205" y="103" textAnchor="middle" fill="#94a3b8" fontSize="7">Read operations</text>
    <path d="M270 52 L310 52" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowCQRS)"/>
    <path d="M270 92 L310 92" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowCQRS2)"/>
    <rect x="310" y="35" width="100" height="35" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="360" y="50" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Write Model</text>
    <text x="360" y="63" textAnchor="middle" fill="#94a3b8" fontSize="7">Normalized</text>
    <rect x="310" y="75" width="100" height="35" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="360" y="90" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Read Model</text>
    <text x="360" y="103" textAnchor="middle" fill="#94a3b8" fontSize="7">Denormalized</text>
    <path d="M410 52 L450 52" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCQRS3)"/>
    <path d="M410 92 L450 92" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCQRS4)"/>
    <rect x="450" y="35" width="85" height="35" rx="6" fill="#374151" stroke="#ef4444" strokeWidth="1"/>
    <text x="492" y="55" textAnchor="middle" fill="#f87171" fontSize="8">Write DB</text>
    <text x="492" y="67" textAnchor="middle" fill="#6b7280" fontSize="6">PostgreSQL</text>
    <rect x="450" y="75" width="85" height="35" rx="6" fill="#374151" stroke="#06b6d4" strokeWidth="1"/>
    <text x="492" y="95" textAnchor="middle" fill="#22d3ee" fontSize="8">Read DB</text>
    <text x="492" y="107" textAnchor="middle" fill="#6b7280" fontSize="6">MongoDB/ES</text>
    <path d="M492 70 L492 75" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3"/>
    <text x="520" y="72" textAnchor="middle" fill="#f472b6" fontSize="5">Sync</text>
    <rect x="555" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="620" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Benefits</text>
    <text x="620" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7">Independent scaling</text>
    <text x="620" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7">Optimized models</text>
    <text x="620" y="105" textAnchor="middle" fill="#94a3b8" fontSize="7">Eventual consistency</text>
    <text x="620" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">Complex queries</text>
    <text x="620" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Event Sourcing pair</text>
  </svg>
)

const EventSourcingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="esGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#db2777" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowES" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/></marker>
      <marker id="arrowES2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/></marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#esGrad)" stroke="#ec4899" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f472b6" fontSize="14" fontWeight="bold">Event Sourcing Pattern</text>
    <rect x="20" y="45" width="90" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="65" y="65" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Command</text>
    <text x="65" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">CreateOrder</text>
    <path d="M110 70 L140 70" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowES)"/>
    <rect x="140" y="40" width="300" height="60" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="290" y="58" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Event Store (Append-only Log)</text>
    <rect x="150" y="65" width="70" height="25" rx="3" fill="#374151"/>
    <text x="185" y="82" textAnchor="middle" fill="#94a3b8" fontSize="6">OrderCreated</text>
    <rect x="225" y="65" width="70" height="25" rx="3" fill="#374151"/>
    <text x="260" y="82" textAnchor="middle" fill="#94a3b8" fontSize="6">ItemAdded</text>
    <rect x="300" y="65" width="70" height="25" rx="3" fill="#374151"/>
    <text x="335" y="82" textAnchor="middle" fill="#94a3b8" fontSize="6">PaymentReceived</text>
    <rect x="375" y="65" width="55" height="25" rx="3" fill="#374151"/>
    <text x="402" y="82" textAnchor="middle" fill="#94a3b8" fontSize="5">...</text>
    <path d="M290 100 L290 115" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowES2)"/>
    <text x="320" y="112" textAnchor="middle" fill="#fbbf24" fontSize="7">Replay Events</text>
    <rect x="200" y="115" width="180" height="35" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="290" y="132" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Current State (Projection)</text>
    <text x="290" y="145" textAnchor="middle" fill="#94a3b8" fontSize="7">Materialized View</text>
    <rect x="460" y="40" width="120" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="520" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Benefits</text>
    <text x="520" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7">Full audit trail</text>
    <text x="520" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7">Time travel</text>
    <text x="520" y="105" textAnchor="middle" fill="#94a3b8" fontSize="7">Rebuild state</text>
    <text x="520" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">Event replay</text>
    <text x="520" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">CQRS synergy</text>
    <rect x="595" y="40" width="90" height="105" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="640" y="58" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Challenges</text>
    <text x="640" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Complexity</text>
    <text x="640" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Event schema</text>
    <text x="640" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Storage growth</text>
    <text x="640" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Snapshots</text>
    <text x="640" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">EventStoreDB</text>
  </svg>
)

const SidecarDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="sidecarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#sidecarGrad)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">Sidecar Pattern</text>
    <rect x="20" y="40" width="280" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="160" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Pod / Container Group</text>
    <rect x="35" y="68" width="120" height="70" rx="6" fill="#374151" stroke="#10b981" strokeWidth="2"/>
    <text x="95" y="88" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Main App</text>
    <text x="95" y="105" textAnchor="middle" fill="#94a3b8" fontSize="7">Business Logic</text>
    <text x="95" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">Java/Node/Go</text>
    <rect x="165" y="68" width="120" height="70" rx="6" fill="#374151" stroke="#f59e0b" strokeWidth="2"/>
    <text x="225" y="88" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Sidecar</text>
    <text x="225" y="105" textAnchor="middle" fill="#94a3b8" fontSize="7">Cross-cutting</text>
    <text x="225" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">Envoy/Fluentd</text>
    <path d="M155 103 L165 103" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="160" y="95" textAnchor="middle" fill="#a78bfa" fontSize="6">localhost</text>
    <rect x="320" y="40" width="180" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="410" y="58" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Sidecar Use Cases</text>
    <text x="410" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Service Mesh (Envoy)</text>
    <text x="410" y="93" textAnchor="middle" fill="#94a3b8" fontSize="8">Logging (Fluentd/Filebeat)</text>
    <text x="410" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">Metrics (Prometheus)</text>
    <text x="410" y="123" textAnchor="middle" fill="#94a3b8" fontSize="8">Security (mTLS)</text>
    <text x="410" y="138" textAnchor="middle" fill="#6b7280" fontSize="7">Config sync, Secrets</text>
    <rect x="520" y="40" width="165" height="105" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="602" y="58" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Benefits</text>
    <text x="602" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Language agnostic</text>
    <text x="602" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Independent lifecycle</text>
    <text x="602" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Separation of concerns</text>
    <text x="602" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Consistent infrastructure</text>
    <text x="602" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Istio, Linkerd, Dapr</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function MicroservicePatterns({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'api-gateway',
      name: 'API Gateway',
      icon: '🚪',
      color: '#3b82f6',
      description: 'Single entry point for all client requests that routes to appropriate microservices. Handles cross-cutting concerns like authentication, rate limiting, and protocol translation.',
      diagram: APIGatewayDiagram,
      details: [
        {
          name: 'Gateway Configuration',
          explanation: `API Gateway serves as the single entry point for all client requests, routing them to appropriate microservices. It handles cross-cutting concerns like authentication, authorization, rate limiting, request/response transformation, and protocol translation.

Key Benefits:
- Single entry point for all clients (mobile, web, third-party)
- Centralized authentication and authorization
- Request routing and load balancing
- Response aggregation (Backend for Frontend pattern)
- Protocol translation (REST to gRPC)
- Rate limiting and throttling
- SSL termination and security enforcement

Technologies: Kong, NGINX, AWS API Gateway, Azure API Management, Spring Cloud Gateway, Netflix Zuul.`,
          codeExample: `// Spring Cloud Gateway Configuration
@SpringBootApplication
public class ApiGatewayApplication {
  public static void main(String[] args) {
    SpringApplication.run(ApiGatewayApplication.class, args);
  }
}

// application.yml - Gateway routing configuration
/*
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/api/users/**
          filters:
            - RewritePath=/api/users/(?<segment>.*), /\${segment}

        - id: order-service
          uri: lb://ORDER-SERVICE
          predicates:
            - Path=/api/orders/**
          filters:
            - AddRequestHeader=X-Service, order-service
*/`
        },
        {
          name: 'Authentication Filter',
          explanation: `Custom authentication filters validate JWT tokens before routing requests to downstream services. The filter extracts the token from the Authorization header, validates it, and either allows the request to proceed or returns an error.

Key Features:
- JWT token extraction from headers
- Token validation and verification
- User context propagation to services
- Error handling for invalid/expired tokens
- Integration with identity providers`,
          codeExample: `// Custom authentication filter
@Component
public class AuthenticationFilter implements GatewayFilter {

  @Autowired
  private JwtUtil jwtUtil;

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    ServerHttpRequest request = exchange.getRequest();

    if (!request.getHeaders().containsKey("Authorization")) {
      throw new RuntimeException("Missing authorization header");
    }

    String token = request.getHeaders().get("Authorization").get(0);
    if (token != null && token.startsWith("Bearer ")) {
      token = token.substring(7);
    }

    try {
      jwtUtil.validateToken(token);
    } catch (Exception e) {
      throw new RuntimeException("Invalid token");
    }

    return chain.filter(exchange);
  }
}
// Output: Validates JWT token before routing to services`
        },
        {
          name: 'Rate Limiting & Circuit Breaker',
          explanation: `Rate limiting protects services from being overwhelmed by too many requests. Combined with circuit breakers, the gateway can fail fast and provide fallback responses when downstream services are unavailable.

Configuration Options:
- Redis-based rate limiter for distributed systems
- Key resolver for per-user or per-IP limits
- Circuit breaker fallback URIs
- Configurable thresholds and timeouts`,
          codeExample: `// Rate limiting filter with circuit breaker
@Configuration
public class GatewayConfig {

  @Bean
  public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
    return builder.routes()
      .route("rate_limited_route", r -> r.path("/api/public/**")
        .filters(f -> f
          .requestRateLimiter(config -> config
            .setRateLimiter(redisRateLimiter())
            .setKeyResolver(userKeyResolver()))
          .circuitBreaker(config -> config
            .setName("myCircuitBreaker")
            .setFallbackUri("/fallback/public")))
        .uri("lb://PUBLIC-SERVICE"))
      .build();
  }

  @Bean
  public RedisRateLimiter redisRateLimiter() {
    return new RedisRateLimiter(10, 20); // 10 requests/sec, burst 20
  }

  @Bean
  public KeyResolver userKeyResolver() {
    return exchange -> Mono.just(
      exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
    );
  }
}`
        },
        {
          name: 'Response Aggregation',
          explanation: `The Backend for Frontend (BFF) pattern aggregates responses from multiple services into a single response. This reduces client complexity and network round trips by combining data from user, order, and preference services.

Benefits:
- Reduced client complexity
- Fewer network round trips
- Optimized responses for specific clients
- Server-side data transformation`,
          codeExample: `// Backend for Frontend - Aggregate responses
@RestController
@RequestMapping("/api/aggregate")
public class AggregationController {

  @Autowired
  private WebClient.Builder webClientBuilder;

  @GetMapping("/user-profile/{userId}")
  public Mono<UserProfile> getUserProfile(@PathVariable String userId) {
    Mono<User> userMono = webClientBuilder.build()
      .get()
      .uri("http://USER-SERVICE/users/" + userId)
      .retrieve()
      .bodyToMono(User.class);

    Mono<List<Order>> ordersMono = webClientBuilder.build()
      .get()
      .uri("http://ORDER-SERVICE/orders?userId=" + userId)
      .retrieve()
      .bodyToFlux(Order.class)
      .collectList();

    Mono<Preferences> prefsMono = webClientBuilder.build()
      .get()
      .uri("http://PREFS-SERVICE/preferences/" + userId)
      .retrieve()
      .bodyToMono(Preferences.class);

    return Mono.zip(userMono, ordersMono, prefsMono)
      .map(tuple -> new UserProfile(
        tuple.getT1(),
        tuple.getT2(),
        tuple.getT3()
      ));
  }
}
// Output: Single response with user, orders, and preferences data`
        }
      ]
    },
    {
      id: 'circuit-breaker',
      name: 'Circuit Breaker',
      icon: '🔌',
      color: '#ef4444',
      description: 'Prevents cascading failures by monitoring service calls and stopping requests to failing services. Implements three states: Closed, Open, and Half-Open.',
      diagram: CircuitBreakerDiagram,
      details: [
        {
          name: 'Resilience4j Setup',
          explanation: `Circuit breaker pattern prevents cascading failures by monitoring service calls and stopping requests to failing services. It implements three states:

- CLOSED: Normal operation, requests pass through, failures counted
- OPEN: Threshold exceeded, fail fast without calling service
- HALF-OPEN: After timeout, test if service recovered with limited requests

Configuration includes sliding window size, failure rate threshold, wait duration, and permitted calls in half-open state.`,
          codeExample: `// Add Resilience4j dependency
/*
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-circuitbreaker-resilience4j</artifactId>
</dependency>
*/

// application.yml - Circuit breaker configuration
/*
resilience4j:
  circuitbreaker:
    instances:
      paymentService:
        registerHealthIndicator: true
        slidingWindowSize: 10
        minimumNumberOfCalls: 5
        permittedNumberOfCallsInHalfOpenState: 3
        waitDurationInOpenState: 10s
        failureRateThreshold: 50
        slowCallRateThreshold: 50
        slowCallDurationThreshold: 2s
*/`
        },
        {
          name: 'Circuit Breaker with Fallback',
          explanation: `When the circuit breaker opens, fallback methods provide graceful degradation. Instead of failing completely, the service returns a cached response, default value, or queues the request for later processing.

Fallback Strategies:
- Return cached data
- Return default response
- Queue request for retry
- Return partial data`,
          codeExample: `@Service
public class PaymentService {

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private CircuitBreakerFactory circuitBreakerFactory;

  public PaymentResponse processPayment(PaymentRequest request) {
    CircuitBreaker circuitBreaker = circuitBreakerFactory.create("paymentService");

    return circuitBreaker.run(
      () -> {
        // Call external payment service
        return restTemplate.postForObject(
          "http://PAYMENT-SERVICE/api/payments",
          request,
          PaymentResponse.class
        );
      },
      throwable -> {
        // Fallback method
        System.out.println("Circuit breaker activated, using fallback");
        return getPaymentFallback(request);
      }
    );
  }

  private PaymentResponse getPaymentFallback(PaymentRequest request) {
    PaymentResponse fallback = new PaymentResponse();
    fallback.setStatus("PENDING");
    fallback.setMessage("Payment service temporarily unavailable. Request queued.");
    fallback.setTransactionId("FALLBACK-" + UUID.randomUUID());
    return fallback;
  }
}
// Output: Returns fallback when payment service fails`
        },
        {
          name: 'Annotation-Based Circuit Breaker',
          explanation: `Resilience4j provides annotation-based configuration for circuit breakers. Combine @CircuitBreaker with @Retry and @TimeLimiter for comprehensive resilience.

Annotations:
- @CircuitBreaker: Main circuit breaker logic
- @Retry: Automatic retry on failure
- @TimeLimiter: Timeout handling
- @RateLimiter: Request rate limiting
- @Bulkhead: Concurrent call limiting`,
          codeExample: `@Service
public class OrderService {

  @Autowired
  private RestTemplate restTemplate;

  @CircuitBreaker(name = "orderService", fallbackMethod = "getOrderFallback")
  @Retry(name = "orderService")
  @TimeLimiter(name = "orderService")
  public CompletableFuture<Order> getOrder(Long orderId) {
    return CompletableFuture.supplyAsync(() ->
      restTemplate.getForObject(
        "http://ORDER-SERVICE/orders/" + orderId,
        Order.class
      )
    );
  }

  private CompletableFuture<Order> getOrderFallback(Long orderId, Exception ex) {
    System.out.println("Circuit breaker fallback for order: " + orderId);
    Order fallbackOrder = new Order();
    fallbackOrder.setId(orderId);
    fallbackOrder.setStatus("UNAVAILABLE");
    return CompletableFuture.completedFuture(fallbackOrder);
  }
}`
        },
        {
          name: 'Events and Monitoring',
          explanation: `Circuit breaker events enable monitoring and alerting. Listen to state transitions to send alerts when circuits open, and track error counts for metrics dashboards.

Monitoring Integration:
- Actuator endpoints for status
- Event listeners for alerts
- Metrics for Prometheus/Grafana
- Health indicators`,
          codeExample: `@Component
public class CircuitBreakerEventListener {

  @EventListener
  public void onCircuitBreakerEvent(CircuitBreakerOnStateTransitionEvent event) {
    System.out.println("Circuit Breaker State Transition: " +
      event.getStateTransition().getFromState() + " -> " +
      event.getStateTransition().getToState());

    // Send alert when circuit opens
    if (event.getStateTransition().getToState() == CircuitBreaker.State.OPEN) {
      alertService.sendAlert("Circuit breaker opened for: " +
        event.getCircuitBreakerName());
    }
  }

  @EventListener
  public void onCircuitBreakerError(CircuitBreakerOnErrorEvent event) {
    System.out.println("Circuit Breaker Error: " +
      event.getThrowable().getMessage());
    metricsService.incrementErrorCount(event.getCircuitBreakerName());
  }
}

// Actuator endpoint: GET /actuator/circuitbreakers
/*
{
  "circuitBreakers": {
    "paymentService": {
      "state": "CLOSED",
      "failureRate": "10.0%",
      "slowCallRate": "5.0%",
      "bufferedCalls": 10,
      "failedCalls": 1
    }
  }
}
*/`
        }
      ]
    },
    {
      id: 'service-discovery',
      name: 'Service Discovery',
      icon: '🔍',
      color: '#10b981',
      description: 'Enables automatic detection and location of service instances in a microservices architecture. Services register themselves with a central registry.',
      diagram: ServiceDiscoveryDiagram,
      details: [
        {
          name: 'Eureka Server Setup',
          explanation: `Service discovery enables automatic detection and location of service instances. Services register themselves with a central registry on startup and deregister on shutdown.

Discovery Patterns:
- Client-Side: Client queries registry and selects instance (Eureka, Ribbon)
- Server-Side: Load balancer queries registry and routes (AWS ELB, K8s)
- Service Mesh: Platform-level discovery (Istio, Linkerd)

Technologies: Netflix Eureka, Consul, etcd, ZooKeeper, Kubernetes Service Discovery.`,
          codeExample: `// Eureka Server
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
  public static void main(String[] args) {
    SpringApplication.run(EurekaServerApplication.class, args);
  }
}

// application.yml - Eureka Server config
/*
server:
  port: 8761

eureka:
  client:
    registerWithEureka: false
    fetchRegistry: false
  server:
    enableSelfPreservation: false
*/
// Output: Eureka dashboard at http://localhost:8761`
        },
        {
          name: 'Service Registration',
          explanation: `Services register with Eureka on startup, providing metadata like hostname, port, and health check URL. Lease renewal keeps registrations active, while lease expiration removes unhealthy instances.

Registration Options:
- Hostname or IP preference
- Lease renewal interval
- Lease expiration duration
- Custom metadata`,
          codeExample: `// Service registration with Eureka
@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
  public static void main(String[] args) {
    SpringApplication.run(UserServiceApplication.class, args);
  }
}

// application.yml - Service registration config
/*
spring:
  application:
    name: USER-SERVICE

eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
    registerWithEureka: true
    fetchRegistry: true
  instance:
    hostname: localhost
    preferIpAddress: true
    leaseRenewalIntervalInSeconds: 10
    leaseExpirationDurationInSeconds: 30
    metadataMap:
      version: 1.0
      environment: production
*/
// Output: USER-SERVICE registered with Eureka`
        },
        {
          name: 'Load Balancing',
          explanation: `Spring Cloud LoadBalancer provides client-side load balancing. The @LoadBalanced annotation enables service name resolution and automatic instance selection.

Load Balancing Strategies:
- Round Robin (default)
- Random
- Weighted
- Least Connections`,
          codeExample: `// Client-side load balancing with Spring Cloud LoadBalancer
@Configuration
public class LoadBalancerConfig {

  @Bean
  @LoadBalanced
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }

  @Bean
  @LoadBalanced
  public WebClient.Builder webClientBuilder() {
    return WebClient.builder();
  }
}

@Service
public class OrderService {

  @Autowired
  private RestTemplate restTemplate;

  public User getUserById(Long userId) {
    // Service name instead of hostname:port
    // LoadBalancer automatically discovers instances
    return restTemplate.getForObject(
      "http://USER-SERVICE/api/users/" + userId,
      User.class
    );
  }
}
// Output: Automatically discovers and load balances across USER-SERVICE instances`
        },
        {
          name: 'Discovery Client API',
          explanation: `The DiscoveryClient API provides programmatic access to the service registry. Query available services, get instance details, and implement custom routing logic.

Use Cases:
- Custom load balancing
- Service health monitoring
- Dynamic configuration
- Service topology visualization`,
          codeExample: `// Using DiscoveryClient API directly
@Service
public class ServiceDiscoveryHelper {

  @Autowired
  private DiscoveryClient discoveryClient;

  public List<String> getAvailableServices() {
    return discoveryClient.getServices();
  }

  public List<ServiceInstance> getInstances(String serviceName) {
    return discoveryClient.getInstances(serviceName);
  }

  public void printServiceInfo(String serviceName) {
    List<ServiceInstance> instances = discoveryClient.getInstances(serviceName);

    for (ServiceInstance instance : instances) {
      System.out.println("Service ID: " + instance.getServiceId());
      System.out.println("Host: " + instance.getHost());
      System.out.println("Port: " + instance.getPort());
      System.out.println("URI: " + instance.getUri());
      System.out.println("Metadata: " + instance.getMetadata());
      System.out.println("---");
    }
  }
}
// Output: Lists all registered service instances with details`
        }
      ]
    },
    {
      id: 'saga-pattern',
      name: 'Saga Pattern',
      icon: '🔄',
      color: '#f59e0b',
      description: 'Manages distributed transactions across multiple microservices using a sequence of local transactions with compensating actions for rollback.',
      diagram: SagaPatternDiagram,
      details: [
        {
          name: 'Orchestration-Based Saga',
          explanation: `Saga pattern manages distributed transactions using a sequence of local transactions with compensating actions. Unlike two-phase commit, sagas provide eventual consistency.

Saga Types:
- Orchestration: Central coordinator manages the workflow
- Choreography: Services coordinate through events

Compensating Transactions:
- Semantic undo (not ACID rollback)
- Must be idempotent
- Handle partial failures`,
          codeExample: `// Saga coordinator using state machine
@Service
public class OrderSagaOrchestrator {

  @Autowired
  private InventoryService inventoryService;
  @Autowired
  private PaymentService paymentService;
  @Autowired
  private ShippingService shippingService;

  public OrderResult processOrder(Order order) {
    SagaState saga = new SagaState(order.getId());
    saga.setState("STARTED");

    try {
      // Step 1: Reserve Inventory
      saga.setState("RESERVING_INVENTORY");
      ReservationResult reservation = inventoryService.reserveItems(order.getItems());
      saga.setReservationId(reservation.getId());

      // Step 2: Process Payment
      saga.setState("PROCESSING_PAYMENT");
      PaymentResult payment = paymentService.chargePayment(order.getPaymentInfo());
      saga.setPaymentId(payment.getId());

      // Step 3: Schedule Shipping
      saga.setState("SCHEDULING_SHIPPING");
      ShippingResult shipping = shippingService.scheduleShipping(order.getShippingAddress());

      saga.setState("COMPLETED");
      return new OrderResult(true, "Order completed successfully");

    } catch (Exception e) {
      compensate(saga);
      return new OrderResult(false, "Order failed: " + e.getMessage());
    }
  }

  private void compensate(SagaState saga) {
    if (saga.getShippingId() != null) shippingService.cancelShipping(saga.getShippingId());
    if (saga.getPaymentId() != null) paymentService.refundPayment(saga.getPaymentId());
    if (saga.getReservationId() != null) inventoryService.releaseReservation(saga.getReservationId());
  }
}`
        },
        {
          name: 'Choreography-Based Saga',
          explanation: `In choreography, services coordinate through events without a central coordinator. Each service publishes events that trigger the next step in the saga.

Benefits:
- Loose coupling between services
- No single point of failure
- Better scalability

Challenges:
- Harder to track saga state
- Complex failure handling
- Distributed debugging`,
          codeExample: `// Event-driven saga with Kafka
@Service
public class OrderEventHandler {

  @Autowired
  private KafkaTemplate<String, Object> kafkaTemplate;

  // Step 1: Create order and publish event
  public void createOrder(Order order) {
    order.setStatus("PENDING");
    orderRepository.save(order);

    OrderCreatedEvent event = new OrderCreatedEvent(
      order.getId(), order.getItems(), order.getTotalAmount()
    );
    kafkaTemplate.send("order-events", event);
  }

  // Step 2: Listen to inventory reserved event
  @KafkaListener(topics = "inventory-events")
  public void handleInventoryReserved(InventoryReservedEvent event) {
    PaymentRequestEvent paymentEvent = new PaymentRequestEvent(
      event.getOrderId(), event.getAmount()
    );
    kafkaTemplate.send("payment-events", paymentEvent);
  }

  // Handle failures - compensate
  @KafkaListener(topics = "payment-failed-events")
  public void handlePaymentFailed(PaymentFailedEvent event) {
    InventoryReleaseEvent releaseEvent = new InventoryReleaseEvent(event.getOrderId());
    kafkaTemplate.send("inventory-events", releaseEvent);

    Order order = orderRepository.findById(event.getOrderId()).get();
    order.setStatus("FAILED");
    orderRepository.save(order);
  }
}`
        },
        {
          name: 'State Persistence & Recovery',
          explanation: `Saga state must be persisted for recovery from failures. A recovery service periodically checks for stuck sagas and either retries or compensates them.

Recovery Strategies:
- Timeout-based recovery
- Retry with exponential backoff
- Dead letter queue for failed sagas
- Manual intervention alerts`,
          codeExample: `// Saga state entity
@Entity
@Table(name = "saga_state")
public class SagaState {
  @Id
  private String sagaId;
  private String orderId;
  private String state;
  private String reservationId;
  private String paymentId;
  private String shippingId;
  private LocalDateTime startTime;
  private LocalDateTime lastUpdateTime;

  @ElementCollection
  private List<String> completedSteps = new ArrayList<>();
}

// Saga recovery service
@Service
public class SagaRecoveryService {

  @Scheduled(fixedDelay = 60000) // Every minute
  public void recoverStuckSagas() {
    LocalDateTime timeout = LocalDateTime.now().minusMinutes(10);

    List<SagaState> stuckSagas = sagaStateRepository
      .findByStateNotInAndLastUpdateTimeBefore(
        Arrays.asList("COMPLETED", "COMPENSATED"),
        timeout
      );

    for (SagaState saga : stuckSagas) {
      System.out.println("Recovering stuck saga: " + saga.getSagaId());
      if (saga.getState().startsWith("PROCESSING")) {
        retrySaga(saga);
      } else {
        compensateSaga(saga);
      }
    }
  }
}`
        },
        {
          name: 'Idempotent Operations',
          explanation: `Saga operations must be idempotent to handle retries safely. Use idempotency keys to prevent duplicate processing of the same request.

Implementation:
- Store idempotency key with result
- Check for existing result before processing
- Return cached result for duplicates
- Time-limited idempotency (e.g., 24 hours)`,
          codeExample: `// Idempotent payment service
@Service
public class IdempotentPaymentService {

  @Autowired
  private PaymentRepository paymentRepository;

  public PaymentResult chargePayment(String idempotencyKey, PaymentInfo info) {
    // Check if already processed
    Optional<Payment> existing = paymentRepository
      .findByIdempotencyKey(idempotencyKey);

    if (existing.isPresent()) {
      System.out.println("Duplicate payment request, returning existing result");
      return new PaymentResult(existing.get());
    }

    // Process payment
    Payment payment = new Payment();
    payment.setIdempotencyKey(idempotencyKey);
    payment.setAmount(info.getAmount());
    payment.setStatus("COMPLETED");
    paymentRepository.save(payment);

    return new PaymentResult(payment);
  }

  public void refundPayment(String paymentId) {
    Payment payment = paymentRepository.findById(paymentId).get();

    // Check if already refunded
    if ("REFUNDED".equals(payment.getStatus())) {
      System.out.println("Payment already refunded");
      return;
    }

    payment.setStatus("REFUNDED");
    paymentRepository.save(payment);
  }
}`
        }
      ]
    },
    {
      id: 'cqrs',
      name: 'CQRS',
      icon: '📊',
      color: '#8b5cf6',
      description: 'Command Query Responsibility Segregation separates read and write operations into distinct models for independent optimization and scaling.',
      diagram: CQRSDiagram,
      details: [
        {
          name: 'Command Model (Write Side)',
          explanation: `CQRS separates read and write operations into distinct models. Commands change state without returning data, while queries return data without changing state.

Key Principles:
- Commands: State changes, business logic validation, domain events
- Queries: Read-optimized models, denormalized views, no business logic
- Different databases for reads and writes (polyglot persistence)
- Eventual consistency between models`,
          codeExample: `// Command - represents state change intent
public class CreateOrderCommand {
  private final String orderId;
  private final String customerId;
  private final List<OrderItem> items;
  private final BigDecimal totalAmount;
}

// Command Handler - processes commands
@Service
public class OrderCommandHandler {

  @Autowired
  private OrderRepository orderRepository;
  @Autowired
  private EventPublisher eventPublisher;

  @Transactional
  public void handle(CreateOrderCommand command) {
    // Validate business rules
    if (command.getTotalAmount().compareTo(BigDecimal.ZERO) <= 0) {
      throw new InvalidOrderException("Total amount must be positive");
    }

    // Create aggregate
    Order order = new Order(
      command.getOrderId(),
      command.getCustomerId(),
      command.getItems()
    );

    // Save to write database
    orderRepository.save(order);

    // Publish domain event
    OrderCreatedEvent event = new OrderCreatedEvent(
      order.getId(), order.getCustomerId(),
      order.getItems(), order.getTotalAmount(), LocalDateTime.now()
    );
    eventPublisher.publish(event);
  }
}`
        },
        {
          name: 'Query Model (Read Side)',
          explanation: `The query side uses denormalized models optimized for specific read patterns. Query handlers return DTOs without business logic.

Benefits:
- Optimized for specific query patterns
- No joins required (denormalized)
- Can use different database (NoSQL, search)
- Independent scaling`,
          codeExample: `// Query DTOs - optimized for reads
public class OrderSummaryDto {
  private String orderId;
  private String customerName;  // Denormalized
  private String status;
  private BigDecimal totalAmount;
  private LocalDateTime createdAt;
  private int itemCount;
}

// Query Handler
@Service
public class OrderQueryHandler {

  @Autowired
  private OrderQueryRepository queryRepository;

  public OrderSummaryDto getOrderSummary(String orderId) {
    OrderReadModel model = queryRepository.findById(orderId)
      .orElseThrow(() -> new OrderNotFoundException());
    return mapToSummaryDto(model);
  }

  public CustomerOrderHistoryDto getCustomerOrderHistory(String customerId) {
    List<OrderReadModel> orders = queryRepository.findByCustomerId(customerId);

    CustomerOrderHistoryDto dto = new CustomerOrderHistoryDto();
    dto.setCustomerId(customerId);
    dto.setOrders(orders.stream().map(this::mapToSummaryDto).collect(Collectors.toList()));
    dto.setTotalSpent(orders.stream()
      .map(OrderReadModel::getTotalAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add));
    return dto;
  }
}`
        },
        {
          name: 'Event-Driven Synchronization',
          explanation: `Event listeners update the read model when domain events are published. This creates eventual consistency between write and read models.

Projection Strategies:
- Async event handling
- Idempotent projections
- Replay capability
- Multiple read models from same events`,
          codeExample: `// Event listener updates read model
@Service
public class OrderReadModelProjection {

  @Autowired
  private OrderQueryRepository queryRepository;
  @Autowired
  private CustomerService customerService;

  @EventListener
  @Async
  public void on(OrderCreatedEvent event) {
    // Build denormalized read model
    Customer customer = customerService.getCustomer(event.getCustomerId());

    OrderReadModel readModel = new OrderReadModel();
    readModel.setId(event.getOrderId());
    readModel.setCustomerId(event.getCustomerId());
    readModel.setCustomerName(customer.getName());  // Denormalized!
    readModel.setCustomerEmail(customer.getEmail());
    readModel.setStatus("PENDING");
    readModel.setTotalAmount(event.getTotalAmount());
    readModel.setItemCount(event.getItems().size());
    readModel.setCreatedAt(event.getTimestamp());

    // Save to read database (could be different DB)
    queryRepository.save(readModel);
    System.out.println("Read model updated for order: " + event.getOrderId());
  }

  @EventListener
  @Async
  public void on(OrderStatusUpdatedEvent event) {
    OrderReadModel readModel = queryRepository.findById(event.getOrderId()).orElseThrow();
    readModel.setStatus(event.getNewStatus());
    readModel.setLastModifiedAt(event.getTimestamp());
    queryRepository.save(readModel);
  }
}`
        },
        {
          name: 'Separate Controllers',
          explanation: `Separate controllers for commands and queries make the CQRS separation explicit in the API design. Commands return 202 Accepted (async processing), queries return 200 OK with data.

API Design:
- POST/PUT for commands (return 202)
- GET for queries (return 200)
- Different endpoints or paths
- Clear separation of concerns`,
          codeExample: `// Command Controller - write operations
@RestController
@RequestMapping("/api/orders/commands")
public class OrderCommandController {

  @Autowired
  private OrderCommandHandler commandHandler;

  @PostMapping
  public ResponseEntity<Void> createOrder(@RequestBody CreateOrderRequest request) {
    CreateOrderCommand command = new CreateOrderCommand(
      UUID.randomUUID().toString(),
      request.getCustomerId(),
      request.getItems(),
      request.getTotalAmount()
    );
    commandHandler.handle(command);
    return ResponseEntity.accepted().build(); // 202 Accepted
  }
}

// Query Controller - read operations
@RestController
@RequestMapping("/api/orders/queries")
public class OrderQueryController {

  @Autowired
  private OrderQueryHandler queryHandler;

  @GetMapping("/{orderId}")
  public ResponseEntity<OrderSummaryDto> getOrder(@PathVariable String orderId) {
    OrderSummaryDto order = queryHandler.getOrderSummary(orderId);
    return ResponseEntity.ok(order);  // 200 OK with data
  }

  @GetMapping("/customer/{customerId}")
  public ResponseEntity<CustomerOrderHistoryDto> getCustomerOrders(
      @PathVariable String customerId) {
    return ResponseEntity.ok(queryHandler.getCustomerOrderHistory(customerId));
  }
}`
        }
      ]
    },
    {
      id: 'event-sourcing',
      name: 'Event Sourcing',
      icon: '📜',
      color: '#ec4899',
      description: 'Stores all changes to application state as a sequence of immutable events. Current state is derived by replaying events from the event store.',
      diagram: EventSourcingDiagram,
      details: [
        {
          name: 'Domain Events',
          explanation: `Event sourcing stores all changes as a sequence of immutable events. Events are facts that happened and cannot be changed. Current state is derived by replaying events.

Core Concepts:
- Event Store: Append-only log of domain events
- Event Replay: Rebuild state by replaying events
- Snapshots: Performance optimization
- Projections: Derive read models from events

Benefits: Full audit trail, time travel, debugging, what-if analysis.`,
          codeExample: `// Domain events - immutable facts
public class OrderCreatedEvent {
  private final String orderId;
  private final String customerId;
  private final LocalDateTime timestamp;

  public OrderCreatedEvent(String orderId, String customerId, LocalDateTime timestamp) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.timestamp = timestamp;
  }

  // Only getters, no setters (immutable)
  public String getOrderId() { return orderId; }
  public String getCustomerId() { return customerId; }
  public LocalDateTime getTimestamp() { return timestamp; }
}

public class ItemAddedEvent {
  private final String orderId;
  private final String productId;
  private final int quantity;
  private final BigDecimal price;
  private final LocalDateTime timestamp;
  // Constructor and getters only
}

public class OrderShippedEvent {
  private final String orderId;
  private final String trackingNumber;
  private final LocalDateTime timestamp;
  // Constructor and getters only
}`
        },
        {
          name: 'Event Store Implementation',
          explanation: `The event store persists events with aggregate ID, type, data (JSON), timestamp, and version. Events are loaded and saved through a service that also publishes events for projections.

Storage Options:
- Relational database (PostgreSQL, MySQL)
- Event Store DB (specialized)
- Kafka (with compaction disabled)
- Custom implementations`,
          codeExample: `// Event store entity
@Entity
@Table(name = "event_store")
public class StoredEvent {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long sequence;
  private String aggregateId;
  private String eventType;
  @Lob
  private String eventData; // JSON serialized
  private LocalDateTime timestamp;
  private Long version;
}

// Event store service
@Service
public class EventStore {

  @Autowired
  private EventStoreRepository repository;
  @Autowired
  private ObjectMapper objectMapper;

  @Transactional
  public void saveEvent(String aggregateId, Object event) {
    StoredEvent storedEvent = new StoredEvent();
    storedEvent.setAggregateId(aggregateId);
    storedEvent.setEventType(event.getClass().getSimpleName());
    storedEvent.setEventData(objectMapper.writeValueAsString(event));
    storedEvent.setTimestamp(LocalDateTime.now());
    storedEvent.setVersion(getNextVersion(aggregateId));

    repository.save(storedEvent);
    eventPublisher.publishEvent(event);  // For projections
  }

  public List<Object> getEvents(String aggregateId) {
    return repository.findByAggregateIdOrderByVersionAsc(aggregateId)
      .stream()
      .map(this::deserializeEvent)
      .collect(Collectors.toList());
  }
}`
        },
        {
          name: 'Event-Sourced Aggregate',
          explanation: `Aggregates rebuild their state by replaying events. The apply() method handles each event type, and command methods generate new events.

Aggregate Pattern:
- Replay events to rebuild state
- Apply events to change state
- Generate events from commands
- Track uncommitted events`,
          codeExample: `// Aggregate root - state from events
public class Order {
  private String id;
  private String customerId;
  private List<OrderItem> items = new ArrayList<>();
  private String status;
  private BigDecimal totalAmount = BigDecimal.ZERO;
  private List<Object> uncommittedEvents = new ArrayList<>();

  // Replay events to rebuild state
  public void replay(List<Object> events) {
    for (Object event : events) {
      apply(event);
    }
  }

  // Apply event to change state
  private void apply(Object event) {
    if (event instanceof OrderCreatedEvent) {
      OrderCreatedEvent e = (OrderCreatedEvent) event;
      this.id = e.getOrderId();
      this.customerId = e.getCustomerId();
      this.status = "CREATED";
    } else if (event instanceof ItemAddedEvent) {
      ItemAddedEvent e = (ItemAddedEvent) event;
      this.items.add(new OrderItem(e.getProductId(), e.getQuantity(), e.getPrice()));
      this.totalAmount = this.totalAmount.add(
        e.getPrice().multiply(BigDecimal.valueOf(e.getQuantity())));
    } else if (event instanceof OrderShippedEvent) {
      this.status = "SHIPPED";
    }
  }

  // Command methods generate events
  public void addItem(String productId, int quantity, BigDecimal price) {
    ItemAddedEvent event = new ItemAddedEvent(this.id, productId, quantity, price, LocalDateTime.now());
    apply(event);
    uncommittedEvents.add(event);
  }
}`
        },
        {
          name: 'Snapshots for Performance',
          explanation: `Snapshots capture aggregate state periodically to avoid replaying all events. Load from snapshot, then replay only events after the snapshot version.

Snapshot Strategies:
- Every N events (e.g., 100)
- Time-based (e.g., daily)
- On-demand for hot aggregates
- Background snapshot generation`,
          codeExample: `// Enhanced repository with snapshots
@Service
public class OptimizedOrderRepository {

  private static final int SNAPSHOT_FREQUENCY = 100;

  public Order findById(String orderId) {
    // Load from snapshot if available
    Optional<Snapshot> snapshot = snapshotRepository.findById(orderId);

    Order order = new Order();
    Long fromVersion = 0L;

    if (snapshot.isPresent()) {
      order = deserializeSnapshot(snapshot.get());
      fromVersion = snapshot.get().getVersion();
    }

    // Load events after snapshot
    List<Object> events = eventStore.getEventsAfterVersion(orderId, fromVersion);
    order.replay(events);

    return order;
  }

  @Transactional
  public void save(Order order) {
    List<Object> events = order.getUncommittedEvents();

    for (Object event : events) {
      eventStore.saveEvent(order.getId(), event);
    }

    // Create snapshot periodically
    Long totalEvents = eventStore.getEventCount(order.getId());
    if (totalEvents % SNAPSHOT_FREQUENCY == 0) {
      createSnapshot(order, totalEvents);
    }

    order.markEventsAsCommitted();
  }

  private void createSnapshot(Order order, Long version) {
    Snapshot snapshot = new Snapshot();
    snapshot.setAggregateId(order.getId());
    snapshot.setState(objectMapper.writeValueAsString(order));
    snapshot.setVersion(version);
    snapshotRepository.save(snapshot);
  }
}
// Output: Snapshots reduce event replay time`
        }
      ]
    },
    {
      id: 'sidecar',
      name: 'Sidecar Pattern',
      icon: '🛸',
      color: '#06b6d4',
      description: 'Deploys a helper component alongside the main application to provide cross-cutting concerns. Foundation for service mesh architectures.',
      diagram: SidecarDiagram,
      details: [
        {
          name: 'Kubernetes Sidecar',
          explanation: `Sidecar pattern deploys helper components alongside the main application in the same pod. The sidecar shares resources with the main app and handles cross-cutting concerns.

Use Cases:
- Service mesh proxies (Envoy)
- Logging agents (Fluentd, Filebeat)
- Metrics collectors (Prometheus)
- Security (mTLS, authentication)
- Config watchers

Benefits: Language agnostic, independent lifecycle, separation of concerns.`,
          codeExample: `// Kubernetes Deployment with Sidecar
/*
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 3
  template:
    spec:
      containers:
      # Main application container
      - name: order-service
        image: order-service:1.0
        ports:
        - containerPort: 8080
        volumeMounts:
        - name: shared-logs
          mountPath: /var/log/app

      # Logging sidecar
      - name: log-aggregator
        image: fluentd:latest
        volumeMounts:
        - name: shared-logs
          mountPath: /var/log/app
        env:
        - name: FLUENT_ELASTICSEARCH_HOST
          value: "elasticsearch.default.svc.cluster.local"

      # Envoy proxy sidecar
      - name: envoy-proxy
        image: envoyproxy/envoy:latest
        ports:
        - containerPort: 9901

      volumes:
      - name: shared-logs
        emptyDir: {}
*/`
        },
        {
          name: 'Main App Communication',
          explanation: `The main application is unaware of the sidecar's existence. It makes local calls that the sidecar intercepts and handles transparently.

Sidecar Responsibilities:
- Request logging and tracing
- Metrics collection
- Authentication/authorization
- Retries and circuit breaking
- Load balancing
- TLS encryption`,
          codeExample: `// Main application - unaware of sidecar
@RestController
@RequestMapping("/api/orders")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @GetMapping("/{id}")
  public Order getOrder(@PathVariable String id) {
    // Application logic only
    // Sidecar handles:
    // - Request logging
    // - Metrics collection
    // - Distributed tracing
    // - Authentication (via service mesh)
    return orderService.getOrder(id);
  }
}

// Service calls go through sidecar proxy
@Service
public class OrderService {

  // Call other services via localhost sidecar
  private static final String INVENTORY_SERVICE = "http://localhost:15001/api/inventory";

  public Order createOrder(CreateOrderRequest request) {
    // Sidecar intercepts and:
    // 1. Resolves service discovery
    // 2. Load balances across instances
    // 3. Handles TLS encryption
    // 4. Adds tracing headers
    InventoryResponse inventory = restTemplate.getForObject(
      INVENTORY_SERVICE + "/check?productId=" + request.getProductId(),
      InventoryResponse.class
    );

    Order order = new Order();
    order.setId(UUID.randomUUID().toString());
    return order;
  }
}`
        },
        {
          name: 'Envoy Proxy Configuration',
          explanation: `Envoy is a popular sidecar proxy for service mesh. It handles routing, load balancing, health checks, and observability.

Envoy Features:
- HTTP/gRPC routing
- Automatic retries
- Circuit breaking
- Rate limiting
- mTLS encryption
- Distributed tracing`,
          codeExample: `// Envoy sidecar configuration (envoy.yaml)
/*
static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address:
        address: 0.0.0.0
        port_value: 15001
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          route_config:
            virtual_hosts:
            - name: inventory_service
              domains: ["*"]
              routes:
              - match:
                  prefix: "/api/inventory"
                route:
                  cluster: inventory_cluster

  clusters:
  - name: inventory_cluster
    connect_timeout: 0.25s
    type: STRICT_DNS
    lb_policy: ROUND_ROBIN
    load_assignment:
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: inventory-service.default.svc.cluster.local
                port_value: 8080
*/`
        },
        {
          name: 'Config Watcher Sidecar',
          explanation: `A config watcher sidecar monitors configuration files and triggers application reloads when changes are detected.

Use Cases:
- Dynamic configuration updates
- Secret rotation
- Feature flag changes
- Certificate renewal`,
          codeExample: `// Config watcher sidecar
public class ConfigWatcherSidecar {

  private static final String SHARED_CONFIG_PATH = "/etc/config/application.yml";
  private static final String APP_RELOAD_URL = "http://localhost:8080/actuator/refresh";

  public static void main(String[] args) throws Exception {
    WatchService watchService = FileSystems.getDefault().newWatchService();
    Path configDir = Paths.get("/etc/config");

    configDir.register(watchService, StandardWatchEventKinds.ENTRY_MODIFY);
    System.out.println("Config watcher sidecar started");

    while (true) {
      WatchKey key = watchService.take();

      for (WatchEvent<?> event : key.pollEvents()) {
        if (event.context().toString().equals("application.yml")) {
          System.out.println("Config file changed, reloading app...");

          HttpClient client = HttpClient.newHttpClient();
          HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(APP_RELOAD_URL))
            .POST(HttpRequest.BodyPublishers.noBody())
            .build();

          HttpResponse<String> response = client.send(
            request, HttpResponse.BodyHandlers.ofString()
          );
          System.out.println("App reload response: " + response.statusCode());
        }
      }
      key.reset();
    }
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
      { name: 'Design', icon: '🎨', page: 'Design' },
      { name: 'Microservice Patterns', icon: '🏗️', page: 'Microservice Patterns' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #312e81 50%, #0f172a 100%)',
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

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Microservice Patterns</h1>
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
          ← Back to Design
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={TOPIC_COLORS}
        />
      </div>

      {/* Introduction */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid rgba(139, 92, 246, 0.3)'
      }}>
        <p style={{
          color: '#94a3b8',
          lineHeight: '1.8',
          margin: 0,
          textAlign: 'center',
          fontSize: '1.1rem'
        }}>
          Microservice patterns are proven architectural solutions for building distributed systems.
          These patterns address common challenges like service communication, data management, resilience, and deployment.
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
              onMainMenu={breadcrumb?.onMainMenu}
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
              const DiagramComponent = selectedConcept.diagram
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
                    whiteSpace: 'pre-line'
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

export default MicroservicePatterns

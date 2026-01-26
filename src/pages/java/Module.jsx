/**
 * Module.jsx - Java Modular Architecture Patterns
 *
 * Covers DDD, Bounded Contexts, Microservices, Event Sourcing, CQRS,
 * Hexagonal Architecture, Saga Pattern, and API Composition.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const MODULE_COLORS = {
  primary: '#64748b',           // Slate primary
  primaryHover: '#94a3b8',      // Slate hover
  bg: 'rgba(100, 116, 139, 0.1)', // Background with transparency
  border: 'rgba(100, 116, 139, 0.3)', // Border color
  arrow: '#64748b',             // Arrow/indicator color
  hoverBg: 'rgba(100, 116, 139, 0.2)', // Hover background
  topicBg: 'rgba(100, 116, 139, 0.2)'  // Topic card background
}

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

// Module Graph Diagram - shows how modules relate and depend on each other
const ModuleGraphDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-module" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
      <linearGradient id="moduleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Module Dependency Graph
    </text>

    {/* Core Domain Module */}
    <rect x="320" y="50" width="160" height="60" rx="8" fill="url(#moduleGrad)" stroke="#64748b" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">Core Domain</text>
    <text x="400" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Business Logic</text>

    {/* Application Module */}
    <rect x="120" y="150" width="140" height="50" rx="8" fill="url(#moduleGrad)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="190" y="180" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">Application</text>

    {/* Infrastructure Module */}
    <rect x="330" y="150" width="140" height="50" rx="8" fill="url(#moduleGrad)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="180" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">Infrastructure</text>

    {/* API Module */}
    <rect x="540" y="150" width="140" height="50" rx="8" fill="url(#moduleGrad)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="610" y="180" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">API Layer</text>

    {/* Adapters */}
    <rect x="220" y="230" width="120" height="40" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="280" y="255" textAnchor="middle" fill="#a78bfa" fontSize="10">DB Adapter</text>

    <rect x="480" y="230" width="120" height="40" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="1"/>
    <text x="540" y="255" textAnchor="middle" fill="#f472b6" fontSize="10">REST Adapter</text>

    {/* Arrows - dependencies flow upward */}
    <line x1="190" y1="150" x2="330" y2="110" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-module)"/>
    <line x1="400" y1="150" x2="400" y2="115" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-module)"/>
    <line x1="610" y1="150" x2="470" y2="110" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-module)"/>
    <line x1="280" y1="230" x2="380" y2="205" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-module)"/>
    <line x1="540" y1="230" x2="420" y2="205" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-module)"/>

    {/* Labels */}
    <text x="250" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">requires</text>
    <text x="550" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">requires</text>
  </svg>
)

// Exports/Requires Diagram - shows module exports and requires relationships
const ExportsRequiresDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-export" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Module Exports and Requires
    </text>

    {/* Module A */}
    <rect x="50" y="60" width="200" height="130" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
    <text x="150" y="85" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">module.sales</text>
    <line x1="60" y1="95" x2="240" y2="95" stroke="#334155" strokeWidth="1"/>
    <text x="70" y="115" fill="#94a3b8" fontSize="10">exports com.sales.api</text>
    <text x="70" y="135" fill="#94a3b8" fontSize="10">exports com.sales.model</text>
    <text x="70" y="160" fill="#64748b" fontSize="10">// internal packages hidden</text>
    <text x="70" y="175" fill="#475569" fontSize="9" fontStyle="italic">com.sales.internal</text>

    {/* Module B */}
    <rect x="550" y="60" width="200" height="130" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <text x="650" y="85" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">module.billing</text>
    <line x1="560" y1="95" x2="740" y2="95" stroke="#334155" strokeWidth="1"/>
    <text x="560" y="115" fill="#94a3b8" fontSize="10">requires module.sales</text>
    <text x="560" y="140" fill="#94a3b8" fontSize="10">exports com.billing.api</text>
    <text x="560" y="165" fill="#64748b" fontSize="10">// can access sales.api</text>

    {/* Arrow showing dependency */}
    <path d="M 550 125 Q 400 80 255 125" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-export)"/>
    <text x="400" y="95" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">requires</text>
  </svg>
)

// Services Diagram - shows service provider interface pattern
const ServicesDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-service" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Service Provider Interface (SPI) Pattern
    </text>

    {/* Service Interface Module */}
    <rect x="280" y="50" width="240" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">module.api</text>
    <text x="400" y="100" textAnchor="middle" fill="#94a3b8" fontSize="10">uses PaymentService</text>

    {/* Provider A */}
    <rect x="80" y="180" width="180" height="80" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="170" y="205" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">module.stripe</text>
    <text x="170" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">provides PaymentService</text>
    <text x="170" y="245" textAnchor="middle" fill="#64748b" fontSize="9">with StripePayment</text>

    {/* Provider B */}
    <rect x="310" y="180" width="180" height="80" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="2"/>
    <text x="400" y="205" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">module.paypal</text>
    <text x="400" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">provides PaymentService</text>
    <text x="400" y="245" textAnchor="middle" fill="#64748b" fontSize="9">with PayPalPayment</text>

    {/* Provider C */}
    <rect x="540" y="180" width="180" height="80" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2"/>
    <text x="630" y="205" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">module.square</text>
    <text x="630" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">provides PaymentService</text>
    <text x="630" y="245" textAnchor="middle" fill="#64748b" fontSize="9">with SquarePayment</text>

    {/* Arrows */}
    <line x1="170" y1="180" x2="350" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-service)"/>
    <line x1="400" y1="180" x2="400" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-service)"/>
    <line x1="630" y1="180" x2="450" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-service)"/>

    {/* ServiceLoader indicator */}
    <text x="400" y="155" textAnchor="middle" fill="#fbbf24" fontSize="10">ServiceLoader discovers at runtime</text>
  </svg>
)

// DDD Aggregate Diagram
const AggregateDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-agg" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#9333ea" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      DDD Aggregate Boundary
    </text>

    {/* Aggregate boundary */}
    <rect x="150" y="50" width="500" height="180" rx="12" fill="rgba(147, 51, 234, 0.1)" stroke="#9333ea" strokeWidth="2" strokeDasharray="8,4"/>
    <text x="180" y="75" fill="#a855f7" fontSize="11" fontWeight="bold">Order Aggregate</text>

    {/* Aggregate Root */}
    <rect x="320" y="90" width="160" height="50" rx="8" fill="#7c3aed" stroke="#a855f7" strokeWidth="2"/>
    <text x="400" y="120" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Order (Root)</text>

    {/* Entities */}
    <rect x="180" y="160" width="120" height="45" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1"/>
    <text x="240" y="187" textAnchor="middle" fill="#94a3b8" fontSize="10">OrderLine</text>

    <rect x="340" y="160" width="120" height="45" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1"/>
    <text x="400" y="187" textAnchor="middle" fill="#94a3b8" fontSize="10">ShippingAddress</text>

    <rect x="500" y="160" width="120" height="45" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1"/>
    <text x="560" y="187" textAnchor="middle" fill="#94a3b8" fontSize="10">Payment</text>

    {/* Arrows from root to entities */}
    <line x1="340" y1="140" x2="270" y2="155" stroke="#9333ea" strokeWidth="1.5" markerEnd="url(#arrow-agg)"/>
    <line x1="400" y1="140" x2="400" y2="155" stroke="#9333ea" strokeWidth="1.5" markerEnd="url(#arrow-agg)"/>
    <line x1="460" y1="140" x2="530" y2="155" stroke="#9333ea" strokeWidth="1.5" markerEnd="url(#arrow-agg)"/>

    {/* External access indicator */}
    <text x="50" y="115" textAnchor="start" fill="#ef4444" fontSize="10">External</text>
    <text x="50" y="130" textAnchor="start" fill="#ef4444" fontSize="10">Access</text>
    <line x1="100" y1="115" x2="315" y2="115" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-agg)" strokeDasharray="4,2"/>
    <text x="680" y="130" textAnchor="end" fill="#94a3b8" fontSize="9">Only through Root</text>
  </svg>
)

// CQRS Diagram
const CQRSDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-cqrs" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Command Query Responsibility Segregation
    </text>

    {/* Command Side */}
    <rect x="50" y="60" width="300" height="200" rx="10" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="85" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Command Side (Write)</text>

    <rect x="80" y="100" width="100" height="40" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="1"/>
    <text x="130" y="125" textAnchor="middle" fill="#fca5a5" fontSize="10">Command</text>

    <rect x="80" y="160" width="100" height="40" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="1"/>
    <text x="130" y="185" textAnchor="middle" fill="#fca5a5" fontSize="10">Handler</text>

    <rect x="220" y="130" width="110" height="50" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2"/>
    <text x="275" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Event Store</text>
    <text x="275" y="168" textAnchor="middle" fill="#fca5a5" fontSize="9">Write Model</text>

    {/* Query Side */}
    <rect x="450" y="60" width="300" height="200" rx="10" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="85" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Query Side (Read)</text>

    <rect x="480" y="100" width="100" height="40" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="1"/>
    <text x="530" y="125" textAnchor="middle" fill="#86efac" fontSize="10">Query</text>

    <rect x="480" y="160" width="100" height="40" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="1"/>
    <text x="530" y="185" textAnchor="middle" fill="#86efac" fontSize="10">Handler</text>

    <rect x="620" y="130" width="110" height="50" rx="6" fill="#14532d" stroke="#22c55e" strokeWidth="2"/>
    <text x="675" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Read DB</text>
    <text x="675" y="168" textAnchor="middle" fill="#86efac" fontSize="9">Projections</text>

    {/* Event flow */}
    <path d="M 330 155 Q 390 200 450 155" fill="none" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-cqrs)"/>
    <text x="390" y="215" textAnchor="middle" fill="#f472b6" fontSize="10">Events sync</text>

    {/* Arrows */}
    <line x1="130" y1="140" x2="130" y2="155" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow-cqrs)"/>
    <line x1="180" y1="175" x2="215" y2="165" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow-cqrs)"/>
    <line x1="530" y1="140" x2="530" y2="155" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-cqrs)"/>
    <line x1="580" y1="175" x2="615" y2="165" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-cqrs)"/>
  </svg>
)

// Hexagonal Architecture Diagram
const HexagonalDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-hex" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Hexagonal Architecture (Ports and Adapters)
    </text>

    {/* Hexagon - Domain Core */}
    <polygon points="400,60 520,100 520,200 400,240 280,200 280,100" fill="rgba(20, 184, 166, 0.2)" stroke="#14b8a6" strokeWidth="3"/>
    <text x="400" y="130" textAnchor="middle" fill="#2dd4bf" fontSize="14" fontWeight="bold">Domain</text>
    <text x="400" y="150" textAnchor="middle" fill="#5eead4" fontSize="11">Core</text>
    <text x="400" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">Business Logic</text>

    {/* Primary Adapters (left) */}
    <rect x="50" y="80" width="100" height="40" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
    <text x="100" y="105" textAnchor="middle" fill="#60a5fa" fontSize="10">REST API</text>

    <rect x="50" y="140" width="100" height="40" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="100" y="165" textAnchor="middle" fill="#a78bfa" fontSize="10">GraphQL</text>

    <rect x="50" y="200" width="100" height="40" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="2"/>
    <text x="100" y="225" textAnchor="middle" fill="#f472b6" fontSize="10">CLI</text>

    {/* Secondary Adapters (right) */}
    <rect x="650" y="80" width="100" height="40" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <text x="700" y="105" textAnchor="middle" fill="#4ade80" fontSize="10">PostgreSQL</text>

    <rect x="650" y="140" width="100" height="40" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
    <text x="700" y="165" textAnchor="middle" fill="#fbbf24" fontSize="10">Redis</text>

    <rect x="650" y="200" width="100" height="40" rx="6" fill="#1e293b" stroke="#06b6d4" strokeWidth="2"/>
    <text x="700" y="225" textAnchor="middle" fill="#22d3ee" fontSize="10">Kafka</text>

    {/* Ports labels */}
    <text x="200" y="60" textAnchor="middle" fill="#64748b" fontSize="10">Primary Ports</text>
    <text x="200" y="75" textAnchor="middle" fill="#64748b" fontSize="9">(Driving)</text>
    <text x="600" y="60" textAnchor="middle" fill="#64748b" fontSize="10">Secondary Ports</text>
    <text x="600" y="75" textAnchor="middle" fill="#64748b" fontSize="9">(Driven)</text>

    {/* Arrows */}
    <line x1="150" y1="100" x2="275" y2="120" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-hex)"/>
    <line x1="150" y1="160" x2="275" y2="150" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-hex)"/>
    <line x1="150" y1="220" x2="275" y2="180" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-hex)"/>
    <line x1="525" y1="120" x2="645" y2="100" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-hex)"/>
    <line x1="525" y1="150" x2="645" y2="160" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-hex)"/>
    <line x1="525" y1="180" x2="645" y2="220" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-hex)"/>

    {/* Bottom labels */}
    <text x="400" y="280" textAnchor="middle" fill="#94a3b8" fontSize="10">Domain remains isolated from infrastructure concerns</text>
    <text x="400" y="300" textAnchor="middle" fill="#64748b" fontSize="9">Adapters translate between external formats and domain</text>
  </svg>
)

// Saga Pattern Diagram
const SagaDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-saga" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
      <marker id="arrow-saga-comp" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Saga Pattern with Compensating Transactions
    </text>

    {/* Steps */}
    <rect x="50" y="60" width="120" height="50" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <text x="110" y="90" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">1. Reserve</text>

    <rect x="220" y="60" width="120" height="50" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <text x="280" y="90" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">2. Charge</text>

    <rect x="390" y="60" width="120" height="50" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2"/>
    <text x="450" y="90" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">3. Ship FAIL</text>

    {/* Forward arrows */}
    <line x1="170" y1="85" x2="215" y2="85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-saga)"/>
    <line x1="340" y1="85" x2="385" y2="85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-saga)"/>

    {/* Compensation flow */}
    <text x="400" y="140" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Compensation (Rollback)</text>

    <rect x="220" y="160" width="120" height="50" rx="8" fill="#1e293b" stroke="#f97316" strokeWidth="2"/>
    <text x="280" y="190" textAnchor="middle" fill="#fb923c" fontSize="10" fontWeight="bold">Refund</text>

    <rect x="50" y="160" width="120" height="50" rx="8" fill="#1e293b" stroke="#f97316" strokeWidth="2"/>
    <text x="110" y="190" textAnchor="middle" fill="#fb923c" fontSize="10" fontWeight="bold">Release</text>

    {/* Compensation arrows */}
    <path d="M 450 115 Q 450 140 340 175" fill="none" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrow-saga-comp)"/>
    <line x1="220" y1="185" x2="175" y2="185" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrow-saga-comp)"/>

    {/* Legend */}
    <rect x="560" y="60" width="200" height="90" rx="8" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="660" y="85" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Saga Steps:</text>
    <line x1="580" y1="105" x2="620" y2="105" stroke="#22c55e" strokeWidth="2"/>
    <text x="630" y="108" fill="#4ade80" fontSize="9">Forward</text>
    <line x1="580" y1="125" x2="620" y2="125" stroke="#f97316" strokeWidth="2"/>
    <text x="630" y="128" fill="#fb923c" fontSize="9">Compensate</text>

    {/* Bottom note */}
    <text x="400" y="250" textAnchor="middle" fill="#94a3b8" fontSize="10">Each step has a compensating transaction for rollback</text>
  </svg>
)

// Event Sourcing Diagram
const EventSourcingDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-es" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Event Sourcing - Event Store and Replay
    </text>

    {/* Event Stream */}
    <text x="80" y="55" fill="#64748b" fontSize="10">Event Stream</text>
    <rect x="60" y="65" width="680" height="60" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2"/>

    {/* Events */}
    <rect x="80" y="80" width="100" height="30" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1"/>
    <text x="130" y="100" textAnchor="middle" fill="#fcd34d" fontSize="9">AccountOpened</text>

    <rect x="200" y="80" width="100" height="30" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1"/>
    <text x="250" y="100" textAnchor="middle" fill="#fcd34d" fontSize="9">MoneyDeposited</text>

    <rect x="320" y="80" width="100" height="30" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1"/>
    <text x="370" y="100" textAnchor="middle" fill="#fcd34d" fontSize="9">MoneyWithdrawn</text>

    <rect x="440" y="80" width="100" height="30" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1"/>
    <text x="490" y="100" textAnchor="middle" fill="#fcd34d" fontSize="9">MoneyDeposited</text>

    <rect x="560" y="80" width="100" height="30" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1"/>
    <text x="610" y="100" textAnchor="middle" fill="#fcd34d" fontSize="9">AccountClosed</text>

    {/* Version numbers */}
    <text x="130" y="70" textAnchor="middle" fill="#94a3b8" fontSize="8">v1</text>
    <text x="250" y="70" textAnchor="middle" fill="#94a3b8" fontSize="8">v2</text>
    <text x="370" y="70" textAnchor="middle" fill="#94a3b8" fontSize="8">v3</text>
    <text x="490" y="70" textAnchor="middle" fill="#94a3b8" fontSize="8">v4</text>
    <text x="610" y="70" textAnchor="middle" fill="#94a3b8" fontSize="8">v5</text>

    {/* Replay arrow */}
    <path d="M 400 135 L 400 165" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-es)"/>
    <text x="430" y="155" fill="#fbbf24" fontSize="10">Replay</text>

    {/* Current State */}
    <rect x="280" y="170" width="240" height="60" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="195" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Current State</text>
    <text x="400" y="215" textAnchor="middle" fill="#94a3b8" fontSize="10">Rebuilt from events</text>

    {/* Benefits */}
    <text x="80" y="200" fill="#64748b" fontSize="9">+ Complete audit trail</text>
    <text x="80" y="215" fill="#64748b" fontSize="9">+ Time travel queries</text>
    <text x="600" y="200" fill="#64748b" fontSize="9">+ Event replay</text>
    <text x="600" y="215" fill="#64748b" fontSize="9">+ Debug capabilities</text>
  </svg>
)

// API Composition Diagram
const APICompositionDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-api" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      API Composition Pattern
    </text>

    {/* Client */}
    <rect x="340" y="50" width="120" height="40" rx="6" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">Client</text>

    {/* API Gateway / BFF */}
    <rect x="300" y="120" width="200" height="50" rx="8" fill="#4f46e5" stroke="#818cf8" strokeWidth="2"/>
    <text x="400" y="150" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">API Gateway / BFF</text>

    {/* Microservices */}
    <rect x="80" y="210" width="130" height="45" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
    <text x="145" y="237" textAnchor="middle" fill="#60a5fa" fontSize="10">Order Service</text>

    <rect x="250" y="210" width="130" height="45" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <text x="315" y="237" textAnchor="middle" fill="#4ade80" fontSize="10">Customer Service</text>

    <rect x="420" y="210" width="130" height="45" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
    <text x="485" y="237" textAnchor="middle" fill="#fbbf24" fontSize="10">Shipping Service</text>

    <rect x="590" y="210" width="130" height="45" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="2"/>
    <text x="655" y="237" textAnchor="middle" fill="#f472b6" fontSize="10">Review Service</text>

    {/* Arrows */}
    <line x1="400" y1="90" x2="400" y2="115" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-api)"/>
    <line x1="320" y1="170" x2="170" y2="205" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-api)"/>
    <line x1="360" y1="170" x2="315" y2="205" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-api)"/>
    <line x1="440" y1="170" x2="485" y2="205" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-api)"/>
    <line x1="480" y1="170" x2="630" y2="205" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-api)"/>

    {/* Parallel indicator */}
    <text x="400" y="195" textAnchor="middle" fill="#a5b4fc" fontSize="9">Parallel calls with CompletableFuture</text>
  </svg>
)

// Microservices Discovery Diagram
const ServiceDiscoveryDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-disc" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Service Discovery with Eureka
    </text>

    {/* Service Registry */}
    <rect x="320" y="50" width="160" height="60" rx="10" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Eureka Server</text>
    <text x="400" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="9">Service Registry</text>

    {/* Services */}
    <rect x="80" y="160" width="140" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
    <text x="150" y="180" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Order Service</text>
    <text x="150" y="198" textAnchor="middle" fill="#94a3b8" fontSize="8">Instance 1, 2, 3</text>

    <rect x="330" y="160" width="140" height="50" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="180" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Inventory</text>
    <text x="400" y="198" textAnchor="middle" fill="#94a3b8" fontSize="8">Instance 1, 2</text>

    <rect x="580" y="160" width="140" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
    <text x="650" y="180" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Payment</text>
    <text x="650" y="198" textAnchor="middle" fill="#94a3b8" fontSize="8">Instance 1</text>

    {/* Register arrows (up) */}
    <line x1="150" y1="160" x2="340" y2="115" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-disc)"/>
    <line x1="400" y1="160" x2="400" y2="115" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-disc)"/>
    <line x1="650" y1="160" x2="460" y2="115" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-disc)"/>

    {/* Labels */}
    <text x="230" y="130" textAnchor="middle" fill="#a78bfa" fontSize="9">register</text>
    <text x="370" y="140" textAnchor="start" fill="#a78bfa" fontSize="9">heartbeat</text>
    <text x="560" y="130" textAnchor="middle" fill="#a78bfa" fontSize="9">register</text>

    {/* Discovery flow */}
    <rect x="80" y="240" width="140" height="30" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="150" y="260" textAnchor="middle" fill="#a78bfa" fontSize="9">Client: where is Inventory?</text>

    <path d="M 220 250 Q 280 250 320 100" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4,2"/>
    <path d="M 320 100 Q 350 250 400 235" fill="none" stroke="#4ade80" strokeWidth="1.5" markerEnd="url(#arrow-disc)"/>
    <text x="350" y="220" fill="#4ade80" fontSize="8">returns: inventory:8080, :8081</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Module({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'ddd',
      name: 'Domain-Driven Design',
      icon: '🏗️',
      color: '#9333ea',
      description: 'Strategic design patterns for complex business domains with ubiquitous language, bounded contexts, and rich domain models.',
      diagram: AggregateDiagram,
      details: [
        {
          name: 'Ubiquitous Language',
          explanation: 'Domain-specific terminology shared between technical and business teams. Business concepts modeled directly in code using domain terms like "deposit" and "withdraw" instead of generic terms. This creates a shared vocabulary that reduces miscommunication and makes code self-documenting.',
          codeExample: `// Domain language reflected in code
public class BankAccount {
    private Money balance;

    public void deposit(Money amount) {
        validatePositiveAmount(amount);
        this.balance = balance.add(amount);
        publish(new MoneyDeposited(accountId, amount));
    }

    public void withdraw(Money amount) {
        validateSufficientFunds(amount);
        this.balance = balance.subtract(amount);
        publish(new MoneyWithdrawn(accountId, amount));
    }
}`
        },
        {
          name: 'Bounded Context',
          diagram: ModuleGraphDiagram,
          explanation: 'Clear boundaries between different domain models. Same entity (Customer) has different meanings in Sales vs Support contexts, enabling independent evolution. Each bounded context owns its data and logic, communicating through well-defined interfaces.',
          codeExample: `// Sales Context - Customer focused on purchases
package com.app.sales;
public class Customer {
    private CustomerId id;
    private CreditLimit creditLimit;
    private List<Order> orderHistory;

    public boolean canPlaceOrder(Money amount) {
        return creditLimit.allows(amount);
    }
}

// Support Context - Customer focused on tickets
package com.app.support;
public class Customer {
    private CustomerId id;
    private SupportTier tier;
    private List<Ticket> openTickets;

    public Duration getResponseTime() {
        return tier.getGuaranteedResponseTime();
    }
}`
        },
        {
          name: 'Aggregates',
          diagram: AggregateDiagram,
          explanation: 'Consistency boundaries grouping related entities. Order aggregate maintains invariants like total matching line items, accessed only through aggregate root. Changes to entities within an aggregate are atomic and maintain business rules.',
          codeExample: `public class Order { // Aggregate Root
    private OrderId id;
    private List<OrderLine> lines = new ArrayList<>();
    private Money total = Money.ZERO;

    public void addLine(Product product, int quantity) {
        OrderLine line = new OrderLine(product, quantity);
        lines.add(line);
        recalculateTotal(); // Maintains invariant
    }

    private void recalculateTotal() {
        this.total = lines.stream()
            .map(OrderLine::getSubtotal)
            .reduce(Money.ZERO, Money::add);
    }
}`
        }
      ]
    },
    {
      id: 'bounded-contexts',
      name: 'Bounded Contexts',
      icon: '🔲',
      color: '#a855f7',
      description: 'Define clear boundaries between different domain models to manage complexity and enable independent evolution.',
      diagram: ExportsRequiresDiagram,
      details: [
        {
          name: 'Context Mapping',
          diagram: ModuleGraphDiagram,
          explanation: 'Relationships between bounded contexts: Shared Kernel (shared code), Customer/Supplier (dependency relationship), Anti-Corruption Layer (translate external models). Understanding these patterns helps design clean integrations.',
          codeExample: `// Shared Kernel - common code between contexts
package com.app.shared;
public class Money {
    private BigDecimal amount;
    private Currency currency;
    // Used by both Sales and Billing contexts
}

// Customer/Supplier - downstream depends on upstream
@FeignClient("inventory-service")
public interface InventoryClient {
    @GetMapping("/products/{id}/availability")
    Availability checkAvailability(@PathVariable String id);
}`
        },
        {
          name: 'Integration Patterns',
          explanation: 'How contexts communicate: REST APIs for Customer/Supplier, events for loosely coupled contexts, adapters to translate between models. Event-driven integration enables temporal decoupling and better scalability.',
          codeExample: `// Event-based integration between contexts
@Component
public class OrderEventPublisher {
    private final KafkaTemplate<String, OrderEvent> kafka;

    public void publishOrderPlaced(Order order) {
        OrderPlacedEvent event = new OrderPlacedEvent(
            order.getId(), order.getCustomerId(), order.getTotal()
        );
        kafka.send("order-events", event);
    }
}

// Different context consumes the event
@KafkaListener(topics = "order-events")
public void handleOrderPlaced(OrderPlacedEvent event) {
    shippingService.prepareShipment(event.getOrderId());
}`
        },
        {
          name: 'Anti-Corruption Layer',
          explanation: 'Translates between external models and your domain model. Protects your bounded context from being polluted by external concepts and terminology. Essential when integrating with legacy systems or third-party APIs.',
          codeExample: `// Anti-Corruption Layer for legacy system
public class LegacyOrderAdapter {
    private final LegacyOrderSystem legacy;
    private final OrderTranslator translator;

    public Order findOrder(OrderId id) {
        // Fetch from legacy system
        LegacyOrderRecord record = legacy.getOrderByCode(id.toString());

        // Translate to our domain model
        return translator.toDomainOrder(record);
    }
}

public class OrderTranslator {
    public Order toDomainOrder(LegacyOrderRecord record) {
        return Order.builder()
            .id(new OrderId(record.getOrderCode()))
            .status(mapStatus(record.getStatusFlag()))
            .customer(mapCustomer(record.getCustNum()))
            .build();
    }
}`
        }
      ]
    },
    {
      id: 'microservices',
      name: 'Microservices Patterns',
      icon: '🔧',
      color: '#8b5cf6',
      description: 'Architectural patterns for building distributed systems with independent, loosely coupled services.',
      diagram: ServiceDiscoveryDiagram,
      details: [
        {
          name: 'Service Discovery',
          diagram: ServiceDiscoveryDiagram,
          explanation: 'Dynamic service location with Eureka/Consul. Services register themselves, clients discover via service name, enables load balancing and failover. No hardcoded URLs means services can scale elastically.',
          codeExample: `// Service registration with Eureka
@SpringBootApplication
@EnableDiscoveryClient
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}

// application.yml
spring:
  application:
    name: order-service
eureka:
  client:
    serviceUrl:
      defaultZone: http://eureka:8761/eureka/

// Client-side discovery with load balancing
@FeignClient(name = "inventory-service")
public interface InventoryClient {
    @GetMapping("/api/inventory/{productId}")
    InventoryStatus checkInventory(@PathVariable String productId);
}`
        },
        {
          name: 'API Gateway',
          explanation: 'Single entry point for all clients. Handles routing, authentication, rate limiting, circuit breaking, and protocol translation. Simplifies client logic and provides cross-cutting concerns in one place.',
          codeExample: `// Spring Cloud Gateway configuration
@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("order-service", r -> r
                .path("/api/orders/**")
                .filters(f -> f
                    .circuitBreaker(c -> c.setName("orderCB"))
                    .requestRateLimiter(rl -> rl.setRateLimiter(redisRateLimiter()))
                    .addRequestHeader("X-Request-Id", UUID.randomUUID().toString()))
                .uri("lb://order-service"))
            .route("user-service", r -> r
                .path("/api/users/**")
                .uri("lb://user-service"))
            .build();
    }
}`
        },
        {
          name: 'Circuit Breaker',
          explanation: 'Prevents cascading failures in distributed systems. When a service fails repeatedly, the circuit opens and fails fast, giving the failing service time to recover. Supports fallback responses for graceful degradation.',
          codeExample: `// Resilience4j Circuit Breaker
@Service
public class OrderService {
    private final InventoryClient inventoryClient;

    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackInventory")
    @Retry(name = "inventory")
    @TimeLimiter(name = "inventory")
    public CompletableFuture<InventoryStatus> checkInventory(String productId) {
        return CompletableFuture.supplyAsync(() ->
            inventoryClient.checkInventory(productId));
    }

    public CompletableFuture<InventoryStatus> fallbackInventory(
            String productId, Exception ex) {
        log.warn("Inventory service unavailable, using cached data");
        return CompletableFuture.completedFuture(
            cachedInventory.getOrDefault(productId, InventoryStatus.UNKNOWN));
    }
}

// application.yml configuration
resilience4j.circuitbreaker:
  instances:
    inventory:
      slidingWindowSize: 10
      failureRateThreshold: 50
      waitDurationInOpenState: 30s`
        }
      ]
    },
    {
      id: 'event-sourcing',
      name: 'Event Sourcing',
      icon: '📜',
      color: '#f59e0b',
      description: 'Store all changes to application state as a sequence of events, enabling complete audit trails and temporal queries.',
      diagram: EventSourcingDiagram,
      details: [
        {
          name: 'Event Store',
          diagram: EventSourcingDiagram,
          explanation: 'Persist domain events instead of current state. Rebuild aggregate state by replaying events. Enables time travel, complete audit trail, and event-driven architectures. Events are immutable facts about what happened.',
          codeExample: `// Event Store interface
public interface EventStore {
    void append(String streamId, List<DomainEvent> events, long expectedVersion);
    List<DomainEvent> loadEvents(String streamId);
    List<DomainEvent> loadEvents(String streamId, long fromVersion);
}

// Storing events
public class AccountEventStore {
    private final EventStore eventStore;

    public void save(Account account) {
        List<DomainEvent> newEvents = account.getUncommittedEvents();
        eventStore.append(
            "account-" + account.getId(),
            newEvents,
            account.getVersion()
        );
        account.markEventsAsCommitted();
    }
}`
        },
        {
          name: 'Event Replay',
          explanation: 'Reconstruct aggregate state from event stream. Apply events in order to rebuild current state. Supports temporal queries and debugging. Can rebuild read models or fix bugs by replaying with corrected logic.',
          codeExample: `// Rebuilding aggregate from events
public class Account {
    private AccountId id;
    private Money balance = Money.ZERO;
    private long version = 0;

    public static Account fromEvents(List<DomainEvent> events) {
        Account account = new Account();
        for (DomainEvent event : events) {
            account.apply(event);
            account.version++;
        }
        return account;
    }

    private void apply(DomainEvent event) {
        if (event instanceof AccountOpened e) {
            this.id = e.getAccountId();
        } else if (event instanceof MoneyDeposited e) {
            this.balance = balance.add(e.getAmount());
        } else if (event instanceof MoneyWithdrawn e) {
            this.balance = balance.subtract(e.getAmount());
        }
    }
}`
        },
        {
          name: 'Snapshots',
          explanation: 'Performance optimization for event sourcing. Periodically save aggregate state snapshots to avoid replaying entire event history. Load from snapshot and replay only subsequent events. Balances storage cost with replay performance.',
          codeExample: `// Snapshot store for performance
public class SnapshotStore {
    public void saveSnapshot(String streamId, Snapshot snapshot) {
        // Save current state at specific version
    }

    public Optional<Snapshot> loadLatestSnapshot(String streamId) {
        // Load most recent snapshot if exists
    }
}

// Loading with snapshot optimization
public Account loadAccount(AccountId id) {
    String streamId = "account-" + id;

    // Try to load from snapshot first
    Optional<Snapshot> snapshot = snapshotStore.loadLatestSnapshot(streamId);

    if (snapshot.isPresent()) {
        Account account = Account.fromSnapshot(snapshot.get());
        // Only replay events after snapshot
        List<DomainEvent> recentEvents =
            eventStore.loadEvents(streamId, snapshot.get().getVersion());
        account.replayEvents(recentEvents);
        return account;
    }

    // No snapshot, replay all events
    return Account.fromEvents(eventStore.loadEvents(streamId));
}`
        }
      ]
    },
    {
      id: 'cqrs',
      name: 'CQRS',
      icon: '🔄',
      color: '#ec4899',
      description: 'Command Query Responsibility Segregation separates read and write operations for optimized performance and scalability.',
      diagram: CQRSDiagram,
      details: [
        {
          name: 'Command Side',
          diagram: CQRSDiagram,
          explanation: 'Write model validates commands and generates events. Optimized for consistency and transaction boundaries. Events stored in event store. Command handlers enforce business rules before persisting changes.',
          codeExample: `// Command handler on write side
@Service
public class OrderCommandHandler {

    public void handle(PlaceOrderCommand cmd) {
        // Load aggregate
        Order order = orderRepository.findById(cmd.getOrderId())
            .orElseGet(() -> new Order(cmd.getOrderId()));

        // Execute business logic - generates events
        order.place(cmd.getCustomerId(), cmd.getItems());

        // Persist events
        orderRepository.save(order);
    }
}

// Command object
public record PlaceOrderCommand(
    OrderId orderId,
    CustomerId customerId,
    List<OrderItem> items
) {}`
        },
        {
          name: 'Query Side',
          explanation: 'Read model denormalized for fast queries. Built from events via projections. Multiple read models possible for different query patterns. Optimized for specific use cases without impacting write performance.',
          codeExample: `// Read model projection
@Component
public class OrderSummaryProjection {

    @EventHandler
    public void on(OrderPlacedEvent event) {
        OrderSummary summary = new OrderSummary();
        summary.setOrderId(event.getOrderId());
        summary.setCustomerId(event.getCustomerId());
        summary.setStatus("PLACED");
        summary.setPlacedAt(event.getTimestamp());
        summaryRepository.save(summary);
    }

    @EventHandler
    public void on(OrderShippedEvent event) {
        summaryRepository.updateStatus(
            event.getOrderId(), "SHIPPED"
        );
    }
}

// Query handler for read model
@Service
public class OrderQueryHandler {
    public List<OrderSummary> getOrdersForCustomer(CustomerId customerId) {
        return summaryRepository.findByCustomerId(customerId);
    }
}`
        },
        {
          name: 'Eventual Consistency',
          explanation: 'Read models are updated asynchronously from write model events. Queries may return slightly stale data, but system is more scalable. Design UI to handle eventual consistency gracefully with optimistic updates.',
          codeExample: `// Async projection update
@Component
public class AsyncOrderProjection {
    private final ExecutorService executor;
    private final OrderReadRepository readRepo;

    @KafkaListener(topics = "order-events")
    public void handleEvent(OrderEvent event) {
        executor.submit(() -> {
            switch (event) {
                case OrderPlacedEvent e -> createReadModel(e);
                case OrderUpdatedEvent e -> updateReadModel(e);
                case OrderCancelledEvent e -> deleteReadModel(e);
            }
        });
    }
}

// Client-side handling of eventual consistency
@RestController
public class OrderController {

    @PostMapping("/orders")
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody PlaceOrderRequest req) {
        OrderId orderId = commandGateway.send(new PlaceOrderCommand(req));

        // Return immediately with order ID
        // Client can poll for status
        return ResponseEntity.accepted()
            .header("Location", "/orders/" + orderId)
            .body(new OrderResponse(orderId, "PROCESSING"));
    }
}`
        }
      ]
    },
    {
      id: 'hexagonal',
      name: 'Hexagonal Architecture',
      icon: '⬡',
      color: '#14b8a6',
      description: 'Ports and Adapters pattern isolates business logic from external concerns, enabling independent testing and evolution.',
      diagram: HexagonalDiagram,
      details: [
        {
          name: 'Ports',
          diagram: HexagonalDiagram,
          explanation: 'Interfaces defining how domain interacts with outside world. OrderRepository port defines what domain needs, not how it is implemented. Primary ports are driven by external actors; secondary ports are driven by the domain.',
          codeExample: `// Primary port (driving) - how outside world interacts with domain
public interface OrderService {
    OrderId placeOrder(PlaceOrderCommand command);
    void cancelOrder(OrderId orderId);
    Order getOrder(OrderId orderId);
}

// Secondary port (driven) - what domain needs from outside
public interface OrderRepository {
    void save(Order order);
    Optional<Order> findById(OrderId id);
    List<Order> findByCustomer(CustomerId customerId);
}

// Another secondary port
public interface PaymentGateway {
    PaymentResult processPayment(Payment payment);
    void refund(PaymentId paymentId);
}`
        },
        {
          name: 'Adapters',
          explanation: 'Implementations of ports. JpaOrderRepository adapter implements persistence, REST controller adapter drives the application. Easily swappable for testing or changing infrastructure without touching domain logic.',
          codeExample: `// Primary adapter - REST controller
@RestController
@RequestMapping("/api/orders")
public class OrderRestAdapter {
    private final OrderService orderService; // Primary port

    @PostMapping
    public ResponseEntity<OrderId> placeOrder(@RequestBody OrderRequest req) {
        OrderId id = orderService.placeOrder(toCommand(req));
        return ResponseEntity.created(URI.create("/orders/" + id)).body(id);
    }
}

// Secondary adapter - JPA implementation
@Repository
public class JpaOrderRepository implements OrderRepository {
    private final OrderJpaRepository jpaRepository;

    @Override
    public void save(Order order) {
        jpaRepository.save(OrderEntity.fromDomain(order));
    }

    @Override
    public Optional<Order> findById(OrderId id) {
        return jpaRepository.findById(id.getValue())
            .map(OrderEntity::toDomain);
    }
}`
        },
        {
          name: 'Domain Core',
          explanation: 'The hexagon center contains pure domain logic with no framework dependencies. Business rules are isolated from infrastructure concerns, making the domain easy to test and understand. Domain objects are POJOs.',
          codeExample: `// Pure domain logic - no framework dependencies
package com.app.domain;

public class Order {
    private final OrderId id;
    private OrderStatus status;
    private final List<OrderLine> lines;
    private Money total;

    // Business logic in the domain
    public void submit() {
        if (lines.isEmpty()) {
            throw new OrderException("Cannot submit empty order");
        }
        if (status != OrderStatus.DRAFT) {
            throw new OrderException("Order already submitted");
        }
        this.status = OrderStatus.SUBMITTED;
    }

    public void cancel() {
        if (status == OrderStatus.SHIPPED) {
            throw new OrderException("Cannot cancel shipped order");
        }
        this.status = OrderStatus.CANCELLED;
    }
}

// Domain service for cross-aggregate logic
public class OrderPricingService {
    public Money calculateTotal(Order order, DiscountPolicy policy) {
        Money subtotal = order.getSubtotal();
        Money discount = policy.calculateDiscount(order);
        return subtotal.subtract(discount);
    }
}`
        }
      ]
    },
    {
      id: 'saga',
      name: 'Saga Pattern',
      icon: '🔁',
      color: '#ef4444',
      description: 'Manage distributed transactions across microservices with compensating transactions for failure recovery.',
      diagram: SagaDiagram,
      details: [
        {
          name: 'Choreography',
          explanation: 'Event-driven coordination. Each service listens to events and publishes new ones. Decentralized, loosely coupled, but harder to understand flow. Best for simple workflows with few steps.',
          codeExample: `// Order Service publishes event
@Service
public class OrderService {
    public void placeOrder(Order order) {
        orderRepository.save(order);
        eventPublisher.publish(new OrderCreatedEvent(order.getId()));
    }

    @EventListener
    public void onPaymentCompleted(PaymentCompletedEvent event) {
        Order order = orderRepository.findById(event.getOrderId());
        order.markAsPaid();
        eventPublisher.publish(new OrderPaidEvent(order.getId()));
    }
}

// Payment Service listens and reacts
@Service
public class PaymentService {
    @EventListener
    public void onOrderCreated(OrderCreatedEvent event) {
        Payment payment = processPayment(event.getOrderId());
        if (payment.isSuccessful()) {
            eventPublisher.publish(new PaymentCompletedEvent(event.getOrderId()));
        } else {
            eventPublisher.publish(new PaymentFailedEvent(event.getOrderId()));
        }
    }
}`
        },
        {
          name: 'Orchestration',
          diagram: SagaDiagram,
          explanation: 'Centralized coordinator manages saga flow. Easier to understand and debug. Coordinator handles compensation on failures in reverse order. Better for complex workflows with many steps.',
          codeExample: `// Saga Orchestrator
@Service
public class OrderSagaOrchestrator {
    private final PaymentService paymentService;
    private final InventoryService inventoryService;
    private final ShippingService shippingService;

    @Transactional
    public void executeOrderSaga(Order order) {
        try {
            // Step 1: Reserve inventory
            inventoryService.reserve(order.getItems());

            // Step 2: Process payment
            paymentService.charge(order.getPaymentDetails());

            // Step 3: Create shipment
            shippingService.createShipment(order);

        } catch (PaymentException e) {
            // Compensate step 1
            inventoryService.releaseReservation(order.getItems());
            throw new SagaFailedException("Payment failed", e);

        } catch (ShippingException e) {
            // Compensate steps 1 and 2
            paymentService.refund(order.getPaymentDetails());
            inventoryService.releaseReservation(order.getItems());
            throw new SagaFailedException("Shipping failed", e);
        }
    }
}`
        },
        {
          name: 'Compensating Transactions',
          explanation: 'Undo operations that reverse the effects of previous steps when a saga fails. Each step must have a corresponding compensation action. Compensations run in reverse order of the original steps.',
          codeExample: `// Saga step with compensation
public interface SagaStep<T> {
    void execute(T context);
    void compensate(T context);
}

public class ReserveInventoryStep implements SagaStep<OrderContext> {
    @Override
    public void execute(OrderContext ctx) {
        ReservationId id = inventoryService.reserve(ctx.getItems());
        ctx.setReservationId(id);
    }

    @Override
    public void compensate(OrderContext ctx) {
        inventoryService.cancelReservation(ctx.getReservationId());
    }
}

// Saga executor with automatic compensation
public class SagaExecutor<T> {
    private final List<SagaStep<T>> steps;

    public void execute(T context) {
        List<SagaStep<T>> completedSteps = new ArrayList<>();

        for (SagaStep<T> step : steps) {
            try {
                step.execute(context);
                completedSteps.add(step);
            } catch (Exception e) {
                // Compensate in reverse order
                Collections.reverse(completedSteps);
                for (SagaStep<T> completed : completedSteps) {
                    completed.compensate(context);
                }
                throw new SagaFailedException(e);
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'api-composition',
      name: 'API Composition',
      icon: '🔗',
      color: '#6366f1',
      description: 'Combine data from multiple services to implement queries that span multiple microservices.',
      diagram: APICompositionDiagram,
      details: [
        {
          name: 'Backend for Frontend',
          diagram: APICompositionDiagram,
          explanation: 'API optimized for specific client type. Mobile BFF returns minimal data, Admin BFF returns comprehensive data. Reduces chattiness and tailors response format to client needs.',
          codeExample: `// Mobile BFF - minimal data for mobile clients
@RestController
@RequestMapping("/mobile/api")
public class MobileBffController {

    @GetMapping("/orders/{id}")
    public MobileOrderView getOrder(@PathVariable String id) {
        Order order = orderService.getOrder(id);
        return new MobileOrderView(
            order.getId(),
            order.getStatus(),
            order.getTotal()
            // Excludes detailed line items, history, etc.
        );
    }
}

// Admin BFF - comprehensive data for admin dashboard
@RestController
@RequestMapping("/admin/api")
public class AdminBffController {

    @GetMapping("/orders/{id}")
    public AdminOrderView getOrder(@PathVariable String id) {
        Order order = orderService.getOrder(id);
        Customer customer = customerService.getCustomer(order.getCustomerId());
        List<AuditLog> history = auditService.getHistory(id);

        return new AdminOrderView(order, customer, history);
    }
}`
        },
        {
          name: 'Parallel Composition',
          explanation: 'Fetch from multiple services concurrently using CompletableFuture. Combine results into single response. Improves performance over sequential calls by utilizing network parallelism.',
          codeExample: `// Parallel API composition
@Service
public class OrderCompositionService {

    public CompositeOrderView getOrderDetails(String orderId) {
        // Start all requests in parallel
        CompletableFuture<Order> orderFuture =
            CompletableFuture.supplyAsync(() -> orderService.getOrder(orderId));

        CompletableFuture<Customer> customerFuture =
            orderFuture.thenCompose(order ->
                CompletableFuture.supplyAsync(() ->
                    customerService.getCustomer(order.getCustomerId())));

        CompletableFuture<ShippingInfo> shippingFuture =
            CompletableFuture.supplyAsync(() -> shippingService.getInfo(orderId));

        CompletableFuture<List<Review>> reviewsFuture =
            CompletableFuture.supplyAsync(() -> reviewService.getReviews(orderId));

        // Combine all results
        return CompletableFuture.allOf(orderFuture, customerFuture, shippingFuture, reviewsFuture)
            .thenApply(v -> new CompositeOrderView(
                orderFuture.join(),
                customerFuture.join(),
                shippingFuture.join(),
                reviewsFuture.join()
            )).join();
    }
}`
        },
        {
          name: 'GraphQL Federation',
          explanation: 'Compose a unified GraphQL API from multiple service schemas. Each service owns its portion of the graph. Gateway stitches schemas together and routes queries to appropriate services.',
          codeExample: `// Order Service GraphQL schema
type Order @key(fields: "id") {
    id: ID!
    status: OrderStatus!
    total: Money!
    items: [OrderItem!]!
    customer: Customer! @requires(fields: "customerId")
}

extend type Query {
    order(id: ID!): Order
    orders(customerId: ID!): [Order!]!
}

// Customer Service extends Order type
extend type Order @key(fields: "id") {
    id: ID! @external
    customer: Customer! @requires(fields: "customerId")
}

type Customer @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
    orders: [Order!]!
}

// Gateway configuration
@Configuration
public class GraphQLGatewayConfig {
    @Bean
    public GraphQLSchema federatedSchema() {
        return new FederationSchemaBuilder()
            .service("orders", orderServiceSchema)
            .service("customers", customerServiceSchema)
            .service("shipping", shippingServiceSchema)
            .build();
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
      { name: 'Java', icon: '☕', page: 'Java' },
      { name: 'Modular Architecture', icon: '📦', page: 'Module' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #334155 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #94a3b8, #64748b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(100, 116, 139, 0.2)',
    border: '1px solid rgba(100, 116, 139, 0.3)',
    borderRadius: '0.5rem',
    color: '#94a3b8',
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
        <h1 style={titleStyle}>Modular Architecture</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(100, 116, 139, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(100, 116, 139, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={MODULE_COLORS}
        />
      </div>

      {/* Description */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.8', margin: 0 }}>
          Domain-driven design with bounded contexts and modular programming techniques.
          Covers event sourcing, CQRS, hexagonal architecture, and distributed system patterns.
        </p>
      </div>

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
              colors={MODULE_COLORS}
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

export default Module

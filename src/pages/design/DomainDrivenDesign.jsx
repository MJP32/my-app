/**
 * Domain-Driven Design - Tab Template Format
 *
 * This page covers DDD concepts including strategic patterns, tactical patterns,
 * bounded contexts, aggregates, and layered architecture.
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
  primary: '#14b8a6',
  primaryHover: '#5eead4',
  bg: 'rgba(20, 184, 166, 0.1)',
  border: 'rgba(20, 184, 166, 0.3)',
  arrow: '#14b8a6',
  hoverBg: 'rgba(20, 184, 166, 0.2)',
  topicBg: 'rgba(20, 184, 166, 0.2)'
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

const DDDOverviewDiagram = () => (
  <svg viewBox="0 0 800 500" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="ddd-strategic-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6d28d9', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="ddd-tactical-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="ddd-ubiquitous-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="ddd-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3"/>
      </filter>
    </defs>

    <text x="400" y="35" fontSize="20" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">Domain-Driven Design Overview</text>

    <rect x="200" y="55" width="400" height="40" rx="20" fill="url(#ddd-ubiquitous-grad)" filter="url(#ddd-shadow)" />
    <text x="400" y="82" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Ubiquitous Language</text>

    <rect x="30" y="120" width="360" height="350" rx="16" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2" />
    <rect x="30" y="120" width="360" height="45" rx="16" fill="url(#ddd-strategic-grad)" />
    <text x="210" y="150" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Strategic Design</text>

    <rect x="50" y="180" width="150" height="55" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#a78bfa" strokeWidth="1.5" />
    <text x="125" y="202" fontSize="12" fontWeight="600" fill="#e9d5ff" textAnchor="middle">Bounded Context</text>
    <text x="125" y="220" fontSize="10" fill="#c4b5fd" textAnchor="middle">Model Boundaries</text>

    <rect x="220" y="180" width="150" height="55" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#a78bfa" strokeWidth="1.5" />
    <text x="295" y="202" fontSize="12" fontWeight="600" fill="#e9d5ff" textAnchor="middle">Context Map</text>
    <text x="295" y="220" fontSize="10" fill="#c4b5fd" textAnchor="middle">Relationships</text>

    <rect x="50" y="250" width="150" height="55" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#a78bfa" strokeWidth="1.5" />
    <text x="125" y="272" fontSize="12" fontWeight="600" fill="#e9d5ff" textAnchor="middle">Subdomain</text>
    <text x="125" y="290" fontSize="10" fill="#c4b5fd" textAnchor="middle">Core/Supporting/Generic</text>

    <rect x="220" y="250" width="150" height="55" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#a78bfa" strokeWidth="1.5" />
    <text x="295" y="272" fontSize="12" fontWeight="600" fill="#e9d5ff" textAnchor="middle">Domain Vision</text>
    <text x="295" y="290" fontSize="10" fill="#c4b5fd" textAnchor="middle">Statement</text>

    <rect x="135" y="320" width="150" height="55" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#a78bfa" strokeWidth="1.5" />
    <text x="210" y="342" fontSize="12" fontWeight="600" fill="#e9d5ff" textAnchor="middle">Event Storming</text>
    <text x="210" y="360" fontSize="10" fill="#c4b5fd" textAnchor="middle">Discovery Workshop</text>

    <text x="210" y="400" fontSize="11" fill="#a78bfa" textAnchor="middle">Mapping: ACL | Shared Kernel | Open Host</text>
    <text x="210" y="420" fontSize="11" fill="#a78bfa" textAnchor="middle">Customer-Supplier | Conformist | Partnership</text>

    <rect x="410" y="120" width="360" height="350" rx="16" fill="rgba(20, 184, 166, 0.15)" stroke="#14b8a6" strokeWidth="2" />
    <rect x="410" y="120" width="360" height="45" rx="16" fill="url(#ddd-tactical-grad)" />
    <text x="590" y="150" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Tactical Design</text>

    <rect x="430" y="180" width="150" height="55" rx="8" fill="rgba(20, 184, 166, 0.3)" stroke="#5eead4" strokeWidth="1.5" />
    <text x="505" y="202" fontSize="12" fontWeight="600" fill="#ccfbf1" textAnchor="middle">Entity</text>
    <text x="505" y="220" fontSize="10" fill="#99f6e4" textAnchor="middle">Identity + Lifecycle</text>

    <rect x="600" y="180" width="150" height="55" rx="8" fill="rgba(20, 184, 166, 0.3)" stroke="#5eead4" strokeWidth="1.5" />
    <text x="675" y="202" fontSize="12" fontWeight="600" fill="#ccfbf1" textAnchor="middle">Value Object</text>
    <text x="675" y="220" fontSize="10" fill="#99f6e4" textAnchor="middle">Immutable + Equality</text>

    <rect x="430" y="250" width="150" height="55" rx="8" fill="rgba(20, 184, 166, 0.3)" stroke="#5eead4" strokeWidth="1.5" />
    <text x="505" y="272" fontSize="12" fontWeight="600" fill="#ccfbf1" textAnchor="middle">Aggregate</text>
    <text x="505" y="290" fontSize="10" fill="#99f6e4" textAnchor="middle">Consistency Boundary</text>

    <rect x="600" y="250" width="150" height="55" rx="8" fill="rgba(20, 184, 166, 0.3)" stroke="#5eead4" strokeWidth="1.5" />
    <text x="675" y="272" fontSize="12" fontWeight="600" fill="#ccfbf1" textAnchor="middle">Domain Event</text>
    <text x="675" y="290" fontSize="10" fill="#99f6e4" textAnchor="middle">Something Happened</text>

    <rect x="430" y="320" width="150" height="55" rx="8" fill="rgba(20, 184, 166, 0.3)" stroke="#5eead4" strokeWidth="1.5" />
    <text x="505" y="342" fontSize="12" fontWeight="600" fill="#ccfbf1" textAnchor="middle">Repository</text>
    <text x="505" y="360" fontSize="10" fill="#99f6e4" textAnchor="middle">Collection Abstraction</text>

    <rect x="600" y="320" width="150" height="55" rx="8" fill="rgba(20, 184, 166, 0.3)" stroke="#5eead4" strokeWidth="1.5" />
    <text x="675" y="342" fontSize="12" fontWeight="600" fill="#ccfbf1" textAnchor="middle">Domain Service</text>
    <text x="675" y="360" fontSize="10" fill="#99f6e4" textAnchor="middle">Stateless Operations</text>

    <rect x="515" y="390" width="150" height="55" rx="8" fill="rgba(20, 184, 166, 0.3)" stroke="#5eead4" strokeWidth="1.5" />
    <text x="590" y="412" fontSize="12" fontWeight="600" fill="#ccfbf1" textAnchor="middle">Factory</text>
    <text x="590" y="430" fontSize="10" fill="#99f6e4" textAnchor="middle">Complex Creation</text>

    <path d="M 390 295 L 410 295" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrow)" />
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#fbbf24" />
      </marker>
    </defs>
  </svg>
)

const BoundedContextDiagram = () => (
  <svg viewBox="0 0 750 420" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="bc-order" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="bc-inventory" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="bc-shipping" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="bc-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <text x="375" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">Bounded Contexts - E-Commerce Example</text>

    <rect x="20" y="55" width="220" height="320" rx="12" fill="rgba(20, 184, 166, 0.1)" stroke="#14b8a6" strokeWidth="3" strokeDasharray="8,4" />
    <rect x="20" y="55" width="220" height="40" rx="12" fill="url(#bc-order)" />
    <text x="130" y="82" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Order Context</text>

    <rect x="40" y="110" width="180" height="45" rx="6" fill="rgba(20, 184, 166, 0.25)" stroke="#5eead4" strokeWidth="1" />
    <text x="130" y="128" fontSize="11" fontWeight="600" fill="#ccfbf1" textAnchor="middle">Order (Aggregate Root)</text>
    <text x="130" y="145" fontSize="9" fill="#99f6e4" textAnchor="middle">orderId, status, total</text>

    <rect x="40" y="165" width="180" height="45" rx="6" fill="rgba(20, 184, 166, 0.2)" stroke="#5eead4" strokeWidth="1" />
    <text x="130" y="183" fontSize="11" fontWeight="600" fill="#ccfbf1" textAnchor="middle">OrderLine (Entity)</text>
    <text x="130" y="200" fontSize="9" fill="#99f6e4" textAnchor="middle">productId, quantity, price</text>

    <rect x="40" y="220" width="180" height="45" rx="6" fill="rgba(20, 184, 166, 0.15)" stroke="#5eead4" strokeWidth="1" />
    <text x="130" y="238" fontSize="11" fontWeight="600" fill="#ccfbf1" textAnchor="middle">Customer (Entity)</text>
    <text x="130" y="255" fontSize="9" fill="#99f6e4" textAnchor="middle">customerId, name</text>

    <rect x="40" y="275" width="180" height="40" rx="6" fill="rgba(20, 184, 166, 0.1)" stroke="#5eead4" strokeWidth="1" />
    <text x="130" y="295" fontSize="11" fontWeight="600" fill="#ccfbf1" textAnchor="middle">Money (Value Object)</text>
    <text x="130" y="308" fontSize="9" fill="#99f6e4" textAnchor="middle">amount, currency</text>

    <text x="130" y="350" fontSize="10" fill="#6b7280" textAnchor="middle" fontStyle="italic">Language: place, confirm, cancel</text>

    <rect x="265" y="55" width="220" height="320" rx="12" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="3" strokeDasharray="8,4" />
    <rect x="265" y="55" width="220" height="40" rx="12" fill="url(#bc-inventory)" />
    <text x="375" y="82" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Inventory Context</text>

    <rect x="285" y="110" width="180" height="45" rx="6" fill="rgba(6, 182, 212, 0.25)" stroke="#67e8f9" strokeWidth="1" />
    <text x="375" y="128" fontSize="11" fontWeight="600" fill="#cffafe" textAnchor="middle">Product (Aggregate Root)</text>
    <text x="375" y="145" fontSize="9" fill="#a5f3fc" textAnchor="middle">sku, name, stock</text>

    <rect x="285" y="165" width="180" height="45" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#67e8f9" strokeWidth="1" />
    <text x="375" y="183" fontSize="11" fontWeight="600" fill="#cffafe" textAnchor="middle">Warehouse (Entity)</text>
    <text x="375" y="200" fontSize="9" fill="#a5f3fc" textAnchor="middle">location, capacity</text>

    <rect x="285" y="220" width="180" height="45" rx="6" fill="rgba(6, 182, 212, 0.15)" stroke="#67e8f9" strokeWidth="1" />
    <text x="375" y="238" fontSize="11" fontWeight="600" fill="#cffafe" textAnchor="middle">StockMovement (Event)</text>
    <text x="375" y="255" fontSize="9" fill="#a5f3fc" textAnchor="middle">type, quantity, timestamp</text>

    <rect x="285" y="275" width="180" height="40" rx="6" fill="rgba(6, 182, 212, 0.1)" stroke="#67e8f9" strokeWidth="1" />
    <text x="375" y="295" fontSize="11" fontWeight="600" fill="#cffafe" textAnchor="middle">SKU (Value Object)</text>
    <text x="375" y="308" fontSize="9" fill="#a5f3fc" textAnchor="middle">code, category</text>

    <text x="375" y="350" fontSize="10" fill="#6b7280" textAnchor="middle" fontStyle="italic">Language: reserve, allocate, restock</text>

    <rect x="510" y="55" width="220" height="320" rx="12" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="8,4" />
    <rect x="510" y="55" width="220" height="40" rx="12" fill="url(#bc-shipping)" />
    <text x="620" y="82" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Shipping Context</text>

    <rect x="530" y="110" width="180" height="45" rx="6" fill="rgba(139, 92, 246, 0.25)" stroke="#c4b5fd" strokeWidth="1" />
    <text x="620" y="128" fontSize="11" fontWeight="600" fill="#ede9fe" textAnchor="middle">Shipment (Aggregate Root)</text>
    <text x="620" y="145" fontSize="9" fill="#ddd6fe" textAnchor="middle">trackingNo, status</text>

    <rect x="530" y="165" width="180" height="45" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#c4b5fd" strokeWidth="1" />
    <text x="620" y="183" fontSize="11" fontWeight="600" fill="#ede9fe" textAnchor="middle">Package (Entity)</text>
    <text x="620" y="200" fontSize="9" fill="#ddd6fe" textAnchor="middle">weight, dimensions</text>

    <rect x="530" y="220" width="180" height="45" rx="6" fill="rgba(139, 92, 246, 0.15)" stroke="#c4b5fd" strokeWidth="1" />
    <text x="620" y="238" fontSize="11" fontWeight="600" fill="#ede9fe" textAnchor="middle">Carrier (Entity)</text>
    <text x="620" y="255" fontSize="9" fill="#ddd6fe" textAnchor="middle">name, serviceLevel</text>

    <rect x="530" y="275" width="180" height="40" rx="6" fill="rgba(139, 92, 246, 0.1)" stroke="#c4b5fd" strokeWidth="1" />
    <text x="620" y="295" fontSize="11" fontWeight="600" fill="#ede9fe" textAnchor="middle">Address (Value Object)</text>
    <text x="620" y="308" fontSize="9" fill="#ddd6fe" textAnchor="middle">street, city, zip</text>

    <text x="620" y="350" fontSize="10" fill="#6b7280" textAnchor="middle" fontStyle="italic">Language: dispatch, track, deliver</text>

    <path d="M 240 200 Q 252 180 265 200" stroke="#fbbf24" strokeWidth="2" fill="none" markerEnd="url(#bc-arrow)" />
    <text x="252" y="165" fontSize="9" fill="#fbbf24" textAnchor="middle">OrderPlaced</text>

    <path d="M 485 200 Q 497 180 510 200" stroke="#fbbf24" strokeWidth="2" fill="none" markerEnd="url(#bc-arrow)" />
    <text x="497" y="165" fontSize="9" fill="#fbbf24" textAnchor="middle">ItemsReserved</text>

    <defs>
      <marker id="bc-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,8 L8,4 z" fill="#fbbf24" />
      </marker>
    </defs>

    <text x="375" y="400" fontSize="11" fill="#9ca3af" textAnchor="middle">Each context has its own model, language, and can evolve independently</text>
  </svg>
)

const AggregatePatternDiagram = () => (
  <svg viewBox="0 0 750 450" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="agg-root-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="agg-entity-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="agg-vo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <text x="375" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">Aggregate Pattern - Order Example</text>

    <rect x="50" y="50" width="450" height="370" rx="20" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="10,5" />
    <rect x="50" y="50" width="450" height="45" rx="20" fill="rgba(239, 68, 68, 0.2)" />
    <text x="275" y="80" fontSize="14" fontWeight="bold" fill="#fca5a5" textAnchor="middle">Aggregate Boundary (Consistency Boundary)</text>

    <rect x="170" y="110" width="210" height="90" rx="12" fill="url(#agg-root-grad)" />
    <text x="275" y="138" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Order</text>
    <text x="275" y="158" fontSize="11" fill="#fef3c7" textAnchor="middle">(Aggregate Root)</text>
    <text x="275" y="180" fontSize="10" fill="#fde68a" textAnchor="middle">orderId | status | customerId | total</text>
    <circle cx="380" cy="110" r="15" fill="#fbbf24" stroke="white" strokeWidth="2" />
    <text x="380" y="115" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">ID</text>

    <rect x="80" y="230" width="180" height="80" rx="10" fill="url(#agg-entity-grad)" />
    <text x="170" y="258" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">OrderLine</text>
    <text x="170" y="275" fontSize="10" fill="#ccfbf1" textAnchor="middle">(Entity)</text>
    <text x="170" y="295" fontSize="9" fill="#99f6e4" textAnchor="middle">lineId | productId | qty | price</text>
    <circle cx="260" cy="230" r="12" fill="#14b8a6" stroke="white" strokeWidth="2" />
    <text x="260" y="234" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">ID</text>

    <rect x="290" y="230" width="180" height="80" rx="10" fill="url(#agg-entity-grad)" />
    <text x="380" y="258" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">PaymentInfo</text>
    <text x="380" y="275" fontSize="10" fill="#ccfbf1" textAnchor="middle">(Entity)</text>
    <text x="380" y="295" fontSize="9" fill="#99f6e4" textAnchor="middle">paymentId | method | status</text>
    <circle cx="470" cy="230" r="12" fill="#14b8a6" stroke="white" strokeWidth="2" />
    <text x="470" y="234" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">ID</text>

    <rect x="80" y="340" width="120" height="60" rx="8" fill="url(#agg-vo-grad)" />
    <text x="140" y="365" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Money</text>
    <text x="140" y="382" fontSize="9" fill="#ddd6fe" textAnchor="middle">amount | currency</text>

    <rect x="215" y="340" width="120" height="60" rx="8" fill="url(#agg-vo-grad)" />
    <text x="275" y="365" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Address</text>
    <text x="275" y="382" fontSize="9" fill="#ddd6fe" textAnchor="middle">street | city | zip</text>

    <rect x="350" y="340" width="120" height="60" rx="8" fill="url(#agg-vo-grad)" />
    <text x="410" y="365" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">DateRange</text>
    <text x="410" y="382" fontSize="9" fill="#ddd6fe" textAnchor="middle">start | end</text>

    <line x1="275" y1="200" x2="170" y2="230" stroke="#5eead4" strokeWidth="2" />
    <line x1="275" y1="200" x2="380" y2="230" stroke="#5eead4" strokeWidth="2" />
    <line x1="170" y1="310" x2="140" y2="340" stroke="#c4b5fd" strokeWidth="1.5" />
    <line x1="380" y1="310" x2="410" y2="340" stroke="#c4b5fd" strokeWidth="1.5" />
    <line x1="275" y1="200" x2="275" y2="340" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="4,4" />

    <rect x="540" y="140" width="180" height="130" rx="12" fill="rgba(107, 114, 128, 0.2)" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" />
    <text x="630" y="170" fontSize="12" fontWeight="bold" fill="#d1d5db" textAnchor="middle">External References</text>
    <text x="630" y="195" fontSize="10" fill="#9ca3af" textAnchor="middle">customerId (ID only)</text>
    <text x="630" y="215" fontSize="10" fill="#9ca3af" textAnchor="middle">productId (ID only)</text>
    <text x="630" y="245" fontSize="9" fill="#6b7280" textAnchor="middle" fontStyle="italic">Never hold direct</text>
    <text x="630" y="260" fontSize="9" fill="#6b7280" textAnchor="middle" fontStyle="italic">references to other aggregates</text>

    <path d="M 380 155 L 540 185" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="5,5" markerEnd="url(#ext-arrow)" />
    <defs>
      <marker id="ext-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,8 L8,4 z" fill="#6b7280" />
      </marker>
    </defs>

    <rect x="540" y="300" width="180" height="110" rx="8" fill="rgba(31, 41, 55, 0.8)" stroke="#374151" strokeWidth="1" />
    <text x="630" y="320" fontSize="11" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">Legend</text>
    <rect x="555" y="330" width="12" height="12" rx="2" fill="#f59e0b" />
    <text x="575" y="340" fontSize="9" fill="#d1d5db">Aggregate Root (has global ID)</text>
    <rect x="555" y="350" width="12" height="12" rx="2" fill="#14b8a6" />
    <text x="575" y="360" fontSize="9" fill="#d1d5db">Entity (has local ID)</text>
    <rect x="555" y="370" width="12" height="12" rx="2" fill="#8b5cf6" />
    <text x="575" y="380" fontSize="9" fill="#d1d5db">Value Object (no ID, immutable)</text>
    <rect x="555" y="390" width="12" height="12" rx="2" fill="none" stroke="#ef4444" strokeDasharray="3,2" />
    <text x="575" y="400" fontSize="9" fill="#d1d5db">Transactional Boundary</text>
  </svg>
)

const ContextMappingDiagram = () => (
  <svg viewBox="0 0 800 520" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="cm-upstream" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cm-downstream" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cm-shared" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cm-acl" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <text x="400" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">Context Mapping Patterns</text>

    <rect x="30" y="55" width="230" height="130" rx="12" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2" />
    <text x="145" y="80" fontSize="13" fontWeight="bold" fill="#fbbf24" textAnchor="middle">Shared Kernel</text>

    <rect x="50" y="95" width="70" height="40" rx="6" fill="url(#cm-upstream)" />
    <text x="85" y="120" fontSize="10" fill="white" textAnchor="middle">Team A</text>

    <rect x="170" y="95" width="70" height="40" rx="6" fill="url(#cm-downstream)" />
    <text x="205" y="120" fontSize="10" fill="white" textAnchor="middle">Team B</text>

    <ellipse cx="145" cy="115" rx="25" ry="18" fill="url(#cm-shared)" />
    <text x="145" y="120" fontSize="8" fill="white" textAnchor="middle">Shared</text>

    <text x="145" y="165" fontSize="9" fill="#9ca3af" textAnchor="middle">Both teams share and</text>
    <text x="145" y="178" fontSize="9" fill="#9ca3af" textAnchor="middle">maintain common code</text>

    <rect x="285" y="55" width="230" height="130" rx="12" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2" />
    <text x="400" y="80" fontSize="13" fontWeight="bold" fill="#60a5fa" textAnchor="middle">Customer-Supplier</text>

    <rect x="305" y="100" width="80" height="40" rx="6" fill="url(#cm-upstream)" />
    <text x="345" y="118" fontSize="9" fill="white" textAnchor="middle">Upstream</text>
    <text x="345" y="130" fontSize="8" fill="#bfdbfe" textAnchor="middle">(Supplier)</text>

    <rect x="415" y="100" width="80" height="40" rx="6" fill="url(#cm-downstream)" />
    <text x="455" y="118" fontSize="9" fill="white" textAnchor="middle">Downstream</text>
    <text x="455" y="130" fontSize="8" fill="#99f6e4" textAnchor="middle">(Customer)</text>

    <path d="M 385 120 L 415 120" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#cm-arrow)" />

    <text x="400" y="165" fontSize="9" fill="#9ca3af" textAnchor="middle">Upstream prioritizes</text>
    <text x="400" y="178" fontSize="9" fill="#9ca3af" textAnchor="middle">downstream needs</text>

    <rect x="540" y="55" width="230" height="130" rx="12" fill="rgba(107, 114, 128, 0.1)" stroke="#6b7280" strokeWidth="2" />
    <text x="655" y="80" fontSize="13" fontWeight="bold" fill="#9ca3af" textAnchor="middle">Conformist</text>

    <rect x="560" y="100" width="80" height="40" rx="6" fill="url(#cm-upstream)" />
    <text x="600" y="118" fontSize="9" fill="white" textAnchor="middle">Upstream</text>
    <text x="600" y="130" fontSize="8" fill="#bfdbfe" textAnchor="middle">(Dictates)</text>

    <rect x="670" y="100" width="80" height="40" rx="6" fill="rgba(20, 184, 166, 0.5)" stroke="#14b8a6" strokeDasharray="4,4" />
    <text x="710" y="118" fontSize="9" fill="#ccfbf1" textAnchor="middle">Downstream</text>
    <text x="710" y="130" fontSize="8" fill="#99f6e4" textAnchor="middle">(Conforms)</text>

    <path d="M 640 120 L 670 120" stroke="#6b7280" strokeWidth="2" markerEnd="url(#cm-arrow-gray)" />

    <text x="655" y="165" fontSize="9" fill="#9ca3af" textAnchor="middle">Downstream adopts</text>
    <text x="655" y="178" fontSize="9" fill="#9ca3af" textAnchor="middle">upstream model as-is</text>

    <rect x="30" y="210" width="230" height="150" rx="12" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2" />
    <text x="145" y="235" fontSize="13" fontWeight="bold" fill="#f87171" textAnchor="middle">Anti-Corruption Layer</text>

    <rect x="50" y="260" width="70" height="40" rx="6" fill="url(#cm-upstream)" />
    <text x="85" y="280" fontSize="9" fill="white" textAnchor="middle">Legacy</text>
    <text x="85" y="292" fontSize="8" fill="#bfdbfe" textAnchor="middle">System</text>

    <rect x="130" y="255" width="50" height="50" rx="6" fill="url(#cm-acl)" />
    <text x="155" y="278" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">ACL</text>
    <text x="155" y="292" fontSize="7" fill="#fecaca" textAnchor="middle">Translator</text>

    <rect x="190" y="260" width="60" height="40" rx="6" fill="url(#cm-downstream)" />
    <text x="220" y="280" fontSize="9" fill="white" textAnchor="middle">Our</text>
    <text x="220" y="292" fontSize="8" fill="#99f6e4" textAnchor="middle">Domain</text>

    <path d="M 120 280 L 130 280" stroke="#fbbf24" strokeWidth="2" />
    <path d="M 180 280 L 190 280" stroke="#fbbf24" strokeWidth="2" />

    <text x="145" y="330" fontSize="9" fill="#9ca3af" textAnchor="middle">Protects our model from</text>
    <text x="145" y="343" fontSize="9" fill="#9ca3af" textAnchor="middle">external corruption</text>

    <rect x="285" y="210" width="230" height="150" rx="12" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" />
    <text x="400" y="235" fontSize="13" fontWeight="bold" fill="#4ade80" textAnchor="middle">Open Host Service</text>

    <rect x="325" y="260" width="80" height="50" rx="6" fill="url(#cm-upstream)" />
    <text x="365" y="278" fontSize="9" fill="white" textAnchor="middle">Service</text>
    <text x="365" y="292" fontSize="8" fill="#bfdbfe" textAnchor="middle">API / Protocol</text>

    <rect x="425" y="250" width="60" height="30" rx="4" fill="rgba(20, 184, 166, 0.3)" stroke="#14b8a6" />
    <text x="455" y="270" fontSize="8" fill="#ccfbf1" textAnchor="middle">Client A</text>

    <rect x="425" y="290" width="60" height="30" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" />
    <text x="455" y="310" fontSize="8" fill="#e9d5ff" textAnchor="middle">Client B</text>

    <path d="M 405 275 L 425 265" stroke="#22c55e" strokeWidth="1.5" />
    <path d="M 405 295 L 425 305" stroke="#22c55e" strokeWidth="1.5" />

    <text x="400" y="335" fontSize="9" fill="#9ca3af" textAnchor="middle">Published language for</text>
    <text x="400" y="348" fontSize="9" fill="#9ca3af" textAnchor="middle">multiple consumers</text>

    <rect x="540" y="210" width="230" height="150" rx="12" fill="rgba(168, 85, 247, 0.1)" stroke="#a855f7" strokeWidth="2" />
    <text x="655" y="235" fontSize="13" fontWeight="bold" fill="#c084fc" textAnchor="middle">Separate Ways</text>

    <rect x="560" y="265" width="80" height="40" rx="6" fill="url(#cm-upstream)" />
    <text x="600" y="290" fontSize="9" fill="white" textAnchor="middle">Context A</text>

    <rect x="680" y="265" width="80" height="40" rx="6" fill="url(#cm-downstream)" />
    <text x="720" y="290" fontSize="9" fill="white" textAnchor="middle">Context B</text>

    <text x="655" y="290" fontSize="14" fill="#9ca3af" textAnchor="middle">X</text>

    <text x="655" y="330" fontSize="9" fill="#9ca3af" textAnchor="middle">No integration - teams</text>
    <text x="655" y="343" fontSize="9" fill="#9ca3af" textAnchor="middle">go their own way</text>

    <rect x="157" y="385" width="230" height="120" rx="12" fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" strokeWidth="2" />
    <text x="272" y="410" fontSize="13" fontWeight="bold" fill="#f472b6" textAnchor="middle">Partnership</text>

    <rect x="180" y="430" width="80" height="40" rx="6" fill="url(#cm-upstream)" />
    <text x="220" y="455" fontSize="9" fill="white" textAnchor="middle">Team A</text>

    <rect x="285" y="430" width="80" height="40" rx="6" fill="url(#cm-downstream)" />
    <text x="325" y="455" fontSize="9" fill="white" textAnchor="middle">Team B</text>

    <path d="M 260 450 L 285 450" stroke="#ec4899" strokeWidth="2" />
    <path d="M 285 450 L 260 450" stroke="#ec4899" strokeWidth="2" />
    <ellipse cx="272" cy="450" rx="8" ry="8" fill="#ec4899" />

    <text x="272" y="490" fontSize="9" fill="#9ca3af" textAnchor="middle">Mutual dependency, coordinated planning</text>

    <rect x="412" y="385" width="230" height="120" rx="12" fill="rgba(14, 165, 233, 0.1)" stroke="#0ea5e9" strokeWidth="2" />
    <text x="527" y="410" fontSize="13" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Published Language</text>

    <rect x="475" y="430" width="100" height="50" rx="6" fill="rgba(14, 165, 233, 0.3)" stroke="#0ea5e9" />
    <text x="525" y="450" fontSize="9" fontWeight="bold" fill="#e0f2fe" textAnchor="middle">Schema / Protocol</text>
    <text x="525" y="465" fontSize="8" fill="#bae6fd" textAnchor="middle">JSON, Protobuf, Avro</text>

    <text x="527" y="500" fontSize="9" fill="#9ca3af" textAnchor="middle">Well-documented shared language</text>

    <defs>
      <marker id="cm-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,8 L8,4 z" fill="#fbbf24" />
      </marker>
      <marker id="cm-arrow-gray" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,8 L8,4 z" fill="#6b7280" />
      </marker>
    </defs>
  </svg>
)

const LayeredArchitectureDiagram = () => (
  <svg viewBox="0 0 800 480" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="layer-ui" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="layer-app" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="layer-domain" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="layer-infra" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="layer-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.3"/>
      </filter>
    </defs>

    <text x="400" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">DDD Layered Architecture</text>

    <rect x="100" y="50" width="600" height="80" rx="12" fill="url(#layer-ui)" filter="url(#layer-shadow)" />
    <text x="400" y="82" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">User Interface / Presentation Layer</text>
    <text x="400" y="105" fontSize="11" fill="#bfdbfe" textAnchor="middle">Controllers | Views | DTOs | REST APIs | GraphQL | WebSocket</text>

    <path d="M 400 130 L 400 150" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#layer-arrow)" />

    <rect x="100" y="160" width="600" height="80" rx="12" fill="url(#layer-app)" filter="url(#layer-shadow)" />
    <text x="400" y="192" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Application Layer</text>
    <text x="400" y="215" fontSize="11" fill="#ddd6fe" textAnchor="middle">Application Services | Use Cases | Command/Query Handlers | Orchestration</text>

    <path d="M 400 240 L 400 260" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#layer-arrow)" />

    <rect x="100" y="270" width="600" height="100" rx="12" fill="url(#layer-domain)" filter="url(#layer-shadow)" stroke="#fbbf24" strokeWidth="3" />
    <text x="400" y="302" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Domain Layer (Heart of DDD)</text>
    <text x="400" y="325" fontSize="11" fill="#fef3c7" textAnchor="middle">Entities | Value Objects | Aggregates | Domain Services | Domain Events</text>
    <text x="400" y="348" fontSize="11" fill="#fde68a" textAnchor="middle">Repositories (Interfaces) | Factories | Specifications | Domain Exceptions</text>

    <text x="720" y="305" fontSize="24" fill="#fbbf24">*</text>

    <path d="M 400 370 L 400 390" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#layer-arrow)" />

    <rect x="100" y="400" width="600" height="70" rx="12" fill="url(#layer-infra)" filter="url(#layer-shadow)" />
    <text x="400" y="428" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Infrastructure Layer</text>
    <text x="400" y="450" fontSize="11" fill="#ccfbf1" textAnchor="middle">Repository Implementations | ORM | Message Brokers | External APIs | Caching</text>

    <rect x="720" y="160" width="70" height="200" rx="8" fill="rgba(148, 163, 184, 0.1)" stroke="#64748b" strokeWidth="1" strokeDasharray="5,5" />
    <text x="755" y="265" fontSize="10" fill="#94a3b8" textAnchor="middle" transform="rotate(-90 755 265)">Dependencies flow inward</text>

    <rect x="10" y="50" width="75" height="80" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1" />
    <text x="47" y="80" fontSize="9" fill="#60a5fa" textAnchor="middle">External</text>
    <text x="47" y="95" fontSize="9" fill="#60a5fa" textAnchor="middle">Users</text>
    <text x="47" y="110" fontSize="9" fill="#60a5fa" textAnchor="middle">& Systems</text>

    <rect x="10" y="160" width="75" height="80" rx="6" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1" />
    <text x="47" y="190" fontSize="9" fill="#a78bfa" textAnchor="middle">Orchestrates</text>
    <text x="47" y="205" fontSize="9" fill="#a78bfa" textAnchor="middle">Domain</text>
    <text x="47" y="220" fontSize="9" fill="#a78bfa" textAnchor="middle">Logic</text>

    <rect x="10" y="270" width="75" height="100" rx="6" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1" />
    <text x="47" y="300" fontSize="9" fill="#fbbf24" textAnchor="middle">Business</text>
    <text x="47" y="315" fontSize="9" fill="#fbbf24" textAnchor="middle">{`Rules &`}</text>
    <text x="47" y="330" fontSize="9" fill="#fbbf24" textAnchor="middle">Logic</text>
    <text x="47" y="350" fontSize="8" fill="#f59e0b" textAnchor="middle">(No deps!)</text>

    <rect x="10" y="400" width="75" height="70" rx="6" fill="rgba(20, 184, 166, 0.15)" stroke="#14b8a6" strokeWidth="1" />
    <text x="47" y="425" fontSize="9" fill="#5eead4" textAnchor="middle">Technical</text>
    <text x="47" y="440" fontSize="9" fill="#5eead4" textAnchor="middle">Details</text>
    <text x="47" y="455" fontSize="9" fill="#5eead4" textAnchor="middle">& I/O</text>

    <defs>
      <marker id="layer-arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,10 L10,5 z" fill="#94a3b8" />
      </marker>
    </defs>
  </svg>
)

const EntityValueObjectDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="entity-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="vo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <text x="400" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">Entity vs Value Object</text>

    <rect x="50" y="60" width="300" height="200" rx="12" fill="rgba(20, 184, 166, 0.15)" stroke="#14b8a6" strokeWidth="2" />
    <rect x="50" y="60" width="300" height="45" rx="12" fill="url(#entity-grad)" />
    <text x="200" y="90" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Entity</text>

    <text x="200" y="130" fontSize="11" fill="#ccfbf1" textAnchor="middle">Has unique identity (ID)</text>
    <text x="200" y="150" fontSize="11" fill="#ccfbf1" textAnchor="middle">Mutable - can change over time</text>
    <text x="200" y="170" fontSize="11" fill="#ccfbf1" textAnchor="middle">Equality based on ID</text>
    <text x="200" y="190" fontSize="11" fill="#ccfbf1" textAnchor="middle">Has lifecycle</text>
    <text x="200" y="220" fontSize="10" fill="#5eead4" textAnchor="middle" fontStyle="italic">Examples: User, Order, Product</text>
    <text x="200" y="240" fontSize="10" fill="#5eead4" textAnchor="middle" fontStyle="italic">Customer, Account, Employee</text>

    <rect x="450" y="60" width="300" height="200" rx="12" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2" />
    <rect x="450" y="60" width="300" height="45" rx="12" fill="url(#vo-grad)" />
    <text x="600" y="90" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Value Object</text>

    <text x="600" y="130" fontSize="11" fill="#e9d5ff" textAnchor="middle">No identity - defined by attributes</text>
    <text x="600" y="150" fontSize="11" fill="#e9d5ff" textAnchor="middle">Immutable - never changes</text>
    <text x="600" y="170" fontSize="11" fill="#e9d5ff" textAnchor="middle">Equality based on all attributes</text>
    <text x="600" y="190" fontSize="11" fill="#e9d5ff" textAnchor="middle">Replaceable - create new instances</text>
    <text x="600" y="220" fontSize="10" fill="#c4b5fd" textAnchor="middle" fontStyle="italic">Examples: Money, Address, DateRange</text>
    <text x="600" y="240" fontSize="10" fill="#c4b5fd" textAnchor="middle" fontStyle="italic">Email, PhoneNumber, Coordinates</text>
  </svg>
)

const DomainEventDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="event-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="event-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">Domain Events Flow</text>

    <rect x="50" y="80" width="150" height="100" rx="10" fill="rgba(20, 184, 166, 0.3)" stroke="#14b8a6" strokeWidth="2" />
    <text x="125" y="115" fontSize="12" fontWeight="bold" fill="#ccfbf1" textAnchor="middle">Order Aggregate</text>
    <text x="125" y="140" fontSize="10" fill="#99f6e4" textAnchor="middle">confirm()</text>
    <text x="125" y="160" fontSize="10" fill="#99f6e4" textAnchor="middle">Publishes event</text>

    <rect x="280" y="80" width="200" height="100" rx="10" fill="url(#event-grad)" />
    <text x="380" y="110" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">OrderConfirmed</text>
    <text x="380" y="130" fontSize="10" fill="#fef3c7" textAnchor="middle">orderId, customerId</text>
    <text x="380" y="150" fontSize="10" fill="#fef3c7" textAnchor="middle">items[], total, timestamp</text>
    <text x="380" y="170" fontSize="9" fill="#fde68a" textAnchor="middle" fontStyle="italic">Immutable Record</text>

    <rect x="560" y="60" width="180" height="60" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1.5" />
    <text x="650" y="85" fontSize="11" fontWeight="bold" fill="#bfdbfe" textAnchor="middle">Inventory Handler</text>
    <text x="650" y="105" fontSize="9" fill="#93c5fd" textAnchor="middle">Reserve stock</text>

    <rect x="560" y="140" width="180" height="60" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1.5" />
    <text x="650" y="165" fontSize="11" fontWeight="bold" fill="#ddd6fe" textAnchor="middle">Notification Handler</text>
    <text x="650" y="185" fontSize="9" fill="#c4b5fd" textAnchor="middle">Send confirmation email</text>

    <line x1="200" y1="130" x2="275" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#event-arrow)" />
    <line x1="480" y1="110" x2="555" y2="90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#event-arrow)" />
    <line x1="480" y1="150" x2="555" y2="170" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#event-arrow)" />

    <text x="400" y="230" fontSize="11" fill="#9ca3af" textAnchor="middle">Domain events enable loose coupling between bounded contexts</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function DomainDrivenDesign({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'ddd-overview',
      name: 'DDD Overview',
      icon: '🎯',
      color: '#14b8a6',
      description: 'Domain-Driven Design is a software development approach that focuses on modeling complex business domains through strategic and tactical patterns.',
      diagram: DDDOverviewDiagram,
      details: [
        {
          name: 'Core Principles',
          diagram: DDDOverviewDiagram,
          explanation: `Domain-Driven Design is a software development approach that focuses on modeling complex business domains. It combines strategic and tactical patterns to create maintainable, business-aligned software.

Key Principles:
- Focus on the core domain and domain logic
- Base complex designs on models of the domain
- Collaborate with domain experts continuously
- Use ubiquitous language in code and conversation

Strategic Design (High-Level):
- Bounded Contexts: Explicit boundaries for domain models
- Context Mapping: Relationships between contexts
- Subdomains: Core, Supporting, and Generic domains

Tactical Design (Implementation):
- Entities, Value Objects, Aggregates
- Domain Services, Domain Events
- Repositories, Factories`,
          codeExample: `// Domain Model Example - E-Commerce Order

// Value Object - Immutable, no identity
public final class Money {
    private final BigDecimal amount;
    private final Currency currency;

    public Money(BigDecimal amount, Currency currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Cannot add different currencies");
        }
        return new Money(this.amount.add(other.amount), this.currency);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Money money)) return false;
        return amount.compareTo(money.amount) == 0 &&
               currency.equals(money.currency);
    }
}`
        },
        {
          name: 'Ubiquitous Language',
          explanation: `Ubiquitous Language is a shared vocabulary between developers and domain experts that is used consistently in code, documentation, and conversations.

Benefits:
- Eliminates translation between business and technical terms
- Reduces misunderstandings and communication errors
- Makes code more readable and self-documenting
- Ensures everyone speaks the same language

Implementation:
- Use domain terms in class names, methods, and variables
- Avoid technical jargon in domain models
- Document the glossary of terms
- Refactor code when language evolves

Examples:
- "Customer places an Order" instead of "User creates OrderEntity"
- "Order is confirmed" instead of "Status changed to CONFIRMED"
- "Payment is processed" instead of "Transaction completed"`,
          codeExample: `// Bad - Technical jargon
public class OrderEntity {
    private int statusCode;

    public void updateStatus(int newStatus) {
        this.statusCode = newStatus;
        // What does status 2 mean?
    }
}

// Good - Ubiquitous Language
public class Order {
    private OrderStatus status;

    public void confirm() {
        validateCanBeConfirmed();
        this.status = OrderStatus.CONFIRMED;
        registerEvent(new OrderConfirmed(this.id));
    }

    public void ship(TrackingNumber trackingNumber) {
        validateCanBeShipped();
        this.status = OrderStatus.SHIPPED;
        this.trackingNumber = trackingNumber;
        registerEvent(new OrderShipped(this.id, trackingNumber));
    }

    public void cancel(CancellationReason reason) {
        validateCanBeCancelled();
        this.status = OrderStatus.CANCELLED;
        this.cancellationReason = reason;
        registerEvent(new OrderCancelled(this.id, reason));
    }
}`
        },
        {
          name: 'Subdomains',
          explanation: `Subdomains represent different areas of the business domain. DDD categorizes them into three types based on their strategic importance.

Core Domain:
- The most important part of your business
- Provides competitive advantage
- Deserves the most investment and best developers
- Example: Pricing algorithms for a trading platform

Supporting Subdomain:
- Necessary for the business but not core
- Could be outsourced or use simpler solutions
- Example: User management in an e-commerce system

Generic Subdomain:
- Common functionality across industries
- Best solved with off-the-shelf solutions
- Example: Email sending, payment processing

Identifying Subdomains:
- Talk to domain experts
- Look for natural boundaries
- Consider what makes your business unique`,
          codeExample: `// Core Domain - Trading Platform's Pricing Engine
// This is where competitive advantage lies
public class PricingEngine {
    private final MarketDataService marketData;
    private final RiskCalculator riskCalculator;
    private final SpreadCalculator spreadCalculator;

    public Quote calculateQuote(QuoteRequest request) {
        MarketSnapshot snapshot = marketData.getLatestSnapshot();
        RiskAssessment risk = riskCalculator.assess(request, snapshot);
        Spread spread = spreadCalculator.calculate(risk, snapshot);

        return Quote.builder()
            .bidPrice(snapshot.getMidPrice().subtract(spread.half()))
            .askPrice(snapshot.getMidPrice().add(spread.half()))
            .validUntil(Instant.now().plus(Duration.ofMillis(100)))
            .build();
    }
}

// Supporting Subdomain - User Management
// Important but not core to trading
public class UserService {
    public User createUser(CreateUserCommand cmd) {
        // Standard user creation logic
    }
}

// Generic Subdomain - Email Notifications
// Use off-the-shelf solution
@Service
public class EmailNotificationService {
    private final SendGridClient sendGrid; // Third-party service

    public void sendNotification(Notification notification) {
        sendGrid.send(notification.toEmail());
    }
}`
        }
      ]
    },
    {
      id: 'bounded-context',
      name: 'Bounded Context',
      icon: '🗺️',
      color: '#8b5cf6',
      description: 'A Bounded Context defines explicit boundaries within which a domain model is valid. Each context has its own ubiquitous language and can evolve independently.',
      diagram: BoundedContextDiagram,
      details: [
        {
          name: 'Context Boundaries',
          diagram: BoundedContextDiagram,
          explanation: `A Bounded Context is a central pattern in DDD that defines explicit boundaries within which a domain model is valid. Each bounded context has its own ubiquitous language and can be independently developed and deployed.

Key Characteristics:
- Explicit boundary around a domain model
- Own ubiquitous language and terminology
- Independent data storage (often separate database)
- Clear ownership by a single team
- Can use different technologies

Benefits:
- Clear boundaries reduce complexity
- Teams can work independently
- Models evolve separately
- Supports microservices architecture
- Prevents model pollution

Identifying Bounded Contexts:
- Look for linguistic boundaries (same word, different meaning)
- Identify natural organizational boundaries
- Consider transaction boundaries
- Analyze team structures (Conway's Law)`,
          codeExample: `// Order Context - "Customer" means reference ID
package com.example.order.domain;

public class Order {
    private OrderId id;
    private CustomerId customerId;  // Just a reference ID
    private List<OrderLine> lines;
    private OrderStatus status;

    // Order context's view of a product - only price matters
    public void addProduct(ProductId productId, int qty, Money price) {
        lines.add(new OrderLine(productId, qty, price));
    }
}

// Shipping Context - "Customer" means delivery address
package com.example.shipping.domain;

public class Shipment {
    private ShipmentId id;
    private OrderReference orderRef;  // Reference to Order context
    private Address destination;      // Full customer address
    private List<ShipmentItem> items;
    private Carrier carrier;

    // Shipping cares about physical delivery, not pricing
    public void assignCarrier(Carrier carrier) {
        this.carrier = carrier;
        this.status = ShipmentStatus.READY_FOR_PICKUP;
    }
}`
        },
        {
          name: 'Integration Events',
          explanation: `Bounded Contexts communicate through integration events. These events are published when something significant happens in one context and may be relevant to other contexts.

Event Characteristics:
- Immutable records of what happened
- Contain all necessary information (self-contained)
- Published asynchronously
- Multiple contexts can subscribe

Event Design:
- Use past tense (OrderConfirmed, PaymentReceived)
- Include aggregate ID and relevant data
- Add timestamp for ordering
- Version events for schema evolution

Loose Coupling Benefits:
- Contexts don't need to know about each other
- Changes in one context don't affect others
- Enables eventual consistency
- Supports distributed systems`,
          codeExample: `// Event published by Order Context
public record OrderConfirmed(
    OrderId orderId,
    CustomerId customerId,
    List<OrderLineSnapshot> lines,
    Money total,
    Instant confirmedAt
) implements DomainEvent {}

// Event handler in Inventory Context
@Component
public class OrderConfirmedHandler {
    private final ProductRepository productRepository;
    private final EventPublisher eventPublisher;

    @EventListener
    public void handle(OrderConfirmed event) {
        for (OrderLineSnapshot line : event.lines()) {
            Product product = productRepository.findById(line.productId());
            product.reserve(line.quantity());
            productRepository.save(product);
        }

        eventPublisher.publish(new ItemsReserved(
            event.orderId(),
            event.lines().stream()
                .map(l -> new ReservedItem(l.productId(), l.quantity()))
                .toList()
        ));
    }
}

// Event handler in Shipping Context
@Component
public class ItemsReservedHandler {
    private final ShipmentService shipmentService;

    @EventListener
    public void handle(ItemsReserved event) {
        shipmentService.createShipment(event.orderId(), event.items());
    }
}`
        },
        {
          name: 'Different Models',
          explanation: `The same real-world concept can have different representations in different bounded contexts. This is intentional and helps each context focus on what matters to it.

Example: "Product"
- Order Context: ProductId, price at time of order
- Inventory Context: SKU, stock levels, warehouse location
- Catalog Context: name, description, images, categories

Example: "Customer"
- Sales Context: contact info, purchase history, preferences
- Billing Context: payment methods, invoicing address
- Support Context: tickets, interactions, satisfaction scores

Benefits:
- Each model is optimized for its purpose
- No unnecessary complexity
- Clear ownership of data
- Independent evolution`,
          codeExample: `// Product in Order Context - focuses on pricing
package com.example.order.domain;

public record OrderedProduct(
    ProductId id,
    Money unitPrice,
    int quantity
) {
    public Money calculateTotal() {
        return unitPrice.multiply(quantity);
    }
}

// Product in Inventory Context - focuses on stock
package com.example.inventory.domain;

public class Product {
    private ProductId id;
    private SKU sku;
    private String name;
    private int stockQuantity;
    private int reservedQuantity;
    private WarehouseLocation location;

    public void reserve(int quantity) {
        if (getAvailableQuantity() < quantity) {
            throw new InsufficientStockException(id, quantity);
        }
        reservedQuantity += quantity;
        registerEvent(new StockReserved(id, quantity));
    }

    public int getAvailableQuantity() {
        return stockQuantity - reservedQuantity;
    }
}

// Product in Catalog Context - focuses on display
package com.example.catalog.domain;

public class Product {
    private ProductId id;
    private String name;
    private String description;
    private List<Image> images;
    private List<Category> categories;
    private List<Tag> tags;
    private Rating averageRating;

    public void updateDescription(String description) {
        this.description = description;
        registerEvent(new ProductDescriptionUpdated(id, description));
    }
}`
        }
      ]
    },
    {
      id: 'aggregate-pattern',
      name: 'Aggregate Pattern',
      icon: '📦',
      color: '#f59e0b',
      description: 'An Aggregate is a cluster of domain objects treated as a single unit. The Aggregate Root controls access and enforces invariants.',
      diagram: AggregatePatternDiagram,
      details: [
        {
          name: 'Aggregate Root',
          diagram: AggregatePatternDiagram,
          explanation: `An Aggregate is a cluster of domain objects that are treated as a single unit for data changes. Every aggregate has a root entity (Aggregate Root) that controls access to all objects within the boundary.

Aggregate Rules:
- Reference aggregates by ID only (not direct object reference)
- Changes within aggregate are transactionally consistent
- External objects can only hold reference to the root
- Only the root can be obtained from repositories
- Deleting the root removes all within the boundary

Aggregate Root Responsibilities:
- Protect internal invariants
- Control all access to child entities
- Publish domain events
- Enforce business rules
- Manage internal object lifecycle`,
          codeExample: `// Aggregate Root - Order
public class Order {
    private final OrderId id;
    private CustomerId customerId;  // ID reference only
    private List<OrderLine> lines = new ArrayList<>();
    private OrderStatus status;
    private Money total;
    private final List<DomainEvent> events = new ArrayList<>();

    // Factory method ensures valid initial state
    public static Order create(OrderId id, CustomerId customerId) {
        Order order = new Order(id, customerId);
        order.status = OrderStatus.DRAFT;
        order.total = Money.ZERO;
        order.events.add(new OrderCreated(id, customerId));
        return order;
    }

    // All modifications go through the aggregate root
    public void addLine(ProductId productId, int qty, Money unitPrice) {
        validateDraftStatus();
        validateQuantity(qty);

        OrderLineId lineId = OrderLineId.generate();
        OrderLine line = new OrderLine(lineId, productId, qty, unitPrice);
        lines.add(line);
        recalculateTotal();

        events.add(new OrderLineAdded(id, lineId, productId, qty));
    }

    // Invariant protection
    public void confirm() {
        validateDraftStatus();
        if (lines.isEmpty()) {
            throw new OrderHasNoLinesException(id);
        }
        if (total.isLessThan(Money.of(10, "USD"))) {
            throw new MinimumOrderAmountException(id, total);
        }

        status = OrderStatus.CONFIRMED;
        events.add(new OrderConfirmed(id, total, Instant.now()));
    }
}`
        },
        {
          name: 'Entities & Value Objects',
          diagram: EntityValueObjectDiagram,
          explanation: `Within an aggregate, you'll find two types of domain objects:

Entities:
- Have unique identity that persists over time
- Can change state (mutable)
- Equality is based on identity, not attributes
- Examples: OrderLine, Payment

Value Objects:
- Defined by their attributes, not identity
- Immutable - create new instances instead of modifying
- Equality is based on all attributes
- Examples: Money, Address, DateRange

Design Guidelines:
- Prefer value objects when possible (simpler, safer)
- Use entities only when identity is essential
- Make value objects immutable
- Keep entities focused on identity and lifecycle`,
          codeExample: `// Entity within Aggregate - has local identity
public class OrderLine {
    private final OrderLineId id;  // Local identity within aggregate
    private final ProductId productId;
    private int quantity;
    private Money unitPrice;

    // Package-private: only Order can create OrderLines
    OrderLine(OrderLineId id, ProductId productId, int qty, Money unitPrice) {
        this.id = id;
        this.productId = productId;
        this.quantity = qty;
        this.unitPrice = unitPrice;
    }

    public Money getTotal() {
        return unitPrice.multiply(quantity);
    }

    // Package-private: modifications controlled by Order
    void updateQuantity(int newQuantity) {
        this.quantity = newQuantity;
    }
}

// Value Object - Immutable, equality by attributes
public record Money(BigDecimal amount, String currency) {
    public static final Money ZERO = new Money(BigDecimal.ZERO, "USD");

    public Money {
        if (amount == null) throw new IllegalArgumentException("Amount required");
        if (currency == null) throw new IllegalArgumentException("Currency required");
        amount = amount.setScale(2, RoundingMode.HALF_UP);
    }

    public Money add(Money other) {
        validateSameCurrency(other);
        return new Money(amount.add(other.amount), currency);
    }

    public Money multiply(int factor) {
        return new Money(amount.multiply(BigDecimal.valueOf(factor)), currency);
    }
}

// Value Object for addresses
public record Address(
    String street,
    String city,
    String state,
    String zipCode,
    String country
) {
    public Address {
        Objects.requireNonNull(street, "Street is required");
        Objects.requireNonNull(city, "City is required");
        Objects.requireNonNull(zipCode, "Zip code is required");
    }
}`
        },
        {
          name: 'Design Guidelines',
          explanation: `Designing Aggregates effectively is crucial for DDD success.

Keep Aggregates Small:
- Favor smaller over larger aggregates
- Large aggregates cause locking and performance issues
- Split by true consistency requirements

Reference by ID:
- Never hold direct references to other aggregates
- Use IDs to reference external aggregates
- Load related aggregates in application layer

One Transaction per Aggregate:
- Changes within one aggregate are atomic
- Cross-aggregate changes use eventual consistency
- Domain events enable cross-aggregate communication

Common Mistakes to Avoid:
- Making aggregates too large
- Modeling based on database tables
- Ignoring consistency boundaries
- Direct references between aggregates`,
          codeExample: `// Bad - Aggregate too large, direct references
public class Order {
    private Customer customer;        // Direct reference - BAD
    private List<Product> products;   // Direct reference - BAD
    private List<OrderLine> lines;
    private Payment payment;          // Should be separate aggregate
    private Shipment shipment;        // Should be separate aggregate
}

// Good - Small aggregate, ID references
public class Order {
    private final OrderId id;
    private CustomerId customerId;     // ID reference only
    private List<OrderLine> lines;
    private OrderStatus status;
    private Money total;

    // Lines are part of the aggregate
    public void addLine(ProductId productId, int qty, Money price) {
        validateCanModify();
        lines.add(new OrderLine(OrderLineId.generate(), productId, qty, price));
        recalculateTotal();
    }
}

// Separate Aggregate - Payment
public class Payment {
    private final PaymentId id;
    private OrderId orderId;           // Reference to Order by ID
    private Money amount;
    private PaymentStatus status;
    private PaymentMethod method;

    public void process() {
        // Payment logic
        registerEvent(new PaymentProcessed(id, orderId, amount));
    }
}

// Application Service coordinates aggregates
@Service
public class OrderApplicationService {
    public void confirmAndPay(OrderId orderId, PaymentMethod method) {
        Order order = orderRepository.findById(orderId);
        order.confirm();
        orderRepository.save(order);

        // Payment is a separate aggregate
        Payment payment = Payment.create(
            PaymentId.generate(),
            orderId,
            order.getTotal(),
            method
        );
        paymentRepository.save(payment);
    }
}`
        }
      ]
    },
    {
      id: 'context-mapping',
      name: 'Context Mapping',
      icon: '🔗',
      color: '#3b82f6',
      description: 'Context Mapping describes relationships and integration patterns between Bounded Contexts, helping teams design appropriate integration strategies.',
      diagram: ContextMappingDiagram,
      details: [
        {
          name: 'Mapping Patterns',
          diagram: ContextMappingDiagram,
          explanation: `Context Mapping describes the relationships and integration patterns between Bounded Contexts.

Partnership:
- Two teams succeed or fail together
- Coordinated planning and releases
- Mutual dependency

Customer-Supplier:
- Upstream team provides, downstream consumes
- Upstream considers downstream needs
- Downstream has influence over upstream

Conformist:
- Downstream adopts upstream model as-is
- No translation layer
- Used when upstream won't accommodate

Shared Kernel:
- Two teams share a subset of the model
- Requires close coordination
- Changes need agreement from both teams`,
          codeExample: `// Customer-Supplier Pattern
// Upstream (Order Context) provides events
public record OrderConfirmed(
    String orderId,
    String customerId,
    List<OrderedItem> items,
    BigDecimal totalAmount,
    Instant occurredAt
) implements IntegrationEvent {}

// Downstream (Shipping Context) consumes
@Component
public class ShippingOrderHandler {
    private final ShipmentService shipmentService;

    @EventHandler
    public void on(OrderConfirmed event) {
        CreateShipmentCommand command = new CreateShipmentCommand(
            event.orderId(),
            event.items().stream()
                .map(this::toShipmentItem)
                .toList()
        );
        shipmentService.createShipment(command);
    }
}

// Shared Kernel Pattern
// Located in: shared-kernel module
package com.example.shared.kernel;

// Both Order and Billing contexts agree on Money
public record Money(BigDecimal amount, Currency currency) {
    // Shared validation and operations
}

// Both contexts agree on these event contracts
public interface OrderEvent extends DomainEvent {
    OrderId orderId();
}`
        },
        {
          name: 'Anti-Corruption Layer',
          explanation: `The Anti-Corruption Layer (ACL) is a protective translation layer that isolates your domain model from external influences.

When to Use ACL:
- Integrating with legacy systems
- Working with external APIs
- Protecting from upstream model changes
- Translating between different languages

ACL Components:
- Translators: Convert between models
- Facades: Simplify external interfaces
- Adapters: Adapt external APIs

Benefits:
- Keeps your model clean
- Absorbs external changes
- Single point of translation
- Easier testing`,
          codeExample: `// External legacy system model (we don't control this)
public class LegacyCustomerDTO {
    public String CUST_ID;
    public String CUST_NM;
    public String CUST_ADDR_LINE1;
    public String CUST_ADDR_LINE2;
    public String CUST_STATUS_CD;  // "A", "I", "S"
}

// Our clean domain model
public class Customer {
    private final CustomerId id;
    private final CustomerName name;
    private final Address address;
    private final CustomerStatus status;
}

// Anti-Corruption Layer - Translator
@Component
public class CustomerAntiCorruptionLayer {

    public Customer translate(LegacyCustomerDTO legacy) {
        return new Customer(
            new CustomerId(legacy.CUST_ID),
            new CustomerName(legacy.CUST_NM),
            translateAddress(legacy),
            translateStatus(legacy.CUST_STATUS_CD)
        );
    }

    private Address translateAddress(LegacyCustomerDTO legacy) {
        return AddressParser.parse(
            legacy.CUST_ADDR_LINE1,
            legacy.CUST_ADDR_LINE2
        );
    }

    private CustomerStatus translateStatus(String code) {
        return switch (code) {
            case "A" -> CustomerStatus.ACTIVE;
            case "I" -> CustomerStatus.INACTIVE;
            case "S" -> CustomerStatus.SUSPENDED;
            default -> throw new UnknownStatusException(code);
        };
    }
}

// Usage in application service
@Service
public class CustomerImportService {
    private final LegacyCustomerClient legacyClient;
    private final CustomerAntiCorruptionLayer acl;
    private final CustomerRepository repository;

    public void importCustomer(String legacyId) {
        LegacyCustomerDTO legacy = legacyClient.fetchCustomer(legacyId);
        Customer customer = acl.translate(legacy);
        repository.save(customer);
    }
}`
        },
        {
          name: 'Open Host Service',
          explanation: `Open Host Service defines a well-documented protocol or API that multiple consumers can use to integrate with your bounded context.

Characteristics:
- Published Language (schema/contracts)
- Versioned APIs
- Documentation
- Multiple consumers supported

Best Practices:
- Use standard formats (JSON, Protobuf)
- Version your API
- Provide clear documentation
- Support backward compatibility
- Consider API Gateway`,
          codeExample: `// Open Host Service - Published API
@RestController
@RequestMapping("/api/v1/orders")
public class OrderHostService {
    private final OrderApplicationService orderService;
    private final OrderDTOAssembler assembler;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(
            @Valid @RequestBody CreateOrderRequest request) {
        Order order = orderService.createOrder(
            new CustomerId(request.getCustomerId()),
            request.getLines().stream()
                .map(this::toOrderLineCommand)
                .toList()
        );
        return ResponseEntity
            .created(locationOf(order))
            .body(assembler.toDTO(order));
    }

    @GetMapping("/{orderId}")
    public OrderDTO getOrder(@PathVariable String orderId) {
        Order order = orderService.findById(new OrderId(orderId));
        return assembler.toDTO(order);
    }

    @PostMapping("/{orderId}/confirm")
    public OrderDTO confirmOrder(@PathVariable String orderId) {
        Order order = orderService.confirm(new OrderId(orderId));
        return assembler.toDTO(order);
    }
}

// Published Language - DTO Contracts
public record OrderDTO(
    String id,
    String customerId,
    String status,
    List<OrderLineDTO> lines,
    MoneyDTO total,
    Instant createdAt,
    Instant updatedAt
) {}

public record CreateOrderRequest(
    @NotNull String customerId,
    @NotEmpty List<OrderLineRequest> lines
) {}

// OpenAPI documentation
/*
openapi: 3.0.0
info:
  title: Order Service API
  version: 1.0.0
paths:
  /api/v1/orders:
    post:
      summary: Create a new order
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderRequest'
*/`
        }
      ]
    },
    {
      id: 'layered-architecture',
      name: 'Layered Architecture',
      icon: '🏗️',
      color: '#ec4899',
      description: 'DDD recommends a layered architecture that separates concerns and protects the domain model from external dependencies.',
      diagram: LayeredArchitectureDiagram,
      details: [
        {
          name: 'Architecture Layers',
          diagram: LayeredArchitectureDiagram,
          explanation: `DDD recommends a layered architecture that separates concerns and protects the domain model from external dependencies.

Layers (from outside in):

1. User Interface / Presentation Layer
   - REST Controllers, GraphQL resolvers
   - View models and DTOs
   - Input validation
   - No business logic

2. Application Layer
   - Orchestrates domain objects
   - Application services (use cases)
   - Transaction management
   - Security checks
   - Thin layer - delegates to domain

3. Domain Layer (Core)
   - Entities, Value Objects, Aggregates
   - Domain Services, Domain Events
   - Repository interfaces
   - Business rules and logic
   - NO infrastructure dependencies

4. Infrastructure Layer
   - Repository implementations
   - ORM configurations
   - Message broker adapters
   - External API clients`,
          codeExample: `// Domain Layer - Pure Business Logic
package com.example.order.domain;

public class Order {
    private final OrderId id;
    private CustomerId customerId;
    private List<OrderLine> lines;
    private OrderStatus status;

    public void confirm() {
        if (lines.isEmpty()) {
            throw new OrderHasNoLinesException(id);
        }
        this.status = OrderStatus.CONFIRMED;
        // Pure domain logic, no dependencies
    }
}

// Repository Interface (defined in domain)
public interface OrderRepository {
    Order findById(OrderId id);
    void save(Order order);
}

// Domain Service - stateless operations
public class OrderPricingService {
    public Money calculateTotal(Order order, DiscountPolicy discount) {
        Money subtotal = order.getSubtotal();
        return discount.apply(subtotal);
    }
}`
        },
        {
          name: 'Application Layer',
          explanation: `The Application Layer orchestrates use cases by coordinating domain objects and infrastructure services.

Responsibilities:
- Define application use cases
- Coordinate domain objects
- Manage transactions
- Handle security/authorization
- Publish domain events

Characteristics:
- Thin layer (no business logic)
- Delegates to domain layer
- Returns DTOs to presentation
- Defines application boundaries

What NOT to do:
- Business logic in services
- Direct database access
- Complex conditionals`,
          codeExample: `// Application Layer - Use Case Orchestration
package com.example.order.application;

@Service
@Transactional
public class OrderApplicationService {
    private final OrderRepository orderRepository;
    private final CustomerService customerService;
    private final EventPublisher eventPublisher;

    public OrderDTO createOrder(CreateOrderCommand command) {
        // Validate customer exists
        customerService.validateCustomer(command.getCustomerId());

        // Create order using domain factory
        Order order = Order.create(
            OrderId.generate(),
            command.getCustomerId()
        );

        // Add lines via aggregate root
        command.getLines().forEach(line ->
            order.addLine(line.getProductId(), line.getQuantity(), line.getPrice())
        );

        // Persist via repository
        orderRepository.save(order);

        // Publish domain events
        order.getDomainEvents().forEach(eventPublisher::publish);

        // Return DTO (not domain object)
        return OrderAssembler.toDTO(order);
    }

    public OrderDTO confirmOrder(ConfirmOrderCommand command) {
        Order order = orderRepository.findById(command.getOrderId());
        order.confirm();
        orderRepository.save(order);
        eventPublisher.publishAll(order.getDomainEvents());
        return OrderAssembler.toDTO(order);
    }
}`
        },
        {
          name: 'Infrastructure Layer',
          explanation: `The Infrastructure Layer implements technical concerns and adapts external systems to domain interfaces.

Responsibilities:
- Repository implementations
- ORM/database access
- Message broker integration
- External API clients
- Caching implementations

Dependency Rule:
- Infrastructure depends on Domain
- Domain NEVER depends on Infrastructure
- Use Dependency Inversion Principle

Benefits:
- Swappable implementations
- Testable domain logic
- Clear separation of concerns`,
          codeExample: `// Infrastructure Layer - Technical Implementation
package com.example.order.infrastructure;

@Repository
public class JpaOrderRepository implements OrderRepository {
    private final OrderJpaRepository jpaRepository;
    private final OrderMapper mapper;

    @Override
    public Order findById(OrderId id) {
        OrderEntity entity = jpaRepository.findById(id.getValue())
            .orElseThrow(() -> new OrderNotFoundException(id));
        return mapper.toDomain(entity);
    }

    @Override
    public void save(Order order) {
        OrderEntity entity = mapper.toEntity(order);
        jpaRepository.save(entity);
    }
}

// JPA Entity (Infrastructure concern)
@Entity
@Table(name = "orders")
public class OrderEntity {
    @Id
    private String id;
    private String customerId;
    private String status;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderLineEntity> lines;
}

// Presentation Layer - API Controllers
package com.example.order.presentation;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderApplicationService orderService;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(
            @Valid @RequestBody CreateOrderRequest request) {

        CreateOrderCommand command = new CreateOrderCommand(
            new CustomerId(request.getCustomerId()),
            request.getLines().stream()
                .map(this::toLineCommand)
                .toList()
        );

        OrderDTO order = orderService.createOrder(command);
        return ResponseEntity.created(locationOf(order)).body(order);
    }
}`
        }
      ]
    },
    {
      id: 'domain-events',
      name: 'Domain Events',
      icon: '📣',
      color: '#06b6d4',
      description: 'Domain Events capture something significant that happened in the domain. They enable loose coupling and eventual consistency between aggregates.',
      diagram: DomainEventDiagram,
      details: [
        {
          name: 'Event Design',
          diagram: DomainEventDiagram,
          explanation: `Domain Events represent something meaningful that happened in the domain. They are named in past tense and are immutable records of facts.

Characteristics:
- Named in past tense (OrderConfirmed, PaymentReceived)
- Immutable - cannot be changed
- Self-contained - include all relevant data
- Timestamped - when it occurred

Event Contents:
- Aggregate ID (which aggregate)
- Relevant data at time of event
- Timestamp
- Optional correlation/causation IDs

Benefits:
- Audit trail of all changes
- Enables event sourcing
- Loose coupling between aggregates
- Supports eventual consistency`,
          codeExample: `// Domain Event - Immutable record
public record OrderConfirmed(
    OrderId orderId,
    CustomerId customerId,
    List<OrderLineSnapshot> lines,
    Money total,
    Instant occurredAt
) implements DomainEvent {

    public OrderConfirmed {
        Objects.requireNonNull(orderId);
        Objects.requireNonNull(customerId);
        Objects.requireNonNull(lines);
        Objects.requireNonNull(total);
        if (occurredAt == null) {
            occurredAt = Instant.now();
        }
    }
}

// Snapshot of data at time of event
public record OrderLineSnapshot(
    ProductId productId,
    int quantity,
    Money unitPrice
) {}

// Base interface for domain events
public interface DomainEvent {
    Instant occurredAt();

    default String eventType() {
        return getClass().getSimpleName();
    }
}

// Aggregate publishes events
public class Order {
    private final List<DomainEvent> domainEvents = new ArrayList<>();

    public void confirm() {
        validateCanBeConfirmed();
        this.status = OrderStatus.CONFIRMED;

        domainEvents.add(new OrderConfirmed(
            this.id,
            this.customerId,
            createLineSnapshots(),
            this.total,
            Instant.now()
        ));
    }

    public List<DomainEvent> getDomainEvents() {
        return Collections.unmodifiableList(domainEvents);
    }

    public void clearDomainEvents() {
        domainEvents.clear();
    }
}`
        },
        {
          name: 'Event Handlers',
          explanation: `Event handlers react to domain events, enabling side effects and cross-aggregate communication.

Handler Types:
- Same Bounded Context: Update read models, trigger workflows
- Different Bounded Context: Integration, eventual consistency

Design Patterns:
- Single responsibility per handler
- Idempotent handling
- Error handling and retry
- Transaction boundaries

Best Practices:
- Keep handlers focused
- Make handlers idempotent
- Log all event processing
- Consider ordering guarantees`,
          codeExample: `// Event Handler in same context - update read model
@Component
public class OrderReadModelHandler {
    private final OrderSummaryRepository summaryRepo;

    @EventListener
    public void on(OrderConfirmed event) {
        OrderSummary summary = OrderSummary.builder()
            .orderId(event.orderId().getValue())
            .customerId(event.customerId().getValue())
            .status("CONFIRMED")
            .total(event.total().amount())
            .itemCount(event.lines().size())
            .confirmedAt(event.occurredAt())
            .build();

        summaryRepo.save(summary);
    }
}

// Event Handler in different context
@Component
public class InventoryEventHandler {
    private final ProductRepository productRepository;
    private final EventPublisher eventPublisher;

    @EventListener
    @Transactional
    public void on(OrderConfirmed event) {
        List<ReservationResult> results = new ArrayList<>();

        for (OrderLineSnapshot line : event.lines()) {
            Product product = productRepository.findById(line.productId());
            product.reserve(line.quantity());
            productRepository.save(product);

            results.add(new ReservationResult(
                line.productId(),
                line.quantity(),
                true
            ));
        }

        eventPublisher.publish(new ItemsReserved(
            event.orderId(),
            results,
            Instant.now()
        ));
    }
}

// Idempotent handler using event ID
@Component
public class IdempotentEventHandler {
    private final ProcessedEventRepository processedEvents;

    @EventListener
    @Transactional
    public void on(OrderConfirmed event) {
        String eventId = event.orderId() + "-" + event.occurredAt();

        if (processedEvents.exists(eventId)) {
            log.info("Event already processed: {}", eventId);
            return;
        }

        // Process event...

        processedEvents.markProcessed(eventId);
    }
}`
        },
        {
          name: 'Event Publishing',
          explanation: `Event publishing strategies determine when and how domain events are dispatched to handlers.

Publishing Strategies:
1. Immediate: Publish during transaction
2. Post-commit: Publish after transaction commits
3. Outbox Pattern: Store in DB, publish asynchronously

Outbox Pattern Benefits:
- Guaranteed delivery
- Atomic with aggregate save
- Handles failures gracefully
- Supports exactly-once semantics

Considerations:
- Transaction boundaries
- Event ordering
- Failure handling
- Performance impact`,
          codeExample: `// Application Service publishes events
@Service
@Transactional
public class OrderApplicationService {
    private final OrderRepository orderRepository;
    private final ApplicationEventPublisher eventPublisher;

    public void confirmOrder(OrderId orderId) {
        Order order = orderRepository.findById(orderId);
        order.confirm();
        orderRepository.save(order);

        // Publish events after save
        order.getDomainEvents().forEach(event ->
            eventPublisher.publishEvent(event)
        );
        order.clearDomainEvents();
    }
}

// Outbox Pattern - guaranteed delivery
@Entity
@Table(name = "outbox_events")
public class OutboxEvent {
    @Id
    private String id;
    private String aggregateType;
    private String aggregateId;
    private String eventType;
    private String payload;
    private Instant createdAt;
    private boolean published;
}

@Service
public class OutboxPublisher {
    private final OutboxRepository outboxRepository;

    @Transactional
    public void saveEvent(DomainEvent event, AggregateRoot aggregate) {
        OutboxEvent outbox = OutboxEvent.builder()
            .id(UUID.randomUUID().toString())
            .aggregateType(aggregate.getClass().getSimpleName())
            .aggregateId(aggregate.getId().toString())
            .eventType(event.getClass().getSimpleName())
            .payload(serialize(event))
            .createdAt(Instant.now())
            .published(false)
            .build();

        outboxRepository.save(outbox);
    }
}

// Scheduled job publishes outbox events
@Component
public class OutboxProcessor {
    @Scheduled(fixedDelay = 1000)
    @Transactional
    public void processOutbox() {
        List<OutboxEvent> pending = outboxRepository
            .findByPublishedFalseOrderByCreatedAt();

        for (OutboxEvent event : pending) {
            try {
                messagePublisher.publish(event.getPayload());
                event.setPublished(true);
                outboxRepository.save(event);
            } catch (Exception e) {
                log.error("Failed to publish: {}", event.getId(), e);
            }
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
      { name: 'Design', icon: '🏛️', page: 'Design' },
      { name: 'Domain-Driven Design', icon: '🎯', page: 'DomainDrivenDesign' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #5eead4, #14b8a6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(20, 184, 166, 0.2)',
    border: '1px solid rgba(20, 184, 166, 0.3)',
    borderRadius: '0.5rem',
    color: '#5eead4',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Domain-Driven Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Design
        </button>
      </div>

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
                >X</button>
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

export default DomainDrivenDesign

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const DARKPOOL_COLORS = {
  primary: '#64748b',
  primaryHover: '#94a3b8',
  bg: 'rgba(100, 116, 139, 0.1)',
  border: 'rgba(100, 116, 139, 0.3)',
  arrow: '#64748b',
  hoverBg: 'rgba(100, 116, 139, 0.2)',
  topicBg: 'rgba(100, 116, 139, 0.2)'
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

const OrderIngestionDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Order Ingestion Flow
    </text>

    {/* Client */}
    <rect x="50" y="60" width="140" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Trading Client</text>
    <text x="120" y="105" textAnchor="middle" fill="white" fontSize="9">FIX 4.4/5.0</text>

    {/* Gateway */}
    <rect x="270" y="60" width="140" height="60" rx="8" fill="#10b981" stroke="#4ade80" strokeWidth="2"/>
    <text x="340" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Ingestion</text>
    <text x="340" y="100" textAnchor="middle" fill="white" fontSize="9">Gateway</text>
    <text x="340" y="112" textAnchor="middle" fill="white" fontSize="8">&lt;1µs latency</text>

    {/* Validation */}
    <rect x="490" y="60" width="140" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="560" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Order</text>
    <text x="560" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Validation</text>

    {/* Risk Checks */}
    <rect x="330" y="180" width="140" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="400" y="205" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Risk Checks</text>
    <text x="400" y="220" textAnchor="middle" fill="white" fontSize="9">Real-time</text>

    {/* Arrows */}
    <line x1="190" y1="90" x2="265" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
    <text x="227" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">order</text>

    <line x1="410" y1="90" x2="485" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
    <text x="447" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">validate</text>

    <line x1="560" y1="120" x2="400" y2="175" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
    <text x="480" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">check</text>
  </svg>
)

const MatchingEngineDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Matching Engine Architecture
    </text>

    {/* Order Book */}
    <rect x="50" y="60" width="180" height="90" rx="8" fill="#10b981" stroke="#4ade80" strokeWidth="2"/>
    <text x="140" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Hidden Order Book</text>
    <text x="140" y="100" textAnchor="middle" fill="white" fontSize="9">Price-Time Priority</text>
    <text x="140" y="115" textAnchor="middle" fill="white" fontSize="9">20 Levels Deep</text>
    <text x="140" y="130" textAnchor="middle" fill="white" fontSize="9">Anti-Gaming Logic</text>

    {/* Matching Logic */}
    <rect x="310" y="60" width="180" height="90" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Matching Logic</text>
    <text x="400" y="100" textAnchor="middle" fill="white" fontSize="9">Algorithm Engine</text>
    <text x="400" y="115" textAnchor="middle" fill="white" fontSize="9">TWAP/VWAP</text>
    <text x="400" y="130" textAnchor="middle" fill="white" fontSize="9">Iceberg Orders</text>

    {/* Execution */}
    <rect x="570" y="60" width="180" height="90" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="660" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Execution</text>
    <text x="660" y="100" textAnchor="middle" fill="white" fontSize="9">Fill Generation</text>
    <text x="660" y="115" textAnchor="middle" fill="white" fontSize="9">Price Improvement</text>
    <text x="660" y="130" textAnchor="middle" fill="white" fontSize="9">Confirmations</text>

    {/* Liquidity Pool */}
    <rect x="310" y="190" width="180" height="70" rx="8" fill="#14b8a6" stroke="#2dd4bf" strokeWidth="2"/>
    <text x="400" y="215" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Liquidity Pool</text>
    <text x="400" y="230" textAnchor="middle" fill="white" fontSize="9">$500M+ Daily</text>
    <text x="400" y="245" textAnchor="middle" fill="white" fontSize="9">Cross-venue</text>

    {/* Arrows */}
    <line x1="230" y1="105" x2="305" y2="105" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
    <line x1="490" y1="105" x2="565" y2="105" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
    <line x1="400" y1="150" x2="400" y2="185" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
  </svg>
)

const SmartRoutingDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Smart Order Router
    </text>

    {/* SOR Core */}
    <rect x="310" y="60" width="180" height="80" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">SOR Engine</text>
    <text x="400" y="100" textAnchor="middle" fill="white" fontSize="9">ML-Based Routing</text>
    <text x="400" y="115" textAnchor="middle" fill="white" fontSize="9">Cost Analysis</text>
    <text x="400" y="130" textAnchor="middle" fill="white" fontSize="9">Impact Prediction</text>

    {/* Venues */}
    <rect x="80" y="180" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="130" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Venue 1</text>
    <text x="130" y="218" textAnchor="middle" fill="white" fontSize="8">Dark Pool</text>

    <rect x="240" y="180" width="100" height="50" rx="8" fill="#10b981" stroke="#4ade80" strokeWidth="2"/>
    <text x="290" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Venue 2</text>
    <text x="290" y="218" textAnchor="middle" fill="white" fontSize="8">Lit Exchange</text>

    <rect x="400" y="180" width="100" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="450" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Venue 3</text>
    <text x="450" y="218" textAnchor="middle" fill="white" fontSize="8">ATS</text>

    <rect x="560" y="180" width="100" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="610" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Venue N</text>
    <text x="610" y="218" textAnchor="middle" fill="white" fontSize="8">120+ Total</text>

    {/* Arrows */}
    <line x1="350" y1="140" x2="140" y2="175" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
    <line x1="380" y1="140" x2="290" y2="175" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
    <line x1="420" y1="140" x2="450" y2="175" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
    <line x1="450" y1="140" x2="610" y2="175" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>

    <text x="400" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Dynamic Allocation</text>
  </svg>
)

const RiskManagementDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Risk Management System
    </text>

    {/* Real-time Monitor */}
    <rect x="310" y="60" width="180" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Real-time Monitor</text>
    <text x="400" y="100" textAnchor="middle" fill="white" fontSize="9">50M+ checks/day</text>
    <text x="400" y="115" textAnchor="middle" fill="white" fontSize="9">&lt;10ns response</text>

    {/* Controls */}
    <rect x="50" y="180" width="130" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="115" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Position</text>
    <text x="115" y="220" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Limits</text>

    <rect x="220" y="180" width="130" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="285" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Credit</text>
    <text x="285" y="220" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Checks</text>

    <rect x="390" y="180" width="130" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="455" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Circuit</text>
    <text x="455" y="220" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Breakers</text>

    <rect x="560" y="180" width="130" height="60" rx="8" fill="#10b981" stroke="#4ade80" strokeWidth="2"/>
    <text x="625" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Anomaly</text>
    <text x="625" y="220" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Detection</text>

    {/* Arrows */}
    <line x1="350" y1="130" x2="125" y2="175" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)"/>
    <line x1="380" y1="130" x2="285" y2="175" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)"/>
    <line x1="420" y1="130" x2="455" y2="175" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)"/>
    <line x1="450" y1="130" x2="625" y2="175" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)"/>
  </svg>
)

const AnalyticsDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowTeal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Analytics & Reporting
    </text>

    {/* Analytics Engine */}
    <rect x="310" y="60" width="180" height="70" rx="8" fill="#14b8a6" stroke="#2dd4bf" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Analytics Engine</text>
    <text x="400" y="100" textAnchor="middle" fill="white" fontSize="9">500+ daily reports</text>
    <text x="400" y="115" textAnchor="middle" fill="white" fontSize="9">API Integration</text>

    {/* Reports */}
    <rect x="50" y="180" width="140" height="55" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="202" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">TCA</text>
    <text x="120" y="217" textAnchor="middle" fill="white" fontSize="8">Cost Analysis</text>

    <rect x="230" y="180" width="140" height="55" rx="8" fill="#10b981" stroke="#4ade80" strokeWidth="2"/>
    <text x="300" y="202" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Impact Studies</text>
    <text x="300" y="217" textAnchor="middle" fill="white" fontSize="8">Market Analysis</text>

    <rect x="410" y="180" width="140" height="55" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="480" y="202" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Attribution</text>
    <text x="480" y="217" textAnchor="middle" fill="white" fontSize="8">Performance</text>

    <rect x="590" y="180" width="140" height="55" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="660" y="202" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Regulatory</text>
    <text x="660" y="217" textAnchor="middle" fill="white" fontSize="8">Compliance</text>

    {/* Arrows */}
    <line x1="350" y1="130" x2="130" y2="175" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
    <line x1="380" y1="130" x2="300" y2="175" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
    <line x1="420" y1="130" x2="480" y2="175" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
    <line x1="450" y1="130" x2="660" y2="175" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
  </svg>
)

const ArchitectureOverviewDiagram = () => (
  <svg viewBox="0 0 800 400" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowMain" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
      <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9"/>
      </linearGradient>
      <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
      </linearGradient>
      <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9"/>
      </linearGradient>
      <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
      </linearGradient>
      <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.9"/>
      </linearGradient>
      <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9"/>
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Dark Pool System Architecture
    </text>

    {/* Row 1 */}
    <rect x="50" y="60" width="160" height="80" rx="8" fill="url(#blueGrad)" stroke="#60a5fa" strokeWidth="2"/>
    <text x="130" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Order Ingestion</text>
    <text x="130" y="105" textAnchor="middle" fill="white" fontSize="9">FIX Protocol</text>
    <text x="130" y="120" textAnchor="middle" fill="white" fontSize="9">1M+ orders/sec</text>

    <rect x="270" y="60" width="160" height="80" rx="8" fill="url(#greenGrad)" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Matching Engine</text>
    <text x="350" y="105" textAnchor="middle" fill="white" fontSize="9">Price-Time Priority</text>
    <text x="350" y="120" textAnchor="middle" fill="white" fontSize="9">Hidden Liquidity</text>

    <rect x="490" y="60" width="160" height="80" rx="8" fill="url(#purpleGrad)" stroke="#a78bfa" strokeWidth="2"/>
    <text x="570" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Liquidity Pool</text>
    <text x="570" y="105" textAnchor="middle" fill="white" fontSize="9">$500M+ Daily</text>
    <text x="570" y="120" textAnchor="middle" fill="white" fontSize="9">Cross-venue</text>

    {/* Row 2 */}
    <rect x="50" y="190" width="160" height="80" rx="8" fill="url(#redGrad)" stroke="#f87171" strokeWidth="2"/>
    <text x="130" y="220" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Smart Routing</text>
    <text x="130" y="235" textAnchor="middle" fill="white" fontSize="9">ML-Based</text>
    <text x="130" y="250" textAnchor="middle" fill="white" fontSize="9">120+ Venues</text>

    <rect x="270" y="190" width="160" height="80" rx="8" fill="url(#orangeGrad)" stroke="#fbbf24" strokeWidth="2"/>
    <text x="350" y="220" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Risk Management</text>
    <text x="350" y="235" textAnchor="middle" fill="white" fontSize="9">Real-time</text>
    <text x="350" y="250" textAnchor="middle" fill="white" fontSize="9">50M+ checks/day</text>

    <rect x="490" y="190" width="160" height="80" rx="8" fill="url(#tealGrad)" stroke="#2dd4bf" strokeWidth="2"/>
    <text x="570" y="220" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Analytics</text>
    <text x="570" y="235" textAnchor="middle" fill="white" fontSize="9">TCA & Reports</text>
    <text x="570" y="250" textAnchor="middle" fill="white" fontSize="9">500+ daily</text>

    {/* Arrows */}
    <line x1="210" y1="100" x2="265" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowMain)"/>
    <line x1="430" y1="100" x2="485" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowMain)"/>
    <line x1="130" y1="140" x2="130" y2="185" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowMain)"/>
    <line x1="350" y1="140" x2="350" y2="185" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowMain)"/>
    <line x1="210" y1="230" x2="265" y2="230" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowMain)"/>
    <line x1="430" y1="230" x2="485" y2="230" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowMain)"/>

    {/* Labels */}
    <text x="237" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8">flow</text>
    <text x="457" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8">match</text>
    <text x="147" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">route</text>
    <text x="367" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">control</text>
    <text x="347" y="220" textAnchor="middle" fill="#94a3b8" fontSize="8">monitor</text>
    <text x="457" y="220" textAnchor="middle" fill="#94a3b8" fontSize="8">analyze</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function DarkPoolMatchingEngine({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'order-ingestion',
      name: 'Order Ingestion Gateway',
      icon: '📥',
      color: '#3b82f6',
      description: 'High-performance order ingestion system supporting multiple protocols with ultra-low latency processing and comprehensive risk validation.',
      diagram: ArchitectureOverviewDiagram,
      details: [
        {
          name: 'FIX 4.4/5.0 Protocol',
          diagram: OrderIngestionDiagram,
          explanation: 'Industry-standard Financial Information eXchange protocol supporting both legacy (4.4) and modern (5.0) versions. Provides low-latency message encoding/decoding with extensive field validation and session management for institutional trading.',
          codeExample: `// FIX Message Handler
public class FIXMessageHandler {
    private final QuickFIXEngine engine;

    public void processNewOrder(Message message) {
        // Extract FIX fields
        String clOrdID = message.getString(ClOrdID.FIELD);
        String symbol = message.getString(Symbol.FIELD);
        double price = message.getDouble(Price.FIELD);
        int quantity = message.getInt(OrderQty.FIELD);

        // Validate message
        validateOrder(clOrdID, symbol, price, quantity);

        // Route to matching engine
        matchingEngine.submitOrder(
            new Order(clOrdID, symbol, price, quantity)
        );
    }
}`
        },
        {
          name: 'Sub-microsecond Latency',
          explanation: 'Optimized processing pipeline achieving end-to-end latency under 1 microsecond (< 1µs). Uses kernel bypass techniques (DPDK), CPU pinning, memory-mapped I/O, and lock-free data structures to minimize processing overhead.',
          codeExample: `// Lock-free Order Queue
public class LockFreeOrderQueue {
    private final AtomicReferenceArray<Order> ringBuffer;
    private final AtomicLong writeIndex = new AtomicLong(0);
    private final AtomicLong readIndex = new AtomicLong(0);

    public boolean enqueue(Order order) {
        long current = writeIndex.get();
        long next = current + 1;

        // CAS operation for lock-free write
        if (writeIndex.compareAndSet(current, next)) {
            int index = (int)(current % ringBuffer.length());
            ringBuffer.set(index, order);
            return true;
        }
        return false;
    }

    public Order dequeue() {
        long current = readIndex.get();
        long next = current + 1;

        if (readIndex.compareAndSet(current, next)) {
            int index = (int)(current % ringBuffer.length());
            return ringBuffer.getAndSet(index, null);
        }
        return null;
    }
}`
        },
        {
          name: '1M+ Orders/sec',
          explanation: 'Horizontal scaling architecture supporting over 1 million order messages per second. Implements sharded order queues, parallel processing pools, and zero-copy networking to handle institutional volumes.',
          codeExample: `// Sharded Order Processor
public class ShardedOrderProcessor {
    private final List<OrderQueue> shards;
    private final ExecutorService executorPool;

    public ShardedOrderProcessor(int numShards) {
        this.shards = new ArrayList<>(numShards);
        this.executorPool = Executors.newFixedThreadPool(numShards);

        for (int i = 0; i < numShards; i++) {
            OrderQueue queue = new OrderQueue();
            shards.add(queue);
            executorPool.submit(() -> processQueue(queue));
        }
    }

    public void submitOrder(Order order) {
        // Hash-based sharding by symbol
        int shardIndex = Math.abs(
            order.getSymbol().hashCode() % shards.size()
        );
        shards.get(shardIndex).enqueue(order);
    }

    private void processQueue(OrderQueue queue) {
        while (true) {
            Order order = queue.dequeue();
            if (order != null) {
                matchingEngine.match(order);
            }
        }
    }
}`
        },
        {
          name: 'Multi-venue Support',
          explanation: 'Unified gateway connecting to 120+ trading venues including lit exchanges, dark pools, and alternative trading systems. Venue-specific adaptors handle protocol differences, session management, and failover logic.',
          codeExample: `// Multi-venue Gateway
public class VenueGateway {
    private final Map<String, VenueConnector> venues;

    public void routeOrder(Order order, String venueId) {
        VenueConnector venue = venues.get(venueId);

        if (venue == null) {
            throw new VenueNotFoundException(venueId);
        }

        // Convert to venue-specific format
        VenueOrder venueOrder = venue.convertOrder(order);

        // Send with retry logic
        sendWithRetry(venue, venueOrder, 3);
    }

    private void sendWithRetry(
        VenueConnector venue,
        VenueOrder order,
        int maxRetries
    ) {
        for (int i = 0; i < maxRetries; i++) {
            try {
                venue.sendOrder(order);
                return;
            } catch (VenueException e) {
                if (i == maxRetries - 1) throw e;
                failoverToBackup(venue);
            }
        }
    }
}`
        },
        {
          name: 'Order Validation',
          explanation: 'Comprehensive pre-trade validation including symbol verification, price reasonability checks, quantity limits, trading hours validation, and duplicate order detection. Rejects invalid orders before market submission.',
          codeExample: `// Order Validator
public class OrderValidator {
    private final SymbolMaster symbolMaster;
    private final PriceValidator priceValidator;
    private final Set<String> processedOrders;

    public ValidationResult validate(Order order) {
        // Check for duplicate
        if (processedOrders.contains(order.getClOrdID())) {
            return ValidationResult.reject("Duplicate order");
        }

        // Validate symbol
        if (!symbolMaster.isValid(order.getSymbol())) {
            return ValidationResult.reject("Invalid symbol");
        }

        // Check trading hours
        if (!isTradingHours(order.getSymbol())) {
            return ValidationResult.reject("Outside trading hours");
        }

        // Price reasonability check
        double marketPrice = priceValidator.getMarketPrice(
            order.getSymbol()
        );
        if (Math.abs(order.getPrice() - marketPrice) / marketPrice > 0.1) {
            return ValidationResult.reject("Price outside 10% collar");
        }

        processedOrders.add(order.getClOrdID());
        return ValidationResult.accept();
    }
}`
        },
        {
          name: 'Risk Checks',
          explanation: 'Real-time risk assessment on every order including position limits, margin requirements, concentration limits, credit checks, and regulatory constraints. Blocks orders exceeding risk thresholds automatically.',
          codeExample: `// Pre-trade Risk Engine
public class RiskEngine {
    private final PositionManager positionMgr;
    private final CreditManager creditMgr;

    public RiskResult checkOrder(Order order, String accountId) {
        // Check position limits
        Position currentPos = positionMgr.getPosition(
            accountId, order.getSymbol()
        );
        if (currentPos.getQuantity() + order.getQuantity()
            > MAX_POSITION_SIZE) {
            return RiskResult.reject("Position limit exceeded");
        }

        // Check credit limits
        double orderValue = order.getPrice() * order.getQuantity();
        CreditLine credit = creditMgr.getCreditLine(accountId);
        if (credit.getAvailable() < orderValue) {
            return RiskResult.reject("Insufficient credit");
        }

        // Check concentration limits
        double portfolioValue = positionMgr.getPortfolioValue(
            accountId
        );
        if (orderValue / portfolioValue > 0.2) {
            return RiskResult.reject("Concentration limit exceeded");
        }

        return RiskResult.accept();
    }
}`
        }
      ]
    },
    {
      id: 'matching-engine',
      name: 'Core Matching Engine',
      icon: '⚡',
      color: '#10b981',
      description: 'Advanced matching algorithms with sophisticated order types, anti-gaming protection, and institutional-grade execution quality.',
      diagram: MatchingEngineDiagram,
      details: [
        {
          name: 'Price-Time Priority',
          explanation: 'Standard matching algorithm giving priority to best-priced orders first, then time priority for orders at the same price. Ensures fair execution and transparent price discovery in the dark pool.',
          codeExample: `// Price-Time Priority Order Book
public class OrderBook {
    private final TreeMap<Double, Queue<Order>> bids;
    private final TreeMap<Double, Queue<Order>> asks;

    public void addOrder(Order order) {
        if (order.isBuy()) {
            bids.computeIfAbsent(
                order.getPrice(),
                k -> new LinkedList<>()
            ).add(order);
        } else {
            asks.computeIfAbsent(
                order.getPrice(),
                k -> new LinkedList<>()
            ).add(order);
        }
        matchOrders();
    }

    private void matchOrders() {
        while (!bids.isEmpty() && !asks.isEmpty()) {
            double bestBid = bids.lastKey();  // Highest bid
            double bestAsk = asks.firstKey(); // Lowest ask

            if (bestBid >= bestAsk) {
                Queue<Order> bidQueue = bids.get(bestBid);
                Queue<Order> askQueue = asks.get(bestAsk);

                executeMatch(bidQueue.poll(), askQueue.poll());
            } else {
                break;
            }
        }
    }
}`
        },
        {
          name: 'Hidden Liquidity',
          explanation: 'Non-displayed order book where orders are not visible to other market participants until execution. Prevents information leakage and market impact for large institutional orders.',
          codeExample: `// Hidden Order Book
public class HiddenOrderBook {
    private final Map<String, Order> hiddenOrders;
    private final OrderBook visibleBook;

    public void addHiddenOrder(Order order) {
        // Store in hidden pool
        hiddenOrders.put(order.getOrderId(), order);

        // Only match, don't display
        matchHiddenOrder(order);
    }

    private void matchHiddenOrder(Order order) {
        // Try to match against visible orders
        List<Order> matches = visibleBook.findMatches(
            order.getSymbol(),
            order.getPrice(),
            order.getSide().opposite()
        );

        for (Order match : matches) {
            if (canMatch(order, match)) {
                // Execute without revealing full size
                int fillQty = Math.min(
                    order.getRemainingQty(),
                    match.getRemainingQty()
                );
                executeFill(order, match, fillQty);

                if (order.isFilled()) break;
            }
        }
    }

    public int getVisibleDepth(String symbol, double price) {
        // Hidden orders not included in market data
        return visibleBook.getDepth(symbol, price);
    }
}`
        },
        {
          name: 'Iceberg Orders',
          explanation: 'Large orders with only a small portion displayed, with the remainder hidden. As the visible portion executes, new tranches are automatically revealed, minimizing market impact.',
          codeExample: `// Iceberg Order Handler
public class IcebergOrder extends Order {
    private final int totalQuantity;
    private final int displayQuantity;
    private int remainingHidden;

    public IcebergOrder(
        String symbol,
        double price,
        int total,
        int display
    ) {
        super(symbol, price, display);
        this.totalQuantity = total;
        this.displayQuantity = display;
        this.remainingHidden = total - display;
    }

    public void onPartialFill(int filledQty) {
        int currentVisible = getRemainingQty();

        // Update visible quantity
        super.onPartialFill(filledQty);

        // Replenish from hidden quantity
        if (currentVisible == 0 && remainingHidden > 0) {
            int replenish = Math.min(
                displayQuantity,
                remainingHidden
            );
            setQuantity(replenish);
            remainingHidden -= replenish;

            // Re-insert into order book with new timestamp
            orderBook.refresh(this);
        }
    }

    public boolean isFullyFilled() {
        return getRemainingQty() == 0 && remainingHidden == 0;
    }
}`
        },
        {
          name: 'TWAP/VWAP Algorithms',
          explanation: 'Time-Weighted Average Price and Volume-Weighted Average Price algorithmic strategies. TWAP spreads orders evenly over time, while VWAP targets historical volume patterns to minimize market impact.',
          codeExample: `// VWAP Algorithm
public class VWAPAlgorithm {
    private final HistoricalVolumeProfile volumeProfile;
    private final Order parentOrder;
    private final List<Order> childOrders = new ArrayList<>();

    public void schedule(Order order, LocalTime startTime, LocalTime endTime) {
        this.parentOrder = order;

        // Get historical volume distribution
        List<VolumeInterval> profile = volumeProfile.getProfile(
            order.getSymbol(),
            startTime,
            endTime
        );

        // Allocate order quantity based on volume distribution
        for (VolumeInterval interval : profile) {
            double volumePct = interval.getVolume() / profile.getTotalVolume();
            int childQty = (int)(order.getQuantity() * volumePct);

            Order childOrder = new Order(
                order.getSymbol(),
                order.getPrice(),
                childQty
            );
            childOrder.setScheduledTime(interval.getStartTime());
            childOrders.add(childOrder);
        }
    }

    public void execute() {
        for (Order child : childOrders) {
            if (LocalTime.now().isAfter(child.getScheduledTime())) {
                orderRouter.submit(child);
            }
        }
    }
}`
        },
        {
          name: 'Anti-Gaming Logic',
          explanation: 'Sophisticated detection algorithms identifying predatory trading behavior, order stuffing, quote manipulation, and layering. Automatically delays or rejects suspicious orders to protect institutional clients.',
          codeExample: `// Anti-Gaming Detection
public class AntiGamingEngine {
    private final Map<String, OrderHistory> orderHistory;
    private final MLModel gamingDetector;

    public GamingResult checkOrder(Order order, String traderId) {
        OrderHistory history = orderHistory.computeIfAbsent(
            traderId,
            k -> new OrderHistory()
        );

        // Check for order stuffing (excessive cancel/replace)
        if (history.getCancelRateLastSecond() > 0.8) {
            return GamingResult.reject("Order stuffing detected");
        }

        // Check for layering (multiple orders far from market)
        int layeringScore = calculateLayeringScore(
            order,
            history.getActiveOrders()
        );
        if (layeringScore > LAYERING_THRESHOLD) {
            return GamingResult.delay(
                "Potential layering",
                Duration.ofMillis(100)
            );
        }

        // ML-based gaming detection
        double gamingProbability = gamingDetector.predict(
            order,
            history
        );
        if (gamingProbability > 0.85) {
            return GamingResult.reject("ML gaming detection");
        }

        history.addOrder(order);
        return GamingResult.accept();
    }
}`
        },
        {
          name: 'Order Book Depth',
          explanation: 'Full depth-of-book visibility with 20 price levels on both bid and ask sides. Provides institutional traders with complete market context while maintaining anonymity of individual orders.',
          codeExample: `// Order Book Depth Aggregator
public class OrderBookDepth {
    private final OrderBook book;

    public MarketDepth getDepth(String symbol, int levels) {
        MarketDepth depth = new MarketDepth();

        // Aggregate bids (buy side)
        TreeMap<Double, Integer> bidLevels = new TreeMap<>(
            Collections.reverseOrder()
        );
        for (Order bid : book.getBids(symbol)) {
            bidLevels.merge(
                bid.getPrice(),
                bid.getRemainingQty(),
                Integer::sum
            );
        }

        // Top N bid levels
        bidLevels.entrySet().stream()
            .limit(levels)
            .forEach(e -> depth.addBid(e.getKey(), e.getValue()));

        // Aggregate asks (sell side)
        TreeMap<Double, Integer> askLevels = new TreeMap<>();
        for (Order ask : book.getAsks(symbol)) {
            askLevels.merge(
                ask.getPrice(),
                ask.getRemainingQty(),
                Integer::sum
            );
        }

        // Top N ask levels
        askLevels.entrySet().stream()
            .limit(levels)
            .forEach(e -> depth.addAsk(e.getKey(), e.getValue()));

        return depth;
    }
}`
        }
      ]
    },
    {
      id: 'liquidity-pool',
      name: 'Dark Liquidity Pool',
      icon: '🌊',
      color: '#8b5cf6',
      description: 'Deep liquidity aggregation from institutional sources with advanced size discovery and minimal market impact execution.',
      diagram: MatchingEngineDiagram,
      details: [
        {
          name: 'Hidden Order Book',
          explanation: 'Completely non-displayed order book where all resting liquidity is invisible to market participants. Orders only become visible at execution, preventing front-running and information leakage.',
          codeExample: `// Dark Pool Order Book
public class DarkPoolOrderBook {
    private final Map<String, List<Order>> hiddenLiquidity;
    private final ExecutionReporter reporter;

    public void addDarkOrder(Order order) {
        // Add to hidden pool - no market data published
        hiddenLiquidity.computeIfAbsent(
            order.getSymbol(),
            k -> new ArrayList<>()
        ).add(order);

        // Attempt to match immediately
        matchInDarkPool(order);
    }

    private void matchInDarkPool(Order order) {
        List<Order> contraOrders = hiddenLiquidity.get(
            order.getSymbol()
        ).stream()
            .filter(o -> o.getSide() != order.getSide())
            .filter(o -> isPriceCross(o, order))
            .collect(Collectors.toList());

        for (Order contra : contraOrders) {
            if (order.isFilled()) break;

            // Execute at mid-point for price improvement
            double midPrice = (order.getPrice() + contra.getPrice()) / 2;
            int fillQty = Math.min(
                order.getRemainingQty(),
                contra.getRemainingQty()
            );

            // Only report execution, not order book update
            reporter.reportExecution(order, contra, midPrice, fillQty);
        }
    }
}`
        },
        {
          name: 'Institutional Blocks',
          explanation: 'Specialized handling for large block trades (typically 10,000+ shares or $200K+ value). Uses size discovery protocols, reference pricing from lit markets, and negotiation workflows.',
          codeExample: `// Block Trade Handler
public class BlockTradeHandler {
    private static final int MIN_BLOCK_SHARES = 10000;
    private static final double MIN_BLOCK_VALUE = 200000;

    public boolean isBlockTrade(Order order) {
        return order.getQuantity() >= MIN_BLOCK_SHARES ||
               order.getNotionalValue() >= MIN_BLOCK_VALUE;
    }

    public void handleBlockTrade(Order order) {
        // Use reference price from lit market
        double referencePrice = marketData.getMidPrice(
            order.getSymbol()
        );

        // Find institutional counterparty
        Order contraBlock = findContraBlock(
            order.getSymbol(),
            order.getSide().opposite(),
            order.getQuantity() * 0.8  // At least 80% of size
        );

        if (contraBlock != null) {
            // Negotiate execution
            BlockNegotiation negotiation = new BlockNegotiation(
                order,
                contraBlock,
                referencePrice
            );

            // Execute at negotiated price (typically mid-point)
            executeBlockTrade(
                order,
                contraBlock,
                negotiation.getPrice()
            );
        } else {
            // Queue for size discovery
            blockQueue.add(order);
            broadcastIOI(order);  // Indication of Interest
        }
    }
}`
        },
        {
          name: '$500M+ Daily Volume',
          explanation: 'Average daily trading volume exceeding $500 million across all instruments. High liquidity depth enables execution of large institutional orders without significant market impact.',
          codeExample: `// Volume Analytics
public class VolumeAnalytics {
    private final Map<LocalDate, DailyVolume> volumeHistory;

    public VolumeMetrics getDailyMetrics(LocalDate date) {
        DailyVolume volume = volumeHistory.get(date);

        return VolumeMetrics.builder()
            .totalNotional(volume.getTotalNotional())
            .totalShares(volume.getTotalShares())
            .numberOfTrades(volume.getTradeCount())
            .averageTradeSize(
                volume.getTotalNotional() / volume.getTradeCount()
            )
            .largestTrade(volume.getLargestTrade())
            .uniqueSymbols(volume.getSymbolCount())
            .uniqueInstitutions(volume.getInstitutionCount())
            .build();
    }

    public double getAverageDailyVolume(int days) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(days);

        return volumeHistory.entrySet().stream()
            .filter(e -> e.getKey().isAfter(startDate))
            .mapToDouble(e -> e.getValue().getTotalNotional())
            .average()
            .orElse(0.0);
    }

    public boolean hasAdequateLiquidity(String symbol, double targetValue) {
        double avgDailyVolume = getSymbolAverageDailyVolume(symbol, 20);
        // Target should be less than 10% of ADV
        return targetValue < avgDailyVolume * 0.1;
    }
}`
        },
        {
          name: 'Cross-venue Liquidity',
          explanation: 'Aggregated liquidity from multiple dark pools and internal crossing networks. Smart routing identifies best execution opportunities across fragmented liquidity sources.',
          codeExample: `// Cross-venue Liquidity Aggregator
public class LiquidityAggregator {
    private final List<VenueConnector> venues;
    private final Map<String, VenueLiquidity> liquidityCache;

    public AggregatedLiquidity getAvailableLiquidity(
        String symbol,
        Side side
    ) {
        AggregatedLiquidity aggregated = new AggregatedLiquidity();

        // Query all connected venues in parallel
        List<CompletableFuture<VenueLiquidity>> futures = venues.stream()
            .map(venue -> CompletableFuture.supplyAsync(() ->
                venue.queryLiquidity(symbol, side)
            ))
            .collect(Collectors.toList());

        // Aggregate results
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .thenAccept(v -> {
                for (CompletableFuture<VenueLiquidity> future : futures) {
                    try {
                        VenueLiquidity vl = future.get();
                        aggregated.addVenue(vl);
                    } catch (Exception e) {
                        logger.error("Venue query failed", e);
                    }
                }
            }).join();

        return aggregated;
    }

    public List<VenueAllocation> allocateOrder(Order order) {
        AggregatedLiquidity liquidity = getAvailableLiquidity(
            order.getSymbol(),
            order.getSide()
        );

        // Allocate based on liquidity and fill probability
        return liquidity.getVenues().stream()
            .sorted(Comparator.comparing(VenueLiquidity::getFillProbability)
                .reversed())
            .map(vl -> new VenueAllocation(
                vl.getVenue(),
                calculateAllocation(order, vl)
            ))
            .collect(Collectors.toList());
    }
}`
        },
        {
          name: 'Size Discovery',
          explanation: 'Anonymous protocols allowing counterparties to discover mutual interest in large orders without revealing size or direction. Uses ping orders, indication of interest (IOI), and negotiation workflows.',
          codeExample: `// Size Discovery Protocol
public class SizeDiscoveryEngine {
    private final Map<String, IOI> indicationsOfInterest;

    public void publishIOI(String symbol, Side side, int minSize) {
        IOI ioi = IOI.builder()
            .symbol(symbol)
            .side(side)
            .minSize(minSize)
            .timestamp(Instant.now())
            .anonymousId(generateAnonymousId())
            .build();

        indicationsOfInterest.put(ioi.getId(), ioi);

        // Broadcast to qualified counterparties only
        broadcastToInstitutions(ioi);
    }

    public List<IOIMatch> findMatches(IOI buyerIOI) {
        return indicationsOfInterest.values().stream()
            .filter(ioi -> ioi.getSymbol().equals(buyerIOI.getSymbol()))
            .filter(ioi -> ioi.getSide() == buyerIOI.getSide().opposite())
            .filter(ioi -> hasOverlappingSize(buyerIOI, ioi))
            .map(ioi -> new IOIMatch(buyerIOI, ioi))
            .collect(Collectors.toList());
    }

    public void sendPingOrder(String symbol, Side side) {
        // Small exploratory order to test liquidity
        Order ping = Order.builder()
            .symbol(symbol)
            .side(side)
            .quantity(100)  // Minimum size
            .price(marketData.getMidPrice(symbol))
            .minimumQuantity(100)
            .build();

        orderBook.addOrder(ping);

        // Monitor for responses
        monitorPingResponse(ping, Duration.ofSeconds(2));
    }
}`
        },
        {
          name: 'Price Improvement',
          explanation: 'Execution at better prices than displayed on public markets. Uses mid-point pricing, reference pricing from multiple venues, and spread capture to provide 2-3 basis points average improvement.',
          codeExample: `// Price Improvement Engine
public class PriceImprovementEngine {
    private final MarketDataAggregator marketData;

    public double calculateImprovedPrice(Order order) {
        // Get NBBO (National Best Bid/Offer)
        Quote nbbo = marketData.getNBBO(order.getSymbol());

        // Use mid-point pricing for dark pool execution
        double midPoint = (nbbo.getBid() + nbbo.getAsk()) / 2;

        // Apply price improvement based on order size
        double improvement = calculateImprovement(
            order.getQuantity(),
            order.getSymbol()
        );

        if (order.isBuy()) {
            // Buyer gets better price (lower)
            return Math.min(
                order.getLimitPrice(),
                midPoint - improvement
            );
        } else {
            // Seller gets better price (higher)
            return Math.max(
                order.getLimitPrice(),
                midPoint + improvement
            );
        }
    }

    public double calculateSavings(Execution exec) {
        Quote nbbo = marketData.getNBBOAtTime(
            exec.getSymbol(),
            exec.getTimestamp()
        );

        double benchmarkPrice = exec.getSide().isBuy()
            ? nbbo.getAsk()
            : nbbo.getBid();

        double savings = Math.abs(exec.getPrice() - benchmarkPrice);
        double basisPoints = (savings / benchmarkPrice) * 10000;

        return basisPoints;  // Typically 2-3 bps
    }
}`
        }
      ]
    },
    {
      id: 'smart-routing',
      name: 'Smart Order Router',
      icon: '🧠',
      color: '#ef4444',
      description: 'Machine learning-powered routing system optimizing execution across multiple venues with predictive cost analysis.',
      diagram: SmartRoutingDiagram,
      details: [
        {
          name: 'ML-Based Routing',
          explanation: 'Machine learning models predict optimal venue selection based on historical fill rates, execution quality, and market conditions. Models retrain continuously on recent execution data to adapt to changing markets.',
          codeExample: `// ML-Based Smart Router
public class MLSmartRouter {
    private final RandomForestModel routingModel;
    private final FeatureExtractor featureExtractor;

    public List<VenueScore> scoreVenues(Order order) {
        // Extract features for ML model
        Features features = featureExtractor.extract(order, Map.of(
            "symbol", order.getSymbol(),
            "quantity", order.getQuantity(),
            "urgency", order.getUrgency(),
            "timeOfDay", LocalTime.now(),
            "marketVolatility", marketData.getVolatility(order.getSymbol()),
            "spread", marketData.getSpread(order.getSymbol())
        ));

        // Predict fill probability and execution quality for each venue
        List<VenueScore> scores = new ArrayList<>();
        for (Venue venue : venues) {
            features.addVenue(venue.getId(), venue.getHistoricalMetrics());

            Prediction prediction = routingModel.predict(features);

            VenueScore score = VenueScore.builder()
                .venue(venue)
                .fillProbability(prediction.getFillProbability())
                .expectedCost(prediction.getExpectedCost())
                .expectedLatency(prediction.getExpectedLatency())
                .qualityScore(prediction.getQualityScore())
                .build();

            scores.add(score);
        }

        return scores.stream()
            .sorted(Comparator.comparing(VenueScore::getQualityScore)
                .reversed())
            .collect(Collectors.toList());
    }

    public void retrainModel() {
        // Retrain on recent executions
        List<ExecutionRecord> recentExecs = executionRepository
            .getExecutionsSince(Instant.now().minus(Duration.ofDays(7)));

        routingModel.retrain(recentExecs);
    }
}`
        },
        {
          name: 'Venue Selection',
          explanation: 'Dynamic routing to 120+ trading venues based on instrument, order size, urgency, and market conditions. Considers venue fill rates, fees, speed, and historical execution quality.',
          codeExample: `// Venue Selector
public class VenueSelector {
    private final List<Venue> venues;
    private final VenueMetrics metrics;

    public List<Venue> selectVenues(Order order, int maxVenues) {
        return venues.stream()
            .filter(v -> v.supports(order.getSymbol()))
            .filter(v -> v.getMinSize() <= order.getQuantity())
            .map(v -> {
                double score = calculateVenueScore(v, order);
                return new ScoredVenue(v, score);
            })
            .sorted(Comparator.comparing(ScoredVenue::getScore)
                .reversed())
            .limit(maxVenues)
            .map(ScoredVenue::getVenue)
            .collect(Collectors.toList());
    }

    private double calculateVenueScore(Venue venue, Order order) {
        VenueMetrics m = metrics.getMetrics(venue.getId());

        // Weighted scoring model
        double fillRateScore = m.getFillRate() * 0.35;
        double costScore = (1 - m.getAverageCost()) * 0.25;
        double speedScore = (1 / m.getAverageLatency()) * 0.20;
        double reliabilityScore = m.getUptime() * 0.20;

        // Apply symbol-specific adjustments
        double symbolAdjustment = m.getSymbolFillRate(
            order.getSymbol()
        );

        return (fillRateScore + costScore + speedScore +
                reliabilityScore) * symbolAdjustment;
    }
}`
        },
        {
          name: 'Cost Analysis',
          explanation: 'Real-time calculation of expected execution costs including exchange fees, market impact, timing risk, and opportunity cost. Provides pre-trade cost estimates and post-trade analysis.',
          codeExample: `// Transaction Cost Estimator
public class TransactionCostEstimator {

    public CostEstimate estimateCost(Order order) {
        String symbol = order.getSymbol();
        int quantity = order.getQuantity();

        // Exchange fees
        double exchangeFees = calculateExchangeFees(order);

        // Market impact cost
        double adv = marketData.getAverageDailyVolume(symbol);
        double participation = quantity / adv;
        double volatility = marketData.getVolatility(symbol);
        double spread = marketData.getSpread(symbol);

        // Impact model: cost = spread/2 + volatility * sqrt(participation)
        double marketImpact = (spread / 2) +
            (volatility * Math.sqrt(participation) * 0.5);

        // Timing risk (delay cost)
        double timingRisk = volatility *
            Math.sqrt(order.getTimeHorizon() / 252.0) * 0.3;

        // Opportunity cost
        double opportunityCost = calculateOpportunityCost(order);

        return CostEstimate.builder()
            .exchangeFees(exchangeFees)
            .marketImpact(marketImpact)
            .timingRisk(timingRisk)
            .opportunityCost(opportunityCost)
            .totalCost(exchangeFees + marketImpact + timingRisk +
                      opportunityCost)
            .build();
    }

    public double calculateExchangeFees(Order order) {
        double notional = order.getQuantity() * order.getPrice();
        return notional * 0.0003;  // 3 basis points
    }
}`
        },
        {
          name: 'Impact Prediction',
          explanation: 'Statistical models estimate market impact of order execution based on order size, spread, volatility, and liquidity. Uses historical market data and order flow analysis.',
          codeExample: `// Market Impact Model
public class MarketImpactModel {

    public ImpactPrediction predictImpact(Order order) {
        String symbol = order.getSymbol();

        // Get market microstructure data
        double spread = marketData.getSpread(symbol);
        double volatility = marketData.getVolatility(symbol);
        double adv = marketData.getAverageDailyVolume(symbol);
        double orderBookDepth = marketData.getOrderBookDepth(symbol);

        // Calculate participation rate
        double participation = order.getQuantity() / adv;

        // Almgren-Chriss impact model
        // Temporary impact
        double tempImpact = spread / 2 +
            (volatility * Math.sqrt(participation));

        // Permanent impact
        double permImpact = volatility * participation * 0.1;

        // Total impact (basis points)
        double totalImpact = (tempImpact + permImpact) * 10000;

        return ImpactPrediction.builder()
            .temporaryImpact(tempImpact)
            .permanentImpact(permImpact)
            .totalImpactBps(totalImpact)
            .confidence(calculateConfidence(participation))
            .build();
    }

    private double calculateConfidence(double participation) {
        // Higher confidence for smaller participation rates
        if (participation < 0.01) return 0.95;
        if (participation < 0.05) return 0.85;
        if (participation < 0.10) return 0.70;
        return 0.50;
    }
}`
        },
        {
          name: 'Dynamic Allocation',
          explanation: 'Adaptive order splitting across multiple venues based on real-time liquidity, fill rates, and market conditions. Continuously rebalances allocation to optimize execution quality.',
          codeExample: `// Dynamic Order Allocator
public class DynamicOrderAllocator {
    private final Map<String, VenueAllocation> allocations;

    public void allocateOrder(Order parentOrder, List<Venue> venues) {
        int remainingQty = parentOrder.getQuantity();

        // Initial allocation based on historical fill rates
        for (Venue venue : venues) {
            double fillRate = metrics.getFillRate(venue.getId());
            int allocation = (int)(remainingQty * fillRate);

            Order childOrder = parentOrder.split(allocation);
            router.routeToVenue(childOrder, venue);

            allocations.put(
                venue.getId(),
                new VenueAllocation(venue, childOrder, allocation)
            );
        }

        // Monitor and rebalance
        scheduleRebalancing(parentOrder);
    }

    public void rebalance(Order parentOrder) {
        // Check fill status across venues
        for (VenueAllocation alloc : allocations.values()) {
            if (alloc.getFillRate() < 0.3 &&
                alloc.getTimeInMarket() > Duration.ofSeconds(5)) {
                // Poor fill rate - reallocate to better venue
                int unfilledQty = alloc.getOrder().getRemainingQty();

                // Cancel slow venue
                router.cancelOrder(alloc.getOrder());

                // Find best alternative venue
                Venue betterVenue = findBetterVenue(
                    alloc.getVenue(),
                    parentOrder
                );

                // Reallocate
                Order newChild = parentOrder.split(unfilledQty);
                router.routeToVenue(newChild, betterVenue);
            }
        }
    }
}`
        },
        {
          name: 'Execution Analytics',
          explanation: 'Comprehensive post-trade analysis measuring execution quality vs. arrival price, VWAP, implementation shortfall, and opportunity cost. Generates detailed performance reports.',
          codeExample: `// Execution Quality Analyzer
public class ExecutionQualityAnalyzer {

    public ExecutionReport analyzeExecution(Order order, List<Fill> fills) {
        double arrivalPrice = marketData.getPriceAtTime(
            order.getSymbol(),
            order.getSubmitTime()
        );

        // Calculate VWAP
        double vwap = fills.stream()
            .mapToDouble(f -> f.getPrice() * f.getQuantity())
            .sum() / order.getQuantity();

        // Calculate slippage vs arrival price
        double slippage = order.getSide().isBuy()
            ? vwap - arrivalPrice
            : arrivalPrice - vwap;

        double slippageBps = (slippage / arrivalPrice) * 10000;

        // Implementation shortfall
        double benchmarkCost = calculateBenchmarkCost(order);
        double actualCost = calculateActualCost(fills);
        double implementationShortfall = actualCost - benchmarkCost;

        // Venue breakdown
        Map<String, VenueStats> venueBreakdown = fills.stream()
            .collect(Collectors.groupingBy(
                Fill::getVenue,
                Collectors.collectingAndThen(
                    Collectors.toList(),
                    this::calculateVenueStats
                )
            ));

        return ExecutionReport.builder()
            .orderId(order.getId())
            .arrivalPrice(arrivalPrice)
            .executionVWAP(vwap)
            .slippageBps(slippageBps)
            .implementationShortfall(implementationShortfall)
            .venueBreakdown(venueBreakdown)
            .totalFees(calculateTotalFees(fills))
            .executionTime(calculateExecutionTime(fills))
            .build();
    }
}`
        }
      ]
    },
    {
      id: 'risk-management',
      name: 'Risk Management',
      icon: '🛡️',
      color: '#f59e0b',
      description: 'Comprehensive risk framework with real-time monitoring, automated controls, and regulatory compliance validation.',
      diagram: RiskManagementDiagram,
      details: [
        {
          name: 'Real-time Monitoring',
          explanation: 'Continuous surveillance of all trading activity with 50M+ risk checks per day. Sub-10 nanosecond response times for critical alerts. Dashboard displays positions, exposures, and limit utilization.',
          codeExample: `// Real-time Risk Monitor
public class RealTimeRiskMonitor {
    private final Map<String, PositionTracker> positions;
    private final CircuitBreakerRegistry circuitBreakers;
    private final AlertEngine alertEngine;

    // Sub-10ns critical path using lock-free data structures
    public RiskCheckResult checkRisk(Order order, String accountId) {
        long startTime = System.nanoTime();

        // Lock-free position lookup
        PositionTracker tracker = positions.get(accountId);

        // Fast path risk checks (no allocations)
        if (tracker.getCurrentPosition() + order.getQuantity()
            > tracker.getPositionLimit()) {
            return RiskCheckResult.reject("Position limit");
        }

        if (tracker.getMarginUsed() + order.getMargin()
            > tracker.getMarginLimit()) {
            return RiskCheckResult.reject("Margin limit");
        }

        // Record check time
        long elapsed = System.nanoTime() - startTime;
        metrics.recordCheckLatency(elapsed);

        return RiskCheckResult.accept();
    }

    public void monitorContinuously() {
        // 24/7 monitoring loop
        while (true) {
            for (PositionTracker tracker : positions.values()) {
                // Check P&L limits
                double unrealizedPnL = tracker.getUnrealizedPnL();
                if (unrealizedPnL < tracker.getMaxLoss()) {
                    alertEngine.sendCriticalAlert(
                        "Loss limit breached",
                        tracker.getAccountId()
                    );
                    liquidatePosition(tracker);
                }

                // Check exposure concentrations
                if (tracker.getConcentration() > 0.25) {
                    alertEngine.sendWarning(
                        "High concentration",
                        tracker.getAccountId()
                    );
                }
            }
        }
    }
}`
        },
        {
          name: 'Position Limits',
          explanation: 'Pre-configured maximum position sizes by symbol, sector, and portfolio. Hard limits prevent traders from exceeding authorized risk levels. Automatically blocks orders that would breach limits.',
          codeExample: `// Position Limit Manager
public class PositionLimitManager {
    private final Map<String, LimitConfig> limits;

    public static class LimitConfig {
        int maxSharesPerSymbol;
        double maxNotionalPerSymbol;
        double maxSectorExposure;
        double maxPortfolioExposure;
        int maxOpenOrders;
    }

    public LimitCheckResult checkPositionLimits(
        Order order,
        String accountId
    ) {
        Position position = positionService.getPosition(
            accountId,
            order.getSymbol()
        );
        LimitConfig limits = this.limits.get(accountId);

        // Symbol-level limits
        int newPosition = position.getQuantity() + order.getQuantity();
        if (Math.abs(newPosition) > limits.maxSharesPerSymbol) {
            return LimitCheckResult.reject(
                "Symbol position limit exceeded"
            );
        }

        double notional = order.getQuantity() * order.getPrice();
        if (position.getNotional() + notional > limits.maxNotionalPerSymbol) {
            return LimitCheckResult.reject(
                "Symbol notional limit exceeded"
            );
        }

        // Sector-level limits
        String sector = symbolMaster.getSector(order.getSymbol());
        double sectorExposure = positionService.getSectorExposure(
            accountId,
            sector
        ) + notional;
        double portfolioValue = positionService.getPortfolioValue(accountId);

        if (sectorExposure / portfolioValue > limits.maxSectorExposure) {
            return LimitCheckResult.reject(
                "Sector concentration limit exceeded"
            );
        }

        return LimitCheckResult.accept();
    }
}`
        },
        {
          name: 'Credit Checks',
          explanation: 'Real-time verification of counterparty credit limits and margin requirements before order acceptance. Integrates with prime broker systems for credit line management.',
          codeExample: `// Credit Limit Manager
public class CreditLimitManager {
    private final PrimeBrokerConnector primeBroker;
    private final Map<String, CreditLine> creditLines;

    public CreditCheckResult checkCredit(Order order, String accountId) {
        CreditLine credit = creditLines.get(accountId);

        // Calculate order margin requirement
        double orderMargin = calculateMarginRequirement(order);

        // Check available credit
        double availableCredit = credit.getTotalLimit() -
                                credit.getCurrentUsage();

        if (orderMargin > availableCredit) {
            return CreditCheckResult.reject(
                "Insufficient credit",
                availableCredit,
                orderMargin
            );
        }

        // Check with prime broker in real-time
        PrimeBrokerResponse pbResponse = primeBroker.checkCredit(
            accountId,
            orderMargin
        );

        if (!pbResponse.isApproved()) {
            return CreditCheckResult.reject(
                "Prime broker rejected",
                pbResponse.getReason()
            );
        }

        // Reserve credit
        credit.reserve(orderMargin);

        return CreditCheckResult.accept();
    }

    private double calculateMarginRequirement(Order order) {
        // Reg T margin: 50% for stocks
        double notional = order.getQuantity() * order.getPrice();
        double baseMargin = notional * 0.5;

        // Apply risk-based adjustments
        double volatility = marketData.getVolatility(order.getSymbol());
        double marginMultiplier = 1 + (volatility * 0.5);

        return baseMargin * marginMultiplier;
    }
}`
        },
        {
          name: 'Compliance Rules',
          explanation: 'Automated enforcement of regulatory requirements including best execution, short sale restrictions, wash trade detection, and market manipulation prevention. 100% compliance rate.',
          codeExample: `// Compliance Engine
public class ComplianceEngine {
    private final WashTradeDetector washTradeDetector;
    private final ShortSaleValidator shortSaleValidator;

    public ComplianceResult checkCompliance(Order order, String accountId) {
        // Wash trade detection (buy and sell same security within 30 days)
        if (washTradeDetector.isWashTrade(order, accountId)) {
            return ComplianceResult.reject(
                "Potential wash trade detected"
            );
        }

        // Short sale restrictions
        if (order.getSide() == Side.SELL_SHORT) {
            ShortSaleResult ssr = shortSaleValidator.validate(
                order.getSymbol()
            );

            if (ssr.isRestricted()) {
                return ComplianceResult.reject(
                    "Short sale restriction (SSR) in effect"
                );
            }

            // Locate requirement
            if (!hasLocate(accountId, order.getSymbol(), order.getQuantity())) {
                return ComplianceResult.reject(
                    "No stock locate for short sale"
                );
            }
        }

        // Market manipulation checks
        if (isLayering(order, accountId)) {
            return ComplianceResult.reject(
                "Potential layering detected"
            );
        }

        // Best execution requirement
        if (!meetssBestExecution(order)) {
            return ComplianceResult.warn(
                "Order may not achieve best execution"
            );
        }

        // Log for audit trail
        auditLog.record(order, accountId, "Compliance checks passed");

        return ComplianceResult.accept();
    }
}`
        },
        {
          name: 'Anomaly Detection',
          explanation: 'Machine learning models identify unusual trading patterns, fat finger errors, system malfunctions, and potential market abuse. 99.7% alert accuracy with minimal false positives.',
          codeExample: `// ML-Based Anomaly Detector
public class AnomalyDetectionEngine {
    private final IsolationForestModel anomalyModel;
    private final FeatureExtractor featureExtractor;

    public AnomalyResult detectAnomaly(Order order, String accountId) {
        // Extract features
        Features features = featureExtractor.extract(Map.of(
            "orderSize", order.getQuantity(),
            "orderValue", order.getNotionalValue(),
            "priceDeviation", calculatePriceDeviation(order),
            "timeOfDay", LocalTime.now().getHour(),
            "accountAvgSize", getAccountAvgOrderSize(accountId),
            "accountAvgValue", getAccountAvgOrderValue(accountId),
            "symbolVolatility", marketData.getVolatility(order.getSymbol()),
            "recentActivity", getRecentActivityScore(accountId)
        ));

        // ML anomaly detection
        double anomalyScore = anomalyModel.predict(features);

        // Fat finger detection (order 10x larger than normal)
        if (order.getQuantity() > getAccountAvgOrderSize(accountId) * 10) {
            return AnomalyResult.flagAsAnomaly(
                "Potential fat finger - order 10x larger than average",
                0.95,
                AnomalyType.FAT_FINGER
            );
        }

        // Price anomaly (order price >5% from market)
        double marketPrice = marketData.getMidPrice(order.getSymbol());
        double priceDeviation = Math.abs(
            order.getPrice() - marketPrice
        ) / marketPrice;

        if (priceDeviation > 0.05) {
            return AnomalyResult.flagAsAnomaly(
                "Price deviation >5% from market",
                0.90,
                AnomalyType.PRICE_ANOMALY
            );
        }

        // High anomaly score from ML model
        if (anomalyScore > 0.85) {
            return AnomalyResult.flagAsAnomaly(
                "ML model detected anomaly",
                anomalyScore,
                AnomalyType.PATTERN_ANOMALY
            );
        }

        return AnomalyResult.normal(anomalyScore);
    }
}`
        },
        {
          name: 'Circuit Breakers',
          explanation: 'Automatic trading halts triggered by extreme price movements, unusual volatility, or system anomalies. Prevents runaway algorithms and protects against flash crash scenarios.',
          codeExample: `// Circuit Breaker System
public class CircuitBreakerSystem {
    private final Map<String, CircuitBreaker> breakers;

    public static class CircuitBreaker {
        String symbol;
        CircuitBreakerState state;
        double triggerThreshold;
        Instant tripTime;
        Duration cooldownPeriod;
    }

    public CircuitBreakerResult checkCircuitBreaker(
        String symbol,
        double currentPrice
    ) {
        CircuitBreaker breaker = breakers.computeIfAbsent(
            symbol,
            k -> new CircuitBreaker(symbol)
        );

        // Check if already tripped
        if (breaker.state == CircuitBreakerState.TRIPPED) {
            if (Instant.now().isBefore(
                breaker.tripTime.plus(breaker.cooldownPeriod)
            )) {
                return CircuitBreakerResult.halted(
                    "Circuit breaker active"
                );
            } else {
                // Reset after cooldown
                breaker.state = CircuitBreakerState.ARMED;
            }
        }

        // Check for extreme price movement
        double referencePrice = marketData.getOpenPrice(symbol);
        double priceChange = Math.abs(
            currentPrice - referencePrice
        ) / referencePrice;

        // Trigger if >10% move
        if (priceChange > 0.10) {
            tripCircuitBreaker(breaker, "Price moved >10%");
            haltTrading(symbol);
            return CircuitBreakerResult.halted("Circuit breaker tripped");
        }

        // Check for volatility spike
        double volatility = marketData.getRealizedVolatility(symbol);
        if (volatility > breaker.triggerThreshold * 3) {
            tripCircuitBreaker(breaker, "Volatility spike");
            haltTrading(symbol);
            return CircuitBreakerResult.halted("Volatility circuit breaker");
        }

        return CircuitBreakerResult.normal();
    }

    private void tripCircuitBreaker(CircuitBreaker breaker, String reason) {
        breaker.state = CircuitBreakerState.TRIPPED;
        breaker.tripTime = Instant.now();
        breaker.cooldownPeriod = Duration.ofMinutes(5);

        alertEngine.sendCriticalAlert(
            "CIRCUIT BREAKER TRIPPED",
            breaker.symbol,
            reason
        );
    }
}`
        }
      ]
    },
    {
      id: 'analytics-engine',
      name: 'Analytics & Reporting',
      icon: '📊',
      color: '#14b8a6',
      description: 'Advanced analytics platform providing comprehensive execution analysis, regulatory reporting, and performance insights.',
      diagram: AnalyticsDiagram,
      details: [
        {
          name: 'Transaction Cost Analysis',
          explanation: 'Detailed breakdown of execution costs including market impact, timing costs, opportunity costs, commissions, and fees. Compares actual execution vs. multiple benchmarks.',
          codeExample: `// Transaction Cost Analysis Engine
public class TCAEngine {

    public TCAReport generateTCAReport(Order order, List<Fill> fills) {
        // Benchmarks
        double arrivalPrice = marketData.getPriceAtTime(
            order.getSymbol(),
            order.getSubmitTime()
        );
        double vwap = marketData.getVWAP(
            order.getSymbol(),
            order.getSubmitTime(),
            fills.getLast().getTimestamp()
        );
        double closingPrice = marketData.getClosingPrice(
            order.getSymbol(),
            fills.getLast().getTimestamp().toLocalDate()
        );

        // Execution VWAP
        double execVWAP = fills.stream()
            .mapToDouble(f -> f.getPrice() * f.getQuantity())
            .sum() / order.getQuantity();

        // Cost components
        double marketImpact = calculateMarketImpact(fills, arrivalPrice);
        double timingCost = calculateTimingCost(order, fills);
        double opportunityCost = calculateOpportunityCost(order, fills);
        double commissions = fills.stream()
            .mapToDouble(Fill::getCommission)
            .sum();
        double fees = fills.stream()
            .mapToDouble(Fill::getFees)
            .sum();

        // Performance vs benchmarks (basis points)
        double vsArrival = calculateSlippage(
            execVWAP,
            arrivalPrice,
            order.getSide()
        );
        double vsVWAP = calculateSlippage(
            execVWAP,
            vwap,
            order.getSide()
        );
        double vsClose = calculateSlippage(
            execVWAP,
            closingPrice,
            order.getSide()
        );

        return TCAReport.builder()
            .orderId(order.getId())
            .executionVWAP(execVWAP)
            .arrivalPrice(arrivalPrice)
            .marketVWAP(vwap)
            .closingPrice(closingPrice)
            .marketImpactBps(marketImpact * 10000)
            .timingCostBps(timingCost * 10000)
            .opportunityCostBps(opportunityCost * 10000)
            .commissions(commissions)
            .fees(fees)
            .slippageVsArrivalBps(vsArrival * 10000)
            .slippageVsVWAPBps(vsVWAP * 10000)
            .slippageVsCloseBps(vsClose * 10000)
            .build();
    }
}`
        },
        {
          name: 'Market Impact Studies',
          explanation: 'Statistical analysis measuring price impact of order execution across different strategies, venues, and market conditions. Quantifies temporary and permanent market impact.',
          codeExample: `// Market Impact Analyzer
public class MarketImpactAnalyzer {

    public ImpactStudy analyzeImpact(List<Execution> executions) {
        List<ImpactMeasurement> measurements = new ArrayList<>();

        for (Execution exec : executions) {
            // Measure temporary impact
            double prePrice = marketData.getPriceAtTime(
                exec.getSymbol(),
                exec.getStartTime()
            );
            double executionPrice = exec.getAveragePrice();
            double postPrice = marketData.getPriceAtTime(
                exec.getSymbol(),
                exec.getEndTime().plus(Duration.ofMinutes(5))
            );

            double tempImpact = Math.abs(executionPrice - prePrice) / prePrice;

            // Measure permanent impact
            double permImpact = Math.abs(postPrice - prePrice) / prePrice;

            // Decay rate (how fast impact dissipates)
            double decayRate = (tempImpact - permImpact) / tempImpact;

            measurements.add(ImpactMeasurement.builder()
                .execution(exec)
                .temporaryImpactBps(tempImpact * 10000)
                .permanentImpactBps(permImpact * 10000)
                .decayRate(decayRate)
                .participationRate(
                    exec.getQuantity() /
                    marketData.getVolumeDuring(exec.getSymbol(),
                        exec.getStartTime(), exec.getEndTime())
                )
                .build());
        }

        // Aggregate statistics
        return ImpactStudy.builder()
            .measurements(measurements)
            .avgTempImpactBps(
                measurements.stream()
                    .mapToDouble(ImpactMeasurement::getTemporaryImpactBps)
                    .average()
                    .orElse(0)
            )
            .avgPermImpactBps(
                measurements.stream()
                    .mapToDouble(ImpactMeasurement::getPermanentImpactBps)
                    .average()
                    .orElse(0)
            )
            .impactByVenue(groupByVenue(measurements))
            .impactBySize(groupBySize(measurements))
            .build();
    }
}`
        },
        {
          name: 'Performance Attribution',
          explanation: 'Decomposition of trading performance into venue selection, timing, sizing, and execution quality components. Identifies which routing decisions added or destroyed value.',
          codeExample: `// Performance Attribution Engine
public class PerformanceAttributionEngine {

    public AttributionReport attributePerformance(
        Order order,
        List<Fill> fills
    ) {
        double arrivalPrice = marketData.getPriceAtTime(
            order.getSymbol(),
            order.getSubmitTime()
        );

        // Decompose total performance
        double totalSlippage = calculateSlippage(
            fills.stream()
                .mapToDouble(f -> f.getPrice() * f.getQuantity())
                .sum() / order.getQuantity(),
            arrivalPrice,
            order.getSide()
        );

        // Venue selection effect
        double venueEffect = calculateVenueEffect(fills, arrivalPrice);

        // Timing effect
        double timingEffect = calculateTimingEffect(fills, arrivalPrice);

        // Sizing effect
        double sizingEffect = calculateSizingEffect(fills);

        // Execution quality effect
        double qualityEffect = totalSlippage - venueEffect -
                              timingEffect - sizingEffect;

        // Identify best/worst decisions
        Fill bestFill = fills.stream()
            .min(Comparator.comparing(f ->
                calculateFillSlippage(f, arrivalPrice, order.getSide())
            ))
            .orElse(null);

        Fill worstFill = fills.stream()
            .max(Comparator.comparing(f ->
                calculateFillSlippage(f, arrivalPrice, order.getSide())
            ))
            .orElse(null);

        return AttributionReport.builder()
            .totalSlippageBps(totalSlippage * 10000)
            .venueEffectBps(venueEffect * 10000)
            .timingEffectBps(timingEffect * 10000)
            .sizingEffectBps(sizingEffect * 10000)
            .qualityEffectBps(qualityEffect * 10000)
            .bestFill(bestFill)
            .worstFill(worstFill)
            .venueBreakdown(groupFillsByVenue(fills))
            .build();
    }
}`
        },
        {
          name: 'Regulatory Reporting',
          explanation: 'Automated generation of required regulatory reports including MiFID II transaction reports, CAT reporting, Form PF, and audit trails. 500+ reports generated daily.',
          codeExample: `// Regulatory Reporting Engine
public class RegulatoryReportingEngine {

    public void generateMiFIDIIReport(LocalDate date) {
        List<Execution> executions = executionRepository
            .getExecutionsForDate(date);

        List<MiFIDIITransaction> transactions = executions.stream()
            .map(this::convertToMiFIDII)
            .collect(Collectors.toList());

        // Generate XML report in ESMA format
        MiFIDIIReport report = MiFIDIIReport.builder()
            .reportingDate(date)
            .reportingFirm(FIRM_LEI)
            .transactions(transactions)
            .build();

        String xml = report.toXML();

        // Submit to regulatory authority
        regulatorySubmitter.submitMiFIDII(xml);

        // Archive for audit
        archiveReport("MiFIDII", date, xml);
    }

    private MiFIDIITransaction convertToMiFIDII(Execution exec) {
        return MiFIDIITransaction.builder()
            .tradingDateTime(exec.getTimestamp())
            .buyerLEI(exec.getBuyerLEI())
            .sellerLEI(exec.getSellerLEI())
            .instrumentISIN(exec.getISIN())
            .price(exec.getPrice())
            .quantity(exec.getQuantity())
            .currency(exec.getCurrency())
            .venue(exec.getVenueMIC())
            .tradingCapacity(exec.getCapacity())
            .liquidityProvision(exec.isLiquidityProvider())
            .build();
    }

    public void generateCATReport(LocalDate date) {
        // CAT (Consolidated Audit Trail) reporting
        List<Order> orders = orderRepository.getOrdersForDate(date);

        CATReport report = CATReport.builder()
            .reportDate(date)
            .firmDesignatedID(FIRM_CAT_ID)
            .orderEvents(orders.stream()
                .flatMap(o -> o.getLifecycleEvents().stream())
                .map(this::convertToCATEvent)
                .collect(Collectors.toList()))
            .build();

        // Submit in FINRA format
        regulatorySubmitter.submitCAT(report.toJSON());
    }
}`
        },
        {
          name: 'Custom Dashboards',
          explanation: 'Configurable real-time dashboards displaying execution metrics, cost analysis, fill rates, and venue performance. Web-based interface with drill-down capabilities.',
          codeExample: `// Dashboard Service
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/realtime-metrics")
    public RealtimeMetrics getRealtimeMetrics(
        @RequestParam String accountId
    ) {
        // Real-time aggregation
        return RealtimeMetrics.builder()
            .currentPositions(positionService.getPositions(accountId))
            .todayPnL(pnlService.getTodayPnL(accountId))
            .openOrders(orderService.getOpenOrders(accountId))
            .fillRate(calculateFillRate(accountId))
            .avgSlippage(calculateAvgSlippage(accountId))
            .topPerformers(getTopPerformers(accountId, 5))
            .topLosers(getTopLosers(accountId, 5))
            .riskMetrics(riskService.getCurrentRisk(accountId))
            .build();
    }

    @GetMapping("/execution-quality")
    public ExecutionQualityMetrics getExecutionQuality(
        @RequestParam String accountId,
        @RequestParam LocalDate startDate,
        @RequestParam LocalDate endDate
    ) {
        List<Execution> executions = executionRepository
            .getExecutions(accountId, startDate, endDate);

        return ExecutionQualityMetrics.builder()
            .totalExecutions(executions.size())
            .avgSlippageBps(calculateAvgSlippage(executions))
            .avgMarketImpactBps(calculateAvgImpact(executions))
            .fillRate(calculateFillRate(executions))
            .venueBreakdown(groupByVenue(executions))
            .strategyBreakdown(groupByStrategy(executions))
            .hourlyDistribution(groupByHour(executions))
            .costSavings(calculateCostSavings(executions))
            .build();
    }

    @GetMapping("/venue-performance")
    public List<VenuePerformance> getVenuePerformance(
        @RequestParam String accountId,
        @RequestParam int days
    ) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(days);

        return venueAnalytics.analyzeVenues(accountId, startDate, endDate);
    }
}`
        },
        {
          name: 'API Integration',
          explanation: 'RESTful APIs and FIX protocol interfaces for programmatic access to analytics data, historical executions, and real-time metrics. Supports integration with client systems.',
          codeExample: `// Analytics API
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsAPI {

    @GetMapping("/tca/{orderId}")
    public TCAReport getTCAReport(@PathVariable String orderId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new OrderNotFoundException(orderId));

        List<Fill> fills = fillRepository.findByOrderId(orderId);

        return tcaEngine.generateTCAReport(order, fills);
    }

    @PostMapping("/batch-tca")
    public List<TCAReport> getBatchTCA(
        @RequestBody List<String> orderIds
    ) {
        return orderIds.parallelStream()
            .map(this::getTCAReport)
            .collect(Collectors.toList());
    }

    @GetMapping("/performance-attribution/{orderId}")
    public AttributionReport getAttribution(
        @PathVariable String orderId
    ) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow();
        List<Fill> fills = fillRepository.findByOrderId(orderId);

        return attributionEngine.attributePerformance(order, fills);
    }

    @GetMapping("/market-impact-study")
    public ImpactStudy getImpactStudy(
        @RequestParam String accountId,
        @RequestParam LocalDate startDate,
        @RequestParam LocalDate endDate,
        @RequestParam(required = false) String symbol
    ) {
        List<Execution> executions = executionRepository
            .getExecutions(accountId, startDate, endDate);

        if (symbol != null) {
            executions = executions.stream()
                .filter(e -> e.getSymbol().equals(symbol))
                .collect(Collectors.toList());
        }

        return impactAnalyzer.analyzeImpact(executions);
    }

    @GetMapping("/historical-fills")
    public Page<Fill> getHistoricalFills(
        @RequestParam String accountId,
        @RequestParam(required = false) String symbol,
        @RequestParam(required = false) LocalDate startDate,
        @RequestParam(required = false) LocalDate endDate,
        Pageable pageable
    ) {
        return fillRepository.findFills(
            accountId,
            symbol,
            startDate,
            endDate,
            pageable
        );
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
      { name: 'My Projects', icon: '💼', page: 'Projects' },
      { name: 'Dark Pool Engine', icon: '🌊', page: 'DarkPoolMatchingEngine' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #475569 50%, #0f172a 100%)',
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
        <h1 style={titleStyle}>Dark Pool Matching Engine</h1>
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
          ← Back to Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={DARKPOOL_COLORS}
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
        primaryColor={DARKPOOL_COLORS.primary}
      />


      {/* Overview */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid rgba(100, 116, 139, 0.3)'
      }}>
        <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: 0, textAlign: 'center', fontSize: '1.1rem' }}>
          Advanced institutional trading platform providing anonymous execution with minimal market impact.
          Features sophisticated matching algorithms, deep liquidity aggregation, and enterprise-grade risk controls
          for large block trading with sub-microsecond latency.
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
              {concept.details.length} topics • Click to explore
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
              colors={DARKPOOL_COLORS}
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
                      border: '1px solid #334155',
                      display: 'flex',
                      justifyContent: 'center'
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

export default DarkPoolMatchingEngine

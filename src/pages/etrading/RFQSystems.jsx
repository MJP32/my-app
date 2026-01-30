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

// RFQ Workflow Diagram
const RFQWorkflowDiagram = () => (
  <svg viewBox="0 0 750 280" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="rfqArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="375" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RFQ Workflow - Request for Quote</text>
    {/* Client */}
    <rect x="30" y="60" width="100" height="180" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="80" y="90" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Client</text>
    {/* Platform */}
    <rect x="280" y="60" width="150" height="180" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="355" y="90" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">RFQ Platform</text>
    <text x="355" y="108" textAnchor="middle" fill="#a78bfa" fontSize="10">(Tradeweb/Bloomberg)</text>
    {/* Dealer */}
    <rect x="580" y="60" width="130" height="180" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="645" y="90" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Dealer</text>
    <text x="645" y="108" textAnchor="middle" fill="#4ade80" fontSize="10">(Auto-Quote)</text>
    {/* Step 1: RFQ */}
    <line x1="130" y1="130" x2="275" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#rfqArrow)"/>
    <text x="200" y="122" textAnchor="middle" fill="#fbbf24" fontSize="10">1. Send RFQ</text>
    {/* Step 2: Forward */}
    <line x1="430" y1="130" x2="575" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#rfqArrow)"/>
    <text x="500" y="122" textAnchor="middle" fill="#fbbf24" fontSize="10">2. Forward RFQ</text>
    {/* Step 3: Quote */}
    <line x1="575" y1="165" x2="430" y2="165" stroke="#22c55e" strokeWidth="2" markerEnd="url(#rfqArrow)"/>
    <text x="500" y="158" textAnchor="middle" fill="#4ade80" fontSize="10">3. Send Quote</text>
    {/* Step 4: Deliver */}
    <line x1="275" y1="165" x2="130" y2="165" stroke="#22c55e" strokeWidth="2" markerEnd="url(#rfqArrow)"/>
    <text x="200" y="158" textAnchor="middle" fill="#4ade80" fontSize="10">4. Deliver Quote</text>
    {/* Step 5: Accept */}
    <line x1="130" y1="200" x2="275" y2="200" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#rfqArrow)"/>
    <text x="200" y="192" textAnchor="middle" fill="#60a5fa" fontSize="10">5. Accept Quote</text>
    {/* Step 6: Trade */}
    <line x1="430" y1="200" x2="575" y2="200" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#rfqArrow)"/>
    <text x="500" y="192" textAnchor="middle" fill="#60a5fa" fontSize="10">6. Trade Confirm</text>
    {/* Timing */}
    <text x="375" y="265" textAnchor="middle" fill="#64748b" fontSize="11">Typical RFQ lifecycle: 5-30 seconds | Quote validity: 2-10 seconds</text>
  </svg>
)

// Auto-Quoting System Diagram
const AutoQuoteDiagram = () => (
  <svg viewBox="0 0 700 300" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="aqArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Auto-Quoting System Architecture</text>
    {/* Incoming RFQ */}
    <rect x="30" y="100" width="100" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="80" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Incoming</text>
    <text x="80" y="142" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">RFQ</text>
    {/* Quote Engine */}
    <rect x="180" y="60" width="160" height="140" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="260" y="90" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Quote Engine</text>
    <rect x="195" y="105" width="130" height="25" rx="4" fill="#22c55e"/>
    <text x="260" y="122" textAnchor="middle" fill="white" fontSize="9">Risk Check</text>
    <rect x="195" y="140" width="130" height="25" rx="4" fill="#22c55e"/>
    <text x="260" y="157" textAnchor="middle" fill="white" fontSize="9">Price Calculator</text>
    <rect x="195" y="175" width="130" height="15" rx="4" fill="rgba(34, 197, 94, 0.5)"/>
    <text x="260" y="186" textAnchor="middle" fill="white" fontSize="8">Spread Manager</text>
    {/* Market Data */}
    <rect x="400" y="50" width="120" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="460" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Market Data</text>
    <text x="460" y="88" textAnchor="middle" fill="#bfdbfe" fontSize="9">Real-time prices</text>
    {/* Position */}
    <rect x="400" y="115" width="120" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="460" y="137" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Position</text>
    <text x="460" y="153" textAnchor="middle" fill="#ddd6fe" fontSize="9">Inventory skew</text>
    {/* Config */}
    <rect x="400" y="180" width="120" height="50" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="460" y="202" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Risk Limits</text>
    <text x="460" y="218" textAnchor="middle" fill="#fecaca" fontSize="9">{`Size & notional`}</text>
    {/* Output */}
    <rect x="570" y="100" width="100" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="620" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Quote</text>
    <text x="620" y="142" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Response</text>
    {/* Arrows */}
    <line x1="130" y1="130" x2="175" y2="130" stroke="#4ade80" strokeWidth="2" markerEnd="url(#aqArrow)"/>
    <line x1="340" y1="130" x2="395" y2="75" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="340" y1="130" x2="395" y2="140" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="340" y1="130" x2="395" y2="205" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="340" y1="130" x2="565" y2="130" stroke="#4ade80" strokeWidth="2" markerEnd="url(#aqArrow)"/>
    {/* Latency */}
    <text x="350" y="275" textAnchor="middle" fill="#64748b" fontSize="11">{`Target latency: &lt;10ms from RFQ receipt to quote response`}</text>
  </svg>
)

// Pricing Components Diagram
const PricingComponentsDiagram = () => (
  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RFQ Price Components</text>
    {/* Base */}
    <rect x="50" y="60" width="100" height="120" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Base Price</text>
    <text x="100" y="115" textAnchor="middle" fill="#bfdbfe" fontSize="9">Mid from</text>
    <text x="100" y="130" textAnchor="middle" fill="#bfdbfe" fontSize="9">market data</text>
    <text x="100" y="160" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">$100.00</text>
    {/* Plus signs and spreads */}
    <text x="170" y="120" textAnchor="middle" fill="#4ade80" fontSize="24" fontWeight="bold">+</text>
    <rect x="200" y="60" width="100" height="120" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="250" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Base Spread</text>
    <text x="250" y="115" textAnchor="middle" fill="#bbf7d0" fontSize="9">Minimum</text>
    <text x="250" y="130" textAnchor="middle" fill="#bbf7d0" fontSize="9">profit margin</text>
    <text x="250" y="160" textAnchor="middle" fill="#86efac" fontSize="16" fontWeight="bold">+2 bps</text>
    <text x="320" y="120" textAnchor="middle" fill="#4ade80" fontSize="24" fontWeight="bold">+</text>
    <rect x="350" y="60" width="100" height="120" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Risk Skew</text>
    <text x="400" y="115" textAnchor="middle" fill="#fef3c7" fontSize="9">Position-based</text>
    <text x="400" y="130" textAnchor="middle" fill="#fef3c7" fontSize="9">adjustment</text>
    <text x="400" y="160" textAnchor="middle" fill="#fcd34d" fontSize="16" fontWeight="bold">+1 bp</text>
    <text x="470" y="120" textAnchor="middle" fill="#4ade80" fontSize="24" fontWeight="bold">+</text>
    <rect x="500" y="60" width="100" height="120" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="550" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Vol Adj</text>
    <text x="550" y="115" textAnchor="middle" fill="#ddd6fe" fontSize="9">Market</text>
    <text x="550" y="130" textAnchor="middle" fill="#ddd6fe" fontSize="9">conditions</text>
    <text x="550" y="160" textAnchor="middle" fill="#c4b5fd" fontSize="16" fontWeight="bold">+0.5 bp</text>
    {/* Result */}
    <text x="620" y="120" textAnchor="middle" fill="#4ade80" fontSize="24" fontWeight="bold">=</text>
    <rect x="640" y="80" width="50" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="665" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Ask</text>
    <text x="350" y="205" textAnchor="middle" fill="#64748b" fontSize="11">Final quote = Base + Spread + Skew + Volatility adjustment</text>
  </svg>
)

// RFQ Lifecycle Diagram
const RFQLifecycleDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RFQ State Machine</text>
    {['PENDING', 'QUOTED', 'ACCEPTED', 'EXECUTED'].map((state, i) => (
      <g key={i}>
        <rect x={50 + i * 160} y="50" width="120" height="40" rx="6" fill={['#f59e0b', '#3b82f6', '#22c55e', '#8b5cf6'][i]}/>
        <text x={110 + i * 160} y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{state}</text>
        {i < 3 && <line x1={170 + i * 160} y1="70" x2={205 + i * 160} y2="70" stroke="#4ade80" strokeWidth="2"/>}
      </g>
    ))}
    <rect x="290" y="110" width="120" height="35" rx="4" fill="#ef4444"/>
    <text x="350" y="132" textAnchor="middle" fill="white" fontSize="9">EXPIRED / REJECTED</text>
    <line x1="270" y1="90" x2="290" y2="110" stroke="#ef4444" strokeWidth="1.5"/>
  </svg>
)

// Auto-Quote Engine Diagram
const AutoQuoteEngineDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Auto-Quote Price Calculation</text>
    <rect x="50" y="50" width="100" height="45" rx="4" fill="#3b82f6"/>
    <text x="100" y="77" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Mid Price</text>
    <text x="160" y="75" fill="#4ade80" fontSize="16">+</text>
    <rect x="180" y="50" width="100" height="45" rx="4" fill="#22c55e"/>
    <text x="230" y="77" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Base Spread</text>
    <text x="290" y="75" fill="#4ade80" fontSize="16">×</text>
    <rect x="310" y="50" width="100" height="45" rx="4" fill="#f59e0b"/>
    <text x="360" y="77" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Client Tier</text>
    <text x="420" y="75" fill="#4ade80" fontSize="16">×</text>
    <rect x="440" y="50" width="100" height="45" rx="4" fill="#8b5cf6"/>
    <text x="490" y="77" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Size Adj</text>
    <text x="550" y="75" fill="#4ade80" fontSize="16">=</text>
    <rect x="570" y="50" width="100" height="45" rx="4" fill="#ef4444"/>
    <text x="620" y="77" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Quote</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="10">+ Inventory skew + Volatility adjustment</text>
    <text x="350" y="150" textAnchor="middle" fill="#64748b" fontSize="9">{`Target response: &lt;100ms`}</text>
  </svg>
)

// Quote Validity Diagram
const QuoteValidityDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Quote Validity & Firmness`}</text>
    <rect x="50" y="50" width="180" height="50" rx="6" fill="#22c55e"/>
    <text x="140" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">FIRM (30s)</text>
    <text x="140" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Must honor if accepted</text>
    <rect x="260" y="50" width="180" height="50" rx="6" fill="#f59e0b"/>
    <text x="350" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">INDICATIVE (60s)</text>
    <text x="350" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">May re-quote</text>
    <rect x="470" y="50" width="180" height="50" rx="6" fill="#8b5cf6"/>
    <text x="560" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SUBJECT (120s)</text>
    <text x="560" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">Subject to review</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="10">Validity reduced in volatile markets or for large sizes</text>
  </svg>
)

// Tradeweb Protocol Diagram
const TradewebProtocolDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Tradeweb FIX Message Flow</text>
    <rect x="50" y="50" width="120" height="100" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Client</text>
    <rect x="530" y="50" width="120" height="100" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Dealer</text>
    <line x1="170" y1="90" x2="525" y2="90" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="85" textAnchor="middle" fill="#fbbf24" fontSize="9">QuoteRequest (R) →</text>
    <line x1="525" y1="115" x2="170" y2="115" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="110" textAnchor="middle" fill="#4ade80" fontSize="9">← Quote (S)</text>
    <line x1="170" y1="140" x2="525" y2="140" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="135" textAnchor="middle" fill="#60a5fa" fontSize="9">ExecutionReport (8) →</text>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="9">Custom tags: 20001 (venue), 20002 (dealer count)</text>
  </svg>
)

// Bloomberg Integration Diagram
const BloombergIntegrationDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Bloomberg TOMS Integration</text>
    <rect x="50" y="50" width="140" height="50" rx="4" fill="#f59e0b"/>
    <text x="120" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Bloomberg Terminal</text>
    <rect x="230" y="50" width="140" height="50" rx="4" fill="#3b82f6"/>
    <text x="300" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">TOMS API</text>
    <rect x="410" y="50" width="140" height="50" rx="4" fill="#22c55e"/>
    <text x="480" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Quote Engine</text>
    <rect x="590" y="50" width="70" height="50" rx="4" fill="#8b5cf6"/>
    <text x="625" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Trade</text>
    <line x1="190" y1="75" x2="225" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="370" y1="75" x2="405" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="550" y1="75" x2="585" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">All-to-all trading | Portfolio trading support</text>
  </svg>
)

// Client Tiering Diagram
const ClientTieringDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Client Tiering & Spread Adjustment`}</text>
    <rect x="50" y="50" width="150" height="55" rx="4" fill="#22c55e"/>
    <text x="125" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Tier 1 (Platinum)</text>
    <text x="125" y="92" textAnchor="middle" fill="#bbf7d0" fontSize="8">0.8x spread multiplier</text>
    <rect x="220" y="50" width="150" height="55" rx="4" fill="#3b82f6"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Tier 2 (Gold)</text>
    <text x="295" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">1.0x spread multiplier</text>
    <rect x="390" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="465" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Tier 3 (Silver)</text>
    <text x="465" y="92" textAnchor="middle" fill="#fef3c7" fontSize="8">1.2x spread multiplier</text>
    <rect x="560" y="50" width="100" height="55" rx="4" fill="#64748b"/>
    <text x="610" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Standard</text>
    <text x="610" y="92" textAnchor="middle" fill="#cbd5e1" fontSize="8">1.5x multiplier</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Based on: Volume, relationship, credit quality</text>
  </svg>
)

// Competitive Quoting Diagram
const CompetitiveQuotingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Competitive RFQ - Multiple Dealers</text>
    <rect x="280" y="45" width="140" height="40" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Client RFQ</text>
    {['Dealer A', 'Dealer B', 'Dealer C', 'Dealer D'].map((dealer, i) => (
      <g key={i}>
        <rect x={50 + i * 160} y="110" width="130" height="35" rx="4" fill={i === 1 ? '#22c55e' : '#64748b'}/>
        <text x={115 + i * 160} y="132" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{dealer}: {i === 1 ? '99.52 ★' : `99.${50 + i}`}</text>
        <line x1="350" y1="85" x2={115 + i * 160} y2="108" stroke={i === 1 ? '#22c55e' : '#475569'} strokeWidth="1.5"/>
      </g>
    ))}
    <text x="350" y="165" textAnchor="middle" fill="#4ade80" fontSize="9">Best price wins - Response time critical</text>
  </svg>
)

// Disclosed vs Anonymous Diagram
const DisclosedAnonDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Disclosed vs Anonymous RFQ</text>
    <rect x="50" y="50" width="280" height="80" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="190" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">DISCLOSED</text>
    <text x="190" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Client: "ABC Asset Mgmt"</text>
    <text x="190" y="115" textAnchor="middle" fill="#86efac" fontSize="8">Relationship pricing • Tighter spreads</text>
    <rect x="370" y="50" width="280" height="80" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="510" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">ANONYMOUS</text>
    <text x="510" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Client: "Unknown"</text>
    <text x="510" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="8">Pure price competition • Wider spreads</text>
    <text x="350" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Anonymity premium: ~5% wider spreads for unknown counterparties</text>
  </svg>
)

// Bloomberg TSOX Diagram
const BloombergTSOXDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Bloomberg TSOX Architecture</text>
    <rect x="50" y="50" width="120" height="50" rx="4" fill="#f59e0b"/>
    <text x="110" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Bloomberg Terminal</text>
    <rect x="200" y="50" width="100" height="50" rx="4" fill="#3b82f6"/>
    <text x="250" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">TSOX Gateway</text>
    <rect x="330" y="50" width="100" height="50" rx="4" fill="#8b5cf6"/>
    <text x="380" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">RFQ Handler</text>
    <rect x="460" y="50" width="100" height="50" rx="4" fill="#22c55e"/>
    <text x="510" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Quote Engine</text>
    <rect x="590" y="50" width="70" height="50" rx="4" fill="#ef4444"/>
    <text x="625" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Trade</text>
    <line x1="170" y1="75" x2="195" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="300" y1="75" x2="325" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="430" y1="75" x2="455" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="560" y1="75" x2="585" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Events: RFQ_NEW, RFQ_CANCEL, QUOTE_ACCEPTED, QUOTE_REJECTED</text>
  </svg>
)

// EMSX Integration Diagram
const EMSXDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Bloomberg EMSX Order Flow</text>
    <rect x="50" y="50" width="120" height="50" rx="4" fill="#3b82f6"/>
    <text x="110" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Buy-side Client</text>
    <rect x="200" y="50" width="100" height="50" rx="4" fill="#f59e0b"/>
    <text x="250" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">EMSX</text>
    <rect x="330" y="50" width="100" height="50" rx="4" fill="#8b5cf6"/>
    <text x="380" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Order Router</text>
    <rect x="460" y="50" width="100" height="50" rx="4" fill="#22c55e"/>
    <text x="510" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Dealer EMS</text>
    <rect x="590" y="50" width="70" height="50" rx="4" fill="#ef4444"/>
    <text x="625" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Fill</text>
    <line x1="170" y1="75" x2="195" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="300" y1="75" x2="325" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="430" y1="75" x2="455" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="560" y1="75" x2="585" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">STP: Order → Route → Execute → Confirm → Allocate</text>
  </svg>
)

// Market Data Integration Diagram
const MarketDataDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Bloomberg Market Data (B-PIPE)</text>
    <rect x="50" y="50" width="150" height="50" rx="4" fill="#f59e0b"/>
    <text x="125" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Real-time Prices</text>
    <text x="125" y="88" textAnchor="middle" fill="#fef3c7" fontSize="8">BID/ASK/LAST</text>
    <rect x="220" y="50" width="150" height="50" rx="4" fill="#3b82f6"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Reference Data</text>
    <text x="295" y="88" textAnchor="middle" fill="#bfdbfe" fontSize="8">Security Master</text>
    <rect x="390" y="50" width="150" height="50" rx="4" fill="#8b5cf6"/>
    <text x="465" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Historical Data</text>
    <text x="465" y="88" textAnchor="middle" fill="#ddd6fe" fontSize="8">Analytics/Backtest</text>
    <rect x="560" y="50" width="100" height="50" rx="4" fill="#22c55e"/>
    <text x="610" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Quote Engine</text>
    <text x="610" y="88" textAnchor="middle" fill="#bbf7d0" fontSize="8">Pricing</text>
    <line x1="200" y1="75" x2="215" y2="75" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="370" y1="75" x2="385" y2="75" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="540" y1="75" x2="555" y2="75" stroke="#4ade80" strokeWidth="1.5"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Subscription: LAST_PRICE, BID, ASK, BID_SIZE, ASK_SIZE, VOLUME</text>
  </svg>
)

// Spread Calculation Diagram
const SpreadCalcDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Spread Calculation Components</text>
    <rect x="30" y="50" width="100" height="60" rx="4" fill="#3b82f6"/>
    <text x="80" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Base Spread</text>
    <text x="80" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="8">Liquidity</text>
    <text x="140" y="80" fill="#4ade80" fontSize="14">×</text>
    <rect x="160" y="50" width="100" height="60" rx="4" fill="#22c55e"/>
    <text x="210" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Size Adj</text>
    <text x="210" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="8">√(Q/ADV)</text>
    <text x="270" y="80" fill="#4ade80" fontSize="14">×</text>
    <rect x="290" y="50" width="100" height="60" rx="4" fill="#f59e0b"/>
    <text x="340" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Vol Adj</text>
    <text x="340" y="95" textAnchor="middle" fill="#fef3c7" fontSize="8">σ ratio</text>
    <text x="400" y="80" fill="#4ade80" fontSize="14">×</text>
    <rect x="420" y="50" width="100" height="60" rx="4" fill="#8b5cf6"/>
    <text x="470" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Time Adj</text>
    <text x="470" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="8">Open/Close</text>
    <text x="530" y="80" fill="#4ade80" fontSize="14">×</text>
    <rect x="550" y="50" width="100" height="60" rx="4" fill="#ec4899"/>
    <text x="600" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Client Tier</text>
    <text x="600" y="95" textAnchor="middle" fill="#fbcfe8" fontSize="8">0.8x-1.5x</text>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="9">Final Spread = Base × Size × Vol × Time × Client</text>
  </svg>
)

// Market Impact Diagram
const MarketImpactDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Market Impact Model (Square Root)</text>
    <rect x="50" y="50" width="200" height="70" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Impact = σ × √(Q/ADV)</text>
    <text x="150" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">σ = volatility, Q = quantity</text>
    <rect x="280" y="50" width="200" height="70" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="380" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Almgren-Chriss</text>
    <text x="380" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Permanent + Temporary</text>
    <rect x="510" y="50" width="150" height="70" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="585" y="75" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Spread Adjust</text>
    <text x="585" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">+2× impact cost</text>
    <line x1="250" y1="85" x2="275" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="480" y1="85" x2="505" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Large orders move markets - adjust spread to cover hedging cost</text>
  </svg>
)

// Inventory Skew Diagram
const InventorySkewDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Inventory Skewing Strategy</text>
    <rect x="50" y="50" width="200" height="70" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="150" y="72" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">LONG Position</text>
    <text x="150" y="92" textAnchor="middle" fill="#94a3b8" fontSize="8">Lower Bid (don't want more)</text>
    <text x="150" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">Higher Ask (want to sell)</text>
    <rect x="280" y="50" width="140" height="70" rx="6" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">FLAT</text>
    <text x="350" y="92" textAnchor="middle" fill="#64748b" fontSize="8">Symmetric pricing</text>
    <text x="350" y="108" textAnchor="middle" fill="#64748b" fontSize="8">No skew</text>
    <rect x="450" y="50" width="200" height="70" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="550" y="72" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">SHORT Position</text>
    <text x="550" y="92" textAnchor="middle" fill="#94a3b8" fontSize="8">Higher Bid (want to buy)</text>
    <text x="550" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">Lower Ask (don't want more)</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Max skew = 50% of spread | Skew factor = Position / Max Position</text>
  </svg>
)

// Critical Path Diagram
const CriticalPathDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RFQ Critical Path Analysis</text>
    {[
      { label: 'RFQ In', time: '0μs', color: '#3b82f6' },
      { label: 'Cache Lookup', time: '1μs', color: '#22c55e' },
      { label: 'Market Data', time: '5μs', color: '#f59e0b' },
      { label: 'Risk Check', time: '10μs', color: '#8b5cf6' },
      { label: 'Price Calc', time: '15μs', color: '#ec4899' },
      { label: 'Quote Out', time: '20μs', color: '#ef4444' }
    ].map((step, i) => (
      <g key={i}>
        <rect x={35 + i * 110} y="50" width="95" height="45" rx="4" fill={step.color}/>
        <text x={82 + i * 110} y="72" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">{step.label}</text>
        <text x={82 + i * 110} y="88" textAnchor="middle" fill="white" fontSize="7">{step.time}</text>
        {i < 5 && <line x1={130 + i * 110} y1="72" x2={145 + i * 110} y2="72" stroke="#4ade80" strokeWidth="2"/>}
      </g>
    ))}
    <text x="350" y="125" textAnchor="middle" fill="#4ade80" fontSize="10">{`Target: &lt;50ms liquid | &lt;100ms complex`}</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Bottlenecks: DB queries, network hops, complex calculations</text>
  </svg>
)

// Caching Strategy Diagram
const CachingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">High-Performance Cache Architecture</text>
    <rect x="50" y="50" width="140" height="55" rx="4" fill="#22c55e"/>
    <text x="120" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">L1: In-Memory</text>
    <text x="120" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">&lt;1μs • Lock-free</text>
    <rect x="210" y="50" width="140" height="55" rx="4" fill="#3b82f6"/>
    <text x="280" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">L2: Caffeine</text>
    <text x="280" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">&lt;100μs • TTL-based</text>
    <rect x="370" y="50" width="140" height="55" rx="4" fill="#f59e0b"/>
    <text x="440" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">L3: Redis</text>
    <text x="440" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">&lt;1ms • Distributed</text>
    <rect x="530" y="50" width="130" height="55" rx="4" fill="#64748b"/>
    <text x="595" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Source: DB</text>
    <text x="595" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="8">&lt;10ms • Refresh</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Pre-compute: Spreads, client tiers, instrument profiles</text>
    <text x="350" y="148" textAnchor="middle" fill="#64748b" fontSize="8">Warm on startup • Periodic refresh • Lock-free reads</text>
  </svg>
)

// Async Processing Diagram
const AsyncDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Async Processing - Off Critical Path</text>
    <rect x="50" y="50" width="180" height="55" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">CRITICAL PATH</text>
    <text x="140" y="90" textAnchor="middle" fill="#86efac" fontSize="8">RFQ → Quote (sync)</text>
    <rect x="260" y="50" width="180" height="55" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">{`FIRE & FORGET`}</text>
    <text x="350" y="90" textAnchor="middle" fill="#fcd34d" fontSize="8">Logging, Metrics (async)</text>
    <rect x="470" y="50" width="180" height="55" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">BATCH WRITE</text>
    <text x="560" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="8">Audit, Analytics (batch)</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">LMAX Disruptor: RingBuffer for high-throughput event processing</text>
    <text x="350" y="148" textAnchor="middle" fill="#64748b" fontSize="8">Dedicated pricing threads • MAX_PRIORITY • Object pooling to avoid GC</text>
  </svg>
)

function RFQSystems({ onBack, onGoToETrading, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'rfq-workflow',
      name: 'RFQ Workflow',
      icon: '🔄',
      color: '#22c55e',
      description: 'End-to-end Request-for-Quote workflow from client request to trade execution',
      diagram: RFQWorkflowDiagram,
      details: [
        {
          name: 'RFQ Lifecycle',
          diagram: RFQLifecycleDiagram,
          explanation: 'An RFQ starts when a client requests a price for a specific instrument and size. The dealer receives the request, calculates a competitive price based on market conditions, inventory, and risk, then responds with a quote. The client can accept, reject, or let the quote expire. Upon acceptance, the trade is executed and booked.',
          codeExample: `// RFQ State Machine
public enum RFQState {
    PENDING,      // Awaiting dealer response
    QUOTED,       // Price sent to client
    ACCEPTED,     // Client accepted quote
    REJECTED,     // Client rejected quote
    EXPIRED,      // Quote timed out
    EXECUTED,     // Trade completed
    CANCELLED     // RFQ cancelled
}

public class RFQ {
    private String rfqId;
    private String clientId;
    private String instrument;  // e.g., "UST 10Y", "EUR/USD IRS 5Y"
    private BigDecimal quantity;
    private Side side;          // BUY or SELL
    private RFQState state;
    private Instant requestTime;
    private Instant quoteExpiry;
    private BigDecimal quotedPrice;
    private BigDecimal quotedSpread;

    public void transitionTo(RFQState newState) {
        validateTransition(this.state, newState);
        this.state = newState;
        publishStateChange(this);
    }

    private void validateTransition(RFQState from, RFQState to) {
        // Enforce valid state transitions
        Set<RFQState> validTransitions = STATE_MACHINE.get(from);
        if (!validTransitions.contains(to)) {
            throw new InvalidStateTransitionException(from, to);
        }
    }
}`
        },
        {
          name: 'Auto-Quoting Engine',
          diagram: AutoQuoteEngineDiagram,
          explanation: 'Automated systems that calculate and respond to RFQs without manual intervention. The engine considers mid-market price, bid-ask spread, client tier, trade size, current inventory position, and market volatility. Response times under 100ms are critical for competitive quoting.',
          codeExample: `// Auto-Quote Engine
@Service
public class AutoQuoteEngine {
    private final MarketDataService marketData;
    private final RiskService riskService;
    private final ClientTierService clientTiers;
    private final InventoryService inventory;

    public Quote generateQuote(RFQ rfq) {
        // Get current market mid price
        double midPrice = marketData.getMidPrice(rfq.getInstrument());

        // Calculate base spread based on instrument liquidity
        double baseSpread = calculateBaseSpread(rfq.getInstrument());

        // Adjust spread based on factors
        double adjustedSpread = baseSpread;

        // 1. Client tier adjustment (better clients get tighter spreads)
        ClientTier tier = clientTiers.getTier(rfq.getClientId());
        adjustedSpread *= tier.getSpreadMultiplier();  // e.g., 0.8 for top tier

        // 2. Size adjustment (larger sizes = wider spreads)
        adjustedSpread *= getSizeAdjustment(rfq.getQuantity(), rfq.getInstrument());

        // 3. Inventory skew (encourage trades that reduce position)
        double inventoryPosition = inventory.getPosition(rfq.getInstrument());
        if (wouldReducePosition(rfq, inventoryPosition)) {
            adjustedSpread *= 0.95;  // Tighter spread to encourage
        }

        // 4. Volatility adjustment
        double volatility = marketData.getImpliedVol(rfq.getInstrument());
        adjustedSpread *= (1 + volatility * 0.1);

        // Calculate bid/ask
        double bidPrice = midPrice - (adjustedSpread / 2);
        double askPrice = midPrice + (adjustedSpread / 2);

        return Quote.builder()
            .rfqId(rfq.getRfqId())
            .bidPrice(bidPrice)
            .askPrice(askPrice)
            .validFor(Duration.ofSeconds(30))
            .build();
    }
}`
        },
        {
          name: 'Quote Validity & Expiry',
          diagram: QuoteValidityDiagram,
          explanation: 'Quotes have limited validity periods (typically 10-60 seconds) to manage market risk. The dealer must honor the quoted price if the client accepts within the validity window. Expired quotes require re-quoting at current market prices. Firmness levels (firm vs indicative) affect client expectations.',
          codeExample: `// Quote Validity Management
@Service
public class QuoteValidityManager {
    private final ConcurrentMap<String, Quote> activeQuotes = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler;

    public Quote createQuote(RFQ rfq, double bid, double ask, QuoteFirmness firmness) {
        // Calculate validity based on market conditions
        Duration validity = calculateValidity(rfq, firmness);

        Quote quote = Quote.builder()
            .quoteId(generateQuoteId())
            .rfqId(rfq.getRfqId())
            .bid(bid)
            .ask(ask)
            .firmness(firmness)
            .createdAt(Instant.now())
            .expiresAt(Instant.now().plus(validity))
            .status(QuoteStatus.ACTIVE)
            .build();

        // Store and schedule expiry
        activeQuotes.put(quote.getQuoteId(), quote);
        scheduleExpiry(quote);

        return quote;
    }

    private Duration calculateValidity(RFQ rfq, QuoteFirmness firmness) {
        // Base validity by firmness level
        Duration base = switch (firmness) {
            case FIRM -> Duration.ofSeconds(30);      // Must honor if accepted
            case INDICATIVE -> Duration.ofSeconds(60);// May re-quote
            case SUBJECT -> Duration.ofSeconds(120);  // Subject to review
        };

        // Adjust for volatility
        double vol = marketData.getVolatility(rfq.getInstrument());
        if (vol > VOLATILITY_THRESHOLD) {
            base = base.dividedBy(2);  // Shorter validity in volatile markets
        }

        // Adjust for size
        if (rfq.getQuantity() > LARGE_SIZE_THRESHOLD) {
            base = base.multipliedBy(3).dividedBy(4);  // 75% for large sizes
        }

        return base;
    }

    public boolean acceptQuote(String quoteId) {
        Quote quote = activeQuotes.get(quoteId);

        if (quote == null) {
            throw new QuoteNotFoundException(quoteId);
        }

        if (Instant.now().isAfter(quote.getExpiresAt())) {
            quote.setStatus(QuoteStatus.EXPIRED);
            return false;  // Quote expired
        }

        // Lock quote for execution
        quote.setStatus(QuoteStatus.ACCEPTED);
        return true;
    }

    private void scheduleExpiry(Quote quote) {
        long delayMs = Duration.between(Instant.now(), quote.getExpiresAt()).toMillis();
        scheduler.schedule(() -> expireQuote(quote.getQuoteId()), delayMs, TimeUnit.MILLISECONDS);
    }
}`
        }
      ]
    },
    {
      id: 'tradeweb',
      name: 'Tradeweb Integration',
      icon: '🌐',
      color: '#3b82f6',
      description: 'Connecting to Tradeweb for electronic RFQ trading in fixed income and derivatives',
      diagram: AutoQuoteDiagram,
      details: [
        {
          name: 'Tradeweb Protocol',
          diagram: TradewebProtocolDiagram,
          explanation: 'Tradeweb uses FIX protocol for RFQ communication. Dealers connect via FIX sessions to receive RFQs and send quotes. Message types include QuoteRequest (R), Quote (S), and ExecutionReport (8). Tradeweb supports multiple products: US Treasuries, Credit, Rates Swaps, and ETFs.',
          codeExample: `// Tradeweb FIX Integration
public class TradewebConnector {
    private final Session fixSession;
    private final QuoteEngine quoteEngine;

    // Handle incoming RFQ from Tradeweb
    public void onQuoteRequest(QuoteRequest request) {
        // Parse Tradeweb-specific fields
        String rfqId = request.getString(QuoteReqID);      // Tag 131
        String symbol = request.getString(Symbol);          // Tag 55
        double quantity = request.getDouble(OrderQty);      // Tag 38
        char side = request.getChar(Side);                  // Tag 54
        String clientId = request.getString(Account);       // Tag 1

        // Additional Tradeweb fields
        String venue = request.getString(20001);  // Custom tag for venue
        int numDealers = request.getInt(20002);   // Number of dealers in competition

        // Generate quote
        Quote quote = quoteEngine.generateQuote(
            rfqId, symbol, quantity, side, clientId
        );

        // Send quote response
        Message quoteMsg = new Message();
        quoteMsg.getHeader().setField(new MsgType(MsgType.QUOTE));
        quoteMsg.setField(new QuoteReqID(rfqId));
        quoteMsg.setField(new QuoteID(generateQuoteId()));
        quoteMsg.setField(new BidPx(quote.getBidPrice()));
        quoteMsg.setField(new OfferPx(quote.getAskPrice()));
        quoteMsg.setField(new ValidUntilTime(quote.getExpiry()));

        fixSession.send(quoteMsg);
    }

    // Handle trade execution notification
    public void onExecutionReport(ExecutionReport report) {
        if (report.getExecType() == ExecType.FILL) {
            // Our quote was accepted
            String rfqId = report.getString(QuoteReqID);
            double fillPrice = report.getDouble(LastPx);
            double fillQty = report.getDouble(LastQty);

            // Book the trade
            tradeService.bookTrade(rfqId, fillPrice, fillQty);

            // Trigger auto-hedge if configured
            hedgeService.hedgePosition(rfqId);
        }
    }
}`
        },
        {
          name: 'Competitive Quoting',
          diagram: CompetitiveQuotingDiagram,
          explanation: 'In competitive RFQs, multiple dealers quote simultaneously. Clients see all quotes and select the best price. Response time is critical - slow quotes may not be considered. Quote quality metrics (win rate, response time) affect dealer rankings and future RFQ flow.',
          codeExample: `// Competitive Quoting Strategy
@Service
public class CompetitiveQuotingService {
    private final QuoteMetricsService metricsService;
    private final CompetitorAnalyzer competitorAnalyzer;

    public CompetitiveQuote generateCompetitiveQuote(RFQ rfq, int numDealers) {
        // Get base quote
        Quote baseQuote = quoteEngine.generateQuote(rfq);

        // Adjust for competition level
        double competitiveAdjustment = calculateCompetitiveAdjustment(
            rfq, numDealers
        );

        // Tighten spread when more competition
        double adjustedSpread = baseQuote.getSpread() * competitiveAdjustment;

        // Get historical win rates for similar trades
        QuoteMetrics metrics = metricsService.getMetrics(
            rfq.getInstrument(), rfq.getClientId()
        );

        // If we're losing too many, be more aggressive
        if (metrics.getWinRate() < TARGET_WIN_RATE) {
            adjustedSpread *= 0.95;  // 5% tighter
        }

        // Analyze competitor behavior if available
        CompetitorProfile competitor = competitorAnalyzer.analyze(
            rfq.getInstrument(), rfq.getClientId()
        );
        if (competitor != null && competitor.hasPatterns()) {
            // Adjust to beat expected competitor spread
            adjustedSpread = Math.min(adjustedSpread,
                competitor.getExpectedSpread() * 0.98);
        }

        return CompetitiveQuote.builder()
            .baseQuote(baseQuote)
            .adjustedSpread(adjustedSpread)
            .competitionLevel(numDealers)
            .expectedWinProbability(calculateWinProbability(adjustedSpread, numDealers))
            .build();
    }

    private double calculateCompetitiveAdjustment(RFQ rfq, int numDealers) {
        // More dealers = tighter spreads needed to win
        return switch (numDealers) {
            case 1 -> 1.0;     // No competition
            case 2 -> 0.95;    // Some competition
            case 3 -> 0.90;    // Moderate competition
            case 4 -> 0.85;    // High competition
            default -> 0.80;   // Very high competition
        };
    }

    // Track quote outcomes for learning
    public void recordOutcome(String quoteId, QuoteOutcome outcome) {
        metricsService.recordOutcome(quoteId, outcome);

        // Update competitor model if we lost
        if (outcome == QuoteOutcome.LOST) {
            competitorAnalyzer.recordLoss(quoteId);
        }
    }
}`
        },
        {
          name: 'Disclosed vs Anonymous',
          diagram: DisclosedAnonDiagram,
          explanation: 'Disclosed RFQs reveal client identity to dealers, enabling relationship-based pricing. Anonymous RFQs hide client identity, creating pure price competition. Different trading protocols suit different market conditions and client preferences.',
          codeExample: `// Disclosed vs Anonymous RFQ Handling
@Service
public class RFQPricingStrategy {
    private final ClientTierService clientTierService;
    private final RelationshipService relationshipService;

    public Quote priceRFQ(RFQ rfq) {
        if (rfq.isDisclosed()) {
            return priceDisclosedRFQ(rfq);
        } else {
            return priceAnonymousRFQ(rfq);
        }
    }

    private Quote priceDisclosedRFQ(RFQ rfq) {
        // Client identity known - use relationship pricing
        String clientId = rfq.getClientId();

        // Get client tier (Platinum, Gold, Silver, Bronze)
        ClientTier tier = clientTierService.getTier(clientId);

        // Get relationship metrics
        RelationshipMetrics metrics = relationshipService.getMetrics(clientId);

        // Base spread adjusted for relationship
        double baseSpread = getInstrumentSpread(rfq.getInstrument());
        double tierMultiplier = tier.getSpreadMultiplier();  // 0.8 for Platinum

        // Additional relationship adjustments
        double relationshipAdjustment = 1.0;
        if (metrics.getTotalVolume() > VOLUME_THRESHOLD) {
            relationshipAdjustment *= 0.95;  // Volume discount
        }
        if (metrics.getLastTradeAge().toDays() < 7) {
            relationshipAdjustment *= 0.98;  // Recent activity bonus
        }

        double finalSpread = baseSpread * tierMultiplier * relationshipAdjustment;

        return generateQuoteWithSpread(rfq, finalSpread);
    }

    private Quote priceAnonymousRFQ(RFQ rfq) {
        // Client identity unknown - use pure market pricing
        double baseSpread = getInstrumentSpread(rfq.getInstrument());

        // Apply size penalty (can't assess client risk)
        double sizeMultiplier = calculateSizeMultiplier(rfq.getQuantity());

        // Apply anonymity premium (unknown counterparty risk)
        double anonymityPremium = 1.05;  // 5% wider for anonymous

        // More conservative inventory skew (can't assess client behavior)
        double conservativeSkew = calculateConservativeSkew(rfq.getInstrument());

        double finalSpread = baseSpread * sizeMultiplier * anonymityPremium;

        return generateQuoteWithSpread(rfq, finalSpread, conservativeSkew);
    }
}`
        }
      ]
    },
    {
      id: 'bloomberg',
      name: 'Bloomberg Integration',
      icon: '📺',
      color: '#f97316',
      description: 'Bloomberg TSOX and TOMS integration for electronic trading',
      details: [
        {
          name: 'Bloomberg TSOX',
          diagram: BloombergTSOXDiagram,
          explanation: 'Trade Order Management Solutions (TOMS) and Trade Execution (TSOX) APIs enable electronic trading via Bloomberg Terminal. TSOX handles RFQ workflows for fixed income, providing connectivity to buy-side clients using Bloomberg for execution.',
          codeExample: `// Bloomberg TSOX Integration
public class BloombergTSOXHandler {
    private final BlpSession session;
    private final QuoteEngine quoteEngine;

    @PostConstruct
    public void initialize() {
        // Subscribe to RFQ events
        session.subscribe("//blp/rfq", this::handleRFQEvent);
    }

    private void handleRFQEvent(Event event) {
        for (Message msg : event.messages()) {
            String eventType = msg.getElementAsString("EVENT_TYPE");

            switch (eventType) {
                case "RFQ_NEW":
                    handleNewRFQ(msg);
                    break;
                case "RFQ_CANCEL":
                    handleRFQCancel(msg);
                    break;
                case "QUOTE_ACCEPTED":
                    handleQuoteAccepted(msg);
                    break;
                case "QUOTE_REJECTED":
                    handleQuoteRejected(msg);
                    break;
            }
        }
    }

    private void handleNewRFQ(Message msg) {
        // Extract RFQ details
        String rfqId = msg.getElementAsString("RFQ_ID");
        String security = msg.getElementAsString("SECURITY");
        double size = msg.getElementAsFloat64("SIZE");
        String side = msg.getElementAsString("SIDE");

        // Generate and send quote
        Quote quote = quoteEngine.generateQuote(security, size, side);

        Request quoteRequest = session.createRequest("//blp/rfq/quote");
        quoteRequest.set("RFQ_ID", rfqId);
        quoteRequest.set("BID_PRICE", quote.getBidPrice());
        quoteRequest.set("ASK_PRICE", quote.getAskPrice());
        quoteRequest.set("VALID_UNTIL", quote.getExpiry().toString());

        session.sendRequest(quoteRequest);
    }
}`
        },
        {
          name: 'EMSX Integration',
          diagram: EMSXDiagram,
          explanation: 'Execution Management System (EMSX) provides order routing and execution services. Dealers receive orders from clients using EMSX, enabling straight-through processing. API supports real-time order status updates and fill notifications.',
          codeExample: `// Bloomberg EMSX Integration
public class EMSXConnector {
    private final BlpSession session;
    private final OrderService orderService;

    @PostConstruct
    public void initialize() {
        // Subscribe to order events
        session.subscribe("//blp/emsx/order", this::handleOrderEvent);
        session.subscribe("//blp/emsx/route", this::handleRouteEvent);
    }

    private void handleOrderEvent(Event event) {
        for (Message msg : event.messages()) {
            int eventStatus = msg.getElementAsInt32("EVENT_STATUS");

            if (eventStatus == 4) {  // New order
                processNewOrder(msg);
            } else if (eventStatus == 11) {  // Order update
                processOrderUpdate(msg);
            }
        }
    }

    private void processNewOrder(Message msg) {
        EMSXOrder order = EMSXOrder.builder()
            .sequenceNumber(msg.getElementAsInt32("EMSX_SEQUENCE"))
            .ticker(msg.getElementAsString("EMSX_TICKER"))
            .side(msg.getElementAsString("EMSX_SIDE"))
            .amount(msg.getElementAsInt32("EMSX_AMOUNT"))
            .orderType(msg.getElementAsString("EMSX_ORDER_TYPE"))
            .limitPrice(msg.hasElement("EMSX_LIMIT_PRICE")
                ? msg.getElementAsFloat64("EMSX_LIMIT_PRICE") : null)
            .build();

        // Process and acknowledge
        orderService.processOrder(order);
    }

    // Route an order for execution
    public void routeOrder(int sequenceNumber, String broker, double amount) {
        Request routeRequest = session.createRequest("//blp/emsx/routeEx");
        routeRequest.set("EMSX_SEQUENCE", sequenceNumber);
        routeRequest.set("EMSX_BROKER", broker);
        routeRequest.set("EMSX_AMOUNT", (int) amount);
        routeRequest.set("EMSX_ORDER_TYPE", "MKT");

        session.sendRequest(routeRequest, this::handleRouteResponse);
    }

    // Send fill notification back to client
    public void sendFillNotification(int sequenceNumber, double fillQty, double fillPrice) {
        Request modifyRequest = session.createRequest("//blp/emsx/modifyRouteEx");
        modifyRequest.set("EMSX_SEQUENCE", sequenceNumber);
        modifyRequest.set("EMSX_FILLED", fillQty);
        modifyRequest.set("EMSX_AVG_PRICE", fillPrice);

        session.sendRequest(modifyRequest);
    }
}`
        },
        {
          name: 'Market Data Integration',
          diagram: MarketDataDiagram,
          explanation: 'Bloomberg provides real-time market data via B-PIPE for pricing. Reference data (security master) from Bloomberg ensures consistent instrument identification. Historical data supports analytics and back-testing of pricing models.',
          codeExample: `// Bloomberg Market Data Integration
@Service
public class BloombergMarketDataService {
    private final BlpSession session;
    private final ConcurrentMap<String, PriceData> priceCache = new ConcurrentHashMap<>();

    @PostConstruct
    public void subscribeToMarketData(List<String> securities) {
        SubscriptionList subscriptions = new SubscriptionList();

        for (String security : securities) {
            subscriptions.add(new Subscription(
                security,
                "LAST_PRICE,BID,ASK,BID_SIZE,ASK_SIZE,VOLUME",
                "",
                new CorrelationID(security)
            ));
        }

        session.subscribe(subscriptions);
    }

    // Handle real-time market data updates
    public void processMarketDataEvent(Event event) {
        for (Message msg : event.messages()) {
            String security = msg.correlationID().toString();

            PriceData priceData = priceCache.computeIfAbsent(
                security, k -> new PriceData(k)
            );

            // Update price fields
            if (msg.hasElement("LAST_PRICE")) {
                priceData.setLast(msg.getElementAsFloat64("LAST_PRICE"));
            }
            if (msg.hasElement("BID")) {
                priceData.setBid(msg.getElementAsFloat64("BID"));
            }
            if (msg.hasElement("ASK")) {
                priceData.setAsk(msg.getElementAsFloat64("ASK"));
            }

            priceData.setTimestamp(Instant.now());
        }
    }

    // Request reference data
    public SecurityInfo getReferenceData(String security) {
        Request request = session.createRequest("//blp/refdata/ReferenceDataRequest");
        request.append("securities", security);
        request.append("fields", "ID_ISIN");
        request.append("fields", "TICKER");
        request.append("fields", "CRNCY");
        request.append("fields", "MATURITY");
        request.append("fields", "COUPON");

        Message response = session.sendRequest(request).get();

        Element securityData = response.getElement("securityData")
            .getValueAsElement(0);

        return SecurityInfo.builder()
            .bloomberg(security)
            .isin(securityData.getElementAsString("ID_ISIN"))
            .ticker(securityData.getElementAsString("TICKER"))
            .currency(securityData.getElementAsString("CRNCY"))
            .build();
    }

    public double getMid(String security) {
        PriceData data = priceCache.get(security);
        if (data == null) return Double.NaN;
        return (data.getBid() + data.getAsk()) / 2.0;
    }
}`
        }
      ]
    },
    {
      id: 'pricing-models',
      name: 'Pricing Models',
      icon: '📈',
      color: '#8b5cf6',
      description: 'Quantitative models for calculating competitive quotes',
      diagram: PricingComponentsDiagram,
      details: [
        {
          name: 'Spread Calculation',
          diagram: SpreadCalcDiagram,
          explanation: 'The bid-ask spread compensates dealers for inventory risk, adverse selection, and operational costs. Spread components include base spread (liquidity), size adjustment, volatility premium, and client-specific factors. Tighter spreads win trades but increase risk.',
          codeExample: `// Spread Calculation Model
public class SpreadCalculator {

    public SpreadComponents calculateSpread(String instrument,
                                            double size,
                                            String clientId) {
        InstrumentProfile profile = getInstrumentProfile(instrument);

        // Base spread from market liquidity
        double baseSpread = profile.getTypicalSpread();

        // Size adjustment using square root model
        // Larger sizes have disproportionately wider spreads
        double avgDailyVolume = profile.getAverageDailyVolume();
        double sizeRatio = size / avgDailyVolume;
        double sizeAdjustment = 1.0 + Math.sqrt(sizeRatio) * 0.5;

        // Volatility adjustment
        double currentVol = marketData.getRealtimeVol(instrument);
        double historicalVol = profile.getHistoricalVol();
        double volRatio = currentVol / historicalVol;
        double volAdjustment = Math.max(1.0, volRatio);

        // Time of day adjustment (wider at open/close)
        double timeAdjustment = getTimeOfDayFactor();

        // Client tier adjustment
        ClientTier tier = clientService.getTier(clientId);
        double clientAdjustment = tier.getSpreadMultiplier();

        // Final spread
        double finalSpread = baseSpread
            * sizeAdjustment
            * volAdjustment
            * timeAdjustment
            * clientAdjustment;

        return new SpreadComponents(
            baseSpread, sizeAdjustment, volAdjustment,
            timeAdjustment, clientAdjustment, finalSpread
        );
    }

    // Skew pricing to manage inventory
    public double[] getSkewedBidAsk(double midPrice,
                                     double spread,
                                     double inventoryPosition,
                                     double maxPosition) {
        // Skew factor: positive inventory -> lower bid, higher ask
        double skewFactor = inventoryPosition / maxPosition;
        double skewAmount = spread * 0.25 * skewFactor;

        double bid = midPrice - (spread / 2) - skewAmount;
        double ask = midPrice + (spread / 2) - skewAmount;

        return new double[] { bid, ask };
    }
}`
        },
        {
          name: 'Market Impact Models',
          diagram: MarketImpactDiagram,
          explanation: 'Large trades move markets. Market impact models estimate price movement from executing a trade. Used to adjust quotes for large sizes and to optimize execution algorithms. Common models include Almgren-Chriss and square-root models.',
          codeExample: `// Market Impact Model for Quote Pricing
@Service
public class MarketImpactModel {
    private final MarketDataService marketData;
    private final InstrumentProfileService profileService;

    // Square-root model: Impact = sigma * sqrt(Q / ADV)
    public double estimateImpact(String instrument, double quantity, Side side) {
        InstrumentProfile profile = profileService.getProfile(instrument);

        double sigma = marketData.getVolatility(instrument);
        double adv = profile.getAverageDailyVolume();
        double participationRate = quantity / adv;

        // Square-root impact model
        double baseImpact = sigma * Math.sqrt(participationRate);

        // Adjust for current market conditions
        double liquidityFactor = getLiquidityFactor(instrument);
        double adjustedImpact = baseImpact * liquidityFactor;

        // Permanent impact is portion that doesn't revert
        double permanentImpact = adjustedImpact * profile.getPermanentImpactRatio();

        return adjustedImpact;
    }

    // Almgren-Chriss model for optimal execution
    public AlmgrenChrissCost calculateExecutionCost(
            String instrument, double quantity, Duration horizon) {

        InstrumentProfile profile = profileService.getProfile(instrument);
        double sigma = marketData.getVolatility(instrument);
        double adv = profile.getAverageDailyVolume();

        // Model parameters
        double eta = profile.getTemporaryImpactCoef();   // Temporary impact
        double gamma = profile.getPermanentImpactCoef(); // Permanent impact
        double T = horizon.toMinutes() / 390.0;          // Time horizon (trading day)

        // Expected cost components
        double permanentCost = 0.5 * gamma * quantity * quantity;
        double temporaryCost = eta * quantity * quantity / T;

        // Variance of execution cost (timing risk)
        double variance = sigma * sigma * quantity * quantity * T / 3.0;

        return new AlmgrenChrissCost(
            permanentCost + temporaryCost,  // Expected cost
            Math.sqrt(variance),             // Execution risk (std dev)
            permanentCost,
            temporaryCost
        );
    }

    // Adjust quote spread based on market impact
    public double getImpactAdjustedSpread(String instrument, double quantity,
                                           double baseSpread) {
        double impact = estimateImpact(instrument, quantity, Side.BUY);

        // Add impact to spread (dealer needs to cover hedging cost)
        return baseSpread + (impact * 2);  // Impact on both sides
    }
}`
        },
        {
          name: 'Inventory Skewing',
          diagram: InventorySkewDiagram,
          explanation: 'Dealers skew prices to manage inventory risk. Long position: lower bid (discourage buying), higher ask (encourage selling). The skew amount depends on position size relative to limits and market conditions. Automated skewing enables continuous inventory optimization.',
          codeExample: `// Inventory Skewing for Risk Management
@Service
public class InventorySkewService {
    private final PositionService positionService;
    private final RiskLimitService riskLimits;

    public SkewedQuote applyInventorySkew(String instrument, double mid,
                                           double baseSpread) {
        // Get current position
        double position = positionService.getPosition(instrument);
        double maxPosition = riskLimits.getMaxPosition(instrument);

        // Calculate skew factor (-1 to +1)
        // Positive = long position, negative = short position
        double skewFactor = position / maxPosition;
        skewFactor = Math.max(-1.0, Math.min(1.0, skewFactor));  // Clamp

        // Maximum skew is 50% of spread (configurable)
        double maxSkew = baseSpread * 0.5;
        double skewAmount = maxSkew * skewFactor;

        // Apply asymmetric skew
        // Long position: lower bid (don't want more), higher ask (want to sell)
        double skewedBid = mid - (baseSpread / 2) - skewAmount;
        double skewedAsk = mid + (baseSpread / 2) - skewAmount;

        // Calculate aggressiveness based on position
        double bidAggressiveness = calculateAggressiveness(position, Side.BUY);
        double askAggressiveness = calculateAggressiveness(position, Side.SELL);

        return SkewedQuote.builder()
            .mid(mid)
            .bid(skewedBid)
            .ask(skewedAsk)
            .skewFactor(skewFactor)
            .skewAmount(skewAmount)
            .bidAggressiveness(bidAggressiveness)
            .askAggressiveness(askAggressiveness)
            .build();
    }

    private double calculateAggressiveness(double position, Side side) {
        // How aggressive should we be on this side?
        if (position > 0) {
            // Long position: aggressive on sell, passive on buy
            return side == Side.SELL ? 1.2 : 0.8;
        } else if (position < 0) {
            // Short position: aggressive on buy, passive on sell
            return side == Side.BUY ? 1.2 : 0.8;
        }
        return 1.0;  // Neutral position
    }

    // Real-time skew update as position changes
    public void onPositionUpdate(PositionUpdate update) {
        String instrument = update.getInstrument();

        // Recalculate skew for all active quotes
        List<Quote> activeQuotes = quoteService.getActiveQuotes(instrument);
        for (Quote quote : activeQuotes) {
            SkewedQuote newSkew = applyInventorySkew(
                instrument,
                quote.getMid(),
                quote.getSpread()
            );
            quoteService.updateQuote(quote.getQuoteId(), newSkew);
        }
    }
}`
        }
      ]
    },
    {
      id: 'latency',
      name: 'Response Time Optimization',
      icon: '⚡',
      color: '#ef4444',
      description: 'Minimizing latency in RFQ response for competitive advantage',
      details: [
        {
          name: 'Critical Path Analysis',
          diagram: CriticalPathDiagram,
          explanation: 'Identify and optimize the slowest components in the RFQ response path. Typical bottlenecks: market data lookup, risk checks, database queries, network hops. Target response times: <50ms for liquid products, <100ms for complex products.',
          codeExample: `// Low-Latency RFQ Processing
public class LowLatencyRFQProcessor {
    // Pre-computed data structures for O(1) lookups
    private final ConcurrentHashMap<String, InstrumentCache> instrumentCache;
    private final ConcurrentHashMap<String, ClientCache> clientCache;

    // Object pooling to avoid GC
    private final ObjectPool<Quote> quotePool;
    private final ObjectPool<RFQContext> contextPool;

    // Lock-free market data
    private final AtomicReference<MarketDataSnapshot> marketData;

    public Quote processRFQ(RFQ rfq) {
        long startNanos = System.nanoTime();

        // Get pooled objects
        Quote quote = quotePool.acquire();
        RFQContext ctx = contextPool.acquire();

        try {
            // 1. Cache lookups (< 1 microsecond)
            InstrumentCache inst = instrumentCache.get(rfq.getInstrument());
            ClientCache client = clientCache.get(rfq.getClientId());

            // 2. Get market data (lock-free read)
            MarketDataSnapshot md = marketData.get();
            double mid = md.getMid(rfq.getInstrument());

            // 3. Pre-computed spread (avoid calculation)
            double spread = inst.getPrecomputedSpread(
                rfq.getQuantity(),
                client.getTier()
            );

            // 4. Inventory check (atomic read)
            double position = inventory.getPosition(rfq.getInstrument());

            // 5. Calculate skewed price
            double[] bidAsk = calculateBidAsk(mid, spread, position);

            // 6. Risk check (pre-validated limits)
            if (!client.isWithinLimits(rfq.getQuantity())) {
                return Quote.REJECT;
            }

            // Build quote
            quote.setRfqId(rfq.getRfqId());
            quote.setBid(bidAsk[0]);
            quote.setAsk(bidAsk[1]);
            quote.setTimestamp(System.currentTimeMillis());

            // Log latency
            long latencyNanos = System.nanoTime() - startNanos;
            metrics.recordLatency("rfq_processing", latencyNanos);

            return quote;
        } finally {
            contextPool.release(ctx);
        }
    }
}`
        },
        {
          name: 'Caching Strategies',
          diagram: CachingDiagram,
          explanation: 'Cache frequently accessed data: instrument profiles, client tiers, spread parameters. Use lock-free data structures for concurrent access. Pre-compute spreads for common size buckets. Warm caches on startup and refresh periodically.',
          codeExample: `// High-Performance Caching for RFQ Systems
@Service
public class RFQCacheService {
    // Lock-free caches using Caffeine
    private final Cache<String, InstrumentProfile> instrumentCache;
    private final Cache<String, ClientProfile> clientCache;
    private final Cache<SpreadKey, Double> spreadCache;

    // Pre-computed spread matrix for common sizes
    private final double[][] spreadMatrix;  // [instrument][sizeBucket]

    @PostConstruct
    public void initialize() {
        // Warm caches on startup
        warmInstrumentCache();
        warmClientCache();
        precomputeSpreads();
    }

    public RFQCacheService() {
        // Configure caches with optimal settings
        this.instrumentCache = Caffeine.newBuilder()
            .maximumSize(10_000)
            .expireAfterWrite(5, TimeUnit.MINUTES)
            .recordStats()
            .build();

        this.clientCache = Caffeine.newBuilder()
            .maximumSize(50_000)
            .expireAfterWrite(1, TimeUnit.MINUTES)
            .build();

        this.spreadCache = Caffeine.newBuilder()
            .maximumSize(100_000)
            .expireAfterWrite(10, TimeUnit.SECONDS)
            .build();
    }

    // O(1) spread lookup using pre-computed matrix
    public double getPrecomputedSpread(int instrumentId, double size) {
        int sizeBucket = getSizeBucket(size);
        return spreadMatrix[instrumentId][sizeBucket];
    }

    private void precomputeSpreads() {
        List<Instrument> instruments = instrumentService.getAllActive();
        double[] sizeBuckets = {100_000, 500_000, 1_000_000, 5_000_000, 10_000_000};

        spreadMatrix = new double[instruments.size()][sizeBuckets.length];

        for (int i = 0; i < instruments.size(); i++) {
            Instrument inst = instruments.get(i);
            for (int j = 0; j < sizeBuckets.length; j++) {
                spreadMatrix[i][j] = calculateSpread(inst, sizeBuckets[j]);
            }
        }
    }

    // Lock-free market data update
    private final AtomicReference<MarketDataSnapshot> marketDataRef =
        new AtomicReference<>();

    public void updateMarketData(MarketDataSnapshot snapshot) {
        marketDataRef.set(snapshot);  // Atomic swap
    }

    public MarketDataSnapshot getMarketData() {
        return marketDataRef.get();  // Lock-free read
    }

    // Periodic cache refresh
    @Scheduled(fixedRate = 60000)
    public void refreshCaches() {
        instrumentCache.invalidateAll();
        warmInstrumentCache();
        precomputeSpreads();
    }
}`
        },
        {
          name: 'Async Processing',
          diagram: AsyncDiagram,
          explanation: 'Move non-critical operations off the critical path. Log asynchronously, update analytics in background, batch database writes. Use dedicated threads for pricing calculations. Consider LMAX Disruptor pattern for high-throughput scenarios.',
          codeExample: `// Async Processing for RFQ Systems
@Service
public class AsyncRFQProcessor {
    // LMAX Disruptor for high-throughput processing
    private final RingBuffer<RFQEvent> ringBuffer;
    private final ExecutorService analyticsExecutor;
    private final BatchWriter<AuditRecord> auditWriter;

    public Quote processRFQFast(RFQ rfq) {
        long startTime = System.nanoTime();

        // CRITICAL PATH - synchronous, optimized
        Quote quote = quoteEngine.generateQuote(rfq);

        // NON-CRITICAL - fire and forget
        publishToDisruptor(rfq, quote, startTime);

        return quote;  // Return immediately
    }

    private void publishToDisruptor(RFQ rfq, Quote quote, long startTime) {
        // Publish to ring buffer (non-blocking)
        long sequence = ringBuffer.next();
        try {
            RFQEvent event = ringBuffer.get(sequence);
            event.setRfq(rfq);
            event.setQuote(quote);
            event.setStartTime(startTime);
            event.setEndTime(System.nanoTime());
        } finally {
            ringBuffer.publish(sequence);
        }
    }

    // Async handlers process events from ring buffer
    @EventHandler
    public void handleAnalytics(RFQEvent event, long sequence, boolean endOfBatch) {
        // Update metrics asynchronously
        analyticsExecutor.submit(() -> {
            metricsService.recordLatency(
                "rfq_response",
                event.getEndTime() - event.getStartTime()
            );
            metricsService.recordQuote(event.getRfq(), event.getQuote());
        });
    }

    @EventHandler
    public void handleAudit(RFQEvent event, long sequence, boolean endOfBatch) {
        // Batch audit records for efficient DB writes
        AuditRecord record = AuditRecord.from(event);
        auditWriter.add(record);

        if (endOfBatch) {
            auditWriter.flush();  // Batch write to DB
        }
    }

    // Async logging
    private final AsyncLogger asyncLogger = new AsyncLogger();

    public void logQuote(RFQ rfq, Quote quote) {
        asyncLogger.log(() -> String.format(
            "RFQ: %s, Instrument: %s, Quote: %.4f/%.4f",
            rfq.getRfqId(),
            rfq.getInstrument(),
            quote.getBid(),
            quote.getAsk()
        ));
    }

    // Dedicated thread pool for pricing calculations
    private final ExecutorService pricingExecutor =
        Executors.newFixedThreadPool(4, r -> {
            Thread t = new Thread(r, "pricing-worker");
            t.setPriority(Thread.MAX_PRIORITY);
            return t;
        });

    public CompletableFuture<Quote> generateQuoteAsync(RFQ rfq) {
        return CompletableFuture.supplyAsync(
            () -> quoteEngine.generateQuote(rfq),
            pricingExecutor
        );
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
      { name: 'RFQ Systems', icon: '💬', page: 'RFQ Systems' }
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
    background: 'linear-gradient(135deg, #4ade80, #22c55e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>RFQ Systems</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
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
          onMainMenu={breadcrumb?.onMainMenu}
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
              onMainMenu={breadcrumb?.onMainMenu}
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

export default RFQSystems

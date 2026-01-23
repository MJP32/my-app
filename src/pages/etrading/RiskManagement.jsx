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

// Pre-Trade Risk Check Flow Diagram
const PreTradeRiskDiagram = () => (
  <svg viewBox="0 0 750 200" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="riskArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="375" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Pre-Trade Risk Check Flow</text>
    {/* Order Input */}
    <rect x="30" y="70" width="80" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="70" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Order</text>
    <text x="70" y="112" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Input</text>
    {/* Risk Checks */}
    <rect x="140" y="70" width="90" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="185" y="90" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Size Limit</text>
    <text x="185" y="108" textAnchor="middle" fill="#fef3c7" fontSize="8">Max 10K shares</text>
    <rect x="250" y="70" width="90" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="295" y="90" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Notional</text>
    <text x="295" y="108" textAnchor="middle" fill="#fef3c7" fontSize="8">Max $1M</text>
    <rect x="360" y="70" width="90" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="405" y="90" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Position</text>
    <text x="405" y="108" textAnchor="middle" fill="#fef3c7" fontSize="8">Max 50K net</text>
    <rect x="470" y="70" width="90" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="515" y="90" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Fat Finger</text>
    <text x="515" y="108" textAnchor="middle" fill="#fef3c7" fontSize="8">±5% from mid</text>
    {/* Result */}
    <rect x="590" y="55" width="70" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="625" y="78" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PASS</text>
    <rect x="590" y="100" width="70" height="35" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="625" y="123" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">REJECT</text>
    {/* Arrows */}
    <line x1="110" y1="100" x2="135" y2="100" stroke="#4ade80" strokeWidth="2" markerEnd="url(#riskArrow)"/>
    <line x1="230" y1="100" x2="245" y2="100" stroke="#4ade80" strokeWidth="2" markerEnd="url(#riskArrow)"/>
    <line x1="340" y1="100" x2="355" y2="100" stroke="#4ade80" strokeWidth="2" markerEnd="url(#riskArrow)"/>
    <line x1="450" y1="100" x2="465" y2="100" stroke="#4ade80" strokeWidth="2" markerEnd="url(#riskArrow)"/>
    <line x1="560" y1="85" x2="585" y2="75" stroke="#22c55e" strokeWidth="2" markerEnd="url(#riskArrow)"/>
    <line x1="560" y1="115" x2="585" y2="118" stroke="#ef4444" strokeWidth="2" markerEnd="url(#riskArrow)"/>
    <text x="375" y="165" textAnchor="middle" fill="#64748b" fontSize="10">All checks must pass • Sub-millisecond latency required</text>
    <text x="375" y="185" textAnchor="middle" fill="#ef4444" fontSize="10">Any failure → Immediate rejection with reason code</text>
  </svg>
)

// Real-Time P&L Monitoring Diagram
const PnLMonitoringDiagram = () => (
  <svg viewBox="0 0 700 250" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Real-Time P&L Monitoring</text>
    {/* P&L chart simulation */}
    <rect x="50" y="50" width="400" height="150" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="2"/>
    <text x="250" y="75" textAnchor="middle" fill="#64748b" fontSize="11">Intraday P&L</text>
    {/* Grid lines */}
    <line x1="70" y1="100" x2="430" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4"/>
    <line x1="70" y1="125" x2="430" y2="125" stroke="#334155" strokeWidth="1" strokeDasharray="4"/>
    <line x1="70" y1="150" x2="430" y2="150" stroke="#334155" strokeWidth="1" strokeDasharray="4"/>
    {/* P&L line */}
    <path d="M 70 150 L 120 140 L 170 145 L 220 120 L 270 100 L 320 95 L 370 110 L 420 85" fill="none" stroke="#22c55e" strokeWidth="3"/>
    <circle cx="420" cy="85" r="5" fill="#22c55e"/>
    <text x="430" y="88" fill="#22c55e" fontSize="10">+$125K</text>
    {/* Thresholds */}
    <line x1="70" y1="80" x2="430" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6"/>
    <text x="440" y="83" fill="#fbbf24" fontSize="9">Warning</text>
    <line x1="70" y1="175" x2="430" y2="175" stroke="#ef4444" strokeWidth="2" strokeDasharray="6"/>
    <text x="440" y="178" fill="#f87171" fontSize="9">Loss Limit</text>
    {/* Metrics panel */}
    <rect x="480" y="50" width="180" height="150" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="2"/>
    <text x="570" y="75" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Risk Metrics</text>
    <text x="500" y="100" fill="#4ade80" fontSize="10">Realized P&L:</text>
    <text x="620" y="100" fill="#4ade80" fontSize="10">+$45K</text>
    <text x="500" y="120" fill="#60a5fa" fontSize="10">Unrealized P&L:</text>
    <text x="620" y="120" fill="#60a5fa" fontSize="10">+$80K</text>
    <text x="500" y="140" fill="#94a3b8" fontSize="10">Position Count:</text>
    <text x="620" y="140" fill="#94a3b8" fontSize="10">127</text>
    <text x="500" y="160" fill="#fbbf24" fontSize="10">Gross Exposure:</text>
    <text x="620" y="160" fill="#fbbf24" fontSize="10">$15M</text>
    <text x="500" y="180" fill="#f87171" fontSize="10">VaR (95%):</text>
    <text x="620" y="180" fill="#f87171" fontSize="10">$250K</text>
    <text x="350" y="230" textAnchor="middle" fill="#64748b" fontSize="10">Updates every 100ms • Automatic alerts on threshold breach</text>
  </svg>
)

// VaR Distribution Diagram
const VaRDiagram = () => (
  <svg viewBox="0 0 650 220" style={{ width: '100%', maxWidth: '650px', height: 'auto', margin: '1rem 0' }}>
    <text x="325" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Value at Risk (VaR) - 99% Confidence</text>
    {/* Distribution curve */}
    <rect x="50" y="45" width="550" height="130" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="2"/>
    {/* Bell curve approximation */}
    <path d="M 100 160 Q 150 160, 200 150 Q 250 130, 300 90 Q 350 60, 400 90 Q 450 130, 500 150 Q 550 160, 580 160" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    {/* VaR line */}
    <line x1="150" y1="55" x2="150" y2="165" stroke="#ef4444" strokeWidth="2"/>
    <rect x="100" y="50" width="50" height="115" fill="rgba(239, 68, 68, 0.3)"/>
    <text x="125" y="180" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">VaR</text>
    <text x="125" y="195" textAnchor="middle" fill="#f87171" fontSize="9">1% tail</text>
    {/* Labels */}
    <text x="340" y="180" textAnchor="middle" fill="#64748b" fontSize="10">Expected Return Distribution</text>
    <text x="500" y="80" fill="#60a5fa" fontSize="10">95% of days</text>
    <text x="500" y="95" fill="#60a5fa" fontSize="10">loss &lt; VaR</text>
  </svg>
)

// Order Validation Diagram
const OrderValidationDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Order Validation Pipeline</text>
    <rect x="30" y="50" width="90" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="75" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Order Input</text>
    <rect x="140" y="50" width="90" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="185" y="72" textAnchor="middle" fill="white" fontSize="8">Size</text>
    <text x="185" y="88" textAnchor="middle" fill="white" fontSize="8">Limit</text>
    <rect x="250" y="50" width="90" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="8">Notional</text>
    <text x="295" y="88" textAnchor="middle" fill="white" fontSize="8">Check</text>
    <rect x="360" y="50" width="90" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="405" y="72" textAnchor="middle" fill="white" fontSize="8">Fat Finger</text>
    <text x="405" y="88" textAnchor="middle" fill="white" fontSize="8">Detection</text>
    <rect x="470" y="50" width="90" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="515" y="72" textAnchor="middle" fill="white" fontSize="8">Duplicate</text>
    <text x="515" y="88" textAnchor="middle" fill="white" fontSize="8">Check</text>
    <rect x="580" y="50" width="90" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="625" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Validated</text>
    <line x1="120" y1="75" x2="135" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="230" y1="75" x2="245" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="340" y1="75" x2="355" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="450" y1="75" x2="465" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="560" y1="75" x2="575" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Sequential validation • All checks must pass</text>
  </svg>
)

// Credit Check Diagram
const CreditCheckDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Real-Time Credit Validation</text>
    <rect x="50" y="50" width="120" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Order</text>
    <text x="110" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="9">$500K Notional</text>
    <rect x="220" y="40" width="140" height="80" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="290" y="60" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Credit Engine</text>
    <text x="290" y="80" textAnchor="middle" fill="#c4b5fd" fontSize="8">Gross Limit: $10M</text>
    <text x="290" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">Current: $8M</text>
    <text x="290" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="8">Available: $2M</text>
    <rect x="410" y="40" width="120" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="470" y="63" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">✓ Approved</text>
    <rect x="410" y="85" width="120" height="35" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="470" y="108" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">✗ Rejected</text>
    <line x1="170" y1="80" x2="215" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="360" y1="57" x2="405" y2="57" stroke="#22c55e" strokeWidth="2"/>
    <line x1="360" y1="102" x2="405" y2="102" stroke="#ef4444" strokeWidth="2"/>
    <rect x="540" y="50" width="120" height="60" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Reserve Credit</text>
    <text x="600" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">Until fill/cancel</text>
    <text x="350" y="155" textAnchor="middle" fill="#64748b" fontSize="9">Buying power check • Margin requirements • Credit reservation</text>
  </svg>
)

// Kill Switch Diagram
const KillSwitchDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Trading Kill Switch Activation</text>
    <rect x="50" y="50" width="100" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="3"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">🛑 KILL</text>
    <text x="100" y="92" textAnchor="middle" fill="white" fontSize="10">SWITCH</text>
    <rect x="180" y="45" width="130" height="30" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1"/>
    <text x="245" y="65" textAnchor="middle" fill="#f87171" fontSize="9">Disable Order Entry</text>
    <rect x="180" y="80" width="130" height="30" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1"/>
    <text x="245" y="100" textAnchor="middle" fill="#f87171" fontSize="9">Cancel All Orders</text>
    <rect x="340" y="45" width="130" height="30" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="405" y="65" textAnchor="middle" fill="#fbbf24" fontSize="9">Alert Operations</text>
    <rect x="340" y="80" width="130" height="30" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="405" y="100" textAnchor="middle" fill="#fbbf24" fontSize="9">Log Audit Trail</text>
    <rect x="500" y="55" width="150" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="575" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Manual Reset</text>
    <text x="575" y="92" textAnchor="middle" fill="#86efac" fontSize="8">Requires confirmation</text>
    <line x1="150" y1="60" x2="175" y2="60" stroke="#ef4444" strokeWidth="2"/>
    <line x1="150" y1="95" x2="175" y2="95" stroke="#ef4444" strokeWidth="2"/>
    <line x1="310" y1="60" x2="335" y2="60" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="310" y1="95" x2="335" y2="95" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="470" y1="80" x2="495" y2="80" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#ef4444" fontSize="10">Emergency halt • Triggered by risk breach or manual activation</text>
  </svg>
)

// P&L Calculation Diagram
const PnLCalcDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Real-Time P&L Calculation</text>
    <rect x="50" y="50" width="120" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="70" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Position</text>
    <text x="110" y="88" textAnchor="middle" fill="#93c5fd" fontSize="8">Qty: 1,000</text>
    <text x="110" y="103" textAnchor="middle" fill="#93c5fd" fontSize="8">Avg Cost: $50</text>
    <rect x="200" y="50" width="120" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="260" y="70" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Market Data</text>
    <text x="260" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="8">Bid: $52</text>
    <text x="260" y="103" textAnchor="middle" fill="#c4b5fd" fontSize="8">Ask: $52.05</text>
    <rect x="350" y="50" width="140" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="420" y="70" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Mark-to-Market</text>
    <text x="420" y="88" textAnchor="middle" fill="#86efac" fontSize="8">Value: $52,000</text>
    <text x="420" y="103" textAnchor="middle" fill="#86efac" fontSize="8">Unrealized: +$2,000</text>
    <rect x="520" y="50" width="130" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="585" y="70" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Threshold Check</text>
    <text x="585" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">Limit: -$100K</text>
    <text x="585" y="103" textAnchor="middle" fill="#fcd34d" fontSize="8">Status: OK</text>
    <line x1="170" y1="85" x2="195" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="320" y1="85" x2="345" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="490" y1="85" x2="515" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Updates every 100ms • Alerts on threshold breach</text>
  </svg>
)

// Position Limits Diagram
const PositionLimitsDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Position Limit Monitoring</text>
    <rect x="50" y="50" width="180" height="90" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Symbol Limits</text>
    <text x="140" y="90" textAnchor="middle" fill="#93c5fd" fontSize="8">AAPL: 45K/50K (90%)</text>
    <text x="140" y="105" textAnchor="middle" fill="#93c5fd" fontSize="8">MSFT: 20K/50K (40%)</text>
    <text x="140" y="120" textAnchor="middle" fill="#f87171" fontSize="8">TSLA: 52K/50K ⚠️ BREACH</text>
    <rect x="260" y="50" width="180" height="90" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Gross Exposure</text>
    <text x="350" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="8">Current: $12M</text>
    <text x="350" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="8">Limit: $15M</text>
    <text x="350" y="120" textAnchor="middle" fill="#86efac" fontSize="8">Utilization: 80%</text>
    <rect x="470" y="50" width="180" height="90" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="70" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Concentration</text>
    <text x="560" y="90" textAnchor="middle" fill="#fcd34d" fontSize="8">Max single name: 10%</text>
    <text x="560" y="105" textAnchor="middle" fill="#fcd34d" fontSize="8">AAPL: 8% ✓</text>
    <text x="560" y="120" textAnchor="middle" fill="#fcd34d" fontSize="8">Tech sector: 35%</text>
    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="9">Continuous monitoring • Auto-hedge on breach • Sector limits</text>
  </svg>
)

// Stress Testing Diagram
const StressTestDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Portfolio Stress Testing Scenarios</text>
    <rect x="50" y="50" width="140" height="80" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="120" y="70" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">2008 Crisis</text>
    <text x="120" y="88" textAnchor="middle" fill="#fca5a5" fontSize="8">Equity: -40%</text>
    <text x="120" y="103" textAnchor="middle" fill="#fca5a5" fontSize="8">Credit: +200bp</text>
    <text x="120" y="118" textAnchor="middle" fill="#fca5a5" fontSize="8">P&L: -$2.5M</text>
    <rect x="210" y="50" width="140" height="80" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="280" y="70" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Rate Shock</text>
    <text x="280" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">Rates: +100bp</text>
    <text x="280" y="103" textAnchor="middle" fill="#fcd34d" fontSize="8">Duration: -$50K/bp</text>
    <text x="280" y="118" textAnchor="middle" fill="#fcd34d" fontSize="8">P&L: -$500K</text>
    <rect x="370" y="50" width="140" height="80" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="440" y="70" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">COVID Crash</text>
    <text x="440" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="8">Equity: -30%</text>
    <text x="440" y="103" textAnchor="middle" fill="#c4b5fd" fontSize="8">Vol: +200%</text>
    <text x="440" y="118" textAnchor="middle" fill="#c4b5fd" fontSize="8">P&L: -$1.8M</text>
    <rect x="530" y="50" width="140" height="80" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="70" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Reverse Test</text>
    <text x="600" y="88" textAnchor="middle" fill="#86efac" fontSize="8">Find breaking point</text>
    <text x="600" y="103" textAnchor="middle" fill="#86efac" fontSize="8">Max loss: $5M</text>
    <text x="600" y="118" textAnchor="middle" fill="#86efac" fontSize="8">Shock: -25%</text>
    <text x="350" y="155" textAnchor="middle" fill="#64748b" fontSize="9">Historical replay • Hypothetical scenarios • Breaking point analysis</text>
  </svg>
)

// Trade Reporting Diagram
const TradeReportingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Regulatory Trade Reporting Flow</text>
    <rect x="50" y="50" width="100" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Trade</text>
    <text x="100" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">Executed</text>
    <rect x="180" y="50" width="120" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="240" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Build Report</text>
    <text x="240" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">ID, Time, Price, Qty</text>
    <rect x="330" y="40" width="110" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="385" y="63" textAnchor="middle" fill="#fbbf24" fontSize="9">TRACE</text>
    <rect x="330" y="80" width="110" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="385" y="103" textAnchor="middle" fill="#fbbf24" fontSize="9">DTCC</text>
    <rect x="470" y="40" width="80" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="510" y="63" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">ACK</text>
    <rect x="470" y="80" width="80" height="35" rx="4" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="510" y="103" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">NACK</text>
    <rect x="580" y="50" width="90" height="60" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="625" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Audit</text>
    <text x="625" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">Trail</text>
    <line x1="150" y1="80" x2="175" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="300" y1="57" x2="325" y2="57" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="300" y1="97" x2="325" y2="97" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="440" y1="57" x2="465" y2="57" stroke="#22c55e" strokeWidth="2"/>
    <line x1="440" y1="97" x2="465" y2="97" stroke="#ef4444" strokeWidth="2"/>
    <line x1="550" y1="80" x2="575" y2="80" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="9">Real-time reporting • Trade reconstruction • Audit compliance</text>
  </svg>
)

// Best Execution / TCA Diagram
const BestExecutionDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Transaction Cost Analysis (TCA)</text>
    <rect x="50" y="50" width="150" height="90" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Benchmarks</text>
    <text x="125" y="90" textAnchor="middle" fill="#93c5fd" fontSize="8">Arrival: $50.00</text>
    <text x="125" y="105" textAnchor="middle" fill="#93c5fd" fontSize="8">VWAP: $50.15</text>
    <text x="125" y="120" textAnchor="middle" fill="#93c5fd" fontSize="8">Close: $50.25</text>
    <rect x="230" y="50" width="150" height="90" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="305" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Execution</text>
    <text x="305" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="8">Avg Price: $50.10</text>
    <text x="305" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="8">Quantity: 10,000</text>
    <text x="305" y="120" textAnchor="middle" fill="#c4b5fd" fontSize="8">Fills: 5 venues</text>
    <rect x="410" y="50" width="150" height="90" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="485" y="70" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Analysis</text>
    <text x="485" y="90" textAnchor="middle" fill="#86efac" fontSize="8">Impl. Shortfall: $1,000</text>
    <text x="485" y="105" textAnchor="middle" fill="#86efac" fontSize="8">VWAP Slip: -0.1%</text>
    <text x="485" y="120" textAnchor="middle" fill="#86efac" fontSize="8">Market Impact: $500</text>
    <rect x="590" y="60" width="80" height="70" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="630" y="85" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">MiFID II</text>
    <text x="630" y="105" textAnchor="middle" fill="#fcd34d" fontSize="8">Report</text>
    <line x1="200" y1="95" x2="225" y2="95" stroke="#4ade80" strokeWidth="2"/>
    <line x1="380" y1="95" x2="405" y2="95" stroke="#4ade80" strokeWidth="2"/>
    <line x1="560" y1="95" x2="585" y2="95" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="165" textAnchor="middle" fill="#64748b" fontSize="9">Best execution compliance • Slippage analysis • Venue breakdown</text>
  </svg>
)

function RiskManagement({ onBack }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    { id: 'pre-trade', name: 'Pre-Trade Risk', icon: '🚦', color: '#ef4444', description: 'Risk checks before order submission', diagram: PreTradeRiskDiagram,
      details: [
        { name: 'Order Validation', diagram: OrderValidationDiagram, explanation: 'Validate orders before routing to market. Size limits per order and per symbol. Notional limits for value-based controls. Price reasonability checks (fat finger). Duplicate order detection.',
          codeExample: `// Pre-Trade Risk Engine
@Service
public class PreTradeRiskEngine {
    private final RiskLimitService limits;
    private final PositionService positions;

    public RiskCheckResult check(Order order) {
        List<RiskViolation> violations = new ArrayList<>();

        // 1. Order size limit
        if (order.getQuantity() > limits.getMaxOrderSize(order.getSymbol())) {
            violations.add(new RiskViolation("ORDER_SIZE", "Exceeds max order size"));
        }

        // 2. Notional limit
        BigDecimal notional = calculateNotional(order);
        if (notional.compareTo(limits.getMaxNotional(order.getAccount())) > 0) {
            violations.add(new RiskViolation("NOTIONAL", "Exceeds notional limit"));
        }

        // 3. Position limit check
        long currentPos = positions.getPosition(order.getSymbol());
        long projectedPos = currentPos + order.getSignedQuantity();
        if (Math.abs(projectedPos) > limits.getPositionLimit(order.getSymbol())) {
            violations.add(new RiskViolation("POSITION", "Would breach position limit"));
        }

        // 4. Price reasonability (fat finger check)
        BigDecimal refPrice = marketData.getMidPrice(order.getSymbol());
        BigDecimal deviation = order.getPrice().subtract(refPrice).abs()
            .divide(refPrice, 4, RoundingMode.HALF_UP);
        if (deviation.compareTo(limits.getMaxPriceDeviation()) > 0) {
            violations.add(new RiskViolation("PRICE", "Price deviates >5% from market"));
        }

        // 5. Rate limiting
        if (rateLimiter.isRateLimited(order.getTraderId())) {
            violations.add(new RiskViolation("RATE", "Order rate limit exceeded"));
        }

        return violations.isEmpty()
            ? RiskCheckResult.approved()
            : RiskCheckResult.rejected(violations);
    }
}` },
        { name: 'Credit Checks', diagram: CreditCheckDiagram, explanation: 'Verify sufficient buying power. Real-time credit utilization tracking. Gross vs net exposure limits. Margin requirements for leveraged products.',
          codeExample: `// Real-Time Credit Check Service
@Service
public class CreditCheckService {
    private final CreditLimitService limits;
    private final PositionService positions;

    public CreditCheckResult checkCredit(Order order) {
        String account = order.getAccount();

        // Get current utilization
        CreditUtilization current = calculateUtilization(account);

        // Calculate projected utilization if order executes
        BigDecimal orderNotional = calculateNotional(order);
        BigDecimal projectedGross = current.getGrossExposure().add(orderNotional);
        BigDecimal projectedNet = calculateProjectedNet(current, order);

        // Get limits
        CreditLimits accountLimits = limits.getLimits(account);

        // Check gross exposure
        if (projectedGross.compareTo(accountLimits.getGrossLimit()) > 0) {
            return CreditCheckResult.rejected(
                "GROSS_LIMIT",
                String.format("Projected gross %.2f exceeds limit %.2f",
                    projectedGross, accountLimits.getGrossLimit())
            );
        }

        // Check net exposure
        if (projectedNet.abs().compareTo(accountLimits.getNetLimit()) > 0) {
            return CreditCheckResult.rejected("NET_LIMIT", "Net limit breach");
        }

        // Check buying power (for buys)
        if (order.getSide() == Side.BUY) {
            BigDecimal availableCash = getAvailableCash(account);
            BigDecimal margin = calculateMargin(order);

            if (margin.compareTo(availableCash) > 0) {
                return CreditCheckResult.rejected("BUYING_POWER",
                    "Insufficient buying power");
            }
        }

        // Update reserved credit
        reserveCredit(account, orderNotional);

        return CreditCheckResult.approved(projectedGross, projectedNet);
    }

    private BigDecimal calculateMargin(Order order) {
        // Initial margin requirement (e.g., 50% for equities)
        BigDecimal marginRate = marginService.getInitialMargin(order.getSymbol());
        return calculateNotional(order).multiply(marginRate);
    }
}` },
        { name: 'Kill Switch', diagram: KillSwitchDiagram, explanation: 'Emergency halt of all trading activity. Triggered manually or by risk breach. Cancels all open orders. Prevents new order submission. Essential for risk control.',
          codeExample: `// Trading Kill Switch
@Service
public class KillSwitchService {
    private final AtomicBoolean killed = new AtomicBoolean(false);
    private final OrderService orderService;
    private final GatewayService gatewayService;

    // Manual kill switch activation
    public void activate(String reason, String activatedBy) {
        if (killed.compareAndSet(false, true)) {
            log.critical("KILL SWITCH ACTIVATED by {} - Reason: {}", activatedBy, reason);

            // 1. Stop accepting new orders immediately
            gatewayService.disableOrderEntry();

            // 2. Cancel all open orders
            int cancelledCount = cancelAllOrders();

            // 3. Notify all systems
            eventPublisher.publish(new KillSwitchEvent(reason, activatedBy, Instant.now()));

            // 4. Alert operations team
            alertService.critical("Kill switch activated", Map.of(
                "reason", reason,
                "activatedBy", activatedBy,
                "cancelledOrders", cancelledCount
            ));

            // 5. Log for audit
            auditService.logKillSwitch(reason, activatedBy);
        }
    }

    private int cancelAllOrders() {
        List<Order> openOrders = orderService.getAllOpenOrders();
        int count = 0;

        for (Order order : openOrders) {
            try {
                orderService.cancel(order.getId(), "KILL_SWITCH");
                count++;
            } catch (Exception e) {
                log.error("Failed to cancel order {}", order.getId(), e);
            }
        }

        return count;
    }

    // Auto-trigger on risk breach
    @EventListener
    public void onRiskBreach(RiskBreachEvent event) {
        if (event.getSeverity() == Severity.CRITICAL) {
            activate("Auto-trigger: " + event.getMessage(), "SYSTEM");
        }
    }

    // Check before order submission
    public void checkKillSwitch() {
        if (killed.get()) {
            throw new TradingHaltedException("Trading halted - kill switch active");
        }
    }

    // Reset (requires manual confirmation)
    public void reset(String confirmedBy, String confirmationCode) {
        if (validateConfirmation(confirmedBy, confirmationCode)) {
            killed.set(false);
            gatewayService.enableOrderEntry();
            log.info("Kill switch reset by {}", confirmedBy);
        }
    }
}` }
      ]
    },
    { id: 'real-time', name: 'Real-Time Monitoring', icon: '📊', color: '#3b82f6', description: 'Continuous risk surveillance', diagram: PnLMonitoringDiagram,
      details: [
        { name: 'P&L Monitoring', diagram: PnLCalcDiagram, explanation: 'Real-time profit and loss calculation. Mark-to-market using live prices. Realized vs unrealized P&L tracking. Alerts on significant P&L changes.',
          codeExample: `// Real-Time P&L Calculator
@Service
public class RealTimePnLService {
    private final PositionService positions;
    private final MarketDataService marketData;

    @Scheduled(fixedRate = 100)  // Every 100ms
    public void calculatePnL() {
        for (Position position : positions.getAllPositions()) {
            Quote quote = marketData.getQuote(position.getSymbol());

            // Mark-to-market
            BigDecimal currentValue = position.getQuantity() > 0
                ? quote.getBid().multiply(BigDecimal.valueOf(position.getQuantity()))
                : quote.getAsk().multiply(BigDecimal.valueOf(Math.abs(position.getQuantity())));

            BigDecimal costBasis = position.getAvgCost()
                .multiply(BigDecimal.valueOf(Math.abs(position.getQuantity())));

            BigDecimal unrealizedPnL = currentValue.subtract(costBasis);
            BigDecimal totalPnL = position.getRealizedPnL().add(unrealizedPnL);

            // Check thresholds
            if (totalPnL.compareTo(limits.getLossLimit(position.getDesk())) < 0) {
                alertService.raise(AlertLevel.CRITICAL,
                    "Loss limit breached for " + position.getDesk());
            }

            metricsService.recordPnL(position, unrealizedPnL, totalPnL);
        }
    }
}` },
        { name: 'Position Limits', diagram: PositionLimitsDiagram, explanation: 'Track positions against limits. Gross and net position monitoring. Concentration limits per symbol. Sector and asset class limits.',
          codeExample: `// Position Limit Monitoring
@Service
public class PositionLimitService {
    private final PositionService positions;
    private final LimitConfiguration limits;

    @Scheduled(fixedRate = 100)  // Check every 100ms
    public void monitorLimits() {
        for (String desk : getActiveDesks()) {
            checkDeskLimits(desk);
        }
    }

    private void checkDeskLimits(String desk) {
        Map<String, Long> positionsBySymbol = positions.getPositionsByDesk(desk);

        // 1. Per-symbol position limits
        for (Map.Entry<String, Long> entry : positionsBySymbol.entrySet()) {
            String symbol = entry.getKey();
            long position = entry.getValue();
            long limit = limits.getSymbolLimit(desk, symbol);

            double utilization = (double) Math.abs(position) / limit;

            if (utilization > 1.0) {
                alertService.raise(AlertLevel.CRITICAL,
                    desk + " position limit breached for " + symbol);
                triggerAutoHedge(desk, symbol, position, limit);
            } else if (utilization > 0.9) {
                alertService.raise(AlertLevel.WARNING,
                    desk + " approaching limit for " + symbol + " (" +
                    String.format("%.1f%%", utilization * 100) + ")");
            }
        }

        // 2. Gross exposure limit
        BigDecimal grossExposure = calculateGrossExposure(positionsBySymbol);
        if (grossExposure.compareTo(limits.getGrossLimit(desk)) > 0) {
            alertService.raise(AlertLevel.CRITICAL, desk + " gross limit breached");
        }

        // 3. Concentration limits (single name)
        checkConcentration(desk, positionsBySymbol);

        // 4. Sector limits
        checkSectorLimits(desk, positionsBySymbol);
    }

    private void checkConcentration(String desk, Map<String, Long> positions) {
        BigDecimal totalExposure = calculateGrossExposure(positions);
        BigDecimal maxConcentration = limits.getMaxConcentration(desk); // e.g., 10%

        for (Map.Entry<String, Long> entry : positions.entrySet()) {
            BigDecimal symbolExposure = calculateNotional(entry.getKey(), entry.getValue());
            BigDecimal concentration = symbolExposure.divide(totalExposure, 4, RoundingMode.HALF_UP);

            if (concentration.compareTo(maxConcentration) > 0) {
                alertService.raise(AlertLevel.WARNING,
                    "Concentration limit: " + entry.getKey() + " = " +
                    concentration.multiply(BigDecimal.valueOf(100)) + "%");
            }
        }
    }
}` }
      ]
    },
    { id: 'var', name: 'VaR & Stress Testing', icon: '📈', color: '#8b5cf6', description: 'Statistical risk measures', diagram: VaRDiagram,
      details: [
        { name: 'Value at Risk', explanation: 'Estimate potential loss at confidence level. Parametric VaR assumes normal distribution. Historical VaR uses actual past returns. Monte Carlo VaR for complex portfolios.',
          codeExample: `// VaR Calculation
public class VaRCalculator {
    // Historical VaR
    public double calculateHistoricalVaR(Portfolio portfolio, double confidence, int days) {
        double[] returns = getHistoricalReturns(portfolio, days);
        Arrays.sort(returns);

        int index = (int) Math.floor((1 - confidence) * returns.length);
        return -returns[index] * portfolio.getValue();
    }

    // Parametric VaR (assumes normal distribution)
    public double calculateParametricVaR(Portfolio portfolio, double confidence, int horizon) {
        double portfolioValue = portfolio.getValue();
        double portfolioVol = calculatePortfolioVolatility(portfolio);

        // Z-score for confidence level (e.g., 2.33 for 99%)
        double zScore = new NormalDistribution().inverseCumulativeProbability(confidence);

        // Scale volatility by time horizon
        double scaledVol = portfolioVol * Math.sqrt(horizon / 252.0);

        return portfolioValue * zScore * scaledVol;
    }
}` },
        { name: 'Stress Testing', diagram: StressTestDiagram, explanation: 'Test portfolio under extreme scenarios. Historical scenarios (2008 crisis, COVID). Hypothetical scenarios (rate shock, equity crash). Reverse stress testing to find breaking points.',
          codeExample: `// Portfolio Stress Testing
@Service
public class StressTestingService {
    private final PortfolioService portfolio;
    private final PricingEngine pricing;

    // Historical scenario replay
    public StressTestResult runHistoricalScenario(String scenarioName) {
        Scenario scenario = scenarioRepository.get(scenarioName);
        // e.g., "2008_LEHMAN", "2020_COVID", "2022_RATE_SHOCK"

        Portfolio currentPortfolio = portfolio.getCurrentPortfolio();
        double basePV = pricing.calculatePV(currentPortfolio);

        // Apply historical shocks
        Map<String, Double> shocks = scenario.getShocks();
        double stressedPV = 0;

        for (Position pos : currentPortfolio.getPositions()) {
            Double shock = shocks.get(pos.getAssetClass());
            if (shock == null) shock = shocks.get("DEFAULT");

            double posValue = pos.getValue() * (1 + shock);
            stressedPV += posValue;
        }

        double pnlImpact = stressedPV - basePV;

        return new StressTestResult(scenarioName, basePV, stressedPV, pnlImpact);
    }

    // Hypothetical scenario
    public StressTestResult runHypotheticalScenario(HypotheticalScenario scenario) {
        Portfolio currentPortfolio = portfolio.getCurrentPortfolio();
        double basePV = pricing.calculatePV(currentPortfolio);

        // Apply rate shock
        double rateShockPnL = 0;
        if (scenario.getRateShock() != 0) {
            YieldCurve shockedCurve = curveService.shiftParallel(scenario.getRateShock());
            for (Position pos : currentPortfolio.getFixedIncomePositions()) {
                double dv01 = pos.calculateDV01();
                rateShockPnL += dv01 * scenario.getRateShock() * 10000;  // bps to %
            }
        }

        // Apply equity shock
        double equityShockPnL = currentPortfolio.getEquityExposure() * scenario.getEquityShock();

        // Apply credit spread shock
        double creditShockPnL = 0;
        for (Position pos : currentPortfolio.getCreditPositions()) {
            creditShockPnL += pos.getSpreadDuration() * scenario.getCreditSpreadShock();
        }

        double totalPnL = rateShockPnL + equityShockPnL + creditShockPnL;

        return new StressTestResult(scenario.getName(), basePV, basePV + totalPnL, totalPnL);
    }

    // Reverse stress test - find breaking point
    public double findBreakingPoint(String riskFactor, double maxLoss) {
        double low = 0, high = 0.5;  // Search range 0-50%

        while (high - low > 0.001) {
            double mid = (low + high) / 2;
            double loss = calculateLoss(riskFactor, mid);

            if (Math.abs(loss) > maxLoss) {
                high = mid;
            } else {
                low = mid;
            }
        }

        return (low + high) / 2;
    }
}` }
      ]
    },
    { id: 'regulatory', name: 'Regulatory Risk', icon: '📋', color: '#f59e0b', description: 'Compliance and regulatory requirements',
      details: [
        { name: 'Trade Reporting', diagram: TradeReportingDiagram, explanation: 'Report trades to regulators (TRACE, DTCC). Real-time reporting requirements. Trade reconstruction capability. Audit trail maintenance.',
          codeExample: `// Trade Reporting Service
@Service
public class TradeReportingService {
    private final ReportingGateway reportingGateway;

    @EventListener
    public void onTradeExecuted(TradeExecutedEvent event) {
        Trade trade = event.getTrade();

        // Build regulatory report
        TradeReport report = TradeReport.builder()
            .reportId(generateReportId())
            .tradeId(trade.getTradeId())
            .executionTime(trade.getExecutionTime())
            .symbol(trade.getSymbol())
            .quantity(trade.getQuantity())
            .price(trade.getPrice())
            .side(trade.getSide())
            .venue(trade.getVenue())
            .counterparty(trade.getCounterparty())
            .capacity(trade.getCapacity())  // Principal/Agency
            .build();

        // Submit to regulatory gateway
        CompletableFuture<ReportAck> ack = reportingGateway.submit(report);

        ack.thenAccept(a -> {
            if (a.isAccepted()) {
                log.info("Trade {} reported successfully", trade.getTradeId());
            } else {
                log.error("Trade report rejected: {}", a.getRejectReason());
                alertService.raise("REPORTING_FAILURE", trade.getTradeId());
            }
        });
    }
}` },
        { name: 'Best Execution', diagram: BestExecutionDiagram, explanation: 'Document execution quality. Compare to benchmarks (arrival price, VWAP). TCA (Transaction Cost Analysis). Regulatory requirement under MiFID II.',
          codeExample: `// Transaction Cost Analysis (TCA)
@Service
public class TCAService {
    private final MarketDataService marketData;

    public TCAReport analyzeExecution(Trade trade) {
        TCAReport report = new TCAReport(trade.getTradeId());

        // 1. Arrival Price - price when order was received
        BigDecimal arrivalPrice = marketData.getHistoricalMid(
            trade.getSymbol(), trade.getOrderTimestamp());

        // 2. VWAP - Volume Weighted Average Price during execution
        BigDecimal vwap = marketData.getVWAP(
            trade.getSymbol(),
            trade.getOrderTimestamp(),
            trade.getExecutionTimestamp()
        );

        // 3. Implementation Shortfall
        // (Execution Price - Arrival Price) * Quantity * Side
        BigDecimal implShortfall = trade.getExecutionPrice()
            .subtract(arrivalPrice)
            .multiply(BigDecimal.valueOf(trade.getQuantity()))
            .multiply(BigDecimal.valueOf(trade.getSide().getSign()));

        report.setArrivalPrice(arrivalPrice);
        report.setVwap(vwap);
        report.setImplementationShortfall(implShortfall);

        // 4. Slippage vs benchmarks
        BigDecimal arrivalSlippage = trade.getExecutionPrice()
            .subtract(arrivalPrice)
            .divide(arrivalPrice, 6, RoundingMode.HALF_UP);

        BigDecimal vwapSlippage = trade.getExecutionPrice()
            .subtract(vwap)
            .divide(vwap, 6, RoundingMode.HALF_UP);

        report.setArrivalSlippage(arrivalSlippage);
        report.setVwapSlippage(vwapSlippage);

        // 5. Market Impact estimation
        BigDecimal closePrice = marketData.getClose(
            trade.getSymbol(), trade.getExecutionTimestamp().toLocalDate());
        BigDecimal reversion = closePrice.subtract(trade.getExecutionPrice());
        report.setMarketImpact(reversion);

        // 6. Venue analysis
        report.setVenueBreakdown(analyzeVenues(trade));

        return report;
    }

    // Aggregate TCA for regulatory reporting (MiFID II)
    @Scheduled(cron = "0 0 6 * * *")  // Daily at 6 AM
    public void generateDailyTCAReport() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        List<Trade> trades = tradeRepository.getTradesForDate(yesterday);

        TCAAggregate aggregate = new TCAAggregate();
        for (Trade trade : trades) {
            TCAReport report = analyzeExecution(trade);
            aggregate.add(report);
        }

        // Generate regulatory report
        reportingService.submitBestExecutionReport(aggregate);
    }
}` }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null
  const buildBreadcrumbStack = () => { const stack = [{ name: 'eTrading', icon: '📈' }, { name: 'Risk Management', icon: '🛡️' }]; if (selectedConcept) stack.push({ name: selectedConcept.name, icon: selectedConcept.icon }); return stack }
  const handleBreadcrumbClick = (index) => { if (index === 0) onBack(); else if (index === 1 && selectedConcept) setSelectedConceptIndex(null) }

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) { setSelectedConceptIndex(selectedConceptIndex - 1); setSelectedDetailIndex(0) }
  }
  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) { setSelectedConceptIndex(selectedConceptIndex + 1); setSelectedDetailIndex(0) }
  }

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); selectedConcept ? setSelectedConceptIndex(null) : onBack() }
      else if (e.key === 'ArrowLeft' && selectedConcept) { e.preventDefault(); handlePreviousConcept() }
      else if (e.key === 'ArrowRight' && selectedConcept) { e.preventDefault(); handleNextConcept() }
    }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [selectedConcept, selectedConceptIndex, onBack])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #374151 50%, #0f172a 100%)', padding: '2rem', fontFamily: 'system-ui' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(135deg, #94a3b8, #64748b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Risk Management</h1>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.5rem', color: '#94a3b8', cursor: 'pointer' }}>← Back to eTrading</button>
      </div>
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}><Breadcrumb breadcrumbStack={buildBreadcrumbStack()} onBreadcrumbClick={handleBreadcrumbClick} colors={ETRADING_COLORS} /></div>
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
          <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '1rem', padding: '2rem', maxWidth: '1200px', maxHeight: '92vh', overflow: 'auto', border: `1px solid ${selectedConcept.color}40` }} onClick={(e) => e.stopPropagation()}>
            <Breadcrumb breadcrumbStack={buildBreadcrumbStack()} onBreadcrumbClick={handleBreadcrumbClick} colors={ETRADING_COLORS} />
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

export default RiskManagement

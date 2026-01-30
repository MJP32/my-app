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

// TWAP Execution Diagram
const TWAPDiagram = () => (
  <svg viewBox="0 0 700 250" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">TWAP - Time-Weighted Average Price</text>
    {/* Time axis */}
    <line x1="50" y1="200" x2="650" y2="200" stroke="#64748b" strokeWidth="2"/>
    <text x="350" y="230" textAnchor="middle" fill="#64748b" fontSize="12">Time →</text>
    {/* Equal slices */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i}>
        <rect x={70 + i * 95} y="100" width="80" height="90" fill="#3b82f6" opacity="0.8" rx="4"/>
        <text x={110 + i * 95} y="150" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Slice {i + 1}</text>
        <text x={110 + i * 95} y="170" textAnchor="middle" fill="white" fontSize="10">1000 shares</text>
        <line x1={70 + i * 95} y1="200" x2={70 + i * 95} y2="205" stroke="#64748b" strokeWidth="2"/>
        <text x={70 + i * 95} y="218" textAnchor="middle" fill="#64748b" fontSize="9">{i * 10}m</text>
      </g>
    ))}
    <text x="350" y="60" textAnchor="middle" fill="#4ade80" fontSize="12">Total: 6,000 shares over 60 minutes = Equal slices every 10 min</text>
  </svg>
)

// VWAP Execution Diagram
const VWAPDiagram = () => (
  <svg viewBox="0 0 700 280" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">VWAP - Volume-Weighted Average Price</text>
    {/* Volume profile (historical) */}
    <text x="100" y="55" textAnchor="middle" fill="#64748b" fontSize="11">Historical Volume Profile</text>
    {[20, 35, 50, 80, 60, 45, 70, 90, 55, 40].map((h, i) => (
      <rect key={i} x={50 + i * 60} y={180 - h} width="50" height={h} fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" rx="2"/>
    ))}
    {/* Order slices matching profile */}
    {[20, 35, 50, 80, 60, 45, 70, 90, 55, 40].map((h, i) => (
      <rect key={`order-${i}`} x={55 + i * 60} y={185 - h} width="40" height={h * 0.8} fill="#22c55e" opacity="0.9" rx="2"/>
    ))}
    <line x1="50" y1="180" x2="650" y2="180" stroke="#64748b" strokeWidth="1"/>
    <text x="350" y="220" textAnchor="middle" fill="#64748b" fontSize="11">Trading Day Timeline</text>
    <text x="80" y="200" fill="#64748b" fontSize="9">9:30</text>
    <text x="320" y="200" fill="#64748b" fontSize="9">12:00</text>
    <text x="600" y="200" fill="#64748b" fontSize="9">16:00</text>
    {/* Legend */}
    <rect x="250" y="240" width="20" height="12" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6"/>
    <text x="280" y="250" fill="#94a3b8" fontSize="10">Market Volume</text>
    <rect x="400" y="240" width="20" height="12" fill="#22c55e"/>
    <text x="430" y="250" fill="#94a3b8" fontSize="10">Our Orders</text>
  </svg>
)

// Smart Order Router Diagram
const SORDiagram = () => (
  <svg viewBox="0 0 700 300" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowSOR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Smart Order Router (SOR)</text>
    {/* Parent Order */}
    <rect x="280" y="45" width="140" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="350" y="68" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Parent Order</text>
    <text x="350" y="83" textAnchor="middle" fill="white" fontSize="10">10,000 shares</text>
    {/* SOR Engine */}
    <rect x="250" y="120" width="200" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="350" y="148" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Smart Order Router</text>
    <text x="350" y="165" textAnchor="middle" fill="white" fontSize="9">Analyzes liquidity, fees, latency</text>
    {/* Venues */}
    <rect x="50" y="220" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="245" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">NYSE</text>
    <text x="100" y="262" textAnchor="middle" fill="#bfdbfe" fontSize="9">4,000 shares</text>
    <rect x="200" y="220" width="100" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="250" y="245" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">NASDAQ</text>
    <text x="250" y="262" textAnchor="middle" fill="#bbf7d0" fontSize="9">3,500 shares</text>
    <rect x="350" y="220" width="100" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="400" y="245" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BATS</text>
    <text x="400" y="262" textAnchor="middle" fill="#fecaca" fontSize="9">1,500 shares</text>
    <rect x="500" y="220" width="100" height="60" rx="8" fill="#64748b" stroke="#94a3b8" strokeWidth="2"/>
    <text x="550" y="245" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Dark Pool</text>
    <text x="550" y="262" textAnchor="middle" fill="#e2e8f0" fontSize="9">1,000 shares</text>
    {/* Arrows */}
    <line x1="350" y1="95" x2="350" y2="115" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowSOR)"/>
    <line x1="280" y1="180" x2="120" y2="215" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowSOR)"/>
    <line x1="320" y1="180" x2="260" y2="215" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowSOR)"/>
    <line x1="380" y1="180" x2="400" y2="215" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowSOR)"/>
    <line x1="420" y1="180" x2="530" y2="215" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowSOR)"/>
  </svg>
)

// Implementation Shortfall Diagram
const ISDiagram = () => (
  <svg viewBox="0 0 700 250" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Implementation Shortfall Components</text>
    {/* Price line */}
    <line x1="80" y1="180" x2="620" y2="180" stroke="#64748b" strokeWidth="1" strokeDasharray="4"/>
    {/* Decision price */}
    <line x1="80" y1="80" x2="180" y2="80" stroke="#3b82f6" strokeWidth="3"/>
    <circle cx="130" cy="80" r="6" fill="#3b82f6"/>
    <text x="130" y="65" textAnchor="middle" fill="#60a5fa" fontSize="10">Decision Price</text>
    <text x="130" y="100" textAnchor="middle" fill="#60a5fa" fontSize="9">$100.00</text>
    {/* Arrival price */}
    <line x1="180" y1="100" x2="280" y2="100" stroke="#22c55e" strokeWidth="3"/>
    <circle cx="230" cy="100" r="6" fill="#22c55e"/>
    <text x="230" y="130" textAnchor="middle" fill="#4ade80" fontSize="10">Arrival Price</text>
    <text x="230" y="145" textAnchor="middle" fill="#4ade80" fontSize="9">$100.25</text>
    {/* Execution trajectory */}
    <path d="M 280 100 Q 350 120, 420 140 Q 490 155, 560 160" fill="none" stroke="#f59e0b" strokeWidth="3"/>
    <circle cx="350" cy="118" r="4" fill="#f59e0b"/>
    <circle cx="420" cy="140" r="4" fill="#f59e0b"/>
    <circle cx="490" cy="155" r="4" fill="#f59e0b"/>
    <circle cx="560" cy="160" r="6" fill="#f59e0b"/>
    <text x="420" y="175" textAnchor="middle" fill="#fbbf24" fontSize="10">Avg Execution: $100.75</text>
    {/* Cost breakdown */}
    <rect x="100" y="195" width="150" height="40" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444"/>
    <text x="175" y="213" textAnchor="middle" fill="#f87171" fontSize="10">Delay Cost: $0.25</text>
    <text x="175" y="228" textAnchor="middle" fill="#f87171" fontSize="9">(Arrival - Decision)</text>
    <rect x="280" y="195" width="150" height="40" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b"/>
    <text x="355" y="213" textAnchor="middle" fill="#fbbf24" fontSize="10">Market Impact: $0.50</text>
    <text x="355" y="228" textAnchor="middle" fill="#fbbf24" fontSize="9">(Exec - Arrival)</text>
    <rect x="460" y="195" width="150" height="40" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="535" y="213" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Total IS: $0.75</text>
    <text x="535" y="228" textAnchor="middle" fill="#f87171" fontSize="9">(75 bps)</text>
  </svg>
)

// TWAP Variants Diagram - Randomization
const TWAPVariantsDiagram = () => (
  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">TWAP Variants - Randomized Intervals</text>
    <line x1="50" y1="180" x2="650" y2="180" stroke="#64748b" strokeWidth="2"/>
    {/* Randomized slices with varying widths */}
    {[{ x: 60, w: 70 }, { x: 145, w: 85 }, { x: 250, w: 65 }, { x: 335, w: 90 }, { x: 445, w: 75 }, { x: 540, w: 80 }].map((slice, i) => (
      <g key={i}>
        <rect x={slice.x} y="90" width={slice.w} height="80" fill="#3b82f6" opacity="0.7" rx="4"/>
        <text x={slice.x + slice.w/2} y="135" textAnchor="middle" fill="white" fontSize="10">~{800 + Math.floor(Math.random() * 400)}</text>
        <line x1={slice.x} y1="180" x2={slice.x} y2="185" stroke="#f59e0b" strokeWidth="2"/>
      </g>
    ))}
    <text x="350" y="60" textAnchor="middle" fill="#f59e0b" fontSize="11">Random intervals ±20% prevent predictable patterns</text>
    <rect x="200" y="195" width="300" height="20" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b"/>
    <text x="350" y="209" textAnchor="middle" fill="#fbbf24" fontSize="10">Price limits + Participation caps applied</text>
  </svg>
)

// VWAP Real-time Tracking Diagram
const VWAPTrackingDiagram = () => (
  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Real-time VWAP Tracking</text>
    {/* Market VWAP line */}
    <path d="M 80 150 Q 200 140, 300 130 Q 400 125, 500 120 Q 580 115, 620 110" fill="none" stroke="#8b5cf6" strokeWidth="3"/>
    <text x="640" y="110" fill="#a78bfa" fontSize="10">Market VWAP</text>
    {/* Executed VWAP line */}
    <path d="M 80 155 Q 200 148, 300 138 Q 400 135, 500 128 Q 580 122, 620 118" fill="none" stroke="#22c55e" strokeWidth="3"/>
    <text x="640" y="125" fill="#4ade80" fontSize="10">Our VWAP</text>
    {/* Slippage indicator */}
    <rect x="500" y="150" width="120" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e"/>
    <text x="560" y="170" textAnchor="middle" fill="#4ade80" fontSize="10">Slippage: -2.3 bps</text>
    <text x="560" y="188" textAnchor="middle" fill="#4ade80" fontSize="9">Beating benchmark ✓</text>
    {/* Time axis */}
    <line x1="80" y1="180" x2="620" y2="180" stroke="#64748b" strokeWidth="1"/>
    <text x="80" y="195" fill="#64748b" fontSize="9">9:30</text>
    <text x="350" y="195" fill="#64748b" fontSize="9">12:00</text>
    <text x="620" y="195" fill="#64748b" fontSize="9">Now</text>
  </svg>
)

// Adaptive IS Diagram
const AdaptiveISDiagram = () => (
  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Adaptive Implementation Shortfall</text>
    {/* Volatility indicator */}
    <rect x="50" y="50" width="180" height="70" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444"/>
    <text x="140" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">High Volatility</text>
    <text x="140" y="95" textAnchor="middle" fill="#f87171" fontSize="10">→ More Aggressive</text>
    <text x="140" y="110" textAnchor="middle" fill="#f87171" fontSize="9">Reduce timing risk</text>
    {/* Normal */}
    <rect x="260" y="50" width="180" height="70" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e"/>
    <text x="350" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Normal Conditions</text>
    <text x="350" y="95" textAnchor="middle" fill="#4ade80" fontSize="10">→ Balanced</text>
    <text x="350" y="110" textAnchor="middle" fill="#4ade80" fontSize="9">Follow optimal trajectory</text>
    {/* Favorable */}
    <rect x="470" y="50" width="180" height="70" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6"/>
    <text x="560" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Favorable Move</text>
    <text x="560" y="95" textAnchor="middle" fill="#60a5fa" fontSize="10">→ Capture Alpha</text>
    <text x="560" y="110" textAnchor="middle" fill="#60a5fa" fontSize="9">Accelerate execution</text>
    {/* Trajectory adjustment */}
    <path d="M 100 160 Q 250 150, 350 170 Q 450 140, 600 155" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5"/>
    <path d="M 100 160 Q 250 145, 350 155 Q 450 165, 600 140" fill="none" stroke="#22c55e" strokeWidth="3"/>
    <text x="350" y="200" textAnchor="middle" fill="#64748b" fontSize="10">Trajectory adapts in real-time to market conditions</text>
  </svg>
)

// POV Volume Prediction Diagram
const VolumePredictionDiagram = () => (
  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Volume Prediction Model</text>
    {/* Historical pattern */}
    {[30, 45, 35, 25, 40, 55, 70, 85, 60, 50].map((h, i) => (
      <rect key={i} x={60 + i * 60} y={160 - h} width="25" height={h} fill="rgba(139, 92, 246, 0.5)" rx="2"/>
    ))}
    {/* Predicted overlay */}
    {[32, 48, 38, 28, 75, 60, 75, 90, 65, 55].map((h, i) => (
      <rect key={`pred-${i}`} x={90 + i * 60} y={160 - h} width="25" height={h} fill="rgba(34, 197, 94, 0.7)" rx="2"/>
    ))}
    <line x1="60" y1="160" x2="650" y2="160" stroke="#64748b" strokeWidth="1"/>
    {/* Event marker */}
    <circle cx="330" cy="50" r="15" fill="#f59e0b"/>
    <text x="330" y="55" textAnchor="middle" fill="white" fontSize="10">E</text>
    <text x="380" y="55" fill="#fbbf24" fontSize="10">Earnings Event</text>
    <line x1="330" y1="65" x2="330" y2="85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3"/>
    {/* Legend */}
    <rect x="200" y="180" width="15" height="12" fill="rgba(139, 92, 246, 0.5)"/>
    <text x="220" y="190" fill="#a78bfa" fontSize="10">Historical</text>
    <rect x="300" y="180" width="15" height="12" fill="rgba(34, 197, 94, 0.7)"/>
    <text x="320" y="190" fill="#4ade80" fontSize="10">Predicted (+event adj)</text>
  </svg>
)

// Dark Pool Access Diagram
const DarkPoolDiagram = () => (
  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="dpArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Dark Pool Access - Hidden Liquidity</text>
    {/* Order */}
    <rect x="50" y="80" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Parent Order</text>
    <text x="100" y="125" textAnchor="middle" fill="#bfdbfe" fontSize="9">50,000 shares</text>
    {/* IOI Matching */}
    <rect x="220" y="50" width="120" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b"/>
    <text x="280" y="72" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">IOI Matching</text>
    <text x="280" y="90" textAnchor="middle" fill="#fbbf24" fontSize="9">Indication of Interest</text>
    {/* Conditional Order */}
    <rect x="220" y="110" width="120" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="280" y="132" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Conditional</text>
    <text x="280" y="150" textAnchor="middle" fill="#a78bfa" fontSize="9">Min qty: 10,000</text>
    {/* Dark Pools */}
    <rect x="420" y="40" width="100" height="40" rx="6" fill="#64748b"/>
    <text x="470" y="65" textAnchor="middle" fill="white" fontSize="10">Sigma X</text>
    <rect x="420" y="90" width="100" height="40" rx="6" fill="#64748b"/>
    <text x="470" y="115" textAnchor="middle" fill="white" fontSize="10">UBS MTF</text>
    <rect x="420" y="140" width="100" height="40" rx="6" fill="#64748b"/>
    <text x="470" y="165" textAnchor="middle" fill="white" fontSize="10">Liquidnet</text>
    {/* Midpoint peg */}
    <rect x="560" y="80" width="100" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="610" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Midpoint Peg</text>
    <text x="610" y="122" textAnchor="middle" fill="#bbf7d0" fontSize="9">Zero spread</text>
    {/* Arrows */}
    <line x1="150" y1="110" x2="215" y2="85" stroke="#4ade80" strokeWidth="2" markerEnd="url(#dpArrow)"/>
    <line x1="150" y1="110" x2="215" y2="135" stroke="#4ade80" strokeWidth="2" markerEnd="url(#dpArrow)"/>
    <line x1="340" y1="75" x2="415" y2="60" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="340" y1="135" x2="415" y2="135" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="520" y1="110" x2="555" y2="110" stroke="#4ade80" strokeWidth="2" markerEnd="url(#dpArrow)"/>
  </svg>
)

// Anti-Gaming Protection Diagram
const AntiGamingDiagram = () => (
  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Latency Arbitrage Protection</text>
    {/* Timeline with randomized orders */}
    <line x1="80" y1="120" x2="620" y2="120" stroke="#64748b" strokeWidth="2"/>
    {/* Original predictable pattern */}
    <g opacity="0.4">
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={100 + i * 110} y="70" width="30" height="40" fill="#ef4444" rx="4"/>
      ))}
      <text x="350" y="60" textAnchor="middle" fill="#f87171" fontSize="10">❌ Predictable timing = Easy to game</text>
    </g>
    {/* Randomized pattern */}
    {[{ x: 95, d: 0 }, { x: 185, d: 15 }, { x: 310, d: -10 }, { x: 420, d: 20 }, { x: 545, d: -5 }].map((o, i) => (
      <rect key={`rand-${i}`} x={o.x + o.d} y="135" width="30" height="40" fill="#22c55e" rx="4"/>
    ))}
    <text x="350" y="195" textAnchor="middle" fill="#4ade80" fontSize="10">✓ Randomized timing + Speed bump venues</text>
    {/* Protection shield */}
    <rect x="550" y="130" width="80" height="50" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6"/>
    <text x="590" y="150" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">IEX</text>
    <text x="590" y="168" textAnchor="middle" fill="#60a5fa" fontSize="8">Speed Bump</text>
  </svg>
)

// POV Strategy Diagram
const POVDiagram = () => (
  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">POV - Percentage of Volume</text>
    {/* Market volume bars */}
    {[40, 60, 35, 80, 55, 90, 45, 70, 50, 65].map((h, i) => (
      <g key={i}>
        <rect x={60 + i * 60} y={170 - h} width="50" height={h} fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" rx="2"/>
        <rect x={65 + i * 60} y={170 - h * 0.1} width="40" height={h * 0.1} fill="#22c55e" rx="2"/>
      </g>
    ))}
    <line x1="60" y1="170" x2="660" y2="170" stroke="#64748b" strokeWidth="1"/>
    <text x="350" y="190" textAnchor="middle" fill="#64748b" fontSize="10">Market Volume (bar) vs Our Orders (10% participation)</text>
    {/* Participation rate indicator */}
    <rect x="500" y="40" width="120" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e"/>
    <text x="560" y="60" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Target: 10%</text>
    <text x="560" y="78" textAnchor="middle" fill="#4ade80" fontSize="9">of market volume</text>
  </svg>
)

function ExecutionAlgorithms({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'twap',
      name: 'TWAP Algorithm',
      icon: '⏱️',
      color: '#3b82f6',
      description: 'Time-Weighted Average Price execution strategy',
      diagram: TWAPDiagram,
      details: [
        {
          name: 'TWAP Strategy',
          diagram: TWAPDiagram,
          explanation: 'TWAP executes orders evenly over a specified time period. Divides total quantity into equal slices. Executes one slice per time interval. Minimizes timing risk by spreading execution. Simple to implement and understand.',
          codeExample: `// TWAP Algorithm Implementation
public class TWAPAlgorithm implements ExecutionAlgorithm {
    private final OrderService orderService;
    private final ScheduledExecutorService scheduler;

    @Override
    public AlgoExecution execute(AlgoOrder algoOrder) {
        long totalQuantity = algoOrder.getQuantity();
        Duration duration = algoOrder.getDuration();
        int numSlices = algoOrder.getNumSlices();

        // Calculate slice parameters
        long sliceQuantity = totalQuantity / numSlices;
        long intervalMs = duration.toMillis() / numSlices;

        AlgoExecution execution = new AlgoExecution(algoOrder);

        // Schedule slices
        for (int i = 0; i < numSlices; i++) {
            final int sliceNum = i;
            final long qty = (i == numSlices - 1)
                ? totalQuantity - (sliceQuantity * (numSlices - 1))  // Last slice gets remainder
                : sliceQuantity;

            scheduler.schedule(() -> {
                executeSlice(execution, sliceNum, qty);
            }, i * intervalMs, TimeUnit.MILLISECONDS);
        }

        return execution;
    }

    private void executeSlice(AlgoExecution execution, int sliceNum, long quantity) {
        Order childOrder = Order.builder()
            .parentOrderId(execution.getAlgoOrderId())
            .symbol(execution.getSymbol())
            .side(execution.getSide())
            .quantity(quantity)
            .orderType(OrderType.MARKET)  // or LIMIT with current price
            .build();

        try {
            orderService.submit(childOrder);
            execution.addChildOrder(childOrder);
            log.info("TWAP slice {} executed: {} shares", sliceNum, quantity);
        } catch (Exception e) {
            log.error("TWAP slice {} failed", sliceNum, e);
            execution.recordError(sliceNum, e);
        }
    }
}`
        },
        {
          name: 'TWAP Variants',
          diagram: TWAPVariantsDiagram,
          explanation: 'Enhanced TWAP variants improve execution quality. Randomized intervals prevent predictability. Price limits avoid unfavorable prices. Participation rate caps limit market impact. Volume-aware TWAP adjusts for market activity.',
          codeExample: `// Enhanced TWAP with Randomization and Price Limits
public class EnhancedTWAPAlgorithm implements ExecutionAlgorithm {
    private final Random random = new SecureRandom();

    @Override
    public AlgoExecution execute(AlgoOrder algoOrder) {
        TWAPConfig config = algoOrder.getTwapConfig();
        long intervalMs = config.getBaseIntervalMs();

        // Calculate randomization window (e.g., +/- 20% of interval)
        long randomWindow = (long) (intervalMs * config.getRandomizationFactor());

        AlgoExecution execution = new AlgoExecution(algoOrder);
        long cumulativeDelay = 0;

        for (int i = 0; i < config.getNumSlices(); i++) {
            final int sliceNum = i;

            // Randomize interval to prevent predictability
            long randomizedInterval = intervalMs +
                random.nextLong(-randomWindow, randomWindow);
            cumulativeDelay += randomizedInterval;

            scheduler.schedule(() -> {
                executeWithPriceLimit(execution, sliceNum, config);
            }, cumulativeDelay, TimeUnit.MILLISECONDS);
        }

        return execution;
    }

    private void executeWithPriceLimit(AlgoExecution execution, int slice, TWAPConfig config) {
        Quote quote = marketData.getQuote(execution.getSymbol());
        double currentPrice = execution.getSide() == Side.BUY
            ? quote.getAsk() : quote.getBid();

        // Check price limits
        if (config.hasLimitPrice()) {
            boolean priceOk = execution.getSide() == Side.BUY
                ? currentPrice <= config.getLimitPrice()
                : currentPrice >= config.getLimitPrice();

            if (!priceOk) {
                // Defer slice or use passive limit order
                deferSlice(execution, slice, config);
                return;
            }
        }

        // Check participation rate cap
        double currentParticipation = calculateParticipationRate(execution);
        if (currentParticipation > config.getMaxParticipationRate()) {
            // Slow down execution
            deferSlice(execution, slice, config);
            return;
        }

        submitSlice(execution, slice, config.getSliceQuantity());
    }
}`
        }
      ]
    },
    {
      id: 'vwap',
      name: 'VWAP Algorithm',
      icon: '📊',
      color: '#22c55e',
      description: 'Volume-Weighted Average Price execution strategy',
      diagram: VWAPDiagram,
      details: [
        {
          name: 'VWAP Strategy',
          diagram: VWAPDiagram,
          explanation: 'VWAP targets the volume-weighted average price. Uses historical volume profile to predict intraday volume. Executes more during high-volume periods. Benchmark for institutional execution quality. More complex than TWAP but better for liquid securities.',
          codeExample: `// VWAP Algorithm Implementation
public class VWAPAlgorithm implements ExecutionAlgorithm {
    private final VolumeProfileService volumeProfile;
    private final MarketDataService marketData;

    @Override
    public AlgoExecution execute(AlgoOrder algoOrder) {
        String symbol = algoOrder.getSymbol();
        long totalQuantity = algoOrder.getQuantity();

        // Get historical volume profile (% of daily volume per interval)
        double[] volumeProfile = volumeProfileService.getProfile(symbol);

        AlgoExecution execution = new AlgoExecution(algoOrder);

        // Calculate target quantity per interval
        int intervals = volumeProfile.length;
        long[] targetQuantities = new long[intervals];

        for (int i = 0; i < intervals; i++) {
            targetQuantities[i] = Math.round(totalQuantity * volumeProfile[i]);
        }

        // Adjust for rounding errors
        long sum = Arrays.stream(targetQuantities).sum();
        targetQuantities[intervals - 1] += (totalQuantity - sum);

        // Schedule execution for each interval
        scheduleIntervals(execution, targetQuantities);

        return execution;
    }

    private void scheduleIntervals(AlgoExecution execution, long[] targets) {
        Instant marketOpen = getMarketOpen();
        Duration intervalLength = Duration.ofMinutes(5);  // 5-minute intervals

        for (int i = 0; i < targets.length; i++) {
            if (targets[i] <= 0) continue;

            final int interval = i;
            final long targetQty = targets[i];

            Instant executeTime = marketOpen.plus(intervalLength.multipliedBy(i));

            scheduler.schedule(() -> {
                executeInterval(execution, interval, targetQty);
            }, Duration.between(Instant.now(), executeTime).toMillis(),
               TimeUnit.MILLISECONDS);
        }
    }

    private void executeInterval(AlgoExecution execution, int interval, long targetQty) {
        // Get current market data
        Quote quote = marketData.getQuote(execution.getSymbol());

        // Determine order type based on spread
        OrderType orderType = shouldUseLimitOrder(quote)
            ? OrderType.LIMIT
            : OrderType.MARKET;

        Order childOrder = Order.builder()
            .parentOrderId(execution.getAlgoOrderId())
            .symbol(execution.getSymbol())
            .side(execution.getSide())
            .quantity(targetQty)
            .orderType(orderType)
            .price(orderType == OrderType.LIMIT ? calculateLimitPrice(quote, execution.getSide()) : null)
            .build();

        orderService.submit(childOrder);
        execution.addChildOrder(childOrder);
    }
}`
        },
        {
          name: 'Real-time Tracking',
          diagram: VWAPTrackingDiagram,
          explanation: 'Track execution progress against VWAP benchmark. Calculate real-time VWAP from market data. Compare executed price to market VWAP. Adjust strategy if falling behind. Report slippage and execution quality.',
          codeExample: `// Real-time VWAP Tracking and Execution Quality
public class VWAPTracker {
    private final AtomicReference<VWAPState> state = new AtomicReference<>(new VWAPState());

    public void onMarketTrade(Trade trade) {
        state.updateAndGet(s -> s.withMarketTrade(trade));
    }

    public void onExecution(Fill fill) {
        state.updateAndGet(s -> s.withExecution(fill));
    }

    public VWAPMetrics getMetrics() {
        VWAPState current = state.get();
        return new VWAPMetrics(
            current.getMarketVWAP(),
            current.getExecutedVWAP(),
            current.getSlippageBps()
        );
    }

    @Value
    private static class VWAPState {
        double marketPriceVolume = 0;
        long marketVolume = 0;
        double executedPriceVolume = 0;
        long executedVolume = 0;

        VWAPState withMarketTrade(Trade trade) {
            return new VWAPState(
                marketPriceVolume + (trade.getPrice() * trade.getQuantity()),
                marketVolume + trade.getQuantity(),
                executedPriceVolume,
                executedVolume
            );
        }

        VWAPState withExecution(Fill fill) {
            return new VWAPState(
                marketPriceVolume,
                marketVolume,
                executedPriceVolume + (fill.getPrice() * fill.getQuantity()),
                executedVolume + fill.getQuantity()
            );
        }

        double getMarketVWAP() {
            return marketVolume > 0 ? marketPriceVolume / marketVolume : 0;
        }

        double getExecutedVWAP() {
            return executedVolume > 0 ? executedPriceVolume / executedVolume : 0;
        }

        double getSlippageBps() {
            if (marketVolume == 0 || executedVolume == 0) return 0;
            double marketVWAP = getMarketVWAP();
            double executedVWAP = getExecutedVWAP();
            return ((executedVWAP - marketVWAP) / marketVWAP) * 10000;
        }
    }
}`
        }
      ]
    },
    {
      id: 'implementation-shortfall',
      name: 'Implementation Shortfall',
      icon: '📉',
      color: '#ef4444',
      description: 'Minimize total cost of execution including market impact',
      diagram: ISDiagram,
      details: [
        {
          name: 'IS Strategy',
          diagram: ISDiagram,
          explanation: 'Implementation Shortfall (IS) minimizes total execution cost. Balances timing risk against market impact. More aggressive execution reduces timing risk. Slower execution reduces market impact. Optimal trajectory depends on volatility and urgency.',
          codeExample: `// Implementation Shortfall Algorithm
public class ISAlgorithm implements ExecutionAlgorithm {
    private final MarketImpactModel impactModel;
    private final VolatilityService volatilityService;

    @Override
    public AlgoExecution execute(AlgoOrder algoOrder) {
        // Get market parameters
        double volatility = volatilityService.getVolatility(algoOrder.getSymbol());
        double avgDailyVolume = marketData.getADV(algoOrder.getSymbol());
        double participationRate = algoOrder.getQuantity() / avgDailyVolume;

        // Calculate optimal trajectory using Almgren-Chriss model
        double riskAversion = algoOrder.getRiskAversion();  // Client parameter
        OptimalTrajectory trajectory = calculateOptimalTrajectory(
            algoOrder.getQuantity(),
            algoOrder.getDuration(),
            volatility,
            riskAversion,
            impactModel
        );

        return executeTrajectory(algoOrder, trajectory);
    }

    private OptimalTrajectory calculateOptimalTrajectory(
            long quantity, Duration horizon, double volatility,
            double riskAversion, MarketImpactModel impact) {

        // Almgren-Chriss optimal execution
        // Trade-off between timing risk and market impact

        double T = horizon.toMinutes() / 390.0;  // Trading day = 390 minutes
        double sigma = volatility;
        double eta = impact.getTemporaryImpact();
        double gamma = impact.getPermanentImpact();

        // Optimal participation rate
        double kappa = Math.sqrt(riskAversion * sigma * sigma / eta);

        // Generate trajectory
        int numIntervals = (int) horizon.toMinutes() / 5;
        double[] holdings = new double[numIntervals + 1];
        holdings[0] = quantity;

        for (int i = 1; i <= numIntervals; i++) {
            double t = i * 5.0 / 390.0;
            holdings[i] = quantity * Math.sinh(kappa * (T - t)) / Math.sinh(kappa * T);
        }

        // Convert to trade schedule
        long[] tradeSchedule = new long[numIntervals];
        for (int i = 0; i < numIntervals; i++) {
            tradeSchedule[i] = Math.round(holdings[i] - holdings[i + 1]);
        }

        return new OptimalTrajectory(tradeSchedule);
    }
}`
        },
        {
          name: 'Adaptive IS',
          diagram: AdaptiveISDiagram,
          explanation: 'Adapt execution based on real-time conditions. Monitor market volatility and adjust aggression. React to favorable/unfavorable price movements. Capture alpha when price moves in our favor. Slow down when adverse selection detected.',
          codeExample: `// Adaptive Implementation Shortfall Algorithm
public class AdaptiveISAlgorithm implements ExecutionAlgorithm {
    private final VolatilityEstimator volatilityEstimator;
    private final AdverseSelectionDetector adverseDetector;

    @Override
    public void onMarketUpdate(AlgoExecution execution, MarketUpdate update) {
        // Recalculate optimal trajectory based on current conditions
        double currentVol = volatilityEstimator.getRealizedVolatility();
        double baselineVol = execution.getBaselineVolatility();

        // Adjust aggression based on volatility regime
        double volRatio = currentVol / baselineVol;
        double adjustedAggression = calculateAdjustedAggression(
            execution.getBaseAggression(), volRatio);

        // Check for favorable price movement
        double priceMove = calculatePriceMove(execution, update);
        if (isFavorableMove(execution.getSide(), priceMove)) {
            // Capture alpha - be more aggressive
            adjustedAggression *= 1.5;
            log.info("Favorable price move detected, increasing aggression");
        }

        // Check for adverse selection
        if (adverseDetector.detectAdverseSelection(execution, update)) {
            // Slow down to avoid information leakage
            adjustedAggression *= 0.5;
            log.warn("Adverse selection detected, reducing aggression");
        }

        // Update execution trajectory
        execution.updateAggression(adjustedAggression);
        rescheduleRemaining(execution);
    }

    private double calculateAdjustedAggression(double base, double volRatio) {
        // Higher volatility -> more aggressive (reduce timing risk)
        // Lower volatility -> less aggressive (reduce market impact)
        if (volRatio > 1.5) {
            return base * 1.3;  // High vol regime
        } else if (volRatio < 0.7) {
            return base * 0.7;  // Low vol regime
        }
        return base;
    }

    private boolean isFavorableMove(Side side, double priceMove) {
        // For BUY: price dropping is favorable
        // For SELL: price rising is favorable
        return (side == Side.BUY && priceMove < -0.001) ||
               (side == Side.SELL && priceMove > 0.001);
    }
}`
        }
      ]
    },
    {
      id: 'pov',
      name: 'POV Algorithm',
      icon: '📈',
      color: '#8b5cf6',
      description: 'Percentage of Volume participation strategy',
      details: [
        {
          name: 'POV Strategy',
          diagram: POVDiagram,
          explanation: 'POV executes as a fixed percentage of market volume. Participates in a specified fraction of trades. Adapts to market activity automatically. Simple to explain and monitor. Commonly used participation rates: 5%, 10%, 20%.',
          codeExample: `// POV (Percentage of Volume) Algorithm
public class POVAlgorithm implements ExecutionAlgorithm {
    private final MarketDataService marketData;
    private final double targetParticipationRate;

    public POVAlgorithm(double participationRate) {
        this.targetParticipationRate = participationRate;  // e.g., 0.10 for 10%
    }

    @Override
    public AlgoExecution execute(AlgoOrder algoOrder) {
        AlgoExecution execution = new AlgoExecution(algoOrder);

        // Subscribe to real-time volume updates
        marketData.subscribeToTrades(algoOrder.getSymbol(), trade -> {
            onMarketTrade(execution, trade);
        });

        return execution;
    }

    private void onMarketTrade(AlgoExecution execution, Trade marketTrade) {
        if (execution.isComplete()) {
            return;
        }

        // Calculate how much we should have traded
        long marketVolume = execution.getMarketVolumeSinceStart();
        long targetVolume = Math.round(marketVolume * targetParticipationRate);
        long executedVolume = execution.getFilledQuantity();

        // Calculate shortfall
        long shortfall = targetVolume - executedVolume;

        if (shortfall > getMinOrderSize()) {
            // We're behind - need to catch up
            submitOrder(execution, Math.min(shortfall, getMaxOrderSize()));
        }

        // Check if we've reached total quantity
        if (executedVolume >= execution.getTotalQuantity()) {
            execution.complete();
        }
    }

    private void submitOrder(AlgoExecution execution, long quantity) {
        // Ensure we don't exceed remaining quantity
        long remaining = execution.getTotalQuantity() - execution.getFilledQuantity();
        quantity = Math.min(quantity, remaining);

        Order order = Order.builder()
            .parentOrderId(execution.getAlgoOrderId())
            .symbol(execution.getSymbol())
            .side(execution.getSide())
            .quantity(quantity)
            .orderType(OrderType.LIMIT)
            .price(calculatePassivePrice(execution))
            .timeInForce(TimeInForce.IOC)
            .build();

        orderService.submit(order);
        execution.addChildOrder(order);
    }
}`
        },
        {
          name: 'Volume Prediction',
          diagram: VolumePredictionDiagram,
          explanation: 'Predict volume to proactively place orders. Historical volume patterns by time of day. Event-driven volume spikes (earnings, news). Intraday volume forecasting models. Balance reactive vs predictive execution.',
          codeExample: `// Volume Prediction Service for Execution Algorithms
@Service
public class VolumePredictionService {
    private final HistoricalDataService historicalData;
    private final EventCalendarService eventCalendar;

    public VolumeProfile predictVolume(String symbol, LocalDate date) {
        // Get baseline historical profile
        double[] baselineProfile = historicalData.getAverageVolumeProfile(symbol, 20);

        // Check for scheduled events (earnings, dividends, index rebalance)
        List<Event> events = eventCalendar.getEvents(symbol, date);
        double eventMultiplier = calculateEventMultiplier(events);

        // Adjust for day of week effects
        DayOfWeek dow = date.getDayOfWeek();
        double dowMultiplier = getDayOfWeekMultiplier(symbol, dow);

        // Build predicted profile
        double[] predictedProfile = new double[baselineProfile.length];
        for (int i = 0; i < baselineProfile.length; i++) {
            predictedProfile[i] = baselineProfile[i] * eventMultiplier * dowMultiplier;

            // Apply U-shaped intraday pattern adjustment
            predictedProfile[i] *= getIntradayPatternFactor(i, baselineProfile.length);
        }

        // Normalize to sum to 1.0
        double sum = Arrays.stream(predictedProfile).sum();
        for (int i = 0; i < predictedProfile.length; i++) {
            predictedProfile[i] /= sum;
        }

        return new VolumeProfile(predictedProfile);
    }

    private double calculateEventMultiplier(List<Event> events) {
        double multiplier = 1.0;
        for (Event event : events) {
            switch (event.getType()) {
                case EARNINGS -> multiplier *= 2.5;
                case INDEX_REBALANCE -> multiplier *= 1.8;
                case EX_DIVIDEND -> multiplier *= 1.3;
                case OPTIONS_EXPIRY -> multiplier *= 1.5;
            }
        }
        return multiplier;
    }

    private double getIntradayPatternFactor(int interval, int totalIntervals) {
        // U-shaped pattern: higher volume at open and close
        double position = (double) interval / totalIntervals;
        // Parabola with minimum at midday
        return 1.0 + 0.5 * (4 * Math.pow(position - 0.5, 2));
    }
}`
        }
      ]
    },
    {
      id: 'smart-order-routing',
      name: 'Smart Order Routing',
      icon: '🔀',
      color: '#f59e0b',
      description: 'Intelligent order routing across multiple venues',
      diagram: SORDiagram,
      details: [
        {
          name: 'SOR Logic',
          explanation: 'Smart Order Router finds best execution across venues. Considers visible and hidden liquidity. Accounts for fees, rebates, and latency. Supports multiple routing strategies. Real-time venue connectivity monitoring.',
          codeExample: `// Smart Order Router
@Service
public class SmartOrderRouter {
    private final List<VenueConnector> venues;
    private final MarketDataAggregator marketData;
    private final FeeScheduleService feeService;

    public RoutingPlan route(Order order) {
        // Aggregate order books from all venues
        Map<String, OrderBook> books = marketData.getOrderBooks(order.getSymbol());

        // Calculate effective price at each venue (including fees)
        List<VenueOpportunity> opportunities = new ArrayList<>();

        for (Map.Entry<String, OrderBook> entry : books.entrySet()) {
            String venue = entry.getKey();
            OrderBook book = entry.getValue();

            // Get available liquidity at each price level
            List<PriceLevel> levels = order.getSide() == Side.BUY
                ? book.getAsks()
                : book.getBids();

            for (PriceLevel level : levels) {
                double effectivePrice = calculateEffectivePrice(
                    level.getPrice(), venue, order);

                opportunities.add(new VenueOpportunity(
                    venue,
                    level.getPrice(),
                    effectivePrice,
                    level.getQuantity()
                ));
            }
        }

        // Sort by effective price
        opportunities.sort(Comparator.comparing(
            VenueOpportunity::getEffectivePrice,
            order.getSide() == Side.BUY
                ? Comparator.naturalOrder()
                : Comparator.reverseOrder()
        ));

        // Build routing plan
        return buildRoutingPlan(order, opportunities);
    }

    private double calculateEffectivePrice(double price, String venue, Order order) {
        FeeSchedule fees = feeService.getFees(venue, order.getSymbol());

        double feePerShare = order.getSide() == Side.BUY
            ? fees.getTakerFee()
            : -fees.getMakerRebate();

        return price + feePerShare;
    }

    private RoutingPlan buildRoutingPlan(Order order, List<VenueOpportunity> opportunities) {
        RoutingPlan plan = new RoutingPlan(order);
        long remaining = order.getQuantity();

        for (VenueOpportunity opp : opportunities) {
            if (remaining <= 0) break;

            long fillQty = Math.min(remaining, opp.getAvailableQuantity());
            plan.addRoute(opp.getVenue(), opp.getPrice(), fillQty);
            remaining -= fillQty;
        }

        return plan;
    }
}`
        },
        {
          name: 'Dark Pool Access',
          diagram: DarkPoolDiagram,
          explanation: 'Access hidden liquidity in dark pools. IOI (Indication of Interest) matching. Conditional orders and pegged orders. Minimize information leakage. Balance dark vs lit venue allocation.',
          codeExample: `// Dark Pool Access and IOI Management
@Service
public class DarkPoolRouter {
    private final List<DarkPoolConnector> darkPools;
    private final IOIManager ioiManager;

    public DarkPoolResult seekLiquidity(Order parentOrder) {
        DarkPoolResult result = new DarkPoolResult(parentOrder);

        // First, check for matching IOIs
        List<IOI> matchingIOIs = ioiManager.findMatches(
            parentOrder.getSymbol(),
            parentOrder.getSide().opposite(),
            parentOrder.getQuantity()
        );

        for (IOI ioi : matchingIOIs) {
            // Send conditional order to dark pool
            ConditionalOrder conditional = ConditionalOrder.builder()
                .symbol(parentOrder.getSymbol())
                .side(parentOrder.getSide())
                .quantity(Math.min(parentOrder.getRemainingQty(), ioi.getQuantity()))
                .venue(ioi.getVenue())
                .minFillQuantity(ioi.getMinQty())
                .pegType(PegType.MIDPOINT)  // Peg to NBBO midpoint
                .build();

            result.addConditionalOrder(conditional);
        }

        // Also post to dark pools proactively
        for (DarkPoolConnector pool : darkPools) {
            if (!pool.isEnabled() || pool.getFillRate() < 0.05) continue;

            // Calculate allocation based on historical fill rates
            long allocation = calculateAllocation(parentOrder, pool);

            MidpointPeggedOrder peggedOrder = MidpointPeggedOrder.builder()
                .symbol(parentOrder.getSymbol())
                .side(parentOrder.getSide())
                .quantity(allocation)
                .minQty(getMinimumBlockSize(parentOrder.getSymbol()))
                .maxDistanceFromMid(0.001)  // Max 10 bps from mid
                .antiGaming(true)
                .build();

            pool.submit(peggedOrder);
            result.addPeggedOrder(pool.getName(), peggedOrder);
        }

        return result;
    }

    private long calculateAllocation(Order order, DarkPoolConnector pool) {
        // Allocate based on historical fill rates and latency
        double fillRate = pool.getFillRate();
        double latencyScore = 1.0 / (1.0 + pool.getAverageLatencyMs() / 100.0);
        double score = fillRate * latencyScore;

        return Math.round(order.getRemainingQty() * score * 0.3); // Max 30% per venue
    }
}`
        },
        {
          name: 'Latency Arbitrage Protection',
          diagram: AntiGamingDiagram,
          explanation: 'Protect against faster traders. Randomize order timing. Use anti-gaming logic. Detect adverse selection patterns. Choose venues with speed bump protection.',
          codeExample: `// Latency Arbitrage Protection
@Service
public class AntiGamingService {
    private final Random random = new SecureRandom();
    private final AdverseSelectionTracker adverseTracker;

    public void applyProtection(Order order, RoutingPlan plan) {
        // 1. Randomize order timing
        randomizeTimings(plan);

        // 2. Use venues with speed bumps when available
        prioritizeSpeedBumpVenues(plan);

        // 3. Apply order randomization
        randomizeOrderCharacteristics(order);
    }

    private void randomizeTimings(RoutingPlan plan) {
        for (RouteEntry entry : plan.getRoutes()) {
            // Add random delay (0-50ms) to prevent predictable patterns
            long delay = random.nextLong(0, 50);
            entry.setDelayMs(delay);

            // Randomize the sequence of venue submissions
            entry.setSequenceOrder(random.nextInt(1000));
        }

        // Re-sort by randomized sequence
        plan.sortBySequence();
    }

    private void prioritizeSpeedBumpVenues(RoutingPlan plan) {
        // Prefer venues with latency equalization (IEX, etc.)
        plan.getRoutes().forEach(route -> {
            VenueCharacteristics venue = getVenueCharacteristics(route.getVenue());
            if (venue.hasSpeedBump()) {
                route.setPriorityBoost(0.1);  // 10% better effective price
            }
        });
    }

    private void randomizeOrderCharacteristics(Order order) {
        // Randomize quantity slightly to avoid round number detection
        if (order.getQuantity() > 100) {
            long variance = random.nextLong(-10, 10);
            order.setQuantity(order.getQuantity() + variance);
        }
    }

    public boolean detectAdverseSelection(String symbol, Fill fill) {
        // Track fills and subsequent price movements
        adverseTracker.recordFill(fill);

        // Calculate percentage of fills followed by adverse price move
        double adverseRate = adverseTracker.getAdverseSelectionRate(symbol);

        if (adverseRate > 0.6) {  // 60% of fills followed by adverse move
            log.warn("High adverse selection detected for {}: {}%",
                symbol, adverseRate * 100);
            return true;
        }
        return false;
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
      { name: 'Execution Algorithms', icon: '🎯', page: 'Execution Algorithms' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #7f1d1d 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #f87171, #ef4444)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '0.5rem',
    color: '#f87171',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Execution Algorithms</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
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
                  {/* Render subtopic-specific diagram if available */}
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

export default ExecutionAlgorithms

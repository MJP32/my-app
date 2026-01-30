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

// Treasury Trading Diagram
const TreasuryTradingDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">US Treasury Electronic Trading</text>
    <rect x="50" y="50" width="120" height="60" rx="6" fill="#3b82f6"/>
    <text x="110" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Primary Dealer</text>
    <text x="110" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="8">Fed auctions</text>
    <rect x="220" y="50" width="120" height="60" rx="6" fill="#22c55e"/>
    <text x="280" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">D2D Platforms</text>
    <text x="280" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="8">BrokerTec, eSpeed</text>
    <rect x="390" y="50" width="120" height="60" rx="6" fill="#f59e0b"/>
    <text x="450" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">D2C Platforms</text>
    <text x="450" y="95" textAnchor="middle" fill="#fef3c7" fontSize="8">Tradeweb, Bloomberg</text>
    <rect x="560" y="50" width="100" height="60" rx="6" fill="#8b5cf6"/>
    <text x="610" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Buy-Side</text>
    <text x="610" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="8">Asset Managers</text>
    <line x1="170" y1="80" x2="215" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="340" y1="80" x2="385" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="510" y1="80" x2="555" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <rect x="150" y="140" width="400" height="40" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6"/>
    <text x="350" y="165" textAnchor="middle" fill="#60a5fa" fontSize="10">Price quoted in 32nds: 99-16+ = 99 + 16.25/32 = 99.5078%</text>
  </svg>
)

// Credit Trading Diagram
const CreditTradingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Corporate Bond Trading Workflow</text>
    <rect x="50" y="50" width="100" height="50" rx="4" fill="#3b82f6"/>
    <text x="100" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">RFQ</text>
    <rect x="180" y="50" width="100" height="50" rx="4" fill="#f59e0b"/>
    <text x="230" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Pricing</text>
    <rect x="310" y="50" width="100" height="50" rx="4" fill="#22c55e"/>
    <text x="360" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Quote</text>
    <rect x="440" y="50" width="100" height="50" rx="4" fill="#8b5cf6"/>
    <text x="490" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Trade</text>
    <rect x="570" y="50" width="100" height="50" rx="4" fill="#ef4444"/>
    <text x="620" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Settle</text>
    <line x1="150" y1="75" x2="175" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="280" y1="75" x2="305" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="410" y1="75" x2="435" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="540" y1="75" x2="565" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="10">Spread to benchmark: +150bps over 5Y Treasury</text>
  </svg>
)

// Rates Swaps Diagram
const RatesSwapsDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Interest Rate Swap Structure</text>
    <rect x="100" y="60" width="150" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="175" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Party A</text>
    <text x="175" y="110" textAnchor="middle" fill="#bfdbfe" fontSize="9">Pays Fixed 3%</text>
    <rect x="450" y="60" width="150" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="525" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Party B</text>
    <text x="525" y="110" textAnchor="middle" fill="#bbf7d0" fontSize="9">Pays SOFR Float</text>
    <line x1="250" y1="80" x2="450" y2="80" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="450" y1="110" x2="250" y2="110" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9">Fixed 3% →</text>
    <text x="350" y="125" textAnchor="middle" fill="#a78bfa" fontSize="9">← SOFR + spread</text>
    <text x="350" y="165" textAnchor="middle" fill="#64748b" fontSize="10">Notional: $100M | Tenor: 5Y | DV01: $45,000</text>
  </svg>
)

// Treasury Instruments Diagram
const TreasuryInstrumentsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">US Treasury Instruments</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="#22c55e"/>
    <text x="140" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">T-Bills</text>
    <text x="140" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">&lt;1 Year | Zero Coupon</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="#3b82f6"/>
    <text x="350" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">T-Notes</text>
    <text x="350" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">2-10 Years | Semi-Annual</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="#8b5cf6"/>
    <text x="560" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">T-Bonds</text>
    <text x="560" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">20-30 Years | Semi-Annual</text>
    <text x="350" y="130" textAnchor="middle" fill="#f59e0b" fontSize="10">Quote: 99-16+ = 99 + 16.25/32 = 99.5078%</text>
  </svg>
)

// Yield Calculation Diagram
const YieldCalcDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Yield Curve Key Rates</text>
    {['2Y', '5Y', '10Y', '30Y'].map((tenor, i) => (
      <g key={i}>
        <rect x={80 + i * 150} y="50" width="120" height="60" rx="4" fill={['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6'][i]}/>
        <text x={140 + i * 150} y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{tenor}</text>
        <text x={140 + i * 150} y="95" textAnchor="middle" fill="white" fontSize="9">{[4.25, 4.15, 4.35, 4.55][i]}%</text>
      </g>
    ))}
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">YTM: Newton-Raphson iteration | Day Count: Actual/Actual</text>
  </svg>
)

// Treasury Market Making Diagram
const TreasuryMMDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Treasury Market Making</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">On-The-Run</text>
    <text x="140" y="90" textAnchor="middle" fill="#86efac" fontSize="8">Spread: 0.5/32nd</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Off-The-Run</text>
    <text x="350" y="90" textAnchor="middle" fill="#fcd34d" fontSize="8">Spread: 1.5/32nds</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Inventory Skew</text>
    <text x="560" y="90" textAnchor="middle" fill="#fca5a5" fontSize="8">Position-based adj</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Primary Dealers: Fed auction access | Continuous two-way markets</text>
  </svg>
)

// IRS Fundamentals Diagram
const IRSFundamentalsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`IRS Standard Tenors & Conventions`}</text>
    {['2Y', '5Y', '10Y', '30Y'].map((tenor, i) => (
      <g key={i}>
        <rect x={80 + i * 150} y="50" width="120" height="55" rx="4" fill={['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6'][i]}/>
        <text x={140 + i * 150} y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{tenor} Swap</text>
        <text x={140 + i * 150} y="90" textAnchor="middle" fill="white" fontSize="8">DV01: ${[9, 23, 45, 120][i]}K</text>
      </g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Fixed: 30/360 Semi | Float: ACT/360 Quarterly | Notional: $10M-$500M</text>
  </svg>
)

// SOFR Transition Diagram
const SOFRDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">SOFR vs LIBOR Transition</text>
    <rect x="50" y="50" width="280" height="60" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="190" y="75" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">LIBOR (Deprecated)</text>
    <text x="190" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">Survey-based | Credit risk | Manipulation risk</text>
    <rect x="370" y="50" width="280" height="60" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="510" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">SOFR (Current Standard)</text>
    <text x="510" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">Transaction-based | O/N repo | ~$1T daily</text>
    <line x1="330" y1="80" x2="365" y2="80" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="9">Compounded SOFR in arrears | Lookback: 2 days | Payment delay: 2 days</text>
  </svg>
)

// Curve Construction Diagram
const CurveConstructionDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">SOFR Curve Bootstrapping</text>
    <rect x="50" y="50" width="150" height="55" rx="4" fill="#22c55e"/>
    <text x="125" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">O/N-3M: Deposits</text>
    <text x="125" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Direct quotes</text>
    <rect x="220" y="50" width="150" height="55" rx="4" fill="#3b82f6"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">3M-2Y: Futures</text>
    <text x="295" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">SOFR futures strip</text>
    <rect x="390" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="465" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">2Y-50Y: Swaps</text>
    <text x="465" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Market swap rates</text>
    <rect x="560" y="50" width="100" height="55" rx="4" fill="#8b5cf6"/>
    <text x="610" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Interpolate</text>
    <text x="610" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">Cubic spline</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Dual-curve: Separate discount (OIS) and projection (SOFR) curves</text>
  </svg>
)

// D2C Platform Diagram
const D2CDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Dealer-to-Client (D2C) Platforms</text>
    <rect x="50" y="50" width="140" height="55" rx="4" fill="#3b82f6"/>
    <text x="120" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Tradeweb</text>
    <text x="120" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Multi-dealer RFQ</text>
    <rect x="210" y="50" width="140" height="55" rx="4" fill="#f59e0b"/>
    <text x="280" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Bloomberg</text>
    <text x="280" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">TSOX/TOMS</text>
    <rect x="370" y="50" width="140" height="55" rx="4" fill="#22c55e"/>
    <text x="440" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MarketAxess</text>
    <text x="440" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">All-to-all credit</text>
    <rect x="530" y="50" width="130" height="55" rx="4" fill="#8b5cf6"/>
    <text x="595" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">ICE Bonds</text>
    <text x="595" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">Fixed income</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Multi-dealer competition | Best execution | Audit trail</text>
  </svg>
)

// D2D Platform Diagram
const D2DDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Dealer-to-Dealer (D2D) Venues</text>
    <rect x="100" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="200" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BrokerTec (CME)</text>
    <text x="200" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Treasury CLOB | Anonymous</text>
    <rect x="400" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="500" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">eSpeed (Nasdaq)</text>
    <text x="500" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Treasury CLOB | Anonymous</text>
    <line x1="300" y1="77" x2="395" y2="77" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Central Limit Order Book | Sub-millisecond matching | Voice for illiquid</text>
  </svg>
)

// SEF Trading Diagram
const SEFDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">SEF (Swap Execution Facility) Trading</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">MAT Swaps</text>
    <text x="140" y="90" textAnchor="middle" fill="#86efac" fontSize="8">Must trade on SEF</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">RFQ Protocol</text>
    <text x="350" y="90" textAnchor="middle" fill="#93c5fd" fontSize="8">Min 3 dealers for block</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">SDR Reporting</text>
    <text x="560" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="8">Within 15 minutes</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Dodd-Frank mandate | USD IRS 2Y-30Y | Standard swaps</text>
  </svg>
)

// DV01 Diagram
const DV01Diagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">DV01 / PV01 Risk Measure</text>
    <rect x="50" y="50" width="280" height="60" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="190" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">DV01 = ΔP for 1bp yield change</text>
    <text x="190" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">$10M 10Y @ 4%: DV01 ≈ $8,000</text>
    <rect x="370" y="50" width="280" height="60" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="510" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Key Rate DV01</text>
    <text x="510" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">2Y, 5Y, 10Y, 30Y buckets</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">{`Additive across positions | Used for hedging & limits | Parallel vs bucket risk`}</text>
  </svg>
)

// Duration Convexity Diagram
const DurationConvexityDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Duration & Convexity`}</text>
    <rect x="50" y="50" width="200" height="60" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Modified Duration</text>
    <text x="150" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">%ΔP / Δy (linear approx)</text>
    <rect x="270" y="50" width="200" height="60" rx="4" fill="#22c55e"/>
    <text x="370" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Convexity</text>
    <text x="370" y="92" textAnchor="middle" fill="#bbf7d0" fontSize="8">Curvature correction</text>
    <rect x="490" y="50" width="160" height="60" rx="4" fill="#f59e0b"/>
    <text x="570" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Effective</text>
    <text x="570" y="92" textAnchor="middle" fill="#fef3c7" fontSize="8">For optionality</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">ΔP/P ≈ -D×Δy + 0.5×C×(Δy)² | Duration matching for hedges</text>
  </svg>
)

// VaR Diagram
const FIVaRDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Fixed Income VaR Methods</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Parametric VaR</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">DV01 × σ × z-score</text>
    <rect x="270" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="370" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Historical Simulation</text>
    <text x="370" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Actual scenarios</text>
    <rect x="490" y="50" width="160" height="55" rx="4" fill="#ef4444"/>
    <text x="570" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Stress Testing</text>
    <text x="570" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">+100bp, 2008 crisis</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">99% 1-day VaR | Yield curve scenarios | Parallel + twist + butterfly</text>
  </svg>
)

function FixedIncomeTrading({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'us-treasuries',
      name: 'US Treasury Trading',
      icon: '🏛️',
      color: '#3b82f6',
      description: 'Electronic trading of US Treasury securities - bills, notes, and bonds',
      diagram: TreasuryTradingDiagram,
      details: [
        {
          name: 'Treasury Instruments',
          diagram: TreasuryInstrumentsDiagram,
          explanation: 'US Treasuries are the most liquid fixed income securities globally. T-Bills (< 1 year), T-Notes (2-10 years), and T-Bonds (20-30 years). Trading is quoted in 32nds of a percent. The 10-year note is the benchmark for US rates. Primary dealers have direct access to Fed auctions.',
          codeExample: `// Treasury Price Representation
public class TreasuryPrice {
    private int handle;      // Whole number part (e.g., 99)
    private int ticks;       // 32nds (0-31)
    private int eighths;     // Eighths of 32nds (0, 2, 4, 6 = +, 1/4, 1/2, 3/4)

    // Parse price string like "99-16+" or "100-08 1/2"
    public static TreasuryPrice parse(String priceStr) {
        // "99-16+" means 99 and 16.25/32 = 99.5078125%
        // Implementation handles various formats
    }

    public double toDecimal() {
        return handle + (ticks + eighths / 8.0) / 32.0;
    }

    public String toTradewebFormat() {
        // Format: handle-ticks[+|1/4|1/2|3/4]
        String suffix = "";
        switch (eighths) {
            case 2: suffix = "+"; break;      // 1/4 of a 32nd
            case 4: suffix = " 1/2"; break;   // 1/2 of a 32nd
            case 6: suffix = " 3/4"; break;   // 3/4 of a 32nd
        }
        return String.format("%d-%02d%s", handle, ticks, suffix);
    }
}

// Treasury Trade Representation
public class TreasuryTrade {
    private String cusip;           // Unique security identifier
    private String securityDesc;    // e.g., "T 4.125 08/15/2053"
    private TreasuryPrice price;
    private double yield;           // Yield to maturity
    private long faceAmount;        // Par value (typically millions)
    private LocalDate settlementDate;
    private Side side;              // BUY or SELL

    public double calculateProceeds() {
        double cleanPrice = price.toDecimal() / 100.0;
        double accruedInterest = calculateAccruedInterest();
        return faceAmount * (cleanPrice + accruedInterest);
    }
}`
        },
        {
          name: 'Yield Calculations',
          diagram: YieldCalcDiagram,
          explanation: 'Treasury yields are calculated using standard day count conventions (Actual/Actual). Yield to maturity considers all future cash flows discounted to present value. The yield curve (2Y, 5Y, 10Y, 30Y) drives pricing across fixed income markets.',
          codeExample: `// Yield Calculation for US Treasuries
public class TreasuryYieldCalculator {

    // Calculate yield to maturity using Newton-Raphson
    public double calculateYTM(TreasuryBond bond, double cleanPrice) {
        double guess = bond.getCoupon() / cleanPrice;  // Initial guess
        double tolerance = 0.00000001;
        int maxIterations = 100;

        for (int i = 0; i < maxIterations; i++) {
            double price = calculatePrice(bond, guess);
            double priceDeriv = calculatePriceDerivative(bond, guess);

            double diff = price - cleanPrice;
            if (Math.abs(diff) < tolerance) {
                return guess;
            }

            guess = guess - diff / priceDeriv;
        }
        throw new CalculationException("YTM did not converge");
    }

    private double calculatePrice(TreasuryBond bond, double yield) {
        double price = 0.0;
        double coupon = bond.getCoupon() / 2.0;  // Semi-annual
        int periods = bond.getPeriodsRemaining();

        // PV of coupon payments
        for (int t = 1; t <= periods; t++) {
            price += coupon / Math.pow(1 + yield / 2, t);
        }

        // PV of principal
        price += 100.0 / Math.pow(1 + yield / 2, periods);

        return price;
    }

    // Duration measures price sensitivity to yield changes
    public double calculateModifiedDuration(TreasuryBond bond, double yield) {
        double macaulayDuration = calculateMacaulayDuration(bond, yield);
        return macaulayDuration / (1 + yield / 2);
    }
}`
        },
        {
          name: 'Market Making',
          diagram: TreasuryMMDiagram,
          explanation: 'Treasury dealers provide continuous two-way prices. Spreads are extremely tight (often < 1/32nd for on-the-run securities). Primary dealers have obligations to make markets. Electronic platforms (BrokerTec, eSpeed) facilitate dealer-to-dealer trading.',
          codeExample: `// Treasury Market Making Engine
@Service
public class TreasuryMarketMaker {
    private final PositionService positionService;
    private final MarketDataService marketData;

    // Calculate two-way market for a Treasury
    public TwoWayPrice makeMarket(String cusip, long size) {
        // Get reference price from interdealer market
        double midYield = marketData.getMidYield(cusip);
        double baseSpread = getBaseSpread(cusip);  // In 32nds

        // Adjust spread for size
        double sizeAdjustment = calculateSizeAdjustment(size, cusip);

        // Inventory skew
        long position = positionService.getPosition(cusip);
        double skew = calculateInventorySkew(position, cusip);

        // Calculate bid/ask in 32nds
        double halfSpread = (baseSpread * sizeAdjustment) / 2;
        double bidPrice32 = yieldToPrice32(midYield) - halfSpread - skew;
        double askPrice32 = yieldToPrice32(midYield) + halfSpread - skew;

        return TwoWayPrice.builder()
            .cusip(cusip)
            .bidPrice(formatPrice32(bidPrice32))  // "99-16+"
            .askPrice(formatPrice32(askPrice32))  // "99-17"
            .bidYield(price32ToYield(bidPrice32))
            .askYield(price32ToYield(askPrice32))
            .size(size)
            .validFor(Duration.ofSeconds(5))
            .build();
    }

    private double getBaseSpread(String cusip) {
        // On-the-run: 0.5/32, Off-the-run: 1-2/32
        if (isOnTheRun(cusip)) {
            return 0.5;  // Half a 32nd
        }
        return 1.5;  // 1.5 32nds
    }

    // Format price in Treasury convention: handle-ticks (99-16+)
    private String formatPrice32(double price32) {
        int handle = (int) price32;
        double ticks = (price32 - handle) * 32;
        int wholeTicks = (int) ticks;
        boolean hasPlus = (ticks - wholeTicks) >= 0.5;

        return String.format("%d-%02d%s", handle, wholeTicks, hasPlus ? "+" : "");
    }
}`
        }
      ]
    },
    {
      id: 'interest-rate-swaps',
      name: 'Interest Rate Swaps',
      icon: '🔄',
      color: '#22c55e',
      description: 'USD Interest Rate Swap trading and pricing',
      diagram: RatesSwapsDiagram,
      details: [
        {
          name: 'IRS Fundamentals',
          diagram: IRSFundamentalsDiagram,
          explanation: 'An Interest Rate Swap exchanges fixed-rate payments for floating-rate payments. The fixed leg pays a predetermined rate; the floating leg pays based on a reference rate (SOFR). Standard tenors: 2Y, 5Y, 10Y, 30Y. Notional amounts typically $10M-$500M.',
          codeExample: `// Interest Rate Swap Representation
public class InterestRateSwap {
    private String swapId;
    private LocalDate effectiveDate;
    private LocalDate terminationDate;
    private double notional;
    private double fixedRate;          // e.g., 0.0425 for 4.25%
    private String floatingIndex;      // "SOFR", "LIBOR"
    private int floatingSpread;        // Basis points over index
    private PaymentFrequency fixedFreq;    // SEMI_ANNUAL
    private PaymentFrequency floatFreq;    // QUARTERLY
    private DayCountConvention fixedDCC;   // 30/360
    private DayCountConvention floatDCC;   // ACT/360
    private Side payerReceiver;        // PAYER (pay fixed) or RECEIVER

    // Calculate fixed leg payment
    public double calculateFixedPayment(LocalDate periodStart, LocalDate periodEnd) {
        double yearFrac = fixedDCC.yearFraction(periodStart, periodEnd);
        return notional * fixedRate * yearFrac;
    }

    // Calculate floating leg payment
    public double calculateFloatPayment(LocalDate periodStart, LocalDate periodEnd,
                                        double indexRate) {
        double yearFrac = floatDCC.yearFraction(periodStart, periodEnd);
        double effectiveRate = indexRate + floatingSpread / 10000.0;
        return notional * effectiveRate * yearFrac;
    }
}

// Swap Pricing Engine
public class SwapPricingEngine {
    private final DiscountCurve discountCurve;
    private final ForwardCurve forwardCurve;

    public SwapValuation priceSwap(InterestRateSwap swap) {
        double fixedLegPV = calculateFixedLegPV(swap);
        double floatLegPV = calculateFloatLegPV(swap);

        double npv = swap.isPayerSwap()
            ? floatLegPV - fixedLegPV
            : fixedLegPV - floatLegPV;

        double parRate = calculateParRate(swap);
        double dv01 = calculateDV01(swap);

        return new SwapValuation(npv, parRate, dv01);
    }

    // Par rate is the fixed rate that makes NPV = 0
    public double calculateParRate(InterestRateSwap swap) {
        double floatLegPV = calculateFloatLegPV(swap);
        double annuity = calculateFixedLegAnnuity(swap);
        return floatLegPV / annuity;
    }
}`
        },
        {
          name: 'SOFR Transition',
          diagram: SOFRDiagram,
          explanation: 'SOFR (Secured Overnight Financing Rate) has replaced LIBOR as the USD floating rate benchmark. SOFR is based on overnight Treasury repo transactions. Compounded SOFR in arrears is the standard for swaps. Fallback provisions handle legacy LIBOR contracts.',
          codeExample: `// SOFR Rate Calculation
public class SOFRCalculator {

    // Compounded SOFR in arrears
    public double calculateCompoundedSOFR(LocalDate periodStart,
                                          LocalDate periodEnd,
                                          SOFRFixings fixings) {
        double compoundedRate = 1.0;
        LocalDate currentDate = periodStart;

        while (currentDate.isBefore(periodEnd)) {
            double dailyRate = fixings.getRate(currentDate);
            int daysToNext = getDaysUntilNextBusinessDay(currentDate);

            // Compound daily rates
            compoundedRate *= (1 + dailyRate * daysToNext / 360.0);
            currentDate = getNextBusinessDay(currentDate);
        }

        // Annualize the compounded rate
        int totalDays = (int) ChronoUnit.DAYS.between(periodStart, periodEnd);
        return (compoundedRate - 1) * 360.0 / totalDays;
    }

    // SOFR with lookback and payment delay
    public double calculateSOFRWithConventions(LocalDate periodStart,
                                                LocalDate periodEnd,
                                                int lookbackDays,
                                                int paymentDelay,
                                                SOFRFixings fixings) {
        // Observation period shifted by lookback
        LocalDate obsStart = businessDayAdjust(periodStart.minusDays(lookbackDays));
        LocalDate obsEnd = businessDayAdjust(periodEnd.minusDays(lookbackDays));

        return calculateCompoundedSOFR(obsStart, obsEnd, fixings);
    }
}`
        },
        {
          name: 'Curve Construction',
          diagram: CurveConstructionDiagram,
          explanation: 'The SOFR swap curve is bootstrapped from market instruments: SOFR futures (short end) and swaps (long end). Interpolation methods (linear, cubic spline) connect market points. Dual-curve framework uses separate discount and projection curves.',
          codeExample: `// SOFR Curve Bootstrapping
public class CurveBootstrapper {

    public DiscountCurve bootstrapSOFRCurve(List<MarketQuote> quotes) {
        // Sort quotes by maturity
        List<MarketQuote> sortedQuotes = quotes.stream()
            .sorted(Comparator.comparing(MarketQuote::getMaturity))
            .toList();

        List<CurvePoint> curvePoints = new ArrayList<>();
        curvePoints.add(new CurvePoint(LocalDate.now(), 1.0));  // DF(0) = 1

        for (MarketQuote quote : sortedQuotes) {
            double discountFactor = bootstrapPoint(quote, curvePoints);
            curvePoints.add(new CurvePoint(quote.getMaturity(), discountFactor));
        }

        return new DiscountCurve(curvePoints, InterpolationMethod.LOG_LINEAR);
    }

    private double bootstrapPoint(MarketQuote quote, List<CurvePoint> existingPoints) {
        return switch (quote.getInstrumentType()) {
            case DEPOSIT -> bootstrapDeposit(quote);
            case SOFR_FUTURE -> bootstrapFuture(quote, existingPoints);
            case SWAP -> bootstrapSwap(quote, existingPoints);
            default -> throw new IllegalArgumentException("Unknown instrument type");
        };
    }

    // Bootstrap from swap quote
    private double bootstrapSwap(MarketQuote swapQuote, List<CurvePoint> curve) {
        double swapRate = swapQuote.getQuote();
        LocalDate maturity = swapQuote.getMaturity();

        // Sum of existing discount factors * accrual
        double annuity = 0;
        for (LocalDate paymentDate : getPaymentDates(maturity)) {
            if (paymentDate.isBefore(curve.getLast().getDate())) {
                double df = interpolateDF(curve, paymentDate);
                double accrual = getAccrualFraction(paymentDate);
                annuity += df * accrual;
            }
        }

        // Solve for final discount factor:
        // swapRate * (annuity + DF_n * accrual_n) = 1 - DF_n
        double lastAccrual = getAccrualFraction(maturity);
        double dfN = (1 - swapRate * annuity) / (1 + swapRate * lastAccrual);

        return dfN;
    }

    // Cubic spline interpolation
    public double interpolate(List<CurvePoint> points, LocalDate target) {
        // Implementation of cubic spline interpolation
        // Returns continuously compounded zero rate
        return cubicSpline.interpolate(points, target);
    }
}`
        }
      ]
    },
    {
      id: 'electronic-platforms',
      name: 'Trading Platforms',
      icon: '🖥️',
      color: '#f59e0b',
      description: 'Electronic venues for fixed income execution',
      diagram: CreditTradingDiagram,
      details: [
        {
          name: 'Dealer-to-Client (D2C)',
          diagram: D2CDiagram,
          explanation: 'Platforms like Tradeweb and Bloomberg connect dealers with buy-side clients. RFQ is the dominant protocol. Clients request quotes from multiple dealers simultaneously. All-to-all platforms (MarketAxess) enable buy-side to buy-side trading.',
          codeExample: `// Multi-Dealer RFQ Execution
public class MultiDealerRFQExecutor {
    private final List<DealerConnection> dealers;
    private final ExecutorService executor;

    public CompletableFuture<BestExecution> executeRFQ(RFQRequest request) {
        // Send RFQ to all dealers simultaneously
        List<CompletableFuture<DealerQuote>> quoteFutures = dealers.stream()
            .map(dealer -> CompletableFuture.supplyAsync(
                () -> dealer.requestQuote(request), executor))
            .collect(Collectors.toList());

        // Wait for all quotes with timeout
        return CompletableFuture.allOf(
                quoteFutures.toArray(new CompletableFuture[0]))
            .orTimeout(30, TimeUnit.SECONDS)
            .thenApply(v -> {
                // Collect successful quotes
                List<DealerQuote> quotes = quoteFutures.stream()
                    .filter(f -> !f.isCompletedExceptionally())
                    .map(CompletableFuture::join)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

                // Find best quote
                DealerQuote bestQuote = findBestQuote(quotes, request.getSide());

                // Execute against best quote
                return executeAgainstQuote(bestQuote, request);
            });
    }

    private DealerQuote findBestQuote(List<DealerQuote> quotes, Side side) {
        Comparator<DealerQuote> comparator = side == Side.BUY
            ? Comparator.comparing(DealerQuote::getAskPrice)   // Lowest ask for buy
            : Comparator.comparing(DealerQuote::getBidPrice).reversed();  // Highest bid

        return quotes.stream()
            .filter(q -> q.getState() == QuoteState.VALID)
            .min(comparator)
            .orElseThrow(() -> new NoQuotesException("No valid quotes received"));
    }
}`
        },
        {
          name: 'Dealer-to-Dealer (D2D)',
          diagram: D2DDiagram,
          explanation: 'Interdealer brokers (IDBs) facilitate dealer-to-dealer trading. BrokerTec and eSpeed dominate Treasury D2D. Central limit order books (CLOB) enable anonymous matching. Voice brokers still handle large or illiquid trades.',
          codeExample: `// Dealer-to-Dealer CLOB Integration
@Service
public class D2DMarketConnector {
    private final BrokerTecSession brokerTecSession;
    private final ESpeedSession eSpeedSession;

    // Submit order to interdealer CLOB
    public OrderResponse submitToCLOB(D2DOrder order) {
        // Choose venue based on liquidity
        D2DVenue bestVenue = selectVenue(order.getCusip());

        return switch (bestVenue) {
            case BROKERTEC -> submitToBrokerTec(order);
            case ESPEED -> submitToESpeed(order);
        };
    }

    private OrderResponse submitToBrokerTec(D2DOrder order) {
        BTOrder btOrder = BTOrder.builder()
            .cusip(order.getCusip())
            .side(order.getSide())
            .price(order.getPrice())  // In 32nds
            .quantity(order.getQuantity())
            .orderType(BTOrderType.LIMIT)
            .timeInForce(BTTimeInForce.DAY)
            .anonymous(true)  // All D2D is anonymous
            .build();

        return brokerTecSession.submitOrder(btOrder);
    }

    // Subscribe to market data from D2D venues
    public void subscribeToDepth(String cusip, MarketDepthListener listener) {
        // Aggregate order book from multiple venues
        brokerTecSession.subscribeDepth(cusip, depth -> {
            aggregatedBook.updateBrokerTec(cusip, depth);
            listener.onDepthUpdate(aggregatedBook.getConsolidated(cusip));
        });

        eSpeedSession.subscribeDepth(cusip, depth -> {
            aggregatedBook.updateESpeed(cusip, depth);
            listener.onDepthUpdate(aggregatedBook.getConsolidated(cusip));
        });
    }

    // Calculate best execution venue
    private D2DVenue selectVenue(String cusip) {
        OrderBookSnapshot btBook = brokerTecSession.getSnapshot(cusip);
        OrderBookSnapshot esBook = eSpeedSession.getSnapshot(cusip);

        // Compare available liquidity and spreads
        double btSpread = btBook.getSpread();
        double esSpread = esBook.getSpread();

        return btSpread <= esSpread ? D2DVenue.BROKERTEC : D2DVenue.ESPEED;
    }
}`
        },
        {
          name: 'SEF Trading',
          diagram: SEFDiagram,
          explanation: 'Swap Execution Facilities (SEFs) are regulated platforms for swap trading. Mandated by Dodd-Frank for certain standardized swaps. Tradeweb and Bloomberg operate as SEFs. RFQ and order book protocols supported.',
          codeExample: `// SEF Trading Integration
@Service
public class SEFTradingService {
    private final TradewebSEF tradeweb;
    private final BloombergSEF bloomberg;

    // Execute swap on SEF (regulatory requirement for MAT swaps)
    public SEFExecution executeSEFTrade(SwapOrder order) {
        // Determine if swap is MAT (Made Available to Trade)
        if (isMATSwap(order)) {
            // Must execute on SEF
            return executeOnSEF(order);
        } else {
            // Can execute bilaterally
            return executeBilateral(order);
        }
    }

    private boolean isMATSwap(SwapOrder order) {
        // MAT determination based on CFTC rules
        // Standard USD IRS 2Y-30Y are MAT
        return order.getCurrency().equals("USD")
            && order.getProductType() == ProductType.IRS
            && order.getTenorYears() >= 2
            && order.getTenorYears() <= 30
            && order.getNotional() >= 10_000_000;
    }

    private SEFExecution executeOnSEF(SwapOrder order) {
        // Choose execution method based on order characteristics
        if (order.getNotional() > 100_000_000) {
            // Large block - use RFQ with minimum 3 dealers
            return executeRFQ(order, 3);
        } else {
            // Standard size - can use order book
            return executeOrderBook(order);
        }
    }

    private SEFExecution executeRFQ(SwapOrder order, int minDealers) {
        // SEF RFQ requirement: minimum number of quotes
        RFQRequest request = RFQRequest.builder()
            .productType(order.getProductType())
            .tenor(order.getTenorYears())
            .notional(order.getNotional())
            .direction(order.getDirection())
            .minDealers(minDealers)  // CFTC requirement
            .build();

        // Send to SEF
        List<SEFQuote> quotes = tradeweb.requestQuotes(request);

        // Must receive minimum quotes
        if (quotes.size() < minDealers) {
            throw new SEFRuleException("Insufficient dealer responses");
        }

        // Execute against best quote
        SEFQuote best = selectBestQuote(quotes, order.getDirection());
        return tradeweb.executeAgainstQuote(best, order);
    }

    // Post-trade reporting to SDR (Swap Data Repository)
    public void reportToSDR(SEFExecution execution) {
        SDRReport report = SDRReport.from(execution);
        sdrService.submit(report);  // Required within 15 minutes
    }
}`
        }
      ]
    },
    {
      id: 'risk-metrics',
      name: 'Risk Metrics',
      icon: '📊',
      color: '#8b5cf6',
      description: 'Key risk measures for fixed income portfolios',
      details: [
        {
          name: 'DV01 / PV01',
          diagram: DV01Diagram,
          explanation: 'DV01 (Dollar Value of 01) measures the dollar change in value for a 1 basis point change in yield. PV01 is similar but for swap curves. Critical for hedging and risk limits. Additive across positions for portfolio risk.',
          codeExample: `// DV01 Calculation
public class RiskCalculator {

    // DV01 for a bond
    public double calculateBondDV01(Bond bond, double yield, double price) {
        // Bump yield up and down by 1bp
        double priceUp = calculateBondPrice(bond, yield + 0.0001);
        double priceDown = calculateBondPrice(bond, yield - 0.0001);

        // DV01 = (P_down - P_up) / 2
        double dv01Percentage = (priceDown - priceUp) / 2;

        // Convert to dollar DV01 for notional
        return dv01Percentage * bond.getNotional() / 100;
    }

    // DV01 for a swap
    public double calculateSwapDV01(InterestRateSwap swap,
                                     DiscountCurve discountCurve,
                                     ForwardCurve forwardCurve) {
        // Calculate base NPV
        double baseNPV = priceSwap(swap, discountCurve, forwardCurve);

        // Bump all curves by 1bp
        DiscountCurve bumpedDiscount = discountCurve.parallelShift(0.0001);
        ForwardCurve bumpedForward = forwardCurve.parallelShift(0.0001);

        // Calculate bumped NPV
        double bumpedNPV = priceSwap(swap, bumpedDiscount, bumpedForward);

        return bumpedNPV - baseNPV;
    }

    // Portfolio DV01
    public Map<String, Double> calculatePortfolioDV01(Portfolio portfolio) {
        Map<String, Double> bucketDV01 = new TreeMap<>();

        // Key rate DV01s for different tenors
        int[] keyRates = {1, 2, 3, 5, 7, 10, 20, 30};
        for (int tenor : keyRates) {
            double bucketDV01 = portfolio.getPositions().stream()
                .mapToDouble(p -> calculateKeyRateDV01(p, tenor))
                .sum();
            bucketDV01s.put(tenor + "Y", bucketDV01);
        }

        return bucketDV01s;
    }
}`
        },
        {
          name: 'Duration & Convexity',
          diagram: DurationConvexityDiagram,
          explanation: 'Modified duration measures percentage price sensitivity. Convexity captures the curvature of price-yield relationship. Effective duration handles bonds with embedded options. Duration matching is fundamental to fixed income hedging.',
          codeExample: `// Duration and Convexity Calculator
public class DurationConvexityCalculator {

    // Modified Duration = Macaulay Duration / (1 + y/n)
    public double calculateModifiedDuration(Bond bond, double yield) {
        double macaulayDuration = calculateMacaulayDuration(bond, yield);
        int frequency = bond.getCouponFrequency();  // 2 for semi-annual
        return macaulayDuration / (1 + yield / frequency);
    }

    // Macaulay Duration = weighted average time to cash flows
    public double calculateMacaulayDuration(Bond bond, double yield) {
        double price = calculatePrice(bond, yield);
        double weightedTime = 0;
        int frequency = bond.getCouponFrequency();

        List<CashFlow> cashFlows = bond.getCashFlows();
        for (int i = 0; i < cashFlows.size(); i++) {
            CashFlow cf = cashFlows.get(i);
            double t = (i + 1) / (double) frequency;  // Time in years
            double pv = cf.getAmount() / Math.pow(1 + yield / frequency, i + 1);
            weightedTime += t * pv;
        }

        return weightedTime / price;
    }

    // Convexity measures curvature
    public double calculateConvexity(Bond bond, double yield) {
        double price = calculatePrice(bond, yield);
        double convexitySum = 0;
        int frequency = bond.getCouponFrequency();

        List<CashFlow> cashFlows = bond.getCashFlows();
        for (int i = 0; i < cashFlows.size(); i++) {
            CashFlow cf = cashFlows.get(i);
            double t = (i + 1) / (double) frequency;
            double pv = cf.getAmount() / Math.pow(1 + yield / frequency, i + 1);

            // Convexity term: t * (t + 1/n) * PV(CF)
            convexitySum += t * (t + 1.0 / frequency) * pv;
        }

        return convexitySum / (price * Math.pow(1 + yield / frequency, 2));
    }

    // Price change approximation using duration and convexity
    public double approximatePriceChange(double duration, double convexity,
                                          double yieldChange) {
        // dP/P ≈ -D * dy + 0.5 * C * (dy)^2
        double durationEffect = -duration * yieldChange;
        double convexityEffect = 0.5 * convexity * yieldChange * yieldChange;
        return durationEffect + convexityEffect;
    }

    // Effective duration for bonds with embedded options
    public double calculateEffectiveDuration(Bond bond, double yieldCurve) {
        double basisPoint = 0.0001;  // 1 bp

        // Price with yield curve shifted down
        double priceDown = priceWithShiftedCurve(bond, yieldCurve, -basisPoint);

        // Price with yield curve shifted up
        double priceUp = priceWithShiftedCurve(bond, yieldCurve, +basisPoint);

        double basePrice = priceWithShiftedCurve(bond, yieldCurve, 0);

        // Effective duration = (P- - P+) / (2 * P0 * dy)
        return (priceDown - priceUp) / (2 * basePrice * basisPoint);
    }
}`
        },
        {
          name: 'VaR for Fixed Income',
          diagram: FIVaRDiagram,
          explanation: 'Value at Risk for fixed income uses historical yield changes. Parametric VaR assumes normal distribution of yield changes. Historical simulation uses actual historical scenarios. Stress testing applies extreme yield curve shifts.',
          codeExample: `// Fixed Income VaR Calculator
@Service
public class FixedIncomeVaRCalculator {
    private final HistoricalDataService historicalData;
    private final RiskCalculator riskCalculator;

    // Parametric VaR using duration/convexity
    public VaRResult calculateParametricVaR(Portfolio portfolio,
                                             double confidenceLevel,
                                             int holdingPeriodDays) {
        // Get portfolio DV01
        double portfolioDV01 = riskCalculator.calculatePortfolioDV01(portfolio);

        // Get historical yield volatility
        double yieldVolDaily = historicalData.getYieldVolatility(
            portfolio.getBenchmarkTenor());
        double yieldVolPeriod = yieldVolDaily * Math.sqrt(holdingPeriodDays);

        // Z-score for confidence level
        double zScore = getZScore(confidenceLevel);  // 2.33 for 99%

        // VaR = DV01 * yield_vol * z_score * 100 (convert to bps)
        double var = Math.abs(portfolioDV01) * yieldVolPeriod * zScore * 100;

        return VaRResult.builder()
            .var(var)
            .confidenceLevel(confidenceLevel)
            .holdingPeriod(holdingPeriodDays)
            .method(VaRMethod.PARAMETRIC)
            .build();
    }

    // Historical Simulation VaR
    public VaRResult calculateHistoricalVaR(Portfolio portfolio,
                                             double confidenceLevel,
                                             int lookbackDays) {
        // Get historical yield changes for key rates
        List<YieldCurveScenario> scenarios = historicalData
            .getYieldCurveChanges(lookbackDays);

        // Calculate P&L under each historical scenario
        List<Double> pnlScenarios = new ArrayList<>();
        for (YieldCurveScenario scenario : scenarios) {
            double pnl = calculateScenarioPnL(portfolio, scenario);
            pnlScenarios.add(pnl);
        }

        // Sort and find VaR percentile
        Collections.sort(pnlScenarios);
        int varIndex = (int) ((1 - confidenceLevel) * pnlScenarios.size());
        double var = -pnlScenarios.get(varIndex);

        return VaRResult.builder()
            .var(var)
            .confidenceLevel(confidenceLevel)
            .scenarioCount(scenarios.size())
            .method(VaRMethod.HISTORICAL)
            .build();
    }

    // Stress testing with predefined scenarios
    public List<StressResult> runStressTests(Portfolio portfolio) {
        List<StressResult> results = new ArrayList<>();

        // Parallel shift +100bp
        results.add(applyStress(portfolio, "Parallel +100bp",
            scenario -> scenario.parallelShift(0.01)));

        // Steepener: 2Y down, 10Y up
        results.add(applyStress(portfolio, "Steepener",
            scenario -> scenario.twist(-0.005, 0.005)));

        // Flattener: 2Y up, 10Y down
        results.add(applyStress(portfolio, "Flattener",
            scenario -> scenario.twist(0.005, -0.005)));

        // 2008 crisis replay
        results.add(applyStress(portfolio, "2008 Crisis",
            scenario -> scenario.apply2008CrisisShocks()));

        return results;
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
      { name: 'Fixed Income Trading', icon: '📜', page: 'Fixed Income Trading' }
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
  }, [selectedConcept, selectedConceptIndex, onBack])

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#60a5fa',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Fixed Income Trading</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
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

export default FixedIncomeTrading

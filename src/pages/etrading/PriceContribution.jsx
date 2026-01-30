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

// Pricing Engine Diagram
const PricingEngineDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Real-Time Pricing Engine</text>
    <rect x="50" y="50" width="100" height="60" rx="4" fill="#3b82f6"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Market Data</text>
    <text x="100" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="7">Quotes, Trades</text>
    <rect x="180" y="50" width="100" height="60" rx="4" fill="#f59e0b"/>
    <text x="230" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Position</text>
    <text x="230" y="92" textAnchor="middle" fill="#fef3c7" fontSize="7">Inventory Skew</text>
    <rect x="310" y="40" width="160" height="80" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="390" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Pricing Engine</text>
    <text x="390" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Mid + Spread + Risk</text>
    <text x="390" y="105" textAnchor="middle" fill="#bbf7d0" fontSize="7">&lt;1ms latency</text>
    <rect x="500" y="50" width="100" height="60" rx="4" fill="#8b5cf6"/>
    <text x="550" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Published</text>
    <text x="550" y="92" textAnchor="middle" fill="#ddd6fe" fontSize="7">Bid/Ask Prices</text>
    <line x1="150" y1="80" x2="175" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="280" y1="80" x2="305" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="470" y1="80" x2="495" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="10">Triggered by market data updates or timer ticks</text>
  </svg>
)

// Price Contribution Diagram
const ContributionDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Price Contribution to Venues</text>
    <rect x="50" y="60" width="150" height="80" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="125" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Price Engine</text>
    <text x="125" y="110" textAnchor="middle" fill="#bbf7d0" fontSize="9">Generate prices</text>
    <text x="125" y="125" textAnchor="middle" fill="#bbf7d0" fontSize="8">per client tier</text>
    <rect x="280" y="45" width="120" height="40" rx="4" fill="#3b82f6"/>
    <text x="340" y="70" textAnchor="middle" fill="white" fontSize="9">Bloomberg</text>
    <rect x="280" y="95" width="120" height="40" rx="4" fill="#f59e0b"/>
    <text x="340" y="120" textAnchor="middle" fill="white" fontSize="9">Tradeweb</text>
    <rect x="280" y="145" width="120" height="40" rx="4" fill="#8b5cf6"/>
    <text x="340" y="170" textAnchor="middle" fill="white" fontSize="9">MarketAxess</text>
    <rect x="480" y="45" width="120" height="40" rx="4" fill="#64748b"/>
    <text x="540" y="70" textAnchor="middle" fill="white" fontSize="9">Client A</text>
    <rect x="480" y="95" width="120" height="40" rx="4" fill="#64748b"/>
    <text x="540" y="120" textAnchor="middle" fill="white" fontSize="9">Client B</text>
    <rect x="480" y="145" width="120" height="40" rx="4" fill="#64748b"/>
    <text x="540" y="170" textAnchor="middle" fill="white" fontSize="9">Client C</text>
    <line x1="200" y1="65" x2="275" y2="65" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="200" y1="100" x2="275" y2="115" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="200" y1="135" x2="275" y2="165" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="400" y1="65" x2="475" y2="65" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="400" y1="115" x2="475" y2="115" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="400" y1="165" x2="475" y2="165" stroke="#4ade80" strokeWidth="1.5"/>
  </svg>
)

// Yield Curve Diagram
const YieldCurveDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Yield Curve Construction</text>
    <line x1="100" y1="160" x2="600" y2="160" stroke="#64748b" strokeWidth="2"/>
    <line x1="100" y1="160" x2="100" y2="50" stroke="#64748b" strokeWidth="2"/>
    <text x="350" y="185" textAnchor="middle" fill="#64748b" fontSize="10">Tenor</text>
    <text x="85" y="105" textAnchor="middle" fill="#64748b" fontSize="10" transform="rotate(-90,85,105)">Yield %</text>
    <path d="M 120 140 Q 200 130, 300 100 T 500 70 T 580 65" fill="none" stroke="#22c55e" strokeWidth="3"/>
    <circle cx="150" cy="135" r="5" fill="#3b82f6"/>
    <text x="150" y="155" textAnchor="middle" fill="#3b82f6" fontSize="8">3M</text>
    <circle cx="250" cy="115" r="5" fill="#3b82f6"/>
    <text x="250" y="135" textAnchor="middle" fill="#3b82f6" fontSize="8">2Y</text>
    <circle cx="350" cy="90" r="5" fill="#3b82f6"/>
    <text x="350" y="110" textAnchor="middle" fill="#3b82f6" fontSize="8">5Y</text>
    <circle cx="450" cy="75" r="5" fill="#3b82f6"/>
    <text x="450" y="95" textAnchor="middle" fill="#3b82f6" fontSize="8">10Y</text>
    <circle cx="550" cy="68" r="5" fill="#3b82f6"/>
    <text x="550" y="88" textAnchor="middle" fill="#3b82f6" fontSize="8">30Y</text>
  </svg>
)

// Volatility Surface Diagram
const VolSurfaceDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Implied Volatility Surface</text>
    <rect x="50" y="50" width="180" height="50" rx="4" fill="#3b82f6"/>
    <text x="140" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Strike Dimension</text>
    <text x="140" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">ATM, 25Δ, 10Δ puts/calls</text>
    <rect x="260" y="50" width="180" height="50" rx="4" fill="#f59e0b"/>
    <text x="350" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Tenor Dimension</text>
    <text x="350" y="92" textAnchor="middle" fill="#fef3c7" fontSize="8">1W, 1M, 3M, 6M, 1Y</text>
    <rect x="470" y="50" width="180" height="50" rx="4" fill="#22c55e"/>
    <text x="560" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Surface Fitting</text>
    <text x="560" y="92" textAnchor="middle" fill="#bbf7d0" fontSize="8">SABR, SVI models</text>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="10">Vol smile: ATM vol + Skew × (K-ATM) + Kurtosis × (K-ATM)²</text>
  </svg>
)

// Price Pipeline Diagram
const PricePipelineDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Price Calculation Pipeline</text>
    {['Market Data', 'Mid Price', 'Risk Adj', 'Spread', 'Publish'].map((step, i) => (
      <g key={i}>
        <rect x={40 + i * 130} y="50" width="110" height="50" rx="4" fill={['#3b82f6', '#f59e0b', '#ef4444', '#22c55e', '#8b5cf6'][i]}/>
        <text x={95 + i * 130} y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{step}</text>
        {i < 4 && <line x1={150 + i * 130} y1="75" x2={170 + i * 130} y2="75" stroke="#4ade80" strokeWidth="2"/>}
      </g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">{`Triggered by market data | Target latency &lt;1ms`}</text>
  </svg>
)

// Spread Management Diagram
const SpreadMgmtDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Dynamic Spread Components</text>
    {['Base', 'Vol Adj', 'Inventory', 'ToD', 'Market'].map((comp, i) => (
      <g key={i}>
        <rect x={35 + i * 130} y="50" width="115" height="55" rx="4" fill={['#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#22c55e'][i]}/>
        <text x={92 + i * 130} y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{comp}</text>
        <text x={92 + i * 130} y="90" textAnchor="middle" fill="white" fontSize="7">{['By type', '×(1+σ×2)', '×(1+pos%×0.2)', '×1.3 open/close', '×event'][i]}</text>
      </g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Final Spread = Base × Vol × Inventory × ToD × Market</text>
  </svg>
)

// Price Ladder Diagram
const PriceLadderDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Price Laddering by Size</text>
    {[
      { size: '0-1K', spread: '1.0×', color: '#22c55e' },
      { size: '1K-10K', spread: '1.2×', color: '#3b82f6' },
      { size: '10K-100K', spread: '1.5×', color: '#f59e0b' },
      { size: '100K-1M', spread: '2.0×', color: '#ef4444' }
    ].map((tier, i) => (
      <g key={i}>
        <rect x={65 + i * 150} y="50" width="130" height="55" rx="4" fill={tier.color}/>
        <text x={130 + i * 150} y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{tier.size}</text>
        <text x={130 + i * 150} y="90" textAnchor="middle" fill="white" fontSize="8">Spread: {tier.spread}</text>
      </g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Wider spreads for larger sizes | Block trades require manual approval</text>
  </svg>
)

// Venue Connectivity Diagram
const VenueConnectDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Multi-Venue Price Distribution</text>
    <rect x="50" y="50" width="150" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="125" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Price Engine</text>
    {['Bloomberg', 'Tradeweb', 'MarketAxess'].map((venue, i) => (
      <g key={i}>
        <rect x={260 + i * 145} y="50" width="125" height="60" rx="4" fill={['#3b82f6', '#f59e0b', '#8b5cf6'][i]}/>
        <text x={322 + i * 145} y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{venue}</text>
        <line x1="200" y1="80" x2="255" y2={60 + i * 20} stroke="#4ade80" strokeWidth="1.5"/>
      </g>
    ))}
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Venue-specific formats | Rate limiting | Connection monitoring</text>
  </svg>
)

// Staleness Monitor Diagram
const StalenessDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Price Staleness Detection</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="#22c55e"/>
    <text x="140" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Fresh (0-80%)</text>
    <text x="140" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Normal operation</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="#f59e0b"/>
    <text x="350" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Warning (80-100%)</text>
    <text x="350" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Log metric</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="#ef4444"/>
    <text x="560" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{`Stale (&gt;100%)`}</text>
    <text x="560" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">Auto-withdraw</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Max age threshold (e.g., 500ms) | Check every 100ms | Alert if persistent</text>
  </svg>
)

// Throttling Diagram
const ThrottlingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Contribution Rate Limiting</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="#3b82f6"/>
    <text x="140" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Tradeweb: 100/sec</text>
    <text x="140" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">High throughput</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="#f59e0b"/>
    <text x="350" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Bloomberg: 50/sec</text>
    <text x="350" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Medium limit</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="#8b5cf6"/>
    <text x="560" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MarketAxess: 75/sec</text>
    <text x="560" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">Credit focus</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Coalesce rapid updates | Priority queue for significant moves</text>
  </svg>
)

// Curve Construction Diagram (detailed)
const CurveConstructDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Curve Building Instruments</text>
    <rect x="50" y="50" width="150" height="55" rx="4" fill="#22c55e"/>
    <text x="125" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Deposits (O/N-6M)</text>
    <text x="125" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Simple → Zero rate</text>
    <rect x="220" y="50" width="150" height="55" rx="4" fill="#3b82f6"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Futures (3M-2Y)</text>
    <text x="295" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">100-Price → Rate</text>
    <rect x="390" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="465" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Swaps (2Y-50Y)</text>
    <text x="465" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Bootstrap zero</text>
    <rect x="560" y="50" width="100" height="55" rx="4" fill="#8b5cf6"/>
    <text x="610" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Interpolate</text>
    <text x="610" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">Cubic spline</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Sort by maturity → Bootstrap sequentially → Build curve object</text>
  </svg>
)

// Curve Bumping Diagram
const CurveBumpDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Curve Sensitivity Analysis</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">DV01 (Parallel +1bp)</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Total rate exposure</text>
    <rect x="270" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="370" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Key Rate Durations</text>
    <text x="370" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">1Y, 2Y, 5Y, 10Y, 30Y</text>
    <rect x="490" y="50" width="160" height="55" rx="4" fill="#f59e0b"/>
    <text x="570" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Twist/Butterfly</text>
    <text x="570" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Scenario analysis</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">{`PV change = Base PV - Bumped PV | Used for hedging & risk limits`}</text>
  </svg>
)

// Multi-Curve Framework Diagram
const MultiCurveDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Multi-Curve Framework</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">OIS Discount Curve</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Cash flow discounting</text>
    <rect x="270" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="370" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SOFR Projection Curve</text>
    <text x="370" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Floating rate projection</text>
    <rect x="490" y="50" width="160" height="55" rx="4" fill="#f59e0b"/>
    <text x="570" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Cross-Ccy Basis</text>
    <text x="570" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">EUR/USD spread</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Separate curves for discounting and projection | Basis adjustment for cross-currency</text>
  </svg>
)

// Vol Surface Construction Diagram
const VolSurfaceConstructDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Vol Surface Construction</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="#3b82f6"/>
    <text x="140" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Option Market Prices</text>
    <text x="140" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Strike × Expiry grid</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="#f59e0b"/>
    <text x="350" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Extract Implied Vols</text>
    <text x="350" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Newton-Raphson</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="#22c55e"/>
    <text x="560" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Bilinear Interpolation</text>
    <text x="560" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Strike + expiry dims</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Arbitrage-free constraints | SABR/SVI model fitting</text>
  </svg>
)

// Smile Dynamics Diagram
const SmileDynamicsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Smile Dynamics Models</text>
    <rect x="100" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="200" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Sticky Strike</text>
    <text x="200" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Vol at fixed K stays constant</text>
    <rect x="400" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="500" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Sticky Delta</text>
    <text x="500" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Vol at fixed Δ stays constant</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">SABR calibration: α (vol-of-vol), β (CEV), ρ (correlation), ν (smile)</text>
  </svg>
)

function PriceContribution({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    { id: 'price-engine', name: 'Pricing Engine', icon: '⚙️', color: '#3b82f6', description: 'Core price calculation infrastructure', diagram: PricingEngineDiagram,
      details: [
        { name: 'Price Calculation Pipeline', diagram: PricePipelineDiagram, explanation: 'Multi-stage pipeline for real-time price generation. Input market data from multiple sources. Apply spreads, skews, and adjustments. Risk-based pricing adjustments. Output to distribution layer.',
          codeExample: `// Real-Time Pricing Engine
@Service
public class PricingEngine {
    private final MarketDataService marketData;
    private final RiskService riskService;
    private final SpreadCalculator spreadCalc;

    // Price calculation triggered by market data update
    @EventListener
    public void onMarketDataUpdate(MarketDataEvent event) {
        String symbol = event.getSymbol();

        // Get base mid price
        Quote quote = event.getQuote();
        BigDecimal mid = quote.getBid().add(quote.getAsk())
            .divide(BigDecimal.valueOf(2), 8, RoundingMode.HALF_UP);

        // Calculate risk-adjusted spread
        PositionRisk risk = riskService.getPositionRisk(symbol);
        SpreadParams params = SpreadParams.builder()
            .baseSpread(getBaseSpread(symbol))
            .volatility(marketData.getVolatility(symbol))
            .positionRisk(risk)
            .marketCondition(getMarketCondition())
            .build();

        BigDecimal spread = spreadCalc.calculate(params);
        BigDecimal halfSpread = spread.divide(BigDecimal.valueOf(2), 8, RoundingMode.HALF_UP);

        // Generate two-way price
        TwoWayPrice price = TwoWayPrice.builder()
            .symbol(symbol)
            .bid(mid.subtract(halfSpread))
            .ask(mid.add(halfSpread))
            .bidSize(calculateBidSize(risk))
            .askSize(calculateAskSize(risk))
            .timestamp(System.nanoTime())
            .build();

        // Publish to distribution
        pricePublisher.publish(price);
    }
}` },
        { name: 'Spread Management', diagram: SpreadMgmtDiagram, explanation: 'Dynamic spread calculation based on multiple factors. Base spreads by instrument type. Volatility adjustments for market conditions. Inventory skew to manage position risk. Time-of-day adjustments.',
          codeExample: `// Dynamic Spread Calculator
@Service
public class SpreadCalculator {
    private final VolatilityService volatilityService;
    private final PositionService positionService;

    public BigDecimal calculate(SpreadParams params) {
        // 1. Base spread by instrument type
        BigDecimal baseSpread = getBaseSpread(params.getInstrumentType());

        // 2. Volatility adjustment (wider spread in volatile markets)
        double realizedVol = volatilityService.getRealizedVol(params.getSymbol());
        double volMultiplier = 1.0 + Math.max(0, (realizedVol - 0.15) * 2);

        // 3. Inventory skew (widen on side we want to reduce)
        long position = positionService.getPosition(params.getSymbol());
        double inventorySkew = calculateInventorySkew(position, params.getMaxPosition());

        // 4. Time-of-day adjustment (wider at open/close)
        double todMultiplier = getTimeOfDayMultiplier();

        // 5. Market condition (wider during high volatility events)
        double marketMultiplier = params.getMarketCondition().getSpreadMultiplier();

        BigDecimal finalSpread = baseSpread
            .multiply(BigDecimal.valueOf(volMultiplier))
            .multiply(BigDecimal.valueOf(todMultiplier))
            .multiply(BigDecimal.valueOf(marketMultiplier));

        // Apply inventory skew asymmetrically
        return finalSpread;
    }

    private double calculateInventorySkew(long position, long maxPosition) {
        // Linear skew based on position as % of max
        double utilizationPct = (double) position / maxPosition;
        // Skew up to 20% of spread based on position
        return 1.0 + (Math.abs(utilizationPct) * 0.2);
    }

    private double getTimeOfDayMultiplier() {
        LocalTime now = LocalTime.now(ZoneId.of("America/New_York"));
        // Wider at open (9:30-10:00) and close (3:30-4:00)
        if (now.isBefore(LocalTime.of(10, 0)) || now.isAfter(LocalTime.of(15, 30))) {
            return 1.3;
        }
        return 1.0;
    }
}` },
        { name: 'Price Laddering', diagram: PriceLadderDiagram, explanation: 'Multiple price tiers for different sizes. Tighter spreads for small sizes. Wider spreads for larger blocks. Configurable size buckets. Real-time ladder updates.',
          codeExample: `// Price Ladder Generator
public class PriceLadder {
    private final List<PriceTier> tiers;

    public PriceLadder(TwoWayPrice basePrice, LadderConfig config) {
        this.tiers = new ArrayList<>();

        BigDecimal currentBid = basePrice.getBid();
        BigDecimal currentAsk = basePrice.getAsk();

        for (SizeBucket bucket : config.getSizeBuckets()) {
            // Widen spread for larger sizes
            BigDecimal spreadWidening = config.getBaseSpread()
                .multiply(BigDecimal.valueOf(bucket.getSpreadMultiplier() - 1));

            BigDecimal tierBid = currentBid.subtract(spreadWidening.divide(TWO));
            BigDecimal tierAsk = currentAsk.add(spreadWidening.divide(TWO));

            tiers.add(new PriceTier(
                bucket.getMinSize(),
                bucket.getMaxSize(),
                tierBid,
                tierAsk
            ));
        }
    }

    public TwoWayPrice getPriceForSize(long size) {
        for (PriceTier tier : tiers) {
            if (size >= tier.getMinSize() && size <= tier.getMaxSize()) {
                return new TwoWayPrice(tier.getBid(), tier.getAsk(), size);
            }
        }
        // Size too large - return worst tier or reject
        PriceTier lastTier = tiers.get(tiers.size() - 1);
        return new TwoWayPrice(lastTier.getBid(), lastTier.getAsk(), size);
    }
}

// Ladder configuration
@Configuration
public class LadderConfig {
    @Bean
    public List<SizeBucket> sizeBuckets() {
        return List.of(
            new SizeBucket(0, 1_000, 1.0),      // Tight spread for retail
            new SizeBucket(1_001, 10_000, 1.2),  // Slightly wider
            new SizeBucket(10_001, 100_000, 1.5), // Institutional
            new SizeBucket(100_001, 1_000_000, 2.0) // Block trades
        );
    }
}` }
      ]
    },
    { id: 'contribution', name: 'Price Contribution', icon: '📡', color: '#8b5cf6', description: 'Publishing prices to trading venues', diagram: ContributionDiagram,
      details: [
        { name: 'Venue Connectivity', diagram: VenueConnectDiagram, explanation: 'Connect to multiple trading venues. Tradeweb, Bloomberg, MarketAxess. Venue-specific message formats. Connection monitoring and failover. Rate limiting per venue.',
          codeExample: `// Price Contribution Service
@Service
public class PriceContributionService {
    private final Map<String, VenueGateway> venueGateways;
    private final PriceTransformer transformer;

    public void contributePrice(TwoWayPrice price) {
        for (Map.Entry<String, VenueGateway> entry : venueGateways.entrySet()) {
            String venueName = entry.getKey();
            VenueGateway gateway = entry.getValue();

            if (!gateway.isConnected()) {
                log.warn("Venue {} disconnected, skipping", venueName);
                continue;
            }

            // Transform to venue-specific format
            VenuePrice venuePrice = transformer.transform(price, venueName);

            // Apply venue-specific rules
            if (venuePrice.getSpread().compareTo(gateway.getMinSpread()) < 0) {
                venuePrice = venuePrice.withSpread(gateway.getMinSpread());
            }

            // Rate limit check
            if (gateway.isRateLimited()) {
                rateLimitMetrics.increment(venueName);
                continue;
            }

            // Contribute asynchronously
            CompletableFuture.runAsync(() -> {
                try {
                    gateway.contributePrice(venuePrice);
                    contributionMetrics.recordSuccess(venueName);
                } catch (Exception e) {
                    log.error("Contribution failed for {}", venueName, e);
                    contributionMetrics.recordFailure(venueName);
                }
            }, contributionExecutor);
        }
    }
}

// Venue Gateway Interface
public interface VenueGateway {
    void contributePrice(VenuePrice price);
    void withdrawPrice(String symbol);
    boolean isConnected();
    boolean isRateLimited();
    BigDecimal getMinSpread();
}` },
        { name: 'Price Staleness', diagram: StalenessDiagram, explanation: 'Detect and handle stale prices. Maximum age thresholds. Auto-withdraw stale quotes. Heartbeat monitoring. Alerting on staleness.',
          codeExample: `// Price Staleness Monitor
@Service
public class PriceStalenessMonitor {
    private final Map<String, Long> lastUpdateTime = new ConcurrentHashMap<>();
    private final PriceContributionService contributionService;
    private final long maxAgeMs;

    @Scheduled(fixedRate = 100)  // Check every 100ms
    public void checkStaleness() {
        long now = System.currentTimeMillis();

        for (Map.Entry<String, Long> entry : lastUpdateTime.entrySet()) {
            String symbol = entry.getKey();
            long lastUpdate = entry.getValue();
            long age = now - lastUpdate;

            if (age > maxAgeMs) {
                handleStalePrice(symbol, age);
            } else if (age > maxAgeMs * 0.8) {
                // Warning threshold - price getting stale
                metrics.recordStalenessWarning(symbol);
            }
        }
    }

    private void handleStalePrice(String symbol, long age) {
        log.warn("Price stale for {} - age {}ms, withdrawing", symbol, age);

        // Withdraw from all venues
        contributionService.withdrawPrice(symbol);

        // Record metric
        metrics.recordStaleWithdrawal(symbol);

        // Alert if persistent
        if (age > maxAgeMs * 3) {
            alertService.raise(AlertLevel.WARNING,
                "Persistent stale price for " + symbol);
        }
    }

    public void recordPriceUpdate(String symbol) {
        lastUpdateTime.put(symbol, System.currentTimeMillis());
    }

    // Heartbeat for market data health
    @Scheduled(fixedRate = 1000)
    public void checkMarketDataHealth() {
        for (String symbol : activeSymbols) {
            if (!lastUpdateTime.containsKey(symbol) ||
                System.currentTimeMillis() - lastUpdateTime.get(symbol) > 5000) {
                alertService.raise(AlertLevel.CRITICAL,
                    "No market data for " + symbol);
            }
        }
    }
}` },
        { name: 'Contribution Throttling', diagram: ThrottlingDiagram, explanation: 'Rate limiting for venue compliance. Per-venue rate limits. Aggregation of rapid updates. Coalescing multiple updates. Priority queuing for important changes.',
          codeExample: `// Price Contribution Throttler
@Service
public class ContributionThrottler {
    private final Map<String, RateLimiter> venueLimiters = new ConcurrentHashMap<>();
    private final Map<String, TwoWayPrice> pendingPrices = new ConcurrentHashMap<>();

    public ContributionThrottler() {
        // Configure per-venue rate limits
        venueLimiters.put("TRADEWEB", RateLimiter.create(100));  // 100/sec
        venueLimiters.put("BLOOMBERG", RateLimiter.create(50));  // 50/sec
        venueLimiters.put("MARKETAXESS", RateLimiter.create(75)); // 75/sec
    }

    public void submitPrice(String venue, TwoWayPrice price) {
        String key = venue + ":" + price.getSymbol();

        // Coalesce rapid updates - keep latest
        TwoWayPrice previous = pendingPrices.put(key, price);

        if (previous == null) {
            // New price - schedule contribution
            scheduleContribution(venue, key);
        }
        // If previous exists, the price will be updated but contribution already scheduled
    }

    private void scheduleContribution(String venue, String key) {
        RateLimiter limiter = venueLimiters.get(venue);

        CompletableFuture.runAsync(() -> {
            // Wait for rate limit permit
            limiter.acquire();

            // Get latest coalesced price
            TwoWayPrice price = pendingPrices.remove(key);
            if (price != null) {
                venueGateway.contribute(venue, price);
                metrics.recordContribution(venue);
            }
        }, contributionExecutor);
    }

    // Priority queue for significant price changes
    public void submitPriorityPrice(String venue, TwoWayPrice price) {
        // Skip queue for large price moves
        if (isSignificantMove(price)) {
            RateLimiter limiter = venueLimiters.get(venue);
            if (limiter.tryAcquire()) {
                venueGateway.contribute(venue, price);
                pendingPrices.remove(venue + ":" + price.getSymbol());
            }
        } else {
            submitPrice(venue, price);
        }
    }
}` }
      ]
    },
    { id: 'yield-curve', name: 'Yield Curve Pricing', icon: '📈', color: '#22c55e', description: 'Interest rate curve construction and pricing', diagram: YieldCurveDiagram,
      details: [
        { name: 'Curve Construction', diagram: CurveConstructDiagram, explanation: 'Build yield curves from market instruments. Deposit rates for short end. Futures for intermediate. Swaps for long end. Interpolation methods (linear, cubic spline).',
          codeExample: `// Yield Curve Builder
public class YieldCurveBuilder {

    public YieldCurve buildCurve(List<MarketInstrument> instruments) {
        // Sort by maturity
        instruments.sort(Comparator.comparing(MarketInstrument::getMaturity));

        List<CurvePoint> points = new ArrayList<>();

        for (MarketInstrument inst : instruments) {
            double yearFraction = inst.getYearFraction();
            double rate;

            switch (inst.getType()) {
                case DEPOSIT:
                    // Simple rate to zero rate
                    rate = -Math.log(1 / (1 + inst.getRate() * yearFraction)) / yearFraction;
                    break;

                case FUTURE:
                    // Convert futures price to rate
                    double futuresRate = (100 - inst.getPrice()) / 100;
                    rate = convertToZeroRate(futuresRate, yearFraction);
                    break;

                case SWAP:
                    // Bootstrap swap rate
                    rate = bootstrapSwapRate(inst, points);
                    break;

                default:
                    throw new IllegalArgumentException("Unknown instrument type");
            }

            points.add(new CurvePoint(yearFraction, rate));
        }

        return new YieldCurve(points, InterpolationMethod.CUBIC_SPLINE);
    }

    private double bootstrapSwapRate(MarketInstrument swap, List<CurvePoint> existingPoints) {
        // Bootstrap zero rate from swap rate using existing curve points
        double swapRate = swap.getRate();
        double maturity = swap.getYearFraction();

        double pvFixed = 0;
        double pvFloating = 0;

        // Calculate PV of known cash flows
        for (double t = 0.5; t < maturity; t += 0.5) {
            double df = getDiscountFactor(existingPoints, t);
            pvFixed += swapRate * 0.5 * df;
            pvFloating += getForwardRate(existingPoints, t - 0.5, t) * 0.5 * df;
        }

        // Solve for final discount factor
        double finalDf = (1 - pvFixed) / (1 + swapRate * 0.5);

        return -Math.log(finalDf) / maturity;
    }
}` },
        { name: 'Curve Bumping', diagram: CurveBumpDiagram, explanation: 'Sensitivity analysis via curve shifts. Parallel shifts for DV01. Key rate durations. Twist and butterfly scenarios. Used for risk calculations.',
          codeExample: `// Yield Curve Bumping for Risk Analysis
public class CurveBumper {
    private final YieldCurve baseCurve;

    // DV01 - Parallel shift (1bp up)
    public double calculateDV01(Portfolio portfolio) {
        YieldCurve bumpedCurve = parallelShift(baseCurve, 0.0001); // 1bp
        double basePV = portfolio.calculatePV(baseCurve);
        double bumpedPV = portfolio.calculatePV(bumpedCurve);
        return basePV - bumpedPV;
    }

    // Key Rate Durations - bump individual tenors
    public Map<String, Double> calculateKeyRateDurations(Portfolio portfolio) {
        Map<String, Double> krds = new LinkedHashMap<>();
        String[] tenors = {"1Y", "2Y", "5Y", "10Y", "30Y"};

        double basePV = portfolio.calculatePV(baseCurve);

        for (String tenor : tenors) {
            YieldCurve bumpedCurve = bumpTenor(baseCurve, tenor, 0.0001);
            double bumpedPV = portfolio.calculatePV(bumpedCurve);
            krds.put(tenor, basePV - bumpedPV);
        }

        return krds;
    }

    // Scenario: Twist (steepening/flattening)
    public double calculateTwistSensitivity(Portfolio portfolio) {
        // Short end down 25bp, long end up 25bp
        YieldCurve twistedCurve = applyTwist(baseCurve, -0.0025, 0.0025);
        double basePV = portfolio.calculatePV(baseCurve);
        double twistedPV = portfolio.calculatePV(twistedCurve);
        return twistedPV - basePV;
    }

    private YieldCurve parallelShift(YieldCurve curve, double shift) {
        List<CurvePoint> shiftedPoints = curve.getPoints().stream()
            .map(p -> new CurvePoint(p.getTenor(), p.getRate() + shift))
            .collect(Collectors.toList());
        return new YieldCurve(shiftedPoints, curve.getInterpolation());
    }

    private YieldCurve bumpTenor(YieldCurve curve, String tenor, double bump) {
        double tenorYears = parseTenor(tenor);
        List<CurvePoint> bumpedPoints = curve.getPoints().stream()
            .map(p -> {
                if (Math.abs(p.getTenor() - tenorYears) < 0.01) {
                    return new CurvePoint(p.getTenor(), p.getRate() + bump);
                }
                return p;
            })
            .collect(Collectors.toList());
        return new YieldCurve(bumpedPoints, curve.getInterpolation());
    }
}` },
        { name: 'Multi-Curve Framework', diagram: MultiCurveDiagram, explanation: 'Separate discounting and projection curves. OIS curve for discounting. SOFR curve for projections. Basis between curves. Cross-currency considerations.',
          codeExample: `// Multi-Curve Pricing Framework
public class MultiCurveFramework {
    private final YieldCurve oisDiscountCurve;  // OIS for discounting
    private final YieldCurve sofrProjectionCurve; // SOFR for projections
    private final Map<String, YieldCurve> basisCurves;

    // Price a floating rate bond
    public double priceFloatingBond(FloatingRateBond bond) {
        double pv = 0;

        for (CashFlow cf : bond.getProjectedCashFlows()) {
            // Project floating rate from SOFR curve
            double forwardRate = sofrProjectionCurve.getForwardRate(
                cf.getAccrualStart(), cf.getAccrualEnd());

            // Add spread
            double couponRate = forwardRate + bond.getSpread();
            double cashFlow = bond.getNotional() * couponRate * cf.getDayCountFraction();

            // Discount using OIS curve
            double discountFactor = oisDiscountCurve.getDiscountFactor(cf.getPaymentDate());

            pv += cashFlow * discountFactor;
        }

        // Add principal repayment
        pv += bond.getNotional() * oisDiscountCurve.getDiscountFactor(bond.getMaturity());

        return pv;
    }

    // Price a cross-currency swap
    public double priceCrossCurrencySwap(CrossCurrencySwap swap) {
        // Get curves for both currencies
        YieldCurve usdOis = getCurve("USD", CurveType.OIS);
        YieldCurve eurOis = getCurve("EUR", CurveType.OIS);
        YieldCurve eurUsdBasis = basisCurves.get("EURUSD");

        double usdLegPv = 0;
        double eurLegPv = 0;

        // Price USD leg
        for (CashFlow cf : swap.getUsdLeg().getCashFlows()) {
            double df = usdOis.getDiscountFactor(cf.getPaymentDate());
            usdLegPv += cf.getAmount() * df;
        }

        // Price EUR leg with basis adjustment
        for (CashFlow cf : swap.getEurLeg().getCashFlows()) {
            double df = eurOis.getDiscountFactor(cf.getPaymentDate());
            double basisAdj = eurUsdBasis.getRate(cf.getPaymentDate());
            eurLegPv += cf.getAmount() * df * (1 + basisAdj);
        }

        // Convert EUR PV to USD at spot
        return usdLegPv - (eurLegPv * fxService.getSpot("EURUSD"));
    }
}` }
      ]
    },
    { id: 'volatility', name: 'Volatility Surfaces', icon: '🌊', color: '#f59e0b', description: 'Option pricing and volatility modeling', diagram: VolSurfaceDiagram,
      details: [
        { name: 'Vol Surface Construction', diagram: VolSurfaceConstructDiagram, explanation: 'Build volatility surface from option prices. Strike dimension (moneyness). Expiry dimension. Interpolation in both dimensions. Arbitrage-free constraints.',
          codeExample: `// Volatility Surface Builder
public class VolatilitySurface {
    private final double[][] volGrid;  // [strike][expiry]
    private final double[] strikes;
    private final double[] expiries;

    public double getVol(double strike, double expiry) {
        // Bilinear interpolation
        int strikeIdx = findIndex(strikes, strike);
        int expiryIdx = findIndex(expiries, expiry);

        double s1 = strikes[strikeIdx];
        double s2 = strikes[strikeIdx + 1];
        double e1 = expiries[expiryIdx];
        double e2 = expiries[expiryIdx + 1];

        // Get corner vols
        double v11 = volGrid[strikeIdx][expiryIdx];
        double v12 = volGrid[strikeIdx][expiryIdx + 1];
        double v21 = volGrid[strikeIdx + 1][expiryIdx];
        double v22 = volGrid[strikeIdx + 1][expiryIdx + 1];

        // Interpolate in strike dimension
        double ws = (strike - s1) / (s2 - s1);
        double v1 = v11 + ws * (v21 - v11);
        double v2 = v12 + ws * (v22 - v12);

        // Interpolate in expiry dimension
        double we = (expiry - e1) / (e2 - e1);
        return v1 + we * (v2 - v1);
    }

    // SABR model for smile dynamics
    public double sabrVol(double forward, double strike, double expiry,
                          double alpha, double beta, double rho, double nu) {
        double logMoneyness = Math.log(forward / strike);
        double fMid = Math.pow(forward * strike, (1 - beta) / 2);

        double z = (nu / alpha) * fMid * logMoneyness;
        double x = Math.log((Math.sqrt(1 - 2 * rho * z + z * z) + z - rho) / (1 - rho));

        double vol = (alpha / fMid) * (z / x);

        // Corrections for smile
        vol *= (1 + ((1 - beta) * (1 - beta) / 24) * Math.pow(logMoneyness, 2));

        return vol;
    }
}` },
        { name: 'Smile Dynamics', diagram: SmileDynamicsDiagram, explanation: 'Model how smile moves with spot. Sticky strike vs sticky delta. SABR model calibration. Local volatility models. Stochastic volatility.',
          codeExample: `// Smile Dynamics - Sticky Strike vs Sticky Delta
public class SmileDynamics {

    // Sticky Strike: Vol at fixed strike stays constant as spot moves
    public double getStickyStrikeVol(double strike, double newSpot,
                                      VolatilitySurface surface) {
        // Simply look up vol at the same absolute strike
        return surface.getVol(strike);
    }

    // Sticky Delta: Vol at fixed delta stays constant
    public double getStickyDeltaVol(double delta, double newSpot,
                                     VolatilitySurface surface, double expiry) {
        // Find strike that gives same delta at new spot
        double strike = findStrikeForDelta(delta, newSpot, surface, expiry);
        return surface.getVol(strike);
    }

    // SABR Model Calibration
    public SABRParams calibrateSABR(double forward, double[] strikes,
                                     double[] marketVols, double expiry) {
        // Initial guess
        double alpha = 0.2;   // Vol of vol
        double beta = 0.5;    // CEV exponent (often fixed)
        double rho = -0.3;    // Correlation
        double nu = 0.4;      // Vol of vol

        // Levenberg-Marquardt optimization
        LevenbergMarquardt optimizer = new LevenbergMarquardt();

        double[] params = optimizer.minimize(
            new SABRObjectiveFunction(forward, strikes, marketVols, expiry, beta),
            new double[]{alpha, rho, nu}
        );

        return new SABRParams(params[0], beta, params[1], params[2]);
    }

    // Local Vol from Dupire formula
    public double getLocalVol(double spot, double strike, double expiry,
                              VolatilitySurface impliedVolSurface) {
        double iv = impliedVolSurface.getVol(strike, expiry);
        double dIVdK = impliedVolSurface.dVoldStrike(strike, expiry);
        double dIVdT = impliedVolSurface.dVoldExpiry(strike, expiry);
        double d2IVdK2 = impliedVolSurface.d2VoldStrike2(strike, expiry);

        // Dupire formula for local vol
        double d1 = (Math.log(spot / strike) + 0.5 * iv * iv * expiry) / (iv * Math.sqrt(expiry));
        double localVarNumerator = iv * iv + 2 * iv * expiry * dIVdT;
        double localVarDenominator = Math.pow(1 + d1 * dIVdK * Math.sqrt(expiry), 2)
            + iv * expiry * (d2IVdK2 - d1 * Math.sqrt(expiry) * dIVdK * dIVdK);

        return Math.sqrt(localVarNumerator / localVarDenominator);
    }
}` },
        { name: 'Vol Surface Updates', explanation: 'Real-time surface updates from market. Recalibration on new trades. Delta hedging vol changes. Risk limits on vol exposure.',
          codeExample: `// Real-Time Volatility Surface Updates
@Service
public class VolSurfaceManager {
    private final Map<String, VolatilitySurface> surfaces = new ConcurrentHashMap<>();
    private final SABRCalibrator calibrator;

    @EventListener
    public void onOptionTrade(OptionTradeEvent event) {
        String underlying = event.getUnderlying();
        VolatilitySurface surface = surfaces.get(underlying);

        // Calculate implied vol from trade
        double impliedVol = BlackScholes.impliedVol(
            event.getPrice(),
            event.getSpot(),
            event.getStrike(),
            event.getExpiry(),
            event.getRate(),
            event.isCall()
        );

        // Update surface point
        surface.updatePoint(event.getStrike(), event.getExpiry(), impliedVol);

        // Check if recalibration needed
        if (surface.needsRecalibration()) {
            recalibrateSurface(underlying, surface);
        }

        // Notify risk system of vol change
        publishVolChange(underlying, event.getStrike(), event.getExpiry(), impliedVol);
    }

    private void recalibrateSurface(String underlying, VolatilitySurface surface) {
        // Recalibrate SABR params for each expiry
        for (double expiry : surface.getExpiries()) {
            double[] strikes = surface.getStrikesForExpiry(expiry);
            double[] vols = surface.getVolsForExpiry(expiry);
            double forward = forwardService.getForward(underlying, expiry);

            SABRParams params = calibrator.calibrate(forward, strikes, vols, expiry);
            surface.updateSABRParams(expiry, params);
        }

        log.info("Recalibrated vol surface for {}", underlying);
    }

    // Vega-weighted exposure limits
    public void checkVegaLimits(String desk) {
        double totalVega = 0;

        for (Position pos : positionService.getOptionPositions(desk)) {
            VolatilitySurface surface = surfaces.get(pos.getUnderlying());
            double vega = pos.calculateVega(surface);
            totalVega += vega;
        }

        if (Math.abs(totalVega) > deskLimits.getMaxVega(desk)) {
            alertService.raise(AlertLevel.WARNING,
                desk + " vega limit breach: " + totalVega);
        }
    }
}` }
      ]
    },
    { id: 'distribution', name: 'Price Distribution', icon: '🔄', color: '#ef4444', description: 'Low-latency price publishing',
      details: [
        { name: 'Multicast Distribution', explanation: 'UDP multicast for internal distribution. Single packet to many consumers. Minimal latency overhead. Reliable multicast protocols. Topic-based filtering.',
          codeExample: `// Aeron-based Price Distribution
public class PriceDistributor {
    private final Aeron aeron;
    private final Publication publication;
    private final PriceEncoder encoder;
    private final UnsafeBuffer buffer;

    public PriceDistributor(String channel, int streamId) {
        this.aeron = Aeron.connect();
        this.publication = aeron.addPublication(channel, streamId);
        this.encoder = new PriceEncoder();
        this.buffer = new UnsafeBuffer(ByteBuffer.allocateDirect(256));
    }

    public void distribute(TwoWayPrice price) {
        // Encode price using SBE (zero allocation)
        encoder.wrap(buffer, 0)
            .symbolId(price.getSymbolId())
            .bid(price.getBidAsLong())
            .ask(price.getAskAsLong())
            .bidSize(price.getBidSize())
            .askSize(price.getAskSize())
            .timestamp(price.getTimestamp());

        int length = encoder.encodedLength();

        // Publish with back-pressure handling
        long result;
        while ((result = publication.offer(buffer, 0, length)) < 0) {
            if (result == Publication.BACK_PRESSURED) {
                // Apply back-pressure strategy
                LockSupport.parkNanos(100);
            } else if (result == Publication.NOT_CONNECTED) {
                log.warn("No subscribers connected");
                return;
            } else if (result == Publication.CLOSED) {
                throw new IllegalStateException("Publication closed");
            }
        }
    }

    // Subscriber side
    public static class PriceSubscriber implements FragmentHandler {
        private final PriceDecoder decoder = new PriceDecoder();
        private final PriceListener listener;

        @Override
        public void onFragment(DirectBuffer buffer, int offset, int length, Header header) {
            decoder.wrap(buffer, offset);

            TwoWayPrice price = TwoWayPrice.builder()
                .symbolId(decoder.symbolId())
                .bid(decoder.bid())
                .ask(decoder.ask())
                .bidSize(decoder.bidSize())
                .askSize(decoder.askSize())
                .timestamp(decoder.timestamp())
                .build();

            listener.onPrice(price);
        }
    }
}` },
        { name: 'Conflation', explanation: 'Aggregate rapid price updates. Keep only latest price per symbol. Configurable conflation windows. Reduce downstream load. Preserve latest state.',
          codeExample: `// Price Conflation Service
public class PriceConflator {
    private final Map<String, TwoWayPrice> latestPrices = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler;
    private final Duration conflationWindow;

    public PriceConflator(Duration conflationWindow) {
        this.conflationWindow = conflationWindow;
        this.scheduler = Executors.newSingleThreadScheduledExecutor();

        // Periodically flush conflated prices
        scheduler.scheduleAtFixedRate(
            this::flushPrices,
            conflationWindow.toMillis(),
            conflationWindow.toMillis(),
            TimeUnit.MILLISECONDS
        );
    }

    // Receive price update - only keep latest
    public void onPrice(TwoWayPrice price) {
        latestPrices.compute(price.getSymbol(), (key, existing) -> {
            if (existing == null || price.getTimestamp() > existing.getTimestamp()) {
                return price;
            }
            return existing;  // Keep existing if newer
        });
    }

    private void flushPrices() {
        Map<String, TwoWayPrice> toPublish = new HashMap<>();

        // Atomically swap out prices
        for (String symbol : latestPrices.keySet()) {
            TwoWayPrice price = latestPrices.remove(symbol);
            if (price != null) {
                toPublish.put(symbol, price);
            }
        }

        // Publish conflated batch
        if (!toPublish.isEmpty()) {
            publisher.publishBatch(toPublish);
            metrics.recordConflatedBatch(toPublish.size());
        }
    }
}

// Adaptive conflation based on load
public class AdaptiveConflator extends PriceConflator {
    @Override
    public void onPrice(TwoWayPrice price) {
        int queueDepth = downstreamQueue.size();

        // Increase conflation when queue is backing up
        if (queueDepth > 1000) {
            // Only publish if significant price change
            TwoWayPrice existing = latestPrices.get(price.getSymbol());
            if (existing != null && !isSignificantChange(existing, price)) {
                return;  // Skip minor update
            }
        }

        super.onPrice(price);
    }

    private boolean isSignificantChange(TwoWayPrice old, TwoWayPrice newPrice) {
        double midChange = Math.abs(newPrice.getMid() - old.getMid()) / old.getMid();
        return midChange > 0.0001;  // 1bp change
    }
}` },
        { name: 'Snapshot + Delta', explanation: 'Initial snapshot for new subscribers. Incremental deltas thereafter. Sequence numbers for ordering. Gap detection and recovery. Reduces bandwidth usage.',
          codeExample: `// Snapshot + Delta Distribution
public class SnapshotDeltaPublisher {
    private final Map<String, TwoWayPrice> currentState = new ConcurrentHashMap<>();
    private final AtomicLong sequenceNumber = new AtomicLong(0);

    // New subscriber requests snapshot
    public SnapshotMessage getSnapshot() {
        long snapshotSeq = sequenceNumber.get();
        Map<String, TwoWayPrice> snapshot = new HashMap<>(currentState);

        return new SnapshotMessage(snapshotSeq, snapshot);
    }

    // Publish delta updates
    public void publishUpdate(TwoWayPrice price) {
        long seq = sequenceNumber.incrementAndGet();

        // Update current state
        currentState.put(price.getSymbol(), price);

        // Create delta message
        DeltaMessage delta = new DeltaMessage(seq, price);

        // Publish to all subscribers
        subscribers.forEach(sub -> sub.onDelta(delta));
    }
}

// Subscriber with gap detection
public class DeltaSubscriber {
    private long lastSeq = -1;
    private final Map<String, TwoWayPrice> localState = new ConcurrentHashMap<>();

    public void initialize(SnapshotDeltaPublisher publisher) {
        // Get initial snapshot
        SnapshotMessage snapshot = publisher.getSnapshot();
        localState.putAll(snapshot.getPrices());
        lastSeq = snapshot.getSequenceNumber();

        log.info("Initialized with snapshot at seq {}", lastSeq);
    }

    public void onDelta(DeltaMessage delta) {
        long expectedSeq = lastSeq + 1;

        if (delta.getSequenceNumber() != expectedSeq) {
            // Gap detected!
            log.warn("Gap detected: expected {}, got {}", expectedSeq, delta.getSequenceNumber());
            requestRecovery(expectedSeq, delta.getSequenceNumber());
            return;
        }

        // Apply delta
        localState.put(delta.getPrice().getSymbol(), delta.getPrice());
        lastSeq = delta.getSequenceNumber();
    }

    private void requestRecovery(long from, long to) {
        // Request snapshot or missing deltas
        if (to - from > 100) {
            // Too many gaps - request full snapshot
            initialize(publisher);
        } else {
            // Request specific deltas
            List<DeltaMessage> missing = publisher.getDeltas(from, to);
            for (DeltaMessage delta : missing) {
                localState.put(delta.getPrice().getSymbol(), delta.getPrice());
            }
            lastSeq = to;
        }
    }
}` }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null
  const buildBreadcrumbStack = () => { const stack = [{ name: 'eTrading', icon: '📈' }, { name: 'Real-time Pricing', icon: '💰' }]; if (selectedConcept) stack.push({ name: selectedConcept.name, icon: selectedConcept.icon }); return stack }
  const handleBreadcrumbClick = (index) => { if (index === 0) onBack(); else if (index === 1 && selectedConcept) setSelectedConceptIndex(null) }
  const handlePreviousConcept = () => { if (selectedConceptIndex > 0) { setSelectedConceptIndex(selectedConceptIndex - 1); setSelectedDetailIndex(0) } }
  const handleNextConcept = () => { if (selectedConceptIndex < concepts.length - 1) { setSelectedConceptIndex(selectedConceptIndex + 1); setSelectedDetailIndex(0) } }
  useEffect(() => { const h = (e) => { if (e.key === 'Escape') { e.preventDefault(); selectedConcept ? setSelectedConceptIndex(null) : onBack() } else if (e.key === 'ArrowLeft' && selectedConcept) { e.preventDefault(); handlePreviousConcept() } else if (e.key === 'ArrowRight' && selectedConcept) { e.preventDefault(); handleNextConcept() } }; document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h) }, [selectedConceptIndex, onBack])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #065f46 50%, #0f172a 100%)', padding: '2rem', fontFamily: 'system-ui' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(135deg, #4ade80, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Real-time Pricing</h1>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '0.5rem', color: '#4ade80', cursor: 'pointer' }}>← Back to eTrading</button>
      </div>
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}><Breadcrumb breadcrumbStack={buildBreadcrumbStack()} onBreadcrumbClick={handleBreadcrumbClick} colors={ETRADING_COLORS} onMainMenu={breadcrumb?.onMainMenu} /></div>
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
          <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '1rem', padding: '2rem', width: '95vw', maxWidth: '1400px', height: '90vh', overflow: 'auto', border: `1px solid ${selectedConcept.color}40` }} onClick={(e) => e.stopPropagation()}>
            <Breadcrumb breadcrumbStack={buildBreadcrumbStack()} onBreadcrumbClick={handleBreadcrumbClick} colors={ETRADING_COLORS} onMainMenu={breadcrumb?.onMainMenu} />
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

export default PriceContribution

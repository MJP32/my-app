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

// Delta Hedging Diagram
const DeltaHedgingDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Delta-Neutral Hedging</text>
    <rect x="50" y="50" width="150" height="70" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="125" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Option Position</text>
    <text x="125" y="95" textAnchor="middle" fill="#fecaca" fontSize="9">Delta = +500</text>
    <text x="125" y="110" textAnchor="middle" fill="#fecaca" fontSize="8">(Long exposure)</text>
    <rect x="275" y="50" width="150" height="70" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Hedge Trade</text>
    <text x="350" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="9">Sell 500 shares</text>
    <text x="350" y="110" textAnchor="middle" fill="#bbf7d0" fontSize="8">Delta = -500</text>
    <rect x="500" y="50" width="150" height="70" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="575" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Net Position</text>
    <text x="575" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="9">Delta = 0</text>
    <text x="575" y="110" textAnchor="middle" fill="#bfdbfe" fontSize="8">(Delta-neutral)</text>
    <line x1="200" y1="85" x2="270" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="425" y1="85" x2="495" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <text x="235" y="78" fill="#4ade80" fontSize="10">+</text>
    <text x="460" y="78" fill="#4ade80" fontSize="10">=</text>
    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="10">Rebalance as delta changes (gamma hedging)</text>
  </svg>
)

// Gamma Hedging Diagram
const GammaHedgingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Gamma - Delta Sensitivity</text>
    <rect x="50" y="50" width="180" height="60" rx="6" fill="#8b5cf6"/>
    <text x="140" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">High Gamma</text>
    <text x="140" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="8">Delta changes rapidly → Frequent rehedging</text>
    <rect x="260" y="50" width="180" height="60" rx="6" fill="#f59e0b"/>
    <text x="350" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ATM Options</text>
    <text x="350" y="95" textAnchor="middle" fill="#fef3c7" fontSize="8">Maximum gamma near strike</text>
    <rect x="470" y="50" width="180" height="60" rx="6" fill="#22c55e"/>
    <text x="560" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Hedge Cost</text>
    <text x="560" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="8">Trade-off: frequency vs slippage</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="10">Gamma P&L ≈ ½ × Γ × (ΔS)² - Rehedge when delta exceeds threshold</text>
  </svg>
)

// Vega Hedging Diagram
const VegaHedgingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Vega Hedging - Volatility Exposure</text>
    <rect x="50" y="50" width="200" height="70" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Long Vega Position</text>
    <text x="150" y="95" textAnchor="middle" fill="#fecaca" fontSize="9">Profits when vol rises</text>
    <text x="150" y="110" textAnchor="middle" fill="#fecaca" fontSize="8">Long options portfolio</text>
    <rect x="450" y="50" width="200" height="70" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="550" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Hedge with Variance Swap</text>
    <text x="550" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="9">Pay realized vol</text>
    <text x="550" y="110" textAnchor="middle" fill="#bbf7d0" fontSize="8">Short vega exposure</text>
    <line x1="250" y1="85" x2="445" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="80" fill="#4ade80" fontSize="10">Offset →</text>
    <text x="350" y="155" textAnchor="middle" fill="#64748b" fontSize="10">Vega = ∂V/∂σ | Hedge with options of different strikes/tenors</text>
  </svg>
)

// Delta Calculation Diagram
const DeltaCalcDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Delta Calculation by Instrument</text>
    <rect x="50" y="50" width="150" height="55" rx="4" fill="#3b82f6"/>
    <text x="125" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Bonds / Swaps</text>
    <text x="125" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Delta = DV01 × Position</text>
    <rect x="220" y="50" width="150" height="55" rx="4" fill="#22c55e"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Options</text>
    <text x="295" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Delta = ∂V/∂S × Qty</text>
    <rect x="390" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="465" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Equities</text>
    <text x="465" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Delta = 1 × Position</text>
    <rect x="560" y="50" width="100" height="55" rx="4" fill="#8b5cf6"/>
    <text x="610" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Aggregate</text>
    <text x="610" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">Σ Deltas</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Net portfolio delta = Sum of all position deltas by underlying</text>
  </svg>
)

// Continuous Hedging Diagram
const ContinuousHedgingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Continuous Hedging with Bands</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Upper Band (+1000)</text>
    <text x="140" y="90" textAnchor="middle" fill="#fca5a5" fontSize="8">Trigger: SELL hedge</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Target: Δ = 0</text>
    <text x="350" y="90" textAnchor="middle" fill="#86efac" fontSize="8">Delta-neutral zone</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Lower Band (-1000)</text>
    <text x="560" y="90" textAnchor="middle" fill="#fca5a5" fontSize="8">Trigger: BUY hedge</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Check every 100ms | High gamma = smaller bands | Rebalance on breach</text>
  </svg>
)

// Hedge Instruments Diagram
const HedgeInstrumentsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Hedge Instrument Selection</text>
    <rect x="50" y="50" width="150" height="55" rx="4" fill="#3b82f6"/>
    <text x="125" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Equity: ES Futures</text>
    <text x="125" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">SPY ETF, SSF</text>
    <rect x="220" y="50" width="150" height="55" rx="4" fill="#22c55e"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Rates: UST Futures</text>
    <text x="295" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">TU, FV, TY, US</text>
    <rect x="390" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="465" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">FX: Forwards</text>
    <text x="465" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Spot, NDF</text>
    <rect x="560" y="50" width="100" height="55" rx="4" fill="#8b5cf6"/>
    <text x="610" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Score</text>
    <text x="610" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">Liq+Cost+Corr</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Select by: Liquidity (40%) + Cost (30%) + Correlation/Basis (30%)</text>
  </svg>
)

// Trade-Based Triggers Diagram
const TradeTriggeredDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Trade-Triggered Auto-Hedge</text>
    <rect x="50" y="50" width="140" height="55" rx="4" fill="#3b82f6"/>
    <text x="120" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Customer Trade</text>
    <text x="120" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Executed</text>
    <rect x="220" y="50" width="140" height="55" rx="4" fill="#f59e0b"/>
    <text x="290" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Check Config</text>
    <text x="290" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Auto-hedge enabled?</text>
    <rect x="390" y="50" width="140" height="55" rx="4" fill="#22c55e"/>
    <text x="460" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Calc Hedge Ratio</text>
    <text x="460" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Full/Partial/None</text>
    <rect x="560" y="50" width="100" height="55" rx="4" fill="#8b5cf6"/>
    <text x="610" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Execute</text>
    <text x="610" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">Async</text>
    <line x1="190" y1="77" x2="215" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <line x1="360" y1="77" x2="385" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <line x1="530" y1="77" x2="555" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Large trades = full hedge | Within comfort zone = partial/none</text>
  </svg>
)

// Threshold Triggers Diagram
const ThresholdTriggerDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Threshold-Based Hedge Triggers</text>
    {[
      { label: 'Delta', limit: '±$50K', color: '#3b82f6' },
      { label: 'Gamma', limit: '±$10K/1%', color: '#22c55e' },
      { label: 'Vega', limit: '±$25K/1%', color: '#f59e0b' },
      { label: 'DV01', limit: '±$100K', color: '#8b5cf6' },
      { label: 'VaR', limit: '<$500K', color: '#ef4444' }
    ].map((item, i) => (
      <g key={i}>
        <rect x={40 + i * 130} y="50" width="115" height="55" rx="4" fill={item.color}/>
        <text x={97 + i * 130} y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{item.label}</text>
        <text x={97 + i * 130} y="90" textAnchor="middle" fill="white" fontSize="8">{item.limit}</text>
      </g>
    ))}
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Check every 500ms | Breach → Immediate hedge execution</text>
  </svg>
)

// Time-Based Triggers Diagram
const TimeTriggeredDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Scheduled Hedge Triggers</text>
    <rect x="50" y="50" width="150" height="55" rx="4" fill="#3b82f6"/>
    <text x="125" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">EOD Squaring</text>
    <text x="125" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">3:45 PM ET</text>
    <rect x="220" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Pre-Event Hedge</text>
    <text x="295" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">30 min before FOMC</text>
    <rect x="390" y="50" width="150" height="55" rx="4" fill="#22c55e"/>
    <text x="465" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Weekend Reduction</text>
    <text x="465" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Friday 3:30 PM</text>
    <rect x="560" y="50" width="100" height="55" rx="4" fill="#ef4444"/>
    <text x="610" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Holiday</text>
    <text x="610" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">Extra risk cut</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Reduce to overnight limits | More aggressive before weekends/holidays</text>
  </svg>
)

// Cost Optimization Diagram
const CostOptimizationDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Hedge Cost Components</text>
    <rect x="50" y="50" width="150" height="55" rx="4" fill="#ef4444"/>
    <text x="125" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Transaction Cost</text>
    <text x="125" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">Spread + Commission</text>
    <rect x="220" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Basis Risk</text>
    <text x="295" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Correlation &lt; 1</text>
    <rect x="390" y="50" width="150" height="55" rx="4" fill="#3b82f6"/>
    <text x="465" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Capital Cost</text>
    <text x="465" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Margin requirements</text>
    <rect x="560" y="50" width="100" height="55" rx="4" fill="#22c55e"/>
    <text x="610" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Optimal</text>
    <text x="610" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Min total</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Total Cost = Trading + Basis × Risk Aversion + Capital</text>
  </svg>
)

// Portfolio Netting Diagram
const NettingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Portfolio Netting Before Hedging</text>
    <rect x="50" y="50" width="180" height="55" rx="4" fill="#ef4444"/>
    <text x="140" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Gross Hedges: $10M</text>
    <text x="140" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">Before netting</text>
    <rect x="260" y="50" width="180" height="55" rx="4" fill="#f59e0b"/>
    <text x="350" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Cross-Asset Net</text>
    <text x="350" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Corr > 0.8 offset</text>
    <rect x="470" y="50" width="180" height="55" rx="4" fill="#22c55e"/>
    <text x="560" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Net Hedges: $3M</text>
    <text x="560" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">70% cost savings</text>
    <line x1="230" y1="77" x2="255" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <line x1="440" y1="77" x2="465" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Batch orders within window | Net by underlying and correlated assets</text>
  </svg>
)

// Dynamic Rebalancing Diagram
const DynamicRebalanceDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Dynamic Hedge Parameter Adjustment</text>
    <rect x="50" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="125" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">High Vol</text>
    <text x="125" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Wider bands × √(σ)</text>
    <rect x="220" y="50" width="150" height="55" rx="4" fill="#ef4444"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Near Expiry</text>
    <text x="295" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">Tighter × 0.5</text>
    <rect x="390" y="50" width="150" height="55" rx="4" fill="#3b82f6"/>
    <text x="465" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Low Liquidity</text>
    <text x="465" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Wider × 1.5</text>
    <rect x="560" y="50" width="100" height="55" rx="4" fill="#22c55e"/>
    <text x="610" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Near Close</text>
    <text x="610" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Tighter × 0.7</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">ML optimization: Extract features → Predict optimal band/frequency/ratio</text>
  </svg>
)

// Effectiveness Metrics Diagram
const EffectivenessDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Hedge Effectiveness Measurement</text>
    <rect x="50" y="50" width="200" height="55" rx="4" fill="#3b82f6"/>
    <text x="150" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Effectiveness Ratio</text>
    <text x="150" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">-Hedge P&L / Hedged P&L</text>
    <rect x="280" y="50" width="200" height="55" rx="4" fill="#22c55e"/>
    <text x="380" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Variance Reduction</text>
    <text x="380" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">1 - σ²(combined)/σ²(hedged)</text>
    <rect x="510" y="50" width="140" height="55" rx="4" fill="#ef4444"/>
    <text x="580" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Alert Thresholds</text>
    <text x="580" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">0.8 &lt; ratio &lt; 1.25</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Measure hourly | Alert on drift | Track by hedge relationship</text>
  </svg>
)

// Slippage Analysis Diagram
const SlippageDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Hedge Slippage Analysis</text>
    <rect x="50" y="50" width="150" height="55" rx="4" fill="#3b82f6"/>
    <text x="125" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Decision Price</text>
    <text x="125" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">When hedge triggered</text>
    <rect x="220" y="50" width="150" height="55" rx="4" fill="#f59e0b"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Execution Price</text>
    <text x="295" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Actual fill price</text>
    <rect x="390" y="50" width="150" height="55" rx="4" fill="#ef4444"/>
    <text x="465" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Slippage (bps)</text>
    <text x="465" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">Decision - Execution</text>
    <rect x="560" y="50" width="100" height="55" rx="4" fill="#8b5cf6"/>
    <text x="610" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Impact</text>
    <text x="610" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">Post-trade</text>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Daily analysis by: Underlying, Time of day, Size | Alert if avg > 5bps</text>
  </svg>
)

function AutomatedHedging({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'delta-hedging',
      name: 'Delta Hedging',
      icon: 'Δ',
      color: '#8b5cf6',
      description: 'Neutralize directional risk through delta-neutral positions',
      diagram: DeltaHedgingDiagram,
      details: [
        {
          name: 'Delta Calculation',
          diagram: DeltaCalcDiagram,
          explanation: 'Delta measures sensitivity of position value to underlying price change. For linear products (bonds, swaps), delta is the DV01 or duration. For options, delta is the partial derivative of price with respect to spot. Aggregate delta across all positions for net exposure.',
          codeExample: `// Delta Hedging Engine
@Service
public class DeltaHedgingEngine {
    private final PositionService positionService;
    private final PricingService pricingService;
    private final OrderService orderService;

    // Calculate portfolio delta
    public PortfolioDelta calculateDelta(String portfolio) {
        Map<String, Double> deltas = new HashMap<>();

        for (Position position : positionService.getPositions(portfolio)) {
            String underlying = getUnderlying(position.getInstrument());
            double delta = calculatePositionDelta(position);

            deltas.merge(underlying, delta, Double::sum);
        }

        return new PortfolioDelta(deltas);
    }

    private double calculatePositionDelta(Position position) {
        Instrument instrument = position.getInstrument();

        if (instrument instanceof Bond) {
            // Bond delta = DV01 * position
            return pricingService.getDV01(instrument) * position.getQuantity();
        } else if (instrument instanceof Swap) {
            // Swap delta = sum of leg DV01s
            return pricingService.getSwapDV01(instrument) * position.getNotional();
        } else if (instrument instanceof Option) {
            // Option delta from pricing model
            OptionGreeks greeks = pricingService.getGreeks(instrument);
            return greeks.getDelta() * position.getQuantity() * instrument.getMultiplier();
        }

        return 0.0;
    }

    // Generate hedge orders to neutralize delta
    public List<Order> generateHedgeOrders(String portfolio, String hedgeInstrument) {
        PortfolioDelta delta = calculateDelta(portfolio);
        double netDelta = delta.getNetDelta(hedgeInstrument);

        if (Math.abs(netDelta) < getMinHedgeThreshold()) {
            return Collections.emptyList();
        }

        // Determine hedge direction and quantity
        Side side = netDelta > 0 ? Side.SELL : Side.BUY;
        long quantity = Math.round(Math.abs(netDelta));

        Order hedgeOrder = Order.builder()
            .symbol(hedgeInstrument)
            .side(side)
            .quantity(quantity)
            .orderType(OrderType.MARKET)
            .strategy("DELTA_HEDGE")
            .build();

        return List.of(hedgeOrder);
    }
}`
        },
        {
          name: 'Continuous Hedging',
          diagram: ContinuousHedgingDiagram,
          explanation: 'Real-time monitoring and rebalancing of hedges. Trigger hedging when delta exceeds threshold. Balance hedge frequency against transaction costs. Gamma affects hedge stability - high gamma requires frequent rebalancing. Consider hedging bands rather than exact delta neutrality.',
          codeExample: `// Continuous Delta Hedging with Bands
@Service
public class ContinuousHedger {
    private final DeltaHedgingEngine hedgingEngine;
    private final MarketDataService marketData;

    @Scheduled(fixedRate = 100)  // Check every 100ms
    public void monitorAndHedge() {
        for (String portfolio : getActivePortfolios()) {
            HedgeConfig config = getHedgeConfig(portfolio);
            PortfolioDelta delta = hedgingEngine.calculateDelta(portfolio);

            for (Map.Entry<String, Double> entry : delta.getDeltas().entrySet()) {
                String underlying = entry.getKey();
                double currentDelta = entry.getValue();
                double threshold = config.getDeltaThreshold(underlying);

                // Only hedge if outside band
                if (Math.abs(currentDelta) > threshold) {
                    executeHedge(portfolio, underlying, currentDelta, config);
                }
            }
        }
    }

    private void executeHedge(String portfolio, String underlying,
                               double currentDelta, HedgeConfig config) {
        // Target delta = 0 or configurable target
        double targetDelta = config.getTargetDelta(underlying);
        double hedgeAmount = currentDelta - targetDelta;

        // Apply gamma adjustment - more frequent hedging for high gamma
        double gamma = hedgingEngine.calculateGamma(portfolio, underlying);
        if (gamma > config.getHighGammaThreshold()) {
            // Reduce hedge size, expect to hedge again soon
            hedgeAmount *= 0.5;
        }

        // Execute hedge
        Order hedgeOrder = Order.builder()
            .symbol(config.getHedgeInstrument(underlying))
            .side(hedgeAmount > 0 ? Side.SELL : Side.BUY)
            .quantity(Math.abs((long) hedgeAmount))
            .orderType(OrderType.MARKET)
            .build();

        orderService.submit(hedgeOrder);
    }
}`
        },
        {
          name: 'Hedge Instruments',
          diagram: HedgeInstrumentsDiagram,
          explanation: 'Choose optimal instruments for hedging. Futures for equity delta hedging. Treasury futures for interest rate risk. FX forwards for currency exposure. Consider liquidity, cost, and basis risk in selection.',
          codeExample: `// Hedge Instrument Selection
@Service
public class HedgeInstrumentSelector {
    private final MarketDataService marketData;
    private final InstrumentService instruments;

    public HedgeInstrument selectOptimal(String underlying, HedgeRequirements req) {
        List<HedgeInstrument> candidates = getCandidates(underlying, req.getAssetClass());

        return candidates.stream()
            .map(inst -> scoreInstrument(inst, req))
            .max(Comparator.comparing(ScoredInstrument::getScore))
            .map(ScoredInstrument::getInstrument)
            .orElseThrow(() -> new NoHedgeInstrumentException(underlying));
    }

    private List<HedgeInstrument> getCandidates(String underlying, AssetClass assetClass) {
        switch (assetClass) {
            case EQUITY:
                // E-mini futures, ETFs, single stock futures
                return List.of(
                    new HedgeInstrument("ES", InstrumentType.FUTURE),   // S&P 500 futures
                    new HedgeInstrument("SPY", InstrumentType.ETF),     // S&P 500 ETF
                    new HedgeInstrument(underlying + "_FUT", InstrumentType.SSF) // Single stock
                );

            case FIXED_INCOME:
                // Treasury futures by duration bucket
                return List.of(
                    new HedgeInstrument("TU", InstrumentType.FUTURE),   // 2-year
                    new HedgeInstrument("FV", InstrumentType.FUTURE),   // 5-year
                    new HedgeInstrument("TY", InstrumentType.FUTURE),   // 10-year
                    new HedgeInstrument("US", InstrumentType.FUTURE)    // 30-year
                );

            case FX:
                return getFxForwards(underlying);

            default:
                throw new UnsupportedAssetClassException(assetClass);
        }
    }

    private ScoredInstrument scoreInstrument(HedgeInstrument inst, HedgeRequirements req) {
        double score = 0;

        // Liquidity score (higher is better)
        double adv = marketData.getAverageDailyVolume(inst.getSymbol());
        score += Math.min(adv / req.getHedgeSize(), 1.0) * 40;

        // Cost score (lower cost = higher score)
        double spreadCost = marketData.getSpread(inst.getSymbol());
        score += (1.0 - Math.min(spreadCost / 0.001, 1.0)) * 30;

        // Correlation/basis risk (higher correlation = higher score)
        double correlation = marketData.getCorrelation(req.getUnderlying(), inst.getSymbol());
        score += correlation * 30;

        return new ScoredInstrument(inst, score);
    }
}`
        }
      ]
    },
    {
      id: 'auto-hedge-triggers',
      name: 'Auto-Hedge Triggers',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Event-driven automatic hedge execution',
      diagram: GammaHedgingDiagram,
      details: [
        {
          name: 'Trade-Based Triggers',
          diagram: TradeTriggeredDiagram,
          explanation: 'Automatically hedge customer trades as they execute. Immediate hedging minimizes market risk. Configure delay for batching small trades. Different strategies for different client tiers. Hedge can be full or partial depending on risk appetite.',
          codeExample: `// Auto-Hedge on Trade Execution
@Service
public class TradeAutoHedger {
    private final HedgingEngine hedgingEngine;
    private final RiskService riskService;
    private final ConfigService config;

    @EventListener
    public void onTradeExecuted(TradeExecutedEvent event) {
        Trade trade = event.getTrade();

        // Check if auto-hedge is enabled for this instrument
        if (!config.isAutoHedgeEnabled(trade.getInstrument())) {
            return;
        }

        // Determine hedge ratio
        double hedgeRatio = getHedgeRatio(trade);

        if (hedgeRatio <= 0) {
            return;
        }

        // Calculate hedge
        HedgeRequest request = HedgeRequest.builder()
            .trade(trade)
            .hedgeRatio(hedgeRatio)
            .urgency(getUrgency(trade))
            .maxSlippage(config.getMaxHedgeSlippage())
            .build();

        // Execute hedge asynchronously
        CompletableFuture.runAsync(() -> {
            try {
                HedgeResult result = hedgingEngine.executeHedge(request);
                log.info("Auto-hedge completed: trade={}, hedgeOrders={}",
                    trade.getTradeId(), result.getOrders().size());
            } catch (Exception e) {
                log.error("Auto-hedge failed for trade {}", trade.getTradeId(), e);
                alertService.raiseAlert("AUTO_HEDGE_FAILED", trade.getTradeId());
            }
        });
    }

    private double getHedgeRatio(Trade trade) {
        // Full hedge for large trades
        if (trade.getNotional().compareTo(config.getLargeTradeThreshold()) > 0) {
            return 1.0;
        }

        // Partial hedge based on inventory
        double currentPosition = riskService.getPosition(trade.getInstrument());
        double newPosition = currentPosition + trade.getSignedQuantity();

        // Hedge only the portion that exceeds comfort zone
        double comfortLimit = riskService.getComfortLimit(trade.getInstrument());
        if (Math.abs(newPosition) > comfortLimit) {
            return (Math.abs(newPosition) - comfortLimit) / Math.abs(trade.getQuantity());
        }

        return 0.0;
    }
}`
        },
        {
          name: 'Threshold-Based Triggers',
          diagram: ThresholdTriggerDiagram,
          explanation: 'Trigger hedging when risk metrics exceed thresholds. Delta, gamma, vega thresholds for options books. DV01 limits for fixed income. VaR-based hedging for overall portfolio. Configurable per desk, portfolio, or trader.',
          codeExample: `// Threshold-Based Hedge Triggers
@Service
public class ThresholdHedgeTrigger {
    private final RiskService riskService;
    private final HedgingEngine hedgingEngine;
    private final ThresholdConfig thresholds;

    @Scheduled(fixedRate = 500)  // Check every 500ms
    public void checkThresholds() {
        for (String desk : getActiveDesks()) {
            RiskMetrics metrics = riskService.calculateMetrics(desk);

            // Delta threshold
            if (Math.abs(metrics.getNetDelta()) > thresholds.getDeltaLimit(desk)) {
                triggerDeltaHedge(desk, metrics.getNetDelta());
            }

            // Gamma threshold (for options)
            if (Math.abs(metrics.getGamma()) > thresholds.getGammaLimit(desk)) {
                triggerGammaHedge(desk, metrics.getGamma());
            }

            // Vega threshold
            if (Math.abs(metrics.getVega()) > thresholds.getVegaLimit(desk)) {
                triggerVegaHedge(desk, metrics.getVega());
            }

            // DV01 threshold (fixed income)
            if (Math.abs(metrics.getDV01()) > thresholds.getDV01Limit(desk)) {
                triggerDV01Hedge(desk, metrics.getDV01());
            }

            // VaR threshold
            if (metrics.getVaR() > thresholds.getVaRLimit(desk)) {
                triggerVaRReduction(desk, metrics);
            }
        }
    }

    private void triggerDeltaHedge(String desk, double delta) {
        log.info("Delta threshold breached for {}: {}", desk, delta);

        HedgeRequest request = HedgeRequest.builder()
            .desk(desk)
            .targetDelta(0)  // Neutralize
            .currentDelta(delta)
            .urgency(Urgency.HIGH)
            .build();

        hedgingEngine.executeHedge(request);
    }
}`
        },
        {
          name: 'Time-Based Triggers',
          diagram: TimeTriggeredDiagram,
          explanation: 'Scheduled hedging at regular intervals. End-of-day position squaring. Pre-event hedging (before announcements). Overnight risk reduction. Holiday and weekend risk management.',
          codeExample: `// Time-Based Hedge Triggers
@Service
public class ScheduledHedgeTrigger {
    private final HedgingEngine hedgingEngine;
    private final CalendarService calendar;

    // End of day position squaring - 3:45 PM
    @Scheduled(cron = "0 45 15 * * MON-FRI", zone = "America/New_York")
    public void endOfDaySquaring() {
        log.info("Executing end-of-day position squaring");

        for (String desk : getActiveDesks()) {
            SquaringConfig config = getSquaringConfig(desk);

            if (config.isEnabled()) {
                // Reduce positions to overnight limits
                reducePositions(desk, config.getOvernightLimits());
            }
        }
    }

    // Pre-event hedging - before major announcements
    @Scheduled(cron = "0 0 8 * * MON-FRI")
    public void checkUpcomingEvents() {
        List<MarketEvent> events = calendar.getEventsForToday();

        for (MarketEvent event : events) {
            if (event.isHighImpact()) {
                // Hedge 30 minutes before event
                Instant hedgeTime = event.getTime().minus(30, ChronoUnit.MINUTES);
                schedulePreEventHedge(event, hedgeTime);
            }
        }
    }

    // Weekend risk reduction - Friday 3:30 PM
    @Scheduled(cron = "0 30 15 * * FRI", zone = "America/New_York")
    public void weekendRiskReduction() {
        log.info("Executing weekend risk reduction");

        for (String desk : getActiveDesks()) {
            RiskMetrics metrics = riskService.calculateMetrics(desk);
            WeekendLimits limits = getWeekendLimits(desk);

            // More aggressive hedging for weekend
            if (metrics.getVaR() > limits.getMaxVaR()) {
                double reductionFactor = limits.getMaxVaR() / metrics.getVaR();
                reduceRiskByFactor(desk, reductionFactor);
            }
        }
    }

    // Holiday schedule adjustments
    private void schedulePreEventHedge(MarketEvent event, Instant hedgeTime) {
        scheduler.schedule(() -> {
            log.info("Pre-event hedge for: {}", event.getName());
            hedgingEngine.executePreEventHedge(event);
        }, hedgeTime);
    }
}`
        }
      ]
    },
    {
      id: 'hedge-optimization',
      name: 'Hedge Optimization',
      icon: '🎯',
      color: '#22c55e',
      description: 'Minimize hedging costs while managing risk',
      diagram: VegaHedgingDiagram,
      details: [
        {
          name: 'Cost Optimization',
          diagram: CostOptimizationDiagram,
          explanation: 'Balance risk reduction against hedging costs. Transaction costs: commissions, spreads, market impact. Opportunity cost of capital for margin. Basis risk between hedge and underlying. Optimize hedge frequency and size.',
          codeExample: `// Hedge Cost Optimizer
public class HedgeCostOptimizer {
    private final MarketDataService marketData;
    private final TransactionCostModel costModel;

    public OptimalHedge optimize(HedgeRequest request) {
        double targetDelta = request.getTargetDelta();
        List<HedgeInstrument> candidates = request.getCandidates();

        // Evaluate cost of hedging with each instrument
        List<HedgeOption> options = new ArrayList<>();

        for (HedgeInstrument instrument : candidates) {
            double hedgeQuantity = calculateHedgeQuantity(targetDelta, instrument);

            // Transaction costs
            double tradingCost = costModel.estimateCost(
                instrument.getSymbol(),
                hedgeQuantity,
                marketData.getQuote(instrument.getSymbol())
            );

            // Basis risk (correlation < 1 with underlying)
            double basisRisk = calculateBasisRisk(request.getUnderlying(), instrument);

            // Margin/capital cost
            double capitalCost = calculateCapitalCost(instrument, hedgeQuantity);

            // Total cost score
            double totalCost = tradingCost + basisRisk * request.getRiskAversion() + capitalCost;

            options.add(new HedgeOption(instrument, hedgeQuantity, totalCost, basisRisk));
        }

        // Select minimum cost option
        return options.stream()
            .min(Comparator.comparing(HedgeOption::getTotalCost))
            .map(opt -> new OptimalHedge(opt.getInstrument(), opt.getQuantity()))
            .orElseThrow();
    }

    private double calculateBasisRisk(String underlying, HedgeInstrument hedge) {
        // Historical correlation analysis
        double correlation = marketData.getCorrelation(underlying, hedge.getSymbol(), 60);
        double hedgeVolatility = marketData.getVolatility(hedge.getSymbol());
        double underlyingVolatility = marketData.getVolatility(underlying);

        // Basis risk = variance of hedge error
        return Math.sqrt(
            underlyingVolatility * underlyingVolatility +
            hedgeVolatility * hedgeVolatility -
            2 * correlation * underlyingVolatility * hedgeVolatility
        );
    }
}`
        },
        {
          name: 'Portfolio Netting',
          diagram: NettingDiagram,
          explanation: 'Net offsetting positions before hedging. Reduce gross hedging requirements. Cross-asset netting where correlated. Time-based batching of hedge orders. Significant cost savings for active trading desks.',
          codeExample: `// Portfolio Netting for Hedge Optimization
@Service
public class HedgeNettingService {
    private final PositionService positions;
    private final CorrelationService correlations;

    public NettedHedgeRequirements calculateNettedHedges(String desk) {
        Map<String, Double> rawDeltas = new HashMap<>();

        // Collect all deltas by underlying
        for (Position pos : positions.getPositions(desk)) {
            String underlying = getUnderlying(pos.getInstrument());
            double delta = calculateDelta(pos);
            rawDeltas.merge(underlying, delta, Double::sum);
        }

        // Cross-asset netting for correlated underlyings
        Map<String, Double> nettedDeltas = new HashMap<>();

        for (Map.Entry<String, Double> entry : rawDeltas.entrySet()) {
            String underlying = entry.getKey();
            double delta = entry.getValue();

            // Check for highly correlated positions that can offset
            String bestCorrelate = findBestCorrelate(underlying, rawDeltas.keySet());
            if (bestCorrelate != null) {
                double correlation = correlations.getCorrelation(underlying, bestCorrelate);

                if (correlation > 0.8) {
                    // Net against correlated position
                    double correlateDelta = rawDeltas.get(bestCorrelate);
                    double netDelta = delta + correlateDelta * correlation;

                    nettedDeltas.put(underlying, netDelta);
                    rawDeltas.remove(bestCorrelate);  // Already netted
                    continue;
                }
            }

            nettedDeltas.put(underlying, delta);
        }

        return new NettedHedgeRequirements(rawDeltas, nettedDeltas,
            calculateSavings(rawDeltas, nettedDeltas));
    }

    // Batch hedge orders within time window
    public List<Order> batchHedgeOrders(String desk, Duration window) {
        List<PendingHedge> pendingHedges = collectPendingHedges(desk, window);

        // Net pending hedges by instrument
        Map<String, Long> netQuantities = pendingHedges.stream()
            .collect(Collectors.groupingBy(
                PendingHedge::getInstrument,
                Collectors.summingLong(PendingHedge::getSignedQuantity)
            ));

        // Generate single order per instrument
        return netQuantities.entrySet().stream()
            .filter(e -> e.getValue() != 0)
            .map(e -> createHedgeOrder(e.getKey(), e.getValue()))
            .collect(Collectors.toList());
    }
}`
        },
        {
          name: 'Dynamic Rebalancing',
          diagram: DynamicRebalanceDiagram,
          explanation: 'Adjust hedge parameters based on market conditions. Widen bands in high volatility. Tighter hedging approaching expiry. Reduce frequency in illiquid markets. Machine learning for optimal parameters.',
          codeExample: `// Dynamic Hedge Rebalancing
@Service
public class DynamicRebalancer {
    private final VolatilityService volatility;
    private final LiquidityService liquidity;

    public HedgeParameters calculateDynamicParams(String underlying, Position position) {
        HedgeParameters params = new HedgeParameters();

        // 1. Volatility-based band adjustment
        double currentVol = volatility.getImpliedVol(underlying);
        double normalVol = volatility.getHistoricalAvgVol(underlying);
        double volRatio = currentVol / normalVol;

        // Widen bands in high vol, tighten in low vol
        double baseBand = getBaseDeltaBand(underlying);
        params.setDeltaBand(baseBand * Math.sqrt(volRatio));

        // 2. Time-to-expiry adjustment (for options)
        if (position.hasOptions()) {
            double avgDTE = position.getAverageDaysToExpiry();

            if (avgDTE < 5) {
                // Approaching expiry - tighter bands
                params.setDeltaBand(params.getDeltaBand() * 0.5);
                params.setHedgeFrequencyMultiplier(2.0);
            }
        }

        // 3. Liquidity-based frequency adjustment
        double liquidityScore = liquidity.getScore(underlying);

        if (liquidityScore < 0.5) {
            // Illiquid - reduce hedge frequency, increase bands
            params.setDeltaBand(params.getDeltaBand() * 1.5);
            params.setHedgeFrequencyMultiplier(0.5);
        }

        // 4. Market hours adjustment
        if (isNearMarketClose()) {
            // Tighter hedging near close
            params.setDeltaBand(params.getDeltaBand() * 0.7);
        }

        return params;
    }

    // ML-based parameter optimization (trained on historical data)
    public HedgeParameters mlOptimizedParams(String underlying, MarketState state) {
        double[] features = extractFeatures(underlying, state);
        double[] predictions = mlModel.predict(features);

        return HedgeParameters.builder()
            .deltaBand(predictions[0])
            .hedgeFrequency(predictions[1])
            .hedgeRatio(predictions[2])
            .build();
    }
}`
        }
      ]
    },
    {
      id: 'hedge-monitoring',
      name: 'Hedge Effectiveness',
      icon: '📊',
      color: '#3b82f6',
      description: 'Monitor and measure hedging performance',
      details: [
        {
          name: 'Effectiveness Metrics',
          diagram: EffectivenessDiagram,
          explanation: 'Measure how well hedges reduce risk. Hedge ratio: actual vs theoretical. P&L attribution: hedge vs underlying. Variance reduction from hedging. Tracking error analysis.',
          codeExample: `// Hedge Effectiveness Monitor
@Service
public class HedgeEffectivenessMonitor {
    private final PositionService positionService;
    private final PnLService pnlService;

    @Scheduled(cron = "0 0 * * * *")  // Hourly
    public void calculateEffectiveness() {
        for (HedgeRelationship hedge : getActiveHedges()) {
            HedgeEffectiveness effectiveness = calculate(hedge);
            metricsService.record(hedge.getId(), effectiveness);

            // Alert if hedge is ineffective
            if (effectiveness.getRatio() < 0.8 || effectiveness.getRatio() > 1.25) {
                alertService.warn("HEDGE_DRIFT",
                    "Hedge %s effectiveness: %.2f", hedge.getId(), effectiveness.getRatio());
            }
        }
    }

    public HedgeEffectiveness calculate(HedgeRelationship hedge) {
        // Get P&L for hedged item and hedging instrument
        Period period = Period.ofDays(1);

        double hedgedItemPnL = pnlService.getPnL(hedge.getHedgedItem(), period);
        double hedgingInstrumentPnL = pnlService.getPnL(hedge.getHedgingInstrument(), period);

        // Effectiveness = -Hedge P&L / Hedged Item P&L
        double effectiveness = hedgedItemPnL != 0
            ? -hedgingInstrumentPnL / hedgedItemPnL
            : 1.0;

        // Calculate variance reduction
        double[] hedgedItemReturns = pnlService.getDailyReturns(hedge.getHedgedItem(), 30);
        double[] hedgeReturns = pnlService.getDailyReturns(hedge.getHedgingInstrument(), 30);
        double[] combinedReturns = combineReturns(hedgedItemReturns, hedgeReturns);

        double varianceReduction = 1 - variance(combinedReturns) / variance(hedgedItemReturns);

        return HedgeEffectiveness.builder()
            .ratio(effectiveness)
            .varianceReduction(varianceReduction)
            .hedgedItemPnL(hedgedItemPnL)
            .hedgePnL(hedgingInstrumentPnL)
            .netPnL(hedgedItemPnL + hedgingInstrumentPnL)
            .build();
    }
}`
        },
        {
          name: 'Slippage Analysis',
          diagram: SlippageDiagram,
          explanation: 'Measure execution quality of hedge orders. Compare executed price to decision price. Track market impact of hedge trades. Identify systematic slippage patterns. Optimize execution timing and venue selection.',
          codeExample: `// Hedge Slippage Analysis
@Service
public class HedgeSlippageAnalyzer {
    private final ExecutionService executions;
    private final MarketDataService marketData;

    public SlippageReport analyzeHedge(HedgeExecution execution) {
        // Decision price = price when hedge decision was made
        BigDecimal decisionPrice = execution.getDecisionPrice();

        // Execution price = actual fill price
        BigDecimal executionPrice = execution.getAverageFillPrice();

        // Calculate slippage (negative = worse than expected)
        BigDecimal slippage = execution.getSide() == Side.BUY
            ? decisionPrice.subtract(executionPrice)
            : executionPrice.subtract(decisionPrice);

        // Slippage in basis points
        BigDecimal slippageBps = slippage.divide(decisionPrice, 6, RoundingMode.HALF_UP)
            .multiply(BigDecimal.valueOf(10000));

        // Market impact estimation
        BigDecimal preBid = marketData.getHistoricalBid(execution.getSymbol(),
            execution.getStartTime());
        BigDecimal postBid = marketData.getHistoricalBid(execution.getSymbol(),
            execution.getEndTime().plus(1, ChronoUnit.MINUTES));

        BigDecimal marketImpact = postBid.subtract(preBid).abs();

        // Timing analysis
        Duration executionDuration = Duration.between(
            execution.getStartTime(), execution.getEndTime());

        return SlippageReport.builder()
            .executionId(execution.getId())
            .symbol(execution.getSymbol())
            .side(execution.getSide())
            .quantity(execution.getQuantity())
            .decisionPrice(decisionPrice)
            .executionPrice(executionPrice)
            .slippageBps(slippageBps)
            .marketImpact(marketImpact)
            .executionDuration(executionDuration)
            .build();
    }

    // Aggregate slippage by pattern
    @Scheduled(cron = "0 0 18 * * *")  // Daily analysis at 6 PM
    public void dailySlippageAnalysis() {
        List<HedgeExecution> todayExecutions = executions.getTodaysHedges();

        // Group by underlying
        Map<String, DoubleSummaryStatistics> slippageByUnderlying = todayExecutions.stream()
            .collect(Collectors.groupingBy(
                HedgeExecution::getUnderlying,
                Collectors.summarizingDouble(e -> analyzeHedge(e).getSlippageBps().doubleValue())
            ));

        // Group by time of day
        Map<Integer, DoubleSummaryStatistics> slippageByHour = todayExecutions.stream()
            .collect(Collectors.groupingBy(
                e -> e.getStartTime().getHour(),
                Collectors.summarizingDouble(e -> analyzeHedge(e).getSlippageBps().doubleValue())
            ));

        // Alert on systematic patterns
        for (var entry : slippageByUnderlying.entrySet()) {
            if (entry.getValue().getAverage() < -5) {  // > 5bps average slippage
                alertService.warn("HIGH_HEDGE_SLIPPAGE",
                    "Average slippage for %s: %.2f bps",
                    entry.getKey(), entry.getValue().getAverage());
            }
        }
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
      { name: 'Automated Hedging', icon: '🔄', page: 'Automated Hedging' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #c084fc, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(168, 85, 247, 0.2)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '0.5rem',
    color: '#c084fc',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Automated Hedging</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)'
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
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
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

export default AutomatedHedging

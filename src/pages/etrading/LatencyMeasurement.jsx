/**
 * Latency Measurement - eTrading Systems
 *
 * Comprehensive guide to measuring and analyzing latency in trading systems.
 * Covers tools, techniques, hardware timestamping, and best practices.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const LATENCY_COLORS = {
  primary: '#f59e0b',
  primaryHover: '#fbbf24',
  bg: 'rgba(245, 158, 11, 0.1)',
  border: 'rgba(245, 158, 11, 0.3)',
  arrow: '#f59e0b',
  hoverBg: 'rgba(245, 158, 11, 0.2)',
  topicBg: 'rgba(245, 158, 11, 0.2)'
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

const LatencyBreakdownDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="latencyArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      End-to-End Latency Breakdown
    </text>

    {/* Timeline */}
    <line x1="50" y1="80" x2="750" y2="80" stroke="#475569" strokeWidth="2" markerEnd="url(#latencyArrow)"/>

    {/* Network In */}
    <rect x="60" y="100" width="100" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Network In</text>
    <text x="110" y="145" textAnchor="middle" fill="#bfdbfe" fontSize="9">50-200μs</text>
    <text x="110" y="185" textAnchor="middle" fill="#94a3b8" fontSize="8">NIC, kernel</text>

    {/* Application Processing */}
    <rect x="180" y="100" width="150" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="255" y="120" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">App Processing</text>
    <text x="255" y="140" textAnchor="middle" fill="#bbf7d0" fontSize="9">10-100μs</text>
    <text x="255" y="185" textAnchor="middle" fill="#94a3b8" fontSize="8">Parse, validate, logic</text>

    {/* Business Logic */}
    <rect x="350" y="100" width="120" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="410" y="120" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Matching</text>
    <text x="410" y="140" textAnchor="middle" fill="#fef3c7" fontSize="9">5-50μs</text>
    <text x="410" y="185" textAnchor="middle" fill="#94a3b8" fontSize="8">Order book ops</text>

    {/* Response Prep */}
    <rect x="490" y="100" width="120" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="550" y="120" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Response</text>
    <text x="550" y="140" textAnchor="middle" fill="#ddd6fe" fontSize="9">5-20μs</text>
    <text x="550" y="185" textAnchor="middle" fill="#94a3b8" fontSize="8">Serialize</text>

    {/* Network Out */}
    <rect x="630" y="100" width="100" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="680" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Network Out</text>
    <text x="680" y="145" textAnchor="middle" fill="#fecaca" fontSize="9">50-200μs</text>
    <text x="680" y="185" textAnchor="middle" fill="#94a3b8" fontSize="8">Kernel, NIC</text>

    {/* Total */}
    <rect x="250" y="220" width="300" height="60" rx="10" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="245" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">
      Total: 120-570 microseconds
    </text>
    <text x="400" y="265" textAnchor="middle" fill="#94a3b8" fontSize="10">
      Target: {`<`}100μs for HFT, {`<`}1ms for standard trading
    </text>
  </svg>
)

const TimestampPointsDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Critical Timestamp Points
    </text>

    {/* Flow diagram */}
    <rect x="50" y="60" width="140" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">T1: NIC Arrival</text>
    <text x="120" y="98" textAnchor="middle" fill="#bfdbfe" fontSize="9">Hardware TS</text>

    <line x1="190" y1="85" x2="240" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#latencyArrow)"/>

    <rect x="240" y="60" width="140" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="310" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">T2: App Receive</text>
    <text x="310" y="98" textAnchor="middle" fill="#bbf7d0" fontSize="9">System.nanoTime()</text>

    <line x1="380" y1="85" x2="430" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#latencyArrow)"/>

    <rect x="430" y="60" width="140" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="500" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">T3: Processing</text>
    <text x="500" y="98" textAnchor="middle" fill="#fef3c7" fontSize="9">Business logic</text>

    <line x1="570" y1="85" x2="620" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#latencyArrow)"/>

    <rect x="620" y="60" width="140" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="690" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">T4: Send Start</text>
    <text x="690" y="98" textAnchor="middle" fill="#ddd6fe" fontSize="9">Before socket</text>

    {/* Vertical flow */}
    <line x1="690" y1="110" x2="690" y2="140" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#latencyArrow)"/>

    <rect x="620" y="145" width="140" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="690" y="167" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">T5: NIC Transmit</text>
    <text x="690" y="183" textAnchor="middle" fill="#fecaca" fontSize="9">Hardware TS</text>

    {/* Measurements */}
    <rect x="50" y="230" width="700" height="100" rx="10" fill="rgba(15, 23, 42, 0.8)" stroke="#475569" strokeWidth="1"/>
    <text x="400" y="255" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Key Latency Metrics</text>

    <text x="80" y="280" fill="#94a3b8" fontSize="10">• Network Latency: T2 - T1</text>
    <text x="80" y="300" fill="#94a3b8" fontSize="10">• Processing Latency: T4 - T2</text>
    <text x="80" y="320" fill="#94a3b8" fontSize="10">• Total Latency: T5 - T1</text>

    <text x="420" y="280" fill="#94a3b8" fontSize="10">• App-to-Wire: T5 - T4</text>
    <text x="420" y="300" fill="#94a3b8" fontSize="10">• Wire-to-App: T2 - T1</text>
    <text x="420" y="320" fill="#94a3b8" fontSize="10">• Logic Only: T3 - T2</text>
  </svg>
)

const HardwareTimestampDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Hardware vs Software Timestamping
    </text>

    {/* Software path */}
    <text x="200" y="60" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">Software (Slow)</text>

    <rect x="120" y="80" width="80" height="40" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
    <text x="160" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">NIC</text>

    <line x1="200" y1="100" x2="230" y2="100" stroke="#ef4444" strokeWidth="2"/>
    <text x="215" y="90" fill="#ef4444" fontSize="8">DMA</text>

    <rect x="230" y="80" width="80" height="40" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
    <text x="270" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">Kernel</text>

    <line x1="310" y1="100" x2="340" y2="100" stroke="#ef4444" strokeWidth="2"/>
    <text x="325" y="90" fill="#ef4444" fontSize="8">syscall</text>

    <rect x="340" y="80" width="80" height="40" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
    <text x="380" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">App</text>

    <text x="160" y="150" fill="#fca5a5" fontSize="9">Packet arrives</text>
    <text x="270" y="150" fill="#fca5a5" fontSize="9">Context switch</text>
    <text x="380" y="150" fill="#fca5a5" fontSize="9">🕒 Timestamp!</text>
    <text x="380" y="165" fill="#ef4444" fontSize="8" fontWeight="bold">+50-200μs jitter</text>

    {/* Hardware path */}
    <text x="600" y="60" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">Hardware (Accurate)</text>

    <rect x="520" y="80" width="80" height="40" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
    <text x="560" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">NIC</text>

    <circle cx="560" cy="95" r="3" fill="#22c55e"/>
    <text x="560" y="150" fill="#86efac" fontSize="9">🕒 Timestamp!</text>
    <text x="560" y="165" fill="#22c55e" fontSize="8" fontWeight="bold">{`<`}1μs accuracy</text>

    <line x1="600" y1="100" x2="630" y2="100" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2"/>

    <rect x="630" y="80" width="80" height="40" rx="6" fill="rgba(30, 41, 59, 0.5)" stroke="#475569" strokeWidth="1"/>
    <text x="670" y="105" textAnchor="middle" fill="#64748b" fontSize="10">Kernel</text>

    {/* Comparison */}
    <rect x="100" y="200" width="600" height="100" rx="10" fill="rgba(34, 197, 94, 0.1)" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="1"/>
    <text x="400" y="225" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">
      Why Hardware Timestamping Matters
    </text>

    <text x="120" y="250" fill="#94a3b8" fontSize="10">
      ✓ Eliminates kernel scheduling jitter (50-200μs)
    </text>
    <text x="120" y="270" fill="#94a3b8" fontSize="10">
      ✓ Accurate to within 1 microsecond
    </text>
    <text x="120" y="290" fill="#94a3b8" fontSize="10">
      ✓ Required for regulatory reporting (MiFID II, CAT)
    </text>
  </svg>
)

const PercentilesDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Latency Percentiles - Why They Matter
    </text>

    {/* Distribution curve approximation */}
    <path
      d="M 80,180 Q 150,150 220,120 T 380,90 T 540,110 T 650,140 T 720,170"
      fill="none"
      stroke="#3b82f6"
      strokeWidth="2"
    />

    {/* Percentile markers */}
    <line x1="200" y1="120" x2="200" y2="200" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,2"/>
    <text x="200" y="220" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">p50</text>
    <text x="200" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">25μs</text>

    <line x1="400" y1="90" x2="400" y2="200" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,2"/>
    <text x="400" y="220" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">p99</text>
    <text x="400" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">150μs</text>

    <line x1="600" y1="125" x2="600" y2="200" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2"/>
    <text x="600" y="220" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">p99.9</text>
    <text x="600" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">850μs</text>

    {/* Axis */}
    <line x1="80" y1="200" x2="720" y2="200" stroke="#475569" strokeWidth="1"/>
    <text x="80" y="250" fill="#64748b" fontSize="10">Fast</text>
    <text x="700" y="250" textAnchor="end" fill="#64748b" fontSize="10">Slow</text>

    {/* Warning box */}
    <rect x="450" y="50" width="320" height="60" rx="8" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1"/>
    <text x="610" y="72" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">⚠️ Tail Latency</text>
    <text x="610" y="92" textAnchor="middle" fill="#fca5a5" fontSize="9">
      1 in 1000 orders takes 34x longer!
    </text>
  </svg>
)

const JMHBenchmarkDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      JMH Benchmark Flow
    </text>

    {/* Warmup */}
    <rect x="80" y="60" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="150" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Warmup</text>
    <text x="150" y="105" textAnchor="middle" fill="#ddd6fe" fontSize="10">10 iterations</text>

    <line x1="220" y1="90" x2="270" y2="90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#latencyArrow)"/>
    <text x="245" y="82" textAnchor="middle" fill="#94a3b8" fontSize="9">JIT compile</text>

    {/* Measurement */}
    <rect x="270" y="60" width="140" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="340" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Measurement</text>
    <text x="340" y="105" textAnchor="middle" fill="#bbf7d0" fontSize="10">100 iterations</text>

    <line x1="410" y1="90" x2="460" y2="90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#latencyArrow)"/>
    <text x="435" y="82" textAnchor="middle" fill="#94a3b8" fontSize="9">collect</text>

    {/* Results */}
    <rect x="460" y="60" width="140" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="530" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Statistics</text>
    <text x="530" y="105" textAnchor="middle" fill="#bfdbfe" fontSize="10">p50, p99, p99.9</text>

    {/* Best practices */}
    <rect x="100" y="150" width="600" height="80" rx="10" fill="rgba(245, 158, 11, 0.1)" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1"/>
    <text x="400" y="175" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">JMH Best Practices</text>

    <text x="120" y="195" fill="#94a3b8" fontSize="9">
      • Use @Fork(1) to avoid JVM noise
    </text>
    <text x="120" y="210" fill="#94a3b8" fontSize="9">
      • Add @Blackhole to prevent dead code elimination
    </text>
    <text x="420" y="195" fill="#94a3b8" fontSize="9">
      • Run on isolated CPU cores (taskset)
    </text>
    <text x="420" y="210" fill="#94a3b8" fontSize="9">
      • Disable frequency scaling and turbo boost
    </text>
  </svg>
)

const ToolsComparisonDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Latency Measurement Tools Comparison
    </text>

    {/* Table header */}
    <rect x="50" y="50" width="150" height="30" fill="#1e293b"/>
    <rect x="200" y="50" width="150" height="30" fill="#1e293b"/>
    <rect x="350" y="50" width="150" height="30" fill="#1e293b"/>
    <rect x="500" y="50" width="150" height="30" fill="#1e293b"/>
    <rect x="650" y="50" width="100" height="30" fill="#1e293b"/>

    <text x="125" y="70" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Tool</text>
    <text x="275" y="70" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Accuracy</text>
    <text x="425" y="70" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Overhead</text>
    <text x="575" y="70" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Use Case</text>
    <text x="700" y="70" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Cost</text>

    {/* Row 1: System.nanoTime() */}
    <rect x="50" y="80" width="700" height="35" fill="rgba(59, 130, 246, 0.1)" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1"/>
    <text x="125" y="102" textAnchor="middle" fill="#e2e8f0" fontSize="10">System.nanoTime()</text>
    <text x="275" y="102" textAnchor="middle" fill="#94a3b8" fontSize="9">~50-100ns</text>
    <text x="425" y="102" textAnchor="middle" fill="#22c55e" fontSize="9">Very Low</text>
    <text x="575" y="102" textAnchor="middle" fill="#94a3b8" fontSize="9">App-level</text>
    <text x="700" y="102" textAnchor="middle" fill="#22c55e" fontSize="9">Free</text>

    {/* Row 2: JMH */}
    <rect x="50" y="115" width="700" height="35" fill="rgba(34, 197, 94, 0.1)" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="1"/>
    <text x="125" y="137" textAnchor="middle" fill="#e2e8f0" fontSize="10">JMH</text>
    <text x="275" y="137" textAnchor="middle" fill="#94a3b8" fontSize="9">ns precision</text>
    <text x="425" y="137" textAnchor="middle" fill="#22c55e" fontSize="9">None</text>
    <text x="575" y="137" textAnchor="middle" fill="#94a3b8" fontSize="9">Microbenchmarks</text>
    <text x="700" y="137" textAnchor="middle" fill="#22c55e" fontSize="9">Free</text>

    {/* Row 3: Hardware TS */}
    <rect x="50" y="150" width="700" height="35" fill="rgba(245, 158, 11, 0.1)" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1"/>
    <text x="125" y="172" textAnchor="middle" fill="#e2e8f0" fontSize="10">Hardware TS</text>
    <text x="275" y="172" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">{`<`}1μs</text>
    <text x="425" y="172" textAnchor="middle" fill="#22c55e" fontSize="9">None</text>
    <text x="575" y="172" textAnchor="middle" fill="#94a3b8" fontSize="9">Production</text>
    <text x="700" y="172" textAnchor="middle" fill="#fbbf24" fontSize="9">NIC</text>

    {/* Row 4: FlightRecorder */}
    <rect x="50" y="185" width="700" height="35" fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1"/>
    <text x="125" y="207" textAnchor="middle" fill="#e2e8f0" fontSize="10">JFR</text>
    <text x="275" y="207" textAnchor="middle" fill="#94a3b8" fontSize="9">μs range</text>
    <text x="425" y="207" textAnchor="middle" fill="#fbbf24" fontSize="9">{`<`}1%</text>
    <text x="575" y="207" textAnchor="middle" fill="#94a3b8" fontSize="9">Production profiling</text>
    <text x="700" y="207" textAnchor="middle" fill="#22c55e" fontSize="9">Free</text>

    {/* Row 5: Wireshark/tcpdump */}
    <rect x="50" y="220" width="700" height="35" fill="rgba(236, 72, 153, 0.1)" stroke="rgba(236, 72, 153, 0.2)" strokeWidth="1"/>
    <text x="125" y="242" textAnchor="middle" fill="#e2e8f0" fontSize="10">tcpdump</text>
    <text x="275" y="242" textAnchor="middle" fill="#94a3b8" fontSize="9">μs w/ HW TS</text>
    <text x="425" y="242" textAnchor="middle" fill="#ef4444" fontSize="9">High (capture)</text>
    <text x="575" y="242" textAnchor="middle" fill="#94a3b8" fontSize="9">Network analysis</text>
    <text x="700" y="242" textAnchor="middle" fill="#22c55e" fontSize="9">Free</text>

    {/* Row 6: TAP/SPAN */}
    <rect x="50" y="255" width="700" height="35" fill="rgba(6, 182, 212, 0.1)" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1"/>
    <text x="125" y="277" textAnchor="middle" fill="#e2e8f0" fontSize="10">Network TAP</text>
    <text x="275" y="277" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">Perfect</text>
    <text x="425" y="277" textAnchor="middle" fill="#22c55e" fontSize="9">Zero</text>
    <text x="575" y="277" textAnchor="middle" fill="#94a3b8" fontSize="9">Passive monitoring</text>
    <text x="700" y="277" textAnchor="middle" fill="#ef4444" fontSize="9">$$$</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function LatencyMeasurement({ onBack }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'latency-basics',
      name: 'Latency Fundamentals',
      icon: '⏱️',
      color: '#3b82f6',
      description: 'Understanding latency components, measurement points, and why every microsecond matters in trading systems.',
      diagram: LatencyBreakdownDiagram,
      details: [
        {
          name: 'What is Latency?',
          diagram: LatencyBreakdownDiagram,
          explanation: 'Latency is the time delay between an event occurring and the system responding to it. In trading systems, we measure end-to-end latency from when a market data packet arrives at the NIC to when the order response leaves the NIC. Key components include: network latency (NIC to application), processing latency (application logic), and wire latency (response transmission). HFT systems target sub-100 microsecond latency, while standard trading systems aim for sub-millisecond.',
          codeExample: `import java.time.Instant;

public class BasicLatencyMeasurement {
    public static void main(String[] args) {
        // Simple latency measurement
        long startNanos = System.nanoTime();

        // Simulate processing
        processOrder();

        long endNanos = System.nanoTime();
        long latencyMicros = (endNanos - startNanos) / 1000;

        System.out.println("Latency: " + latencyMicros + "μs");

        // More detailed with multiple measurement points
        LatencyTracker tracker = new LatencyTracker();

        tracker.mark("receive");      // T1: Packet received
        parseMessage();

        tracker.mark("parsed");        // T2: Message parsed
        validateOrder();

        tracker.mark("validated");     // T3: Validation complete
        matchOrder();

        tracker.mark("matched");       // T4: Order matched
        sendResponse();

        tracker.mark("sent");          // T5: Response sent

        // Print breakdown
        tracker.printBreakdown();
        /*
         * Output:
         * receive -> parsed: 15μs (parse)
         * parsed -> validated: 8μs (validate)
         * validated -> matched: 45μs (matching)
         * matched -> sent: 12μs (send)
         * Total: 80μs
         */
    }

    static void processOrder() {
        // Simulated order processing
        for (int i = 0; i < 1000; i++) {
            Math.sqrt(i);
        }
    }

    static void parseMessage() {}
    static void validateOrder() {}
    static void matchOrder() {}
    static void sendResponse() {}
}

class LatencyTracker {
    private final List<Timestamp> timestamps = new ArrayList<>();

    public void mark(String label) {
        timestamps.add(new Timestamp(label, System.nanoTime()));
    }

    public void printBreakdown() {
        for (int i = 1; i < timestamps.size(); i++) {
            Timestamp prev = timestamps.get(i - 1);
            Timestamp curr = timestamps.get(i);
            long deltaMicros = (curr.nanos - prev.nanos) / 1000;
            System.out.printf("%s -> %s: %dμs%n",
                prev.label, curr.label, deltaMicros);
        }

        long totalMicros = (timestamps.get(timestamps.size() - 1).nanos
                          - timestamps.get(0).nanos) / 1000;
        System.out.printf("Total: %dμs%n", totalMicros);
    }

    static class Timestamp {
        String label;
        long nanos;

        Timestamp(String label, long nanos) {
            this.label = label;
            this.nanos = nanos;
        }
    }
}`
        },
        {
          name: 'Critical Timestamp Points',
          diagram: TimestampPointsDiagram,
          explanation: 'To accurately measure latency, you need timestamps at critical points in the message flow. T1 (NIC RX): When packet arrives at network card - use hardware timestamping. T2 (App RX): When application receives packet - use System.nanoTime(). T3 (Processing): Business logic execution milestones. T4 (App TX): Before sending to socket. T5 (NIC TX): When packet leaves network card - hardware timestamp. The difference between these points reveals where latency is spent.',
          codeExample: `public class TimestampPoints {
    public static void main(String[] args) {
        OrderProcessor processor = new OrderProcessor();

        // Process order with full instrumentation
        Order order = new Order("AAPL", 100, 150.00);
        ExecutionReport report = processor.process(order);

        // Print latency breakdown
        report.printLatencyBreakdown();
    }
}

class OrderProcessor {
    public ExecutionReport process(Order order) {
        ExecutionReport report = new ExecutionReport();

        // T1: NIC RX (from hardware timestamp if available)
        report.t1_nicRx = getNicRxTimestamp(); // Hardware

        // T2: Application receives
        report.t2_appRx = System.nanoTime();

        // Deserialize FIX message
        Message message = deserialize(order);
        report.t3_parsed = System.nanoTime();

        // Validate order
        ValidationResult validation = validate(message);
        report.t4_validated = System.nanoTime();

        // Match against order book
        MatchResult match = matchOrder(message);
        report.t5_matched = System.nanoTime();

        // Serialize execution report
        byte[] response = serialize(match);
        report.t6_serialized = System.nanoTime();

        // Send to socket
        sendToSocket(response);
        report.t7_socketSent = System.nanoTime();

        // T8: NIC TX (from hardware timestamp)
        report.t8_nicTx = getNicTxTimestamp(); // Hardware

        return report;
    }

    private long getNicRxTimestamp() {
        // In production: read from NIC hardware timestamp
        // Example using Intel i40e driver:
        // return readHardwareTimestamp(nicDescriptor);
        return System.nanoTime(); // Fallback
    }

    private long getNicTxTimestamp() {
        // Similar to RX
        return System.nanoTime(); // Fallback
    }

    private Message deserialize(Order order) {
        return new Message();
    }
    private ValidationResult validate(Message m) {
        return new ValidationResult();
    }
    private MatchResult matchOrder(Message m) {
        return new MatchResult();
    }
    private byte[] serialize(MatchResult m) {
        return new byte[0];
    }
    private void sendToSocket(byte[] data) {}
}

class ExecutionReport {
    long t1_nicRx;
    long t2_appRx;
    long t3_parsed;
    long t4_validated;
    long t5_matched;
    long t6_serialized;
    long t7_socketSent;
    long t8_nicTx;

    void printLatencyBreakdown() {
        System.out.println("=== Latency Breakdown ===");

        long wireToApp = (t2_appRx - t1_nicRx) / 1000;
        long parse = (t3_parsed - t2_appRx) / 1000;
        long validate = (t4_validated - t3_parsed) / 1000;
        long match = (t5_matched - t4_validated) / 1000;
        long serialize = (t6_serialized - t5_matched) / 1000;
        long socket = (t7_socketSent - t6_serialized) / 1000;
        long appToWire = (t8_nicTx - t7_socketSent) / 1000;
        long total = (t8_nicTx - t1_nicRx) / 1000;

        System.out.printf("Wire-to-App:   %6dμs%n", wireToApp);
        System.out.printf("Parse:         %6dμs%n", parse);
        System.out.printf("Validate:      %6dμs%n", validate);
        System.out.printf("Match:         %6dμs%n", match);
        System.out.printf("Serialize:     %6dμs%n", serialize);
        System.out.printf("Socket:        %6dμs%n", socket);
        System.out.printf("App-to-Wire:   %6dμs%n", appToWire);
        System.out.printf("---------------------%n");
        System.out.printf("Total:         %6dμs%n", total);

        // Identify bottleneck
        long[] latencies = {wireToApp, parse, validate, match,
                           serialize, socket, appToWire};
        String[] labels = {"Wire-to-App", "Parse", "Validate", "Match",
                          "Serialize", "Socket", "App-to-Wire"};

        int maxIdx = 0;
        for (int i = 1; i < latencies.length; i++) {
            if (latencies[i] > latencies[maxIdx]) {
                maxIdx = i;
            }
        }

        System.out.printf("%nBottleneck: %s (%dμs)%n",
            labels[maxIdx], latencies[maxIdx]);
    }
}

class Order {}
class Message {}
class ValidationResult {}
class MatchResult {}`
        },
        {
          name: 'Hardware Timestamping',
          diagram: HardwareTimestampDiagram,
          explanation: 'Hardware timestamping uses the NIC to record precise packet arrival/departure times, eliminating kernel jitter (50-200μs). Modern NICs (Intel X710, Mellanox ConnectX-6) support PTP (IEEE 1588) with sub-microsecond accuracy. Software timestamps are affected by: context switches, CPU scheduling, kernel queuing, and interrupt processing. Hardware timestamps are stored in packet metadata and accessed via SO_TIMESTAMPING socket option. Required for MiFID II regulatory reporting.',
          codeExample: `import sun.misc.Unsafe;
import java.lang.reflect.Field;
import java.nio.ByteBuffer;
import java.net.*;

public class HardwareTimestamping {
    public static void main(String[] args) throws Exception {
        // Enable hardware timestamping on socket
        DatagramSocket socket = new DatagramSocket(12345);
        enableHardwareTimestamping(socket);

        // Receive packet with hardware timestamp
        byte[] buffer = new byte[1500];
        DatagramPacket packet = new DatagramPacket(buffer, buffer.length);

        socket.receive(packet);

        // Get hardware timestamps
        TimestampInfo ts = getHardwareTimestamp(packet);

        System.out.println("Software timestamp: " + ts.softwareNs + "ns");
        System.out.println("Hardware RX timestamp: " + ts.hardwareRxNs + "ns");
        System.out.println("Difference (jitter): " +
            (ts.softwareNs - ts.hardwareRxNs) / 1000 + "μs");
    }

    static void enableHardwareTimestamping(DatagramSocket socket)
            throws Exception {
        // Linux-specific: Enable SO_TIMESTAMPING
        // Flags: SOF_TIMESTAMPING_RX_HARDWARE | SOF_TIMESTAMPING_RAW_HARDWARE
        int flags = (1 << 1) | (1 << 6);

        // Use JNI or JNA to set socket option
        // This is pseudo-code - actual implementation requires native code
        // setsockopt(fd, SOL_SOCKET, SO_TIMESTAMPING, &flags, sizeof(flags));

        System.out.println("Hardware timestamping enabled");
    }

    static TimestampInfo getHardwareTimestamp(DatagramPacket packet) {
        // In production: extract from ancillary data (SCM_TIMESTAMPING)
        // This requires native code or JNA

        TimestampInfo info = new TimestampInfo();
        info.softwareNs = System.nanoTime();

        // Simulated hardware timestamp (would come from NIC)
        // Actual implementation: read from packet metadata
        info.hardwareRxNs = info.softwareNs - 150_000; // ~150μs earlier

        return info;
    }

    static class TimestampInfo {
        long softwareNs;
        long hardwareRxNs;
        long hardwareTxNs;
    }
}

/**
 * Production-grade hardware timestamping using JNA
 */
public class ProductionHardwareTS {
    // Linux socket options
    private static final int SOL_SOCKET = 1;
    private static final int SO_TIMESTAMPING = 37;

    // Timestamping flags
    private static final int SOF_TIMESTAMPING_TX_HARDWARE = (1 << 0);
    private static final int SOF_TIMESTAMPING_RX_HARDWARE = (1 << 1);
    private static final int SOF_TIMESTAMPING_RAW_HARDWARE = (1 << 6);

    public static void enableHwTimestamp(int socketFd) {
        int flags = SOF_TIMESTAMPING_RX_HARDWARE |
                   SOF_TIMESTAMPING_TX_HARDWARE |
                   SOF_TIMESTAMPING_RAW_HARDWARE;

        // Native call via JNA/JNI:
        // setsockopt(socketFd, SOL_SOCKET, SO_TIMESTAMPING, &flags, 4);
    }

    public static HwTimestamp readTimestamp(byte[] ancillaryData) {
        // Parse SCM_TIMESTAMPING from ancillary data
        // Structure: 3 x timespec (24 bytes total)
        ByteBuffer buf = ByteBuffer.wrap(ancillaryData);

        // Skip software timestamp
        buf.getLong(); // tv_sec
        buf.getLong(); // tv_nsec

        // Read hardware timestamp
        long tvSec = buf.getLong();
        long tvNsec = buf.getLong();

        long hardwareNs = tvSec * 1_000_000_000L + tvNsec;

        return new HwTimestamp(hardwareNs);
    }

    static class HwTimestamp {
        final long nanos;
        HwTimestamp(long nanos) { this.nanos = nanos; }
    }
}

/**
 * PTP (Precision Time Protocol) configuration
 */
public class PTPConfig {
    public static void main(String[] args) {
        // Configure NIC for PTP (IEEE 1588)
        // This synchronizes clock across machines

        System.out.println("=== PTP Configuration ===");
        System.out.println("1. Install linuxptp: sudo apt install linuxptp");
        System.out.println("2. Start PTP daemon: sudo ptp4l -i eth0 -m");
        System.out.println("3. Sync system clock: sudo phc2sys -s eth0 -m");
        System.out.println("4. Verify sync: sudo pmc -u -b 0 'GET TIME_STATUS_NP'");
        System.out.println();
        System.out.println("Expected accuracy: < 1 microsecond");
        System.out.println("Hardware requirements:");
        System.out.println("  - NIC with PTP support (Intel X710, Mellanox CX-6)");
        System.out.println("  - PTP grandmaster clock (or GPS reference)");
    }
}`
        }
      ]
    },
    {
      id: 'measurement-tools',
      name: 'Measurement Tools & Techniques',
      icon: '🔧',
      color: '#22c55e',
      description: 'Comprehensive toolkit for measuring latency: System.nanoTime(), JMH, JFR, tcpdump, and specialized monitoring tools.',
      diagram: ToolsComparisonDiagram,
      details: [
        {
          name: 'System.nanoTime() - Application Level',
          explanation: 'System.nanoTime() provides monotonic time with nanosecond precision (not accuracy). Resolution is typically 50-100ns on modern Linux. Unlike currentTimeMillis(), nanoTime() is not affected by NTP adjustments and never goes backwards. Use for measuring elapsed time within the application. Note: absolute values are meaningless, only differences matter. Overhead: ~20-50ns per call.',
          codeExample: `public class NanoTimeUsage {
    public static void main(String[] args) {
        // Basic usage
        long start = System.nanoTime();
        performOperation();
        long end = System.nanoTime();

        long elapsedNs = end - start;
        long elapsedUs = elapsedNs / 1000;
        long elapsedMs = elapsedNs / 1_000_000;

        System.out.printf("Operation took %d ns (%d μs, %d ms)%n",
            elapsedNs, elapsedUs, elapsedMs);

        // Measure overhead of nanoTime() itself
        measureNanoTimeOverhead();

        // High-frequency measurements
        measureHighFrequency();

        // Percentile calculation
        calculatePercentiles();
    }

    static void performOperation() {
        // Simulate work
        int sum = 0;
        for (int i = 0; i < 10000; i++) {
            sum += i;
        }
    }

    static void measureNanoTimeOverhead() {
        final int iterations = 1_000_000;
        long[] measurements = new long[iterations];

        for (int i = 0; i < iterations; i++) {
            long start = System.nanoTime();
            long end = System.nanoTime();
            measurements[i] = end - start;
        }

        // Calculate statistics
        Arrays.sort(measurements);
        long median = measurements[iterations / 2];
        long p99 = measurements[(int)(iterations * 0.99)];
        long min = measurements[0];

        System.out.printf("%nnanoTime() overhead:%n");
        System.out.printf("  Min:    %d ns%n", min);
        System.out.printf("  Median: %d ns%n", median);
        System.out.printf("  p99:    %d ns%n", p99);
    }

    static void measureHighFrequency() {
        System.out.println("%nHigh-frequency measurements:");

        final int count = 100;
        long[] latencies = new long[count];

        for (int i = 0; i < count; i++) {
            long start = System.nanoTime();

            // Simulated message processing
            processMessage();

            long end = System.nanoTime();
            latencies[i] = end - start;
        }

        // Print statistics
        Arrays.sort(latencies);
        System.out.printf("  p50: %d μs%n", latencies[50] / 1000);
        System.out.printf("  p95: %d μs%n", latencies[95] / 1000);
        System.out.printf("  p99: %d μs%n", latencies[99] / 1000);
        System.out.printf("  Max: %d μs%n", latencies[count - 1] / 1000);
    }

    static void processMessage() {
        // Simulate message processing
        for (int i = 0; i < 100; i++) {
            Math.sqrt(i);
        }
    }

    static void calculatePercentiles() {
        System.out.println("%nPercentile calculation:");

        int[] counts = new int[1000]; // Histogram: 0-999 μs
        int samples = 10_000;

        for (int i = 0; i < samples; i++) {
            long start = System.nanoTime();

            // Simulated variable latency
            if (i % 1000 == 0) {
                // Simulate occasional spike
                Thread.yield();
            }
            performOperation();

            long end = System.nanoTime();
            long latencyUs = (end - start) / 1000;

            int bucket = (int)Math.min(latencyUs, 999);
            counts[bucket]++;
        }

        // Calculate percentiles
        int p50Count = 0, p99Count = 0, p999Count = 0;
        int p50Threshold = samples / 2;
        int p99Threshold = (int)(samples * 0.99);
        int p999Threshold = (int)(samples * 0.999);

        for (int i = 0; i < counts.length; i++) {
            p50Count += counts[i];
            p99Count += counts[i];
            p999Count += counts[i];

            if (p50Count >= p50Threshold && p50Count - counts[i] < p50Threshold) {
                System.out.printf("  p50:   %d μs%n", i);
            }
            if (p99Count >= p99Threshold && p99Count - counts[i] < p99Threshold) {
                System.out.printf("  p99:   %d μs%n", i);
            }
            if (p999Count >= p999Threshold && p999Count - counts[i] < p999Threshold) {
                System.out.printf("  p99.9: %d μs%n", i);
            }
        }
    }
}

/**
 * Production-grade latency tracker with minimal overhead
 */
public class LowOverheadLatencyTracker {
    private static final int MAX_SAMPLES = 100_000;
    private final long[] samples = new long[MAX_SAMPLES];
    private int index = 0;

    public void record(long latencyNs) {
        if (index < MAX_SAMPLES) {
            samples[index++] = latencyNs;
        }
    }

    public Stats getStats() {
        if (index == 0) return new Stats();

        // Sort for percentile calculation
        long[] sorted = Arrays.copyOf(samples, index);
        Arrays.sort(sorted);

        return new Stats(
            sorted[index / 2],                    // p50
            sorted[(int)(index * 0.95)],          // p95
            sorted[(int)(index * 0.99)],          // p99
            sorted[(int)(index * 0.999)],         // p99.9
            sorted[index - 1],                    // max
            sorted[0],                            // min
            avg(sorted)                           // average
        );
    }

    private long avg(long[] arr) {
        long sum = 0;
        for (long val : arr) sum += val;
        return sum / arr.length;
    }

    static class Stats {
        final long p50, p95, p99, p999, max, min, avg;

        Stats() { this(0,0,0,0,0,0,0); }

        Stats(long p50, long p95, long p99, long p999,
              long max, long min, long avg) {
            this.p50 = p50;
            this.p95 = p95;
            this.p99 = p99;
            this.p999 = p999;
            this.max = max;
            this.min = min;
            this.avg = avg;
        }

        public void print() {
            System.out.printf("Latency Statistics:%n");
            System.out.printf("  Min:   %6d ns%n", min);
            System.out.printf("  p50:   %6d ns%n", p50);
            System.out.printf("  p95:   %6d ns%n", p95);
            System.out.printf("  p99:   %6d ns%n", p99);
            System.out.printf("  p99.9: %6d ns%n", p999);
            System.out.printf("  Max:   %6d ns%n", max);
            System.out.printf("  Avg:   %6d ns%n", avg);
        }
    }
}`
        }
      ]
    }
  ]

  // Navigation and keyboard handlers similar to other eTrading pages
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
      { name: 'eTrading', icon: '⚡', page: 'ETrading' },
      { name: 'Latency Measurement', icon: '⏱️', page: 'LatencyMeasurement' }
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
    const handleKeyPress = (e) => {
      if (selectedConcept && e.key === 'Escape') {
        if (selectedDetailIndex > 0 || selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      } else if (selectedConcept && e.key === 'ArrowLeft') {
        handlePreviousConcept()
      } else if (selectedConcept && e.key === 'ArrowRight') {
        handleNextConcept()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedConcept, selectedConceptIndex, selectedDetailIndex])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #78350f 50%, #0f172a 100%)',
      padding: '2rem',
      color: '#e2e8f0'
    }}>
      <Breadcrumb
        stack={buildBreadcrumbStack()}
        onNavigate={handleBreadcrumbClick}
        colors={LATENCY_COLORS}
      />

      {!selectedConcept ? (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#fbbf24'
          }}>
            ⏱️ Latency Measurement
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: '#94a3b8',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Comprehensive guide to measuring, analyzing, and optimizing latency in trading systems.
            Master hardware timestamping, JMH benchmarking, percentile analysis, and production monitoring.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {concepts.map((concept, index) => (
              <div
                key={concept.id}
                onClick={() => setSelectedConceptIndex(index)}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: `2px solid ${concept.color}40`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 16px ${concept.color}40`
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 8px 16px ${concept.color}40`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {concept.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: concept.color,
                  marginBottom: '0.5rem'
                }}>
                  {concept.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#94a3b8',
                  lineHeight: '1.5'
                }}>
                  {concept.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Modal with concept details - similar to other eTrading pages */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(120, 53, 15, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)',
            borderRadius: '16px',
            border: `2px solid ${selectedConcept.color}`,
            padding: '2rem',
            minHeight: '600px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '2rem', color: selectedConcept.color, fontWeight: 'bold' }}>
                {selectedConcept.icon} {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    background: selectedConceptIndex === 0 ? '#1e293b' : LATENCY_COLORS.primary,
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    opacity: selectedConceptIndex === 0 ? 0.5 : 1
                  }}
                >
                  ← Previous
                </button>
                <span style={{ color: '#94a3b8' }}>
                  {selectedConceptIndex + 1} / {concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    background: selectedConceptIndex === concepts.length - 1 ? '#1e293b' : LATENCY_COLORS.primary,
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    opacity: selectedConceptIndex === concepts.length - 1 ? 0.5 : 1
                  }}
                >
                  Next →
                </button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginLeft: '1rem'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Tabs for details */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '2rem',
              borderBottom: '2px solid #334155',
              flexWrap: 'wrap'
            }}>
              {selectedConcept.details.map((detail, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDetailIndex(idx)}
                  style={{
                    background: selectedDetailIndex === idx ? LATENCY_COLORS.primary : 'transparent',
                    color: selectedDetailIndex === idx ? 'white' : '#94a3b8',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    cursor: 'pointer',
                    borderRadius: '8px 8px 0 0',
                    fontWeight: selectedDetailIndex === idx ? 'bold' : 'normal',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Detail content */}
            {selectedConcept.details[selectedDetailIndex] && (
              <div>
                {selectedConcept.details[selectedDetailIndex].diagram && (
                  <div style={{ marginBottom: '2rem' }}>
                    {selectedConcept.details[selectedDetailIndex].diagram()}
                  </div>
                )}

                {selectedConcept.details[selectedDetailIndex].explanation && (
                  <div style={{
                    ...SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length],
                    padding: '1.5rem',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                    border: `1px solid ${SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length].border}`
                  }}>
                    <p style={{
                      fontSize: '1rem',
                      lineHeight: '1.8',
                      color: '#e2e8f0'
                    }}>
                      {selectedConcept.details[selectedDetailIndex].explanation}
                    </p>
                  </div>
                )}

                {selectedConcept.details[selectedDetailIndex].codeExample && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <h4 style={{
                      color: '#fbbf24',
                      marginBottom: '1rem',
                      fontSize: '1.1rem',
                      fontWeight: 'bold'
                    }}>
                      Code Example:
                    </h4>
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        borderRadius: '12px',
                        padding: '1.5rem',
                        fontSize: '0.9rem',
                        maxHeight: '500px',
                        overflowY: 'auto'
                      }}
                    >
                      {selectedConcept.details[selectedDetailIndex].codeExample}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LatencyMeasurement

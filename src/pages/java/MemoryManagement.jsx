/**
 * Memory Management - Java Memory and Garbage Collection
 *
 * Covers heap structure, garbage collection algorithms, memory leaks,
 * and optimization techniques like object pooling and off-heap memory.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const MEMORY_COLORS = {
  primary: '#eab308',
  primaryHover: '#fbbf24',
  bg: 'rgba(234, 179, 8, 0.1)',
  border: 'rgba(234, 179, 8, 0.3)',
  arrow: '#eab308',
  hoverBg: 'rgba(234, 179, 8, 0.2)',
  topicBg: 'rgba(234, 179, 8, 0.2)'
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

const HeapStructureDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="heapArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#eab308" />
      </marker>
      <linearGradient id="youngGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="oldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Java Heap Memory Structure
    </text>

    {/* Heap Container */}
    <rect x="50" y="50" width="700" height="180" rx="12" fill="rgba(15, 23, 42, 0.6)" stroke="#475569" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">Java Heap</text>

    {/* Young Generation */}
    <rect x="70" y="95" width="320" height="120" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="230" y="115" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Young Generation</text>

    {/* Eden Space */}
    <rect x="85" y="130" width="140" height="70" rx="6" fill="url(#youngGrad)" opacity="0.8"/>
    <text x="155" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Eden</text>
    <text x="155" y="175" textAnchor="middle" fill="white" fontSize="9">New Objects</text>
    <text x="155" y="190" textAnchor="middle" fill="#bbf7d0" fontSize="8">~80% of Young</text>

    {/* Survivor S0 */}
    <rect x="240" y="130" width="65" height="70" rx="6" fill="#16a34a" opacity="0.8"/>
    <text x="272" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S0</text>
    <text x="272" y="170" textAnchor="middle" fill="white" fontSize="8">From</text>

    {/* Survivor S1 */}
    <rect x="315" y="130" width="65" height="70" rx="6" fill="#15803d" opacity="0.8"/>
    <text x="347" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S1</text>
    <text x="347" y="170" textAnchor="middle" fill="white" fontSize="8">To</text>

    {/* Old Generation */}
    <rect x="410" y="95" width="320" height="120" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="570" y="115" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Old Generation (Tenured)</text>

    <rect x="425" y="130" width="290" height="70" rx="6" fill="url(#oldGrad)" opacity="0.8"/>
    <text x="570" y="160" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Long-lived Objects</text>
    <text x="570" y="180" textAnchor="middle" fill="#bfdbfe" fontSize="9">Promoted after surviving GCs</text>

    {/* Metaspace (outside heap) */}
    <rect x="50" y="250" width="200" height="50" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="150" y="275" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Metaspace (Non-Heap)</text>
    <text x="150" y="290" textAnchor="middle" fill="#c4b5fd" fontSize="9">Class metadata, Methods</text>

    {/* Arrows showing object flow */}
    <path d="M 225 165 L 235 165" stroke="#eab308" strokeWidth="2" markerEnd="url(#heapArrow)" fill="none"/>
    <path d="M 305 165 L 312 165" stroke="#eab308" strokeWidth="2" markerEnd="url(#heapArrow)" fill="none"/>
    <path d="M 380 165 L 420 165" stroke="#eab308" strokeWidth="2" markerEnd="url(#heapArrow)" fill="none"/>

    {/* Labels */}
    <text x="260" y="210" textAnchor="middle" fill="#94a3b8" fontSize="8">Minor GC</text>
    <text x="400" y="210" textAnchor="middle" fill="#94a3b8" fontSize="8">Promote</text>
  </svg>
)

const GCGenerationsDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="gcArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#eab308" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">{`
      Object Lifecycle &amp; GC Process
    `}</text>

    {/* Step 1: New Object */}
    <rect x="50" y="60" width="130" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="115" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">1. New Object</text>
    <text x="115" y="100" textAnchor="middle" fill="#bbf7d0" fontSize="9">Created in Eden</text>

    {/* Arrow */}
    <path d="M 180 90 L 210 90" stroke="#eab308" strokeWidth="2" markerEnd="url(#gcArrow)" fill="none"/>
    <text x="195" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Eden fills</text>

    {/* Step 2: Minor GC */}
    <rect x="220" y="60" width="130" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="285" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">2. Minor GC</text>
    <text x="285" y="100" textAnchor="middle" fill="#fef3c7" fontSize="9">Young Gen Only</text>

    {/* Arrow */}
    <path d="M 350 90 L 380 90" stroke="#eab308" strokeWidth="2" markerEnd="url(#gcArrow)" fill="none"/>
    <text x="365" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Survive</text>

    {/* Step 3: Survivors */}
    <rect x="390" y="60" width="130" height="60" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="455" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">3. Survivor</text>
    <text x="455" y="100" textAnchor="middle" fill="#cffafe" fontSize="9">{`S0 &lt;-&gt; S1, age++`}</text>

    {/* Arrow */}
    <path d="M 520 90 L 550 90" stroke="#eab308" strokeWidth="2" markerEnd="url(#gcArrow)" fill="none"/>
    <text x="535" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">{`Age &gt; 15`}</text>

    {/* Step 4: Old Gen */}
    <rect x="560" y="60" width="130" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="625" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">4. Old Gen</text>
    <text x="625" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="9">Tenured Space</text>

    {/* GC Types Comparison */}
    <text x="400" y="160" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">GC Types Comparison</text>

    {/* Minor GC Box */}
    <rect x="50" y="180" width="220" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="160" y="205" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Minor GC</text>
    <text x="160" y="225" textAnchor="middle" fill="#94a3b8" fontSize="10">Young Generation only</text>
    <text x="160" y="245" textAnchor="middle" fill="#22c55e" fontSize="10">Fast: 1-10ms, Frequent</text>

    {/* Major GC Box */}
    <rect x="290" y="180" width="220" height="80" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="205" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Major GC</text>
    <text x="400" y="225" textAnchor="middle" fill="#94a3b8" fontSize="10">Old Generation</text>
    <text x="400" y="245" textAnchor="middle" fill="#f59e0b" fontSize="10">Slower: 50-500ms</text>

    {/* Full GC Box */}
    <rect x="530" y="180" width="220" height="80" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="640" y="205" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Full GC</text>
    <text x="640" y="225" textAnchor="middle" fill="#94a3b8" fontSize="10">Entire Heap + Metaspace</text>
    <text x="640" y="245" textAnchor="middle" fill="#ef4444" fontSize="10">Slowest: 100ms-seconds</text>

    {/* Key insight */}
    <rect x="200" y="280" width="400" height="50" rx="8" fill="rgba(234, 179, 8, 0.15)" stroke="#eab308" strokeWidth="2"/>
    <text x="400" y="305" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Generational Hypothesis: Most objects die young!</text>
    <text x="400" y="320" textAnchor="middle" fill="#94a3b8" fontSize="10">90% of objects collected in Young Gen (Eden)</text>
  </svg>
)

const MemoryLeaksDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="leakArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
      <marker id="fixArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Common Memory Leak Patterns
    </text>

    {/* Leak 1: Static Collection */}
    <rect x="50" y="50" width="160" height="80" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="130" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Static Collection</text>
    <text x="130" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">static List grows</text>
    <text x="130" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">unbounded</text>

    {/* Leak 2: Listeners */}
    <rect x="230" y="50" width="160" height="80" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="310" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Listeners</text>
    <text x="310" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Never removed</text>
    <text x="310" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">after use</text>

    {/* Leak 3: ThreadLocal */}
    <rect x="410" y="50" width="160" height="80" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="490" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">ThreadLocal</text>
    <text x="490" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Not cleaned in</text>
    <text x="490" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">thread pools</text>

    {/* Leak 4: Resources */}
    <rect x="590" y="50" width="160" height="80" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="670" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Unclosed Resources</text>
    <text x="670" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Streams, connections</text>
    <text x="670" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">not closed</text>

    {/* Arrow to result */}
    <path d="M 400 130 L 400 160" stroke="#ef4444" strokeWidth="2" markerEnd="url(#leakArrow)" fill="none"/>

    {/* Result: Memory grows */}
    <rect x="250" y="165" width="300" height="50" rx="8" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="190" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Memory Grows Until OutOfMemoryError</text>

    {/* Fixes Section */}
    <text x="400" y="240" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">Solutions</text>

    {/* Fix boxes */}
    <rect x="50" y="255" width="160" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="130" y="280" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">WeakHashMap</text>
    <text x="130" y="295" textAnchor="middle" fill="#94a3b8" fontSize="8">or add removal</text>

    <rect x="230" y="255" width="160" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="310" y="280" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">removeListener()</text>
    <text x="310" y="295" textAnchor="middle" fill="#94a3b8" fontSize="8">or WeakReference</text>

    <rect x="410" y="255" width="160" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="490" y="280" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">remove() in finally</text>
    <text x="490" y="295" textAnchor="middle" fill="#94a3b8" fontSize="8">Always clean up</text>

    <rect x="590" y="255" width="160" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="670" y="280" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">try-with-resources</text>
    <text x="670" y="295" textAnchor="middle" fill="#94a3b8" fontSize="8">Auto-close</text>
  </svg>
)

const GCComparisonDiagram = () => (
  <svg viewBox="0 0 800 380" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Garbage Collector Comparison
    </text>

    {/* Serial GC */}
    <rect x="50" y="50" width="170" height="120" rx="8" fill="rgba(156, 163, 175, 0.2)" stroke="#9ca3af" strokeWidth="2"/>
    <text x="135" y="75" textAnchor="middle" fill="#d1d5db" fontSize="12" fontWeight="bold">Serial GC</text>
    <text x="135" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Single-threaded</text>
    <text x="135" y="115" textAnchor="middle" fill="#9ca3af" fontSize="9">Pause: 10-100ms</text>
    <text x="135" y="130" textAnchor="middle" fill="#9ca3af" fontSize="9">{`Best for: &lt;100MB heap`}</text>
    <text x="135" y="145" textAnchor="middle" fill="#6b7280" fontSize="8">-XX:+UseSerialGC</text>
    <text x="135" y="160" textAnchor="middle" fill="#64748b" fontSize="8">Embedded/Small apps</text>

    {/* Parallel GC */}
    <rect x="240" y="50" width="170" height="120" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="325" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Parallel GC</text>
    <text x="325" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Multi-threaded STW</text>
    <text x="325" y="115" textAnchor="middle" fill="#3b82f6" fontSize="9">Pause: 100-1000ms</text>
    <text x="325" y="130" textAnchor="middle" fill="#3b82f6" fontSize="9">Max throughput</text>
    <text x="325" y="145" textAnchor="middle" fill="#6b7280" fontSize="8">-XX:+UseParallelGC</text>
    <text x="325" y="160" textAnchor="middle" fill="#64748b" fontSize="8">Batch processing</text>

    {/* G1 GC */}
    <rect x="430" y="50" width="170" height="120" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="515" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">G1 GC (Default)</text>
    <text x="515" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Region-based</text>
    <text x="515" y="115" textAnchor="middle" fill="#22c55e" fontSize="9">Pause: 10-200ms</text>
    <text x="515" y="130" textAnchor="middle" fill="#22c55e" fontSize="9">Balanced</text>
    <text x="515" y="145" textAnchor="middle" fill="#6b7280" fontSize="8">-XX:+UseG1GC</text>
    <text x="515" y="160" textAnchor="middle" fill="#64748b" fontSize="8">Web apps, 4-64GB</text>

    {/* ZGC */}
    <rect x="620" y="50" width="170" height="120" rx="8" fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="2"/>
    <text x="705" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">ZGC</text>
    <text x="705" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Ultra-low latency</text>
    <text x="705" y="115" textAnchor="middle" fill="#eab308" fontSize="9">{`Pause: &lt;10ms`}</text>
    <text x="705" y="130" textAnchor="middle" fill="#eab308" fontSize="9">Concurrent</text>
    <text x="705" y="145" textAnchor="middle" fill="#6b7280" fontSize="8">-XX:+UseZGC</text>
    <text x="705" y="160" textAnchor="middle" fill="#64748b" fontSize="8">{`Trading, &gt;64GB`}</text>

    {/* Decision Flow */}
    <text x="400" y="200" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">When to Use Which?</text>

    {/* Decision boxes */}
    <rect x="50" y="220" width="200" height="70" rx="6" fill="rgba(156, 163, 175, 0.1)" stroke="#6b7280" strokeWidth="1"/>
    <text x="150" y="245" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="bold">{`Small heap &lt;100MB?`}</text>
    <text x="150" y="265" textAnchor="middle" fill="#d1d5db" fontSize="11">Serial GC</text>
    <text x="150" y="280" textAnchor="middle" fill="#64748b" fontSize="8">Low overhead, simple</text>

    <rect x="270" y="220" width="200" height="70" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="370" y="245" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Batch processing?</text>
    <text x="370" y="265" textAnchor="middle" fill="#d1d5db" fontSize="11">Parallel GC</text>
    <text x="370" y="280" textAnchor="middle" fill="#64748b" fontSize="8">Max throughput, long pauses OK</text>

    <rect x="490" y="220" width="260" height="70" rx="6" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1"/>
    <text x="620" y="245" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Web app, balanced needs?</text>
    <text x="620" y="265" textAnchor="middle" fill="#d1d5db" fontSize="11">G1 GC (Default Java 9+)</text>
    <text x="620" y="280" textAnchor="middle" fill="#64748b" fontSize="8">Predictable pauses, good default</text>

    <rect x="200" y="310" width="400" height="55" rx="6" fill="rgba(234, 179, 8, 0.1)" stroke="#eab308" strokeWidth="1"/>
    <text x="400" y="335" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">{`Ultra-low latency &lt;10ms? Large heap &gt;64GB?`}</text>
    <text x="400" y="352" textAnchor="middle" fill="#d1d5db" fontSize="11">ZGC or Shenandoah</text>
  </svg>
)

const ObjectPoolingDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="poolArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#eab308" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Object Pooling vs Normal Allocation
    </text>

    {/* Without Pooling */}
    <text x="200" y="55" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Without Pooling</text>

    <rect x="50" y="70" width="80" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="90" y="95" textAnchor="middle" fill="white" fontSize="10">new Obj()</text>

    <path d="M 130 90 L 160 90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#poolArrow)" fill="none"/>

    <rect x="165" y="70" width="60" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="195" y="95" textAnchor="middle" fill="white" fontSize="10">Use</text>

    <path d="M 225 90 L 255 90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#poolArrow)" fill="none"/>

    <rect x="260" y="70" width="80" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="300" y="95" textAnchor="middle" fill="white" fontSize="10">Garbage</text>

    <text x="200" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Repeat 10000x = 10000 allocations + GC pressure</text>

    {/* With Pooling */}
    <text x="600" y="55" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">With Pooling</text>

    {/* Pool */}
    <rect x="450" y="65" width="120" height="60" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="510" y="85" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Object Pool</text>
    <rect x="460" y="95" width="20" height="20" rx="3" fill="#8b5cf6"/>
    <rect x="485" y="95" width="20" height="20" rx="3" fill="#8b5cf6"/>
    <rect x="510" y="95" width="20" height="20" rx="3" fill="#8b5cf6"/>
    <rect x="535" y="95" width="20" height="20" rx="3" fill="#8b5cf6"/>

    <path d="M 570 95 L 600 95" stroke="#eab308" strokeWidth="2" markerEnd="url(#poolArrow)" fill="none"/>
    <text x="585" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">acquire</text>

    <rect x="605" y="75" width="60" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="635" y="100" textAnchor="middle" fill="white" fontSize="10">Use</text>

    <path d="M 665 95 L 740 95 L 740 140 L 510 140 L 510 125" stroke="#eab308" strokeWidth="2" markerEnd="url(#poolArrow)" fill="none"/>
    <text x="700" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">release</text>

    <text x="600" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Repeat 10000x = Same ~10 objects reused</text>

    {/* Benefits */}
    <rect x="50" y="180" width="700" height="80" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1"/>
    <text x="400" y="205" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Benefits of Object Pooling</text>
    <text x="200" y="230" textAnchor="middle" fill="#94a3b8" fontSize="10">Reduced allocations</text>
    <text x="400" y="230" textAnchor="middle" fill="#94a3b8" fontSize="10">Lower GC pressure</text>
    <text x="600" y="230" textAnchor="middle" fill="#94a3b8" fontSize="10">Predictable memory</text>
    <text x="400" y="250" textAnchor="middle" fill="#64748b" fontSize="9">Best for: DB connections, threads, expensive objects with clear lifecycle</text>
  </svg>
)

const OffHeapDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Heap vs Off-Heap Memory
    </text>

    {/* JVM Box */}
    <rect x="50" y="50" width="700" height="200" rx="12" fill="rgba(15, 23, 42, 0.4)" stroke="#475569" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">JVM Memory</text>

    {/* Heap Memory */}
    <rect x="80" y="95" width="280" height="130" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="220" y="120" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Heap Memory</text>
    <text x="220" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">ByteBuffer.allocate()</text>

    <rect x="100" y="160" width="100" height="50" rx="6" fill="#3b82f6" opacity="0.6"/>
    <text x="150" y="190" textAnchor="middle" fill="white" fontSize="9">Objects</text>

    <rect x="210" y="160" width="130" height="50" rx="6" fill="#22c55e" opacity="0.6"/>
    <text x="275" y="185" textAnchor="middle" fill="white" fontSize="9">Managed by GC</text>
    <text x="275" y="200" textAnchor="middle" fill="#bbf7d0" fontSize="8">Auto cleanup</text>

    {/* Off-Heap Memory */}
    <rect x="420" y="95" width="300" height="130" rx="8" fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="2"/>
    <text x="570" y="120" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Off-Heap (Direct Memory)</text>
    <text x="570" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">ByteBuffer.allocateDirect()</text>

    <rect x="440" y="160" width="130" height="50" rx="6" fill="#eab308" opacity="0.6"/>
    <text x="505" y="185" textAnchor="middle" fill="white" fontSize="9">Native Memory</text>
    <text x="505" y="200" textAnchor="middle" fill="#fef3c7" fontSize="8">No GC pressure</text>

    <rect x="580" y="160" width="120" height="50" rx="6" fill="#ef4444" opacity="0.6"/>
    <text x="640" y="185" textAnchor="middle" fill="white" fontSize="9">Manual cleanup</text>
    <text x="640" y="200" textAnchor="middle" fill="#fecaca" fontSize="8">Can leak!</text>

    {/* Labels */}
    <text x="220" y="235" textAnchor="middle" fill="#60a5fa" fontSize="9">-Xmx controls size</text>
    <text x="570" y="235" textAnchor="middle" fill="#fbbf24" fontSize="9">-XX:MaxDirectMemorySize</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function MemoryManagement({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'heap-structure',
      name: 'Heap Structure & Generational GC',
      icon: '🗄️',
      color: '#22c55e',
      description: 'Understand Java heap organization: Young Generation (Eden + Survivor), Old Generation, and Metaspace. Learn how objects are promoted and when different GC types occur.',
      diagram: HeapStructureDiagram,
      details: [
        {
          name: 'Heap Organization',
          diagram: HeapStructureDiagram,
          explanation: `Java's heap is divided into generations based on object lifetime. The Young Generation holds newly created objects and is subdivided into Eden space (where objects are born) and two Survivor spaces (S0/S1) for objects that survive GC. The Old Generation (Tenured) holds long-lived objects that survived many GCs. Metaspace (outside heap) stores class metadata.

Key insight: The "Generational Hypothesis" states that most objects die young. By segregating young and old objects, GC can efficiently collect the Young Gen frequently with minimal pause, while rarely touching the Old Gen.`,
          codeExample: `// Heap Memory Info
Runtime runtime = Runtime.getRuntime();

System.out.println("Max Memory: " +
    runtime.maxMemory() / (1024 * 1024) + " MB");
System.out.println("Total Memory: " +
    runtime.totalMemory() / (1024 * 1024) + " MB");
System.out.println("Free Memory: " +
    runtime.freeMemory() / (1024 * 1024) + " MB");

// JVM Flags for heap sizing:
// -Xms512m      Initial heap size
// -Xmx1024m     Maximum heap size
// -Xmn256m      Young generation size
// -XX:NewRatio=2  Young:Old ratio (1:2)`
        },
        {
          name: 'Object Lifecycle',
          diagram: GCGenerationsDiagram,
          explanation: `Objects follow a predictable lifecycle through the heap:

1. New objects are created in Eden space
2. When Eden fills, Minor GC triggers - live objects move to Survivor S0
3. Next Minor GC: survivors from Eden + S0 move to S1, age increments
4. S0 and S1 swap roles each GC cycle
5. When age exceeds threshold (default 15), objects promote to Old Gen
6. When Old Gen fills, Major/Full GC occurs (expensive!)

This design exploits the generational hypothesis: since most objects die young, frequently collecting Eden is efficient. Long-lived objects settle in Old Gen where they're rarely touched.`,
          codeExample: `// Demonstrate object aging
List<Object> survivors = new ArrayList<>();

for (int generation = 0; generation < 10; generation++) {
    // Create many short-lived objects (die in Eden)
    for (int i = 0; i < 100000; i++) {
        String temp = new String("temp-" + i);
        // Dies immediately after iteration
    }

    // Some objects survive (will be promoted)
    if (generation % 3 == 0) {
        survivors.add(new byte[1024 * 100]); // 100KB
    }

    // Suggest GC
    System.gc();
}
// survivors list keeps objects alive -> promoted to Old Gen`
        },
        {
          name: 'GC Types',
          explanation: `Three types of garbage collection occur based on memory pressure:

**Minor GC (Young Generation)**
- Triggered when Eden fills up
- Only collects Young Gen (Eden + Survivors)
- Fast: typically 1-10ms pause
- Frequent: can happen many times per second
- Uses copying collector (efficient for mostly-dead objects)

**Major GC (Old Generation)**
- Triggered when Old Gen fills up
- Collects only Old Generation
- Slower: 50-500ms pause
- Less frequent than Minor GC
- Uses mark-sweep-compact algorithm

**Full GC (Entire Heap)**
- Collects entire heap including Metaspace
- Slowest: can be 100ms to seconds
- Should be rare in well-tuned applications
- Often triggered by System.gc() or memory pressure`,
          codeExample: `// Monitor GC activity
import java.lang.management.*;

List<GarbageCollectorMXBean> gcBeans =
    ManagementFactory.getGarbageCollectorMXBeans();

for (GarbageCollectorMXBean gcBean : gcBeans) {
    System.out.println("GC Name: " + gcBean.getName());
    System.out.println("Collection Count: " +
        gcBean.getCollectionCount());
    System.out.println("Collection Time: " +
        gcBean.getCollectionTime() + "ms");
}

// Enable GC logging:
// Java 9+: java -Xlog:gc* MyApp
// Java 8:  java -XX:+PrintGCDetails MyApp`
        }
      ]
    },
    {
      id: 'memory-leaks',
      name: 'Memory Leaks',
      icon: '🔴',
      color: '#ef4444',
      description: 'Identify and fix common memory leak patterns: static collections, listeners not removed, ThreadLocal not cleaned, unclosed resources, and inner class references.',
      diagram: MemoryLeaksDiagram,
      details: [
        {
          name: 'Static Collections',
          diagram: MemoryLeaksDiagram,
          explanation: `The most common memory leak: static collections that grow unbounded. Since static fields live for the entire application lifecycle, objects added to static Lists or Maps are never garbage collected unless explicitly removed.

**The Problem:**
- Static List/Map keeps growing
- Objects never become unreachable
- Eventually: OutOfMemoryError

**Fixes:**
1. Add a removal mechanism (remove when no longer needed)
2. Use WeakHashMap (entries removed when key has no strong references)
3. Use SoftReference for caches (cleared when memory is low)
4. Implement size limits with eviction policy`,
          codeExample: `// BAD: Memory leak!
private static List<Object> cache = new ArrayList<>();

public void addToCache(Object obj) {
    cache.add(obj);  // Grows forever!
}

// FIX 1: Add removal mechanism
private static Map<String, Object> betterCache = new HashMap<>();

public void put(String key, Object obj) {
    betterCache.put(key, obj);
}
public void remove(String key) {
    betterCache.remove(key);  // Allow cleanup!
}

// FIX 2: Use WeakHashMap
private static Map<String, Object> weakCache = new WeakHashMap<>();
// Entries auto-removed when key has no strong references

// FIX 3: Use SoftReference for caches
private static Map<String, SoftReference<Object>> softCache =
    new HashMap<>();
// Values cleared when memory is needed`
        },
        {
          name: 'Listeners & Callbacks',
          explanation: `Event listeners and callbacks are a frequent source of leaks. When you register a listener but never unregister it, both the listener object and any objects it references stay in memory.

**The Problem:**
- Observers/listeners accumulate
- Each holds references to other objects
- The observed object can't be collected

**Fixes:**
1. Always provide and call removeListener()
2. Use WeakReference for listeners
3. Use lambda with weak references
4. Clean up in lifecycle methods (onDestroy, close())`,
          codeExample: `// BAD: Listeners never removed
private List<EventListener> listeners = new ArrayList<>();

public void addListener(EventListener l) {
    listeners.add(l);  // Never removed = leak!
}

// FIX 1: Always provide remove method
public void removeListener(EventListener l) {
    listeners.remove(l);
}

// FIX 2: Use WeakReference
private List<WeakReference<EventListener>> weakListeners =
    new ArrayList<>();

public void addWeakListener(EventListener l) {
    weakListeners.add(new WeakReference<>(l));
}

public void fireEvent() {
    // Clean up dead references while iterating
    weakListeners.removeIf(ref -> ref.get() == null);

    for (WeakReference<EventListener> ref : weakListeners) {
        EventListener listener = ref.get();
        if (listener != null) {
            listener.onEvent();
        }
    }
}`
        },
        {
          name: 'ThreadLocal Leaks',
          explanation: `ThreadLocal is especially dangerous in thread pools! When a thread is reused, its ThreadLocal values persist, causing leaks. This is critical in web servers and application servers where threads are pooled.

**The Problem:**
- ThreadLocal holds references per thread
- Thread pool reuses threads
- Values accumulate, never cleaned
- Eventually: OutOfMemoryError

**The Fix:**
ALWAYS call remove() in a finally block. This is mandatory for any ThreadLocal usage in pooled environments.`,
          codeExample: `// BAD: ThreadLocal leak in thread pool
private static ThreadLocal<List<Object>> threadCache =
    new ThreadLocal<>();

public void process() {
    List<Object> cache = threadCache.get();
    if (cache == null) {
        cache = new ArrayList<>();
        threadCache.set(cache);
    }
    cache.add(new Object());
    // LEAK: Thread returned to pool with data still set!
}

// FIX: Always remove in finally
public void processFixed() {
    try {
        List<Object> cache = threadCache.get();
        if (cache == null) {
            cache = new ArrayList<>();
            threadCache.set(cache);
        }
        cache.add(new Object());
        // Do work...
    } finally {
        threadCache.remove();  // CRITICAL!
    }
}`
        },
        {
          name: 'Unclosed Resources',
          explanation: `Streams, connections, and other resources that implement AutoCloseable must be closed. Failure to close them leaks native resources (file handles, sockets, memory).

**The Problem:**
- FileInputStream, Connection, etc. not closed
- Native resources exhausted
- "Too many open files" errors
- Memory leaks from native allocations

**The Fix:**
Always use try-with-resources (Java 7+). Resources are automatically closed even if exceptions occur.`,
          codeExample: `// BAD: Resource leak
public void readFile(String path) throws IOException {
    FileInputStream fis = new FileInputStream(path);
    // Read file...
    // LEAK: Never closed! What if exception occurs?
}

// FIX: try-with-resources (Java 7+)
public void readFileFixed(String path) throws IOException {
    try (FileInputStream fis = new FileInputStream(path);
         BufferedReader reader = new BufferedReader(
             new InputStreamReader(fis))) {
        // Read file...
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }  // Auto-closed! Even if exception thrown
}

// Multiple resources in one try
try (Connection conn = dataSource.getConnection();
     PreparedStatement ps = conn.prepareStatement(sql);
     ResultSet rs = ps.executeQuery()) {
    // All three auto-closed in reverse order
}`
        },
        {
          name: 'Inner Class References',
          explanation: `Non-static inner classes hold an implicit reference to their outer class instance. This can prevent the outer class from being garbage collected, even when you think you're only holding a reference to the inner class.

**The Problem:**
- Non-static inner class has implicit this$0 reference
- Outer class can't be collected while inner exists
- Common in Android (Activity leaks)

**The Fix:**
Use static inner classes when the inner class doesn't need access to outer instance fields. Static inner classes don't hold outer references.`,
          codeExample: `public class OuterClass {
    private byte[] largeData = new byte[10_000_000]; // 10MB

    // BAD: Non-static inner class holds outer reference
    class InnerClass {
        // Implicitly holds reference to OuterClass.this
        public void doSomething() {
            // Can access largeData via implicit reference
        }
    }

    public InnerClass createInner() {
        return new InnerClass();
        // Keeps entire OuterClass (with 10MB) alive!
    }

    // FIX: Use static inner class
    static class StaticInnerClass {
        // No implicit reference to OuterClass
        public void doSomething() {
            // Cannot access largeData (which is good!)
        }
    }
}

// Anonymous classes have same problem:
// BAD: Anonymous class holds outer reference
button.setOnClickListener(new OnClickListener() {
    public void onClick() { /* holds Activity reference */ }
});

// FIX: Use static method reference or weak reference`
        }
      ]
    },
    {
      id: 'garbage-collectors',
      name: 'Garbage Collectors Comparison',
      icon: '♻️',
      color: '#3b82f6',
      description: 'Compare Serial, Parallel, G1, and ZGC. Understand trade-offs between throughput and latency, and when to use each collector.',
      diagram: GCComparisonDiagram,
      details: [
        {
          name: 'Serial GC',
          diagram: GCComparisonDiagram,
          explanation: `The simplest garbage collector, using a single thread for all GC work. All application threads stop during collection (Stop-The-World).

**Characteristics:**
- Single-threaded GC
- Simple, low overhead
- Pause time: 10-100ms
- Good for: <100MB heap, single-core machines

**Use When:**
- Small heap sizes
- Client applications
- Embedded systems
- Single CPU available

**Flag:** -XX:+UseSerialGC`,
          codeExample: `// Run with Serial GC
// java -XX:+UseSerialGC -Xms64m -Xmx64m MyApp

// Serial GC is simple mark-sweep-compact:
// 1. Mark: Find all reachable objects
// 2. Sweep: Identify garbage
// 3. Compact: Move live objects together

// Best for small heaps where simplicity matters
// Low memory overhead, predictable (though slow) pauses`
        },
        {
          name: 'Parallel GC',
          explanation: `Multi-threaded garbage collector optimized for throughput. Uses multiple GC threads to speed up collection, but still stops all application threads.

**Characteristics:**
- Multi-threaded GC (parallel collection)
- Maximizes throughput
- Pause time: 100-1000ms (longer STW)
- Good for: Batch processing, no latency requirements

**Use When:**
- Throughput is more important than latency
- Batch processing jobs
- Background data processing
- Can tolerate longer pauses

**Flag:** -XX:+UseParallelGC (default in Java 8)`,
          codeExample: `// Run with Parallel GC
// java -XX:+UseParallelGC \\
//      -XX:ParallelGCThreads=4 \\
//      -XX:MaxGCPauseMillis=500 \\
//      -Xms2g -Xmx2g MyApp

// Tuning options:
// -XX:ParallelGCThreads=N   Number of GC threads
// -XX:MaxGCPauseMillis=N    Target max pause time
// -XX:GCTimeRatio=N         Throughput goal (default 99)
//                           Means 1% time in GC

// Good for batch jobs where you want maximum throughput
// Example: ETL processing, report generation`
        },
        {
          name: 'G1 GC (Default)',
          explanation: `G1 (Garbage First) is the default collector since Java 9. It divides the heap into ~2048 equal-sized regions and can target specific pause time goals.

**Characteristics:**
- Region-based heap (not contiguous generations)
- Predictable pause times
- Pause time: 10-200ms (target: 200ms default)
- Good for: Large heaps (4-64GB), balanced needs

**Key Features:**
- Concurrent marking (less STW)
- Incremental collection
- First collects regions with most garbage (hence "Garbage First")
- Compacts incrementally

**Use When:**
- Default choice for most applications
- Web applications
- Need balanced throughput and latency

**Flag:** -XX:+UseG1GC (default Java 9+)`,
          codeExample: `// Run with G1 GC (default in Java 9+)
// java -XX:+UseG1GC \\
//      -XX:MaxGCPauseMillis=200 \\
//      -XX:G1HeapRegionSize=16m \\
//      -XX:InitiatingHeapOccupancyPercent=45 \\
//      -Xms4g -Xmx4g MyApp

// Key tuning parameters:
// -XX:MaxGCPauseMillis=N    Target pause time (default 200ms)
// -XX:G1HeapRegionSize=N    Region size (1MB-32MB)
// -XX:G1NewSizePercent=N    Min young gen size (default 5%)
// -XX:G1MaxNewSizePercent=N Max young gen size (default 60%)

// G1 automatically adjusts to meet pause time goal
// Best general-purpose collector for most apps`
        },
        {
          name: 'ZGC',
          explanation: `ZGC is designed for ultra-low latency with pause times under 10ms, regardless of heap size. Uses colored pointers and load barriers for concurrent operations.

**Characteristics:**
- Ultra-low latency: <10ms pauses
- Scales to multi-terabyte heaps
- Concurrent (almost everything happens while app runs)
- Good for: Large heaps, strict latency requirements

**Key Features:**
- Colored pointers (metadata in pointer)
- Load barriers for concurrent relocation
- No generational collection (single generation)
- Highly concurrent phases

**Use When:**
- Strict latency requirements (<10ms)
- Very large heaps (>64GB)
- Trading/gaming/interactive applications
- Can trade some throughput for low latency

**Flag:** -XX:+UseZGC (Java 15+, production ready 17+)`,
          codeExample: `// Run with ZGC (Java 15+, production ready in 17+)
// java -XX:+UseZGC \\
//      -XX:ZCollectionInterval=5 \\
//      -Xms16g -Xmx16g \\
//      -Xlog:gc* MyApp

// ZGC tuning options:
// -XX:ZCollectionInterval=N  Time between GC cycles (seconds)
// -XX:ZUncommitDelay=N       Delay before uncommitting memory
// -XX:SoftMaxHeapSize=N      Target heap size (ZGC will try to stay under)

// ZGC phases (all concurrent except tiny STW):
// 1. Pause Mark Start (~1ms)
// 2. Concurrent Mark
// 3. Pause Mark End (~1ms)
// 4. Concurrent Relocate

// Total pause: typically <2ms even for TB heaps!`
        }
      ]
    },
    {
      id: 'memory-optimization',
      name: 'Memory Optimization',
      icon: '⚡',
      color: '#8b5cf6',
      description: 'Reduce GC pressure with object pooling and off-heap memory. Learn when and how to use DirectByteBuffer for performance-critical applications.',
      diagram: ObjectPoolingDiagram,
      details: [
        {
          name: 'Object Pooling',
          diagram: ObjectPoolingDiagram,
          explanation: `Object pooling reuses objects instead of creating new ones, reducing allocation rate and GC pressure. Useful for expensive-to-create objects with clear acquire/release lifecycle.

**When to Pool:**
- Expensive object creation (DB connections, threads)
- High allocation rate causing GC pressure
- Objects with clear lifecycle (acquire -> use -> release)
- Limited, well-known object types

**When NOT to Pool:**
- Cheap objects (String, Integer)
- Unpredictable usage patterns
- Complex state that's hard to reset
- Memory is more constrained than CPU

**Benefits:**
- Reduced allocations = less GC
- Faster acquisition than new
- Predictable memory usage`,
          codeExample: `// Generic Object Pool
public class ObjectPool<T> {
    private final Queue<T> pool;
    private final Supplier<T> factory;
    private final int maxSize;

    public ObjectPool(Supplier<T> factory, int initial, int max) {
        this.factory = factory;
        this.maxSize = max;
        this.pool = new ConcurrentLinkedQueue<>();

        // Pre-populate
        for (int i = 0; i < initial; i++) {
            pool.offer(factory.get());
        }
    }

    public T acquire() {
        T obj = pool.poll();
        return (obj != null) ? obj : factory.get();
    }

    public void release(T obj) {
        if (obj != null && pool.size() < maxSize) {
            // Reset object state here if needed
            pool.offer(obj);
        }
    }
}

// Usage
ObjectPool<ExpensiveObject> pool =
    new ObjectPool<>(ExpensiveObject::new, 10, 50);

for (int i = 0; i < 10000; i++) {
    ExpensiveObject obj = pool.acquire();
    obj.doWork();
    pool.release(obj);  // Return for reuse
}
// Result: ~10-50 objects instead of 10000 allocations!`
        },
        {
          name: 'Off-Heap Memory',
          diagram: OffHeapDiagram,
          explanation: `Off-heap (direct) memory is allocated outside the Java heap, avoiding GC pressure entirely. Java accesses it through DirectByteBuffer.

**Advantages:**
- No GC pressure (not scanned by GC)
- Better I/O performance (no copying to native)
- Not limited by heap size (-Xmx)
- Can be shared via memory-mapped files

**Disadvantages:**
- Manual management (can leak!)
- Slower allocation than heap
- Not visible in heap dumps
- Requires explicit cleanup

**Use For:**
- Large caches
- I/O buffers (NIO)
- Native library interaction
- Low-latency systems`,
          codeExample: `// Heap ByteBuffer (on-heap, subject to GC)
ByteBuffer heapBuffer = ByteBuffer.allocate(1024 * 1024);
// Fast allocation, but adds to GC pressure

// Direct ByteBuffer (off-heap, no GC)
ByteBuffer directBuffer = ByteBuffer.allocateDirect(1024 * 1024);
// Slower allocation, but no GC pressure
// Better for I/O operations

// File I/O with direct buffer (fast!)
try (FileChannel channel = FileChannel.open(path, READ)) {
    ByteBuffer buffer = ByteBuffer.allocateDirect(8192);
    while (channel.read(buffer) != -1) {
        buffer.flip();
        // Process data...
        buffer.clear();
    }
}

// Monitor direct memory usage
List<BufferPoolMXBean> pools =
    ManagementFactory.getPlatformMXBeans(BufferPoolMXBean.class);
for (BufferPoolMXBean pool : pools) {
    System.out.println(pool.getName() + ": " +
        pool.getMemoryUsed() / (1024*1024) + " MB");
}

// JVM flags:
// -XX:MaxDirectMemorySize=1G  Limit direct memory
// -XX:+DisableExplicitGC      Disable System.gc()
//                             (careful with direct memory!)`
        },
        {
          name: 'Memory Tuning Tips',
          explanation: `Practical tips for optimizing Java memory usage and reducing GC overhead:

**Heap Sizing:**
- Set -Xms = -Xmx (avoid resize pauses)
- Young Gen: 25-50% of heap for high allocation rates
- Monitor and adjust based on GC logs

**Reduce Allocation Rate:**
- Reuse objects where possible (StringBuilder, pools)
- Avoid autoboxing in hot paths
- Use primitive arrays instead of object arrays
- Cache immutable objects

**GC Tuning:**
- Start with defaults, measure first
- Enable GC logging (-Xlog:gc*)
- Use -XX:+HeapDumpOnOutOfMemoryError
- Profile before optimizing

**Monitoring:**
- Track GC pause times
- Watch for growing Old Gen (leak indicator)
- Monitor allocation rate
- Use VisualVM, JFR, or commercial tools`,
          codeExample: `// Recommended JVM flags for production

// General purpose (G1)
// java -XX:+UseG1GC \\
//      -Xms4g -Xmx4g \\
//      -XX:MaxGCPauseMillis=200 \\
//      -XX:+HeapDumpOnOutOfMemoryError \\
//      -XX:HeapDumpPath=/tmp/heap.bin \\
//      -Xlog:gc*:file=gc.log:time,uptime:filecount=5,filesize=10m \\
//      MyApp

// Low latency (ZGC)
// java -XX:+UseZGC \\
//      -Xms16g -Xmx16g \\
//      -XX:+HeapDumpOnOutOfMemoryError \\
//      -Xlog:gc*:file=gc.log \\
//      MyApp

// Monitoring direct memory
Runtime runtime = Runtime.getRuntime();
System.out.println("Heap Used: " +
    (runtime.totalMemory() - runtime.freeMemory()) / (1024*1024) + " MB");
System.out.println("Heap Max: " +
    runtime.maxMemory() / (1024*1024) + " MB");

// Force heap dump programmatically
// HotSpotDiagnosticMXBean bean = ManagementFactory
//     .getPlatformMXBean(HotSpotDiagnosticMXBean.class);
// bean.dumpHeap("/tmp/heap.hprof", true);`
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
      { name: 'Memory Management', icon: '🗄️', page: 'MemoryManagement' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #422006 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #fbbf24, #eab308)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(234, 179, 8, 0.2)',
    border: '1px solid rgba(234, 179, 8, 0.3)',
    borderRadius: '0.5rem',
    color: '#fbbf24',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Memory Management</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(234, 179, 8, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(234, 179, 8, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Java
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={MEMORY_COLORS}
        />
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
              maxWidth: '1200px',
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
              colors={MEMORY_COLORS}
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
                  <div style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    whiteSpace: 'pre-wrap'
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

/**
 * Java Streams API - Tab Template Format
 *
 * Covers Java Streams API concepts including:
 * - Stream Pipeline Architecture
 * - Intermediate Operations (map, filter, flatMap, etc.)
 * - Terminal Operations (reduce, collect, forEach, etc.)
 * - Collectors and Grouping
 * - Parallel Streams
 * - Best Practices and Performance
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const STREAMS_COLORS = {
  primary: '#3b82f6',           // Blue theme
  primaryHover: '#60a5fa',      // Hover state
  bg: 'rgba(59, 130, 246, 0.1)', // Background with transparency
  border: 'rgba(59, 130, 246, 0.3)', // Border color
  arrow: '#3b82f6',             // Arrow/indicator color
  hoverBg: 'rgba(59, 130, 246, 0.2)', // Hover background
  topicBg: 'rgba(59, 130, 246, 0.2)'  // Topic card background
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

const StreamPipelineDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="streamArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
      <linearGradient id="pipelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8"/>
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Stream Pipeline Architecture
    </text>

    {/* Source */}
    <rect x="30" y="70" width="100" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="80" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Source</text>
    <text x="80" y="112" textAnchor="middle" fill="white" fontSize="9">Collection/Array</text>

    {/* Arrow 1 */}
    <line x1="130" y1="100" x2="175" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#streamArrow)"/>

    {/* Intermediate Operations */}
    <rect x="180" y="70" width="120" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="240" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Intermediate</text>
    <text x="240" y="112" textAnchor="middle" fill="white" fontSize="9">filter, map, sorted</text>

    {/* Arrow 2 */}
    <line x1="300" y1="100" x2="345" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#streamArrow)"/>

    {/* More Intermediate */}
    <rect x="350" y="70" width="120" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4"/>
    <text x="410" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Intermediate</text>
    <text x="410" y="112" textAnchor="middle" fill="white" fontSize="9">flatMap, distinct</text>

    {/* Arrow 3 */}
    <line x1="470" y1="100" x2="515" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#streamArrow)"/>

    {/* Terminal Operation */}
    <rect x="520" y="70" width="120" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="580" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Terminal</text>
    <text x="580" y="112" textAnchor="middle" fill="white" fontSize="9">collect, reduce</text>

    {/* Arrow 4 */}
    <line x1="640" y1="100" x2="685" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#streamArrow)"/>

    {/* Result */}
    <rect x="690" y="70" width="80" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="730" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Result</text>
    <text x="730" y="112" textAnchor="middle" fill="white" fontSize="9">List/Value</text>

    {/* Labels */}
    <text x="240" y="155" textAnchor="middle" fill="#64748b" fontSize="10">Lazy (not executed until terminal)</text>
    <text x="580" y="155" textAnchor="middle" fill="#64748b" fontSize="10">Eager (triggers processing)</text>
  </svg>
)

const MapOperationDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="mapArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      map() - Transform Each Element
    </text>

    {/* Input elements */}
    <rect x="50" y="60" width="50" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="75" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>

    <rect x="110" y="60" width="50" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="135" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>

    <rect x="170" y="60" width="50" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="195" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>

    {/* Transform function */}
    <rect x="280" y="55" width="140" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="350" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`map(x -&gt; x * 2)`}</text>
    <text x="350" y="92" textAnchor="middle" fill="white" fontSize="10">Transform Function</text>

    {/* Arrows */}
    <line x1="220" y1="80" x2="275" y2="80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#mapArrow)"/>
    <line x1="420" y1="80" x2="475" y2="80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#mapArrow)"/>

    {/* Output elements */}
    <rect x="480" y="60" width="50" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="505" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>

    <rect x="540" y="60" width="50" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="565" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>

    <rect x="600" y="60" width="50" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="625" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">6</text>

    {/* Labels */}
    <text x="135" y="125" textAnchor="middle" fill="#64748b" fontSize="10">Input Stream</text>
    <text x="565" y="125" textAnchor="middle" fill="#64748b" fontSize="10">Output Stream</text>
  </svg>
)

const FilterOperationDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="filterArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      filter() - Select Matching Elements
    </text>

    {/* Input elements */}
    <rect x="50" y="60" width="40" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="70" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">1</text>

    <rect x="100" y="60" width="40" height="35" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="120" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">2</text>

    <rect x="150" y="60" width="40" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="170" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">3</text>

    <rect x="200" y="60" width="40" height="35" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="220" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">4</text>

    {/* Filter predicate */}
    <rect x="290" y="50" width="160" height="55" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="370" y="72" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`filter(x -&gt; x % 2 != 0)`}</text>
    <text x="370" y="90" textAnchor="middle" fill="white" fontSize="10">Keep odd numbers</text>

    {/* Arrows */}
    <line x1="240" y1="78" x2="285" y2="78" stroke="#22c55e" strokeWidth="2" markerEnd="url(#filterArrow)"/>
    <line x1="450" y1="78" x2="495" y2="78" stroke="#22c55e" strokeWidth="2" markerEnd="url(#filterArrow)"/>

    {/* Output elements (only odds) */}
    <rect x="500" y="60" width="40" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="520" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">1</text>

    <rect x="550" y="60" width="40" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="570" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">3</text>

    {/* Rejected elements indicator */}
    <line x1="370" y1="105" x2="370" y2="140" stroke="#ef4444" strokeWidth="1" strokeDasharray="4"/>
    <text x="370" y="155" textAnchor="middle" fill="#ef4444" fontSize="9">2, 4 filtered out</text>

    {/* Labels */}
    <text x="145" y="120" textAnchor="middle" fill="#64748b" fontSize="10">Input (4 elements)</text>
    <text x="535" y="120" textAnchor="middle" fill="#64748b" fontSize="10">Output (2 elements)</text>
  </svg>
)

const ReduceOperationDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="reduceArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      reduce() - Combine Elements into Single Result
    </text>

    {/* Input elements */}
    <rect x="50" y="60" width="40" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="70" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">1</text>

    <rect x="100" y="60" width="40" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="120" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">2</text>

    <rect x="150" y="60" width="40" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="170" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">3</text>

    <rect x="200" y="60" width="40" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="220" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">4</text>

    {/* Accumulator box */}
    <rect x="290" y="45" width="200" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="390" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`reduce(0, (a,b) -&gt; a + b)`}</text>
    <text x="390" y="90" textAnchor="middle" fill="white" fontSize="10">Identity: 0, Accumulator: sum</text>

    {/* Steps */}
    <text x="390" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">{`0 + 1 = 1 -&gt; 1 + 2 = 3 -&gt; 3 + 3 = 6 -&gt; 6 + 4 = 10`}</text>

    {/* Arrow to result */}
    <line x1="490" y1="80" x2="560" y2="80" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#reduceArrow)"/>

    {/* Result */}
    <rect x="570" y="55" width="70" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="605" y="78" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">10</text>
    <text x="605" y="95" textAnchor="middle" fill="white" fontSize="9">Result</text>

    {/* Labels */}
    <text x="145" y="115" textAnchor="middle" fill="#64748b" fontSize="10">Stream Elements</text>
  </svg>
)

const FlatMapDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="flatMapArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      flatMap() - Flatten Nested Streams
    </text>

    {/* Input nested lists */}
    <rect x="30" y="55" width="100" height="55" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#4ade80" strokeWidth="2"/>
    <text x="80" y="75" textAnchor="middle" fill="#4ade80" fontSize="10">[1, 2]</text>
    <text x="80" y="95" textAnchor="middle" fill="#64748b" fontSize="9">List 1</text>

    <rect x="140" y="55" width="100" height="55" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#4ade80" strokeWidth="2"/>
    <text x="190" y="75" textAnchor="middle" fill="#4ade80" fontSize="10">[3, 4, 5]</text>
    <text x="190" y="95" textAnchor="middle" fill="#64748b" fontSize="9">List 2</text>

    {/* FlatMap operation */}
    <rect x="290" y="50" width="180" height="65" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="380" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">flatMap(List::stream)</text>
    <text x="380" y="95" textAnchor="middle" fill="white" fontSize="10">Flatten nested structures</text>

    {/* Arrows */}
    <line x1="240" y1="82" x2="285" y2="82" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#flatMapArrow)"/>
    <line x1="470" y1="82" x2="515" y2="82" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#flatMapArrow)"/>

    {/* Output - flattened */}
    <rect x="520" y="60" width="35" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="537" y="80" textAnchor="middle" fill="white" fontSize="10">1</text>

    <rect x="560" y="60" width="35" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="577" y="80" textAnchor="middle" fill="white" fontSize="10">2</text>

    <rect x="600" y="60" width="35" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="617" y="80" textAnchor="middle" fill="white" fontSize="10">3</text>

    <rect x="640" y="60" width="35" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="657" y="80" textAnchor="middle" fill="white" fontSize="10">4</text>

    <rect x="680" y="60" width="35" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="697" y="80" textAnchor="middle" fill="white" fontSize="10">5</text>

    {/* Labels */}
    <text x="135" y="135" textAnchor="middle" fill="#64748b" fontSize="10">Nested Lists</text>
    <text x="617" y="110" textAnchor="middle" fill="#64748b" fontSize="10">Single Flattened Stream</text>
  </svg>
)

const CollectorsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="collectArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Collectors - Accumulate Stream Results
    </text>

    {/* Stream source */}
    <rect x="30" y="70" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="90" y="92" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Stream</text>
    <text x="90" y="108" textAnchor="middle" fill="white" fontSize="9">[A, B, C, A, B]</text>

    {/* Arrow to collect */}
    <line x1="150" y1="95" x2="195" y2="95" stroke="#22c55e" strokeWidth="2" markerEnd="url(#collectArrow)"/>

    {/* collect() box */}
    <rect x="200" y="60" width="120" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="260" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">collect()</text>
    <text x="260" y="102" textAnchor="middle" fill="white" fontSize="9">Terminal</text>
    <text x="260" y="118" textAnchor="middle" fill="white" fontSize="9">Operation</text>

    {/* Collector options */}
    <line x1="320" y1="75" x2="380" y2="50" stroke="#64748b" strokeWidth="1"/>
    <line x1="320" y1="95" x2="380" y2="95" stroke="#64748b" strokeWidth="1"/>
    <line x1="320" y1="115" x2="380" y2="140" stroke="#64748b" strokeWidth="1"/>

    {/* toList */}
    <rect x="385" y="30" width="140" height="40" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1"/>
    <text x="455" y="48" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">toList()</text>
    <text x="455" y="62" textAnchor="middle" fill="white" fontSize="8">[A, B, C, A, B]</text>

    {/* toSet */}
    <rect x="385" y="75" width="140" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="455" y="93" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">toSet()</text>
    <text x="455" y="107" textAnchor="middle" fill="white" fontSize="8">{'{A, B, C}'}</text>

    {/* groupingBy */}
    <rect x="385" y="120" width="140" height="40" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="1"/>
    <text x="455" y="138" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">groupingBy()</text>
    <text x="455" y="152" textAnchor="middle" fill="white" fontSize="8">{'{A=[A,A], B=[B,B]...}'}</text>

    {/* More collectors */}
    <rect x="550" y="55" width="100" height="30" rx="4" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1"/>
    <text x="600" y="74" textAnchor="middle" fill="#94a3b8" fontSize="9">joining()</text>

    <rect x="550" y="90" width="100" height="30" rx="4" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1"/>
    <text x="600" y="109" textAnchor="middle" fill="#94a3b8" fontSize="9">counting()</text>

    <rect x="550" y="125" width="100" height="30" rx="4" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1"/>
    <text x="600" y="144" textAnchor="middle" fill="#94a3b8" fontSize="9">partitioningBy()</text>

    {/* Labels */}
    <text x="90" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Input</text>
    <text x="600" y="180" textAnchor="middle" fill="#64748b" fontSize="9">And more...</text>
  </svg>
)

const ParallelStreamDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="parallelArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Parallel Streams - Fork/Join Processing
    </text>

    {/* Source */}
    <rect x="30" y="100" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="122" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Source Data</text>
    <text x="80" y="138" textAnchor="middle" fill="white" fontSize="9">[1,2,3,4,5,6,7,8]</text>

    {/* Fork arrows */}
    <line x1="130" y1="110" x2="180" y2="70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#parallelArrow)"/>
    <line x1="130" y1="125" x2="180" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#parallelArrow)"/>
    <line x1="130" y1="140" x2="180" y2="180" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#parallelArrow)"/>

    {/* Thread boxes */}
    <rect x="185" y="45" width="140" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="255" y="67" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Thread 1</text>
    <text x="255" y="83" textAnchor="middle" fill="white" fontSize="9">{`[1,2,3] -&gt; process`}</text>

    <rect x="185" y="100" width="140" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="255" y="122" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Thread 2</text>
    <text x="255" y="138" textAnchor="middle" fill="white" fontSize="9">{`[4,5] -&gt; process`}</text>

    <rect x="185" y="155" width="140" height="50" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="255" y="177" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Thread 3</text>
    <text x="255" y="193" textAnchor="middle" fill="white" fontSize="9">{`[6,7,8] -&gt; process`}</text>

    {/* Fork/Join label */}
    <text x="150" y="220" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">FORK</text>

    {/* Join arrows */}
    <line x1="325" y1="70" x2="385" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#parallelArrow)"/>
    <line x1="325" y1="125" x2="385" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#parallelArrow)"/>
    <line x1="325" y1="180" x2="385" y2="140" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#parallelArrow)"/>

    {/* Combine */}
    <rect x="390" y="95" width="120" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="450" y="118" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Combine</text>
    <text x="450" y="135" textAnchor="middle" fill="white" fontSize="9">Results</text>

    {/* Join label */}
    <text x="360" y="220" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">JOIN</text>

    {/* Result */}
    <line x1="510" y1="125" x2="555" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#parallelArrow)"/>
    <rect x="560" y="100" width="90" height="50" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="605" y="122" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Final</text>
    <text x="605" y="138" textAnchor="middle" fill="white" fontSize="9">Result</text>

    {/* Warning */}
    <text x="400" y="235" textAnchor="middle" fill="#64748b" fontSize="9">Uses ForkJoinPool.commonPool() - beware of blocking operations!</text>
  </svg>
)

const LazyEvaluationDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="lazyArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Lazy Evaluation - Operations Execute Only When Needed
    </text>

    {/* Intermediate operations (lazy) */}
    <rect x="50" y="60" width="120" height="50" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5"/>
    <text x="110" y="82" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">filter()</text>
    <text x="110" y="98" textAnchor="middle" fill="#64748b" fontSize="9">Not executed</text>

    <line x1="170" y1="85" x2="195" y2="85" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>

    <rect x="200" y="60" width="120" height="50" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5"/>
    <text x="260" y="82" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">map()</text>
    <text x="260" y="98" textAnchor="middle" fill="#64748b" fontSize="9">Not executed</text>

    <line x1="320" y1="85" x2="345" y2="85" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>

    <rect x="350" y="60" width="120" height="50" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5"/>
    <text x="410" y="82" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">sorted()</text>
    <text x="410" y="98" textAnchor="middle" fill="#64748b" fontSize="9">Not executed</text>

    {/* Terminal operation (triggers execution) */}
    <line x1="470" y1="85" x2="525" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#lazyArrow)"/>

    <rect x="530" y="55" width="140" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="600" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">collect()</text>
    <text x="600" y="98" textAnchor="middle" fill="white" fontSize="9">TRIGGERS ALL!</text>

    {/* Labels */}
    <text x="260" y="135" textAnchor="middle" fill="#3b82f6" fontSize="10">Intermediate (Lazy)</text>
    <text x="600" y="135" textAnchor="middle" fill="#f59e0b" fontSize="10">Terminal (Eager)</text>
    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="9">Pipeline is built but not executed until terminal operation</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Streams({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'stream-pipeline',
      name: 'Stream Pipeline',
      icon: '🌊',
      color: '#3b82f6',
      description: 'Understanding the stream pipeline architecture: source, intermediate operations, and terminal operations.',
      diagram: StreamPipelineDiagram,
      details: [
        {
          name: 'Pipeline Architecture',
          diagram: StreamPipelineDiagram,
          explanation: 'A stream pipeline consists of three parts: (1) A source that produces elements (Collection, array, generator), (2) Zero or more intermediate operations that transform the stream (filter, map, sorted), and (3) A terminal operation that produces a result or side-effect (collect, forEach, reduce). Streams are lazy - intermediate operations are not executed until a terminal operation is invoked.',
          codeExample: `// Stream Pipeline Example
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

List<String> result = names.stream()    // 1. Source
    .filter(n -> n.length() > 3)        // 2. Intermediate: filter
    .map(String::toUpperCase)           // 2. Intermediate: map
    .sorted()                           // 2. Intermediate: sort
    .collect(Collectors.toList());      // 3. Terminal: collect

// Result: [ALICE, CHARLIE, DAVID]`
        },
        {
          name: 'Creating Streams',
          explanation: 'Streams can be created from various sources: Collections via .stream(), arrays via Arrays.stream() or Stream.of(), ranges via IntStream.range(), files via Files.lines(), or infinite streams via Stream.generate() and Stream.iterate().',
          codeExample: `// Various ways to create streams

// From Collection
List<Integer> list = Arrays.asList(1, 2, 3);
Stream<Integer> s1 = list.stream();

// From Array
int[] arr = {1, 2, 3, 4, 5};
IntStream s2 = Arrays.stream(arr);

// Using Stream.of()
Stream<String> s3 = Stream.of("a", "b", "c");

// Range of integers
IntStream s4 = IntStream.range(1, 100);     // 1 to 99
IntStream s5 = IntStream.rangeClosed(1, 100); // 1 to 100

// Infinite streams (use with limit!)
Stream<Double> randoms = Stream.generate(Math::random).limit(10);
Stream<Integer> evens = Stream.iterate(0, n -> n + 2).limit(10);

// From String
IntStream chars = "hello".chars();

// From Files
Stream<String> lines = Files.lines(Paths.get("file.txt"));`
        },
        {
          name: 'Lazy Evaluation',
          diagram: LazyEvaluationDiagram,
          explanation: 'Stream operations are lazy - they are not executed until a terminal operation is invoked. This allows for optimization like short-circuiting (stopping early when result is found) and loop fusion (combining multiple operations into a single pass). This makes streams efficient even with large datasets.',
          codeExample: `// Demonstrating lazy evaluation
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Nothing is executed yet - pipeline is just built
Stream<Integer> pipeline = numbers.stream()
    .filter(n -> {
        System.out.println("Filtering: " + n);
        return n % 2 == 0;
    })
    .map(n -> {
        System.out.println("Mapping: " + n);
        return n * 2;
    });

System.out.println("Pipeline built, nothing executed yet...");

// NOW it executes when we call terminal operation
List<Integer> result = pipeline.collect(Collectors.toList());
// Output shows interleaved filter/map calls, not all filters then all maps`
        },
        {
          name: 'Stream Characteristics',
          explanation: 'Streams have important characteristics: they do NOT store elements (data flows through), they are functional (produce results without modifying source), they are lazily evaluated, they can be unbounded (infinite), and they are consumable (can only be traversed once). After a terminal operation, the stream is considered consumed.',
          codeExample: `// Streams are consumable - can only be used once
Stream<String> stream = Stream.of("a", "b", "c");

stream.forEach(System.out::println);  // Works

// This would throw IllegalStateException!
// stream.forEach(System.out::println);  // Stream already consumed

// Streams don't modify the source
List<Integer> original = new ArrayList<>(Arrays.asList(3, 1, 2));
List<Integer> sorted = original.stream()
    .sorted()
    .collect(Collectors.toList());

System.out.println(original);  // [3, 1, 2] - unchanged
System.out.println(sorted);    // [1, 2, 3] - new list`
        }
      ]
    },
    {
      id: 'intermediate-operations',
      name: 'Intermediate Operations',
      icon: '🔄',
      color: '#22c55e',
      description: 'Transform streams using map, filter, flatMap, sorted, distinct, limit, skip, and peek.',
      diagram: MapOperationDiagram,
      details: [
        {
          name: 'map() - Transform',
          diagram: MapOperationDiagram,
          explanation: 'The map() operation transforms each element in the stream by applying a function. It produces a new stream with the same number of elements, but each element is the result of applying the mapping function to the original element. Use map() for one-to-one transformations.',
          codeExample: `// map() - transform each element
List<String> names = Arrays.asList("alice", "bob", "charlie");

// Transform to uppercase
List<String> upper = names.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());
// Result: [ALICE, BOB, CHARLIE]

// Get string lengths
List<Integer> lengths = names.stream()
    .map(String::length)
    .collect(Collectors.toList());
// Result: [5, 3, 7]

// Transform objects
List<Person> people = getPersonList();
List<String> emails = people.stream()
    .map(Person::getEmail)
    .collect(Collectors.toList());

// Primitive streams for efficiency
int[] numbers = {1, 2, 3, 4, 5};
int[] doubled = Arrays.stream(numbers)
    .map(n -> n * 2)
    .toArray();
// Result: [2, 4, 6, 8, 10]`
        },
        {
          name: 'filter() - Select',
          diagram: FilterOperationDiagram,
          explanation: 'The filter() operation selects elements that match a given predicate (condition). Elements that pass the test are included in the resulting stream, while others are excluded. Filter is used to reduce the stream to only relevant elements.',
          codeExample: `// filter() - select elements matching condition
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Filter even numbers
List<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
// Result: [2, 4, 6, 8, 10]

// Filter with multiple conditions
List<Person> adults = people.stream()
    .filter(p -> p.getAge() >= 18)
    .filter(p -> p.getCountry().equals("USA"))
    .collect(Collectors.toList());

// Filter nulls
List<String> nonNull = strings.stream()
    .filter(Objects::nonNull)
    .collect(Collectors.toList());

// Filter with complex predicate
Predicate<Order> expensiveRecent = order ->
    order.getAmount() > 1000 &&
    order.getDate().isAfter(LocalDate.now().minusDays(30));

List<Order> filtered = orders.stream()
    .filter(expensiveRecent)
    .collect(Collectors.toList());`
        },
        {
          name: 'flatMap() - Flatten',
          diagram: FlatMapDiagram,
          explanation: 'The flatMap() operation is used when each element maps to multiple elements (or a stream). It flattens the nested structure into a single stream. Use flatMap() when you have a collection of collections and want to process all elements uniformly.',
          codeExample: `// flatMap() - flatten nested structures
List<List<Integer>> nested = Arrays.asList(
    Arrays.asList(1, 2, 3),
    Arrays.asList(4, 5),
    Arrays.asList(6, 7, 8, 9)
);

// Flatten to single list
List<Integer> flat = nested.stream()
    .flatMap(List::stream)  // or: list -> list.stream()
    .collect(Collectors.toList());
// Result: [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Flatten string arrays
String[] words = {"Hello World", "Java Streams"};
List<String> letters = Arrays.stream(words)
    .flatMap(word -> Arrays.stream(word.split("")))
    .distinct()
    .collect(Collectors.toList());

// Get all orders from all customers
List<Order> allOrders = customers.stream()
    .flatMap(customer -> customer.getOrders().stream())
    .collect(Collectors.toList());

// flatMap with Optional
Optional<String> result = Optional.of("value")
    .flatMap(v -> Optional.of(v.toUpperCase()));`
        },
        {
          name: 'sorted() & distinct()',
          explanation: 'sorted() orders elements using natural ordering or a custom Comparator. distinct() removes duplicate elements based on equals(). Both are stateful operations that may need to process all elements before producing output.',
          codeExample: `// sorted() - order elements
List<Integer> numbers = Arrays.asList(5, 3, 8, 1, 9, 2);

// Natural ordering
List<Integer> sorted = numbers.stream()
    .sorted()
    .collect(Collectors.toList());
// Result: [1, 2, 3, 5, 8, 9]

// Custom comparator
List<String> names = Arrays.asList("Charlie", "Alice", "Bob");
List<String> byLength = names.stream()
    .sorted(Comparator.comparingInt(String::length))
    .collect(Collectors.toList());
// Result: [Bob, Alice, Charlie]

// Reverse order
List<Integer> descending = numbers.stream()
    .sorted(Comparator.reverseOrder())
    .collect(Collectors.toList());

// distinct() - remove duplicates
List<Integer> nums = Arrays.asList(1, 2, 2, 3, 3, 3, 4);
List<Integer> unique = nums.stream()
    .distinct()
    .collect(Collectors.toList());
// Result: [1, 2, 3, 4]

// Combined: unique sorted values
List<Integer> uniqueSorted = numbers.stream()
    .distinct()
    .sorted()
    .collect(Collectors.toList());`
        },
        {
          name: 'limit(), skip() & peek()',
          explanation: 'limit(n) truncates the stream to at most n elements. skip(n) discards the first n elements. peek() allows performing an action on each element while letting them pass through - useful for debugging. These are often used together for pagination.',
          codeExample: `// limit() - take first n elements
Stream.iterate(1, n -> n + 1)
    .limit(5)
    .forEach(System.out::println);
// Output: 1, 2, 3, 4, 5

// skip() - skip first n elements
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
List<Integer> skipped = numbers.stream()
    .skip(3)
    .collect(Collectors.toList());
// Result: [4, 5, 6, 7, 8, 9, 10]

// Pagination: skip + limit
int page = 2;
int pageSize = 10;
List<Item> pageItems = items.stream()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .collect(Collectors.toList());

// peek() - debug/logging
List<Integer> result = numbers.stream()
    .filter(n -> n > 5)
    .peek(n -> System.out.println("After filter: " + n))
    .map(n -> n * 2)
    .peek(n -> System.out.println("After map: " + n))
    .collect(Collectors.toList());

// takeWhile() / dropWhile() (Java 9+)
List<Integer> taken = numbers.stream()
    .takeWhile(n -> n < 5)  // [1, 2, 3, 4]
    .collect(Collectors.toList());`
        }
      ]
    },
    {
      id: 'terminal-operations',
      name: 'Terminal Operations',
      icon: '🎯',
      color: '#f59e0b',
      description: 'Complete stream processing with collect, reduce, forEach, count, and find operations.',
      diagram: ReduceOperationDiagram,
      details: [
        {
          name: 'reduce() - Aggregate',
          diagram: ReduceOperationDiagram,
          explanation: 'The reduce() operation combines all elements into a single result using an accumulator function. It can have an identity value (starting point) or return an Optional if the stream might be empty. reduce() is fundamental to many aggregation operations.',
          codeExample: `// reduce() - combine all elements
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Sum with identity
int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);
// Or: .reduce(0, Integer::sum);
// Result: 15

// Product
int product = numbers.stream()
    .reduce(1, (a, b) -> a * b);
// Result: 120

// Without identity - returns Optional
Optional<Integer> max = numbers.stream()
    .reduce(Integer::max);
// Result: Optional[5]

// String concatenation
List<String> words = Arrays.asList("Java", "Streams", "API");
String sentence = words.stream()
    .reduce("", (a, b) -> a + " " + b)
    .trim();
// Result: "Java Streams API"

// Find longest string
Optional<String> longest = words.stream()
    .reduce((a, b) -> a.length() > b.length() ? a : b);

// Three-argument reduce for parallel streams
int parallelSum = numbers.parallelStream()
    .reduce(0, Integer::sum, Integer::sum);`
        },
        {
          name: 'collect() - Accumulate',
          diagram: CollectorsDiagram,
          explanation: 'The collect() operation accumulates stream elements into a result container (List, Set, Map, String, etc.) using a Collector. The Collectors utility class provides many built-in collectors for common operations.',
          codeExample: `// collect() with various Collectors
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Alice");

// To List
List<String> list = names.stream()
    .collect(Collectors.toList());

// To Set (removes duplicates)
Set<String> set = names.stream()
    .collect(Collectors.toSet());

// To specific collection type
TreeSet<String> treeSet = names.stream()
    .collect(Collectors.toCollection(TreeSet::new));

// Join strings
String joined = names.stream()
    .collect(Collectors.joining(", "));
// Result: "Alice, Bob, Charlie, Alice"

// With prefix/suffix
String formatted = names.stream()
    .collect(Collectors.joining(", ", "[", "]"));
// Result: "[Alice, Bob, Charlie, Alice]"

// Counting
long count = names.stream()
    .collect(Collectors.counting());

// Statistics
IntSummaryStatistics stats = names.stream()
    .collect(Collectors.summarizingInt(String::length));
// stats.getAverage(), getMax(), getMin(), getSum(), getCount()`
        },
        {
          name: 'forEach() & count()',
          explanation: 'forEach() performs an action on each element - it is terminal and returns void. forEachOrdered() guarantees encounter order in parallel streams. count() returns the number of elements. These are simple terminal operations for side-effects or counting.',
          codeExample: `// forEach() - perform action on each element
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// Print each element
names.stream().forEach(System.out::println);

// Or use method reference
names.forEach(System.out::println);

// Modify external state (use with caution!)
List<String> results = new ArrayList<>();
names.stream()
    .map(String::toUpperCase)
    .forEach(results::add);

// forEachOrdered() - preserve order in parallel
names.parallelStream()
    .forEachOrdered(System.out::println);
// Always prints: Alice, Bob, Charlie (in order)

// count() - get number of elements
long count = names.stream()
    .filter(n -> n.length() > 3)
    .count();
// Result: 2

// More efficient for collections
long size = names.size(); // Better than stream().count()

// count() is useful when filtering
long evensCount = IntStream.range(1, 100)
    .filter(n -> n % 2 == 0)
    .count();`
        },
        {
          name: 'find & match Operations',
          explanation: 'findFirst() returns the first element as Optional. findAny() returns any element (better for parallel). allMatch(), anyMatch(), noneMatch() test elements against a predicate. These are short-circuiting operations that may not process all elements.',
          codeExample: `// findFirst() - get first element
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

Optional<Integer> first = numbers.stream()
    .filter(n -> n > 3)
    .findFirst();
// Result: Optional[4]

// findAny() - any element (better for parallel)
Optional<Integer> any = numbers.parallelStream()
    .filter(n -> n > 3)
    .findAny();
// Result: Optional[4] or Optional[5]

// allMatch() - all elements match?
boolean allPositive = numbers.stream()
    .allMatch(n -> n > 0);
// Result: true

// anyMatch() - any element matches?
boolean hasEven = numbers.stream()
    .anyMatch(n -> n % 2 == 0);
// Result: true

// noneMatch() - no elements match?
boolean noNegatives = numbers.stream()
    .noneMatch(n -> n < 0);
// Result: true

// Short-circuiting behavior
boolean found = Stream.iterate(1, n -> n + 1)
    .peek(n -> System.out.println("Checking: " + n))
    .anyMatch(n -> n > 5);
// Only prints: Checking: 1, 2, 3, 4, 5, 6 (stops at first match)`
        },
        {
          name: 'min(), max() & toArray()',
          explanation: 'min() and max() return the smallest/largest element according to a Comparator. toArray() converts the stream to an array. These complete the stream processing and return concrete results.',
          codeExample: `// min() and max()
List<Integer> numbers = Arrays.asList(5, 3, 8, 1, 9, 2);

Optional<Integer> min = numbers.stream()
    .min(Comparator.naturalOrder());
// Result: Optional[1]

Optional<Integer> max = numbers.stream()
    .max(Comparator.naturalOrder());
// Result: Optional[9]

// With objects
List<Person> people = getPersonList();
Optional<Person> youngest = people.stream()
    .min(Comparator.comparingInt(Person::getAge));

Optional<Person> oldest = people.stream()
    .max(Comparator.comparingInt(Person::getAge));

// toArray() - convert to array
String[] names = Stream.of("Alice", "Bob", "Charlie")
    .toArray(String[]::new);

// Without generator - returns Object[]
Object[] objects = Stream.of(1, 2, 3).toArray();

// Primitive streams
int[] intArray = IntStream.range(1, 6).toArray();
// Result: [1, 2, 3, 4, 5]

// Common pattern: filter, transform, collect to array
int[] evenSquares = IntStream.range(1, 10)
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .toArray();
// Result: [4, 16, 36, 64]`
        }
      ]
    },
    {
      id: 'collectors',
      name: 'Collectors & Grouping',
      icon: '📦',
      color: '#8b5cf6',
      description: 'Master advanced collectors: groupingBy, partitioningBy, mapping, and custom collectors.',
      diagram: CollectorsDiagram,
      details: [
        {
          name: 'groupingBy()',
          explanation: 'groupingBy() creates a Map where keys are determined by a classifier function and values are Lists of elements. It supports downstream collectors for aggregating grouped elements. This is essential for SQL-like GROUP BY operations.',
          codeExample: `// groupingBy() - group elements by classifier
List<Person> people = Arrays.asList(
    new Person("Alice", 25, "Engineering"),
    new Person("Bob", 30, "Sales"),
    new Person("Charlie", 25, "Engineering"),
    new Person("David", 35, "Sales")
);

// Group by department
Map<String, List<Person>> byDept = people.stream()
    .collect(Collectors.groupingBy(Person::getDepartment));
// {Engineering=[Alice, Charlie], Sales=[Bob, David]}

// Group by age
Map<Integer, List<Person>> byAge = people.stream()
    .collect(Collectors.groupingBy(Person::getAge));

// With downstream collector - count per group
Map<String, Long> countByDept = people.stream()
    .collect(Collectors.groupingBy(
        Person::getDepartment,
        Collectors.counting()
    ));
// {Engineering=2, Sales=2}

// Nested grouping
Map<String, Map<Integer, List<Person>>> nested = people.stream()
    .collect(Collectors.groupingBy(
        Person::getDepartment,
        Collectors.groupingBy(Person::getAge)
    ));

// Sum salaries by department
Map<String, Double> salaryByDept = people.stream()
    .collect(Collectors.groupingBy(
        Person::getDepartment,
        Collectors.summingDouble(Person::getSalary)
    ));`
        },
        {
          name: 'partitioningBy()',
          explanation: 'partitioningBy() splits elements into two groups based on a predicate - a Map with Boolean keys (true/false). It is a special case of groupingBy() optimized for binary classification.',
          codeExample: `// partitioningBy() - split into two groups
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Partition into even/odd
Map<Boolean, List<Integer>> evenOdd = numbers.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));
// {false=[1, 3, 5, 7, 9], true=[2, 4, 6, 8, 10]}

List<Integer> evens = evenOdd.get(true);
List<Integer> odds = evenOdd.get(false);

// With downstream collector
Map<Boolean, Long> counts = numbers.stream()
    .collect(Collectors.partitioningBy(
        n -> n % 2 == 0,
        Collectors.counting()
    ));
// {false=5, true=5}

// Partition students by pass/fail
Map<Boolean, List<Student>> passFail = students.stream()
    .collect(Collectors.partitioningBy(
        s -> s.getScore() >= 60
    ));

// Get average score for each group
Map<Boolean, Double> avgScores = students.stream()
    .collect(Collectors.partitioningBy(
        s -> s.getScore() >= 60,
        Collectors.averagingDouble(Student::getScore)
    ));`
        },
        {
          name: 'toMap()',
          explanation: 'toMap() creates a Map from stream elements using key and value mapper functions. Handles duplicate keys with a merge function. Can specify the Map implementation type.',
          codeExample: `// toMap() - create Map from stream
List<Person> people = getPersonList();

// Name as key, Person as value
Map<String, Person> byName = people.stream()
    .collect(Collectors.toMap(
        Person::getName,    // key mapper
        p -> p              // value mapper (or Function.identity())
    ));

// Name as key, age as value
Map<String, Integer> nameToAge = people.stream()
    .collect(Collectors.toMap(
        Person::getName,
        Person::getAge
    ));

// Handle duplicate keys with merge function
Map<String, Integer> salaryByDept = people.stream()
    .collect(Collectors.toMap(
        Person::getDepartment,
        Person::getSalary,
        Integer::sum  // merge: sum salaries for same dept
    ));

// Specify Map type
Map<String, Person> sortedMap = people.stream()
    .collect(Collectors.toMap(
        Person::getName,
        Function.identity(),
        (p1, p2) -> p1,     // keep first on duplicate
        TreeMap::new        // use TreeMap
    ));

// Invert a map
Map<String, Integer> original = Map.of("a", 1, "b", 2);
Map<Integer, String> inverted = original.entrySet().stream()
    .collect(Collectors.toMap(
        Map.Entry::getValue,
        Map.Entry::getKey
    ));`
        },
        {
          name: 'mapping() & flatMapping()',
          explanation: 'mapping() transforms elements before collecting. flatMapping() (Java 9+) flattens and collects. These are used as downstream collectors within groupingBy() or partitioningBy() for more complex aggregations.',
          codeExample: `// mapping() - transform then collect
List<Person> people = getPersonList();

// Group by dept, get names only (not Person objects)
Map<String, List<String>> namesByDept = people.stream()
    .collect(Collectors.groupingBy(
        Person::getDepartment,
        Collectors.mapping(
            Person::getName,
            Collectors.toList()
        )
    ));

// Collect to Set instead of List
Map<String, Set<String>> uniqueNames = people.stream()
    .collect(Collectors.groupingBy(
        Person::getDepartment,
        Collectors.mapping(
            Person::getName,
            Collectors.toSet()
        )
    ));

// flatMapping() - flatten then collect (Java 9+)
Map<String, Set<String>> skillsByDept = people.stream()
    .collect(Collectors.groupingBy(
        Person::getDepartment,
        Collectors.flatMapping(
            p -> p.getSkills().stream(),
            Collectors.toSet()
        )
    ));

// Chained downstream collectors
Map<String, String> joinedNames = people.stream()
    .collect(Collectors.groupingBy(
        Person::getDepartment,
        Collectors.mapping(
            Person::getName,
            Collectors.joining(", ")
        )
    ));
// {Engineering="Alice, Charlie", Sales="Bob, David"}`
        },
        {
          name: 'Custom Collectors',
          explanation: 'Create custom collectors using Collector.of() with supplier, accumulator, combiner, and finisher functions. This allows implementing any collection strategy not covered by built-in collectors.',
          codeExample: `// Custom Collector structure
Collector<T, A, R> collector = Collector.of(
    supplier,     // () -> A (create accumulator)
    accumulator,  // (A, T) -> void (add element)
    combiner,     // (A, A) -> A (merge accumulators)
    finisher,     // A -> R (final transformation)
    characteristics  // CONCURRENT, UNORDERED, IDENTITY_FINISH
);

// Example: Collect to ArrayList with initial capacity
Collector<String, List<String>, List<String>> toSizedList =
    Collector.of(
        () -> new ArrayList<>(100),      // supplier
        List::add,                        // accumulator
        (left, right) -> {               // combiner
            left.addAll(right);
            return left;
        },
        Function.identity(),              // finisher
        Collector.Characteristics.IDENTITY_FINISH
    );

// Example: Collect statistics
Collector<Integer, int[], double[]> statsCollector =
    Collector.of(
        () -> new int[]{0, 0},           // [sum, count]
        (acc, val) -> {
            acc[0] += val;
            acc[1]++;
        },
        (left, right) -> new int[]{
            left[0] + right[0],
            left[1] + right[1]
        },
        acc -> new double[]{
            acc[0],                       // sum
            acc[1],                       // count
            (double) acc[0] / acc[1]      // average
        }
    );`
        }
      ]
    },
    {
      id: 'parallel-streams',
      name: 'Parallel Streams',
      icon: '⚡',
      color: '#ec4899',
      description: 'Leverage multi-core processing with parallel streams, understanding when and how to use them effectively.',
      diagram: ParallelStreamDiagram,
      details: [
        {
          name: 'Creating Parallel Streams',
          diagram: ParallelStreamDiagram,
          explanation: 'Parallel streams use the Fork/Join framework to split work across multiple threads. Create them using Collection.parallelStream() or Stream.parallel(). They use the common ForkJoinPool by default.',
          codeExample: `// Creating parallel streams
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Method 1: parallelStream()
long count1 = numbers.parallelStream()
    .filter(n -> n > 5)
    .count();

// Method 2: parallel() on existing stream
long count2 = numbers.stream()
    .parallel()
    .filter(n -> n > 5)
    .count();

// Check if stream is parallel
boolean isParallel = numbers.parallelStream().isParallel();
// true

// Convert parallel back to sequential
long count3 = numbers.parallelStream()
    .sequential()  // Now sequential
    .filter(n -> n > 5)
    .count();

// ForkJoinPool info
System.out.println("Parallelism: " +
    ForkJoinPool.commonPool().getParallelism());
// Usually equals Runtime.getRuntime().availableProcessors() - 1`
        },
        {
          name: 'When to Use Parallel',
          explanation: 'Parallel streams have overhead from thread management and data splitting. They work best with: large datasets (10,000+ elements), CPU-intensive operations, independent operations (no shared state), and data structures that split well (ArrayList, arrays). Avoid for I/O operations, small datasets, or operations with side effects.',
          codeExample: `// GOOD candidates for parallel streams:

// 1. Large dataset with CPU-intensive work
List<BigInteger> numbers = generateLargeList();
long count = numbers.parallelStream()
    .filter(n -> n.isProbablePrime(10))
    .count();

// 2. Array-based sources (split efficiently)
int[] array = new int[1_000_000];
long sum = Arrays.stream(array)
    .parallel()
    .sum();

// BAD candidates - avoid parallel:

// 1. Small datasets (overhead > benefit)
List<Integer> small = Arrays.asList(1, 2, 3);
// Use sequential!

// 2. I/O operations (threads block)
// files.parallelStream().forEach(this::writeToFile);  // BAD!

// 3. LinkedList (splits poorly)
LinkedList<Integer> linked = new LinkedList<>();
// linked.parallelStream()...  // Inefficient!

// 4. Operations with order requirements
// Use forEachOrdered() if order matters
numbers.parallelStream()
    .forEachOrdered(System.out::println);  // Preserves order`
        },
        {
          name: 'Thread Safety',
          explanation: 'Parallel streams require thread-safe operations. Avoid modifying shared state, use thread-safe collectors, and be careful with stateful operations. Non-interference with source data is critical.',
          codeExample: `// WRONG: Modifying shared state (race condition!)
List<Integer> results = new ArrayList<>();
numbers.parallelStream()
    .filter(n -> n > 5)
    .forEach(results::add);  // NOT THREAD-SAFE!

// CORRECT: Use collect() instead
List<Integer> safeResults = numbers.parallelStream()
    .filter(n -> n > 5)
    .collect(Collectors.toList());  // Thread-safe

// CORRECT: Use thread-safe collection
List<Integer> syncResults = Collections.synchronizedList(new ArrayList<>());
numbers.parallelStream()
    .filter(n -> n > 5)
    .forEach(syncResults::add);

// WRONG: Stateful lambda
Set<Integer> seen = new HashSet<>();
numbers.parallelStream()
    .filter(n -> seen.add(n))  // NOT THREAD-SAFE!
    .count();

// CORRECT: Use distinct() instead
numbers.parallelStream()
    .distinct()  // Handles thread-safety internally
    .count();

// Atomic operations for counters
AtomicLong counter = new AtomicLong();
numbers.parallelStream()
    .forEach(n -> counter.incrementAndGet());`
        },
        {
          name: 'Custom Thread Pool',
          explanation: 'By default, parallel streams use ForkJoinPool.commonPool() which is shared across the JVM. For isolation or different parallelism levels, submit to a custom ForkJoinPool.',
          codeExample: `// Default: uses common pool
numbers.parallelStream()
    .forEach(n -> System.out.println(
        Thread.currentThread().getName()));

// Custom ForkJoinPool for isolation
ForkJoinPool customPool = new ForkJoinPool(4);

try {
    List<Integer> result = customPool.submit(() ->
        numbers.parallelStream()
            .filter(n -> n > 5)
            .map(n -> n * 2)
            .collect(Collectors.toList())
    ).get();  // blocking call
} finally {
    customPool.shutdown();
}

// Why use custom pool?
// 1. Isolate from other parallel operations
// 2. Control parallelism level
// 3. Avoid blocking common pool with I/O

// Configure common pool parallelism (JVM startup)
// -Djava.util.concurrent.ForkJoinPool.common.parallelism=8

// Get current parallelism
int parallelism = ForkJoinPool.commonPool().getParallelism();`
        },
        {
          name: 'Performance Considerations',
          explanation: 'Parallel streams are not always faster. Consider: data size, operation complexity, source splitting cost, and result combining cost. Benchmark with real data before assuming parallel is better.',
          codeExample: `// Benchmark: Sequential vs Parallel
List<Integer> data = IntStream.range(0, 10_000_000)
    .boxed()
    .collect(Collectors.toList());

// Sequential
long start1 = System.nanoTime();
long result1 = data.stream()
    .filter(n -> n % 2 == 0)
    .mapToLong(n -> n * n)
    .sum();
long time1 = System.nanoTime() - start1;

// Parallel
long start2 = System.nanoTime();
long result2 = data.parallelStream()
    .filter(n -> n % 2 == 0)
    .mapToLong(n -> n * n)
    .sum();
long time2 = System.nanoTime() - start2;

System.out.printf("Sequential: %d ms%n", time1 / 1_000_000);
System.out.printf("Parallel: %d ms%n", time2 / 1_000_000);

// Rules of thumb:
// - ArrayList: Good for parallel (O(1) split)
// - LinkedList: Poor for parallel (O(n) split)
// - HashSet: Moderate (depends on hash distribution)
// - TreeSet: Good for parallel (balanced tree split)

// Use primitive streams for better performance
long sum = IntStream.range(0, 1_000_000)
    .parallel()
    .sum();  // No boxing overhead`
        }
      ]
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      icon: '✅',
      color: '#06b6d4',
      description: 'Learn stream best practices, common pitfalls, and performance optimization techniques.',
      details: [
        {
          name: 'Readability Guidelines',
          explanation: 'Keep streams readable by limiting chain length, using meaningful variable names for complex lambdas, and breaking into multiple statements when needed. Streams should enhance readability, not obscure logic.',
          codeExample: `// GOOD: Clear, readable stream
List<String> activeUserEmails = users.stream()
    .filter(User::isActive)
    .map(User::getEmail)
    .sorted()
    .collect(Collectors.toList());

// BAD: Too much in one chain
List<String> bad = users.stream()
    .filter(u -> u.getAge() > 18 && u.isActive() &&
            u.getSubscription() != null &&
            u.getSubscription().isValid())
    .map(u -> u.getName().toUpperCase() + " <" +
            u.getEmail() + ">")
    .collect(Collectors.toList());

// BETTER: Extract predicates and functions
Predicate<User> isEligible = u ->
    u.getAge() > 18 &&
    u.isActive() &&
    Optional.ofNullable(u.getSubscription())
            .map(Subscription::isValid)
            .orElse(false);

Function<User, String> formatUser = u ->
    String.format("%s <%s>",
        u.getName().toUpperCase(),
        u.getEmail());

List<String> better = users.stream()
    .filter(isEligible)
    .map(formatUser)
    .collect(Collectors.toList());

// Consider: When stream is complex, a loop might be clearer`
        },
        {
          name: 'Avoid Common Pitfalls',
          explanation: 'Avoid these common mistakes: modifying source during iteration, using streams for simple operations, ignoring Optional properly, performing side effects in intermediate operations, and using parallel without benchmarking.',
          codeExample: `// PITFALL 1: Modifying source collection
List<String> list = new ArrayList<>(Arrays.asList("a", "b", "c"));
// DON'T DO THIS - ConcurrentModificationException risk
// list.stream().forEach(list::remove);

// PITFALL 2: Using stream for simple iteration
// Overkill:
names.stream().forEach(System.out::println);
// Better:
names.forEach(System.out::println);

// PITFALL 3: Ignoring Optional
// Bad:
String result = optional.get();  // Throws if empty!
// Good:
String safe = optional.orElse("default");
String computed = optional.orElseGet(() -> computeDefault());
optional.ifPresent(System.out::println);

// PITFALL 4: Side effects in intermediate operations
// Bad:
list.stream()
    .peek(item -> externalList.add(item))  // Side effect!
    .count();
// Good:
list.stream().forEach(externalList::add);

// PITFALL 5: Assuming parallel is faster
// Always benchmark! Small lists are often faster sequential

// PITFALL 6: Stream reuse
Stream<String> stream = names.stream();
stream.count();
// stream.count();  // IllegalStateException - already consumed!`
        },
        {
          name: 'Performance Tips',
          explanation: 'Optimize stream performance by: using primitive streams (IntStream, etc.) to avoid boxing, placing filter before map, using short-circuiting operations when possible, and choosing the right data structure for parallel streams.',
          codeExample: `// TIP 1: Use primitive streams
// Bad (boxing overhead):
int sum1 = numbers.stream()
    .map(n -> n * 2)
    .reduce(0, Integer::sum);

// Good (no boxing):
int sum2 = numbers.stream()
    .mapToInt(n -> n * 2)
    .sum();

// TIP 2: Filter early, map late
// Bad (maps all, then filters):
long count1 = items.stream()
    .map(this::expensiveTransform)
    .filter(this::isValid)
    .count();

// Good (filters first, fewer transforms):
long count2 = items.stream()
    .filter(this::isValidSource)
    .map(this::expensiveTransform)
    .count();

// TIP 3: Use short-circuiting operations
// findFirst, findAny, anyMatch, allMatch, noneMatch, limit

// Bad (processes entire stream):
boolean hasNegative = numbers.stream()
    .filter(n -> n < 0)
    .count() > 0;

// Good (stops at first match):
boolean hasNegative2 = numbers.stream()
    .anyMatch(n -> n < 0);

// TIP 4: Avoid unnecessary operations
// Bad:
list.stream()
    .sorted()
    .filter(x -> true)  // Useless filter
    .collect(Collectors.toList());

// TIP 5: Use method references when possible
// Lambda: n -> n.toString()
// Method reference: Object::toString  // Slightly more efficient`
        },
        {
          name: 'Optional Best Practices',
          explanation: 'Optional is designed for return types, not method parameters or fields. Use it to clearly indicate that a value may be absent and force callers to handle that case.',
          codeExample: `// GOOD uses of Optional

// 1. Return type for possibly absent value
public Optional<User> findUserById(Long id) {
    return Optional.ofNullable(userRepository.find(id));
}

// 2. Chaining with map/flatMap
String city = user.getAddress()
    .map(Address::getCity)
    .orElse("Unknown");

// 3. Providing defaults
String name = Optional.ofNullable(user.getName())
    .orElse("Anonymous");

// 4. Conditional execution
findUserById(id).ifPresent(this::sendEmail);

// 5. Using or() for fallback (Java 9+)
Optional<User> user = findInCache(id)
    .or(() -> findInDatabase(id))
    .or(() -> findInBackup(id));

// BAD uses - avoid these:

// 1. As method parameter (use overloading instead)
// void process(Optional<Config> config)  // BAD

// 2. As field
// class User { Optional<Address> address; }  // BAD

// 3. With collections (use empty collection)
// Optional<List<User>> users  // BAD - use empty list

// 4. Calling get() without checking
// optional.get()  // BAD - use orElse/orElseGet

// 5. Using isPresent() + get() pattern
// if (opt.isPresent()) { opt.get() }  // BAD
// Better: opt.ifPresent(value -> ...)`
        },
        {
          name: 'Debugging Streams',
          explanation: 'Debug streams using peek() for logging, break complex pipelines into steps, use IDE debuggers with stream support, and convert to lists at intermediate steps when investigating issues.',
          codeExample: `// Method 1: Using peek() for debugging
List<Integer> result = numbers.stream()
    .filter(n -> {
        System.out.println("Filtering: " + n);
        return n > 5;
    })
    .peek(n -> System.out.println("After filter: " + n))
    .map(n -> n * 2)
    .peek(n -> System.out.println("After map: " + n))
    .collect(Collectors.toList());

// Method 2: Break into steps
Stream<Integer> filtered = numbers.stream()
    .filter(n -> n > 5);
// Inspect 'filtered' in debugger

List<Integer> intermediate = filtered
    .collect(Collectors.toList());
System.out.println("After filter: " + intermediate);

List<Integer> final = intermediate.stream()
    .map(n -> n * 2)
    .collect(Collectors.toList());

// Method 3: Custom debugging collector
public static <T> Collector<T, ?, List<T>> toListWithLogging() {
    return Collector.of(
        ArrayList::new,
        (list, item) -> {
            System.out.println("Adding: " + item);
            list.add(item);
        },
        (left, right) -> {
            left.addAll(right);
            return left;
        }
    );
}

// Method 4: IDE Stream Debugger
// IntelliJ: Set breakpoint, click "Trace Current Stream Chain"
// Shows each step's input/output visually`
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
      { name: 'Streams API', icon: '🌊', page: 'Streams' }
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

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Java Streams API</h1>
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
          ← Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={STREAMS_COLORS}
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
              colors={STREAMS_COLORS}
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

export default Streams

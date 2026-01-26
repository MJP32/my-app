/**
 * ConcurrentHashMap Internals - Tab Template Format
 *
 * Deep dive into Java's thread-safe high-performance Map implementation
 * Restructured to use modal-based navigation with concepts and details
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const CONCURRENT_HASHMAP_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
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
// SVG DIAGRAM COMPONENTS
// =============================================================================

const LockFreeReadsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="chm-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Lock-Free Read Operations
    </text>

    {/* Thread boxes */}
    <rect x="50" y="50" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread 1</text>
    <text x="100" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">get(key)</text>

    <rect x="200" y="50" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="250" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread 2</text>
    <text x="250" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">get(key)</text>

    <rect x="350" y="50" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread 3</text>
    <text x="400" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">get(key)</text>

    <rect x="500" y="50" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="550" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread 4</text>
    <text x="550" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">get(key)</text>

    {/* Arrows to table */}
    <line x1="100" y1="105" x2="100" y2="140" stroke="#4ade80" strokeWidth="2" markerEnd="url(#chm-arrow)"/>
    <line x1="250" y1="105" x2="250" y2="140" stroke="#4ade80" strokeWidth="2" markerEnd="url(#chm-arrow)"/>
    <line x1="400" y1="105" x2="400" y2="140" stroke="#4ade80" strokeWidth="2" markerEnd="url(#chm-arrow)"/>
    <line x1="550" y1="105" x2="550" y2="140" stroke="#4ade80" strokeWidth="2" markerEnd="url(#chm-arrow)"/>

    {/* Table */}
    <rect x="50" y="150" width="600" height="50" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="180" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">
      ConcurrentHashMap (volatile reads - NO LOCKS!)
    </text>

    {/* No lock indicators */}
    <text x="700" y="75" textAnchor="middle" fill="#22c55e" fontSize="10">All threads</text>
    <text x="700" y="90" textAnchor="middle" fill="#22c55e" fontSize="10">read</text>
    <text x="700" y="105" textAnchor="middle" fill="#22c55e" fontSize="10">simultaneously</text>
  </svg>
)

const CASOperationDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="cas-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Compare-And-Swap (CAS) Operation
    </text>

    {/* Step 1: Read current value */}
    <rect x="50" y="50" width="200" height="60" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Step 1: Read Current</text>
    <text x="150" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">expected = read(bucket)</text>

    {/* Arrow */}
    <line x1="250" y1="80" x2="290" y2="80" stroke="#4ade80" strokeWidth="2" markerEnd="url(#cas-arrow)"/>

    {/* Step 2: Prepare new value */}
    <rect x="300" y="50" width="200" height="60" rx="8" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Step 2: Prepare New</text>
    <text x="400" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">newValue = new Node()</text>

    {/* Arrow */}
    <line x1="500" y1="80" x2="540" y2="80" stroke="#4ade80" strokeWidth="2" markerEnd="url(#cas-arrow)"/>

    {/* Step 3: CAS */}
    <rect x="550" y="50" width="200" height="60" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Step 3: Atomic CAS</text>
    <text x="650" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">CAS(expected, newValue)</text>

    {/* Success/Failure branches */}
    <line x1="650" y1="110" x2="550" y2="160" stroke="#22c55e" strokeWidth="2" markerEnd="url(#cas-arrow)"/>
    <line x1="650" y1="110" x2="750" y2="160" stroke="#ef4444" strokeWidth="2" markerEnd="url(#cas-arrow)"/>

    {/* Success box */}
    <rect x="450" y="170" width="150" height="50" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="525" y="195" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">SUCCESS</text>
    <text x="525" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9">Value updated atomically</text>

    {/* Failure box */}
    <rect x="650" y="170" width="150" height="50" rx="8" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="725" y="195" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">RETRY</text>
    <text x="725" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9">Another thread changed it</text>

    {/* Retry arrow */}
    <path d="M 725 230 Q 725 260 150 260 Q 50 260 50 110" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="5,5" markerEnd="url(#cas-arrow)"/>
    <text x="400" y="255" textAnchor="middle" fill="#fbbf24" fontSize="9">Retry from Step 1</text>
  </svg>
)

const SegmentsDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="seg-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Java 8+ Node Array with Per-Bucket Locking
    </text>

    {/* Table array */}
    <text x="50" y="55" fill="#94a3b8" fontSize="10">table[]</text>
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <g key={i}>
        <rect x={80 + i * 85} y="40" width="75" height="35" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
        <text x={117 + i * 85} y="62" textAnchor="middle" fill="#4ade80" fontSize="10">[{i}]</text>
      </g>
    ))}

    {/* Bucket 0 - Linked list */}
    <line x1="117" y1="75" x2="117" y2="100" stroke="#4ade80" strokeWidth="1" markerEnd="url(#seg-arrow)"/>
    <rect x="92" y="105" width="50" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="117" y="125" textAnchor="middle" fill="white" fontSize="8">Node</text>
    <line x1="117" y1="135" x2="117" y2="150" stroke="#60a5fa" strokeWidth="1" markerEnd="url(#seg-arrow)"/>
    <rect x="92" y="155" width="50" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="117" y="175" textAnchor="middle" fill="white" fontSize="8">Node</text>

    {/* Bucket 2 - Empty with CAS */}
    <line x1="287" y1="75" x2="287" y2="100" stroke="#4ade80" strokeWidth="1" markerEnd="url(#seg-arrow)"/>
    <rect x="247" y="105" width="80" height="30" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="287" y="125" textAnchor="middle" fill="#fbbf24" fontSize="8">CAS Insert</text>
    <text x="287" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">(No Lock!)</text>

    {/* Bucket 4 - Synchronized */}
    <line x1="457" y1="75" x2="457" y2="100" stroke="#4ade80" strokeWidth="1" markerEnd="url(#seg-arrow)"/>
    <rect x="422" y="105" width="70" height="30" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="457" y="125" textAnchor="middle" fill="#a78bfa" fontSize="8">sync(f)</text>
    <line x1="457" y1="135" x2="457" y2="150" stroke="#a78bfa" strokeWidth="1" markerEnd="url(#seg-arrow)"/>
    <rect x="432" y="155" width="50" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="457" y="175" textAnchor="middle" fill="white" fontSize="8">Node</text>

    {/* Bucket 6 - TreeBin */}
    <line x1="627" y1="75" x2="627" y2="100" stroke="#4ade80" strokeWidth="1" markerEnd="url(#seg-arrow)"/>
    <rect x="587" y="105" width="80" height="30" rx="4" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="627" y="125" textAnchor="middle" fill="#f472b6" fontSize="8">TreeBin</text>
    {/* Tree structure */}
    <line x1="627" y1="135" x2="627" y2="155" stroke="#ec4899" strokeWidth="1"/>
    <circle cx="627" cy="165" r="12" fill="#ec4899" stroke="#f472b6" strokeWidth="1"/>
    <text x="627" y="169" textAnchor="middle" fill="white" fontSize="8">R</text>
    <line x1="615" y1="177" x2="597" y2="200" stroke="#ec4899" strokeWidth="1"/>
    <line x1="639" y1="177" x2="657" y2="200" stroke="#ec4899" strokeWidth="1"/>
    <circle cx="597" cy="210" r="10" fill="#be185d" stroke="#f472b6" strokeWidth="1"/>
    <circle cx="657" cy="210" r="10" fill="#be185d" stroke="#f472b6" strokeWidth="1"/>
    <text x="597" y="214" textAnchor="middle" fill="white" fontSize="7">L</text>
    <text x="657" y="214" textAnchor="middle" fill="white" fontSize="7">R</text>

    {/* Legend */}
    <rect x="50" y="240" width="15" height="15" rx="2" fill="#3b82f6"/>
    <text x="75" y="252" fill="#94a3b8" fontSize="9">Linked List Node</text>

    <rect x="200" y="240" width="15" height="15" rx="2" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b"/>
    <text x="225" y="252" fill="#94a3b8" fontSize="9">CAS (Empty Bucket)</text>

    <rect x="380" y="240" width="15" height="15" rx="2" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="405" y="252" fill="#94a3b8" fontSize="9">Synchronized</text>

    <rect x="520" y="240" width="15" height="15" rx="2" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899"/>
    <text x="545" y="252" fill="#94a3b8" fontSize="9">{`TreeBin (>=8 nodes)`}</text>
  </svg>
)

const DistributedCountersDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="cnt-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Distributed Size Counting (LongAdder-like)
    </text>

    {/* baseCount */}
    <rect x="320" y="45" width="160" height="45" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">baseCount</text>
    <text x="400" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">Try CAS here first</text>

    {/* Arrow down */}
    <line x1="400" y1="90" x2="400" y2="115" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#cnt-arrow)"/>
    <text x="480" y="108" fill="#fbbf24" fontSize="9">If CAS fails</text>

    {/* counterCells array */}
    <rect x="100" y="125" width="600" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="145" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">counterCells[]</text>

    {/* Individual cells */}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <g key={i}>
        <rect x={120 + i * 70} y="155" width="50" height="25" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
        <text x={145 + i * 70} y="172" textAnchor="middle" fill="#a78bfa" fontSize="8">C{i}</text>
      </g>
    ))}

    {/* Threads */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <line x1={185 + i * 140} y1="180" x2={185 + i * 140} y2="205" stroke="#4ade80" strokeWidth="1" markerEnd="url(#cnt-arrow)"/>
        <rect x={155 + i * 140} y="210" width="60" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
        <text x={185 + i * 140} y="227" textAnchor="middle" fill="white" fontSize="8">Thread {i + 1}</text>
      </g>
    ))}

    {/* Formula */}
    <text x="700" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">size() =</text>
    <text x="700" y="165" textAnchor="middle" fill="#4ade80" fontSize="10">baseCount +</text>
    <text x="700" y="180" textAnchor="middle" fill="#a78bfa" fontSize="10">sum(cells)</text>
  </svg>
)

const ResizingDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="rsz-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Concurrent Resizing with ForwardingNode
    </text>

    {/* Old table */}
    <text x="100" y="55" textAnchor="middle" fill="#94a3b8" fontSize="10">Old table[]</text>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={40 + i * 80} y="65" width="70" height="35" rx="4"
          fill={i === 1 || i === 3 ? "rgba(245, 158, 11, 0.3)" : "rgba(34, 197, 94, 0.2)"}
          stroke={i === 1 || i === 3 ? "#f59e0b" : "#22c55e"} strokeWidth="1"/>
        <text x={75 + i * 80} y="87" textAnchor="middle"
          fill={i === 1 || i === 3 ? "#fbbf24" : "#4ade80"} fontSize="9">
          {i === 1 || i === 3 ? "FWD" : `[${i}]`}
        </text>
      </g>
    ))}

    {/* ForwardingNode arrow */}
    <line x1="155" y1="100" x2="155" y2="135" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#rsz-arrow)"/>
    <line x1="315" y1="100" x2="315" y2="135" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#rsz-arrow)"/>

    {/* New table */}
    <text x="400" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">New table[] (2x size)</text>
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <g key={i}>
        <rect x={40 + i * 90} y="165" width="80" height="35" rx="4"
          fill={i === 1 || i === 5 ? "rgba(59, 130, 246, 0.3)" : "rgba(34, 197, 94, 0.1)"}
          stroke={i === 1 || i === 5 ? "#3b82f6" : "rgba(34, 197, 94, 0.3)"} strokeWidth="1"/>
        <text x={80 + i * 90} y="187" textAnchor="middle"
          fill={i === 1 || i === 5 ? "#60a5fa" : "#4ade80"} fontSize="9">
          [{i}]
        </text>
      </g>
    ))}

    {/* Helpers */}
    <rect x="50" y="220" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="100" y="245" textAnchor="middle" fill="white" fontSize="9">Helper Thread 1</text>

    <rect x="200" y="220" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="250" y="245" textAnchor="middle" fill="white" fontSize="9">Helper Thread 2</text>

    <rect x="350" y="220" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="400" y="245" textAnchor="middle" fill="white" fontSize="9">Helper Thread 3</text>

    {/* Legend */}
    <rect x="520" y="220" width="15" height="15" rx="2" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b"/>
    <text x="545" y="232" fill="#94a3b8" fontSize="9">ForwardingNode</text>

    <rect x="650" y="220" width="15" height="15" rx="2" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="675" y="232" fill="#94a3b8" fontSize="9">Transferred</text>
  </svg>
)

const ComparisonDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Map Implementation Comparison
    </text>

    {/* HashMap */}
    <rect x="30" y="45" width="170" height="80" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="115" y="70" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">HashMap</text>
    <text x="115" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">No locks</text>
    <text x="115" y="105" textAnchor="middle" fill="#f87171" fontSize="9">NOT THREAD-SAFE</text>
    <text x="115" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Fastest single-thread</text>

    {/* Hashtable */}
    <rect x="220" y="45" width="170" height="80" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="305" y="70" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Hashtable</text>
    <text x="305" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">Global lock</text>
    <text x="305" y="105" textAnchor="middle" fill="#fbbf24" fontSize="9">One thread at a time</text>
    <text x="305" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Poor concurrency</text>

    {/* synchronizedMap */}
    <rect x="410" y="45" width="170" height="80" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="495" y="70" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">synchronizedMap</text>
    <text x="495" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">Global lock</text>
    <text x="495" y="105" textAnchor="middle" fill="#fbbf24" fontSize="9">Same as Hashtable</text>
    <text x="495" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Poor concurrency</text>

    {/* ConcurrentHashMap */}
    <rect x="600" y="45" width="170" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="685" y="70" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">ConcurrentHashMap</text>
    <text x="685" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">Per-bucket locks + CAS</text>
    <text x="685" y="105" textAnchor="middle" fill="#4ade80" fontSize="9">High concurrency</text>
    <text x="685" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Lock-free reads</text>

    {/* Performance bars */}
    <text x="50" y="160" fill="#94a3b8" fontSize="10">Concurrent Performance:</text>

    <rect x="30" y="170" width="170" height="15" rx="3" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444"/>
    <text x="115" y="182" textAnchor="middle" fill="#f87171" fontSize="8">N/A (broken)</text>

    <rect x="220" y="170" width="170" height="15" rx="3" fill="rgba(245, 158, 11, 0.1)"/>
    <rect x="220" y="170" width="35" height="15" rx="3" fill="#f59e0b"/>
    <text x="305" y="182" textAnchor="middle" fill="#fbbf24" fontSize="8">~20%</text>

    <rect x="410" y="170" width="170" height="15" rx="3" fill="rgba(245, 158, 11, 0.1)"/>
    <rect x="410" y="170" width="35" height="15" rx="3" fill="#f59e0b"/>
    <text x="495" y="182" textAnchor="middle" fill="#fbbf24" fontSize="8">~20%</text>

    <rect x="600" y="170" width="170" height="15" rx="3" fill="rgba(34, 197, 94, 0.1)"/>
    <rect x="600" y="170" width="150" height="15" rx="3" fill="#22c55e"/>
    <text x="685" y="182" textAnchor="middle" fill="#4ade80" fontSize="8">~90%</text>
  </svg>
)

const AtomicOperationsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="atom-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Atomic Compound Operations
    </text>

    {/* Wrong way */}
    <rect x="30" y="45" width="350" height="70" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="205" y="65" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Race Condition (WRONG)</text>
    <text x="205" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">if (!map.containsKey(k)) map.put(k, v);</text>
    <text x="205" y="105" textAnchor="middle" fill="#f87171" fontSize="9">Gap between check and put!</text>

    {/* Right way */}
    <rect x="420" y="45" width="350" height="70" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="595" y="65" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Atomic (CORRECT)</text>
    <text x="595" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">map.putIfAbsent(key, value);</text>
    <text x="595" y="105" textAnchor="middle" fill="#4ade80" fontSize="9">Single atomic operation!</text>

    {/* Available operations */}
    <text x="400" y="145" textAnchor="middle" fill="#94a3b8" fontSize="11">Atomic Operations Available:</text>

    <rect x="50" y="160" width="100" height="25" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6"/>
    <text x="100" y="177" textAnchor="middle" fill="#60a5fa" fontSize="9">putIfAbsent</text>

    <rect x="170" y="160" width="100" height="25" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6"/>
    <text x="220" y="177" textAnchor="middle" fill="#a78bfa" fontSize="9">replace</text>

    <rect x="290" y="160" width="100" height="25" rx="4" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899"/>
    <text x="340" y="177" textAnchor="middle" fill="#f472b6" fontSize="9">remove(k,v)</text>

    <rect x="410" y="160" width="120" height="25" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b"/>
    <text x="470" y="177" textAnchor="middle" fill="#fbbf24" fontSize="9">computeIfAbsent</text>

    <rect x="550" y="160" width="120" height="25" rx="4" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4"/>
    <text x="610" y="177" textAnchor="middle" fill="#22d3ee" fontSize="9">computeIfPresent</text>

    <rect x="690" y="160" width="80" height="25" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e"/>
    <text x="730" y="177" textAnchor="middle" fill="#4ade80" fontSize="9">merge</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function ConcurrentHashMapInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'why-chm',
      name: 'Why ConcurrentHashMap?',
      icon: '\u26A1',
      color: '#f59e0b',
      description: 'Understanding the problems with alternatives and why ConcurrentHashMap is the best choice for concurrent access.',
      diagram: ComparisonDiagram,
      details: [
        {
          name: 'HashMap Problems',
          diagram: ComparisonDiagram,
          explanation: 'HashMap is NOT thread-safe at all. Concurrent modifications can cause infinite loops, data corruption, or lost updates. Never use HashMap in multi-threaded code without external synchronization.',
          codeExample: `// HashMap - NOT thread-safe (DO NOT USE in concurrent code)
Map<String, Integer> hashMap = new HashMap<>();

// Thread 1                    // Thread 2
hashMap.put("A", 1);           hashMap.put("B", 2);
// DANGER: Possible infinite loop during resize!
// DANGER: Data corruption possible!
// DANGER: Lost updates!

// This is UNDEFINED BEHAVIOR in concurrent context`
        },
        {
          name: 'Hashtable & synchronizedMap',
          explanation: 'Hashtable and Collections.synchronizedMap() use a global lock on every operation. Only ONE thread can access the map at a time, creating a severe bottleneck. Performance drops to ~15-25% of HashMap under contention.',
          codeExample: `// Hashtable - Thread-safe but SLOW (global lock)
Map<String, Integer> hashtable = new Hashtable<>();
// synchronized on EVERY operation - one thread at a time

// synchronizedMap - Same problem as Hashtable
Map<String, Integer> syncMap = Collections.synchronizedMap(new HashMap<>());
// Still uses global lock

// Performance comparison (approximate):
// HashMap:           100% (but not thread-safe)
// Hashtable:         15-25% of HashMap
// synchronizedMap:   15-25% of HashMap
// ConcurrentHashMap: 80-95% of HashMap (with multiple threads)`
        },
        {
          name: 'ConcurrentHashMap Advantages',
          diagram: LockFreeReadsDiagram,
          explanation: 'ConcurrentHashMap provides: (1) Lock-free reads using volatile + CAS, (2) Fine-grained locking for writes (per-bucket), (3) Allows concurrent reads AND writes, (4) Weakly consistent iterators that never throw ConcurrentModificationException.',
          codeExample: `// ConcurrentHashMap - Thread-safe AND FAST
ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();

// Multiple threads can read simultaneously (NO LOCKS)
// Thread 1: map.get("A")  // Lock-free!
// Thread 2: map.get("B")  // Lock-free!
// Thread 3: map.get("C")  // Lock-free!

// Writes only lock the specific bucket being modified
// Thread 4: map.put("D", 4)  // Only locks bucket for "D"
// Thread 5: map.put("E", 5)  // Can write to different bucket simultaneously!`
        }
      ]
    },
    {
      id: 'evolution',
      name: 'Evolution: Java 7 vs 8+',
      icon: '\uD83D\uDD00',
      color: '#3b82f6',
      description: 'How ConcurrentHashMap implementation changed dramatically from segment-based (Java 7) to node-based with CAS (Java 8+).',
      details: [
        {
          name: 'Java 7 Segments',
          explanation: 'Java 7 used an array of Segments, each with its own ReentrantLock. Default 16 segments meant maximum 16 concurrent writers. Each Segment was like a mini-HashMap with its own hash table.',
          codeExample: `// Java 7 Structure (Segment-based)
class ConcurrentHashMap_Java7<K,V> {
    final Segment<K,V>[] segments;  // Default 16 segments

    static class Segment<K,V> extends ReentrantLock {
        transient volatile HashEntry<K,V>[] table;
        transient int count;
    }

    // Concurrency level = number of segments
    // Max 16 concurrent writers by default
    // Each segment has its own lock
}`
        },
        {
          name: 'Java 8+ Nodes',
          diagram: SegmentsDiagram,
          explanation: 'Java 8+ removed Segments entirely. Uses a single Node array with per-bucket locking via synchronized blocks and CAS operations. Better scalability as lock granularity equals table size, not a fixed concurrency level.',
          codeExample: `// Java 8+ Structure (Node-based)
class ConcurrentHashMap_Java8<K,V> {
    transient volatile Node<K,V>[] table;  // Single array
    // No segments! Lock per bucket using synchronized + CAS

    // Node structure (similar to HashMap)
    static class Node<K,V> {
        final int hash;
        final K key;
        volatile V val;      // volatile for visibility
        volatile Node<K,V> next;
    }

    // Lock granularity = table.length (thousands possible!)
    // vs Java 7's fixed 16 segments
}`
        },
        {
          name: 'TreeBin for Long Chains',
          explanation: 'Like HashMap in Java 8, ConcurrentHashMap converts linked lists to red-black trees when chain length reaches 8 (TREEIFY_THRESHOLD). This guarantees O(log n) worst-case lookup instead of O(n).',
          codeExample: `// TreeNode for long chains (threshold = 8)
static final class TreeNode<K,V> extends Node<K,V> {
    TreeNode<K,V> parent;
    TreeNode<K,V> left;
    TreeNode<K,V> right;
    TreeNode<K,V> prev;  // For traversal
    boolean red;
}

// Constants
static final int TREEIFY_THRESHOLD = 8;   // Convert to tree
static final int UNTREEIFY_THRESHOLD = 6; // Convert back to list
static final int MIN_TREEIFY_CAPACITY = 64; // Min table size for tree`
        }
      ]
    },
    {
      id: 'data-structure',
      name: 'Internal Data Structure',
      icon: '\uD83D\uDCE6',
      color: '#8b5cf6',
      description: 'Understanding the Node array, special node types (TreeNode, ForwardingNode, ReservationNode), and key fields.',
      diagram: SegmentsDiagram,
      details: [
        {
          name: 'Node Types',
          diagram: SegmentsDiagram,
          explanation: 'Four node types exist: (1) Node - regular linked list node, (2) TreeNode - red-black tree node when chain >= 8, (3) ForwardingNode - indicates bucket being transferred during resize (hash = MOVED = -1), (4) ReservationNode - placeholder during computeIfAbsent.',
          codeExample: `// Node types identified by hash value
static final int MOVED     = -1; // ForwardingNode (bucket moved)
static final int TREEBIN   = -2; // TreeBin root node
static final int RESERVED  = -3; // ReservationNode (compute in progress)

// Regular Node
static class Node<K,V> {
    final int hash;        // >= 0 for regular nodes
    final K key;
    volatile V val;
    volatile Node<K,V> next;
}

// ForwardingNode - points to nextTable during resize
static final class ForwardingNode<K,V> extends Node<K,V> {
    final Node<K,V>[] nextTable;
    ForwardingNode(Node<K,V>[] tab) {
        super(MOVED, null, null, null);  // hash = -1
        this.nextTable = tab;
    }
}`
        },
        {
          name: 'Key Fields',
          explanation: 'Critical fields: table (main Node array, volatile), nextTable (destination during resize), sizeCtl (controls init/resize: -1 means initializing, negative means resizing, positive is next threshold), baseCount + counterCells for distributed size counting.',
          codeExample: `public class ConcurrentHashMap<K,V> {
    // Main array - volatile for visibility
    transient volatile Node<K,V>[] table;

    // Next table during resize
    private transient volatile Node<K,V>[] nextTable;

    // Size control:
    // -1: initializing
    // -(1 + number of resizing threads): resizing
    // 0: default, use DEFAULT_CAPACITY
    // >0: next resize threshold
    private transient volatile int sizeCtl;

    // Distributed size tracking
    private transient volatile long baseCount;
    private transient volatile CounterCell[] counterCells;
}`
        },
        {
          name: 'Hash Spread Function',
          explanation: 'The spread() function ensures better distribution by using both high and low bits of the hash. This prevents clustering when keys have poor hashCode() implementations. HASH_BITS mask ensures positive hash values.',
          codeExample: `// Hash spread function - uses both high and low bits
static final int HASH_BITS = 0x7fffffff;  // Mask for positive hash

static final int spread(int h) {
    return (h ^ (h >>> 16)) & HASH_BITS;
}

// Example:
// Original hash:  0x12345678
// h >>> 16:       0x00001234
// XOR result:     0x1234444C
// & HASH_BITS:    0x1234444C (ensures positive)

// This distributes keys better across buckets
// Index = spread(hash) & (table.length - 1)`
        }
      ]
    },
    {
      id: 'get-operation',
      name: 'get() - Lock-Free Reads',
      icon: '\u26A1',
      color: '#22c55e',
      description: 'The get() operation is completely lock-free, using volatile reads for thread-safety with maximum performance.',
      diagram: LockFreeReadsDiagram,
      details: [
        {
          name: 'Lock-Free Algorithm',
          diagram: LockFreeReadsDiagram,
          explanation: 'get() never acquires any lock. It uses volatile reads for the table reference, Node.val, and Node.next. The happens-before relationship from write operations ensures visibility. Multiple threads can read simultaneously with no contention.',
          codeExample: `public V get(Object key) {
    Node<K,V>[] tab; Node<K,V> e, p; int n, eh; K ek;

    // Spread hash to use high bits
    int h = spread(key.hashCode());

    // Volatile read of table
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (e = tabAt(tab, (n - 1) & h)) != null) {  // tabAt = volatile read

        // Check first node
        if ((eh = e.hash) == h) {
            if ((ek = e.key) == key || (ek != null && key.equals(ek)))
                return e.val;  // volatile read of val
        }
        // Negative hash = special node (tree or forwarding)
        else if (eh < 0)
            return (p = e.find(h, key)) != null ? p.val : null;

        // Traverse linked list
        while ((e = e.next) != null) {  // volatile read of next
            if (e.hash == h &&
                ((ek = e.key) == key || (ek != null && key.equals(ek))))
                return e.val;
        }
    }
    return null;
}`
        },
        {
          name: 'Volatile Array Access',
          explanation: 'tabAt() uses Unsafe.getObjectVolatile() for volatile semantics on array elements. Regular array access is not volatile even if the array reference is volatile. This ensures we always see the latest node at each bucket.',
          codeExample: `// Volatile array access using Unsafe
@SuppressWarnings("unchecked")
static final <K,V> Node<K,V> tabAt(Node<K,V>[] tab, int i) {
    return (Node<K,V>)U.getObjectVolatile(
        tab,
        ((long)i << ASHIFT) + ABASE
    );
}

// Why this matters:
// Even though 'table' is volatile, array ELEMENTS are not!
// table[i] would NOT give volatile semantics
// tabAt() ensures we see the latest value at index i

// Compare:
// table[i]         - NOT volatile read of element
// tabAt(table, i)  - IS volatile read of element`
        },
        {
          name: 'ForwardingNode Handling',
          explanation: 'When get() encounters a ForwardingNode (hash == MOVED == -1), it means a resize is in progress and this bucket has been transferred. The node\'s find() method forwards the search to nextTable automatically.',
          codeExample: `// In get() when eh < 0 (special node)
if (eh < 0)
    return (p = e.find(h, key)) != null ? p.val : null;

// ForwardingNode.find() forwards to nextTable
static final class ForwardingNode<K,V> extends Node<K,V> {
    final Node<K,V>[] nextTable;

    Node<K,V> find(int h, Object k) {
        outer: for (Node<K,V>[] tab = nextTable;;) {
            Node<K,V> e; int n;
            if (k == null || tab == null || (n = tab.length) == 0 ||
                (e = tabAt(tab, (n - 1) & h)) == null)
                return null;
            for (;;) {
                int eh; K ek;
                if ((eh = e.hash) == h &&
                    ((ek = e.key) == k || (ek != null && k.equals(ek))))
                    return e;
                if (eh < 0) {
                    if (e instanceof ForwardingNode) {
                        tab = ((ForwardingNode<K,V>)e).nextTable;
                        continue outer;  // Follow chain of forwards
                    }
                    else
                        return e.find(h, k);  // TreeBin
                }
                if ((e = e.next) == null)
                    return null;
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'put-operation',
      name: 'put() - CAS + Synchronized',
      icon: '\uD83D\uDD12',
      color: '#ec4899',
      description: 'The put() operation uses CAS for empty buckets (lock-free) and synchronized blocks for occupied buckets (fine-grained locking).',
      diagram: CASOperationDiagram,
      details: [
        {
          name: 'Empty Bucket: CAS',
          diagram: CASOperationDiagram,
          explanation: 'When a bucket is empty (null), put() uses Compare-And-Swap (CAS) to insert the new node atomically. No lock is needed! If CAS fails (another thread inserted first), the operation retries in a loop.',
          codeExample: `final V putVal(K key, V value, boolean onlyIfAbsent) {
    if (key == null || value == null) throw new NullPointerException();
    int hash = spread(key.hashCode());
    int binCount = 0;

    for (Node<K,V>[] tab = table;;) {
        Node<K,V> f; int n, i, fh;

        // Table not initialized - initialize it
        if (tab == null || (n = tab.length) == 0)
            tab = initTable();

        // EMPTY BUCKET - CAS to insert (NO LOCK!)
        else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
            if (casTabAt(tab, i, null,
                         new Node<K,V>(hash, key, value, null)))
                break;  // CAS succeeded, done!
            // CAS failed = another thread inserted, retry loop
        }
        // ... handle occupied bucket
    }
}`
        },
        {
          name: 'Occupied Bucket: synchronized',
          explanation: 'When a bucket has nodes, put() synchronizes on the first node (the head). This locks ONLY that specific bucket while allowing other buckets to be accessed freely. The double-check ensures the node hasn\'t changed.',
          codeExample: `// Continued from putVal...

        // Bucket has nodes - synchronized on first node
        else {
            V oldVal = null;
            synchronized (f) {  // Lock ONLY this bucket!
                if (tabAt(tab, i) == f) {  // Double-check still same node
                    if (fh >= 0) {  // Linked list (positive hash)
                        binCount = 1;
                        for (Node<K,V> e = f;; ++binCount) {
                            K ek;
                            // Found existing key - update
                            if (e.hash == hash &&
                                ((ek = e.key) == key ||
                                 (ek != null && key.equals(ek)))) {
                                oldVal = e.val;
                                if (!onlyIfAbsent)
                                    e.val = value;  // Update value
                                break;
                            }
                            // End of list - append new node
                            Node<K,V> pred = e;
                            if ((e = e.next) == null) {
                                pred.next = new Node<K,V>(hash, key, value, null);
                                break;
                            }
                        }
                    }
                    else if (f instanceof TreeBin) {  // Tree
                        // ... tree insertion
                    }
                }
            }
            // After sync block: check if need to treeify
            if (binCount >= TREEIFY_THRESHOLD)
                treeifyBin(tab, i);
        }`
        },
        {
          name: 'Resize Handling',
          explanation: 'If put() encounters a ForwardingNode (hash == MOVED), a resize is in progress. The thread helps with the resize via helpTransfer() before retrying its put operation. This spreads resize work across threads.',
          codeExample: `// In putVal loop...

        // Bucket being moved (resize in progress)
        else if ((fh = f.hash) == MOVED)
            tab = helpTransfer(tab, f);  // Help resize, then retry

// helpTransfer joins the resize effort
final Node<K,V>[] helpTransfer(Node<K,V>[] tab, Node<K,V> f) {
    Node<K,V>[] nextTab; int sc;
    if (tab != null && (f instanceof ForwardingNode) &&
        (nextTab = ((ForwardingNode<K,V>)f).nextTable) != null) {
        // ... coordinate with other threads
        // Each helper claims a chunk of buckets to transfer
        transfer(tab, nextTab);
    }
    return table;
}`
        }
      ]
    },
    {
      id: 'size-counting',
      name: 'Size Counting',
      icon: '\uD83D\uDCCA',
      color: '#06b6d4',
      description: 'Distributed counters (similar to LongAdder) provide scalable size tracking without a single contention point.',
      diagram: DistributedCountersDiagram,
      details: [
        {
          name: 'The Problem',
          explanation: 'A single size counter would be a severe bottleneck - every put/remove must update it. With millions of operations per second, CAS failures on a single counter would slow everything down.',
          codeExample: `// NAIVE approach (what we DON'T do):
class NaiveConcurrentMap {
    private AtomicLong size = new AtomicLong();

    void put(K key, V value) {
        // ... add to map
        size.incrementAndGet();  // BOTTLENECK!
        // Every thread contends on this single counter
    }
}

// With 16 threads doing 1M ops/sec each:
// - 16M CAS operations on single counter
// - Massive contention, CAS failures, retries
// - Performance tanks`
        },
        {
          name: 'Distributed Solution',
          diagram: DistributedCountersDiagram,
          explanation: 'ConcurrentHashMap uses baseCount + counterCells[] (like LongAdder). First, try CAS on baseCount. If contention detected, update a random counterCell instead. size() = baseCount + sum(counterCells). @Contended prevents false sharing.',
          codeExample: `// Size tracking fields
private transient volatile long baseCount;
private transient volatile CounterCell[] counterCells;

@sun.misc.Contended  // Prevent false sharing (padding)
static final class CounterCell {
    volatile long value;
    CounterCell(long x) { value = x; }
}

// Called after put/remove
private final void addCount(long x, int check) {
    CounterCell[] as; long b, s;

    // Try CAS on baseCount first
    if ((as = counterCells) != null ||
        !U.compareAndSwapLong(this, BASECOUNT, b = baseCount, s = b + x)) {

        // CAS failed or counterCells exist - use cell
        CounterCell a; long v; int m;
        boolean uncontended = true;

        // Try to update a random cell
        if (as == null || (m = as.length - 1) < 0 ||
            (a = as[ThreadLocalRandom.getProbe() & m]) == null ||
            !(uncontended = U.compareAndSwapLong(a, CELLVALUE,
                                                  v = a.value, v + x))) {
            fullAddCount(x, uncontended);  // Handle contention
            return;
        }
    }
    // Check if resize needed...
}`
        },
        {
          name: 'Calculating size()',
          explanation: 'size() sums baseCount and all counterCells. This is an estimate during concurrent modifications but eventually consistent. The value may be slightly stale but is always close to accurate.',
          codeExample: `// Calculate total size
final long sumCount() {
    CounterCell[] as = counterCells;
    CounterCell a;
    long sum = baseCount;
    if (as != null) {
        for (int i = 0; i < as.length; ++i) {
            if ((a = as[i]) != null)
                sum += a.value;
        }
    }
    return sum;
}

public int size() {
    long n = sumCount();
    return ((n < 0L) ? 0 :
            (n > (long)Integer.MAX_VALUE) ? Integer.MAX_VALUE :
            (int)n);
}

// Note: size() is an ESTIMATE during concurrent modification
// For exact count, you'd need external synchronization
// But for most uses, the estimate is perfectly fine`
        }
      ]
    },
    {
      id: 'resizing',
      name: 'Concurrent Resizing',
      icon: '\uD83D\uDCCE',
      color: '#f59e0b',
      description: 'Multiple threads can help transfer buckets during resize, spreading the work and reducing pause time.',
      diagram: ResizingDiagram,
      details: [
        {
          name: 'Parallel Transfer',
          diagram: ResizingDiagram,
          explanation: 'When resize is needed, one thread creates nextTable (2x size) and sets transferIndex. Other threads encountering ForwardingNodes can help by claiming chunks of buckets to transfer. This parallelizes resize work.',
          codeExample: `private final void transfer(Node<K,V>[] tab, Node<K,V>[] nextTab) {
    int n = tab.length, stride;

    // Divide work into chunks (stride)
    // More CPUs = smaller chunks = more parallelism
    if ((stride = (NCPU > 1) ? (n >>> 3) / NCPU : n) < MIN_TRANSFER_STRIDE)
        stride = MIN_TRANSFER_STRIDE;  // Minimum 16 buckets per chunk

    // Initialize nextTable if needed
    if (nextTab == null) {
        Node<K,V>[] nt = new Node[n << 1];  // Double size
        nextTab = nt;
        nextTable = nextTab;
        transferIndex = n;  // Start from end
    }

    // Each helper thread claims and transfers chunks
    // transferIndex decremented atomically as chunks claimed
}`
        },
        {
          name: 'Bucket Transfer',
          explanation: 'Each bucket is locked (synchronized) during transfer. Nodes are split into low (same index) and high (index + oldSize) lists based on hash bit. After transfer, a ForwardingNode marks the bucket as moved.',
          codeExample: `// Transfer this bucket
synchronized (f) {  // Lock the bucket being transferred
    if (tabAt(tab, i) == f) {  // Double-check
        Node<K,V> ln, hn;  // low and high lists

        // Split nodes by hash bit
        // Bit determines: same bucket or bucket + oldSize
        for (Node<K,V> p = f; p != null; p = p.next) {
            int b = p.hash & n;  // n = old table length
            if (b == 0)
                // Add to low list (stays at index i)
            else
                // Add to high list (goes to index i + n)
        }

        // Install in new table
        setTabAt(nextTab, i, ln);      // Low list at same index
        setTabAt(nextTab, i + n, hn);  // High list at index + n

        // Mark old bucket as forwarded
        setTabAt(tab, i, fwd);  // ForwardingNode
        advance = true;
    }
}`
        },
        {
          name: 'ForwardingNode',
          explanation: 'ForwardingNode is a special node with hash = MOVED (-1). It points to nextTable and indicates the bucket has been transferred. Any operation on this bucket automatically forwards to nextTable.',
          codeExample: `// ForwardingNode - signals "look in nextTable"
static final class ForwardingNode<K,V> extends Node<K,V> {
    final Node<K,V>[] nextTable;

    ForwardingNode(Node<K,V>[] tab) {
        super(MOVED, null, null, null);  // hash = MOVED = -1
        this.nextTable = tab;
    }

    // Forward find to nextTable
    Node<K,V> find(int h, Object k) {
        // Search in nextTable instead
        for (Node<K,V>[] tab = nextTable;;) {
            Node<K,V> e; int n;
            if ((e = tabAt(tab, (n - 1) & h)) == null)
                return null;
            // Continue search in new table...
        }
    }
}

// When put() sees ForwardingNode:
else if ((fh = f.hash) == MOVED)
    tab = helpTransfer(tab, f);  // Help resize, then retry`
        }
      ]
    },
    {
      id: 'atomic-operations',
      name: 'Atomic Operations',
      icon: '\uD83D\uDEE1\uFE0F',
      color: '#10b981',
      description: 'Compound atomic operations like putIfAbsent(), computeIfAbsent(), and merge() are essential for thread-safe patterns.',
      diagram: AtomicOperationsDiagram,
      details: [
        {
          name: 'Why Atomic Matters',
          diagram: AtomicOperationsDiagram,
          explanation: 'Check-then-act patterns with separate get()/put() are NOT atomic. Another thread can modify the value between your check and action. Atomic compound operations solve this by executing the entire operation under a lock.',
          codeExample: `// WRONG - Race condition!
if (!map.containsKey(key)) {
    map.put(key, value);  // Another thread may have inserted!
}
// Thread 1: containsKey -> false
// Thread 2: containsKey -> false
// Thread 1: put(key, value1)
// Thread 2: put(key, value2)  // OVERWRITES value1!

// CORRECT - Atomic operation
map.putIfAbsent(key, value);
// Entire check-and-insert is atomic`
        },
        {
          name: 'putIfAbsent & replace',
          explanation: 'putIfAbsent() inserts only if key absent (returns null on success, existing value if present). replace() updates only if key exists and optionally if value matches expected.',
          codeExample: `// putIfAbsent - insert only if key not present
V existing = map.putIfAbsent(key, newValue);
if (existing == null) {
    // We inserted the value
} else {
    // Key already existed, existing holds that value
}

// replace(key, value) - update only if key exists
V old = map.replace(key, newValue);
// Returns previous value, or null if key wasn't present

// replace(key, expectedValue, newValue) - conditional update
boolean updated = map.replace(key, expectedValue, newValue);
// Only replaces if current value equals expectedValue
// Atomic compare-and-swap semantics`
        },
        {
          name: 'compute & merge',
          explanation: 'computeIfAbsent() computes value only if absent (great for caching). computeIfPresent() transforms existing value. merge() combines new and existing values. compute() does both insert and update.',
          codeExample: `// computeIfAbsent - lazy initialization, perfect for caching
ConcurrentHashMap<String, ExpensiveObject> cache = new ConcurrentHashMap<>();
ExpensiveObject obj = cache.computeIfAbsent(key, k -> {
    // This function runs ONLY if key is absent
    // And it's atomic - no duplicate computation
    return new ExpensiveObject(k);
});

// merge - atomic read-modify-write, great for counters
ConcurrentHashMap<String, Integer> wordCount = new ConcurrentHashMap<>();
for (String word : words) {
    wordCount.merge(word, 1, Integer::sum);
    // If absent: put(word, 1)
    // If present: put(word, oldValue + 1)
}

// compute - general atomic transformation
map.compute(key, (k, v) -> {
    if (v == null) return initialValue;  // Key absent
    return v.transform();                 // Transform existing
});`
        }
      ]
    },
    {
      id: 'interview',
      name: 'Interview Questions',
      icon: '\u2753',
      color: '#6366f1',
      description: 'Common interview questions about ConcurrentHashMap with answers and code examples.',
      details: [
        {
          name: 'Basic Questions',
          explanation: 'Q1: ConcurrentHashMap vs Hashtable? A: CHM uses fine-grained locking (per-bucket), Hashtable locks entire map. Q2: Why no null keys/values? A: Ambiguity - can\'t distinguish "not found" from "value is null" in concurrent context. Q3: Is size() accurate? A: Estimate during concurrent mods; uses distributed counters.',
          codeExample: `// Q: Why can't ConcurrentHashMap have null values?
// A: Consider this scenario:
V value = map.get(key);
if (value == null) {
    // Did get() return null because:
    // 1. Key doesn't exist?
    // 2. Key exists with null value?
    // In concurrent code, we can't distinguish!
    // containsKey() + get() is not atomic
}

// HashMap allows null (single-threaded, can use containsKey)
// ConcurrentHashMap forbids null (concurrent, ambiguous)

// Q: What happens if I try?
map.put("key", null);  // NullPointerException!
map.put(null, "value"); // NullPointerException!`
        },
        {
          name: 'Code Questions',
          explanation: 'Q4: Why is check-then-act wrong? A: Race condition between check and act. Q5: How to iterate safely? A: Iterators are weakly consistent, never throw ConcurrentModificationException.',
          codeExample: `// Q: Why is this code wrong?
Integer value = map.get(key);
if (value == null) {
    map.put(key, 1);
} else {
    map.put(key, value + 1);
}
// ANSWER: Race condition between get and put!
// Two threads can both see null and both put 1

// CORRECT:
map.merge(key, 1, Integer::sum);
// OR
map.compute(key, (k, v) -> v == null ? 1 : v + 1);

// Q: How to iterate safely?
// ANSWER: Iterators are weakly consistent
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
    // Safe! May or may not see concurrent updates
    // Never throws ConcurrentModificationException
}

// Also safe - bulk operations
map.forEach((key, val) -> System.out.println(key + ": " + val));`
        },
        {
          name: 'When Not to Use',
          explanation: 'Q6: When NOT to use ConcurrentHashMap? A: Single-threaded (use HashMap), need null keys/values (use synchronizedMap), need consistent snapshot (external sync), need atomic operations across multiple keys (external lock).',
          codeExample: `// Q: When NOT to use ConcurrentHashMap?

// 1. Single-threaded code - use HashMap (faster)
Map<String, Integer> map = new HashMap<>();  // No sync overhead

// 2. Need null keys/values - use Collections.synchronizedMap
Map<String, Integer> map = Collections.synchronizedMap(new HashMap<>());
map.put(null, null);  // OK

// 3. Need consistent iteration snapshot
synchronized (map) {  // External synchronization
    for (Entry e : map.entrySet()) {
        // Guaranteed consistent view
    }
}

// 4. Need atomic operations across multiple keys
synchronized (lockObject) {
    V v1 = map.get(key1);
    V v2 = map.get(key2);
    map.put(key3, combine(v1, v2));
    // All three operations atomic together
}

// 5. Performance comparison (approximate):
// Single-threaded: HashMap > ConcurrentHashMap (10-15% faster)
// Multi-threaded:  ConcurrentHashMap >> synchronized alternatives`
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
      { name: 'My Projects', icon: '\uD83D\uDCC2', page: 'My Projects' },
      { name: 'ConcurrentHashMap Internals', icon: '\uD83D\uDD12', page: 'ConcurrentHashMap Internals' }
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
      } else if (e.key === 'b' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = e.target.tagName.toLowerCase()
        if (tag !== 'input' && tag !== 'textarea' && !e.target.isContentEditable) {
          e.preventDefault()
          onBack()
        }
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

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>ConcurrentHashMap Internals</h1>
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
          \u2190 Back to My Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={CONCURRENT_HASHMAP_COLORS}
        />
      </div>

      {/* Quick Facts */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem'
      }}>
        {[
          { label: 'Thread Safe', value: 'Yes' },
          { label: 'Null Keys/Values', value: 'No' },
          { label: 'Read Locking', value: 'None (CAS)' },
          { label: 'Write Locking', value: 'Per-Bucket' }
        ].map((fact, i) => (
          <div
            key={i}
            style={{
              padding: '1rem',
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '0.75rem',
              textAlign: 'center',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}
          >
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4ade80' }}>
              {fact.value}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
              {fact.label}
            </div>
          </div>
        ))}
      </div>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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
              {concept.details.length} topics \u2022 Click to explore
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
              width: '100%',
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
              colors={CONCURRENT_HASHMAP_COLORS}
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
                >\u2190</button>
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
                >\u2192</button>
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
                >\u2715</button>
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

export default ConcurrentHashMapInternals

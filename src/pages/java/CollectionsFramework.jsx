/**
 * Collections Framework - Java Collections Deep Dive
 *
 * Comprehensive guide to Java Collections Framework covering:
 * - Collection hierarchy and interfaces
 * - List implementations (ArrayList, LinkedList)
 * - Set implementations (HashSet, TreeSet, LinkedHashSet)
 * - Map implementations (HashMap, TreeMap, LinkedHashMap)
 * - Queue and Deque implementations
 * - Utility classes and best practices
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import { isProblemCompleted } from '../../services/progressService'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const COLLECTIONS_COLORS = {
  primary: '#f97316',           // Orange primary
  primaryHover: '#fb923c',      // Orange hover
  bg: 'rgba(249, 115, 22, 0.1)', // Orange background with transparency
  border: 'rgba(249, 115, 22, 0.3)', // Orange border
  arrow: '#f97316',             // Orange arrow
  hoverBg: 'rgba(249, 115, 22, 0.2)', // Orange hover background
  topicBg: 'rgba(249, 115, 22, 0.2)'  // Orange topic background
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

const CollectionsHierarchyDiagram = () => (
  <svg viewBox="0 0 900 380" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-hierarchy" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="450" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Java Collections Framework Hierarchy
    </text>

    {/* Iterable - Top Level */}
    <rect x="375" y="45" width="150" height="40" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="450" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`Iterable<E>`}</text>

    {/* Collection Interface */}
    <rect x="375" y="110" width="150" height="40" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="450" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`Collection<E>`}</text>
    <line x1="450" y1="85" x2="450" y2="105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-hierarchy)"/>

    {/* List, Set, Queue */}
    <rect x="100" y="180" width="120" height="40" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="160" y="205" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`List<E>`}</text>

    <rect x="390" y="180" width="120" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="450" y="205" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`Set<E>`}</text>

    <rect x="680" y="180" width="120" height="40" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="740" y="205" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`Queue<E>`}</text>

    {/* Lines from Collection to List, Set, Queue */}
    <line x1="375" y1="130" x2="160" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="5,5"/>
    <line x1="160" y1="130" x2="160" y2="175" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-hierarchy)"/>

    <line x1="450" y1="150" x2="450" y2="175" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-hierarchy)"/>

    <line x1="525" y1="130" x2="740" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="5,5"/>
    <line x1="740" y1="130" x2="740" y2="175" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-hierarchy)"/>

    {/* List Implementations */}
    <rect x="40" y="260" width="100" height="35" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="90" y="282" textAnchor="middle" fill="#60a5fa" fontSize="10">ArrayList</text>

    <rect x="160" y="260" width="100" height="35" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="210" y="282" textAnchor="middle" fill="#60a5fa" fontSize="10">LinkedList</text>

    <line x1="90" y1="220" x2="90" y2="255" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-hierarchy)"/>
    <line x1="160" y1="220" x2="160" y2="240" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="160" y1="240" x2="210" y2="240" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="210" y1="240" x2="210" y2="255" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-hierarchy)"/>

    {/* Set Implementations */}
    <rect x="320" y="260" width="85" height="35" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="362" y="282" textAnchor="middle" fill="#4ade80" fontSize="10">HashSet</text>

    <rect x="415" y="260" width="85" height="35" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="457" y="282" textAnchor="middle" fill="#4ade80" fontSize="10">TreeSet</text>

    <rect x="510" y="260" width="95" height="35" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="557" y="282" textAnchor="middle" fill="#4ade80" fontSize="10">LinkedHashSet</text>

    <line x1="362" y1="220" x2="362" y2="255" stroke="#22c55e" strokeWidth="1.5"/>
    <line x1="450" y1="220" x2="450" y2="240" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="362" y1="240" x2="557" y2="240" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="457" y1="240" x2="457" y2="255" stroke="#22c55e" strokeWidth="1.5"/>
    <line x1="557" y1="240" x2="557" y2="255" stroke="#22c55e" strokeWidth="1.5"/>

    {/* Queue Implementations */}
    <rect x="660" y="260" width="90" height="35" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="705" y="282" textAnchor="middle" fill="#fbbf24" fontSize="10">PriorityQueue</text>

    <rect x="760" y="260" width="90" height="35" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="805" y="282" textAnchor="middle" fill="#fbbf24" fontSize="10">ArrayDeque</text>

    <line x1="705" y1="220" x2="705" y2="255" stroke="#f59e0b" strokeWidth="1.5"/>
    <line x1="740" y1="220" x2="740" y2="240" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="705" y1="240" x2="805" y2="240" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="805" y1="240" x2="805" y2="255" stroke="#f59e0b" strokeWidth="1.5"/>

    {/* Map Interface (Separate hierarchy) */}
    <rect x="40" y="330" width="120" height="40" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="100" y="355" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`Map<K,V>`}</text>

    <rect x="180" y="330" width="85" height="35" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="222" y="352" textAnchor="middle" fill="#f472b6" fontSize="10">HashMap</text>

    <rect x="275" y="330" width="85" height="35" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="317" y="352" textAnchor="middle" fill="#f472b6" fontSize="10">TreeMap</text>

    <rect x="370" y="330" width="95" height="35" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="417" y="352" textAnchor="middle" fill="#f472b6" fontSize="10">LinkedHashMap</text>

    <line x1="160" y1="350" x2="175" y2="350" stroke="#ec4899" strokeWidth="1.5"/>
    <line x1="265" y1="350" x2="270" y2="350" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="360" y1="350" x2="365" y2="350" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>

    {/* Legend */}
    <rect x="700" y="320" width="15" height="15" rx="3" fill="#8b5cf6"/>
    <text x="720" y="332" fill="#94a3b8" fontSize="9">Interface</text>

    <rect x="700" y="340" width="15" height="15" rx="3" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="720" y="352" fill="#94a3b8" fontSize="9">Implementation</text>
  </svg>
)

const ListDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-list" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ArrayList vs LinkedList Internal Structure
    </text>

    {/* ArrayList Section */}
    <text x="200" y="55" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">ArrayList (Contiguous Memory)</text>

    {/* Array boxes */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <g key={`arr-${i}`}>
        <rect x={50 + i * 45} y="70" width="40" height="40" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
        <text x={70 + i * 45} y="95" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">{i === 6 ? '...' : String.fromCharCode(65 + i)}</text>
        <text x={70 + i * 45} y="125" textAnchor="middle" fill="#64748b" fontSize="9">[{i}]</text>
      </g>
    ))}

    <text x="200" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">O(1) random access | O(n) insert/delete middle</text>

    {/* LinkedList Section */}
    <text x="600" y="55" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">LinkedList (Node References)</text>

    {/* Linked list nodes */}
    {[0, 1, 2, 3].map((i) => (
      <g key={`ll-${i}`}>
        <rect x={450 + i * 90} y="70" width="70" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
        <text x={485 + i * 90} y="90" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">{String.fromCharCode(65 + i)}</text>
        <text x={485 + i * 90} y="108" textAnchor="middle" fill="#64748b" fontSize="8">prev|next</text>
        {i < 3 && (
          <line x1={520 + i * 90} y1="95" x2={545 + i * 90} y2="95" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-list)"/>
        )}
      </g>
    ))}

    <text x="600" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">O(n) random access | O(1) insert/delete at known position</text>

    {/* Comparison Table */}
    <rect x="100" y="170" width="600" height="100" rx="8" fill="rgba(15, 23, 42, 0.6)" stroke="#334155" strokeWidth="1"/>

    <text x="400" y="190" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Performance Comparison</text>

    <line x1="120" y1="200" x2="680" y2="200" stroke="#334155" strokeWidth="1"/>

    <text x="200" y="220" textAnchor="middle" fill="#64748b" fontSize="10">Operation</text>
    <text x="350" y="220" textAnchor="middle" fill="#60a5fa" fontSize="10">ArrayList</text>
    <text x="550" y="220" textAnchor="middle" fill="#4ade80" fontSize="10">LinkedList</text>

    <text x="200" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">get(index)</text>
    <text x="350" y="240" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">O(1)</text>
    <text x="550" y="240" textAnchor="middle" fill="#ef4444" fontSize="9">O(n)</text>

    <text x="200" y="258" textAnchor="middle" fill="#94a3b8" fontSize="9">add(element)</text>
    <text x="350" y="258" textAnchor="middle" fill="#f59e0b" fontSize="9">O(1) amortized</text>
    <text x="550" y="258" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">O(1)</text>
  </svg>
)

const MapDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-map" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      HashMap Internal Structure (Bucket Array + Linked List/Tree)
    </text>

    {/* Bucket Array */}
    <text x="80" y="55" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">Buckets</text>

    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <g key={`bucket-${i}`}>
        <rect x="50" y={65 + i * 30} width="60" height="25" rx="4" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="1"/>
        <text x="80" y={82 + i * 30} textAnchor="middle" fill="#f472b6" fontSize="9">[{i}]</text>
      </g>
    ))}

    {/* Linked chains for some buckets */}
    {/* Bucket 1 - single entry */}
    <rect x="140" y="95" width="80" height="25" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="180" y="112" textAnchor="middle" fill="#60a5fa" fontSize="8">K1:V1</text>
    <line x1="110" y1="107" x2="135" y2="107" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#arrow-map)"/>

    {/* Bucket 3 - chain of 2 */}
    <rect x="140" y="155" width="80" height="25" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="180" y="172" textAnchor="middle" fill="#60a5fa" fontSize="8">K2:V2</text>
    <line x1="110" y1="167" x2="135" y2="167" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#arrow-map)"/>

    <rect x="240" y="155" width="80" height="25" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="280" y="172" textAnchor="middle" fill="#4ade80" fontSize="8">K3:V3</text>
    <line x1="220" y1="167" x2="235" y2="167" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-map)"/>

    {/* Bucket 5 - chain of 3 (treeified) */}
    <rect x="140" y="215" width="80" height="25" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="180" y="232" textAnchor="middle" fill="#a78bfa" fontSize="8">K4:V4</text>
    <line x1="110" y1="227" x2="135" y2="227" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#arrow-map)"/>

    <rect x="240" y="200" width="60" height="20" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="270" y="214" textAnchor="middle" fill="#a78bfa" fontSize="7">K5</text>

    <rect x="240" y="230" width="60" height="20" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="270" y="244" textAnchor="middle" fill="#a78bfa" fontSize="7">K6</text>

    <line x1="220" y1="227" x2="235" y2="210" stroke="#8b5cf6" strokeWidth="1"/>
    <line x1="220" y1="227" x2="235" y2="240" stroke="#8b5cf6" strokeWidth="1"/>

    <text x="280" y="265" textAnchor="middle" fill="#64748b" fontSize="8">{`(Tree when >8 nodes)`}</text>

    {/* Hash Function Box */}
    <rect x="450" y="60" width="300" height="120" rx="8" fill="rgba(15, 23, 42, 0.6)" stroke="#334155" strokeWidth="1"/>
    <text x="600" y="85" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Hash Function Process</text>

    <text x="480" y="110" fill="#94a3b8" fontSize="9">1. key.hashCode()</text>
    <text x="630" y="110" fill="#60a5fa" fontSize="9">{`-> int hash`}</text>

    <text x="480" y="130" fill="#94a3b8" fontSize="9">{`2. hash ^ (hash >>> 16)`}</text>
    <text x="680" y="130" fill="#22c55e" fontSize="9">spread bits</text>

    <text x="480" y="150" fill="#94a3b8" fontSize="9">{`3. (n-1) & hash`}</text>
    <text x="650" y="150" fill="#f472b6" fontSize="9">{`-> bucket index`}</text>

    {/* Key Properties */}
    <rect x="450" y="200" width="300" height="100" rx="8" fill="rgba(15, 23, 42, 0.6)" stroke="#334155" strokeWidth="1"/>
    <text x="600" y="225" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Key Requirements</text>

    <text x="480" y="250" fill="#94a3b8" fontSize="9">- Immutable keys preferred</text>
    <text x="480" y="270" fill="#94a3b8" fontSize="9">{`- Override hashCode() & equals()`}</text>
    <text x="480" y="290" fill="#94a3b8" fontSize="9">- Consistent hash = same bucket</text>
  </svg>
)

const SetDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Set Implementations Comparison
    </text>

    {/* HashSet */}
    <rect x="30" y="50" width="230" height="180" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="145" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">HashSet</text>

    <circle cx="70" cy="120" r="18" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="70" y="125" textAnchor="middle" fill="#60a5fa" fontSize="10">C</text>

    <circle cx="130" cy="100" r="18" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="130" y="105" textAnchor="middle" fill="#60a5fa" fontSize="10">A</text>

    <circle cx="190" cy="130" r="18" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="190" y="135" textAnchor="middle" fill="#60a5fa" fontSize="10">B</text>

    <circle cx="100" cy="165" r="18" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="100" y="170" textAnchor="middle" fill="#60a5fa" fontSize="10">D</text>

    <text x="145" y="205" textAnchor="middle" fill="#64748b" fontSize="9">No order guaranteed</text>
    <text x="145" y="220" textAnchor="middle" fill="#22c55e" fontSize="9">O(1) operations</text>

    {/* TreeSet */}
    <rect x="285" y="50" width="230" height="180" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">TreeSet</text>

    {/* Binary tree structure */}
    <circle cx="400" cy="105" r="16" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="400" y="110" textAnchor="middle" fill="#a78bfa" fontSize="10">C</text>

    <circle cx="350" cy="145" r="16" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="350" y="150" textAnchor="middle" fill="#a78bfa" fontSize="10">A</text>

    <circle cx="450" cy="145" r="16" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="450" y="150" textAnchor="middle" fill="#a78bfa" fontSize="10">D</text>

    <circle cx="380" cy="180" r="16" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="380" y="185" textAnchor="middle" fill="#a78bfa" fontSize="10">B</text>

    <line x1="388" y1="117" x2="362" y2="133" stroke="#8b5cf6" strokeWidth="1"/>
    <line x1="412" y1="117" x2="438" y2="133" stroke="#8b5cf6" strokeWidth="1"/>
    <line x1="358" y1="157" x2="372" y2="168" stroke="#8b5cf6" strokeWidth="1"/>

    <text x="400" y="205" textAnchor="middle" fill="#64748b" fontSize="9">Sorted (natural order)</text>
    <text x="400" y="220" textAnchor="middle" fill="#8b5cf6" fontSize="9">O(log n) operations</text>

    {/* LinkedHashSet */}
    <rect x="540" y="50" width="230" height="180" rx="8" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="655" y="75" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="bold">LinkedHashSet</text>

    <rect x="565" y="100" width="35" height="30" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4"/>
    <text x="582" y="120" textAnchor="middle" fill="#22d3ee" fontSize="10">A</text>

    <rect x="615" y="100" width="35" height="30" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4"/>
    <text x="632" y="120" textAnchor="middle" fill="#22d3ee" fontSize="10">B</text>

    <rect x="665" y="100" width="35" height="30" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4"/>
    <text x="682" y="120" textAnchor="middle" fill="#22d3ee" fontSize="10">C</text>

    <rect x="715" y="100" width="35" height="30" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4"/>
    <text x="732" y="120" textAnchor="middle" fill="#22d3ee" fontSize="10">D</text>

    <line x1="600" y1="115" x2="610" y2="115" stroke="#22d3ee" strokeWidth="1.5"/>
    <line x1="650" y1="115" x2="660" y2="115" stroke="#22d3ee" strokeWidth="1.5"/>
    <line x1="700" y1="115" x2="710" y2="115" stroke="#22d3ee" strokeWidth="1.5"/>

    <text x="655" y="160" textAnchor="middle" fill="#64748b" fontSize="9">Insertion order preserved</text>
    <text x="655" y="175" textAnchor="middle" fill="#64748b" fontSize="9">Hash + Doubly Linked List</text>
    <text x="655" y="220" textAnchor="middle" fill="#06b6d4" fontSize="9">O(1) ops + predictable iteration</text>
  </svg>
)

const QueueDequeDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-queue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Queue and Deque Operations
    </text>

    {/* Queue (FIFO) */}
    <rect x="50" y="50" width="320" height="100" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="210" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Queue (FIFO)</text>

    {/* Queue elements */}
    {['D', 'C', 'B', 'A'].map((e, i) => (
      <rect key={e} x={80 + i * 60} y="90" width="50" height="40" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    ))}
    {['D', 'C', 'B', 'A'].map((e, i) => (
      <text key={`t-${e}`} x={105 + i * 60} y="115" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">{e}</text>
    ))}

    <text x="65" y="80" fill="#22c55e" fontSize="9">offer()</text>
    <line x1="55" y1="110" x2="75" y2="110" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-queue)"/>

    <text x="320" y="80" fill="#ef4444" fontSize="9">poll()</text>
    <line x1="345" y1="110" x2="325" y2="110" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-queue)"/>

    {/* Deque (Double-ended) */}
    <rect x="430" y="50" width="340" height="100" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Deque (Double-ended)</text>

    {/* Deque elements */}
    {['A', 'B', 'C', 'D'].map((e, i) => (
      <rect key={e} x={470 + i * 60} y="90" width="50" height="40" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    ))}
    {['A', 'B', 'C', 'D'].map((e, i) => (
      <text key={`t-${e}`} x={495 + i * 60} y="115" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">{e}</text>
    ))}

    <text x="445" y="80" fill="#22c55e" fontSize="8">addFirst()</text>
    <text x="445" y="140" fill="#ef4444" fontSize="8">pollFirst()</text>

    <text x="735" y="80" fill="#22c55e" fontSize="8">addLast()</text>
    <text x="735" y="140" fill="#ef4444" fontSize="8">pollLast()</text>

    {/* PriorityQueue */}
    <rect x="50" y="170" width="320" height="100" rx="8" fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" strokeWidth="2"/>
    <text x="210" y="195" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="bold">PriorityQueue (Min-Heap)</text>

    {/* Heap visualization */}
    <circle cx="210" cy="225" r="18" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899"/>
    <text x="210" y="230" textAnchor="middle" fill="#f472b6" fontSize="10">1</text>

    <circle cx="160" cy="260" r="15" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899"/>
    <text x="160" y="265" textAnchor="middle" fill="#f472b6" fontSize="9">3</text>

    <circle cx="260" cy="260" r="15" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899"/>
    <text x="260" y="265" textAnchor="middle" fill="#f472b6" fontSize="9">2</text>

    <line x1="195" y1="238" x2="172" y2="248" stroke="#ec4899" strokeWidth="1"/>
    <line x1="225" y1="238" x2="248" y2="248" stroke="#ec4899" strokeWidth="1"/>

    <text x="330" y="245" fill="#64748b" fontSize="9">poll() always returns</text>
    <text x="330" y="260" fill="#64748b" fontSize="9">smallest element</text>

    {/* ArrayDeque */}
    <rect x="430" y="170" width="340" height="100" rx="8" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="600" y="195" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="bold">ArrayDeque (Circular Array)</text>

    {/* Circular array representation */}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const angle = (i * 45 - 90) * Math.PI / 180
      const x = 600 + 45 * Math.cos(angle)
      const y = 245 + 40 * Math.sin(angle)
      const filled = i >= 1 && i <= 4
      return (
        <g key={i}>
          <rect x={x - 15} y={y - 12} width="30" height="24" rx="4"
            fill={filled ? 'rgba(6, 182, 212, 0.3)' : 'rgba(100, 116, 139, 0.2)'}
            stroke={filled ? '#06b6d4' : '#475569'} strokeWidth="1"/>
          <text x={x} y={y + 4} textAnchor="middle" fill={filled ? '#22d3ee' : '#64748b'} fontSize="9">
            {filled ? String.fromCharCode(64 + i) : ''}
          </text>
        </g>
      )
    })}

    <text x="540" y="230" fill="#22c55e" fontSize="8">head</text>
    <text x="660" y="230" fill="#ef4444" fontSize="8">tail</text>
  </svg>
)

const LRUCacheDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-lru" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      LRU Cache: HashMap + Doubly Linked List
    </text>

    {/* HashMap */}
    <rect x="30" y="50" width="150" height="180" rx="8" fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" strokeWidth="2"/>
    <text x="105" y="75" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">HashMap</text>

    {['K1', 'K2', 'K3', 'K4'].map((k, i) => (
      <g key={k}>
        <rect x="50" y={90 + i * 35} width="50" height="25" rx="4" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899"/>
        <text x="75" y={107 + i * 35} textAnchor="middle" fill="#f472b6" fontSize="9">{k}</text>
        <text x="150" y={107 + i * 35} textAnchor="middle" fill="#64748b" fontSize="8">{`->`}</text>
      </g>
    ))}

    {/* Doubly Linked List */}
    <rect x="200" y="50" width="570" height="180" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="485" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">{`Doubly Linked List (MRU -> LRU)`}</text>

    {/* Head sentinel */}
    <rect x="220" y="110" width="60" height="50" rx="6" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b"/>
    <text x="250" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">HEAD</text>

    {/* Data nodes */}
    {['K4:V4', 'K2:V2', 'K1:V1', 'K3:V3'].map((kv, i) => (
      <g key={kv}>
        <rect x={300 + i * 100} y="110" width="80" height="50" rx="6"
          fill={i === 0 ? 'rgba(34, 197, 94, 0.3)' : i === 3 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.2)'}
          stroke={i === 0 ? '#22c55e' : i === 3 ? '#ef4444' : '#3b82f6'}/>
        <text x={340 + i * 100} y={130} textAnchor="middle" fill={i === 0 ? '#4ade80' : i === 3 ? '#f87171' : '#60a5fa'} fontSize="9" fontWeight="bold">{kv}</text>
        <text x={340 + i * 100} y={148} textAnchor="middle" fill="#64748b" fontSize="7">prev|next</text>
      </g>
    ))}

    {/* Tail sentinel */}
    <rect x="700" y="110" width="60" height="50" rx="6" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b"/>
    <text x="730" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">TAIL</text>

    {/* Arrows between nodes */}
    <line x1="280" y1="135" x2="295" y2="135" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-lru)"/>
    <line x1="380" y1="135" x2="395" y2="135" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-lru)"/>
    <line x1="480" y1="135" x2="495" y2="135" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-lru)"/>
    <line x1="580" y1="135" x2="595" y2="135" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-lru)"/>
    <line x1="680" y1="135" x2="695" y2="135" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-lru)"/>

    {/* Labels */}
    <text x="340" y="180" textAnchor="middle" fill="#22c55e" fontSize="9">Most Recently Used</text>
    <text x="640" y="180" textAnchor="middle" fill="#ef4444" fontSize="9">Least Recently Used (evict)</text>

    {/* Operation descriptions */}
    <text x="400" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9">get(key): Move node to front | put(key, val): Add to front, evict from tail if full</text>
    <text x="400" y="225" textAnchor="middle" fill="#64748b" fontSize="9">Both operations O(1) time complexity</text>
  </svg>
)

const IteratorDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-iter" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Iterator Pattern and fail-fast Behavior
    </text>

    {/* Collection */}
    <rect x="50" y="50" width="300" height="60" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="200" y="70" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Collection</text>

    {['A', 'B', 'C', 'D', 'E'].map((e, i) => (
      <rect key={e} x={70 + i * 55} y="80" width="45" height="25" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    ))}
    {['A', 'B', 'C', 'D', 'E'].map((e, i) => (
      <text key={`t-${e}`} x={92 + i * 55} y="97" textAnchor="middle" fill="#60a5fa" fontSize="10">{e}</text>
    ))}

    {/* Iterator cursor */}
    <polygon points="175,120 185,130 165,130" fill="#22c55e"/>
    <text x="175" y="145" textAnchor="middle" fill="#22c55e" fontSize="9">cursor</text>

    <line x1="200" y1="125" x2="230" y2="125" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-iter)"/>
    <text x="250" y="130" fill="#22c55e" fontSize="9">next()</text>

    {/* modCount explanation */}
    <rect x="400" y="50" width="360" height="130" rx="8" fill="rgba(15, 23, 42, 0.6)" stroke="#334155" strokeWidth="1"/>
    <text x="580" y="75" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Fail-Fast Mechanism</text>

    <text x="420" y="100" fill="#94a3b8" fontSize="9">Collection maintains: modCount = 0</text>
    <text x="420" y="120" fill="#94a3b8" fontSize="9">Iterator stores: expectedModCount = modCount</text>

    <text x="420" y="145" fill="#ef4444" fontSize="9">On structural modification: modCount++</text>
    <text x="420" y="165" fill="#ef4444" fontSize="9">Iterator checks: if (modCount != expectedModCount)</text>
    <text x="470" y="180" fill="#f87171" fontSize="9" fontWeight="bold">throw ConcurrentModificationException</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function CollectionsFramework({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [userCode, setUserCode] = useState('')
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  const openProblem = (problem) => { setSelectedProblem(problem); setUserCode(problem.starterCode); setShowSolution(false) }
  const closeProblem = () => { setSelectedProblem(null); setUserCode(''); setShowSolution(false) }

  const practiceProblems = [
    { id: 1, title: 'Choose the Right Collection', difficulty: 'Easy', description: 'Given requirements, select the appropriate collection type (List, Set, Map, Queue).', example: 'Need unique elements with insertion order → LinkedHashSet',
      instructions: `Select the right collection.

**Requirements:**
1. Match use case to collection
2. Consider performance
3. Explain your choice`,
      starterCode: `import java.util.*;

public class CollectionChoice {
    public static void main(String[] args) {
        // Scenario 1: Store user IDs, need fast lookup, no duplicates
        // Collection: ???
        
        // Scenario 2: Maintain insertion order, allow duplicates
        // Collection: ???
        
        // Scenario 3: Key-value pairs, sorted by key
        // Collection: ???
        
        // Scenario 4: FIFO processing queue
        // Collection: ???
    }
}`,
      solution: `import java.util.*;

public class CollectionChoice {
    public static void main(String[] args) {
        // Scenario 1: Store user IDs, need fast lookup, no duplicates
        // Collection: HashSet - O(1) lookup, no duplicates
        Set<Integer> userIds = new HashSet<>();
        
        // Scenario 2: Maintain insertion order, allow duplicates
        // Collection: ArrayList - ordered, allows duplicates
        List<String> items = new ArrayList<>();
        
        // Scenario 3: Key-value pairs, sorted by key
        // Collection: TreeMap - sorted by natural order
        Map<String, Integer> sortedMap = new TreeMap<>();
        
        // Scenario 4: FIFO processing queue
        // Collection: LinkedList or ArrayDeque
        Queue<String> queue = new LinkedList<>();
        
        // Quick reference:
        // HashSet: unique, unordered, O(1)
        // LinkedHashSet: unique, insertion order
        // TreeSet: unique, sorted, O(log n)
        // ArrayList: ordered, random access O(1)
        // LinkedList: ordered, fast insert/delete
        // HashMap: key-value, unordered
        // LinkedHashMap: key-value, insertion order
        // TreeMap: key-value, sorted keys
    }
}`
    },
    { id: 2, title: 'Custom Comparator', difficulty: 'Medium', description: 'Implement a custom Comparator for sorting objects in a TreeSet.', example: 'Sort Person by age, then by name',
      instructions: `Create custom Comparator.

**Requirements:**
1. Sort by age ascending
2. Then by name alphabetically
3. Use in TreeSet`,
      starterCode: `import java.util.*;

class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}

public class ComparatorDemo {
    public static void main(String[] args) {
        // TODO: Create Comparator<Person> that sorts by age, then name
        
        // TreeSet<Person> people = new TreeSet<>(comparator);
        // people.add(new Person("Alice", 30));
        // people.add(new Person("Bob", 25));
        // people.add(new Person("Charlie", 30));
        // System.out.println(people);
    }
}`,
      solution: `import java.util.*;

class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}

public class ComparatorDemo {
    public static void main(String[] args) {
        // Method 1: Lambda
        Comparator<Person> byAgeThenName = 
            Comparator.comparingInt((Person p) -> p.age)
                      .thenComparing(p -> p.name);
        
        // Method 2: Explicit lambda
        Comparator<Person> comparator = (p1, p2) -> {
            int ageCompare = Integer.compare(p1.age, p2.age);
            if (ageCompare != 0) return ageCompare;
            return p1.name.compareTo(p2.name);
        };
        
        TreeSet<Person> people = new TreeSet<>(byAgeThenName);
        people.add(new Person("Alice", 30));
        people.add(new Person("Bob", 25));
        people.add(new Person("Charlie", 30));
        people.add(new Person("Anna", 30));
        
        System.out.println(people);
        // [Bob(25), Alice(30), Anna(30), Charlie(30)]
    }
}`
    },
    { id: 3, title: 'Thread-Safe Collections', difficulty: 'Medium', description: 'Convert a HashMap to a thread-safe version using Collections utility methods.', example: 'Collections.synchronizedMap() vs ConcurrentHashMap',
      instructions: `Make collections thread-safe.

**Requirements:**
1. Use synchronizedMap
2. Use ConcurrentHashMap
3. Compare approaches`,
      starterCode: `import java.util.*;
import java.util.concurrent.*;

public class ThreadSafeDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        
        // TODO: Make thread-safe using Collections.synchronizedMap()
        
        // TODO: Use ConcurrentHashMap instead
        
        // TODO: When to use which?
    }
}`,
      solution: `import java.util.*;
import java.util.concurrent.*;

public class ThreadSafeDemo {
    public static void main(String[] args) {
        // Option 1: synchronizedMap wrapper
        Map<String, Integer> syncMap = 
            Collections.synchronizedMap(new HashMap<>());
        
        // Must synchronize for iteration!
        synchronized (syncMap) {
            for (Map.Entry<String, Integer> e : syncMap.entrySet()) {
                System.out.println(e);
            }
        }
        
        // Option 2: ConcurrentHashMap (preferred)
        ConcurrentHashMap<String, Integer> concurrentMap = 
            new ConcurrentHashMap<>();
        
        // Thread-safe operations without external sync
        concurrentMap.put("key", 1);
        concurrentMap.computeIfAbsent("key2", k -> 2);
        concurrentMap.forEach((k, v) -> System.out.println(k + "=" + v));
        
        // When to use which:
        // synchronizedMap: Legacy code, simple use cases
        // ConcurrentHashMap: Better performance, atomic operations
        
        // Other thread-safe collections:
        // CopyOnWriteArrayList - for read-heavy lists
        // ConcurrentLinkedQueue - non-blocking queue
        // BlockingQueue - producer-consumer pattern
    }
}`
    },
    { id: 4, title: 'Deque Operations', difficulty: 'Easy', description: 'Implement a stack and queue using ArrayDeque.', example: 'push/pop for stack, offer/poll for queue',
      instructions: `Use ArrayDeque as stack and queue.

**Requirements:**
1. Implement stack (LIFO)
2. Implement queue (FIFO)
3. Show both operations`,
      starterCode: `import java.util.*;

public class DequeDemo {
    public static void main(String[] args) {
        // TODO: Use ArrayDeque as a Stack (LIFO)
        // push(), pop(), peek()
        
        // TODO: Use ArrayDeque as a Queue (FIFO)
        // offer(), poll(), peek()
    }
}`,
      solution: `import java.util.*;

public class DequeDemo {
    public static void main(String[] args) {
        // ArrayDeque as Stack (LIFO)
        Deque<String> stack = new ArrayDeque<>();
        stack.push("first");
        stack.push("second");
        stack.push("third");
        
        System.out.println("Stack peek: " + stack.peek()); // third
        System.out.println("Stack pop: " + stack.pop());   // third
        System.out.println("Stack pop: " + stack.pop());   // second
        
        // ArrayDeque as Queue (FIFO)
        Deque<String> queue = new ArrayDeque<>();
        queue.offer("first");
        queue.offer("second");
        queue.offer("third");
        
        System.out.println("Queue peek: " + queue.peek());  // first
        System.out.println("Queue poll: " + queue.poll());  // first
        System.out.println("Queue poll: " + queue.poll());  // second
        
        // ArrayDeque is preferred over Stack and LinkedList
        // - Faster than Stack (no synchronization)
        // - Faster than LinkedList (array-based)
        // - No null elements allowed
    }
}`
    }
  ]

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'hierarchy',
      name: 'Collection Hierarchy',
      icon: '\uD83C\uDFDB\uFE0F',
      color: '#8b5cf6',
      description: 'Understand the Java Collections Framework hierarchy, core interfaces, and when to use each type of collection.',
      diagram: CollectionsHierarchyDiagram,
      details: [
        {
          name: 'Framework Overview',
          diagram: CollectionsHierarchyDiagram,
          explanation: 'The Java Collections Framework provides a unified architecture for representing and manipulating collections. At the top is the Iterable interface, followed by Collection. From Collection, three main branches emerge: List (ordered, allows duplicates), Set (no duplicates), and Queue (FIFO/priority ordering). Map is separate as it stores key-value pairs rather than single elements. Each interface has multiple implementations optimized for different use cases.',
          codeExample: `// The Collection hierarchy
Iterable<E>
    └── Collection<E>
            ├── List<E>        // Ordered, indexed, duplicates allowed
            │     ├── ArrayList
            │     ├── LinkedList
            │     └── Vector (legacy)
            │
            ├── Set<E>         // No duplicates
            │     ├── HashSet
            │     ├── LinkedHashSet
            │     └── TreeSet (SortedSet)
            │
            └── Queue<E>       // FIFO, priority ordering
                  ├── PriorityQueue
                  ├── LinkedList
                  └── ArrayDeque

Map<K,V>                       // Key-value pairs (separate hierarchy)
    ├── HashMap
    ├── LinkedHashMap
    ├── TreeMap (SortedMap)
    └── Hashtable (legacy)`
        },
        {
          name: 'Core Interfaces',
          explanation: 'Collection<E> defines the basic operations: add(), remove(), contains(), size(), isEmpty(), iterator(). List extends this with indexed access: get(index), set(index, element), indexOf(). Set adds no new methods but enforces uniqueness contract. Queue adds offer(), poll(), peek() for queue operations. Map defines put(key, value), get(key), keySet(), values(), entrySet().',
          codeExample: `// Collection interface core methods
public interface Collection<E> extends Iterable<E> {
    boolean add(E e);
    boolean remove(Object o);
    boolean contains(Object o);
    int size();
    boolean isEmpty();
    void clear();
    Iterator<E> iterator();
    Object[] toArray();
    <T> T[] toArray(T[] a);

    // Bulk operations
    boolean addAll(Collection<? extends E> c);
    boolean removeAll(Collection<?> c);
    boolean retainAll(Collection<?> c);
    boolean containsAll(Collection<?> c);
}

// Java 8+ default methods
default boolean removeIf(Predicate<? super E> filter);
default Stream<E> stream();
default Stream<E> parallelStream();`
        },
        {
          name: 'Choosing the Right Collection',
          explanation: 'Choose ArrayList for frequent random access and iteration. Use LinkedList when insertions/deletions at arbitrary positions are common. HashSet for fast uniqueness checks. TreeSet when sorted order matters. LinkedHashSet for insertion-order iteration. HashMap for fast key-value lookup. TreeMap for sorted key iteration. PriorityQueue for heap-based priority processing. ArrayDeque for stack/queue operations.',
          codeExample: `// Decision guide for choosing collections

// Need indexed access + frequent reads?
List<String> list = new ArrayList<>();  // O(1) get, O(n) insert middle

// Need frequent insertions/deletions?
List<String> list = new LinkedList<>();  // O(1) insert at iterator position

// Need unique elements, don't care about order?
Set<String> set = new HashSet<>();  // O(1) add/contains

// Need unique elements in sorted order?
Set<String> set = new TreeSet<>();  // O(log n) operations, sorted

// Need unique elements, preserve insertion order?
Set<String> set = new LinkedHashSet<>();  // O(1) + ordered iteration

// Need fast key-value lookup?
Map<String, Integer> map = new HashMap<>();  // O(1) average

// Need sorted keys?
Map<String, Integer> map = new TreeMap<>();  // O(log n), sorted by key

// Need FIFO queue or stack?
Deque<String> deque = new ArrayDeque<>();  // Prefer over Stack class`
        }
      ]
    },
    {
      id: 'list',
      name: 'List Implementations',
      icon: '\uD83D\uDCDD',
      color: '#3b82f6',
      description: 'Deep dive into ArrayList and LinkedList - internal structures, performance characteristics, and when to use each.',
      diagram: ListDiagram,
      details: [
        {
          name: 'ArrayList Internals',
          diagram: ListDiagram,
          explanation: 'ArrayList uses a resizable array internally. Default initial capacity is 10. When full, it grows by 50% (newCapacity = oldCapacity + oldCapacity >> 1). Elements are stored contiguously in memory, enabling O(1) random access via index calculation. However, insertions/deletions in the middle require shifting elements, resulting in O(n) time. Best for read-heavy workloads with infrequent modifications.',
          codeExample: `// ArrayList internal mechanics
public class ArrayList<E> {
    transient Object[] elementData;  // The backing array
    private int size;                // Actual number of elements

    // Default capacity
    private static final int DEFAULT_CAPACITY = 10;

    // Growth calculation
    private int newCapacity(int minCapacity) {
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1);  // 1.5x growth
        return newCapacity;
    }

    // Random access - O(1)
    public E get(int index) {
        rangeCheck(index);
        return elementData[index];
    }

    // Add to end - O(1) amortized
    public boolean add(E e) {
        ensureCapacityInternal(size + 1);
        elementData[size++] = e;
        return true;
    }

    // Add at index - O(n) due to shifting
    public void add(int index, E element) {
        rangeCheckForAdd(index);
        ensureCapacityInternal(size + 1);
        // Shift elements right
        System.arraycopy(elementData, index,
                        elementData, index + 1, size - index);
        elementData[index] = element;
        size++;
    }
}`
        },
        {
          name: 'LinkedList Internals',
          explanation: 'LinkedList is a doubly-linked list where each node contains data, prev, and next references. No contiguous memory needed - nodes can be anywhere in heap. O(1) insertion/deletion at known positions (given a node reference), but O(n) random access since traversal from head/tail is required. Also implements Deque, making it suitable for queue/stack operations. Higher memory overhead per element due to node references.',
          codeExample: `// LinkedList internal structure
public class LinkedList<E> implements List<E>, Deque<E> {
    transient int size = 0;
    transient Node<E> first;  // Head pointer
    transient Node<E> last;   // Tail pointer

    // Node class - doubly linked
    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;

        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }

    // Get by index - O(n) requires traversal
    public E get(int index) {
        checkElementIndex(index);
        return node(index).item;
    }

    // Traverse to find node - optimizes by starting from closer end
    Node<E> node(int index) {
        if (index < (size >> 1)) {
            Node<E> x = first;
            for (int i = 0; i < index; i++)
                x = x.next;
            return x;
        } else {
            Node<E> x = last;
            for (int i = size - 1; i > index; i--)
                x = x.prev;
            return x;
        }
    }

    // Add to end - O(1)
    public boolean add(E e) {
        linkLast(e);
        return true;
    }
}`
        },
        {
          name: 'Performance Comparison',
          explanation: 'ArrayList excels at random access (O(1)) and iteration (cache-friendly). LinkedList wins for frequent insertions/deletions at arbitrary positions when you have an iterator at that position. For add/remove at the end, both are O(1). ArrayList has better memory locality and lower overhead. In practice, ArrayList is preferred in most scenarios unless you specifically need constant-time insertions at the beginning or middle with existing iterators.',
          codeExample: `// Performance comparison examples

// ArrayList - good for random access
List<Integer> arrayList = new ArrayList<>();
for (int i = 0; i < 100000; i++) {
    arrayList.add(i);
}
// Fast: O(1) random access
int value = arrayList.get(50000);  // Direct index calculation

// LinkedList - good for queue operations
LinkedList<Integer> linkedList = new LinkedList<>();
// Fast: O(1) operations at ends
linkedList.addFirst(1);   // No shifting needed
linkedList.addLast(2);
linkedList.removeFirst();
linkedList.removeLast();

// Iteration with removal - LinkedList with Iterator
Iterator<Integer> it = linkedList.iterator();
while (it.hasNext()) {
    if (it.next() % 2 == 0) {
        it.remove();  // O(1) with iterator, O(n) with ArrayList
    }
}

// Memory overhead comparison
// ArrayList: ~4 bytes per element (object reference)
// LinkedList: ~24 bytes per node (item + prev + next + object header)`
        }
      ]
    },
    {
      id: 'set',
      name: 'Set Implementations',
      icon: '\u2705',
      color: '#22c55e',
      description: 'Explore HashSet, TreeSet, and LinkedHashSet - their internal structures and uniqueness guarantees.',
      diagram: SetDiagram,
      details: [
        {
          name: 'HashSet Implementation',
          diagram: SetDiagram,
          explanation: 'HashSet is backed by a HashMap internally - elements are stored as keys with a dummy PRESENT value. This provides O(1) average time for add, remove, and contains operations. Hash collisions are handled using the same bucket chaining/tree mechanism as HashMap. The hashCode() and equals() methods of elements must be consistent for correct behavior. No ordering guarantee - iteration order may change.',
          codeExample: `// HashSet is backed by HashMap
public class HashSet<E> implements Set<E> {
    private transient HashMap<E, Object> map;
    private static final Object PRESENT = new Object();  // Dummy value

    public HashSet() {
        map = new HashMap<>();
    }

    public boolean add(E e) {
        return map.put(e, PRESENT) == null;  // Returns true if new
    }

    public boolean remove(Object o) {
        return map.remove(o) == PRESENT;
    }

    public boolean contains(Object o) {
        return map.containsKey(o);
    }

    public int size() {
        return map.size();
    }
}

// Usage - requires proper hashCode/equals
Set<String> set = new HashSet<>();
set.add("apple");
set.add("banana");
set.add("apple");  // Duplicate, not added
System.out.println(set.size());  // 2

// Custom objects must override hashCode/equals
class Person {
    String name;
    int age;

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) return false;
        Person p = (Person) o;
        return age == p.age && Objects.equals(name, p.name);
    }
}`
        },
        {
          name: 'TreeSet Implementation',
          explanation: 'TreeSet uses a TreeMap internally (Red-Black tree). Elements are stored in sorted order according to natural ordering (Comparable) or a provided Comparator. All operations are O(log n). Provides additional navigation methods like first(), last(), lower(), higher(), floor(), ceiling(). Elements must be mutually comparable. Useful when you need sorted iteration or range queries.',
          codeExample: `// TreeSet with natural ordering
Set<Integer> numbers = new TreeSet<>();
numbers.add(5);
numbers.add(2);
numbers.add(8);
numbers.add(1);
// Iteration order: 1, 2, 5, 8 (sorted)

// TreeSet with custom Comparator
Set<String> byLength = new TreeSet<>((s1, s2) -> {
    int cmp = Integer.compare(s1.length(), s2.length());
    return cmp != 0 ? cmp : s1.compareTo(s2);  // Then alphabetical
});

// NavigableSet methods
TreeSet<Integer> navSet = new TreeSet<>(Arrays.asList(1, 3, 5, 7, 9));
navSet.first();          // 1 (smallest)
navSet.last();           // 9 (largest)
navSet.lower(5);         // 3 (largest < 5)
navSet.floor(5);         // 5 (largest <= 5)
navSet.ceiling(4);       // 5 (smallest >= 4)
navSet.higher(5);        // 7 (smallest > 5)

// Subsets - views, not copies
SortedSet<Integer> sub = navSet.subSet(3, 7);  // [3, 5] (3 inclusive, 7 exclusive)
NavigableSet<Integer> desc = navSet.descendingSet();  // Reverse order view`
        },
        {
          name: 'LinkedHashSet',
          explanation: 'LinkedHashSet extends HashSet and maintains insertion order using a doubly-linked list running through all entries. Combines O(1) operations of HashSet with predictable iteration order. Internally backed by LinkedHashMap. Useful when you need uniqueness with iteration in insertion order. Slightly slower than HashSet due to linked list maintenance overhead.',
          codeExample: `// LinkedHashSet maintains insertion order
Set<String> linkedSet = new LinkedHashSet<>();
linkedSet.add("banana");
linkedSet.add("apple");
linkedSet.add("cherry");
// Iteration order: banana, apple, cherry (insertion order)

// Compare with HashSet
Set<String> hashSet = new HashSet<>();
hashSet.add("banana");
hashSet.add("apple");
hashSet.add("cherry");
// Iteration order: unpredictable

// Internal structure (extends HashSet, backed by LinkedHashMap)
public class LinkedHashSet<E> extends HashSet<E> {
    public LinkedHashSet() {
        super(16, .75f, true);  // Uses LinkedHashMap internally
    }
}

// Use case: Remove duplicates while preserving order
List<String> withDupes = Arrays.asList("a", "b", "a", "c", "b");
List<String> noDupes = new ArrayList<>(new LinkedHashSet<>(withDupes));
// Result: [a, b, c] - first occurrence order preserved

// Performance comparison
// HashSet:       O(1) operations, no order guarantee
// LinkedHashSet: O(1) operations, insertion order preserved
// TreeSet:       O(log n) operations, sorted order`
        }
      ]
    },
    {
      id: 'map',
      name: 'Map Implementations',
      icon: '\uD83D\uDDFA\uFE0F',
      color: '#ec4899',
      description: 'Master HashMap internals including hashing, collision resolution, and the tree-ification threshold.',
      diagram: MapDiagram,
      details: [
        {
          name: 'HashMap Internals',
          diagram: MapDiagram,
          explanation: 'HashMap uses an array of buckets (Node<K,V>[]). Key hashcode is spread using (h ^ h >>> 16) to reduce collisions. Bucket index = (n-1) & hash. Collisions handled by chaining (linked list). When a bucket exceeds 8 nodes AND table size >= 64, the chain converts to a Red-Black tree for O(log n) worst-case. Default load factor 0.75 triggers resize when size > capacity * 0.75. Resize doubles capacity and rehashes all entries.',
          codeExample: `// HashMap internal structure
public class HashMap<K,V> {
    transient Node<K,V>[] table;
    int threshold;  // capacity * loadFactor
    final float loadFactor;

    static final int DEFAULT_INITIAL_CAPACITY = 16;
    static final float DEFAULT_LOAD_FACTOR = 0.75f;
    static final int TREEIFY_THRESHOLD = 8;
    static final int MIN_TREEIFY_CAPACITY = 64;

    // Node for chaining
    static class Node<K,V> implements Map.Entry<K,V> {
        final int hash;
        final K key;
        V value;
        Node<K,V> next;
    }

    // Hash spreading function
    static final int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }

    // Put operation
    public V put(K key, V value) {
        int hash = hash(key);
        int index = (n - 1) & hash;  // Bucket index

        // Check existing nodes in bucket
        // If found, update value
        // If not found, add new node
        // If chain length > TREEIFY_THRESHOLD, treeify
        // If size > threshold, resize
    }
}`
        },
        {
          name: 'TreeMap Implementation',
          explanation: 'TreeMap is a Red-Black tree implementation providing O(log n) operations. Keys are sorted by natural order or Comparator. Provides NavigableMap methods for range queries: subMap(), headMap(), tailMap(), firstKey(), lastKey(). No null keys allowed (throws NPE). Useful when you need sorted key iteration or efficient range queries. Thread-unsafe like HashMap.',
          codeExample: `// TreeMap - sorted by keys
Map<String, Integer> treeMap = new TreeMap<>();
treeMap.put("banana", 2);
treeMap.put("apple", 1);
treeMap.put("cherry", 3);
// Keys in order: apple, banana, cherry

// NavigableMap operations
TreeMap<Integer, String> scores = new TreeMap<>();
scores.put(85, "B");
scores.put(90, "A");
scores.put(70, "C");
scores.put(60, "D");

scores.firstKey();        // 60 (lowest)
scores.lastKey();         // 90 (highest)
scores.lowerKey(85);      // 70 (greatest key < 85)
scores.floorKey(85);      // 85 (greatest key <= 85)
scores.ceilingKey(75);    // 85 (least key >= 75)
scores.higherKey(85);     // 90 (least key > 85)

// Range views (backed by original map)
SortedMap<Integer, String> passing = scores.tailMap(70);  // >= 70
SortedMap<Integer, String> failing = scores.headMap(70);  // < 70

// Descending order
NavigableMap<Integer, String> desc = scores.descendingMap();

// Custom Comparator
Map<String, Integer> byLengthDesc = new TreeMap<>(
    Comparator.comparingInt(String::length).reversed()
);`
        },
        {
          name: 'LinkedHashMap & Access Order',
          explanation: 'LinkedHashMap maintains a doubly-linked list of entries. By default, preserves insertion order. Can be configured for access-order (LRU behavior) by setting accessOrder=true in constructor. The removeEldestEntry() method can be overridden to implement bounded caches. Perfect for implementing LRU cache with O(1) operations. Slightly more memory overhead than HashMap.',
          codeExample: `// LinkedHashMap - insertion order (default)
Map<String, Integer> insertionOrder = new LinkedHashMap<>();
insertionOrder.put("one", 1);
insertionOrder.put("two", 2);
insertionOrder.put("three", 3);
// Iteration: one, two, three

// Access-order mode (LRU behavior)
Map<String, Integer> accessOrder = new LinkedHashMap<>(16, 0.75f, true);
accessOrder.put("a", 1);
accessOrder.put("b", 2);
accessOrder.put("c", 3);
accessOrder.get("a");  // Moves "a" to end
// Iteration now: b, c, a

// LRU Cache implementation
class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int maxSize;

    public LRUCache(int maxSize) {
        super(maxSize, 0.75f, true);  // accessOrder = true
        this.maxSize = maxSize;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > maxSize;  // Remove oldest when over capacity
    }
}

// Usage
LRUCache<String, String> cache = new LRUCache<>(3);
cache.put("a", "1");
cache.put("b", "2");
cache.put("c", "3");
cache.get("a");        // Access "a", moves to end
cache.put("d", "4");   // Exceeds capacity, removes "b" (least recently used)
// Contains: c, a, d`
        }
      ]
    },
    {
      id: 'queue',
      name: 'Queue & Deque',
      icon: '\uD83D\uDCE5',
      color: '#f59e0b',
      description: 'Learn PriorityQueue, ArrayDeque, and how to choose between them for different use cases.',
      diagram: QueueDequeDiagram,
      details: [
        {
          name: 'PriorityQueue',
          diagram: QueueDequeDiagram,
          explanation: 'PriorityQueue implements a min-heap (by default). Elements are ordered by natural order or Comparator. poll() returns and removes the smallest element. peek() returns without removal. O(log n) for offer/poll, O(1) for peek. Internally uses a binary heap stored in an array. Not thread-safe. Use PriorityBlockingQueue for concurrent access. Does not permit null elements.',
          codeExample: `// Min-heap (default) - smallest element at head
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5);
minHeap.offer(2);
minHeap.offer(8);
minHeap.offer(1);

minHeap.peek();   // 1 (smallest, not removed)
minHeap.poll();   // 1 (smallest, removed)
minHeap.poll();   // 2

// Max-heap using Comparator
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(
    Comparator.reverseOrder()
);
// Or: new PriorityQueue<>((a, b) -> b - a);

// Custom objects - must be Comparable or provide Comparator
PriorityQueue<Task> taskQueue = new PriorityQueue<>(
    Comparator.comparingInt(Task::getPriority)
);

// Common use cases:
// 1. Finding k largest/smallest elements
// 2. Merge k sorted lists
// 3. Task scheduling by priority
// 4. Dijkstra's shortest path algorithm

// Binary heap array representation
// Parent at index i: children at 2i+1 and 2i+2
// Child at index i: parent at (i-1)/2
// [1, 2, 5, 8] represents:
//       1
//      / \\
//     2   5
//    /
//   8`
        },
        {
          name: 'ArrayDeque',
          explanation: 'ArrayDeque is a resizable circular array implementation of Deque. Supports both stack (LIFO) and queue (FIFO) operations. Faster than Stack class and LinkedList for stack/queue use. O(1) amortized for all deque operations. No capacity restrictions except memory. Null elements not permitted. Preferred over LinkedList for deque operations due to better cache locality.',
          codeExample: `// ArrayDeque as Stack (LIFO)
Deque<String> stack = new ArrayDeque<>();
stack.push("first");   // addFirst()
stack.push("second");
stack.push("third");

stack.peek();   // "third" (top, not removed)
stack.pop();    // "third" (removed)
stack.pop();    // "second"

// ArrayDeque as Queue (FIFO)
Deque<String> queue = new ArrayDeque<>();
queue.offer("first");   // addLast()
queue.offer("second");
queue.offer("third");

queue.peek();   // "first" (head, not removed)
queue.poll();   // "first" (removed)
queue.poll();   // "second"

// Double-ended operations
Deque<String> deque = new ArrayDeque<>();
deque.addFirst("B");
deque.addLast("C");
deque.addFirst("A");
// Deque: A, B, C

deque.peekFirst();   // "A"
deque.peekLast();    // "C"
deque.pollFirst();   // "A"
deque.pollLast();    // "C"

// Prefer ArrayDeque over:
// - Stack class (legacy, synchronized overhead)
// - LinkedList (more memory, worse cache locality)

// Circular array implementation:
// head and tail pointers wrap around
// Resize when full (doubles capacity)`
        },
        {
          name: 'Blocking Queues',
          explanation: 'BlockingQueue interface extends Queue with blocking operations. put() blocks until space available. take() blocks until element available. Designed for producer-consumer patterns. Implementations: ArrayBlockingQueue (bounded), LinkedBlockingQueue (optionally bounded), PriorityBlockingQueue (unbounded priority), SynchronousQueue (zero capacity handoff). Thread-safe with internal locking.',
          codeExample: `import java.util.concurrent.*;

// ArrayBlockingQueue - bounded, fair optional
BlockingQueue<String> bounded = new ArrayBlockingQueue<>(10);
bounded.put("item");     // Blocks if full
bounded.take();          // Blocks if empty
bounded.offer("item", 1, TimeUnit.SECONDS);  // Timeout

// LinkedBlockingQueue - optionally bounded
BlockingQueue<String> unbounded = new LinkedBlockingQueue<>();
BlockingQueue<String> limited = new LinkedBlockingQueue<>(100);

// Producer-Consumer pattern
class Producer implements Runnable {
    private BlockingQueue<String> queue;

    public void run() {
        try {
            queue.put(produce());  // Blocks if full
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

class Consumer implements Runnable {
    private BlockingQueue<String> queue;

    public void run() {
        try {
            consume(queue.take());  // Blocks if empty
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

// SynchronousQueue - direct handoff
BlockingQueue<String> handoff = new SynchronousQueue<>();
// put() blocks until take() is called by another thread
// No internal capacity - direct producer to consumer transfer`
        }
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced Patterns',
      icon: '\u26A1',
      color: '#06b6d4',
      description: 'Master LRU Cache implementation, Iterator patterns, and concurrent collection considerations.',
      diagram: LRUCacheDiagram,
      details: [
        {
          name: 'LRU Cache Design',
          diagram: LRUCacheDiagram,
          explanation: 'LRU Cache uses HashMap for O(1) key lookup combined with Doubly Linked List for O(1) recency updates. HashMap stores key -> Node mappings. Linked list maintains access order (most recent at tail, least recent at head). On get(): move node to tail. On put(): add to tail, if capacity exceeded, remove from head. Both operations are O(1). This is a common interview question and demonstrates understanding of combining data structures.',
          codeExample: `class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private Map<Integer, Node> cache = new HashMap<>();
    private Node head, tail;  // Sentinel nodes
    private int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!cache.containsKey(key)) return -1;
        Node node = cache.get(key);
        moveToTail(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            node.value = value;
            moveToTail(node);
        } else {
            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            addToTail(newNode);
            if (cache.size() > capacity) {
                Node lru = head.next;
                removeNode(lru);
                cache.remove(lru.key);
            }
        }
    }

    private void moveToTail(Node node) {
        removeNode(node);
        addToTail(node);
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void addToTail(Node node) {
        node.prev = tail.prev;
        node.next = tail;
        tail.prev.next = node;
        tail.prev = node;
    }
}`
        },
        {
          name: 'Iterator & Fail-Fast',
          diagram: IteratorDiagram,
          explanation: 'Iterators provide a uniform way to traverse collections. Fail-fast iterators detect concurrent modifications by tracking a modification count (modCount). If the collection is structurally modified during iteration (except through the iterator itself), ConcurrentModificationException is thrown. Use Iterator.remove() for safe removal during iteration. For concurrent access, use CopyOnWriteArrayList or ConcurrentHashMap.newKeySet() which have weakly consistent iterators.',
          codeExample: `// Fail-fast behavior
List<String> list = new ArrayList<>(Arrays.asList("a", "b", "c"));

// WRONG - ConcurrentModificationException
for (String s : list) {
    if (s.equals("b")) {
        list.remove(s);  // Structural modification during iteration
    }
}

// CORRECT - Use Iterator.remove()
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("b")) {
        it.remove();  // Safe - uses iterator's own remove
    }
}

// CORRECT - Use removeIf (Java 8+)
list.removeIf(s -> s.equals("b"));

// Concurrent collections - weakly consistent iterators
CopyOnWriteArrayList<String> cowList = new CopyOnWriteArrayList<>();
cowList.add("a");
for (String s : cowList) {
    cowList.add("new");  // OK - iterates over snapshot
}

// ConcurrentHashMap - no CME
ConcurrentHashMap<String, Integer> concMap = new ConcurrentHashMap<>();
for (String key : concMap.keySet()) {
    concMap.put("newKey", 1);  // OK - weakly consistent
}

// ListIterator - bidirectional, can modify
ListIterator<String> listIt = list.listIterator();
while (listIt.hasNext()) {
    String s = listIt.next();
    listIt.set(s.toUpperCase());  // Replace current
    listIt.add("inserted");        // Insert after current
}`
        },
        {
          name: 'Utility Methods',
          explanation: 'Collections utility class provides static methods for sorting, searching, shuffling, and wrapping. Arrays.asList() creates a fixed-size list backed by the array. Collections.unmodifiableXxx() creates read-only views. Collections.synchronizedXxx() wraps with synchronized access. Collections.sort() uses TimSort (hybrid merge+insertion). Binary search requires sorted collection.',
          codeExample: `import java.util.*;

// Sorting
List<Integer> nums = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5));
Collections.sort(nums);  // Natural order: [1, 1, 3, 4, 5]
Collections.sort(nums, Collections.reverseOrder());  // Descending

// Searching (must be sorted first!)
Collections.sort(nums);
int index = Collections.binarySearch(nums, 3);  // Returns index or -(insertion point)-1

// Shuffling
Collections.shuffle(nums);
Collections.shuffle(nums, new Random(42));  // Reproducible

// Min/Max
int min = Collections.min(nums);
int max = Collections.max(nums, Comparator.reverseOrder());

// Frequency
int count = Collections.frequency(nums, 1);  // Count occurrences

// Immutable collections (Java 9+)
List<String> immutable = List.of("a", "b", "c");
Set<String> immutableSet = Set.of("a", "b", "c");
Map<String, Integer> immutableMap = Map.of("a", 1, "b", 2);

// Unmodifiable wrappers (view only)
List<String> unmod = Collections.unmodifiableList(new ArrayList<>(list));
// unmod.add("x");  // UnsupportedOperationException

// Synchronized wrappers (thread-safe)
List<String> syncList = Collections.synchronizedList(new ArrayList<>());
Map<String, Integer> syncMap = Collections.synchronizedMap(new HashMap<>());
// Note: Iteration still needs external synchronization

// Singleton/Empty collections
List<String> single = Collections.singletonList("only");
List<String> empty = Collections.emptyList();
Set<String> emptySet = Collections.emptySet();`
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
      { name: 'Java', icon: '\u2615', page: 'Java' },
      { name: 'Collections Framework', icon: '\uD83D\uDDC2\uFE0F', page: 'CollectionsFramework' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #7c2d12 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #fb923c, #f97316)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(249, 115, 22, 0.2)',
    border: '1px solid rgba(249, 115, 22, 0.3)',
    borderRadius: '0.5rem',
    color: '#fb923c',
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
        <h1 style={titleStyle}>Collections Framework</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(249, 115, 22, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(249, 115, 22, 0.2)'
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
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={COLLECTIONS_COLORS}
        />
      </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={COLLECTIONS_COLORS.primary}
      />


      {/* Practice Exercises Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
        <h2 style={{ color: '#f97316', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>📝</span> Practice Exercises</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Click on an exercise to practice. Complete the code challenge and mark as done.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {practiceProblems.map((problem) => {
            const problemId = `CollectionsFramework-${problem.id}`
            const isCompleted = isProblemCompleted(problemId)
            return (
              <div key={problem.id} onClick={() => openProblem(problem)} style={{ background: isCompleted ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 41, 59, 0.8)', borderRadius: '0.75rem', padding: '1rem', border: `1px solid ${isCompleted ? '#22c55e' : '#334155'}`, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.2)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isCompleted ? '#22c55e' : '#334155'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem' }}>{problem.title}</h4>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: problem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : problem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: problem.difficulty === 'Easy' ? '#22c55e' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{problem.difficulty}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0', lineHeight: '1.4' }}>{problem.description}</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.5rem 0', fontStyle: 'italic' }}>{problem.example}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', fontSize: '0.8rem', fontWeight: '500' }}>Click to practice →</span>
                  <div onClick={(e) => e.stopPropagation()}><CompletionCheckbox problemId={problemId} compact /></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Practice Problem Modal */}
      {selectedProblem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={closeProblem}>
          <div style={{ backgroundColor: '#1f2937', borderRadius: '1rem', width: '95vw', maxWidth: '1400px', height: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid #f97316' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ color: '#e2e8f0', margin: 0, fontSize: '1.5rem' }}>{selectedProblem.title}</h2>
                <span style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', backgroundColor: selectedProblem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : selectedProblem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: selectedProblem.difficulty === 'Easy' ? '#22c55e' : selectedProblem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{selectedProblem.difficulty}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CompletionCheckbox problemId={`CollectionsFramework-${selectedProblem.id}`} compact />
                <button onClick={closeProblem} style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', color: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>✕ Close</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderRight: '1px solid #374151', overflowY: 'auto' }}>
                <h3 style={{ color: '#f97316', marginTop: 0, marginBottom: '1rem' }}>📋 Instructions</h3>
                <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{selectedProblem.instructions.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: '#e2e8f0' }}>{part}</strong> : part)}</div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedProblem.solution) }} style={{ padding: '0.5rem 1rem', backgroundColor: showSolution ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>{showSolution ? '🔒 Hide Solution' : '💡 Show Solution'}</button>
                  <button onClick={() => { setUserCode(selectedProblem.starterCode); setShowSolution(false) }} style={{ padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>🔄 Reset Code</button>
                  <button onClick={() => navigator.clipboard.writeText(userCode)} style={{ padding: '0.5rem 1rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>📋 Copy Code</button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '0.9rem', backgroundColor: '#111827', color: '#e2e8f0', border: '1px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.75rem', marginBottom: 0 }}>💡 Copy this code to your IDE to run and test. Mark as complete when you've solved it!</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
              {concept.details.length} topics - Click to explore
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
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={COLLECTIONS_COLORS}
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

export default CollectionsFramework

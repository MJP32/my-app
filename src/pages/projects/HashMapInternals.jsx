/**
 * HashMap Internals - Deep dive into Java HashMap implementation
 *
 * Uses tab_template format with modal-based navigation
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const HASHMAP_COLORS = {
  primary: '#fb923c',           // Orange-400
  primaryHover: '#fdba74',      // Orange-300
  bg: 'rgba(249, 115, 22, 0.1)', // Orange with transparency
  border: 'rgba(249, 115, 22, 0.3)',
  arrow: '#f97316',             // Orange-500
  hoverBg: 'rgba(249, 115, 22, 0.2)',
  topicBg: 'rgba(249, 115, 22, 0.2)'
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

const HashTableDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      HashMap Internal Structure (Bucket Array)
    </text>

    {/* Bucket array */}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <g key={i}>
        <rect x={50 + i * 90} y="50" width="80" height="40" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
        <text x={90 + i * 90} y="75" textAnchor="middle" fill="#94a3b8" fontSize="11">[{i}]</text>
      </g>
    ))}

    {/* Nodes in buckets */}
    <rect x="50" y="110" width="80" height="50" rx="6" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="90" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">K: "apple"</text>
    <text x="90" y="145" textAnchor="middle" fill="white" fontSize="10">V: 1</text>
    <line x1="90" y1="90" x2="90" y2="105" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowOrange)"/>

    <rect x="230" y="110" width="80" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="270" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">K: "cat"</text>
    <text x="270" y="145" textAnchor="middle" fill="white" fontSize="10">V: 3</text>
    <line x1="270" y1="90" x2="270" y2="105" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowOrange)"/>

    {/* Collision chain at bucket 5 */}
    <rect x="500" y="110" width="80" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="540" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">K: "dog"</text>
    <text x="540" y="145" textAnchor="middle" fill="white" fontSize="10">V: 4</text>
    <line x1="540" y1="90" x2="540" y2="105" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowOrange)"/>

    <rect x="500" y="180" width="80" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="540" y="200" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">K: "elk"</text>
    <text x="540" y="215" textAnchor="middle" fill="white" fontSize="10">V: 5</text>
    <line x1="540" y1="160" x2="540" y2="175" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowOrange)"/>

    <text x="620" y="195" fill="#ef4444" fontSize="10" fontWeight="bold">Collision!</text>
    <text x="620" y="210" fill="#94a3b8" fontSize="9">Linked list</text>

    {/* Labels */}
    <text x="400" y="265" textAnchor="middle" fill="#64748b" fontSize="11">
      table[] - Node array with capacity as power of 2 (default: 16)
    </text>
  </svg>
)

const HashFunctionDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Hash Function and Index Calculation
    </text>

    {/* Key input */}
    <rect x="30" y="60" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Key</text>
    <text x="80" y="97" textAnchor="middle" fill="#bfdbfe" fontSize="10">"apple"</text>

    <line x1="130" y1="85" x2="165" y2="85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>

    {/* hashCode() */}
    <rect x="170" y="60" width="120" height="50" rx="8" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="230" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">hashCode()</text>
    <text x="230" y="97" textAnchor="middle" fill="#fed7aa" fontSize="10">96354</text>

    <line x1="290" y1="85" x2="325" y2="85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>

    {/* hash() spread */}
    <rect x="330" y="60" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="390" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">hash()</text>
    <text x="390" y="97" textAnchor="middle" fill="#ddd6fe" fontSize="10">{`h ^ (h >>> 16)`}</text>

    <line x1="450" y1="85" x2="485" y2="85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>

    {/* Index calculation */}
    <rect x="490" y="60" width="130" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="555" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`(n-1) & hash`}</text>
    <text x="555" y="97" textAnchor="middle" fill="#bbf7d0" fontSize="10">{`15 & 96355 = 3`}</text>

    <line x1="620" y1="85" x2="655" y2="85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>

    {/* Bucket */}
    <rect x="660" y="60" width="100" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="710" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Bucket [3]</text>
    <text x="710" y="97" textAnchor="middle" fill="#fecaca" fontSize="10">Insert here</text>

    {/* Formula */}
    <text x="400" y="145" textAnchor="middle" fill="#94a3b8" fontSize="11">{`
      Why (n-1) & hash? Faster than modulo, works because n is power of 2
    `}</text>
    <text x="400" y="165" textAnchor="middle" fill="#64748b" fontSize="10">{`
      n=16, n-1=15 (binary: 1111). hash & 1111 gives values 0-15
    `}</text>
  </svg>
)

const CollisionDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Collision Handling with Chaining
    </text>

    {/* Bucket header */}
    <rect x="50" y="50" width="100" height="40" rx="4" fill="#1e293b" stroke="#f97316" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Bucket [5]</text>

    {/* First node */}
    <rect x="50" y="110" width="100" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">hash: 21</text>
    <text x="100" y="145" textAnchor="middle" fill="white" fontSize="10">key: "dog"</text>
    <text x="100" y="160" textAnchor="middle" fill="white" fontSize="10">value: 4</text>
    <line x1="100" y1="90" x2="100" y2="105" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowBlue)"/>

    <line x1="150" y1="140" x2="195" y2="140" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
    <text x="172" y="130" textAnchor="middle" fill="#64748b" fontSize="9">next</text>

    {/* Second node */}
    <rect x="200" y="110" width="100" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="250" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">hash: 37</text>
    <text x="250" y="145" textAnchor="middle" fill="white" fontSize="10">key: "elk"</text>
    <text x="250" y="160" textAnchor="middle" fill="white" fontSize="10">value: 5</text>

    <line x1="300" y1="140" x2="345" y2="140" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
    <text x="322" y="130" textAnchor="middle" fill="#64748b" fontSize="9">next</text>

    {/* Third node */}
    <rect x="350" y="110" width="100" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">hash: 53</text>
    <text x="400" y="145" textAnchor="middle" fill="white" fontSize="10">key: "fox"</text>
    <text x="400" y="160" textAnchor="middle" fill="white" fontSize="10">value: 6</text>

    <text x="480" y="145" fill="#64748b" fontSize="10">next = null</text>

    {/* Java 8+ tree note */}
    <rect x="520" y="90" width="250" height="90" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1"/>
    <text x="645" y="115" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Java 8+ Optimization</text>
    <text x="645" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">{`When bucket size >= 8:`}</text>
    <text x="645" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">{`Linked list -> Red-Black Tree`}</text>
    <text x="645" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">{`O(n) -> O(log n) worst case`}</text>

    <text x="250" y="210" textAnchor="middle" fill="#64748b" fontSize="11">{`
      All three keys hash to same bucket index: (n-1) & hash = 5
    `}</text>
  </svg>
)

const TreeifyDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Treeification: Linked List to Red-Black Tree
    </text>

    {/* Before - Linked List */}
    <text x="200" y="55" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Before (Linked List)</text>

    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <g key={i}>
        <rect x={40 + i * 40} y="70" width="35" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
        <text x={57 + i * 40} y="90" textAnchor="middle" fill="white" fontSize="9">N{i+1}</text>
        {i < 7 && <line x1={75 + i * 40} y1="85" x2={80 + i * 40} y2="85" stroke="#64748b" strokeWidth="1"/>}
      </g>
    ))}
    <text x="200" y="120" textAnchor="middle" fill="#ef4444" fontSize="10">O(n) search time</text>

    {/* Arrow */}
    <text x="400" y="90" textAnchor="middle" fill="#22c55e" fontSize="24">→</text>
    <text x="400" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">{`size >= 8`}</text>

    {/* After - Red-Black Tree */}
    <text x="600" y="55" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">After (Red-Black Tree)</text>

    {/* Root */}
    <circle cx="600" cy="90" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
    <text x="600" y="95" textAnchor="middle" fill="white" fontSize="10">N4</text>
    <text x="625" y="85" fill="#64748b" fontSize="8">(Black)</text>

    {/* Level 2 */}
    <line x1="585" y1="105" x2="540" y2="135" stroke="#64748b" strokeWidth="1"/>
    <line x1="615" y1="105" x2="660" y2="135" stroke="#64748b" strokeWidth="1"/>

    <circle cx="540" cy="150" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="540" y="155" textAnchor="middle" fill="white" fontSize="10">N2</text>

    <circle cx="660" cy="150" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="660" y="155" textAnchor="middle" fill="white" fontSize="10">N6</text>

    {/* Level 3 */}
    <line x1="525" y1="165" x2="495" y2="195" stroke="#64748b" strokeWidth="1"/>
    <line x1="555" y1="165" x2="585" y2="195" stroke="#64748b" strokeWidth="1"/>
    <line x1="645" y1="165" x2="615" y2="195" stroke="#64748b" strokeWidth="1"/>
    <line x1="675" y1="165" x2="705" y2="195" stroke="#64748b" strokeWidth="1"/>

    <circle cx="495" cy="210" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
    <text x="495" y="215" textAnchor="middle" fill="white" fontSize="10">N1</text>

    <circle cx="585" cy="210" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
    <text x="585" y="215" textAnchor="middle" fill="white" fontSize="10">N3</text>

    <circle cx="615" cy="210" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
    <text x="615" y="215" textAnchor="middle" fill="white" fontSize="10">N5</text>

    <circle cx="705" cy="210" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
    <text x="705" y="215" textAnchor="middle" fill="white" fontSize="10">N7</text>

    {/* Level 4 */}
    <line x1="720" y1="225" x2="740" y2="255" stroke="#64748b" strokeWidth="1"/>
    <circle cx="750" cy="270" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="750" y="275" textAnchor="middle" fill="white" fontSize="10">N8</text>

    <text x="600" y="305" textAnchor="middle" fill="#22c55e" fontSize="10">O(log n) search time</text>

    {/* Thresholds */}
    <rect x="40" y="150" width="280" height="70" rx="6" fill="rgba(249, 115, 22, 0.1)" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1"/>
    <text x="180" y="175" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="bold">Thresholds</text>
    <text x="180" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">{`TREEIFY_THRESHOLD = 8 (list -> tree)`}</text>
    <text x="180" y="210" textAnchor="middle" fill="#94a3b8" fontSize="10">{`UNTREEIFY_THRESHOLD = 6 (tree -> list)`}</text>
  </svg>
)

const ResizeDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowResize" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Resizing (Rehashing) - Doubling Capacity
    </text>

    {/* Old table */}
    <text x="120" y="55" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Old Table (n=4)</text>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={40 + i * 60} y="65" width="50" height="35" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
        <text x={65 + i * 60} y="87" textAnchor="middle" fill="#94a3b8" fontSize="10">[{i}]</text>
      </g>
    ))}

    {/* Nodes in old table */}
    <rect x="40" y="110" width="50" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="65" y="130" textAnchor="middle" fill="white" fontSize="9">h=4</text>

    <rect x="100" y="110" width="50" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="125" y="130" textAnchor="middle" fill="white" fontSize="9">h=5</text>

    <rect x="160" y="110" width="50" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="185" y="130" textAnchor="middle" fill="white" fontSize="9">h=10</text>

    <rect x="220" y="110" width="50" height="30" rx="4" fill="#f97316" stroke="#fb923c" strokeWidth="1"/>
    <text x="245" y="130" textAnchor="middle" fill="white" fontSize="9">h=7</text>

    {/* Arrow */}
    <text x="300" y="105" fill="#22c55e" fontSize="20">→</text>
    <text x="300" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">{`size > threshold`}</text>
    <text x="300" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">resize()</text>

    {/* New table */}
    <text x="545" y="55" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">New Table (n=8)</text>
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <g key={i}>
        <rect x={340 + i * 55} y="65" width="45" height="35" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
        <text x={362 + i * 55} y="87" textAnchor="middle" fill="#94a3b8" fontSize="10">[{i}]</text>
      </g>
    ))}

    {/* Redistributed nodes */}
    <rect x="340" y="110" width="45" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="362" y="130" textAnchor="middle" fill="white" fontSize="9">h=4</text>
    <text x="362" y="155" textAnchor="middle" fill="#64748b" fontSize="8">{`4&7=4`}</text>

    <rect x="395" y="110" width="45" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="417" y="130" textAnchor="middle" fill="white" fontSize="9">h=5</text>
    <text x="417" y="155" textAnchor="middle" fill="#64748b" fontSize="8">{`5&7=5`}</text>

    <rect x="450" y="110" width="45" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="472" y="130" textAnchor="middle" fill="white" fontSize="9">h=10</text>
    <text x="472" y="155" textAnchor="middle" fill="#64748b" fontSize="8">{`10&7=2`}</text>

    <rect x="560" y="110" width="45" height="30" rx="4" fill="#f97316" stroke="#fb923c" strokeWidth="1"/>
    <text x="582" y="130" textAnchor="middle" fill="white" fontSize="9">h=7</text>
    <text x="582" y="155" textAnchor="middle" fill="#64748b" fontSize="8">{`7&7=7`}</text>

    {/* Formula box */}
    <rect x="40" y="180" width="720" height="80" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
    <text x="400" y="205" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Resize Optimization (Java 8+)</text>
    <text x="400" y="225" textAnchor="middle" fill="#94a3b8" fontSize="10">
      Entries either stay at same index OR move to (index + oldCapacity)
    </text>
    <text x="400" y="245" textAnchor="middle" fill="#94a3b8" fontSize="10">{`
      Check: (hash & oldCap) == 0 ? stay : move. No need to recalculate hash!
    `}</text>
  </svg>
)

const NodeDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Node Structure - Building Block of HashMap
    </text>

    {/* Main Node box */}
    <rect x="250" y="50" width="300" height="130" rx="10" fill="#1e293b" stroke="#f97316" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">{`Node&lt;K,V&gt;`}</text>

    {/* Fields */}
    <rect x="270" y="90" width="120" height="35" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="330" y="112" textAnchor="middle" fill="white" fontSize="10">final int hash</text>

    <rect x="410" y="90" width="120" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="470" y="112" textAnchor="middle" fill="white" fontSize="10">final K key</text>

    <rect x="270" y="135" width="120" height="35" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="330" y="157" textAnchor="middle" fill="white" fontSize="10">V value</text>

    <rect x="410" y="135" width="120" height="35" rx="4" fill="#f97316" stroke="#fb923c" strokeWidth="1"/>
    <text x="470" y="157" textAnchor="middle" fill="white" fontSize="10">Node next</text>

    {/* Annotations */}
    <text x="120" y="110" textAnchor="middle" fill="#64748b" fontSize="9">Cached for</text>
    <text x="120" y="125" textAnchor="middle" fill="#64748b" fontSize="9">fast comparison</text>
    <line x1="170" y1="117" x2="265" y2="107" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>

    <text x="680" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Points to next</text>
    <text x="680" y="165" textAnchor="middle" fill="#64748b" fontSize="9">node in bucket</text>
    <line x1="630" y1="157" x2="535" y2="152" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
  </svg>
)

const PutOperationDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowPut" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      put() Operation Flow
    </text>

    {/* Step 1: Calculate hash */}
    <rect x="30" y="50" width="140" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1. Calculate hash</text>
    <text x="100" y="87" textAnchor="middle" fill="#bfdbfe" fontSize="9">hash(key)</text>

    <line x1="170" y1="75" x2="195" y2="75" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowPut)"/>

    {/* Step 2: Find index */}
    <rect x="200" y="50" width="140" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="270" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2. Find bucket</text>
    <text x="270" y="87" textAnchor="middle" fill="#bbf7d0" fontSize="9">{`(n-1) & hash`}</text>

    <line x1="340" y1="75" x2="365" y2="75" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowPut)"/>

    {/* Step 3: Check bucket */}
    <rect x="370" y="50" width="140" height="50" rx="8" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="440" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3. Check bucket</text>
    <text x="440" y="87" textAnchor="middle" fill="#fed7aa" fontSize="9">empty or not?</text>

    {/* Branch: Empty bucket */}
    <line x1="440" y1="100" x2="440" y2="125" stroke="#22c55e" strokeWidth="2"/>
    <line x1="440" y1="125" x2="280" y2="125" stroke="#22c55e" strokeWidth="2"/>
    <line x1="280" y1="125" x2="280" y2="145" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowPut)"/>
    <text x="360" y="120" textAnchor="middle" fill="#22c55e" fontSize="9">empty</text>

    <rect x="200" y="150" width="160" height="45" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="280" y="170" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Create new Node</text>
    <text x="280" y="185" textAnchor="middle" fill="#ddd6fe" fontSize="9">table[index] = new Node</text>

    {/* Branch: Not empty */}
    <line x1="510" y1="75" x2="535" y2="75" stroke="#f97316" strokeWidth="2"/>
    <line x1="535" y1="75" x2="535" y2="155" stroke="#f97316" strokeWidth="2"/>
    <line x1="535" y1="155" x2="560" y2="155" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowPut)"/>
    <text x="555" y="60" fill="#f97316" fontSize="9">not empty</text>

    {/* Step 4: Traverse/Update */}
    <rect x="565" y="130" width="180" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="655" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">4. Traverse bucket</text>
    <text x="655" y="167" textAnchor="middle" fill="#fbcfe8" fontSize="9">check key equality</text>

    {/* Sub-branches */}
    <line x1="655" y1="180" x2="655" y2="200" stroke="#64748b" strokeWidth="2"/>
    <line x1="655" y1="200" x2="520" y2="200" stroke="#64748b" strokeWidth="2"/>
    <line x1="520" y1="200" x2="520" y2="220" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowPut)"/>
    <text x="590" y="195" textAnchor="middle" fill="#64748b" fontSize="9">key exists</text>

    <rect x="440" y="225" width="160" height="40" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="1"/>
    <text x="520" y="250" textAnchor="middle" fill="#4ade80" fontSize="10">Update value</text>

    <line x1="655" y1="200" x2="750" y2="200" stroke="#64748b" strokeWidth="2"/>
    <line x1="750" y1="200" x2="750" y2="220" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowPut)"/>
    <text x="710" y="195" textAnchor="middle" fill="#64748b" fontSize="9">new key</text>

    <rect x="670" y="225" width="160" height="40" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
    <text x="750" y="250" textAnchor="middle" fill="#60a5fa" fontSize="10">Append new Node</text>

    {/* Step 5: Check resize */}
    <rect x="30" y="290" width="200" height="45" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="130" y="310" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">5. Check threshold</text>
    <text x="130" y="325" textAnchor="middle" fill="#fecaca" fontSize="9">{`if (size > threshold) resize()`}</text>

    <line x1="200" y1="195" x2="130" y2="195" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <line x1="130" y1="195" x2="130" y2="285" stroke="#64748b" strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrowPut)"/>
  </svg>
)

const GetOperationDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowGet" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      get() Operation Flow
    </text>

    {/* Step 1 */}
    <rect x="30" y="50" width="130" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="95" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1. hash(key)</text>
    <text x="95" y="87" textAnchor="middle" fill="#bfdbfe" fontSize="9">Get hash value</text>

    <line x1="160" y1="75" x2="185" y2="75" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGet)"/>

    {/* Step 2 */}
    <rect x="190" y="50" width="130" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="255" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2. Find bucket</text>
    <text x="255" y="87" textAnchor="middle" fill="#bbf7d0" fontSize="9">{`(n-1) & hash`}</text>

    <line x1="320" y1="75" x2="345" y2="75" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGet)"/>

    {/* Step 3 */}
    <rect x="350" y="50" width="130" height="50" rx="8" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="415" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3. Check first</text>
    <text x="415" y="87" textAnchor="middle" fill="#fed7aa" fontSize="9">first == null?</text>

    {/* Branch: null */}
    <line x1="415" y1="100" x2="415" y2="130" stroke="#ef4444" strokeWidth="2"/>
    <line x1="415" y1="130" x2="350" y2="130" stroke="#ef4444" strokeWidth="2"/>
    <line x1="350" y1="130" x2="350" y2="155" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowGet)"/>
    <text x="380" y="125" textAnchor="middle" fill="#ef4444" fontSize="9">null</text>

    <rect x="290" y="160" width="120" height="35" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1"/>
    <text x="350" y="183" textAnchor="middle" fill="#f87171" fontSize="10">return null</text>

    {/* Branch: not null */}
    <line x1="480" y1="75" x2="505" y2="75" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGet)"/>
    <text x="490" y="60" fill="#22c55e" fontSize="9">exists</text>

    {/* Step 4 */}
    <rect x="510" y="50" width="130" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="575" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">4. Compare key</text>
    <text x="575" y="87" textAnchor="middle" fill="#ddd6fe" fontSize="9">{`hash & equals()`}</text>

    {/* Match found */}
    <line x1="575" y1="100" x2="575" y2="130" stroke="#22c55e" strokeWidth="2"/>
    <line x1="575" y1="130" x2="510" y2="130" stroke="#22c55e" strokeWidth="2"/>
    <line x1="510" y1="130" x2="510" y2="155" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGet)"/>
    <text x="540" y="125" textAnchor="middle" fill="#22c55e" fontSize="9">match</text>

    <rect x="440" y="160" width="140" height="35" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="1"/>
    <text x="510" y="183" textAnchor="middle" fill="#4ade80" fontSize="10">return value</text>

    {/* Continue traversal */}
    <line x1="640" y1="75" x2="665" y2="75" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowGet)"/>
    <text x="650" y="60" fill="#f97316" fontSize="9">no match</text>

    <rect x="670" y="50" width="110" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="725" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">5. next node</text>
    <text x="725" y="87" textAnchor="middle" fill="#fbcfe8" fontSize="9">traverse list</text>

    <line x1="725" y1="100" x2="725" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <line x1="725" y1="130" x2="575" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <line x1="575" y1="130" x2="575" y2="105" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>

    {/* Time complexity */}
    <rect x="30" y="180" width="220" height="55" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
    <text x="140" y="200" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Time Complexity</text>
    <text x="140" y="220" textAnchor="middle" fill="#94a3b8" fontSize="9">O(1) avg | O(log n) worst (tree) | O(n) worst (list)</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function HashMapInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'hash-function',
      name: 'Hash Function',
      icon: '#',
      color: '#f97316',
      description: 'How HashMap calculates the hash and determines bucket index using bitwise operations.',
      diagram: HashFunctionDiagram,
      details: [
        {
          name: 'hashCode() Method',
          diagram: HashFunctionDiagram,
          explanation: 'Every object in Java has a hashCode() method that returns an int. HashMap uses this as the starting point for determining where to store the key-value pair. The hashCode should be consistent (same object = same code) and well-distributed.',
          codeExample: `// Object's hashCode() is called first
String key = "apple";
int h = key.hashCode();  // Returns 93029210

// String's hashCode implementation:
// s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
// "apple" = 'a'*31^4 + 'p'*31^3 + 'p'*31^2 + 'l'*31 + 'e'`
        },
        {
          name: 'hash() Spread Function',
          explanation: 'HashMap applies an additional hash() function that XORs the upper 16 bits with the lower 16 bits. This spreads the impact of higher-order bits to lower positions, reducing collisions when capacity is small.',
          codeExample: `// HashMap's internal hash() method
static final int hash(Object key) {
    int h;
    // XOR high bits with low bits
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

// Example:
// hashCode = 0xABCD1234
// h >>> 16 = 0x0000ABCD
// result   = 0xABCD1234 ^ 0x0000ABCD = 0xABCDB9F9
// This ensures high bits affect the bucket index`
        },
        {
          name: 'Index Calculation',
          explanation: 'The bucket index is calculated using (n-1) & hash, where n is the table capacity. This is faster than modulo (%) and works because n is always a power of 2. For n=16, n-1=15 (binary: 1111), so the result is always 0-15.',
          codeExample: `// Index calculation - faster than modulo
int index = (n - 1) & hash;

// Why this works (n is power of 2):
// n = 16 = 0b10000
// n-1 = 15 = 0b01111
//
// hash = 123456789 = 0b111010110111100110100010101
// hash & 15 gives last 4 bits = 0101 = 5
//
// This is equivalent to hash % 16, but faster!
// Bitwise AND is a single CPU instruction vs division`
        }
      ]
    },
    {
      id: 'buckets',
      name: 'Buckets & Nodes',
      icon: '[ ]',
      color: '#3b82f6',
      description: 'The internal data structure: an array of Node objects (buckets) that store key-value pairs.',
      diagram: HashTableDiagram,
      details: [
        {
          name: 'Node Structure',
          diagram: NodeDiagram,
          explanation: 'Each bucket contains Node objects. A Node stores the hash (for fast comparison), the key, the value, and a reference to the next node (for collision handling). The hash and key are final because keys should not change after insertion.',
          codeExample: `// Node class - the basic storage unit
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;      // Cached hash for fast comparison
    final K key;         // Immutable key reference
    V value;             // Mutable value
    Node<K,V> next;      // Link to next node (chaining)

    Node(int hash, K key, V value, Node<K,V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }

    public final K getKey()        { return key; }
    public final V getValue()      { return value; }
    public final V setValue(V newValue) {
        V oldValue = value;
        value = newValue;
        return oldValue;
    }
}`
        },
        {
          name: 'Table Array',
          diagram: HashTableDiagram,
          explanation: 'The table is a transient Node array. Its length is always a power of 2 (default: 16). The transient keyword means it is not serialized directly; HashMap has custom serialization logic.',
          codeExample: `// HashMap internal fields
transient Node<K,V>[] table;  // The bucket array
transient int size;            // Number of entries
int threshold;                 // size at which to resize
final float loadFactor;        // Default 0.75

// Table is lazily initialized on first put()
// Initial capacity: 16 (1 << 4)
// Maximum capacity: 1 << 30 (about 1 billion)

// Capacity is always power of 2 for efficient indexing
static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // 16
static final int MAXIMUM_CAPACITY = 1 << 30;
static final float DEFAULT_LOAD_FACTOR = 0.75f;`
        },
        {
          name: 'Load Factor',
          explanation: 'Load factor (default 0.75) determines when to resize. When size exceeds capacity * loadFactor, the table doubles. 0.75 balances between space efficiency and collision frequency. Higher = more collisions but less memory; lower = fewer collisions but more memory.',
          codeExample: `// Threshold calculation
threshold = capacity * loadFactor;

// With default values:
// capacity = 16, loadFactor = 0.75
// threshold = 16 * 0.75 = 12

// When size > 12, table resizes to 32
// New threshold = 32 * 0.75 = 24

// Custom load factor example:
Map<String, Integer> map = new HashMap<>(16, 0.5f);
// threshold = 16 * 0.5 = 8
// Resizes earlier, fewer collisions, more memory`
        }
      ]
    },
    {
      id: 'collisions',
      name: 'Collision Handling',
      icon: '->',
      color: '#22c55e',
      description: 'When multiple keys hash to the same bucket, HashMap uses chaining (linked list or tree).',
      diagram: CollisionDiagram,
      details: [
        {
          name: 'Chaining with Linked List',
          diagram: CollisionDiagram,
          explanation: 'When two keys have the same bucket index, they form a linked list within that bucket. New entries are added at the end of the list. During lookup, the list is traversed comparing hash and key equality.',
          codeExample: `// Collision scenario
Map<String, Integer> map = new HashMap<>();
// Assume "dog" and "elk" hash to same bucket index

map.put("dog", 1);  // Bucket[5] = Node("dog", 1, null)
map.put("elk", 2);  // Bucket[5] = Node("dog", 1, Node("elk", 2, null))

// Lookup traverses the chain:
map.get("elk");
// 1. hash("elk") -> index 5
// 2. Check bucket[5].key.equals("elk") -> false (it's "dog")
// 3. Follow next pointer to Node("elk", 2)
// 4. Check key.equals("elk") -> true
// 5. Return 2`
        },
        {
          name: 'Treeification (Java 8+)',
          diagram: TreeifyDiagram,
          explanation: 'When a bucket has 8 or more entries, it converts from a linked list to a Red-Black Tree. This improves worst-case lookup from O(n) to O(log n). The tree uses hash values for ordering, with tiebreakers for equal hashes.',
          codeExample: `// Treeification constants
static final int TREEIFY_THRESHOLD = 8;   // List -> Tree
static final int UNTREEIFY_THRESHOLD = 6; // Tree -> List
static final int MIN_TREEIFY_CAPACITY = 64;

// TreeNode extends Node with tree pointers
static final class TreeNode<K,V> extends Node<K,V> {
    TreeNode<K,V> parent;
    TreeNode<K,V> left;
    TreeNode<K,V> right;
    TreeNode<K,V> prev;    // Needed for unlinking
    boolean red;           // Red-Black tree color
}

// Treeify is only triggered if table capacity >= 64
// Otherwise, it resizes instead (spreading entries)`
        },
        {
          name: 'Why Threshold of 8?',
          explanation: 'The choice of 8 is based on probability analysis. Under random hash distribution (Poisson), the probability of 8+ entries in one bucket is 0.00000006 (practically impossible). The tree overhead is not worthwhile for smaller chains.',
          codeExample: `/*
 * Poisson distribution analysis from HashMap source:
 *
 * Probability of k entries in a bucket with load factor 0.75:
 * 0:    0.60653066
 * 1:    0.30326533
 * 2:    0.07581633
 * 3:    0.01263606
 * 4:    0.00157952
 * 5:    0.00015795
 * 6:    0.00001316
 * 7:    0.00000094
 * 8:    0.00000006  <- Practically impossible!
 *
 * If you hit threshold of 8, it's likely:
 * - Poor hashCode() implementation
 * - Malicious input (hash collision attack)
 * - Extreme bad luck
 */`
        }
      ]
    },
    {
      id: 'put-operation',
      name: 'put() Operation',
      icon: '+',
      color: '#8b5cf6',
      description: 'The algorithm for inserting a key-value pair, including collision handling and resize checks.',
      diagram: PutOperationDiagram,
      details: [
        {
          name: 'put() Algorithm',
          diagram: PutOperationDiagram,
          explanation: 'put() calculates the hash, finds the bucket, then either creates a new node (empty bucket), updates existing node (key found), or appends to the chain (key not found). Finally, it checks if resize is needed.',
          codeExample: `public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

final V putVal(int hash, K key, V value,
               boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;

    // Initialize table if empty
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;

    // Calculate index, check if bucket empty
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {
        // Bucket not empty - handle collision
        // (continued in next detail...)
    }
}`
        },
        {
          name: 'Collision Handling in put()',
          explanation: 'When the bucket is not empty, put() must either update an existing key or add a new node. It first checks the first node, then traverses the chain (or tree) looking for a match.',
          codeExample: `// Inside putVal(), when bucket not empty:
else {
    Node<K,V> e; K k;

    // Case 1: First node matches key
    if (p.hash == hash &&
        ((k = p.key) == key || (key != null && key.equals(k))))
        e = p;

    // Case 2: Bucket is a tree
    else if (p instanceof TreeNode)
        e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);

    // Case 3: Traverse linked list
    else {
        for (int binCount = 0; ; ++binCount) {
            if ((e = p.next) == null) {
                // Not found - add new node at end
                p.next = newNode(hash, key, value, null);
                // Check if should treeify
                if (binCount >= TREEIFY_THRESHOLD - 1)
                    treeifyBin(tab, hash);
                break;
            }
            if (e.hash == hash &&
                ((k = e.key) == key || (key != null && key.equals(k))))
                break;  // Found - will update
            p = e;
        }
    }

    // Update existing entry
    if (e != null) {
        V oldValue = e.value;
        e.value = value;
        return oldValue;
    }
}`
        },
        {
          name: 'Resize Check',
          explanation: 'After insertion, put() increments size and checks if it exceeds the threshold. If so, resize() is called to double the capacity and rehash all entries.',
          codeExample: `// After adding new node:
++modCount;  // Structural modification counter
if (++size > threshold)
    resize();
return null;  // null means new entry (not update)

// Resize doubles capacity
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;

    if (oldCap > 0) {
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        // Double capacity
        newCap = oldCap << 1;
        newThr = oldThr << 1;
    }
    // ... create new table and rehash ...
}`
        }
      ]
    },
    {
      id: 'get-operation',
      name: 'get() Operation',
      icon: '?',
      color: '#ec4899',
      description: 'The algorithm for retrieving a value by key, traversing buckets efficiently.',
      diagram: GetOperationDiagram,
      details: [
        {
          name: 'get() Algorithm',
          diagram: GetOperationDiagram,
          explanation: 'get() calculates the hash, finds the bucket, then searches for the matching key. It first checks the first node (optimization for common case), then traverses the chain if needed.',
          codeExample: `public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;

    // Check table exists and bucket not empty
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) {

        // Always check first node first (optimization)
        if (first.hash == hash &&
            ((k = first.key) == key || (key != null && key.equals(k))))
            return first;

        // Check rest of bucket
        if ((e = first.next) != null) {
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
            do {
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}`
        },
        {
          name: 'Key Comparison',
          explanation: 'HashMap uses a two-step comparison: first compare hash values (fast int comparison), then use equals() only if hashes match. This optimization avoids expensive equals() calls when hashes differ.',
          codeExample: `// Two-step key comparison:
if (e.hash == hash &&                                    // Step 1: Fast hash check
    ((k = e.key) == key || (key != null && key.equals(k)))) // Step 2: Identity or equals

// Why check hash first?
// - int comparison is O(1), very fast
// - equals() can be O(n) for strings, objects
// - Different hash = definitely different key
// - Same hash = might be same key (check equals)

// This is why hashCode() contract matters:
// Equal objects MUST have equal hashCodes
// (Otherwise get() would fail after hash comparison)`
        },
        {
          name: 'Time Complexity',
          explanation: 'Best case O(1) when key is first in bucket. Average case O(1) with good hash distribution. Worst case O(log n) with tree (Java 8+) or O(n) with long linked list (rare with good hashCode).',
          codeExample: `// Time complexity analysis:

// Best case: O(1)
// - Bucket has only one element
// - Key is first element in bucket

// Average case: O(1)
// - With load factor 0.75
// - Expected chain length is very short
// - Most buckets have 0-2 elements

// Worst case (Java 8+): O(log n)
// - Bucket converted to Red-Black Tree
// - Tree search is O(log n)

// Worst case (pre-Java 8): O(n)
// - All keys hash to same bucket
// - Linear search through linked list
// - This is why treeification was added!

// Practical tip:
// Always implement good hashCode() for custom keys
// Poor distribution leads to more collisions`
        }
      ]
    },
    {
      id: 'resizing',
      name: 'Resizing',
      icon: 'x2',
      color: '#06b6d4',
      description: 'How HashMap doubles its capacity and rehashes all entries when the threshold is exceeded.',
      diagram: ResizeDiagram,
      details: [
        {
          name: 'When Resize Happens',
          diagram: ResizeDiagram,
          explanation: 'Resize is triggered when size exceeds threshold (capacity * loadFactor). With defaults, this means resize at 12 entries (16 * 0.75). The table doubles in size and all entries are rehashed.',
          codeExample: `// Resize trigger in putVal():
if (++size > threshold)
    resize();

// Default progression:
// Capacity: 16  -> 32  -> 64  -> 128 -> 256 -> ...
// Threshold: 12 -> 24  -> 48  -> 96  -> 192 -> ...

// resize() returns new table with doubled capacity
final Node<K,V>[] resize() {
    int oldCap = table.length;
    int newCap = oldCap << 1;  // Double capacity

    @SuppressWarnings({"rawtypes","unchecked"})
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;

    // Rehash all entries...
    return newTab;
}`
        },
        {
          name: 'Rehashing Optimization',
          explanation: 'Java 8+ uses a clever optimization: entries either stay at the same index or move to index + oldCapacity. This is determined by checking a single bit (hash & oldCap), avoiding full hash recalculation.',
          codeExample: `// Rehashing optimization (Java 8+)
// Entries split into two groups based on one bit

for (int j = 0; j < oldCap; ++j) {
    Node<K,V> e;
    if ((e = oldTab[j]) != null) {
        oldTab[j] = null;  // Help GC

        if (e.next == null)
            // Single node - direct placement
            newTab[e.hash & (newCap - 1)] = e;
        else {
            // Multiple nodes - split into lo and hi lists
            Node<K,V> loHead = null, loTail = null;
            Node<K,V> hiHead = null, hiTail = null;
            Node<K,V> next;

            do {
                next = e.next;
                // Check the critical bit
                if ((e.hash & oldCap) == 0) {
                    // Stays at same index
                    if (loTail == null) loHead = e;
                    else loTail.next = e;
                    loTail = e;
                } else {
                    // Moves to index + oldCap
                    if (hiTail == null) hiHead = e;
                    else hiTail.next = e;
                    hiTail = e;
                }
            } while ((e = next) != null);

            // Place the two lists
            if (loTail != null) {
                loTail.next = null;
                newTab[j] = loHead;
            }
            if (hiTail != null) {
                hiTail.next = null;
                newTab[j + oldCap] = hiHead;
            }
        }
    }
}`
        },
        {
          name: 'Resize Cost',
          explanation: 'Resize is O(n) as all entries must be visited. This is amortized O(1) per put() because resizes become exponentially rare (each doubles capacity). Pre-sizing with expected capacity avoids unnecessary resizes.',
          codeExample: `// Resize is expensive but infrequent
// Amortized analysis shows O(1) per operation

// To avoid resizes, pre-size your HashMap:
// For n expected entries with load factor 0.75:
// initialCapacity = (int)(n / 0.75) + 1

int expectedSize = 1000;
int initialCapacity = (int)(expectedSize / 0.75f) + 1;
Map<String, Integer> map = new HashMap<>(initialCapacity);

// Or use Guava's Maps.newHashMapWithExpectedSize():
// Map<K,V> map = Maps.newHashMapWithExpectedSize(1000);

// Note: Capacity is rounded up to power of 2
// new HashMap<>(1000) gets capacity 1024
// new HashMap<>(1025) gets capacity 2048`
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
      { name: 'My Projects', icon: '🚀', page: 'My Projects' },
      { name: 'HashMap Internals', icon: '#', page: 'HashMap Internals' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
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
        <h1 style={titleStyle}>HashMap Internals</h1>
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
          ← Back to My Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={HASHMAP_COLORS}
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
          { label: 'Time Complexity', value: 'O(1) avg' },
          { label: 'Default Capacity', value: '16' },
          { label: 'Load Factor', value: '0.75' },
          { label: 'Tree Threshold', value: '8' }
        ].map((fact, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '0.75rem',
              padding: '1rem',
              textAlign: 'center',
              border: '1px solid rgba(249, 115, 22, 0.2)'
            }}
          >
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fb923c' }}>
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
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: concept.color,
                fontFamily: 'monospace',
                background: `${concept.color}20`,
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem'
              }}>{concept.icon}</span>
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
              colors={HASHMAP_COLORS}
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
                <span style={{
                  fontFamily: 'monospace',
                  background: `${selectedConcept.color}20`,
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem'
                }}>{selectedConcept.icon}</span>
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
                >x</button>
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

export default HashMapInternals

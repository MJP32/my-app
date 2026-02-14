/**
 * LinkedHashMap Internals - Tab Template Format
 *
 * Deep dive into Java's LinkedHashMap: insertion/access order, LRU cache implementation,
 * and internal structure.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const LINKEDHASHMAP_COLORS = {
  primary: '#14b8a6',
  primaryHover: '#2dd4bf',
  bg: 'rgba(20, 184, 166, 0.1)',
  border: 'rgba(20, 184, 166, 0.3)',
  arrow: '#14b8a6',
  hoverBg: 'rgba(20, 184, 166, 0.2)',
  topicBg: 'rgba(20, 184, 166, 0.2)'
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

const DoublyLinkedListDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowTeal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
      <marker id="arrowTealBack" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto">
        <polygon points="10 0, 0 3.5, 10 7" fill="#14b8a6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      LinkedHashMap = HashMap + Doubly-Linked List
    </text>

    {/* Hash Table */}
    <text x="150" y="55" textAnchor="middle" fill="#64748b" fontSize="12">Hash Table (O(1) lookup)</text>
    <rect x="50" y="65" width="200" height="120" rx="8" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="2"/>

    {/* Buckets */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="60" y={75 + i * 25} width="40" height="20" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
        <text x="80" y={89 + i * 25} textAnchor="middle" fill="#64748b" fontSize="10">[{i}]</text>
      </g>
    ))}

    {/* Entries in buckets */}
    <rect x="120" y="75" width="60" height="20" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="150" y="89" textAnchor="middle" fill="white" fontSize="9">A:1</text>

    <rect x="120" y="125" width="60" height="20" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="150" y="139" textAnchor="middle" fill="white" fontSize="9">B:2</text>

    <rect x="190" y="125" width="50" height="20" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="215" y="139" textAnchor="middle" fill="white" fontSize="9">C:3</text>

    <line x1="100" y1="85" x2="115" y2="85" stroke="#475569" strokeWidth="1" markerEnd="url(#arrowTeal)"/>
    <line x1="100" y1="135" x2="115" y2="135" stroke="#475569" strokeWidth="1" markerEnd="url(#arrowTeal)"/>
    <line x1="180" y1="135" x2="185" y2="135" stroke="#475569" strokeWidth="1" markerEnd="url(#arrowTeal)"/>

    {/* Linked List */}
    <text x="550" y="55" textAnchor="middle" fill="#64748b" fontSize="12">Linked List (maintains order)</text>

    <rect x="320" y="100" width="50" height="35" rx="6" fill="rgba(20, 184, 166, 0.3)" stroke="#14b8a6" strokeWidth="2"/>
    <text x="345" y="115" textAnchor="middle" fill="#14b8a6" fontSize="10" fontWeight="bold">head</text>

    <rect x="420" y="100" width="60" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="450" y="122" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">A:1</text>

    <rect x="530" y="100" width="60" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="560" y="122" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">B:2</text>

    <rect x="640" y="100" width="60" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="670" y="122" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">C:3</text>

    <rect x="750" y="100" width="40" height="35" rx="6" fill="rgba(20, 184, 166, 0.3)" stroke="#14b8a6" strokeWidth="2"/>
    <text x="770" y="122" textAnchor="middle" fill="#14b8a6" fontSize="10" fontWeight="bold">tail</text>

    {/* Bidirectional arrows */}
    <line x1="370" y1="117" x2="415" y2="117" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
    <line x1="480" y1="112" x2="525" y2="112" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
    <line x1="525" y1="123" x2="480" y2="123" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
    <line x1="590" y1="112" x2="635" y2="112" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
    <line x1="635" y1="123" x2="590" y2="123" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
    <line x1="700" y1="117" x2="745" y2="117" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>

    {/* Labels */}
    <text x="400" y="200" textAnchor="middle" fill="#94a3b8" fontSize="11">Each Entry has: before, after (list), next (bucket chain)</text>

    {/* Entry structure */}
    <rect x="280" y="220" width="240" height="45" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="400" y="238" textAnchor="middle" fill="#64748b" fontSize="10">{`Entry<K,V>`}</text>
    <text x="400" y="255" textAnchor="middle" fill="#14b8a6" fontSize="9">hash | key | value | next | before | after</text>
  </svg>
)

const AccessOrderDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Access-Order Mode: get("B") Moves B to End
    </text>

    {/* Before state */}
    <text x="200" y="55" textAnchor="middle" fill="#64748b" fontSize="12">Before get("B")</text>

    <rect x="50" y="70" width="50" height="30" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="75" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">A</text>

    <rect x="150" y="70" width="50" height="30" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="175" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">B</text>

    <rect x="250" y="70" width="50" height="30" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="275" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">C</text>

    <line x1="100" y1="85" x2="145" y2="85" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
    <line x1="200" y1="85" x2="245" y2="85" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowGreen)"/>

    <text x="200" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">{`Order: A -> B -> C`}</text>

    {/* Arrow down */}
    <text x="400" y="100" textAnchor="middle" fill="#22c55e" fontSize="24">get("B")</text>
    <line x1="400" y1="110" x2="400" y2="140" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>

    {/* After state */}
    <text x="600" y="55" textAnchor="middle" fill="#64748b" fontSize="12">After get("B")</text>

    <rect x="450" y="70" width="50" height="30" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="475" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">A</text>

    <rect x="550" y="70" width="50" height="30" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="575" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">C</text>

    <rect x="650" y="70" width="50" height="30" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="675" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">B</text>

    <line x1="500" y1="85" x2="545" y2="85" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
    <line x1="600" y1="85" x2="645" y2="85" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowGreen)"/>

    <text x="600" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">{`Order: A -> C -> B (B moved to end)`}</text>

    {/* LRU explanation */}
    <rect x="150" y="160" width="500" height="70" rx="8" fill="rgba(20, 184, 166, 0.1)" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1"/>
    <text x="400" y="185" textAnchor="middle" fill="#14b8a6" fontSize="12" fontWeight="bold">Perfect for LRU Cache</text>
    <text x="400" y="205" textAnchor="middle" fill="#94a3b8" fontSize="10">{`Most recently used -> end of list | Least recently used -> head (evict first)`}</text>
    <text x="400" y="220" textAnchor="middle" fill="#64748b" fontSize="9">afterNodeAccess() handles the move operation</text>
  </svg>
)

const LRUCacheDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
      <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      LRU Cache with LinkedHashMap (capacity = 3)
    </text>

    {/* Step 1: Initial state */}
    <text x="100" y="55" textAnchor="middle" fill="#64748b" fontSize="11">1. put(a,b,c)</text>
    <rect x="30" y="65" width="140" height="35" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <rect x="40" y="72" width="35" height="20" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="57" y="86" textAnchor="middle" fill="white" fontSize="9">a</text>
    <rect x="82" y="72" width="35" height="20" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="100" y="86" textAnchor="middle" fill="white" fontSize="9">b</text>
    <rect x="124" y="72" width="35" height="20" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="142" y="86" textAnchor="middle" fill="white" fontSize="9">c</text>

    {/* Step 2: Access a */}
    <text x="300" y="55" textAnchor="middle" fill="#64748b" fontSize="11">2. get(a) - access</text>
    <rect x="230" y="65" width="140" height="35" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <rect x="240" y="72" width="35" height="20" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="257" y="86" textAnchor="middle" fill="white" fontSize="9">b</text>
    <rect x="282" y="72" width="35" height="20" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="300" y="86" textAnchor="middle" fill="white" fontSize="9">c</text>
    <rect x="324" y="72" width="35" height="20" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="342" y="86" textAnchor="middle" fill="white" fontSize="9">a</text>
    <text x="300" y="115" textAnchor="middle" fill="#14b8a6" fontSize="9">a moved to end</text>

    {/* Step 3: Put d - eviction */}
    <text x="520" y="55" textAnchor="middle" fill="#64748b" fontSize="11">3. put(d) - evict b</text>
    <rect x="450" y="65" width="140" height="35" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <rect x="460" y="72" width="35" height="20" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="477" y="86" textAnchor="middle" fill="white" fontSize="9">c</text>
    <rect x="502" y="72" width="35" height="20" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="520" y="86" textAnchor="middle" fill="white" fontSize="9">a</text>
    <rect x="544" y="72" width="35" height="20" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1"/>
    <text x="562" y="86" textAnchor="middle" fill="white" fontSize="9">d</text>

    {/* Eviction indicator */}
    <rect x="650" y="65" width="50" height="35" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
    <text x="675" y="86" textAnchor="middle" fill="#ef4444" fontSize="9">b</text>
    <line x1="620" y1="85" x2="645" y2="85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
    <text x="675" y="115" textAnchor="middle" fill="#ef4444" fontSize="9">evicted!</text>

    {/* Code representation */}
    <rect x="100" y="150" width="600" height="150" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#334155" strokeWidth="1"/>
    <text x="400" y="175" textAnchor="middle" fill="#14b8a6" fontSize="12" fontWeight="bold">removeEldestEntry() Implementation</text>

    <text x="130" y="200" fill="#64748b" fontSize="10" fontFamily="monospace">@Override</text>
    <text x="130" y="215" fill="#c084fc" fontSize="10" fontFamily="monospace">protected boolean</text>
    <text x="250" y="215" fill="#fbbf24" fontSize="10" fontFamily="monospace">removeEldestEntry</text>
    <text x="380" y="215" fill="#94a3b8" fontSize="10" fontFamily="monospace">(Map.Entry eldest) {"{"}</text>
    <text x="150" y="235" fill="#c084fc" fontSize="10" fontFamily="monospace">return</text>
    <text x="200" y="235" fill="#fbbf24" fontSize="10" fontFamily="monospace">size()</text>
    <text x="250" y="235" fill="#94a3b8" fontSize="10" fontFamily="monospace">&gt;</text>
    <text x="265" y="235" fill="#14b8a6" fontSize="10" fontFamily="monospace">maxSize</text>
    <text x="320" y="235" fill="#94a3b8" fontSize="10" fontFamily="monospace">;</text>
    <text x="150" y="255" fill="#64748b" fontSize="10" fontFamily="monospace">// Returns true when over capacity</text>
    <text x="150" y="275" fill="#64748b" fontSize="10" fontFamily="monospace">// Eldest entry (head) gets removed</text>
    <text x="130" y="290" fill="#94a3b8" fontSize="10" fontFamily="monospace">{"}"}</text>
  </svg>
)

const StructureOverviewDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowTeal2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`
      LinkedHashMap Inheritance & Structure
    `}</text>

    {/* HashMap base */}
    <rect x="50" y="50" width="150" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="125" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{`HashMap<K,V>`}</text>

    {/* extends arrow */}
    <line x1="200" y1="75" x2="280" y2="75" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal2)"/>
    <text x="240" y="65" textAnchor="middle" fill="#94a3b8" fontSize="10">extends</text>

    {/* LinkedHashMap */}
    <rect x="290" y="50" width="180" height="50" rx="8" fill="#14b8a6" stroke="#2dd4bf" strokeWidth="2"/>
    <text x="380" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{`LinkedHashMap<K,V>`}</text>

    {/* Additional fields */}
    <rect x="520" y="40" width="250" height="70" rx="8" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="645" y="60" textAnchor="middle" fill="#64748b" fontSize="10">Additional Fields:</text>
    <text x="645" y="80" textAnchor="middle" fill="#14b8a6" fontSize="10" fontFamily="monospace">{`Entry<K,V> head, tail`}</text>
    <text x="645" y="95" textAnchor="middle" fill="#14b8a6" fontSize="10" fontFamily="monospace">boolean accessOrder</text>

    <line x1="470" y1="75" x2="515" y2="75" stroke="#475569" strokeWidth="1" strokeDasharray="4"/>

    {/* Entry comparison */}
    <rect x="50" y="130" width="320" height="55" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
    <text x="210" y="150" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">HashMap.Node</text>
    <text x="210" y="168" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">hash | key | value | next</text>

    <rect x="420" y="130" width="350" height="55" rx="8" fill="rgba(20, 184, 166, 0.15)" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1"/>
    <text x="595" y="150" textAnchor="middle" fill="#14b8a6" fontSize="10" fontWeight="bold">LinkedHashMap.Entry extends Node</text>
    <text x="595" y="168" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">hash | key | value | next | before | after</text>
  </svg>
)

const IterationOrderDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowPurple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Insertion Order: Re-insert Doesn't Change Position
    </text>

    {/* Initial inserts */}
    <text x="200" y="55" textAnchor="middle" fill="#64748b" fontSize="11">put("first"), put("second"), put("third")</text>
    <rect x="50" y="65" width="300" height="40" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <rect x="65" y="75" width="70" height="22" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="100" y="90" textAnchor="middle" fill="white" fontSize="9">first:1</text>
    <rect x="150" y="75" width="80" height="22" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="190" y="90" textAnchor="middle" fill="white" fontSize="9">second:2</text>
    <rect x="245" y="75" width="70" height="22" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="280" y="90" textAnchor="middle" fill="white" fontSize="9">third:3</text>

    {/* Arrow */}
    <line x1="200" y1="115" x2="200" y2="140" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowPurple)"/>
    <text x="280" y="130" fill="#f59e0b" fontSize="10">put("first", 100) - UPDATE value</text>

    {/* After re-insert */}
    <text x="200" y="165" textAnchor="middle" fill="#64748b" fontSize="11">Order stays the same!</text>
    <rect x="50" y="175" width="300" height="40" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <rect x="65" y="185" width="70" height="22" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="200" textAnchor="middle" fill="white" fontSize="9">first:100</text>
    <rect x="150" y="185" width="80" height="22" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="190" y="200" textAnchor="middle" fill="white" fontSize="9">second:2</text>
    <rect x="245" y="185" width="70" height="22" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="280" y="200" textAnchor="middle" fill="white" fontSize="9">third:3</text>

    {/* Comparison with access order */}
    <rect x="420" y="65" width="350" height="160" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1"/>
    <text x="595" y="90" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Insertion Order vs Access Order</text>

    <text x="450" y="115" fill="#64748b" fontSize="10">Insertion order (default):</text>
    <text x="470" y="130" fill="#94a3b8" fontSize="9">- Elements iterate in order added</text>
    <text x="470" y="145" fill="#94a3b8" fontSize="9">- put() on existing key: keeps position</text>

    <text x="450" y="170" fill="#64748b" fontSize="10">Access order (accessOrder=true):</text>
    <text x="470" y="185" fill="#94a3b8" fontSize="9">- get() moves entry to end</text>
    <text x="470" y="200" fill="#94a3b8" fontSize="9">- put() on existing key: moves to end</text>
    <text x="470" y="215" fill="#94a3b8" fontSize="9">- Used for LRU cache implementation</text>
  </svg>
)

const PerformanceDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Performance: LinkedHashMap vs HashMap
    </text>

    {/* Time complexity table */}
    <rect x="50" y="45" width="320" height="150" rx="8" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="210" y="70" textAnchor="middle" fill="#14b8a6" fontSize="12" fontWeight="bold">Time Complexity</text>

    <line x1="60" y1="80" x2="360" y2="80" stroke="#334155" strokeWidth="1"/>
    <text x="120" y="100" textAnchor="middle" fill="#64748b" fontSize="10">Operation</text>
    <text x="230" y="100" textAnchor="middle" fill="#64748b" fontSize="10">HashMap</text>
    <text x="320" y="100" textAnchor="middle" fill="#64748b" fontSize="10">LinkedHashMap</text>

    <line x1="60" y1="110" x2="360" y2="110" stroke="#334155" strokeWidth="1"/>

    <text x="120" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10">get()</text>
    <text x="230" y="130" textAnchor="middle" fill="#22c55e" fontSize="10">O(1)</text>
    <text x="320" y="130" textAnchor="middle" fill="#22c55e" fontSize="10">O(1)</text>

    <text x="120" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">put()</text>
    <text x="230" y="150" textAnchor="middle" fill="#22c55e" fontSize="10">O(1)</text>
    <text x="320" y="150" textAnchor="middle" fill="#22c55e" fontSize="10">O(1)*</text>

    <text x="120" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10">remove()</text>
    <text x="230" y="170" textAnchor="middle" fill="#22c55e" fontSize="10">O(1)</text>
    <text x="320" y="170" textAnchor="middle" fill="#22c55e" fontSize="10">O(1)*</text>

    <text x="120" y="190" textAnchor="middle" fill="#94a3b8" fontSize="10">iterate</text>
    <text x="230" y="190" textAnchor="middle" fill="#f59e0b" fontSize="10">O(capacity)</text>
    <text x="320" y="190" textAnchor="middle" fill="#22c55e" fontSize="10">O(n)</text>

    <text x="210" y="210" textAnchor="middle" fill="#64748b" fontSize="9">* slight overhead for list maintenance</text>

    {/* Space comparison */}
    <rect x="420" y="45" width="350" height="150" rx="8" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="595" y="70" textAnchor="middle" fill="#14b8a6" fontSize="12" fontWeight="bold">Memory Per Entry</text>

    <rect x="440" y="90" width="140" height="40" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="510" y="107" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">HashMap.Node</text>
    <text x="510" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9">~28 bytes</text>

    <rect x="600" y="90" width="160" height="40" rx="6" fill="rgba(20, 184, 166, 0.2)" stroke="#14b8a6" strokeWidth="1"/>
    <text x="680" y="107" textAnchor="middle" fill="#14b8a6" fontSize="10" fontWeight="bold">LinkedHashMap.Entry</text>
    <text x="680" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9">~44 bytes (+16)</text>

    <text x="595" y="155" textAnchor="middle" fill="#64748b" fontSize="10">Extra: before (8B) + after (8B)</text>
    <text x="595" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">Plus head/tail pointers for the map</text>

    {/* Trade-offs */}
    <rect x="150" y="210" width="500" height="60" rx="8" fill="rgba(20, 184, 166, 0.1)" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1"/>
    <text x="400" y="235" textAnchor="middle" fill="#14b8a6" fontSize="11" fontWeight="bold">Trade-offs Summary</text>
    <text x="400" y="255" textAnchor="middle" fill="#94a3b8" fontSize="10">More memory | Slightly slower mutations | Much faster iteration | Guaranteed order</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function LinkedHashMapInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'why-linkedhashmap',
      name: 'Why LinkedHashMap?',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Understand when and why to use LinkedHashMap over HashMap - ordering modes, use cases, and key benefits.',
      diagram: DoublyLinkedListDiagram,
      details: [
        {
          name: 'Ordering Modes',
          diagram: DoublyLinkedListDiagram,
          explanation: 'LinkedHashMap extends HashMap with predictable iteration order. It supports two modes: Insertion order (default) where elements iterate in the order they were added, and Access order where most recently accessed elements come last - perfect for LRU cache implementation.',
          codeExample: `// HashMap - unpredictable order
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("one", 1);
hashMap.put("two", 2);
hashMap.put("three", 3);
// Iteration order: unpredictable!

// LinkedHashMap - insertion order (default)
Map<String, Integer> linkedMap = new LinkedHashMap<>();
linkedMap.put("one", 1);
linkedMap.put("two", 2);
linkedMap.put("three", 3);
// Iteration order: one, two, three (guaranteed)

// Access-order LinkedHashMap (for LRU)
Map<String, Integer> accessOrder = new LinkedHashMap<>(16, 0.75f, true);
accessOrder.put("one", 1);
accessOrder.put("two", 2);
accessOrder.put("three", 3);
accessOrder.get("one");  // Access "one"
// Iteration order: two, three, one (one moved to end)`
        },
        {
          name: 'Key Benefits',
          explanation: 'LinkedHashMap provides: All HashMap O(1) operations, Predictable iteration order, Perfect fit for LRU cache implementation with removeEldestEntry(), and maintaining insertion order for JSON serialization. Use it when you need both fast lookups and ordered iteration.',
          codeExample: `// Key benefits demonstrated

// 1. O(1) operations like HashMap
linkedMap.put("key", value);    // O(1)
linkedMap.get("key");           // O(1)
linkedMap.remove("key");        // O(1)

// 2. Predictable iteration
for (Map.Entry<String, Integer> entry : linkedMap.entrySet()) {
    // Always in insertion order (or access order if configured)
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// 3. Perfect for JSON serialization
// Response fields always in consistent order
Map<String, Object> response = new LinkedHashMap<>();
response.put("status", "success");
response.put("code", 200);
response.put("data", result);
// JSON output always: {"status":"success","code":200,"data":...}`
        },
        {
          name: 'Use Cases',
          explanation: 'Common use cases include: LRU Cache with automatic eviction via removeEldestEntry(), maintaining configuration order in property files, ordered JSON output for APIs, request/response logging where order matters, and implementing ordered collections that need fast lookups.',
          codeExample: `// Use Case 1: LRU Cache
Map<String, CachedData> cache = new LinkedHashMap<>(maxSize, 0.75f, true) {
    @Override
    protected boolean removeEldestEntry(Map.Entry<String, CachedData> eldest) {
        return size() > maxSize;
    }
};

// Use Case 2: Ordered Configuration
LinkedHashMap<String, String> config = new LinkedHashMap<>();
config.put("app.name", "MyApp");
config.put("app.version", "1.0");
config.put("db.host", "localhost");
// Properties always in this order when iterating

// Use Case 3: API Response with ordered fields
LinkedHashMap<String, Object> apiResponse = new LinkedHashMap<>();
apiResponse.put("id", 123);
apiResponse.put("name", "John");
apiResponse.put("email", "john@example.com");
return new ObjectMapper().writeValueAsString(apiResponse);
// Always: {"id":123,"name":"John","email":"john@example.com"}`
        }
      ]
    },
    {
      id: 'internal-structure',
      name: 'Internal Structure',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Deep dive into how LinkedHashMap combines HashMap with a doubly-linked list to maintain order.',
      diagram: StructureOverviewDiagram,
      details: [
        {
          name: 'Entry Structure',
          diagram: StructureOverviewDiagram,
          explanation: 'LinkedHashMap.Entry extends HashMap.Node with two additional pointers: before and after. These form a doubly-linked list that threads through all entries, maintaining insertion or access order. The hash table structure remains unchanged for O(1) lookup.',
          codeExample: `// LinkedHashMap internal structure
public class LinkedHashMap<K,V> extends HashMap<K,V> {
    // Doubly-linked list pointers
    transient LinkedHashMap.Entry<K,V> head;
    transient LinkedHashMap.Entry<K,V> tail;

    // Access order flag
    final boolean accessOrder;

    // Extended entry with list pointers
    static class Entry<K,V> extends HashMap.Node<K,V> {
        Entry<K,V> before, after;  // Linked list pointers

        Entry(int hash, K key, V value, Node<K,V> next) {
            super(hash, key, value, next);
        }
    }

    public LinkedHashMap() {
        super();
        accessOrder = false;  // Insertion order by default
    }

    public LinkedHashMap(int initialCapacity, float loadFactor,
                         boolean accessOrder) {
        super(initialCapacity, loadFactor);
        this.accessOrder = accessOrder;
    }
}`
        },
        {
          name: 'Dual Data Structure',
          diagram: DoublyLinkedListDiagram,
          explanation: 'LinkedHashMap maintains TWO data structures simultaneously: 1) The hash table from HashMap for O(1) lookups, and 2) A doubly-linked list threading through all entries for ordered iteration. Each Entry exists in both structures - it sits in a hash bucket AND is linked in the list.',
          codeExample: `// Visual representation of dual structure:

// Hash Table (for O(1) lookup):
// [0] -> entry1
// [1] -> null
// [2] -> entry2 -> entry3  (collision chain)
// [3] -> null

// Linked List (for order):
// head -> entry1 <-> entry2 <-> entry3 -> tail
//         (first)              (last)

// Each Entry has:
// - hash, key, value, next (from HashMap.Node)
// - before, after (additional for LinkedHashMap)

// The 'next' pointer is for bucket collision chains
// The 'before/after' pointers are for the ordering list
// These are INDEPENDENT of each other!`
        },
        {
          name: 'Hook Methods',
          explanation: 'LinkedHashMap overrides three hook methods from HashMap: afterNodeAccess() - called after accessing a node (for access-order mode), afterNodeInsertion() - called after inserting a node (checks removeEldestEntry), afterNodeRemoval() - called after removing a node (unlinks from list).',
          codeExample: `// Hook methods that maintain the linked list

// Called after node access (get, put existing key)
void afterNodeAccess(Node<K,V> e) {
    // Moves entry to tail if accessOrder is true
    // Implements LRU behavior
}

// Called after node insertion
void afterNodeInsertion(boolean evict) {
    LinkedHashMap.Entry<K,V> first;
    // Check if we should remove eldest entry
    if (evict && (first = head) != null && removeEldestEntry(first)) {
        K key = first.key;
        removeNode(hash(key), key, null, false, true);
    }
}

// Called after node removal
void afterNodeRemoval(Node<K,V> e) {
    // Unlinks entry from the doubly-linked list
    LinkedHashMap.Entry<K,V> p = (LinkedHashMap.Entry<K,V>)e;
    LinkedHashMap.Entry<K,V> b = p.before, a = p.after;
    p.before = p.after = null;
    if (b == null) head = a;
    else b.after = a;
    if (a == null) tail = b;
    else a.before = b;
}`
        }
      ]
    },
    {
      id: 'access-order-mode',
      name: 'Access-Order Mode',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Learn how access-order mode works and how it enables LRU cache behavior.',
      diagram: AccessOrderDiagram,
      details: [
        {
          name: 'How It Works',
          diagram: AccessOrderDiagram,
          explanation: 'When accessOrder is true, accessing an entry moves it to the end of the linked list. This is triggered by get(), put() (updating existing key), putIfAbsent(), compute(), merge(), etc. The afterNodeAccess() method handles the move operation.',
          codeExample: `// Access order demonstration
LinkedHashMap<String, Integer> map =
    new LinkedHashMap<>(16, 0.75f, true);  // accessOrder = true

map.put("A", 1);
map.put("B", 2);
map.put("C", 3);
// Order: A -> B -> C

map.get("A");  // Access A
// Order: B -> C -> A (A moved to end)

map.get("B");  // Access B
// Order: C -> A -> B (B moved to end)

// Now iteration order is: C, A, B
for (String key : map.keySet()) {
    System.out.println(key);  // C, A, B
}`
        },
        {
          name: 'afterNodeAccess Implementation',
          explanation: 'The afterNodeAccess() method moves the accessed entry to the tail of the linked list. It first unlinks the entry from its current position, then links it at the tail. This is an O(1) operation since we have direct pointers.',
          codeExample: `// afterNodeAccess - moves entry to tail
void afterNodeAccess(Node<K,V> e) {
    LinkedHashMap.Entry<K,V> last;
    if (accessOrder && (last = tail) != e) {
        LinkedHashMap.Entry<K,V> p = (LinkedHashMap.Entry<K,V>)e;
        LinkedHashMap.Entry<K,V> b = p.before;
        LinkedHashMap.Entry<K,V> a = p.after;

        p.after = null;  // Will be new tail

        // Unlink from current position
        if (b == null)
            head = a;       // Was head, new head is next
        else
            b.after = a;    // Previous points to next

        if (a != null)
            a.before = b;   // Next points to previous
        else
            last = b;       // Was tail (shouldn't happen since last != e)

        // Link at tail
        if (last == null)
            head = p;       // List was empty
        else {
            p.before = last;
            last.after = p;
        }
        tail = p;
        ++modCount;
    }
}`
        },
        {
          name: 'LRU Cache Connection',
          diagram: LRUCacheDiagram,
          explanation: 'Access-order mode is the foundation for LRU cache. Most recently used entries move to the tail, so least recently used entries stay at the head. Combined with removeEldestEntry(), the head (LRU entry) can be automatically evicted when the cache exceeds capacity.',
          codeExample: `// LRU behavior with access order

// 1. Create access-order map
LinkedHashMap<String, Data> cache =
    new LinkedHashMap<>(100, 0.75f, true);

// 2. Access pattern over time
cache.put("item1", data1);  // head: item1, tail: item1
cache.put("item2", data2);  // head: item1, tail: item2
cache.put("item3", data3);  // head: item1, tail: item3

cache.get("item1");         // head: item2, tail: item1 (item1 moved)
cache.get("item2");         // head: item3, tail: item2 (item2 moved)

// Now order: item3 -> item1 -> item2
// item3 is "least recently used" (at head)
// item2 is "most recently used" (at tail)

// To complete LRU cache, override removeEldestEntry()
// to evict head when over capacity`
        }
      ]
    },
    {
      id: 'lru-cache',
      name: 'LRU Cache Implementation',
      icon: '💾',
      color: '#22c55e',
      description: 'Build a complete LRU cache using LinkedHashMap with automatic eviction.',
      diagram: LRUCacheDiagram,
      details: [
        {
          name: 'Basic LRU Cache',
          diagram: LRUCacheDiagram,
          explanation: 'Implementing LRU cache with LinkedHashMap is straightforward: extend LinkedHashMap with accessOrder=true and override removeEldestEntry() to return true when size exceeds capacity. The eldest entry (head of linked list) is automatically removed.',
          codeExample: `// Simple LRU Cache implementation
public class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int maxSize;

    public LRUCache(int maxSize) {
        // accessOrder = true for LRU behavior
        super(maxSize, 0.75f, true);
        this.maxSize = maxSize;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > maxSize;  // Remove when over capacity
    }
}

// Usage
LRUCache<String, Integer> cache = new LRUCache<>(3);
cache.put("a", 1);  // [a:1]
cache.put("b", 2);  // [a:1, b:2]
cache.put("c", 3);  // [a:1, b:2, c:3]
cache.get("a");     // Access a -> [b:2, c:3, a:1]
cache.put("d", 4);  // Over capacity! Remove b -> [c:3, a:1, d:4]

System.out.println(cache.get("b"));  // null - was evicted!`
        },
        {
          name: 'Thread-Safe LRU Cache',
          explanation: 'LinkedHashMap is not thread-safe. For concurrent access, wrap it with Collections.synchronizedMap() or use ConcurrentHashMap with manual ordering. For high-concurrency scenarios, consider using Caffeine or Guava Cache.',
          codeExample: `// Thread-safe LRU Cache options

// Option 1: Synchronized wrapper (simple but coarse locking)
public class SynchronizedLRUCache<K, V> {
    private final Map<K, V> cache;

    public SynchronizedLRUCache(int maxSize) {
        this.cache = Collections.synchronizedMap(
            new LinkedHashMap<K, V>(maxSize, 0.75f, true) {
                @Override
                protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
                    return size() > maxSize;
                }
            }
        );
    }

    public V get(K key) { return cache.get(key); }
    public void put(K key, V value) { cache.put(key, value); }
}

// Option 2: Use established caching library (recommended for production)
// Caffeine (high-performance)
Cache<String, Data> caffeineCache = Caffeine.newBuilder()
    .maximumSize(10_000)
    .expireAfterAccess(Duration.ofMinutes(5))
    .build();

// Guava Cache
Cache<String, Data> guavaCache = CacheBuilder.newBuilder()
    .maximumSize(10_000)
    .expireAfterAccess(5, TimeUnit.MINUTES)
    .build();`
        },
        {
          name: 'LeetCode LRU Cache',
          explanation: 'The classic LeetCode 146 LRU Cache problem can be solved elegantly with LinkedHashMap. The solution requires O(1) get and put operations, which LinkedHashMap provides natively.',
          codeExample: `// LeetCode 146: LRU Cache
class LRUCache {
    private final int capacity;
    private final LinkedHashMap<Integer, Integer> cache;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        // accessOrder = true, loadFactor = 0.75
        this.cache = new LinkedHashMap<Integer, Integer>(capacity, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > capacity;
            }
        };
    }

    public int get(int key) {
        return cache.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        cache.put(key, value);
    }
}

// Example usage:
// LRUCache cache = new LRUCache(2);
// cache.put(1, 1);           // cache: {1=1}
// cache.put(2, 2);           // cache: {1=1, 2=2}
// cache.get(1);              // returns 1, cache: {2=2, 1=1}
// cache.put(3, 3);           // evicts 2, cache: {1=1, 3=3}
// cache.get(2);              // returns -1 (not found)
// cache.put(4, 4);           // evicts 1, cache: {3=3, 4=4}
// cache.get(1);              // returns -1 (not found)
// cache.get(3);              // returns 3, cache: {4=4, 3=3}
// cache.get(4);              // returns 4, cache: {3=3, 4=4}`
        }
      ]
    },
    {
      id: 'iteration-order',
      name: 'Iteration Order Guarantee',
      icon: '🔗',
      color: '#ec4899',
      description: 'Understand how LinkedHashMap guarantees iteration order and the difference between insertion and access order.',
      diagram: IterationOrderDiagram,
      details: [
        {
          name: 'Insertion Order',
          diagram: IterationOrderDiagram,
          explanation: 'In default insertion-order mode, elements are iterated in the order they were first added. Re-inserting the same key (updating value) does NOT change its position in the iteration order. This is useful for maintaining consistent field ordering.',
          codeExample: `// Insertion order - re-insert doesn't change order
LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
map.put("first", 1);
map.put("second", 2);
map.put("third", 3);
map.put("first", 100);  // Update value, keeps position!

for (String key : map.keySet()) {
    System.out.println(key);
}
// Output: first, second, third (original order)

// Useful for ordered JSON output
LinkedHashMap<String, Object> json = new LinkedHashMap<>();
json.put("id", 123);
json.put("name", "Product");
json.put("price", 29.99);
// Always serializes as: {"id":123,"name":"Product","price":29.99}`
        },
        {
          name: 'Access Order',
          explanation: 'In access-order mode (accessOrder=true), both get() and put() on existing keys move the entry to the end. This creates a "most recently used at tail" ordering, essential for LRU cache behavior.',
          codeExample: `// Access order - access changes order
LinkedHashMap<String, Integer> accessMap =
    new LinkedHashMap<>(16, 0.75f, true);  // accessOrder = true

accessMap.put("first", 1);
accessMap.put("second", 2);
accessMap.put("third", 3);

accessMap.get("first");  // Access moves to end

for (String key : accessMap.keySet()) {
    System.out.println(key);
}
// Output: second, third, first

// put() on existing key also moves to end
accessMap.put("second", 200);  // Update AND move

for (String key : accessMap.keySet()) {
    System.out.println(key);
}
// Output: third, first, second`
        },
        {
          name: 'Iteration Implementation',
          explanation: 'LinkedHashMap iteration uses the linked list, not the hash table. The iterator starts at head and follows after pointers. This gives O(n) iteration where n is the number of entries, unlike HashMap which iterates over all buckets (including empty ones).',
          codeExample: `// How iteration works internally

// LinkedHashMap uses LinkedKeySet, LinkedEntrySet, etc.
public Set<K> keySet() {
    return new LinkedKeySet();  // Uses linked list
}

// LinkedKeyIterator follows before/after links
final class LinkedKeyIterator extends LinkedHashIterator
    implements Iterator<K> {
    public final K next() {
        return nextNode().getKey();
    }
}

abstract class LinkedHashIterator {
    LinkedHashMap.Entry<K,V> next;
    LinkedHashMap.Entry<K,V> current;
    int expectedModCount;

    LinkedHashIterator() {
        next = head;  // Start at head
        expectedModCount = modCount;
        current = null;
    }

    final LinkedHashMap.Entry<K,V> nextNode() {
        LinkedHashMap.Entry<K,V> e = next;
        if (modCount != expectedModCount)
            throw new ConcurrentModificationException();
        if (e == null)
            throw new NoSuchElementException();
        current = e;
        next = e.after;  // Follow linked list!
        return e;
    }
}`
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance Characteristics',
      icon: '📊',
      color: '#06b6d4',
      description: 'Compare LinkedHashMap performance with HashMap - time complexity, memory overhead, and trade-offs.',
      diagram: PerformanceDiagram,
      details: [
        {
          name: 'Time Complexity',
          diagram: PerformanceDiagram,
          explanation: 'LinkedHashMap has the same O(1) time complexity as HashMap for get, put, and remove operations. The linked list maintenance adds a small constant overhead. However, iteration is O(n) instead of O(capacity), making it faster when the map is sparse.',
          codeExample: `// Time complexity comparison

// Both O(1) for basic operations
Map<String, Integer> hashMap = new HashMap<>();
Map<String, Integer> linkedHashMap = new LinkedHashMap<>();

hashMap.put("key", 1);        // O(1)
linkedHashMap.put("key", 1);  // O(1) + constant overhead for list update

hashMap.get("key");           // O(1)
linkedHashMap.get("key");     // O(1) + possible list update if accessOrder

hashMap.remove("key");        // O(1)
linkedHashMap.remove("key");  // O(1) + constant overhead for list update

// Iteration difference
// HashMap: O(capacity) - must check all buckets
for (var entry : hashMap.entrySet()) { }  // May visit empty buckets

// LinkedHashMap: O(n) - follows linked list
for (var entry : linkedHashMap.entrySet()) { }  // Only visits entries`
        },
        {
          name: 'Memory Overhead',
          explanation: 'LinkedHashMap uses more memory than HashMap due to two extra pointers per entry (before and after), plus head and tail pointers for the map. This adds approximately 16 bytes per entry on 64-bit JVM (or 8 bytes with compressed oops).',
          codeExample: `// Memory comparison per entry

// HashMap.Node (approximately):
// - hash: 4 bytes
// - key reference: 8 bytes (4 with compressed oops)
// - value reference: 8 bytes (4 with compressed oops)
// - next: 8 bytes (4 with compressed oops)
// - Object header: ~12 bytes
// Total: ~40 bytes (or ~28 with compressed oops)

// LinkedHashMap.Entry (approximately):
// - All of HashMap.Node: ~40 bytes
// - before: 8 bytes (4 with compressed oops)
// - after: 8 bytes (4 with compressed oops)
// Total: ~56 bytes (or ~36 with compressed oops)

// For 1 million entries:
// HashMap: ~40 MB
// LinkedHashMap: ~56 MB
// Difference: ~16 MB (40% more)

// Map-level overhead:
// - head pointer: 8 bytes
// - tail pointer: 8 bytes
// - accessOrder flag: 1 byte (+ padding)`
        },
        {
          name: 'When to Use Which',
          explanation: 'Use HashMap when you only need fast lookups and do not care about iteration order. Use LinkedHashMap when you need predictable iteration order, LRU cache behavior, or ordered serialization. The memory overhead is usually acceptable for the ordering guarantee.',
          codeExample: `// Decision guide

// Use HashMap when:
// - Order doesn't matter
// - Memory is critical
// - Maximum performance for lookups
Map<String, User> userCache = new HashMap<>();

// Use LinkedHashMap when:
// - Need insertion order for serialization
LinkedHashMap<String, Object> jsonResponse = new LinkedHashMap<>();

// - Need LRU cache behavior
LinkedHashMap<String, Data> lruCache = new LinkedHashMap<>(100, 0.75f, true) {
    protected boolean removeEldestEntry(Map.Entry<String, Data> e) {
        return size() > 100;
    }
};

// - Need consistent iteration order
LinkedHashMap<String, String> orderedConfig = new LinkedHashMap<>();

// - Faster iteration on sparse maps
// If map has 100 entries but capacity is 10000:
// HashMap iteration: visits 10000 buckets
// LinkedHashMap iteration: visits 100 entries`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '💼',
      color: '#f97316',
      description: 'Common LinkedHashMap interview questions with detailed answers and code examples.',
      diagram: null,
      details: [
        {
          name: 'HashMap vs LinkedHashMap',
          explanation: 'Q: What is the difference between HashMap and LinkedHashMap? A: HashMap does not maintain any order, while LinkedHashMap maintains insertion order (default) or access order. LinkedHashMap uses extra memory for doubly-linked list pointers but provides predictable iteration order.',
          codeExample: `// Q: Difference between HashMap and LinkedHashMap?

// HashMap - unpredictable iteration order
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("c", 3);
hashMap.put("a", 1);
hashMap.put("b", 2);
// Iteration order: unpredictable (hash-based)

// LinkedHashMap - insertion order preserved
Map<String, Integer> linkedMap = new LinkedHashMap<>();
linkedMap.put("c", 3);
linkedMap.put("a", 1);
linkedMap.put("b", 2);
// Iteration order: c, a, b (insertion order)

// Key differences:
// 1. LinkedHashMap extends HashMap
// 2. LinkedHashMap.Entry has before/after pointers
// 3. LinkedHashMap has head/tail pointers
// 4. LinkedHashMap supports accessOrder mode
// 5. LinkedHashMap uses ~40% more memory per entry`
        },
        {
          name: 'LRU Cache Implementation',
          explanation: 'Q: How do you implement an LRU cache in Java? A: The most elegant solution is extending LinkedHashMap with accessOrder=true and overriding removeEldestEntry() to return true when size exceeds capacity. This gives O(1) get and put with automatic eviction.',
          codeExample: `// Q: Implement LRU Cache with O(1) operations

class LRUCache<K, V> {
    private final int capacity;
    private final LinkedHashMap<K, V> cache;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        // accessOrder=true is crucial for LRU!
        this.cache = new LinkedHashMap<K, V>(capacity, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
                return size() > capacity;
            }
        };
    }

    public V get(K key) {
        return cache.getOrDefault(key, null);
    }

    public void put(K key, V value) {
        cache.put(key, value);
    }
}

// Why this works:
// 1. accessOrder=true: get() moves entry to tail (most recent)
// 2. removeEldestEntry(): checks after each put()
// 3. Eldest = head of list = least recently used
// 4. Both get() and put() are O(1)`
        },
        {
          name: 'More Interview Questions',
          explanation: 'Common follow-up questions: What is the accessOrder parameter? Does put() change order in insertion mode? What is the time complexity? Is LinkedHashMap thread-safe? How does removeEldestEntry() work?',
          codeExample: `// Q: What is accessOrder parameter?
// A: If true, iteration order is access order (for LRU)
//    If false (default), iteration order is insertion order

// Q: Does put() change order in insertion mode?
// A: No! Re-inserting same key keeps original position
LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
map.put("a", 1);
map.put("b", 2);
map.put("a", 10);  // Updates value, keeps position
// Order: a, b (not b, a)

// Q: Time complexity?
// A: Same as HashMap - O(1) for get/put/remove
//    with small constant overhead for list maintenance

// Q: Is it thread-safe?
// A: No! Use Collections.synchronizedMap() wrapper
Map<K, V> threadSafe = Collections.synchronizedMap(
    new LinkedHashMap<>(16, 0.75f, true)
);

// Q: How does removeEldestEntry() work?
// A: Called after every put(). Return true to remove eldest (head).
//    Default implementation returns false (never remove).
@Override
protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
    return size() > MAX_SIZE;  // Your eviction policy
}`
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
      { name: 'My Projects', icon: '📁', page: 'myProjects' },
      { name: 'LinkedHashMap Internals', icon: '🔗', page: 'linkedHashMapInternals' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #2dd4bf, #14b8a6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(20, 184, 166, 0.2)',
    border: '1px solid rgba(20, 184, 166, 0.3)',
    borderRadius: '0.5rem',
    color: '#2dd4bf',
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
        <h1 style={titleStyle}>LinkedHashMap Internals</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to My Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={LINKEDHASHMAP_COLORS}
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
        primaryColor={LINKEDHASHMAP_COLORS.primary}
      />


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
              colors={LINKEDHASHMAP_COLORS}
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
                ></button>
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
                ></button>
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
                ></button>
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

export default LinkedHashMapInternals

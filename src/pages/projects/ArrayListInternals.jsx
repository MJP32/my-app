/**
 * ArrayList Internals - Tab Template Format
 * Deep dive into Java's ArrayList: dynamic array, growth strategy, and performance characteristics
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * ArrayList topic colors - orange theme
 */
const ARRAYLIST_COLORS = {
  primary: '#f97316',                    // Orange
  primaryHover: '#fb923c',               // Lighter orange
  bg: 'rgba(249, 115, 22, 0.1)',         // Background with transparency
  border: 'rgba(249, 115, 22, 0.3)',     // Border color
  arrow: '#f97316',                      // Arrow/indicator color
  hoverBg: 'rgba(249, 115, 22, 0.2)',    // Hover background
  topicBg: 'rgba(249, 115, 22, 0.2)'     // Topic card background
}

/**
 * Alternating colors for subtopic detail explanations
 */
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

/**
 * Internal Structure Diagram - Shows backing array and size vs capacity
 */
const InternalStructureDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-orange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ArrayList Internal Structure
    </text>

    {/* ArrayList Object */}
    <rect x="50" y="60" width="180" height="120" rx="8" fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" strokeWidth="2"/>
    <text x="140" y="85" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">ArrayList Object</text>

    <text x="60" y="110" fill="#94a3b8" fontSize="10">elementData: Object[]</text>
    <text x="60" y="130" fill="#94a3b8" fontSize="10">size: 5</text>
    <text x="60" y="150" fill="#94a3b8" fontSize="10">modCount: 3</text>
    <text x="60" y="170" fill="#94a3b8" fontSize="10">capacity: 10</text>

    {/* Arrow to backing array */}
    <line x1="230" y1="100" x2="290" y2="100" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrow-orange)"/>
    <text x="260" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">points to</text>

    {/* Backing Array - showing capacity 10 with size 5 */}
    <rect x="300" y="60" width="450" height="50" rx="4" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1"/>
    <text x="525" y="50" textAnchor="middle" fill="#94a3b8" fontSize="10">Object[] elementData (capacity = 10)</text>

    {/* Array slots */}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
      <g key={i}>
        <rect
          x={305 + i * 44}
          y="65"
          width="40"
          height="40"
          rx="2"
          fill={i < 5 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(100, 116, 139, 0.1)'}
          stroke={i < 5 ? '#22c55e' : '#475569'}
          strokeWidth="1"
        />
        <text x={325 + i * 44} y="90" textAnchor="middle" fill={i < 5 ? '#4ade80' : '#64748b'} fontSize="9">
          {i < 5 ? `[${i}]` : ''}
        </text>
      </g>
    ))}

    {/* Size indicator */}
    <line x1="305" y1="130" x2="525" y2="130" stroke="#22c55e" strokeWidth="2"/>
    <text x="415" y="145" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">
      size = 5 elements
    </text>

    {/* Capacity indicator */}
    <line x1="305" y1="160" x2="745" y2="160" stroke="#64748b" strokeWidth="2" strokeDasharray="4"/>
    <text x="525" y="175" textAnchor="middle" fill="#64748b" fontSize="10">
      capacity = 10 (internal array length)
    </text>

    {/* Note */}
    <text x="400" y="210" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
      Empty slots (5-9) are null and ready for new elements
    </text>
    <text x="400" y="230" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
      When size reaches capacity, array grows by 50%
    </text>
  </svg>
)

/**
 * Growth Strategy Diagram - Shows 1.5x growth pattern
 */
const GrowthStrategyDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-growth" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ArrayList Growth Strategy (1.5x Expansion)
    </text>

    {/* Growth sequence */}
    {[
      { cap: 10, x: 50, label: 'Initial' },
      { cap: 15, x: 200, label: '+50%' },
      { cap: 22, x: 350, label: '+50%' },
      { cap: 33, x: 500, label: '+50%' },
      { cap: 49, x: 650, label: '+50%' }
    ].map((item, i, capacities) => (
      <g key={i}>
        {/* Box */}
        <rect
          x={item.x}
          y="80"
          width="100"
          height="60"
          rx="6"
          fill="rgba(249, 115, 22, 0.2)"
          stroke="#f97316"
          strokeWidth="2"
        />
        <text x={item.x + 50} y="105" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">
          Capacity
        </text>
        <text x={item.x + 50} y="125" textAnchor="middle" fill="#fb923c" fontSize="16" fontWeight="bold">
          {item.cap}
        </text>
        <text x={item.x + 50} y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">
          {item.label}
        </text>

        {/* Arrow to next */}
        {i < capacities.length - 1 && (
          <>
            <line
              x1={item.x + 100}
              y1="110"
              x2={capacities[i + 1].x}
              y2="110"
              stroke="#f97316"
              strokeWidth="2"
              markerEnd="url(#arrow-growth)"
            />
            <text
              x={item.x + 125}
              y="100"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="8"
            >
              grow
            </text>
          </>
        )}
      </g>
    ))}

    {/* Formula */}
    <rect x="200" y="190" width="400" height="80" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="215" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">
      Growth Formula
    </text>
    <text x="400" y="235" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
      newCapacity = oldCapacity + (oldCapacity &gt;&gt; 1)
    </text>
    <text x="400" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9" fontStyle="italic">
      Bitwise right shift by 1 = divide by 2
    </text>
  </svg>
)

/**
 * Add Operations Diagram - Shows O(1) vs O(n) add
 */
const AddOperationsDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-add" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Add Operations: add(E) vs add(int, E)
    </text>

    {/* add(E) - O(1) */}
    <text x="200" y="60" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">
      add(E) - O(1) amortized
    </text>

    <rect x="50" y="75" width="300" height="50" rx="4" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1"/>
    {['A', 'B', 'C', 'D', 'E'].map((val, i) => (
      <g key={i}>
        <rect x={55 + i * 55} y="80" width="50" height="40" rx="2" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
        <text x={80 + i * 55} y="105" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">{val}</text>
      </g>
    ))}
    <rect x="330" y="80" width="50" height="40" rx="2" fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" strokeWidth="2" strokeDasharray="4"/>
    <text x="355" y="105" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">+F</text>

    <text x="200" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">
      Just append at end - no shifting needed
    </text>

    {/* add(int, E) - O(n) */}
    <text x="200" y="195" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">
      add(2, X) - O(n)
    </text>

    {/* Before */}
    <rect x="50" y="210" width="300" height="50" rx="4" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1"/>
    {['A', 'B', 'C', 'D', 'E'].map((val, i) => (
      <g key={i}>
        <rect
          x={55 + i * 55}
          y="215"
          width="50"
          height="40"
          rx="2"
          fill={i >= 2 ? "rgba(245, 158, 11, 0.3)" : "rgba(100, 116, 139, 0.2)"}
          stroke={i >= 2 ? "#f59e0b" : "#64748b"}
          strokeWidth="1"
        />
        <text
          x={80 + i * 55}
          y="240"
          textAnchor="middle"
          fill={i >= 2 ? "#fbbf24" : "#94a3b8"}
          fontSize="11"
          fontWeight="bold"
        >
          {val}
        </text>
      </g>
    ))}

    <text x="400" y="235" fill="#94a3b8" fontSize="10">← shift right</text>

    {/* After */}
    <rect x="450" y="210" width="330" height="50" rx="4" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1"/>
    {['A', 'B', 'X', 'C', 'D', 'E'].map((val, i) => (
      <g key={i}>
        <rect
          x={455 + i * 55}
          y="215"
          width="50"
          height="40"
          rx="2"
          fill={i === 2 ? "rgba(249, 115, 22, 0.3)" : "rgba(100, 116, 139, 0.2)"}
          stroke={i === 2 ? "#f97316" : "#64748b"}
          strokeWidth="1"
        />
        <text
          x={480 + i * 55}
          y="240"
          textAnchor="middle"
          fill={i === 2 ? "#f97316" : "#94a3b8"}
          fontSize="11"
          fontWeight="bold"
        >
          {val}
        </text>
      </g>
    ))}

    <text x="615" y="280" textAnchor="middle" fill="#94a3b8" fontSize="10">
      C, D, E shifted right, then X inserted
    </text>
  </svg>
)

/**
 * Remove Operations Diagram - Shows element shifting
 */
const RemoveOperationsDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-remove" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      remove(2) - O(n) Linear Time
    </text>

    {/* Before */}
    <text x="200" y="60" textAnchor="middle" fill="#94a3b8" fontSize="11">Before: remove index 2</text>
    <rect x="50" y="75" width="330" height="50" rx="4" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    {['A', 'B', 'C', 'D', 'E', 'F'].map((val, i) => (
      <g key={i}>
        <rect
          x={55 + i * 55}
          y="80"
          width="50"
          height="40"
          rx="2"
          fill={i === 2 ? "rgba(239, 68, 68, 0.3)" : "rgba(100, 116, 139, 0.2)"}
          stroke={i === 2 ? "#ef4444" : "#64748b"}
          strokeWidth={i === 2 ? "2" : "1"}
        />
        <text
          x={80 + i * 55}
          y="105"
          textAnchor="middle"
          fill={i === 2 ? "#f87171" : "#94a3b8"}
          fontSize="11"
          fontWeight="bold"
        >
          {val}
        </text>
      </g>
    ))}
    <text x="400" y="100" fill="#ef4444" fontSize="10" fontWeight="bold">← remove C</text>

    {/* Arrow down */}
    <line x1="200" y1="135" x2="200" y2="155" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrow-remove)"/>

    {/* After */}
    <text x="200" y="185" textAnchor="middle" fill="#94a3b8" fontSize="11">After: shift left</text>
    <rect x="50" y="200" width="275" height="50" rx="4" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    {['A', 'B', 'D', 'E', 'F'].map((val, i) => (
      <g key={i}>
        <rect
          x={55 + i * 55}
          y="205"
          width="50"
          height="40"
          rx="2"
          fill={i >= 2 ? "rgba(34, 197, 94, 0.2)" : "rgba(100, 116, 139, 0.2)"}
          stroke={i >= 2 ? "#22c55e" : "#64748b"}
          strokeWidth="1"
        />
        <text
          x={80 + i * 55}
          y="230"
          textAnchor="middle"
          fill={i >= 2 ? "#4ade80" : "#94a3b8"}
          fontSize="11"
          fontWeight="bold"
        >
          {val}
        </text>
      </g>
    ))}
    <rect x="330" y="205" width="50" height="40" rx="2" fill="rgba(100, 116, 139, 0.05)" stroke="#475569" strokeWidth="1" strokeDasharray="4"/>
    <text x="355" y="230" textAnchor="middle" fill="#64748b" fontSize="10">null</text>

    <text x="450" y="225" fill="#94a3b8" fontSize="10">
      D, E, F shifted left by 1
    </text>
  </svg>
)

/**
 * Get/Set Operations Diagram - Shows O(1) random access
 */
const GetSetDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-get" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      get(3) and set(3, X) - O(1) Direct Array Access
    </text>

    {/* Array */}
    <rect x="150" y="60" width="500" height="50" rx="4" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((val, i) => (
      <g key={i}>
        <rect
          x={155 + i * 49}
          y="65"
          width="45"
          height="40"
          rx="2"
          fill={i === 3 ? "rgba(34, 197, 94, 0.3)" : "rgba(100, 116, 139, 0.2)"}
          stroke={i === 3 ? "#22c55e" : "#64748b"}
          strokeWidth={i === 3 ? "2" : "1"}
        />
        <text
          x={177.5 + i * 49}
          y="90"
          textAnchor="middle"
          fill={i === 3 ? "#4ade80" : "#94a3b8"}
          fontSize="11"
          fontWeight="bold"
        >
          {val}
        </text>
        {/* Index label */}
        <text
          x={177.5 + i * 49}
          y="130"
          textAnchor="middle"
          fill={i === 3 ? "#22c55e" : "#64748b"}
          fontSize="9"
        >
          [{i}]
        </text>
      </g>
    ))}

    {/* Arrow pointing to index 3 */}
    <line x1="400" y1="150" x2="332" y2="115" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-get)"/>

    <text x="405" y="155" fill="#22c55e" fontSize="11" fontWeight="bold">
      Direct access: elementData[3]
    </text>

    <text x="400" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
      No iteration needed - just calculate memory address and retrieve
    </text>
  </svg>
)

/**
 * Fail-Fast Iterator Diagram - Shows modCount checking
 */
const FailFastDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-fail" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Fail-Fast Iterator with modCount
    </text>

    {/* ArrayList box */}
    <rect x="50" y="60" width="150" height="80" rx="8" fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" strokeWidth="2"/>
    <text x="125" y="85" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">ArrayList</text>
    <text x="60" y="110" fill="#94a3b8" fontSize="10">modCount: 5</text>
    <text x="60" y="130" fill="#64748b" fontSize="9">tracks structural</text>
    <text x="60" y="145" fill="#64748b" fontSize="9">modifications</text>

    {/* Iterator box */}
    <rect x="300" y="60" width="180" height="80" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="390" y="85" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Iterator</text>
    <text x="310" y="110" fill="#94a3b8" fontSize="10">expectedModCount: 5</text>
    <text x="310" y="130" fill="#64748b" fontSize="9">snapshot taken at</text>
    <text x="310" y="145" fill="#64748b" fontSize="9">iterator creation</text>

    {/* Arrow */}
    <line x1="200" y1="100" x2="295" y2="100" stroke="#22c55e" strokeWidth="2"/>
    <text x="247" y="90" textAnchor="middle" fill="#22c55e" fontSize="9">copy</text>

    {/* Modification */}
    <rect x="50" y="170" width="150" height="60" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="125" y="195" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">list.add(x)</text>
    <text x="60" y="220" fill="#f87171" fontSize="10">modCount: 6 ✗</text>

    {/* Check fails */}
    <rect x="300" y="170" width="180" height="60" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="390" y="195" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">it.next()</text>
    <text x="310" y="220" fill="#f87171" fontSize="10">expectedModCount: 5 ✗</text>

    {/* Exception */}
    <rect x="550" y="170" width="200" height="60" rx="8" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="650" y="195" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Throw Exception</text>
    <text x="560" y="215" fill="#f87171" fontSize="8">ConcurrentModification</text>
    <text x="560" y="228" fill="#f87171" fontSize="8">Exception</text>

    {/* Arrows showing flow */}
    <line x1="200" y1="200" x2="295" y2="200" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-fail)"/>
    <line x1="480" y1="200" x2="545" y2="200" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-fail)"/>

    {/* Note */}
    <text x="400" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
      6 ≠ 5: Iterator detects concurrent modification and fails fast
    </text>
  </svg>
)

/**
 * ArrayList vs LinkedList Diagram - Memory comparison
 */
const ArrayListVsLinkedListDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-link" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ArrayList vs LinkedList: Memory Layout
    </text>

    {/* ArrayList */}
    <text x="400" y="60" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">
      ArrayList: Contiguous Memory (Cache-Friendly)
    </text>

    <rect x="150" y="75" width="500" height="50" rx="4" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((val, i) => (
      <rect
        key={i}
        x={155 + i * 49}
        y="80"
        width="45"
        height="40"
        rx="2"
        fill="rgba(34, 197, 94, 0.3)"
        stroke="#22c55e"
        strokeWidth="1"
      />
    ))}
    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((val, i) => (
      <text
        key={i}
        x={177.5 + i * 49}
        y="105"
        textAnchor="middle"
        fill="#4ade80"
        fontSize="10"
        fontWeight="bold"
      >
        {val}
      </text>
    ))}

    <text x="400" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">
      Memory: ~4KB for 1000 integers + overhead
    </text>
    <text x="400" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">
      Access: O(1) - direct index calculation
    </text>

    {/* LinkedList */}
    <text x="400" y="195" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">
      LinkedList: Scattered Memory (Pointer Chasing)
    </text>

    {/* Nodes scattered */}
    {[
      { x: 100, y: 210, val: 'A' },
      { x: 220, y: 210, val: 'B' },
      { x: 340, y: 210, val: 'C' },
      { x: 460, y: 210, val: 'D' },
      { x: 580, y: 210, val: 'E' }
    ].map((node, i, arr) => (
      <g key={i}>
        <rect
          x={node.x}
          y={node.y}
          width="80"
          height="50"
          rx="4"
          fill="rgba(139, 92, 246, 0.2)"
          stroke="#8b5cf6"
          strokeWidth="1"
        />
        <text x={node.x + 15} y={node.y + 20} fill="#64748b" fontSize="7">prev</text>
        <text x={node.x + 40} y={node.y + 30} textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">
          {node.val}
        </text>
        <text x={node.x + 65} y={node.y + 20} fill="#64748b" fontSize="7">next</text>

        {/* Arrow to next node */}
        {i < arr.length - 1 && (
          <line
            x1={node.x + 80}
            y1={node.y + 25}
            x2={arr[i + 1].x}
            y2={node.y + 25}
            stroke="#8b5cf6"
            strokeWidth="2"
            markerEnd="url(#arrow-link)"
          />
        )}
      </g>
    ))}

    <text x="400" y="285" textAnchor="middle" fill="#94a3b8" fontSize="9">
      Memory: ~40KB for 1000 integers (10x more due to node overhead)
    </text>
    <text x="400" y="300" textAnchor="middle" fill="#94a3b8" fontSize="9">
      Access: O(n) - must traverse from head/tail
    </text>
  </svg>
)

/**
 * Time Complexity Diagram
 */
const TimeComplexityDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ArrayList Time Complexity Summary
    </text>

    {/* Fast Operations - Green */}
    <rect x="50" y="50" width="330" height="120" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="215" y="75" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">
      Fast Operations - O(1)
    </text>
    <text x="60" y="100" fill="#4ade80" fontSize="11">• get(index)</text>
    <text x="60" y="120" fill="#4ade80" fontSize="11">• set(index, element)</text>
    <text x="60" y="140" fill="#4ade80" fontSize="11">• add(element) - amortized</text>
    <text x="60" y="160" fill="#4ade80" fontSize="11">• size(), isEmpty()</text>

    {/* Slow Operations - Orange */}
    <rect x="420" y="50" width="330" height="120" rx="8" fill="rgba(249, 115, 22, 0.1)" stroke="#f97316" strokeWidth="2"/>
    <text x="585" y="75" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">
      Slow Operations - O(n)
    </text>
    <text x="430" y="100" fill="#fb923c" fontSize="11">• add(index, element)</text>
    <text x="430" y="120" fill="#fb923c" fontSize="11">• remove(index)</text>
    <text x="430" y="140" fill="#fb923c" fontSize="11">• contains(object)</text>
    <text x="430" y="160" fill="#fb923c" fontSize="11">• indexOf(object)</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * ArrayListInternals Component
 */
function ArrayListInternals({ onBack, breadcrumb }) {
  // State for modal navigation
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'why-arraylist',
      name: 'Why ArrayList?',
      icon: '⚡',
      color: '#22c55e',
      description: 'The most commonly used List implementation in Java. O(1) random access, dynamic resizing, and cache-friendly memory layout.',
      diagram: TimeComplexityDiagram,
      details: [
        {
          name: 'Key Advantages',
          diagram: TimeComplexityDiagram,
          explanation: 'ArrayList is the most commonly used List implementation in Java, providing dynamic array functionality. Key advantages include O(1) random access by index, automatic dynamic resizing, contiguous memory layout for cache-friendly performance, and simplicity for most use cases.',
          codeExample: `// ArrayList vs Array
String[] array = new String[10];  // Fixed size
ArrayList<String> list = new ArrayList<>();  // Dynamic

// Common operations and their time complexity
list.add("element");          // O(1) amortized
list.get(0);                  // O(1)
list.set(0, "new");          // O(1)
list.remove(0);              // O(n) - shifts elements
list.contains("element");     // O(n)
list.size();                 // O(1)`
        },
        {
          name: 'When to Use',
          explanation: 'Use ArrayList when you need frequent random access by index, mostly appending elements, iterating through elements, or when you know the approximate size. Avoid ArrayList for frequent insertions/deletions in the middle, when thread safety is required (use CopyOnWriteArrayList instead), or when a fixed size is needed (use a regular array).',
          codeExample: `// Good use cases for ArrayList
ArrayList<Integer> scores = new ArrayList<>();
for (int i = 0; i < 1000; i++) {
    scores.add(i);  // Fast append
}
int score = scores.get(500);  // O(1) random access

// Bad use case - frequent middle insertions
for (int i = 0; i < 1000; i++) {
    list.add(0, i);  // O(n) each time - very slow!
}

// Better: LinkedList for insertions
LinkedList<Integer> linkedList = new LinkedList<>();
for (int i = 0; i < 1000; i++) {
    linkedList.addFirst(i);  // O(1)
}`
        },
        {
          name: 'ArrayList vs LinkedList',
          diagram: ArrayListVsLinkedListDiagram,
          explanation: 'ArrayList uses contiguous memory with better cache locality and less memory overhead (4KB for 1000 integers), while LinkedList scatters nodes across memory with 10x more overhead (40KB for 1000 integers). ArrayList wins for random access and iteration, LinkedList only wins for queue/deque operations at ends.',
          codeExample: `// ArrayList advantages:
// - O(1) random access
// - Better cache locality
// - Less memory per element
// - Faster iteration

// LinkedList advantages:
// - O(1) add/remove at ends (as Deque)
// - O(1) insert/remove with iterator position
// - No resize overhead

// Performance comparison:
ArrayList<Integer> arrayList = new ArrayList<>();
LinkedList<Integer> linkedList = new LinkedList<>();

arrayList.get(500);   // O(1)
linkedList.get(500);  // O(n) - traverse 500 nodes

arrayList.add(0, x);     // O(n) - shift all
linkedList.addFirst(x);  // O(1)

// In practice, ArrayList is almost always faster`
        }
      ]
    },
    {
      id: 'internal-structure',
      name: 'Internal Structure',
      icon: '🏗️',
      color: '#f97316',
      description: 'ArrayList is backed by an Object[] array with dynamic capacity management. Understanding size vs capacity is crucial.',
      diagram: InternalStructureDiagram,
      details: [
        {
          name: 'Backing Array',
          diagram: InternalStructureDiagram,
          explanation: 'ArrayList is backed by an Object[] array that grows dynamically. Key internal fields include elementData (the backing Object array), size (number of actual elements, not capacity), and modCount (structural modification counter for fail-fast iterators). Default capacity is 10 when the first element is added. Empty ArrayList has capacity 0 with no allocation until first add.',
          codeExample: `// Simplified ArrayList structure
public class ArrayList<E> {
    // Backing array - stores actual elements
    transient Object[] elementData;

    // Number of elements (NOT capacity)
    private int size;

    // For fail-fast iterators
    protected transient int modCount = 0;

    // Default initial capacity
    private static final int DEFAULT_CAPACITY = 10;

    // Constructors
    public ArrayList() {
        // Start with empty array, allocate on first add
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }

    public ArrayList(int initialCapacity) {
        if (initialCapacity > 0) {
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {
            this.elementData = EMPTY_ELEMENTDATA;
        } else {
            throw new IllegalArgumentException();
        }
    }
}`
        },
        {
          name: 'Size vs Capacity',
          diagram: InternalStructureDiagram,
          explanation: 'Size is the number of actual elements stored in the ArrayList, while capacity is the length of the internal backing array. Size is always less than or equal to capacity. When size equals capacity, adding a new element triggers a resize operation where a new larger array is created and all elements are copied.',
          codeExample: `// Size vs Capacity example
ArrayList<String> list = new ArrayList<>();
// size = 0, capacity = 0 (no allocation yet)

list.add("A");
// size = 1, capacity = 10 (default capacity allocated)

for (int i = 0; i < 9; i++) {
    list.add("X");
}
// size = 10, capacity = 10 (full)

list.add("B");
// size = 11, capacity = 15 (grew by 50%)

// Check capacity (reflection required - no public method)
// But you can check size easily:
System.out.println(list.size());  // 11

// Trim to exact size
list.trimToSize();
// size = 11, capacity = 11 (no wasted space)`
        },
        {
          name: 'Memory Layout',
          explanation: 'ArrayList uses contiguous memory allocation, storing all elements sequentially in a single Object[] array. This provides excellent cache locality since accessing consecutive elements loads them into CPU cache together. The memory overhead is minimal - just the array plus a few integer fields. This contrasts with LinkedList where each element requires a separate Node object with prev/next pointers.',
          codeExample: `// Memory comparison for 1000 integers:

// ArrayList:
// - Object header: ~12 bytes
// - elementData reference: ~8 bytes
// - size field: 4 bytes
// - modCount: 4 bytes
// - Array: 1000 * 4 bytes = 4000 bytes
// Total: ~4028 bytes

// LinkedList:
// - Each node has: element, prev, next, object header
// - ~40 bytes per node
// - 1000 nodes = ~40,000 bytes
// Total: ~40,000 bytes (10x more!)

// Cache locality benefits:
for (int i = 0; i < list.size(); i++) {
    process(list.get(i));  // Sequential access
    // In ArrayList: next element likely in cache
    // In LinkedList: must follow pointer (cache miss)
}`
        }
      ]
    },
    {
      id: 'growth-strategy',
      name: 'Growth Strategy',
      icon: '📈',
      color: '#3b82f6',
      description: 'ArrayList grows by 50% (1.5x) when capacity is exceeded. Understanding the growth formula and amortized analysis.',
      diagram: GrowthStrategyDiagram,
      details: [
        {
          name: 'Growth Formula',
          diagram: GrowthStrategyDiagram,
          explanation: 'ArrayList grows by 50% (1.5x) when capacity is exceeded. The growth formula is: newCapacity = oldCapacity + (oldCapacity >> 1), where >> 1 is a bitwise right shift that divides by 2. The growth sequence is: 10 → 15 → 22 → 33 → 49 → 73 → 109...',
          codeExample: `// Growth mechanism
private void grow(int minCapacity) {
    int oldCapacity = elementData.length;

    // New capacity = old + old/2 (50% growth)
    int newCapacity = oldCapacity + (oldCapacity >> 1);

    // Ensure minimum capacity
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;

    // Check for overflow
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);

    // Copy to new array
    elementData = Arrays.copyOf(elementData, newCapacity);
}

// Capacity growth sequence:
// 10 → 15 → 22 → 33 → 49 → 73 → 109 → 163 → 244...
// Each step: newCap = oldCap + oldCap/2`
        },
        {
          name: 'Why 1.5x not 2x?',
          explanation: 'ArrayList uses 1.5x growth instead of 2x for several reasons: 1.5x allows memory reuse in some allocators since previously freed memory blocks can be reused for future allocations. 2x growth can lead to memory fragmentation where old blocks can never be reused. 1.5x provides a good balance between growth speed and memory efficiency.',
          codeExample: `// Why 1.5x growth factor?

// With 2x growth:
// 10 → 20 → 40 → 80 → 160 → 320
// Sum of previous: 10+20+40+80+160 = 310
// Next allocation: 320
// Can't reuse any previous blocks!

// With 1.5x growth:
// 10 → 15 → 22 → 33 → 49 → 73
// Sum of previous: 10+15+22+33+49 = 129
// Next allocation: 73
// CAN potentially reuse previous blocks

// Also:
// - 1.5x is gentler on memory
// - Still grows fast enough
// - Better cache behavior
// - Industry standard (vector uses similar)`
        },
        {
          name: 'Amortized O(1)',
          explanation: 'Although resizing is O(n), the add operation is O(1) amortized. Most adds just store in the array (O(1)), but occasional resizes copy all elements (O(n)). Over n operations, the total work is O(n), giving O(1) per operation amortized. This is why pre-sizing with ArrayList(capacity) is a common optimization.',
          codeExample: `// Amortized analysis example:
// Add 16 elements to empty ArrayList (initial capacity 10)

// Adds 1-10: O(1) each, total = 10 operations
// Add 11: resize to 15, copy 10 = 10 + 1 = 11 operations
// Adds 12-15: O(1) each, total = 4 operations
// Add 16: resize to 22, copy 15 = 15 + 1 = 16 operations

// Total work: 10 + 11 + 4 + 16 = 41 operations
// Per element: 41/16 ≈ 2.5 operations = O(1) amortized

// Optimization: pre-size if you know capacity
// BAD - many resizes
ArrayList<Integer> list = new ArrayList<>();
for (int i = 0; i < 10000; i++) {
    list.add(i);  // Multiple resizes
}

// GOOD - single allocation
ArrayList<Integer> list = new ArrayList<>(10000);
for (int i = 0; i < 10000; i++) {
    list.add(i);  // No resizes!
}`
        }
      ]
    },
    {
      id: 'add-operations',
      name: 'Add Operations',
      icon: '➕',
      color: '#f59e0b',
      description: 'Understanding the difference between add(E) at the end (O(1) amortized) and add(int, E) at an index (O(n)).',
      diagram: AddOperationsDiagram,
      details: [
        {
          name: 'add(E) - End',
          diagram: AddOperationsDiagram,
          explanation: 'Adding at the end with add(E) is O(1) amortized - the most common and efficient operation. It may trigger a resize if the array is full, but most of the time it just stores the element in the array and increments size.',
          codeExample: `// Add at end - O(1) amortized
public boolean add(E e) {
    modCount++;
    final int s = size;
    Object[] elementData = this.elementData;

    if (s == elementData.length)
        elementData = grow();  // Resize if needed

    elementData[s] = e;
    size = s + 1;
    return true;
}

// Example usage:
ArrayList<String> list = new ArrayList<>();
list.add("A");  // O(1) - just store at index 0
list.add("B");  // O(1) - just store at index 1
list.add("C");  // O(1) - just store at index 2
// ... continues until capacity reached
// Then one O(n) resize, then O(1) adds continue`
        },
        {
          name: 'add(int, E) - Index',
          diagram: AddOperationsDiagram,
          explanation: 'Adding at a specific index with add(int index, E element) is O(n) because it must shift all elements from that index onwards to the right by one position. This uses System.arraycopy which is a native method optimized for array copying, but it is still linear time. Avoid this operation in hot paths.',
          codeExample: `// Add at index - O(n)
public void add(int index, E element) {
    rangeCheckForAdd(index);
    modCount++;
    final int s = size;
    Object[] elementData = this.elementData;

    if (s == elementData.length)
        elementData = grow();

    // Shift elements right - this is O(n)!
    System.arraycopy(elementData, index,
                     elementData, index + 1,
                     s - index);

    elementData[index] = element;
    size = s + 1;
}

// Example: add at index 2 in [A, B, C, D, E]
// Step 1: Shift [C, D, E] right → [A, B, _, C, D, E]
// Step 2: Insert X at index 2 → [A, B, X, C, D, E]

// Performance impact:
list.add(0, x);  // Worst case - shift ALL elements
list.add(list.size()/2, x);  // Shift half
list.add(list.size(), x);  // Same as add(x) - O(1)`
        },
        {
          name: 'addAll(Collection)',
          explanation: 'The addAll method adds all elements from a collection in O(n) time where n is the size of the collection. It may trigger a single resize to accommodate all new elements at once, which is more efficient than adding elements one by one if each individual add would trigger a resize.',
          codeExample: `// addAll - O(n) where n = collection size
public boolean addAll(Collection<? extends E> c) {
    Object[] a = c.toArray();
    modCount++;
    int numNew = a.length;
    if (numNew == 0)
        return false;

    Object[] elementData;
    final int s;
    if (numNew > (elementData = this.elementData).length - (s = size))
        elementData = grow(s + numNew);

    // Copy all at once
    System.arraycopy(a, 0, elementData, s, numNew);
    size = s + numNew;
    return true;
}

// Usage example:
ArrayList<String> list1 = new ArrayList<>();
list1.add("A");
list1.add("B");

ArrayList<String> list2 = new ArrayList<>();
list2.add("C");
list2.add("D");

list1.addAll(list2);  // [A, B, C, D]

// More efficient than:
for (String s : list2) {
    list1.add(s);  // Might resize multiple times
}`
        }
      ]
    },
    {
      id: 'remove-operations',
      name: 'Remove Operations',
      icon: '✂️',
      color: '#ef4444',
      description: 'Remove operations shift elements left, making them O(n). ArrayList never shrinks automatically.',
      diagram: RemoveOperationsDiagram,
      details: [
        {
          name: 'remove(int) - Index',
          diagram: RemoveOperationsDiagram,
          explanation: 'Removing by index with remove(int index) is O(n) because it must shift all elements after the removed index to the left by one position. The old last element is set to null to help garbage collection. Returns the removed element.',
          codeExample: `// Remove by index - O(n)
public E remove(int index) {
    Objects.checkIndex(index, size);
    final Object[] es = elementData;

    E oldValue = (E) es[index];
    fastRemove(es, index);

    return oldValue;
}

private void fastRemove(Object[] es, int i) {
    modCount++;
    final int newSize = size - 1;

    if (newSize > i)
        // Shift elements left
        System.arraycopy(es, i + 1, es, i, newSize - i);

    es[size = newSize] = null;  // Clear for GC
}

// Example: remove index 2 from [A, B, C, D, E, F]
// Step 1: Shift [D, E, F] left → [A, B, D, E, F, _]
// Step 2: Set last to null → [A, B, D, E, F, null]
// size becomes 5`
        },
        {
          name: 'remove(Object)',
          explanation: 'Removing by object with remove(Object o) is O(n) because it performs a linear search to find the element (comparing with equals()), then shifts elements left. Only removes the first occurrence. Returns true if an element was removed, false otherwise. Handles null elements correctly.',
          codeExample: `// Remove by object - O(n)
public boolean remove(Object o) {
    final Object[] es = elementData;
    final int size = this.size;

    // Linear search
    int i = 0;
    if (o == null) {
        for (; i < size; i++)
            if (es[i] == null) break;
    } else {
        for (; i < size; i++)
            if (o.equals(es[i])) break;
    }

    if (i < size) {
        fastRemove(es, i);
        return true;
    }
    return false;
}

// Example usage:
ArrayList<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
list.add("B");  // Duplicate

list.remove("B");  // Removes first B only
// Result: [A, C, B]

// Remove all occurrences:
list.removeIf(s -> s.equals("B"));
// Result: [A, C]`
        },
        {
          name: 'clear() and trimToSize()',
          explanation: 'The clear() method sets all elements to null (for garbage collection) and resets size to 0, but does NOT shrink the array - capacity remains the same. To reclaim unused memory, explicitly call trimToSize() which creates a new array exactly sized to the current number of elements. ArrayList never shrinks automatically.',
          codeExample: `// Clear - O(n) but doesn't shrink
public void clear() {
    modCount++;
    final Object[] es = elementData;
    for (int to = size, i = size = 0; i < to; i++)
        es[i] = null;  // Help GC
    // Capacity unchanged!
}

// Trim to size - reclaim unused memory
public void trimToSize() {
    modCount++;
    if (size < elementData.length) {
        elementData = (size == 0)
            ? EMPTY_ELEMENTDATA
            : Arrays.copyOf(elementData, size);
    }
}

// Example:
ArrayList<Integer> list = new ArrayList<>(1000);
for (int i = 0; i < 10; i++) {
    list.add(i);
}
// size = 10, capacity = 1000 (wasted space!)

list.trimToSize();
// size = 10, capacity = 10 (no waste)

list.clear();
// size = 0, but capacity still 10!`
        }
      ]
    },
    {
      id: 'get-set',
      name: 'Get/Set Operations',
      icon: '🎯',
      color: '#22c55e',
      description: 'Direct array access makes get and set O(1) - ArrayList\'s main advantage over LinkedList.',
      diagram: GetSetDiagram,
      details: [
        {
          name: 'get(int) - O(1)',
          diagram: GetSetDiagram,
          explanation: 'The get method provides O(1) random access by directly indexing into the backing array. This is ArrayList\'s main advantage - no traversal needed, just bounds checking and array access. The method uses Objects.checkIndex for bounds checking which throws IndexOutOfBoundsException if index is invalid.',
          codeExample: `// Get - O(1)
public E get(int index) {
    Objects.checkIndex(index, size);
    return elementData(index);
}

E elementData(int index) {
    return (E) elementData[index];
}

// Example usage:
ArrayList<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");

String value = list.get(1);  // "B" - instant access
// No iteration, just: elementData[1]

// Contrast with LinkedList:
LinkedList<String> linked = new LinkedList<>();
// ... same elements
String value = linked.get(1);  // Must traverse from head
// Performance: ArrayList wins for random access!`
        },
        {
          name: 'set(int, E) - O(1)',
          explanation: 'The set method replaces the element at a specific index in O(1) time. Like get, it is just a bounds check followed by direct array access. Returns the old value that was replaced. Note that set does NOT change the structure of the list, so modCount is NOT incremented.',
          codeExample: `// Set - O(1)
public E set(int index, E element) {
    Objects.checkIndex(index, size);
    E oldValue = elementData(index);
    elementData[index] = element;
    return oldValue;
}

// Example usage:
ArrayList<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");

String old = list.set(1, "X");  // Returns "B"
// list is now [A, X, C]

// Important: set does NOT increment modCount
// because it doesn't change the structure!
// Safe to use during iteration (but not recommended):
for (int i = 0; i < list.size(); i++) {
    if (list.get(i).equals("X")) {
        list.set(i, "Y");  // OK - no ConcurrentModificationException
    }
}`
        },
        {
          name: 'contains/indexOf - O(n)',
          explanation: 'The contains and indexOf methods perform linear search through the array, comparing each element with equals(). They are O(n) operations. indexOf returns the index of the first occurrence or -1 if not found. Both methods handle null elements correctly by using reference equality (==) for null.',
          codeExample: `// Contains - O(n) linear search
public boolean contains(Object o) {
    return indexOf(o) >= 0;
}

public int indexOf(Object o) {
    return indexOfRange(o, 0, size);
}

int indexOfRange(Object o, int start, int end) {
    Object[] es = elementData;
    if (o == null) {
        for (int i = start; i < end; i++)
            if (es[i] == null) return i;
    } else {
        for (int i = start; i < end; i++)
            if (o.equals(es[i])) return i;
    }
    return -1;
}

// Example usage:
ArrayList<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");

boolean has = list.contains("B");  // true - O(n) search
int index = list.indexOf("B");     // 1
int notFound = list.indexOf("Z");  // -1

// For fast lookups, use HashSet instead:
HashSet<String> set = new HashSet<>(list);
boolean hasFast = set.contains("B");  // O(1)`
        }
      ]
    },
    {
      id: 'fail-fast',
      name: 'Fail-Fast Iterator',
      icon: '⚠️',
      color: '#8b5cf6',
      description: 'ArrayList iterators use modCount to detect concurrent modifications and throw ConcurrentModificationException.',
      diagram: FailFastDiagram,
      details: [
        {
          name: 'modCount Tracking',
          diagram: FailFastDiagram,
          explanation: 'ArrayList tracks structural modifications (add, remove, clear) using modCount, a counter that increments on each structural change. When an iterator is created, it takes a snapshot of modCount as expectedModCount. On each iterator operation (next, remove), it checks if modCount equals expectedModCount. If not, it throws ConcurrentModificationException. Note that set() does NOT increment modCount since it does not change the structure.',
          codeExample: `// Iterator implementation
private class Itr implements Iterator<E> {
    int cursor;       // Index of next element
    int lastRet = -1; // Index of last returned
    int expectedModCount = modCount;  // Snapshot

    public boolean hasNext() {
        return cursor != size;
    }

    public E next() {
        checkForComodification();  // Check modCount
        int i = cursor;
        if (i >= size)
            throw new NoSuchElementException();
        Object[] elementData = ArrayList.this.elementData;
        cursor = i + 1;
        return (E) elementData[lastRet = i];
    }

    final void checkForComodification() {
        if (modCount != expectedModCount)
            throw new ConcurrentModificationException();
    }
}`
        },
        {
          name: 'Concurrent Modification',
          explanation: 'Modifying an ArrayList during iteration (except through the iterator\'s own remove method) throws ConcurrentModificationException. This fail-fast behavior is best-effort - it is designed to catch bugs, not guarantee thread-safety. For thread-safe iteration, use CopyOnWriteArrayList or synchronize on the list.',
          codeExample: `// This throws ConcurrentModificationException:
List<String> list = new ArrayList<>(Arrays.asList("a", "b", "c"));
for (String s : list) {
    if (s.equals("b")) {
        list.remove(s);  // Modifies during iteration!
        // Throws ConcurrentModificationException
    }
}

// WRONG - skips elements:
for (int i = 0; i < list.size(); i++) {
    if (shouldRemove(list.get(i))) {
        list.remove(i);  // Size changes, loop breaks
    }
}

// CORRECT - use iterator's remove:
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("b")) {
        it.remove();  // Safe - uses iterator's remove
    }
}

// BEST - use removeIf (Java 8+):
list.removeIf(s -> s.equals("b"));`
        },
        {
          name: 'Safe Iteration Patterns',
          explanation: 'There are several safe ways to modify an ArrayList during iteration: use the iterator\'s own remove() method, use removeIf() predicate (Java 8+), iterate backwards by index when removing, or collect indices to remove and remove them afterwards. Never modify the list directly during enhanced for-loop iteration.',
          codeExample: `// Pattern 1: Iterator.remove()
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (shouldRemove(s)) {
        it.remove();  // Safe
    }
}

// Pattern 2: removeIf (Java 8+)
list.removeIf(s -> shouldRemove(s));  // Cleanest!

// Pattern 3: Iterate backwards
for (int i = list.size() - 1; i >= 0; i--) {
    if (shouldRemove(list.get(i))) {
        list.remove(i);  // Safe - no index shifting issues
    }
}

// Pattern 4: Collect then remove
List<Integer> toRemove = new ArrayList<>();
for (int i = 0; i < list.size(); i++) {
    if (shouldRemove(list.get(i))) {
        toRemove.add(i);
    }
}
for (int i = toRemove.size() - 1; i >= 0; i--) {
    list.remove((int) toRemove.get(i));
}`
        }
      ]
    },
    {
      id: 'comparisons',
      name: 'ArrayList vs Others',
      icon: '⚖️',
      color: '#ec4899',
      description: 'When to use ArrayList vs LinkedList, Vector, or CopyOnWriteArrayList. Memory and performance trade-offs.',
      diagram: ArrayListVsLinkedListDiagram,
      details: [
        {
          name: 'vs LinkedList',
          diagram: ArrayListVsLinkedListDiagram,
          explanation: 'ArrayList uses contiguous memory and is almost always faster than LinkedList. LinkedList only wins for queue/deque operations (addFirst, addLast, removeFirst, removeLast). ArrayList has better cache locality, less memory overhead (4KB vs 40KB for 1000 integers), and O(1) random access. Use ArrayList by default, LinkedList only when specifically needed as a Deque.',
          codeExample: `// Memory comparison for 1000 integers:
// ArrayList: ~4KB
// LinkedList: ~40KB (10x more!)

// Performance comparison:
ArrayList<Integer> arrayList = new ArrayList<>();
LinkedList<Integer> linkedList = new LinkedList<>();

// Random access - ArrayList wins
arrayList.get(500);   // O(1)
linkedList.get(500);  // O(n) - traverse 500 nodes

// Add at end - Both O(1)
arrayList.add(x);     // O(1) amortized
linkedList.add(x);    // O(1)

// Add at beginning - LinkedList wins
arrayList.add(0, x);  // O(n) - shift all elements
linkedList.addFirst(x); // O(1)

// Iteration - ArrayList wins (cache locality)
for (Integer i : arrayList) {}  // Fast
for (Integer i : linkedList) {} // Slower (pointer chasing)

// Recommendation: Use ArrayList by default!`
        },
        {
          name: 'vs Vector',
          explanation: 'Vector is the legacy synchronized version of ArrayList. Every method is synchronized, making it thread-safe but much slower. Vector grows by 2x (100%) instead of 1.5x, leading to more wasted space. For modern code, use ArrayList with Collections.synchronizedList() or CopyOnWriteArrayList for thread-safety instead of Vector.',
          codeExample: `// Vector (legacy - avoid in new code)
Vector<String> vector = new Vector<>();
// All methods synchronized - thread-safe but slow
// Grows by 2x instead of 1.5x

// Modern alternatives:

// Option 1: Synchronized wrapper
List<String> syncList = Collections.synchronizedList(
    new ArrayList<>()
);
// Must manually synchronize iteration:
synchronized (syncList) {
    for (String s : syncList) {
        // Process
    }
}

// Option 2: CopyOnWriteArrayList (read-heavy workloads)
List<String> cowList = new CopyOnWriteArrayList<>();
// Lock-free reads, expensive writes
// Good for: mostly reads, occasional writes

// Vector vs ArrayList:
// Vector: synchronized, 2x growth, legacy
// ArrayList: not synchronized, 1.5x growth, modern`
        },
        {
          name: 'vs CopyOnWriteArrayList',
          explanation: 'CopyOnWriteArrayList is a thread-safe variant where all mutative operations (add, set, remove) create a copy of the underlying array. This makes writes very expensive but reads completely lock-free and fast. Ideal for read-heavy workloads with occasional updates, such as event listener lists or cache stores. Never shrinks automatically like ArrayList.',
          codeExample: `// CopyOnWriteArrayList - thread-safe, read-optimized
CopyOnWriteArrayList<String> cowList =
    new CopyOnWriteArrayList<>();

// Write operations - expensive
cowList.add("A");  // Creates new array copy!
cowList.set(0, "B");  // Creates new array copy!
cowList.remove(0);  // Creates new array copy!

// Read operations - lock-free and fast
String value = cowList.get(0);  // No locking
for (String s : cowList) {  // No locking
    // Even if another thread modifies during iteration,
    // this iterator sees a stable snapshot
}

// Use cases:
// - Event listeners (many reads, rare adds/removes)
// - Config caches (frequent reads, rare updates)
// - Observer patterns

// Don't use for:
// - High write frequency (too expensive)
// - Large collections (copies are costly)
// - When strong consistency needed (eventual consistency only)`
        }
      ]
    },
    {
      id: 'interview-tips',
      name: 'Interview Questions',
      icon: '💡',
      color: '#06b6d4',
      description: 'Common ArrayList interview questions covering growth, capacity, thread-safety, and optimization patterns.',
      details: [
        {
          name: 'Growth and Capacity',
          explanation: 'Key interview questions about ArrayList growth: How does ArrayList grow? (By 50%, formula: newCap = oldCap + oldCap/2). What is default capacity? (10, allocated on first add, not at construction). Why 1.5x not 2x? (Allows memory reuse, less fragmentation). Does ArrayList shrink? (No, must call trimToSize() manually).',
          codeExample: `// Q1: How does ArrayList grow?
// A: By 50% (1.5x)
newCapacity = oldCapacity + (oldCapacity >> 1)

// Q2: Default capacity?
// A: 10 (allocated on first add, not at construction)
ArrayList<String> list = new ArrayList<>();
// capacity = 0 until first add
list.add("A");
// capacity becomes 10

// Q3: Why not grow by 2x?
// A: 1.5x allows memory reuse, less fragmentation

// Q6: Does ArrayList shrink?
// A: No, call trimToSize() manually
ArrayList<Integer> list = new ArrayList<>(1000);
for (int i = 0; i < 10; i++) list.add(i);
// size=10, capacity=1000 (wasted!)
list.trimToSize();
// size=10, capacity=10 (optimal)`
        },
        {
          name: 'Thread Safety',
          explanation: 'ArrayList is NOT thread-safe. For thread-safety, use Collections.synchronizedList() (requires manual synchronization during iteration), CopyOnWriteArrayList (read-heavy workloads), or Vector (legacy, not recommended). Common interview question: ArrayList vs Vector - Vector is synchronized but slower and uses 2x growth.',
          codeExample: `// Q4: ArrayList vs Vector?
// A: Vector is synchronized (thread-safe but slower)

// Q5: How to make ArrayList thread-safe?

// Option 1: Synchronized wrapper
List<String> syncList = Collections.synchronizedList(
    new ArrayList<>()
);
// Must synchronize on iteration:
synchronized (syncList) {
    for (String s : syncList) { }
}

// Option 2: CopyOnWriteArrayList (read-heavy)
List<String> cowList = new CopyOnWriteArrayList<>();
// Safe iteration, expensive writes

// Option 3: Manual synchronization
synchronized (list) {
    list.add("item");
}

// Don't use Vector in new code!
Vector<String> vector = new Vector<>();  // Legacy`
        },
        {
          name: 'Performance and Optimization',
          explanation: 'Critical performance questions: Time complexity of add(index, element)? (O(n) due to element shifting). How to optimize for known size? (Use ArrayList(capacity) constructor to avoid resizes). Efficient removal patterns? (Use removeIf() for O(n), not individual removes which are O(n²)).',
          codeExample: `// Q: Initial capacity optimization
// BAD - many resizes
ArrayList<Integer> list = new ArrayList<>();
for (int i = 0; i < 10000; i++) {
    list.add(i);  // Multiple resizes
}

// GOOD - single allocation
ArrayList<Integer> list = new ArrayList<>(10000);
for (int i = 0; i < 10000; i++) {
    list.add(i);  // No resizes!
}

// Q7: Time complexity of add(index, element)?
// A: O(n) due to element shifting
list.add(0, x);  // Worst case - shift ALL

// Q: Efficient removal patterns
// BAD - O(n²) due to shifting on each remove
for (int i = 0; i < list.size(); i++) {
    if (shouldRemove(list.get(i))) {
        list.remove(i--);  // Shift on each remove
    }
}

// GOOD - O(n) using removeIf
list.removeIf(item -> shouldRemove(item));`
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
      { name: 'My Projects', icon: '💼', page: 'My Projects' },
      { name: 'ArrayList Internals', icon: '🗂️', page: 'ArrayList Internals' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()  // Go back to My Projects page
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)  // Close modal, stay on topic page
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
        <h1 style={titleStyle}>ArrayList - Internal Workings</h1>
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
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={ARRAYLIST_COLORS}
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
        primaryColor={ARRAYLIST_COLORS.primary}
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
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`,
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={ARRAYLIST_COLORS}
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

export default ArrayListInternals

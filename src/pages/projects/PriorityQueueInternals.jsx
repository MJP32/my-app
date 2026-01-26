/**
 * PriorityQueue Internals - Tab Template Format
 *
 * Deep dive into PriorityQueue: binary heap implementation, sift up/down operations, and heapify algorithm.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const PRIORITY_QUEUE_COLORS = {
  primary: '#f97316',
  primaryHover: '#fb923c',
  bg: 'rgba(249, 115, 22, 0.1)',
  border: 'rgba(249, 115, 22, 0.3)',
  arrow: '#ea580c',
  hoverBg: 'rgba(249, 115, 22, 0.2)',
  topicBg: 'rgba(249, 115, 22, 0.2)'
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

const BinaryHeapDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Binary Min-Heap Structure
    </text>

    {/* Tree nodes */}
    <circle cx="400" cy="70" r="28" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="400" y="76" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">1</text>

    <circle cx="280" cy="140" r="28" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="280" y="146" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">3</text>

    <circle cx="520" cy="140" r="28" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="520" y="146" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">2</text>

    <circle cx="220" cy="210" r="28" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="220" y="216" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">7</text>

    <circle cx="340" cy="210" r="28" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="340" y="216" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">4</text>

    <circle cx="460" cy="210" r="28" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="460" y="216" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">5</text>

    <circle cx="580" cy="210" r="28" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="580" y="216" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">6</text>

    {/* Tree edges */}
    <line x1="375" y1="90" x2="305" y2="118" stroke="#64748b" strokeWidth="2"/>
    <line x1="425" y1="90" x2="495" y2="118" stroke="#64748b" strokeWidth="2"/>
    <line x1="255" y1="160" x2="235" y2="188" stroke="#64748b" strokeWidth="2"/>
    <line x1="305" y1="160" x2="325" y2="188" stroke="#64748b" strokeWidth="2"/>
    <line x1="495" y1="160" x2="475" y2="188" stroke="#64748b" strokeWidth="2"/>
    <line x1="545" y1="160" x2="565" y2="188" stroke="#64748b" strokeWidth="2"/>

    {/* Index labels */}
    <text x="400" y="48" textAnchor="middle" fill="#f97316" fontSize="11">[0]</text>
    <text x="280" y="118" textAnchor="middle" fill="#60a5fa" fontSize="11">[1]</text>
    <text x="520" y="118" textAnchor="middle" fill="#60a5fa" fontSize="11">[2]</text>
    <text x="220" y="250" textAnchor="middle" fill="#4ade80" fontSize="11">[3]</text>
    <text x="340" y="250" textAnchor="middle" fill="#4ade80" fontSize="11">[4]</text>
    <text x="460" y="250" textAnchor="middle" fill="#4ade80" fontSize="11">[5]</text>
    <text x="580" y="250" textAnchor="middle" fill="#4ade80" fontSize="11">[6]</text>

    {/* Array representation */}
    <text x="100" y="270" fill="#94a3b8" fontSize="12">Array:</text>
    <rect x="150" y="255" width="30" height="25" fill="#f97316" stroke="#fb923c" strokeWidth="1"/>
    <text x="165" y="272" textAnchor="middle" fill="white" fontSize="12">1</text>
    <rect x="180" y="255" width="30" height="25" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="195" y="272" textAnchor="middle" fill="white" fontSize="12">3</text>
    <rect x="210" y="255" width="30" height="25" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="225" y="272" textAnchor="middle" fill="white" fontSize="12">2</text>
    <rect x="240" y="255" width="30" height="25" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="255" y="272" textAnchor="middle" fill="white" fontSize="12">7</text>
    <rect x="270" y="255" width="30" height="25" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="285" y="272" textAnchor="middle" fill="white" fontSize="12">4</text>
    <rect x="300" y="255" width="30" height="25" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="315" y="272" textAnchor="middle" fill="white" fontSize="12">5</text>
    <rect x="330" y="255" width="30" height="25" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="345" y="272" textAnchor="middle" fill="white" fontSize="12">6</text>
  </svg>
)

const IndexFormulaDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Array Index Formulas
    </text>

    <rect x="50" y="50" width="200" height="60" rx="8" fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Parent Index</text>
    <text x="150" y="98" textAnchor="middle" fill="#e2e8f0" fontSize="14">(i - 1) / 2</text>

    <rect x="300" y="50" width="200" height="60" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Left Child Index</text>
    <text x="400" y="98" textAnchor="middle" fill="#e2e8f0" fontSize="14">2 * i + 1</text>

    <rect x="550" y="50" width="200" height="60" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Right Child Index</text>
    <text x="650" y="98" textAnchor="middle" fill="#e2e8f0" fontSize="14">2 * i + 2</text>

    <text x="400" y="150" textAnchor="middle" fill="#64748b" fontSize="11">
      Example: For index 1 (value 3): Parent = (1-1)/2 = 0, Left = 2*1+1 = 3, Right = 2*1+2 = 4
    </text>
  </svg>
)

const TimeComplexityDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Time Complexity
    </text>

    <rect x="50" y="50" width="140" height="120" rx="8" fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" strokeWidth="2"/>
    <text x="120" y="80" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">offer()/add()</text>
    <text x="120" y="105" textAnchor="middle" fill="#4ade80" fontSize="20" fontWeight="bold">O(log n)</text>
    <text x="120" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10">Sift Up</text>

    <rect x="210" y="50" width="140" height="120" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="280" y="80" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">poll()/remove()</text>
    <text x="280" y="105" textAnchor="middle" fill="#4ade80" fontSize="20" fontWeight="bold">O(log n)</text>
    <text x="280" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10">Sift Down</text>

    <rect x="370" y="50" width="140" height="120" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="440" y="80" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">peek()</text>
    <text x="440" y="105" textAnchor="middle" fill="#4ade80" fontSize="20" fontWeight="bold">O(1)</text>
    <text x="440" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10">Return Root</text>

    <rect x="530" y="50" width="140" height="120" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="600" y="80" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">contains()</text>
    <text x="600" y="105" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">O(n)</text>
    <text x="600" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10">Linear Search</text>

    <rect x="690" y="50" width="100" height="120" rx="8" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="740" y="80" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="bold">heapify()</text>
    <text x="740" y="105" textAnchor="middle" fill="#4ade80" fontSize="20" fontWeight="bold">O(n)</text>
    <text x="740" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10">Build Heap</text>
  </svg>
)

const SiftUpDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowUp" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Sift Up: Insert value 2 into heap [1, 3, 4, 7, 5]
    </text>

    {/* Step 1 */}
    <text x="130" y="55" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Step 1: Add at end</text>
    <circle cx="130" cy="85" r="18" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="130" y="91" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
    <circle cx="90" cy="130" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="90" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
    <circle cx="170" cy="130" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="170" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
    <circle cx="60" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="60" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">7</text>
    <circle cx="120" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="120" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
    <circle cx="200" cy="175" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="200" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
    <line x1="115" y1="100" x2="100" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="145" y1="100" x2="160" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="80" y1="145" x2="70" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="100" y1="145" x2="110" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="180" y1="145" x2="195" y2="160" stroke="#64748b" strokeWidth="1.5"/>

    {/* Step 2 */}
    <text x="400" y="55" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Step 2: Compare 2 with parent 4</text>
    <circle cx="400" cy="85" r="18" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="400" y="91" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
    <circle cx="360" cy="130" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="360" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
    <circle cx="440" cy="130" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="440" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
    <circle cx="330" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="330" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">7</text>
    <circle cx="390" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="390" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
    <circle cx="470" cy="175" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="470" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
    <line x1="385" y1="100" x2="370" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="415" y1="100" x2="430" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="350" y1="145" x2="340" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="370" y1="145" x2="380" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="450" y1="145" x2="465" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <text x="455" y="118" fill="#4ade80" fontSize="10">swap!</text>

    {/* Step 3 - Final */}
    <text x="670" y="55" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Step 3: Compare 2 with parent 1 - DONE</text>
    <circle cx="670" cy="85" r="18" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="670" y="91" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
    <circle cx="630" cy="130" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="630" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
    <circle cx="710" cy="130" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="710" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
    <circle cx="600" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="600" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">7</text>
    <circle cx="660" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="660" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
    <circle cx="740" cy="175" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="740" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
    <line x1="655" y1="100" x2="640" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="685" y1="100" x2="700" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="620" y1="145" x2="610" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="640" y1="145" x2="650" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="720" y1="145" x2="735" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <text x="695" y="118" fill="#94a3b8" fontSize="10">{`2 &gt; 1`}</text>

    {/* Array result */}
    <text x="400" y="230" textAnchor="middle" fill="#94a3b8" fontSize="12">Final Array: [1, 3, 2, 7, 5, 4]</text>
  </svg>
)

const SiftDownDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Sift Down: Remove root from heap [1, 3, 2, 7, 5, 4]
    </text>

    {/* Step 1 */}
    <text x="130" y="55" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Step 1: Move last to root</text>
    <circle cx="130" cy="85" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="130" y="91" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
    <circle cx="90" cy="130" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="90" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
    <circle cx="170" cy="130" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="170" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
    <circle cx="60" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="60" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">7</text>
    <circle cx="120" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="120" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
    <line x1="115" y1="100" x2="100" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="145" y1="100" x2="160" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="80" y1="145" x2="70" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="100" y1="145" x2="110" y2="160" stroke="#64748b" strokeWidth="1.5"/>

    {/* Step 2 */}
    <text x="400" y="55" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Step 2: Compare 4 with children (3,2)</text>
    <circle cx="400" cy="85" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="91" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
    <circle cx="360" cy="130" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="360" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
    <circle cx="440" cy="130" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="440" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
    <circle cx="330" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="330" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">7</text>
    <circle cx="390" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="390" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
    <line x1="385" y1="100" x2="370" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="415" y1="100" x2="430" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="350" y1="145" x2="340" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="370" y1="145" x2="380" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <text x="420" y="60" fill="#4ade80" fontSize="10">swap with smaller (2)</text>

    {/* Step 3 - Final */}
    <text x="670" y="55" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Final: Valid min-heap</text>
    <circle cx="670" cy="85" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="670" y="91" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
    <circle cx="630" cy="130" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="630" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
    <circle cx="710" cy="130" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="710" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
    <circle cx="600" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="600" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">7</text>
    <circle cx="660" cy="175" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="660" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
    <line x1="655" y1="100" x2="640" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="685" y1="100" x2="700" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="620" y1="145" x2="610" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="640" y1="145" x2="650" y2="160" stroke="#64748b" strokeWidth="1.5"/>

    {/* Array result */}
    <text x="400" y="230" textAnchor="middle" fill="#94a3b8" fontSize="12">Final Array: [2, 3, 4, 7, 5] (returned 1)</text>
  </svg>
)

const HeapifyDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Heapify: Build heap from [4, 7, 2, 5, 1, 3] - O(n) time
    </text>

    {/* Initial */}
    <text x="130" y="55" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Initial (not valid)</text>
    <circle cx="130" cy="85" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="130" y="91" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
    <circle cx="90" cy="130" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="90" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">7</text>
    <circle cx="170" cy="130" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="170" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
    <circle cx="60" cy="175" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="60" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
    <circle cx="120" cy="175" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
    <circle cx="200" cy="175" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="200" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
    <line x1="115" y1="100" x2="100" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="145" y1="100" x2="160" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="80" y1="145" x2="70" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="100" y1="145" x2="110" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="180" y1="145" x2="195" y2="160" stroke="#64748b" strokeWidth="1.5"/>

    {/* After sifting index 1 (7 swaps with 1) */}
    <text x="400" y="55" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Sift index 1: 7 swaps with 1</text>
    <circle cx="400" cy="85" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="400" y="91" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
    <circle cx="360" cy="130" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="360" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
    <circle cx="440" cy="130" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="440" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
    <circle cx="330" cy="175" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="330" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
    <circle cx="390" cy="175" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="390" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">7</text>
    <circle cx="470" cy="175" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="470" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
    <line x1="385" y1="100" x2="370" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="415" y1="100" x2="430" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="350" y1="145" x2="340" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="370" y1="145" x2="380" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="450" y1="145" x2="465" y2="160" stroke="#64748b" strokeWidth="1.5"/>

    {/* Final - valid heap */}
    <text x="670" y="55" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Sift index 0: 4 swaps with 1</text>
    <circle cx="670" cy="85" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="670" y="91" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
    <circle cx="630" cy="130" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="630" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
    <circle cx="710" cy="130" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="710" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
    <circle cx="600" cy="175" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="600" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
    <circle cx="660" cy="175" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="660" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">7</text>
    <circle cx="740" cy="175" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="740" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
    <line x1="655" y1="100" x2="640" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="685" y1="100" x2="700" y2="115" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="620" y1="145" x2="610" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="640" y1="145" x2="650" y2="160" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="720" y1="145" x2="735" y2="160" stroke="#64748b" strokeWidth="1.5"/>

    {/* Explanation */}
    <text x="400" y="240" textAnchor="middle" fill="#94a3b8" fontSize="11">
      Start from last non-leaf (index 2), sift down each node. Most work at bottom (few swaps), less at top.
    </text>
    <text x="400" y="260" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">
      Final Array: [1, 4, 2, 5, 7, 3] - Valid min-heap!
    </text>
  </svg>
)

const TwoHeapsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Two Heaps Pattern: Finding Running Median
    </text>

    {/* Max Heap (left half) */}
    <rect x="50" y="50" width="300" height="140" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Max Heap (smaller half)</text>
    <circle cx="200" cy="110" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="200" y="116" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
    <circle cx="160" cy="155" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="160" y="161" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
    <circle cx="240" cy="155" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="240" y="161" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
    <line x1="185" y1="125" x2="170" y2="140" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="215" y1="125" x2="230" y2="140" stroke="#64748b" strokeWidth="1.5"/>

    {/* Arrow and median */}
    <text x="400" y="110" textAnchor="middle" fill="#f97316" fontSize="14" fontWeight="bold">MEDIAN</text>
    <text x="400" y="135" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="bold">3.5</text>
    <text x="400" y="160" textAnchor="middle" fill="#94a3b8" fontSize="10">(3 + 4) / 2</text>

    {/* Min Heap (right half) */}
    <rect x="450" y="50" width="300" height="140" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Min Heap (larger half)</text>
    <circle cx="600" cy="110" r="18" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="600" y="116" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
    <circle cx="560" cy="155" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="560" y="161" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
    <circle cx="640" cy="155" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="640" y="161" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">6</text>
    <line x1="585" y1="125" x2="570" y2="140" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="615" y1="125" x2="630" y2="140" stroke="#64748b" strokeWidth="1.5"/>
  </svg>
)

const ComparatorDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Min-Heap vs Max-Heap Comparators
    </text>

    <rect x="50" y="50" width="320" height="100" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="210" y="80" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Min-Heap (default)</text>
    <text x="210" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="11">{`new PriorityQueue&lt;&gt;()`}</text>
    <text x="210" y="130" textAnchor="middle" fill="#94a3b8" fontSize="11">poll() returns smallest</text>

    <rect x="430" y="50" width="320" height="100" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="590" y="80" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Max-Heap</text>
    <text x="590" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="11">{`new PriorityQueue&lt;&gt;(Collections.reverseOrder())`}</text>
    <text x="590" y="130" textAnchor="middle" fill="#94a3b8" fontSize="11">poll() returns largest</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function PriorityQueueInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'binary-heap-fundamentals',
      name: 'Binary Heap Fundamentals',
      icon: '🏗️',
      color: '#f97316',
      description: 'PriorityQueue is backed by a binary min-heap stored in an array. Learn the core structure and properties.',
      diagram: BinaryHeapDiagram,
      details: [
        {
          name: 'Heap Structure',
          diagram: BinaryHeapDiagram,
          explanation: `A binary heap is a complete binary tree where each parent is smaller than (min-heap) or larger than (max-heap) its children. Java's PriorityQueue implements a min-heap by default. The heap is stored in an array without pointers - the parent-child relationships are computed from indices. This makes it memory-efficient and cache-friendly.`,
          codeExample: `// PriorityQueue internal structure
public class PriorityQueue<E> {
    transient Object[] queue;  // The heap array
    int size;
    private final Comparator<? super E> comparator;
    transient int modCount;

    private static final int DEFAULT_INITIAL_CAPACITY = 11;
}

// Array representation of heap:
//            1              Index:  0
//          /   \\
//         3     2           Index:  1, 2
//        / \\   / \\
//       7   4 5   6         Index:  3, 4, 5, 6
//
// Array: [1, 3, 2, 7, 4, 5, 6]`
        },
        {
          name: 'Index Formulas',
          diagram: IndexFormulaDiagram,
          explanation: `The key to array-based heap implementation is the index formulas. For any node at index i: its parent is at (i-1)/2, its left child is at 2*i+1, and its right child is at 2*i+2. These formulas work because a complete binary tree fills level by level, left to right.`,
          codeExample: `// Index formulas for navigation
int parent = (i - 1) / 2;      // Parent of index i
int leftChild = 2 * i + 1;      // Left child of index i
int rightChild = 2 * i + 2;     // Right child of index i

// Example: For index 4 (value 4):
// Parent: (4-1)/2 = 1 (value 3)
// Left child: 2*4+1 = 9 (doesn't exist in our array)
// Right child: 2*4+2 = 10 (doesn't exist)

// Java uses >>> (unsigned right shift) for division by 2
int parent = (i - 1) >>> 1;  // Same as (i-1)/2 but handles negative`
        },
        {
          name: 'Time Complexity',
          diagram: TimeComplexityDiagram,
          explanation: `Most operations are O(log n) because they traverse at most the height of the tree. peek() is O(1) since the minimum is always at the root. contains() and arbitrary remove() are O(n) because they require linear search. Building a heap with heapify is O(n), not O(n log n)!`,
          codeExample: `// Time complexity summary
PriorityQueue<Integer> pq = new PriorityQueue<>();

// O(log n) operations - traverse tree height
pq.offer(5);      // Add element, sift up
pq.add(3);        // Same as offer()
pq.poll();        // Remove min, sift down
pq.remove(obj);   // Remove specific (O(n) to find + O(log n) to remove)

// O(1) operations
pq.peek();        // Return root without removing
pq.size();        // Return count
pq.isEmpty();     // Check if empty

// O(n) operations
pq.contains(5);   // Linear search through array
pq.toArray();     // Copy all elements

// O(n) heap construction
PriorityQueue<Integer> pq2 = new PriorityQueue<>(existingCollection);`
        },
        {
          name: 'Basic Usage',
          explanation: `PriorityQueue is a min-heap by default - poll() returns the smallest element. To create a max-heap, use Collections.reverseOrder() or a custom comparator. PriorityQueue does not allow null elements and is not thread-safe (use PriorityBlockingQueue for concurrent access).`,
          codeExample: `// Basic min-heap usage
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5);
minHeap.offer(1);
minHeap.offer(3);
minHeap.poll();  // Returns 1 (smallest)
minHeap.poll();  // Returns 3
minHeap.poll();  // Returns 5

// Max-heap using comparator
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(
    Collections.reverseOrder()
);
maxHeap.offer(1);
maxHeap.offer(5);
maxHeap.offer(3);
maxHeap.poll();  // Returns 5 (largest)

// Custom comparator for objects
PriorityQueue<Task> taskQueue = new PriorityQueue<>(
    Comparator.comparingInt(t -> t.priority)
);

// Note: PriorityQueue doesn't allow null
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(null);  // Throws NullPointerException!`
        }
      ]
    },
    {
      id: 'sift-up-insertion',
      name: 'Sift Up (Insertion)',
      icon: '⬆️',
      color: '#22c55e',
      description: 'When adding an element, place it at the end and "bubble up" to restore heap property.',
      diagram: SiftUpDiagram,
      details: [
        {
          name: 'Sift Up Algorithm',
          diagram: SiftUpDiagram,
          explanation: `When inserting an element, we add it at the end of the array (maintaining complete tree property), then "sift up" by repeatedly comparing with its parent. If smaller than parent, swap them. Continue until the element is larger than its parent or reaches the root. This is O(log n) - at most tree height swaps.`,
          codeExample: `// offer() - add element to heap
public boolean offer(E e) {
    if (e == null)
        throw new NullPointerException();
    modCount++;
    int i = size;
    if (i >= queue.length)
        grow(i + 1);  // Resize array if needed
    siftUp(i, e);     // Restore heap property
    size = i + 1;
    return true;
}

// Sift up - bubble element up to correct position
private void siftUp(int k, E x) {
    if (comparator != null)
        siftUpUsingComparator(k, x, queue, comparator);
    else
        siftUpComparable(k, x, queue);
}`
        },
        {
          name: 'Implementation Details',
          explanation: `The siftUpComparable method handles natural ordering when no comparator is provided. It uses a while loop to traverse up the tree, comparing each node with its parent. The unsigned right shift (>>>) is used for division by 2 to handle potential negative indices correctly.`,
          codeExample: `private static <T> void siftUpComparable(int k, T x, Object[] es) {
    Comparable<? super T> key = (Comparable<? super T>) x;
    while (k > 0) {
        int parent = (k - 1) >>> 1;  // Parent index
        Object e = es[parent];
        if (key.compareTo((T) e) >= 0)
            break;  // Heap property satisfied
        es[k] = e;  // Move parent down
        k = parent;
    }
    es[k] = key;  // Place element in final position
}

// With comparator
private static <T> void siftUpUsingComparator(
    int k, T x, Object[] es, Comparator<? super T> cmp) {
    while (k > 0) {
        int parent = (k - 1) >>> 1;
        Object e = es[parent];
        if (cmp.compare(x, (T) e) >= 0)
            break;
        es[k] = e;
        k = parent;
    }
    es[k] = x;
}`
        },
        {
          name: 'Visual Example',
          diagram: SiftUpDiagram,
          explanation: `Let's trace inserting 2 into heap [1, 3, 4, 7, 5]: (1) Add 2 at position 5, (2) Compare with parent at (5-1)/2=2 (value 4), 2 < 4 so swap, (3) Now at position 2, compare with parent at (2-1)/2=0 (value 1), 2 > 1 so stop. Final: [1, 3, 2, 7, 5, 4].`,
          codeExample: `// Step-by-step insertion of 2 into [1, 3, 4, 7, 5]
// Initial: [1, 3, 4, 7, 5]
//
// Step 1: Add 2 at end (index 5)
// Array: [1, 3, 4, 7, 5, 2]
//
// Step 2: Compare 2 with parent at (5-1)/2 = 2
// Parent value is 4, 2 < 4, so swap
// Array: [1, 3, 2, 7, 5, 4]
//
// Step 3: Now at index 2, compare with parent at (2-1)/2 = 0
// Parent value is 1, 2 > 1, STOP
//
// Final: [1, 3, 2, 7, 5, 4]
//
//         1
//        / \\
//       3   2    <- 2 is now correctly placed
//      / \\ /
//     7  5 4`
        }
      ]
    },
    {
      id: 'sift-down-removal',
      name: 'Sift Down (Removal)',
      icon: '⬇️',
      color: '#3b82f6',
      description: 'When removing the root (min element), replace with last element and "bubble down".',
      diagram: SiftDownDiagram,
      details: [
        {
          name: 'Sift Down Algorithm',
          diagram: SiftDownDiagram,
          explanation: `When removing the minimum (root), we: (1) Save the root value to return, (2) Move the last element to the root, (3) "Sift down" by comparing with children and swapping with the smaller child if necessary. Continue until element is smaller than both children or reaches a leaf. This is O(log n).`,
          codeExample: `// poll() - remove and return minimum
public E poll() {
    final Object[] es = queue;
    final E result = (E) es[0];  // Save root
    if (result != null) {
        modCount++;
        final int n = --size;
        final E x = (E) es[n];   // Get last element
        es[n] = null;            // Clear last position
        if (n > 0) {
            siftDown(0, x);      // Restore heap property
        }
    }
    return result;
}

// Sift down - bubble element down to correct position
private void siftDown(int k, E x) {
    if (comparator != null)
        siftDownUsingComparator(k, x, queue, size, comparator);
    else
        siftDownComparable(k, x, queue, size);
}`
        },
        {
          name: 'Implementation Details',
          explanation: `The siftDown method only loops while the current position is a non-leaf node (k < half). It compares the element with both children and swaps with the smaller one. The loop uses left shift (<<) for multiplication by 2 when computing child indices.`,
          codeExample: `private static <T> void siftDownComparable(
        int k, T x, Object[] es, int n) {
    Comparable<? super T> key = (Comparable<? super T>) x;
    int half = n >>> 1;  // Loop while non-leaf
    while (k < half) {
        int child = (k << 1) + 1;  // Left child index
        Object c = es[child];
        int right = child + 1;
        // Pick smaller child
        if (right < n &&
            ((Comparable<? super T>) c).compareTo((T) es[right]) > 0)
            c = es[child = right];
        if (key.compareTo((T) c) <= 0)
            break;  // Heap property satisfied
        es[k] = c;  // Move child up
        k = child;
    }
    es[k] = key;  // Place element in final position
}`
        },
        {
          name: 'Visual Example',
          diagram: SiftDownDiagram,
          explanation: `Removing from [1, 3, 2, 7, 5, 4]: (1) Remove 1, move 4 to root, (2) Compare 4 with children 3 and 2, swap with smaller (2), (3) Now at position 2, no children, STOP. Final: [2, 3, 4, 7, 5]. Returned 1.`,
          codeExample: `// Step-by-step removal from [1, 3, 2, 7, 5, 4]
//
// Step 1: Remove 1 (root), move last element (4) to root
// Array: [4, 3, 2, 7, 5]
//         4
//        / \\
//       3   2
//      / \\
//     7   5
//
// Step 2: Compare 4 with children (3, 2)
// Smaller child is 2 at index 2, 4 > 2, so swap
// Array: [2, 3, 4, 7, 5]
//         2
//        / \\
//       3   4
//      / \\
//     7   5
//
// Step 3: Now at index 2, no children (2 >= half)
// STOP - heap property restored
//
// Returned: 1 (the minimum)`
        }
      ]
    },
    {
      id: 'heapify-build-heap',
      name: 'Heapify (Build Heap)',
      icon: '🔨',
      color: '#8b5cf6',
      description: 'Building a heap from an array in O(n) time using Floyd\'s algorithm.',
      diagram: HeapifyDiagram,
      details: [
        {
          name: 'Heapify Algorithm',
          diagram: HeapifyDiagram,
          explanation: `Building a heap from an array can be done in O(n) time using heapify (Floyd's algorithm). Instead of inserting elements one by one (O(n log n)), we start from the last non-leaf node and sift down each node. Most nodes are near the bottom and do little work, while few nodes at the top do more work. The sum converges to O(n).`,
          codeExample: `// Constructor with collection uses heapify
public PriorityQueue(Collection<? extends E> c) {
    if (c instanceof SortedSet<?>) {
        SortedSet<? extends E> ss = (SortedSet<? extends E>) c;
        this.comparator = (Comparator<? super E>) ss.comparator();
        initElementsFromCollection(ss);
    } else if (c instanceof PriorityQueue<?>) {
        PriorityQueue<? extends E> pq = (PriorityQueue<? extends E>) c;
        this.comparator = (Comparator<? super E>) pq.comparator();
        initFromPriorityQueue(pq);
    } else {
        this.comparator = null;
        initFromCollection(c);
    }
}

private void initFromCollection(Collection<? extends E> c) {
    initElementsFromCollection(c);
    heapify();  // O(n) heap construction
}`
        },
        {
          name: 'Implementation',
          explanation: `The heapify method starts from the last non-leaf node (at index (n/2)-1) and sift downs each node going backwards to the root. Leaf nodes (more than half the tree) don't need any work. This bottom-up approach is key to achieving O(n) time complexity.`,
          codeExample: `// Heapify - O(n) to build heap from array
private void heapify() {
    final Object[] es = queue;
    int n = size;
    int i = (n >>> 1) - 1;  // Last non-leaf index
    // Sift down from last non-leaf to root
    for (; i >= 0; i--)
        siftDown(i, (E) es[i]);
}

// Why O(n) and not O(n log n)?
//
// Level 0 (root):     1 node,  height h swaps max
// Level 1:            2 nodes, height h-1 swaps max
// Level 2:            4 nodes, height h-2 swaps max
// ...
// Level h-1:          n/2 nodes, 1 swap max
// Level h (leaves):   n/2 nodes, 0 swaps (skipped)
//
// Sum = 1*h + 2*(h-1) + 4*(h-2) + ... + (n/2)*1
//     = O(n) (this series converges)`
        },
        {
          name: 'Visual Example',
          diagram: HeapifyDiagram,
          explanation: `Heapify [4, 7, 2, 5, 1, 3]: Start at last non-leaf (index 2, value 2). Index 2: 2 is already smaller than child 3. Index 1: 7 > min(5,1), swap with 1. Index 0: 4 > min(1,2), swap with 1, then 4 > min(5,7), stop. Final: [1, 4, 2, 5, 7, 3].`,
          codeExample: `// Heapify [4, 7, 2, 5, 1, 3]
//
// Initial (invalid heap):
//         4
//        / \\
//       7   2
//      / \\ /
//     5  1 3
//
// Last non-leaf = (6/2)-1 = 2
//
// Process index 2 (value 2): children = [3]
// 2 < 3, no swap needed
//
// Process index 1 (value 7): children = [5, 1]
// 7 > min(5,1) = 1, swap 7 and 1
//         4
//        / \\
//       1   2
//      / \\ /
//     5  7 3
//
// Process index 0 (value 4): children = [1, 2]
// 4 > min(1,2) = 1, swap 4 and 1
//         1
//        / \\
//       4   2
//      / \\ /
//     5  7 3
//
// Continue sifting 4: children = [5, 7]
// 4 < min(5,7), stop
//
// Final: [1, 4, 2, 5, 7, 3]`
        }
      ]
    },
    {
      id: 'common-use-cases',
      name: 'Common Use Cases',
      icon: '🎯',
      color: '#ec4899',
      description: 'PriorityQueue is essential for Dijkstra, K-th element, merging sorted lists, and more.',
      diagram: TwoHeapsDiagram,
      details: [
        {
          name: 'K-th Largest Element',
          explanation: `To find the K-th largest element, maintain a min-heap of size K. As you iterate through elements, add each to the heap. If size exceeds K, remove the minimum. At the end, the root is the K-th largest. This is O(n log k) time and O(k) space.`,
          codeExample: `// Find K-th largest element in array
public int findKthLargest(int[] nums, int k) {
    // Min-heap of size k
    PriorityQueue<Integer> pq = new PriorityQueue<>();

    for (int num : nums) {
        pq.offer(num);
        if (pq.size() > k) {
            pq.poll();  // Remove smallest
        }
    }

    return pq.peek();  // K-th largest
}

// Example: nums = [3,2,1,5,6,4], k = 2
// Process 3: heap = [3]
// Process 2: heap = [2,3]
// Process 1: heap = [1,2,3] -> poll -> [2,3]
// Process 5: heap = [2,3,5] -> poll -> [3,5]
// Process 6: heap = [3,5,6] -> poll -> [5,6]
// Process 4: heap = [4,5,6] -> poll -> [5,6]
// Return 5 (2nd largest)`
        },
        {
          name: 'Merge K Sorted Lists',
          explanation: `Use a min-heap to efficiently merge K sorted lists. Add the head of each list to the heap. Repeatedly extract the minimum and add the next node from that list. This is O(n log k) where n is total elements and k is number of lists.`,
          codeExample: `// Merge K sorted linked lists
public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>(
        (a, b) -> a.val - b.val
    );

    // Add head of each list
    for (ListNode list : lists) {
        if (list != null) pq.offer(list);
    }

    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;

    while (!pq.isEmpty()) {
        ListNode node = pq.poll();  // Get minimum
        curr.next = node;
        curr = curr.next;
        if (node.next != null) {
            pq.offer(node.next);    // Add next from same list
        }
    }

    return dummy.next;
}`
        },
        {
          name: 'Running Median',
          diagram: TwoHeapsDiagram,
          explanation: `Maintain two heaps: a max-heap for the smaller half and a min-heap for the larger half. The median is either the max of the smaller half (odd count) or the average of both heap tops (even count). Each insert is O(log n), median query is O(1).`,
          codeExample: `class MedianFinder {
    PriorityQueue<Integer> maxHeap;  // Smaller half (max at top)
    PriorityQueue<Integer> minHeap;  // Larger half (min at top)

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        // Always add to maxHeap first
        maxHeap.offer(num);
        // Balance: move max of smaller half to larger half
        minHeap.offer(maxHeap.poll());
        // Keep maxHeap same size or one larger
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();  // Odd count
        }
        return (maxHeap.peek() + minHeap.peek()) / 2.0;  // Even count
    }
}`
        },
        {
          name: 'Task Scheduling',
          explanation: `PriorityQueue is perfect for task scheduling where tasks have different priorities. Combined with time-based scheduling, you can implement efficient job schedulers, event-driven simulations, and CPU scheduling algorithms.`,
          codeExample: `// Task scheduling with priorities
class Task implements Comparable<Task> {
    int priority;
    String name;
    Runnable action;

    public int compareTo(Task other) {
        return Integer.compare(this.priority, other.priority);
    }
}

class TaskScheduler {
    private PriorityQueue<Task> taskQueue = new PriorityQueue<>();

    public void schedule(Task task) {
        taskQueue.offer(task);
    }

    public void run() {
        while (!taskQueue.isEmpty()) {
            Task task = taskQueue.poll();
            System.out.println("Running: " + task.name);
            task.action.run();
        }
    }
}

// Dijkstra's shortest path also uses PriorityQueue
PriorityQueue<int[]> pq = new PriorityQueue<>(
    (a, b) -> a[1] - b[1]  // Sort by distance
);
pq.offer(new int[]{startNode, 0});
while (!pq.isEmpty()) {
    int[] curr = pq.poll();
    // Process node and add neighbors...
}`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '❓',
      color: '#06b6d4',
      description: 'Common PriorityQueue interview questions and their answers.',
      diagram: ComparatorDiagram,
      details: [
        {
          name: 'Structure & Complexity',
          explanation: `Q1: What data structure backs PriorityQueue? A: Binary min-heap stored in array. Q2: Time complexity of operations? A: offer/poll O(log n), peek O(1), contains O(n). Q3: Why is heapify O(n)? A: Most nodes are leaves requiring no work; the sum of work converges to linear time.`,
          codeExample: `// Q1: Heap array structure
// Parent: (i-1)/2, Left: 2i+1, Right: 2i+2

// Q2: Time complexities
// offer()  - O(log n) - sift up
// poll()   - O(log n) - sift down
// peek()   - O(1)     - just return root
// add()    - O(log n) - same as offer
// remove(obj) - O(n)  - linear search + O(log n) removal
// contains()  - O(n)  - linear search

// Q3: Heapify complexity analysis
// Nodes at level h do 0 swaps (leaves)
// Nodes at level h-1 do at most 1 swap
// Nodes at level h-2 do at most 2 swaps
// ...
// Root does at most h swaps
// Sum = n/2*0 + n/4*1 + n/8*2 + ... = O(n)`
        },
        {
          name: 'Heap Variants',
          diagram: ComparatorDiagram,
          explanation: `Q4: How to create a max-heap? A: Use Collections.reverseOrder() or (a,b) -> b-a comparator. Q5: Can PriorityQueue have null elements? A: No, throws NullPointerException. Q6: Is PriorityQueue thread-safe? A: No, use PriorityBlockingQueue for concurrent access.`,
          codeExample: `// Q4: Max-heap creation
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(
    Collections.reverseOrder()
);
// Or using lambda:
PriorityQueue<Integer> maxHeap2 = new PriorityQueue<>(
    (a, b) -> b - a
);

// Q5: No nulls allowed
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(null);  // Throws NullPointerException!

// Q6: Thread-safe alternative
PriorityBlockingQueue<Integer> pbq = new PriorityBlockingQueue<>();
// Thread-safe, blocking operations for producer-consumer patterns`
        },
        {
          name: 'Comparison Questions',
          explanation: `Q7: PriorityQueue vs TreeSet? A: PriorityQueue allows duplicates and has O(1) peek; TreeSet has no duplicates and O(log n) for all ops. Q8: When to use each? A: PriorityQueue for task scheduling, Dijkstra; TreeSet for maintaining sorted unique elements with range queries.`,
          codeExample: `// Q7: PriorityQueue vs TreeSet comparison
//
// PriorityQueue:
// - Allows duplicates
// - O(1) access to min/max (depending on comparator)
// - O(log n) insert/remove
// - Only min/max accessible efficiently
// - Backed by array (heap)
//
// TreeSet:
// - No duplicates (Set interface)
// - O(log n) for all operations including min/max
// - Supports range queries (subSet, headSet, tailSet)
// - Backed by Red-Black tree

// Custom object ordering
class Task {
    int priority;
    String name;
}

PriorityQueue<Task> taskQueue = new PriorityQueue<>(
    Comparator.comparingInt(t -> t.priority)
);

// Multiple criteria sorting
PriorityQueue<Task> multiSort = new PriorityQueue<>(
    Comparator.comparingInt((Task t) -> t.priority)
              .thenComparing(t -> t.name)
);`
        },
        {
          name: 'Edge Cases',
          explanation: `Q9: What happens when you iterate over PriorityQueue? A: Elements are NOT in sorted order - iterator just traverses the array. Q10: How to get sorted elements? A: Poll until empty, or convert to list and sort. Q11: What's the default capacity? A: 11 elements (grows automatically).`,
          codeExample: `// Q9: Iterator doesn't give sorted order!
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.addAll(Arrays.asList(5, 1, 3, 2, 4));

// This does NOT print in sorted order:
for (int n : pq) {
    System.out.print(n + " ");  // Might print: 1 2 3 5 4
}

// Q10: To get sorted order, poll repeatedly:
while (!pq.isEmpty()) {
    System.out.print(pq.poll() + " ");  // Prints: 1 2 3 4 5
}

// Or convert and sort:
List<Integer> sorted = new ArrayList<>(pq);
Collections.sort(sorted);

// Q11: Initial capacity
PriorityQueue<Integer> defaultPQ = new PriorityQueue<>();  // Capacity 11
PriorityQueue<Integer> customPQ = new PriorityQueue<>(100); // Capacity 100

// Capacity grows automatically when full
// New capacity = old + (old < 64 ? old + 2 : old >> 1)`
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
      { name: 'My Projects', icon: '📁', page: 'My Projects' },
      { name: 'PriorityQueue Internals', icon: '🔢', page: 'PriorityQueue Internals' }
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
        <h1 style={titleStyle}>PriorityQueue Internals</h1>
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
          Back to Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={PRIORITY_QUEUE_COLORS}
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
              colors={PRIORITY_QUEUE_COLORS}
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

export default PriorityQueueInternals

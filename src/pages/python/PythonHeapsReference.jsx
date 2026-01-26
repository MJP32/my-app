import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// SVG Diagram Components

// Min-Heap Tree Structure Diagram
const MinHeapDiagram = () => (
  <svg viewBox="0 0 500 320" style={{ width: '100%', maxWidth: '500px', height: 'auto' }}>
    <defs>
      <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="rootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>

    {/* Title */}
    <text x="250" y="25" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">{`Min-Heap: Parent &lt; Children`}</text>

    {/* Edges */}
    <line x1="250" y1="70" x2="150" y2="130" stroke="#4b5563" strokeWidth="3"/>
    <line x1="250" y1="70" x2="350" y2="130" stroke="#4b5563" strokeWidth="3"/>
    <line x1="150" y1="160" x2="90" y2="220" stroke="#4b5563" strokeWidth="3"/>
    <line x1="150" y1="160" x2="210" y2="220" stroke="#4b5563" strokeWidth="3"/>
    <line x1="350" y1="160" x2="290" y2="220" stroke="#4b5563" strokeWidth="3"/>
    <line x1="350" y1="160" x2="410" y2="220" stroke="#4b5563" strokeWidth="3"/>

    {/* Root Node (smallest) */}
    <circle cx="250" cy="55" r="28" fill="url(#rootGradient)" filter="url(#shadow)"/>
    <text x="250" y="61" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">1</text>
    <text x="250" y="100" textAnchor="middle" fill="#22c55e" fontSize="11">ROOT (min)</text>

    {/* Level 1 Nodes */}
    <circle cx="150" cy="145" r="28" fill="url(#nodeGradient)" filter="url(#shadow)"/>
    <text x="150" y="151" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">3</text>

    <circle cx="350" cy="145" r="28" fill="url(#nodeGradient)" filter="url(#shadow)"/>
    <text x="350" y="151" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">5</text>

    {/* Level 2 Nodes */}
    <circle cx="90" cy="235" r="28" fill="url(#nodeGradient)" filter="url(#shadow)"/>
    <text x="90" y="241" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">7</text>

    <circle cx="210" cy="235" r="28" fill="url(#nodeGradient)" filter="url(#shadow)"/>
    <text x="210" y="241" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">9</text>

    <circle cx="290" cy="235" r="28" fill="url(#nodeGradient)" filter="url(#shadow)"/>
    <text x="290" y="241" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">8</text>

    <circle cx="410" cy="235" r="28" fill="url(#nodeGradient)" filter="url(#shadow)"/>
    <text x="410" y="241" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">6</text>

    {/* Property annotations */}
    <text x="100" y="295" textAnchor="middle" fill="#fbbf24" fontSize="11">{`1 &lt; 3`}</text>
    <text x="200" y="295" textAnchor="middle" fill="#fbbf24" fontSize="11">{`1 &lt; 5`}</text>
    <text x="300" y="295" textAnchor="middle" fill="#fbbf24" fontSize="11">{`3 &lt; 7,9`}</text>
    <text x="400" y="295" textAnchor="middle" fill="#fbbf24" fontSize="11">{`5 &lt; 8,6`}</text>
  </svg>
)

// Heap Array Representation Diagram
const HeapArrayDiagram = () => (
  <svg viewBox="0 0 560 280" style={{ width: '100%', maxWidth: '560px', height: 'auto' }}>
    <defs>
      <linearGradient id="cellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>

    {/* Title */}
    <text x="280" y="25" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">Heap Stored as Array</text>

    {/* Array cells */}
    {[1, 3, 5, 7, 9, 8, 6].map((val, i) => (
      <g key={i}>
        <rect x={60 + i * 65} y="50" width="55" height="50" rx="6" fill={i === 0 ? 'url(#highlightGradient)' : 'url(#cellGradient)'} stroke="#60a5fa" strokeWidth="2"/>
        <text x={87 + i * 65} y="82" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">{val}</text>
        <text x={87 + i * 65} y="120" textAnchor="middle" fill="#9ca3af" fontSize="12">i={i}</text>
      </g>
    ))}

    {/* Index formulas */}
    <rect x="30" y="145" width="500" height="120" rx="8" fill="#1f2937" stroke="#3b82f6" strokeWidth="2"/>

    <text x="280" y="170" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Index Formulas (0-indexed)</text>

    <text x="50" y="200" fill="#93c5fd" fontSize="13">Parent of i:</text>
    <text x="180" y="200" fill="#fbbf24" fontSize="13" fontFamily="monospace">(i - 1) // 2</text>

    <text x="50" y="225" fill="#93c5fd" fontSize="13">Left child of i:</text>
    <text x="180" y="225" fill="#fbbf24" fontSize="13" fontFamily="monospace">2 * i + 1</text>

    <text x="50" y="250" fill="#93c5fd" fontSize="13">Right child of i:</text>
    <text x="180" y="250" fill="#fbbf24" fontSize="13" fontFamily="monospace">2 * i + 2</text>

    {/* Example */}
    <text x="320" y="200" fill="#9ca3af" fontSize="12">Example: i=1 (value 3)</text>
    <text x="320" y="220" fill="#d1d5db" fontSize="11">Parent: (1-1)//2 = 0 (value 1)</text>
    <text x="320" y="240" fill="#d1d5db" fontSize="11">Left: 2*1+1 = 3 (value 7)</text>
    <text x="320" y="260" fill="#d1d5db" fontSize="11">Right: 2*1+2 = 4 (value 9)</text>
  </svg>
)

// Heappush Operation Diagram (Bubble Up)
const HeappushDiagram = () => (
  <svg viewBox="0 0 600 350" style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
    <defs>
      <linearGradient id="pushNodeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="newNodeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
      <linearGradient id="swapNodeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24"/>
      </marker>
    </defs>

    {/* Title */}
    <text x="300" y="25" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">heappush: Add 2 (Bubble Up)</text>

    {/* Step 1: Initial state */}
    <text x="100" y="55" textAnchor="middle" fill="#9ca3af" fontSize="12">Step 1: Add at end</text>

    {/* Mini tree - Step 1 */}
    <line x1="100" y1="90" x2="60" y2="130" stroke="#4b5563" strokeWidth="2"/>
    <line x1="100" y1="90" x2="140" y2="130" stroke="#4b5563" strokeWidth="2"/>
    <line x1="60" y1="155" x2="40" y2="195" stroke="#4b5563" strokeWidth="2"/>
    <line x1="60" y1="155" x2="80" y2="195" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>

    <circle cx="100" cy="75" r="18" fill="url(#pushNodeGradient)"/>
    <text x="100" y="81" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">1</text>

    <circle cx="60" cy="140" r="18" fill="url(#pushNodeGradient)"/>
    <text x="60" y="146" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">5</text>

    <circle cx="140" cy="140" r="18" fill="url(#pushNodeGradient)"/>
    <text x="140" y="146" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3</text>

    <circle cx="40" cy="210" r="18" fill="url(#pushNodeGradient)"/>
    <text x="40" y="216" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">7</text>

    <circle cx="80" cy="210" r="18" fill="url(#newNodeGradient)"/>
    <text x="80" y="216" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">2</text>
    <text x="80" y="240" textAnchor="middle" fill="#ef4444" fontSize="10">NEW</text>

    {/* Arrow to step 2 */}
    <line x1="175" y1="140" x2="215" y2="140" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead)"/>

    {/* Step 2: Swap with parent */}
    <text x="300" y="55" textAnchor="middle" fill="#9ca3af" fontSize="12">{`Step 2: Swap (2 &lt; 5)`}</text>

    <line x1="300" y1="90" x2="260" y2="130" stroke="#4b5563" strokeWidth="2"/>
    <line x1="300" y1="90" x2="340" y2="130" stroke="#4b5563" strokeWidth="2"/>
    <line x1="260" y1="155" x2="240" y2="195" stroke="#4b5563" strokeWidth="2"/>
    <line x1="260" y1="155" x2="280" y2="195" stroke="#4b5563" strokeWidth="2"/>

    <circle cx="300" cy="75" r="18" fill="url(#pushNodeGradient)"/>
    <text x="300" y="81" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">1</text>

    <circle cx="260" cy="140" r="18" fill="url(#swapNodeGradient)"/>
    <text x="260" y="146" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">2</text>

    <circle cx="340" cy="140" r="18" fill="url(#pushNodeGradient)"/>
    <text x="340" y="146" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3</text>

    <circle cx="240" cy="210" r="18" fill="url(#pushNodeGradient)"/>
    <text x="240" y="216" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">7</text>

    <circle cx="280" cy="210" r="18" fill="url(#pushNodeGradient)"/>
    <text x="280" y="216" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">5</text>

    {/* Arrow to step 3 */}
    <line x1="375" y1="140" x2="415" y2="140" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead)"/>

    {/* Step 3: Done (no more swaps needed) */}
    <text x="500" y="55" textAnchor="middle" fill="#9ca3af" fontSize="12">{`Step 3: Done (2 &gt; 1)`}</text>

    <line x1="500" y1="90" x2="460" y2="130" stroke="#4b5563" strokeWidth="2"/>
    <line x1="500" y1="90" x2="540" y2="130" stroke="#4b5563" strokeWidth="2"/>
    <line x1="460" y1="155" x2="440" y2="195" stroke="#4b5563" strokeWidth="2"/>
    <line x1="460" y1="155" x2="480" y2="195" stroke="#4b5563" strokeWidth="2"/>

    <circle cx="500" cy="75" r="18" fill="url(#swapNodeGradient)"/>
    <text x="500" y="81" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">1</text>

    <circle cx="460" cy="140" r="18" fill="url(#swapNodeGradient)"/>
    <text x="460" y="146" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">2</text>

    <circle cx="540" cy="140" r="18" fill="url(#pushNodeGradient)"/>
    <text x="540" y="146" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3</text>

    <circle cx="440" cy="210" r="18" fill="url(#pushNodeGradient)"/>
    <text x="440" y="216" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">7</text>

    <circle cx="480" cy="210" r="18" fill="url(#pushNodeGradient)"/>
    <text x="480" y="216" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">5</text>

    {/* Complexity note */}
    <rect x="150" y="280" width="300" height="50" rx="8" fill="#1f2937" stroke="#22c55e" strokeWidth="2"/>
    <text x="300" y="305" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">Time: O(log n) - bubbles up at most log n levels</text>
    <text x="300" y="322" textAnchor="middle" fill="#9ca3af" fontSize="11">Compare with parent, swap if smaller</text>
  </svg>
)

// Heappop Operation Diagram (Bubble Down)
const HeappopDiagram = () => (
  <svg viewBox="0 0 600 380" style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
    <defs>
      <linearGradient id="popNodeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="removeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
      <linearGradient id="moveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="doneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
      <marker id="popArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24"/>
      </marker>
    </defs>

    {/* Title */}
    <text x="300" y="25" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">heappop: Remove Min (Bubble Down)</text>

    {/* Step 1: Remove root, move last to root */}
    <text x="100" y="55" textAnchor="middle" fill="#9ca3af" fontSize="11">Step 1: Remove 1, move 6 to root</text>

    <line x1="100" y1="95" x2="60" y2="135" stroke="#4b5563" strokeWidth="2"/>
    <line x1="100" y1="95" x2="140" y2="135" stroke="#4b5563" strokeWidth="2"/>
    <line x1="60" y1="160" x2="40" y2="200" stroke="#4b5563" strokeWidth="2"/>
    <line x1="60" y1="160" x2="80" y2="200" stroke="#4b5563" strokeWidth="2"/>

    <circle cx="100" cy="80" r="18" fill="url(#moveGradient)"/>
    <text x="100" y="86" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">6</text>
    <text x="135" y="75" fill="#ef4444" fontSize="10">1 removed</text>

    <circle cx="60" cy="145" r="18" fill="url(#popNodeGradient)"/>
    <text x="60" y="151" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3</text>

    <circle cx="140" cy="145" r="18" fill="url(#popNodeGradient)"/>
    <text x="140" y="151" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">5</text>

    <circle cx="40" cy="215" r="18" fill="url(#popNodeGradient)"/>
    <text x="40" y="221" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">7</text>

    <circle cx="80" cy="215" r="18" fill="url(#popNodeGradient)"/>
    <text x="80" y="221" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">9</text>

    {/* Arrow */}
    <line x1="175" y1="145" x2="215" y2="145" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#popArrow)"/>

    {/* Step 2: Swap with smaller child */}
    <text x="300" y="55" textAnchor="middle" fill="#9ca3af" fontSize="11">Step 2: Swap 6 with min(3,5)=3</text>

    <line x1="300" y1="95" x2="260" y2="135" stroke="#4b5563" strokeWidth="2"/>
    <line x1="300" y1="95" x2="340" y2="135" stroke="#4b5563" strokeWidth="2"/>
    <line x1="260" y1="160" x2="240" y2="200" stroke="#4b5563" strokeWidth="2"/>
    <line x1="260" y1="160" x2="280" y2="200" stroke="#4b5563" strokeWidth="2"/>

    <circle cx="300" cy="80" r="18" fill="url(#doneGradient)"/>
    <text x="300" y="86" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3</text>

    <circle cx="260" cy="145" r="18" fill="url(#moveGradient)"/>
    <text x="260" y="151" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">6</text>

    <circle cx="340" cy="145" r="18" fill="url(#popNodeGradient)"/>
    <text x="340" y="151" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">5</text>

    <circle cx="240" cy="215" r="18" fill="url(#popNodeGradient)"/>
    <text x="240" y="221" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">7</text>

    <circle cx="280" cy="215" r="18" fill="url(#popNodeGradient)"/>
    <text x="280" y="221" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">9</text>

    {/* Arrow */}
    <line x1="375" y1="145" x2="415" y2="145" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#popArrow)"/>

    {/* Step 3: Done */}
    <text x="500" y="55" textAnchor="middle" fill="#9ca3af" fontSize="11">{`Step 3: Done (6 &lt; 7,9)`}</text>

    <line x1="500" y1="95" x2="460" y2="135" stroke="#4b5563" strokeWidth="2"/>
    <line x1="500" y1="95" x2="540" y2="135" stroke="#4b5563" strokeWidth="2"/>
    <line x1="460" y1="160" x2="440" y2="200" stroke="#4b5563" strokeWidth="2"/>
    <line x1="460" y1="160" x2="480" y2="200" stroke="#4b5563" strokeWidth="2"/>

    <circle cx="500" cy="80" r="18" fill="url(#doneGradient)"/>
    <text x="500" y="86" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3</text>

    <circle cx="460" cy="145" r="18" fill="url(#doneGradient)"/>
    <text x="460" y="151" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">6</text>

    <circle cx="540" cy="145" r="18" fill="url(#popNodeGradient)"/>
    <text x="540" y="151" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">5</text>

    <circle cx="440" cy="215" r="18" fill="url(#popNodeGradient)"/>
    <text x="440" y="221" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">7</text>

    <circle cx="480" cy="215" r="18" fill="url(#popNodeGradient)"/>
    <text x="480" y="221" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">9</text>

    {/* Result box */}
    <rect x="100" y="260" width="120" height="40" rx="8" fill="#1f2937" stroke="#ef4444" strokeWidth="2"/>
    <text x="160" y="283" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Returns: 1</text>
    <text x="160" y="295" textAnchor="middle" fill="#9ca3af" fontSize="10">(min element)</text>

    {/* Complexity note */}
    <rect x="250" y="260" width="300" height="50" rx="8" fill="#1f2937" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="285" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">Time: O(log n) - bubbles down at most log n levels</text>
    <text x="400" y="302" textAnchor="middle" fill="#9ca3af" fontSize="11">Swap with smaller child until heap property restored</text>
  </svg>
)

// Heapify Operation Diagram
const HeapifyDiagram = () => (
  <svg viewBox="0 0 650 380" style={{ width: '100%', maxWidth: '650px', height: 'auto' }}>
    <defs>
      <linearGradient id="heapifyNode" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="heapifyProcessing" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="heapifyDone" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
      <marker id="heapifyArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24"/>
      </marker>
    </defs>

    {/* Title */}
    <text x="325" y="25" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">heapify: Convert List to Heap in O(n)</text>

    {/* Input array */}
    <text x="100" y="55" textAnchor="middle" fill="#9ca3af" fontSize="12">Input: [5, 3, 8, 1, 2]</text>

    {/* Before - unordered tree */}
    <text x="160" y="85" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Before (not a heap)</text>

    <line x1="160" y1="115" x2="100" y2="155" stroke="#4b5563" strokeWidth="2"/>
    <line x1="160" y1="115" x2="220" y2="155" stroke="#4b5563" strokeWidth="2"/>
    <line x1="100" y1="180" x2="70" y2="220" stroke="#4b5563" strokeWidth="2"/>
    <line x1="100" y1="180" x2="130" y2="220" stroke="#4b5563" strokeWidth="2"/>

    <circle cx="160" cy="100" r="20" fill="url(#heapifyNode)"/>
    <text x="160" y="106" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">5</text>

    <circle cx="100" cy="165" r="20" fill="url(#heapifyNode)"/>
    <text x="100" y="171" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3</text>

    <circle cx="220" cy="165" r="20" fill="url(#heapifyNode)"/>
    <text x="220" y="171" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">8</text>

    <circle cx="70" cy="235" r="20" fill="url(#heapifyNode)"/>
    <text x="70" y="241" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">1</text>

    <circle cx="130" cy="235" r="20" fill="url(#heapifyNode)"/>
    <text x="130" y="241" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">2</text>

    {/* Arrow */}
    <line x1="270" y1="160" x2="370" y2="160" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#heapifyArrow)"/>
    <text x="320" y="145" textAnchor="middle" fill="#fbbf24" fontSize="11">heapify()</text>
    <text x="320" y="180" textAnchor="middle" fill="#9ca3af" fontSize="10">O(n) time</text>

    {/* After - valid heap */}
    <text x="490" y="85" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">After (valid min-heap)</text>

    <line x1="490" y1="115" x2="430" y2="155" stroke="#4b5563" strokeWidth="2"/>
    <line x1="490" y1="115" x2="550" y2="155" stroke="#4b5563" strokeWidth="2"/>
    <line x1="430" y1="180" x2="400" y2="220" stroke="#4b5563" strokeWidth="2"/>
    <line x1="430" y1="180" x2="460" y2="220" stroke="#4b5563" strokeWidth="2"/>

    <circle cx="490" cy="100" r="20" fill="url(#heapifyDone)"/>
    <text x="490" y="106" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">1</text>

    <circle cx="430" cy="165" r="20" fill="url(#heapifyDone)"/>
    <text x="430" y="171" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">2</text>

    <circle cx="550" cy="165" r="20" fill="url(#heapifyDone)"/>
    <text x="550" y="171" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">8</text>

    <circle cx="400" cy="235" r="20" fill="url(#heapifyDone)"/>
    <text x="400" y="241" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">5</text>

    <circle cx="460" cy="235" r="20" fill="url(#heapifyDone)"/>
    <text x="460" y="241" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3</text>

    {/* Output array */}
    <text x="490" y="275" textAnchor="middle" fill="#22c55e" fontSize="12">Output: [1, 2, 8, 5, 3]</text>

    {/* Algorithm explanation */}
    <rect x="50" y="295" width="550" height="70" rx="8" fill="#1f2937" stroke="#3b82f6" strokeWidth="2"/>
    <text x="325" y="318" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="bold">Algorithm: Bottom-up heapify</text>
    <text x="325" y="338" textAnchor="middle" fill="#d1d5db" fontSize="11">Start from last non-leaf node (n//2 - 1), sift down each node</text>
    <text x="325" y="355" textAnchor="middle" fill="#fbbf24" fontSize="11">O(n) because most nodes are near leaves (O(1) work each)</text>
  </svg>
)

function PythonHeapsReference({ onBack, breadcrumb }) {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

  const heapMethods = [
    {
      id: 'heapify',
      name: 'heapq.heapify()',
      category: 'Creation',
      signature: 'heapq.heapify(x)',
      description: 'Transform list x into a heap, in-place, in linear time.',
      parameters: [
        { name: 'x', type: 'list', description: 'List to transform into a min heap' }
      ],
      returns: 'None (modifies list in-place)',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

# Create a min heap from a list
nums = [5, 7, 9, 1, 3]
heapq.heapify(nums)
print(nums)  # Output: [1, 3, 9, 7, 5]

# The smallest element is now at index 0
print(nums[0])  # Output: 1`
        },
        {
          title: 'Heap Property',
          code: `import heapq

# After heapify, heap property is maintained:
# For index i: parent = (i-1)//2, left = 2*i+1, right = 2*i+2
# Parent is always <= children

nums = [10, 20, 30, 5, 15]
heapq.heapify(nums)
print(nums)  # [5, 10, 30, 20, 15]

# Verify: nums[0] <= nums[1] and nums[0] <= nums[2]
print(f"Parent {nums[0]} <= Left child {nums[1]}")  # True
print(f"Parent {nums[0]} <= Right child {nums[2]}")  # True`
        }
      ],
      notes: [
        'Creates a min heap (smallest element at root)',
        'Modifies the list in-place',
        'Does not return anything',
        'For max heap, negate all values before heapify',
        'Heap property: parent <= children'
      ],
      useCases: [
        'Initialize a priority queue',
        'Prepare data for heap-based algorithms',
        'Convert unsorted data to heap structure'
      ]
    },
    {
      id: 'heappush',
      name: 'heapq.heappush()',
      category: 'Insertion',
      signature: 'heapq.heappush(heap, item)',
      description: 'Push the value item onto the heap, maintaining the heap invariant.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Heap to push item onto' },
        { name: 'item', type: 'any', description: 'Item to add to the heap' }
      ],
      returns: 'None (modifies heap in-place)',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Adding Elements',
          code: `import heapq

heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 3)
heapq.heappush(heap, 7)
heapq.heappush(heap, 1)

print(heap)  # Output: [1, 3, 7, 5]
print(heap[0])  # Smallest element: 1`
        },
        {
          title: 'Building Priority Queue',
          code: `import heapq

# Task priority queue (lower number = higher priority)
tasks = []
heapq.heappush(tasks, (2, "Medium priority task"))
heapq.heappush(tasks, (1, "High priority task"))
heapq.heappush(tasks, (3, "Low priority task"))

# Get highest priority task
priority, task = heapq.heappop(tasks)
print(task)  # "High priority task"`
        },
        {
          title: 'With Tuples',
          code: `import heapq

# Heap of tuples (compared by first element)
heap = []
heapq.heappush(heap, (5, 'five'))
heapq.heappush(heap, (2, 'two'))
heapq.heappush(heap, (8, 'eight'))

print(heap[0])  # (2, 'two') - smallest by first element`
        }
      ],
      notes: [
        'Maintains heap property automatically',
        'Uses "bubble up" or "sift up" algorithm',
        'For max heap, push negative values: heappush(heap, -item)',
        'Can push tuples for priority queues'
      ],
      useCases: [
        'Implementing priority queues',
        'Adding elements to a heap dynamically',
        'Stream processing with heap'
      ]
    },
    {
      id: 'heappop',
      name: 'heapq.heappop()',
      category: 'Removal',
      signature: 'heapq.heappop(heap)',
      description: 'Pop and return the smallest item from the heap, maintaining the heap invariant.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Non-empty heap to pop from' }
      ],
      returns: 'Smallest item from the heap',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

heap = [1, 3, 5, 7, 9]
smallest = heapq.heappop(heap)
print(smallest)  # 1
print(heap)      # [3, 7, 5, 9]

# Pop again
next_smallest = heapq.heappop(heap)
print(next_smallest)  # 3`
        },
        {
          title: 'Processing All Elements',
          code: `import heapq

heap = [5, 2, 8, 1, 9, 3]
heapq.heapify(heap)

# Pop all elements in sorted order
result = []
while heap:
    result.append(heapq.heappop(heap))

print(result)  # [1, 2, 3, 5, 8, 9]`
        },
        {
          title: 'Error Handling',
          code: `import heapq

heap = []
try:
    item = heapq.heappop(heap)
except IndexError:
    print("Cannot pop from empty heap")

# Safe version
if heap:
    item = heapq.heappop(heap)
else:
    item = None`
        }
      ],
      notes: [
        'Raises IndexError if heap is empty',
        'Always check if heap is non-empty before popping',
        'Uses "bubble down" or "sift down" algorithm',
        'For max heap, negate returned value: -heappop(max_heap)'
      ],
      useCases: [
        'Getting minimum/maximum element',
        'Processing items in priority order',
        'Implementing heap sort'
      ]
    },
    {
      id: 'heappushpop',
      name: 'heapq.heappushpop()',
      category: 'Combined',
      signature: 'heapq.heappushpop(heap, item)',
      description: 'Push item on the heap, then pop and return the smallest item.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Heap to operate on' },
        { name: 'item', type: 'any', description: 'Item to push before popping' }
      ],
      returns: 'The smallest item (may be the pushed item)',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

heap = [2, 4, 6, 8]
result = heapq.heappushpop(heap, 3)
print(result)  # 2 (smallest after push)
print(heap)    # [3, 4, 6, 8]`
        },
        {
          title: 'Optimization Example',
          code: `import heapq

heap = [5, 7, 9]

# If item < heap[0], returns item immediately
result = heapq.heappushpop(heap, 1)
print(result)  # 1 (pushed item is smallest)
print(heap)    # [5, 7, 9] (unchanged!)

# More efficient than:
# heapq.heappush(heap, item)
# result = heapq.heappop(heap)`
        },
        {
          title: 'Maintaining Top K',
          code: `import heapq

# Keep only 3 largest elements
heap = [10, 20, 30]  # Current top 3
new_value = 25

if new_value > heap[0]:
    # Replace smallest if new value is larger
    removed = heapq.heappushpop(heap, new_value)
    print(f"Removed {removed}, added {new_value}")
    print(f"Top 3: {sorted(heap, reverse=True)}")`
        }
      ],
      notes: [
        'More efficient than separate push and pop',
        'If item < heap[0], returns item without modifying heap',
        'Equivalent to: heappush(heap, item) + heappop(heap)',
        'Useful for maintaining fixed-size heaps'
      ],
      useCases: [
        'Maintaining top/bottom K elements',
        'Sliding window problems',
        'Online algorithms'
      ]
    },
    {
      id: 'heapreplace',
      name: 'heapq.heapreplace()',
      category: 'Combined',
      signature: 'heapq.heapreplace(heap, item)',
      description: 'Pop and return the smallest item, then push the new item.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Non-empty heap to operate on' },
        { name: 'item', type: 'any', description: 'Item to push after popping' }
      ],
      returns: 'The smallest item that was popped',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

heap = [2, 4, 6, 8]
result = heapq.heapreplace(heap, 5)
print(result)  # 2 (popped item)
print(heap)    # [4, 5, 6, 8]`
        },
        {
          title: 'Fixed-Size Heap',
          code: `import heapq

# Maintain heap of size 3
heap = [1, 3, 5]

# Stream of values
stream = [7, 2, 8, 4]

for value in stream:
    if len(heap) >= 3:
        removed = heapq.heapreplace(heap, value)
        print(f"Removed {removed}, added {value}")
    else:
        heapq.heappush(heap, value)

print(f"Final heap: {heap}")`
        },
        {
          title: 'Error Handling',
          code: `import heapq

heap = []
try:
    result = heapq.heapreplace(heap, 5)
except IndexError:
    print("Cannot replace in empty heap")
    # Use heappush instead
    heapq.heappush(heap, 5)`
        }
      ],
      notes: [
        'Raises IndexError if heap is empty',
        'More efficient than separate pop and push',
        'Heap size remains the same',
        'Different from heappushpop (pop first, then push)'
      ],
      useCases: [
        'Maintaining fixed-size sliding window',
        'Streaming data with bounded memory',
        'Replacing elements in priority queue'
      ]
    },
    {
      id: 'nsmallest',
      name: 'heapq.nsmallest()',
      category: 'Query',
      signature: 'heapq.nsmallest(n, iterable, key=None)',
      description: 'Return a list with the n smallest elements from the dataset.',
      parameters: [
        { name: 'n', type: 'int', description: 'Number of smallest elements to return' },
        { name: 'iterable', type: 'iterable', description: 'Dataset to find smallest elements from' },
        { name: 'key', type: 'function', description: 'Optional function to extract comparison key', optional: true }
      ],
      returns: 'List of n smallest elements in ascending order',
      timeComplexity: 'O(n log k) where k = min(n, len(iterable))',
      spaceComplexity: 'O(n)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

nums = [5, 2, 8, 1, 9, 3, 7, 4, 6]
smallest_3 = heapq.nsmallest(3, nums)
print(smallest_3)  # [1, 2, 3]

# Returns in ascending order
smallest_5 = heapq.nsmallest(5, nums)
print(smallest_5)  # [1, 2, 3, 4, 5]`
        },
        {
          title: 'With Key Function',
          code: `import heapq

# Find 3 shortest strings
words = ['apple', 'pie', 'banana', 'cat', 'dog', 'elephant']
shortest = heapq.nsmallest(3, words, key=len)
print(shortest)  # ['pie', 'cat', 'dog']

# Find 3 people with lowest age
people = [
    {'name': 'Alice', 'age': 30},
    {'name': 'Bob', 'age': 25},
    {'name': 'Charlie', 'age': 35},
    {'name': 'David', 'age': 20}
]
youngest = heapq.nsmallest(3, people, key=lambda x: x['age'])
print([p['name'] for p in youngest])  # ['David', 'Bob', 'Alice']`
        },
        {
          title: 'Performance Comparison',
          code: `import heapq

nums = list(range(1000000))

# For small n, nsmallest is efficient
n = 10
result = heapq.nsmallest(n, nums)  # O(n log k) where k=10

# For large n, sorting might be better
# If n > len(nums) / 2, consider: sorted(nums)[:n]

# Rule of thumb:
# - Use nsmallest for small n
# - Use sorted()[:n] for n close to len(nums)`
        }
      ],
      notes: [
        'Returns elements in ascending order',
        'Efficient for small n relative to dataset size',
        'Can use key function for complex comparisons',
        'For n=1, equivalent to min(iterable)',
        'For large n, sorted(iterable)[:n] may be faster'
      ],
      useCases: [
        'Finding top-K smallest elements',
        'Getting bottom performers',
        'Selecting minimum values with custom comparison'
      ]
    },
    {
      id: 'nlargest',
      name: 'heapq.nlargest()',
      category: 'Query',
      signature: 'heapq.nlargest(n, iterable, key=None)',
      description: 'Return a list with the n largest elements from the dataset.',
      parameters: [
        { name: 'n', type: 'int', description: 'Number of largest elements to return' },
        { name: 'iterable', type: 'iterable', description: 'Dataset to find largest elements from' },
        { name: 'key', type: 'function', description: 'Optional function to extract comparison key', optional: true }
      ],
      returns: 'List of n largest elements in descending order',
      timeComplexity: 'O(n log k) where k = min(n, len(iterable))',
      spaceComplexity: 'O(n)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

nums = [5, 2, 8, 1, 9, 3, 7, 4, 6]
largest_3 = heapq.nlargest(3, nums)
print(largest_3)  # [9, 8, 7]

# Returns in descending order
largest_5 = heapq.nlargest(5, nums)
print(largest_5)  # [9, 8, 7, 6, 5]`
        },
        {
          title: 'Top Performers',
          code: `import heapq

# Find top 3 students by score
students = [
    {'name': 'Alice', 'score': 85},
    {'name': 'Bob', 'score': 92},
    {'name': 'Charlie', 'score': 78},
    {'name': 'David', 'score': 95},
    {'name': 'Eve', 'score': 88}
]

top_students = heapq.nlargest(3, students, key=lambda x: x['score'])
for student in top_students:
    print(f"{student['name']}: {student['score']}")
# David: 95
# Bob: 92
# Eve: 88`
        },
        {
          title: 'Multiple Criteria',
          code: `import heapq

# Find highest priority tasks (by priority, then by urgency)
tasks = [
    (3, 2, 'Task A'),  # (priority, urgency, name)
    (5, 1, 'Task B'),
    (3, 4, 'Task C'),
    (5, 3, 'Task D'),
    (4, 2, 'Task E')
]

# Tuples compared element by element
top_tasks = heapq.nlargest(3, tasks)
for priority, urgency, name in top_tasks:
    print(f"{name}: P{priority}, U{urgency}")`
        }
      ],
      notes: [
        'Returns elements in descending order',
        'Efficient for small n relative to dataset size',
        'Can use key function for custom comparisons',
        'For n=1, equivalent to max(iterable)',
        'For large n, sorted(iterable, reverse=True)[:n] may be faster'
      ],
      useCases: [
        'Finding top-K largest elements',
        'Leaderboards and rankings',
        'Getting best performers',
        'Top-N queries'
      ]
    },
    {
      id: 'merge',
      name: 'heapq.merge()',
      category: 'Utility',
      signature: 'heapq.merge(*iterables, key=None, reverse=False)',
      description: 'Merge multiple sorted inputs into a single sorted output.',
      parameters: [
        { name: '*iterables', type: 'iterables', description: 'Multiple sorted iterables to merge' },
        { name: 'key', type: 'function', description: 'Optional function to extract comparison key', optional: true },
        { name: 'reverse', type: 'bool', description: 'If True, merge in descending order', optional: true }
      ],
      returns: 'Iterator over sorted values',
      timeComplexity: 'O(n log k) where n = total elements, k = number of iterables',
      spaceComplexity: 'O(k) for heap of iterators',
      examples: [
        {
          title: 'Merge Sorted Lists',
          code: `import heapq

list1 = [1, 3, 5, 7]
list2 = [2, 4, 6, 8]
list3 = [0, 9, 10]

# Merge into single sorted sequence
merged = list(heapq.merge(list1, list2, list3))
print(merged)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
        },
        {
          title: 'Merge Log Files',
          code: `import heapq
from datetime import datetime

# Sorted log files by timestamp
logs1 = [
    (datetime(2024, 1, 1, 10, 0), "Server started"),
    (datetime(2024, 1, 1, 10, 5), "Request received")
]
logs2 = [
    (datetime(2024, 1, 1, 10, 2), "Database connected"),
    (datetime(2024, 1, 1, 10, 7), "Response sent")
]

# Merge logs in chronological order
all_logs = heapq.merge(logs1, logs2, key=lambda x: x[0])
for timestamp, message in all_logs:
    print(f"{timestamp}: {message}")`
        },
        {
          title: 'Descending Order',
          code: `import heapq

# Already sorted in descending order
nums1 = [9, 7, 5, 3, 1]
nums2 = [8, 6, 4, 2]

# Merge in descending order
merged = list(heapq.merge(nums1, nums2, reverse=True))
print(merged)  # [9, 8, 7, 6, 5, 4, 3, 2, 1]`
        },
        {
          title: 'Lazy Evaluation',
          code: `import heapq

# merge() returns iterator (lazy evaluation)
list1 = range(0, 1000000, 2)  # Even numbers
list2 = range(1, 1000000, 2)  # Odd numbers

# Only creates iterator, doesn't process all elements
merged = heapq.merge(list1, list2)

# Process only what you need
first_10 = [next(merged) for _ in range(10)]
print(first_10)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`
        }
      ],
      notes: [
        'Returns an iterator (lazy evaluation)',
        'Input iterables must already be sorted',
        'More efficient than concatenating and sorting',
        'Useful for merging large files',
        'Maintains sort stability'
      ],
      useCases: [
        'Merging sorted files',
        'Combining sorted streams',
        'K-way merge sort',
        'Log file aggregation'
      ]
    },
    {
      id: 'heapify_max',
      name: 'heapq.heapify_max()',
      category: 'Max Heap',
      signature: 'heapq.heapify_max(x)',
      description: 'Transform list x into a max-heap, in-place, in linear time. New in Python 3.14.',
      parameters: [
        { name: 'x', type: 'list', description: 'List to transform into a max heap' }
      ],
      returns: 'None (modifies list in-place)',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Basic Max Heap',
          code: `import heapq

# Create a max heap from a list
nums = [5, 7, 9, 1, 3]
heapq.heapify_max(nums)
print(nums)  # Output: [9, 7, 5, 1, 3]

# The largest element is now at index 0
print(nums[0])  # Output: 9`
        },
        {
          title: 'Max Heap vs Min Heap',
          code: `import heapq

nums_max = [10, 20, 5, 15, 30]
nums_min = nums_max.copy()

# Create max heap
heapq.heapify_max(nums_max)
print(f"Max heap: {nums_max}")  # [30, 20, 5, 15, 10]
print(f"Largest: {nums_max[0]}")  # 30

# Create min heap (regular heapify)
heapq.heapify(nums_min)
print(f"Min heap: {nums_min}")  # [5, 10, 15, 20, 30]
print(f"Smallest: {nums_min[0]}")  # 5`
        }
      ],
      notes: [
        'New in Python 3.14',
        'Creates a max heap (largest element at root)',
        'Modifies the list in-place',
        'Max heap property: parent >= children',
        'Before Python 3.14, max heaps required negating values'
      ],
      useCases: [
        'Initialize a max priority queue',
        'Find k smallest elements efficiently',
        'Implement scheduling with highest priority first'
      ]
    },
    {
      id: 'heappush_max',
      name: 'heapq.heappush_max()',
      category: 'Max Heap',
      signature: 'heapq.heappush_max(heap, item)',
      description: 'Push the value item onto the max-heap, maintaining the max-heap invariant. New in Python 3.14.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Max heap to push item onto' },
        { name: 'item', type: 'any', description: 'Item to add to the max heap' }
      ],
      returns: 'None (modifies heap in-place)',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Adding Elements to Max Heap',
          code: `import heapq

max_heap = []
heapq.heappush_max(max_heap, 5)
heapq.heappush_max(max_heap, 3)
heapq.heappush_max(max_heap, 7)
heapq.heappush_max(max_heap, 1)

print(max_heap)  # Output: [7, 3, 5, 1]
print(max_heap[0])  # Largest element: 7`
        },
        {
          title: 'Max Priority Queue',
          code: `import heapq

# Task priority queue (higher number = higher priority)
tasks = []
heapq.heappush_max(tasks, (2, "Medium priority task"))
heapq.heappush_max(tasks, (3, "High priority task"))
heapq.heappush_max(tasks, (1, "Low priority task"))

# Get highest priority task
priority, task = heapq.heappop_max(tasks)
print(f"Priority {priority}: {task}")  # Priority 3: High priority task`
        }
      ],
      notes: [
        'New in Python 3.14',
        'Maintains max heap invariant',
        'O(log n) time complexity for insertion',
        'Pairs with heappop_max() for complete max heap operations'
      ],
      useCases: [
        'Dynamically add items to max priority queue',
        'Stream processing with priority',
        'Real-time task scheduling'
      ]
    },
    {
      id: 'heappop_max',
      name: 'heapq.heappop_max()',
      category: 'Max Heap',
      signature: 'heapq.heappop_max(heap)',
      description: 'Pop and return the largest item from the max-heap, maintaining the max-heap invariant. Raises IndexError if heap is empty. New in Python 3.14.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Max heap to pop from' }
      ],
      returns: 'The largest item from the max heap',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Extract Maximum',
          code: `import heapq

nums = [3, 7, 1, 9, 5]
heapq.heapify_max(nums)

# Pop elements in descending order
print(heapq.heappop_max(nums))  # 9
print(heapq.heappop_max(nums))  # 7
print(heapq.heappop_max(nums))  # 5
print(heapq.heappop_max(nums))  # 3
print(heapq.heappop_max(nums))  # 1`
        },
        {
          title: 'Top K Elements',
          code: `import heapq

def find_k_largest(nums, k):
    """Find k largest elements using max heap"""
    heapq.heapify_max(nums)
    return [heapq.heappop_max(nums) for _ in range(k)]

nums = [10, 20, 5, 15, 30, 25, 8]
k_largest = find_k_largest(nums, 3)
print(k_largest)  # [30, 25, 20]`
        }
      ],
      notes: [
        'New in Python 3.14',
        'Returns and removes the largest element',
        'Raises IndexError if heap is empty',
        'Maintains max heap property after removal',
        'Use with heappush_max() for complete priority queue'
      ],
      useCases: [
        'Process items in descending order of priority',
        'Implement descending heap sort',
        'Find and remove maximum elements'
      ]
    },
    {
      id: 'heappushpop_max',
      name: 'heapq.heappushpop_max()',
      category: 'Max Heap',
      signature: 'heapq.heappushpop_max(heap, item)',
      description: 'Push item on the max-heap, then pop and return the largest item. More efficient than separate push and pop. New in Python 3.14.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Max heap to operate on' },
        { name: 'item', type: 'any', description: 'Item to push onto heap' }
      ],
      returns: 'The largest item (may be the pushed item)',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Efficient Push and Pop',
          code: `import heapq

max_heap = [10, 8, 5]
heapq.heapify_max(max_heap)

# Push 12 and pop largest (will return 12)
largest = heapq.heappushpop_max(max_heap, 12)
print(f"Largest: {largest}")  # 12
print(f"Heap: {max_heap}")  # [10, 8, 5]

# Push 3 and pop largest (will return 10)
largest = heapq.heappushpop_max(max_heap, 3)
print(f"Largest: {largest}")  # 10
print(f"Heap: {max_heap}")  # [8, 5, 3]`
        },
        {
          title: 'Running Maximum with Size Limit',
          code: `import heapq

def top_k_max(stream, k):
    """Maintain top k maximum elements from stream"""
    heap = []
    result = []

    for num in stream:
        if len(heap) < k:
            heapq.heappush_max(heap, num)
        else:
            # Keep only top k maximum
            heapq.heappushpop_max(heap, num)
        result.append(heap[0] if heap else None)

    return result

stream = [5, 10, 3, 8, 15, 12]
maxes = top_k_max(stream, 3)
print(maxes)  # [5, 10, 10, 10, 15, 15]`
        }
      ],
      notes: [
        'New in Python 3.14',
        'More efficient than separate heappush_max() + heappop_max()',
        'Returns the pushed item if it\'s larger than all heap items',
        'Useful for maintaining fixed-size max heaps',
        'Heap size remains constant'
      ],
      useCases: [
        'Sliding window maximum',
        'Maintain top K elements',
        'Limited-size priority buffers'
      ]
    },
    {
      id: 'heapreplace_max',
      name: 'heapq.heapreplace_max()',
      category: 'Max Heap',
      signature: 'heapq.heapreplace_max(heap, item)',
      description: 'Pop and return the largest item from max-heap, then push the new item. Raises IndexError if heap is empty. New in Python 3.14.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Max heap to operate on' },
        { name: 'item', type: 'any', description: 'Item to push after popping' }
      ],
      returns: 'The largest item (before replacement)',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Replace Maximum',
          code: `import heapq

max_heap = [15, 10, 8, 5]
heapq.heapify_max(max_heap)

# Pop 15, push 12
old_max = heapq.heapreplace_max(max_heap, 12)
print(f"Removed: {old_max}")  # 15
print(f"Heap: {max_heap}")  # [12, 10, 8, 5]

# Pop 12, push 20
old_max = heapq.heapreplace_max(max_heap, 20)
print(f"Removed: {old_max}")  # 12
print(f"Heap: {max_heap}")  # [20, 10, 8, 5]`
        },
        {
          title: 'Cache with Replacement',
          code: `import heapq

class MaxPriorityCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.heap = []
        heapq.heapify_max(self.heap)

    def add_or_replace(self, priority, item):
        """Add item or replace lowest priority if full"""
        if len(self.heap) < self.capacity:
            heapq.heappush_max(self.heap, (priority, item))
            return None
        else:
            old = heapq.heapreplace_max(self.heap, (priority, item))
            return old[1]  # Return evicted item

cache = MaxPriorityCache(3)
cache.add_or_replace(5, "Important")
cache.add_or_replace(3, "Medium")
cache.add_or_replace(8, "Critical")
evicted = cache.add_or_replace(6, "High")
print(f"Evicted: {evicted}")  # Critical`
        }
      ],
      notes: [
        'New in Python 3.14',
        'More efficient than heappop_max() + heappush_max()',
        'Always pops before pushing (unlike heappushpop_max)',
        'Raises IndexError on empty heap',
        'Heap size remains constant',
        'Different from heappushpop_max: pop happens first'
      ],
      useCases: [
        'Update priority in priority queue',
        'Fixed-size cache with eviction',
        'Circular buffer with priorities'
      ]
    }
  ]

  const categories = [...new Set(heapMethods.map(m => m.category))]

  const filteredMethods = heapMethods.filter(method => {
    const search = searchTerm.toLowerCase()
    return (
      method.name.toLowerCase().includes(search) ||
      method.description.toLowerCase().includes(search) ||
      method.id.toLowerCase().includes(search) ||
      method.category.toLowerCase().includes(search)
    )
  })

  const handleBackClick = () => {
    if (selectedMethod) {
      setSelectedMethod(null)
    } else {
      onBack()
    }
  }

  if (selectedMethod) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
        color: 'white',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <button
            onClick={handleBackClick}
            style={{
              marginBottom: '1.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1d4ed8'
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2563eb'
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          >
            ← Back to Methods
          </button>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '0.75rem',
            padding: '2.5rem',
            border: '2px solid #3b82f6',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem', borderBottom: '2px solid #3b82f6', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
              <h1 style={{
                margin: 0,
                fontSize: '2rem',
                background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>{selectedMethod.name}</h1>
              <span style={{
                padding: '0.25rem 0.75rem',
                background: '#2563eb',
                color: 'white',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {selectedMethod.category}
              </span>
            </div>
            <p style={{ color: '#d1d5db', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>
              {selectedMethod.description}
            </p>
          </div>

          {/* Signature */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Signature</h3>
            <SyntaxHighlighter
              language="python"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                background: 'none',
                backgroundColor: 'transparent',
                padding: 0
              }}
            >
              {selectedMethod.signature}
            </SyntaxHighlighter>
          </div>

          {/* Parameters */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Parameters</h3>
            {selectedMethod.parameters.map((param, idx) => (
              <div key={idx} style={{
                background: '#1f2937',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
                borderLeft: '4px solid #3b82f6'
              }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <code style={{
                    background: '#2563eb',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {param.name}
                  </code>
                  <span style={{ color: '#93c5fd', fontSize: '0.875rem' }}>
                    ({param.type})
                    {param.optional && <span style={{ color: '#fbbf24' }}> - optional</span>}
                  </span>
                </div>
                <p style={{ color: '#d1d5db', margin: 0, fontSize: '0.9rem' }}>{param.description}</p>
              </div>
            ))}
          </div>

          {/* Returns */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Returns</h3>
            <div style={{
              background: '#1f2937',
              padding: '1rem',
              borderRadius: '0.5rem',
              borderLeft: '4px solid #22d3ee'
            }}>
              <p style={{ color: '#22d3ee', margin: 0, fontWeight: '500' }}>{selectedMethod.returns}</p>
            </div>
          </div>

          {/* Complexity */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Complexity</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{
                background: '#1f2937',
                padding: '1rem',
                borderRadius: '0.5rem',
                borderLeft: '4px solid #fbbf24'
              }}>
                <div style={{ color: '#fbbf24', fontWeight: '600', marginBottom: '0.25rem' }}>Time Complexity</div>
                <code style={{ color: '#fde68a' }}>{selectedMethod.timeComplexity}</code>
              </div>
              <div style={{
                background: '#1f2937',
                padding: '1rem',
                borderRadius: '0.5rem',
                borderLeft: '4px solid #8b5cf6'
              }}>
                <div style={{ color: '#a78bfa', fontWeight: '600', marginBottom: '0.25rem' }}>Space Complexity</div>
                <code style={{ color: '#c4b5fd' }}>{selectedMethod.spaceComplexity}</code>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Examples</h3>
            {selectedMethod.examples.map((example, exampleIdx) => (
              <div key={exampleIdx} style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#93c5fd', marginBottom: '0.5rem', fontSize: '1rem' }}>{example.title}</h4>
                {parseCodeSections(example.code).map((section, idx) => (
                  <div key={section.id} style={{ marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '100%',
                        background: '#2563eb',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '0.5rem',
                        textAlign: 'left',
                        fontWeight: '500',
                        fontSize: '1rem'
                      }}
                    >
                      Code Block {idx + 1}
                    </div>
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        background: 'none',
                        backgroundColor: 'transparent',
                        padding: 0
                      }}
                    >
                      {section.code}
                    </SyntaxHighlighter>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Important Notes</h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              {selectedMethod.notes.map((note, idx) => (
                <li key={idx} style={{ color: '#d1d5db', marginBottom: '0.5rem', lineHeight: '1.6' }}>
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Common Use Cases</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {selectedMethod.useCases.map((useCase, idx) => (
                <div key={idx} style={{
                  background: '#2563eb',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: '1px solid #3b82f6'
                }}>
                  {useCase}
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <button
          onClick={handleBackClick}
          style={{
            marginBottom: '1.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1d4ed8'
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#2563eb'
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
        >
          ← Back to Python
        </button>

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            margin: '0 0 0.5rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '2.25rem',
            fontWeight: 'bold'
          }}>
            <span>📚</span>
            <span style={{
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Python heapq Module Reference</span>
          </h1>
          <p style={{ color: '#d1d5db', fontSize: '1.1rem', margin: 0 }}>
            Complete documentation for all heapq module methods with examples and complexity analysis
          </p>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        {/* Visual Diagrams Section */}
        <div style={{
          marginBottom: '2.5rem',
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          border: '2px solid #3b82f6'
        }}>
          <h2 style={{
            margin: '0 0 1.5rem 0',
            fontSize: '1.5rem',
            color: '#93c5fd',
            borderBottom: '2px solid #3b82f6',
            paddingBottom: '0.75rem'
          }}>
            Visual Guide to Heaps
          </h2>

          {/* Min-Heap Structure and Array Representation */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: '#111827',
              borderRadius: '0.5rem',
              padding: '1rem',
              border: '1px solid #374151'
            }}>
              <h3 style={{ color: '#22c55e', margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Min-Heap Structure</h3>
              <MinHeapDiagram />
            </div>
            <div style={{
              background: '#111827',
              borderRadius: '0.5rem',
              padding: '1rem',
              border: '1px solid #374151'
            }}>
              <h3 style={{ color: '#fbbf24', margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Array Representation</h3>
              <HeapArrayDiagram />
            </div>
          </div>

          {/* Operations Section */}
          <h3 style={{
            color: '#93c5fd',
            margin: '0 0 1rem 0',
            fontSize: '1.25rem',
            borderBottom: '1px solid #374151',
            paddingBottom: '0.5rem'
          }}>
            Heap Operations
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              background: '#111827',
              borderRadius: '0.5rem',
              padding: '1rem',
              border: '1px solid #374151'
            }}>
              <h4 style={{ color: '#60a5fa', margin: '0 0 0.75rem 0', fontSize: '1rem' }}>heappush - Insert Element (Bubble Up)</h4>
              <HeappushDiagram />
            </div>
            <div style={{
              background: '#111827',
              borderRadius: '0.5rem',
              padding: '1rem',
              border: '1px solid #374151'
            }}>
              <h4 style={{ color: '#ef4444', margin: '0 0 0.75rem 0', fontSize: '1rem' }}>heappop - Remove Min (Bubble Down)</h4>
              <HeappopDiagram />
            </div>
          </div>

          <div style={{
            background: '#111827',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid #374151'
          }}>
            <h4 style={{ color: '#a855f7', margin: '0 0 0.75rem 0', fontSize: '1rem' }}>heapify - Convert List to Heap</h4>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <HeapifyDiagram />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search methods... (e.g., 'nsmallest', 'push', 'merge')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              border: '2px solid #3b82f6',
              borderRadius: '0.5rem',
              outline: 'none',
              background: '#1f2937',
              color: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
            onBlur={(e) => e.target.style.borderColor = '#3b82f6'}
          />
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {categories.map((category) => {
            const count = heapMethods.filter(m => m.category === category).length
            return (
              <div key={category} style={{
                padding: '0.5rem 1rem',
                background: '#2563eb',
                color: 'white',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                border: '1px solid #3b82f6'
              }}>
                {category} ({count})
              </div>
            )
          })}
        </div>

        {/* Methods Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s',
                border: '2px solid #3b82f6'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
                e.currentTarget.style.borderColor = '#60a5fa'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = '#3b82f6'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#93c5fd', fontSize: '1.25rem' }}>{method.name}</h3>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  background: '#2563eb',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {method.category}
                </span>
              </div>
              <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                {method.description}
              </p>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#93c5fd' }}>
                <div>
                  <span style={{ fontWeight: '600' }}>Time:</span> {method.timeComplexity}
                </div>
                <div>
                  <span style={{ fontWeight: '600' }}>Space:</span> {method.spaceComplexity}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMethods.length === 0 && (
          <div style={{
            textAlign: 'left',
            padding: '3rem',
            color: '#93c5fd',
            fontSize: '1.1rem'
          }}>
            No methods found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  )
}

export default PythonHeapsReference

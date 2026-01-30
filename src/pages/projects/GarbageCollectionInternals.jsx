/**
 * Garbage Collection Internals - Tab Template Format
 *
 * Deep dive into JVM Garbage Collection: algorithms, collectors, and tuning.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * Garbage Collection theme colors (red theme)
 */
const GC_COLORS = {
  primary: '#ef4444',              // Red accent
  primaryHover: '#f87171',         // Lighter red hover
  bg: 'rgba(239, 68, 68, 0.1)',    // Red background
  border: 'rgba(239, 68, 68, 0.3)', // Red border
  arrow: '#ef4444',                // Red arrow
  hoverBg: 'rgba(239, 68, 68, 0.2)', // Red hover background
  topicBg: 'rgba(239, 68, 68, 0.2)'  // Red topic background
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
 * Heap Layout Overview Diagram
 */
const HeapLayoutDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="gc-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      JVM Heap Layout - Generational Collection
    </text>

    {/* Young Generation Box */}
    <rect x="50" y="50" width="700" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="45" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Young Generation</text>

    {/* Eden */}
    <rect x="70" y="65" width="440" height="50" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="290" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Eden Space</text>

    {/* Survivor 0 */}
    <rect x="530" y="65" width="100" height="50" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="580" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S0</text>

    {/* Survivor 1 */}
    <rect x="640" y="65" width="100" height="50" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="690" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S1</text>

    {/* Old Generation Box */}
    <rect x="50" y="160" width="700" height="80" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="155" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Old Generation (Tenured)</text>
    <text x="400" y="205" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Long-lived Objects</text>

    {/* Flow arrows */}
    <line x1="290" y1="130" x2="290" y2="155" stroke="#ef4444" strokeWidth="2" markerEnd="url(#gc-arrow)"/>
    <text x="310" y="145" fill="#94a3b8" fontSize="9">Promotion</text>
  </svg>
)

/**
 * GC Roots Diagram
 */
const GCRootsDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="root-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      GC Roots and Object Reachability
    </text>

    {/* GC Roots */}
    <rect x="50" y="60" width="140" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="120" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Stack Variables</text>

    <rect x="50" y="110" width="140" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="120" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Static Fields</text>

    <rect x="50" y="160" width="140" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="120" y="185" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Active Threads</text>

    {/* Reachable Objects */}
    <rect x="280" y="80" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="340" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Object A</text>

    <rect x="280" y="150" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="340" y="180" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Object B</text>

    {/* More reachable */}
    <rect x="490" y="115" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="550" y="145" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Object C</text>

    {/* Unreachable */}
    <rect x="640" y="115" width="120" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="700" y="140" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Unreachable</text>
    <text x="700" y="152" textAnchor="middle" fill="white" fontSize="8">(GC eligible)</text>

    {/* Arrows showing reachability */}
    <line x1="190" y1="80" x2="275" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#root-arrow)"/>
    <line x1="190" y1="130" x2="275" y2="105" stroke="#ef4444" strokeWidth="2" markerEnd="url(#root-arrow)"/>
    <line x1="190" y1="180" x2="275" y2="175" stroke="#ef4444" strokeWidth="2" markerEnd="url(#root-arrow)"/>
    <line x1="400" y1="105" x2="485" y2="140" stroke="#ef4444" strokeWidth="2" markerEnd="url(#root-arrow)"/>

    {/* Label */}
    <text x="120" y="45" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">GC Roots</text>
    <text x="340" y="60" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Reachable</text>
    <text x="700" y="95" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Unreachable</text>
  </svg>
)

/**
 * Generational Collection Flow Diagram
 */
const GenerationalFlowDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="gen-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Object Lifecycle and Promotion
    </text>

    {/* Stage 1: New Object */}
    <rect x="50" y="60" width="120" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="110" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">New Object</text>
    <text x="110" y="100" textAnchor="middle" fill="white" fontSize="9">Eden</text>
    <text x="110" y="112" textAnchor="middle" fill="#4ade80" fontSize="8">age = 0</text>

    {/* Stage 2: Survived Minor GC */}
    <rect x="230" y="60" width="120" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="290" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Survived</text>
    <text x="290" y="95" textAnchor="middle" fill="white" fontSize="9">Survivor</text>
    <text x="290" y="112" textAnchor="middle" fill="#60a5fa" fontSize="8">age++</text>

    {/* Stage 3: Promoted */}
    <rect x="410" y="60" width="120" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="470" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Promoted</text>
    <text x="470" y="95" textAnchor="middle" fill="white" fontSize="9">Old Gen</text>
    <text x="470" y="112" textAnchor="middle" fill="#a78bfa" fontSize="8">age &gt; threshold</text>

    {/* Stage 4: Eventually GC'd */}
    <rect x="590" y="60" width="120" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="650" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Collected</text>
    <text x="650" y="100" textAnchor="middle" fill="white" fontSize="9">Major GC</text>

    {/* Arrows */}
    <line x1="170" y1="90" x2="225" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#gen-arrow)"/>
    <line x1="350" y1="90" x2="405" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#gen-arrow)"/>
    <line x1="530" y1="90" x2="585" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#gen-arrow)"/>

    {/* Labels */}
    <text x="197" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Minor GC</text>
    <text x="377" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Threshold</text>
    <text x="557" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Unreachable</text>

    {/* Timeline */}
    <text x="110" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Allocation</text>
    <text x="290" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Survival</text>
    <text x="470" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Long-lived</text>
    <text x="650" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Reclaimed</text>
  </svg>
)

/**
 * G1 Region-Based Heap Diagram
 */
const G1RegionDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      G1 Garbage Collector - Region-Based Heap
    </text>

    <text x="400" y="45" textAnchor="middle" fill="#94a3b8" fontSize="10">
      Heap divided into equal-sized regions (1-32MB each)
    </text>

    {/* Region grid */}
    <rect x="50" y="70" width="60" height="60" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="80" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">E</text>

    <rect x="120" y="70" width="60" height="60" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="150" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">E</text>

    <rect x="190" y="70" width="60" height="60" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="220" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">E</text>

    <rect x="260" y="70" width="60" height="60" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="290" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S</text>

    <rect x="330" y="70" width="60" height="60" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="360" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">O</text>

    <rect x="400" y="70" width="60" height="60" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="430" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">O</text>

    <rect x="470" y="70" width="60" height="60" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="500" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">O</text>

    <rect x="540" y="70" width="60" height="60" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="570" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">H</text>

    <rect x="610" y="70" width="60" height="60" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="640" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">H</text>

    <rect x="680" y="70" width="60" height="60" rx="4" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4"/>
    <text x="710" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">F</text>

    {/* Legend */}
    <text x="80" y="155" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">E = Eden</text>
    <text x="220" y="155" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">S = Survivor</text>
    <text x="360" y="155" textAnchor="middle" fill="#8b5cf6" fontSize="9" fontWeight="bold">O = Old</text>
    <text x="500" y="155" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">H = Humongous</text>
    <text x="650" y="155" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">F = Free</text>
  </svg>
)

/**
 * ZGC Colored Pointers Diagram
 */
const ZGCPointerDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ZGC Colored Pointers (64-bit)
    </text>

    {/* 64-bit pointer visualization */}
    <rect x="50" y="60" width="500" height="50" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>

    {/* Object Address section */}
    <rect x="50" y="60" width="330" height="50" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="215" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Object Address (Bits 0-41)</text>

    {/* Metadata section */}
    <rect x="380" y="60" width="80" height="50" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="420" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Metadata</text>
    <text x="420" y="97" textAnchor="middle" fill="white" fontSize="8">(42-45)</text>

    {/* Unused section */}
    <rect x="460" y="60" width="90" height="50" rx="4" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1"/>
    <text x="505" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Unused</text>
    <text x="505" y="97" textAnchor="middle" fill="#94a3b8" fontSize="8">(46-63)</text>

    {/* Bit numbers */}
    <text x="50" y="130" fill="#94a3b8" fontSize="9">0</text>
    <text x="380" y="130" fill="#94a3b8" fontSize="9">42</text>
    <text x="460" y="130" fill="#94a3b8" fontSize="9">46</text>
    <text x="540" y="130" fill="#94a3b8" fontSize="9">63</text>

    {/* Metadata bits explanation */}
    <text x="420" y="155" textAnchor="middle" fill="#22c55e" fontSize="9">Marked, Remapped, etc.</text>
  </svg>
)

/**
 * GC Collector Comparison Diagram
 */
const CollectorComparisonDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      GC Collector Comparison
    </text>

    {/* Table headers */}
    <text x="120" y="60" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Collector</text>
    <text x="320" y="60" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Throughput</text>
    <text x="520" y="60" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Pause Time</text>
    <text x="680" y="60" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Use Case</text>

    {/* Parallel GC */}
    <rect x="50" y="75" width="140" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="120" y="97" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Parallel GC</text>
    <text x="320" y="97" textAnchor="middle" fill="#22c55e" fontSize="10">Best</text>
    <text x="520" y="97" textAnchor="middle" fill="#ef4444" fontSize="10">High</text>
    <text x="680" y="97" textAnchor="middle" fill="#94a3b8" fontSize="9">Batch Jobs</text>

    {/* G1 GC */}
    <rect x="50" y="115" width="140" height="35" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="120" y="137" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">G1 GC</text>
    <text x="320" y="137" textAnchor="middle" fill="#22c55e" fontSize="10">Good</text>
    <text x="520" y="137" textAnchor="middle" fill="#f59e0b" fontSize="10">Moderate</text>
    <text x="680" y="137" textAnchor="middle" fill="#94a3b8" fontSize="9">General Purpose</text>

    {/* ZGC */}
    <rect x="50" y="155" width="140" height="35" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="120" y="177" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ZGC</text>
    <text x="320" y="177" textAnchor="middle" fill="#22c55e" fontSize="10">Good</text>
    <text x="520" y="177" textAnchor="middle" fill="#22c55e" fontSize="10">&lt;1ms</text>
    <text x="680" y="177" textAnchor="middle" fill="#94a3b8" fontSize="9">Low Latency</text>

    {/* Shenandoah */}
    <rect x="50" y="195" width="140" height="35" rx="4" fill="#ec4899" stroke="#f472b6" strokeWidth="1"/>
    <text x="120" y="217" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Shenandoah</text>
    <text x="320" y="217" textAnchor="middle" fill="#22c55e" fontSize="10">Good</text>
    <text x="520" y="217" textAnchor="middle" fill="#22c55e" fontSize="10">&lt;10ms</text>
    <text x="680" y="217" textAnchor="middle" fill="#94a3b8" fontSize="9">Low Latency</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * GarbageCollectionInternals Component
 *
 * @param {function} onBack - Callback to navigate back to parent page
 * @param {object} breadcrumb - Optional breadcrumb configuration from parent
 */
function GarbageCollectionInternals({ onBack, breadcrumb }) {
  // State for modal navigation
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'gc-basics',
      name: 'How GC Works',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Garbage Collection automatically reclaims memory from unreachable objects. Learn about GC roots, reachability analysis, and the generational hypothesis.',
      diagram: GCRootsDiagram,
      details: [
        {
          name: 'GC Roots and Reachability',
          diagram: GCRootsDiagram,
          explanation: 'Garbage Collection starts from GC roots (stack variables, static fields, active threads, JNI references) and traverses the object graph. Objects reachable from roots are kept; unreachable objects are collected. This approach handles circular references automatically since reachability is based on paths from roots, not reference counting.',
          codeExample: `// Object becomes unreachable
void example() {
    Object obj = new Object();  // Reachable (stack ref)
    obj = null;                  // Now unreachable
    // GC can collect the object
}

// Circular references - still collected!
class Node {
    Node next;
}
void circular() {
    Node a = new Node();
    Node b = new Node();
    a.next = b;
    b.next = a;  // Circular reference
    a = null;
    b = null;    // Both unreachable from roots
    // GC collects both despite circular ref!
}`
        },
        {
          name: 'GC Root Types',
          explanation: 'GC roots are starting points for reachability analysis. There are four main types: (1) Local variables in stack frames - exist while method executes, (2) Static variables - always reachable, (3) Active threads - thread objects themselves are roots, (4) JNI references - native code references to Java objects.',
          codeExample: `// GC Roots examples:
// 1. Local variables
void method() {
    Object local = new Object();  // GC root while method runs
}

// 2. Static fields
static Object staticRef = new Object();  // Always GC root

// 3. Active threads
Thread t = new Thread();  // t is GC root

// 4. JNI references
// Native code holding Java object references`
        },
        {
          name: 'Stop-The-World and Mark-Sweep',
          explanation: 'Most GC phases require stop-the-world (STW) pauses where application threads are frozen. The basic mark-sweep algorithm marks all reachable objects, then sweeps through memory collecting unmarked objects. Modern collectors minimize STW time through concurrent marking and generational strategies.',
          codeExample: `// Request GC (not guaranteed)
System.gc();  // Hint to JVM, may be ignored

// Disable explicit GC calls:
// -XX:+DisableExplicitGC

// GC behavior:
// 1. STW pause begins
// 2. Mark phase: traverse from roots
// 3. Sweep phase: collect unmarked
// 4. Compact phase (optional): defragment
// 5. Resume application`
        }
      ]
    },
    {
      id: 'generational',
      name: 'Generational Collection',
      icon: '📚',
      color: '#22c55e',
      description: 'Heap is divided into Young and Old generations based on the generational hypothesis: most objects die young. This allows efficient collection of short-lived objects.',
      diagram: GenerationalFlowDiagram,
      details: [
        {
          name: 'Young Generation',
          diagram: HeapLayoutDiagram,
          explanation: 'Young Generation contains newly created objects. It consists of Eden space (where new objects are allocated) and two Survivor spaces (S0 and S1). Minor GC occurs frequently but is fast because most young objects are already dead. Objects that survive multiple Minor GCs are promoted to Old Generation.',
          codeExample: `// Young Gen configuration
// -Xmn256m        Young generation size
// -XX:NewRatio=2  Old:Young = 2:1
// -XX:SurvivorRatio=8  Eden:Survivor = 8:1

// Young Gen layout (100MB example):
// ┌──────────────────────────────────┐
// │          Eden (80MB)             │ New objects
// ├────────────────┬─────────────────┤
// │    S0 (10MB)   │    S1 (10MB)    │ Survivors
// └────────────────┴─────────────────┘

// Object lifecycle:
// 1. Allocate in Eden
Object obj = new Object();  // → Eden

// 2. Eden fills → Minor GC
// Survivors → Survivor space, age=1`
        },
        {
          name: 'Old Generation',
          explanation: 'Old Generation (Tenured space) holds long-lived objects that survived multiple Minor GCs. Major GC or Full GC collects Old Gen, which is slower and less frequent than Minor GC. Objects are promoted to Old Gen when their age exceeds the threshold (default 15) or when Survivor space is full.',
          codeExample: `// Promotion to Old Gen
// 3. More Minor GCs
// age++ each survival

// 4. Age > threshold (default 15)
// → Promoted to Old Gen
// -XX:MaxTenuringThreshold=15

// Premature promotion issues:
// - Minor GCs copy too many objects
// - Old Gen fills faster
// - More Full GCs

// Monitor generations:
// jstat -gc <pid> 1000
// EC/EU - Eden capacity/used
// S0C/S0U - Survivor 0
// OC/OU - Old generation`
        },
        {
          name: 'Generational Hypothesis',
          diagram: GenerationalFlowDiagram,
          explanation: 'The generational hypothesis states that most objects die young (80-98% of objects are short-lived). By separating young and old objects, GC can focus collection efforts on Young Gen where most garbage exists. This dramatically improves efficiency compared to collecting the entire heap.',
          codeExample: `// Generational hypothesis in action
void createObjects() {
    // 98% of these will die before next Minor GC
    for (int i = 0; i < 1000; i++) {
        String temp = "temp" + i;  // Short-lived
        process(temp);
    }

    // Only long-lived objects like this cache
    // will eventually be promoted to Old Gen
    static Map<String, Data> cache = new HashMap<>();
}

// Minor GC is fast because:
// - Small area to scan (Young Gen only)
// - Most objects already dead
// - No need to scan Old Gen references`
        }
      ]
    },
    {
      id: 'gc-algorithms',
      name: 'GC Algorithms',
      icon: '🔧',
      color: '#3b82f6',
      description: 'Different GC algorithms trade throughput vs latency. Choose Serial for small heaps, Parallel for batch jobs, G1 for balanced performance, or ZGC/Shenandoah for ultra-low latency.',
      diagram: CollectorComparisonDiagram,
      details: [
        {
          name: 'Serial GC',
          explanation: 'Serial GC uses a single thread for both Minor and Major GC. It is simple and has low overhead, making it suitable for small heaps (< 100MB) and single-CPU systems. During collection, all application threads are paused (stop-the-world).',
          codeExample: `// Enable Serial GC
// -XX:+UseSerialGC

// Characteristics:
// - Single-threaded collection
// - Low memory overhead
// - Long pause times
// - Best for: Small heaps, single CPU

// When to use:
// - Client applications
// - Heap < 100MB
// - Single processor systems`
        },
        {
          name: 'Parallel GC',
          explanation: 'Parallel GC (throughput collector) uses multiple threads for Young Gen collection. It maximizes application throughput but has longer pause times. Best for batch processing and applications where total execution time matters more than latency.',
          codeExample: `// Enable Parallel GC
// -XX:+UseParallelGC

// Parallel GC tuning
// -XX:ParallelGCThreads=4
// -XX:+UseAdaptiveSizePolicy

// Characteristics:
// - Multi-threaded collection
// - High throughput
// - Higher pause times
// - Best for: Batch jobs, server apps

// When to use:
// - Batch processing
// - High throughput needed
// - Pause times less critical`
        },
        {
          name: 'Concurrent Mark Sweep (CMS)',
          explanation: 'CMS collector performs most GC work concurrently with application threads to minimize pause times. It is deprecated in Java 9 and removed in Java 14, replaced by G1 and ZGC. CMS could suffer from fragmentation and concurrent mode failures.',
          codeExample: `// CMS is DEPRECATED (removed Java 14)
// -XX:+UseConcMarkSweepGC

// CMS phases:
// 1. Initial mark (STW) - mark from roots
// 2. Concurrent mark - trace graph
// 3. Concurrent preclean
// 4. Remark (STW) - finalize marking
// 5. Concurrent sweep - reclaim memory

// Issues with CMS:
// - Fragmentation (no compaction)
// - Concurrent mode failure
// - Larger heap overhead

// Migration path: Use G1 GC instead`
        },
        {
          name: 'Choosing a Collector',
          diagram: CollectorComparisonDiagram,
          explanation: 'Collector selection depends on application requirements. For maximum throughput in batch jobs, use Parallel GC. For balanced performance and predictable pauses, use G1 GC (default). For ultra-low latency with large heaps, use ZGC or Shenandoah. For tiny heaps or embedded systems, Serial GC suffices.',
          codeExample: `// Decision tree for collector selection:

// Heap < 100MB?
//   → Serial GC (-XX:+UseSerialGC)

// Batch job, throughput critical?
//   → Parallel GC (-XX:+UseParallelGC)

// General purpose application?
//   → G1 GC (-XX:+UseG1GC) [default]

// Large heap (>4GB), low latency critical?
//   → ZGC (-XX:+UseZGC)

// Need concurrent collection?
//   → Shenandoah (-XX:+UseShenandoahGC)

// Common flags for all collectors
// -XX:+PrintGC            Basic GC logging
// -XX:+PrintGCDetails     Detailed logging
// -Xlog:gc*               Unified logging (Java 9+)`
        }
      ]
    },
    {
      id: 'g1-gc',
      name: 'G1 Garbage Collector',
      icon: '🎯',
      color: '#8b5cf6',
      description: 'G1 (Garbage First) is the default collector since Java 9. It uses a region-based heap for predictable pause times and collects regions with most garbage first.',
      diagram: G1RegionDiagram,
      details: [
        {
          name: 'G1 Architecture',
          diagram: G1RegionDiagram,
          explanation: 'G1 divides the heap into equal-sized regions (1-32MB each) instead of contiguous Young/Old generations. Regions can be Eden, Survivor, Old, or Humongous. This allows G1 to collect regions incrementally and prioritize regions with most garbage (garbage first).',
          codeExample: `// G1 heap layout
// ┌───┬───┬───┬───┬───┬───┬───┬───┐
// │ E │ E │ S │ O │ O │ H │ H │ F │
// └───┴───┴───┴───┴───┴───┴───┴───┘
// E=Eden, S=Survivor, O=Old, H=Humongous, F=Free

// G1 flags
// -XX:+UseG1GC
// -XX:MaxGCPauseMillis=200    Target pause time
// -XX:G1HeapRegionSize=4m     Region size (1-32MB)
// -XX:G1NewSizePercent=5      Min young gen %
// -XX:G1MaxNewSizePercent=60  Max young gen %`
        },
        {
          name: 'G1 Collection Phases',
          explanation: 'G1 has two main phases: Young-only phase (Minor GCs) and Space reclamation phase (Mixed GCs). When heap occupancy reaches threshold, G1 starts concurrent marking to identify garbage. Then Mixed GCs collect both young and old regions, prioritizing regions with most garbage.',
          codeExample: `// G1 collection phases:
// 1. Young-only phase
//    - Minor GCs only
//    - Concurrent marking starts when heap fills

// 2. Space reclamation phase
//    - Mixed GCs (young + old regions)
//    - Collect regions with most garbage first

// Example GC log output:
// [GC pause (G1 Evacuation Pause) (young)
//  [Eden: 24M -> 0B  Survivors: 4M -> 4M
//   Heap: 50M -> 30M], 0.0124 secs]

// Mixed GC:
// [GC pause (G1 Evacuation Pause) (mixed)
//  [Eden: 20M -> 0B  Survivors: 4M -> 4M
//   Old: 80M -> 60M  Heap: 104M -> 64M], 0.0234 secs]`
        },
        {
          name: 'Humongous Objects',
          explanation: 'Objects larger than 50% of region size are called humongous objects. They are allocated in contiguous regions in the Old generation. Humongous objects can cause fragmentation and are only collected during Full GC or concurrent cycle cleanup. Avoid creating large objects if possible.',
          codeExample: `// Humongous objects
// Objects > 50% of region size
// Allocated in contiguous regions
// Can cause fragmentation

// Example with 2MB regions:
// Objects > 1MB are humongous

// Avoid humongous objects:
// - Split large arrays
// - Use streaming instead of large buffers
// - Increase G1HeapRegionSize if needed

// Monitor humongous allocations:
// -Xlog:gc+heap=debug
// Look for "humongous allocation" messages`
        },
        {
          name: 'G1 Tuning',
          explanation: 'G1 is largely self-tuning. The most important flag is MaxGCPauseMillis (default 200ms). G1 adjusts Young Gen size dynamically to meet this target. Increase MaxGCPauseMillis for better throughput, decrease for lower latency. Avoid setting Young Gen size manually as it interferes with G1 adaptive sizing.',
          codeExample: `// G1 tuning tips:
// 1. Don't set Young Gen size manually
//    Let G1 adjust dynamically

// 2. Increase MaxGCPauseMillis if throughput matters
// -XX:MaxGCPauseMillis=500

// 3. Decrease MaxGCPauseMillis for lower latency
// -XX:MaxGCPauseMillis=100

// 4. Monitor with detailed logging
// -Xlog:gc*=debug

// 5. Increase region size for large objects
// -XX:G1HeapRegionSize=8m

// 6. Tune concurrent marking threshold
// -XX:InitiatingHeapOccupancyPercent=45

// Don't do this (interferes with G1):
// -Xmn1g  // DON'T set Young Gen size`
        }
      ]
    },
    {
      id: 'zgc',
      name: 'ZGC (Ultra-Low Latency)',
      icon: '🚀',
      color: '#06b6d4',
      description: 'ZGC provides sub-millisecond pause times regardless of heap size. It scales to multi-TB heaps and performs almost all work concurrently using colored pointers.',
      diagram: ZGCPointerDiagram,
      details: [
        {
          name: 'ZGC Overview',
          diagram: ZGCPointerDiagram,
          explanation: 'ZGC is a low-latency garbage collector that keeps pause times under 1ms (typically ~0.1ms) regardless of heap size. It uses colored pointers to track object state and load barriers to enable concurrent processing. ZGC is production-ready since Java 15.',
          codeExample: `// Enable ZGC
// -XX:+UseZGC
// -XX:+ZGenerational    (Java 21+, generational ZGC)

// ZGC characteristics:
// - Pause time: <1ms (typically ~0.1ms)
// - Heap size: 8MB to 16TB
// - Concurrent: almost all phases
// - 64-bit only

// When to use ZGC:
// - Large heaps (>4GB)
// - Latency-sensitive applications
// - Response time > throughput
// - Need predictable low latency`
        },
        {
          name: 'Colored Pointers',
          diagram: ZGCPointerDiagram,
          explanation: 'ZGC uses "colored pointers" where object references encode metadata in unused bits (64-bit pointers only). Bits 42-45 store marking and relocation state. This allows ZGC to track object state without separate metadata structures, enabling very fast concurrent operations.',
          codeExample: `// Colored pointers (64-bit only):
// Bits 0-41:  Object address (4TB addressing)
// Bits 42-45: Metadata (marked, remapped, etc.)
// Bits 46-63: Unused

// Example pointer states:
// 0x0000_0000_0000_1000  // Unmapped
// 0x0000_4000_0000_1000  // Marked0
// 0x0000_8000_0000_1000  // Marked1
// 0x0000_C000_0000_1000  // Remapped

// Load barriers:
// ZGC inserts barriers on object reads
// Barriers check pointer color
// Relocate/remap if needed`
        },
        {
          name: 'ZGC Phases',
          explanation: 'ZGC has mostly concurrent phases with only three tiny stop-the-world pauses. The phases are: Pause Mark Start, Concurrent Mark, Pause Mark End, Concurrent Prepare/Process/Relocate, and Pause Relocate Start. Each pause is typically under 1ms regardless of heap size.',
          codeExample: `// ZGC phases (almost all concurrent):
// 1. Pause Mark Start (STW) - ~0.1ms
//    Initialize marking

// 2. Concurrent Mark
//    Traverse object graph

// 3. Pause Mark End (STW) - ~0.1ms
//    Finalize marking

// 4. Concurrent Prepare for Relocation
//    Select relocation set

// 5. Pause Relocate Start (STW) - ~0.1ms
//    Relocate roots

// 6. Concurrent Relocate
//    Move objects, remap references

// Total STW time: < 1ms
// Most work done concurrently`
        },
        {
          name: 'ZGC Tuning',
          explanation: 'ZGC requires minimal tuning. Set heap size with -Xmx. Optionally use -XX:SoftMaxHeapSize for soft limit. ZGC can force collections at intervals with -XX:ZCollectionInterval. Java 21+ generational ZGC offers better throughput than non-generational.',
          codeExample: `// ZGC tuning:
// -XX:ZCollectionInterval=300  Force GC every 300s
// -XX:SoftMaxHeapSize=4g       Soft heap limit

// Generational ZGC (Java 21+):
// -XX:+UseZGC -XX:+ZGenerational
// Better throughput than non-generational

// ZGC doesn't need much tuning
// Just set heap size appropriately
// -Xmx8g

// Monitor ZGC:
// -Xlog:gc*
// Look for pause times in logs

// Typical pause time:
// [Pause Mark Start: 0.123ms]
// [Pause Mark End: 0.098ms]
// [Pause Relocate Start: 0.105ms]`
        }
      ]
    },
    {
      id: 'gc-tuning',
      name: 'GC Tuning and Monitoring',
      icon: '📊',
      color: '#ec4899',
      description: 'Monitor GC with jstat, JVisualVM, and GC logs. Tune heap sizes, pause time targets, and thread counts. Understand Full GC triggers and how to avoid them.',
      details: [
        {
          name: 'Heap Size Tuning',
          explanation: 'Set initial heap size with -Xms and maximum heap size with -Xmx. Setting them equal avoids heap resizing overhead. The heap should be large enough to avoid frequent Full GCs but not so large that GC pauses become problematic. A good starting point is 25-50% of available RAM.',
          codeExample: `// Heap size configuration
// -Xms4g    Initial heap size
// -Xmx4g    Maximum heap size

// Set them equal to avoid resizing:
// -Xms4g -Xmx4g

// Young generation size
// -Xmn1g    Fixed young gen size (not recommended for G1)
// -XX:NewRatio=2  Old:Young = 2:1

// Metaspace (replaced PermGen in Java 8+)
// -XX:MetaspaceSize=256m
// -XX:MaxMetaspaceSize=512m

// Heap sizing guidelines:
// - Start with 25-50% of RAM
// - Leave room for OS and other processes
// - Monitor with jstat or GC logs
// - Adjust based on GC frequency`
        },
        {
          name: 'GC Logging',
          explanation: 'Enable GC logging to understand collection patterns. Java 9+ uses unified logging (-Xlog). Older versions use -XX:+PrintGC flags. GC logs show pause times, heap sizes before/after collection, and collection triggers. Essential for diagnosing performance issues.',
          codeExample: `// GC Logging (Java 9+)
// -Xlog:gc*               All GC info
// -Xlog:gc*=debug         Detailed logging
// -Xlog:gc*:file=gc.log   Log to file

// GC Logging (Java 8 and earlier)
// -XX:+PrintGC            Basic GC info
// -XX:+PrintGCDetails     Detailed info
// -XX:+PrintGCTimeStamps  Timestamps
// -Xloggc:gc.log          Log to file

// Example log output:
// [GC (Allocation Failure) [PSYoungGen:
//   262144K->32768K(262144K)]
//   262144K->32768K(524288K), 0.0123456 secs]

// Parse logs with tools:
// - GCViewer
// - GCEasy
// - Garbage Cat`
        },
        {
          name: 'Monitoring with jstat',
          explanation: 'jstat is a command-line tool for monitoring JVM statistics. Use "jstat -gc <pid> 1000" to see GC stats every second. Monitor Eden, Survivor, Old, and Metaspace utilization. Track GC count and time. High Minor GC frequency or frequent Full GCs indicate tuning needs.',
          codeExample: `// Monitor GC with jstat
// jstat -gc <pid> 1000    GC stats every 1000ms
// jstat -gcutil <pid>     GC utilization percentages

// Example output:
//  S0C    S0U    EC     EU      OC      OU      MC     YGC  FGC
// 10240  1024  262144  65536  524288  131072  65536  100   2

// S0C/S0U - Survivor 0 capacity/used
// EC/EU   - Eden capacity/used
// OC/OU   - Old generation capacity/used
// MC/MU   - Metaspace capacity/used
// YGC     - Young GC count
// FGC     - Full GC count

// Force GC (for testing):
// jcmd <pid> GC.run`
        },
        {
          name: 'Full GC Triggers',
          explanation: 'Full GC is triggered when Old Gen fills up, Metaspace is full, System.gc() is called, or promotion failure occurs. Full GC is expensive (stop-the-world) and should be rare. Frequent Full GCs indicate insufficient heap, memory leaks, or premature promotion. Use monitoring tools to diagnose root cause.',
          codeExample: `// Full GC triggers:
// 1. Old Gen space exhausted
// 2. Metaspace/PermGen full
// 3. System.gc() called
// 4. Concurrent mode failure (G1)
// 5. Promotion failure
// 6. Allocation failure in Old Gen

// Avoid Full GC:
// - Increase heap size
// - Fix memory leaks
// - Tune Young Gen size
// - Avoid System.gc()

// Disable explicit GC:
// -XX:+DisableExplicitGC

// Diagnose with heap dump:
// jcmd <pid> GC.heap_dump heap.hprof
// Analyze with:
// - Eclipse MAT
// - JVisualVM
// - YourKit`
        },
        {
          name: 'GC Interview Questions',
          explanation: 'Common GC interview questions cover fundamentals like GC roots, generational hypothesis, collector selection, and tuning. Key topics: What are GC roots? Why generational GC? Difference between Minor and Major GC? How to choose a collector? Can we force GC? What causes Full GC? How to detect memory leaks?',
          codeExample: `// Q1: What are GC roots?
static Object staticRoot = new Object();  // Root

void method() {
    Object localRoot = new Object();  // Root while running
}

// Q2: Why generational GC?
// Most objects die young (80-98%)
// Efficient to collect young gen separately

// Q3: Minor vs Major GC?
// Minor: Young Gen, fast, frequent
// Major: Old Gen, slower
// Full: Entire heap, slowest

// Q4: How to choose GC?
// Throughput → Parallel GC
// Balanced → G1 GC
// Low latency → ZGC

// Q5: Can we force GC?
System.gc();  // Hint, not guaranteed

// Q6: What causes Full GC?
// Old Gen full, System.gc(), Metaspace full`
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
      { name: 'Projects', icon: '💼', page: 'Projects' },
      { name: 'Garbage Collection Internals', icon: '🗑️', page: 'GarbageCollectionInternals' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()  // Go back to Projects page
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)  // Close modal, stay on GC page
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
    background: 'linear-gradient(135deg, #0f172a 0%, #7f1d1d 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #f87171, #ef4444)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '0.5rem',
    color: '#f87171',
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
        <h1 style={titleStyle}>🗑️ Garbage Collection Internals</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={GC_COLORS}
        />
      </div>

      {/* Overview Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          <h2 style={{ color: '#f87171', marginBottom: '1rem' }}>JVM Heap Overview</h2>
          <HeapLayoutDiagram />
          <p style={{ color: '#94a3b8', lineHeight: '1.8', marginTop: '1rem' }}>
            The JVM heap is divided into Young and Old generations. New objects are allocated in Eden space.
            When Eden fills, Minor GC moves surviving objects to Survivor spaces. Objects that survive multiple
            Minor GCs are promoted to Old Generation. This generational approach is based on the observation
            that most objects die young.
          </p>
        </div>
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
              onMainMenu={breadcrumb?.onMainMenu}
              colors={GC_COLORS}
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

export default GarbageCollectionInternals

/**
 * JVM Memory Model
 * Deep dive into JVM memory areas: heap, stack, metaspace, and memory visibility
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const JVMMEMORY_COLORS = {
  primary: '#3b82f6',           // Blue theme
  primaryHover: '#60a5fa',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
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

const JVMMemoryOverviewDiagram = () => (
  <svg viewBox="0 0 800 400" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      JVM Memory Layout
    </text>

    {/* Main JVM Container */}
    <rect x="50" y="50" width="700" height="330" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">JVM</text>

    {/* Heap Section */}
    <rect x="70" y="90" width="660" height="100" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="110" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">HEAP (Shared by all threads)</text>

    {/* Young Gen */}
    <rect x="90" y="120" width="200" height="60" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="190" y="140" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Young Generation</text>
    <text x="190" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">(Eden + S0/S1)</text>

    {/* Old Gen */}
    <rect x="310" y="120" width="400" height="60" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="510" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Old Generation (Tenured)</text>

    {/* Metaspace Section */}
    <rect x="70" y="205" width="660" height="60" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="225" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">METASPACE (Native Memory)</text>
    <text x="400" y="245" textAnchor="middle" fill="#94a3b8" fontSize="10">Class metadata, method data, constants</text>

    {/* Thread Stacks Section */}
    <text x="400" y="285" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">Per-Thread Areas</text>

    {/* Thread 1 */}
    <rect x="120" y="295" width="140" height="70" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="190" y="315" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">Thread 1</text>
    <text x="190" y="330" textAnchor="middle" fill="#94a3b8" fontSize="9">Stack</text>
    <text x="190" y="345" textAnchor="middle" fill="#94a3b8" fontSize="9">PC Register</text>

    {/* Thread 2 */}
    <rect x="330" y="295" width="140" height="70" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="400" y="315" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">Thread 2</text>
    <text x="400" y="330" textAnchor="middle" fill="#94a3b8" fontSize="9">Stack</text>
    <text x="400" y="345" textAnchor="middle" fill="#94a3b8" fontSize="9">PC Register</text>

    {/* Thread N */}
    <rect x="540" y="295" width="140" height="70" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="610" y="315" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">Thread N</text>
    <text x="610" y="330" textAnchor="middle" fill="#94a3b8" fontSize="9">Stack</text>
    <text x="610" y="345" textAnchor="middle" fill="#94a3b8" fontSize="9">PC Register</text>
  </svg>
)

const HeapStructureDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-heap" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Heap Memory Structure & Object Lifecycle
    </text>

    {/* Young Generation */}
    <rect x="50" y="60" width="300" height="180" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="200" y="85" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">Young Generation</text>

    {/* Eden */}
    <rect x="70" y="100" width="180" height="60" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="160" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Eden Space</text>
    <text x="160" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">New objects</text>

    {/* S0 */}
    <rect x="70" y="170" width="80" height="60" rx="4" fill="rgba(34, 197, 94, 0.25)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="110" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">S0</text>
    <text x="110" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9">Survivor 0</text>

    {/* S1 */}
    <rect x="170" y="170" width="80" height="60" rx="4" fill="rgba(34, 197, 94, 0.25)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="210" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">S1</text>
    <text x="210" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9">Survivor 1</text>

    {/* Old Generation */}
    <rect x="400" y="60" width="350" height="180" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="575" y="85" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">Old Generation (Tenured)</text>
    <text x="575" y="140" textAnchor="middle" fill="white" fontSize="11">Long-lived objects</text>
    <text x="575" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Promoted after N survivals</text>
    <text x="575" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">or large objects</text>

    {/* Flow arrows */}
    <line x1="260" y1="130" x2="390" y2="130" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-heap)"/>
    <text x="325" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Minor GC</text>
    <text x="325" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">promotes</text>

    {/* Labels */}
    <text x="200" y="265" textAnchor="middle" fill="#94a3b8" fontSize="10">Fast, frequent GC</text>
    <text x="575" y="265" textAnchor="middle" fill="#94a3b8" fontSize="10">Slow, less frequent GC</text>
  </svg>
)

const StackFrameDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Stack Frame Structure
    </text>

    {/* Stack Frame Container */}
    <rect x="250" y="50" width="300" height="230" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">Stack Frame for calculate(int a, int b)</text>

    {/* Frame Data */}
    <rect x="270" y="90" width="260" height="50" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="400" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Frame Data</text>
    <text x="400" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">return address, exception handlers</text>

    {/* Local Variables */}
    <rect x="270" y="150" width="260" height="70" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="400" y="170" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Local Variables Array</text>
    <text x="400" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">[0] this (if instance)</text>
    <text x="400" y="200" textAnchor="middle" fill="#94a3b8" fontSize="9">[1] a, [2] b, [3] result</text>

    {/* Operand Stack */}
    <rect x="270" y="230" width="260" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="400" y="250" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Operand Stack</text>

    {/* Side note */}
    <text x="100" y="140" textAnchor="start" fill="#94a3b8" fontSize="10">LIFO structure</text>
    <text x="100" y="160" textAnchor="start" fill="#94a3b8" fontSize="10">Per-thread</text>
    <text x="100" y="180" textAnchor="start" fill="#94a3b8" fontSize="10">No GC needed</text>
  </svg>
)

const MetaspaceDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Metaspace vs PermGen (Java 8+)
    </text>

    {/* PermGen (Old) */}
    <rect x="50" y="60" width="300" height="180" rx="8" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="85" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">PermGen (Before Java 8)</text>
    <text x="200" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">Fixed size in heap</text>
    <text x="200" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">Frequent OOM errors</text>
    <text x="200" y="160" textAnchor="middle" fill="#94a3b8" fontSize="10">-XX:PermSize</text>
    <text x="200" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">-XX:MaxPermSize</text>
    <text x="200" y="220" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">❌ Deprecated</text>

    {/* Metaspace (New) */}
    <rect x="450" y="60" width="300" height="180" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="85" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">Metaspace (Java 8+)</text>
    <text x="600" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">Native memory</text>
    <text x="600" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">Auto-grows</text>
    <text x="600" y="160" textAnchor="middle" fill="#94a3b8" fontSize="10">-XX:MetaspaceSize</text>
    <text x="600" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">-XX:MaxMetaspaceSize</text>
    <text x="600" y="220" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">✓ Current</text>

    {/* Arrow */}
    <polygon points="360,150 430,150 430,140 450,155 430,170 430,160 360,160" fill="#94a3b8"/>
    <text x="405" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Migration</text>
  </svg>
)

const MemoryVisibilityDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-visibility" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Java Memory Model - Thread Visibility
    </text>

    {/* Main Memory */}
    <rect x="300" y="50" width="200" height="60" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">Main Memory</text>
    <text x="400" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">stop = false</text>

    {/* Thread 1 */}
    <rect x="50" y="180" width="200" height="120" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="150" y="205" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Thread 1</text>
    <rect x="70" y="220" width="160" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="150" y="235" textAnchor="middle" fill="#94a3b8" fontSize="10">CPU Cache</text>
    <text x="150" y="250" textAnchor="middle" fill="#94a3b8" fontSize="9">stop = false (cached)</text>
    <text x="150" y="285" textAnchor="middle" fill="#94a3b8" fontSize="9">while (!stop) {'{'}</text>

    {/* Thread 2 */}
    <rect x="550" y="180" width="200" height="120" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="650" y="205" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Thread 2</text>
    <rect x="570" y="220" width="160" height="40" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="650" y="235" textAnchor="middle" fill="#94a3b8" fontSize="10">CPU Cache</text>
    <text x="650" y="250" textAnchor="middle" fill="#94a3b8" fontSize="9">stop = true (writes)</text>
    <text x="650" y="285" textAnchor="middle" fill="#94a3b8" fontSize="9">stop = true;</text>

    {/* Arrows */}
    <line x1="150" y1="170" x2="350" y2="120" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-visibility)"/>
    <text x="230" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">may not see update!</text>

    <line x1="650" y1="170" x2="450" y2="120" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-visibility)"/>
    <text x="570" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">writes to main</text>
  </svg>
)

const ObjectLayoutDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Object Memory Layout (64-bit JVM with Compressed Oops)
    </text>

    {/* Object Layout */}
    <rect x="150" y="60" width="500" height="260" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>

    {/* Mark Word */}
    <rect x="170" y="80" width="460" height="50" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="400" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Mark Word (8 bytes)</text>
    <text x="400" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">hash code, GC age, lock state, biased lock info</text>

    {/* Class Pointer */}
    <rect x="170" y="140" width="460" height="40" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="400" y="165" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Class Pointer (4 bytes compressed)</text>

    {/* Instance Fields */}
    <rect x="170" y="190" width="460" height="80" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="400" y="215" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Instance Fields</text>
    <text x="400" y="235" textAnchor="middle" fill="#94a3b8" fontSize="10">int x = 4 bytes</text>
    <text x="400" y="250" textAnchor="middle" fill="#94a3b8" fontSize="10">long y = 8 bytes</text>

    {/* Padding */}
    <rect x="170" y="280" width="460" height="30" rx="4" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="1.5"/>
    <text x="400" y="300" textAnchor="middle" fill="#94a3b8" fontSize="11">Padding (align to 8-byte boundary)</text>

    {/* Size note */}
    <text x="680" y="200" textAnchor="start" fill="#94a3b8" fontSize="10">Empty object:</text>
    <text x="680" y="220" textAnchor="start" fill="#94a3b8" fontSize="10">16 bytes min</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function JVMMemoryModel({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'jvm-memory-areas',
      name: 'JVM Memory Areas',
      icon: '⚡',
      color: '#3b82f6',
      description: 'Runtime data areas including heap, stack, metaspace, and per-thread regions.',
      diagram: JVMMemoryOverviewDiagram,
      details: [
        {
          name: 'Overview',
          diagram: JVMMemoryOverviewDiagram,
          explanation: 'JVM memory is divided into several runtime data areas. Thread-shared areas include the Heap (for objects and arrays), Metaspace (for class metadata, replaced PermGen), and Code Cache (for JIT compiled code). Per-thread areas include the Stack (for method frames and local variables), PC Register (current instruction pointer), and Native Method Stack (for native method calls). The heap is GC managed, the stack grows and shrinks with method calls, and Metaspace uses native memory outside the heap.',
          codeExample: `// JVM memory areas configuration:
// java -Xms512m -Xmx2g -XX:MetaspaceSize=128m MyApp

// Memory layout visualization:
//
// ┌─────────────────────────────────────────────┐
// │                    JVM                       │
// ├─────────────────────────────────────────────┤
// │  Heap (shared by all threads)               │
// │  ┌───────────────┬───────────────────────┐  │
// │  │  Young Gen    │     Old Generation    │  │
// │  │ (Eden + S0/S1)│                       │  │
// │  └───────────────┴───────────────────────┘  │
// ├─────────────────────────────────────────────┤
// │  Metaspace (native memory)                  │
// │  ┌─────────────────────────────────────────┐│
// │  │ Class metadata, method data, constants  ││
// │  └─────────────────────────────────────────┘│
// ├─────────────────────────────────────────────┤
// │  Thread 1    │  Thread 2    │  Thread N    │
// │  ┌────────┐  │  ┌────────┐  │  ┌────────┐  │
// │  │ Stack  │  │  │ Stack  │  │  │ Stack  │  │
// │  │ PC Reg │  │  │ PC Reg │  │  │ PC Reg │  │
// │  └────────┘  │  └────────┘  │  └────────┘  │
// └─────────────────────────────────────────────┘`
        },
        {
          name: 'Memory Flags',
          explanation: 'JVM provides comprehensive flags to configure memory areas. Use -Xms for initial heap, -Xmx for max heap, -Xmn for young generation size, -Xss for thread stack size. The NewRatio controls old/young ratio, SurvivorRatio controls eden/survivor ratio. For metaspace, use -XX:MetaspaceSize for initial size and -XX:MaxMetaspaceSize for maximum.',
          codeExample: `// Heap configuration
-Xms512m              // Initial heap size
-Xmx2g                // Maximum heap size
-Xmn256m              // Young generation size
-XX:NewRatio=2        // Old:Young = 2:1
-XX:SurvivorRatio=8   // Eden:Survivor = 8:1

// Stack configuration
-Xss512k              // Stack size per thread
-Xss1m                // Larger stack (default varies)

// Metaspace configuration
-XX:MetaspaceSize=128m     // Initial metaspace
-XX:MaxMetaspaceSize=512m  // Max metaspace

// Example startup
java -Xms1g -Xmx4g -Xmn512m -Xss1m \\
     -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m \\
     MyApplication`
        },
        {
          name: 'Monitoring Tools',
          explanation: 'Monitor JVM memory using jstat, jcmd, jmap, and jconsole. The jstat -gc command shows GC statistics including capacity and usage for each generation. Use jmap -heap for detailed heap configuration, jcmd for class stats, and jconsole/VisualVM for real-time monitoring.',
          codeExample: `// jstat - Monitor GC stats
jstat -gc <pid> 1000        // Every 1 second
// Columns: S0C, S1C, EC, OC (capacities)
//          S0U, S1U, EU, OU (used)

// jmap - Heap dump and info
jmap -heap <pid>            // Heap configuration
jmap -dump:live,file=heap.bin <pid>  // Heap dump

// jcmd - Diagnostic commands
jcmd <pid> GC.class_stats   // Class metadata stats
jcmd <pid> VM.native_memory summary  // Native memory

// Runtime API
Runtime rt = Runtime.getRuntime();
System.out.println("Max: " + rt.maxMemory() / 1024 / 1024 + " MB");
System.out.println("Total: " + rt.totalMemory() / 1024 / 1024 + " MB");
System.out.println("Free: " + rt.freeMemory() / 1024 / 1024 + " MB");
System.out.println("Used: " +
    (rt.totalMemory() - rt.freeMemory()) / 1024 / 1024 + " MB");`
        }
      ]
    },
    {
      id: 'heap-structure',
      name: 'Heap Structure',
      icon: '💾',
      color: '#22c55e',
      description: 'Generational heap with Young (Eden + Survivors) and Old regions for efficient garbage collection.',
      diagram: HeapStructureDiagram,
      details: [
        {
          name: 'Generations',
          diagram: HeapStructureDiagram,
          explanation: 'The heap is divided into generations based on the weak generational hypothesis - most objects die young. The Young Generation contains Eden Space (where new objects are allocated) and two Survivor Spaces (S0 and S1) for objects that survived minor GC. Objects are promoted to the Old Generation (Tenured) after surviving multiple GC cycles. This design makes Minor GC fast (only Young Gen) while Major/Full GC is slower but less frequent.',
          codeExample: `// Object allocation lifecycle:
// 1. New object → Eden Space
Object obj = new Object();

// 2. Eden fills → Minor GC
//    - Live objects → Survivor Space (S0 or S1)
//    - Dead objects → collected

// 3. Survivors age with each Minor GC
//    - Toggle between S0 and S1
//    - Age counter increments

// 4. After N survivals (default 15) → Old Generation
//    -XX:MaxTenuringThreshold=15

// Large objects may go directly to Old Gen
byte[] large = new byte[10 * 1024 * 1024];  // 10MB
// -XX:PretenureSizeThreshold=1m

// Generation sizes affect GC frequency
// -XX:NewRatio=2     Old:Young = 2:1
// -XX:SurvivorRatio=8   Eden:Survivor = 8:1
//
// If heap is 3GB and NewRatio=2:
// Young: 1GB, Old: 2GB
// If SurvivorRatio=8:
// Eden: 800MB, S0: 100MB, S1: 100MB`
        },
        {
          name: 'GC Types',
          explanation: 'Different garbage collectors optimize for different scenarios. Minor GC collects only Young Generation and is very fast. Major GC collects Old Generation. Full GC collects both Young and Old, causing longer pause times. Serial GC uses single thread, Parallel GC uses multiple threads, CMS aims for low pause times, G1GC divides heap into regions, and ZGC/Shenandoah target sub-millisecond pauses.',
          codeExample: `// Garbage Collector selection
// Serial GC (single thread, small apps)
-XX:+UseSerialGC

// Parallel GC (throughput, multi-core)
-XX:+UseParallelGC
-XX:ParallelGCThreads=4

// CMS - Concurrent Mark Sweep (low pause, deprecated)
-XX:+UseConcMarkSweepGC

// G1GC - Garbage First (default Java 9+)
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200
-XX:G1HeapRegionSize=4m

// ZGC - Scalable low-latency (Java 11+)
-XX:+UseZGC
-XX:ZAllocationSpikeTolerance=2

// Shenandoah (Java 12+)
-XX:+UseShenandoahGC

// GC logging
-Xlog:gc*:file=gc.log:time,uptime,level,tags

// Trigger explicit GC (avoid in production!)
System.gc();  // Only a hint, may be ignored`
        },
        {
          name: 'Allocation Strategies',
          explanation: 'JVM uses various allocation strategies for efficiency. TLAB (Thread Local Allocation Buffer) allows lock-free allocation in Eden. Large objects may skip Young Gen entirely. Escape analysis can allocate on stack if object does not escape method. String pool deduplication saves memory. Use allocation profilers to identify hotspots.',
          codeExample: `// TLAB - Thread Local Allocation Buffer
// Each thread gets a buffer in Eden for fast, lock-free allocation
-XX:+UseTLAB           // Enabled by default
-XX:TLABSize=1m        // TLAB size

// Large object allocation
// Objects larger than threshold → directly to Old Gen
-XX:PretenureSizeThreshold=1m

// Example: different allocation paths
class AllocationDemo {
    public void demo() {
        // Small object → Eden (via TLAB)
        String s = new String("hello");

        // Large object → Old Gen directly
        byte[] large = new byte[5 * 1024 * 1024];  // 5MB

        // Array allocation
        int[] arr = new int[1000];  // Eden

        // Primitive in stack (not heap!)
        int x = 10;  // Stack local variable
    }
}

// Escape Analysis optimization
// If object doesn't escape method → stack allocation
-XX:+DoEscapeAnalysis
public int noEscape() {
    Point p = new Point(1, 2);  // May be stack-allocated
    return p.x + p.y;           // p doesn't escape
}

// String deduplication (G1GC)
-XX:+UseStringDeduplication
-XX:StringDeduplicationAgeThreshold=3`
        }
      ]
    },
    {
      id: 'stack-memory',
      name: 'Stack Memory',
      icon: '📚',
      color: '#8b5cf6',
      description: 'Per-thread LIFO structure holding method frames, local variables, and operand stack.',
      diagram: StackFrameDiagram,
      details: [
        {
          name: 'Stack Frame',
          diagram: StackFrameDiagram,
          explanation: 'Each thread has its own stack organized as a LIFO structure. When a method is called, a new stack frame is pushed containing: Local Variables Array (method parameters and local variables), Operand Stack (workspace for computations), and Frame Data (return address, exception handlers). The stack has a fixed size per thread configured with -Xss. Stack frames are automatically cleaned up on method return, so no garbage collection is needed.',
          codeExample: `// Stack frame example
public class StackDemo {
    public int calculate(int a, int b) {
        int result = a + b;   // Local variable
        return result;
    }

    // Stack frame for calculate():
    // ┌─────────────────────────────┐
    // │ Frame Data                  │
    // │ - return address            │
    // │ - exception table ref       │
    // ├─────────────────────────────┤
    // │ Local Variables Array       │
    // │ [0] this                    │
    // │ [1] a (parameter)           │
    // │ [2] b (parameter)           │
    // │ [3] result (local var)      │
    // ├─────────────────────────────┤
    // │ Operand Stack               │
    // │ - intermediate values       │
    // │ - computation workspace     │
    // └─────────────────────────────┘
}

// Stack operations during execution:
// 1. iload_1        // Load 'a' onto operand stack
// 2. iload_2        // Load 'b' onto operand stack
// 3. iadd           // Add top two values
// 4. istore_3       // Store result in local var 3
// 5. iload_3        // Load result onto stack
// 6. ireturn        // Return top of stack`
        },
        {
          name: 'Stack Configuration',
          explanation: 'Stack size affects how deep your call chains can be. Default stack size varies by OS (512KB-1MB typically). Larger stacks allow deeper recursion but consume more memory per thread. With 1000 threads and 1MB stack each, that is 1GB just for stacks. Exceeding stack size causes StackOverflowError. For deep recursion, either increase -Xss or convert to iteration.',
          codeExample: `// Stack size configuration
// -Xss<size>   Set thread stack size

// Examples:
java -Xss512k MyApp    // 512KB per thread
java -Xss1m MyApp      // 1MB per thread (common default)
java -Xss2m MyApp      // 2MB per thread

// Memory calculation:
// 1000 threads × 1MB stack = 1GB memory!

// StackOverflowError example
public class StackOverflow {
    public void infinite() {
        infinite();  // Recursive call
    }

    public static void main(String[] args) {
        new StackOverflow().infinite();
        // Exception in thread "main"
        // java.lang.StackOverflowError
    }
}

// Fibonacci - stack depth problem
public int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);  // Deep recursion
}
// fib(50) may cause StackOverflowError

// Solution: iterative approach
public int fibIterative(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;  // No stack depth issue
}`
        },
        {
          name: 'Stack vs Heap',
          explanation: 'Understanding when data goes on the stack vs heap is crucial. Primitive local variables and object references live on the stack, but the objects themselves live on the heap. Stack memory is automatically managed (cleaned on method return), thread-safe by default (each thread has its own), and very fast. Heap requires garbage collection, is shared across threads, and slower to allocate. Stack is limited in size while heap can be much larger.',
          codeExample: `// Stack vs Heap allocation
public void method() {
    // STACK:
    int x = 10;              // Primitive → stack
    int y = 20;              // Primitive → stack
    Object ref = null;       // Reference → stack

    // HEAP:
    ref = new Object();      // Object → heap
    //    └── reference on stack
    //        object on heap

    String s = "hello";      // Reference on stack
    //                       // Object in heap (String pool)

    int[] arr = new int[10]; // Reference on stack
    //                       // Array on heap
}

// Example with method calls:
public void caller() {
    int a = 5;               // Stack frame 1
    helper(a);
}

public void helper(int param) {
    int b = param * 2;       // Stack frame 2 (on top)
    // ... when helper returns, frame 2 pops off
}

// Thread safety:
// Stack: Each thread has its own - thread-safe
public void threadSafe() {
    int local = 0;  // Each thread gets own copy
}

// Heap: Shared - needs synchronization
class Shared {
    int counter = 0;  // Shared across threads

    public synchronized void increment() {
        counter++;  // Need synchronization
    }
}`
        }
      ]
    },
    {
      id: 'metaspace',
      name: 'Metaspace',
      icon: '🗄️',
      color: '#f59e0b',
      description: 'Native memory region for class metadata, replacing PermGen from Java 8 onwards.',
      diagram: MetaspaceDiagram,
      details: [
        {
          name: 'Metaspace vs PermGen',
          diagram: MetaspaceDiagram,
          explanation: 'Metaspace replaced PermGen in Java 8. Key differences: Metaspace uses native memory (not heap), auto-grows by default (no fixed max), can be garbage collected when classes are unloaded, and eliminates the dreaded "java.lang.OutOfMemoryError: PermGen space". PermGen had a fixed size in the heap and frequently caused OOM errors in applications with dynamic class loading.',
          codeExample: `// PermGen (before Java 8) - DEPRECATED
-XX:PermSize=128m         // Initial size
-XX:MaxPermSize=256m      // Max size
// Problems:
// - Fixed size in heap
// - Frequent OOM: PermGen space errors
// - Needed tuning for each application

// Metaspace (Java 8+) - CURRENT
-XX:MetaspaceSize=128m       // Initial size
-XX:MaxMetaspaceSize=512m    // Max size (optional)
// Benefits:
// - Native memory (outside heap)
// - Auto-grows (no max by default)
// - Class metadata can be GC'd
// - Rarely needs tuning

// Example: Dynamic class loading
public class DynamicLoading {
    public void loadClasses() throws Exception {
        URLClassLoader loader = new URLClassLoader(
            new URL[]{new URL("file:///path/to/jar")}
        );

        // Each load creates class metadata
        for (int i = 0; i < 10000; i++) {
            Class<?> cls = loader.loadClass("MyClass" + i);
            // Metadata → Metaspace
        }

        // In PermGen: likely OOM
        // In Metaspace: grows as needed
    }
}`
        },
        {
          name: 'Contents & Configuration',
          explanation: 'Metaspace stores class definitions, method metadata, constant pool data, and annotations. Each loaded class consumes metaspace. Applications using lots of dynamic proxies (Spring, Hibernate), bytecode generation, or reflection can consume significant metaspace. Monitor with jstat -gc or jcmd. If you hit metaspace OOM, either you have a class leak or need to increase MaxMetaspaceSize.',
          codeExample: `// What's stored in Metaspace:
public class MyClass {
    // Class structure → Metaspace
    private static final String CONST = "value";
    // Field descriptor → Metaspace
    // Constant reference → Metaspace
    // String literal "value" → Heap (String Pool)

    @Deprecated  // Annotation → Metaspace
    public void method() {
        // Method bytecode → Metaspace
        // Local variables → Stack (at runtime)
    }
}

// Metaspace configuration
-XX:MetaspaceSize=128m           // Initial
-XX:MaxMetaspaceSize=512m        // Max (omit for unlimited)
-XX:MinMetaspaceFreeRatio=40     // Min free % after GC
-XX:MaxMetaspaceFreeRatio=70     // Max free % after GC

// Monitoring Metaspace
// jstat -gc <pid> 1000
// MC: Metaspace Capacity
// MU: Metaspace Used
// CCSC: Compressed Class Space Capacity
// CCSU: Compressed Class Space Used

// Metaspace OOM example
public void causeMetaspaceOOM() {
    for (int i = 0; i < 100000; i++) {
        // Each proxy creates new class → Metaspace
        Runnable proxy = (Runnable) Proxy.newProxyInstance(
            getClass().getClassLoader(),
            new Class[]{Runnable.class},
            (p, m, a) -> null
        );
    }
    // Eventually: OutOfMemoryError: Metaspace
}

// Spring/Hibernate use many proxies
// Each @Transactional, @Cacheable etc. → proxy class`
        },
        {
          name: 'Class Unloading',
          explanation: 'Unlike PermGen, Metaspace supports class unloading through garbage collection. A class can be unloaded when its ClassLoader is no longer referenced and all instances are gone. This is crucial for applications with dynamic class loading, hot deployment, or plugin systems. Use -XX:+TraceClassUnloading to see when classes are unloaded.',
          codeExample: `// Class unloading in Metaspace
// A class can be unloaded when:
// 1. ClassLoader is garbage collected
// 2. No instances of the class exist
// 3. No references to the Class object

// Example: ClassLoader lifecycle
public void demonstrateUnloading() throws Exception {
    // Create custom ClassLoader
    URLClassLoader loader = new URLClassLoader(
        new URL[]{new URL("file:///app.jar")}
    );

    Class<?> cls = loader.loadClass("com.example.MyClass");
    Object instance = cls.newInstance();

    // Class metadata in Metaspace
    // Instance in Heap

    // When we're done:
    instance = null;  // Remove instance reference
    cls = null;       // Remove class reference
    loader.close();   // Close ClassLoader
    loader = null;    // Remove loader reference

    System.gc();  // Suggest GC
    // Class metadata can now be unloaded from Metaspace
}

// Enable class unloading tracing
-XX:+TraceClassLoading
-XX:+TraceClassUnloading

// Real-world example: Application server hot deploy
// 1. Load WAR with ClassLoader A
// 2. Undeploy WAR
// 3. All classes from ClassLoader A can be unloaded
// 4. Deploy new WAR with ClassLoader B
// 5. New classes loaded, old ones gone

// Metaspace reclaimed automatically!`
        }
      ]
    },
    {
      id: 'memory-visibility',
      name: 'Memory Visibility (JMM)',
      icon: '👁️',
      color: '#ec4899',
      description: 'Java Memory Model ensures thread safety through happens-before relationships and visibility guarantees.',
      diagram: MemoryVisibilityDiagram,
      details: [
        {
          name: 'Visibility Problem',
          diagram: MemoryVisibilityDiagram,
          explanation: 'The Java Memory Model (JMM) defines how threads interact through memory. Without proper synchronization, one thread may not see updates made by another thread due to CPU caching. Thread 1 writes x=1 to its cache, but Thread 2 reads x from its cache (still 0). This visibility problem requires explicit synchronization using volatile, synchronized, or other concurrency constructs.',
          codeExample: `// Visibility problem - broken code!
class VisibilityProblem {
    private boolean stop = false;  // NOT volatile

    public void run() {
        // This thread may never see the update!
        while (!stop) {
            // CPU may cache 'stop' value
            // Reads from cache, not main memory
        }
        System.out.println("Stopped");
    }

    public void stop() {
        stop = true;  // Writes to main memory
        // But other thread may not see it!
    }
}

// Why it fails:
// Thread 1 (run):  Reads stop from CPU cache → false
// Thread 2 (stop): Writes stop=true to main memory
// Thread 1:        Still reads false from cache!
//                  Infinite loop!

// Real example:
public static void main(String[] args) throws Exception {
    VisibilityProblem vp = new VisibilityProblem();

    new Thread(() -> vp.run()).start();  // Start worker
    Thread.sleep(1000);                   // Let it run
    vp.stop();                            // Try to stop

    // Worker thread may NEVER stop!
    // It doesn't see the update to 'stop'
}`
        },
        {
          name: 'volatile Keyword',
          explanation: 'The volatile keyword ensures visibility across threads. A volatile write immediately flushes to main memory, and a volatile read always reads from main memory (not cache). This prevents threads from caching stale values. Use volatile for flags, state variables, or any field accessed by multiple threads where you need visibility but not atomicity of compound operations.',
          codeExample: `// Solution 1: volatile keyword
class VolatileFix {
    private volatile boolean stop = false;  // volatile!

    public void run() {
        while (!stop) {
            // Reads from main memory every time
            // Guaranteed to see updates
        }
        System.out.println("Stopped");
    }

    public void stop() {
        stop = true;  // Writes to main memory
        // All threads will see this update
    }
}

// Volatile guarantees:
// 1. Visibility: writes visible to all threads
// 2. Ordering: prevents reordering
// 3. Atomicity: reads/writes are atomic
//    (but NOT compound operations like ++)

// Use cases:
class VolatileUseCases {
    // Status flags
    private volatile boolean initialized = false;

    public void init() {
        doSetup();
        initialized = true;  // Visible to all
    }

    // State variables
    private volatile int state = 0;

    public void setState(int s) {
        state = s;  // Atomic write, visible to all
    }

    // Double-checked locking (needs volatile!)
    private volatile Singleton instance;

    public Singleton getInstance() {
        if (instance == null) {
            synchronized(this) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}

// What volatile does NOT guarantee:
volatile int counter = 0;
counter++;  // NOT atomic! (read-modify-write)
// Use AtomicInteger instead`
        },
        {
          name: 'Happens-Before',
          explanation: 'Happens-before is a JMM concept that establishes ordering and visibility guarantees. If action A happens-before action B, then A\'s results are visible to B. Key relationships: program order (statements in order), monitor lock (unlock before next lock), volatile (write before read), thread start (start() before run()), thread join (run() before join() returns). These rules let you reason about visibility without volatile on every field.',
          codeExample: `// Happens-before relationships
class HappensBefore {
    int a = 0;
    volatile boolean ready = false;

    // Thread 1: Writer
    public void writer() {
        a = 42;           // (1)
        ready = true;     // (2) volatile write
    }

    // Thread 2: Reader
    public void reader() {
        if (ready) {      // (3) volatile read
            System.out.println(a);  // (4)
        }
    }

    // Happens-before chain:
    // (1) happens-before (2) - program order
    // (2) happens-before (3) - volatile write before read
    // (3) happens-before (4) - program order
    // Therefore: (1) happens-before (4)
    // Result: reader sees a=42 (guaranteed!)
}

// Other happens-before examples:

// 1. Monitor lock
synchronized (lock) {
    x = 1;  // (A)
}  // unlock
// ... in another thread:
synchronized (lock) {  // lock
    System.out.println(x);  // (B) sees x=1
}
// unlock happens-before next lock

// 2. Thread start
int x = 0;
x = 1;  // (A)
Thread t = new Thread(() -> {
    System.out.println(x);  // (B) sees x=1
});
t.start();
// (A) happens-before (B) via thread start

// 3. Thread join
Thread t = new Thread(() -> {
    x = 1;  // (A)
});
t.start();
t.join();
System.out.println(x);  // (B) sees x=1
// (A) happens-before (B) via thread join

// 4. Transitivity
// If A happens-before B and B happens-before C,
// then A happens-before C`
        },
        {
          name: 'synchronized & Locks',
          explanation: 'The synchronized keyword provides both mutual exclusion (atomicity) and memory visibility. When exiting a synchronized block, all changes are flushed to main memory. When entering, values are read from main memory. This is stronger than volatile - it also provides atomicity for compound operations. Use synchronized for critical sections, volatile for simple flags.',
          codeExample: `// synchronized provides atomicity + visibility
class SynchronizedExample {
    private int counter = 0;  // NOT volatile

    // Synchronized method
    public synchronized void increment() {
        counter++;  // Atomic: read-modify-write
        // On exit: counter flushed to main memory
    }

    public synchronized int getCounter() {
        // On entry: read from main memory
        return counter;
    }
}

// Synchronized block
class SynchronizedBlock {
    private final Object lock = new Object();
    private int value = 0;

    public void update(int v) {
        synchronized (lock) {
            value = v;  // Atomic + visible
        }  // Flush to main memory
    }

    public int read() {
        synchronized (lock) {
            return value;  // Read from main memory
        }
    }
}

// Lock-free alternative: AtomicInteger
import java.util.concurrent.atomic.AtomicInteger;

class AtomicExample {
    private AtomicInteger counter = new AtomicInteger(0);

    public void increment() {
        counter.incrementAndGet();  // Atomic + visible
    }

    public int get() {
        return counter.get();  // Visible
    }
}

// Performance comparison:
// volatile:     Fast, visibility only
// synchronized: Medium, atomicity + visibility, may block
// AtomicInteger: Fast, lock-free atomicity + visibility

// Choose based on needs:
// - Simple flag: volatile
// - Counter: AtomicInteger
// - Critical section: synchronized
// - Complex operations: ReentrantLock`
        }
      ]
    },
    {
      id: 'object-layout',
      name: 'Object Memory Layout',
      icon: '📦',
      color: '#06b6d4',
      description: 'Understanding object headers, field layout, padding, and memory overhead in the JVM.',
      diagram: ObjectLayoutDiagram,
      details: [
        {
          name: 'Object Header',
          diagram: ObjectLayoutDiagram,
          explanation: 'Every Java object has a memory overhead beyond its fields. The object header consists of Mark Word (8 bytes on 64-bit JVM) containing hash code, GC age, and lock state, plus a Class Pointer (4-8 bytes) pointing to class metadata. Arrays additionally have a 4-byte length field. Objects are aligned to 8-byte boundaries with padding added as needed.',
          codeExample: `// Object memory layout (64-bit JVM)
// ┌────────────────────────────────────┐
// │ Mark Word (8 bytes)                │
// │ - identity hash code (25 bits)    │
// │ - GC age (4 bits)                  │
// │ - lock state (2 bits)              │
// │ - biased lock thread ID            │
// │ - biased lock epoch                │
// ├────────────────────────────────────┤
// │ Class Pointer (4 bytes compressed) │
// │ - Points to class metadata         │
// ├────────────────────────────────────┤
// │ Instance Fields                    │
// │ - Your actual data                 │
// ├────────────────────────────────────┤
// │ Padding (to 8-byte boundary)       │
// └────────────────────────────────────┘

// Object header = 12 bytes (8 + 4 with compressed oops)

// Empty object
class Empty {}
// Size: 12 (header) + 4 (padding) = 16 bytes

// One int field
class OneInt {
    int x;  // 4 bytes
}
// Size: 12 (header) + 4 (field) = 16 bytes (no padding)

// Two ints
class TwoInts {
    int x;  // 4 bytes
    int y;  // 4 bytes
}
// Size: 12 (header) + 8 (fields) = 20
//       + 4 (padding to 24) = 24 bytes

// Long field
class OneLong {
    long x;  // 8 bytes
}
// Size: 12 (header) + 4 (padding for alignment)
//       + 8 (long field) = 24 bytes`
        },
        {
          name: 'Field Packing',
          explanation: 'The JVM optimizes field layout for memory efficiency. Fields are grouped by size (longs/doubles, then ints/floats, then shorts/chars, then bytes/booleans, then references). This minimizes padding. Inheritance adds complexity - superclass fields come first. Understanding field packing helps reduce memory footprint in memory-intensive applications.',
          codeExample: `// Field packing and ordering
class FieldPacking {
    // JVM reorders for optimal packing
    byte b;     // 1 byte
    int i;      // 4 bytes
    short s;    // 2 bytes
    long l;     // 8 bytes
    boolean f;  // 1 byte
}

// JVM internal layout (actual order):
// Header:    12 bytes
// long l:     8 bytes (8-byte aligned)
// int i:      4 bytes
// short s:    2 bytes
// byte b:     1 byte
// boolean f:  1 byte
// Padding:    0 bytes
// Total:      28 bytes (already 4-byte aligned)
// + padding to 32 bytes (8-byte boundary)

// Bad ordering (if JVM didn't optimize):
class BadOrdering {
    byte b1;    // 1 byte + 3 padding
    int i;      // 4 bytes
    byte b2;    // 1 byte + 3 padding
    int j;      // 4 bytes
}
// Would waste space with padding between fields

// Inheritance complicates layout
class Parent {
    int x;  // 4 bytes
}
class Child extends Parent {
    int y;  // 4 bytes
}
// Layout:
// Header:   12 bytes
// Parent.x:  4 bytes
// Child.y:   4 bytes
// Padding:   4 bytes
// Total:    24 bytes

// Array layout
int[] arr = new int[10];
// Header:       12 bytes
// Length:        4 bytes
// Elements:     40 bytes (10 * 4)
// Total:        56 bytes (already aligned)`
        },
        {
          name: 'Memory Optimization',
          explanation: 'Reduce memory footprint through careful design. Use primitives instead of wrappers (int vs Integer saves 12-16 bytes). Prefer arrays over ArrayLists for large collections. Use byte/short for small numbers. Enable compressed oops (-XX:+UseCompressedOops, default up to 32GB heap). Use JOL (Java Object Layout) library to analyze actual object sizes.',
          codeExample: `// Memory optimization techniques

// 1. Primitive vs Wrapper
int primitive = 42;           // 4 bytes on stack
Integer wrapper = 42;         // 16 bytes (12 header + 4 value)
// Wrapper is 4x larger!

Integer[] wrapperArray = new Integer[1000];
// 1000 objects * 16 bytes = 16KB
// + array overhead

int[] primitiveArray = new int[1000];
// 1000 * 4 bytes = 4KB
// + array overhead (16 bytes)
// 4x smaller!

// 2. Small number types
class Optimized {
    byte age;      // 0-127: use byte (1 byte)
    short count;   // 0-32767: use short (2 bytes)
    // vs int (4 bytes each)
}

// 3. Compact data structures
// Bad: ArrayList of wrapper
List<Integer> list = new ArrayList<>();
for (int i = 0; i < 1000; i++) {
    list.add(i);  // 1000 Integer objects
}

// Good: primitive array
int[] arr = new int[1000];
for (int i = 0; i < 1000; i++) {
    arr[i] = i;  // No object overhead
}

// 4. Use JOL to analyze
import org.openjdk.jol.info.ClassLayout;
import org.openjdk.jol.info.GraphLayout;

class MemoryAnalysis {
    public static void main(String[] args) {
        // Analyze single object
        Object obj = new Object();
        System.out.println(ClassLayout.parseInstance(obj).toPrintable());

        // Analyze object graph
        List<String> list = Arrays.asList("a", "b", "c");
        System.out.println(GraphLayout.parseInstance(list).toPrintable());

        // Total size
        System.out.println("Size: " +
            GraphLayout.parseInstance(list).totalSize());
    }
}

// 5. Compressed Oops (default)
-XX:+UseCompressedOops    // Object pointers: 4 bytes
-XX:-UseCompressedOops    // Object pointers: 8 bytes
// Works up to 32GB heap, saves ~20-30% memory`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '❓',
      color: '#ef4444',
      description: 'Common JVM memory interview questions with detailed explanations and answers.',
      details: [
        {
          name: 'Stack vs Heap',
          explanation: 'Stack stores method frames with local variables and references (one per thread, LIFO, automatic cleanup, fast, limited size). Heap stores objects and arrays (shared by all threads, requires GC, slower, much larger, configurable size). Stack overflow happens with deep recursion. OutOfMemoryError happens when heap is full.',
          codeExample: `// Q: Explain Stack vs Heap
// A: Stack is per-thread memory for method execution.
//    Heap is shared memory for objects.

void example() {
    // STACK:
    int x = 10;              // primitive value
    Object ref;              // object reference

    // HEAP:
    ref = new Object();      // actual object
    String s = "hello";      // String object
    int[] arr = new int[10]; // array object
}

// Q: What causes StackOverflowError?
// A: Stack size exceeded, usually deep recursion

void infinite() {
    infinite();  // No base case!
}
// Eventually: StackOverflowError

// Q: What causes OutOfMemoryError: Java heap space?
// A: Heap exhausted, cannot allocate more objects

List<byte[]> list = new ArrayList<>();
while (true) {
    list.add(new byte[1024 * 1024]);  // 1MB each
}
// Eventually: OutOfMemoryError

// Q: Can you allocate objects on stack?
// A: JVM can do escape analysis and stack-allocate
//    objects that don't escape method scope

public int sum() {
    Point p = new Point(1, 2);  // Might be stack-allocated
    return p.x + p.y;           // p doesn't escape
}

-XX:+DoEscapeAnalysis  // Enable optimization`
        },
        {
          name: 'Generations & GC',
          explanation: 'Young Generation (Eden + 2 Survivors) holds new objects. Old Generation holds long-lived objects promoted after surviving N GCs. Why generations? Most objects die young (weak generational hypothesis), so we GC young gen frequently (fast Minor GC) and old gen rarely (slow Major GC). This is much more efficient than GC-ing the entire heap every time.',
          codeExample: `// Q: Why does heap have generations?
// A: Based on weak generational hypothesis:
//    "Most objects die young"
//    Separate GC optimizes for this pattern

// Q: Explain Young Generation structure
// A: Eden + Survivor0 + Survivor1
//    New objects → Eden
//    After Minor GC → Survivor (S0 ↔ S1 toggle)
//    After N survivals → Old Gen

// Configure generations:
-XX:NewRatio=2          // Old:Young = 2:1
-XX:SurvivorRatio=8     // Eden:Survivor = 8:1
-Xmn512m                // Young gen size = 512MB

// Q: What is Minor vs Major vs Full GC?
// A: Minor GC - Young Gen only (fast, frequent)
//    Major GC - Old Gen only (slow, rare)
//    Full GC - All gens (slowest, stop-the-world)

// Q: When does object promote to Old Gen?
// A: 1. Survives MaxTenuringThreshold GCs (default 15)
//    2. Large object (PretenureSizeThreshold)
//    3. Survivor space full

-XX:MaxTenuringThreshold=15
-XX:PretenureSizeThreshold=1m  // > 1MB → Old Gen

// Q: Name some GC algorithms
// A: Serial GC, Parallel GC, CMS, G1GC, ZGC, Shenandoah

-XX:+UseG1GC            // G1 (default Java 9+)
-XX:+UseZGC             // ZGC (low latency)
-XX:+UseParallelGC      // Parallel (throughput)`
        },
        {
          name: 'Metaspace',
          explanation: 'Metaspace (Java 8+) replaced PermGen for storing class metadata in native memory. Unlike PermGen (fixed heap size, frequent OOM), Metaspace auto-grows in native memory and can garbage collect unused classes. Configure with -XX:MetaspaceSize (initial) and -XX:MaxMetaspaceSize (max). Monitor with jstat -gc.',
          codeExample: `// Q: What is Metaspace?
// A: Native memory area for class metadata (Java 8+)
//    Replaced PermGen from earlier versions

// Q: What's stored in Metaspace?
// A: - Class definitions (bytecode)
//    - Method metadata
//    - Constant pool
//    - Annotations
//    - Static variables metadata (values in heap)

public class Example {
    // All metadata → Metaspace
    @Deprecated          // Annotation → Metaspace
    public void method() {
        // Bytecode → Metaspace
    }
}

// Q: How is Metaspace different from PermGen?
// A: PermGen: Heap memory, fixed size, frequent OOM
//    Metaspace: Native memory, auto-grows, rare OOM

// PermGen (before Java 8)
-XX:PermSize=128m
-XX:MaxPermSize=256m
// Problem: Fixed size, frequent OOM

// Metaspace (Java 8+)
-XX:MetaspaceSize=128m       // Initial
-XX:MaxMetaspaceSize=512m    // Max (optional)
// Benefit: Auto-grows, uses native memory

// Q: What causes Metaspace OOM?
// A: Too many classes loaded (dynamic proxies, classloaders)

for (int i = 0; i < 100000; i++) {
    // Each creates new class in Metaspace
    Proxy.newProxyInstance(...);
}
// OutOfMemoryError: Metaspace

// Q: How to monitor Metaspace?
// A: jstat -gc <pid>
//    MC: Metaspace Capacity
//    MU: Metaspace Used`
        },
        {
          name: 'volatile & synchronized',
          explanation: 'volatile ensures visibility (reads/writes go to main memory) but not atomicity for compound operations. synchronized provides both visibility AND atomicity (locks prevent concurrent access). Use volatile for simple flags, synchronized for critical sections, AtomicInteger for counters. Double-checked locking REQUIRES volatile.',
          codeExample: `// Q: What is volatile?
// A: Ensures visibility of variable across threads
//    Prevents CPU caching

// Without volatile - may fail
class Problem {
    boolean stop = false;

    void run() {
        while (!stop) {}  // May never see update!
    }
    void stop() { stop = true; }
}

// With volatile - works
class Fixed {
    volatile boolean stop = false;

    void run() {
        while (!stop) {}  // Guaranteed visibility
    }
    void stop() { stop = true; }
}

// Q: volatile vs synchronized?
// A: volatile: visibility only, no locking
//    synchronized: visibility + atomicity + locking

volatile int counter = 0;
counter++;  // NOT thread-safe! (read-modify-write)

synchronized void increment() {
    counter++;  // Thread-safe with synchronized
}

// Q: When to use which?
// A: volatile - simple flags, state variables
//    synchronized - critical sections, compound ops
//    AtomicInteger - counters without locking

// Q: Why does double-checked locking need volatile?
class Singleton {
    private static volatile Singleton instance;

    public static Singleton getInstance() {
        if (instance == null) {         // First check
            synchronized(Singleton.class) {
                if (instance == null) {  // Second check
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
// Without volatile, instance might be partially constructed!`
        },
        {
          name: 'Object Layout & Size',
          explanation: 'Every object has header overhead (12 bytes with compressed oops on 64-bit JVM) containing mark word and class pointer. Arrays add a 4-byte length field. Objects are aligned to 8 bytes with padding. Empty object is 16 bytes. Understanding layout helps optimize memory usage - prefer primitives over wrappers, arrays over ArrayLists for large collections.',
          codeExample: `// Q: What's in an object header?
// A: Mark Word (8 bytes) + Class Pointer (4 bytes compressed)

// Object layout (64-bit JVM, compressed oops):
// ┌─────────────────────────┐
// │ Mark Word (8 bytes)     │ hash, GC age, locks
// │ Class Pointer (4 bytes) │ → class metadata
// │ Fields                  │ your data
// │ Padding                 │ to 8-byte boundary
// └─────────────────────────┘

// Q: How much memory does an empty object use?
class Empty {}
// A: 16 bytes (12 header + 4 padding)

// Q: What about an object with one int?
class OneInt { int x; }
// A: 16 bytes (12 header + 4 field, no padding needed)

// Q: How does array memory layout differ?
int[] arr = new int[10];
// A: Header (12) + Length (4) + Elements (40) = 56 bytes
// Array adds 4-byte length field

// Q: How to reduce memory usage?
// A: 1. Use primitives not wrappers
int vs Integer         // 4 bytes vs 16 bytes
int[] vs Integer[]     // 4x smaller

// 2. Use byte/short for small numbers
byte age;   // 1 byte vs int (4 bytes)
short count; // 2 bytes vs int (4 bytes)

// 3. Compressed Oops (default up to 32GB heap)
-XX:+UseCompressedOops  // 4-byte pointers
-XX:-UseCompressedOops  // 8-byte pointers

// 4. Analyze with JOL library
import org.openjdk.jol.info.ClassLayout;
System.out.println(
    ClassLayout.parseInstance(obj).toPrintable()
);`
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
      { name: 'JVM Memory Model', icon: '💾', page: 'JVM Memory Model' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
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
        <h1 style={titleStyle}>JVM Memory Model</h1>
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
          ← Back to My Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={JVMMEMORY_COLORS}
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
              colors={JVMMEMORY_COLORS}
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

export default JVMMemoryModel

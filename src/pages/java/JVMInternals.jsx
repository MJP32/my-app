/**
 * JVM Internals - Tab Template Format
 *
 * Comprehensive guide to JVM architecture, memory management, class loading,
 * bytecode, and JIT compilation.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const JVM_COLORS = {
  primary: '#10b981',           // Emerald green
  primaryHover: '#34d399',      // Lighter emerald
  bg: 'rgba(16, 185, 129, 0.1)',
  border: 'rgba(16, 185, 129, 0.3)',
  arrow: '#10b981',
  hoverBg: 'rgba(16, 185, 129, 0.2)',
  topicBg: 'rgba(16, 185, 129, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)' },    // emerald
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const JVMArchitectureDiagram = () => (
  <svg viewBox="0 0 900 400" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="jvm-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
      <linearGradient id="jvmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#059669" stopOpacity="0.1"/>
      </linearGradient>
    </defs>

    {/* Title */}
    <text x="450" y="30" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      JVM Architecture Overview
    </text>

    {/* Java Source Code */}
    <rect x="30" y="60" width="140" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Java Source</text>
    <text x="100" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="9">(.java)</text>

    {/* Compiler */}
    <rect x="220" y="60" width="120" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="280" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">javac</text>
    <text x="280" y="100" textAnchor="middle" fill="#fef3c7" fontSize="9">Compiler</text>

    {/* Bytecode */}
    <rect x="390" y="60" width="140" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="460" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Bytecode</text>
    <text x="460" y="100" textAnchor="middle" fill="#ddd6fe" fontSize="9">(.class)</text>

    {/* Arrows */}
    <line x1="170" y1="85" x2="215" y2="85" stroke="#10b981" strokeWidth="2" markerEnd="url(#jvm-arrow)"/>
    <line x1="340" y1="85" x2="385" y2="85" stroke="#10b981" strokeWidth="2" markerEnd="url(#jvm-arrow)"/>
    <line x1="460" y1="115" x2="460" y2="145" stroke="#10b981" strokeWidth="2" markerEnd="url(#jvm-arrow)"/>

    {/* JVM Box */}
    <rect x="50" y="155" width="800" height="230" rx="12" fill="url(#jvmGrad)" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="450" y="180" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">Java Virtual Machine (JVM)</text>

    {/* Class Loader */}
    <rect x="80" y="200" width="160" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="160" y="225" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Class Loader</text>
    <text x="160" y="245" textAnchor="middle" fill="#bbf7d0" fontSize="9">Subsystem</text>

    {/* Runtime Data Areas */}
    <rect x="280" y="200" width="200" height="60" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="380" y="225" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Runtime Data Areas</text>
    <text x="380" y="245" textAnchor="middle" fill="#cffafe" fontSize="9">Memory Management</text>

    {/* Execution Engine */}
    <rect x="520" y="200" width="160" height="60" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="600" y="225" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Execution Engine</text>
    <text x="600" y="245" textAnchor="middle" fill="#fbcfe8" fontSize="9">JIT + Interpreter</text>

    {/* Native Interface */}
    <rect x="720" y="200" width="110" height="60" rx="8" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="775" y="225" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Native</text>
    <text x="775" y="245" textAnchor="middle" fill="#fed7aa" fontSize="9">Interface</text>

    {/* Memory Areas Detail */}
    <rect x="80" y="290" width="100" height="40" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="130" y="315" textAnchor="middle" fill="#93c5fd" fontSize="9">Heap</text>

    <rect x="190" y="290" width="100" height="40" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="240" y="315" textAnchor="middle" fill="#c4b5fd" fontSize="9">Stack</text>

    <rect x="300" y="290" width="100" height="40" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="350" y="315" textAnchor="middle" fill="#fcd34d" fontSize="9">Method Area</text>

    <rect x="410" y="290" width="100" height="40" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="460" y="315" textAnchor="middle" fill="#f9a8d4" fontSize="9">PC Register</text>

    <rect x="520" y="290" width="120" height="40" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="580" y="315" textAnchor="middle" fill="#67e8f9" fontSize="9">Native Stack</text>

    {/* Execution Engine Detail */}
    <rect x="670" y="290" width="80" height="40" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="710" y="315" textAnchor="middle" fill="#86efac" fontSize="9">Interpreter</text>

    <rect x="760" y="290" width="70" height="40" rx="6" fill="rgba(249, 115, 22, 0.3)" stroke="#f97316" strokeWidth="1"/>
    <text x="795" y="315" textAnchor="middle" fill="#fdba74" fontSize="9">JIT</text>

    {/* Connecting arrows */}
    <line x1="240" y1="230" x2="275" y2="230" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#jvm-arrow)"/>
    <line x1="480" y1="230" x2="515" y2="230" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#jvm-arrow)"/>
    <line x1="680" y1="230" x2="715" y2="230" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#jvm-arrow)"/>
  </svg>
)

const MemoryAreasDiagram = () => (
  <svg viewBox="0 0 900 380" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="mem-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="450" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      JVM Memory Areas
    </text>

    {/* Heap Section */}
    <rect x="30" y="50" width="400" height="180" rx="10" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="230" y="75" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Heap (Shared)</text>

    {/* Young Generation */}
    <rect x="50" y="90" width="170" height="120" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="135" y="110" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Young Generation</text>

    <rect x="60" y="120" width="70" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="95" y="142" textAnchor="middle" fill="white" fontSize="9">Eden</text>

    <rect x="60" y="160" width="30" height="35" rx="4" fill="#86efac" stroke="#4ade80" strokeWidth="1"/>
    <text x="75" y="182" textAnchor="middle" fill="#166534" fontSize="8">S0</text>

    <rect x="100" y="160" width="30" height="35" rx="4" fill="#86efac" stroke="#4ade80" strokeWidth="1"/>
    <text x="115" y="182" textAnchor="middle" fill="#166534" fontSize="8">S1</text>

    {/* Old Generation */}
    <rect x="240" y="90" width="170" height="120" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="325" y="110" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Old Generation</text>
    <rect x="250" y="125" width="150" height="70" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1"/>
    <text x="325" y="165" textAnchor="middle" fill="white" fontSize="10">Tenured Space</text>

    {/* Arrow from Young to Old */}
    <line x1="220" y1="150" x2="235" y2="150" stroke="#10b981" strokeWidth="2" markerEnd="url(#mem-arrow)"/>
    <text x="228" y="140" textAnchor="middle" fill="#94a3b8" fontSize="8">promote</text>

    {/* Stack Section */}
    <rect x="470" y="50" width="200" height="180" rx="10" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="570" y="75" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Stack (Per Thread)</text>

    {/* Stack Frames */}
    <rect x="490" y="90" width="160" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="570" y="110" textAnchor="middle" fill="white" fontSize="10">Frame 3 (Current)</text>

    <rect x="490" y="125" width="160" height="30" rx="4" fill="rgba(139, 92, 246, 0.6)" stroke="#a78bfa" strokeWidth="1"/>
    <text x="570" y="145" textAnchor="middle" fill="white" fontSize="10">Frame 2</text>

    <rect x="490" y="160" width="160" height="30" rx="4" fill="rgba(139, 92, 246, 0.4)" stroke="#a78bfa" strokeWidth="1"/>
    <text x="570" y="180" textAnchor="middle" fill="white" fontSize="10">Frame 1</text>

    <rect x="490" y="195" width="160" height="25" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#a78bfa" strokeWidth="1"/>
    <text x="570" y="212" textAnchor="middle" fill="#c4b5fd" fontSize="9">main()</text>

    {/* Method Area / Metaspace */}
    <rect x="700" y="50" width="180" height="180" rx="10" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="790" y="75" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Metaspace</text>

    <rect x="715" y="95" width="150" height="40" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#22d3ee" strokeWidth="1"/>
    <text x="790" y="120" textAnchor="middle" fill="#67e8f9" fontSize="10">Class Metadata</text>

    <rect x="715" y="145" width="150" height="35" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#22d3ee" strokeWidth="1"/>
    <text x="790" y="167" textAnchor="middle" fill="#67e8f9" fontSize="10">Runtime Constants</text>

    <rect x="715" y="190" width="150" height="30" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#22d3ee" strokeWidth="1"/>
    <text x="790" y="210" textAnchor="middle" fill="#67e8f9" fontSize="10">Method Bytecode</text>

    {/* GC Label */}
    <rect x="30" y="250" width="400" height="100" rx="10" fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" strokeWidth="2"/>
    <text x="230" y="275" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">Garbage Collection</text>
    <text x="230" y="300" textAnchor="middle" fill="#f9a8d4" fontSize="10">Minor GC: Young Gen | Major GC: Old Gen</text>
    <text x="230" y="320" textAnchor="middle" fill="#f9a8d4" fontSize="10">Full GC: Entire Heap + Metaspace</text>
    <text x="230" y="340" textAnchor="middle" fill="#94a3b8" fontSize="9">Algorithms: G1, ZGC, Shenandoah, Parallel, Serial</text>

    {/* String Pool */}
    <rect x="470" y="250" width="200" height="100" rx="10" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="570" y="275" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">String Pool</text>
    <text x="570" y="300" textAnchor="middle" fill="#86efac" fontSize="10">Heap (Java 7+)</text>
    <text x="570" y="320" textAnchor="middle" fill="#94a3b8" fontSize="9">Intern pool for string literals</text>
    <text x="570" y="340" textAnchor="middle" fill="#94a3b8" fontSize="9">String.intern() adds to pool</text>

    {/* Native Memory */}
    <rect x="700" y="250" width="180" height="100" rx="10" fill="rgba(249, 115, 22, 0.1)" stroke="#f97316" strokeWidth="2"/>
    <text x="790" y="275" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Native Memory</text>
    <text x="790" y="300" textAnchor="middle" fill="#fdba74" fontSize="10">Direct Buffers</text>
    <text x="790" y="320" textAnchor="middle" fill="#94a3b8" fontSize="9">JNI allocations</text>
    <text x="790" y="340" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread stacks</text>
  </svg>
)

const ClassLoaderDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="cl-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
      <marker id="cl-arrow-up" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto-start-reverse">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">{`
      ClassLoader Hierarchy & Delegation
    `}</text>

    {/* Bootstrap ClassLoader */}
    <rect x="250" y="50" width="300" height="55" rx="10" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Bootstrap ClassLoader</text>
    <text x="400" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="10">Native C++ | rt.jar, core classes | null</text>

    {/* Platform ClassLoader */}
    <rect x="250" y="130" width="300" height="55" rx="10" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Platform ClassLoader</text>
    <text x="400" y="172" textAnchor="middle" fill="#ddd6fe" fontSize="10">Java 9+ | java.sql, java.xml | ext classes</text>

    {/* Application ClassLoader */}
    <rect x="250" y="210" width="300" height="55" rx="10" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="235" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Application ClassLoader</text>
    <text x="400" y="252" textAnchor="middle" fill="#bbf7d0" fontSize="10">Classpath | Your application classes</text>

    {/* Custom ClassLoader */}
    <rect x="250" y="290" width="300" height="30" rx="8" fill="rgba(249, 115, 22, 0.3)" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4,2"/>
    <text x="400" y="310" textAnchor="middle" fill="#fdba74" fontSize="11">Custom ClassLoaders (optional)</text>

    {/* Delegation arrows (going up) */}
    <line x1="400" y1="130" x2="400" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#cl-arrow-up)"/>
    <line x1="400" y1="210" x2="400" y2="190" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#cl-arrow-up)"/>
    <line x1="400" y1="290" x2="400" y2="270" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#cl-arrow-up)"/>

    {/* Delegation Label */}
    <rect x="30" y="100" width="180" height="130" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="120" y="125" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Parent Delegation</text>
    <text x="120" y="145" textAnchor="middle" fill="#fcd34d" fontSize="9">1. Check if loaded</text>
    <text x="120" y="162" textAnchor="middle" fill="#fcd34d" fontSize="9">2. Delegate to parent</text>
    <text x="120" y="179" textAnchor="middle" fill="#fcd34d" fontSize="9">3. Parent tries to load</text>
    <text x="120" y="196" textAnchor="middle" fill="#fcd34d" fontSize="9">4. If parent fails,</text>
    <text x="120" y="213" textAnchor="middle" fill="#fcd34d" fontSize="9">   child attempts</text>

    {/* Loading Phase */}
    <rect x="590" y="100" width="180" height="130" rx="8" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="1.5"/>
    <text x="680" y="125" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Loading Phases</text>
    <text x="680" y="148" textAnchor="middle" fill="#67e8f9" fontSize="9">Loading: Read .class</text>
    <text x="680" y="168" textAnchor="middle" fill="#67e8f9" fontSize="9">Linking: Verify + Prepare</text>
    <text x="680" y="188" textAnchor="middle" fill="#67e8f9" fontSize="9">Initialization: Static init</text>
    <text x="680" y="210" textAnchor="middle" fill="#94a3b8" fontSize="8">clinit runs once per class</text>
  </svg>
)

const BytecodeDiagram = () => (
  <svg viewBox="0 0 850 300" style={{ width: '100%', maxWidth: '850px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="bc-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="425" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Java Bytecode Execution
    </text>

    {/* Java Code */}
    <rect x="30" y="50" width="180" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Java Source</text>
    <text x="120" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="9" fontFamily="monospace">int add(int a, b) {'{'}</text>
    <text x="120" y="105" textAnchor="middle" fill="#bfdbfe" fontSize="9" fontFamily="monospace">  return a + b;</text>
    <text x="120" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="9" fontFamily="monospace">{'}'}</text>

    {/* Arrow */}
    <line x1="210" y1="90" x2="250" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#bc-arrow)"/>
    <text x="230" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">javac</text>

    {/* Bytecode */}
    <rect x="260" y="50" width="200" height="110" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="360" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Bytecode Instructions</text>
    <text x="360" y="92" textAnchor="middle" fill="#ddd6fe" fontSize="9" fontFamily="monospace">0: iload_0   // load a</text>
    <text x="360" y="108" textAnchor="middle" fill="#ddd6fe" fontSize="9" fontFamily="monospace">1: iload_1   // load b</text>
    <text x="360" y="124" textAnchor="middle" fill="#ddd6fe" fontSize="9" fontFamily="monospace">2: iadd      // add</text>
    <text x="360" y="140" textAnchor="middle" fill="#ddd6fe" fontSize="9" fontFamily="monospace">3: ireturn   // return</text>

    {/* Arrow */}
    <line x1="460" y1="90" x2="500" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#bc-arrow)"/>

    {/* Operand Stack Visualization */}
    <rect x="510" y="50" width="160" height="110" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="590" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Operand Stack</text>
    <rect x="540" y="85" width="100" height="25" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#4ade80"/>
    <text x="590" y="102" textAnchor="middle" fill="#86efac" fontSize="10">a (5)</text>
    <rect x="540" y="115" width="100" height="25" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#4ade80"/>
    <text x="590" y="132" textAnchor="middle" fill="#86efac" fontSize="10">b (3)</text>
    <text x="590" y="152" textAnchor="middle" fill="#4ade80" fontSize="9">iadd: pop 2, push 8</text>

    {/* Arrow to result */}
    <line x1="670" y1="90" x2="710" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#bc-arrow)"/>

    {/* Result */}
    <rect x="720" y="60" width="100" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="770" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Result</text>
    <text x="770" y="105" textAnchor="middle" fill="#fef3c7" fontSize="12" fontFamily="monospace">8</text>

    {/* Instruction categories */}
    <rect x="30" y="180" width="120" height="100" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="90" y="200" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Load/Store</text>
    <text x="90" y="218" textAnchor="middle" fill="#93c5fd" fontSize="9">iload, istore</text>
    <text x="90" y="233" textAnchor="middle" fill="#93c5fd" fontSize="9">aload, astore</text>
    <text x="90" y="248" textAnchor="middle" fill="#93c5fd" fontSize="9">ldc (constants)</text>
    <text x="90" y="263" textAnchor="middle" fill="#93c5fd" fontSize="9">bipush, sipush</text>

    <rect x="170" y="180" width="120" height="100" rx="6" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="1"/>
    <text x="230" y="200" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Arithmetic</text>
    <text x="230" y="218" textAnchor="middle" fill="#86efac" fontSize="9">iadd, isub</text>
    <text x="230" y="233" textAnchor="middle" fill="#86efac" fontSize="9">imul, idiv</text>
    <text x="230" y="248" textAnchor="middle" fill="#86efac" fontSize="9">irem, ineg</text>
    <text x="230" y="263" textAnchor="middle" fill="#86efac" fontSize="9">iinc</text>

    <rect x="310" y="180" width="120" height="100" rx="6" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="370" y="200" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Control</text>
    <text x="370" y="218" textAnchor="middle" fill="#c4b5fd" fontSize="9">if_icmp*</text>
    <text x="370" y="233" textAnchor="middle" fill="#c4b5fd" fontSize="9">goto</text>
    <text x="370" y="248" textAnchor="middle" fill="#c4b5fd" fontSize="9">tableswitch</text>
    <text x="370" y="263" textAnchor="middle" fill="#c4b5fd" fontSize="9">return variants</text>

    <rect x="450" y="180" width="120" height="100" rx="6" fill="rgba(236, 72, 153, 0.15)" stroke="#ec4899" strokeWidth="1"/>
    <text x="510" y="200" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Object</text>
    <text x="510" y="218" textAnchor="middle" fill="#f9a8d4" fontSize="9">new, newarray</text>
    <text x="510" y="233" textAnchor="middle" fill="#f9a8d4" fontSize="9">getfield, putfield</text>
    <text x="510" y="248" textAnchor="middle" fill="#f9a8d4" fontSize="9">invokevirtual</text>
    <text x="510" y="263" textAnchor="middle" fill="#f9a8d4" fontSize="9">checkcast</text>

    <rect x="590" y="180" width="120" height="100" rx="6" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="650" y="200" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Invoke</text>
    <text x="650" y="218" textAnchor="middle" fill="#67e8f9" fontSize="9">invokestatic</text>
    <text x="650" y="233" textAnchor="middle" fill="#67e8f9" fontSize="9">invokespecial</text>
    <text x="650" y="248" textAnchor="middle" fill="#67e8f9" fontSize="9">invokeinterface</text>
    <text x="650" y="263" textAnchor="middle" fill="#67e8f9" fontSize="9">invokedynamic</text>

    <rect x="730" y="180" width="100" height="100" rx="6" fill="rgba(249, 115, 22, 0.15)" stroke="#f97316" strokeWidth="1"/>
    <text x="780" y="200" textAnchor="middle" fill="#fb923c" fontSize="10" fontWeight="bold">Stack</text>
    <text x="780" y="218" textAnchor="middle" fill="#fdba74" fontSize="9">pop, pop2</text>
    <text x="780" y="233" textAnchor="middle" fill="#fdba74" fontSize="9">dup, dup2</text>
    <text x="780" y="248" textAnchor="middle" fill="#fdba74" fontSize="9">swap</text>
  </svg>
)

const JITCompilationDiagram = () => (
  <svg viewBox="0 0 850 320" style={{ width: '100%', maxWidth: '850px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="jit-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="425" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      JIT Compilation Pipeline
    </text>

    {/* Interpretation Phase */}
    <rect x="30" y="55" width="150" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="105" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Interpreter</text>
    <text x="105" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="9">Execute bytecode</text>
    <text x="105" y="115" textAnchor="middle" fill="#bfdbfe" fontSize="9">Collect profiling data</text>

    <line x1="180" y1="90" x2="215" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#jit-arrow)"/>

    {/* Profiler */}
    <rect x="220" y="55" width="130" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="285" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Profiler</text>
    <text x="285" y="100" textAnchor="middle" fill="#fef3c7" fontSize="9">Track hot methods</text>
    <text x="285" y="115" textAnchor="middle" fill="#fef3c7" fontSize="9">Count invocations</text>

    <line x1="350" y1="90" x2="385" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#jit-arrow)"/>
    <text x="367" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">threshold</text>

    {/* C1 Compiler */}
    <rect x="390" y="50" width="140" height="80" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="460" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">C1 Compiler</text>
    <text x="460" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="9">Fast compilation</text>
    <text x="460" y="110" textAnchor="middle" fill="#bbf7d0" fontSize="9">Basic optimizations</text>
    <text x="460" y="125" textAnchor="middle" fill="#86efac" fontSize="8">Level 1-3</text>

    <line x1="530" y1="90" x2="565" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#jit-arrow)"/>
    <text x="547" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">hot</text>

    {/* C2 Compiler */}
    <rect x="570" y="50" width="140" height="80" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="640" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">C2 Compiler</text>
    <text x="640" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="9">Aggressive opts</text>
    <text x="640" y="110" textAnchor="middle" fill="#ddd6fe" fontSize="9">Escape analysis</text>
    <text x="640" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="8">Level 4</text>

    <line x1="710" y1="90" x2="745" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#jit-arrow)"/>

    {/* Native Code */}
    <rect x="750" y="55" width="80" height="70" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="790" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Native</text>
    <text x="790" y="105" textAnchor="middle" fill="#fbcfe8" fontSize="9">Machine code</text>

    {/* Optimizations Section */}
    <rect x="30" y="155" width="260" height="150" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="160" y="180" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">JIT Optimizations</text>

    <text x="50" y="205" fill="#86efac" fontSize="10">Inlining</text>
    <text x="180" y="205" fill="#94a3b8" fontSize="9">Inline small methods</text>

    <text x="50" y="225" fill="#86efac" fontSize="10">Escape Analysis</text>
    <text x="180" y="225" fill="#94a3b8" fontSize="9">Stack allocate if possible</text>

    <text x="50" y="245" fill="#86efac" fontSize="10">Loop Unrolling</text>
    <text x="180" y="245" fill="#94a3b8" fontSize="9">Reduce loop overhead</text>

    <text x="50" y="265" fill="#86efac" fontSize="10">Dead Code</text>
    <text x="180" y="265" fill="#94a3b8" fontSize="9">Remove unused code</text>

    <text x="50" y="285" fill="#86efac" fontSize="10">Vectorization</text>
    <text x="180" y="285" fill="#94a3b8" fontSize="9">SIMD instructions</text>

    {/* Deoptimization */}
    <rect x="310" y="155" width="260" height="150" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="440" y="180" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Deoptimization Triggers</text>

    <text x="330" y="205" fill="#fca5a5" fontSize="10">Uncommon trap</text>
    <text x="450" y="205" fill="#94a3b8" fontSize="9">Rare branch taken</text>

    <text x="330" y="225" fill="#fca5a5" fontSize="10">Class change</text>
    <text x="450" y="225" fill="#94a3b8" fontSize="9">Hierarchy modified</text>

    <text x="330" y="245" fill="#fca5a5" fontSize="10">Exception</text>
    <text x="450" y="245" fill="#94a3b8" fontSize="9">Unexpected throw</text>

    <text x="330" y="265" fill="#fca5a5" fontSize="10">Type speculation</text>
    <text x="450" y="265" fill="#94a3b8" fontSize="9">Wrong type seen</text>

    <text x="330" y="285" fill="#fca5a5" fontSize="10">OSR</text>
    <text x="450" y="285" fill="#94a3b8" fontSize="9">On-stack replacement</text>

    {/* Tiered Compilation Legend */}
    <rect x="590" y="155" width="240" height="150" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="710" y="180" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Tiered Compilation</text>

    <rect x="610" y="195" width="20" height="15" fill="#94a3b8" rx="3"/>
    <text x="640" y="207" fill="#94a3b8" fontSize="9">Level 0: Interpreter</text>

    <rect x="610" y="218" width="20" height="15" fill="#4ade80" rx="3"/>
    <text x="640" y="230" fill="#86efac" fontSize="9">Level 1: C1 simple</text>

    <rect x="610" y="241" width="20" height="15" fill="#22c55e" rx="3"/>
    <text x="640" y="253" fill="#4ade80" fontSize="9">Level 2: C1 limited</text>

    <rect x="610" y="264" width="20" height="15" fill="#059669" rx="3"/>
    <text x="640" y="276" fill="#10b981" fontSize="9">Level 3: C1 full</text>

    <rect x="610" y="287" width="20" height="15" fill="#8b5cf6" rx="3"/>
    <text x="640" y="299" fill="#a78bfa" fontSize="9">Level 4: C2</text>
  </svg>
)

const StringPoolDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="sp-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      String Pool and String Interning
    </text>

    {/* String Pool */}
    <rect x="250" y="50" width="300" height="180" rx="10" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">String Pool (Heap)</text>

    {/* Interned strings */}
    <rect x="280" y="95" width="100" height="30" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="330" y="115" textAnchor="middle" fill="white" fontSize="10">"hello"</text>

    <rect x="400" y="95" width="100" height="30" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="450" y="115" textAnchor="middle" fill="white" fontSize="10">"world"</text>

    <rect x="280" y="135" width="100" height="30" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="330" y="155" textAnchor="middle" fill="white" fontSize="10">"java"</text>

    <rect x="400" y="135" width="100" height="30" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="450" y="155" textAnchor="middle" fill="white" fontSize="10">"JVM"</text>

    {/* Variables pointing to pool */}
    <rect x="30" y="80" width="120" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="90" y="100" textAnchor="middle" fill="white" fontSize="10">s1 = "hello"</text>
    <line x1="150" y1="97" x2="275" y2="110" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#sp-arrow)"/>

    <rect x="30" y="125" width="120" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="90" y="145" textAnchor="middle" fill="white" fontSize="10">s2 = "hello"</text>
    <line x1="150" y1="142" x2="275" y2="115" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#sp-arrow)"/>

    {/* Heap object */}
    <rect x="620" y="80" width="150" height="70" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="695" y="100" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Heap</text>
    <rect x="640" y="110" width="110" height="30" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1"/>
    <text x="695" y="130" textAnchor="middle" fill="white" fontSize="10">"hello" (new)</text>

    <rect x="620" y="165" width="150" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1.5"/>
    <text x="695" y="187" textAnchor="middle" fill="white" fontSize="10">s3 = new String</text>
    <line x1="695" y1="165" x2="695" y2="155" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#sp-arrow)"/>

    {/* Intern annotation */}
    <text x="400" y="195" textAnchor="middle" fill="#94a3b8" fontSize="9">s3.intern() returns pool reference</text>
    <line x1="620" y1="180" x2="510" y2="110" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#sp-arrow)"/>
    <text x="565" y="135" textAnchor="middle" fill="#10b981" fontSize="8">intern()</text>

    {/* Comparison results */}
    <rect x="30" y="200" width="180" height="60" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="120" y="220" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Reference Comparison</text>
    <text x="120" y="240" textAnchor="middle" fill="#93c5fd" fontSize="9">s1 == s2 : true (same pool ref)</text>
    <text x="120" y="255" textAnchor="middle" fill="#fca5a5" fontSize="9">s1 == s3 : false (heap vs pool)</text>
  </svg>
)

const GarbageCollectionDiagram = () => (
  <svg viewBox="0 0 850 350" style={{ width: '100%', maxWidth: '850px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="gc-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="425" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Garbage Collection Process
    </text>

    {/* Young Gen - Before GC */}
    <rect x="30" y="50" width="250" height="130" rx="10" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="155" y="70" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Young Generation (Before)</text>

    {/* Eden objects */}
    <rect x="50" y="85" width="25" height="25" rx="4" fill="#22c55e"/>
    <rect x="80" y="85" width="25" height="25" rx="4" fill="#ef4444"/>
    <rect x="110" y="85" width="25" height="25" rx="4" fill="#22c55e"/>
    <rect x="140" y="85" width="25" height="25" rx="4" fill="#ef4444"/>
    <rect x="170" y="85" width="25" height="25" rx="4" fill="#ef4444"/>
    <rect x="200" y="85" width="25" height="25" rx="4" fill="#22c55e"/>
    <text x="140" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Eden (Live + Dead)</text>

    {/* S0 */}
    <rect x="50" y="145" width="80" height="25" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e"/>
    <text x="90" y="162" textAnchor="middle" fill="#86efac" fontSize="9">S0 (From)</text>

    {/* S1 */}
    <rect x="150" y="145" width="80" height="25" rx="4" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b"/>
    <text x="190" y="162" textAnchor="middle" fill="#94a3b8" fontSize="9">S1 (To)</text>

    {/* Arrow - Minor GC */}
    <line x1="290" y1="115" x2="320" y2="115" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#gc-arrow)"/>
    <text x="305" y="100" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Minor GC</text>

    {/* Young Gen - After GC */}
    <rect x="330" y="50" width="250" height="130" rx="10" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="455" y="70" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Young Generation (After)</text>

    {/* Eden cleared */}
    <rect x="350" y="85" width="200" height="30" rx="4" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b"/>
    <text x="450" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Eden (Cleared)</text>

    {/* S0 cleared */}
    <rect x="350" y="125" width="80" height="25" rx="4" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b"/>
    <text x="390" y="142" textAnchor="middle" fill="#94a3b8" fontSize="9">S0 (Empty)</text>

    {/* S1 has survivors */}
    <rect x="450" y="125" width="80" height="25" rx="4" fill="#22c55e" stroke="#4ade80"/>
    <rect x="460" y="130" width="15" height="15" rx="2" fill="white"/>
    <rect x="480" y="130" width="15" height="15" rx="2" fill="white"/>
    <rect x="500" y="130" width="15" height="15" rx="2" fill="white"/>
    <text x="490" y="162" textAnchor="middle" fill="#86efac" fontSize="9">S1 (Survivors)</text>

    {/* Old Gen */}
    <rect x="610" y="50" width="220" height="130" rx="10" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="720" y="70" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Old Generation</text>

    <rect x="630" y="85" width="30" height="30" rx="4" fill="#f59e0b"/>
    <rect x="670" y="85" width="30" height="30" rx="4" fill="#f59e0b"/>
    <rect x="710" y="85" width="30" height="30" rx="4" fill="#f59e0b"/>
    <rect x="750" y="85" width="30" height="30" rx="4" fill="rgba(245, 158, 11, 0.3)"/>
    <text x="720" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">{`Tenured objects (age >= threshold)`}</text>
    <text x="720" y="158" textAnchor="middle" fill="#fcd34d" fontSize="8">Promotion from survivor space</text>

    {/* Promotion arrow */}
    <path d="M 540 150 Q 570 200 630 100" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#gc-arrow)"/>
    <text x="580" y="185" textAnchor="middle" fill="#f59e0b" fontSize="8">promote</text>

    {/* GC Algorithms */}
    <rect x="30" y="200" width="260" height="130" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="160" y="225" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">GC Algorithms</text>

    <text x="50" y="250" fill="#60a5fa" fontSize="10">Serial GC</text>
    <text x="160" y="250" fill="#94a3b8" fontSize="9">Single thread, STW</text>

    <text x="50" y="270" fill="#60a5fa" fontSize="10">Parallel GC</text>
    <text x="160" y="270" fill="#94a3b8" fontSize="9">Multi-thread, throughput</text>

    <text x="50" y="290" fill="#60a5fa" fontSize="10">G1 GC</text>
    <text x="160" y="290" fill="#94a3b8" fontSize="9">Region-based, balanced</text>

    <text x="50" y="310" fill="#60a5fa" fontSize="10">ZGC/Shenandoah</text>
    <text x="185" y="310" fill="#94a3b8" fontSize="9">{`Low latency (&lt;10ms)`}</text>

    {/* GC Roots */}
    <rect x="310" y="200" width="260" height="130" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="440" y="225" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">GC Roots</text>

    <text x="330" y="250" fill="#a78bfa" fontSize="10">Local variables</text>
    <text x="490" y="250" fill="#94a3b8" fontSize="9">Stack frames</text>

    <text x="330" y="270" fill="#a78bfa" fontSize="10">Static fields</text>
    <text x="490" y="270" fill="#94a3b8" fontSize="9">Class references</text>

    <text x="330" y="290" fill="#a78bfa" fontSize="10">JNI references</text>
    <text x="490" y="290" fill="#94a3b8" fontSize="9">Native code</text>

    <text x="330" y="310" fill="#a78bfa" fontSize="10">Thread objects</text>
    <text x="490" y="310" fill="#94a3b8" fontSize="9">Active threads</text>

    {/* GC Tuning */}
    <rect x="590" y="200" width="240" height="130" rx="8" fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" strokeWidth="1.5"/>
    <text x="710" y="225" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">Key JVM Flags</text>

    <text x="610" y="250" fill="#f9a8d4" fontSize="9">-Xms / -Xmx</text>
    <text x="730" y="250" fill="#94a3b8" fontSize="9">Heap size</text>

    <text x="610" y="270" fill="#f9a8d4" fontSize="9">-XX:+UseG1GC</text>
    <text x="730" y="270" fill="#94a3b8" fontSize="9">Enable G1</text>

    <text x="610" y="290" fill="#f9a8d4" fontSize="9">-XX:MaxGCPauseMillis</text>
    <text x="770" y="290" fill="#94a3b8" fontSize="9">Target pause</text>

    <text x="610" y="310" fill="#f9a8d4" fontSize="9">-XX:+PrintGCDetails</text>
    <text x="770" y="310" fill="#94a3b8" fontSize="9">GC logging</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function JVMInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'jvm-architecture',
      name: 'JVM Architecture',
      icon: '🏗️',
      color: '#10b981',
      description: 'Understanding the Java Virtual Machine components: class loader, runtime data areas, and execution engine.',
      diagram: JVMArchitectureDiagram,
      details: [
        {
          name: 'Overview',
          diagram: JVMArchitectureDiagram,
          explanation: 'The JVM is an abstract computing machine that enables Java\'s "write once, run anywhere" capability. It consists of three main subsystems: the Class Loader Subsystem (loads .class files), Runtime Data Areas (memory management), and the Execution Engine (interpreter + JIT compiler). The JVM specification defines the behavior but not the implementation, allowing different vendors (Oracle, OpenJ9, GraalVM) to optimize differently.',
          codeExample: `// JVM processes bytecode, not source code
// Source: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, JVM!");
    }
}

// Compile to bytecode: javac HelloWorld.java
// Run on JVM: java HelloWorld

// View bytecode with javap:
// javap -c HelloWorld.class
// Output:
// public static void main(java.lang.String[]);
//   Code:
//     0: getstatic     #7  // Field java/lang/System.out
//     3: ldc           #13 // String Hello, JVM!
//     5: invokevirtual #15 // Method PrintStream.println
//     8: return`
        },
        {
          name: 'Class Loader Subsystem',
          diagram: ClassLoaderDiagram,
          explanation: 'The Class Loader Subsystem handles loading, linking, and initialization of classes. It follows the parent delegation model: Application ClassLoader delegates to Platform ClassLoader, which delegates to Bootstrap ClassLoader. This ensures core Java classes are loaded by the Bootstrap loader, preventing malicious code from replacing them. Classes are loaded lazily - only when first referenced.',
          codeExample: `public class ClassLoaderDemo {
    public static void main(String[] args) {
        // Get this class's loader (Application ClassLoader)
        ClassLoader appLoader = ClassLoaderDemo.class.getClassLoader();
        System.out.println("App: " + appLoader);
        // Output: jdk.internal.loader.ClassLoaders$AppClassLoader@...

        // Get parent (Platform ClassLoader in Java 9+)
        ClassLoader platformLoader = appLoader.getParent();
        System.out.println("Platform: " + platformLoader);
        // Output: jdk.internal.loader.ClassLoaders$PlatformClassLoader@...

        // Bootstrap ClassLoader (native, returns null)
        System.out.println("Bootstrap: " + platformLoader.getParent());
        // Output: null

        // Core classes loaded by Bootstrap
        System.out.println("String loader: " + String.class.getClassLoader());
        // Output: null (Bootstrap)

        // Custom class loading
        ClassLoader custom = new ClassLoader(appLoader) {
            @Override
            protected Class<?> findClass(String name) {
                // Custom loading logic
                throw new ClassNotFoundException(name);
            }
        };
    }
}`
        },
        {
          name: 'Execution Engine',
          explanation: 'The Execution Engine executes bytecode using two mechanisms: the Interpreter (executes bytecode line by line, slower but starts immediately) and the JIT Compiler (compiles hot code to native machine code for better performance). HotSpot JVM uses tiered compilation: code starts interpreted, then gets compiled by C1 (fast compilation, basic optimizations) and finally C2 (slow compilation, aggressive optimizations) as it becomes "hot".',
          codeExample: `// JIT compilation happens automatically for "hot" methods
// A method is considered hot after ~10,000 invocations

public class JITDemo {
    // This method will be JIT-compiled after enough calls
    public static long fibonacci(int n) {
        if (n <= 1) return n;
        long prev = 0, curr = 1;
        for (int i = 2; i <= n; i++) {
            long next = prev + curr;
            prev = curr;
            curr = next;
        }
        return curr;
    }

    public static void main(String[] args) {
        // Warm up the JIT compiler
        for (int i = 0; i < 50_000; i++) {
            fibonacci(20);  // Method becomes "hot"
        }

        // Now fibonacci() runs as native code
        long start = System.nanoTime();
        long result = fibonacci(40);
        long end = System.nanoTime();

        System.out.println("Result: " + result);
        System.out.println("Time: " + (end - start) + " ns");
    }
}

// JVM flags to observe JIT:
// -XX:+PrintCompilation    - Show compiled methods
// -XX:+UnlockDiagnosticVMOptions -XX:+PrintAssembly  - Show assembly`
        }
      ]
    },
    {
      id: 'memory-management',
      name: 'Memory Management',
      icon: '💾',
      color: '#3b82f6',
      description: 'JVM memory areas including Heap, Stack, Metaspace, and how objects are allocated and managed.',
      diagram: MemoryAreasDiagram,
      details: [
        {
          name: 'Heap Memory',
          diagram: MemoryAreasDiagram,
          explanation: 'The Heap is shared memory where all objects and arrays are allocated. It\'s divided into Young Generation (Eden + Survivor spaces S0/S1) and Old Generation (Tenured). New objects go to Eden; survivors get promoted to Survivor spaces, then eventually to Old Gen. The heap is managed by the Garbage Collector. Use -Xms (initial) and -Xmx (maximum) to configure heap size.',
          codeExample: `// Object allocation in heap
public class HeapDemo {
    public static void main(String[] args) {
        // Object allocated in Eden space (Young Gen)
        Person person = new Person("John", 30);

        // Arrays also go to heap
        int[] numbers = new int[1000];

        // Large objects may go directly to Old Gen
        // (threshold configured by -XX:PretenureSizeThreshold)
        byte[] largeArray = new byte[10_000_000];

        // Get heap info
        Runtime rt = Runtime.getRuntime();
        System.out.println("Max heap: " + rt.maxMemory() / 1024 / 1024 + " MB");
        System.out.println("Total heap: " + rt.totalMemory() / 1024 / 1024 + " MB");
        System.out.println("Free heap: " + rt.freeMemory() / 1024 / 1024 + " MB");
        System.out.println("Used heap: " +
            (rt.totalMemory() - rt.freeMemory()) / 1024 / 1024 + " MB");
    }
}

// JVM heap configuration:
// -Xms512m         Initial heap size
// -Xmx2g           Maximum heap size
// -Xmn256m         Young generation size
// -XX:SurvivorRatio=8   Eden:Survivor ratio`
        },
        {
          name: 'Stack Memory',
          explanation: 'Each thread has its own Stack memory (not shared). The stack stores method frames containing local variables, operand stack, and frame data. Stack memory is automatically managed - frames are pushed on method call and popped on return. Stack size is configured with -Xss. StackOverflowError occurs when stack depth exceeds limit (usually deep recursion).',
          codeExample: `public class StackDemo {
    // Each method call creates a new stack frame
    public static int factorial(int n) {
        // Local variable 'n' stored in stack frame
        if (n <= 1) return 1;

        // Recursive call pushes new frame onto stack
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        // main() frame at bottom of stack
        int result = factorial(5);
        // Stack during execution:
        // | factorial(1) | <- top (returns 1)
        // | factorial(2) |
        // | factorial(3) |
        // | factorial(4) |
        // | factorial(5) |
        // | main()       | <- bottom

        System.out.println("5! = " + result);

        // This will cause StackOverflowError
        // infiniteRecursion();
    }

    public static void infiniteRecursion() {
        infiniteRecursion();  // StackOverflowError!
    }
}

// Stack frame contents:
// - Local Variable Array (method parameters + local vars)
// - Operand Stack (for bytecode operations)
// - Frame Data (return address, exception handlers)

// JVM flag: -Xss1m  (set stack size to 1MB per thread)`
        },
        {
          name: 'Metaspace',
          explanation: 'Metaspace (replaced PermGen in Java 8) stores class metadata: class structures, method bytecode, constant pools, and annotations. It uses native memory (not heap) and can grow dynamically. Each classloader has its own metaspace chunk that\'s freed when the classloader is garbage collected. Configure with -XX:MetaspaceSize and -XX:MaxMetaspaceSize.',
          codeExample: `// Metaspace stores class metadata
public class MetaspaceDemo {
    public static void main(String[] args) {
        // Class metadata for MetaspaceDemo is in Metaspace:
        // - Class structure (fields, methods)
        // - Method bytecode
        // - Constant pool (strings, numbers)
        // - Runtime annotations

        // Get class metadata
        Class<?> clazz = MetaspaceDemo.class;
        System.out.println("Class name: " + clazz.getName());
        System.out.println("Methods: " + clazz.getDeclaredMethods().length);
        System.out.println("ClassLoader: " + clazz.getClassLoader());

        // Dynamically generated classes use Metaspace
        // (Proxies, lambdas, reflection-generated classes)
        Runnable lambda = () -> System.out.println("Hi");
        System.out.println("Lambda class: " + lambda.getClass());
    }
}

// Metaspace configuration:
// -XX:MetaspaceSize=256m        Initial size (triggers GC)
// -XX:MaxMetaspaceSize=512m     Maximum size (OOM if exceeded)
// -XX:MinMetaspaceFreeRatio=40  Minimum free after GC
// -XX:MaxMetaspaceFreeRatio=70  Maximum free after GC

// Monitor with:
// jcmd <pid> VM.metaspace
// jstat -gcmetacapacity <pid>`
        },
        {
          name: 'Direct Memory',
          explanation: 'Direct Memory is native memory allocated outside the JVM heap using ByteBuffer.allocateDirect(). It\'s used for I/O operations to avoid copying data between heap and native memory. Not managed by GC - must be explicitly released or becomes eligible when ByteBuffer is garbage collected. Configure maximum with -XX:MaxDirectMemorySize.',
          codeExample: `import java.nio.ByteBuffer;

public class DirectMemoryDemo {
    public static void main(String[] args) {
        // Heap buffer - allocated in JVM heap
        ByteBuffer heapBuffer = ByteBuffer.allocate(1024);
        // Data copied: Java heap <-> native I/O buffer

        // Direct buffer - allocated in native memory
        ByteBuffer directBuffer = ByteBuffer.allocateDirect(1024);
        // No copy needed for I/O operations

        // Use direct buffers for:
        // - Large I/O operations
        // - Memory-mapped files
        // - Network I/O (NIO)

        directBuffer.putInt(42);
        directBuffer.flip();
        int value = directBuffer.getInt();
        System.out.println("Value: " + value);

        // Check if direct
        System.out.println("Is direct: " + directBuffer.isDirect());

        // Direct memory is released when buffer is GC'd
        // or can be explicitly cleaned (with reflection/Unsafe)
    }
}

// Configuration:
// -XX:MaxDirectMemorySize=256m

// Direct memory is useful for:
// - File I/O with FileChannel
// - Socket I/O with SocketChannel
// - Memory-mapped files (MappedByteBuffer)
// - Native interop (JNI, Panama)`
        }
      ]
    },
    {
      id: 'string-pool',
      name: 'String Pool & Interning',
      icon: '🔤',
      color: '#22c55e',
      description: 'String literal pool, String interning mechanism, and memory optimization for strings.',
      diagram: StringPoolDiagram,
      details: [
        {
          name: 'String Pool Basics',
          diagram: StringPoolDiagram,
          explanation: 'The String Pool (String Intern Pool) is a special memory area in the heap where Java stores unique string literals. When you create a string literal like "hello", JVM checks if it exists in the pool; if yes, it returns the existing reference. This saves memory by avoiding duplicate strings. Since Java 7, the pool is in the heap (was in PermGen before).',
          codeExample: `public class StringPoolDemo {
    public static void main(String[] args) {
        // String literals go to the pool
        String s1 = "hello";
        String s2 = "hello";

        // Same reference from pool
        System.out.println("s1 == s2: " + (s1 == s2));  // true
        System.out.println("s1.equals(s2): " + s1.equals(s2));  // true

        // new String() creates object in heap, NOT in pool
        String s3 = new String("hello");

        // Different references (pool vs heap)
        System.out.println("s1 == s3: " + (s1 == s3));  // false
        System.out.println("s1.equals(s3): " + s1.equals(s3));  // true

        // Concatenation of literals is resolved at compile time
        String s4 = "hel" + "lo";  // Compiler: "hello"
        System.out.println("s1 == s4: " + (s1 == s4));  // true

        // Runtime concatenation creates new object
        String prefix = "hel";
        String s5 = prefix + "lo";
        System.out.println("s1 == s5: " + (s1 == s5));  // false
    }
}`
        },
        {
          name: 'String.intern()',
          explanation: 'The intern() method returns the canonical representation of a string from the pool. If the string is already in the pool, it returns that reference. If not, it adds the string to the pool and returns the new reference. This is useful for reducing memory when many duplicate strings exist at runtime (e.g., parsing large files).',
          codeExample: `public class StringInternDemo {
    public static void main(String[] args) {
        // Created in heap, not in pool
        String s1 = new String("hello");

        // intern() returns pool reference
        String s2 = s1.intern();

        // s2 points to pool, which is same as literal "hello"
        String s3 = "hello";

        System.out.println("s1 == s2: " + (s1 == s2));  // false (heap vs pool)
        System.out.println("s2 == s3: " + (s2 == s3));  // true (both pool)

        // Practical use: Memory optimization
        // Imagine reading millions of strings from a file
        // where many are duplicates

        Map<String, Integer> wordCount = new HashMap<>();
        String[] words = {"apple", "banana", "apple", "cherry", "banana"};

        for (String word : words) {
            // Without intern: each word is separate heap object
            // With intern: duplicates share pool reference
            String interned = word.intern();
            wordCount.merge(interned, 1, Integer::sum);
        }

        System.out.println(wordCount);
    }
}

// Caution with intern():
// - Pre-Java 7: Pool in PermGen (limited space)
// - Don't intern unbounded unique strings (memory leak)
// - Use for known, repeated strings (enums, constants)`
        },
        {
          name: 'String Memory Tips',
          explanation: 'Understanding String memory helps optimize applications. Use literals when possible (they\'re pooled). Avoid unnecessary new String(). Consider StringBuilder for concatenation in loops. Be cautious with substring() in old Java versions (shared char array). Use intern() judiciously for known repeated strings.',
          codeExample: `public class StringMemoryTips {
    public static void main(String[] args) {
        // BAD: Creates unnecessary heap object
        String bad = new String("literal");

        // GOOD: Uses pool
        String good = "literal";

        // BAD: String concatenation in loop
        String result = "";
        for (int i = 0; i < 1000; i++) {
            result += i;  // Creates new String each iteration!
        }

        // GOOD: Use StringBuilder
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 1000; i++) {
            sb.append(i);
        }
        String result2 = sb.toString();

        // String deduplication (G1 GC, Java 8u20+)
        // JVM automatically deduplicates heap strings
        // -XX:+UseStringDeduplication

        // Compact Strings (Java 9+)
        // Strings use byte[] instead of char[] internally
        // Latin-1 strings use 1 byte per char (50% memory savings)
        String ascii = "hello";  // Uses LATIN1 encoding internally
        String unicode = "héllo";  // Uses UTF16 encoding internally

        // Check memory usage
        // jcmd <pid> GC.class_histogram | grep String
    }
}`
        }
      ]
    },
    {
      id: 'bytecode',
      name: 'Bytecode & Instructions',
      icon: '📝',
      color: '#8b5cf6',
      description: 'Understanding Java bytecode, instruction set, and how the JVM executes compiled code.',
      diagram: BytecodeDiagram,
      details: [
        {
          name: 'Bytecode Basics',
          diagram: BytecodeDiagram,
          explanation: 'Java source code compiles to bytecode - platform-independent instructions stored in .class files. Each instruction is 1 byte (opcode) optionally followed by operands. The JVM is a stack-based machine: instructions pop operands from the stack, perform operations, and push results. Use javap -c to view bytecode.',
          codeExample: `// Java source
public class BytecodeBasics {
    public static int add(int a, int b) {
        return a + b;
    }
}

// Compile: javac BytecodeBasics.java
// View bytecode: javap -c BytecodeBasics

/*
public static int add(int, int);
  Code:
     0: iload_0       // Load int from local var 0 (parameter a)
     1: iload_1       // Load int from local var 1 (parameter b)
     2: iadd          // Pop two ints, add, push result
     3: ireturn       // Return int on top of stack

Stack trace:
  After iload_0:    [a]
  After iload_1:    [a, b]
  After iadd:       [a+b]
  After ireturn:    [] (returned)
*/

// More complex example
public static int calculate(int x) {
    int y = x * 2;
    return y + 1;
}
/*
  Code:
     0: iload_0       // Load x
     1: iconst_2      // Push constant 2
     2: imul          // x * 2
     3: istore_1      // Store in y (local var 1)
     4: iload_1       // Load y
     5: iconst_1      // Push constant 1
     6: iadd          // y + 1
     7: ireturn       // Return result
*/`
        },
        {
          name: 'Common Instructions',
          explanation: 'Bytecode instructions are categorized: Load/Store (move data between stack and local variables), Arithmetic (math operations), Type conversion (i2l, d2i), Object operations (new, getfield), Control flow (if*, goto), and Method invocation (invoke*). The prefix indicates type: i=int, l=long, f=float, d=double, a=reference.',
          codeExample: `// Load/Store instructions
// iload_n  - Load int from local variable n onto stack
// istore_n - Store int from stack into local variable n
// aload_n  - Load reference from local variable n
// ldc      - Load constant from constant pool

// Arithmetic
// iadd, isub, imul, idiv, irem - Integer operations
// fadd, fsub, fmul, fdiv - Float operations
// ineg - Negate integer

// Type conversion
// i2l - int to long
// l2i - long to int
// i2f - int to float

// Object operations
public class ObjectOps {
    int value;

    void example() {
        ObjectOps obj = new ObjectOps();
        obj.value = 42;
        int v = obj.value;
    }
}
/*
  Code:
     0: new           #2  // Create ObjectOps
     3: dup               // Duplicate reference for constructor
     4: invokespecial #3  // Call <init>
     7: astore_1          // Store in local var 1 (obj)
     8: aload_1           // Load obj
     9: bipush        42  // Push 42
    11: putfield      #4  // obj.value = 42
    14: aload_1           // Load obj
    15: getfield      #4  // Get obj.value
    18: istore_2          // Store in local var 2 (v)
*/

// Control flow
// if_icmpeq, if_icmpne, if_icmplt, if_icmpge, etc.
// goto - Unconditional jump
// tableswitch, lookupswitch - Switch statements`
        },
        {
          name: 'Method Invocation',
          explanation: 'There are five invoke instructions: invokevirtual (instance methods with virtual dispatch), invokeinterface (interface methods), invokespecial (constructors, private methods, super calls), invokestatic (static methods), and invokedynamic (lambda expressions, method handles). Each has different dispatch behavior.',
          codeExample: `interface Printable {
    void print();
}

class Document implements Printable {
    public void print() { }
    private void internal() { }
    public static void staticMethod() { }
}

class InvokeDemo {
    void demo() {
        Document doc = new Document();

        // invokevirtual - Virtual method dispatch
        doc.print();  // invokevirtual Document.print()

        // invokeinterface - Interface method call
        Printable p = doc;
        p.print();  // invokeinterface Printable.print()

        // invokestatic - Static method call
        Document.staticMethod();  // invokestatic Document.staticMethod()

        // invokespecial - Constructor
        new Document();  // invokespecial Document.<init>()

        // invokespecial - Super call
        // super.toString();  // invokespecial Object.toString()

        // invokedynamic - Lambda
        Runnable r = () -> System.out.println("Hi");
        // invokedynamic #0:run()Ljava/lang/Runnable;
        // (Bootstrap method links to lambda implementation)
    }
}

/*
Bootstrap methods for invokedynamic:
- LambdaMetafactory.metafactory() - Creates lambda instances
- StringConcatFactory.makeConcatWithConstants() - String concat (Java 9+)
*/`
        },
        {
          name: 'Viewing Bytecode',
          explanation: 'Use javap (Java disassembler) to view bytecode. -c shows code, -v shows verbose info including constant pool, -p shows private members, -l shows line number and local variable tables. IDEs like IntelliJ have bytecode viewers. For runtime, use java agents or tools like ASM, Javassist for bytecode manipulation.',
          codeExample: `// Various javap options

// Basic disassembly
// javap -c MyClass

// Verbose output (includes constant pool)
// javap -v MyClass

// Include private members
// javap -c -p MyClass

// Show line numbers and local variables
// javap -c -l MyClass

/*
Example output for javap -v:

Classfile /path/to/MyClass.class
  Last modified ...; size 456 bytes
  SHA-256 checksum ...
  Compiled from "MyClass.java"
public class MyClass
  minor version: 0
  major version: 65     // Java 21
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER

Constant pool:
   #1 = Methodref    #2.#3      // java/lang/Object."<init>"
   #2 = Class        #4         // java/lang/Object
   ...

{
  public MyClass();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1   // Method Object."<init>"
         4: return
      LineNumberTable:
        line 1: 0
}
*/

// Bytecode manipulation libraries:
// - ASM (low-level, fast)
// - Javassist (high-level, easier)
// - ByteBuddy (modern, fluent API)
// - cglib (proxy generation)`
        }
      ]
    },
    {
      id: 'jit-compilation',
      name: 'JIT Compilation',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Just-In-Time compilation, tiered compilation, and runtime optimizations performed by the JVM.',
      diagram: JITCompilationDiagram,
      details: [
        {
          name: 'JIT Overview',
          diagram: JITCompilationDiagram,
          explanation: 'JIT (Just-In-Time) compilation converts frequently executed bytecode into native machine code at runtime. HotSpot JVM identifies "hot" methods (called many times) and compiles them for better performance. This combines the portability of bytecode with near-native speed. The trade-off is compilation overhead during warmup.',
          codeExample: `public class JITOverview {
    // Method starts interpreted
    public static long compute(int iterations) {
        long sum = 0;
        for (int i = 0; i < iterations; i++) {
            sum += i * i;
        }
        return sum;
    }

    public static void main(String[] args) {
        // Cold start - interpreted execution
        System.out.println("Starting warmup...");

        // After ~10,000 invocations, JIT kicks in
        for (int i = 0; i < 50_000; i++) {
            compute(100);
        }

        System.out.println("Warmup complete - method is now JIT compiled");

        // Now runs as native code
        long start = System.nanoTime();
        long result = compute(1_000_000);
        long time = System.nanoTime() - start;

        System.out.println("Result: " + result);
        System.out.println("Time: " + time / 1_000_000.0 + " ms");
    }
}

// JVM flags to observe JIT:
// -XX:+PrintCompilation  - Show what's being compiled
//    Format: timestamp compile_id tier method_name size deopt
//    Example: 150   1       3     JITOverview::compute (25 bytes)
//
// -XX:+UnlockDiagnosticVMOptions -XX:+PrintInlining
//    Shows method inlining decisions`
        },
        {
          name: 'Tiered Compilation',
          explanation: 'HotSpot uses tiered compilation with 5 levels: Level 0 (Interpreter), Level 1 (C1 simple), Level 2 (C1 limited profiling), Level 3 (C1 full profiling), Level 4 (C2 maximum optimization). Code progresses through tiers as it gets hotter. C1 compiles quickly with basic optimizations; C2 compiles slowly with aggressive optimizations.',
          codeExample: `// Tiered compilation progression:
//
// Level 0: Interpreter
//   - Executes bytecode directly
//   - Collects basic profiling (invocation count)
//
// Level 1: C1 Simple Compilation
//   - Quick compilation
//   - Basic optimizations
//   - No profiling code
//
// Level 2: C1 Limited Profiling
//   - Basic optimizations
//   - Limited profiling instrumentation
//
// Level 3: C1 Full Profiling
//   - Basic optimizations
//   - Full profiling for C2
//   - Branch profiling, type profiling
//
// Level 4: C2 Optimized
//   - Aggressive optimizations
//   - Escape analysis, loop unrolling
//   - Takes longer to compile

// Typical progression:
// Interpreter -> C1 (Level 3) -> C2 (Level 4)
// Or for trivial methods:
// Interpreter -> C1 (Level 1)

// JVM flags:
// -XX:+TieredCompilation        (default on)
// -XX:-TieredCompilation        Disable (use C2 only)
// -XX:TieredStopAtLevel=3       Stop at C1
// -XX:CompileThreshold=10000    Invocations before compilation

// Check compilation status with jcmd:
// jcmd <pid> Compiler.queue`
        },
        {
          name: 'JIT Optimizations',
          explanation: 'The JIT compiler applies many optimizations: Method Inlining (replace call with method body), Escape Analysis (stack allocate non-escaping objects), Dead Code Elimination, Loop Unrolling, Lock Coarsening/Elision, Null Check Elimination, and Devirtualization (convert virtual calls to direct calls when type is known).',
          codeExample: `public class JITOptimizations {

    // 1. INLINING - Small methods are inlined
    public int add(int a, int b) {
        return a + b;
    }

    public int calculate(int x) {
        // add() call will be inlined:
        // return (x + 1) + 2; instead of method call
        return add(add(x, 1), 2);
    }

    // 2. ESCAPE ANALYSIS - Object doesn't escape, can stack allocate
    public int sumPoint() {
        Point p = new Point(3, 4);  // May be stack allocated!
        return p.x + p.y;
        // 'p' doesn't escape this method, no heap allocation needed
    }

    // 3. LOCK ELISION - Remove unnecessary synchronization
    public void lockElision() {
        Object lock = new Object();
        synchronized (lock) {  // Lock doesn't escape
            // JIT may remove this lock entirely
        }
    }

    // 4. DEVIRTUALIZATION - Virtual call to direct call
    public void devirt(List<String> list) {
        // If JIT determines list is always ArrayList:
        list.size();  // Virtual call -> direct ArrayList.size()
    }

    // 5. LOOP UNROLLING
    public int sumArray(int[] arr) {
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        // May become (for length 4):
        // sum = arr[0] + arr[1] + arr[2] + arr[3];
        return sum;
    }
}

class Point { int x, y; Point(int x, int y) { this.x=x; this.y=y; } }`
        },
        {
          name: 'Deoptimization',
          explanation: 'Deoptimization happens when JIT-compiled code assumptions become invalid. The JVM falls back to interpreted execution and may recompile later. Triggers include: uncommon traps (unexpected branch taken), class hierarchy changes (new subclass breaks devirtualization), and speculative optimizations failing. Frequent deopt hurts performance.',
          codeExample: `// Deoptimization scenarios

// 1. Uncommon trap - Rarely taken branch
public int maybeNull(String s) {
    if (s == null) {  // If this is always false during profiling...
        return 0;     // This branch becomes uncommon trap
    }
    return s.length();
}
// If s is suddenly null at runtime -> deopt!

// 2. Class hierarchy change
interface Animal { void speak(); }
class Dog implements Animal { public void speak() { } }

public void callSpeak(Animal a) {
    a.speak();  // JIT may optimize assuming only Dog exists
}
// Loading new class Cat implements Animal -> deopt!

// 3. Type speculation failure
public void process(Object obj) {
    // JIT profiles obj as always String
    String s = (String) obj;  // Optimized for String
}
// Passing Integer -> deopt + ClassCastException

// Monitor deoptimization:
// -XX:+TraceDeoptimization
// -XX:+PrintDeoptimizationDetails

// Deopt info in -XX:+PrintCompilation output:
//   made not entrant  - Method invalidated
//   made zombie       - Method can be garbage collected

// Avoid frequent deopt:
// - Don't change class hierarchies after warmup
// - Consistent types through polymorphic call sites
// - Avoid megamorphic calls (>2 receiver types)`
        }
      ]
    },
    {
      id: 'garbage-collection',
      name: 'Garbage Collection',
      icon: '🗑️',
      color: '#ec4899',
      description: 'Garbage collection algorithms, generational hypothesis, and GC tuning strategies.',
      diagram: GarbageCollectionDiagram,
      details: [
        {
          name: 'GC Fundamentals',
          diagram: GarbageCollectionDiagram,
          explanation: 'Garbage Collection automatically reclaims memory from objects no longer reachable from GC roots (local variables, static fields, JNI references). Java uses the generational hypothesis: most objects die young. The heap is divided into Young Generation (frequent GC) and Old Generation (infrequent GC). Minor GC collects Young Gen; Major/Full GC includes Old Gen.',
          codeExample: `public class GCFundamentals {
    public static void main(String[] args) {
        // Object lifecycle

        // 1. Allocation - Object created in Eden (Young Gen)
        Object obj = new Object();  // In Eden

        // 2. Object is reachable via 'obj' reference
        // GC will NOT collect it

        // 3. Object becomes unreachable
        obj = null;  // No more references
        // Object is now eligible for GC

        // 4. Suggest GC (doesn't guarantee collection)
        System.gc();

        // GC Roots - Starting points for reachability analysis:
        // - Local variables in stack frames
        // - Static variables in loaded classes
        // - JNI references
        // - Active threads
        // - Synchronization monitors

        // Generational collection:
        // - New objects: Eden -> Survivor (if survive) -> Old Gen
        // - Age threshold typically 15 GC cycles
        // - Large objects may go directly to Old Gen
    }

    // Object with finalizer (avoid if possible)
    @Override
    protected void finalize() throws Throwable {
        // Called before GC reclaims object
        // Deprecated since Java 9 - use Cleaner instead
        super.finalize();
    }
}`
        },
        {
          name: 'GC Algorithms',
          explanation: 'Modern JVMs offer several GC algorithms: Serial GC (single-threaded, small heaps), Parallel GC (multi-threaded, throughput-focused), G1 GC (default since Java 9, region-based, balanced), ZGC (ultra-low latency, <1ms pauses), and Shenandoah (concurrent, low latency). Choose based on your latency vs throughput requirements.',
          codeExample: `// GC Algorithm Selection

// Serial GC - Single-threaded, small heaps
// -XX:+UseSerialGC
// Good for: Small heaps (<100MB), single-core machines, client apps

// Parallel GC - Multi-threaded, throughput focus
// -XX:+UseParallelGC
// Good for: Batch processing, backend jobs, throughput over latency

// G1 GC - Balanced, default since Java 9
// -XX:+UseG1GC
// Good for: General purpose, heaps 4GB+, predictable pauses
// -XX:MaxGCPauseMillis=200  (target pause time)

// ZGC - Ultra-low latency
// -XX:+UseZGC
// Good for: Large heaps (TB scale), <1ms pauses required
// Available: Java 11+ (experimental), Java 15+ (production)

// Shenandoah - Concurrent, low latency
// -XX:+UseShenandoahGC
// Good for: Low latency requirements, concurrent collection
// Available: Java 12+ (backported to 8, 11 by some vendors)

// Epsilon GC - No-op garbage collector (testing only)
// -XX:+UseEpsilonGC
// No actual collection - OOM when heap exhausted

// GC Logging (Java 9+):
// -Xlog:gc*:file=gc.log:time,uptime,level,tags
// -Xlog:gc*=debug   (detailed)

// Legacy logging (Java 8):
// -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -Xloggc:gc.log`
        },
        {
          name: 'G1 GC Deep Dive',
          explanation: 'G1 (Garbage First) divides the heap into equal-sized regions (~1-32MB). It tracks liveness per region and collects regions with most garbage first. G1 uses concurrent marking to find live objects. Young GC collects Eden and Survivor regions. Mixed GC collects Young + some Old regions. G1 aims to meet pause time goals (-XX:MaxGCPauseMillis).',
          codeExample: `// G1 GC Concepts and Tuning

// Region types:
// - Eden: New object allocation
// - Survivor: Objects that survived Young GC
// - Old: Long-lived objects
// - Humongous: Objects > 50% region size

// G1 GC Phases:
// 1. Young GC (STW): Collect Eden + Survivors
// 2. Concurrent Marking: Find live objects in Old regions
// 3. Remark (STW): Complete marking
// 4. Cleanup (STW): Reclaim empty regions
// 5. Mixed GC (STW): Collect Young + selected Old regions

// Key G1 tuning parameters:
// -XX:+UseG1GC                 Enable G1
// -XX:MaxGCPauseMillis=200     Target pause time (ms)
// -XX:G1HeapRegionSize=16m     Region size (1-32MB, power of 2)
// -XX:G1NewSizePercent=5       Min young gen as % of heap
// -XX:G1MaxNewSizePercent=60   Max young gen as % of heap
// -XX:G1ReservePercent=10      Reserve for promotions
// -XX:InitiatingHeapOccupancyPercent=45  Trigger marking

// Humongous objects:
// Objects > 50% region size get special handling
// Allocated in contiguous Humongous regions
// Collected during cleanup or Full GC
// Avoid frequent humongous allocations

// G1 GC log analysis:
// [GC pause (G1 Evacuation Pause) (young), 0.0150 secs]
//    [Parallel Time: 12.3 ms, GC Workers: 4]
//    [Eden: 24.0M(24.0M)->0.0B(24.0M) Survivors: 2048.0K->2048.0K Heap: 36.2M(256M)->15.2M(256M)]`
        },
        {
          name: 'GC Tuning Tips',
          explanation: 'Start with defaults and measure. Set heap size (-Xms/-Xmx, typically same value). Choose GC based on requirements: G1 for general, ZGC/Shenandoah for low latency, Parallel for throughput. Monitor GC frequency and pause times. Reduce allocation rate in hot code paths. Watch for promotion failures and full GCs.',
          codeExample: `// GC Tuning Checklist

// 1. SET HEAP SIZE
// -Xms4g -Xmx4g   (Set both equal to avoid resizing)
// Rule of thumb: Heap should be 3-4x live data size

// 2. CHOOSE GC ALGORITHM
// Default (Java 9+): G1
// Low latency: ZGC or Shenandoah
// Max throughput: Parallel GC

// 3. ENABLE GC LOGGING
// -Xlog:gc*:file=gc.log:time,uptime,level,tags

// 4. ANALYZE COMMON ISSUES

// High GC frequency:
// - Increase heap size
// - Reduce allocation rate
// - Check for memory leaks

// Long GC pauses:
// - Switch to G1/ZGC
// - Reduce live object set
// - Tune pause time goal

// Full GC occurring:
// - Increase Old Gen size
// - Check for humongous allocations
// - Tune promotion threshold

// 5. MONITORING TOOLS
// jstat -gcutil <pid> 1000   (GC stats every 1s)
// jcmd <pid> GC.run          (Trigger GC)
// jcmd <pid> GC.heap_info    (Heap info)

// JVM flags for debugging:
// -XX:+HeapDumpOnOutOfMemoryError
// -XX:HeapDumpPath=/tmp/heapdump.hprof
// -XX:OnOutOfMemoryError="kill -9 %p"

// Example production setup:
// java -Xms4g -Xmx4g \\
//      -XX:+UseG1GC \\
//      -XX:MaxGCPauseMillis=200 \\
//      -XX:+HeapDumpOnOutOfMemoryError \\
//      -Xlog:gc*:file=gc.log:time \\
//      -jar myapp.jar`
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
      { name: 'JVM Internals', icon: '🏗️', page: 'JVM Internals' }
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
    background: 'linear-gradient(135deg, #34d399, #10b981)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#34d399',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>JVM Internals</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to Java
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={JVM_COLORS}
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
              maxHeight: '92vh',
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
              colors={JVM_COLORS}
            />

            {/* Modal Header */}
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
                >Prev</button>
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
                >Next</button>
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
                >Close</button>
              </div>
            </div>

            {/* Detail Tabs */}
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

            {/* Selected Detail Content */}
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
                      border: '1px solid #334155',
                      overflowX: 'auto'
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

export default JVMInternals

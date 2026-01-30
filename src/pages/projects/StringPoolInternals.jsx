/**
 * String Pool Internals - Deep dive into Java's String Pool
 *
 * This page explores String Pool mechanics, interning, immutability, and memory optimization.
 * Organized into concepts with detailed tabs for each subtopic.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * Main topic colors - pink theme for String Pool
 */
const STRINGPOOL_COLORS = {
  primary: '#ec4899',           // Pink accent color
  primaryHover: '#f472b6',      // Lighter pink hover
  bg: 'rgba(236, 72, 153, 0.1)', // Background with transparency
  border: 'rgba(236, 72, 153, 0.3)', // Border color
  arrow: '#ec4899',             // Arrow/indicator color
  hoverBg: 'rgba(236, 72, 153, 0.2)', // Hover background
  topicBg: 'rgba(236, 72, 153, 0.2)'  // Topic card background
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
 * Memory Layout Diagram - Overview of String Pool in Heap
 */
const MemoryLayoutDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-pink" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Heap Memory Layout - String Pool vs Regular Heap
    </text>

    {/* String Pool Section */}
    <rect x="50" y="50" width="700" height="90" rx="8" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="60" y="70" fill="#f472b6" fontSize="12" fontWeight="bold">String Pool (special region)</text>

    {/* Pool Strings */}
    <rect x="70" y="85" width="100" height="40" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="1"/>
    <text x="120" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">"hello"</text>

    <rect x="190" y="85" width="100" height="40" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="1"/>
    <text x="240" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">"world"</text>

    <text x="310" y="110" fill="#94a3b8" fontSize="11">...</text>

    {/* Regular Heap Section */}
    <rect x="50" y="160" width="700" height="90" rx="8" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2"/>
    <text x="60" y="180" fill="#94a3b8" fontSize="12" fontWeight="bold">Regular Heap Objects</text>

    {/* Heap Objects */}
    <rect x="70" y="195" width="130" height="40" rx="6" fill="#64748b" stroke="#94a3b8" strokeWidth="1"/>
    <text x="135" y="212" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">new String()</text>
    <text x="135" y="226" textAnchor="middle" fill="#cbd5e1" fontSize="9">"hello"</text>

    <rect x="220" y="195" width="130" height="40" rx="6" fill="#64748b" stroke="#94a3b8" strokeWidth="1"/>
    <text x="285" y="218" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">StringBuilder</text>

    <text x="370" y="218" fill="#94a3b8" fontSize="11">...</text>

    {/* Reference arrows */}
    <line x1="120" y1="145" x2="120" y2="170" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3,3"/>
    <text x="130" y="160" fill="#ec4899" fontSize="9">s1, s2</text>

    <line x1="135" y1="240" x2="135" y2="265" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3"/>
    <text x="145" y="260" fill="#94a3b8" fontSize="9">s3</text>
  </svg>
)

/**
 * String Comparison Diagram
 */
const StringComparisonDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
      <marker id="arrow-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      String Literal vs new String() - Reference Comparison
    </text>

    {/* String Pool */}
    <rect x="150" y="60" width="120" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="210" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">String Pool</text>
    <text x="210" y="96" textAnchor="middle" fill="#fce7f3" fontSize="9">"hello"</text>

    {/* Heap Object */}
    <rect x="530" y="60" width="120" height="50" rx="8" fill="#64748b" stroke="#94a3b8" strokeWidth="2"/>
    <text x="590" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Heap</text>
    <text x="590" y="96" textAnchor="middle" fill="#cbd5e1" fontSize="9">new String("hello")</text>

    {/* Variables */}
    <text x="50" y="85" fill="#94a3b8" fontSize="11">s1 =</text>
    <line x1="90" y1="82" x2="145" y2="82" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-green)"/>

    <text x="50" y="102" fill="#94a3b8" fontSize="11">s2 =</text>
    <line x1="90" y1="99" x2="145" y2="87" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-green)"/>

    <text x="700" y="85" fill="#94a3b8" fontSize="11">s3 =</text>
    <line x1="695" y1="82" x2="655" y2="82" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red)"/>

    {/* Comparison results */}
    <rect x="150" y="140" width="180" height="40" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="240" y="165" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">s1 == s2 → true</text>

    <rect x="470" y="140" width="180" height="40" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="560" y="165" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">s1 == s3 → false</text>
  </svg>
)

/**
 * Intern Method Diagram
 */
const InternMethodDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      intern() Method - Canonical Representation
    </text>

    {/* Process flow */}
    <rect x="50" y="60" width="160" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="130" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1. Check Pool</text>
    <text x="130" y="100" textAnchor="middle" fill="#dbeafe" fontSize="9">String exists?</text>

    <rect x="270" y="60" width="160" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2a. If Yes</text>
    <text x="350" y="100" textAnchor="middle" fill="#dcfce7" fontSize="9">Return pool reference</text>

    <rect x="490" y="60" width="160" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="570" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2b. If No</text>
    <text x="570" y="100" textAnchor="middle" fill="#fef3c7" fontSize="9">Add to pool & return</text>

    {/* Arrows */}
    <line x1="210" y1="90" x2="265" y2="90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-blue)"/>
    <line x1="210" y1="95" x2="265" y2="110" stroke="#94a3b8" strokeWidth="2"/>
    <line x1="265" y1="110" x2="485" y2="110" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-blue)"/>

    {/* Example */}
    <rect x="150" y="150" width="500" height="50" rx="8" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="1"/>
    <text x="400" y="172" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">
      String s = new String("hello").intern();
    </text>
    <text x="400" y="188" textAnchor="middle" fill="#fce7f3" fontSize="9">
      Returns pool reference, not heap object
    </text>
  </svg>
)

/**
 * Immutability Diagram
 */
const ImmutabilityDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      String Immutability - Modifications Create New Objects
    </text>

    {/* Original String */}
    <rect x="100" y="70" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="170" y="92" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">String s</text>
    <text x="170" y="108" textAnchor="middle" fill="#ede9fe" fontSize="9">"hello"</text>
    <text x="170" y="120" textAnchor="middle" fill="#c4b5fd" fontSize="8">immutable</text>

    {/* Operation */}
    <text x="320" y="105" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
      .toUpperCase()
    </text>
    <line x1="240" y1="100" x2="290" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-purple)"/>
    <line x1="350" y1="100" x2="420" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-purple)"/>

    {/* New String */}
    <rect x="420" y="70" width="140" height="60" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="490" y="92" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">New String</text>
    <text x="490" y="108" textAnchor="middle" fill="#fce7f3" fontSize="9">"HELLO"</text>
    <text x="490" y="120" textAnchor="middle" fill="#fbcfe8" fontSize="8">new object</text>

    {/* Original unchanged */}
    <rect x="580" y="70" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="650" y="92" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Original s</text>
    <text x="650" y="108" textAnchor="middle" fill="#ede9fe" fontSize="9">"hello"</text>
    <text x="650" y="120" textAnchor="middle" fill="#c4b5fd" fontSize="8">unchanged</text>

    {/* Note */}
    <text x="400" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
      Original string remains unmodified - new object created for result
    </text>
  </svg>
)

/**
 * Compile-Time Optimization Diagram
 */
const CompileTimeOptimizationDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-amber" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Compile-Time vs Runtime String Concatenation
    </text>

    {/* Compile-time */}
    <rect x="50" y="60" width="330" height="140" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="215" y="80" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Compile-Time (Constant Folding)</text>

    <text x="70" y="105" fill="#94a3b8" fontSize="10">Code:</text>
    <text x="70" y="120" fill="#e2e8f0" fontSize="9" fontFamily="monospace">"hello" + " " + "world"</text>

    <text x="70" y="145" fill="#94a3b8" fontSize="10">Bytecode:</text>
    <text x="70" y="160" fill="#4ade80" fontSize="9" fontFamily="monospace">ldc "hello world"</text>

    <text x="70" y="185" fill="#22c55e" fontSize="9">✓ Single constant in pool</text>

    {/* Runtime */}
    <rect x="420" y="60" width="330" height="140" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="585" y="80" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Runtime (StringBuilder)</text>

    <text x="440" y="105" fill="#94a3b8" fontSize="10">Code:</text>
    <text x="440" y="120" fill="#e2e8f0" fontSize="9" fontFamily="monospace">String x = "hello"; x + " world"</text>

    <text x="440" y="145" fill="#94a3b8" fontSize="10">Bytecode:</text>
    <text x="440" y="160" fill="#fca5a5" fontSize="8" fontFamily="monospace">new StringBuilder</text>
    <text x="440" y="173" fill="#fca5a5" fontSize="8" fontFamily="monospace">append(x).append(" world")</text>

    <text x="440" y="190" fill="#ef4444" fontSize="9">⚠ Creates new heap object</text>
  </svg>
)

/**
 * Compact Strings Diagram
 */
const CompactStringsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Java 8 vs Java 9+ String Internal Structure
    </text>

    {/* Java 8 */}
    <rect x="50" y="60" width="330" height="130" rx="8" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2"/>
    <text x="215" y="80" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Java 8</text>

    <rect x="70" y="95" width="290" height="35" rx="4" fill="#475569" stroke="#64748b" strokeWidth="1"/>
    <text x="80" y="112" fill="#cbd5e1" fontSize="9" fontFamily="monospace">private final char[] value;</text>
    <text x="80" y="123" fill="#94a3b8" fontSize="8">Always 2 bytes per character</text>

    <text x="70" y="150" fill="#94a3b8" fontSize="10">"hello" (5 chars):</text>
    <text x="70" y="165" fill="#f59e0b" fontSize="11" fontWeight="bold">10 bytes</text>
    <text x="140" y="165" fill="#94a3b8" fontSize="9">(5 × 2)</text>

    {/* Java 9+ */}
    <rect x="420" y="60" width="330" height="130" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="585" y="80" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Java 9+ (Compact Strings)</text>

    <rect x="440" y="95" width="290" height="35" rx="4" fill="#166534" stroke="#22c55e" strokeWidth="1"/>
    <text x="450" y="112" fill="#dcfce7" fontSize="9" fontFamily="monospace">private final byte[] value;</text>
    <text x="450" y="123" fill="#86efac" fontSize="8">1 or 2 bytes per character</text>

    <text x="440" y="150" fill="#94a3b8" fontSize="10">"hello" (5 chars, Latin-1):</text>
    <text x="440" y="165" fill="#22c55e" fontSize="11" fontWeight="bold">5 bytes</text>
    <text x="500" y="165" fill="#94a3b8" fontSize="9">(5 × 1) - 50% savings!</text>
  </svg>
)

/**
 * String Pool Tuning Diagram
 */
const StringPoolTuningDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      String Pool Hash Table Structure
    </text>

    {/* Hash Table Buckets */}
    <text x="400" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">
      Hash Table with Configurable Size (-XX:StringTableSize=N)
    </text>

    {/* Buckets visualization */}
    <rect x="100" y="70" width="40" height="50" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="120" y="100" textAnchor="middle" fill="#4ade80" fontSize="9">0</text>

    <rect x="150" y="70" width="40" height="50" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="170" y="90" textAnchor="middle" fill="#4ade80" fontSize="8">"abc"</text>
    <text x="170" y="105" textAnchor="middle" fill="#86efac" fontSize="8">"xyz"</text>

    <rect x="200" y="70" width="40" height="50" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="220" y="100" textAnchor="middle" fill="#4ade80" fontSize="9">0</text>

    <rect x="250" y="70" width="40" height="50" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="270" y="95" textAnchor="middle" fill="#4ade80" fontSize="8">"hi"</text>

    <text x="310" y="100" textAnchor="middle" fill="#94a3b8" fontSize="11">...</text>

    <rect x="360" y="70" width="40" height="50" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="380" y="100" textAnchor="middle" fill="#4ade80" fontSize="9">0</text>

    <text x="420" y="100" textAnchor="middle" fill="#94a3b8" fontSize="11">...</text>

    <rect x="660" y="70" width="40" height="50" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="680" y="100" textAnchor="middle" fill="#4ade80" fontSize="9">0</text>

    <text x="120" y="135" fill="#64748b" fontSize="8">Bucket 0</text>
    <text x="170" y="135" fill="#64748b" fontSize="8">Bucket 1</text>
    <text x="220" y="135" fill="#64748b" fontSize="8">Bucket 2</text>
    <text x="680" y="135" fill="#64748b" fontSize="8">60013</text>

    {/* Recommendations */}
    <rect x="50" y="155" width="700" height="35" rx="6" fill="rgba(236, 72, 153, 0.15)" stroke="#ec4899" strokeWidth="1"/>
    <text x="70" y="172" fill="#f472b6" fontSize="10" fontWeight="bold">Tuning Tips:</text>
    <text x="70" y="183" fill="#fce7f3" fontSize="9">
      • Default: 60013 buckets (good for most apps) • Increase if avg bucket size &gt; 1 • Use prime numbers
    </text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * StringPoolInternals Component
 *
 * @param {function} onBack - Callback to navigate back to parent page
 * @param {object} breadcrumb - Optional breadcrumb configuration from parent
 */
function StringPoolInternals({ onBack, breadcrumb }) {
  // State for modal navigation
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'string-pool-basics',
      name: 'String Pool Basics',
      icon: '💾',
      color: '#ec4899',
      description: 'Understanding what String Pool is, where it lives, and why it exists for memory optimization and performance.',
      diagram: MemoryLayoutDiagram,
      details: [
        {
          name: 'What is String Pool?',
          diagram: MemoryLayoutDiagram,
          explanation: 'String Pool (String Intern Pool) is a special memory area in the Java heap for storing string literals. Its purpose is memory optimization by reusing identical strings, performance improvement through fast == comparison, and JVM optimization with compile-time string handling. In Java 6 and earlier, it was in PermGen with fixed size. From Java 7+, it moved to the heap where it can grow dynamically and is eligible for garbage collection.',
          codeExample: `// String literals - automatically pooled
String s1 = "hello";
String s2 = "hello";
System.out.println(s1 == s2);  // true (same reference)

// new String() - creates new heap object
String s3 = new String("hello");
System.out.println(s1 == s3);  // false (different objects)
System.out.println(s1.equals(s3));  // true (same content)

// intern() - add to pool or get existing
String s4 = s3.intern();
System.out.println(s1 == s4);  // true (s4 now points to pool)

// Memory visualization:
//
// String Pool (Heap):     Heap:
// ┌─────────────┐        ┌─────────────┐
// │   "hello"   │◄───s1  │new String() │◄───s3
// │             │◄───s2  │  "hello"    │
// │             │◄───s4  └─────────────┘
// └─────────────┘`
        },
        {
          name: 'Location Evolution',
          explanation: 'The String Pool location changed significantly in Java 7. Before Java 7, it was in PermGen (Permanent Generation) which had a fixed size and could cause OutOfMemoryError if too many strings were interned. From Java 7 onwards, it moved to the main heap memory, making it dynamically sized and eligible for garbage collection, eliminating most OOM issues related to string interning.',
          codeExample: `// Java 6 and earlier
// String Pool in PermGen
// Fixed size: -XX:PermSize / -XX:MaxPermSize
// Risk: java.lang.OutOfMemoryError: PermGen space

// Java 7+
// String Pool in Heap
// Dynamically sized
// GC eligible - dead strings can be collected
// Controlled by: -XX:StringTableSize=N (hash table buckets)

// Example that would fail in Java 6 with small PermGen:
for (int i = 0; i < 1_000_000; i++) {
    String s = ("unique_string_" + i).intern();
    // Java 6: PermGen OOM likely
    // Java 7+: Works fine, GC handles it
}`
        },
        {
          name: 'How Pooling Works',
          diagram: StringComparisonDiagram,
          explanation: 'When you create a string literal, the JVM checks if an equal string already exists in the pool. If yes, it returns the existing reference. If no, it adds the new string to the pool. String objects created with "new String()" bypass the pool entirely and go directly to the heap. The intern() method can explicitly add heap strings to the pool or retrieve existing pool references.',
          codeExample: `// Automatic pooling of literals
String a = "hello";        // Check pool, add "hello", return ref
String b = "hello";        // Check pool, found, return same ref
System.out.println(a == b); // true

// Bypass pool with new
String c = new String("hello");  // Direct to heap
System.out.println(a == c);      // false

// Manual pooling with intern()
String d = new String("world").intern();
String e = "world";
System.out.println(d == e);      // true

// Concatenation at compile time is pooled
final String prefix = "hel";
final String suffix = "lo";
String f = prefix + suffix;      // Compile-time constant
System.out.println(a == f);      // true (pooled)

// Runtime concatenation is NOT pooled
String x = new String("hel");
String y = new String("lo");
String g = x + y;               // Runtime StringBuilder
System.out.println(a == g);     // false (heap object)`
        }
      ]
    },
    {
      id: 'string-immutability',
      name: 'String Immutability',
      icon: '🔒',
      color: '#8b5cf6',
      description: 'Deep dive into why Strings are immutable, how it works internally, and the security and performance benefits.',
      diagram: ImmutabilityDiagram,
      details: [
        {
          name: 'Why Immutable?',
          diagram: ImmutabilityDiagram,
          explanation: 'Strings are immutable for several critical reasons: Thread safety without synchronization (multiple threads can safely share string references), Security (validated strings cannot be modified maliciously after validation), Caching efficiency (hashCode can be computed once and cached), and String pool safety (safe to share references since values cannot change). This design is fundamental to Java\'s architecture.',
          codeExample: `// Thread safety - no locks needed
static final String SHARED_CONSTANT = "shared data";
// Multiple threads can safely read without synchronization

// Security example
void authenticate(String password) {
    if (validate(password)) {
        // If String were mutable, attacker could change
        // password here before it's used
        usePassword(password);  // Safe - immutable
    }
}

// HashCode caching
String s = "hello";
int hash1 = s.hashCode();  // Computed once
int hash2 = s.hashCode();  // Returns cached value
// Efficient for HashMap/HashSet keys

// String pool safety
String a = "test";
String b = "test";  // Same reference
// If mutable, changing 'a' would affect 'b'
// Immutability makes pooling safe`
        },
        {
          name: 'Internal Implementation',
          explanation: 'String is implemented as a final class with a private final char array (Java 8) or byte array (Java 9+). The class cannot be extended, and the internal value array cannot be modified. There are no setter methods. The hash code is cached in a private int field after first computation. All "modification" methods like toUpperCase(), substring(), concat() return new String objects.',
          codeExample: `// Simplified String class structure
public final class String {  // final - cannot extend

    // Java 9+: byte array for compact strings
    private final byte[] value;  // final - cannot reassign
    private final byte coder;    // LATIN1 or UTF16

    // Cached hash code
    private int hash;  // Default 0, computed once

    // No public constructors expose internal array
    public String(String original) {
        this.value = original.value;
        this.coder = original.coder;
        this.hash = original.hash;
    }

    // "Modifications" return new objects
    public String toUpperCase() {
        // Create and return NEW String object
        return new String(/* upper case value */);
    }

    // HashCode computed once and cached
    public int hashCode() {
        int h = hash;
        if (h == 0 && value.length > 0) {
            hash = h = /* compute hash */;
        }
        return h;
    }
}`
        },
        {
          name: 'Impact on Operations',
          explanation: 'Because Strings are immutable, every modification creates a new object. This means string concatenation in loops is extremely inefficient - each += operation creates a new String object. For building strings dynamically, use StringBuilder (single-threaded) or StringBuffer (thread-safe). The immutability also means substring() in Java 7+ creates a copy rather than sharing the underlying array.',
          codeExample: `// BAD: String concatenation in loop
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;  // Creates ~1000 String objects!
}
// Each += creates: new StringBuilder(result).append(i).toString()

// GOOD: StringBuilder for dynamic strings
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);  // Same object, efficient
}
String result = sb.toString();  // Single String created

// StringBuffer - synchronized version
StringBuffer sbuf = new StringBuffer();
// Thread-safe but slower due to synchronization
// Use when multiple threads modify same builder

// Substring creates new object (Java 7+)
String original = "Hello World";
String sub = original.substring(0, 5);  // "Hello"
// Java 6: shared same char[], memory leak risk
// Java 7+: creates new char[], safer

// All modifications create new objects
String s = "hello";
s.toUpperCase();  // Returns "HELLO", s unchanged
s.concat(" world");  // Returns "hello world", s unchanged
System.out.println(s);  // Still "hello"`
        }
      ]
    },
    {
      id: 'intern-method',
      name: 'intern() Method',
      icon: '🔄',
      color: '#3b82f6',
      description: 'How intern() works to add strings to the pool, when to use it, and performance implications.',
      diagram: InternMethodDiagram,
      details: [
        {
          name: 'How intern() Works',
          diagram: InternMethodDiagram,
          explanation: 'The intern() method returns the canonical representation of a string from the pool. It first checks if an equal string exists in the pool. If yes, it returns the pool reference. If no, it adds the current string to the pool and returns it. This is a native method implemented in the JVM for efficiency. The string pool uses a hash table for fast lookups.',
          codeExample: `// Native method signature
public native String intern();

// Conceptual implementation
String intern() {
    // Check if equal string exists in pool
    String pooled = stringPool.get(this);
    if (pooled != null) {
        return pooled;  // Return existing reference
    }
    // Add this string to pool
    stringPool.add(this);
    return this;  // Return this reference
}

// Usage example
String s1 = new String("hello").intern();
String s2 = "hello";
System.out.println(s1 == s2);  // true

// Heap to pool
String heap = new String("world");
String pooled = heap.intern();
System.out.println(heap == pooled);  // false (different refs)

String literal = "world";
System.out.println(pooled == literal);  // true (same pool ref)`
        },
        {
          name: 'When to Use intern()',
          explanation: 'Use intern() when you have many duplicate strings to reduce memory footprint, when you need fast equality checks using == instead of equals(), or for enum-like string handling. Good use cases include: country/city names in large datasets, configuration keys, enumeration values. Avoid interning unique strings like UUIDs, user-generated content, or temporary strings as they pollute the pool without benefit.',
          codeExample: `// GOOD: Many duplicate strings
class UserRecord {
    String country;  // Many users from same countries
    String city;
    String status;   // "active", "inactive", etc.
}

List<UserRecord> records = loadMillionsOfRecords();
for (UserRecord r : records) {
    r.country = r.country.intern();  // Huge memory savings
    r.city = r.city.intern();
    r.status = r.status.intern();
}
// Example: 1M records, 100 unique countries
// Without intern: 1M String objects
// With intern: 100 String objects + 1M references

// GOOD: Enum-like strings with == comparison
String status = getStatus().intern();
if (status == "ACTIVE") {  // Fast reference comparison
    // Process active
}

// BAD: Unique strings
String uuid = UUID.randomUUID().toString().intern();
// Wasteful! Each UUID is unique, pollutes pool

// BAD: User input
String userComment = request.getParameter("comment").intern();
// Dangerous! Unbounded pool growth, possible DoS

// BAD: Temporary strings
for (int i = 0; i < 1000; i++) {
    String temp = ("temp_" + i).intern();
    // Pollutes pool with strings used once
}`
        },
        {
          name: 'Performance Considerations',
          explanation: 'Interning has overhead - it involves hash table lookup and potentially insertion. The benefit only comes when you have many references to the same string value. Memory saved = (number of duplicates - 1) × string size. Time saved comes from == being faster than equals() for equality checks. Monitor with -XX:+PrintStringTableStatistics. Be cautious of pool pollution with unique strings.',
          codeExample: `// Performance analysis
// Scenario: 1 million records, 1000 unique values

// Without intern
// Memory: 1M String objects × ~100 bytes = ~100 MB
// Equality: str1.equals(str2) - char by char comparison

// With intern
// Memory: 1000 String objects × ~100 bytes = ~100 KB
// Equality: str1 == str2 - single reference comparison
// Savings: ~99.9 MB

// Benchmark example
long start = System.nanoTime();

// Approach 1: No interning
List<String> list1 = new ArrayList<>();
for (int i = 0; i < 100000; i++) {
    list1.add(new String("duplicate"));
}
long time1 = System.nanoTime() - start;

// Approach 2: With interning
start = System.nanoTime();
List<String> list2 = new ArrayList<>();
String interned = "duplicate";
for (int i = 0; i < 100000; i++) {
    list2.add(interned);  // Reuse same reference
}
long time2 = System.nanoTime() - start;

// list1: 100K objects, slow equals() comparisons
// list2: 1 object, fast == comparisons

// Monitor pool statistics
// java -XX:+PrintStringTableStatistics MyApp
// Shows: bucket count, entries, collisions, memory usage`
        }
      ]
    },
    {
      id: 'compile-time-optimization',
      name: 'Compile-Time Optimization',
      icon: '⚡',
      color: '#f59e0b',
      description: 'How the Java compiler optimizes string literals and constant expressions at compile time.',
      diagram: CompileTimeOptimizationDiagram,
      details: [
        {
          name: 'Constant Folding',
          diagram: CompileTimeOptimizationDiagram,
          explanation: 'The Java compiler performs constant folding for string literals. When you concatenate multiple string literals, the compiler combines them into a single constant at compile time. This also applies to final variables, which are treated as compile-time constants. The result goes directly into the string pool. This optimization means "hello" + " " + "world" becomes a single "hello world" constant in the bytecode.',
          codeExample: `// Compile-time constant folding
String s1 = "hello" + " " + "world";
String s2 = "hello world";
System.out.println(s1 == s2);  // true! (same constant)

// Compiler converts s1 to:
// String s1 = "hello world";

// final variables are constants
final String greeting = "hello";
final String target = "world";
String s3 = greeting + " " + target;
System.out.println(s2 == s3);  // true (compile-time fold)

// Bytecode for s1:
// ldc "hello world"  // Single constant loaded
// astore_1

// Non-final variables - no folding
String a = "hello";
String b = "world";
String s4 = a + " " + b;  // Runtime concatenation
System.out.println(s2 == s4);  // false (new object)

// Multiple literal concatenations
String long = "a" + "b" + "c" + "d" + "e";
// Compiler folds to: "abcde"
// Bytecode: ldc "abcde"`
        },
        {
          name: 'Runtime Concatenation',
          explanation: 'When concatenating non-final variables or expressions, the compiler cannot fold at compile time. Instead, it generates bytecode that uses StringBuilder for concatenation. The result is a new heap object, not a pooled string. Each concatenation with non-constants creates a StringBuilder, appends values, and calls toString() to create a new String.',
          codeExample: `// Runtime concatenation with variables
String prefix = "hello";
String suffix = "world";
String result = prefix + " " + suffix;

// Compiler generates (simplified):
String result = new StringBuilder()
    .append(prefix)
    .append(" ")
    .append(suffix)
    .toString();

// Bytecode (simplified):
// new StringBuilder
// dup
// invokespecial StringBuilder.<init>
// aload prefix
// invokevirtual StringBuilder.append
// ldc " "
// invokevirtual StringBuilder.append
// aload suffix
// invokevirtual StringBuilder.append
// invokevirtual StringBuilder.toString

// Each concatenation creates new object
String a = "hello";
for (int i = 0; i < 3; i++) {
    a = a + i;  // New StringBuilder each iteration!
}
// Equivalent to:
// a = new StringBuilder(a).append(0).toString();
// a = new StringBuilder(a).append(1).toString();
// a = new StringBuilder(a).append(2).toString();
// Creates multiple temporary objects

// Better approach:
StringBuilder sb = new StringBuilder("hello");
for (int i = 0; i < 3; i++) {
    sb.append(i);  // Reuse same StringBuilder
}
String result = sb.toString();  // One object created`
        },
        {
          name: 'When Optimization Applies',
          explanation: 'Compile-time optimization only applies to string literals and final variables with literal values. It does not apply to: method return values (even if they return literals), non-final variables, expressions involving method calls, or runtime computed values. Understanding this distinction is crucial for writing efficient string code.',
          codeExample: `// ✓ Optimized - all literals
String s1 = "a" + "b" + "c";
// Compiler: "abc"

// ✓ Optimized - final variables with literals
final String X = "a";
final String Y = "b";
String s2 = X + Y;
// Compiler: "ab"

// ✗ NOT optimized - non-final variables
String x = "a";
String y = "b";
String s3 = x + y;
// Runtime: new StringBuilder().append(x).append(y).toString()

// ✗ NOT optimized - method calls
String getA() { return "a"; }
String s4 = getA() + "b";
// Runtime: StringBuilder even though method returns literal

// ✗ NOT optimized - final non-literal
final String computed = "a".toUpperCase();
String s5 = computed + "b";
// Runtime: StringBuilder (toUpperCase is runtime)

// ✗ NOT optimized - expressions
final int num = 42;
String s6 = "number" + num;
// Runtime: StringBuilder (int to String conversion)

// Testing which gets pooled:
String lit = "ab";
System.out.println(s1 == lit);  // true (optimized)
System.out.println(s2 == lit);  // true (optimized)
System.out.println(s3 == lit);  // false (runtime)
System.out.println(s4 == lit);  // false (method call)
System.out.println(s3.intern() == lit);  // true (after intern)`
        }
      ]
    },
    {
      id: 'compact-strings',
      name: 'Compact Strings (Java 9+)',
      icon: '💿',
      color: '#22c55e',
      description: 'Java 9\'s Compact Strings feature reduces memory usage by using byte arrays instead of char arrays.',
      diagram: CompactStringsDiagram,
      details: [
        {
          name: 'Internal Representation',
          diagram: CompactStringsDiagram,
          explanation: 'Before Java 9, Strings used char[] internally, consuming 2 bytes per character even for ASCII. Java 9 introduced Compact Strings using byte[] with a coder field indicating the encoding. Latin-1 (ISO-8859-1) strings use 1 byte per character, while strings requiring full Unicode use UTF-16 with 2 bytes per character. This provides ~50% memory savings for most strings since the majority of strings in applications are ASCII/Latin-1.',
          codeExample: `// Java 8 and earlier
public final class String {
    private final char[] value;  // Always 2 bytes/char
}
// "hello" = 5 chars × 2 bytes = 10 bytes

// Java 9+
public final class String {
    private final byte[] value;  // 1 or 2 bytes/char
    private final byte coder;    // Encoding indicator

    static final byte LATIN1 = 0;  // 1 byte per char
    static final byte UTF16 = 1;   // 2 bytes per char
}

// Automatic encoding selection
String ascii = "hello";           // Uses LATIN1
// value.length = 5, coder = LATIN1
// Memory: 5 bytes

String unicode = "你好";           // Uses UTF16
// value.length = 4 (2 chars × 2 bytes), coder = UTF16
// Memory: 4 bytes

String mixed = "hello世界";        // Uses UTF16
// Even one non-Latin1 char forces UTF16
// Memory: 14 bytes (7 chars × 2 bytes)

// Memory comparison for "hello":
// Java 8:  5 × 2 = 10 bytes
// Java 9+: 5 × 1 = 5 bytes (50% savings)`
        },
        {
          name: 'Coder-Based Operations',
          explanation: 'String operations check the coder field to determine how to process the byte array. Methods like length(), charAt(), substring() have different code paths for LATIN1 vs UTF16. For LATIN1, each byte directly represents one character. For UTF16, two bytes form one character. This branching adds minimal overhead but enables significant memory savings.',
          codeExample: `// Simplified String implementation

// Length calculation
public int length() {
    return value.length >> coder;
    // If LATIN1 (0): value.length >> 0 = value.length
    // If UTF16 (1):  value.length >> 1 = value.length / 2
}

// charAt with coder check
public char charAt(int index) {
    if (coder == LATIN1) {
        // Latin-1: single byte
        return (char)(value[index] & 0xff);
    } else {
        // UTF-16: two bytes
        return StringUTF16.charAt(value, index);
    }
}

// Example with "hello" (LATIN1)
String s = "hello";
// value = [104, 101, 108, 108, 111] (bytes)
// coder = 0 (LATIN1)
s.length();    // 5 >> 0 = 5
s.charAt(0);   // (char)(104 & 0xff) = 'h'

// Example with "你好" (UTF16)
String s2 = "你好";
// value = [79, 96, 89, 125] (4 bytes = 2 chars)
// coder = 1 (UTF16)
s2.length();   // 4 >> 1 = 2
s2.charAt(0);  // StringUTF16.charAt(value, 0) = '你'

// Concatenation chooses encoding
String a = "hello";   // LATIN1
String b = "world";   // LATIN1
String c = a + b;     // Result: LATIN1

String d = "hello";   // LATIN1
String e = "世界";    // UTF16
String f = d + e;     // Result: UTF16 (upgraded)`
        },
        {
          name: 'Performance Impact',
          explanation: 'Compact Strings reduce memory usage significantly (often 30-50% for string data) with minimal performance impact. The coder check is a simple branch that modern CPUs predict well. The memory savings often improve overall performance due to better cache utilization and reduced GC pressure. You can disable with -XX:-CompactStrings but this is rarely needed and not recommended.',
          codeExample: `// Memory impact analysis
// Application with 10M strings, 80% ASCII/Latin-1

// Java 8:
// All strings use char[] (2 bytes/char)
// Average string length: 20 chars
// Memory: 10M × 20 × 2 = 400 MB

// Java 9+ with Compact Strings:
// 8M Latin-1 strings: 8M × 20 × 1 = 160 MB
// 2M UTF-16 strings:  2M × 20 × 2 = 80 MB
// Total: 240 MB
// Savings: 160 MB (40% reduction!)

// Performance considerations:
// ✓ Better cache utilization (smaller strings)
// ✓ Less GC pressure (less memory used)
// ✓ Modern CPUs handle branch prediction well
// ⚠ Slight overhead for coder checks
// ⚠ UTF-16 operations slightly more complex

// Benchmark example (simplified):
// Latin-1 charAt: ~0.5 ns
// UTF-16 charAt:  ~0.7 ns
// Difference: negligible in real applications

// Disable Compact Strings (not recommended):
// java -XX:-CompactStrings MyApp
// Only if profiling shows specific performance issue
// Usually hurts more than helps due to memory increase

// Check if enabled (default since Java 9):
// java -XX:+PrintFlagsFinal -version | grep CompactStrings
// CompactStrings = true

// Monitor string memory usage:
// jcmd <pid> VM.stringtable
// Shows: entries, memory usage, histogram`
        }
      ]
    },
    {
      id: 'string-pool-tuning',
      name: 'String Pool Tuning',
      icon: '⚙️',
      color: '#06b6d4',
      description: 'Configure and optimize the String Pool hash table for your application\'s needs.',
      diagram: StringPoolTuningDiagram,
      details: [
        {
          name: 'Hash Table Size',
          diagram: StringPoolTuningDiagram,
          explanation: 'The String Pool uses a hash table internally for fast lookups. The table size is configurable via -XX:StringTableSize=N where N is the number of buckets. Default size changed from 1009 in early Java 7 to 60013 in Java 7u40+. Larger tables reduce hash collisions, improving intern() performance. Use prime numbers for better hash distribution.',
          codeExample: `// String table size configuration
// java -XX:StringTableSize=120013 MyApp

// Historical defaults:
// Java 7 early:    1009 buckets
// Java 7u40+:      60013 buckets
// Java 8+:         60013 buckets (default)

// Recommendations by scale:
// Small apps:      60013 (default)
// Medium apps:     120017
// Large apps:      240007
// Very large:      1000003

// Must be prime number for best distribution
// Good primes: 60013, 120017, 240007, 480007, 1000003

// Example: app with heavy interning
// java -XX:StringTableSize=240007 \
//      -XX:+PrintStringTableStatistics \
//      MyApp

// Print statistics at exit
// -XX:+PrintStringTableStatistics
// Output shows:
// - Number of buckets
// - Number of entries
// - Average bucket size (should be < 1.0)
// - Max bucket size
// - Total footprint

// Calculate optimal size:
// Expected interned strings: 100,000
// Target load factor: 0.75
// Buckets needed: 100,000 / 0.75 = 133,333
// Choose prime: 240007`
        },
        {
          name: 'Monitoring Statistics',
          explanation: 'Use -XX:+PrintStringTableStatistics to print detailed statistics when the JVM exits. This shows bucket count, number of entries, load distribution, and memory usage. The average bucket size should ideally be less than 1.0 for optimal performance. High max bucket size or variance indicates poor distribution. Use jcmd for runtime statistics without restarting.',
          codeExample: `// Enable statistics printing
// java -XX:+PrintStringTableStatistics MyApp

// Example output:
// SymbolTable statistics:
// Number of buckets       :     20011 =    160088 bytes
// Number of entries       :     13207 =    211312 bytes
// Number of literals      :     13207 =    564152 bytes
// Total footprint         :           =    935552 bytes
// Average bucket size     :     0.660
// Variance of bucket size :     0.660
// Std. dev. of bucket size:     0.812
// Maximum bucket size     :         3

// StringTable statistics:
// Number of buckets       :     60013 =    480104 bytes
// Number of entries       :     45123 =    722088 bytes
// Number of literals      :     45123 =   3245672 bytes
// Total footprint         :           =   4447864 bytes
// Average bucket size     :     0.752
// Variance of bucket size :     0.752
// Std. dev. of bucket size:     0.867
// Maximum bucket size     :         5

// Interpreting results:
// ✓ Average < 1.0: Good distribution
// ✓ Max size < 5:  Few collisions
// ⚠ Average > 1.5: Consider increasing size
// ⚠ Max size > 10: Poor hash distribution

// Runtime statistics with jcmd:
// jcmd <pid> VM.stringtable
// Shows current state without restart

// Heap histogram for strings:
// jcmd <pid> GC.class_histogram | grep String
// Shows String object count and size`
        },
        {
          name: 'Tuning Guidelines',
          explanation: 'Increase StringTableSize if you have many interned strings and see high average bucket size or collision rates. Use prime numbers for bucket counts to minimize hash collisions. Monitor with PrintStringTableStatistics. The default 60013 is good for most applications. Only tune if profiling shows string pool as a bottleneck. Larger tables use more memory but improve lookup performance.',
          codeExample: `// Tuning workflow:

// 1. Profile current usage
java -XX:+PrintStringTableStatistics MyApp

// 2. Analyze output
// If average bucket size > 1.0, increase size

// 3. Calculate new size
// entries = 100,000 (from statistics)
// target_load = 0.75
// new_size = entries / target_load
// new_size = 133,333
// Choose next prime: 240007

// 4. Test with new size
java -XX:StringTableSize=240007 \
     -XX:+PrintStringTableStatistics \
     MyApp

// 5. Verify improvement
// Check if average bucket size decreased
// Compare performance metrics

// Real-world example:
// Application: Large data processing
// Scenario: 500K unique interned strings

// Before tuning:
// StringTableSize=60013 (default)
// Entries: 500,000
// Average bucket size: 8.33
// Max bucket size: 45
// intern() time: slow due to collisions

// After tuning:
// StringTableSize=1000003
// Entries: 500,000
// Average bucket size: 0.50
// Max bucket size: 4
// intern() time: 10x faster

// Trade-offs:
// Larger table:
// + Faster intern() lookups
// + Better hash distribution
// - More memory for table structure
// - Slightly longer JVM startup

// When NOT to tune:
// - Few interned strings (< 10,000)
// - Good default performance
// - Memory constrained environment
// - No profiling evidence of bottleneck

// Memory overhead calculation:
// 60013 buckets   ≈ 480 KB
// 120017 buckets  ≈ 960 KB
// 240007 buckets  ≈ 1.9 MB
// 1000003 buckets ≈ 8 MB
// Usually negligible compared to string data`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '📝',
      color: '#ef4444',
      description: 'Common String Pool questions asked in technical interviews with detailed answers.',
      details: [
        {
          name: 'Location & Basics',
          explanation: 'Q1: Where is the String Pool located in different Java versions? A: In Java 6 and earlier, it was in PermGen (Permanent Generation) with a fixed size. From Java 7 onwards, it moved to the main heap memory. Q2: Will "hello" == new String("hello") be true? A: False, because the literal goes to the pool while new String() creates a heap object with a different reference.',
          codeExample: `// Q1: String Pool location evolution
// Java 6 and earlier:
// - Location: PermGen (Permanent Generation)
// - Size: Fixed via -XX:MaxPermSize
// - Risk: OutOfMemoryError: PermGen space

// Java 7+:
// - Location: Heap memory
// - Size: Dynamic, can grow
// - GC: Eligible for garbage collection
// - Config: -XX:StringTableSize=N (bucket count)

// Q2: Reference comparison
String s1 = "hello";              // String Pool
String s2 = new String("hello");  // Heap
String s3 = "hello";              // String Pool (same as s1)

System.out.println(s1 == s2);     // false (pool vs heap)
System.out.println(s1 == s3);     // true (both from pool)
System.out.println(s1.equals(s2)); // true (same content)

// Visualization:
// Pool: ["hello"] ← s1, s3
// Heap: [String("hello")] ← s2`
        },
        {
          name: 'intern() & Object Creation',
          explanation: 'Q3: What does intern() do? A: It returns a canonical representation from the pool. If an equal string exists in the pool, it returns that reference. Otherwise, it adds the current string to the pool and returns it. Q4: How many objects are created by String s = new String("hello")? A: Up to 2 objects - one for the "hello" literal in the pool (if not already present), and one heap object from new String().',
          codeExample: `// Q3: intern() method
String heap = new String("world");
String pooled = heap.intern();
String literal = "world";

System.out.println(heap == pooled);    // false
System.out.println(pooled == literal); // true

// Behavior:
// 1. heap.intern() checks pool for "world"
// 2. If not present, adds it to pool
// 3. Returns pool reference
// 4. literal "world" gets same pool reference

// Q4: Object creation count
String s = new String("hello");

// Scenario 1: "hello" not in pool yet
// - Object 1: "hello" literal → pool
// - Object 2: new String() → heap
// Total: 2 objects

// Scenario 2: "hello" already in pool
// - Object 1: new String() → heap only
// Total: 1 object

// Detailed breakdown:
String a = "test";           // 1 object (pool)
String b = new String("test"); // 1 object (heap)
                             // "test" already in pool
String c = new String("new"); // 2 objects
                             // "new" literal → pool
                             // new String() → heap

// Verify with intern:
System.out.println(b.intern() == a);  // true
System.out.println(b == a);           // false`
        },
        {
          name: 'Immutability & Performance',
          explanation: 'Q5: Why are Strings immutable? A: For thread safety (no synchronization needed), security (cannot be modified after validation), efficient caching (hashCode computed once), and safe String pool sharing. Q6: String vs StringBuilder vs StringBuffer? A: String is immutable and thread-safe. StringBuilder is mutable and not thread-safe (faster for single-threaded use). StringBuffer is mutable and thread-safe with synchronized methods (slower but safe for concurrent access).',
          codeExample: `// Q5: Immutability benefits
// 1. Thread Safety
class ThreadSafe {
    private static final String SHARED = "config";
    // Multiple threads can safely read without locks
}

// 2. Security
void processPassword(String pwd) {
    if (isValid(pwd)) {
        // pwd cannot be changed between validation and use
        usePassword(pwd);
    }
}

// 3. Caching
String s = "hello";
int hash1 = s.hashCode();  // Computed
int hash2 = s.hashCode();  // Cached, no recomputation

// 4. Pool Safety
String a = "test";
String b = "test";  // Same reference safe because immutable

// Q6: String vs StringBuilder vs StringBuffer
// String - Immutable
String str = "hello";
str = str + " world";  // Creates NEW object
// Use for: Constants, few modifications

// StringBuilder - Mutable, NOT thread-safe
StringBuilder sb = new StringBuilder("hello");
sb.append(" world");  // Modifies same object
String result = sb.toString();
// Use for: String building in single thread
// Performance: Fastest

// StringBuffer - Mutable, thread-safe
StringBuffer sbuf = new StringBuffer("hello");
sbuf.append(" world");  // Synchronized method
// Use for: String building with multiple threads
// Performance: Slower due to synchronization

// Performance comparison:
// Concatenation in loop (1000 iterations)
// String:        ~500ms (creates 1000 objects!)
// StringBuilder: ~1ms   (single object)
// StringBuffer:  ~2ms   (single object + sync overhead)`
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
      { name: 'My Projects', icon: '📂', page: 'MyProjects' },
      { name: 'String Pool Internals', icon: '💾', page: 'StringPoolInternals' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #831843 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #f472b6, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(236, 72, 153, 0.2)',
    border: '1px solid rgba(236, 72, 153, 0.3)',
    borderRadius: '0.5rem',
    color: '#f472b6',
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
        <h1 style={titleStyle}>String Pool - Internal Workings</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.2)'
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
          colors={STRINGPOOL_COLORS}
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
              colors={STRINGPOOL_COLORS}
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

export default StringPoolInternals

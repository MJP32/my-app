/**
 * Class Loading Internals - Tab Template Format
 * Deep dive into JVM class loading mechanics
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const CLASSLOADING_COLORS = {
  primary: '#f59e0b',           // Amber
  primaryHover: '#fbbf24',      // Light amber
  bg: 'rgba(245, 158, 11, 0.1)', // Amber background
  border: 'rgba(245, 158, 11, 0.3)', // Amber border
  arrow: '#f59e0b',             // Amber arrow
  hoverBg: 'rgba(245, 158, 11, 0.2)', // Amber hover
  topicBg: 'rgba(245, 158, 11, 0.2)'  // Amber topic background
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

const ClassLoadingPhasesDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-cl" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Class Loading Process
    </text>

    {/* Loading Phase */}
    <rect x="50" y="60" width="150" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="125" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">LOADING</text>
    <text x="125" y="105" textAnchor="middle" fill="white" fontSize="9">Read .class file</text>
    <text x="125" y="120" textAnchor="middle" fill="white" fontSize="9">Create Class object</text>

    {/* Linking Phase */}
    <rect x="260" y="60" width="150" height="80" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="335" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">LINKING</text>
    <text x="335" y="105" textAnchor="middle" fill="white" fontSize="9">Verification</text>
    <text x="335" y="120" textAnchor="middle" fill="white" fontSize="9">Preparation</text>
    <text x="335" y="135" textAnchor="middle" fill="white" fontSize="9">Resolution</text>

    {/* Initialization Phase */}
    <rect x="470" y="60" width="150" height="80" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="545" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">INITIALIZATION</text>
    <text x="545" y="105" textAnchor="middle" fill="white" fontSize="9">Run &lt;clinit&gt;</text>
    <text x="545" y="120" textAnchor="middle" fill="white" fontSize="9">Static initializers</text>

    {/* Arrows */}
    <line x1="200" y1="100" x2="255" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-cl)"/>
    <line x1="410" y1="100" x2="465" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-cl)"/>

    {/* Sub-phases for Linking */}
    <text x="335" y="170" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Linking Details:</text>
    <rect x="260" y="180" width="45" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#4ade80" strokeWidth="1"/>
    <text x="282" y="195" textAnchor="middle" fill="#e2e8f0" fontSize="8">Verify</text>
    <text x="282" y="205" textAnchor="middle" fill="#94a3b8" fontSize="7">Bytecode</text>

    <rect x="315" y="180" width="45" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#4ade80" strokeWidth="1"/>
    <text x="337" y="195" textAnchor="middle" fill="#e2e8f0" fontSize="8">Prepare</text>
    <text x="337" y="205" textAnchor="middle" fill="#94a3b8" fontSize="7">Allocate</text>

    <rect x="370" y="180" width="45" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#4ade80" strokeWidth="1"/>
    <text x="392" y="195" textAnchor="middle" fill="#e2e8f0" fontSize="8">Resolve</text>
    <text x="392" y="205" textAnchor="middle" fill="#94a3b8" fontSize="7">Symbols</text>

    {/* Timeline */}
    <text x="50" y="250" textAnchor="start" fill="#64748b" fontSize="10">Input: MyClass.class bytecode</text>
    <text x="620" y="250" textAnchor="end" fill="#64748b" fontSize="10">Output: Ready to use</text>
    <line x1="50" y1="260" x2="620" y2="260" stroke="#475569" strokeWidth="1"/>
  </svg>
)

const ClassLoaderHierarchyDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-parent" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ClassLoader Delegation Hierarchy
    </text>

    {/* Bootstrap ClassLoader */}
    <rect x="250" y="60" width="300" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Bootstrap ClassLoader</text>
    <text x="400" y="105" textAnchor="middle" fill="white" fontSize="10">java.base (String, Object, etc.)</text>

    {/* Platform ClassLoader */}
    <rect x="250" y="150" width="300" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="175" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Platform ClassLoader</text>
    <text x="400" y="195" textAnchor="middle" fill="white" fontSize="10">java.sql, java.xml, etc.</text>

    {/* Application ClassLoader */}
    <rect x="250" y="240" width="300" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="265" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Application ClassLoader</text>
    <text x="400" y="285" textAnchor="middle" fill="white" fontSize="10">Your application classes</text>

    {/* Delegation arrows */}
    <line x1="400" y1="210" x2="400" y2="235" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-parent)"/>
    <text x="420" y="225" textAnchor="start" fill="#f59e0b" fontSize="10" fontWeight="bold">delegates to</text>

    <line x1="400" y1="120" x2="400" y2="145" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-parent)"/>
    <text x="420" y="135" textAnchor="start" fill="#f59e0b" fontSize="10" fontWeight="bold">delegates to</text>

    {/* Side notes */}
    <text x="50" y="90" textAnchor="start" fill="#94a3b8" fontSize="9">getClassLoader() returns null</text>
    <text x="50" y="180" textAnchor="start" fill="#94a3b8" fontSize="9">Java 9+ (replaces Extension)</text>
    <text x="50" y="270" textAnchor="start" fill="#94a3b8" fontSize="9">Loads from classpath</text>
  </svg>
)

const CustomClassLoaderDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-custom" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Custom ClassLoader Flow
    </text>

    {/* Class Request */}
    <rect x="50" y="60" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="110" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Class Request</text>

    {/* Check Loaded */}
    <rect x="220" y="60" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="280" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Already Loaded?</text>
    <text x="280" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="8">findLoadedClass()</text>

    {/* Delegate to Parent */}
    <rect x="390" y="60" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="450" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Ask Parent</text>
    <text x="450" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="8">parent.loadClass()</text>

    {/* Load Ourselves */}
    <rect x="560" y="60" width="120" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="620" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Load Class</text>
    <text x="620" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="8">findClass()</text>

    {/* Arrows */}
    <line x1="170" y1="85" x2="215" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-custom)"/>
    <line x1="340" y1="85" x2="385" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-custom)"/>
    <line x1="510" y1="85" x2="555" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-custom)"/>

    {/* Decision paths */}
    <text x="280" y="130" textAnchor="middle" fill="#4ade80" fontSize="9">Yes → Return</text>
    <text x="450" y="130" textAnchor="middle" fill="#4ade80" fontSize="9">Found → Return</text>
    <text x="620" y="130" textAnchor="middle" fill="#f59e0b" fontSize="9">defineClass()</text>

    {/* Implementation steps */}
    <text x="400" y="170" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
      Custom ClassLoader Implementation
    </text>
    <rect x="100" y="185" width="180" height="70" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#a78bfa" strokeWidth="1"/>
    <text x="190" y="205" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">1. Extend ClassLoader</text>
    <text x="190" y="222" textAnchor="middle" fill="#94a3b8" fontSize="8">class MyLoader extends</text>
    <text x="190" y="235" textAnchor="middle" fill="#94a3b8" fontSize="8">ClassLoader</text>

    <rect x="310" y="185" width="180" height="70" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#a78bfa" strokeWidth="1"/>
    <text x="400" y="205" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">2. Override findClass()</text>
    <text x="400" y="222" textAnchor="middle" fill="#94a3b8" fontSize="8">Read bytecode</text>
    <text x="400" y="235" textAnchor="middle" fill="#94a3b8" fontSize="8">from custom source</text>

    <rect x="520" y="185" width="180" height="70" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#a78bfa" strokeWidth="1"/>
    <text x="610" y="205" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">3. Call defineClass()</text>
    <text x="610" y="222" textAnchor="middle" fill="#94a3b8" fontSize="8">Convert bytecode to</text>
    <text x="610" y="235" textAnchor="middle" fill="#94a3b8" fontSize="8">Class object</text>
  </svg>
)

const MetaspaceDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Class Memory: PermGen vs Metaspace
    </text>

    {/* Java 7 - PermGen */}
    <rect x="50" y="60" width="300" height="150" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="85" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="bold">Java 7 - PermGen</text>

    <rect x="80" y="100" width="240" height="40" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="200" y="125" textAnchor="middle" fill="white" fontSize="10">Class Metadata (Fixed Size)</text>

    <text x="80" y="160" textAnchor="start" fill="#94a3b8" fontSize="9">❌ Fixed size (-XX:MaxPermSize)</text>
    <text x="80" y="175" textAnchor="start" fill="#94a3b8" fontSize="9">❌ OutOfMemoryError common</text>
    <text x="80" y="190" textAnchor="start" fill="#94a3b8" fontSize="9">❌ Part of heap</text>

    {/* Java 8+ - Metaspace */}
    <rect x="450" y="60" width="300" height="150" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="85" textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="bold">Java 8+ - Metaspace</text>

    <rect x="480" y="100" width="240" height="40" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="600" y="125" textAnchor="middle" fill="white" fontSize="10">Class Metadata (Native Memory)</text>

    <text x="480" y="160" textAnchor="start" fill="#94a3b8" fontSize="9">✅ Dynamic sizing (auto-grows)</text>
    <text x="480" y="175" textAnchor="start" fill="#94a3b8" fontSize="9">✅ Native memory (not heap)</text>
    <text x="480" y="190" textAnchor="start" fill="#94a3b8" fontSize="9">✅ Better GC behavior</text>

    {/* Bottom note */}
    <text x="400" y="240" textAnchor="middle" fill="#64748b" fontSize="10" fontStyle="italic">
      Metaspace automatically grows up to MaxMetaspaceSize (unlimited by default)
    </text>
  </svg>
)

const ContextClassLoaderDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-context" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
      <marker id="arrow-problem" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Context ClassLoader Problem & Solution
    </text>

    {/* Problem Side */}
    <text x="150" y="55" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">❌ Problem</text>
    <rect x="50" y="70" width="200" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="150" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Bootstrap ClassLoader</text>
    <text x="150" y="115" textAnchor="middle" fill="white" fontSize="9">JDBC DriverManager</text>

    <rect x="50" y="180" width="200" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="150" y="205" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Application ClassLoader</text>
    <text x="150" y="225" textAnchor="middle" fill="white" fontSize="9">MySQL Driver</text>

    {/* Problem arrow */}
    <line x1="150" y1="130" x2="150" y2="175" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-problem)"/>
    <text x="165" y="155" textAnchor="start" fill="#ef4444" fontSize="9" fontWeight="bold">Can't load!</text>
    <text x="165" y="165" textAnchor="start" fill="#ef4444" fontSize="8">(Parent → Child)</text>

    {/* Solution Side */}
    <text x="600" y="55" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">✅ Solution</text>
    <rect x="500" y="70" width="200" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="600" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">DriverManager</text>
    <text x="600" y="115" textAnchor="middle" fill="white" fontSize="9">Uses Context ClassLoader</text>

    <rect x="500" y="180" width="200" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="600" y="205" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">MySQL Driver</text>
    <text x="600" y="225" textAnchor="middle" fill="white" fontSize="9">Loaded successfully</text>

    {/* Solution arrow */}
    <line x1="600" y1="130" x2="600" y2="175" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-context)"/>
    <text x="470" y="155" textAnchor="end" fill="#f59e0b" fontSize="9" fontWeight="bold">Context ClassLoader</text>
    <text x="470" y="165" textAnchor="end" fill="#f59e0b" fontSize="8">Thread.currentThread()</text>

    {/* Bottom explanation */}
    <rect x="150" y="260" width="500" height="30" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="280" textAnchor="middle" fill="#e2e8f0" fontSize="10">
      SPI (Service Provider Interface) uses context loader to break delegation hierarchy
    </text>
  </svg>
)

const InterviewDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Class Identity: Same Bytecode, Different ClassLoaders
    </text>

    {/* ClassLoader 1 */}
    <rect x="100" y="60" width="250" height="80" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="225" y="85" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">ClassLoader 1</text>
    <rect x="130" y="95" width="190" height="35" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="225" y="117" textAnchor="middle" fill="white" fontSize="10">MyClass (instance 1)</text>

    {/* ClassLoader 2 */}
    <rect x="450" y="60" width="250" height="80" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="575" y="85" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">ClassLoader 2</text>
    <rect x="480" y="95" width="190" height="35" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="575" y="117" textAnchor="middle" fill="white" fontSize="10">MyClass (instance 2)</text>

    {/* Source */}
    <rect x="300" y="170" width="200" height="50" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">MyClass.class</text>
    <text x="400" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9">(Same bytecode)</text>

    {/* Arrows from source to loaders */}
    <line x1="320" y1="180" x2="200" y2="140" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="480" y1="180" x2="600" y2="140" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3"/>

    {/* Comparison */}
    <rect x="200" y="245" width="400" height="30" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="400" y="265" textAnchor="middle" fill="#f87171" fontSize="11">
      instance1.getClass() == instance2.getClass() → FALSE!
    </text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function ClassLoadingInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'loading-process',
      name: 'Class Loading Process',
      icon: '⚡',
      color: '#3b82f6',
      description: 'Understanding the three phases of class loading: Loading, Linking, and Initialization.',
      diagram: ClassLoadingPhasesDiagram,
      details: [
        {
          name: 'Loading Phase',
          diagram: ClassLoadingPhasesDiagram,
          explanation: 'The Loading phase is where the JVM finds and reads the .class file bytecode into memory. The ClassLoader locates the binary representation of the class (usually from the file system), reads the bytecode, and creates a Class object in the method area (Metaspace). This Class object serves as the interface for accessing type information at runtime.',
          codeExample: `// Loading Phase
// ─────────────────────────────────────────
// Input: "com.example.MyClass"
// Output: Class<?> object

// 1. ClassLoader searches for MyClass.class file
// 2. Reads bytecode into memory
// 3. Creates java.lang.Class instance
// 4. Stored in method area (Metaspace)

// Example: Triggering class loading
Class<?> clazz = Class.forName("com.example.MyClass");

// At this point:
// - Bytecode is read
// - Class object created
// - NOT yet initialized!`
        },
        {
          name: 'Linking Phase',
          explanation: 'Linking consists of three sub-phases: Verification checks that the bytecode is valid and secure (magic number 0xCAFEBABE, type checking, etc.). Preparation allocates memory for static variables and sets them to default values (0, null, false). Resolution converts symbolic references (class names, method names) to direct references (memory addresses), though this can be done lazily.',
          codeExample: `// Linking Phase
// ─────────────────────────────────────────

// a) VERIFICATION
//    - Check magic number: 0xCAFEBABE
//    - Verify bytecode instructions are valid
//    - Type checking and security checks
//    - If fails: VerifyError

// b) PREPARATION
//    - Allocate memory for static fields
//    - Set to default values (NOT assigned values!)
class Example {
    static int x = 10;      // Prepared as 0 (not 10 yet)
    static Object o = new Object();  // Prepared as null
    static final int Y = 20;  // Constant, inlined
}

// c) RESOLUTION (may be lazy)
//    - Symbolic references → direct memory references
//    - Class names → actual Class objects
//    - Method calls → actual method addresses
//    - Field access → actual field offsets
//    - Can throw: NoClassDefFoundError`
        },
        {
          name: 'Initialization Phase',
          explanation: 'Initialization is when static variables are assigned their actual values and static blocks are executed. The JVM creates a special <clinit> method containing all static initialization code in the order it appears. A class is initialized on first active use: new instance, static method call, static field access (except final constants), subclass initialization, Class.forName(), or as the main class.',
          codeExample: `// Initialization Phase
// ─────────────────────────────────────────
// Execute static initializers and assign real values

class Example {
    static int x = 10;  // NOW assigned 10
    static List<String> list;

    static {
        System.out.println("Initializing...");
        list = new ArrayList<>();
        list.add("item");
    }
}

// JVM generates synthetic <clinit> method:
// static void <clinit>() {
//     x = 10;
//     System.out.println("Initializing...");
//     list = new ArrayList<>();
//     list.add("item");
// }

// When is a class initialized?
// ✅ new Example()
// ✅ Example.staticMethod()
// ✅ Example.x (non-final static field)
// ✅ Subclass initialized
// ✅ Class.forName("Example")
// ✅ Main class at JVM startup

// NOT initialized:
// ❌ Example.CONSTANT (final static, inlined)
// ❌ Example.class (just Class object)
// ❌ Loading/Linking only`
        }
      ]
    },
    {
      id: 'classloader-hierarchy',
      name: 'ClassLoader Hierarchy',
      icon: '🏗️',
      color: '#22c55e',
      description: 'Java uses a hierarchical delegation model with Bootstrap, Platform, and Application ClassLoaders.',
      diagram: ClassLoaderHierarchyDiagram,
      details: [
        {
          name: 'Hierarchy Structure',
          diagram: ClassLoaderHierarchyDiagram,
          explanation: 'Java 9+ uses three main ClassLoaders: Bootstrap (loads core java.base module, returns null in Java), Platform (loads java.sql, java.xml), and Application/System (loads application classes from classpath). Each ClassLoader has a parent, forming a hierarchy. The Bootstrap ClassLoader is at the root and is implemented in native code.',
          codeExample: `// ClassLoader Hierarchy (Java 9+)
//
//        ┌─────────────────────┐
//        │ Bootstrap ClassLoader│  (null in Java)
//        │   java.base module   │  java.lang.String
//        └──────────┬──────────┘
//                   │ parent
//        ┌──────────┴──────────┐
//        │ Platform ClassLoader │  java.sql.Connection
//        │  java.sql, java.xml  │  java.xml.*
//        └──────────┬──────────┘
//                   │ parent
//        ┌──────────┴──────────┐
//        │ Application ClassLoader│  Your classes
//        │  Your application     │
//        └─────────────────────┘

// Getting ClassLoaders
String.class.getClassLoader();  // null (Bootstrap)
java.sql.Connection.class.getClassLoader();  // Platform
MyClass.class.getClassLoader();  // Application

// Getting parent
ClassLoader appLoader = MyClass.class.getClassLoader();
ClassLoader platformLoader = appLoader.getParent();
ClassLoader bootstrapLoader = platformLoader.getParent();  // null

// System ClassLoader
ClassLoader.getSystemClassLoader();  // Application loader`
        },
        {
          name: 'Delegation Model',
          explanation: 'The delegation model means that before a ClassLoader loads a class, it first delegates to its parent. Only if the parent cannot find the class does the child attempt to load it. This prevents duplicate loading of core classes and ensures security by making core classes immutable. The delegation is implemented in the loadClass() method.',
          codeExample: `// Delegation Model Implementation
class MyClassLoader extends ClassLoader {

    @Override
    protected Class<?> loadClass(String name, boolean resolve)
            throws ClassNotFoundException {

        // 1. Check if already loaded
        Class<?> c = findLoadedClass(name);

        if (c == null) {
            try {
                // 2. DELEGATE TO PARENT first
                if (getParent() != null) {
                    c = getParent().loadClass(name);
                } else {
                    c = findBootstrapClassOrNull(name);
                }
            } catch (ClassNotFoundException e) {
                // Parent couldn't load, we'll try
            }

            if (c == null) {
                // 3. Parent failed, load ourselves
                c = findClass(name);
            }
        }

        if (resolve) {
            resolveClass(c);
        }

        return c;
    }
}

// Why delegation?
// 1. Security: Can't replace java.lang.String
// 2. Consistency: Only one version of class
// 3. Efficiency: Core classes loaded once`
        },
        {
          name: 'Class Identity',
          diagram: InterviewDiagram,
          explanation: 'Class identity in Java is determined by the fully qualified class name AND the ClassLoader that loaded it. The same bytecode loaded by two different ClassLoaders creates two distinct Class objects. Instances of these classes are incompatible, even though they have identical bytecode. This is crucial for plugin systems and application isolation.',
          codeExample: `// Class Identity = ClassName + ClassLoader
// Same bytecode, different loader = DIFFERENT classes!

ClassLoader loader1 = new MyClassLoader();
ClassLoader loader2 = new MyClassLoader();

Class<?> c1 = loader1.loadClass("com.example.MyClass");
Class<?> c2 = loader2.loadClass("com.example.MyClass");

// Different Class objects!
c1 == c2;  // FALSE!
c1.equals(c2);  // FALSE!

// Names are the same
c1.getName().equals(c2.getName());  // TRUE

// But instances are incompatible
Object obj1 = c1.getDeclaredConstructor().newInstance();
Object obj2 = c2.getDeclaredConstructor().newInstance();

// This will throw ClassCastException!
// MyClass instance1 = (MyClass) obj2;  // ❌

// Why? Because MyClass from loader1 != MyClass from loader2

// Use case: Application servers (Tomcat, etc.)
// Each WAR gets its own ClassLoader
// Classes isolated between web applications`
        }
      ]
    },
    {
      id: 'custom-classloader',
      name: 'Custom ClassLoader',
      icon: '🔧',
      color: '#8b5cf6',
      description: 'Create custom ClassLoaders for hot-swapping, plugin systems, and loading from non-standard locations.',
      diagram: CustomClassLoaderDiagram,
      details: [
        {
          name: 'Implementation',
          diagram: CustomClassLoaderDiagram,
          explanation: 'To create a custom ClassLoader, extend ClassLoader and override the findClass() method (not loadClass() to preserve delegation). In findClass(), read the bytecode from your custom source and call defineClass() to convert the byte array into a Class object. Never override loadClass() unless you want to break the delegation model.',
          codeExample: `// Custom ClassLoader Implementation
class MyClassLoader extends ClassLoader {

    private final String classPath;

    public MyClassLoader(String classPath, ClassLoader parent) {
        super(parent);
        this.classPath = classPath;
    }

    @Override
    protected Class<?> findClass(String name)
            throws ClassNotFoundException {
        try {
            // Convert class name to file path
            String fileName = name.replace('.', '/') + ".class";
            Path path = Paths.get(classPath, fileName);

            // Read bytecode
            byte[] bytes = Files.readAllBytes(path);

            // Define the class (bytecode → Class object)
            return defineClass(name, bytes, 0, bytes.length);

        } catch (IOException e) {
            throw new ClassNotFoundException(name, e);
        }
    }
}

// Usage
MyClassLoader loader = new MyClassLoader(
    "/custom/path",
    ClassLoader.getSystemClassLoader()
);

Class<?> clazz = loader.loadClass("com.example.Plugin");
Object instance = clazz.getDeclaredConstructor().newInstance();

// Invoke method via reflection
Method method = clazz.getMethod("execute");
method.invoke(instance);`
        },
        {
          name: 'Hot-Swapping',
          explanation: 'Hot-swapping allows replacing classes at runtime without restarting the JVM. Create a new ClassLoader for each reload, load the class, use it, then discard the loader. The old loader and its classes become eligible for garbage collection. This is useful for development, plugin systems, and dynamic updates.',
          codeExample: `// Hot-Swapping Pattern
// Create new loader each time to reload class

class HotSwapDemo {

    public static void main(String[] args) throws Exception {
        while (true) {
            // Create fresh ClassLoader
            MyClassLoader loader = new MyClassLoader(
                "/app/classes",
                null  // No parent to avoid caching
            );

            // Load class (fresh version)
            Class<?> clazz = loader.loadClass("com.example.MyClass");

            // Create instance and use it
            Object instance = clazz.getDeclaredConstructor()
                .newInstance();
            Method method = clazz.getMethod("execute");
            method.invoke(instance);

            // Wait for file change
            System.out.println("Waiting for changes...");
            waitForFileChange("/app/classes/MyClass.class");

            // Loop again: new loader, new class version
            // Old loader/class/instance eligible for GC
        }
    }

    static void waitForFileChange(String file) throws Exception {
        // Watch file system for changes
        WatchService watcher = FileSystems.getDefault()
            .newWatchService();
        // ... implementation ...
    }
}

// Key: Each reload = new ClassLoader instance`
        },
        {
          name: 'Advanced Use Cases',
          explanation: 'Custom ClassLoaders enable many advanced scenarios: loading encrypted/obfuscated bytecode, loading from databases or networks, plugin architectures, dynamic code generation, and application isolation. For example, you can decrypt bytecode on-the-fly, load classes from a JAR in memory, or implement a plugin system where each plugin gets its own isolated ClassLoader.',
          codeExample: `// Use Case 1: Encrypted Classes
class EncryptedClassLoader extends ClassLoader {

    private final Cipher cipher;

    public EncryptedClassLoader(Key key) throws Exception {
        this.cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, key);
    }

    @Override
    protected Class<?> findClass(String name)
            throws ClassNotFoundException {
        try {
            byte[] encrypted = readEncryptedBytes(name);
            byte[] decrypted = cipher.doFinal(encrypted);
            return defineClass(name, decrypted, 0, decrypted.length);
        } catch (Exception e) {
            throw new ClassNotFoundException(name, e);
        }
    }
}

// Use Case 2: Network ClassLoader
class NetworkClassLoader extends ClassLoader {

    private final URL baseUrl;

    public NetworkClassLoader(URL baseUrl) {
        this.baseUrl = baseUrl;
    }

    @Override
    protected Class<?> findClass(String name)
            throws ClassNotFoundException {
        try {
            String path = name.replace('.', '/') + ".class";
            URL url = new URL(baseUrl, path);
            byte[] bytes = url.openStream().readAllBytes();
            return defineClass(name, bytes, 0, bytes.length);
        } catch (IOException e) {
            throw new ClassNotFoundException(name, e);
        }
    }
}

// Use Case 3: Plugin System
class PluginManager {

    public Plugin loadPlugin(Path jarPath) throws Exception {
        // Each plugin gets isolated ClassLoader
        URLClassLoader loader = new URLClassLoader(
            new URL[] { jarPath.toUri().toURL() },
            getClass().getClassLoader()
        );

        Class<?> clazz = loader.loadClass("com.example.PluginImpl");
        return (Plugin) clazz.getDeclaredConstructor().newInstance();
    }
}`
        }
      ]
    },
    {
      id: 'memory-unloading',
      name: 'Memory & Unloading',
      icon: '🗑️',
      color: '#f59e0b',
      description: 'Understanding class memory management, Metaspace, and when classes can be garbage collected.',
      diagram: MetaspaceDiagram,
      details: [
        {
          name: 'Class Unloading',
          explanation: 'Classes can be garbage collected when three conditions are met: no instances of the class exist, no references to the Class object remain, and the ClassLoader that loaded the class is unreachable. System classes loaded by the Bootstrap ClassLoader are never unloaded. Class unloading is important for long-running applications that dynamically load classes.',
          codeExample: `// Class Unloading Conditions
// A class can be unloaded only when:

// 1. No instances exist
MyClass obj = new MyClass();
obj = null;  // Instance eligible for GC

// 2. No references to Class object
Class<?> clazz = MyClass.class;
clazz = null;  // But other refs may exist!

// 3. ClassLoader is unreachable
MyClassLoader loader = new MyClassLoader();
Class<?> c = loader.loadClass("MyClass");
Object instance = c.getDeclaredConstructor().newInstance();

// Make everything unreachable
loader = null;
c = null;
instance = null;

// NOW MyClass can be unloaded by GC

// System classes NEVER unloaded
String.class.getClassLoader();  // null (Bootstrap)
// Bootstrap loader always reachable
// String class never unloaded

// Common leak: static references
class MyClass {
    static final List<Object> CACHE = new ArrayList<>();
}
// Even if ClassLoader unreachable,
// static field keeps class alive!`
        },
        {
          name: 'Metaspace',
          diagram: MetaspaceDiagram,
          explanation: 'In Java 8+, class metadata is stored in Metaspace, which uses native memory instead of heap. Unlike PermGen (Java 7), Metaspace grows automatically up to MaxMetaspaceSize. This eliminates the common PermGen OutOfMemoryError. Metaspace is cleaned during full GCs when classes are unloaded.',
          codeExample: `// Metaspace (Java 8+)
// Replaces PermGen from Java 7

// Key differences:
// ✅ Native memory (not heap)
// ✅ Auto-grows (within limits)
// ✅ No fixed size by default
// ✅ Better GC behavior

// JVM Flags
// -XX:MetaspaceSize=256m        Initial size
// -XX:MaxMetaspaceSize=512m     Maximum size (default: unlimited)
// -XX:MinMetaspaceFreeRatio=40  Min % free after GC
// -XX:MaxMetaspaceFreeRatio=70  Max % free after GC

// What goes in Metaspace?
// - Class metadata
// - Method metadata
// - Constant pool
// - Annotations
// - JIT compiler data

// Monitoring Metaspace
MemoryPoolMXBean metaspace = ManagementFactory
    .getMemoryPoolMXBeans()
    .stream()
    .filter(p -> p.getName().contains("Metaspace"))
    .findFirst()
    .orElse(null);

if (metaspace != null) {
    MemoryUsage usage = metaspace.getUsage();
    long used = usage.getUsed();
    long max = usage.getMax();
    double percent = (used * 100.0) / max;

    System.out.printf("Metaspace: %d MB / %d MB (%.1f%%)%n",
        used / 1_048_576, max / 1_048_576, percent);
}`
        },
        {
          name: 'Common Issues',
          explanation: 'Metaspace issues typically occur from class loader leaks, excessive class generation, or heavy reflection/proxy usage. Symptoms include OutOfMemoryError: Metaspace even with sufficient heap. Common causes: forgetting to close ClassLoaders, frameworks that generate many classes (Spring, Hibernate), and unbounded dynamic proxy creation.',
          codeExample: `// Common Metaspace Issues

// Issue 1: ClassLoader Leak
// Web app redeployment without cleanup
class ServletContextListener {
    public void contextDestroyed(ServletContextEvent sce) {
        // ❌ Forgot to cleanup
        // ClassLoader keeps references
        // Old classes never unloaded

        // ✅ Proper cleanup
        ThreadLocal.remove();  // Clear ThreadLocals
        // Unregister JDBC drivers
        // Stop threads
        // Clear static caches
    }
}

// Issue 2: Too Many Classes
// Dynamic proxy generation
interface Service { void execute(); }

for (int i = 0; i < 1_000_000; i++) {
    // Each call generates new class!
    Service proxy = (Service) Proxy.newProxyInstance(
        Service.class.getClassLoader(),
        new Class[] { Service.class },
        (obj, method, args) -> {
            System.out.println("Executing");
            return null;
        }
    );
    // Classes accumulate in Metaspace
}

// Issue 3: Reflection Heavy Code
// Libraries like Spring, Hibernate generate classes
// CGLib proxies for @Transactional, @Cacheable, etc.
@Service
@Transactional  // Generates proxy class
public class MyService {
    @Cacheable    // Another proxy class
    public void method() { }
}

// Diagnosis
// Use: -XX:+TraceClassLoading
//      -XX:+TraceClassUnloading
// Monitor class count
RuntimeMXBean runtime = ManagementFactory.getRuntimeMXBean();
long classCount = runtime.getUptime();  // Loaded classes

// Increase Metaspace if needed
// -XX:MaxMetaspaceSize=1024m`
        }
      ]
    },
    {
      id: 'context-classloader',
      name: 'Context ClassLoader',
      icon: '🔄',
      color: '#ec4899',
      description: 'Thread context ClassLoader breaks the delegation hierarchy for SPI and service loading.',
      diagram: ContextClassLoaderDiagram,
      details: [
        {
          name: 'The Problem',
          diagram: ContextClassLoaderDiagram,
          explanation: 'The delegation model has a problem: parent ClassLoaders cannot load classes from child ClassLoaders. This is an issue when core Java classes (loaded by Bootstrap) need to load application-specific implementations. For example, JDBC DriverManager (Bootstrap) needs to load JDBC drivers (Application classpath). Context ClassLoader solves this.',
          codeExample: `// The Problem with Delegation
// ────────────────────────────────────────

// DriverManager is in java.sql (Bootstrap ClassLoader)
package java.sql;
public class DriverManager {
    static {
        // How do we load MySQL driver from application classpath?
        // Bootstrap can't access Application ClassLoader!
    }
}

// MySQL Driver is in application classpath
package com.mysql.cj.jdbc;
public class Driver implements java.sql.Driver {
    static {
        // Register with DriverManager
        DriverManager.registerDriver(new Driver());
    }
}

// Problem: Bootstrap ClassLoader (parent)
//          cannot delegate DOWN to
//          Application ClassLoader (child)

// Delegation is upward only:
// Application → Platform → Bootstrap
// But we need:
// Bootstrap → ??? → Application

// Solution: Context ClassLoader!`
        },
        {
          name: 'The Solution',
          explanation: 'Thread.currentThread().getContextClassLoader() provides a way for core classes to access application classes. Each thread has a context ClassLoader (usually the Application ClassLoader). Core classes use this to load implementations. The Service Provider Interface (SPI) mechanism uses context ClassLoader to discover services.',
          codeExample: `// Context ClassLoader Solution
// ────────────────────────────────────────

// Get context ClassLoader
ClassLoader contextLoader = Thread.currentThread()
    .getContextClassLoader();

// Set context ClassLoader
Thread.currentThread().setContextClassLoader(myLoader);

// JDBC DriverManager uses it
public class DriverManager {
    static {
        // Uses Thread's context loader
        ServiceLoader<Driver> drivers =
            ServiceLoader.load(Driver.class);

        // ServiceLoader.load() internally does:
        // ClassLoader cl = Thread.currentThread()
        //     .getContextClassLoader();

        for (Driver driver : drivers) {
            registerDriver(driver);
        }
    }
}

// In your library code, always check context loader
public void loadPlugin(String className) throws Exception {
    // Try context loader first
    ClassLoader loader = Thread.currentThread()
        .getContextClassLoader();

    // Fallback to class's loader
    if (loader == null) {
        loader = getClass().getClassLoader();
    }

    Class<?> clazz = loader.loadClass(className);
    // ...
}`
        },
        {
          name: 'Service Provider Interface',
          explanation: 'SPI is Java\'s mechanism for loading services using context ClassLoader. Place a file in META-INF/services/ named after the service interface, containing implementation class names. ServiceLoader.load() uses the context ClassLoader to discover and load these implementations. Java 9+ modules provide a better alternative with provides/uses directives.',
          codeExample: `// Service Provider Interface (SPI)
// ────────────────────────────────────────

// 1. Define service interface
package com.example;
public interface Plugin {
    void execute();
}

// 2. Implement the service
package com.example.impl;
public class MyPlugin implements Plugin {
    public void execute() {
        System.out.println("Plugin executed!");
    }
}

// 3. Create service file
// File: META-INF/services/com.example.Plugin
// Content:
com.example.impl.MyPlugin

// 4. Load services
ServiceLoader<Plugin> loader = ServiceLoader.load(Plugin.class);
for (Plugin plugin : loader) {
    plugin.execute();
}

// ServiceLoader uses context ClassLoader internally
// Equivalent to:
ClassLoader cl = Thread.currentThread()
    .getContextClassLoader();
ServiceLoader<Plugin> loader =
    ServiceLoader.load(Plugin.class, cl);

// Java 9+ Module System Alternative
// In module-info.java:

// Service interface module:
module com.example.api {
    exports com.example;
    uses com.example.Plugin;
}

// Service implementation module:
module com.example.impl {
    requires com.example.api;
    provides com.example.Plugin
        with com.example.impl.MyPlugin;
}

// Much cleaner than SPI files!`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '💡',
      color: '#06b6d4',
      description: 'Common ClassLoader interview questions and answers with detailed explanations.',
      diagram: InterviewDiagram,
      details: [
        {
          name: 'Core Concepts',
          explanation: 'Q1: What are the phases of class loading? A: Loading (read bytecode, create Class object), Linking (Verification, Preparation, Resolution), Initialization (run static initializers). Q2: What is the delegation model? A: Child ClassLoader delegates to parent first, only loads if parent cannot. Q3: When is a class initialized? A: First new instance, static method call, non-final static field access, subclass initialization, Class.forName(), or main class.',
          codeExample: `// Q1: Class Loading Phases
// ──────────────────────────────────────────────
// LOADING
//   - Find .class file
//   - Read bytecode
//   - Create Class object in Metaspace

// LINKING
//   Verification: Check bytecode valid (0xCAFEBABE, types, etc.)
//   Preparation: Allocate static fields, set defaults (0, null, false)
//   Resolution: Symbolic refs → direct refs (can be lazy)

// INITIALIZATION
//   - Execute static initializers
//   - Run <clinit> method
//   - Happens on first active use

// Q2: Delegation Model
// ──────────────────────────────────────────────
// Before loading, delegate to parent
// Parent tries first
// Only if parent fails, child loads

class MyLoader extends ClassLoader {
    protected Class<?> loadClass(String name) {
        // 1. Check if loaded
        Class<?> c = findLoadedClass(name);
        if (c != null) return c;

        // 2. DELEGATE to parent
        try {
            c = getParent().loadClass(name);
        } catch (ClassNotFoundException e) {
            // Parent failed
        }

        // 3. Load ourselves
        if (c == null) {
            c = findClass(name);
        }
        return c;
    }
}

// Q3: When is class initialized?
// ──────────────────────────────────────────────
// ✅ new MyClass()              First instance
// ✅ MyClass.staticMethod()     Static method call
// ✅ MyClass.staticField        Non-final static field
// ✅ Subclass initialization    Parent initialized first
// ✅ Class.forName("MyClass")   Explicit loading
// ✅ Main class at startup      JVM entry point

// ❌ NOT initialized:
final static int X = 10;  // Compile-time constant
MyClass.class;            // Just getting Class object
Class.forName("MyClass", false, loader);  // initialize=false`
        },
        {
          name: 'Advanced Questions',
          diagram: InterviewDiagram,
          explanation: 'Q4: Can the same class be loaded twice? A: Yes, by different ClassLoaders. Class identity = class name + ClassLoader. Same bytecode, different loader = different Class objects. Q5: PermGen vs Metaspace? A: PermGen (Java 7) was fixed-size heap memory for class metadata. Metaspace (Java 8+) is native memory, auto-grows, eliminates PermGen OutOfMemoryErrors.',
          codeExample: `// Q4: Same Class Loaded Twice
// ──────────────────────────────────────────────
ClassLoader loader1 = new MyClassLoader();
ClassLoader loader2 = new MyClassLoader();

Class<?> c1 = loader1.loadClass("MyClass");
Class<?> c2 = loader2.loadClass("MyClass");

c1 == c2;  // FALSE! Different Class objects

// Why? Class identity = name + loader
// Same bytecode, different loader = different class

Object obj1 = c1.getDeclaredConstructor().newInstance();
Object obj2 = c2.getDeclaredConstructor().newInstance();

// ClassCastException!
// MyClass instance1 = (MyClass) obj2;

// Use case: Web app isolation in Tomcat
// Each WAR has its own ClassLoader
// Classes don't interfere

// Q5: PermGen vs Metaspace
// ──────────────────────────────────────────────

// Java 7 - PermGen
// -XX:PermSize=256m         Initial
// -XX:MaxPermSize=512m      Maximum
// ❌ Fixed size
// ❌ Part of heap
// ❌ Common OutOfMemoryError: PermGen space

// Java 8+ - Metaspace
// -XX:MetaspaceSize=256m        Initial
// -XX:MaxMetaspaceSize=512m     Maximum (default: unlimited)
// ✅ Native memory (not heap)
// ✅ Auto-grows
// ✅ Rare OutOfMemoryError
// ✅ Better GC behavior

// Why change?
// - PermGen size tuning was difficult
// - Class metadata doesn't need to be in heap
// - Native memory is more flexible`
        },
        {
          name: 'Error Scenarios',
          explanation: 'Q6: ClassNotFoundException vs NoClassDefFoundError? A: ClassNotFoundException is checked exception from loadClass() when class not found. NoClassDefFoundError is thrown when class was present at compile time but not at runtime, or class initialization failed. Q7: What about array ClassLoaders? A: Arrays have the same ClassLoader as their component type. Primitive arrays return null (Bootstrap).',
          codeExample: `// Q6: ClassNotFoundException vs NoClassDefFoundError
// ──────────────────────────────────────────────────────

// ClassNotFoundException (Checked Exception)
// When: Explicit loading fails
try {
    Class.forName("com.example.NonExistent");
} catch (ClassNotFoundException e) {
    // Class not found at all
}

try {
    loader.loadClass("Missing");
} catch (ClassNotFoundException e) {
    // ClassLoader couldn't find it
}

// NoClassDefFoundError (Error)
// When: Class was there at compile time but not at runtime
public class MyClass {
    // Depends on Dependency class
    private Dependency dep;
}

// If Dependency.class is deleted:
MyClass obj = new MyClass();  // NoClassDefFoundError

// Or: Class initialization failed
class BadClass {
    static {
        throw new RuntimeException("Init failed!");
    }
}

BadClass obj = new BadClass();  // ExceptionInInitializerError
// Later attempt:
BadClass obj2 = new BadClass(); // NoClassDefFoundError

// Q7: Array ClassLoaders
// ──────────────────────────────────────────────────────
// Arrays have same loader as component type

int[].class.getClassLoader();      // null (primitive)
String[].class.getClassLoader();   // null (String is Bootstrap)
MyClass[].class.getClassLoader();  // Same as MyClass

// Multi-dimensional arrays
MyClass[][].class.getClassLoader();  // Same as MyClass

// Array class names are weird:
int[].class.getName();        // "[I"
String[].class.getName();     // "[Ljava.lang.String;"
MyClass[][].class.getName();  // "[[Lcom.example.MyClass;"`
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
      { name: 'Class Loading', icon: '📦', page: 'ClassLoadingInternals' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #78350f 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(245, 158, 11, 0.2)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '0.5rem',
    color: '#fbbf24',
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
        <h1 style={titleStyle}>Class Loading Internals</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)'
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
          colors={CLASSLOADING_COLORS}
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
              colors={CLASSLOADING_COLORS}
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

export default ClassLoadingInternals

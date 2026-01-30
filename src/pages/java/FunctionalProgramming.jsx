/**
 * Functional Programming in Java
 *
 * This page covers functional programming concepts in Java including pure functions,
 * lambda expressions, higher-order functions, immutability, streams, and composition.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const FUNCTIONAL_PROG_COLORS = {
  primary: '#f43f5e',              // Rose - main accent color
  primaryHover: '#fb7185',         // Lighter rose for hover
  bg: 'rgba(244, 63, 94, 0.1)',    // Background with transparency
  border: 'rgba(244, 63, 94, 0.3)', // Border color
  arrow: '#e11d48',                // Arrow/indicator color
  hoverBg: 'rgba(244, 63, 94, 0.2)', // Hover background
  topicBg: 'rgba(244, 63, 94, 0.2)'  // Topic card background
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

const PureFunctionDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="pureArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f43f5e" />
      </marker>
      <linearGradient id="pureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#fb7185" stopOpacity="0.8"/>
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Pure Function: Same Input → Same Output (No Side Effects)
    </text>

    {/* Input Box */}
    <rect x="50" y="70" width="140" height="70" rx="10" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Input</text>
    <text x="120" y="120" textAnchor="middle" fill="#93c5fd" fontSize="10">a = 2, b = 3</text>

    {/* Pure Function Box */}
    <rect x="280" y="60" width="180" height="90" rx="10" fill="url(#pureGradient)" stroke="#f43f5e" strokeWidth="2"/>
    <text x="370" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Pure Function</text>
    <text x="370" y="110" textAnchor="middle" fill="#fecdd3" fontSize="10">add(a, b)</text>
    <text x="370" y="130" textAnchor="middle" fill="#fecdd3" fontSize="9">return a + b</text>

    {/* Output Box */}
    <rect x="560" y="70" width="140" height="70" rx="10" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="630" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Output</text>
    <text x="630" y="120" textAnchor="middle" fill="#86efac" fontSize="10">Always 5</text>

    {/* Arrows */}
    <line x1="190" y1="105" x2="275" y2="105" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#pureArrow)"/>
    <line x1="460" y1="105" x2="555" y2="105" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#pureArrow)"/>

    {/* No Side Effects Indicator */}
    <rect x="280" y="165" width="180" height="35" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="370" y="187" textAnchor="middle" fill="#4ade80" fontSize="10">No external state modified</text>
  </svg>
)

const ImmutabilityDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="immArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f43f5e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Immutability: New Objects Instead of Modification
    </text>

    {/* Original Object */}
    <rect x="50" y="60" width="160" height="80" rx="10" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="130" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Original Person</text>
    <text x="130" y="105" textAnchor="middle" fill="#93c5fd" fontSize="9">name: "Alice"</text>
    <text x="130" y="120" textAnchor="middle" fill="#93c5fd" fontSize="9">age: 25</text>

    {/* withAge() Method */}
    <rect x="300" y="65" width="140" height="70" rx="10" fill="#f43f5e" stroke="#fb7185" strokeWidth="2"/>
    <text x="370" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">withAge(26)</text>
    <text x="370" y="115" textAnchor="middle" fill="#fecdd3" fontSize="9">Creates new instance</text>

    {/* New Object */}
    <rect x="530" y="60" width="160" height="80" rx="10" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="610" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">New Person</text>
    <text x="610" y="105" textAnchor="middle" fill="#86efac" fontSize="9">name: "Alice"</text>
    <text x="610" y="120" textAnchor="middle" fill="#86efac" fontSize="9">age: 26</text>

    {/* Arrows */}
    <line x1="210" y1="100" x2="295" y2="100" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#immArrow)"/>
    <line x1="440" y1="100" x2="525" y2="100" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#immArrow)"/>

    {/* Original Unchanged Indicator */}
    <line x1="130" y1="140" x2="130" y2="190" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,3"/>
    <rect x="50" y="190" width="160" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="130" y="212" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Original Unchanged</text>
    <text x="130" y="228" textAnchor="middle" fill="#93c5fd" fontSize="9">Still age: 25</text>
  </svg>
)

const CompositionDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="compArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f43f5e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Function Composition: f.andThen(g) = g(f(x))
    </text>

    {/* Input */}
    <rect x="30" y="70" width="100" height="60" rx="8" fill="#64748b" stroke="#94a3b8" strokeWidth="2"/>
    <text x="80" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Input</text>
    <text x="80" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="10">"hello"</text>

    {/* Function 1: trim */}
    <rect x="170" y="65" width="120" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="230" y="92" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">trim()</text>
    <text x="230" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="9">Remove spaces</text>

    {/* Function 2: toUpperCase */}
    <rect x="330" y="65" width="120" height="70" rx="8" fill="#f43f5e" stroke="#fb7185" strokeWidth="2"/>
    <text x="390" y="92" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">toUpperCase()</text>
    <text x="390" y="115" textAnchor="middle" fill="#fecdd3" fontSize="9">Capitalize</text>

    {/* Function 3: addPrefix */}
    <rect x="490" y="65" width="120" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="550" y="92" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">addPrefix()</text>
    <text x="550" y="115" textAnchor="middle" fill="#fde68a" fontSize="9">Add "MSG: "</text>

    {/* Output */}
    <rect x="650" y="70" width="120" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="710" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Output</text>
    <text x="710" y="112" textAnchor="middle" fill="#86efac" fontSize="9">"MSG: HELLO"</text>

    {/* Arrows */}
    <line x1="130" y1="100" x2="165" y2="100" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#compArrow)"/>
    <line x1="290" y1="100" x2="325" y2="100" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#compArrow)"/>
    <line x1="450" y1="100" x2="485" y2="100" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#compArrow)"/>
    <line x1="610" y1="100" x2="645" y2="100" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#compArrow)"/>

    {/* Composed Function Label */}
    <rect x="170" y="160" width="440" height="40" rx="8" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" strokeWidth="1"/>
    <text x="390" y="185" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold">
      trim.andThen(toUpperCase).andThen(addPrefix)
    </text>
  </svg>
)

const LambdaDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="lambdaArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f43f5e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Lambda Expression: (parameters) → expression
    </text>

    {/* Anonymous Class (Old Way) */}
    <rect x="30" y="55" width="280" height="110" rx="10" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="2"/>
    <text x="170" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Before Java 8 (Verbose)</text>
    <text x="170" y="100" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="monospace">{`new Comparator&lt;String&gt;() {'{'}`}</text>
    <text x="170" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="monospace">  int compare(s1, s2) {'{'}</text>
    <text x="170" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="monospace">    return s1.length() - s2.length();</text>
    <text x="170" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="monospace">  {'}'}</text>

    {/* Arrow */}
    <line x1="330" y1="110" x2="380" y2="110" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#lambdaArrow)"/>
    <text x="355" y="100" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">Java 8</text>

    {/* Lambda (New Way) */}
    <rect x="400" y="75" width="280" height="70" rx="10" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="2"/>
    <text x="540" y="95" textAnchor="middle" fill="#fb7185" fontSize="10" fontWeight="bold">Lambda Expression (Concise)</text>
    <text x="540" y="120" textAnchor="middle" fill="#fecdd3" fontSize="12" fontFamily="monospace" fontWeight="bold">
      (s1, s2) → s1.length() - s2.length()
    </text>

    {/* Benefits */}
    <text x="540" y="170" textAnchor="middle" fill="#22c55e" fontSize="10">Less boilerplate, more readable</text>
  </svg>
)

const StreamDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="streamArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Stream Pipeline: Declarative Data Processing
    </text>

    {/* Source */}
    <rect x="30" y="60" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Source</text>
    <text x="80" y="102" textAnchor="middle" fill="#93c5fd" fontSize="8">{`List&lt;Person&gt;`}</text>

    {/* Filter */}
    <rect x="170" y="60" width="110" height="60" rx="8" fill="#f43f5e" stroke="#fb7185" strokeWidth="2"/>
    <text x="225" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">filter()</text>
    <text x="225" y="100" textAnchor="middle" fill="#fecdd3" fontSize="8">{`age &gt;= 18`}</text>

    {/* Map */}
    <rect x="320" y="60" width="110" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="375" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">map()</text>
    <text x="375" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="8">getName()</text>

    {/* Sorted */}
    <rect x="470" y="60" width="110" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="525" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">sorted()</text>
    <text x="525" y="100" textAnchor="middle" fill="#fde68a" fontSize="8">alphabetically</text>

    {/* Collect */}
    <rect x="620" y="60" width="110" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="675" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">collect()</text>
    <text x="675" y="100" textAnchor="middle" fill="#86efac" fontSize="8">toList()</text>

    {/* Arrows */}
    <line x1="130" y1="90" x2="165" y2="90" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#streamArrow)"/>
    <line x1="280" y1="90" x2="315" y2="90" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#streamArrow)"/>
    <line x1="430" y1="90" x2="465" y2="90" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#streamArrow)"/>
    <line x1="580" y1="90" x2="615" y2="90" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#streamArrow)"/>

    {/* Lazy Evaluation Note */}
    <rect x="170" y="140" width="440" height="35" rx="6" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="390" y="163" textAnchor="middle" fill="#22d3ee" fontSize="10">
      Lazy evaluation: intermediate ops don't execute until terminal op (collect)
    </text>
  </svg>
)

const HigherOrderFunctionDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="hofArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f43f5e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Higher-Order Function: Functions as Parameters/Return Values
    </text>

    {/* Function Factory */}
    <rect x="100" y="55" width="220" height="90" rx="10" fill="#f43f5e" stroke="#fb7185" strokeWidth="2"/>
    <text x="210" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">createMultiplier(factor)</text>
    <text x="210" y="100" textAnchor="middle" fill="#fecdd3" fontSize="9">Higher-Order Function</text>
    <text x="210" y="120" textAnchor="middle" fill="#fecdd3" fontSize="9" fontFamily="monospace">return n → n * factor</text>

    {/* Arrow to returned functions */}
    <line x1="320" y1="80" x2="400" y2="60" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#hofArrow)"/>
    <line x1="320" y1="120" x2="400" y2="140" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#hofArrow)"/>

    {/* Returned Function 1 */}
    <rect x="410" y="40" width="170" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="495" y="60" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">doubler = createMultiplier(2)</text>
    <text x="495" y="77" textAnchor="middle" fill="#c4b5fd" fontSize="9">n → n * 2</text>

    {/* Returned Function 2 */}
    <rect x="410" y="120" width="170" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="495" y="140" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">tripler = createMultiplier(3)</text>
    <text x="495" y="157" textAnchor="middle" fill="#86efac" fontSize="9">n → n * 3</text>

    {/* Results */}
    <line x1="580" y1="65" x2="640" y2="65" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#hofArrow)"/>
    <text x="680" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10">doubler(5) = 10</text>

    <line x1="580" y1="145" x2="640" y2="145" stroke="#22c55e" strokeWidth="2" markerEnd="url(#hofArrow)"/>
    <text x="680" y="150" textAnchor="middle" fill="#4ade80" fontSize="10">tripler(5) = 15</text>

    {/* Label */}
    <text x="210" y="180" textAnchor="middle" fill="#64748b" fontSize="9">Returns a function</text>
  </svg>
)

const ReactiveDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="reactiveArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Reactive Streams: Asynchronous Data Flow with Backpressure
    </text>

    {/* Publisher */}
    <rect x="50" y="60" width="140" height="70" rx="10" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Publisher</text>
    <text x="120" y="105" textAnchor="middle" fill="#93c5fd" fontSize="9">Emits data</text>
    <text x="120" y="120" textAnchor="middle" fill="#93c5fd" fontSize="8">over time</text>

    {/* Data Flow */}
    <rect x="250" y="65" width="200" height="60" rx="10" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="2"/>
    <text x="350" y="90" textAnchor="middle" fill="#fb7185" fontSize="10" fontWeight="bold">onNext(item)</text>
    <text x="350" y="110" textAnchor="middle" fill="#fecdd3" fontSize="8">Data items flow asynchronously</text>

    {/* Subscriber */}
    <rect x="510" y="60" width="140" height="70" rx="10" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="580" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Subscriber</text>
    <text x="580" y="105" textAnchor="middle" fill="#86efac" fontSize="9">Reacts to data</text>
    <text x="580" y="120" textAnchor="middle" fill="#86efac" fontSize="8">when it arrives</text>

    {/* Arrows */}
    <line x1="190" y1="95" x2="245" y2="95" stroke="#ef4444" strokeWidth="2" markerEnd="url(#reactiveArrow)"/>
    <line x1="450" y1="95" x2="505" y2="95" stroke="#ef4444" strokeWidth="2" markerEnd="url(#reactiveArrow)"/>

    {/* Backpressure */}
    <rect x="250" y="150" width="200" height="45" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="350" y="170" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Backpressure</text>
    <text x="350" y="185" textAnchor="middle" fill="#fde68a" fontSize="8">request(n) controls flow rate</text>

    {/* Backpressure Arrow */}
    <line x1="510" y1="145" x2="455" y2="165" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="490" y="165" textAnchor="middle" fill="#fbbf24" fontSize="8">demand</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function FunctionalProgramming({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'pure-functions',
      name: 'Pure Functions',
      icon: '🔄',
      color: '#9333ea',
      description: 'Functions that always return the same output for the same input and have no side effects',
      diagram: PureFunctionDiagram,
      details: [
        {
          name: 'Deterministic Behavior',
          diagram: PureFunctionDiagram,
          explanation: 'Pure functions always produce the same output for the same input parameters. This predictability makes code easier to test, debug, and reason about. For example, add(2, 3) will always return 5, no matter how many times you call it.',
          codeExample: `// Pure function - always returns same output for same input
public static int add(int a, int b) {
    return a + b;
}

// Usage
int result1 = add(2, 3);  // Always 5
int result2 = add(2, 3);  // Still 5, guaranteed!

// Another pure function example
public static String formatName(String firstName, String lastName) {
    return firstName.trim() + " " + lastName.trim();
}

// Pure function for calculating
public static double calculateCircleArea(double radius) {
    return Math.PI * radius * radius;
}`
        },
        {
          name: 'No Side Effects',
          explanation: 'Pure functions don\'t modify external state or perform I/O operations. They don\'t change global variables, modify input parameters, or interact with the outside world. This isolation makes code safer and more maintainable.',
          codeExample: `// IMPURE - modifies external state (avoid this)
private static int counter = 0;
public static int incrementAndGet() {
    return ++counter;  // Side effect: modifies counter
}

// PURE - no side effects
public static int increment(int value) {
    return value + 1;  // Returns new value, doesn't modify anything
}

// IMPURE - modifies input parameter (avoid this)
public static void addItem(List<String> list, String item) {
    list.add(item);  // Side effect: modifies input
}

// PURE - returns new list without modifying original
public static List<String> addItemPure(List<String> list, String item) {
    List<String> newList = new ArrayList<>(list);
    newList.add(item);
    return newList;  // Original list unchanged
}`
        },
        {
          name: 'Referential Transparency',
          explanation: 'A function call can be replaced with its result value without changing the program\'s behavior. This property enables compiler optimizations like memoization and makes code easier to refactor and parallelize.',
          codeExample: `// Referentially transparent function
public static int square(int x) {
    return x * x;
}

// These are equivalent due to referential transparency:
int result1 = square(5) + square(5);
int result2 = 25 + 25;  // Can replace function call with result

// Enables memoization
Map<Integer, Integer> cache = new HashMap<>();
public static int memoizedSquare(int x) {
    return cache.computeIfAbsent(x, key -> key * key);
}

// NOT referentially transparent (depends on external state)
public static String getCurrentTime() {
    return LocalDateTime.now().toString();  // Returns different value each call
}`
        },
        {
          name: 'Enhanced Testability',
          explanation: 'Pure functions are extremely easy to test because they have no dependencies on external state. You can test them in isolation with simple input-output assertions, without complex mocking or setup.',
          codeExample: `// Pure function - easy to test
public static int calculateDiscount(int price, double discountRate) {
    return (int) (price * (1 - discountRate));
}

// Simple, isolated unit tests
@Test
void testCalculateDiscount() {
    assertEquals(90, calculateDiscount(100, 0.10));
    assertEquals(75, calculateDiscount(100, 0.25));
    assertEquals(100, calculateDiscount(100, 0.00));
    assertEquals(0, calculateDiscount(100, 1.00));
}

// Pure function for validation
public static boolean isValidEmail(String email) {
    return email != null &&
           email.contains("@") &&
           email.indexOf("@") < email.lastIndexOf(".");
}

@Test
void testIsValidEmail() {
    assertTrue(isValidEmail("user@example.com"));
    assertFalse(isValidEmail("invalid-email"));
}`
        },
        {
          name: 'Thread Safety',
          explanation: 'Since pure functions don\'t modify shared state, they are inherently thread-safe and can be safely called from multiple threads concurrently without synchronization.',
          codeExample: `// Thread-safe pure function - no synchronization needed
public static int multiply(int a, int b) {
    return a * b;
}

// Safe to call from multiple threads
ExecutorService executor = Executors.newFixedThreadPool(4);
List<Future<Integer>> futures = new ArrayList<>();

for (int i = 0; i < 100; i++) {
    final int num = i;
    futures.add(executor.submit(() -> multiply(num, 2)));
}

// All results are correct without any race conditions
for (Future<Integer> future : futures) {
    System.out.println(future.get());
}

// Pure transformation in parallel streams
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> squared = numbers.parallelStream()
    .map(n -> n * n)  // Pure operation - thread-safe
    .collect(Collectors.toList());`
        }
      ]
    },
    {
      id: 'lambda-expressions',
      name: 'Lambda Expressions',
      icon: '\u03BB',
      color: '#8b5cf6',
      description: 'Concise way to represent anonymous functions in Java 8+',
      diagram: LambdaDiagram,
      details: [
        {
          name: 'Anonymous Functions',
          diagram: LambdaDiagram,
          explanation: 'Lambdas provide a clean syntax for creating functions without naming them. Instead of verbose anonymous classes, you can write (x, y) -> x + y. This reduces boilerplate and makes code more readable.',
          codeExample: `// Before Java 8 - verbose anonymous class
Comparator<String> oldWay = new Comparator<String>() {
    @Override
    public int compare(String s1, String s2) {
        return s1.length() - s2.length();
    }
};

// With lambda - clean and concise
Comparator<String> newWay = (s1, s2) -> s1.length() - s2.length();

// Single parameter - parentheses optional
Consumer<String> printer = s -> System.out.println(s);

// Multiple statements - use braces
Function<String, Integer> parser = s -> {
    s = s.trim();
    return Integer.parseInt(s);
};`
        },
        {
          name: 'Functional Interfaces',
          explanation: 'Lambdas implement functional interfaces (interfaces with a single abstract method). Java provides built-in interfaces like Predicate, Function, Consumer, and Supplier that cover common use cases.',
          codeExample: `// Common functional interfaces
Predicate<String> isEmpty = s -> s.isEmpty();
Function<String, Integer> length = s -> s.length();
Consumer<String> print = s -> System.out.println(s);
Supplier<Double> random = () -> Math.random();
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// Using with collections
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

names.stream()
    .filter(s -> s.length() > 3)         // Predicate
    .map(s -> s.toUpperCase())           // Function
    .forEach(s -> System.out.println(s)); // Consumer

// Custom functional interface
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}
Calculator multiply = (a, b) -> a * b;`
        },
        {
          name: 'Method References',
          explanation: 'Method references (::) are shorthand for lambdas that call a single method. String::toUpperCase is equivalent to s -> s.toUpperCase(). This makes code even more concise and readable.',
          codeExample: `// Four types of method references

// 1. Static method reference
Function<String, Integer> parser = Integer::parseInt;
// Equivalent to: s -> Integer.parseInt(s)

// 2. Instance method on parameter
Function<String, String> upper = String::toUpperCase;
// Equivalent to: s -> s.toUpperCase()

// 3. Instance method on specific object
String prefix = "Hello, ";
Function<String, String> greeter = prefix::concat;
// Equivalent to: s -> prefix.concat(s)

// 4. Constructor reference
Supplier<ArrayList<String>> listFactory = ArrayList::new;
// Equivalent to: () -> new ArrayList<>()

// Practical usage
List<String> names = Arrays.asList("alice", "bob", "charlie");
names.stream()
    .map(String::toUpperCase)
    .forEach(System.out::println);`
        },
        {
          name: 'Closure Capability',
          explanation: 'Lambdas can capture variables from their enclosing scope. Captured variables must be effectively final, ensuring thread safety and preventing subtle bugs from mutable captured state.',
          codeExample: `// Lambda capturing local variable
String greeting = "Hello";  // Effectively final
Function<String, String> greeter = name -> greeting + ", " + name;
System.out.println(greeter.apply("World"));  // "Hello, World"

// Capturing instance variables
class MessageSender {
    private String prefix = "INFO: ";

    public Consumer<String> getLogger() {
        return message -> System.out.println(prefix + message);
    }
}

// This would NOT compile - variable must be effectively final
// String message = "Hello";
// Runnable r = () -> System.out.println(message);
// message = "Goodbye";  // Error: captured variable must be final

// Workaround with AtomicReference for mutable capture
AtomicInteger counter = new AtomicInteger(0);
Runnable increment = () -> counter.incrementAndGet();`
        },
        {
          name: 'Type Inference',
          explanation: 'The compiler can often infer lambda parameter types from context, allowing you to write (x, y) -> x + y instead of (Integer x, Integer y) -> x + y. This reduces verbosity while maintaining type safety.',
          codeExample: `// Type inference from context
List<String> names = Arrays.asList("Alice", "Bob");

// Compiler infers 's' is String from List<String>
names.forEach(s -> System.out.println(s.toUpperCase()));

// Explicit types (rarely needed)
BiFunction<Integer, Integer, Integer> add =
    (Integer a, Integer b) -> a + b;

// Inferred types (preferred)
BiFunction<Integer, Integer, Integer> multiply = (a, b) -> a * b;

// Type inference with var (Java 11+)
BiFunction<String, String, String> concat = (var a, var b) -> a + b;

// Complex inference example
Map<String, List<Integer>> data = new HashMap<>();
data.forEach((key, values) -> {
    // Compiler infers: key is String, values is List<Integer>
    System.out.println(key + ": " + values.size());
});`
        }
      ]
    },
    {
      id: 'higher-order-functions',
      name: 'Higher-Order Functions',
      icon: '📈',
      color: '#a855f7',
      description: 'Functions that take other functions as parameters or return functions',
      diagram: HigherOrderFunctionDiagram,
      details: [
        {
          name: 'Functions as Parameters',
          diagram: HigherOrderFunctionDiagram,
          explanation: 'Higher-order functions accept other functions as arguments, enabling flexible, reusable code. For example, a filterList function that takes a Predicate can filter any list with any condition, maximizing code reuse.',
          codeExample: `// Higher-order function that takes a function as parameter
public static <T> List<T> filter(List<T> list, Predicate<T> condition) {
    List<T> result = new ArrayList<>();
    for (T item : list) {
        if (condition.test(item)) {
            result.add(item);
        }
    }
    return result;
}

// Usage with different predicates
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

List<Integer> evens = filter(numbers, n -> n % 2 == 0);
List<Integer> greaterThan3 = filter(numbers, n -> n > 3);
List<Integer> all = filter(numbers, n -> true);

// Transform with custom function
public static <T, R> List<R> map(List<T> list, Function<T, R> mapper) {
    return list.stream().map(mapper).collect(Collectors.toList());
}

List<String> strings = map(numbers, n -> "Number: " + n);`
        },
        {
          name: 'Functions as Return Values',
          explanation: 'Functions can create and return other functions, enabling function factories and currying. This allows you to create specialized functions from general ones, like createMultiplier(3) returning a function that multiplies by 3.',
          codeExample: `// Function factory - returns a function
public static Function<Integer, Integer> createMultiplier(int factor) {
    return n -> n * factor;
}

Function<Integer, Integer> doubler = createMultiplier(2);
Function<Integer, Integer> tripler = createMultiplier(3);

System.out.println(doubler.apply(5));  // 10
System.out.println(tripler.apply(5));  // 15

// Currying example
public static Function<Integer, Function<Integer, Integer>> curriedAdd() {
    return a -> b -> a + b;
}

Function<Integer, Integer> add5 = curriedAdd().apply(5);
System.out.println(add5.apply(3));  // 8

// Validator factory
public static Predicate<String> createLengthValidator(int minLength) {
    return s -> s != null && s.length() >= minLength;
}

Predicate<String> atLeast5 = createLengthValidator(5);
System.out.println(atLeast5.test("Hello"));  // true`
        },
        {
          name: 'Callback Patterns',
          explanation: 'Higher-order functions enable callback patterns where you pass behavior to be executed later. This is fundamental to asynchronous programming and event handling in modern applications.',
          codeExample: `// Callback pattern for async operations
public static void fetchDataAsync(String url, Consumer<String> onSuccess,
                                   Consumer<Exception> onError) {
    CompletableFuture.runAsync(() -> {
        try {
            String data = fetchFromUrl(url);
            onSuccess.accept(data);
        } catch (Exception e) {
            onError.accept(e);
        }
    });
}

// Usage
fetchDataAsync("https://api.example.com/data",
    data -> System.out.println("Received: " + data),
    error -> System.err.println("Error: " + error.getMessage())
);

// Event handler pattern
public class Button {
    private Consumer<ClickEvent> onClick;

    public void setOnClick(Consumer<ClickEvent> handler) {
        this.onClick = handler;
    }

    public void click() {
        if (onClick != null) onClick.accept(new ClickEvent());
    }
}

button.setOnClick(event -> System.out.println("Button clicked!"));`
        },
        {
          name: 'Abstraction and Reuse',
          explanation: 'By separating the control flow from the specific operation, higher-order functions enable powerful abstractions. You can write general-purpose utilities that work with any type and any operation.',
          codeExample: `// Generic retry mechanism
public static <T> T retry(Supplier<T> operation, int maxAttempts) {
    Exception lastException = null;
    for (int i = 0; i < maxAttempts; i++) {
        try {
            return operation.get();
        } catch (Exception e) {
            lastException = e;
            Thread.sleep(1000 * (i + 1));  // Exponential backoff
        }
    }
    throw new RuntimeException("Failed after " + maxAttempts, lastException);
}

// Usage with any operation
String data = retry(() -> httpClient.fetchData(url), 3);
User user = retry(() -> database.findUser(id), 5);

// Generic timing wrapper
public static <T> T timed(String name, Supplier<T> operation) {
    long start = System.currentTimeMillis();
    T result = operation.get();
    long elapsed = System.currentTimeMillis() - start;
    System.out.println(name + " took " + elapsed + "ms");
    return result;
}

List<User> users = timed("loadUsers", () -> userService.findAll());`
        },
        {
          name: 'Pipeline Construction',
          explanation: 'Higher-order functions allow building processing pipelines by chaining operations. Each function takes data and a transformation, applies it, and passes the result to the next stage.',
          codeExample: `// Building a processing pipeline
class Pipeline<T> {
    private T value;

    private Pipeline(T value) { this.value = value; }

    public static <T> Pipeline<T> of(T value) {
        return new Pipeline<>(value);
    }

    public <R> Pipeline<R> then(Function<T, R> transformer) {
        return new Pipeline<>(transformer.apply(value));
    }

    public T get() { return value; }
}

// Usage
String result = Pipeline.of("  hello world  ")
    .then(String::trim)
    .then(String::toUpperCase)
    .then(s -> s.replace(" ", "_"))
    .get();  // "HELLO_WORLD"

// Stream pipeline example
List<String> processed = users.stream()
    .filter(u -> u.isActive())
    .map(User::getEmail)
    .map(String::toLowerCase)
    .sorted()
    .collect(Collectors.toList());`
        }
      ]
    },
    {
      id: 'immutability',
      name: 'Immutability',
      icon: '🔒',
      color: '#f59e0b',
      description: 'Creating objects whose state cannot be changed after creation',
      diagram: ImmutabilityDiagram,
      details: [
        {
          name: 'Immutable Objects',
          diagram: ImmutabilityDiagram,
          explanation: 'Immutable objects have state that cannot change after construction. All fields are final, and there are no setter methods. Any "modification" creates a new instance with the changed values, leaving the original unchanged.',
          codeExample: `// Immutable class design
public final class Person {
    private final String name;
    private final int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    // "Modification" returns new instance
    public Person withAge(int newAge) {
        return new Person(this.name, newAge);
    }

    public Person withName(String newName) {
        return new Person(newName, this.age);
    }
}

// Usage
Person p1 = new Person("Alice", 25);
Person p2 = p1.withAge(26);  // p1 unchanged, p2 is new instance`
        },
        {
          name: 'Defensive Copying',
          explanation: 'When creating immutable classes that contain mutable fields (like collections), use defensive copying. Copy mutable parameters in the constructor and return copies from getters to prevent external modification.',
          codeExample: `// Immutable class with mutable field (collection)
public final class Team {
    private final String name;
    private final List<String> members;

    public Team(String name, List<String> members) {
        this.name = name;
        // Defensive copy in constructor
        this.members = new ArrayList<>(members);
    }

    public String getName() { return name; }

    // Return defensive copy from getter
    public List<String> getMembers() {
        return new ArrayList<>(members);
    }

    // Or return unmodifiable view (more efficient)
    public List<String> getMembersView() {
        return Collections.unmodifiableList(members);
    }
}

// External modifications won't affect the Team
List<String> original = new ArrayList<>(Arrays.asList("Alice", "Bob"));
Team team = new Team("Dev", original);
original.add("Charlie");  // Doesn't affect team
team.getMembers().add("Dave");  // Doesn't affect team`
        },
        {
          name: 'Thread Safety Benefits',
          explanation: 'Immutable objects are inherently thread-safe since their state can never change. Multiple threads can safely access them without synchronization, eliminating race conditions and improving performance in concurrent applications.',
          codeExample: `// Immutable objects are thread-safe by design
public final class Configuration {
    private final String host;
    private final int port;
    private final boolean ssl;

    public Configuration(String host, int port, boolean ssl) {
        this.host = host;
        this.port = port;
        this.ssl = ssl;
    }

    // Safe to share across threads - no synchronization needed
    public String getHost() { return host; }
    public int getPort() { return port; }
    public boolean isSsl() { return ssl; }
}

// Safe concurrent access
Configuration config = new Configuration("localhost", 8080, true);

ExecutorService executor = Executors.newFixedThreadPool(10);
for (int i = 0; i < 100; i++) {
    executor.submit(() -> {
        // No race conditions - config is immutable
        System.out.println(config.getHost() + ":" + config.getPort());
    });
}`
        },
        {
          name: 'Simplified Reasoning',
          explanation: 'With immutability, you can reason about an object\'s state more easily since it never changes after creation. This eliminates temporal coupling bugs where the order of method calls matters.',
          codeExample: `// With mutable objects - temporal coupling issues
class MutableOrder {
    private double total;
    private boolean discountApplied;

    public void applyDiscount(double percent) {
        if (!discountApplied) {
            total *= (1 - percent);
            discountApplied = true;
        }
    }
    // State depends on method call order - hard to reason about
}

// With immutable objects - clear state at each step
public final class Order {
    private final double total;
    private final double discount;

    public Order(double total) {
        this(total, 0);
    }

    private Order(double total, double discount) {
        this.total = total;
        this.discount = discount;
    }

    public Order withDiscount(double percent) {
        return new Order(total, percent);
    }

    public double getFinalTotal() {
        return total * (1 - discount);
    }
}

// Clear transformation chain
Order order = new Order(100)
    .withDiscount(0.1);  // Each step produces new immutable state`
        },
        {
          name: 'Safe Sharing and Caching',
          explanation: 'Immutable objects can be freely shared and cached without worrying about consistency issues. Multiple parts of your application can reference the same instance safely, reducing memory overhead.',
          codeExample: `// Flyweight pattern with immutable objects
public final class Color {
    private final int red, green, blue;

    private static final Map<String, Color> CACHE = new ConcurrentHashMap<>();

    private Color(int red, int green, int blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    // Cached factory method - safe because Color is immutable
    public static Color of(int r, int g, int b) {
        String key = r + "," + g + "," + b;
        return CACHE.computeIfAbsent(key, k -> new Color(r, g, b));
    }

    // Common colors - shared safely across entire application
    public static final Color RED = new Color(255, 0, 0);
    public static final Color GREEN = new Color(0, 255, 0);
    public static final Color BLUE = new Color(0, 0, 255);
}

// Multiple parts of app can use same instance
Color c1 = Color.of(128, 128, 128);
Color c2 = Color.of(128, 128, 128);
System.out.println(c1 == c2);  // true - same cached instance`
        }
      ]
    },
    {
      id: 'stream-api',
      name: 'Stream API',
      icon: '🌊',
      color: '#06b6d4',
      description: 'Declarative, functional-style processing of sequences',
      diagram: StreamDiagram,
      details: [
        {
          name: 'Declarative Processing',
          diagram: StreamDiagram,
          explanation: 'Streams let you declare what you want to do with data, not how to do it. Instead of explicit loops and conditionals, you chain operations like filter, map, and reduce to express your intent clearly and concisely.',
          codeExample: `// Imperative style (how to do it)
List<String> result = new ArrayList<>();
for (Person person : people) {
    if (person.getAge() >= 18) {
        String name = person.getName().toUpperCase();
        result.add(name);
    }
}
Collections.sort(result);

// Declarative style with streams (what to do)
List<String> result = people.stream()
    .filter(p -> p.getAge() >= 18)
    .map(Person::getName)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());

// Clear intent: filter adults, get names, uppercase, sort, collect`
        },
        {
          name: 'Lazy Evaluation',
          explanation: 'Intermediate stream operations are lazy - they don\'t execute until a terminal operation is called. This allows optimizations like short-circuiting and fusion, improving performance by avoiding unnecessary computation.',
          codeExample: `// Lazy evaluation demonstration
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Nothing executes yet - lazy!
Stream<Integer> stream = numbers.stream()
    .filter(n -> {
        System.out.println("Filtering: " + n);
        return n % 2 == 0;
    })
    .map(n -> {
        System.out.println("Mapping: " + n);
        return n * 10;
    });

System.out.println("Stream created, no output yet!");

// Terminal operation triggers execution
Integer first = stream.findFirst().orElse(0);
// Prints: Filtering: 1, Filtering: 2, Mapping: 2
// Stops after finding first match - short-circuit optimization!

// Without lazy evaluation, all 10 items would be processed`
        },
        {
          name: 'Parallel Processing',
          explanation: 'Streams can be processed in parallel with a simple .parallel() call. The Stream API handles the complexity of splitting work across threads, making it easy to leverage multi-core processors for better performance.',
          codeExample: `// Sequential processing
long count = numbers.stream()
    .filter(n -> isPrime(n))
    .count();

// Parallel processing - just add .parallelStream()
long count = numbers.parallelStream()
    .filter(n -> isPrime(n))
    .count();

// Or convert existing stream to parallel
long count = numbers.stream()
    .parallel()
    .filter(n -> isPrime(n))
    .count();

// Practical example: parallel file processing
List<String> files = getFileList();
Map<String, Long> wordCounts = files.parallelStream()
    .collect(Collectors.toMap(
        file -> file,
        file -> countWordsInFile(file)
    ));

// Note: Be careful with parallel streams and shared mutable state
// Good: stateless operations like filter, map
// Bad: modifying shared collections without synchronization`
        },
        {
          name: 'Rich Operation Set',
          explanation: 'Streams provide a comprehensive set of operations: filter, map, flatMap, reduce, collect, sorted, distinct, limit, skip, and more. These building blocks can be combined to express complex data transformations elegantly.',
          codeExample: `List<Order> orders = getOrders();

// filter - select elements matching condition
orders.stream().filter(o -> o.getTotal() > 100)

// map - transform each element
orders.stream().map(Order::getCustomerName)

// flatMap - flatten nested structures
orders.stream().flatMap(o -> o.getItems().stream())

// reduce - combine elements into single result
orders.stream().map(Order::getTotal).reduce(0.0, Double::sum)

// sorted, distinct, limit, skip
orders.stream()
    .map(Order::getCustomerName)
    .distinct()                    // Remove duplicates
    .sorted()                      // Sort alphabetically
    .skip(5)                       // Skip first 5
    .limit(10)                     // Take next 10
    .collect(Collectors.toList());

// Combining operations for complex query
Map<String, Double> topCustomers = orders.stream()
    .collect(Collectors.groupingBy(
        Order::getCustomerName,
        Collectors.summingDouble(Order::getTotal)
    ));`
        },
        {
          name: 'Integration with Collections',
          explanation: 'Collections provide stream() and parallelStream() methods for easy conversion. Streams can be collected back to various collection types using Collectors, providing seamless integration with existing code.',
          codeExample: `// From collections to streams
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream();
Stream<String> parallel = list.parallelStream();

// From arrays
String[] array = {"a", "b", "c"};
Stream<String> arrayStream = Arrays.stream(array);

// Collecting to different types
List<String> toList = stream.collect(Collectors.toList());
Set<String> toSet = stream.collect(Collectors.toSet());
Map<String, Integer> toMap = stream
    .collect(Collectors.toMap(s -> s, String::length));

// Collecting to specific implementations
LinkedList<String> linked = stream
    .collect(Collectors.toCollection(LinkedList::new));

// Grouping and partitioning
Map<Integer, List<String>> byLength = words.stream()
    .collect(Collectors.groupingBy(String::length));

Map<Boolean, List<Integer>> evenOdd = numbers.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));

// Joining strings
String joined = names.stream()
    .collect(Collectors.joining(", ", "[", "]"));`
        }
      ]
    },
    {
      id: 'function-composition',
      name: 'Function Composition',
      icon: '🔗',
      color: '#ec4899',
      description: 'Combining simple functions to build complex operations',
      diagram: CompositionDiagram,
      details: [
        {
          name: 'compose() Method',
          diagram: CompositionDiagram,
          explanation: 'Function.compose() combines two functions where the parameter function executes first. f.compose(g) creates a new function that computes f(g(x)). This follows mathematical function composition notation.',
          codeExample: `// compose() - inner function executes FIRST
Function<Integer, Integer> multiplyBy2 = x -> x * 2;
Function<Integer, Integer> add10 = x -> x + 10;

// f.compose(g) means: first apply g, then apply f
// Result: multiplyBy2(add10(5)) = multiplyBy2(15) = 30
Function<Integer, Integer> add10ThenMultiply = multiplyBy2.compose(add10);
System.out.println(add10ThenMultiply.apply(5));  // 30

// Mathematical notation: (f . g)(x) = f(g(x))
Function<String, String> trim = String::trim;
Function<String, String> toUpper = String::toUpperCase;

// compose: first trim, then uppercase
Function<String, String> cleanUp = toUpper.compose(trim);
System.out.println(cleanUp.apply("  hello  "));  // "HELLO"`
        },
        {
          name: 'andThen() Method',
          explanation: 'Function.andThen() chains functions in execution order. f.andThen(g) creates a function that computes g(f(x)). This reads more naturally when thinking about sequential data transformations.',
          codeExample: `// andThen() - chains in natural reading order
Function<Integer, Integer> multiplyBy2 = x -> x * 2;
Function<Integer, Integer> add10 = x -> x + 10;

// f.andThen(g) means: first apply f, then apply g
// Result: add10(multiplyBy2(5)) = add10(10) = 20
Function<Integer, Integer> multiplyThenAdd = multiplyBy2.andThen(add10);
System.out.println(multiplyThenAdd.apply(5));  // 20

// More intuitive for data transformation pipelines
Function<String, String> pipeline =
    ((Function<String, String>) String::trim)
    .andThen(String::toLowerCase)
    .andThen(s -> s.replace(" ", "_"))
    .andThen(s -> "processed_" + s);

System.out.println(pipeline.apply("  Hello World  "));
// Output: "processed_hello_world"`
        },
        {
          name: 'Building Complex Pipelines',
          explanation: 'By composing simple, focused functions, you can build sophisticated data transformation pipelines. Each function does one thing well, and composition combines them into powerful operations.',
          codeExample: `// Define simple, focused functions
Function<String, String> removeSpaces = s -> s.replaceAll("\\\\s+", "");
Function<String, String> toLowerCase = String::toLowerCase;
Function<String, String> addPrefix = s -> "user_" + s;
Function<String, String> truncate = s -> s.length() > 20
    ? s.substring(0, 20) : s;

// Compose into a username generator pipeline
Function<String, String> generateUsername =
    removeSpaces
    .andThen(toLowerCase)
    .andThen(truncate)
    .andThen(addPrefix);

System.out.println(generateUsername.apply("John Doe Smith"));
// Output: "user_johndoesmith"

// Reusable transformation builder
class TransformationBuilder<T> {
    private Function<T, T> pipeline = Function.identity();

    public TransformationBuilder<T> add(Function<T, T> step) {
        pipeline = pipeline.andThen(step);
        return this;
    }

    public Function<T, T> build() { return pipeline; }
}`
        },
        {
          name: 'Reusability Through Composition',
          explanation: 'Small, composable functions are highly reusable. You can mix and match them in different combinations to create new behaviors without writing new code, following the DRY principle.',
          codeExample: `// Reusable building blocks
Function<Double, Double> addTax = price -> price * 1.08;
Function<Double, Double> applyDiscount = price -> price * 0.9;
Function<Double, Double> roundToTwoDecimals =
    price -> Math.round(price * 100) / 100.0;

// Combine differently for different scenarios
Function<Double, Double> regularPrice =
    addTax.andThen(roundToTwoDecimals);

Function<Double, Double> salePrice =
    applyDiscount.andThen(addTax).andThen(roundToTwoDecimals);

Function<Double, Double> employeePrice =
    applyDiscount.andThen(applyDiscount).andThen(addTax)
    .andThen(roundToTwoDecimals);

System.out.println(regularPrice.apply(100.0));   // 108.0
System.out.println(salePrice.apply(100.0));      // 97.2
System.out.println(employeePrice.apply(100.0));  // 87.48

// Same functions, different compositions, no code duplication!`
        },
        {
          name: 'Predicate and Consumer Composition',
          explanation: 'Predicates support and(), or(), and negate() for logical composition. Consumers support andThen() for sequential side effects. These compositions enable expressive, readable condition and action chains.',
          codeExample: `// Predicate composition
Predicate<String> isNotEmpty = s -> !s.isEmpty();
Predicate<String> isNotNull = s -> s != null;
Predicate<String> hasValidLength = s -> s.length() >= 3 && s.length() <= 50;
Predicate<String> containsNoSpaces = s -> !s.contains(" ");

// Combine with and(), or(), negate()
Predicate<String> isValidUsername = isNotNull
    .and(isNotEmpty)
    .and(hasValidLength)
    .and(containsNoSpaces);

System.out.println(isValidUsername.test("john_doe"));  // true
System.out.println(isValidUsername.test("ab"));        // false (too short)

// Negate predicate
Predicate<Integer> isEven = n -> n % 2 == 0;
Predicate<Integer> isOdd = isEven.negate();

// Consumer composition with andThen()
Consumer<String> log = s -> System.out.println("Log: " + s);
Consumer<String> save = s -> database.save(s);
Consumer<String> notify = s -> emailService.notify(s);

Consumer<String> processMessage = log.andThen(save).andThen(notify);
processMessage.accept("New order received");`
        }
      ]
    },
    {
      id: 'reactive-programming',
      name: 'Reactive Programming',
      icon: '⚡',
      color: '#ef4444',
      description: 'Asynchronous, event-driven programming with data streams',
      diagram: ReactiveDiagram,
      details: [
        {
          name: 'Asynchronous Streams',
          diagram: ReactiveDiagram,
          explanation: 'Reactive programming treats data as streams that emit values over time. Instead of requesting data, you react to it as it arrives. This is ideal for event-driven systems, real-time updates, and handling unpredictable data sources.',
          codeExample: `// Using Flow API (Java 9+) for reactive streams
import java.util.concurrent.Flow.*;

// Publisher emits data over time
class NumberPublisher implements Publisher<Integer> {
    public void subscribe(Subscriber<? super Integer> subscriber) {
        subscriber.onSubscribe(new Subscription() {
            private int count = 0;

            public void request(long n) {
                for (int i = 0; i < n && count < 10; i++) {
                    subscriber.onNext(count++);
                }
                if (count >= 10) subscriber.onComplete();
            }

            public void cancel() {}
        });
    }
}

// Subscriber reacts to emitted values
class PrintSubscriber implements Subscriber<Integer> {
    public void onSubscribe(Subscription s) { s.request(Long.MAX_VALUE); }
    public void onNext(Integer item) { System.out.println("Received: " + item); }
    public void onError(Throwable t) { t.printStackTrace(); }
    public void onComplete() { System.out.println("Done!"); }
}`
        },
        {
          name: 'Backpressure Handling',
          explanation: 'Reactive systems handle situations where data arrives faster than it can be processed. Backpressure strategies (buffer, drop, throttle) prevent memory overflow and system overload by controlling the flow of data.',
          codeExample: `// Backpressure with controlled request
class BackpressureSubscriber<T> implements Subscriber<T> {
    private Subscription subscription;
    private int batchSize = 10;

    public void onSubscribe(Subscription s) {
        this.subscription = s;
        s.request(batchSize);  // Only request what we can handle
    }

    public void onNext(T item) {
        process(item);
        // Request more only when ready
        subscription.request(1);
    }

    public void onError(Throwable t) { handleError(t); }
    public void onComplete() { finish(); }
}

// With Project Reactor (popular reactive library)
// Flux.range(1, 1000)
//     .onBackpressureBuffer(100)     // Buffer up to 100 items
//     .onBackpressureDrop()          // Drop if buffer full
//     .onBackpressureLatest()        // Keep only latest
//     .subscribe(item -> slowProcess(item));

// Rate limiting example
// Flux.interval(Duration.ofMillis(10))
//     .limitRate(100)  // Limit to 100 requests at a time
//     .subscribe(i -> process(i));`
        },
        {
          name: 'CompletableFuture',
          explanation: 'Java\'s CompletableFuture provides composable asynchronous programming. You can chain async operations with thenApply, thenCompose, and thenCombine, creating complex async workflows with clean, readable code.',
          codeExample: `// Basic async operation
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchDataFromApi());

// Chaining transformations
CompletableFuture<Integer> result = CompletableFuture
    .supplyAsync(() -> "42")
    .thenApply(Integer::parseInt)           // Transform result
    .thenApply(n -> n * 2);                 // Chain another transform

// Composing dependent async operations
CompletableFuture<Order> orderFuture = CompletableFuture
    .supplyAsync(() -> findUser(userId))
    .thenCompose(user -> findLatestOrder(user));  // Flat map

// Combining independent async operations
CompletableFuture<String> combined = userFuture
    .thenCombine(orderFuture, (user, order) ->
        user.getName() + " ordered " + order.getProduct());

// Error handling
CompletableFuture<String> safe = future
    .exceptionally(ex -> "Default value")
    .thenApply(String::toUpperCase);

// Running multiple in parallel
CompletableFuture.allOf(future1, future2, future3)
    .thenRun(() -> System.out.println("All completed!"));`
        },
        {
          name: 'Event-Driven Architecture',
          explanation: 'Reactive systems are built around events and messages. Components react to events rather than calling each other directly, resulting in loosely coupled, scalable systems that handle high loads gracefully.',
          codeExample: `// Simple event system
interface EventListener<T> {
    void onEvent(T event);
}

class EventBus {
    private Map<Class<?>, List<EventListener<?>>> listeners
        = new ConcurrentHashMap<>();

    public <T> void subscribe(Class<T> eventType, EventListener<T> listener) {
        listeners.computeIfAbsent(eventType, k -> new CopyOnWriteArrayList<>())
                 .add(listener);
    }

    @SuppressWarnings("unchecked")
    public <T> void publish(T event) {
        List<EventListener<?>> eventListeners = listeners.get(event.getClass());
        if (eventListeners != null) {
            eventListeners.forEach(listener ->
                ((EventListener<T>) listener).onEvent(event));
        }
    }
}

// Usage
record OrderPlaced(String orderId, double amount) {}
record PaymentReceived(String orderId) {}

EventBus bus = new EventBus();
bus.subscribe(OrderPlaced.class, e ->
    System.out.println("New order: " + e.orderId()));
bus.subscribe(OrderPlaced.class, e ->
    sendConfirmationEmail(e));

bus.publish(new OrderPlaced("123", 99.99));`
        },
        {
          name: 'Error Handling',
          explanation: 'Reactive streams provide sophisticated error handling with operators like onError, retry, and fallback. Errors propagate through the stream, and you can handle them at any point with appropriate recovery strategies.',
          codeExample: `// CompletableFuture error handling
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> riskyOperation())
    .exceptionally(ex -> {
        log.error("Operation failed", ex);
        return "fallback value";
    });

// Handle success and failure
future.handle((result, ex) -> {
    if (ex != null) {
        return "Error: " + ex.getMessage();
    }
    return "Success: " + result;
});

// Retry pattern
public <T> CompletableFuture<T> retry(Supplier<T> operation, int maxRetries) {
    return CompletableFuture.supplyAsync(operation)
        .exceptionallyCompose(ex -> {
            if (maxRetries > 0) {
                return retry(operation, maxRetries - 1);
            }
            return CompletableFuture.failedFuture(ex);
        });
}

// Timeout handling
CompletableFuture<String> withTimeout = future
    .orTimeout(5, TimeUnit.SECONDS)
    .exceptionally(ex -> {
        if (ex instanceof TimeoutException) {
            return "Request timed out";
        }
        throw new CompletionException(ex);
    });`
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
      { name: 'Functional Programming', icon: '🔄', page: 'FunctionalProgramming' }
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
    background: 'var(--bg-gradient)',
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
    background: 'linear-gradient(135deg, #fb7185, #f43f5e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(244, 63, 94, 0.2)',
    border: '1px solid rgba(244, 63, 94, 0.3)',
    borderRadius: '0.5rem',
    color: '#fb7185',
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
        <h1 style={titleStyle}>Functional Programming</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(244, 63, 94, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(244, 63, 94, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={FUNCTIONAL_PROG_COLORS}
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
              colors={FUNCTIONAL_PROG_COLORS}
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

export default FunctionalProgramming

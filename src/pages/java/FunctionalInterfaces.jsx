/**
 * Functional Interfaces - Java Functional Programming
 *
 * Covers the core functional interfaces in java.util.function,
 * custom functional interfaces, Optional API, and composable APIs.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import { isProblemCompleted } from '../../services/progressService'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const FUNCTIONAL_COLORS = {
  primary: '#d946ef',           // Fuchsia
  primaryHover: '#e879f9',      // Lighter fuchsia
  bg: 'rgba(217, 70, 239, 0.1)',
  border: 'rgba(217, 70, 239, 0.3)',
  arrow: '#d946ef',
  hoverBg: 'rgba(217, 70, 239, 0.2)',
  topicBg: 'rgba(217, 70, 239, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(217, 70, 239, 0.15)', border: 'rgba(217, 70, 239, 0.3)' },   // fuchsia
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },   // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },     // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },   // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },   // purple
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },     // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

// Function<T, R> Interface Diagram
const FunctionDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="funcArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#d946ef" />
      </marker>
      <linearGradient id="funcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d946ef" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">{`
      Function&lt;T, R&gt; - Transform Input to Output
    `}</text>

    {/* Input T */}
    <rect x="80" y="70" width="120" height="70" rx="10" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Input T</text>
    <text x="140" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="11">String, Integer...</text>

    {/* Function Box */}
    <rect x="300" y="60" width="200" height="90" rx="12" fill="url(#funcGrad)" stroke="#d946ef" strokeWidth="2"/>
    <text x="400" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{`Function&lt;T, R&gt;`}</text>
    <text x="400" y="115" textAnchor="middle" fill="#fce7f3" fontSize="12">R apply(T t)</text>
    <text x="400" y="135" textAnchor="middle" fill="#f5d0fe" fontSize="10">andThen() | compose()</text>

    {/* Output R */}
    <rect x="600" y="70" width="120" height="70" rx="10" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="660" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Output R</text>
    <text x="660" y="120" textAnchor="middle" fill="#bbf7d0" fontSize="11">Transformed value</text>

    {/* Arrows */}
    <line x1="200" y1="105" x2="295" y2="105" stroke="#d946ef" strokeWidth="3" markerEnd="url(#funcArrow)"/>
    <line x1="500" y1="105" x2="595" y2="105" stroke="#d946ef" strokeWidth="3" markerEnd="url(#funcArrow)"/>

    {/* Labels */}
    <text x="247" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">input</text>
    <text x="547" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">output</text>

    {/* Example */}
    <text x="400" y="180" textAnchor="middle" fill="#94a3b8" fontSize="11" fontStyle="italic">{`
      Example: s -&gt; s.length() transforms String to Integer
    `}</text>
  </svg>
)

// Consumer<T> Interface Diagram
const ConsumerDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="consArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">{`
      Consumer&lt;T&gt; - Consume Input, No Output
    `}</text>

    {/* Input T */}
    <rect x="100" y="70" width="140" height="70" rx="10" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="170" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Input T</text>
    <text x="170" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="11">Any type</text>

    {/* Consumer Box */}
    <rect x="320" y="60" width="200" height="90" rx="12" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="420" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{`Consumer&lt;T&gt;`}</text>
    <text x="420" y="115" textAnchor="middle" fill="#fef3c7" fontSize="12">void accept(T t)</text>
    <text x="420" y="135" textAnchor="middle" fill="#fde68a" fontSize="10">andThen()</text>

    {/* Void output */}
    <rect x="600" y="80" width="100" height="50" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="650" y="110" textAnchor="middle" fill="#6b7280" fontSize="12">void</text>

    {/* Arrow */}
    <line x1="240" y1="105" x2="315" y2="105" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#consArrow)"/>
    <line x1="520" y1="105" x2="595" y2="105" stroke="#4b5563" strokeWidth="2" strokeDasharray="5,3"/>

    {/* Side effect indicator */}
    <rect x="350" y="160" width="140" height="30" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="420" y="180" textAnchor="middle" fill="#f87171" fontSize="11">Side Effect!</text>

    <text x="400" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">{`
      Example: s -&gt; System.out.println(s)
    `}</text>
  </svg>
)

// Supplier<T> Interface Diagram
const SupplierDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="suppArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">{`
      Supplier&lt;T&gt; - No Input, Produce Output
    `}</text>

    {/* No input */}
    <rect x="100" y="80" width="100" height="50" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="150" y="110" textAnchor="middle" fill="#6b7280" fontSize="12">no input</text>

    {/* Supplier Box */}
    <rect x="280" y="60" width="200" height="90" rx="12" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="380" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{`Supplier&lt;T&gt;`}</text>
    <text x="380" y="115" textAnchor="middle" fill="#dcfce7" fontSize="12">T get()</text>
    <text x="380" y="135" textAnchor="middle" fill="#bbf7d0" fontSize="10">Factory Pattern</text>

    {/* Output T */}
    <rect x="560" y="70" width="140" height="70" rx="10" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="630" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Output T</text>
    <text x="630" y="120" textAnchor="middle" fill="#ddd6fe" fontSize="11">New instance</text>

    {/* Arrows */}
    <line x1="200" y1="105" x2="275" y2="105" stroke="#4b5563" strokeWidth="2" strokeDasharray="5,3"/>
    <line x1="480" y1="105" x2="555" y2="105" stroke="#22c55e" strokeWidth="3" markerEnd="url(#suppArrow)"/>

    {/* Use cases */}
    <text x="630" y="160" textAnchor="middle" fill="#94a3b8" fontSize="10">Lazy evaluation</text>
    <text x="630" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">Object factories</text>

    <text x="300" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">{`
      Example: () -&gt; Math.random()
    `}</text>
  </svg>
)

// Predicate<T> Interface Diagram
const PredicateDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="predArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">{`
      Predicate&lt;T&gt; - Test Input, Return Boolean
    `}</text>

    {/* Input T */}
    <rect x="80" y="70" width="120" height="70" rx="10" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Input T</text>
    <text x="140" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="11">Value to test</text>

    {/* Predicate Box */}
    <rect x="280" y="55" width="200" height="100" rx="12" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="380" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{`Predicate&lt;T&gt;`}</text>
    <text x="380" y="110" textAnchor="middle" fill="#cffafe" fontSize="12">boolean test(T t)</text>
    <text x="380" y="135" textAnchor="middle" fill="#a5f3fc" fontSize="10">and() | or() | negate()</text>

    {/* True branch */}
    <rect x="580" y="45" width="100" height="45" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="630" y="72" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">true</text>

    {/* False branch */}
    <rect x="580" y="110" width="100" height="45" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="630" y="137" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">false</text>

    {/* Arrows */}
    <line x1="200" y1="105" x2="275" y2="105" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#predArrow)"/>
    <line x1="480" y1="85" x2="575" y2="67" stroke="#22c55e" strokeWidth="2" markerEnd="url(#predArrow)"/>
    <line x1="480" y1="125" x2="575" y2="132" stroke="#ef4444" strokeWidth="2" markerEnd="url(#predArrow)"/>

    {/* Example */}
    <text x="400" y="190" textAnchor="middle" fill="#94a3b8" fontSize="11" fontStyle="italic">{`
      Example: n -&gt; n % 2 == 0 tests if number is even
    `}</text>
    <text x="400" y="210" textAnchor="middle" fill="#64748b" fontSize="10">
      Used in Stream.filter(), Collection.removeIf()
    </text>
  </svg>
)

// Primitive Functional Interfaces Diagram
const PrimitiveDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="primArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Primitive Specializations - Avoid Boxing/Unboxing
    </text>

    {/* Generic (top) */}
    <rect x="300" y="50" width="200" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="400" y="72" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">{`Function<Integer, Integer>`}</text>
    <text x="400" y="90" textAnchor="middle" fill="#fecaca" fontSize="10">Autoboxing overhead</text>

    {/* Arrow down */}
    <text x="400" y="130" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Optimize ↓</text>

    {/* Primitive specializations */}
    <rect x="50" y="160" width="150" height="40" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1"/>
    <text x="125" y="185" textAnchor="middle" fill="white" fontSize="12">IntFunction{`<R>`}</text>

    <rect x="220" y="160" width="150" height="40" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1"/>
    <text x="295" y="185" textAnchor="middle" fill="white" fontSize="12">ToIntFunction{`<T>`}</text>

    <rect x="390" y="160" width="150" height="40" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1"/>
    <text x="465" y="185" textAnchor="middle" fill="white" fontSize="12">IntUnaryOperator</text>

    <rect x="560" y="160" width="190" height="40" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1"/>
    <text x="655" y="185" textAnchor="middle" fill="white" fontSize="12">IntBinaryOperator</text>

    {/* Examples */}
    <text x="125" y="225" textAnchor="middle" fill="#94a3b8" fontSize="10">int{` ->`}R</text>
    <text x="295" y="225" textAnchor="middle" fill="#94a3b8" fontSize="10">T{` ->`}int</text>
    <text x="465" y="225" textAnchor="middle" fill="#94a3b8" fontSize="10">int{` ->`}int</text>
    <text x="655" y="225" textAnchor="middle" fill="#94a3b8" fontSize="10">(int, int){` ->`}int</text>

    {/* Also available for */}
    <text x="400" y="265" textAnchor="middle" fill="#64748b" fontSize="11">
      Also available: LongFunction, DoubleFunction, IntPredicate, LongConsumer, etc.
    </text>
    <text x="400" y="285" textAnchor="middle" fill="#475569" fontSize="10">
      43 primitive specializations total in java.util.function
    </text>
  </svg>
)

// Method References Diagram
const MethodRefDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Four Types of Method References
    </text>

    {/* Static method reference */}
    <rect x="50" y="50" width="170" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="135" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Static Method</text>
    <text x="135" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="10">Class::staticMethod</text>

    {/* Instance method on specific object */}
    <rect x="240" y="50" width="170" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="325" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Instance (bound)</text>
    <text x="325" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="10">object::instanceMethod</text>

    {/* Instance method on arbitrary object */}
    <rect x="430" y="50" width="170" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="515" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Instance (unbound)</text>
    <text x="515" y="95" textAnchor="middle" fill="#fef3c7" fontSize="10">Class::instanceMethod</text>

    {/* Constructor reference */}
    <rect x="620" y="50" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="690" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Constructor</text>
    <text x="690" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="10">Class::new</text>

    {/* Examples */}
    <text x="135" y="135" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Example:</text>
    <text x="135" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Integer::parseInt</text>
    <text x="135" y="170" textAnchor="middle" fill="#64748b" fontSize="9">{`s -> Integer.parseInt(s)`}</text>

    <text x="325" y="135" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Example:</text>
    <text x="325" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">str::toLowerCase</text>
    <text x="325" y="170" textAnchor="middle" fill="#64748b" fontSize="9">{`() -> str.toLowerCase()`}</text>

    <text x="515" y="135" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Example:</text>
    <text x="515" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">String::length</text>
    <text x="515" y="170" textAnchor="middle" fill="#64748b" fontSize="9">{`s -> s.length()`}</text>

    <text x="690" y="135" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">Example:</text>
    <text x="690" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">ArrayList::new</text>
    <text x="690" y="170" textAnchor="middle" fill="#64748b" fontSize="9">{`() -> new ArrayList()`}</text>

    {/* Common uses */}
    <rect x="50" y="200" width="700" height="130" rx="10" fill="rgba(59, 130, 246, 0.1)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
    <text x="400" y="225" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">Common Use Cases</text>

    <text x="400" y="250" textAnchor="middle" fill="#94a3b8" fontSize="11">{`
      list.stream().map(String::toUpperCase) // Instance method on arbitrary object
    `}</text>
    <text x="400" y="270" textAnchor="middle" fill="#94a3b8" fontSize="11">{`
      list.forEach(System.out::println) // Instance method on specific object
    `}</text>
    <text x="400" y="290" textAnchor="middle" fill="#94a3b8" fontSize="11">{`
      Stream.of("1","2").map(Integer::parseInt) // Static method
    `}</text>
    <text x="400" y="310" textAnchor="middle" fill="#94a3b8" fontSize="11">{`
      Stream.generate(StringBuilder::new) // Constructor
    `}</text>
  </svg>
)

// Currying and Partial Application Diagram
const CurryingDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="curryArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#d946ef" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Currying - Transform Multi-Parameter Function
    </text>

    {/* Regular function */}
    <rect x="80" y="60" width="180" height="80" rx="10" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="170" y="85" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Regular Function</text>
    <text x="170" y="110" textAnchor="middle" fill="#fecaca" fontSize="11">(a, b, c) {`->`} result</text>
    <text x="170" y="128" textAnchor="middle" fill="#fca5a5" fontSize="9">All at once</text>

    {/* Arrow */}
    <line x1="260" y1="100" x2="330" y2="100" stroke="#d946ef" strokeWidth="3" markerEnd="url(#curryArrow)"/>
    <text x="295" y="90" textAnchor="middle" fill="#d946ef" fontSize="11" fontWeight="bold">Curry</text>

    {/* Curried function */}
    <rect x="335" y="60" width="200" height="80" rx="10" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="435" y="85" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Curried Function</text>
    <text x="435" y="110" textAnchor="middle" fill="#bbf7d0" fontSize="11">a {`->`} (b {`->`} (c {`->`} result))</text>
    <text x="435" y="128" textAnchor="middle" fill="#86efac" fontSize="9">One parameter at a time</text>

    {/* Benefits */}
    <rect x="570" y="60" width="180" height="80" rx="10" fill="rgba(139, 92, 246, 0.2)" stroke="#a78bfa" strokeWidth="2"/>
    <text x="660" y="82" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Benefits:</text>
    <text x="660" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="10">✓ Partial application</text>
    <text x="660" y="116" textAnchor="middle" fill="#c4b5fd" fontSize="10">✓ Function factories</text>
    <text x="660" y="132" textAnchor="middle" fill="#c4b5fd" fontSize="10">✓ Reusable configs</text>

    {/* Example visualization */}
    <rect x="80" y="170" width="640" height="90" rx="10" fill="rgba(6, 182, 212, 0.1)" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1"/>
    <text x="400" y="195" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="bold">Example: Curried Addition</text>

    <text x="400" y="220" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
      add(2)(3)(4) = 9
    </text>
    <text x="400" y="245" textAnchor="middle" fill="#64748b" fontSize="10">
      add(2) returns addTwo, addTwo(3) returns addTwoThree, addTwoThree(4) = 9
    </text>
  </svg>
)

// Memoization Diagram
const MemoizationDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Memoization - Cache Expensive Results
    </text>

    {/* Input */}
    <rect x="80" y="80" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="130" y="107" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Input: 5</text>
    <text x="130" y="125" textAnchor="middle" fill="#bfdbfe" fontSize="10">fib(5)</text>

    {/* First call - cache miss */}
    <rect x="230" y="60" width="150" height="100" rx="10" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="305" y="85" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Cache Miss ❌</text>
    <text x="305" y="105" textAnchor="middle" fill="#fca5a5" fontSize="10">Compute fib(5)</text>
    <text x="305" y="125" textAnchor="middle" fill="#fca5a5" fontSize="10">= 15 calls</text>
    <text x="305" y="145" textAnchor="middle" fill="#dc2626" fontSize="9">Store result: 5</text>

    {/* Cache */}
    <rect x="430" y="80" width="120" height="100" rx="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
    <text x="490" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Cache</text>
    <rect x="445" y="115" width="90" height="22" rx="4" fill="rgba(15, 23, 42, 0.8)"/>
    <text x="490" y="130" textAnchor="middle" fill="#fef3c7" fontSize="10" fontFamily="monospace">5 {`->`} 5</text>
    <rect x="445" y="142" width="90" height="22" rx="4" fill="rgba(15, 23, 42, 0.8)"/>
    <text x="490" y="157" textAnchor="middle" fill="#fef3c7" fontSize="10" fontFamily="monospace">10 {`->`} 55</text>

    {/* Second call - cache hit */}
    <rect x="600" y="60" width="150" height="100" rx="10" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="675" y="85" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Cache Hit ✓</text>
    <text x="675" y="105" textAnchor="middle" fill="#86efac" fontSize="10">Return cached</text>
    <text x="675" y="125" textAnchor="middle" fill="#86efac" fontSize="10">result: 5</text>
    <text x="675" y="145" textAnchor="middle" fill="#15803d" fontSize="9">1 lookup, O(1)</text>

    {/* Performance comparison */}
    <rect x="100" y="200" width="600" height="80" rx="10" fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1"/>
    <text x="400" y="225" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Performance Impact</text>
    <text x="400" y="250" textAnchor="middle" fill="#94a3b8" fontSize="11">
      Without memo: fib(40) = 331,160,281 calls {`(~5 seconds)`}
    </text>
    <text x="400" y="270" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">
      With memo: fib(40) = 40 calls {`(instant)`}
    </text>
  </svg>
)

// Custom Functional Interface Diagram
const CustomInterfaceDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="custArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#d946ef" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      @FunctionalInterface - Single Abstract Method (SAM)
    </text>

    {/* Annotation */}
    <rect x="250" y="50" width="300" height="30" rx="6" fill="rgba(217, 70, 239, 0.3)" stroke="#d946ef" strokeWidth="1"/>
    <text x="400" y="70" textAnchor="middle" fill="#f5d0fe" fontSize="12" fontWeight="bold">@FunctionalInterface</text>

    {/* Interface box */}
    <rect x="200" y="90" width="400" height="140" rx="12" fill="rgba(15, 23, 42, 0.8)" stroke="#d946ef" strokeWidth="2"/>

    {/* SAM - Required */}
    <rect x="220" y="105" width="360" height="35" rx="6" fill="#d946ef" stroke="#e879f9" strokeWidth="1"/>
    <text x="400" y="127" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
      Single Abstract Method (REQUIRED)
    </text>

    {/* Default methods */}
    <rect x="220" y="150" width="175" height="30" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="307" y="170" textAnchor="middle" fill="#93c5fd" fontSize="11">default methods (optional)</text>

    {/* Static methods */}
    <rect x="405" y="150" width="175" height="30" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="492" y="170" textAnchor="middle" fill="#86efac" fontSize="11">static methods (optional)</text>

    {/* Object methods */}
    <rect x="280" y="190" width="240" height="30" rx="6" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1"/>
    <text x="400" y="210" textAnchor="middle" fill="#94a3b8" fontSize="11">Object methods override (allowed)</text>

    {/* Lambda arrow */}
    <text x="400" y="255" textAnchor="middle" fill="#94a3b8" fontSize="12">{`
      Enables: Calculator calc = (a, b) -&gt; a + b;
    `}</text>

    {/* Side notes */}
    <text x="680" y="130" textAnchor="start" fill="#22c55e" fontSize="10">Exactly 1</text>
    <text x="680" y="165" textAnchor="start" fill="#64748b" fontSize="10">0 or more</text>
  </svg>
)

// Optional API Diagram
const OptionalDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="optArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">{`
      Optional&lt;T&gt; - Functional Operations on Nullable Values
    `}</text>

    {/* Optional container */}
    <rect x="150" y="50" width="150" height="80" rx="12" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="225" y="80" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="bold">{`Optional&lt;T&gt;`}</text>
    <text x="225" y="100" textAnchor="middle" fill="#a78bfa" fontSize="10">of() | ofNullable()</text>
    <text x="225" y="115" textAnchor="middle" fill="#a78bfa" fontSize="10">empty()</text>

    {/* Transformation chain */}
    <rect x="350" y="50" width="100" height="35" rx="6" fill="#d946ef" stroke="#e879f9" strokeWidth="1"/>
    <text x="400" y="72" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">map()</text>

    <rect x="350" y="95" width="100" height="35" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="1"/>
    <text x="400" y="117" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">flatMap()</text>

    <rect x="500" y="50" width="100" height="35" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1"/>
    <text x="550" y="72" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">filter()</text>

    {/* Retrieval methods */}
    <rect x="500" y="95" width="100" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="550" y="117" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">orElse()</text>

    {/* Arrows */}
    <line x1="300" y1="75" x2="345" y2="67" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#optArrow)"/>
    <line x1="300" y1="100" x2="345" y2="112" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#optArrow)"/>
    <line x1="450" y1="67" x2="495" y2="67" stroke="#d946ef" strokeWidth="2" markerEnd="url(#optArrow)"/>
    <line x1="450" y1="112" x2="495" y2="112" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#optArrow)"/>

    {/* Present vs Empty paths */}
    <rect x="650" y="45" width="120" height="40" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="710" y="70" textAnchor="middle" fill="#86efac" fontSize="11">Present: value</text>

    <rect x="650" y="95" width="120" height="40" rx="8" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1"/>
    <text x="710" y="120" textAnchor="middle" fill="#94a3b8" fontSize="11">Empty: default</text>

    <line x1="600" y1="67" x2="645" y2="65" stroke="#22c55e" strokeWidth="2" markerEnd="url(#optArrow)"/>
    <line x1="600" y1="112" x2="645" y2="115" stroke="#64748b" strokeWidth="2"/>

    {/* Key insight */}
    <rect x="200" y="160" width="400" height="60" rx="8" fill="rgba(217, 70, 239, 0.1)" stroke="#d946ef" strokeWidth="1"/>
    <text x="400" y="185" textAnchor="middle" fill="#f5d0fe" fontSize="12" fontWeight="bold">
      orElse(T) - eager evaluation (always computed)
    </text>
    <text x="400" y="205" textAnchor="middle" fill="#f5d0fe" fontSize="12" fontWeight="bold">
      orElseGet(Supplier) - lazy evaluation (only if empty)
    </text>
  </svg>
)

// Composable APIs Diagram
const ComposableApisDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="compArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#d946ef" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Composable APIs - Method Chaining with Functional Interfaces
    </text>

    {/* Builder pattern */}
    <rect x="50" y="50" width="140" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Builder</text>
    <text x="120" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="9">returns this</text>

    <line x1="190" y1="80" x2="230" y2="80" stroke="#d946ef" strokeWidth="2" markerEnd="url(#compArrow)"/>

    <rect x="240" y="50" width="140" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="310" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">+ Method</text>
    <text x="310" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="9">returns this</text>

    <line x1="380" y1="80" x2="420" y2="80" stroke="#d946ef" strokeWidth="2" markerEnd="url(#compArrow)"/>

    <rect x="430" y="50" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="500" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">+ Method</text>
    <text x="500" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="9">returns this</text>

    <line x1="570" y1="80" x2="610" y2="80" stroke="#d946ef" strokeWidth="2" markerEnd="url(#compArrow)"/>

    <rect x="620" y="50" width="140" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="690" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">execute()</text>
    <text x="690" y="95" textAnchor="middle" fill="#fef3c7" fontSize="9">returns result</text>

    {/* Functional interfaces used */}
    <text x="400" y="140" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
      Functional Interfaces Enable:
    </text>

    <rect x="80" y="155" width="130" height="35" rx="6" fill="rgba(217, 70, 239, 0.2)" stroke="#d946ef" strokeWidth="1"/>
    <text x="145" y="177" textAnchor="middle" fill="#e879f9" fontSize="10">Predicate conditions</text>

    <rect x="230" y="155" width="130" height="35" rx="6" fill="rgba(217, 70, 239, 0.2)" stroke="#d946ef" strokeWidth="1"/>
    <text x="295" y="177" textAnchor="middle" fill="#e879f9" fontSize="10">Function transforms</text>

    <rect x="380" y="155" width="130" height="35" rx="6" fill="rgba(217, 70, 239, 0.2)" stroke="#d946ef" strokeWidth="1"/>
    <text x="445" y="177" textAnchor="middle" fill="#e879f9" fontSize="10">Consumer actions</text>

    <rect x="530" y="155" width="130" height="35" rx="6" fill="rgba(217, 70, 239, 0.2)" stroke="#d946ef" strokeWidth="1"/>
    <text x="595" y="177" textAnchor="middle" fill="#e879f9" fontSize="10">Supplier factories</text>

    <text x="400" y="210" textAnchor="middle" fill="#64748b" fontSize="10" fontStyle="italic">{`
      Query.select("name").from("users").where(age &gt; 18).execute()
    `}</text>
  </svg>
)

// BiFunction/Operators Diagram
const BiFunctionDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="biArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#d946ef" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Two-Argument Functional Interfaces
    </text>

    {/* BiFunction */}
    <rect x="50" y="50" width="200" height="70" rx="10" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{`BiFunction&lt;T, U, R&gt;`}</text>
    <text x="150" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="10">R apply(T t, U u)</text>
    <text x="150" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="9">{`(T, U) -&gt; R`}</text>

    {/* BinaryOperator */}
    <rect x="300" y="50" width="200" height="70" rx="10" fill="#d946ef" stroke="#e879f9" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{`BinaryOperator&lt;T&gt;`}</text>
    <text x="400" y="95" textAnchor="middle" fill="#fce7f3" fontSize="10">T apply(T t1, T t2)</text>
    <text x="400" y="110" textAnchor="middle" fill="#f5d0fe" fontSize="9">{`(T, T) -&gt; T`}</text>

    {/* BiConsumer */}
    <rect x="550" y="50" width="200" height="70" rx="10" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{`BiConsumer&lt;T, U&gt;`}</text>
    <text x="650" y="95" textAnchor="middle" fill="#fef3c7" fontSize="10">void accept(T t, U u)</text>
    <text x="650" y="110" textAnchor="middle" fill="#fde68a" fontSize="9">{`(T, U) -&gt; void`}</text>

    {/* BiPredicate */}
    <rect x="175" y="140" width="200" height="70" rx="10" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="275" y="165" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{`BiPredicate&lt;T, U&gt;`}</text>
    <text x="275" y="185" textAnchor="middle" fill="#cffafe" fontSize="10">boolean test(T t, U u)</text>
    <text x="275" y="200" textAnchor="middle" fill="#a5f3fc" fontSize="9">{`(T, U) -&gt; boolean`}</text>

    {/* UnaryOperator */}
    <rect x="425" y="140" width="200" height="70" rx="10" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="525" y="165" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{`UnaryOperator&lt;T&gt;`}</text>
    <text x="525" y="185" textAnchor="middle" fill="#dcfce7" fontSize="10">T apply(T t)</text>
    <text x="525" y="200" textAnchor="middle" fill="#bbf7d0" fontSize="9">{`T -&gt; T (same type)`}</text>

    {/* Relationship arrows */}
    <line x1="300" y1="85" x2="255" y2="85" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <text x="278" y="80" textAnchor="middle" fill="#64748b" fontSize="8">extends</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function FunctionalInterfaces({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [userCode, setUserCode] = useState('')
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  const practiceProblems = [
    {
      id: 1,
      title: 'Implement Predicate',
      difficulty: 'Easy',
      description: 'Create a Predicate that checks if a string is a valid email format.',
      example: 'isValidEmail.test("user@example.com") → true',
      instructions: `Create a Predicate<String> that validates email addresses.

**Requirements:**
1. The email must contain exactly one '@' symbol
2. There must be at least one character before the '@'
3. There must be at least one '.' after the '@'
4. The domain part (after '@') must have at least 2 characters after the last '.'

**Test Cases:**
- "user@example.com" → true
- "test.email@domain.org" → true
- "invalid" → false
- "@nodomain.com" → false
- "no@dot" → false`,
      starterCode: `import java.util.function.Predicate;

public class EmailValidator {
    public static void main(String[] args) {
        // TODO: Create a Predicate<String> called isValidEmail
        // that returns true if the string is a valid email format
        
        Predicate<String> isValidEmail = email -> {
            // Your implementation here
            return false; // Replace this
        };
        
        // Test cases
        System.out.println(isValidEmail.test("user@example.com"));  // true
        System.out.println(isValidEmail.test("test@domain.org"));   // true
        System.out.println(isValidEmail.test("invalid"));           // false
        System.out.println(isValidEmail.test("@nodomain.com"));     // false
    }
}`,
      solution: `import java.util.function.Predicate;

public class EmailValidator {
    public static void main(String[] args) {
        Predicate<String> isValidEmail = email -> {
            if (email == null || !email.contains("@")) return false;
            
            String[] parts = email.split("@");
            if (parts.length != 2) return false;
            
            String local = parts[0];
            String domain = parts[1];
            
            // Check local part has content
            if (local.isEmpty()) return false;
            
            // Check domain has a dot and valid structure
            if (!domain.contains(".")) return false;
            int lastDot = domain.lastIndexOf(".");
            if (lastDot < 1 || domain.length() - lastDot <= 2) return false;
            
            return true;
        };
        
        // Test cases
        System.out.println(isValidEmail.test("user@example.com"));  // true
        System.out.println(isValidEmail.test("test@domain.org"));   // true
        System.out.println(isValidEmail.test("invalid"));           // false
        System.out.println(isValidEmail.test("@nodomain.com"));     // false
    }
}`
    },
    {
      id: 2,
      title: 'Function Chaining',
      difficulty: 'Medium',
      description: 'Chain Function interfaces to transform data through multiple steps.',
      example: 'parse.andThen(validate).andThen(save)',
      instructions: `Create a data processing pipeline using Function chaining.

**Requirements:**
1. Create a Function<String, Integer> called 'parse' that extracts a number from a string like "Value: 42"
2. Create a Function<Integer, Integer> called 'double' that doubles the number
3. Create a Function<Integer, String> called 'format' that formats as "Result: X"
4. Chain them together using andThen()

**Expected Flow:**
"Value: 25" → parse → 25 → double → 50 → format → "Result: 50"`,
      starterCode: `import java.util.function.Function;

public class FunctionChaining {
    public static void main(String[] args) {
        // TODO: Create parse function (String -> Integer)
        Function<String, Integer> parse = str -> {
            // Extract number from "Value: X" format
            return 0; // Replace this
        };
        
        // TODO: Create double function (Integer -> Integer)
        Function<Integer, Integer> doubleIt = n -> {
            return 0; // Replace this
        };
        
        // TODO: Create format function (Integer -> String)
        Function<Integer, String> format = n -> {
            return ""; // Replace this
        };
        
        // TODO: Chain them together
        Function<String, String> pipeline = null; // Chain parse, doubleIt, format
        
        // Test
        System.out.println(pipeline.apply("Value: 25")); // Should print "Result: 50"
        System.out.println(pipeline.apply("Value: 10")); // Should print "Result: 20"
    }
}`,
      solution: `import java.util.function.Function;

public class FunctionChaining {
    public static void main(String[] args) {
        // Parse: extract number from "Value: X" format
        Function<String, Integer> parse = str -> {
            String numStr = str.replace("Value: ", "").trim();
            return Integer.parseInt(numStr);
        };
        
        // Double the number
        Function<Integer, Integer> doubleIt = n -> n * 2;
        
        // Format as "Result: X"
        Function<Integer, String> format = n -> "Result: " + n;
        
        // Chain them together using andThen
        Function<String, String> pipeline = parse.andThen(doubleIt).andThen(format);
        
        // Test
        System.out.println(pipeline.apply("Value: 25")); // Result: 50
        System.out.println(pipeline.apply("Value: 10")); // Result: 20
    }
}`
    },
    {
      id: 3,
      title: 'BiFunction Usage',
      difficulty: 'Medium',
      description: 'Use BiFunction to merge two maps with custom merge logic.',
      example: 'BiFunction<Map, Map, Map> merger',
      instructions: `Create a BiFunction that merges two Maps with custom logic.

**Requirements:**
1. Create a BiFunction<Map<String, Integer>, Map<String, Integer>, Map<String, Integer>>
2. When keys exist in both maps, sum the values
3. When a key exists in only one map, include it as-is
4. Return a new merged map

**Example:**
Map1: {"a": 1, "b": 2}
Map2: {"b": 3, "c": 4}
Result: {"a": 1, "b": 5, "c": 4}`,
      starterCode: `import java.util.function.BiFunction;
import java.util.Map;
import java.util.HashMap;

public class MapMerger {
    public static void main(String[] args) {
        // TODO: Create a BiFunction that merges two maps
        // When keys overlap, sum the values
        BiFunction<Map<String, Integer>, Map<String, Integer>, Map<String, Integer>> merger = 
            (map1, map2) -> {
                // Your implementation here
                return new HashMap<>(); // Replace this
            };
        
        // Test
        Map<String, Integer> map1 = new HashMap<>();
        map1.put("a", 1);
        map1.put("b", 2);
        
        Map<String, Integer> map2 = new HashMap<>();
        map2.put("b", 3);
        map2.put("c", 4);
        
        Map<String, Integer> result = merger.apply(map1, map2);
        System.out.println(result); // {a=1, b=5, c=4}
    }
}`,
      solution: `import java.util.function.BiFunction;
import java.util.Map;
import java.util.HashMap;

public class MapMerger {
    public static void main(String[] args) {
        BiFunction<Map<String, Integer>, Map<String, Integer>, Map<String, Integer>> merger = 
            (map1, map2) -> {
                Map<String, Integer> result = new HashMap<>(map1);
                map2.forEach((key, value) -> 
                    result.merge(key, value, Integer::sum)
                );
                return result;
            };
        
        // Test
        Map<String, Integer> map1 = new HashMap<>();
        map1.put("a", 1);
        map1.put("b", 2);
        
        Map<String, Integer> map2 = new HashMap<>();
        map2.put("b", 3);
        map2.put("c", 4);
        
        Map<String, Integer> result = merger.apply(map1, map2);
        System.out.println(result); // {a=1, b=5, c=4}
    }
}`
    },
    {
      id: 4,
      title: 'Custom Functional Interface',
      difficulty: 'Easy',
      description: 'Create a TriConsumer functional interface that accepts three arguments.',
      example: '@FunctionalInterface TriConsumer<T,U,V>',
      instructions: `Create a custom functional interface called TriConsumer.

**Requirements:**
1. Annotate with @FunctionalInterface
2. Define a single abstract method 'accept' that takes 3 parameters
3. The method should return void (it's a Consumer)
4. Add a default method 'andThen' for chaining

**Usage Example:**
TriConsumer<String, Integer, Boolean> logger = 
    (name, age, active) -> System.out.println(name + ", " + age + ", " + active);
logger.accept("John", 30, true);`,
      starterCode: `// TODO: Create the TriConsumer functional interface
// @FunctionalInterface
// public interface TriConsumer<T, U, V> {
//     void accept(T t, U u, V v);
// }

public class TriConsumerDemo {
    public static void main(String[] args) {
        // TODO: Implement TriConsumer interface above, then use it here
        
        // Example usage (uncomment when interface is ready):
        // TriConsumer<String, Integer, Boolean> printPerson = 
        //     (name, age, active) -> 
        //         System.out.println("Name: " + name + ", Age: " + age + ", Active: " + active);
        
        // printPerson.accept("Alice", 25, true);
        // printPerson.accept("Bob", 30, false);
    }
}`,
      solution: `@FunctionalInterface
interface TriConsumer<T, U, V> {
    void accept(T t, U u, V v);
    
    default TriConsumer<T, U, V> andThen(TriConsumer<? super T, ? super U, ? super V> after) {
        return (t, u, v) -> {
            accept(t, u, v);
            after.accept(t, u, v);
        };
    }
}

public class TriConsumerDemo {
    public static void main(String[] args) {
        TriConsumer<String, Integer, Boolean> printPerson = 
            (name, age, active) -> 
                System.out.println("Name: " + name + ", Age: " + age + ", Active: " + active);
        
        TriConsumer<String, Integer, Boolean> logStatus = 
            (name, age, active) -> 
                System.out.println("Status: " + (active ? "ACTIVE" : "INACTIVE"));
        
        // Chain them together
        TriConsumer<String, Integer, Boolean> combined = printPerson.andThen(logStatus);
        
        combined.accept("Alice", 25, true);
        System.out.println("---");
        combined.accept("Bob", 30, false);
    }
}`
    }
  ]

  const openProblem = (problem) => {
    setSelectedProblem(problem)
    setUserCode(problem.starterCode)
    setShowSolution(false)
  }

  const closeProblem = () => {
    setSelectedProblem(null)
    setUserCode('')
    setShowSolution(false)
  }

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'built-in-interfaces',
      name: 'Built-in Functional Interfaces',
      icon: '🔧',
      color: '#d946ef',
      description: 'Master the core functional interfaces in java.util.function: Function, Consumer, Supplier, Predicate, and their variants.',
      diagram: FunctionDiagram,
      details: [
        {
          name: 'Function<T, R>',
          diagram: FunctionDiagram,
          explanation: 'Function<T, R> transforms an input of type T into an output of type R. It has one abstract method: R apply(T t). Functions can be chained using andThen() (apply this first, then another) or compose() (apply another first, then this). Common use cases include data transformation, mapping operations in streams, and any scenario where you need to convert one type to another.',
          codeExample: `import java.util.function.*;

public class FunctionExample {
    public static void main(String[] args) {
        // Basic Function: String -> Integer
        Function<String, Integer> length = s -> s.length();
        Function<Integer, Integer> square = n -> n * n;

        System.out.println("Length of 'hello': " + length.apply("hello")); // 5
        System.out.println("Square of 5: " + square.apply(5)); // 25

        // Chaining with andThen (apply length, then square)
        Function<String, Integer> lengthSquared = length.andThen(square);
        System.out.println("Length squared: " + lengthSquared.apply("hello")); // 25

        // Chaining with compose (apply length first, then this)
        Function<String, Integer> sameResult = square.compose(length);
        System.out.println("Same result: " + sameResult.apply("hello")); // 25

        // Method reference
        Function<String, String> upper = String::toUpperCase;
        System.out.println(upper.apply("hello")); // HELLO
    }
}`
        },
        {
          name: 'Consumer<T>',
          diagram: ConsumerDiagram,
          explanation: 'Consumer<T> accepts a single input and returns nothing (void). It represents an operation that produces a side effect, such as printing, logging, or modifying external state. The abstract method is void accept(T t). Consumers can be chained with andThen() to perform multiple operations in sequence. Common use cases include forEach operations, logging, and callback patterns.',
          codeExample: `import java.util.function.*;
import java.util.*;

public class ConsumerExample {
    public static void main(String[] args) {
        // Basic Consumer
        Consumer<String> printer = s -> System.out.println(s);
        Consumer<String> upperPrinter = s -> System.out.println(s.toUpperCase());

        printer.accept("hello"); // hello
        upperPrinter.accept("hello"); // HELLO

        // Chaining with andThen
        Consumer<String> both = printer.andThen(upperPrinter);
        both.accept("test"); // test, then TEST

        // Common use: forEach
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        names.forEach(printer); // Prints each name

        // Method reference
        Consumer<String> log = System.out::println;
        log.accept("Logging this message");
    }
}`
        },
        {
          name: 'Supplier<T>',
          diagram: SupplierDiagram,
          explanation: 'Supplier<T> takes no arguments and returns a value of type T. It represents a factory or generator pattern. The abstract method is T get(). Suppliers are perfect for lazy evaluation, object factories, and default value providers. They are commonly used with Optional.orElseGet() for lazy default values and in dependency injection scenarios.',
          codeExample: `import java.util.function.*;
import java.util.*;

public class SupplierExample {
    public static void main(String[] args) {
        // Basic Suppliers
        Supplier<Double> random = () -> Math.random();
        Supplier<UUID> uuidGenerator = UUID::randomUUID;
        Supplier<List<String>> listFactory = ArrayList::new;

        System.out.println("Random: " + random.get());
        System.out.println("UUID: " + uuidGenerator.get());
        System.out.println("New list: " + listFactory.get());

        // Lazy evaluation with Optional
        Optional<String> empty = Optional.empty();

        // orElse ALWAYS evaluates the default (even if value exists)
        String eager = empty.orElse(expensiveComputation()); // Called!

        // orElseGet only evaluates if empty (lazy)
        String lazy = empty.orElseGet(() -> expensiveComputation()); // Called only if empty

        // Factory pattern
        Supplier<Connection> connectionFactory = Connection::new;
        Connection conn = connectionFactory.get();
    }

    static String expensiveComputation() {
        System.out.println("Computing expensive value...");
        return "Expensive Result";
    }
}`
        },
        {
          name: 'Predicate<T>',
          diagram: PredicateDiagram,
          explanation: 'Predicate<T> takes an input and returns a boolean. It represents a test or condition. The abstract method is boolean test(T t). Predicates can be combined using and(), or(), and negate() for complex conditions. They are essential for filtering in streams, validation logic, and conditional processing.',
          codeExample: `import java.util.function.*;
import java.util.*;
import java.util.stream.*;

public class PredicateExample {
    public static void main(String[] args) {
        // Basic Predicates
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<String> isEmpty = String::isEmpty;

        System.out.println("4 is even? " + isEven.test(4)); // true
        System.out.println("3 is even? " + isEven.test(3)); // false

        // Combining predicates
        Predicate<Integer> isEvenAndPositive = isEven.and(isPositive);
        Predicate<Integer> isEvenOrPositive = isEven.or(isPositive);
        Predicate<Integer> isOdd = isEven.negate();

        System.out.println("-4 even and positive? " + isEvenAndPositive.test(-4)); // false
        System.out.println("5 is odd? " + isOdd.test(5)); // true

        // Stream filtering
        List<Integer> numbers = Arrays.asList(-3, -2, -1, 0, 1, 2, 3, 4, 5);
        List<Integer> evenPositive = numbers.stream()
            .filter(isEvenAndPositive)
            .collect(Collectors.toList());
        System.out.println("Even and positive: " + evenPositive); // [2, 4]

        // Collection removeIf
        List<Integer> mutableList = new ArrayList<>(numbers);
        mutableList.removeIf(isEven);
        System.out.println("After removing even: " + mutableList);
    }
}`
        },
        {
          name: 'BiFunction & Operators',
          diagram: BiFunctionDiagram,
          explanation: 'BiFunction<T, U, R> takes two arguments of different types and returns a result. BinaryOperator<T> is a special case where both inputs and output are the same type - commonly used in reduce operations. UnaryOperator<T> is Function<T, T> for same-type transformations. BiConsumer and BiPredicate are the two-argument versions of Consumer and Predicate.',
          codeExample: `import java.util.function.*;
import java.util.*;

public class BiFunctionExample {
    public static void main(String[] args) {
        // BiFunction: (T, U) -> R
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
        BiFunction<String, String, String> concat = (s1, s2) -> s1 + s2;

        System.out.println("5 + 3 = " + add.apply(5, 3)); // 8
        System.out.println("Concat: " + concat.apply("Hello", "World")); // HelloWorld

        // BinaryOperator: (T, T) -> T - used in reduce
        BinaryOperator<Integer> max = (a, b) -> a > b ? a : b;
        BinaryOperator<Integer> multiply = (a, b) -> a * b;

        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        int product = nums.stream().reduce(1, multiply);
        System.out.println("Product: " + product); // 120

        // UnaryOperator: T -> T
        UnaryOperator<Integer> square = n -> n * n;
        UnaryOperator<String> upper = String::toUpperCase;

        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3));
        numbers.replaceAll(square);
        System.out.println("Squared: " + numbers); // [1, 4, 9]

        // BiConsumer: (T, U) -> void
        BiConsumer<String, Integer> printWithCount =
            (s, n) -> System.out.println(s + " x" + n);
        printWithCount.accept("Item", 5); // Item x5

        // BiPredicate: (T, U) -> boolean
        BiPredicate<String, Integer> longerThan =
            (s, n) -> s.length() > n;
        System.out.println(longerThan.test("Hello", 3)); // true
    }
}`
        }
      ]
    },
    {
      id: 'custom-interfaces',
      name: 'Custom Functional Interfaces',
      icon: '🎯',
      color: '#f59e0b',
      description: 'Design custom functional interfaces with @FunctionalInterface annotation. Learn SAM requirements, default methods, and when to create custom vs using built-in.',
      diagram: CustomInterfaceDiagram,
      details: [
        {
          name: '@FunctionalInterface Rules',
          diagram: CustomInterfaceDiagram,
          explanation: 'The @FunctionalInterface annotation ensures a interface has exactly one abstract method (SAM - Single Abstract Method). The annotation is optional but recommended as it provides compile-time validation. You can have unlimited default methods, static methods, and methods that override Object methods (equals, hashCode, toString). The key benefit is enabling lambda expression implementation.',
          codeExample: `// Valid: Exactly ONE abstract method
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);  // SAM - required

    // Default methods are allowed (any number)
    default int square(int n) {
        return calculate(n, n);
    }

    default int doubleIt(int n) {
        return calculate(n, 2);
    }

    // Static methods are allowed (any number)
    static Calculator adder() {
        return (a, b) -> a + b;
    }

    static Calculator multiplier() {
        return (a, b) -> a * b;
    }

    // Object method overrides are allowed
    boolean equals(Object obj);  // Doesn't count as abstract
    String toString();           // Doesn't count as abstract
}

// INVALID - Compilation error with @FunctionalInterface
// @FunctionalInterface
// interface Invalid {
//     void method1();
//     void method2();  // Error: Multiple abstract methods
// }

public class FunctionalInterfaceRules {
    public static void main(String[] args) {
        // Lambda implementation
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;

        System.out.println(add.calculate(5, 3));      // 8
        System.out.println(add.square(5));            // 25
        System.out.println(multiply.calculate(5, 3)); // 15

        // Using static factory
        Calculator calc = Calculator.adder();
        System.out.println(calc.calculate(10, 20));   // 30
    }
}`
        },
        {
          name: 'TriFunction & Multi-Parameter',
          explanation: 'Java only provides up to BiFunction (2 parameters). For 3+ parameters, you need custom interfaces. This is a common pattern when the built-in interfaces are insufficient. You can also create specialized interfaces with domain-specific method names that are more readable than generic "apply" methods.',
          codeExample: `// Three-argument function (not in java.util.function)
@FunctionalInterface
interface TriFunction<T, U, V, R> {
    R apply(T t, U u, V v);

    // Optional: Add composition methods
    default <W> TriFunction<T, U, V, W> andThen(Function<R, W> after) {
        return (t, u, v) -> after.apply(apply(t, u, v));
    }
}

// Four-argument function
@FunctionalInterface
interface QuadFunction<T, U, V, W, R> {
    R apply(T t, U u, V v, W w);
}

// Domain-specific interface with descriptive name
@FunctionalInterface
interface PriceCalculator {
    double calculatePrice(double basePrice, double taxRate, double discount);
}

public class MultiParameterInterfaces {
    public static void main(String[] args) {
        // TriFunction usage
        TriFunction<Integer, Integer, Integer, Integer> sumOfThree =
            (a, b, c) -> a + b + c;
        System.out.println("Sum: " + sumOfThree.apply(1, 2, 3)); // 6

        // With andThen
        TriFunction<Integer, Integer, Integer, String> sumAsString =
            sumOfThree.andThen(Object::toString);
        System.out.println("As string: " + sumAsString.apply(1, 2, 3)); // "6"

        // Domain-specific interface
        PriceCalculator calculator = (base, tax, discount) ->
            base * (1 + tax) * (1 - discount);

        double price = calculator.calculatePrice(100.0, 0.08, 0.10);
        System.out.println("Final price: $" + price); // $97.2
    }
}`
        },
        {
          name: 'Validator Pattern',
          explanation: 'Custom functional interfaces excel at creating domain-specific APIs. The Validator pattern shows how to build composable validation logic using functional interfaces with default methods for chaining. This creates fluent, readable validation code.',
          codeExample: `@FunctionalInterface
interface Validator<T> {
    boolean validate(T value);

    // Combine validators with AND logic
    default Validator<T> and(Validator<T> other) {
        return value -> this.validate(value) && other.validate(value);
    }

    // Combine validators with OR logic
    default Validator<T> or(Validator<T> other) {
        return value -> this.validate(value) || other.validate(value);
    }

    // Negate validator
    default Validator<T> negate() {
        return value -> !this.validate(value);
    }

    // Factory methods
    static <T> Validator<T> alwaysTrue() {
        return value -> true;
    }

    static <T> Validator<T> alwaysFalse() {
        return value -> false;
    }
}

public class ValidatorPattern {
    public static void main(String[] args) {
        // Define validators
        Validator<String> notNull = s -> s != null;
        Validator<String> notEmpty = s -> !s.isEmpty();
        Validator<String> longerThan5 = s -> s.length() > 5;
        Validator<String> containsAt = s -> s.contains("@");

        // Compose validators for email validation
        Validator<String> validEmail = notNull
            .and(notEmpty)
            .and(longerThan5)
            .and(containsAt);

        // Test
        System.out.println(validEmail.validate("user@example.com")); // true
        System.out.println(validEmail.validate("hi")); // false
        System.out.println(validEmail.validate(null)); // false

        // OR composition
        Validator<String> adminOrModerator =
            ((Validator<String>) s -> s.startsWith("admin"))
            .or(s -> s.startsWith("mod"));

        System.out.println(adminOrModerator.validate("admin_user")); // true
        System.out.println(adminOrModerator.validate("mod_user")); // true
        System.out.println(adminOrModerator.validate("regular_user")); // false
    }
}`
        },
        {
          name: 'Parser with Exception Handling',
          explanation: 'Functional interfaces can declare checked exceptions, unlike the built-in interfaces which cannot. This is useful for parsing, I/O operations, and other scenarios where exceptions are expected. You can also provide default methods for safe parsing with fallback values.',
          codeExample: `// Custom exception
class ParseException extends Exception {
    public ParseException(String message) {
        super(message);
    }
}

// Parser interface that can throw exceptions
@FunctionalInterface
interface Parser<T> {
    T parse(String input) throws ParseException;

    // Safe parsing with default value
    default T parseOrDefault(String input, T defaultValue) {
        try {
            return parse(input);
        } catch (ParseException e) {
            return defaultValue;
        }
    }

    // Safe parsing with exception handler
    default T parseOrHandle(String input,
                            java.util.function.Consumer<ParseException> handler,
                            T defaultValue) {
        try {
            return parse(input);
        } catch (ParseException e) {
            handler.accept(e);
            return defaultValue;
        }
    }
}

public class ParserPattern {
    public static void main(String[] args) {
        // Integer parser
        Parser<Integer> intParser = input -> {
            try {
                return Integer.parseInt(input.trim());
            } catch (NumberFormatException e) {
                throw new ParseException("Invalid integer: " + input);
            }
        };

        // Safe parsing
        Integer value1 = intParser.parseOrDefault("123", 0);
        Integer value2 = intParser.parseOrDefault("abc", 0);
        System.out.println("Parsed: " + value1); // 123
        System.out.println("Default: " + value2); // 0

        // With error logging
        Integer value3 = intParser.parseOrHandle(
            "invalid",
            e -> System.err.println("Parse error: " + e.getMessage()),
            -1
        );

        // JSON-like parser
        Parser<Map<String, String>> simpleJsonParser = input -> {
            if (!input.startsWith("{") || !input.endsWith("}")) {
                throw new ParseException("Invalid JSON format");
            }
            // Simplified parsing...
            return new HashMap<>();
        };
    }
}`
        }
      ]
    },
    {
      id: 'optional-api',
      name: 'Optional with Functional Interfaces',
      icon: '📦',
      color: '#8b5cf6',
      description: 'Master Optional API with functional programming. Learn map, flatMap, filter, ifPresent, orElse, orElseGet, and how to avoid null checks functionally.',
      diagram: OptionalDiagram,
      details: [
        {
          name: 'Creating Optionals',
          diagram: OptionalDiagram,
          explanation: 'Optional<T> is a container that may or may not contain a value. Use Optional.of() for non-null values (throws NullPointerException if null), Optional.ofNullable() for potentially null values, and Optional.empty() for explicitly empty containers. Never use null for Optional variables - use empty() instead.',
          codeExample: `import java.util.Optional;

public class CreatingOptionals {
    public static void main(String[] args) {
        // of() - for non-null values only
        Optional<String> opt1 = Optional.of("Hello");
        System.out.println(opt1); // Optional[Hello]

        // Optional.of(null) throws NullPointerException!
        // Optional<String> bad = Optional.of(null); // NPE!

        // ofNullable() - for potentially null values
        String maybeNull = getMaybeNull();
        Optional<String> opt2 = Optional.ofNullable(maybeNull);
        System.out.println(opt2); // Optional.empty or Optional[value]

        // empty() - explicitly empty
        Optional<String> opt3 = Optional.empty();
        System.out.println(opt3); // Optional.empty

        // Check presence
        System.out.println("opt1 present? " + opt1.isPresent()); // true
        System.out.println("opt3 present? " + opt3.isPresent()); // false

        // Java 11+: isEmpty()
        System.out.println("opt3 empty? " + opt3.isEmpty()); // true

        // DON'T DO THIS:
        // Optional<String> wrong = null; // NEVER use null for Optional!
    }

    static String getMaybeNull() {
        return Math.random() > 0.5 ? "Value" : null;
    }
}`
        },
        {
          name: 'map() Transformation',
          explanation: 'Optional.map(Function) transforms the value inside the Optional if present. If the Optional is empty, map() returns an empty Optional without executing the function. This enables safe chaining of transformations without null checks. The function should not return null - use flatMap() if your function returns an Optional.',
          codeExample: `import java.util.Optional;
import java.util.function.Function;

public class OptionalMap {
    public static void main(String[] args) {
        Optional<String> name = Optional.of("  alice  ");

        // Single transformation
        Optional<String> upper = name.map(String::toUpperCase);
        System.out.println(upper); // Optional[  ALICE  ]

        // Chained transformations
        Optional<Integer> length = name
            .map(String::trim)         // "alice"
            .map(String::toUpperCase)  // "ALICE"
            .map(String::length);      // 5

        System.out.println("Length: " + length.get()); // 5

        // Empty Optional - map not executed
        Optional<String> empty = Optional.empty();
        Optional<String> result = empty.map(s -> {
            System.out.println("This won't print");
            return s.toUpperCase();
        });
        System.out.println(result); // Optional.empty

        // Complex transformation
        Optional<User> user = findUser(1);
        Optional<String> email = user
            .map(User::getEmail)
            .map(String::toLowerCase);

        System.out.println("Email: " + email.orElse("no email"));
    }

    static Optional<User> findUser(int id) {
        return id == 1 ? Optional.of(new User("alice@example.com"))
                       : Optional.empty();
    }
}

class User {
    private String email;
    User(String email) { this.email = email; }
    String getEmail() { return email; }
}`
        },
        {
          name: 'flatMap() for Nested Optionals',
          explanation: 'Use flatMap() when your transformation function returns an Optional. While map() would create Optional<Optional<T>>, flatMap() flattens to Optional<T>. This is essential for chaining operations that each might fail. It prevents the awkward nested Optionals and enables clean method chaining.',
          codeExample: `import java.util.Optional;

public class OptionalFlatMap {
    public static void main(String[] args) {
        // Problem: map() creates nested Optionals
        Optional<String> userId = Optional.of("1");

        // Using map - creates Optional<Optional<User>>
        Optional<Optional<User>> nested = userId.map(id -> findUser(id));
        // Awkward to work with!

        // Using flatMap - flattens to Optional<User>
        Optional<User> user = userId.flatMap(id -> findUser(id));
        System.out.println(user); // Optional[User]

        // Chaining multiple operations that return Optional
        Optional<String> domain = Optional.of("1")
            .flatMap(id -> findUser(id))         // Optional<User>
            .flatMap(u -> findEmail(u))          // Optional<String>
            .flatMap(email -> findDomain(email)); // Optional<String>

        System.out.println("Domain: " + domain.orElse("unknown"));

        // Real-world example: nested objects
        Optional<Company> company = getCompany();
        Optional<String> ceoEmail = company
            .flatMap(c -> c.getCeo())           // CEO might not exist
            .flatMap(ceo -> ceo.getEmail())     // Email might not exist
            .map(String::toLowerCase);          // Transform if present

        System.out.println("CEO Email: " + ceoEmail.orElse("N/A"));
    }

    static Optional<User> findUser(String id) {
        return "1".equals(id) ? Optional.of(new User("alice")) : Optional.empty();
    }

    static Optional<String> findEmail(User user) {
        return Optional.ofNullable(user.email);
    }

    static Optional<String> findDomain(String email) {
        int idx = email.indexOf('@');
        return idx > 0 ? Optional.of(email.substring(idx + 1)) : Optional.empty();
    }

    static Optional<Company> getCompany() {
        return Optional.of(new Company());
    }
}

class User {
    String email = "alice@example.com";
    User(String name) {}
}
class Company {
    Optional<CEO> getCeo() { return Optional.of(new CEO()); }
}
class CEO {
    Optional<String> getEmail() { return Optional.of("ceo@company.com"); }
}`
        },
        {
          name: 'filter() and Retrieval',
          explanation: 'filter(Predicate) keeps the value only if the predicate returns true, otherwise returns empty Optional. For retrieving values: orElse(T) always evaluates the default, orElseGet(Supplier) lazily evaluates only if empty, orElseThrow() throws an exception if empty, and ifPresent(Consumer) executes only if a value is present.',
          codeExample: `import java.util.Optional;
import java.util.NoSuchElementException;

public class OptionalFilterRetrieval {
    public static void main(String[] args) {
        // filter() - conditional presence
        Optional<Integer> number = Optional.of(42);

        Optional<Integer> even = number.filter(n -> n % 2 == 0);
        Optional<Integer> odd = number.filter(n -> n % 2 == 1);

        System.out.println("Even: " + even);  // Optional[42]
        System.out.println("Odd: " + odd);    // Optional.empty

        // Chaining filter with map
        Optional<String> validEmail = Optional.of("user@example.com")
            .filter(s -> s.contains("@"))
            .filter(s -> s.length() > 5)
            .map(String::toLowerCase);

        // ===== RETRIEVAL METHODS =====

        // orElse - ALWAYS evaluates the default
        Optional<String> empty = Optional.empty();
        Optional<String> present = Optional.of("value");

        // This computes default even though present has value!
        String r1 = present.orElse(computeDefault()); // "Computing..." printed!
        System.out.println(r1); // "value" (but default was computed)

        // orElseGet - LAZY evaluation (only if empty)
        String r2 = present.orElseGet(() -> computeDefault()); // Not printed!
        System.out.println(r2); // "value" (default NOT computed)

        String r3 = empty.orElseGet(() -> computeDefault()); // "Computing..." printed
        System.out.println(r3); // "default"

        // orElseThrow - throws if empty
        try {
            String value = empty.orElseThrow(() ->
                new IllegalStateException("Value required"));
        } catch (IllegalStateException e) {
            System.out.println("Caught: " + e.getMessage());
        }

        // ifPresent - execute only if present
        present.ifPresent(System.out::println); // Prints "value"
        empty.ifPresent(System.out::println);   // Does nothing

        // Java 9+: ifPresentOrElse
        present.ifPresentOrElse(
            v -> System.out.println("Found: " + v),
            () -> System.out.println("Not found")
        );
    }

    static String computeDefault() {
        System.out.println("Computing expensive default...");
        return "default";
    }
}`
        }
      ]
    },
    {
      id: 'composable-apis',
      name: 'Composable APIs',
      icon: '🔗',
      color: '#22c55e',
      description: 'Design fluent, composable APIs using functional interfaces. Build DSLs, method chaining, builder patterns, and pipeline-style APIs for expressive code.',
      diagram: ComposableApisDiagram,
      details: [
        {
          name: 'Query Builder DSL',
          diagram: ComposableApisDiagram,
          explanation: 'The Query Builder pattern creates a fluent API for constructing database-like queries. By accepting Predicate<T> for conditions and returning "this" from each method, you enable method chaining. This pattern is used in JPA Criteria API, Stream API, and many testing frameworks.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

class QueryBuilder<T> {
    private List<T> data;
    private List<String> selectFields = new ArrayList<>();
    private List<Predicate<T>> conditions = new ArrayList<>();
    private Comparator<T> orderBy = null;
    private int limitCount = -1;

    public QueryBuilder(List<T> data) {
        this.data = data;
    }

    public QueryBuilder<T> select(String... fields) {
        selectFields.addAll(Arrays.asList(fields));
        return this;
    }

    public QueryBuilder<T> where(Predicate<T> condition) {
        conditions.add(condition);
        return this;
    }

    public QueryBuilder<T> orderBy(Comparator<T> comparator) {
        this.orderBy = comparator;
        return this;
    }

    public QueryBuilder<T> limit(int count) {
        this.limitCount = count;
        return this;
    }

    public List<T> execute() {
        Stream<T> stream = data.stream();

        // Apply all conditions
        Predicate<T> combined = conditions.stream()
            .reduce(Predicate::and)
            .orElse(t -> true);
        stream = stream.filter(combined);

        // Apply ordering
        if (orderBy != null) {
            stream = stream.sorted(orderBy);
        }

        // Apply limit
        if (limitCount > 0) {
            stream = stream.limit(limitCount);
        }

        return stream.collect(Collectors.toList());
    }
}

// Usage
public class QueryBuilderDemo {
    public static void main(String[] args) {
        List<Map<String, Object>> users = Arrays.asList(
            Map.of("name", "Alice", "age", 30, "active", true),
            Map.of("name", "Bob", "age", 25, "active", false),
            Map.of("name", "Charlie", "age", 35, "active", true)
        );

        var results = new QueryBuilder<>(users)
            .select("name", "age")
            .where(u -> (Integer) u.get("age") > 25)
            .where(u -> (Boolean) u.get("active"))
            .orderBy(Comparator.comparing(u -> (Integer) u.get("age")))
            .limit(10)
            .execute();

        System.out.println(results);
        // [{name=Alice, age=30, active=true}, {name=Charlie, age=35, active=true}]
    }
}`
        },
        {
          name: 'Pipeline Pattern',
          explanation: 'The Pipeline pattern chains operations that transform data through a series of steps. Each step is a Function<T, T> that can be added conditionally. This is similar to Unix pipes and is excellent for data processing, text transformation, and ETL workflows.',
          codeExample: `import java.util.*;
import java.util.function.*;

class Pipeline<T> {
    private final List<Function<T, T>> operations = new ArrayList<>();

    public Pipeline<T> add(Function<T, T> operation) {
        operations.add(operation);
        return this;
    }

    public Pipeline<T> addIf(boolean condition, Function<T, T> operation) {
        if (condition) {
            operations.add(operation);
        }
        return this;
    }

    public Pipeline<T> addAll(List<Function<T, T>> ops) {
        operations.addAll(ops);
        return this;
    }

    public T execute(T input) {
        T result = input;
        for (Function<T, T> op : operations) {
            result = op.apply(result);
        }
        return result;
    }

    // Using Function.andThen for composition
    public Function<T, T> compose() {
        return operations.stream()
            .reduce(Function.identity(), Function::andThen);
    }
}

public class PipelineDemo {
    public static void main(String[] args) {
        // Text processing pipeline
        Pipeline<String> textProcessor = new Pipeline<String>()
            .add(String::trim)
            .add(String::toLowerCase)
            .add(s -> s.replaceAll("\\\\s+", "-"))
            .addIf(true, s -> s.replaceAll("[^a-z0-9-]", ""))
            .add(s -> s + ".html");

        String result = textProcessor.execute("  Hello World! 2024  ");
        System.out.println(result); // hello-world-2024.html

        // Number processing pipeline
        Pipeline<Integer> numberProcessor = new Pipeline<Integer>()
            .add(n -> n * 2)
            .add(n -> n + 10)
            .add(n -> Math.abs(n));

        System.out.println(numberProcessor.execute(5));  // 20
        System.out.println(numberProcessor.execute(-5)); // 0

        // Get composed function for reuse
        Function<Integer, Integer> composed = numberProcessor.compose();
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> processed = numbers.stream()
            .map(composed)
            .toList();
        System.out.println(processed); // [12, 14, 16, 18, 20]
    }
}`
        },
        {
          name: 'Event Stream Builder',
          explanation: 'The Event Stream pattern uses functional interfaces to create reactive-style event handling. Events are filtered using Predicates and handled using Consumers. This enables conditional event processing with clean, declarative syntax similar to RxJava or reactive streams.',
          codeExample: `import java.util.*;
import java.util.function.*;

class EventStream<T> {
    private final List<EventHandler<T>> handlers = new ArrayList<>();

    private record EventHandler<T>(Predicate<T> condition, Consumer<T> handler) {}

    public EventStream<T> on(Predicate<T> condition, Consumer<T> handler) {
        handlers.add(new EventHandler<>(condition, handler));
        return this;
    }

    public EventStream<T> onAll(Consumer<T> handler) {
        return on(e -> true, handler);
    }

    public EventStream<T> onType(Class<?> type, Consumer<T> handler) {
        return on(e -> type.isInstance(e), handler);
    }

    public void emit(T event) {
        handlers.forEach(h -> {
            if (h.condition().test(event)) {
                h.handler().accept(event);
            }
        });
    }

    public void emitAll(Collection<T> events) {
        events.forEach(this::emit);
    }
}

public class EventStreamDemo {
    public static void main(String[] args) {
        // Integer event stream
        EventStream<Integer> numberStream = new EventStream<Integer>()
            .on(n -> n % 2 == 0, n -> System.out.println("Even: " + n))
            .on(n -> n > 10, n -> System.out.println("Large: " + n))
            .on(n -> n < 0, n -> System.out.println("Negative: " + n))
            .onAll(n -> System.out.println("Received: " + n));

        numberStream.emit(12);
        // Output:
        // Even: 12
        // Large: 12
        // Received: 12

        numberStream.emit(5);
        // Output:
        // Received: 5

        // String event stream with logging
        EventStream<String> logStream = new EventStream<String>()
            .on(s -> s.startsWith("ERROR"), s -> System.err.println("[ERROR] " + s))
            .on(s -> s.startsWith("WARN"), s -> System.out.println("[WARN] " + s))
            .on(s -> s.startsWith("INFO"), s -> System.out.println("[INFO] " + s));

        logStream.emitAll(Arrays.asList(
            "INFO: Application started",
            "WARN: Low memory",
            "ERROR: Connection failed"
        ));
    }
}`
        },
        {
          name: 'Validation Builder',
          explanation: 'A comprehensive validation builder that collects validation errors and provides detailed feedback. This pattern uses Predicates for validation rules and Suppliers for error messages. It supports both fail-fast and collect-all-errors modes.',
          codeExample: `import java.util.*;
import java.util.function.*;

class ValidationResult {
    private final boolean valid;
    private final List<String> errors;

    private ValidationResult(boolean valid, List<String> errors) {
        this.valid = valid;
        this.errors = errors;
    }

    public static ValidationResult valid() {
        return new ValidationResult(true, Collections.emptyList());
    }

    public static ValidationResult invalid(List<String> errors) {
        return new ValidationResult(false, errors);
    }

    public boolean isValid() { return valid; }
    public List<String> getErrors() { return errors; }
}

class Validator<T> {
    private final List<ValidationRule<T>> rules = new ArrayList<>();

    private record ValidationRule<T>(
        Predicate<T> predicate,
        Supplier<String> errorMessage
    ) {}

    public Validator<T> must(Predicate<T> predicate, String errorMessage) {
        rules.add(new ValidationRule<>(predicate, () -> errorMessage));
        return this;
    }

    public Validator<T> must(Predicate<T> predicate, Supplier<String> errorMessage) {
        rules.add(new ValidationRule<>(predicate, errorMessage));
        return this;
    }

    public Validator<T> mustNot(Predicate<T> predicate, String errorMessage) {
        return must(predicate.negate(), errorMessage);
    }

    public <U> Validator<T> property(
            Function<T, U> getter,
            Predicate<U> predicate,
            String errorMessage) {
        return must(t -> predicate.test(getter.apply(t)), errorMessage);
    }

    public ValidationResult validate(T value) {
        List<String> errors = new ArrayList<>();
        for (ValidationRule<T> rule : rules) {
            if (!rule.predicate().test(value)) {
                errors.add(rule.errorMessage().get());
            }
        }
        return errors.isEmpty()
            ? ValidationResult.valid()
            : ValidationResult.invalid(errors);
    }
}

public class ValidationBuilderDemo {
    public static void main(String[] args) {
        Validator<String> emailValidator = new Validator<String>()
            .must(s -> s != null, "Email cannot be null")
            .must(s -> !s.isEmpty(), "Email cannot be empty")
            .must(s -> s.contains("@"), "Email must contain @")
            .must(s -> s.length() >= 5, "Email too short")
            .mustNot(s -> s.contains(" "), "Email cannot have spaces");

        ValidationResult result1 = emailValidator.validate("user@example.com");
        System.out.println("Valid: " + result1.isValid()); // true

        ValidationResult result2 = emailValidator.validate("bad");
        System.out.println("Valid: " + result2.isValid()); // false
        System.out.println("Errors: " + result2.getErrors());
        // [Email must contain @, Email too short]

        // Property-based validation
        record User(String name, int age, String email) {}

        Validator<User> userValidator = new Validator<User>()
            .property(User::name, n -> n != null && !n.isEmpty(), "Name required")
            .property(User::age, a -> a >= 18, "Must be 18+")
            .property(User::email, e -> e.contains("@"), "Invalid email");

        User user = new User("", 16, "invalid");
        ValidationResult userResult = userValidator.validate(user);
        System.out.println("User errors: " + userResult.getErrors());
        // [Name required, Must be 18+, Invalid email]
    }
}`
        }
      ]
    },
    {
      id: 'primitive-interfaces',
      name: 'Primitive Functional Interfaces',
      icon: '⚡',
      color: '#10b981',
      description: 'Specialized functional interfaces for primitives (int, long, double) to avoid boxing/unboxing overhead and improve performance.',
      diagram: PrimitiveDiagram,
      details: [
        {
          name: 'IntFunction & ToIntFunction',
          diagram: PrimitiveDiagram,
          explanation: 'IntFunction<R> takes an int primitive and returns an object of type R. ToIntFunction<T> does the reverse - takes an object and returns an int primitive. These avoid boxing int to Integer and unboxing Integer to int, which saves memory and improves performance. Use IntFunction when you need to convert a primitive int to some object type, and ToIntFunction when you need to extract an int value from an object.',
          codeExample: `import java.util.function.*;
import java.util.*;
import java.util.stream.*;

public class IntFunctionExample {
    public static void main(String[] args) {
        // IntFunction<R>: int -> R (primitive input, object output)
        IntFunction<String> intToStr = i -> "Number: " + i;
        System.out.println(intToStr.apply(42)); // Number: 42

        // ToIntFunction<T>: T -> int (object input, primitive output)
        ToIntFunction<String> strLength = String::length;
        System.out.println(strLength.applyAsInt("Hello")); // 5

        // Real-world usage in streams
        List<String> words = Arrays.asList("hi", "hello", "hey");

        // Without primitive specialization (boxing overhead)
        int[] lengths1 = words.stream()
            .map(String::length)         // Returns Stream<Integer> (BOXED!)
            .mapToInt(Integer::intValue) // Unbox back to int
            .toArray();

        // With ToIntFunction (no boxing - more efficient)
        int[] lengths2 = words.stream()
            .mapToInt(String::length)    // Direct int stream
            .toArray();

        System.out.println(Arrays.toString(lengths2)); // [2, 5, 3]

        // IntFunction for generating objects from ints
        IntFunction<int[]> arrayGenerator = int[]::new;
        int[] arr = arrayGenerator.apply(5);
        System.out.println("Array length: " + arr.length); // 5
    }
}`
        },
        {
          name: 'IntPredicate, IntConsumer, IntSupplier',
          explanation: 'IntPredicate tests int primitives (int -> boolean). IntConsumer accepts int primitives (int -> void). IntSupplier generates int primitives (() -> int). These three follow the same patterns as their generic counterparts but work with int primitives directly. Similar interfaces exist for long and double: LongPredicate, DoubleConsumer, etc. Using these specialized versions avoids the overhead of autoboxing/unboxing.',
          codeExample: `import java.util.function.*;
import java.util.stream.*;
import java.util.*;

public class IntSpecializedExample {
    public static void main(String[] args) {
        // IntPredicate: int -> boolean
        IntPredicate isEven = n -> n % 2 == 0;
        IntPredicate isPositive = n -> n > 0;

        System.out.println("4 is even: " + isEven.test(4)); // true
        System.out.println("-2 is positive: " + isPositive.test(-2)); // false

        // Combining predicates
        IntPredicate evenAndPositive = isEven.and(isPositive);
        System.out.println("4 is even and positive: " + evenAndPositive.test(4)); // true

        // IntConsumer: int -> void
        IntConsumer printSquare = n -> System.out.println(n + " squared = " + (n * n));
        IntConsumer printCube = n -> System.out.println(n + " cubed = " + (n * n * n));

        printSquare.accept(5); // 5 squared = 25

        // Chaining consumers
        IntConsumer both = printSquare.andThen(printCube);
        both.accept(3);
        // 3 squared = 9
        // 3 cubed = 27

        // IntSupplier: () -> int
        Random random = new Random();
        IntSupplier randomDice = () -> random.nextInt(6) + 1;
        IntSupplier constant42 = () -> 42;

        System.out.println("Dice roll: " + randomDice.getAsInt());
        System.out.println("Constant: " + constant42.getAsInt()); // 42

        // Real-world: filtering with IntStream
        int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int sumOfEvenPositives = IntStream.of(numbers)
            .filter(evenAndPositive) // IntPredicate - no boxing!
            .sum();
        System.out.println("Sum of even positives: " + sumOfEvenPositives); // 30

        // Generating random numbers
        int[] randomNumbers = IntStream.generate(randomDice)
            .limit(10)
            .toArray();
        System.out.println("Random dice rolls: " + Arrays.toString(randomNumbers));
    }
}`
        },
        {
          name: 'IntUnaryOperator & IntBinaryOperator',
          explanation: 'IntUnaryOperator transforms an int to another int (int -> int), like squaring or negating. IntBinaryOperator combines two ints into one int ((int, int) -> int), perfect for operations like addition, multiplication, or finding max/min. These are essential for parallel streams and reduce operations where boxing would kill performance. LongUnaryOperator, DoubleBinaryOperator, etc., exist for other primitive types.',
          codeExample: `import java.util.function.*;
import java.util.stream.*;

public class IntOperatorExample {
    public static void main(String[] args) {
        // IntUnaryOperator: int -> int
        IntUnaryOperator square = n -> n * n;
        IntUnaryOperator negate = n -> -n;
        IntUnaryOperator plusOne = n -> n + 1;

        System.out.println("square(5) = " + square.applyAsInt(5)); // 25
        System.out.println("negate(10) = " + negate.applyAsInt(10)); // -10

        // Composing operators
        IntUnaryOperator squareThenNegate = square.andThen(negate);
        System.out.println("squareThenNegate(5) = " + squareThenNegate.applyAsInt(5)); // -25

        IntUnaryOperator negateThenSquare = square.compose(negate);
        System.out.println("negateThenSquare(5) = " + negateThenSquare.applyAsInt(5)); // 25

        // IntBinaryOperator: (int, int) -> int
        IntBinaryOperator add = (a, b) -> a + b;
        IntBinaryOperator multiply = (a, b) -> a * b;
        IntBinaryOperator max = (a, b) -> a > b ? a : b;

        System.out.println("add(3, 4) = " + add.applyAsInt(3, 4)); // 7
        System.out.println("multiply(3, 4) = " + multiply.applyAsInt(3, 4)); // 12
        System.out.println("max(3, 4) = " + max.applyAsInt(3, 4)); // 4

        // Real-world: reduce operations (NO BOXING!)
        int product = IntStream.rangeClosed(1, 10)
            .reduce(1, multiply); // Uses IntBinaryOperator
        System.out.println("10! = " + product); // 3628800

        // Parallel reduction
        int sum = IntStream.rangeClosed(1, 1_000_000)
            .parallel()
            .reduce(0, add); // Efficient parallel reduction
        System.out.println("Sum 1 to 1M = " + sum); // 1784293664 (overflow)

        // Array transformation with replaceAll-like operation
        int[] nums = {1, 2, 3, 4, 5};
        nums = IntStream.of(nums)
            .map(square) // IntUnaryOperator - no boxing!
            .toArray();
        System.out.println("Squared array: " + java.util.Arrays.toString(nums));
        // [1, 4, 9, 16, 25]

        // Performance-critical: process large arrays
        int[] largeArray = IntStream.range(0, 10_000_000)
            .map(n -> n * 2) // IntUnaryOperator - blazing fast
            .toArray();
        System.out.println("Processed " + largeArray.length + " elements");
    }
}`
        },
        {
          name: 'LongFunction, DoubleFunction, etc.',
          explanation: 'Similar specialized interfaces exist for long and double primitives: LongFunction<R>, DoubleToIntFunction, LongPredicate, DoubleConsumer, LongSupplier, LongUnaryOperator, DoubleBinaryOperator, and many more. In total, there are 43 primitive specializations in java.util.function. The naming pattern is consistent: prefix with the primitive type(s) involved. Use these when working with primitives in performance-critical code, especially with large streams or collections.',
          codeExample: `import java.util.function.*;
import java.util.stream.*;

public class AllPrimitiveSpecializations {
    public static void main(String[] args) {
        // LongFunction: long -> R
        LongFunction<String> longToHex = Long::toHexString;
        System.out.println("255 in hex: " + longToHex.apply(255L)); // ff

        // DoubleToIntFunction: double -> int
        DoubleToIntFunction doubleToInt = d -> (int) Math.round(d);
        System.out.println("3.7 rounded: " + doubleToInt.applyAsInt(3.7)); // 4

        // IntToLongFunction: int -> long
        IntToLongFunction square = n -> (long) n * n;
        System.out.println("1000^2 = " + square.applyAsLong(1000)); // 1000000

        // DoubleUnaryOperator: double -> double
        DoubleUnaryOperator sqrt = Math::sqrt;
        DoubleUnaryOperator square2 = d -> d * d;
        System.out.println("sqrt(16) = " + sqrt.applyAsDouble(16.0)); // 4.0

        // DoubleBinaryOperator: (double, double) -> double
        DoubleBinaryOperator avg = (a, b) -> (a + b) / 2.0;
        System.out.println("avg(5, 10) = " + avg.applyAsDouble(5.0, 10.0)); // 7.5

        // LongPredicate: long -> boolean
        LongPredicate isPrime = n -> {
            if (n < 2) return false;
            for (long i = 2; i * i <= n; i++) {
                if (n % i == 0) return false;
            }
            return true;
        };
        System.out.println("17 is prime: " + isPrime.test(17L)); // true

        // DoublePredicate: double -> boolean
        DoublePredicate isInRange = d -> d >= 0.0 && d <= 1.0;
        System.out.println("0.5 in [0,1]: " + isInRange.test(0.5)); // true

        // LongConsumer: long -> void
        LongConsumer printBinary = n -> System.out.println(Long.toBinaryString(n));
        printBinary.accept(7L); // 111

        // DoubleSupplier: () -> double
        DoubleSupplier random = Math::random;
        System.out.println("Random: " + random.getAsDouble());

        // Complete conversion matrix examples
        IntToDoubleFunction intToDouble = i -> i * 1.0;
        DoubleToLongFunction doubleToLong = d -> (long) d;
        LongToDoubleFunction longToDouble = l -> l / 1000.0;

        // Real-world: processing financial data
        double[] prices = {100.50, 101.25, 99.75, 102.00, 100.00};
        double avgPrice = DoubleStream.of(prices)
            .average()
            .orElse(0.0);
        System.out.println("Average price: $" + avgPrice);

        // Processing timestamps (long) without boxing
        long[] timestamps = LongStream.range(1_000_000_000L, 1_000_000_010L)
            .filter(isPrime)
            .toArray();
        System.out.println("Prime timestamps: " + timestamps.length);
    }
}`
        }
      ]
    },
    {
      id: 'method-references',
      name: 'Method References',
      icon: '🔗',
      color: '#3b82f6',
      description: 'Method references are shorthand notation for lambda expressions that just call an existing method. Four types: static, instance (bound), instance (unbound), and constructor.',
      diagram: MethodRefDiagram,
      details: [
        {
          name: 'Static Method References',
          diagram: MethodRefDiagram,
          explanation: 'Static method references use the syntax ClassName::staticMethod. They are equivalent to lambda expressions that call that static method with the same parameters. Common examples include Integer::parseInt, Math::abs, Collections::sort. Use static method references when you need to call a utility method that doesn\'t depend on object state.',
          codeExample: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class StaticMethodReference {
    public static void main(String[] args) {
        // Static method reference
        Function<String, Integer> parse1 = Integer::parseInt;
        // Equivalent lambda:
        Function<String, Integer> parse2 = s -> Integer.parseInt(s);

        System.out.println("Parsed: " + parse1.apply("123")); // 123

        // Common use case: Stream transformations
        List<String> numbers = Arrays.asList("1", "2", "3", "4", "5");
        List<Integer> ints = numbers.stream()
            .map(Integer::parseInt) // Static method reference
            .collect(Collectors.toList());
        System.out.println("Integers: " + ints); // [1, 2, 3, 4, 5]

        // Math utilities
        DoubleUnaryOperator abs = Math::abs;
        DoubleUnaryOperator sqrt = Math::sqrt;
        System.out.println("abs(-5.0) = " + abs.applyAsDouble(-5.0)); // 5.0
        System.out.println("sqrt(16.0) = " + sqrt.applyAsDouble(16.0)); // 4.0

        // Custom static methods
        List<String> words = Arrays.asList("hello", "world", "java");
        words.stream()
            .map(StaticMethodReference::capitalize) // Our static method
            .forEach(System.out::println);
        // Hello
        // World
        // Java

        // Collections utilities
        List<Integer> nums = Arrays.asList(5, 2, 8, 1, 9);
        Collections.sort(nums, Comparator.reverseOrder());
        // Can also use: nums.sort(Comparator.reverseOrder())

        // Static factory methods
        Supplier<StringBuilder> sbSupplier = StringBuilder::new;
        StringBuilder sb = sbSupplier.get();
        System.out.println("Created: " + sb.getClass().getSimpleName());
    }

    public static String capitalize(String s) {
        return s.substring(0, 1).toUpperCase() + s.substring(1);
    }
}`
        },
        {
          name: 'Instance Method References (Bound)',
          explanation: 'Bound instance method references use object::method syntax where object is a specific instance. The reference is "bound" to that particular object. Equivalent to a lambda that calls the method on that captured object. Common example: System.out::println. The object is captured when the reference is created, so changes to the object are reflected in the method reference.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class BoundInstanceMethodRef {
    public static void main(String[] args) {
        // Bound to specific object
        String str = "Hello";
        Supplier<Integer> lengthGetter = str::length;
        // Equivalent: () -> str.length()

        System.out.println("Length: " + lengthGetter.get()); // 5

        // System.out is a specific PrintStream object
        Consumer<String> printer = System.out::println;
        // Equivalent: s -> System.out.println(s)

        List<String> words = Arrays.asList("Java", "Python", "JavaScript");
        words.forEach(System.out::println); // Bound instance method ref
        // Java
        // Python
        // JavaScript

        // Bound to specific string
        String prefix = "Result: ";
        Function<String, String> addPrefix = prefix::concat;
        // Equivalent: s -> prefix.concat(s)
        System.out.println(addPrefix.apply("Success")); // Result: Success

        // Custom object method
        Counter counter = new Counter();
        Runnable incrementer = counter::increment;
        Consumer<Integer> incrementBy = counter::incrementBy;

        incrementer.run();
        incrementer.run();
        incrementBy.accept(5);
        System.out.println("Count: " + counter.getCount()); // 7

        // Bound to specific list
        List<String> names = new ArrayList<>();
        Consumer<String> addName = names::add;
        Supplier<Integer> getSize = names::size;

        addName.accept("Alice");
        addName.accept("Bob");
        System.out.println("Size: " + getSize.get()); // 2

        // Bound to specific comparator
        Comparator<String> caseInsensitive = String::compareToIgnoreCase;
        List<String> items = Arrays.asList("Banana", "apple", "Cherry");
        items.sort(caseInsensitive);
        System.out.println("Sorted: " + items); // [apple, Banana, Cherry]
    }
}

class Counter {
    private int count = 0;

    public void increment() {
        count++;
    }

    public void incrementBy(int n) {
        count += n;
    }

    public int getCount() {
        return count;
    }
}`
        },
        {
          name: 'Instance Method References (Unbound)',
          explanation: 'Unbound instance method references use ClassName::instanceMethod. The first parameter to the lambda becomes the object on which the method is called. Common for mapping operations: String::length means s -> s.length(). This is different from bound references because the object is provided when the functional interface is invoked, not when the reference is created.',
          codeExample: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class UnboundInstanceMethodRef {
    public static void main(String[] args) {
        // Unbound: first parameter becomes the object
        Function<String, Integer> length = String::length;
        // Equivalent: s -> s.length()
        System.out.println("Length of 'Hello': " + length.apply("Hello")); // 5

        // Very common in Stream operations
        List<String> words = Arrays.asList("hi", "hello", "hey", "goodbye");
        List<Integer> lengths = words.stream()
            .map(String::length) // Unbound: each string calls its own length()
            .collect(Collectors.toList());
        System.out.println("Lengths: " + lengths); // [2, 5, 3, 7]

        // String transformations
        List<String> upper = words.stream()
            .map(String::toUpperCase) // s -> s.toUpperCase()
            .collect(Collectors.toList());
        System.out.println("Upper: " + upper); // [HI, HELLO, HEY, GOODBYE]

        // BiFunction: two parameters
        BiFunction<String, String, Boolean> startsWith = String::startsWith;
        // Equivalent: (s, prefix) -> s.startsWith(prefix)
        System.out.println(startsWith.apply("Hello", "He")); // true

        // Predicate with instance method
        Predicate<String> isEmpty = String::isEmpty;
        List<String> nonEmpty = words.stream()
            .filter(isEmpty.negate()) // Negate the predicate
            .collect(Collectors.toList());
        System.out.println("Non-empty: " + nonEmpty);

        // Comparator
        Comparator<String> byLength = Comparator.comparing(String::length);
        words.sort(byLength);
        System.out.println("Sorted by length: " + words);
        // [hi, hey, hello, goodbye]

        // Custom class
        List<Person> people = Arrays.asList(
            new Person("Alice", 30),
            new Person("Bob", 25),
            new Person("Charlie", 35)
        );

        // Extract names
        List<String> names = people.stream()
            .map(Person::getName) // Unbound reference
            .collect(Collectors.toList());
        System.out.println("Names: " + names); // [Alice, Bob, Charlie]

        // Sort by age
        people.sort(Comparator.comparing(Person::getAge));
        System.out.println("Sorted by age: " + people);

        // BiPredicate
        BiPredicate<String, String> equalsIgnoreCase = String::equalsIgnoreCase;
        System.out.println(equalsIgnoreCase.test("HELLO", "hello")); // true
    }
}

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}`
        },
        {
          name: 'Constructor References',
          explanation: 'Constructor references use ClassName::new to create new instances. They are equivalent to lambdas that call new. The number of parameters determines which constructor is called. Commonly used with Supplier (no-arg constructor), Function (one-arg), BiFunction (two-arg), or custom functional interfaces. Also works with array constructors: int[]::new.',
          codeExample: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class ConstructorReference {
    public static void main(String[] args) {
        // No-arg constructor
        Supplier<ArrayList<String>> listSupplier = ArrayList::new;
        // Equivalent: () -> new ArrayList<String>()
        ArrayList<String> list1 = listSupplier.get();
        System.out.println("Created: " + list1.getClass().getSimpleName());

        // One-arg constructor
        Function<Integer, ArrayList<String>> listWithCapacity = ArrayList::new;
        // Equivalent: capacity -> new ArrayList<String>(capacity)
        ArrayList<String> list2 = listWithCapacity.apply(100);
        System.out.println("Capacity list: " + list2.getClass().getSimpleName());

        // Custom class constructor
        Function<String, Person> personCreator = Person::new;
        BiFunction<String, Integer, Person> fullPersonCreator = Person::new;

        Person p1 = personCreator.apply("Alice");
        Person p2 = fullPersonCreator.apply("Bob", 25);
        System.out.println("Created: " + p1 + ", " + p2);

        // Stream with constructor reference
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        List<Person> people = names.stream()
            .map(Person::new) // Create Person from name
            .collect(Collectors.toList());
        System.out.println("People: " + people);

        // Array constructor reference
        IntFunction<int[]> intArrayCreator = int[]::new;
        int[] arr = intArrayCreator.apply(10);
        System.out.println("Array length: " + arr.length); // 10

        // Generic array creator
        IntFunction<String[]> stringArrayCreator = String[]::new;
        String[] words = Stream.of("a", "b", "c")
            .toArray(String[]::new); // Constructor reference for toArray
        System.out.println("Array: " + Arrays.toString(words));

        // Collection factory
        Supplier<Set<String>> setFactory = HashSet::new;
        Set<String> uniqueWords = Stream.of("a", "b", "a", "c", "b")
            .collect(Collectors.toCollection(setFactory));
        System.out.println("Unique: " + uniqueWords); // [a, b, c]

        // Or more directly
        Set<String> uniqueWords2 = Stream.of("a", "b", "a", "c", "b")
            .collect(Collectors.toCollection(HashSet::new));

        // StringBuilder with capacity
        IntFunction<StringBuilder> sbWithCapacity = StringBuilder::new;
        StringBuilder sb = sbWithCapacity.apply(100);

        // Stream generate
        Stream.generate(StringBuilder::new)
            .limit(3)
            .forEach(s -> System.out.println("Created StringBuilder"));

        // Complex example: create map from list
        Map<String, Person> personMap = people.stream()
            .collect(Collectors.toMap(
                Person::getName,
                Function.identity(),
                (p1, p2) -> p1,
                HashMap::new // Constructor reference for map factory
            ));
        System.out.println("Map: " + personMap);
    }
}

class Person {
    private String name;
    private int age;

    public Person(String name) {
        this(name, 0);
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}`
        }
      ]
    },
    {
      id: 'advanced-patterns',
      name: 'Advanced Functional Patterns',
      icon: '🧩',
      color: '#d946ef',
      description: 'Advanced techniques like currying, partial application, memoization, and function composition for building powerful, reusable functional code.',
      diagram: CurryingDiagram,
      details: [
        {
          name: 'Currying',
          diagram: CurryingDiagram,
          explanation: 'Currying transforms a function that takes multiple parameters into a chain of functions that each take a single parameter. Instead of f(a, b, c), you get f(a)(b)(c). This enables partial application - you can call the function with fewer arguments and get back a function that expects the remaining arguments. Currying is fundamental in functional programming for creating reusable, composable function factories.',
          codeExample: `import java.util.function.*;

public class CurryingExample {
    public static void main(String[] args) {
        // Regular function: (a, b, c) -> result
        TriFunction<Integer, Integer, Integer, Integer> add3 =
            (a, b, c) -> a + b + c;

        System.out.println("add3(1, 2, 3) = " + add3.apply(1, 2, 3)); // 6

        // Curried version: a -> (b -> (c -> result))
        Function<Integer, Function<Integer, Function<Integer, Integer>>> curriedAdd =
            a -> b -> c -> a + b + c;

        System.out.println("curriedAdd(1)(2)(3) = " +
            curriedAdd.apply(1).apply(2).apply(3)); // 6

        // Partial application with currying
        Function<Integer, Function<Integer, Integer>> add2 =
            curriedAdd.apply(2); // Fix first argument to 2
        Function<Integer, Integer> add2And3 = add2.apply(3); // Fix second to 3

        System.out.println("add2And3(4) = " + add2And3.apply(4)); // 2+3+4 = 9

        // Real-world: URL builder
        Function<String, Function<String, Function<String, String>>> buildUrl =
            protocol -> host -> path -> protocol + "://" + host + path;

        Function<String, Function<String, String>> https =
            buildUrl.apply("https");
        Function<String, String> httpsGithub = https.apply("github.com");

        System.out.println(httpsGithub.apply("/anthropics")); // https://github.com/anthropics
        System.out.println(httpsGithub.apply("/openai")); // https://github.com/openai

        // String formatter factory
        Function<String, Function<Object, String>> formatFactory =
            template -> value -> String.format(template, value);

        Function<Object, String> currencyFormatter = formatFactory.apply("$%.2f");
        Function<Object, String> percentFormatter = formatFactory.apply("%.1f%%");

        System.out.println(currencyFormatter.apply(123.456)); // $123.46
        System.out.println(percentFormatter.apply(67.89)); // 67.9%

        // Validation builder
        Function<Integer, Function<String, Predicate<String>>> minLength =
            min -> fieldName -> value -> {
                if (value.length() < min) {
                    System.out.println(fieldName + " must be at least " + min + " chars");
                    return false;
                }
                return true;
            };

        Predicate<String> validatePassword = minLength.apply(8).apply("Password");
        Predicate<String> validateUsername = minLength.apply(3).apply("Username");

        validatePassword.test("abc"); // Password must be at least 8 chars
        validateUsername.test("ab"); // Username must be at least 3 chars
    }
}

@FunctionalInterface
interface TriFunction<T, U, V, R> {
    R apply(T t, U u, V v);
}`
        },
        {
          name: 'Partial Application',
          explanation: 'Partial application creates a new function by fixing some arguments of an existing function. Unlike currying (which is automatic transformation), partial application is manual and can fix any subset of parameters. It\'s useful for creating specialized versions of generic functions, configuration management, and building reusable function variations. Common in dependency injection and callback creation.',
          codeExample: `import java.util.function.*;
import java.util.*;

public class PartialApplicationExample {
    public static void main(String[] args) {
        // Generic power function
        BiFunction<Double, Double, Double> power = Math::pow;

        // Partial application: fix the exponent
        Function<Double, Double> square = partial(power, 2.0); // x^2
        Function<Double, Double> cube = partial(power, 3.0); // x^3

        System.out.println("square(5) = " + square.apply(5.0)); // 25.0
        System.out.println("cube(3) = " + cube.apply(3.0)); // 27.0

        // Reverse partial: fix the base
        Function<Double, Double> twoToThe = partialFirst(power, 2.0); // 2^x
        System.out.println("2^10 = " + twoToThe.apply(10.0)); // 1024.0

        // Practical: HTTP request builder
        TriFunction<String, String, Map<String, String>, HttpRequest> buildRequest =
            (method, url, headers) -> new HttpRequest(method, url, headers);

        // Create specialized request builders
        BiFunction<String, Map<String, String>, HttpRequest> get =
            (url, headers) -> buildRequest.apply("GET", url, headers);

        BiFunction<String, Map<String, String>, HttpRequest> post =
            (url, headers) -> buildRequest.apply("POST", url, headers);

        // Further specialize with common headers
        Map<String, String> jsonHeaders = Map.of("Content-Type", "application/json");
        Function<String, HttpRequest> getJson = url -> get.apply(url, jsonHeaders);
        Function<String, HttpRequest> postJson = url -> post.apply(url, jsonHeaders);

        HttpRequest req1 = getJson.apply("/api/users");
        HttpRequest req2 = postJson.apply("/api/users");

        System.out.println(req1); // GET /api/users {Content-Type=application/json}
        System.out.println(req2); // POST /api/users {Content-Type=application/json}

        // Logger factory with partial application
        TriFunction<String, String, String, Void> log =
            (level, module, message) -> {
                System.out.println("[" + level + "] " + module + ": " + message);
                return null;
            };

        BiFunction<String, String, Void> infoLog =
            (module, message) -> log.apply("INFO", module, message);

        Function<String, Void> userServiceInfo =
            message -> infoLog.apply("UserService", message);

        userServiceInfo.apply("User created"); // [INFO] UserService: User created

        // Math utilities
        TriFunction<Integer, Integer, Integer, Integer> clamp =
            (min, max, value) -> Math.max(min, Math.min(max, value));

        Function<Integer, Integer> clamp0to100 = value ->
            clamp.apply(0, 100, value);

        System.out.println("clamp(-10) = " + clamp0to100.apply(-10)); // 0
        System.out.println("clamp(150) = " + clamp0to100.apply(150)); // 100
        System.out.println("clamp(50) = " + clamp0to100.apply(50)); // 50
    }

    // Utility: partial application (fix second parameter)
    static <T, U, R> Function<T, R> partial(BiFunction<T, U, R> f, U u) {
        return t -> f.apply(t, u);
    }

    // Utility: partial application (fix first parameter)
    static <T, U, R> Function<U, R> partialFirst(BiFunction<T, U, R> f, T t) {
        return u -> f.apply(t, u);
    }
}

@FunctionalInterface
interface TriFunction<T, U, V, R> {
    R apply(T t, U u, V v);
}

class HttpRequest {
    String method, url;
    Map<String, String> headers;

    HttpRequest(String method, String url, Map<String, String> headers) {
        this.method = method;
        this.url = url;
        this.headers = headers;
    }

    @Override
    public String toString() {
        return method + " " + url + " " + headers;
    }
}`
        },
        {
          name: 'Memoization',
          diagram: MemoizationDiagram,
          explanation: 'Memoization caches the results of expensive function calls and returns the cached result when the same inputs occur again. It trades memory for speed. Essential for recursive functions (like fibonacci), expensive computations, or functions called repeatedly with the same arguments. Java doesn\'t have built-in memoization, but we can implement it using Map and functional interfaces.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class MemoizationExample {
    public static void main(String[] args) {
        // Without memoization - very slow for fib(40)
        System.out.println("Without memoization:");
        long start1 = System.nanoTime();
        long result1 = fib(40);
        long time1 = (System.nanoTime() - start1) / 1_000_000;
        System.out.println("fib(40) = " + result1 + " in " + time1 + "ms");

        // With memoization - instant
        Function<Integer, Long> memoFib = memoize(MemoizationExample::fibSlow);
        System.out.println("\\nWith memoization:");
        long start2 = System.nanoTime();
        long result2 = memoFib.apply(40);
        long time2 = (System.nanoTime() - start2) / 1_000_000;
        System.out.println("fib(40) = " + result2 + " in " + time2 + "ms");

        // Call again - instant (cached)
        long start3 = System.nanoTime();
        long result3 = memoFib.apply(40);
        long time3 = (System.nanoTime() - start3) / 1_000_000;
        System.out.println("fib(40) again = " + result3 + " in " + time3 + "ms (cached!)");

        // Expensive computation: prime checking
        Function<Long, Boolean> isPrime = memoize(MemoizationExample::isPrimeExpensive);

        long start4 = System.nanoTime();
        boolean prime1 = isPrime.apply(1_000_000_007L);
        long time4 = (System.nanoTime() - start4) / 1_000_000;
        System.out.println("\\n1000000007 is prime: " + prime1 + " in " + time4 + "ms");

        long start5 = System.nanoTime();
        boolean prime2 = isPrime.apply(1_000_000_007L);
        long time5 = (System.nanoTime() - start5) / 1_000_000;
        System.out.println("1000000007 is prime: " + prime2 + " in " + time5 + "ms (cached!)");

        // Real-world: API call memoization
        Function<String, String> fetchUser = memoize(userId -> {
            System.out.println("  [Simulating API call for " + userId + "]");
            try { Thread.sleep(1000); } catch (Exception e) {}
            return "User data for " + userId;
        });

        System.out.println("\\nFetching user data:");
        System.out.println(fetchUser.apply("user123")); // Takes 1 second
        System.out.println(fetchUser.apply("user456")); // Takes 1 second
        System.out.println(fetchUser.apply("user123")); // Instant (cached)

        // BiFunction memoization
        BiFunction<Integer, Integer, Integer> expensiveCalc = memoizeBi((a, b) -> {
            System.out.println("  [Computing " + a + " + " + b + "]");
            return a * a + b * b;
        });

        System.out.println("\\nBiFunction memoization:");
        System.out.println("Result: " + expensiveCalc.apply(3, 4)); // Computes
        System.out.println("Result: " + expensiveCalc.apply(5, 6)); // Computes
        System.out.println("Result: " + expensiveCalc.apply(3, 4)); // Cached!
    }

    // Memoization decorator for Function
    public static <T, R> Function<T, R> memoize(Function<T, R> function) {
        Map<T, R> cache = new HashMap<>();
        return input -> cache.computeIfAbsent(input, function);
    }

    // Memoization decorator for BiFunction
    public static <T, U, R> BiFunction<T, U, R> memoizeBi(BiFunction<T, U, R> function) {
        Map<String, R> cache = new HashMap<>();
        return (t, u) -> {
            String key = t + "_" + u;
            return cache.computeIfAbsent(key, k -> function.apply(t, u));
        };
    }

    // Fast fibonacci with manual memoization
    private static Map<Integer, Long> fibCache = new HashMap<>();
    public static long fib(int n) {
        if (n <= 1) return n;
        return fibCache.computeIfAbsent(n, k -> fib(n - 1) + fib(n - 2));
    }

    // Slow fibonacci (for comparison)
    public static long fibSlow(int n) {
        if (n <= 1) return (long) n;
        return fibSlow(n - 1) + fibSlow(n - 2);
    }

    // Expensive prime check
    public static boolean isPrimeExpensive(long n) {
        if (n < 2) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        for (long i = 3; i * i <= n; i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }
}`
        },
        {
          name: 'Function Composition & Chaining',
          explanation: 'Function composition combines simple functions to build complex ones. compose() applies the other function first, then this one. andThen() applies this function first, then the other. Predicates can be combined with and(), or(), negate(). Consumers can be chained with andThen(). This creates pipelines of transformations and enables clean, declarative code.',
          codeExample: `import java.util.function.*;
import java.util.*;
import java.util.stream.*;

public class FunctionComposition {
    public static void main(String[] args) {
        // Function composition with andThen
        Function<String, String> trim = String::trim;
        Function<String, String> lower = String::toLowerCase;
        Function<String, Integer> length = String::length;

        Function<String, Integer> processString = trim.andThen(lower).andThen(length);
        System.out.println("Process '  HELLO  ': " + processString.apply("  HELLO  ")); // 5

        // Function composition with compose (reverse order)
        Function<Integer, Integer> square = n -> n * n;
        Function<Integer, Integer> addTwo = n -> n + 2;

        Function<Integer, Integer> squareFirst = addTwo.compose(square); // (x^2) + 2
        Function<Integer, Integer> addFirst = square.compose(addTwo); // (x + 2)^2

        System.out.println("squareFirst(3) = " + squareFirst.apply(3)); // 11 = 3^2 + 2
        System.out.println("addFirst(3) = " + addFirst.apply(3)); // 25 = (3+2)^2

        // Predicate composition
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<Integer> greaterThan10 = n -> n > 10;

        // AND composition
        Predicate<Integer> evenAndPositive = isEven.and(isPositive);
        System.out.println("4 is even and positive: " + evenAndPositive.test(4)); // true
        System.out.println("-2 is even and positive: " + evenAndPositive.test(-2)); // false

        // OR composition
        Predicate<Integer> evenOrPositive = isEven.or(isPositive);
        System.out.println("-2 is even or positive: " + evenOrPositive.test(-2)); // true

        // NEGATE
        Predicate<Integer> isOdd = isEven.negate();
        System.out.println("3 is odd: " + isOdd.test(3)); // true

        // Complex predicate chains
        Predicate<Integer> complex = isEven
            .and(isPositive)
            .and(greaterThan10)
            .or(n -> n == 0);

        System.out.println("12 matches complex: " + complex.test(12)); // true
        System.out.println("0 matches complex: " + complex.test(0)); // true
        System.out.println("5 matches complex: " + complex.test(5)); // false

        // Consumer chaining
        Consumer<String> print = System.out::print;
        Consumer<String> newLine = s -> System.out.println();
        Consumer<String> printWithNewLine = print.andThen(newLine);

        printWithNewLine.accept("Hello"); // Hello\\n

        // Multiple consumer chain
        Consumer<List<Integer>> sort = Collections::sort;
        Consumer<List<Integer>> reverse = Collections::reverse;
        Consumer<List<Integer>> display = list -> System.out.println(list);

        Consumer<List<Integer>> processAndDisplay = sort
            .andThen(reverse)
            .andThen(display);

        List<Integer> nums = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
        processAndDisplay.accept(nums); // [9, 8, 5, 2, 1]

        // Real-world: data pipeline
        Function<String, String> removeSpaces = s -> s.replace(" ", "");
        Function<String, String> toLowerCase = String::toLowerCase;
        Function<String, String> reverse = s -> new StringBuilder(s).reverse().toString();

        Function<String, String> pipeline = removeSpaces
            .andThen(toLowerCase)
            .andThen(reverse);

        System.out.println("Pipeline 'Hello World': " + pipeline.apply("Hello World"));
        // dlrowolleh

        // Stream filter with composed predicates
        List<Integer> numbers = IntStream.range(-20, 20).boxed().collect(Collectors.toList());
        List<Integer> filtered = numbers.stream()
            .filter(evenAndPositive.and(greaterThan10.negate()))
            .collect(Collectors.toList());
        System.out.println("Filtered: " + filtered); // [2, 4, 6, 8, 10]

        // Custom function composition
        Function<String, String> pipeline2 = compose(
            String::trim,
            String::toLowerCase,
            s -> s.replace("a", "*")
        );
        System.out.println("Multi-compose: " + pipeline2.apply("  BANANA  "));
        // b*n*n*
    }

    // Utility: compose multiple functions
    @SafeVarargs
    public static <T> Function<T, T> compose(Function<T, T>... functions) {
        return input -> {
            T result = input;
            for (Function<T, T> f : functions) {
                result = f.apply(result);
            }
            return result;
        };
    }
}`
        }
      ]
    },
    {
      id: 'best-practices',
      name: 'Best Practices & Common Pitfalls',
      icon: '⚠️',
      color: '#ef4444',
      description: 'Essential guidelines, performance considerations, and common mistakes to avoid when using functional interfaces in Java.',
      diagram: null,
      details: [
        {
          name: 'When to Use Functional Interfaces',
          explanation: 'Use functional interfaces for callbacks, event handlers, stream operations, and any behavior parameterization. They excel at: single-use code (lambdas), async operations (CompletableFuture), collection processing (streams), and strategy patterns. Don\'t use them for: complex multi-method abstractions (use regular interfaces), stateful operations (use classes), or when method names provide important documentation (SAM hides method names).',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class WhenToUseFunctionalInterfaces {
    public static void main(String[] args) {
        // ✅ GOOD: Stream operations
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");
        List<String> shortNames = names.stream()
            .filter(name -> name.length() <= 4) // Predicate
            .map(String::toUpperCase) // Function
            .collect(Collectors.toList());
        System.out.println("Short names: " + shortNames); // [BOB]

        // ✅ GOOD: Callback patterns
        performAsync("Task 1", result -> System.out.println("Done: " + result));

        // ✅ GOOD: Strategy pattern
        Calculator calc = new Calculator();
        System.out.println("Add: " + calc.calculate(5, 3, (a, b) -> a + b));
        System.out.println("Multiply: " + calc.calculate(5, 3, (a, b) -> a * b));

        // ✅ GOOD: Conditional execution
        executeIf(true, () -> System.out.println("Condition is true"));

        // ✅ GOOD: Resource management with Supplier
        String data = getOrDefault(() -> fetchFromDatabase(), "default");

        // ❌ BAD: Using functional interface for complex behavior
        // Don't do this - use a proper interface instead
        // BiFunction<String, Integer, Result> complexOperation = ...

        // ✅ BETTER: Use a descriptive interface
        interface DataProcessor {
            Result process(String input, int iterations);
        }
        DataProcessor processor = (input, iterations) -> {
            // Complex multi-step processing
            return new Result(input + " processed " + iterations + " times");
        };

        // ❌ BAD: Functional interface hiding important method names
        // Consumer<User> updateUser = user -> { ... }; // What does it do?

        // ✅ BETTER: Named method makes intent clear
        interface UserUpdater {
            void updateEmailAndNotify(User user);
        }

        // ✅ GOOD: One-off comparators
        names.sort((a, b) -> a.length() - b.length());

        // ✅ GOOD: Event handlers
        Button button = new Button();
        button.setOnClick(() -> System.out.println("Button clicked!"));

        System.out.println("Examples completed");
    }

    static void performAsync(String task, Consumer<String> callback) {
        // Simulate async work
        callback.accept(task + " completed");
    }

    static void executeIf(boolean condition, Runnable action) {
        if (condition) {
            action.run();
        }
    }

    static <T> T getOrDefault(Supplier<T> supplier, T defaultValue) {
        try {
            return supplier.get();
        } catch (Exception e) {
            return defaultValue;
        }
    }

    static String fetchFromDatabase() {
        return "DB data";
    }
}

class Calculator {
    public int calculate(int a, int b, BinaryOperator<Integer> operation) {
        return operation.apply(a, b);
    }
}

class Button {
    void setOnClick(Runnable handler) {
        handler.run();
    }
}

class Result {
    String value;
    Result(String value) { this.value = value; }
}

class User {
    String email;
}`
        },
        {
          name: 'Performance Considerations',
          explanation: 'Lambdas are not free - each creates an object (though often cached). Use primitive specializations (IntPredicate) to avoid boxing. Method references are usually more efficient than lambdas. Stateless lambdas can be cached by the JVM. Avoid capturing mutable state - it prevents caching and causes bugs. For hot paths, consider: primitive streams, method references over lambdas, and parallel streams for large datasets only (overhead!).',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class PerformanceConsiderations {
    public static void main(String[] args) {
        int[] largeArray = IntStream.range(0, 10_000_000).toArray();

        // ❌ BAD: Boxing overhead
        long start1 = System.nanoTime();
        int sum1 = Arrays.stream(largeArray)
            .boxed() // Boxes int to Integer
            .filter(n -> n % 2 == 0) // Predicate<Integer> - autoboxing!
            .mapToInt(Integer::intValue) // Unbox back
            .sum();
        long time1 = (System.nanoTime() - start1) / 1_000_000;
        System.out.println("With boxing: " + time1 + "ms");

        // ✅ GOOD: Primitive streams, no boxing
        long start2 = System.nanoTime();
        int sum2 = Arrays.stream(largeArray)
            .filter(n -> n % 2 == 0) // IntPredicate - primitives only!
            .sum();
        long time2 = (System.nanoTime() - start2) / 1_000_000;
        System.out.println("Without boxing: " + time2 + "ms");

        // ✅ GOOD: Method reference (more efficient)
        List<String> words = Arrays.asList("hello", "world", "java");
        words.stream()
            .map(String::toUpperCase) // Method reference
            .forEach(System.out::println);

        // ❌ BAD: Lambda creating new objects
        words.stream()
            .map(s -> s.toUpperCase()) // Equivalent but slightly less efficient
            .forEach(System.out::println);

        // ❌ BAD: Capturing mutable state (prevents lambda caching)
        int[] counter = {0}; // Mutable capture
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        nums.forEach(n -> counter[0] += n); // Each call creates new lambda instance
        System.out.println("Sum: " + counter[0]);

        // ✅ BETTER: Use reduce instead
        int sum = nums.stream().mapToInt(Integer::intValue).sum();
        System.out.println("Sum: " + sum);

        // Parallel stream performance
        List<Integer> bigList = IntStream.range(0, 1_000_000)
            .boxed()
            .collect(Collectors.toList());

        // ✅ GOOD: Parallel for large computations
        long start3 = System.nanoTime();
        double avg1 = bigList.parallelStream()
            .mapToInt(n -> expensiveComputation(n))
            .average()
            .orElse(0);
        long time3 = (System.nanoTime() - start3) / 1_000_000;
        System.out.println("Parallel: " + time3 + "ms");

        // ❌ BAD: Parallel for trivial operations (overhead > benefit)
        long start4 = System.nanoTime();
        long count = bigList.parallelStream()
            .filter(n -> n > 500_000)
            .count();
        long time4 = (System.nanoTime() - start4) / 1_000_000;

        long start5 = System.nanoTime();
        long count2 = bigList.stream()
            .filter(n -> n > 500_000)
            .count();
        long time5 = (System.nanoTime() - start5) / 1_000_000;

        System.out.println("Parallel trivial: " + time4 + "ms");
        System.out.println("Sequential trivial: " + time5 + "ms");

        // ✅ GOOD: Stateless lambda (can be cached)
        Predicate<String> startsWithA = s -> s.startsWith("A");
        // JVM might cache this lambda instance

        // ❌ BAD: Stateful lambda (new instance each time)
        String prefix = "A";
        Predicate<String> startsWithPrefix = s -> s.startsWith(prefix);
        // Captures 'prefix', so less likely to be cached

        // ✅ GOOD: Use primitive specializations
        IntStream.range(0, 1000)
            .filter(n -> n % 2 == 0) // IntPredicate
            .map(n -> n * n) // IntUnaryOperator
            .forEach(System.out::println); // IntConsumer
    }

    static int expensiveComputation(int n) {
        // Simulate CPU-intensive work
        int result = n;
        for (int i = 0; i < 100; i++) {
            result = (result * 31 + i) % 1000;
        }
        return result;
    }
}`
        },
        {
          name: 'Exception Handling in Lambdas',
          explanation: 'Functional interfaces don\'t declare checked exceptions - lambdas can\'t throw them directly. Options: 1) Wrap in unchecked exception, 2) Handle inside lambda with try-catch, 3) Create custom functional interface that throws, 4) Use sneaky throws (not recommended). For streams, consider using Optional or Either pattern. Always document what exceptions your functional code might throw.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.io.*;

public class ExceptionHandlingInLambdas {
    public static void main(String[] args) {
        List<String> numbers = Arrays.asList("1", "2", "invalid", "4");

        // ❌ BAD: Won't compile - parseInt throws checked exception in stream context
        // numbers.stream().map(Integer::parseInt).forEach(System.out::println);

        // ✅ OPTION 1: Wrap in try-catch inside lambda
        numbers.stream()
            .map(s -> {
                try {
                    return Integer.parseInt(s);
                } catch (NumberFormatException e) {
                    return -1; // Default value
                }
            })
            .forEach(System.out::println); // 1, 2, -1, 4

        // ✅ OPTION 2: Use helper method
        numbers.stream()
            .map(ExceptionHandlingInLambdas::parseIntSafe)
            .forEach(System.out::println);

        // ✅ OPTION 3: Filter out invalid values
        numbers.stream()
            .filter(s -> {
                try {
                    Integer.parseInt(s);
                    return true;
                } catch (NumberFormatException e) {
                    return false;
                }
            })
            .map(Integer::parseInt)
            .forEach(System.out::println); // 1, 2, 4

        // ✅ OPTION 4: Use Optional for error handling
        List<Optional<Integer>> results = numbers.stream()
            .map(s -> {
                try {
                    return Optional.of(Integer.parseInt(s));
                } catch (NumberFormatException e) {
                    return Optional.empty();
                }
            })
            .toList();

        results.forEach(opt ->
            opt.ifPresent(n -> System.out.println("Valid: " + n))
        );

        // ✅ OPTION 5: Custom functional interface
        List<String> files = Arrays.asList("file1.txt", "file2.txt");
        files.forEach(unchecked(file -> {
            // Can now use methods that throw checked exceptions
            readFile(file);
        }));

        // ✅ OPTION 6: Wrapping function
        Function<String, Integer> safeParser = wrapping(
            Integer::parseInt,
            e -> -1 // Default on exception
        );

        numbers.stream()
            .map(safeParser)
            .forEach(System.out::println); // 1, 2, -1, 4

        // ❌ BAD: Swallowing exceptions silently
        numbers.forEach(s -> {
            try {
                int n = Integer.parseInt(s);
                System.out.println(n);
            } catch (Exception e) {
                // Silent failure - bad practice!
            }
        });

        // ✅ GOOD: Log or handle exceptions properly
        numbers.forEach(s -> {
            try {
                int n = Integer.parseInt(s);
                System.out.println(n);
            } catch (NumberFormatException e) {
                System.err.println("Invalid number: " + s + " - " + e.getMessage());
            }
        });
    }

    // Helper: safe parse with default
    static int parseIntSafe(String s) {
        try {
            return Integer.parseInt(s);
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    // Helper: unchecked consumer
    static <T> Consumer<T> unchecked(ThrowingConsumer<T> consumer) {
        return t -> {
            try {
                consumer.accept(t);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        };
    }

    // Helper: wrapping function with error handler
    static <T, R> Function<T, R> wrapping(
            ThrowingFunction<T, R> function,
            Function<Exception, R> errorHandler) {
        return t -> {
            try {
                return function.apply(t);
            } catch (Exception e) {
                return errorHandler.apply(e);
            }
        };
    }

    static void readFile(String filename) throws IOException {
        // Simulate file reading
        if (filename.contains("2")) {
            throw new IOException("File not found: " + filename);
        }
        System.out.println("Read: " + filename);
    }
}

@FunctionalInterface
interface ThrowingConsumer<T> {
    void accept(T t) throws Exception;
}

@FunctionalInterface
interface ThrowingFunction<T, R> {
    R apply(T t) throws Exception;
}`
        },
        {
          name: 'Common Mistakes & Anti-Patterns',
          explanation: 'Common pitfalls: 1) Overusing functional style - not everything needs to be a stream. 2) Creating unnecessary objects in loops. 3) Side effects in filter/map (use forEach instead). 4) Parallel streams for small datasets. 5) Long, complex lambda chains (extract to methods). 6) Modifying external state from lambdas (non-thread-safe). 7) Catching generic Exception in lambdas. 8) Not handling null properly.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class CommonMistakes {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // ❌ MISTAKE 1: Side effects in map/filter
        List<String> processed = new ArrayList<>();
        names.stream()
            .map(s -> {
                processed.add(s.toUpperCase()); // Side effect!
                return s.toUpperCase();
            })
            .collect(Collectors.toList());

        // ✅ CORRECT: Use forEach for side effects
        List<String> processed2 = new ArrayList<>();
        names.stream()
            .map(String::toUpperCase)
            .forEach(processed2::add); // Side effect in forEach is OK

        // ❌ MISTAKE 2: Modifying external state (not thread-safe)
        List<String> results = new ArrayList<>();
        names.parallelStream()
            .forEach(s -> results.add(s.toUpperCase())); // RACE CONDITION!

        // ✅ CORRECT: Use collect
        List<String> results2 = names.parallelStream()
            .map(String::toUpperCase)
            .collect(Collectors.toList()); // Thread-safe

        // ❌ MISTAKE 3: Unnecessary object creation
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        for (int i = 0; i < 1000; i++) {
            numbers.stream() // Creates new stream each iteration!
                .filter(n -> n > 2)
                .forEach(System.out::println);
        }

        // ✅ CORRECT: Reuse or avoid streams for simple operations
        List<Integer> filtered = numbers.stream()
            .filter(n -> n > 2)
            .collect(Collectors.toList());
        for (int i = 0; i < 1000; i++) {
            filtered.forEach(System.out::println);
        }

        // ❌ MISTAKE 4: Complex lambda chains (unreadable)
        names.stream()
            .filter(s -> s != null && !s.isEmpty() && s.length() > 3)
            .map(s -> s.trim().toLowerCase().replace("a", "*"))
            .filter(s -> s.startsWith("*") || s.endsWith("*"))
            .map(s -> new StringBuilder(s).reverse().toString())
            .forEach(System.out::println);

        // ✅ CORRECT: Extract to methods
        names.stream()
            .filter(CommonMistakes::isValid)
            .map(CommonMistakes::processName)
            .filter(CommonMistakes::hasAsterisk)
            .map(CommonMistakes::reverse)
            .forEach(System.out::println);

        // ❌ MISTAKE 5: Not handling null
        List<String> withNulls = Arrays.asList("A", null, "B");
        // withNulls.stream().map(String::length).forEach(System.out::println); // NPE!

        // ✅ CORRECT: Filter nulls or use Optional
        withNulls.stream()
            .filter(Objects::nonNull)
            .map(String::length)
            .forEach(System.out::println);

        // ❌ MISTAKE 6: Using streams for everything
        int sum1 = IntStream.range(0, 10).sum(); // Overkill for simple loop

        // ✅ CORRECT: Simple for loop is clearer
        int sum2 = 0;
        for (int i = 0; i < 10; i++) {
            sum2 += i;
        }

        // ❌ MISTAKE 7: Parallel stream for small data
        List<Integer> small = Arrays.asList(1, 2, 3, 4, 5);
        small.parallelStream().forEach(System.out::println); // Overhead > benefit

        // ✅ CORRECT: Sequential for small collections
        small.forEach(System.out::println);

        // ❌ MISTAKE 8: Catching generic Exception
        names.stream()
            .map(s -> {
                try {
                    return Integer.parseInt(s);
                } catch (Exception e) { // Too broad!
                    return 0;
                }
            });

        // ✅ CORRECT: Catch specific exception
        names.stream()
            .map(s -> {
                try {
                    return Integer.parseInt(s);
                } catch (NumberFormatException e) { // Specific
                    return 0;
                }
            });

        // ❌ MISTAKE 9: Creating lambdas in performance-critical loops
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        for (int i = 0; i < 1_000_000; i++) {
            nums.forEach(n -> process(n)); // Creates lambda 1M times!
        }

        // ✅ CORRECT: Extract lambda or use method reference
        Consumer<Integer> processor = CommonMistakes::process;
        for (int i = 0; i < 1_000_000; i++) {
            nums.forEach(processor);
        }

        // Or even better - just use a regular loop
        for (int i = 0; i < 1_000_000; i++) {
            for (int n : nums) {
                process(n);
            }
        }
    }

    static boolean isValid(String s) {
        return s != null && !s.isEmpty() && s.length() > 3;
    }

    static String processName(String s) {
        return s.trim().toLowerCase().replace("a", "*");
    }

    static boolean hasAsterisk(String s) {
        return s.startsWith("*") || s.endsWith("*");
    }

    static String reverse(String s) {
        return new StringBuilder(s).reverse().toString();
    }

    static void process(int n) {
        // Some processing
    }
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
      { name: 'Java', icon: '☕', page: 'Java' },
      { name: 'Functional Interfaces', icon: '🔧', page: 'FunctionalInterfaces' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #4a044e 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #d946ef, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(217, 70, 239, 0.2)',
    border: '1px solid rgba(217, 70, 239, 0.3)',
    borderRadius: '0.5rem',
    color: '#e879f9',
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
        <h1 style={titleStyle}>Functional Interfaces</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(217, 70, 239, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(217, 70, 239, 0.2)'
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
          colors={FUNCTIONAL_COLORS}
        />
      </div>

      {/* Practice Exercises Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(217, 70, 239, 0.3)' }}>
        <h2 style={{ color: '#d946ef', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>📝</span> Practice Exercises</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Click on an exercise to practice. Complete the code challenge and mark as done.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {practiceProblems.map((problem) => {
            const problemId = `FunctionalInterfaces-${problem.id}`
            const isCompleted = isProblemCompleted(problemId)
            return (
              <div
                key={problem.id}
                onClick={() => openProblem(problem)}
                style={{
                  background: isCompleted ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 41, 59, 0.8)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  border: `1px solid ${isCompleted ? '#22c55e' : '#334155'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.borderColor = '#d946ef'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(217, 70, 239, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = isCompleted ? '#22c55e' : '#334155'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem' }}>{problem.title}</h4>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: problem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: problem.difficulty === 'Easy' ? '#22c55e' : '#f59e0b' }}>{problem.difficulty}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0', lineHeight: '1.4' }}>{problem.description}</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.5rem 0', fontStyle: 'italic' }}>{problem.example}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#d946ef', fontSize: '0.8rem', fontWeight: '500' }}>Click to practice →</span>
                  <div onClick={(e) => e.stopPropagation()}><CompletionCheckbox problemId={problemId} compact /></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Practice Problem Modal */}
      {selectedProblem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={closeProblem}
        >
          <div
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '1rem',
              width: '95vw',
              maxWidth: '1400px',
              height: '90vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '2px solid #d946ef'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ color: '#e2e8f0', margin: 0, fontSize: '1.5rem' }}>{selectedProblem.title}</h2>
                <span style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', backgroundColor: selectedProblem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: selectedProblem.difficulty === 'Easy' ? '#22c55e' : '#f59e0b' }}>{selectedProblem.difficulty}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CompletionCheckbox problemId={`FunctionalInterfaces-${selectedProblem.id}`} compact />
                <button
                  onClick={closeProblem}
                  style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', color: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
              {/* Left: Instructions */}
              <div style={{ padding: '1.5rem', borderRight: '1px solid #374151', overflowY: 'auto' }}>
                <h3 style={{ color: '#d946ef', marginTop: 0, marginBottom: '1rem' }}>📋 Instructions</h3>
                <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                  {selectedProblem.instructions.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} style={{ color: '#e2e8f0' }}>{part}</strong> : part
                  )}
                </div>
              </div>

              {/* Right: Code Editor */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedProblem.solution) }}
                    style={{ padding: '0.5rem 1rem', backgroundColor: showSolution ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
                  >
                    {showSolution ? '🔒 Hide Solution' : '💡 Show Solution'}
                  </button>
                  <button
                    onClick={() => { setUserCode(selectedProblem.starterCode); setShowSolution(false) }}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
                  >
                    🔄 Reset Code
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(userCode)}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
                  >
                    📋 Copy Code
                  </button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    style={{
                      flex: 1,
                      width: '100%',
                      padding: '1rem',
                      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                      fontSize: '0.9rem',
                      backgroundColor: '#111827',
                      color: '#e2e8f0',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      resize: 'none',
                      lineHeight: '1.5'
                    }}
                    spellCheck={false}
                  />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.75rem', marginBottom: 0 }}>
                  💡 Copy this code to your IDE to run and test. Mark as complete when you've solved it!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
              colors={FUNCTIONAL_COLORS}
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

export default FunctionalInterfaces

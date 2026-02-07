/**
 * Lambda Expressions - Java Functional Programming
 *
 * Covers lambda syntax, method references, functional interfaces,
 * higher-order functions, and collection operations.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import { isProblemCompleted } from '../../services/progressService'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const LAMBDAS_COLORS = {
  primary: '#a855f7',           // Purple - main accent color
  primaryHover: '#c084fc',      // Hover state
  bg: 'rgba(168, 85, 247, 0.1)', // Background with transparency
  border: 'rgba(168, 85, 247, 0.3)', // Border color
  arrow: '#a855f7',             // Arrow/indicator color
  hoverBg: 'rgba(168, 85, 247, 0.2)', // Hover background
  topicBg: 'rgba(168, 85, 247, 0.2)'  // Topic card background
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },   // purple
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },   // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },     // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },   // amber
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },   // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },     // cyan
]

// =============================================================================
// SVG DIAGRAM COMPONENTS
// =============================================================================

const LambdaSyntaxDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="lambdaArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
      <linearGradient id="lambdaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Lambda Expression Syntax
    </text>

    {/* Parameters Box */}
    <rect x="50" y="60" width="160" height="60" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="130" y="85" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Parameters</text>
    <text x="130" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">(x, y) or x or ()</text>

    {/* Arrow Operator */}
    <rect x="260" y="60" width="80" height="60" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="300" y="85" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">{`-&gt;`}</text>
    <text x="300" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">Arrow</text>

    {/* Body Box */}
    <rect x="390" y="60" width="180" height="60" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="480" y="85" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Body</text>
    <text x="480" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">expression or {'{'}...{'}'}</text>

    {/* Result */}
    <rect x="620" y="60" width="130" height="60" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="685" y="85" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Result</text>
    <text x="685" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">Functional Interface</text>

    {/* Arrows */}
    <line x1="210" y1="90" x2="255" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#lambdaArrow)"/>
    <line x1="340" y1="90" x2="385" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#lambdaArrow)"/>
    <line x1="570" y1="90" x2="615" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#lambdaArrow)"/>

    {/* Examples */}
    <text x="50" y="160" fill="#94a3b8" fontSize="11">Examples:</text>

    <rect x="50" y="175" width="220" height="35" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="60" y="197" fill="#a78bfa" fontSize="11" fontFamily="monospace">{`() -&gt; "Hello"`}</text>
    <text x="180" y="197" fill="#64748b" fontSize="9">no params</text>

    <rect x="290" y="175" width="220" height="35" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="300" y="197" fill="#a78bfa" fontSize="11" fontFamily="monospace">{`x -&gt; x * 2`}</text>
    <text x="420" y="197" fill="#64748b" fontSize="9">one param</text>

    <rect x="530" y="175" width="220" height="35" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="540" y="197" fill="#a78bfa" fontSize="11" fontFamily="monospace">{`(x, y) -&gt; x + y`}</text>
    <text x="690" y="197" fill="#64748b" fontSize="9">multiple</text>

    {/* Block Lambda Example */}
    <rect x="50" y="225" width="700" height="45" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="60" y="252" fill="#a78bfa" fontSize="11" fontFamily="monospace">{`(String s) -&gt; {'{'} String upper = s.toUpperCase(); return upper; {'}'}`}</text>
    <text x="620" y="252" fill="#64748b" fontSize="9">block lambda</text>
  </svg>
)

const FunctionalInterfaceDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="fiArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Core Functional Interfaces (java.util.function)
    </text>

    {/* Function */}
    <rect x="30" y="50" width="170" height="80" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="115" y="75" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">{`Function&lt;T,R&gt;`}</text>
    <text x="115" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">R apply(T t)</text>
    <text x="115" y="115" textAnchor="middle" fill="#64748b" fontSize="9">Transform T to R</text>

    {/* Consumer */}
    <rect x="220" y="50" width="170" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="305" y="75" textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="bold">{`Consumer&lt;T&gt;`}</text>
    <text x="305" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">void accept(T t)</text>
    <text x="305" y="115" textAnchor="middle" fill="#64748b" fontSize="9">Consume, no return</text>

    {/* Supplier */}
    <rect x="410" y="50" width="170" height="80" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="495" y="75" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">{`Supplier&lt;T&gt;`}</text>
    <text x="495" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">T get()</text>
    <text x="495" y="115" textAnchor="middle" fill="#64748b" fontSize="9">Supply value</text>

    {/* Predicate */}
    <rect x="600" y="50" width="170" height="80" rx="8" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="685" y="75" textAnchor="middle" fill="#f472b6" fontSize="13" fontWeight="bold">{`Predicate&lt;T&gt;`}</text>
    <text x="685" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">boolean test(T t)</text>
    <text x="685" y="115" textAnchor="middle" fill="#64748b" fontSize="9">Test condition</text>

    {/* BiFunction */}
    <rect x="30" y="150" width="170" height="80" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="115" y="175" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">{`BiFunction&lt;T,U,R&gt;`}</text>
    <text x="115" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">R apply(T t, U u)</text>
    <text x="115" y="215" textAnchor="middle" fill="#64748b" fontSize="9">Two inputs</text>

    {/* UnaryOperator */}
    <rect x="220" y="150" width="170" height="80" rx="8" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="305" y="175" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="bold">{`UnaryOperator&lt;T&gt;`}</text>
    <text x="305" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">T apply(T t)</text>
    <text x="305" y="215" textAnchor="middle" fill="#64748b" fontSize="9">Same type in/out</text>

    {/* BinaryOperator */}
    <rect x="410" y="150" width="170" height="80" rx="8" fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" strokeWidth="2"/>
    <text x="495" y="175" textAnchor="middle" fill="#fb923c" fontSize="12" fontWeight="bold">{`BinaryOperator&lt;T&gt;`}</text>
    <text x="495" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">T apply(T t1, T t2)</text>
    <text x="495" y="215" textAnchor="middle" fill="#64748b" fontSize="9">Two same type</text>

    {/* Runnable */}
    <rect x="600" y="150" width="170" height="80" rx="8" fill="rgba(148, 163, 184, 0.2)" stroke="#94a3b8" strokeWidth="2"/>
    <text x="685" y="175" textAnchor="middle" fill="#cbd5e1" fontSize="13" fontWeight="bold">Runnable</text>
    <text x="685" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">void run()</text>
    <text x="685" y="215" textAnchor="middle" fill="#64748b" fontSize="9">No input/output</text>

    {/* @FunctionalInterface annotation */}
    <rect x="250" y="255" width="300" height="50" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf640" strokeWidth="1" strokeDasharray="4"/>
    <text x="400" y="278" textAnchor="middle" fill="#a78bfa" fontSize="11">@FunctionalInterface</text>
    <text x="400" y="295" textAnchor="middle" fill="#64748b" fontSize="10">Exactly one abstract method</text>
  </svg>
)

const MethodReferenceDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="mrArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Four Types of Method References
    </text>

    {/* Type 1: Static */}
    <rect x="30" y="50" width="170" height="100" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="115" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Static Method</text>
    <text x="115" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Class::staticMethod</text>
    <rect x="45" y="110" width="140" height="28" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="115" y="128" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">Integer::parseInt</text>

    {/* Type 2: Instance on object */}
    <rect x="220" y="50" width="170" height="100" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="305" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Instance Method</text>
    <text x="305" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">instance::method</text>
    <rect x="235" y="110" width="140" height="28" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="305" y="128" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">System.out::println</text>

    {/* Type 3: Instance on arbitrary */}
    <rect x="410" y="50" width="170" height="100" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="495" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Arbitrary Object</text>
    <text x="495" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Class::instanceMethod</text>
    <rect x="425" y="110" width="140" height="28" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="495" y="128" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">String::toUpperCase</text>

    {/* Type 4: Constructor */}
    <rect x="600" y="50" width="170" height="100" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="685" y="75" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Constructor</text>
    <text x="685" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Class::new</text>
    <rect x="615" y="110" width="140" height="28" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="685" y="128" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">ArrayList::new</text>

    {/* Lambda to Method Reference */}
    <text x="400" y="190" textAnchor="middle" fill="#94a3b8" fontSize="12">Lambda to Method Reference Conversion</text>

    <rect x="80" y="210" width="280" height="35" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="220" y="232" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">{`s -&gt; Integer.parseInt(s)`}</text>

    <line x1="365" y1="227" x2="430" y2="227" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#mrArrow)"/>
    <text x="397" y="220" textAnchor="middle" fill="#8b5cf6" fontSize="10">converts to</text>

    <rect x="440" y="210" width="280" height="35" rx="6" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="580" y="232" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="monospace">Integer::parseInt</text>

    {/* Note */}
    <text x="400" y="275" textAnchor="middle" fill="#64748b" fontSize="10">
      Use method references when lambda just calls a single method with same parameters
    </text>
  </svg>
)

const CollectionOperationsDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="colArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Lambda Collection Operations
    </text>

    {/* forEach */}
    <rect x="30" y="50" width="170" height="90" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="115" y="75" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">forEach</text>
    <text x="115" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Iterate each element</text>
    <rect x="45" y="105" width="140" height="24" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="115" y="121" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">{`list.forEach(x -&gt; print(x))`}</text>

    {/* removeIf */}
    <rect x="220" y="50" width="170" height="90" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="305" y="75" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="bold">removeIf</text>
    <text x="305" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Conditional removal</text>
    <rect x="235" y="105" width="140" height="24" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="305" y="121" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">{`list.removeIf(x -&gt; x &lt; 0)`}</text>

    {/* sort */}
    <rect x="410" y="50" width="170" height="90" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="495" y="75" textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="bold">sort</text>
    <text x="495" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Custom comparator</text>
    <rect x="425" y="105" width="140" height="24" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="495" y="121" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">{`list.sort((a,b) -&gt; a-b)`}</text>

    {/* replaceAll */}
    <rect x="600" y="50" width="170" height="90" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="685" y="75" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">replaceAll</text>
    <text x="685" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Transform in place</text>
    <rect x="615" y="105" width="140" height="24" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="685" y="121" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">{`list.replaceAll(x -&gt; x*2)`}</text>

    {/* Flow diagram */}
    <text x="400" y="175" textAnchor="middle" fill="#94a3b8" fontSize="12">Collection Pipeline Example</text>

    <rect x="50" y="195" width="100" height="40" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="100" y="220" textAnchor="middle" fill="#a78bfa" fontSize="10">[1,2,3,4,5]</text>

    <line x1="150" y1="215" x2="185" y2="215" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#colArrow)"/>

    <rect x="190" y="195" width="120" height="40" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="250" y="220" textAnchor="middle" fill="#f87171" fontSize="9">removeIf(odd)</text>

    <line x1="310" y1="215" x2="345" y2="215" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#colArrow)"/>

    <rect x="350" y="195" width="100" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="220" textAnchor="middle" fill="#fbbf24" fontSize="9">replaceAll(*2)</text>

    <line x1="450" y1="215" x2="485" y2="215" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#colArrow)"/>

    <rect x="490" y="195" width="100" height="40" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="540" y="220" textAnchor="middle" fill="#4ade80" fontSize="9">sort(desc)</text>

    <line x1="590" y1="215" x2="625" y2="215" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#colArrow)"/>

    <rect x="630" y="195" width="120" height="40" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="690" y="220" textAnchor="middle" fill="#a78bfa" fontSize="10">[8,4]</text>

    <text x="400" y="265" textAnchor="middle" fill="#64748b" fontSize="10">In-place operations modify the original collection</text>
  </svg>
)

const HigherOrderFunctionsDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="hofArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Higher-Order Functions
    </text>

    {/* Function that accepts function */}
    <rect x="30" y="50" width="350" height="100" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="205" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Function as Parameter</text>
    <rect x="45" y="90" width="320" height="50" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="205" y="112" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">{`int applyTwice(Function&lt;Integer, Integer&gt; f, int x) {'{'}`}</text>
    <text x="205" y="128" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">    return f.apply(f.apply(x));</text>

    {/* Function that returns function */}
    <rect x="420" y="50" width="350" height="100" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="595" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Function as Return Value (Currying)</text>
    <rect x="435" y="90" width="320" height="50" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="595" y="112" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">{`Function&lt;Integer, Integer&gt; add(int x) {'{'}`}</text>
    <text x="595" y="128" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">{`    return y -&gt; x + y;`}</text>

    {/* Composition */}
    <text x="400" y="180" textAnchor="middle" fill="#94a3b8" fontSize="12">Function Composition</text>

    <rect x="50" y="200" width="140" height="50" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="120" y="225" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">{`f: x -&gt; x + 2`}</text>
    <text x="120" y="240" textAnchor="middle" fill="#64748b" fontSize="9">add 2</text>

    <rect x="230" y="200" width="140" height="50" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="300" y="225" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">{`g: x -&gt; x * 3`}</text>
    <text x="300" y="240" textAnchor="middle" fill="#64748b" fontSize="9">multiply by 3</text>

    {/* compose */}
    <rect x="420" y="195" width="160" height="30" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="500" y="215" textAnchor="middle" fill="#60a5fa" fontSize="9">f.compose(g) = f(g(x))</text>
    <text x="620" y="215" textAnchor="middle" fill="#94a3b8" fontSize="9">(5*3)+2 = 17</text>

    {/* andThen */}
    <rect x="420" y="230" width="160" height="30" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="500" y="250" textAnchor="middle" fill="#4ade80" fontSize="9">f.andThen(g) = g(f(x))</text>
    <text x="620" y="250" textAnchor="middle" fill="#94a3b8" fontSize="9">(5+2)*3 = 21</text>

    <line x1="190" y1="225" x2="225" y2="225" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#hofArrow)"/>
    <line x1="370" y1="225" x2="415" y2="210" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#hofArrow)"/>
    <line x1="370" y1="225" x2="415" y2="245" stroke="#22c55e" strokeWidth="2" markerEnd="url(#hofArrow)"/>

    <text x="400" y="285" textAnchor="middle" fill="#64748b" fontSize="10">Higher-order functions enable functional composition and code reuse</text>
  </svg>
)

const CaptureVariablesDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="capArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Variable Capture in Lambdas
    </text>

    {/* Effectively Final */}
    <rect x="30" y="50" width="350" height="85" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="205" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Effectively Final (Valid)</text>
    <rect x="45" y="90" width="320" height="35" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="205" y="112" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">int x = 10; // never reassigned</text>
    <text x="205" y="125" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">{`Runnable r = () -&gt; print(x); // OK`}</text>

    {/* Not Effectively Final */}
    <rect x="420" y="50" width="350" height="85" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="595" y="75" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Not Effectively Final (Error)</text>
    <rect x="435" y="90" width="320" height="35" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="595" y="112" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="monospace">int x = 10; x = 20; // reassigned</text>
    <text x="595" y="125" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="monospace">{`Runnable r = () -&gt; print(x); // ERROR`}</text>

    {/* Workaround */}
    <rect x="140" y="155" width="520" height="80" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="180" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Workaround: Use Wrapper or Array</text>
    <rect x="155" y="195" width="490" height="30" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="400" y="215" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">{`int[] counter = {'{'}0{'}'}; list.forEach(x -&gt; counter[0]++); // Array ref is final`}</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Lambdas({ onBack, breadcrumb }) {
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

  const openProblem = (problem) => { setSelectedProblem(problem); setUserCode(problem.starterCode); setShowSolution(false) }
  const closeProblem = () => { setSelectedProblem(null); setUserCode(''); setShowSolution(false) }

  const practiceProblems = [
    { id: 1, title: 'Lambda Syntax Basics', difficulty: 'Easy', description: 'Convert an anonymous class to a lambda expression for a Comparator.', example: 'Input: Anonymous Comparator → Output: Lambda (a, b) -> a.compareTo(b)',
      instructions: `Convert anonymous class to lambda expression.

**Requirements:**
1. Replace the anonymous Comparator with a lambda
2. Sort strings by length
3. Test with sample data

**Test Case:**
["apple", "pie", "banana"] → ["pie", "apple", "banana"]`,
      starterCode: `import java.util.*;

public class LambdaSyntax {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "pie", "banana");
        
        // TODO: Replace this anonymous class with a lambda
        Collections.sort(words, new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return Integer.compare(a.length(), b.length());
            }
        });
        
        System.out.println(words);
    }
}`,
      solution: `import java.util.*;

public class LambdaSyntax {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "pie", "banana");
        
        // Lambda expression
        Collections.sort(words, (a, b) -> Integer.compare(a.length(), b.length()));
        
        // Or using Comparator.comparingInt
        // words.sort(Comparator.comparingInt(String::length));
        
        System.out.println(words); // [pie, apple, banana]
    }
}`
    },
    { id: 2, title: 'Method References', difficulty: 'Easy', description: 'Replace lambda expressions with appropriate method references.', example: 'Input: x -> System.out.println(x) → Output: System.out::println',
      instructions: `Replace lambdas with method references.

**Requirements:**
1. Convert each lambda to a method reference
2. Use appropriate reference types (static, instance, constructor)

**Method Reference Types:**
- Static: ClassName::staticMethod
- Instance: object::instanceMethod
- Arbitrary: ClassName::instanceMethod
- Constructor: ClassName::new`,
      starterCode: `import java.util.*;
import java.util.function.*;

public class MethodReferences {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        
        // TODO: Replace with method reference
        names.forEach(x -> System.out.println(x));
        
        // TODO: Replace with method reference
        names.stream()
            .map(s -> s.toUpperCase())
            .forEach(x -> System.out.println(x));
        
        // TODO: Replace with method reference (constructor)
        Supplier<ArrayList<String>> listSupplier = () -> new ArrayList<>();
    }
}`,
      solution: `import java.util.*;
import java.util.function.*;

public class MethodReferences {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        
        // Instance method reference
        names.forEach(System.out::println);
        
        // Arbitrary object method reference
        names.stream()
            .map(String::toUpperCase)
            .forEach(System.out::println);
        
        // Constructor reference
        Supplier<ArrayList<String>> listSupplier = ArrayList::new;
    }
}`
    },
    { id: 3, title: 'Functional Composition', difficulty: 'Medium', description: 'Chain multiple functions using andThen() and compose().', example: 'Input: f(x) = x+1, g(x) = x*2 → Output: f.andThen(g).apply(3) = 8',
      instructions: `Chain functions using andThen() and compose().

**Requirements:**
1. Create two functions: addOne and double
2. Chain them with andThen() - applies first function, then second
3. Chain them with compose() - applies second function, then first

**Expected Results:**
- addOne.andThen(double).apply(3) = 8 (3+1=4, 4*2=8)
- addOne.compose(double).apply(3) = 7 (3*2=6, 6+1=7)`,
      starterCode: `import java.util.function.Function;

public class FunctionComposition {
    public static void main(String[] args) {
        // TODO: Create addOne function
        Function<Integer, Integer> addOne = null;
        
        // TODO: Create double function
        Function<Integer, Integer> doubleIt = null;
        
        // TODO: Chain with andThen (addOne first, then double)
        Function<Integer, Integer> addThenDouble = null;
        
        // TODO: Chain with compose (double first, then addOne)
        Function<Integer, Integer> doubleThenAdd = null;
        
        System.out.println("andThen: " + addThenDouble.apply(3)); // Should be 8
        System.out.println("compose: " + doubleThenAdd.apply(3)); // Should be 7
    }
}`,
      solution: `import java.util.function.Function;

public class FunctionComposition {
    public static void main(String[] args) {
        Function<Integer, Integer> addOne = x -> x + 1;
        Function<Integer, Integer> doubleIt = x -> x * 2;
        
        // andThen: apply addOne first, then doubleIt
        Function<Integer, Integer> addThenDouble = addOne.andThen(doubleIt);
        
        // compose: apply doubleIt first, then addOne
        Function<Integer, Integer> doubleThenAdd = addOne.compose(doubleIt);
        
        System.out.println("andThen: " + addThenDouble.apply(3)); // 8 (3+1=4, 4*2=8)
        System.out.println("compose: " + doubleThenAdd.apply(3)); // 7 (3*2=6, 6+1=7)
    }
}`
    },
    { id: 4, title: 'Custom Functional Interface', difficulty: 'Medium', description: 'Create a custom functional interface and use it with lambdas.', example: 'Input: TriFunction<A,B,C,R> → Output: (a,b,c) -> a+b+c',
      instructions: `Create a custom TriFunction interface.

**Requirements:**
1. Create @FunctionalInterface TriFunction<T, U, V, R>
2. Define single abstract method: R apply(T t, U u, V v)
3. Use it to calculate: (a, b, c) -> a + b + c

**Test Case:**
triSum.apply(1, 2, 3) → 6`,
      starterCode: `// TODO: Create TriFunction interface
// @FunctionalInterface
// interface TriFunction<T, U, V, R> {
//     R apply(T t, U u, V v);
// }

public class CustomFunctionalInterface {
    public static void main(String[] args) {
        // TODO: Create a TriFunction that sums three integers
        // TriFunction<Integer, Integer, Integer, Integer> triSum = ...
        
        // System.out.println(triSum.apply(1, 2, 3)); // Should print 6
    }
}`,
      solution: `@FunctionalInterface
interface TriFunction<T, U, V, R> {
    R apply(T t, U u, V v);
}

public class CustomFunctionalInterface {
    public static void main(String[] args) {
        TriFunction<Integer, Integer, Integer, Integer> triSum = 
            (a, b, c) -> a + b + c;
        
        System.out.println(triSum.apply(1, 2, 3)); // 6
        System.out.println(triSum.apply(10, 20, 30)); // 60
        
        // String concatenation example
        TriFunction<String, String, String, String> concat = 
            (a, b, c) -> a + b + c;
        System.out.println(concat.apply("Hello", " ", "World")); // Hello World
    }
}`
    }
  ]

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'lambda-syntax',
      name: 'Lambda Syntax',
      icon: '\u03BB',
      color: '#8b5cf6',
      description: 'Understand lambda expression syntax variations, type inference, parameter types, and when to use lambdas vs anonymous classes.',
      diagram: LambdaSyntaxDiagram,
      details: [
        {
          name: 'Basic Syntax',
          diagram: LambdaSyntaxDiagram,
          explanation: 'Lambda expressions consist of three parts: parameters, arrow operator (->), and body. The basic form is (parameters) -> expression or (parameters) -> { statements }. For single-expression lambdas, the return is implicit. For block lambdas with multiple statements, you need an explicit return statement.',
          codeExample: `// No parameters
Runnable r = () -> System.out.println("Hello");

// One parameter (parentheses optional)
Consumer<String> c = s -> System.out.println(s);

// Multiple parameters (parentheses required)
BiFunction<Integer, Integer, Integer> add = (x, y) -> x + y;

// With explicit types
BiFunction<Integer, Integer, Integer> add2 = (Integer x, Integer y) -> x + y;

// Block lambda (explicit return required)
Function<String, String> process = s -> {
    String upper = s.toUpperCase();
    String reversed = new StringBuilder(upper).reverse().toString();
    return reversed;
};`
        },
        {
          name: 'Type Inference',
          explanation: 'The Java compiler infers parameter types from the target type (the functional interface). This is called target typing. You can omit parameter types when the compiler can infer them from context. The target type must be a functional interface - an interface with exactly one abstract method.',
          codeExample: `// Compiler infers types from Function<String, Integer>
Function<String, Integer> length = s -> s.length();

// Same lambda, different target types
Predicate<String> isEmpty = s -> s.isEmpty();
Function<String, Boolean> isEmpty2 = s -> s.isEmpty();

// Type inference with generics
List<String> names = Arrays.asList("Alice", "Bob");
names.sort((s1, s2) -> s1.compareToIgnoreCase(s2));

// When inference fails, add explicit types
BiConsumer<String, Integer> printer = (String s, Integer n) -> {
    for (int i = 0; i < n; i++) System.out.println(s);
};`
        },
        {
          name: 'Lambda vs Anonymous Class',
          explanation: 'Lambdas are more concise than anonymous classes but have key differences: lambdas cannot have state (fields), "this" refers to enclosing class (not the lambda), and lambdas can only implement functional interfaces. Use anonymous classes when you need state or to implement interfaces with multiple methods.',
          codeExample: `// Anonymous class - verbose, has its own "this"
Runnable r1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Anonymous class");
    }
};

// Lambda - concise, "this" refers to enclosing class
Runnable r2 = () -> System.out.println("Lambda");

// Anonymous class needed for non-functional interfaces
MouseListener listener = new MouseAdapter() {
    @Override
    public void mouseClicked(MouseEvent e) { }
    @Override
    public void mousePressed(MouseEvent e) { }
};

// "this" difference
class Outer {
    Runnable lambda = () -> System.out.println(this); // Prints Outer
    Runnable anon = new Runnable() {
        public void run() { System.out.println(this); } // Prints anon class
    };
}`
        }
      ]
    },
    {
      id: 'functional-interfaces',
      name: 'Functional Interfaces',
      icon: '@',
      color: '#3b82f6',
      description: 'Master the core functional interfaces in java.util.function: Function, Consumer, Supplier, Predicate, and their variants.',
      diagram: FunctionalInterfaceDiagram,
      details: [
        {
          name: 'Core Interfaces',
          diagram: FunctionalInterfaceDiagram,
          explanation: 'Java provides four core functional interfaces: Function<T,R> transforms T to R with apply(). Consumer<T> accepts T and returns nothing with accept(). Supplier<T> provides T with no input via get(). Predicate<T> tests T and returns boolean via test(). These are the building blocks for functional programming in Java.',
          codeExample: `import java.util.function.*;

// Function<T, R> - transforms input to output
Function<String, Integer> length = s -> s.length();
System.out.println(length.apply("Hello")); // 5

// Consumer<T> - consumes input, no return
Consumer<String> printer = s -> System.out.println(s);
printer.accept("Hello"); // prints "Hello"

// Supplier<T> - supplies value, no input
Supplier<Double> random = () -> Math.random();
System.out.println(random.get()); // random number

// Predicate<T> - tests condition
Predicate<Integer> isPositive = n -> n > 0;
System.out.println(isPositive.test(5)); // true`
        },
        {
          name: 'Bi-Variants',
          explanation: 'For operations with two inputs, Java provides bi-variants: BiFunction<T,U,R> takes two inputs and returns a result. BiConsumer<T,U> accepts two inputs with no return. BiPredicate<T,U> tests two inputs. These are essential for operations like map merging and comparisons.',
          codeExample: `import java.util.function.*;

// BiFunction<T, U, R> - two inputs, one output
BiFunction<String, String, String> concat = (a, b) -> a + b;
System.out.println(concat.apply("Hello", " World")); // "Hello World"

// BiConsumer<T, U> - two inputs, no output
BiConsumer<String, Integer> repeat = (s, n) -> {
    for (int i = 0; i < n; i++) System.out.print(s);
};
repeat.accept("Hi", 3); // "HiHiHi"

// BiPredicate<T, U> - two inputs, boolean output
BiPredicate<String, String> startsWith = (s, prefix) -> s.startsWith(prefix);
System.out.println(startsWith.test("Hello", "He")); // true

// Used in Map operations
Map<String, Integer> scores = new HashMap<>();
scores.merge("Alice", 10, (old, add) -> old + add);`
        },
        {
          name: 'Operators',
          explanation: 'UnaryOperator<T> and BinaryOperator<T> are specialized versions where input and output types are the same. UnaryOperator extends Function<T,T> and BinaryOperator extends BiFunction<T,T,T>. These are commonly used with streams and collection operations.',
          codeExample: `import java.util.function.*;

// UnaryOperator<T> - same type in and out
UnaryOperator<Integer> square = x -> x * x;
System.out.println(square.apply(5)); // 25

// Used with replaceAll
List<String> names = new ArrayList<>(Arrays.asList("alice", "bob"));
names.replaceAll(String::toUpperCase); // ["ALICE", "BOB"]

// BinaryOperator<T> - two same-type inputs, same-type output
BinaryOperator<Integer> max = (a, b) -> a > b ? a : b;
System.out.println(max.apply(5, 3)); // 5

// Used with reduce
List<Integer> numbers = Arrays.asList(1, 2, 3, 4);
int sum = numbers.stream().reduce(0, (a, b) -> a + b);
System.out.println(sum); // 10`
        },
        {
          name: 'Primitive Specializations',
          explanation: 'To avoid boxing overhead, Java provides primitive-specialized interfaces: IntFunction, LongFunction, DoubleFunction for primitives to objects. IntConsumer, IntSupplier, IntPredicate for int operations. ToIntFunction, ToLongFunction, ToDoubleFunction for object to primitive conversion.',
          codeExample: `import java.util.function.*;

// Primitive consumer - avoids boxing
IntConsumer printInt = n -> System.out.println(n);
printInt.accept(42);

// Primitive supplier
IntSupplier randomInt = () -> (int)(Math.random() * 100);
System.out.println(randomInt.getAsInt());

// Primitive predicate
IntPredicate isEven = n -> n % 2 == 0;
System.out.println(isEven.test(4)); // true

// Object to primitive
ToIntFunction<String> stringLength = s -> s.length();
System.out.println(stringLength.applyAsInt("Hello")); // 5

// Primitive to object
IntFunction<String> intToString = n -> "Number: " + n;
System.out.println(intToString.apply(42)); // "Number: 42"`
        }
      ]
    },
    {
      id: 'method-references',
      name: 'Method References',
      icon: '::',
      color: '#22c55e',
      description: 'Master method references as shorthand for lambdas. Learn the four types: static, instance, arbitrary object, and constructor references.',
      diagram: MethodReferenceDiagram,
      details: [
        {
          name: 'Four Types',
          diagram: MethodReferenceDiagram,
          explanation: 'Method references are shorthand for lambdas that just call one method. Four types: 1) Static: Class::staticMethod (e.g., Integer::parseInt), 2) Instance on specific object: instance::method (e.g., System.out::println), 3) Instance on arbitrary object: Class::instanceMethod (e.g., String::toUpperCase), 4) Constructor: Class::new (e.g., ArrayList::new).',
          codeExample: `import java.util.*;
import java.util.function.*;

// Type 1: Static method reference
// Lambda: s -> Integer.parseInt(s)
Function<String, Integer> parse = Integer::parseInt;

// Type 2: Instance method on specific object
// Lambda: s -> System.out.println(s)
Consumer<String> print = System.out::println;

// Type 3: Instance method on arbitrary object
// Lambda: s -> s.toUpperCase()
Function<String, String> upper = String::toUpperCase;

// Type 4: Constructor reference
// Lambda: () -> new ArrayList<>()
Supplier<List<String>> listFactory = ArrayList::new;

// Array constructor reference
// Lambda: n -> new String[n]
IntFunction<String[]> arrayFactory = String[]::new;`
        },
        {
          name: 'With Streams',
          explanation: 'Method references shine with Stream operations. They make code more readable when the lambda simply delegates to an existing method. Common uses include map() for transformations, filter() with method predicates, forEach() for side effects, and collect() with collector factories.',
          codeExample: `import java.util.*;
import java.util.stream.*;

List<String> names = Arrays.asList("alice", "bob", "charlie");

// Static method reference in map
List<Integer> lengths = names.stream()
    .map(String::length)  // s -> s.length()
    .toList();

// Instance method reference in forEach
names.forEach(System.out::println);  // s -> System.out.println(s)

// Arbitrary object method reference
List<String> upperNames = names.stream()
    .map(String::toUpperCase)  // s -> s.toUpperCase()
    .toList();

// Constructor reference in collect
List<String> list = names.stream()
    .collect(Collectors.toCollection(ArrayList::new));

// Array constructor reference
String[] array = names.stream()
    .toArray(String[]::new);`
        },
        {
          name: 'Comparator Methods',
          explanation: 'Comparator has static methods that work beautifully with method references: comparing() extracts a key for comparison, thenComparing() for secondary sorts, reversed() to reverse order. These create readable, chainable sort specifications.',
          codeExample: `import java.util.*;

List<Person> people = Arrays.asList(
    new Person("Alice", 30),
    new Person("Bob", 25),
    new Person("Charlie", 30)
);

// Sort by name using method reference
people.sort(Comparator.comparing(Person::getName));

// Sort by age, then by name
people.sort(Comparator
    .comparing(Person::getAge)
    .thenComparing(Person::getName));

// Sort by age descending
people.sort(Comparator
    .comparing(Person::getAge)
    .reversed());

// Null-safe comparison
people.sort(Comparator
    .comparing(Person::getName, Comparator.nullsLast(String::compareTo)));

// record Person(String name, int age) with getters
class Person {
    String name; int age;
    Person(String n, int a) { name=n; age=a; }
    String getName() { return name; }
    int getAge() { return age; }
}`
        }
      ]
    },
    {
      id: 'collection-operations',
      name: 'Collection Operations',
      icon: '[]',
      color: '#f59e0b',
      description: 'Apply lambdas to common collection operations: forEach, removeIf, sort, replaceAll, and Map methods.',
      diagram: CollectionOperationsDiagram,
      details: [
        {
          name: 'List Operations',
          diagram: CollectionOperationsDiagram,
          explanation: 'Java 8 added default methods to Collection and List for lambda-friendly operations. forEach() iterates elements. removeIf() removes elements matching a predicate. replaceAll() transforms each element in place. sort() accepts a Comparator lambda. These methods modify the collection directly.',
          codeExample: `import java.util.*;

List<String> names = new ArrayList<>(
    Arrays.asList("Alice", "Bob", "Charlie", "David")
);

// forEach - iterate each element
names.forEach(name -> System.out.println("Hello, " + name));

// removeIf - conditional removal (modifies list)
names.removeIf(name -> name.length() > 5);
System.out.println(names); // [Alice, Bob, David]

// replaceAll - transform in place
names.replaceAll(String::toUpperCase);
System.out.println(names); // [ALICE, BOB, DAVID]

// sort - custom comparator
names.sort((a, b) -> a.length() - b.length());
names.sort(Comparator.comparing(String::length));
System.out.println(names); // [BOB, ALICE, DAVID]`
        },
        {
          name: 'Map Operations',
          explanation: 'Map got powerful new methods: forEach() for key-value iteration, compute() for conditional updates, computeIfAbsent() and computeIfPresent() for presence-based computation, merge() for combining values, and replaceAll() for transforming all values. These eliminate the need for manual null checks.',
          codeExample: `import java.util.*;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 90);
scores.put("Bob", 85);

// forEach - iterate key-value pairs
scores.forEach((name, score) ->
    System.out.println(name + ": " + score));

// computeIfAbsent - add if missing
scores.computeIfAbsent("Charlie", k -> 70);
System.out.println(scores.get("Charlie")); // 70

// computeIfPresent - update if present
scores.computeIfPresent("Alice", (k, v) -> v + 5);
System.out.println(scores.get("Alice")); // 95

// merge - combine values
scores.merge("Bob", 10, Integer::sum);
System.out.println(scores.get("Bob")); // 95

// replaceAll - transform all values
scores.replaceAll((name, score) -> score + 5);

// getOrDefault - default for missing
int daveScore = scores.getOrDefault("Dave", 0);`
        },
        {
          name: 'Iterable Default Methods',
          explanation: 'Iterable interface gained forEach() that works on any collection. Collection gained removeIf() and stream(). List gained replaceAll() and sort(). These default methods provide functional operations without breaking backward compatibility with existing implementations.',
          codeExample: `import java.util.*;

// Iterable.forEach works on any Iterable
Set<String> set = new HashSet<>(Arrays.asList("a", "b", "c"));
set.forEach(System.out::println);

// Collection.removeIf on any Collection
Collection<Integer> nums = new LinkedList<>(
    Arrays.asList(1, 2, 3, 4, 5)
);
nums.removeIf(n -> n % 2 == 0); // removes evens
System.out.println(nums); // [1, 3, 5]

// Works with custom collections too
Queue<String> queue = new ArrayDeque<>();
queue.addAll(Arrays.asList("task1", "task2", "task3"));
queue.removeIf(task -> task.contains("2"));

// Deque operations
Deque<Integer> deque = new ArrayDeque<>();
deque.addAll(Arrays.asList(1, 2, 3, 4, 5));
deque.removeIf(n -> n < 3);
System.out.println(deque); // [3, 4, 5]`
        }
      ]
    },
    {
      id: 'higher-order-functions',
      name: 'Higher-Order Functions',
      icon: 'f(g)',
      color: '#ec4899',
      description: 'Build higher-order functions that accept or return functions. Learn function composition, currying, and building reusable utilities.',
      diagram: HigherOrderFunctionsDiagram,
      details: [
        {
          name: 'Functions as Parameters',
          diagram: HigherOrderFunctionsDiagram,
          explanation: 'Higher-order functions accept functions as parameters, enabling powerful abstractions. You can pass different behaviors to the same algorithm. Examples include custom sorting, filtering, transformation, and event handling. This is the foundation of functional programming and the Strategy pattern.',
          codeExample: `import java.util.function.*;

// Function that accepts a function
public static <T> void repeat(Consumer<T> action, T value, int times) {
    for (int i = 0; i < times; i++) {
        action.accept(value);
    }
}

// Apply function twice
public static <T> T applyTwice(Function<T, T> f, T value) {
    return f.apply(f.apply(value));
}

// Usage
repeat(System.out::println, "Hello", 3);

Function<Integer, Integer> addOne = x -> x + 1;
int result = applyTwice(addOne, 5); // 7

// Filter with custom predicate
public static <T> List<T> filter(List<T> list, Predicate<T> pred) {
    return list.stream().filter(pred).toList();
}

List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> evens = filter(nums, n -> n % 2 == 0);`
        },
        {
          name: 'Functions as Return Values',
          explanation: 'Functions can return other functions, enabling currying and factory patterns. Currying transforms a multi-parameter function into a chain of single-parameter functions. This allows partial application - fixing some arguments and getting a new function for the rest.',
          codeExample: `import java.util.function.*;

// Currying: returns a function
public static Function<Integer, Integer> add(int x) {
    return y -> x + y;
}

public static Function<Integer, Integer> multiply(int x) {
    return y -> x * y;
}

// Usage
Function<Integer, Integer> add5 = add(5);
System.out.println(add5.apply(3)); // 8

// Create specialized functions
Function<Integer, Integer> double_ = multiply(2);
Function<Integer, Integer> triple = multiply(3);

// Factory pattern
public static Predicate<String> lengthGreaterThan(int n) {
    return s -> s.length() > n;
}

Predicate<String> longer5 = lengthGreaterThan(5);
System.out.println(longer5.test("Hello")); // false
System.out.println(longer5.test("Hello World")); // true`
        },
        {
          name: 'Function Composition',
          explanation: 'Function composition combines functions: f.compose(g) applies g first then f (f(g(x))), while f.andThen(g) applies f first then g (g(f(x))). Predicates support and(), or(), and negate() for logical composition. This enables building complex operations from simple ones.',
          codeExample: `import java.util.function.*;

Function<Integer, Integer> addTwo = x -> x + 2;
Function<Integer, Integer> multiplyThree = x -> x * 3;

// compose: f.compose(g) = f(g(x))
Function<Integer, Integer> composed = addTwo.compose(multiplyThree);
System.out.println(composed.apply(5)); // (5*3)+2 = 17

// andThen: f.andThen(g) = g(f(x))
Function<Integer, Integer> chained = addTwo.andThen(multiplyThree);
System.out.println(chained.apply(5)); // (5+2)*3 = 21

// Predicate composition
Predicate<Integer> isPositive = x -> x > 0;
Predicate<Integer> isEven = x -> x % 2 == 0;

Predicate<Integer> isPositiveEven = isPositive.and(isEven);
Predicate<Integer> isPositiveOrEven = isPositive.or(isEven);
Predicate<Integer> isNegative = isPositive.negate();

System.out.println(isPositiveEven.test(4)); // true
System.out.println(isPositiveEven.test(-4)); // false`
        }
      ]
    },
    {
      id: 'variable-capture',
      name: 'Variable Capture',
      icon: '{}',
      color: '#06b6d4',
      description: 'Understand how lambdas capture variables from enclosing scope. Learn effectively final requirements and closures.',
      diagram: CaptureVariablesDiagram,
      details: [
        {
          name: 'Effectively Final',
          diagram: CaptureVariablesDiagram,
          explanation: 'Lambdas can capture local variables from the enclosing scope, but only if they are "effectively final" - never reassigned after initialization. This restriction ensures thread safety and prevents confusing behavior. The variable does not need the final keyword, just must not be reassigned.',
          codeExample: `// Valid - variable is effectively final
int multiplier = 10;
Function<Integer, Integer> times = x -> x * multiplier;
System.out.println(times.apply(5)); // 50

// Invalid - variable is reassigned
int counter = 0;
// counter++; // This would make the below lambda invalid
// Runnable r = () -> System.out.println(counter);

// Valid - final variable
final int constant = 100;
Supplier<Integer> getConst = () -> constant;

// Valid - capture method parameter
public static Function<Integer, Integer> createAdder(int base) {
    return x -> x + base; // base is effectively final
}`
        },
        {
          name: 'Workarounds',
          explanation: 'When you need mutable state in lambdas, use wrapper objects or single-element arrays. The reference is effectively final even though the contents can change. AtomicInteger and AtomicReference are thread-safe options. Instance fields can also be used since "this" is effectively final.',
          codeExample: `import java.util.concurrent.atomic.*;

// Workaround 1: Single-element array
int[] counter = {0};
List<Integer> nums = Arrays.asList(1, 2, 3);
nums.forEach(n -> counter[0]++);
System.out.println(counter[0]); // 3

// Workaround 2: AtomicInteger (thread-safe)
AtomicInteger atomicCounter = new AtomicInteger(0);
nums.forEach(n -> atomicCounter.incrementAndGet());
System.out.println(atomicCounter.get()); // 3

// Workaround 3: Instance field
class Counter {
    private int count = 0;
    public void countList(List<?> list) {
        list.forEach(item -> count++); // "this" is effectively final
    }
    public int getCount() { return count; }
}

// Workaround 4: Mutable wrapper
class Holder<T> {
    T value;
    Holder(T v) { value = v; }
}`
        },
        {
          name: 'Closures Explained',
          explanation: 'A closure is a function that captures variables from its enclosing scope. In Java, lambdas create closures that capture the values of effectively final variables. The captured values persist even after the enclosing method returns, because the lambda holds references to them.',
          codeExample: `import java.util.function.*;
import java.util.*;

// Closure captures enclosing variable
public static Supplier<Integer> createCounter(int start) {
    // start is captured by the lambda
    return () -> start;
}

Supplier<Integer> counter1 = createCounter(10);
Supplier<Integer> counter2 = createCounter(20);
System.out.println(counter1.get()); // 10
System.out.println(counter2.get()); // 20

// Each lambda captures its own copy
public static List<Supplier<Integer>> createSuppliers() {
    List<Supplier<Integer>> suppliers = new ArrayList<>();
    for (int i = 0; i < 5; i++) {
        final int captured = i; // Each iteration captures different value
        suppliers.add(() -> captured);
    }
    return suppliers;
}

List<Supplier<Integer>> suppliers = createSuppliers();
suppliers.forEach(s -> System.out.print(s.get() + " ")); // 0 1 2 3 4`
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
      { name: 'Java', icon: '\u2615', page: 'Java' },
      { name: 'Lambda Expressions', icon: '\u03BB', page: 'Lambdas' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #4c1d95 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(139, 92, 246, 0.2)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#a78bfa',
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
        <h1 style={titleStyle}>{'\u03BB'} Lambda Expressions</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {'\u2190'} Back to Java
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={LAMBDAS_COLORS}
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
        primaryColor={LAMBDAS_COLORS.primary}
      />


      {/* Practice Exercises Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
        <h2 style={{ color: '#8b5cf6', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>📝</span> Practice Exercises</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Click on an exercise to practice. Complete the code challenge and mark as done.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {practiceProblems.map((problem) => {
            const problemId = `Lambdas-${problem.id}`
            const isCompleted = isProblemCompleted(problemId)
            return (
              <div key={problem.id} onClick={() => openProblem(problem)} style={{ background: isCompleted ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 41, 59, 0.8)', borderRadius: '0.75rem', padding: '1rem', border: `1px solid ${isCompleted ? '#22c55e' : '#334155'}`, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.2)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isCompleted ? '#22c55e' : '#334155'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem' }}>{problem.title}</h4>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: problem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: problem.difficulty === 'Easy' ? '#22c55e' : '#f59e0b' }}>{problem.difficulty}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0', lineHeight: '1.4' }}>{problem.description}</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.5rem 0', fontStyle: 'italic' }}>{problem.example}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#8b5cf6', fontSize: '0.8rem', fontWeight: '500' }}>Click to practice →</span>
                  <div onClick={(e) => e.stopPropagation()}><CompletionCheckbox problemId={problemId} compact /></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Practice Problem Modal */}
      {selectedProblem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={closeProblem}>
          <div style={{ backgroundColor: '#1f2937', borderRadius: '1rem', width: '95vw', maxWidth: '1400px', height: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid #8b5cf6' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ color: '#e2e8f0', margin: 0, fontSize: '1.5rem' }}>{selectedProblem.title}</h2>
                <span style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', backgroundColor: selectedProblem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: selectedProblem.difficulty === 'Easy' ? '#22c55e' : '#f59e0b' }}>{selectedProblem.difficulty}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CompletionCheckbox problemId={`Lambdas-${selectedProblem.id}`} compact />
                <button onClick={closeProblem} style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', color: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>✕ Close</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderRight: '1px solid #374151', overflowY: 'auto' }}>
                <h3 style={{ color: '#8b5cf6', marginTop: 0, marginBottom: '1rem' }}>📋 Instructions</h3>
                <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{selectedProblem.instructions.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: '#e2e8f0' }}>{part}</strong> : part)}</div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedProblem.solution) }} style={{ padding: '0.5rem 1rem', backgroundColor: showSolution ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>{showSolution ? '🔒 Hide Solution' : '💡 Show Solution'}</button>
                  <button onClick={() => { setUserCode(selectedProblem.starterCode); setShowSolution(false) }} style={{ padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>🔄 Reset Code</button>
                  <button onClick={() => navigator.clipboard.writeText(userCode)} style={{ padding: '0.5rem 1rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>📋 Copy Code</button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '0.9rem', backgroundColor: '#111827', color: '#e2e8f0', border: '1px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.75rem', marginBottom: 0 }}>💡 Copy this code to your IDE to run and test. Mark as complete when you've solved it!</p>
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
              <span style={{ fontSize: '2.5rem', color: concept.color }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics {'\u2022'} Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={LAMBDAS_COLORS}
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
                >{'\u2190'}</button>
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
                >{'\u2192'}</button>
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
                >{'\u2715'}</button>
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

export default Lambdas

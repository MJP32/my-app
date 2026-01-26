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

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Function&lt;T, R&gt; - Transform Input to Output
    </text>

    {/* Input T */}
    <rect x="80" y="70" width="120" height="70" rx="10" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Input T</text>
    <text x="140" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="11">String, Integer...</text>

    {/* Function Box */}
    <rect x="300" y="60" width="200" height="90" rx="12" fill="url(#funcGrad)" stroke="#d946ef" strokeWidth="2"/>
    <text x="400" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Function&lt;T, R&gt;</text>
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
    <text x="400" y="180" textAnchor="middle" fill="#94a3b8" fontSize="11" fontStyle="italic">
      Example: s -&gt; s.length() transforms String to Integer
    </text>
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

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Consumer&lt;T&gt; - Consume Input, No Output
    </text>

    {/* Input T */}
    <rect x="100" y="70" width="140" height="70" rx="10" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="170" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Input T</text>
    <text x="170" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="11">Any type</text>

    {/* Consumer Box */}
    <rect x="320" y="60" width="200" height="90" rx="12" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="420" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Consumer&lt;T&gt;</text>
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

    <text x="400" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
      Example: s -&gt; System.out.println(s)
    </text>
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

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Supplier&lt;T&gt; - No Input, Produce Output
    </text>

    {/* No input */}
    <rect x="100" y="80" width="100" height="50" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="150" y="110" textAnchor="middle" fill="#6b7280" fontSize="12">no input</text>

    {/* Supplier Box */}
    <rect x="280" y="60" width="200" height="90" rx="12" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="380" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Supplier&lt;T&gt;</text>
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

    <text x="300" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
      Example: () -&gt; Math.random()
    </text>
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

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Predicate&lt;T&gt; - Test Input, Return Boolean
    </text>

    {/* Input T */}
    <rect x="80" y="70" width="120" height="70" rx="10" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Input T</text>
    <text x="140" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="11">Value to test</text>

    {/* Predicate Box */}
    <rect x="280" y="55" width="200" height="100" rx="12" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="380" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Predicate&lt;T&gt;</text>
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
    <text x="400" y="190" textAnchor="middle" fill="#94a3b8" fontSize="11" fontStyle="italic">
      Example: n -&gt; n % 2 == 0 tests if number is even
    </text>
    <text x="400" y="210" textAnchor="middle" fill="#64748b" fontSize="10">
      Used in Stream.filter(), Collection.removeIf()
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
    <text x="400" y="255" textAnchor="middle" fill="#94a3b8" fontSize="12">
      Enables: Calculator calc = (a, b) -&gt; a + b;
    </text>

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

    <text x="400" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
      Optional&lt;T&gt; - Functional Operations on Nullable Values
    </text>

    {/* Optional container */}
    <rect x="150" y="50" width="150" height="80" rx="12" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="225" y="80" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="bold">Optional&lt;T&gt;</text>
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

    <text x="400" y="210" textAnchor="middle" fill="#64748b" fontSize="10" fontStyle="italic">
      Query.select("name").from("users").where(age &gt; 18).execute()
    </text>
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
    <text x="150" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">BiFunction&lt;T, U, R&gt;</text>
    <text x="150" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="10">R apply(T t, U u)</text>
    <text x="150" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="9">(T, U) -&gt; R</text>

    {/* BinaryOperator */}
    <rect x="300" y="50" width="200" height="70" rx="10" fill="#d946ef" stroke="#e879f9" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">BinaryOperator&lt;T&gt;</text>
    <text x="400" y="95" textAnchor="middle" fill="#fce7f3" fontSize="10">T apply(T t1, T t2)</text>
    <text x="400" y="110" textAnchor="middle" fill="#f5d0fe" fontSize="9">(T, T) -&gt; T</text>

    {/* BiConsumer */}
    <rect x="550" y="50" width="200" height="70" rx="10" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">BiConsumer&lt;T, U&gt;</text>
    <text x="650" y="95" textAnchor="middle" fill="#fef3c7" fontSize="10">void accept(T t, U u)</text>
    <text x="650" y="110" textAnchor="middle" fill="#fde68a" fontSize="9">(T, U) -&gt; void</text>

    {/* BiPredicate */}
    <rect x="175" y="140" width="200" height="70" rx="10" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="275" y="165" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">BiPredicate&lt;T, U&gt;</text>
    <text x="275" y="185" textAnchor="middle" fill="#cffafe" fontSize="10">boolean test(T t, U u)</text>
    <text x="275" y="200" textAnchor="middle" fill="#a5f3fc" fontSize="9">(T, U) -&gt; boolean</text>

    {/* UnaryOperator */}
    <rect x="425" y="140" width="200" height="70" rx="10" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="525" y="165" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">UnaryOperator&lt;T&gt;</text>
    <text x="525" y="185" textAnchor="middle" fill="#dcfce7" fontSize="10">T apply(T t)</text>
    <text x="525" y="200" textAnchor="middle" fill="#bbf7d0" fontSize="9">T -&gt; T (same type)</text>

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
          colors={FUNCTIONAL_COLORS}
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

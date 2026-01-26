/**
 * Advanced Lambda Expressions - Java
 *
 * Covers advanced functional programming patterns including:
 * - Function composition with andThen/compose
 * - Predicate chaining with and/or/negate
 * - Custom functional interfaces
 * - Method references (all 4 types)
 * - Exception handling in lambdas
 * - Consumer and Supplier patterns
 * - Higher-order functions and BiFunction
 * - Closures and variable capture
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const LAMBDAS_ADV_COLORS = {
  primary: '#7c3aed',
  primaryHover: '#a78bfa',
  bg: 'rgba(124, 58, 237, 0.1)',
  border: 'rgba(124, 58, 237, 0.3)',
  arrow: '#8b5cf6',
  hoverBg: 'rgba(124, 58, 237, 0.2)',
  topicBg: 'rgba(124, 58, 237, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(124, 58, 237, 0.15)', border: 'rgba(124, 58, 237, 0.3)' },
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const FunctionCompositionDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-comp" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
      <linearGradient id="funcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Function Composition Pipeline: f.andThen(g).andThen(h)
    </text>

    <rect x="30" y="70" width="100" height="60" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
    <text x="80" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Input</text>
    <text x="80" y="115" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">"  hello  "</text>

    <line x1="130" y1="100" x2="175" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-comp)"/>

    <rect x="180" y="70" width="120" height="60" rx="8" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2"/>
    <text x="240" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">trim()</text>
    <text x="240" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="10">Function&lt;String, String&gt;</text>

    <line x1="300" y1="100" x2="345" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-comp)"/>

    <rect x="350" y="70" width="120" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="410" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">toUpperCase()</text>
    <text x="410" y="115" textAnchor="middle" fill="#93c5fd" fontSize="10">Function&lt;String, String&gt;</text>

    <line x1="470" y1="100" x2="515" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-comp)"/>

    <rect x="520" y="70" width="120" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="580" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">addPrefix()</text>
    <text x="580" y="115" textAnchor="middle" fill="#86efac" fontSize="10">Function&lt;String, String&gt;</text>

    <line x1="640" y1="100" x2="685" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-comp)"/>

    <rect x="690" y="70" width="100" height="60" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
    <text x="740" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Output</text>
    <text x="740" y="115" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">"PROCESSED: HELLO"</text>

    <text x="400" y="175" textAnchor="middle" fill="#64748b" fontSize="11">
      Each function transforms the result of the previous one
    </text>
  </svg>
)

const PredicateChainDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-pred" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Predicate Chaining: p1.and(p2).and(p3)
    </text>

    <rect x="50" y="60" width="100" height="50" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
    <text x="100" y="90" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">Value: 22</text>

    <line x1="150" y1="85" x2="195" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-pred)"/>

    <rect x="200" y="50" width="130" height="70" rx="8" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2"/>
    <text x="265" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">isPositive</text>
    <text x="265" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="10">n &gt; 0</text>
    <text x="265" y="110" textAnchor="middle" fill="#4ade80" fontSize="10">✓ true</text>

    <line x1="330" y1="85" x2="375" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-pred)"/>
    <text x="352" y="75" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">AND</text>

    <rect x="380" y="50" width="130" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="445" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">isEven</text>
    <text x="445" y="95" textAnchor="middle" fill="#93c5fd" fontSize="10">n % 2 == 0</text>
    <text x="445" y="110" textAnchor="middle" fill="#4ade80" fontSize="10">✓ true</text>

    <line x1="510" y1="85" x2="555" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-pred)"/>
    <text x="532" y="75" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">AND</text>

    <rect x="560" y="50" width="130" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="625" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">greaterThan10</text>
    <text x="625" y="95" textAnchor="middle" fill="#86efac" fontSize="10">n &gt; 10</text>
    <text x="625" y="110" textAnchor="middle" fill="#4ade80" fontSize="10">✓ true</text>

    <line x1="690" y1="85" x2="735" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-pred)"/>

    <rect x="740" y="60" width="50" height="50" rx="8" fill="#4ade80" stroke="#22c55e" strokeWidth="2"/>
    <text x="765" y="90" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">✓</text>

    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="11">
      Short-circuit evaluation: if any predicate returns false, remaining predicates are not evaluated
    </text>

    <rect x="200" y="175" width="400" height="35" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1"/>
    <text x="400" y="197" textAnchor="middle" fill="#f87171" fontSize="10">
      Value 8: isPositive(✓) AND isEven(✓) AND greaterThan10(✗) = false
    </text>
  </svg>
)

const CustomFunctionalInterfaceDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-fi" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Custom Functional Interface: TriFunction&lt;T, U, V, R&gt;
    </text>

    <rect x="50" y="50" width="300" height="150" rx="10" fill="rgba(124, 58, 237, 0.1)" stroke="#7c3aed" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">@FunctionalInterface</text>
    <text x="200" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="11">interface TriFunction&lt;T, U, V, R&gt;</text>

    <rect x="80" y="110" width="240" height="70" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
    <text x="200" y="135" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">R apply(T t, U u, V v)</text>
    <text x="200" y="155" textAnchor="middle" fill="#64748b" fontSize="10">Single Abstract Method (SAM)</text>
    <text x="200" y="170" textAnchor="middle" fill="#64748b" fontSize="9">Enables lambda expression assignment</text>

    <line x1="350" y1="125" x2="415" y2="125" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-fi)"/>
    <text x="382" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">implements</text>

    <rect x="420" y="50" width="330" height="150" rx="10" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="585" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Lambda Implementation</text>

    <rect x="440" y="90" width="290" height="95" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    <text x="585" y="115" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">TriFunction&lt;Double, Double, Double, Double&gt;</text>
    <text x="585" y="135" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="monospace">triangleArea = (a, b, c) -&gt; {"{"}</text>
    <text x="585" y="152" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">double s = (a + b + c) / 2;</text>
    <text x="585" y="169" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">return Math.sqrt(s*(s-a)*(s-b)*(s-c));</text>

    <text x="400" y="230" textAnchor="middle" fill="#64748b" fontSize="11">
      Exactly one abstract method required for lambda compatibility
    </text>
  </svg>
)

const MethodReferencesDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-mr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Four Types of Method References
    </text>

    <rect x="50" y="50" width="170" height="90" rx="8" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2"/>
    <text x="135" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Static Method</text>
    <text x="135" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="10">Class::staticMethod</text>
    <rect x="65" y="105" width="140" height="25" rx="4" fill="#0f172a"/>
    <text x="135" y="122" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">Integer::parseInt</text>

    <rect x="230" y="50" width="170" height="90" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="315" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Instance on Object</text>
    <text x="315" y="95" textAnchor="middle" fill="#93c5fd" fontSize="10">instance::method</text>
    <rect x="245" y="105" width="140" height="25" rx="4" fill="#0f172a"/>
    <text x="315" y="122" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">System.out::println</text>

    <rect x="410" y="50" width="170" height="90" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="495" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Instance on Type</text>
    <text x="495" y="95" textAnchor="middle" fill="#86efac" fontSize="10">Class::instanceMethod</text>
    <rect x="425" y="105" width="140" height="25" rx="4" fill="#0f172a"/>
    <text x="495" y="122" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">String::toLowerCase</text>

    <rect x="590" y="50" width="170" height="90" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="675" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Constructor</text>
    <text x="675" y="95" textAnchor="middle" fill="#fde68a" fontSize="10">Class::new</text>
    <rect x="605" y="105" width="140" height="25" rx="4" fill="#0f172a"/>
    <text x="675" y="122" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">ArrayList::new</text>

    <rect x="100" y="170" width="600" height="80" rx="8" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="1"/>
    <text x="400" y="195" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">When to Use Method References</text>
    <text x="400" y="215" textAnchor="middle" fill="#94a3b8" fontSize="10">Use when lambda only calls a single method with the same parameters</text>
    <text x="400" y="235" textAnchor="middle" fill="#64748b" fontSize="10">x -&gt; x.toLowerCase()  ==&gt;  String::toLowerCase</text>
  </svg>
)

const ExceptionHandlingDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-ex" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Handling Checked Exceptions in Lambdas
    </text>

    <rect x="50" y="50" width="200" height="80" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Problem</text>
    <text x="150" y="95" textAnchor="middle" fill="#fca5a5" fontSize="10">Function&lt;T,R&gt; cannot</text>
    <text x="150" y="110" textAnchor="middle" fill="#fca5a5" fontSize="10">throw checked exceptions</text>

    <line x1="250" y1="90" x2="295" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-ex)"/>

    <rect x="300" y="45" width="230" height="90" rx="8" fill="rgba(124, 58, 237, 0.2)" stroke="#7c3aed" strokeWidth="2"/>
    <text x="415" y="70" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">ThrowingFunction&lt;T,R&gt;</text>
    <text x="415" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="10">@FunctionalInterface</text>
    <text x="415" y="108" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="monospace">R apply(T t) throws Exception</text>

    <line x1="530" y1="90" x2="575" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-ex)"/>

    <rect x="580" y="50" width="170" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="665" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Solution</text>
    <text x="665" y="95" textAnchor="middle" fill="#86efac" fontSize="10">Wrap in try-catch</text>
    <text x="665" y="110" textAnchor="middle" fill="#86efac" fontSize="10">Return Optional&lt;R&gt;</text>

    <rect x="100" y="155" width="600" height="85" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    <text x="400" y="180" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">
      static &lt;T, R&gt; Function&lt;T, Optional&lt;R&gt;&gt; wrap(ThrowingFunction&lt;T, R&gt; f) {"{"}
    </text>
    <text x="400" y="200" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">
      return t -&gt; {"{"} try {"{"} return Optional.of(f.apply(t)); {"}"}
    </text>
    <text x="400" y="218" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">
      catch (Exception e) {"{"} return Optional.empty(); {"}"} {"}"};
    </text>
  </svg>
)

const ConsumerSupplierDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-cs" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Consumer vs Supplier Patterns
    </text>

    <rect x="50" y="50" width="320" height="160" rx="10" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="210" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Consumer&lt;T&gt;</text>
    <text x="210" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Accepts input, returns void (side effects)</text>

    <rect x="70" y="105" width="100" height="40" rx="6" fill="#1e293b" stroke="#334155"/>
    <text x="120" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="10">Input T</text>

    <line x1="170" y1="125" x2="215" y2="125" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-cs)"/>

    <rect x="220" y="105" width="130" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa"/>
    <text x="285" y="130" textAnchor="middle" fill="white" fontSize="10">void accept(T)</text>

    <text x="210" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">Chain with: c1.andThen(c2)</text>
    <text x="210" y="195" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">Consumer&lt;String&gt; log = System.out::println</text>

    <rect x="430" y="50" width="320" height="160" rx="10" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Supplier&lt;T&gt;</text>
    <text x="590" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">No input, returns value (lazy initialization)</text>

    <rect x="460" y="105" width="130" height="40" rx="6" fill="#22c55e" stroke="#4ade80"/>
    <text x="525" y="130" textAnchor="middle" fill="white" fontSize="10">T get()</text>

    <line x1="590" y1="125" x2="635" y2="125" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-cs)"/>

    <rect x="640" y="105" width="100" height="40" rx="6" fill="#1e293b" stroke="#334155"/>
    <text x="690" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="10">Output T</text>

    <text x="590" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">Computed only when get() is called</text>
    <text x="590" y="195" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">Supplier&lt;List&gt; lazy = ArrayList::new</text>
  </svg>
)

const HigherOrderFunctionsDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-hof" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Higher-Order Functions: Function Factory Pattern
    </text>

    <rect x="50" y="55" width="180" height="80" rx="8" fill="rgba(124, 58, 237, 0.2)" stroke="#7c3aed" strokeWidth="2"/>
    <text x="140" y="80" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">makeOperator(String op)</text>
    <text x="140" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="10">Function Factory</text>
    <text x="140" y="118" textAnchor="middle" fill="#64748b" fontSize="9">Returns Function&lt;Integer, Integer&gt;</text>

    <line x1="230" y1="75" x2="290" y2="55" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-hof)"/>
    <line x1="230" y1="95" x2="290" y2="95" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-hof)"/>
    <line x1="230" y1="115" x2="290" y2="135" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-hof)"/>

    <rect x="295" y="40" width="150" height="35" rx="6" fill="#7c3aed" stroke="#a78bfa"/>
    <text x="370" y="63" textAnchor="middle" fill="white" fontSize="10">"double" -&gt; x * 2</text>

    <rect x="295" y="80" width="150" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa"/>
    <text x="370" y="103" textAnchor="middle" fill="white" fontSize="10">"square" -&gt; x * x</text>

    <rect x="295" y="120" width="150" height="35" rx="6" fill="#22c55e" stroke="#4ade80"/>
    <text x="370" y="143" textAnchor="middle" fill="white" fontSize="10">"negate" -&gt; -x</text>

    <rect x="500" y="50" width="250" height="100" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="625" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">BiFunction&lt;T, U, R&gt;</text>
    <text x="625" y="95" textAnchor="middle" fill="#fde68a" fontSize="10">R apply(T t, U u)</text>
    <text x="625" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Takes 2 parameters, returns 1 result</text>
    <text x="625" y="135" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">(a, b) -&gt; a*a + b*b</text>

    <rect x="150" y="175" width="500" height="55" rx="8" fill="#0f172a" stroke="#334155"/>
    <text x="400" y="195" textAnchor="middle" fill="#e2e8f0" fontSize="10">Higher-order functions accept or return other functions</text>
    <text x="400" y="215" textAnchor="middle" fill="#64748b" fontSize="10">Useful for creating configurable operations, strategies, and factory patterns</text>
  </svg>
)

const ClosuresDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-cl" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Closures: Variable Capture and State
    </text>

    <rect x="50" y="50" width="220" height="120" rx="8" fill="rgba(124, 58, 237, 0.1)" stroke="#7c3aed" strokeWidth="2"/>
    <text x="160" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">createCounter(0, 1)</text>

    <rect x="70" y="90" width="180" height="65" rx="6" fill="#1e293b" stroke="#334155"/>
    <text x="160" y="110" textAnchor="middle" fill="#f59e0b" fontSize="10">Captured State</text>
    <text x="160" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">int[] count = {"{0}"}</text>
    <text x="160" y="145" textAnchor="middle" fill="#64748b" fontSize="9">(uses array for mutability)</text>

    <line x1="270" y1="110" x2="315" y2="110" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-cl)"/>

    <rect x="320" y="50" width="180" height="120" rx="8" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2"/>
    <text x="410" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Supplier&lt;Integer&gt;</text>
    <text x="410" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="9">() -&gt; {"{"}</text>
    <text x="410" y="118" textAnchor="middle" fill="#c4b5fd" fontSize="9">int current = count[0];</text>
    <text x="410" y="136" textAnchor="middle" fill="#c4b5fd" fontSize="9">count[0] += step;</text>
    <text x="410" y="154" textAnchor="middle" fill="#c4b5fd" fontSize="9">return current;</text>

    <rect x="550" y="50" width="200" height="120" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Each Call</text>

    <rect x="565" y="90" width="80" height="30" rx="4" fill="#1e293b" stroke="#334155"/>
    <text x="605" y="110" textAnchor="middle" fill="#e2e8f0" fontSize="10">get() -&gt; 0</text>

    <rect x="655" y="90" width="80" height="30" rx="4" fill="#1e293b" stroke="#334155"/>
    <text x="695" y="110" textAnchor="middle" fill="#e2e8f0" fontSize="10">get() -&gt; 1</text>

    <rect x="565" y="125" width="80" height="30" rx="4" fill="#1e293b" stroke="#334155"/>
    <text x="605" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="10">get() -&gt; 2</text>

    <rect x="655" y="125" width="80" height="30" rx="4" fill="#1e293b" stroke="#334155"/>
    <text x="695" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="10">...</text>

    <rect x="100" y="195" width="600" height="65" rx="8" fill="#0f172a" stroke="#ef4444" strokeDasharray="4"/>
    <text x="400" y="215" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Effectively Final Requirement</text>
    <text x="400" y="235" textAnchor="middle" fill="#94a3b8" fontSize="10">Variables captured by lambdas must be effectively final (not reassigned)</text>
    <text x="400" y="250" textAnchor="middle" fill="#64748b" fontSize="10">Use array/object wrapper to modify captured state</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function LambdasAdvanced({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'function-composition',
      name: 'Function Composition',
      icon: '🔗',
      color: '#7c3aed',
      description: 'Chain multiple functions together using andThen() and compose() to create transformation pipelines.',
      diagram: FunctionCompositionDiagram,
      details: [
        {
          name: 'andThen() Method',
          diagram: FunctionCompositionDiagram,
          explanation: 'Function.andThen() chains operations in sequence. f.andThen(g) applies f first, then applies g to the result. This creates a pipeline where data flows through each transformation step. The composed function can be reused and applied to any input of the expected type.',
          codeExample: `import java.util.function.*;

public class FunctionComposition {
    public static void main(String[] args) {
        // Define individual functions
        Function<String, String> trim = String::trim;
        Function<String, String> uppercase = String::toUpperCase;
        Function<String, String> addPrefix = s -> "PROCESSED: " + s;

        // Compose using andThen(): trim -> uppercase -> addPrefix
        Function<String, String> pipeline = trim
            .andThen(uppercase)
            .andThen(addPrefix);

        // Apply the composed function
        String result = pipeline.apply("  hello world  ");
        System.out.println(result);
        // Output: PROCESSED: HELLO WORLD
    }
}`
        },
        {
          name: 'compose() Method',
          explanation: 'Function.compose() works in reverse order compared to andThen(). f.compose(g) applies g first, then f. This is useful when you want to read the composition in mathematical order (f o g means apply g then f). Both methods create the same result but read differently in code.',
          codeExample: `import java.util.function.*;

public class ComposeExample {
    public static void main(String[] args) {
        Function<Integer, Integer> multiplyBy2 = x -> x * 2;
        Function<Integer, Integer> add10 = x -> x + 10;

        // compose: add10 is applied first, then multiplyBy2
        // f.compose(g) = f(g(x))
        Function<Integer, Integer> composed = multiplyBy2.compose(add10);
        System.out.println(composed.apply(5));  // (5 + 10) * 2 = 30

        // andThen: multiplyBy2 is applied first, then add10
        // f.andThen(g) = g(f(x))
        Function<Integer, Integer> chained = multiplyBy2.andThen(add10);
        System.out.println(chained.apply(5));   // (5 * 2) + 10 = 20
    }
}`
        },
        {
          name: 'Complex Pipelines',
          explanation: 'Function composition enables building complex data processing pipelines. Each step is independently testable and reusable. You can store partially composed functions and extend them later. This pattern is the foundation of stream processing and reactive programming.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class DataPipeline {
    public static void main(String[] args) {
        // Build a validation and transformation pipeline
        Function<String, String> sanitize = s -> s.replaceAll("[^a-zA-Z0-9 ]", "");
        Function<String, String> normalize = s -> s.toLowerCase().trim();
        Function<String, String[]> tokenize = s -> s.split("\\\\s+");
        Function<String[], List<String>> filterShort =
            arr -> Arrays.stream(arr)
                         .filter(word -> word.length() > 2)
                         .collect(Collectors.toList());

        // Compose the full pipeline
        Function<String, List<String>> processText = sanitize
            .andThen(normalize)
            .andThen(tokenize)
            .andThen(filterShort);

        List<String> words = processText.apply("Hello, World! This is a TEST.");
        System.out.println(words);  // [hello, world, this, test]
    }
}`
        }
      ]
    },
    {
      id: 'predicate-chaining',
      name: 'Predicate Chaining',
      icon: '🔍',
      color: '#3b82f6',
      description: 'Combine boolean conditions using and(), or(), and negate() for complex filtering logic.',
      diagram: PredicateChainDiagram,
      details: [
        {
          name: 'and() Operator',
          diagram: PredicateChainDiagram,
          explanation: 'Predicate.and() combines two predicates with logical AND. Both conditions must be true for the combined predicate to return true. The evaluation short-circuits: if the first predicate returns false, the second is not evaluated. This is efficient for expensive predicates.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class PredicateAnd {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(-5, 8, 15, 22, -10, 4, 18, 30, 7, 12);

        // Define individual predicates
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> greaterThan10 = n -> n > 10;

        // Chain with and(): all conditions must be true
        Predicate<Integer> combined = isPositive
            .and(isEven)
            .and(greaterThan10);

        List<Integer> filtered = numbers.stream()
            .filter(combined)
            .collect(Collectors.toList());

        System.out.println(filtered);  // [22, 18, 30, 12]
    }
}`
        },
        {
          name: 'or() and negate()',
          explanation: 'Predicate.or() combines with logical OR - returns true if either condition is true. Predicate.negate() inverts the result. These can be combined to build complex boolean expressions. The static methods Predicate.not() (Java 11+) and Predicate.isEqual() provide additional utilities.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class PredicateOrNegate {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("hello", "", "world", "java", "", "lambda");

        // negate(): inverts the predicate
        Predicate<String> isEmpty = String::isEmpty;
        Predicate<String> isNotEmpty = isEmpty.negate();
        // Or use: Predicate.not(String::isEmpty) in Java 11+

        List<String> nonEmpty = words.stream()
            .filter(isNotEmpty)
            .collect(Collectors.toList());
        System.out.println(nonEmpty);  // [hello, world, java, lambda]

        // or(): either condition can be true
        Predicate<Integer> lessThan5 = n -> n < 5;
        Predicate<Integer> greaterThan95 = n -> n > 95;
        Predicate<Integer> extreme = lessThan5.or(greaterThan95);

        List<Integer> nums = Arrays.asList(1, 50, 99, 3, 75, 100);
        List<Integer> extremes = nums.stream()
            .filter(extreme)
            .collect(Collectors.toList());
        System.out.println(extremes);  // [1, 99, 3, 100]
    }
}`
        },
        {
          name: 'Complex Boolean Logic',
          explanation: 'Predicates can be combined to express complex business rules in a readable way. Store predicates as variables to give them meaningful names. This makes the filtering logic self-documenting and easier to maintain. You can also create predicate factories for reusable conditions.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class ComplexPredicates {
    record Person(String name, int age, String department, double salary) {}

    public static void main(String[] args) {
        List<Person> employees = Arrays.asList(
            new Person("Alice", 30, "Engineering", 85000),
            new Person("Bob", 45, "Sales", 72000),
            new Person("Charlie", 28, "Engineering", 90000),
            new Person("Diana", 52, "HR", 65000)
        );

        // Define meaningful predicates
        Predicate<Person> isEngineer = p -> p.department().equals("Engineering");
        Predicate<Person> isHighEarner = p -> p.salary() > 80000;
        Predicate<Person> isUnder35 = p -> p.age() < 35;

        // Complex rule: Engineering OR (high earner AND under 35)
        Predicate<Person> eligibleForBonus = isEngineer
            .or(isHighEarner.and(isUnder35));

        employees.stream()
            .filter(eligibleForBonus)
            .map(Person::name)
            .forEach(System.out::println);
        // Output: Alice, Charlie
    }
}`
        }
      ]
    },
    {
      id: 'custom-functional-interfaces',
      name: 'Custom Functional Interfaces',
      icon: '🛠️',
      color: '#22c55e',
      description: 'Create your own functional interfaces for specialized lambda expressions beyond built-in types.',
      diagram: CustomFunctionalInterfaceDiagram,
      details: [
        {
          name: '@FunctionalInterface',
          diagram: CustomFunctionalInterfaceDiagram,
          explanation: 'The @FunctionalInterface annotation marks an interface as suitable for lambda expressions. It must have exactly one abstract method (SAM - Single Abstract Method). The annotation provides compile-time validation - the compiler will error if you add a second abstract method. Default and static methods are allowed.',
          codeExample: `import java.util.function.*;

// Custom functional interface for 3 parameters
@FunctionalInterface
interface TriFunction<T, U, V, R> {
    R apply(T t, U u, V v);

    // Default methods are allowed
    default <W> TriFunction<T, U, V, W> andThen(Function<R, W> after) {
        return (t, u, v) -> after.apply(apply(t, u, v));
    }
}

public class CustomInterface {
    public static void main(String[] args) {
        // Use with lambda - calculates triangle area using Heron's formula
        TriFunction<Double, Double, Double, Double> triangleArea =
            (a, b, c) -> {
                double s = (a + b + c) / 2.0;
                return Math.sqrt(s * (s - a) * (s - b) * (s - c));
            };

        double area = triangleArea.apply(3.0, 4.0, 5.0);
        System.out.printf("Area: %.2f%n", area);  // Area: 6.00
    }
}`
        },
        {
          name: 'Specialized Interfaces',
          explanation: 'Create specialized interfaces for domain-specific operations. These can include throwing checked exceptions, handling multiple return values, or providing context-specific behavior. Name them clearly to express their purpose. Consider extending built-in interfaces when appropriate.',
          codeExample: `import java.util.*;

// Interface that can throw checked exceptions
@FunctionalInterface
interface ThrowingFunction<T, R, E extends Exception> {
    R apply(T t) throws E;
}

// Interface for validation with error message
@FunctionalInterface
interface Validator<T> {
    ValidationResult validate(T value);

    record ValidationResult(boolean valid, String message) {
        static ValidationResult ok() { return new ValidationResult(true, ""); }
        static ValidationResult error(String msg) { return new ValidationResult(false, msg); }
    }
}

public class SpecializedInterfaces {
    public static void main(String[] args) {
        // ThrowingFunction usage
        ThrowingFunction<String, Integer, NumberFormatException> parser =
            Integer::parseInt;

        try {
            int num = parser.apply("42");
            System.out.println("Parsed: " + num);
        } catch (NumberFormatException e) {
            System.out.println("Parse error");
        }

        // Validator usage
        Validator<String> emailValidator = email -> {
            if (email == null || !email.contains("@")) {
                return Validator.ValidationResult.error("Invalid email format");
            }
            return Validator.ValidationResult.ok();
        };

        var result = emailValidator.validate("test@example.com");
        System.out.println("Valid: " + result.valid());  // Valid: true
    }
}`
        },
        {
          name: 'Generic Constraints',
          explanation: 'Functional interfaces can use bounded type parameters to constrain the types they work with. This enables type-safe operations on specific type hierarchies. Combined with default methods, you can create powerful, reusable functional abstractions.',
          codeExample: `import java.util.*;
import java.util.function.*;

// Functional interface with bounded type parameter
@FunctionalInterface
interface NumberOperation<T extends Number> {
    T operate(T a, T b);

    // Default method to apply to a list
    default List<T> applyToList(List<T> list) {
        if (list.size() < 2) return list;
        List<T> result = new ArrayList<>();
        for (int i = 0; i < list.size() - 1; i++) {
            result.add(operate(list.get(i), list.get(i + 1)));
        }
        return result;
    }
}

// Composable predicate with description
@FunctionalInterface
interface DescribedPredicate<T> extends Predicate<T> {
    String description();

    default DescribedPredicate<T> and(DescribedPredicate<T> other) {
        return new DescribedPredicate<>() {
            public boolean test(T t) {
                return DescribedPredicate.this.test(t) && other.test(t);
            }
            public String description() {
                return "(" + DescribedPredicate.this.description() + " AND " + other.description() + ")";
            }
        };
    }
}

public class GenericConstraints {
    public static void main(String[] args) {
        NumberOperation<Integer> add = (a, b) -> a + b;
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println(add.applyToList(nums));  // [3, 5, 7, 9]
    }
}`
        }
      ]
    },
    {
      id: 'method-references',
      name: 'Method References',
      icon: '📌',
      color: '#f59e0b',
      description: 'Shorthand syntax for lambdas that simply call an existing method. Four types cover all use cases.',
      diagram: MethodReferencesDiagram,
      details: [
        {
          name: 'Static Method Reference',
          diagram: MethodReferencesDiagram,
          explanation: 'Class::staticMethod references a static method. The lambda parameters are passed as arguments to the static method. Use when the lambda only calls a static method with the same parameters. Examples: Integer::parseInt, Math::abs, Collections::sort.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class StaticMethodRef {
    // Custom static method
    static int doubleValue(int n) {
        return n * 2;
    }

    public static void main(String[] args) {
        List<String> numbers = Arrays.asList("1", "2", "3", "4", "5");

        // Static method reference: Integer::parseInt
        // Equivalent to: s -> Integer.parseInt(s)
        List<Integer> parsed = numbers.stream()
            .map(Integer::parseInt)
            .collect(Collectors.toList());
        System.out.println(parsed);  // [1, 2, 3, 4, 5]

        // Using custom static method
        List<Integer> doubled = parsed.stream()
            .map(StaticMethodRef::doubleValue)
            .collect(Collectors.toList());
        System.out.println(doubled);  // [2, 4, 6, 8, 10]

        // Math::abs as static reference
        List<Integer> negatives = Arrays.asList(-1, 2, -3, 4, -5);
        List<Integer> absolutes = negatives.stream()
            .map(Math::abs)
            .collect(Collectors.toList());
        System.out.println(absolutes);  // [1, 2, 3, 4, 5]
    }
}`
        },
        {
          name: 'Instance Method References',
          explanation: 'There are two types: (1) instance::method - calls method on a specific object instance, (2) Class::instanceMethod - calls method on the first parameter of the lambda. The first type captures a specific object; the second uses the stream element as the receiver.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class InstanceMethodRef {
    private String prefix = "Item: ";

    String addPrefix(String s) {
        return prefix + s;
    }

    public static void main(String[] args) {
        List<String> items = Arrays.asList("apple", "banana", "cherry");

        // Type 1: instance::method - method on specific object
        // System.out is the instance, println is the method
        items.forEach(System.out::println);

        // Using a custom instance
        InstanceMethodRef formatter = new InstanceMethodRef();
        List<String> formatted = items.stream()
            .map(formatter::addPrefix)  // calls addPrefix on formatter
            .collect(Collectors.toList());
        System.out.println(formatted);  // [Item: apple, Item: banana, Item: cherry]

        // Type 2: Class::instanceMethod - method on stream element
        // The stream element becomes 'this' for the method call
        List<String> upper = items.stream()
            .map(String::toUpperCase)  // calls toUpperCase() on each String
            .collect(Collectors.toList());
        System.out.println(upper);  // [APPLE, BANANA, CHERRY]

        // Sorting with Class::instanceMethod
        List<String> sorted = items.stream()
            .sorted(String::compareToIgnoreCase)
            .collect(Collectors.toList());
        System.out.println(sorted);  // [apple, banana, cherry]
    }
}`
        },
        {
          name: 'Constructor Reference',
          explanation: 'Class::new references a constructor. The compiler infers which constructor based on the functional interface context. Useful for creating objects in streams, factory patterns, and supplier-based lazy initialization. Works with arrays too: int[]::new.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class ConstructorRef {
    static class Person {
        String name;
        int age;

        Person() { this.name = "Unknown"; this.age = 0; }
        Person(String name) { this.name = name; this.age = 0; }
        Person(String name, int age) { this.name = name; this.age = age; }

        @Override
        public String toString() { return name + ":" + age; }
    }

    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Constructor reference: Person::new
        // Compiler infers Person(String) constructor
        List<Person> people = names.stream()
            .map(Person::new)
            .collect(Collectors.toList());
        System.out.println(people);  // [Alice:0, Bob:0, Charlie:0]

        // Supplier with no-arg constructor
        Supplier<Person> personSupplier = Person::new;
        Person unknown = personSupplier.get();
        System.out.println(unknown);  // Unknown:0

        // BiFunction with two-arg constructor
        BiFunction<String, Integer, Person> factory = Person::new;
        Person alice = factory.apply("Alice", 30);
        System.out.println(alice);  // Alice:30

        // Array constructor reference
        Function<Integer, String[]> arrayFactory = String[]::new;
        String[] arr = arrayFactory.apply(5);
        System.out.println(arr.length);  // 5

        // Use in toArray()
        String[] nameArray = names.stream()
            .map(String::toUpperCase)
            .toArray(String[]::new);
        System.out.println(Arrays.toString(nameArray));  // [ALICE, BOB, CHARLIE]
    }
}`
        }
      ]
    },
    {
      id: 'exception-handling',
      name: 'Exception Handling',
      icon: '⚠️',
      color: '#ef4444',
      description: 'Handle checked exceptions in lambdas using wrapper functions and custom functional interfaces.',
      diagram: ExceptionHandlingDiagram,
      details: [
        {
          name: 'The Problem',
          diagram: ExceptionHandlingDiagram,
          explanation: 'Built-in functional interfaces like Function<T,R> do not declare checked exceptions. This means lambdas cannot throw checked exceptions directly. Attempting to do so causes a compile error. This is a common pain point when working with I/O operations, parsing, or other methods that throw checked exceptions.',
          codeExample: `import java.util.*;
import java.util.stream.*;
import java.io.*;

public class ExceptionProblem {
    public static void main(String[] args) {
        List<String> filenames = Arrays.asList("file1.txt", "file2.txt");

        // This WON'T compile - IOException is a checked exception
        // filenames.stream()
        //     .map(name -> new FileInputStream(name))  // Compile error!
        //     .collect(Collectors.toList());

        // Workaround 1: Wrap in try-catch (ugly)
        List<InputStream> streams = filenames.stream()
            .map(name -> {
                try {
                    return new FileInputStream(name);
                } catch (FileNotFoundException e) {
                    throw new RuntimeException(e);  // Convert to unchecked
                }
            })
            .collect(Collectors.toList());

        // This works but clutters the code with try-catch blocks
    }
}`
        },
        {
          name: 'Wrapper Function Solution',
          explanation: 'Create a wrapper that converts checked exceptions to unchecked, or returns Optional to handle failures gracefully. The wrapper accepts a ThrowingFunction (custom interface that declares throws) and returns a standard Function. Exceptions are either wrapped in RuntimeException or converted to Optional.empty().',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class WrapperSolution {
    // Custom functional interface that can throw
    @FunctionalInterface
    interface ThrowingFunction<T, R> {
        R apply(T t) throws Exception;
    }

    // Wrapper that returns Optional (graceful handling)
    static <T, R> Function<T, Optional<R>> wrap(ThrowingFunction<T, R> f) {
        return t -> {
            try {
                return Optional.of(f.apply(t));
            } catch (Exception e) {
                return Optional.empty();
            }
        };
    }

    // Wrapper that converts to RuntimeException (fail fast)
    static <T, R> Function<T, R> wrapUnchecked(ThrowingFunction<T, R> f) {
        return t -> {
            try {
                return f.apply(t);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        };
    }

    public static void main(String[] args) {
        List<String> numbers = Arrays.asList("10", "20", "abc", "30", "xyz", "40");

        // Using wrap() - skip invalid values
        int sum = numbers.stream()
            .map(wrap(Integer::parseInt))
            .filter(Optional::isPresent)
            .mapToInt(Optional::get)
            .sum();
        System.out.println("Sum: " + sum);  // Sum: 100

        // Using wrapUnchecked() - fail on first error
        // numbers.stream()
        //     .map(wrapUnchecked(Integer::parseInt))  // Would throw on "abc"
        //     .forEach(System.out::println);
    }
}`
        },
        {
          name: 'Advanced Patterns',
          explanation: 'For production code, consider using libraries like Vavr or jOOL that provide Try monads and checked exception handling. You can also create specialized wrappers for specific exception types, or use Either<Error, Result> patterns for detailed error information.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class AdvancedExceptionHandling {
    // Either type for detailed error handling
    sealed interface Either<L, R> {
        record Left<L, R>(L value) implements Either<L, R> {}
        record Right<L, R>(R value) implements Either<L, R> {}

        static <L, R> Either<L, R> left(L value) { return new Left<>(value); }
        static <L, R> Either<L, R> right(R value) { return new Right<>(value); }
    }

    @FunctionalInterface
    interface ThrowingFunction<T, R> {
        R apply(T t) throws Exception;
    }

    // Wrapper that captures error details
    static <T, R> Function<T, Either<Exception, R>> wrapEither(ThrowingFunction<T, R> f) {
        return t -> {
            try {
                return Either.right(f.apply(t));
            } catch (Exception e) {
                return Either.left(e);
            }
        };
    }

    public static void main(String[] args) {
        List<String> inputs = Arrays.asList("10", "abc", "30");

        // Collect both successes and failures
        var results = inputs.stream()
            .map(wrapEither(Integer::parseInt))
            .collect(Collectors.toList());

        // Process results with full error information
        for (int i = 0; i < results.size(); i++) {
            var result = results.get(i);
            String input = inputs.get(i);
            switch (result) {
                case Either.Right<Exception, Integer> r ->
                    System.out.println(input + " -> " + r.value());
                case Either.Left<Exception, Integer> l ->
                    System.out.println(input + " -> Error: " + l.value().getMessage());
            }
        }
        // Output:
        // 10 -> 10
        // abc -> Error: For input string: "abc"
        // 30 -> 30
    }
}`
        }
      ]
    },
    {
      id: 'consumer-supplier',
      name: 'Consumer & Supplier',
      icon: '📥',
      color: '#06b6d4',
      description: 'Consumer processes input with side effects. Supplier provides values lazily without input.',
      diagram: ConsumerSupplierDiagram,
      details: [
        {
          name: 'Consumer Pattern',
          diagram: ConsumerSupplierDiagram,
          explanation: 'Consumer<T> accepts an input and returns void. It is designed for operations with side effects: logging, printing, modifying external state. Use andThen() to chain consumers. BiConsumer<T,U> accepts two parameters. Common use: forEach() operations on collections.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.time.*;

public class ConsumerPattern {
    public static void main(String[] args) {
        List<String> messages = Arrays.asList(
            "ERROR: File not found",
            "INFO: Process started",
            "WARN: Low memory"
        );

        // Simple consumer
        Consumer<String> print = System.out::println;

        // Consumer with timestamp
        Consumer<String> addTimestamp = msg ->
            System.out.print("[" + LocalTime.now().toString().substring(0, 8) + "] ");

        // Chain consumers: timestamp then print
        Consumer<String> logger = addTimestamp.andThen(print);

        messages.forEach(logger);
        // [HH:MM:SS] ERROR: File not found
        // [HH:MM:SS] INFO: Process started
        // [HH:MM:SS] WARN: Low memory

        // BiConsumer example
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);

        BiConsumer<String, Integer> printScore =
            (name, score) -> System.out.println(name + ": " + score);

        scores.forEach(printScore);
        // Alice: 95
        // Bob: 87
    }
}`
        },
        {
          name: 'Supplier Pattern',
          explanation: 'Supplier<T> takes no arguments and returns a value. It represents lazy computation - the value is computed only when get() is called. Use for expensive computations, random values, or factory methods. BooleanSupplier, IntSupplier, etc. provide primitive specializations.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class SupplierPattern {
    public static void main(String[] args) {
        // Lazy computation - only executed when needed
        Supplier<Double> expensiveCalc = () -> {
            System.out.println("Computing...");
            double result = 0;
            for (int i = 1; i <= 1000000; i++) {
                result += Math.sqrt(i);
            }
            return result;
        };

        System.out.println("Supplier created");
        // Nothing computed yet

        System.out.println("Result: " + expensiveCalc.get());
        // Now "Computing..." is printed, then the result

        // Factory pattern with Supplier
        Supplier<List<String>> listFactory = ArrayList::new;
        List<String> list1 = listFactory.get();  // New ArrayList
        List<String> list2 = listFactory.get();  // Another new ArrayList

        // Random value supplier
        Supplier<Integer> randomInt = () -> new Random().nextInt(100);
        System.out.println(randomInt.get());  // Random number 0-99
        System.out.println(randomInt.get());  // Different random number

        // Use with Optional.orElseGet()
        Optional<String> empty = Optional.empty();
        String value = empty.orElseGet(() -> "Default Value");
        // Supplier is only called if Optional is empty
    }
}`
        },
        {
          name: 'Memoization with Supplier',
          explanation: 'Combine Supplier with caching to create memoized computations. The expensive calculation runs only once, and subsequent calls return the cached value. This is useful for configuration loading, database connections, or any initialization that should happen lazily but only once.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class MemoizedSupplier {
    // Memoization wrapper - computes value once, caches result
    static <T> Supplier<T> memoize(Supplier<T> supplier) {
        // Using holder to store computed value
        Object[] cache = { null };
        boolean[] computed = { false };

        return () -> {
            if (!computed[0]) {
                synchronized (cache) {
                    if (!computed[0]) {
                        cache[0] = supplier.get();
                        computed[0] = true;
                    }
                }
            }
            @SuppressWarnings("unchecked")
            T result = (T) cache[0];
            return result;
        };
    }

    public static void main(String[] args) {
        // Expensive computation
        Supplier<Map<String, String>> configLoader = memoize(() -> {
            System.out.println("Loading configuration...");
            // Simulate loading from file/database
            Map<String, String> config = new HashMap<>();
            config.put("url", "https://api.example.com");
            config.put("timeout", "5000");
            return Collections.unmodifiableMap(config);
        });

        // First call - loads configuration
        System.out.println(configLoader.get().get("url"));
        // Output: Loading configuration...
        //         https://api.example.com

        // Second call - returns cached value
        System.out.println(configLoader.get().get("timeout"));
        // Output: 5000 (no "Loading configuration...")
    }
}`
        }
      ]
    },
    {
      id: 'higher-order-functions',
      name: 'Higher-Order Functions',
      icon: '🎯',
      color: '#ec4899',
      description: 'Functions that accept or return other functions. Create flexible, reusable function factories.',
      diagram: HigherOrderFunctionsDiagram,
      details: [
        {
          name: 'Function Factories',
          diagram: HigherOrderFunctionsDiagram,
          explanation: 'A function factory is a method that returns a function. Based on parameters, it creates customized behavior. This pattern enables runtime configuration of logic, strategy pattern implementation, and creating families of related operations.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class FunctionFactory {
    // Factory that creates different math operations
    static Function<Integer, Integer> makeOperator(String op) {
        return switch (op) {
            case "double" -> x -> x * 2;
            case "square" -> x -> x * x;
            case "negate" -> x -> -x;
            case "abs" -> Math::abs;
            default -> Function.identity();  // Returns input unchanged
        };
    }

    // Parameterized factory
    static Function<Integer, Integer> multiplyBy(int factor) {
        return x -> x * factor;
    }

    static Function<Integer, Boolean> greaterThan(int threshold) {
        return x -> x > threshold;
    }

    public static void main(String[] args) {
        // Create functions from factory
        Function<Integer, Integer> doubleOp = makeOperator("double");
        Function<Integer, Integer> square = makeOperator("square");

        System.out.println(doubleOp.apply(5));  // 10
        System.out.println(square.apply(5));     // 25

        // Compose factory-created functions
        Function<Integer, Integer> doubleAndSquare = doubleOp.andThen(square);
        System.out.println(doubleAndSquare.apply(3));  // (3*2)^2 = 36

        // Parameterized factories
        Function<Integer, Integer> times10 = multiplyBy(10);
        Function<Integer, Boolean> over100 = greaterThan(100);

        List<Integer> numbers = Arrays.asList(5, 15, 25, 35);
        numbers.stream()
            .map(times10)
            .filter(over100)
            .forEach(System.out::println);  // 150, 250, 350
    }
}`
        },
        {
          name: 'BiFunction and Beyond',
          explanation: 'BiFunction<T,U,R> accepts two parameters and returns a result. For more parameters, create custom functional interfaces. These enable multi-parameter operations like combine, merge, or compute functions. BinaryOperator<T> is a specialized BiFunction where all types are the same.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class BiFunctionExamples {
    public static void main(String[] args) {
        // BiFunction: two inputs, one output
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
        BiFunction<Integer, Integer, Integer> multiply = (a, b) -> a * b;
        BiFunction<String, Integer, String> repeat = String::repeat;

        System.out.println(add.apply(3, 4));       // 7
        System.out.println(multiply.apply(3, 4)); // 12
        System.out.println(repeat.apply("Hi", 3)); // HiHiHi

        // Chain with andThen()
        BiFunction<Integer, Integer, Integer> addThenDouble =
            add.andThen(x -> x * 2);
        System.out.println(addThenDouble.apply(3, 4));  // (3+4)*2 = 14

        // BinaryOperator: all types same
        BinaryOperator<Integer> max = Integer::max;
        BinaryOperator<String> concat = String::concat;

        System.out.println(max.apply(10, 20));  // 20
        System.out.println(concat.apply("Hello, ", "World"));  // Hello, World

        // Use in reduce
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        int sum = nums.stream().reduce(0, add);
        int product = nums.stream().reduce(1, multiply);
        System.out.println("Sum: " + sum + ", Product: " + product);  // 15, 120
    }
}`
        },
        {
          name: 'Currying and Partial Application',
          explanation: 'Currying transforms a function with multiple parameters into a chain of single-parameter functions. Partial application fixes some arguments to create a specialized function. These techniques from functional programming enable flexible function composition and reuse.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class CurryingExample {
    // Curried function: f(a, b, c) -> f(a)(b)(c)
    static Function<Integer, Function<Integer, Function<Integer, Integer>>>
        curriedAdd3 = a -> b -> c -> a + b + c;

    // Currying a BiFunction
    static <T, U, R> Function<T, Function<U, R>> curry(BiFunction<T, U, R> biFunc) {
        return t -> u -> biFunc.apply(t, u);
    }

    // Partial application: fix first argument
    static <T, U, R> Function<U, R> partial(BiFunction<T, U, R> biFunc, T first) {
        return u -> biFunc.apply(first, u);
    }

    public static void main(String[] args) {
        // Using curried function
        int result1 = curriedAdd3.apply(1).apply(2).apply(3);
        System.out.println(result1);  // 6

        // Partial application
        Function<Integer, Function<Integer, Integer>> add = curry((a, b) -> a + b);
        Function<Integer, Integer> add10 = add.apply(10);  // Fix first arg to 10

        System.out.println(add10.apply(5));   // 15
        System.out.println(add10.apply(20));  // 30

        // Practical example: log formatter
        BiFunction<String, String, String> format =
            (level, msg) -> "[" + level + "] " + msg;

        Function<String, String> errorLog = partial(format, "ERROR");
        Function<String, String> infoLog = partial(format, "INFO");

        System.out.println(errorLog.apply("File not found"));  // [ERROR] File not found
        System.out.println(infoLog.apply("Process started"));  // [INFO] Process started
    }
}`
        }
      ]
    },
    {
      id: 'closures-capture',
      name: 'Closures & Variable Capture',
      icon: '📦',
      color: '#8b5cf6',
      description: 'Lambdas capture variables from enclosing scope. Understanding "effectively final" is essential.',
      diagram: ClosuresDiagram,
      details: [
        {
          name: 'Variable Capture',
          diagram: ClosuresDiagram,
          explanation: 'Lambdas can access variables from the enclosing scope - this is called "capturing" or "closing over" variables. However, captured variables must be "effectively final" - they cannot be reassigned after initialization. This ensures thread safety and predictable behavior.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class VariableCapture {
    public static void main(String[] args) {
        // Captured variable - effectively final
        String prefix = "Hello, ";
        Function<String, String> greeter = name -> prefix + name;

        System.out.println(greeter.apply("World"));  // Hello, World

        // This would cause compile error:
        // prefix = "Hi, ";  // Can't reassign captured variable

        // Multiple captured variables
        int multiplier = 2;
        int offset = 10;
        Function<Integer, Integer> transform = x -> x * multiplier + offset;

        System.out.println(transform.apply(5));  // 5 * 2 + 10 = 20

        // Capturing from loop - common mistake
        List<Runnable> tasks = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            final int index = i;  // Must capture in final variable
            tasks.add(() -> System.out.println("Task " + index));
        }
        tasks.forEach(Runnable::run);
        // Task 0, Task 1, Task 2

        // Without final: would capture loop variable reference
        // and all would print "Task 3"
    }
}`
        },
        {
          name: 'Mutable State with Arrays',
          explanation: 'To modify captured state, use a mutable container like an array or AtomicReference. The reference to the container is effectively final, but its contents can change. This is the standard workaround for the effectively final requirement.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.concurrent.atomic.*;

public class MutableStateCapture {
    // Counter factory using array for mutable state
    static Supplier<Integer> createCounter(int start, int step) {
        int[] count = { start };  // Array is effectively final

        return () -> {
            int current = count[0];
            count[0] += step;  // Modify array contents
            return current;
        };
    }

    public static void main(String[] args) {
        // Create independent counters
        Supplier<Integer> counter1 = createCounter(0, 1);
        Supplier<Integer> counter2 = createCounter(100, 10);

        System.out.println(counter1.get());  // 0
        System.out.println(counter1.get());  // 1
        System.out.println(counter2.get());  // 100
        System.out.println(counter1.get());  // 2
        System.out.println(counter2.get());  // 110

        // Using AtomicInteger for thread safety
        AtomicInteger atomicCounter = new AtomicInteger(0);
        Supplier<Integer> threadSafeCounter = atomicCounter::getAndIncrement;

        // Using AtomicReference for objects
        AtomicReference<String> state = new AtomicReference<>("initial");
        Consumer<String> updateState = newState -> {
            String old = state.getAndSet(newState);
            System.out.println("Changed from " + old + " to " + newState);
        };

        updateState.accept("running");   // Changed from initial to running
        updateState.accept("completed"); // Changed from running to completed
    }
}`
        },
        {
          name: 'Closure Scope and Lifetime',
          explanation: 'Closures extend the lifetime of captured variables beyond their original scope. Each closure instance maintains its own copy of captured values. This enables powerful patterns like private state and factory functions that produce configured instances.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class ClosureLifetime {
    // Factory that creates configured processors
    static Function<String, String> createProcessor(String prefix, String suffix) {
        // prefix and suffix are captured and live as long as the returned function
        return input -> prefix + input.toUpperCase() + suffix;
    }

    // Builder pattern with closures
    static class ValidatorBuilder {
        private final List<Predicate<String>> rules = new ArrayList<>();

        ValidatorBuilder notEmpty() {
            rules.add(s -> s != null && !s.isEmpty());
            return this;
        }

        ValidatorBuilder maxLength(int max) {
            // max is captured in the closure
            rules.add(s -> s.length() <= max);
            return this;
        }

        ValidatorBuilder matches(String pattern) {
            // pattern is captured
            rules.add(s -> s.matches(pattern));
            return this;
        }

        Predicate<String> build() {
            // Combine all captured predicates
            return s -> rules.stream().allMatch(rule -> rule.test(s));
        }
    }

    public static void main(String[] args) {
        // Processors with different configurations
        var xmlWrapper = createProcessor("<data>", "</data>");
        var jsonWrapper = createProcessor("{\\"value\\": \\"", "\\"}");

        System.out.println(xmlWrapper.apply("hello"));   // <data>HELLO</data>
        System.out.println(jsonWrapper.apply("hello")); // {"value": "HELLO"}

        // Validator with captured rules
        Predicate<String> usernameValidator = new ValidatorBuilder()
            .notEmpty()
            .maxLength(20)
            .matches("[a-zA-Z0-9_]+")
            .build();

        System.out.println(usernameValidator.test("john_doe"));     // true
        System.out.println(usernameValidator.test(""));             // false
        System.out.println(usernameValidator.test("invalid user")); // false (space)
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
      { name: 'Advanced Lambdas', icon: '🔗', page: 'LambdasAdvanced' }
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
    background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(124, 58, 237, 0.2)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
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
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Advanced Lambda Expressions</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(124, 58, 237, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(124, 58, 237, 0.2)'
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
          colors={LAMBDAS_ADV_COLORS}
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
              colors={LAMBDAS_ADV_COLORS}
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

export default LambdasAdvanced

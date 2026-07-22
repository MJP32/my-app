/**
 * Java 8 Features Page
 *
 * This page covers all major Java 8 features including:
 * - Lambda Expressions
 * - Stream API
 * - Optional
 * - Date/Time API
 * - Default Methods
 * - CompletableFuture
 * - Nashorn JavaScript Engine
 * - JVM Improvements
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const JAVA8_COLORS = {
  primary: '#3b82f6',           // Blue - main accent color
  primaryHover: '#60a5fa',      // Hover state
  bg: 'rgba(59, 130, 246, 0.1)', // Background with transparency
  border: 'rgba(59, 130, 246, 0.3)', // Border color
  arrow: '#3b82f6',             // Arrow/indicator color
  hoverBg: 'rgba(59, 130, 246, 0.2)', // Hover background
  topicBg: 'rgba(59, 130, 246, 0.2)'  // Topic card background
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

const LambdaDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowLambda" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
      <linearGradient id="lambdaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Lambda Expression Transformation
    </text>

    {/* Anonymous Class */}
    <rect x="30" y="50" width="200" height="130" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
    <text x="130" y="75" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Anonymous Class</text>
    <text x="50" y="100" fill="#64748b" fontSize="9">new Runnable() {'{'}</text>
    <text x="60" y="115" fill="#64748b" fontSize="9">@Override</text>
    <text x="60" y="130" fill="#64748b" fontSize="9">public void run() {'{'}</text>
    <text x="70" y="145" fill="#22c55e" fontSize="9">// code</text>
    <text x="60" y="160" fill="#64748b" fontSize="9">{'}'}</text>
    <text x="50" y="175" fill="#64748b" fontSize="9">{'}'}</text>

    {/* Arrow */}
    <line x1="240" y1="115" x2="320" y2="115" stroke="url(#lambdaGrad)" strokeWidth="3" markerEnd="url(#arrowLambda)"/>
    <text x="280" y="100" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">Simplify</text>

    {/* Lambda */}
    <rect x="330" y="70" width="160" height="90" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="410" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Lambda Expression</text>
    <text x="410" y="120" textAnchor="middle" fill="white" fontSize="13" fontFamily="monospace">{`() -> {'{'}`}</text>
    <text x="410" y="140" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontFamily="monospace">// code</text>
    <text x="410" y="155" textAnchor="middle" fill="white" fontSize="13" fontFamily="monospace">{'}'}</text>

    {/* Arrow to Method Reference */}
    <line x1="500" y1="115" x2="580" y2="115" stroke="url(#lambdaGrad)" strokeWidth="3" markerEnd="url(#arrowLambda)"/>
    <text x="540" y="100" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">Further</text>

    {/* Method Reference */}
    <rect x="590" y="80" width="180" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="680" y="105" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Method Reference</text>
    <text x="680" y="130" textAnchor="middle" fill="white" fontSize="14" fontFamily="monospace">Class::method</text>

    {/* Benefits */}
    <text x="130" y="200" textAnchor="middle" fill="#ef4444" fontSize="10">Verbose</text>
    <text x="410" y="200" textAnchor="middle" fill="#22c55e" fontSize="10">Concise</text>
    <text x="680" y="200" textAnchor="middle" fill="#3b82f6" fontSize="10">Most Concise</text>
  </svg>
)

const StreamDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowStream" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`
      Stream Pipeline: Source -> Intermediate Operations -> Terminal Operation
    `}</text>

    {/* Source */}
    <rect x="30" y="60" width="100" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Source</text>
    <text x="80" y="105" textAnchor="middle" fill="white" fontSize="9">Collection/Array</text>

    {/* Arrow */}
    <line x1="135" y1="90" x2="175" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowStream)"/>

    {/* Filter */}
    <rect x="180" y="60" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="230" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">filter()</text>
    <text x="230" y="105" textAnchor="middle" fill="white" fontSize="9">Intermediate</text>

    {/* Arrow */}
    <line x1="285" y1="90" x2="325" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowStream)"/>

    {/* Map */}
    <rect x="330" y="60" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="380" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">map()</text>
    <text x="380" y="105" textAnchor="middle" fill="white" fontSize="9">Intermediate</text>

    {/* Arrow */}
    <line x1="435" y1="90" x2="475" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowStream)"/>

    {/* Sorted */}
    <rect x="480" y="60" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="530" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">sorted()</text>
    <text x="530" y="105" textAnchor="middle" fill="white" fontSize="9">Intermediate</text>

    {/* Arrow */}
    <line x1="585" y1="90" x2="625" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowStream)"/>

    {/* Collect */}
    <rect x="630" y="60" width="130" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="695" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">collect()</text>
    <text x="695" y="105" textAnchor="middle" fill="white" fontSize="9">Terminal</text>

    {/* Labels */}
    <text x="80" y="145" textAnchor="middle" fill="#22c55e" fontSize="9">Creates Stream</text>
    <text x="380" y="145" textAnchor="middle" fill="#3b82f6" fontSize="9">Lazy - Returns Stream</text>
    <text x="695" y="145" textAnchor="middle" fill="#f59e0b" fontSize="9">Triggers Execution</text>

    {/* Data flow illustration */}
    <text x="400" y="175" textAnchor="middle" fill="#64748b" fontSize="10">{`
      Data flows through pipeline: [1,2,3,4,5] -> filter evens -> map *2 -> sort -> [4,8]
    `}</text>
  </svg>
)

const OptionalDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowOpt" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Optional: Safe Null Handling
    </text>

    {/* Without Optional */}
    <rect x="30" y="50" width="180" height="120" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Without Optional</text>
    <text x="45" y="100" fill="#64748b" fontSize="9">if (user != null) {'{'}</text>
    <text x="55" y="115" fill="#64748b" fontSize="9">if (user.getAddr() != null) {'{'}</text>
    <text x="65" y="130" fill="#64748b" fontSize="9">return addr.getCity();</text>
    <text x="55" y="145" fill="#64748b" fontSize="9">{'}'}</text>
    <text x="45" y="160" fill="#64748b" fontSize="9">{'}'}</text>

    {/* Arrow */}
    <line x1="220" y1="110" x2="280" y2="110" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowOpt)"/>
    <text x="250" y="95" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Better</text>

    {/* With Optional */}
    <rect x="290" y="60" width="220" height="100" rx="8" fill="#10b981" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">With Optional</text>
    <text x="310" y="110" fill="white" fontSize="9">Optional.ofNullable(user)</text>
    <text x="320" y="125" fill="white" fontSize="9">.flatMap(User::getAddr)</text>
    <text x="320" y="140" fill="white" fontSize="9">.map(Address::getCity)</text>

    {/* Benefits */}
    <rect x="540" y="50" width="220" height="130" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Benefits</text>
    <text x="560" y="100" fill="#22c55e" fontSize="10">No NullPointerException</text>
    <text x="560" y="120" fill="#22c55e" fontSize="10">Self-documenting API</text>
    <text x="560" y="140" fill="#22c55e" fontSize="10">Functional composition</text>
    <text x="560" y="160" fill="#22c55e" fontSize="10">Explicit absent values</text>
  </svg>
)

const DateTimeDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Java 8 Date/Time API Classes
    </text>

    {/* LocalDate */}
    <rect x="30" y="50" width="140" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">LocalDate</text>
    <text x="100" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="10">2023-12-25</text>
    <text x="100" y="110" textAnchor="middle" fill="#93c5fd" fontSize="9">Date only</text>

    {/* LocalTime */}
    <rect x="190" y="50" width="140" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="260" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">LocalTime</text>
    <text x="260" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="10">14:30:00</text>
    <text x="260" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="9">Time only</text>

    {/* LocalDateTime */}
    <rect x="350" y="50" width="160" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="430" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">LocalDateTime</text>
    <text x="430" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="10">2023-12-25T14:30</text>
    <text x="430" y="110" textAnchor="middle" fill="#86efac" fontSize="9">Date + Time</text>

    {/* ZonedDateTime */}
    <rect x="530" y="50" width="120" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ZonedDateTime</text>
    <text x="590" y="95" textAnchor="middle" fill="#fef3c7" fontSize="9">With Timezone</text>
    <text x="590" y="110" textAnchor="middle" fill="#fde68a" fontSize="8">DST aware</text>

    {/* Instant */}
    <rect x="670" y="50" width="100" height="70" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="720" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Instant</text>
    <text x="720" y="95" textAnchor="middle" fill="#fecaca" fontSize="9">Timestamp</text>
    <text x="720" y="110" textAnchor="middle" fill="#fca5a5" fontSize="8">Epoch millis</text>

    {/* Period and Duration */}
    <rect x="120" y="145" width="150" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
    <text x="195" y="170" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Period</text>
    <text x="195" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">Years, Months, Days</text>

    <rect x="300" y="145" width="150" height="60" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="375" y="170" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">Duration</text>
    <text x="375" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">Hours, Minutes, Seconds</text>

    <rect x="480" y="145" width="180" height="60" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <text x="570" y="170" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">DateTimeFormatter</text>
    <text x="570" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread-safe formatting</text>
  </svg>
)

const DefaultMethodsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowDef" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Default Methods: Interface Evolution
    </text>

    {/* Interface */}
    <rect x="280" y="45" width="240" height="90" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">interface Collection</text>
    <text x="310" y="90" fill="white" fontSize="9">void add(E e);  // abstract</text>
    <text x="310" y="105" fill="#fce7f3" fontSize="9">default Stream stream() {'{'}</text>
    <text x="320" y="120" fill="#fce7f3" fontSize="9">return StreamSupport.stream(...);</text>
    <text x="310" y="130" fill="#fce7f3" fontSize="9">{'}'}</text>

    {/* Implementing classes */}
    <rect x="80" y="160" width="150" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="155" y="185" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ArrayList</text>
    <text x="155" y="200" textAnchor="middle" fill="#bfdbfe" fontSize="9">Gets stream() free!</text>

    <rect x="260" y="160" width="150" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="335" y="185" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">HashSet</text>
    <text x="335" y="200" textAnchor="middle" fill="#bbf7d0" fontSize="9">Gets stream() free!</text>

    <rect x="440" y="160" width="150" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="515" y="185" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">LinkedList</text>
    <text x="515" y="200" textAnchor="middle" fill="#fef3c7" fontSize="9">Gets stream() free!</text>

    <rect x="620" y="160" width="150" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="695" y="185" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">YourClass</text>
    <text x="695" y="200" textAnchor="middle" fill="#ddd6fe" fontSize="9">Gets stream() free!</text>

    {/* Arrows */}
    <line x1="320" y1="135" x2="155" y2="155" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowDef)"/>
    <line x1="370" y1="135" x2="335" y2="155" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowDef)"/>
    <line x1="430" y1="135" x2="515" y2="155" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowDef)"/>
    <line x1="480" y1="135" x2="695" y2="155" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowDef)"/>
  </svg>
)

const CompletableFutureDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowCF" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CompletableFuture: Async Pipeline
    </text>

    {/* supplyAsync */}
    <rect x="30" y="60" width="130" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="95" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">supplyAsync()</text>
    <text x="95" y="105" textAnchor="middle" fill="#fecaca" fontSize="9">Start async task</text>

    <line x1="165" y1="90" x2="205" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCF)"/>

    {/* thenApply */}
    <rect x="210" y="60" width="120" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="270" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">thenApply()</text>
    <text x="270" y="105" textAnchor="middle" fill="#fef3c7" fontSize="9">Transform</text>

    <line x1="335" y1="90" x2="375" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCF)"/>

    {/* thenCompose */}
    <rect x="380" y="60" width="130" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="445" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">thenCompose()</text>
    <text x="445" y="105" textAnchor="middle" fill="#bbf7d0" fontSize="9">Chain async</text>

    <line x1="515" y1="90" x2="555" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCF)"/>

    {/* thenAccept */}
    <rect x="560" y="60" width="120" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="620" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">thenAccept()</text>
    <text x="620" y="105" textAnchor="middle" fill="#bfdbfe" fontSize="9">Consume</text>

    <line x1="685" y1="90" x2="725" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCF)"/>

    {/* Result */}
    <rect x="730" y="70" width="50" height="40" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="755" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Done</text>

    {/* Exception handling */}
    <rect x="300" y="145" width="200" height="45" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="165" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">exceptionally() / handle()</text>
    <text x="400" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">Error handling at any stage</text>
  </svg>
)

const MetaspaceDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      JVM Memory: PermGen to Metaspace
    </text>

    {/* Java 7 */}
    <rect x="30" y="50" width="340" height="130" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Java 7 (PermGen)</text>

    <rect x="50" y="90" width="140" height="40" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="120" y="115" textAnchor="middle" fill="white" fontSize="10">Heap Space</text>

    <rect x="210" y="90" width="140" height="40" rx="4" fill="#ef4444" stroke="#f87171" strokeWidth="1"/>
    <text x="280" y="115" textAnchor="middle" fill="white" fontSize="10">PermGen (Fixed)</text>

    <text x="200" y="155" textAnchor="middle" fill="#f87171" fontSize="9">OutOfMemoryError: PermGen space</text>
    <text x="200" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">-XX:MaxPermSize required</text>

    {/* Arrow */}
    <text x="400" y="115" textAnchor="middle" fill="#22c55e" fontSize="20" fontWeight="bold">{`->`}</text>

    {/* Java 8+ */}
    <rect x="430" y="50" width="340" height="130" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Java 8+ (Metaspace)</text>

    <rect x="450" y="90" width="140" height="40" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="520" y="115" textAnchor="middle" fill="white" fontSize="10">Heap Space</text>

    <rect x="610" y="90" width="140" height="40" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="680" y="115" textAnchor="middle" fill="white" fontSize="10">Metaspace (Native)</text>

    <text x="600" y="155" textAnchor="middle" fill="#4ade80" fontSize="9">Auto-grows with native memory</text>
    <text x="600" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">No more PermGen errors!</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Java8({ onBack, breadcrumb, onNavigateTopic }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'datetime',
      name: 'Date/Time API',
      icon: '🕐',
      color: '#f59e0b',
      description: 'Modern date and time handling with immutable, thread-safe java.time package.',
      diagram: DateTimeDiagram,
      details: [
        {
          name: 'Core Classes',
          explanation: `The java.time package provides immutable, thread-safe date/time classes:

LocalDate: Date without time (2023-12-25)
LocalTime: Time without date (14:30:00)
LocalDateTime: Date and time without timezone
ZonedDateTime: Date, time with timezone
Instant: Machine timestamp (epoch seconds)

All classes are immutable - operations return new instances.`,
          codeExample: `// LocalDate - date without time
LocalDate today = LocalDate.now();
LocalDate birthday = LocalDate.of(1990, Month.JANUARY, 15);
LocalDate parsed = LocalDate.parse("2023-12-25");

// LocalTime - time without date
LocalTime now = LocalTime.now();
LocalTime lunchTime = LocalTime.of(12, 30, 0);

// LocalDateTime - date and time
LocalDateTime meeting = LocalDateTime.of(2023, 12, 25, 14, 30);
LocalDateTime current = LocalDateTime.now();

// ZonedDateTime - with timezone
ZonedDateTime nyTime = ZonedDateTime.now(ZoneId.of("America/New_York"));
ZonedDateTime tokyoTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));

// Instant - timestamp (epoch seconds)
Instant timestamp = Instant.now();
Instant epoch = Instant.ofEpochSecond(1609459200);

// All are immutable
LocalDate date = LocalDate.now();
LocalDate tomorrow = date.plusDays(1);  // Returns new instance
// 'date' is unchanged!`
        },
        {
          name: 'Period & Duration',
          explanation: `Period and Duration represent amounts of time:

Period: Date-based (years, months, days)
- Use with LocalDate, LocalDateTime
- Considers calendar irregularities

Duration: Time-based (hours, minutes, seconds)
- Use with LocalTime, Instant
- Always exact time measurement

Use for calculating differences and time arithmetic.`,
          codeExample: `// Period - date-based amounts
Period oneYear = Period.ofYears(1);
Period threeMonths = Period.ofMonths(3);
Period complex = Period.of(1, 6, 15);  // 1 year, 6 months, 15 days

LocalDate start = LocalDate.of(2020, 1, 1);
LocalDate end = LocalDate.of(2023, 6, 15);
Period between = Period.between(start, end);
// 3 years, 5 months, 14 days

// Duration - time-based amounts
Duration oneHour = Duration.ofHours(1);
Duration thirtyMinutes = Duration.ofMinutes(30);

LocalDateTime start2 = LocalDateTime.of(2023, 1, 1, 10, 0);
LocalDateTime end2 = LocalDateTime.of(2023, 1, 1, 15, 30);
Duration duration = Duration.between(start2, end2);
// Hours: 5, Minutes: 330

// Date arithmetic
LocalDate futureDate = LocalDate.now().plus(Period.ofWeeks(2));
LocalTime futureTime = LocalTime.now().plus(Duration.ofHours(3));`
        },
        {
          name: 'Formatting & Parsing',
          explanation: `DateTimeFormatter converts between strings and date/time objects. Unlike SimpleDateFormat, it's thread-safe.

Predefined Formatters:
- ISO_LOCAL_DATE: 2023-12-25
- ISO_LOCAL_TIME: 14:30:00
- ISO_LOCAL_DATE_TIME: 2023-12-25T14:30:00

Custom Patterns:
- y/yyyy: Year
- M/MM/MMM/MMMM: Month
- d/dd: Day
- H/HH: Hour (24h)
- m/mm: Minute
- s/ss: Second`,
          codeExample: `// Predefined formatters
LocalDate date = LocalDate.now();
String iso = date.format(DateTimeFormatter.ISO_LOCAL_DATE);
// "2023-12-25"

// Custom patterns
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
String formatted = date.format(formatter);
// "25/12/2023"

DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");
String time = LocalTime.now().format(timeFormatter);
// "02:30 PM"

// Parsing with custom format
String dateStr = "25/12/2023";
LocalDate parsedDate = LocalDate.parse(dateStr,
    DateTimeFormatter.ofPattern("dd/MM/yyyy"));

// Locale-specific formatting
DateTimeFormatter usFormat = DateTimeFormatter
    .ofPattern("MMMM dd, yyyy", Locale.US);
String usDate = date.format(usFormat);
// "December 25, 2023"

// Thread-safe! (unlike SimpleDateFormat)`
        },
        {
          name: 'Timezone Handling',
          explanation: `Comprehensive timezone support with automatic DST handling:

ZoneId: Timezone identifier (e.g., "America/New_York")
ZoneOffset: Fixed offset from UTC (e.g., +05:00)
ZonedDateTime: Date-time with timezone

Methods:
- withZoneSameInstant(): Convert between timezones
- withZoneSameLocal(): Keep local time, change zone`,
          codeExample: `// ZoneId - timezone identification
ZoneId newYork = ZoneId.of("America/New_York");
ZoneId tokyo = ZoneId.of("Asia/Tokyo");
ZoneId utc = ZoneId.of("UTC");

// Current time in different timezones
ZonedDateTime nyTime = ZonedDateTime.now(newYork);
ZonedDateTime tokyoTime = ZonedDateTime.now(tokyo);

// Convert between timezones
ZonedDateTime meeting = ZonedDateTime.of(
    LocalDateTime.of(2023, 12, 25, 14, 0),
    newYork
);
ZonedDateTime tokyoMeeting = meeting.withZoneSameInstant(tokyo);
// NY: 2023-12-25T14:00-05:00[America/New_York]
// Tokyo: 2023-12-26T04:00+09:00[Asia/Tokyo]

// DST handling - automatic!
ZonedDateTime spring = ZonedDateTime.of(
    LocalDateTime.of(2023, 3, 12, 2, 30),  // DST transition
    newYork
);
// Automatically adjusts for daylight saving time`
        }
      ]
    },
    {
      id: 'default-methods',
      name: 'Default Methods',
      icon: '🔧',
      color: '#ec4899',
      description: 'Interface evolution with default and static methods for backward-compatible API changes.',
      diagram: DefaultMethodsDiagram,
      details: [
        {
          name: 'Evolution Strategy',
          explanation: `Default methods enable adding new functionality to interfaces without breaking existing implementations.

Before Java 8:
- Interfaces were frozen once published
- Adding methods broke all implementations
- Led to awkward workarounds

With Default Methods:
- New methods added with default implementation
- Existing classes automatically inherit implementation
- Binary compatibility maintained

Real example: Java 8 added stream(), forEach() to Collection without breaking thousands of implementations.`,
          codeExample: `// Before Java 8 - couldn't add methods
interface OldCollection {
    int size();
    boolean isEmpty();
    // Adding new method would break all implementations!
}

// Java 8+ - can evolve interfaces safely
interface ModernCollection {
    // Original abstract methods
    int size();
    boolean isEmpty();

    // New default method
    default Stream<Object> stream() {
        return StreamSupport.stream(spliterator(), false);
    }

    default void forEach(Consumer<Object> action) {
        for (Object item : this) {
            action.accept(item);
        }
    }
}

// Old implementations continue to work!
class MyOldList implements ModernCollection {
    @Override public int size() { return 0; }
    @Override public boolean isEmpty() { return true; }
    // Automatically gets stream(), forEach()!
}`
        },
        {
          name: 'Diamond Problem',
          explanation: `When a class implements two interfaces with the same default method, there's ambiguity.

Resolution Rules (Priority Order):
1. Class implementation wins
2. More specific interface wins (subinterface)
3. Must explicitly override and choose

Use InterfaceName.super.methodName() to call a specific interface's implementation.`,
          codeExample: `interface A {
    default void hello() {
        System.out.println("Hello from A");
    }
}

interface B {
    default void hello() {
        System.out.println("Hello from B");
    }
}

// Must resolve conflict
class C implements A, B {
    @Override
    public void hello() {
        A.super.hello();  // Call A's hello
        B.super.hello();  // Call B's hello
        System.out.println("Hello from C");
    }
}

C obj = new C();
obj.hello();
// Output:
// Hello from A
// Hello from B
// Hello from C

// More specific interface wins
interface Animal {
    default void move() { System.out.println("Animal moves"); }
}

interface Dog extends Animal {
    @Override
    default void move() { System.out.println("Dog walks"); }
}

class Beagle implements Dog {
    // No conflict - Dog.move() is more specific
}`
        },
        {
          name: 'Use Cases',
          explanation: `Default methods serve multiple design patterns:

1. API Evolution: Add features without breaking changes
2. Optional Functionality: Convenience methods with sensible defaults
3. Template Method Pattern: Define algorithm structure in interface
4. Utility Methods: Static methods grouped with interface
5. Functional Composition: Enable method chaining (andThen, compose)`,
          codeExample: `// 1. API Evolution
interface Repository<T> {
    T findById(Long id);
    List<T> findAll();

    default Optional<T> findOptionalById(Long id) {
        return Optional.ofNullable(findById(id));
    }
}

// 2. Template Method Pattern
interface DataProcessor {
    void process();  // Abstract

    default void execute() {
        validate();
        process();
        cleanup();
    }

    default void validate() { System.out.println("Validating"); }
    default void cleanup() { System.out.println("Cleaning up"); }
}

DataProcessor processor = () -> System.out.println("Processing...");
processor.execute();
// Validating, Processing..., Cleaning up

// 3. Functional Composition
interface Processor<T> {
    T process(T input);

    default Processor<T> andThen(Processor<T> next) {
        return input -> next.process(process(input));
    }
}

Processor<String> upper = String::toUpperCase;
Processor<String> exclaim = s -> s + "!";
String result = upper.andThen(exclaim).process("hello");
// "HELLO!"`
        }
      ]
    },
    {
      id: 'nashorn',
      name: 'Nashorn JavaScript',
      icon: '🔶',
      color: '#f97316',
      description: 'JavaScript engine integration for scripting (deprecated in Java 11+, removed in Java 15).',
      details: [
        {
          name: 'JavaScript Engine',
          explanation: `Nashorn was a high-performance JavaScript engine in Java 8, replacing Rhino. It implements ECMAScript 5.1.

Key Features:
- JIT compilation via invokedynamic
- Standard javax.script API
- 2-10x faster than Rhino
- Interactive jjs command-line tool

Note: Deprecated in Java 11, removed in Java 15. Use GraalVM for modern JavaScript support.`,
          codeExample: `import javax.script.*;

// Get Nashorn engine
ScriptEngine engine = new ScriptEngineManager()
    .getEngineByName("nashorn");

// Execute JavaScript code
engine.eval("print('Hello from JavaScript')");

// Evaluate expressions
Object result = engine.eval("2 + 2");
System.out.println("Result: " + result);  // 4

// Define JavaScript function
engine.eval(
    "function greet(name) {" +
    "  return 'Hello, ' + name;" +
    "}"
);

// Call function from Java
Invocable invocable = (Invocable) engine;
Object greeting = invocable.invokeFunction("greet", "World");
System.out.println(greeting);  // "Hello, World"

// Access JavaScript objects
engine.eval("var person = { name: 'Alice', age: 30 }");
ScriptObjectMirror person = (ScriptObjectMirror) engine.get("person");
System.out.println(person.get("name"));  // "Alice"`
        },
        {
          name: 'Java-JavaScript Interop',
          explanation: `Bidirectional interoperability between Java and JavaScript:

Java to JavaScript:
- engine.put(name, object): Pass Java object
- JavaScript can access public fields and methods

JavaScript to Java:
- Java.type('className'): Get Java class
- new ClassName(): Create Java instance
- Implement Java interfaces with JavaScript objects`,
          codeExample: `ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

// Pass Java object to JavaScript
List<String> javaList = new ArrayList<>();
javaList.add("Item 1");
javaList.add("Item 2");
engine.put("list", javaList);

// Access from JavaScript
engine.eval("list.add('Item 3')");
engine.eval("print(list.size())");  // 3

// Create Java objects from JavaScript
engine.eval(
    "var ArrayList = Java.type('java.util.ArrayList');" +
    "var list2 = new ArrayList();" +
    "list2.add('JavaScript item');"
);

// Call static Java methods
engine.eval(
    "var System = Java.type('java.lang.System');" +
    "System.out.println('From JavaScript');"
);

// Implement Java interface in JavaScript
engine.eval(
    "var Runnable = Java.type('java.lang.Runnable');" +
    "var runner = new Runnable() {" +
    "  run: function() { print('Running!'); }" +
    "};"
);
Runnable runner = (Runnable) engine.get("runner");
new Thread(runner).start();`
        },
        {
          name: 'Deprecation Notice',
          explanation: `Nashorn Timeline:
- Java 8 (2014): Introduced, replacing Rhino
- Java 11 (2018): Deprecated for removal
- Java 15 (2020): Completely removed

Reasons for Deprecation:
- Maintenance burden
- Limited to ECMAScript 5.1 (no ES6+)
- GraalVM offers better performance
- Shift to external polyglot runtimes

Migration Path: GraalVM JavaScript or external runtimes (Node.js).`,
          codeExample: `// Nashorn lifecycle
// Java 8-10: Active
ScriptEngine engine = new ScriptEngineManager()
    .getEngineByName("nashorn");
engine.eval("print('Nashorn active')");

// Java 11+: Deprecated warning
// Warning: Nashorn is planned for removal

// Java 15+: Removed - engine will be null!

// Migration to GraalVM
import org.graalvm.polyglot.*;

Context context = Context.create("js");
Value result = context.eval("js", "2 + 2");
System.out.println(result.asInt());  // 4

// GraalVM advantages:
// - Modern JavaScript (ES6+)
// - Better performance
// - Polyglot support (JS, Python, Ruby, R)
// - Ahead-of-time compilation

// For Java 8 legacy code:
// - Continue using Nashorn until migration
// - Plan migration to GraalVM or Node.js`
        }
      ]
    },
    {
      id: 'jvm',
      name: 'JVM Improvements',
      icon: '⚙️',
      color: '#6366f1',
      description: 'Performance enhancements including PermGen removal and parallel operations.',
      diagram: MetaspaceDiagram,
      details: [
        {
          name: 'PermGen Removal',
          explanation: `Permanent Generation (PermGen) was removed in Java 8, replaced by Metaspace.

PermGen Problems:
- Fixed size heap for class metadata
- Frequent OutOfMemoryError: PermGen space
- Required manual tuning (-XX:MaxPermSize)
- Difficult class unloading

Metaspace Solution:
- Uses native memory instead of heap
- No fixed maximum size by default
- Automatic size management
- Better garbage collection`,
          codeExample: `// Before Java 8 - PermGen issues
// JVM args: -XX:PermSize=64m -XX:MaxPermSize=256m
// OutOfMemoryError: PermGen space (common!)

// Java 8+ - Metaspace (native memory)
// JVM args: -XX:MetaspaceSize=64m -XX:MaxMetaspaceSize=256m
// No more PermGen errors!

// Monitoring Metaspace
import java.lang.management.*;

MemoryPoolMXBean metaspacePool = ManagementFactory
    .getMemoryPoolMXBeans()
    .stream()
    .filter(pool -> pool.getName().equals("Metaspace"))
    .findFirst()
    .orElse(null);

if (metaspacePool != null) {
    MemoryUsage usage = metaspacePool.getUsage();
    System.out.println("Metaspace used: " +
        usage.getUsed() / (1024 * 1024) + " MB");
}

// What's in Metaspace:
// - Class structures
// - Method metadata
// - Field metadata
// - Constant pools
// - Annotations`
        },
        {
          name: 'Parallel Operations',
          explanation: `Java 8 introduced parallel operations for multi-core efficiency:

Arrays.parallelSort():
- Parallel merge sort using ForkJoinPool
- 2-4x speedup on multi-core systems
- Automatic parallelism threshold

ForkJoinPool Improvements:
- Enhanced work-stealing algorithm
- Better load balancing
- Default pool size = CPU cores

Best for large datasets and CPU-intensive operations.`,
          codeExample: `// Arrays.parallelSort() - parallel sorting
int[] array = new int[1000000];
Arrays.fill(array, (int) (Math.random() * 1000));

// Sequential sort
long start = System.currentTimeMillis();
Arrays.sort(array.clone());
long sequential = System.currentTimeMillis() - start;

// Parallel sort
start = System.currentTimeMillis();
Arrays.parallelSort(array);
long parallel = System.currentTimeMillis() - start;

System.out.println("Sequential: " + sequential + "ms");
System.out.println("Parallel: " + parallel + "ms");
// Parallel is typically 2-4x faster!

// Parallel sort with comparator
String[] strings = {"zebra", "apple", "banana"};
Arrays.parallelSort(strings, String::compareToIgnoreCase);

// ForkJoinPool with RecursiveTask
class SumTask extends RecursiveTask<Long> {
    private int[] array;
    private int start, end;
    private static final int THRESHOLD = 1000;

    @Override
    protected Long compute() {
        if (end - start <= THRESHOLD) {
            // Direct computation for small chunks
            long sum = 0;
            for (int i = start; i < end; i++) sum += array[i];
            return sum;
        } else {
            // Split into subtasks
            int mid = (start + end) / 2;
            SumTask left = new SumTask(array, start, mid);
            SumTask right = new SumTask(array, mid, end);
            left.fork();
            return right.compute() + left.join();
        }
    }
}`
        },
        {
          name: 'String Deduplication',
          explanation: `Java 8 introduced G1 String Deduplication to reduce memory footprint by sharing identical char arrays between String objects.

How It Works:
- Enabled with -XX:+UseG1GC -XX:+UseStringDeduplication
- G1 GC identifies duplicate strings during garbage collection
- Shares underlying char[] arrays between identical strings
- Works transparently without code changes

Benefits:
- Significant memory savings (10-50% for string-heavy apps)
- No application code modifications required
- Automatic optimization during GC
- Particularly effective for large heaps with many duplicate strings`,
          codeExample: `// Enable String Deduplication (G1 GC required)
// JVM args: -XX:+UseG1GC -XX:+UseStringDeduplication

// How duplicates occur in typical applications
List<String> users = loadUsersFromDatabase();
// Many users may have same "country" or "city" strings
// Without deduplication: each string has separate char[]
// With deduplication: identical strings share char[]

// Example scenario
String city1 = new String("New York");  // Separate char[]
String city2 = new String("New York");  // Separate char[]
// city1 != city2 (different objects)
// city1.equals(city2) = true

// After G1 deduplication runs:
// Both city1 and city2 now share the same char[]
// Memory usage reduced!

// Monitoring deduplication
// JVM args: -XX:+PrintStringDeduplicationStatistics
// Output shows:
// - Strings inspected and deduplicated
// - Memory saved
// - Time spent

// Additional string improvements in Java 8:
// - String.join() for easy concatenation
String joined = String.join(", ", "apple", "banana", "cherry");
// "apple, banana, cherry"

// - StringJoiner for building strings
StringJoiner joiner = new StringJoiner(", ", "[", "]");
joiner.add("one").add("two").add("three");
String result = joiner.toString();
// "[one, two, three]"`
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
      { name: 'Java 8 Features', icon: '🚀', page: 'Java 8 Features' }
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
  }, [selectedConceptIndex, onBack, concepts.length])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
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
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Java 8 Features</h1>
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
          Back to Java
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={JAVA8_COLORS}
        />
        {onNavigateTopic && (
          <div style={{ marginTop: '1rem', padding: '0.9rem 1.2rem', backgroundColor: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.35)', borderRadius: '12px', color: '#e5e7eb', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
            <span>This page covers what was new in the Java 8 release. The headline features have their own in-depth pages:</span>
            <button onClick={() => onNavigateTopic('Lambdas')} style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Lambdas &rarr;</button>
            <button onClick={() => onNavigateTopic('Streams')} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Stream API &rarr;</button>
            <button onClick={() => onNavigateTopic('Optional')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Optional &rarr;</button>
          </div>
        )}
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
        primaryColor={JAVA8_COLORS.primary}
      />


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
              colors={JAVA8_COLORS}
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
                ></button>
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
                ></button>
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
                ></button>
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
                  <div style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {detail.explanation}
                  </div>

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

export default Java8

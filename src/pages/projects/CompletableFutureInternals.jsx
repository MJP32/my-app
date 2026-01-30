import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const COMPLETABLEFUTURE_COLORS = {
  primary: '#22c55e',
  primaryHover: '#4ade80',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
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

const ArchitectureOverviewDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CompletableFuture Internal Architecture
    </text>

    {/* CompletableFuture main box */}
    <rect x="50" y="50" width="700" height="250" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">CompletableFuture&lt;T&gt;</text>

    {/* result field */}
    <rect x="80" y="100" width="160" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="160" y="122" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">volatile Object result</text>
    <text x="160" y="138" textAnchor="middle" fill="white" fontSize="8">null = incomplete</text>
    <text x="160" y="150" textAnchor="middle" fill="white" fontSize="8">value or AltResult</text>

    {/* stack field */}
    <rect x="80" y="180" width="160" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="160" y="202" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">volatile Completion</text>
    <text x="160" y="218" textAnchor="middle" fill="white" fontSize="8">stack</text>
    <text x="160" y="230" textAnchor="middle" fill="white" fontSize="8">Linked list (LIFO)</text>

    {/* Completion types */}
    <rect x="280" y="100" width="460" height="180" rx="6" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="510" y="120" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Completion Types</text>

    <rect x="300" y="135" width="110" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="355" y="153" textAnchor="middle" fill="white" fontSize="9">UniApply</text>

    <rect x="420" y="135" width="110" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="475" y="153" textAnchor="middle" fill="white" fontSize="9">UniAccept</text>

    <rect x="540" y="135" width="110" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="595" y="153" textAnchor="middle" fill="white" fontSize="9">UniCompose</text>

    <rect x="300" y="175" width="110" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="355" y="193" textAnchor="middle" fill="white" fontSize="9">BiApply</text>

    <rect x="420" y="175" width="110" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="475" y="193" textAnchor="middle" fill="white" fontSize="9">BiAccept</text>

    <rect x="540" y="175" width="110" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="595" y="193" textAnchor="middle" fill="white" fontSize="9">OrApply</text>

    <rect x="300" y="215" width="110" height="30" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1"/>
    <text x="355" y="233" textAnchor="middle" fill="white" fontSize="9">UniHandle</text>

    <rect x="420" y="215" width="110" height="30" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1"/>
    <text x="475" y="233" textAnchor="middle" fill="white" fontSize="9">UniExceptionally</text>

    <rect x="540" y="215" width="110" height="30" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1"/>
    <text x="595" y="233" textAnchor="middle" fill="white" fontSize="9">UniWhenComplete</text>

    {/* Arrow from stack to completions */}
    <line x1="240" y1="210" x2="275" y2="210" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <text x="257" y="205" textAnchor="middle" fill="#94a3b8" fontSize="8">contains</text>
  </svg>
)

const CompletionFlowDiagram = () => (
  <svg viewBox="0 0 800 380" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Completion Pipeline Flow
    </text>

    {/* Step 1: supplyAsync */}
    <rect x="50" y="60" width="160" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="130" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">supplyAsync()</text>
    <text x="130" y="100" textAnchor="middle" fill="white" fontSize="9">Creates CF</text>
    <text x="130" y="115" textAnchor="middle" fill="white" fontSize="9">result = null</text>
    <text x="130" y="130" textAnchor="middle" fill="white" fontSize="9">Task submitted</text>

    {/* Arrow 1 */}
    <line x1="210" y1="100" x2="270" y2="100" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow2)"/>
    <text x="240" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">thenApply()</text>

    {/* Step 2: thenApply */}
    <rect x="270" y="60" width="160" height="80" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="350" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">thenApply()</text>
    <text x="350" y="100" textAnchor="middle" fill="white" fontSize="9">New CF created</text>
    <text x="350" y="115" textAnchor="middle" fill="white" fontSize="9">UniApply pushed</text>
    <text x="350" y="130" textAnchor="middle" fill="white" fontSize="9">to stack</text>

    {/* Arrow 2 */}
    <line x1="430" y1="100" x2="490" y2="100" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow2)"/>
    <text x="460" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">complete</text>

    {/* Step 3: Completion */}
    <rect x="490" y="60" width="160" height="80" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="570" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">complete(value)</text>
    <text x="570" y="100" textAnchor="middle" fill="white" fontSize="9">CAS set result</text>
    <text x="570" y="115" textAnchor="middle" fill="white" fontSize="9">Pop stack</text>
    <text x="570" y="130" textAnchor="middle" fill="white" fontSize="9">Fire completions</text>

    {/* Detailed stack visualization */}
    <rect x="50" y="170" width="700" height="180" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="195" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Stack-Based Completion Triggering</text>

    {/* Before completion */}
    <rect x="80" y="215" width="180" height="110" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#64748b" strokeWidth="1.5"/>
    <text x="170" y="235" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Before Completion</text>

    <rect x="100" y="245" width="140" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="170" y="262" textAnchor="middle" fill="white" fontSize="9">UniApply (fn3)</text>

    <rect x="100" y="275" width="140" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="170" y="292" textAnchor="middle" fill="white" fontSize="9">UniApply (fn2)</text>

    <rect x="100" y="305" width="140" height="10" rx="2" fill="#8b5cf6"/>
    <text x="135" y="313" textAnchor="middle" fill="white" fontSize="7">↓ next</text>

    {/* Arrow */}
    <line x1="260" y1="270" x2="320" y2="270" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow2)"/>
    <text x="290" y="262" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">complete()</text>

    {/* After completion */}
    <rect x="320" y="215" width="180" height="110" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#64748b" strokeWidth="1.5"/>
    <text x="410" y="235" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">After Completion</text>

    <rect x="340" y="250" width="140" height="25" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="410" y="267" textAnchor="middle" fill="white" fontSize="9">All fired ✓</text>

    <rect x="340" y="280" width="140" height="25" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="1"/>
    <text x="410" y="297" textAnchor="middle" fill="white" fontSize="9">stack = null</text>

    {/* Result flow */}
    <rect x="530" y="215" width="190" height="110" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#64748b" strokeWidth="1.5"/>
    <text x="625" y="235" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Result Propagation</text>

    <text x="625" y="255" textAnchor="middle" fill="#4ade80" fontSize="9">result = "data"</text>
    <text x="545" y="270" textAnchor="start" fill="#94a3b8" fontSize="8">1. fn2.apply("data") → "DATA"</text>
    <text x="545" y="285" textAnchor="start" fill="#94a3b8" fontSize="8">2. fn3.apply("DATA") → result</text>
    <text x="545" y="300" textAnchor="start" fill="#94a3b8" fontSize="8">3. Chain propagates forward</text>
  </svg>
)

const ExceptionHandlingDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
      <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Exception Propagation Pipeline
    </text>

    {/* Normal flow */}
    <rect x="50" y="60" width="120" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">supplyAsync</text>

    <line x1="170" y1="85" x2="215" y2="85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
    <text x="192" y="78" textAnchor="middle" fill="#ef4444" fontSize="8">exception</text>

    <rect x="215" y="60" width="120" height="50" rx="6" fill="#64748b" stroke="#94a3b8" strokeWidth="2"/>
    <text x="275" y="90" textAnchor="middle" fill="white" fontSize="10">thenApply</text>
    <text x="275" y="102" textAnchor="middle" fill="#94a3b8" fontSize="8">SKIPPED</text>

    <line x1="335" y1="85" x2="380" y2="85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>

    <rect x="380" y="60" width="120" height="50" rx="6" fill="#64748b" stroke="#94a3b8" strokeWidth="2"/>
    <text x="440" y="90" textAnchor="middle" fill="white" fontSize="10">thenApply</text>
    <text x="440" y="102" textAnchor="middle" fill="#94a3b8" fontSize="8">SKIPPED</text>

    <line x1="500" y1="85" x2="545" y2="85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>

    <rect x="545" y="60" width="120" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="605" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">exceptionally</text>
    <text x="605" y="102" textAnchor="middle" fill="white" fontSize="8">HANDLES</text>

    <line x1="665" y1="85" x2="710" y2="85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow3)"/>
    <text x="687" y="78" textAnchor="middle" fill="#22c55e" fontSize="8">recovery</text>

    <rect x="710" y="60" width="70" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="745" y="90" textAnchor="middle" fill="white" fontSize="10">✓</text>

    {/* Exception wrapper explanation */}
    <rect x="50" y="150" width="730" height="110" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="415" y="175" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Exception Wrapping & AltResult</text>

    <rect x="80" y="190" width="200" height="50" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="180" y="210" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">RuntimeException</text>
    <text x="180" y="225" textAnchor="middle" fill="#94a3b8" fontSize="8">Original exception</text>

    <line x1="280" y1="215" x2="320" y2="215" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
    <text x="300" y="208" textAnchor="middle" fill="#94a3b8" fontSize="8">wrap</text>

    <rect x="320" y="190" width="200" height="50" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="420" y="210" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">CompletionException</text>
    <text x="420" y="225" textAnchor="middle" fill="#94a3b8" fontSize="8">Wraps original</text>

    <line x1="520" y1="215" x2="560" y2="215" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
    <text x="540" y="208" textAnchor="middle" fill="#94a3b8" fontSize="8">store</text>

    <rect x="560" y="190" width="180" height="50" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="650" y="210" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">AltResult(ex)</text>
    <text x="650" y="225" textAnchor="middle" fill="#94a3b8" fontSize="8">result field value</text>
  </svg>
)

const AsyncExecutionDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Async vs Sync Execution
    </text>

    {/* Sync execution */}
    <rect x="50" y="60" width="320" height="90" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="210" y="85" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Sync: thenApply()</text>

    <rect x="80" y="100" width="100" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="130" y="120" textAnchor="middle" fill="white" fontSize="9">Complete CF</text>

    <line x1="180" y1="115" x2="210" y2="115" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow4)"/>

    <rect x="210" y="100" width="130" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1.5"/>
    <text x="275" y="120" textAnchor="middle" fill="white" fontSize="9">Run in same thread</text>

    {/* Async execution */}
    <rect x="430" y="60" width="320" height="90" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="590" y="85" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Async: thenApplyAsync()</text>

    <rect x="460" y="100" width="100" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="510" y="120" textAnchor="middle" fill="white" fontSize="9">Complete CF</text>

    <line x1="560" y1="115" x2="590" y2="115" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow4)"/>

    <rect x="590" y="100" width="130" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1.5"/>
    <text x="655" y="120" textAnchor="middle" fill="white" fontSize="9">Submit to executor</text>

    {/* Thread pools */}
    <rect x="50" y="180" width="700" height="80" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="205" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Default Executor: ForkJoinPool.commonPool()</text>

    <rect x="80" y="220" width="150" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="155" y="240" textAnchor="middle" fill="white" fontSize="9">supplyAsync()</text>

    <rect x="260" y="220" width="150" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="335" y="240" textAnchor="middle" fill="white" fontSize="9">thenApplyAsync()</text>

    <rect x="440" y="220" width="150" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="515" y="240" textAnchor="middle" fill="white" fontSize="9">thenRunAsync()</text>

    <rect x="620" y="220" width="100" height="30" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5"/>
    <text x="670" y="236" textAnchor="middle" fill="white" fontSize="8">Custom</text>
    <text x="670" y="246" textAnchor="middle" fill="white" fontSize="8">Executor</text>
  </svg>
)

const CombiningFuturesDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Combining Multiple CompletableFutures
    </text>

    {/* thenCombine */}
    <rect x="50" y="60" width="320" height="100" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="210" y="85" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">thenCombine - Wait for Both</text>

    <rect x="80" y="100" width="100" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="130" y="120" textAnchor="middle" fill="white" fontSize="9">CF&lt;User&gt;</text>

    <rect x="80" y="140" width="100" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1.5"/>
    <text x="130" y="160" textAnchor="middle" fill="white" fontSize="9">CF&lt;Orders&gt;</text>

    <line x1="180" y1="115" x2="220" y2="125" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow5)"/>
    <line x1="180" y1="155" x2="220" y2="145" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow5)"/>

    <rect x="220" y="120" width="120" height="40" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="280" y="140" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">thenCombine</text>
    <text x="280" y="152" textAnchor="middle" fill="white" fontSize="8">BiFunction</text>

    {/* anyOf */}
    <rect x="430" y="60" width="320" height="100" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="590" y="85" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">anyOf - First to Complete</text>

    <rect x="460" y="100" width="80" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="500" y="116" textAnchor="middle" fill="white" fontSize="8">CF1</text>

    <rect x="460" y="130" width="80" height="25" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1.5"/>
    <text x="500" y="146" textAnchor="middle" fill="white" fontSize="8">CF2</text>

    <line x1="540" y1="112" x2="600" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow5)"/>
    <line x1="540" y1="142" x2="600" y2="135" stroke="#64748b" strokeWidth="1" strokeDasharray="4,2"/>

    <rect x="600" y="115" width="100" height="35" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="650" y="136" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">anyOf()</text>

    {/* allOf */}
    <rect x="50" y="190" width="320" height="90" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="210" y="215" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">allOf - Wait for All</text>

    <rect x="80" y="230" width="60" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="110" y="246" textAnchor="middle" fill="white" fontSize="8">CF1</text>

    <rect x="150" y="230" width="60" height="25" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1.5"/>
    <text x="180" y="246" textAnchor="middle" fill="white" fontSize="8">CF2</text>

    <rect x="220" y="230" width="60" height="25" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5"/>
    <text x="250" y="246" textAnchor="middle" fill="white" fontSize="8">CF3</text>

    <line x1="280" y1="242" x2="310" y2="242" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow5)"/>

    <rect x="310" y="230" width="80" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="350" y="250" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">allOf()</text>

    {/* thenCompose */}
    <rect x="430" y="190" width="320" height="90" rx="8" fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" strokeWidth="2"/>
    <text x="590" y="215" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">thenCompose - Chain Dependent</text>

    <rect x="460" y="235" width="100" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="510" y="255" textAnchor="middle" fill="white" fontSize="9">CF&lt;UserId&gt;</text>

    <line x1="560" y1="250" x2="600" y2="250" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow5)"/>
    <text x="580" y="245" textAnchor="middle" fill="#f472b6" fontSize="8">compose</text>

    <rect x="600" y="235" width="100" height="30" rx="4" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="650" y="255" textAnchor="middle" fill="white" fontSize="9">CF&lt;User&gt;</text>
  </svg>
)

const CompletionMechanicsDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow6" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CAS-Based Completion Mechanics
    </text>

    {/* CAS Operation */}
    <rect x="50" y="60" width="320" height="100" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="210" y="85" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">CAS Result Setting (Atomic)</text>

    <rect x="80" y="100" width="120" height="40" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="140" y="118" textAnchor="middle" fill="white" fontSize="9">result = null</text>
    <text x="140" y="132" textAnchor="middle" fill="#94a3b8" fontSize="8">(incomplete)</text>

    <line x1="200" y1="120" x2="230" y2="120" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow6)"/>
    <text x="215" y="112" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">CAS</text>

    <rect x="230" y="100" width="120" height="40" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="290" y="118" textAnchor="middle" fill="white" fontSize="9">result = value</text>
    <text x="290" y="132" textAnchor="middle" fill="white" fontSize="8">(complete)</text>

    {/* postComplete flow */}
    <rect x="430" y="60" width="320" height="100" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="590" y="85" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">postComplete() Execution</text>

    <rect x="460" y="105" width="80" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="500" y="124" textAnchor="middle" fill="white" fontSize="8">Pop stack</text>

    <line x1="540" y1="120" x2="570" y2="120" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow6)"/>

    <rect x="570" y="105" width="80" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1.5"/>
    <text x="610" y="124" textAnchor="middle" fill="white" fontSize="8">tryFire()</text>

    <line x1="650" y1="120" x2="680" y2="120" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow6)"/>

    <rect x="680" y="105" width="50" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1.5"/>
    <text x="705" y="124" textAnchor="middle" fill="white" fontSize="8">Done</text>

    {/* Stack operation details */}
    <rect x="50" y="190" width="700" height="110" rx="8" fill="rgba(15, 23, 42, 0.5)" stroke="#334155" strokeWidth="2"/>
    <text x="400" y="215" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Stack Push/Pop Operations (Lock-Free)</text>

    {/* Push operation */}
    <rect x="80" y="235" width="300" height="50" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="230" y="253" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">push(Completion c)</text>
    <text x="230" y="268" textAnchor="middle" fill="#94a3b8" fontSize="8">c.next = stack</text>
    <text x="230" y="280" textAnchor="middle" fill="#94a3b8" fontSize="8">CAS(stack, old, c)</text>

    {/* Pop operation */}
    <rect x="420" y="235" width="300" height="50" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="570" y="253" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">pop() in postComplete()</text>
    <text x="570" y="268" textAnchor="middle" fill="#94a3b8" fontSize="8">h = stack</text>
    <text x="570" y="280" textAnchor="middle" fill="#94a3b8" fontSize="8">CAS(stack, h, h.next)</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function CompletableFutureInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'why-completablefuture',
      name: 'Why CompletableFuture?',
      icon: '⚡',
      color: '#3b82f6',
      description: 'Non-blocking asynchronous programming with fluent API. Solve the limitations of traditional Future with composition, exception handling, and callbacks.',
      diagram: ArchitectureOverviewDiagram,
      details: [
        {
          name: 'Problems with Future',
          explanation: 'Traditional Future has significant limitations: blocking get() method forces threads to wait, no way to chain operations, no built-in exception handling, cannot combine multiple futures, and no callbacks for completion. These issues make Future unsuitable for modern reactive applications.',
          codeExample: `// Traditional Future - BLOCKING
Future<String> future = executor.submit(() -> fetchData());
String result = future.get();  // BLOCKS until complete!
process(result);

// Problems:
// 1. Thread is blocked waiting
// 2. Cannot chain transformations
// 3. No exception handling
// 4. Cannot combine with other futures
// 5. No completion callbacks`
        },
        {
          name: 'CompletableFuture Benefits',
          explanation: 'CompletableFuture solves all Future limitations with non-blocking composition via thenApply and thenCompose, declarative exception handling with exceptionally and handle, ability to combine futures with allOf/anyOf/thenCombine, configurable async executors, and completion callbacks without blocking.',
          codeExample: `// CompletableFuture - NON-BLOCKING
CompletableFuture.supplyAsync(() -> fetchData())
    .thenApply(data -> transform(data))      // Chain transformation
    .thenAccept(result -> process(result))   // Consume result
    .exceptionally(ex -> handleError(ex));   // Handle errors

// Benefits:
// 1. No blocking - callbacks run when ready
// 2. Fluent chaining of operations
// 3. Built-in exception handling
// 4. Combine multiple futures easily
// 5. Configure thread pools`
        },
        {
          name: 'Combining Operations',
          explanation: 'CompletableFuture excels at combining multiple async operations. Use thenCombine to wait for two futures and merge results, allOf to wait for multiple futures, anyOf to get the first completed result, and thenCompose to chain dependent async operations.',
          codeExample: `// Combining multiple async operations
CompletableFuture<String> user = fetchUserAsync();
CompletableFuture<List<Order>> orders = fetchOrdersAsync();

// Combine two results
user.thenCombine(orders, (u, o) -> createReport(u, o))
    .thenAccept(report -> sendEmail(report));

// Wait for all to complete
CompletableFuture.allOf(future1, future2, future3)
    .thenRun(() -> System.out.println("All done!"));

// First to complete wins
CompletableFuture.anyOf(server1, server2, server3)
    .thenAccept(result -> process(result));`
        },
        {
          name: 'Interfaces Implemented',
          explanation: 'CompletableFuture implements two key interfaces: Future<T> which provides get(), isDone(), cancel() methods for checking and retrieving results; and CompletionStage<T> which provides all the composition methods like thenApply, thenCompose, thenCombine for building async pipelines.',
          codeExample: `// CompletableFuture implements two interfaces
public class CompletableFuture<T>
    implements Future<T>, CompletionStage<T> {

    // From Future<T>:
    T get() throws InterruptedException, ExecutionException;
    T get(long timeout, TimeUnit unit);
    boolean isDone();
    boolean cancel(boolean mayInterruptIfRunning);

    // From CompletionStage<T>:
    <U> CompletionStage<U> thenApply(Function<T,U> fn);
    <U> CompletionStage<U> thenCompose(Function<T,CF<U>> fn);
    CompletionStage<Void> thenAccept(Consumer<T> action);
    // ... 40+ composition methods
}`
        }
      ]
    },
    {
      id: 'internal-structure',
      name: 'Internal Structure',
      icon: '🏗️',
      color: '#22c55e',
      description: 'Lock-free design with CAS operations and stack-based completion tracking. Understand result field, AltResult wrapper, and completion stack.',
      diagram: ArchitectureOverviewDiagram,
      details: [
        {
          name: 'Key Fields',
          explanation: 'CompletableFuture uses two volatile fields: result (Object) stores the completion value or AltResult for exceptions/null, and stack (Completion) is a linked list of dependent actions. Both fields use CAS operations for thread-safe updates without locks.',
          codeExample: `// Simplified internal structure
public class CompletableFuture<T> {
    // Result field - volatile for visibility
    volatile Object result;  // null = incomplete

    // Stack of dependent completions
    volatile Completion stack;

    // Check if completed
    public boolean isDone() {
        return result != null;
    }

    // Complete with value
    public boolean complete(T value) {
        return completeValue(value);  // CAS on result
    }

    // Complete exceptionally
    public boolean completeExceptionally(Throwable ex) {
        return completeThrowable(ex);  // Wrap in AltResult
    }
}`
        },
        {
          name: 'State Representation',
          explanation: 'The result field uses null to mean incomplete, the actual value for normal completion, AltResult(null) for completed with null value (since null means incomplete), and AltResult(exception) for exceptional completion. This encoding allows distinguishing between incomplete and completed states.',
          codeExample: `// State representation in result field
volatile Object result;

// States:
// 1. result == null          → Not yet completed
// 2. result == actualValue   → Completed normally with value
// 3. result == AltResult(null) → Completed with null
// 4. result == AltResult(ex)   → Completed exceptionally

// Example state checks
if (result == null) {
    // Still running
} else if (result instanceof AltResult) {
    AltResult ar = (AltResult) result;
    if (ar.ex != null) {
        // Exceptional completion
    } else {
        // Null value completion
    }
} else {
    // Normal value completion
    T value = (T) result;
}`
        },
        {
          name: 'AltResult Wrapper',
          explanation: 'AltResult is a special wrapper class that holds exceptions and null values. It wraps null because null in the result field means incomplete. Exceptions are wrapped as CompletionException to distinguish them from null completions. This allows the result field to encode four states with a single field.',
          codeExample: `// AltResult wrapper class
static final class AltResult {
    final Throwable ex;  // null if result is null

    AltResult(Throwable x) {
        this.ex = x;
    }
}

// Usage examples
// 1. Complete with null
result = new AltResult(null);

// 2. Complete with exception
result = new AltResult(new CompletionException(ex));

// 3. Unwrapping on get()
Object r = result;
if (r instanceof AltResult) {
    Throwable x = ((AltResult)r).ex;
    if (x != null) {
        throw new CompletionException(x);
    }
    return null;  // Was null value
}
return (T) r;  // Normal value`
        },
        {
          name: 'Completion Stack',
          explanation: 'Dependent actions are stored as Completion nodes in a LIFO stack. Each node has a next pointer forming a linked list. When the future completes, all nodes are popped and triggered atomically using CAS operations. This lock-free design allows multiple threads to safely add completions.',
          codeExample: `// Completion stack structure
abstract static class Completion extends ForkJoinTask<Void> {
    volatile Completion next;  // Stack link

    abstract CompletableFuture<?> tryFire(int mode);
}

// Stack operations
volatile Completion stack;

// Push completion to stack
void push(Completion c) {
    do {
        c.next = stack;
    } while (!STACK.compareAndSet(this, c.next, c));
}

// Pop and fire all completions
void postComplete() {
    Completion h;
    while ((h = stack) != null) {
        if (STACK.compareAndSet(this, h, h.next)) {
            h.tryFire(NESTED);  // Trigger completion
        }
    }
}`
        }
      ]
    },
    {
      id: 'completion-pipeline',
      name: 'Completion Pipeline',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Pipeline of stages with UniApply, BiApply, OrApply completions. Each stage is a Completion subclass with different execution modes.',
      diagram: CompletionFlowDiagram,
      details: [
        {
          name: 'Uni Completions',
          explanation: 'Uni completions depend on one source: UniApply for thenApply (transform result), UniAccept for thenAccept (consume result), UniRun for thenRun (run action), UniCompose for thenCompose (flatMap), UniHandle for handle (both result and exception), UniWhenComplete for whenComplete (side effect), and UniExceptionally for exceptionally (recover from error).',
          codeExample: `// Uni completion types (single source)
// 1. UniApply - transform result
cf.thenApply(value -> value.toUpperCase())

// 2. UniAccept - consume result
cf.thenAccept(value -> System.out.println(value))

// 3. UniRun - run action (ignore result)
cf.thenRun(() -> cleanup())

// 4. UniCompose - chain another CF
cf.thenCompose(id -> fetchUser(id))

// 5. UniHandle - handle result or exception
cf.handle((result, ex) -> ex != null ? "error" : result)

// 6. UniWhenComplete - side effect
cf.whenComplete((result, ex) -> log.info("Done"))

// 7. UniExceptionally - recover from exception
cf.exceptionally(ex -> "default")`
        },
        {
          name: 'Bi Completions',
          explanation: 'Bi completions depend on two sources and complete when both are ready: BiApply for thenCombine (combine two results with BiFunction), BiAccept for thenAcceptBoth (consume both results), and BiRun for runAfterBoth (run action after both complete). Both sources must complete successfully before the Bi completion fires.',
          codeExample: `// Bi completion types (two sources)
CompletableFuture<String> cf1 = fetchUserAsync();
CompletableFuture<List<Order>> cf2 = fetchOrdersAsync();

// 1. BiApply - combine two results
cf1.thenCombine(cf2, (user, orders) -> {
    return new Report(user, orders);
})

// 2. BiAccept - consume both results
cf1.thenAcceptBoth(cf2, (user, orders) -> {
    System.out.println(user + ": " + orders.size());
})

// 3. BiRun - run after both complete
cf1.runAfterBoth(cf2, () -> {
    System.out.println("Both completed");
})`
        },
        {
          name: 'Or Completions',
          explanation: 'Or completions trigger on the first of two sources to complete: OrApply for applyToEither (apply function to first result), OrAccept for acceptEither (consume first result), and OrRun for runAfterEither (run after first completes). The completion uses whichever source finishes first, ignoring the slower one.',
          codeExample: `// Or completion types (first to complete)
CompletableFuture<String> server1 = fetchFromServer1();
CompletableFuture<String> server2 = fetchFromServer2();

// 1. OrApply - apply to first result
server1.applyToEither(server2, result -> {
    return result.toUpperCase();
})

// 2. OrAccept - consume first result
server1.acceptEither(server2, result -> {
    System.out.println("First: " + result);
})

// 3. OrRun - run after first completes
server1.runAfterEither(server2, () -> {
    System.out.println("One completed");
})`
        },
        {
          name: 'Execution Modes',
          explanation: 'Completions execute in different modes: SYNC (0) runs in the completing thread directly, ASYNC (1) submits to an executor for async execution, and NESTED (-1) is used internally to avoid stack overflow when chains are deep. The mode determines whether execution is immediate or scheduled.',
          codeExample: `// Execution modes in tryFire
static final int SYNC   = 0;  // Execute in completing thread
static final int ASYNC  = 1;  // Execute in executor
static final int NESTED = -1; // Internal nested call

// Example in UniApply
final CompletableFuture<V> tryFire(int mode) {
    CompletableFuture<V> d;
    CompletableFuture<T> a;
    Object r;
    Function<? super T, ? extends V> f;

    // Check if ready
    if ((a = src) == null || (r = a.result) == null
        || (d = dep) == null || (f = fn) == null)
        return null;

    // Check execution mode
    if (mode <= 0 && !claim())
        return null;  // Will retry async

    // Execute function
    try {
        d.completeValue(f.apply((T) r));
    } catch (Throwable ex) {
        d.completeThrowable(ex);
    }
    return d;
}`
        },
        {
          name: 'How thenApply Works',
          explanation: 'When thenApply is called, it creates a new CompletableFuture and a UniApply completion node. If the source is incomplete, UniApply is pushed to the stack to fire later. If already complete, the function executes immediately. On completion, tryFire extracts the result, applies the function, and completes the dependent future.',
          codeExample: `// thenApply internal implementation
public <U> CompletableFuture<U> thenApply(Function<T, U> fn) {
    return uniApplyStage(null, fn);  // null = sync executor
}

public <U> CompletableFuture<U> thenApplyAsync(Function<T, U> fn) {
    return uniApplyStage(defaultExecutor(), fn);
}

// UniApply completion node
static final class UniApply<T,V> extends UniCompletion<T,V> {
    Function<? super T, ? extends V> fn;

    UniApply(Executor e, CompletableFuture<V> dep,
             CompletableFuture<T> src, Function<T,V> fn) {
        super(e, dep, src);
        this.fn = fn;
    }

    final CompletableFuture<V> tryFire(int mode) {
        CompletableFuture<V> d;
        CompletableFuture<T> a;
        Object r;

        // Get source result
        if ((a = src) == null || (r = a.result) == null
            || (d = dep) == null || (fn) == null)
            return null;  // Not ready

        // Handle exception
        if (r instanceof AltResult) {
            Throwable x = ((AltResult)r).ex;
            if (x != null) {
                d.completeThrowable(x);
                return d;
            }
            r = null;  // Unwrap null
        }

        // Apply function
        try {
            d.completeValue(fn.apply((T) r));
        } catch (Throwable ex) {
            d.completeThrowable(ex);
        }
        return d;
    }
}`
        }
      ]
    },
    {
      id: 'async-execution',
      name: 'Async Execution',
      icon: '🚀',
      color: '#f59e0b',
      description: 'ForkJoinPool.commonPool() default executor, async method variants, and custom executors. Control which thread pool executes your code.',
      diagram: AsyncExecutionDiagram,
      details: [
        {
          name: 'Default Executor',
          explanation: 'CompletableFuture uses ForkJoinPool.commonPool() by default for async operations when parallelism > 1. If parallelism == 1, it uses ThreadPerTaskExecutor which creates a new thread per task. This default can be overridden by passing a custom executor to async method variants.',
          codeExample: `// Default executor selection
private static final Executor ASYNC_POOL = useCommonPool ?
    ForkJoinPool.commonPool() : new ThreadPerTaskExecutor();

// Using default executor (commonPool)
CompletableFuture.supplyAsync(() -> {
    // Runs in ForkJoinPool.commonPool()
    return expensiveOperation();
});

// Checking common pool parallelism
int parallelism = ForkJoinPool.commonPool().getParallelism();
// Typically: Runtime.getRuntime().availableProcessors() - 1`
        },
        {
          name: 'Custom Executors',
          explanation: 'Use custom executors for blocking operations, specific thread pool sizes, or different execution characteristics. All async methods have overloads accepting an Executor parameter. This is critical for IO-bound operations that would otherwise block the common pool.',
          codeExample: `// Using custom executor
ExecutorService ioPool = Executors.newFixedThreadPool(10);
ExecutorService cpuPool = Executors.newWorkStealingPool();

// IO-bound operation - use dedicated pool
CompletableFuture.supplyAsync(() -> {
    return blockingDatabaseCall();  // Won't block common pool
}, ioPool);

// CPU-bound operation - can use common pool or custom
CompletableFuture.supplyAsync(() -> {
    return cpuIntensiveCalculation();
}, cpuPool);

// Custom executor throughout chain
CompletableFuture.supplyAsync(() -> fetchData(), ioPool)
    .thenApplyAsync(data -> process(data), cpuPool)
    .thenApplyAsync(result -> save(result), ioPool);`
        },
        {
          name: 'Sync vs Async Methods',
          explanation: 'Non-async methods (thenApply, thenAccept) run in the completing thread, which could be your thread or a pool thread. Async variants (thenApplyAsync, thenAcceptAsync) always submit to an executor. Use async for long-running or blocking operations, sync for quick transformations.',
          codeExample: `// Sync vs Async execution
CompletableFuture<String> cf =
    CompletableFuture.supplyAsync(() -> "hello");

// SYNC - runs in thread that completes cf
// Could be your thread if cf already complete
cf.thenApply(s -> s.toUpperCase())
  .thenAccept(s -> System.out.println(s));

// ASYNC - always runs in executor
// Guaranteed to run in common pool (or custom)
cf.thenApplyAsync(s -> s.toUpperCase())
  .thenAcceptAsync(s -> System.out.println(s));

// ASYNC with custom executor
ExecutorService myPool = Executors.newCachedThreadPool();
cf.thenApplyAsync(s -> s.toUpperCase(), myPool)
  .thenAcceptAsync(s -> System.out.println(s), myPool);`
        },
        {
          name: 'When to Use Async',
          explanation: 'Use async variants when operations are long-running (> 1ms), blocking (IO, network, sleep), or need a specific thread pool. Sync methods are fine for quick transformations (< 1ms) or when you want to continue in the current thread. Async adds overhead but prevents blocking.',
          codeExample: `// GOOD: Quick transformation - use sync
cf.thenApply(s -> s.toUpperCase())       // < 1ms
  .thenApply(s -> s.substring(0, 10))    // < 1ms

// BAD: Blocking in common pool
CompletableFuture.supplyAsync(() -> {
    Thread.sleep(5000);  // Blocks pool thread!
    return result;
});

// GOOD: Blocking with dedicated pool
ExecutorService blockingPool =
    Executors.newCachedThreadPool();
CompletableFuture.supplyAsync(() -> {
    Thread.sleep(5000);  // OK - dedicated pool
    return result;
}, blockingPool);

// GOOD: CPU intensive with appropriate pool
CompletableFuture.supplyAsync(() -> {
    return heavyCalculation();  // CPU bound
});  // Common pool is work-stealing, good for CPU`
        }
      ]
    },
    {
      id: 'exception-handling',
      name: 'Exception Handling',
      icon: '⚠️',
      color: '#ef4444',
      description: 'CompletionException wrapping, exception propagation through pipeline, and recovery with exceptionally, handle, and whenComplete.',
      diagram: ExceptionHandlingDiagram,
      details: [
        {
          name: 'Exception Propagation',
          explanation: 'Exceptions automatically propagate through the pipeline, skipping all intermediate stages until reaching an exception handler. They are wrapped in CompletionException if not already. All downstream thenApply/thenAccept calls are skipped until exceptionally or handle is encountered.',
          codeExample: `// Exception propagation example
CompletableFuture.supplyAsync(() -> {
    throw new RuntimeException("Step 1 failed");
})
.thenApply(s -> s + " - step 2")   // SKIPPED
.thenApply(s -> s + " - step 3")   // SKIPPED
.thenApply(s -> s + " - step 4")   // SKIPPED
.exceptionally(ex -> {              // CALLED
    System.err.println("Caught: " + ex.getMessage());
    return "recovered";
})
.thenApply(s -> s + " - step 5");   // CALLED with "recovered"

// Result: "recovered - step 5"`
        },
        {
          name: 'exceptionally',
          explanation: 'exceptionally() is called only on exception and returns a recovery value. It receives the exception and must return a value of the same type. This allows providing fallback values or default behavior. The exception is unwrapped from CompletionException automatically.',
          codeExample: `// exceptionally - Recover from exception
CompletableFuture.supplyAsync(() -> {
    if (Math.random() > 0.5) {
        throw new RuntimeException("Failed");
    }
    return "success";
})
.exceptionally(ex -> {
    // Only called if exception occurred
    log.error("Error: " + ex.getMessage());
    return "default";  // Recovery value
})
.thenAccept(result -> {
    // Receives either "success" or "default"
    System.out.println(result);
});

// Conditional recovery
.exceptionally(ex -> {
    if (ex.getCause() instanceof IOException) {
        return retryOperation();
    } else if (ex.getCause() instanceof TimeoutException) {
        return getCachedValue();
    }
    throw new CompletionException(ex);  // Re-throw
});`
        },
        {
          name: 'handle',
          explanation: 'handle() is always called with both result and exception (one will be null). It can transform the result or recover from exception, and it always returns a value. This is more flexible than exceptionally because it handles both success and failure cases in one place.',
          codeExample: `// handle - Process both success and failure
CompletableFuture.supplyAsync(() -> fetchData())
.handle((result, ex) -> {
    if (ex != null) {
        log.error("Failed", ex);
        return "default";  // Recovery
    }
    return result.toUpperCase();  // Transform success
});

// handle is like combining thenApply + exceptionally
.handle((result, ex) -> {
    // ALWAYS called
    // result != null OR ex != null (not both)
    if (ex != null) {
        metrics.recordFailure();
        return fallbackValue();
    } else {
        metrics.recordSuccess();
        return processResult(result);
    }
});

// Convert exception to different type
CompletableFuture<String> cf = ...;
CompletableFuture<Response> response = cf.handle((result, ex) -> {
    if (ex != null) {
        return Response.error(ex.getMessage());
    }
    return Response.success(result);
});`
        },
        {
          name: 'whenComplete',
          explanation: 'whenComplete() is called for both success and failure but cannot transform the result - it is for side effects only. The result or exception passes through unchanged. Use it for logging, metrics, or cleanup operations that should not affect the pipeline result.',
          codeExample: `// whenComplete - Side effect without changing result
CompletableFuture.supplyAsync(() -> fetchData())
.whenComplete((result, ex) -> {
    // Called for both success and failure
    if (ex != null) {
        metrics.recordFailure();
        log.error("Failed", ex);
    } else {
        metrics.recordSuccess();
        log.info("Success: " + result);
    }
});  // Result/exception passes through unchanged

// Common use case: resource cleanup
CompletableFuture<Connection> connection = openConnection();
connection
    .thenCompose(conn -> fetchData(conn))
    .whenComplete((result, ex) -> {
        // Always close connection
        if (connection.isDone() && !connection.isCompletedExceptionally()) {
            connection.join().close();
        }
    });

// Logging without affecting pipeline
cf.whenComplete((result, ex) -> {
    log.info("Completed with: " +
        (ex != null ? "error" : result));
});  // Pipeline continues normally`
        },
        {
          name: 'Exception Unwrapping',
          explanation: 'Different methods unwrap exceptions differently: get() throws ExecutionException wrapping the cause, join() throws CompletionException wrapping the cause, and getNow() throws CompletionException. In exceptionally/handle, the exception is already unwrapped from CompletionException.',
          codeExample: `// Exception unwrapping in different methods
CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> {
    throw new IllegalArgumentException("Invalid");
});

// get() - throws ExecutionException
try {
    cf.get();
} catch (ExecutionException ex) {
    Throwable cause = ex.getCause();  // IllegalArgumentException
}

// join() - throws CompletionException (unchecked)
try {
    cf.join();
} catch (CompletionException ex) {
    Throwable cause = ex.getCause();  // IllegalArgumentException
}

// In exceptionally/handle - already unwrapped
cf.exceptionally(ex -> {
    // ex is CompletionException
    Throwable cause = ex.getCause();  // IllegalArgumentException
    return "recovered";
});

// Getting original exception
cf.handle((result, ex) -> {
    if (ex != null) {
        Throwable root = ex;
        while (root.getCause() != null) {
            root = root.getCause();
        }
        // root is original IllegalArgumentException
    }
    return result;
});`
        }
      ]
    },
    {
      id: 'combining-futures',
      name: 'Combining Futures',
      icon: '🔗',
      color: '#ec4899',
      description: 'Combine multiple async operations with thenCombine, allOf, anyOf, and thenCompose. Handle multiple sources and dependencies.',
      diagram: CombiningFuturesDiagram,
      details: [
        {
          name: 'thenCombine',
          explanation: 'thenCombine waits for two futures and combines their results using a BiFunction. Both futures must complete successfully. If either fails, the combined future fails. This is useful for parallel operations that need both results to proceed.',
          codeExample: `// thenCombine - Combine two results
CompletableFuture<String> userFuture = fetchUserAsync();
CompletableFuture<List<Order>> ordersFuture = fetchOrdersAsync();

// Wait for both and combine
CompletableFuture<Report> report = userFuture.thenCombine(
    ordersFuture,
    (user, orders) -> {
        // Both results available
        return new Report(user, orders);
    }
);

// Both futures run in parallel
long start = System.currentTimeMillis();
CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> {
    sleep(1000);  // 1 second
    return 10;
});
CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> {
    sleep(1000);  // 1 second
    return 20;
});
Integer result = future1.thenCombine(future2, (a, b) -> a + b).join();
long elapsed = System.currentTimeMillis() - start;
// elapsed ≈ 1000ms (parallel), not 2000ms (sequential)`
        },
        {
          name: 'thenCompose',
          explanation: 'thenCompose chains dependent async operations (flatMap). The function receives the first result and returns a new CompletableFuture. This prevents nested futures (CF<CF<T>>) and allows building sequential async pipelines where each step depends on the previous.',
          codeExample: `// thenCompose - FlatMap (chain dependent futures)
// WRONG: Results in CF<CF<User>>
CompletableFuture<CompletableFuture<User>> wrong =
    getUserIdAsync()
        .thenApply(id -> fetchUserAsync(id));

// RIGHT: Results in CF<User>
CompletableFuture<User> right =
    getUserIdAsync()
        .thenCompose(id -> fetchUserAsync(id));

// Chaining multiple dependent operations
CompletableFuture<Report> report = getUserIdAsync()
    .thenCompose(id -> fetchUserAsync(id))
    .thenCompose(user -> fetchOrdersAsync(user.getId()))
    .thenCompose(orders -> generateReportAsync(orders));

// Each step waits for previous to complete
// id → user → orders → report (sequential dependencies)`
        },
        {
          name: 'allOf',
          explanation: 'allOf waits for all futures to complete and returns CompletableFuture<Void>. It does not combine results automatically - you must call join() on each original future to get values. Use this when you need all operations to complete but want to collect results separately.',
          codeExample: `// allOf - Wait for all (returns Void)
CompletableFuture<String> cf1 = fetchAsync("url1");
CompletableFuture<String> cf2 = fetchAsync("url2");
CompletableFuture<String> cf3 = fetchAsync("url3");

// Wait for all to complete
CompletableFuture<Void> allDone = CompletableFuture.allOf(cf1, cf2, cf3);

// Then collect results
CompletableFuture<List<String>> allResults = allDone.thenApply(v -> {
    // All completed - safe to call join()
    return List.of(cf1.join(), cf2.join(), cf3.join());
});

// Pattern: Process list of futures
List<String> urls = List.of("url1", "url2", "url3");
List<CompletableFuture<String>> futures = urls.stream()
    .map(url -> fetchAsync(url))
    .collect(Collectors.toList());

// Wait for all
CompletableFuture<List<String>> results = CompletableFuture
    .allOf(futures.toArray(new CompletableFuture[0]))
    .thenApply(v -> futures.stream()
        .map(CompletableFuture::join)
        .collect(Collectors.toList()));`
        },
        {
          name: 'anyOf',
          explanation: 'anyOf completes when the first future completes and returns CompletableFuture<Object>. The result needs casting. Other futures continue running but their results are ignored. Use this for racing multiple sources or implementing timeouts.',
          codeExample: `// anyOf - First to complete
CompletableFuture<String> server1 = fetchFromServer1();
CompletableFuture<String> server2 = fetchFromServer2();
CompletableFuture<String> server3 = fetchFromServer3();

// Race - use fastest result
CompletableFuture<Object> fastest =
    CompletableFuture.anyOf(server1, server2, server3);

fastest.thenAccept(result -> {
    // Need to cast from Object
    String data = (String) result;
    process(data);
});

// Pattern: Timeout with anyOf
CompletableFuture<String> operation = longRunningOperation();
CompletableFuture<String> timeout = CompletableFuture.supplyAsync(() -> {
    sleep(5000);
    throw new TimeoutException("Timeout after 5s");
});

CompletableFuture<Object> result =
    CompletableFuture.anyOf(operation, timeout);
// Returns first to complete (success or timeout)`
        },
        {
          name: 'Complex Combinations',
          explanation: 'Combine multiple patterns for complex workflows. Use allOf for parallel independent operations, thenCompose for sequential dependencies, thenCombine for merging parallel results, and anyOf for racing or timeouts. Chain these to build sophisticated async pipelines.',
          codeExample: `// Complex combination patterns
// Pattern 1: Parallel then merge
CompletableFuture<UserProfile> profile = CompletableFuture.allOf(
    fetchBasicInfo(),
    fetchPreferences(),
    fetchHistory()
).thenApply(v -> new UserProfile(
    fetchBasicInfo().join(),
    fetchPreferences().join(),
    fetchHistory().join()
));

// Pattern 2: Sequential chain with error handling
CompletableFuture<Result> chain = getAuthToken()
    .thenCompose(token -> fetchDataWithAuth(token))
    .thenCompose(data -> processData(data))
    .thenCompose(processed -> saveResults(processed))
    .exceptionally(ex -> {
        log.error("Chain failed at: " + ex.getMessage());
        return fallbackResult();
    });

// Pattern 3: Parallel with different types
CompletableFuture<Report> report = fetchUser("id123")
    .thenCompose(user -> {
        CompletableFuture<List<Order>> orders = fetchOrders(user);
        CompletableFuture<Account> account = fetchAccount(user);
        return orders.thenCombine(account,
            (o, a) -> new Report(user, o, a));
    });`
        }
      ]
    },
    {
      id: 'completion-mechanics',
      name: 'Completion Mechanics',
      icon: '⚙️',
      color: '#06b6d4',
      description: 'CAS-based completion triggering, stack management, postComplete() flow, and tryFire() modes. Lock-free concurrency primitives.',
      diagram: CompletionMechanicsDiagram,
      details: [
        {
          name: 'CAS Operations',
          explanation: 'CompletableFuture uses Compare-And-Swap (CAS) for lock-free thread safety. Only one thread can successfully set the result via CAS. Multiple threads can try to complete, but only the first wins. This ensures atomic state transitions without locks or synchronized blocks.',
          codeExample: `// CAS-based result setting
final boolean completeValue(T t) {
    // Try to set result from null to value
    return RESULT.compareAndSet(this, null,
        (t == null) ? NIL : t);
}

final boolean completeThrowable(Throwable x) {
    // Try to set result from null to AltResult
    return RESULT.compareAndSet(this, null,
        new AltResult(x));
}

// Only one thread wins
CompletableFuture<String> cf = new CompletableFuture<>();
executor.submit(() -> cf.complete("A"));  // May win
executor.submit(() -> cf.complete("B"));  // May win
executor.submit(() -> cf.complete("C"));  // May win
// Only one complete() returns true
// Result is either "A", "B", or "C" (atomic)`
        },
        {
          name: 'Stack Push',
          explanation: 'Adding dependent completions uses CAS to push onto the stack. The new completion\'s next field points to the current head, then CAS atomically updates the head. This lock-free operation allows multiple threads to safely add completions concurrently.',
          codeExample: `// Lock-free stack push
final void push(Completion c) {
    Completion h;
    do {
        h = stack;           // Read current head
        c.next = h;          // Link to current head
    } while (!STACK.compareAndSet(this, h, c));  // CAS push
    // Retry if another thread modified stack between read and CAS
}

// Multiple threads can push concurrently
// Thread A: push(completionA)
// Thread B: push(completionB)
// Thread C: push(completionC)
// All succeed, stack grows atomically

// Stack state over time:
// null → completionA → completionB,completionA → completionC,completionB,completionA`
        },
        {
          name: 'postComplete Flow',
          explanation: 'When complete() is called, postComplete() atomically pops all completions from the stack and fires them. It uses CAS to pop the head, then calls tryFire() on each completion. This triggers the entire chain of dependent operations in one atomic sweep.',
          codeExample: `// Simplified postComplete() implementation
final void postComplete() {
    CompletableFuture<?> f = this;
    Completion h;

    // Process all completions on stack
    while ((h = f.stack) != null) {
        CompletableFuture<?> d;
        Completion t;

        // CAS pop from stack
        if (STACK.compareAndSet(f, h, t = h.next)) {
            if (t != null) {
                if (f != this) {
                    // Push back for later
                    pushStack(h);
                    continue;
                }
                NEXT.compareAndSet(h, t, null);  // Detach
            }

            // Fire the completion
            f = (d = h.tryFire(NESTED)) == null ? this : d;
        }
    }
}

// Example flow:
// 1. complete(value) → CAS sets result
// 2. postComplete() → pop stack
// 3. Each completion.tryFire(NESTED)
// 4. Each fires dependent futures
// 5. Chain reaction propagates`
        },
        {
          name: 'tryFire Modes',
          explanation: 'tryFire() has three modes: SYNC (0) executes directly in current thread, ASYNC (1) submits to executor for async execution, and NESTED (-1) is used internally to prevent stack overflow in deep chains. The mode controls whether execution is immediate or scheduled.',
          codeExample: `// tryFire execution modes
static final int SYNC   = 0;   // Direct execution
static final int ASYNC  = 1;   // Submit to executor
static final int NESTED = -1;  // Internal call to prevent stack overflow

// Example in UniApply
final CompletableFuture<V> tryFire(int mode) {
    CompletableFuture<V> d;
    CompletableFuture<T> a;

    // Check if ready
    if ((a = src) == null || (r = a.result) == null
        || (d = dep) == null)
        return null;

    // Mode-based execution
    if (mode <= 0 && !claim()) {
        // SYNC or NESTED: Try to claim for execution
        // If can't claim, return null to retry async
        return null;
    }

    if (mode < 0) {
        // NESTED: Direct inline execution
        // Prevents deep recursion
    } else if (mode > 0) {
        // ASYNC: Will be submitted to executor
    } else {
        // SYNC: Execute now if claimed
    }

    // Execute the function
    try {
        d.completeValue(fn.apply((T) r));
    } catch (Throwable ex) {
        d.completeThrowable(ex);
    }
    return d;
}`
        },
        {
          name: 'Thread Safety',
          explanation: 'CompletableFuture is fully thread-safe using lock-free algorithms. Multiple threads can add completions, try to complete, or read results concurrently. CAS ensures only one thread sets the result. Volatile fields ensure visibility across threads without synchronized blocks.',
          codeExample: `// Thread safety demonstration
CompletableFuture<String> cf = new CompletableFuture<>();

// Multiple threads can safely interact
// Thread 1: Add completion
cf.thenApply(s -> s.toUpperCase());

// Thread 2: Add another completion
cf.thenAccept(s -> System.out.println(s));

// Thread 3: Try to complete
cf.complete("hello");  // Only succeeds once

// Thread 4: Try to complete (fails)
cf.complete("world");  // Returns false, already complete

// Thread 5: Read result
String result = cf.join();  // Returns "hello"

// All operations are thread-safe without locks
// volatile fields + CAS operations guarantee:
// 1. Only one completion succeeds
// 2. All completions fire exactly once
// 3. All readers see the result
// 4. No data races or lost updates`
        }
      ]
    },
    {
      id: 'timeouts-cancellation',
      name: 'Timeouts & Cancellation',
      icon: '⏱️',
      color: '#14b8a6',
      description: 'Java 9+ timeout methods (orTimeout, completeOnTimeout), cancellation behavior, and Java 8 timeout patterns.',
      details: [
        {
          name: 'orTimeout (Java 9+)',
          explanation: 'orTimeout completes the future exceptionally with TimeoutException after the specified duration. The underlying task continues running - this only affects when the future completes. Use exceptionally to provide a fallback value on timeout.',
          codeExample: `// Java 9+ orTimeout method
CompletableFuture<String> cf = fetchDataAsync();

// Fail with TimeoutException after 5 seconds
cf.orTimeout(5, TimeUnit.SECONDS)
  .exceptionally(ex -> {
      if (ex instanceof TimeoutException) {
          log.warn("Operation timed out");
          return "timeout default";
      }
      throw new CompletionException(ex);
  });

// Chain with other operations
getUserAsync()
    .orTimeout(2, TimeUnit.SECONDS)
    .thenCompose(user -> fetchOrdersAsync(user))
    .orTimeout(3, TimeUnit.SECONDS)
    .exceptionally(ex -> {
        return fallbackOrders();
    });`
        },
        {
          name: 'completeOnTimeout (Java 9+)',
          explanation: 'completeOnTimeout completes the future normally with a default value after the timeout. Unlike orTimeout, this does not create an exception - it provides a success result. The operation continues running in the background but its result is ignored.',
          codeExample: `// Java 9+ completeOnTimeout method
CompletableFuture<String> cf = fetchDataAsync();

// Complete with default value after timeout
cf.completeOnTimeout("default", 5, TimeUnit.SECONDS)
  .thenAccept(result -> {
      // result is either fetched data or "default"
      System.out.println(result);
  });

// Difference from orTimeout:
// orTimeout: completes exceptionally
cf.orTimeout(5, TimeUnit.SECONDS)
  .exceptionally(ex -> "default");

// completeOnTimeout: completes normally
cf.completeOnTimeout("default", 5, TimeUnit.SECONDS);

// Choose based on whether timeout is an error condition`
        },
        {
          name: 'Cancellation',
          explanation: 'cancel() completes the future exceptionally with CancellationException but does NOT interrupt the running task. The mayInterruptIfRunning parameter is ignored. The task continues executing in the background. Use isCancelled() to check if cancelled.',
          codeExample: `// Cancellation behavior
CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> {
    for (int i = 0; i < 10; i++) {
        if (Thread.interrupted()) {  // Won't be interrupted!
            return "interrupted";
        }
        sleep(1000);
    }
    return "completed";
});

// Cancel after 2 seconds
sleep(2000);
cf.cancel(true);  // mayInterruptIfRunning ignored!

// Check status
cf.isCancelled();              // true
cf.isCompletedExceptionally(); // true
cf.isDone();                   // true

// Trying to get result
try {
    cf.join();  // Throws CancellationException
} catch (CancellationException ex) {
    System.out.println("Was cancelled");
}

// The task STILL runs for full 10 seconds!`
        },
        {
          name: 'Java 8 Timeout Pattern',
          explanation: 'In Java 8 without orTimeout, implement timeout using ScheduledExecutor and applyToEither. Create a timeout future that completes exceptionally after delay, then race it against the operation using applyToEither to get whichever completes first.',
          codeExample: `// Java 8 timeout pattern
public static <T> CompletableFuture<T> withTimeout(
        CompletableFuture<T> future,
        long timeout, TimeUnit unit) {

    // Create timeout future
    CompletableFuture<T> timeoutFuture = new CompletableFuture<>();

    ScheduledExecutorService scheduler =
        Executors.newSingleThreadScheduledExecutor();

    // Schedule timeout
    scheduler.schedule(() -> {
        timeoutFuture.completeExceptionally(
            new TimeoutException("Timeout after " + timeout + " " + unit)
        );
    }, timeout, unit);

    // Race: future vs timeout
    return future.applyToEither(timeoutFuture, Function.identity())
        .whenComplete((result, ex) -> scheduler.shutdown());
}

// Usage
CompletableFuture<String> result = withTimeout(
    fetchDataAsync(),
    5, TimeUnit.SECONDS
).exceptionally(ex -> {
    if (ex.getCause() instanceof TimeoutException) {
        return "timed out";
    }
    throw new CompletionException(ex);
});`
        },
        {
          name: 'Timeout Best Practices',
          explanation: 'Always set timeouts for external operations (network, database). Use different timeout values for different SLA requirements. Consider using Failsafe or Resilience4j libraries for production timeout handling with retries and circuit breakers. Clean up resources in whenComplete.',
          codeExample: `// Best practices for timeouts
// 1. Different timeouts for different operations
CompletableFuture<User> user = fetchUserAsync()
    .orTimeout(500, TimeUnit.MILLISECONDS);  // Fast operation

CompletableFuture<Report> report = generateReportAsync()
    .orTimeout(30, TimeUnit.SECONDS);  // Slow operation

// 2. Timeout with retry
CompletableFuture<String> withRetry = fetchDataAsync()
    .orTimeout(5, TimeUnit.SECONDS)
    .exceptionally(ex -> {
        if (ex instanceof TimeoutException) {
            return fetchDataAsync()  // Retry once
                .orTimeout(5, TimeUnit.SECONDS)
                .exceptionally(ex2 -> "default")
                .join();
        }
        throw new CompletionException(ex);
    });

// 3. Resource cleanup with timeout
CompletableFuture<String> result = openConnectionAsync()
    .thenCompose(conn ->
        fetchDataAsync(conn)
            .orTimeout(10, TimeUnit.SECONDS)
            .whenComplete((res, ex) -> conn.close())
    );

// 4. Using Resilience4j (production)
TimeLimiter timeLimiter = TimeLimiter.of(Duration.ofSeconds(5));
Supplier<CompletableFuture<String>> supplier =
    () -> fetchDataAsync();
CompletableFuture<String> limited =
    timeLimiter.executeCompletionStage(scheduler, supplier)
        .toCompletableFuture();`
        }
      ]
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      icon: '✅',
      color: '#10b981',
      description: 'Production patterns: custom executors for blocking ops, exception handling, avoiding common pitfalls, and thread safety considerations.',
      details: [
        {
          name: 'Custom Executors',
          explanation: 'Never block the common pool with IO operations. Use dedicated thread pools for blocking operations (IO, network, database). Use CPU pools for compute-intensive tasks. Configure pool sizes based on workload: unbounded for IO, fixed for CPU.',
          codeExample: `// DON'T: Block common pool with IO
CompletableFuture.supplyAsync(() -> {
    return blockingDatabaseCall();  // BAD! Blocks pool thread
});

// DO: Use dedicated IO executor
ExecutorService ioPool = Executors.newCachedThreadPool();
CompletableFuture.supplyAsync(() -> {
    return blockingDatabaseCall();
}, ioPool);

// Executor configuration patterns
// 1. IO-bound: Unbounded threads (cached pool)
ExecutorService ioExecutor = Executors.newCachedThreadPool();

// 2. CPU-bound: Fixed threads = num cores
int cores = Runtime.getRuntime().availableProcessors();
ExecutorService cpuExecutor = Executors.newFixedThreadPool(cores);

// 3. Mixed workload: Separate pools
CompletableFuture.supplyAsync(() -> fetchData(), ioExecutor)
    .thenApplyAsync(data -> processData(data), cpuExecutor)
    .thenApplyAsync(result -> saveData(result), ioExecutor);`
        },
        {
          name: 'Exception Handling',
          explanation: 'Always handle exceptions - unhandled exceptions are lost. Use exceptionally for recovery, handle for both cases, and whenComplete for side effects. Log exceptions and provide fallbacks. Never ignore errors in production code.',
          codeExample: `// DON'T: Ignore exceptions
CompletableFuture.supplyAsync(() -> riskyOperation());  // Lost!

// DO: Always handle exceptions
CompletableFuture.supplyAsync(() -> riskyOperation())
    .exceptionally(ex -> {
        log.error("Operation failed", ex);
        metrics.recordFailure();
        return fallbackValue();
    });

// Pattern: Centralized error handling
private <T> CompletableFuture<T> withErrorHandling(
        CompletableFuture<T> future) {
    return future.whenComplete((result, ex) -> {
        if (ex != null) {
            log.error("Operation failed", ex);
            metrics.recordFailure();
            alerting.sendAlert(ex);
        } else {
            metrics.recordSuccess();
        }
    });
}

// Usage
withErrorHandling(fetchDataAsync())
    .thenApply(data -> process(data));`
        },
        {
          name: 'thenApply vs thenCompose',
          explanation: 'Use thenApply for transformations that return values (map). Use thenCompose for operations that return CompletableFuture (flatMap). Mixing them up creates nested futures or blocks threads. This is the most common CompletableFuture mistake.',
          codeExample: `// DON'T: Use thenApply for async operations
cf.thenApply(id -> fetchUser(id).join())  // BLOCKS!

// DON'T: Creates nested CF<CF<User>>
CompletableFuture<CompletableFuture<User>> nested =
    cf.thenApply(id -> fetchUser(id));

// DO: Use thenCompose for async operations
cf.thenCompose(id -> fetchUser(id))  // Flattens to CF<User>

// Rule of thumb:
// - Function returns value → thenApply
cf.thenApply(s -> s.toUpperCase())         // String → String

// - Function returns CF → thenCompose
cf.thenCompose(id -> fetchAsync(id))       // Id → CF<User>

// Chaining pattern
getUserIdAsync()
    .thenCompose(id -> fetchUserAsync(id))       // Id → CF<User>
    .thenApply(user -> user.getName())           // User → String
    .thenCompose(name -> fetchDetailAsync(name)) // String → CF<Detail>
    .thenApply(detail -> detail.toJson());       // Detail → Json`
        },
        {
          name: 'Avoiding Callback Hell',
          explanation: 'Prevent deeply nested callbacks by using allOf for parallel operations, extracting methods for complex chains, and using handle for error handling at each level. Keep chains shallow and readable. Consider using intermediate variables.',
          codeExample: `// DON'T: Pyramid of doom
cf1.thenCompose(r1 ->
    cf2.thenCompose(r2 ->
        cf3.thenCompose(r3 ->
            cf4.thenApply(r4 ->
                combine(r1, r2, r3, r4)))));

// DO: Use allOf for parallel operations
CompletableFuture<Result> combined = CompletableFuture
    .allOf(cf1, cf2, cf3, cf4)
    .thenApply(v -> combine(
        cf1.join(), cf2.join(), cf3.join(), cf4.join()
    ));

// DO: Extract methods
private CompletableFuture<Step2> processStep1(Input input) {
    return cf1.thenCompose(r1 -> cf2.thenApply(r2 -> new Step2(r1, r2)));
}

private CompletableFuture<Result> processStep2(Step2 step2) {
    return cf3.thenCompose(r3 -> cf4.thenApply(r4 -> combine(step2, r3, r4)));
}

// Usage
processStep1(input)
    .thenCompose(step2 -> processStep2(step2));`
        },
        {
          name: 'Testing Patterns',
          explanation: 'Use manual completion for testing: create CompletableFuture, complete it manually with complete() or completeExceptionally(). Test error paths with obtrudeException(). Use obtrudeValue() to force completion for testing edge cases.',
          codeExample: `// Testing with manual completion
@Test
public void testAsyncOperation() {
    // Create CF that we control
    CompletableFuture<String> mockFuture = new CompletableFuture<>();

    // Inject into system under test
    MyService service = new MyService(mockFuture);
    CompletableFuture<Result> result = service.process();

    // CF is incomplete
    assertFalse(result.isDone());

    // Complete manually
    mockFuture.complete("test data");

    // Now result completes
    assertTrue(result.isDone());
    assertEquals("processed test data", result.join());
}

@Test
public void testErrorHandling() {
    CompletableFuture<String> mockFuture = new CompletableFuture<>();
    MyService service = new MyService(mockFuture);

    // Test exception path
    mockFuture.completeExceptionally(new IOException("test error"));

    CompletableFuture<Result> result = service.process();
    assertTrue(result.isCompletedExceptionally());
}

// Force completion for edge cases
@Test
public void testOverwrite() {
    CompletableFuture<String> cf = new CompletableFuture<>();
    cf.complete("original");

    // Force overwrite (testing only!)
    cf.obtrudeValue("forced");
    assertEquals("forced", cf.join());
}`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '💡',
      color: '#f97316',
      description: 'Common technical interview questions about CompletableFuture: Future comparison, method differences, thread safety, and patterns.',
      details: [
        {
          name: 'Future vs CompletableFuture',
          explanation: 'Q: What are the main differences between Future and CompletableFuture? A: Future has blocking get(), no chaining, no composition, and no exception handling. CompletableFuture provides non-blocking callbacks, fluent API for chaining, combinators for composition, and declarative exception handling.',
          codeExample: `// Q: Future vs CompletableFuture?
// Future - blocking, limited API
Future<String> future = executor.submit(() -> compute());
String result = future.get();  // BLOCKS thread
process(result);

// Problems with Future:
// 1. Blocking get() - thread waits
// 2. No chaining - can't transform result
// 3. No composition - can't combine futures
// 4. No callbacks - must poll or block
// 5. Limited error handling

// CompletableFuture - non-blocking, rich API
CompletableFuture.supplyAsync(() -> compute())
    .thenApply(r -> transform(r))    // Chain transformations
    .thenCombine(other, (a,b) -> merge(a,b))  // Combine futures
    .thenAccept(r -> process(r))     // Non-blocking callback
    .exceptionally(ex -> handle(ex));  // Error handling

// Key improvements:
// 1. Non-blocking - callbacks when ready
// 2. Fluent API - chain operations
// 3. Combinators - allOf, anyOf, thenCombine
// 4. Exception handling - exceptionally, handle
// 5. Manual completion - complete(), completeExceptionally()`
        },
        {
          name: 'thenApply vs thenCompose',
          explanation: 'Q: When do you use thenApply vs thenCompose? A: Use thenApply when the function returns a regular value (transform/map). Use thenCompose when the function returns a CompletableFuture (flatMap/chain). thenApply with CF-returning function creates nested CF<CF<T>>.',
          codeExample: `// Q: thenApply vs thenCompose?
// thenApply - for regular transformations (map)
// Function<T, U> - returns U
CompletableFuture<String> cf = getUserAsync();
cf.thenApply(user -> user.getName())      // User -> String
  .thenApply(name -> name.toUpperCase())  // String -> String

// thenCompose - for async operations (flatMap)
// Function<T, CF<U>> - returns CompletableFuture<U>
cf.thenCompose(user -> fetchOrdersAsync(user))  // User -> CF<Orders>
  .thenCompose(orders -> processAsync(orders))  // Orders -> CF<Result>

// WRONG: thenApply with async operation
CompletableFuture<CompletableFuture<Orders>> nested =
    cf.thenApply(user -> fetchOrdersAsync(user));  // Nested!

// RIGHT: thenCompose flattens
CompletableFuture<Orders> flat =
    cf.thenCompose(user -> fetchOrdersAsync(user));  // Flat!

// Rule:
// Returns value? → thenApply
// Returns CompletableFuture? → thenCompose`
        },
        {
          name: 'exceptionally vs handle',
          explanation: 'Q: What is the difference between exceptionally and handle? A: exceptionally is called only on exception and returns a recovery value. handle is always called with both result and exception (one is null) and can transform success or recover from failure.',
          codeExample: `// Q: exceptionally vs handle?
CompletableFuture<String> cf = fetchDataAsync();

// exceptionally - only called on exception
// Function<Throwable, T> - returns recovery value
cf.exceptionally(ex -> {
    // Only runs if exception
    log.error("Failed", ex);
    return "default";  // Recovery value
});

// handle - always called
// BiFunction<T, Throwable, U> - receives result OR exception
cf.handle((result, ex) -> {
    // ALWAYS runs
    if (ex != null) {
        // Exception case
        return "error: " + ex.getMessage();
    } else {
        // Success case
        return "success: " + result;
    }
});

// When to use:
// - exceptionally: For fallback values on error
// - handle: For converting both success/failure to common type
// - handle: When you need to inspect success result too

// Example: API response
cf.handle((result, ex) -> {
    if (ex != null) {
        return Response.error(ex.getMessage());
    }
    return Response.success(result);
});  // Always returns Response`
        },
        {
          name: 'Thread Safety & Executors',
          explanation: 'Q: Is CompletableFuture thread-safe? What executor does supplyAsync use? A: Yes, thread-safe using CAS operations. Result can only be set once atomically. supplyAsync uses ForkJoinPool.commonPool() by default, or ThreadPerTaskExecutor if parallelism == 1.',
          codeExample: `// Q: Is CompletableFuture thread-safe?
// Yes! Uses CAS (Compare-And-Swap) for lock-free safety
CompletableFuture<String> cf = new CompletableFuture<>();

// Multiple threads can safely interact
executor1.submit(() -> cf.complete("A"));  // May win
executor2.submit(() -> cf.complete("B"));  // May win
// Only one succeeds - atomic CAS operation

// Q: What executor does supplyAsync use?
// Default: ForkJoinPool.commonPool()
CompletableFuture.supplyAsync(() -> task());
// Runs in ForkJoinPool.commonPool()

// Parallelism = availableProcessors() - 1
int parallelism = ForkJoinPool.commonPool().getParallelism();

// If parallelism == 1: ThreadPerTaskExecutor
// Creates new thread per task

// Custom executor
ExecutorService myPool = Executors.newFixedThreadPool(10);
CompletableFuture.supplyAsync(() -> task(), myPool);

// Important: Don't block common pool!
// BAD
CompletableFuture.supplyAsync(() -> blockingIO());

// GOOD
ExecutorService ioPool = Executors.newCachedThreadPool();
CompletableFuture.supplyAsync(() -> blockingIO(), ioPool);`
        },
        {
          name: 'Cancellation & Manual Completion',
          explanation: 'Q: Does cancel() interrupt the running task? How do you manually complete a CF? A: cancel() does NOT interrupt the task - it only sets the result to CancellationException. The task continues running. Manual completion uses complete(value), completeExceptionally(ex), or obtrudeValue(value) for testing.',
          codeExample: `// Q: Does cancel() interrupt the task?
// NO! Task continues running
CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> {
    while (!Thread.interrupted()) {  // Won't be interrupted!
        doWork();
    }
    return "done";
});

cf.cancel(true);  // mayInterruptIfRunning ignored!
// CF is cancelled but task still runs

// Check cancellation
cf.isCancelled();              // true
cf.isCompletedExceptionally(); // true

// Q: How to manually complete?
CompletableFuture<String> cf = new CompletableFuture<>();

// 1. Normal completion
cf.complete("value");           // Returns true if successful
cf.complete("other");           // Returns false - already complete

// 2. Exceptional completion
cf.completeExceptionally(new IOException("error"));

// 3. Force completion (testing only!)
cf.obtrudeValue("forced");       // Overwrites existing result
cf.obtrudeException(new Ex());   // Overwrites existing exception

// Use case: Dependency injection for testing
public class MyService {
    private final CompletableFuture<Config> configFuture;

    public MyService(CompletableFuture<Config> config) {
        this.configFuture = config;
    }

    public CompletableFuture<Result> process() {
        return configFuture.thenApply(cfg -> doWork(cfg));
    }
}

// Test: control completion
CompletableFuture<Config> mockConfig = new CompletableFuture<>();
MyService service = new MyService(mockConfig);
mockConfig.complete(testConfig);  // Manual completion`
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
      { name: 'My Projects', icon: '📂', page: 'My Projects' },
      { name: 'CompletableFuture', icon: '⚡', page: 'CompletableFuture Internals' }
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
    background: 'linear-gradient(135deg, #4ade80, #22c55e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>CompletableFuture - Internal Workings</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Projects
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={COMPLETABLEFUTURE_COLORS}
        />
      </div>

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
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu}
              colors={COMPLETABLEFUTURE_COLORS}
            />

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

            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
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

                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

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

export default CompletableFutureInternals

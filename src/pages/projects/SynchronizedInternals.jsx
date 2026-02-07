/**
 * Synchronized Internals - Deep dive into Java's synchronized keyword
 *
 * Covers: object monitors, lock inflation, biased locking, wait/notify, and interview questions
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const SYNCHRONIZED_COLORS = {
  primary: '#ef4444',
  primaryHover: '#f87171',
  bg: 'rgba(239, 68, 68, 0.1)',
  border: 'rgba(239, 68, 68, 0.3)',
  arrow: '#dc2626',
  hoverBg: 'rgba(239, 68, 68, 0.2)',
  topicBg: 'rgba(239, 68, 68, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const MonitorLockDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Synchronized Block Execution Flow
    </text>

    {/* Thread */}
    <rect x="50" y="60" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread</text>

    {/* Acquire Monitor */}
    <rect x="200" y="60" width="130" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="265" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Acquire</text>
    <text x="265" y="98" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Monitor</text>

    {/* Critical Section */}
    <rect x="380" y="60" width="130" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="445" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Critical</text>
    <text x="445" y="98" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Section</text>

    {/* Release Monitor */}
    <rect x="560" y="60" width="130" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="625" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Release</text>
    <text x="625" y="98" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Monitor</text>

    {/* Arrows */}
    <line x1="150" y1="85" x2="195" y2="85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
    <line x1="330" y1="85" x2="375" y2="85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
    <line x1="510" y1="85" x2="555" y2="85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>

    {/* Object with Monitor */}
    <rect x="300" y="140" width="200" height="60" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="165" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Java Object</text>
    <text x="400" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">Monitor + Wait Set</text>

    {/* Dashed connection */}
    <line x1="265" y1="110" x2="350" y2="140" stroke="#ef4444" strokeWidth="1" strokeDasharray="4"/>
    <line x1="625" y1="110" x2="450" y2="140" stroke="#ef4444" strokeWidth="1" strokeDasharray="4"/>
  </svg>
)

const ObjectHeaderDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowRed2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Object Header - Mark Word Layout (64-bit JVM)
    </text>

    {/* Mark Word box */}
    <rect x="100" y="50" width="600" height="40" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Mark Word (64 bits)</text>

    {/* Unlocked state */}
    <rect x="100" y="110" width="600" height="35" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="115" y="132" fill="#4ade80" fontSize="10" fontWeight="bold">Unlocked:</text>
    <text x="200" y="132" fill="#94a3b8" fontSize="9">unused:25 | hash:31 | unused:1 | age:4 | 01</text>

    {/* Biased state */}
    <rect x="100" y="150" width="600" height="35" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="115" y="172" fill="#60a5fa" fontSize="10" fontWeight="bold">Biased:</text>
    <text x="200" y="172" fill="#94a3b8" fontSize="9">thread:54 | epoch:2 | unused:1 | age:4 | 101</text>

    {/* Thin Lock state */}
    <rect x="100" y="190" width="600" height="35" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="115" y="212" fill="#fbbf24" fontSize="10" fontWeight="bold">Thin Lock:</text>
    <text x="200" y="212" fill="#94a3b8" fontSize="9">ptr to lock record (on thread stack) | 00</text>

    {/* Fat Lock state */}
    <rect x="100" y="230" width="600" height="35" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="115" y="252" fill="#f87171" fontSize="10" fontWeight="bold">Fat Lock:</text>
    <text x="200" y="252" fill="#94a3b8" fontSize="9">ptr to ObjectMonitor (heap allocated) | 10</text>

    {/* GC Mark state */}
    <rect x="100" y="270" width="600" height="25" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="115" y="287" fill="#a78bfa" fontSize="10" fontWeight="bold">GC Mark:</text>
    <text x="200" y="287" fill="#94a3b8" fontSize="9">forwarding address / mark bits | 11</text>
  </svg>
)

const LockInflationDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowRed3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Lock Inflation (One-Way)
    </text>

    {/* Unlocked */}
    <rect x="50" y="60" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="110" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Unlocked</text>

    {/* Biased */}
    <rect x="220" y="60" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="280" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Biased</text>

    {/* Thin */}
    <rect x="390" y="60" width="120" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="450" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thin Lock</text>

    {/* Fat */}
    <rect x="560" y="60" width="120" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="620" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Fat Lock</text>

    {/* Arrows */}
    <line x1="170" y1="85" x2="215" y2="85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed3)"/>
    <line x1="340" y1="85" x2="385" y2="85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed3)"/>
    <line x1="510" y1="85" x2="555" y2="85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed3)"/>

    {/* Labels */}
    <text x="192" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">contention</text>
    <text x="362" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">revocation</text>
    <text x="532" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">spinning</text>

    {/* Bottom labels */}
    <text x="110" y="130" textAnchor="middle" fill="#4ade80" fontSize="9">No lock</text>
    <text x="280" y="130" textAnchor="middle" fill="#60a5fa" fontSize="9">Single thread</text>
    <text x="450" y="130" textAnchor="middle" fill="#fbbf24" fontSize="9">CAS + spin</text>
    <text x="620" y="130" textAnchor="middle" fill="#f87171" fontSize="9">OS mutex</text>

    {/* Note */}
    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="10" fontStyle="italic">
      Never deflates (in most JVMs)
    </text>
  </svg>
)

const BiasedLockDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Biased Locking Workflow
    </text>

    {/* Thread 1 first acquisition */}
    <rect x="50" y="50" width="140" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Thread 1</text>
    <text x="120" y="85" textAnchor="middle" fill="#bfdbfe" fontSize="8">First acquire</text>

    {/* CAS bias */}
    <rect x="220" y="50" width="120" height="45" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="280" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">CAS Bias</text>
    <text x="280" y="85" textAnchor="middle" fill="#bbf7d0" fontSize="8">Store Thread ID</text>

    {/* Thread 1 subsequent */}
    <rect x="370" y="50" width="140" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="440" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Thread 1</text>
    <text x="440" y="85" textAnchor="middle" fill="#bfdbfe" fontSize="8">Subsequent: No CAS!</text>

    {/* Thread 2 tries */}
    <rect x="50" y="120" width="140" height="45" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="120" y="140" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Thread 2</text>
    <text x="120" y="155" textAnchor="middle" fill="#fef3c7" fontSize="8">Tries to acquire</text>

    {/* Revocation */}
    <rect x="220" y="120" width="120" height="45" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="280" y="140" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Revocation</text>
    <text x="280" y="155" textAnchor="middle" fill="#fecaca" fontSize="8">Stop-the-world</text>

    {/* Inflate to thin */}
    <rect x="370" y="120" width="140" height="45" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="440" y="140" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Inflate</text>
    <text x="440" y="155" textAnchor="middle" fill="#ddd6fe" fontSize="8">to Thin Lock</text>

    {/* Arrows */}
    <line x1="190" y1="72" x2="215" y2="72" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
    <line x1="340" y1="72" x2="365" y2="72" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
    <line x1="190" y1="142" x2="215" y2="142" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed3)"/>
    <line x1="340" y1="142" x2="365" y2="142" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed3)"/>

    {/* Note */}
    <text x="620" y="85" fill="#64748b" fontSize="9">Deprecated: Java 15</text>
    <text x="620" y="100" fill="#64748b" fontSize="9">Removed: Java 18</text>
  </svg>
)

const ThinFatLockDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Thin Lock vs Fat Lock
    </text>

    {/* Thin Lock Section */}
    <text x="200" y="55" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Thin Lock (Lightweight)</text>

    <rect x="50" y="70" width="120" height="60" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="110" y="95" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Object</text>
    <text x="110" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Mark Word</text>

    <rect x="220" y="70" width="140" height="60" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="290" y="95" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Lock Record</text>
    <text x="290" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">(on thread stack)</text>

    <line x1="170" y1="100" x2="215" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowGreen)" style={{markerEnd: 'url(#arrowGreen)'}}/>
    <text x="192" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8">ptr</text>

    {/* Fat Lock Section */}
    <text x="600" y="55" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Fat Lock (Heavyweight)</text>

    <rect x="450" y="70" width="120" height="60" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="510" y="95" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Object</text>
    <text x="510" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Mark Word</text>

    <rect x="620" y="70" width="140" height="100" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="690" y="90" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">ObjectMonitor</text>
    <text x="690" y="110" textAnchor="middle" fill="#94a3b8" fontSize="8">_owner: Thread*</text>
    <text x="690" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8">_EntryList</text>
    <text x="690" y="140" textAnchor="middle" fill="#94a3b8" fontSize="8">_WaitSet</text>
    <text x="690" y="155" textAnchor="middle" fill="#94a3b8" fontSize="8">_count</text>

    <line x1="570" y1="100" x2="615" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed3)"/>
    <text x="592" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8">ptr</text>

    {/* Comparison */}
    <rect x="50" y="200" width="300" height="60" rx="6" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="200" y="220" textAnchor="middle" fill="#fbbf24" fontSize="10">CAS operations + spin waiting</text>
    <text x="200" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">Low overhead, good for short critical sections</text>

    <rect x="450" y="200" width="300" height="60" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1"/>
    <text x="600" y="220" textAnchor="middle" fill="#f87171" fontSize="10">OS mutex + kernel transitions</text>
    <text x="600" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">Higher overhead, threads blocked at OS level</text>
  </svg>
)

const WaitNotifyDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowPurple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      wait() / notify() Flow
    </text>

    {/* Monitor */}
    <rect x="280" y="50" width="240" height="180" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Object Monitor</text>

    {/* Entry List */}
    <rect x="300" y="90" width="90" height="50" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="345" y="115" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Entry List</text>
    <text x="345" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8">waiting to acquire</text>

    {/* Wait Set */}
    <rect x="410" y="90" width="90" height="50" rx="4" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="455" y="115" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Wait Set</text>
    <text x="455" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8">called wait()</text>

    {/* Owner */}
    <rect x="340" y="160" width="120" height="50" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="400" y="185" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Owner Thread</text>
    <text x="400" y="200" textAnchor="middle" fill="#94a3b8" fontSize="8">holds monitor</text>

    {/* Thread icons */}
    <rect x="100" y="100" width="60" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="130" y="120" textAnchor="middle" fill="white" fontSize="9">T1</text>
    <rect x="100" y="140" width="60" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="130" y="160" textAnchor="middle" fill="white" fontSize="9">T2</text>

    <rect x="640" y="100" width="60" height="30" rx="4" fill="#ec4899" stroke="#f472b6" strokeWidth="1"/>
    <text x="670" y="120" textAnchor="middle" fill="white" fontSize="9">T3</text>
    <rect x="640" y="140" width="60" height="30" rx="4" fill="#ec4899" stroke="#f472b6" strokeWidth="1"/>
    <text x="670" y="160" textAnchor="middle" fill="white" fontSize="9">T4</text>

    {/* Arrows */}
    <line x1="160" y1="120" x2="295" y2="115" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#arrowPurple)" strokeDasharray="4"/>
    <line x1="160" y1="155" x2="295" y2="125" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#arrowPurple)" strokeDasharray="4"/>
    <line x1="505" y1="115" x2="635" y2="115" stroke="#ec4899" strokeWidth="1" strokeDasharray="4"/>
    <line x1="505" y1="125" x2="635" y2="150" stroke="#ec4899" strokeWidth="1" strokeDasharray="4"/>

    {/* notify arrow */}
    <path d="M 455 145 Q 455 175 425 175" stroke="#4ade80" strokeWidth="2" fill="none" markerEnd="url(#arrowGreen)"/>
    <text x="470" y="165" fill="#4ade80" fontSize="8">notify()</text>
  </svg>
)

const InterviewDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Key Concepts Summary
    </text>

    {/* Instance vs Class lock */}
    <rect x="50" y="50" width="180" height="70" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Instance Lock</text>
    <text x="140" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">synchronized(this)</text>
    <text x="140" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">synchronized method</text>

    <rect x="260" y="50" width="180" height="70" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Class Lock</text>
    <text x="350" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">synchronized(Class.class)</text>
    <text x="350" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">static synchronized</text>

    <rect x="470" y="50" width="180" height="70" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="560" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Different Locks!</text>
    <text x="560" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Can run</text>
    <text x="560" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">simultaneously</text>

    {/* Spurious wakeup */}
    <rect x="50" y="140" width="300" height="45" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="160" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Always use WHILE with wait()</text>
    <text x="200" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">Guard against spurious wakeups</text>

    <rect x="380" y="140" width="300" height="45" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="530" y="160" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Prefer notifyAll() over notify()</text>
    <text x="530" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">Avoid missed signals</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function SynchronizedInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'how-synchronized-works',
      name: 'How synchronized Works',
      icon: '⚡',
      color: '#ef4444',
      description: 'Understanding the fundamentals of synchronized keyword, object monitors, and mutual exclusion in Java.',
      diagram: MonitorLockDiagram,
      details: [
        {
          name: 'Object Monitors',
          diagram: MonitorLockDiagram,
          explanation: 'Every Java object has an intrinsic lock called a monitor. The synchronized keyword acquires this monitor, ensuring only one thread can execute the critical section at a time. When a thread enters a synchronized block, it acquires the monitor; when it exits, it releases the monitor. If another thread tries to acquire a monitor already held, it blocks until the monitor is released.',
          codeExample: `// synchronized block
Object lock = new Object();
synchronized (lock) {
    // Only one thread can be here at a time
    // Holding lock's monitor
}

// synchronized method
class Counter {
    private int count = 0;

    public synchronized void increment() {
        // Locks on 'this' object
        count++;
    }

    public synchronized int getCount() {
        // Same lock as increment()
        return count;
    }
}`
        },
        {
          name: 'Static Synchronization',
          explanation: 'Static synchronized methods lock on the Class object, not an instance. This means all instances share the same lock for static synchronized methods. Instance and static synchronized methods use different locks, so they can run concurrently.',
          codeExample: `// static synchronized method
class StaticCounter {
    private static int count = 0;

    public static synchronized void increment() {
        // Locks on StaticCounter.class object
        count++;
    }
}

// Equivalent explicit locking:
synchronized (StaticCounter.class) {
    StaticCounter.count++;
}

// IMPORTANT: These are DIFFERENT locks!
class Example {
    public synchronized void instanceMethod() {
        // Locks on 'this'
    }

    public static synchronized void staticMethod() {
        // Locks on Example.class
    }
    // Both can run simultaneously!
}`
        },
        {
          name: 'Bytecode Instructions',
          explanation: 'At the bytecode level, synchronized blocks use monitorenter and monitorexit instructions. The compiler also adds a monitorexit in the exception handler to ensure the lock is released even if an exception occurs. This is why synchronized is safer than manual lock management.',
          codeExample: `// Java code:
synchronized (obj) {
    // critical section
}

// Compiles to bytecode (conceptually):
//
// monitorenter        // Acquire monitor
//   ... code ...
// monitorexit         // Release monitor (normal exit)
//
// Exception handler:
// monitorexit         // Release monitor (exception exit)
// athrow              // Re-throw exception

// javap -c output shows:
//  10: monitorenter
//  11: ... critical section ...
//  20: monitorexit
//  21: goto 29
//  24: astore_2       // exception handler
//  25: aload_1
//  26: monitorexit    // ensure release
//  27: aload_2
//  28: athrow`
        }
      ]
    },
    {
      id: 'object-monitor-internals',
      name: 'Object Monitor Internals',
      icon: '🔧',
      color: '#3b82f6',
      description: 'Deep dive into the Mark Word, object header layout, and how lock state is stored at the JVM level.',
      diagram: ObjectHeaderDiagram,
      details: [
        {
          name: 'Mark Word Layout',
          diagram: ObjectHeaderDiagram,
          explanation: 'The object header contains the Mark Word (64 bits on 64-bit JVM) which stores lock state, hash code, and GC age. The last 2-3 bits indicate the lock state: 01 for unlocked/biased, 00 for thin lock, 10 for fat lock, and 11 for GC marked. Understanding this layout helps explain why lock operations have different costs.',
          codeExample: `// Object header layout (64-bit JVM)
// ┌────────────────────────────────────────────────────────────┐
// │                    Mark Word (64 bits)                      │
// ├────────────────────────────────────────────────────────────┤
// │ Unlocked:  | unused:25 | hash:31 | unused:1 | age:4 | 01  │
// │ Biased:    | thread:54 | epoch:2 | unused:1 | age:4 | 101 │
// │ Thin Lock: |              ptr to lock record       | 00   │
// │ Fat Lock:  |           ptr to ObjectMonitor        | 10   │
// │ GC Mark:   |                                       | 11   │
// └────────────────────────────────────────────────────────────┘

// The tag bits (last 2-3 bits) determine interpretation:
// 01  = Unlocked or Biased (check bit 3)
// 00  = Thin/Lightweight lock
// 10  = Fat/Heavyweight lock (inflated)
// 11  = Marked for GC`
        },
        {
          name: 'ObjectMonitor Structure',
          explanation: 'When a lock is inflated to heavyweight, an ObjectMonitor is allocated on the heap. It contains the owner thread pointer, the entry list (threads waiting to acquire), the wait set (threads that called wait()), and a recursion count for reentrant locking. This structure enables all the functionality of synchronized including wait/notify.',
          codeExample: `// ObjectMonitor structure (C++ in HotSpot)
class ObjectMonitor {
    void* volatile _owner;      // Thread holding the lock
    volatile int _recursions;   // Recursion count (reentrant)

    ObjectWaiter* _EntryList;   // Threads trying to acquire
    ObjectWaiter* _cxq;         // Contention queue
    ObjectWaiter* _WaitSet;     // Threads in wait()

    volatile int _WaitSetLock;  // Protects WaitSet
    volatile int _count;        // Reference count

    // Statistics
    volatile int _waiters;      // Number of waiting threads
    void* _object;              // Back pointer to associated object
};

// ObjectWaiter is a node in linked lists
class ObjectWaiter {
    ObjectWaiter* _next;
    ObjectWaiter* _prev;
    Thread* _thread;
    volatile int _state;        // Waiting state
};`
        },
        {
          name: 'Lock Record',
          explanation: 'For thin/lightweight locks, a Lock Record is created on the thread\'s stack. The Mark Word is displaced (copied) into this record, and the object\'s Mark Word is updated to point to the Lock Record via CAS. This stack allocation makes thin locks very efficient compared to heap-allocated ObjectMonitors.',
          codeExample: `// Lock Record structure (on thread stack)
class BasicLock {
    markWord _displaced_header;  // Original Mark Word
};

// Thin lock acquisition process:
// 1. Allocate Lock Record on stack
// 2. Copy object's Mark Word to Lock Record
// 3. CAS: object.markWord = &lockRecord (with tag 00)
// 4. If CAS succeeds -> acquired!
// 5. If CAS fails -> spin or inflate

// Visual representation:
//
// Thread Stack:           Object Header:
// ┌─────────────┐         ┌─────────────┐
// │ Lock Record │ ←──────── Mark Word   │
// │ (displaced  │    ptr   │ (tag: 00)  │
// │  mark word) │         └─────────────┘
// └─────────────┘
//
// On unlock: restore displaced Mark Word to object`
        }
      ]
    },
    {
      id: 'biased-locking',
      name: 'Biased Locking',
      icon: '🎯',
      color: '#22c55e',
      description: 'Single-thread optimization that eliminates atomic operations when only one thread accesses a lock (deprecated in Java 15, removed in Java 18).',
      diagram: BiasedLockDiagram,
      details: [
        {
          name: 'Biased Lock Concept',
          diagram: BiasedLockDiagram,
          explanation: 'Biased locking is based on the observation that most locks are never contended - the same thread acquires the lock repeatedly. Once biased to a thread, subsequent acquisitions by that thread require only a comparison (no CAS). This significantly reduces locking overhead for single-threaded access patterns.',
          codeExample: `// Biased locking (deprecated in Java 15, removed in Java 18)
// JVM flags:
// -XX:+UseBiasedLocking     Enable (pre-Java 15)
// -XX:-UseBiasedLocking     Disable
// -XX:BiasedLockingStartupDelay=0  Start immediately (default 4s)

// How biased locking works:
// Thread 1:
synchronized (obj) {  // First time
    // Check: is obj biased?
    // No -> CAS to bias toward Thread 1
    // Mark Word now has Thread 1's ID
}

synchronized (obj) {  // Second time, same thread
    // Check: biased to me (Thread 1)?
    // Yes -> no CAS, just enter!
    // Super fast path!
}`
        },
        {
          name: 'Bias Revocation',
          explanation: 'When a second thread tries to acquire a biased lock, bias revocation occurs. This requires a safepoint (stop-the-world pause) to safely update the Mark Word. The lock is then "unbiased" and either given to the requesting thread or upgraded to a thin lock. This overhead is why biased locking is problematic.',
          codeExample: `// Bias revocation scenario:
// Thread 1 holds biased lock

// Thread 2 tries to acquire:
synchronized (obj) {
    // Check: biased to me?
    // No -> bias revocation needed!
    //
    // Revocation process:
    // 1. Request safepoint (all threads pause)
    // 2. Check if Thread 1 is still in synchronized block
    // 3. If yes: inflate to thin lock, both compete
    // 4. If no: either rebias to Thread 2 or unbias
    // 5. Resume all threads
}

// This is expensive because:
// - Safepoint = stop-the-world
// - All threads must reach safe state
// - Can cause latency spikes`
        },
        {
          name: 'Why Deprecated',
          explanation: 'Biased locking was deprecated in Java 15 and removed in Java 18. Modern hardware has very fast CAS operations, reducing the benefit. Cloud/container environments often have short-lived processes where startup delay matters. The complexity and revocation costs outweigh benefits in modern workloads.',
          codeExample: `// Why biased locking was removed:

// 1. Modern CPUs have fast CAS
//    - CAS latency: ~10-20 cycles
//    - Bias check: ~5 cycles
//    - Difference is negligible

// 2. Revocation is expensive
//    - Requires safepoint (STW pause)
//    - Can cause latency spikes
//    - Hard to predict when it happens

// 3. Cloud/containers
//    - Short-lived processes
//    - 4-second startup delay wastes time
//    - Multi-tenant = more contention

// 4. Maintenance burden
//    - Complex code in JVM
//    - Interacts poorly with other optimizations
//    - Debugging difficulties

// JEP 374: Deprecate (Java 15)
// JEP 374: Remove (Java 18)

// Use thin locks instead - almost as fast,
// no revocation overhead!`
        }
      ]
    },
    {
      id: 'thin-fat-locks',
      name: 'Thin and Fat Locks',
      icon: '🔒',
      color: '#f59e0b',
      description: 'Understanding lightweight CAS-based thin locks and heavyweight OS mutex-based fat locks, plus lock inflation.',
      diagram: ThinFatLockDiagram,
      details: [
        {
          name: 'Thin Locks',
          diagram: ThinFatLockDiagram,
          explanation: 'Thin (lightweight) locks use CAS operations and spin waiting. When a thread wants to acquire, it does a CAS to put its Lock Record pointer in the Mark Word. If contended, it spins briefly hoping the holder releases quickly. Thin locks are efficient for short critical sections with low contention.',
          codeExample: `// Thin lock acquisition algorithm:
boolean tryAcquire(Object obj) {
    // 1. Allocate Lock Record on stack
    LockRecord lr = new LockRecord();

    // 2. Copy current Mark Word
    lr.displacedHeader = obj.markWord;

    // 3. CAS to install Lock Record pointer
    if (CAS(obj.markWord, lr.displacedHeader, &lr | 00)) {
        return true;  // Success!
    }

    // 4. CAS failed - someone else has it
    // Spin and retry (adaptive spinning)
    for (int i = 0; i < SPIN_LIMIT; i++) {
        if (tryAgain(obj, lr)) return true;
        Thread.onSpinWait();  // CPU hint
    }

    // 5. Spinning didn't work - inflate to fat
    return inflateAndAcquire(obj);
}

// JVM tuning:
// -XX:PreBlockSpin=10  // Spin iterations before blocking`
        },
        {
          name: 'Fat Locks',
          explanation: 'Fat (heavyweight) locks allocate an ObjectMonitor on the heap and use OS-level synchronization primitives (mutex, condition variables). Threads waiting on a fat lock are blocked at the OS level, not spinning. This is more efficient for high contention but has higher overhead per operation.',
          codeExample: `// Fat lock uses OS primitives
// ObjectMonitor wraps platform mutex/condition

void ObjectMonitor::enter(Thread* current) {
    // Fast path: uncontended
    if (Atomic::cmpxchg(&_owner, NULL, current) == NULL) {
        return;  // Got it!
    }

    // Slow path: contention
    for (;;) {
        // Try spinning first (adaptive)
        if (trySpin(current)) return;

        // Add to entry list
        enqueue(current, &_EntryList);

        // Park thread (OS level block)
        current->park();  // syscall!

        // Woken up - try to acquire
        if (tryAcquire(current)) {
            dequeue(current, &_EntryList);
            return;
        }
    }
}

// park() on Linux uses futex
// park() on Windows uses WaitForSingleObject
// These involve kernel transitions (expensive)`
        },
        {
          name: 'Lock Inflation',
          diagram: LockInflationDiagram,
          explanation: 'Lock inflation is the one-way transition from thin to fat lock. It happens when: too many CAS failures occur (spinning threshold exceeded), wait()/notify() is called (requires ObjectMonitor), or hashCode() is called on a locked object (needs somewhere to store hash). Importantly, locks never deflate in most JVMs.',
          codeExample: `// Inflation triggers:

// 1. Contention threshold exceeded
for (int spin = 0; spin < threshold; spin++) {
    if (casAcquire()) return SUCCESS;
}
// Too many failures -> INFLATE

// 2. wait() or notify() called
synchronized (obj) {
    obj.wait();  // Requires ObjectMonitor!
    // Inflation happens before wait()
}

// 3. hashCode() on locked object
Object obj = new Object();
synchronized (obj) {
    obj.hashCode();  // Where to store hash?
    // Mark Word has lock ptr, not hash
    // Must inflate to store hash in ObjectMonitor
}

// Inflation process:
void inflate(Object obj) {
    // 1. Allocate ObjectMonitor
    ObjectMonitor* monitor = new ObjectMonitor();

    // 2. Copy displaced header
    monitor->header = getLockRecord(obj)->displaced;

    // 3. Update Mark Word to point to monitor
    obj.markWord = monitor | 10;  // tag = 10

    // 4. Set current thread as owner
    monitor->_owner = Thread.current();
}

// Note: deflation is complex, most JVMs skip it`
        }
      ]
    },
    {
      id: 'wait-notify',
      name: 'wait() and notify()',
      icon: '📡',
      color: '#8b5cf6',
      description: 'Thread coordination using wait sets - how threads communicate through object monitors.',
      diagram: WaitNotifyDiagram,
      details: [
        {
          name: 'wait() Mechanism',
          diagram: WaitNotifyDiagram,
          explanation: 'When a thread calls wait(), it releases the monitor and moves to the wait set. The thread remains blocked until notified. Upon notification, it moves to the entry list and must re-acquire the monitor before continuing. This is why wait() must be called inside synchronized.',
          codeExample: `// wait() implementation (conceptual)
void Object::wait() {
    // Must hold monitor!
    assert(currentThread == monitor.owner);

    // 1. Add self to wait set
    monitor.waitSet.add(currentThread);

    // 2. Save recursion count
    int savedRecursions = monitor.recursions;
    monitor.recursions = 0;

    // 3. Release monitor
    monitor.owner = null;
    monitor.notify();  // Wake up entry list threads

    // 4. Block until notified
    currentThread.parkUntilNotified();

    // 5. Re-acquire monitor (compete with others)
    monitor.acquire(currentThread);
    monitor.recursions = savedRecursions;
}

// Must be in synchronized block!
synchronized (obj) {
    while (!condition) {
        obj.wait();  // Releases lock, blocks
    }
    // Re-acquired lock here
}`
        },
        {
          name: 'notify() and notifyAll()',
          explanation: 'notify() moves ONE thread from wait set to entry list (which one is not specified). notifyAll() moves ALL threads from wait set to entry list. The notifying thread continues to hold the monitor - notified threads compete when the monitor is released. This is why notifyAll() is usually preferred.',
          codeExample: `// notify() - wake one thread
void Object::notify() {
    // Must hold monitor!
    assert(currentThread == monitor.owner);

    if (!monitor.waitSet.isEmpty()) {
        Thread* toWake = monitor.waitSet.removeOne();
        // Which one? Unspecified! JVM chooses.
        monitor.entryList.add(toWake);
        toWake.unpark();  // Make runnable
    }
    // Current thread KEEPS the monitor!
}

// notifyAll() - wake all threads
void Object::notifyAll() {
    while (!monitor.waitSet.isEmpty()) {
        Thread* toWake = monitor.waitSet.removeOne();
        monitor.entryList.add(toWake);
        toWake.unpark();
    }
    // All wake up, all compete for monitor
}

// Example showing why notifyAll() is safer:
synchronized (lock) {
    // Producer adds item
    queue.add(item);
    lock.notify();  // Wake ONE consumer
    // But what if we wake a sleeping producer?
    // Consumer stays asleep forever!
}

// Safe version:
synchronized (lock) {
    queue.add(item);
    lock.notifyAll();  // Wake everyone
    // Consumers check condition, proceed if queue not empty
    // Producers check condition, wait if queue full
}`
        },
        {
          name: 'Spurious Wakeups',
          explanation: 'Threads can wake up without being notified (spurious wakeup). This is allowed by the JVM spec because it simplifies implementation. Always use a while loop around wait() to re-check the condition. Using if instead of while is a common bug that causes subtle race conditions.',
          codeExample: `// WRONG - using if with wait()
synchronized (lock) {
    if (queue.isEmpty()) {  // BAD!
        lock.wait();
    }
    // After wakeup, queue might still be empty!
    // 1. Spurious wakeup
    // 2. Another thread took the item
    item = queue.remove();  // Exception!
}

// CORRECT - using while with wait()
synchronized (lock) {
    while (queue.isEmpty()) {  // GOOD!
        lock.wait();
    }
    // Guaranteed: queue is not empty here
    item = queue.remove();  // Safe!
}

// Producer-Consumer pattern done right:
class BlockingQueue<E> {
    private final Queue<E> queue = new LinkedList<>();
    private final int capacity;

    public synchronized void put(E item) throws InterruptedException {
        while (queue.size() == capacity) {
            wait();  // Wait until space available
        }
        queue.add(item);
        notifyAll();  // Wake consumers
    }

    public synchronized E take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();  // Wait until item available
        }
        E item = queue.remove();
        notifyAll();  // Wake producers
        return item;
    }
}`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '💼',
      color: '#ec4899',
      description: 'Common interview questions about synchronized, monitors, and thread coordination with clear answers.',
      diagram: InterviewDiagram,
      details: [
        {
          name: 'Q: What is a Monitor?',
          diagram: InterviewDiagram,
          explanation: 'A monitor is the intrinsic lock associated with every Java object. It provides mutual exclusion - only one thread can hold an object\'s monitor at a time. The monitor also has a wait set for threads that called wait(). synchronized acquires and releases this monitor automatically.',
          codeExample: `// Q: What is a monitor in Java?

// A: Every Java object has an associated monitor (intrinsic lock).
// The monitor provides:
// 1. Mutual exclusion (only one holder)
// 2. Wait set (for wait/notify)

Object obj = new Object();

// Acquiring obj's monitor:
synchronized (obj) {
    // Only one thread can be here at a time
    // "Holding obj's monitor"
}

// Monitor components:
// - Owner: thread currently holding the lock
// - Entry List: threads waiting to acquire
// - Wait Set: threads that called wait()

// Monitor != Lock object
// Lock object is just a key, monitor is the mechanism`
        },
        {
          name: 'Q: Method vs Block?',
          explanation: 'A synchronized method locks on "this" (or Class object for static). A synchronized block can lock on any object. Block offers more control: smaller critical section, different objects for different operations. Method is simpler but locks entire method and only uses one lock.',
          codeExample: `// Q: Difference between synchronized method and block?

// Synchronized method - locks 'this'
public synchronized void method() {
    // Entire method is critical section
    // Lock is 'this' object
}

// Equivalent block:
public void method() {
    synchronized (this) {
        // Same behavior
    }
}

// Synchronized block advantages:
public void betterMethod() {
    // Non-synchronized work here

    synchronized (specificLock) {
        // Only this part is synchronized
        // Can use different locks for different data
    }

    // More non-synchronized work
}

// Example: separate locks for separate data
class BankAccount {
    private final Object balanceLock = new Object();
    private final Object historyLock = new Object();

    public void transfer(int amount) {
        synchronized (balanceLock) {
            // Update balance
        }
        synchronized (historyLock) {
            // Log transaction
        }
        // More parallelism possible!
    }
}`
        },
        {
          name: 'Q: Lock States?',
          explanation: 'Lock states from lightest to heaviest: Unlocked (no lock), Biased (single thread optimization, deprecated), Thin/Lightweight (CAS + spinning), Fat/Heavyweight (OS mutex). Locks inflate but never deflate. Understanding states helps with performance tuning.',
          codeExample: `// Q: What are the lock states in Java?

// Lock inflation progression:
// Unlocked -> Biased -> Thin -> Fat

// 1. UNLOCKED
// No thread holds the lock
// Mark Word: | hash | age | 01 |

// 2. BIASED (deprecated Java 15, removed Java 18)
// Optimized for single thread
// Mark Word: | thread ID | epoch | age | 101 |
// No CAS needed after first acquisition

// 3. THIN (Lightweight)
// Uses CAS and spinning
// Mark Word: | ptr to Lock Record | 00 |
// Good for low contention

// 4. FAT (Heavyweight)
// Uses OS mutex
// Mark Word: | ptr to ObjectMonitor | 10 |
// Threads blocked at kernel level

// Key insight: NEVER deflates (in most JVMs)
// Once inflated to fat, stays fat
// This is why object reuse can be problematic

// JVM flags for tuning:
// -XX:+UseBiasedLocking (pre-Java 15)
// -XX:BiasedLockingStartupDelay=0
// -XX:PreBlockSpin=10`
        },
        {
          name: 'Q: notify() vs notifyAll()?',
          explanation: 'notify() wakes one thread (unspecified which), notifyAll() wakes all threads. Use notifyAll() unless you\'re certain only one thread should proceed and any waiting thread can do the work. notify() can cause missed signals when multiple conditions are waited on.',
          codeExample: `// Q: When to use notify() vs notifyAll()?

// notify(): Wake ONE thread (which one? undefined!)
// notifyAll(): Wake ALL threads

// RULE: Default to notifyAll() unless:
// 1. All waiting threads wait for same condition
// 2. Only one thread can proceed anyway
// 3. You've carefully analyzed the code

// notify() danger example:
// 2 producers (P1, P2), 2 consumers (C1, C2)
// Single-slot buffer

// Initial: buffer empty, C1 and C2 waiting
// P1: puts item, notify() -> happens to wake P2
// P2: buffer full, waits
// Now: P1 done, P2 waiting, C1 waiting, C2 waiting
// No one to produce, no one waking consumers
// DEADLOCK!

// Safe pattern with notifyAll():
synchronized (buffer) {
    while (buffer.isFull()) {
        buffer.wait();
    }
    buffer.put(item);
    buffer.notifyAll();  // Wake everyone
    // Consumers check isEmpty(), proceed if not
    // Producers check isFull(), wait if so
}

// notify() is safe for single wait condition:
class Latch {
    private boolean released = false;

    public synchronized void release() {
        released = true;
        notify();  // OK: all threads wait for same thing
    }

    public synchronized void await() throws InterruptedException {
        while (!released) wait();
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
      { name: 'My Projects', icon: '📁', page: 'myProjects' },
      { name: 'Synchronized Internals', icon: '🔒', page: 'synchronizedInternals' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #450a0a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #f87171, #ef4444)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '0.5rem',
    color: '#f87171',
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
        <h1 style={titleStyle}>Synchronized Internals</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
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
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={SYNCHRONIZED_COLORS}
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
        primaryColor={SYNCHRONIZED_COLORS.primary}
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
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={SYNCHRONIZED_COLORS}
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

export default SynchronizedInternals

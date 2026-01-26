import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from '../../contexts/ThemeContext'
import Breadcrumb from '../../components/Breadcrumb'

// SVG Diagram Components

// Event Loop Diagram - Shows Task Queue -> Event Loop -> Execute -> Await -> Back to Queue
const EventLoopDiagram = () => (
  <svg viewBox="0 0 600 280" style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
    <defs>
      <linearGradient id="pythonBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3776ab" />
        <stop offset="100%" stopColor="#2d5f8a" />
      </linearGradient>
      <linearGradient id="pythonYellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffd43b" />
        <stop offset="100%" stopColor="#e6be35" />
      </linearGradient>
      <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4a90c2" />
        <stop offset="100%" stopColor="#3776ab" />
      </linearGradient>
      <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
      <marker id="arrowYellow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ffd43b" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="600" height="280" fill="#1f2937" rx="8" />

    {/* Title */}
    <text x="300" y="30" textAnchor="middle" fill="#f3f4f6" fontSize="16" fontWeight="bold">Python Event Loop</text>

    {/* Task Queue Box */}
    <rect x="30" y="70" width="120" height="80" rx="8" fill="url(#pythonBlueGradient)" />
    <text x="90" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Task Queue</text>
    <text x="90" y="125" textAnchor="middle" fill="#d1d5db" fontSize="10">Coroutines</text>
    <text x="90" y="140" textAnchor="middle" fill="#d1d5db" fontSize="10">waiting to run</text>

    {/* Event Loop Circle */}
    <circle cx="300" cy="110" r="55" fill="url(#loopGradient)" stroke="#ffd43b" strokeWidth="3" />
    <text x="300" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Event</text>
    <text x="300" y="120" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Loop</text>

    {/* Execute Box */}
    <rect x="450" y="70" width="120" height="80" rx="8" fill="url(#pythonYellowGradient)" />
    <text x="510" y="105" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">Execute</text>
    <text x="510" y="125" textAnchor="middle" fill="#374151" fontSize="10">Run coroutine</text>
    <text x="510" y="140" textAnchor="middle" fill="#374151" fontSize="10">until await</text>

    {/* Await/Suspend Box */}
    <rect x="240" y="190" width="120" height="60" rx="8" fill="url(#pythonBlueGradient)" />
    <text x="300" y="218" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Await</text>
    <text x="300" y="235" textAnchor="middle" fill="#d1d5db" fontSize="10">{`Suspend & wait`}</text>

    {/* Arrows */}
    {/* Queue to Loop */}
    <line x1="150" y1="110" x2="240" y2="110" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowBlue)" />
    <text x="195" y="100" textAnchor="middle" fill="#9ca3af" fontSize="9">pick next</text>

    {/* Loop to Execute */}
    <line x1="355" y1="110" x2="445" y2="110" stroke="#ffd43b" strokeWidth="2" markerEnd="url(#arrowYellow)" />
    <text x="400" y="100" textAnchor="middle" fill="#9ca3af" fontSize="9">run</text>

    {/* Execute to Await */}
    <path d="M 510 150 Q 510 220 365 220" stroke="#60a5fa" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />
    <text x="450" y="200" textAnchor="middle" fill="#9ca3af" fontSize="9">hit await</text>

    {/* Await back to Queue */}
    <path d="M 240 220 Q 90 220 90 155" stroke="#ffd43b" strokeWidth="2" fill="none" markerEnd="url(#arrowYellow)" />
    <text x="150" y="235" textAnchor="middle" fill="#9ca3af" fontSize="9">re-queue when ready</text>
  </svg>
)

// Coroutine Flow Diagram - Shows how coroutines pause and resume with await
const CoroutineFlowDiagram = () => (
  <svg viewBox="0 0 600 300" style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
    <defs>
      <linearGradient id="coroutineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3776ab" />
        <stop offset="100%" stopColor="#2d5f8a" />
      </linearGradient>
      <linearGradient id="awaitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffd43b" />
        <stop offset="100%" stopColor="#e6be35" />
      </linearGradient>
      <marker id="arrowDown" markerWidth="10" markerHeight="7" refX="5" refY="7" orient="auto">
        <polygon points="0 0, 10 0, 5 7" fill="#60a5fa" />
      </marker>
      <marker id="arrowRight" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="600" height="300" fill="#1f2937" rx="8" />

    {/* Title */}
    <text x="300" y="25" textAnchor="middle" fill="#f3f4f6" fontSize="16" fontWeight="bold">Coroutine Flow with await</text>

    {/* Timeline labels */}
    <text x="50" y="55" fill="#9ca3af" fontSize="11">Time</text>
    <line x1="50" y1="65" x2="50" y2="270" stroke="#4b5563" strokeWidth="1" strokeDasharray="4" />

    {/* Coroutine 1 lane */}
    <rect x="100" y="50" width="180" height="25" rx="4" fill="url(#coroutineGradient)" />
    <text x="190" y="67" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">async def fetch_user()</text>

    {/* Coroutine 1 execution blocks */}
    <rect x="100" y="85" width="60" height="35" rx="4" fill="#3776ab" />
    <text x="130" y="107" textAnchor="middle" fill="#ffffff" fontSize="9">Running</text>

    <rect x="160" y="85" width="50" height="35" rx="4" fill="url(#awaitGradient)" />
    <text x="185" y="100" textAnchor="middle" fill="#1f2937" fontSize="8" fontWeight="bold">await</text>
    <text x="185" y="112" textAnchor="middle" fill="#374151" fontSize="7">sleep(1)</text>

    {/* Suspended indicator */}
    <line x1="210" y1="102" x2="350" y2="102" stroke="#ffd43b" strokeWidth="2" strokeDasharray="6,3" />
    <text x="280" y="95" textAnchor="middle" fill="#ffd43b" fontSize="9">Suspended</text>

    <rect x="350" y="85" width="60" height="35" rx="4" fill="#3776ab" />
    <text x="380" y="107" textAnchor="middle" fill="#ffffff" fontSize="9">Resume</text>

    <rect x="410" y="85" width="50" height="35" rx="4" fill="#34d399" />
    <text x="435" y="107" textAnchor="middle" fill="#1f2937" fontSize="9">Done</text>

    {/* Coroutine 2 lane */}
    <rect x="100" y="140" width="180" height="25" rx="4" fill="url(#coroutineGradient)" />
    <text x="190" y="157" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">async def fetch_posts()</text>

    {/* Coroutine 2 execution blocks - runs during first's suspension */}
    <rect x="210" y="175" width="60" height="35" rx="4" fill="#3776ab" />
    <text x="240" y="197" textAnchor="middle" fill="#ffffff" fontSize="9">Running</text>

    <rect x="270" y="175" width="50" height="35" rx="4" fill="url(#awaitGradient)" />
    <text x="295" y="190" textAnchor="middle" fill="#1f2937" fontSize="8" fontWeight="bold">await</text>
    <text x="295" y="202" textAnchor="middle" fill="#374151" fontSize="7">db.query</text>

    <line x1="320" y1="192" x2="430" y2="192" stroke="#ffd43b" strokeWidth="2" strokeDasharray="6,3" />

    <rect x="430" y="175" width="60" height="35" rx="4" fill="#3776ab" />
    <text x="460" y="197" textAnchor="middle" fill="#ffffff" fontSize="9">Resume</text>

    <rect x="490" y="175" width="50" height="35" rx="4" fill="#34d399" />
    <text x="515" y="197" textAnchor="middle" fill="#1f2937" fontSize="9">Done</text>

    {/* Legend */}
    <rect x="100" y="240" width="15" height="15" rx="2" fill="#3776ab" />
    <text x="120" y="252" fill="#d1d5db" fontSize="10">Executing</text>

    <rect x="200" y="240" width="15" height="15" rx="2" fill="url(#awaitGradient)" />
    <text x="220" y="252" fill="#d1d5db" fontSize="10">Await point</text>

    <line x1="310" y1="247" x2="340" y2="247" stroke="#ffd43b" strokeWidth="2" strokeDasharray="4,2" />
    <text x="350" y="252" fill="#d1d5db" fontSize="10">Suspended</text>

    <rect x="430" y="240" width="15" height="15" rx="2" fill="#34d399" />
    <text x="450" y="252" fill="#d1d5db" fontSize="10">Completed</text>

    {/* Arrow showing concurrent execution */}
    <text x="300" y="285" textAnchor="middle" fill="#60a5fa" fontSize="11">Event loop switches to other coroutines during await</text>
  </svg>
)

// Async vs Sync Diagram - Sequential vs concurrent execution timelines
const AsyncVsSyncDiagram = () => (
  <svg viewBox="0 0 600 320" style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
    <defs>
      <linearGradient id="syncGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="asyncGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="task1Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3776ab" />
        <stop offset="100%" stopColor="#2d5f8a" />
      </linearGradient>
      <linearGradient id="task2Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffd43b" />
        <stop offset="100%" stopColor="#e6be35" />
      </linearGradient>
      <linearGradient id="task3Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="600" height="320" fill="#1f2937" rx="8" />

    {/* Title */}
    <text x="300" y="25" textAnchor="middle" fill="#f3f4f6" fontSize="16" fontWeight="bold">Synchronous vs Asynchronous Execution</text>

    {/* Sync Section */}
    <text x="50" y="55" fill="#f87171" fontSize="14" fontWeight="bold">Synchronous (Sequential)</text>

    {/* Time axis for sync */}
    <line x1="50" y1="120" x2="550" y2="120" stroke="#4b5563" strokeWidth="1" />
    <text x="555" y="125" fill="#9ca3af" fontSize="10">time</text>

    {/* Sync tasks - sequential */}
    <rect x="50" y="70" width="120" height="35" rx="4" fill="url(#task1Gradient)" />
    <text x="110" y="92" textAnchor="middle" fill="#ffffff" fontSize="10">Task A (1s)</text>

    <rect x="170" y="70" width="120" height="35" rx="4" fill="url(#task2Gradient)" />
    <text x="230" y="92" textAnchor="middle" fill="#1f2937" fontSize="10">Task B (1s)</text>

    <rect x="290" y="70" width="120" height="35" rx="4" fill="url(#task3Gradient)" />
    <text x="350" y="92" textAnchor="middle" fill="#ffffff" fontSize="10">Task C (1s)</text>

    {/* Total time indicator - sync */}
    <line x1="50" y1="130" x2="50" y2="145" stroke="#f87171" strokeWidth="2" />
    <line x1="410" y1="130" x2="410" y2="145" stroke="#f87171" strokeWidth="2" />
    <line x1="50" y1="140" x2="410" y2="140" stroke="#f87171" strokeWidth="2" />
    <text x="230" y="158" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Total: ~3 seconds</text>

    {/* Async Section */}
    <text x="50" y="195" fill="#34d399" fontSize="14" fontWeight="bold">Asynchronous (Concurrent)</text>

    {/* Time axis for async */}
    <line x1="50" y1="290" x2="550" y2="290" stroke="#4b5563" strokeWidth="1" />
    <text x="555" y="295" fill="#9ca3af" fontSize="10">time</text>

    {/* Async tasks - concurrent with interleaving */}
    <rect x="50" y="210" width="40" height="25" rx="4" fill="url(#task1Gradient)" />
    <rect x="130" y="210" width="40" height="25" rx="4" fill="url(#task1Gradient)" />
    <text x="110" y="252" textAnchor="middle" fill="#60a5fa" fontSize="9">Task A</text>

    <rect x="50" y="240" width="40" height="25" rx="4" fill="url(#task2Gradient)" />
    <rect x="130" y="240" width="40" height="25" rx="4" fill="url(#task2Gradient)" />
    <text x="110" y="282" textAnchor="middle" fill="#ffd43b" fontSize="9">Task B</text>

    <rect x="90" y="210" width="40" height="25" rx="4" fill="url(#task3Gradient)" />
    <rect x="90" y="240" width="40" height="25" rx="4" fill="url(#task3Gradient)" opacity="0.3" />
    <text x="280" y="252" textAnchor="middle" fill="#a78bfa" fontSize="9">Task C</text>

    {/* Dashed lines showing waiting */}
    <line x1="90" y1="222" x2="130" y2="222" stroke="#3776ab" strokeWidth="1" strokeDasharray="3" />
    <line x1="90" y1="252" x2="130" y2="252" stroke="#ffd43b" strokeWidth="1" strokeDasharray="3" />

    {/* Total time indicator - async */}
    <line x1="50" y1="300" x2="50" y2="315" stroke="#34d399" strokeWidth="2" />
    <line x1="170" y1="300" x2="170" y2="315" stroke="#34d399" strokeWidth="2" />
    <line x1="50" y1="310" x2="170" y2="310" stroke="#34d399" strokeWidth="2" />
    <text x="110" y="328" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Total: ~1 second</text>

    {/* Savings indicator */}
    <rect x="420" y="230" width="160" height="50" rx="8" fill="#065f46" fillOpacity="0.5" stroke="#34d399" strokeWidth="2" />
    <text x="500" y="252" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">3x Faster!</text>
    <text x="500" y="270" textAnchor="middle" fill="#d1d5db" fontSize="10">with asyncio.gather()</text>
  </svg>
)

// Task Gather Diagram - Shows asyncio.gather() running multiple tasks
const TaskGatherDiagram = () => (
  <svg viewBox="0 0 600 280" style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
    <defs>
      <linearGradient id="gatherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3776ab" />
        <stop offset="100%" stopColor="#2d5f8a" />
      </linearGradient>
      <linearGradient id="resultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <marker id="gatherArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ffd43b" />
      </marker>
      <marker id="returnArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#34d399" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="600" height="280" fill="#1f2937" rx="8" />

    {/* Title */}
    <text x="300" y="25" textAnchor="middle" fill="#f3f4f6" fontSize="16" fontWeight="bold">asyncio.gather() - Concurrent Execution</text>

    {/* gather() box */}
    <rect x="20" y="100" width="140" height="60" rx="8" fill="url(#gatherGradient)" stroke="#ffd43b" strokeWidth="2" />
    <text x="90" y="125" textAnchor="middle" fill="#ffd43b" fontSize="11" fontWeight="bold">asyncio.gather(</text>
    <text x="90" y="145" textAnchor="middle" fill="#ffffff" fontSize="10">task1, task2, task3</text>
    <text x="90" y="158" textAnchor="middle" fill="#ffd43b" fontSize="11" fontWeight="bold">)</text>

    {/* Arrows to tasks */}
    <line x1="160" y1="110" x2="230" y2="70" stroke="#ffd43b" strokeWidth="2" markerEnd="url(#gatherArrow)" />
    <line x1="160" y1="130" x2="230" y2="130" stroke="#ffd43b" strokeWidth="2" markerEnd="url(#gatherArrow)" />
    <line x1="160" y1="150" x2="230" y2="190" stroke="#ffd43b" strokeWidth="2" markerEnd="url(#gatherArrow)" />

    {/* Task boxes */}
    <rect x="240" y="50" width="130" height="40" rx="6" fill="#3776ab" />
    <text x="305" y="65" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">fetch_user()</text>
    <text x="305" y="80" textAnchor="middle" fill="#d1d5db" fontSize="9">~1s network I/O</text>

    <rect x="240" y="110" width="130" height="40" rx="6" fill="#3776ab" />
    <text x="305" y="125" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">fetch_posts()</text>
    <text x="305" y="140" textAnchor="middle" fill="#d1d5db" fontSize="9">~1s network I/O</text>

    <rect x="240" y="170" width="130" height="40" rx="6" fill="#3776ab" />
    <text x="305" y="185" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">fetch_comments()</text>
    <text x="305" y="200" textAnchor="middle" fill="#d1d5db" fontSize="9">~1s network I/O</text>

    {/* Concurrent execution indicator */}
    <rect x="380" y="50" width="80" height="160" rx="4" fill="none" stroke="#ffd43b" strokeWidth="2" strokeDasharray="5,3" />
    <text x="420" y="135" textAnchor="middle" fill="#ffd43b" fontSize="10" transform="rotate(-90 420 135)">Concurrent</text>

    {/* Arrows to results */}
    <line x1="460" y1="70" x2="510" y2="110" stroke="#34d399" strokeWidth="2" markerEnd="url(#returnArrow)" />
    <line x1="460" y1="130" x2="510" y2="130" stroke="#34d399" strokeWidth="2" markerEnd="url(#returnArrow)" />
    <line x1="460" y1="190" x2="510" y2="150" stroke="#34d399" strokeWidth="2" markerEnd="url(#returnArrow)" />

    {/* Results box */}
    <rect x="520" y="95" width="60" height="70" rx="8" fill="url(#resultGradient)" />
    <text x="550" y="115" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Results</text>
    <text x="550" y="130" textAnchor="middle" fill="#d1fae5" fontSize="8">[user,</text>
    <text x="550" y="143" textAnchor="middle" fill="#d1fae5" fontSize="8">posts,</text>
    <text x="550" y="156" textAnchor="middle" fill="#d1fae5" fontSize="8">comments]</text>

    {/* Time indicator */}
    <rect x="180" y="230" width="240" height="35" rx="6" fill="#065f46" fillOpacity="0.5" stroke="#34d399" />
    <text x="300" y="252" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Total time: ~1s (not 3s!)</text>

    {/* Legend note */}
    <text x="300" y="275" textAnchor="middle" fill="#9ca3af" fontSize="10">All tasks run concurrently, returning when all complete</text>
  </svg>
)

// AsyncIO Architecture Diagram - High-level architecture
const AsyncIOArchitectureDiagram = () => (
  <svg viewBox="0 0 600 350" style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
    <defs>
      <linearGradient id="archBlueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3776ab" />
        <stop offset="100%" stopColor="#1e4a6d" />
      </linearGradient>
      <linearGradient id="archYellowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffd43b" />
        <stop offset="100%" stopColor="#c9a82c" />
      </linearGradient>
      <linearGradient id="archGreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="archPurpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <marker id="archArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#60a5fa" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="600" height="350" fill="#1f2937" rx="8" />

    {/* Title */}
    <text x="300" y="25" textAnchor="middle" fill="#f3f4f6" fontSize="16" fontWeight="bold">asyncio Architecture</text>

    {/* Top Layer - Application */}
    <rect x="50" y="45" width="500" height="50" rx="8" fill="url(#archBlueGradient)" stroke="#60a5fa" strokeWidth="2" />
    <text x="300" y="70" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Your Async Application</text>
    <text x="300" y="85" textAnchor="middle" fill="#d1d5db" fontSize="10">async def main(): ...</text>

    {/* Coroutines layer */}
    <rect x="50" y="110" width="150" height="70" rx="6" fill="url(#archPurpleGradient)" />
    <text x="125" y="135" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Coroutines</text>
    <text x="125" y="152" textAnchor="middle" fill="#e9d5ff" fontSize="9">async def func():</text>
    <text x="125" y="167" textAnchor="middle" fill="#e9d5ff" fontSize="9">await ...</text>

    {/* Tasks layer */}
    <rect x="225" y="110" width="150" height="70" rx="6" fill="url(#archYellowGradient)" />
    <text x="300" y="135" textAnchor="middle" fill="#1f2937" fontSize="11" fontWeight="bold">Tasks</text>
    <text x="300" y="152" textAnchor="middle" fill="#374151" fontSize="9">Scheduled coroutines</text>
    <text x="300" y="167" textAnchor="middle" fill="#374151" fontSize="9">create_task()</text>

    {/* Futures layer */}
    <rect x="400" y="110" width="150" height="70" rx="6" fill="url(#archGreenGradient)" />
    <text x="475" y="135" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Futures</text>
    <text x="475" y="152" textAnchor="middle" fill="#d1fae5" fontSize="9">Placeholder for</text>
    <text x="475" y="167" textAnchor="middle" fill="#d1fae5" fontSize="9">eventual results</text>

    {/* Arrows down to event loop */}
    <line x1="125" y1="180" x2="125" y2="215" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#archArrow)" />
    <line x1="300" y1="180" x2="300" y2="215" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#archArrow)" />
    <line x1="475" y1="180" x2="475" y2="215" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#archArrow)" />

    {/* Event Loop - central */}
    <rect x="100" y="220" width="400" height="55" rx="8" fill="url(#archBlueGradient)" stroke="#ffd43b" strokeWidth="3" />
    <text x="300" y="245" textAnchor="middle" fill="#ffd43b" fontSize="14" fontWeight="bold">Event Loop</text>
    <text x="300" y="262" textAnchor="middle" fill="#d1d5db" fontSize="10">asyncio.run() / asyncio.get_event_loop()</text>

    {/* I/O Layer */}
    <rect x="50" y="295" width="110" height="45" rx="6" fill="#374151" stroke="#60a5fa" />
    <text x="105" y="315" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Network I/O</text>
    <text x="105" y="330" textAnchor="middle" fill="#9ca3af" fontSize="8">sockets, HTTP</text>

    <rect x="175" y="295" width="110" height="45" rx="6" fill="#374151" stroke="#60a5fa" />
    <text x="230" y="315" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">File I/O</text>
    <text x="230" y="330" textAnchor="middle" fill="#9ca3af" fontSize="8">aiofiles</text>

    <rect x="300" y="295" width="110" height="45" rx="6" fill="#374151" stroke="#60a5fa" />
    <text x="355" y="315" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Timers</text>
    <text x="355" y="330" textAnchor="middle" fill="#9ca3af" fontSize="8">sleep, timeout</text>

    <rect x="425" y="295" width="125" height="45" rx="6" fill="#374151" stroke="#60a5fa" />
    <text x="487" y="315" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Subprocess</text>
    <text x="487" y="330" textAnchor="middle" fill="#9ca3af" fontSize="8">create_subprocess</text>

    {/* Arrows from event loop to I/O */}
    <line x1="150" y1="275" x2="105" y2="290" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#archArrow)" />
    <line x1="250" y1="275" x2="230" y2="290" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#archArrow)" />
    <line x1="350" y1="275" x2="355" y2="290" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#archArrow)" />
    <line x1="450" y1="275" x2="487" y2="290" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#archArrow)" />
  </svg>
)

export default function AsyncPython({ onBack, breadcrumb }) {
  const { darkMode } = useTheme()
  const [expandedSections, setExpandedSections] = useState({
    basics: true,
    asyncio: true,
    concurrent: true,
    aiohttp: true,
    contextManagers: true,
    iterators: true,
    errorHandling: true,
    bestPractices: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const cardStyle = {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginBottom: '1rem'
  }


  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '1rem'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      color: '#f3f4f6',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#60a5fa',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>&larr;</span> Back
        </button>

        {/* Breadcrumb */}
        {breadcrumb && <Breadcrumb items={breadcrumb} />}

        {/* Page Title */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Python Async Programming
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
          Comprehensive guide to asynchronous programming in Python using asyncio
        </p>

        {/* Async/Await Basics */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('basics')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Async/Await Basics
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.basics ? '−' : '+'}</span>
          </div>
          {expandedSections.basics && (
            <div>
              <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
                Async/await is Python's way of writing concurrent code. A coroutine is a function defined with
                <code style={{ color: '#a78bfa' }}> async def</code> that can be paused and resumed.
              </p>

              {/* Event Loop Diagram */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <EventLoopDiagram />
              </div>

              {/* Coroutine Flow Diagram */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <CoroutineFlowDiagram />
              </div>

              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Basic Coroutine</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

# Define a coroutine with async def
async def greet(name):
    print(f"Hello, {name}!")
    await asyncio.sleep(1)  # Non-blocking sleep
    print(f"Goodbye, {name}!")

# Run the coroutine
asyncio.run(greet("World"))`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Understanding the Event Loop</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def main():
    print("Starting...")
    await asyncio.sleep(1)
    print("Finished!")

# Method 1: Using asyncio.run() (Python 3.7+, recommended)
asyncio.run(main())

# Method 2: Getting event loop manually (older approach)
# loop = asyncio.get_event_loop()
# loop.run_until_complete(main())
# loop.close()`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Awaiting Multiple Coroutines</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def fetch_data(delay, data):
    await asyncio.sleep(delay)
    return data

async def main():
    # Sequential execution (slower)
    result1 = await fetch_data(1, "data1")
    result2 = await fetch_data(1, "data2")
    print(f"Sequential: {result1}, {result2}")  # Takes ~2 seconds

asyncio.run(main())`}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* asyncio Module */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('asyncio')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              asyncio Module
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.asyncio ? '−' : '+'}</span>
          </div>
          {expandedSections.asyncio && (
            <div>
              {/* AsyncIO Architecture Diagram */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <AsyncIOArchitectureDiagram />
              </div>

              {/* Task Gather Diagram */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <TaskGatherDiagram />
              </div>

              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>asyncio.gather() - Run Coroutines Concurrently</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def fetch_user(user_id):
    await asyncio.sleep(1)
    return {"id": user_id, "name": f"User{user_id}"}

async def fetch_posts(user_id):
    await asyncio.sleep(1)
    return [{"id": 1, "title": "Post 1"}, {"id": 2, "title": "Post 2"}]

async def main():
    # Run both coroutines concurrently - takes ~1 second total
    user, posts = await asyncio.gather(
        fetch_user(1),
        fetch_posts(1)
    )
    print(f"User: {user}")
    print(f"Posts: {posts}")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>asyncio.create_task() - Create Background Tasks</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def background_task(name, duration):
    print(f"Task {name} starting")
    await asyncio.sleep(duration)
    print(f"Task {name} completed")
    return f"Result from {name}"

async def main():
    # Create tasks - they start immediately
    task1 = asyncio.create_task(background_task("A", 2))
    task2 = asyncio.create_task(background_task("B", 1))

    print("Tasks created, doing other work...")
    await asyncio.sleep(0.5)
    print("Other work done")

    # Wait for tasks to complete
    result1 = await task1
    result2 = await task2
    print(f"Results: {result1}, {result2}")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>asyncio.wait() - Wait with Conditions</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def task(name, duration):
    await asyncio.sleep(duration)
    return f"Task {name} done"

async def main():
    tasks = [
        asyncio.create_task(task("A", 1)),
        asyncio.create_task(task("B", 2)),
        asyncio.create_task(task("C", 3)),
    ]

    # Wait for first task to complete
    done, pending = await asyncio.wait(
        tasks,
        return_when=asyncio.FIRST_COMPLETED
    )

    print(f"Completed: {len(done)}, Pending: {len(pending)}")
    for t in done:
        print(f"Result: {t.result()}")

    # Cancel pending tasks
    for t in pending:
        t.cancel()

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>asyncio.wait_for() - Timeout</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def slow_operation():
    await asyncio.sleep(10)
    return "Completed"

async def main():
    try:
        result = await asyncio.wait_for(
            slow_operation(),
            timeout=2.0  # Wait max 2 seconds
        )
        print(result)
    except asyncio.TimeoutError:
        print("Operation timed out!")

asyncio.run(main())`}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* Concurrent Execution */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('concurrent')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Concurrent Execution
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.concurrent ? '−' : '+'}</span>
          </div>
          {expandedSections.concurrent && (
            <div>
              {/* Async vs Sync Diagram */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <AsyncVsSyncDiagram />
              </div>

              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Running Multiple Tasks in Parallel</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio
import time

async def download_file(filename, size):
    print(f"Starting download: {filename}")
    # Simulate download time based on file size
    await asyncio.sleep(size / 100)
    print(f"Completed download: {filename}")
    return f"{filename} ({size}KB)"

async def main():
    files = [
        ("file1.txt", 100),
        ("file2.txt", 200),
        ("file3.txt", 150),
        ("file4.txt", 300),
    ]

    start = time.time()

    # Create all download tasks
    tasks = [download_file(name, size) for name, size in files]

    # Run all tasks concurrently
    results = await asyncio.gather(*tasks)

    end = time.time()
    print(f"Downloaded: {results}")
    print(f"Total time: {end - start:.2f}s")  # ~3s instead of ~7.5s

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Semaphore - Limiting Concurrent Tasks</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def limited_task(semaphore, task_id):
    async with semaphore:
        print(f"Task {task_id} starting")
        await asyncio.sleep(1)
        print(f"Task {task_id} finished")

async def main():
    # Limit to 3 concurrent tasks
    semaphore = asyncio.Semaphore(3)

    tasks = [limited_task(semaphore, i) for i in range(10)]
    await asyncio.gather(*tasks)

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>TaskGroup (Python 3.11+)</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def fetch_data(url):
    await asyncio.sleep(1)
    return f"Data from {url}"

async def main():
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(fetch_data("api/users"))
        task2 = tg.create_task(fetch_data("api/posts"))
        task3 = tg.create_task(fetch_data("api/comments"))

    # All tasks completed when context exits
    print(task1.result())
    print(task2.result())
    print(task3.result())

asyncio.run(main())`}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* aiohttp */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('aiohttp')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              aiohttp - Async HTTP Client/Server
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.aiohttp ? '−' : '+'}</span>
          </div>
          {expandedSections.aiohttp && (
            <div>
              <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
                Install with: <code style={{ color: '#a78bfa' }}>pip install aiohttp</code>
              </p>

              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Async HTTP Client</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import aiohttp
import asyncio

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    async with aiohttp.ClientSession() as session:
        # Fetch single URL
        html = await fetch_url(session, "https://httpbin.org/get")
        print(f"Response length: {len(html)}")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Fetching Multiple URLs Concurrently</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import aiohttp
import asyncio

async def fetch_json(session, url):
    async with session.get(url) as response:
        return await response.json()

async def main():
    urls = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/posts/2",
        "https://jsonplaceholder.typicode.com/posts/3",
    ]

    async with aiohttp.ClientSession() as session:
        tasks = [fetch_json(session, url) for url in urls]
        results = await asyncio.gather(*tasks)

        for result in results:
            print(f"Post {result['id']}: {result['title'][:30]}...")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>POST Request with JSON</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import aiohttp
import asyncio

async def create_post(session, data):
    async with session.post(
        "https://jsonplaceholder.typicode.com/posts",
        json=data
    ) as response:
        return await response.json()

async def main():
    async with aiohttp.ClientSession() as session:
        new_post = {
            "title": "My Post",
            "body": "This is the content",
            "userId": 1
        }
        result = await create_post(session, new_post)
        print(f"Created post with ID: {result['id']}")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Simple aiohttp Server</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from aiohttp import web

async def handle_get(request):
    name = request.match_info.get('name', 'World')
    return web.json_response({"message": f"Hello, {name}!"})

async def handle_post(request):
    data = await request.json()
    return web.json_response({"received": data})

app = web.Application()
app.router.add_get('/', handle_get)
app.router.add_get('/{name}', handle_get)
app.router.add_post('/data', handle_post)

if __name__ == '__main__':
    web.run_app(app, port=8080)`}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* Async Context Managers */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('contextManagers')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Async Context Managers
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.contextManagers ? '−' : '+'}</span>
          </div>
          {expandedSections.contextManagers && (
            <div>
              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Creating Async Context Managers</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

class AsyncDatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name
        self.connected = False

    async def __aenter__(self):
        print(f"Connecting to {self.db_name}...")
        await asyncio.sleep(0.5)  # Simulate connection time
        self.connected = True
        print("Connected!")
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection...")
        await asyncio.sleep(0.1)  # Simulate cleanup
        self.connected = False
        print("Connection closed")
        return False  # Don't suppress exceptions

    async def query(self, sql):
        if not self.connected:
            raise RuntimeError("Not connected")
        await asyncio.sleep(0.1)  # Simulate query
        return f"Results for: {sql}"

async def main():
    async with AsyncDatabaseConnection("mydb") as db:
        result = await db.query("SELECT * FROM users")
        print(result)

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Using contextlib for Async Context Managers</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio
from contextlib import asynccontextmanager

@asynccontextmanager
async def async_timer(name):
    import time
    start = time.time()
    print(f"[{name}] Starting...")
    try:
        yield
    finally:
        elapsed = time.time() - start
        print(f"[{name}] Completed in {elapsed:.2f}s")

async def main():
    async with async_timer("Data fetch"):
        await asyncio.sleep(1)
        print("Fetching data...")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Async Lock Context Manager</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

shared_resource = {"counter": 0}
lock = asyncio.Lock()

async def increment(task_id):
    async with lock:  # Only one task can hold the lock
        current = shared_resource["counter"]
        await asyncio.sleep(0.1)  # Simulate work
        shared_resource["counter"] = current + 1
        print(f"Task {task_id}: counter = {shared_resource['counter']}")

async def main():
    tasks = [increment(i) for i in range(5)]
    await asyncio.gather(*tasks)
    print(f"Final counter: {shared_resource['counter']}")

asyncio.run(main())`}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* Async Iterators and Generators */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('iterators')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Async Iterators and Generators
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.iterators ? '−' : '+'}</span>
          </div>
          {expandedSections.iterators && (
            <div>
              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Async Generator</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def async_range(start, stop):
    """Async generator that yields numbers with delay"""
    for i in range(start, stop):
        await asyncio.sleep(0.5)
        yield i

async def main():
    async for num in async_range(1, 6):
        print(f"Got: {num}")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Async Iterator Class</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

class AsyncPaginator:
    """Async iterator for paginated API responses"""

    def __init__(self, total_pages):
        self.total_pages = total_pages
        self.current_page = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self.current_page >= self.total_pages:
            raise StopAsyncIteration

        self.current_page += 1
        await asyncio.sleep(0.3)  # Simulate API call
        return {
            "page": self.current_page,
            "data": [f"item_{i}" for i in range(3)]
        }

async def main():
    paginator = AsyncPaginator(3)
    async for page in paginator:
        print(f"Page {page['page']}: {page['data']}")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Async Comprehensions</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def fetch_item(item_id):
    await asyncio.sleep(0.1)
    return {"id": item_id, "value": item_id * 10}

async def async_range(n):
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i

async def main():
    # Async list comprehension
    items = [await fetch_item(i) for i in range(5)]
    print(f"Items: {items}")

    # Async generator comprehension
    values = [x async for x in async_range(5)]
    print(f"Values: {values}")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Streaming Data with Async Generators</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def stream_events():
    """Simulate streaming events from a server"""
    events = ["user_login", "page_view", "button_click", "purchase", "logout"]
    for event in events:
        await asyncio.sleep(0.5)
        yield {"event": event, "timestamp": asyncio.get_event_loop().time()}

async def process_stream():
    async for event in stream_events():
        print(f"Processing: {event['event']}")

asyncio.run(process_stream())`}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* Error Handling */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('errorHandling')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Error Handling
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.errorHandling ? '−' : '+'}</span>
          </div>
          {expandedSections.errorHandling && (
            <div>
              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Basic Exception Handling</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def risky_operation():
    await asyncio.sleep(0.5)
    raise ValueError("Something went wrong!")

async def main():
    try:
        await risky_operation()
    except ValueError as e:
        print(f"Caught error: {e}")
    finally:
        print("Cleanup complete")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Handling Errors in gather()</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def task_success():
    await asyncio.sleep(0.5)
    return "Success!"

async def task_failure():
    await asyncio.sleep(0.3)
    raise RuntimeError("Task failed!")

async def main():
    # return_exceptions=True prevents one failure from canceling others
    results = await asyncio.gather(
        task_success(),
        task_failure(),
        task_success(),
        return_exceptions=True
    )

    for i, result in enumerate(results):
        if isinstance(result, Exception):
            print(f"Task {i} failed: {result}")
        else:
            print(f"Task {i} succeeded: {result}")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Cancellation Handling</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def long_running_task():
    try:
        print("Task started")
        await asyncio.sleep(10)
        print("Task completed")
    except asyncio.CancelledError:
        print("Task was cancelled!")
        # Perform cleanup here
        raise  # Re-raise to properly propagate cancellation

async def main():
    task = asyncio.create_task(long_running_task())

    await asyncio.sleep(1)
    task.cancel()

    try:
        await task
    except asyncio.CancelledError:
        print("Main: task cancellation confirmed")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Exception Groups (Python 3.11+)</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def failing_task(n):
    await asyncio.sleep(0.1)
    if n % 2 == 0:
        raise ValueError(f"Task {n} failed")
    return f"Task {n} ok"

async def main():
    try:
        async with asyncio.TaskGroup() as tg:
            for i in range(5):
                tg.create_task(failing_task(i))
    except* ValueError as eg:
        print(f"Caught {len(eg.exceptions)} ValueErrors:")
        for e in eg.exceptions:
            print(f"  - {e}")

asyncio.run(main())`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Retry Pattern</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def unreliable_api():
    import random
    if random.random() < 0.7:  # 70% chance of failure
        raise ConnectionError("API unavailable")
    return {"status": "success"}

async def retry_with_backoff(coro_func, max_retries=3, base_delay=1):
    """Retry a coroutine with exponential backoff"""
    for attempt in range(max_retries):
        try:
            return await coro_func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            delay = base_delay * (2 ** attempt)
            print(f"Attempt {attempt + 1} failed: {e}")
            print(f"Retrying in {delay}s...")
            await asyncio.sleep(delay)

async def main():
    try:
        result = await retry_with_backoff(unreliable_api)
        print(f"Result: {result}")
    except ConnectionError as e:
        print(f"All retries failed: {e}")

asyncio.run(main())`}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* Best Practices */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('bestPractices')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Best Practices
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.bestPractices ? '−' : '+'}</span>
          </div>
          {expandedSections.bestPractices && (
            <div>
              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>When to Use Async</h3>
              <div style={{
                backgroundColor: '#111827',
                border: '1px solid #374151',
                borderRadius: '0.375rem',
                padding: '1rem',
                color: '#d1d5db'
              }}>
                <p><strong style={{ color: '#34d399' }}>Use async for:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>I/O-bound operations (network requests, file I/O, database queries)</li>
                  <li>Many concurrent connections (web servers, chat applications)</li>
                  <li>Real-time data processing (WebSockets, streaming)</li>
                  <li>When you need to handle thousands of concurrent operations</li>
                </ul>
                <p style={{ marginTop: '1rem' }}><strong style={{ color: '#f87171' }}>Don't use async for:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>CPU-bound operations (use multiprocessing instead)</li>
                  <li>Simple sequential scripts</li>
                  <li>When you're already using threads effectively</li>
                </ul>
              </div>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Avoid Blocking the Event Loop</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

# BAD: This blocks the event loop
async def bad_example():
    import time
    time.sleep(5)  # BLOCKING! Don't do this!
    return "done"

# GOOD: Use async-compatible functions
async def good_example():
    await asyncio.sleep(5)  # Non-blocking
    return "done"

# For CPU-bound work, use run_in_executor
async def cpu_bound_work():
    loop = asyncio.get_event_loop()

    def heavy_computation():
        return sum(i * i for i in range(10_000_000))

    # Run in thread pool to avoid blocking
    result = await loop.run_in_executor(None, heavy_computation)
    return result`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Always Clean Up Resources</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio
import aiohttp

# BAD: Resources may not be cleaned up
async def bad_fetch():
    session = aiohttp.ClientSession()
    response = await session.get("https://example.com")
    return await response.text()
    # Session never closed!

# GOOD: Use context managers
async def good_fetch():
    async with aiohttp.ClientSession() as session:
        async with session.get("https://example.com") as response:
            return await response.text()
    # Both session and response properly closed`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Don't Mix Sync and Async Carelessly</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

# BAD: Calling sync code that does I/O
async def bad_mixed():
    import requests  # Sync library - blocks event loop!
    response = requests.get("https://example.com")
    return response.text

# GOOD: Use async libraries
async def good_mixed():
    import aiohttp
    async with aiohttp.ClientSession() as session:
        async with session.get("https://example.com") as response:
            return await response.text()

# ACCEPTABLE: Running sync code in executor when needed
async def acceptable_mixed():
    import requests
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(
        None,
        lambda: requests.get("https://example.com")
    )
    return response.text`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Use TaskGroups for Structured Concurrency (3.11+)</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`import asyncio

async def fetch_all_data():
    # Preferred: TaskGroup ensures all tasks complete or fail together
    async with asyncio.TaskGroup() as tg:
        user_task = tg.create_task(fetch_user())
        posts_task = tg.create_task(fetch_posts())
        comments_task = tg.create_task(fetch_comments())

    # If any task fails, all are cancelled and exception is raised
    return {
        "user": user_task.result(),
        "posts": posts_task.result(),
        "comments": comments_task.result()
    }`}
              </SyntaxHighlighter>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Common Pitfalls to Avoid</h3>
              <div style={{
                backgroundColor: '#111827',
                border: '1px solid #374151',
                borderRadius: '0.375rem',
                padding: '1rem',
                color: '#d1d5db'
              }}>
                <ol style={{ marginLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#fbbf24' }}>Forgetting to await:</strong> Always await coroutines, otherwise they won't execute
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#fbbf24' }}>Creating tasks without awaiting:</strong> Tasks may get garbage collected before completion
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#fbbf24' }}>Using global state without locks:</strong> Race conditions can occur
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#fbbf24' }}>Ignoring CancelledError:</strong> Always handle or re-raise to ensure proper cleanup
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#fbbf24' }}>Too many concurrent connections:</strong> Use semaphores to limit concurrency
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Quick Reference Card */}
        <div style={{ ...cardStyle, backgroundColor: '#1e3a5f' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa', marginBottom: '1rem' }}>
            Quick Reference
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Creating Coroutines</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>async def my_func():</code>
            </div>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Running Coroutines</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>asyncio.run(main())</code>
            </div>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Concurrent Execution</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>await asyncio.gather(*tasks)</code>
            </div>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Creating Tasks</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>asyncio.create_task(coro)</code>
            </div>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Async Sleep</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>await asyncio.sleep(seconds)</code>
            </div>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Timeout</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>await asyncio.wait_for(coro, timeout)</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

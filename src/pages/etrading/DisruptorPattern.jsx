import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const TOPIC_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// Ring Buffer Diagram
const RingBufferDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="disruptorArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">LMAX Disruptor Ring Buffer</text>
    <circle cx="400" cy="150" r="100" fill="none" stroke="#22c55e" strokeWidth="3"/>
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const angle = (i * 45 - 90) * Math.PI / 180
      const x = 400 + 100 * Math.cos(angle)
      const y = 150 + 100 * Math.sin(angle)
      return (
        <g key={i}>
          <circle cx={x} cy={y} r="18" fill={i < 5 ? '#3b82f6' : '#1e293b'} stroke={i < 5 ? '#60a5fa' : '#475569'} strokeWidth="2"/>
          <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="10">{i}</text>
        </g>
      )
    })}
    <rect x="50" y="120" width="100" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="100" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Producer</text>
    <text x="100" y="165" textAnchor="middle" fill="#fef3c7" fontSize="9">Sequence: 4</text>
    <line x1="150" y1="150" x2="280" y2="150" stroke="#4ade80" strokeWidth="2" markerEnd="url(#disruptorArrow)"/>
    <rect x="650" y="120" width="100" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="700" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Consumer</text>
    <text x="700" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="9">Sequence: 2</text>
    <line x1="520" y1="150" x2="645" y2="150" stroke="#4ade80" strokeWidth="2" markerEnd="url(#disruptorArrow)"/>
    <text x="400" y="145" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Pre-allocated</text>
    <text x="400" y="160" textAnchor="middle" fill="#4ade80" fontSize="10">Events</text>
    <rect x="280" y="260" width="240" height="15" rx="3" fill="rgba(15, 23, 42, 0.8)"/>
    <text x="400" y="272" textAnchor="middle" fill="#64748b" fontSize="9">Power of 2 size • Bitwise modulo • Cache-line padded</text>
  </svg>
)

// Wait Strategy Diagram
const WaitStrategyDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Wait Strategies - Latency vs CPU Trade-off</text>
    <rect x="50" y="50" width="130" height="70" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="115" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BusySpinWait</text>
    <text x="115" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="8">Lowest latency</text>
    <text x="115" y="110" textAnchor="middle" fill="#bbf7d0" fontSize="8">~10ns</text>
    <rect x="200" y="50" width="130" height="70" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="265" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">YieldingWait</text>
    <text x="265" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="8">Thread.yield()</text>
    <text x="265" y="110" textAnchor="middle" fill="#bfdbfe" fontSize="8">~100ns</text>
    <rect x="350" y="50" width="130" height="70" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="415" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SleepingWait</text>
    <text x="415" y="95" textAnchor="middle" fill="#fef3c7" fontSize="8">LockSupport.park</text>
    <text x="415" y="110" textAnchor="middle" fill="#fef3c7" fontSize="8">~1μs</text>
    <rect x="500" y="50" width="130" height="70" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="565" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BlockingWait</text>
    <text x="565" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="8">Lock + Condition</text>
    <text x="565" y="110" textAnchor="middle" fill="#ddd6fe" fontSize="8">~10μs</text>
    <rect x="650" y="50" width="100" height="70" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="700" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">TimeoutBlock</text>
    <text x="700" y="95" textAnchor="middle" fill="#fecaca" fontSize="8">Timed wait</text>
    <text x="700" y="110" textAnchor="middle" fill="#fecaca" fontSize="8">Configurable</text>
    <line x1="115" y1="145" x2="700" y2="145" stroke="#4ade80" strokeWidth="2"/>
    <text x="115" y="165" fill="#4ade80" fontSize="9">Low Latency</text>
    <text x="700" y="165" textAnchor="end" fill="#ef4444" fontSize="9">Low CPU</text>
    <text x="400" y="185" textAnchor="middle" fill="#64748b" fontSize="9">Choose based on latency requirements vs CPU budget</text>
  </svg>
)

// Event Pipeline Diagram
const EventPipelineDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="pipeArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Event Handler Pipeline Patterns</text>
    <text x="200" y="55" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Parallel (handleEventsWith)</text>
    <rect x="50" y="70" width="80" height="40" rx="4" fill="#3b82f6"/>
    <text x="90" y="95" textAnchor="middle" fill="white" fontSize="9">Handler A</text>
    <rect x="160" y="70" width="80" height="40" rx="4" fill="#3b82f6"/>
    <text x="200" y="95" textAnchor="middle" fill="white" fontSize="9">Handler B</text>
    <rect x="270" y="70" width="80" height="40" rx="4" fill="#3b82f6"/>
    <text x="310" y="95" textAnchor="middle" fill="white" fontSize="9">Handler C</text>
    <text x="600" y="55" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Sequential (then)</text>
    <rect x="450" y="70" width="80" height="40" rx="4" fill="#f59e0b"/>
    <text x="490" y="95" textAnchor="middle" fill="white" fontSize="9">Decode</text>
    <line x1="530" y1="90" x2="555" y2="90" stroke="#4ade80" strokeWidth="2" markerEnd="url(#pipeArrow)"/>
    <rect x="560" y="70" width="80" height="40" rx="4" fill="#f59e0b"/>
    <text x="600" y="95" textAnchor="middle" fill="white" fontSize="9">Process</text>
    <line x1="640" y1="90" x2="665" y2="90" stroke="#4ade80" strokeWidth="2" markerEnd="url(#pipeArrow)"/>
    <rect x="670" y="70" width="80" height="40" rx="4" fill="#f59e0b"/>
    <text x="710" y="95" textAnchor="middle" fill="white" fontSize="9">Journal</text>
    <text x="400" y="145" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">Diamond Pattern (Fan-out / Fan-in)</text>
    <rect x="100" y="160" width="80" height="30" rx="4" fill="#22c55e"/>
    <text x="140" y="180" textAnchor="middle" fill="white" fontSize="9">Producer</text>
    <rect x="250" y="150" width="70" height="25" rx="4" fill="#8b5cf6"/>
    <text x="285" y="167" textAnchor="middle" fill="white" fontSize="8">H1</text>
    <rect x="250" y="180" width="70" height="25" rx="4" fill="#8b5cf6"/>
    <text x="285" y="197" textAnchor="middle" fill="white" fontSize="8">H2</text>
    <rect x="400" y="160" width="80" height="30" rx="4" fill="#ec4899"/>
    <text x="440" y="180" textAnchor="middle" fill="white" fontSize="9">Aggregator</text>
    <text x="640" y="145" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Worker Pool</text>
    <rect x="550" y="155" width="180" height="45" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e"/>
    <rect x="565" y="165" width="45" height="25" rx="3" fill="#22c55e"/>
    <text x="587" y="182" textAnchor="middle" fill="white" fontSize="8">W1</text>
    <rect x="620" y="165" width="45" height="25" rx="3" fill="#22c55e"/>
    <text x="642" y="182" textAnchor="middle" fill="white" fontSize="8">W2</text>
    <rect x="675" y="165" width="45" height="25" rx="3" fill="#22c55e"/>
    <text x="697" y="182" textAnchor="middle" fill="white" fontSize="8">W3</text>
  </svg>
)

// Single Writer Diagram
const SingleWriterDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="swArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Single Writer Principle</text>
    <rect x="50" y="50" width="300" height="110" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">❌ Multiple Writers (Contention)</text>
    <rect x="70" y="90" width="60" height="25" rx="4" fill="#ef4444"/>
    <text x="100" y="107" textAnchor="middle" fill="white" fontSize="8">Thread 1</text>
    <rect x="70" y="125" width="60" height="25" rx="4" fill="#ef4444"/>
    <text x="100" y="142" textAnchor="middle" fill="white" fontSize="8">Thread 2</text>
    <rect x="200" y="100" width="80" height="40" rx="4" fill="#64748b" stroke="#ef4444" strokeWidth="2"/>
    <text x="240" y="125" textAnchor="middle" fill="white" fontSize="8">Shared Var</text>
    <rect x="450" y="50" width="300" height="110" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">✓ Single Writer (No Contention)</text>
    <rect x="470" y="100" width="60" height="40" rx="4" fill="#22c55e"/>
    <text x="500" y="125" textAnchor="middle" fill="white" fontSize="8">Writer</text>
    <line x1="530" y1="120" x2="570" y2="120" stroke="#4ade80" strokeWidth="2" markerEnd="url(#swArrow)"/>
    <rect x="575" y="100" width="80" height="40" rx="4" fill="#3b82f6"/>
    <text x="615" y="125" textAnchor="middle" fill="white" fontSize="8">Sequence</text>
    <rect x="700" y="90" width="30" height="20" rx="3" fill="#8b5cf6"/>
    <text x="715" y="104" textAnchor="middle" fill="white" fontSize="7">R1</text>
    <rect x="700" y="120" width="30" height="20" rx="3" fill="#8b5cf6"/>
    <text x="715" y="134" textAnchor="middle" fill="white" fontSize="7">R2</text>
    <text x="400" y="185" textAnchor="middle" fill="#64748b" fontSize="9">Single writer eliminates locks • Memory barrier only on publish</text>
  </svg>
)

// Benchmark Diagram
const BenchmarkDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Performance Comparison (ops/sec)</text>
    <rect x="100" y="45" width="600" height="25" rx="4" fill="#22c55e"/>
    <text x="110" y="62" fill="white" fontSize="10" fontWeight="bold">Disruptor</text>
    <text x="690" y="62" textAnchor="end" fill="white" fontSize="10">~25M ops/sec</text>
    <rect x="100" y="80" width="180" height="25" rx="4" fill="#3b82f6"/>
    <text x="110" y="97" fill="white" fontSize="10" fontWeight="bold">ArrayBlockingQueue</text>
    <text x="270" y="97" textAnchor="end" fill="white" fontSize="10">~4M</text>
    <rect x="100" y="115" width="240" height="25" rx="4" fill="#f59e0b"/>
    <text x="110" y="132" fill="white" fontSize="10" fontWeight="bold">LinkedBlockingQueue</text>
    <text x="330" y="132" textAnchor="end" fill="white" fontSize="10">~5M</text>
    <rect x="100" y="150" width="120" height="25" rx="4" fill="#ef4444"/>
    <text x="110" y="167" fill="white" fontSize="10" fontWeight="bold">SynchronousQueue</text>
    <text x="210" y="167" textAnchor="end" fill="white" fontSize="10">~2M</text>
    <text x="400" y="195" textAnchor="middle" fill="#64748b" fontSize="9">Single producer, single consumer, 64-byte messages</text>
  </svg>
)

// Sequence Internal Structure Diagram
const SequenceInternalsDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Sequence Class Internal Structure (Cache Line Padded)</text>
    
    <rect x="100" y="50" width="600" height="180" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Sequence (64 bytes = 1 Cache Line)</text>
    
    <rect x="120" y="95" width="70" height="40" rx="4" fill="#64748b" stroke="#94a3b8"/>
    <text x="155" y="120" textAnchor="middle" fill="white" fontSize="9">p1-p7</text>
    <text x="155" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">56 bytes</text>
    
    <rect x="200" y="95" width="100" height="40" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="250" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">volatile long</text>
    <text x="250" y="130" textAnchor="middle" fill="#bbf7d0" fontSize="9">value</text>
    <text x="250" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">8 bytes</text>
    
    <rect x="310" y="95" width="70" height="40" rx="4" fill="#64748b" stroke="#94a3b8"/>
    <text x="345" y="120" textAnchor="middle" fill="white" fontSize="9">p8-p14</text>
    <text x="345" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">56 bytes</text>
    
    <text x="250" y="175" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">← Padding prevents false sharing →</text>
    
    <rect x="450" y="90" width="230" height="120" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6"/>
    <text x="565" y="115" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Key Methods</text>
    <text x="470" y="140" fill="#94a3b8" fontSize="9">• get() - volatile read</text>
    <text x="470" y="160" fill="#94a3b8" fontSize="9">• set() - plain write (single writer)</text>
    <text x="470" y="180" fill="#94a3b8" fontSize="9">• setVolatile() - with memory barrier</text>
    <text x="470" y="200" fill="#94a3b8" fontSize="9">• compareAndSet() - CAS operation</text>
    
    <text x="400" y="255" textAnchor="middle" fill="#64748b" fontSize="9">Total: 120 bytes with padding • Ensures sequence never shares cache line with other data</text>
  </svg>
)

// RingBuffer Internals Diagram
const RingBufferInternalsDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RingBuffer Internal Structure</text>
    
    <rect x="50" y="50" width="320" height="240" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="210" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">{`RingBuffer&lt;E&gt;`}</text>
    
    <rect x="70" y="95" width="130" height="35" rx="4" fill="#3b82f6"/>
    <text x="135" y="117" textAnchor="middle" fill="white" fontSize="9">Object[] entries</text>
    
    <rect x="210" y="95" width="140" height="35" rx="4" fill="#f59e0b"/>
    <text x="280" y="117" textAnchor="middle" fill="white" fontSize="9">Sequencer sequencer</text>
    
    <rect x="70" y="140" width="130" height="35" rx="4" fill="#8b5cf6"/>
    <text x="135" y="162" textAnchor="middle" fill="white" fontSize="9">int indexMask</text>
    
    <rect x="210" y="140" width="140" height="35" rx="4" fill="#ec4899"/>
    <text x="280" y="162" textAnchor="middle" fill="white" fontSize="9">int bufferSize</text>
    
    <rect x="70" y="190" width="280" height="80" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155"/>
    <text x="210" y="215" textAnchor="middle" fill="#94a3b8" fontSize="10">Index Calculation (Power of 2)</text>
    <text x="210" y="235" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">{`index = sequence & indexMask`}</text>
    <text x="210" y="255" textAnchor="middle" fill="#64748b" fontSize="9">indexMask = bufferSize - 1</text>
    
    <rect x="420" y="50" width="330" height="240" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="585" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Pre-allocated Event Array</text>
    
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <g key={i}>
        <rect x={440 + (i % 4) * 75} y={95 + Math.floor(i / 4) * 55} width="65" height="45" rx="4" fill={i < 5 ? '#22c55e' : '#1e293b'} stroke={i < 5 ? '#4ade80' : '#475569'}/>
        <text x={472 + (i % 4) * 75} y={115 + Math.floor(i / 4) * 55} textAnchor="middle" fill="white" fontSize="9">[{i}]</text>
        <text x={472 + (i % 4) * 75} y={130 + Math.floor(i / 4) * 55} textAnchor="middle" fill={i < 5 ? '#bbf7d0' : '#64748b'} fontSize="8">{i < 5 ? 'Event' : 'Empty'}</text>
      </g>
    ))}
    
    <text x="585" y="220" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Events pre-allocated at startup</text>
    <text x="585" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">• No allocation on publish</text>
    <text x="585" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9">• Events reused via EventTranslator</text>
    <text x="585" y="270" textAnchor="middle" fill="#94a3b8" fontSize="9">• Zero GC on hot path</text>
    
    <text x="400" y="310" textAnchor="middle" fill="#64748b" fontSize="9">Buffer size must be power of 2 for bitwise AND index calculation</text>
  </svg>
)

// Sequencer Internals Diagram
const SequencerInternalsDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Sequencer Implementations</text>
    
    <rect x="50" y="50" width="320" height="220" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="210" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">SingleProducerSequencer</text>
    
    <rect x="70" y="95" width="130" height="30" rx="4" fill="#22c55e"/>
    <text x="135" y="115" textAnchor="middle" fill="white" fontSize="9">Sequence cursor</text>
    
    <rect x="210" y="95" width="140" height="30" rx="4" fill="#3b82f6"/>
    <text x="280" y="115" textAnchor="middle" fill="white" fontSize="9">Sequence[] gatingSeqs</text>
    
    <rect x="70" y="135" width="280" height="55" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155"/>
    <text x="210" y="155" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">next() - No CAS needed!</text>
    <text x="210" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">nextValue = cursor + 1 (plain write)</text>
    
    <rect x="70" y="200" width="280" height="55" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155"/>
    <text x="210" y="220" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">publish() - Memory barrier</text>
    <text x="210" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">cursor.setVolatile(sequence)</text>
    
    <rect x="430" y="50" width="320" height="220" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">MultiProducerSequencer</text>
    
    <rect x="450" y="95" width="130" height="30" rx="4" fill="#ef4444"/>
    <text x="515" y="115" textAnchor="middle" fill="white" fontSize="9">Sequence cursor</text>
    
    <rect x="590" y="95" width="140" height="30" rx="4" fill="#8b5cf6"/>
    <text x="660" y="115" textAnchor="middle" fill="white" fontSize="9">int[] availableBuffer</text>
    
    <rect x="450" y="135" width="280" height="55" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155"/>
    <text x="590" y="155" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">next() - CAS loop required</text>
    <text x="590" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">cursor.compareAndSet(current, next)</text>
    
    <rect x="450" y="200" width="280" height="55" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155"/>
    <text x="590" y="220" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">publish() - Mark slot available</text>
    <text x="590" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">availableBuffer[index] = flag</text>
    
    <text x="400" y="290" textAnchor="middle" fill="#64748b" fontSize="9">Single producer: ~3x faster than multi-producer due to no CAS contention</text>
  </svg>
)

// SequenceBarrier Diagram
const SequenceBarrierDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="barrierArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">SequenceBarrier - Consumer Coordination</text>
    
    <rect x="50" y="60" width="120" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="110" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Producer</text>
    <text x="110" y="105" textAnchor="middle" fill="#fef3c7" fontSize="9">cursor: 100</text>
    
    <rect x="220" y="50" width="180" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="310" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">SequenceBarrier</text>
    <text x="310" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">waitFor(sequence)</text>
    <text x="310" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">WaitStrategy.waitFor()</text>
    
    <line x1="170" y1="90" x2="215" y2="90" stroke="#4ade80" strokeWidth="2" markerEnd="url(#barrierArrow)"/>
    
    <rect x="450" y="45" width="100" height="45" rx="4" fill="#3b82f6"/>
    <text x="500" y="65" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Consumer 1</text>
    <text x="500" y="82" textAnchor="middle" fill="#bfdbfe" fontSize="8">seq: 98</text>
    
    <rect x="450" y="100" width="100" height="45" rx="4" fill="#8b5cf6"/>
    <text x="500" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Consumer 2</text>
    <text x="500" y="137" textAnchor="middle" fill="#ddd6fe" fontSize="8">seq: 95</text>
    
    <line x1="400" y1="75" x2="445" y2="67" stroke="#4ade80" strokeWidth="2" markerEnd="url(#barrierArrow)"/>
    <line x1="400" y1="105" x2="445" y2="122" stroke="#4ade80" strokeWidth="2" markerEnd="url(#barrierArrow)"/>
    
    <rect x="600" y="60" width="150" height="90" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155"/>
    <text x="675" y="85" textAnchor="middle" fill="#ec4899" fontSize="10" fontWeight="bold">Gating Sequences</text>
    <text x="675" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">min(C1, C2) = 95</text>
    <text x="675" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Producer can't pass</text>
    <text x="675" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">slowest consumer</text>
    
    <line x1="550" y1="90" x2="595" y2="90" stroke="#ec4899" strokeWidth="2" strokeDasharray="4"/>
    
    <rect x="100" y="180" width="600" height="80" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6"/>
    <text x="400" y="205" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Barrier Coordination Flow</text>
    <text x="400" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">1. Consumer calls barrier.waitFor(nextSequence)</text>
    <text x="400" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">{`2. Barrier checks cursor {'>'}= nextSequence using WaitStrategy`}</text>
    <text x="400" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9">3. Returns available sequence, consumer processes events up to that point</text>
  </svg>
)

// Memory Barrier Diagram
const MemoryBarrierDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Memory Barriers in Disruptor</text>
    
    <rect x="50" y="50" width="320" height="180" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="210" y="75" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Without Barrier (Broken)</text>
    
    <rect x="70" y="95" width="130" height="35" rx="4" fill="#ef4444"/>
    <text x="135" y="117" textAnchor="middle" fill="white" fontSize="9">Write event data</text>
    
    <rect x="70" y="140" width="130" height="35" rx="4" fill="#ef4444"/>
    <text x="135" y="162" textAnchor="middle" fill="white" fontSize="9">Write sequence</text>
    
    <text x="210" y="120" fill="#f87171" fontSize="20">⚠️</text>
    <text x="280" y="120" fill="#94a3b8" fontSize="9">CPU may</text>
    <text x="280" y="135" fill="#94a3b8" fontSize="9">reorder!</text>
    
    <text x="210" y="200" textAnchor="middle" fill="#f87171" fontSize="9">Consumer sees sequence before data!</text>
    
    <rect x="430" y="50" width="320" height="180" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">With Barrier (Correct)</text>
    
    <rect x="450" y="95" width="130" height="35" rx="4" fill="#22c55e"/>
    <text x="515" y="117" textAnchor="middle" fill="white" fontSize="9">Write event data</text>
    
    <rect x="600" y="95" width="130" height="35" rx="4" fill="#f59e0b"/>
    <text x="665" y="112" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">StoreStore</text>
    <text x="665" y="125" textAnchor="middle" fill="#fef3c7" fontSize="8">barrier</text>
    
    <rect x="450" y="145" width="130" height="35" rx="4" fill="#22c55e"/>
    <text x="515" y="162" textAnchor="middle" fill="white" fontSize="9">setVolatile(seq)</text>
    
    <text x="590" y="200" textAnchor="middle" fill="#4ade80" fontSize="9">Volatile write = StoreStore + StoreLoad barrier</text>
    
    <text x="400" y="250" textAnchor="middle" fill="#64748b" fontSize="9">Disruptor uses volatile writes on publish() to ensure event data is visible before sequence update</text>
  </svg>
)

// False Sharing Diagram
const FalseSharingDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`False Sharing Problem & Solution`}</text>
    
    <rect x="50" y="50" width="320" height="200" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="210" y="75" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">❌ False Sharing</text>
    
    <rect x="70" y="95" width="280" height="50" rx="4" fill="#1e293b" stroke="#ef4444" strokeWidth="2"/>
    <text x="210" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Cache Line (64 bytes)</text>
    
    <rect x="80" y="105" width="80" height="30" rx="3" fill="#ef4444"/>
    <text x="120" y="125" textAnchor="middle" fill="white" fontSize="8">Seq A</text>
    
    <rect x="170" y="105" width="80" height="30" rx="3" fill="#f59e0b"/>
    <text x="210" y="125" textAnchor="middle" fill="white" fontSize="8">Seq B</text>
    
    <rect x="260" y="105" width="80" height="30" rx="3" fill="#3b82f6"/>
    <text x="300" y="125" textAnchor="middle" fill="white" fontSize="8">Seq C</text>
    
    <text x="210" y="170" textAnchor="middle" fill="#f87171" fontSize="9">Thread 1 writes Seq A</text>
    <text x="210" y="185" textAnchor="middle" fill="#f87171" fontSize="9">→ Invalidates entire cache line</text>
    <text x="210" y="200" textAnchor="middle" fill="#f87171" fontSize="9">{`→ Thread 2 & 3 must reload!`}</text>
    <text x="210" y="220" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">~100x slower</text>
    
    <rect x="430" y="50" width="320" height="200" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">✓ Padded Sequences</text>
    
    <rect x="450" y="95" width="90" height="50" rx="4" fill="#22c55e" stroke="#4ade80"/>
    <text x="495" y="115" textAnchor="middle" fill="white" fontSize="8">Seq A</text>
    <text x="495" y="130" textAnchor="middle" fill="#bbf7d0" fontSize="7">64 bytes</text>
    
    <rect x="550" y="95" width="90" height="50" rx="4" fill="#f59e0b" stroke="#fbbf24"/>
    <text x="595" y="115" textAnchor="middle" fill="white" fontSize="8">Seq B</text>
    <text x="595" y="130" textAnchor="middle" fill="#fef3c7" fontSize="7">64 bytes</text>
    
    <rect x="650" y="95" width="90" height="50" rx="4" fill="#3b82f6" stroke="#60a5fa"/>
    <text x="695" y="115" textAnchor="middle" fill="white" fontSize="8">Seq C</text>
    <text x="695" y="130" textAnchor="middle" fill="#bfdbfe" fontSize="7">64 bytes</text>
    
    <text x="590" y="170" textAnchor="middle" fill="#4ade80" fontSize="9">Each sequence = own cache line</text>
    <text x="590" y="185" textAnchor="middle" fill="#4ade80" fontSize="9">No cross-invalidation</text>
    <text x="590" y="200" textAnchor="middle" fill="#4ade80" fontSize="9">Threads work independently</text>
    <text x="590" y="220" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Full speed</text>
    
    <text x="400" y="270" textAnchor="middle" fill="#64748b" fontSize="9">@Contended annotation or manual padding with 7 longs before and after the value</text>
  </svg>
)

// Trading Integration Diagram
const TradingIntegrationDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="tradingArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Disruptor in Trading System Architecture</text>
    <rect x="30" y="60" width="90" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="75" y="82" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Market Data</text>
    <text x="75" y="97" textAnchor="middle" fill="#bfdbfe" fontSize="8">Feed</text>
    <rect x="150" y="50" width="100" height="65" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Input</text>
    <text x="200" y="90" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Disruptor</text>
    <line x1="120" y1="82" x2="145" y2="82" stroke="#4ade80" strokeWidth="2" markerEnd="url(#tradingArrow)"/>
    <rect x="280" y="50" width="70" height="30" rx="4" fill="#f59e0b"/>
    <text x="315" y="70" textAnchor="middle" fill="white" fontSize="8">Journal</text>
    <rect x="280" y="85" width="70" height="30" rx="4" fill="#8b5cf6"/>
    <text x="315" y="105" textAnchor="middle" fill="white" fontSize="8">Replicate</text>
    <rect x="380" y="55" width="90" height="55" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="425" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Business</text>
    <text x="425" y="95" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Logic</text>
    <rect x="500" y="50" width="100" height="65" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="550" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Output</text>
    <text x="550" y="90" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Disruptor</text>
    <rect x="630" y="60" width="80" height="45" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="670" y="82" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Exchange</text>
    <text x="670" y="97" textAnchor="middle" fill="#a5f3fc" fontSize="8">Gateway</text>
    <line x1="600" y1="82" x2="625" y2="82" stroke="#4ade80" strokeWidth="2" markerEnd="url(#tradingArrow)"/>
    <rect x="150" y="140" width="500" height="55" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155"/>
    <text x="400" y="165" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">{`End-to-End Latency: &lt;100μs (p99)`}</text>
    <text x="400" y="185" textAnchor="middle" fill="#64748b" fontSize="9">Based on LMAX Exchange - 6 million orders/second</text>
  </svg>
)

function DisruptorPattern({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'ring-buffer',
      name: 'Ring Buffer',
      icon: '💫',
      color: '#22c55e',
      description: 'The core data structure of LMAX Disruptor - a pre-allocated circular array (power-of-2 size) enabling zero-allocation publishing, bitwise index calculation, and cache-friendly sequential access. Events are created once at startup and reused indefinitely, eliminating GC pressure on the hot path.',
      diagram: RingBufferDiagram,
      details: [
        {
          name: 'Ring Buffer Basics',
          diagram: RingBufferDiagram,
          explanation: 'The Ring Buffer is a fixed-size circular array where events are pre-allocated at startup using an EventFactory. The size MUST be a power of 2 (e.g., 1024, 65536) to enable fast index calculation using bitwise AND instead of expensive modulo division. Events are NEVER deallocated or garbage collected - they are continuously reused via the EventTranslator pattern. The producer claims slots by incrementing a sequence number, writes data into the pre-allocated event object, then publishes by updating the cursor sequence with a memory barrier to ensure visibility to consumers.',
          codeExample: `// Creating a Disruptor with Ring Buffer
import com.lmax.disruptor.*;
import com.lmax.disruptor.dsl.Disruptor;

public class OrderEvent {
    private long orderId;
    private String symbol;
    private long price;
    
    public void set(long orderId, String symbol, long price) {
        this.orderId = orderId;
        this.symbol = symbol;
        this.price = price;
    }
}

// Setup
Disruptor<OrderEvent> disruptor = new Disruptor<>(
    OrderEvent::new,           // Factory
    1024 * 64,                 // Buffer size (power of 2)
    DaemonThreadFactory.INSTANCE,
    ProducerType.SINGLE,
    new BusySpinWaitStrategy()
);`
        },
        {
          name: 'Event Publishing',
          diagram: RingBufferDiagram,
          explanation: 'Events are published using the EventTranslator pattern which guarantees zero-allocation on the hot path - critical for low-latency trading systems. The two-phase commit process: (1) Claim the next sequence slot from the Sequencer, (2) Get the pre-allocated event at that index, (3) Populate event fields via translator, (4) Publish the sequence with a memory barrier. Batch publishing (claiming multiple slots at once) significantly improves throughput by amortizing the cost of sequence coordination across multiple events.',
          codeExample: `// Zero-allocation publishing
RingBuffer<OrderEvent> ringBuffer = disruptor.getRingBuffer();

// Method 1: EventTranslator (recommended)
EventTranslatorThreeArg<OrderEvent, Long, String, Long> TRANSLATOR = 
    (event, seq, orderId, symbol, price) -> event.set(orderId, symbol, price);

ringBuffer.publishEvent(TRANSLATOR, 123L, "AAPL", 15000L);

// Method 2: Two-phase publish
long sequence = ringBuffer.next();
try {
    OrderEvent event = ringBuffer.get(sequence);
    event.set(123L, "AAPL", 15000L);
} finally {
    ringBuffer.publish(sequence);
}`
        }
      ]
    },
    {
      id: 'wait-strategies',
      name: 'Wait Strategies',
      icon: '⏱️',
      color: '#3b82f6',
      description: 'Pluggable strategies controlling how consumers wait for new events from producers. The choice represents a fundamental trade-off between latency (how quickly consumers react) and CPU usage (resource consumption when idle). Ranges from BusySpinWaitStrategy (~10ns latency, 100% CPU) to BlockingWaitStrategy (~10μs latency, 0% CPU when idle).',
      diagram: WaitStrategyDiagram,
      details: [
        {
          name: 'BusySpinWaitStrategy',
          diagram: WaitStrategyDiagram,
          explanation: 'The lowest latency wait strategy achieving ~10 nanosecond response times. The consumer thread continuously spins in a tight loop checking the sequence value, consuming 100% of a CPU core. Best suited for latency-critical trading systems with dedicated/isolated CPU cores (using isolcpus kernel parameter). The Thread.onSpinWait() intrinsic (Java 9+) provides a hint to the CPU that this is a spin-wait loop, enabling power optimizations on modern processors without sacrificing wake-up latency.',
          codeExample: `// BusySpinWaitStrategy - Lowest latency
new Disruptor<>(
    OrderEvent::new,
    bufferSize,
    threadFactory,
    ProducerType.SINGLE,
    new BusySpinWaitStrategy()  // Spins checking sequence
);

// Custom with onSpinWait hint
while ((available = dependentSequence.get()) < sequence) {
    Thread.onSpinWait();  // CPU hint
}`
        },
        {
          name: 'YieldingWaitStrategy',
          diagram: WaitStrategyDiagram,
          explanation: 'A balanced wait strategy achieving ~100 nanosecond latency while being more CPU-friendly than BusySpin. Initially spins for a configurable number of iterations checking the sequence, then calls Thread.yield() to give other threads a chance to run. The yielding thread remains runnable and quickly resumes when the OS scheduler returns control. Ideal for most trading applications where sub-microsecond latency is needed but dedicated cores are not available.',
          codeExample: `// YieldingWaitStrategy - Balanced
new Disruptor<>(
    OrderEvent::new,
    bufferSize,
    threadFactory,
    ProducerType.SINGLE,
    new YieldingWaitStrategy()
);

// Spins for a while, then yields
if (counter == 0) {
    Thread.yield();
} else {
    counter--;
}`
        },
        {
          name: 'SleepingWaitStrategy',
          diagram: WaitStrategyDiagram,
          explanation: 'A progressive backoff strategy achieving ~1 microsecond latency with minimal CPU usage. Implements a three-phase approach: (1) Spin for N iterations, (2) Yield for M iterations, (3) Sleep using LockSupport.parkNanos(). Configurable parameters control the duration of each phase. Best for batch processing, market data aggregation, or any scenario where microsecond latency is acceptable and CPU efficiency is prioritized over raw speed.',
          codeExample: `// SleepingWaitStrategy - Low CPU
new Disruptor<>(
    OrderEvent::new,
    bufferSize,
    threadFactory,
    ProducerType.SINGLE,
    new SleepingWaitStrategy(100, 50, 1000)  // spins, yields, sleepNs
);`
        },
        {
          name: 'BlockingWaitStrategy',
          diagram: WaitStrategyDiagram,
          explanation: 'Uses ReentrantLock and Condition.await() for true blocking with ~10 microsecond wake-up latency. Consumes zero CPU cycles when waiting - the thread is parked by the OS until signaled. Best for non-latency-critical consumers such as logging handlers, metrics collectors, or audit trail writers. NOT recommended for the trading hot path due to the context switch overhead, but excellent for background processing where resource efficiency matters more than speed.',
          codeExample: `// BlockingWaitStrategy - Zero CPU when idle
new Disruptor<>(
    LogEvent::new,
    bufferSize,
    threadFactory,
    ProducerType.MULTI,
    new BlockingWaitStrategy()  // OK for logging
);`
        }
      ]
    },
    {
      id: 'event-handlers',
      name: 'Event Handlers',
      icon: '⚙️',
      color: '#8b5cf6',
      description: 'Flexible consumer patterns for processing events from the ring buffer. Supports parallel execution (multiple handlers process same event independently), sequential pipelines (handler chains with dependencies), diamond topologies (fan-out/fan-in), and worker pools (load-balanced processing). Each handler runs on its own dedicated thread with its own sequence tracker.',
      diagram: EventPipelineDiagram,
      details: [
        {
          name: 'EventHandler Interface',
          diagram: EventPipelineDiagram,
          explanation: 'The core consumer interface with onEvent(E event, long sequence, boolean endOfBatch) method. The sequence parameter provides the event\'s position in the ring buffer (useful for ordering/deduplication). The endOfBatch flag indicates this is the last available event - critical for batching optimizations like flushing network buffers, committing database transactions, or publishing aggregated results. Each handler runs on a dedicated thread managed by the Disruptor, with its own Sequence tracking progress.',
          codeExample: `public class OrderProcessor implements EventHandler<OrderEvent> {
    private List<Trade> pending = new ArrayList<>();
    
    @Override
    public void onEvent(OrderEvent event, long sequence, boolean endOfBatch) {
        Trade trade = processOrder(event);
        if (trade != null) pending.add(trade);
        
        if (endOfBatch && !pending.isEmpty()) {
            publisher.publishAll(pending);
            pending.clear();
        }
    }
}`
        },
        {
          name: 'Parallel Handlers',
          diagram: EventPipelineDiagram,
          explanation: 'The handleEventsWith() method configures multiple handlers to process events in parallel - each handler sees EVERY event independently on its own thread. The producer only waits for the slowest handler (gating sequence = minimum of all handler sequences). Ideal for independent operations that can run concurrently: journaling to disk, replicating to standby, updating metrics, and executing business logic. No synchronization needed between parallel handlers.',
          codeExample: `// Parallel handlers - all process every event
disruptor.handleEventsWith(
    new JournalingHandler(),
    new ReplicationHandler(),
    new BusinessLogicHandler()
);`
        },
        {
          name: 'Sequential Handlers',
          diagram: EventPipelineDiagram,
          explanation: 'The then() method creates sequential dependencies between handlers - the downstream handler waits for the upstream handler to complete processing each event before proceeding. Creates a SequenceBarrier that tracks the upstream handler\'s sequence. Perfect for pipelines where order matters: decode raw bytes → validate message → enrich with reference data → execute business logic → publish results. Each stage can still run on its own thread for CPU parallelism.',
          codeExample: `// Sequential pipeline
disruptor
    .handleEventsWith(new DecodeHandler())
    .then(new ProcessHandler())
    .then(new PublishHandler());`
        },
        {
          name: 'Diamond Pattern',
          diagram: EventPipelineDiagram,
          explanation: 'Combines parallel and sequential patterns: fan-out to multiple parallel handlers, then fan-in to an aggregator that waits for ALL parallel handlers to complete. The aggregator\'s SequenceBarrier tracks the minimum sequence across all upstream handlers. Use case: parallel risk calculations (market risk, credit risk, liquidity risk) that must all complete before the final risk decision. WorkerPool provides load-balanced processing where each event goes to exactly ONE worker (round-robin or work-stealing).',
          codeExample: `// Diamond: fan-out then fan-in
disruptor.handleEventsWith(handler1, handler2)
         .then(aggregator);

// Worker pool for load balancing
disruptor.handleEventsWithWorkerPool(
    new Worker(), new Worker(), new Worker()
);`
        }
      ]
    },
    {
      id: 'single-writer',
      name: 'Single Writer Principle',
      icon: '✍️',
      color: '#f59e0b',
      description: 'The fundamental design principle behind Disruptor\'s performance: only ONE thread ever writes to any given variable. This eliminates the need for locks, CAS loops, and memory barriers on the write path. Combined with cache line padding, it prevents false sharing and enables predictable, consistent low-latency performance.',
      diagram: SingleWriterDiagram,
      details: [
        {
          name: 'Why Single Writer',
          diagram: SingleWriterDiagram,
          explanation: 'Multiple writers competing for the same variable cause CAS (Compare-And-Swap) retry loops and cache line bouncing between CPU cores - each failed CAS requires re-reading the value from another core\'s cache. Single writer eliminates ALL contention: the writer simply increments and stores without any atomic operations. Only a memory barrier on publish() ensures visibility to readers. Readers can safely read the volatile sequence without any synchronization, achieving true lock-free operation with predictable latency.',
          codeExample: `// Single writer - no locks needed
public class SingleWriterSequencer {
    private final Sequence cursor = new Sequence(-1);
    
    public long next() {
        long next = cursor.get() + 1;
        // No CAS needed - single writer
        cursor.set(next);
        return next;
    }
    
    public void publish(long sequence) {
        // Memory barrier makes visible to readers
        cursor.setVolatile(sequence);
    }
}`
        },
        {
          name: 'Cache Line Padding',
          diagram: SingleWriterDiagram,
          explanation: 'Cache lines are typically 64 bytes on modern CPUs. Without padding, multiple Sequence objects could share the same cache line, causing false sharing - when one thread writes its sequence, it invalidates the entire cache line, forcing other threads to reload their unrelated sequences from main memory. Disruptor pads each Sequence with 7 longs (56 bytes) before AND after the value field, guaranteeing isolation. The @Contended annotation (JDK 8+, requires -XX:-RestrictContended) provides automatic padding.',
          codeExample: `// Padded sequence prevents false sharing
public class PaddedSequence {
    // 7 longs = 56 bytes padding before
    long p1, p2, p3, p4, p5, p6, p7;
    
    volatile long value;  // The actual sequence
    
    // 7 longs = 56 bytes padding after
    long p8, p9, p10, p11, p12, p13, p14;
}

// Or use @Contended (JDK 8+)
@sun.misc.Contended
public class Sequence {
    volatile long value;
}`
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: '🚀',
      color: '#ef4444',
      description: 'Disruptor achieves 25+ million operations per second with sub-microsecond latency - 6x faster than ArrayBlockingQueue and 10x faster than LinkedBlockingQueue. Key optimizations: pre-allocated events (zero GC), single writer principle (no CAS), cache line padding (no false sharing), power-of-2 sizing (bitwise index), and mechanical sympathy (CPU cache-friendly access patterns).',
      diagram: BenchmarkDiagram,
      details: [
        {
          name: 'Benchmark Results',
          diagram: BenchmarkDiagram,
          explanation: 'In standardized benchmarks (single producer, single consumer, 64-byte messages), Disruptor achieves ~25 million ops/sec compared to ~4M for ArrayBlockingQueue, ~5M for LinkedBlockingQueue, and ~2M for SynchronousQueue. The 6x improvement comes from: (1) Pre-allocated events eliminating GC pauses, (2) Single writer avoiding CAS contention, (3) Cache line padding preventing false sharing, (4) Power-of-2 buffer size enabling bitwise AND for index calculation, (5) Sequential memory access patterns maximizing CPU cache hits.',
          codeExample: `// Why Disruptor is fast:
// 1. Pre-allocated events - no GC on hot path
// 2. Single writer - no CAS contention
// 3. Cache line padding - no false sharing
// 4. Power of 2 size - bitwise AND for index
// 5. Sequence barriers - no locks

// Index calculation
int index = (int)(sequence & (bufferSize - 1));
// vs modulo: sequence % bufferSize (slower)`
        },
        {
          name: 'Latency Optimization',
          diagram: BenchmarkDiagram,
          explanation: 'Production tuning for sub-microsecond latency: (1) Use BusySpinWaitStrategy with dedicated CPU cores isolated via isolcpus kernel parameter, (2) Pin threads to specific cores using thread affinity (Java-Thread-Affinity library), (3) Pre-touch all memory pages at startup with -XX:+AlwaysPreTouch to avoid page faults, (4) Use low-pause GC (ZGC or Shenandoah) or design for zero allocation on hot path, (5) Disable biased locking (-XX:-UseBiasedLocking), (6) Pre-warm the JIT by running through all code paths before going live.',
          codeExample: `// Production tuning
// 1. CPU isolation
// isolcpus=4,5,6,7 in kernel params

// 2. Thread affinity
Affinity.setAffinity(4);  // Pin to core 4

// 3. JVM flags
// -XX:+UseZGC -XX:+AlwaysPreTouch
// -XX:-UseBiasedLocking

// 4. Pre-warm
for (int i = 0; i < bufferSize; i++) {
    ringBuffer.get(i);  // Touch all cache lines
}`
        }
      ]
    },
    {
      id: 'trading-integration',
      name: 'Trading Systems',
      icon: '📈',
      color: '#06b6d4',
      description: 'Real-world deployment in electronic trading: LMAX Exchange processes 6 million orders per second with p99 latency under 100 microseconds. The architecture uses input/output Disruptors with parallel journaling, replication, and business logic handlers. Single-threaded business logic eliminates locks in the matching engine, enabling deterministic replay for disaster recovery.',
      diagram: TradingIntegrationDiagram,
      details: [
        {
          name: 'LMAX Architecture',
          diagram: TradingIntegrationDiagram,
          explanation: 'The LMAX Exchange architecture: Input Disruptor receives market data and order flow from network handlers. Three parallel handlers process each event: (1) Journaler persists to disk for durability, (2) Replicator sends to standby for high availability, (3) Business Logic Processor executes the matching engine. The BLP is SINGLE-THREADED - no locks needed in the order book! After matching, an Output Disruptor publishes execution reports and market data updates to exchange gateways. This architecture achieves 6M orders/sec with deterministic replay capability.',
          codeExample: `// LMAX-style trading engine
Disruptor<OrderEvent> inputDisruptor = createDisruptor();

// Parallel: journal + replicate
// Then: business logic
inputDisruptor
    .handleEventsWith(journaler, replicator)
    .then(businessLogic);

// Business logic publishes to output
Disruptor<TradeEvent> outputDisruptor = createDisruptor();
outputDisruptor.handleEventsWith(exchangeGateway);`
        },
        {
          name: 'Order Book Example',
          diagram: TradingIntegrationDiagram,
          explanation: 'The order book maintains sorted bid/ask price levels with quantity at each level. The Disruptor feeds orders to a single-threaded matching engine that processes new orders, cancellations, and modifications. Because it\'s single-threaded, the order book data structures (TreeMap for price levels, LinkedList for time priority) need NO synchronization - dramatically simplifying the code and eliminating lock contention. Fills are published to an output Disruptor for downstream processing: trade reporting, position updates, and client notifications.',
          codeExample: `public class OrderBookHandler implements EventHandler<OrderEvent> {
    private final OrderBook book = new OrderBook();
    private final RingBuffer<TradeEvent> output;
    
    @Override
    public void onEvent(OrderEvent event, long seq, boolean endOfBatch) {
        List<Fill> fills = book.processOrder(
            event.getOrderId(),
            event.getSide(),
            event.getPrice(),
            event.getQuantity()
        );
        
        for (Fill fill : fills) {
            output.publishEvent((e, s) -> e.set(fill));
        }
    }
}`
        }
      ]
    },
    {
      id: 'sequence-internals',
      name: 'Sequence Internals',
      icon: '🔢',
      color: '#10b981',
      description: 'Deep dive into the Sequence class - the fundamental building block of Disruptor. A padded volatile long (120 bytes total) that tracks producer cursor and consumer progress. Uses VarHandle for low-level memory operations with different semantics: plain writes for single-writer, volatile for visibility, release for ordered stores, and CAS for multi-producer coordination.',
      diagram: SequenceInternalsDiagram,
      details: [
        {
          name: 'Sequence Class Structure',
          diagram: SequenceInternalsDiagram,
          explanation: 'The Sequence class wraps a volatile long with 56 bytes of padding (7 longs) on EACH side, totaling 120 bytes. This guarantees the value field occupies its own 64-byte cache line regardless of object alignment. The inheritance hierarchy (LhsPadding -> Value -> RhsPadding -> Sequence) prevents the JVM from optimizing away the padding fields. Initial value is -1L (not 0) so that sequence 0 represents the first valid event, enabling simple "has data" checks with sequence >= 0.',
          codeExample: `// Actual Disruptor Sequence implementation
abstract class RhsPadding extends Value {
    protected long p9, p10, p11, p12, p13, p14, p15;
}

abstract class Value extends LhsPadding {
    protected volatile long value;
}

abstract class LhsPadding {
    protected long p1, p2, p3, p4, p5, p6, p7;
}

public class Sequence extends RhsPadding {
    static final long INITIAL_VALUE = -1L;
    private static final VarHandle VALUE;
    
    public Sequence() { this(INITIAL_VALUE); }
    public Sequence(long initialValue) { 
        VALUE.setRelease(this, initialValue); 
    }
}`
        },
        {
          name: 'Sequence Operations',
          diagram: SequenceInternalsDiagram,
          explanation: 'Sequence provides multiple memory access modes via VarHandle: get() performs a volatile read seeing the latest published value across all cores. set() is a plain write with no barriers - ONLY safe when you are the single writer. setVolatile() provides a full memory fence (StoreStore + StoreLoad). setRelease() provides only StoreStore barrier - cheaper than volatile, sufficient for publishing. compareAndSet() performs atomic CAS for multi-producer coordination. addAndGet() atomically increments for sequence claiming.',
          codeExample: `public class Sequence {
    // Volatile read - sees latest published value
    public long get() {
        return value;  // volatile read
    }
    
    // Plain write - only safe for single writer
    public void set(long value) {
        VALUE.set(this, value);  // no barrier
    }
    
    // Volatile write - full memory barrier
    public void setVolatile(long value) {
        VALUE.setVolatile(this, value);
    }
    
    // Release write - StoreStore barrier only
    public void setRelease(long value) {
        VALUE.setRelease(this, value);
    }
    
    // CAS - for multi-producer coordination
    public boolean compareAndSet(long expected, long newValue) {
        return VALUE.compareAndSet(this, expected, newValue);
    }
    
    // Atomic increment
    public long addAndGet(long increment) {
        return VALUE.getAndAdd(this, increment) + increment;
    }
}`
        },
        {
          name: 'VarHandle vs Unsafe',
          diagram: SequenceInternalsDiagram,
          explanation: 'Modern Disruptor (4.0+) uses java.lang.invoke.VarHandle instead of the deprecated sun.misc.Unsafe. VarHandle provides identical low-level memory operations (plain, volatile, acquire, release, CAS) with compile-time type safety, official JDK support, and better JIT optimization opportunities. The migration is transparent - same semantics, same performance, but future-proof. VarHandle also enables access mode polymorphism: choose the cheapest barrier that meets your consistency requirements.',
          codeExample: `// Old way - sun.misc.Unsafe (deprecated)
private static final Unsafe UNSAFE = getUnsafe();
private static final long VALUE_OFFSET;
static {
    VALUE_OFFSET = UNSAFE.objectFieldOffset(
        Sequence.class.getDeclaredField("value"));
}
UNSAFE.putOrderedLong(this, VALUE_OFFSET, value);

// New way - VarHandle (Java 9+)
private static final VarHandle VALUE;
static {
    VALUE = MethodHandles.lookup()
        .findVarHandle(Sequence.class, "value", long.class);
}
VALUE.setRelease(this, value);  // Same semantics, safer API`
        }
      ]
    },
    {
      id: 'ringbuffer-internals',
      name: 'RingBuffer Internals',
      icon: '💿',
      color: '#f472b6',
      description: 'Internal structure of the RingBuffer: a pre-allocated Object[] holding events created at startup via EventFactory, an indexMask (bufferSize-1) for O(1) bitwise index calculation, and a Sequencer (Single or Multi producer) for coordination. The RingBuffer itself is padded to prevent false sharing with adjacent heap objects. Zero allocation on the hot path - events are reused indefinitely.',
      diagram: RingBufferInternalsDiagram,
      details: [
        {
          name: 'RingBuffer Structure',
          diagram: RingBufferInternalsDiagram,
          explanation: 'RingBuffer contains four key fields: (1) Object[] entries - pre-allocated events created by EventFactory at construction, (2) Sequencer - either SingleProducerSequencer or MultiProducerSequencer for claiming slots, (3) indexMask = bufferSize-1 for fast modulo via bitwise AND, (4) bufferSize - MUST be power of 2. The class itself has padding fields (p1-p7 before, p8-p14 after) to prevent false sharing with adjacent objects on the heap. Events are NEVER garbage collected - they are continuously overwritten and reused.',
          codeExample: `public final class RingBuffer<E> implements Cursored, EventSequencer<E> {
    // Padding to prevent false sharing with adjacent objects
    protected long p1, p2, p3, p4, p5, p6, p7;
    
    private final int indexMask;           // bufferSize - 1
    private final Object[] entries;        // Pre-allocated events
    private final int bufferSize;          // Must be power of 2
    private final Sequencer sequencer;     // Single or Multi producer
    
    protected long p8, p9, p10, p11, p12, p13, p14;
    
    RingBuffer(EventFactory<E> factory, Sequencer sequencer) {
        this.sequencer = sequencer;
        this.bufferSize = sequencer.getBufferSize();
        this.indexMask = bufferSize - 1;
        this.entries = new Object[bufferSize];
        
        // Pre-allocate all events
        for (int i = 0; i < bufferSize; i++) {
            entries[i] = factory.newInstance();
        }
    }
}`
        },
        {
          name: 'Index Calculation',
          diagram: RingBufferInternalsDiagram,
          explanation: 'Index calculation uses bitwise AND: sequence & indexMask, which is equivalent to sequence % bufferSize but executes in a single CPU cycle vs expensive division. This ONLY works because bufferSize is constrained to powers of 2. Example: bufferSize=1024, indexMask=1023 (binary: 1111111111). Sequence 0 maps to index 0, sequence 1023 to index 1023, sequence 1024 wraps to index 0, sequence 2047 to index 1023, etc. The circular nature means old events are overwritten - consumers must keep up or data is lost.',
          codeExample: `// Fast index calculation
public E get(long sequence) {
    // sequence & indexMask is equivalent to sequence % bufferSize
    // but bitwise AND is a single CPU instruction
    return (E) entries[(int)(sequence & indexMask)];
}

// Why power of 2 works:
// bufferSize = 8 = 0b1000
// indexMask  = 7 = 0b0111
//
// sequence = 0:  0 & 7 = 0
// sequence = 1:  1 & 7 = 1
// sequence = 7:  7 & 7 = 7
// sequence = 8:  8 & 7 = 0  (wraps around!)
// sequence = 9:  9 & 7 = 1
// sequence = 15: 15 & 7 = 7
// sequence = 16: 16 & 7 = 0  (wraps again)

// Modulo comparison:
// index = sequence % bufferSize;  // Division - slow!
// index = sequence & indexMask;   // Bitwise AND - fast!`
        },
        {
          name: 'Event Publishing Internals',
          diagram: RingBufferInternalsDiagram,
          explanation: 'Publishing follows a strict two-phase commit protocol: Phase 1 (Claim) - sequencer.next() reserves the next sequence slot, blocking if buffer is full (consumers too slow). Phase 2 (Write) - get the pre-allocated event at that index and populate its fields via EventTranslator. Phase 3 (Publish) - sequencer.publish() updates the cursor with a memory barrier, making the event visible to consumers. The try-finally ensures publish() is called even if translation throws. Batch publishing claims multiple slots atomically for higher throughput.',
          codeExample: `// Two-phase publish (internal flow)
public void publishEvent(EventTranslator<E> translator) {
    // Phase 1: Claim next sequence
    long sequence = sequencer.next();
    
    try {
        // Phase 2: Get event and translate
        E event = get(sequence);
        translator.translateTo(event, sequence);
    } finally {
        // Phase 3: Publish (memory barrier)
        sequencer.publish(sequence);
    }
}

// Batch publishing for higher throughput
public void publishEvents(EventTranslator<E>[] translators) {
    int batchSize = translators.length;
    long finalSequence = sequencer.next(batchSize);
    long initialSequence = finalSequence - (batchSize - 1);
    
    try {
        for (long seq = initialSequence; seq <= finalSequence; seq++) {
            E event = get(seq);
            translators[(int)(seq - initialSequence)]
                .translateTo(event, seq);
        }
    } finally {
        sequencer.publish(initialSequence, finalSequence);
    }
}`
        }
      ]
    },
    {
      id: 'sequencer-internals',
      name: 'Sequencer Internals',
      icon: '🎛️',
      color: '#a855f7',
      description: 'The Sequencer is responsible for claiming slots and coordinating between producers and consumers. SingleProducerSequencer uses plain writes (~3x faster) while MultiProducerSequencer uses CAS loops for thread-safety. Both track gating sequences to prevent overwriting unprocessed events. The choice between them is the most important performance decision in Disruptor configuration.',
      diagram: SequencerInternalsDiagram,
      details: [
        {
          name: 'SingleProducerSequencer',
          diagram: SequencerInternalsDiagram,
          explanation: 'Optimized for the single-producer case - NO CAS operations needed! The next() method simply increments a cached nextValue field using a plain write (single writer principle). It caches the minimum gating sequence to avoid repeatedly scanning all consumers. Only when approaching the wrap point does it re-check consumer progress. publish() uses setRelease() for a StoreStore barrier, ensuring event data is visible before the cursor update. Approximately 3x faster than MultiProducerSequencer due to zero contention.',
          codeExample: `public final class SingleProducerSequencer extends AbstractSequencer {
    // Cached values to avoid volatile reads
    protected long nextValue = Sequence.INITIAL_VALUE;
    protected long cachedValue = Sequence.INITIAL_VALUE;
    
    @Override
    public long next(int n) {
        long nextValue = this.nextValue;
        long nextSequence = nextValue + n;
        
        // Check if we'd wrap past slowest consumer
        long wrapPoint = nextSequence - bufferSize;
        long cachedGatingSequence = this.cachedValue;
        
        if (wrapPoint > cachedGatingSequence || 
            cachedGatingSequence > nextValue) {
            // Must wait for consumers to catch up
            long minSequence;
            while (wrapPoint > (minSequence = 
                    Util.getMinimumSequence(gatingSequences, nextValue))) {
                LockSupport.parkNanos(1L);
            }
            this.cachedValue = minSequence;
        }
        
        this.nextValue = nextSequence;  // Plain write - single writer!
        return nextSequence;
    }
    
    @Override
    public void publish(long sequence) {
        cursor.setRelease(sequence);  // Memory barrier
    }
}`
        },
        {
          name: 'MultiProducerSequencer',
          diagram: SequencerInternalsDiagram,
          explanation: 'Thread-safe for multiple concurrent producers using a CAS (Compare-And-Swap) loop to claim sequences. Each producer atomically increments the cursor, retrying on contention. Uses an int[] availableBuffer to track which individual slots have been published - necessary because producers may publish out of order. The availableBuffer uses a clever flag scheme: flag = sequence >>> indexShift, allowing detection of whether a slot contains data from the current "lap" around the ring buffer. More complex and slower than single-producer, but essential for multi-threaded publishing.',
          codeExample: `public final class MultiProducerSequencer extends AbstractSequencer {
    private final int[] availableBuffer;  // Track published slots
    private final int indexMask;
    private final int indexShift;
    
    @Override
    public long next(int n) {
        long current;
        long next;
        
        do {
            current = cursor.get();
            next = current + n;
            
            // Check wrap point
            long wrapPoint = next - bufferSize;
            long cachedGatingSequence = gatingSequenceCache.get();
            
            if (wrapPoint > cachedGatingSequence || 
                cachedGatingSequence > current) {
                long gatingSequence = Util.getMinimumSequence(
                    gatingSequences, current);
                if (wrapPoint > gatingSequence) {
                    LockSupport.parkNanos(1L);
                    continue;  // Retry CAS
                }
                gatingSequenceCache.setRelease(gatingSequence);
            }
        } while (!cursor.compareAndSet(current, next));  // CAS loop!
        
        return next;
    }
    
    @Override
    public void publish(long sequence) {
        setAvailable(sequence);  // Mark slot as available
    }
    
    private void setAvailable(long sequence) {
        int index = (int)(sequence & indexMask);
        int flag = (int)(sequence >>> indexShift);
        availableBuffer[index] = flag;  // Volatile write
    }
}`
        },
        {
          name: 'Gating Sequences',
          diagram: SequencerInternalsDiagram,
          explanation: 'Gating sequences are the back-pressure mechanism preventing producers from overwriting events that consumers have not yet processed. The producer maintains an array of consumer Sequence references and calculates the minimum (slowest consumer). Before claiming a new slot, it checks: would this sequence wrap past the slowest consumer? If wrapPoint > minimumGatingSequence, the producer must wait (spin/yield/park based on strategy). This ensures no data loss but means slow consumers can block producers - size your buffer appropriately!',
          codeExample: `// Gating sequence coordination
public abstract class AbstractSequencer {
    protected final Sequence cursor = new Sequence(-1);
    protected volatile Sequence[] gatingSequences = new Sequence[0];
    
    // Add consumer sequences to track
    public void addGatingSequences(Sequence... sequences) {
        SequenceGroups.addSequences(this, SEQUENCE_UPDATER, 
            this, sequences);
    }
    
    // Get minimum sequence across all consumers
    public long getMinimumSequence() {
        return Util.getMinimumSequence(gatingSequences, cursor.get());
    }
}

// Utility to find minimum
public static long getMinimumSequence(Sequence[] sequences, long minimum) {
    for (Sequence sequence : sequences) {
        long value = sequence.get();
        minimum = Math.min(minimum, value);
    }
    return minimum;
}

// Producer check before claiming
long wrapPoint = nextSequence - bufferSize;
if (wrapPoint > minimumConsumerSequence) {
    // Would overwrite unprocessed event - must wait!
}`
        }
      ]
    },
    {
      id: 'barrier-internals',
      name: 'SequenceBarrier Internals',
      icon: '🚧',
      color: '#0ea5e9',
      description: 'SequenceBarrier is the consumer-side coordination mechanism. It combines the producer cursor, dependent handler sequences, and a WaitStrategy to determine when events are safe to process. The waitFor() method blocks until the requested sequence is available, returning the highest available sequence for batch processing. Supports graceful shutdown via the alert mechanism.',
      diagram: SequenceBarrierDiagram,
      details: [
        {
          name: 'SequenceBarrier Interface',
          diagram: SequenceBarrierDiagram,
          explanation: 'SequenceBarrier is the consumer\'s view of available events. The waitFor(sequence) method blocks until that sequence is available, checking BOTH the producer cursor (has it been published?) AND any dependent consumer sequences (have upstream handlers processed it?). Returns the highest available sequence, enabling batch processing of multiple events in one call. The alert mechanism allows graceful shutdown - setting alerted=true causes waitFor() to throw AlertException, breaking the consumer out of its processing loop.',
          codeExample: `public interface SequenceBarrier {
    // Wait for sequence to be available
    long waitFor(long sequence) throws AlertException, 
        InterruptedException, TimeoutException;
    
    // Get current cursor position
    long getCursor();
    
    // Check if alert flag is set
    boolean isAlerted();
    
    // Set alert flag to interrupt waiting
    void alert();
    
    // Clear alert flag
    void clearAlert();
    
    // Check alert and throw if set
    void checkAlert() throws AlertException;
}

// ProcessingSequenceBarrier implementation
final class ProcessingSequenceBarrier implements SequenceBarrier {
    private final WaitStrategy waitStrategy;
    private final Sequence dependentSequence;
    private volatile boolean alerted = false;
    private final Sequence cursorSequence;
    private final Sequencer sequencer;
}`
        },
        {
          name: 'waitFor() Implementation',
          diagram: SequenceBarrierDiagram,
          explanation: 'The waitFor() implementation: (1) Check alert flag for shutdown signal, (2) Delegate to WaitStrategy.waitFor() which implements the actual spin/yield/block logic, (3) For MultiProducerSequencer, verify all slots up to the returned sequence are actually published (producers may publish out of order), (4) Return the highest contiguous available sequence. The consumer then processes all events from its current position up to this sequence, updating its own Sequence afterward to signal progress to the producer and downstream handlers.',
          codeExample: `// ProcessingSequenceBarrier.waitFor()
public long waitFor(long sequence) throws AlertException, 
        InterruptedException, TimeoutException {
    checkAlert();  // Check for shutdown signal
    
    // Delegate to wait strategy
    long availableSequence = waitStrategy.waitFor(
        sequence, 
        cursorSequence,      // Producer cursor
        dependentSequence,   // Previous handler's sequence
        this                 // For alert checking
    );
    
    // For multi-producer, verify all slots are published
    if (availableSequence < sequence) {
        return availableSequence;
    }
    
    return sequencer.getHighestPublishedSequence(
        sequence, availableSequence);
}

// Consumer processing loop
public void run() {
    long nextSequence = sequence.get() + 1L;
    while (running) {
        long availableSequence = barrier.waitFor(nextSequence);
        
        // Process all available events
        while (nextSequence <= availableSequence) {
            E event = ringBuffer.get(nextSequence);
            handler.onEvent(event, nextSequence, 
                nextSequence == availableSequence);
            nextSequence++;
        }
        
        sequence.setRelease(availableSequence);
    }
}`
        },
        {
          name: 'Dependent Sequences',
          diagram: SequenceBarrierDiagram,
          explanation: 'Consumers can depend on other consumers, creating sophisticated processing pipelines. When handler B depends on handler A (via then()), B\'s SequenceBarrier tracks A\'s sequence. B can only process an event AFTER A has finished with it. The barrier calculates: availableSequence = min(producerCursor, dependentSequence). This enables patterns like: decode → validate → enrich → process → publish, where each stage runs on its own thread but maintains strict ordering guarantees.',
          codeExample: `// Creating dependent handlers
disruptor
    .handleEventsWith(journaler)  // First stage
    .then(processor)              // Depends on journaler
    .then(publisher);             // Depends on processor

// Internal barrier creation
SequenceBarrier barrier = ringBuffer.newBarrier(
    journaler.getSequence()  // Dependent sequence
);

// Barrier checks both producer and dependencies
long availableSequence = waitStrategy.waitFor(
    sequence,
    cursorSequence,      // Producer must have published
    dependentSequence,   // Previous handler must have processed
    this
);

// Minimum of producer cursor and dependent sequences
// determines what's safe to process
long available = Math.min(
    cursorSequence.get(),
    dependentSequence.get()
);`
        }
      ]
    },
    {
      id: 'memory-barriers',
      name: 'Memory Barriers',
      icon: '🧱',
      color: '#f59e0b',
      description: 'Memory barriers (fences) are CPU instructions that enforce ordering constraints on memory operations. Modern CPUs aggressively reorder instructions for performance - barriers prevent specific reorderings. Disruptor uses volatile writes (StoreStore + StoreLoad barriers) on publish() to ensure event data is visible before the sequence update. Understanding barriers is essential for writing correct lock-free code.',
      diagram: MemoryBarrierDiagram,
      details: [
        {
          name: 'Why Memory Barriers',
          diagram: MemoryBarrierDiagram,
          explanation: 'Modern CPUs execute instructions out-of-order for performance - a store to address A might complete after a store to address B even if A comes first in program order. Without barriers, a consumer might see the updated sequence number BEFORE the event data is written, reading stale/garbage data. Memory barriers force ordering: a StoreStore barrier ensures all stores before it complete before any stores after it. Disruptor\'s publish() uses setRelease() which includes a StoreStore barrier, guaranteeing event data is visible when the sequence becomes visible.',
          codeExample: `// Problem: CPU reordering
// Producer thread:
event.data = newData;     // Store 1
sequence.set(nextSeq);    // Store 2

// CPU might reorder to:
sequence.set(nextSeq);    // Store 2 (executed first!)
event.data = newData;     // Store 1

// Consumer sees sequence but stale data!

// Solution: Memory barrier
event.data = newData;           // Store 1
// --- StoreStore barrier ---
sequence.setVolatile(nextSeq);  // Store 2 with barrier

// Volatile write prevents reordering
// Consumer guaranteed to see data when it sees sequence`
        },
        {
          name: 'Java Memory Model',
          diagram: MemoryBarrierDiagram,
          explanation: 'The Java Memory Model (JMM) defines happens-before relationships that guarantee visibility across threads. Key rule: a volatile write happens-before any subsequent volatile read of the same variable. Disruptor exploits this: producer writes event data (non-volatile), then does a volatile write to cursor. Consumer does a volatile read of cursor, then reads event data. The JMM guarantees the consumer sees all writes that happened-before the volatile write - including the event data! This is why Disruptor is lock-free yet correct.',
          codeExample: `// Happens-before chain in Disruptor

// Producer:
event.setData(data);              // Action A
cursor.setVolatile(sequence);     // Action B (volatile write)

// Consumer:
long seq = cursor.get();          // Action C (volatile read)
Event e = ringBuffer.get(seq);    // Action D
process(e.getData());             // Action E

// Happens-before relationships:
// A happens-before B (program order)
// B happens-before C (volatile write -> read)
// C happens-before D happens-before E (program order)
//
// Therefore: A happens-before E
// Consumer sees producer's writes!

// This is why Disruptor is lock-free but still correct`
        },
        {
          name: 'Barrier Types',
          diagram: MemoryBarrierDiagram,
          explanation: 'Four barrier types control different reorderings: LoadLoad (loads before barrier complete before loads after), StoreStore (stores before complete before stores after), LoadStore (loads complete before stores), StoreLoad (stores complete before loads - most expensive). Volatile write = StoreStore + StoreLoad. Volatile read = LoadLoad + LoadStore. Disruptor optimizes by using setRelease() (StoreStore only) instead of full volatile when possible - sufficient for publishing since consumers use acquire semantics.',
          codeExample: `// Memory barrier types
// StoreStore: Ensures stores before barrier complete 
//             before stores after
// StoreLoad:  Ensures stores complete before loads
// LoadLoad:   Ensures loads before barrier complete 
//             before loads after
// LoadStore:  Ensures loads complete before stores

// VarHandle operations and their barriers:
VALUE.set(value);           // Plain - no barrier
VALUE.setRelease(value);    // StoreStore only (cheaper)
VALUE.setVolatile(value);   // StoreStore + StoreLoad (full)

VALUE.get();                // Plain - no barrier
VALUE.getAcquire();         // LoadLoad + LoadStore
VALUE.getVolatile();        // Full fence

// Disruptor optimization:
// Producer uses setRelease() - only needs StoreStore
// Consumer uses getAcquire() - only needs LoadLoad
// Cheaper than full volatile!`
        }
      ]
    },
    {
      id: 'false-sharing',
      name: 'False Sharing',
      icon: '🔥',
      color: '#ef4444',
      description: 'False sharing is a performance killer where threads on different CPU cores inadvertently contend for the same cache line (typically 64 bytes). When one thread writes, it invalidates that cache line on ALL other cores, forcing expensive cache coherency traffic. Disruptor eliminates false sharing by padding each Sequence to 120 bytes, guaranteeing isolation. This single optimization can provide 10x throughput improvement.',
      diagram: FalseSharingDiagram,
      details: [
        {
          name: 'What is False Sharing',
          diagram: FalseSharingDiagram,
          explanation: 'False sharing occurs when independent variables used by different threads happen to reside in the same 64-byte cache line. When Thread 1 writes variable A, the CPU\'s cache coherency protocol (MESI) invalidates the entire cache line on all other cores - even though Thread 2 only cares about variable B in that same line. Thread 2 must reload the entire line from L3 cache or main memory. With millions of operations per second, this "ping-pong" effect devastates performance - benchmarks show 10x slowdown compared to properly padded data.',
          codeExample: `// False sharing example - BAD!
public class Counter {
    volatile long count1;  // Thread 1 writes this
    volatile long count2;  // Thread 2 writes this
    // Both in same 64-byte cache line!
}

// Thread 1 increments count1
// -> Invalidates cache line on Core 2
// Thread 2 increments count2  
// -> Invalidates cache line on Core 1
// Repeat millions of times = SLOW!

// Benchmark results:
// With false sharing:    ~50M ops/sec
// Without false sharing: ~500M ops/sec
// 10x performance difference!`
        },
        {
          name: 'Padding Solution',
          diagram: FalseSharingDiagram,
          explanation: 'Disruptor\'s solution: pad each Sequence with 7 longs (56 bytes) BEFORE and AFTER the volatile value field. Total object size: 56 + 8 + 56 = 120 bytes. This guarantees the value field occupies its own cache line regardless of where the object is allocated in memory. The inheritance hierarchy (LhsPadding → Value → RhsPadding) prevents the JVM from optimizing away "unused" padding fields. Alternative: @Contended annotation (JDK 8+) with -XX:-RestrictContended flag lets the JVM handle padding automatically.',
          codeExample: `// Disruptor's padding approach
abstract class LhsPadding {
    // 7 longs = 56 bytes before value
    protected long p1, p2, p3, p4, p5, p6, p7;
}

abstract class Value extends LhsPadding {
    protected volatile long value;  // 8 bytes
}

abstract class RhsPadding extends Value {
    // 7 longs = 56 bytes after value
    protected long p9, p10, p11, p12, p13, p14, p15;
}

public class Sequence extends RhsPadding {
    // Total: 56 + 8 + 56 = 120 bytes
    // Guarantees value is in its own cache line
}

// Alternative: @Contended annotation (JDK 8+)
// Requires -XX:-RestrictContended JVM flag
@sun.misc.Contended
public class Sequence {
    volatile long value;
    // JVM automatically adds padding
}`
        },
        {
          name: 'RingBuffer Padding',
          diagram: FalseSharingDiagram,
          explanation: 'The RingBuffer class itself is also padded to prevent false sharing with adjacent objects on the Java heap. The inheritance hierarchy (RingBufferPad → RingBufferFields → RingBuffer) places padding before AND after the critical fields (entries array, sequencer reference, indexMask). This isolation ensures that when the RingBuffer is allocated next to other objects, its hot fields don\'t share cache lines with unrelated data. For maximum performance, consider also padding your Event class fields if multiple threads read different fields.',
          codeExample: `// RingBuffer padding
abstract class RingBufferPad {
    protected long p1, p2, p3, p4, p5, p6, p7;
}

abstract class RingBufferFields<E> extends RingBufferPad {
    // Buffer size must be power of 2
    private final int bufferSize;
    private final int indexMask;
    private final Object[] entries;
    private final Sequencer sequencer;
}

public final class RingBuffer<E> extends RingBufferFields<E> {
    // Padding after fields
    protected long p1, p2, p3, p4, p5, p6, p7;
    
    // This ensures RingBuffer fields don't share
    // cache lines with other objects
}

// Entry array elements are also spaced
// Each event object should be cache-line aligned
// Consider @Contended on event fields too`
        }
      ]
    }
  ]

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

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'eTrading', icon: '📈', page: 'eTrading' },
      { name: 'Disruptor Pattern', icon: '💫', page: 'Disruptor Pattern' }
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

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #164e63 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(6, 182, 212, 0.2)',
    border: '1px solid rgba(6, 182, 212, 0.3)',
    borderRadius: '0.5rem',
    color: '#22d3ee',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>💫 LMAX Disruptor Pattern</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(6, 182, 212, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(6, 182, 212, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to eTrading
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={TOPIC_COLORS}
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
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={TOPIC_COLORS}
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

export default DisruptorPattern

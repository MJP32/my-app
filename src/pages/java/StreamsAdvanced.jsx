/**
 * Advanced Java Streams - Tab Template Format
 *
 * Covers advanced Stream API concepts including:
 * - Collectors (grouping, partitioning, custom collectors)
 * - Stream Operations (flatMap, reduce, peek)
 * - Parallel Processing (parallel streams, fork-join)
 * - Stream Creation & Infinite Streams
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

const STREAMS_ADV_COLORS = {
  primary: '#06b6d4',           // Cyan
  primaryHover: '#22d3ee',      // Lighter cyan
  bg: 'rgba(6, 182, 212, 0.1)',
  border: 'rgba(6, 182, 212, 0.3)',
  arrow: '#06b6d4',
  hoverBg: 'rgba(6, 182, 212, 0.2)',
  topicBg: 'rgba(6, 182, 212, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const CollectorsPipelineDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="collector-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Collector Pipeline Flow
    </text>

    {/* Source */}
    <rect x="30" y="60" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Stream</text>
    <text x="80" y="98" textAnchor="middle" fill="#bfdbfe" fontSize="9">Source</text>

    {/* Supplier */}
    <rect x="180" y="60" width="100" height="50" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="230" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Supplier</text>
    <text x="230" y="98" textAnchor="middle" fill="#a5f3fc" fontSize="9">Create Container</text>

    {/* Accumulator */}
    <rect x="330" y="60" width="100" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="380" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Accumulator</text>
    <text x="380" y="98" textAnchor="middle" fill="#ddd6fe" fontSize="9">Add Elements</text>

    {/* Combiner */}
    <rect x="480" y="60" width="100" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="530" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Combiner</text>
    <text x="530" y="98" textAnchor="middle" fill="#fef3c7" fontSize="9">Merge Parallel</text>

    {/* Finisher */}
    <rect x="630" y="60" width="100" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="680" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Finisher</text>
    <text x="680" y="98" textAnchor="middle" fill="#bbf7d0" fontSize="9">Transform Result</text>

    {/* Arrows */}
    <line x1="130" y1="85" x2="175" y2="85" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#collector-arrow)"/>
    <line x1="280" y1="85" x2="325" y2="85" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#collector-arrow)"/>
    <line x1="430" y1="85" x2="475" y2="85" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#collector-arrow)"/>
    <line x1="580" y1="85" x2="625" y2="85" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#collector-arrow)"/>

    {/* Result */}
    <rect x="300" y="150" width="200" height="50" rx="8" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="400" y="175" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Collected Result</text>
    <text x="400" y="190" textAnchor="middle" fill="#67e8f9" fontSize="9">List, Map, Set, Custom</text>

    <line x1="680" y1="110" x2="680" y2="140" stroke="#06b6d4" strokeWidth="2"/>
    <line x1="680" y1="140" x2="505" y2="140" stroke="#06b6d4" strokeWidth="2"/>
    <line x1="505" y1="140" x2="505" y2="150" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#collector-arrow)"/>
  </svg>
)

const GroupingByDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="group-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Multi-Level Grouping with Collectors.groupingBy()
    </text>

    {/* Input List */}
    <rect x="30" y="60" width="150" height="180" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="105" y="85" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Employees List</text>

    <rect x="45" y="100" width="120" height="25" rx="4" fill="#1e40af"/>
    <text x="105" y="117" textAnchor="middle" fill="white" fontSize="9">Alice, IT, $75K</text>

    <rect x="45" y="130" width="120" height="25" rx="4" fill="#1e40af"/>
    <text x="105" y="147" textAnchor="middle" fill="white" fontSize="9">Bob, IT, $120K</text>

    <rect x="45" y="160" width="120" height="25" rx="4" fill="#1e40af"/>
    <text x="105" y="177" textAnchor="middle" fill="white" fontSize="9">Charlie, HR, $45K</text>

    <rect x="45" y="190" width="120" height="25" rx="4" fill="#1e40af"/>
    <text x="105" y="207" textAnchor="middle" fill="white" fontSize="9">Diana, HR, $95K</text>

    {/* Grouping Operation */}
    <rect x="230" y="120" width="140" height="60" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="300" y="145" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">groupingBy(dept,</text>
    <text x="300" y="160" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">groupingBy(range))</text>

    {/* Arrow to grouping */}
    <line x1="180" y1="150" x2="225" y2="150" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#group-arrow)"/>

    {/* Result Map */}
    <rect x="420" y="50" width="350" height="200" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="595" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">{`Map<Dept, Map<Range, List<Emp>>>`}</text>

    {/* IT Group */}
    <rect x="435" y="90" width="155" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="512" y="108" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">IT</text>
    <text x="512" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="9">mid: [Alice]</text>
    <text x="512" y="140" textAnchor="middle" fill="#c4b5fd" fontSize="9">high: [Bob]</text>

    {/* HR Group */}
    <rect x="600" y="90" width="155" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="677" y="108" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">HR</text>
    <text x="677" y="125" textAnchor="middle" fill="#fde68a" fontSize="9">low: [Charlie]</text>
    <text x="677" y="140" textAnchor="middle" fill="#fde68a" fontSize="9">mid: [Diana]</text>

    {/* Arrow to result */}
    <line x1="370" y1="150" x2="415" y2="150" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#group-arrow)"/>

    {/* Legend */}
    <text x="595" y="220" textAnchor="middle" fill="#94a3b8" fontSize="9">{`low: <$50K | mid: $50K-$100K | high: >$100K`}</text>
  </svg>
)

const CustomCollectorDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="custom-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Custom Collector with Collector.of()
    </text>

    {/* Collector.of box */}
    <rect x="50" y="50" width="700" height="170" rx="12" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="bold">Collector.of(supplier, accumulator, combiner, finisher)</text>

    {/* 4 Components */}
    <rect x="80" y="100" width="140" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="150" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Supplier</text>
    <text x="150" y="145" textAnchor="middle" fill="#bfdbfe" fontSize="8">Stats::new</text>
    <text x="150" y="158" textAnchor="middle" fill="#93c5fd" fontSize="7">{`() -> new Stats()`}</text>

    <rect x="240" y="100" width="140" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="310" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Accumulator</text>
    <text x="310" y="145" textAnchor="middle" fill="#ddd6fe" fontSize="8">Stats::add</text>
    <text x="310" y="158" textAnchor="middle" fill="#c4b5fd" fontSize="7">{`(s, elem) -> s.add(elem)`}</text>

    <rect x="400" y="100" width="140" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="470" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Combiner</text>
    <text x="470" y="145" textAnchor="middle" fill="#fef3c7" fontSize="8">{`(s1, s2) -> merge`}</text>
    <text x="470" y="158" textAnchor="middle" fill="#fde68a" fontSize="7">s1.merge(s2); return s1</text>

    <rect x="560" y="100" width="160" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="640" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Finisher</text>
    <text x="640" y="145" textAnchor="middle" fill="#bbf7d0" fontSize="8">Function.identity()</text>
    <text x="640" y="158" textAnchor="middle" fill="#86efac" fontSize="7">or custom transform</text>

    {/* Arrows between components */}
    <line x1="220" y1="135" x2="235" y2="135" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#custom-arrow)"/>
    <line x1="380" y1="135" x2="395" y2="135" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#custom-arrow)"/>
    <line x1="540" y1="135" x2="555" y2="135" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#custom-arrow)"/>
  </svg>
)

const FlatMapDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="flat-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      flatMap: Flatten Nested Structures
    </text>

    {/* Input: Nested List */}
    <rect x="30" y="50" width="200" height="150" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="130" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">{`List<List<String>>`}</text>

    <rect x="50" y="90" width="160" height="35" rx="4" fill="#1e40af"/>
    <text x="130" y="112" textAnchor="middle" fill="white" fontSize="9">["hello world"]</text>

    <rect x="50" y="135" width="160" height="35" rx="4" fill="#1e40af"/>
    <text x="130" y="157" textAnchor="middle" fill="white" fontSize="9">["java streams"]</text>

    {/* flatMap operation */}
    <rect x="280" y="90" width="120" height="70" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="340" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">flatMap</text>
    <text x="340" y="135" textAnchor="middle" fill="#a5f3fc" fontSize="8">List::stream</text>
    <text x="340" y="150" textAnchor="middle" fill="#67e8f9" fontSize="7">+ split(" ")</text>

    {/* Arrow */}
    <line x1="230" y1="125" x2="275" y2="125" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#flat-arrow)"/>

    {/* Output: Flat List */}
    <rect x="450" y="50" width="320" height="150" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="610" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">{`List<String> (flattened)`}</text>

    <rect x="470" y="95" width="70" height="30" rx="4" fill="#166534"/>
    <text x="505" y="115" textAnchor="middle" fill="white" fontSize="9">"hello"</text>

    <rect x="550" y="95" width="70" height="30" rx="4" fill="#166534"/>
    <text x="585" y="115" textAnchor="middle" fill="white" fontSize="9">"world"</text>

    <rect x="630" y="95" width="60" height="30" rx="4" fill="#166534"/>
    <text x="660" y="115" textAnchor="middle" fill="white" fontSize="9">"java"</text>

    <rect x="700" y="95" width="55" height="30" rx="4" fill="#166534"/>
    <text x="727" y="115" textAnchor="middle" fill="white" fontSize="9">"streams"</text>

    {/* Arrow */}
    <line x1="400" y1="125" x2="445" y2="125" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#flat-arrow)"/>

    {/* Explanation */}
    <text x="610" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Each inner collection becomes individual elements</text>
    <text x="610" y="180" textAnchor="middle" fill="#64748b" fontSize="8">{`Stream<Stream<T>> -> Stream<T>`}</text>
  </svg>
)

const ParallelStreamsDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="parallel-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Parallel Stream Processing with Fork/Join
    </text>

    {/* Source */}
    <rect x="30" y="110" width="120" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="90" y="138" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Data Source</text>
    <text x="90" y="155" textAnchor="middle" fill="#bfdbfe" fontSize="8">[1, 2, 3, ... 1M]</text>

    {/* Split */}
    <rect x="200" y="110" width="100" height="60" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="250" y="138" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">parallel()</text>
    <text x="250" y="155" textAnchor="middle" fill="#a5f3fc" fontSize="8">Split Data</text>

    {/* Arrow to split */}
    <line x1="150" y1="140" x2="195" y2="140" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#parallel-arrow)"/>

    {/* Worker threads */}
    <rect x="350" y="50" width="100" height="45" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Thread 1</text>
    <text x="400" y="85" textAnchor="middle" fill="#ddd6fe" fontSize="7">[1...250K]</text>

    <rect x="350" y="105" width="100" height="45" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="127" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Thread 2</text>
    <text x="400" y="140" textAnchor="middle" fill="#ddd6fe" fontSize="7">[250K...500K]</text>

    <rect x="350" y="160" width="100" height="45" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="182" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Thread 3</text>
    <text x="400" y="195" textAnchor="middle" fill="#ddd6fe" fontSize="7">[500K...750K]</text>

    <rect x="350" y="215" width="100" height="45" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="237" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Thread 4</text>
    <text x="400" y="250" textAnchor="middle" fill="#ddd6fe" fontSize="7">[750K...1M]</text>

    {/* Arrows to threads */}
    <line x1="300" y1="130" x2="320" y2="72" stroke="#06b6d4" strokeWidth="1.5"/>
    <line x1="320" y1="72" x2="345" y2="72" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#parallel-arrow)"/>
    <line x1="300" y1="140" x2="345" y2="127" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#parallel-arrow)"/>
    <line x1="300" y1="150" x2="345" y2="182" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#parallel-arrow)"/>
    <line x1="300" y1="160" x2="320" y2="237" stroke="#06b6d4" strokeWidth="1.5"/>
    <line x1="320" y1="237" x2="345" y2="237" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#parallel-arrow)"/>

    {/* Combine */}
    <rect x="500" y="110" width="100" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="550" y="138" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Combine</text>
    <text x="550" y="155" textAnchor="middle" fill="#fef3c7" fontSize="8">Merge Results</text>

    {/* Arrows from threads to combine */}
    <line x1="450" y1="72" x2="480" y2="72" stroke="#06b6d4" strokeWidth="1.5"/>
    <line x1="480" y1="72" x2="495" y2="130" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#parallel-arrow)"/>
    <line x1="450" y1="127" x2="495" y2="140" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#parallel-arrow)"/>
    <line x1="450" y1="182" x2="495" y2="150" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#parallel-arrow)"/>
    <line x1="450" y1="237" x2="480" y2="237" stroke="#06b6d4" strokeWidth="1.5"/>
    <line x1="480" y1="237" x2="495" y2="160" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#parallel-arrow)"/>

    {/* Result */}
    <rect x="650" y="110" width="120" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="710" y="138" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Final Result</text>
    <text x="710" y="155" textAnchor="middle" fill="#bbf7d0" fontSize="8">Sum: 3.33...E17</text>

    {/* Arrow to result */}
    <line x1="600" y1="140" x2="645" y2="140" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#parallel-arrow)"/>
  </svg>
)

const ReduceOperationDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="reduce-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Stream reduce() Operation
    </text>

    {/* Initial elements */}
    <rect x="50" y="60" width="50" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="75" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>

    <rect x="120" y="60" width="50" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="145" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>

    <rect x="190" y="60" width="50" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="215" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>

    <rect x="260" y="60" width="50" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="285" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>

    <rect x="330" y="60" width="50" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="355" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>

    {/* Reduce operation */}
    <rect x="430" y="50" width="150" height="60" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="505" y="78" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{`reduce(0, (a,b) -> a+b)`}</text>
    <text x="505" y="95" textAnchor="middle" fill="#a5f3fc" fontSize="8">Identity + BinaryOperator</text>

    {/* Arrow */}
    <line x1="380" y1="80" x2="425" y2="80" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#reduce-arrow)"/>

    {/* Result */}
    <rect x="630" y="50" width="100" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="680" y="78" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">15</text>
    <text x="680" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="9">1+2+3+4+5</text>

    {/* Arrow */}
    <line x1="580" y1="80" x2="625" y2="80" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#reduce-arrow)"/>

    {/* Step by step */}
    <text x="400" y="145" textAnchor="middle" fill="#64748b" fontSize="10">Step by step: 0+1=1, 1+2=3, 3+3=6, 6+4=10, 10+5=15</text>
    <text x="400" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">reduce() combines elements using accumulator function</text>
  </svg>
)

const InfiniteStreamsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="infinite-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Infinite Stream Generation
    </text>

    {/* Generator */}
    <rect x="50" y="70" width="140" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="120" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Stream.iterate()</text>
    <text x="120" y="115" textAnchor="middle" fill="#ddd6fe" fontSize="8">seed: 0</text>
    <text x="120" y="128" textAnchor="middle" fill="#c4b5fd" fontSize="8">{`n -> n + 1`}</text>

    {/* Infinite stream representation */}
    <rect x="240" y="80" width="40" height="30" rx="4" fill="#3b82f6"/>
    <text x="260" y="100" textAnchor="middle" fill="white" fontSize="10">0</text>

    <rect x="290" y="80" width="40" height="30" rx="4" fill="#3b82f6"/>
    <text x="310" y="100" textAnchor="middle" fill="white" fontSize="10">1</text>

    <rect x="340" y="80" width="40" height="30" rx="4" fill="#3b82f6"/>
    <text x="360" y="100" textAnchor="middle" fill="white" fontSize="10">2</text>

    <rect x="390" y="80" width="40" height="30" rx="4" fill="#3b82f6"/>
    <text x="410" y="100" textAnchor="middle" fill="white" fontSize="10">3</text>

    <text x="455" y="100" textAnchor="middle" fill="#64748b" fontSize="14">...</text>
    <text x="490" y="100" textAnchor="middle" fill="#64748b" fontSize="10">&infin;</text>

    {/* Arrow */}
    <line x1="190" y1="105" x2="235" y2="95" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#infinite-arrow)"/>

    {/* Limit operation */}
    <rect x="530" y="70" width="100" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="580" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">limit(5)</text>
    <text x="580" y="110" textAnchor="middle" fill="#fef3c7" fontSize="8">Short-circuit</text>

    {/* Arrow */}
    <line x1="500" y1="95" x2="525" y2="95" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#infinite-arrow)"/>

    {/* Finite result */}
    <rect x="680" y="70" width="90" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="725" y="93" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">[0,1,2,3,4]</text>
    <text x="725" y="108" textAnchor="middle" fill="#bbf7d0" fontSize="8">Finite list</text>

    {/* Arrow */}
    <line x1="630" y1="95" x2="675" y2="95" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#infinite-arrow)"/>

    {/* Note */}
    <text x="400" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">Infinite streams must be bounded with limit(), takeWhile(), or findFirst() to terminate</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function StreamsAdvanced({ onBack, breadcrumb, onNavigateTopic }) {
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

  // =============================================================================
  // PRACTICE PROBLEMS
  // =============================================================================

  const practiceProblems = [
    {
      id: 1,
      title: 'Custom Collector',
      difficulty: 'Hard',
      description: 'Implement a custom Collector that collects elements into a comma-separated string.',
      example: 'Input: Stream.of("a", "b", "c") → Output: "a, b, c"',
      instructions: `Implement **Collector.of(...)** that joins stream elements into a single comma-separated **String**.

Requirements:
- **Supplier:** create a new **StringBuilder**
- **Accumulator:** append each element with ", " separator
- **Combiner:** merge two StringBuilders for parallel execution
- **Finisher:** trim the trailing ", " and return the String

Hint: Use \`Collector.of(supplier, accumulator, combiner, finisher)\`.`,
      starterCode: `import java.util.*;
import java.util.stream.*;

public class Solution {
    public static void main(String[] args) {
        List<String> items = List.of("apple", "banana", "cherry");

        // TODO: implement custom collector that joins with ", "
        Collector<String, ?, String> joiner = null;

        String result = items.stream().collect(joiner);
        System.out.println(result); // expect: apple, banana, cherry
    }
}`,
      solution: `import java.util.*;
import java.util.stream.*;

public class Solution {
    public static void main(String[] args) {
        List<String> items = List.of("apple", "banana", "cherry");

        Collector<String, StringBuilder, String> joiner = Collector.of(
            StringBuilder::new,
            (sb, s) -> { if (sb.length() > 0) sb.append(", "); sb.append(s); },
            (a, b) -> { if (a.length() > 0 && b.length() > 0) a.append(", "); return a.append(b); },
            StringBuilder::toString
        );

        String result = items.stream().collect(joiner);
        System.out.println(result); // apple, banana, cherry
    }
}`
    },
    {
      id: 2,
      title: 'Parallel Stream Sum',
      difficulty: 'Medium',
      description: 'Use parallel streams to calculate the sum of squares of a large list efficiently.',
      example: 'Input: [1, 2, 3, ..., 1_000_000] → Output: Sum of squares',
      instructions: `Compute the **sum of squares** for numbers 1 through N using a **parallel stream**.

Requirements:
- Use **IntStream.rangeClosed(1, N)**
- Call **.parallel()** to enable parallel execution
- Map each value to its square
- Reduce with **.sum()** (sum returns long-safe via .asLongStream() for big N)

Caveat: Avoid shared mutable state inside the stream pipeline.`,
      starterCode: `import java.util.stream.*;

public class Solution {
    public static void main(String[] args) {
        int n = 1_000_000;

        // TODO: parallel stream, square each value, sum them
        long sum = 0L;

        System.out.println("Sum of squares 1.." + n + " = " + sum);
    }
}`,
      solution: `import java.util.stream.*;

public class Solution {
    public static void main(String[] args) {
        int n = 1_000_000;

        long sum = IntStream.rangeClosed(1, n)
            .parallel()
            .asLongStream()
            .map(i -> i * i)
            .sum();

        System.out.println("Sum of squares 1.." + n + " = " + sum);
    }
}`
    },
    {
      id: 3,
      title: 'Grouping with Downstream',
      difficulty: 'Medium',
      description: 'Group employees by department and calculate average salary per department.',
      example: 'Input: List<Employee> → Output: Map<String, Double>',
      instructions: `Use **Collectors.groupingBy** with a downstream collector to compute the **average salary** per department.

Requirements:
- Group by **Employee.department**
- Downstream: **Collectors.averagingDouble(Employee::getSalary)**
- Result type: **Map<String, Double>**

Hint: \`groupingBy(classifier, downstream)\` accepts any Collector as its second argument.`,
      starterCode: `import java.util.*;
import java.util.stream.*;

public class Solution {
    record Employee(String name, String department, double salary) {}

    public static void main(String[] args) {
        List<Employee> employees = List.of(
            new Employee("Alice", "Engineering", 95000),
            new Employee("Bob", "Engineering", 85000),
            new Employee("Carol", "Sales", 70000),
            new Employee("Dave", "Sales", 75000)
        );

        // TODO: group by department, compute average salary
        Map<String, Double> avgByDept = null;

        avgByDept.forEach((dept, avg) -> System.out.println(dept + " -> " + avg));
    }
}`,
      solution: `import java.util.*;
import java.util.stream.*;

public class Solution {
    record Employee(String name, String department, double salary) {}

    public static void main(String[] args) {
        List<Employee> employees = List.of(
            new Employee("Alice", "Engineering", 95000),
            new Employee("Bob", "Engineering", 85000),
            new Employee("Carol", "Sales", 70000),
            new Employee("Dave", "Sales", 75000)
        );

        Map<String, Double> avgByDept = employees.stream()
            .collect(Collectors.groupingBy(
                Employee::department,
                Collectors.averagingDouble(Employee::salary)
            ));

        avgByDept.forEach((dept, avg) -> System.out.println(dept + " -> " + avg));
    }
}`
    },
    {
      id: 4,
      title: 'Partitioning Data',
      difficulty: 'Easy',
      description: 'Partition a list of numbers into even and odd using Collectors.partitioningBy().',
      example: 'Input: [1, 2, 3, 4, 5] → Output: {true: [2, 4], false: [1, 3, 5]}',
      instructions: `Use **Collectors.partitioningBy** to split a list of integers into **even** and **odd** buckets.

Requirements:
- Predicate: \`n -> n % 2 == 0\`
- Result type: **Map<Boolean, List<Integer>>**
- Key **true** holds evens, **false** holds odds

Note: partitioningBy is more efficient than groupingBy when you only have two buckets.`,
      starterCode: `import java.util.*;
import java.util.stream.*;

public class Solution {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // TODO: partition into even and odd
        Map<Boolean, List<Integer>> partitioned = null;

        System.out.println("Evens: " + partitioned.get(true));
        System.out.println("Odds:  " + partitioned.get(false));
    }
}`,
      solution: `import java.util.*;
import java.util.stream.*;

public class Solution {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        Map<Boolean, List<Integer>> partitioned = numbers.stream()
            .collect(Collectors.partitioningBy(n -> n % 2 == 0));

        System.out.println("Evens: " + partitioned.get(true));
        System.out.println("Odds:  " + partitioned.get(false));
    }
}`
    }
  ]

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'collectors',
      name: 'Advanced Collectors',
      icon: '\u{1F4E6}',
      color: '#06b6d4',
      description: 'Master complex grouping, partitioning, and custom collectors for sophisticated data aggregation.',
      diagram: CollectorsPipelineDiagram,
      details: [
        {
          name: 'Multi-Level Grouping',
          diagram: GroupingByDiagram,
          explanation: 'Use nested Collectors.groupingBy() to create hierarchical groupings. The outer groupingBy defines the first level of grouping (e.g., by department), while the inner groupingBy further subdivides each group (e.g., by salary range). This technique is essential for creating multi-dimensional classifications of data, similar to SQL\'s GROUP BY with multiple columns.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class MultiLevelGrouping {
    static class Employee {
        String name, department;
        double salary;

        Employee(String n, String d, double s) {
            name = n; department = d; salary = s;
        }

        String getDepartment() { return department; }

        String getSalaryRange() {
            if (salary < 50000) return "low";
            if (salary < 100000) return "mid";
            return "high";
        }

        @Override
        public String toString() { return name; }
    }

    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee("Alice", "IT", 75000),
            new Employee("Bob", "IT", 120000),
            new Employee("Charlie", "HR", 45000),
            new Employee("Diana", "HR", 95000)
        );

        // Multi-level grouping: Department -> Salary Range -> List<Employee>
        Map<String, Map<String, List<Employee>>> grouped = employees.stream()
            .collect(Collectors.groupingBy(
                Employee::getDepartment,
                Collectors.groupingBy(Employee::getSalaryRange)
            ));

        // Output: {HR={low=[Charlie], mid=[Diana]}, IT={mid=[Alice], high=[Bob]}}
        System.out.println(grouped);
    }
}`
        },
        {
          name: 'Downstream Collectors',
          explanation: 'Downstream collectors transform the grouped results. Common downstream collectors include counting(), summingInt(), averagingDouble(), mapping(), reducing(), and collectingAndThen(). These allow you to compute aggregates per group rather than just collecting elements into lists.',
          codeExample: `import java.util.*;
import java.util.stream.*;
import static java.util.stream.Collectors.*;

public class DownstreamCollectors {
    record Product(String category, String name, double price) {}

    public static void main(String[] args) {
        List<Product> products = List.of(
            new Product("Electronics", "Phone", 999),
            new Product("Electronics", "Laptop", 1499),
            new Product("Books", "Java Guide", 49),
            new Product("Books", "Algorithms", 59)
        );

        // Count per category
        Map<String, Long> countByCategory = products.stream()
            .collect(groupingBy(Product::category, counting()));
        // {Electronics=2, Books=2}

        // Sum prices per category
        Map<String, Double> sumByCategory = products.stream()
            .collect(groupingBy(Product::category,
                summingDouble(Product::price)));
        // {Electronics=2498.0, Books=108.0}

        // Average price per category
        Map<String, Double> avgByCategory = products.stream()
            .collect(groupingBy(Product::category,
                averagingDouble(Product::price)));
        // {Electronics=1249.0, Books=54.0}

        // Max price product per category
        Map<String, Optional<Product>> maxByCategory = products.stream()
            .collect(groupingBy(Product::category,
                maxBy(Comparator.comparing(Product::price))));

        // Collect names as comma-separated string per category
        Map<String, String> namesPerCategory = products.stream()
            .collect(groupingBy(Product::category,
                mapping(Product::name, joining(", "))));
        // {Electronics=Phone, Laptop, Books=Java Guide, Algorithms}

        System.out.println(countByCategory);
        System.out.println(sumByCategory);
        System.out.println(avgByCategory);
    }
}`
        },
        {
          name: 'Custom Collectors',
          diagram: CustomCollectorDiagram,
          explanation: 'Create custom collectors using Collector.of() with four functions: supplier (creates accumulator), accumulator (adds elements), combiner (merges partial results for parallel), and finisher (transforms final result). The characteristics parameter optimizes behavior (CONCURRENT, UNORDERED, IDENTITY_FINISH).',
          codeExample: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class CustomCollectorExample {
    // Custom accumulator class
    static class Statistics {
        long count = 0;
        double sum = 0;
        double min = Double.MAX_VALUE;
        double max = Double.MIN_VALUE;

        void accept(double value) {
            count++;
            sum += value;
            min = Math.min(min, value);
            max = Math.max(max, value);
        }

        Statistics combine(Statistics other) {
            count += other.count;
            sum += other.sum;
            min = Math.min(min, other.min);
            max = Math.max(max, other.max);
            return this;
        }

        double getAverage() {
            return count > 0 ? sum / count : 0;
        }

        @Override
        public String toString() {
            return String.format("Stats[count=%d, sum=%.2f, avg=%.2f, min=%.2f, max=%.2f]",
                count, sum, getAverage(), min, max);
        }
    }

    public static void main(String[] args) {
        List<Double> values = List.of(1.5, 2.3, 4.7, 3.2, 5.1, 2.8);

        // Custom collector using Collector.of()
        Collector<Double, Statistics, Statistics> statsCollector = Collector.of(
            Statistics::new,           // Supplier: create new Statistics
            Statistics::accept,        // Accumulator: add element
            Statistics::combine,       // Combiner: merge two Statistics
            Function.identity(),       // Finisher: return as-is
            Collector.Characteristics.UNORDERED
        );

        Statistics stats = values.stream().collect(statsCollector);
        System.out.println(stats);
        // Stats[count=6, sum=19.60, avg=3.27, min=1.50, max=5.10]

        // Collector that returns immutable list
        Collector<String, ?, List<String>> toImmutableList = Collector.of(
            ArrayList::new,
            ArrayList::add,
            (left, right) -> { left.addAll(right); return left; },
            Collections::unmodifiableList
        );

        List<String> immutable = Stream.of("a", "b", "c")
            .collect(toImmutableList);
    }
}`
        },
        {
          name: 'Implementing the Collector Interface',
          explanation: 'For reusable, named collectors you can implement the Collector<T, A, R> interface directly instead of using Collector.of(). You override the same five pieces — supplier(), accumulator(), combiner(), finisher(), and characteristics() — but as a proper class you get a descriptive type name, can hold configuration in fields, and can unit-test each function. T is the input element type, A is the mutable accumulator type, and R is the final result type. When A and R are the same, the finisher is Function.identity() and you should declare IDENTITY_FINISH so the JDK skips the finishing step.',
          codeExample: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

// Reusable Collector that builds a word -> count frequency map by
// implementing Collector directly (A == R, so it is IDENTITY_FINISH).
public class FrequencyCollector
        implements Collector<String, Map<String, Integer>, Map<String, Integer>> {

    @Override
    public Supplier<Map<String, Integer>> supplier() {
        return HashMap::new;                          // create the accumulator
    }

    @Override
    public BiConsumer<Map<String, Integer>, String> accumulator() {
        return (map, word) -> map.merge(word, 1, Integer::sum);
    }

    @Override
    public BinaryOperator<Map<String, Integer>> combiner() {
        return (m1, m2) -> {                          // merge partials (parallel)
            m2.forEach((k, v) -> m1.merge(k, v, Integer::sum));
            return m1;
        };
    }

    @Override
    public Function<Map<String, Integer>, Map<String, Integer>> finisher() {
        return Function.identity();                   // no transform needed
    }

    @Override
    public Set<Characteristics> characteristics() {
        return Set.of(Characteristics.UNORDERED, Characteristics.IDENTITY_FINISH);
    }

    public static void main(String[] args) {
        List<String> words =
            List.of("apple", "banana", "apple", "cherry", "banana", "apple");

        Map<String, Integer> freq = words.stream().collect(new FrequencyCollector());
        System.out.println(freq);   // {banana=2, cherry=1, apple=3}
    }
}`
        },
        {
          name: 'Collector Characteristics',
          explanation: 'The characteristics() set tells the stream framework how it may optimize a collection. IDENTITY_FINISH means the finisher is the identity function, so the framework skips calling it and casts the accumulator directly to the result. UNORDERED means the result does not depend on encounter order, allowing reordering optimizations in parallel/unordered streams. CONCURRENT means a single accumulator instance can be shared and mutated by multiple threads at once — so the accumulator container MUST be thread-safe (e.g. ConcurrentHashMap), and CONCURRENT is only used when the stream is also UNORDERED or the source is concurrent. Choosing the right characteristics is purely a performance/correctness contract; getting CONCURRENT wrong on a non-thread-safe container causes data races.',
          codeExample: `import java.util.*;
import java.util.stream.*;
import java.util.concurrent.*;

public class CollectorCharacteristics {
    public static void main(String[] args) {
        List<String> items = List.of("a", "b", "c", "a", "b");

        // IDENTITY_FINISH: accumulator type == result type, finisher skipped.
        Collector<String, List<String>, List<String>> identityFinish = Collector.of(
            ArrayList::new,
            List::add,
            (l1, l2) -> { l1.addAll(l2); return l1; },
            Collector.Characteristics.IDENTITY_FINISH
        );

        // UNORDERED: result independent of encounter order -> safe to reorder.
        Collector<String, ?, Map<String, Long>> unordered = Collector.of(
            HashMap::new,
            (Map<String, Long> m, String s) -> m.merge(s, 1L, Long::sum),
            (m1, m2) -> { m2.forEach((k, v) -> m1.merge(k, v, Long::sum)); return m1; },
            Collector.Characteristics.UNORDERED,
            Collector.Characteristics.IDENTITY_FINISH
        );

        // CONCURRENT + UNORDERED: one shared accumulator across threads, so the
        // container MUST be thread-safe (ConcurrentHashMap here).
        Collector<String, ?, Map<String, Long>> concurrent = Collector.of(
            ConcurrentHashMap::new,
            (Map<String, Long> m, String s) -> m.merge(s, 1L, Long::sum),
            (m1, m2) -> { m2.forEach((k, v) -> m1.merge(k, v, Long::sum)); return m1; },
            Collector.Characteristics.CONCURRENT,
            Collector.Characteristics.UNORDERED
        );

        System.out.println(items.stream().collect(identityFinish));
        System.out.println(items.parallelStream().collect(unordered));
        System.out.println(items.parallelStream().collect(concurrent));
    }
}`
        },
        {
          name: 'Top-N Collector',
          explanation: 'A practical custom collector: keep only the N largest (or smallest) elements without sorting the entire stream. The accumulator is a bounded min-heap (PriorityQueue) of size N — each element is offered, and if the heap exceeds N the smallest is dropped, so the heap always holds the current top N. This runs in O(k log N) time and O(N) space instead of the O(k log k) of a full sort. The combiner merges two heaps the same way (for parallel streams), and the finisher drains the heap into a list sorted from largest to smallest.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class TopNCollector {
    // Generic factory: keep the N greatest elements by the given comparator.
    static <T> Collector<T, ?, List<T>> topN(int n, Comparator<? super T> comparator) {
        return Collector.of(
            () -> new PriorityQueue<>(comparator),     // min-heap, size <= n
            (pq, item) -> {
                pq.offer(item);
                if (pq.size() > n) pq.poll();          // evict the smallest
            },
            (pq1, pq2) -> {                            // combine for parallel
                pq2.forEach(item -> {
                    pq1.offer(item);
                    if (pq1.size() > n) pq1.poll();
                });
                return pq1;
            },
            pq -> {                                    // finisher: largest first
                List<T> result = new ArrayList<>(pq);
                result.sort(comparator.reversed());
                return result;
            }
        );
    }

    public static void main(String[] args) {
        List<Integer> scores = List.of(45, 92, 78, 99, 60, 85, 73, 91);

        List<Integer> top3 = scores.stream()
            .collect(topN(3, Comparator.naturalOrder()));
        System.out.println(top3);   // [99, 92, 91]
    }
}`
        },
        {
          name: 'collectingAndThen',
          explanation: 'Collectors.collectingAndThen() applies a finisher function after collection completes. This is useful for wrapping results in immutable collections, computing derived values, or performing post-processing. It takes a downstream collector and a finisher function.',
          codeExample: `import java.util.*;
import java.util.stream.*;
import static java.util.stream.Collectors.*;

public class CollectingAndThenExample {
    public static void main(String[] args) {
        List<String> names = List.of("Alice", "Bob", "Charlie", "Diana");

        // Collect to unmodifiable list
        List<String> immutableList = names.stream()
            .filter(n -> n.length() > 3)
            .collect(collectingAndThen(
                toList(),
                Collections::unmodifiableList
            ));

        // Collect and get size
        int count = names.stream()
            .collect(collectingAndThen(
                toList(),
                List::size
            ));

        // Collect and find max length name
        String longest = names.stream()
            .collect(collectingAndThen(
                maxBy(Comparator.comparing(String::length)),
                opt -> opt.orElse("N/A")
            ));

        // Group by length and convert to unmodifiable map
        Map<Integer, List<String>> byLength = names.stream()
            .collect(collectingAndThen(
                groupingBy(String::length),
                Collections::unmodifiableMap
            ));

        // Calculate statistics and extract average
        double avgLength = names.stream()
            .collect(collectingAndThen(
                averagingInt(String::length),
                avg -> Math.round(avg * 100.0) / 100.0
            ));

        System.out.println("Immutable: " + immutableList);
        System.out.println("Longest: " + longest);
        System.out.println("By Length: " + byLength);
        System.out.println("Avg Length: " + avgLength);
    }
}`
        }
      ]
    },
    {
      id: 'stream-operations',
      name: 'Advanced Stream Operations',
      icon: '\u{1F504}',
      color: '#8b5cf6',
      description: 'Deep dive into flatMap, reduce, peek, and other powerful intermediate and terminal operations.',
      diagram: FlatMapDiagram,
      details: [
        {
          name: 'takeWhile & dropWhile',
          explanation: 'Java 9 introduced takeWhile() and dropWhile() for ordered streams. takeWhile() takes elements while the predicate is true and stops at the first false. dropWhile() skips elements while predicate is true and takes all remaining. These are short-circuiting operations useful for processing sorted data.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class TakeDropWhile {
    public static void main(String[] args) {
        List<Integer> sorted = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // takeWhile - take while condition is true
        List<Integer> lessThan5 = sorted.stream()
            .takeWhile(n -> n < 5)
            .collect(Collectors.toList());
        System.out.println("takeWhile < 5: " + lessThan5); // [1, 2, 3, 4]

        // dropWhile - drop while condition is true, take the rest
        List<Integer> from5 = sorted.stream()
            .dropWhile(n -> n < 5)
            .collect(Collectors.toList());
        System.out.println("dropWhile < 5: " + from5); // [5, 6, 7, 8, 9, 10]

        // Combining both for range
        List<Integer> range = sorted.stream()
            .dropWhile(n -> n < 3)  // Skip until 3
            .takeWhile(n -> n < 8)  // Take until 8
            .collect(Collectors.toList());
        System.out.println("3 to 7: " + range); // [3, 4, 5, 6, 7]

        // Practical example: Processing log entries
        record LogEntry(String timestamp, String level, String message) {}
        List<LogEntry> logs = List.of(
            new LogEntry("10:00", "INFO", "Starting"),
            new LogEntry("10:01", "INFO", "Processing"),
            new LogEntry("10:02", "ERROR", "Failed"),
            new LogEntry("10:03", "ERROR", "Retry failed"),
            new LogEntry("10:04", "INFO", "Recovered")
        );

        // Get all entries until first error
        List<LogEntry> untilError = logs.stream()
            .takeWhile(log -> !log.level().equals("ERROR"))
            .collect(Collectors.toList());

        // Skip INFO entries, get errors and beyond
        List<LogEntry> fromError = logs.stream()
            .dropWhile(log -> log.level().equals("INFO"))
            .collect(Collectors.toList());

        System.out.println("Until error: " + untilError.size()); // 2
        System.out.println("From error: " + fromError.size()); // 3
    }
}`
        },
        {
          name: 'teeing Collector',
          explanation: 'Java 12 introduced Collectors.teeing() which applies two collectors simultaneously and merges their results. This is useful when you need to compute multiple aggregations in a single pass, avoiding multiple iterations over the data.',
          codeExample: `import java.util.*;
import java.util.stream.*;
import static java.util.stream.Collectors.*;

public class TeeingCollector {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Compute min and max simultaneously
        record MinMax(Integer min, Integer max) {}
        MinMax minMax = numbers.stream()
            .collect(teeing(
                minBy(Comparator.naturalOrder()),
                maxBy(Comparator.naturalOrder()),
                (min, max) -> new MinMax(min.orElse(null), max.orElse(null))
            ));
        System.out.println("MinMax: " + minMax); // MinMax[min=1, max=10]

        // Compute sum and count for average
        record SumCount(long sum, long count) {
            double average() { return count == 0 ? 0 : (double) sum / count; }
        }
        SumCount sc = numbers.stream()
            .collect(teeing(
                summingLong(Integer::longValue),
                counting(),
                SumCount::new
            ));
        System.out.println("Average: " + sc.average()); // 5.5

        // Partition and count in one pass
        record PartitionStats(long even, long odd) {}
        PartitionStats ps = numbers.stream()
            .collect(teeing(
                filtering(n -> n % 2 == 0, counting()),
                filtering(n -> n % 2 != 0, counting()),
                PartitionStats::new
            ));
        System.out.println("Even: " + ps.even() + ", Odd: " + ps.odd());

        // Get first and last elements
        record FirstLast<T>(T first, T last) {}
        FirstLast<Integer> fl = numbers.stream()
            .collect(teeing(
                collectingAndThen(toList(), list -> list.isEmpty() ? null : list.get(0)),
                collectingAndThen(toList(), list -> list.isEmpty() ? null : list.get(list.size() - 1)),
                FirstLast::new
            ));
        System.out.println("First: " + fl.first() + ", Last: " + fl.last());
    }
}`
        }
      ]
    },
    {
      id: 'parallel-streams',
      name: 'Spliterator & Low-Level Streams',
      icon: '\u26A1',
      color: '#f59e0b',
      description: 'Leverage multi-core processors with parallel streams, understand fork-join pool, and avoid common pitfalls.',
      diagram: ParallelStreamsDiagram,
      details: [
        {
          name: 'Spliterator Deep Dive',
          explanation: 'Spliterator (splitting iterator) is the mechanism behind parallel stream splitting. It defines how a data source can be partitioned for parallel processing. Key methods: tryAdvance(), trySplit(), estimateSize(), and characteristics(). Custom spliterators enable parallel streams on custom data sources.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class SpliteratorDeepDive {
    public static void main(String[] args) {
        List<String> words = List.of("Hello", "World", "Java", "Streams", "Parallel");

        // Get spliterator from collection
        Spliterator<String> spliterator = words.spliterator();

        // Check characteristics
        System.out.println("Sized: " + spliterator.hasCharacteristics(Spliterator.SIZED));
        System.out.println("Ordered: " + spliterator.hasCharacteristics(Spliterator.ORDERED));
        System.out.println("Estimated size: " + spliterator.estimateSize());

        // Split the spliterator
        Spliterator<String> split1 = spliterator.trySplit();
        System.out.println("After split - original size: " + spliterator.estimateSize());
        System.out.println("After split - new split size: " +
            (split1 != null ? split1.estimateSize() : 0));

        // Traverse elements
        spliterator.forEachRemaining(System.out::println);

        // Custom Spliterator for batch processing
        class BatchSpliterator<T> implements Spliterator<List<T>> {
            private final Spliterator<T> source;
            private final int batchSize;

            BatchSpliterator(Spliterator<T> source, int batchSize) {
                this.source = source;
                this.batchSize = batchSize;
            }

            @Override
            public boolean tryAdvance(java.util.function.Consumer<? super List<T>> action) {
                List<T> batch = new ArrayList<>(batchSize);
                while (batch.size() < batchSize && source.tryAdvance(batch::add)) {}
                if (batch.isEmpty()) return false;
                action.accept(batch);
                return true;
            }

            @Override
            public Spliterator<List<T>> trySplit() {
                Spliterator<T> split = source.trySplit();
                return split == null ? null : new BatchSpliterator<>(split, batchSize);
            }

            @Override
            public long estimateSize() {
                return (source.estimateSize() + batchSize - 1) / batchSize;
            }

            @Override
            public int characteristics() {
                return source.characteristics() & ~SIZED;
            }
        }

        // Use custom spliterator
        List<Integer> numbers = IntStream.rangeClosed(1, 20)
            .boxed().collect(Collectors.toList());

        Stream<List<Integer>> batchStream = StreamSupport.stream(
            new BatchSpliterator<>(numbers.spliterator(), 5),
            false
        );

        batchStream.forEach(batch ->
            System.out.println("Batch: " + batch));
    }
}`
        }
      ]
    },
    {
      id: 'stream-creation',
      name: 'Infinite Streams & Custom Sources',
      icon: '\u221E',
      color: '#22c55e',
      description: 'Create streams from various sources including infinite generators, and learn lazy evaluation patterns.',
      diagram: InfiniteStreamsDiagram,
      details: [
        {
          name: 'Infinite Streams',
          diagram: InfiniteStreamsDiagram,
          explanation: 'Stream.generate() and Stream.iterate() create infinite streams. generate() produces elements using a Supplier. iterate() produces elements by repeatedly applying a function to the previous element. These must be bounded with limit(), takeWhile(), or findFirst() to terminate.',
          codeExample: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class InfiniteStreams {
    public static void main(String[] args) {
        // 1. Stream.generate() - stateless supplier
        Stream<Double> randoms = Stream.generate(Math::random);
        List<Double> fiveRandoms = randoms.limit(5).collect(Collectors.toList());
        System.out.println("Random: " + fiveRandoms);

        // Constant stream
        Stream<String> constants = Stream.generate(() -> "constant");

        // 2. Stream.iterate() - seed + UnaryOperator
        Stream<Integer> naturals = Stream.iterate(1, n -> n + 1);
        List<Integer> firstTen = naturals.limit(10).collect(Collectors.toList());
        System.out.println("Natural: " + firstTen); // [1, 2, 3, ..., 10]

        // Fibonacci sequence
        Stream<long[]> fibonacci = Stream.iterate(
            new long[]{0, 1},
            arr -> new long[]{arr[1], arr[0] + arr[1]}
        );
        List<Long> fibs = fibonacci
            .limit(20)
            .map(arr -> arr[0])
            .collect(Collectors.toList());
        System.out.println("Fibonacci: " + fibs);

        // 3. Stream.iterate() with predicate (Java 9+)
        Stream<Integer> bounded = Stream.iterate(1, n -> n <= 100, n -> n * 2);
        System.out.println("Powers of 2: " +
            bounded.collect(Collectors.toList())); // [1, 2, 4, 8, 16, 32, 64]

        // 4. Infinite IntStream
        IntStream positives = IntStream.iterate(1, i -> i + 1);
        int[] firstHundred = positives.limit(100).toArray();

        // 5. UUID generator
        Stream<String> uuids = Stream.generate(() -> UUID.randomUUID().toString());

        // 6. Timestamp stream
        Stream<Long> timestamps = Stream.generate(System::currentTimeMillis);

        // 7. Cycling through values
        String[] colors = {"red", "green", "blue"};
        Stream<String> cycling = Stream.iterate(0, i -> (i + 1) % colors.length)
            .map(i -> colors[i]);
        System.out.println("Cycling: " +
            cycling.limit(10).collect(Collectors.toList()));

        // 8. Stateful generator (use with caution)
        int[] counter = {0};
        Stream<Integer> counted = Stream.generate(() -> counter[0]++);

        // 9. takeWhile with infinite stream
        List<Integer> underHundred = Stream.iterate(1, n -> n * 2)
            .takeWhile(n -> n < 100)
            .collect(Collectors.toList());
        System.out.println("Under 100: " + underHundred); // [1, 2, 4, 8, 16, 32, 64]
    }
}`
        },
        {
          name: 'Stream Pipeline Optimization',
          explanation: 'Optimize stream pipelines by ordering operations correctly: filter early to reduce elements, use primitive streams to avoid boxing, prefer method references, and consider stateful vs stateless operations. Avoid creating streams in loops and reuse results when possible.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class StreamOptimization {
    record Person(String name, int age, double salary) {}

    public static void main(String[] args) {
        List<Person> people = List.of(
            new Person("Alice", 30, 75000),
            new Person("Bob", 25, 50000),
            new Person("Charlie", 35, 90000),
            new Person("Diana", 28, 65000)
        );

        // BAD: Filter after expensive map
        double bad = people.stream()
            .map(p -> expensiveOperation(p))  // Applied to ALL
            .filter(result -> result > 100)    // Then filter
            .mapToDouble(d -> d)
            .sum();

        // GOOD: Filter first to reduce elements
        double good = people.stream()
            .filter(p -> p.salary() > 60000)   // Filter first
            .map(p -> expensiveOperation(p))   // Less operations
            .mapToDouble(d -> d)
            .sum();

        // BAD: Boxing/unboxing overhead
        Integer badSum = people.stream()
            .map(Person::age)                  // Stream<Integer>
            .reduce(0, Integer::sum);          // Boxing overhead

        // GOOD: Use primitive streams
        int goodSum = people.stream()
            .mapToInt(Person::age)             // IntStream
            .sum();                            // No boxing

        // BAD: Lambda instead of method reference
        List<String> badNames = people.stream()
            .map(p -> p.name())                // Lambda
            .collect(Collectors.toList());

        // GOOD: Method reference
        List<String> goodNames = people.stream()
            .map(Person::name)                 // Method reference
            .collect(Collectors.toList());

        // BAD: Sorting before filtering
        List<Person> badSort = people.stream()
            .sorted(Comparator.comparing(Person::salary)) // Sort all
            .filter(p -> p.age() > 25)                    // Then filter
            .collect(Collectors.toList());

        // GOOD: Filter before sorting
        List<Person> goodSort = people.stream()
            .filter(p -> p.age() > 25)                    // Filter first
            .sorted(Comparator.comparing(Person::salary)) // Sort fewer
            .collect(Collectors.toList());

        // BAD: Stream in loop
        List<Integer> numbers = List.of(1, 2, 3, 4, 5);
        for (int i = 0; i < 1000; i++) {
            numbers.stream().filter(n -> n > 2).count(); // New stream each time
        }

        // GOOD: Compute once if possible
        long count = numbers.stream().filter(n -> n > 2).count();
        // Use 'count' 1000 times

        // GOOD: Use toList() instead of collect(Collectors.toList()) - Java 16+
        List<String> names = people.stream()
            .map(Person::name)
            .toList();  // More concise
    }

    static double expensiveOperation(Person p) {
        // Simulate expensive computation
        return p.salary() * Math.random();
    }
}`
        },
        {
          name: 'Stream from Custom Source',
          explanation: 'Create streams from custom data sources using StreamSupport.stream() with a custom Spliterator, or by implementing Iterable. This enables streaming over databases, network resources, custom collections, or any sequential data source.',
          codeExample: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class CustomStreamSource {
    // Custom iterable that generates data on demand
    static class RangeIterable implements Iterable<Integer> {
        private final int start, end;

        RangeIterable(int start, int end) {
            this.start = start;
            this.end = end;
        }

        @Override
        public Iterator<Integer> iterator() {
            return new Iterator<>() {
                int current = start;

                @Override
                public boolean hasNext() { return current < end; }

                @Override
                public Integer next() {
                    if (!hasNext()) throw new NoSuchElementException();
                    return current++;
                }
            };
        }

        // Create stream from this iterable
        public Stream<Integer> stream() {
            return StreamSupport.stream(spliterator(), false);
        }

        public Stream<Integer> parallelStream() {
            return StreamSupport.stream(spliterator(), true);
        }
    }

    // Stream from supplier with termination condition
    static <T> Stream<T> streamWhile(Supplier<T> supplier, Predicate<T> continueIf) {
        return Stream.generate(supplier)
            .takeWhile(continueIf);
    }

    // Stream from queue
    static <T> Stream<T> streamFromQueue(Queue<T> queue) {
        return Stream.generate(() -> queue.poll())
            .takeWhile(Objects::nonNull);
    }

    public static void main(String[] args) {
        // Use custom iterable as stream
        RangeIterable range = new RangeIterable(1, 11);
        List<Integer> squared = range.stream()
            .map(n -> n * n)
            .collect(Collectors.toList());
        System.out.println("Squared: " + squared);

        // Stream from queue
        Queue<String> queue = new LinkedList<>(
            List.of("first", "second", "third")
        );
        List<String> fromQueue = streamFromQueue(queue)
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println("From queue: " + fromQueue);

        // Stream with external state (simulating DB cursor)
        int[] cursor = {0};
        String[] data = {"row1", "row2", "row3", "row4"};

        Stream<String> dbStream = streamWhile(
            () -> cursor[0] < data.length ? data[cursor[0]++] : null,
            Objects::nonNull
        );
        System.out.println("DB rows: " + dbStream.collect(Collectors.toList()));

        // Stream from callback-based API
        List<String> events = new ArrayList<>();
        Consumer<String> eventHandler = events::add;

        // Simulate events
        eventHandler.accept("event1");
        eventHandler.accept("event2");
        eventHandler.accept("event3");

        events.stream()
            .filter(e -> e.contains("2"))
            .forEach(System.out::println);
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
      { name: 'Java', icon: '\u2615', page: 'Java' },
      { name: 'Streams Advanced', icon: '\u{1F30A}', page: 'StreamsAdvanced' }
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
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        if (selectedConceptIndex > 0) {
          setSelectedConceptIndex(selectedConceptIndex - 1)
          setSelectedDetailIndex(0)
        }
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        if (selectedConceptIndex < concepts.length - 1) {
          setSelectedConceptIndex(selectedConceptIndex + 1)
          setSelectedDetailIndex(0)
        }
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

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>

      <div style={{ margin: '1rem 0', padding: '0.9rem 1.2rem', backgroundColor: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.35)', borderRadius: '12px', color: '#e5e7eb' }}>
        Stream basics &mdash; creation, lazy evaluation, flatMap, reduce, peek, partitioning and parallel streams &mdash; are covered on the Java Streams API page. This page starts at custom collectors.
        {onNavigateTopic && (
          <button
            onClick={() => onNavigateTopic('Streams')}
            style={{ marginLeft: '0.75rem', background: 'rgb(6, 182, 212)', color: 'white', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
          >
            Go to Java Streams API &rarr;
          </button>
        )}
      </div>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Advanced Java Streams</h1>
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
          ← Back to Java
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={STREAMS_ADV_COLORS}
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
        primaryColor={STREAMS_ADV_COLORS.primary}
      />


      {/* Practice Exercises Section */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid rgba(139, 92, 246, 0.3)'
      }}>
        <h2 style={{ color: '#8b5cf6', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📝</span> Practice Exercises
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Click on an exercise to practice. Complete the code challenge and mark as done.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {practiceProblems.map((problem) => {
            const problemId = `StreamsAdvanced-${problem.id}`
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
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = STREAMS_ADV_COLORS.primary; e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.2)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isCompleted ? '#22c55e' : '#334155'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem' }}>{problem.title}</h4>
                  <span style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    backgroundColor: problem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : problem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: problem.difficulty === 'Easy' ? '#22c55e' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444'
                  }}>
                    {problem.difficulty}
                  </span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0', lineHeight: '1.4' }}>{problem.description}</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.5rem 0', fontStyle: 'italic' }}>{problem.example}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: STREAMS_ADV_COLORS.primary, fontSize: '0.8rem', fontWeight: '500' }}>Click to practice →</span>
                  <div onClick={(e) => e.stopPropagation()}><CompletionCheckbox problemId={problemId} compact /></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Practice Problem Modal */}
      {selectedProblem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000000, padding: '1rem' }} onClick={closeProblem}>
          <div style={{ backgroundColor: '#1f2937', borderRadius: '1rem', width: '95vw', maxWidth: '1400px', height: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: `2px solid ${STREAMS_ADV_COLORS.primary}` }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ color: '#e2e8f0', margin: 0, fontSize: '1.5rem' }}>{selectedProblem.title}</h2>
                <span style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', backgroundColor: selectedProblem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : selectedProblem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: selectedProblem.difficulty === 'Easy' ? '#22c55e' : selectedProblem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{selectedProblem.difficulty}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CompletionCheckbox problemId={`StreamsAdvanced-${selectedProblem.id}`} compact />
                <button onClick={closeProblem} style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', color: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>✕ Close</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderRight: '1px solid #374151', overflowY: 'auto' }}>
                <h3 style={{ color: STREAMS_ADV_COLORS.primary, marginTop: 0, marginBottom: '1rem' }}>📋 Instructions</h3>
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
              colors={STREAMS_ADV_COLORS}
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

            {/* Detail Tabs */}
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

export default StreamsAdvanced

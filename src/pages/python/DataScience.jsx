import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// SVG Diagram: Data Science Workflow
const DataScienceWorkflowDiagram = () => (
  <svg viewBox="0 0 900 200" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="workflowGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="workflowGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="workflowGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="workflowGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="workflowGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
      <filter id="workflowShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
      </filter>
      <marker id="workflowArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#60a5fa" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="900" height="200" fill="#111827" rx="12" />

    {/* Title */}
    <text x="450" y="30" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">Data Science Workflow</text>

    {/* Step 1: Question */}
    <rect x="30" y="60" width="130" height="80" rx="10" fill="url(#workflowGrad1)" filter="url(#workflowShadow)" />
    <text x="95" y="95" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Question</text>
    <text x="95" y="115" textAnchor="middle" fill="#e9d5ff" fontSize="10">Define the problem</text>
    <text x="95" y="128" textAnchor="middle" fill="#e9d5ff" fontSize="10">& objectives</text>

    {/* Arrow 1 */}
    <line x1="165" y1="100" x2="195" y2="100" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#workflowArrow)" />

    {/* Step 2: Data */}
    <rect x="200" y="60" width="130" height="80" rx="10" fill="url(#workflowGrad2)" filter="url(#workflowShadow)" />
    <text x="265" y="95" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Data</text>
    <text x="265" y="115" textAnchor="middle" fill="#bfdbfe" fontSize="10">{`Collect & clean`}</text>
    <text x="265" y="128" textAnchor="middle" fill="#bfdbfe" fontSize="10">data sources</text>

    {/* Arrow 2 */}
    <line x1="335" y1="100" x2="365" y2="100" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#workflowArrow)" />

    {/* Step 3: Explore */}
    <rect x="370" y="60" width="130" height="80" rx="10" fill="url(#workflowGrad3)" filter="url(#workflowShadow)" />
    <text x="435" y="95" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Explore</text>
    <text x="435" y="115" textAnchor="middle" fill="#a7f3d0" fontSize="10">{`EDA & visualize`}</text>
    <text x="435" y="128" textAnchor="middle" fill="#a7f3d0" fontSize="10">patterns</text>

    {/* Arrow 3 */}
    <line x1="505" y1="100" x2="535" y2="100" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#workflowArrow)" />

    {/* Step 4: Model */}
    <rect x="540" y="60" width="130" height="80" rx="10" fill="url(#workflowGrad4)" filter="url(#workflowShadow)" />
    <text x="605" y="95" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Model</text>
    <text x="605" y="115" textAnchor="middle" fill="#fde68a" fontSize="10">{`Build & evaluate`}</text>
    <text x="605" y="128" textAnchor="middle" fill="#fde68a" fontSize="10">ML models</text>

    {/* Arrow 4 */}
    <line x1="675" y1="100" x2="705" y2="100" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#workflowArrow)" />

    {/* Step 5: Communicate */}
    <rect x="710" y="60" width="150" height="80" rx="10" fill="url(#workflowGrad5)" filter="url(#workflowShadow)" />
    <text x="785" y="95" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Communicate</text>
    <text x="785" y="115" textAnchor="middle" fill="#fbcfe8" fontSize="10">{`Share insights &`}</text>
    <text x="785" y="128" textAnchor="middle" fill="#fbcfe8" fontSize="10">recommendations</text>

    {/* Iteration arrow */}
    <path d="M785,145 L785,170 L95,170 L95,145" fill="none" stroke="#4b5563" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#workflowArrow)" />
    <text x="440" y="185" textAnchor="middle" fill="#6b7280" fontSize="10">Iterate and refine</text>
  </svg>
)

// SVG Diagram: Pandas DataFrame Structure
const PandasDataFrameDiagram = () => (
  <svg viewBox="0 0 700 350" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="dfHeaderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="dfIndexGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="dfCellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#374151" />
        <stop offset="100%" stopColor="#1f2937" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="700" height="350" fill="#111827" rx="12" />

    {/* Title */}
    <text x="350" y="30" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">Pandas DataFrame Structure</text>

    {/* DataFrame table */}
    {/* Index column header */}
    <rect x="60" y="55" width="70" height="35" rx="4" fill="#1f2937" stroke="#4b5563" />
    <text x="95" y="78" textAnchor="middle" fill="#6b7280" fontSize="11">Index</text>

    {/* Column headers */}
    <rect x="135" y="55" width="100" height="35" rx="4" fill="url(#dfHeaderGrad)" />
    <text x="185" y="78" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Name</text>

    <rect x="240" y="55" width="80" height="35" rx="4" fill="url(#dfHeaderGrad)" />
    <text x="280" y="78" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Age</text>

    <rect x="325" y="55" width="100" height="35" rx="4" fill="url(#dfHeaderGrad)" />
    <text x="375" y="78" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">City</text>

    <rect x="430" y="55" width="100" height="35" rx="4" fill="url(#dfHeaderGrad)" />
    <text x="480" y="78" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Salary</text>

    {/* Row 0 */}
    <rect x="60" y="95" width="70" height="35" rx="4" fill="url(#dfIndexGrad)" />
    <text x="95" y="118" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">0</text>

    <rect x="135" y="95" width="100" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="185" y="118" textAnchor="middle" fill="#d1d5db" fontSize="11">Alice</text>

    <rect x="240" y="95" width="80" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="280" y="118" textAnchor="middle" fill="#d1d5db" fontSize="11">25</text>

    <rect x="325" y="95" width="100" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="375" y="118" textAnchor="middle" fill="#d1d5db" fontSize="11">NYC</text>

    <rect x="430" y="95" width="100" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="480" y="118" textAnchor="middle" fill="#d1d5db" fontSize="11">70000</text>

    {/* Row 1 */}
    <rect x="60" y="135" width="70" height="35" rx="4" fill="url(#dfIndexGrad)" />
    <text x="95" y="158" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>

    <rect x="135" y="135" width="100" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="185" y="158" textAnchor="middle" fill="#d1d5db" fontSize="11">Bob</text>

    <rect x="240" y="135" width="80" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="280" y="158" textAnchor="middle" fill="#d1d5db" fontSize="11">30</text>

    <rect x="325" y="135" width="100" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="375" y="158" textAnchor="middle" fill="#d1d5db" fontSize="11">LA</text>

    <rect x="430" y="135" width="100" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="480" y="158" textAnchor="middle" fill="#d1d5db" fontSize="11">80000</text>

    {/* Row 2 */}
    <rect x="60" y="175" width="70" height="35" rx="4" fill="url(#dfIndexGrad)" />
    <text x="95" y="198" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>

    <rect x="135" y="175" width="100" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="185" y="198" textAnchor="middle" fill="#d1d5db" fontSize="11">Charlie</text>

    <rect x="240" y="175" width="80" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="280" y="198" textAnchor="middle" fill="#d1d5db" fontSize="11">35</text>

    <rect x="325" y="175" width="100" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="375" y="198" textAnchor="middle" fill="#d1d5db" fontSize="11">Chicago</text>

    <rect x="430" y="175" width="100" height="35" rx="4" fill="url(#dfCellGrad)" stroke="#4b5563" />
    <text x="480" y="198" textAnchor="middle" fill="#d1d5db" fontSize="11">90000</text>

    {/* Annotations */}
    {/* Columns annotation */}
    <path d="M135,48 L530,48" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
    <text x="570" y="52" fill="#f59e0b" fontSize="11" fontWeight="bold">Columns (df.columns)</text>

    {/* Index annotation */}
    <path d="M52,95 L52,210" stroke="#ec4899" strokeWidth="2" strokeDasharray="4,2" />
    <text x="30" y="260" fill="#ec4899" fontSize="11" fontWeight="bold" transform="rotate(-90 30 260)">Index (df.index)</text>

    {/* Shape annotation */}
    <rect x="550" y="95" width="130" height="60" rx="6" fill="#1f2937" stroke="#4b5563" />
    <text x="615" y="115" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">df.shape</text>
    <text x="615" y="135" textAnchor="middle" fill="#d1d5db" fontSize="12">(3, 4)</text>
    <text x="615" y="148" textAnchor="middle" fill="#6b7280" fontSize="9">rows x columns</text>

    {/* Legend */}
    <rect x="60" y="240" width="470" height="95" rx="8" fill="#1f2937" stroke="#374151" />
    <text x="80" y="265" fill="#93c5fd" fontSize="12" fontWeight="bold">Access Patterns:</text>

    <rect x="80" y="280" width="12" height="12" fill="url(#dfHeaderGrad)" />
    <text x="100" y="290" fill="#d1d5db" fontSize="10">df['Name'] - Column access</text>

    <rect x="80" y="300" width="12" height="12" fill="url(#dfIndexGrad)" />
    <text x="100" y="310" fill="#d1d5db" fontSize="10">df.loc[0] - Row by label</text>

    <rect x="280" y="280" width="12" height="12" fill="#f59e0b" />
    <text x="300" y="290" fill="#d1d5db" fontSize="10">df.iloc[0] - Row by position</text>

    <rect x="280" y="300" width="12" height="12" fill="#ec4899" />
    <text x="300" y="310" fill="#d1d5db" fontSize="10">df.loc[0, 'Name'] - Single cell</text>
  </svg>
)

// SVG Diagram: NumPy Array Dimensions
const NumpyArrayDiagram = () => (
  <svg viewBox="0 0 800 380" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="np1dGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="np2dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="np3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <filter id="npShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="800" height="380" fill="#111827" rx="12" />

    {/* Title */}
    <text x="400" y="30" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">NumPy Array Dimensions</text>

    {/* 1D Array */}
    <text x="130" y="65" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">1D Array (Vector)</text>
    <text x="130" y="82" textAnchor="middle" fill="#6b7280" fontSize="10">shape: (5,)</text>

    {['1', '2', '3', '4', '5'].map((val, i) => (
      <g key={`1d-${i}`}>
        <rect x={30 + i * 45} y="95" width="40" height="40" rx="4" fill="url(#np1dGrad)" filter="url(#npShadow)" />
        <text x={50 + i * 45} y="122" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{val}</text>
      </g>
    ))}

    {/* Axis indicator for 1D */}
    <line x1="30" y1="145" x2="250" y2="145" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#workflowArrow)" />
    <text x="260" y="150" fill="#f59e0b" fontSize="10">axis=0</text>

    {/* 2D Array */}
    <text x="130" y="185" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">2D Array (Matrix)</text>
    <text x="130" y="202" textAnchor="middle" fill="#6b7280" fontSize="10">shape: (3, 4)</text>

    {/* 2D Grid */}
    {[0, 1, 2].map(row => (
      [0, 1, 2, 3].map(col => (
        <g key={`2d-${row}-${col}`}>
          <rect x={30 + col * 50} y={215 + row * 40} width="45" height="35" rx="4" fill="url(#np2dGrad)" filter="url(#npShadow)" />
          <text x={52 + col * 50} y={238 + row * 40} textAnchor="middle" fill="white" fontSize="11">{row * 4 + col + 1}</text>
        </g>
      ))
    ))}

    {/* Axis indicators for 2D */}
    <line x1="15" y1="215" x2="15" y2="335" stroke="#ec4899" strokeWidth="2" />
    <text x="8" y="280" fill="#ec4899" fontSize="10" transform="rotate(-90 8 280)">axis=0</text>

    <line x1="30" y1="345" x2="230" y2="345" stroke="#f59e0b" strokeWidth="2" />
    <text x="240" y="350" fill="#f59e0b" fontSize="10">axis=1</text>

    {/* 3D Array */}
    <text x="550" y="65" textAnchor="middle" fill="#a78bfa" fontSize="13" fontWeight="bold">3D Array (Tensor)</text>
    <text x="550" y="82" textAnchor="middle" fill="#6b7280" fontSize="10">shape: (2, 3, 4)</text>

    {/* 3D visualization - two stacked 2D arrays */}
    {/* Back layer */}
    {[0, 1, 2].map(row => (
      [0, 1, 2, 3].map(col => (
        <g key={`3d-back-${row}-${col}`}>
          <rect x={420 + col * 42 + 25} y={95 + row * 35 - 15} width="38" height="32" rx="3" fill="#4c1d95" stroke="#6d28d9" opacity="0.7" />
        </g>
      ))
    ))}

    {/* Front layer */}
    {[0, 1, 2].map(row => (
      [0, 1, 2, 3].map(col => (
        <g key={`3d-front-${row}-${col}`}>
          <rect x={400 + col * 42} y={110 + row * 35} width="38" height="32" rx="3" fill="url(#np3dGrad)" filter="url(#npShadow)" />
          <text x={419 + col * 42} y={131 + row * 35} textAnchor="middle" fill="white" fontSize="10">{row * 4 + col + 1}</text>
        </g>
      ))
    ))}

    {/* Axis indicators for 3D */}
    <line x1="385" y1="110" x2="385" y2="215" stroke="#ec4899" strokeWidth="2" />
    <text x="378" y="165" fill="#ec4899" fontSize="9" transform="rotate(-90 378 165)">axis=1</text>

    <line x1="400" y1="225" x2="570" y2="225" stroke="#f59e0b" strokeWidth="2" />
    <text x="575" y="230" fill="#f59e0b" fontSize="9">axis=2</text>

    <line x1="570" y1="95" x2="600" y2="65" stroke="#22d3ee" strokeWidth="2" />
    <text x="605" y="65" fill="#22d3ee" fontSize="9">axis=0</text>

    {/* Operations section */}
    <rect x="400" y="250" width="380" height="115" rx="8" fill="#1f2937" stroke="#374151" />
    <text x="420" y="275" fill="#93c5fd" fontSize="12" fontWeight="bold">Common Operations</text>

    <text x="420" y="298" fill="#d1d5db" fontSize="10">arr.sum(axis=0) - Sum along rows</text>
    <text x="420" y="316" fill="#d1d5db" fontSize="10">arr.mean(axis=1) - Mean along columns</text>
    <text x="420" y="334" fill="#d1d5db" fontSize="10">arr.reshape(3, 4) - Change shape</text>
    <text x="420" y="352" fill="#d1d5db" fontSize="10">arr.T - Transpose matrix</text>

    <text x="620" y="298" fill="#d1d5db" fontSize="10">arr.flatten() - To 1D</text>
    <text x="620" y="316" fill="#d1d5db" fontSize="10">np.concatenate()</text>
    <text x="620" y="334" fill="#d1d5db" fontSize="10">np.stack()</text>
    <text x="620" y="352" fill="#d1d5db" fontSize="10">np.split()</text>
  </svg>
)

// SVG Diagram: Data Cleaning Pipeline
const DataCleaningDiagram = () => (
  <svg viewBox="0 0 850 320" style={{ width: '100%', maxWidth: '850px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="cleanGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="cleanGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="cleanGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="cleanGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="rawDataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6b7280" />
        <stop offset="100%" stopColor="#4b5563" />
      </linearGradient>
      <linearGradient id="cleanDataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <marker id="cleanArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#60a5fa" />
      </marker>
      <filter id="cleanShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="850" height="320" fill="#111827" rx="12" />

    {/* Title */}
    <text x="425" y="28" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">Data Cleaning Pipeline</text>

    {/* Raw Data */}
    <rect x="25" y="55" width="100" height="70" rx="8" fill="url(#rawDataGrad)" filter="url(#cleanShadow)" />
    <text x="75" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Raw Data</text>
    <text x="75" y="105" textAnchor="middle" fill="#d1d5db" fontSize="9">Messy, incomplete</text>

    {/* Arrow to step 1 */}
    <line x1="130" y1="90" x2="165" y2="90" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#cleanArrow)" />

    {/* Step 1: Missing Values */}
    <rect x="170" y="45" width="140" height="90" rx="8" fill="url(#cleanGrad1)" filter="url(#cleanShadow)" />
    <text x="240" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Missing Values</text>
    <line x1="185" y1="80" x2="295" y2="80" stroke="rgba(255,255,255,0.3)" />
    <text x="190" y="98" fill="#fecaca" fontSize="9">- df.dropna()</text>
    <text x="190" y="112" fill="#fecaca" fontSize="9">- df.fillna(value)</text>
    <text x="190" y="126" fill="#fecaca" fontSize="9">- interpolate()</text>

    {/* Arrow to step 2 */}
    <line x1="315" y1="90" x2="350" y2="90" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#cleanArrow)" />

    {/* Step 2: Outliers */}
    <rect x="355" y="45" width="140" height="90" rx="8" fill="url(#cleanGrad2)" filter="url(#cleanShadow)" />
    <text x="425" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Outliers</text>
    <line x1="370" y1="80" x2="480" y2="80" stroke="rgba(255,255,255,0.3)" />
    <text x="365" y="98" fill="#fef3c7" fontSize="9">- Z-score method</text>
    <text x="365" y="112" fill="#fef3c7" fontSize="9">- IQR method</text>
    <text x="365" y="126" fill="#fef3c7" fontSize="9">- clip() values</text>

    {/* Arrow to step 3 */}
    <line x1="500" y1="90" x2="535" y2="90" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#cleanArrow)" />

    {/* Step 3: Encoding */}
    <rect x="540" y="45" width="140" height="90" rx="8" fill="url(#cleanGrad3)" filter="url(#cleanShadow)" />
    <text x="610" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Encoding</text>
    <line x1="555" y1="80" x2="665" y2="80" stroke="rgba(255,255,255,0.3)" />
    <text x="550" y="98" fill="#bfdbfe" fontSize="9">- Label encoding</text>
    <text x="550" y="112" fill="#bfdbfe" fontSize="9">- One-hot encoding</text>
    <text x="550" y="126" fill="#bfdbfe" fontSize="9">- pd.get_dummies()</text>

    {/* Arrow to step 4 */}
    <line x1="685" y1="90" x2="720" y2="90" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#cleanArrow)" />

    {/* Step 4: Scaling */}
    <rect x="725" y="45" width="100" height="90" rx="8" fill="url(#cleanGrad4)" filter="url(#cleanShadow)" />
    <text x="775" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Scaling</text>
    <line x1="735" y1="80" x2="815" y2="80" stroke="rgba(255,255,255,0.3)" />
    <text x="735" y="98" fill="#a7f3d0" fontSize="9">- StandardScaler</text>
    <text x="735" y="112" fill="#a7f3d0" fontSize="9">- MinMaxScaler</text>
    <text x="735" y="126" fill="#a7f3d0" fontSize="9">- normalize()</text>

    {/* Clean Data */}
    <rect x="375" y="160" width="100" height="55" rx="8" fill="url(#cleanDataGrad)" filter="url(#cleanShadow)" />
    <text x="425" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Clean Data</text>
    <text x="425" y="202" textAnchor="middle" fill="#bbf7d0" fontSize="9">Ready for ML</text>

    {/* Arrow down from scaling to clean data */}
    <path d="M775,140 L775,187 L480,187" fill="none" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#cleanArrow)" />

    {/* Additional info boxes */}
    <rect x="25" y="230" width="250" height="75" rx="6" fill="#1f2937" stroke="#374151" />
    <text x="40" y="252" fill="#ef4444" fontSize="11" fontWeight="bold">Missing Values Strategies:</text>
    <text x="40" y="270" fill="#d1d5db" fontSize="9">- Drop: Remove rows/columns with NaN</text>
    <text x="40" y="285" fill="#d1d5db" fontSize="9">- Fill: Mean, median, mode, or constant</text>
    <text x="40" y="300" fill="#d1d5db" fontSize="9">- Interpolate: Estimate based on neighbors</text>

    <rect x="300" y="230" width="250" height="75" rx="6" fill="#1f2937" stroke="#374151" />
    <text x="315" y="252" fill="#f59e0b" fontSize="11" fontWeight="bold">Outlier Detection:</text>
    <text x="315" y="270" fill="#d1d5db" fontSize="9">- Z-score: |z| greater than 3 are outliers</text>
    <text x="315" y="285" fill="#d1d5db" fontSize="9">- IQR: Below Q1-1.5*IQR or above Q3+1.5*IQR</text>
    <text x="315" y="300" fill="#d1d5db" fontSize="9">- Visual: Box plots, scatter plots</text>

    <rect x="575" y="230" width="250" height="75" rx="6" fill="#1f2937" stroke="#374151" />
    <text x="590" y="252" fill="#10b981" fontSize="11" fontWeight="bold">Scaling Methods:</text>
    <text x="590" y="270" fill="#d1d5db" fontSize="9">- Standard: (x - mean) / std (z-score)</text>
    <text x="590" y="285" fill="#d1d5db" fontSize="9">- MinMax: (x - min) / (max - min) to [0,1]</text>
    <text x="590" y="300" fill="#d1d5db" fontSize="9">- Robust: Uses median and IQR</text>
  </svg>
)

// SVG Diagram: Visualization Types Guide
const VisualizationTypesDiagram = () => (
  <svg viewBox="0 0 850 420" style={{ width: '100%', maxWidth: '850px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="vizBarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
      <linearGradient id="vizLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#34d399" />
      </linearGradient>
      <linearGradient id="vizScatterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
      <linearGradient id="vizHistGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <linearGradient id="vizPieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#f472b6" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="850" height="420" fill="#111827" rx="12" />

    {/* Title */}
    <text x="425" y="28" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">When to Use Different Chart Types</text>

    {/* Bar Chart */}
    <rect x="25" y="50" width="155" height="165" rx="8" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" />
    <text x="102" y="72" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Bar Chart</text>

    {/* Mini bar chart */}
    <rect x="45" y="85" width="25" height="60" rx="2" fill="url(#vizBarGrad)" />
    <rect x="75" y="95" width="25" height="50" rx="2" fill="url(#vizBarGrad)" />
    <rect x="105" y="75" width="25" height="70" rx="2" fill="url(#vizBarGrad)" />
    <rect x="135" y="105" width="25" height="40" rx="2" fill="url(#vizBarGrad)" />
    <line x1="40" y1="150" x2="165" y2="150" stroke="#4b5563" strokeWidth="1" />

    <text x="102" y="170" textAnchor="middle" fill="#9ca3af" fontSize="9">Compare categories</text>
    <text x="102" y="183" textAnchor="middle" fill="#6b7280" fontSize="8">Sales by region,</text>
    <text x="102" y="195" textAnchor="middle" fill="#6b7280" fontSize="8">counts by group</text>
    <text x="102" y="207" textAnchor="middle" fill="#3b82f6" fontSize="8">plt.bar() / sns.barplot()</text>

    {/* Line Chart */}
    <rect x="190" y="50" width="155" height="165" rx="8" fill="#1f2937" stroke="#10b981" strokeWidth="2" />
    <text x="267" y="72" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Line Chart</text>

    {/* Mini line chart */}
    <polyline points="210,130 230,110 250,120 270,95 290,100 310,80 330,90" fill="none" stroke="url(#vizLineGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="210" cy="130" r="3" fill="#34d399" />
    <circle cx="250" cy="120" r="3" fill="#34d399" />
    <circle cx="290" cy="100" r="3" fill="#34d399" />
    <circle cx="330" cy="90" r="3" fill="#34d399" />
    <line x1="205" y1="145" x2="335" y2="145" stroke="#4b5563" strokeWidth="1" />

    <text x="267" y="170" textAnchor="middle" fill="#9ca3af" fontSize="9">Trends over time</text>
    <text x="267" y="183" textAnchor="middle" fill="#6b7280" fontSize="8">Stock prices, metrics</text>
    <text x="267" y="195" textAnchor="middle" fill="#6b7280" fontSize="8">over time periods</text>
    <text x="267" y="207" textAnchor="middle" fill="#10b981" fontSize="8">plt.plot() / sns.lineplot()</text>

    {/* Scatter Plot */}
    <rect x="355" y="50" width="155" height="165" rx="8" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2" />
    <text x="432" y="72" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Scatter Plot</text>

    {/* Mini scatter plot */}
    <circle cx="380" cy="125" r="4" fill="url(#vizScatterGrad)" />
    <circle cx="395" cy="110" r="5" fill="url(#vizScatterGrad)" />
    <circle cx="415" cy="100" r="4" fill="url(#vizScatterGrad)" />
    <circle cx="430" cy="115" r="6" fill="url(#vizScatterGrad)" />
    <circle cx="450" cy="90" r="4" fill="url(#vizScatterGrad)" />
    <circle cx="465" cy="105" r="5" fill="url(#vizScatterGrad)" />
    <circle cx="480" cy="85" r="4" fill="url(#vizScatterGrad)" />
    <circle cx="420" cy="130" r="3" fill="url(#vizScatterGrad)" />
    <circle cx="460" cy="120" r="4" fill="url(#vizScatterGrad)" />
    <line x1="370" y1="145" x2="495" y2="145" stroke="#4b5563" strokeWidth="1" />
    <line x1="370" y1="145" x2="370" y2="80" stroke="#4b5563" strokeWidth="1" />

    <text x="432" y="170" textAnchor="middle" fill="#9ca3af" fontSize="9">Relationships</text>
    <text x="432" y="183" textAnchor="middle" fill="#6b7280" fontSize="8">Correlation between</text>
    <text x="432" y="195" textAnchor="middle" fill="#6b7280" fontSize="8">two variables</text>
    <text x="432" y="207" textAnchor="middle" fill="#8b5cf6" fontSize="8">plt.scatter() / sns.scatterplot()</text>

    {/* Histogram */}
    <rect x="520" y="50" width="155" height="165" rx="8" fill="#1f2937" stroke="#f59e0b" strokeWidth="2" />
    <text x="597" y="72" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Histogram</text>

    {/* Mini histogram */}
    <rect x="540" y="125" width="18" height="20" rx="1" fill="url(#vizHistGrad)" />
    <rect x="560" y="105" width="18" height="40" rx="1" fill="url(#vizHistGrad)" />
    <rect x="580" y="85" width="18" height="60" rx="1" fill="url(#vizHistGrad)" />
    <rect x="600" y="95" width="18" height="50" rx="1" fill="url(#vizHistGrad)" />
    <rect x="620" y="110" width="18" height="35" rx="1" fill="url(#vizHistGrad)" />
    <rect x="640" y="130" width="18" height="15" rx="1" fill="url(#vizHistGrad)" />
    <line x1="535" y1="148" x2="665" y2="148" stroke="#4b5563" strokeWidth="1" />

    <text x="597" y="170" textAnchor="middle" fill="#9ca3af" fontSize="9">Distribution</text>
    <text x="597" y="183" textAnchor="middle" fill="#6b7280" fontSize="8">Frequency of values,</text>
    <text x="597" y="195" textAnchor="middle" fill="#6b7280" fontSize="8">shape of data</text>
    <text x="597" y="207" textAnchor="middle" fill="#f59e0b" fontSize="8">plt.hist() / sns.histplot()</text>

    {/* Pie Chart */}
    <rect x="685" y="50" width="140" height="165" rx="8" fill="#1f2937" stroke="#ec4899" strokeWidth="2" />
    <text x="755" y="72" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="bold">Pie Chart</text>

    {/* Mini pie chart */}
    <circle cx="755" cy="115" r="35" fill="#1f2937" stroke="#374151" />
    <path d="M755,115 L755,80 A35,35 0 0,1 785,100 Z" fill="#ec4899" />
    <path d="M755,115 L785,100 A35,35 0 0,1 780,145 Z" fill="#8b5cf6" />
    <path d="M755,115 L780,145 A35,35 0 0,1 730,145 Z" fill="#3b82f6" />
    <path d="M755,115 L730,145 A35,35 0 0,1 755,80 Z" fill="#10b981" />

    <text x="755" y="170" textAnchor="middle" fill="#9ca3af" fontSize="9">Proportions</text>
    <text x="755" y="183" textAnchor="middle" fill="#6b7280" fontSize="8">Parts of a whole,</text>
    <text x="755" y="195" textAnchor="middle" fill="#6b7280" fontSize="8">market share</text>
    <text x="755" y="207" textAnchor="middle" fill="#ec4899" fontSize="8">plt.pie()</text>

    {/* Additional chart types */}
    <rect x="25" y="230" width="260" height="175" rx="8" fill="#1f2937" stroke="#374151" />
    <text x="155" y="255" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">More Chart Types</text>

    <text x="40" y="280" fill="#60a5fa" fontSize="10" fontWeight="bold">Box Plot</text>
    <text x="40" y="295" fill="#9ca3af" fontSize="9">Compare distributions, find outliers</text>
    <text x="40" y="308" fill="#6b7280" fontSize="8">sns.boxplot() / plt.boxplot()</text>

    <text x="40" y="330" fill="#34d399" fontSize="10" fontWeight="bold">Heatmap</text>
    <text x="40" y="345" fill="#9ca3af" fontSize="9">Correlation matrices, 2D data density</text>
    <text x="40" y="358" fill="#6b7280" fontSize="8">sns.heatmap()</text>

    <text x="40" y="380" fill="#f472b6" fontSize="10" fontWeight="bold">Violin Plot</text>
    <text x="40" y="395" fill="#9ca3af" fontSize="9">Distribution shape + box plot combined</text>

    {/* Decision guide */}
    <rect x="300" y="230" width="525" height="175" rx="8" fill="#1f2937" stroke="#374151" />
    <text x="562" y="255" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">Quick Decision Guide</text>

    <text x="320" y="280" fill="#d1d5db" fontSize="10">Comparing categories?</text>
    <text x="520" y="280" fill="#3b82f6" fontSize="10" fontWeight="bold">Bar Chart</text>

    <text x="320" y="302" fill="#d1d5db" fontSize="10">Showing change over time?</text>
    <text x="520" y="302" fill="#10b981" fontSize="10" fontWeight="bold">Line Chart</text>

    <text x="320" y="324" fill="#d1d5db" fontSize="10">Exploring relationship between 2 variables?</text>
    <text x="620" y="324" fill="#8b5cf6" fontSize="10" fontWeight="bold">Scatter Plot</text>

    <text x="320" y="346" fill="#d1d5db" fontSize="10">Understanding data distribution?</text>
    <text x="570" y="346" fill="#f59e0b" fontSize="10" fontWeight="bold">Histogram</text>

    <text x="320" y="368" fill="#d1d5db" fontSize="10">Showing parts of a whole?</text>
    <text x="520" y="368" fill="#ec4899" fontSize="10" fontWeight="bold">Pie Chart</text>

    <text x="320" y="390" fill="#d1d5db" fontSize="10">Comparing distributions across groups?</text>
    <text x="600" y="390" fill="#22d3ee" fontSize="10" fontWeight="bold">Box/Violin Plot</text>
  </svg>
)

function DataScience({ onBack, breadcrumb }) {
  const [selectedSection, setSelectedSection] = useState(null)

  const sections = [
    {
      id: 'numpy-basics',
      name: 'NumPy Basics',
      icon: '🔢',
      color: '#3b82f6',
      description: 'N-dimensional arrays, operations, and broadcasting',
      topics: [
        {
          title: 'Array Creation',
          code: `import numpy as np

# Create arrays from lists
arr1d = np.array([1, 2, 3, 4, 5])
arr2d = np.array([[1, 2, 3], [4, 5, 6]])
print(arr1d)        # [1 2 3 4 5]
print(arr2d.shape)  # (2, 3)

# Create arrays with functions
zeros = np.zeros((3, 4))          # 3x4 matrix of zeros
ones = np.ones((2, 3))            # 2x3 matrix of ones
empty = np.empty((2, 2))          # Uninitialized values
full = np.full((3, 3), 7)         # 3x3 filled with 7

# Range and linspace
arange = np.arange(0, 10, 2)      # [0 2 4 6 8]
linspace = np.linspace(0, 1, 5)   # [0.   0.25 0.5  0.75 1.  ]

# Identity matrix and random
identity = np.eye(3)              # 3x3 identity matrix
random_arr = np.random.rand(3, 3) # Random values 0-1
random_int = np.random.randint(0, 100, (3, 3))  # Random integers

# Reshape arrays
arr = np.arange(12)
reshaped = arr.reshape(3, 4)      # 3x4 matrix
flattened = reshaped.flatten()   # Back to 1D`
        },
        {
          title: 'Array Operations',
          code: `import numpy as np

a = np.array([1, 2, 3, 4])
b = np.array([5, 6, 7, 8])

# Element-wise operations
print(a + b)       # [ 6  8 10 12]
print(a - b)       # [-4 -4 -4 -4]
print(a * b)       # [ 5 12 21 32]
print(a / b)       # [0.2 0.33 0.43 0.5]
print(a ** 2)      # [ 1  4  9 16]

# Mathematical functions
print(np.sqrt(a))      # [1.   1.41 1.73 2.  ]
print(np.exp(a))       # [ 2.72  7.39 20.09 54.60]
print(np.log(a))       # [0.   0.69 1.10 1.39]
print(np.sin(a))       # [0.84 0.91 0.14 -0.76]

# Aggregation functions
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(np.sum(arr))           # 21
print(np.sum(arr, axis=0))   # [5 7 9] (column sums)
print(np.sum(arr, axis=1))   # [6 15] (row sums)
print(np.mean(arr))          # 3.5
print(np.std(arr))           # 1.71
print(np.min(arr))           # 1
print(np.max(arr))           # 6
print(np.argmax(arr))        # 5 (index of max)`
        },
        {
          title: 'Broadcasting',
          code: `import numpy as np

# Broadcasting allows operations on different shapes
a = np.array([[1, 2, 3],
              [4, 5, 6]])

# Scalar broadcast
print(a + 10)
# [[11 12 13]
#  [14 15 16]]

# 1D array broadcast across rows
b = np.array([1, 2, 3])
print(a + b)
# [[2 4 6]
#  [5 7 9]]

# Column vector broadcast
c = np.array([[10], [20]])
print(a + c)
# [[11 12 13]
#  [24 25 26]]

# Rules of broadcasting:
# 1. If arrays have different ndim, prepend 1s to smaller shape
# 2. Arrays with size 1 along a dimension act like the larger size
# 3. Arrays must match or have size 1 along each dimension

# Example: Normalizing rows
data = np.array([[1, 2, 3],
                 [4, 5, 6]])
row_means = data.mean(axis=1, keepdims=True)
normalized = data - row_means
print(normalized)
# [[-1.  0.  1.]
#  [-1.  0.  1.]]`
        },
        {
          title: 'Indexing and Slicing',
          code: `import numpy as np

arr = np.array([[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]])

# Basic indexing
print(arr[0, 0])     # 1
print(arr[1, 2])     # 7
print(arr[-1, -1])   # 12

# Slicing [start:stop:step]
print(arr[0, :])     # [1 2 3 4] (first row)
print(arr[:, 0])     # [1 5 9] (first column)
print(arr[0:2, 1:3]) # [[2 3] [6 7]] (submatrix)
print(arr[::2, :])   # [[1 2 3 4] [9 10 11 12]] (every other row)

# Boolean indexing
print(arr[arr > 5])  # [ 6  7  8  9 10 11 12]
arr[arr < 3] = 0     # Set values < 3 to 0

# Fancy indexing (using arrays)
indices = np.array([0, 2])
print(arr[indices])  # Rows 0 and 2

# np.where for conditional selection
result = np.where(arr > 5, arr, 0)  # Keep if > 5, else 0
print(result)`
        }
      ]
    },
    {
      id: 'pandas-dataframes',
      name: 'Pandas DataFrames',
      icon: '📊',
      color: '#10b981',
      description: 'Data manipulation and analysis with DataFrames',
      topics: [
        {
          title: 'DataFrame Creation',
          code: `import pandas as pd
import numpy as np

# From dictionary
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 28],
    'city': ['NYC', 'LA', 'Chicago', 'Boston'],
    'salary': [70000, 80000, 90000, 75000]
}
df = pd.DataFrame(data)
print(df)
#       name  age     city  salary
# 0    Alice   25      NYC   70000
# 1      Bob   30       LA   80000
# 2  Charlie   35  Chicago   90000
# 3    David   28   Boston   75000

# From NumPy array
arr = np.random.rand(4, 3)
df2 = pd.DataFrame(arr, columns=['A', 'B', 'C'])

# From CSV file
df_csv = pd.read_csv('data.csv')

# From Excel file
df_excel = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# From JSON
df_json = pd.read_json('data.json')

# Basic info
print(df.shape)       # (4, 4)
print(df.columns)     # Index(['name', 'age', 'city', 'salary'])
print(df.dtypes)      # Data types of each column
print(df.info())      # Summary info
print(df.describe())  # Statistical summary`
        },
        {
          title: 'Indexing and Selection',
          code: `import pandas as pd

df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 28],
    'salary': [70000, 80000, 90000, 75000]
})

# Column selection
print(df['name'])              # Single column (Series)
print(df[['name', 'age']])     # Multiple columns (DataFrame)

# Row selection with .loc (label-based)
print(df.loc[0])               # First row
print(df.loc[0:2])             # Rows 0, 1, 2 (inclusive!)
print(df.loc[0, 'name'])       # Specific cell: 'Alice'
print(df.loc[:, 'name'])       # All rows, 'name' column

# Row selection with .iloc (integer position)
print(df.iloc[0])              # First row
print(df.iloc[0:2])            # Rows 0, 1 (exclusive!)
print(df.iloc[0, 0])           # First cell
print(df.iloc[:, 0:2])         # All rows, first 2 columns

# Boolean indexing
print(df[df['age'] > 28])      # Rows where age > 28
print(df[df['name'].str.startswith('A')])  # Name starts with 'A'

# Multiple conditions
mask = (df['age'] > 25) & (df['salary'] > 70000)
print(df[mask])

# Using query() method
print(df.query('age > 28 and salary > 70000'))

# isin() for multiple values
print(df[df['name'].isin(['Alice', 'Bob'])])`
        },
        {
          title: 'Data Manipulation',
          code: `import pandas as pd

df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'salary': [70000, 80000, 90000]
})

# Adding columns
df['bonus'] = df['salary'] * 0.1
df['total'] = df['salary'] + df['bonus']

# Apply function to column
df['age_group'] = df['age'].apply(lambda x: 'Young' if x < 30 else 'Senior')

# Rename columns
df = df.rename(columns={'name': 'employee_name'})

# Drop columns/rows
df = df.drop(columns=['bonus'])
df = df.drop(index=[0])  # Drop first row

# Sorting
df = df.sort_values('salary', ascending=False)
df = df.sort_values(['age', 'salary'], ascending=[True, False])
df = df.sort_index()  # Sort by index

# Reset index
df = df.reset_index(drop=True)

# Set a column as index
df = df.set_index('employee_name')

# Value replacement
df['salary'] = df['salary'].replace(80000, 85000)
df['age_group'] = df['age_group'].map({'Young': 0, 'Senior': 1})

# Assign multiple columns at once
df = df.assign(
    tax=df['salary'] * 0.2,
    net_salary=lambda x: x['salary'] - x['tax']
)`
        },
        {
          title: 'GroupBy Operations',
          code: `import pandas as pd

df = pd.DataFrame({
    'department': ['Sales', 'Sales', 'IT', 'IT', 'HR'],
    'employee': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'salary': [50000, 60000, 70000, 80000, 55000],
    'bonus': [5000, 6000, 7000, 8000, 5500]
})

# Basic groupby
grouped = df.groupby('department')
print(grouped['salary'].mean())
# department
# HR       55000
# IT       75000
# Sales    55000

# Multiple aggregations
print(df.groupby('department').agg({
    'salary': ['mean', 'sum', 'count'],
    'bonus': 'sum'
}))

# Named aggregations (cleaner output)
result = df.groupby('department').agg(
    avg_salary=('salary', 'mean'),
    total_bonus=('bonus', 'sum'),
    employee_count=('employee', 'count')
)
print(result)

# Transform - returns same-shaped DataFrame
df['salary_mean'] = df.groupby('department')['salary'].transform('mean')
df['salary_rank'] = df.groupby('department')['salary'].rank(ascending=False)

# Filter groups
high_salary_depts = df.groupby('department').filter(
    lambda x: x['salary'].mean() > 60000
)

# Apply custom function
def top_earner(group):
    return group.nlargest(1, 'salary')

top_earners = df.groupby('department').apply(top_earner)`
        },
        {
          title: 'Merging and Joining',
          code: `import pandas as pd

# Sample DataFrames
employees = pd.DataFrame({
    'emp_id': [1, 2, 3, 4],
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'dept_id': [101, 102, 101, 103]
})

departments = pd.DataFrame({
    'dept_id': [101, 102, 104],
    'dept_name': ['Sales', 'IT', 'Marketing']
})

# Inner join (default) - only matching keys
inner = pd.merge(employees, departments, on='dept_id')
print(inner)

# Left join - all from left, matching from right
left = pd.merge(employees, departments, on='dept_id', how='left')
print(left)

# Right join - all from right, matching from left
right = pd.merge(employees, departments, on='dept_id', how='right')

# Outer join - all from both
outer = pd.merge(employees, departments, on='dept_id', how='outer')

# Join on different column names
df1 = pd.DataFrame({'id': [1, 2], 'value': ['a', 'b']})
df2 = pd.DataFrame({'key': [1, 2], 'data': ['x', 'y']})
merged = pd.merge(df1, df2, left_on='id', right_on='key')

# Concatenate DataFrames
df_top = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df_bottom = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})
concatenated = pd.concat([df_top, df_bottom], ignore_index=True)

# Concatenate horizontally
df_left = pd.DataFrame({'A': [1, 2]})
df_right = pd.DataFrame({'B': [3, 4]})
side_by_side = pd.concat([df_left, df_right], axis=1)`
        }
      ]
    },
    {
      id: 'data-visualization',
      name: 'Data Visualization',
      icon: '📈',
      color: '#8b5cf6',
      description: 'Creating charts and plots with Matplotlib and Seaborn',
      topics: [
        {
          title: 'Matplotlib Basics',
          code: `import matplotlib.pyplot as plt
import numpy as np

# Basic line plot
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)', color='blue', linewidth=2)
plt.plot(x, np.cos(x), label='cos(x)', color='red', linestyle='--')
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('Trigonometric Functions')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('plot.png', dpi=300, bbox_inches='tight')
plt.show()

# Scatter plot
np.random.seed(42)
x = np.random.rand(50)
y = np.random.rand(50)
colors = np.random.rand(50)
sizes = 1000 * np.random.rand(50)

plt.figure(figsize=(8, 6))
plt.scatter(x, y, c=colors, s=sizes, alpha=0.5, cmap='viridis')
plt.colorbar(label='Color scale')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Scatter Plot with Color and Size')
plt.show()

# Bar chart
categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 56, 78, 32]

plt.figure(figsize=(8, 5))
plt.bar(categories, values, color='steelblue', edgecolor='black')
plt.xlabel('Categories')
plt.ylabel('Values')
plt.title('Bar Chart')
plt.show()`
        },
        {
          title: 'Subplots and Multiple Charts',
          code: `import matplotlib.pyplot as plt
import numpy as np

# Create multiple subplots
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Plot 1: Line plot
x = np.linspace(0, 10, 100)
axes[0, 0].plot(x, np.sin(x), 'b-', label='sin')
axes[0, 0].plot(x, np.cos(x), 'r--', label='cos')
axes[0, 0].set_title('Line Plot')
axes[0, 0].legend()
axes[0, 0].grid(True)

# Plot 2: Histogram
data = np.random.randn(1000)
axes[0, 1].hist(data, bins=30, color='green', alpha=0.7, edgecolor='black')
axes[0, 1].set_title('Histogram')
axes[0, 1].set_xlabel('Value')
axes[0, 1].set_ylabel('Frequency')

# Plot 3: Box plot
data = [np.random.randn(100) for _ in range(4)]
axes[1, 0].boxplot(data, labels=['A', 'B', 'C', 'D'])
axes[1, 0].set_title('Box Plot')

# Plot 4: Pie chart
sizes = [30, 25, 20, 15, 10]
labels = ['Python', 'Java', 'JavaScript', 'C++', 'Other']
axes[1, 1].pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
axes[1, 1].set_title('Pie Chart')

plt.tight_layout()
plt.show()

# Shared axes
fig, (ax1, ax2) = plt.subplots(1, 2, sharey=True, figsize=(10, 4))
ax1.bar(['A', 'B', 'C'], [10, 20, 15])
ax2.bar(['D', 'E', 'F'], [12, 18, 22])
plt.show()`
        },
        {
          title: 'Seaborn Statistical Visualizations',
          code: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Load sample dataset
tips = sns.load_dataset('tips')

# Set style
sns.set_theme(style='whitegrid')

# Distribution plot
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
sns.histplot(data=tips, x='total_bill', kde=True, ax=axes[0])
axes[0].set_title('Distribution of Total Bill')
sns.boxplot(data=tips, x='day', y='total_bill', ax=axes[1])
axes[1].set_title('Total Bill by Day')
plt.tight_layout()
plt.show()

# Scatter plot with regression
plt.figure(figsize=(8, 6))
sns.regplot(data=tips, x='total_bill', y='tip', scatter_kws={'alpha': 0.5})
plt.title('Tip vs Total Bill with Regression Line')
plt.show()

# Categorical plots
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
sns.violinplot(data=tips, x='day', y='total_bill', hue='sex', ax=axes[0])
axes[0].set_title('Violin Plot')
sns.swarmplot(data=tips, x='day', y='total_bill', hue='sex', ax=axes[1])
axes[1].set_title('Swarm Plot')
plt.tight_layout()
plt.show()

# Heatmap for correlation
corr = tips.select_dtypes(include=[np.number]).corr()
plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, cmap='coolwarm', center=0)
plt.title('Correlation Heatmap')
plt.show()

# Pair plot
sns.pairplot(tips, hue='sex', diag_kind='kde')
plt.show()`
        },
        {
          title: 'Customizing Plots',
          code: `import matplotlib.pyplot as plt
import numpy as np

# Custom style
plt.style.use('seaborn-v0_8-darkgrid')

# Create figure with custom size and DPI
fig, ax = plt.subplots(figsize=(10, 6), dpi=100)

# Plot with custom styling
x = np.linspace(0, 10, 100)
ax.plot(x, np.sin(x), color='#2ecc71', linewidth=2.5,
        linestyle='-', marker='o', markevery=10,
        markersize=8, label='Sine Wave')

# Customize axes
ax.set_xlim(0, 10)
ax.set_ylim(-1.5, 1.5)
ax.set_xlabel('Time (s)', fontsize=12, fontweight='bold')
ax.set_ylabel('Amplitude', fontsize=12, fontweight='bold')
ax.set_title('Custom Styled Plot', fontsize=14, fontweight='bold', pad=20)

# Customize ticks
ax.tick_params(axis='both', which='major', labelsize=10)
ax.set_xticks(np.arange(0, 11, 2))

# Add annotations
ax.annotate('Peak', xy=(np.pi/2, 1), xytext=(2, 1.3),
            arrowprops=dict(arrowstyle='->', color='red'),
            fontsize=11, color='red')

# Add horizontal/vertical lines
ax.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
ax.axvline(x=np.pi, color='orange', linestyle=':', alpha=0.7)

# Fill between
ax.fill_between(x, 0, np.sin(x), where=(np.sin(x) > 0),
                alpha=0.3, color='green', label='Positive')

# Legend customization
ax.legend(loc='upper right', fontsize=10, framealpha=0.9,
          edgecolor='black', fancybox=True, shadow=True)

# Add text box
textstr = 'Max: 1.0\\nMin: -1.0'
props = dict(boxstyle='round', facecolor='wheat', alpha=0.5)
ax.text(0.02, 0.98, textstr, transform=ax.transAxes, fontsize=10,
        verticalalignment='top', bbox=props)

plt.tight_layout()
plt.savefig('custom_plot.png', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')
plt.show()`
        }
      ]
    },
    {
      id: 'data-cleaning',
      name: 'Data Cleaning',
      icon: '🧹',
      color: '#f59e0b',
      description: 'Handling missing values, duplicates, and type conversion',
      topics: [
        {
          title: 'Handling Missing Values',
          code: `import pandas as pd
import numpy as np

# Create DataFrame with missing values
df = pd.DataFrame({
    'A': [1, 2, np.nan, 4, 5],
    'B': [np.nan, 2, 3, np.nan, 5],
    'C': ['a', 'b', np.nan, 'd', 'e']
})

# Check for missing values
print(df.isnull())           # Boolean mask
print(df.isnull().sum())     # Count per column
print(df.isnull().sum().sum())  # Total count
print(df.isna().any())       # Any missing in each column

# Drop missing values
df_dropped = df.dropna()              # Drop rows with any NaN
df_dropped = df.dropna(axis=1)        # Drop columns with any NaN
df_dropped = df.dropna(how='all')     # Drop only if all values are NaN
df_dropped = df.dropna(thresh=2)      # Keep rows with at least 2 non-NaN
df_dropped = df.dropna(subset=['A'])  # Drop if NaN in column 'A'

# Fill missing values
df_filled = df.fillna(0)              # Fill with scalar
df_filled = df.fillna({'A': 0, 'B': df['B'].mean()})  # Per column
df_filled = df.fillna(method='ffill')  # Forward fill
df_filled = df.fillna(method='bfill')  # Backward fill

# Interpolation
df['A'] = df['A'].interpolate()       # Linear interpolation
df['B'] = df['B'].interpolate(method='polynomial', order=2)

# Replace specific values
df = df.replace(-999, np.nan)         # Replace -999 with NaN
df = df.replace({-999: np.nan, -1: 0})  # Multiple replacements

# For time series: resample and fill
# df = df.resample('D').mean().interpolate()`
        },
        {
          title: 'Handling Duplicates',
          code: `import pandas as pd

df = pd.DataFrame({
    'id': [1, 2, 2, 3, 3, 3],
    'name': ['Alice', 'Bob', 'Bob', 'Charlie', 'Charlie', 'Charlie'],
    'value': [100, 200, 200, 300, 350, 300]
})

# Check for duplicates
print(df.duplicated())              # Boolean mask
print(df.duplicated().sum())        # Count duplicates
print(df.duplicated(subset=['id'])) # Check specific columns
print(df.duplicated(keep=False))    # Mark all duplicates (not just first)

# Drop duplicates
df_unique = df.drop_duplicates()                    # Keep first occurrence
df_unique = df.drop_duplicates(keep='last')         # Keep last occurrence
df_unique = df.drop_duplicates(keep=False)          # Remove all duplicates
df_unique = df.drop_duplicates(subset=['id'])       # Based on specific column
df_unique = df.drop_duplicates(subset=['id', 'name'])  # Multiple columns

# Find duplicate rows
duplicates = df[df.duplicated(keep=False)]
print("Duplicate rows:")
print(duplicates)

# Group and aggregate duplicates
df_agg = df.groupby(['id', 'name']).agg({
    'value': ['mean', 'count']
}).reset_index()

# Remove duplicates keeping max value
idx = df.groupby('id')['value'].idxmax()
df_max = df.loc[idx]
print(df_max)`
        },
        {
          title: 'Data Type Conversion',
          code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'int_col': ['1', '2', '3', '4'],
    'float_col': ['1.5', '2.5', '3.5', 'N/A'],
    'date_col': ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01'],
    'bool_col': ['True', 'False', 'True', 'True'],
    'category_col': ['A', 'B', 'A', 'C']
})

# Check data types
print(df.dtypes)

# Convert to numeric
df['int_col'] = pd.to_numeric(df['int_col'])
df['float_col'] = pd.to_numeric(df['float_col'], errors='coerce')  # N/A -> NaN

# Using astype
df['int_col'] = df['int_col'].astype(int)
df['int_col'] = df['int_col'].astype('int64')

# Convert to datetime
df['date_col'] = pd.to_datetime(df['date_col'])
df['date_col'] = pd.to_datetime(df['date_col'], format='%Y-%m-%d')

# Extract datetime components
df['year'] = df['date_col'].dt.year
df['month'] = df['date_col'].dt.month
df['day'] = df['date_col'].dt.day
df['weekday'] = df['date_col'].dt.day_name()

# Convert to boolean
df['bool_col'] = df['bool_col'].map({'True': True, 'False': False})

# Convert to category (memory efficient for repeated values)
df['category_col'] = df['category_col'].astype('category')

# Convert multiple columns at once
df = df.astype({
    'int_col': 'int64',
    'category_col': 'category'
})

# Memory usage comparison
print(df.memory_usage(deep=True))`
        },
        {
          title: 'String Cleaning',
          code: `import pandas as pd

df = pd.DataFrame({
    'name': ['  Alice  ', 'BOB', 'charlie', 'DAVID  '],
    'email': ['alice@email.com', 'bob@EMAIL.COM', 'CHARLIE@email', 'david@email.com'],
    'phone': ['123-456-7890', '(123) 456 7890', '1234567890', '123.456.7890']
})

# String methods (use .str accessor)
# Whitespace
df['name'] = df['name'].str.strip()           # Remove leading/trailing whitespace
df['name'] = df['name'].str.lstrip()          # Remove leading whitespace
df['name'] = df['name'].str.rstrip()          # Remove trailing whitespace

# Case conversion
df['name'] = df['name'].str.lower()           # lowercase
df['name'] = df['name'].str.upper()           # UPPERCASE
df['name'] = df['name'].str.title()           # Title Case
df['name'] = df['name'].str.capitalize()      # First letter caps

# Replace and clean
df['phone'] = df['phone'].str.replace(r'[^0-9]', '', regex=True)  # Keep only digits
df['email'] = df['email'].str.lower()

# Split and extract
df[['first', 'last']] = df['email'].str.split('@', expand=True)
df['domain'] = df['email'].str.extract(r'@(.+)')  # Regex extract

# Contains, startswith, endswith
gmail_users = df[df['email'].str.contains('gmail', case=False)]
valid_emails = df[df['email'].str.contains(r'^[\\w.]+@[\\w.]+\\.\\w+$', regex=True)]

# Pad and slice
df['phone'] = df['phone'].str.zfill(10)       # Pad with zeros
df['area_code'] = df['phone'].str[:3]         # First 3 characters

# Length
df['name_length'] = df['name'].str.len()

# Multiple replacements
df['clean_name'] = df['name'].str.replace(r'[^a-zA-Z]', '', regex=True)`
        },
        {
          title: 'Outlier Detection and Handling',
          code: `import pandas as pd
import numpy as np

# Create sample data with outliers
np.random.seed(42)
df = pd.DataFrame({
    'value': np.concatenate([np.random.normal(50, 10, 100), [200, -50, 300]])
})

# Z-score method
from scipy import stats
df['zscore'] = stats.zscore(df['value'])
outliers_zscore = df[np.abs(df['zscore']) > 3]
print(f"Outliers (Z-score > 3): {len(outliers_zscore)}")

# IQR method
Q1 = df['value'].quantile(0.25)
Q3 = df['value'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
outliers_iqr = df[(df['value'] < lower_bound) | (df['value'] > upper_bound)]
print(f"Outliers (IQR method): {len(outliers_iqr)}")

# Remove outliers
df_clean = df[(df['value'] >= lower_bound) & (df['value'] <= upper_bound)]

# Cap outliers (Winsorization)
df['value_capped'] = df['value'].clip(lower=lower_bound, upper=upper_bound)

# Replace outliers with median
median_value = df['value'].median()
df.loc[np.abs(df['zscore']) > 3, 'value'] = median_value

# Log transformation (for right-skewed data)
df['value_log'] = np.log1p(df['value'].clip(lower=0))

# Percentile-based capping
lower_cap = df['value'].quantile(0.01)
upper_cap = df['value'].quantile(0.99)
df['value_percentile_capped'] = df['value'].clip(lower=lower_cap, upper=upper_cap)

print(f"Original range: {df['value'].min():.2f} to {df['value'].max():.2f}")
print(f"Capped range: {df['value_capped'].min():.2f} to {df['value_capped'].max():.2f}")`
        }
      ]
    },
    {
      id: 'statistical-analysis',
      name: 'Statistical Analysis',
      icon: '📉',
      color: '#ec4899',
      description: 'Descriptive statistics, correlation, and hypothesis testing',
      topics: [
        {
          title: 'Descriptive Statistics',
          code: `import pandas as pd
import numpy as np

# Sample data
np.random.seed(42)
df = pd.DataFrame({
    'A': np.random.normal(100, 15, 1000),
    'B': np.random.exponential(50, 1000),
    'C': np.random.uniform(0, 100, 1000)
})

# Basic statistics
print(df.describe())              # count, mean, std, min, 25%, 50%, 75%, max
print(df.describe(percentiles=[.1, .25, .5, .75, .9]))  # Custom percentiles

# Central tendency
print(df['A'].mean())             # Mean: 100.x
print(df['A'].median())           # Median (50th percentile)
print(df['A'].mode())             # Mode (most frequent value)

# Dispersion
print(df['A'].std())              # Standard deviation
print(df['A'].var())              # Variance
print(df['A'].min(), df['A'].max())  # Range
print(df['A'].max() - df['A'].min())  # Range value

# Quantiles and percentiles
print(df['A'].quantile(0.25))     # 25th percentile (Q1)
print(df['A'].quantile([0.25, 0.5, 0.75]))  # Multiple quantiles

# Skewness and Kurtosis
print(df['A'].skew())             # Skewness (0 = symmetric)
print(df['A'].kurtosis())         # Kurtosis (0 = normal)
print(df['B'].skew())             # Exponential is right-skewed

# Summary for all columns
stats_summary = pd.DataFrame({
    'Mean': df.mean(),
    'Median': df.median(),
    'Std': df.std(),
    'Skewness': df.skew(),
    'Kurtosis': df.kurtosis()
})
print(stats_summary)`
        },
        {
          title: 'Correlation Analysis',
          code: `import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Sample data
np.random.seed(42)
x = np.random.randn(100)
df = pd.DataFrame({
    'x': x,
    'y': 2 * x + np.random.randn(100) * 0.5,  # Strong positive correlation
    'z': -x + np.random.randn(100) * 0.3,     # Strong negative correlation
    'w': np.random.randn(100)                  # No correlation
})

# Correlation matrix (Pearson by default)
corr_matrix = df.corr()
print("Correlation Matrix:")
print(corr_matrix)

# Specific correlation methods
pearson = df.corr(method='pearson')    # Linear relationship
spearman = df.corr(method='spearman')  # Monotonic relationship (rank-based)
kendall = df.corr(method='kendall')    # Ordinal data

# Correlation between specific columns
corr_xy = df['x'].corr(df['y'])
print(f"Correlation between x and y: {corr_xy:.4f}")

# Covariance
cov_matrix = df.cov()
print("Covariance Matrix:")
print(cov_matrix)

# Visualize correlation matrix
plt.figure(figsize=(8, 6))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0,
            vmin=-1, vmax=1, square=True, linewidths=0.5)
plt.title('Correlation Heatmap')
plt.show()

# Statistical significance of correlation
from scipy.stats import pearsonr, spearmanr
corr, p_value = pearsonr(df['x'], df['y'])
print(f"Pearson correlation: {corr:.4f}, p-value: {p_value:.4e}")

corr_spearman, p_spearman = spearmanr(df['x'], df['y'])
print(f"Spearman correlation: {corr_spearman:.4f}, p-value: {p_spearman:.4e}")`
        },
        {
          title: 'Hypothesis Testing',
          code: `import numpy as np
from scipy import stats

# Sample data
np.random.seed(42)
group_a = np.random.normal(100, 15, 50)  # Control group
group_b = np.random.normal(110, 15, 50)  # Treatment group

# 1. One-sample t-test (compare mean to known value)
t_stat, p_value = stats.ttest_1samp(group_a, 100)
print(f"One-sample t-test: t={t_stat:.4f}, p={p_value:.4f}")
if p_value < 0.05:
    print("Reject null hypothesis: Mean is significantly different from 100")

# 2. Two-sample independent t-test
t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"Two-sample t-test: t={t_stat:.4f}, p={p_value:.4f}")
if p_value < 0.05:
    print("Reject null hypothesis: Groups have significantly different means")

# 3. Paired t-test (before/after comparison)
before = np.random.normal(100, 10, 30)
after = before + np.random.normal(5, 3, 30)  # Small improvement
t_stat, p_value = stats.ttest_rel(before, after)
print(f"Paired t-test: t={t_stat:.4f}, p={p_value:.4f}")

# 4. Chi-square test (categorical data)
observed = np.array([[50, 30], [20, 40]])  # Contingency table
chi2, p_value, dof, expected = stats.chi2_contingency(observed)
print(f"Chi-square test: chi2={chi2:.4f}, p={p_value:.4f}")

# 5. ANOVA (compare multiple groups)
group_c = np.random.normal(105, 15, 50)
f_stat, p_value = stats.f_oneway(group_a, group_b, group_c)
print(f"ANOVA: F={f_stat:.4f}, p={p_value:.4f}")

# 6. Mann-Whitney U test (non-parametric alternative to t-test)
u_stat, p_value = stats.mannwhitneyu(group_a, group_b)
print(f"Mann-Whitney U: U={u_stat:.4f}, p={p_value:.4f}")

# 7. Shapiro-Wilk test for normality
stat, p_value = stats.shapiro(group_a)
print(f"Shapiro-Wilk: stat={stat:.4f}, p={p_value:.4f}")
if p_value > 0.05:
    print("Data is normally distributed")`
        },
        {
          title: 'Confidence Intervals and Effect Size',
          code: `import numpy as np
from scipy import stats

# Sample data
np.random.seed(42)
data = np.random.normal(100, 15, 100)

# Confidence Interval for mean
mean = np.mean(data)
sem = stats.sem(data)  # Standard error of mean
confidence_level = 0.95

# Using t-distribution
ci = stats.t.interval(confidence_level, len(data)-1, loc=mean, scale=sem)
print(f"Mean: {mean:.2f}")
print(f"95% CI: ({ci[0]:.2f}, {ci[1]:.2f})")

# Bootstrap confidence interval
n_bootstrap = 10000
bootstrap_means = []
for _ in range(n_bootstrap):
    sample = np.random.choice(data, size=len(data), replace=True)
    bootstrap_means.append(np.mean(sample))

ci_bootstrap = np.percentile(bootstrap_means, [2.5, 97.5])
print(f"Bootstrap 95% CI: ({ci_bootstrap[0]:.2f}, {ci_bootstrap[1]:.2f})")

# Effect size: Cohen's d
group_a = np.random.normal(100, 15, 50)
group_b = np.random.normal(110, 15, 50)

def cohens_d(group1, group2):
    n1, n2 = len(group1), len(group2)
    var1, var2 = np.var(group1, ddof=1), np.var(group2, ddof=1)
    pooled_std = np.sqrt(((n1-1)*var1 + (n2-1)*var2) / (n1+n2-2))
    return (np.mean(group1) - np.mean(group2)) / pooled_std

d = cohens_d(group_a, group_b)
print(f"Cohen's d: {d:.4f}")
# Interpretation: |d| < 0.2 small, 0.2-0.8 medium, > 0.8 large

# Effect size for correlation: r-squared
r = np.corrcoef(group_a, group_b[:50])[0, 1]
r_squared = r ** 2
print(f"R-squared: {r_squared:.4f}")

# Power analysis (requires statsmodels)
from statsmodels.stats.power import TTestIndPower
power_analysis = TTestIndPower()
sample_size = power_analysis.solve_power(effect_size=0.5, alpha=0.05, power=0.8)
print(f"Required sample size for d=0.5, alpha=0.05, power=0.8: {sample_size:.0f}")`
        },
        {
          title: 'Rolling Statistics and Time Series',
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create time series data
np.random.seed(42)
dates = pd.date_range(start='2024-01-01', periods=365, freq='D')
values = np.cumsum(np.random.randn(365)) + 100  # Random walk
df = pd.DataFrame({'date': dates, 'value': values})
df.set_index('date', inplace=True)

# Rolling statistics
df['rolling_mean_7'] = df['value'].rolling(window=7).mean()
df['rolling_std_7'] = df['value'].rolling(window=7).std()
df['rolling_min_30'] = df['value'].rolling(window=30).min()
df['rolling_max_30'] = df['value'].rolling(window=30).max()

# Exponential weighted moving average (more weight to recent values)
df['ewm_mean'] = df['value'].ewm(span=7).mean()
df['ewm_std'] = df['value'].ewm(span=7).std()

# Expanding window (cumulative)
df['expanding_mean'] = df['value'].expanding().mean()
df['expanding_std'] = df['value'].expanding().std()

# Percentage change
df['pct_change'] = df['value'].pct_change()
df['pct_change_7d'] = df['value'].pct_change(periods=7)

# Difference
df['diff'] = df['value'].diff()
df['diff_7d'] = df['value'].diff(periods=7)

# Lag features
df['lag_1'] = df['value'].shift(1)
df['lag_7'] = df['value'].shift(7)
df['lead_1'] = df['value'].shift(-1)

# Resample to weekly
weekly = df['value'].resample('W').agg(['mean', 'std', 'min', 'max'])
print(weekly.head())

# Plot with rolling statistics
plt.figure(figsize=(12, 6))
plt.plot(df['value'], label='Original', alpha=0.5)
plt.plot(df['rolling_mean_7'], label='7-day Rolling Mean', linewidth=2)
plt.fill_between(df.index,
                 df['rolling_mean_7'] - 2*df['rolling_std_7'],
                 df['rolling_mean_7'] + 2*df['rolling_std_7'],
                 alpha=0.2, label='95% CI')
plt.legend()
plt.title('Time Series with Rolling Statistics')
plt.show()`
        }
      ]
    }
  ]

  const renderTopicContent = (topic) => {
    return (
      <div key={topic.title} style={{ marginBottom: '2rem' }}>
        <h3 style={{
          color: '#93c5fd',
          fontSize: '1.25rem',
          marginBottom: '1rem',
          borderBottom: '1px solid #374151',
          paddingBottom: '0.5rem'
        }}>
          {topic.title}
        </h3>
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
          showLineNumbers={true}
        >
          {topic.code}
        </SyntaxHighlighter>
      </div>
    )
  }

  if (selectedSection) {
    const section = sections.find(s => s.id === selectedSection)
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
        color: 'white',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <button
            onClick={() => setSelectedSection(null)}
            style={{
              marginBottom: '1.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1d4ed8'
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2563eb'
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          >
            Back to Data Science
          </button>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '0.75rem',
            padding: '2rem',
            border: '2px solid #374151'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              borderBottom: '2px solid #374151',
              paddingBottom: '1.5rem'
            }}>
              <span style={{ fontSize: '3rem' }}>{section.icon}</span>
              <div>
                <h1 style={{
                  margin: 0,
                  fontSize: '2rem',
                  background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {section.name}
                </h1>
                <p style={{ color: '#9ca3af', margin: '0.5rem 0 0 0' }}>
                  {section.description}
                </p>
              </div>
            </div>

            {/* Section-specific diagrams */}
            {selectedSection === 'numpy-basics' && (
              <div style={{ marginBottom: '2rem' }}>
                <NumpyArrayDiagram />
              </div>
            )}
            {selectedSection === 'pandas-dataframes' && (
              <div style={{ marginBottom: '2rem' }}>
                <PandasDataFrameDiagram />
              </div>
            )}
            {selectedSection === 'data-visualization' && (
              <div style={{ marginBottom: '2rem' }}>
                <VisualizationTypesDiagram />
              </div>
            )}
            {selectedSection === 'data-cleaning' && (
              <div style={{ marginBottom: '2rem' }}>
                <DataCleaningDiagram />
              </div>
            )}

            {section.topics.map(topic => renderTopicContent(topic))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      color: 'white',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{
            marginBottom: '1.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1d4ed8'
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#2563eb'
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
        >
          Back to Python
        </button>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            Python Data Science Reference
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#9ca3af',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Comprehensive guide to NumPy, Pandas, Matplotlib, Seaborn, and statistical analysis in Python
          </p>
        </div>

        {/* Data Science Workflow Diagram */}
        <div style={{
          background: 'linear-gradient(to right, #1f2937, #111827)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #374151'
        }}>
          <DataScienceWorkflowDiagram />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {sections.map(section => (
            <div
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                border: '2px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = section.color
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = `0 20px 40px -10px ${section.color}40`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#374151'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '2.5rem' }}>{section.icon}</span>
                <h2 style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  color: '#93c5fd'
                }}>
                  {section.name}
                </h2>
              </div>
              <p style={{
                color: '#9ca3af',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {section.description}
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {section.topics.slice(0, 3).map(topic => (
                  <span
                    key={topic.title}
                    style={{
                      background: '#374151',
                      color: '#d1d5db',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem'
                    }}
                  >
                    {topic.title}
                  </span>
                ))}
                {section.topics.length > 3 && (
                  <span style={{
                    background: section.color,
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem'
                  }}>
                    +{section.topics.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '3rem',
          background: 'linear-gradient(to right, #1f2937, #111827)',
          borderRadius: '0.75rem',
          padding: '2rem',
          border: '1px solid #374151'
        }}>
          <h2 style={{
            color: '#93c5fd',
            fontSize: '1.5rem',
            marginBottom: '1rem'
          }}>
            Quick Reference: Essential Imports
          </h2>
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
{`# Data Science Stack
import numpy as np                    # Numerical computing
import pandas as pd                   # Data manipulation
import matplotlib.pyplot as plt       # Basic plotting
import seaborn as sns                 # Statistical visualization
from scipy import stats               # Statistical functions

# Common aliases and settings
pd.set_option('display.max_columns', None)   # Show all columns
pd.set_option('display.max_rows', 100)       # Show more rows
np.set_printoptions(precision=3)             # Limit decimal places
sns.set_theme(style='whitegrid')             # Set seaborn style
plt.rcParams['figure.figsize'] = [10, 6]     # Default figure size`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}

export default DataScience

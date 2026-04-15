import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import CompletionCheckbox from '../../components/CompletionCheckbox'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#06b6d4',
  primaryHover: '#22d3ee',
  bg: 'rgba(6, 182, 212, 0.1)',
  border: 'rgba(6, 182, 212, 0.3)',
  arrow: '#06b6d4',
  hoverBg: 'rgba(6, 182, 212, 0.2)',
  topicBg: 'rgba(6, 182, 212, 0.2)'
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

const FileUploaderArchitectureDiagram = ({ onClickConcept }) => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="clientGradFU" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6d28d9', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="queueGradFU" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="poolGradFU" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="storageGradFU" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowArchFU" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#60a5fa" />
      </marker>
      <marker id="arrowResultFU" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
      <style>{`
        .fu-clickable { cursor: pointer; transition: opacity 0.2s; }
        .fu-clickable:hover { opacity: 0.8; filter: brightness(1.2); }
      `}</style>
    </defs>

    <text x="400" y="20" fontSize="11" fontWeight="600" fill="#60a5fa" textAnchor="middle">Multithreaded File Uploader Architecture</text>
    {onClickConcept && <text x="400" y="36" fontSize="9" fill="#64748b" textAnchor="middle">Click any component to view its code and details</text>}

    <g className={onClickConcept ? 'fu-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(0) : undefined}>
      <rect x="20" y="60" width="110" height="80" rx="10" fill="url(#clientGradFU)" />
      <text x="75" y="90" fontSize="12" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Producer</text>
      <text x="75" y="108" fontSize="9" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>File Scanner</text>
      <text x="75" y="122" fontSize="9" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Chunker</text>
    </g>

    <line x1="130" y1="100" x2="195" y2="100" stroke="#60a5fa" strokeWidth="3" markerEnd="url(#arrowArchFU)" />
    <text x="162" y="90" fontSize="9" fill="#9ca3af" textAnchor="middle">Submit</text>

    <g className={onClickConcept ? 'fu-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(0) : undefined}>
      <rect x="200" y="50" width="130" height="100" rx="10" fill="url(#queueGradFU)" />
      <text x="265" y="80" fontSize="12" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Bounded</text>
      <text x="265" y="96" fontSize="12" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Queue</text>
      <text x="265" y="115" fontSize="9" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>BlockingQueue</text>
      <text x="265" y="130" fontSize="9" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Upload Tasks</text>
    </g>

    <line x1="330" y1="100" x2="395" y2="100" stroke="#60a5fa" strokeWidth="3" markerEnd="url(#arrowArchFU)" />
    <text x="362" y="90" fontSize="9" fill="#9ca3af" textAnchor="middle">Poll</text>

    <g className={onClickConcept ? 'fu-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(1) : undefined}>
      <rect x="400" y="40" width="150" height="120" rx="10" fill="url(#poolGradFU)" />
      <text x="475" y="68" fontSize="12" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Thread Pool</text>
      <text x="475" y="88" fontSize="9" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Worker Thread 1</text>
      <text x="475" y="103" fontSize="9" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Worker Thread 2</text>
      <text x="475" y="118" fontSize="9" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Worker Thread 3</text>
      <text x="475" y="133" fontSize="9" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Worker Thread N</text>
    </g>

    <line x1="550" y1="85" x2="625" y2="85" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowResultFU)" />
    <text x="587" y="75" fontSize="9" fill="#10b981" textAnchor="middle">Upload</text>

    <g className={onClickConcept ? 'fu-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(2) : undefined}>
      <rect x="630" y="50" width="130" height="100" rx="10" fill="url(#storageGradFU)" />
      <text x="695" y="85" fontSize="12" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Remote</text>
      <text x="695" y="103" fontSize="12" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Storage</text>
      <text x="695" y="125" fontSize="9" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>S3 / GCS / Azure</text>
    </g>

    <path d="M 695 150 L 695 190 L 75 190 L 75 145" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowResultFU)" />
    <text x="385" y="185" fontSize="9" fill="#10b981" textAnchor="middle">UploadResult (success / failure / retry)</text>
  </svg>
)

// Comprehensive full-system diagram showing all components and interactions
const FullSystemDiagram = ({ onClickConcept }) => (
  <svg viewBox="0 0 960 840" style={{ width: '100%', maxWidth: '960px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="fsClientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6d28d9', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="fsScannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="fsChunkerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="fsQueueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="fsPoolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="fsWorkerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="fsStorageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="fsCbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="fsDlqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="fsMetricsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="fsConfigGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="fsArr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#60a5fa" />
      </marker>
      <marker id="fsArrGreen" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#10b981" />
      </marker>
      <marker id="fsArrRed" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#ef4444" />
      </marker>
      <marker id="fsArrOrange" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" />
      </marker>
      <marker id="fsArrPink" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#ec4899" />
      </marker>
      <style>{`
        .fs-clickable { cursor: pointer; transition: all 0.2s; }
        .fs-clickable:hover { opacity: 0.85; filter: brightness(1.15); }
        .fs-layer-click { cursor: pointer; transition: all 0.2s; }
        .fs-layer-click:hover rect:first-child { filter: brightness(1.3); }
      `}</style>
    </defs>

    {/* Title */}
    <text x="480" y="22" fontSize="15" fontWeight="700" fill="#e2e8f0" textAnchor="middle">Multithreaded File Uploader &mdash; Full System Design</text>
    {onClickConcept
      ? <text x="480" y="40" fontSize="10" fill="#94a3b8" textAnchor="middle">Click any layer or component to explore its code and details</text>
      : <text x="480" y="40" fontSize="10" fill="#64748b" textAnchor="middle">Producer-Consumer Architecture with Chunking, Retry, Circuit Breaker, and Observability</text>
    }

    {/* ═══════════════ LAYER 1: Client Layer ═══════════════ */}
    {/* Layer background */}
    <rect x="20" y="52" width="920" height="135" rx="12" fill="rgba(139, 92, 246, 0.06)" stroke="#8b5cf640" strokeWidth="1.5" />
    {/* Accent strip */}
    <rect x="20" y="52" width="6" height="135" rx="3" fill="#8b5cf6" />
    {/* Layer label */}
    <g className={onClickConcept ? 'fs-layer-click' : undefined} onClick={onClickConcept ? () => onClickConcept(0) : undefined}>
      <rect x="34" y="56" width="200" height="22" rx="4" fill="rgba(139, 92, 246, 0.2)" style={{ pointerEvents: 'none' }} />
      <text x="44" y="71" fontSize="11" fontWeight="700" fill="#a78bfa" style={{ pointerEvents: 'none' }}>L1 &mdash; CLIENT LAYER</text>
      {onClickConcept && <text x="196" y="71" fontSize="8" fill="#8b5cf680" style={{ pointerEvents: 'none' }}>System Architecture &rarr;</text>}
    </g>

    {/* API / Client Entry */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(0) : undefined}>
      <rect x="55" y="85" width="130" height="78" rx="8" fill="url(#fsClientGrad)" />
      <text x="120" y="107" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>FileUploadService</text>
      <text x="120" y="122" fontSize="8" fill="white" opacity="0.85" textAnchor="middle" style={{ pointerEvents: 'none' }}>uploadFiles(List&lt;Path&gt;)</text>
      <text x="120" y="135" fontSize="8" fill="white" opacity="0.85" textAnchor="middle" style={{ pointerEvents: 'none' }}>uploadAsync(Path)</text>
      <text x="120" y="148" fontSize="8" fill="white" opacity="0.7" textAnchor="middle" style={{ pointerEvents: 'none' }}>shutdown() / awaitDone()</text>
    </g>

    {/* File Scanner */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(0) : undefined}>
      <rect x="230" y="85" width="130" height="78" rx="8" fill="url(#fsScannerGrad)" />
      <text x="295" y="107" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>FileScanner</text>
      <text x="295" y="122" fontSize="8" fill="white" opacity="0.85" textAnchor="middle" style={{ pointerEvents: 'none' }}>Validate size/type</text>
      <text x="295" y="135" fontSize="8" fill="white" opacity="0.85" textAnchor="middle" style={{ pointerEvents: 'none' }}>Compute SHA-256</text>
      <text x="295" y="148" fontSize="8" fill="white" opacity="0.7" textAnchor="middle" style={{ pointerEvents: 'none' }}>Generate UploadTask</text>
    </g>

    {/* File Chunker */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(2) : undefined}>
      <rect x="405" y="85" width="140" height="78" rx="8" fill="url(#fsChunkerGrad)" />
      <text x="475" y="107" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>FileChunker</text>
      <text x="475" y="122" fontSize="8" fill="white" opacity="0.85" textAnchor="middle" style={{ pointerEvents: 'none' }}>Split into 5 MB chunks</text>
      <text x="475" y="135" fontSize="8" fill="white" opacity="0.85" textAnchor="middle" style={{ pointerEvents: 'none' }}>Per-chunk MD5 hash</text>
      <text x="475" y="148" fontSize="8" fill="white" opacity="0.7" textAnchor="middle" style={{ pointerEvents: 'none' }}>ChunkUploadTask[]</text>
    </g>

    {/* Config */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(0) : undefined}>
      <rect x="590" y="85" width="150" height="78" rx="8" fill="url(#fsConfigGrad)" />
      <text x="665" y="105" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>UploadConfig</text>
      <text x="665" y="120" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>corePoolSize = 8</text>
      <text x="665" y="133" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>maxPoolSize = 16</text>
      <text x="665" y="146" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>chunkSize = 5MB</text>
      <text x="665" y="159" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>maxRetries = 3</text>
    </g>

    {/* Status Map */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(1) : undefined}>
      <rect x="785" y="85" width="125" height="78" rx="8" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2" />
      <text x="847" y="105" fontSize="10" fontWeight="700" fill="#a78bfa" textAnchor="middle" style={{ pointerEvents: 'none' }}>ConcurrentHashMap</text>
      <text x="847" y="120" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>fileId &rarr; UploadStatus</text>
      <text x="847" y="133" fontSize="8" fill="#64748b" textAnchor="middle" style={{ pointerEvents: 'none' }}>.PENDING</text>
      <text x="847" y="146" fontSize="8" fill="#f59e0b" textAnchor="middle" style={{ pointerEvents: 'none' }}>.UPLOADING (62%)</text>
      <text x="847" y="159" fontSize="8" fill="#10b981" textAnchor="middle" style={{ pointerEvents: 'none' }}>.COMPLETED</text>
    </g>

    {/* Client layer arrows */}
    <line x1="185" y1="124" x2="225" y2="124" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#fsArr)" />
    <line x1="360" y1="124" x2="400" y2="124" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#fsArr)" />

    {/* ═══════════════ LAYER 2: Execution Engine ═══════════════ */}
    <rect x="20" y="200" width="920" height="195" rx="12" fill="rgba(6, 182, 212, 0.06)" stroke="#06b6d440" strokeWidth="1.5" />
    <rect x="20" y="200" width="6" height="195" rx="3" fill="#06b6d4" />
    <g className={onClickConcept ? 'fs-layer-click' : undefined} onClick={onClickConcept ? () => onClickConcept(1) : undefined}>
      <rect x="34" y="204" width="240" height="22" rx="4" fill="rgba(6, 182, 212, 0.2)" style={{ pointerEvents: 'none' }} />
      <text x="44" y="219" fontSize="11" fontWeight="700" fill="#22d3ee" style={{ pointerEvents: 'none' }}>L2 &mdash; EXECUTION ENGINE</text>
      {onClickConcept && <text x="224" y="219" fontSize="8" fill="#06b6d480" style={{ pointerEvents: 'none' }}>Concurrency &amp; Thread Safety &rarr;</text>}
    </g>

    {/* Bounded Queue */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(0) : undefined}>
      <rect x="55" y="235" width="165" height="145" rx="10" fill="url(#fsQueueGrad)" />
      <text x="137" y="260" fontSize="12" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Bounded BlockingQueue</text>
      <text x="137" y="276" fontSize="9" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>capacity = 1024</text>
      <rect x="70" y="286" width="135" height="20" rx="4" fill="rgba(0,0,0,0.25)" style={{ pointerEvents: 'none' }} />
      <text x="137" y="300" fontSize="8" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>UploadTask: report.pdf (12MB)</text>
      <rect x="70" y="310" width="135" height="20" rx="4" fill="rgba(0,0,0,0.25)" style={{ pointerEvents: 'none' }} />
      <text x="137" y="324" fontSize="8" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>ChunkTask: data.zip [3/20]</text>
      <rect x="70" y="334" width="135" height="20" rx="4" fill="rgba(0,0,0,0.25)" style={{ pointerEvents: 'none' }} />
      <text x="137" y="348" fontSize="8" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>UploadTask: image.png (2MB)</text>
      <text x="137" y="373" fontSize="8" fill="white" opacity="0.6" textAnchor="middle" style={{ pointerEvents: 'none' }}>... (backpressure if full)</text>
    </g>

    {/* Arrow Queue → Pool */}
    <line x1="220" y1="305" x2="270" y2="305" stroke="#60a5fa" strokeWidth="3" markerEnd="url(#fsArr)" />
    <text x="245" y="296" fontSize="8" fill="#94a3b8" textAnchor="middle">take()</text>

    {/* Thread Pool */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(1) : undefined}>
      <rect x="275" y="232" width="370" height="150" rx="10" fill="url(#fsPoolGrad)" stroke="#06b6d4" strokeWidth="2" />
      <text x="460" y="254" fontSize="12" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>ThreadPoolExecutor (core=8, max=16, keepAlive=60s)</text>

      <rect x="290" y="265" width="80" height="100" rx="6" fill="url(#fsWorkerGrad)" style={{ pointerEvents: 'none' }} />
      <text x="330" y="284" fontSize="9" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Worker-1</text>
      <text x="330" y="299" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Semaphore</text>
      <text x="330" y="311" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>.acquire()</text>
      <text x="330" y="327" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>HTTP Upload</text>
      <text x="330" y="343" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Retry logic</text>
      <text x="330" y="358" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>.release()</text>

      <rect x="380" y="265" width="80" height="100" rx="6" fill="url(#fsWorkerGrad)" style={{ pointerEvents: 'none' }} />
      <text x="420" y="284" fontSize="9" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Worker-2</text>
      <text x="420" y="310" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Uploading</text>
      <text x="420" y="325" fontSize="7" fill="#fbbf24" textAnchor="middle" style={{ pointerEvents: 'none' }}>chunk [3/20]</text>
      <text x="420" y="345" fontSize="7" fill="white" opacity="0.6" textAnchor="middle" style={{ pointerEvents: 'none' }}>AtomicLong++</text>

      <rect x="470" y="265" width="80" height="100" rx="6" fill="url(#fsWorkerGrad)" style={{ pointerEvents: 'none' }} />
      <text x="510" y="284" fontSize="9" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Worker-3</text>
      <text x="510" y="310" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Retrying</text>
      <text x="510" y="325" fontSize="7" fill="#ef4444" textAnchor="middle" style={{ pointerEvents: 'none' }}>attempt 2/3</text>
      <text x="510" y="345" fontSize="7" fill="white" opacity="0.6" textAnchor="middle" style={{ pointerEvents: 'none' }}>exp backoff</text>

      <rect x="560" y="265" width="72" height="100" rx="6" fill="url(#fsWorkerGrad)" opacity="0.6" style={{ pointerEvents: 'none' }} />
      <text x="596" y="302" fontSize="9" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>...</text>
      <text x="596" y="322" fontSize="8" fill="white" opacity="0.6" textAnchor="middle" style={{ pointerEvents: 'none' }}>T-4..N</text>
    </g>

    {/* Semaphore box */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(1) : undefined}>
      <rect x="670" y="238" width="120" height="60" rx="8" fill="#1f2937" stroke="#f59e0b" strokeWidth="2" />
      <text x="730" y="260" fontSize="10" fontWeight="700" fill="#fbbf24" textAnchor="middle" style={{ pointerEvents: 'none' }}>Semaphore</text>
      <text x="730" y="276" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>permits = 10</text>
      <text x="730" y="290" fontSize="8" fill="#94a3b8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Max connections</text>
    </g>

    {/* AtomicLong counters */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(1) : undefined}>
      <rect x="670" y="308" width="120" height="72" rx="8" fill="#1f2937" stroke="#10b981" strokeWidth="2" />
      <text x="730" y="328" fontSize="10" fontWeight="700" fill="#4ade80" textAnchor="middle" style={{ pointerEvents: 'none' }}>Progress Counters</text>
      <text x="730" y="344" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>AtomicLong bytes</text>
      <text x="730" y="358" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>AtomicInteger files</text>
      <text x="730" y="372" fontSize="8" fill="#94a3b8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Lock-free updates</text>
    </g>

    {/* Arrow from Pool → Config connector */}
    <path d="M 665 135 L 665 166 L 460 166 L 460 232" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" />
    <text x="560" y="162" fontSize="8" fill="#64748b" textAnchor="middle">configures</text>

    {/* Arrow from client submit → Queue */}
    <path d="M 120 163 L 120 192 L 137 192 L 137 235" fill="none" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#fsArr)" />
    <text x="155" y="197" fontSize="8" fill="#94a3b8">submit tasks</text>

    {/* Arrow from chunker → Queue */}
    <path d="M 475 163 L 475 192 L 137 192 L 137 235" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,3" />

    {/* Status map ← pool updates */}
    <path d="M 632 305 L 660 305 L 660 255 L 848 255 L 848 163" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#fsArr)" />
    <text x="760" y="205" fontSize="8" fill="#a78bfa" textAnchor="middle">status updates</text>

    {/* ═══════════════ LAYER 3: Network / Storage ═══════════════ */}
    <rect x="20" y="410" width="920" height="135" rx="12" fill="rgba(16, 185, 129, 0.06)" stroke="#10b98140" strokeWidth="1.5" />
    <rect x="20" y="410" width="6" height="135" rx="3" fill="#10b981" />
    <g className={onClickConcept ? 'fs-layer-click' : undefined} onClick={onClickConcept ? () => onClickConcept(2) : undefined}>
      <rect x="34" y="414" width="280" height="22" rx="4" fill="rgba(16, 185, 129, 0.2)" style={{ pointerEvents: 'none' }} />
      <text x="44" y="429" fontSize="11" fontWeight="700" fill="#34d399" style={{ pointerEvents: 'none' }}>L3 &mdash; NETWORK &amp; STORAGE LAYER</text>
      {onClickConcept && <text x="270" y="429" fontSize="8" fill="#10b98180" style={{ pointerEvents: 'none' }}>Upload Pipeline &rarr;</text>}
    </g>

    {/* Circuit Breaker */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(3) : undefined}>
      <rect x="55" y="442" width="155" height="85" rx="10" fill="url(#fsCbGrad)" />
      <text x="132" y="465" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Circuit Breaker</text>
      <rect x="68" y="474" width="45" height="18" rx="3" fill="#22c55e" style={{ pointerEvents: 'none' }} />
      <text x="90" y="487" fontSize="7" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>CLOSED</text>
      <rect x="118" y="474" width="38" height="18" rx="3" fill="#dc2626" style={{ pointerEvents: 'none' }} />
      <text x="137" y="487" fontSize="7" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>OPEN</text>
      <rect x="161" y="474" width="38" height="18" rx="3" fill="#d97706" style={{ pointerEvents: 'none' }} />
      <text x="180" y="487" fontSize="7" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>HALF</text>
      <text x="132" y="515" fontSize="8" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>threshold=5, timeout=30s</text>
    </g>

    {/* Retry Engine */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(3) : undefined}>
      <rect x="240" y="442" width="150" height="85" rx="10" fill="#1f2937" stroke="#f59e0b" strokeWidth="2" />
      <text x="315" y="465" fontSize="11" fontWeight="700" fill="#fbbf24" textAnchor="middle" style={{ pointerEvents: 'none' }}>Retry Engine</text>
      <text x="315" y="482" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>Exponential backoff</text>
      <text x="315" y="497" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>base=1s, max=30s</text>
      <text x="315" y="512" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>jitter &plusmn; 20%</text>
    </g>

    {/* HTTP Client / Multipart */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(2) : undefined}>
      <rect x="420" y="442" width="155" height="85" rx="10" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" />
      <text x="497" y="465" fontSize="11" fontWeight="700" fill="#60a5fa" textAnchor="middle" style={{ pointerEvents: 'none' }}>HTTP Client</text>
      <text x="497" y="482" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>Multipart upload</text>
      <text x="497" y="497" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>InitUpload &rarr; PutPart</text>
      <text x="497" y="512" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>&rarr; CompleteMultipart</text>
    </g>

    {/* Bandwidth Throttle */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(1) : undefined}>
      <rect x="605" y="442" width="120" height="85" rx="10" fill="#1f2937" stroke="#06b6d4" strokeWidth="2" />
      <text x="665" y="465" fontSize="10" fontWeight="700" fill="#22d3ee" textAnchor="middle" style={{ pointerEvents: 'none' }}>Throttle</text>
      <text x="665" y="482" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>ReentrantLock</text>
      <text x="665" y="497" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>Token Bucket</text>
      <text x="665" y="512" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>100 MB/s cap</text>
    </g>

    {/* Remote Storage */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(2) : undefined}>
      <rect x="755" y="442" width="155" height="85" rx="10" fill="url(#fsStorageGrad)" />
      <text x="832" y="467" fontSize="12" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Remote Storage</text>
      <text x="832" y="485" fontSize="9" fill="white" opacity="0.85" textAnchor="middle" style={{ pointerEvents: 'none' }}>AWS S3 / GCS / Azure</text>
      <text x="832" y="502" fontSize="8" fill="white" opacity="0.7" textAnchor="middle" style={{ pointerEvents: 'none' }}>Multipart API</text>
      <text x="832" y="517" fontSize="8" fill="white" opacity="0.7" textAnchor="middle" style={{ pointerEvents: 'none' }}>Checksum verify</text>
    </g>

    {/* Network layer arrows */}
    <line x1="210" y1="484" x2="235" y2="484" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#fsArrOrange)" />
    <line x1="390" y1="484" x2="415" y2="484" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#fsArr)" />
    <line x1="575" y1="484" x2="600" y2="484" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#fsArr)" />
    <line x1="725" y1="484" x2="750" y2="484" stroke="#10b981" strokeWidth="3" markerEnd="url(#fsArrGreen)" />

    {/* Arrow Pool → Circuit Breaker */}
    <path d="M 330 365 L 330 390 L 132 390 L 132 442" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#fsArrRed)" />
    <text x="230" y="404" fontSize="8" fill="#94a3b8" textAnchor="middle">workers call through CB</text>

    {/* ═══════════════ LAYER 4: Error Handling & Observability ═══════════════ */}
    <rect x="20" y="560" width="920" height="125" rx="12" fill="rgba(236, 72, 153, 0.06)" stroke="#ec489940" strokeWidth="1.5" />
    <rect x="20" y="560" width="6" height="125" rx="3" fill="#ec4899" />
    <g className={onClickConcept ? 'fs-layer-click' : undefined} onClick={onClickConcept ? () => onClickConcept(3) : undefined}>
      <rect x="34" y="564" width="320" height="22" rx="4" fill="rgba(236, 72, 153, 0.2)" style={{ pointerEvents: 'none' }} />
      <text x="44" y="579" fontSize="11" fontWeight="700" fill="#f472b6" style={{ pointerEvents: 'none' }}>L4 &mdash; ERROR HANDLING &amp; OBSERVABILITY</text>
      {onClickConcept && <text x="310" y="579" fontSize="8" fill="#ec489980" style={{ pointerEvents: 'none' }}>Error Handling &amp; Monitoring &rarr;</text>}
    </g>

    {/* Dead Letter Queue */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(3) : undefined}>
      <rect x="55" y="593" width="170" height="75" rx="10" fill="url(#fsDlqGrad)" />
      <text x="140" y="616" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Dead Letter Queue</text>
      <text x="140" y="633" fontSize="8" fill="white" opacity="0.85" textAnchor="middle" style={{ pointerEvents: 'none' }}>Failed after max retries</text>
      <text x="140" y="648" fontSize="8" fill="white" opacity="0.85" textAnchor="middle" style={{ pointerEvents: 'none' }}>Periodic re-process (5 min)</text>
      <text x="140" y="661" fontSize="8" fill="white" opacity="0.7" textAnchor="middle" style={{ pointerEvents: 'none' }}>Manual retry API</text>
    </g>

    {/* Callback / Listener */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(3) : undefined}>
      <rect x="260" y="593" width="160" height="75" rx="10" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2" />
      <text x="340" y="616" fontSize="11" fontWeight="700" fill="#a78bfa" textAnchor="middle" style={{ pointerEvents: 'none' }}>Progress Listener</text>
      <text x="340" y="633" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>onChunkComplete()</text>
      <text x="340" y="648" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>onFileComplete()</text>
      <text x="340" y="661" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>onError()</text>
    </g>

    {/* Metrics Collector */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(3) : undefined}>
      <rect x="455" y="593" width="165" height="75" rx="10" fill="url(#fsMetricsGrad)" />
      <text x="537" y="616" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Metrics Collector</text>
      <text x="537" y="633" fontSize="8" fill="white" opacity="0.85" textAnchor="middle" style={{ pointerEvents: 'none' }}>Throughput (MB/s)</text>
      <text x="537" y="648" fontSize="8" fill="white" opacity="0.85" textAnchor="middle" style={{ pointerEvents: 'none' }}>Latency p50/p99</text>
      <text x="537" y="661" fontSize="8" fill="white" opacity="0.7" textAnchor="middle" style={{ pointerEvents: 'none' }}>Error rate &amp; queue depth</text>
    </g>

    {/* Logging */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(3) : undefined}>
      <rect x="655" y="593" width="140" height="75" rx="10" fill="#1f2937" stroke="#64748b" strokeWidth="2" />
      <text x="725" y="616" fontSize="11" fontWeight="700" fill="#94a3b8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Structured Logger</text>
      <text x="725" y="633" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>MDC: uploadId, fileId</text>
      <text x="725" y="648" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>Thread-safe appender</text>
      <text x="725" y="661" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>JSON format</text>
    </g>

    {/* Shutdown Handler */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(3) : undefined}>
      <rect x="825" y="593" width="90" height="75" rx="10" fill="#1f2937" stroke="#ef4444" strokeWidth="2" />
      <text x="870" y="616" fontSize="9" fontWeight="700" fill="#f87171" textAnchor="middle" style={{ pointerEvents: 'none' }}>Shutdown</text>
      <text x="870" y="631" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>JVM hook</text>
      <text x="870" y="646" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>Drain pool</text>
      <text x="870" y="661" fontSize="8" fill="#cbd5e1" textAnchor="middle" style={{ pointerEvents: 'none' }}>Persist DLQ</text>
    </g>

    {/* Error flow arrows */}
    <path d="M 132 527 L 132 555 L 132 593" fill="none" stroke="#f97316" strokeWidth="2" markerEnd="url(#fsArrOrange)" />
    <text x="145" y="560" fontSize="8" fill="#f97316">max retries exceeded</text>

    {/* Metrics arrow from pool */}
    <path d="M 460 382 L 460 404 L 537 404 L 537 593" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#fsArrPink)" />
    <text x="500" y="418" fontSize="8" fill="#ec4899">emit metrics</text>

    {/* ═══════════════ ROW 5: Data Flow Summary ═══════════════ */}
    <rect x="20" y="700" width="920" height="135" rx="12" fill="rgba(96, 165, 250, 0.06)" stroke="#60a5fa30" strokeWidth="1.5" />
    <rect x="20" y="700" width="6" height="135" rx="3" fill="#60a5fa" />
    <rect x="34" y="704" width="200" height="22" rx="4" fill="rgba(96, 165, 250, 0.15)" />
    <text x="44" y="719" fontSize="11" fontWeight="700" fill="#93c5fd">END-TO-END DATA FLOW</text>

    {/* Flow steps */}
    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(0) : undefined}>
      <rect x="50" y="734" width="100" height="38" rx="6" fill="#8b5cf6" />
      <text x="100" y="750" fontSize="8" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>1. Scan Files</text>
      <text x="100" y="764" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Validate + hash</text>
    </g>

    <line x1="150" y1="753" x2="170" y2="753" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#fsArr)" />

    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(2) : undefined}>
      <rect x="175" y="734" width="100" height="38" rx="6" fill="#3b82f6" />
      <text x="225" y="750" fontSize="8" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>2. Chunk</text>
      <text x="225" y="764" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Split if &gt; 5MB</text>
    </g>

    <line x1="275" y1="753" x2="295" y2="753" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#fsArr)" />

    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(0) : undefined}>
      <rect x="300" y="734" width="100" height="38" rx="6" fill="#f59e0b" />
      <text x="350" y="750" fontSize="8" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>3. Enqueue</text>
      <text x="350" y="764" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>BlockingQueue</text>
    </g>

    <line x1="400" y1="753" x2="420" y2="753" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#fsArr)" />

    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(1) : undefined}>
      <rect x="425" y="734" width="100" height="38" rx="6" fill="#06b6d4" />
      <text x="475" y="750" fontSize="8" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>4. Execute</text>
      <text x="475" y="764" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Worker threads</text>
    </g>

    <line x1="525" y1="753" x2="545" y2="753" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#fsArr)" />

    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(3) : undefined}>
      <rect x="550" y="734" width="100" height="38" rx="6" fill="#ef4444" />
      <text x="600" y="750" fontSize="8" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>5. CB + Retry</text>
      <text x="600" y="764" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Fault tolerance</text>
    </g>

    <line x1="650" y1="753" x2="670" y2="753" stroke="#10b981" strokeWidth="2" markerEnd="url(#fsArrGreen)" />

    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(2) : undefined}>
      <rect x="675" y="734" width="100" height="38" rx="6" fill="#10b981" />
      <text x="725" y="750" fontSize="8" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>6. Upload</text>
      <text x="725" y="764" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Multipart &rarr; S3</text>
    </g>

    <line x1="775" y1="753" x2="795" y2="753" stroke="#10b981" strokeWidth="2" markerEnd="url(#fsArrGreen)" />

    <g className={onClickConcept ? 'fs-clickable' : undefined} onClick={onClickConcept ? () => onClickConcept(3) : undefined}>
      <rect x="800" y="734" width="100" height="38" rx="6" fill="#22c55e" />
      <text x="850" y="750" fontSize="8" fontWeight="600" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>7. Callback</text>
      <text x="850" y="764" fontSize="7" fill="white" opacity="0.8" textAnchor="middle" style={{ pointerEvents: 'none' }}>Notify + metrics</text>
    </g>

    {/* Key */}
    <text x="100" y="805" fontSize="9" fill="#94a3b8">Key:</text>
    <line x1="130" y1="802" x2="155" y2="802" stroke="#60a5fa" strokeWidth="2" />
    <text x="162" y="805" fontSize="8" fill="#94a3b8">data flow</text>
    <line x1="220" y1="802" x2="245" y2="802" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4,3" />
    <text x="252" y="805" fontSize="8" fill="#94a3b8">config/status</text>
    <line x1="320" y1="802" x2="345" y2="802" stroke="#ef4444" strokeWidth="2" />
    <text x="352" y="805" fontSize="8" fill="#94a3b8">error path</text>
    <line x1="405" y1="802" x2="430" y2="802" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4,3" />
    <text x="437" y="805" fontSize="8" fill="#94a3b8">metrics</text>
    <rect x="490" y="797" width="8" height="8" rx="2" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
    <text x="505" y="805" fontSize="8" fill="#94a3b8">layer</text>
  </svg>
)

const ThreadPoolDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="corePoolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="maxPoolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#6d28d9', stopOpacity: 0.6 }} />
      </linearGradient>
      <marker id="arrowTP" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
    </defs>

    <text x="350" y="20" fontSize="12" fontWeight="600" fill="#60a5fa" textAnchor="middle">ThreadPoolExecutor Configuration</text>

    <rect x="30" y="45" width="100" height="50" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="80" y="65" fontSize="10" fontWeight="600" fill="#f59e0b" textAnchor="middle">Task Queue</text>
    <text x="80" y="80" fontSize="9" fill="#9ca3af" textAnchor="middle">Bounded (1024)</text>

    <line x1="130" y1="70" x2="170" y2="70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowTP)" />

    <rect x="175" y="35" width="300" height="130" rx="10" fill="url(#maxPoolGrad)" stroke="#6d28d9" strokeWidth="2" strokeDasharray="5,5" />
    <text x="325" y="55" fontSize="9" fill="#a78bfa" textAnchor="middle">Max Pool Size = 16</text>

    <rect x="190" y="65" width="270" height="85" rx="8" fill="url(#corePoolGrad)" stroke="#3b82f6" strokeWidth="2" />
    <text x="325" y="85" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">Core Pool Size = 8</text>

    <rect x="200" y="95" width="55" height="40" rx="4" fill="#10b981" />
    <text x="227" y="118" fontSize="8" fontWeight="600" fill="white" textAnchor="middle">T-1</text>
    <rect x="262" y="95" width="55" height="40" rx="4" fill="#10b981" />
    <text x="289" y="118" fontSize="8" fontWeight="600" fill="white" textAnchor="middle">T-2</text>
    <rect x="324" y="95" width="55" height="40" rx="4" fill="#10b981" />
    <text x="351" y="118" fontSize="8" fontWeight="600" fill="white" textAnchor="middle">T-3</text>
    <rect x="386" y="95" width="55" height="40" rx="4" fill="#22c55e" opacity="0.6" />
    <text x="413" y="118" fontSize="8" fontWeight="600" fill="white" textAnchor="middle">...</text>

    <rect x="530" y="45" width="140" height="120" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="600" y="70" fontSize="10" fontWeight="600" fill="#06b6d4" textAnchor="middle">Config</text>
    <text x="545" y="92" fontSize="9" fill="#9ca3af">keepAlive: 60s</text>
    <text x="545" y="108" fontSize="9" fill="#9ca3af">queueCap: 1024</text>
    <text x="545" y="124" fontSize="9" fill="#9ca3af">reject: CallerRuns</text>
    <text x="545" y="140" fontSize="9" fill="#9ca3af">daemon: true</text>

    <line x1="475" y1="100" x2="525" y2="100" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4,4" />

    <text x="350" y="190" fontSize="10" fill="#6b7280" textAnchor="middle">Core threads handle steady load; max threads expand for bursts</text>
  </svg>
)

const ConcurrencyPrimitivesDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="atomicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="semGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6d28d9', stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <text x="350" y="20" fontSize="12" fontWeight="600" fill="#60a5fa" textAnchor="middle">Concurrency Primitives for File Upload</text>

    <rect x="20" y="45" width="150" height="65" rx="8" fill="url(#atomicGrad)" />
    <text x="95" y="68" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">AtomicLong</text>
    <text x="95" y="85" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">bytesUploaded</text>
    <text x="95" y="98" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">filesCompleted</text>

    <rect x="190" y="45" width="150" height="65" rx="8" fill="url(#lockGrad)" />
    <text x="265" y="68" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">ReentrantLock</text>
    <text x="265" y="85" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Bandwidth</text>
    <text x="265" y="98" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Throttling</text>

    <rect x="360" y="45" width="150" height="65" rx="8" fill="url(#semGrad)" />
    <text x="435" y="68" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">Semaphore</text>
    <text x="435" y="85" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Max Connections</text>
    <text x="435" y="98" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">permits = 10</text>

    <rect x="530" y="45" width="150" height="65" rx="8" fill="url(#mapGrad)" />
    <text x="605" y="68" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">ConcurrentHashMap</text>
    <text x="605" y="85" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Upload Status</text>
    <text x="605" y="98" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Per-File Tracking</text>

    <rect x="100" y="130" width="200" height="50" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="200" y="153" fontSize="10" fontWeight="600" fill="#06b6d4" textAnchor="middle">CountDownLatch</text>
    <text x="200" y="168" fontSize="9" fill="#9ca3af" textAnchor="middle">Batch completion signal</text>

    <rect x="380" y="130" width="200" height="50" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="480" y="153" fontSize="10" fontWeight="600" fill="#06b6d4" textAnchor="middle">CompletableFuture</text>
    <text x="480" y="168" fontSize="9" fill="#9ca3af" textAnchor="middle">Async result composition</text>
  </svg>
)

const UploadPipelineDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="chunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="uploadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="assembleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowPipe" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#60a5fa" />
      </marker>
    </defs>

    <text x="400" y="20" fontSize="12" fontWeight="600" fill="#60a5fa" textAnchor="middle">Chunked Upload Pipeline</text>

    <rect x="20" y="50" width="120" height="80" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="80" y="75" fontSize="11" fontWeight="600" fill="#ef4444" textAnchor="middle">Large File</text>
    <text x="80" y="93" fontSize="9" fill="#9ca3af" textAnchor="middle">500 MB</text>
    <text x="80" y="108" fontSize="9" fill="#9ca3af" textAnchor="middle">SHA-256 hash</text>

    <line x1="140" y1="90" x2="175" y2="90" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowPipe)" />

    <rect x="180" y="40" width="130" height="100" rx="8" fill="url(#chunkGrad)" />
    <text x="245" y="65" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">File Chunker</text>
    <rect x="193" y="75" width="45" height="20" rx="3" fill="#60a5fa" />
    <text x="215" y="89" fontSize="8" fill="white" textAnchor="middle">5MB</text>
    <rect x="243" y="75" width="45" height="20" rx="3" fill="#60a5fa" />
    <text x="265" y="89" fontSize="8" fill="white" textAnchor="middle">5MB</text>
    <rect x="193" y="100" width="45" height="20" rx="3" fill="#60a5fa" />
    <text x="215" y="114" fontSize="8" fill="white" textAnchor="middle">5MB</text>
    <rect x="243" y="100" width="45" height="20" rx="3" fill="#60a5fa" opacity="0.6" />
    <text x="265" y="114" fontSize="8" fill="white" textAnchor="middle">...</text>

    <line x1="310" y1="90" x2="345" y2="90" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowPipe)" />

    <rect x="350" y="40" width="140" height="100" rx="8" fill="url(#uploadGrad)" />
    <text x="420" y="65" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">Parallel Upload</text>
    <text x="420" y="85" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Thread 1: chunk[0]</text>
    <text x="420" y="100" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Thread 2: chunk[1]</text>
    <text x="420" y="115" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Thread 3: chunk[2]</text>
    <text x="420" y="130" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Retry on failure</text>

    <line x1="490" y1="90" x2="525" y2="90" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowPipe)" />

    <rect x="530" y="50" width="120" height="80" rx="8" fill="url(#assembleGrad)" />
    <text x="590" y="80" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">Assemble</text>
    <text x="590" y="97" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Multipart Complete</text>
    <text x="590" y="112" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Verify Checksum</text>

    <line x1="650" y1="90" x2="685" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowPipe)" />

    <rect x="690" y="60" width="80" height="60" rx="8" fill="#10b981" />
    <text x="730" y="88" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">Done</text>
    <text x="730" y="105" fontSize="8" fill="white" opacity="0.8" textAnchor="middle">Callback</text>

    <text x="400" y="175" fontSize="10" fill="#6b7280" textAnchor="middle">Large files are split into chunks, uploaded in parallel, then assembled on the server</text>

    <rect x="180" y="155" width="110" height="30" rx="4" fill="#1f2937" stroke="#374151" strokeWidth="1" />
    <text x="235" y="174" fontSize="9" fill="#f59e0b" textAnchor="middle">Bandwidth Throttle</text>

    <rect x="350" y="155" width="120" height="30" rx="4" fill="#1f2937" stroke="#374151" strokeWidth="1" />
    <text x="410" y="174" fontSize="9" fill="#ef4444" textAnchor="middle">Exponential Backoff</text>

    <rect x="530" y="155" width="120" height="30" rx="4" fill="#1f2937" stroke="#374151" strokeWidth="1" />
    <text x="590" y="174" fontSize="9" fill="#10b981" textAnchor="middle">MD5 / SHA-256</text>
  </svg>
)

const ErrorHandlingDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="cbClosedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cbOpenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cbHalfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowCB" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#60a5fa" />
      </marker>
    </defs>

    <text x="400" y="20" fontSize="12" fontWeight="600" fill="#60a5fa" textAnchor="middle">Circuit Breaker Pattern for Upload Failures</text>

    <rect x="50" y="50" width="140" height="70" rx="10" fill="url(#cbClosedGrad)" />
    <text x="120" y="80" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">CLOSED</text>
    <text x="120" y="98" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Normal operation</text>
    <text x="120" y="112" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Count failures</text>

    <line x1="190" y1="85" x2="280" y2="85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCB)" />
    <text x="235" y="75" fontSize="9" fill="#ef4444" textAnchor="middle">failures &gt; threshold</text>

    <rect x="285" y="50" width="140" height="70" rx="10" fill="url(#cbOpenGrad)" />
    <text x="355" y="80" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">OPEN</text>
    <text x="355" y="98" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Fail fast</text>
    <text x="355" y="112" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">No uploads sent</text>

    <line x1="425" y1="85" x2="515" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowCB)" />
    <text x="470" y="75" fontSize="9" fill="#f59e0b" textAnchor="middle">timeout expires</text>

    <rect x="520" y="50" width="140" height="70" rx="10" fill="url(#cbHalfGrad)" />
    <text x="590" y="80" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">HALF-OPEN</text>
    <text x="590" y="98" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Test with 1 upload</text>

    <path d="M 590 120 L 590 160 L 120 160 L 120 125" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowCB)" />
    <text x="355" y="155" fontSize="9" fill="#10b981" textAnchor="middle">success: reset to CLOSED</text>

    <path d="M 590 120 L 590 190 L 355 190 L 355 125" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowCB)" />
    <text x="475" y="200" fontSize="9" fill="#ef4444" textAnchor="middle">failure: back to OPEN</text>

    <rect x="680" y="50" width="100" height="120" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="730" y="75" fontSize="10" fontWeight="600" fill="#06b6d4" textAnchor="middle">DLQ</text>
    <text x="730" y="95" fontSize="9" fill="#9ca3af" textAnchor="middle">Failed</text>
    <text x="730" y="110" fontSize="9" fill="#9ca3af" textAnchor="middle">Uploads</text>
    <text x="730" y="130" fontSize="9" fill="#9ca3af" textAnchor="middle">Manual</text>
    <text x="730" y="145" fontSize="9" fill="#9ca3af" textAnchor="middle">Retry</text>
  </svg>
)

const GracefulShutdownDiagram = () => (
  <svg viewBox="0 0 750 180" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowGS" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    <text x="375" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Graceful Shutdown Sequence</text>

    <rect x="30" y="60" width="130" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" />
    <text x="95" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">shutdown()</text>
    <text x="95" y="108" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">No new tasks</text>

    <rect x="210" y="60" width="130" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2" />
    <text x="275" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">awaitTermination</text>
    <text x="275" y="103" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">Wait for in-flight</text>
    <text x="275" y="118" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">uploads (30s)</text>

    <rect x="390" y="60" width="130" height="70" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2" />
    <text x="455" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">shutdownNow()</text>
    <text x="455" y="103" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">Interrupt threads</text>
    <text x="455" y="118" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">If timeout hit</text>

    <rect x="570" y="60" width="130" height="70" rx="8" fill="#10b981" stroke="#4ade80" strokeWidth="2" />
    <text x="635" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Cleanup</text>
    <text x="635" y="103" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">Persist state</text>
    <text x="635" y="118" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">Log incomplete</text>

    <line x1="160" y1="95" x2="205" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowGS)" />
    <line x1="340" y1="95" x2="385" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowGS)" />
    <line x1="520" y1="95" x2="565" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowGS)" />

    <text x="95" y="155" textAnchor="middle" fill="#9ca3af" fontSize="9">Reject new tasks</text>
    <text x="275" y="155" textAnchor="middle" fill="#9ca3af" fontSize="9">Drain running tasks</text>
    <text x="455" y="155" textAnchor="middle" fill="#9ca3af" fontSize="9">Force stop if needed</text>
    <text x="635" y="155" textAnchor="middle" fill="#9ca3af" fontSize="9">Save progress to DLQ</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function FileUploader({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'architecture',
      name: 'System Architecture',
      icon: '\u{1F3D7}\uFE0F',
      color: '#3b82f6',
      description: 'Producer-consumer architecture with a bounded task queue, configurable thread pool, and structured upload tasks for handling high-volume concurrent file uploads.',
      diagram: ThreadPoolDiagram,
      details: [
        {
          name: 'Architecture Overview',
          diagram: FileUploaderArchitectureDiagram,
          explanation: 'The multithreaded file uploader follows a producer-consumer pattern. A producer thread scans directories and creates UploadTask objects, placing them into a bounded BlockingQueue. A pool of worker threads (consumers) picks tasks from the queue and performs the actual upload. This decouples task creation from execution, allowing the system to handle bursts by buffering tasks in the queue while processing at a controlled rate determined by the thread pool size.',
          codeExample: `import java.util.concurrent.*;
import java.nio.file.Path;

public class FileUploadService {
    private final ExecutorService uploadExecutor;
    private final BlockingQueue<UploadTask> taskQueue;
    private final int maxFileSize; // in bytes

    public FileUploadService(int coreThreads, int maxThreads,
                              int queueCapacity, int maxFileSizeMB) {
        this.maxFileSize = maxFileSizeMB * 1024 * 1024;
        this.taskQueue = new LinkedBlockingQueue<>(queueCapacity);

        this.uploadExecutor = new ThreadPoolExecutor(
            coreThreads,                    // core pool size
            maxThreads,                     // maximum pool size
            60L, TimeUnit.SECONDS,          // keep-alive for idle threads
            taskQueue,                      // bounded work queue
            new ThreadFactory() {
                private int count = 0;
                @Override
                public Thread newThread(Runnable r) {
                    Thread t = new Thread(r, "upload-worker-" + count++);
                    t.setDaemon(true);
                    return t;
                }
            },
            new ThreadPoolExecutor.CallerRunsPolicy() // back-pressure
        );
    }

    public CompletableFuture<UploadResult> submitUpload(Path filePath,
                                                         String destination) {
        if (filePath.toFile().length() > maxFileSize) {
            return CompletableFuture.completedFuture(
                UploadResult.failure(filePath, "File exceeds max size"));
        }

        CompletableFuture<UploadResult> future = new CompletableFuture<>();
        uploadExecutor.submit(new UploadTask(filePath, destination, future));
        return future;
    }
}`
        },
        {
          name: 'Core Classes',
          diagram: ThreadPoolDiagram,
          explanation: 'The system is built around three core classes: UploadTask represents a unit of work containing the file path, destination, and a CompletableFuture for the result. UploadResult encapsulates the outcome of an upload including success/failure status, bytes transferred, duration, and any error details. FileUploadService orchestrates the entire process, managing the thread pool and task lifecycle.',
          codeExample: `import java.nio.file.Path;
import java.util.concurrent.CompletableFuture;

public class UploadTask implements Runnable {
    private final Path filePath;
    private final String destination;
    private final CompletableFuture<UploadResult> resultFuture;
    private final long createdAt;

    public UploadTask(Path filePath, String destination,
                      CompletableFuture<UploadResult> resultFuture) {
        this.filePath = filePath;
        this.destination = destination;
        this.resultFuture = resultFuture;
        this.createdAt = System.currentTimeMillis();
    }

    @Override
    public void run() {
        long startTime = System.currentTimeMillis();
        try {
            long bytesUploaded = performUpload(filePath, destination);
            long duration = System.currentTimeMillis() - startTime;
            resultFuture.complete(
                UploadResult.success(filePath, bytesUploaded, duration));
        } catch (Exception e) {
            long duration = System.currentTimeMillis() - startTime;
            resultFuture.complete(
                UploadResult.failure(filePath, e.getMessage(), duration));
        }
    }

    private long performUpload(Path file, String dest) throws Exception {
        // Actual upload logic (HTTP, S3 SDK, etc.)
        return file.toFile().length();
    }
}

public class UploadResult {
    public enum Status { SUCCESS, FAILURE }

    private final Path filePath;
    private final Status status;
    private final long bytesTransferred;
    private final long durationMs;
    private final String errorMessage;

    private UploadResult(Path filePath, Status status,
                         long bytes, long durationMs, String error) {
        this.filePath = filePath;
        this.status = status;
        this.bytesTransferred = bytes;
        this.durationMs = durationMs;
        this.errorMessage = error;
    }

    public static UploadResult success(Path path, long bytes, long duration) {
        return new UploadResult(path, Status.SUCCESS, bytes, duration, null);
    }

    public static UploadResult failure(Path path, String error) {
        return new UploadResult(path, Status.FAILURE, 0, 0, error);
    }

    public static UploadResult failure(Path path, String error, long duration) {
        return new UploadResult(path, Status.FAILURE, 0, duration, error);
    }

    // Getters omitted for brevity
    public boolean isSuccess() { return status == Status.SUCCESS; }
    public Path getFilePath() { return filePath; }
    public long getBytesTransferred() { return bytesTransferred; }
    public long getDurationMs() { return durationMs; }
    public String getErrorMessage() { return errorMessage; }
}`
        },
        {
          name: 'Thread Pool Configuration',
          explanation: 'Choosing the right thread pool configuration is critical. For I/O-bound uploads, the optimal thread count is typically higher than the number of CPU cores since threads spend most of their time waiting on network I/O. A common formula is: threads = cores * (1 + wait_time / compute_time). For file uploads where wait_time dominates, 2x to 4x the core count is a good starting point. The queue capacity acts as a buffer and provides back-pressure when the system is overloaded.',
          codeExample: `import java.util.concurrent.*;

public class UploadPoolConfig {
    // Optimal thread count for I/O-bound tasks:
    // threads = cores * (1 + waitTime / computeTime)
    // For uploads: waitTime >> computeTime, so use 2x-4x cores

    public static ExecutorService createOptimalPool() {
        int cores = Runtime.getRuntime().availableProcessors();
        int corePoolSize = cores * 2;       // steady-state threads
        int maxPoolSize = cores * 4;        // burst capacity
        int queueCapacity = 1024;           // bounded queue
        long keepAliveSeconds = 60;         // idle thread timeout

        ThreadPoolExecutor executor = new ThreadPoolExecutor(
            corePoolSize,
            maxPoolSize,
            keepAliveSeconds, TimeUnit.SECONDS,
            new LinkedBlockingQueue<>(queueCapacity),
            r -> {
                Thread t = new Thread(r, "upload-worker");
                t.setDaemon(true);   // don't block JVM shutdown
                return t;
            },
            new ThreadPoolExecutor.CallerRunsPolicy()
            // CallerRunsPolicy: submitting thread runs task if
            // queue full - provides natural back-pressure
        );

        // Allow core threads to time out too
        executor.allowCoreThreadTimeOut(true);

        // Pre-start core threads for faster initial response
        executor.prestartAllCoreThreads();

        return executor;
    }

    // Alternative: Virtual threads (Java 21+)
    public static ExecutorService createVirtualThreadPool() {
        return Executors.newVirtualThreadPerTaskExecutor();
        // Each upload gets its own lightweight virtual thread.
        // No need for pool sizing - JVM manages scheduling.
        // Ideal for high-concurrency I/O-bound workloads.
    }
}`
        },
        {
          name: 'Configuration Builder',
          explanation: 'A builder pattern provides a clean API for configuring the file upload service. It encapsulates defaults and validation, making it easy for callers to customize only the parameters they care about. Default values are chosen for typical production scenarios: 8 core threads, 16 max threads, 1024 queue capacity, and 100 MB max file size.',
          codeExample: `public class FileUploadServiceBuilder {
    private int coreThreads = 8;
    private int maxThreads = 16;
    private int queueCapacity = 1024;
    private int maxFileSizeMB = 100;
    private int chunkSizeMB = 5;
    private int maxRetries = 3;
    private long retryDelayMs = 1000;
    private long maxBandwidthBytesPerSec = Long.MAX_VALUE;
    private boolean checksumEnabled = true;

    public FileUploadServiceBuilder coreThreads(int n) {
        if (n < 1) throw new IllegalArgumentException(
            "Core threads must be >= 1");
        this.coreThreads = n;
        return this;
    }

    public FileUploadServiceBuilder maxThreads(int n) {
        if (n < coreThreads) throw new IllegalArgumentException(
            "Max threads must be >= core threads");
        this.maxThreads = n;
        return this;
    }

    public FileUploadServiceBuilder queueCapacity(int n) {
        this.queueCapacity = n;
        return this;
    }

    public FileUploadServiceBuilder maxFileSizeMB(int mb) {
        this.maxFileSizeMB = mb;
        return this;
    }

    public FileUploadServiceBuilder chunkSizeMB(int mb) {
        this.chunkSizeMB = mb;
        return this;
    }

    public FileUploadServiceBuilder maxRetries(int n) {
        this.maxRetries = n;
        return this;
    }

    public FileUploadServiceBuilder bandwidthLimitMBps(int mbps) {
        this.maxBandwidthBytesPerSec = mbps * 1024L * 1024L;
        return this;
    }

    public FileUploadService build() {
        return new FileUploadService(
            coreThreads, maxThreads, queueCapacity,
            maxFileSizeMB, chunkSizeMB, maxRetries,
            retryDelayMs, maxBandwidthBytesPerSec,
            checksumEnabled
        );
    }
}

// Usage:
// FileUploadService service = new FileUploadServiceBuilder()
//     .coreThreads(8)
//     .maxThreads(32)
//     .queueCapacity(2048)
//     .maxFileSizeMB(500)
//     .chunkSizeMB(10)
//     .maxRetries(5)
//     .bandwidthLimitMBps(50)
//     .build();`
        }
      ]
    },
    {
      id: 'concurrency',
      name: 'Concurrency & Thread Safety',
      icon: '\u{1F512}',
      color: '#10b981',
      description: 'Thread-safe progress tracking, status management, and synchronization using BlockingQueue, atomics, ConcurrentHashMap, and coordination primitives.',
      diagram: ConcurrencyPrimitivesDiagram,
      details: [
        {
          name: 'BlockingQueue & Atomics',
          diagram: ConcurrencyPrimitivesDiagram,
          explanation: 'The BlockingQueue is the backbone of the producer-consumer pattern, automatically blocking producers when the queue is full and consumers when empty. AtomicLong and AtomicInteger provide lock-free thread-safe counters for tracking aggregate metrics like total bytes uploaded and files completed, avoiding the overhead of synchronized blocks for simple counter updates.',
          codeExample: `import java.util.concurrent.*;
import java.util.concurrent.atomic.*;
import java.nio.file.Path;

public class UploadProgressTracker {
    private final AtomicLong totalBytesUploaded = new AtomicLong(0);
    private final AtomicInteger filesCompleted = new AtomicInteger(0);
    private final AtomicInteger filesFailed = new AtomicInteger(0);
    private final AtomicInteger filesInProgress = new AtomicInteger(0);
    private final long startTime = System.currentTimeMillis();

    public void onUploadStarted() {
        filesInProgress.incrementAndGet();
    }

    public void onBytesUploaded(long bytes) {
        totalBytesUploaded.addAndGet(bytes);
    }

    public void onUploadCompleted(long fileSize) {
        totalBytesUploaded.addAndGet(fileSize);
        filesCompleted.incrementAndGet();
        filesInProgress.decrementAndGet();
    }

    public void onUploadFailed() {
        filesFailed.incrementAndGet();
        filesInProgress.decrementAndGet();
    }

    public double getThroughputMBps() {
        long elapsed = System.currentTimeMillis() - startTime;
        if (elapsed == 0) return 0;
        return (totalBytesUploaded.get() / (1024.0 * 1024.0))
               / (elapsed / 1000.0);
    }

    public String getProgressSummary() {
        return String.format(
            "Completed: %d | Failed: %d | In-Progress: %d | " +
            "Uploaded: %.2f MB | Throughput: %.2f MB/s",
            filesCompleted.get(), filesFailed.get(),
            filesInProgress.get(),
            totalBytesUploaded.get() / (1024.0 * 1024.0),
            getThroughputMBps()
        );
    }
}

// Usage with BlockingQueue producer-consumer:
public class UploadProducer implements Runnable {
    private final BlockingQueue<UploadTask> queue;
    private final List<Path> files;

    public UploadProducer(BlockingQueue<UploadTask> queue,
                          List<Path> files) {
        this.queue = queue;
        this.files = files;
    }

    @Override
    public void run() {
        for (Path file : files) {
            try {
                // Blocks if queue is full - natural back-pressure
                queue.put(new UploadTask(file, "/uploads/" + file.getFileName(),
                    new CompletableFuture<>()));
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }
}`
        },
        {
          name: 'ConcurrentHashMap Status',
          explanation: 'ConcurrentHashMap provides thread-safe per-file status tracking without requiring global locks. Each file has its own UploadStatus entry that can be updated independently by whichever worker thread is handling it. The compute and merge methods ensure atomic updates per key, and iterating the map is weakly consistent so status queries never block uploaders.',
          codeExample: `import java.util.concurrent.ConcurrentHashMap;
import java.nio.file.Path;

public class UploadStatusTracker {
    public enum UploadState {
        QUEUED, IN_PROGRESS, COMPLETED, FAILED, RETRYING
    }

    public static class UploadStatus {
        private volatile UploadState state;
        private volatile long bytesUploaded;
        private volatile long totalBytes;
        private volatile int retryCount;
        private volatile String errorMessage;
        private final long queuedAt;

        public UploadStatus(long totalBytes) {
            this.state = UploadState.QUEUED;
            this.totalBytes = totalBytes;
            this.queuedAt = System.currentTimeMillis();
        }

        public double getProgressPercent() {
            if (totalBytes == 0) return 0;
            return (bytesUploaded * 100.0) / totalBytes;
        }

        // Getters and setters
        public UploadState getState() { return state; }
        public void setState(UploadState s) { this.state = s; }
        public long getBytesUploaded() { return bytesUploaded; }
        public void setBytesUploaded(long b) { this.bytesUploaded = b; }
        public int getRetryCount() { return retryCount; }
        public void incrementRetry() { this.retryCount++; }
        public void setErrorMessage(String msg) { this.errorMessage = msg; }
    }

    private final ConcurrentHashMap<String, UploadStatus> statusMap
        = new ConcurrentHashMap<>();

    public void registerFile(Path filePath, long fileSize) {
        String key = filePath.toString();
        statusMap.put(key, new UploadStatus(fileSize));
    }

    public void updateProgress(Path filePath, long bytesUploaded) {
        statusMap.computeIfPresent(filePath.toString(), (k, status) -> {
            status.setBytesUploaded(bytesUploaded);
            status.setState(UploadState.IN_PROGRESS);
            return status;
        });
    }

    public void markCompleted(Path filePath) {
        statusMap.computeIfPresent(filePath.toString(), (k, status) -> {
            status.setState(UploadState.COMPLETED);
            status.setBytesUploaded(status.totalBytes);
            return status;
        });
    }

    public void markFailed(Path filePath, String error) {
        statusMap.computeIfPresent(filePath.toString(), (k, status) -> {
            status.setState(UploadState.FAILED);
            status.setErrorMessage(error);
            return status;
        });
    }

    public UploadStatus getStatus(Path filePath) {
        return statusMap.get(filePath.toString());
    }

    public long countByState(UploadState state) {
        return statusMap.values().stream()
            .filter(s -> s.getState() == state)
            .count();
    }
}`
        },
        {
          name: 'CountDownLatch & Futures',
          explanation: 'CountDownLatch is ideal for batch upload scenarios where you need to wait until all files in a batch have completed. Each completed upload counts down the latch, and the main thread blocks until all uploads finish. CompletableFuture provides a more flexible approach, supporting composition with thenApply, thenCombine, and allOf for complex async workflows like uploading dependent files or post-processing after all uploads complete.',
          codeExample: `import java.util.concurrent.*;
import java.util.List;
import java.util.ArrayList;
import java.nio.file.Path;

public class BatchUploadManager {

    // Approach 1: CountDownLatch for simple batch wait
    public List<UploadResult> uploadBatchBlocking(
            FileUploadService service, List<Path> files)
            throws InterruptedException {

        CountDownLatch latch = new CountDownLatch(files.size());
        List<UploadResult> results =
            new CopyOnWriteArrayList<>();

        for (Path file : files) {
            service.submitUpload(file, "/uploads/" + file.getFileName())
                .thenAccept(result -> {
                    results.add(result);
                    latch.countDown();
                });
        }

        // Block until all uploads complete or timeout
        boolean completed = latch.await(5, TimeUnit.MINUTES);
        if (!completed) {
            System.err.println("Batch upload timed out! " +
                (files.size() - results.size()) + " uploads pending");
        }
        return results;
    }

    // Approach 2: CompletableFuture composition
    public CompletableFuture<BatchResult> uploadBatchAsync(
            FileUploadService service, List<Path> files) {

        List<CompletableFuture<UploadResult>> futures = new ArrayList<>();

        for (Path file : files) {
            CompletableFuture<UploadResult> future =
                service.submitUpload(file, "/uploads/" + file.getFileName());
            futures.add(future);
        }

        // Wait for all uploads, then aggregate results
        return CompletableFuture.allOf(
                futures.toArray(new CompletableFuture[0]))
            .thenApply(v -> {
                List<UploadResult> results = futures.stream()
                    .map(CompletableFuture::join)
                    .toList();

                long successCount = results.stream()
                    .filter(UploadResult::isSuccess).count();
                long totalBytes = results.stream()
                    .mapToLong(UploadResult::getBytesTransferred).sum();

                return new BatchResult(results.size(),
                    successCount, totalBytes);
            });
    }

    // Approach 3: Process results as they complete
    public void uploadWithCallbacks(
            FileUploadService service, List<Path> files,
            UploadListener listener) {

        AtomicInteger remaining = new AtomicInteger(files.size());

        for (Path file : files) {
            service.submitUpload(file, "/uploads/" + file.getFileName())
                .thenAccept(result -> {
                    if (result.isSuccess()) {
                        listener.onFileCompleted(result);
                    } else {
                        listener.onFileFailed(result);
                    }
                    if (remaining.decrementAndGet() == 0) {
                        listener.onBatchCompleted();
                    }
                });
        }
    }

    public interface UploadListener {
        void onFileCompleted(UploadResult result);
        void onFileFailed(UploadResult result);
        void onBatchCompleted();
    }
}`
        },
        {
          name: 'Semaphore & ReentrantLock',
          explanation: 'A Semaphore limits the number of concurrent upload connections, preventing the system from overwhelming the remote storage service. ReentrantLock provides fine-grained control for bandwidth throttling, ensuring that the total upload rate across all threads stays within a configured limit. Together, they protect both the remote endpoint and the network from overload.',
          codeExample: `import java.util.concurrent.Semaphore;
import java.util.concurrent.locks.ReentrantLock;
import java.io.*;
import java.nio.file.Path;

public class ThrottledUploader {
    private final Semaphore connectionSemaphore;
    private final BandwidthThrottler throttler;

    public ThrottledUploader(int maxConnections,
                              long maxBytesPerSecond) {
        this.connectionSemaphore = new Semaphore(maxConnections);
        this.throttler = new BandwidthThrottler(maxBytesPerSecond);
    }

    public UploadResult upload(Path filePath, String destination)
            throws InterruptedException {
        // Acquire a connection permit (blocks if max reached)
        connectionSemaphore.acquire();
        try {
            return doUpload(filePath, destination);
        } finally {
            connectionSemaphore.release();
        }
    }

    private UploadResult doUpload(Path filePath, String destination)
            throws InterruptedException {
        long totalBytes = filePath.toFile().length();
        long bytesUploaded = 0;
        byte[] buffer = new byte[8192];

        try (InputStream in = new FileInputStream(filePath.toFile())) {
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                // Throttle bandwidth across all threads
                throttler.throttle(bytesRead);
                // sendChunk(destination, buffer, bytesRead);
                bytesUploaded += bytesRead;
            }
            return UploadResult.success(filePath, bytesUploaded, 0);
        } catch (IOException e) {
            return UploadResult.failure(filePath, e.getMessage());
        }
    }
}

class BandwidthThrottler {
    private final ReentrantLock lock = new ReentrantLock();
    private final long maxBytesPerSecond;
    private long bytesInCurrentWindow = 0;
    private long windowStartTime = System.currentTimeMillis();

    public BandwidthThrottler(long maxBytesPerSecond) {
        this.maxBytesPerSecond = maxBytesPerSecond;
    }

    public void throttle(int bytesToSend) throws InterruptedException {
        lock.lock();
        try {
            long now = System.currentTimeMillis();
            long elapsed = now - windowStartTime;

            if (elapsed >= 1000) {
                // Reset window
                bytesInCurrentWindow = 0;
                windowStartTime = now;
            }

            bytesInCurrentWindow += bytesToSend;

            if (bytesInCurrentWindow > maxBytesPerSecond) {
                long sleepTime = 1000 - elapsed;
                if (sleepTime > 0) {
                    lock.unlock();
                    Thread.sleep(sleepTime);
                    lock.lock();
                    bytesInCurrentWindow = bytesToSend;
                    windowStartTime = System.currentTimeMillis();
                }
            }
        } finally {
            if (lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'upload-pipeline',
      name: 'Upload Pipeline',
      icon: '\u{1F680}',
      color: '#f59e0b',
      description: 'File chunking for parallel uploads, multipart assembly, retry logic with exponential backoff, progress tracking, bandwidth throttling, and checksum validation.',
      diagram: UploadPipelineDiagram,
      details: [
        {
          name: 'File Chunking',
          diagram: UploadPipelineDiagram,
          explanation: 'Large files are split into fixed-size chunks (typically 5-10 MB) that can be uploaded in parallel across multiple threads. Each chunk is identified by a file ID and a sequential part number. The chunker reads the file sequentially and produces chunk descriptors that can be distributed to worker threads. This approach dramatically reduces upload time for large files and enables resume-on-failure since only failed chunks need to be retried.',
          codeExample: `import java.io.*;
import java.nio.file.*;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;

public class FileChunker {
    private final int chunkSizeBytes;

    public FileChunker(int chunkSizeMB) {
        this.chunkSizeBytes = chunkSizeMB * 1024 * 1024;
    }

    public List<ChunkDescriptor> split(Path filePath) throws IOException {
        List<ChunkDescriptor> chunks = new ArrayList<>();
        long fileSize = Files.size(filePath);
        String uploadId = generateUploadId(filePath);
        int totalChunks = (int) Math.ceil(
            (double) fileSize / chunkSizeBytes);

        try (InputStream is = Files.newInputStream(filePath)) {
            byte[] buffer = new byte[chunkSizeBytes];
            int partNumber = 0;

            while (true) {
                int bytesRead = readFully(is, buffer);
                if (bytesRead <= 0) break;

                byte[] chunkData = (bytesRead < buffer.length)
                    ? java.util.Arrays.copyOf(buffer, bytesRead)
                    : buffer.clone();

                String checksum = computeMD5(chunkData);

                chunks.add(new ChunkDescriptor(
                    uploadId,
                    filePath,
                    partNumber++,
                    totalChunks,
                    chunkData,
                    bytesRead,
                    checksum
                ));
            }
        }
        return chunks;
    }

    private int readFully(InputStream is, byte[] buf) throws IOException {
        int totalRead = 0;
        while (totalRead < buf.length) {
            int read = is.read(buf, totalRead, buf.length - totalRead);
            if (read == -1) break;
            totalRead += read;
        }
        return totalRead;
    }

    private String computeMD5(byte[] data) throws IOException {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(data);
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new IOException("MD5 computation failed", e);
        }
    }

    private String generateUploadId(Path filePath) {
        return filePath.getFileName() + "-" +
               System.currentTimeMillis();
    }
}

public class ChunkDescriptor {
    private final String uploadId;
    private final Path originalFile;
    private final int partNumber;
    private final int totalParts;
    private final byte[] data;
    private final int size;
    private final String checksum;

    // Constructor and getters
    public ChunkDescriptor(String uploadId, Path originalFile,
            int partNumber, int totalParts, byte[] data,
            int size, String checksum) {
        this.uploadId = uploadId;
        this.originalFile = originalFile;
        this.partNumber = partNumber;
        this.totalParts = totalParts;
        this.data = data;
        this.size = size;
        this.checksum = checksum;
    }

    public String getUploadId() { return uploadId; }
    public int getPartNumber() { return partNumber; }
    public int getTotalParts() { return totalParts; }
    public byte[] getData() { return data; }
    public int getSize() { return size; }
    public String getChecksum() { return checksum; }
}`
        },
        {
          name: 'Multipart Upload & Assembly',
          explanation: 'After all chunks are uploaded in parallel, the server-side multipart assembly combines them into the final file. The client initiates a multipart upload session, receives an upload ID, uploads parts concurrently, then sends a complete request with all part ETags. This mirrors the AWS S3 multipart upload API pattern and is compatible with most cloud storage providers.',
          codeExample: `import java.util.concurrent.*;
import java.util.List;
import java.util.ArrayList;
import java.nio.file.Path;

public class MultipartUploadManager {
    private final ExecutorService chunkUploadPool;
    private final FileChunker chunker;
    private final int maxRetries;

    public MultipartUploadManager(int parallelChunks,
                                   int chunkSizeMB,
                                   int maxRetries) {
        this.chunkUploadPool = Executors.newFixedThreadPool(
            parallelChunks,
            r -> {
                Thread t = new Thread(r, "chunk-uploader");
                t.setDaemon(true);
                return t;
            }
        );
        this.chunker = new FileChunker(chunkSizeMB);
        this.maxRetries = maxRetries;
    }

    public CompletableFuture<UploadResult> uploadLargeFile(
            Path filePath, String destination) {

        return CompletableFuture.supplyAsync(() -> {
            try {
                // Step 1: Initiate multipart upload
                String uploadId = initiateMultipart(destination);

                // Step 2: Split file into chunks
                List<ChunkDescriptor> chunks = chunker.split(filePath);

                // Step 3: Upload all chunks in parallel
                List<CompletableFuture<PartResult>> partFutures =
                    new ArrayList<>();

                for (ChunkDescriptor chunk : chunks) {
                    CompletableFuture<PartResult> pf =
                        CompletableFuture.supplyAsync(
                            () -> uploadChunkWithRetry(
                                uploadId, chunk, destination),
                            chunkUploadPool
                        );
                    partFutures.add(pf);
                }

                // Wait for all parts to complete
                CompletableFuture.allOf(
                    partFutures.toArray(new CompletableFuture[0])
                ).join();

                // Collect part results
                List<PartResult> parts = partFutures.stream()
                    .map(CompletableFuture::join)
                    .toList();

                // Check for any failures
                boolean anyFailed = parts.stream()
                    .anyMatch(p -> !p.isSuccess());
                if (anyFailed) {
                    abortMultipart(uploadId, destination);
                    return UploadResult.failure(filePath,
                        "Some chunks failed to upload");
                }

                // Step 4: Complete multipart upload
                completeMultipart(uploadId, destination, parts);

                long totalBytes = parts.stream()
                    .mapToLong(PartResult::getBytes).sum();

                return UploadResult.success(filePath, totalBytes, 0);

            } catch (Exception e) {
                return UploadResult.failure(filePath, e.getMessage());
            }
        });
    }

    private PartResult uploadChunkWithRetry(
            String uploadId, ChunkDescriptor chunk,
            String destination) {
        // Delegate to retry logic (next subtopic)
        return new PartResult(chunk.getPartNumber(),
            chunk.getSize(), "etag-" + chunk.getPartNumber(),
            true);
    }

    // Placeholder methods for actual HTTP calls
    private String initiateMultipart(String dest) { return "upload-123"; }
    private void completeMultipart(String id, String dest,
                                    List<PartResult> parts) {}
    private void abortMultipart(String id, String dest) {}
}

class PartResult {
    private final int partNumber;
    private final long bytes;
    private final String etag;
    private final boolean success;

    public PartResult(int partNumber, long bytes,
                      String etag, boolean success) {
        this.partNumber = partNumber;
        this.bytes = bytes;
        this.etag = etag;
        this.success = success;
    }

    public boolean isSuccess() { return success; }
    public long getBytes() { return bytes; }
    public int getPartNumber() { return partNumber; }
    public String getEtag() { return etag; }
}`
        },
        {
          name: 'Retry with Exponential Backoff',
          explanation: 'Network failures are inevitable in file uploads. Exponential backoff with jitter is the standard retry strategy: each retry waits longer than the previous one (1s, 2s, 4s, 8s...) with a random jitter factor to prevent thundering herd problems when many uploads fail simultaneously. Only transient errors (timeouts, 5xx responses) trigger retries; permanent errors (403, 404) fail immediately.',
          codeExample: `import java.util.concurrent.ThreadLocalRandom;

public class RetryableChunkUploader {
    private final int maxRetries;
    private final long baseDelayMs;
    private final long maxDelayMs;

    public RetryableChunkUploader(int maxRetries,
                                   long baseDelayMs,
                                   long maxDelayMs) {
        this.maxRetries = maxRetries;
        this.baseDelayMs = baseDelayMs;
        this.maxDelayMs = maxDelayMs;
    }

    public PartResult uploadWithRetry(String uploadId,
                                       ChunkDescriptor chunk,
                                       String destination) {
        Exception lastException = null;

        for (int attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                if (attempt > 0) {
                    long delay = calculateBackoff(attempt);
                    System.out.printf(
                        "Retry %d/%d for part %d after %dms%n",
                        attempt, maxRetries,
                        chunk.getPartNumber(), delay);
                    Thread.sleep(delay);
                }

                // Attempt the upload
                String etag = uploadChunk(
                    uploadId, chunk, destination);

                return new PartResult(
                    chunk.getPartNumber(),
                    chunk.getSize(),
                    etag, true);

            } catch (TransientException e) {
                lastException = e;
                // Transient error - retry
            } catch (PermanentException e) {
                // Permanent error - don't retry
                return new PartResult(
                    chunk.getPartNumber(), 0, null, false);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return new PartResult(
                    chunk.getPartNumber(), 0, null, false);
            }
        }

        // All retries exhausted
        System.err.printf("Part %d failed after %d retries: %s%n",
            chunk.getPartNumber(), maxRetries,
            lastException != null ? lastException.getMessage() : "unknown");
        return new PartResult(chunk.getPartNumber(), 0, null, false);
    }

    private long calculateBackoff(int attempt) {
        // Exponential backoff: baseDelay * 2^(attempt-1)
        long exponentialDelay = baseDelayMs *
            (long) Math.pow(2, attempt - 1);

        // Cap at maximum delay
        long cappedDelay = Math.min(exponentialDelay, maxDelayMs);

        // Add jitter: random value between 0 and cappedDelay
        long jitter = ThreadLocalRandom.current()
            .nextLong(0, cappedDelay + 1);

        return (cappedDelay + jitter) / 2;
    }

    private String uploadChunk(String uploadId,
                                ChunkDescriptor chunk,
                                String destination) throws Exception {
        // Actual HTTP upload logic
        // Verify server-side checksum matches
        // Return ETag from response
        return "etag-" + chunk.getPartNumber();
    }
}

// Custom exceptions for retry classification
class TransientException extends Exception {
    public TransientException(String msg) { super(msg); }
}

class PermanentException extends Exception {
    public PermanentException(String msg) { super(msg); }
}`
        },
        {
          name: 'Progress & Checksum Validation',
          explanation: 'Progress callbacks give callers real-time visibility into upload progress for UI updates. Each file reports bytes uploaded as a percentage of total size. Checksum validation using MD5 or SHA-256 ensures data integrity by comparing client-computed and server-computed hashes after upload. If checksums do not match, the upload is marked as corrupted and retried.',
          codeExample: `import java.security.MessageDigest;
import java.io.*;
import java.nio.file.*;
import java.util.function.BiConsumer;

public class VerifiedUploader {
    private final BiConsumer<String, Double> progressCallback;

    public VerifiedUploader(
            BiConsumer<String, Double> progressCallback) {
        this.progressCallback = progressCallback;
    }

    public UploadResult uploadWithVerification(
            Path filePath, String destination) throws Exception {

        String fileName = filePath.getFileName().toString();
        long totalSize = Files.size(filePath);

        // Step 1: Compute local checksum while uploading
        MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
        long bytesUploaded = 0;
        byte[] buffer = new byte[8192];

        try (InputStream is = Files.newInputStream(filePath);
             DigestInputStream dis =
                 new DigestInputStream(is, sha256)) {

            int bytesRead;
            while ((bytesRead = dis.read(buffer)) != -1) {
                // Upload the chunk to remote
                // sendBytes(destination, buffer, bytesRead);
                bytesUploaded += bytesRead;

                // Report progress
                double percent =
                    (bytesUploaded * 100.0) / totalSize;
                progressCallback.accept(fileName, percent);
            }
        }

        // Step 2: Get local checksum
        String localChecksum = bytesToHex(sha256.digest());
        progressCallback.accept(fileName, 100.0);

        // Step 3: Get remote checksum from server
        String remoteChecksum = getRemoteChecksum(destination);

        // Step 4: Validate
        if (!localChecksum.equals(remoteChecksum)) {
            return UploadResult.failure(filePath,
                "Checksum mismatch! Local: " + localChecksum +
                " Remote: " + remoteChecksum);
        }

        return UploadResult.success(filePath, bytesUploaded, 0);
    }

    private String getRemoteChecksum(String destination) {
        // HTTP HEAD or API call to get server checksum
        return "placeholder-checksum";
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}

// Usage with progress UI:
// VerifiedUploader uploader = new VerifiedUploader(
//     (fileName, percent) -> {
//         System.out.printf("\\r%s: %.1f%%", fileName, percent);
//         updateProgressBar(fileName, percent);
//     }
// );`
        }
      ]
    },
    {
      id: 'error-handling',
      name: 'Error Handling & Monitoring',
      icon: '\u{1F6E1}\uFE0F',
      color: '#ef4444',
      description: 'Circuit breaker for endpoint failures, graceful shutdown, dead letter queue for permanent failures, metrics collection, and logging best practices.',
      diagram: ErrorHandlingDiagram,
      details: [
        {
          name: 'Circuit Breaker Pattern',
          diagram: ErrorHandlingDiagram,
          explanation: 'The circuit breaker prevents the uploader from repeatedly hitting a failing endpoint. When consecutive failures exceed a threshold, the circuit opens and immediately fails all upload attempts without making network calls. After a timeout period, the circuit moves to half-open state, allowing a single test upload. If it succeeds, the circuit closes; if it fails, it opens again. This protects both the client and server during outages.',
          codeExample: `import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

public class UploadCircuitBreaker {
    public enum State { CLOSED, OPEN, HALF_OPEN }

    private final AtomicReference<State> state =
        new AtomicReference<>(State.CLOSED);
    private final AtomicInteger failureCount = new AtomicInteger(0);
    private final AtomicLong lastFailureTime = new AtomicLong(0);

    private final int failureThreshold;
    private final long openTimeoutMs;
    private final int halfOpenMaxAttempts;
    private final AtomicInteger halfOpenAttempts = new AtomicInteger(0);

    public UploadCircuitBreaker(int failureThreshold,
                                 long openTimeoutMs) {
        this.failureThreshold = failureThreshold;
        this.openTimeoutMs = openTimeoutMs;
        this.halfOpenMaxAttempts = 1;
    }

    public boolean allowRequest() {
        State current = state.get();

        if (current == State.CLOSED) {
            return true;
        }

        if (current == State.OPEN) {
            long elapsed = System.currentTimeMillis()
                - lastFailureTime.get();
            if (elapsed > openTimeoutMs) {
                // Transition to half-open
                if (state.compareAndSet(
                        State.OPEN, State.HALF_OPEN)) {
                    halfOpenAttempts.set(0);
                    return true;
                }
            }
            return false;
        }

        // HALF_OPEN: allow limited attempts
        return halfOpenAttempts.incrementAndGet()
            <= halfOpenMaxAttempts;
    }

    public void recordSuccess() {
        if (state.get() == State.HALF_OPEN) {
            // Test succeeded, close the circuit
            state.set(State.CLOSED);
            failureCount.set(0);
            System.out.println("Circuit CLOSED - uploads resumed");
        }
        failureCount.set(0);
    }

    public void recordFailure() {
        lastFailureTime.set(System.currentTimeMillis());

        if (state.get() == State.HALF_OPEN) {
            // Test failed, re-open circuit
            state.set(State.OPEN);
            System.out.println("Circuit OPEN - test upload failed");
            return;
        }

        int failures = failureCount.incrementAndGet();
        if (failures >= failureThreshold) {
            state.set(State.OPEN);
            System.out.printf("Circuit OPEN after %d failures%n",
                failures);
        }
    }

    public State getState() { return state.get(); }
    public int getFailureCount() { return failureCount.get(); }
}`
        },
        {
          name: 'Graceful Shutdown',
          diagram: GracefulShutdownDiagram,
          explanation: 'Graceful shutdown ensures in-flight uploads complete before the service stops. The sequence is: (1) call shutdown() to stop accepting new tasks, (2) await termination for a timeout period, allowing running uploads to finish, (3) if timeout expires, call shutdownNow() to interrupt threads, (4) persist any incomplete upload state so they can resume later. A JVM shutdown hook triggers this process automatically on SIGTERM.',
          codeExample: `import java.util.concurrent.*;
import java.util.List;

public class GracefulUploadShutdown {
    private final ExecutorService uploadPool;
    private final UploadStatusTracker statusTracker;
    private final DeadLetterQueue dlq;
    private volatile boolean shuttingDown = false;

    public GracefulUploadShutdown(ExecutorService uploadPool,
                                   UploadStatusTracker tracker,
                                   DeadLetterQueue dlq) {
        this.uploadPool = uploadPool;
        this.statusTracker = tracker;
        this.dlq = dlq;
        registerShutdownHook();
    }

    private void registerShutdownHook() {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("Shutdown signal received...");
            shutdown();
        }, "upload-shutdown-hook"));
    }

    public void shutdown() {
        if (shuttingDown) return;
        shuttingDown = true;

        System.out.println("Phase 1: Stop accepting new uploads");
        uploadPool.shutdown();

        try {
            System.out.println(
                "Phase 2: Wait for in-flight uploads (30s)");
            boolean terminated = uploadPool.awaitTermination(
                30, TimeUnit.SECONDS);

            if (!terminated) {
                System.out.println(
                    "Phase 3: Force shutdown - interrupting threads");
                List<Runnable> pending = uploadPool.shutdownNow();

                System.out.printf(
                    "Cancelled %d queued tasks%n", pending.size());

                // Move pending tasks to DLQ
                for (Runnable task : pending) {
                    if (task instanceof UploadTask) {
                        dlq.enqueue((UploadTask) task,
                            "Cancelled during shutdown");
                    }
                }

                // Wait a bit more for interrupted tasks
                if (!uploadPool.awaitTermination(
                        5, TimeUnit.SECONDS)) {
                    System.err.println(
                        "WARNING: Some threads did not terminate");
                }
            }
        } catch (InterruptedException e) {
            uploadPool.shutdownNow();
            Thread.currentThread().interrupt();
        }

        // Phase 4: Persist incomplete state
        System.out.println("Phase 4: Persisting incomplete uploads");
        persistIncompleteUploads();

        System.out.println("Shutdown complete.");
    }

    private void persistIncompleteUploads() {
        // Save in-progress uploads to DLQ for later resume
        long incomplete = statusTracker.countByState(
            UploadStatusTracker.UploadState.IN_PROGRESS);
        System.out.printf(
            "Persisted %d incomplete uploads to DLQ%n", incomplete);
    }

    public boolean isShuttingDown() { return shuttingDown; }
}`
        },
        {
          name: 'Dead Letter Queue',
          explanation: 'A dead letter queue (DLQ) captures uploads that have permanently failed after exhausting all retries. This prevents data loss and enables manual investigation and reprocessing. The DLQ stores the original file path, destination, error details, and retry history. An operator can inspect the DLQ, fix issues, and resubmit failed uploads without any data loss.',
          codeExample: `import java.util.concurrent.*;
import java.time.Instant;
import java.util.*;
import java.nio.file.Path;

public class DeadLetterQueue {
    private final ConcurrentLinkedQueue<DLQEntry> entries =
        new ConcurrentLinkedQueue<>();
    private final int maxSize;

    public DeadLetterQueue(int maxSize) {
        this.maxSize = maxSize;
    }

    public void enqueue(UploadTask task, String reason) {
        if (entries.size() >= maxSize) {
            // Remove oldest entry
            entries.poll();
        }
        entries.add(new DLQEntry(
            task.getFilePath(),
            task.getDestination(),
            reason,
            Instant.now()
        ));
        System.out.printf(
            "DLQ: Added %s - %s (queue size: %d)%n",
            task.getFilePath().getFileName(), reason,
            entries.size());
    }

    public List<DLQEntry> getEntries() {
        return new ArrayList<>(entries);
    }

    public int size() {
        return entries.size();
    }

    // Reprocess all DLQ entries
    public List<DLQEntry> drainForReprocessing() {
        List<DLQEntry> batch = new ArrayList<>();
        DLQEntry entry;
        while ((entry = entries.poll()) != null) {
            batch.add(entry);
        }
        return batch;
    }

    public static class DLQEntry {
        private final Path filePath;
        private final String destination;
        private final String failureReason;
        private final Instant failedAt;
        private int reprocessAttempts = 0;

        public DLQEntry(Path filePath, String destination,
                        String reason, Instant failedAt) {
            this.filePath = filePath;
            this.destination = destination;
            this.failureReason = reason;
            this.failedAt = failedAt;
        }

        public Path getFilePath() { return filePath; }
        public String getDestination() { return destination; }
        public String getFailureReason() { return failureReason; }
        public Instant getFailedAt() { return failedAt; }
        public int getReprocessAttempts() {
            return reprocessAttempts;
        }
        public void incrementReprocessAttempts() {
            reprocessAttempts++;
        }
    }
}

// DLQ Reprocessor - runs periodically
public class DLQReprocessor {
    private final DeadLetterQueue dlq;
    private final FileUploadService uploadService;
    private final ScheduledExecutorService scheduler;

    public DLQReprocessor(DeadLetterQueue dlq,
                           FileUploadService uploadService) {
        this.dlq = dlq;
        this.uploadService = uploadService;
        this.scheduler = Executors.newSingleThreadScheduledExecutor();
    }

    public void startPeriodicReprocessing(long intervalMinutes) {
        scheduler.scheduleAtFixedRate(() -> {
            List<DeadLetterQueue.DLQEntry> entries =
                dlq.drainForReprocessing();
            if (!entries.isEmpty()) {
                System.out.printf(
                    "Reprocessing %d DLQ entries%n", entries.size());
                for (DeadLetterQueue.DLQEntry entry : entries) {
                    entry.incrementReprocessAttempts();
                    if (entry.getReprocessAttempts() > 3) {
                        System.err.printf(
                            "Permanently failed: %s%n",
                            entry.getFilePath());
                        continue;
                    }
                    uploadService.submitUpload(
                        entry.getFilePath(),
                        entry.getDestination());
                }
            }
        }, intervalMinutes, intervalMinutes, TimeUnit.MINUTES);
    }
}`
        },
        {
          name: 'Metrics & Logging',
          explanation: 'Comprehensive metrics and structured logging are essential for operating a multithreaded upload service. Key metrics include upload throughput (MB/s), latency percentiles (p50, p95, p99), error rates, queue depth, and active thread count. Structured logging with MDC (Mapped Diagnostic Context) tags each log line with the file name and thread, making it easy to trace a single upload across concurrent log output.',
          codeExample: `import java.util.concurrent.*;
import java.util.concurrent.atomic.*;
import java.util.*;

public class UploadMetrics {
    private final AtomicLong totalUploads = new AtomicLong(0);
    private final AtomicLong successfulUploads = new AtomicLong(0);
    private final AtomicLong failedUploads = new AtomicLong(0);
    private final AtomicLong totalBytesUploaded = new AtomicLong(0);
    private final AtomicLong totalRetries = new AtomicLong(0);

    // Latency tracking (simplified - use HdrHistogram in production)
    private final ConcurrentLinkedQueue<Long> latencies =
        new ConcurrentLinkedQueue<>();

    private final long startTime = System.currentTimeMillis();

    public void recordUpload(boolean success, long bytes,
                              long latencyMs) {
        totalUploads.incrementAndGet();
        if (success) {
            successfulUploads.incrementAndGet();
            totalBytesUploaded.addAndGet(bytes);
        } else {
            failedUploads.incrementAndGet();
        }
        latencies.add(latencyMs);

        // Keep only last 10000 latencies
        while (latencies.size() > 10000) {
            latencies.poll();
        }
    }

    public void recordRetry() {
        totalRetries.incrementAndGet();
    }

    public Map<String, Object> snapshot() {
        long elapsed = System.currentTimeMillis() - startTime;
        double elapsedSec = elapsed / 1000.0;

        List<Long> sortedLatencies = new ArrayList<>(latencies);
        Collections.sort(sortedLatencies);

        Map<String, Object> metrics = new LinkedHashMap<>();
        metrics.put("total_uploads", totalUploads.get());
        metrics.put("successful", successfulUploads.get());
        metrics.put("failed", failedUploads.get());
        metrics.put("total_retries", totalRetries.get());
        metrics.put("throughput_mbps",
            String.format("%.2f",
                totalBytesUploaded.get() / (1024.0 * 1024.0)
                / elapsedSec));
        metrics.put("error_rate",
            String.format("%.2f%%",
                totalUploads.get() > 0
                    ? (failedUploads.get() * 100.0
                       / totalUploads.get())
                    : 0));

        if (!sortedLatencies.isEmpty()) {
            int size = sortedLatencies.size();
            metrics.put("p50_latency_ms",
                sortedLatencies.get(size / 2));
            metrics.put("p95_latency_ms",
                sortedLatencies.get((int)(size * 0.95)));
            metrics.put("p99_latency_ms",
                sortedLatencies.get((int)(size * 0.99)));
        }

        return metrics;
    }

    public String toLogString() {
        Map<String, Object> m = snapshot();
        StringBuilder sb = new StringBuilder();
        sb.append("[UPLOAD METRICS] ");
        m.forEach((k, v) -> sb.append(k).append("=")
            .append(v).append(" "));
        return sb.toString();
    }
}

// Structured logging with MDC for concurrent tracing
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.slf4j.MDC;

/*
public class UploadLogger {
    private static final Logger log =
        LoggerFactory.getLogger(UploadLogger.class);

    public static void logUploadStart(String fileName,
                                       String destination) {
        MDC.put("fileName", fileName);
        MDC.put("thread", Thread.currentThread().getName());
        log.info("Upload started to {}", destination);
    }

    public static void logUploadProgress(String fileName,
                                          double percent) {
        MDC.put("fileName", fileName);
        MDC.put("thread", Thread.currentThread().getName());
        log.debug("Progress: {:.1f}%", percent);
    }

    public static void logUploadComplete(String fileName,
                                          long bytes,
                                          long durationMs) {
        MDC.put("fileName", fileName);
        MDC.put("thread", Thread.currentThread().getName());
        log.info("Upload completed: {} bytes in {}ms",
            bytes, durationMs);
        MDC.clear();
    }

    public static void logUploadFailed(String fileName,
                                        String error,
                                        int retryCount) {
        MDC.put("fileName", fileName);
        MDC.put("thread", Thread.currentThread().getName());
        log.error("Upload failed (retry {}): {}",
            retryCount, error);
        MDC.clear();
    }
}
*/`
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
      { name: 'System Design', icon: '\u{1F3D7}\uFE0F', page: 'System Design' },
      { name: 'File Uploader', icon: '\u{1F4C1}', page: 'File Uploader' }
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
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #111827, #1a2332, #111827)',
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
    background: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
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
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Multithreaded File Uploader</h1>
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
          &larr; Back to System Design
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={TOPIC_COLORS}
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
        primaryColor={TOPIC_COLORS.primary}
      />


      {/* Architecture Overview */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid #374151'
        }}>
          <h2 style={{ color: '#60a5fa', margin: '0 0 1rem 0', fontSize: '1.25rem' }}>
            Multithreaded File Uploader Architecture Overview
          </h2>
          <FileUploaderArchitectureDiagram onClickConcept={(i) => { setSelectedConceptIndex(i); setSelectedDetailIndex(0); }} />
          <p style={{ color: '#9ca3af', margin: '1rem 0 0 0', textAlign: 'center', fontSize: '0.9rem' }}>
            A producer-consumer architecture with bounded queues and configurable thread pools for handling high-volume concurrent file uploads efficiently.
          </p>
        </div>

        {/* Full System Diagram */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid #374151'
        }}>
          <h2 style={{ color: '#60a5fa', margin: '0 0 1rem 0', fontSize: '1.25rem' }}>
            Full System Architecture &mdash; All Layers &amp; Data Flow
          </h2>
          <FullSystemDiagram onClickConcept={(i) => { setSelectedConceptIndex(i); setSelectedDetailIndex(0); }} />
          <p style={{ color: '#9ca3af', margin: '1rem 0 0 0', textAlign: 'center', fontSize: '0.9rem' }}>
            End-to-end view showing all five architectural layers: Client, Execution Engine, Network &amp; Storage, Error Handling &amp; Observability, and the complete data-flow pipeline.
          </p>
        </div>
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
              <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.9)' }}>
                <CompletionCheckbox problemId={`FileUploader-${concept.id}`} />
              </div>
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
              border: `1px solid ${selectedConcept.color}40`,
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={TOPIC_COLORS}
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
                >&larr;</button>
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
                >&rarr;</button>
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
                >X</button>
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

export default FileUploader

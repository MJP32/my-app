/**
 * Google Cloud Platform (GCP) Page
 * Modal-based navigation with concepts and detail tabs
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const GCP_COLORS = {
  primary: '#4285F4',           // GCP blue
  primaryHover: '#5a9df7',      // Lighter blue on hover
  bg: 'rgba(66, 133, 244, 0.1)', // Background with transparency
  border: 'rgba(66, 133, 244, 0.3)', // Border color
  arrow: '#4285F4',             // Arrow/indicator color
  hoverBg: 'rgba(66, 133, 244, 0.2)', // Hover background
  topicBg: 'rgba(66, 133, 244, 0.2)'  // Topic card background
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

// GKE Architecture Diagram
const GKEDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-gke" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4285F4" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      GKE Architecture
    </text>

    {/* Control Plane */}
    <rect x="250" y="50" width="300" height="60" rx="8" fill="#4285F4" stroke="#5a9df7" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">GKE Control Plane</text>
    <text x="400" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="10">(Managed by Google)</text>

    {/* Node Pool */}
    <rect x="50" y="160" width="700" height="140" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="400" y="180" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Node Pool</text>

    {/* Worker Nodes */}
    <rect x="80" y="200" width="140" height="80" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2"/>
    <text x="150" y="225" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Worker Node 1</text>
    <text x="150" y="245" textAnchor="middle" fill="#94a3b8" fontSize="9">Pod 1</text>
    <text x="150" y="260" textAnchor="middle" fill="#94a3b8" fontSize="9">Pod 2</text>
    <text x="150" y="275" textAnchor="middle" fill="#94a3b8" fontSize="9">Pod 3</text>

    <rect x="250" y="200" width="140" height="80" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2"/>
    <text x="320" y="225" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Worker Node 2</text>
    <text x="320" y="245" textAnchor="middle" fill="#94a3b8" fontSize="9">Pod 4</text>
    <text x="320" y="260" textAnchor="middle" fill="#94a3b8" fontSize="9">Pod 5</text>
    <text x="320" y="275" textAnchor="middle" fill="#94a3b8" fontSize="9">Pod 6</text>

    <rect x="420" y="200" width="140" height="80" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2"/>
    <text x="490" y="225" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Worker Node 3</text>
    <text x="490" y="245" textAnchor="middle" fill="#94a3b8" fontSize="9">Pod 7</text>
    <text x="490" y="260" textAnchor="middle" fill="#94a3b8" fontSize="9">Pod 8</text>

    <rect x="590" y="200" width="140" height="80" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2"/>
    <text x="660" y="225" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Worker Node N</text>
    <text x="660" y="245" textAnchor="middle" fill="#94a3b8" fontSize="9">Pod ...</text>
    <text x="660" y="260" textAnchor="middle" fill="#94a3b8" fontSize="9">Auto-scaling</text>

    {/* Arrows from Control Plane */}
    <line x1="400" y1="110" x2="150" y2="195" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-gke)"/>
    <line x1="400" y1="110" x2="320" y2="195" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-gke)"/>
    <line x1="400" y1="110" x2="490" y2="195" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-gke)"/>
    <line x1="400" y1="110" x2="660" y2="195" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-gke)"/>
  </svg>
)

// BigQuery Architecture Diagram
const BigQueryDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-bq" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4285F4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      BigQuery Data Pipeline
    </text>

    {/* Data Sources */}
    <rect x="30" y="60" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="90" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Cloud Storage</text>
    <text x="90" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="9">(CSV, JSON)</text>

    <rect x="30" y="130" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="90" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Pub/Sub</text>
    <text x="90" y="165" textAnchor="middle" fill="#e2e8f0" fontSize="9">(Streaming)</text>

    <rect x="30" y="200" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="90" y="220" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Dataflow</text>
    <text x="90" y="235" textAnchor="middle" fill="#e2e8f0" fontSize="9">(ETL)</text>

    {/* BigQuery Core */}
    <rect x="250" y="100" width="180" height="100" rx="8" fill="#4285F4" stroke="#5a9df7" strokeWidth="2"/>
    <text x="340" y="130" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">BigQuery</text>
    <text x="340" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="9">Petabyte-Scale</text>
    <text x="340" y="165" textAnchor="middle" fill="#e2e8f0" fontSize="9">SQL Analytics</text>
    <text x="340" y="180" textAnchor="middle" fill="#e2e8f0" fontSize="9">Built-in ML</text>

    {/* Analysis Tools */}
    <rect x="530" y="60" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="590" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BI Tools</text>
    <text x="590" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="9">(Looker, Tableau)</text>

    <rect x="530" y="130" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="590" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BigQuery ML</text>
    <text x="590" y="165" textAnchor="middle" fill="#e2e8f0" fontSize="9">(ML Models)</text>

    <rect x="530" y="200" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="590" y="220" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Data Studio</text>
    <text x="590" y="235" textAnchor="middle" fill="#e2e8f0" fontSize="9">(Dashboards)</text>

    {/* Arrows */}
    <line x1="150" y1="85" x2="245" y2="120" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-bq)"/>
    <line x1="150" y1="155" x2="245" y2="150" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-bq)"/>
    <line x1="150" y1="225" x2="245" y2="180" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-bq)"/>

    <line x1="430" y1="120" x2="525" y2="85" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-bq)"/>
    <line x1="430" y1="150" x2="525" y2="155" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-bq)"/>
    <line x1="430" y1="180" x2="525" y2="225" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-bq)"/>
  </svg>
)

// Cloud Run Flow Diagram
const CloudRunDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-run" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4285F4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Cloud Run Request Flow
    </text>

    {/* Request */}
    <rect x="50" y="80" width="100" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="100" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">HTTP Request</text>
    <text x="100" y="115" textAnchor="middle" fill="#e2e8f0" fontSize="9">(Incoming)</text>

    {/* Cloud Run Service */}
    <rect x="220" y="60" width="140" height="90" rx="8" fill="#4285F4" stroke="#5a9df7" strokeWidth="2"/>
    <text x="290" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Cloud Run</text>
    <text x="290" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="9">Auto-Scale</text>
    <text x="290" y="120" textAnchor="middle" fill="#e2e8f0" fontSize="9">Container Instance</text>
    <text x="290" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="9">0 → N replicas</text>

    {/* Processing */}
    <rect x="430" y="80" width="100" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="480" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Processing</text>
    <text x="480" y="115" textAnchor="middle" fill="#e2e8f0" fontSize="9">(Your Code)</text>

    {/* Response */}
    <rect x="600" y="80" width="100" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="650" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Response</text>
    <text x="650" y="115" textAnchor="middle" fill="#e2e8f0" fontSize="9">(JSON/HTML)</text>

    {/* Arrows */}
    <line x1="150" y1="105" x2="215" y2="105" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-run)"/>
    <line x1="360" y1="105" x2="425" y2="105" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-run)"/>
    <line x1="530" y1="105" x2="595" y2="105" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-run)"/>

    {/* Labels */}
    <text x="182" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">route</text>
    <text x="392" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">execute</text>
    <text x="562" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">return</text>

    {/* Scale to Zero Note */}
    <text x="290" y="170" textAnchor="middle" fill="#22c55e" fontSize="9" fontStyle="italic">
      Scales to zero when idle (save costs)
    </text>
  </svg>
)

// Compute Services Comparison
const ComputeComparisonDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      GCP Compute Services Comparison
    </text>

    {/* Compute Engine */}
    <rect x="50" y="60" width="160" height="180" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="130" y="85" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Compute Engine</text>
    <text x="130" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">• Full VM control</text>
    <text x="130" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">• Any OS</text>
    <text x="130" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">• Manual scaling</text>
    <text x="130" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">• Persistent storage</text>
    <text x="130" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">• Best for: Monoliths</text>
    <text x="130" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">• Best for: Legacy apps</text>
    <text x="130" y="225" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">Most Control</text>

    {/* GKE */}
    <rect x="240" y="60" width="160" height="180" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="320" y="85" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">GKE</text>
    <text x="320" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">• Container orchestration</text>
    <text x="320" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">• Kubernetes</text>
    <text x="320" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">• Auto-scaling pods</text>
    <text x="320" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">• Multi-container</text>
    <text x="320" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">• Best for: Microservices</text>
    <text x="320" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">• Best for: Complex apps</text>
    <text x="320" y="225" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Balanced</text>

    {/* Cloud Run */}
    <rect x="430" y="60" width="160" height="180" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="510" y="85" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Cloud Run</text>
    <text x="510" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">• Fully serverless</text>
    <text x="510" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">• Container-based</text>
    <text x="510" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">• Auto-scale to zero</text>
    <text x="510" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">• Pay per request</text>
    <text x="510" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">• Best for: Stateless APIs</text>
    <text x="510" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">• Best for: Web apps</text>
    <text x="510" y="225" textAnchor="middle" fill="#8b5cf6" fontSize="9" fontWeight="bold">Least Management</text>

    {/* Cloud Functions */}
    <rect x="620" y="60" width="160" height="180" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="700" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Cloud Functions</text>
    <text x="700" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">• Event-driven</text>
    <text x="700" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">• Function as a Service</text>
    <text x="700" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">• Auto-scale</text>
    <text x="700" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">• Pay per execution</text>
    <text x="700" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">• Best for: Webhooks</text>
    <text x="700" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">• Best for: Event handlers</text>
    <text x="700" y="225" textAnchor="middle" fill="#ec4899" fontSize="9" fontWeight="bold">Highest Abstraction</text>
  </svg>
)

// Storage Classes Diagram
const StorageDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Cloud Storage Classes
    </text>

    {/* Standard */}
    <rect x="50" y="60" width="150" height="150" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="125" y="85" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Standard</text>
    <text x="125" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">Hot data</text>
    <text x="125" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10">Frequent access</text>
    <text x="125" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">$0.020/GB/month</text>
    <text x="125" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">No minimum storage</text>
    <text x="125" y="190" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Highest Cost</text>

    {/* Nearline */}
    <rect x="230" y="60" width="150" height="150" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="305" y="85" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Nearline</text>
    <text x="305" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">Monthly access</text>
    <text x="305" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10">Backups</text>
    <text x="305" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">$0.010/GB/month</text>
    <text x="305" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">30-day minimum</text>
    <text x="305" y="190" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Medium Cost</text>

    {/* Coldline */}
    <rect x="410" y="60" width="150" height="150" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="485" y="85" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Coldline</text>
    <text x="485" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">Quarterly access</text>
    <text x="485" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10">Disaster recovery</text>
    <text x="485" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">$0.004/GB/month</text>
    <text x="485" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">90-day minimum</text>
    <text x="485" y="190" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Low Cost</text>

    {/* Archive */}
    <rect x="590" y="60" width="150" height="150" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="665" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Archive</text>
    <text x="665" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">Yearly access</text>
    <text x="665" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10">Long-term archive</text>
    <text x="665" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">$0.0012/GB/month</text>
    <text x="665" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">365-day minimum</text>
    <text x="665" y="190" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Lowest Cost</text>
  </svg>
)

// Pub/Sub Architecture
const PubSubDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-pubsub" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4285F4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Pub/Sub Message Flow
    </text>

    {/* Publishers */}
    <rect x="50" y="60" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="110" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Publisher 1</text>
    <text x="110" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="9">(App/Service)</text>

    <rect x="50" y="130" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="110" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Publisher 2</text>
    <text x="110" y="165" textAnchor="middle" fill="#e2e8f0" fontSize="9">(IoT Device)</text>

    <rect x="50" y="200" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="110" y="220" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Publisher 3</text>
    <text x="110" y="235" textAnchor="middle" fill="#e2e8f0" fontSize="9">(Stream)</text>

    {/* Topic */}
    <rect x="280" y="120" width="140" height="60" rx="8" fill="#4285F4" stroke="#5a9df7" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Pub/Sub Topic</text>
    <text x="350" y="165" textAnchor="middle" fill="#e2e8f0" fontSize="10">(Message Queue)</text>

    {/* Subscribers */}
    <rect x="530" y="40" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="590" y="60" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Subscriber 1</text>
    <text x="590" y="75" textAnchor="middle" fill="#e2e8f0" fontSize="9">(Analytics)</text>

    <rect x="530" y="105" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="590" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Subscriber 2</text>
    <text x="590" y="140" textAnchor="middle" fill="#e2e8f0" fontSize="9">(Processing)</text>

    <rect x="530" y="170" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="590" y="190" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Subscriber 3</text>
    <text x="590" y="205" textAnchor="middle" fill="#e2e8f0" fontSize="9">(Storage)</text>

    <rect x="530" y="235" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="590" y="255" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Subscriber N</text>
    <text x="590" y="270" textAnchor="middle" fill="#e2e8f0" fontSize="9">(Dashboard)</text>

    {/* Arrows from Publishers to Topic */}
    <line x1="170" y1="85" x2="275" y2="135" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-pubsub)"/>
    <line x1="170" y1="155" x2="275" y2="150" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-pubsub)"/>
    <line x1="170" y1="225" x2="275" y2="165" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-pubsub)"/>

    {/* Arrows from Topic to Subscribers */}
    <line x1="420" y1="135" x2="525" y2="65" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-pubsub)"/>
    <line x1="420" y1="145" x2="525" y2="130" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-pubsub)"/>
    <line x1="420" y1="155" x2="525" y2="195" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-pubsub)"/>
    <line x1="420" y1="165" x2="525" y2="260" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-pubsub)"/>

    {/* Labels */}
    <text x="220" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">publish</text>
    <text x="470" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">subscribe</text>
  </svg>
)

// IAM Structure
const IAMDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-iam" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4285F4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      IAM Access Control Model
    </text>

    {/* Who (Identity) */}
    <rect x="50" y="70" width="160" height="140" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="130" y="95" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">WHO</text>
    <text x="130" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">Google Account</text>
    <text x="130" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">Service Account</text>
    <text x="130" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Google Group</text>
    <text x="130" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">Cloud Identity</text>
    <text x="130" y="195" textAnchor="middle" fill="#4ade80" fontSize="9" fontStyle="italic">(Identity)</text>

    {/* Can Do What (Role) */}
    <rect x="270" y="70" width="160" height="140" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="95" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">CAN DO WHAT</text>
    <text x="350" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">Predefined Roles</text>
    <text x="350" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">Custom Roles</text>
    <text x="350" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Basic Roles</text>
    <text x="350" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">Permissions</text>
    <text x="350" y="195" textAnchor="middle" fill="#60a5fa" fontSize="9" fontStyle="italic">(Role)</text>

    {/* On Which Resource */}
    <rect x="490" y="70" width="160" height="140" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="570" y="95" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">ON WHICH</text>
    <text x="570" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">Organization</text>
    <text x="570" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">Folder</text>
    <text x="570" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Project</text>
    <text x="570" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">Resource</text>
    <text x="570" y="195" textAnchor="middle" fill="#fbbf24" fontSize="9" fontStyle="italic">(Resource)</text>

    {/* Arrows */}
    <line x1="210" y1="140" x2="265" y2="140" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-iam)"/>
    <line x1="430" y1="140" x2="485" y2="140" stroke="#4285F4" strokeWidth="2" markerEnd="url(#arrow-iam)"/>

    {/* Formula */}
    <text x="400" y="245" textAnchor="middle" fill="#4285F4" fontSize="11" fontWeight="bold">
      Policy = Identity + Role + Resource
    </text>
  </svg>
)

// Database Comparison
const DatabaseDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      GCP Database Services
    </text>

    {/* Cloud SQL */}
    <rect x="50" y="60" width="150" height="200" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="85" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Cloud SQL</text>
    <text x="125" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">Relational</text>
    <text x="125" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">• MySQL</text>
    <text x="125" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">• PostgreSQL</text>
    <text x="125" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">• SQL Server</text>
    <text x="125" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">Regional</text>
    <text x="125" y="200" textAnchor="middle" fill="#94a3b8" fontSize="9">Up to 624GB RAM</text>
    <text x="125" y="220" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">Web Apps, CRM</text>
    <text x="125" y="240" textAnchor="middle" fill="#60a5fa" fontSize="8" fontStyle="italic">Single-Region</text>

    {/* Cloud Spanner */}
    <rect x="230" y="60" width="150" height="200" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="305" y="85" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Cloud Spanner</text>
    <text x="305" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">Global Relational</text>
    <text x="305" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">• ACID transactions</text>
    <text x="305" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">• Strong consistency</text>
    <text x="305" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">• Horizontal scale</text>
    <text x="305" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">Multi-region</text>
    <text x="305" y="200" textAnchor="middle" fill="#94a3b8" fontSize="9">99.999% SLA</text>
    <text x="305" y="220" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">Financial, Retail</text>
    <text x="305" y="240" textAnchor="middle" fill="#4ade80" fontSize="8" fontStyle="italic">Global Scale</text>

    {/* Firestore */}
    <rect x="410" y="60" width="150" height="200" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="485" y="85" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Firestore</text>
    <text x="485" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">NoSQL Document</text>
    <text x="485" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">• Real-time sync</text>
    <text x="485" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">• Offline support</text>
    <text x="485" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">• Mobile SDKs</text>
    <text x="485" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">Auto-scaling</text>
    <text x="485" y="200" textAnchor="middle" fill="#94a3b8" fontSize="9">Sub-second latency</text>
    <text x="485" y="220" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">Mobile, Gaming</text>
    <text x="485" y="240" textAnchor="middle" fill="#fbbf24" fontSize="8" fontStyle="italic">Serverless</text>

    {/* Memorystore */}
    <rect x="590" y="60" width="150" height="200" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="665" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Memorystore</text>
    <text x="665" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">In-Memory Cache</text>
    <text x="665" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">• Redis</text>
    <text x="665" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">• Memcached</text>
    <text x="665" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">• Sub-ms latency</text>
    <text x="665" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">High availability</text>
    <text x="665" y="200" textAnchor="middle" fill="#94a3b8" fontSize="9">99.9% SLA</text>
    <text x="665" y="220" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">Caching, Sessions</text>
    <text x="665" y="240" textAnchor="middle" fill="#a78bfa" fontSize="8" fontStyle="italic">Ultra-Fast</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function GCP({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'compute',
      name: 'Compute Services',
      icon: '🖥️',
      color: '#3b82f6',
      description: 'Virtual machines, containers, and serverless compute options from full control to fully managed.',
      details: [
        {
          name: 'Compute Engine',
          diagram: ComputeComparisonDiagram,
          explanation: 'Compute Engine provides scalable, high-performance virtual machines running in Google\'s data centers. Create custom machine types to optimize for your specific needs with precise control over vCPU and memory. Features live migration of VMs with zero downtime, automatic restart on host maintenance, and preemptible VMs at 80% discount. Supports any operating system with persistent disk storage and consistent performance.',
          codeExample: `# Create a VM instance with custom machine type
gcloud compute instances create my-instance \\
  --machine-type=n1-standard-4 \\
  --zone=us-central1-a \\
  --image-family=debian-11 \\
  --image-project=debian-cloud \\
  --boot-disk-size=20GB \\
  --tags=http-server,https-server

# Create a preemptible instance (80% cost savings)
gcloud compute instances create preemptible-vm \\
  --machine-type=n1-standard-2 \\
  --preemptible \\
  --zone=us-central1-a

# Custom machine type (4 vCPU, 8GB RAM)
gcloud compute instances create custom-vm \\
  --custom-cpu=4 \\
  --custom-memory=8GB \\
  --zone=us-central1-a`
        },
        {
          name: 'GKE (Kubernetes)',
          diagram: GKEDiagram,
          explanation: 'Google Kubernetes Engine is a managed Kubernetes service built on Google\'s 15+ years of container experience. Autopilot mode handles all cluster management including node provisioning, scaling, and security. Features auto-scaling, auto-repair, workload identity for secure service-to-service authentication, and multi-cluster mesh for advanced traffic management. Integrated with Cloud Monitoring, Logging, and Binary Authorization.',
          codeExample: `# Create an Autopilot cluster (fully managed)
gcloud container clusters create-auto my-cluster \\
  --region=us-central1

# Create a standard GKE cluster
gcloud container clusters create my-cluster \\
  --zone=us-central1-a \\
  --num-nodes=3 \\
  --machine-type=n1-standard-2 \\
  --enable-autoscaling \\
  --min-nodes=1 \\
  --max-nodes=10

# Deploy an application
kubectl create deployment hello-app \\
  --image=gcr.io/google-samples/hello-app:1.0

# Expose the deployment
kubectl expose deployment hello-app \\
  --type=LoadBalancer \\
  --port=80 \\
  --target-port=8080`
        },
        {
          name: 'Cloud Run',
          diagram: CloudRunDiagram,
          explanation: 'Cloud Run is a fully managed compute platform for deploying containerized applications that scale automatically from zero to thousands of instances. Built on Knative open standard, supports any language, library, or binary. Features automatic HTTPS, custom domains, WebSocket support, and traffic splitting for blue/green deployments. CPU is only allocated during request processing, making it cost-effective for variable workloads.',
          codeExample: `# Deploy a container to Cloud Run
gcloud run deploy my-service \\
  --image=gcr.io/my-project/my-image \\
  --platform=managed \\
  --region=us-central1 \\
  --allow-unauthenticated

# Deploy with environment variables
gcloud run deploy api-service \\
  --image=gcr.io/my-project/api \\
  --set-env-vars="DATABASE_URL=postgres://..." \\
  --memory=512Mi \\
  --timeout=60s \\
  --max-instances=100

# Traffic splitting (blue/green deployment)
gcloud run services update-traffic my-service \\
  --to-revisions=my-service-v2=50,my-service-v1=50 \\
  --region=us-central1`
        },
        {
          name: 'Cloud Functions',
          diagram: CloudRunDiagram,
          explanation: 'Cloud Functions is an event-driven serverless compute platform that executes code in response to events without managing servers. Supports Node.js, Python, Go, Java, .NET, Ruby, and PHP. Automatic scaling from zero, built-in security, and seamless integration with Google services. Second-generation functions offer longer timeouts (up to 60 minutes), larger instances (up to 16GB RAM), and Eventarc for advanced event routing.',
          codeExample: `# Deploy a Cloud Function (Node.js)
gcloud functions deploy helloWorld \\
  --runtime=nodejs20 \\
  --trigger-http \\
  --allow-unauthenticated \\
  --entry-point=helloWorld

# Deploy with Pub/Sub trigger
gcloud functions deploy processMessage \\
  --runtime=python39 \\
  --trigger-topic=my-topic \\
  --entry-point=process_message

# Example function code (Node.js)
exports.helloWorld = (req, res) => {
  const name = req.query.name || req.body.name || 'World';
  res.send(\`Hello, \${name}!\`);
};

# Example Pub/Sub function (Python)
def process_message(event, context):
    import base64
    message = base64.b64decode(event['data']).decode('utf-8')
    print(f'Processing: {message}')
    # Process the message
    return 'OK'`
        },
        {
          name: 'Cloud Tasks',
          explanation: 'Cloud Tasks manages distributed task queues for asynchronous work execution. Create tasks, add them to a queue, and configure dispatch to Cloud Functions, App Engine, Cloud Run, or any HTTP endpoint. Features rate limiting, retry logic with exponential backoff, task scheduling for future execution, and queue management. Ideal for decoupling components and handling background processing.',
          codeExample: `# Create a task queue
gcloud tasks queues create my-queue \\
  --max-dispatches-per-second=100 \\
  --max-concurrent-dispatches=10

# Create a task (Python)
from google.cloud import tasks_v2

client = tasks_v2.CloudTasksClient()
parent = client.queue_path('my-project', 'us-central1', 'my-queue')

task = {
    'http_request': {
        'http_method': tasks_v2.HttpMethod.POST,
        'url': 'https://example.com/process',
        'headers': {'Content-Type': 'application/json'},
        'body': '{"key": "value"}'.encode()
    }
}

# Schedule task for 1 hour from now
import datetime
schedule_time = datetime.datetime.now() + datetime.timedelta(hours=1)
task['schedule_time'] = schedule_time

response = client.create_task(parent=parent, task=task)
print(f'Created task: {response.name}')`
        }
      ]
    },
    {
      id: 'storage',
      name: 'Storage',
      icon: '📦',
      color: '#22c55e',
      description: 'Object storage with multiple storage classes optimized for different access patterns and costs.',
      details: [
        {
          name: 'Cloud Storage Classes',
          diagram: StorageDiagram,
          explanation: 'Cloud Storage offers unified object storage with 99.999999999% durability across four storage classes. Standard for hot data with frequent access ($0.020/GB/month), Nearline for monthly access like backups ($0.010/GB/month, 30-day minimum), Coldline for quarterly access and disaster recovery ($0.004/GB/month, 90-day minimum), and Archive for yearly access and long-term storage ($0.0012/GB/month, 365-day minimum). All classes provide the same API, instant retrieval, and automatic encryption at rest.',
          codeExample: `# Upload to Standard storage
gsutil cp myfile.txt gs://my-bucket/

# Set storage class to Nearline
gsutil -m rewrite -s NEARLINE gs://my-bucket/*

# Create bucket with lifecycle policy
gsutil mb -c STANDARD -l US gs://my-bucket
cat <<EOF > lifecycle.json
{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "SetStorageClass", "storageClass": "NEARLINE"},
        "condition": {"age": 30}
      },
      {
        "action": {"type": "SetStorageClass", "storageClass": "COLDLINE"},
        "condition": {"age": 90}
      },
      {
        "action": {"type": "SetStorageClass", "storageClass": "ARCHIVE"},
        "condition": {"age": 365}
      }
    ]
  }
}
EOF
gsutil lifecycle set lifecycle.json gs://my-bucket`
        },
        {
          name: 'Lifecycle Management',
          explanation: 'Automate object management with lifecycle policies that transition objects between storage classes or delete them based on age, creation date, or number of newer versions. Configure actions like SetStorageClass to move objects from Standard to Nearline after 30 days, or Delete to remove old objects. Supports conditions based on age, createdBefore, numNewerVersions, and custom time. Policies are evaluated daily and applied automatically.',
          codeExample: `# Advanced lifecycle policy with versioning
{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "SetStorageClass", "storageClass": "NEARLINE"},
        "condition": {
          "age": 30,
          "matchesPrefix": ["logs/", "backups/"]
        }
      },
      {
        "action": {"type": "Delete"},
        "condition": {
          "age": 365,
          "matchesPrefix": ["temp/"]
        }
      },
      {
        "action": {"type": "Delete"},
        "condition": {
          "numNewerVersions": 3,
          "isLive": false
        }
      }
    ]
  }
}

# Apply lifecycle policy
gsutil lifecycle set lifecycle.json gs://my-bucket

# View current lifecycle configuration
gsutil lifecycle get gs://my-bucket`
        },
        {
          name: 'Versioning & Access Control',
          explanation: 'Cloud Storage supports object versioning to protect against accidental deletion or modification. Enable versioning at the bucket level to maintain multiple versions of each object. Use retention policies to prevent deletion before a specified time, and bucket locks to make retention policies immutable. Control access with uniform (bucket-level) or fine-grained (object-level) ACLs. Integrate with IAM for role-based access control.',
          codeExample: `# Enable versioning
gsutil versioning set on gs://my-bucket

# Set retention policy (30 days)
gsutil retention set 30d gs://my-bucket

# Lock retention policy (irreversible!)
gsutil retention lock gs://my-bucket

# Set bucket-level IAM policy
gsutil iam ch user:alice@example.com:objectViewer gs://my-bucket

# Make object publicly readable
gsutil acl ch -u AllUsers:R gs://my-bucket/public-file.txt

# Set uniform bucket-level access
gsutil uniformbucketlevelaccess set on gs://my-bucket

# Configure CORS
gsutil cors set cors.json gs://my-bucket`
        }
      ]
    },
    {
      id: 'database',
      name: 'Database Services',
      icon: '🗄️',
      color: '#f59e0b',
      description: 'Managed database services from traditional SQL to global-scale distributed databases and in-memory caching.',
      details: [
        {
          name: 'Cloud SQL',
          diagram: DatabaseDiagram,
          explanation: 'Cloud SQL is a fully managed relational database service for MySQL, PostgreSQL, and SQL Server. Automated backups with point-in-time recovery, replication with read replicas for read scaling, and automated encryption at rest and in transit. Supports up to 96 cores and 624GB RAM per instance. Features automatic storage increases, maintenance windows, and high availability with automatic failover. Integrates with App Engine, Compute Engine, GKE, and private VPC networks.',
          codeExample: `# Create a Cloud SQL instance
gcloud sql instances create my-instance \\
  --database-version=POSTGRES_14 \\
  --tier=db-n1-standard-2 \\
  --region=us-central1 \\
  --backup \\
  --backup-start-time=03:00 \\
  --enable-bin-log

# Create a database
gcloud sql databases create mydb --instance=my-instance

# Create a user
gcloud sql users create myuser \\
  --instance=my-instance \\
  --password=mypassword

# Connect to instance
gcloud sql connect my-instance --user=myuser --database=mydb

# Create read replica
gcloud sql instances create my-replica \\
  --master-instance-name=my-instance \\
  --tier=db-n1-standard-1 \\
  --region=us-east1`
        },
        {
          name: 'Cloud Spanner',
          explanation: 'Cloud Spanner is Google\'s horizontally scalable, globally distributed relational database with strong consistency and 99.999% availability SLA. Combines the benefits of relational structure with non-relational horizontal scale. Supports ACID transactions across regions, external consistency (linearizability), and automatic sharding. SQL interface with query optimizer and secondary indexes. Ideal for mission-critical applications requiring global scale like financial systems, retail inventory, and supply chain management.',
          codeExample: `# Create a Spanner instance
gcloud spanner instances create my-instance \\
  --config=regional-us-central1 \\
  --description="My Spanner Instance" \\
  --nodes=1

# Create a database
gcloud spanner databases create mydb \\
  --instance=my-instance \\
  --ddl='CREATE TABLE Users (
    UserId INT64 NOT NULL,
    UserName STRING(100),
    Email STRING(255),
    CreatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true)
  ) PRIMARY KEY (UserId)'

# Insert data with strong consistency
from google.cloud import spanner

client = spanner.Client()
instance = client.instance('my-instance')
database = instance.database('mydb')

def insert_user(transaction):
    transaction.execute_update(
        "INSERT INTO Users (UserId, UserName, Email) "
        "VALUES (@user_id, @name, @email)",
        params={'user_id': 1, 'name': 'Alice', 'email': 'alice@example.com'},
        param_types={'user_id': spanner.param_types.INT64,
                     'name': spanner.param_types.STRING,
                     'email': spanner.param_types.STRING}
    )

database.run_in_transaction(insert_user)`
        },
        {
          name: 'Firestore',
          diagram: DatabaseDiagram,
          explanation: 'Firestore is a NoSQL document database with real-time synchronization and offline support for mobile and web apps. Documents organized in collections with automatic indexing for queries. Features live synchronization with client SDKs that update in real-time, offline persistence that queues writes when disconnected, and ACID transactions across documents. Strong consistency in single regions, eventual consistency in multi-region. Automatic scaling with no capacity planning needed.',
          codeExample: `// Initialize Firestore (JavaScript)
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc,
         onSnapshot, query, where } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add a document
const docRef = await addDoc(collection(db, 'users'), {
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  createdAt: new Date()
});

// Real-time listener
const q = query(collection(db, 'users'), where('age', '>', 25));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      console.log('New user:', change.doc.data());
    }
    if (change.type === 'modified') {
      console.log('Modified user:', change.doc.data());
    }
  });
});

// Transaction
await runTransaction(db, async (transaction) => {
  const userDoc = doc(db, 'users', userId);
  const user = await transaction.get(userDoc);

  if (user.data().balance >= 100) {
    transaction.update(userDoc, { balance: user.data().balance - 100 });
    return true;
  }
  throw new Error('Insufficient balance');
});`
        },
        {
          name: 'Memorystore',
          explanation: 'Memorystore provides fully managed Redis and Memcached for sub-millisecond data access and caching. Redis supports persistence with RDB snapshots and AOF (Append-Only File), high availability with automatic failover (99.9% SLA), and import/export for data migration. Supports Redis 6.x with modules like RedisJSON, RedisBloom, RedisTimeSeries, and RedisGraph. VPC peering for private connectivity. Ideal for session management, gaming leaderboards, real-time analytics, and application caching.',
          codeExample: `# Create a Redis instance
gcloud redis instances create my-cache \\
  --size=1 \\
  --region=us-central1 \\
  --tier=standard \\
  --redis-version=redis_6_x

# Connect to Redis from GKE or Compute Engine
# Python example using redis-py
import redis

# Connect to Memorystore Redis
r = redis.Redis(
    host='10.0.0.3',  # Memorystore instance IP
    port=6379,
    decode_responses=True
)

# Set cache with expiration
r.setex('user:1000', 3600, 'Alice')  # Expire in 1 hour

# Get cached value
user = r.get('user:1000')

# Use Redis as session store
r.hset('session:abc123', mapping={
    'user_id': '1000',
    'name': 'Alice',
    'logged_in': 'true'
})

# Leaderboard with sorted sets
r.zadd('game:scores', {'player1': 1500, 'player2': 1200})
top_players = r.zrevrange('game:scores', 0, 9, withscores=True)

# Pub/Sub for real-time updates
pubsub = r.pubsub()
pubsub.subscribe('notifications')
for message in pubsub.listen():
    print(message)`
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics & Big Data',
      icon: '📊',
      color: '#8b5cf6',
      description: 'Serverless data analytics, stream and batch processing, and workflow orchestration at petabyte scale.',
      details: [
        {
          name: 'BigQuery',
          diagram: BigQueryDiagram,
          explanation: 'BigQuery is Google\'s flagship serverless data warehouse that can scan terabytes in seconds and petabytes in minutes. SQL-based analysis with built-in machine learning functions (BigQuery ML) for creating and training models using SQL. Features streaming inserts for real-time analytics, federated queries to query external data sources (Cloud Storage, Bigtable, Spanner), and geospatial analysis with GIS functions. Columnar storage with automatic compression. Pay only for queries and storage, no infrastructure to manage.',
          codeExample: `-- Create a table from query results
CREATE TABLE my_dataset.user_stats AS
SELECT
  user_id,
  COUNT(*) as total_orders,
  SUM(amount) as total_spent,
  AVG(amount) as avg_order_value
FROM my_dataset.orders
WHERE order_date >= '2024-01-01'
GROUP BY user_id;

-- Create ML model with BigQuery ML
CREATE MODEL my_dataset.customer_churn_model
OPTIONS(
  model_type='LOGISTIC_REG',
  input_label_cols=['churned']
) AS
SELECT
  customer_age,
  total_purchases,
  days_since_last_purchase,
  avg_purchase_amount,
  churned
FROM my_dataset.customer_features;

-- Use the model for predictions
SELECT *
FROM ML.PREDICT(MODEL my_dataset.customer_churn_model,
  (SELECT * FROM my_dataset.current_customers))
WHERE predicted_churned = true
ORDER BY predicted_churned_probs[OFFSET(0)].prob DESC
LIMIT 100;

-- Streaming insert (Python)
from google.cloud import bigquery

client = bigquery.Client()
table_id = 'my_project.my_dataset.my_table'
rows_to_insert = [
    {'user_id': 1, 'event': 'click', 'timestamp': '2024-01-15 12:00:00'},
    {'user_id': 2, 'event': 'purchase', 'timestamp': '2024-01-15 12:05:00'}
]
errors = client.insert_rows_json(table_id, rows_to_insert)
if errors == []:
    print('Rows inserted')`
        },
        {
          name: 'Dataflow',
          explanation: 'Dataflow is a unified stream and batch data processing service based on Apache Beam. Write pipelines once in Java, Python, or Go and run them in batch or streaming mode. Automated resource management with autoscaling based on workload, built-in monitoring and diagnostics, and Shuffle Service for efficient large-scale joins. Supports exactly-once processing semantics, windowing functions for time-based aggregations, and watermarks for handling late data. Integrated with BigQuery, Pub/Sub, Cloud Storage, and Bigtable.',
          codeExample: `# Apache Beam pipeline (Python)
import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions

options = PipelineOptions(
    project='my-project',
    runner='DataflowRunner',
    region='us-central1',
    temp_location='gs://my-bucket/temp',
    streaming=True
)

with beam.Pipeline(options=options) as pipeline:
    # Read from Pub/Sub
    messages = (pipeline
        | 'Read' >> beam.io.ReadFromPubSub(
            subscription='projects/my-project/subscriptions/my-sub')
        | 'Parse' >> beam.Map(lambda msg: json.loads(msg))
    )

    # Windowing and aggregation
    windowed = (messages
        | 'Window' >> beam.WindowInto(
            beam.window.FixedWindows(60))  # 1-minute windows
        | 'Extract' >> beam.Map(lambda x: (x['user_id'], x['amount']))
        | 'Sum' >> beam.CombinePerKey(sum)
    )

    # Write to BigQuery
    windowed | 'Write' >> beam.io.WriteToBigQuery(
        'my_project:my_dataset.user_totals',
        schema='user_id:INTEGER,total:FLOAT,window_start:TIMESTAMP',
        create_disposition=beam.io.BigQueryDisposition.CREATE_IF_NEEDED,
        write_disposition=beam.io.BigQueryDisposition.WRITE_APPEND
    )`
        },
        {
          name: 'Cloud Composer',
          explanation: 'Cloud Composer is a managed workflow orchestration service powered by Apache Airflow. Author, schedule, and monitor workflows using Python DAGs (Directed Acyclic Graphs). Native integration with BigQuery, Dataflow, Dataproc, Datastore, Cloud Storage, and Pub/Sub through built-in operators. Support for custom operators and plugins, auto-scaling of workers, and private IP environments for enhanced security. Ideal for complex ETL workflows, ML training pipelines, and multi-cloud orchestration.',
          codeExample: `# Apache Airflow DAG (Python)
from airflow import DAG
from airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator
from airflow.providers.google.cloud.transfers.gcs_to_bigquery import GCSToBigQueryOperator
from airflow.providers.google.cloud.operators.dataflow import DataflowStartFlexTemplateOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-team',
    'depends_on_past': False,
    'start_date': datetime(2024, 1, 1),
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'daily_etl_pipeline',
    default_args=default_args,
    schedule_interval='0 2 * * *',  # Run at 2 AM daily
    catchup=False
)

# Extract: Load data from GCS to BigQuery
load_data = GCSToBigQueryOperator(
    task_id='load_raw_data',
    bucket='my-bucket',
    source_objects=['data/*.csv'],
    destination_project_dataset_table='my_project.staging.raw_data',
    write_disposition='WRITE_TRUNCATE',
    dag=dag
)

# Transform: Run BigQuery SQL
transform_data = BigQueryInsertJobOperator(
    task_id='transform_data',
    configuration={
        'query': {
            'query': 'SELECT * FROM staging.raw_data WHERE valid = true',
            'destinationTable': {
                'projectId': 'my_project',
                'datasetId': 'production',
                'tableId': 'clean_data'
            },
            'writeDisposition': 'WRITE_TRUNCATE'
        }
    },
    dag=dag
)

load_data >> transform_data  # Task dependencies`
        }
      ]
    },
    {
      id: 'messaging',
      name: 'Messaging',
      icon: '📨',
      color: '#ec4899',
      description: 'Asynchronous messaging service for building event-driven systems and streaming analytics.',
      details: [
        {
          name: 'Pub/Sub',
          diagram: PubSubDiagram,
          explanation: 'Cloud Pub/Sub provides global message delivery with sub-second latency and at-least-once delivery guarantee. Scales to millions of messages per second with no capacity planning. Features message ordering with ordering keys, message filtering with attributes, dead letter topics for failed deliveries, and message retention up to 7 days. Integrated with Dataflow for stream processing, BigQuery for analytics, and Cloud Functions for event-driven computing. Supports push and pull subscriptions.',
          codeExample: `# Create a topic
gcloud pubsub topics create my-topic

# Create a subscription
gcloud pubsub subscriptions create my-sub \\
  --topic=my-topic \\
  --message-retention-duration=7d \\
  --ack-deadline=60

# Publish messages (Python)
from google.cloud import pubsub_v1

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path('my-project', 'my-topic')

# Publish a message
data = '{"user_id": 123, "event": "purchase"}'.encode('utf-8')
future = publisher.publish(topic_path, data,
                          event_type='purchase',  # Attribute for filtering
                          priority='high')
message_id = future.result()
print(f'Published message: {message_id}')

# Subscribe and process (Pull)
subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path('my-project', 'my-sub')

def callback(message):
    print(f'Received: {message.data.decode()}')
    print(f'Attributes: {message.attributes}')
    # Process the message
    message.ack()  # Acknowledge to remove from queue

future = subscriber.subscribe(subscription_path, callback)
print('Listening for messages...')
try:
    future.result()  # Block until subscription is cancelled
except KeyboardInterrupt:
    future.cancel()`
        },
        {
          name: 'Message Ordering',
          explanation: 'Pub/Sub supports message ordering within a single ordering key to maintain sequence for related events. When publishing with an ordering key, messages with the same key are delivered in order. Enable message ordering on the subscription to guarantee sequential processing. Useful for maintaining state consistency, processing financial transactions in order, or handling event sequences where order matters. Note that ordered delivery is only guaranteed for messages with the same ordering key.',
          codeExample: `# Enable message ordering on subscription
gcloud pubsub subscriptions create ordered-sub \\
  --topic=my-topic \\
  --enable-message-ordering

# Publish ordered messages (Python)
from google.cloud import pubsub_v1

publisher = pubsub_v1.PublisherClient(
    publisher_options=pubsub_v1.types.PublisherOptions(
        enable_message_ordering=True
    )
)
topic_path = publisher.topic_path('my-project', 'my-topic')

# Publish messages with ordering key
ordering_key = 'user-123'
for i in range(5):
    data = f'Message {i} for user 123'.encode('utf-8')
    future = publisher.publish(
        topic_path,
        data,
        ordering_key=ordering_key
    )
    print(f'Published ordered message: {future.result()}')

# These messages will be delivered in order
# because they share the same ordering_key`
        },
        {
          name: 'Dead Letter Topics',
          explanation: 'Dead letter topics handle messages that cannot be processed successfully after multiple delivery attempts. Configure a subscription to forward undeliverable messages to a dead letter topic after exceeding the maximum delivery attempts. This prevents message loss and allows for separate analysis and reprocessing of failed messages. Set max delivery attempts (5-100) and specify a dead letter topic. Messages include attributes indicating the reason for failure and the original subscription.',
          codeExample: `# Create dead letter topic
gcloud pubsub topics create dead-letter-topic

# Create subscription with dead letter policy
gcloud pubsub subscriptions create main-sub \\
  --topic=my-topic \\
  --dead-letter-topic=dead-letter-topic \\
  --max-delivery-attempts=5

# Grant permissions for dead letter topic
gcloud pubsub topics add-iam-policy-binding dead-letter-topic \\
  --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com" \\
  --role="roles/pubsub.publisher"

# Process dead letter messages (Python)
def callback(message):
    try:
        # Attempt to process
        process_message(message.data)
        message.ack()
    except Exception as e:
        print(f'Processing failed: {e}')
        # Don't ack - will be retried
        # After max attempts, moves to dead letter topic
        message.nack()

# Monitor dead letter topic
dead_letter_sub = subscriber.subscribe(
    'projects/my-project/subscriptions/dead-letter-sub',
    callback=analyze_failures
)`
        }
      ]
    },
    {
      id: 'containers',
      name: 'Container Registry',
      icon: '🐳',
      color: '#06b6d4',
      description: 'Universal package manager for container images and language packages with vulnerability scanning.',
      details: [
        {
          name: 'Artifact Registry',
          explanation: 'Artifact Registry is a universal package manager that supports container images (Docker, OCI), language packages (Maven, npm, Python, Go, Apt, Yum), and Helm charts in a single service. Regional and multi-regional repositories with automatic replication for high availability. Native integration with CI/CD tools like Cloud Build, GitHub Actions, and Jenkins. Features vulnerability scanning with Container Analysis, fine-grained access control with IAM, and VPC Service Controls for enhanced security.',
          codeExample: `# Create a repository
gcloud artifacts repositories create my-repo \\
  --repository-format=docker \\
  --location=us-central1 \\
  --description="Docker images"

# Configure Docker authentication
gcloud auth configure-docker us-central1-docker.pkg.dev

# Tag and push image
docker tag my-image:latest \\
  us-central1-docker.pkg.dev/my-project/my-repo/my-image:latest
docker push us-central1-docker.pkg.dev/my-project/my-repo/my-image:latest

# Create Maven repository
gcloud artifacts repositories create maven-repo \\
  --repository-format=maven \\
  --location=us-central1

# Configure Maven (pom.xml)
<distributionManagement>
  <repository>
    <id>artifact-registry</id>
    <url>artifactregistry://us-central1-maven.pkg.dev/my-project/maven-repo</url>
  </repository>
</distributionManagement>

# List images with vulnerability scan results
gcloud artifacts docker images list \\
  us-central1-docker.pkg.dev/my-project/my-repo \\
  --include-tags \\
  --format="table(package,version,vulnerabilities)"

# Enable vulnerability scanning
gcloud services enable containerscanning.googleapis.com`
        },
        {
          name: 'Container Analysis',
          explanation: 'Container Analysis provides automated vulnerability scanning for container images stored in Artifact Registry. Continuous scanning detects new vulnerabilities as they are discovered. Scans for OS packages, language packages, and application dependencies. Results include CVE (Common Vulnerabilities and Exposures) details, severity levels (Critical, High, Medium, Low), and remediation suggestions. Integration with Binary Authorization for policy-based deployment control.',
          codeExample: `# Enable Container Scanning API
gcloud services enable containerscanning.googleapis.com

# Get vulnerability occurrences (Python)
from google.cloud import containeranalysis_v1

client = containeranalysis_v1.ContainerAnalysisClient()
grafeas_client = client.get_grafeas_client()

resource_url = (
    'https://us-central1-docker.pkg.dev/my-project/my-repo/my-image@sha256:abc123'
)

project_name = f'projects/{project_id}'
filter_str = f'resourceUrl="{resource_url}" AND kind="VULNERABILITY"'

vulnerabilities = grafeas_client.list_occurrences(
    parent=project_name,
    filter=filter_str
)

for vuln in vulnerabilities:
    print(f'CVE: {vuln.vulnerability.cvssv3.base_score}')
    print(f'Severity: {vuln.vulnerability.severity}')
    print(f'Package: {vuln.vulnerability.package_issue[0].affected_package}')
    print(f'Fixed in: {vuln.vulnerability.package_issue[0].fixed_version}')
    print('---')

# Binary Authorization policy
apiVersion: binaryauthorization.grafeas.io/v1beta1
kind: Policy
spec:
  admissionWhitelistPatterns:
  - namePattern: gcr.io/google_containers/*
  defaultAdmissionRule:
    requireAttestationsBy:
    - projects/my-project/attestors/my-attestor
    evaluationMode: REQUIRE_ATTESTATION
    enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG`
        }
      ]
    },
    {
      id: 'security',
      name: 'Security & Identity',
      icon: '🔐',
      color: '#ef4444',
      description: 'Fine-grained identity and access management with integrated security and compliance.',
      details: [
        {
          name: 'Cloud IAM',
          diagram: IAMDiagram,
          explanation: 'Cloud IAM provides unified access control across all Google Cloud services using the principle of least privilege. Predefined roles for common use cases (e.g., roles/compute.admin, roles/storage.objectViewer), custom roles for specific needs, and basic roles (Owner, Editor, Viewer) for broad access. Service accounts for service-to-service authentication with automatic credential rotation. Organization policies enforce governance constraints. Audit logs track all access and policy changes.',
          codeExample: `# Grant IAM role to user
gcloud projects add-iam-policy-binding my-project \\
  --member="user:alice@example.com" \\
  --role="roles/compute.instanceAdmin.v1"

# Create service account
gcloud iam service-accounts create my-service-account \\
  --display-name="My Service Account"

# Grant role to service account
gcloud projects add-iam-policy-binding my-project \\
  --member="serviceAccount:my-service-account@my-project.iam.gserviceaccount.com" \\
  --role="roles/storage.objectViewer"

# Create service account key
gcloud iam service-accounts keys create key.json \\
  --iam-account=my-service-account@my-project.iam.gserviceaccount.com

# Use service account in Python
from google.oauth2 import service_account
from google.cloud import storage

credentials = service_account.Credentials.from_service_account_file(
    'key.json',
    scopes=['https://www.googleapis.com/auth/cloud-platform']
)
client = storage.Client(credentials=credentials)

# Custom role definition
gcloud iam roles create myCustomRole \\
  --project=my-project \\
  --title="My Custom Role" \\
  --description="Custom permissions set" \\
  --permissions="storage.buckets.get,storage.objects.list,storage.objects.get" \\
  --stage=GA`
        },
        {
          name: 'Organization Policies',
          explanation: 'Organization policies provide centralized governance by enforcing constraints across your resource hierarchy (organization, folders, projects). Use boolean constraints to disable services or require specific configurations, list constraints to allow or deny specific values, and custom constraints for organization-specific requirements. Policies are inherited down the hierarchy but can be overridden at lower levels. Common policies include restricting resource locations, requiring VPC Service Controls, and enforcing encryption.',
          codeExample: `# List available constraints
gcloud resource-manager org-policies list \\
  --organization=ORGANIZATION_ID

# Restrict VM external IPs
gcloud resource-manager org-policies set-policy policy.yaml \\
  --organization=ORGANIZATION_ID

# policy.yaml
constraint: compute.vmExternalIpAccess
listPolicy:
  deniedValues:
  - "*"

# Restrict resource locations to US only
constraint: gcp.resourceLocations
listPolicy:
  allowedValues:
  - in:us-locations

# Require OS Login on VMs
constraint: compute.requireOsLogin
booleanPolicy:
  enforced: true

# Describe policy
gcloud resource-manager org-policies describe \\
  compute.vmExternalIpAccess \\
  --organization=ORGANIZATION_ID

# Set policy at project level
gcloud resource-manager org-policies set-policy policy.yaml \\
  --project=my-project`
        },
        {
          name: 'Workload Identity',
          explanation: 'Workload Identity is the recommended way for workloads running on GKE to access Google Cloud services. It eliminates the need to manage service account keys by allowing Kubernetes service accounts to act as Google Cloud service accounts. More secure than downloading service account keys, supports automatic credential rotation, and provides fine-grained access control. Workloads authenticate using Kubernetes tokens that are exchanged for Google Cloud credentials.',
          codeExample: `# Enable Workload Identity on cluster
gcloud container clusters update my-cluster \\
  --workload-pool=my-project.svc.id.goog \\
  --region=us-central1

# Create Kubernetes service account
kubectl create serviceaccount my-ksa \\
  --namespace default

# Create GCP service account
gcloud iam service-accounts create my-gsa \\
  --display-name="My GSA"

# Bind KSA to GSA
gcloud iam service-accounts add-iam-policy-binding \\
  my-gsa@my-project.iam.gserviceaccount.com \\
  --role roles/iam.workloadIdentityUser \\
  --member "serviceAccount:my-project.svc.id.goog[default/my-ksa]"

# Annotate Kubernetes service account
kubectl annotate serviceaccount my-ksa \\
  iam.gke.io/gcp-service-account=my-gsa@my-project.iam.gserviceaccount.com \\
  --namespace default

# Use in pod
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  serviceAccountName: my-ksa
  containers:
  - name: app
    image: gcr.io/my-project/my-image
    # Automatically gets GCP credentials`
        }
      ]
    },
    {
      id: 'operations',
      name: 'Monitoring & Operations',
      icon: '📈',
      color: '#14b8a6',
      description: 'Full observability for cloud-native applications with metrics, logs, traces, and SLO monitoring.',
      details: [
        {
          name: 'Cloud Monitoring',
          explanation: 'Cloud Monitoring provides comprehensive monitoring for Google Cloud, AWS, and on-premises infrastructure. Collect metrics, events, and metadata from infrastructure, platform services, and applications. Create custom dashboards with charts and alerts, define alerting policies with notification channels (email, PagerDuty, Slack), and implement SLO (Service Level Objective) monitoring for reliability tracking. Supports OpenTelemetry and Prometheus for standardized instrumentation.',
          codeExample: `# Create custom metric (Python)
from google.cloud import monitoring_v3

client = monitoring_v3.MetricServiceClient()
project_name = f'projects/{project_id}'

series = monitoring_v3.TimeSeries()
series.metric.type = 'custom.googleapis.com/my_metric'
series.resource.type = 'global'

now = time.time()
seconds = int(now)
nanos = int((now - seconds) * 10**9)
interval = monitoring_v3.TimeInterval({'end_time': {'seconds': seconds, 'nanos': nanos}})

point = monitoring_v3.Point({'interval': interval, 'value': {'double_value': 123.45}})
series.points = [point]

client.create_time_series(name=project_name, time_series=[series])

# Create alerting policy
from google.cloud.monitoring_v3 import AlertPolicyServiceClient

alert_client = AlertPolicyServiceClient()

policy = {
    'display_name': 'High CPU Alert',
    'conditions': [{
        'display_name': 'CPU > 80%',
        'condition_threshold': {
            'filter': 'metric.type="compute.googleapis.com/instance/cpu/utilization"',
            'comparison': 'COMPARISON_GT',
            'threshold_value': 0.8,
            'duration': {'seconds': 300},
            'aggregations': [{
                'alignment_period': {'seconds': 60},
                'per_series_aligner': 'ALIGN_MEAN',
            }],
        }
    }],
    'notification_channels': [channel_name],
    'alert_strategy': {
        'auto_close': {'seconds': 3600}
    }
}

alert_client.create_alert_policy(name=project_name, alert_policy=policy)`
        },
        {
          name: 'Cloud Logging',
          explanation: 'Cloud Logging stores, searches, analyzes, and alerts on log data from Google Cloud and AWS. Automatically collects logs from Google Cloud services, provides client libraries for application logging, and supports structured logging for easier querying. Create log-based metrics to extract values from logs and use them in monitoring. Export logs to Cloud Storage for long-term retention, BigQuery for analysis, or Pub/Sub for streaming processing. Set up log sinks with filters to route logs.',
          codeExample: `# Write structured logs (Python)
import google.cloud.logging

logging_client = google.cloud.logging.Client()
logger = logging_client.logger('my-application')

# Write simple log
logger.log_text('Application started', severity='INFO')

# Write structured log
logger.log_struct({
    'message': 'User action',
    'user_id': 12345,
    'action': 'purchase',
    'amount': 99.99,
    'timestamp': datetime.now().isoformat()
}, severity='INFO')

# Query logs
from google.cloud import logging_v2

client = logging_v2.Client()
filter_str = '''
resource.type="gce_instance"
AND severity>="ERROR"
AND timestamp>="2024-01-15T00:00:00Z"
'''

for entry in client.list_entries(filter_=filter_str, page_size=10):
    print(f'{entry.timestamp}: {entry.payload}')

# Create log sink to BigQuery
gcloud logging sinks create my-sink \\
  bigquery.googleapis.com/projects/my-project/datasets/logs \\
  --log-filter='resource.type="gce_instance" AND severity>="ERROR"'

# Create log-based metric
gcloud logging metrics create error_count \\
  --description="Count of error logs" \\
  --log-filter='severity="ERROR"'`
        },
        {
          name: 'Cloud Trace',
          explanation: 'Cloud Trace is a distributed tracing system for collecting latency data from applications. Visualize request paths through microservices, identify performance bottlenecks, and analyze latency distributions. Automatic tracing for App Engine, integration with OpenTelemetry for custom instrumentation, and analysis tools for finding slow requests. Trace context propagated through services using W3C Trace Context standard. Helps optimize application performance and troubleshoot latency issues.',
          codeExample: `# OpenTelemetry tracing (Python)
from opentelemetry import trace
from opentelemetry.exporter.cloud_trace import CloudTraceSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Setup
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

exporter = CloudTraceSpanExporter()
span_processor = BatchSpanProcessor(exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

# Create spans
@tracer.start_as_current_span("process_request")
def process_request(user_id):
    with tracer.start_as_current_span("database_query") as span:
        span.set_attribute("user.id", user_id)
        # Query database
        result = query_db(user_id)

    with tracer.start_as_current_span("compute") as span:
        span.set_attribute("result.count", len(result))
        # Process data
        processed = process_data(result)

    return processed

# View traces
gcloud trace list --limit=10
gcloud trace describe TRACE_ID`
        }
      ]
    },
    {
      id: 'integration',
      name: 'Integration & Workflows',
      icon: '🔄',
      color: '#a855f7',
      description: 'Orchestrate and automate Google Cloud and HTTP-based services with serverless workflows.',
      details: [
        {
          name: 'Cloud Workflows',
          explanation: 'Cloud Workflows orchestrates and automates Google Cloud and HTTP-based services with serverless workflows. Define workflows in YAML or JSON with built-in error handling, retry policies with exponential backoff, and conditional execution. Integrates with Cloud Functions, Cloud Run, BigQuery, and any HTTP API. No servers to manage, pay only per execution. Supports parallel execution, subworkflows for modularity, and variables for dynamic configuration.',
          codeExample: `# workflow.yaml
main:
  params: [input]
  steps:
    # Call Cloud Function
    - callFunction:
        call: http.post
        args:
          url: https://us-central1-my-project.cloudfunctions.net/processData
          auth:
            type: OIDC
          body:
            data: \${input}
        result: functionResult

    # Conditional execution
    - checkResult:
        switch:
          - condition: \${functionResult.body.status == "success"}
            next: writeToDatabase
          - condition: true
            next: handleError

    # Parallel execution
    - processInParallel:
        parallel:
          branches:
            - analytics:
                steps:
                  - callBigQuery:
                      call: googleapis.bigquery.v2.jobs.query
                      args:
                        projectId: my-project
                        body:
                          query: "SELECT * FROM dataset.table"
            - notification:
                steps:
                  - sendEmail:
                      call: http.post
                      args:
                        url: https://api.sendgrid.com/v3/mail/send

    # Retry with exponential backoff
    - writeToDatabase:
        try:
          call: http.post
          args:
            url: https://api.example.com/write
            body: \${functionResult.body}
        retry:
          predicate: \${http.default_retry}
          max_retries: 5
          backoff:
            initial_delay: 1
            max_delay: 60
            multiplier: 2

    - returnResult:
        return: \${functionResult}

# Deploy workflow
gcloud workflows deploy my-workflow \\
  --source=workflow.yaml \\
  --location=us-central1

# Execute workflow
gcloud workflows execute my-workflow \\
  --data='{"key": "value"}'`
        },
        {
          name: 'Eventarc',
          explanation: 'Eventarc is an event-driven architecture platform that delivers events from Google Cloud services, SaaS providers, and custom applications to Cloud Run, Cloud Functions, and GKE. Unified eventing model using CloudEvents standard. Route events based on event type, source, and attributes. Supports direct events from over 90 Google Cloud sources and Pub/Sub for custom events. Simplifies event-driven applications by handling event routing, filtering, and delivery.',
          codeExample: `# Create Eventarc trigger for Cloud Storage
gcloud eventarc triggers create storage-trigger \\
  --destination-run-service=my-service \\
  --destination-run-region=us-central1 \\
  --event-filters="type=google.cloud.storage.object.v1.finalized" \\
  --event-filters="bucket=my-bucket" \\
  --location=us-central1

# Create trigger for Pub/Sub
gcloud eventarc triggers create pubsub-trigger \\
  --destination-run-service=my-service \\
  --destination-run-region=us-central1 \\
  --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \\
  --transport-topic=my-topic \\
  --location=us-central1

# Cloud Run service receiving events (Python)
from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/', methods=['POST'])
def handle_event():
    # CloudEvents format
    cloud_event = request.get_json()

    print(f"Event type: {cloud_event['type']}")
    print(f"Event source: {cloud_event['source']}")
    print(f"Event data: {cloud_event['data']}")

    # Process the event
    if cloud_event['type'] == 'google.cloud.storage.object.v1.finalized':
        bucket = cloud_event['data']['bucket']
        file_name = cloud_event['data']['name']
        print(f"New file uploaded: gs://{bucket}/{file_name}")
        # Process file

    return ('', 204)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)`
        },
        {
          name: 'API Gateway',
          explanation: 'API Gateway is a fully managed gateway to secure, monitor, and manage APIs for serverless backends on Cloud Functions and Cloud Run. Define APIs using OpenAPI specification, implement authentication via service accounts or Firebase, and configure rate limiting and quotas. Integrated with Cloud Monitoring and Logging for observability. Supports API versioning, request/response transformation, and CORS configuration. Provides a single entry point for multiple backend services.',
          codeExample: `# openapi.yaml
swagger: '2.0'
info:
  title: My API
  version: 1.0.0
schemes:
  - https
produces:
  - application/json
paths:
  /users/{user_id}:
    get:
      summary: Get user
      operationId: getUser
      parameters:
        - name: user_id
          in: path
          required: true
          type: string
      responses:
        '200':
          description: Success
          schema:
            type: object
      x-google-backend:
        address: https://us-central1-my-project.cloudfunctions.net/getUser
        jwt_audience: https://my-api.example.com
  /users:
    post:
      summary: Create user
      operationId: createUser
      parameters:
        - name: body
          in: body
          required: true
          schema:
            type: object
      security:
        - api_key: []
      responses:
        '201':
          description: Created
      x-google-backend:
        address: https://my-service-abc123-uc.a.run.app/users
securityDefinitions:
  api_key:
    type: apiKey
    name: x-api-key
    in: header

# Deploy API Gateway
gcloud api-gateway api-configs create my-config \\
  --api=my-api \\
  --openapi-spec=openapi.yaml \\
  --backend-auth-service-account=my-sa@my-project.iam.gserviceaccount.com

gcloud api-gateway gateways create my-gateway \\
  --api=my-api \\
  --api-config=my-config \\
  --location=us-central1`
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
      { name: 'Cloud', icon: '☁️', page: 'Cloud' },
      { name: 'GCP', icon: '☁️', page: 'GCP' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()  // Go back to Cloud main page
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)  // Close modal, stay on GCP page
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
    background: 'linear-gradient(135deg, #4285F4, #7dd3fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(66, 133, 244, 0.2)',
    border: '1px solid rgba(66, 133, 244, 0.3)',
    borderRadius: '0.5rem',
    color: '#4285F4',
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
        <h1 style={titleStyle}>Google Cloud Platform (GCP)</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(66, 133, 244, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(66, 133, 244, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Cloud
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={GCP_COLORS}
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
              onMainMenu={breadcrumb?.onMainMenu}
              colors={GCP_COLORS}
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
                      language="bash"
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

export default GCP

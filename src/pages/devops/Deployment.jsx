/**
 * Deployment Page - Production Deployment Strategies
 *
 * Covers deployment strategies, monitoring, rollback, and best practices
 * for production deployments.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * Main topic colors - green theme for deployment
 */
const DEPLOYMENT_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
}

/**
 * Alternating colors for subtopic detail explanations
 */
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

// Blue-Green Deployment Diagram
const BlueGreenDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="bg-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Blue-Green Deployment Strategy</text>

    {/* Load Balancer */}
    <rect x="280" y="40" width="140" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="350" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Load Balancer</text>

    {/* Blue Environment */}
    <rect x="80" y="110" width="180" height="55" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="170" y="135" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Blue (v1.0)</text>
    <text x="170" y="152" textAnchor="middle" fill="#93c5fd" fontSize="8">Current Production</text>

    {/* Green Environment */}
    <rect x="440" y="110" width="180" height="55" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="530" y="135" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Green (v2.0)</text>
    <text x="530" y="152" textAnchor="middle" fill="#86efac" fontSize="8">New Version Ready</text>

    {/* Traffic Flow */}
    <path d="M 320 80 L 200 110" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#bg-arrow)"/>
    <path d="M 380 80 L 500 110" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>

    {/* Switch indicator */}
    <text x="350" y="95" textAnchor="middle" fill="#fbbf24" fontSize="8">Switch Traffic</text>
  </svg>
)

// Canary Deployment Diagram
const CanaryDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Canary Release Pattern</text>

    {/* Traffic Source */}
    <rect x="50" y="70" width="100" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Users</text>
    <text x="100" y="110" textAnchor="middle" fill="#bfdbfe" fontSize="7">100%</text>

    {/* Traffic Split */}
    <rect x="200" y="60" width="120" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="260" y="85" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Traffic Split</text>
    <text x="260" y="105" textAnchor="middle" fill="#fcd34d" fontSize="8">90% / 10%</text>
    <text x="260" y="120" textAnchor="middle" fill="#fcd34d" fontSize="7">Gradual rollout</text>

    {/* Stable */}
    <rect x="380" y="40" width="130" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="445" y="62" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Stable v1.0</text>
    <text x="445" y="78" textAnchor="middle" fill="#86efac" fontSize="8">90% traffic</text>

    {/* Canary */}
    <rect x="380" y="100" width="130" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="445" y="122" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Canary v2.0</text>
    <text x="445" y="138" textAnchor="middle" fill="#fcd34d" fontSize="8">10% traffic</text>

    {/* Metrics */}
    <rect x="560" y="60" width="100" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="610" y="85" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Metrics</text>
    <text x="610" y="102" textAnchor="middle" fill="#c4b5fd" fontSize="7">Error Rate</text>
    <text x="610" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="7">Latency</text>

    {/* Arrows */}
    <line x1="150" y1="95" x2="195" y2="95" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="320" y1="80" x2="375" y2="65" stroke="#22c55e" strokeWidth="2"/>
    <line x1="320" y1="110" x2="375" y2="125" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="510" y1="65" x2="555" y2="80" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3"/>
    <line x1="510" y1="125" x2="555" y2="110" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3"/>
  </svg>
)

// Rolling Update Diagram
const RollingUpdateDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Rolling Update Visualization</text>

    {/* Timeline */}
    <line x1="50" y1="90" x2="650" y2="90" stroke="#374151" strokeWidth="2"/>

    {/* Stage 1 */}
    <rect x="60" y="50" width="25" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <rect x="90" y="50" width="25" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <rect x="120" y="50" width="25" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <rect x="150" y="50" width="25" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="110" y="45" textAnchor="middle" fill="#60a5fa" fontSize="8">Start: All v1</text>

    {/* Stage 2 */}
    <rect x="210" y="50" width="25" height="25" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <rect x="240" y="50" width="25" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <rect x="270" y="50" width="25" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <rect x="300" y="50" width="25" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="260" y="45" textAnchor="middle" fill="#4ade80" fontSize="8">1 pod updated</text>

    {/* Stage 3 */}
    <rect x="360" y="50" width="25" height="25" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <rect x="390" y="50" width="25" height="25" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <rect x="420" y="50" width="25" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <rect x="450" y="50" width="25" height="25" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="410" y="45" textAnchor="middle" fill="#4ade80" fontSize="8">2 pods updated</text>

    {/* Stage 4 */}
    <rect x="510" y="50" width="25" height="25" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <rect x="540" y="50" width="25" height="25" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <rect x="570" y="50" width="25" height="25" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <rect x="600" y="50" width="25" height="25" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="560" y="45" textAnchor="middle" fill="#4ade80" fontSize="8">Complete: All v2</text>

    {/* Legend */}
    <rect x="230" y="120" width="15" height="15" rx="3" fill="#3b82f6"/>
    <text x="250" y="132" fill="#60a5fa" fontSize="9">v1 (old)</text>
    <rect x="310" y="120" width="15" height="15" rx="3" fill="#22c55e"/>
    <text x="330" y="132" fill="#4ade80" fontSize="9">v2 (new)</text>

    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="9">Zero downtime - MaxUnavailable: 1, MaxSurge: 1</text>
  </svg>
)

// Feature Flag Diagram
const FeatureFlagDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Feature Flag Toggle Flow</text>

    {/* Code with Flag */}
    <rect x="50" y="50" width="140" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Application</text>
    <text x="120" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">if (flag.enabled)</text>
    <text x="120" y="110" textAnchor="middle" fill="#93c5fd" fontSize="7">use new feature</text>

    {/* Flag Service */}
    <rect x="250" y="50" width="140" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="320" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Flag Service</text>
    <text x="320" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">LaunchDarkly</text>
    <text x="320" y="110" textAnchor="middle" fill="#fcd34d" fontSize="7">Split.io</text>

    {/* Toggle Switch */}
    <rect x="450" y="50" width="120" height="30" rx="15" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <circle cx="540" cy="65" r="12" fill="#22c55e"/>
    <text x="480" y="70" fill="#4ade80" fontSize="9">ON</text>

    <rect x="450" y="90" width="120" height="30" rx="15" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <circle cx="470" cy="105" r="12" fill="#ef4444"/>
    <text x="530" y="110" fill="#f87171" fontSize="9">OFF</text>

    {/* User Targeting */}
    <rect x="600" y="50" width="80" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="640" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Targeting</text>
    <text x="640" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="7">% rollout</text>
    <text x="640" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="7">user groups</text>

    {/* Arrows */}
    <line x1="190" y1="85" x2="245" y2="85" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="390" y1="65" x2="445" y2="65" stroke="#22c55e" strokeWidth="2"/>
    <line x1="390" y1="105" x2="445" y2="105" stroke="#ef4444" strokeWidth="2"/>
    <line x1="570" y1="85" x2="595" y2="85" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3"/>

    <text x="350" y="155" textAnchor="middle" fill="#64748b" fontSize="9">Decouple deployment from release - Deploy dark, enable when ready</text>
  </svg>
)

// Monitoring Dashboard Diagram
const MonitoringDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Post-Deployment Monitoring</text>

    {/* Metrics Panel */}
    <rect x="50" y="50" width="180" height="110" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="140" y="72" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Metrics</text>
    <text x="140" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">Error Rate: 0.02%</text>
    <text x="140" y="108" textAnchor="middle" fill="#93c5fd" fontSize="8">Latency p95: 245ms</text>
    <text x="140" y="124" textAnchor="middle" fill="#93c5fd" fontSize="8">Throughput: 1.2k rps</text>
    <text x="140" y="140" textAnchor="middle" fill="#4ade80" fontSize="8">Status: Healthy</text>

    {/* Logs Panel */}
    <rect x="260" y="50" width="180" height="110" rx="6" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="350" y="72" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Logs</text>
    <text x="350" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">ELK / Splunk</text>
    <text x="350" y="108" textAnchor="middle" fill="#fcd34d" fontSize="8">Errors: 12</text>
    <text x="350" y="124" textAnchor="middle" fill="#fcd34d" fontSize="8">Warnings: 45</text>
    <text x="350" y="140" textAnchor="middle" fill="#fcd34d" fontSize="8">{`Search & Analyze`}</text>

    {/* Alerts Panel */}
    <rect x="470" y="50" width="180" height="110" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1"/>
    <text x="560" y="72" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Alerts</text>
    <text x="560" y="92" textAnchor="middle" fill="#fca5a5" fontSize="8">PagerDuty</text>
    <text x="560" y="108" textAnchor="middle" fill="#fca5a5" fontSize="8">Slack / Email</text>
    <text x="560" y="124" textAnchor="middle" fill="#fca5a5" fontSize="8">Auto-rollback</text>
    <text x="560" y="140" textAnchor="middle" fill="#4ade80" fontSize="8">0 Active Alerts</text>
  </svg>
)

// Rollback Strategy Diagram
const RollbackDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Rollback Decision Flow</text>

    {/* Deploy */}
    <rect x="50" y="60" width="100" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Deploy</text>

    {/* Monitor */}
    <rect x="200" y="60" width="100" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="250" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Monitor</text>

    {/* Decision */}
    <polygon points="400,85 450,60 500,85 450,110" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="450" y="90" textAnchor="middle" fill="#a78bfa" fontSize="9">Healthy?</text>

    {/* Success */}
    <rect x="550" y="35" width="100" height="40" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="60" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Success</text>

    {/* Rollback */}
    <rect x="550" y="100" width="100" height="40" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="600" y="125" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Rollback</text>

    {/* Arrows */}
    <line x1="150" y1="85" x2="195" y2="85" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="300" y1="85" x2="395" y2="85" stroke="#fbbf24" strokeWidth="2"/>
    <line x1="500" y1="72" x2="545" y2="55" stroke="#22c55e" strokeWidth="2"/>
    <line x1="500" y1="98" x2="545" y2="120" stroke="#ef4444" strokeWidth="2"/>

    <text x="525" y="50" fill="#4ade80" fontSize="8">Yes</text>
    <text x="525" y="135" fill="#f87171" fontSize="8">No</text>

    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="9">{`Triggers: Error rate > 5%, Latency > 500ms, Health check failures`}</text>
  </svg>
)

// Pre-Deployment Checklist Diagram
const PreDeploymentDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="pre-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Pre-Deployment Quality Gates</text>

    {/* Gates */}
    <rect x="30" y="50" width="110" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="85" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Code Review</text>
    <text x="85" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">2+ Approvals</text>

    <rect x="160" y="50" width="110" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="215" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">SonarQube</text>
    <text x="215" y="95" textAnchor="middle" fill="#86efac" fontSize="8">0 Critical Issues</text>

    <rect x="290" y="50" width="110" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="345" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Security Scan</text>
    <text x="345" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">SAST/DAST</text>

    <rect x="420" y="50" width="110" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="475" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Test Coverage</text>
    <text x="475" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">80%+ Coverage</text>

    <rect x="550" y="50" width="110" height="60" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="605" y="75" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Staging Test</text>
    <text x="605" y="95" textAnchor="middle" fill="#fbcfe8" fontSize="8">Validated</text>

    <rect x="680" y="50" width="90" height="60" rx="6" fill="rgba(34, 197, 94, 0.5)" stroke="#22c55e" strokeWidth="3"/>
    <text x="725" y="85" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Deploy</text>

    {/* Arrows */}
    <path d="M 140 80 L 155 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#pre-arrow)"/>
    <path d="M 270 80 L 285 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#pre-arrow)"/>
    <path d="M 400 80 L 415 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#pre-arrow)"/>
    <path d="M 530 80 L 545 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#pre-arrow)"/>
    <path d="M 660 80 L 675 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#pre-arrow)"/>

    {/* Gate Status */}
    <rect x="150" y="135" width="500" height="45" rx="6" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    <text x="400" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">All gates must pass before production deployment</text>
    <text x="400" y="172" textAnchor="middle" fill="#64748b" fontSize="9">Failed gates block the release pipeline</text>
  </svg>
)

// Post-Deployment Checklist Diagram
const PostDeploymentDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Post-Deployment Activities</text>

    {/* Immediate */}
    <rect x="50" y="45" width="200" height="70" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="150" y="65" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Immediate (0-30 min)</text>
    <text x="150" y="82" textAnchor="middle" fill="#86efac" fontSize="8">* Health check monitoring</text>
    <text x="150" y="95" textAnchor="middle" fill="#86efac" fontSize="8">* Error rate validation</text>
    <text x="150" y="108" textAnchor="middle" fill="#86efac" fontSize="8">* Performance baseline</text>

    {/* Short-term */}
    <rect x="280" y="45" width="200" height="70" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="380" y="65" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Short-term (1-4 hrs)</text>
    <text x="380" y="82" textAnchor="middle" fill="#fcd34d" fontSize="8">* Load test validation</text>
    <text x="380" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">* Memory leak check</text>
    <text x="380" y="108" textAnchor="middle" fill="#fcd34d" fontSize="8">* User feedback review</text>

    {/* Cleanup */}
    <rect x="510" y="45" width="200" height="70" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="610" y="65" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Cleanup (24-48 hrs)</text>
    <text x="610" y="82" textAnchor="middle" fill="#c4b5fd" fontSize="8">* Scale down old infra</text>
    <text x="610" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">* Clean feature flags</text>
    <text x="610" y="108" textAnchor="middle" fill="#c4b5fd" fontSize="8">* Update documentation</text>

    {/* Footer */}
    <rect x="100" y="140" width="600" height="40" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="400" y="158" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Documentation: Release notes * Incident reports * Runbooks</text>
    <text x="400" y="172" textAnchor="middle" fill="#93c5fd" fontSize="8">Close tickets * Update status page * Notify stakeholders</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Deployment({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'pre-deployment',
      name: 'Pre-Deployment',
      icon: '📋',
      color: '#3b82f6',
      description: 'Code reviews (2+ approvals), SonarQube gates (zero critical issues), SAST/DAST scans, 80%+ test coverage, and staging validation ensure production readiness.',
      diagram: PreDeploymentDiagram,
      details: [
        {
          name: 'Code Review & Quality Gates',
          explanation: 'Ensure code quality and security standards are met before deployment. All code reviews must be approved by at least 2 reviewers. Static code analysis (SonarQube) should pass with no critical issues. Security scans (SAST/DAST) must complete with no high-severity vulnerabilities. Unit test coverage should meet minimum threshold (80%+). Integration and performance tests must pass successfully.',
          codeExample: `# GitHub Actions Quality Gate Pipeline
name: Quality Gates
on: [pull_request]

jobs:
  quality-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Code review enforcement via branch protection
      # Settings > Branches > Require 2 approving reviews

      - name: SonarQube Scan
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: \${{ secrets.SONAR_HOST_URL }}

      - name: Quality Gate Check
        uses: sonarsource/sonarqube-quality-gate-action@master
        timeout-minutes: 5
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}

      - name: Run Tests with Coverage
        run: |
          npm test -- --coverage --coverageThreshold='{"global":{"lines":80}}'

      - name: SAST Scan (Semgrep)
        uses: returntocorp/semgrep-action@v1
        with:
          config: p/security-audit`
        },
        {
          name: 'Environment Configuration',
          explanation: 'Configure environment-specific settings and secrets properly. Environment variables must be defined in CI/CD pipeline. Secrets should be stored securely in vault systems like AWS Secrets Manager or HashiCorp Vault. Database migration scripts need to be reviewed and tested. Feature flags should be configured for gradual rollout. SSL certificates and DNS records must be validated.',
          codeExample: `# Kubernetes ConfigMap and Secret configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: production
data:
  DATABASE_HOST: "postgres.production.svc.cluster.local"
  REDIS_HOST: "redis.production.svc.cluster.local"
  LOG_LEVEL: "info"
  FEATURE_FLAGS_ENABLED: "true"
---
# External Secrets Operator - Fetch from AWS Secrets Manager
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-secrets
  namespace: production
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: ClusterSecretStore
  target:
    name: app-secrets
  data:
    - secretKey: DATABASE_PASSWORD
      remoteRef:
        key: production/database
        property: password
    - secretKey: API_KEY
      remoteRef:
        key: production/api-keys
        property: main-api-key
---
# HashiCorp Vault injection via annotations
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    metadata:
      annotations:
        vault.hashicorp.com/agent-inject: "true"
        vault.hashicorp.com/role: "my-app"
        vault.hashicorp.com/agent-inject-secret-db: "secret/data/production/db"`
        },
        {
          name: 'Build Artifacts',
          explanation: 'Create production-ready build artifacts with proper versioning. Version numbers should follow semantic versioning and be incremented appropriately. Build must succeed with production profile. Artifact size should be optimized by removing dev dependencies. Docker images must be built, tagged, and scanned for vulnerabilities. All artifacts should be stored in artifact repository like Nexus or Artifactory.',
          codeExample: `# Multi-stage Dockerfile for optimized production build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production=false
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
# Copy built artifacts
COPY --from=builder /app/dist ./dist
# Non-root user for security
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]

---
# Build and push with semantic versioning
# .github/workflows/build.yml
- name: Build and Push Docker Image
  run: |
    VERSION=\$(cat package.json | jq -r .version)
    GIT_SHA=\$(git rev-parse --short HEAD)

    docker build -t myapp:\$VERSION -t myapp:\$GIT_SHA .

    # Scan for vulnerabilities
    trivy image --severity HIGH,CRITICAL myapp:\$VERSION

    # Push to registry
    docker push myregistry.azurecr.io/myapp:\$VERSION
    docker push myregistry.azurecr.io/myapp:\$GIT_SHA`
        }
      ]
    },
    {
      id: 'blue-green',
      name: 'Blue-Green Deployment',
      icon: '🔵',
      color: '#10b981',
      description: 'Two identical environments: Blue (current) and Green (new). Instant traffic switch at load balancer/DNS. Instant rollback by reverting switch. Zero downtime with full traffic cutover.',
      diagram: BlueGreenDiagram,
      details: [
        {
          name: 'Strategy Overview',
          diagram: BlueGreenDiagram,
          explanation: 'Blue-green deployment maintains two identical production environments called Blue and Green. At any time, only one environment serves production traffic. The inactive environment is used to deploy and test the new version. Once verified, traffic is switched to the new environment. The old environment remains available for instant rollback if issues arise.',
          codeExample: `# AWS ALB Target Group switching for Blue-Green
# Blue environment serving traffic, Green ready for new version

# Step 1: Deploy new version to Green target group
aws ecs update-service \\
  --cluster production \\
  --service my-app-green \\
  --task-definition my-app:v2.0.0

# Step 2: Wait for Green to be healthy
aws ecs wait services-stable \\
  --cluster production \\
  --services my-app-green

# Step 3: Switch ALB listener to Green target group
aws elbv2 modify-listener \\
  --listener-arn arn:aws:elasticloadbalancing:...:listener/app/my-alb/... \\
  --default-actions Type=forward,TargetGroupArn=arn:aws:...:targetgroup/green/...

# Rollback: Switch back to Blue
aws elbv2 modify-listener \\
  --listener-arn arn:aws:elasticloadbalancing:...:listener/app/my-alb/... \\
  --default-actions Type=forward,TargetGroupArn=arn:aws:...:targetgroup/blue/...`
        },
        {
          name: 'Implementation',
          explanation: 'Deploy the new version to the inactive environment (Green). Run comprehensive health checks and smoke tests on Green. Verify all services are responding correctly. Switch the load balancer or DNS to point to Green. Monitor metrics closely for 15-30 minutes. Keep Blue environment running for quick rollback capability. Scale down or repurpose Blue after confidence period.',
          codeExample: `# Nginx Ingress Blue-Green switching
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/canary: "false"
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-app-green  # Switch between blue/green
            port:
              number: 80
---
# Shell script for Blue-Green switch
#!/bin/bash
CURRENT=\$(kubectl get svc my-app-active -o jsonpath='{.spec.selector.version}')

if [ "\$CURRENT" == "blue" ]; then
  NEW="green"
else
  NEW="blue"
fi

echo "Switching from \$CURRENT to \$NEW"

# Deploy new version to inactive environment
kubectl set image deployment/my-app-\$NEW app=myapp:v2.0.0

# Wait for rollout
kubectl rollout status deployment/my-app-\$NEW

# Run smoke tests
./run-smoke-tests.sh \$NEW

# Switch service selector
kubectl patch svc my-app-active -p '{"spec":{"selector":{"version":"'\$NEW'"}}}'

echo "Traffic now routing to \$NEW"`
        },
        {
          name: 'Kubernetes Blue-Green',
          explanation: 'In Kubernetes, create separate deployments for blue and green versions with different labels (version: blue, version: green). Use a Service to route traffic by changing the selector. Deploy green version, wait for pods to be ready, run tests, then patch the service selector to point to green. Keep blue deployment for rollback before scaling it down.',
          codeExample: `# Blue Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-blue
  labels:
    app: my-app
    version: blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: blue
  template:
    metadata:
      labels:
        app: my-app
        version: blue
    spec:
      containers:
      - name: app
        image: myapp:v1.0.0
        ports:
        - containerPort: 8080
---
# Green Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-green
  labels:
    app: my-app
    version: green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: green
  template:
    metadata:
      labels:
        app: my-app
        version: green
    spec:
      containers:
      - name: app
        image: myapp:v2.0.0
        ports:
        - containerPort: 8080
---
# Service - switch selector to route traffic
apiVersion: v1
kind: Service
metadata:
  name: my-app-active
spec:
  selector:
    app: my-app
    version: blue  # Change to "green" to switch traffic
  ports:
  - port: 80
    targetPort: 8080`
        },
        {
          name: 'Pros and Cons',
          explanation: 'Advantages: Zero downtime, instant rollback, full testing before switch, reduced risk. Disadvantages: Requires double infrastructure during deployment, database schema changes need careful handling, more complex for stateful applications, higher cost for maintaining two environments.',
          codeExample: `# Argo Rollouts Blue-Green Strategy
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: my-app-rollout
spec:
  replicas: 5
  strategy:
    blueGreen:
      activeService: my-app-active      # Production traffic
      previewService: my-app-preview    # Preview/testing traffic
      autoPromotionEnabled: false       # Manual promotion
      scaleDownDelaySeconds: 300        # Keep old version 5 mins
      prePromotionAnalysis:             # Run tests before promotion
        templates:
        - templateName: smoke-tests
        args:
        - name: service-name
          value: my-app-preview
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: myapp:v2.0.0
        ports:
        - containerPort: 8080
---
# Promote the new version
kubectl argo rollouts promote my-app-rollout

# Abort and rollback
kubectl argo rollouts abort my-app-rollout`
        }
      ]
    },
    {
      id: 'canary',
      name: 'Canary Deployment',
      icon: '🐤',
      color: '#f59e0b',
      description: 'Route 1-10% traffic to new version, monitor error rate and latency metrics, gradually increase to 50% then 100%. Automated rollback on metric spike. Flagger/Argo Rollouts support.',
      diagram: CanaryDiagram,
      details: [
        {
          name: 'Strategy Overview',
          diagram: CanaryDiagram,
          explanation: 'Canary deployment gradually rolls out changes to a small subset of users before full deployment. Named after coal mine canaries that detected danger. Start with 1-10% of traffic going to the new version. Monitor error rates, latency, and business metrics. Gradually increase traffic if metrics are healthy. Roll back immediately if anomalies are detected.',
          codeExample: `# Argo Rollouts Canary Strategy
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: my-app
spec:
  replicas: 10
  strategy:
    canary:
      steps:
      - setWeight: 10        # 10% traffic to canary
      - pause: {duration: 5m}
      - setWeight: 25
      - pause: {duration: 5m}
      - setWeight: 50
      - pause: {duration: 10m}
      - setWeight: 75
      - pause: {duration: 5m}
      # 100% happens automatically at end

      # Automated analysis at each step
      analysis:
        templates:
        - templateName: success-rate
        startingStep: 1
        args:
        - name: service-name
          value: my-app-canary
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: myapp:v2.0.0`
        },
        {
          name: 'Traffic Splitting',
          explanation: 'Use service mesh (Istio, Linkerd) or ingress controllers for traffic splitting. Define weights for stable and canary versions. Route specific users (beta testers, internal users) to canary first. Implement header-based routing for testing (X-Canary: true). Gradually shift traffic: 10% -> 25% -> 50% -> 100%. Use automated traffic management based on metrics.',
          codeExample: `# Istio VirtualService for traffic splitting
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: my-app
spec:
  hosts:
  - my-app
  http:
  # Header-based routing for testing
  - match:
    - headers:
        x-canary:
          exact: "true"
    route:
    - destination:
        host: my-app
        subset: canary
  # Weighted traffic split
  - route:
    - destination:
        host: my-app
        subset: stable
      weight: 90
    - destination:
        host: my-app
        subset: canary
      weight: 10
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: my-app
spec:
  host: my-app
  subsets:
  - name: stable
    labels:
      version: stable
  - name: canary
    labels:
      version: canary
---
# Test canary with header
curl -H "x-canary: true" https://myapp.example.com/api/health`
        },
        {
          name: 'Metrics & Analysis',
          explanation: 'Define success criteria before deployment: error rate below 1%, latency p95 under 500ms. Use automated canary analysis tools like Flagger or Spinnaker. Compare canary metrics against baseline. Set up alerts for anomaly detection. Include business metrics: conversion rate, user engagement. Automated rollback when thresholds are breached.',
          codeExample: `# Flagger Canary with Prometheus metrics analysis
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: my-app
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  service:
    port: 80
  analysis:
    interval: 1m
    threshold: 5              # Max failed checks before rollback
    maxWeight: 50             # Max traffic percentage
    stepWeight: 10            # Increment per interval

    # Custom Prometheus metrics for success criteria
    metrics:
    - name: request-success-rate
      thresholdRange:
        min: 99               # 99% success rate required
      interval: 1m
    - name: request-duration
      thresholdRange:
        max: 500              # p99 latency < 500ms
      interval: 1m

    # Webhooks for custom checks
    webhooks:
    - name: smoke-test
      type: pre-rollout
      url: http://flagger-loadtester/
      timeout: 30s
      metadata:
        type: bash
        cmd: "curl -s http://my-app-canary/health | grep ok"

    - name: load-test
      type: rollout
      url: http://flagger-loadtester/
      timeout: 60s
      metadata:
        cmd: "hey -z 1m -q 10 http://my-app-canary/"`
        },
        {
          name: 'Istio Implementation',
          explanation: 'Create VirtualService with weighted routing between stable and canary subsets. Define DestinationRule with subsets for each version. Deploy canary with separate deployment and labels. Configure traffic weights in VirtualService spec. Use Flagger for automated progressive delivery with metric analysis.',
          codeExample: `# Complete Istio Canary Setup with Flagger
# Step 1: Install Flagger with Istio
kubectl apply -k github.com/flagger/flagger/kustomize/istio

# Step 2: Create Canary resource
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: my-app
  namespace: production
spec:
  provider: istio
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  progressDeadlineSeconds: 600

  service:
    port: 80
    targetPort: 8080
    gateways:
    - public-gateway.istio-system.svc.cluster.local
    hosts:
    - myapp.example.com
    trafficPolicy:
      tls:
        mode: ISTIO_MUTUAL

  analysis:
    interval: 30s
    threshold: 3
    maxWeight: 50
    stepWeight: 5
    metrics:
    - name: istio_requests_total
      thresholdRange:
        min: 99
      query: |
        sum(rate(istio_requests_total{
          destination_service_name="my-app-canary",
          response_code!~"5.*"
        }[1m])) /
        sum(rate(istio_requests_total{
          destination_service_name="my-app-canary"
        }[1m])) * 100

# Step 3: Deploy new version - Flagger handles canary automatically
kubectl set image deployment/my-app app=myapp:v2.0.0

# Monitor canary progress
kubectl describe canary my-app
watch kubectl get canary my-app`
        }
      ]
    },
    {
      id: 'rolling',
      name: 'Rolling Update',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Replace pods incrementally: maxSurge (extra pods allowed), maxUnavailable (pods down allowed). Kubernetes default with revision history. Health checks pause rollout if readiness fails.',
      diagram: RollingUpdateDiagram,
      details: [
        {
          name: 'Strategy Overview',
          diagram: RollingUpdateDiagram,
          explanation: 'Rolling updates gradually replace instances of the old version with the new version. Kubernetes default deployment strategy. Maintains application availability throughout the update. Configurable pace of update with maxUnavailable and maxSurge parameters. Automatically rolls back on health check failures. No additional infrastructure required.',
          codeExample: `# Kubernetes Deployment with Rolling Update Strategy
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
spec:
  replicas: 6
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 2          # Allow 2 extra pods during update
      maxUnavailable: 1    # At most 1 pod down at a time
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: myapp:v2.0.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"

# Rolling update progression with 6 replicas:
# Step 1: 6 old + 2 new (maxSurge) = 8 pods
# Step 2: 5 old + 3 new (1 old terminated)
# Step 3: 4 old + 4 new
# Step 4: 3 old + 5 new
# Step 5: 2 old + 6 new
# Step 6: 0 old + 6 new (complete)`
        },
        {
          name: 'Configuration',
          explanation: 'maxUnavailable: Maximum number of pods that can be unavailable during update (default 25%). maxSurge: Maximum number of extra pods that can be created during update (default 25%). Example: 4 replicas with maxUnavailable=1 means at least 3 pods always running. Higher values = faster deployment but more resource usage. Lower values = safer but slower rollout.',
          codeExample: `# Different Rolling Update Configurations

# Conservative (Slower, Safer) - Good for critical services
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-service
spec:
  replicas: 10
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1          # Only 1 extra pod
      maxUnavailable: 0    # Never reduce capacity
  # With 10 replicas: 11 pods max, always 10 available
  # Slowest but safest

---
# Aggressive (Faster) - Good for stateless services
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-frontend
spec:
  replicas: 8
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: "50%"      # Allow 50% extra (4 pods)
      maxUnavailable: "25%" # Allow 25% down (2 pods)
  # With 8 replicas: 12 pods max, minimum 6 available
  # Fastest deployment

---
# Percentage vs Absolute values
# maxSurge: 2 vs maxSurge: "25%"
# Percentage scales with replica count
# Absolute provides fixed behavior`
        },
        {
          name: 'Health Checks',
          explanation: 'Liveness probe: Is the container running? Restart if failed. Readiness probe: Is the container ready to serve traffic? Remove from load balancer if failed. Startup probe: For slow-starting containers. Configure initialDelaySeconds, periodSeconds, failureThreshold appropriately. Deployment waits for readiness before continuing rollout.',
          codeExample: `# Comprehensive Health Check Configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      containers:
      - name: app
        image: myapp:v2.0.0
        ports:
        - containerPort: 8080

        # Startup probe: For slow-starting containers
        startupProbe:
          httpGet:
            path: /health/startup
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
          failureThreshold: 30  # 30 * 5s = 150s max startup time
          successThreshold: 1

        # Readiness probe: Ready to receive traffic?
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
          failureThreshold: 3
          successThreshold: 1
          timeoutSeconds: 5

        # Liveness probe: Is container healthy?
        livenessProbe:
          httpGet:
            path: /health/live
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 20
          failureThreshold: 3
          timeoutSeconds: 5

---
# Spring Boot Actuator health endpoints
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info
  endpoint:
    health:
      probes:
        enabled: true
      group:
        readiness:
          include: readinessState,db,redis
        liveness:
          include: livenessState`
        },
        {
          name: 'Rollout Control',
          explanation: 'kubectl rollout status: Watch deployment progress. kubectl rollout pause: Temporarily stop rollout for investigation. kubectl rollout resume: Continue paused rollout. kubectl rollout undo: Revert to previous revision. kubectl rollout history: View revision history. Set progressDeadlineSeconds for automatic failure detection.',
          codeExample: `# Rollout Control Commands

# Watch rollout progress in real-time
kubectl rollout status deployment/my-app -n production

# View rollout history
kubectl rollout history deployment/my-app -n production
# REVISION  CHANGE-CAUSE
# 1         kubectl apply --filename=deployment.yaml --record
# 2         kubectl set image deployment/my-app app=myapp:v2.0.0

# View specific revision details
kubectl rollout history deployment/my-app --revision=2

# Pause rollout for investigation
kubectl rollout pause deployment/my-app -n production

# Resume paused rollout
kubectl rollout resume deployment/my-app -n production

# Rollback to previous version
kubectl rollout undo deployment/my-app -n production

# Rollback to specific revision
kubectl rollout undo deployment/my-app --to-revision=1 -n production

# Restart all pods (rolling)
kubectl rollout restart deployment/my-app -n production

---
# Deployment with progress deadline
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  progressDeadlineSeconds: 600  # Fail if no progress in 10 min
  minReadySeconds: 30           # Pod must be ready 30s before continuing
  revisionHistoryLimit: 10      # Keep 10 old ReplicaSets for rollback
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0`
        }
      ]
    },
    {
      id: 'feature-flags',
      name: 'Feature Flags',
      icon: '🚩',
      color: '#ec4899',
      description: 'Deploy code disabled, enable via LaunchDarkly/Split.io with percentage rollout (10%-50%-100%), user/group targeting, or A/B experiments. Instant kill switch without redeployment.',
      diagram: FeatureFlagDiagram,
      details: [
        {
          name: 'Concept Overview',
          diagram: FeatureFlagDiagram,
          explanation: 'Feature flags separate code deployment from feature release. Deploy new code in disabled state (dark launch). Enable features for specific users or percentages. Instant disable without redeployment. A/B testing and experimentation. Gradual feature rollout with kill switch. Trunk-based development enabler.',
          codeExample: `// LaunchDarkly SDK - Node.js/TypeScript
import * as LaunchDarkly from 'launchdarkly-node-server-sdk';

const ldClient = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY);

// Wait for client to initialize
await ldClient.waitForInitialization();

// Basic feature flag check
async function getNewCheckoutExperience(user: User) {
  const context = {
    kind: 'user',
    key: user.id,
    email: user.email,
    custom: {
      plan: user.subscriptionPlan,
      country: user.country,
      signupDate: user.createdAt
    }
  };

  // Evaluate flag with fallback value
  const showNewCheckout = await ldClient.variation(
    'new-checkout-experience',  // Flag key
    context,
    false  // Default value if flag unavailable
  );

  if (showNewCheckout) {
    return renderNewCheckout();
  } else {
    return renderLegacyCheckout();
  }
}

// React client-side with LaunchDarkly
import { useFlags } from 'launchdarkly-react-client-sdk';

function CheckoutButton() {
  const { newCheckoutExperience } = useFlags();

  return newCheckoutExperience
    ? <NewCheckoutButton />
    : <LegacyCheckoutButton />;
}`
        },
        {
          name: 'Flag Types',
          explanation: 'Release flags: Short-lived, control new feature visibility. Ops flags: Long-lived, control operational aspects (maintenance mode). Experiment flags: A/B tests, usually temporary. Permission flags: Enable features for specific users or groups. Kill switches: Emergency disable for problematic features.',
          codeExample: `// Split.io SDK - Different Flag Types

import { SplitFactory } from '@splitsoftware/splitio';

const factory = SplitFactory({
  core: {
    authorizationKey: process.env.SPLIT_API_KEY,
    key: 'user-key'
  }
});

const client = factory.client();

// 1. Release Flag - Short-lived, new feature
async function showNewDashboard(userId: string) {
  const treatment = await client.getTreatment(userId, 'new_dashboard_v2');
  return treatment === 'on';
}

// 2. Ops Flag - Kill switch for maintenance
async function isMaintenanceMode() {
  const treatment = await client.getTreatment('system', 'maintenance_mode');
  return treatment === 'on';
}

// 3. Experiment Flag - A/B test with variants
async function getPricingVariant(userId: string) {
  // Returns: 'control', 'variant_a', or 'variant_b'
  const treatment = await client.getTreatment(userId, 'pricing_experiment');

  // Track conversion for experiment analysis
  client.track(userId, 'user', 'checkout_completed', null, {
    variant: treatment
  });

  return treatment;
}

// 4. Permission Flag - Enterprise features
async function hasAdvancedAnalytics(user: User) {
  const attributes = {
    plan: user.plan,           // 'free', 'pro', 'enterprise'
    company: user.companyId
  };
  const treatment = await client.getTreatment(
    user.id,
    'advanced_analytics',
    attributes
  );
  return treatment === 'on';
}

// 5. Kill Switch - Emergency disable
async function isPaymentSystemEnabled() {
  const treatment = await client.getTreatment('system', 'payment_kill_switch');
  return treatment !== 'killed';  // 'killed' = disabled
}`
        },
        {
          name: 'Implementation',
          explanation: 'Use feature flag services: LaunchDarkly, Split.io, Optimizely, or open-source Unleash. Wrap new code in flag conditions. Evaluate flags server-side for security. Client SDKs for real-time updates. Store flag configuration separately from code. Clean up flags after full rollout to avoid technical debt.',
          codeExample: `// Unleash (Open Source) Implementation

// Backend - Node.js
import { initialize, isEnabled } from 'unleash-client';

const unleash = initialize({
  url: 'https://unleash.mycompany.com/api/',
  appName: 'my-app',
  customHeaders: {
    Authorization: process.env.UNLEASH_API_TOKEN
  }
});

// Simple boolean flag
app.get('/api/products', (req, res) => {
  if (isEnabled('new-product-catalog')) {
    return getNewCatalog(req, res);
  }
  return getLegacyCatalog(req, res);
});

// With context for targeting
app.get('/api/checkout', (req, res) => {
  const context = {
    userId: req.user.id,
    sessionId: req.sessionId,
    properties: {
      country: req.user.country,
      plan: req.user.subscriptionPlan
    }
  };

  if (isEnabled('express-checkout', context)) {
    return expressCheckout(req, res);
  }
  return standardCheckout(req, res);
});

---
// React with Feature Flag Provider
import { FlagProvider, useFlag } from '@unleash/proxy-client-react';

function App() {
  return (
    <FlagProvider config={{
      url: 'https://unleash-proxy.mycompany.com',
      clientKey: 'client-key',
      appName: 'frontend'
    }}>
      <Dashboard />
    </FlagProvider>
  );
}

function Dashboard() {
  const enabled = useFlag('new-dashboard');

  return enabled ? <NewDashboard /> : <LegacyDashboard />;
}`
        },
        {
          name: 'Targeting Strategies',
          explanation: 'Percentage rollout: 10% -> 50% -> 100% of users. User targeting: Enable for specific user IDs or emails. Group targeting: Enable for beta testers, premium users. Geographic targeting: Roll out by region. Time-based targeting: Enable during business hours. Custom rules: Combine multiple conditions.',
          codeExample: `// LaunchDarkly Targeting Rules (JSON Configuration)
{
  "key": "new-payment-flow",
  "on": true,
  "targets": [
    {
      "values": ["user-123", "user-456"],  // Specific users
      "variation": 0  // true
    }
  ],
  "rules": [
    {
      // Internal employees first
      "clauses": [
        {
          "attribute": "email",
          "op": "endsWith",
          "values": ["@mycompany.com"]
        }
      ],
      "variation": 0  // true
    },
    {
      // Beta testers
      "clauses": [
        {
          "attribute": "betaTester",
          "op": "in",
          "values": [true]
        }
      ],
      "variation": 0  // true
    },
    {
      // Geographic rollout - US first
      "clauses": [
        {
          "attribute": "country",
          "op": "in",
          "values": ["US", "CA"]
        }
      ],
      "rollout": {
        "variations": [
          { "variation": 0, "weight": 50000 },  // 50% get new
          { "variation": 1, "weight": 50000 }   // 50% get old
        ]
      }
    }
  ],
  // Default: 10% rollout for everyone else
  "fallthrough": {
    "rollout": {
      "variations": [
        { "variation": 0, "weight": 10000 },   // 10% new
        { "variation": 1, "weight": 90000 }    // 90% old
      ]
    }
  },
  "offVariation": 1  // false when flag is off
}

// Gradual Rollout Script
async function increaseRollout(flagKey: string, newPercentage: number) {
  await ldApiClient.patchFeatureFlag(
    'production',
    flagKey,
    [{
      op: 'replace',
      path: '/fallthrough/rollout/variations/0/weight',
      value: newPercentage * 1000  // LaunchDarkly uses thousandths
    }]
  );
}`
        }
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Validation',
      icon: '📊',
      color: '#06b6d4',
      description: 'Track error rate (< 1%), latency p95 (< 500ms), CPU/memory usage via Prometheus/Datadog, ELK/Splunk logs. Automated smoke tests and health checks within 5-10 minutes post-deployment.',
      diagram: MonitoringDiagram,
      details: [
        {
          name: 'Health Checks',
          diagram: MonitoringDiagram,
          explanation: 'Verify liveness and readiness probes are passing. Check all pods/instances are in healthy state. Load balancer health checks should be green. Startup time should be within acceptable range. No crash loops or OOMKilled events. Database connections established successfully.',
          codeExample: `# Post-deployment health verification script
#!/bin/bash
set -e

DEPLOYMENT="my-app"
NAMESPACE="production"
TIMEOUT=300

echo "Waiting for deployment to be ready..."
kubectl rollout status deployment/\$DEPLOYMENT -n \$NAMESPACE --timeout=\${TIMEOUT}s

echo "Checking pod health..."
READY_PODS=\$(kubectl get deployment \$DEPLOYMENT -n \$NAMESPACE \\
  -o jsonpath='{.status.readyReplicas}')
DESIRED_PODS=\$(kubectl get deployment \$DEPLOYMENT -n \$NAMESPACE \\
  -o jsonpath='{.spec.replicas}')

if [ "\$READY_PODS" != "\$DESIRED_PODS" ]; then
  echo "ERROR: Only \$READY_PODS/\$DESIRED_PODS pods ready"
  exit 1
fi

echo "Checking for crash loops..."
RESTARTS=\$(kubectl get pods -n \$NAMESPACE -l app=\$DEPLOYMENT \\
  -o jsonpath='{.items[*].status.containerStatuses[*].restartCount}' \\
  | tr ' ' '+' | bc)

if [ "\$RESTARTS" -gt 0 ]; then
  echo "WARNING: \$RESTARTS total restarts detected"
fi

echo "Checking for OOMKilled events..."
kubectl get events -n \$NAMESPACE --field-selector=reason=OOMKilled \\
  --sort-by='.lastTimestamp' | tail -5

echo "Verifying endpoints are healthy..."
kubectl get endpoints \$DEPLOYMENT -n \$NAMESPACE

echo "All health checks passed!"`
        },
        {
          name: 'Metrics & Dashboards',
          explanation: 'Key metrics to monitor: request rate, error rate (4xx/5xx), latency (p50, p95, p99), CPU and memory usage. Use Prometheus, Datadog, or New Relic for metrics collection. Create deployment dashboards in Grafana. Set up comparative views: before vs after deployment. Track business metrics: conversion, engagement.',
          codeExample: `# Prometheus queries for deployment monitoring
# Grafana Dashboard JSON export style

# Request Rate (RPS)
sum(rate(http_requests_total{app="my-app"}[5m])) by (version)

# Error Rate (%)
sum(rate(http_requests_total{app="my-app",status=~"5.."}[5m]))
/
sum(rate(http_requests_total{app="my-app"}[5m])) * 100

# Latency p95
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket{app="my-app"}[5m]))
  by (le, version)
)

# Latency p99
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket{app="my-app"}[5m]))
  by (le)
)

---
# Datadog monitoring configuration
# datadog-monitors.yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMonitor
metadata:
  name: deployment-error-rate
spec:
  name: "[Production] Error Rate > 5%"
  type: query alert
  query: |
    sum:http.requests{app:my-app,status_code:5*}.as_rate()
    / sum:http.requests{app:my-app}.as_rate() * 100
  message: |
    Error rate is {{value}}% (threshold: 5%)
    Deployment may need rollback.
    @slack-oncall @pagerduty
  thresholds:
    critical: 5
    warning: 2
  tags:
    - team:platform
    - env:production`
        },
        {
          name: 'Logging',
          explanation: 'Aggregate logs with ELK stack, Splunk, or Loki. Search for errors and exceptions. Check startup logs for configuration issues. Monitor warning patterns. Set up log-based alerts for critical errors. Ensure structured logging for better searchability.',
          codeExample: `# Loki log queries for deployment validation

# Errors in the last 15 minutes
{app="my-app", namespace="production"} |= "ERROR"

# Startup logs for new pods
{app="my-app"} |= "Application started" | json

# Stack traces
{app="my-app"} |~ "Exception|Error" |= "at " | line_format "{{.message}}"

# Count errors by type
sum by (error_type) (
  count_over_time({app="my-app"} | json | error_type != "" [5m])
)

---
# Structured logging setup (Node.js with Pino)
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label })
  },
  base: {
    app: 'my-app',
    version: process.env.APP_VERSION,
    env: process.env.NODE_ENV
  }
});

// Log with context
logger.info({
  event: 'deployment_complete',
  version: '2.0.0',
  duration_ms: 45000
}, 'Application deployed successfully');

logger.error({
  event: 'database_connection_failed',
  error: err.message,
  stack: err.stack,
  host: dbHost
}, 'Failed to connect to database');

---
# ELK Alert for critical errors
POST _watcher/watch/deployment-errors
{
  "trigger": { "schedule": { "interval": "1m" } },
  "input": {
    "search": {
      "request": {
        "indices": ["logs-production-*"],
        "body": {
          "query": {
            "bool": {
              "must": [
                { "match": { "level": "error" } },
                { "range": { "@timestamp": { "gte": "now-5m" } } }
              ]
            }
          }
        }
      }
    }
  },
  "condition": { "compare": { "ctx.payload.hits.total": { "gt": 10 } } },
  "actions": { "slack_alert": { ... } }
}`
        },
        {
          name: 'Smoke Tests',
          explanation: 'Run automated tests against production. Verify critical API endpoints respond correctly. Test authentication and authorization flows. Check database connectivity. Verify external integrations. Test critical user journeys. Automated smoke test suite should complete within minutes.',
          codeExample: `# Production smoke test script
#!/bin/bash

BASE_URL="https://api.myapp.com"
FAILURES=0

# Health check
echo "Testing health endpoint..."
HEALTH=\$(curl -s -o /dev/null -w "%{http_code}" \$BASE_URL/health)
if [ "\$HEALTH" != "200" ]; then
  echo "FAIL: Health check returned \$HEALTH"
  ((FAILURES++))
fi

# API endpoints
echo "Testing API endpoints..."
for endpoint in "/api/users" "/api/products" "/api/orders"; do
  STATUS=\$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer \$TOKEN" \$BASE_URL\$endpoint)
  if [ "\$STATUS" != "200" ]; then
    echo "FAIL: \$endpoint returned \$STATUS"
    ((FAILURES++))
  fi
done

# Response time check
echo "Checking response times..."
RESPONSE_TIME=\$(curl -s -o /dev/null -w "%{time_total}" \$BASE_URL/api/products)
if (( \$(echo "\$RESPONSE_TIME > 2.0" | bc -l) )); then
  echo "WARN: Slow response time: \${RESPONSE_TIME}s"
fi

exit \$FAILURES

---
# Jest/Playwright E2E smoke tests
// smoke.test.ts
import { test, expect } from '@playwright/test';

test.describe('Production Smoke Tests', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('https://myapp.com');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveTitle(/MyApp/);
  });

  test('login flow works', async ({ page }) => {
    await page.goto('https://myapp.com/login');
    await page.fill('[name="email"]', 'smoke@test.com');
    await page.fill('[name="password"]', process.env.SMOKE_TEST_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page.locator('.dashboard')).toBeVisible();
  });

  test('critical API responds', async ({ request }) => {
    const response = await request.get('https://api.myapp.com/health');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.status).toBe('healthy');
  });
});`
        }
      ]
    },
    {
      id: 'rollback',
      name: 'Rollback Strategy',
      icon: '⏮️',
      color: '#ef4444',
      description: 'Trigger on error rate > 5%, latency > 500ms, or critical failure. kubectl rollout undo, Helm rollback, Argo Rollouts support. Backward-compatible migrations for database safety.',
      diagram: RollbackDiagram,
      details: [
        {
          name: 'Rollback Triggers',
          diagram: RollbackDiagram,
          explanation: 'Define clear criteria for rollback: Error rate exceeds threshold (typically 5%). Response time degrades significantly (>50% increase). Critical functionality is broken. Database corruption detected. Security vulnerability discovered. Manual decision by on-call engineer.',
          codeExample: `# Automated rollback with Prometheus alerting
# prometheus-rules.yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: deployment-rollback-triggers
spec:
  groups:
  - name: deployment-health
    rules:
    - alert: HighErrorRate
      expr: |
        sum(rate(http_requests_total{status=~"5.."}[5m]))
        / sum(rate(http_requests_total[5m])) > 0.05
      for: 2m
      labels:
        severity: critical
        action: rollback
      annotations:
        summary: "Error rate exceeds 5%"
        runbook: "Execute: kubectl rollout undo deployment/my-app"

    - alert: HighLatency
      expr: |
        histogram_quantile(0.95,
          sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
        ) > 0.5
      for: 3m
      labels:
        severity: critical
        action: rollback
      annotations:
        summary: "P95 latency exceeds 500ms"

    - alert: PodCrashLooping
      expr: |
        increase(kube_pod_container_status_restarts_total[15m]) > 3
      labels:
        severity: critical
        action: rollback

---
# Flagger automatic rollback configuration
apiVersion: flagger.app/v1beta1
kind: Canary
spec:
  analysis:
    threshold: 3  # Rollback after 3 failed checks
    metrics:
    - name: request-success-rate
      thresholdRange:
        min: 95  # Rollback if success rate < 95%
    - name: request-duration
      thresholdRange:
        max: 500  # Rollback if p99 > 500ms`
        },
        {
          name: 'Kubernetes Rollback',
          explanation: 'Use kubectl rollout undo deployment/name for instant rollback. Rollback to specific revision with --to-revision flag. Check revision history with kubectl rollout history. Helm rollback for Helm-managed releases. Keep previous ReplicaSets for rollback (revisionHistoryLimit). Automated rollback with Argo Rollouts or Flagger.',
          codeExample: `# Kubernetes rollback commands

# View deployment history
kubectl rollout history deployment/my-app -n production
# REVISION  CHANGE-CAUSE
# 1         Initial deployment
# 2         Update to v1.1.0
# 3         Update to v2.0.0 (current - problematic)

# Rollback to previous version (revision 2)
kubectl rollout undo deployment/my-app -n production

# Rollback to specific revision
kubectl rollout undo deployment/my-app --to-revision=1 -n production

# Watch rollback progress
kubectl rollout status deployment/my-app -n production

# Verify rollback
kubectl get deployment my-app -n production -o jsonpath='{.spec.template.spec.containers[0].image}'

---
# Helm rollback
# View release history
helm history my-app -n production
# REVISION  STATUS      CHART           DESCRIPTION
# 1         superseded  my-app-1.0.0    Install complete
# 2         superseded  my-app-1.1.0    Upgrade complete
# 3         deployed    my-app-2.0.0    Upgrade complete

# Rollback to previous release
helm rollback my-app 2 -n production

# Rollback with wait and timeout
helm rollback my-app 2 -n production --wait --timeout=5m

---
# Argo Rollouts rollback
# Abort current rollout and rollback
kubectl argo rollouts abort my-app -n production

# Undo to previous stable version
kubectl argo rollouts undo my-app -n production

# View rollout status
kubectl argo rollouts get rollout my-app -n production --watch`
        },
        {
          name: 'Database Rollback',
          explanation: 'Most complex part of rollback. Use backward-compatible migrations (expand-contract pattern). Keep rollback scripts for each migration. Test rollback scripts in staging. For major issues, restore from backup. Point-in-time recovery for data corruption. Consider database migration in separate deployment.',
          codeExample: `# Flyway migration with rollback support
# V2__add_user_preferences.sql (forward migration)
ALTER TABLE users ADD COLUMN preferences JSONB;
CREATE INDEX idx_users_preferences ON users USING GIN(preferences);

# U2__add_user_preferences.sql (undo migration)
DROP INDEX IF EXISTS idx_users_preferences;
ALTER TABLE users DROP COLUMN IF EXISTS preferences;

---
# Expand-Contract Pattern (Backward Compatible)

# Step 1: EXPAND - Add new column, keep old
ALTER TABLE orders ADD COLUMN customer_id UUID;
-- Application writes to BOTH order_customer and customer_id
-- Old version reads order_customer, new version reads customer_id

# Step 2: MIGRATE - Backfill data
UPDATE orders SET customer_id = (
  SELECT id FROM customers WHERE customer_name = orders.order_customer
);

# Step 3: CONTRACT - Remove old column (after full rollout)
ALTER TABLE orders DROP COLUMN order_customer;

---
# PostgreSQL Point-in-Time Recovery
# Rollback to specific timestamp

# 1. Stop the database
pg_ctl stop -D /var/lib/postgresql/data

# 2. Create recovery.conf
cat > /var/lib/postgresql/data/recovery.conf << EOF
restore_command = 'cp /backup/wal/%f %p'
recovery_target_time = '2024-01-15 14:30:00 UTC'
recovery_target_action = 'promote'
EOF

# 3. Start recovery
pg_ctl start -D /var/lib/postgresql/data

---
# AWS RDS Point-in-Time Recovery
aws rds restore-db-instance-to-point-in-time \\
  --source-db-instance-identifier production-db \\
  --target-db-instance-identifier production-db-restored \\
  --restore-time "2024-01-15T14:30:00Z" \\
  --db-instance-class db.r5.large`
        },
        {
          name: 'Post-Rollback',
          explanation: 'Verify application is stable after rollback. Document the incident and failure reasons. Perform root cause analysis. Fix issues in development environment. Update deployment process to prevent recurrence. Communicate with stakeholders. Schedule fix deployment with additional safeguards.',
          codeExample: `# Post-rollback verification script
#!/bin/bash

DEPLOYMENT="my-app"
NAMESPACE="production"

echo "=== Post-Rollback Verification ==="

# 1. Verify deployment is stable
echo "Checking deployment status..."
kubectl rollout status deployment/\$DEPLOYMENT -n \$NAMESPACE

# 2. Check pod health
echo "Verifying pod health..."
kubectl get pods -n \$NAMESPACE -l app=\$DEPLOYMENT -o wide

# 3. Check recent events
echo "Checking cluster events..."
kubectl get events -n \$NAMESPACE --sort-by='.lastTimestamp' | tail -20

# 4. Verify metrics are stabilizing
echo "Checking Prometheus metrics..."
curl -s "http://prometheus:9090/api/v1/query?query=sum(rate(http_requests_total{app=\"\$DEPLOYMENT\",status=~\"5..\"}[5m]))" \\
  | jq '.data.result[0].value[1]'

# 5. Run smoke tests
echo "Running smoke tests..."
./run-smoke-tests.sh production

---
# Incident documentation template (post-mortem)
# incident-2024-01-15.md

## Incident Summary
- **Date**: 2024-01-15 14:30 UTC
- **Duration**: 15 minutes
- **Impact**: 5% of users experienced 500 errors
- **Severity**: P2

## Timeline
- 14:15 - Deployment v2.0.0 started
- 14:25 - Error rate increased to 8%
- 14:28 - Alert triggered, on-call notified
- 14:30 - Rollback initiated
- 14:32 - Rollback complete, errors resolved

## Root Cause
Database connection pool exhausted due to missing
connection timeout configuration in new version.

## Action Items
- [ ] Add connection pool monitoring dashboard
- [ ] Add integration test for connection handling
- [ ] Update deployment checklist with DB config verification
- [ ] Schedule v2.0.1 deployment with fix

---
# Slack notification for stakeholders
curl -X POST \$SLACK_WEBHOOK -H 'Content-type: application/json' -d '{
  "text": ":warning: Deployment Rollback Completed",
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Rollback Summary*\\n- App: my-app\\n- Reverted: v2.0.0 -> v1.9.0\\n- Duration: 15 minutes\\n- Status: Stable"
      }
    }
  ]
}'`
        }
      ]
    },
    {
      id: 'post-deployment',
      name: 'Post-Deployment',
      icon: '✅',
      color: '#14b8a6',
      description: 'Load test performance baseline, verify memory stability, document changes/incidents. Update release notes, close tickets, scale down old infrastructure, clean feature flags.',
      diagram: PostDeploymentDiagram,
      details: [
        {
          name: 'Performance Validation',
          diagram: PostDeploymentDiagram,
          explanation: 'Run load tests to validate production performance. Compare response times with previous version baseline. Verify throughput meets expected load. Check memory usage is stable (no leaks). Monitor CPU usage under normal and peak load. Database query performance should be acceptable.',
          codeExample: `# K6 load test for performance validation
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const latency = new Trend('latency');

export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp up
    { duration: '5m', target: 100 },   // Steady state
    { duration: '2m', target: 200 },   // Peak load
    { duration: '5m', target: 200 },   // Sustained peak
    { duration: '2m', target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // P95 < 500ms
    errors: ['rate<0.01'],              // Error rate < 1%
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://api.myapp.com/api/products');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  errorRate.add(res.status !== 200);
  latency.add(res.timings.duration);

  sleep(1);
}

---
# Run load test and compare with baseline
k6 run --out json=results.json load-test.js

# Compare with previous deployment
python compare-results.py baseline.json results.json
# Output:
# P95 Latency: 245ms -> 252ms (+2.8%) OK
# Error Rate: 0.5% -> 0.6% (+0.1%) OK
# Throughput: 1200 rps -> 1180 rps (-1.7%) OK`
        },
        {
          name: 'Documentation',
          explanation: 'Create deployment report: version, changes, duration, issues encountered. Update release notes for users. Document any known issues. Update runbooks with new procedures. Record metrics comparison (before/after). Archive deployment artifacts.',
          codeExample: `# Automated release notes generation
# .github/workflows/release-notes.yml
name: Generate Release Notes
on:
  release:
    types: [published]

jobs:
  release-notes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate Changelog
        id: changelog
        run: |
          PREVIOUS_TAG=\$(git describe --tags --abbrev=0 HEAD^)
          echo "## What's Changed" > CHANGELOG.md
          echo "" >> CHANGELOG.md

          # Features
          echo "### Features" >> CHANGELOG.md
          git log \$PREVIOUS_TAG..HEAD --oneline --grep="feat:" \\
            | sed 's/^/* /' >> CHANGELOG.md

          # Bug Fixes
          echo "### Bug Fixes" >> CHANGELOG.md
          git log \$PREVIOUS_TAG..HEAD --oneline --grep="fix:" \\
            | sed 's/^/* /' >> CHANGELOG.md

      - name: Update GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          body_path: CHANGELOG.md

---
# Deployment report template
# deployment-report-v2.0.0.md

## Deployment Report

| Field | Value |
|-------|-------|
| Version | v2.0.0 |
| Date | 2024-01-15 14:00 UTC |
| Duration | 12 minutes |
| Deployer | @engineer |
| Status | Success |

### Changes Included
- feat: Add user preferences API
- feat: Implement caching layer
- fix: Resolve timeout issue in payments

### Metrics Comparison
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| P95 Latency | 245ms | 220ms | -10% |
| Error Rate | 0.5% | 0.3% | -40% |
| CPU Usage | 45% | 42% | -7% |

### Known Issues
- None

### Rollback Plan
\`kubectl rollout undo deployment/my-app -n production\``
        },
        {
          name: 'Notification',
          explanation: 'Notify team via Slack/Teams about deployment completion. Send email to stakeholders with summary. Update status page if applicable. Close related tickets and issues. Tag release in version control. Update deployment calendar.',
          codeExample: `# Slack deployment notification
# notify-deployment.sh
#!/bin/bash

VERSION=\$1
ENVIRONMENT=\$2
STATUS=\$3

curl -X POST \$SLACK_WEBHOOK \\
  -H 'Content-type: application/json' \\
  -d "{
    \"blocks\": [
      {
        \"type\": \"header\",
        \"text\": {
          \"type\": \"plain_text\",
          \"text\": \"Deployment Complete\"
        }
      },
      {
        \"type\": \"section\",
        \"fields\": [
          { \"type\": \"mrkdwn\", \"text\": \"*Version:*\\n\$VERSION\" },
          { \"type\": \"mrkdwn\", \"text\": \"*Environment:*\\n\$ENVIRONMENT\" },
          { \"type\": \"mrkdwn\", \"text\": \"*Status:*\\n\$STATUS\" },
          { \"type\": \"mrkdwn\", \"text\": \"*Time:*\\n\$(date -u +\"%Y-%m-%d %H:%M UTC\")\" }
        ]
      },
      {
        \"type\": \"actions\",
        \"elements\": [
          {
            \"type\": \"button\",
            \"text\": { \"type\": \"plain_text\", \"text\": \"View Dashboard\" },
            \"url\": \"https://grafana.company.com/d/deployment\"
          },
          {
            \"type\": \"button\",
            \"text\": { \"type\": \"plain_text\", \"text\": \"Release Notes\" },
            \"url\": \"https://github.com/company/app/releases/tag/\$VERSION\"
          }
        ]
      }
    ]
  }"

---
# Close Jira tickets via API
curl -X POST "https://company.atlassian.net/rest/api/3/issue/PROJ-123/transitions" \\
  -H "Authorization: Basic \$JIRA_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"transition": {"id": "31"}}'  # 31 = Done

# Update Statuspage
curl -X POST "https://api.statuspage.io/v1/pages/\$PAGE_ID/incidents" \\
  -H "Authorization: OAuth \$STATUSPAGE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "incident": {
      "name": "Scheduled Maintenance Complete",
      "status": "resolved",
      "body": "Deployment v2.0.0 completed successfully."
    }
  }'`
        },
        {
          name: 'Cleanup',
          explanation: 'Scale down or delete old deployment resources. Remove old Docker images from registry (keep recent versions). Archive old database backups. Clean CI/CD pipeline artifacts. Update feature flags (remove completed rollout flags). Schedule technical debt cleanup.',
          codeExample: `# Cleanup script for post-deployment
#!/bin/bash

echo "=== Post-Deployment Cleanup ==="

# 1. Scale down old blue-green environment
echo "Scaling down old deployment..."
kubectl scale deployment/my-app-blue --replicas=0 -n production

# 2. Clean up old Docker images (keep last 5)
echo "Cleaning old Docker images..."
aws ecr describe-images \\
  --repository-name my-app \\
  --query 'sort_by(imageDetails,& imagePushedAt)[:-5].imageDigest' \\
  --output text | while read digest; do
    aws ecr batch-delete-image \\
      --repository-name my-app \\
      --image-ids imageDigest=\$digest
done

# 3. Clean up old Helm releases
echo "Cleaning Helm history..."
helm history my-app -n production --max 10

# 4. Archive old database backups (keep 30 days)
echo "Archiving old backups..."
aws s3 ls s3://backups/database/ | while read -r line; do
  createDate=\$(echo \$line | awk '{print \$1}')
  if [[ \$(date -d "\$createDate" +%s) -lt \$(date -d "30 days ago" +%s) ]]; then
    fileName=\$(echo \$line | awk '{print \$4}')
    aws s3 mv s3://backups/database/\$fileName s3://backups-archive/database/
  fi
done

---
# Feature flag cleanup (LaunchDarkly API)
# Remove fully rolled out flags
curl -X DELETE "https://app.launchdarkly.com/api/v2/flags/production/old-checkout-experiment" \\
  -H "Authorization: \$LD_API_KEY"

# List stale flags (not evaluated in 30 days)
curl "https://app.launchdarkly.com/api/v2/flags/production?filter=state:stale" \\
  -H "Authorization: \$LD_API_KEY" | jq '.items[].key'

---
# Kubernetes cleanup job
apiVersion: batch/v1
kind: CronJob
metadata:
  name: deployment-cleanup
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: cleanup
            image: bitnami/kubectl
            command:
            - /bin/sh
            - -c
            - |
              # Delete completed jobs older than 24h
              kubectl delete jobs --field-selector status.successful=1 \\
                --all-namespaces

              # Delete old ReplicaSets with 0 replicas
              kubectl get rs --all-namespaces -o json | \\
                jq -r '.items[] | select(.spec.replicas==0) | \\
                "\\(.metadata.namespace)/\\(.metadata.name)"' | \\
                xargs -I {} kubectl delete rs {}
          restartPolicy: OnFailure`
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
      { name: 'DevOps', icon: '🔧', page: 'DevOps' },
      { name: 'Deployment', icon: '🚀', page: 'Deployment' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #14532d 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #86efac, #22c55e)',
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
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Production Deployment</h1>
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
          ← Back to DevOps
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={DEPLOYMENT_COLORS}
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
              colors={DEPLOYMENT_COLORS}
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
                      language="yaml"
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

export default Deployment

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

const CICD_COLORS = {
  primary: '#0ea5e9',
  primaryHover: '#38bdf8',
  bg: 'rgba(14, 165, 233, 0.1)',
  border: 'rgba(14, 165, 233, 0.3)',
  arrow: '#0ea5e9',
  hoverBg: 'rgba(14, 165, 233, 0.2)',
  topicBg: 'rgba(14, 165, 233, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// CI/CD Pipeline Diagram - Full pipeline from commit to production
const CICDPipelineDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="pipelineArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">CI/CD Pipeline Flow</text>

    {/* Commit */}
    <rect x="20" y="60" width="90" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="65" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Commit</text>
    <text x="65" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="8">Git Push</text>

    {/* Build */}
    <rect x="130" y="60" width="90" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="175" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Build</text>
    <text x="175" y="100" textAnchor="middle" fill="#bbf7d0" fontSize="8">{`Compile & Package`}</text>

    {/* Test */}
    <rect x="240" y="60" width="90" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="285" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Test</text>
    <text x="285" y="100" textAnchor="middle" fill="#fef3c7" fontSize="8">{`Unit & Integration`}</text>

    {/* Quality */}
    <rect x="350" y="60" width="90" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="395" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Quality</text>
    <text x="395" y="100" textAnchor="middle" fill="#ddd6fe" fontSize="8">SonarQube</text>

    {/* Security */}
    <rect x="460" y="60" width="90" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="505" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Security</text>
    <text x="505" y="100" textAnchor="middle" fill="#fecaca" fontSize="8">SAST/DAST</text>

    {/* Package */}
    <rect x="570" y="60" width="90" height="60" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="615" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Package</text>
    <text x="615" y="100" textAnchor="middle" fill="#a5f3fc" fontSize="8">Docker Image</text>

    {/* Deploy */}
    <rect x="680" y="60" width="90" height="60" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="725" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Deploy</text>
    <text x="725" y="100" textAnchor="middle" fill="#fbcfe8" fontSize="8">Production</text>

    {/* Arrows */}
    <path d="M 110 90 L 125 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#pipelineArrow)"/>
    <path d="M 220 90 L 235 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#pipelineArrow)"/>
    <path d="M 330 90 L 345 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#pipelineArrow)"/>
    <path d="M 440 90 L 455 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#pipelineArrow)"/>
    <path d="M 550 90 L 565 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#pipelineArrow)"/>
    <path d="M 660 90 L 675 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#pipelineArrow)"/>

    {/* Labels */}
    <rect x="150" y="145" width="500" height="35" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="400" y="165" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Continuous Integration → Continuous Delivery → Continuous Deployment</text>
  </svg>
)

// Branching Strategy Diagram - GitFlow
const BranchingStrategyDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Git Branching Strategy</text>

    {/* Main branch */}
    <line x1="50" y1="60" x2="750" y2="60" stroke="#22c55e" strokeWidth="4"/>
    <text x="30" y="65" textAnchor="end" fill="#4ade80" fontSize="10" fontWeight="bold">main</text>
    <circle cx="150" cy="60" r="8" fill="#22c55e"/>
    <circle cx="400" cy="60" r="8" fill="#22c55e"/>
    <circle cx="650" cy="60" r="8" fill="#22c55e"/>

    {/* Develop branch */}
    <line x1="150" y1="60" x2="150" y2="100" stroke="#3b82f6" strokeWidth="2"/>
    <line x1="150" y1="100" x2="650" y2="100" stroke="#3b82f6" strokeWidth="4"/>
    <line x1="650" y1="100" x2="650" y2="60" stroke="#3b82f6" strokeWidth="2"/>
    <text x="30" y="105" textAnchor="end" fill="#60a5fa" fontSize="10" fontWeight="bold">develop</text>
    <circle cx="250" cy="100" r="6" fill="#3b82f6"/>
    <circle cx="350" cy="100" r="6" fill="#3b82f6"/>
    <circle cx="550" cy="100" r="6" fill="#3b82f6"/>

    {/* Feature branch */}
    <line x1="250" y1="100" x2="250" y2="140" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="250" y1="140" x2="350" y2="140" stroke="#f59e0b" strokeWidth="3"/>
    <line x1="350" y1="140" x2="350" y2="100" stroke="#f59e0b" strokeWidth="2"/>
    <text x="300" y="158" textAnchor="middle" fill="#fbbf24" fontSize="9">feature/add-login</text>
    <circle cx="280" cy="140" r="5" fill="#f59e0b"/>
    <circle cx="320" cy="140" r="5" fill="#f59e0b"/>

    {/* Release branch */}
    <line x1="550" y1="100" x2="550" y2="140" stroke="#8b5cf6" strokeWidth="2"/>
    <line x1="550" y1="140" x2="620" y2="140" stroke="#8b5cf6" strokeWidth="3"/>
    <line x1="620" y1="140" x2="620" y2="100" stroke="#8b5cf6" strokeWidth="2"/>
    <line x1="620" y1="100" x2="650" y2="60" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4"/>
    <text x="585" y="158" textAnchor="middle" fill="#a78bfa" fontSize="9">release/v1.0</text>
    <circle cx="585" cy="140" r="5" fill="#8b5cf6"/>

    {/* Hotfix branch */}
    <line x1="400" y1="60" x2="400" y2="35" stroke="#ef4444" strokeWidth="2"/>
    <line x1="400" y1="35" x2="480" y2="35" stroke="#ef4444" strokeWidth="3"/>
    <line x1="480" y1="35" x2="480" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
    <line x1="480" y1="60" x2="480" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
    <text x="440" y="28" textAnchor="middle" fill="#f87171" fontSize="9">hotfix/bug-fix</text>
    <circle cx="440" cy="35" r="5" fill="#ef4444"/>

    {/* Legend */}
    <rect x="50" y="180" width="700" height="30" rx="4" fill="rgba(100, 116, 139, 0.1)" stroke="#475569" strokeWidth="1"/>
    <circle cx="100" cy="195" r="5" fill="#22c55e"/>
    <text x="115" y="199" fill="#94a3b8" fontSize="9">main</text>
    <circle cx="200" cy="195" r="5" fill="#3b82f6"/>
    <text x="215" y="199" fill="#94a3b8" fontSize="9">develop</text>
    <circle cx="310" cy="195" r="5" fill="#f59e0b"/>
    <text x="325" y="199" fill="#94a3b8" fontSize="9">feature</text>
    <circle cx="420" cy="195" r="5" fill="#8b5cf6"/>
    <text x="435" y="199" fill="#94a3b8" fontSize="9">release</text>
    <circle cx="530" cy="195" r="5" fill="#ef4444"/>
    <text x="545" y="199" fill="#94a3b8" fontSize="9">hotfix</text>
  </svg>
)

// Artifact Flow Diagram - Build → Store → Deploy
const ArtifactFlowDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="artifactArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Artifact Flow: Build to Deploy</text>

    {/* Source Code */}
    <rect x="30" y="55" width="120" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="90" y="80" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Source Code</text>
    <text x="90" y="100" textAnchor="middle" fill="#93c5fd" fontSize="8">Git Repository</text>
    <text x="90" y="115" textAnchor="middle" fill="#93c5fd" fontSize="7">GitHub/GitLab</text>

    {/* Build System */}
    <rect x="200" y="55" width="120" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="260" y="80" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Build System</text>
    <text x="260" y="100" textAnchor="middle" fill="#86efac" fontSize="8">Maven/Gradle</text>
    <text x="260" y="115" textAnchor="middle" fill="#86efac" fontSize="7">{`Compile & Test`}</text>

    {/* Artifact Repository */}
    <rect x="370" y="55" width="120" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="430" y="80" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Artifact Store</text>
    <text x="430" y="100" textAnchor="middle" fill="#fcd34d" fontSize="8">Container Registry</text>
    <text x="430" y="115" textAnchor="middle" fill="#fcd34d" fontSize="7">Nexus/Artifactory</text>

    {/* Deployment */}
    <rect x="540" y="55" width="120" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="600" y="80" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Deploy</text>
    <text x="600" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="8">Kubernetes</text>
    <text x="600" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="7">ArgoCD/Helm</text>

    {/* Production */}
    <rect x="710" y="55" width="70" height="70" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="745" y="85" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Prod</text>
    <text x="745" y="105" textAnchor="middle" fill="#fbcfe8" fontSize="8">Live</text>

    {/* Arrows */}
    <path d="M 150 90 L 195 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#artifactArrow)"/>
    <path d="M 320 90 L 365 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#artifactArrow)"/>
    <path d="M 490 90 L 535 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#artifactArrow)"/>
    <path d="M 660 90 L 705 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#artifactArrow)"/>

    {/* Artifact labels */}
    <text x="172" y="78" textAnchor="middle" fill="#60a5fa" fontSize="7">push</text>
    <text x="342" y="78" textAnchor="middle" fill="#4ade80" fontSize="7">jar/image</text>
    <text x="512" y="78" textAnchor="middle" fill="#fbbf24" fontSize="7">pull</text>
    <text x="682" y="78" textAnchor="middle" fill="#a78bfa" fontSize="7">rollout</text>

    {/* Footer */}
    <rect x="100" y="145" width="600" height="25" rx="4" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="400" y="162" textAnchor="middle" fill="#60a5fa" fontSize="9">Versioned artifacts ensure reproducible deployments across environments</text>
  </svg>
)

// Environment Promotion Diagram - Dev → Staging → Prod
const EnvironmentPromotionDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="envArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Environment Promotion Strategy</text>

    {/* Development */}
    <rect x="50" y="50" width="180" height="90" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Development</text>
    <text x="140" y="95" textAnchor="middle" fill="#86efac" fontSize="9">Automatic Deploy</text>
    <text x="140" y="115" textAnchor="middle" fill="#86efac" fontSize="8">On every commit</text>
    <text x="140" y="130" textAnchor="middle" fill="#86efac" fontSize="8">Feature testing</text>

    {/* Staging */}
    <rect x="310" y="50" width="180" height="90" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Staging</text>
    <text x="400" y="95" textAnchor="middle" fill="#fcd34d" fontSize="9">Automatic on main</text>
    <text x="400" y="115" textAnchor="middle" fill="#fcd34d" fontSize="8">Integration tests</text>
    <text x="400" y="130" textAnchor="middle" fill="#fcd34d" fontSize="8">Performance tests</text>

    {/* Production */}
    <rect x="570" y="50" width="180" height="90" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="660" y="75" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Production</text>
    <text x="660" y="95" textAnchor="middle" fill="#fca5a5" fontSize="9">Manual Approval</text>
    <text x="660" y="115" textAnchor="middle" fill="#fca5a5" fontSize="8">Canary/Blue-Green</text>
    <text x="660" y="130" textAnchor="middle" fill="#fca5a5" fontSize="8">Monitoring enabled</text>

    {/* Arrows */}
    <path d="M 230 95 L 305 95" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#envArrow)"/>
    <path d="M 490 95 L 565 95" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#envArrow)"/>

    {/* Gate labels */}
    <rect x="245" y="75" width="45" height="20" rx="3" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="267" y="89" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">AUTO</text>

    <rect x="505" y="75" width="45" height="20" rx="3" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1"/>
    <text x="527" y="89" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">GATE</text>

    {/* Rollback indicator */}
    <path d="M 660 145 Q 400 180 140 145" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" fill="none"/>
    <text x="400" y="178" textAnchor="middle" fill="#f87171" fontSize="9">Rollback path (if issues detected)</text>
  </svg>
)

// Jenkins Pipeline Diagram
const JenkinsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Jenkins Pipeline Architecture</text>

    {/* Jenkins Controller */}
    <rect x="300" y="45" width="200" height="70" rx="8" fill="rgba(239, 76, 35, 0.3)" stroke="#ef4c23" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Jenkins Controller</text>
    <text x="400" y="90" textAnchor="middle" fill="#fdba74" fontSize="9">Manages pipelines, UI, plugins</text>
    <text x="400" y="105" textAnchor="middle" fill="#fdba74" fontSize="8">Schedules builds</text>

    {/* Agents */}
    <rect x="50" y="140" width="140" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="162" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Agent: Linux</text>
    <text x="120" y="178" textAnchor="middle" fill="#93c5fd" fontSize="8">docker, maven</text>

    <rect x="220" y="140" width="140" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="290" y="162" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Agent: Windows</text>
    <text x="290" y="178" textAnchor="middle" fill="#86efac" fontSize="8">.NET, msbuild</text>

    <rect x="390" y="140" width="140" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="460" y="162" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Agent: K8s Pod</text>
    <text x="460" y="178" textAnchor="middle" fill="#fcd34d" fontSize="8">ephemeral</text>

    <rect x="560" y="140" width="140" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="630" y="162" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Agent: macOS</text>
    <text x="630" y="178" textAnchor="middle" fill="#c4b5fd" fontSize="8">iOS builds</text>

    {/* Connections */}
    <line x1="340" y1="115" x2="120" y2="140" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <line x1="380" y1="115" x2="290" y2="140" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <line x1="420" y1="115" x2="460" y2="140" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <line x1="460" y1="115" x2="630" y2="140" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
  </svg>
)

// GitLab CI/CD Diagram
const GitLabCICDDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">GitLab CI/CD Pipeline</text>

    {/* GitLab */}
    <rect x="50" y="50" width="120" height="60" rx="6" fill="rgba(252, 109, 38, 0.3)" stroke="#fc6d26" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="bold">GitLab</text>
    <text x="110" y="93" textAnchor="middle" fill="#fdba74" fontSize="8">.gitlab-ci.yml</text>

    {/* Stages */}
    <rect x="200" y="50" width="90" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="245" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Build</text>
    <text x="245" y="90" textAnchor="middle" fill="#86efac" fontSize="8">compile</text>

    <rect x="310" y="50" width="90" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="355" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Test</text>
    <text x="355" y="90" textAnchor="middle" fill="#93c5fd" fontSize="8">unit, e2e</text>

    <rect x="420" y="50" width="90" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="465" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Deploy</text>
    <text x="465" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="8">staging</text>

    {/* Runners */}
    <rect x="550" y="40" width="200" height="80" rx="6" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2"/>
    <text x="650" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">GitLab Runners</text>
    <rect x="565" y="75" width="55" height="30" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="592" y="94" textAnchor="middle" fill="#fbbf24" fontSize="8">Docker</text>
    <rect x="630" y="75" width="55" height="30" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="657" y="94" textAnchor="middle" fill="#22d3ee" fontSize="8">Shell</text>
    <rect x="695" y="75" width="45" height="30" rx="4" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="717" y="94" textAnchor="middle" fill="#f472b6" fontSize="8">K8s</text>

    {/* Arrows */}
    <path d="M 170 80 L 195 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#envArrow)"/>
    <path d="M 290 80 L 305 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#envArrow)"/>
    <path d="M 400 80 L 415 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#envArrow)"/>
    <path d="M 510 80 L 545 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#envArrow)"/>

    {/* Features */}
    <rect x="100" y="140" width="600" height="40" rx="4" fill="rgba(252, 109, 38, 0.1)" stroke="#fc6d26" strokeWidth="1"/>
    <text x="400" y="165" textAnchor="middle" fill="#fb923c" fontSize="9">Auto DevOps • Container Registry • Environments • Review Apps • Security Scanning</text>
  </svg>
)

// GitHub Actions Diagram
const GitHubActionsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">GitHub Actions Workflow</text>

    {/* Trigger Events */}
    <rect x="30" y="45" width="120" height="80" rx="6" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2"/>
    <text x="90" y="65" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Events</text>
    <text x="90" y="82" textAnchor="middle" fill="#cbd5e1" fontSize="8">push</text>
    <text x="90" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="8">pull_request</text>
    <text x="90" y="108" textAnchor="middle" fill="#cbd5e1" fontSize="8">schedule</text>
    <text x="90" y="121" textAnchor="middle" fill="#cbd5e1" fontSize="8">workflow_dispatch</text>

    {/* Workflow */}
    <rect x="180" y="45" width="100" height="80" rx="6" fill="rgba(36, 41, 47, 0.5)" stroke="#30363d" strokeWidth="2"/>
    <text x="230" y="70" textAnchor="middle" fill="#f0f6fc" fontSize="10" fontWeight="bold">Workflow</text>
    <text x="230" y="90" textAnchor="middle" fill="#8b949e" fontSize="8">.github/</text>
    <text x="230" y="103" textAnchor="middle" fill="#8b949e" fontSize="8">workflows/</text>
    <text x="230" y="116" textAnchor="middle" fill="#8b949e" fontSize="8">ci.yml</text>

    {/* Jobs */}
    <rect x="310" y="40" width="220" height="90" rx="6" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="420" y="58" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Jobs (parallel)</text>
    <rect x="325" y="68" width="60" height="50" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="355" y="88" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">build</text>
    <text x="355" y="108" textAnchor="middle" fill="#93c5fd" fontSize="7">ubuntu</text>
    <rect x="395" y="68" width="60" height="50" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="425" y="88" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">test</text>
    <text x="425" y="108" textAnchor="middle" fill="#fcd34d" fontSize="7">matrix</text>
    <rect x="465" y="68" width="55" height="50" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="492" y="88" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="bold">deploy</text>
    <text x="492" y="108" textAnchor="middle" fill="#c4b5fd" fontSize="7">needs</text>

    {/* Runners */}
    <rect x="560" y="45" width="100" height="80" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="610" y="68" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Runners</text>
    <text x="610" y="88" textAnchor="middle" fill="#fbcfe8" fontSize="8">GitHub-hosted</text>
    <text x="610" y="103" textAnchor="middle" fill="#fbcfe8" fontSize="8">Self-hosted</text>
    <text x="610" y="118" textAnchor="middle" fill="#fbcfe8" fontSize="8">Larger runners</text>

    {/* Marketplace */}
    <rect x="690" y="45" width="90" height="80" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="735" y="68" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Marketplace</text>
    <text x="735" y="88" textAnchor="middle" fill="#a5f3fc" fontSize="8">10K+ Actions</text>
    <text x="735" y="103" textAnchor="middle" fill="#a5f3fc" fontSize="8">Reusable</text>
    <text x="735" y="118" textAnchor="middle" fill="#a5f3fc" fontSize="8">workflows</text>

    {/* Footer */}
    <rect x="100" y="150" width="600" height="35" rx="4" fill="rgba(36, 41, 47, 0.3)" stroke="#30363d" strokeWidth="1"/>
    <text x="400" y="172" textAnchor="middle" fill="#8b949e" fontSize="9">Secrets • Environments • OIDC • Artifacts • Caching • Concurrency Control</text>
  </svg>
)

// GitOps Diagram
const GitOpsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">GitOps: Git as Single Source of Truth</text>

    {/* Git Repository */}
    <rect x="50" y="50" width="150" height="90" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="125" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Git Repository</text>
    <text x="125" y="95" textAnchor="middle" fill="#fcd34d" fontSize="9">Declarative Config</text>
    <text x="125" y="112" textAnchor="middle" fill="#fcd34d" fontSize="8">k8s manifests</text>
    <text x="125" y="127" textAnchor="middle" fill="#fcd34d" fontSize="8">Helm charts</text>

    {/* GitOps Operator */}
    <rect x="280" y="50" width="150" height="90" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="355" y="75" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">GitOps Agent</text>
    <text x="355" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="9">ArgoCD / Flux</text>
    <text x="355" y="112" textAnchor="middle" fill="#c4b5fd" fontSize="8">Pull-based sync</text>
    <text x="355" y="127" textAnchor="middle" fill="#c4b5fd" fontSize="8">Drift detection</text>

    {/* Kubernetes */}
    <rect x="510" y="50" width="150" height="90" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="585" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Kubernetes</text>
    <text x="585" y="95" textAnchor="middle" fill="#93c5fd" fontSize="9">Actual State</text>
    <text x="585" y="112" textAnchor="middle" fill="#93c5fd" fontSize="8">deployments</text>
    <text x="585" y="127" textAnchor="middle" fill="#93c5fd" fontSize="8">services, configs</text>

    {/* Arrows */}
    <path d="M 200 95 L 275 95" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#envArrow)"/>
    <text x="237" y="88" textAnchor="middle" fill="#fbbf24" fontSize="8">observe</text>

    <path d="M 430 95 L 505 95" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#envArrow)"/>
    <text x="467" y="88" textAnchor="middle" fill="#a78bfa" fontSize="8">reconcile</text>

    {/* Feedback loop */}
    <path d="M 585 140 Q 585 170 355 170 Q 125 170 125 140" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" fill="none"/>
    <text x="355" y="185" textAnchor="middle" fill="#4ade80" fontSize="9">Continuous reconciliation loop</text>
  </svg>
)

// Testing Strategy Diagram
const TestingDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">CI/CD Testing Pyramid</text>

    {/* Testing Pyramid */}
    <polygon points="400,40 200,180 600,180" fill="none" stroke="#64748b" strokeWidth="2"/>

    {/* Unit Tests - Bottom */}
    <rect x="250" y="145" width="300" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="167" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Unit Tests (70%) - Fast, Isolated, Many</text>

    {/* Integration - Middle */}
    <rect x="290" y="100" width="220" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="122" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Integration Tests (20%)</text>

    {/* E2E - Top */}
    <rect x="340" y="55" width="120" height="35" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="77" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">E2E (10%)</text>

    {/* Side labels */}
    <text x="650" y="165" textAnchor="start" fill="#4ade80" fontSize="9">• JUnit, Mockito</text>
    <text x="650" y="117" textAnchor="start" fill="#fbbf24" fontSize="9">• Testcontainers</text>
    <text x="650" y="72" textAnchor="start" fill="#f87171" fontSize="9">• Selenium, Cypress</text>

    {/* Speed indicator */}
    <text x="170" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">Slow</text>
    <text x="170" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">Fast</text>
    <line x1="170" y1="90" x2="170" y2="150" stroke="#64748b" strokeWidth="1"/>
    <polygon points="170,90 165,100 175,100" fill="#64748b"/>
  </svg>
)

// Best Practices Diagram
const BestPracticesDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">CI/CD Best Practices</text>

    {/* Core Principles */}
    <rect x="50" y="45" width="140" height="65" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="120" y="68" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Fast Feedback</text>
    <text x="120" y="85" textAnchor="middle" fill="#86efac" fontSize="8">&lt;10 min builds</text>
    <text x="120" y="100" textAnchor="middle" fill="#86efac" fontSize="8">Parallel stages</text>

    <rect x="210" y="45" width="140" height="65" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="280" y="68" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Trunk-Based</text>
    <text x="280" y="85" textAnchor="middle" fill="#93c5fd" fontSize="8">Short-lived branches</text>
    <text x="280" y="100" textAnchor="middle" fill="#93c5fd" fontSize="8">Frequent merges</text>

    <rect x="370" y="45" width="140" height="65" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="440" y="68" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Immutable Artifacts</text>
    <text x="440" y="85" textAnchor="middle" fill="#fcd34d" fontSize="8">Build once, deploy many</text>
    <text x="440" y="100" textAnchor="middle" fill="#fcd34d" fontSize="8">Version everything</text>

    <rect x="530" y="45" width="140" height="65" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="600" y="68" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Security Gates</text>
    <text x="600" y="85" textAnchor="middle" fill="#c4b5fd" fontSize="8">SAST/DAST scans</text>
    <text x="600" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="8">Dependency audit</text>

    <rect x="690" y="45" width="90" height="65" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="735" y="68" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Observability</text>
    <text x="735" y="85" textAnchor="middle" fill="#fbcfe8" fontSize="8">Metrics</text>
    <text x="735" y="100" textAnchor="middle" fill="#fbcfe8" fontSize="8">Alerts</text>

    {/* Anti-patterns */}
    <rect x="100" y="130" width="600" height="55" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1" strokeDasharray="4"/>
    <text x="400" y="150" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">⚠️ Avoid: Long-running branches • Manual deployments • No rollback plan • Ignoring flaky tests</text>
    <text x="400" y="170" textAnchor="middle" fill="#fca5a5" fontSize="9">Skipping stages • Hardcoded secrets • Monolithic pipelines • No environment parity</text>
  </svg>
)

function CICD({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'pipeline-overview',
      name: 'Pipeline Architecture',
      icon: '🔄',
      color: '#3b82f6',
      description: 'Commit triggers automated build, test, quality checks, security scans, artifact packaging, and deployment. Pipeline stages run sequentially with parallel jobs. Quality gates block promotion on test failure or vulnerabilities.',
      diagram: CICDPipelineDiagram,
      details: [
        {
          name: 'Pipeline Stages',
          explanation: 'A CI/CD pipeline consists of multiple stages: Source (code checkout), Build (compile and package), Test (unit and integration), Quality (code analysis), Security (vulnerability scanning), Package (create artifacts), and Deploy (release to environments). Each stage has gates that must pass before proceeding. Failed stages stop the pipeline and notify the team. Parallelization of independent stages improves throughput.',
          codeExample: `# Multi-stage pipeline with parallel jobs
stages:
  - build
  - test
  - quality
  - security
  - package
  - deploy

build:
  stage: build
  script:
    - mvn clean compile package -DskipTests
  artifacts:
    paths: [target/*.jar]

unit-tests:
  stage: test
  script:
    - mvn test
  parallel: 3  # Split tests across 3 runners

integration-tests:
  stage: test
  script:
    - mvn verify -DskipUnitTests
  services:
    - postgres:15
    - redis:7

sonarqube:
  stage: quality
  script:
    - mvn sonar:sonar -Dsonar.host.url=$SONAR_URL
  allow_failure: false  # Quality gate blocks pipeline

security-scan:
  stage: security
  script:
    - trivy image $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  rules:
    - if: $CI_COMMIT_BRANCH == "main"

docker-build:
  stage: package
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

deploy-prod:
  stage: deploy
  script:
    - kubectl set image deployment/app app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  when: manual
  environment:
    name: production`
        },
        {
          name: 'Continuous Integration',
          explanation: 'CI focuses on integrating code changes frequently. Developers commit to main branch multiple times daily. Each commit triggers automated builds and tests. Fast feedback loop catches issues early. Reduces integration problems and merge conflicts. Ensures the codebase is always in a releasable state. Key practices: trunk-based development, automated testing, and quick builds (under 10 minutes).',
          codeExample: `# GitHub Actions CI workflow
name: Continuous Integration

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

concurrency:
  group: ci-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'

      - name: Build
        run: mvn clean compile -B

      - name: Run Tests
        run: mvn test -B

      - name: Upload Coverage
        uses: codecov/codecov-action@v4
        with:
          files: target/site/jacoco/jacoco.xml

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Checkstyle
        run: mvn checkstyle:check

  integration-test:
    needs: build
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        ports: ['5432:5432']
    steps:
      - uses: actions/checkout@v4
      - run: mvn verify -DskipUnitTests`
        },
        {
          name: 'Continuous Delivery',
          explanation: 'CD extends CI by ensuring code is always deployable. Every commit that passes CI is a release candidate. Deployments to production require manual approval. Enables frequent, low-risk releases. Includes automated deployment to staging environments. Manual testing and approval gates before production. Builds confidence in the release process.',
          codeExample: `# GitHub Actions CD with manual approval
name: Continuous Delivery

on:
  push:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    outputs:
      image-tag: \${{ steps.build.outputs.tag }}
    steps:
      - uses: actions/checkout@v4

      - name: Build & Test
        run: |
          mvn clean verify
          mvn package -DskipTests

      - name: Build Docker Image
        id: build
        run: |
          TAG=\${{ github.sha }}
          docker build -t myapp:$TAG .
          docker push registry.example.com/myapp:$TAG
          echo "tag=$TAG" >> $GITHUB_OUTPUT

  deploy-staging:
    needs: build-and-test
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to Staging
        run: |
          helm upgrade myapp ./charts/myapp \\
            --set image.tag=\${{ needs.build-and-test.outputs.image-tag }} \\
            --namespace staging

  deploy-production:
    needs: [build-and-test, deploy-staging]
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://myapp.example.com
    steps:
      - name: Deploy to Production
        run: |
          helm upgrade myapp ./charts/myapp \\
            --set image.tag=\${{ needs.build-and-test.outputs.image-tag }} \\
            --namespace production`
        },
        {
          name: 'Continuous Deployment',
          explanation: 'Fully automated pipeline from commit to production. No manual intervention required. Every passing commit is deployed automatically. Requires high test coverage and monitoring. Feature flags control feature visibility. Rollback mechanisms for quick recovery. Common in SaaS and web applications. Reduces time to market significantly.',
          codeExample: `# ArgoCD Application for Continuous Deployment
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp-prod
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://github.com/org/k8s-manifests.git
    targetRevision: main
    path: apps/myapp/overlays/production
    kustomize:
      images:
        - myapp=registry.example.com/myapp
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true      # Remove resources not in Git
      selfHeal: true   # Revert manual changes
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
    retry:
      limit: 5
      backoff:
        duration: 5s
        maxDuration: 3m
        factor: 2
---
# Argo Rollout for automated canary deployment
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 10
        - pause: {duration: 5m}
        - setWeight: 30
        - pause: {duration: 5m}
        - setWeight: 60
        - pause: {duration: 5m}
      analysis:
        templates:
          - templateName: success-rate
        startingStep: 1`
        }
      ]
    },
    {
      id: 'branching',
      name: 'Branching Strategies',
      icon: '🌿',
      color: '#22c55e',
      description: 'Trunk-based: short-lived feature branches (1-2 days), frequent merges to main. GitFlow: separate develop/release/hotfix branches for structured releases. GitHub Flow: main is always deployable, merge after PR review.',
      diagram: BranchingStrategyDiagram,
      details: [
        {
          name: 'GitFlow',
          explanation: 'Traditional branching model with main, develop, feature, release, and hotfix branches. Main branch contains production code. Develop branch for ongoing development. Feature branches for new features. Release branches for preparing releases. Hotfix branches for urgent production fixes. Well-suited for scheduled releases and long-term maintenance.',
          codeExample: `# GitFlow workflow commands

# Initialize GitFlow in repository
git flow init

# Start a new feature
git flow feature start user-authentication
# Work on feature...
git add . && git commit -m "Add login form"
git add . && git commit -m "Add JWT validation"

# Finish feature (merges to develop)
git flow feature finish user-authentication

# Start a release branch
git flow release start v1.2.0
# Update version numbers, final testing...
git add . && git commit -m "Bump version to 1.2.0"

# Finish release (merges to main AND develop)
git flow release finish v1.2.0
git push origin main develop --tags

# Emergency hotfix on production
git flow hotfix start fix-login-bug
# Fix the bug...
git add . && git commit -m "Fix null pointer in login"

# Finish hotfix (merges to main AND develop)
git flow hotfix finish fix-login-bug
git push origin main develop --tags

# Manual GitFlow (without git-flow extension)
git checkout -b feature/new-feature develop
git checkout develop && git merge --no-ff feature/new-feature
git branch -d feature/new-feature`
        },
        {
          name: 'Trunk-Based Development',
          explanation: 'All developers work on a single branch (main/trunk). Short-lived feature branches (max 1-2 days). Frequent integration to avoid merge conflicts. Feature flags to hide incomplete features. Enables true continuous integration. Requires high discipline and test coverage. Preferred for continuous deployment workflows.',
          codeExample: `# Trunk-Based Development workflow

# Always start from latest main
git checkout main
git pull origin main

# Create short-lived branch (1-2 days max)
git checkout -b feature/add-search

# Make small, incremental commits
git add . && git commit -m "Add search input component"
git push origin feature/add-search

# Create PR immediately (even for WIP)
gh pr create --title "Add search functionality" --draft

# Sync with main frequently (at least daily)
git fetch origin
git rebase origin/main
git push --force-with-lease

# Mark PR ready when complete
gh pr ready

# After review approval, squash merge
gh pr merge --squash --delete-branch

# Feature flags for incomplete features
# In application code:
if (featureFlags.isEnabled('new-search')) {
  return <NewSearchComponent />;
}
return <OldSearchComponent />;

# Delete merged branches
git branch -d feature/add-search
git fetch --prune`
        },
        {
          name: 'GitHub Flow',
          explanation: 'Simplified branching model. Main branch is always deployable. Create branches for features or fixes. Open pull requests for code review. Merge to main after approval. Deploy immediately or continuously. Great for web applications and SaaS products. Simple and easy to understand.',
          codeExample: `# GitHub Flow workflow

# 1. Create branch from main
git checkout main
git pull origin main
git checkout -b fix-payment-validation

# 2. Make changes and commit
git add src/payment.js
git commit -m "Fix credit card validation regex"

# 3. Push branch to remote
git push -u origin fix-payment-validation

# 4. Create Pull Request via CLI
gh pr create \\
  --title "Fix payment validation" \\
  --body "Fixes #123. Updated regex to handle Amex cards."

# 5. Request review
gh pr edit --add-reviewer teammate1,teammate2

# 6. Address review feedback
git add . && git commit -m "Address review feedback"
git push

# 7. Merge after approval (auto-deploys to production)
gh pr merge --merge --delete-branch

# GitHub Actions trigger on merge to main
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: ./deploy.sh production`
        },
        {
          name: 'Release Branching',
          explanation: 'Create release branches for each version. Cherry-pick fixes from main to release branches. Support multiple versions simultaneously. Common in products with long support cycles. Enables parallel development of new features while maintaining older versions. Requires careful merge management.',
          codeExample: `# Release branching for multiple supported versions

# Create release branch from main
git checkout main
git checkout -b release/v2.0
git push -u origin release/v2.0

# Tag the release
git tag -a v2.0.0 -m "Release version 2.0.0"
git push origin v2.0.0

# Continue development on main
git checkout main
# New features go here...

# Bug fix needed for v2.0 (also applies to main)
git checkout main
git checkout -b fix/security-patch
# Fix the bug...
git commit -m "Fix SQL injection vulnerability"
git push origin fix/security-patch
gh pr create --base main

# After merging to main, cherry-pick to release branch
git checkout release/v2.0
git cherry-pick <commit-sha>
git push origin release/v2.0

# Create patch release
git tag -a v2.0.1 -m "Security patch"
git push origin v2.0.1

# Backport to older supported versions
git checkout release/v1.9
git cherry-pick <commit-sha>
git tag -a v1.9.5 -m "Security patch"
git push origin release/v1.9 v1.9.5

# List supported release branches
git branch -r | grep release/`
        }
      ]
    },
    {
      id: 'artifact-management',
      name: 'Artifact Management',
      icon: '📦',
      color: '#f59e0b',
      description: 'Immutable artifacts with semantic versioning (MAJOR.MINOR.PATCH). Nexus/Artifactory for Maven/npm, ECR/GCR for containers. Artifact promotion through environments with signed images and vulnerability scanning.',
      diagram: ArtifactFlowDiagram,
      details: [
        {
          name: 'Container Images',
          explanation: 'Docker images are the primary deployment artifact. Build images using multi-stage Dockerfiles for smaller sizes. Tag images with commit SHA and version numbers. Push to container registries (Docker Hub, ECR, GCR, ACR). Use image scanning for vulnerabilities. Implement image signing for security. Layer caching speeds up builds.',
          codeExample: `# Multi-stage Dockerfile for optimized images
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
RUN addgroup -g 1000 app && adduser -u 1000 -G app -D app
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
USER app
EXPOSE 8080
HEALTHCHECK --interval=30s CMD wget -q --spider http://localhost:8080/health
ENTRYPOINT ["java", "-jar", "app.jar"]

---
# GitHub Actions: Build, scan, sign, and push
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: |
      ghcr.io/\${{ github.repository }}:\${{ github.sha }}
      ghcr.io/\${{ github.repository }}:latest
    cache-from: type=gha
    cache-to: type=gha,mode=max

- name: Scan image for vulnerabilities
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: ghcr.io/\${{ github.repository }}:\${{ github.sha }}
    severity: 'CRITICAL,HIGH'
    exit-code: '1'

- name: Sign image with Cosign
  run: |
    cosign sign --yes ghcr.io/\${{ github.repository }}:\${{ github.sha }}`
        },
        {
          name: 'Artifact Repositories',
          explanation: 'Nexus, Artifactory, or cloud registries store build artifacts. Support for multiple formats: Docker, Maven, npm, PyPI. Version control for all dependencies. Proxy and cache external dependencies. Retention policies for cleanup. Access control and audit logging. Central source of truth for deployable artifacts.',
          codeExample: `# Maven settings.xml for Nexus/Artifactory
<settings>
  <servers>
    <server>
      <id>nexus-releases</id>
      <username>\${env.NEXUS_USER}</username>
      <password>\${env.NEXUS_PASSWORD}</password>
    </server>
    <server>
      <id>nexus-snapshots</id>
      <username>\${env.NEXUS_USER}</username>
      <password>\${env.NEXUS_PASSWORD}</password>
    </server>
  </servers>
  <mirrors>
    <mirror>
      <id>nexus</id>
      <url>https://nexus.example.com/repository/maven-public/</url>
      <mirrorOf>*</mirrorOf>
    </mirror>
  </mirrors>
</settings>

---
# pom.xml distribution management
<distributionManagement>
  <repository>
    <id>nexus-releases</id>
    <url>https://nexus.example.com/repository/maven-releases/</url>
  </repository>
  <snapshotRepository>
    <id>nexus-snapshots</id>
    <url>https://nexus.example.com/repository/maven-snapshots/</url>
  </snapshotRepository>
</distributionManagement>

---
# GitLab CI: Publish to registry
publish:
  stage: publish
  script:
    - mvn deploy -DskipTests -s ci-settings.xml
  rules:
    - if: $CI_COMMIT_TAG`
        },
        {
          name: 'Versioning Strategies',
          explanation: 'Semantic versioning (MAJOR.MINOR.PATCH) for releases. Git SHA for traceability. Build numbers for CI artifacts. Immutable versions prevent tampering. Metadata includes build info and dependencies. CalVer (calendar versioning) for time-based releases. Clear versioning aids debugging and rollbacks.',
          codeExample: `# Semantic Versioning with Maven
<version>2.1.0-SNAPSHOT</version>

# Release plugin for version management
mvn release:prepare release:perform

---
# GitHub Actions: Auto-versioning with tags
- name: Get version from tag
  id: version
  run: |
    VERSION=\${GITHUB_REF#refs/tags/v}
    echo "version=$VERSION" >> $GITHUB_OUTPUT

- name: Update pom.xml version
  run: mvn versions:set -DnewVersion=\${{ steps.version.outputs.version }}

---
# GitLab CI: Dynamic versioning
variables:
  VERSION: "\${CI_COMMIT_TAG:-\${CI_COMMIT_SHORT_SHA}}"

build:
  script:
    - mvn versions:set -DnewVersion=$VERSION
    - mvn package
    - docker build -t myapp:$VERSION .

---
# CalVer example (YYYY.MM.PATCH)
# 2024.01.0, 2024.01.1, 2024.02.0

# Conventional Commits for auto-versioning
# feat: -> MINOR bump
# fix:  -> PATCH bump
# BREAKING CHANGE: -> MAJOR bump

- name: Semantic Release
  uses: semantic-release-action/semantic-release@v4
  with:
    branches: ['main']`
        },
        {
          name: 'Dependency Management',
          explanation: 'Lock files ensure reproducible builds. Automated dependency updates with Dependabot/Renovate. Vulnerability scanning of dependencies. License compliance checking. Caching to speed up builds. Vendoring for offline builds. Version constraints to avoid breaking changes.',
          codeExample: `# Dependabot configuration (.github/dependabot.yml)
version: 2
updates:
  - package-ecosystem: "maven"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      spring:
        patterns:
          - "org.springframework*"
    ignore:
      - dependency-name: "com.example:unstable-lib"
        versions: [">=2.0.0"]

  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"

---
# Renovate configuration (renovate.json)
{
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchPackagePatterns": ["^org.springframework"],
      "groupName": "Spring dependencies"
    },
    {
      "matchUpdateTypes": ["major"],
      "labels": ["breaking-change"]
    }
  ],
  "vulnerabilityAlerts": {
    "enabled": true,
    "labels": ["security"]
  }
}

---
# Maven dependency check plugin
<plugin>
  <groupId>org.owasp</groupId>
  <artifactId>dependency-check-maven</artifactId>
  <configuration>
    <failBuildOnCVSS>7</failBuildOnCVSS>
  </configuration>
</plugin>`
        }
      ]
    },
    {
      id: 'environment-promotion',
      name: 'Environment Promotion',
      icon: '🚀',
      color: '#8b5cf6',
      description: 'Dev auto-deploys on every commit for testing. Staging mirrors production with approval gates for integration/performance tests. Production requires manual approval with canary/blue-green deployments and automated rollback on health check failure.',
      diagram: EnvironmentPromotionDiagram,
      details: [
        {
          name: 'Environment Strategy',
          explanation: 'Multiple environments serve different purposes. Development for feature testing. Staging mirrors production for integration tests. Production serves end users. Each environment has its own configuration. Promote the same artifact through environments. Environment parity reduces "works on my machine" issues. Infrastructure as Code ensures consistency.',
          codeExample: `# Kustomize overlays for environment-specific configs
# base/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 1
  template:
    spec:
      containers:
        - name: app
          image: myapp:latest
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"

---
# overlays/dev/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
bases:
  - ../../base
namespace: development
patches:
  - patch: |-
      - op: replace
        path: /spec/replicas
        value: 1
    target:
      kind: Deployment

---
# overlays/staging/kustomization.yaml
namespace: staging
replicas:
  - name: myapp
    count: 2

---
# overlays/production/kustomization.yaml
namespace: production
replicas:
  - name: myapp
    count: 5
patchesStrategicMerge:
  - resources-patch.yaml  # Higher resource limits`
        },
        {
          name: 'Deployment Gates',
          explanation: 'Gates control promotion between environments. Automated gates: test pass, security scan, performance threshold. Manual gates: approval from stakeholders. Time-based gates: wait period before production. Quality gates: code coverage, static analysis. Change approval boards for regulated industries. Gates provide checkpoints for quality assurance.',
          codeExample: `# GitHub Actions with environment protection rules
jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to Staging
        run: kubectl apply -k overlays/staging/

  integration-tests:
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - name: Run E2E Tests
        run: npm run test:e2e -- --env staging

  deploy-production:
    needs: integration-tests
    runs-on: ubuntu-latest
    environment:
      name: production
      # Requires manual approval from reviewers
    steps:
      - name: Deploy to Production
        run: kubectl apply -k overlays/production/

---
# GitLab CI with manual gates
deploy_staging:
  stage: deploy
  script:
    - kubectl apply -k overlays/staging/
  environment:
    name: staging

deploy_production:
  stage: deploy
  script:
    - kubectl apply -k overlays/production/
  environment:
    name: production
  when: manual  # Requires manual click
  needs: ["deploy_staging", "integration_tests"]
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
  allow_failure: false`
        },
        {
          name: 'Blue-Green Deployment',
          explanation: 'Maintain two identical production environments. Blue is live, Green receives new deployment. Switch traffic once Green is validated. Instant rollback by switching back to Blue. Zero downtime deployment. Full production testing before switch. Resource-intensive (double infrastructure). Ideal for critical applications.',
          codeExample: `# Kubernetes Blue-Green with Service selector
# blue-deployment.yaml (current production)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: blue
  template:
    metadata:
      labels:
        app: myapp
        version: blue

---
# green-deployment.yaml (new version)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: green
  template:
    metadata:
      labels:
        app: myapp
        version: green

---
# service.yaml - Switch traffic by changing selector
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
    version: blue  # Change to 'green' to switch

---
# Switch script
#!/bin/bash
CURRENT=\$(kubectl get svc myapp -o jsonpath='{.spec.selector.version}')
if [ "$CURRENT" = "blue" ]; then
  kubectl patch svc myapp -p '{"spec":{"selector":{"version":"green"}}}'
else
  kubectl patch svc myapp -p '{"spec":{"selector":{"version":"blue"}}}'
fi`
        },
        {
          name: 'Canary Releases',
          explanation: 'Gradually roll out changes to subset of users. Start with 1-5% of traffic. Monitor for errors and performance. Increase percentage if successful. Roll back if issues detected. Reduces blast radius of problems. A/B testing capabilities. Requires sophisticated traffic management and monitoring.',
          codeExample: `# Argo Rollouts Canary Strategy
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp
spec:
  replicas: 10
  strategy:
    canary:
      canaryService: myapp-canary
      stableService: myapp-stable
      trafficRouting:
        istio:
          virtualService:
            name: myapp-vsvc
      steps:
        - setWeight: 5     # 5% traffic to canary
        - pause: {duration: 2m}
        - setWeight: 20
        - pause: {duration: 5m}
        - setWeight: 50
        - pause: {duration: 10m}
        - setWeight: 80
        - pause: {duration: 5m}
      analysis:
        templates:
          - templateName: success-rate
        startingStep: 2
        args:
          - name: service-name
            value: myapp-canary

---
# Analysis Template for automated rollback
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
spec:
  args:
    - name: service-name
  metrics:
    - name: success-rate
      interval: 1m
      successCondition: result[0] >= 0.95
      failureLimit: 3
      provider:
        prometheus:
          address: http://prometheus:9090
          query: |
            sum(rate(http_requests_total{service="{{args.service-name}}",status=~"2.."}[5m]))
            /
            sum(rate(http_requests_total{service="{{args.service-name}}"}[5m]))`
        }
      ]
    },
    {
      id: 'jenkins',
      name: 'Jenkins Pipelines',
      icon: '🔧',
      color: '#d24939',
      description: 'Declarative pipelines for structured, versioned workflows defined in Jenkinsfile. Agents specify execution environment, parallel stages for concurrency. Webhooks trigger on code push. Shared libraries centralize reusable steps across teams.',
      diagram: JenkinsDiagram,
      details: [
        {
          name: 'Declarative Pipeline',
          explanation: 'Modern, structured syntax for Jenkins pipelines. Defined in Jenkinsfile. Pipeline block contains stages and steps. Agent directive specifies where to run. Environment for variables. Post block for cleanup and notifications. Easier to read and maintain. Built-in validation and error handling. Recommended for most use cases.',
          code: `pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'registry.example.com'
    }
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps { sh 'mvn test' }
                }
                stage('Integration Tests') {
                    steps { sh 'mvn verify' }
                }
            }
        }
        stage('Deploy') {
            when { branch 'main' }
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
    post {
        success { slackSend message: 'Build succeeded' }
        failure { slackSend message: 'Build failed' }
    }
}`
        },
        {
          name: 'Scripted Pipeline',
          explanation: 'Groovy-based pipeline with full programming flexibility. More powerful but complex. Use when declarative is too limiting. Try-catch for error handling. Functions for code reuse. Access to Jenkins APIs. Can mix with declarative. Harder to validate before running.',
          code: `node {
    try {
        stage('Checkout') {
            checkout scm
        }
        stage('Build') {
            sh 'mvn clean package'
        }
        stage('Deploy') {
            if (env.BRANCH_NAME == 'main') {
                deployToProduction()
            }
        }
    } catch (e) {
        slackSend message: "Build failed: \${e.message}"
        throw e
    }
}

def deployToProduction() {
    input message: 'Deploy to production?'
    sh 'kubectl apply -f k8s/'
}`
        },
        {
          name: 'Shared Libraries',
          explanation: 'Reusable code across multiple pipelines. Stored in Git repository. Version controlled like application code. Import with @Library annotation. Define custom steps and functions. Centralize common patterns. Reduce duplication across teams. Test libraries before using in production pipelines.',
          codeExample: `// vars/standardPipeline.groovy (Shared Library)
def call(Map config) {
    pipeline {
        agent any
        stages {
            stage('Build') {
                steps {
                    sh "mvn clean package -DskipTests"
                }
            }
            stage('Test') {
                steps {
                    sh "mvn test"
                }
            }
            stage('Deploy') {
                when { branch 'main' }
                steps {
                    deployToKubernetes(
                        namespace: config.namespace,
                        image: config.image
                    )
                }
            }
        }
    }
}

// vars/deployToKubernetes.groovy
def call(Map args) {
    sh """
        kubectl set image deployment/\${args.namespace} \\
            app=\${args.image}:\${env.BUILD_NUMBER}
    """
}

---
// Jenkinsfile using shared library
@Library('my-shared-library@main') _

standardPipeline(
    namespace: 'production',
    image: 'myapp'
)`
        },
        {
          name: 'Jenkins Configuration',
          explanation: 'Jenkins Configuration as Code (JCasC) for setup. Manage plugins declaratively. Credentials management with secrets. Distributed builds with agents. Pipeline triggers: webhooks, schedules, upstream jobs. Build matrix for multiple configurations. Resource management and quotas. Integration with source control systems.',
          codeExample: `# jenkins.yaml (Configuration as Code)
jenkins:
  systemMessage: "Jenkins configured via JCasC"
  numExecutors: 0  # Controller doesn't run builds

  securityRealm:
    ldap:
      configurations:
        - server: ldap.example.com

  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions:
              - "Overall/Administer"
          - name: "developer"
            permissions:
              - "Job/Build"
              - "Job/Read"

  nodes:
    - permanent:
        name: "build-agent-1"
        remoteFS: "/home/jenkins"
        launcher:
          ssh:
            host: "agent1.example.com"
            credentialsId: "ssh-agent-key"

credentials:
  system:
    domainCredentials:
      - credentials:
          - usernamePassword:
              id: "docker-hub"
              username: "\${DOCKER_USER}"
              password: "\${DOCKER_PASS}"
          - string:
              id: "sonar-token"
              secret: "\${SONAR_TOKEN}"

unclassified:
  gitHubPluginConfig:
    configs:
      - credentialsId: "github-token"
        name: "GitHub"`
        }
      ]
    },
    {
      id: 'gitlab-cicd',
      name: 'GitLab CI/CD',
      icon: '🦊',
      color: '#fc6d26',
      description: 'Pipeline defined in .gitlab-ci.yml with stages running sequentially and jobs in parallel. Built-in security scanning (SAST/DAST/dependency scanning). Auto-scaling runners with Docker/Kubernetes executors. Review apps for merge request previews.',
      diagram: GitLabCICDDiagram,
      details: [
        {
          name: 'Pipeline Configuration',
          explanation: 'Defined in .gitlab-ci.yml at repository root. Stages run in order. Jobs in same stage run in parallel. Variables for configuration. Cache and artifacts for sharing data. Extends for job inheritance. Include for modular configurations. Rules for conditional execution.',
          code: `stages:
  - build
  - test
  - deploy

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2"

build:
  stage: build
  image: maven:3.8-openjdk-17
  script:
    - mvn clean package -DskipTests
  artifacts:
    paths: [target/]
    expire_in: 1 hour

test:
  stage: test
  script:
    - mvn test
  coverage: '/Total.*?([0-9]+)%/'
  artifacts:
    reports:
      junit: target/surefire-reports/*.xml

deploy:
  stage: deploy
  script:
    - kubectl apply -f k8s/
  environment:
    name: production
  when: manual
  only: [main]`
        },
        {
          name: 'Runners & Executors',
          explanation: 'Runners execute CI/CD jobs. Shared runners available on GitLab.com. Self-hosted runners for custom requirements. Docker executor runs jobs in containers. Kubernetes executor for dynamic scaling. Shell executor for direct host access. Tags match jobs to appropriate runners. Auto-scaling based on demand.',
          codeExample: `# config.toml - GitLab Runner configuration
concurrent = 10
check_interval = 0

[[runners]]
  name = "docker-runner"
  url = "https://gitlab.example.com/"
  token = "RUNNER_TOKEN"
  executor = "docker"
  [runners.docker]
    image = "alpine:latest"
    privileged = true
    volumes = ["/cache", "/var/run/docker.sock:/var/run/docker.sock"]

[[runners]]
  name = "kubernetes-runner"
  url = "https://gitlab.example.com/"
  token = "RUNNER_TOKEN"
  executor = "kubernetes"
  [runners.kubernetes]
    namespace = "gitlab-runners"
    image = "ubuntu:22.04"
    [runners.kubernetes.pod_labels]
      "gitlab-runner" = "true"

---
# .gitlab-ci.yml - Using tagged runners
build:
  stage: build
  tags:
    - docker
    - linux
  script:
    - docker build -t myapp .

gpu-training:
  stage: ml
  tags:
    - gpu
    - cuda
  script:
    - python train.py`
        },
        {
          name: 'Environments & Review Apps',
          explanation: 'Track deployments to environments. Automatic deployment review for merge requests. Dynamic environments for feature branches. Environment-specific variables. Protected environments for production. Deployment history and rollback. Review apps provide live preview of changes. Auto-stop for temporary environments.',
          codeExample: `# .gitlab-ci.yml - Review Apps
stages:
  - build
  - review
  - deploy

build:
  stage: build
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

# Dynamic review environment per MR
review:
  stage: review
  script:
    - kubectl create namespace review-$CI_MERGE_REQUEST_IID || true
    - helm upgrade --install review-$CI_MERGE_REQUEST_IID ./chart \\
        --namespace review-$CI_MERGE_REQUEST_IID \\
        --set image.tag=$CI_COMMIT_SHA
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    url: https://$CI_MERGE_REQUEST_IID.review.example.com
    on_stop: stop_review
    auto_stop_in: 1 week
  rules:
    - if: $CI_MERGE_REQUEST_IID

stop_review:
  stage: review
  script:
    - kubectl delete namespace review-$CI_MERGE_REQUEST_IID
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    action: stop
  when: manual
  rules:
    - if: $CI_MERGE_REQUEST_IID

deploy_production:
  stage: deploy
  environment:
    name: production
    url: https://myapp.example.com
  when: manual
  rules:
    - if: $CI_COMMIT_BRANCH == "main"`
        },
        {
          name: 'Security Scanning',
          explanation: 'Built-in security scanning tools. SAST for static code analysis. DAST for dynamic application testing. Container scanning for vulnerabilities. Dependency scanning for libraries. License compliance checking. Secret detection in code. Security dashboard for visibility. Merge request blocking on vulnerabilities.',
          codeExample: `# .gitlab-ci.yml - Security scanning
include:
  - template: Jobs/SAST.gitlab-ci.yml
  - template: Jobs/Dependency-Scanning.gitlab-ci.yml
  - template: Jobs/Container-Scanning.gitlab-ci.yml
  - template: Jobs/Secret-Detection.gitlab-ci.yml
  - template: Jobs/DAST.gitlab-ci.yml

stages:
  - build
  - test
  - security
  - dast
  - deploy

variables:
  SAST_EXCLUDED_ANALYZERS: "gosec"
  DS_EXCLUDED_PATHS: "test/**, spec/**"
  SECURE_LOG_LEVEL: "debug"

# Override container scanning
container_scanning:
  variables:
    CS_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    CS_SEVERITY_THRESHOLD: HIGH

# DAST requires running application
dast:
  stage: dast
  variables:
    DAST_WEBSITE: https://staging.example.com
  needs: ["deploy_staging"]

# Block MR if vulnerabilities found
security_gate:
  stage: security
  script:
    - |
      if [ $(cat gl-sast-report.json | jq '.vulnerabilities | length') -gt 0 ]; then
        echo "Security vulnerabilities found!"
        exit 1
      fi
  dependencies:
    - sast`
        }
      ]
    },
    {
      id: 'github-actions',
      name: 'GitHub Actions',
      icon: '🐙',
      color: '#2088ff',
      description: 'Workflows in .github/workflows/ triggered by push/PR/schedule. Matrix strategy for multi-version testing. Reusable workflows reduce duplication. OIDC federation for cloud authentication. Self-hosted runners for custom environments.',
      diagram: GitHubActionsDiagram,
      details: [
        {
          name: 'Workflow Structure',
          explanation: 'Workflows defined in .github/workflows/ directory. YAML files with on triggers and jobs. Jobs contain steps that run commands or actions. Matrix strategy for multiple configurations. Reusable workflows for DRY. Workflow dispatch for manual triggers. Environment secrets and variables.',
          code: `name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        java: [17, 21]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: \${{ matrix.java }}
          distribution: 'temurin'
      - run: mvn clean package
      - uses: actions/upload-artifact@v4
        with:
          name: jar-\${{ matrix.java }}
          path: target/*.jar

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: azure/k8s-deploy@v4
        with:
          namespace: production
          manifests: k8s/`
        },
        {
          name: 'Actions Marketplace',
          explanation: 'Thousands of pre-built actions available. Official actions from GitHub and vendors. Community actions for common tasks. Version pinning for reliability. Composite actions for custom reusable steps. JavaScript and Docker container actions. Local actions in repository. Fork and customize existing actions.',
          codeExample: `# Using marketplace actions
steps:
  # Official GitHub action - pin to major version
  - uses: actions/checkout@v4

  # Third-party action - pin to commit SHA for security
  - uses: docker/build-push-action@0565240e2d4ab88bba5387d719585280857ece09

  # Action with inputs
  - uses: actions/setup-java@v4
    with:
      java-version: '21'
      distribution: 'temurin'
      cache: 'maven'

---
# Custom composite action (.github/actions/deploy/action.yml)
name: 'Deploy to Kubernetes'
description: 'Deploy application to K8s cluster'
inputs:
  namespace:
    description: 'Target namespace'
    required: true
  image-tag:
    description: 'Docker image tag'
    required: true
runs:
  using: 'composite'
  steps:
    - name: Setup kubectl
      uses: azure/setup-kubectl@v3
      shell: bash

    - name: Deploy
      shell: bash
      run: |
        kubectl set image deployment/app \\
          app=myregistry/app:\${{ inputs.image-tag }} \\
          -n \${{ inputs.namespace }}

---
# Using local composite action
- uses: ./.github/actions/deploy
  with:
    namespace: production
    image-tag: \${{ github.sha }}`
        },
        {
          name: 'Secrets & Variables',
          explanation: 'Encrypted secrets for sensitive data. Organization, repository, and environment secrets. Variables for non-sensitive configuration. GITHUB_TOKEN for API access. OIDC for cloud provider authentication. Secret scanning prevents accidental exposure. Required reviewers for environment secrets.',
          codeExample: `# Using secrets and variables in workflows
env:
  # Repository variable (non-sensitive)
  APP_NAME: \${{ vars.APP_NAME }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production  # Use environment secrets
    steps:
      - name: Use secrets
        env:
          # Repository secret
          API_KEY: \${{ secrets.API_KEY }}
          # Environment secret (production)
          DB_PASSWORD: \${{ secrets.DB_PASSWORD }}
          # Automatic token
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: |
          echo "Deploying with secrets..."

---
# OIDC authentication with AWS (no long-lived credentials)
permissions:
  id-token: write
  contents: read

steps:
  - name: Configure AWS Credentials
    uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::123456789:role/GitHubActionsRole
      aws-region: us-east-1

---
# Masking sensitive output
- name: Get token
  id: token
  run: |
    TOKEN=\$(curl -s https://api.example.com/token)
    echo "::add-mask::\$TOKEN"
    echo "token=\$TOKEN" >> \$GITHUB_OUTPUT`
        },
        {
          name: 'Self-Hosted Runners',
          explanation: 'Run workflows on your own infrastructure. Supports Linux, Windows, macOS. Labels for runner selection. Runner groups for organization. Auto-scaling with runner scale sets. Ephemeral runners for security. Persistent runners for faster startup. Cost control for large organizations.',
          codeExample: `# Workflow targeting self-hosted runner
jobs:
  build:
    runs-on: [self-hosted, linux, x64, gpu]
    steps:
      - uses: actions/checkout@v4
      - run: nvidia-smi  # GPU available

---
# Runner scale set (actions-runner-controller)
apiVersion: actions.summerwind.dev/v1alpha1
kind: RunnerDeployment
metadata:
  name: github-runners
spec:
  replicas: 5
  template:
    spec:
      repository: my-org/my-repo
      labels:
        - self-hosted
        - linux
        - x64

---
# Horizontal Runner Autoscaler
apiVersion: actions.summerwind.dev/v1alpha1
kind: HorizontalRunnerAutoscaler
metadata:
  name: runner-autoscaler
spec:
  scaleTargetRef:
    name: github-runners
  minReplicas: 1
  maxReplicas: 20
  metrics:
    - type: TotalNumberOfQueuedAndInProgressWorkflowRuns
      repositoryNames:
        - my-org/my-repo

---
# Ephemeral runner configuration
./config.sh --url https://github.com/org/repo \\
  --token TOKEN \\
  --ephemeral \\
  --labels ephemeral,docker`
        }
      ]
    },
    {
      id: 'gitops',
      name: 'GitOps & ArgoCD',
      icon: '📋',
      color: '#ef7b4d',
      description: 'Git repository as single source of truth for desired state. ArgoCD continuously syncs Kubernetes clusters with Git configs. Supports Helm/Kustomize. Pull-based model with auto-healing and automatic rollback on divergence.',
      diagram: GitOpsDiagram,
      details: [
        {
          name: 'GitOps Principles',
          explanation: 'Git as single source of truth for desired state. Declarative configuration for infrastructure and apps. Automated sync between Git and cluster. Pull-based deployment (not push). Self-healing system reconciliation. Audit trail through Git history. Rollback by reverting commits. Enhanced security through reduced cluster access.',
          codeExample: `# GitOps Repository Structure
k8s-manifests/
├── apps/
│   ├── frontend/
│   │   ├── base/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── kustomization.yaml
│   │   └── overlays/
│   │       ├── dev/
│   │       ├── staging/
│   │       └── production/
│   └── backend/
├── infrastructure/
│   ├── monitoring/
│   ├── ingress/
│   └── cert-manager/
└── clusters/
    ├── dev-cluster/
    ├── staging-cluster/
    └── prod-cluster/

---
# CI pipeline updates image tag in Git (triggers ArgoCD)
# .github/workflows/build.yml
- name: Update manifest
  run: |
    cd k8s-manifests
    kustomize edit set image myapp=registry/myapp:\${{ github.sha }}
    git commit -am "Update myapp to \${{ github.sha }}"
    git push

---
# GitOps workflow:
# 1. Developer pushes code to app repo
# 2. CI builds, tests, creates container image
# 3. CI updates image tag in config repo
# 4. ArgoCD detects change in config repo
# 5. ArgoCD syncs cluster to match Git state
# 6. Changes are deployed without direct cluster access`
        },
        {
          name: 'ArgoCD Applications',
          explanation: 'ArgoCD syncs Git repos to Kubernetes clusters. Application CRD defines source and destination. Supports Helm, Kustomize, plain YAML. Auto-sync for continuous deployment. Manual sync for controlled releases. Application sets for multi-cluster. Health checks and status monitoring. Web UI and CLI for management.',
          code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/config.git
    targetRevision: main
    path: apps/my-app
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true`
        },
        {
          name: 'Progressive Delivery',
          explanation: 'Argo Rollouts extends Kubernetes deployments. Canary deployments with traffic splitting. Blue-green with instant switchover. Analysis templates for automated rollback. Integration with metrics providers. Experiments for A/B testing. Traffic management with Istio or ALB. Pause and resume deployments.',
          codeExample: `# Argo Rollouts with Istio traffic management
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp
spec:
  replicas: 10
  strategy:
    canary:
      canaryService: myapp-canary
      stableService: myapp-stable
      trafficRouting:
        istio:
          virtualServices:
            - name: myapp-vsvc
              routes:
                - primary
      steps:
        - setWeight: 5
        - pause: {duration: 2m}
        - analysis:
            templates:
              - templateName: success-rate
        - setWeight: 25
        - pause: {duration: 5m}
        - setWeight: 50
        - pause: {duration: 5m}
        - setWeight: 100

---
# Analysis Template with Prometheus
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
spec:
  metrics:
    - name: success-rate
      successCondition: result[0] >= 0.95
      interval: 1m
      count: 5
      provider:
        prometheus:
          address: http://prometheus:9090
          query: |
            sum(rate(requests_total{status=~"2.."}[5m])) /
            sum(rate(requests_total[5m]))

---
# Blue-Green with Argo Rollouts
spec:
  strategy:
    blueGreen:
      activeService: myapp-active
      previewService: myapp-preview
      autoPromotionEnabled: false
      prePromotionAnalysis:
        templates:
          - templateName: smoke-tests`
        },
        {
          name: 'Multi-Cluster GitOps',
          explanation: 'ApplicationSets for fleet management. Generate apps from Git directories, clusters, or lists. Cluster generators for dynamic discovery. Matrix generators for combinations. Policy enforcement across clusters. Centralized management, distributed execution. Hub-spoke or flat topologies.',
          codeExample: `# ApplicationSet - Deploy to all clusters
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: myapp-all-clusters
  namespace: argocd
spec:
  generators:
    - clusters:
        selector:
          matchLabels:
            environment: production
  template:
    metadata:
      name: 'myapp-{{name}}'
    spec:
      project: default
      source:
        repoURL: https://github.com/org/k8s-manifests.git
        targetRevision: main
        path: 'apps/myapp/overlays/{{metadata.labels.region}}'
      destination:
        server: '{{server}}'
        namespace: myapp

---
# Git Directory Generator - App per directory
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: apps-from-git
spec:
  generators:
    - git:
        repoURL: https://github.com/org/k8s-manifests.git
        revision: main
        directories:
          - path: 'apps/*'
  template:
    metadata:
      name: '{{path.basename}}'
    spec:
      source:
        path: '{{path}}'

---
# Matrix Generator - Clusters x Environments
spec:
  generators:
    - matrix:
        generators:
          - clusters:
              selector:
                matchLabels:
                  type: eks
          - list:
              elements:
                - env: staging
                - env: production`
        }
      ]
    },
    {
      id: 'testing',
      name: 'Testing in CI/CD',
      icon: '🧪',
      color: '#06b6d4',
      description: 'Unit tests (base of pyramid) run in seconds, integration tests in minutes. SAST/DAST for security testing, SCA for dependency vulnerabilities. Test containers for isolated environments. Coverage thresholds and performance baselines as quality gates.',
      diagram: TestingDiagram,
      details: [
        {
          name: 'Test Pyramid',
          explanation: 'Unit tests form the base (fast, many). Integration tests in the middle. E2E tests at the top (slow, few). Unit tests catch most bugs cheaply. Integration tests verify component interaction. E2E tests validate user workflows. Balance coverage and execution time. Fast tests run on every commit, slow tests on merge.',
          codeExample: `# GitHub Actions: Test pyramid implementation
jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Unit Tests
        run: mvn test -Dtest="**/unit/**"
      - name: Upload Coverage
        uses: codecov/codecov-action@v4

  integration-tests:
    needs: unit-tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test
          POSTGRES_PASSWORD: test
        ports: ['5432:5432']
    steps:
      - uses: actions/checkout@v4
      - name: Run Integration Tests
        run: mvn verify -DskipUnitTests
        env:
          SPRING_DATASOURCE_URL: jdbc:postgresql://localhost:5432/test

  e2e-tests:
    needs: integration-tests
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Start Application
        run: docker-compose up -d
      - name: Run E2E Tests
        uses: cypress-io/github-action@v6
        with:
          wait-on: 'http://localhost:8080'
          config: baseUrl=http://localhost:8080`
        },
        {
          name: 'Test Automation',
          explanation: 'Parallel test execution for speed. Test containers for dependencies. Flaky test detection and retry. Test result aggregation and reporting. Coverage thresholds as quality gates. Test impact analysis for selective testing. Mutation testing for test quality. Performance testing in pipeline.',
          codeExample: `# GitLab CI: Parallel testing with test splitting
test:
  stage: test
  image: maven:3.9-eclipse-temurin-21
  services:
    - name: testcontainers/ryuk:0.5.1
  parallel: 4
  script:
    # Split tests across parallel jobs
    - TESTS=\$(find src/test -name "*Test.java" | split -n r/\$CI_NODE_INDEX/\$CI_NODE_TOTAL)
    - mvn test -Dtest=\$(echo $TESTS | tr ' ' ',')
  artifacts:
    reports:
      junit: target/surefire-reports/*.xml
  retry:
    max: 2
    when: script_failure

coverage:
  stage: quality
  script:
    - mvn jacoco:report
    - |
      COVERAGE=\$(grep -oP 'Total.*?([0-9]+)%' target/site/jacoco/index.html | grep -oP '[0-9]+')
      if [ "$COVERAGE" -lt 80 ]; then
        echo "Coverage $COVERAGE% is below 80% threshold"
        exit 1
      fi
  coverage: '/Total.*?([0-9]+)%/'

---
# Testcontainers for integration tests (Java)
@Container
static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
    .withDatabaseName("test")
    .withUsername("test")
    .withPassword("test");

@DynamicPropertySource
static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
}`
        },
        {
          name: 'Security Testing',
          explanation: 'SAST (Static Application Security Testing) scans code. DAST (Dynamic) tests running application. SCA (Software Composition Analysis) for dependencies. Container image scanning. Secret scanning in commits. Penetration testing automation. Compliance as code. Shift-left security approach.',
          codeExample: `# GitLab CI: Security scanning pipeline
include:
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/Container-Scanning.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml

stages:
  - build
  - test
  - security
  - deploy

sast:
  stage: security
  variables:
    SAST_EXCLUDED_PATHS: "spec, test, tests"

dependency_scanning:
  stage: security

container_scanning:
  stage: security
  variables:
    CS_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

---
# GitHub Actions: Security scanning
- name: Run Snyk to check for vulnerabilities
  uses: snyk/actions/maven@master
  env:
    SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
  with:
    args: --severity-threshold=high

- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    scan-type: 'fs'
    scan-ref: '.'
    format: 'sarif'
    output: 'trivy-results.sarif'

- name: Upload Trivy results to GitHub Security
  uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: 'trivy-results.sarif'`
        },
        {
          name: 'Performance Testing',
          explanation: 'Load testing with k6, JMeter, or Gatling. Performance regression detection. Baseline comparison between builds. Stress testing for limits. Soak testing for memory leaks. Synthetic monitoring in staging. Performance budgets as gates. Results visualization and trending.',
          codeExample: `# k6 load test script (load-test.js)
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Steady state
    { duration: '2m', target: 200 },  // Spike
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% under 500ms
    http_req_failed: ['rate<0.01'],    // Error rate < 1%
  },
};

export default function () {
  const res = http.get('http://api.example.com/products');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}

---
# GitHub Actions: Performance testing
performance-test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4

    - name: Run k6 load test
      uses: grafana/k6-action@v0.3.1
      with:
        filename: tests/load-test.js
      env:
        K6_CLOUD_TOKEN: \${{ secrets.K6_CLOUD_TOKEN }}

    - name: Compare with baseline
      run: |
        CURRENT_P95=\$(jq '.metrics.http_req_duration.p95' results.json)
        BASELINE=400
        if (( \$(echo "$CURRENT_P95 > $BASELINE" | bc -l) )); then
          echo "Performance regression: p95 is \${CURRENT_P95}ms (baseline: \${BASELINE}ms)"
          exit 1
        fi`
        }
      ]
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      icon: '✨',
      color: '#ec4899',
      description: 'Keep pipelines under 10 minutes with caching and parallelization. Never store secrets in code; use Vault/AWS Secrets Manager. Monitor DORA metrics (deployment frequency, lead time, failure rate, MTTR) for pipeline health.',
      diagram: BestPracticesDiagram,
      details: [
        {
          name: 'Pipeline Design',
          explanation: 'Keep pipelines fast (under 10 minutes for CI). Fail fast with early validation stages. Parallelize independent steps. Cache dependencies aggressively. Use incremental builds when possible. Separate build and deploy pipelines. Version pipeline as code. Test pipeline changes in branches.',
          codeExample: `# GitLab CI: Optimized pipeline with caching
stages:
  - validate    # Fast checks first
  - build
  - test
  - deploy

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"

cache:
  key: \${CI_COMMIT_REF_SLUG}
  paths:
    - .m2/repository/
    - node_modules/

# Fast validation stage (lint, format check)
validate:
  stage: validate
  script:
    - mvn checkstyle:check
    - mvn spotbugs:check
  timeout: 2m

build:
  stage: build
  script:
    - mvn clean package -DskipTests -T 4C  # Parallel build
  artifacts:
    paths: [target/]
    expire_in: 1 hour
  timeout: 5m

# Parallel test execution
test-unit:
  stage: test
  script:
    - mvn test -T 4C
  parallel: 3

test-integration:
  stage: test
  script:
    - mvn verify -DskipUnitTests

---
# GitHub Actions: Optimized with caching
- uses: actions/cache@v4
  with:
    path: ~/.m2/repository
    key: maven-\${{ hashFiles('**/pom.xml') }}
    restore-keys: maven-`
        },
        {
          name: 'Security Best Practices',
          explanation: 'Never store secrets in code or configs. Use secret management (Vault, AWS Secrets Manager). Rotate credentials regularly. Scan for secrets in commits. Sign artifacts and images. Implement least privilege access. Audit pipeline activities. Network isolation for build agents.',
          codeExample: `# GitHub Actions: Secure secrets handling
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write  # For OIDC
      contents: read
    steps:
      # OIDC authentication - no long-lived credentials
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActions
          aws-region: us-east-1

      # Fetch secrets from Vault
      - name: Get secrets from Vault
        uses: hashicorp/vault-action@v2
        with:
          url: https://vault.example.com
          method: jwt
          role: github-actions
          secrets: |
            secret/data/myapp/prod DB_PASSWORD | DB_PASSWORD

---
# Pre-commit hook for secret detection (.pre-commit-config.yaml)
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks

---
# GitLab CI: Secret detection
include:
  - template: Security/Secret-Detection.gitlab-ci.yml

secret_detection:
  variables:
    SECRET_DETECTION_HISTORIC_SCAN: "true"

---
# Cosign image signing
- name: Sign container image
  run: |
    cosign sign --yes \\
      --key env://COSIGN_PRIVATE_KEY \\
      \${{ env.REGISTRY }}/\${{ env.IMAGE }}@\${{ steps.build.outputs.digest }}`
        },
        {
          name: 'Observability',
          explanation: 'Monitor pipeline health and duration. Alert on failures and slowdowns. Track deployment frequency (DORA metric). Measure lead time for changes. Track change failure rate. Monitor mean time to recovery. Dashboard for pipeline visibility. Log aggregation for debugging.',
          codeExample: `# GitHub Actions: Send metrics to monitoring
- name: Record deployment metrics
  run: |
    curl -X POST https://metrics.example.com/api/v1/write \\
      -H "Authorization: Bearer \${{ secrets.METRICS_TOKEN }}" \\
      -d '{
        "metric": "deployment",
        "tags": {
          "service": "myapp",
          "environment": "production",
          "commit": "\${{ github.sha }}"
        },
        "fields": {
          "duration_seconds": \${{ steps.deploy.outputs.duration }},
          "success": 1
        }
      }'

---
# GitLab CI: Pipeline metrics
# Enable in gitlab-ci.yml
workflow:
  name: 'Pipeline for \$CI_COMMIT_REF_NAME'

# Datadog CI Visibility integration
variables:
  DD_API_KEY: \${{ secrets.DD_API_KEY }}
  DD_SITE: datadoghq.com

.datadog:
  before_script:
    - datadog-ci trace start

---
# Prometheus metrics for DORA
# deployment_frequency - How often deploys happen
# lead_time_for_changes - Time from commit to production
# change_failure_rate - % of deployments causing failures
# time_to_restore - Time to recover from failures

# Grafana dashboard query examples
sum(increase(deployments_total{env="production"}[7d]))  # Weekly deploys
histogram_quantile(0.50, rate(lead_time_seconds_bucket[7d]))  # Median lead time`
        },
        {
          name: 'Rollback Strategies',
          explanation: 'Always have a rollback plan. Blue-green enables instant rollback. Database migrations must be backward compatible. Feature flags for quick disable. Version all configuration. Test rollback procedures regularly. Automate rollback on health check failure. Communication plan for incidents.',
          codeExample: `# Kubernetes: Rollback deployment
# Automatic rollback on failed deployment
kubectl rollout undo deployment/myapp

# Rollback to specific revision
kubectl rollout history deployment/myapp
kubectl rollout undo deployment/myapp --to-revision=3

---
# ArgoCD: Rollback to previous sync
argocd app rollback myapp
argocd app history myapp
argocd app rollback myapp <history-id>

---
# Argo Rollouts: Automatic rollback on analysis failure
apiVersion: argoproj.io/v1alpha1
kind: Rollout
spec:
  strategy:
    canary:
      analysis:
        templates:
          - templateName: error-rate
        args:
          - name: service
            value: myapp
      # Automatically abort and rollback on failure
      abortScaleDownDelaySeconds: 30

---
# Feature flag rollback (LaunchDarkly example)
# Instantly disable feature without deploy
ldcli flags update --project=prod --flag=new-checkout --off

---
# Database migration rollback (Flyway)
# V2__add_column.sql (forward)
ALTER TABLE users ADD COLUMN email VARCHAR(255);

# V2__add_column.sql.undo (rollback)
ALTER TABLE users DROP COLUMN email;

# Execute rollback
flyway undo

---
# GitHub Actions: Automated rollback on health check
- name: Health Check
  id: health
  run: |
    for i in {1..10}; do
      if curl -sf http://myapp.example.com/health; then
        exit 0
      fi
      sleep 30
    done
    exit 1

- name: Rollback on Failure
  if: failure() && steps.health.outcome == 'failure'
  run: kubectl rollout undo deployment/myapp`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

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
      { name: 'DevOps', icon: '🔧', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'CI/CD', icon: '🔄', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'CI/CD', icon: '🔄' })
    }

    return stack
  }

  const handleBreadcrumbClick = (index) => {
    const stack = buildBreadcrumbStack()
    if (stack[index].onClick) {
      stack[index].onClick()
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #93c5fd, #60a5fa)',
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

  const navButtonStyle = {
    padding: '0.75rem 1.25rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
            ← Back to DevOps
          </button>
          <h1 style={titleStyle}>CI/CD Pipelines</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              style={navButtonStyle}
              onClick={onNext}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={CICD_COLORS}
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
        primaryColor={CICD_COLORS.primary}
      />


      {/* Concept Detail Modal */}
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
              colors={CICD_COLORS}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <h2 style={{ color: selectedConcept.color, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button onClick={handlePreviousConcept} disabled={selectedConceptIndex === 0} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>{selectedConceptIndex + 1}/{concepts.length}</span>
                <button onClick={handleNextConcept} disabled={selectedConceptIndex === concepts.length - 1} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>→</button>
                <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button key={i} onClick={() => setSelectedDetailIndex(i)} style={{ padding: '0.5rem 1rem', background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)', border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`, borderRadius: '0.5rem', color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedDetailIndex === i ? '600' : '400', transition: 'all 0.2s' }}>{detail.name}</button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  {DiagramComponent && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  {(detail.code || detail.codeExample) && (
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
                      {detail.code || detail.codeExample}
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

export default CICD

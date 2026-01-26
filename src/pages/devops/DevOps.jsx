import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const DEVOPS_COLORS = {
  primary: '#3b82f6',
  primaryHover: '#60a5fa',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
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

const CICDPipelineDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="cicd-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">CI/CD Pipeline Flow</text>

    <rect x="30" y="60" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Source</text>
    <text x="80" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="9">Git Push</text>

    <rect x="170" y="60" width="100" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="220" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Build</text>
    <text x="220" y="100" textAnchor="middle" fill="#ddd6fe" fontSize="9">Compile</text>

    <rect x="310" y="60" width="100" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="360" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Test</text>
    <text x="360" y="100" textAnchor="middle" fill="#fef3c7" fontSize="9">Unit/Integration</text>

    <rect x="450" y="60" width="100" height="60" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="500" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Security</text>
    <text x="500" y="100" textAnchor="middle" fill="#fbcfe8" fontSize="9">SAST/DAST</text>

    <rect x="590" y="60" width="100" height="60" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="640" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Deploy</text>
    <text x="640" y="100" textAnchor="middle" fill="#a7f3d0" fontSize="9">Staging/Prod</text>

    <rect x="730" y="60" width="50" height="60" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="755" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Live</text>

    <line x1="130" y1="90" x2="165" y2="90" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#cicd-arrow)"/>
    <line x1="270" y1="90" x2="305" y2="90" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#cicd-arrow)"/>
    <line x1="410" y1="90" x2="445" y2="90" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#cicd-arrow)"/>
    <line x1="550" y1="90" x2="585" y2="90" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#cicd-arrow)"/>
    <line x1="690" y1="90" x2="725" y2="90" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#cicd-arrow)"/>

    <rect x="150" y="150" width="500" height="35" rx="6" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="400" y="172" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">Continuous Feedback Loop - Monitoring & Alerting</text>
  </svg>
)

const DockerArchitectureDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="docker-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Docker Architecture</text>

    <rect x="30" y="50" width="150" height="150" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="105" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Docker Client</text>
    <rect x="45" y="90" width="120" height="30" rx="4" fill="#8b5cf6"/>
    <text x="105" y="110" textAnchor="middle" fill="white" fontSize="9">docker build</text>
    <rect x="45" y="130" width="120" height="30" rx="4" fill="#8b5cf6"/>
    <text x="105" y="150" textAnchor="middle" fill="white" fontSize="9">docker run</text>
    <rect x="45" y="170" width="120" height="30" rx="4" fill="#8b5cf6"/>
    <text x="105" y="190" textAnchor="middle" fill="white" fontSize="9">docker push</text>

    <rect x="250" y="50" width="200" height="150" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Docker Daemon</text>
    <rect x="265" y="90" width="80" height="45" rx="4" fill="#3b82f6"/>
    <text x="305" y="110" textAnchor="middle" fill="white" fontSize="9">Images</text>
    <text x="305" y="125" textAnchor="middle" fill="#bfdbfe" fontSize="8">Layers</text>
    <rect x="355" y="90" width="80" height="45" rx="4" fill="#3b82f6"/>
    <text x="395" y="110" textAnchor="middle" fill="white" fontSize="9">Containers</text>
    <text x="395" y="125" textAnchor="middle" fill="#bfdbfe" fontSize="8">Running</text>
    <rect x="265" y="145" width="170" height="45" rx="4" fill="#3b82f6"/>
    <text x="350" y="165" textAnchor="middle" fill="white" fontSize="9">Networks & Volumes</text>
    <text x="350" y="180" textAnchor="middle" fill="#bfdbfe" fontSize="8">bridge, overlay, bind mounts</text>

    <rect x="520" y="50" width="130" height="150" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="585" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Registry</text>
    <rect x="535" y="95" width="100" height="35" rx="4" fill="#22c55e"/>
    <text x="585" y="117" textAnchor="middle" fill="white" fontSize="9">Docker Hub</text>
    <rect x="535" y="140" width="100" height="35" rx="4" fill="#22c55e"/>
    <text x="585" y="162" textAnchor="middle" fill="white" fontSize="9">Private Registry</text>

    <rect x="700" y="70" width="80" height="110" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="740" y="95" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Host OS</text>
    <text x="740" y="115" textAnchor="middle" fill="#9ca3af" fontSize="8">Kernel</text>
    <text x="740" y="135" textAnchor="middle" fill="#9ca3af" fontSize="8">cgroups</text>
    <text x="740" y="155" textAnchor="middle" fill="#9ca3af" fontSize="8">namespaces</text>

    <line x1="180" y1="125" x2="245" y2="125" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#docker-arrow)"/>
    <line x1="450" y1="125" x2="515" y2="125" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#docker-arrow)"/>
    <line x1="650" y1="125" x2="695" y2="125" stroke="#22c55e" strokeWidth="2" markerEnd="url(#docker-arrow)"/>
  </svg>
)

const KubernetesArchitectureDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Kubernetes Architecture</text>

    <rect x="30" y="50" width="350" height="100" rx="8" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="2"/>
    <text x="205" y="75" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Control Plane (Master)</text>
    <rect x="45" y="85" width="70" height="50" rx="4" fill="#ef4444"/>
    <text x="80" y="105" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">API</text>
    <text x="80" y="118" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Server</text>
    <rect x="125" y="85" width="70" height="50" rx="4" fill="#ef4444"/>
    <text x="160" y="105" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">etcd</text>
    <text x="160" y="118" textAnchor="middle" fill="#fecaca" fontSize="7">Key-Value</text>
    <rect x="205" y="85" width="70" height="50" rx="4" fill="#ef4444"/>
    <text x="240" y="105" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Scheduler</text>
    <rect x="285" y="85" width="80" height="50" rx="4" fill="#ef4444"/>
    <text x="325" y="105" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Controller</text>
    <text x="325" y="118" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Manager</text>

    <rect x="420" y="50" width="350" height="210" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="595" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Worker Nodes</text>

    <rect x="435" y="90" width="150" height="80" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="510" y="110" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Node 1</text>
    <rect x="445" y="120" width="60" height="35" rx="3" fill="#3b82f6"/>
    <text x="475" y="142" textAnchor="middle" fill="white" fontSize="8">kubelet</text>
    <rect x="515" y="120" width="60" height="35" rx="3" fill="#3b82f6"/>
    <text x="545" y="142" textAnchor="middle" fill="white" fontSize="8">Pods</text>

    <rect x="605" y="90" width="150" height="80" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="680" y="110" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Node 2</text>
    <rect x="615" y="120" width="60" height="35" rx="3" fill="#3b82f6"/>
    <text x="645" y="142" textAnchor="middle" fill="white" fontSize="8">kubelet</text>
    <rect x="685" y="120" width="60" height="35" rx="3" fill="#3b82f6"/>
    <text x="715" y="142" textAnchor="middle" fill="white" fontSize="8">Pods</text>

    <rect x="520" y="185" width="150" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="595" y="210" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Services</text>
    <text x="595" y="230" textAnchor="middle" fill="#9ca3af" fontSize="8">ClusterIP | NodePort | LoadBalancer</text>

    <rect x="30" y="180" width="350" height="80" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="205" y="205" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">kubectl & Config</text>
    <text x="205" y="225" textAnchor="middle" fill="#9ca3af" fontSize="9">Deployments | ConfigMaps | Secrets | HPA</text>
    <text x="205" y="245" textAnchor="middle" fill="#9ca3af" fontSize="9">Ingress | PersistentVolumes | RBAC</text>
  </svg>
)

const DeploymentStrategiesDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Deployment Strategies</text>

    <rect x="30" y="50" width="230" height="80" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="145" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Blue-Green</text>
    <rect x="50" y="90" width="60" height="30" rx="4" fill="#3b82f6"/>
    <text x="80" y="110" textAnchor="middle" fill="white" fontSize="9">Blue v1</text>
    <rect x="180" y="90" width="60" height="30" rx="4" fill="#22c55e"/>
    <text x="210" y="110" textAnchor="middle" fill="white" fontSize="9">Green v2</text>
    <text x="145" y="90" textAnchor="middle" fill="#64748b" fontSize="20">→</text>

    <rect x="285" y="50" width="230" height="80" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Canary Release</text>
    <rect x="300" y="90" width="80" height="30" rx="4" fill="#f59e0b"/>
    <text x="340" y="110" textAnchor="middle" fill="white" fontSize="9">95% v1</text>
    <rect x="420" y="90" width="80" height="30" rx="4" fill="#22c55e"/>
    <text x="460" y="110" textAnchor="middle" fill="white" fontSize="9">5% v2</text>

    <rect x="540" y="50" width="230" height="80" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="655" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Rolling Update</text>
    <rect x="555" y="90" width="40" height="30" rx="4" fill="#8b5cf6"/>
    <text x="575" y="110" textAnchor="middle" fill="white" fontSize="8">v1</text>
    <rect x="600" y="90" width="40" height="30" rx="4" fill="#22c55e"/>
    <text x="620" y="110" textAnchor="middle" fill="white" fontSize="8">v2</text>
    <rect x="645" y="90" width="40" height="30" rx="4" fill="#22c55e"/>
    <text x="665" y="110" textAnchor="middle" fill="white" fontSize="8">v2</text>
    <rect x="690" y="90" width="40" height="30" rx="4" fill="#22c55e"/>
    <text x="710" y="110" textAnchor="middle" fill="white" fontSize="8">v2</text>

    <rect x="150" y="160" width="500" height="60" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="185" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Key Benefits</text>
    <text x="250" y="205" textAnchor="middle" fill="#9ca3af" fontSize="9">Zero Downtime</text>
    <text x="400" y="205" textAnchor="middle" fill="#9ca3af" fontSize="9">Easy Rollback</text>
    <text x="550" y="205" textAnchor="middle" fill="#9ca3af" fontSize="9">Risk Mitigation</text>
  </svg>
)

const MonitoringStackDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="monitor-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Observability Stack</text>

    <rect x="30" y="60" width="140" height="130" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="100" y="85" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Applications</text>
    <rect x="45" y="100" width="110" height="25" rx="4" fill="#f59e0b"/>
    <text x="100" y="117" textAnchor="middle" fill="white" fontSize="9">Metrics /metrics</text>
    <rect x="45" y="130" width="110" height="25" rx="4" fill="#f59e0b"/>
    <text x="100" y="147" textAnchor="middle" fill="white" fontSize="9">Logs stdout</text>
    <rect x="45" y="160" width="110" height="25" rx="4" fill="#f59e0b"/>
    <text x="100" y="177" textAnchor="middle" fill="white" fontSize="9">Traces spans</text>

    <rect x="220" y="60" width="140" height="130" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="290" y="85" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Collection</text>
    <rect x="235" y="100" width="110" height="25" rx="4" fill="#ef4444"/>
    <text x="290" y="117" textAnchor="middle" fill="white" fontSize="9">Prometheus</text>
    <rect x="235" y="130" width="110" height="25" rx="4" fill="#ef4444"/>
    <text x="290" y="147" textAnchor="middle" fill="white" fontSize="9">Loki / Fluentd</text>
    <rect x="235" y="160" width="110" height="25" rx="4" fill="#ef4444"/>
    <text x="290" y="177" textAnchor="middle" fill="white" fontSize="9">Jaeger / Tempo</text>

    <rect x="410" y="60" width="140" height="130" rx="8" fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="2"/>
    <text x="480" y="85" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">Visualization</text>
    <rect x="425" y="110" width="110" height="60" rx="4" fill="#eab308"/>
    <text x="480" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Grafana</text>
    <text x="480" y="155" textAnchor="middle" fill="#fef9c3" fontSize="9">Dashboards</text>

    <rect x="600" y="60" width="170" height="130" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="685" y="85" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Alerting</text>
    <rect x="615" y="100" width="140" height="25" rx="4" fill="#8b5cf6"/>
    <text x="685" y="117" textAnchor="middle" fill="white" fontSize="9">Alertmanager</text>
    <rect x="615" y="130" width="65" height="25" rx="4" fill="#8b5cf6"/>
    <text x="647" y="147" textAnchor="middle" fill="white" fontSize="8">Slack</text>
    <rect x="690" y="130" width="65" height="25" rx="4" fill="#8b5cf6"/>
    <text x="722" y="147" textAnchor="middle" fill="white" fontSize="8">PagerDuty</text>
    <rect x="615" y="160" width="140" height="25" rx="4" fill="#8b5cf6"/>
    <text x="685" y="177" textAnchor="middle" fill="white" fontSize="9">Email / Webhook</text>

    <line x1="170" y1="125" x2="215" y2="125" stroke="#f97316" strokeWidth="2" markerEnd="url(#monitor-arrow)"/>
    <line x1="360" y1="125" x2="405" y2="125" stroke="#f97316" strokeWidth="2" markerEnd="url(#monitor-arrow)"/>
    <line x1="550" y1="125" x2="595" y2="125" stroke="#f97316" strokeWidth="2" markerEnd="url(#monitor-arrow)"/>
  </svg>
)

const JenkinsPipelineDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="jenkins-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Jenkins Pipeline Architecture</text>

    <rect x="30" y="50" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Git Repo</text>
    <text x="80" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">Jenkinsfile</text>

    <rect x="170" y="50" width="120" height="60" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="230" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Jenkins Master</text>
    <text x="230" y="92" textAnchor="middle" fill="#a7f3d0" fontSize="8">Pipeline DSL</text>

    <rect x="330" y="40" width="100" height="40" rx="6" fill="#f59e0b"/>
    <text x="380" y="65" textAnchor="middle" fill="white" fontSize="9">Agent 1</text>
    <rect x="330" y="90" width="100" height="40" rx="6" fill="#f59e0b"/>
    <text x="380" y="115" textAnchor="middle" fill="white" fontSize="9">Agent 2</text>

    <rect x="470" y="50" width="100" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="520" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Artifactory</text>
    <text x="520" y="92" textAnchor="middle" fill="#ddd6fe" fontSize="8">Build Artifacts</text>

    <rect x="610" y="50" width="80" height="60" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Sonar</text>
    <text x="650" y="92" textAnchor="middle" fill="#fbcfe8" fontSize="8">Quality</text>

    <rect x="730" y="50" width="50" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="755" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">K8s</text>

    <line x1="130" y1="80" x2="165" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#jenkins-arrow)"/>
    <line x1="290" y1="80" x2="325" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#jenkins-arrow)"/>
    <line x1="430" y1="80" x2="465" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#jenkins-arrow)"/>
    <line x1="570" y1="80" x2="605" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#jenkins-arrow)"/>
    <line x1="690" y1="80" x2="725" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#jenkins-arrow)"/>

    <rect x="200" y="150" width="400" height="35" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1"/>
    <text x="400" y="172" textAnchor="middle" fill="#34d399" fontSize="10">Shared Libraries | Blue Ocean | Pipeline Syntax Generator</text>
  </svg>
)

const TeamCityDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">TeamCity Build Configuration</text>

    <rect x="30" y="50" width="180" height="130" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Project Structure</text>
    <rect x="45" y="90" width="150" height="25" rx="4" fill="#3b82f6"/>
    <text x="120" y="107" textAnchor="middle" fill="white" fontSize="9">VCS Roots (Git/SVN)</text>
    <rect x="45" y="120" width="150" height="25" rx="4" fill="#3b82f6"/>
    <text x="120" y="137" textAnchor="middle" fill="white" fontSize="9">Build Configurations</text>
    <rect x="45" y="150" width="150" height="25" rx="4" fill="#3b82f6"/>
    <text x="120" y="167" textAnchor="middle" fill="white" fontSize="9">Templates & Parameters</text>

    <rect x="250" y="50" width="180" height="130" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="340" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Build Steps</text>
    <rect x="265" y="90" width="150" height="25" rx="4" fill="#8b5cf6"/>
    <text x="340" y="107" textAnchor="middle" fill="white" fontSize="9">Kotlin DSL</text>
    <rect x="265" y="120" width="150" height="25" rx="4" fill="#8b5cf6"/>
    <text x="340" y="137" textAnchor="middle" fill="white" fontSize="9">Maven/Gradle Runners</text>
    <rect x="265" y="150" width="150" height="25" rx="4" fill="#8b5cf6"/>
    <text x="340" y="167" textAnchor="middle" fill="white" fontSize="9">Docker Build & Push</text>

    <rect x="470" y="50" width="140" height="130" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="540" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Build Agents</text>
    <rect x="485" y="90" width="110" height="35" rx="4" fill="#f59e0b"/>
    <text x="540" y="112" textAnchor="middle" fill="white" fontSize="9">Linux Pool</text>
    <rect x="485" y="130" width="110" height="35" rx="4" fill="#f59e0b"/>
    <text x="540" y="152" textAnchor="middle" fill="white" fontSize="9">Windows Pool</text>

    <rect x="650" y="50" width="130" height="130" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="715" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Features</text>
    <text x="715" y="100" textAnchor="middle" fill="#9ca3af" fontSize="9">Build Chains</text>
    <text x="715" y="120" textAnchor="middle" fill="#9ca3af" fontSize="9">Artifact Deps</text>
    <text x="715" y="140" textAnchor="middle" fill="#9ca3af" fontSize="9">Test Reports</text>
    <text x="715" y="160" textAnchor="middle" fill="#9ca3af" fontSize="9">Code Coverage</text>
  </svg>
)

const GrafanaDashboardDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Grafana Dashboard Architecture</text>

    <rect x="30" y="50" width="150" height="130" rx="8" fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="2"/>
    <text x="105" y="75" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">Data Sources</text>
    <rect x="45" y="90" width="120" height="22" rx="3" fill="#eab308"/>
    <text x="105" y="105" textAnchor="middle" fill="white" fontSize="8">Prometheus</text>
    <rect x="45" y="117" width="120" height="22" rx="3" fill="#eab308"/>
    <text x="105" y="132" textAnchor="middle" fill="white" fontSize="8">Loki</text>
    <rect x="45" y="144" width="120" height="22" rx="3" fill="#eab308"/>
    <text x="105" y="159" textAnchor="middle" fill="white" fontSize="8">Elasticsearch</text>

    <rect x="220" y="50" width="350" height="130" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="395" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Dashboard Panels</text>
    <rect x="235" y="90" width="100" height="75" rx="4" fill="#3b82f6"/>
    <text x="285" y="120" textAnchor="middle" fill="white" fontSize="9">Time Series</text>
    <text x="285" y="140" textAnchor="middle" fill="#bfdbfe" fontSize="8">CPU/Memory</text>
    <rect x="345" y="90" width="100" height="75" rx="4" fill="#8b5cf6"/>
    <text x="395" y="120" textAnchor="middle" fill="white" fontSize="9">Gauge</text>
    <text x="395" y="140" textAnchor="middle" fill="#ddd6fe" fontSize="8">SLI/SLO</text>
    <rect x="455" y="90" width="100" height="75" rx="4" fill="#22c55e"/>
    <text x="505" y="120" textAnchor="middle" fill="white" fontSize="9">Table/Logs</text>
    <text x="505" y="140" textAnchor="middle" fill="#a7f3d0" fontSize="8">Events</text>

    <rect x="610" y="50" width="160" height="130" rx="8" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="690" y="75" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">Features</text>
    <text x="690" y="100" textAnchor="middle" fill="#9ca3af" fontSize="9">Variables & Templates</text>
    <text x="690" y="120" textAnchor="middle" fill="#9ca3af" fontSize="9">Annotations</text>
    <text x="690" y="140" textAnchor="middle" fill="#9ca3af" fontSize="9">Alert Rules</text>
    <text x="690" y="160" textAnchor="middle" fill="#9ca3af" fontSize="9">Team Permissions</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function DevOps({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'cicd',
      name: 'CI/CD Pipelines',
      icon: '🔄',
      color: '#06b6d4',
      description: 'Continuous Integration & Delivery fundamentals, pipeline architecture, and automation strategies',
      diagram: CICDPipelineDiagram,
      details: [
        {
          name: 'Pipeline Stages',
          explanation: 'A CI/CD pipeline automates the software delivery process through distinct stages: Source (code commit triggers), Build (compile and package), Test (unit, integration, e2e), Security (SAST/DAST scanning), and Deploy (staging/production). Each stage acts as a quality gate - failures stop the pipeline and notify the team. Modern pipelines support parallel execution, caching, and artifact promotion between environments.',
          codeExample: `# GitHub Actions Pipeline
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

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

      - name: Build with Maven
        run: mvn clean package -DskipTests

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: app-jar
          path: target/*.jar

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Tests
        run: mvn test
      - name: Upload Coverage
        uses: codecov/codecov-action@v4

  security-scan:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'CRITICAL,HIGH'

  deploy-staging:
    needs: [test, security-scan]
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to Staging
        run: |
          kubectl apply -f k8s/staging/

  deploy-production:
    needs: [test, security-scan]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to Production
        run: |
          kubectl apply -f k8s/production/`
        },
        {
          name: 'Branching Strategies',
          explanation: 'GitFlow uses feature, develop, release, and hotfix branches for structured releases. Trunk-based development keeps all work on main with short-lived feature branches (<1 day). GitHub Flow is simpler: branch from main, open PR, merge after review. Choose based on team size, release cadence, and compliance needs. Trunk-based suits continuous deployment; GitFlow fits scheduled releases.',
          codeExample: `# GitFlow Branching
# Feature branch workflow
git checkout develop
git checkout -b feature/user-authentication
# ... make changes ...
git commit -m "Add JWT authentication"
git push origin feature/user-authentication
# Create PR to develop

# Release branch
git checkout develop
git checkout -b release/1.2.0
# Bump version, final testing
git checkout main
git merge release/1.2.0 --no-ff
git tag -a v1.2.0 -m "Release 1.2.0"

# Trunk-Based Development
git checkout main
git checkout -b feature/quick-fix
# Small, focused change (<1 day)
git commit -m "Fix login redirect"
git push origin feature/quick-fix
# PR + merge same day

# Feature Flags for trunk-based
@Component
public class FeatureFlags {
    @Value("\${features.new-checkout:false}")
    private boolean newCheckoutEnabled;

    public boolean isNewCheckoutEnabled() {
        return newCheckoutEnabled;
    }
}

// Usage
if (featureFlags.isNewCheckoutEnabled()) {
    return newCheckoutFlow.process(order);
} else {
    return legacyCheckout.process(order);
}`
        },
        {
          name: 'Artifact Management',
          explanation: 'Artifacts are versioned outputs of the build process - JARs, Docker images, npm packages. Store in repositories like Artifactory, Nexus, or cloud registries. Use semantic versioning (major.minor.patch) and immutable tags. Implement retention policies to manage storage. Promote artifacts through environments (dev→staging→prod) rather than rebuilding.',
          codeExample: `# Docker Build & Push to Registry
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Copy only the built artifact
COPY --from=build /app/target/*.jar app.jar

# Security: Run as non-root
RUN addgroup -g 1000 appgroup && \\
    adduser -u 1000 -G appgroup -D appuser
USER appuser

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

---
# Build and push with versioning
docker build -t myapp:$GIT_SHA -t myapp:latest .
docker push myregistry.io/myapp:$GIT_SHA
docker push myregistry.io/myapp:latest

# Maven deploy to Artifactory
<distributionManagement>
    <repository>
        <id>releases</id>
        <url>https://artifactory.company.com/releases</url>
    </repository>
    <snapshotRepository>
        <id>snapshots</id>
        <url>https://artifactory.company.com/snapshots</url>
    </snapshotRepository>
</distributionManagement>`
        }
      ]
    },
    {
      id: 'docker',
      name: 'Docker',
      icon: '🐳',
      color: '#8b5cf6',
      description: 'Container platform for consistent development and deployment environments',
      diagram: DockerArchitectureDiagram,
      details: [
        {
          name: 'Container Fundamentals',
          explanation: 'Docker containers package applications with their dependencies into isolated, portable units. Unlike VMs, containers share the host OS kernel, making them lightweight (MBs vs GBs) and fast to start (seconds vs minutes). Images are built from Dockerfiles in layers - each instruction creates a cacheable layer. Use multi-stage builds to create minimal production images.',
          codeExample: `# Multi-stage Dockerfile for Java
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Cache dependencies
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN ./mvnw dependency:go-offline

# Build application
COPY src ./src
RUN ./mvnw package -DskipTests

# Production image - minimal runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Security hardening
RUN addgroup -g 1000 spring && \\
    adduser -u 1000 -G spring -D spring
USER spring:spring

# Copy only the JAR
COPY --from=build /app/target/*.jar app.jar

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget -q --spider http://localhost:8080/actuator/health || exit 1

EXPOSE 8080
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "app.jar"]`
        },
        {
          name: 'Docker Compose',
          explanation: 'Compose defines multi-container applications in a YAML file. Perfect for local development environments with databases, caches, and message brokers. Services can depend on each other, share networks, and mount volumes. Use profiles for optional services and environment files for configuration.',
          codeExample: `# docker-compose.yml
version: '3.9'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=local
      - DATABASE_URL=jdbc:postgresql://db:5432/myapp
      - REDIS_HOST=redis
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network
    volumes:
      - ./logs:/app/logs

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:`
        },
        {
          name: 'Best Practices',
          explanation: 'Use official base images and keep them updated. Run as non-root user. Use .dockerignore to exclude unnecessary files. Pin versions (not :latest in production). Scan images for vulnerabilities with Trivy or Snyk. Use secrets management - never embed credentials. Implement health checks for orchestration.',
          codeExample: `# .dockerignore
**/.git
**/.gitignore
**/node_modules
**/target
**/*.log
**/Dockerfile*
**/docker-compose*
**/.env
**/README.md

# Security scanning with Trivy
trivy image --severity HIGH,CRITICAL myapp:latest

# Docker secrets (Swarm/Compose)
echo "my-secret-password" | docker secret create db_password -

# docker-compose with secrets
services:
  app:
    image: myapp:latest
    secrets:
      - db_password
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  db_password:
    external: true

# Container resource limits
docker run -d \\
  --memory="512m" \\
  --cpus="1.0" \\
  --pids-limit=100 \\
  --read-only \\
  --security-opt=no-new-privileges \\
  myapp:latest`
        }
      ]
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      icon: '☸️',
      color: '#ef4444',
      description: 'Production-grade container orchestration for scalable, resilient applications',
      diagram: KubernetesArchitectureDiagram,
      details: [
        {
          name: 'Core Resources',
          explanation: 'Pods are the smallest deployable units containing one or more containers. Deployments manage Pod replicas and rolling updates. Services provide stable networking endpoints (ClusterIP for internal, LoadBalancer for external). ConfigMaps and Secrets separate configuration from code. Namespaces isolate resources.',
          codeExample: `# Deployment with best practices
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myregistry/myapp:v1.2.3
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "production"
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
        volumeMounts:
        - name: config
          mountPath: /app/config
      volumes:
      - name: config
        configMap:
          name: myapp-config`
        },
        {
          name: 'Services & Ingress',
          explanation: 'Services expose Pods internally (ClusterIP) or externally (NodePort, LoadBalancer). Ingress provides HTTP/HTTPS routing with host/path-based rules, TLS termination, and load balancing. Use annotations for cloud-specific features like AWS ALB or GCP load balancers.',
          codeExample: `# Service
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 8080
  type: ClusterIP
---
# Ingress with TLS
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.myapp.com
    secretName: myapp-tls
  rules:
  - host: api.myapp.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
      - path: /health
        pathType: Exact
        backend:
          service:
            name: myapp-service
            port:
              number: 80`
        },
        {
          name: 'Scaling & HPA',
          explanation: 'Horizontal Pod Autoscaler (HPA) automatically scales Pods based on CPU, memory, or custom metrics. Vertical Pod Autoscaler (VPA) adjusts resource requests. Cluster Autoscaler adds/removes nodes. Use Pod Disruption Budgets (PDB) to ensure availability during updates.',
          codeExample: `# Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
---
# Pod Disruption Budget
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: myapp-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: myapp`
        }
      ]
    },
    {
      id: 'deployment',
      name: 'Deployment Strategies',
      icon: '🚀',
      color: '#ec4899',
      description: 'Zero-downtime deployment patterns for safe, controlled releases',
      diagram: DeploymentStrategiesDiagram,
      details: [
        {
          name: 'Blue-Green Deployment',
          explanation: 'Maintain two identical production environments (Blue and Green). Deploy new version to inactive environment, run smoke tests, then switch traffic via load balancer. Instant rollback by switching back. Requires 2x infrastructure but provides safest deployments with zero downtime.',
          codeExample: `# Blue-Green with Kubernetes Services
# Blue deployment (current production)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-blue
  labels:
    version: blue
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
    spec:
      containers:
      - name: myapp
        image: myapp:1.0.0
---
# Green deployment (new version)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-green
  labels:
    version: green
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
    spec:
      containers:
      - name: myapp
        image: myapp:2.0.0
---
# Service - switch selector to swap
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
    version: green  # Change to 'blue' for rollback
  ports:
  - port: 80
    targetPort: 8080`
        },
        {
          name: 'Canary Release',
          explanation: 'Gradually shift traffic from old to new version. Start with 5% of users, monitor metrics, then increase to 25%, 50%, 100%. Use service mesh (Istio) or ingress controller for traffic splitting. Automatically rollback if error rates spike.',
          codeExample: `# Canary with Istio
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp
spec:
  hosts:
  - myapp
  http:
  - match:
    - headers:
        x-canary:
          exact: "true"
    route:
    - destination:
        host: myapp
        subset: canary
  - route:
    - destination:
        host: myapp
        subset: stable
      weight: 95
    - destination:
        host: myapp
        subset: canary
      weight: 5
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: myapp
spec:
  host: myapp
  subsets:
  - name: stable
    labels:
      version: v1
  - name: canary
    labels:
      version: v2
---
# Argo Rollouts for automated canary
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp-rollout
spec:
  replicas: 5
  strategy:
    canary:
      steps:
      - setWeight: 5
      - pause: {duration: 5m}
      - setWeight: 25
      - pause: {duration: 10m}
      - setWeight: 50
      - pause: {duration: 10m}
      - setWeight: 100
      analysis:
        templates:
        - templateName: success-rate
        startingStep: 2`
        },
        {
          name: 'Feature Flags',
          explanation: 'Decouple deployment from release. Deploy code to production but control feature visibility via flags. Enable for specific users, percentages, or environments. Supports A/B testing and kill switches. Use LaunchDarkly, Unleash, or simple config.',
          codeExample: `// Feature Flag Service
@Service
public class FeatureFlagService {
    private final UnleashClient unleash;

    public boolean isEnabled(String feature, UnleashContext context) {
        return unleash.isEnabled(feature, context);
    }

    public boolean isEnabled(String feature, String userId) {
        UnleashContext context = UnleashContext.builder()
            .userId(userId)
            .build();
        return unleash.isEnabled(feature, context);
    }
}

// Usage in Controller
@RestController
public class CheckoutController {

    @Autowired
    private FeatureFlagService flags;

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody Order order,
                                       @AuthenticationPrincipal User user) {
        if (flags.isEnabled("new-checkout-flow", user.getId())) {
            // New checkout implementation
            return newCheckoutService.process(order);
        } else {
            // Legacy checkout
            return legacyCheckoutService.process(order);
        }
    }
}

// Unleash configuration
unleash:
  app-name: myapp
  instance-id: \${HOSTNAME}
  environment: production
  api:
    url: https://unleash.company.com/api
    token: \${UNLEASH_API_TOKEN}`
        }
      ]
    },
    {
      id: 'monitoring',
      name: 'Prometheus & Grafana',
      icon: '📊',
      color: '#f97316',
      description: 'Metrics collection, visualization, and alerting for cloud-native observability',
      diagram: MonitoringStackDiagram,
      details: [
        {
          name: 'Prometheus Metrics',
          explanation: 'Prometheus scrapes metrics from /metrics endpoints at regular intervals. Four metric types: Counter (cumulative), Gauge (point-in-time), Histogram (distributions), Summary (quantiles). Use labels for dimensions. PromQL queries aggregate and transform time-series data.',
          codeExample: `# Spring Boot Actuator + Micrometer
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus,metrics
  metrics:
    tags:
      application: myapp
      environment: production

# Custom metrics in Java
@Component
public class OrderMetrics {
    private final Counter ordersCreated;
    private final Timer orderProcessingTime;
    private final Gauge activeOrders;

    public OrderMetrics(MeterRegistry registry) {
        this.ordersCreated = Counter.builder("orders_created_total")
            .description("Total orders created")
            .tag("status", "success")
            .register(registry);

        this.orderProcessingTime = Timer.builder("order_processing_seconds")
            .description("Time to process orders")
            .publishPercentiles(0.5, 0.95, 0.99)
            .register(registry);

        this.activeOrders = Gauge.builder("active_orders",
            orderRepository::countActiveOrders)
            .description("Currently active orders")
            .register(registry);
    }

    public void recordOrder(Order order) {
        ordersCreated.increment();
    }

    public void timeOrderProcessing(Runnable task) {
        orderProcessingTime.record(task);
    }
}

# PromQL queries
# Request rate per second
rate(http_server_requests_seconds_count[5m])

# 95th percentile latency
histogram_quantile(0.95,
  rate(http_server_requests_seconds_bucket[5m]))

# Error rate
sum(rate(http_server_requests_seconds_count{status=~"5.."}[5m]))
/ sum(rate(http_server_requests_seconds_count[5m]))`
        },
        {
          name: 'Grafana Dashboards',
          explanation: 'Grafana visualizes metrics from Prometheus, Loki (logs), and 50+ data sources. Create dashboards with variables for dynamic filtering. Use annotations to mark deployments. Set up alert rules with notification channels (Slack, PagerDuty, email).',
          diagram: GrafanaDashboardDiagram,
          codeExample: `# Grafana Dashboard JSON (simplified)
{
  "dashboard": {
    "title": "Application Overview",
    "templating": {
      "list": [
        {
          "name": "namespace",
          "type": "query",
          "query": "label_values(kube_pod_info, namespace)"
        }
      ]
    },
    "panels": [
      {
        "title": "Request Rate",
        "type": "timeseries",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{namespace=\"$namespace\"}[5m])) by (service)",
            "legendFormat": "{{service}}"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) * 100"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "percent",
            "thresholds": {
              "steps": [
                {"color": "green", "value": null},
                {"color": "yellow", "value": 1},
                {"color": "red", "value": 5}
              ]
            }
          }
        }
      }
    ]
  }
}`
        },
        {
          name: 'Alerting',
          explanation: 'Configure alerts in Prometheus Alertmanager or Grafana. Define thresholds for SLIs (latency, error rate, saturation). Group related alerts to reduce noise. Route to appropriate channels based on severity. Implement runbooks for common alerts.',
          codeExample: `# Prometheus Alert Rules
groups:
- name: application-alerts
  rules:
  - alert: HighErrorRate
    expr: |
      sum(rate(http_server_requests_seconds_count{status=~"5.."}[5m]))
      / sum(rate(http_server_requests_seconds_count[5m])) > 0.05
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value | humanizePercentage }}"
      runbook_url: "https://wiki.company.com/runbooks/high-error-rate"

  - alert: HighLatency
    expr: |
      histogram_quantile(0.95,
        rate(http_server_requests_seconds_bucket[5m])) > 0.5
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High latency detected"
      description: "95th percentile latency is {{ $value }}s"

# Alertmanager routing
route:
  receiver: 'default'
  group_by: ['alertname', 'cluster']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  routes:
  - match:
      severity: critical
    receiver: 'pagerduty-critical'
  - match:
      severity: warning
    receiver: 'slack-warnings'

receivers:
- name: 'pagerduty-critical'
  pagerduty_configs:
  - service_key: '<pagerduty-key>'
- name: 'slack-warnings'
  slack_configs:
  - api_url: '<slack-webhook>'
    channel: '#alerts'`
        }
      ]
    },
    {
      id: 'jenkins',
      name: 'Jenkins',
      icon: '🧰',
      color: '#10b981',
      description: 'Open-source automation server with extensive plugin ecosystem',
      diagram: JenkinsPipelineDiagram,
      details: [
        {
          name: 'Declarative Pipeline',
          explanation: 'Jenkinsfile defines pipeline as code in your repository. Declarative syntax is structured and opinionated. Stages organize work, steps execute commands. Supports parallel execution, input prompts, and post-build actions. Shared libraries enable code reuse.',
          codeExample: `// Jenkinsfile (Declarative)
pipeline {
    agent {
        kubernetes {
            yaml '''
            spec:
              containers:
              - name: maven
                image: maven:3.9-eclipse-temurin-21
                command: ['sleep', 'infinity']
              - name: docker
                image: docker:24-dind
                securityContext:
                  privileged: true
            '''
        }
    }

    environment {
        DOCKER_REGISTRY = 'registry.company.com'
        APP_NAME = 'myapp'
    }

    stages {
        stage('Build') {
            steps {
                container('maven') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        container('maven') {
                            sh 'mvn test'
                        }
                    }
                    post {
                        always {
                            junit '**/target/surefire-reports/*.xml'
                        }
                    }
                }
                stage('Integration Tests') {
                    steps {
                        container('maven') {
                            sh 'mvn verify -DskipUnitTests'
                        }
                    }
                }
            }
        }

        stage('Build Image') {
            steps {
                container('docker') {
                    sh """
                        docker build -t \${DOCKER_REGISTRY}/\${APP_NAME}:\${BUILD_NUMBER} .
                        docker push \${DOCKER_REGISTRY}/\${APP_NAME}:\${BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                sh 'kubectl apply -f k8s/staging/'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            input {
                message "Deploy to production?"
                ok "Deploy"
            }
            steps {
                sh 'kubectl apply -f k8s/production/'
            }
        }
    }

    post {
        failure {
            slackSend channel: '#builds',
                      color: 'danger',
                      message: "Build failed: \${env.JOB_NAME} #\${env.BUILD_NUMBER}"
        }
        success {
            slackSend channel: '#builds',
                      color: 'good',
                      message: "Build succeeded: \${env.JOB_NAME} #\${env.BUILD_NUMBER}"
        }
    }
}`
        },
        {
          name: 'Shared Libraries',
          explanation: 'Shared libraries extract common pipeline logic into reusable Groovy code. Store in a separate Git repository. Define custom steps, utilities, and templates. Import in Jenkinsfile with @Library annotation. Versioned for stability.',
          codeExample: `// vars/buildJavaApp.groovy (Shared Library)
def call(Map config = [:]) {
    def appName = config.appName ?: error("appName required")
    def jdkVersion = config.jdkVersion ?: '21'

    pipeline {
        agent any

        tools {
            jdk "jdk-\${jdkVersion}"
            maven 'maven-3.9'
        }

        stages {
            stage('Checkout') {
                steps {
                    checkout scm
                }
            }

            stage('Build') {
                steps {
                    sh 'mvn clean package -DskipTests'
                }
            }

            stage('Test') {
                steps {
                    sh 'mvn test'
                }
                post {
                    always {
                        junit '**/surefire-reports/*.xml'
                        jacoco execPattern: '**/jacoco.exec'
                    }
                }
            }

            stage('SonarQube') {
                steps {
                    withSonarQubeEnv('sonar') {
                        sh 'mvn sonar:sonar'
                    }
                }
            }

            stage('Quality Gate') {
                steps {
                    timeout(time: 5, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }
    }
}

// Usage in Jenkinsfile
@Library('my-shared-library@main') _

buildJavaApp(
    appName: 'order-service',
    jdkVersion: '21'
)`
        },
        {
          name: 'Blue Ocean & Plugins',
          explanation: 'Blue Ocean provides a modern visual interface for Jenkins pipelines with real-time visualization, GitHub/Bitbucket integration, and pipeline editor. Jenkins extensive plugin ecosystem (1800+) covers SCM, build tools, notifications, security, and cloud integrations. Essential plugins: Pipeline, Git, Docker, Kubernetes, Slack, SonarQube.',
          codeExample: `// Blue Ocean Pipeline Editor Features
// - Visual pipeline creation
// - Stage-level restart
// - Real-time logs per step
// - GitHub/Bitbucket integration
// - Favorite pipelines dashboard

// Essential Jenkins Plugins
plugins {
    // Pipeline & SCM
    id 'workflow-aggregator'      // Pipeline plugin suite
    id 'git'                       // Git integration
    id 'github-branch-source'      // GitHub multi-branch
    id 'bitbucket-branch-source'   // Bitbucket multi-branch

    // Build & Test
    id 'maven-plugin'              // Maven builds
    id 'gradle'                    // Gradle builds
    id 'junit'                     // Test reports
    id 'jacoco'                    // Code coverage

    // Docker & Kubernetes
    id 'docker-workflow'           // Docker in pipelines
    id 'docker-build-step'         // Docker build steps
    id 'kubernetes'                // K8s cloud agents
    id 'kubernetes-cli'            // kubectl in pipelines

    // Quality & Security
    id 'sonar'                     // SonarQube integration
    id 'dependency-check-jenkins'  // OWASP dependency check
    id 'credentials'               // Secure credentials
    id 'credentials-binding'       // Use creds in pipelines

    // Notifications
    id 'slack'                     // Slack notifications
    id 'email-ext'                 // Extended email
    id 'mailer'                    // Basic email

    // Utilities
    id 'timestamper'               // Timestamps in logs
    id 'ansicolor'                 // Color console output
    id 'build-timeout'             // Build timeouts
    id 'rebuild'                   // Rebuild with params
}

// Configuration as Code (JCasC)
// jenkins.yaml
jenkins:
  systemMessage: "Jenkins configured via JCasC"
  securityRealm:
    ldap:
      configurations:
        - server: ldap.company.com
  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions: ["Overall/Administer"]
          - name: "developer"
            permissions: ["Job/Build", "Job/Read"]

unclassified:
  slackNotifier:
    teamDomain: company
    tokenCredentialId: slack-token
    room: "#jenkins-builds"`
        }
      ]
    },
    {
      id: 'teamcity',
      name: 'TeamCity',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'JetBrains CI/CD server with Kotlin DSL configuration',
      diagram: TeamCityDiagram,
      details: [
        {
          name: 'Kotlin DSL',
          explanation: 'TeamCity configurations can be defined as Kotlin code, enabling IDE support, refactoring, and version control. Define projects, build configurations, VCS roots, and triggers programmatically. Templates allow reuse across projects.',
          codeExample: `// .teamcity/settings.kts
import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.buildSteps.*
import jetbrains.buildServer.configs.kotlin.triggers.*
import jetbrains.buildServer.configs.kotlin.vcs.*

version = "2024.03"

project {
    vcsRoot(GitVcsRoot)
    buildType(Build)
    buildType(Deploy)
}

object GitVcsRoot : GitVcsRoot({
    name = "Application Repository"
    url = "git@github.com:company/myapp.git"
    branch = "refs/heads/main"
    branchSpec = "+:refs/heads/*"
    authMethod = uploadedKey {
        uploadedKey = "github-deploy-key"
    }
})

object Build : BuildType({
    name = "Build & Test"

    vcs {
        root(GitVcsRoot)
    }

    steps {
        maven {
            name = "Build"
            goals = "clean package -DskipTests"
            mavenVersion = bundled_3_9()
            jdkHome = "%env.JDK_21%"
        }

        maven {
            name = "Unit Tests"
            goals = "test"
            mavenVersion = bundled_3_9()
        }

        dockerCommand {
            name = "Build Docker Image"
            commandType = build {
                source = file {
                    path = "Dockerfile"
                }
                namesAndTags = "registry.company.com/myapp:%build.number%"
            }
        }

        dockerCommand {
            name = "Push Image"
            commandType = push {
                namesAndTags = "registry.company.com/myapp:%build.number%"
            }
        }
    }

    triggers {
        vcs {
            branchFilter = "+:*"
        }
    }

    features {
        dockerSupport {
            loginToRegistry = on {
                dockerRegistryId = "PROJECT_EXT_1"
            }
        }

        pullRequests {
            vcsRootExtId = "\${GitVcsRoot.id}"
            provider = github {
                authType = token {
                    token = "credentialsJSON:xxx"
                }
            }
        }
    }

    artifactRules = "target/*.jar => artifacts"
})`
        },
        {
          name: 'Build Chains',
          explanation: 'Build chains link configurations with artifact and snapshot dependencies. Upstream builds trigger downstream. Artifacts flow through the chain. Parallel branches optimize build time. Composite builds aggregate results.',
          codeExample: `// Build chain with dependencies
object IntegrationTests : BuildType({
    name = "Integration Tests"

    dependencies {
        snapshot(Build) {
            onDependencyFailure = FailureAction.FAIL_TO_START
        }
        artifacts(Build) {
            artifactRules = "artifacts/*.jar => lib"
        }
    }

    steps {
        script {
            name = "Run Integration Tests"
            scriptContent = """
                docker-compose up -d
                ./gradlew integrationTest
                docker-compose down
            """.trimIndent()
        }
    }
})

object DeployStaging : BuildType({
    name = "Deploy to Staging"

    dependencies {
        snapshot(Build) {}
        snapshot(IntegrationTests) {}
    }

    steps {
        script {
            name = "Deploy"
            scriptContent = """
                kubectl config use-context staging
                kubectl set image deployment/myapp \\
                    myapp=registry.company.com/myapp:%dep.Build.build.number%
            """.trimIndent()
        }
    }

    triggers {
        finishBuildTrigger {
            buildType = "\${IntegrationTests.id}"
            successfulOnly = true
            branchFilter = "+:main"
        }
    }
})

object DeployProduction : BuildType({
    name = "Deploy to Production"

    dependencies {
        snapshot(DeployStaging) {}
    }

    steps {
        script {
            name = "Deploy"
            scriptContent = """
                kubectl config use-context production
                kubectl set image deployment/myapp \\
                    myapp=registry.company.com/myapp:%dep.Build.build.number%
            """.trimIndent()
        }
    }

    // Manual trigger only
    triggers {}
})`
        },
        {
          name: 'Agent Management',
          explanation: 'TeamCity uses build agents to execute jobs. Agents can be cloud-based (AWS, GCP, Azure) for on-demand scaling or self-hosted for specialized requirements. Agent pools group agents by capability (OS, tools). Agent requirements in build configs ensure jobs run on compatible agents. Cloud profiles auto-provision and terminate agents based on queue.',
          codeExample: `// Agent Configuration in Kotlin DSL
object LinuxAgentPool : Project({
    name = "Linux Build Agents"

    features {
        // AWS EC2 Cloud Profile
        feature {
            type = "CloudProfile"
            param("cloud.profile.id", "aws-linux-agents")
            param("cloud.type", "amazon")
            param("cloud.profile.name", "AWS Linux Agents")
            param("description", "Auto-scaling Linux build agents")

            // Instance settings
            param("image.ami-id", "ami-0123456789abcdef0")
            param("image.instance-type", "t3.large")
            param("image.security-group-ids", "sg-12345678")
            param("image.subnet-id", "subnet-12345678")
            param("image.key-pair-name", "teamcity-agents")

            // Agent settings
            param("profileInstanceLimit", "10")
            param("agent.terminate.idle.time", "30")
            param("agent.terminate.conditions", "AFTER_BUILD")
        }
    }
})

// Build configuration with agent requirements
object BuildWithRequirements : BuildType({
    name = "Build Requiring Specific Agent"

    requirements {
        // Require Linux agent
        contains("teamcity.agent.jvm.os.name", "Linux")

        // Require Docker installed
        exists("docker.version")

        // Require specific JDK
        contains("env.JAVA_HOME", "jdk-21")

        // Require minimum memory
        moreThan("teamcity.agent.hardware.memorySizeMb", "4096")

        // Agent pool restriction
        equals("system.teamcity.agent.pool.name", "linux-pool")
    }

    steps {
        script {
            name = "Build with Docker"
            scriptContent = """
                docker --version
                java --version
                ./gradlew build
            """.trimIndent()
        }
    }
})

// Agent authorization in settings
object AgentManagement : Project({
    features {
        feature {
            type = "AgentPoolProjectFeature"
            param("pool.id", "linux-pool")
        }
        feature {
            type = "AgentPoolProjectFeature"
            param("pool.id", "windows-pool")
        }
    }
})`
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
      { name: 'DevOps', icon: '🛠️', page: 'DevOps' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0 && selectedConcept) {
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
    color: '#93c5fd',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>🛠️ DevOps</h1>
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
          ← Back to Menu
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={DEVOPS_COLORS}
        />
      </div>

      <p style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        fontSize: '1.1rem',
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: '1.8'
      }}>
        End-to-end CI/CD automation, containerization, orchestration, and observability for modern cloud-native development.
      </p>

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
              colors={DEVOPS_COLORS}
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

export default DevOps

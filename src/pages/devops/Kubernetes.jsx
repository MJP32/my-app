import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// Kubernetes themed colors (K8s blue)
const K8S_COLORS = {
  primary: '#326ce5',
  primaryHover: '#5b8def',
  bg: 'rgba(50, 108, 229, 0.1)',
  border: 'rgba(50, 108, 229, 0.3)',
  arrow: '#326ce5',
  hoverBg: 'rgba(50, 108, 229, 0.2)',
  topicBg: 'rgba(50, 108, 229, 0.2)'
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

// Diagram Components for Kubernetes Topics
const K8sBasicsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="k8sGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#k8sGrad)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">Kubernetes Architecture</text>
    <rect x="20" y="35" width="200" height="110" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="120" y="52" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Control Plane</text>
    <rect x="30" y="60" width="85" height="25" rx="3" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="72" y="76" textAnchor="middle" fill="#60a5fa" fontSize="8">API Server</text>
    <rect x="125" y="60" width="85" height="25" rx="3" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="167" y="76" textAnchor="middle" fill="#fbbf24" fontSize="8">etcd</text>
    <rect x="30" y="90" width="85" height="25" rx="3" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="72" y="106" textAnchor="middle" fill="#a78bfa" fontSize="8">Scheduler</text>
    <rect x="125" y="90" width="85" height="25" rx="3" fill="#374151" stroke="#ec4899" strokeWidth="1"/>
    <text x="167" y="106" textAnchor="middle" fill="#f472b6" fontSize="8">Controller Mgr</text>
    <rect x="30" y="120" width="180" height="20" rx="3" fill="#374151"/>
    <text x="120" y="134" textAnchor="middle" fill="#94a3b8" fontSize="7">Cloud Controller Manager</text>
    <path d="M220 90 L250 90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowK8s)"/>
    <rect x="250" y="35" width="200" height="110" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Worker Node 1</text>
    <rect x="260" y="60" width="85" height="25" rx="3" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="302" y="76" textAnchor="middle" fill="#60a5fa" fontSize="8">kubelet</text>
    <rect x="355" y="60" width="85" height="25" rx="3" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="397" y="76" textAnchor="middle" fill="#a78bfa" fontSize="8">kube-proxy</text>
    <rect x="260" y="90" width="180" height="50" rx="3" fill="#374151" stroke="#ef4444" strokeWidth="1"/>
    <text x="350" y="108" textAnchor="middle" fill="#f87171" fontSize="9">Container Runtime</text>
    <text x="350" y="125" textAnchor="middle" fill="#94a3b8" fontSize="7">containerd / CRI-O</text>
    <rect x="470" y="35" width="210" height="110" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="575" y="52" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Worker Node 2</text>
    <rect x="480" y="60" width="90" height="35" rx="3" fill="#374151" stroke="#10b981" strokeWidth="1"/>
    <text x="525" y="75" textAnchor="middle" fill="#34d399" fontSize="8">Pod</text>
    <text x="525" y="88" textAnchor="middle" fill="#6b7280" fontSize="6">nginx</text>
    <rect x="580" y="60" width="90" height="35" rx="3" fill="#374151" stroke="#10b981" strokeWidth="1"/>
    <text x="625" y="75" textAnchor="middle" fill="#34d399" fontSize="8">Pod</text>
    <text x="625" y="88" textAnchor="middle" fill="#6b7280" fontSize="6">api</text>
    <rect x="480" y="100" width="190" height="40" rx="3" fill="#374151"/>
    <text x="575" y="118" textAnchor="middle" fill="#94a3b8" fontSize="8">Container Runtime + kubelet</text>
    <text x="575" y="132" textAnchor="middle" fill="#6b7280" fontSize="7">kube-proxy for networking</text>
    <defs>
      <marker id="arrowK8s" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#10b981"/></marker>
    </defs>
  </svg>
)

const PodDeploymentDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="podGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#059669" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#podGrad)" stroke="#10b981" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">Deployment - ReplicaSet - Pods</text>
    <rect x="20" y="40" width="120" height="70" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="80" y="60" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Deployment</text>
    <text x="80" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">replicas: 3</text>
    <text x="80" y="93" textAnchor="middle" fill="#94a3b8" fontSize="8">strategy: Rolling</text>
    <text x="80" y="105" textAnchor="middle" fill="#6b7280" fontSize="7">Declarative updates</text>
    <path d="M140 75 L170 75" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowPod)"/>
    <rect x="170" y="40" width="120" height="70" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="230" y="60" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">ReplicaSet</text>
    <text x="230" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Maintains desired</text>
    <text x="230" y="93" textAnchor="middle" fill="#94a3b8" fontSize="8">pod count</text>
    <text x="230" y="105" textAnchor="middle" fill="#6b7280" fontSize="7">Self-healing</text>
    <path d="M290 75 L320 75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowPod2)"/>
    <rect x="320" y="35" width="200" height="115" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="420" y="52" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Pods (3 replicas)</text>
    <rect x="330" y="60" width="55" height="40" rx="3" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="357" y="78" textAnchor="middle" fill="#a78bfa" fontSize="7">Pod 1</text>
    <text x="357" y="92" textAnchor="middle" fill="#6b7280" fontSize="6">10.0.0.1</text>
    <rect x="392" y="60" width="55" height="40" rx="3" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="419" y="78" textAnchor="middle" fill="#a78bfa" fontSize="7">Pod 2</text>
    <text x="419" y="92" textAnchor="middle" fill="#6b7280" fontSize="6">10.0.0.2</text>
    <rect x="455" y="60" width="55" height="40" rx="3" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="482" y="78" textAnchor="middle" fill="#a78bfa" fontSize="7">Pod 3</text>
    <text x="482" y="92" textAnchor="middle" fill="#6b7280" fontSize="6">10.0.0.3</text>
    <rect x="330" y="105" width="180" height="35" rx="3" fill="#374151"/>
    <text x="420" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">{`Containers share network & storage`}</text>
    <text x="420" y="133" textAnchor="middle" fill="#6b7280" fontSize="6">Smallest deployable unit</text>
    <rect x="540" y="40" width="140" height="105" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="610" y="58" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Rolling Update</text>
    <text x="610" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">maxSurge: 25%</text>
    <text x="610" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">maxUnavailable: 25%</text>
    <text x="610" y="110" textAnchor="middle" fill="#6b7280" fontSize="7">Zero-downtime</text>
    <text x="610" y="125" textAnchor="middle" fill="#6b7280" fontSize="7">deployments</text>
    <text x="610" y="140" textAnchor="middle" fill="#34d399" fontSize="7">Rollback support</text>
    <defs>
      <marker id="arrowPod" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/></marker>
      <marker id="arrowPod2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/></marker>
    </defs>
  </svg>
)

const ServiceNetworkingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="svcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#svcGrad)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">Kubernetes Service Types</text>
    <rect x="20" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="85" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">ClusterIP</text>
    <text x="85" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Internal only</text>
    <rect x="30" y="82" width="110" height="25" rx="3" fill="#374151"/>
    <text x="85" y="98" textAnchor="middle" fill="#60a5fa" fontSize="7">10.96.0.1:80</text>
    <text x="85" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">Service discovery</text>
    <text x="85" y="135" textAnchor="middle" fill="#6b7280" fontSize="6">DNS: svc.ns.cluster</text>
    <rect x="165" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="230" y="58" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">NodePort</text>
    <text x="230" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Node IP exposed</text>
    <rect x="175" y="82" width="110" height="25" rx="3" fill="#374151"/>
    <text x="230" y="98" textAnchor="middle" fill="#34d399" fontSize="7">NodeIP:30000-32767</text>
    <text x="230" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">External access</text>
    <text x="230" y="135" textAnchor="middle" fill="#6b7280" fontSize="6">Dev/testing</text>
    <rect x="310" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="375" y="58" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">LoadBalancer</text>
    <text x="375" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Cloud LB</text>
    <rect x="320" y="82" width="110" height="25" rx="3" fill="#374151"/>
    <text x="375" y="98" textAnchor="middle" fill="#fbbf24" fontSize="7">External IP</text>
    <text x="375" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">AWS ELB/ALB</text>
    <text x="375" y="135" textAnchor="middle" fill="#6b7280" fontSize="6">GCP/Azure LB</text>
    <rect x="455" y="40" width="115" height="105" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="512" y="58" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Ingress</text>
    <text x="512" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">L7 routing</text>
    <rect x="465" y="82" width="95" height="25" rx="3" fill="#374151"/>
    <text x="512" y="98" textAnchor="middle" fill="#f472b6" fontSize="7">Host/Path rules</text>
    <text x="512" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">TLS termination</text>
    <text x="512" y="135" textAnchor="middle" fill="#6b7280" fontSize="6">nginx/traefik</text>
    <rect x="585" y="40" width="95" height="105" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="632" y="58" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">NetworkPolicy</text>
    <text x="632" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Ingress rules</text>
    <text x="632" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Egress rules</text>
    <text x="632" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">Pod selectors</text>
    <text x="632" y="127" textAnchor="middle" fill="#6b7280" fontSize="6">Namespace</text>
    <text x="632" y="140" textAnchor="middle" fill="#6b7280" fontSize="6">isolation</text>
  </svg>
)

const ConfigSecretsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="cfgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#cfgGrad)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">{`ConfigMaps & Secrets`}</text>
    <rect x="20" y="40" width="180" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">ConfigMap</text>
    <text x="110" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Non-sensitive config</text>
    <rect x="30" y="82" width="160" height="55" rx="3" fill="#374151"/>
    <text x="110" y="98" textAnchor="middle" fill="#60a5fa" fontSize="7">APP_ENV=production</text>
    <text x="110" y="112" textAnchor="middle" fill="#60a5fa" fontSize="7">LOG_LEVEL=info</text>
    <text x="110" y="126" textAnchor="middle" fill="#6b7280" fontSize="6">Plain text storage</text>
    <rect x="220" y="40" width="180" height="105" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="310" y="58" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Secret</text>
    <text x="310" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Sensitive data</text>
    <rect x="230" y="82" width="160" height="55" rx="3" fill="#374151"/>
    <text x="310" y="98" textAnchor="middle" fill="#f87171" fontSize="7">DB_PASSWORD=***</text>
    <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="7">API_KEY=***</text>
    <text x="310" y="126" textAnchor="middle" fill="#6b7280" fontSize="6">Base64 encoded</text>
    <rect x="420" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="485" y="58" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Mount Options</text>
    <text x="485" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Env variables</text>
    <text x="485" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">Volume files</text>
    <text x="485" y="110" textAnchor="middle" fill="#94a3b8" fontSize="8">Command args</text>
    <text x="485" y="130" textAnchor="middle" fill="#6b7280" fontSize="7">Hot reload supported</text>
    <rect x="565" y="40" width="120" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="625" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Best Practices</text>
    <text x="625" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">External Secrets</text>
    <text x="625" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Vault integration</text>
    <text x="625" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">RBAC for Secrets</text>
    <text x="625" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Encryption at rest</text>
    <text x="625" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">SOPS/Sealed</text>
  </svg>
)

const PersistentStorageDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="pvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#db2777" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#pvGrad)" stroke="#ec4899" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f472b6" fontSize="14" fontWeight="bold">Persistent Storage Flow</text>
    <rect x="20" y="40" width="130" height="70" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="85" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Pod</text>
    <rect x="30" y="68" width="110" height="35" rx="3" fill="#374151"/>
    <text x="85" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">volumeMounts:</text>
    <text x="85" y="98" textAnchor="middle" fill="#6b7280" fontSize="7">/data/app</text>
    <path d="M150 75 L180 75" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowPV)"/>
    <rect x="180" y="40" width="130" height="70" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="245" y="55" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">PVC</text>
    <text x="245" y="70" textAnchor="middle" fill="#94a3b8" fontSize="7">PersistentVolumeClaim</text>
    <rect x="190" y="78" width="110" height="25" rx="3" fill="#374151"/>
    <text x="245" y="95" textAnchor="middle" fill="#fbbf24" fontSize="7">10Gi, RWO</text>
    <path d="M310 75 L340 75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowPV2)"/>
    <rect x="340" y="40" width="130" height="70" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="405" y="55" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">PV</text>
    <text x="405" y="70" textAnchor="middle" fill="#94a3b8" fontSize="7">PersistentVolume</text>
    <rect x="350" y="78" width="110" height="25" rx="3" fill="#374151"/>
    <text x="405" y="95" textAnchor="middle" fill="#34d399" fontSize="7">10Gi, Bound</text>
    <path d="M470 75 L500 75" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowPV3)"/>
    <rect x="500" y="35" width="180" height="80" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="590" y="53" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Storage Backend</text>
    <text x="590" y="73" textAnchor="middle" fill="#94a3b8" fontSize="7">AWS EBS / GCE PD / Azure</text>
    <text x="590" y="88" textAnchor="middle" fill="#94a3b8" fontSize="7">NFS / Ceph / Local</text>
    <text x="590" y="103" textAnchor="middle" fill="#6b7280" fontSize="6">CSI Drivers</text>
    <rect x="20" y="120" width="130" height="30" rx="4" fill="#1e3a5f" stroke="#ef4444" strokeWidth="1"/>
    <text x="85" y="139" textAnchor="middle" fill="#f87171" fontSize="8">StorageClass</text>
    <rect x="180" y="120" width="130" height="30" rx="4" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="1"/>
    <text x="245" y="139" textAnchor="middle" fill="#22d3ee" fontSize="8">Dynamic Provisioning</text>
    <rect x="340" y="120" width="130" height="30" rx="4" fill="#1e3a5f" stroke="#ec4899" strokeWidth="1"/>
    <text x="405" y="139" textAnchor="middle" fill="#f472b6" fontSize="8">Access Modes</text>
    <rect x="500" y="120" width="180" height="30" rx="4" fill="#1e3a5f" stroke="#fbbf24" strokeWidth="1"/>
    <text x="590" y="139" textAnchor="middle" fill="#fbbf24" fontSize="8">RWO / RWX / ROX</text>
    <defs>
      <marker id="arrowPV" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/></marker>
      <marker id="arrowPV2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/></marker>
      <marker id="arrowPV3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#10b981"/></marker>
    </defs>
  </svg>
)

const AutoScalingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="hpaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#hpaGrad)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">Kubernetes Auto-Scaling</text>
    <rect x="20" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="95" y="55" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">HPA</text>
    <text x="95" y="68" textAnchor="middle" fill="#94a3b8" fontSize="7">Horizontal Pod Autoscaler</text>
    <rect x="30" y="75" width="130" height="60" rx="3" fill="#374151"/>
    <text x="95" y="90" textAnchor="middle" fill="#60a5fa" fontSize="7">{`CPU &gt; 80% scale up`}</text>
    <text x="95" y="105" textAnchor="middle" fill="#60a5fa" fontSize="7">{`CPU &lt; 50% scale down`}</text>
    <text x="95" y="120" textAnchor="middle" fill="#6b7280" fontSize="6">min: 2, max: 10</text>
    <text x="95" y="132" textAnchor="middle" fill="#6b7280" fontSize="6">Custom metrics</text>
    <rect x="190" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="265" y="55" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">VPA</text>
    <text x="265" y="68" textAnchor="middle" fill="#94a3b8" fontSize="7">Vertical Pod Autoscaler</text>
    <rect x="200" y="75" width="130" height="60" rx="3" fill="#374151"/>
    <text x="265" y="90" textAnchor="middle" fill="#34d399" fontSize="7">Adjusts CPU/Memory</text>
    <text x="265" y="105" textAnchor="middle" fill="#34d399" fontSize="7">{`requests & limits`}</text>
    <text x="265" y="120" textAnchor="middle" fill="#6b7280" fontSize="6">Right-sizing pods</text>
    <text x="265" y="132" textAnchor="middle" fill="#6b7280" fontSize="6">Cost optimization</text>
    <rect x="360" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="435" y="55" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Cluster Autoscaler</text>
    <text x="435" y="68" textAnchor="middle" fill="#94a3b8" fontSize="7">Node-level scaling</text>
    <rect x="370" y="75" width="130" height="60" rx="3" fill="#374151"/>
    <text x="435" y="90" textAnchor="middle" fill="#fbbf24" fontSize="7">Pending pods add nodes</text>
    <text x="435" y="105" textAnchor="middle" fill="#fbbf24" fontSize="7">Idle nodes remove</text>
    <text x="435" y="120" textAnchor="middle" fill="#6b7280" fontSize="6">Cloud provider</text>
    <text x="435" y="132" textAnchor="middle" fill="#6b7280" fontSize="6">integration</text>
    <rect x="530" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="605" y="55" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Resource Quotas</text>
    <text x="605" y="68" textAnchor="middle" fill="#94a3b8" fontSize="7">Namespace limits</text>
    <rect x="540" y="75" width="130" height="60" rx="3" fill="#374151"/>
    <text x="605" y="90" textAnchor="middle" fill="#a78bfa" fontSize="7">requests.cpu: 10</text>
    <text x="605" y="105" textAnchor="middle" fill="#a78bfa" fontSize="7">limits.memory: 20Gi</text>
    <text x="605" y="120" textAnchor="middle" fill="#6b7280" fontSize="6">LimitRanges for</text>
    <text x="605" y="132" textAnchor="middle" fill="#6b7280" fontSize="6">pod defaults</text>
  </svg>
)

const HealthProbesDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="probeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#probeGrad)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">Kubernetes Health Probes</text>
    <rect x="20" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="95" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Liveness Probe</text>
    <text x="95" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Is container alive?</text>
    <rect x="30" y="85" width="130" height="50" rx="3" fill="#374151"/>
    <text x="95" y="102" textAnchor="middle" fill="#60a5fa" fontSize="7">Fail = Restart container</text>
    <text x="95" y="117" textAnchor="middle" fill="#6b7280" fontSize="6">Detect deadlocks</text>
    <text x="95" y="130" textAnchor="middle" fill="#6b7280" fontSize="6">Recover from crashes</text>
    <rect x="190" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="265" y="58" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Readiness Probe</text>
    <text x="265" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Ready for traffic?</text>
    <rect x="200" y="85" width="130" height="50" rx="3" fill="#374151"/>
    <text x="265" y="102" textAnchor="middle" fill="#34d399" fontSize="7">Fail = Remove from LB</text>
    <text x="265" y="117" textAnchor="middle" fill="#6b7280" fontSize="6">Graceful startup</text>
    <text x="265" y="130" textAnchor="middle" fill="#6b7280" fontSize="6">Dependency checks</text>
    <rect x="360" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="435" y="58" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Startup Probe</text>
    <text x="435" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">App started?</text>
    <rect x="370" y="85" width="130" height="50" rx="3" fill="#374151"/>
    <text x="435" y="102" textAnchor="middle" fill="#fbbf24" fontSize="7">Slow startup apps</text>
    <text x="435" y="117" textAnchor="middle" fill="#6b7280" fontSize="6">Disables liveness</text>
    <text x="435" y="130" textAnchor="middle" fill="#6b7280" fontSize="6">until ready</text>
    <rect x="530" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="605" y="55" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Probe Types</text>
    <text x="605" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">HTTP GET</text>
    <text x="605" y="92" textAnchor="middle" fill="#94a3b8" fontSize="8">TCP Socket</text>
    <text x="605" y="109" textAnchor="middle" fill="#94a3b8" fontSize="8">Exec command</text>
    <text x="605" y="128" textAnchor="middle" fill="#6b7280" fontSize="7">initialDelaySeconds</text>
    <text x="605" y="140" textAnchor="middle" fill="#6b7280" fontSize="7">periodSeconds</text>
  </svg>
)

const ProductionBestPracticesDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="prodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#059669" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#prodGrad)" stroke="#10b981" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">Production Best Practices</text>
    <rect x="20" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="85" y="58" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Security</text>
    <text x="85" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">RBAC policies</text>
    <text x="85" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Network policies</text>
    <text x="85" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Pod security</text>
    <text x="85" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Image scanning</text>
    <text x="85" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Non-root, readonly</text>
    <rect x="165" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="230" y="58" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Reliability</text>
    <text x="230" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Pod Disruption</text>
    <text x="230" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Affinity rules</text>
    <text x="230" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Topology spread</text>
    <text x="230" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Multi-AZ deploy</text>
    <text x="230" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">HA configuration</text>
    <rect x="310" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="375" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Observability</text>
    <text x="375" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Prometheus</text>
    <text x="375" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Grafana dashboards</text>
    <text x="375" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Centralized logs</text>
    <text x="375" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Distributed tracing</text>
    <text x="375" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">EFK/Loki/Jaeger</text>
    <rect x="455" y="40" width="115" height="105" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="512" y="58" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">GitOps</text>
    <text x="512" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">ArgoCD</text>
    <text x="512" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Flux</text>
    <text x="512" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Kustomize</text>
    <text x="512" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Helm charts</text>
    <text x="512" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Declarative CD</text>
    <rect x="585" y="40" width="95" height="105" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="632" y="58" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Costs</text>
    <text x="632" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Right-sizing</text>
    <text x="632" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Spot instances</text>
    <text x="632" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Autoscaling</text>
    <text x="632" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Kubecost</text>
    <text x="632" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">FinOps</text>
  </svg>
)

function Kubernetes({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'basics',
      name: 'Kubernetes Basics',
      icon: '☸️',
      color: '#3b82f6',
      description: 'Control plane components: API Server, etcd, Scheduler, Controller Manager. Worker nodes run kubelet, kube-proxy, and container runtime (containerd/CRI-O). Namespaces enable multi-tenancy isolation.',
      diagram: K8sBasicsDiagram,
      details: [
        {
          name: 'Architecture Overview',
          explanation: 'Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. The Control Plane (master) manages cluster state through API Server, Scheduler, Controller Manager, and etcd. Worker Nodes run containerized applications with kubelet and container runtime.',
          codeExample: `# View cluster information
kubectl cluster-info

# Get all nodes in the cluster
kubectl get nodes -o wide

# Describe a specific node
kubectl describe node <node-name>

# View cluster component status
kubectl get componentstatuses

# Check API server health
kubectl get --raw='/healthz'

# View all resources in cluster
kubectl api-resources`
        },
        {
          name: 'Control Plane Components',
          explanation: 'API Server (kube-apiserver) is the REST API for cluster management. etcd stores all cluster state as a distributed key-value store. Scheduler assigns Pods to Nodes based on resource requirements. Controller Manager runs control loops that reconcile actual vs desired state. Cloud Controller Manager handles cloud provider integrations.',
          codeExample: `# View control plane pods
kubectl get pods -n kube-system

# Check API server logs
kubectl logs -n kube-system kube-apiserver-<node>

# View scheduler configuration
kubectl get configmap -n kube-system kube-scheduler

# Check controller manager status
kubectl get pods -n kube-system -l component=kube-controller-manager

# etcd cluster health (on control plane node)
etcdctl endpoint health

# View etcd members
etcdctl member list`
        },
        {
          name: 'Node Components',
          explanation: 'Kubelet is the agent ensuring containers run in Pods on each node. Kube-proxy maintains network rules for Service abstraction. Container Runtime (containerd, CRI-O) actually runs containers. Nodes can be added/removed dynamically based on workload demands.',
          codeExample: `# Check kubelet status (on node)
systemctl status kubelet

# View kubelet logs
journalctl -u kubelet -f

# Check kube-proxy pods
kubectl get pods -n kube-system -l k8s-app=kube-proxy

# View kube-proxy configuration
kubectl get configmap kube-proxy -n kube-system -o yaml

# Check container runtime (containerd)
crictl info
crictl ps

# Cordon node (prevent scheduling)
kubectl cordon <node-name>

# Drain node for maintenance
kubectl drain <node-name> --ignore-daemonsets`
        },
        {
          name: 'Pods and Namespaces',
          explanation: 'Pods are the smallest deployable units containing one or more containers sharing network and storage. Namespaces provide virtual clusters for resource isolation and multi-tenancy. Labels and annotations provide metadata for organizing and selecting resources.',
          codeExample: `# Simple Pod manifest
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  namespace: default
  labels:
    app: nginx
    environment: dev
  annotations:
    description: "Demo nginx pod"
spec:
  containers:
  - name: nginx
    image: nginx:1.25
    ports:
    - containerPort: 80

---
# Create namespace
apiVersion: v1
kind: Namespace
metadata:
  name: development
  labels:
    environment: dev

# kubectl commands
kubectl create namespace production
kubectl get namespaces
kubectl get pods -n development
kubectl get pods --all-namespaces
kubectl get pods -l app=nginx`
        },
        {
          name: 'kubectl Basics',
          explanation: 'kubectl is the CLI for interacting with Kubernetes clusters. Common commands: get (list resources), describe (detailed info), apply -f (create/update from YAML), delete (remove resources), logs (view container logs), exec (run commands in containers), port-forward (local access).',
          codeExample: `# List resources
kubectl get pods
kubectl get pods -o wide
kubectl get pods -o yaml
kubectl get all -n default

# Describe resources
kubectl describe pod nginx-pod
kubectl describe service my-service

# Create/Update resources
kubectl apply -f deployment.yaml
kubectl apply -f ./manifests/

# Delete resources
kubectl delete pod nginx-pod
kubectl delete -f deployment.yaml

# View logs
kubectl logs nginx-pod
kubectl logs nginx-pod -c container-name
kubectl logs -f nginx-pod --tail=100

# Execute commands in container
kubectl exec -it nginx-pod -- /bin/bash
kubectl exec nginx-pod -- cat /etc/nginx/nginx.conf

# Port forwarding
kubectl port-forward pod/nginx-pod 8080:80
kubectl port-forward service/my-service 8080:80

# Copy files
kubectl cp nginx-pod:/var/log/nginx/access.log ./access.log`
        }
      ]
    },
    {
      id: 'pods-deployments',
      name: 'Pods & Deployments',
      icon: '📦',
      color: '#10b981',
      description: 'Deployment strategies: Rolling updates (maxSurge/maxUnavailable), ReplicaSets for pod scaling (min: 1, max: unlimited), and revision history for instant rollback. Zero-downtime deployments.',
      diagram: PodDeploymentDiagram,
      details: [
        {
          name: 'Pod Lifecycle',
          explanation: 'Pods transition through phases: Pending (scheduled but not running), Running (at least one container running), Succeeded (all containers completed successfully), Failed (all containers terminated, at least one failed), Unknown (state cannot be determined). Init containers run before main containers for setup tasks.',
          codeExample: `# Pod with init container
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  initContainers:
  - name: init-db-check
    image: busybox:1.28
    command: ['sh', '-c',
      'until nslookup mydb; do echo waiting for db; sleep 2; done']
  - name: init-download-config
    image: busybox:1.28
    command: ['wget', '-O', '/config/app.conf', 'http://config-server/app.conf']
    volumeMounts:
    - name: config-volume
      mountPath: /config
  containers:
  - name: myapp
    image: myapp:1.0
    volumeMounts:
    - name: config-volume
      mountPath: /etc/app
  volumes:
  - name: config-volume
    emptyDir: {}

# Check pod phase
kubectl get pod myapp-pod -o jsonpath='{.status.phase}'

# Watch pod lifecycle
kubectl get pods -w`
        },
        {
          name: 'Deployments',
          explanation: 'Deployments provide declarative updates for Pods and ReplicaSets. They enable rolling updates with zero downtime, automatic rollbacks, and scaling. Key fields: replicas (desired pod count), selector (pod matching), strategy (RollingUpdate or Recreate), template (pod specification).',
          codeExample: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"

# Scale deployment
kubectl scale deployment nginx-deployment --replicas=5

# Update image
kubectl set image deployment/nginx-deployment nginx=nginx:1.26`
        },
        {
          name: 'Rolling Updates',
          explanation: 'Rolling updates gradually replace old pods with new ones. Configure with maxSurge (max pods above desired during update) and maxUnavailable (max pods that can be unavailable). minReadySeconds ensures new pods are stable before continuing. revisionHistoryLimit controls rollback versions retained.',
          codeExample: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1          # Max 5 pods during update
      maxUnavailable: 0    # Always keep 4 available
  minReadySeconds: 10      # Wait 10s before continuing
  revisionHistoryLimit: 5  # Keep 5 old ReplicaSets
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: web-app:v2
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5

# Watch rollout progress
kubectl rollout status deployment/web-app

# Pause rollout (for canary testing)
kubectl rollout pause deployment/web-app

# Resume rollout
kubectl rollout resume deployment/web-app`
        },
        {
          name: 'ReplicaSets',
          explanation: 'ReplicaSets maintain a stable set of replica Pods running at any time. They ensure the specified number of pods are running and replace failed pods automatically. Deployments manage ReplicaSets - you rarely interact with them directly. Use label selectors to identify which pods to manage.',
          codeExample: `# ReplicaSet (usually managed by Deployment)
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend
  labels:
    app: frontend
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: frontend
    matchExpressions:
      - {key: environment, operator: In, values: [prod, staging]}
  template:
    metadata:
      labels:
        tier: frontend
        environment: prod
    spec:
      containers:
      - name: php-redis
        image: gcr.io/google-samples/gb-frontend:v4
        ports:
        - containerPort: 80

# View ReplicaSets
kubectl get rs
kubectl get rs -o wide

# Describe ReplicaSet
kubectl describe rs frontend

# View ReplicaSet managed by Deployment
kubectl get rs -l app=nginx`
        },
        {
          name: 'Rollbacks',
          explanation: 'Rollback to previous versions when issues occur. Use kubectl rollout undo deployment/name to revert to previous revision. Check history with rollout history. Specify revision with --to-revision=N. Pause/resume rollouts with rollout pause/resume for canary-style deployments.',
          codeExample: `# View rollout history
kubectl rollout history deployment/nginx-deployment

# View specific revision
kubectl rollout history deployment/nginx-deployment --revision=2

# Rollback to previous revision
kubectl rollout undo deployment/nginx-deployment

# Rollback to specific revision
kubectl rollout undo deployment/nginx-deployment --to-revision=2

# Add change-cause annotation for history
kubectl annotate deployment/nginx-deployment \\
  kubernetes.io/change-cause="Updated to nginx 1.26"

# Or use --record flag (deprecated but still works)
kubectl set image deployment/nginx-deployment \\
  nginx=nginx:1.26 --record

# Check rollout status
kubectl rollout status deployment/nginx-deployment

# Restart all pods (trigger new rollout)
kubectl rollout restart deployment/nginx-deployment`
        }
      ]
    },
    {
      id: 'services-networking',
      name: 'Services & Networking',
      icon: '🌐',
      color: '#f59e0b',
      description: 'Service types: ClusterIP (internal), NodePort (30000-32767), LoadBalancer (cloud providers), ExternalName (DNS CNAME). Ingress for L7 routing, NetworkPolicy for pod firewalls.',
      diagram: ServiceNetworkingDiagram,
      details: [
        {
          name: 'ClusterIP Service',
          explanation: 'Default service type providing internal-only access within the cluster. Provides stable IP and DNS name (service.namespace.svc.cluster.local). Load balances traffic across pod endpoints. Use for internal microservice communication. Session affinity available with sessionAffinity: ClientIP.',
          codeExample: `apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: default
spec:
  type: ClusterIP  # Default type
  selector:
    app: backend
  ports:
  - name: http
    port: 80         # Service port
    targetPort: 8080 # Container port
    protocol: TCP
  - name: grpc
    port: 9090
    targetPort: 9090
  sessionAffinity: ClientIP  # Sticky sessions
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 10800  # 3 hours

# Access within cluster
# DNS: backend-service.default.svc.cluster.local
# Short: backend-service (same namespace)

# Verify service endpoints
kubectl get endpoints backend-service
kubectl describe service backend-service`
        },
        {
          name: 'NodePort & LoadBalancer',
          explanation: 'NodePort exposes service on each node at a static port (30000-32767) for external access during development. LoadBalancer provisions cloud provider load balancer (AWS ELB/ALB, GCP LB, Azure LB) for production external access. Both build on ClusterIP functionality.',
          codeExample: `# NodePort Service
apiVersion: v1
kind: Service
metadata:
  name: frontend-nodeport
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080  # Optional: auto-assigned if omitted

# Access: <any-node-ip>:30080

---
# LoadBalancer Service (Cloud providers)
apiVersion: v1
kind: Service
metadata:
  name: frontend-lb
  annotations:
    # AWS-specific annotations
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
    service.beta.kubernetes.io/aws-load-balancer-internal: "false"
spec:
  type: LoadBalancer
  selector:
    app: frontend
  ports:
  - port: 443
    targetPort: 8443
  loadBalancerSourceRanges:  # Restrict access
  - "10.0.0.0/8"
  - "203.0.113.0/24"

# Get external IP
kubectl get svc frontend-lb -w`
        },
        {
          name: 'Ingress',
          explanation: 'Ingress provides HTTP/HTTPS routing to services with host and path-based rules. Supports TLS termination with certificates. Requires an Ingress Controller (nginx, traefik, HAProxy). Use annotations for controller-specific configuration like rate limiting, rewrite rules, and authentication.',
          codeExample: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.example.com
    - www.example.com
    secretName: tls-secret
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /v1
        pathType: Prefix
        backend:
          service:
            name: api-v1
            port:
              number: 80
      - path: /v2
        pathType: Prefix
        backend:
          service:
            name: api-v2
            port:
              number: 80
  - host: www.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 80`
        },
        {
          name: 'Service Discovery',
          explanation: 'Kubernetes provides automatic DNS for service discovery. Services get DNS records: service.namespace.svc.cluster.local. Pods can use short names within same namespace. Environment variables also injected: SERVICE_HOST, SERVICE_PORT. Headless services (clusterIP: None) return pod IPs directly.',
          codeExample: `# Headless Service (for StatefulSets, direct pod access)
apiVersion: v1
kind: Service
metadata:
  name: mysql-headless
spec:
  clusterIP: None  # Headless
  selector:
    app: mysql
  ports:
  - port: 3306

# Returns pod IPs directly:
# mysql-0.mysql-headless.default.svc.cluster.local
# mysql-1.mysql-headless.default.svc.cluster.local

---
# ExternalName Service (CNAME alias)
apiVersion: v1
kind: Service
metadata:
  name: external-db
spec:
  type: ExternalName
  externalName: db.legacy-system.example.com

# DNS resolution in cluster
# nslookup my-service.default.svc.cluster.local

# Environment variables injected into pods
# MY_SERVICE_SERVICE_HOST=10.96.0.100
# MY_SERVICE_SERVICE_PORT=80
# MY_SERVICE_PORT=tcp://10.96.0.100:80`
        },
        {
          name: 'Network Policies',
          explanation: 'Network Policies control pod-to-pod traffic like firewall rules. Specify allowed ingress (incoming) and egress (outgoing) traffic. Use podSelector to target pods, namespaceSelector for cross-namespace rules. Default deny policies recommended for production security. Requires CNI plugin support (Calico, Cilium).',
          codeExample: `# Default deny all ingress
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: production
spec:
  podSelector: {}  # Apply to all pods
  policyTypes:
  - Ingress

---
# Allow specific ingress traffic
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: frontend
    - podSelector:
        matchLabels:
          role: monitoring
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432
  - to:  # Allow DNS
    - namespaceSelector: {}
    ports:
    - protocol: UDP
      port: 53`
        }
      ]
    },
    {
      id: 'config-secrets',
      name: 'ConfigMaps & Secrets',
      icon: '🔐',
      color: '#8b5cf6',
      description: 'ConfigMaps: plain-text key-value config (1MB max). Secrets: base64-encoded sensitive data (type: Opaque/tls/dockerconfigjson). Mount as env vars or volumes. Enable encryption at rest for production.',
      diagram: ConfigSecretsDiagram,
      details: [
        {
          name: 'ConfigMaps',
          explanation: 'ConfigMaps store non-confidential configuration data as key-value pairs. Create from literals (--from-literal), files (--from-file), or directories. Supports multi-line config files and JSON/YAML structures. Changes can trigger pod restarts when mounted as volumes (with proper setup).',
          codeExample: `# ConfigMap from YAML
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  # Simple key-value pairs
  APP_ENV: production
  LOG_LEVEL: info
  MAX_CONNECTIONS: "100"

  # Multi-line config file
  nginx.conf: |
    server {
      listen 80;
      server_name localhost;
      location / {
        root /usr/share/nginx/html;
      }
    }

  # JSON configuration
  settings.json: |
    {
      "debug": false,
      "timeout": 30
    }

# Create from command line
kubectl create configmap app-config \\
  --from-literal=APP_ENV=production \\
  --from-literal=LOG_LEVEL=info

# Create from file
kubectl create configmap nginx-config \\
  --from-file=nginx.conf

# Create from directory
kubectl create configmap configs --from-file=./config-dir/`
        },
        {
          name: 'Secrets',
          explanation: 'Secrets store sensitive data like passwords, tokens, and keys. Values are base64-encoded (not encrypted by default). Types include Opaque (generic), kubernetes.io/tls (certificates), kubernetes.io/dockerconfigjson (registry credentials). Enable encryption at rest for production security.',
          codeExample: `# Generic Secret (Opaque)
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
stringData:  # Plain text (auto base64 encoded)
  username: admin
  password: secretpassword123
data:  # Base64 encoded
  api-key: YXBpLWtleS12YWx1ZQ==

---
# TLS Secret
apiVersion: v1
kind: Secret
metadata:
  name: tls-secret
type: kubernetes.io/tls
data:
  tls.crt: <base64-encoded-cert>
  tls.key: <base64-encoded-key>

---
# Docker Registry Secret
apiVersion: v1
kind: Secret
metadata:
  name: regcred
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: <base64-encoded-docker-config>

# Create from command line
kubectl create secret generic db-creds \\
  --from-literal=username=admin \\
  --from-literal=password=secret

# Create TLS secret
kubectl create secret tls my-tls \\
  --cert=tls.crt --key=tls.key

# Create docker registry secret
kubectl create secret docker-registry regcred \\
  --docker-server=registry.example.com \\
  --docker-username=user \\
  --docker-password=pass`
        },
        {
          name: 'Environment Variables',
          explanation: 'Inject ConfigMap/Secret values as container environment variables. Use valueFrom with configMapKeyRef or secretKeyRef for single values. Use envFrom to import all keys as environment variables. Prefix option available to avoid naming conflicts.',
          codeExample: `apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
  - name: app
    image: myapp:1.0
    env:
    # Static environment variable
    - name: APP_NAME
      value: "my-application"

    # From ConfigMap - single key
    - name: LOG_LEVEL
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: LOG_LEVEL

    # From Secret - single key
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-credentials
          key: password

    # Pod metadata as env
    - name: POD_NAME
      valueFrom:
        fieldRef:
          fieldPath: metadata.name

    # Resource limits as env
    - name: MEMORY_LIMIT
      valueFrom:
        resourceFieldRef:
          resource: limits.memory

    # Import all keys from ConfigMap
    envFrom:
    - configMapRef:
        name: app-config
      prefix: CFG_  # Optional prefix

    # Import all keys from Secret
    - secretRef:
        name: db-credentials
      prefix: DB_`
        },
        {
          name: 'Volume Mounts',
          explanation: 'Mount ConfigMaps/Secrets as files in container filesystem. Entire ConfigMap becomes directory with files for each key. Use subPath to mount specific keys as individual files. Secret files default to 0644 permissions, customize with defaultMode. Volume mounts enable hot-reload for config changes.',
          codeExample: `apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
  - name: app
    image: myapp:1.0
    volumeMounts:
    # Mount entire ConfigMap as directory
    - name: config-volume
      mountPath: /etc/config
      readOnly: true

    # Mount specific key as file (subPath)
    - name: config-volume
      mountPath: /etc/nginx/nginx.conf
      subPath: nginx.conf

    # Mount Secret
    - name: secret-volume
      mountPath: /etc/secrets
      readOnly: true

  volumes:
  # ConfigMap volume
  - name: config-volume
    configMap:
      name: app-config
      # Optional: select specific keys
      items:
      - key: nginx.conf
        path: nginx.conf
        mode: 0644
      defaultMode: 0644

  # Secret volume
  - name: secret-volume
    secret:
      secretName: db-credentials
      defaultMode: 0400  # Read-only for owner
      # Optional: select specific keys
      items:
      - key: password
        path: db-password

# ConfigMap changes auto-update mounted files
# (may take up to 1 minute to sync)`
        },
        {
          name: 'External Secrets',
          explanation: 'External Secrets Operator (ESO) integrates with external secret managers. Supports AWS Secrets Manager, HashiCorp Vault, Azure Key Vault, GCP Secret Manager. ExternalSecret CRD syncs external secrets to Kubernetes Secrets. Enables automatic rotation and centralized secret management.',
          codeExample: `# Install External Secrets Operator
helm repo add external-secrets https://charts.external-secrets.io
helm install external-secrets external-secrets/external-secrets

---
# SecretStore (AWS Secrets Manager)
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-east-1
      auth:
        jwt:
          serviceAccountRef:
            name: external-secrets-sa

---
# ExternalSecret
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
spec:
  refreshInterval: 1h  # Sync every hour
  secretStoreRef:
    name: aws-secrets
    kind: SecretStore
  target:
    name: db-secret  # K8s Secret name
    creationPolicy: Owner
  data:
  - secretKey: password
    remoteRef:
      key: prod/database
      property: password
  - secretKey: username
    remoteRef:
      key: prod/database
      property: username

# Vault SecretStore example
# apiVersion: external-secrets.io/v1beta1
# kind: SecretStore
# spec:
#   provider:
#     vault:
#       server: "https://vault.example.com"
#       path: "secret"
#       auth:
#         kubernetes:
#           mountPath: "kubernetes"
#           role: "demo"`
        }
      ]
    },
    {
      id: 'storage',
      name: 'Persistent Storage',
      icon: '💾',
      color: '#ec4899',
      description: 'PVC requests capacity (e.g., 10Gi) bound to PV. StorageClasses enable dynamic provisioning via CSI drivers. Access modes: RWO/RWX/ROX. StatefulSets use VolumeClaimTemplates for ordered pod storage.',
      diagram: PersistentStorageDiagram,
      details: [
        {
          name: 'PersistentVolumes',
          explanation: 'PersistentVolumes (PV) are cluster-level storage resources independent of pods. Administrators provision PVs with specific capacity, access modes, and storage class. Supports various backends: NFS, AWS EBS, Azure Disk, GCE PD, Ceph, local storage. Reclaim policies: Retain, Delete, or Recycle.',
          codeExample: `apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-nfs-data
  labels:
    type: nfs
spec:
  capacity:
    storage: 100Gi
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  storageClassName: nfs-storage
  mountOptions:
    - hard
    - nfsvers=4.1
  nfs:
    server: 10.0.0.100
    path: /exports/data

---
# Local PersistentVolume
apiVersion: v1
kind: PersistentVolume
metadata:
  name: local-pv
spec:
  capacity:
    storage: 50Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local-storage
  local:
    path: /mnt/disks/ssd1
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - worker-node-1

# View PersistentVolumes
kubectl get pv
kubectl describe pv pv-nfs-data`
        },
        {
          name: 'PersistentVolumeClaims',
          explanation: 'PersistentVolumeClaims (PVC) are requests for storage by pods. Specify required capacity, access modes, and storage class. Kubernetes binds PVC to suitable PV. Pods reference PVCs in volume definitions. PVCs enable portable storage requests across different cluster environments.',
          codeExample: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data-pvc
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
  storageClassName: gp3  # AWS gp3 storage class
  selector:  # Optional: select specific PV
    matchLabels:
      type: ssd

---
# Using PVC in a Pod
apiVersion: v1
kind: Pod
metadata:
  name: app-with-storage
spec:
  containers:
  - name: app
    image: myapp:1.0
    volumeMounts:
    - name: data-volume
      mountPath: /data
  volumes:
  - name: data-volume
    persistentVolumeClaim:
      claimName: app-data-pvc

# View PVCs
kubectl get pvc
kubectl describe pvc app-data-pvc

# Check binding status
kubectl get pvc app-data-pvc -o jsonpath='{.status.phase}'`
        },
        {
          name: 'StorageClasses',
          explanation: 'StorageClasses enable dynamic provisioning of PersistentVolumes. Define provisioner (CSI driver), parameters (disk type, IOPS), and reclaim policy. volumeBindingMode: WaitForFirstConsumer delays binding until pod scheduled. allowVolumeExpansion enables online volume resizing.',
          codeExample: `# AWS EBS StorageClass (gp3)
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gp3-encrypted
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
  encrypted: "true"
  fsType: ext4
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer

---
# GCP PD StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: pd-ssd
provisioner: pd.csi.storage.gke.io
parameters:
  type: pd-ssd
  replication-type: regional-pd
reclaimPolicy: Retain
volumeBindingMode: WaitForFirstConsumer

---
# NFS StorageClass (with provisioner)
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: nfs-client
provisioner: cluster.local/nfs-client-provisioner
parameters:
  archiveOnDelete: "false"

# List storage classes
kubectl get sc`
        },
        {
          name: 'Access Modes',
          explanation: 'ReadWriteOnce (RWO): Single node can mount read-write. ReadOnlyMany (ROX): Multiple nodes can mount read-only. ReadWriteMany (RWX): Multiple nodes can mount read-write. Not all storage backends support all modes. Choose based on application requirements and storage capabilities.',
          codeExample: `# RWO - ReadWriteOnce (single node read-write)
# Used for: Databases, single-instance apps
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: database-pvc
spec:
  accessModes:
    - ReadWriteOnce  # Only one node can mount
  resources:
    requests:
      storage: 100Gi
  storageClassName: gp3

---
# RWX - ReadWriteMany (multi-node read-write)
# Used for: Shared file storage, CMS, logs
# Requires NFS, EFS, Azure Files, or similar
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shared-files-pvc
spec:
  accessModes:
    - ReadWriteMany  # Multiple nodes can mount
  resources:
    requests:
      storage: 50Gi
  storageClassName: efs-sc

---
# ROX - ReadOnlyMany (multi-node read-only)
# Used for: Shared config, static content
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: static-content-pvc
spec:
  accessModes:
    - ReadOnlyMany
  resources:
    requests:
      storage: 10Gi

# Storage backend support:
# AWS EBS: RWO only
# AWS EFS: RWX, RWO, ROX
# GCP PD: RWO, ROX
# Azure Disk: RWO only
# Azure Files: RWX, RWO, ROX
# NFS: RWX, RWO, ROX`
        },
        {
          name: 'StatefulSets',
          explanation: 'StatefulSets manage stateful applications with stable network identities and persistent storage. Pods get predictable names (app-0, app-1). VolumeClaimTemplates create unique PVC per replica. Ordered deployment and scaling. Headless Service provides DNS for each pod. Use for databases, message queues, distributed systems.',
          codeExample: `apiVersion: v1
kind: Service
metadata:
  name: mysql
spec:
  clusterIP: None  # Headless service
  selector:
    app: mysql
  ports:
  - port: 3306
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: mysql  # Headless service name
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        ports:
        - containerPort: 3306
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: password
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: gp3
      resources:
        requests:
          storage: 50Gi

# Pod DNS names:
# mysql-0.mysql.default.svc.cluster.local
# mysql-1.mysql.default.svc.cluster.local
# mysql-2.mysql.default.svc.cluster.local

# PVCs created:
# data-mysql-0, data-mysql-1, data-mysql-2`
        }
      ]
    },
    {
      id: 'autoscaling',
      name: 'Auto-Scaling & Resources',
      icon: '📊',
      color: '#06b6d4',
      description: 'HPA: scales 1-1000+ replicas on CPU/memory thresholds. VPA: right-sizes requests/limits. Cluster Autoscaler: adds nodes (1000m=1 CPU). Resource quotas limit per-namespace. QoS: Guaranteed/Burstable/BestEffort.',
      diagram: AutoScalingDiagram,
      details: [
        {
          name: 'Horizontal Pod Autoscaler',
          explanation: 'HPA automatically scales pod replicas based on CPU, memory, or custom metrics. Configure target utilization (e.g., 70% CPU). Set min/max replicas for bounds. Behavior settings control scale-up/down rates and stabilization windows. Requires Metrics Server for resource metrics.',
          codeExample: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 20
  metrics:
  # CPU-based scaling
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  # Memory-based scaling
  - type: Resource
    resource:
      name: memory
      target:
        type: AverageValue
        averageValue: 500Mi
  # Custom metric (e.g., requests per second)
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: 1000
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

# Create HPA via CLI
kubectl autoscale deployment web-app \\
  --min=2 --max=10 --cpu-percent=70

# View HPA status
kubectl get hpa
kubectl describe hpa web-app-hpa`
        },
        {
          name: 'Vertical Pod Autoscaler',
          explanation: 'VPA adjusts CPU and memory requests/limits for containers. Modes: Off (recommendations only), Initial (set on creation), Recreate (update running pods), Auto. Helps right-size resources based on actual usage. Cannot run with HPA on same metrics. Useful for optimizing resource allocation.',
          codeExample: `# Install VPA (from autoscaler repo)
# kubectl apply -f vpa-v0.14.0/vpa-rbac.yaml
# kubectl apply -f vpa-v0.14.0/vpa.yaml

apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: app-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  updatePolicy:
    updateMode: "Auto"  # Off, Initial, Recreate, Auto
  resourcePolicy:
    containerPolicies:
    - containerName: '*'
      minAllowed:
        cpu: 100m
        memory: 50Mi
      maxAllowed:
        cpu: 2
        memory: 2Gi
      controlledResources: ["cpu", "memory"]
      controlledValues: RequestsAndLimits

---
# Recommendation-only mode (safe for production)
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: app-vpa-recommend
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  updatePolicy:
    updateMode: "Off"  # Only provide recommendations

# View VPA recommendations
kubectl describe vpa app-vpa`
        },
        {
          name: 'Cluster Autoscaler',
          explanation: 'Cluster Autoscaler adds/removes nodes based on pod scheduling needs. Adds nodes when pods are pending due to insufficient resources. Removes underutilized nodes after configurable cool-down. Integrates with cloud provider node groups/pools. Consider with HPA for full auto-scaling.',
          codeExample: `# Cluster Autoscaler Deployment (AWS EKS example)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cluster-autoscaler
  template:
    metadata:
      labels:
        app: cluster-autoscaler
    spec:
      serviceAccountName: cluster-autoscaler
      containers:
      - name: cluster-autoscaler
        image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.28.0
        command:
        - ./cluster-autoscaler
        - --v=4
        - --cloud-provider=aws
        - --skip-nodes-with-local-storage=false
        - --expander=least-waste
        - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/<cluster-name>
        - --balance-similar-node-groups
        - --scale-down-delay-after-add=10m
        - --scale-down-unneeded-time=10m
        - --scale-down-utilization-threshold=0.5

# Node group annotations for scaling
# AWS ASG tags:
# k8s.io/cluster-autoscaler/enabled: true
# k8s.io/cluster-autoscaler/<cluster-name>: owned

# View autoscaler logs
kubectl logs -n kube-system -l app=cluster-autoscaler

# Check for pending pods
kubectl get pods --field-selector=status.phase=Pending`
        },
        {
          name: 'Resource Requests & Limits',
          explanation: 'Requests: Minimum resources guaranteed for scheduling. Limits: Maximum resources container can consume. CPU measured in millicores (1000m = 1 core). Memory in bytes (Mi, Gi). Always set requests for proper scheduling. Limits prevent resource hogging but can cause throttling/OOMKill.',
          codeExample: `apiVersion: v1
kind: Pod
metadata:
  name: resource-demo
spec:
  containers:
  - name: app
    image: myapp:1.0
    resources:
      # Guaranteed minimum resources
      requests:
        cpu: "250m"      # 0.25 CPU cores
        memory: "256Mi"  # 256 mebibytes
        ephemeral-storage: "1Gi"
      # Maximum allowed resources
      limits:
        cpu: "1"         # 1 CPU core (1000m)
        memory: "512Mi"  # 512 mebibytes
        ephemeral-storage: "2Gi"

# CPU units:
# 1 = 1 vCPU/core
# 1000m = 1 CPU
# 100m = 0.1 CPU (100 millicores)

# Memory units:
# E, P, T, G, M, K (decimal)
# Ei, Pi, Ti, Gi, Mi, Ki (binary)
# 128974848 (bytes)
# 129e6, 129M (megabytes)
# 128Mi (mebibytes)

# View resource usage
kubectl top pods
kubectl top nodes

# Describe pod resources
kubectl describe pod resource-demo | grep -A 5 "Limits\\|Requests"`
        },
        {
          name: 'Quality of Service',
          explanation: 'QoS classes determine eviction priority. Guaranteed: requests equal limits for all containers (highest priority). Burstable: requests less than limits. BestEffort: no requests or limits set (lowest priority, first evicted). Use Guaranteed for critical workloads, Burstable for general apps.',
          codeExample: `# Guaranteed QoS - requests = limits
apiVersion: v1
kind: Pod
metadata:
  name: guaranteed-pod
spec:
  containers:
  - name: app
    image: myapp:1.0
    resources:
      requests:
        cpu: "500m"
        memory: "256Mi"
      limits:
        cpu: "500m"      # Same as request
        memory: "256Mi"  # Same as request

---
# Burstable QoS - requests < limits
apiVersion: v1
kind: Pod
metadata:
  name: burstable-pod
spec:
  containers:
  - name: app
    image: myapp:1.0
    resources:
      requests:
        cpu: "100m"
        memory: "128Mi"
      limits:
        cpu: "500m"      # Higher than request
        memory: "512Mi"  # Higher than request

---
# BestEffort QoS - no requests/limits
apiVersion: v1
kind: Pod
metadata:
  name: besteffort-pod
spec:
  containers:
  - name: app
    image: myapp:1.0
    # No resources specified

# Check QoS class
kubectl get pod guaranteed-pod -o jsonpath='{.status.qosClass}'

# Eviction order (under memory pressure):
# 1. BestEffort pods
# 2. Burstable pods exceeding requests
# 3. Guaranteed pods (last resort)`
        },
        {
          name: 'Resource Quotas',
          explanation: 'ResourceQuotas limit total resources per namespace. Set limits on CPU, memory, storage, object counts. LimitRanges set default and min/max per container. PriorityClasses control scheduling priority. PodDisruptionBudgets ensure availability during disruptions (minAvailable or maxUnavailable).',
          codeExample: `# ResourceQuota
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: development
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    persistentvolumeclaims: "10"
    pods: "50"
    services: "20"
    secrets: "50"
    configmaps: "50"

---
# LimitRange - defaults and constraints
apiVersion: v1
kind: LimitRange
metadata:
  name: limit-range
  namespace: development
spec:
  limits:
  - type: Container
    default:
      cpu: "500m"
      memory: "256Mi"
    defaultRequest:
      cpu: "100m"
      memory: "128Mi"
    min:
      cpu: "50m"
      memory: "64Mi"
    max:
      cpu: "2"
      memory: "2Gi"
  - type: PersistentVolumeClaim
    min:
      storage: 1Gi
    max:
      storage: 100Gi

---
# PodDisruptionBudget
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
spec:
  minAvailable: 2  # Or use maxUnavailable: 1
  selector:
    matchLabels:
      app: web

# View quotas
kubectl get resourcequota -n development
kubectl describe resourcequota compute-quota -n development`
        }
      ]
    },
    {
      id: 'health-probes',
      name: 'Health Checks & Probes',
      icon: '🏥',
      color: '#84cc16',
      description: 'Liveness probe (restart on failure), Readiness probe (remove from LB), Startup probe (delay checks). Types: HTTP/TCP/Exec/gRPC. Config: initialDelaySeconds, periodSeconds, failureThreshold (3+).',
      diagram: HealthProbesDiagram,
      details: [
        {
          name: 'Liveness Probes',
          explanation: 'Liveness probes detect when a container is unhealthy and needs restart. Kubelet restarts container after failureThreshold consecutive failures. Use for detecting deadlocks, unrecoverable states. Do NOT check external dependencies in liveness probes - this can cause cascading restarts.',
          codeExample: `apiVersion: v1
kind: Pod
metadata:
  name: liveness-demo
spec:
  containers:
  - name: app
    image: myapp:1.0
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
        httpHeaders:
        - name: X-Custom-Header
          value: liveness-check
      initialDelaySeconds: 15   # Wait before first probe
      periodSeconds: 10         # Check every 10 seconds
      timeoutSeconds: 3         # Timeout per probe
      failureThreshold: 3       # Restart after 3 failures
      successThreshold: 1       # 1 success to be healthy

---
# Liveness with exec command
apiVersion: v1
kind: Pod
metadata:
  name: liveness-exec
spec:
  containers:
  - name: app
    image: myapp:1.0
    livenessProbe:
      exec:
        command:
        - cat
        - /tmp/healthy
      initialDelaySeconds: 5
      periodSeconds: 5

# Warning: Don't check external dependencies
# Bad:  Check database connection (cascading failures)
# Good: Check internal application state only`
        },
        {
          name: 'Readiness Probes',
          explanation: 'Readiness probes determine when a container is ready to accept traffic. Failed probe removes pod from Service endpoints. Use for startup checks, dependency validation, graceful load shedding. Critical for zero-downtime deployments - pod must be ready before receiving traffic.',
          codeExample: `apiVersion: v1
kind: Pod
metadata:
  name: readiness-demo
spec:
  containers:
  - name: app
    image: myapp:1.0
    ports:
    - containerPort: 8080
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 5
      timeoutSeconds: 2
      successThreshold: 1
      failureThreshold: 3

---
# Combined liveness and readiness
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: web
        image: web:1.0
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10

# Readiness can check dependencies
# OK: Check database, cache, external services
# Pod removed from service until ready`
        },
        {
          name: 'Startup Probes',
          explanation: 'Startup probes delay liveness/readiness checks for slow-starting applications. Use failureThreshold * periodSeconds to set maximum startup time. Once successful, liveness and readiness probes take over. Prevents liveness probe from killing slow-starting containers.',
          codeExample: `apiVersion: v1
kind: Pod
metadata:
  name: slow-starting-app
spec:
  containers:
  - name: app
    image: legacy-app:1.0
    ports:
    - containerPort: 8080
    # Startup probe for slow-starting apps
    startupProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 0
      periodSeconds: 10
      timeoutSeconds: 3
      failureThreshold: 30     # 30 * 10 = 300s max startup
      successThreshold: 1
    # Liveness probe (runs after startup succeeds)
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      periodSeconds: 10
      failureThreshold: 3
    # Readiness probe (runs after startup succeeds)
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      periodSeconds: 5
      failureThreshold: 3

# Without startup probe, liveness could kill
# slow-starting app before it's ready

# Max startup time calculation:
# failureThreshold * periodSeconds = max time
# 30 * 10s = 300 seconds (5 minutes)`
        },
        {
          name: 'Probe Types',
          explanation: 'HTTP GET: Check endpoint returns 200-399 status. TCP Socket: Test if port accepts connections. Exec: Run command in container, exit code 0 = success. gRPC: Check gRPC health service. Configure initialDelaySeconds, periodSeconds, timeoutSeconds, successThreshold, failureThreshold.',
          codeExample: `# HTTP GET Probe
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
    scheme: HTTPS  # HTTP or HTTPS
    httpHeaders:
    - name: Authorization
      value: Bearer token123

---
# TCP Socket Probe
livenessProbe:
  tcpSocket:
    port: 3306
  initialDelaySeconds: 15
  periodSeconds: 10

---
# Exec Probe
livenessProbe:
  exec:
    command:
    - /bin/sh
    - -c
    - pg_isready -U postgres -h localhost
  initialDelaySeconds: 30
  periodSeconds: 10

---
# gRPC Probe (K8s 1.24+)
livenessProbe:
  grpc:
    port: 50051
    service: ""  # Empty uses default health check
  initialDelaySeconds: 10
  periodSeconds: 10

# Probe configuration fields:
# initialDelaySeconds: Wait before first probe (default 0)
# periodSeconds: Frequency of probes (default 10)
# timeoutSeconds: Probe timeout (default 1)
# successThreshold: Successes to be healthy (default 1)
# failureThreshold: Failures before action (default 3)`
        },
        {
          name: 'Graceful Shutdown',
          explanation: 'PreStop hooks run before container termination for cleanup. terminationGracePeriodSeconds (default 30s) allows time for graceful shutdown. SIGTERM sent first, then SIGKILL after grace period. Applications should handle SIGTERM, drain connections, complete in-flight requests.',
          codeExample: `apiVersion: v1
kind: Pod
metadata:
  name: graceful-app
spec:
  terminationGracePeriodSeconds: 60  # Max shutdown time
  containers:
  - name: app
    image: myapp:1.0
    lifecycle:
      preStop:
        exec:
          command:
          - /bin/sh
          - -c
          - |
            echo "Shutting down..."
            sleep 5  # Wait for LB to stop sending traffic
            /app/drain-connections.sh
            echo "Shutdown complete"
      # Or use HTTP hook
      # preStop:
      #   httpGet:
      #     path: /shutdown
      #     port: 8080

# Shutdown sequence:
# 1. Pod marked Terminating
# 2. Removed from Service endpoints
# 3. preStop hook executes
# 4. SIGTERM sent to container
# 5. Wait terminationGracePeriodSeconds
# 6. SIGKILL sent if still running

# Application best practices:
# - Handle SIGTERM signal
# - Stop accepting new connections
# - Complete in-flight requests
# - Close database connections
# - Flush logs and metrics

# Java example (Spring Boot):
# server.shutdown=graceful
# spring.lifecycle.timeout-per-shutdown-phase=30s`
        }
      ]
    },
    {
      id: 'production',
      name: 'Production Best Practices',
      icon: '🚀',
      color: '#ef4444',
      description: 'RBAC with least privilege. Pod Security Standards (Privileged/Baseline/Restricted). Prometheus + Grafana. EFK/Loki logs. GitOps (ArgoCD/Flux). Multi-AZ, PodDisruptionBudgets, Velero backups.',
      diagram: ProductionBestPracticesDiagram,
      details: [
        {
          name: 'RBAC Security',
          explanation: 'Role-Based Access Control limits who can do what. ServiceAccounts for pod identities. Roles/ClusterRoles define permissions (verbs on resources). RoleBindings/ClusterRoleBindings assign roles to subjects. Follow least privilege principle. Audit with kubectl auth can-i.',
          codeExample: `# ServiceAccount
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-service-account
  namespace: production

---
# Role (namespace-scoped)
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: production
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log"]
  verbs: ["get", "list", "watch"]
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["get", "list"]

---
# RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: production
subjects:
- kind: ServiceAccount
  name: app-service-account
  namespace: production
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io

---
# ClusterRole (cluster-wide)
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: node-viewer
rules:
- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["get", "list", "watch"]

# Check permissions
kubectl auth can-i list pods --as=system:serviceaccount:production:app-service-account
kubectl auth can-i --list --as=developer@example.com`
        },
        {
          name: 'Network Security',
          explanation: 'Default deny NetworkPolicies for all namespaces. Allow only necessary ingress/egress traffic. Pod Security Standards: Privileged (unrestricted), Baseline (minimal restrictions), Restricted (hardened). Use namespace labels for enforcement. Scan images for vulnerabilities.',
          codeExample: `# Pod Security Standards (via namespace labels)
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted

---
# Secure Pod configuration
apiVersion: v1
kind: Pod
metadata:
  name: secure-app
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 1000
    fsGroup: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: app
    image: myapp:1.0
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
    volumeMounts:
    - name: tmp
      mountPath: /tmp
  volumes:
  - name: tmp
    emptyDir: {}

# Image scanning with Trivy
# trivy image myapp:1.0

# Admission controllers for security:
# - OPA Gatekeeper
# - Kyverno`
        },
        {
          name: 'Monitoring & Alerting',
          explanation: 'Prometheus for metrics collection with ServiceMonitors. Grafana for visualization and dashboards. PrometheusRules for alerting on conditions. Key metrics: CPU/memory usage, error rates, latency, pod restarts. Alert on SLO violations, not just thresholds.',
          codeExample: `# ServiceMonitor (for Prometheus Operator)
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: app-monitor
  labels:
    release: prometheus
spec:
  selector:
    matchLabels:
      app: my-app
  endpoints:
  - port: metrics
    path: /metrics
    interval: 30s

---
# PrometheusRule for alerting
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: app-alerts
spec:
  groups:
  - name: app.rules
    rules:
    - alert: HighErrorRate
      expr: |
        sum(rate(http_requests_total{status=~"5.."}[5m]))
        / sum(rate(http_requests_total[5m])) > 0.05
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "High error rate detected"
        description: "Error rate is {{ $value | humanizePercentage }}"
    - alert: PodRestartingFrequently
      expr: |
        increase(kube_pod_container_status_restarts_total[1h]) > 3
      for: 10m
      labels:
        severity: warning

# Install Prometheus stack
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack`
        },
        {
          name: 'Centralized Logging',
          explanation: 'EFK/ELK stack (Elasticsearch, Fluentd/Filebeat, Kibana) for log aggregation. Or use cloud solutions: AWS CloudWatch, GCP Logging, Azure Monitor. DaemonSet log collectors on each node. Structured logging (JSON) enables better searching and analysis.',
          codeExample: `# Fluentd DaemonSet (simplified)
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
  namespace: logging
spec:
  selector:
    matchLabels:
      app: fluentd
  template:
    metadata:
      labels:
        app: fluentd
    spec:
      serviceAccountName: fluentd
      containers:
      - name: fluentd
        image: fluent/fluentd-kubernetes-daemonset:v1-debian-elasticsearch
        env:
        - name: FLUENT_ELASTICSEARCH_HOST
          value: "elasticsearch.logging.svc"
        - name: FLUENT_ELASTICSEARCH_PORT
          value: "9200"
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: containers
          mountPath: /var/lib/docker/containers
          readOnly: true
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: containers
        hostPath:
          path: /var/lib/docker/containers

# Structured logging in application
# {"timestamp":"2024-01-15T10:30:00Z",
#  "level":"INFO",
#  "message":"Request processed",
#  "request_id":"abc-123",
#  "duration_ms":45}

# View logs
kubectl logs -n production deployment/app -f --tail=100
kubectl logs -n production -l app=web --all-containers`
        },
        {
          name: 'GitOps & CI/CD',
          explanation: 'GitOps: Git as single source of truth for deployments. ArgoCD or Flux for continuous deployment. Kustomize for environment-specific overlays. Helm for packaged applications. Automated sync ensures cluster matches Git state. Enables audit trail and rollback.',
          codeExample: `# ArgoCD Application
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/app-manifests
    targetRevision: main
    path: overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        maxDuration: 3m

---
# Kustomize overlay structure
# base/
#   deployment.yaml
#   service.yaml
#   kustomization.yaml
# overlays/
#   production/
#     kustomization.yaml
#     patches/
#       replicas.yaml

# overlays/production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- ../../base
namespace: production
patches:
- path: patches/replicas.yaml
images:
- name: myapp
  newTag: v2.0.0

# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`
        },
        {
          name: 'High Availability',
          explanation: 'Multi-zone deployments with pod anti-affinity. PodDisruptionBudgets ensure availability during maintenance. Topology spread constraints distribute pods evenly. Regular backups with Velero. Test disaster recovery procedures. Document runbooks for incident response.',
          codeExample: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 6
  template:
    spec:
      # Spread across zones
      topologySpreadConstraints:
      - maxSkew: 1
        topologyKey: topology.kubernetes.io/zone
        whenUnsatisfiable: DoNotSchedule
        labelSelector:
          matchLabels:
            app: web
      # Anti-affinity: don't colocate on same node
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchLabels:
                  app: web
              topologyKey: kubernetes.io/hostname
      containers:
      - name: web
        image: web:1.0

---
# Velero backup schedule
apiVersion: velero.io/v1
kind: Schedule
metadata:
  name: daily-backup
  namespace: velero
spec:
  schedule: "0 2 * * *"  # 2 AM daily
  template:
    includedNamespaces:
    - production
    - staging
    storageLocation: aws-backup
    ttl: 720h  # 30 days

# Install Velero
velero install --provider aws \\
  --bucket my-backup-bucket \\
  --secret-file ./credentials

# Create backup
velero backup create prod-backup --include-namespaces production

# Restore
velero restore create --from-backup prod-backup`
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
      stack.push({ name: 'Kubernetes', icon: '☸️', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Kubernetes', icon: '☸️' })
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
          <h1 style={titleStyle}>Kubernetes</h1>
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
          colors={K8S_COLORS}
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
              {concept.details.length} topics - Click to explore
            </div>
          </div>
        ))}
      </div>

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
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={K8S_COLORS}
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
              const DiagramComponent = selectedConcept.diagram
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  {DiagramComponent && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
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

export default Kubernetes

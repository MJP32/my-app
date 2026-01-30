import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const DOCKER_COLORS = {
  primary: '#0891b2',
  primaryHover: '#06b6d4',
  bg: 'rgba(8, 145, 178, 0.1)',
  border: 'rgba(8, 145, 178, 0.3)',
  arrow: '#0891b2',
  hoverBg: 'rgba(8, 145, 178, 0.2)',
  topicBg: 'rgba(8, 145, 178, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// Diagram Components for Docker Topics
const DockerBasicsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="dockerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#dockerGrad)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">Docker Architecture</text>
    <rect x="20" y="40" width="120" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="80" y="60" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">Docker Client</text>
    <text x="80" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9">CLI Commands</text>
    <path d="M140 65 L180 65" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
    <rect x="180" y="35" width="180" height="115" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="270" y="55" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Docker Host</text>
    <rect x="195" y="65" width="70" height="35" rx="4" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="230" y="87" textAnchor="middle" fill="#fbbf24" fontSize="9">Daemon</text>
    <rect x="275" y="65" width="70" height="35" rx="4" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="310" y="87" textAnchor="middle" fill="#a78bfa" fontSize="9">Images</text>
    <rect x="195" y="105" width="150" height="35" rx="4" fill="#374151" stroke="#ec4899" strokeWidth="1"/>
    <text x="270" y="127" textAnchor="middle" fill="#f472b6" fontSize="9">Containers</text>
    <path d="M360 90 L400 90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
    <rect x="400" y="40" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="465" y="60" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Registry</text>
    <text x="465" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9">Docker Hub/ECR</text>
    <rect x="550" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="615" y="60" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Volumes</text>
    <rect x="565" y="75" width="100" height="25" rx="3" fill="#374151"/>
    <text x="615" y="92" textAnchor="middle" fill="#94a3b8" fontSize="8">Persistent Data</text>
    <rect x="565" y="105" width="100" height="25" rx="3" fill="#374151"/>
    <text x="615" y="122" textAnchor="middle" fill="#94a3b8" fontSize="8">Bind Mounts</text>
    <defs>
      <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
      </marker>
      <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
      </marker>
    </defs>
  </svg>
)

const DockerfileDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="dfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#059669" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#dfGrad)" stroke="#10b981" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">Multi-Stage Build Process</text>
    <rect x="20" y="40" width="100" height="70" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="70" y="60" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Stage 1</text>
    <text x="70" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Builder</text>
    <text x="70" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7">Maven/Node</text>
    <text x="70" y="102" textAnchor="middle" fill="#6b7280" fontSize="7">~800MB</text>
    <path d="M120 75 L150 75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)"/>
    <rect x="150" y="40" width="100" height="70" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="200" y="60" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Compile</text>
    <text x="200" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Build Artifact</text>
    <text x="200" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">.jar/.js bundle</text>
    <path d="M250 75 L280 75" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)"/>
    <rect x="280" y="40" width="100" height="70" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="330" y="60" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Stage 2</text>
    <text x="330" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Runtime</text>
    <text x="330" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7">JRE/Alpine</text>
    <text x="330" y="102" textAnchor="middle" fill="#6b7280" fontSize="7">~150MB</text>
    <path d="M380 75 L410 75" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue2)"/>
    <rect x="410" y="40" width="100" height="70" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="460" y="60" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Final</text>
    <text x="460" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Production</text>
    <text x="460" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Optimized</text>
    <rect x="530" y="40" width="150" height="70" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="605" y="55" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Best Practices</text>
    <text x="605" y="70" textAnchor="middle" fill="#94a3b8" fontSize="7">Non-root user</text>
    <text x="605" y="82" textAnchor="middle" fill="#94a3b8" fontSize="7">Layer caching</text>
    <text x="605" y="94" textAnchor="middle" fill="#94a3b8" fontSize="7">.dockerignore</text>
    <text x="605" y="106" textAnchor="middle" fill="#94a3b8" fontSize="7">HEALTHCHECK</text>
    <text x="350" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">90% size reduction through multi-stage builds</text>
    <defs>
      <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/></marker>
      <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/></marker>
      <marker id="arrowBlue2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/></marker>
    </defs>
  </svg>
)

const DockerComposeDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="composeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#composeGrad)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">Docker Compose Multi-Container Stack</text>
    <rect x="20" y="40" width="100" height="105" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="70" y="58" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Frontend</text>
    <text x="70" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">React/Vue</text>
    <text x="70" y="90" textAnchor="middle" fill="#6b7280" fontSize="7">Port: 3000</text>
    <rect x="30" y="100" width="80" height="35" rx="3" fill="#374151"/>
    <text x="70" y="115" textAnchor="middle" fill="#94a3b8" fontSize="7">nginx:alpine</text>
    <text x="70" y="128" textAnchor="middle" fill="#6b7280" fontSize="6">Static Files</text>
    <path d="M120 90 L150 90" stroke="#ec4899" strokeWidth="2" strokeDasharray="4"/>
    <rect x="150" y="40" width="100" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="200" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Backend</text>
    <text x="200" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Spring Boot</text>
    <text x="200" y="90" textAnchor="middle" fill="#6b7280" fontSize="7">Port: 8080</text>
    <rect x="160" y="100" width="80" height="35" rx="3" fill="#374151"/>
    <text x="200" y="115" textAnchor="middle" fill="#94a3b8" fontSize="7">JRE:17-alpine</text>
    <text x="200" y="128" textAnchor="middle" fill="#6b7280" fontSize="6">REST API</text>
    <path d="M250 90 L280 90" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4"/>
    <rect x="280" y="40" width="100" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="330" y="58" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Database</text>
    <text x="330" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">PostgreSQL</text>
    <text x="330" y="90" textAnchor="middle" fill="#6b7280" fontSize="7">Port: 5432</text>
    <rect x="290" y="100" width="80" height="35" rx="3" fill="#374151"/>
    <text x="330" y="115" textAnchor="middle" fill="#94a3b8" fontSize="7">postgres:15</text>
    <text x="330" y="128" textAnchor="middle" fill="#6b7280" fontSize="6">Volume Mount</text>
    <path d="M380 90 L410 90" stroke="#10b981" strokeWidth="2" strokeDasharray="4"/>
    <rect x="410" y="40" width="100" height="105" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="460" y="58" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Cache</text>
    <text x="460" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Redis</text>
    <text x="460" y="90" textAnchor="middle" fill="#6b7280" fontSize="7">Port: 6379</text>
    <rect x="420" y="100" width="80" height="35" rx="3" fill="#374151"/>
    <text x="460" y="115" textAnchor="middle" fill="#94a3b8" fontSize="7">redis:7-alpine</text>
    <text x="460" y="128" textAnchor="middle" fill="#6b7280" fontSize="6">In-Memory</text>
    <rect x="530" y="40" width="150" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="605" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Networks</text>
    <text x="605" y="73" textAnchor="middle" fill="#94a3b8" fontSize="7">app-network: bridge</text>
    <text x="605" y="85" textAnchor="middle" fill="#6b7280" fontSize="7">DNS Resolution</text>
    <rect x="530" y="95" width="150" height="50" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="605" y="113" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Volumes</text>
    <text x="605" y="128" textAnchor="middle" fill="#94a3b8" fontSize="7">postgres-data, redis-data</text>
    <text x="605" y="140" textAnchor="middle" fill="#6b7280" fontSize="7">Persistent Storage</text>
  </svg>
)

const DockerNetworkingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#netGrad)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">Docker Network Types</text>
    <rect x="20" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="85" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Bridge (Default)</text>
    <rect x="30" y="65" width="50" height="30" rx="3" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="55" y="83" textAnchor="middle" fill="#94a3b8" fontSize="7">App1</text>
    <rect x="90" y="65" width="50" height="30" rx="3" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="115" y="83" textAnchor="middle" fill="#94a3b8" fontSize="7">App2</text>
    <line x1="55" y1="95" x2="55" y2="115" stroke="#3b82f6" strokeWidth="1"/>
    <line x1="115" y1="95" x2="115" y2="115" stroke="#3b82f6" strokeWidth="1"/>
    <rect x="30" y="115" width="110" height="20" rx="3" fill="#374151"/>
    <text x="85" y="129" textAnchor="middle" fill="#60a5fa" fontSize="7">docker0 bridge</text>
    <rect x="170" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="235" y="58" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Host</text>
    <rect x="180" y="70" width="110" height="65" rx="3" fill="#374151" stroke="#10b981" strokeWidth="1"/>
    <text x="235" y="88" textAnchor="middle" fill="#34d399" fontSize="8">Container</text>
    <text x="235" y="103" textAnchor="middle" fill="#94a3b8" fontSize="7">Shares Host</text>
    <text x="235" y="115" textAnchor="middle" fill="#94a3b8" fontSize="7">Network Stack</text>
    <text x="235" y="128" textAnchor="middle" fill="#6b7280" fontSize="6">No isolation</text>
    <rect x="320" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="385" y="58" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Overlay (Swarm)</text>
    <rect x="330" y="68" width="45" height="25" rx="3" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="352" y="84" textAnchor="middle" fill="#94a3b8" fontSize="6">Node1</text>
    <rect x="395" y="68" width="45" height="25" rx="3" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="417" y="84" textAnchor="middle" fill="#94a3b8" fontSize="6">Node2</text>
    <path d="M375 80 L395 80" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3"/>
    <rect x="330" y="100" width="110" height="35" rx="3" fill="#374151"/>
    <text x="385" y="115" textAnchor="middle" fill="#fbbf24" fontSize="7">VXLAN Tunnel</text>
    <text x="385" y="128" textAnchor="middle" fill="#6b7280" fontSize="6">Multi-host</text>
    <rect x="470" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="520" y="58" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">None</text>
    <text x="520" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Isolated</text>
    <text x="520" y="85" textAnchor="middle" fill="#6b7280" fontSize="6">No network</text>
    <rect x="470" y="95" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="520" y="113" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Macvlan</text>
    <text x="520" y="128" textAnchor="middle" fill="#94a3b8" fontSize="7">Physical MAC</text>
    <text x="520" y="140" textAnchor="middle" fill="#6b7280" fontSize="6">Legacy apps</text>
    <rect x="590" y="55" width="95" height="80" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="637" y="73" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">DNS</text>
    <text x="637" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7">Container names</text>
    <text x="637" y="103" textAnchor="middle" fill="#94a3b8" fontSize="7">resolve to IPs</text>
    <text x="637" y="118" textAnchor="middle" fill="#6b7280" fontSize="6">Service discovery</text>
  </svg>
)

const DockerVolumesDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="volGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#db2777" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#volGrad)" stroke="#ec4899" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f472b6" fontSize="14" fontWeight="bold">Docker Storage Options</text>
    <rect x="20" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="95" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Named Volumes</text>
    <rect x="30" y="68" width="130" height="30" rx="3" fill="#374151"/>
    <text x="95" y="87" textAnchor="middle" fill="#94a3b8" fontSize="8">/var/lib/docker/volumes</text>
    <text x="95" y="110" textAnchor="middle" fill="#34d399" fontSize="8">Docker managed</text>
    <text x="95" y="125" textAnchor="middle" fill="#34d399" fontSize="8">Portable</text>
    <text x="95" y="140" textAnchor="middle" fill="#34d399" fontSize="8">Backup friendly</text>
    <rect x="190" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="265" y="58" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Bind Mounts</text>
    <rect x="200" y="68" width="130" height="30" rx="3" fill="#374151"/>
    <text x="265" y="87" textAnchor="middle" fill="#94a3b8" fontSize="8">/host/path:/container</text>
    <text x="265" y="110" textAnchor="middle" fill="#fbbf24" fontSize="8">Direct access</text>
    <text x="265" y="125" textAnchor="middle" fill="#f87171" fontSize="8">Host dependent</text>
    <text x="265" y="140" textAnchor="middle" fill="#34d399" fontSize="8">Dev workflows</text>
    <rect x="360" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="435" y="58" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">tmpfs Mounts</text>
    <rect x="370" y="68" width="130" height="30" rx="3" fill="#374151"/>
    <text x="435" y="87" textAnchor="middle" fill="#94a3b8" fontSize="8">In-Memory Storage</text>
    <text x="435" y="110" textAnchor="middle" fill="#34d399" fontSize="8">Fast I/O</text>
    <text x="435" y="125" textAnchor="middle" fill="#34d399" fontSize="8">Secure (no disk)</text>
    <text x="435" y="140" textAnchor="middle" fill="#f87171" fontSize="8">Non-persistent</text>
    <rect x="530" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="605" y="58" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Volume Drivers</text>
    <rect x="540" y="68" width="130" height="20" rx="3" fill="#374151"/>
    <text x="605" y="82" textAnchor="middle" fill="#94a3b8" fontSize="7">NFS / AWS EBS</text>
    <rect x="540" y="93" width="130" height="20" rx="3" fill="#374151"/>
    <text x="605" y="107" textAnchor="middle" fill="#94a3b8" fontSize="7">Azure Disk / GCE PD</text>
    <text x="605" y="130" textAnchor="middle" fill="#34d399" fontSize="8">Cloud storage</text>
    <text x="605" y="143" textAnchor="middle" fill="#34d399" fontSize="8">Distributed</text>
  </svg>
)

const DockerSecurityDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="secGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#secGrad)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">Docker Security Layers</text>
    <rect x="20" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="85" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Image Security</text>
    <text x="85" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Minimal base images</text>
    <text x="85" y="93" textAnchor="middle" fill="#94a3b8" fontSize="8">Vulnerability scanning</text>
    <text x="85" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">Content Trust</text>
    <text x="85" y="123" textAnchor="middle" fill="#94a3b8" fontSize="8">No secrets in layers</text>
    <text x="85" y="138" textAnchor="middle" fill="#6b7280" fontSize="7">Trivy, Snyk, Grype</text>
    <rect x="170" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="235" y="58" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Runtime Security</text>
    <text x="235" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Non-root user</text>
    <text x="235" y="93" textAnchor="middle" fill="#94a3b8" fontSize="8">Read-only rootfs</text>
    <text x="235" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">Drop capabilities</text>
    <text x="235" y="123" textAnchor="middle" fill="#94a3b8" fontSize="8">Resource limits</text>
    <text x="235" y="138" textAnchor="middle" fill="#6b7280" fontSize="7">--cap-drop=ALL</text>
    <rect x="320" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="385" y="58" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Network Security</text>
    <text x="385" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Custom networks</text>
    <text x="385" y="93" textAnchor="middle" fill="#94a3b8" fontSize="8">Internal networks</text>
    <text x="385" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">Encrypted overlay</text>
    <text x="385" y="123" textAnchor="middle" fill="#94a3b8" fontSize="8">Network policies</text>
    <text x="385" y="138" textAnchor="middle" fill="#6b7280" fontSize="7">--opt encrypted</text>
    <rect x="470" y="40" width="100" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="520" y="58" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Secrets</text>
    <text x="520" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Docker Secrets</text>
    <text x="520" y="93" textAnchor="middle" fill="#94a3b8" fontSize="8">Vault integration</text>
    <text x="520" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">AWS Secrets Mgr</text>
    <text x="520" y="123" textAnchor="middle" fill="#94a3b8" fontSize="8">Encrypted env</text>
    <rect x="590" y="40" width="95" height="105" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="637" y="58" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Audit</text>
    <text x="637" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Docker Bench</text>
    <text x="637" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">AppArmor</text>
    <text x="637" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">SELinux</text>
    <text x="637" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Seccomp</text>
    <text x="637" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Compliance</text>
  </svg>
)

const ImageOptimizationDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="optGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#optGrad)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">Image Optimization Techniques</text>
    <rect x="20" y="40" width="150" height="50" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="95" y="58" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Before</text>
    <text x="95" y="78" textAnchor="middle" fill="#f87171" fontSize="12">1.2 GB</text>
    <text x="95" y="90" textAnchor="middle" fill="#6b7280" fontSize="7">ubuntu + jdk + maven</text>
    <path d="M170 65 L200 65" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowYellow)"/>
    <rect x="200" y="35" width="180" height="115" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="290" y="53" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Optimization Steps</text>
    <text x="290" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">1. Multi-stage builds</text>
    <text x="290" y="88" textAnchor="middle" fill="#94a3b8" fontSize="8">2. Alpine base image</text>
    <text x="290" y="103" textAnchor="middle" fill="#94a3b8" fontSize="8">3. Layer caching order</text>
    <text x="290" y="118" textAnchor="middle" fill="#94a3b8" fontSize="8">4. .dockerignore</text>
    <text x="290" y="133" textAnchor="middle" fill="#94a3b8" fontSize="8">5. Clean in same layer</text>
    <text x="290" y="148" textAnchor="middle" fill="#6b7280" fontSize="7">BuildKit cache mounts</text>
    <path d="M380 65 L410 65" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen2)"/>
    <rect x="410" y="40" width="150" height="50" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="485" y="58" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">After</text>
    <text x="485" y="78" textAnchor="middle" fill="#34d399" fontSize="12">120 MB</text>
    <text x="485" y="90" textAnchor="middle" fill="#6b7280" fontSize="7">distroless + jre</text>
    <rect x="20" y="100" width="150" height="45" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="95" y="118" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Layer Analysis</text>
    <text x="95" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">dive, docker history</text>
    <rect x="410" y="100" width="150" height="45" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="485" y="118" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">90% Reduction</text>
    <text x="485" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">Faster pulls and deploys</text>
    <rect x="580" y="40" width="105" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="632" y="58" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Base Images</text>
    <text x="632" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">ubuntu: 77MB</text>
    <text x="632" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">alpine: 7MB</text>
    <text x="632" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">distroless: 2MB</text>
    <text x="632" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">scratch: 0MB</text>
    <text x="632" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Choose wisely!</text>
    <defs>
      <marker id="arrowYellow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/></marker>
      <marker id="arrowGreen2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#10b981"/></marker>
    </defs>
  </svg>
)

function Docker({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'docker-basics',
      name: 'Docker Basics',
      icon: '📦',
      color: '#3b82f6',
      description: 'Core Docker architecture: Client-Daemon-Registry model. Container lifecycle management, image layers, and essential CLI commands. Containers share host kernel, use 10x less memory than VMs (typically 50-100MB vs 500MB-1GB).',
      diagram: DockerBasicsDiagram,
      details: [
        {
          name: 'Architecture Overview',
          explanation: 'Docker is a platform for developing, shipping, and running applications in containers. Containers package application code with dependencies, ensuring consistency across environments. The Docker architecture consists of the Docker Client (CLI), Docker Host (Daemon, Images, Containers), Registry (Docker Hub, ECR, GCR), and Volumes for persistent storage. Containers are lightweight compared to VMs because they share the host OS kernel while maintaining isolation.',
          codeExample: `# Docker Architecture Components
# Client -> Daemon -> Registry

# Check Docker version and info
docker version
docker info

# Docker daemon configuration
# /etc/docker/daemon.json
{
  "storage-driver": "overlay2",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "default-address-pools": [
    {"base": "172.17.0.0/16", "size": 24}
  ],
  "live-restore": true,
  "userland-proxy": false
}

# Restart daemon after config changes
sudo systemctl restart docker

# View daemon logs
journalctl -u docker.service -f`
        },
        {
          name: 'Images vs Containers',
          explanation: 'Docker Images are read-only templates containing the application and all its dependencies. They are built in layers, where each Dockerfile instruction creates a new layer. Docker Containers are running instances of Docker images. You can create multiple containers from a single image, each with its own writable layer. Images are stored in registries (Docker Hub, ECR, GCR) and can be versioned with tags.',
          codeExample: `# Working with Images
docker pull nginx:1.25-alpine          # Pull specific version
docker pull --platform linux/amd64 nginx  # Pull for specific platform
docker images                          # List all images
docker images --filter "dangling=true" # List untagged images

# Image inspection
docker inspect nginx:1.25-alpine       # Full image details
docker history nginx:1.25-alpine       # Show image layers

# Tagging and pushing
docker tag myapp:latest myregistry.com/myapp:v1.0.0
docker push myregistry.com/myapp:v1.0.0

# Save and load images (offline transfer)
docker save -o myapp.tar myapp:latest
docker load -i myapp.tar

# Working with Containers
docker create --name mycontainer nginx # Create without starting
docker run -d --name web nginx         # Create and start
docker ps                              # List running containers
docker ps -a                           # List all containers

# Container to image (commit changes)
docker commit mycontainer myapp:modified`
        },
        {
          name: 'Basic Commands',
          explanation: 'Essential Docker commands include: docker pull (download image), docker images (list images), docker run (create and start container), docker ps (list running containers), docker ps -a (list all containers), docker logs (view logs), docker exec -it (access container shell), docker stop (stop container), docker rm (remove container), docker rmi (remove image). Use -d flag for detached mode and -p for port mapping.',
          codeExample: `# Essential Docker Commands

# Pull and run containers
docker pull postgres:15-alpine
docker run -d --name db postgres:15-alpine
docker run -it --rm alpine sh          # Interactive, auto-remove

# Container management
docker ps                              # Running containers
docker ps -a                           # All containers
docker stop db                         # Graceful stop (SIGTERM)
docker kill db                         # Force stop (SIGKILL)
docker start db                        # Start stopped container
docker restart db                      # Restart container

# Logs and debugging
docker logs db                         # View logs
docker logs -f --tail 100 db           # Follow last 100 lines
docker logs --since 1h db              # Logs from last hour

# Execute commands in container
docker exec -it db bash                # Interactive shell
docker exec db psql -U postgres -c "SELECT 1"  # Run command

# Remove containers and images
docker rm db                           # Remove container
docker rm -f db                        # Force remove (running)
docker rmi postgres:15-alpine          # Remove image
docker rmi -f $(docker images -q)      # Remove all images`
        },
        {
          name: 'Container Lifecycle',
          explanation: 'Container lifecycle commands: docker create (create without starting), docker start (start container), docker restart (restart), docker pause/unpause (suspend/resume), docker kill (force stop), docker rm (remove). Use docker inspect for full container details, docker stats for live resource usage, docker top for running processes. Cleanup with docker container prune (remove stopped) and docker system prune (remove all unused).',
          codeExample: `# Container Lifecycle Management

# Create -> Start -> Stop -> Remove
docker create --name app nginx:alpine  # Created state
docker start app                       # Running state
docker pause app                       # Paused state
docker unpause app                     # Running state
docker stop app                        # Exited state (graceful)
docker kill app                        # Exited state (immediate)
docker rm app                          # Removed

# Inspection and monitoring
docker inspect app                     # Full JSON details
docker inspect -f '{{.State.Status}}' app  # Specific field
docker stats                           # Live resource usage
docker stats --no-stream               # Single snapshot
docker top app                         # Running processes

# Cleanup commands
docker container prune                 # Remove stopped containers
docker image prune                     # Remove unused images
docker volume prune                    # Remove unused volumes
docker network prune                   # Remove unused networks
docker system prune                    # Remove all unused
docker system prune -a --volumes       # Full cleanup (careful!)

# Disk usage
docker system df                       # Show disk usage
docker system df -v                    # Verbose disk usage`
        },
        {
          name: 'Running Containers',
          explanation: 'Run containers with options: docker run -d (detached mode), -p 8080:80 (port mapping), -e VAR=value (environment variable), -v /host:/container (volume mount), --memory=512m (memory limit), --cpus=1 (CPU limit), --restart=unless-stopped (restart policy), --name (container name). Copy files with docker cp between host and container. Use docker exec to run commands in running containers.',
          codeExample: `# Docker Run Options

# Basic run with common options
docker run -d \\
  --name myapp \\
  -p 8080:80 \\                         # Port mapping
  -p 127.0.0.1:3000:3000 \\             # Bind to localhost only
  -e NODE_ENV=production \\             # Environment variable
  -e DATABASE_URL=postgres://... \\
  --env-file .env \\                    # Load env from file
  -v mydata:/app/data \\                # Named volume
  -v $(pwd)/config:/app/config:ro \\    # Bind mount (read-only)
  --memory=512m \\                      # Memory limit
  --cpus=1.5 \\                         # CPU limit
  --restart=unless-stopped \\           # Restart policy
  --network=mynetwork \\                # Custom network
  --health-cmd="curl -f http://localhost/" \\
  --health-interval=30s \\
  myimage:latest

# Restart policies
--restart=no                           # Never restart
--restart=on-failure:3                 # Restart on failure, max 3 times
--restart=always                       # Always restart
--restart=unless-stopped               # Restart unless manually stopped

# Copy files
docker cp ./local-file.txt app:/app/   # Host to container
docker cp app:/app/logs ./local-logs/  # Container to host

# Run with different entrypoint/command
docker run --entrypoint /bin/sh nginx -c "echo hello"
docker run nginx nginx -g "daemon off;"`
        }
      ]
    },
    {
      id: 'dockerfile',
      name: 'Dockerfile Best Practices',
      icon: '📝',
      color: '#10b981',
      description: 'Production Dockerfile patterns: Multi-stage builds for 90% smaller images, layer caching strategies, non-root users, and distroless/Alpine base images. Security scanning with Trivy/Snyk reduces deployment time 5-10x.',
      diagram: DockerfileDiagram,
      details: [
        {
          name: 'Multi-Stage Builds',
          explanation: 'Multi-stage builds dramatically reduce image size by separating build and runtime environments. Stage 1 (Builder) contains build tools like Maven or Node (~800MB). Stage 2 (Runtime) contains only the JRE or minimal runtime (~150MB). Use FROM ... AS builder for the build stage, then COPY --from=builder to copy only the built artifact. This achieves 90% size reduction and removes build-time dependencies from final image.',
          codeExample: `# Multi-Stage Dockerfile for Java Application
# Stage 1: Build (includes Maven, JDK - ~800MB)
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app

# Cache dependencies (changes less often)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime (JRE only - ~150MB)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 appgroup && \\
    adduser -D -u 1001 -G appgroup appuser

# Copy only the artifact from builder
COPY --from=builder --chown=appuser:appgroup \\
    /app/target/*.jar app.jar

USER appuser
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \\
    CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]

# Build: docker build -t myapp:1.0.0 .
# Result: ~180MB instead of ~800MB`
        },
        {
          name: 'Layer Optimization',
          explanation: 'Order Dockerfile instructions from least to most frequently changed for optimal layer caching. Copy dependency files (package.json, pom.xml) before source code to cache dependency installation. Combine RUN commands with && to reduce layers. Clean up package manager cache in the same layer as installation: RUN apt-get update && apt-get install -y pkg && rm -rf /var/lib/apt/lists/*. Use COPY instead of ADD unless extracting archives.',
          codeExample: `# Layer Caching Best Practices
FROM node:20-alpine

WORKDIR /app

# 1. System dependencies (rarely change)
RUN apk add --no-cache \\
    curl \\
    tzdata && \\
    rm -rf /var/cache/apk/*

# 2. Dependency files (change occasionally)
COPY package.json package-lock.json ./

# 3. Install dependencies (cached if package*.json unchanged)
RUN npm ci --only=production && \\
    npm cache clean --force

# 4. Application code (changes frequently)
COPY . .

# BAD: Separate RUN commands create extra layers
# RUN apt-get update
# RUN apt-get install -y curl
# RUN rm -rf /var/lib/apt/lists/*

# GOOD: Combined in single layer
RUN apt-get update && \\
    apt-get install -y --no-install-recommends curl && \\
    rm -rf /var/lib/apt/lists/*

# Use COPY, not ADD (unless extracting tar)
COPY config/ /app/config/
# ADD is only for: ADD https://... or ADD archive.tar.gz /dest/`
        },
        {
          name: 'Security Configuration',
          explanation: 'Create non-root user: RUN addgroup -g 1001 appgroup && adduser -D -u 1001 -G appgroup appuser. Switch user with USER appuser. Use COPY --chown=appuser:appgroup for proper file ownership. Add HEALTHCHECK for container health monitoring. Use specific version tags instead of :latest. Never store secrets in Dockerfile or image layers. Use .dockerignore to exclude sensitive files.',
          codeExample: `# Secure Dockerfile Configuration
FROM node:20-alpine

# Create non-root user (Alpine)
RUN addgroup -g 1001 appgroup && \\
    adduser -D -u 1001 -G appgroup appuser

# For Debian/Ubuntu:
# RUN groupadd -g 1001 appgroup && \\
#     useradd -r -u 1001 -g appgroup appuser

WORKDIR /app

# Copy with ownership
COPY --chown=appuser:appgroup package*.json ./
RUN npm ci --only=production

COPY --chown=appuser:appgroup . .

# Switch to non-root user
USER appuser

# Health check for orchestrators
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
    --start-period=10s \\
    CMD curl -f http://localhost:3000/health || exit 1

# Read-only filesystem hint
# Run with: docker run --read-only --tmpfs /tmp myapp

EXPOSE 3000
CMD ["node", "server.js"]

# NEVER do this - secrets in layers!
# ENV API_KEY=secret123
# RUN echo "password" > /app/secret.txt

# Instead, use runtime secrets:
# docker run -e API_KEY=$API_KEY myapp
# docker run --secret id=api_key myapp`
        },
        {
          name: 'Base Image Selection',
          explanation: 'Choose minimal base images: ubuntu (77MB) for full compatibility, alpine (7MB) for small size with musl libc, distroless (2MB) for minimal attack surface with no shell, scratch (0MB) for statically compiled binaries. Use official images from trusted sources. Tag images with specific versions (node:18-alpine) not :latest. Consider security scanning requirements when selecting base images.',
          codeExample: `# Base Image Comparison

# Ubuntu - Full compatibility (~77MB)
FROM ubuntu:22.04
# Pros: glibc, full tooling, familiar
# Cons: Larger size, more CVEs

# Alpine - Small with musl (~7MB)
FROM alpine:3.19
# Pros: Tiny, security-focused
# Cons: musl libc (some compatibility issues)

# Distroless - Minimal runtime (~2MB)
FROM gcr.io/distroless/java17-debian12
# Pros: No shell, minimal attack surface
# Cons: Hard to debug, no package manager

# Scratch - Empty (~0MB)
FROM scratch
COPY myapp /myapp
ENTRYPOINT ["/myapp"]
# Pros: Smallest possible, for static binaries
# Cons: No tooling, must be fully static

# Language-specific slim images
FROM python:3.12-slim           # ~150MB vs ~1GB full
FROM node:20-alpine             # ~180MB vs ~1GB full
FROM eclipse-temurin:21-jre-alpine  # ~200MB vs ~500MB

# Always pin versions!
FROM nginx:1.25.3-alpine        # Good
FROM nginx:latest               # Bad - unpredictable

# Multi-arch support
FROM --platform=linux/amd64 node:20-alpine`
        },
        {
          name: 'Build Configuration',
          explanation: 'Use .dockerignore to exclude: .git/, node_modules/, target/, *.md, .idea/, .env. Build with docker build -t app:1.0.0 .. Use --build-arg for build-time variables. Multi-platform builds with docker buildx for ARM and AMD64 support. Scan images with docker scan, trivy, or snyk. Enable BuildKit with DOCKER_BUILDKIT=1 for better caching and parallel builds.',
          codeExample: `# .dockerignore file
.git
.gitignore
node_modules
npm-debug.log
target/
*.md
README*
.idea/
.vscode/
*.env
.env*
Dockerfile*
docker-compose*
.dockerignore
coverage/
tests/
__tests__/
*.test.js
*.spec.js

# Build commands
docker build -t myapp:1.0.0 .
docker build -f Dockerfile.prod -t myapp:prod .
docker build --no-cache -t myapp:fresh .

# Build arguments
docker build --build-arg NODE_ENV=production \\
             --build-arg VERSION=1.0.0 \\
             -t myapp:1.0.0 .

# In Dockerfile:
ARG NODE_ENV=development
ARG VERSION
ENV NODE_ENV=\${NODE_ENV}
LABEL version=\${VERSION}

# BuildKit (faster, better caching)
DOCKER_BUILDKIT=1 docker build -t myapp .

# Multi-platform builds
docker buildx create --name multiarch --use
docker buildx build --platform linux/amd64,linux/arm64 \\
    -t myregistry/myapp:1.0.0 --push .

# Security scanning
docker scout cves myapp:latest
trivy image myapp:latest
snyk container test myapp:latest`
        }
      ]
    },
    {
      id: 'docker-compose',
      name: 'Docker Compose',
      icon: '🎼',
      color: '#f59e0b',
      description: 'Define full-stack apps in YAML: services, networks, volumes, and health checks. Single command orchestration (docker-compose up) deploys entire infrastructure. Supports scaling (--scale backend=3) and override configurations for dev/prod.',
      diagram: DockerComposeDiagram,
      details: [
        {
          name: 'Service Configuration',
          explanation: 'Docker Compose defines multi-container apps in docker-compose.yml. Services include image or build context, container_name, environment variables (from .env file with ${VAR:-default}), ports mapping, volumes for data persistence, and healthcheck configuration. Services communicate via Docker DNS using service names. Define depends_on with condition: service_healthy for proper startup order.',
          codeExample: `# docker-compose.yml - Service Configuration
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      args:
        - NODE_ENV=production
    image: myapp-backend:latest
    container_name: myapp-backend
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://postgres:secret@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    env_file:
      - .env
    volumes:
      - ./logs:/app/logs
      - uploads:/app/uploads
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    restart: unless-stopped
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  uploads:`
        },
        {
          name: 'Networks and Volumes',
          explanation: 'Compose automatically creates a default network for all services. Define custom networks with driver: bridge for isolation. Volumes persist data: named volumes (managed by Docker), bind mounts (host paths), and tmpfs (in-memory). Volume syntax: volume-name:/container/path for named, ./host/path:/container for bind mount. Volumes section at root level defines named volumes with driver options.',
          codeExample: `# docker-compose.yml - Networks and Volumes
version: '3.8'

services:
  frontend:
    image: nginx:alpine
    networks:
      - frontend-net
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - static-files:/usr/share/nginx/html:ro

  backend:
    build: ./backend
    networks:
      - frontend-net    # Accessible from frontend
      - backend-net     # Accessible from DB
    volumes:
      - app-data:/app/data          # Named volume
      - ./config:/app/config:ro     # Bind mount (read-only)
      - /app/node_modules           # Anonymous volume

  database:
    image: postgres:15-alpine
    networks:
      - backend-net     # Only accessible from backend
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    tmpfs:
      - /tmp            # In-memory temp storage

networks:
  frontend-net:
    driver: bridge
  backend-net:
    driver: bridge
    internal: true      # No external access

volumes:
  app-data:
    driver: local
  postgres-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /data/postgres
  static-files:`
        },
        {
          name: 'Service Dependencies',
          explanation: 'Use depends_on to control startup order. For health-based dependencies: depends_on: service: condition: service_healthy. Define healthcheck in each service: test command, interval, timeout, retries, start_period. Example: test: ["CMD", "curl", "-f", "http://localhost:8080/health"]. This ensures dependent services wait for healthy dependencies before starting.',
          codeExample: `# docker-compose.yml - Dependencies with Health Checks
version: '3.8'

services:
  app:
    build: .
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
      kafka:
        condition: service_started  # Just wait for start

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    depends_on:
      zookeeper:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "kafka-broker-api-versions", "--bootstrap-server", "localhost:9092"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s

  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    healthcheck:
      test: ["CMD", "nc", "-z", "localhost", "2181"]
      interval: 10s
      timeout: 5s
      retries: 3`
        },
        {
          name: 'Compose Commands',
          explanation: 'Essential commands: docker-compose up -d (start all), docker-compose down (stop and remove), docker-compose down -v (also remove volumes), docker-compose logs -f (follow logs), docker-compose ps (status), docker-compose exec service bash (shell access), docker-compose up -d --build (rebuild), docker-compose up -d --scale backend=3 (scale service), docker-compose config (validate file).',
          codeExample: `# Docker Compose Commands

# Start and stop
docker-compose up                    # Start (attached)
docker-compose up -d                 # Start (detached)
docker-compose up -d --build         # Rebuild and start
docker-compose up -d backend         # Start specific service
docker-compose down                  # Stop and remove containers
docker-compose down -v               # Also remove volumes
docker-compose down --rmi all        # Also remove images

# Status and logs
docker-compose ps                    # List services
docker-compose ps -a                 # Include stopped
docker-compose logs                  # View all logs
docker-compose logs -f backend       # Follow specific service
docker-compose logs --tail 100       # Last 100 lines

# Execute commands
docker-compose exec backend bash     # Shell access
docker-compose exec db psql -U postgres  # Database CLI
docker-compose run --rm backend npm test  # Run one-off command

# Scaling and updates
docker-compose up -d --scale backend=3   # Scale service
docker-compose pull                  # Pull latest images
docker-compose up -d --force-recreate    # Recreate containers

# Configuration
docker-compose config                # Validate and view
docker-compose config --services     # List services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Cleanup
docker-compose rm -f                 # Remove stopped containers
docker-compose images                # List images used`
        },
        {
          name: 'Development Overrides',
          explanation: 'Use docker-compose.override.yml for local development settings. Override build targets, add debug ports, mount source code for hot reload, change environment to dev profile. The override file is automatically applied. Use .env file for environment variables. Logging configuration with driver and options (max-size, max-file) prevents log file growth. Restart policies (unless-stopped) ensure service resilience.',
          codeExample: `# docker-compose.yml (base configuration)
version: '3.8'
services:
  backend:
    image: myapp-backend:latest
    environment:
      - NODE_ENV=production

# docker-compose.override.yml (auto-loaded for development)
version: '3.8'
services:
  backend:
    build:
      context: ./backend
      target: development          # Multi-stage build target
    volumes:
      - ./backend/src:/app/src     # Hot reload
      - /app/node_modules          # Preserve node_modules
    environment:
      - NODE_ENV=development
      - DEBUG=app:*
    ports:
      - "9229:9229"                # Debug port
    command: npm run dev           # Dev command

# .env file
POSTGRES_PASSWORD=devpassword
REDIS_HOST=cache
APP_PORT=3000
LOG_LEVEL=debug

# docker-compose.prod.yml (production overrides)
version: '3.8'
services:
  backend:
    image: myregistry/myapp-backend:\${VERSION:-latest}
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1'
          memory: 512M
    logging:
      driver: json-file
      options:
        max-size: "50m"
        max-file: "5"
    restart: always

# Usage:
# Dev: docker-compose up (auto-loads override)
# Prod: docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`
        }
      ]
    },
    {
      id: 'networking',
      name: 'Docker Networking',
      icon: '🌐',
      color: '#8b5cf6',
      description: 'Five network types (Bridge, Host, Overlay, None, Macvlan) for different isolation levels. DNS service discovery by container name, custom networks for microservice isolation, VXLAN tunnels for multi-host communication with encryption support.',
      diagram: DockerNetworkingDiagram,
      details: [
        {
          name: 'Network Types',
          explanation: 'Bridge (default): Isolated network on single host, containers connected via docker0 bridge. Host: Container shares host network stack directly, no port mapping needed, no isolation. Overlay (Swarm): Multi-host networking using VXLAN tunnels, encrypted option available. None: Completely isolated, no networking. Macvlan: Assigns physical MAC address to container for legacy app compatibility.',
          codeExample: `# Docker Network Types

# Bridge Network (default) - Single host isolation
docker run -d --name app1 --network bridge nginx
docker run -d --name app2 --network bridge nginx
# Containers get private IPs (172.17.x.x)
# Can communicate via IP, not container name

# Host Network - Share host networking stack
docker run -d --name web --network host nginx
# Container uses host's IP directly
# No port mapping needed (--publish ignored)
# No network isolation - use carefully!

# None Network - Complete isolation
docker run -d --name isolated --network none alpine sleep 3600
# No network interfaces (except loopback)
# For security-critical workloads

# Overlay Network (Swarm) - Multi-host
docker network create --driver overlay \\
    --subnet 10.0.0.0/24 \\
    --opt encrypted \\
    my-overlay
# Spans multiple Docker hosts
# Uses VXLAN tunnels
# Optional encryption for secure communication

# Macvlan - Physical network integration
docker network create -d macvlan \\
    --subnet=192.168.1.0/24 \\
    --gateway=192.168.1.1 \\
    -o parent=eth0 \\
    my-macvlan
# Container gets real MAC address
# Appears as physical device on network`
        },
        {
          name: 'Custom Networks',
          explanation: 'Create networks: docker network create my-network. With options: --driver bridge --subnet 172.25.0.0/16 --gateway 172.25.0.1 --dns 8.8.8.8. Connect containers: docker run --network my-network. Connect running container: docker network connect my-network container. Disconnect: docker network disconnect. Inspect: docker network inspect. Remove: docker network rm or prune.',
          codeExample: `# Create Custom Networks

# Simple bridge network
docker network create app-network

# With full configuration
docker network create \\
    --driver bridge \\
    --subnet 172.25.0.0/16 \\
    --ip-range 172.25.1.0/24 \\
    --gateway 172.25.0.1 \\
    --opt com.docker.network.bridge.name=br-app \\
    --label env=production \\
    production-network

# Internal network (no external access)
docker network create --internal backend-only

# Connect containers to networks
docker run -d --name web --network app-network nginx
docker run -d --name api --network app-network node-api

# Connect running container to additional network
docker network connect backend-only api

# Assign static IP
docker run -d --name db \\
    --network app-network \\
    --ip 172.25.1.100 \\
    postgres

# Disconnect from network
docker network disconnect app-network web

# Network management
docker network ls                    # List networks
docker network inspect app-network   # View details
docker network rm app-network        # Remove network
docker network prune                 # Remove unused`
        },
        {
          name: 'Container DNS',
          explanation: 'Containers on the same custom network can communicate using container names as hostnames. Docker provides automatic DNS resolution for service discovery. Example: docker exec app2 ping app1 works when both containers are on the same custom network. This enables microservice communication without hardcoded IPs. Compose services use service names for inter-service communication.',
          codeExample: `# Docker DNS and Service Discovery

# Create network and containers
docker network create myapp
docker run -d --name database --network myapp postgres:15
docker run -d --name backend --network myapp myapp-api
docker run -d --name frontend --network myapp myapp-web

# Containers can reach each other by name
docker exec backend ping database     # Works!
docker exec backend nslookup database # Shows container IP

# DNS resolution within containers
docker exec backend cat /etc/resolv.conf
# nameserver 127.0.0.11 (Docker's embedded DNS)

# Network aliases (multiple names for one container)
docker run -d \\
    --name postgres-primary \\
    --network myapp \\
    --network-alias db \\
    --network-alias database \\
    postgres:15

# Now reachable via: postgres-primary, db, or database

# In docker-compose.yml, services auto-register
services:
  api:
    image: myapp-api
    # Can reach 'database' and 'cache' by name
  database:
    image: postgres:15
  cache:
    image: redis:7

# Custom DNS servers
docker run --dns 8.8.8.8 --dns 8.8.4.4 myapp

# Add extra hosts
docker run --add-host myhost:192.168.1.100 myapp`
        },
        {
          name: 'Port Mapping',
          explanation: 'Publish ports with -p host:container. Examples: -p 8080:80 (map host 8080 to container 80), -p 127.0.0.1:8080:80 (bind specific interface), -p 8080-8090:8080-8090 (range mapping), -P (map all EXPOSE ports randomly). View port mappings with docker port container. Internal services can communicate without port publishing using network DNS.',
          codeExample: `# Port Mapping Options

# Basic port mapping
docker run -d -p 8080:80 nginx
# Host port 8080 -> Container port 80

# Bind to specific interface
docker run -d -p 127.0.0.1:8080:80 nginx
# Only accessible from localhost

docker run -d -p 0.0.0.0:8080:80 nginx
# Accessible from all interfaces (default)

# Map to random host port
docker run -d -p 80 nginx
docker port <container>  # See assigned port

# Publish all exposed ports to random ports
docker run -d -P nginx

# Port ranges
docker run -d -p 8080-8090:8080-8090 myapp

# UDP ports
docker run -d -p 53:53/udp dns-server
docker run -d -p 53:53/tcp -p 53:53/udp dns-server

# Multiple ports
docker run -d \\
    -p 80:80 \\
    -p 443:443 \\
    -p 8080:8080 \\
    nginx

# View port mappings
docker port mycontainer
docker port mycontainer 80/tcp

# In Dockerfile (documentation only)
EXPOSE 80 443
# EXPOSE doesn't publish - just documents

# In docker-compose.yml
ports:
  - "8080:80"            # host:container
  - "127.0.0.1:3000:3000"
  - "9090-9100:9090-9100"`
        },
        {
          name: 'Troubleshooting',
          explanation: 'Inspect container network: docker inspect container | jq ".[0].NetworkSettings". Get container IP: docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" container. Use nicolaka/netshoot for debugging: nslookup, ping, curl, netstat, tcpdump. Common issues: wrong network, port conflicts, DNS resolution. Check docker network ls and container connectivity.',
          codeExample: `# Network Troubleshooting

# Inspect container networking
docker inspect mycontainer | jq '.[0].NetworkSettings'

# Get container IP address
docker inspect -f \\
    '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' \\
    mycontainer

# Get all network info
docker inspect -f \\
    '{{json .NetworkSettings.Networks}}' mycontainer | jq

# Debug with netshoot container
docker run -it --rm \\
    --network container:mycontainer \\
    nicolaka/netshoot

# Inside netshoot:
ip addr                  # Network interfaces
nslookup database        # DNS resolution
ping database            # Connectivity test
curl http://api:8080     # HTTP test
netstat -tuln            # Listening ports
tcpdump -i eth0          # Packet capture
ss -tuln                 # Socket statistics

# Connect to same network for debugging
docker run -it --rm \\
    --network mynetwork \\
    nicolaka/netshoot bash

# Check iptables rules (host)
sudo iptables -L -n -t nat | grep DOCKER

# Common issues and fixes
# 1. Container not reachable
docker network ls                    # Check network exists
docker network inspect mynetwork     # Check container attached

# 2. DNS not resolving
docker exec mycontainer cat /etc/resolv.conf
docker exec mycontainer nslookup target-container

# 3. Port already in use
lsof -i :8080                       # Find process using port
docker ps --format '{{.Ports}}'     # Check Docker ports`
        }
      ]
    },
    {
      id: 'volumes',
      name: 'Docker Volumes',
      icon: '💾',
      color: '#ec4899',
      description: 'Four storage types: Named volumes (Docker-managed, portable), Bind mounts (host paths), tmpfs (in-memory, fast), and cloud drivers (NFS/EBS/Azure). Persist data beyond container lifecycle with backup-friendly operations.',
      diagram: DockerVolumesDiagram,
      details: [
        {
          name: 'Volume Types',
          explanation: 'Named Volumes: Docker-managed storage at /var/lib/docker/volumes, portable and backup-friendly. Bind Mounts: Direct host filesystem mapping (/host:/container), useful for development. tmpfs Mounts: In-memory temporary storage, fast I/O, secure (no disk writes), non-persistent. Volume Drivers: Cloud storage integration (NFS, AWS EBS, Azure Disk, GCE PD) for distributed storage.',
          codeExample: `# Docker Volume Types

# 1. Named Volumes (Docker-managed)
docker volume create app-data
docker run -v app-data:/app/data myapp
# Stored at /var/lib/docker/volumes/app-data/_data
# Portable, backup-friendly, managed by Docker

# 2. Bind Mounts (Host path)
docker run -v /host/path:/container/path myapp
docker run -v $(pwd)/config:/app/config myapp
# Direct access to host filesystem
# Great for development (hot reload)

# 3. tmpfs Mounts (In-memory)
docker run --tmpfs /app/temp myapp
docker run --mount type=tmpfs,destination=/app/temp,tmpfs-size=100m myapp
# Fast I/O, secure (no disk writes)
# Data lost when container stops

# 4. Volume with NFS driver
docker volume create \\
    --driver local \\
    --opt type=nfs \\
    --opt o=addr=192.168.1.100,rw \\
    --opt device=:/path/to/share \\
    nfs-volume

# 5. AWS EBS volume (with plugin)
docker volume create \\
    --driver rexray/ebs \\
    --opt size=100 \\
    --opt volumeType=gp3 \\
    ebs-volume

# Long-form --mount syntax (more explicit)
docker run --mount \\
    type=volume,\\
    source=app-data,\\
    target=/app/data,\\
    readonly \\
    myapp`
        },
        {
          name: 'Volume Commands',
          explanation: 'Create: docker volume create my-data. List: docker volume ls. Inspect: docker volume inspect my-data. Use in container: -v my-data:/app/data or --mount source=my-data,target=/app/data. Anonymous volume: -v /app/data (auto-generated name). Bind mount: -v /host/path:/container/path or -v $(pwd):/app. Read-only: -v my-data:/app/data:ro. Remove: docker volume rm or prune.',
          codeExample: `# Volume Management Commands

# Create volumes
docker volume create my-data
docker volume create --label env=prod prod-data

# List volumes
docker volume ls
docker volume ls --filter "label=env=prod"
docker volume ls --filter "dangling=true"

# Inspect volume
docker volume inspect my-data
docker volume inspect -f '{{.Mountpoint}}' my-data

# Use volumes in containers
# Short syntax
docker run -v my-data:/app/data myapp
docker run -v $(pwd):/app myapp                  # Bind mount
docker run -v /app/temp myapp                    # Anonymous

# Long syntax (--mount) - more explicit
docker run --mount \\
    type=volume,\\
    source=my-data,\\
    target=/app/data \\
    myapp

docker run --mount \\
    type=bind,\\
    source=$(pwd)/config,\\
    target=/app/config,\\
    readonly \\
    myapp

# Read-only volumes
docker run -v my-data:/app/data:ro myapp
docker run --mount source=my-data,target=/app,readonly myapp

# Remove volumes
docker volume rm my-data
docker volume rm $(docker volume ls -q)          # Remove all
docker volume prune                              # Remove unused
docker volume prune -f --filter "label!=keep"   # With filter`
        },
        {
          name: 'Volume Sharing',
          explanation: 'Share volumes between containers: run multiple containers with same -v my-data:/data. Changes in one container are immediately visible in others. Use for shared configuration, data exchange, or coordination. Example: docker run -d --name app1 -v shared:/data alpine and docker run -d --name app2 -v shared:/data alpine. Use read-only mounts (:ro) for containers that should not modify data.',
          codeExample: `# Sharing Volumes Between Containers

# Create shared volume
docker volume create shared-data

# Multiple containers using same volume
docker run -d --name writer \\
    -v shared-data:/data \\
    alpine sh -c "while true; do date >> /data/log.txt; sleep 5; done"

docker run -d --name reader \\
    -v shared-data:/data:ro \\
    alpine tail -f /data/log.txt

# Writer writes, reader sees updates immediately

# docker-compose.yml - Shared volumes
version: '3.8'
services:
  app:
    image: myapp
    volumes:
      - shared-config:/app/config:ro
      - shared-data:/app/data

  worker:
    image: myapp-worker
    volumes:
      - shared-data:/data

  admin:
    image: myapp-admin
    volumes:
      - shared-config:/config      # Read-write for admin

volumes:
  shared-config:
  shared-data:

# Volume from another container (legacy)
docker run -d --name data-container -v /data alpine
docker run --volumes-from data-container myapp

# Copy volume data between containers
docker run --rm \\
    -v source-vol:/source:ro \\
    -v dest-vol:/dest \\
    alpine cp -a /source/. /dest/`
        },
        {
          name: 'Backup and Restore',
          explanation: 'Backup volume: docker run --rm -v my-data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data . This mounts both the volume and a host directory, then creates a compressed archive. Restore: docker run --rm -v my-data:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /data. Copy files with docker cp container:/path ./local.',
          codeExample: `# Volume Backup and Restore

# Backup volume to tar archive
docker run --rm \\
    -v my-data:/data:ro \\
    -v $(pwd):/backup \\
    alpine tar czf /backup/my-data-backup.tar.gz -C /data .

# Backup with timestamp
BACKUP_FILE="my-data-$(date +%Y%m%d-%H%M%S).tar.gz"
docker run --rm \\
    -v my-data:/data:ro \\
    -v $(pwd)/backups:/backup \\
    alpine tar czf /backup/$BACKUP_FILE -C /data .

# Restore volume from backup
docker volume create my-data-restored
docker run --rm \\
    -v my-data-restored:/data \\
    -v $(pwd):/backup:ro \\
    alpine tar xzf /backup/my-data-backup.tar.gz -C /data

# Copy files to/from volumes using temp container
# Copy from volume to host
docker run --rm -v my-data:/data -v $(pwd):/host alpine \\
    cp -r /data/. /host/backup/

# Copy from host to volume
docker run --rm -v my-data:/data -v $(pwd)/files:/host:ro alpine \\
    cp -r /host/. /data/

# Using docker cp with running container
docker cp mycontainer:/app/data ./local-backup/
docker cp ./local-files/. mycontainer:/app/data/

# Backup script example
#!/bin/bash
VOLUMES=$(docker volume ls -q)
BACKUP_DIR="/backups/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

for vol in $VOLUMES; do
    docker run --rm -v $vol:/data:ro -v $BACKUP_DIR:/backup \\
        alpine tar czf /backup/$vol.tar.gz -C /data .
    echo "Backed up: $vol"
done`
        },
        {
          name: 'Database Persistence',
          explanation: 'Database containers require volumes for data persistence. Example: docker run -d --name postgres -v postgres-data:/var/lib/postgresql/data postgres:15. Data survives container removal - just create new container with same volume. In Compose, define volumes section with driver options. Access volume location: docker volume inspect | jq ".[0].Mountpoint". Usually at /var/lib/docker/volumes/name/_data.',
          codeExample: `# Database Persistence with Volumes

# PostgreSQL
docker volume create postgres-data
docker run -d \\
    --name postgres \\
    -e POSTGRES_PASSWORD=secret \\
    -e POSTGRES_DB=myapp \\
    -v postgres-data:/var/lib/postgresql/data \\
    -v ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro \\
    postgres:15-alpine

# MySQL
docker volume create mysql-data
docker run -d \\
    --name mysql \\
    -e MYSQL_ROOT_PASSWORD=secret \\
    -e MYSQL_DATABASE=myapp \\
    -v mysql-data:/var/lib/mysql \\
    -v ./mysql-conf:/etc/mysql/conf.d:ro \\
    mysql:8

# MongoDB
docker volume create mongo-data
docker run -d \\
    --name mongo \\
    -v mongo-data:/data/db \\
    -v mongo-config:/data/configdb \\
    mongo:7

# Redis with persistence
docker volume create redis-data
docker run -d \\
    --name redis \\
    -v redis-data:/data \\
    redis:7-alpine redis-server --appendonly yes

# docker-compose.yml for databases
version: '3.8'
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres-data:
    driver: local

# Check volume location
docker volume inspect postgres-data -f '{{.Mountpoint}}'
# /var/lib/docker/volumes/postgres-data/_data`
        }
      ]
    },
    {
      id: 'security',
      name: 'Security Best Practices',
      icon: '🔒',
      color: '#ef4444',
      description: 'Defense-in-depth: Image security (minimal base, Trivy scanning), runtime hardening (non-root, read-only fs, dropped capabilities), secrets management (HashiCorp Vault), and network policies. Reduces attack surface by 95% with AppArmor/SELinux/Seccomp.',
      diagram: DockerSecurityDiagram,
      details: [
        {
          name: 'Image Security',
          explanation: 'Use minimal base images (alpine, distroless) to reduce attack surface. Scan images regularly with Trivy, Snyk, or Grype for vulnerabilities. Enable Docker Content Trust for image signing: export DOCKER_CONTENT_TRUST=1. Never store secrets in image layers or Dockerfile. Keep base images updated. Use multi-stage builds to exclude build tools from final image.',
          codeExample: `# Image Security Best Practices

# 1. Use minimal base images
FROM gcr.io/distroless/java17-debian12  # No shell, minimal
FROM alpine:3.19                         # 7MB, security-focused
FROM scratch                             # Empty, for static binaries

# 2. Scan images for vulnerabilities
trivy image myapp:latest
trivy image --severity HIGH,CRITICAL myapp:latest
trivy image --exit-code 1 myapp:latest   # Fail CI on findings

# Grype scanner
grype myapp:latest

# Docker Scout (Docker Desktop)
docker scout cves myapp:latest
docker scout recommendations myapp:latest

# 3. Enable Content Trust (image signing)
export DOCKER_CONTENT_TRUST=1
docker pull nginx:latest    # Only pulls signed images
docker push myapp:latest    # Signs on push

# 4. Never store secrets in images
# BAD - secrets in layer history
RUN echo "password" > /app/secret
ENV API_KEY=sk-12345

# GOOD - use runtime secrets
# docker run -e API_KEY=$API_KEY myapp
# docker run --secret id=api_key myapp

# 5. Pin image versions
FROM nginx:1.25.3-alpine   # Good - specific version
FROM nginx:latest          # Bad - unpredictable

# 6. CI/CD security scanning
# .github/workflows/security.yml
- name: Scan image
  run: |
    trivy image --exit-code 1 --severity HIGH,CRITICAL myapp:latest`
        },
        {
          name: 'Runtime Security',
          explanation: 'Run as non-root: --user 1001:1001. Read-only filesystem: --read-only with --tmpfs /tmp for writable temp. Drop capabilities: --cap-drop=ALL then add only needed: --cap-add=NET_BIND_SERVICE. Prevent privilege escalation: --security-opt=no-new-privileges. These settings minimize damage if container is compromised.',
          codeExample: `# Runtime Security Configuration

# Run as non-root user
docker run --user 1001:1001 myapp
docker run --user nobody:nogroup myapp

# Read-only filesystem with writable temp
docker run \\
    --read-only \\
    --tmpfs /tmp \\
    --tmpfs /app/cache \\
    myapp

# Drop all capabilities, add only needed
docker run \\
    --cap-drop=ALL \\
    --cap-add=NET_BIND_SERVICE \\
    --cap-add=CHOWN \\
    myapp

# Common capabilities to consider:
# NET_BIND_SERVICE - Bind to ports < 1024
# CHOWN           - Change file ownership
# SETUID/SETGID   - Change user/group IDs
# SYS_PTRACE      - For debugging (avoid in prod)

# Prevent privilege escalation
docker run --security-opt=no-new-privileges myapp

# Full hardened container
docker run -d \\
    --name secure-app \\
    --user 1001:1001 \\
    --read-only \\
    --tmpfs /tmp:rw,noexec,nosuid \\
    --cap-drop=ALL \\
    --security-opt=no-new-privileges \\
    --security-opt=apparmor=docker-default \\
    --pids-limit=100 \\
    --memory=512m \\
    --cpus=1 \\
    myapp

# In Dockerfile
USER 1001:1001
# Or create specific user:
RUN addgroup -g 1001 app && adduser -D -u 1001 -G app appuser
USER appuser`
        },
        {
          name: 'Resource Limits',
          explanation: 'Prevent DoS with resource limits: --memory="512m" --memory-swap="512m" (memory), --cpus="1" (CPU), --pids-limit=100 (process limit), --ulimit nofile=1024:1024 (file descriptors). In Compose, use deploy.resources.limits. These prevent runaway containers from affecting host or other containers. Monitor with docker stats.',
          codeExample: `# Resource Limits and Constraints

# Memory limits
docker run \\
    --memory=512m \\              # Hard limit
    --memory-swap=512m \\         # Same as memory = no swap
    --memory-reservation=256m \\  # Soft limit
    --oom-kill-disable=false \\   # Allow OOM kill (safer)
    myapp

# CPU limits
docker run \\
    --cpus=1.5 \\                 # 1.5 CPU cores
    --cpu-shares=512 \\           # Relative weight (default 1024)
    --cpuset-cpus="0,1" \\        # Pin to specific CPUs
    myapp

# Process limits (prevent fork bombs)
docker run --pids-limit=100 myapp

# File descriptor limits
docker run --ulimit nofile=1024:2048 myapp  # soft:hard

# Full resource constraints
docker run -d \\
    --name constrained-app \\
    --memory=512m \\
    --memory-swap=512m \\
    --cpus=1 \\
    --pids-limit=100 \\
    --ulimit nofile=1024:2048 \\
    myapp

# docker-compose.yml resource limits
services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M

# Monitor resource usage
docker stats
docker stats --no-stream --format "table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}"`
        },
        {
          name: 'Network Security',
          explanation: 'Use custom networks for service isolation. Create internal networks: --internal flag prevents external access. Enable overlay encryption: --opt encrypted. Avoid --network host in production. Limit published ports to necessary services. Use network policies in orchestration. Consider service mesh for advanced traffic control and mTLS.',
          codeExample: `# Network Security Configuration

# Create isolated internal network (no external access)
docker network create --internal backend-network

# Encrypted overlay network (Swarm)
docker network create \\
    --driver overlay \\
    --opt encrypted \\
    secure-overlay

# Minimal port exposure
docker run -d \\
    -p 127.0.0.1:8080:8080 \\    # Localhost only
    myapp

# NEVER use host network in production
# docker run --network host myapp  # Avoid!

# docker-compose.yml - Network isolation
version: '3.8'
services:
  frontend:
    image: nginx
    networks:
      - frontend-net
    ports:
      - "443:443"              # Only frontend exposed

  backend:
    image: myapp-api
    networks:
      - frontend-net           # Reachable from frontend
      - backend-net           # Reachable from DB
    # No ports exposed to host

  database:
    image: postgres:15
    networks:
      - backend-net           # Only backend can reach
    # No ports exposed to host

networks:
  frontend-net:
    driver: bridge
  backend-net:
    driver: bridge
    internal: true            # No external access

# Block inter-container communication on bridge
docker network create --opt com.docker.network.bridge.enable_icc=false isolated

# Firewall rules (host level)
# Allow only specific ports
iptables -A DOCKER-USER -p tcp --dport 8080 -j ACCEPT
iptables -A DOCKER-USER -j DROP`
        },
        {
          name: 'Secrets Management',
          explanation: 'Never use environment variables or Dockerfile for secrets. Use Docker Secrets (Swarm): docker secret create and --secret flag. Integrate with HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault. Secrets are mounted as files in /run/secrets/. For Compose without Swarm, use external secret references. Run Docker Bench Security for compliance auditing.',
          codeExample: `# Secrets Management

# NEVER do this
ENV DATABASE_PASSWORD=secret123    # Visible in image layers!
docker run -e API_KEY=sk-12345 myapp  # Visible in ps output

# Docker Secrets (Swarm mode)
echo "my-secret-password" | docker secret create db_password -
docker secret create api_key ./api_key.txt

docker service create \\
    --name myapp \\
    --secret db_password \\
    --secret api_key \\
    myapp

# In container, secrets available at /run/secrets/
cat /run/secrets/db_password

# Application code to read secret
# Java
String password = Files.readString(Path.of("/run/secrets/db_password"));

# Python
with open('/run/secrets/db_password') as f:
    password = f.read().strip()

# docker-compose.yml with secrets
version: '3.8'
services:
  app:
    image: myapp
    secrets:
      - db_password
      - api_key
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    external: true  # Pre-created secret

# HashiCorp Vault integration
# Install vault agent sidecar or use init container
docker run -d \\
    -e VAULT_ADDR=https://vault:8200 \\
    -e VAULT_TOKEN=\${VAULT_TOKEN} \\
    myapp-with-vault

# AWS Secrets Manager
# Use IAM role + SDK in application
# Or use secrets-init wrapper`
        },
        {
          name: 'Security Auditing',
          explanation: 'Run Docker Bench Security for CIS benchmark compliance. Use AppArmor or SELinux profiles: --security-opt apparmor=docker-default. Enable Seccomp profiles to restrict system calls. Monitor container activity with docker events. Implement logging and centralized log analysis. Regular security scanning in CI/CD pipeline with exit-code 1 on HIGH/CRITICAL findings.',
          codeExample: `# Security Auditing and Compliance

# Run Docker Bench Security (CIS benchmark)
docker run -it --rm \\
    --net host --pid host \\
    --cap-add audit_control \\
    -v /var/lib:/var/lib:ro \\
    -v /var/run/docker.sock:/var/run/docker.sock:ro \\
    -v /etc:/etc:ro \\
    docker/docker-bench-security

# AppArmor profile
docker run --security-opt apparmor=docker-default myapp

# Custom AppArmor profile
docker run --security-opt apparmor=my-custom-profile myapp

# SELinux (RHEL/CentOS)
docker run --security-opt label=type:container_t myapp

# Seccomp profile (restrict syscalls)
docker run --security-opt seccomp=/path/to/profile.json myapp

# Default seccomp profile blocks ~44 syscalls
# View default: docker info --format '{{.SecurityOptions}}'

# Custom seccomp profile example (seccomp.json)
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "architectures": ["SCMP_ARCH_X86_64"],
  "syscalls": [
    {"names": ["read", "write", "exit"], "action": "SCMP_ACT_ALLOW"}
  ]
}

# Monitor container events
docker events
docker events --filter 'type=container'
docker events --filter 'event=start' --filter 'event=die'

# Audit logging
# /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "5",
    "labels": "production_status",
    "env": "os,customer"
  }
}

# CI/CD security pipeline
# .gitlab-ci.yml
security_scan:
  script:
    - trivy image --exit-code 1 --severity CRITICAL $IMAGE
    - docker run docker/docker-bench-security`
        }
      ]
    },
    {
      id: 'optimization',
      name: 'Image Optimization',
      icon: '⚡',
      color: '#06b6d4',
      description: 'Multi-stage builds reduce 1.2GB images to 120MB (90% reduction). Layer caching, Alpine/distroless base images (7MB vs 77MB), and BuildKit parallel builds. Faster pulls, deploys, and reduced registry costs by 10x.',
      diagram: ImageOptimizationDiagram,
      details: [
        {
          name: 'Size Reduction',
          explanation: 'Unoptimized images can be 1.2GB+. Multi-stage builds separate build dependencies from runtime, reducing to ~180MB. Alpine base images are 7MB vs 77MB for Ubuntu. Distroless images are 2MB with no shell. Scratch images (0MB) work for statically compiled binaries. Combined optimizations achieve 90% size reduction: faster pulls, deploys, and reduced attack surface.',
          codeExample: `# Image Size Reduction Techniques

# Before: 1.2GB (Ubuntu + JDK + Maven + source)
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y openjdk-17-jdk maven
COPY . /app
RUN mvn package
CMD ["java", "-jar", "/app/target/app.jar"]

# After: 120MB (Multi-stage + Alpine + JRE only)
# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
COPY --from=builder /app/target/*.jar app.jar
CMD ["java", "-jar", "app.jar"]

# Base image size comparison:
# ubuntu:22.04        ~77MB
# debian:slim         ~80MB
# alpine:3.19         ~7MB
# distroless/java17   ~2MB + JRE
# scratch             0MB

# Check image size
docker images myapp
docker history myapp:latest

# Analyze layers with dive
dive myapp:latest

# Size comparison
docker images --format "{{.Repository}}:{{.Tag}} {{.Size}}"

# Image size reduction results:
# Unoptimized:    1.2GB
# Multi-stage:    250MB (-80%)
# + Alpine:       180MB (-85%)
# + JRE only:     120MB (-90%)`
        },
        {
          name: 'Layer Caching',
          explanation: 'Order instructions from least to most frequently changed. Copy dependency files before source: COPY package*.json ./ then RUN npm ci. This caches dependencies between code changes. Combine RUN commands: apt-get update && install && clean in one layer. Use .dockerignore to exclude .git, node_modules, target, logs, IDE files. Smaller context = faster builds.',
          codeExample: `# Layer Caching Optimization

# BAD - cache invalidated on any code change
FROM node:20-alpine
WORKDIR /app
COPY . .                    # Copies everything
RUN npm install             # Re-runs on ANY change
CMD ["npm", "start"]

# GOOD - dependency cache preserved
FROM node:20-alpine
WORKDIR /app

# 1. Copy dependency files first (rarely change)
COPY package.json package-lock.json ./

# 2. Install dependencies (cached if package*.json unchanged)
RUN npm ci --only=production

# 3. Copy application code (frequently changes)
COPY . .

CMD ["npm", "start"]

# Combine commands to reduce layers
# BAD - 3 layers, intermediate files persist
RUN apt-get update
RUN apt-get install -y curl git
RUN rm -rf /var/lib/apt/lists/*

# GOOD - 1 layer, cleanup in same layer
RUN apt-get update && \\
    apt-get install -y --no-install-recommends curl git && \\
    rm -rf /var/lib/apt/lists/*

# .dockerignore (reduce build context)
.git
.gitignore
node_modules
npm-debug.log
target/
*.md
.idea/
.vscode/
*.env
coverage/
tests/
__tests__/

# Check build context size
docker build . 2>&1 | head -1
# Sending build context to Docker daemon  2.5MB

# Clear build cache
docker builder prune`
        },
        {
          name: 'Spring Boot Optimization',
          explanation: 'Use layered JAR format: java -Djarmode=layertools -jar app.jar extract. Copy layers separately in Dockerfile: dependencies, spring-boot-loader, snapshot-dependencies, application. This maximizes cache reuse - dependencies rarely change. Use JRE-only base image (eclipse-temurin:17-jre-alpine). Consider GraalVM native image for even smaller footprint.',
          codeExample: `# Spring Boot Layered JAR Optimization

# Enable layered JAR in pom.xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <layers>
                    <enabled>true</enabled>
                </layers>
            </configuration>
        </plugin>
    </plugins>
</build>

# Dockerfile with layered JAR
FROM eclipse-temurin:17-jre-alpine AS builder
WORKDIR /app
COPY target/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy layers separately (most stable first)
COPY --from=builder /app/dependencies/ ./
COPY --from=builder /app/spring-boot-loader/ ./
COPY --from=builder /app/snapshot-dependencies/ ./
COPY --from=builder /app/application/ ./

USER 1001:1001
EXPOSE 8080

ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]

# Layer order (most stable -> least stable):
# 1. dependencies       - External libs (rarely change)
# 2. spring-boot-loader - Boot infrastructure
# 3. snapshot-deps      - SNAPSHOT dependencies
# 4. application        - Your code (changes often)

# GraalVM Native Image (even smaller, faster startup)
FROM ghcr.io/graalvm/native-image:22 AS builder
COPY target/*.jar app.jar
RUN native-image -jar app.jar -o app

FROM gcr.io/distroless/base
COPY --from=builder /app/app /app
ENTRYPOINT ["/app"]
# Result: ~80MB, starts in ~50ms vs ~2s`
        },
        {
          name: 'Node.js Optimization',
          explanation: 'Use npm ci --only=production for reproducible installs without devDependencies. Clean npm cache: npm cache clean --force. Multi-stage build: build in full node image, run in alpine. For static sites, build with node then serve with nginx:alpine. Copy only dist/build folder and production node_modules to final stage. Use .dockerignore for node_modules, coverage, .env.',
          codeExample: `# Node.js Optimized Dockerfile

# Multi-stage for Node.js API
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci                           # Install all deps for build
COPY . .
RUN npm run build                    # TypeScript/Webpack build

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && \\   # Production deps only
    npm cache clean --force          # Clean cache
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]

# For static sites (React/Vue/Angular) - even smaller
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build                    # Creates dist/ folder

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
# Result: ~25MB (nginx:alpine + static files)

# .dockerignore for Node.js
node_modules
npm-debug.log
.git
.gitignore
coverage
.nyc_output
.env*
*.md
tests/
__tests__/
.vscode/
.idea/

# Image size comparison:
# node:20           ~1GB
# node:20-slim      ~200MB
# node:20-alpine    ~180MB
# nginx:alpine      ~25MB (for static sites)`
        },
        {
          name: 'BuildKit Features',
          explanation: 'Enable BuildKit: DOCKER_BUILDKIT=1. Cache mounts for dependencies: RUN --mount=type=cache,target=/root/.m2 mvn package. Parallel multi-stage builds (automatic). Use --cache-from for CI/CD caching. Inline cache: --build-arg BUILDKIT_INLINE_CACHE=1 then push to registry. Analyze images with dive tool or docker history --no-trunc.',
          codeExample: `# BuildKit Advanced Features

# Enable BuildKit
export DOCKER_BUILDKIT=1
docker build -t myapp .

# Or in daemon.json
{
  "features": { "buildkit": true }
}

# Cache mount for Maven (persistent across builds)
# syntax=docker/dockerfile:1.4
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 \\
    mvn dependency:go-offline
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 \\
    mvn package -DskipTests

# Cache mount for npm
RUN --mount=type=cache,target=/root/.npm \\
    npm ci --only=production

# Cache mount for apt
RUN --mount=type=cache,target=/var/cache/apt \\
    apt-get update && apt-get install -y curl

# Secret mount (never stored in layers)
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \\
    npm ci
# Build with: docker build --secret id=npmrc,src=.npmrc .

# CI/CD cache with registry
docker build \\
    --cache-from myregistry/myapp:cache \\
    --build-arg BUILDKIT_INLINE_CACHE=1 \\
    -t myapp:latest .
docker push myregistry/myapp:cache

# Parallel multi-stage builds (automatic with BuildKit)
FROM node:20 AS frontend-builder
# ... builds in parallel with:
FROM maven:3.9 AS backend-builder

# Analyze image with dive
dive myapp:latest
# Shows layer efficiency, wasted space, potential improvements

# View layer details
docker history --no-trunc myapp:latest

# BuildKit build output
docker build --progress=plain -t myapp .`
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
      stack.push({ name: 'Docker', icon: '🐳', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Docker', icon: '🐳' })
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
          <h1 style={titleStyle}>Docker</h1>
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
          onMainMenu={breadcrumb?.onMainMenu}
          colors={DOCKER_COLORS}
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
              colors={DOCKER_COLORS}
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
                  {detail.codeExample && (
                    <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ padding: '1rem', margin: 0, borderRadius: '0.5rem', fontSize: '0.8rem', border: '1px solid #334155', background: '#0f172a' }} codeTagProps={{ style: { background: 'transparent' } }}>{detail.codeExample}</SyntaxHighlighter>
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

export default Docker

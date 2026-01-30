/**
 * Azure Cloud Services Page
 *
 * Comprehensive overview of Microsoft Azure services organized by category.
 * Features interactive diagrams, modal-based navigation, and detailed service information.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * Azure brand colors for UI elements
 */
const AZURE_COLORS = {
  primary: '#0078D4',           // Azure blue
  primaryHover: '#50E6FF',      // Azure light blue
  bg: 'rgba(0, 120, 212, 0.1)', // Background with transparency
  border: 'rgba(0, 120, 212, 0.3)', // Border color
  arrow: '#0078D4',             // Arrow/indicator color
  hoverBg: 'rgba(0, 120, 212, 0.2)', // Hover background
  topicBg: 'rgba(0, 120, 212, 0.15)'  // Topic card background
}

/**
 * Alternating colors for service detail explanations
 */
const SUBTOPIC_COLORS = [
  { bg: 'rgba(0, 120, 212, 0.15)', border: 'rgba(0, 120, 212, 0.3)' },      // azure blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

/**
 * Azure Compute Services Architecture
 */
const ComputeDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-compute" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0078D4" />
      </marker>
      <linearGradient id="grad-vm" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#0078D4', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: '#005A9E', stopOpacity: 0.8 }} />
      </linearGradient>
      <linearGradient id="grad-functions" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FDB515', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: '#D68E00', stopOpacity: 0.8 }} />
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Azure Compute Services Architecture
    </text>

    {/* Virtual Machines */}
    <rect x="50" y="70" width="140" height="140" rx="8" fill="url(#grad-vm)" stroke="#50E6FF" strokeWidth="2"/>
    <text x="120" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Virtual Machines</text>
    <text x="120" y="115" textAnchor="middle" fill="#E0E0E0" fontSize="9">IaaS</text>
    <line x1="60" y1="125" x2="180" y2="125" stroke="#50E6FF" strokeWidth="1"/>
    <text x="70" y="140" fill="#E0E0E0" fontSize="8">• 700+ VM Sizes</text>
    <text x="70" y="155" fill="#E0E0E0" fontSize="8">• Availability Zones</text>
    <text x="70" y="170" fill="#E0E0E0" fontSize="8">• Scale Sets</text>
    <text x="70" y="185" fill="#E0E0E0" fontSize="8">• Spot VMs</text>
    <text x="70" y="200" fill="#10b981" fontSize="8" fontWeight="bold">$0.0104/hr</text>

    {/* Azure Functions */}
    <rect x="240" y="70" width="140" height="140" rx="8" fill="url(#grad-functions)" stroke="#FDB515" strokeWidth="2"/>
    <text x="310" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Azure Functions</text>
    <text x="310" y="115" textAnchor="middle" fill="#E0E0E0" fontSize="9">Serverless</text>
    <line x1="250" y1="125" x2="370" y2="125" stroke="#FDB515" strokeWidth="1"/>
    <text x="260" y="140" fill="#E0E0E0" fontSize="8">• Event-driven</text>
    <text x="260" y="155" fill="#E0E0E0" fontSize="8">• Auto-scaling</text>
    <text x="260" y="170" fill="#E0E0E0" fontSize="8">• Pay per execution</text>
    <text x="260" y="185" fill="#E0E0E0" fontSize="8">• Durable Functions</text>
    <text x="260" y="200" fill="#10b981" fontSize="8" fontWeight="bold">1M free/month</text>

    {/* App Service */}
    <rect x="430" y="70" width="140" height="140" rx="8" fill="rgba(34, 197, 94, 0.6)" stroke="#22c55e" strokeWidth="2"/>
    <text x="500" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">App Service</text>
    <text x="500" y="115" textAnchor="middle" fill="#E0E0E0" fontSize="9">PaaS</text>
    <line x1="440" y1="125" x2="560" y2="125" stroke="#22c55e" strokeWidth="1"/>
    <text x="450" y="140" fill="#E0E0E0" fontSize="8">• Web Apps</text>
    <text x="450" y="155" fill="#E0E0E0" fontSize="8">• Built-in CI/CD</text>
    <text x="450" y="170" fill="#E0E0E0" fontSize="8">• Auto Scaling</text>
    <text x="450" y="185" fill="#E0E0E0" fontSize="8">• Deployment Slots</text>
    <text x="450" y="200" fill="#10b981" fontSize="8" fontWeight="bold">Free tier available</text>

    {/* Container Apps */}
    <rect x="620" y="70" width="140" height="140" rx="8" fill="rgba(139, 92, 246, 0.6)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="690" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Container Apps</text>
    <text x="690" y="115" textAnchor="middle" fill="#E0E0E0" fontSize="9">Serverless Containers</text>
    <line x1="630" y1="125" x2="750" y2="125" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="640" y="140" fill="#E0E0E0" fontSize="8">• Scale to Zero</text>
    <text x="640" y="155" fill="#E0E0E0" fontSize="8">• KEDA Autoscaling</text>
    <text x="640" y="170" fill="#E0E0E0" fontSize="8">• Dapr Integration</text>
    <text x="640" y="185" fill="#E0E0E0" fontSize="8">• Traffic Splitting</text>
    <text x="640" y="200" fill="#10b981" fontSize="8" fontWeight="bold">180K vCPU-sec free</text>

    {/* Arrows showing relationships */}
    <line x1="190" y1="140" x2="235" y2="140" stroke="#0078D4" strokeWidth="2" markerEnd="url(#arrow-compute)"/>
    <text x="212" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">migrate</text>
    <line x1="380" y1="140" x2="425" y2="140" stroke="#0078D4" strokeWidth="2" markerEnd="url(#arrow-compute)"/>
    <text x="402" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">host</text>
    <line x1="570" y1="140" x2="615" y2="140" stroke="#0078D4" strokeWidth="2" markerEnd="url(#arrow-compute)"/>
    <text x="592" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">containerize</text>
  </svg>
)

/**
 * Azure Storage Services Diagram
 */
const StorageDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-storage" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0078D4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">{`
      Azure Storage Tiers & Lifecycle
    `}</text>

    {/* Hot Tier */}
    <rect x="80" y="70" width="160" height="100" rx="8" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" strokeWidth="2"/>
    <text x="160" y="95" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Hot Tier</text>
    <text x="160" y="115" textAnchor="middle" fill="#E0E0E0" fontSize="9">Frequently accessed</text>
    <text x="160" y="135" textAnchor="middle" fill="#E0E0E0" fontSize="9">Highest storage cost</text>
    <text x="160" y="150" textAnchor="middle" fill="#E0E0E0" fontSize="9">Lowest access cost</text>
    <text x="160" y="165" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">$0.0184/GB</text>

    {/* Cool Tier */}
    <rect x="280" y="70" width="160" height="100" rx="8" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="360" y="95" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Cool Tier</text>
    <text x="360" y="115" textAnchor="middle" fill="#E0E0E0" fontSize="9">Infrequently accessed</text>
    <text x="360" y="135" textAnchor="middle" fill="#E0E0E0" fontSize="9">30-day minimum</text>
    <text x="360" y="150" textAnchor="middle" fill="#E0E0E0" fontSize="9">Lower storage cost</text>
    <text x="360" y="165" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">$0.01/GB</text>

    {/* Archive Tier */}
    <rect x="480" y="70" width="160" height="100" rx="8" fill="rgba(6, 182, 212, 0.4)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="560" y="95" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Archive Tier</text>
    <text x="560" y="115" textAnchor="middle" fill="#E0E0E0" fontSize="9">Rarely accessed</text>
    <text x="560" y="135" textAnchor="middle" fill="#E0E0E0" fontSize="9">180-day minimum</text>
    <text x="560" y="150" textAnchor="middle" fill="#E0E0E0" fontSize="9">Lowest cost</text>
    <text x="560" y="165" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">$0.00099/GB</text>

    {/* Lifecycle arrows */}
    <line x1="240" y1="120" x2="275" y2="120" stroke="#0078D4" strokeWidth="2" markerEnd="url(#arrow-storage)"/>
    <text x="257" y="110" textAnchor="middle" fill="#94a3b8" fontSize="8">30 days</text>
    <line x1="440" y1="120" x2="475" y2="120" stroke="#0078D4" strokeWidth="2" markerEnd="url(#arrow-storage)"/>
    <text x="457" y="110" textAnchor="middle" fill="#94a3b8" fontSize="8">90 days</text>

    {/* Lifecycle Management label */}
    <text x="360" y="200" textAnchor="middle" fill="#94a3b8" fontSize="11" fontStyle="italic">
      Automatic Lifecycle Management Policies
    </text>
  </svg>
)

/**
 * Azure Database Services Diagram
 */
const DatabaseDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-db" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0078D4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Azure Database Portfolio
    </text>

    {/* Relational Databases */}
    <rect x="50" y="60" width="200" height="180" rx="8" fill="rgba(0, 120, 212, 0.2)" stroke="#0078D4" strokeWidth="2"/>
    <text x="150" y="85" textAnchor="middle" fill="#0078D4" fontSize="13" fontWeight="bold">Relational</text>

    {/* SQL Database */}
    <rect x="70" y="95" width="160" height="50" rx="6" fill="rgba(0, 120, 212, 0.4)" stroke="#0078D4" strokeWidth="1.5"/>
    <text x="150" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Azure SQL Database</text>
    <text x="150" y="130" textAnchor="middle" fill="#E0E0E0" fontSize="8">PaaS • Auto-tuning</text>

    {/* PostgreSQL */}
    <rect x="70" y="155" width="160" height="35" rx="6" fill="rgba(0, 120, 212, 0.3)" stroke="#0078D4" strokeWidth="1.5"/>
    <text x="150" y="175" textAnchor="middle" fill="white" fontSize="10">PostgreSQL / MySQL</text>

    {/* Redis Cache */}
    <rect x="70" y="200" width="160" height="30" rx="6" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="150" y="220" textAnchor="middle" fill="white" fontSize="10">Redis Cache</text>

    {/* NoSQL Databases */}
    <rect x="300" y="60" width="200" height="180" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">NoSQL</text>

    {/* Cosmos DB */}
    <rect x="320" y="95" width="160" height="65" rx="6" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="400" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Cosmos DB</text>
    <text x="400" y="130" textAnchor="middle" fill="#E0E0E0" fontSize="8">Multi-model • Global</text>
    <text x="400" y="145" textAnchor="middle" fill="#E0E0E0" fontSize="8">SQL, MongoDB, Cassandra</text>

    {/* Table Storage */}
    <rect x="320" y="170" width="160" height="30" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="400" y="190" textAnchor="middle" fill="white" fontSize="10">Table Storage</text>

    {/* Queue Storage */}
    <rect x="320" y="210" width="160" height="20" rx="6" fill="rgba(34, 197, 94, 0.25)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="400" y="223" textAnchor="middle" fill="white" fontSize="9">Queue Storage</text>

    {/* Analytics */}
    <rect x="550" y="60" width="200" height="180" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="650" y="85" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">Analytics</text>

    {/* Synapse */}
    <rect x="570" y="95" width="160" height="55" rx="6" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="650" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Synapse Analytics</text>
    <text x="650" y="130" textAnchor="middle" fill="#E0E0E0" fontSize="8">Data Warehouse + Big Data</text>

    {/* Data Factory */}
    <rect x="570" y="160" width="160" height="35" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="650" y="180" textAnchor="middle" fill="white" fontSize="10">Data Factory</text>

    {/* Data Lake */}
    <rect x="570" y="205" width="160" height="25" rx="6" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="650" y="221" textAnchor="middle" fill="white" fontSize="9">Data Lake Storage</text>

    {/* Arrows showing data flow */}
    <line x1="250" y1="150" x2="295" y2="150" stroke="#0078D4" strokeWidth="2" markerEnd="url(#arrow-db)"/>
    <line x1="500" y1="150" x2="545" y2="150" stroke="#0078D4" strokeWidth="2" markerEnd="url(#arrow-db)"/>
    <text x="273" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">sync</text>
    <text x="522" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">analyze</text>
  </svg>
)

/**
 * Azure Kubernetes Service (AKS) Architecture
 */
const AKSDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-aks" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#326CE5" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Azure Kubernetes Service (AKS) Architecture
    </text>

    {/* Control Plane */}
    <rect x="50" y="60" width="700" height="60" rx="8" fill="rgba(50, 108, 229, 0.2)" stroke="#326CE5" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="#326CE5" fontSize="13" fontWeight="bold">Control Plane (Free - Managed by Azure)</text>
    <text x="200" y="105" textAnchor="middle" fill="#E0E0E0" fontSize="9">API Server</text>
    <text x="340" y="105" textAnchor="middle" fill="#E0E0E0" fontSize="9">Scheduler</text>
    <text x="460" y="105" textAnchor="middle" fill="#E0E0E0" fontSize="9">Controller Manager</text>
    <text x="620" y="105" textAnchor="middle" fill="#E0E0E0" fontSize="9">etcd</text>

    {/* Node Pools */}
    <text x="400" y="155" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
      Worker Nodes (Agent Nodes - You Pay)
    </text>

    {/* System Node Pool */}
    <rect x="80" y="175" width="180" height="100" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="170" y="195" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">System Node Pool</text>
    <rect x="95" y="205" width="50" height="55" rx="4" fill="rgba(34, 197, 94, 0.5)" stroke="#22c55e" strokeWidth="1"/>
    <text x="120" y="225" textAnchor="middle" fill="white" fontSize="8">Node</text>
    <text x="120" y="240" textAnchor="middle" fill="#E0E0E0" fontSize="7">CoreDNS</text>
    <text x="120" y="252" textAnchor="middle" fill="#E0E0E0" fontSize="7">Metrics</text>
    <rect x="155" y="205" width="50" height="55" rx="4" fill="rgba(34, 197, 94, 0.5)" stroke="#22c55e" strokeWidth="1"/>
    <text x="180" y="225" textAnchor="middle" fill="white" fontSize="8">Node</text>
    <text x="180" y="240" textAnchor="middle" fill="#E0E0E0" fontSize="7">System</text>
    <text x="180" y="252" textAnchor="middle" fill="#E0E0E0" fontSize="7">Pods</text>
    <rect x="215" y="205" width="35" height="55" rx="4" fill="rgba(34, 197, 94, 0.5)" stroke="#22c55e" strokeWidth="1"/>
    <text x="232" y="235" textAnchor="middle" fill="white" fontSize="7">Node</text>

    {/* User Node Pool */}
    <rect x="300" y="175" width="180" height="100" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="390" y="195" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">User Node Pool</text>
    <rect x="315" y="205" width="50" height="55" rx="4" fill="rgba(59, 130, 246, 0.5)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="340" y="225" textAnchor="middle" fill="white" fontSize="8">Node</text>
    <text x="340" y="240" textAnchor="middle" fill="#E0E0E0" fontSize="7">App</text>
    <text x="340" y="252" textAnchor="middle" fill="#E0E0E0" fontSize="7">Pods</text>
    <rect x="375" y="205" width="50" height="55" rx="4" fill="rgba(59, 130, 246, 0.5)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="400" y="225" textAnchor="middle" fill="white" fontSize="8">Node</text>
    <text x="400" y="240" textAnchor="middle" fill="#E0E0E0" fontSize="7">App</text>
    <text x="400" y="252" textAnchor="middle" fill="#E0E0E0" fontSize="7">Pods</text>
    <rect x="435" y="205" width="35" height="55" rx="4" fill="rgba(59, 130, 246, 0.5)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="452" y="235" textAnchor="middle" fill="white" fontSize="7">Node</text>

    {/* Virtual Nodes (ACI) */}
    <rect x="520" y="175" width="180" height="100" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="610" y="195" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">Virtual Nodes (ACI)</text>
    <text x="610" y="215" textAnchor="middle" fill="#E0E0E0" fontSize="9">Serverless burst capacity</text>
    <rect x="535" y="225" width="70" height="40" rx="4" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4,2"/>
    <text x="570" y="245" textAnchor="middle" fill="white" fontSize="8">Burst</text>
    <text x="570" y="258" textAnchor="middle" fill="#E0E0E0" fontSize="7">Pods</text>
    <rect x="615" y="225" width="70" height="40" rx="4" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4,2"/>
    <text x="650" y="245" textAnchor="middle" fill="white" fontSize="8">Elastic</text>
    <text x="650" y="258" textAnchor="middle" fill="#E0E0E0" fontSize="7">Scale</text>

    {/* Arrows from control plane */}
    <line x1="170" y1="120" x2="170" y2="170" stroke="#326CE5" strokeWidth="2" markerEnd="url(#arrow-aks)"/>
    <line x1="390" y1="120" x2="390" y2="170" stroke="#326CE5" strokeWidth="2" markerEnd="url(#arrow-aks)"/>
    <line x1="610" y1="120" x2="610" y2="170" stroke="#326CE5" strokeWidth="2" markerEnd="url(#arrow-aks)"/>
  </svg>
)

/**
 * Azure Integration Services Diagram
 */
const IntegrationDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-int" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0078D4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">{`
      Azure Integration & Messaging Services
    `}</text>

    {/* Event-Driven Architecture */}
    <text x="400" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11" fontStyle="italic">
      Event-Driven Architecture
    </text>

    {/* Event Grid */}
    <rect x="80" y="75" width="170" height="80" rx="8" fill="rgba(0, 120, 212, 0.3)" stroke="#0078D4" strokeWidth="2"/>
    <text x="165" y="100" textAnchor="middle" fill="#0078D4" fontSize="12" fontWeight="bold">Event Grid</text>
    <text x="165" y="118" textAnchor="middle" fill="#E0E0E0" fontSize="8">Publish-Subscribe</text>
    <text x="165" y="133" textAnchor="middle" fill="#E0E0E0" fontSize="8">CloudEvents Schema</text>
    <text x="165" y="148" textAnchor="middle" fill="#10b981" fontSize="8">100K ops free/month</text>

    {/* Service Bus */}
    <rect x="290" y="75" width="170" height="80" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="375" y="100" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Service Bus</text>
    <text x="375" y="118" textAnchor="middle" fill="#E0E0E0" fontSize="8">Enterprise Messaging</text>
    <text x="375" y="133" textAnchor="middle" fill="#E0E0E0" fontSize="8">FIFO • Transactions</text>
    <text x="375" y="148" textAnchor="middle" fill="#10b981" fontSize="8">Premium w/ VNet</text>

    {/* Logic Apps */}
    <rect x="500" y="75" width="170" height="80" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="585" y="100" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Logic Apps</text>
    <text x="585" y="118" textAnchor="middle" fill="#E0E0E0" fontSize="8">Workflow Automation</text>
    <text x="585" y="133" textAnchor="middle" fill="#E0E0E0" fontSize="8">400+ Connectors</text>
    <text x="585" y="148" textAnchor="middle" fill="#10b981" fontSize="8">Visual Designer</text>

    {/* API Management */}
    <rect x="185" y="180" width="390" height="80" rx="8" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="380" y="205" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">API Management</text>
    <text x="380" y="223" textAnchor="middle" fill="#E0E0E0" fontSize="8">Full API Lifecycle • Developer Portal • Policy Transformations</text>
    <text x="380" y="238" textAnchor="middle" fill="#E0E0E0" fontSize="8">OAuth 2.0 • Rate Limiting • Caching • Self-Hosted Gateway</text>
    <text x="380" y="253" textAnchor="middle" fill="#10b981" fontSize="8">Consumption tier available</text>

    {/* Arrows showing integration flow */}
    <line x1="165" y1="155" x2="165" y2="175" stroke="#0078D4" strokeWidth="2" markerEnd="url(#arrow-int)"/>
    <line x1="375" y1="155" x2="375" y2="175" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-int)"/>
    <line x1="585" y1="155" x2="585" y2="175" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-int)"/>

    <text x="165" y="170" textAnchor="middle" fill="#94a3b8" fontSize="7">events</text>
    <text x="375" y="170" textAnchor="middle" fill="#94a3b8" fontSize="7">messages</text>
    <text x="585" y="170" textAnchor="middle" fill="#94a3b8" fontSize="7">workflows</text>
  </svg>
)

/**
 * Azure Networking & Security Diagram
 */
const NetworkingDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-net" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0078D4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">{`
      Azure Networking & Security Architecture
    `}</text>

    {/* Internet */}
    <ellipse cx="400" cy="70" rx="60" ry="25" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Internet</text>

    {/* Front Door */}
    <rect x="300" y="115" width="200" height="50" rx="8" fill="rgba(0, 120, 212, 0.3)" stroke="#0078D4" strokeWidth="2"/>
    <text x="400" y="135" textAnchor="middle" fill="#0078D4" fontSize="12" fontWeight="bold">Azure Front Door</text>
    <text x="400" y="150" textAnchor="middle" fill="#E0E0E0" fontSize="8">Global Load Balancer • WAF • SSL Offload • CDN</text>

    {/* Azure AD */}
    <rect x="550" y="115" width="180" height="50" rx="8" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="640" y="135" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Azure AD</text>
    <text x="640" y="150" textAnchor="middle" fill="#E0E0E0" fontSize="8">Identity • SSO • MFA</text>

    {/* Virtual Network */}
    <rect x="100" y="190" width="600" height="55" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="210" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Virtual Network (VNet)</text>

    {/* Subnets */}
    <rect x="120" y="220" width="140" height="18" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="190" y="232" textAnchor="middle" fill="white" fontSize="8">App Subnet</text>

    <rect x="280" y="220" width="140" height="18" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="350" y="232" textAnchor="middle" fill="white" fontSize="8">DB Subnet</text>

    <rect x="440" y="220" width="140" height="18" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="510" y="232" textAnchor="middle" fill="white" fontSize="8">Gateway Subnet</text>

    <rect x="600" y="220" width="80" height="18" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1"/>
    <text x="640" y="232" textAnchor="middle" fill="white" fontSize="8">Private</text>

    {/* Arrows */}
    <line x1="400" y1="95" x2="400" y2="110" stroke="#0078D4" strokeWidth="2" markerEnd="url(#arrow-net)"/>
    <line x1="400" y1="165" x2="400" y2="185" stroke="#0078D4" strokeWidth="2" markerEnd="url(#arrow-net)"/>
    <line x1="640" y1="165" x2="640" y2="215" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-net)"/>
    <text x="660" y="190" fill="#94a3b8" fontSize="7">auth</text>
  </svg>
)

/**
 * Azure Analytics & Data Factory Pipeline
 */
const AnalyticsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-analytics" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Azure Analytics Pipeline
    </text>

    {/* Data Sources */}
    <text x="100" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Data Sources</text>
    <rect x="50" y="80" width="100" height="30" rx="6" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1.5"/>
    <text x="100" y="100" textAnchor="middle" fill="#E0E0E0" fontSize="9">Databases</text>
    <rect x="50" y="120" width="100" height="30" rx="6" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1.5"/>
    <text x="100" y="140" textAnchor="middle" fill="#E0E0E0" fontSize="9">Files/Logs</text>

    {/* Data Factory */}
    <rect x="200" y="80" width="140" height="70" rx="8" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="270" y="105" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Data Factory</text>
    <text x="270" y="120" textAnchor="middle" fill="#E0E0E0" fontSize="8">ETL Pipeline</text>
    <text x="270" y="133" textAnchor="middle" fill="#E0E0E0" fontSize="8">90+ Connectors</text>
    <text x="270" y="146" textAnchor="middle" fill="#E0E0E0" fontSize="8">Mapping Flows</text>

    {/* Data Lake */}
    <rect x="390" y="80" width="140" height="70" rx="8" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="460" y="105" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Data Lake Gen2</text>
    <text x="460" y="120" textAnchor="middle" fill="#E0E0E0" fontSize="8">Hierarchical Storage</text>
    <text x="460" y="133" textAnchor="middle" fill="#E0E0E0" fontSize="8">Big Data Analytics</text>
    <text x="460" y="146" textAnchor="middle" fill="#E0E0E0" fontSize="8">HDFS Compatible</text>

    {/* Synapse Analytics */}
    <rect x="580" y="80" width="160" height="70" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="660" y="100" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">Synapse Analytics</text>
    <text x="660" y="115" textAnchor="middle" fill="#E0E0E0" fontSize="8">Serverless SQL Pool</text>
    <text x="660" y="128" textAnchor="middle" fill="#E0E0E0" fontSize="8">Apache Spark Pools</text>
    <text x="660" y="141" textAnchor="middle" fill="#E0E0E0" fontSize="8">Data Warehouse</text>

    {/* Outputs */}
    <text x="660" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Insights</text>
    <rect x="610" y="190" width="100" height="20" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="660" y="204" textAnchor="middle" fill="#E0E0E0" fontSize="8">Power BI</text>

    {/* Arrows */}
    <line x1="150" y1="105" x2="195" y2="105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-analytics)"/>
    <line x1="150" y1="135" x2="195" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-analytics)"/>
    <line x1="340" y1="115" x2="385" y2="115" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-analytics)"/>
    <line x1="530" y1="115" x2="575" y2="115" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-analytics)"/>
    <line x1="660" y1="150" x2="660" y2="185" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-analytics)"/>

    <text x="172" y="100" textAnchor="middle" fill="#94a3b8" fontSize="7">extract</text>
    <text x="362" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">store</text>
    <text x="552" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">analyze</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Azure({ onBack, breadcrumb }) {
  // State for modal navigation
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
      color: '#0078D4',
      description: 'Scalable computing resources from virtual machines to serverless functions, supporting diverse workloads with flexible deployment options.',
      diagram: ComputeDiagram,
      details: [
        {
          name: 'Virtual Machines',
          diagram: ComputeDiagram,
          explanation: 'Azure Virtual Machines provide the flexibility of virtualization without the overhead of physical hardware. Choose from 700+ VM sizes across general purpose, compute optimized, memory optimized, storage optimized, GPU, and HPC categories. Features Azure Hybrid Benefit for Windows Server and SQL Server licenses, Availability Zones for high availability, VM Scale Sets for auto-scaling, and Spot VMs offering up to 90% discount for interruptible workloads.',
          codeExample: `# Azure CLI - Create a VM
az vm create \\
  --resource-group myResourceGroup \\
  --name myVM \\
  --image UbuntuLTS \\
  --size Standard_B2s \\
  --admin-username azureuser \\
  --generate-ssh-keys \\
  --public-ip-sku Standard \\
  --zone 1

# PowerShell - Create VM Scale Set
New-AzVmss \\
  -ResourceGroupName "myResourceGroup" \\
  -Location "EastUS" \\
  -VMScaleSetName "myScaleSet" \\
  -VirtualNetworkName "myVnet" \\
  -SubnetName "mySubnet" \\
  -PublicIpAddressName "myPublicIP" \\
  -LoadBalancerName "myLoadBalancer" \\
  -UpgradePolicyMode "Automatic"`
        },
        {
          name: 'Azure Functions',
          explanation: 'Azure Functions executes code in response to triggers including HTTP requests, timers, queue messages, and database changes. Supports C#, Java, JavaScript, TypeScript, Python, and PowerShell. Durable Functions provides stateful workflows with orchestration capabilities. Premium plan offers VNet integration, unlimited execution time, and pre-warmed instances. KEDA-based scaling ensures responsive auto-scaling based on event sources.',
          codeExample: `// JavaScript - HTTP Trigger Function
module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request.');

    const name = req.query.name || (req.body && req.body.name);
    const responseMessage = name
        ? "Hello, " + name + "!"
        : "Please pass a name on the query string or in the request body";

    context.res = {
        status: 200,
        body: responseMessage
    };
};

// C# - Durable Functions Orchestrator
[FunctionName("OrderProcessingOrchestrator")]
public static async Task<object> RunOrchestrator(
    [OrchestrationTrigger] IDurableOrchestrationContext context)
{
    var orderId = context.GetInput<string>();

    await context.CallActivityAsync("ValidateOrder", orderId);
    await context.CallActivityAsync("ProcessPayment", orderId);
    await context.CallActivityAsync("ShipOrder", orderId);

    return new { status = "completed", orderId };
}`
        },
        {
          name: 'App Service',
          explanation: 'Azure App Service enables you to build and host web apps, mobile backends, and RESTful APIs in the language of your choice. Supports .NET, Java, Node.js, Python, PHP, and containers. Built-in authentication with Azure AD, Google, Facebook. Autoscaling based on metrics or schedule. Deployment slots enable blue-green deployments with zero downtime. Integrated with Azure DevOps, GitHub Actions, and BitBucket for CI/CD.',
          codeExample: `# Deploy Node.js app to App Service
az webapp up \\
  --name myUniqueAppName \\
  --resource-group myResourceGroup \\
  --runtime "NODE|18-lts" \\
  --sku B1

# Configure deployment slots for staging
az webapp deployment slot create \\
  --name myUniqueAppName \\
  --resource-group myResourceGroup \\
  --slot staging

# Swap staging to production
az webapp deployment slot swap \\
  --name myUniqueAppName \\
  --resource-group myResourceGroup \\
  --slot staging \\
  --target-slot production`
        },
        {
          name: 'Container Apps',
          explanation: 'Azure Container Apps runs microservices and containerized applications on a serverless platform built on Kubernetes. Features scale to zero capability to minimize costs, KEDA-based autoscaling for event-driven workloads, integrated Dapr for microservices patterns, and revision management with traffic splitting for progressive rollouts. Supports both HTTP and event-driven workloads with built-in ingress and service discovery.',
          codeExample: `# Deploy container app
az containerapp create \\
  --name mycontainerapp \\
  --resource-group myResourceGroup \\
  --environment myEnvironment \\
  --image myacr.azurecr.io/myapp:latest \\
  --target-port 8080 \\
  --ingress external \\
  --min-replicas 0 \\
  --max-replicas 10 \\
  --cpu 0.5 \\
  --memory 1.0Gi

# Configure traffic splitting between revisions
az containerapp ingress traffic set \\
  --name mycontainerapp \\
  --resource-group myResourceGroup \\
  --revision-weight myapp--rev1=80 myapp--rev2=20`
        }
      ]
    },
    {
      id: 'storage',
      name: 'Storage Services',
      icon: '📦',
      color: '#3b82f6',
      description: 'Massively scalable object storage with intelligent tiering, lifecycle management, and Data Lake capabilities for unstructured data.',
      diagram: StorageDiagram,
      details: [
        {
          name: 'Blob Storage',
          diagram: StorageDiagram,
          explanation: 'Azure Blob Storage is optimized for storing massive amounts of unstructured data including text and binary data. Supports hot, cool, and archive access tiers with automatic lifecycle management to optimize costs. Data Lake Storage Gen2 combines file system semantics with Blob storage scale and pricing. Features immutable storage for WORM (Write Once, Read Many) compliance, change feed for tracking modifications, and blob versioning for data protection.',
          codeExample: `// C# - Upload blob with lifecycle management
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

var connectionString = "DefaultEndpointsProtocol=https;...";
var containerClient = new BlobContainerClient(connectionString, "mycontainer");

// Upload blob
var blobClient = containerClient.GetBlobClient("myblob.txt");
await blobClient.UploadAsync("data.txt", new BlobUploadOptions
{
    AccessTier = AccessTier.Hot,
    Metadata = new Dictionary<string, string>
    {
        { "category", "documents" },
        { "uploaded", DateTime.UtcNow.ToString() }
    }
});

// Configure lifecycle management policy
var policy = new BlobManagementPolicy
{
    Rules = {
        new BlobManagementPolicyRule
        {
            Name = "moveToArchive",
            Definition = new BlobManagementPolicyDefinition
            {
                Actions = new BlobManagementPolicyAction
                {
                    BaseBlob = new BlobManagementPolicyBaseBlob
                    {
                        TierToArchive = new DateAfterModification { DaysAfterModificationGreaterThan = 90 }
                    }
                }
            }
        }
    }
};`
        },
        {
          name: 'Storage Tiers',
          explanation: 'Azure Storage offers three access tiers to optimize costs: Hot tier for frequently accessed data with highest storage cost but lowest access cost ($0.0184/GB); Cool tier for infrequently accessed data stored for at least 30 days with lower storage cost ($0.01/GB); and Archive tier for rarely accessed data stored for at least 180 days with lowest cost ($0.00099/GB) but higher retrieval costs and latency. Lifecycle management policies automate tier transitions based on age and access patterns.',
          codeExample: `# Azure CLI - Set blob tier
az storage blob set-tier \\
  --account-name mystorageaccount \\
  --container-name mycontainer \\
  --name myblob.txt \\
  --tier Cool

# PowerShell - Configure lifecycle policy
$rule1 = New-AzStorageAccountManagementPolicyRule \\
  -Name moveToArchive \\
  -Action @{BaseBlob = @{TierToArchive = @{DaysAfterModificationGreaterThan = 90}}} \\
  -Filter @{BlobTypes = @("blockBlob"); PrefixMatch = @("logs/")}

Set-AzStorageAccountManagementPolicy \\
  -ResourceGroupName myResourceGroup \\
  -StorageAccountName mystorageaccount \\
  -Rule $rule1`
        },
        {
          name: 'Data Lake Gen2',
          explanation: 'Azure Data Lake Storage Gen2 converges the capabilities of Azure Data Lake Storage Gen1 with Azure Blob Storage. It provides a hierarchical namespace that dramatically improves the performance of big data analytics workloads, while maintaining the scale and cost benefits of Blob Storage. HDFS-compatible APIs enable seamless integration with Apache Hadoop, Spark, and other big data frameworks. Features ACL-based security at file and directory level.',
          codeExample: `# Python - Access Data Lake with hierarchical namespace
from azure.storage.filedatalake import DataLakeServiceClient

service_client = DataLakeServiceClient(
    account_url="https://myaccount.dfs.core.windows.net",
    credential=credential
)

# Create file system and directories
file_system_client = service_client.create_file_system("analytics")
directory_client = file_system_client.create_directory("data/2024")

# Upload file
file_client = directory_client.get_file_client("sales.csv")
with open("sales.csv", "rb") as data:
    file_client.upload_data(data, overwrite=True)

# Set ACL for directory
acl = "user::rwx,group::r-x,other::---"
directory_client.set_access_control(acl=acl)`
        }
      ]
    },
    {
      id: 'database',
      name: 'Database Services',
      icon: '🗄️',
      color: '#22c55e',
      description: 'Comprehensive database portfolio from intelligent SQL databases to globally distributed NoSQL, with AI-powered optimization and built-in security.',
      diagram: DatabaseDiagram,
      details: [
        {
          name: 'Azure SQL Database',
          diagram: DatabaseDiagram,
          explanation: 'Azure SQL Database is a fully managed PaaS database engine with 99.99% SLA, providing AI-powered automatic tuning, threat detection, and vulnerability assessments. Hyperscale tier supports up to 100TB databases with instant backups. Serverless compute tier auto-pauses during inactivity to save costs. Features active geo-replication for disaster recovery, temporal tables for historical data, and columnstore indexes for analytics. Built-in intelligent query processing and automatic plan correction.',
          codeExample: `-- Enable automatic tuning
ALTER DATABASE SCOPED CONFIGURATION SET AUTOMATIC_TUNING = AUTO;

-- Create temporal table for audit history
CREATE TABLE dbo.Employee
(
    EmployeeID int NOT NULL PRIMARY KEY CLUSTERED,
    Name nvarchar(100) NOT NULL,
    Position nvarchar(100) NOT NULL,
    Department nvarchar(100) NOT NULL,
    Salary decimal(10,2) NOT NULL,
    ValidFrom datetime2 GENERATED ALWAYS AS ROW START,
    ValidTo datetime2 GENERATED ALWAYS AS ROW END,
    PERIOD FOR SYSTEM_TIME (ValidFrom, ValidTo)
)
WITH (SYSTEM_VERSIONING = ON);

-- Geo-replication setup (Azure CLI)
az sql db replica create \\
  --name myDatabase \\
  --resource-group myResourceGroup \\
  --server myPrimaryServer \\
  --partner-server mySecondaryServer \\
  --partner-resource-group mySecondaryResourceGroup`
        },
        {
          name: 'Cosmos DB',
          explanation: 'Azure Cosmos DB is Microsoft\'s globally distributed, multi-model NoSQL database with turnkey global distribution across any number of Azure regions. Offers industry-leading SLAs for latency (<10ms reads/writes at P99), throughput, consistency, and availability (99.999%). Supports multiple data models through APIs: SQL (document), MongoDB, Cassandra, Gremlin (graph), and Table. Five consistency levels from strong to eventual. Serverless and autoscale provisioning models available.',
          codeExample: `// Node.js - Cosmos DB SQL API
const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({
  endpoint: "https://mycosmosdb.documents.azure.com:443/",
  key: process.env.COSMOS_KEY
});

const database = client.database("OrdersDB");
const container = database.container("Orders");

// Create item with partition key
await container.items.create({
  id: "order-123",
  customerId: "customer-456",
  orderDate: new Date().toISOString(),
  items: [
    { productId: "prod-1", quantity: 2, price: 29.99 }
  ],
  total: 59.98
});

// Query with automatic indexing
const querySpec = {
  query: "SELECT * FROM c WHERE c.customerId = @customerId",
  parameters: [{ name: "@customerId", value: "customer-456" }]
};
const { resources } = await container.items.query(querySpec).fetchAll();`
        },
        {
          name: 'Redis Cache',
          explanation: 'Azure Cache for Redis provides fully managed Redis with enterprise features including OSS Redis, Redis Enterprise, and Redis Enterprise Flash tiers. Supports active geo-replication across regions for global applications, zone redundancy for 99.99% availability, and Redis modules (RedisJSON, RedisBloom, RedisTimeSeries, RedisSearch). Premium tier offers VNet integration, persistence, and clustering. Perfect for session caching, content caching, real-time analytics, and message queuing.',
          codeExample: `// C# - StackExchange.Redis client
using StackExchange.Redis;

var redis = ConnectionMultiplexer.Connect(
    "mycache.redis.cache.windows.net:6380," +
    "password=myPassword," +
    "ssl=true," +
    "abortConnect=false"
);
var db = redis.GetDatabase();

// Cache user session
await db.StringSetAsync("session:user123",
    JsonSerializer.Serialize(userSession),
    TimeSpan.FromMinutes(30));

// Pub/Sub for real-time updates
var subscriber = redis.GetSubscriber();
await subscriber.SubscribeAsync("notifications", (channel, message) => {
    Console.WriteLine($"Received: {message}");
});

// Sorted set for leaderboard
await db.SortedSetAddAsync("leaderboard", "player1", 1250);
var topPlayers = await db.SortedSetRangeByRankAsync(
    "leaderboard", 0, 9, Order.Descending);`
        }
      ]
    },
    {
      id: 'containers',
      name: 'Container Services',
      icon: '☸️',
      color: '#8b5cf6',
      description: 'Managed Kubernetes service and serverless containers with simplified deployment, GitOps integration, and elastic scaling capabilities.',
      diagram: AKSDiagram,
      details: [
        {
          name: 'Azure Kubernetes Service',
          diagram: AKSDiagram,
          explanation: 'Azure Kubernetes Service (AKS) simplifies deploying managed Kubernetes clusters with free control plane management. Integrated with Azure DevOps for CI/CD pipelines, Azure Active Directory for RBAC, and Azure Monitor for comprehensive observability. Features Virtual Nodes for burst scaling using Azure Container Instances, Azure Policy integration for governance, and GitOps with Flux for declarative cluster management. Supports Windows and Linux node pools, confidential computing, and KEDA for event-driven autoscaling.',
          codeExample: `# Create AKS cluster with system and user node pools
az aks create \\
  --resource-group myResourceGroup \\
  --name myAKSCluster \\
  --node-count 3 \\
  --node-vm-size Standard_D2s_v3 \\
  --enable-managed-identity \\
  --enable-addons monitoring \\
  --enable-azure-rbac \\
  --network-plugin azure \\
  --zones 1 2 3

# Add user node pool for applications
az aks nodepool add \\
  --resource-group myResourceGroup \\
  --cluster-name myAKSCluster \\
  --name userpool \\
  --node-count 2 \\
  --node-vm-size Standard_D4s_v3 \\
  --mode User

# Enable virtual nodes for burst capacity
az aks enable-addons \\
  --resource-group myResourceGroup \\
  --name myAKSCluster \\
  --addons virtual-node \\
  --subnet-name myVirtualNodeSubnet`
        },
        {
          name: 'AKS Advanced Features',
          explanation: 'AKS offers advanced capabilities including Azure CNI networking for VNet integration, Azure Policy for policy-based governance, and GitOps with Flux for automated cluster configuration. KEDA enables Kubernetes-based event-driven autoscaling from external sources like Azure Service Bus, Event Hubs, or custom metrics. Confidential computing nodes provide hardware-based trusted execution environments. Azure Monitor Container Insights provides deep visibility into cluster and container performance.',
          codeExample: `# Install GitOps Flux extension
az k8s-extension create \\
  --resource-group myResourceGroup \\
  --cluster-name myAKSCluster \\
  --cluster-type managedClusters \\
  --extension-type microsoft.flux \\
  --name flux

# Create Flux configuration
az k8s-configuration flux create \\
  --resource-group myResourceGroup \\
  --cluster-name myAKSCluster \\
  --cluster-type managedClusters \\
  --name my-gitops \\
  --url https://github.com/myorg/myrepo \\
  --branch main \\
  --kustomization name=apps path=./apps prune=true

# KEDA autoscaling based on Azure Service Bus
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: servicebus-scaler
spec:
  scaleTargetRef:
    name: message-processor
  triggers:
  - type: azure-servicebus
    metadata:
      queueName: orders
      messageCount: "5"`
        },
        {
          name: 'Container Instances',
          explanation: 'Azure Container Instances (ACI) provides the fastest and simplest way to run containers without managing servers. Perfect for batch jobs, task automation, and burst workloads from AKS via Virtual Nodes. Billed per second with support for both Linux and Windows containers. Features container groups for multi-container deployments, persistent volume mounts, and virtual network injection for secure connectivity.',
          codeExample: `# Deploy container instance
az container create \\
  --resource-group myResourceGroup \\
  --name mycontainer \\
  --image mcr.microsoft.com/azuredocs/aci-helloworld \\
  --cpu 1 \\
  --memory 1 \\
  --port 80 \\
  --dns-name-label myuniquedns \\
  --restart-policy OnFailure

# Container group with multiple containers
apiVersion: 2021-09-01
location: eastus
name: myContainerGroup
properties:
  containers:
  - name: app
    properties:
      image: myapp:latest
      resources:
        requests:
          cpu: 1.0
          memoryInGB: 1.5
  - name: sidecar
    properties:
      image: nginx:latest
      resources:
        requests:
          cpu: 0.5
          memoryInGB: 0.5`
        }
      ]
    },
    {
      id: 'integration',
      name: 'Integration & Messaging',
      icon: '📨',
      color: '#f59e0b',
      description: 'Enterprise messaging, event routing, and workflow automation with Service Bus, Event Grid, Logic Apps, and API Management.',
      diagram: IntegrationDiagram,
      details: [
        {
          name: 'Service Bus',
          diagram: IntegrationDiagram,
          explanation: 'Azure Service Bus is a fully managed enterprise message broker with message queues and publish-subscribe topics. Supports advanced messaging patterns including FIFO delivery guarantees, message sessions for ordered processing, dead-lettering for failed messages, scheduled delivery, duplicate detection, and distributed transactions. Premium tier offers dedicated resources, VNet integration, and higher throughput. Perfect for decoupling applications, order processing, and reliable message delivery.',
          codeExample: `// C# - Service Bus sender and receiver
using Azure.Messaging.ServiceBus;

var client = new ServiceBusClient(connectionString);
var sender = client.CreateSender("orders");

// Send message with properties
var message = new ServiceBusMessage(BinaryData.FromString("Order data"))
{
    MessageId = Guid.NewGuid().ToString(),
    SessionId = "customer-123", // For ordered processing
    TimeToLive = TimeSpan.FromHours(24),
    ApplicationProperties = {
        { "priority", "high" },
        { "orderType", "express" }
    }
};
await sender.SendMessageAsync(message);

// Receive and complete message
var receiver = client.CreateReceiver("orders");
ServiceBusReceivedMessage received = await receiver.ReceiveMessageAsync();
await receiver.CompleteMessageAsync(received);

// Dead letter failed messages
await receiver.DeadLetterMessageAsync(received,
    "Processing failed", "Invalid format");`
        },
        {
          name: 'Event Grid',
          explanation: 'Azure Event Grid simplifies event-based applications with reliable event delivery at massive scale (10 million events/sec). Built-in events from Azure services including Blob Storage, Resource Groups, Event Hubs, and IoT Hub. Advanced filtering routes events to different endpoints based on event type, subject, or custom properties. CloudEvents 1.0 schema support for interoperability. Sub-second delivery latency with automatic retry and dead-lettering for failed deliveries.',
          codeExample: `// Node.js - Event Grid publisher
const { EventGridPublisherClient, AzureKeyCredential } = require("@azure/eventgrid");

const client = new EventGridPublisherClient(
  endpoint,
  "EventGrid",
  new AzureKeyCredential(key)
);

const events = [{
  eventType: "Orders.NewOrder",
  subject: "orders/12345",
  dataVersion: "1.0",
  data: {
    orderId: "12345",
    customerId: "customer-456",
    amount: 99.99,
    status: "pending"
  }
}];

await client.send(events);

// Azure Function - Event Grid trigger
module.exports = async function (context, eventGridEvent) {
    context.log('Event Grid trigger:', eventGridEvent);

    if (eventGridEvent.eventType === 'Microsoft.Storage.BlobCreated') {
        const blobUrl = eventGridEvent.data.url;
        // Process new blob
    }
};`
        },
        {
          name: 'Logic Apps',
          explanation: 'Azure Logic Apps automates workflows and integrates apps, data, services, and systems with 400+ pre-built connectors for SaaS applications, on-premises systems, and custom APIs. Visual designer enables no-code/low-code workflow creation. Supports standard workflows (code-centric with VS Code support) and consumption workflows (visual designer). Built-in enterprise integration pack for B2B scenarios with EDI, AS2, and X12 support. Connectors include Office 365, Dynamics 365, Salesforce, SAP, and more.',
          codeExample: `// Logic Apps workflow definition (JSON)
{
  "definition": {
    "$schema": "https://schema.management.azure.com/schemas/2016-06-01/workflowdefinition.json#",
    "triggers": {
      "When_a_blob_is_added": {
        "type": "ApiConnection",
        "inputs": {
          "host": {
            "connection": {
              "name": "@parameters('$connections')['azureblob']['connectionId']"
            }
          },
          "method": "get",
          "path": "/datasets/default/triggers/batch/onupdatedfile"
        },
        "recurrence": {
          "frequency": "Minute",
          "interval": 5
        }
      }
    },
    "actions": {
      "Parse_JSON": {
        "type": "ParseJson",
        "inputs": {
          "content": "@triggerBody()",
          "schema": { /* JSON schema */ }
        }
      },
      "Send_email": {
        "type": "ApiConnection",
        "inputs": {
          "host": {
            "connection": {
              "name": "@parameters('$connections')['office365']['connectionId']"
            }
          },
          "method": "post",
          "path": "/v2/Mail"
        }
      }
    }
  }
}`
        },
        {
          name: 'API Management',
          explanation: 'Azure API Management provides a complete platform for publishing, securing, transforming, maintaining, and monitoring APIs at scale. Developer portal offers API discovery, documentation, and interactive testing. Policy-based transformations enable rate limiting, caching, request/response manipulation, and authentication. Self-hosted gateway enables hybrid and multi-cloud API management. Built-in OAuth 2.0, Azure AD integration, and certificate-based authentication. Consumption tier offers pay-per-use pricing.',
          codeExample: `<!-- API Management policy: Rate limiting and caching -->
<policies>
    <inbound>
        <!-- Throttle by key -->
        <rate-limit-by-key calls="100"
                          renewal-period="60"
                          counter-key="@(context.Request.IpAddress)" />

        <!-- JWT validation -->
        <validate-jwt header-name="Authorization"
                      failed-validation-httpcode="401">
            <openid-config url="https://login.microsoftonline.com/..." />
            <audiences>
                <audience>api://myapi</audience>
            </audiences>
        </validate-jwt>

        <!-- Response caching -->
        <cache-lookup vary-by-developer="true"
                     vary-by-developer-groups="true">
            <vary-by-query-parameter>category</vary-by-query-parameter>
        </cache-lookup>
    </inbound>
    <backend>
        <base />
    </backend>
    <outbound>
        <cache-store duration="3600" />
        <base />
    </outbound>
</policies>`
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics Services',
      icon: '📊',
      color: '#ec4899',
      description: 'Limitless analytics combining data warehousing and big data with Data Factory, Synapse Analytics, and Power BI integration.',
      diagram: AnalyticsDiagram,
      details: [
        {
          name: 'Data Factory',
          diagram: AnalyticsDiagram,
          explanation: 'Azure Data Factory is a cloud-based ETL and data integration service for creating, scheduling, and orchestrating data workflows at scale. Connect to 90+ data sources with native connectors including SQL databases, NoSQL stores, files, and SaaS applications. Mapping data flows enable code-free transformations with visual designer. Integration runtime provides hybrid connectivity for on-premises data sources. Supports data movement, transformation, and control flow activities.',
          codeExample: `// Data Factory pipeline definition (JSON)
{
  "name": "CopyPipeline",
  "properties": {
    "activities": [
      {
        "name": "CopyData",
        "type": "Copy",
        "inputs": [{ "referenceName": "SourceDataset" }],
        "outputs": [{ "referenceName": "SinkDataset" }],
        "typeProperties": {
          "source": {
            "type": "SqlSource",
            "sqlReaderQuery": "SELECT * FROM Orders WHERE OrderDate >= '@{pipeline().parameters.startDate}'"
          },
          "sink": {
            "type": "ParquetSink",
            "storeSettings": {
              "type": "AzureBlobFSWriteSettings"
            }
          }
        }
      }
    ],
    "parameters": {
      "startDate": { "type": "String" }
    }
  }
}

# Azure CLI - Trigger pipeline run
az datafactory pipeline create-run \\
  --factory-name myDataFactory \\
  --resource-group myResourceGroup \\
  --name CopyPipeline \\
  --parameters startDate="2024-01-01"`
        },
        {
          name: 'Synapse Analytics',
          explanation: 'Azure Synapse brings together data integration, enterprise data warehousing, and big data analytics in a unified experience. Serverless SQL pool enables T-SQL queries over data lake without provisioning infrastructure. Dedicated SQL pools provide MPP data warehousing. Apache Spark pools offer big data processing. Integrated with Power BI for visualization and Azure Machine Learning for model training. Synapse Studio provides single workspace for data engineering, data science, and analytics.',
          codeExample: `-- Serverless SQL - Query data lake
SELECT
    OrderDate,
    SUM(Amount) as TotalSales,
    COUNT(*) as OrderCount
FROM
    OPENROWSET(
        BULK 'https://mydatalake.dfs.core.windows.net/data/sales/*.parquet',
        FORMAT = 'PARQUET'
    ) AS orders
WHERE
    OrderDate >= '2024-01-01'
GROUP BY
    OrderDate
ORDER BY
    OrderDate DESC;

-- Dedicated SQL Pool - Create columnstore table
CREATE TABLE dbo.FactSales
(
    OrderID bigint NOT NULL,
    OrderDate date NOT NULL,
    CustomerID int NOT NULL,
    Amount decimal(10,2) NOT NULL
)
WITH
(
    DISTRIBUTION = HASH(CustomerID),
    CLUSTERED COLUMNSTORE INDEX
);

# PySpark in Synapse - Data transformation
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum, count

spark = SparkSession.builder.appName("SalesAnalysis").getOrCreate()

df = spark.read.parquet("abfss://data@mydatalake.dfs.core.windows.net/sales/")
sales_summary = df.groupBy("ProductCategory") \\
    .agg(sum("Amount").alias("TotalSales"),
         count("*").alias("OrderCount"))
sales_summary.write.mode("overwrite").saveAsTable("SalesSummary")`
        },
        {
          name: 'Monitoring & Insights',
          explanation: 'Azure Monitor provides comprehensive monitoring for applications, infrastructure, and networks. Application Insights offers application performance monitoring (APM) with distributed tracing, dependency tracking, and failure analysis. Log Analytics workspace enables querying and analyzing log data using Kusto Query Language (KQL). Workbooks provide interactive data visualization. Smart alerts use machine learning for anomaly detection. Action groups automate responses to alerts via webhooks, logic apps, or runbooks.',
          codeExample: `// Application Insights - Custom telemetry
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;

var telemetryClient = new TelemetryClient();

// Track custom event
telemetryClient.TrackEvent("OrderPlaced",
    new Dictionary<string, string> {
        { "OrderId", orderId },
        { "CustomerId", customerId }
    },
    new Dictionary<string, double> {
        { "Amount", 99.99 }
    });

// Track dependency
var startTime = DateTime.UtcNow;
var success = await CallExternalApi();
var duration = DateTime.UtcNow - startTime;

telemetryClient.TrackDependency("HTTP", "api.example.com",
    "GET /orders", startTime, duration, success);

// KQL query in Log Analytics
requests
| where timestamp > ago(24h)
| summarize RequestCount = count(),
            AvgDuration = avg(duration),
            P95Duration = percentile(duration, 95)
          by bin(timestamp, 1h), operation_Name
| order by timestamp desc`
        }
      ]
    },
    {
      id: 'networking',
      name: 'Networking & Security',
      icon: '🔐',
      color: '#06b6d4',
      description: 'Global networking with Front Door CDN, Virtual Networks, and comprehensive security with Azure AD, WAF, and identity protection.',
      diagram: NetworkingDiagram,
      details: [
        {
          name: 'Azure Front Door',
          diagram: NetworkingDiagram,
          explanation: 'Azure Front Door is a global, scalable entry-point leveraging Microsoft\'s global edge network with 118 edge locations. Provides application acceleration with anycast protocol, SSL offload at the edge, and intelligent routing to lowest latency backends. Web Application Firewall (WAF) protects against common threats. Standard tier optimized for CDN scenarios, Premium tier adds Private Link integration and advanced security. Health probes ensure high availability with automatic failover.',
          codeExample: `# Azure CLI - Create Front Door profile
az afd profile create \\
  --resource-group myResourceGroup \\
  --profile-name myFrontDoor \\
  --sku Premium_AzureFrontDoor

# Add endpoint and route
az afd endpoint create \\
  --resource-group myResourceGroup \\
  --profile-name myFrontDoor \\
  --endpoint-name myEndpoint \\
  --enabled-state Enabled

az afd route create \\
  --resource-group myResourceGroup \\
  --profile-name myFrontDoor \\
  --endpoint-name myEndpoint \\
  --route-name myRoute \\
  --origin-group myOriginGroup \\
  --supported-protocols Https \\
  --https-redirect Enabled \\
  --forwarding-protocol HttpsOnly

# Configure WAF policy
az network front-door waf-policy create \\
  --resource-group myResourceGroup \\
  --name myWAFPolicy \\
  --sku Premium_AzureFrontDoor \\
  --mode Prevention`
        },
        {
          name: 'Azure AD',
          explanation: 'Azure Active Directory is Microsoft\'s cloud-based identity and access management service providing single sign-on (SSO) to thousands of SaaS applications. Multi-factor authentication adds security layer. Conditional access policies enable zero-trust security model based on user, device, location, and risk. Identity Protection uses machine learning to detect suspicious activities. B2B enables secure partner collaboration, B2C provides customer identity management. Seamlessly integrated with Windows, Office 365, and all Azure services.',
          codeExample: `// Microsoft Authentication Library (MSAL) - Node.js
const msal = require('@azure/msal-node');

const config = {
    auth: {
        clientId: "your-client-id",
        authority: "https://login.microsoftonline.com/your-tenant-id",
        clientSecret: "your-client-secret"
    }
};

const cca = new msal.ConfidentialClientApplication(config);

// Acquire token for application
const tokenRequest = {
    scopes: ["https://graph.microsoft.com/.default"]
};
const response = await cca.acquireTokenByClientCredential(tokenRequest);

// Call Microsoft Graph API
const axios = require('axios');
const users = await axios.get('https://graph.microsoft.com/v1.0/users', {
    headers: { 'Authorization': \`Bearer \${response.accessToken}\` }
});

// Conditional access policy (PowerShell)
New-AzureADMSConditionalAccessPolicy -DisplayName "Require MFA for Admins" \\
  -State "Enabled" \\
  -Conditions @{
    Users = @{ IncludeRoles = @("62e90394-69f5-4237-9190-012177145e10") }
    Applications = @{ IncludeApplications = "All" }
  } \\
  -GrantControls @{
    BuiltInControls = @("mfa")
  }`
        },
        {
          name: 'Virtual Network',
          explanation: 'Azure Virtual Network (VNet) provides isolated network environment for Azure resources with full control over IP address ranges, subnets, route tables, and network gateways. Network Security Groups (NSGs) filter traffic with allow/deny rules. VNet peering enables low-latency connectivity between VNets. Service endpoints provide secure access to Azure services over Azure backbone. Private Link enables private connectivity to PaaS services. VPN Gateway and ExpressRoute provide hybrid connectivity to on-premises networks.',
          codeExample: `# Create VNet with multiple subnets
az network vnet create \\
  --resource-group myResourceGroup \\
  --name myVNet \\
  --address-prefix 10.0.0.0/16 \\
  --subnet-name AppSubnet \\
  --subnet-prefix 10.0.1.0/24

az network vnet subnet create \\
  --resource-group myResourceGroup \\
  --vnet-name myVNet \\
  --name DatabaseSubnet \\
  --address-prefix 10.0.2.0/24 \\
  --service-endpoints Microsoft.Sql

# Create Network Security Group
az network nsg create \\
  --resource-group myResourceGroup \\
  --name myNSG

az network nsg rule create \\
  --resource-group myResourceGroup \\
  --nsg-name myNSG \\
  --name AllowHTTPS \\
  --priority 100 \\
  --source-address-prefixes Internet \\
  --destination-port-ranges 443 \\
  --protocol Tcp \\
  --access Allow

# Enable Private Link for SQL Database
az network private-endpoint create \\
  --resource-group myResourceGroup \\
  --name myPrivateEndpoint \\
  --vnet-name myVNet \\
  --subnet DatabaseSubnet \\
  --connection-name myConnection \\
  --private-connection-resource-id /subscriptions/.../sqlServer \\
  --group-id sqlServer`
        }
      ]
    },
    {
      id: 'web',
      name: 'Web Services',
      icon: '🌐',
      color: '#eab308',
      description: 'Real-time messaging with SignalR Service for responsive web applications with WebSocket support and automatic scaling.',
      details: [
        {
          name: 'SignalR Service',
          explanation: 'Azure SignalR Service simplifies adding real-time web functionality to applications. Supports WebSocket, Server-Sent Events, and long polling transports with automatic fallback. Auto-scaling handles millions of concurrent connections. Built-in authentication via Azure AD or connection string. Serverless mode integrates with Azure Functions for event-driven real-time apps. Perfect for chat applications, live dashboards, real-time notifications, and collaborative tools.',
          codeExample: `// ASP.NET Core - SignalR Hub
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task JoinRoom(string roomName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        await Clients.Group(roomName).SendAsync("UserJoined", Context.ConnectionId);
    }
}

// Startup configuration with Azure SignalR Service
public void ConfigureServices(IServiceCollection services)
{
    services.AddSignalR().AddAzureSignalR(options => {
        options.ConnectionString = Configuration["Azure:SignalR:ConnectionString"];
    });
}

// JavaScript client
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .withAutomaticReconnect()
    .build();

connection.on("ReceiveMessage", (user, message) => {
    console.log(\`\${user}: \${message}\`);
});

await connection.start();
await connection.invoke("SendMessage", "User1", "Hello World!");`
        },
        {
          name: 'Azure CDN',
          explanation: 'Azure Content Delivery Network delivers high-bandwidth content globally with low latency by caching content at strategically placed edge servers. Integration with Azure Storage, Web Apps, and Media Services. Standard CDN from Microsoft, Akamai, or Verizon. Premium tier offers advanced features including real-time analytics, custom rules engine, and token authentication. Dynamic site acceleration (DSA) optimizes delivery of dynamic content.',
          codeExample: `# Create CDN profile and endpoint
az cdn profile create \\
  --resource-group myResourceGroup \\
  --name myCDNProfile \\
  --sku Standard_Microsoft \\
  --location Global

az cdn endpoint create \\
  --resource-group myResourceGroup \\
  --profile-name myCDNProfile \\
  --name myEndpoint \\
  --origin www.contoso.com \\
  --origin-host-header www.contoso.com \\
  --enable-compression true \\
  --query-string-caching-behavior IgnoreQueryString

# Configure custom domain with HTTPS
az cdn custom-domain create \\
  --resource-group myResourceGroup \\
  --profile-name myCDNProfile \\
  --endpoint-name myEndpoint \\
  --name myCustomDomain \\
  --hostname www.example.com

az cdn custom-domain enable-https \\
  --resource-group myResourceGroup \\
  --profile-name myCDNProfile \\
  --endpoint-name myEndpoint \\
  --name myCustomDomain`
        },
        {
          name: 'Static Web Apps',
          explanation: 'Azure Static Web Apps provides streamlined full-stack hosting for modern web applications with global distribution. Automatically builds and deploys from GitHub or Azure DevOps. Built-in API support via Azure Functions. Free SSL certificates, custom domains, and authentication with social providers. Staging environments for every pull request. Perfect for React, Angular, Vue, and Blazor applications with JAMstack architecture.',
          codeExample: `# Static Web Apps configuration (staticwebapp.config.json)
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/admin/*",
      "allowedRoles": ["administrator"]
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/images/*.{png,jpg,gif}", "/css/*"]
  },
  "responseOverrides": {
    "404": {
      "rewrite": "/404.html"
    }
  },
  "globalHeaders": {
    "content-security-policy": "default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'"
  },
  "auth": {
    "identityProviders": {
      "azureActiveDirectory": {
        "registration": {
          "openIdIssuer": "https://login.microsoftonline.com/<tenant-id>/v2.0",
          "clientIdSettingName": "AAD_CLIENT_ID",
          "clientSecretSettingName": "AAD_CLIENT_SECRET"
        }
      }
    }
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
      { name: 'Cloud', icon: '☁️', page: 'Cloud' },
      { name: 'Azure', icon: '☁️', page: 'Azure' }
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
      setSelectedConceptIndex(null)  // Close modal, stay on Azure page
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
    background: 'linear-gradient(135deg, #50E6FF, #0078D4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: AZURE_COLORS.bg,
    border: `1px solid ${AZURE_COLORS.border}`,
    borderRadius: '0.5rem',
    color: AZURE_COLORS.primary,
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s',
    fontWeight: '600'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          <span>☁️</span>
          Microsoft Azure
        </h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = AZURE_COLORS.hoverBg
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = AZURE_COLORS.bg
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
          colors={AZURE_COLORS}
        />
      </div>

      {/* Subtitle */}
      <p style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '1.1rem',
        fontStyle: 'italic'
      }}>
        Invent with purpose using Microsoft's cloud platform
      </p>

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
              {concept.details.length} services • Click to explore
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
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            backdropFilter: 'blur(4px)'
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
              boxShadow: `0 25px 50px -12px ${selectedConcept.color}30`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu}
              colors={AZURE_COLORS}
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
                fontSize: '1.5rem'
              }}>
                <span style={{ fontSize: '1.75rem' }}>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.9rem'
                  }}
                >←</button>
                <span style={{ color: '#64748b', fontSize: '0.875rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1} / {concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.9rem'
                  }}
                >→</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    marginLeft: '0.5rem'
                  }}
                >✕</button>
              </div>
            </div>

            {/* Service Tabs */}
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
                    fontSize: '0.9rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Service Content */}
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
                      padding: '1.5rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Service Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '1rem', fontSize: '1.25rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1.5rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1.25rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <div>
                      <h4 style={{
                        color: '#94a3b8',
                        marginBottom: '0.75rem',
                        fontSize: '0.95rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Code Example
                      </h4>
                      <SyntaxHighlighter
                        language="javascript"
                        style={vscDarkPlus}
                        customStyle={{
                          padding: '1.25rem',
                          margin: 0,
                          borderRadius: '0.5rem',
                          fontSize: '0.85rem',
                          border: '1px solid #334155',
                          background: '#0f172a'
                        }}
                        codeTagProps={{ style: { background: 'transparent' } }}
                      >
                        {detail.codeExample}
                      </SyntaxHighlighter>
                    </div>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}

      {/* Footer Info */}
      <div style={{
        maxWidth: '1400px',
        margin: '3rem auto 0',
        padding: '1.5rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '1rem',
        border: `1px solid ${AZURE_COLORS.border}`,
        borderLeft: `4px solid ${AZURE_COLORS.primary}`
      }}>
        <h3 style={{
          margin: '0 0 0.75rem 0',
          fontSize: '1.1rem',
          fontWeight: '700',
          color: AZURE_COLORS.primary
        }}>
          About Microsoft Azure
        </h3>
        <p style={{
          margin: 0,
          color: '#94a3b8',
          fontSize: '0.95rem',
          lineHeight: '1.7'
        }}>
          Microsoft Azure is a comprehensive cloud computing platform with an ever-expanding set of services to help you
          build solutions to meet your business goals. Azure services support everything from simple to complex,
          offering tools for compute, storage, networking, AI, IoT, and more. With Azure, you can build, run,
          and manage applications across multiple clouds, on-premises, and at the edge with the tools and
          frameworks of your choice.
        </p>
      </div>
    </div>
  )
}

export default Azure

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const MULESOFT_COLORS = {
  primary: '#00a1e0',              // MuleSoft light blue
  primaryHover: '#67d4ff',         // Lighter blue for hover
  bg: 'rgba(0, 161, 224, 0.1)',    // Background with transparency
  border: 'rgba(0, 161, 224, 0.3)', // Border color
  arrow: '#00a1e0',                // Arrow/indicator color
  hoverBg: 'rgba(0, 161, 224, 0.2)', // Hover background
  topicBg: 'rgba(0, 161, 224, 0.2)'  // Topic card background
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

// Anypoint Platform Diagram
const AnypointPlatformDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Anypoint Platform Architecture</text>

    <rect x="50" y="45" width="140" height="70" rx="6" fill="rgba(0, 161, 224, 0.3)" stroke="#00a1e0" strokeWidth="2"/>
    <text x="120" y="70" textAnchor="middle" fill="#00a1e0" fontSize="10" fontWeight="bold">Design Center</text>
    <text x="120" y="88" textAnchor="middle" fill="#67d4ff" fontSize="8">API Designer</text>
    <text x="120" y="102" textAnchor="middle" fill="#67d4ff" fontSize="8">Flow Designer</text>

    <rect x="220" y="45" width="140" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="290" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Exchange</text>
    <text x="290" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="8">{`API Specs & Templates`}</text>
    <text x="290" y="102" textAnchor="middle" fill="#c4b5fd" fontSize="8">Connectors</text>

    <rect x="390" y="45" width="140" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="460" y="70" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Management Center</text>
    <text x="460" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">API Manager</text>
    <text x="460" y="102" textAnchor="middle" fill="#fcd34d" fontSize="8">Runtime Manager</text>

    <rect x="560" y="45" width="180" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="650" y="70" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Anypoint Studio</text>
    <text x="650" y="88" textAnchor="middle" fill="#86efac" fontSize="8">Eclipse-based IDE</text>
    <text x="650" y="102" textAnchor="middle" fill="#86efac" fontSize="8">{`Visual & XML Development`}</text>

    <rect x="150" y="135" width="500" height="50" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="400" y="158" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Mule Runtime Engine</text>
    <text x="400" y="175" textAnchor="middle" fill="#a5f3fc" fontSize="8">CloudHub | Runtime Fabric | On-Premises</text>

    <path d="M 120 115 L 120 130" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 290 115 L 290 130" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 460 115 L 460 130" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 650 115 L 650 130" stroke="#64748b" strokeWidth="1.5"/>
  </svg>
)

// API Gateway Diagram
const APIGatewayDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">MuleSoft API Gateway</text>

    <rect x="50" y="50" width="100" height="100" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Clients</text>
    <text x="100" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">Web Apps</text>
    <text x="100" y="110" textAnchor="middle" fill="#93c5fd" fontSize="8">Mobile Apps</text>
    <text x="100" y="125" textAnchor="middle" fill="#93c5fd" fontSize="8">Partners</text>

    <rect x="200" y="40" width="320" height="120" rx="8" fill="rgba(124, 58, 237, 0.15)" stroke="#7c3aed" strokeWidth="2"/>
    <text x="360" y="60" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">API Gateway</text>

    <rect x="220" y="75" width="90" height="35" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1"/>
    <text x="265" y="92" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="bold">Security</text>
    <text x="265" y="104" textAnchor="middle" fill="#fca5a5" fontSize="7">OAuth/JWT</text>

    <rect x="315" y="75" width="90" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="360" y="92" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">Rate Limit</text>
    <text x="360" y="104" textAnchor="middle" fill="#fcd34d" fontSize="7">SLA Tiers</text>

    <rect x="410" y="75" width="90" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="455" y="92" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="bold">Transform</text>
    <text x="455" y="104" textAnchor="middle" fill="#86efac" fontSize="7">DataWeave</text>

    <text x="360" y="140" textAnchor="middle" fill="#c4b5fd" fontSize="8">Analytics | Logging | Caching</text>

    <rect x="570" y="50" width="180" height="100" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="660" y="75" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Backend APIs</text>
    <text x="660" y="95" textAnchor="middle" fill="#a5f3fc" fontSize="8">REST Services</text>
    <text x="660" y="110" textAnchor="middle" fill="#a5f3fc" fontSize="8">SOAP Services</text>
    <text x="660" y="125" textAnchor="middle" fill="#a5f3fc" fontSize="8">Legacy Systems</text>

    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>
    <path d="M 150 100 L 195 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 520 100 L 565 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
  </svg>
)

// DataWeave Transformation Diagram
const DataWeaveDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">DataWeave Transformation Engine</text>

    <rect x="50" y="50" width="150" height="100" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="72" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Input Formats</text>
    <text x="125" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">JSON | XML | CSV</text>
    <text x="125" y="107" textAnchor="middle" fill="#93c5fd" fontSize="8">Java Objects</text>
    <text x="125" y="122" textAnchor="middle" fill="#93c5fd" fontSize="8">Flat Files</text>
    <text x="125" y="137" textAnchor="middle" fill="#93c5fd" fontSize="8">Binary | Excel</text>

    <rect x="260" y="45" width="280" height="110" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="400" y="68" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">DataWeave 2.0</text>

    <rect x="280" y="82" width="110" height="30" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="335" y="101" textAnchor="middle" fill="#fbbf24" fontSize="8">map / filter</text>

    <rect x="400" y="82" width="120" height="30" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="460" y="101" textAnchor="middle" fill="#a78bfa" fontSize="8">reduce / groupBy</text>

    <text x="400" y="138" textAnchor="middle" fill="#6ee7b7" fontSize="8">Pattern Matching | Functions | Modules</text>

    <rect x="600" y="50" width="150" height="100" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="675" y="72" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Output Formats</text>
    <text x="675" y="92" textAnchor="middle" fill="#fbcfe8" fontSize="8">JSON | XML | CSV</text>
    <text x="675" y="107" textAnchor="middle" fill="#fbcfe8" fontSize="8">Java Objects</text>
    <text x="675" y="122" textAnchor="middle" fill="#fbcfe8" fontSize="8">YAML | MultiPart</text>
    <text x="675" y="137" textAnchor="middle" fill="#fbcfe8" fontSize="8">Custom</text>

    <defs>
      <marker id="arrow-dw" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>
    <path d="M 200 100 L 255 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-dw)"/>
    <path d="M 540 100 L 595 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-dw)"/>
  </svg>
)

// Connectors Diagram
const ConnectorsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">MuleSoft Connectors Ecosystem</text>

    <rect x="280" y="45" width="240" height="130" rx="8" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="68" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Mule Runtime</text>

    <circle cx="400" cy="115" r="35" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="118" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="bold">Flow</text>
    <text x="400" y="132" textAnchor="middle" fill="#fcd34d" fontSize="7">Engine</text>

    <rect x="50" y="45" width="100" height="35" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="100" y="67" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">Salesforce</text>

    <rect x="50" y="90" width="100" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="100" y="112" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="bold">SAP</text>

    <rect x="50" y="135" width="100" height="35" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="100" y="157" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="bold">Workday</text>

    <rect x="650" y="45" width="100" height="35" rx="4" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="700" y="67" textAnchor="middle" fill="#f472b6" fontSize="8" fontWeight="bold">Database</text>

    <rect x="650" y="90" width="100" height="35" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="700" y="112" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="bold">HTTP/REST</text>

    <rect x="650" y="135" width="100" height="35" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1"/>
    <text x="700" y="157" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="bold">JMS/AMQP</text>

    <path d="M 150 62 L 280 95" stroke="#3b82f6" strokeWidth="1.5"/>
    <path d="M 150 107 L 280 110" stroke="#22c55e" strokeWidth="1.5"/>
    <path d="M 150 152 L 280 125" stroke="#8b5cf6" strokeWidth="1.5"/>
    <path d="M 520 95 L 650 62" stroke="#ec4899" strokeWidth="1.5"/>
    <path d="M 520 110 L 650 107" stroke="#06b6d4" strokeWidth="1.5"/>
    <path d="M 520 125 L 650 152" stroke="#ef4444" strokeWidth="1.5"/>
  </svg>
)

// Mule Runtime Diagram
const MuleRuntimeDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Mule Runtime Architecture</text>

    <rect x="50" y="45" width="700" height="140" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="65" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Mule Runtime Engine (Java-based)</text>

    <rect x="70" y="80" width="150" height="45" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="145" y="100" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Message Sources</text>
    <text x="145" y="115" textAnchor="middle" fill="#93c5fd" fontSize="7">HTTP | JMS | File</text>

    <rect x="240" y="80" width="150" height="45" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="315" y="100" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Message Processors</text>
    <text x="315" y="115" textAnchor="middle" fill="#fcd34d" fontSize="7">Transform | Route | Filter</text>

    <rect x="410" y="80" width="150" height="45" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="485" y="100" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Error Handlers</text>
    <text x="485" y="115" textAnchor="middle" fill="#86efac" fontSize="7">On-Error | Retry</text>

    <rect x="580" y="80" width="150" height="45" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="655" y="100" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Scopes</text>
    <text x="655" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="7">Async | Parallel | Cache</text>

    <rect x="150" y="140" width="500" height="35" rx="4" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="400" y="160" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Mule Event: Message (Payload + Attributes) | Variables | Error</text>

    <path d="M 220 102 L 235 102" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 390 102 L 405 102" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 560 102 L 575 102" stroke="#64748b" strokeWidth="1.5"/>
  </svg>
)

// API-Led Connectivity Diagram
const APILedConnectivityDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">API-Led Connectivity Architecture</text>

    <rect x="50" y="45" width="700" height="45" rx="6" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="65" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Experience APIs</text>
    <text x="400" y="80" textAnchor="middle" fill="#93c5fd" fontSize="8">Mobile App API | Web Portal API | Partner API | IoT API</text>

    <rect x="100" y="100" width="600" height="45" rx="6" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="120" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Process APIs</text>
    <text x="400" y="135" textAnchor="middle" fill="#fcd34d" fontSize="8">Order Management | Customer 360 | Inventory Orchestration</text>

    <rect x="150" y="155" width="500" height="45" rx="6" fill="rgba(34, 197, 94, 0.25)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="175" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">System APIs</text>
    <text x="400" y="190" textAnchor="middle" fill="#86efac" fontSize="8">SAP API | Salesforce API | Database API | ERP API</text>

    <path d="M 300 90 L 300 97" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 400 90 L 400 97" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 500 90 L 500 97" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 300 145 L 300 152" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 400 145 L 400 152" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 500 145 L 500 152" stroke="#64748b" strokeWidth="1.5"/>
  </svg>
)

// CloudHub Deployment Diagram
const CloudHubDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">CloudHub Deployment Architecture</text>

    <rect x="50" y="45" width="700" height="140" rx="8" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="120" y="65" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">CloudHub iPaaS</text>

    <rect x="70" y="80" width="140" height="90" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="140" y="100" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Worker 1</text>
    <text x="140" y="118" textAnchor="middle" fill="#93c5fd" fontSize="7">Mule App</text>
    <text x="140" y="133" textAnchor="middle" fill="#93c5fd" fontSize="7">0.1 - 4 vCore</text>
    <rect x="85" y="145" width="110" height="18" rx="3" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="140" y="158" textAnchor="middle" fill="#4ade80" fontSize="7">Running</text>

    <rect x="230" y="80" width="140" height="90" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="300" y="100" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Worker 2</text>
    <text x="300" y="118" textAnchor="middle" fill="#93c5fd" fontSize="7">Mule App</text>
    <text x="300" y="133" textAnchor="middle" fill="#93c5fd" fontSize="7">Auto-Scaling</text>
    <rect x="245" y="145" width="110" height="18" rx="3" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="300" y="158" textAnchor="middle" fill="#4ade80" fontSize="7">Running</text>

    <rect x="410" y="75" width="150" height="100" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="485" y="95" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Shared Services</text>
    <text x="485" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="7">Load Balancer</text>
    <text x="485" y="130" textAnchor="middle" fill="#c4b5fd" fontSize="7">Object Store</text>
    <text x="485" y="145" textAnchor="middle" fill="#c4b5fd" fontSize="7">Scheduler</text>
    <text x="485" y="160" textAnchor="middle" fill="#c4b5fd" fontSize="7">Persistent Queues</text>

    <rect x="590" y="75" width="140" height="100" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="660" y="95" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">VPC / Networking</text>
    <text x="660" y="115" textAnchor="middle" fill="#fcd34d" fontSize="7">VPN Tunnels</text>
    <text x="660" y="130" textAnchor="middle" fill="#fcd34d" fontSize="7">Static IPs</text>
    <text x="660" y="145" textAnchor="middle" fill="#fcd34d" fontSize="7">DLB / SSL</text>
    <text x="660" y="160" textAnchor="middle" fill="#fcd34d" fontSize="7">Firewall Rules</text>
  </svg>
)

// Security Diagram
const SecurityDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">MuleSoft Security Architecture</text>

    <rect x="50" y="50" width="110" height="110" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="105" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Clients</text>
    <text x="105" y="95" textAnchor="middle" fill="#93c5fd" fontSize="7">API Keys</text>
    <text x="105" y="110" textAnchor="middle" fill="#93c5fd" fontSize="7">OAuth Tokens</text>
    <text x="105" y="125" textAnchor="middle" fill="#93c5fd" fontSize="7">JWT</text>
    <text x="105" y="140" textAnchor="middle" fill="#93c5fd" fontSize="7">SAML</text>

    <rect x="200" y="45" width="140" height="60" rx="6" fill="rgba(220, 38, 38, 0.3)" stroke="#dc2626" strokeWidth="2"/>
    <text x="270" y="70" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Authentication</text>
    <text x="270" y="88" textAnchor="middle" fill="#fca5a5" fontSize="7">OAuth 2.0 Provider</text>
    <text x="270" y="100" textAnchor="middle" fill="#fca5a5" fontSize="7">OpenID Connect</text>

    <rect x="200" y="115" width="140" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="270" y="138" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Authorization</text>
    <text x="270" y="155" textAnchor="middle" fill="#fcd34d" fontSize="7">RBAC | Scopes</text>

    <rect x="380" y="45" width="140" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="450" y="70" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Policies</text>
    <text x="450" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="7">Rate Limiting</text>
    <text x="450" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="7">IP Filtering</text>

    <rect x="380" y="115" width="140" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="450" y="138" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Encryption</text>
    <text x="450" y="155" textAnchor="middle" fill="#86efac" fontSize="7">TLS/SSL | AES</text>

    <rect x="560" y="50" width="180" height="110" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Secrets Management</text>
    <text x="650" y="100" textAnchor="middle" fill="#a5f3fc" fontSize="7">Secure Properties</text>
    <text x="650" y="115" textAnchor="middle" fill="#a5f3fc" fontSize="7">Vault Integration</text>
    <text x="650" y="130" textAnchor="middle" fill="#a5f3fc" fontSize="7">Key Rotation</text>
    <text x="650" y="145" textAnchor="middle" fill="#a5f3fc" fontSize="7">Credential Store</text>

    <path d="M 160 100 L 195 75" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 160 110 L 195 135" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 340 75 L 375 75" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 340 140 L 375 140" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 520 75 L 555 100" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 520 140 L 555 115" stroke="#64748b" strokeWidth="1.5"/>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function MuleSoft({ onBack, breadcrumb }) {
  // State for modal navigation
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'anypoint',
      name: 'Anypoint Platform',
      icon: '🌐',
      color: '#00a1e0',
      description: 'Unified integration platform for API design, development, deployment, and management',
      diagram: AnypointPlatformDiagram,
      details: [
        {
          name: 'Design Center',
          diagram: AnypointPlatformDiagram,
          explanation: 'Visual API design with RAML or OAS specifications. Flow designer for integrations without code. Reusable API fragments and types. Mock services for early testing. Collaborative design with version control. API specification validation and linting.',
          codeExample: `#%RAML 1.0
title: Customer API
version: v1
baseUri: https://api.example.com/{version}

types:
  Customer:
    type: object
    properties:
      id: string
      name: string
      email: string

/customers:
  get:
    description: Get all customers
    responses:
      200:
        body:
          application/json:
            type: Customer[]
  post:
    description: Create a new customer
    body:
      application/json:
        type: Customer`
        },
        {
          name: 'Exchange',
          explanation: 'Central repository for reusable assets. API specifications, connectors, templates. Organization-wide asset sharing. Versioning and dependency management. Search and discovery. Public and private assets. Custom asset types and metadata.',
          codeExample: `// Maven dependency for Exchange asset
<dependency>
    <groupId>com.mycompany</groupId>
    <artifactId>customer-api</artifactId>
    <version>1.0.0</version>
    <classifier>raml</classifier>
    <type>zip</type>
</dependency>

<!-- Reference from Anypoint Exchange -->
<repositories>
    <repository>
        <id>anypoint-exchange</id>
        <name>Anypoint Exchange</name>
        <url>https://maven.anypoint.mulesoft.com/api/v2/organizations/\${orgId}/maven</url>
    </repository>
</repositories>`
        },
        {
          name: 'Management Center',
          explanation: 'Centralized API and runtime management. Environment configuration (sandbox, production). Access management and permissions. API policies and SLA tiers. Analytics and monitoring dashboards. Alerting and notifications. Audit logging.',
          codeExample: `// API Manager Policy Configuration (Client ID Enforcement)
{
  "policyId": "client-id-enforcement",
  "configurationData": {
    "credentialsOriginHasHttpBasicAuthenticationHeader": "customExpression",
    "clientIdExpression": "#[attributes.headers['client_id']]",
    "clientSecretExpression": "#[attributes.headers['client_secret']]"
  }
}

// Runtime Manager deployment configuration
{
  "applicationName": "customer-api",
  "runtime": "4.4.0",
  "workers": 2,
  "workerSize": "0.2",
  "region": "us-east-1"
}`
        }
      ]
    },
    {
      id: 'apigateway',
      name: 'API Gateway',
      icon: '🚪',
      color: '#7c3aed',
      description: 'Secure, scalable gateway for managing API traffic, security, and policies',
      diagram: APIGatewayDiagram,
      details: [
        {
          name: 'API Policies',
          diagram: APIGatewayDiagram,
          explanation: 'Rate limiting and throttling policies. OAuth 2.0, JWT, and basic auth. IP whitelisting/blacklisting. Request/response transformation. Header injection and removal. Cross-origin resource sharing (CORS). Custom policy development.',
          codeExample: `// JWT Validation Policy Configuration
{
  "jwt": {
    "signingMethod": "RSA",
    "signingKeyLength": "256",
    "jwtOrigin": "httpBearerAuthenticationHeader",
    "jwtKeyOriginExpression": "#[attributes.headers['authorization']]",
    "audienceClaim": "aud",
    "issuer": "https://auth.example.com"
  }
}

// Rate Limiting Policy
{
  "rateLimits": [{
    "timePeriodInMilliseconds": 60000,
    "maximumRequests": 100,
    "id": "tier1"
  }],
  "exposeHeaders": true,
  "clusterizable": true
}`
        },
        {
          name: 'API Proxies',
          explanation: 'Facade pattern for backend APIs. URL rewriting and path mapping. Load balancing across backends. SSL/TLS termination. Request routing based on headers. Response caching for performance. Circuit breaker patterns.',
          codeExample: `<!-- API Proxy Configuration -->
<http:listener-config name="HTTP_Listener_config">
    <http:listener-connection host="0.0.0.0" port="8081"/>
</http:listener-config>

<http:request-config name="HTTP_Request_config">
    <http:request-connection host="backend.example.com" port="443" protocol="HTTPS"/>
</http:request-config>

<flow name="api-proxy-flow">
    <http:listener config-ref="HTTP_Listener_config" path="/api/*"/>

    <!-- Apply policies -->
    <api-platform-gw:apply-policy/>

    <!-- Forward to backend -->
    <http:request config-ref="HTTP_Request_config"
                  path="#[attributes.requestPath]"
                  method="#[attributes.method]"/>
</flow>`
        },
        {
          name: 'Analytics',
          explanation: 'Real-time API traffic monitoring. Response time and throughput metrics. Error rate tracking and alerting. Client usage patterns. Geographic distribution. Custom dashboards and reports. Integration with external analytics tools.',
          codeExample: `// Custom Analytics Event
%dw 2.0
output application/json
---
{
  "timestamp": now(),
  "api": "customer-api",
  "method": attributes.method,
  "path": attributes.requestPath,
  "clientId": attributes.headers."client_id",
  "responseTime": vars.responseTime,
  "statusCode": attributes.statusCode,
  "size": sizeOf(payload)
}

<!-- Log to Analytics -->
<logger level="INFO"
        message="#['API Call: ' ++ vars.analyticsEvent]"
        category="com.example.analytics"/>`
        }
      ]
    },
    {
      id: 'dataweave',
      name: 'DataWeave',
      icon: '🔄',
      color: '#10b981',
      description: 'Powerful data transformation language for converting between formats like JSON, XML, CSV',
      diagram: DataWeaveDiagram,
      details: [
        {
          name: 'Data Transformation',
          diagram: DataWeaveDiagram,
          explanation: 'Declarative transformation syntax. JSON, XML, CSV, Java, flat files. Type coercion and formatting. Array and object manipulation. Conditional logic with pattern matching. Recursive transformations. Stream processing for large files.',
          codeExample: `%dw 2.0
output application/json
---
{
  customer: {
    id: payload.customerId,
    fullName: payload.firstName ++ " " ++ payload.lastName,
    email: lower(payload.emailAddress),
    registrationDate: payload.createdAt as Date,
    isActive: payload.status == "ACTIVE",
    addresses: payload.addressList map (address) -> {
      street: address.street1,
      city: address.city,
      state: address.state,
      zip: address.postalCode
    }
  }
}`
        },
        {
          name: 'Functions & Operators',
          explanation: 'Rich standard library of functions. String manipulation (upper, lower, trim). Date/time parsing and formatting. Math operations and aggregations. Array functions (map, filter, reduce). Object functions (pluck, mapObject). Custom function definitions.',
          codeExample: `%dw 2.0
output application/json

fun calculateTax(amount: Number): Number =
  amount * 0.08

fun formatCurrency(amount: Number): String =
  "$" ++ (amount as String {format: "#,##0.00"})
---
{
  orders: payload.orders filter ($.status == "COMPLETED"),
  totalAmount: sum(payload.orders map $.amount),
  averageOrder: avg(payload.orders map $.amount),
  formattedTotal: formatCurrency(sum(payload.orders map $.amount)),
  taxAmount: calculateTax(sum(payload.orders map $.amount)),
  uniqueCustomers: distinctBy(payload.orders, $.customerId)
}`
        },
        {
          name: 'Advanced Features',
          explanation: 'Variable and function definitions. Module imports and exports. Lazy evaluation for performance. Type system with generics. Pattern matching expressions. Tail call optimization. Integration with Java libraries.',
          codeExample: `%dw 2.0
output application/json
import * from dw::core::Arrays
import * from dw::core::Strings

var TAX_RATE = 0.08
var DISCOUNT_THRESHOLD = 1000

fun applyDiscount(amount: Number): Number =
  if (amount > DISCOUNT_THRESHOLD) amount * 0.9
  else amount

fun processOrder(order: Object): Object = do {
  var subtotal = order.items reduce ((item, acc = 0) -> acc + item.price * item.quantity)
  var discounted = applyDiscount(subtotal)
  var tax = discounted * TAX_RATE
  ---
  {
    orderId: order.id,
    subtotal: subtotal,
    discount: subtotal - discounted,
    tax: tax,
    total: discounted + tax
  }
}
---
payload.orders map processOrder($)`
        }
      ]
    },
    {
      id: 'connectors',
      name: 'Connectors',
      icon: '🔌',
      color: '#f59e0b',
      description: 'Pre-built integrations with databases, SaaS applications, protocols, and enterprise systems',
      diagram: ConnectorsDiagram,
      details: [
        {
          name: 'Database Connectors',
          diagram: ConnectorsDiagram,
          explanation: 'JDBC connectivity for all major databases. Bulk operations for performance. Stored procedure calls. Connection pooling and management. Transaction support. Query builders and parameterization. Oracle, SQL Server, MySQL, PostgreSQL.',
          codeExample: `<!-- Database Connector Configuration -->
<db:config name="Database_Config">
    <db:my-sql-connection
        host="localhost"
        port="3306"
        database="customers"
        user="dbuser"
        password="dbpass"/>
</db:config>

<!-- Query Operation -->
<flow name="get-customers-flow">
    <db:select config-ref="Database_Config">
        <db:sql>
            SELECT * FROM customers
            WHERE created_at > :startDate
            AND status = :status
        </db:sql>
        <db:input-parameters>
            #[{
                startDate: vars.startDate,
                status: 'ACTIVE'
            }]
        </db:input-parameters>
    </db:select>
</flow>`
        },
        {
          name: 'SaaS Connectors',
          explanation: 'Salesforce, SAP, Workday, ServiceNow. OAuth and API key authentication. Object and operation discovery. Bulk APIs for large data volumes. Real-time event handling. Custom object support. Field-level mapping.',
          codeExample: `<!-- Salesforce Connector Configuration -->
<salesforce:sfdc-config name="Salesforce_Config">
    <salesforce:oauth-user-pass
        consumerKey="\${salesforce.consumerKey}"
        consumerSecret="\${salesforce.consumerSecret}"
        username="\${salesforce.username}"
        password="\${salesforce.password}"
        securityToken="\${salesforce.token}"/>
</salesforce:sfdc-config>

<!-- Create Operation -->
<flow name="create-account-flow">
    <salesforce:create config-ref="Salesforce_Config" type="Account">
        <salesforce:records>
            #[[{
                Name: payload.companyName,
                Industry: payload.industry,
                Phone: payload.phone,
                Website: payload.website
            }]]
        </salesforce:records>
    </salesforce:create>
</flow>`
        },
        {
          name: 'Protocol Connectors',
          explanation: 'HTTP/HTTPS with REST support. SOAP web services with WSDL. FTP/SFTP file transfer. JMS, AMQP messaging. Email (SMTP, IMAP, POP3). LDAP directory services. WebSocket real-time communication.',
          codeExample: `<!-- HTTP Request Connector -->
<http:request-config name="HTTP_Request_config">
    <http:request-connection
        host="api.example.com"
        port="443"
        protocol="HTTPS">
        <http:authentication>
            <http:basic-authentication
                username="\${api.username}"
                password="\${api.password}"/>
        </http:authentication>
    </http:request-connection>
</http:request-config>

<!-- JMS Connector -->
<jms:config name="JMS_Config">
    <jms:active-mq-connection>
        <jms:factory-configuration
            brokerUrl="tcp://localhost:61616"/>
    </jms:active-mq-connection>
</jms:config>

<flow name="consume-messages-flow">
    <jms:listener config-ref="JMS_Config" destination="orders.queue"/>
    <logger message="#['Received: ' ++ payload]"/>
</flow>`
        }
      ]
    },
    {
      id: 'runtime',
      name: 'Mule Runtime',
      icon: '⚡',
      color: '#ef4444',
      description: 'Lightweight, Java-based runtime engine for executing integration flows',
      diagram: MuleRuntimeDiagram,
      details: [
        {
          name: 'Flow Architecture',
          diagram: MuleRuntimeDiagram,
          explanation: 'Message-driven processing model. Sources, processors, and scopes. Synchronous and asynchronous flows. Sub-flows for reusability. Private flows for encapsulation. Error handling scopes. Transaction management.',
          codeExample: `<!-- Mule Flow Configuration -->
<flow name="order-processing-flow">
    <!-- Message Source -->
    <http:listener config-ref="HTTP_Listener_config" path="/orders"/>

    <!-- Transform -->
    <ee:transform>
        <ee:message>
            <ee:set-payload><![CDATA[%dw 2.0
output application/json
---
payload]]></ee:set-payload>
        </ee:message>
    </ee:transform>

    <!-- Flow Ref to Sub-flow -->
    <flow-ref name="validate-order-subflow"/>

    <!-- Async Scope -->
    <async>
        <logger message="Processing order async"/>
        <flow-ref name="send-notification-subflow"/>
    </async>

    <!-- Error Handling -->
    <error-handler>
        <on-error-propagate type="VALIDATION">
            <logger level="ERROR" message="Validation failed"/>
        </on-error-propagate>
    </error-handler>
</flow>

<sub-flow name="validate-order-subflow">
    <validation:is-not-empty value="#[payload.orderId]"/>
    <validation:is-number value="#[payload.amount]"/>
</sub-flow>`
        },
        {
          name: 'Deployment Options',
          explanation: 'CloudHub managed cloud runtime. Runtime Fabric on Kubernetes. On-premises standalone server. Hybrid deployment models. Auto-scaling capabilities. High availability clustering. Zero-downtime deployments.',
          codeExample: `# CloudHub Deployment via Anypoint CLI
anypoint-cli runtime-mgr cloudhub-application deploy \
  --name customer-api \
  --runtime 4.4.0 \
  --workers 2 \
  --workerSize 0.2 \
  --region us-east-1 \
  --property env=production \
  --property db.host=prod-db.example.com \
  target/customer-api-1.0.0-mule-application.jar

# Runtime Fabric Deployment
kubectl apply -f - <<EOF
apiVersion: mule.mulesoft.com/v1
kind: Application
metadata:
  name: customer-api
spec:
  replicas: 2
  applicationPackage:
    url: https://repository.example.com/customer-api-1.0.0.jar
  resources:
    cpu: "500m"
    memory: "1Gi"
EOF`
        },
        {
          name: 'Performance',
          explanation: 'Non-blocking I/O architecture. Thread pool configuration. Memory and CPU optimization. Connection pooling. Caching strategies. Batch processing for large volumes. Streaming for memory efficiency.',
          codeExample: `<!-- Batch Processing -->
<batch:job name="customer-migration-batch">
    <batch:process-records>
        <batch:step name="transform-step">
            <ee:transform>
                <ee:message>
                    <ee:set-payload><![CDATA[%dw 2.0
output application/json
---
{
    customerId: payload.id,
    name: payload.name
}]]></ee:set-payload>
                </ee:message>
            </ee:transform>
        </batch:step>

        <batch:step name="upsert-step">
            <db:bulk-insert config-ref="Database_Config">
                <db:sql>INSERT INTO customers (id, name) VALUES (:id, :name)</db:sql>
            </db:bulk-insert>
        </batch:step>
    </batch:process-records>
</batch:job>

<!-- Caching Strategy -->
<ee:object-store-caching-strategy name="Customer_Cache"
    doc:name="Caching Strategy"
    keyGenerationExpression="#[payload.customerId]"
    entryTtl="3600"
    entryTtlUnit="SECONDS"/>`
        }
      ]
    },
    {
      id: 'apiledconnectivity',
      name: 'API-Led Connectivity',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Architectural approach organizing APIs into experience, process, and system layers',
      diagram: APILedConnectivityDiagram,
      details: [
        {
          name: 'System APIs',
          diagram: APILedConnectivityDiagram,
          explanation: 'Direct integration with systems of record. Database and ERP connectivity. Expose system data as APIs. Abstract complexity from consumers. Stable, well-documented contracts. Owned by system teams. Foundation for composability.',
          codeExample: `<!-- System API - Direct Database Access -->
<flow name="system-api-get-customer">
    <http:listener config-ref="HTTP_Listener_config" path="/customers/{id}"/>

    <db:select config-ref="Database_Config">
        <db:sql>
            SELECT id, name, email, phone, address
            FROM customers
            WHERE id = :customerId
        </db:sql>
        <db:input-parameters>
            #[{ customerId: attributes.uriParams.id }]
        </db:input-parameters>
    </db:select>

    <ee:transform>
        <ee:message>
            <ee:set-payload><![CDATA[%dw 2.0
output application/json
---
{
    customerId: payload[0].id,
    name: payload[0].name,
    email: payload[0].email,
    phone: payload[0].phone,
    address: payload[0].address
}]]></ee:set-payload>
        </ee:message>
    </ee:transform>
</flow>`
        },
        {
          name: 'Process APIs',
          explanation: 'Orchestrate multiple system APIs. Business logic and validation. Cross-system data aggregation. Workflow and process automation. Owned by line-of-business teams. Reusable across experiences. Domain-driven design alignment.',
          codeExample: `<!-- Process API - Order Orchestration -->
<flow name="process-api-create-order">
    <http:listener config-ref="HTTP_Listener_config" path="/orders"/>

    <!-- Validate customer -->
    <http:request config-ref="Customer_System_API"
                  path="/customers/{payload.customerId}"
                  method="GET"/>
    <set-variable variableName="customer" value="#[payload]"/>

    <!-- Check inventory -->
    <http:request config-ref="Inventory_System_API"
                  path="/inventory/check"
                  method="POST">
        <http:body>#[payload.items]</http:body>
    </http:request>

    <!-- Create order -->
    <http:request config-ref="Order_System_API"
                  path="/orders"
                  method="POST">
        <http:body><![CDATA[#[{
            customerId: vars.customer.id,
            items: payload.availableItems,
            total: sum(payload.availableItems map $.price)
        }]]]></http:body>
    </http:request>
</flow>`
        },
        {
          name: 'Experience APIs',
          explanation: 'Tailored for specific consumers. Mobile, web, partner channels. Optimized response payloads. Consumer-specific authentication. Rapid iteration and deployment. Owned by digital teams. BFF (Backend for Frontend) pattern.',
          codeExample: `<!-- Experience API - Mobile App -->
<flow name="experience-api-mobile-dashboard">
    <http:listener config-ref="HTTP_Listener_config" path="/mobile/dashboard"/>

    <!-- Get customer profile -->
    <http:request config-ref="Customer_Process_API"
                  path="/customers/{attributes.headers.userId}"
                  method="GET"/>
    <set-variable variableName="profile" value="#[payload]"/>

    <!-- Get recent orders -->
    <http:request config-ref="Order_Process_API"
                  path="/orders"
                  method="GET">
        <http:query-params>
            #[{ customerId: vars.profile.id, limit: 5 }]
        </http:query-params>
    </http:request>
    <set-variable variableName="orders" value="#[payload]"/>

    <!-- Compose mobile-optimized response -->
    <ee:transform>
        <ee:message>
            <ee:set-payload><![CDATA[%dw 2.0
output application/json
---
{
    user: {
        name: vars.profile.name,
        avatar: vars.profile.avatarUrl
    },
    recentOrders: vars.orders map {
        id: $.orderId,
        date: $.createdAt,
        total: $.totalAmount,
        status: $.status
    },
    quickActions: ["Reorder", "Track", "Support"]
}]]></ee:set-payload>
        </ee:message>
    </ee:transform>
</flow>`
        }
      ]
    },
    {
      id: 'cloudhub',
      name: 'CloudHub',
      icon: '☁️',
      color: '#06b6d4',
      description: 'Fully managed cloud integration platform-as-a-service (iPaaS)',
      diagram: CloudHubDiagram,
      details: [
        {
          name: 'Deployment',
          diagram: CloudHubDiagram,
          explanation: 'One-click deployment from Anypoint Studio. Environment management (sandbox, production). Worker sizing (vCore allocation). Multi-region deployment options. Rolling updates for zero downtime. Deployment history and rollback. CI/CD integration.',
          codeExample: `# Maven Deploy to CloudHub
mvn clean package deploy -DmuleDeploy \
  -Dmule.version=4.4.0 \
  -Danypoint.username=\${USERNAME} \
  -Danypoint.password=\${PASSWORD} \
  -DcloudhubApplication.name=customer-api \
  -DcloudhubApplication.region=us-east-1 \
  -DcloudhubApplication.workers=2 \
  -DcloudhubApplication.workerType=MICRO \
  -Denv=production

# CloudHub Properties
mule.env=production
mule.key=\${secure::encryption.key}
db.host=prod-database.example.com
db.port=3306
api.client.id=\${secure::api.client.id}
api.client.secret=\${secure::api.client.secret}`
        },
        {
          name: 'Networking',
          explanation: 'Dedicated load balancers. VPC for private connectivity. VPN tunnels to on-premises. Static IP addresses. SSL certificate management. DDoS protection. Custom domains and vanity URLs.',
          codeExample: `# CloudHub VPC Configuration
anypoint-cli vpc create \
  --name production-vpc \
  --region us-east-1 \
  --cidrBlock 10.111.0.0/24 \
  --isDefault false

# VPN Tunnel Configuration
anypoint-cli vpn create \
  --vpc production-vpc \
  --name on-prem-vpn \
  --remoteIp 203.0.113.1 \
  --tunnelConfigs "localAsn=65001,remoteAsn=65000" \
  --psk \${VPN_PRESHARED_KEY}

# Dedicated Load Balancer
anypoint-cli dlb create \
  --name production-lb \
  --vpc production-vpc \
  --defaultCertificate /path/to/cert.pem \
  --privateKey /path/to/key.pem`
        },
        {
          name: 'Operations',
          explanation: 'Application monitoring and logging. Log forwarding to Splunk, ELK. Alert definitions and escalations. Scheduler for batch jobs. Object store for persistence. Insight into runtime metrics. Support for production issues.',
          codeExample: `<!-- CloudHub Object Store -->
<os:object-store name="Object_store" persistent="true"/>

<flow name="save-to-object-store">
    <os:store key="#[payload.orderId]" objectStore="Object_store">
        <os:value>#[payload]</os:value>
    </os:store>
</flow>

<!-- CloudHub Scheduler -->
<flow name="scheduled-batch-job">
    <scheduler>
        <scheduling-strategy>
            <cron expression="0 0 2 * * ?" timeZone="America/New_York"/>
        </scheduling-strategy>
    </scheduler>

    <logger message="Starting nightly batch process"/>
    <flow-ref name="process-batch-orders"/>
</flow>

<!-- Custom Metrics for Anypoint Monitoring -->
<custom-metrics:send config-ref="Custom_Metrics_Config">
    <custom-metrics:metrics>
        #[[{
            name: "orders.processed",
            value: vars.orderCount,
            timestamp: now()
        }]]
    </custom-metrics:metrics>
</custom-metrics:send>`
        }
      ]
    },
    {
      id: 'security',
      name: 'Security',
      icon: '🔒',
      color: '#dc2626',
      description: 'Comprehensive security features for protecting APIs, data, and integrations',
      diagram: SecurityDiagram,
      details: [
        {
          name: 'Authentication',
          diagram: SecurityDiagram,
          explanation: 'OAuth 2.0 provider and client. OpenID Connect support. SAML for enterprise SSO. LDAP integration. API key management. Client credentials flow. JWT token validation and generation.',
          codeExample: `<!-- OAuth 2.0 Token Validation -->
<oauth2-provider:config name="OAuth2_Provider_config">
    <oauth2-provider:token-config
        path="/oauth/token"
        tokenStore="tokenStore"/>
    <oauth2-provider:clients>
        <oauth2-provider:client
            clientId="\${oauth.client.id}"
            secret="\${oauth.client.secret}"
            type="CONFIDENTIAL"
            clientName="Mobile App"
            authorizedGrantTypes="AUTHORIZATION_CODE,REFRESH_TOKEN"/>
    </oauth2-provider:clients>
</oauth2-provider:config>

<!-- JWT Token Generation -->
<flow name="generate-jwt-token">
    <ee:transform>
        <ee:message>
            <ee:set-payload><![CDATA[%dw 2.0
output application/java
import * from dw::Crypto
---
{
    token: JWT({
        sub: payload.userId,
        iss: "https://api.example.com",
        aud: "mobile-app",
        exp: now() + |PT1H|
    }) signWith "HS256" and "\${jwt.secret}"
}]]></ee:set-payload>
        </ee:message>
    </ee:transform>
</flow>`
        },
        {
          name: 'Authorization',
          explanation: 'Role-based access control (RBAC). API-level permissions. Environment-based access. Team and organization hierarchy. Fine-grained resource access. Custom permission schemes. Audit trail for compliance.',
          codeExample: `<!-- Custom Authorization Logic -->
<flow name="check-authorization">
    <http:listener config-ref="HTTP_Listener_config" path="/api/*"/>

    <!-- Extract token -->
    <set-variable variableName="token"
                  value="#[attributes.headers.authorization replace 'Bearer ' with '']"/>

    <!-- Validate permissions -->
    <ee:transform>
        <ee:message>
            <ee:set-variable variableName="claims"><![CDATA[%dw 2.0
output application/java
import * from dw::Crypto
---
JWT(vars.token) verifyWith "HS256" and "\${jwt.secret}"]]></ee:set-variable>
        </ee:message>
    </ee:transform>

    <!-- Check roles -->
    <choice>
        <when expression="#[vars.claims.roles contains 'ADMIN']">
            <logger message="Admin access granted"/>
        </when>
        <when expression="#[vars.claims.roles contains 'USER']">
            <logger message="User access granted"/>
        </when>
        <otherwise>
            <raise-error type="AUTHORIZATION:FORBIDDEN"/>
        </otherwise>
    </choice>
</flow>`
        },
        {
          name: 'Data Protection',
          explanation: 'TLS/SSL encryption in transit. Tokenization for sensitive data. Secure properties for credentials. Secrets management integration. PCI DSS compliance support. HIPAA-ready configurations. Data masking in logs.',
          codeExample: `<!-- Secure Configuration Properties -->
# secure-properties.yaml (encrypted)
secure::db.password=![encrypted_value]
secure::api.key=![encrypted_value]
secure::encryption.key=![encrypted_value]

<!-- Data Masking in Logs -->
<flow name="mask-sensitive-data">
    <logger level="INFO" message="#[
        %dw 2.0
        output application/json
        ---
        {
            customerId: payload.customerId,
            email: mask(payload.email, '*', 3, -10),
            creditCard: mask(payload.creditCard, 'X', 0, -4),
            ssn: '***-**-' ++ payload.ssn[-4 to -1]
        }
    ]"/>
</flow>

<!-- TLS Configuration -->
<http:listener-config name="HTTPS_Listener_config">
    <http:listener-connection
        host="0.0.0.0"
        port="8443"
        protocol="HTTPS">
        <tls:context>
            <tls:key-store
                path="keystore.jks"
                password="\${secure::keystore.password}"
                keyPassword="\${secure::key.password}"/>
        </tls:context>
    </http:listener-connection>
</http:listener-config>`
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
      { name: 'Messaging', icon: '📨', page: 'Messaging' },
      { name: 'MuleSoft', icon: '🔷', page: 'MuleSoft' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()  // Go back to Messaging main page
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)  // Close modal, stay on MuleSoft page
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
    background: 'linear-gradient(135deg, #67d4ff, #00a1e0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(0, 161, 224, 0.2)',
    border: '1px solid rgba(0, 161, 224, 0.3)',
    borderRadius: '0.5rem',
    color: '#67d4ff',
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
        <h1 style={titleStyle}>MuleSoft Anypoint Platform</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(0, 161, 224, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(0, 161, 224, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Messaging
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={MULESOFT_COLORS}
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
              colors={MULESOFT_COLORS}
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
                      language="xml"
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

export default MuleSoft

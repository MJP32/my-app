/**
 * Cloud Platforms Overview
 *
 * Comprehensive guide to cloud computing concepts including service models,
 * deployment models, cloud architecture, and multi-cloud strategies.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const CLOUD_COLORS = {
  primary: '#38bdf8',           // Sky blue
  primaryHover: '#7dd3fc',      // Lighter sky blue
  bg: 'rgba(56, 189, 248, 0.1)', // Background with transparency
  border: 'rgba(56, 189, 248, 0.3)', // Border color
  arrow: '#0ea5e9',             // Arrow/indicator color
  hoverBg: 'rgba(56, 189, 248, 0.2)', // Hover background
  topicBg: 'rgba(56, 189, 248, 0.2)'  // Topic card background
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

// Service Models Diagram (IaaS, PaaS, SaaS)
const ServiceModelsDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="iaasGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="paasGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#15803d" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="saasGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#b45309" stopOpacity="0.8" />
      </linearGradient>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Cloud Service Models
    </text>

    {/* IaaS Column */}
    <g>
      <rect x="50" y="60" width="200" height="220" rx="8" fill="url(#iaasGrad)" stroke="#60a5fa" strokeWidth="2"/>
      <text x="150" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">IaaS</text>
      <text x="150" y="105" textAnchor="middle" fill="#bfdbfe" fontSize="11">(Infrastructure as a Service)</text>

      {/* IaaS Layers */}
      <rect x="70" y="120" width="160" height="30" rx="4" fill="rgba(0,0,0,0.3)" stroke="#60a5fa" strokeWidth="1"/>
      <text x="150" y="138" textAnchor="middle" fill="white" fontSize="10">Applications</text>

      <rect x="70" y="155" width="160" height="30" rx="4" fill="rgba(0,0,0,0.3)" stroke="#60a5fa" strokeWidth="1"/>
      <text x="150" y="173" textAnchor="middle" fill="white" fontSize="10">{`Data & Runtime`}</text>

      <rect x="70" y="190" width="160" height="30" rx="4" fill="rgba(255,255,255,0.2)" stroke="#60a5fa" strokeWidth="2"/>
      <text x="150" y="208" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{`OS & Middleware`}</text>

      <rect x="70" y="225" width="160" height="25" rx="4" fill="rgba(255,255,255,0.2)" stroke="#60a5fa" strokeWidth="2"/>
      <text x="150" y="241" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Servers</text>

      <rect x="70" y="253" width="160" height="20" rx="4" fill="rgba(255,255,255,0.2)" stroke="#60a5fa" strokeWidth="2"/>
      <text x="150" y="267" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Storage/Network</text>
    </g>

    {/* PaaS Column */}
    <g>
      <rect x="300" y="60" width="200" height="220" rx="8" fill="url(#paasGrad)" stroke="#4ade80" strokeWidth="2"/>
      <text x="400" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PaaS</text>
      <text x="400" y="105" textAnchor="middle" fill="#bbf7d0" fontSize="11">(Platform as a Service)</text>

      {/* PaaS Layers */}
      <rect x="320" y="120" width="160" height="30" rx="4" fill="rgba(0,0,0,0.3)" stroke="#4ade80" strokeWidth="1"/>
      <text x="400" y="138" textAnchor="middle" fill="white" fontSize="10">Applications</text>

      <rect x="320" y="155" width="160" height="30" rx="4" fill="rgba(0,0,0,0.3)" stroke="#4ade80" strokeWidth="1"/>
      <text x="400" y="173" textAnchor="middle" fill="white" fontSize="10">Data</text>

      <rect x="320" y="190" width="160" height="30" rx="4" fill="rgba(255,255,255,0.2)" stroke="#4ade80" strokeWidth="2"/>
      <text x="400" y="208" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Runtime</text>

      <rect x="320" y="225" width="160" height="25" rx="4" fill="rgba(255,255,255,0.2)" stroke="#4ade80" strokeWidth="2"/>
      <text x="400" y="241" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{`Middleware & OS`}</text>

      <rect x="320" y="253" width="160" height="20" rx="4" fill="rgba(255,255,255,0.2)" stroke="#4ade80" strokeWidth="2"/>
      <text x="400" y="267" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Infrastructure</text>
    </g>

    {/* SaaS Column */}
    <g>
      <rect x="550" y="60" width="200" height="220" rx="8" fill="url(#saasGrad)" stroke="#fbbf24" strokeWidth="2"/>
      <text x="650" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">SaaS</text>
      <text x="650" y="105" textAnchor="middle" fill="#fef3c7" fontSize="11">(Software as a Service)</text>

      {/* SaaS Layers - All managed */}
      <rect x="570" y="120" width="160" height="30" rx="4" fill="rgba(255,255,255,0.2)" stroke="#fbbf24" strokeWidth="2"/>
      <text x="650" y="138" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Applications</text>

      <rect x="570" y="155" width="160" height="30" rx="4" fill="rgba(255,255,255,0.2)" stroke="#fbbf24" strokeWidth="2"/>
      <text x="650" y="173" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Data</text>

      <rect x="570" y="190" width="160" height="30" rx="4" fill="rgba(255,255,255,0.2)" stroke="#fbbf24" strokeWidth="2"/>
      <text x="650" y="208" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Runtime</text>

      <rect x="570" y="225" width="160" height="25" rx="4" fill="rgba(255,255,255,0.2)" stroke="#fbbf24" strokeWidth="2"/>
      <text x="650" y="241" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{`Middleware & OS`}</text>

      <rect x="570" y="253" width="160" height="20" rx="4" fill="rgba(255,255,255,0.2)" stroke="#fbbf24" strokeWidth="2"/>
      <text x="650" y="267" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Infrastructure</text>
    </g>
  </svg>
)

// Deployment Models Diagram
const DeploymentModelsDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowCloud" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Cloud Deployment Models
    </text>

    {/* Public Cloud */}
    <g>
      <rect x="30" y="60" width="170" height="90" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
      <text x="115" y="85" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">Public Cloud</text>
      <text x="115" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Multi-tenant</text>
      <text x="115" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Shared Resources</text>
      <text x="115" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Internet Access</text>
    </g>

    {/* Private Cloud */}
    <g>
      <rect x="230" y="60" width="170" height="90" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
      <text x="315" y="85" textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="bold">Private Cloud</text>
      <text x="315" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Single Tenant</text>
      <text x="315" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Dedicated Resources</text>
      <text x="315" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">On-premise/Hosted</text>
    </g>

    {/* Hybrid Cloud */}
    <g>
      <rect x="430" y="60" width="170" height="90" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
      <text x="515" y="85" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Hybrid Cloud</text>
      <text x="515" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Mixed Deployment</text>
      <text x="515" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Public + Private</text>
      <text x="515" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Orchestrated</text>
    </g>

    {/* Multi-Cloud */}
    <g>
      <rect x="630" y="60" width="140" height="90" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
      <text x="700" y="85" textAnchor="middle" fill="#a78bfa" fontSize="13" fontWeight="bold">Multi-Cloud</text>
      <text x="700" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Multiple Providers</text>
      <text x="700" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Best-of-Breed</text>
      <text x="700" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Avoid Lock-in</text>
    </g>

    {/* Benefits Section */}
    <text x="400" y="180" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Key Characteristics</text>

    <g>
      <circle cx="100" cy="210" r="3" fill="#3b82f6"/>
      <text x="110" y="214" fill="#94a3b8" fontSize="10">Cost-effective</text>

      <circle cx="100" cy="230" r="3" fill="#3b82f6"/>
      <text x="110" y="234" fill="#94a3b8" fontSize="10">High scalability</text>

      <circle cx="100" cy="250" r="3" fill="#3b82f6"/>
      <text x="110" y="254" fill="#94a3b8" fontSize="10">Pay-as-you-go</text>
    </g>

    <g>
      <circle cx="280" cy="210" r="3" fill="#22c55e"/>
      <text x="290" y="214" fill="#94a3b8" fontSize="10">Enhanced security</text>

      <circle cx="280" cy="230" r="3" fill="#22c55e"/>
      <text x="290" y="234" fill="#94a3b8" fontSize="10">Full control</text>

      <circle cx="280" cy="250" r="3" fill="#22c55e"/>
      <text x="290" y="254" fill="#94a3b8" fontSize="10">Compliance</text>
    </g>

    <g>
      <circle cx="460" cy="210" r="3" fill="#f59e0b"/>
      <text x="470" y="214" fill="#94a3b8" fontSize="10">Flexibility</text>

      <circle cx="460" cy="230" r="3" fill="#f59e0b"/>
      <text x="470" y="234" fill="#94a3b8" fontSize="10">Data sovereignty</text>

      <circle cx="460" cy="250" r="3" fill="#f59e0b"/>
      <text x="470" y="254" fill="#94a3b8" fontSize="10">Workload optimization</text>
    </g>

    <g>
      <circle cx="645" cy="210" r="3" fill="#8b5cf6"/>
      <text x="655" y="214" fill="#94a3b8" fontSize="10">Vendor diversity</text>

      <circle cx="645" cy="230" r="3" fill="#8b5cf6"/>
      <text x="655" y="234" fill="#94a3b8" fontSize="10">Resilience</text>

      <circle cx="645" cy="250" r="3" fill="#8b5cf6"/>
      <text x="655" y="254" fill="#94a3b8" fontSize="10">Innovation</text>
    </g>
  </svg>
)

// Cloud Architecture Diagram
const CloudArchitectureDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowArch" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
      </marker>
      <linearGradient id="layerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
      </linearGradient>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Cloud Architecture Layers
    </text>

    {/* User Layer */}
    <rect x="50" y="50" width="700" height="50" rx="8" fill="url(#layerGrad)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">User Interface Layer</text>
    <text x="400" y="88" textAnchor="middle" fill="#94a3b8" fontSize="10">Web, Mobile, Desktop Applications</text>

    {/* Arrow */}
    <line x1="400" y1="105" x2="400" y2="125" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowArch)"/>

    {/* API Gateway Layer */}
    <rect x="50" y="130" width="700" height="50" rx="8" fill="url(#layerGrad)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="150" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">{`API Gateway & Load Balancer`}</text>
    <text x="400" y="168" textAnchor="middle" fill="#94a3b8" fontSize="10">Request Routing, Authentication, Rate Limiting</text>

    {/* Arrow */}
    <line x1="400" y1="185" x2="400" y2="205" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowArch)"/>

    {/* Application Layer */}
    <rect x="50" y="210" width="330" height="60" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="215" y="230" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Application Services</text>
    <text x="215" y="248" textAnchor="middle" fill="#94a3b8" fontSize="9">Microservices</text>
    <text x="215" y="262" textAnchor="middle" fill="#94a3b8" fontSize="9">Containers, Serverless Functions</text>

    {/* Data Layer */}
    <rect x="420" y="210" width="330" height="60" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="585" y="230" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Data Services</text>
    <text x="585" y="248" textAnchor="middle" fill="#94a3b8" fontSize="9">Databases, Caching</text>
    <text x="585" y="262" textAnchor="middle" fill="#94a3b8" fontSize="9">Message Queues, Storage</text>

    {/* Arrows to Infrastructure */}
    <line x1="215" y1="275" x2="215" y2="295" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowArch)"/>
    <line x1="585" y1="275" x2="585" y2="295" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowArch)"/>

    {/* Infrastructure Layer */}
    <rect x="50" y="300" width="700" height="40" rx="8" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="2"/>
    <text x="400" y="323" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Infrastructure Layer (Compute, Storage, Network)</text>
  </svg>
)

// Multi-Cloud Strategy Diagram
const MultiCloudDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowMulti" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Multi-Cloud Architecture
    </text>

    {/* Central Management */}
    <rect x="300" y="50" width="200" height="60" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="bold">Multi-Cloud Management</text>
    <text x="400" y="93" textAnchor="middle" fill="#94a3b8" fontSize="10">{`Orchestration & Governance`}</text>

    {/* Arrows to clouds */}
    <line x1="330" y1="110" x2="150" y2="160" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowMulti)"/>
    <line x1="400" y1="110" x2="400" y2="160" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowMulti)"/>
    <line x1="470" y1="110" x2="650" y2="160" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowMulti)"/>

    {/* AWS Cloud */}
    <g>
      <ellipse cx="150" cy="195" rx="120" ry="75" fill="rgba(255, 153, 0, 0.2)" stroke="#ff9900" strokeWidth="2"/>
      <text x="150" y="185" textAnchor="middle" fill="#ff9900" fontSize="14" fontWeight="bold">AWS</text>
      <text x="150" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">EC2, S3, Lambda</text>
      <text x="150" y="220" textAnchor="middle" fill="#94a3b8" fontSize="9">RDS, DynamoDB</text>
      <text x="150" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">CloudFront, Route53</text>
    </g>

    {/* GCP Cloud */}
    <g>
      <ellipse cx="400" cy="195" rx="120" ry="75" fill="rgba(66, 133, 244, 0.2)" stroke="#4285f4" strokeWidth="2"/>
      <text x="400" y="185" textAnchor="middle" fill="#4285f4" fontSize="14" fontWeight="bold">GCP</text>
      <text x="400" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">Compute Engine</text>
      <text x="400" y="220" textAnchor="middle" fill="#94a3b8" fontSize="9">Cloud Storage, BigQuery</text>
      <text x="400" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">Cloud Functions, GKE</text>
    </g>

    {/* Azure Cloud */}
    <g>
      <ellipse cx="650" cy="195" rx="120" ry="75" fill="rgba(0, 120, 212, 0.2)" stroke="#0078d4" strokeWidth="2"/>
      <text x="650" y="185" textAnchor="middle" fill="#0078d4" fontSize="14" fontWeight="bold">Azure</text>
      <text x="650" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">Virtual Machines</text>
      <text x="650" y="220" textAnchor="middle" fill="#94a3b8" fontSize="9">Blob Storage, Cosmos DB</text>
      <text x="650" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">Azure Functions, AKS</text>
    </g>

    {/* Benefits */}
    <text x="400" y="295" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Key Benefits</text>
    <text x="200" y="315" textAnchor="middle" fill="#94a3b8" fontSize="10">Avoid vendor lock-in</text>
    <text x="400" y="315" textAnchor="middle" fill="#94a3b8" fontSize="10">{`Optimize costs & performance`}</text>
    <text x="600" y="315" textAnchor="middle" fill="#94a3b8" fontSize="10">Increase resilience</text>
  </svg>
)

// Scalability Diagram
const ScalabilityDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowScale" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Cloud Scalability Models
    </text>

    {/* Vertical Scaling */}
    <g>
      <text x="200" y="65" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Vertical Scaling (Scale Up)</text>

      {/* Small server */}
      <rect x="120" y="90" width="60" height="80" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
      <text x="150" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">2 CPU</text>
      <text x="150" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">4GB RAM</text>
      <text x="150" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">100GB</text>

      {/* Arrow */}
      <line x1="190" y1="130" x2="210" y2="130" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowScale)"/>

      {/* Large server */}
      <rect x="220" y="80" width="80" height="100" rx="4" fill="rgba(59, 130, 246, 0.5)" stroke="#3b82f6" strokeWidth="3"/>
      <text x="260" y="120" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">16 CPU</text>
      <text x="260" y="140" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">64GB RAM</text>
      <text x="260" y="160" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">1TB</text>

      {/* Label */}
      <text x="200" y="200" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
        More powerful hardware
      </text>
    </g>

    {/* Horizontal Scaling */}
    <g>
      <text x="550" y="65" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Horizontal Scaling (Scale Out)</text>

      {/* Single server */}
      <rect x="460" y="90" width="60" height="80" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
      <text x="490" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">Server 1</text>
      <text x="490" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">4 CPU</text>
      <text x="490" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">8GB RAM</text>

      {/* Arrow */}
      <line x1="530" y1="130" x2="550" y2="130" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowScale)"/>

      {/* Multiple servers */}
      <rect x="560" y="90" width="50" height="80" rx="4" fill="rgba(34, 197, 94, 0.5)" stroke="#22c55e" strokeWidth="2"/>
      <text x="585" y="128" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">S1</text>

      <rect x="620" y="90" width="50" height="80" rx="4" fill="rgba(34, 197, 94, 0.5)" stroke="#22c55e" strokeWidth="2"/>
      <text x="645" y="128" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">S2</text>

      <rect x="680" y="90" width="50" height="80" rx="4" fill="rgba(34, 197, 94, 0.5)" stroke="#22c55e" strokeWidth="2"/>
      <text x="705" y="128" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">S3</text>

      {/* Load balancer */}
      <rect x="590" y="45" width="90" height="30" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
      <text x="635" y="64" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Load Balancer</text>

      {/* Label */}
      <text x="635" y="200" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
        More instances
      </text>
    </g>

    {/* Comparison Table */}
    <g>
      <text x="400" y="235" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">Comparison</text>

      <text x="200" y="260" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Vertical</text>
      <text x="200" y="278" textAnchor="middle" fill="#94a3b8" fontSize="9">• Limited by hardware</text>
      <text x="200" y="293" textAnchor="middle" fill="#94a3b8" fontSize="9">• Single point of failure</text>

      <text x="550" y="260" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Horizontal</text>
      <text x="550" y="278" textAnchor="middle" fill="#94a3b8" fontSize="9">• Near-unlimited scaling</text>
      <text x="550" y="293" textAnchor="middle" fill="#94a3b8" fontSize="9">• High availability</text>
    </g>
  </svg>
)

// Security Diagram
const SecurityDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowSec" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
      </marker>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#15803d" stopOpacity="0.4" />
      </linearGradient>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Cloud Security Layers
    </text>

    {/* Shield Background */}
    <path d="M 400 60 Q 480 60 480 100 L 480 200 Q 480 260 400 300 Q 320 260 320 200 L 320 100 Q 320 60 400 60 Z"
          fill="url(#shieldGrad)" stroke="#22c55e" strokeWidth="3" opacity="0.3"/>

    {/* Layer 1: Physical Security */}
    <g>
      <rect x="350" y="250" width="100" height="35" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
      <text x="400" y="272" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Physical Security</text>
      <text x="245" y="268" textAnchor="end" fill="#94a3b8" fontSize="9">Data centers, biometrics</text>
    </g>

    {/* Layer 2: Network Security */}
    <g>
      <rect x="340" y="205" width="120" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
      <text x="400" y="227" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Network Security</text>
      <text x="560" y="223" textAnchor="start" fill="#94a3b8" fontSize="9">Firewalls, VPN, DDoS</text>
    </g>

    {/* Layer 3: Compute Security */}
    <g>
      <rect x="330" y="160" width="140" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
      <text x="400" y="182" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Compute Security</text>
      <text x="245" y="178" textAnchor="end" fill="#94a3b8" fontSize="9">VM isolation, containers</text>
    </g>

    {/* Layer 4: Storage Security */}
    <g>
      <rect x="320" y="115" width="160" height="35" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
      <text x="400" y="137" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Storage Security</text>
      <text x="560" y="133" textAnchor="start" fill="#94a3b8" fontSize="9">Encryption at rest</text>
    </g>

    {/* Layer 5: Application Security */}
    <g>
      <rect x="310" y="70" width="180" height="35" rx="4" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
      <text x="400" y="92" textAnchor="middle" fill="#f9a8d4" fontSize="11" fontWeight="bold">Application Security</text>
      <text x="245" y="88" textAnchor="end" fill="#94a3b8" fontSize="9">WAF, API security, IAM</text>
    </g>

    {/* Key Security Concepts */}
    <g>
      <text x="100" y="70" textAnchor="start" fill="#94a3b8" fontSize="12" fontWeight="bold">Key Concepts:</text>

      <circle cx="50" cy="95" r="3" fill="#38bdf8"/>
      <text x="60" y="99" fill="#94a3b8" fontSize="10">{`Identity & Access Management`}</text>

      <circle cx="50" cy="115" r="3" fill="#38bdf8"/>
      <text x="60" y="119" fill="#94a3b8" fontSize="10">{`Encryption (in-transit & at-rest)`}</text>

      <circle cx="50" cy="135" r="3" fill="#38bdf8"/>
      <text x="60" y="139" fill="#94a3b8" fontSize="10">{`Security Groups & NACLs`}</text>

      <circle cx="50" cy="155" r="3" fill="#38bdf8"/>
      <text x="60" y="159" fill="#94a3b8" fontSize="10">{`Compliance & Auditing`}</text>

      <circle cx="50" cy="175" r="3" fill="#38bdf8"/>
      <text x="60" y="179" fill="#94a3b8" fontSize="10">Shared Responsibility Model</text>

      <circle cx="50" cy="195" r="3" fill="#38bdf8"/>
      <text x="60" y="199" fill="#94a3b8" fontSize="10">{`Security Monitoring & Logging`}</text>
    </g>

    {/* Compliance */}
    <g>
      <text x="700" y="295" textAnchor="end" fill="#94a3b8" fontSize="11" fontWeight="bold">Compliance:</text>
      <text x="700" y="310" textAnchor="end" fill="#94a3b8" fontSize="9">GDPR, HIPAA</text>
      <text x="700" y="325" textAnchor="end" fill="#94a3b8" fontSize="9">SOC 2, ISO 27001</text>
      <text x="700" y="340" textAnchor="end" fill="#94a3b8" fontSize="9">PCI DSS</text>
    </g>
  </svg>
)

// Cost Optimization Diagram
const CostOptimizationDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowCost" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Cloud Cost Optimization Strategies
    </text>

    {/* Right-sizing */}
    <g>
      <rect x="50" y="60" width="160" height="70" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
      <text x="130" y="85" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Right-sizing</text>
      <text x="130" y="103" textAnchor="middle" fill="#94a3b8" fontSize="9">Match resources</text>
      <text x="130" y="118" textAnchor="middle" fill="#94a3b8" fontSize="9">to actual usage</text>
    </g>

    {/* Reserved Instances */}
    <g>
      <rect x="230" y="60" width="160" height="70" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
      <text x="310" y="85" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Reserved Instances</text>
      <text x="310" y="103" textAnchor="middle" fill="#94a3b8" fontSize="9">Commit for discounts</text>
      <text x="310" y="118" textAnchor="middle" fill="#94a3b8" fontSize="9">Up to 75% savings</text>
    </g>

    {/* Spot Instances */}
    <g>
      <rect x="410" y="60" width="160" height="70" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
      <text x="490" y="85" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Spot Instances</text>
      <text x="490" y="103" textAnchor="middle" fill="#94a3b8" fontSize="9">Use spare capacity</text>
      <text x="490" y="118" textAnchor="middle" fill="#94a3b8" fontSize="9">Up to 90% savings</text>
    </g>

    {/* Auto-scaling */}
    <g>
      <rect x="590" y="60" width="160" height="70" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
      <text x="670" y="85" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Auto-scaling</text>
      <text x="670" y="103" textAnchor="middle" fill="#94a3b8" fontSize="9">Scale dynamically</text>
      <text x="670" y="118" textAnchor="middle" fill="#94a3b8" fontSize="9">Pay for what you use</text>
    </g>

    {/* Storage Tiering */}
    <g>
      <rect x="140" y="160" width="160" height="70" rx="8" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
      <text x="220" y="185" textAnchor="middle" fill="#f9a8d4" fontSize="12" fontWeight="bold">Storage Tiering</text>
      <text x="220" y="203" textAnchor="middle" fill="#94a3b8" fontSize="9">Move to cheaper tiers</text>
      <text x="220" y="218" textAnchor="middle" fill="#94a3b8" fontSize="9">Hot → Warm → Cold</text>
    </g>

    {/* Monitoring */}
    <g>
      <rect x="320" y="160" width="160" height="70" rx="8" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
      <text x="400" y="185" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="bold">Cost Monitoring</text>
      <text x="400" y="203" textAnchor="middle" fill="#94a3b8" fontSize="9">{`Track & analyze`}</text>
      <text x="400" y="218" textAnchor="middle" fill="#94a3b8" fontSize="9">{`Set budgets & alerts`}</text>
    </g>

    {/* Resource Cleanup */}
    <g>
      <rect x="500" y="160" width="160" height="70" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
      <text x="580" y="185" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Resource Cleanup</text>
      <text x="580" y="203" textAnchor="middle" fill="#94a3b8" fontSize="9">Delete unused resources</text>
      <text x="580" y="218" textAnchor="middle" fill="#94a3b8" fontSize="9">Schedule shutdowns</text>
    </g>

    {/* Savings Indicator */}
    <g>
      <text x="400" y="260" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Potential Savings: 40-70%</text>
      <text x="400" y="278" textAnchor="middle" fill="#94a3b8" fontSize="10">With proper optimization strategies</text>
    </g>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Cloud({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'service-models',
      name: 'Cloud Service Models',
      icon: '☁️',
      color: '#3b82f6',
      description: 'Understanding IaaS, PaaS, and SaaS - the fundamental cloud service delivery models.',
      diagram: ServiceModelsDiagram,
      details: [
        {
          name: 'IaaS - Infrastructure as a Service',
          diagram: ServiceModelsDiagram,
          explanation: 'IaaS provides virtualized computing resources over the internet. You manage the operating system, middleware, runtime, data, and applications, while the provider manages the underlying infrastructure including servers, storage, and networking. Examples include Amazon EC2, Google Compute Engine, and Azure Virtual Machines. IaaS offers maximum flexibility and control, ideal for lift-and-shift migrations and custom application deployments.',
          codeExample: `# Terraform example - Provisioning IaaS resources
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.medium"

  tags = {
    Name = "WebServer"
    Environment = "Production"
  }

  root_block_device {
    volume_size = 100
    volume_type = "gp3"
  }
}

resource "aws_ebs_volume" "data_volume" {
  availability_zone = aws_instance.web_server.availability_zone
  size             = 500
  type             = "gp3"

  tags = {
    Name = "DataVolume"
  }
}`
        },
        {
          name: 'PaaS - Platform as a Service',
          explanation: 'PaaS provides a complete development and deployment environment in the cloud. The platform includes infrastructure plus middleware, development tools, database management, and business intelligence services. You focus on your application and data while the provider manages everything else. Examples include Heroku, Google App Engine, AWS Elastic Beanstalk, and Azure App Service. PaaS accelerates development and reduces operational overhead.',
          codeExample: `# app.yaml - Google App Engine (PaaS) configuration
runtime: nodejs16
service: default

env_variables:
  NODE_ENV: "production"
  DATABASE_URL: "postgres://user:pass@host:5432/db"

automatic_scaling:
  target_cpu_utilization: 0.65
  min_instances: 2
  max_instances: 20
  min_pending_latency: 30ms
  max_pending_latency: 100ms

handlers:
- url: /static
  static_dir: public
  secure: always

- url: /.*
  script: auto
  secure: always`
        },
        {
          name: 'SaaS - Software as a Service',
          explanation: 'SaaS delivers complete, ready-to-use applications over the internet on a subscription basis. The provider manages everything from infrastructure to application, including updates, security, and availability. Users simply access the application through a web browser or API. Examples include Salesforce, Google Workspace, Microsoft 365, and Slack. SaaS offers the lowest maintenance overhead and fastest time to value.',
          codeExample: `// Integrating with SaaS - Salesforce API example
const salesforce = require('jsforce');

async function createLead() {
  const conn = new salesforce.Connection({
    oauth2: {
      clientId: process.env.SF_CLIENT_ID,
      clientSecret: process.env.SF_CLIENT_SECRET,
      redirectUri: 'http://localhost:3000/oauth/callback'
    }
  });

  await conn.login(
    process.env.SF_USERNAME,
    process.env.SF_PASSWORD + process.env.SF_TOKEN
  );

  const result = await conn.sobject('Lead').create({
    FirstName: 'John',
    LastName: 'Doe',
    Company: 'Acme Corp',
    Email: 'john.doe@acme.com',
    Status: 'Open'
  });

  console.log('Lead created:', result.id);
  return result;
}`
        },
        {
          name: 'Comparison & Selection',
          explanation: 'Choosing between IaaS, PaaS, and SaaS depends on your control requirements, technical expertise, and business needs. IaaS offers maximum control and flexibility but requires more management. PaaS balances control and convenience, ideal for application development. SaaS provides the least control but maximum convenience and fastest deployment. Many organizations use a combination of all three models based on specific workload requirements.',
          codeExample: `// Decision matrix for service model selection
const serviceModelDecision = {
  iaas: {
    control: 'High',
    management: 'High effort',
    flexibility: 'Maximum',
    useCases: [
      'Custom infrastructure requirements',
      'Legacy application migration',
      'Full OS-level control needed',
      'Specific compliance requirements'
    ]
  },
  paas: {
    control: 'Medium',
    management: 'Low effort',
    flexibility: 'Moderate',
    useCases: [
      'Application development',
      'Microservices deployment',
      'API backends',
      'Focus on code, not infrastructure'
    ]
  },
  saas: {
    control: 'Low',
    management: 'Minimal effort',
    flexibility: 'Limited',
    useCases: [
      'Standard business applications',
      'Email, CRM, collaboration tools',
      'Quick deployment needed',
      'No IT resources for management'
    ]
  }
};`
        }
      ]
    },
    {
      id: 'deployment-models',
      name: 'Deployment Models',
      icon: '🌐',
      color: '#22c55e',
      description: 'Public, Private, Hybrid, and Multi-cloud deployment strategies and their trade-offs.',
      diagram: DeploymentModelsDiagram,
      details: [
        {
          name: 'Public Cloud',
          diagram: DeploymentModelsDiagram,
          explanation: 'Public cloud services are owned and operated by third-party providers and delivered over the internet. Resources are shared among multiple customers (multi-tenancy) and offered on a pay-as-you-go basis. Public clouds provide massive scale, global reach, and cost efficiency through economies of scale. They are ideal for variable workloads, development/testing environments, and applications requiring global distribution. Major providers include AWS, Azure, and GCP.',
          codeExample: `// AWS SDK - Public Cloud Resource Provisioning
const AWS = require('aws-sdk');

const ec2 = new AWS.EC2({ region: 'us-east-1' });

async function launchPublicCloudInstance() {
  const params = {
    ImageId: 'ami-0c55b159cbfafe1f0',
    InstanceType: 't3.micro',
    MinCount: 1,
    MaxCount: 1,
    KeyName: 'my-key-pair',
    SecurityGroupIds: ['sg-0123456789abcdef0'],
    SubnetId: 'subnet-0bb1c79de3EXAMPLE',
    TagSpecifications: [{
      ResourceType: 'instance',
      Tags: [
        { Key: 'Name', Value: 'PublicCloudServer' },
        { Key: 'Environment', Value: 'Production' }
      ]
    }]
  };

  const result = await ec2.runInstances(params).promise();
  console.log('Instance ID:', result.Instances[0].InstanceId);
  return result;
}`
        },
        {
          name: 'Private Cloud',
          explanation: 'Private cloud infrastructure is dedicated to a single organization, offering enhanced security, control, and customization. It can be hosted on-premises or by a third-party provider. Private clouds provide compliance with strict regulatory requirements, full control over resources, and customizable security policies. They are ideal for sensitive workloads, regulated industries (healthcare, finance), and organizations with strict data sovereignty requirements. Examples include VMware vSphere, OpenStack, and Azure Stack.',
          codeExample: `# OpenStack - Private Cloud Configuration
heat_template_version: 2018-08-31

description: Private Cloud Web Application Stack

parameters:
  key_name:
    type: string
    description: Name of keypair for SSH access

resources:
  web_server:
    type: OS::Nova::Server
    properties:
      name: private-web-server
      image: Ubuntu-20.04
      flavor: m1.medium
      key_name: { get_param: key_name }
      networks:
        - network: private-network
      security_groups:
        - private-web-sg

  private_network:
    type: OS::Neutron::Net
    properties:
      name: isolated-network
      admin_state_up: true

  private_subnet:
    type: OS::Neutron::Subnet
    properties:
      network: { get_resource: private_network }
      cidr: 10.0.1.0/24
      dns_nameservers: [8.8.8.8, 8.8.4.4]`
        },
        {
          name: 'Hybrid Cloud',
          explanation: 'Hybrid cloud combines public and private clouds, allowing data and applications to move between them. This model provides greater flexibility, more deployment options, and optimizes existing infrastructure. Organizations can keep sensitive data in private cloud while leveraging public cloud for variable workloads. Hybrid cloud is ideal for burst scenarios, disaster recovery, and gradual cloud migration. Key technologies include AWS Outposts, Azure Arc, and Google Anthos.',
          codeExample: `// Azure Arc - Hybrid Cloud Management
const { ArcDataManagementClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

async function deployHybridApplication() {
  const credential = new DefaultAzureCredential();
  const client = new ArcDataManagementClient(credential, subscriptionId);

  // Deploy to on-premises Arc-enabled infrastructure
  const onPremDeployment = await client.sqlServerInstances.create(
    resourceGroup,
    "on-prem-sql",
    {
      location: "eastus",
      properties: {
        containerResourceId: "/subscriptions/.../kubernetes-cluster",
        dataControllerId: "/subscriptions/.../data-controller",
        admin: "admin",
        k8sRaw: {
          spec: {
            scheduling: {
              default: {
                resources: {
                  requests: { cpu: "2", memory: "4Gi" }
                }
              }
            }
          }
        }
      }
    }
  );

  // Sync with public cloud
  return { onPrem: onPremDeployment, cloudSync: true };
}`
        },
        {
          name: 'Multi-Cloud',
          diagram: MultiCloudDiagram,
          explanation: 'Multi-cloud strategy uses services from multiple cloud providers to avoid vendor lock-in, optimize costs, and leverage best-of-breed services. Organizations can choose AWS for compute, GCP for AI/ML, and Azure for enterprise integration. Multi-cloud increases resilience, enables geographic distribution, and provides negotiating leverage with vendors. Challenges include increased complexity, skills requirements, and management overhead. Tools like Terraform, Kubernetes, and service meshes help manage multi-cloud environments.',
          codeExample: `# Terraform - Multi-Cloud Infrastructure
# AWS Resources
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "data_lake" {
  bucket = "company-data-lake"
}

# GCP Resources
provider "google" {
  project = "my-project"
  region  = "us-central1"
}

resource "google_bigquery_dataset" "analytics" {
  dataset_id = "analytics_dataset"
  location   = "US"
}

# Azure Resources
provider "azurerm" {
  features {}
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "multi-cloud-aks"
  location            = "eastus"
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "multicloud"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D2_v2"
  }
}`
        }
      ]
    },
    {
      id: 'architecture',
      name: 'Cloud Architecture',
      icon: '🏗️',
      color: '#f59e0b',
      description: 'Designing scalable, resilient, and efficient cloud architectures with best practices.',
      diagram: CloudArchitectureDiagram,
      details: [
        {
          name: 'Well-Architected Framework',
          diagram: CloudArchitectureDiagram,
          explanation: 'Cloud architecture follows well-established principles across all major providers. The AWS Well-Architected Framework defines six pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability. Similar frameworks exist for Azure and GCP. These principles guide design decisions for scalability, security, resilience, and cost-effectiveness. Key patterns include microservices, serverless, event-driven architecture, and infrastructure as code.',
          codeExample: `// Cloud-Native Application Architecture (Node.js + AWS)
const express = require('express');
const AWS = require('aws-sdk');

// Configuration from environment
const app = express();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS();
const s3 = new AWS.S3();

// Health check endpoint for load balancer
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: Date.now() });
});

// Scalable data storage (DynamoDB)
app.post('/api/users', async (req, res) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    Item: {
      userId: req.body.userId,
      name: req.body.name,
      createdAt: Date.now()
    }
  };
  await dynamodb.put(params).promise();
  res.json({ success: true });
});

// Async processing (SQS)
app.post('/api/process', async (req, res) => {
  await sqs.sendMessage({
    QueueUrl: process.env.QUEUE_URL,
    MessageBody: JSON.stringify(req.body)
  }).promise();
  res.json({ queued: true });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});

const server = app.listen(process.env.PORT || 3000);`
        },
        {
          name: 'Microservices Architecture',
          explanation: 'Microservices decompose applications into small, independent services that communicate via APIs. Each service owns its data, can be deployed independently, and scaled separately. This architecture improves agility, fault isolation, and technology diversity. Cloud platforms provide ideal infrastructure for microservices through containers (Docker, Kubernetes), service mesh (Istio, Linkerd), and API gateways. Challenges include distributed system complexity, data consistency, and operational overhead.',
          codeExample: `// Kubernetes - Microservices Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: myregistry/user-service:v1.2.0
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer`
        },
        {
          name: 'Serverless Architecture',
          explanation: 'Serverless computing allows you to build and run applications without managing servers. You write code in functions that execute in response to events, and the cloud provider handles all infrastructure, scaling, and availability. Benefits include automatic scaling, pay-per-execution pricing, and zero infrastructure management. Use cases include APIs, data processing, event handling, and scheduled tasks. Major services include AWS Lambda, Azure Functions, and Google Cloud Functions.',
          codeExample: `// AWS Lambda - Serverless Function
exports.handler = async (event) => {
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  try {
    // Triggered by S3 upload event
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\\+/g, ' ')
    );

    // Get object from S3
    const s3Object = await s3.getObject({
      Bucket: bucket,
      Key: key
    }).promise();

    // Process data
    const data = JSON.parse(s3Object.Body.toString('utf-8'));

    // Store in DynamoDB
    await dynamodb.put({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: key,
        data: data,
        processedAt: new Date().toISOString()
      }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ processed: key })
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};`
        },
        {
          name: 'Event-Driven Architecture',
          explanation: 'Event-driven architecture uses events to trigger and communicate between decoupled services. Events represent state changes or significant occurrences in the system. This pattern enables loose coupling, scalability, and real-time processing. Cloud platforms provide event buses (EventBridge), message queues (SQS, Pub/Sub), and streaming platforms (Kinesis, Kafka) to implement event-driven systems. Common patterns include pub/sub, event sourcing, and CQRS (Command Query Responsibility Segregation).',
          codeExample: `// AWS EventBridge - Event-Driven Integration
const AWS = require('aws-sdk');
const eventbridge = new AWS.EventBridge();

// Publisher: Emit business events
async function publishOrderEvent(order) {
  const params = {
    Entries: [{
      Source: 'ecommerce.orders',
      DetailType: 'OrderPlaced',
      Detail: JSON.stringify({
        orderId: order.id,
        customerId: order.customerId,
        total: order.total,
        items: order.items
      }),
      EventBusName: 'default'
    }]
  };

  await eventbridge.putEvents(params).promise();
  console.log('Order event published:', order.id);
}

// Subscriber: Lambda function triggered by event
exports.handleOrderPlaced = async (event) => {
  const order = JSON.parse(event.detail);

  // Update inventory
  await updateInventory(order.items);

  // Send notification
  await sendOrderConfirmation(order.customerId, order.id);

  // Start fulfillment workflow
  await startFulfillment(order.id);

  return { statusCode: 200 };
};`
        }
      ]
    },
    {
      id: 'scalability',
      name: 'Scalability & Performance',
      icon: '📈',
      color: '#8b5cf6',
      description: 'Strategies for scaling applications and optimizing performance in the cloud.',
      diagram: ScalabilityDiagram,
      details: [
        {
          name: 'Horizontal vs Vertical Scaling',
          diagram: ScalabilityDiagram,
          explanation: 'Vertical scaling (scaling up) increases the capacity of a single resource by adding more CPU, RAM, or storage. Horizontal scaling (scaling out) adds more instances of resources to distribute load. Cloud environments excel at horizontal scaling through auto-scaling groups, load balancers, and distributed systems. Horizontal scaling provides better fault tolerance and near-unlimited growth potential, while vertical scaling is simpler but has hardware limits. Most cloud applications use horizontal scaling for stateless components and careful vertical scaling for databases.',
          codeExample: `// AWS Auto Scaling Configuration
{
  "AutoScalingGroupName": "web-app-asg",
  "MinSize": 2,
  "MaxSize": 20,
  "DesiredCapacity": 4,
  "LaunchTemplate": {
    "LaunchTemplateId": "lt-0123456789abcdef0",
    "Version": "$Latest"
  },
  "TargetGroupARNs": [
    "arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/web-tg/abc123"
  ],
  "HealthCheckType": "ELB",
  "HealthCheckGracePeriod": 300,
  "Tags": [{
    "Key": "Environment",
    "Value": "Production"
  }]
}

// Scaling Policies
{
  "PolicyName": "scale-up-on-cpu",
  "PolicyType": "TargetTrackingScaling",
  "TargetTrackingConfiguration": {
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ASGAverageCPUUtilization"
    },
    "TargetValue": 70.0,
    "ScaleInCooldown": 300,
    "ScaleOutCooldown": 60
  }
}`
        },
        {
          name: 'Load Balancing',
          explanation: 'Load balancers distribute incoming traffic across multiple targets (EC2 instances, containers, IP addresses) to ensure high availability and reliability. Application Load Balancers (ALB) operate at Layer 7 and support HTTP/HTTPS routing, while Network Load Balancers (NLB) operate at Layer 4 for TCP/UDP traffic. Load balancers perform health checks, SSL termination, and can route based on content, geography, or custom rules. They are essential for horizontal scaling and zero-downtime deployments.',
          codeExample: `// Terraform - Application Load Balancer Setup
resource "aws_lb" "web_alb" {
  name               = "web-application-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets           = aws_subnet.public[*].id

  enable_deletion_protection = true
  enable_http2              = true

  tags = {
    Environment = "production"
  }
}

resource "aws_lb_target_group" "web_tg" {
  name     = "web-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    path                = "/health"
    matcher             = "200"
  }

  stickiness {
    type            = "lb_cookie"
    cookie_duration = 86400
    enabled         = true
  }
}

resource "aws_lb_listener" "web_https" {
  load_balancer_arn = aws_lb.web_alb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = aws_acm_certificate.web_cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web_tg.arn
  }
}`
        },
        {
          name: 'Caching Strategies',
          explanation: 'Caching reduces latency and backend load by storing frequently accessed data closer to users or in memory. Content Delivery Networks (CDN) cache static assets at edge locations globally. In-memory databases like Redis and Memcached cache application data and session information. Database query results can be cached to reduce database load. HTTP caching headers control browser and proxy caching. Multi-layer caching (browser → CDN → application → database) provides optimal performance. Cache invalidation strategies ensure data freshness.',
          codeExample: `// Multi-Layer Caching Implementation
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379
});

// Layer 1: Redis cache for application data
async function getUserProfile(userId) {
  const cacheKey = \`user:\${userId}\`;

  // Check cache first
  const cached = await client.get(cacheKey);
  if (cached) {
    console.log('Cache hit');
    return JSON.parse(cached);
  }

  // Cache miss - fetch from database
  console.log('Cache miss');
  const user = await database.users.findById(userId);

  // Store in cache with TTL (1 hour)
  await client.setex(
    cacheKey,
    3600,
    JSON.stringify(user)
  );

  return user;
}

// Layer 2: CloudFront CDN configuration (AWS)
const cloudfrontConfig = {
  DistributionConfig: {
    DefaultCacheBehavior: {
      TargetOriginId: 'S3-origin',
      ViewerProtocolPolicy: 'redirect-to-https',
      CachePolicyId: 'managed-CachingOptimized',
      Compress: true,
      AllowedMethods: ['GET', 'HEAD', 'OPTIONS'],
      CachedMethods: ['GET', 'HEAD'],
      DefaultTTL: 86400,      // 1 day
      MaxTTL: 31536000,       // 1 year
      MinTTL: 0
    }
  }
};

// Layer 3: HTTP Cache headers
app.get('/api/products/:id', async (req, res) => {
  const product = await getProduct(req.params.id);

  res.set({
    'Cache-Control': 'public, max-age=3600',
    'ETag': generateETag(product),
    'Last-Modified': product.updatedAt
  });

  res.json(product);
});`
        },
        {
          name: 'Database Optimization',
          explanation: 'Cloud databases offer various optimization techniques for performance and scalability. Read replicas distribute read traffic across multiple database instances. Sharding partitions data across multiple databases based on a shard key. Connection pooling reuses database connections to reduce overhead. Indexing strategies improve query performance. Managed services like Aurora, Cloud SQL, and Cosmos DB provide automatic scaling, backups, and multi-region replication. NoSQL databases (DynamoDB, Firestore) offer horizontal scalability for specific use cases.',
          codeExample: `// Database optimization strategies

// 1. Read Replicas Configuration (AWS RDS)
const rdsConfig = {
  primary: {
    endpoint: 'primary.us-east-1.rds.amazonaws.com',
    type: 'write'
  },
  replicas: [
    {
      endpoint: 'replica1.us-east-1.rds.amazonaws.com',
      type: 'read',
      region: 'us-east-1'
    },
    {
      endpoint: 'replica2.us-west-2.rds.amazonaws.com',
      type: 'read',
      region: 'us-west-2'
    }
  ]
};

// 2. Connection Pooling (Node.js + PostgreSQL)
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,                    // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Route reads to replicas, writes to primary
async function query(sql, params, type = 'read') {
  const endpoint = type === 'write'
    ? rdsConfig.primary.endpoint
    : rdsConfig.replicas[0].endpoint;

  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } finally {
    client.release();
  }
}

// 3. DynamoDB Auto-scaling
const dynamoScaling = {
  TableName: 'Products',
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  AutoScaling: {
    MinCapacity: 5,
    MaxCapacity: 100,
    TargetUtilization: 70
  }
};`
        }
      ]
    },
    {
      id: 'security',
      name: 'Cloud Security',
      icon: '🔒',
      color: '#ef4444',
      description: 'Implementing comprehensive security controls, compliance, and best practices.',
      diagram: SecurityDiagram,
      details: [
        {
          name: 'Identity & Access Management',
          diagram: SecurityDiagram,
          explanation: 'IAM controls who can access cloud resources and what actions they can perform. It includes users, groups, roles, and policies. Best practices include principle of least privilege, multi-factor authentication (MFA), role-based access control (RBAC), and regular access reviews. Service accounts should use temporary credentials and rotate regularly. IAM policies should be explicit, versioned, and audited. Cloud providers offer centralized IAM services (AWS IAM, Azure AD, Google Cloud IAM) with fine-grained permissions.',
          codeExample: `// AWS IAM Policy - Least Privilege Principle
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ReadOnly",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ],
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": ["203.0.113.0/24"]
        }
      }
    },
    {
      "Sid": "RequireMFA",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "BoolIfExists": {
          "aws:MultiFactorAuthPresent": "false"
        }
      }
    }
  ]
}

// Assume Role for Cross-Account Access
const AWS = require('aws-sdk');
const sts = new AWS.STS();

async function assumeRole() {
  const params = {
    RoleArn: 'arn:aws:iam::123456789012:role/DataAnalystRole',
    RoleSessionName: 'DataAnalysisSession',
    DurationSeconds: 3600,
    ExternalId: 'unique-external-id'
  };

  const credentials = await sts.assumeRole(params).promise();
  return credentials.Credentials;
}`
        },
        {
          name: 'Data Encryption',
          explanation: 'Encryption protects data confidentiality both at rest and in transit. Encryption at rest uses AES-256 for stored data in databases, object storage, and volumes. Encryption in transit uses TLS 1.2+ for data moving between services or to clients. Cloud providers offer key management services (KMS, Key Vault) for creating and managing encryption keys. Envelope encryption encrypts data with a data key, then encrypts the data key with a master key. Customer-managed keys provide additional control over encryption. All sensitive data should be encrypted by default.',
          codeExample: `// AWS KMS - Encryption Implementation
const AWS = require('aws-sdk');
const kms = new AWS.KMS({ region: 'us-east-1' });

// Encrypt sensitive data before storing
async function encryptData(plaintext) {
  const params = {
    KeyId: 'arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012',
    Plaintext: Buffer.from(plaintext)
  };

  const result = await kms.encrypt(params).promise();
  return result.CiphertextBlob.toString('base64');
}

// Decrypt when retrieving
async function decryptData(ciphertext) {
  const params = {
    CiphertextBlob: Buffer.from(ciphertext, 'base64')
  };

  const result = await kms.decrypt(params).promise();
  return result.Plaintext.toString('utf-8');
}

// S3 Server-Side Encryption Configuration
const s3EncryptionConfig = {
  Bucket: 'my-secure-bucket',
  ServerSideEncryptionConfiguration: {
    Rules: [{
      ApplyServerSideEncryptionByDefault: {
        SSEAlgorithm: 'aws:kms',
        KMSMasterKeyID: 'arn:aws:kms:us-east-1:123456789012:key/12345678'
      },
      BucketKeyEnabled: true
    }]
  }
};

// Database Encryption (RDS)
const rdsEncryption = {
  StorageEncrypted: true,
  KmsKeyId: 'arn:aws:kms:us-east-1:123456789012:key/12345678',
  EnabledCloudwatchLogsExports: ['error', 'general', 'slowquery']
};`
        },
        {
          name: 'Network Security',
          explanation: 'Network security controls traffic flow and protects against network-based attacks. Virtual Private Clouds (VPC) provide isolated network environments. Security groups act as stateful firewalls controlling inbound and outbound traffic. Network Access Control Lists (NACLs) provide stateless subnet-level filtering. Private subnets isolate backend resources from the internet. VPN and Direct Connect enable secure hybrid connectivity. Web Application Firewalls (WAF) protect against common web exploits. DDoS protection services (Shield, CloudArmor) defend against distributed attacks.',
          codeExample: `// Terraform - Comprehensive Network Security
# VPC with public and private subnets
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = { Name = "production-vpc" }
}

# Public subnet for load balancers
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"
}

# Private subnet for application servers
resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1a"
}

# Security Group - Web tier
resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Allow HTTPS from internet"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Security Group - Application tier
resource "aws_security_group" "app" {
  name        = "app-sg"
  description = "Allow traffic from web tier only"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }
}

# WAF Rules
resource "aws_wafv2_web_acl" "main" {
  name  = "production-waf"
  scope = "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name     = "RateLimitRule"
    priority = 1

    statement {
      rate_based_statement {
        limit              = 2000
        aggregate_key_type = "IP"
      }
    }

    action {
      block {}
    }
  }
}`
        },
        {
          name: 'Compliance & Auditing',
          explanation: 'Cloud compliance ensures adherence to regulatory requirements (GDPR, HIPAA, PCI DSS, SOC 2). Cloud providers maintain certifications and provide compliance tools. AWS Config, Azure Policy, and GCP Security Command Center track resource compliance. CloudTrail, Activity Logs, and Audit Logs record all API activities for forensic analysis. Automated compliance scanning detects misconfigurations. Data residency controls ensure data stays in specific regions. Regular security assessments, penetration testing, and vulnerability scanning are essential. Compliance dashboards provide visibility into security posture.',
          codeExample: `// AWS Config - Compliance Monitoring
const configRule = {
  ConfigRuleName: 'encrypted-volumes',
  Description: 'Ensure all EBS volumes are encrypted',
  Source: {
    Owner: 'AWS',
    SourceIdentifier: 'ENCRYPTED_VOLUMES'
  },
  Scope: {
    ComplianceResourceTypes: ['AWS::EC2::Volume']
  }
};

// CloudTrail - Audit Logging
const cloudtrailConfig = {
  Name: 'organization-trail',
  S3BucketName: 'audit-logs-bucket',
  IncludeGlobalServiceEvents: true,
  IsMultiRegionTrail: true,
  IsOrganizationTrail: true,
  EnableLogFileValidation: true,
  EventSelectors: [{
    ReadWriteType: 'All',
    IncludeManagementEvents: true,
    DataResources: [{
      Type: 'AWS::S3::Object',
      Values: ['arn:aws:s3:::sensitive-bucket/*']
    }]
  }],
  InsightSelectors: [{
    InsightType: 'ApiCallRateInsight'
  }]
};

// Security Hub - Centralized Security View
const securityHubStandards = [
  'arn:aws:securityhub:us-east-1::standards/aws-foundational-security-best-practices/v/1.0.0',
  'arn:aws:securityhub:::ruleset/cis-aws-foundations-benchmark/v/1.2.0',
  'arn:aws:securityhub:us-east-1::standards/pci-dss/v/3.2.1'
];

// Automated Remediation
const automatedRemediation = {
  trigger: 'AWS Config Non-Compliant',
  action: 'Lambda Function',
  remediations: {
    'unencrypted-s3-bucket': 'enable-s3-encryption',
    'public-rds-instance': 'make-rds-private',
    'unrestricted-ssh': 'restrict-security-group'
  }
};`
        }
      ]
    },
    {
      id: 'cost-optimization',
      name: 'Cost Optimization',
      icon: '💰',
      color: '#06b6d4',
      description: 'Strategies to reduce cloud costs while maintaining performance and reliability.',
      diagram: CostOptimizationDiagram,
      details: [
        {
          name: 'Resource Right-Sizing',
          diagram: CostOptimizationDiagram,
          explanation: 'Right-sizing ensures you are using the optimal instance types and sizes for your workload. Analyze CPU, memory, network, and disk metrics to identify over-provisioned resources. Cloud providers offer recommendations based on actual usage patterns. Downsize instances with low utilization and upgrade instances that are constrained. Use burstable instances (T-series) for variable workloads. Regularly review and adjust as workload patterns change. Right-sizing can reduce compute costs by 30-50% without impacting performance.',
          codeExample: `// AWS Cost Explorer API - Right-sizing Recommendations
const AWS = require('aws-sdk');
const costExplorer = new AWS.CostExplorer({ region: 'us-east-1' });

async function getRightsizingRecommendations() {
  const params = {
    Service: 'AmazonEC2',
    Configuration: {
      RecommendationTarget: 'SAME_INSTANCE_FAMILY',
      BenefitsConsidered: true
    },
    PageSize: 100
  };

  const recommendations = await costExplorer
    .getRightsizingRecommendation(params)
    .promise();

  // Process recommendations
  recommendations.RightsizingRecommendations.forEach(rec => {
    console.log(\`Instance: \${rec.CurrentInstance.ResourceId}\`);
    console.log(\`Current: \${rec.CurrentInstance.InstanceType}\`);
    console.log(\`Recommended: \${rec.RightsizingType}\`);
    console.log(\`Estimated Savings: $\${rec.EstimatedMonthlySavings}\`);
    console.log('---');
  });

  return recommendations;
}

// Automated right-sizing implementation
async function implementRightsizing(instanceId, newInstanceType) {
  const ec2 = new AWS.EC2();

  // Stop instance
  await ec2.stopInstances({ InstanceIds: [instanceId] }).promise();
  await ec2.waitFor('instanceStopped', { InstanceIds: [instanceId] }).promise();

  // Modify instance type
  await ec2.modifyInstanceAttribute({
    InstanceId: instanceId,
    InstanceType: { Value: newInstanceType }
  }).promise();

  // Start instance
  await ec2.startInstances({ InstanceIds: [instanceId] }).promise();

  console.log(\`Instance \${instanceId} resized to \${newInstanceType}\`);
}`
        },
        {
          name: 'Reserved & Spot Instances',
          explanation: 'Reserved Instances provide significant discounts (up to 75%) in exchange for 1 or 3-year commitments. They are ideal for steady-state workloads with predictable usage. Spot Instances use spare cloud capacity at up to 90% discount but can be interrupted with 2-minute notice. Use Spot for fault-tolerant, flexible workloads like batch processing, data analysis, and CI/CD. Savings Plans offer flexibility to change instance families while maintaining discounts. Combine On-Demand (baseline), Reserved (steady-state), and Spot (burst) for optimal cost-performance.',
          codeExample: `// AWS - Mixed Instance Strategy
{
  "LaunchTemplate": {
    "LaunchTemplateId": "lt-0123456789abcdef0",
    "Version": "$Latest"
  },
  "MixedInstancesPolicy": {
    "InstancesDistribution": {
      "OnDemandBaseCapacity": 2,
      "OnDemandPercentageAboveBaseCapacity": 20,
      "SpotInstancePools": 4,
      "SpotAllocationStrategy": "capacity-optimized",
      "SpotMaxPrice": ""
    },
    "LaunchTemplate": {
      "LaunchTemplateSpecification": {
        "LaunchTemplateId": "lt-0123456789abcdef0",
        "Version": "$Latest"
      },
      "Overrides": [
        { "InstanceType": "m5.large" },
        { "InstanceType": "m5a.large" },
        { "InstanceType": "m5n.large" },
        { "InstanceType": "m5ad.large" }
      ]
    }
  }
}

// Purchase Reserved Instance
const reservedInstanceParams = {
  InstanceType: 'm5.xlarge',
  InstanceCount: 10,
  OfferingClass: 'standard',
  OfferingType: 'All Upfront',
  ProductDescription: 'Linux/UNIX',
  Term: 31536000  // 1 year in seconds
};

// Spot Fleet Request
const spotFleetConfig = {
  SpotFleetRequestConfig: {
    IamFleetRole: 'arn:aws:iam::123456789012:role/fleet-role',
    TargetCapacity: 20,
    SpotPrice: '0.05',
    AllocationStrategy: 'capacityOptimized',
    LaunchSpecifications: [{
      ImageId: 'ami-0c55b159cbfafe1f0',
      InstanceType: 'm5.large',
      KeyName: 'my-key-pair',
      SecurityGroups: [{ GroupId: 'sg-12345678' }]
    }],
    TerminateInstancesWithExpiration: true,
    ValidUntil: '2024-12-31T23:59:59Z'
  }
};`
        },
        {
          name: 'Auto-Scaling & Scheduling',
          explanation: 'Auto-scaling automatically adjusts capacity based on demand, ensuring you only pay for resources when needed. Scale out during peak hours and scale in during off-hours. Target tracking policies maintain specific metrics (CPU utilization, request count). Scheduled scaling handles predictable patterns (business hours, batch jobs). Step scaling provides fine-grained control for different load levels. Turn off non-production environments outside business hours. Use Lambda for event-driven workloads to pay only for execution time. Auto-scaling can reduce costs by 40-60% for variable workloads.',
          codeExample: `// AWS Auto Scaling with Scheduled Actions
const autoScaling = new AWS.AutoScaling();

// Target Tracking Policy
const targetTrackingConfig = {
  AutoScalingGroupName: 'web-app-asg',
  PolicyName: 'cpu-target-tracking',
  PolicyType: 'TargetTrackingScaling',
  TargetTrackingConfiguration: {
    PredefinedMetricSpecification: {
      PredefinedMetricType: 'ASGAverageCPUUtilization'
    },
    TargetValue: 60.0,
    ScaleInCooldown: 300,
    ScaleOutCooldown: 60
  }
};

// Scheduled Scaling - Business Hours
const scheduleScaleUp = {
  AutoScalingGroupName: 'web-app-asg',
  ScheduledActionName: 'scale-up-morning',
  Recurrence: '0 8 * * MON-FRI',  // 8 AM on weekdays
  MinSize: 10,
  MaxSize: 50,
  DesiredCapacity: 15
};

const scheduleScaleDown = {
  AutoScalingGroupName: 'web-app-asg',
  ScheduledActionName: 'scale-down-evening',
  Recurrence: '0 18 * * MON-FRI',  // 6 PM on weekdays
  MinSize: 2,
  MaxSize: 10,
  DesiredCapacity: 3
};

// Lambda function to stop/start EC2 on schedule
exports.handler = async (event) => {
  const ec2 = new AWS.EC2();
  const action = event.action; // 'stop' or 'start'

  // Find instances with 'AutoShutdown: true' tag
  const instances = await ec2.describeInstances({
    Filters: [
      { Name: 'tag:AutoShutdown', Values: ['true'] },
      { Name: 'instance-state-name', Values: ['running', 'stopped'] }
    ]
  }).promise();

  const instanceIds = instances.Reservations
    .flatMap(r => r.Instances.map(i => i.InstanceId));

  if (action === 'stop') {
    await ec2.stopInstances({ InstanceIds: instanceIds }).promise();
  } else if (action === 'start') {
    await ec2.startInstances({ InstanceIds: instanceIds }).promise();
  }

  console.log(\`\${action}ed \${instanceIds.length} instances\`);
};`
        },
        {
          name: 'Storage & Data Transfer Optimization',
          explanation: 'Storage costs can be reduced through lifecycle policies that automatically move data to cheaper storage tiers. S3 offers Standard, Infrequent Access, Glacier, and Deep Archive with progressively lower costs. Delete old snapshots, unused volumes, and log files. Enable compression for data transfer and storage. Use CloudFront CDN to cache content at edge locations, reducing origin data transfer costs. Keep data in same region to avoid inter-region transfer fees. Archive old databases and use read replicas in same region. Intelligent tiering automatically optimizes storage costs.',
          codeExample: `// S3 Lifecycle Policy - Automated Storage Tiering
const s3LifecyclePolicy = {
  Bucket: 'my-data-bucket',
  LifecycleConfiguration: {
    Rules: [
      {
        Id: 'MoveToIA',
        Status: 'Enabled',
        Transitions: [
          {
            Days: 30,
            StorageClass: 'STANDARD_IA'
          },
          {
            Days: 90,
            StorageClass: 'GLACIER'
          },
          {
            Days: 365,
            StorageClass: 'DEEP_ARCHIVE'
          }
        ],
        NoncurrentVersionTransitions: [
          {
            NoncurrentDays: 30,
            StorageClass: 'STANDARD_IA'
          }
        ],
        NoncurrentVersionExpiration: {
          NoncurrentDays: 90
        }
      },
      {
        Id: 'DeleteOldLogs',
        Status: 'Enabled',
        Prefix: 'logs/',
        Expiration: {
          Days: 90
        }
      },
      {
        Id: 'AbortIncompleteMultipartUpload',
        Status: 'Enabled',
        AbortIncompleteMultipartUpload: {
          DaysAfterInitiation: 7
        }
      }
    ]
  }
};

// Clean up unused EBS snapshots
async function cleanupSnapshots() {
  const ec2 = new AWS.EC2();

  // Get all snapshots owned by account
  const snapshots = await ec2.describeSnapshots({
    OwnerIds: ['self']
  }).promise();

  const now = new Date();
  const ninetyDaysAgo = new Date(now - 90 * 24 * 60 * 60 * 1000);

  for (const snapshot of snapshots.Snapshots) {
    const snapshotDate = new Date(snapshot.StartTime);

    // Delete snapshots older than 90 days with no associated AMI
    if (snapshotDate < ninetyDaysAgo && !snapshot.Description.includes('AMI')) {
      console.log(\`Deleting snapshot: \${snapshot.SnapshotId}\`);
      await ec2.deleteSnapshot({
        SnapshotId: snapshot.SnapshotId
      }).promise();
    }
  }
}

// S3 Intelligent Tiering
const intelligentTieringConfig = {
  Bucket: 'my-bucket',
  IntelligentTieringConfiguration: {
    Id: 'auto-tier-config',
    Status: 'Enabled',
    Tierings: [
      {
        Days: 90,
        AccessTier: 'ARCHIVE_ACCESS'
      },
      {
        Days: 180,
        AccessTier: 'DEEP_ARCHIVE_ACCESS'
      }
    ]
  }
};`
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
      { name: 'Main Menu', icon: '🏠', page: 'main' },
      { name: 'Cloud', icon: '☁️', page: 'Cloud' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #7dd3fc, #38bdf8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(56, 189, 248, 0.2)',
    border: '1px solid rgba(56, 189, 248, 0.3)',
    borderRadius: '0.5rem',
    color: '#7dd3fc',
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
        <h1 style={titleStyle}>☁️ Cloud Platforms</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Main Menu
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={CLOUD_COLORS}
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
              colors={CLOUD_COLORS}
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
                      language="javascript"
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

export default Cloud

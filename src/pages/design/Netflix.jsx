/**
 * Netflix System Design - Tab Template Format
 *
 * Comprehensive guide to Netflix's streaming platform architecture
 * covering video encoding, CDN, recommendations, and scalability.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#e50914',           // Netflix red
  primaryHover: '#f87171',
  bg: 'rgba(229, 9, 20, 0.1)',
  border: 'rgba(229, 9, 20, 0.3)',
  arrow: '#e50914',
  hoverBg: 'rgba(229, 9, 20, 0.2)',
  topicBg: 'rgba(229, 9, 20, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(229, 9, 20, 0.15)', border: 'rgba(229, 9, 20, 0.3)' },      // netflix red
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },  // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },    // green
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },  // purple
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },  // amber
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },    // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

// Netflix Architecture Diagram - High-level system overview
const NetflixArchitectureDiagram = () => (
  <svg viewBox="0 0 800 400" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <linearGradient id="netflixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e50914" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#831010" stopOpacity="0.1"/>
      </linearGradient>
      <linearGradient id="clientGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#1d4ed8"/>
      </linearGradient>
      <linearGradient id="cdnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e50914"/>
        <stop offset="100%" stopColor="#831010"/>
      </linearGradient>
      <linearGradient id="gatewayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6"/>
        <stop offset="100%" stopColor="#6d28d9"/>
      </linearGradient>
      <linearGradient id="serviceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b"/>
        <stop offset="100%" stopColor="#d97706"/>
      </linearGradient>
      <linearGradient id="dataGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981"/>
        <stop offset="100%" stopColor="#059669"/>
      </linearGradient>
      <marker id="arrowNetflix" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8"/>
      </marker>
    </defs>

    {/* Background */}
    <rect x="5" y="5" width="790" height="390" rx="12" fill="url(#netflixGrad)" stroke="#e50914" strokeWidth="2"/>
    <text x="400" y="30" textAnchor="middle" fill="#f87171" fontSize="16" fontWeight="bold">Netflix High-Level Architecture</text>

    {/* Client Layer */}
    <rect x="280" y="50" width="240" height="55" rx="8" fill="url(#clientGrad)" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Client Applications</text>
    <text x="400" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="9">Web | iOS | Android | Smart TV | Gaming Consoles</text>

    {/* Arrow to CDN */}
    <path d="M400 105 L400 130" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowNetflix)"/>

    {/* CDN Layer */}
    <rect x="150" y="135" width="200" height="60" rx="8" fill="url(#cdnGrad)" stroke="#f87171" strokeWidth="2"/>
    <text x="250" y="160" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Open Connect CDN</text>
    <text x="250" y="177" textAnchor="middle" fill="#fecaca" fontSize="8">17,000+ servers | ISP-embedded</text>
    <text x="250" y="189" textAnchor="middle" fill="#fecaca" fontSize="8">95% of traffic</text>

    <rect x="450" y="135" width="200" height="60" rx="8" fill="#374151" stroke="#9ca3af" strokeWidth="1"/>
    <text x="550" y="160" textAnchor="middle" fill="#d1d5db" fontSize="11" fontWeight="bold">AWS CloudFront</text>
    <text x="550" y="177" textAnchor="middle" fill="#9ca3af" fontSize="8">200+ edge locations</text>
    <text x="550" y="189" textAnchor="middle" fill="#9ca3af" fontSize="8">Backup CDN</text>

    {/* Arrows to Gateway */}
    <path d="M250 195 L250 220" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowNetflix)"/>
    <path d="M550 195 L550 220 L450 220" stroke="#94a3b8" strokeWidth="2"/>

    {/* API Gateway Layer */}
    <rect x="200" y="225" width="400" height="50" rx="8" fill="url(#gatewayGrad)" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="248" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">API Gateway (Zuul)</text>
    <text x="400" y="265" textAnchor="middle" fill="#c4b5fd" fontSize="9">Authentication | Rate Limiting | Load Balancing | Routing</text>

    {/* Arrow to Microservices */}
    <path d="M400 275 L400 295" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowNetflix)"/>

    {/* Microservices Layer */}
    <rect x="50" y="300" width="700" height="45" rx="8" fill="url(#serviceGrad)" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="318" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Microservices (700+ Services)</text>
    <g fontSize="8" fill="#fef3c7">
      <text x="100" y="335" textAnchor="middle">User</text>
      <text x="180" y="335" textAnchor="middle">Auth</text>
      <text x="260" y="335" textAnchor="middle">Catalog</text>
      <text x="340" y="335" textAnchor="middle">Search</text>
      <text x="420" y="335" textAnchor="middle">Playback</text>
      <text x="500" y="335" textAnchor="middle">Recommendations</text>
      <text x="600" y="335" textAnchor="middle">Billing</text>
      <text x="690" y="335" textAnchor="middle">Analytics</text>
    </g>

    {/* Arrow to Data Layer */}
    <path d="M400 345 L400 360" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowNetflix)"/>

    {/* Data Layer */}
    <rect x="50" y="365" width="700" height="25" rx="6" fill="url(#dataGrad)" stroke="#34d399" strokeWidth="2"/>
    <g fontSize="9" fill="white" fontWeight="bold">
      <text x="130" y="382" textAnchor="middle">Cassandra</text>
      <text x="270" y="382" textAnchor="middle">MySQL/Aurora</text>
      <text x="400" y="382" textAnchor="middle">ElasticSearch</text>
      <text x="530" y="382" textAnchor="middle">Redis/EVCache</text>
      <text x="670" y="382" textAnchor="middle">S3</text>
    </g>
  </svg>
)

// Open Connect CDN Architecture Diagram
const OpenConnectDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <linearGradient id="ocGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e50914" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.1"/>
      </linearGradient>
      <linearGradient id="ispGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22c55e"/>
        <stop offset="100%" stopColor="#15803d"/>
      </linearGradient>
      <linearGradient id="ocaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e50914"/>
        <stop offset="100%" stopColor="#991b1b"/>
      </linearGradient>
      <marker id="arrowOC" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#e50914"/>
      </marker>
      <marker id="arrowOCBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
      </marker>
    </defs>

    <rect x="5" y="5" width="790" height="340" rx="12" fill="url(#ocGrad)" stroke="#e50914" strokeWidth="2"/>
    <text x="400" y="30" textAnchor="middle" fill="#f87171" fontSize="16" fontWeight="bold">Open Connect CDN Architecture</text>

    {/* User */}
    <rect x="30" y="60" width="100" height="60" rx="8" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">User</text>
    <text x="80" y="102" textAnchor="middle" fill="#94a3b8" fontSize="8">Streaming Video</text>

    {/* Request flow to Netflix */}
    <path d="M130 90 L200 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowOCBlue)"/>
    <text x="165" y="82" textAnchor="middle" fill="#60a5fa" fontSize="7">1. Request</text>

    {/* Netflix Control Plane */}
    <rect x="200" y="50" width="150" height="80" rx="8" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="275" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Netflix AWS</text>
    <text x="275" y="92" textAnchor="middle" fill="#94a3b8" fontSize="8">Control Plane</text>
    <text x="275" y="107" textAnchor="middle" fill="#94a3b8" fontSize="7">Playback Service</text>
    <text x="275" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">Content Routing</text>

    {/* Routing decision */}
    <path d="M350 90 L420 90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOC)"/>
    <text x="385" y="82" textAnchor="middle" fill="#fbbf24" fontSize="7">2. Best OCA</text>

    {/* ISP Network Box */}
    <rect x="420" y="40" width="360" height="130" rx="10" fill="url(#ispGrad)" stroke="#22c55e" strokeWidth="2" fillOpacity="0.2"/>
    <text x="600" y="60" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">ISP Network (e.g., Comcast, AT&T)</text>

    {/* OCA Appliances */}
    <rect x="450" y="75" width="100" height="80" rx="6" fill="url(#ocaGrad)" stroke="#f87171" strokeWidth="2"/>
    <text x="500" y="100" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">OCA Rack 1</text>
    <text x="500" y="115" textAnchor="middle" fill="#fecaca" fontSize="7">200+ TB Storage</text>
    <text x="500" y="130" textAnchor="middle" fill="#fecaca" fontSize="7">Custom FreeBSD</text>
    <text x="500" y="145" textAnchor="middle" fill="#fecaca" fontSize="7">100 Gbps</text>

    <rect x="570" y="75" width="100" height="80" rx="6" fill="url(#ocaGrad)" stroke="#f87171" strokeWidth="2"/>
    <text x="620" y="100" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">OCA Rack 2</text>
    <text x="620" y="115" textAnchor="middle" fill="#fecaca" fontSize="7">200+ TB Storage</text>
    <text x="620" y="130" textAnchor="middle" fill="#fecaca" fontSize="7">Custom FreeBSD</text>
    <text x="620" y="145" textAnchor="middle" fill="#fecaca" fontSize="7">100 Gbps</text>

    <rect x="690" y="75" width="70" height="80" rx="6" fill="#374151" stroke="#6b7280" strokeWidth="1"/>
    <text x="725" y="110" textAnchor="middle" fill="#9ca3af" fontSize="8">... more</text>
    <text x="725" y="125" textAnchor="middle" fill="#6b7280" fontSize="7">OCAs</text>

    {/* Video stream back to user */}
    <path d="M450 115 L130 115 L130 100" stroke="#e50914" strokeWidth="3" markerEnd="url(#arrowOC)"/>
    <text x="290" y="108" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="bold">3. Video Stream (Within ISP Network)</text>

    {/* Cache Fill from Origin */}
    <rect x="200" y="200" width="150" height="70" rx="8" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="275" y="225" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Origin (S3)</text>
    <text x="275" y="242" textAnchor="middle" fill="#94a3b8" fontSize="8">Master Videos</text>
    <text x="275" y="257" textAnchor="middle" fill="#94a3b8" fontSize="7">All Encoded Formats</text>

    <path d="M350 235 L500 175" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrowOC)"/>
    <text x="430" y="195" textAnchor="middle" fill="#fbbf24" fontSize="7">Cache Fill (Off-peak)</text>

    {/* Benefits box */}
    <rect x="420" y="200" width="360" height="130" rx="8" fill="#1e3a5f" stroke="#e50914" strokeWidth="2"/>
    <text x="600" y="222" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Open Connect Benefits</text>
    <text x="600" y="242" textAnchor="middle" fill="#94a3b8" fontSize="9">- 95% of traffic served from ISP cache</text>
    <text x="600" y="260" textAnchor="middle" fill="#94a3b8" fontSize="9">- Zero peering costs for ISPs</text>
    <text x="600" y="278" textAnchor="middle" fill="#94a3b8" fontSize="9">- Minimal latency (same network as user)</text>
    <text x="600" y="296" textAnchor="middle" fill="#94a3b8" fontSize="9">- Pre-populated with popular content at night</text>
    <text x="600" y="314" textAnchor="middle" fill="#6b7280" fontSize="8">17,000+ servers in 1,000+ ISP locations globally</text>
  </svg>
)

// Video Encoding Pipeline Diagram
const VideoEncodingDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <linearGradient id="encGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#5b21b6" stopOpacity="0.1"/>
      </linearGradient>
      <linearGradient id="uploadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#1d4ed8"/>
      </linearGradient>
      <linearGradient id="encodeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b"/>
        <stop offset="100%" stopColor="#d97706"/>
      </linearGradient>
      <linearGradient id="qcGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981"/>
        <stop offset="100%" stopColor="#059669"/>
      </linearGradient>
      <marker id="arrowEnc" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
      </marker>
    </defs>

    <rect x="5" y="5" width="790" height="310" rx="12" fill="url(#encGrad)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="28" textAnchor="middle" fill="#a78bfa" fontSize="16" fontWeight="bold">Video Encoding Pipeline</text>

    {/* Step 1: Upload */}
    <rect x="30" y="50" width="110" height="70" rx="8" fill="url(#uploadGrad)" stroke="#60a5fa" strokeWidth="2"/>
    <text x="85" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Content Upload</text>
    <text x="85" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">Studio Partners</text>
    <text x="85" y="106" textAnchor="middle" fill="#bfdbfe" fontSize="7">4K ProRes Master</text>

    <path d="M140 85 L170 85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowEnc)"/>

    {/* Step 2: S3 Storage */}
    <rect x="170" y="50" width="100" height="70" rx="8" fill="#374151" stroke="#f59e0b" strokeWidth="2"/>
    <text x="220" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">S3 Storage</text>
    <text x="220" y="92" textAnchor="middle" fill="#94a3b8" fontSize="8">Master Copy</text>
    <text x="220" y="106" textAnchor="middle" fill="#6b7280" fontSize="7">Triggers Pipeline</text>

    <path d="M270 85 L300 85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowEnc)"/>

    {/* Step 3: Encoding - Large Box */}
    <rect x="300" y="40" width="220" height="200" rx="8" fill="url(#encodeGrad)" stroke="#fbbf24" strokeWidth="2"/>
    <text x="410" y="62" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Parallel Encoding (AWS Batch)</text>
    <text x="410" y="78" textAnchor="middle" fill="#fef3c7" fontSize="8">1000+ EC2 Spot Instances</text>

    {/* Encoding outputs */}
    <rect x="315" y="90" width="90" height="25" rx="4" fill="#1e3a5f"/>
    <text x="360" y="107" textAnchor="middle" fill="#60a5fa" fontSize="8">4K: 15-25 Mbps</text>

    <rect x="415" y="90" width="90" height="25" rx="4" fill="#1e3a5f"/>
    <text x="460" y="107" textAnchor="middle" fill="#60a5fa" fontSize="8">1080p: 5-10 Mbps</text>

    <rect x="315" y="120" width="90" height="25" rx="4" fill="#1e3a5f"/>
    <text x="360" y="137" textAnchor="middle" fill="#60a5fa" fontSize="8">720p: 2-5 Mbps</text>

    <rect x="415" y="120" width="90" height="25" rx="4" fill="#1e3a5f"/>
    <text x="460" y="137" textAnchor="middle" fill="#60a5fa" fontSize="8">480p: 1-1.5 Mbps</text>

    <rect x="315" y="150" width="190" height="25" rx="4" fill="#1e3a5f"/>
    <text x="410" y="167" textAnchor="middle" fill="#60a5fa" fontSize="8">360p: 500-800 Kbps</text>

    <text x="410" y="195" textAnchor="middle" fill="#fef3c7" fontSize="8">Codecs: H.264, H.265, VP9, AV1</text>
    <text x="410" y="210" textAnchor="middle" fill="#fef3c7" fontSize="7">Per-title & per-shot optimization</text>
    <text x="410" y="225" textAnchor="middle" fill="#fef3c7" fontSize="7">DRM encryption (Widevine, FairPlay)</text>

    <path d="M520 140 L550 140" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowEnc)"/>

    {/* Step 4: QC */}
    <rect x="550" y="50" width="100" height="100" rx="8" fill="url(#qcGrad)" stroke="#34d399" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Quality Control</text>
    <text x="600" y="95" textAnchor="middle" fill="#a7f3d0" fontSize="7">VMAF Score Check</text>
    <text x="600" y="110" textAnchor="middle" fill="#a7f3d0" fontSize="7">Audio Sync</text>
    <text x="600" y="125" textAnchor="middle" fill="#a7f3d0" fontSize="7">Playback Test</text>
    <text x="600" y="140" textAnchor="middle" fill="#a7f3d0" fontSize="7">Bitrate Verify</text>

    <path d="M650 100 L680 100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowEnc)"/>

    {/* Step 5: CDN */}
    <rect x="680" y="50" width="100" height="100" rx="8" fill="#e50914" stroke="#f87171" strokeWidth="2"/>
    <text x="730" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CDN Upload</text>
    <text x="730" y="95" textAnchor="middle" fill="#fecaca" fontSize="7">Open Connect</text>
    <text x="730" y="110" textAnchor="middle" fill="#fecaca" fontSize="7">CloudFront</text>
    <text x="730" y="125" textAnchor="middle" fill="#fecaca" fontSize="7">Pre-populate</text>
    <text x="730" y="140" textAnchor="middle" fill="#fecaca" fontSize="7">Popular Content</text>

    {/* Stats box */}
    <rect x="550" y="180" width="230" height="110" rx="8" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="665" y="200" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Encoding Stats</text>
    <text x="665" y="220" textAnchor="middle" fill="#94a3b8" fontSize="8">~12 hours for 2-hour movie (all formats)</text>
    <text x="665" y="238" textAnchor="middle" fill="#94a3b8" fontSize="8">~120 files per title (video + audio + subs)</text>
    <text x="665" y="256" textAnchor="middle" fill="#94a3b8" fontSize="8">70% cost savings with Spot Instances</text>
    <text x="665" y="274" textAnchor="middle" fill="#6b7280" fontSize="7">50+ subtitle languages per title</text>
  </svg>
)

// Adaptive Bitrate Streaming Diagram
const AdaptiveBitrateDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <linearGradient id="abrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowABR" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#06b6d4"/>
      </marker>
    </defs>

    <rect x="5" y="5" width="790" height="290" rx="12" fill="url(#abrGrad)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="400" y="28" textAnchor="middle" fill="#22d3ee" fontSize="16" fontWeight="bold">Adaptive Bitrate Streaming (ABR)</text>

    {/* Player */}
    <rect x="30" y="50" width="150" height="120" rx="8" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="105" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Netflix Player</text>
    <rect x="45" y="85" width="120" height="25" rx="4" fill="#374151"/>
    <text x="105" y="102" textAnchor="middle" fill="#94a3b8" fontSize="8">Bandwidth Monitor</text>
    <rect x="45" y="115" width="120" height="25" rx="4" fill="#374151"/>
    <text x="105" y="132" textAnchor="middle" fill="#94a3b8" fontSize="8">Buffer Manager</text>
    <rect x="45" y="145" width="120" height="20" rx="4" fill="#374151"/>
    <text x="105" y="159" textAnchor="middle" fill="#94a3b8" fontSize="7">Quality Selector</text>

    {/* Network visualization */}
    <rect x="200" y="50" width="180" height="120" rx="8" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="290" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Network Conditions</text>

    {/* Bandwidth graph simulation */}
    <path d="M215 140 L235 110 L255 95 L275 130 L295 90 L315 120 L335 85 L355 115 L365 100"
          stroke="#22c55e" strokeWidth="2" fill="none"/>
    <text x="290" y="160" textAnchor="middle" fill="#94a3b8" fontSize="8">Real-time Throughput Measurement</text>

    {/* Quality levels */}
    <rect x="400" y="45" width="180" height="135" rx="8" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="490" y="65" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Quality Levels</text>

    <rect x="415" y="78" width="150" height="18" rx="3" fill="#22c55e"/>
    <text x="490" y="91" textAnchor="middle" fill="white" fontSize="8">4K (25 Mbps) - Excellent</text>

    <rect x="415" y="100" width="130" height="18" rx="3" fill="#84cc16"/>
    <text x="480" y="113" textAnchor="middle" fill="white" fontSize="8">1080p (8 Mbps) - Good</text>

    <rect x="415" y="122" width="110" height="18" rx="3" fill="#f59e0b"/>
    <text x="470" y="135" textAnchor="middle" fill="white" fontSize="8">720p (3 Mbps) - Fair</text>

    <rect x="415" y="144" width="80" height="18" rx="3" fill="#ef4444"/>
    <text x="455" y="157" textAnchor="middle" fill="white" fontSize="8">480p (1 Mbps) - Low</text>

    {/* CDN */}
    <rect x="600" y="50" width="180" height="120" rx="8" fill="#e50914" stroke="#f87171" strokeWidth="2"/>
    <text x="690" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Open Connect CDN</text>
    <text x="690" y="95" textAnchor="middle" fill="#fecaca" fontSize="8">Chunked Video Segments</text>
    <text x="690" y="115" textAnchor="middle" fill="#fecaca" fontSize="8">2-10 second chunks</text>
    <text x="690" y="135" textAnchor="middle" fill="#fecaca" fontSize="8">All quality levels cached</text>
    <text x="690" y="155" textAnchor="middle" fill="#fecaca" fontSize="7">ISP-local delivery</text>

    {/* Arrows */}
    <path d="M180 110 L200 110" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowABR)"/>
    <path d="M380 110 L400 110" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowABR)"/>
    <path d="M580 110 L600 110" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowABR)"/>

    {/* Feedback loop */}
    <path d="M690 170 L690 250 L105 250 L105 170" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="400" y="245" textAnchor="middle" fill="#fbbf24" fontSize="9">Continuous Quality Adaptation Loop</text>

    {/* Algorithm box */}
    <rect x="200" y="185" width="380" height="55" rx="8" fill="#1e3a5f" stroke="#22d3ee" strokeWidth="2"/>
    <text x="390" y="205" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">ABR Algorithm</text>
    <text x="390" y="222" textAnchor="middle" fill="#94a3b8" fontSize="8">If bandwidth drops: Fetch lower quality for next chunk</text>
    <text x="390" y="236" textAnchor="middle" fill="#94a3b8" fontSize="8">Buffer 10-30 seconds ahead | Seamless quality switching</text>
  </svg>
)

// Recommendation Pipeline Diagram
const RecommendationDiagram = () => (
  <svg viewBox="0 0 800 380" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <linearGradient id="recGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#be185d" stopOpacity="0.1"/>
      </linearGradient>
      <linearGradient id="mlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6"/>
        <stop offset="100%" stopColor="#6d28d9"/>
      </linearGradient>
      <marker id="arrowRec" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#ec4899"/>
      </marker>
    </defs>

    <rect x="5" y="5" width="790" height="370" rx="12" fill="url(#recGrad)" stroke="#ec4899" strokeWidth="2"/>
    <text x="400" y="28" textAnchor="middle" fill="#f472b6" fontSize="16" fontWeight="bold">ML Recommendation Pipeline</text>

    {/* User Data Collection */}
    <rect x="30" y="50" width="170" height="140" rx="8" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="115" y="72" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">User Data Collection</text>
    <text x="115" y="92" textAnchor="middle" fill="#94a3b8" fontSize="8">Watch History</text>
    <text x="115" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">Ratings (thumbs up/down)</text>
    <text x="115" y="124" textAnchor="middle" fill="#94a3b8" fontSize="8">Search Queries</text>
    <text x="115" y="140" textAnchor="middle" fill="#94a3b8" fontSize="8">Browse Patterns</text>
    <text x="115" y="156" textAnchor="middle" fill="#94a3b8" fontSize="8">Skip/Rewind Behavior</text>
    <text x="115" y="172" textAnchor="middle" fill="#94a3b8" fontSize="8">Device & Time of Day</text>

    <path d="M200 120 L230 120" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowRec)"/>

    {/* Feature Engineering */}
    <rect x="230" y="50" width="150" height="140" rx="8" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="305" y="72" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Feature Engineering</text>
    <text x="305" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">User Features:</text>
    <text x="305" y="110" textAnchor="middle" fill="#6b7280" fontSize="7">Demographics, Preferences</text>
    <text x="305" y="128" textAnchor="middle" fill="#94a3b8" fontSize="8">Content Features:</text>
    <text x="305" y="143" textAnchor="middle" fill="#6b7280" fontSize="7">Genre, Cast, Director</text>
    <text x="305" y="161" textAnchor="middle" fill="#94a3b8" fontSize="8">Context Features:</text>
    <text x="305" y="176" textAnchor="middle" fill="#6b7280" fontSize="7">Time, Device, Location</text>

    <path d="M380 120 L410 120" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowRec)"/>

    {/* ML Models */}
    <rect x="410" y="40" width="200" height="160" rx="8" fill="url(#mlGrad)" stroke="#a78bfa" strokeWidth="2"/>
    <text x="510" y="62" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ML Models (Ensemble)</text>

    <rect x="425" y="75" width="170" height="25" rx="4" fill="#1e3a5f"/>
    <text x="510" y="92" textAnchor="middle" fill="#94a3b8" fontSize="8">Collaborative Filtering (SVD/ALS)</text>

    <rect x="425" y="105" width="170" height="25" rx="4" fill="#1e3a5f"/>
    <text x="510" y="122" textAnchor="middle" fill="#94a3b8" fontSize="8">Content-Based (TF-IDF, W2V)</text>

    <rect x="425" y="135" width="170" height="25" rx="4" fill="#1e3a5f"/>
    <text x="510" y="152" textAnchor="middle" fill="#94a3b8" fontSize="8">Deep Learning (RNN, LSTM)</text>

    <rect x="425" y="165" width="170" height="25" rx="4" fill="#1e3a5f"/>
    <text x="510" y="182" textAnchor="middle" fill="#94a3b8" fontSize="8">Contextual Bandits (A/B)</text>

    <path d="M610 120 L640 120" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowRec)"/>

    {/* Ranking */}
    <rect x="640" y="50" width="140" height="140" rx="8" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="710" y="72" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Ranking & Output</text>
    <text x="710" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">Top-N Generation</text>
    <text x="710" y="113" textAnchor="middle" fill="#94a3b8" fontSize="8">Context Re-ranking</text>
    <text x="710" y="131" textAnchor="middle" fill="#94a3b8" fontSize="8">Diversity Optimization</text>
    <text x="710" y="149" textAnchor="middle" fill="#94a3b8" fontSize="8">Freshness Boost</text>
    <text x="710" y="167" textAnchor="middle" fill="#6b7280" fontSize="7">&lt;100ms latency</text>

    {/* Output - Personalized UI */}
    <rect x="200" y="220" width="580" height="60" rx="8" fill="#e50914" stroke="#f87171" strokeWidth="2"/>
    <text x="490" y="245" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Personalized Netflix Homepage</text>
    <g fontSize="8" fill="#fecaca">
      <text x="250" y="265" textAnchor="middle">"Top Picks for You"</text>
      <text x="380" y="265" textAnchor="middle">"Because You Watched..."</text>
      <text x="510" y="265" textAnchor="middle">"Trending Now"</text>
      <text x="640" y="265" textAnchor="middle">"New Releases"</text>
      <text x="740" y="265" textAnchor="middle">Genre Rows</text>
    </g>

    <path d="M710 190 L710 220" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowRec)"/>

    {/* Impact stats */}
    <rect x="200" y="295" width="580" height="70" rx="8" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="490" y="318" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">Recommendation Impact</text>
    <g fontSize="9" fill="#94a3b8">
      <text x="280" y="340" textAnchor="middle">80% content watched</text>
      <text x="280" y="355" textAnchor="middle">from recommendations</text>
      <text x="430" y="340" textAnchor="middle">$1B annual savings</text>
      <text x="430" y="355" textAnchor="middle">from reduced churn</text>
      <text x="580" y="340" textAnchor="middle">1000s A/B tests</text>
      <text x="580" y="355" textAnchor="middle">run annually</text>
      <text x="710" y="340" textAnchor="middle">Custom thumbnails</text>
      <text x="710" y="355" textAnchor="middle">per user</text>
    </g>
  </svg>
)

// Microservices Architecture Diagram
const MicroservicesDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <linearGradient id="msGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowMS" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
      </marker>
    </defs>

    <rect x="5" y="5" width="790" height="270" rx="12" fill="url(#msGrad)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="28" textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="bold">Netflix Microservices Architecture</text>

    {/* API Gateway */}
    <rect x="300" y="45" width="200" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Zuul API Gateway</text>

    {/* Arrows down */}
    <path d="M350 85 L350 105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowMS)"/>
    <path d="M400 85 L400 105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowMS)"/>
    <path d="M450 85 L450 105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowMS)"/>

    {/* Service Discovery */}
    <rect x="600" y="45" width="180" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="690" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Eureka Service Discovery</text>

    {/* Microservices Row 1 */}
    <rect x="30" y="110" width="120" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="90" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">User Service</text>
    <text x="90" y="150" textAnchor="middle" fill="#bfdbfe" fontSize="7">Profiles, Auth</text>

    <rect x="170" y="110" width="120" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="230" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Catalog Service</text>
    <text x="230" y="150" textAnchor="middle" fill="#bfdbfe" fontSize="7">Metadata, Tags</text>

    <rect x="310" y="110" width="120" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="370" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Playback Service</text>
    <text x="370" y="150" textAnchor="middle" fill="#bfdbfe" fontSize="7">URLs, DRM</text>

    <rect x="450" y="110" width="120" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="510" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Search Service</text>
    <text x="510" y="150" textAnchor="middle" fill="#bfdbfe" fontSize="7">ElasticSearch</text>

    <rect x="590" y="110" width="120" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="650" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Recommendations</text>
    <text x="650" y="150" textAnchor="middle" fill="#bfdbfe" fontSize="7">ML Models</text>

    {/* Resilience layer */}
    <rect x="30" y="175" width="230" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="145" y="200" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Hystrix Circuit Breaker</text>

    <rect x="280" y="175" width="230" height="40" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="395" y="200" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Ribbon Load Balancer</text>

    <rect x="530" y="175" width="250" height="40" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="655" y="200" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">EVCache Distributed Caching</text>

    {/* Data stores */}
    <rect x="30" y="230" width="150" height="35" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="105" y="252" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Cassandra</text>

    <rect x="200" y="230" width="150" height="35" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="275" y="252" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MySQL/Aurora</text>

    <rect x="370" y="230" width="150" height="35" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="445" y="252" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">ElasticSearch</text>

    <rect x="540" y="230" width="110" height="35" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="595" y="252" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Redis</text>

    <rect x="670" y="230" width="110" height="35" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="725" y="252" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">S3</text>
  </svg>
)

// Scalability Diagram
const ScalabilityDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <linearGradient id="scaleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#059669" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowScale" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
      </marker>
    </defs>

    <rect x="5" y="5" width="790" height="250" rx="12" fill="url(#scaleGrad)" stroke="#10b981" strokeWidth="2"/>
    <text x="400" y="28" textAnchor="middle" fill="#34d399" fontSize="16" fontWeight="bold">Horizontal Scaling Strategy</text>

    {/* Auto Scaling Group */}
    <rect x="30" y="50" width="220" height="90" rx="8" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Auto Scaling Groups</text>
    <text x="140" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">Min: 10 | Max: 1000 instances</text>
    <text x="140" y="112" textAnchor="middle" fill="#94a3b8" fontSize="8">Scale on CPU > 70%</text>
    <text x="140" y="128" textAnchor="middle" fill="#6b7280" fontSize="7">EC2 Spot + On-Demand mix</text>

    <path d="M250 95 L280 95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowScale)"/>

    {/* Load Balancer */}
    <rect x="280" y="50" width="220" height="90" rx="8" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="390" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Load Balancing</text>
    <text x="390" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">Ribbon (Client-side)</text>
    <text x="390" y="112" textAnchor="middle" fill="#94a3b8" fontSize="8">+ AWS ELB (Server-side)</text>
    <text x="390" y="128" textAnchor="middle" fill="#6b7280" fontSize="7">Round-robin + Weighted</text>

    <path d="M500 95 L530 95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowScale)"/>

    {/* Stateless Services */}
    <rect x="530" y="50" width="250" height="90" rx="8" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="655" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Stateless Microservices</text>
    <text x="655" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">700+ independent services</text>
    <text x="655" y="112" textAnchor="middle" fill="#94a3b8" fontSize="8">State stored externally</text>
    <text x="655" y="128" textAnchor="middle" fill="#6b7280" fontSize="7">Any instance can handle any request</text>

    {/* Database Scaling */}
    <rect x="30" y="160" width="350" height="80" rx="8" fill="#1e3a5f" stroke="#22c55e" strokeWidth="2"/>
    <text x="205" y="185" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Database Scaling</text>
    <text x="205" y="205" textAnchor="middle" fill="#94a3b8" fontSize="8">Cassandra: Linear scalability, multi-region replication</text>
    <text x="205" y="222" textAnchor="middle" fill="#94a3b8" fontSize="8">Sharding by userId for even distribution</text>

    {/* Caching */}
    <rect x="400" y="160" width="380" height="80" rx="8" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="590" y="185" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">Multi-Layer Caching</text>
    <text x="590" y="205" textAnchor="middle" fill="#94a3b8" fontSize="8">L1: Application cache | L2: Redis/EVCache | L3: CDN</text>
    <text x="590" y="222" textAnchor="middle" fill="#94a3b8" fontSize="8">95%+ cache hit ratio for popular content</text>
  </svg>
)

// Resilience Patterns Diagram
const ResilienceDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <linearGradient id="resGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1"/>
      </linearGradient>
    </defs>

    <rect x="5" y="5" width="790" height="210" rx="12" fill="url(#resGrad)" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="28" textAnchor="middle" fill="#f87171" fontSize="16" fontWeight="bold">Resilience Patterns</text>

    {/* Circuit Breaker */}
    <rect x="30" y="50" width="170" height="80" rx="8" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="115" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Circuit Breaker</text>
    <text x="115" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">Hystrix / Resilience4j</text>
    <text x="115" y="112" textAnchor="middle" fill="#6b7280" fontSize="7">Prevent cascade failures</text>

    {/* Bulkhead */}
    <rect x="220" y="50" width="170" height="80" rx="8" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="305" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Bulkhead</text>
    <text x="305" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">Isolated thread pools</text>
    <text x="305" y="112" textAnchor="middle" fill="#6b7280" fontSize="7">Per-service isolation</text>

    {/* Timeout */}
    <rect x="410" y="50" width="170" height="80" rx="8" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="495" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Timeout</text>
    <text x="495" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">Configurable timeouts</text>
    <text x="495" y="112" textAnchor="middle" fill="#6b7280" fontSize="7">Fail fast strategy</text>

    {/* Fallback */}
    <rect x="600" y="50" width="180" height="80" rx="8" fill="#1e3a5f" stroke="#22c55e" strokeWidth="2"/>
    <text x="690" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Fallback</text>
    <text x="690" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">Graceful degradation</text>
    <text x="690" y="112" textAnchor="middle" fill="#6b7280" fontSize="7">Default responses</text>

    {/* Chaos Engineering */}
    <rect x="150" y="145" width="500" height="55" rx="8" fill="#e50914" stroke="#f87171" strokeWidth="2"/>
    <text x="400" y="170" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Chaos Monkey - Chaos Engineering</text>
    <text x="400" y="188" textAnchor="middle" fill="#fecaca" fontSize="9">Randomly terminate instances in production to test resilience</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Netflix({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'architecture',
      name: 'System Architecture',
      icon: '🏗️',
      color: '#e50914',
      description: 'High-level overview of Netflix platform including client apps, CDN, API gateway, microservices, and data storage layers.',
      diagram: NetflixArchitectureDiagram,
      details: [
        {
          name: 'High-Level Architecture',
          diagram: NetflixArchitectureDiagram,
          explanation: 'Netflix follows a microservices architecture running on AWS. Client applications (Web, iOS, Android, Smart TV) connect through the API Gateway (Zuul) which handles authentication, rate limiting, and routing. The Open Connect CDN serves 95% of video traffic directly from ISP-embedded servers. Over 700 microservices handle different functions like user management, catalog, playback, and recommendations. Data is stored across Cassandra (NoSQL), MySQL/Aurora (SQL), ElasticSearch (search), Redis (caching), and S3 (video files).',
          codeExample: `// Netflix API Gateway (Zuul) Configuration
@EnableZuulProxy
@SpringBootApplication
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}

// Route configuration
zuul:
  routes:
    user-service:
      path: /api/users/**
      serviceId: user-service
    catalog-service:
      path: /api/catalog/**
      serviceId: catalog-service
    playback-service:
      path: /api/playback/**
      serviceId: playback-service`
        },
        {
          name: 'Technology Stack',
          explanation: 'Netflix runs primarily on AWS using a combination of open-source and proprietary tools. Backend services are built with Spring Boot (Java) and Node.js. Service discovery uses Eureka, circuit breaking uses Hystrix, and client-side load balancing uses Ribbon. The data layer includes Cassandra for high-throughput NoSQL storage, MySQL/Aurora for relational data, ElasticSearch for search, and Redis/EVCache for caching. Infrastructure runs on EC2, with Lambda for serverless functions and S3 for object storage.',
          codeExample: `// Netflix OSS Stack Components
// 1. Eureka - Service Discovery
@EnableEurekaClient
@SpringBootApplication
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}

// 2. Hystrix - Circuit Breaker
@HystrixCommand(fallbackMethod = "getDefaultUser")
public User getUser(String userId) {
    return userClient.getUser(userId);
}

public User getDefaultUser(String userId) {
    return new User("default", "Guest User");
}

// 3. Ribbon - Client-Side Load Balancing
@LoadBalanced
@Bean
public RestTemplate restTemplate() {
    return new RestTemplate();
}`
        },
        {
          name: 'API Gateway (Zuul)',
          explanation: 'Zuul is Netflix\'s edge service that handles all external requests. It provides dynamic routing, monitoring, resiliency, and security. Key features include request routing to appropriate microservices, authentication and authorization, rate limiting per user/IP, request/response transformation, and load balancing. Zuul can handle millions of requests per second and provides a single entry point for all client applications.',
          codeExample: `// Zuul Filter Example
public class AuthenticationFilter extends ZuulFilter {

    @Override
    public String filterType() {
        return "pre"; // pre, route, post, error
    }

    @Override
    public int filterOrder() {
        return 1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();

        String token = request.getHeader("Authorization");
        if (!validateToken(token)) {
            ctx.setSendZuulResponse(false);
            ctx.setResponseStatusCode(401);
            ctx.setResponseBody("Unauthorized");
        }
        return null;
    }
}`
        }
      ]
    },
    {
      id: 'cdn',
      name: 'CDN & Content Delivery',
      icon: '🌐',
      color: '#06b6d4',
      description: 'Open Connect CDN architecture with 17,000+ servers embedded in ISP networks, serving 95% of Netflix traffic.',
      diagram: OpenConnectDiagram,
      details: [
        {
          name: 'Open Connect CDN',
          diagram: OpenConnectDiagram,
          explanation: 'Open Connect is Netflix\'s proprietary CDN consisting of 17,000+ servers (OCAs - Open Connect Appliances) deployed directly inside ISP datacenters worldwide. When a user requests video, Netflix\'s control plane determines the best OCA based on location, load, and network conditions. The OCA then streams video directly to the user within the ISP\'s network, minimizing latency and internet transit costs. ISPs benefit from reduced peering costs and better user experience. OCAs are pre-populated with popular content during off-peak hours.',
          codeExample: `// Playback Service - OCA Selection Algorithm
public class PlaybackService {

    public StreamingManifest getManifest(String videoId, UserContext context) {
        // 1. Get all available OCAs for user's region
        List<OCA> availableOCAs = ocaRegistry.getOCAsForRegion(
            context.getRegion()
        );

        // 2. Filter by ISP for optimal routing
        List<OCA> ispOCAs = availableOCAs.stream()
            .filter(oca -> oca.getIspId().equals(context.getIspId()))
            .collect(Collectors.toList());

        // 3. Rank by health, load, and latency
        OCA bestOCA = ocaSelector.selectBest(ispOCAs, context);

        // 4. Build manifest with CDN URLs
        return StreamingManifest.builder()
            .videoId(videoId)
            .cdnUrl(bestOCA.getBaseUrl())
            .profiles(getEncodingProfiles(videoId))
            .build();
    }
}`
        },
        {
          name: 'Adaptive Bitrate Streaming',
          diagram: AdaptiveBitrateDiagram,
          explanation: 'Netflix uses ABR (Adaptive Bitrate Streaming) to dynamically adjust video quality based on network conditions. Videos are encoded into multiple quality levels (4K, 1080p, 720p, 480p, 360p) and split into 2-10 second chunks. The player continuously monitors bandwidth and buffer levels, switching to lower quality when bandwidth drops or higher quality when conditions improve. This ensures smooth playback with minimal buffering while delivering the best possible quality.',
          codeExample: `// ABR Algorithm Pseudocode
class AdaptiveBitrateController {
    private int currentBitrate;
    private int bufferLevel; // seconds of video buffered
    private double measuredBandwidth;

    public int selectNextBitrate() {
        // Measure current throughput
        measuredBandwidth = networkMonitor.getMeasuredBandwidth();

        // Safety margin - use 80% of measured bandwidth
        double safeBandwidth = measuredBandwidth * 0.8;

        // Find highest bitrate below safe bandwidth
        int selectedBitrate = availableBitrates.stream()
            .filter(b -> b <= safeBandwidth)
            .max(Integer::compare)
            .orElse(lowestBitrate);

        // Buffer-based adjustment
        if (bufferLevel < 5) {
            // Critical - drop to lowest
            selectedBitrate = lowestBitrate;
        } else if (bufferLevel < 10) {
            // Low buffer - be conservative
            selectedBitrate = Math.min(selectedBitrate, currentBitrate);
        }

        return selectedBitrate;
    }
}`
        },
        {
          name: 'Content Pre-positioning',
          explanation: 'Netflix proactively pushes popular content to OCAs during off-peak hours (typically 2-6 AM local time). A prediction algorithm determines which content is likely to be watched based on trending titles, new releases, and regional preferences. This ensures that when users request content during peak hours, it\'s already cached on their local OCA. Cache fill happens from the origin (S3) to regional POPs, then to individual OCAs, optimizing bandwidth usage.',
          codeExample: `// Content Pre-positioning Service
@Service
public class ContentPrepopulationService {

    @Scheduled(cron = "0 0 2 * * *") // Run at 2 AM daily
    public void prepopulateContent() {
        for (Region region : Region.values()) {
            // 1. Get trending content predictions
            List<Content> trendingContent = predictionService
                .getPredictedPopularContent(region, Duration.ofDays(1));

            // 2. Get OCAs in region
            List<OCA> ocas = ocaRegistry.getOCAsForRegion(region);

            // 3. For each OCA, calculate content to cache
            for (OCA oca : ocas) {
                List<Content> toCache = calculateCacheList(
                    oca,
                    trendingContent,
                    oca.getAvailableStorage()
                );

                // 4. Queue cache fill jobs
                for (Content content : toCache) {
                    cacheFillQueue.enqueue(new CacheFillJob(
                        oca.getId(),
                        content.getId(),
                        Priority.LOW
                    ));
                }
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'encoding',
      name: 'Video Encoding',
      icon: '🎬',
      color: '#8b5cf6',
      description: 'Per-title and per-shot encoding optimization, generating 120+ files per video across multiple resolutions and codecs.',
      diagram: VideoEncodingDiagram,
      details: [
        {
          name: 'Encoding Pipeline',
          diagram: VideoEncodingDiagram,
          explanation: 'Netflix\'s encoding pipeline processes studio master files (typically 4K ProRes) into ~120 output files per title. The pipeline runs on AWS using 1000+ EC2 Spot instances for cost efficiency (70% savings). Videos are encoded into multiple resolutions (4K, 1080p, 720p, 480p, 360p) and codecs (H.264, H.265/HEVC, VP9, AV1). Each output includes multiple audio tracks and 50+ subtitle languages. The pipeline takes approximately 12 hours for a 2-hour movie.',
          codeExample: `// Encoding Job Configuration
{
  "title_id": "80234304",
  "source": {
    "location": "s3://netflix-masters/80234304/master.mov",
    "format": "ProRes 4444",
    "resolution": "4096x2160"
  },
  "outputs": [
    {
      "codec": "h265",
      "resolution": "3840x2160",
      "bitrate_range": {"min": 15000, "max": 25000},
      "hdr": ["hdr10", "dolby_vision"]
    },
    {
      "codec": "h264",
      "resolution": "1920x1080",
      "bitrate_range": {"min": 5000, "max": 10000}
    },
    {
      "codec": "vp9",
      "resolution": "1280x720",
      "bitrate_range": {"min": 2000, "max": 5000}
    }
  ],
  "drm": ["widevine", "fairplay", "playready"],
  "subtitles": 52,
  "audio_tracks": 24
}`
        },
        {
          name: 'Per-Title Optimization',
          explanation: 'Netflix\'s per-title encoding analyzes each video\'s complexity to create a custom bitrate ladder. Simple content (animated shows, static shots) can achieve high quality at lower bitrates, while complex content (action movies, fast motion) needs higher bitrates. Machine learning models analyze source footage to determine optimal encoding parameters, resulting in 20-50% bitrate savings while maintaining or improving perceptual quality measured by VMAF (Video Multimethod Assessment Fusion).',
          codeExample: `// Per-Title Encoding Analysis
public class PerTitleAnalyzer {

    public BitrateProfile analyzTitle(Video source) {
        // Analyze video complexity
        ComplexityMetrics metrics = complexityAnalyzer.analyze(source);

        // Factors considered:
        // - Motion complexity (fast action vs static)
        // - Spatial complexity (detail level)
        // - Color palette complexity
        // - Scene change frequency

        // Generate custom bitrate ladder
        BitrateProfile profile = new BitrateProfile();

        for (Resolution res : targetResolutions) {
            // Find minimum bitrate for target VMAF score
            int optimalBitrate = findOptimalBitrate(
                source,
                res,
                metrics,
                TARGET_VMAF_SCORE // typically 93-95
            );

            profile.addLevel(new QualityLevel(res, optimalBitrate));
        }

        return profile;
    }

    // Per-shot encoding goes further - different bitrates
    // for different scenes within the same video
}`
        },
        {
          name: 'Quality Control',
          explanation: 'Every encoded video goes through automated quality control before reaching the CDN. QC checks include VMAF score verification (must meet target threshold), audio-video sync validation, bitrate verification, playback testing on reference devices, subtitle timing checks, and DRM encryption validation. Failed encodes are automatically re-queued with adjusted parameters. Human reviewers spot-check a sample of outputs.',
          codeExample: `// Quality Control Pipeline
@Service
public class QualityControlService {

    public QCResult validateEncodedVideo(EncodedVideo video) {
        QCResult result = new QCResult();

        // 1. VMAF Score Check
        double vmafScore = vmafCalculator.calculate(
            video.getSource(),
            video.getEncoded()
        );
        result.addCheck("vmaf", vmafScore >= 93.0, vmafScore);

        // 2. Audio Sync Check
        double audioOffset = audioSyncChecker.measureOffset(video);
        result.addCheck("audio_sync",
            Math.abs(audioOffset) < 40, // 40ms tolerance
            audioOffset
        );

        // 3. Bitrate Verification
        BitrateStats stats = bitrateAnalyzer.analyze(video);
        result.addCheck("bitrate",
            stats.isWithinRange(video.getTargetBitrate()),
            stats
        );

        // 4. Playback Test
        PlaybackResult playback = playbackTester.test(
            video,
            referenceDevices
        );
        result.addCheck("playback", playback.isSuccessful(), playback);

        return result;
    }
}`
        }
      ]
    },
    {
      id: 'recommendations',
      name: 'Recommendation System',
      icon: '🤖',
      color: '#ec4899',
      description: 'ML-powered personalization driving 80% of content discovery, saving $1B annually from reduced churn.',
      diagram: RecommendationDiagram,
      details: [
        {
          name: 'ML Pipeline',
          diagram: RecommendationDiagram,
          explanation: 'Netflix\'s recommendation system uses an ensemble of ML models to personalize content for each user. Data collected includes watch history, ratings, search queries, browse patterns, skip/rewind behavior, device type, and time of day. Features are engineered for users (demographics, preferences), content (genre, cast, director), and context (time, device, location). Models include collaborative filtering (user similarity), content-based filtering, deep learning (RNN/LSTM for sequences), and contextual bandits for exploration.',
          codeExample: `// Recommendation Service
@Service
public class RecommendationService {

    public List<Recommendation> getPersonalizedRecommendations(
            String userId, Context context) {

        // 1. Get user features
        UserFeatures userFeatures = featureStore.getUserFeatures(userId);

        // 2. Run ensemble of models
        Map<String, List<ContentScore>> modelOutputs = new HashMap<>();

        // Collaborative Filtering
        modelOutputs.put("collab",
            collaborativeFilter.predict(userFeatures));

        // Content-Based
        modelOutputs.put("content",
            contentBasedModel.predict(userFeatures));

        // Deep Learning (watch sequence)
        modelOutputs.put("deep",
            deepModel.predict(userFeatures.getWatchHistory()));

        // 3. Ensemble scoring
        List<ContentScore> combined = ensembleScorer.combine(
            modelOutputs,
            ensembleWeights
        );

        // 4. Re-rank for diversity and freshness
        return ranker.rank(combined, context)
            .stream()
            .limit(100)
            .collect(Collectors.toList());
    }
}`
        },
        {
          name: 'Personalization Features',
          explanation: 'Netflix personalizes almost every aspect of the user experience. Each homepage is unique - row order, titles within rows, and even thumbnails are personalized. The system tests multiple thumbnail images per title and learns which images drive engagement for different user segments. Search results are personalized based on user preferences. Email campaigns feature personalized content recommendations. Even the artwork shown for a title changes based on what\'s likely to attract each specific user.',
          codeExample: `// Personalized Thumbnail Selection
@Service
public class ThumbnailPersonalizationService {

    public String selectThumbnail(String contentId, String userId) {
        // Get available artwork for content
        List<Thumbnail> thumbnails = artworkService
            .getThumbnails(contentId);

        // Get user preference signals
        UserPreferences prefs = preferenceService
            .getPreferences(userId);

        // Score each thumbnail for this user
        Map<Thumbnail, Double> scores = new HashMap<>();
        for (Thumbnail thumb : thumbnails) {
            double score = 0.0;

            // Genre affinity
            if (prefs.getLikedGenres().contains(thumb.getGenreSignal())) {
                score += 0.3;
            }

            // Actor recognition
            if (prefs.getLikedActors().contains(thumb.getFeaturedActor())) {
                score += 0.4;
            }

            // Visual style preference
            score += styleModel.predict(thumb, prefs.getVisualStyle());

            scores.put(thumb, score);
        }

        // Return highest scoring thumbnail
        return scores.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .get().getKey().getUrl();
    }
}`
        },
        {
          name: 'A/B Testing',
          explanation: 'Netflix runs thousands of A/B tests annually to optimize every aspect of the product. Tests range from recommendation algorithm changes to UI modifications to thumbnail variations. The platform uses a sophisticated experimentation framework that handles test allocation, metric collection, and statistical analysis. Tests typically run for 2-4 weeks to gather sufficient data. Key metrics include engagement (watch time, completion rate), retention, and search success rate.',
          codeExample: `// A/B Test Framework
@Service
public class ExperimentationService {

    public ExperimentAllocation allocateUser(
            String userId, String experimentId) {

        Experiment experiment = experimentRepository
            .getExperiment(experimentId);

        // Consistent hashing for stable allocation
        int bucket = hashFunction.hash(userId + experimentId) % 100;

        // Determine treatment group
        String treatment = "control";
        int cumulative = 0;
        for (TreatmentGroup group : experiment.getTreatments()) {
            cumulative += group.getPercentage();
            if (bucket < cumulative) {
                treatment = group.getName();
                break;
            }
        }

        // Log allocation for analysis
        analyticsService.logAllocation(
            userId,
            experimentId,
            treatment
        );

        return new ExperimentAllocation(
            experimentId,
            treatment,
            experiment.getParameters(treatment)
        );
    }

    // Metrics tracked: watch_time, retention,
    // search_success, ui_engagement
}`
        }
      ]
    },
    {
      id: 'microservices',
      name: 'Microservices',
      icon: '⚙️',
      color: '#f59e0b',
      description: '700+ independent services with service discovery, circuit breakers, and distributed caching.',
      diagram: MicroservicesDiagram,
      details: [
        {
          name: 'Service Architecture',
          diagram: MicroservicesDiagram,
          explanation: 'Netflix operates 700+ microservices, each responsible for a specific domain. Core services include User Service (profiles, authentication), Catalog Service (metadata, tags), Playback Service (URLs, DRM), Search Service (ElasticSearch), and Recommendations (ML models). Services communicate via REST APIs and are discovered through Eureka. Each service is independently deployable, scalable, and can use different technologies as needed.',
          codeExample: `// Microservice with Netflix OSS Stack
@SpringBootApplication
@EnableEurekaClient
@EnableHystrix
@EnableFeignClients
public class CatalogServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(CatalogServiceApplication.class, args);
    }
}

// Feign Client for inter-service communication
@FeignClient(name = "user-service", fallback = UserClientFallback.class)
public interface UserClient {
    @GetMapping("/users/{userId}")
    User getUser(@PathVariable String userId);

    @GetMapping("/users/{userId}/preferences")
    UserPreferences getPreferences(@PathVariable String userId);
}

// Service Discovery Configuration
eureka:
  client:
    serviceUrl:
      defaultZone: http://eureka-server:8761/eureka/
  instance:
    preferIpAddress: true
    leaseRenewalIntervalInSeconds: 10`
        },
        {
          name: 'Distributed Caching',
          explanation: 'Netflix uses EVCache (based on memcached) for distributed caching across services. Caching layers include: L1 (local application cache), L2 (EVCache cluster), and L3 (CDN cache for static content). Popular data like user profiles, video metadata, and recommendation results are cached with high hit rates (95%+). Cache invalidation uses a combination of TTL-based expiration and explicit invalidation through message queues.',
          codeExample: `// EVCache Usage
@Service
public class CatalogService {

    @Autowired
    private EVCache evCache;

    private static final String CACHE_PREFIX = "catalog:";
    private static final int TTL_SECONDS = 3600; // 1 hour

    public VideoMetadata getVideoMetadata(String videoId) {
        String cacheKey = CACHE_PREFIX + videoId;

        // Try cache first
        VideoMetadata cached = evCache.get(cacheKey);
        if (cached != null) {
            return cached;
        }

        // Cache miss - fetch from database
        VideoMetadata metadata = metadataRepository
            .findById(videoId)
            .orElseThrow(() -> new NotFoundException(videoId));

        // Store in cache
        evCache.set(cacheKey, metadata, TTL_SECONDS);

        return metadata;
    }

    public void invalidateMetadata(String videoId) {
        evCache.delete(CACHE_PREFIX + videoId);
        // Also publish invalidation event for other regions
        invalidationQueue.publish(new InvalidationEvent(videoId));
    }
}`
        },
        {
          name: 'Service Communication',
          explanation: 'Services communicate primarily through REST APIs with client-side load balancing (Ribbon) and circuit breakers (Hystrix). For asynchronous communication, Netflix uses Apache Kafka for event streaming and SQS for message queuing. The Conductor workflow engine orchestrates long-running processes across services. gRPC is used for performance-critical internal communication.',
          codeExample: `// Hystrix Circuit Breaker Pattern
@Service
public class PlaybackService {

    @HystrixCommand(
        fallbackMethod = "getPlaybackInfoFallback",
        commandProperties = {
            @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "20"),
            @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "5000"),
            @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "50"),
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "1000")
        },
        threadPoolProperties = {
            @HystrixProperty(name = "coreSize", value = "20"),
            @HystrixProperty(name = "maxQueueSize", value = "10")
        }
    )
    public PlaybackInfo getPlaybackInfo(String videoId, String userId) {
        return playbackClient.getPlaybackInfo(videoId, userId);
    }

    // Fallback when circuit is open or timeout
    public PlaybackInfo getPlaybackInfoFallback(String videoId, String userId) {
        // Return cached or default playback info
        return cachedPlaybackInfo.getOrDefault(videoId,
            PlaybackInfo.defaultInfo(videoId));
    }
}`
        }
      ]
    },
    {
      id: 'scalability',
      name: 'Scalability & Resilience',
      icon: '📈',
      color: '#10b981',
      description: 'Auto-scaling, multi-region deployment, Chaos Engineering, and resilience patterns for 99.99% availability.',
      diagram: ScalabilityDiagram,
      details: [
        {
          name: 'Horizontal Scaling',
          diagram: ScalabilityDiagram,
          explanation: 'Netflix scales horizontally using stateless microservices and auto-scaling groups. Services can scale from 10 to 1000+ instances based on demand. Auto-scaling triggers include CPU utilization (>70%), request latency, and queue depth. The architecture uses a mix of EC2 On-Demand and Spot instances for cost optimization. All state is stored externally in databases or caches, allowing any instance to handle any request.',
          codeExample: `// Auto Scaling Configuration (AWS)
{
  "AutoScalingGroupName": "playback-service-asg",
  "MinSize": 10,
  "MaxSize": 1000,
  "DesiredCapacity": 50,
  "LaunchTemplate": {
    "LaunchTemplateName": "playback-service-template",
    "Version": "$Latest"
  },
  "MixedInstancesPolicy": {
    "InstancesDistribution": {
      "OnDemandBaseCapacity": 10,
      "OnDemandPercentageAboveBaseCapacity": 20,
      "SpotAllocationStrategy": "capacity-optimized"
    },
    "LaunchTemplate": {
      "Overrides": [
        {"InstanceType": "c5.xlarge"},
        {"InstanceType": "c5.2xlarge"},
        {"InstanceType": "m5.xlarge"}
      ]
    }
  },
  "TargetGroupARNs": ["arn:aws:elasticloadbalancing:..."],
  "HealthCheckType": "ELB",
  "HealthCheckGracePeriod": 300
}

// Scaling Policy
{
  "PolicyName": "cpu-scaling-policy",
  "PolicyType": "TargetTrackingScaling",
  "TargetTrackingConfiguration": {
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ASGAverageCPUUtilization"
    },
    "TargetValue": 70.0
  }
}`
        },
        {
          name: 'Resilience Patterns',
          diagram: ResilienceDiagram,
          explanation: 'Netflix implements multiple resilience patterns to handle failures gracefully. Circuit Breakers (Hystrix) prevent cascade failures by failing fast when downstream services are unhealthy. Bulkheads isolate thread pools per service so one slow service doesn\'t exhaust all threads. Timeouts ensure requests fail fast rather than hanging indefinitely. Fallbacks provide default responses when services are unavailable. Retry logic with exponential backoff handles transient failures.',
          codeExample: `// Resilience4j Configuration (modern alternative to Hystrix)
@Service
public class ResilientPlaybackService {

    @CircuitBreaker(name = "playbackService", fallbackMethod = "fallback")
    @Bulkhead(name = "playbackService", type = Bulkhead.Type.THREADPOOL)
    @Retry(name = "playbackService")
    @TimeLimiter(name = "playbackService")
    public CompletableFuture<PlaybackInfo> getPlaybackInfo(String videoId) {
        return CompletableFuture.supplyAsync(() ->
            playbackClient.getPlaybackInfo(videoId)
        );
    }

    public CompletableFuture<PlaybackInfo> fallback(
            String videoId, Exception e) {
        log.warn("Fallback triggered for video: {}", videoId, e);
        return CompletableFuture.completedFuture(
            PlaybackInfo.cached(videoId)
        );
    }
}

// resilience4j configuration
resilience4j:
  circuitbreaker:
    instances:
      playbackService:
        slidingWindowSize: 100
        failureRateThreshold: 50
        waitDurationInOpenState: 10s
  bulkhead:
    instances:
      playbackService:
        maxConcurrentCalls: 20
        maxWaitDuration: 0s
  retry:
    instances:
      playbackService:
        maxAttempts: 3
        waitDuration: 500ms`
        },
        {
          name: 'Chaos Engineering',
          explanation: 'Netflix pioneered Chaos Engineering with tools like Chaos Monkey, which randomly terminates production instances to verify system resilience. The Simian Army extends this with Latency Monkey (inject delays), Conformity Monkey (check instance health), and Chaos Kong (simulate region failure). ChAP (Chaos Automation Platform) automates chaos experiments with defined blast radius and automatic rollback. These practices ensure systems are resilient to real-world failures.',
          codeExample: `// Chaos Engineering Experiment Definition
{
  "experiment": {
    "name": "playback-service-instance-kill",
    "description": "Randomly terminate playback service instances",
    "target": {
      "service": "playback-service",
      "region": "us-east-1",
      "minHealthyInstances": 10
    },
    "attack": {
      "type": "instance-termination",
      "count": 3,
      "interval": "5m"
    },
    "duration": "1h",
    "schedule": "0 14 * * MON-FRI", // Weekdays at 2pm
    "safetyChecks": {
      "errorRateThreshold": 0.01,
      "latencyP99Threshold": "500ms",
      "autoRollback": true
    },
    "notifications": {
      "slack": "#chaos-experiments",
      "pagerduty": "playback-team"
    }
  }
}

// Chaos Monkey simplified logic
public class ChaosMonkey {
    @Scheduled(fixedRate = 300000) // Every 5 minutes
    public void unleashChaos() {
        if (!isBusinessHours()) return;

        List<Instance> targets = ec2Client.describeInstances()
            .stream()
            .filter(i -> i.hasTag("chaos-monkey-enabled"))
            .filter(i -> random.nextDouble() < KILL_PROBABILITY)
            .limit(MAX_KILLS_PER_RUN)
            .collect(Collectors.toList());

        targets.forEach(this::terminateInstance);
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
      { name: 'System Design', icon: '🏗️', page: 'System Design' },
      { name: 'Netflix', icon: '🎬', page: 'Netflix' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #450a0a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #e50914, #f87171)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(229, 9, 20, 0.2)',
    border: '1px solid rgba(229, 9, 20, 0.3)',
    borderRadius: '0.5rem',
    color: '#f87171',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Netflix System Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(229, 9, 20, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(229, 9, 20, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to System Design
        </button>
      </div>

      {/* Subtitle */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '0 0 1rem' }}>
          Global streaming platform | 230M+ subscribers | 70+ countries | 1 billion hours watched/week
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.5rem 1rem', background: 'rgba(229, 9, 20, 0.2)', border: '1px solid rgba(229, 9, 20, 0.3)', borderRadius: '0.5rem', color: '#f87171', fontSize: '0.875rem' }}>Video Encoding</span>
          <span style={{ padding: '0.5rem 1rem', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '0.5rem', color: '#60a5fa', fontSize: '0.875rem' }}>CDN Architecture</span>
          <span style={{ padding: '0.5rem 1rem', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '0.5rem', color: '#4ade80', fontSize: '0.875rem' }}>ML Recommendations</span>
          <span style={{ padding: '0.5rem 1rem', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '0.5rem', color: '#a78bfa', fontSize: '0.875rem' }}>Microservices</span>
          <span style={{ padding: '0.5rem 1rem', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '0.5rem', color: '#fbbf24', fontSize: '0.875rem' }}>AWS Cloud</span>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={TOPIC_COLORS}
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
              colors={TOPIC_COLORS}
            />

            {/* Modal Header */}
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
                >Prev</button>
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
                >Next</button>
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
                >Close</button>
              </div>
            </div>

            {/* Detail Tabs */}
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

            {/* Selected Detail Content */}
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

export default Netflix

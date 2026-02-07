/**
 * Mobile Weather App System Design
 *
 * Converted to tab_template format with concepts covering:
 * - API Integration
 * - Data Caching
 * - Location Services
 * - Weather Alerts
 * - UI/UX & Mobile Performance
 * - Scalability & Trade-offs
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#22d3ee',
  primaryHover: '#67e8f9',
  bg: 'rgba(34, 211, 238, 0.1)',
  border: 'rgba(34, 211, 238, 0.3)',
  arrow: '#06b6d4',
  hoverBg: 'rgba(34, 211, 238, 0.2)',
  topicBg: 'rgba(34, 211, 238, 0.2)'
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

const HighLevelArchitectureDiagram = () => (
  <svg viewBox="0 0 900 500" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22d3ee" />
      </marker>
    </defs>

    <text x="450" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Mobile Weather App Architecture
    </text>

    {/* Mobile Clients */}
    <rect x="50" y="50" width="100" height="50" rx="8" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="2"/>
    <text x="100" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">iOS App</text>

    <rect x="170" y="50" width="100" height="50" rx="8" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="2"/>
    <text x="220" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Android App</text>

    {/* CDN */}
    <rect x="320" y="50" width="100" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="370" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CDN</text>

    {/* Load Balancer */}
    <rect x="100" y="140" width="180" height="45" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="190" y="167" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Load Balancer</text>

    {/* API Gateway */}
    <rect x="100" y="210" width="180" height="45" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="190" y="237" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">API Gateway</text>

    {/* Services */}
    <rect x="50" y="290" width="110" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="105" y="315" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Weather</text>
    <text x="105" y="330" textAnchor="middle" fill="white" fontSize="8">Service</text>

    <rect x="175" y="290" width="110" height="60" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="230" y="315" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Location</text>
    <text x="230" y="330" textAnchor="middle" fill="white" fontSize="8">Service</text>

    <rect x="300" y="290" width="110" height="60" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="355" y="315" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Alert</text>
    <text x="355" y="330" textAnchor="middle" fill="white" fontSize="8">Service</text>

    <rect x="425" y="290" width="110" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="480" y="315" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Map</text>
    <text x="480" y="330" textAnchor="middle" fill="white" fontSize="8">Service</text>

    {/* Cache & External APIs */}
    <rect x="50" y="390" width="140" height="45" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="120" y="417" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Redis Cache</text>

    <rect x="250" y="390" width="200" height="45" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="350" y="417" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Weather APIs (NOAA, OWM)</text>

    {/* Databases */}
    <rect x="550" y="290" width="100" height="50" rx="6" fill="#334155" stroke="#475569" strokeWidth="2"/>
    <text x="600" y="320" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PostgreSQL</text>

    <rect x="670" y="290" width="100" height="50" rx="6" fill="#334155" stroke="#475569" strokeWidth="2"/>
    <text x="720" y="320" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MongoDB</text>

    <rect x="550" y="360" width="100" height="50" rx="6" fill="#059669" stroke="#34d399" strokeWidth="2"/>
    <text x="600" y="390" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">S3 (Tiles)</text>

    <rect x="670" y="360" width="100" height="50" rx="6" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="720" y="390" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Kafka</text>

    {/* Connections */}
    <line x1="100" y1="100" x2="190" y2="140" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <line x1="220" y1="100" x2="190" y2="140" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <line x1="190" y1="185" x2="190" y2="210" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <line x1="190" y1="255" x2="105" y2="290" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <line x1="190" y1="255" x2="230" y2="290" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <line x1="190" y1="255" x2="355" y2="290" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <line x1="105" y1="350" x2="120" y2="390" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <line x1="105" y1="350" x2="350" y2="390" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
  </svg>
)

const WeatherAPIFlowDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-api" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">
      Weather API Request Flow
    </text>

    <rect x="30" y="60" width="90" height="50" rx="6" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="2"/>
    <text x="75" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Mobile App</text>

    <rect x="160" y="60" width="100" height="50" rx="6" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="210" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">API Gateway</text>

    <rect x="300" y="60" width="100" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="350" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Weather Svc</text>

    <rect x="440" y="40" width="90" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="485" y="65" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Redis</text>
    <text x="485" y="140" textAnchor="middle" fill="#22c55e" fontSize="9">Cache Hit</text>

    <rect x="440" y="100" width="90" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="485" y="125" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">External API</text>
    <text x="485" y="160" textAnchor="middle" fill="#f59e0b" fontSize="9">Cache Miss</text>

    <rect x="580" y="60" width="90" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="625" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Response</text>

    <line x1="120" y1="85" x2="155" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-api)"/>
    <line x1="260" y1="85" x2="295" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-api)"/>
    <line x1="400" y1="75" x2="435" y2="60" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-api)"/>
    <line x1="400" y1="95" x2="435" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-api)"/>
    <line x1="530" y1="60" x2="575" y2="75" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-api)"/>
    <line x1="530" y1="120" x2="575" y2="95" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-api)"/>

    <text x="400" y="200" textAnchor="middle" fill="#64748b" fontSize="10">85% cache hit rate reduces external API calls and latency</text>
  </svg>
)

const CachingLayersDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-cache" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Multi-Layer Caching Strategy
    </text>

    {/* L1 Client Cache */}
    <rect x="50" y="60" width="180" height="80" rx="8" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="2"/>
    <text x="140" y="85" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">L1: Client Cache</text>
    <text x="140" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">SQLite / Local Storage</text>
    <text x="140" y="125" textAnchor="middle" fill="#64748b" fontSize="9">Offline support, 24h data</text>

    {/* L2 Redis Cache */}
    <rect x="310" y="60" width="180" height="80" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">L2: Redis Cache</text>
    <text x="400" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">Server-side, 15min TTL</text>
    <text x="400" y="125" textAnchor="middle" fill="#64748b" fontSize="9">{`85% hit rate, &lt;50ms`}</text>

    {/* L3 CDN */}
    <rect x="570" y="60" width="180" height="80" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="660" y="85" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">L3: CDN Edge</text>
    <text x="660" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">CloudFront / Fastly</text>
    <text x="660" y="125" textAnchor="middle" fill="#64748b" fontSize="9">Map tiles, static assets</text>

    {/* TTL Box */}
    <rect x="150" y="180" width="500" height="70" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="205" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Cache TTL Strategy</text>
    <text x="400" y="225" textAnchor="middle" fill="#94a3b8" fontSize="10">Current: 15min | Hourly: 1hr | Daily: 6hr | Geocoding: 24hr</text>
    <text x="400" y="240" textAnchor="middle" fill="#64748b" fontSize="9">Weather changes slowly - 15min staleness is acceptable</text>

    {/* Arrows */}
    <line x1="230" y1="100" x2="305" y2="100" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-cache)"/>
    <line x1="490" y1="100" x2="565" y2="100" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-cache)"/>
  </svg>
)

const LocationServiceDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-loc" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">
      Location Service Architecture
    </text>

    <rect x="50" y="60" width="120" height="60" rx="8" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="2"/>
    <text x="110" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">GPS</text>
    <text x="110" y="100" textAnchor="middle" fill="white" fontSize="9">Coordinates</text>

    <rect x="50" y="140" width="120" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="110" y="165" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">City Search</text>
    <text x="110" y="180" textAnchor="middle" fill="white" fontSize="9">Autocomplete</text>

    <rect x="250" y="100" width="140" height="60" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="320" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Location Service</text>
    <text x="320" y="142" textAnchor="middle" fill="white" fontSize="9">Geocoding API</text>

    <rect x="470" y="60" width="130" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="535" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Reverse Geocode</text>

    <rect x="470" y="130" width="130" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="535" y="160" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Forward Geocode</text>

    <rect x="680" y="95" width="100" height="50" rx="8" fill="#334155" stroke="#475569" strokeWidth="2"/>
    <text x="730" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MongoDB</text>

    <line x1="170" y1="90" x2="245" y2="115" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-loc)"/>
    <line x1="170" y1="170" x2="245" y2="140" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-loc)"/>
    <line x1="390" y1="115" x2="465" y2="85" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-loc)"/>
    <line x1="390" y1="140" x2="465" y2="155" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-loc)"/>
    <line x1="600" y1="120" x2="675" y2="120" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-loc)"/>
  </svg>
)

const AlertSystemDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-alert" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">
      Severe Weather Alert Pipeline
    </text>

    <rect x="30" y="60" width="100" height="55" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">NOAA</text>
    <text x="80" y="100" textAnchor="middle" fill="white" fontSize="9">Webhook</text>

    <rect x="170" y="60" width="110" height="55" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="225" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Alert Service</text>
    <text x="225" y="100" textAnchor="middle" fill="white" fontSize="9">{`Parse & Filter`}</text>

    <rect x="320" y="60" width="100" height="55" rx="6" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="370" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Kafka</text>
    <text x="370" y="100" textAnchor="middle" fill="white" fontSize="9">Queue</text>

    <rect x="460" y="40" width="100" height="45" rx="6" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="2"/>
    <text x="510" y="67" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">FCM (Android)</text>

    <rect x="460" y="95" width="100" height="45" rx="6" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="2"/>
    <text x="510" y="122" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">APNS (iOS)</text>

    <rect x="600" y="60" width="90" height="55" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="645" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Users</text>
    <text x="645" y="100" textAnchor="middle" fill="white" fontSize="9">Notified</text>

    <rect x="320" y="150" width="100" height="45" rx="6" fill="#334155" stroke="#475569" strokeWidth="2"/>
    <text x="370" y="177" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">TimescaleDB</text>

    <line x1="130" y1="87" x2="165" y2="87" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-alert)"/>
    <line x1="280" y1="87" x2="315" y2="87" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-alert)"/>
    <line x1="420" y1="75" x2="455" y2="62" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-alert)"/>
    <line x1="420" y1="100" x2="455" y2="117" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-alert)"/>
    <line x1="560" y1="62" x2="595" y2="75" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-alert)"/>
    <line x1="560" y1="117" x2="595" y2="100" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-alert)"/>
    <line x1="370" y1="115" x2="370" y2="145" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-alert)"/>

    <text x="400" y="230" textAnchor="middle" fill="#64748b" fontSize="10">Geospatial query matches alerts to users with saved locations in affected regions</text>
  </svg>
)

const MobilePerformanceDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">
      Mobile Performance Optimization
    </text>

    {/* Battery Section */}
    <rect x="50" y="50" width="200" height="140" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Battery Efficiency</text>
    <text x="150" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">GPS on app open only</text>
    <text x="150" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Background refresh: 1hr</text>
    <text x="150" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Batch network requests</text>
    <text x="150" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Geofencing for alerts</text>

    {/* Offline Section */}
    <rect x="300" y="50" width="200" height="140" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Offline Support</text>
    <text x="400" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">Cache last 24hr data</text>
    <text x="400" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Show last update time</text>
    <text x="400" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Graceful degradation</text>
    <text x="400" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Sync on reconnect</text>

    {/* Network Section */}
    <rect x="550" y="50" width="200" height="140" rx="8" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Network Optimization</text>
    <text x="650" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">Response size: ~10KB</text>
    <text x="650" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Compress with gzip</text>
    <text x="650" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Delta updates only</text>
    <text x="650" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">{`Target latency: &lt;1s`}</text>
  </svg>
)

const ScalabilityDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">
      Scale Estimates (10M Users)
    </text>

    <rect x="50" y="50" width="170" height="160" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="135" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Traffic</text>
    <text x="135" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">DAU: 3M users</text>
    <text x="135" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Peak QPS: ~500</text>
    <text x="135" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Avg QPS: ~175</text>
    <text x="135" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">15M weather/day</text>
    <text x="135" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">100K alerts/day</text>

    <rect x="260" y="50" width="170" height="160" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="345" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Storage</text>
    <text x="345" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">User DB: ~100MB</text>
    <text x="345" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Location: ~500MB</text>
    <text x="345" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Alert history: ~10GB/yr</text>
    <text x="345" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Map tiles: ~50GB</text>
    <text x="345" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">Analytics: ~1TB/yr</text>

    <rect x="470" y="50" width="170" height="160" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="555" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Performance</text>
    <text x="555" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">Cache hit: 85%</text>
    <text x="555" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">{`Cache latency: &lt;50ms`}</text>
    <text x="555" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">{`API fallback: &lt;2s`}</text>
    <text x="555" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Bandwidth: 150GB/day</text>
    <text x="555" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">Uptime: 99.9%</text>

    <rect x="680" y="50" width="100" height="160" rx="8" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="730" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Cost</text>
    <text x="730" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">External API:</text>
    <text x="730" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">~26 QPS</text>
    <text x="730" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">(after cache)</text>
    <text x="730" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">&lt;$100/mo</text>
  </svg>
)

const TradeoffsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">
      Key Architecture Decisions
    </text>

    <rect x="50" y="50" width="200" height="120" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">15min Cache TTL</text>
    <text x="150" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">Weather changes slowly</text>
    <text x="150" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">85% fewer API calls</text>
    <text x="150" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Acceptable staleness</text>

    <rect x="300" y="50" width="200" height="120" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Primary + Fallback API</text>
    <text x="400" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">OpenWeatherMap primary</text>
    <text x="400" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">NOAA fallback (US)</text>
    <text x="400" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Redundancy + cost balance</text>

    <rect x="550" y="50" width="200" height="120" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Native Apps</text>
    <text x="650" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">Best performance/UX</text>
    <text x="650" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Smooth animations</text>
    <text x="650" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Battery efficient GPS</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function MobileWeatherApp({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'api-integration',
      name: 'Weather API Integration',
      icon: '☁️',
      color: '#3b82f6',
      description: 'Fetching and aggregating weather data from multiple providers with normalization and failover.',
      diagram: WeatherAPIFlowDiagram,
      details: [
        {
          name: 'Data Aggregation',
          diagram: WeatherAPIFlowDiagram,
          explanation: 'The Weather Service fetches data from multiple providers (OpenWeatherMap as primary, NOAA for US locations as fallback). Data is normalized into a consistent format with temperature, humidity, wind, precipitation, and derived metrics like "feels like" and wind chill. This multi-provider approach provides redundancy while keeping costs manageable.',
          codeExample: `// Weather Service - Data Aggregation
@Service
public class WeatherService {

    private final OpenWeatherMapClient owmClient;
    private final NOAAClient noaaClient;
    private final RedisTemplate<String, WeatherData> cache;

    public WeatherData getWeather(double lat, double lon) {
        String cacheKey = String.format("weather:%f:%f", lat, lon);

        // Check cache first (L2 - Redis)
        WeatherData cached = cache.opsForValue().get(cacheKey);
        if (cached != null) {
            return cached; // ~50ms response
        }

        // Fetch from primary provider
        WeatherData weather;
        try {
            weather = owmClient.fetchWeather(lat, lon);
        } catch (Exception e) {
            // Fallback to NOAA for US locations
            weather = noaaClient.fetchWeather(lat, lon);
        }

        // Normalize and enrich data
        weather = normalizeData(weather);
        weather.setFeelsLike(calculateFeelsLike(weather));

        // Cache for 15 minutes
        cache.opsForValue().set(cacheKey, weather,
            Duration.ofMinutes(15));

        return weather;
    }
}`
        },
        {
          name: 'Response Format',
          explanation: 'The API returns a comprehensive weather response including current conditions, hourly forecast (48 hours), and daily forecast (7-14 days). Temperature is provided in both Fahrenheit and Celsius. The response includes timestamps for cache freshness tracking and supports user unit preferences.',
          codeExample: `// Weather API Response DTO
public record WeatherResponse(
    CurrentWeather current,
    List<HourlyForecast> hourly,  // 48 hours
    List<DailyForecast> daily,    // 7-14 days
    Location location,
    Instant lastUpdated,
    Instant cacheExpires
) {}

public record CurrentWeather(
    double temperatureF,
    double temperatureC,
    double feelsLikeF,
    double feelsLikeC,
    int humidity,           // percentage
    double pressureMb,
    double visibilityMiles,
    Wind wind,
    String condition,       // "Sunny", "Cloudy", etc.
    String iconCode,        // for UI weather icons
    Integer uvIndex,
    AirQuality airQuality
) {}

public record Wind(
    double speedMph,
    double gustMph,
    String direction,       // "NW", "SE", etc.
    int degrees            // 0-360
) {}`
        },
        {
          name: 'API Rate Limiting',
          explanation: 'External weather APIs have rate limits (OpenWeatherMap: 1M calls/month free tier). With aggressive caching (85% hit rate) and smart request batching, actual API usage is ~26 QPS (5K calls/day), well within limits. The system implements exponential backoff and circuit breakers for resilience.',
          codeExample: `// Rate Limiter and Circuit Breaker
@Component
public class WeatherAPIClient {

    private final RateLimiter rateLimiter =
        RateLimiter.create(30); // 30 requests/second max

    @CircuitBreaker(name = "weatherApi",
        fallbackMethod = "fallbackWeather")
    @RateLimiter(name = "weatherApi")
    @Retry(name = "weatherApi")
    public WeatherData fetchFromAPI(double lat, double lon) {
        rateLimiter.acquire(); // Block if rate exceeded

        return webClient.get()
            .uri("/weather?lat={lat}&lon={lon}", lat, lon)
            .retrieve()
            .bodyToMono(WeatherData.class)
            .timeout(Duration.ofSeconds(5))
            .block();
    }

    private WeatherData fallbackWeather(double lat, double lon,
            Throwable t) {
        log.warn("Primary API failed, using fallback: {}",
            t.getMessage());
        return noaaClient.fetchWeather(lat, lon);
    }
}`
        }
      ]
    },
    {
      id: 'data-caching',
      name: 'Multi-Layer Caching',
      icon: '⚡',
      color: '#ef4444',
      description: 'Three-tier caching strategy with client, server, and CDN layers for optimal performance and offline support.',
      diagram: CachingLayersDiagram,
      details: [
        {
          name: 'Client-Side Cache (L1)',
          diagram: CachingLayersDiagram,
          explanation: 'Mobile apps cache weather data locally using SQLite (iOS/Android) or Room database. This enables offline viewing with last known data, reduces network requests, and provides instant app launch. The cache stores the last 24 hours of weather data with timestamps for freshness indication.',
          codeExample: `// Android Room Database for Local Cache
@Entity(tableName = "weather_cache")
data class CachedWeather(
    @PrimaryKey val locationKey: String, // "lat:lon"
    val weatherJson: String,
    val cachedAt: Long,
    val expiresAt: Long
)

@Dao
interface WeatherCacheDao {
    @Query("SELECT * FROM weather_cache WHERE locationKey = :key")
    suspend fun getCached(key: String): CachedWeather?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun cache(weather: CachedWeather)

    @Query("DELETE FROM weather_cache WHERE expiresAt < :now")
    suspend fun clearExpired(now: Long)
}

// Repository with cache-first strategy
class WeatherRepository(
    private val api: WeatherApi,
    private val cache: WeatherCacheDao
) {
    suspend fun getWeather(lat: Double, lon: Double): Weather {
        val key = "$lat:$lon"

        // Check local cache first
        cache.getCached(key)?.let { cached ->
            if (cached.expiresAt > System.currentTimeMillis()) {
                return Json.decodeFromString(cached.weatherJson)
            }
        }

        // Fetch from API, update cache
        val weather = api.getWeather(lat, lon)
        cache.cache(CachedWeather(
            locationKey = key,
            weatherJson = Json.encodeToString(weather),
            cachedAt = System.currentTimeMillis(),
            expiresAt = System.currentTimeMillis() + 15.minutes
        ))
        return weather
    }
}`
        },
        {
          name: 'Redis Cache (L2)',
          explanation: 'Server-side Redis cache provides sub-50ms responses for cached data. TTLs vary by data type: current weather (15 min), hourly forecast (1 hr), daily forecast (6 hr), geocoding results (24 hr). This achieves an 85% cache hit rate, dramatically reducing external API calls.',
          codeExample: `// Redis Caching Configuration
@Configuration
public class CacheConfig {

    @Bean
    public RedisCacheManager cacheManager(
            RedisConnectionFactory factory) {

        Map<String, RedisCacheConfiguration> configs = Map.of(
            "currentWeather", config(Duration.ofMinutes(15)),
            "hourlyForecast", config(Duration.ofHours(1)),
            "dailyForecast", config(Duration.ofHours(6)),
            "geocoding", config(Duration.ofHours(24))
        );

        return RedisCacheManager.builder(factory)
            .withInitialCacheConfigurations(configs)
            .build();
    }

    private RedisCacheConfiguration config(Duration ttl) {
        return RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(ttl)
            .serializeValuesWith(
                SerializationPair.fromSerializer(
                    new GenericJackson2JsonRedisSerializer()));
    }
}

// Cache-aside pattern in service
@Cacheable(value = "currentWeather",
    key = "#lat + ':' + #lon")
public WeatherData getCurrentWeather(double lat, double lon) {
    return weatherApiClient.fetchWeather(lat, lon);
}`
        },
        {
          name: 'CDN Edge Cache (L3)',
          explanation: 'CloudFront or Fastly caches static assets (weather icons, map tiles) at edge locations globally. Map tiles are generated on-demand and cached for 1 hour. Static content (icons, backgrounds) uses 7-day TTL. This reduces origin load and provides faster asset delivery worldwide.',
          codeExample: `// CDN Configuration for Map Tiles
// CloudFront Distribution Settings (Terraform)
resource "aws_cloudfront_distribution" "weather_cdn" {
  origin {
    domain_name = aws_s3_bucket.map_tiles.bucket_domain_name
    origin_id   = "S3-map-tiles"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_oai.main.path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-map-tiles"

    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }

    min_ttl     = 0
    default_ttl = 3600   // 1 hour for tiles
    max_ttl     = 86400  // 24 hours max

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  // Separate behavior for static icons
  ordered_cache_behavior {
    path_pattern     = "/icons/*"
    default_ttl      = 604800  // 7 days
    // ... other settings
  }
}`
        }
      ]
    },
    {
      id: 'location-services',
      name: 'Location Services',
      icon: '📍',
      color: '#06b6d4',
      description: 'GPS detection, geocoding, reverse geocoding, and saved locations management with autocomplete search.',
      diagram: LocationServiceDiagram,
      details: [
        {
          name: 'Geocoding & Reverse Geocoding',
          diagram: LocationServiceDiagram,
          explanation: 'The Location Service handles forward geocoding (city name to coordinates) and reverse geocoding (GPS coordinates to city name). It supports autocomplete for city search with fuzzy matching. Results are cached for 24 hours since location data rarely changes.',
          codeExample: `// Location Service Implementation
@Service
public class LocationService {

    private final GeocodingClient geocodingClient;

    @Cacheable(value = "geocoding", key = "#query")
    public List<Location> searchLocations(String query) {
        // Autocomplete search with fuzzy matching
        return geocodingClient.search(query)
            .stream()
            .map(this::toLocation)
            .limit(10)
            .toList();
    }

    @Cacheable(value = "reverseGeocode",
        key = "#lat + ':' + #lon")
    public Location reverseGeocode(double lat, double lon) {
        GeocodingResult result = geocodingClient
            .reverse(lat, lon);

        return new Location(
            result.city(),
            result.state(),
            result.country(),
            lat, lon,
            result.timezone()
        );
    }

    public List<Location> getSavedLocations(String userId) {
        return locationRepository.findByUserId(userId);
    }

    public void saveLocation(String userId, Location loc) {
        locationRepository.save(
            new SavedLocation(userId, loc));
    }
}`
        },
        {
          name: 'GPS Location Detection',
          explanation: 'Mobile apps request GPS location only on app open to preserve battery. The app uses significant location changes API on iOS and fused location provider on Android for efficient tracking. Background location is requested only for severe weather alerts in user-defined geofenced regions.',
          codeExample: `// iOS Location Manager
class LocationManager: NSObject, CLLocationManagerDelegate {
    private let manager = CLLocationManager()
    private var continuation: CheckedContinuation<CLLocation, Error>?

    func requestCurrentLocation() async throws -> CLLocation {
        manager.requestWhenInUseAuthorization()

        return try await withCheckedThrowingContinuation { cont in
            self.continuation = cont
            manager.desiredAccuracy = kCLLocationAccuracyKilometer
            manager.requestLocation() // Single request, battery efficient
        }
    }

    func locationManager(_ manager: CLLocationManager,
                        didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.first else { return }
        continuation?.resume(returning: location)
        continuation = nil
    }

    // Geofencing for weather alerts
    func setupAlertRegion(location: CLLocationCoordinate2D) {
        let region = CLCircularRegion(
            center: location,
            radius: 50000, // 50km radius
            identifier: "weather-alert-region"
        )
        region.notifyOnEntry = true
        manager.startMonitoring(for: region)
    }
}`
        },
        {
          name: 'Saved Locations Sync',
          explanation: 'Users can save multiple locations (home, work, vacation spots) with cloud sync across devices. The saved locations are stored in MongoDB with user association. Sync uses eventual consistency with conflict resolution based on last-write-wins with timestamp.',
          codeExample: `// Saved Locations with Cloud Sync
@Document(collection = "saved_locations")
public class SavedLocation {
    @Id
    private String id;
    private String userId;
    private String name;        // "Home", "Work", custom
    private double latitude;
    private double longitude;
    private String city;
    private String country;
    private int displayOrder;
    private Instant createdAt;
    private Instant updatedAt;
}

// Sync endpoint
@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @GetMapping("/sync")
    public SyncResponse syncLocations(
            @RequestParam Instant lastSync,
            @AuthenticationPrincipal User user) {

        List<SavedLocation> updated = locationRepo
            .findByUserIdAndUpdatedAtAfter(user.getId(), lastSync);

        return new SyncResponse(
            updated,
            Instant.now()
        );
    }

    @PostMapping("/sync")
    public void pushLocations(
            @RequestBody List<SavedLocation> locations,
            @AuthenticationPrincipal User user) {

        for (SavedLocation loc : locations) {
            loc.setUserId(user.getId());
            // Last-write-wins conflict resolution
            locationRepo.save(loc);
        }
    }
}`
        }
      ]
    },
    {
      id: 'weather-alerts',
      name: 'Weather Alerts',
      icon: '⚠️',
      color: '#ec4899',
      description: 'Severe weather monitoring, push notifications via FCM/APNS, and alert history tracking.',
      diagram: AlertSystemDiagram,
      details: [
        {
          name: 'Alert Processing Pipeline',
          diagram: AlertSystemDiagram,
          explanation: 'The Alert Service receives webhooks from NOAA for severe weather warnings. Alerts are parsed, filtered by type and severity, then published to Kafka. A geospatial query identifies users with saved locations in affected regions. Workers consume from Kafka to send push notifications via FCM (Android) and APNS (iOS).',
          codeExample: `// Alert Processing Service
@Service
public class AlertService {

    private final KafkaTemplate<String, WeatherAlert> kafka;
    private final LocationRepository locationRepo;

    // Webhook endpoint for NOAA alerts
    @PostMapping("/webhook/noaa")
    public void processAlert(@RequestBody NOAAAlert alert) {
        WeatherAlert weatherAlert = parseAlert(alert);

        // Find affected users via geospatial query
        List<String> affectedUserIds = locationRepo
            .findUsersInRegion(
                alert.getPolygon(),  // Affected area polygon
                alert.getRadius()
            );

        // Publish to Kafka for async processing
        for (String userId : affectedUserIds) {
            kafka.send("weather_alerts",
                new AlertEvent(userId, weatherAlert));
        }

        // Store in TimescaleDB for history
        alertHistoryRepo.save(weatherAlert);
    }

    private WeatherAlert parseAlert(NOAAAlert raw) {
        return new WeatherAlert(
            raw.getId(),
            AlertType.valueOf(raw.getEvent()),
            AlertSeverity.valueOf(raw.getSeverity()),
            raw.getHeadline(),
            raw.getDescription(),
            raw.getAffectedAreas(),
            raw.getEffective(),
            raw.getExpires()
        );
    }
}`
        },
        {
          name: 'Push Notification Delivery',
          explanation: 'A Kafka consumer processes alert events and sends push notifications via Firebase Cloud Messaging (Android) and Apple Push Notification Service (iOS). Users can configure alert preferences (types, quiet hours). High-priority alerts (tornado, hurricane) bypass quiet hours.',
          codeExample: `// Push Notification Worker
@KafkaListener(topics = "weather_alerts")
public class AlertNotificationWorker {

    private final FirebaseMessaging fcm;
    private final APNsClient apns;
    private final UserPreferencesRepo prefsRepo;

    @KafkaHandler
    public void handleAlert(AlertEvent event) {
        UserPreferences prefs = prefsRepo
            .findByUserId(event.userId());

        // Check if alert type is enabled
        if (!prefs.isAlertEnabled(event.alert().type())) {
            return;
        }

        // Check quiet hours (except high priority)
        if (prefs.isQuietHours() &&
            !event.alert().isHighPriority()) {
            return;
        }

        // Send to appropriate platform
        DeviceToken token = deviceRepo
            .findByUserId(event.userId());

        if (token.platform() == Platform.ANDROID) {
            sendFCM(token.token(), event.alert());
        } else {
            sendAPNS(token.token(), event.alert());
        }
    }

    private void sendFCM(String token, WeatherAlert alert) {
        Message message = Message.builder()
            .setToken(token)
            .setNotification(Notification.builder()
                .setTitle(alert.type().getDisplayName())
                .setBody(alert.headline())
                .build())
            .putData("alertId", alert.id())
            .putData("severity", alert.severity().name())
            .setAndroidConfig(AndroidConfig.builder()
                .setPriority(alert.isHighPriority() ?
                    Priority.HIGH : Priority.NORMAL)
                .build())
            .build();

        fcm.send(message);
    }
}`
        },
        {
          name: 'Alert History & Tracking',
          explanation: 'All alerts are stored in TimescaleDB (time-series optimized PostgreSQL) for history tracking. Users can view past alerts for their locations. Analytics track alert delivery rates, open rates, and false positive feedback for improving alert targeting.',
          codeExample: `// Alert History with TimescaleDB
@Entity
@Table(name = "weather_alerts")
public class AlertHistory {
    @Id
    private String alertId;
    private String alertType;
    private String severity;
    private String headline;
    private String description;

    @Type(type = "json")
    private Polygon affectedArea;

    private Instant effectiveAt;
    private Instant expiresAt;
    private Instant receivedAt;

    // Hypertable partitioned by time
}

-- TimescaleDB schema
CREATE TABLE weather_alerts (
    alert_id TEXT,
    alert_type TEXT,
    severity TEXT,
    headline TEXT,
    affected_area GEOMETRY(POLYGON, 4326),
    effective_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    received_at TIMESTAMPTZ NOT NULL
);

-- Convert to hypertable for time-series optimization
SELECT create_hypertable('weather_alerts', 'received_at');

-- Index for geospatial queries
CREATE INDEX idx_alerts_area
    ON weather_alerts USING GIST (affected_area);

-- Retention policy: keep 1 year of alerts
SELECT add_retention_policy('weather_alerts',
    INTERVAL '1 year');`
        }
      ]
    },
    {
      id: 'mobile-performance',
      name: 'Mobile Performance',
      icon: '📱',
      color: '#22c55e',
      description: 'Battery efficiency, offline support, network optimization, and smooth UI/UX for native mobile apps.',
      diagram: MobilePerformanceDiagram,
      details: [
        {
          name: 'Battery Efficiency',
          diagram: MobilePerformanceDiagram,
          explanation: 'Mobile weather apps must minimize battery drain. GPS is requested only on app open (not continuously). Background refresh is limited to once per hour using iOS Background App Refresh and Android WorkManager. Network requests are batched when possible. Geofencing replaces continuous location tracking for alerts.',
          codeExample: `// Android Battery-Efficient Background Refresh
class WeatherSyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        // Get last known location (no GPS wake)
        val location = locationProvider.lastLocation
            ?: return Result.retry()

        // Fetch weather in background
        val weather = weatherRepo.getWeather(
            location.latitude,
            location.longitude
        )

        // Update widget and cache
        widgetManager.updateWeatherWidget(weather)
        notificationManager.updateOngoingWeather(weather)

        return Result.success()
    }
}

// Schedule hourly background refresh
fun scheduleBackgroundSync() {
    val constraints = Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .setRequiresBatteryNotLow(true)
        .build()

    val workRequest = PeriodicWorkRequestBuilder<WeatherSyncWorker>(
        1, TimeUnit.HOURS,      // Repeat interval
        15, TimeUnit.MINUTES    // Flex interval
    )
        .setConstraints(constraints)
        .build()

    WorkManager.getInstance(context)
        .enqueueUniquePeriodicWork(
            "weather_sync",
            ExistingPeriodicWorkPolicy.KEEP,
            workRequest
        )
}`
        },
        {
          name: 'Offline Support',
          explanation: 'The app caches the last 24 hours of weather data locally for offline viewing. When offline, the UI displays cached data with a "Last updated" timestamp. Graceful degradation shows the most recent forecast even if stale. Sync occurs automatically when network connectivity is restored.',
          codeExample: `// iOS Offline-First Architecture
class WeatherViewModel: ObservableObject {
    @Published var weather: Weather?
    @Published var isOffline: Bool = false
    @Published var lastUpdated: Date?

    private let repository: WeatherRepository
    private let networkMonitor = NWPathMonitor()

    init(repository: WeatherRepository) {
        self.repository = repository
        setupNetworkMonitoring()
    }

    func loadWeather(for location: Location) async {
        // Always show cached data first (instant UI)
        if let cached = await repository.getCachedWeather(
            lat: location.latitude,
            lon: location.longitude
        ) {
            await MainActor.run {
                self.weather = cached.weather
                self.lastUpdated = cached.timestamp
            }
        }

        // Fetch fresh data if online
        if !isOffline {
            do {
                let fresh = try await repository.fetchWeather(
                    lat: location.latitude,
                    lon: location.longitude
                )
                await MainActor.run {
                    self.weather = fresh
                    self.lastUpdated = Date()
                }
            } catch {
                // Show cached data with offline indicator
                await MainActor.run {
                    self.isOffline = true
                }
            }
        }
    }

    private func setupNetworkMonitoring() {
        networkMonitor.pathUpdateHandler = { [weak self] path in
            DispatchQueue.main.async {
                self?.isOffline = path.status != .satisfied
                if path.status == .satisfied {
                    Task { await self?.refreshAllLocations() }
                }
            }
        }
        networkMonitor.start(queue: .global())
    }
}`
        },
        {
          name: 'Native UI/UX',
          explanation: 'Native apps (Swift/SwiftUI for iOS, Kotlin/Jetpack Compose for Android) provide the best performance for weather visualization. Smooth animations for weather conditions, efficient map rendering with tile streaming, and platform-native gestures create a premium user experience.',
          codeExample: `// SwiftUI Weather Card with Animations
struct WeatherCard: View {
    let weather: CurrentWeather
    @State private var isAnimating = false

    var body: some View {
        VStack(spacing: 16) {
            // Animated weather icon
            LottieView(animation: weather.condition.animation)
                .frame(width: 120, height: 120)

            // Temperature with spring animation
            Text("\\(weather.temperatureF, specifier: \"%.0f\")°")
                .font(.system(size: 72, weight: .thin))
                .scaleEffect(isAnimating ? 1.0 : 0.8)
                .animation(.spring(response: 0.5), value: isAnimating)

            // Condition text
            Text(weather.condition.description)
                .font(.title2)
                .foregroundColor(.secondary)

            // Stats row with staggered animation
            HStack(spacing: 24) {
                WeatherStat(icon: "humidity",
                           value: "\\(weather.humidity)%")
                WeatherStat(icon: "wind",
                           value: "\\(weather.windSpeed) mph")
                WeatherStat(icon: "eye",
                           value: "\\(weather.visibility) mi")
            }
            .opacity(isAnimating ? 1 : 0)
            .offset(y: isAnimating ? 0 : 20)
            .animation(.easeOut.delay(0.2), value: isAnimating)
        }
        .padding(24)
        .background(
            LinearGradient(
                colors: weather.condition.gradientColors,
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .cornerRadius(24)
        .onAppear { isAnimating = true }
    }
}`
        }
      ]
    },
    {
      id: 'scalability',
      name: 'Scalability & Trade-offs',
      icon: '📈',
      color: '#8b5cf6',
      description: 'Handling 10M+ users with cost-effective architecture and key design decisions.',
      diagram: ScalabilityDiagram,
      details: [
        {
          name: 'Scale Estimates',
          diagram: ScalabilityDiagram,
          explanation: 'Supporting 10M total users with 3M DAU requires careful capacity planning. Peak QPS reaches ~500 during morning/evening commute times. With 85% cache hit rate, actual external API calls drop to ~26 QPS. Storage is relatively modest: user data ~100MB, location database ~500MB, alert history ~10GB/year.',
          codeExample: `// Capacity Planning Calculations
/*
User Base:
- Total users: 10 million
- DAU: 3 million (30%)
- Sessions per day: 5 per user
- Weather checks: 15 million/day

Traffic:
- Average QPS: 15M / 86400 = ~175 QPS
- Peak QPS: 3x average = ~500 QPS
- Cache hit rate: 85%
- External API calls: 175 * 0.15 = ~26 QPS

Storage:
- User data: 10M users × 10KB = 100MB
- Saved locations: 10M × 4 × 1KB = 40MB
- Location DB (cities): ~500MB
- Alert history (1 year): ~10GB
- Map tiles (S3): ~50GB
- Analytics (1 year): ~1TB

Bandwidth:
- Average response: 10KB
- Daily bandwidth: 15M × 10KB = 150GB/day
- Monthly: ~4.5TB

Cost Estimates (AWS):
- EC2 (API servers): $300/mo
- Redis (ElastiCache): $100/mo
- RDS (PostgreSQL): $100/mo
- S3 + CloudFront: $50/mo
- External APIs: $0 (within free tier)
- Total: ~$550/mo
*/`
        },
        {
          name: 'Architecture Trade-offs',
          diagram: TradeoffsDiagram,
          explanation: 'Key design decisions balance performance, cost, and complexity. 15-minute cache TTL accepts slight staleness for 85% fewer API calls. Primary + fallback API strategy provides redundancy without excessive costs. Native apps (vs React Native) chosen for best performance with weather animations and map rendering.',
          codeExample: `/*
Trade-off Analysis:

1. CACHING: Real-time vs 15-min Cache
   Decision: 15-minute cache TTL
   Rationale:
   - Weather changes slowly (15min staleness OK)
   - 85% cache hit = 85% cost savings
   - Response time: <50ms vs 2+ seconds
   - User research: freshness not top priority

2. API PROVIDERS: Single vs Multiple
   Decision: Primary (OWM) + Fallback (NOAA)
   Rationale:
   - Single point of failure = bad
   - Full redundancy = expensive
   - Compromise: primary + regional fallback
   - NOAA free for US = low marginal cost

3. MOBILE: Native vs Cross-Platform
   Decision: Native (Swift/Kotlin)
   Rationale:
   - Weather apps = heavy UI animations
   - Map rendering = performance critical
   - GPS efficiency = battery critical
   - Shared backend API = minimal duplication
   - Premium UX justifies dev cost

4. ALERTS: Polling vs Webhooks
   Decision: Webhooks from NOAA
   Rationale:
   - Polling = wasted API calls when no alerts
   - Webhooks = event-driven efficiency
   - Lower latency for time-critical alerts
   - Kafka buffering handles load spikes
*/`
        },
        {
          name: 'Technology Stack',
          explanation: 'The stack balances performance, developer productivity, and operational simplicity. Backend uses Node.js or Python (FastAPI) for async I/O with external APIs. Redis provides fast caching. Kafka handles async alert processing. PostgreSQL for users, MongoDB for flexible location data, TimescaleDB for alert time-series.',
          codeExample: `/*
Technology Stack:

MOBILE CLIENTS:
- iOS: Swift 5.9 + SwiftUI
  - Core Location for GPS
  - Core Data + CloudKit for sync
  - MapKit for weather maps

- Android: Kotlin + Jetpack Compose
  - Fused Location Provider
  - Room + DataStore for caching
  - Google Maps SDK

BACKEND SERVICES:
- API Gateway: Kong / AWS API Gateway
- Weather Service: Python FastAPI
  - httpx for async HTTP
  - Redis caching
  - Circuit breaker (pybreaker)

- Location Service: Node.js + Express
  - Google Maps Geocoding API
  - MongoDB for saved locations

- Alert Service: Python + Kafka
  - NOAA webhook processing
  - Geospatial queries (PostGIS)

INFRASTRUCTURE:
- Orchestration: Kubernetes (EKS)
- CDN: CloudFront
- Cache: Redis (ElastiCache)
- Databases:
  - PostgreSQL (RDS) - users
  - MongoDB Atlas - locations
  - TimescaleDB - alert history
- Message Queue: Apache Kafka (MSK)
- Monitoring: Prometheus + Grafana
*/`
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
      { name: 'System Design', icon: '🏗️', page: 'Design' },
      { name: 'Mobile Weather App', icon: '🌤️', page: 'MobileWeatherApp' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #164e63 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(34, 211, 238, 0.2)',
    border: '1px solid rgba(34, 211, 238, 0.3)',
    borderRadius: '0.5rem',
    color: '#22d3ee',
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
        <h1 style={titleStyle}>Mobile Weather App</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(34, 211, 238, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(34, 211, 238, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to System Design
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={TOPIC_COLORS}
        />
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
        primaryColor={TOPIC_COLORS.primary}
      />


      {/* High-Level Architecture Overview */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid rgba(34, 211, 238, 0.3)'
      }}>
        <h2 style={{ color: '#22d3ee', marginTop: 0, marginBottom: '1rem', fontSize: '1.25rem' }}>
          System Overview
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.6' }}>
          Design a mobile weather application supporting 10M+ users with real-time data, forecasts,
          location services, weather alerts, and interactive maps. Key challenges: battery efficiency,
          offline support, external API cost management, and sub-second response times.
        </p>
        <HighLevelArchitectureDiagram />
      </div>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
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

      {/* Modal */}
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
              border: `1px solid ${selectedConcept.color}40`,
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
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

            {/* Detail Content */}
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

export default MobileWeatherApp

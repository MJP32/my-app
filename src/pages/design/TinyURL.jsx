import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import CompletionCheckbox from '../../components/CompletionCheckbox';

// SVG Diagram Components

// 1. High-level architecture diagram
const TinyURLArchitectureDiagram = () => (
  <svg viewBox="0 0 900 500" className="w-full h-auto">
    <defs>
      <linearGradient id="archClientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id="archLBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="archAPIGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="archCacheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="archDBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <marker id="archArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
      </marker>
      <filter id="archShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="900" height="500" fill="#1f2937" rx="12" />

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#f3f4f6" fontSize="18" fontWeight="bold">High-Level Architecture</text>

    {/* Clients */}
    <g filter="url(#archShadow)">
      <rect x="50" y="70" width="100" height="60" rx="8" fill="url(#archClientGrad)" />
      <text x="100" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Web Client</text>
      <text x="100" y="112" textAnchor="middle" fill="#e0f2fe" fontSize="9">Browser</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="170" y="70" width="100" height="60" rx="8" fill="url(#archClientGrad)" />
      <text x="220" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Mobile App</text>
      <text x="220" y="112" textAnchor="middle" fill="#e0f2fe" fontSize="9">iOS/Android</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="290" y="70" width="100" height="60" rx="8" fill="url(#archClientGrad)" />
      <text x="340" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">API Client</text>
      <text x="340" y="112" textAnchor="middle" fill="#e0f2fe" fontSize="9">Third-party</text>
    </g>

    {/* Arrows from clients */}
    <line x1="100" y1="130" x2="100" y2="165" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#archArrow)" />
    <line x1="220" y1="130" x2="220" y2="165" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#archArrow)" />
    <line x1="340" y1="130" x2="340" y2="165" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#archArrow)" />

    {/* Load Balancer */}
    <g filter="url(#archShadow)">
      <rect x="70" y="175" width="300" height="55" rx="8" fill="url(#archLBGrad)" />
      <text x="220" y="200" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Load Balancer (Nginx)</text>
      <text x="220" y="218" textAnchor="middle" fill="#e9d5ff" fontSize="10">SSL Termination | Rate Limiting</text>
    </g>

    {/* Arrow to API Servers */}
    <line x1="220" y1="230" x2="220" y2="265" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#archArrow)" />

    {/* API Servers */}
    <g filter="url(#archShadow)">
      <rect x="50" y="275" width="120" height="70" rx="8" fill="url(#archAPIGrad)" />
      <text x="110" y="300" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">API Server 1</text>
      <text x="110" y="318" textAnchor="middle" fill="#d1fae5" fontSize="9">Shortening</text>
      <text x="110" y="332" textAnchor="middle" fill="#d1fae5" fontSize="9">Redirect</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="190" y="275" width="120" height="70" rx="8" fill="url(#archAPIGrad)" />
      <text x="250" y="300" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">API Server 2</text>
      <text x="250" y="318" textAnchor="middle" fill="#d1fae5" fontSize="9">Shortening</text>
      <text x="250" y="332" textAnchor="middle" fill="#d1fae5" fontSize="9">Redirect</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="330" y="275" width="120" height="70" rx="8" fill="url(#archAPIGrad)" />
      <text x="390" y="300" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">API Server N</text>
      <text x="390" y="318" textAnchor="middle" fill="#d1fae5" fontSize="9">Shortening</text>
      <text x="390" y="332" textAnchor="middle" fill="#d1fae5" fontSize="9">Redirect</text>
    </g>

    {/* Arrows to Cache */}
    <line x1="250" y1="345" x2="450" y2="390" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#archArrow)" />
    <text x="320" y="370" fill="#9ca3af" fontSize="10">Cache First</text>

    {/* Cache Layer */}
    <g filter="url(#archShadow)">
      <rect x="470" y="175" width="180" height="70" rx="8" fill="url(#archCacheGrad)" />
      <text x="560" y="200" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Redis Cluster</text>
      <text x="560" y="218" textAnchor="middle" fill="#fef3c7" fontSize="10">URL Mapping Cache</text>
      <text x="560" y="234" textAnchor="middle" fill="#fef3c7" fontSize="10">Hot URLs | Counters</text>
    </g>

    {/* Arrow from API to Cache */}
    <line x1="450" y1="310" x2="510" y2="245" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#archArrow)" />

    {/* Database Layer */}
    <g filter="url(#archShadow)">
      <rect x="470" y="280" width="180" height="70" rx="8" fill="url(#archDBGrad)" />
      <text x="560" y="305" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">PostgreSQL</text>
      <text x="560" y="323" textAnchor="middle" fill="#dbeafe" fontSize="10">Primary Database</text>
      <text x="560" y="339" textAnchor="middle" fill="#dbeafe" fontSize="10">URLs | Users | Metadata</text>
    </g>

    {/* Arrow from Cache to DB */}
    <line x1="560" y1="245" x2="560" y2="270" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#archArrow)" />
    <text x="590" y="260" fill="#9ca3af" fontSize="9">Cache Miss</text>

    {/* Analytics Pipeline */}
    <g filter="url(#archShadow)">
      <rect x="700" y="175" width="160" height="55" rx="8" fill="#ef4444" />
      <text x="780" y="200" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Kafka</text>
      <text x="780" y="216" textAnchor="middle" fill="#fecaca" fontSize="9">Click Events</text>
    </g>

    <g filter="url(#archShadow)">
      <rect x="700" y="260" width="160" height="55" rx="8" fill="#ec4899" />
      <text x="780" y="285" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ClickHouse</text>
      <text x="780" y="301" textAnchor="middle" fill="#fbcfe8" fontSize="9">Analytics DB</text>
    </g>

    {/* Arrow from Kafka to ClickHouse */}
    <line x1="780" y1="230" x2="780" y2="250" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#archArrow)" />

    {/* Arrow from API to Kafka */}
    <line x1="450" y1="295" x2="690" y2="200" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#archArrow)" strokeDasharray="5,3" />
    <text x="560" y="235" fill="#9ca3af" fontSize="9">Async Events</text>

    {/* Flow Labels */}
    <rect x="50" y="400" width="800" height="90" rx="8" fill="#374151" opacity="0.5" />
    <text x="70" y="425" fill="#22d3ee" fontSize="11" fontWeight="bold">Request Flow:</text>
    <text x="70" y="445" fill="#d1d5db" fontSize="10">1. Client sends request to Load Balancer</text>
    <text x="70" y="462" fill="#d1d5db" fontSize="10">2. LB routes to available API Server</text>
    <text x="70" y="479" fill="#d1d5db" fontSize="10">3. API Server checks Redis cache first</text>

    <text x="350" y="425" fill="#22d3ee" fontSize="11" fontWeight="bold">Data Flow:</text>
    <text x="350" y="445" fill="#d1d5db" fontSize="10">4. On cache miss, query PostgreSQL</text>
    <text x="350" y="462" fill="#d1d5db" fontSize="10">5. Update cache with result</text>
    <text x="350" y="479" fill="#d1d5db" fontSize="10">6. Async publish click events to Kafka</text>

    <text x="620" y="425" fill="#22d3ee" fontSize="11" fontWeight="bold">Analytics:</text>
    <text x="620" y="445" fill="#d1d5db" fontSize="10">7. Kafka streams to ClickHouse</text>
    <text x="620" y="462" fill="#d1d5db" fontSize="10">8. Batch aggregation for reports</text>
    <text x="620" y="479" fill="#d1d5db" fontSize="10">9. Real-time dashboards</text>
  </svg>
);

// 2. URL Shortening diagram showing base62 encoding
const URLShorteningDiagram = () => (
  <svg viewBox="0 0 900 420" className="w-full h-auto">
    <defs>
      <linearGradient id="shortInputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="shortHashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6d28d9" />
      </linearGradient>
      <linearGradient id="shortBase62Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="shortOutputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <marker id="shortArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
      </marker>
      <filter id="shortShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="900" height="420" fill="#1f2937" rx="12" />

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#f3f4f6" fontSize="18" fontWeight="bold">URL Shortening Process</text>

    {/* Input URL */}
    <g filter="url(#shortShadow)">
      <rect x="30" y="70" width="250" height="60" rx="8" fill="url(#shortInputGrad)" />
      <text x="155" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Long URL Input</text>
      <text x="155" y="115" textAnchor="middle" fill="#dbeafe" fontSize="9">https://example.com/very/long/path...</text>
    </g>

    {/* Arrow */}
    <line x1="280" y1="100" x2="320" y2="100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#shortArrow)" />

    {/* Option A: Hash-based */}
    <g filter="url(#shortShadow)">
      <rect x="330" y="55" width="220" height="90" rx="8" fill="url(#shortHashGrad)" />
      <text x="440" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Option A: Hash Function</text>
      <text x="440" y="100" textAnchor="middle" fill="#e9d5ff" fontSize="10">MD5 or SHA256</text>
      <text x="440" y="120" textAnchor="middle" fill="#e9d5ff" fontSize="9">Take first 43 bits of hash</text>
      <text x="440" y="135" textAnchor="middle" fill="#fbbf24" fontSize="9">Risk: Collisions possible</text>
    </g>

    {/* Arrow from Hash */}
    <line x1="550" y1="100" x2="590" y2="100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#shortArrow)" />

    {/* Base62 Encoding */}
    <g filter="url(#shortShadow)">
      <rect x="600" y="55" width="160" height="90" rx="8" fill="url(#shortBase62Grad)" />
      <text x="680" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Base62 Encode</text>
      <text x="680" y="100" textAnchor="middle" fill="#d1fae5" fontSize="10">[a-z, A-Z, 0-9]</text>
      <text x="680" y="118" textAnchor="middle" fill="#d1fae5" fontSize="9">62 characters</text>
      <text x="680" y="135" textAnchor="middle" fill="#d1fae5" fontSize="9">7 chars = 3.5T IDs</text>
    </g>

    {/* Arrow to Output */}
    <line x1="760" y1="100" x2="800" y2="100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#shortArrow)" />

    {/* Output */}
    <g filter="url(#shortShadow)">
      <rect x="810" y="70" width="70" height="60" rx="8" fill="url(#shortOutputGrad)" />
      <text x="845" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Output</text>
      <text x="845" y="115" textAnchor="middle" fill="#fef3c7" fontSize="10">aB3xY2z</text>
    </g>

    {/* Option B: Counter-based (Snowflake) */}
    <g filter="url(#shortShadow)">
      <rect x="30" y="180" width="250" height="70" rx="8" fill="#ec4899" />
      <text x="155" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Option B: Snowflake ID</text>
      <text x="155" y="225" textAnchor="middle" fill="#fbcfe8" fontSize="10">Distributed unique ID generator</text>
      <text x="155" y="242" textAnchor="middle" fill="#10b981" fontSize="9">Guaranteed unique - No collisions</text>
    </g>

    {/* Arrow from Snowflake */}
    <line x1="280" y1="215" x2="600" y2="145" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#shortArrow)" />

    {/* Snowflake ID Structure */}
    <rect x="30" y="270" width="840" height="130" rx="8" fill="#374151" />
    <text x="450" y="295" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">Snowflake ID Structure (64 bits)</text>

    {/* Bit sections */}
    <rect x="50" y="315" width="30" height="40" rx="4" fill="#6b7280" />
    <text x="65" y="340" textAnchor="middle" fill="white" fontSize="10">1</text>
    <text x="65" y="375" textAnchor="middle" fill="#9ca3af" fontSize="8">Sign</text>

    <rect x="90" y="315" width="280" height="40" rx="4" fill="#3b82f6" />
    <text x="230" y="340" textAnchor="middle" fill="white" fontSize="11">41 bits - Timestamp (ms since epoch)</text>
    <text x="230" y="375" textAnchor="middle" fill="#93c5fd" fontSize="9">69 years of unique IDs</text>

    <rect x="380" y="315" width="180" height="40" rx="4" fill="#8b5cf6" />
    <text x="470" y="340" textAnchor="middle" fill="white" fontSize="11">10 bits - Machine ID</text>
    <text x="470" y="375" textAnchor="middle" fill="#c4b5fd" fontSize="9">1024 machines</text>

    <rect x="570" y="315" width="180" height="40" rx="4" fill="#10b981" />
    <text x="660" y="340" textAnchor="middle" fill="white" fontSize="11">12 bits - Sequence</text>
    <text x="660" y="375" textAnchor="middle" fill="#a7f3d0" fontSize="9">4096 IDs/ms/machine</text>

    <rect x="760" y="315" width="100" height="40" rx="4" fill="#f59e0b" />
    <text x="810" y="335" textAnchor="middle" fill="white" fontSize="10">Total:</text>
    <text x="810" y="350" textAnchor="middle" fill="white" fontSize="10">4M IDs/sec</text>
    <text x="810" y="375" textAnchor="middle" fill="#fde68a" fontSize="9">per machine</text>
  </svg>
);

// 3. Redirect flow diagram showing 301/302
const RedirectFlowDiagram = () => (
  <svg viewBox="0 0 900 480" className="w-full h-auto">
    <defs>
      <linearGradient id="redirClientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id="redirServerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="redirCacheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="redirDBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <marker id="redirArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#22d3ee" />
      </marker>
      <marker id="redirArrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
      </marker>
      <marker id="redirArrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
      <filter id="redirShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="900" height="480" fill="#1f2937" rx="12" />

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#f3f4f6" fontSize="18" fontWeight="bold">URL Redirect Flow</text>

    {/* Step numbers */}
    <circle cx="70" cy="90" r="18" fill="#22d3ee" />
    <text x="70" y="95" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">1</text>

    {/* Client */}
    <g filter="url(#redirShadow)">
      <rect x="100" y="65" width="140" height="55" rx="8" fill="url(#redirClientGrad)" />
      <text x="170" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Browser</text>
      <text x="170" y="108" textAnchor="middle" fill="#e0f2fe" fontSize="9">User clicks short URL</text>
    </g>

    {/* Arrow: Request */}
    <line x1="240" y1="92" x2="310" y2="92" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#redirArrow)" />
    <text x="275" y="82" textAnchor="middle" fill="#22d3ee" fontSize="9">GET /aB3xY2z</text>

    <circle cx="330" cy="90" r="18" fill="#22d3ee" />
    <text x="330" y="95" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">2</text>

    {/* Server */}
    <g filter="url(#redirShadow)">
      <rect x="360" y="65" width="160" height="55" rx="8" fill="url(#redirServerGrad)" />
      <text x="440" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Redirect Service</text>
      <text x="440" y="108" textAnchor="middle" fill="#d1fae5" fontSize="9">Extract short code</text>
    </g>

    {/* Arrow to Cache */}
    <line x1="440" y1="120" x2="440" y2="160" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#redirArrow)" />

    <circle cx="400" cy="180" r="18" fill="#22d3ee" />
    <text x="400" y="185" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">3</text>

    {/* Cache */}
    <g filter="url(#redirShadow)">
      <rect x="430" y="160" width="160" height="55" rx="8" fill="url(#redirCacheGrad)" />
      <text x="510" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Redis Cache</text>
      <text x="510" y="203" textAnchor="middle" fill="#fef3c7" fontSize="9">Lookup: aB3xY2z</text>
    </g>

    {/* Cache Hit Path */}
    <line x1="590" y1="188" x2="650" y2="188" stroke="#10b981" strokeWidth="2" markerEnd="url(#redirArrowGreen)" />
    <text x="620" y="178" textAnchor="middle" fill="#10b981" fontSize="9">HIT (95%)</text>

    <g filter="url(#redirShadow)">
      <rect x="660" y="160" width="180" height="55" rx="8" fill="#10b981" />
      <text x="750" y="185" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Cache Hit - Fast Path</text>
      <text x="750" y="203" textAnchor="middle" fill="#d1fae5" fontSize="9">{`Return long URL in &lt;5ms`}</text>
    </g>

    {/* Cache Miss Path */}
    <line x1="510" y1="215" x2="510" y2="255" stroke="#ef4444" strokeWidth="2" markerEnd="url(#redirArrowRed)" />
    <text x="540" y="240" textAnchor="middle" fill="#ef4444" fontSize="9">MISS (5%)</text>

    <circle cx="470" cy="280" r="18" fill="#22d3ee" />
    <text x="470" y="285" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">4</text>

    {/* Database */}
    <g filter="url(#redirShadow)">
      <rect x="500" y="260" width="160" height="55" rx="8" fill="url(#redirDBGrad)" />
      <text x="580" y="285" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">PostgreSQL</text>
      <text x="580" y="303" textAnchor="middle" fill="#dbeafe" fontSize="9">SELECT long_url WHERE...</text>
    </g>

    {/* Update Cache */}
    <path d="M 660 288 Q 700 288 700 215 Q 700 188 660 188" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#redirArrow)" strokeDasharray="5,3" />
    <text x="720" y="240" textAnchor="middle" fill="#f59e0b" fontSize="9">Update Cache</text>

    {/* HTTP Response Options */}
    <rect x="50" y="340" width="800" height="130" rx="8" fill="#374151" />
    <text x="450" y="365" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">HTTP Redirect Response Options</text>

    {/* 301 */}
    <g filter="url(#redirShadow)">
      <rect x="70" y="385" width="350" height="70" rx="8" fill="#10b981" />
      <text x="245" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">HTTP 301 - Permanent Redirect</text>
      <text x="245" y="430" textAnchor="middle" fill="#d1fae5" fontSize="10">Browser caches redirect - faster subsequent clicks</text>
      <text x="245" y="447" textAnchor="middle" fill="#fbbf24" fontSize="9">Drawback: Cannot track analytics (bypasses server)</text>
    </g>

    {/* 302 */}
    <g filter="url(#redirShadow)">
      <rect x="480" y="385" width="350" height="70" rx="8" fill="#f59e0b" />
      <text x="655" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">HTTP 302 - Temporary Redirect</text>
      <text x="655" y="430" textAnchor="middle" fill="#fef3c7" fontSize="10">Every click hits server - enables analytics tracking</text>
      <text x="655" y="447" textAnchor="middle" fill="#10b981" fontSize="9">Recommended for URL shorteners</text>
    </g>
  </svg>
);

// 4. Multi-layer caching strategy diagram
const CachingStrategyDiagram = () => (
  <svg viewBox="0 0 900 520" className="w-full h-auto">
    <defs>
      <linearGradient id="cacheBrowserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id="cacheCDNGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="cacheAppGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="cacheDBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <marker id="cacheArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
      </marker>
      <filter id="cacheShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="900" height="520" fill="#1f2937" rx="12" />

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#f3f4f6" fontSize="18" fontWeight="bold">Multi-Layer Caching Strategy</text>

    {/* Layer Labels */}
    <text x="70" y="75" fill="#9ca3af" fontSize="12">Layer 1</text>
    <text x="70" y="165" fill="#9ca3af" fontSize="12">Layer 2</text>
    <text x="70" y="265" fill="#9ca3af" fontSize="12">Layer 3</text>
    <text x="70" y="365" fill="#9ca3af" fontSize="12">Layer 4</text>

    {/* Browser Cache */}
    <g filter="url(#cacheShadow)">
      <rect x="130" y="55" width="200" height="70" rx="8" fill="url(#cacheBrowserGrad)" />
      <text x="230" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Browser Cache</text>
      <text x="230" y="105" textAnchor="middle" fill="#e0f2fe" fontSize="10">Cache-Control: max-age</text>
      <text x="230" y="120" textAnchor="middle" fill="#e0f2fe" fontSize="9">Local to each user</text>
    </g>

    {/* Browser Cache Stats */}
    <g filter="url(#cacheShadow)">
      <rect x="370" y="55" width="180" height="70" rx="8" fill="#374151" />
      <text x="460" y="80" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">Stats</text>
      <text x="460" y="98" textAnchor="middle" fill="#d1d5db" fontSize="10">TTL: User-controlled</text>
      <text x="460" y="115" textAnchor="middle" fill="#10b981" fontSize="10">Latency: 0ms (local)</text>
    </g>

    {/* Browser benefits */}
    <g filter="url(#cacheShadow)">
      <rect x="590" y="55" width="260" height="70" rx="8" fill="#1e3a5f" />
      <text x="720" y="78" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Benefits</text>
      <text x="720" y="95" textAnchor="middle" fill="#d1d5db" fontSize="9">No network request needed</text>
      <text x="720" y="110" textAnchor="middle" fill="#d1d5db" fontSize="9">Instant redirect for repeat visits</text>
      <text x="720" y="125" textAnchor="middle" fill="#fbbf24" fontSize="9">Only with HTTP 301</text>
    </g>

    {/* Arrow */}
    <line x1="230" y1="125" x2="230" y2="145" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#cacheArrow)" />
    <text x="260" y="140" fill="#ef4444" fontSize="9">Miss</text>

    {/* CDN Cache */}
    <g filter="url(#cacheShadow)">
      <rect x="130" y="150" width="200" height="70" rx="8" fill="url(#cacheCDNGrad)" />
      <text x="230" y="180" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CDN Edge Cache</text>
      <text x="230" y="200" textAnchor="middle" fill="#e9d5ff" fontSize="10">CloudFront / Fastly</text>
      <text x="230" y="215" textAnchor="middle" fill="#e9d5ff" fontSize="9">300+ edge locations</text>
    </g>

    {/* CDN Cache Stats */}
    <g filter="url(#cacheShadow)">
      <rect x="370" y="150" width="180" height="70" rx="8" fill="#374151" />
      <text x="460" y="175" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">Stats</text>
      <text x="460" y="193" textAnchor="middle" fill="#d1d5db" fontSize="10">TTL: 1 hour</text>
      <text x="460" y="210" textAnchor="middle" fill="#10b981" fontSize="10">Latency: 5-20ms</text>
    </g>

    {/* CDN benefits */}
    <g filter="url(#cacheShadow)">
      <rect x="590" y="150" width="260" height="70" rx="8" fill="#1e3a5f" />
      <text x="720" y="173" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Benefits</text>
      <text x="720" y="190" textAnchor="middle" fill="#d1d5db" fontSize="9">Geographically distributed</text>
      <text x="720" y="205" textAnchor="middle" fill="#d1d5db" fontSize="9">Reduces origin server load by 40-50%</text>
      <text x="720" y="220" textAnchor="middle" fill="#d1d5db" fontSize="9">DDoS protection</text>
    </g>

    {/* Arrow */}
    <line x1="230" y1="220" x2="230" y2="245" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#cacheArrow)" />
    <text x="260" y="240" fill="#ef4444" fontSize="9">Miss</text>

    {/* Application Cache */}
    <g filter="url(#cacheShadow)">
      <rect x="130" y="250" width="200" height="70" rx="8" fill="url(#cacheAppGrad)" />
      <text x="230" y="280" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Redis Cluster</text>
      <text x="230" y="300" textAnchor="middle" fill="#fef3c7" fontSize="10">Application Cache</text>
      <text x="230" y="315" textAnchor="middle" fill="#fef3c7" fontSize="9">6 nodes (3 masters)</text>
    </g>

    {/* Redis Stats */}
    <g filter="url(#cacheShadow)">
      <rect x="370" y="250" width="180" height="70" rx="8" fill="#374151" />
      <text x="460" y="275" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">Stats</text>
      <text x="460" y="293" textAnchor="middle" fill="#d1d5db" fontSize="10">TTL: 24 hours</text>
      <text x="460" y="310" textAnchor="middle" fill="#10b981" fontSize="10">Latency: 1-5ms</text>
    </g>

    {/* Redis benefits */}
    <g filter="url(#cacheShadow)">
      <rect x="590" y="250" width="260" height="70" rx="8" fill="#1e3a5f" />
      <text x="720" y="273" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Benefits</text>
      <text x="720" y="290" textAnchor="middle" fill="#d1d5db" fontSize="9">In-memory, ultra-fast lookups</text>
      <text x="720" y="305" textAnchor="middle" fill="#d1d5db" fontSize="9">95%+ cache hit rate target</text>
      <text x="720" y="320" textAnchor="middle" fill="#d1d5db" fontSize="9">Stores URL mappings + counters</text>
    </g>

    {/* Arrow */}
    <line x1="230" y1="320" x2="230" y2="345" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#cacheArrow)" />
    <text x="260" y="340" fill="#ef4444" fontSize="9">Miss</text>

    {/* Database */}
    <g filter="url(#cacheShadow)">
      <rect x="130" y="350" width="200" height="70" rx="8" fill="url(#cacheDBGrad)" />
      <text x="230" y="380" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PostgreSQL</text>
      <text x="230" y="400" textAnchor="middle" fill="#dbeafe" fontSize="10">Primary Database</text>
      <text x="230" y="415" textAnchor="middle" fill="#dbeafe" fontSize="9">Source of truth</text>
    </g>

    {/* DB Stats */}
    <g filter="url(#cacheShadow)">
      <rect x="370" y="350" width="180" height="70" rx="8" fill="#374151" />
      <text x="460" y="375" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">Stats</text>
      <text x="460" y="393" textAnchor="middle" fill="#d1d5db" fontSize="10">Persistent storage</text>
      <text x="460" y="410" textAnchor="middle" fill="#f59e0b" fontSize="10">Latency: 10-50ms</text>
    </g>

    {/* DB benefits */}
    <g filter="url(#cacheShadow)">
      <rect x="590" y="350" width="260" height="70" rx="8" fill="#1e3a5f" />
      <text x="720" y="373" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Benefits</text>
      <text x="720" y="390" textAnchor="middle" fill="#d1d5db" fontSize="9">ACID compliance, data integrity</text>
      <text x="720" y="405" textAnchor="middle" fill="#d1d5db" fontSize="9">Query cache + connection pooling</text>
      <text x="720" y="420" textAnchor="middle" fill="#d1d5db" fontSize="9">Sharded for horizontal scale</text>
    </g>

    {/* Cache Invalidation Note */}
    <rect x="130" y="440" width="720" height="65" rx="8" fill="#7f1d1d" opacity="0.3" />
    <text x="490" y="465" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">Cache Invalidation Strategy</text>
    <text x="490" y="485" textAnchor="middle" fill="#d1d5db" fontSize="10">Write-through on create | Cache-aside on read | Immediate invalidation on update/delete | Lazy expiration check</text>
  </svg>
);

// 5. Analytics and click tracking diagram
const AnalyticsDiagram = () => (
  <svg viewBox="0 0 900 500" className="w-full h-auto">
    <defs>
      <linearGradient id="analClickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id="analKafkaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="analFlinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="analClickHouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
      <linearGradient id="analRedisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <marker id="analArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
      </marker>
      <filter id="analShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="900" height="500" fill="#1f2937" rx="12" />

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#f3f4f6" fontSize="18" fontWeight="bold">{`Analytics & Click Tracking Pipeline`}</text>

    {/* Click Event */}
    <g filter="url(#analShadow)">
      <rect x="50" y="70" width="150" height="80" rx="8" fill="url(#analClickGrad)" />
      <text x="125" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Click Event</text>
      <text x="125" y="118" textAnchor="middle" fill="#e0f2fe" fontSize="9">User clicks short URL</text>
      <text x="125" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="9">Captured at redirect</text>
    </g>

    {/* Event Data Box */}
    <g filter="url(#analShadow)">
      <rect x="50" y="170" width="150" height="120" rx="8" fill="#374151" />
      <text x="125" y="195" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">Event Data</text>
      <text x="65" y="215" fill="#d1d5db" fontSize="9">short_url: aB3xY2z</text>
      <text x="65" y="230" fill="#d1d5db" fontSize="9">IP: 192.168.1.1</text>
      <text x="65" y="245" fill="#d1d5db" fontSize="9">user_agent: Chrome...</text>
      <text x="65" y="260" fill="#d1d5db" fontSize="9">referrer: twitter.com</text>
      <text x="65" y="275" fill="#d1d5db" fontSize="9">timestamp: 16783...</text>
    </g>

    {/* Arrow to Kafka */}
    <line x1="200" y1="110" x2="270" y2="110" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#analArrow)" />
    <text x="235" y="100" textAnchor="middle" fill="#9ca3af" fontSize="9">Async</text>

    {/* Kafka */}
    <g filter="url(#analShadow)">
      <rect x="280" y="70" width="180" height="80" rx="8" fill="url(#analKafkaGrad)" />
      <text x="370" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Apache Kafka</text>
      <text x="370" y="120" textAnchor="middle" fill="#fecaca" fontSize="10">Topic: click_events</text>
      <text x="370" y="137" textAnchor="middle" fill="#fecaca" fontSize="9">Partitioned by short_url</text>
    </g>

    {/* Split paths */}
    <path d="M 460 110 L 500 110 L 500 80 L 540 80" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#analArrow)" />
    <path d="M 460 110 L 500 110 L 500 180 L 540 180" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#analArrow)" />

    <text x="480" y="60" fill="#10b981" fontSize="10">Real-time</text>
    <text x="480" y="200" fill="#8b5cf6" fontSize="10">Batch</text>

    {/* Real-time path: Redis */}
    <g filter="url(#analShadow)">
      <rect x="550" y="50" width="160" height="70" rx="8" fill="url(#analRedisGrad)" />
      <text x="630" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Redis Counters</text>
      <text x="630" y="95" textAnchor="middle" fill="#fef3c7" fontSize="10">INCR clicks:aB3xY2z</text>
      <text x="630" y="110" textAnchor="middle" fill="#fef3c7" fontSize="9">HyperLogLog for uniques</text>
    </g>

    {/* Arrow to Dashboard */}
    <line x1="710" y1="85" x2="750" y2="85" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#analArrow)" />

    {/* Real-time Dashboard */}
    <g filter="url(#analShadow)">
      <rect x="760" y="50" width="120" height="70" rx="8" fill="#10b981" />
      <text x="820" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Live Dashboard</text>
      <text x="820" y="95" textAnchor="middle" fill="#d1fae5" fontSize="9">WebSocket push</text>
      <text x="820" y="110" textAnchor="middle" fill="#d1fae5" fontSize="9">Real-time counter</text>
    </g>

    {/* Batch path: Flink */}
    <g filter="url(#analShadow)">
      <rect x="550" y="150" width="160" height="70" rx="8" fill="url(#analFlinkGrad)" />
      <text x="630" y="175" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Apache Flink</text>
      <text x="630" y="195" textAnchor="middle" fill="#e9d5ff" fontSize="10">Stream Processing</text>
      <text x="630" y="210" textAnchor="middle" fill="#e9d5ff" fontSize="9">Aggregate every 10s</text>
    </g>

    {/* Arrow to ClickHouse */}
    <line x1="710" y1="185" x2="750" y2="185" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#analArrow)" />

    {/* ClickHouse */}
    <g filter="url(#analShadow)">
      <rect x="760" y="150" width="120" height="70" rx="8" fill="url(#analClickHouseGrad)" />
      <text x="820" y="175" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ClickHouse</text>
      <text x="820" y="195" textAnchor="middle" fill="#fbcfe8" fontSize="9">Columnar OLAP</text>
      <text x="820" y="210" textAnchor="middle" fill="#fbcfe8" fontSize="9">Batch inserts</text>
    </g>

    {/* Enrichment Section */}
    <rect x="50" y="310" width="400" height="170" rx="8" fill="#374151" />
    <text x="250" y="335" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">Data Enrichment</text>

    {/* GeoIP */}
    <g filter="url(#analShadow)">
      <rect x="70" y="355" width="170" height="55" rx="6" fill="#3b82f6" />
      <text x="155" y="377" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">GeoIP Lookup</text>
      <text x="155" y="395" textAnchor="middle" fill="#dbeafe" fontSize="9">MaxMind database</text>
      <text x="155" y="408" textAnchor="middle" fill="#dbeafe" fontSize="8">IP → Country, City, Coords</text>
    </g>

    {/* User Agent Parser */}
    <g filter="url(#analShadow)">
      <rect x="260" y="355" width="170" height="55" rx="6" fill="#8b5cf6" />
      <text x="345" y="377" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">User Agent Parser</text>
      <text x="345" y="395" textAnchor="middle" fill="#e9d5ff" fontSize="9">Device detection</text>
      <text x="345" y="408" textAnchor="middle" fill="#e9d5ff" fontSize="8">Browser, OS, Device type</text>
    </g>

    {/* Enriched data */}
    <g filter="url(#analShadow)">
      <rect x="70" y="420" width="360" height="45" rx="6" fill="#1e3a5f" />
      <text x="250" y="440" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Enriched Click Record</text>
      <text x="250" y="455" textAnchor="middle" fill="#d1d5db" fontSize="8">short_url + long_url + country + city + browser + os + device + referrer + timestamp</text>
    </g>

    {/* Analytics Dashboard Section */}
    <rect x="480" y="250" width="400" height="230" rx="8" fill="#374151" />
    <text x="680" y="275" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">Analytics Dashboard</text>

    {/* Dashboard components */}
    <g filter="url(#analShadow)">
      <rect x="500" y="295" width="115" height="50" rx="6" fill="#10b981" />
      <text x="557" y="315" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Total Clicks</text>
      <text x="557" y="332" textAnchor="middle" fill="#d1fae5" fontSize="9">Real-time counter</text>
    </g>

    <g filter="url(#analShadow)">
      <rect x="625" y="295" width="115" height="50" rx="6" fill="#f59e0b" />
      <text x="682" y="315" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Unique Visitors</text>
      <text x="682" y="332" textAnchor="middle" fill="#fef3c7" fontSize="9">HyperLogLog</text>
    </g>

    <g filter="url(#analShadow)">
      <rect x="750" y="295" width="115" height="50" rx="6" fill="#8b5cf6" />
      <text x="807" y="315" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Top Referrers</text>
      <text x="807" y="332" textAnchor="middle" fill="#e9d5ff" fontSize="9">Pie chart</text>
    </g>

    <g filter="url(#analShadow)">
      <rect x="500" y="355" width="175" height="50" rx="6" fill="#ef4444" />
      <text x="587" y="375" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Geographic Heat Map</text>
      <text x="587" y="392" textAnchor="middle" fill="#fecaca" fontSize="9">Clicks by country/city</text>
    </g>

    <g filter="url(#analShadow)">
      <rect x="685" y="355" width="180" height="50" rx="6" fill="#06b6d4" />
      <text x="775" y="375" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Device Breakdown</text>
      <text x="775" y="392" textAnchor="middle" fill="#e0f2fe" fontSize="9">Mobile / Desktop / Tablet</text>
    </g>

    <g filter="url(#analShadow)">
      <rect x="500" y="415" width="365" height="50" rx="6" fill="#ec4899" />
      <text x="682" y="435" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Click Timeline Chart</text>
      <text x="682" y="452" textAnchor="middle" fill="#fbcfe8" fontSize="9">Hourly / Daily / Monthly aggregations from ClickHouse</text>
    </g>
  </svg>
);

export default function TinyURL({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '' },
    { id: 'components', label: 'Core Components', icon: '' },
    { id: 'dataflow', label: 'Data Flow', icon: '' },
    { id: 'scalability', label: 'Scalability', icon: '' },
    { id: 'tradeoffs', label: 'Trade-offs', icon: '' }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)' }}>
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 bg-gray-800 rounded-2xl shadow-lg p-6 border-l-8 border-cyan-500">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onBack}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
              >
                ← Back
              </button>
              <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-3">
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  TinyURL System Design
                </span>
              </h1>
              <div className="w-24"></div>
            </div>
            <p className="text-gray-300 text-lg text-center">
              Design a URL shortening service like TinyURL or Bitly with short URL generation, redirection, analytics, and high-volume traffic handling
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            borderBottom: '1px solid #374151',
            paddingBottom: '0.5rem',
            overflowX: 'auto'
          }}>
            {tabs.map(tab => (
              <div key={tab.id} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.8)' }}>
                  <CompletionCheckbox problemId={`TinyURL-${tab.id}`} />
                </div>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    backgroundColor: activeTab === tab.id ? '#374151' : 'transparent',
                    color: activeTab === tab.id ? '#22d3ee' : '#9ca3af',
                    border: 'none',
                    borderRadius: '8px 8px 0 0',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.label}
                </button>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Requirements */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400">System Requirements</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-400 mb-3">Functional Requirements</h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>URL Shortening:</strong> Convert long URLs to short, unique aliases</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Redirection:</strong> Redirect short URLs to original long URLs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Custom Aliases:</strong> Allow users to create custom short URLs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Expiration:</strong> Support URL expiration and deletion</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Analytics:</strong> Track clicks, geographic data, referrers</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>API Access:</strong> Provide REST API for programmatic access</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-orange-400 mb-3">Non-Functional Requirements</h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>High Availability:</strong> 99.99% uptime for redirection</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Low Latency:</strong> Redirection &lt;10ms (P99)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Scalability:</strong> Handle millions of URLs and billions of redirects</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>URL Uniqueness:</strong> No collisions, guaranteed unique short URLs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Predictability:</strong> Short URLs should not be easily guessable</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Durability:</strong> URLs persist and don't break over time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture Diagram */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-teal-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-teal-400">High-Level Architecture</span>
                </h2>

                <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 p-4 rounded-xl border-2 border-teal-700 mb-6">
                  <TinyURLArchitectureDiagram />
                </div>

                <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 p-8 rounded-xl border-2 border-teal-700">
                  <svg viewBox="0 0 1200 800" className="w-full h-auto">
                    {/* Client Layer */}
                    <rect x="50" y="50" width="180" height="80" fill="#06b6d4" rx="8"/>
                    <text x="140" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Web Client</text>
                    <text x="140" y="105" textAnchor="middle" fill="white" fontSize="12">Browser</text>

                    <rect x="270" y="50" width="180" height="80" fill="#06b6d4" rx="8"/>
                    <text x="360" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Mobile App</text>
                    <text x="360" y="105" textAnchor="middle" fill="white" fontSize="12">iOS/Android</text>

                    <rect x="490" y="50" width="180" height="80" fill="#06b6d4" rx="8"/>
                    <text x="580" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">API Clients</text>
                    <text x="580" y="105" textAnchor="middle" fill="white" fontSize="12">Third-party Apps</text>

                    {/* Load Balancer */}
                    <rect x="250" y="180" width="220" height="60" fill="#8b5cf6" rx="8"/>
                    <text x="360" y="215" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Load Balancer (Nginx)</text>

                    {/* API Gateway */}
                    <rect x="250" y="280" width="220" height="60" fill="#6366f1" rx="8"/>
                    <text x="360" y="315" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">API Gateway</text>

                    {/* Services Layer */}
                    <rect x="50" y="390" width="180" height="100" fill="#10b981" rx="8"/>
                    <text x="140" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Shortening Service</text>
                    <text x="140" y="445" textAnchor="middle" fill="white" fontSize="11">Generate Short URLs</text>
                    <text x="140" y="465" textAnchor="middle" fill="white" fontSize="11">Base62 Encoding</text>

                    <rect x="270" y="390" width="180" height="100" fill="#f59e0b" rx="8"/>
                    <text x="360" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Redirect Service</text>
                    <text x="360" y="445" textAnchor="middle" fill="white" fontSize="11">{`Lookup & Redirect`}</text>
                    <text x="360" y="465" textAnchor="middle" fill="white" fontSize="11">Cache First</text>

                    <rect x="490" y="390" width="180" height="100" fill="#ef4444" rx="8"/>
                    <text x="580" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Analytics Service</text>
                    <text x="580" y="445" textAnchor="middle" fill="white" fontSize="11">Click Tracking</text>
                    <text x="580" y="465" textAnchor="middle" fill="white" fontSize="11">Geo/Referrer Data</text>

                    <rect x="710" y="390" width="180" height="100" fill="#ec4899" rx="8"/>
                    <text x="800" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">ID Generator</text>
                    <text x="800" y="445" textAnchor="middle" fill="white" fontSize="11">Distributed IDs</text>
                    <text x="800" y="465" textAnchor="middle" fill="white" fontSize="11">Snowflake/UUID</text>

                    {/* Cache Layer */}
                    <rect x="50" y="540" width="400" height="60" fill="#06b6d4" rx="8"/>
                    <text x="250" y="565" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Cache Layer (Redis Cluster)</text>
                    <text x="250" y="585" textAnchor="middle" fill="white" fontSize="11">Short URL → Long URL Mapping</text>

                    {/* Database Layer */}
                    <rect x="50" y="650" width="180" height="80" fill="#334155" rx="8"/>
                    <text x="140" y="680" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">URL Database</text>
                    <text x="140" y="700" textAnchor="middle" fill="white" fontSize="11">PostgreSQL/MySQL</text>

                    <rect x="270" y="650" width="180" height="80" fill="#334155" rx="8"/>
                    <text x="360" y="680" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Analytics DB</text>
                    <text x="360" y="700" textAnchor="middle" fill="white" fontSize="11">ClickHouse/Cassandra</text>

                    <rect x="490" y="650" width="180" height="80" fill="#059669" rx="8"/>
                    <text x="580" y="680" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Rate Limiter</text>
                    <text x="580" y="700" textAnchor="middle" fill="white" fontSize="11">Redis (Token Bucket)</text>

                    {/* ZooKeeper */}
                    <rect x="710" y="540" width="180" height="60" fill="#7c3aed" rx="8"/>
                    <text x="800" y="565" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">ZooKeeper</text>
                    <text x="800" y="585" textAnchor="middle" fill="white" fontSize="11">ID Range Coordination</text>

                    {/* Message Queue */}
                    <rect x="930" y="390" width="180" height="100" fill="#f97316" rx="8"/>
                    <text x="1020" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Message Queue</text>
                    <text x="1020" y="445" textAnchor="middle" fill="white" fontSize="11">Kafka</text>
                    <text x="1020" y="465" textAnchor="middle" fill="white" fontSize="11">Async Analytics</text>

                    {/* Connections */}
                    <path d="M 140 130 L 360 180" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                    <path d="M 360 130 L 360 180" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                    <path d="M 580 130 L 360 180" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                    <path d="M 360 240 L 360 280" stroke="#6366f1" strokeWidth="2" fill="none"/>
                    <path d="M 360 340 L 140 390" stroke="#10b981" strokeWidth="2" fill="none"/>
                    <path d="M 360 340 L 360 390" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                    <path d="M 360 340 L 580 390" stroke="#ef4444" strokeWidth="2" fill="none"/>
                    <path d="M 360 340 L 800 390" stroke="#ec4899" strokeWidth="2" fill="none"/>

                    <path d="M 140 490 L 250 540" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                    <path d="M 360 490 L 250 540" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                    <path d="M 580 490 L 1020 490" stroke="#f97316" strokeWidth="2" fill="none"/>
                    <path d="M 800 490 L 800 540" stroke="#7c3aed" strokeWidth="2" fill="none"/>

                    <path d="M 140 490 L 140 650" stroke="#334155" strokeWidth="2" fill="none"/>
                    <path d="M 580 490 L 360 650" stroke="#334155" strokeWidth="2" fill="none"/>
                    <path d="M 360 340 L 580 650" stroke="#059669" strokeWidth="2" fill="none"/>
                  </svg>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="bg-cyan-900/30 p-4 rounded-lg border-l-4 border-cyan-500">
                    <div className="font-bold text-cyan-400 mb-2">Client Layer</div>
                    <div className="text-sm text-cyan-300">Web, mobile, and API clients access the service via REST APIs</div>
                  </div>
                  <div className="bg-teal-900/30 p-4 rounded-lg border-l-4 border-teal-500">
                    <div className="font-bold text-teal-400 mb-2">Service Layer</div>
                    <div className="text-sm text-teal-300">Microservices for URL shortening, redirection, and analytics</div>
                  </div>
                  <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="font-bold text-blue-400 mb-2">Data Layer</div>
                    <div className="text-sm text-blue-300">PostgreSQL for URLs, Redis for caching, ClickHouse for analytics</div>
                  </div>
                </div>
              </div>

              {/* Scale Estimates */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-emerald-400">Scale & Capacity Estimates</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h3 className="font-bold text-blue-400 mb-4 text-lg">Traffic Assumptions</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• New URLs created: <strong>100 million/month</strong></div>
                      <div>• URL shortening requests: <strong>40 requests/second</strong></div>
                      <div>• Read:Write ratio: <strong>100:1</strong></div>
                      <div>• Redirects per second: <strong>~4,000 QPS</strong></div>
                      <div>• Peak traffic: <strong>3x average = 12K QPS</strong></div>
                      <div>• Monthly redirects: <strong>~10 billion</strong></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h3 className="font-bold text-green-400 mb-4 text-lg">Storage Estimates</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• URLs per year: <strong>1.2 billion</strong></div>
                      <div>• Storage per URL record: <strong>~500 bytes</strong></div>
                      <div>  - Short URL: 7 bytes</div>
                      <div>  - Long URL: ~200 bytes avg</div>
                      <div>  - Metadata: ~300 bytes</div>
                      <div>• Yearly storage: <strong>1.2B x 500B = 600 GB/year</strong></div>
                      <div>• 10-year storage: <strong>~6 TB</strong></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border-2 border-purple-700">
                    <h3 className="font-bold text-purple-400 mb-4 text-lg">Cache Requirements</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• Follow 80/20 rule: <strong>20% of URLs = 80% of traffic</strong></div>
                      <div>• Daily redirects: <strong>~330 million</strong></div>
                      <div>• Cache 20% of hot URLs</div>
                      <div>• Cache entry size: <strong>~300 bytes</strong></div>
                      <div>• Daily cache needs: <strong>~20 GB</strong></div>
                      <div>• With metadata & overhead: <strong>~50 GB</strong></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-6 rounded-xl border-2 border-orange-700">
                    <h3 className="font-bold text-orange-400 mb-4 text-lg">Bandwidth Estimates</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• <strong>Write bandwidth (shortening):</strong></div>
                      <div>  40 requests/s x 500 bytes = <strong>20 KB/s</strong></div>
                      <div>• <strong>Read bandwidth (redirects):</strong></div>
                      <div>  4,000 requests/s x 500 bytes = <strong>2 MB/s</strong></div>
                      <div>• <strong>Peak bandwidth:</strong></div>
                      <div>  12,000 requests/s x 500 bytes = <strong>6 MB/s</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Design Considerations */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-indigo-400">Key Design Considerations</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-indigo-900/30 p-6 rounded-xl border-l-4 border-indigo-500">
                    <h3 className="font-bold text-indigo-400 mb-3 text-lg">Short URL Length Calculation</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Using Base62 encoding: [a-zA-Z0-9] = 62 characters</div>
                      <div>• Need to support 1.2B URLs/year for 10 years = 12B URLs</div>
                      <div>• 62^6 = 56.8 billion combinations</div>
                      <div>• 62^7 = 3.5 trillion combinations</div>
                      <div>• <strong>Decision: Use 7-character short URLs</strong></div>
                      <div>• Example: <code className="bg-gray-900 px-2 py-1 rounded">tinyurl.com/aB3xY2z</code></div>
                    </div>
                  </div>

                  <div className="bg-pink-900/30 p-6 rounded-xl border-l-4 border-pink-500">
                    <h3 className="font-bold text-pink-400 mb-3 text-lg">Collision Handling</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Problem:</strong> Hash collisions when encoding same URL</div>
                      <div>• <strong>Solution 1:</strong> Append incrementing counter (0, 1, 2...)</div>
                      <div>• <strong>Solution 2:</strong> Use unique ID generator (Snowflake)</div>
                      <div>• <strong>Solution 3:</strong> Pre-generate key pool via ZooKeeper</div>
                      <div>• <strong>Chosen:</strong> ID generator + Base62 encoding</div>
                      <div>• Guarantees uniqueness without DB lookups</div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="font-bold text-green-400 mb-3 text-lg">Data Retention Policy</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Default expiration:</strong> URLs never expire</div>
                      <div>• <strong>Optional TTL:</strong> User can set expiration (30d, 90d, 1y)</div>
                      <div>• <strong>Inactive URLs:</strong> Archive after 2 years of no clicks</div>
                      <div>• <strong>Cleanup job:</strong> Daily batch job to purge expired URLs</div>
                      <div>• <strong>Recycling:</strong> Reuse short codes after 5+ years</div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/30 p-6 rounded-xl border-l-4 border-yellow-500">
                    <h3 className="font-bold text-yellow-400 mb-3 text-lg">Rate Limiting Strategy</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Anonymous users:</strong> 10 URLs/hour per IP</div>
                      <div>• <strong>Registered users:</strong> 100 URLs/hour</div>
                      <div>• <strong>Premium users:</strong> 1,000 URLs/hour</div>
                      <div>• <strong>API clients:</strong> Rate limited by API key</div>
                      <div>• <strong>Algorithm:</strong> Token bucket (Redis)</div>
                      <div>• <strong>Response:</strong> HTTP 429 Too Many Requests</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'components' && (
            <div className="space-y-6">
              {/* URL Shortening Process Diagram */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-green-400">URL Shortening Process (Base62 Encoding)</span>
                </h2>
                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-4 rounded-xl border-2 border-green-700">
                  <URLShorteningDiagram />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* URL Shortening Service */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    URL Shortening Service
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-green-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-green-400 mb-1">Core Functionality</div>
                      <div className="text-sm">• Accept long URL from client</div>
                      <div className="text-sm">• Generate unique short URL</div>
                      <div className="text-sm">• Store mapping in database</div>
                      <div className="text-sm">• Return short URL to client</div>
                    </div>
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-blue-400 mb-1">ID Generation Approaches</div>
                      <div className="text-sm">• <strong>Hash-based:</strong> MD5/SHA256 → Base62 (7 chars)</div>
                      <div className="text-sm">• <strong>Counter-based:</strong> Auto-increment ID → Base62</div>
                      <div className="text-sm">• <strong>Snowflake:</strong> Distributed unique ID generator</div>
                      <div className="text-sm">• <strong>Key Generation Service:</strong> Pre-generated pool</div>
                    </div>
                    <div className="bg-purple-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-purple-400 mb-1">Optimizations</div>
                      <div className="text-sm">• Check if long URL already exists (cache + DB)</div>
                      <div className="text-sm">• Validate URL format before processing</div>
                      <div className="text-sm">• Sanitize URLs (remove tracking params)</div>
                      <div className="text-sm">• Rate limit per user/IP to prevent abuse</div>
                    </div>
                  </div>
                </div>

                {/* Redirect Service */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                    Redirect Service
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-orange-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-orange-400 mb-1">Redirection Flow</div>
                      <div className="text-sm">1. Client requests short URL (e.g., /aB3xY2z)</div>
                      <div className="text-sm">2. Check Redis cache for mapping</div>
                      <div className="text-sm">3. If cache miss, query database</div>
                      <div className="text-sm">4. Return HTTP 301/302 redirect to long URL</div>
                      <div className="text-sm">5. Cache result for future requests</div>
                    </div>
                    <div className="bg-red-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-red-400 mb-1">HTTP Status Codes</div>
                      <div className="text-sm">• <strong>301 Permanent:</strong> Browsers cache, faster but no analytics</div>
                      <div className="text-sm">• <strong>302 Temporary:</strong> Always hits server, enables analytics</div>
                      <div className="text-sm">• <strong>404 Not Found:</strong> Short URL doesn't exist or expired</div>
                      <div className="text-sm">• <strong>Decision:</strong> Use 302 for tracking, 301 for performance</div>
                    </div>
                    <div className="bg-pink-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-pink-400 mb-1">Performance</div>
                      <div className="text-sm">• Cache hit rate target: <strong>95%+</strong></div>
                      <div className="text-sm">• Redirect latency: <strong>&lt;10ms (P99)</strong></div>
                      <div className="text-sm">• Use CDN for static redirect pages</div>
                      <div className="text-sm">• Connection pooling to database</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redirect Flow Diagram */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-t-4 border-orange-500">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-orange-400">URL Redirect Flow (301 vs 302)</span>
                </h2>
                <div className="bg-gradient-to-br from-orange-900/20 to-amber-900/20 p-4 rounded-xl border-2 border-orange-700">
                  <RedirectFlowDiagram />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Analytics Service */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                    Analytics Service
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-blue-400 mb-1">Tracked Metrics</div>
                      <div className="text-sm">• Total clicks per short URL</div>
                      <div className="text-sm">• Unique visitors (track by cookie/IP)</div>
                      <div className="text-sm">• Geographic location (country, city)</div>
                      <div className="text-sm">• Referrer source (where click came from)</div>
                      <div className="text-sm">• Device type (mobile, desktop, tablet)</div>
                      <div className="text-sm">• Browser and OS information</div>
                      <div className="text-sm">• Click timeline (hourly, daily, monthly)</div>
                    </div>
                    <div className="bg-indigo-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-indigo-400 mb-1">Implementation</div>
                      <div className="text-sm">• <strong>Async Processing:</strong> Publish click events to Kafka</div>
                      <div className="text-sm">• <strong>Batch Writes:</strong> Aggregate and write every 10 seconds</div>
                      <div className="text-sm">• <strong>Database:</strong> ClickHouse (columnar OLAP)</div>
                      <div className="text-sm">• <strong>Real-time:</strong> Update Redis counters for live stats</div>
                    </div>
                    <div className="bg-cyan-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-cyan-400 mb-1">User Dashboard</div>
                      <div className="text-sm">• Real-time click counter</div>
                      <div className="text-sm">• Geographic heat map</div>
                      <div className="text-sm">• Top referrers chart</div>
                      <div className="text-sm">• Device breakdown pie chart</div>
                    </div>
                  </div>
                </div>

                {/* ID Generator Service */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                    ID Generator Service
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-pink-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-pink-400 mb-1">Snowflake Algorithm</div>
                      <div className="text-sm">• <strong>64-bit ID structure:</strong></div>
                      <div className="text-sm">  - 1 bit: Sign (always 0)</div>
                      <div className="text-sm">  - 41 bits: Timestamp (milliseconds since epoch)</div>
                      <div className="text-sm">  - 10 bits: Machine ID (1024 machines)</div>
                      <div className="text-sm">  - 12 bits: Sequence (4096 IDs/ms per machine)</div>
                      <div className="text-sm">• Generates <strong>4 million IDs/second</strong> per machine</div>
                    </div>
                    <div className="bg-purple-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-purple-400 mb-1">Base62 Encoding</div>
                      <div className="text-sm">• Convert 64-bit ID to Base62 string</div>
                      <div className="text-sm">• Character set: [a-z, A-Z, 0-9] = 62 chars</div>
                      <div className="text-sm">• Example: 123456789 → "8M0kX"</div>
                      <div className="text-sm">• Pad to 7 characters: "008M0kX"</div>
                    </div>
                    <div className="bg-yellow-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-yellow-400 mb-1">Alternatives</div>
                      <div className="text-sm">• <strong>UUID:</strong> Simple but too long (36 chars)</div>
                      <div className="text-sm">• <strong>Key Generation Service:</strong> Pre-generate via ZooKeeper</div>
                      <div className="text-sm">• <strong>Database Auto-increment:</strong> Single point of failure</div>
                    </div>
                  </div>
                </div>

                {/* Cache Layer */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    Cache Layer (Redis)
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-cyan-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-cyan-400 mb-1">Cache Strategy</div>
                      <div className="text-sm">• <strong>Write-through:</strong> Update cache when creating URL</div>
                      <div className="text-sm">• <strong>Cache-aside:</strong> Lazy load on redirect requests</div>
                      <div className="text-sm">• <strong>TTL:</strong> 24 hours for URL mappings</div>
                      <div className="text-sm">• <strong>Eviction:</strong> LRU (Least Recently Used)</div>
                    </div>
                    <div className="bg-teal-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-teal-400 mb-1">Data Structures</div>
                      <div className="text-sm">• <strong>Hash:</strong> Store short → long URL mapping</div>
                      <div className="text-sm">• <strong>String:</strong> Store click counters</div>
                      <div className="text-sm">• <strong>Set:</strong> Track unique visitors</div>
                      <div className="text-sm">• <strong>Sorted Set:</strong> Popular URLs leaderboard</div>
                    </div>
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-blue-400 mb-1">High Availability</div>
                      <div className="text-sm">• Redis Cluster with 6 nodes (3 masters, 3 replicas)</div>
                      <div className="text-sm">• Automatic failover via Redis Sentinel</div>
                      <div className="text-sm">• Data sharded across masters by key hash</div>
                    </div>
                  </div>
                </div>

                {/* Database */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                    Database Layer
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-purple-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-purple-400 mb-1">URL Table Schema</div>
                      <div className="text-sm font-mono bg-gray-900 p-2 rounded">
                        <div>id: BIGINT PRIMARY KEY</div>
                        <div>short_url: VARCHAR(7) UNIQUE</div>
                        <div>long_url: TEXT</div>
                        <div>user_id: BIGINT (nullable)</div>
                        <div>created_at: TIMESTAMP</div>
                        <div>expires_at: TIMESTAMP (nullable)</div>
                        <div>click_count: BIGINT DEFAULT 0</div>
                      </div>
                    </div>
                    <div className="bg-indigo-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-indigo-400 mb-1">Indexes</div>
                      <div className="text-sm">• Primary: <code>id</code></div>
                      <div className="text-sm">• Unique: <code>short_url</code> (for fast lookup)</div>
                      <div className="text-sm">• Index: <code>long_url</code> (hash index for deduplication)</div>
                      <div className="text-sm">• Index: <code>user_id</code> (for user's URL list)</div>
                      <div className="text-sm">• Index: <code>created_at</code> (for cleanup jobs)</div>
                    </div>
                    <div className="bg-pink-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-pink-400 mb-1">Database Choice</div>
                      <div className="text-sm">• <strong>PostgreSQL:</strong> ACID, mature, good for 10TB scale</div>
                      <div className="text-sm">• <strong>Sharding:</strong> By short_url hash (consistent hashing)</div>
                      <div className="text-sm">• <strong>Replication:</strong> Master-slave (1 master, 2 replicas)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Pipeline Diagram */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-blue-400">Analytics & Click Tracking Pipeline</span>
                </h2>
                <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 p-4 rounded-xl border-2 border-blue-700">
                  <AnalyticsDiagram />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dataflow' && (
            <div className="space-y-8">
              {/* URL Shortening Flow */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-green-400">URL Shortening Flow</span>
                </h2>

                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Client Sends Long URL', desc: 'POST request to /api/shorten with long URL and optional custom alias', color: 'blue' },
                    { step: 2, title: 'Validate & Sanitize', desc: 'Check URL format, remove tracking parameters, validate custom alias availability', color: 'green' },
                    { step: 3, title: 'Check Deduplication', desc: 'Query cache/DB to see if long URL already has a short URL (save storage)', color: 'purple' },
                    { step: 4, title: 'Generate Unique ID', desc: 'If new URL, generate unique ID via Snowflake algorithm (64-bit distributed ID)', color: 'orange' },
                    { step: 5, title: 'Encode to Base62', desc: 'Convert numeric ID to Base62 string: 123456789 → "8M0kX", pad to 7 chars', color: 'red' },
                    { step: 6, title: 'Store in Database', desc: 'Insert mapping into URL table: (short_url, long_url, user_id, created_at)', color: 'pink' },
                    { step: 7, title: 'Update Cache', desc: 'Write-through: Add mapping to Redis cache with 24-hour TTL', color: 'cyan' },
                    { step: 8, title: 'Return Short URL', desc: 'API returns short URL to client: { "short_url": "tinyurl.com/8M0kX" }', color: 'indigo' }
                  ].map(item => (
                    <div key={item.step} className={`bg-${item.color}-900/30 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                      <div className="flex items-start gap-4">
                        <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-${item.color}-400 mb-1`}>{item.title}</div>
                          <div className="text-gray-300 text-sm">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* URL Redirection Flow */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-orange-400">URL Redirection Flow</span>
                </h2>

                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Client Requests Short URL', desc: 'User clicks short URL: GET tinyurl.com/8M0kX', color: 'blue' },
                    { step: 2, title: 'Load Balancer Routes Request', desc: 'Nginx routes to available Redirect Service instance', color: 'purple' },
                    { step: 3, title: 'Check Cache (Redis)', desc: 'Query Redis for short URL → long URL mapping (key: "8M0kX")', color: 'cyan' },
                    { step: 4, title: 'Cache Hit: Return Long URL', desc: 'If found in cache (~95% hit rate), retrieve long URL in <5ms', color: 'green' },
                    { step: 5, title: 'Cache Miss: Query Database', desc: 'If not in cache, query PostgreSQL: SELECT long_url WHERE short_url="8M0kX"', color: 'orange' },
                    { step: 6, title: 'Update Cache', desc: 'Store result in Redis with 24-hour TTL for future requests', color: 'pink' },
                    { step: 7, title: 'Track Analytics (Async)', desc: 'Publish click event to Kafka: {short_url, IP, user_agent, referrer, timestamp}', color: 'red' },
                    { step: 8, title: 'HTTP Redirect', desc: 'Return HTTP 302 redirect to long URL (or 404 if not found)', color: 'indigo' }
                  ].map(item => (
                    <div key={item.step} className={`bg-${item.color}-900/30 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                      <div className="flex items-start gap-4">
                        <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-${item.color}-400 mb-1`}>{item.title}</div>
                          <div className="text-gray-300 text-sm">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Processing */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-blue-400">Analytics Processing Flow</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h3 className="font-bold text-blue-400 mb-3 text-lg">Real-time Path</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-blue-500">
                        <div className="font-semibold text-blue-300 text-sm">1. Capture Click Event</div>
                        <div className="text-xs text-gray-400 mt-1">Extract IP, user_agent, referrer from HTTP request</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-cyan-500">
                        <div className="font-semibold text-cyan-300 text-sm">2. Increment Redis Counter</div>
                        <div className="text-xs text-gray-400 mt-1">INCR clicks:8M0kX (atomic operation)</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-teal-500">
                        <div className="font-semibold text-teal-300 text-sm">3. Update Dashboard</div>
                        <div className="text-xs text-gray-400 mt-1">WebSocket push to connected clients for live updates</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-6 rounded-xl border-2 border-purple-700">
                    <h3 className="font-bold text-purple-400 mb-3 text-lg">Batch Path</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-purple-500">
                        <div className="font-semibold text-purple-300 text-sm">1. Publish to Kafka</div>
                        <div className="text-xs text-gray-400 mt-1">Topic: "click_events", partition by short_url hash</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-pink-500">
                        <div className="font-semibold text-pink-300 text-sm">2. Stream Processing</div>
                        <div className="text-xs text-gray-400 mt-1">Apache Flink aggregates events every 10 seconds</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-red-500">
                        <div className="font-semibold text-red-300 text-sm">3. Batch Write to ClickHouse</div>
                        <div className="text-xs text-gray-400 mt-1">Insert aggregated analytics data for reporting</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h3 className="font-bold text-green-400 mb-3 text-lg">Geo IP Enrichment</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>• Lookup IP address in MaxMind GeoIP database</div>
                      <div>• Extract country, region, city coordinates</div>
                      <div>• Cache results in Redis (IP → location)</div>
                      <div>• Display on geographic heat map</div>
                    </div>
                  </div>

                  <div className="bg-orange-900/30 p-6 rounded-xl border-2 border-orange-700">
                    <h3 className="font-bold text-orange-400 mb-3 text-lg">User Agent Parsing</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>• Parse user_agent string to extract device info</div>
                      <div>• Identify browser (Chrome, Safari, Firefox)</div>
                      <div>• Identify OS (Windows, macOS, iOS, Android)</div>
                      <div>• Identify device type (mobile, desktop, tablet)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scalability' && (
            <div className="space-y-8">
              {/* Database Sharding */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-purple-400">Database Sharding Strategy</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-900/30 p-6 rounded-xl border-2 border-purple-700">
                    <h3 className="font-bold text-purple-400 mb-3">Hash-based Sharding</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• <strong>Shard Key:</strong> short_url</div>
                      <div>• <strong>Hash Function:</strong> CRC32(short_url) % num_shards</div>
                      <div>• <strong>Number of Shards:</strong> 64 initially</div>
                      <div>• <strong>Routing:</strong> Application-level sharding</div>
                      <div>• <strong>Pros:</strong> Even distribution, simple logic</div>
                      <div>• <strong>Cons:</strong> Resharding requires data migration</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h3 className="font-bold text-blue-400 mb-3">Consistent Hashing</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• <strong>Hash Ring:</strong> Map shards to ring (0 to 2^32-1)</div>
                      <div>• <strong>Virtual Nodes:</strong> 150 vnodes per physical shard</div>
                      <div>• <strong>Lookup:</strong> Find first shard clockwise from hash</div>
                      <div>• <strong>Pros:</strong> Easy to add/remove shards (minimal rebalancing)</div>
                      <div>• <strong>Cons:</strong> More complex implementation</div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h3 className="font-bold text-green-400 mb-3">Replication Strategy</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• <strong>Primary-Replica:</strong> 1 primary + 2 replicas per shard</div>
                      <div>• <strong>Writes:</strong> Go to primary, async replicate to replicas</div>
                      <div>• <strong>Reads:</strong> Load balanced across primary + replicas</div>
                      <div>• <strong>Failover:</strong> Automatic promotion via Patroni/PgPool</div>
                      <div>• <strong>Read:Write = 100:1:</strong> Replicas handle most traffic</div>
                    </div>
                  </div>

                  <div className="bg-orange-900/30 p-6 rounded-xl border-2 border-orange-700">
                    <h3 className="font-bold text-orange-400 mb-3">Hot Shard Mitigation</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• <strong>Detection:</strong> Monitor QPS per shard (alert if &gt;2x avg)</div>
                      <div>• <strong>Cache Layer:</strong> Hot URLs cached in Redis (99% hit rate)</div>
                      <div>• <strong>Read Replicas:</strong> Add more replicas to hot shards</div>
                      <div>• <strong>Resharding:</strong> Split hot shard into 2+ smaller shards</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Caching Strategy */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400">Multi-Layer Caching</span>
                </h2>

                <div className="bg-gradient-to-br from-cyan-900/20 to-teal-900/20 p-4 rounded-xl border-2 border-cyan-700 mb-6">
                  <CachingStrategyDiagram />
                </div>

                <div className="space-y-4">
                  <div className="bg-cyan-900/30 p-6 rounded-xl border-l-4 border-cyan-500">
                    <div className="font-bold text-cyan-400 mb-3 text-lg">L1: CDN Cache (Edge)</div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>• Cache static assets (HTML, JS, CSS)</div>
                      <div>• Cache popular short URL redirects</div>
                      <div>• TTL: 1 hour for redirects</div>
                      <div>• Reduces server load by 40-50%</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
                    <div className="font-bold text-blue-400 mb-3 text-lg">L2: Application Cache (Redis)</div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>• Cache all short → long URL mappings</div>
                      <div>• Cache user data, rate limit counters</div>
                      <div>• TTL: 24 hours for URL mappings</div>
                      <div>• Target cache hit rate: 95%+</div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-6 rounded-xl border-l-4 border-purple-500">
                    <div className="font-bold text-purple-400 mb-3 text-lg">L3: Database Query Cache</div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>• PostgreSQL shared_buffers (16 GB)</div>
                      <div>• OS page cache (32 GB)</div>
                      <div>• Frequently accessed rows stay in memory</div>
                      <div>• Reduces disk I/O by 80%+</div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-l-4 border-green-500">
                    <div className="font-bold text-green-400 mb-3 text-lg">Cache Invalidation</div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>• <strong>URL Update/Delete:</strong> Invalidate cache entry immediately</div>
                      <div>• <strong>Expiration:</strong> Lazy deletion on next access (check expires_at)</div>
                      <div>• <strong>Custom Alias Change:</strong> Delete old key, create new key</div>
                      <div>• <strong>Pattern:</strong> Write-through for creates, cache-aside for reads</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Load Balancing */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-orange-400">Load Balancing & Auto-Scaling</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-orange-900/30 p-6 rounded-xl border-2 border-orange-700">
                    <h3 className="font-bold text-orange-400 mb-3">DNS Load Balancing</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Route53 geo-routing to nearest region</div>
                      <div>• Health checks every 30 seconds</div>
                      <div>• Failover to backup region on failure</div>
                      <div>• Weighted routing for A/B testing</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h3 className="font-bold text-blue-400 mb-3">L7 Load Balancer</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Nginx/HAProxy for HTTP load balancing</div>
                      <div>• Round-robin with least connections</div>
                      <div>• Sticky sessions for analytics dashboards</div>
                      <div>• SSL termination at load balancer</div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-6 rounded-xl border-2 border-purple-700">
                    <h3 className="font-bold text-purple-400 mb-3">Auto-Scaling</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Trigger:</strong> CPU &gt; 70% for 5 minutes</div>
                      <div>• <strong>Action:</strong> Add 25% more instances</div>
                      <div>• <strong>Cooldown:</strong> 5 minutes between scales</div>
                      <div>• <strong>Min:</strong> 10 instances, <strong>Max:</strong> 1000</div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h3 className="font-bold text-green-400 mb-3">Service Discovery</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Consul for service registry</div>
                      <div>• Health checks via HTTP /health endpoint</div>
                      <div>• Automatic deregistration on failure</div>
                      <div>• DNS-based service discovery</div>
                    </div>
                  </div>

                  <div className="bg-pink-900/30 p-6 rounded-xl border-2 border-pink-700">
                    <h3 className="font-bold text-pink-400 mb-3">Circuit Breaker</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Detect database failures (&gt;10% errors)</div>
                      <div>• Open circuit, serve from cache only</div>
                      <div>• Half-open after 60 seconds (test recovery)</div>
                      <div>• Close circuit when DB healthy again</div>
                    </div>
                  </div>

                  <div className="bg-cyan-900/30 p-6 rounded-xl border-2 border-cyan-700">
                    <h3 className="font-bold text-cyan-400 mb-3">Rate Limiting</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Token bucket algorithm in Redis</div>
                      <div>• 10 requests/hour per IP (anon users)</div>
                      <div>• 100 requests/hour per API key</div>
                      <div>• Return 429 Too Many Requests</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Optimizations */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-green-400">Performance Optimizations</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-900/30 p-6 rounded-xl">
                    <div className="font-bold text-green-400 mb-3 text-lg">Database Optimizations</div>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Indexes:</strong> B-tree on short_url (primary lookup)</div>
                      <div>• <strong>Connection Pooling:</strong> PgBouncer (max 100 connections)</div>
                      <div>• <strong>Prepared Statements:</strong> Reduce parsing overhead</div>
                      <div>• <strong>Query Optimization:</strong> No JOINs needed (simple key-value)</div>
                      <div>• <strong>VACUUM:</strong> Regular cleanup of dead tuples</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl">
                    <div className="font-bold text-blue-400 mb-3 text-lg">API Optimizations</div>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Compression:</strong> Gzip API responses (reduce bandwidth 70%)</div>
                      <div>• <strong>HTTP/2:</strong> Multiplexing, header compression</div>
                      <div>• <strong>Keep-Alive:</strong> Reuse TCP connections</div>
                      <div>• <strong>Async I/O:</strong> Non-blocking Redis/DB calls</div>
                      <div>• <strong>Batching:</strong> Batch analytics writes (10s window)</div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-6 rounded-xl">
                    <div className="font-bold text-purple-400 mb-3 text-lg">Client Optimizations</div>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Browser Caching:</strong> Cache-Control: max-age=3600</div>
                      <div>• <strong>Prefetching:</strong> DNS prefetch for redirect domains</div>
                      <div>• <strong>Minification:</strong> Minify JS/CSS (40% size reduction)</div>
                      <div>• <strong>Lazy Loading:</strong> Load analytics charts on demand</div>
                    </div>
                  </div>

                  <div className="bg-orange-900/30 p-6 rounded-xl">
                    <div className="font-bold text-orange-400 mb-3 text-lg">Monitoring & Alerting</div>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Metrics:</strong> Prometheus + Grafana dashboards</div>
                      <div>• <strong>Logging:</strong> ELK stack for centralized logs</div>
                      <div>• <strong>Tracing:</strong> Jaeger for distributed tracing</div>
                      <div>• <strong>Alerts:</strong> PagerDuty for on-call notifications</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tradeoffs' && (
            <div className="space-y-8">
              {/* Technology Stack */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-indigo-400">Technology Stack</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-indigo-900/30 p-6 rounded-xl border-2 border-indigo-700">
                    <h3 className="font-bold text-indigo-400 mb-4">Backend Services</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-white">API Layer: Go</div>
                        <div className="text-gray-300">High performance, low latency for redirect service</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Load Balancer: Nginx</div>
                        <div className="text-gray-300">L7 load balancing, SSL termination, 100K+ RPS</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Message Queue: Kafka</div>
                        <div className="text-gray-300">High throughput event streaming for analytics</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h3 className="font-bold text-blue-400 mb-4">Data Storage</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-white">Primary DB: PostgreSQL</div>
                        <div className="text-gray-300">ACID compliance, mature, great for &lt;10TB scale</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Cache: Redis Cluster</div>
                        <div className="text-gray-300">In-memory, high performance, automatic sharding</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Analytics: ClickHouse</div>
                        <div className="text-gray-300">Columnar OLAP, fast aggregations for reporting</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h3 className="font-bold text-green-400 mb-4">Infrastructure</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-white">Cloud: AWS</div>
                        <div className="text-gray-300">EC2 for compute, S3 for backups, CloudFront CDN</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Orchestration: Kubernetes</div>
                        <div className="text-gray-300">Container orchestration, auto-scaling, self-healing</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Coordination: ZooKeeper</div>
                        <div className="text-gray-300">Distributed coordination for ID ranges</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-6 rounded-xl border-2 border-purple-700">
                    <h3 className="font-bold text-purple-400 mb-4">Monitoring & Ops</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-white">Metrics: Prometheus + Grafana</div>
                        <div className="text-gray-300">Time-series metrics, real-time dashboards</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Logging: ELK Stack</div>
                        <div className="text-gray-300">Elasticsearch, Logstash, Kibana for log analysis</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Tracing: Jaeger</div>
                        <div className="text-gray-300">Distributed tracing for debugging latency issues</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Design Trade-offs */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-orange-400">Key Design Trade-offs</span>
                </h2>

                <div className="space-y-6">
                  {/* Hashing vs Counter */}
                  <div className="bg-orange-900/30 p-6 rounded-xl border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-orange-400 mb-4">1. Hash-based vs Counter-based ID Generation</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-blue-700">
                        <div className="font-bold text-blue-400 mb-2">Hash-based (MD5 + Base62)</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Same long URL → same short URL (idempotent)</div>
                          <div>• No coordination needed (stateless)</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Hash collisions require handling</div>
                          <div>• Need to query DB to check duplicates</div>
                          <div>• Predictable (security concern)</div>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-green-700">
                        <div className="font-bold text-green-400 mb-2">Counter-based (Snowflake)</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Guaranteed unique (no collisions)</div>
                          <div>• High performance (4M IDs/sec)</div>
                          <div>• Sortable by creation time</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Same long URL → different short URLs</div>
                          <div>• Requires coordination (ZooKeeper)</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-900/30 p-4 rounded-lg border-2 border-purple-700">
                      <div className="font-bold text-purple-400 mb-2">Our Decision: Snowflake + Deduplication Layer</div>
                      <div className="text-sm text-gray-300">
                        Use Snowflake for guaranteed uniqueness and performance. Add deduplication layer: before generating new ID, check cache/DB if long URL already exists. If yes, return existing short URL. This combines benefits of both approaches.
                      </div>
                    </div>
                  </div>

                  {/* HTTP 301 vs 302 */}
                  <div className="bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">2. HTTP 301 (Permanent) vs 302 (Temporary) Redirect</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-green-700">
                        <div className="font-bold text-green-400 mb-2">301 Permanent Redirect</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Browser caches redirect (faster subsequent clicks)</div>
                          <div>• Reduces server load significantly</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Can't track analytics (cached redirects bypass server)</div>
                          <div>• Can't update destination URL (cached in browser)</div>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-orange-700">
                        <div className="font-bold text-orange-400 mb-2">302 Temporary Redirect</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Always hits server (analytics tracking works)</div>
                          <div>• Can update destination URL dynamically</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Higher server load (every click hits server)</div>
                          <div>• Slightly slower user experience</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-cyan-900/30 p-4 rounded-lg border-2 border-cyan-700">
                      <div className="font-bold text-cyan-400 mb-2">Our Decision: 302 for Analytics, Configurable 301 for Power Users</div>
                      <div className="text-sm text-gray-300">
                        Default to 302 to enable analytics tracking. Offer 301 as premium feature for users who prefer performance over analytics. CDN caching (1-hour TTL) mitigates 302 performance impact.
                      </div>
                    </div>
                  </div>

                  {/* SQL vs NoSQL */}
                  <div className="bg-green-900/30 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-green-400 mb-4">3. SQL (PostgreSQL) vs NoSQL (Cassandra) for URL Storage</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-blue-700">
                        <div className="font-bold text-blue-400 mb-2">SQL (PostgreSQL)</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• ACID guarantees (data consistency)</div>
                          <div>• Mature ecosystem, well-understood</div>
                          <div>• Good for &lt;10TB scale with sharding</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Vertical scaling limits</div>
                          <div>• Manual sharding complexity</div>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-purple-700">
                        <div className="font-bold text-purple-400 mb-2">NoSQL (Cassandra)</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Horizontal scaling (petabyte scale)</div>
                          <div>• Auto-sharding, no manual partitioning</div>
                          <div>• Write-optimized (good for analytics)</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Eventual consistency (not ACID)</div>
                          <div>• Steeper learning curve</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-900/30 p-4 rounded-lg border-2 border-emerald-700">
                      <div className="font-bold text-emerald-400 mb-2">Our Decision: PostgreSQL with Sharding</div>
                      <div className="text-sm text-gray-300">
                        For TinyURL, data model is simple (key-value), and scale is manageable (6TB for 10 years). PostgreSQL offers ACID guarantees, mature tooling, and simpler operations. Shard by short_url hash across 64 nodes. Use Cassandra for analytics DB where write volume is higher and eventual consistency is acceptable.
                      </div>
                    </div>
                  </div>

                  {/* Custom Aliases */}
                  <div className="bg-purple-900/30 p-6 rounded-xl border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">4. Custom Aliases: Allowed vs Auto-Generated Only</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-green-700">
                        <div className="font-bold text-green-400 mb-2">Allow Custom Aliases</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Better user experience (memorable URLs)</div>
                          <div>• Branding opportunities (tinyurl.com/nike)</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Uniqueness check (query DB before insert)</div>
                          <div>• Squatting prevention (reserve popular names)</div>
                          <div>• Profanity filtering required</div>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-orange-700">
                        <div className="font-bold text-orange-400 mb-2">Auto-Generated Only</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• No uniqueness checks (guaranteed unique via ID gen)</div>
                          <div>• Simpler implementation, faster</div>
                          <div>• No squatting or abuse issues</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Not user-friendly (random strings)</div>
                          <div>• Limits branding opportunities</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-violet-900/30 p-4 rounded-lg border-2 border-violet-700">
                      <div className="font-bold text-violet-400 mb-2">Our Decision: Support Both (Premium Feature)</div>
                      <div className="text-sm text-gray-300">
                        Auto-generate by default for speed and simplicity. Offer custom aliases as premium feature: validate format (alphanumeric only), check uniqueness, filter profanity. Charge for custom aliases to prevent squatting and monetize the feature.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Considerations */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-pink-400">Additional Considerations</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-pink-900/30 p-6 rounded-xl">
                    <h3 className="font-bold text-pink-400 mb-3">Security</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>• <strong>DDoS Protection:</strong> CloudFlare for traffic filtering</div>
                      <div>• <strong>Malicious URLs:</strong> Check against Google Safe Browsing API</div>
                      <div>• <strong>Phishing Prevention:</strong> Block known phishing domains</div>
                      <div>• <strong>Encryption:</strong> TLS 1.3 for all traffic, encrypt DB at rest</div>
                      <div>• <strong>API Keys:</strong> SHA-256 hashed, rotatable</div>
                    </div>
                  </div>

                  <div className="bg-red-900/30 p-6 rounded-xl">
                    <h3 className="font-bold text-red-400 mb-3">Compliance</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>• <strong>GDPR:</strong> User data deletion within 30 days</div>
                      <div>• <strong>DMCA:</strong> Process takedown requests within 24 hours</div>
                      <div>• <strong>Terms of Service:</strong> Prohibit illegal content</div>
                      <div>• <strong>Privacy:</strong> Anonymize IP addresses after 90 days</div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/30 p-6 rounded-xl">
                    <h3 className="font-bold text-yellow-400 mb-3">Disaster Recovery</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>• <strong>Backups:</strong> Daily snapshots to S3 Glacier (7-year retention)</div>
                      <div>• <strong>Multi-region:</strong> Active-active in US-East and EU-West</div>
                      <div>• <strong>Failover:</strong> Automated DNS failover (RTO &lt;5 min)</div>
                      <div>• <strong>Data Loss:</strong> RPO &lt;1 minute with streaming replication</div>
                    </div>
                  </div>

                  <div className="bg-indigo-900/30 p-6 rounded-xl">
                    <h3 className="font-bold text-indigo-400 mb-3">Monetization</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>• <strong>Free Tier:</strong> 10 URLs/hour, auto-generated aliases</div>
                      <div>• <strong>Premium:</strong> $9/month - custom aliases, analytics, no ads</div>
                      <div>• <strong>Enterprise:</strong> $99/month - API access, white-label, SLA</div>
                      <div>• <strong>Ads:</strong> Display ads on interstitial pages (optional)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

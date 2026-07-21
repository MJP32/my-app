import { useState, useEffect } from 'react'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { isProblemCompleted } from '../services/progressService'
import Breadcrumb from '../components/Breadcrumb'
import CollapsibleSidebar from '../components/CollapsibleSidebar'
import { useTheme } from '../contexts/ThemeContext'

const PRACTICE_COLORS = {
  primary: '#93c5fd',
  primaryHover: '#bfdbfe',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
}

const tabCategories = {
  all: { label: 'All', ids: null },
  fundamentals: { label: 'Core Fundamentals', ids: ['Data Structures', 'Algorithms'] },
  languages: { label: 'Programming Languages', ids: ['Java Features', 'Core Java Fundamentals', 'Concurrency', 'Python Operations'] },
  design: { label: 'System Design', ids: ['System Design'] },
  interview: { label: 'Interview Prep', ids: ['AI Interview'] }
}

// =============================================================================
// INTERVIEW QUESTION DIAGRAMS
// =============================================================================

const ApiFlowDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '0.5rem 0' }}>
    <defs>
      <marker id="apiArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
      <marker id="apiArrowBack" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">API Request / Response Flow</text>

    {/* Client */}
    <rect x="30" y="60" width="140" height="80" rx="10" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="100" y="90" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">Client</text>
    <text x="100" y="110" textAnchor="middle" fill="#93c5fd" fontSize="9">Browser / Mobile</text>
    <text x="100" y="125" textAnchor="middle" fill="#93c5fd" fontSize="9">App / Service</text>

    {/* API */}
    <rect x="280" y="60" width="140" height="80" rx="10" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="90" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">API</text>
    <text x="350" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="9">REST / GraphQL</text>
    <text x="350" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="9">gRPC / SOAP</text>

    {/* Server / DB */}
    <rect x="530" y="60" width="140" height="80" rx="10" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="90" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">Server</text>
    <text x="600" y="110" textAnchor="middle" fill="#86efac" fontSize="9">Business Logic</text>
    <text x="600" y="125" textAnchor="middle" fill="#86efac" fontSize="9">Database</text>

    {/* Request arrow */}
    <line x1="170" y1="85" x2="276" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#apiArrow)"/>
    <text x="223" y="76" textAnchor="middle" fill="#a78bfa" fontSize="9">GET /users</text>

    <line x1="420" y1="85" x2="526" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#apiArrow)"/>
    <text x="473" y="76" textAnchor="middle" fill="#a78bfa" fontSize="9">SELECT *</text>

    {/* Response arrow */}
    <line x1="526" y1="115" x2="420" y2="115" stroke="#22c55e" strokeWidth="2" markerEnd="url(#apiArrowBack)"/>
    <text x="473" y="132" textAnchor="middle" fill="#4ade80" fontSize="9">rows</text>

    <line x1="276" y1="115" x2="170" y2="115" stroke="#22c55e" strokeWidth="2" markerEnd="url(#apiArrowBack)"/>
    <text x="223" y="132" textAnchor="middle" fill="#4ade80" fontSize="9">200 + JSON</text>

    {/* Footer */}
    <text x="350" y="180" textAnchor="middle" fill="#64748b" fontSize="9">Contract: endpoints, methods, auth, status codes — independent of implementation</text>
  </svg>
)

const SqlVsNoSqlDiagram = () => (
  <svg viewBox="0 0 700 240" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '0.5rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">SQL vs NoSQL Data Models</text>

    {/* SQL side */}
    <rect x="20" y="40" width="320" height="180" rx="10" fill="rgba(59, 130, 246, 0.08)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="180" y="62" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">SQL — Tables</text>

    {/* SQL table header */}
    <rect x="40" y="80" width="280" height="22" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <line x1="100" y1="80" x2="100" y2="195" stroke="#3b82f6" strokeWidth="1"/>
    <line x1="200" y1="80" x2="200" y2="195" stroke="#3b82f6" strokeWidth="1"/>
    <text x="70" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="bold">id</text>
    <text x="150" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="bold">name</text>
    <text x="260" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="bold">email</text>

    {/* SQL rows */}
    <rect x="40" y="102" width="280" height="22" fill="rgba(15, 23, 42, 0.5)" stroke="#1e293b" strokeWidth="1"/>
    <text x="70" y="117" textAnchor="middle" fill="#cbd5e1" fontSize="10">1</text>
    <text x="150" y="117" textAnchor="middle" fill="#cbd5e1" fontSize="10">Alice</text>
    <text x="260" y="117" textAnchor="middle" fill="#cbd5e1" fontSize="10">a@x.io</text>

    <rect x="40" y="124" width="280" height="22" fill="rgba(30, 41, 59, 0.5)" stroke="#1e293b" strokeWidth="1"/>
    <text x="70" y="139" textAnchor="middle" fill="#cbd5e1" fontSize="10">2</text>
    <text x="150" y="139" textAnchor="middle" fill="#cbd5e1" fontSize="10">Bob</text>
    <text x="260" y="139" textAnchor="middle" fill="#cbd5e1" fontSize="10">b@x.io</text>

    <rect x="40" y="146" width="280" height="22" fill="rgba(15, 23, 42, 0.5)" stroke="#1e293b" strokeWidth="1"/>
    <text x="70" y="161" textAnchor="middle" fill="#cbd5e1" fontSize="10">3</text>
    <text x="150" y="161" textAnchor="middle" fill="#cbd5e1" fontSize="10">Carol</text>
    <text x="260" y="161" textAnchor="middle" fill="#cbd5e1" fontSize="10">c@x.io</text>

    <text x="180" y="190" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">Fixed schema • ACID • Joins</text>
    <text x="180" y="208" textAnchor="middle" fill="#64748b" fontSize="8">PostgreSQL · MySQL · Oracle</text>

    {/* NoSQL side */}
    <rect x="360" y="40" width="320" height="180" rx="10" fill="rgba(34, 197, 94, 0.08)" stroke="#22c55e" strokeWidth="2"/>
    <text x="520" y="62" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">NoSQL — Documents</text>

    {/* Doc 1 */}
    <rect x="380" y="80" width="135" height="68" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="390" y="95" fill="#86efac" fontSize="9" fontFamily="monospace">{`{`}</text>
    <text x="395" y="108" fill="#bbf7d0" fontSize="8" fontFamily="monospace">"id": 1,</text>
    <text x="395" y="120" fill="#bbf7d0" fontSize="8" fontFamily="monospace">"name": "Alice",</text>
    <text x="395" y="132" fill="#bbf7d0" fontSize="8" fontFamily="monospace">"tags": ["a","b"]</text>
    <text x="390" y="143" fill="#86efac" fontSize="9" fontFamily="monospace">{`}`}</text>

    {/* Doc 2 - different shape! */}
    <rect x="525" y="80" width="135" height="68" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="535" y="95" fill="#86efac" fontSize="9" fontFamily="monospace">{`{`}</text>
    <text x="540" y="108" fill="#bbf7d0" fontSize="8" fontFamily="monospace">"id": 2,</text>
    <text x="540" y="120" fill="#bbf7d0" fontSize="8" fontFamily="monospace">"name": "Bob",</text>
    <text x="540" y="132" fill="#bbf7d0" fontSize="8" fontFamily="monospace">"age": 30</text>
    <text x="535" y="143" fill="#86efac" fontSize="9" fontFamily="monospace">{`}`}</text>

    {/* KV store */}
    <rect x="380" y="155" width="280" height="32" rx="6" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3"/>
    <text x="520" y="173" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="monospace">"user:1" → {`{...}`}    "user:2" → {`{...}`}</text>

    <text x="520" y="200" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">Flexible • BASE • Horizontal</text>
    <text x="520" y="212" textAnchor="middle" fill="#64748b" fontSize="8">MongoDB · Redis · Cassandra</text>
  </svg>
)

const RequestResponseDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '0.5rem 0' }}>
    <defs>
      <marker id="rrArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#a78bfa" />
      </marker>
      <marker id="rrArrowBack" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="18" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">HTTP Request / Response Pipeline</text>

    {/* Top row - Request flow */}
    {[
      { x: 20, label: 'DNS', sub: 'Resolve IP', color: '#3b82f6' },
      { x: 130, label: 'TCP', sub: '3-way SYN', color: '#06b6d4' },
      { x: 240, label: 'TLS', sub: 'Cert + keys', color: '#0891b2' },
      { x: 350, label: 'HTTP', sub: 'Send Request', color: '#8b5cf6' }
    ].map((s, i) => (
      <g key={i}>
        <rect x={s.x} y="40" width="100" height="55" rx="6" fill={`${s.color}33`} stroke={s.color} strokeWidth="1.5"/>
        <text x={s.x + 50} y="62" textAnchor="middle" fill={s.color} fontSize="11" fontWeight="bold">{s.label}</text>
        <text x={s.x + 50} y="78" textAnchor="middle" fill="#cbd5e1" fontSize="8">{s.sub}</text>
      </g>
    ))}

    {/* Server box */}
    <rect x="470" y="40" width="310" height="55" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="625" y="58" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Server</text>
    <text x="510" y="78" fill="#fcd34d" fontSize="8">LB</text>
    <text x="555" y="78" fill="#fcd34d" fontSize="8">→ App</text>
    <text x="610" y="78" fill="#fcd34d" fontSize="8">→ Auth</text>
    <text x="665" y="78" fill="#fcd34d" fontSize="8">→ Ctrl</text>
    <text x="720" y="78" fill="#fcd34d" fontSize="8">→ DB</text>

    {/* Forward arrows */}
    {[120, 230, 340, 450].map((x, i) => (
      <line key={i} x1={x} y1="68" x2={x + 8} y2="68" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#rrArrow)"/>
    ))}

    {/* Bottom row - Response */}
    <rect x="20" y="135" width="430" height="55" rx="6" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="235" y="155" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Client Processing</text>
    <text x="235" y="172" textAnchor="middle" fill="#86efac" fontSize="8">Parse response → Run JS → Fetch CSS/JS/imgs → Render DOM</text>

    <rect x="470" y="135" width="310" height="55" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="625" y="155" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">HTTP Response</text>
    <text x="625" y="172" textAnchor="middle" fill="#86efac" fontSize="8">200 OK · Content-Type · Body (JSON/HTML)</text>

    {/* Down + back arrow */}
    <line x1="625" y1="95" x2="625" y2="130" stroke="#4ade80" strokeWidth="1.5" markerEnd="url(#rrArrowBack)"/>
    <line x1="465" y1="162" x2="455" y2="162" stroke="#4ade80" strokeWidth="1.5" markerEnd="url(#rrArrowBack)"/>

    {/* Footer */}
    <text x="400" y="210" textAnchor="middle" fill="#64748b" fontSize="9">Connection kept alive (HTTP/1.1) or multiplexed (HTTP/2) for subsequent requests</text>
  </svg>
)

const UrlToRenderDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '0.5rem 0' }}>
    <defs>
      <marker id="urArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#a78bfa" />
      </marker>
      <marker id="urArrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="18" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">URL → Pixels: Network + Browser Rendering</text>

    {/* NETWORK PHASE - Top row */}
    <text x="200" y="45" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">⚙️ Network Phase</text>
    {[
      { x: 20, label: 'URL Parse', sub: 'protocol/host/path', color: '#3b82f6' },
      { x: 130, label: 'DNS', sub: 'host → IP', color: '#06b6d4' },
      { x: 240, label: 'TCP + TLS', sub: 'connect + secure', color: '#0891b2' },
      { x: 350, label: 'HTTP', sub: 'request + headers', color: '#8b5cf6' }
    ].map((s, i) => (
      <g key={i}>
        <rect x={s.x} y="55" width="100" height="50" rx="6" fill={`${s.color}33`} stroke={s.color} strokeWidth="1.5"/>
        <text x={s.x + 50} y="74" textAnchor="middle" fill={s.color} fontSize="10" fontWeight="bold">{s.label}</text>
        <text x={s.x + 50} y="91" textAnchor="middle" fill="#cbd5e1" fontSize="8">{s.sub}</text>
      </g>
    ))}

    {/* Server box */}
    <rect x="470" y="55" width="310" height="50" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="625" y="74" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Server</text>
    <text x="625" y="91" textAnchor="middle" fill="#fcd34d" fontSize="8">LB → App → Auth → Controller → DB → HTML/JSON</text>

    {/* Forward arrows */}
    {[120, 230, 340, 450].map((x, i) => (
      <line key={i} x1={x} y1="80" x2={x + 8} y2="80" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#urArrow)"/>
    ))}

    {/* BROWSER RENDERING - Bottom rows */}
    <text x="400" y="135" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">🎨 Browser Rendering Pipeline</text>

    {[
      { x: 20, label: 'Parse HTML', sub: '→ DOM tree', color: '#22c55e' },
      { x: 145, label: 'Parse CSS', sub: '→ CSSOM', color: '#10b981' },
      { x: 270, label: 'Run JS', sub: 'blocks parser', color: '#f59e0b' },
      { x: 395, label: 'Render Tree', sub: 'DOM + CSSOM', color: '#8b5cf6' },
      { x: 520, label: 'Layout', sub: 'geometry', color: '#ec4899' },
      { x: 645, label: 'Paint', sub: 'pixels', color: '#06b6d4' }
    ].map((s, i) => (
      <g key={i}>
        <rect x={s.x} y="150" width="115" height="50" rx="6" fill={`${s.color}33`} stroke={s.color} strokeWidth="1.5"/>
        <text x={s.x + 57} y="168" textAnchor="middle" fill={s.color} fontSize="10" fontWeight="bold">{s.label}</text>
        <text x={s.x + 57} y="185" textAnchor="middle" fill="#cbd5e1" fontSize="8">{s.sub}</text>
      </g>
    ))}

    {/* Render arrows */}
    {[135, 260, 385, 510, 635].map((x, i) => (
      <line key={i} x1={x} y1="175" x2={x + 8} y2="175" stroke="#4ade80" strokeWidth="1.5" markerEnd="url(#urArrowGreen)"/>
    ))}

    {/* Composite */}
    <rect x="270" y="220" width="260" height="40" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="400" y="237" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Composite → GPU → Pixels on Screen</text>
    <text x="400" y="252" textAnchor="middle" fill="#86efac" fontSize="8">First Contentful Paint · Largest Contentful Paint · Time to Interactive</text>

    {/* Down arrow from paint to composite */}
    <line x1="700" y1="200" x2="530" y2="225" stroke="#4ade80" strokeWidth="1.5" markerEnd="url(#urArrowGreen)"/>
  </svg>
)

const ClassLoaderDiagram = () => (
  <svg viewBox="0 0 700 240" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '0.5rem 0' }}>
    <defs>
      <marker id="clArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#a78bfa" />
      </marker>
    </defs>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">Java Class Loader Hierarchy (Parent Delegation)</text>

    {/* Bootstrap */}
    <rect x="200" y="40" width="300" height="40" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="58" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Bootstrap ClassLoader</text>
    <text x="350" y="72" textAnchor="middle" fill="#fca5a5" fontSize="9">java.lang.* · java.util.* · core JDK (rt.jar / lib/modules)</text>

    {/* Extension/Platform */}
    <rect x="180" y="100" width="340" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="118" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Platform ClassLoader (was Extension)</text>
    <text x="350" y="132" textAnchor="middle" fill="#fcd34d" fontSize="9">javax.* · java.sql · platform modules</text>

    {/* Application */}
    <rect x="160" y="160" width="380" height="40" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="178" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Application (System) ClassLoader</text>
    <text x="350" y="192" textAnchor="middle" fill="#86efac" fontSize="9">Your code · classes from CLASSPATH / -cp</text>

    {/* Custom (optional) */}
    <rect x="220" y="215" width="260" height="20" rx="4" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3"/>
    <text x="350" y="229" textAnchor="middle" fill="#a78bfa" fontSize="9">Custom ClassLoader (e.g. Tomcat, OSGi, plugin systems)</text>

    {/* Up arrows showing parent delegation */}
    <line x1="350" y1="160" x2="350" y2="142" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#clArrow)"/>
    <line x1="350" y1="100" x2="350" y2="82" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#clArrow)"/>
    <line x1="350" y1="215" x2="350" y2="202" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#clArrow)"/>

    {/* Side labels */}
    <text x="100" y="125" fill="#a78bfa" fontSize="10" fontWeight="bold">parent</text>
    <text x="100" y="138" fill="#94a3b8" fontSize="8">delegation</text>
    <text x="600" y="125" fill="#94a3b8" fontSize="9" textAnchor="end">child asks</text>
    <text x="600" y="138" fill="#94a3b8" fontSize="9" textAnchor="end">parent first</text>
  </svg>
)

const MarkAndSweepDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '0.5rem 0' }}>
    <text x="400" y="18" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">Garbage Collection: Mark &amp; Sweep</text>

    {/* Phase 1: Mark */}
    <rect x="20" y="40" width="240" height="160" rx="8" fill="rgba(245, 158, 11, 0.05)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="140" y="58" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">1. MARK</text>
    <text x="140" y="72" textAnchor="middle" fill="#fcd34d" fontSize="8">Trace from GC roots, mark reachable</text>

    {/* GC Root */}
    <rect x="35" y="85" width="50" height="22" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="60" y="100" textAnchor="middle" fill="#86efac" fontSize="8" fontWeight="bold">GC Root</text>

    {/* Marked (live) objects */}
    <circle cx="120" cy="105" r="14" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="120" y="108" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">A</text>
    <circle cx="180" cy="95" r="14" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="180" y="98" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">B</text>
    <circle cx="220" cy="125" r="14" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="220" y="128" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">C</text>

    {/* Unmarked (garbage) objects */}
    <circle cx="65" cy="155" r="14" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3"/>
    <text x="65" y="158" textAnchor="middle" fill="#fca5a5" fontSize="9">X</text>
    <circle cx="130" cy="175" r="14" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3"/>
    <text x="130" y="178" textAnchor="middle" fill="#fca5a5" fontSize="9">Y</text>
    <circle cx="210" cy="170" r="14" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3"/>
    <text x="210" y="173" textAnchor="middle" fill="#fca5a5" fontSize="9">Z</text>

    {/* References between marked */}
    <line x1="85" y1="100" x2="106" y2="103" stroke="#22c55e" strokeWidth="1.5"/>
    <line x1="134" y1="100" x2="166" y2="98" stroke="#22c55e" strokeWidth="1.5"/>
    <line x1="132" y1="115" x2="208" y2="123" stroke="#22c55e" strokeWidth="1.5"/>

    {/* Phase 2: Sweep */}
    <rect x="280" y="40" width="240" height="160" rx="8" fill="rgba(239, 68, 68, 0.05)" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="400" y="58" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">2. SWEEP</text>
    <text x="400" y="72" textAnchor="middle" fill="#fca5a5" fontSize="8">Free unmarked memory (fragmented)</text>

    <circle cx="320" cy="105" r="14" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="320" y="108" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">A</text>
    <circle cx="380" cy="95" r="14" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="380" y="98" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">B</text>
    <circle cx="420" cy="125" r="14" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="420" y="128" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">C</text>

    {/* Empty holes */}
    <rect x="295" y="145" width="40" height="25" rx="3" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <text x="315" y="161" textAnchor="middle" fill="#64748b" fontSize="8">free</text>
    <rect x="350" y="160" width="50" height="25" rx="3" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <text x="375" y="176" textAnchor="middle" fill="#64748b" fontSize="8">free</text>
    <rect x="430" y="155" width="55" height="25" rx="3" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <text x="457" y="171" textAnchor="middle" fill="#64748b" fontSize="8">free</text>

    {/* Phase 3: Compact (optional) */}
    <rect x="540" y="40" width="240" height="160" rx="8" fill="rgba(34, 197, 94, 0.05)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="660" y="58" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">3. COMPACT (optional)</text>
    <text x="660" y="72" textAnchor="middle" fill="#86efac" fontSize="8">Move live objects together</text>

    <circle cx="565" cy="100" r="14" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="565" y="103" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">A</text>
    <circle cx="600" cy="100" r="14" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="600" y="103" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">B</text>
    <circle cx="635" cy="100" r="14" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="635" y="103" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">C</text>

    <rect x="555" y="135" width="195" height="40" rx="3" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3"/>
    <text x="652" y="158" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">contiguous free space</text>
  </svg>
)

const JvmJdkJreDiagram = () => (
  <svg viewBox="0 0 700 240" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '0.5rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">JDK ⊃ JRE ⊃ JVM (Nested)</text>

    {/* JDK outer */}
    <rect x="40" y="40" width="620" height="180" rx="12" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="60" y="62" fill="#fbbf24" fontSize="13" fontWeight="bold">JDK — Java Development Kit</text>
    <text x="60" y="78" fill="#fcd34d" fontSize="9">For developers · javac, javadoc, jdb, jar, jlink, jpackage</text>

    {/* JRE inner */}
    <rect x="80" y="95" width="540" height="115" rx="10" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="100" y="115" fill="#a78bfa" fontSize="12" fontWeight="bold">JRE — Java Runtime Environment</text>
    <text x="100" y="131" fill="#c4b5fd" fontSize="9">For end-users · class libraries (java.*, javax.*) + JVM</text>

    {/* JVM core */}
    <rect x="120" y="145" width="460" height="55" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="140" y="165" fill="#4ade80" fontSize="12" fontWeight="bold">JVM — Java Virtual Machine</text>
    <text x="140" y="181" fill="#86efac" fontSize="9">Class Loader · Memory · Execution Engine · GC · JIT compiler</text>
    <text x="140" y="194" fill="#86efac" fontSize="9">Executes bytecode (.class files)</text>
  </svg>
)

const HeapStackDiagram = () => (
  <svg viewBox="0 0 700 280" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '0.5rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">JVM Memory: Stack vs Heap</text>

    {/* Stack */}
    <rect x="30" y="40" width="280" height="220" rx="10" fill="rgba(59, 130, 246, 0.08)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="170" y="62" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">Stack (per thread)</text>
    <text x="170" y="78" textAnchor="middle" fill="#93c5fd" fontSize="9">Method frames · local primitives · references</text>

    {/* Stack frames */}
    <rect x="70" y="95" width="200" height="35" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="170" y="111" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="bold">main()</text>
    <text x="170" y="124" textAnchor="middle" fill="#93c5fd" fontSize="8">int x = 5; User u = ref→</text>

    <rect x="70" y="135" width="200" height="35" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="170" y="151" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="bold">processUser()</text>
    <text x="170" y="164" textAnchor="middle" fill="#93c5fd" fontSize="8">String name = ref→ ; int age = 30</text>

    <rect x="70" y="175" width="200" height="35" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="170" y="191" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="bold">validate()</text>
    <text x="170" y="204" textAnchor="middle" fill="#93c5fd" fontSize="8">boolean ok; current frame</text>

    <text x="170" y="232" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">⬆ LIFO · auto-managed · fast</text>
    <text x="170" y="248" textAnchor="middle" fill="#94a3b8" fontSize="8">StackOverflowError if too deep</text>

    {/* Heap */}
    <rect x="370" y="40" width="300" height="220" rx="10" fill="rgba(34, 197, 94, 0.08)" stroke="#22c55e" strokeWidth="2"/>
    <text x="520" y="62" textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="bold">Heap (shared by threads)</text>
    <text x="520" y="78" textAnchor="middle" fill="#86efac" fontSize="9">All objects · arrays · class metadata</text>

    {/* Young gen */}
    <rect x="385" y="95" width="270" height="60" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="520" y="113" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Young Generation</text>
    <text x="395" y="130" fill="#86efac" fontSize="8">Eden</text>
    <text x="455" y="130" fill="#86efac" fontSize="8">Survivor S0</text>
    <text x="540" y="130" fill="#86efac" fontSize="8">Survivor S1</text>
    <text x="520" y="148" textAnchor="middle" fill="#bbf7d0" fontSize="8">new objects · minor GC frequent</text>

    {/* Old gen */}
    <rect x="385" y="160" width="270" height="50" rx="6" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="520" y="178" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Old (Tenured) Generation</text>
    <text x="520" y="195" textAnchor="middle" fill="#bbf7d0" fontSize="8">long-lived objects · major GC rare but slow</text>

    {/* Metaspace */}
    <rect x="385" y="215" width="270" height="32" rx="6" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="520" y="232" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Metaspace (off-heap, Java 8+)</text>
    <text x="520" y="244" textAnchor="middle" fill="#c4b5fd" fontSize="8">Class metadata · replaced PermGen</text>

    {/* Reference arrow */}
    <line x1="270" y1="115" x2="380" y2="115" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4"/>
    <text x="325" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">ref points</text>
  </svg>
)

const FileUploaderDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '0.5rem 0' }}>
    <defs>
      <marker id="fuArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">File Uploader Flow</text>

    {/* Browser */}
    <rect x="20" y="50" width="160" height="100" rx="10" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="100" y="70" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Browser</text>
    <rect x="40" y="82" width="120" height="20" rx="3" fill="rgba(15, 23, 42, 0.6)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="100" y="96" textAnchor="middle" fill="#bfdbfe" fontSize="9">📎 Choose File</text>
    <rect x="40" y="108" width="120" height="22" rx="3" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="100" y="123" textAnchor="middle" fill="#bbf7d0" fontSize="9" fontWeight="bold">Upload</text>
    <text x="100" y="143" textAnchor="middle" fill="#94a3b8" fontSize="8">FormData + XHR</text>

    {/* Server */}
    <rect x="270" y="50" width="160" height="100" rx="10" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Server</text>
    <text x="350" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="9">multer / busboy</text>
    <text x="350" y="108" textAnchor="middle" fill="#c4b5fd" fontSize="9">parse multipart</text>
    <text x="350" y="124" textAnchor="middle" fill="#c4b5fd" fontSize="9">validate + scan</text>
    <text x="350" y="140" textAnchor="middle" fill="#c4b5fd" fontSize="9">return URL</text>

    {/* Storage */}
    <rect x="520" y="50" width="160" height="100" rx="10" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="600" y="70" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Storage</text>
    <text x="600" y="92" textAnchor="middle" fill="#fcd34d" fontSize="9">S3 / GCS / disk</text>
    <ellipse cx="600" cy="115" rx="35" ry="15" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="600" y="118" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="bold">bucket</text>
    <text x="600" y="143" textAnchor="middle" fill="#94a3b8" fontSize="8">CDN serves files</text>

    {/* Arrows */}
    <line x1="180" y1="100" x2="265" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#fuArrow)"/>
    <text x="222" y="92" textAnchor="middle" fill="#a78bfa" fontSize="9">multipart/form-data</text>

    <line x1="430" y1="100" x2="515" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#fuArrow)"/>
    <text x="472" y="92" textAnchor="middle" fill="#a78bfa" fontSize="9">PUT object</text>

    {/* Footer */}
    <text x="350" y="180" textAnchor="middle" fill="#64748b" fontSize="9">Production tip: pre-signed URLs let the browser upload directly to storage, bypassing the server</text>
  </svg>
)

const INTERVIEW_DIAGRAMS = {
  apiFlow: ApiFlowDiagram,
  sqlNoSql: SqlVsNoSqlDiagram,
  requestResponse: RequestResponseDiagram,
  urlToRender: UrlToRenderDiagram,
  fileUploader: FileUploaderDiagram,
  classLoader: ClassLoaderDiagram,
  markAndSweep: MarkAndSweepDiagram,
  jvmJdkJre: JvmJdkJreDiagram,
  heapStack: HeapStackDiagram,
}

const CALLOUT_TONES = {
  info:    { bg: 'rgba(59, 130, 246, 0.1)',  border: '#3b82f6', titleColor: '#60a5fa' },
  success: { bg: 'rgba(34, 197, 94, 0.1)',   border: '#22c55e', titleColor: '#4ade80' },
  warning: { bg: 'rgba(245, 158, 11, 0.1)',  border: '#f59e0b', titleColor: '#fbbf24' },
  danger:  { bg: 'rgba(239, 68, 68, 0.1)',   border: '#ef4444', titleColor: '#f87171' },
}

function renderInline(text, isDark, keyPrefix) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((part, j) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${keyPrefix}-${j}`} style={{ color: isDark ? '#f3f4f6' : '#111827' }}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={`${keyPrefix}-${j}`} style={{
        background: isDark ? '#0f172a' : '#f3f4f6',
        color: isDark ? '#fbbf24' : '#b45309',
        padding: '0.1rem 0.35rem',
        borderRadius: '4px',
        fontFamily: 'Consolas, Monaco, monospace',
        fontSize: '0.85rem'
      }}>{part.slice(1, -1)}</code>
    }
    return <span key={`${keyPrefix}-${j}`}>{part}</span>
  })
}

function renderBlock(block, idx, isDark) {
  switch (block.type) {
    case 'heading':
      return (
        <h4 key={idx} style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: '#a78bfa',
          margin: '1.25rem 0 0.5rem',
          paddingBottom: '0.35rem',
          borderBottom: `1px solid ${isDark ? 'rgba(167, 139, 250, 0.25)' : 'rgba(139, 92, 246, 0.2)'}`
        }}>
          {block.text}
        </h4>
      )
    case 'text':
      return (
        <p key={idx} style={{
          margin: '0.5rem 0',
          color: isDark ? '#d1d5db' : '#374151',
          lineHeight: '1.7'
        }}>
          {renderInline(block.text, isDark, `t${idx}`)}
        </p>
      )
    case 'bullets':
      return (
        <ul key={idx} style={{
          margin: '0.5rem 0',
          paddingLeft: '1.25rem',
          color: isDark ? '#d1d5db' : '#374151',
          lineHeight: '1.8'
        }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.25rem' }}>
              {renderInline(item, isDark, `b${idx}-${i}`)}
            </li>
          ))}
        </ul>
      )
    case 'callout': {
      const tone = CALLOUT_TONES[block.tone] || CALLOUT_TONES.info
      return (
        <div key={idx} style={{
          margin: '1rem 0',
          padding: '0.85rem 1rem',
          background: tone.bg,
          border: `1px solid ${tone.border}`,
          borderLeft: `4px solid ${tone.border}`,
          borderRadius: '0.5rem'
        }}>
          {block.title && (
            <div style={{
              fontWeight: 700,
              color: tone.titleColor,
              marginBottom: '0.35rem',
              fontSize: '0.9rem'
            }}>
              {block.title}
            </div>
          )}
          <div style={{ color: isDark ? '#e5e7eb' : '#1f2937', lineHeight: '1.65', fontSize: '0.9rem' }}>
            {renderInline(block.text, isDark, `c${idx}`)}
          </div>
        </div>
      )
    }
    case 'code':
      return (
        <pre key={idx} style={{
          margin: '0.75rem 0',
          padding: '1rem',
          background: '#0f172a',
          color: '#e2e8f0',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          fontSize: '0.8rem',
          fontFamily: 'Consolas, Monaco, "Courier New", monospace',
          lineHeight: '1.5',
          overflow: 'auto',
          whiteSpace: 'pre'
        }}>
          <code>{block.code}</code>
        </pre>
      )
    case 'diagram': {
      const Diagram = INTERVIEW_DIAGRAMS[block.component]
      if (!Diagram) return null
      return (
        <div key={idx} style={{
          margin: '1rem 0',
          padding: '0.75rem',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '0.5rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Diagram />
        </div>
      )
    }
    default:
      return null
  }
}

function Practice({ onBack, onSelectItem, breadcrumb, initialCategory, onInitialCategoryUsed }) {
  const { isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all')
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [itemProgress, setItemProgress] = useState({})
  const [refreshKey, setRefreshKey] = useState(0)
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const interviewQuestions = [
    {
      id: 'q1',
      question: 'What is an API?',
      blocks: [
        { type: 'text', text: 'An **API (Application Programming Interface)** is a contract between two software components that defines how they communicate. It specifies the available operations, their inputs and outputs, authentication requirements, and error handling.' },
        { type: 'diagram', component: 'apiFlow' },
        { type: 'heading', text: 'Common Types' },
        { type: 'bullets', items: [
          '**REST** — HTTP-based, stateless, uses GET/POST/PUT/DELETE. Most common for web services.',
          '**GraphQL** — Single endpoint, client requests exactly the fields it needs.',
          '**gRPC** — Binary protocol over HTTP/2, uses Protocol Buffers. Fast, ideal for service-to-service.',
          '**SOAP** — XML-based, heavier, mostly legacy enterprise systems.'
        ]},
        { type: 'heading', text: 'Key Concepts' },
        { type: 'text', text: 'Endpoints, HTTP methods, status codes (`2xx`/`4xx`/`5xx`), request/response bodies (JSON/XML), authentication (API keys, OAuth, JWT), rate limiting, and versioning.' },
        { type: 'callout', tone: 'info', title: 'Example', text: 'A weather API exposes `GET /weather?city=NYC`. The client sends the request; the server responds with `{"temp": 72, "conditions": "sunny"}`. The contract guarantees that shape regardless of how the server is implemented internally.' }
      ]
    },
    {
      id: 'q2',
      question: 'Difference between SQL and NoSQL',
      blocks: [
        { type: 'diagram', component: 'sqlNoSql' },
        { type: 'heading', text: 'SQL (Relational)' },
        { type: 'bullets', items: [
          '**Schema:** Fixed, predefined columns and types',
          '**Data model:** Tables with rows and columns',
          '**Consistency:** ACID transactions (Atomicity, Consistency, Isolation, Durability)',
          '**Scaling:** Vertical — bigger machines',
          '**Joins:** Native, powerful — relationships across tables',
          '**Examples:** PostgreSQL, MySQL, Oracle, SQL Server'
        ]},
        { type: 'heading', text: 'NoSQL (Non-relational)' },
        { type: 'bullets', items: [
          '**Schema:** Flexible — documents can have different fields',
          '**Data model:** Document (MongoDB), key-value (Redis, DynamoDB), graph (Neo4j), columnar (Cassandra)',
          '**Consistency:** BASE (Basically Available, Soft state, Eventually consistent)',
          '**Scaling:** Horizontal — distributed across many nodes',
          '**Joins:** Limited — data usually denormalized',
          '**Examples:** MongoDB, Cassandra, Redis, DynamoDB'
        ]},
        { type: 'callout', tone: 'success', title: 'When to use SQL', text: 'Complex relationships, financial transactions, inventory — anywhere consistency is critical.' },
        { type: 'callout', tone: 'warning', title: 'When to use NoSQL', text: 'High write volume, flexible/evolving schema, real-time analytics, chat apps, IoT data, content management, horizontal scaling needs.' },
        { type: 'callout', tone: 'info', title: 'Pragmatic answer', text: 'Most modern systems use both — SQL for the source of truth, NoSQL for cache/search/sessions.' }
      ]
    },
    {
      id: 'q3',
      question: 'What happens in a complete request/response cycle?',
      blocks: [
        { type: 'text', text: 'When a user navigates to `https://api.example.com/users`:' },
        { type: 'diagram', component: 'requestResponse' },
        { type: 'heading', text: '1. DNS Lookup' },
        { type: 'text', text: 'Browser checks cache, then asks recursive DNS resolver → returns IP address.' },
        { type: 'heading', text: '2. TCP Handshake' },
        { type: 'text', text: '3-way handshake (SYN → SYN-ACK → ACK) establishes connection on port 443.' },
        { type: 'heading', text: '3. TLS Handshake' },
        { type: 'text', text: 'Client and server negotiate cipher, exchange certificates, derive session keys (HTTPS only).' },
        { type: 'heading', text: '4. HTTP Request' },
        { type: 'code', language: 'http', code: 'GET /users HTTP/1.1\nHost: api.example.com\nAccept: application/json\nAuthorization: Bearer eyJhbGc...' },
        { type: 'heading', text: '5. Server-side Processing' },
        { type: 'bullets', items: [
          'Load balancer routes request to a backend instance',
          'Web server (nginx) forwards to app server',
          'Auth middleware validates the JWT',
          'Controller handles the route',
          'ORM issues SQL: `SELECT * FROM users`',
          'Database returns rows',
          'Response serialized to JSON'
        ]},
        { type: 'heading', text: '6. HTTP Response' },
        { type: 'code', language: 'http', code: 'HTTP/1.1 200 OK\nContent-Type: application/json\nCache-Control: max-age=60\n\n[{"id": 1, "name": "Alice"}, ...]' },
        { type: 'heading', text: '7. Client Processing' },
        { type: 'text', text: 'Browser parses response, fires JS callbacks, requests linked resources (CSS/JS/images), executes scripts, renders DOM.' },
        { type: 'heading', text: '8. Connection' },
        { type: 'text', text: 'Kept alive (HTTP/1.1 keep-alive) or multiplexed (HTTP/2) for subsequent requests.' },
        { type: 'callout', tone: 'danger', title: 'Where it can fail', text: 'DNS timeout, TCP reset, TLS cert expired, 4xx auth issue, 5xx server crash, slow DB query, network packet loss.' }
      ]
    },
    {
      id: 'q4',
      question: 'Create a file uploader',
      blocks: [
        { type: 'diagram', component: 'fileUploader' },
        { type: 'heading', text: 'Front-end (React)' },
        { type: 'code', language: 'jsx', code: `function FileUploader() {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleUpload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress((e.loaded / e.total) * 100)
      }
    }
    xhr.onload = () => {
      const { url } = JSON.parse(xhr.responseText)
      console.log('Uploaded:', url)
    }
    xhr.open('POST', '/api/upload')
    xhr.send(formData)
  }

  return (
    <>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <progress value={progress} max="100" />}
    </>
  )
}` },
        { type: 'heading', text: 'Back-end (Node + Express + multer)' },
        { type: 'code', language: 'js', code: `const multer = require('multer')

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf/
    cb(null, allowed.test(file.mimetype))
  }
})

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ url: \`/uploads/\${req.file.filename}\` })
})` },
        { type: 'heading', text: 'Production Considerations' },
        { type: 'bullets', items: [
          '**Chunked uploads** — split large files; resumable on failure',
          '**Pre-signed S3 URLs** — client uploads directly to S3, avoiding proxy through your server',
          '**Validation** — check magic bytes, not just MIME type (clients lie)',
          '**Virus scanning** — ClamAV or cloud service before serving',
          '**Deduplication** — hash content to avoid storing duplicates',
          '**Progress + retry** — UX matters for slow connections',
          '**CDN for serving** — CloudFront/Fastly in front of S3',
          '**Rate limiting & auth** — prevent abuse'
        ]},
        { type: 'callout', tone: 'info', title: 'Common pitfall', text: 'Never trust the client-supplied filename or content-type. Generate a random server-side ID and detect type from magic bytes (e.g. via `file-type` package).' }
      ]
    },
    {
      id: 'q5',
      question: 'What happens when you type a URL and press Enter?',
      blocks: [
        { type: 'text', text: 'A classic interview question — the network phase overlaps with the request/response cycle, but interviewers usually want the **full journey through to pixels on screen**, including DOM construction, layout, and paint.' },
        { type: 'diagram', component: 'urlToRender' },
        { type: 'heading', text: '1. URL Parsing & Browser Setup' },
        { type: 'text', text: 'Browser parses the URL into protocol (`https`), host (`example.com`), port, path, and query. It checks HSTS preload list (forces HTTPS), determines if the URL is in browser cache, and may use a service worker to intercept the request.' },
        { type: 'heading', text: '2. DNS Resolution' },
        { type: 'text', text: 'Browser cache → OS cache → router cache → ISP recursive resolver → root → TLD → authoritative nameserver. Returns IP address (cached per the TTL).' },
        { type: 'heading', text: '3. TCP + TLS Handshake' },
        { type: 'text', text: 'TCP 3-way handshake (SYN/SYN-ACK/ACK), then TLS handshake exchanges certificates and derives session keys. HTTP/3 uses QUIC over UDP and combines these into one round-trip.' },
        { type: 'heading', text: '4. HTTP Request Sent' },
        { type: 'code', language: 'http', code: 'GET / HTTP/1.1\nHost: example.com\nUser-Agent: Mozilla/5.0...\nAccept: text/html,application/xhtml+xml\nAccept-Encoding: gzip, br\nCookie: session=abc123' },
        { type: 'heading', text: '5. Server Processing' },
        { type: 'text', text: 'Load balancer → web server → app server → auth → controller → DB → response serialization (HTML or JSON).' },
        { type: 'heading', text: '6. HTTP Response Received' },
        { type: 'text', text: 'Browser receives status code, headers (`Content-Type`, `Cache-Control`, `Set-Cookie`), and body. Compressed bodies (gzip/brotli) are decompressed.' },
        { type: 'heading', text: '7. HTML Parsing → DOM' },
        { type: 'text', text: 'Browser tokenizes HTML and builds the **DOM tree** — a hierarchical representation of the document. Parsing is incremental: as bytes arrive, nodes get created.' },
        { type: 'heading', text: '8. CSS Parsing → CSSOM' },
        { type: 'text', text: 'Stylesheets are fetched (parser-blocking for `<link rel="stylesheet">` in `<head>`) and parsed into the **CSSOM** — a tree of style rules.' },
        { type: 'heading', text: '9. JavaScript Execution' },
        { type: 'text', text: 'Synchronous `<script>` tags **block HTML parsing**. Use `defer` (run after parse, in order) or `async` (run as soon as fetched). JS can mutate the DOM, triggering re-layout.' },
        { type: 'heading', text: '10. Render Tree → Layout → Paint → Composite' },
        { type: 'bullets', items: [
          '**Render tree** — DOM + CSSOM combined, excluding hidden nodes (`display: none`)',
          '**Layout (reflow)** — calculates geometry: position, size of every visible element',
          '**Paint** — fills pixels for text, colors, borders, shadows into layers',
          '**Composite** — GPU stitches layers together, transforms (`translate3d`, opacity) skip layout/paint',
        ]},
        { type: 'heading', text: '11. Subsequent Resources' },
        { type: 'text', text: 'Browser fetches images, fonts, additional scripts. Connection is reused (HTTP/1.1 keep-alive) or multiplexed (HTTP/2/3). Async/deferred scripts run, lazy-loaded images fetch on scroll.' },
        { type: 'callout', tone: 'success', title: 'Key performance metrics', text: '**FCP** (First Contentful Paint) — first text/image rendered. **LCP** (Largest Contentful Paint) — main content visible. **TTI** (Time to Interactive) — page responds to input. **CLS** (Cumulative Layout Shift) — visual stability.' },
        { type: 'callout', tone: 'warning', title: 'Critical Rendering Path optimization', text: 'Minimize render-blocking resources: inline critical CSS, defer non-critical JS, preload key fonts, use `<link rel="preconnect">` for third-party origins, and reduce DOM depth.' },
        { type: 'callout', tone: 'info', title: 'Pro tip', text: 'Senior interviewers often probe specific layers: "What if DNS is slow?" → DNS prefetch. "What if JS blocks?" → defer/async. "Why is the page janky?" → forced synchronous layout (layout thrashing). Knowing these tradeoffs is what separates junior from senior answers.' }
      ]
    },
    {
      id: 'q6',
      question: 'Class Loaders in Java',
      blocks: [
        { type: 'text', text: 'A **ClassLoader** is a JVM component that loads `.class` bytecode into memory at runtime. Java uses a hierarchy with **parent delegation** — a child loader always asks its parent first before loading itself.' },
        { type: 'diagram', component: 'classLoader' },
        { type: 'heading', text: 'The Three Built-in Loaders' },
        { type: 'bullets', items: [
          '**Bootstrap ClassLoader** — written in native code (C/C++); loads core JDK (`java.lang.*`, `java.util.*`). Has no parent; `getClassLoader()` returns `null`.',
          '**Platform ClassLoader** (was Extension before Java 9) — loads platform modules and `javax.*` extensions.',
          '**Application/System ClassLoader** — loads classes from `CLASSPATH` / `-cp` — your application code.',
        ]},
        { type: 'heading', text: 'Loading Phases' },
        { type: 'bullets', items: [
          '**Loading** — read `.class` bytes into the method area',
          '**Linking** — verify bytecode, prepare static fields, resolve symbolic references',
          '**Initialization** — run `<clinit>` (static initializers, static field assignments)',
        ]},
        { type: 'heading', text: 'Custom ClassLoader Example' },
        { type: 'code', language: 'java', code: `public class MyClassLoader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] bytes = loadBytecode(name);  // e.g. from disk, network, encrypted
        return defineClass(name, bytes, 0, bytes.length);
    }
}

// Use it
ClassLoader loader = new MyClassLoader();
Class<?> cls = loader.loadClass("com.example.Plugin");
Object instance = cls.getDeclaredConstructor().newInstance();` },
        { type: 'callout', tone: 'success', title: 'Why parent delegation matters', text: 'Prevents your code from overriding core classes — if you create `java.lang.String` in your jar, the bootstrap loader still wins. This is a security guarantee.' },
        { type: 'callout', tone: 'info', title: 'Real-world uses', text: 'Tomcat isolates each web app with its own loader. OSGi enables hot-swap modules. Plugin systems load JARs at runtime. Hot-reload tools (JRebel, Spring DevTools) replace classes.' }
      ]
    },
    {
      id: 'q7',
      question: 'Garbage Collection — Mark & Sweep',
      blocks: [
        { type: 'text', text: '**Mark & Sweep** is the foundational GC algorithm. It identifies live objects (mark) then frees the rest (sweep). Modern JVM collectors (G1, ZGC, Shenandoah) are sophisticated descendants.' },
        { type: 'diagram', component: 'markAndSweep' },
        { type: 'heading', text: 'Phase 1: Mark' },
        { type: 'text', text: 'Starting from **GC Roots** (active threads\' stacks, static fields, JNI references, etc.), the GC traces all reachable references and marks each visited object as "live."' },
        { type: 'heading', text: 'Phase 2: Sweep' },
        { type: 'text', text: 'Walk the heap; any object **not marked** is garbage and its memory is reclaimed. Result: free space exists but is fragmented.' },
        { type: 'heading', text: 'Phase 3: Compact (optional)' },
        { type: 'text', text: 'Move live objects together to eliminate fragmentation, leaving one contiguous free region. Faster allocation but expensive — moves all live data.' },
        { type: 'heading', text: 'Tradeoffs' },
        { type: 'bullets', items: [
          '✅ **Handles cycles** — reachability-based, unlike reference counting',
          '✅ Conceptually simple, well-understood',
          '⚠️ **Stop-the-world** during mark/sweep (modern GCs reduce this with concurrent/incremental phases)',
          '⚠️ Without compaction, **fragmentation** grows over time',
        ]},
        { type: 'callout', tone: 'success', title: 'How modern GCs evolve this', text: '**Generational** (young/old gens with different strategies), **Incremental** (mark in chunks), **Concurrent** (mark while app runs — G1, CMS), **Region-based** (G1, ZGC slice heap into regions for parallel work).' },
        { type: 'callout', tone: 'warning', title: 'GC Roots include', text: 'Local variables in active stack frames, static fields, active threads, JNI references, synchronized monitors. An object is reachable iff there\'s a chain of references from a root.' }
      ]
    },
    {
      id: 'q8',
      question: '`this` and `super` keywords',
      blocks: [
        { type: 'heading', text: '`this`' },
        { type: 'text', text: 'Reference to the **current object** — the instance the method was called on. Used to disambiguate between fields and parameters with the same name, or to call another constructor in the same class.' },
        { type: 'code', language: 'java', code: `public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;          // this.name (field) vs name (param)
        this.age = age;
    }

    public User(String name) {
        this(name, 0);             // call other constructor — must be FIRST line
    }

    public User self() {
        return this;                // return current instance (chaining)
    }
}` },
        { type: 'heading', text: '`super`' },
        { type: 'text', text: 'Reference to the **parent class**. Used to call the parent constructor (must be first line of child constructor — implicit `super()` if omitted) or invoke a parent method that you\'ve overridden.' },
        { type: 'code', language: 'java', code: `public class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    public void speak() { System.out.println("..."); }
}

public class Dog extends Animal {
    public Dog(String name) {
        super(name);                  // call parent constructor — must be FIRST
    }

    @Override
    public void speak() {
        super.speak();                // call parent's speak()
        System.out.println("Woof!");
    }
}` },
        { type: 'callout', tone: 'warning', title: 'Compile error pitfalls', text: '`this(...)` and `super(...)` must each be the **first statement** in a constructor. You can\'t use both. You can\'t use `this` or `super` in static methods (no instance).' },
        { type: 'callout', tone: 'info', title: 'Implicit `super()`', text: 'If you don\'t write `super(...)`, the compiler inserts `super()` (no-arg). If the parent has no no-arg constructor, you **must** call `super(args)` explicitly.' }
      ]
    },
    {
      id: 'q9',
      question: '`static` keyword',
      blocks: [
        { type: 'text', text: '`static` means "belongs to the **class**, not the instance." One copy exists, shared by all instances. Accessed via class name, not via an object.' },
        { type: 'heading', text: 'Static Fields' },
        { type: 'code', language: 'java', code: `public class Counter {
    private static int totalCount = 0;     // shared by all instances
    private int instanceId;

    public Counter() {
        instanceId = ++totalCount;
    }

    public static int getTotal() {
        return totalCount;                  // can only access static members
    }
}

Counter a = new Counter();   // totalCount = 1
Counter b = new Counter();   // totalCount = 2
Counter.getTotal();          // 2 — accessed via class, not instance` },
        { type: 'heading', text: 'Where `static` Applies' },
        { type: 'bullets', items: [
          '**Static fields** — class-level state (constants, counters, caches)',
          '**Static methods** — utility/helper functions; no `this` reference (e.g. `Math.sqrt`)',
          '**Static blocks** — run once when the class is loaded (covered separately)',
          '**Static nested classes** — don\'t hold reference to outer instance (unlike inner classes)',
          '**Static imports** — `import static java.lang.Math.*;` lets you write `sqrt(2)` without `Math.`',
        ]},
        { type: 'heading', text: 'Common Pattern: Constants' },
        { type: 'code', language: 'java', code: `public class HttpStatus {
    public static final int OK = 200;
    public static final int NOT_FOUND = 404;
    public static final int SERVER_ERROR = 500;
}

// usage
if (response.code == HttpStatus.OK) { ... }` },
        { type: 'callout', tone: 'warning', title: 'Cannot do this', text: 'Static methods cannot access instance fields/methods directly (no `this`). Static methods cannot be overridden — only **hidden** (resolved by reference type, not runtime type).' },
        { type: 'callout', tone: 'danger', title: 'Static + multithreading', text: 'Static fields are shared across threads. Mutating them without synchronization causes race conditions. Common cause of memory leaks: static collections that grow indefinitely.' }
      ]
    },
    {
      id: 'q10',
      question: 'Ways to create an object in Java',
      blocks: [
        { type: 'text', text: 'There are **5 main ways** to instantiate an object in Java. The most common is `new`, but interviews often expect you to know the others.' },
        { type: 'heading', text: '1. `new` keyword' },
        { type: 'code', language: 'java', code: 'User u = new User("Alice", 30);   // 99% of cases' },
        { type: 'heading', text: '2. Reflection — `Class.newInstance()` / `Constructor.newInstance()`' },
        { type: 'code', language: 'java', code: `// Java 9+ preferred way
Class<?> cls = Class.forName("com.example.User");
Constructor<?> ctor = cls.getDeclaredConstructor(String.class, int.class);
User u = (User) ctor.newInstance("Alice", 30);

// Used by frameworks: Spring DI, Hibernate, Jackson` },
        { type: 'heading', text: '3. `clone()` — copy an existing object' },
        { type: 'code', language: 'java', code: `public class User implements Cloneable {
    String name;

    @Override
    public User clone() throws CloneNotSupportedException {
        return (User) super.clone();   // shallow copy by default
    }
}

User a = new User("Alice");
User b = a.clone();   // separate object, same field values` },
        { type: 'heading', text: '4. Deserialization — `ObjectInputStream`' },
        { type: 'code', language: 'java', code: `// Object created from a byte stream — does NOT call constructor
try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("user.ser"))) {
    User u = (User) in.readObject();
}` },
        { type: 'heading', text: '5. Factory methods (not technically a separate way, but common in interviews)' },
        { type: 'code', language: 'java', code: `User u = User.of("Alice", 30);          // static factory
List<Integer> list = List.of(1, 2, 3);   // List interface factory
LocalDate today = LocalDate.now();        // factory in JDK` },
        { type: 'callout', tone: 'warning', title: 'Shallow vs deep clone', text: 'Default `clone()` is **shallow** — nested object references are shared between original and clone. For deep copy, override `clone()` to recursively clone fields, or use serialization, or copy constructors.' },
        { type: 'callout', tone: 'info', title: 'Best practice', text: 'Joshua Bloch (Effective Java) recommends **avoiding `clone()`** — it\'s broken by design. Prefer **copy constructors** (`new User(otherUser)`) or **static factory methods** (`User.copyOf(other)`).' }
      ]
    },
    {
      id: 'q11',
      question: 'Private constructor',
      blocks: [
        { type: 'text', text: 'A **private constructor** prevents instantiation from outside the class. It enables several important design patterns.' },
        { type: 'heading', text: '1. Singleton Pattern' },
        { type: 'code', language: 'java', code: `public class Database {
    private static final Database INSTANCE = new Database();

    private Database() { }   // can't be called from outside

    public static Database getInstance() {
        return INSTANCE;
    }
}

Database db = Database.getInstance();   // ✓
Database db = new Database();            // ✗ compile error` },
        { type: 'heading', text: '2. Utility/Helper Class' },
        { type: 'code', language: 'java', code: `public final class StringUtils {
    private StringUtils() {
        throw new AssertionError("No instances!");   // defends against reflection
    }

    public static boolean isEmpty(String s) { return s == null || s.isEmpty(); }
}

// All members are static; instantiation makes no sense (e.g. Math, Collections)` },
        { type: 'heading', text: '3. Static Factory Methods' },
        { type: 'code', language: 'java', code: `public class User {
    private final String name;

    private User(String name) { this.name = name; }

    public static User named(String name) {
        return new User(name);
    }

    public static User anonymous() {
        return new User("Anonymous");
    }
}

User u = User.named("Alice");        // more readable than constructor
User a = User.anonymous();` },
        { type: 'heading', text: '4. Builder Pattern' },
        { type: 'code', language: 'java', code: `public class Pizza {
    private Pizza(Builder b) { ... }   // private — only Builder calls this

    public static class Builder {
        public Pizza build() { return new Pizza(this); }
    }
}` },
        { type: 'callout', tone: 'success', title: 'Benefits', text: 'Forces a controlled API entry point, allows naming creation methods (`User.named()` vs constructor), can return cached/subtype instances, supports immutability, prevents subclassing.' },
        { type: 'callout', tone: 'warning', title: 'Subclassing implication', text: 'A class with **only private constructors cannot be subclassed** — child classes can\'t call any constructor. This effectively makes the class final without the `final` keyword.' }
      ]
    },
    {
      id: 'q12',
      question: 'Static initializer block',
      blocks: [
        { type: 'text', text: 'A **static initializer block** runs **once** when the class is loaded — before any constructors, before `main()`. Used for complex static field initialization.' },
        { type: 'heading', text: 'Syntax & Order' },
        { type: 'code', language: 'java', code: `public class Config {
    static int maxConnections;
    static Map<String, String> settings;

    // Static initializer block
    static {
        System.out.println("Class loaded — running static block");
        maxConnections = readFromEnv("MAX_CONNECTIONS", 10);
        settings = new HashMap<>();
        settings.put("env", System.getenv("ENV"));
    }

    static {
        // Multiple blocks allowed — execute in order they appear
        settings.put("version", "1.0");
    }
}` },
        { type: 'heading', text: 'Initialization Order' },
        { type: 'bullets', items: [
          '**1.** Static fields and static blocks (in source order) — runs **once**, on class load',
          '**2.** Instance fields and instance initializer blocks — runs **for each `new`**',
          '**3.** Constructor body',
        ]},
        { type: 'code', language: 'java', code: `public class Order {
    static int counter;
    int id;

    static { counter = 0; System.out.println("static block"); }
    {        id = ++counter; System.out.println("instance block: " + id); }

    public Order() { System.out.println("constructor: " + id); }
}

new Order();   // prints: static block (once), instance block: 1, constructor: 1
new Order();   // prints: instance block: 2, constructor: 2 (no static again)` },
        { type: 'heading', text: 'When to Use' },
        { type: 'bullets', items: [
          'Loading native libraries: `static { System.loadLibrary("nativeLib"); }`',
          'Reading config files at class-load time',
          'Building immutable collections from a method call',
          'Initialization that requires exception handling (you can\'t do `try/catch` in a field declaration)',
        ]},
        { type: 'callout', tone: 'danger', title: 'Pitfall: exceptions', text: 'If a static block throws an unchecked exception, the class fails to load and you get an `ExceptionInInitializerError`. The class becomes unusable for the rest of the JVM lifetime.' },
        { type: 'callout', tone: 'info', title: 'Compared to constructors', text: 'Constructors run per-instance; static blocks run once per class. A class with no instances ever created still runs its static block when first referenced.' }
      ]
    },
    {
      id: 'q13',
      question: 'JVM vs JDK vs JRE',
      blocks: [
        { type: 'diagram', component: 'jvmJdkJre' },
        { type: 'heading', text: 'JVM — Java Virtual Machine' },
        { type: 'text', text: 'The **runtime engine** that executes Java bytecode. Platform-specific (Windows JVM ≠ macOS JVM) but runs the same `.class` files. Contains: ClassLoader, Memory areas (heap/stack/method area/PC registers/native method stack), Execution Engine (interpreter + JIT), Garbage Collector.' },
        { type: 'heading', text: 'JRE — Java Runtime Environment' },
        { type: 'text', text: '**JRE = JVM + class libraries** (`java.lang.*`, `java.util.*`, etc.). What an end-user installs to **run** Java apps. Cannot compile code.' },
        { type: 'heading', text: 'JDK — Java Development Kit' },
        { type: 'text', text: '**JDK = JRE + development tools** — `javac` (compiler), `javadoc`, `jdb` (debugger), `jar`, `jlink`, `jpackage`. What a developer installs to **build** Java apps.' },
        { type: 'heading', text: 'Quick Comparison' },
        { type: 'bullets', items: [
          '**JVM** — runs bytecode (the engine)',
          '**JRE** — runs Java apps (engine + libraries)',
          '**JDK** — builds Java apps (engine + libraries + dev tools)',
        ]},
        { type: 'callout', tone: 'info', title: 'Java 9+ change', text: 'Oracle stopped distributing JRE separately starting Java 11. Use `jlink` to build a custom runtime image with only the modules your app needs — much smaller than full JRE.' },
        { type: 'callout', tone: 'success', title: 'Why "write once, run anywhere"', text: '`javac` produces platform-independent **bytecode** (`.class`). The JVM is platform-specific and translates bytecode → native machine code at runtime via the JIT compiler. The bytecode runs unchanged on any JVM.' }
      ]
    },
    {
      id: 'q14',
      question: 'Running `main` without `public` modifier',
      blocks: [
        { type: 'text', text: 'The signature `public static void main(String[] args)` is the **conventional** entry point — but the rules are subtler than they appear.' },
        { type: 'heading', text: 'What happens if you drop `public`?' },
        { type: 'code', language: 'java', code: `class Test {
    static void main(String[] args) {        // no 'public'
        System.out.println("Hello");
    }
}` },
        { type: 'text', text: '**Java 8–20 (traditional):** Throws `Error: Main method not found in class Test` — the JVM specifically requires `public`.' },
        { type: 'text', text: '**Java 21+ (preview, JEP 445):** Works! "Unnamed classes and instance main methods" lets you drop `public`, drop `static`, drop the class declaration entirely, and even drop `String[] args`.' },
        { type: 'heading', text: 'Java 21+ Simplified Entry Points' },
        { type: 'code', language: 'java', code: `// Hello.java — no class needed!
void main() {
    System.out.println("Hello, world!");
}

// Run with: java --enable-preview --source 21 Hello.java` },
        { type: 'heading', text: 'Why `public` is required (pre-21)' },
        { type: 'bullets', items: [
          'JVM looks up `main` from outside the class — `public` makes it accessible from any package',
          '`static` lets it run without instantiating the class',
          '`void` because exit codes are set via `System.exit()` not return value',
          '`String[] args` to receive command-line arguments',
        ]},
        { type: 'callout', tone: 'warning', title: 'Common interview trick', text: 'Asking "can `main` be `private`?" or "can it return `int`?" — the answer for the JVM\'s primary entry point is **no** (pre-Java 21). The class loads but execution fails.' }
      ]
    },
    {
      id: 'q15',
      question: 'Running a class without `main()`',
      blocks: [
        { type: 'text', text: 'Pre-Java 7: yes, you could "run" code without a `main` method — using a **static initializer block** that exits before the JVM checks for `main`.' },
        { type: 'heading', text: 'The Classic Trick (Java 6 and earlier)' },
        { type: 'code', language: 'java', code: `public class NoMain {
    static {
        System.out.println("Hello without main!");
        System.exit(0);   // exit before JVM looks up main()
    }
}

// java NoMain
// Output (Java 6): "Hello without main!"
// Output (Java 7+): "Hello without main!" then Error: Main method not found` },
        { type: 'heading', text: 'Why It Doesn\'t Work in Java 7+' },
        { type: 'text', text: 'Starting Java 7, the JVM **checks for `main` BEFORE class initialization**. So even `System.exit(0)` in a static block can\'t prevent the "main method not found" error.' },
        { type: 'heading', text: 'Other Ways to Run Code Without `main`' },
        { type: 'bullets', items: [
          '**Library classes** — never have `main`; loaded by other apps',
          '**Servlets** — entry points are `doGet`/`doPost`, not `main`',
          '**Spring Boot** — `main` exists but is mostly `SpringApplication.run(App.class)`',
          '**JUnit tests** — runner provides entry; tests don\'t need `main`',
          '**Lambdas in scripts** — Java 11+ `java HelloWorld.java` runs a single source file (still needs `main`)',
        ]},
        { type: 'callout', tone: 'info', title: 'Java 21 change', text: 'JEP 445 (preview) introduced "instance main methods" — a class can have just `void main()` (no static, no public, no args). Truly no traditional `main` needed.' }
      ]
    },
    {
      id: 'q16',
      question: 'Explain `System.out.println()`',
      blocks: [
        { type: 'text', text: 'Each component is doing something specific. Senior interviewers love this question because it tests how deeply you understand Java\'s standard library.' },
        { type: 'heading', text: 'Breaking It Down' },
        { type: 'bullets', items: [
          '**`System`** — final class in `java.lang` package; provides access to standard streams, env, properties, time',
          '**`out`** — `public static final PrintStream` field of `System` — the standard output stream',
          '**`println`** — instance method on `PrintStream`; prints arg + newline, flushes if autoFlush is true',
        ]},
        { type: 'heading', text: 'Source Glimpse' },
        { type: 'code', language: 'java', code: `public final class System {
    public static final PrintStream out;   // initialized by JVM at startup
    public static final PrintStream err;
    public static final InputStream in;

    // ...
}

public class PrintStream extends FilterOutputStream {
    public void println(String x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }
}` },
        { type: 'heading', text: 'Why `out` is `static`' },
        { type: 'text', text: 'You access it without instantiating `System` — `System.out` (not `new System().out`). It\'s tied to the class, not an instance.' },
        { type: 'heading', text: 'Redirecting Output' },
        { type: 'code', language: 'java', code: `// Yes, you CAN reassign System.out (despite 'final')!
PrintStream original = System.out;
System.setOut(new PrintStream(new FileOutputStream("log.txt")));
System.out.println("Goes to log file");
System.setOut(original);   // restore` },
        { type: 'callout', tone: 'warning', title: 'Performance pitfall', text: '`println` is **synchronized** on the PrintStream — concurrent threads serialize through it. In hot paths, this is a bottleneck. Use a logger (Log4j/SLF4J) for production logging.' },
        { type: 'callout', tone: 'success', title: 'Modern alternatives', text: 'For formatted output: `System.out.printf("%d items%n", n)` or `String.format(...)`. For logging: `logger.info(...)` (lazy formatting, log levels, async appenders, structured output).' },
        { type: 'callout', tone: 'info', title: 'How is `final` reassignable?', text: '`System.setOut()` uses a native method to bypass the `final` modifier. It\'s a special hatch for redirecting standard streams — not something normal code can do.' }
      ]
    },
    {
      id: 'q17',
      question: 'Memory: Heap (objects) vs Stack (methods)',
      blocks: [
        { type: 'text', text: 'JVM memory is split into two main regions: **stack** (per-thread, method calls) and **heap** (shared, all objects). Understanding the distinction is essential for debugging memory issues.' },
        { type: 'diagram', component: 'heapStack' },
        { type: 'heading', text: 'Stack' },
        { type: 'bullets', items: [
          '**Per thread** — every thread has its own stack',
          '**LIFO frames** — one frame per method call; pushed on entry, popped on return',
          '**Stores:** local primitives, **references** (not the object), parameters, return address',
          '**Size:** typically 512 KB – 1 MB; configurable with `-Xss`',
          '**Errors:** `StackOverflowError` — too-deep recursion or huge frames',
          '**Speed:** very fast (no allocator, just pointer bump)',
        ]},
        { type: 'heading', text: 'Heap' },
        { type: 'bullets', items: [
          '**Shared** — all threads see the same heap',
          '**All objects + arrays + class metadata** live here',
          '**Generational** structure: Young Gen (Eden + 2 Survivor spaces) → Old Gen (tenured) + Metaspace (class metadata, off-heap since Java 8)',
          '**GC managed** — automatic memory reclamation',
          '**Size:** typically much larger; `-Xms` (initial), `-Xmx` (max)',
          '**Errors:** `OutOfMemoryError: Java heap space`',
        ]},
        { type: 'heading', text: 'Concrete Example' },
        { type: 'code', language: 'java', code: `void process() {                       // new stack frame
    int count = 5;                     // primitive — on STACK
    User user = new User("Alice");     // 'user' (reference) on STACK
                                        // User OBJECT on HEAP
    String name = user.getName();      // 'name' (reference) on STACK
                                        // String "Alice" on HEAP (string pool)
    helper(user);                       // pushes new frame, passes reference
}                                       // frame popped; references gone;
                                        // GC may collect heap objects later` },
        { type: 'heading', text: 'Pass-By-Value Subtlety' },
        { type: 'text', text: 'Java is **always pass-by-value**. For objects, the **reference** (a memory address) is passed by value. The method gets a copy of the reference pointing to the same heap object — so it can mutate the object\'s fields, but reassigning the parameter has no effect outside.' },
        { type: 'callout', tone: 'success', title: 'Why this matters', text: 'Memory leaks live on the **heap** — objects you forget to release (static collections, listeners not unregistered, ThreadLocal not cleaned up). Stack overflows live on the **stack** — usually unbounded recursion.' },
        { type: 'callout', tone: 'warning', title: 'Beyond stack/heap', text: 'JVM also has: **PC Register** (per thread, current bytecode address), **Native Method Stack** (for JNI calls), **Method Area / Metaspace** (class metadata, static fields, constant pool — off-heap since Java 8).' }
      ]
    }
  ]

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory)
      onInitialCategoryUsed?.()
    }
  }, [initialCategory])

  // Map of subcategory items to their problem counts
  const problemCounts = {
    // Data Structures
    'Arrays': 21,
    'Strings': 11,
    'Linked Lists': 12,
    'Stacks': 8,
    'Queues': 4,
    'Hash Tables': 11,
    'Trees': 6,
    'Binary Trees': 17,
    'Binary Search Trees': 3,
    'Heaps': 6,
    'Graphs': 9,
    'Trie': 5,
    // Algorithms
    'Searching': 2,
    'Binary Search': 5,
    'Sorting': 4,
    'Recursion': 8,
    'Dynamic Programming': 17,
    'Dynamic Programming Patterns': 89,
    'Sliding Window': 9,
    'Backtracking': 11,
    'Intervals': 7,
    'Math & Geometry': 9,
    'Advanced Graphs': 5,
    'Greedy Algorithms': 4,
    'Famous Algorithms': 3,
    'Union Find': 4,
    'Two Pointers': 5,
    'Bit Manipulation': 7,
    'Data Structures': 1,
    // Java Features
    'Streams': 0,
    'Streams Advanced': 0,
    'Lambdas': 4,
    'Lambdas Advanced': 0,
    'Functional Interfaces': 4,
    'Collections Framework': 0,
    'Optional': 0,
    // Concurrency
    'Concurrency': 0,
    'Multithreading': 0,
    // Core Java Fundamentals
    'Object-Oriented Programming': 0,
    'Exception Handling': 0,
    'File I/O': 6,
    'JVM Internals': 5,
    'Memory Management': 4,
    'Generics': 4,
    // System Design
    'Design Patterns Practice': 4,
    'LRU Cache': 4,
    'Rate Limiter': 4,
    'Design Problems': 5,
    'File Uploader': 4,
    'Spring Batch Process': 8,
    // Python Operations
    'Set Operations': 8,
    'Map Operations': 10
  }

  // Calculate completion progress for each item
  useEffect(() => {
    const progress = {}

    Object.keys(problemCounts).forEach(itemName => {
      const totalCount = problemCounts[itemName]
      let completedCount = 0

      // Check each problem in this category
      // Problem IDs are stored as "CategoryName-1", "CategoryName-2", etc.
      for (let i = 1; i <= totalCount; i++) {
        const problemId = `${itemName}-${i}`
        if (isProblemCompleted(problemId)) {
          completedCount++
        }
      }

      progress[itemName] = {
        completed: completedCount,
        total: totalCount,
        percentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
      }
    })

    setItemProgress(progress)
  }, [refreshKey])

  // Calculate overall category progress
  const getCategoryProgress = (subcategory) => {
    let totalCompleted = 0
    let totalProblems = 0

    subcategory.items.forEach(item => {
      if (itemProgress[item]) {
        totalCompleted += itemProgress[item].completed
        totalProblems += itemProgress[item].total
      }
    })

    return {
      completed: totalCompleted,
      total: totalProblems,
      percentage: totalProblems > 0 ? Math.round((totalCompleted / totalProblems) * 100) : 0
    }
  }

  // Listen for progress updates
  useEffect(() => {
    const handleProgressUpdate = () => {
      setRefreshKey(prev => prev + 1)
    }
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  // Organized into logical groups
  const categoryGroups = [
    {
      title: 'Core Fundamentals',
      icon: '📚',
      color: '#3b82f6',
      categories: [
        {
          id: 'Data Structures',
          name: 'Data Structures',
          icon: '📊',
          color: '#3b82f6',
          count: 113,
          items: ['Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 'Hash Tables', 'Trees', 'Binary Trees', 'Binary Search Trees', 'Heaps', 'Graphs', 'Trie']
        },
        {
          id: 'Algorithms',
          name: 'Algorithms',
          icon: '🎯',
          color: '#8b5cf6',
          count: 195,
          items: ['Searching', 'Binary Search', 'Sorting', 'Recursion', 'Dynamic Programming', 'Dynamic Programming Patterns', 'Sliding Window', 'Backtracking', 'Intervals', 'Math & Geometry', 'Advanced Graphs', 'Greedy Algorithms', 'Famous Algorithms', 'Union Find', 'Trie', 'Two Pointers', 'Bit Manipulation', 'Data Structures']
        }
      ]
    },
    {
      title: 'Programming Languages',
      icon: '💻',
      color: '#f59e0b',
      categories: [
        {
          id: 'Java Features',
          name: 'Java Features',
          icon: '☕',
          color: '#f59e0b',
          count: 8,
          items: ['Streams', 'Streams Advanced', 'Lambdas', 'Lambdas Advanced', 'Functional Interfaces', 'Collections Framework', 'Optional']
        },
        {
          id: 'Core Java Fundamentals',
          name: 'Core Java Fundamentals',
          icon: '⚙️',
          color: '#6366f1',
          count: 19,
          items: ['Object-Oriented Programming', 'Exception Handling', 'File I/O', 'JVM Internals', 'Memory Management', 'Generics']
        },
        {
          id: 'Concurrency',
          name: 'Concurrency',
          icon: '🔀',
          color: '#10b981',
          count: 0,
          items: ['Concurrency', 'Multithreading']
        },
        {
          id: 'Python Operations',
          name: 'Python Operations',
          icon: '🐍',
          color: '#3776ab',
          count: 18,
          items: ['Set Operations', 'Map Operations']
        }
      ]
    },
    {
      title: 'System Design',
      icon: '🛠️',
      color: '#ec4899',
      categories: [
        {
          id: 'System Design',
          name: 'System Design',
          icon: '🛠️',
          color: '#ec4899',
          count: 29,
          items: ['Design Patterns Practice', 'LRU Cache', 'Rate Limiter', 'Design Problems', 'File Uploader', 'Spring Batch Process', 'Apartment Alarm System', 'Mobile Weather App']
        }
      ]
    },
    {
      title: 'Interview Prep',
      icon: '🤖',
      color: '#8b5cf6',
      categories: [
        {
          id: 'AI Interview',
          name: 'AI Interview',
          icon: '🤖',
          color: '#8b5cf6',
          count: 0,
          items: ['AI Interview']
        }
      ]
    }
  ]

  // Flatten for navigation
  const subcategories = categoryGroups.flatMap(group => group.categories)

  const filteredSubcategories = activeCategory === 'all'
    ? subcategories
    : subcategories.filter(sub => tabCategories[activeCategory].ids.includes(sub.id))

  // Build breadcrumb stack based on current navigation state
  const buildBreadcrumbStack = () => {
    const stack = [{ name: 'Practice', icon: '💪' }]
    if (selectedSubcategory) {
      stack.push({ name: selectedSubcategory.name, icon: selectedSubcategory.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      // Clicked on Practice - go back to main categories
      setSelectedSubcategory(null)
    }
  }

  // Hook for subcategories view
  const { focusedIndex: focusedSubcategoryIndex, itemRefs: subcategoryRefs } = useKeyboardNavigation({
    items: filteredSubcategories,
    onSelect: (subcategory) => setSelectedSubcategory(subcategory),
    onBack,
    enabled: !selectedSubcategory,
    gridColumns: 2,
    loop: true
  })

  // Hook for items view within a subcategory
  const currentItems = selectedSubcategory ? selectedSubcategory.items.map(item => ({ id: item, name: item })) : []
  const { focusedIndex: focusedItemIndex, itemRefs: itemRefs } = useKeyboardNavigation({
    items: currentItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack: () => setSelectedSubcategory(null),
    enabled: !!selectedSubcategory,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)'
        : 'linear-gradient(to bottom right, #f8fafc, #dbeafe, #f8fafc)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={PRACTICE_COLORS}
        />

        {/* Collapsible Sidebar for quick topic navigation */}
        <CollapsibleSidebar
          items={filteredSubcategories}
          selectedIndex={selectedSubcategory ? filteredSubcategories.findIndex(s => s.name === selectedSubcategory.name) : -1}
          onSelect={(index) => setSelectedSubcategory(filteredSubcategories[index])}
          title="Topics"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={PRACTICE_COLORS.primary}
        />

        {!selectedSubcategory ? (
          <>
            <p style={{
              fontSize: '1.2rem',
              color: '#d1d5db',
              textAlign: 'center',
              marginBottom: '2rem',
              lineHeight: '1.8'
            }}>
              Master coding concepts through hands-on practice problems. Choose a category to start solving problems
              and build your programming skills with real-world challenges.
            </p>

            {/* Category Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '2rem',
              borderBottom: '2px solid #374151',
              overflowX: 'auto'
            }}>
              {Object.entries(tabCategories).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  style={{
                    padding: '1rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    backgroundColor: activeCategory === key ? '#3b82f6' : 'transparent',
                    color: activeCategory === key ? 'white' : '#9ca3af',
                    border: 'none',
                    borderRadius: '8px 8px 0 0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== key) {
                      e.target.style.backgroundColor = '#374151'
                      e.target.style.color = '#d1d5db'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== key) {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#9ca3af'
                    }
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredSubcategories.map((subcategory, index) => (
                <button
                  key={subcategory.id}
                  ref={(el) => subcategoryRefs.current[index] = el}
                  onClick={() => setSelectedSubcategory(subcategory)}
                  tabIndex={focusedSubcategoryIndex === index ? 0 : -1}
                  role="link"
                  aria-label={`${subcategory.name} category. ${subcategory.count} practice problems.`}
                  style={{
                    background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${subcategory.color}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    transform: focusedSubcategoryIndex === index ? 'translateY(-0.5rem)' : 'translateY(0)',
                    boxShadow: focusedSubcategoryIndex === index
                      ? `0 25px 50px -12px ${subcategory.color}50`
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-0.5rem)'
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${subcategory.color}50`
                  }}
                  onMouseLeave={(e) => {
                    if (focusedSubcategoryIndex !== index) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>{subcategory.icon}</span>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#93c5fd',
                      marginBottom: '0.25rem'
                    }}>
                      {subcategory.name}
                    </h3>
                  </div>

                  {/* Category progress */}
                  {Object.keys(itemProgress).length > 0 && subcategory.count > 0 && (() => {
                    const progress = getCategoryProgress(subcategory)
                    return (
                      <div style={{ margin: '0.75rem 0' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            color: subcategory.color
                          }}>
                            {progress.completed}/{progress.total} Complete
                          </span>
                          <span style={{
                            fontSize: '0.8rem',
                            color: '#9ca3af',
                            fontWeight: '600'
                          }}>
                            ({progress.percentage}%)
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: '#374151',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${progress.percentage}%`,
                            height: '100%',
                            backgroundColor: subcategory.color,
                            borderRadius: '4px',
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                      </div>
                    )
                  })()}

                  <p style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#d1d5db',
                    margin: '0.5rem 0'
                  }}>
                    {subcategory.count} Total Problems
                  </p>

                  <div style={{
                    fontSize: '0.85rem',
                    color: '#9ca3af',
                    lineHeight: '1.5',
                    marginTop: '0.75rem'
                  }}>
                    {subcategory.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} style={{ marginBottom: '0.2rem' }}>
                        • {item}
                      </div>
                    ))}
                    {subcategory.items.length > 3 && (
                      <div style={{ fontStyle: 'italic', color: '#6b7280' }}>
                        + {subcategory.items.length - 3} more
                      </div>
                    )}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: subcategory.color,
                    fontWeight: '600',
                    paddingTop: '0.75rem',
                    marginTop: '0.75rem',
                    borderTop: '1px solid #374151'
                  }}>
                    <span>Explore Topic</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Interview Questions Section */}
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              background: isDark
                ? 'linear-gradient(to bottom right, #1f2937, #111827)'
                : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
              borderRadius: '0.75rem',
              border: '2px solid #8b5cf6',
              textAlign: 'left'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: '2rem' }}>🎤</span>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#a78bfa',
                  margin: 0
                }}>
                  Interview Questions
                </h2>
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: isDark ? '#9ca3af' : '#6b7280',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                Click each question to reveal the answer. Common interview prep across APIs, databases, and system design.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {interviewQuestions.map((q) => {
                  const isOpen = expandedQuestion === q.id
                  return (
                    <div
                      key={q.id}
                      style={{
                        backgroundColor: isDark ? '#111827' : '#ffffff',
                        border: `1px solid ${isOpen ? '#8b5cf6' : '#374151'}`,
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                        transition: 'border-color 0.2s'
                      }}
                    >
                      <button
                        onClick={() => setExpandedQuestion(isOpen ? null : q.id)}
                        aria-expanded={isOpen}
                        style={{
                          width: '100%',
                          padding: '1rem 1.25rem',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '1rem',
                          textAlign: 'left',
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: isDark ? '#e5e7eb' : '#1f2937'
                        }}
                      >
                        <span>{q.question}</span>
                        <span style={{
                          fontSize: '1.25rem',
                          color: '#8b5cf6',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.2s'
                        }}>
                          ▾
                        </span>
                      </button>
                      {isOpen && (
                        <div style={{
                          padding: '1rem 1.25rem 1.25rem',
                          fontSize: '0.9rem',
                          color: isDark ? '#d1d5db' : '#374151',
                          borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
                        }}>
                          {q.blocks.map((block, i) => renderBlock(block, i, isDark))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <p style={{
              fontSize: '1.2rem',
              color: '#d1d5db',
              textAlign: 'center',
              marginBottom: '2rem',
              lineHeight: '1.8'
            }}>
              Select a practice problem to start coding. Track your progress and improve your skills!
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}>
              {selectedSubcategory.items.map((item, index) => (
                <button
                  key={item}
                  ref={(el) => itemRefs.current[index] = el}
                  onClick={() => onSelectItem(item)}
                  tabIndex={focusedItemIndex === index ? 0 : -1}
                  role="link"
                  aria-label={`${item} practice problem`}
                  style={{
                    background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${selectedSubcategory.color}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    transform: focusedItemIndex === index ? 'translateY(-0.5rem)' : 'translateY(0)',
                    boxShadow: focusedItemIndex === index
                      ? `0 25px 50px -12px ${selectedSubcategory.color}50`
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-0.5rem)'
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${selectedSubcategory.color}50`
                  }}
                  onMouseLeave={(e) => {
                    if (focusedItemIndex !== index) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: selectedSubcategory.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#93c5fd',
                      margin: 0
                    }}>
                      {item}
                    </h3>
                  </div>

                  {/* Progress indicator */}
                  {itemProgress[item] && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '0.8rem',
                          color: '#9ca3af',
                          fontWeight: '600'
                        }}>
                          Progress
                        </span>
                        <span style={{
                          fontSize: '0.8rem',
                          color: selectedSubcategory.color,
                          fontWeight: '700'
                        }}>
                          {itemProgress[item].completed}/{itemProgress[item].total}
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#374151',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${itemProgress[item].percentage}%`,
                          height: '100%',
                          backgroundColor: selectedSubcategory.color,
                          borderRadius: '4px',
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                      <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.8rem',
                        color: itemProgress[item].percentage === 100 ? '#10b981' : '#9ca3af',
                        fontWeight: '600',
                        textAlign: 'center'
                      }}>
                        {itemProgress[item].percentage === 100 ? '✓ Complete!' : `${itemProgress[item].percentage}% Complete`}
                      </div>
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: selectedSubcategory.color,
                    fontWeight: '600',
                    paddingTop: '0.75rem',
                    marginTop: '0.75rem',
                    borderTop: '1px solid #374151'
                  }}>
                    <span>Start Practice</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Practice

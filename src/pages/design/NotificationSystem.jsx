import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#fbbf24',
  primaryHover: '#f59e0b',
  bg: 'rgba(251, 191, 36, 0.1)',
  border: 'rgba(251, 191, 36, 0.3)',
  arrow: '#fbbf24',
  hoverBg: 'rgba(251, 191, 36, 0.2)',
  topicBg: 'rgba(251, 191, 36, 0.2)'
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

const NotificationArchitectureDiagram = () => (
  <svg viewBox="0 0 900 500" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="archEventGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="archServiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6d28d9" />
      </linearGradient>
      <linearGradient id="archPushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="archEmailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="archSmsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <filter id="archShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>

    <rect width="900" height="500" fill="#1f2937" rx="12"/>
    <text x="450" y="35" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">High-Level Notification Architecture</text>

    {/* Event Sources */}
    <g filter="url(#archShadow)">
      <rect x="30" y="70" width="140" height="50" rx="8" fill="url(#archEventGrad)"/>
      <text x="100" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Order Service</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="30" y="140" width="140" height="50" rx="8" fill="url(#archEventGrad)"/>
      <text x="100" y="170" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Payment Service</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="30" y="210" width="140" height="50" rx="8" fill="url(#archEventGrad)"/>
      <text x="100" y="240" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Social Service</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="30" y="280" width="140" height="50" rx="8" fill="url(#archEventGrad)"/>
      <text x="100" y="310" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Marketing Service</text>
    </g>
    <text x="100" y="360" textAnchor="middle" fill="#9ca3af" fontSize="11">Event Sources</text>

    {/* Arrows from sources to API Gateway */}
    <path d="M170,95 L240,200" stroke="#60a5fa" strokeWidth="2" fill="none"/>
    <path d="M170,165 L240,200" stroke="#60a5fa" strokeWidth="2" fill="none"/>
    <path d="M170,235 L240,215" stroke="#60a5fa" strokeWidth="2" fill="none"/>
    <path d="M170,305 L240,230" stroke="#60a5fa" strokeWidth="2" fill="none"/>

    {/* API Gateway */}
    <g filter="url(#archShadow)">
      <rect x="250" y="160" width="150" height="90" rx="10" fill="url(#archServiceGrad)"/>
      <text x="325" y="195" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">API Gateway</text>
      <text x="325" y="215" textAnchor="middle" fill="#e0e0ff" fontSize="10">Rate Limiting</text>
      <text x="325" y="230" textAnchor="middle" fill="#e0e0ff" fontSize="10">Authentication</text>
    </g>

    <path d="M400,205 L450,205" stroke="#a78bfa" strokeWidth="2" fill="none"/>
    <polygon points="450,205 442,200 442,210" fill="#a78bfa"/>

    {/* Notification Service */}
    <g filter="url(#archShadow)">
      <rect x="460" y="120" width="180" height="170" rx="12" fill="#374151" stroke="#6366f1" strokeWidth="2"/>
      <text x="550" y="150" textAnchor="middle" fill="#a5b4fc" fontSize="14" fontWeight="bold">Notification Service</text>
      <rect x="480" y="165" width="140" height="30" rx="5" fill="#4b5563"/>
      <text x="550" y="185" textAnchor="middle" fill="#d1d5db" fontSize="10">Template Engine</text>
      <rect x="480" y="200" width="140" height="30" rx="5" fill="#4b5563"/>
      <text x="550" y="220" textAnchor="middle" fill="#d1d5db" fontSize="10">Priority Queue</text>
      <rect x="480" y="235" width="140" height="30" rx="5" fill="#4b5563"/>
      <text x="550" y="255" textAnchor="middle" fill="#d1d5db" fontSize="10">User Preferences</text>
    </g>

    {/* Arrows to Delivery Channels */}
    <path d="M640,160 L720,100" stroke="#10b981" strokeWidth="2" fill="none"/>
    <path d="M640,205 L720,205" stroke="#f59e0b" strokeWidth="2" fill="none"/>
    <path d="M640,250 L720,310" stroke="#ef4444" strokeWidth="2" fill="none"/>

    {/* Push Notifications */}
    <g filter="url(#archShadow)">
      <rect x="730" y="60" width="140" height="80" rx="8" fill="url(#archPushGrad)"/>
      <text x="800" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Push</text>
      <text x="800" y="108" textAnchor="middle" fill="#d1fae5" fontSize="9">FCM / APNS</text>
      <text x="800" y="125" textAnchor="middle" fill="#d1fae5" fontSize="9">iOS, Android, Web</text>
    </g>

    {/* Email */}
    <g filter="url(#archShadow)">
      <rect x="730" y="165" width="140" height="80" rx="8" fill="url(#archEmailGrad)"/>
      <text x="800" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Email</text>
      <text x="800" y="213" textAnchor="middle" fill="#fef3c7" fontSize="9">SES / SendGrid</text>
      <text x="800" y="230" textAnchor="middle" fill="#fef3c7" fontSize="9">Templates + Analytics</text>
    </g>

    {/* SMS */}
    <g filter="url(#archShadow)">
      <rect x="730" y="270" width="140" height="80" rx="8" fill="url(#archSmsGrad)"/>
      <text x="800" y="300" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">SMS</text>
      <text x="800" y="318" textAnchor="middle" fill="#fee2e2" fontSize="9">Twilio / SNS</text>
      <text x="800" y="335" textAnchor="middle" fill="#fee2e2" fontSize="9">Global Coverage</text>
    </g>

    <text x="800" y="380" textAnchor="middle" fill="#9ca3af" fontSize="11">Delivery Channels</text>

    {/* Data Storage */}
    <g filter="url(#archShadow)">
      <rect x="200" y="410" width="500" height="70" rx="10" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1"/>
      <text x="450" y="435" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Data Layer</text>
      <text x="280" y="460" textAnchor="middle" fill="#93c5fd" fontSize="10">PostgreSQL</text>
      <text x="380" y="460" textAnchor="middle" fill="#93c5fd" fontSize="10">Cassandra</text>
      <text x="480" y="460" textAnchor="middle" fill="#93c5fd" fontSize="10">Redis</text>
      <text x="580" y="460" textAnchor="middle" fill="#93c5fd" fontSize="10">Kafka</text>
    </g>

    <path d="M550,290 L550,410" stroke="#4b5563" strokeWidth="1" strokeDasharray="5,3"/>
  </svg>
)

const NotificationFlowDiagram = () => (
  <svg viewBox="0 0 900 400" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="flowStep1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="flowStep2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6d28d9" />
      </linearGradient>
      <linearGradient id="flowStep3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="flowStep4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="flowStep5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="flowStep6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <marker id="flowArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#6b7280"/>
      </marker>
    </defs>

    <rect width="900" height="400" fill="#1f2937" rx="12"/>
    <text x="450" y="30" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">End-to-End Notification Flow</text>

    {/* Steps */}
    <g>
      <rect x="30" y="70" width="110" height="90" rx="8" fill="url(#flowStep1)" filter="url(#archShadow)"/>
      <text x="85" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">1. Event</text>
      <text x="85" y="118" textAnchor="middle" fill="#bfdbfe" fontSize="9">User Action</text>
      <text x="85" y="133" textAnchor="middle" fill="#bfdbfe" fontSize="9">Order Placed</text>
      <text x="85" y="148" textAnchor="middle" fill="#bfdbfe" fontSize="9">Payment Done</text>
    </g>
    <path d="M140,115 L170,115" stroke="#6b7280" strokeWidth="2" markerEnd="url(#flowArrow)"/>

    <g>
      <rect x="180" y="70" width="110" height="90" rx="8" fill="url(#flowStep2)" filter="url(#archShadow)"/>
      <text x="235" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">2. API Gateway</text>
      <text x="235" y="118" textAnchor="middle" fill="#ddd6fe" fontSize="9">Authenticate</text>
      <text x="235" y="133" textAnchor="middle" fill="#ddd6fe" fontSize="9">Rate Limit</text>
      <text x="235" y="148" textAnchor="middle" fill="#ddd6fe" fontSize="9">Validate</text>
    </g>
    <path d="M290,115 L320,115" stroke="#6b7280" strokeWidth="2" markerEnd="url(#flowArrow)"/>

    <g>
      <rect x="330" y="70" width="110" height="90" rx="8" fill="url(#flowStep3)" filter="url(#archShadow)"/>
      <text x="385" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">3. Kafka</text>
      <text x="385" y="118" textAnchor="middle" fill="#d1fae5" fontSize="9">Partition by</text>
      <text x="385" y="133" textAnchor="middle" fill="#d1fae5" fontSize="9">user_id</text>
      <text x="385" y="148" textAnchor="middle" fill="#d1fae5" fontSize="9">Persist</text>
    </g>
    <path d="M440,115 L470,115" stroke="#6b7280" strokeWidth="2" markerEnd="url(#flowArrow)"/>

    <g>
      <rect x="480" y="70" width="110" height="90" rx="8" fill="url(#flowStep4)" filter="url(#archShadow)"/>
      <text x="535" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">4. Worker</text>
      <text x="535" y="118" textAnchor="middle" fill="#fef3c7" fontSize="9">Check Prefs</text>
      <text x="535" y="133" textAnchor="middle" fill="#fef3c7" fontSize="9">Apply Template</text>
      <text x="535" y="148" textAnchor="middle" fill="#fef3c7" fontSize="9">Dedup Check</text>
    </g>
    <path d="M590,115 L620,115" stroke="#6b7280" strokeWidth="2" markerEnd="url(#flowArrow)"/>

    <g>
      <rect x="630" y="70" width="110" height="90" rx="8" fill="url(#flowStep5)" filter="url(#archShadow)"/>
      <text x="685" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">5. Provider</text>
      <text x="685" y="118" textAnchor="middle" fill="#fee2e2" fontSize="9">FCM/APNS</text>
      <text x="685" y="133" textAnchor="middle" fill="#fee2e2" fontSize="9">SES/SendGrid</text>
      <text x="685" y="148" textAnchor="middle" fill="#fee2e2" fontSize="9">Twilio</text>
    </g>
    <path d="M740,115 L770,115" stroke="#6b7280" strokeWidth="2" markerEnd="url(#flowArrow)"/>

    <g>
      <rect x="780" y="70" width="100" height="90" rx="8" fill="url(#flowStep6)" filter="url(#archShadow)"/>
      <text x="830" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">6. Device</text>
      <text x="830" y="118" textAnchor="middle" fill="#cffafe" fontSize="9">Mobile</text>
      <text x="830" y="133" textAnchor="middle" fill="#cffafe" fontSize="9">Email Client</text>
      <text x="830" y="148" textAnchor="middle" fill="#cffafe" fontSize="9">Phone</text>
    </g>

    {/* Timeline */}
    <line x1="85" y1="200" x2="830" y2="200" stroke="#4b5563" strokeWidth="2"/>
    <circle cx="85" cy="200" r="5" fill="#3b82f6"/>
    <circle cx="235" cy="200" r="5" fill="#8b5cf6"/>
    <circle cx="385" cy="200" r="5" fill="#10b981"/>
    <circle cx="535" cy="200" r="5" fill="#f59e0b"/>
    <circle cx="685" cy="200" r="5" fill="#ef4444"/>
    <circle cx="830" cy="200" r="5" fill="#06b6d4"/>

    <text x="85" y="225" textAnchor="middle" fill="#9ca3af" fontSize="9">0ms</text>
    <text x="235" y="225" textAnchor="middle" fill="#9ca3af" fontSize="9">10ms</text>
    <text x="385" y="225" textAnchor="middle" fill="#9ca3af" fontSize="9">50ms</text>
    <text x="535" y="225" textAnchor="middle" fill="#9ca3af" fontSize="9">100ms</text>
    <text x="685" y="225" textAnchor="middle" fill="#9ca3af" fontSize="9">200ms</text>
    <text x="830" y="225" textAnchor="middle" fill="#9ca3af" fontSize="9">500ms</text>

    {/* Retry Flow */}
    <text x="450" y="270" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Retry Flow (on failure)</text>
    <rect x="280" y="290" width="340" height="90" rx="8" fill="#292524" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,2"/>

    <g>
      <rect x="300" y="310" width="90" height="50" rx="6" fill="#374151"/>
      <text x="345" y="340" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Retry Queue</text>
    </g>
    <path d="M390,335 L420,335" stroke="#f59e0b" strokeWidth="1" markerEnd="url(#flowArrow)"/>

    <g>
      <rect x="430" y="310" width="80" height="50" rx="6" fill="#374151"/>
      <text x="470" y="332" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Backoff</text>
      <text x="470" y="348" textAnchor="middle" fill="#d1d5db" fontSize="8">1s,2s,4s...</text>
    </g>
    <path d="M510,335 L540,335" stroke="#f59e0b" strokeWidth="1" markerEnd="url(#flowArrow)"/>

    <g>
      <rect x="550" y="310" width="60" height="50" rx="6" fill="#7f1d1d"/>
      <text x="580" y="340" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">DLQ</text>
    </g>
  </svg>
)

const PriorityQueueDiagram = () => (
  <svg viewBox="0 0 800 450" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="urgentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
      <linearGradient id="highGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="normalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="lowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4b5563" />
        <stop offset="100%" stopColor="#6b7280" />
      </linearGradient>
      <linearGradient id="rateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>

    <rect width="800" height="450" fill="#1f2937" rx="12"/>
    <text x="400" y="30" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">Priority Queue and Rate Limiting</text>

    {/* Incoming Messages */}
    <text x="80" y="70" textAnchor="middle" fill="#9ca3af" fontSize="12">Incoming</text>
    <rect x="30" y="85" width="100" height="180" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="1"/>

    <rect x="40" y="95" width="80" height="25" rx="4" fill="#dc2626"/>
    <text x="80" y="112" textAnchor="middle" fill="white" fontSize="9">P0: Security</text>

    <rect x="40" y="125" width="80" height="25" rx="4" fill="#f59e0b"/>
    <text x="80" y="142" textAnchor="middle" fill="white" fontSize="9">P1: Order</text>

    <rect x="40" y="155" width="80" height="25" rx="4" fill="#3b82f6"/>
    <text x="80" y="172" textAnchor="middle" fill="white" fontSize="9">P2: Message</text>

    <rect x="40" y="185" width="80" height="25" rx="4" fill="#f59e0b"/>
    <text x="80" y="202" textAnchor="middle" fill="white" fontSize="9">P1: 2FA</text>

    <rect x="40" y="215" width="80" height="25" rx="4" fill="#6b7280"/>
    <text x="80" y="232" textAnchor="middle" fill="white" fontSize="9">P3: Promo</text>

    <path d="M130,175 L180,175" stroke="#6b7280" strokeWidth="2"/>
    <polygon points="180,175 172,170 172,180" fill="#6b7280"/>

    {/* Priority Sorter */}
    <g>
      <rect x="190" y="110" width="120" height="130" rx="10" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
      <text x="250" y="140" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Priority</text>
      <text x="250" y="155" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Sorter</text>
      <text x="250" y="180" textAnchor="middle" fill="#93c5fd" fontSize="9">Heap-based</text>
      <text x="250" y="195" textAnchor="middle" fill="#93c5fd" fontSize="9">O(log n)</text>
      <text x="250" y="215" textAnchor="middle" fill="#93c5fd" fontSize="9">Partition</text>
      <text x="250" y="228" textAnchor="middle" fill="#93c5fd" fontSize="9">by priority</text>
    </g>

    <path d="M310,135 L360,90" stroke="#dc2626" strokeWidth="2"/>
    <path d="M310,155 L360,155" stroke="#f59e0b" strokeWidth="2"/>
    <path d="M310,185 L360,220" stroke="#3b82f6" strokeWidth="2"/>
    <path d="M310,215 L360,285" stroke="#6b7280" strokeWidth="2"/>

    {/* Priority Queues */}
    <text x="480" y="55" textAnchor="middle" fill="#9ca3af" fontSize="12">Priority Queues</text>

    <g>
      <rect x="370" y="65" width="220" height="50" rx="6" fill="url(#urgentGrad)"/>
      <text x="400" y="95" textAnchor="start" fill="white" fontSize="11" fontWeight="bold">P0: URGENT</text>
      <text x="530" y="88" textAnchor="middle" fill="#fee2e2" fontSize="8">{'<100ms latency'}</text>
      <text x="530" y="100" textAnchor="middle" fill="#fee2e2" fontSize="8">Security, Fraud</text>
    </g>

    <g>
      <rect x="370" y="125" width="220" height="50" rx="6" fill="url(#highGrad)"/>
      <text x="400" y="155" textAnchor="start" fill="white" fontSize="11" fontWeight="bold">P1: HIGH</text>
      <text x="530" y="148" textAnchor="middle" fill="#fef3c7" fontSize="8">{'<1s latency'}</text>
      <text x="530" y="160" textAnchor="middle" fill="#fef3c7" fontSize="8">Orders, 2FA</text>
    </g>

    <g>
      <rect x="370" y="185" width="220" height="50" rx="6" fill="url(#normalGrad)"/>
      <text x="400" y="215" textAnchor="start" fill="white" fontSize="11" fontWeight="bold">P2: NORMAL</text>
      <text x="530" y="208" textAnchor="middle" fill="#dbeafe" fontSize="8">{'<5s latency'}</text>
      <text x="530" y="220" textAnchor="middle" fill="#dbeafe" fontSize="8">Messages, Social</text>
    </g>

    <g>
      <rect x="370" y="245" width="220" height="50" rx="6" fill="url(#lowGrad)"/>
      <text x="400" y="275" textAnchor="start" fill="white" fontSize="11" fontWeight="bold">P3: LOW</text>
      <text x="530" y="268" textAnchor="middle" fill="#e5e7eb" fontSize="8">Best effort</text>
      <text x="530" y="280" textAnchor="middle" fill="#e5e7eb" fontSize="8">Marketing, Digest</text>
    </g>

    <path d="M590,90 L640,150" stroke="#dc2626" strokeWidth="2"/>
    <path d="M590,150 L640,165" stroke="#f59e0b" strokeWidth="2"/>
    <path d="M590,210 L640,185" stroke="#3b82f6" strokeWidth="2"/>
    <path d="M590,270 L640,200" stroke="#6b7280" strokeWidth="2"/>

    {/* Rate Limiter */}
    <g>
      <rect x="650" y="110" width="130" height="140" rx="10" fill="url(#rateGrad)"/>
      <text x="715" y="140" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Rate</text>
      <text x="715" y="158" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Limiter</text>
      <text x="715" y="185" textAnchor="middle" fill="#ede9fe" fontSize="9">Token Bucket</text>
      <text x="715" y="200" textAnchor="middle" fill="#ede9fe" fontSize="9">Per User</text>
      <text x="715" y="220" textAnchor="middle" fill="#ede9fe" fontSize="9">Per Service</text>
      <text x="715" y="235" textAnchor="middle" fill="#ede9fe" fontSize="9">Redis Backed</text>
    </g>

    {/* Rate Limit Rules */}
    <text x="400" y="340" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Rate Limit Rules (per user)</text>

    <g>
      <rect x="80" y="360" width="180" height="70" rx="8" fill="#374151" stroke="#10b981" strokeWidth="1"/>
      <text x="170" y="385" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Push</text>
      <text x="170" y="405" textAnchor="middle" fill="#d1d5db" fontSize="10">100 / hour</text>
      <text x="170" y="420" textAnchor="middle" fill="#9ca3af" fontSize="9">1000 / day</text>
    </g>

    <g>
      <rect x="280" y="360" width="180" height="70" rx="8" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
      <text x="370" y="385" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Email</text>
      <text x="370" y="405" textAnchor="middle" fill="#d1d5db" fontSize="10">10 / hour</text>
      <text x="370" y="420" textAnchor="middle" fill="#9ca3af" fontSize="9">50 / day</text>
    </g>

    <g>
      <rect x="480" y="360" width="180" height="70" rx="8" fill="#374151" stroke="#ef4444" strokeWidth="1"/>
      <text x="570" y="385" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">SMS</text>
      <text x="570" y="405" textAnchor="middle" fill="#d1d5db" fontSize="10">5 / day</text>
      <text x="570" y="420" textAnchor="middle" fill="#9ca3af" fontSize="9">Critical only</text>
    </g>
  </svg>
)

const DeliveryChannelsDiagram = () => (
  <svg viewBox="0 0 900 400" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="pushChannelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="emailChannelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="smsChannelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>

    <rect width="900" height="400" fill="#1f2937" rx="12"/>
    <text x="450" y="30" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">Multi-Channel Delivery Architecture</text>

    {/* Central Router */}
    <g>
      <rect x="30" y="140" width="150" height="120" rx="10" fill="#374151" stroke="#6366f1" strokeWidth="2"/>
      <text x="105" y="175" textAnchor="middle" fill="#a5b4fc" fontSize="13" fontWeight="bold">Notification</text>
      <text x="105" y="195" textAnchor="middle" fill="#a5b4fc" fontSize="13" fontWeight="bold">Router</text>
      <text x="105" y="220" textAnchor="middle" fill="#9ca3af" fontSize="9">Channel Selection</text>
      <text x="105" y="235" textAnchor="middle" fill="#9ca3af" fontSize="9">Template Binding</text>
      <text x="105" y="250" textAnchor="middle" fill="#9ca3af" fontSize="9">Preference Check</text>
    </g>

    {/* Push Channel */}
    <g>
      <rect x="220" y="50" width="200" height="90" rx="10" fill="url(#pushChannelGrad)"/>
      <text x="320" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Push Notifications</text>
      <text x="270" y="105" textAnchor="middle" fill="#d1fae5" fontSize="10">FCM (Android)</text>
      <text x="370" y="105" textAnchor="middle" fill="#d1fae5" fontSize="10">APNs (iOS)</text>
      <text x="320" y="125" textAnchor="middle" fill="#d1fae5" fontSize="10">Web Push (VAPID)</text>
    </g>

    {/* Email Channel */}
    <g>
      <rect x="220" y="155" width="200" height="90" rx="10" fill="url(#emailChannelGrad)"/>
      <text x="320" y="185" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Email Delivery</text>
      <text x="270" y="210" textAnchor="middle" fill="#fef3c7" fontSize="10">Amazon SES</text>
      <text x="370" y="210" textAnchor="middle" fill="#fef3c7" fontSize="10">SendGrid</text>
      <text x="320" y="230" textAnchor="middle" fill="#fef3c7" fontSize="10">SMTP Fallback</text>
    </g>

    {/* SMS Channel */}
    <g>
      <rect x="220" y="260" width="200" height="90" rx="10" fill="url(#smsChannelGrad)"/>
      <text x="320" y="290" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">SMS Delivery</text>
      <text x="270" y="315" textAnchor="middle" fill="#ede9fe" fontSize="10">Twilio</text>
      <text x="370" y="315" textAnchor="middle" fill="#ede9fe" fontSize="10">AWS SNS</text>
      <text x="320" y="335" textAnchor="middle" fill="#ede9fe" fontSize="10">Nexmo (Vonage)</text>
    </g>

    {/* Arrows */}
    <path d="M180,170 L220,95" stroke="#10b981" strokeWidth="2"/>
    <path d="M180,200 L220,200" stroke="#f59e0b" strokeWidth="2"/>
    <path d="M180,230 L220,305" stroke="#8b5cf6" strokeWidth="2"/>

    {/* Endpoints */}
    <text x="600" y="55" textAnchor="middle" fill="#9ca3af" fontSize="12">Endpoints</text>

    <g>
      <rect x="480" y="70" width="100" height="60" rx="8" fill="#374151" stroke="#10b981" strokeWidth="1"/>
      <text x="530" y="95" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Mobile</text>
      <text x="530" y="115" textAnchor="middle" fill="#d1d5db" fontSize="9">iOS/Android</text>
    </g>

    <g>
      <rect x="600" y="70" width="100" height="60" rx="8" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
      <text x="650" y="95" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Web</text>
      <text x="650" y="115" textAnchor="middle" fill="#d1d5db" fontSize="9">Browser</text>
    </g>

    <g>
      <rect x="540" y="175" width="120" height="60" rx="8" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
      <text x="600" y="200" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Email Client</text>
      <text x="600" y="220" textAnchor="middle" fill="#d1d5db" fontSize="9">Gmail, Outlook</text>
    </g>

    <g>
      <rect x="540" y="280" width="120" height="60" rx="8" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
      <text x="600" y="305" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Phone</text>
      <text x="600" y="325" textAnchor="middle" fill="#d1d5db" fontSize="9">SMS/MMS</text>
    </g>

    <path d="M420,95 L480,100" stroke="#10b981" strokeWidth="1"/>
    <path d="M420,200 L540,205" stroke="#f59e0b" strokeWidth="1"/>
    <path d="M420,305 L540,310" stroke="#8b5cf6" strokeWidth="1"/>

    {/* Latency Legend */}
    <rect x="720" y="150" width="150" height="100" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
    <text x="795" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Latency (p95)</text>
    <text x="795" y="200" fill="#10b981" fontSize="9">Push: ~500ms</text>
    <text x="795" y="220" fill="#f59e0b" fontSize="9">Email: ~30s</text>
    <text x="795" y="240" fill="#8b5cf6" fontSize="9">SMS: ~5s</text>
  </svg>
)

const DeliveryTrackingDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="trackArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    <rect width="800" height="300" fill="#1f2937" rx="12"/>
    <text x="400" y="30" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">Delivery Status Tracking</text>

    {/* Status Flow */}
    <g>
      <rect x="50" y="80" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
      <text x="100" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">QUEUED</text>
    </g>

    <line x1="150" y1="110" x2="200" y2="110" stroke="#4ade80" strokeWidth="2" markerEnd="url(#trackArrow)"/>

    <g>
      <rect x="210" y="80" width="100" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
      <text x="260" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PROCESSING</text>
    </g>

    <line x1="310" y1="110" x2="360" y2="110" stroke="#4ade80" strokeWidth="2" markerEnd="url(#trackArrow)"/>

    <g>
      <rect x="370" y="80" width="100" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
      <text x="420" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">SENT</text>
    </g>

    <line x1="470" y1="110" x2="520" y2="110" stroke="#4ade80" strokeWidth="2" markerEnd="url(#trackArrow)"/>

    <g>
      <rect x="530" y="80" width="100" height="60" rx="8" fill="#10b981" stroke="#4ade80" strokeWidth="2"/>
      <text x="580" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">DELIVERED</text>
    </g>

    <line x1="630" y1="110" x2="680" y2="110" stroke="#4ade80" strokeWidth="2" markerEnd="url(#trackArrow)"/>

    <g>
      <rect x="690" y="80" width="80" height="60" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
      <text x="730" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">READ</text>
    </g>

    {/* Error Path */}
    <path d="M420,140 L420,180 L260,180 L260,220" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3"/>

    <g>
      <rect x="200" y="220" width="120" height="50" rx="8" fill="#dc2626" stroke="#ef4444" strokeWidth="2"/>
      <text x="260" y="250" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">FAILED/RETRY</text>
    </g>

    <text x="350" y="175" textAnchor="middle" fill="#ef4444" fontSize="10">On Error</text>

    {/* Metrics */}
    <rect x="580" y="180" width="190" height="100" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
    <text x="675" y="205" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Tracking Metrics</text>
    <text x="600" y="230" fill="#10b981" fontSize="10">Delivery Rate: 99.9%</text>
    <text x="600" y="250" fill="#f59e0b" fontSize="10">Open Rate: 45%</text>
    <text x="600" y="270" fill="#06b6d4" fontSize="10">Click Rate: 12%</text>
  </svg>
)

const ScalingDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <rect width="800" height="350" fill="#1f2937" rx="12"/>
    <text x="400" y="30" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">Horizontal Scaling Architecture</text>

    {/* Load Balancer */}
    <g>
      <rect x="300" y="60" width="200" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
      <text x="400" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Load Balancer (L7)</text>
    </g>

    {/* API Servers */}
    <text x="400" y="140" textAnchor="middle" fill="#9ca3af" fontSize="11">API Servers (Auto-scaled)</text>

    <g>
      <rect x="100" y="155" width="120" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
      <text x="160" y="182" textAnchor="middle" fill="white" fontSize="10">API Server 1</text>
    </g>
    <g>
      <rect x="240" y="155" width="120" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
      <text x="300" y="182" textAnchor="middle" fill="white" fontSize="10">API Server 2</text>
    </g>
    <g>
      <rect x="380" y="155" width="120" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
      <text x="440" y="182" textAnchor="middle" fill="white" fontSize="10">API Server N</text>
    </g>
    <g>
      <rect x="520" y="155" width="80" height="45" rx="6" fill="#374151" stroke="#4b5563" strokeWidth="1" strokeDasharray="4,2"/>
      <text x="560" y="182" textAnchor="middle" fill="#9ca3af" fontSize="10">+ Scale</text>
    </g>

    {/* Kafka */}
    <g>
      <rect x="250" y="230" width="300" height="50" rx="8" fill="#10b981" stroke="#4ade80" strokeWidth="2"/>
      <text x="400" y="260" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Kafka Cluster (100 partitions)</text>
    </g>

    {/* Workers */}
    <text x="400" y="305" textAnchor="middle" fill="#9ca3af" fontSize="11">Worker Pods (HPA: 10-1000)</text>

    <g>
      <rect x="60" y="320" width="90" height="25" rx="4" fill="#f59e0b"/>
      <text x="105" y="337" textAnchor="middle" fill="white" fontSize="9">Worker 1</text>
    </g>
    <g>
      <rect x="160" y="320" width="90" height="25" rx="4" fill="#f59e0b"/>
      <text x="205" y="337" textAnchor="middle" fill="white" fontSize="9">Worker 2</text>
    </g>
    <g>
      <rect x="260" y="320" width="90" height="25" rx="4" fill="#f59e0b"/>
      <text x="305" y="337" textAnchor="middle" fill="white" fontSize="9">Worker 3</text>
    </g>
    <text x="380" y="337" fill="#9ca3af" fontSize="12">...</text>
    <g>
      <rect x="410" y="320" width="90" height="25" rx="4" fill="#f59e0b"/>
      <text x="455" y="337" textAnchor="middle" fill="white" fontSize="9">Worker N</text>
    </g>

    {/* Arrows */}
    <path d="M400,110 L160,155" stroke="#6b7280" strokeWidth="1"/>
    <path d="M400,110 L300,155" stroke="#6b7280" strokeWidth="1"/>
    <path d="M400,110 L440,155" stroke="#6b7280" strokeWidth="1"/>

    <path d="M160,200 L300,230" stroke="#6b7280" strokeWidth="1"/>
    <path d="M300,200 L350,230" stroke="#6b7280" strokeWidth="1"/>
    <path d="M440,200 L450,230" stroke="#6b7280" strokeWidth="1"/>

    <path d="M300,280 L105,320" stroke="#6b7280" strokeWidth="1"/>
    <path d="M350,280 L205,320" stroke="#6b7280" strokeWidth="1"/>
    <path d="M400,280 L305,320" stroke="#6b7280" strokeWidth="1"/>
    <path d="M450,280 L455,320" stroke="#6b7280" strokeWidth="1"/>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function NotificationSystem({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'notification-types',
      name: 'Notification Channels',
      icon: '📱',
      color: '#10b981',
      description: 'Multi-channel delivery across Push, Email, and SMS with provider failover and channel-specific optimizations.',
      diagram: DeliveryChannelsDiagram,
      details: [
        {
          name: 'Push Notifications',
          explanation: 'Push notifications provide instant delivery to mobile and web devices. iOS uses APNs (Apple Push Notification service) with JWT authentication and HTTP/2 connections. Android uses FCM (Firebase Cloud Messaging) with API key authentication. Web browsers use the Push API with VAPID (Voluntary Application Server Identification) for authentication. Each platform has a 4KB payload limit. Device tokens must be managed carefully, handling token refresh and removing invalid tokens after provider feedback.',
          codeExample: `// Push Notification Service
@Service
public class PushNotificationService {
    private final FCMClient fcmClient;
    private final APNsClient apnsClient;

    public CompletableFuture<DeliveryResult> sendPush(
            String userId,
            PushPayload payload) {

        List<DeviceToken> tokens = deviceTokenRepo.findByUserId(userId);

        List<CompletableFuture<DeliveryResult>> futures = tokens.stream()
            .map(token -> {
                if (token.getPlatform() == Platform.IOS) {
                    return apnsClient.send(token.getToken(), payload);
                } else if (token.getPlatform() == Platform.ANDROID) {
                    return fcmClient.send(token.getToken(), payload);
                } else {
                    return webPushClient.send(token.getToken(), payload);
                }
            })
            .collect(Collectors.toList());

        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .thenApply(v -> aggregateResults(futures));
    }
}`
        },
        {
          name: 'Email Delivery',
          explanation: 'Email notifications support both transactional and marketing messages. Primary providers like Amazon SES and SendGrid offer high deliverability and template engines. SMTP fallback ensures reliability. Key considerations include SPF, DKIM, and DMARC configuration for deliverability, IP warming for new sending domains, tracking pixels for open rates, and redirect links for click tracking. Compliance with CAN-SPAM requires unsubscribe links in all commercial emails.',
          codeExample: `// Email Service with Failover
@Service
public class EmailService {
    private final SESClient sesClient;
    private final SendGridClient sendGridClient;

    public DeliveryResult sendEmail(EmailRequest request) {
        // Render template with variables
        String htmlContent = templateEngine.render(
            request.getTemplateId(),
            request.getVariables()
        );

        try {
            // Try primary provider (SES)
            return sesClient.send(
                request.getTo(),
                request.getSubject(),
                htmlContent,
                request.getTrackingId()
            );
        } catch (ProviderException e) {
            log.warn("SES failed, falling back to SendGrid", e);

            // Failover to SendGrid
            return sendGridClient.send(
                request.getTo(),
                request.getSubject(),
                htmlContent,
                request.getTrackingId()
            );
        }
    }
}`
        },
        {
          name: 'SMS Messages',
          explanation: 'SMS is the most expensive channel ($0.01-0.05 per message) and should be reserved for critical notifications like 2FA codes, fraud alerts, and delivery updates. Providers like Twilio offer global coverage while AWS SNS is cost-effective for US/EU. Phone numbers must be validated in E.164 format. International messaging requires compliance with country-specific regulations (GDPR, TCPA). Rate limiting is aggressive (typically 5 SMS/day per user) to control costs.',
          codeExample: `// SMS Service with Rate Limiting
@Service
public class SMSService {
    private final TwilioClient twilioClient;
    private final RateLimiter rateLimiter;

    public DeliveryResult sendSMS(String phoneNumber, String message) {
        // Validate E.164 format
        if (!PhoneValidator.isValidE164(phoneNumber)) {
            throw new InvalidPhoneNumberException(phoneNumber);
        }

        // Check rate limit (5 SMS/day per user)
        String userId = userService.getUserIdByPhone(phoneNumber);
        if (!rateLimiter.tryAcquire("sms:" + userId, 5, Duration.ofDays(1))) {
            throw new RateLimitExceededException("SMS limit reached");
        }

        // Check if message is critical (bypass cost check)
        NotificationType type = getNotificationType(message);
        if (!type.isCritical()) {
            log.info("Non-critical SMS blocked for cost control");
            return DeliveryResult.BLOCKED;
        }

        return twilioClient.send(phoneNumber, message);
    }
}`
        }
      ]
    },
    {
      id: 'message-queue',
      name: 'Message Queue Architecture',
      icon: '📬',
      color: '#3b82f6',
      description: 'Kafka-based message queue with partitioning, consumer groups, and guaranteed at-least-once delivery.',
      diagram: NotificationFlowDiagram,
      details: [
        {
          name: 'Kafka Partitioning',
          explanation: 'Kafka provides reliable message delivery with horizontal scalability. Messages are partitioned by user_id using consistent hashing, ensuring all notifications for a user are processed in order. A typical setup uses 100 partitions per topic (push_notifications, email, sms), allowing up to 100 parallel consumers. Replication factor of 3 ensures durability. Messages are persisted to disk and retained for 7 days for replay capability.',
          codeExample: `// Kafka Producer Configuration
@Configuration
public class KafkaProducerConfig {

    @Bean
    public ProducerFactory<String, NotificationMessage> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaServers);
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);

        // Ensure durability
        config.put(ProducerConfig.ACKS_CONFIG, "all");
        config.put(ProducerConfig.RETRIES_CONFIG, 3);
        config.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);

        return new DefaultKafkaProducerFactory<>(config);
    }

    public void sendNotification(NotificationMessage message) {
        // Partition by user_id for ordering guarantees
        kafkaTemplate.send(
            "notifications",
            message.getUserId(),  // Partition key
            message
        );
    }
}`
        },
        {
          name: 'Consumer Groups',
          explanation: 'Consumer groups enable parallel processing while maintaining ordering guarantees. Each worker in a consumer group processes one or more partitions. When a worker fails, Kafka automatically rebalances partitions to surviving workers. Workers commit offsets only after successful processing to ensure at-least-once delivery. Batch processing (100 messages per poll) improves throughput while maintaining reasonable latency.',
          codeExample: `// Kafka Consumer with Manual Offset Commit
@Service
public class NotificationConsumer {

    @KafkaListener(
        topics = "notifications",
        groupId = "notification-workers",
        containerFactory = "kafkaListenerContainerFactory"
    )
    public void consume(
            @Payload List<NotificationMessage> messages,
            @Header(KafkaHeaders.RECEIVED_PARTITION_ID) List<Integer> partitions,
            Acknowledgment ack) {

        try {
            // Process batch in parallel
            List<CompletableFuture<Void>> futures = messages.stream()
                .map(msg -> CompletableFuture.runAsync(() -> {
                    processNotification(msg);
                }, executor))
                .collect(Collectors.toList());

            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .join();

            // Commit only after successful processing
            ack.acknowledge();

        } catch (Exception e) {
            log.error("Batch processing failed, will retry", e);
            // Don't acknowledge - messages will be redelivered
        }
    }
}`
        },
        {
          name: 'Dead Letter Queue',
          explanation: 'After maximum retries (typically 7 attempts with exponential backoff: 1s, 2s, 4s, 8s, 16s, 32s, 64s), failed messages are moved to a Dead Letter Queue (DLQ) for manual investigation. The DLQ is a separate Kafka topic with longer retention. Operators can inspect DLQ messages, fix underlying issues, and replay them. Common DLQ reasons include invalid device tokens, unsubscribed users, or provider outages.',
          codeExample: `// Retry Handler with DLQ
@Service
public class RetryHandler {
    private static final int MAX_RETRIES = 7;
    private static final int[] BACKOFF_MS = {1000, 2000, 4000, 8000, 16000, 32000, 64000};

    public void handleFailure(NotificationMessage message, Exception error) {
        int retryCount = message.getRetryCount();

        if (retryCount >= MAX_RETRIES) {
            // Move to DLQ for manual investigation
            DeadLetterMessage dlq = DeadLetterMessage.builder()
                .originalMessage(message)
                .failureReason(error.getMessage())
                .failedAt(Instant.now())
                .retryCount(retryCount)
                .build();

            kafkaTemplate.send("notifications-dlq", message.getUserId(), dlq);

            // Alert on-call
            alertService.sendDLQAlert(dlq);

        } else {
            // Schedule retry with exponential backoff
            message.setRetryCount(retryCount + 1);
            message.setNextRetryAt(
                Instant.now().plusMillis(BACKOFF_MS[retryCount])
            );

            kafkaTemplate.send("notifications-retry", message.getUserId(), message);
        }
    }
}`
        }
      ]
    },
    {
      id: 'delivery-tracking',
      name: 'Delivery Tracking',
      icon: '📊',
      color: '#f59e0b',
      description: 'End-to-end tracking of notification lifecycle from queued to delivered with analytics and webhooks.',
      diagram: DeliveryTrackingDiagram,
      details: [
        {
          name: 'Status Lifecycle',
          explanation: 'Each notification progresses through states: QUEUED (accepted by API), PROCESSING (picked up by worker), SENT (delivered to provider), DELIVERED (confirmed by provider/device), and optionally READ (user interaction). Failed notifications enter FAILED state with retry attempts tracked. Status updates are stored in Cassandra for high write throughput and queried for user notification history.',
          codeExample: `// Notification Status Tracking
@Service
public class DeliveryTracker {
    private final CassandraTemplate cassandra;
    private final WebhookService webhookService;

    public void updateStatus(String notificationId, DeliveryStatus status) {
        // Update status in Cassandra
        NotificationLog log = NotificationLog.builder()
            .notificationId(notificationId)
            .status(status)
            .timestamp(Instant.now())
            .build();

        cassandra.insert(log);

        // Send webhook if configured
        webhookService.sendStatusUpdate(notificationId, status);

        // Update metrics
        metrics.counter("notifications.status",
            "status", status.name(),
            "channel", log.getChannel().name()
        ).increment();
    }

    public List<NotificationLog> getHistory(String userId, int limit) {
        return cassandra.select(
            Query.query(where("user_id").is(userId))
                .limit(limit)
                .sort(Sort.by("timestamp").descending()),
            NotificationLog.class
        );
    }
}`
        },
        {
          name: 'Analytics & Metrics',
          explanation: 'Key metrics include delivery rate (successful/total), latency percentiles (p50, p95, p99), queue depth (Kafka consumer lag), and error rates per channel. Email-specific metrics track open rates (via tracking pixel) and click-through rates (via redirect links). These metrics feed into dashboards and alerting systems. Alerts trigger when delivery rate drops below 99% or latency exceeds SLOs.',
          codeExample: `// Notification Analytics Service
@Service
public class AnalyticsService {
    private final MeterRegistry metrics;
    private final ClickHouseClient clickhouse;

    public NotificationStats getStats(String campaignId, TimeRange range) {
        return clickhouse.query("""
            SELECT
                count(*) as total,
                countIf(status = 'DELIVERED') as delivered,
                countIf(status = 'OPENED') as opened,
                countIf(status = 'CLICKED') as clicked,
                avg(delivery_time_ms) as avg_latency,
                quantile(0.95)(delivery_time_ms) as p95_latency
            FROM notification_events
            WHERE campaign_id = ?
              AND timestamp BETWEEN ? AND ?
            """, campaignId, range.getStart(), range.getEnd());
    }

    public void recordDelivery(NotificationEvent event) {
        // Track latency distribution
        metrics.timer("notification.delivery.latency",
            "channel", event.getChannel().name(),
            "priority", event.getPriority().name()
        ).record(event.getDeliveryTime());

        // Track success/failure
        metrics.counter("notification.delivery",
            "channel", event.getChannel().name(),
            "status", event.getStatus().name()
        ).increment();
    }
}`
        },
        {
          name: 'Webhooks & Callbacks',
          explanation: 'External services can subscribe to delivery status updates via webhooks. When a notification status changes, the system sends an HTTP POST to registered callback URLs. Webhook delivery uses the same retry logic as notifications. Payload includes notification ID, new status, timestamp, and optional metadata. This enables real-time integration with CRM systems, analytics platforms, and custom dashboards.',
          codeExample: `// Webhook Delivery Service
@Service
public class WebhookService {
    private final WebClient webClient;
    private final RetryTemplate retryTemplate;

    public void sendStatusUpdate(String notificationId, DeliveryStatus status) {
        List<WebhookSubscription> subscribers = subscriptionRepo
            .findByEventType(EventType.DELIVERY_STATUS);

        for (WebhookSubscription sub : subscribers) {
            WebhookPayload payload = WebhookPayload.builder()
                .eventType("notification.status_updated")
                .notificationId(notificationId)
                .status(status.name())
                .timestamp(Instant.now())
                .build();

            // Sign payload with HMAC
            String signature = hmacSigner.sign(payload, sub.getSecret());

            CompletableFuture.runAsync(() -> {
                retryTemplate.execute(ctx -> {
                    webClient.post()
                        .uri(sub.getCallbackUrl())
                        .header("X-Webhook-Signature", signature)
                        .bodyValue(payload)
                        .retrieve()
                        .toBodilessEntity()
                        .block(Duration.ofSeconds(10));
                    return null;
                });
            });
        }
    }
}`
        }
      ]
    },
    {
      id: 'rate-limiting',
      name: 'Rate Limiting',
      icon: '🚦',
      color: '#ef4444',
      description: 'Multi-level rate limiting using Redis Token Bucket to protect users from spam and system from overload.',
      diagram: PriorityQueueDiagram,
      details: [
        {
          name: 'Per-User Limits',
          explanation: 'User-level rate limits prevent notification fatigue and abuse. Typical limits are 100 push/hour, 10 email/hour, and 5 SMS/day. Limits are tracked per channel in Redis using sliding window counters. When a user exceeds their limit, notifications are either queued for later (for low priority) or blocked (for non-critical). Critical notifications like security alerts bypass user limits.',
          codeExample: `// Per-User Rate Limiter
@Service
public class UserRateLimiter {
    private final RedisTemplate<String, Long> redis;

    // Limits per channel
    private static final Map<Channel, RateLimit> LIMITS = Map.of(
        Channel.PUSH, new RateLimit(100, Duration.ofHours(1)),
        Channel.EMAIL, new RateLimit(10, Duration.ofHours(1)),
        Channel.SMS, new RateLimit(5, Duration.ofDays(1))
    );

    public boolean tryAcquire(String userId, Channel channel, Priority priority) {
        // Critical notifications bypass rate limits
        if (priority == Priority.URGENT) {
            return true;
        }

        String key = String.format("ratelimit:%s:%s", userId, channel);
        RateLimit limit = LIMITS.get(channel);

        // Sliding window counter using Redis
        long now = System.currentTimeMillis();
        long windowStart = now - limit.getWindow().toMillis();

        // Remove old entries and count current
        redis.opsForZSet().removeRangeByScore(key, 0, windowStart);
        Long count = redis.opsForZSet().zCard(key);

        if (count >= limit.getMaxRequests()) {
            return false;
        }

        // Add current request
        redis.opsForZSet().add(key, now, now);
        redis.expire(key, limit.getWindow());

        return true;
    }
}`
        },
        {
          name: 'Per-Service Limits',
          explanation: 'Service-level rate limits prevent any single service from overwhelming the notification system. Each calling service has a quota (e.g., 10K notifications/sec). This protects against misconfigured services or runaway loops. Limits are enforced at the API gateway using Redis-backed token buckets. Services approaching their limit receive 429 responses with Retry-After headers.',
          codeExample: `// Service Rate Limiter (Token Bucket)
@Service
public class ServiceRateLimiter {
    private final RedisTemplate<String, String> redis;

    // Service quotas (notifications per second)
    private static final Map<String, Integer> QUOTAS = Map.of(
        "order-service", 10000,
        "marketing-service", 5000,
        "social-service", 20000
    );

    public RateLimitResult checkLimit(String serviceId) {
        int quota = QUOTAS.getOrDefault(serviceId, 1000);
        String key = "service_ratelimit:" + serviceId;

        // Token bucket implementation
        String luaScript = """
            local tokens = tonumber(redis.call('get', KEYS[1]) or %d)
            local last_refill = tonumber(redis.call('get', KEYS[2]) or 0)
            local now = tonumber(ARGV[1])
            local rate = tonumber(ARGV[2])

            -- Refill tokens
            local elapsed = now - last_refill
            tokens = math.min(rate, tokens + elapsed * rate / 1000)

            if tokens >= 1 then
                redis.call('set', KEYS[1], tokens - 1)
                redis.call('set', KEYS[2], now)
                return 1
            else
                return 0
            end
            """.formatted(quota);

        Long result = redis.execute(
            new DefaultRedisScript<>(luaScript, Long.class),
            List.of(key + ":tokens", key + ":last"),
            String.valueOf(System.currentTimeMillis()),
            String.valueOf(quota)
        );

        return result == 1 ? RateLimitResult.ALLOWED : RateLimitResult.BLOCKED;
    }
}`
        },
        {
          name: 'Priority Queues',
          explanation: 'Notifications are sorted into priority queues: P0 (URGENT), P1 (HIGH), P2 (NORMAL), P3 (LOW). Each priority level has different latency SLOs and retry policies. P0 messages (security alerts, fraud) get <100ms latency with aggressive retries. P3 messages (marketing) are best-effort and may be dropped under load. The priority sorter uses a heap-based algorithm with O(log n) complexity.',
          codeExample: `// Priority Queue Manager
@Service
public class PriorityQueueManager {
    private final Map<Priority, BlockingQueue<NotificationMessage>> queues;
    private final ScheduledExecutorService scheduler;

    public PriorityQueueManager() {
        this.queues = Map.of(
            Priority.URGENT, new PriorityBlockingQueue<>(1000,
                Comparator.comparing(NotificationMessage::getCreatedAt)),
            Priority.HIGH, new LinkedBlockingQueue<>(10000),
            Priority.NORMAL, new LinkedBlockingQueue<>(100000),
            Priority.LOW, new LinkedBlockingQueue<>(1000000)
        );

        // Worker threads per priority
        startWorkers(Priority.URGENT, 10);  // More workers for urgent
        startWorkers(Priority.HIGH, 5);
        startWorkers(Priority.NORMAL, 3);
        startWorkers(Priority.LOW, 1);
    }

    public void enqueue(NotificationMessage message) {
        Priority priority = message.getPriority();
        BlockingQueue<NotificationMessage> queue = queues.get(priority);

        if (!queue.offer(message)) {
            if (priority == Priority.LOW) {
                // Drop low priority under pressure
                metrics.counter("notifications.dropped", "priority", "LOW").increment();
            } else {
                // Retry for higher priority
                throw new QueueFullException("Queue full for " + priority);
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'scaling',
      name: 'Horizontal Scaling',
      icon: '📈',
      color: '#8b5cf6',
      description: 'Auto-scaling architecture to handle 10M+ notifications per second with sub-second latency.',
      diagram: ScalingDiagram,
      details: [
        {
          name: 'API Server Scaling',
          explanation: 'API servers are stateless and scale horizontally behind a Layer 7 load balancer. Kubernetes Horizontal Pod Autoscaler (HPA) adds pods when CPU exceeds 70% or request queue grows. Typical range is 10-100 pods. Each pod handles ~10K requests/second. The load balancer uses least-connections algorithm for even distribution. Health checks remove unhealthy pods within 30 seconds.',
          codeExample: `# Kubernetes HPA for API Servers
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: notification-api
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: notification-api
  minReplicas: 10
  maxReplicas: 100
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: 10000
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60`
        },
        {
          name: 'Worker Scaling',
          explanation: 'Notification workers scale based on Kafka consumer lag. When lag exceeds 1M messages, new workers are added. Each worker processes messages from 1+ partitions. With 100 partitions, maximum parallelism is 100 workers per consumer group. Workers use batch processing (100 messages per poll) with parallel execution (10 threads per worker). This achieves ~10K notifications/second per worker.',
          codeExample: `// Worker Auto-Scaling based on Kafka Lag
@Service
public class WorkerScaler {
    private final KafkaAdminClient adminClient;
    private final KubernetesClient k8sClient;

    @Scheduled(fixedRate = 30000)  // Check every 30s
    public void checkAndScale() {
        // Get consumer lag
        Map<TopicPartition, Long> lag = adminClient
            .listConsumerGroupOffsets("notification-workers")
            .partitionsToOffsetAndMetadata()
            .get()
            .entrySet()
            .stream()
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                e -> getEndOffset(e.getKey()) - e.getValue().offset()
            ));

        long totalLag = lag.values().stream().mapToLong(Long::longValue).sum();
        int currentReplicas = getCurrentReplicas();

        if (totalLag > 1_000_000 && currentReplicas < 100) {
            // Scale up
            int newReplicas = Math.min(100, currentReplicas + 10);
            scaleDeployment("notification-worker", newReplicas);
            log.info("Scaling up workers: {} -> {} (lag: {})",
                currentReplicas, newReplicas, totalLag);
        } else if (totalLag < 10_000 && currentReplicas > 10) {
            // Scale down gradually
            int newReplicas = Math.max(10, currentReplicas - 5);
            scaleDeployment("notification-worker", newReplicas);
        }
    }
}`
        },
        {
          name: 'Database Sharding',
          explanation: 'Cassandra handles notification logs with write-optimized storage, partitioned by (user_id, date). PostgreSQL stores user preferences, sharded by user_id with read replicas for heavy read traffic. Redis Cluster (50+ nodes, 500GB memory) provides sub-millisecond access for rate limiting and caching. Each database is sized for 10x expected load to handle traffic spikes.',
          codeExample: `// Database Configuration for Scale
@Configuration
public class DatabaseConfig {

    @Bean
    public CassandraClusterSession cassandraSession() {
        return CqlSession.builder()
            .addContactPoints(cassandraNodes)  // 20+ nodes
            .withLocalDatacenter("us-east-1")
            .withKeyspace("notifications")
            .build();
    }

    @Bean
    public RedisClusterClient redisCluster() {
        RedisClusterClient client = RedisClusterClient.create(
            RedisURI.Builder
                .redis(redisClusterHost)
                .withPassword(password)
                .build()
        );

        // Connection pooling
        client.setOptions(ClusterClientOptions.builder()
            .topologyRefreshOptions(
                ClusterTopologyRefreshOptions.builder()
                    .enablePeriodicRefresh(Duration.ofMinutes(1))
                    .enableAllAdaptiveRefreshTriggers()
                    .build())
            .build());

        return client;
    }

    // Read replicas for PostgreSQL
    @Bean
    public DataSource readReplicaDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(readReplicaUrl);
        config.setMaximumPoolSize(50);
        config.setReadOnly(true);
        return new HikariDataSource(config);
    }
}`
        }
      ]
    },
    {
      id: 'reliability',
      name: 'Reliability & Monitoring',
      icon: '🛡️',
      color: '#06b6d4',
      description: 'At-least-once delivery guarantees with idempotency, distributed tracing, and comprehensive alerting.',
      diagram: NotificationArchitectureDiagram,
      details: [
        {
          name: 'Idempotency & Deduplication',
          explanation: 'Each notification receives a unique ID (UUID) at the API gateway. Before processing, workers check Redis for existing notification_id with 24-hour TTL. If found, the notification is skipped (already processed). This prevents duplicate sends during retries. For bulk notifications, content-based deduplication groups similar messages (e.g., "5 new messages" instead of 5 separate notifications).',
          codeExample: `// Idempotency Handler
@Service
public class IdempotencyHandler {
    private final RedisTemplate<String, String> redis;
    private static final Duration IDEMPOTENCY_TTL = Duration.ofHours(24);

    public boolean isDuplicate(String notificationId) {
        String key = "idempotency:" + notificationId;

        // Try to set if not exists (SETNX)
        Boolean isNew = redis.opsForValue()
            .setIfAbsent(key, "1", IDEMPOTENCY_TTL);

        return !Boolean.TRUE.equals(isNew);
    }

    public void processWithIdempotency(NotificationMessage message) {
        if (isDuplicate(message.getNotificationId())) {
            log.info("Duplicate notification skipped: {}", message.getNotificationId());
            metrics.counter("notifications.duplicates").increment();
            return;
        }

        try {
            deliveryService.send(message);
        } catch (Exception e) {
            // Clear idempotency key on failure for retry
            redis.delete("idempotency:" + message.getNotificationId());
            throw e;
        }
    }
}`
        },
        {
          name: 'Distributed Tracing',
          explanation: 'Every notification carries a trace ID through the entire pipeline: API -> Queue -> Worker -> Provider -> Delivery. OpenTelemetry integration with Jaeger/Zipkin provides end-to-end visibility. Each span records timing, status, and metadata. This enables debugging delivery issues, identifying bottlenecks, and measuring end-to-end latency. Traces are sampled (1-10%) for production traffic.',
          codeExample: `// Distributed Tracing with OpenTelemetry
@Service
public class TracedNotificationService {
    private final Tracer tracer;

    public void processNotification(NotificationMessage message) {
        // Extract trace context from message headers
        Context parentContext = propagator.extract(
            Context.current(),
            message.getHeaders(),
            getter
        );

        Span span = tracer.spanBuilder("process_notification")
            .setParent(parentContext)
            .setAttribute("notification.id", message.getNotificationId())
            .setAttribute("notification.channel", message.getChannel().name())
            .setAttribute("notification.priority", message.getPriority().name())
            .setAttribute("user.id", message.getUserId())
            .startSpan();

        try (Scope scope = span.makeCurrent()) {
            // Check preferences
            Span prefSpan = tracer.spanBuilder("check_preferences").startSpan();
            boolean allowed = preferencesService.isAllowed(message);
            prefSpan.end();

            if (!allowed) {
                span.setAttribute("notification.blocked", true);
                return;
            }

            // Send to provider
            Span sendSpan = tracer.spanBuilder("send_to_provider")
                .setAttribute("provider.name", getProvider(message.getChannel()))
                .startSpan();
            deliveryService.send(message);
            sendSpan.end();

            span.setStatus(StatusCode.OK);
        } catch (Exception e) {
            span.setStatus(StatusCode.ERROR, e.getMessage());
            span.recordException(e);
            throw e;
        } finally {
            span.end();
        }
    }
}`
        },
        {
          name: 'Alerting & Incident Response',
          explanation: 'Critical alerts trigger when: delivery rate < 99% for 5 minutes, p95 latency > 5 seconds, DLQ size > 1000, or provider errors spike. Alerts go to PagerDuty for on-call rotation. Runbooks document common issues and fixes. Dashboards show real-time metrics: throughput, latency distributions, queue depths, and error rates. Weekly reliability reviews analyze incidents and drive improvements.',
          codeExample: `# Prometheus Alerting Rules
groups:
- name: notification-alerts
  rules:
  - alert: LowDeliveryRate
    expr: |
      sum(rate(notifications_delivered_total[5m])) /
      sum(rate(notifications_sent_total[5m])) < 0.99
    for: 5m
    labels:
      severity: critical
      team: notifications
    annotations:
      summary: "Notification delivery rate below 99%"
      description: "Current rate: {{ $value | humanizePercentage }}"
      runbook: "https://runbooks.internal/notifications/low-delivery"

  - alert: HighLatency
    expr: |
      histogram_quantile(0.95,
        rate(notification_delivery_seconds_bucket[5m])) > 5
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "p95 latency exceeds 5 seconds"

  - alert: DLQGrowing
    expr: |
      kafka_consumer_group_lag{topic="notifications-dlq"} > 1000
    for: 10m
    labels:
      severity: critical
    annotations:
      summary: "DLQ has > 1000 messages"`
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
      { name: 'Design', icon: '🏗️', page: 'Design' },
      { name: 'Notification System', icon: '🔔', page: 'Notification System' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
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
    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(251, 191, 36, 0.2)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '0.5rem',
    color: '#fbbf24',
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
        <h1 style={titleStyle}>Notification System Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(251, 191, 36, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(251, 191, 36, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to Design
        </button>
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
              border: `1px solid ${selectedConcept.color}40`,
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={TOPIC_COLORS}
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
                >&larr;</button>
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
                >&rarr;</button>
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
                >&times;</button>
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

export default NotificationSystem

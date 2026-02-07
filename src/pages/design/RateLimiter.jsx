import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import CompletionCheckbox from '../../components/CompletionCheckbox'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#ef4444',
  primaryHover: '#f87171',
  bg: 'rgba(239, 68, 68, 0.1)',
  border: 'rgba(239, 68, 68, 0.3)',
  arrow: '#ef4444',
  hoverBg: 'rgba(239, 68, 68, 0.2)',
  topicBg: 'rgba(239, 68, 68, 0.2)'
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

const RateLimiterArchitectureDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6d28d9', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="gatewayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="rateLimiterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="backendGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowArch" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#60a5fa" />
      </marker>
      <marker id="arrowReject" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
      </marker>
    </defs>

    <rect x="30" y="60" width="100" height="80" rx="10" fill="url(#clientGrad)" />
    <text x="80" y="95" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Client</text>
    <text x="80" y="115" fontSize="10" fill="white" opacity="0.8" textAnchor="middle">Requests</text>

    <line x1="130" y1="100" x2="195" y2="100" stroke="#60a5fa" strokeWidth="3" markerEnd="url(#arrowArch)" />
    <text x="162" y="90" fontSize="9" fill="#9ca3af" textAnchor="middle">HTTP</text>

    <rect x="200" y="60" width="120" height="80" rx="10" fill="url(#gatewayGrad)" />
    <text x="260" y="90" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">API Gateway</text>
    <text x="260" y="108" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Load Balancer</text>
    <text x="260" y="122" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Authentication</text>

    <line x1="320" y1="100" x2="395" y2="100" stroke="#60a5fa" strokeWidth="3" markerEnd="url(#arrowArch)" />
    <text x="357" y="90" fontSize="9" fill="#9ca3af" textAnchor="middle">Check</text>

    <rect x="400" y="40" width="140" height="120" rx="10" fill="url(#rateLimiterGrad)" />
    <text x="470" y="70" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Rate Limiter</text>
    <text x="470" y="90" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Token Bucket</text>
    <text x="470" y="105" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Sliding Window</text>
    <text x="470" y="120" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Leaky Bucket</text>
    <text x="470" y="135" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Fixed Window</text>

    <line x1="540" y1="80" x2="615" y2="80" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowArch)" />
    <text x="577" y="70" fontSize="9" fill="#10b981" textAnchor="middle">Allowed</text>

    <rect x="620" y="50" width="120" height="80" rx="10" fill="url(#backendGrad)" />
    <text x="680" y="85" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Backend</text>
    <text x="680" y="103" fontSize="10" fill="white" opacity="0.8" textAnchor="middle">Services</text>

    <path d="M 470 160 L 470 180 L 80 180 L 80 145" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowReject)" />
    <text x="275" y="175" fontSize="9" fill="#ef4444" textAnchor="middle">429 Too Many Requests</text>

    <text x="400" y="20" fontSize="11" fontWeight="600" fill="#60a5fa" textAnchor="middle">Rate Limiting Architecture</text>
  </svg>
)

const TokenBucketDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="bucketGradTB" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="tokenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowTB" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
    </defs>

    <text x="350" y="20" fontSize="12" fontWeight="600" fill="#60a5fa" textAnchor="middle">Token Bucket Algorithm</text>

    <rect x="30" y="40" width="100" height="60" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="80" y="65" fontSize="11" fontWeight="600" fill="#10b981" textAnchor="middle">Refill</text>
    <text x="80" y="82" fontSize="9" fill="#9ca3af" textAnchor="middle">1 token/sec</text>

    <rect x="200" y="50" width="120" height="110" rx="0" ry="0" fill="url(#bucketGradTB)" stroke="#1d4ed8" strokeWidth="3" />
    <path d="M 200 50 L 180 50 L 180 160 L 200 160" fill="none" stroke="#1d4ed8" strokeWidth="3" />
    <path d="M 320 50 L 340 50 L 340 160 L 320 160" fill="none" stroke="#1d4ed8" strokeWidth="3" />

    <circle cx="230" cy="130" r="12" fill="url(#tokenGrad)" />
    <circle cx="260" cy="130" r="12" fill="url(#tokenGrad)" />
    <circle cx="290" cy="130" r="12" fill="url(#tokenGrad)" />
    <circle cx="245" cy="100" r="12" fill="url(#tokenGrad)" />
    <circle cx="275" cy="100" r="12" fill="url(#tokenGrad)" />
    <text x="260" y="75" fontSize="10" fill="white" textAnchor="middle">5/10 tokens</text>

    <line x1="130" y1="70" x2="200" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowTB)" />

    <rect x="420" y="50" width="100" height="50" rx="6" fill="#374151" />
    <text x="470" y="72" fontSize="10" fontWeight="600" fill="#10b981" textAnchor="middle">Request</text>
    <text x="470" y="88" fontSize="9" fill="#9ca3af" textAnchor="middle">-1 token</text>

    <line x1="340" y1="105" x2="420" y2="75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowTB)" />

    <rect x="550" y="40" width="120" height="50" rx="6" fill="#10b981" />
    <text x="610" y="70" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Allowed</text>

    <rect x="550" y="110" width="120" height="50" rx="6" fill="#ef4444" />
    <text x="610" y="140" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Rejected</text>
  </svg>
)

const LeakyBucketDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="bucketGradLB" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 0.8 }} />
      </linearGradient>
      <marker id="arrowLB" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
    </defs>

    <text x="350" y="20" fontSize="12" fontWeight="600" fill="#60a5fa" textAnchor="middle">Leaky Bucket Algorithm</text>

    <rect x="30" y="40" width="120" height="50" rx="6" fill="#374151" />
    <text x="90" y="60" fontSize="10" fontWeight="600" fill="#f59e0b" textAnchor="middle">Burst Requests</text>
    <text x="90" y="75" fontSize="9" fill="#9ca3af" textAnchor="middle">(variable rate)</text>

    <path d="M 230 40 L 210 40 L 210 140 L 230 140" fill="none" stroke="url(#bucketGradLB)" strokeWidth="4" />
    <path d="M 330 40 L 350 40 L 350 140 L 330 140" fill="none" stroke="url(#bucketGradLB)" strokeWidth="4" />
    <rect x="230" y="40" width="100" height="100" rx="0" fill="none" stroke="url(#bucketGradLB)" strokeWidth="4" />
    <rect x="235" y="70" width="90" height="65" rx="2" fill="url(#waterGrad)" />
    <text x="280" y="105" fontSize="10" fill="white" textAnchor="middle">Queue</text>

    <line x1="150" y1="65" x2="210" y2="65" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowLB)" />

    <circle cx="280" cy="155" r="8" fill="#10b981" />
    <line x1="280" y1="163" x2="280" y2="175" stroke="#10b981" strokeWidth="3" />
    <text x="280" y="175" fontSize="8" fill="#10b981" textAnchor="middle" dy="8">leak</text>

    <rect x="420" y="60" width="130" height="50" rx="6" fill="#10b981" />
    <text x="485" y="80" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">Processed</text>
    <text x="485" y="95" fontSize="9" fill="white" opacity="0.9" textAnchor="middle">(constant rate)</text>

    <line x1="350" y1="90" x2="420" y2="85" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowLB)" />

    <rect x="570" y="40" width="120" height="100" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="630" y="65" fontSize="10" fontWeight="600" fill="#06b6d4" textAnchor="middle">Key Properties</text>
    <text x="580" y="85" fontSize="9" fill="#9ca3af">Smooth output</text>
    <text x="580" y="102" fontSize="9" fill="#9ca3af">Queue overflow</text>
    <text x="580" y="119" fontSize="9" fill="#9ca3af">Fixed leak rate</text>
  </svg>
)

const FixedWindowDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="window1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 0.3 }} />
        <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 0.3 }} />
      </linearGradient>
      <linearGradient id="window2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.3 }} />
        <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.3 }} />
      </linearGradient>
    </defs>

    <text x="350" y="20" fontSize="12" fontWeight="600" fill="#60a5fa" textAnchor="middle">Fixed Window Counter Algorithm</text>

    <line x1="50" y1="120" x2="650" y2="120" stroke="#374151" strokeWidth="2" />

    <rect x="100" y="60" width="200" height="50" rx="4" fill="url(#window1Grad)" stroke="#ef4444" strokeWidth="2" />
    <text x="200" y="50" fontSize="10" fontWeight="600" fill="#ef4444" textAnchor="middle">Window 1 (12:00-12:01)</text>
    <text x="200" y="90" fontSize="14" fontWeight="bold" fill="#ef4444" textAnchor="middle">8/10</text>

    <rect x="300" y="60" width="200" height="50" rx="4" fill="url(#window2Grad)" stroke="#10b981" strokeWidth="2" />
    <text x="400" y="50" fontSize="10" fontWeight="600" fill="#10b981" textAnchor="middle">Window 2 (12:01-12:02)</text>
    <text x="400" y="90" fontSize="14" fontWeight="bold" fill="#10b981" textAnchor="middle">3/10</text>

    <rect x="500" y="60" width="150" height="50" rx="4" fill="#374151" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" />
    <text x="575" y="90" fontSize="12" fill="#6b7280" textAnchor="middle">Next...</text>

    <line x1="100" y1="115" x2="100" y2="125" stroke="#ef4444" strokeWidth="2" />
    <line x1="300" y1="115" x2="300" y2="125" stroke="#f59e0b" strokeWidth="2" />
    <line x1="500" y1="115" x2="500" y2="125" stroke="#6b7280" strokeWidth="2" />

    <text x="100" y="140" fontSize="9" fill="#9ca3af" textAnchor="middle">12:00</text>
    <text x="300" y="140" fontSize="9" fill="#9ca3af" textAnchor="middle">12:01</text>
    <text x="500" y="140" fontSize="9" fill="#9ca3af" textAnchor="middle">12:02</text>

    <text x="350" y="165" fontSize="10" fill="#6b7280" textAnchor="middle">Counter resets at window boundary</text>
  </svg>
)

const SlidingWindowLogDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.3 }} />
        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.3 }} />
      </linearGradient>
    </defs>

    <text x="350" y="20" fontSize="12" fontWeight="600" fill="#60a5fa" textAnchor="middle">Sliding Window Log Algorithm</text>

    <line x1="50" y1="100" x2="650" y2="100" stroke="#374151" strokeWidth="2" />
    <text x="350" y="140" fontSize="11" fill="#9ca3af" textAnchor="middle">Timeline (seconds)</text>

    <rect x="250" y="40" width="350" height="50" rx="4" fill="url(#windowGrad)" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" />
    <text x="425" y="32" fontSize="10" fontWeight="600" fill="#8b5cf6" textAnchor="middle">Sliding Window (60s)</text>

    <circle cx="100" cy="100" r="8" fill="#6b7280" />
    <text x="100" y="85" fontSize="9" fill="#6b7280" textAnchor="middle">t-90s</text>
    <text x="100" y="120" fontSize="8" fill="#6b7280" textAnchor="middle">(expired)</text>

    <circle cx="280" cy="100" r="8" fill="#10b981" />
    <text x="280" y="70" fontSize="9" fill="#10b981" textAnchor="middle">t-45s</text>

    <circle cx="350" cy="100" r="8" fill="#10b981" />
    <text x="350" y="70" fontSize="9" fill="#10b981" textAnchor="middle">t-30s</text>

    <circle cx="420" cy="100" r="8" fill="#10b981" />
    <text x="420" y="70" fontSize="9" fill="#10b981" textAnchor="middle">t-15s</text>

    <circle cx="550" cy="100" r="8" fill="#f59e0b" />
    <text x="550" y="70" fontSize="9" fill="#f59e0b" textAnchor="middle">NOW</text>

    <text x="350" y="160" fontSize="10" fill="#9ca3af" textAnchor="middle">Count requests in window: 4</text>
  </svg>
)

const SlidingWindowCounterDiagram = () => (
  <svg viewBox="0 0 750 200" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="prevWindowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.4 }} />
        <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 0.2 }} />
      </linearGradient>
      <linearGradient id="currWindowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.3 }} />
        <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.5 }} />
      </linearGradient>
    </defs>

    <text x="375" y="20" fontSize="12" fontWeight="600" fill="#60a5fa" textAnchor="middle">Sliding Window Counter (Hybrid)</text>

    <line x1="50" y1="130" x2="700" y2="130" stroke="#374151" strokeWidth="2" />

    <rect x="100" y="70" width="200" height="50" rx="4" fill="url(#prevWindowGrad)" stroke="#6366f1" strokeWidth="2" />
    <text x="200" y="60" fontSize="10" fontWeight="600" fill="#6366f1" textAnchor="middle">Previous Window</text>
    <text x="200" y="100" fontSize="14" fontWeight="bold" fill="#6366f1" textAnchor="middle">7 requests</text>

    <rect x="300" y="70" width="200" height="50" rx="4" fill="url(#currWindowGrad)" stroke="#10b981" strokeWidth="2" />
    <text x="400" y="60" fontSize="10" fontWeight="600" fill="#10b981" textAnchor="middle">Current Window</text>
    <text x="400" y="100" fontSize="14" fontWeight="bold" fill="#10b981" textAnchor="middle">3 requests</text>

    <rect x="225" y="65" width="200" height="60" rx="4" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8,4" />
    <text x="325" y="145" fontSize="10" fontWeight="600" fill="#f59e0b" textAnchor="middle">Sliding Window</text>

    <line x1="100" y1="125" x2="100" y2="135" stroke="#6366f1" strokeWidth="2" />
    <text x="100" y="148" fontSize="9" fill="#9ca3af" textAnchor="middle">t-120s</text>

    <line x1="300" y1="125" x2="300" y2="135" stroke="#6366f1" strokeWidth="2" />
    <text x="300" y="148" fontSize="9" fill="#9ca3af" textAnchor="middle">t-60s</text>

    <line x1="500" y1="125" x2="500" y2="135" stroke="#10b981" strokeWidth="2" />
    <text x="500" y="148" fontSize="9" fill="#9ca3af" textAnchor="middle">NOW</text>

    <rect x="530" y="55" width="200" height="100" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="630" y="78" fontSize="10" fontWeight="600" fill="#f59e0b" textAnchor="middle">Weighted Count Formula</text>
    <text x="630" y="98" fontSize="9" fill="#9ca3af" textAnchor="middle">progress = 75% into window</text>
    <text x="630" y="118" fontSize="9" fill="#e5e7eb" textAnchor="middle">7 x 0.25 + 3 = 4.75</text>
    <text x="630" y="138" fontSize="9" fill="#10b981" textAnchor="middle">If limit=10: ALLOWED</text>
  </svg>
)

const DistributedRateLimiterDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="serverGradDist" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="redisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#b91c1c', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="lbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowDist" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
      <marker id="arrowRedis" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#dc2626" />
      </marker>
    </defs>

    <text x="400" y="20" fontSize="12" fontWeight="600" fill="#60a5fa" textAnchor="middle">Distributed Rate Limiting with Redis</text>

    <rect x="30" y="100" width="100" height="80" rx="8" fill="url(#lbGrad)" />
    <text x="80" y="135" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Load</text>
    <text x="80" y="150" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Balancer</text>

    <line x1="130" y1="120" x2="195" y2="70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowDist)" />
    <line x1="130" y1="140" x2="195" y2="140" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowDist)" />
    <line x1="130" y1="160" x2="195" y2="210" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowDist)" />

    <rect x="200" y="40" width="130" height="60" rx="8" fill="url(#serverGradDist)" />
    <text x="265" y="65" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">API Server 1</text>
    <text x="265" y="82" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Rate Limiter Client</text>

    <rect x="200" y="110" width="130" height="60" rx="8" fill="url(#serverGradDist)" />
    <text x="265" y="135" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">API Server 2</text>
    <text x="265" y="152" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Rate Limiter Client</text>

    <rect x="200" y="180" width="130" height="60" rx="8" fill="url(#serverGradDist)" />
    <text x="265" y="205" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">API Server 3</text>
    <text x="265" y="222" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Rate Limiter Client</text>

    <line x1="330" y1="70" x2="420" y2="120" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowRedis)" strokeDasharray="4,4" />
    <line x1="330" y1="140" x2="420" y2="140" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowRedis)" strokeDasharray="4,4" />
    <line x1="330" y1="210" x2="420" y2="160" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowRedis)" strokeDasharray="4,4" />

    <rect x="425" y="90" width="150" height="100" rx="10" fill="url(#redisGrad)" />
    <text x="500" y="120" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">Redis Cluster</text>
    <text x="500" y="140" fontSize="9" fill="white" opacity="0.9" textAnchor="middle">INCR user:123:count</text>
    <text x="500" y="155" fontSize="9" fill="white" opacity="0.9" textAnchor="middle">EXPIRE user:123:count 60</text>
    <text x="500" y="170" fontSize="9" fill="white" opacity="0.9" textAnchor="middle">GET user:123:count</text>

    <rect x="600" y="50" width="180" height="180" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="690" y="75" fontSize="11" fontWeight="600" fill="#10b981" textAnchor="middle">Benefits</text>
    <text x="615" y="100" fontSize="9" fill="#9ca3af">Shared state</text>
    <text x="615" y="118" fontSize="9" fill="#9ca3af">Atomic operations</text>
    <text x="615" y="136" fontSize="9" fill="#9ca3af">Auto expiration (TTL)</text>
    <text x="615" y="154" fontSize="9" fill="#9ca3af">High availability</text>
    <text x="690" y="180" fontSize="11" fontWeight="600" fill="#f59e0b" textAnchor="middle">Lua Scripts</text>
    <text x="615" y="200" fontSize="9" fill="#9ca3af">EVAL for atomicity</text>
    <text x="615" y="218" fontSize="9" fill="#9ca3af">Race condition safe</text>
  </svg>
)

const ScalingDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowScale" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Rate Limiter Scaling Strategies</text>

    <rect x="50" y="60" width="150" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="125" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Local Limiter</text>
    <text x="125" y="110" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">In-memory</text>

    <rect x="300" y="60" width="150" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="375" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Distributed</text>
    <text x="375" y="110" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">Redis/Memcached</text>

    <rect x="550" y="60" width="150" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="625" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Hybrid</text>
    <text x="625" y="110" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">Local + Sync</text>

    <line x1="200" y1="95" x2="295" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowScale)"/>
    <line x1="450" y1="95" x2="545" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowScale)"/>

    <text x="125" y="155" textAnchor="middle" fill="#9ca3af" fontSize="9">Fast, simple</text>
    <text x="125" y="170" textAnchor="middle" fill="#9ca3af" fontSize="9">Single server only</text>

    <text x="375" y="155" textAnchor="middle" fill="#9ca3af" fontSize="9">Consistent</text>
    <text x="375" y="170" textAnchor="middle" fill="#9ca3af" fontSize="9">Network latency</text>

    <text x="625" y="155" textAnchor="middle" fill="#9ca3af" fontSize="9">Best of both</text>
    <text x="625" y="170" textAnchor="middle" fill="#9ca3af" fontSize="9">Eventual consistency</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function RateLimiter({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'token-bucket',
      name: 'Token Bucket Algorithm',
      icon: '🪙',
      color: '#f59e0b',
      description: 'Tokens are added at a fixed rate. Each request consumes one token. Allows burst traffic up to bucket capacity.',
      diagram: TokenBucketDiagram,
      details: [
        {
          name: 'Core Concept',
          diagram: TokenBucketDiagram,
          explanation: 'The Token Bucket algorithm controls request rates by maintaining a bucket of tokens. Tokens are added at a constant refill rate. Each request consumes one token. Requests are allowed only if tokens are available. The bucket has a maximum capacity, limiting burst size. This allows controlled burst traffic while maintaining an average rate limit.',
          codeExample: `class TokenBucket {
    private int capacity;
    private int tokens;
    private double refillRate; // tokens per second
    private long lastRefillTime;

    public TokenBucket(int capacity, double refillRate) {
        this.capacity = capacity;
        this.tokens = capacity; // Start full
        this.refillRate = refillRate;
        this.lastRefillTime = System.currentTimeMillis();
    }

    public synchronized boolean allowRequest(long timestamp) {
        refill(timestamp);

        if (tokens > 0) {
            tokens--;
            return true;
        }
        return false;
    }

    private void refill(long timestamp) {
        long timePassed = timestamp - lastRefillTime;
        int tokensToAdd = (int) (timePassed / 1000.0 * refillRate);

        if (tokensToAdd > 0) {
            tokens = Math.min(capacity, tokens + tokensToAdd);
            lastRefillTime = timestamp;
        }
    }
}`
        },
        {
          name: 'With Request Cost',
          explanation: 'Different requests can consume different numbers of tokens based on their cost. For example, a simple read operation might cost 1 token, while a complex write operation costs 5 tokens. This allows for fine-grained rate limiting based on operation complexity.',
          codeExample: `class TokenBucketWithCost {
    private int capacity;
    private double tokens;
    private double refillRate;
    private long lastRefillTime;

    public TokenBucketWithCost(int capacity, double refillRate) {
        this.capacity = capacity;
        this.tokens = capacity;
        this.refillRate = refillRate;
        this.lastRefillTime = System.nanoTime();
    }

    public synchronized boolean allowRequest(int cost) {
        refill();

        if (tokens >= cost) {
            tokens -= cost;
            return true;
        }
        return false;
    }

    private void refill() {
        long now = System.nanoTime();
        double timePassed = (now - lastRefillTime) / 1_000_000_000.0;

        double tokensToAdd = timePassed * refillRate;
        tokens = Math.min(capacity, tokens + tokensToAdd);
        lastRefillTime = now;
    }
}`
        },
        {
          name: 'Per-User Bucket',
          explanation: 'In production systems, each user typically has their own token bucket. This isolates users from each other, preventing one user from consuming all available capacity. The implementation uses a ConcurrentHashMap for thread-safe access to user buckets.',
          codeExample: `class RateLimiterTokenBucket {
    private class Bucket {
        int tokens;
        long lastRefillTime;

        Bucket(int capacity) {
            this.tokens = capacity;
            this.lastRefillTime = System.currentTimeMillis();
        }
    }

    private Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    private int capacity;
    private double refillRate;

    public boolean allowRequest(String userId) {
        buckets.putIfAbsent(userId, new Bucket(capacity));
        Bucket bucket = buckets.get(userId);

        synchronized (bucket) {
            refill(bucket);

            if (bucket.tokens > 0) {
                bucket.tokens--;
                return true;
            }
            return false;
        }
    }

    public void cleanup() {
        long threshold = System.currentTimeMillis() - 3600000;
        buckets.entrySet().removeIf(e ->
            e.getValue().lastRefillTime < threshold);
    }
}`
        }
      ]
    },
    {
      id: 'leaky-bucket',
      name: 'Leaky Bucket Algorithm',
      icon: '💧',
      color: '#06b6d4',
      description: 'Requests fill a bucket that leaks at a constant rate. Provides smooth output rate and prevents bursts.',
      diagram: LeakyBucketDiagram,
      details: [
        {
          name: 'Core Concept',
          diagram: LeakyBucketDiagram,
          explanation: 'The Leaky Bucket algorithm smooths traffic by processing requests at a constant rate. Incoming requests fill a bucket (queue). The bucket "leaks" at a fixed rate, processing queued requests. If the bucket overflows (queue full), new requests are rejected. This ensures a smooth, predictable output rate regardless of input burstiness.',
          codeExample: `class LeakyBucket {
    private Queue<Long> bucket;
    private int capacity;
    private double leakRate; // requests per second
    private long lastLeakTime;

    public LeakyBucket(int capacity, double leakRate) {
        this.bucket = new LinkedList<>();
        this.capacity = capacity;
        this.leakRate = leakRate;
        this.lastLeakTime = System.currentTimeMillis();
    }

    public synchronized boolean addRequest(long timestamp) {
        leak(timestamp);

        if (bucket.size() < capacity) {
            bucket.offer(timestamp);
            return true;
        }
        return false;
    }

    private void leak(long timestamp) {
        long timePassed = timestamp - lastLeakTime;
        int requestsToLeak = (int) (timePassed / 1000.0 * leakRate);

        for (int i = 0; i < requestsToLeak && !bucket.isEmpty(); i++) {
            bucket.poll();
        }

        if (requestsToLeak > 0) {
            lastLeakTime = timestamp;
        }
    }
}`
        },
        {
          name: 'Water Level Variant',
          explanation: 'Instead of maintaining a queue of requests, we can track a "water level" that represents current occupancy. This is more memory-efficient (O(1) instead of O(capacity)) and faster for high-throughput systems. The water level increases with each request and decreases over time based on the leak rate.',
          codeExample: `class LeakyBucketWaterLevel {
    private double waterLevel;
    private int capacity;
    private double leakRate;
    private long lastLeakTime;

    public LeakyBucketWaterLevel(int capacity, double leakRate) {
        this.waterLevel = 0;
        this.capacity = capacity;
        this.leakRate = leakRate;
        this.lastLeakTime = System.currentTimeMillis();
    }

    public synchronized boolean addRequest(long timestamp) {
        leak(timestamp);

        if (waterLevel < capacity) {
            waterLevel += 1.0;
            return true;
        }
        return false;
    }

    private void leak(long timestamp) {
        long timePassed = timestamp - lastLeakTime;
        double leaked = (timePassed / 1000.0) * leakRate;

        waterLevel = Math.max(0, waterLevel - leaked);
        lastLeakTime = timestamp;
    }
}`
        },
        {
          name: 'Token vs Leaky Comparison',
          explanation: 'Token Bucket allows bursts (up to capacity) and is ideal for APIs where occasional burst traffic is acceptable. Leaky Bucket provides smooth output rate and is better for traffic shaping where consistent throughput is needed. Token Bucket: refills tokens, burst-friendly. Leaky Bucket: drains at fixed rate, smooth output.',
          codeExample: `/* Comparison: Token Bucket vs Leaky Bucket

Token Bucket:
- Tokens refill, request consumes
- Allows bursts up to capacity
- Good for APIs (AWS, Stripe use this)
- Example: 10 requests/minute limit
  Can burst 10 immediately if bucket full

Leaky Bucket:
- Requests queue, leak processes
- Smooth rate (no bursts at output)
- Good for traffic shaping (routers)
- Example: 10 requests/minute limit
  Processes at 1 every 6 seconds

Choosing between them:
- Need burst tolerance? -> Token Bucket
- Need smooth output? -> Leaky Bucket
- API rate limiting? -> Token Bucket
- Network shaping? -> Leaky Bucket
*/`
        }
      ]
    },
    {
      id: 'fixed-window',
      name: 'Fixed Window Counter',
      icon: '📊',
      color: '#ef4444',
      description: 'Divide time into fixed windows and count requests per window. Simple but has boundary burst problem.',
      diagram: FixedWindowDiagram,
      details: [
        {
          name: 'Core Concept',
          diagram: FixedWindowDiagram,
          explanation: 'Fixed Window Counter divides time into non-overlapping windows (e.g., 1 minute each). Each window maintains a counter of requests. Counter resets at window boundaries. Simple and memory-efficient (O(1) per user). However, it has the "boundary problem" where 2x the limit can pass if requests cluster at window boundaries.',
          codeExample: `class FixedWindowCounter {
    private int maxRequests;
    private long windowSizeMs;
    private Map<Long, Integer> windows;

    public FixedWindowCounter(int maxRequests, long windowSizeSeconds) {
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
        this.windows = new HashMap<>();
    }

    public synchronized boolean allowRequest(long timestamp) {
        long windowKey = getWindowKey(timestamp);
        int currentCount = windows.getOrDefault(windowKey, 0);

        if (currentCount < maxRequests) {
            windows.put(windowKey, currentCount + 1);
            return true;
        }
        return false;
    }

    private long getWindowKey(long timestamp) {
        return timestamp / windowSizeMs;
    }

    public void cleanup(long currentTimestamp) {
        long currentWindow = getWindowKey(currentTimestamp);
        windows.keySet().removeIf(key -> key < currentWindow);
    }
}`
        },
        {
          name: 'Boundary Problem',
          explanation: 'The main drawback of Fixed Window is the boundary problem. If a user sends all their requests at the end of one window and the start of the next, they can effectively double their rate. Example: With limit=5 per minute, 5 requests at 11:59:59 and 5 more at 12:00:00 = 10 requests in 2 seconds!',
          codeExample: `/* The Boundary Problem Visualized

Limit=5, Window=60s

Fixed Window (BAD):
  Window 0 [11:59:00-11:59:59]  |  Window 1 [12:00:00-12:00:59]
  ─────────────────────────────|───────────────────────────────
                 5 requests at  |  5 requests at
                 11:59:55-59    |  12:00:00-04
                               ↑ boundary

  Total: 10 requests in 9 seconds (should be max 5!)

Why this matters:
- Attacker can exploit this pattern
- Doubles effective rate limit
- Causes unexpected load spikes

Solutions:
1. Sliding Window Log (accurate, more memory)
2. Sliding Window Counter (approximation, good balance)
*/

class FixedWindowDemo {
    public static void demonstrateProblem() {
        FixedWindowCounter limiter = new FixedWindowCounter(5, 60);

        // End of window 0 (at 59 seconds)
        for (int i = 0; i < 5; i++) {
            limiter.allowRequest(59000); // All allowed
        }

        // Start of window 1 (at 60 seconds)
        for (int i = 0; i < 5; i++) {
            limiter.allowRequest(60000); // All allowed!
        }
        // 10 requests in 1 second - boundary problem!
    }
}`
        },
        {
          name: 'Per-User Implementation',
          explanation: 'In production, each user needs their own window counter. This implementation uses a ConcurrentHashMap for thread safety. The WindowData class stores both the current window key and count, allowing efficient reset detection when a new window begins.',
          codeExample: `class RateLimiterFixedWindow {
    private class WindowData {
        long windowKey;
        int count;

        WindowData(long key) {
            this.windowKey = key;
            this.count = 0;
        }
    }

    private Map<String, WindowData> userWindows;
    private int maxRequests;
    private long windowSizeMs;

    public RateLimiterFixedWindow(int maxRequests, long windowSizeSeconds) {
        this.userWindows = new ConcurrentHashMap<>();
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
    }

    public boolean allowRequest(String userId, long timestamp) {
        long windowKey = timestamp / windowSizeMs;

        userWindows.putIfAbsent(userId, new WindowData(windowKey));
        WindowData data = userWindows.get(userId);

        synchronized (data) {
            // Reset if new window
            if (data.windowKey != windowKey) {
                data.windowKey = windowKey;
                data.count = 0;
            }

            if (data.count < maxRequests) {
                data.count++;
                return true;
            }
            return false;
        }
    }
}`
        }
      ]
    },
    {
      id: 'sliding-window',
      name: 'Sliding Window Algorithms',
      icon: '📈',
      color: '#8b5cf6',
      description: 'True sliding window that moves continuously. Choose between Log (accurate) or Counter (efficient) variants.',
      diagram: SlidingWindowLogDiagram,
      details: [
        {
          name: 'Sliding Window Log',
          diagram: SlidingWindowLogDiagram,
          explanation: 'Sliding Window Log tracks exact timestamps of all requests within the window. When a new request arrives, expired timestamps are removed, and if the count is under the limit, the request is allowed. This provides the most accurate rate limiting but uses more memory (O(limit) per user).',
          codeExample: `class SlidingWindowLog {
    private Queue<Long> requestLog;
    private int maxRequests;
    private long windowSizeMs;

    public SlidingWindowLog(int maxRequests, long windowSizeSeconds) {
        this.requestLog = new LinkedList<>();
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
    }

    public synchronized boolean allowRequest(long timestamp) {
        removeExpiredRequests(timestamp);

        if (requestLog.size() < maxRequests) {
            requestLog.offer(timestamp);
            return true;
        }
        return false;
    }

    private void removeExpiredRequests(long timestamp) {
        long windowStart = timestamp - windowSizeMs;

        while (!requestLog.isEmpty() && requestLog.peek() <= windowStart) {
            requestLog.poll();
        }
    }
}`
        },
        {
          name: 'Sliding Window Counter',
          diagram: SlidingWindowCounterDiagram,
          explanation: 'Sliding Window Counter approximates the sliding window using weighted averages of two fixed windows. It combines the simplicity of fixed windows with better accuracy. The formula weighs the previous window count based on how much it overlaps with the current sliding window. This is the best balance of accuracy and efficiency.',
          codeExample: `class SlidingWindowCounter {
    private Map<Long, Integer> windows;
    private int maxRequests;
    private long windowSizeMs;

    public SlidingWindowCounter(int maxRequests, long windowSizeSeconds) {
        this.windows = new HashMap<>();
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
    }

    public synchronized boolean allowRequest(long timestamp) {
        long currentWindow = timestamp / windowSizeMs;
        long previousWindow = currentWindow - 1;

        int previousCount = windows.getOrDefault(previousWindow, 0);
        int currentCount = windows.getOrDefault(currentWindow, 0);

        // Calculate weighted count
        double windowProgress = (timestamp % windowSizeMs) / (double) windowSizeMs;
        double estimatedCount = previousCount * (1 - windowProgress) + currentCount;

        if (estimatedCount < maxRequests) {
            windows.put(currentWindow, currentCount + 1);
            return true;
        }
        return false;
    }
}`
        },
        {
          name: 'Algorithm Comparison',
          explanation: 'Each sliding window approach has tradeoffs: Log is most accurate but uses O(limit) memory per user. Counter uses O(1) memory with ~1% error rate. Choose Log for critical applications (payments) and Counter for high-throughput general rate limiting.',
          codeExample: `/* Sliding Window Algorithm Comparison

                    | Accuracy | Memory     | Speed
--------------------|----------|------------|--------
Sliding Window Log  | Exact    | O(limit)   | O(limit)
Sliding Window Ctr  | ~99%     | O(1)       | O(1)
Fixed Window        | ~50%     | O(1)       | O(1)

When to use each:

1. Sliding Window Log:
   - Payment APIs (no boundary exploit)
   - Low request limits (<100/window)
   - Accuracy is critical

2. Sliding Window Counter:
   - General API rate limiting
   - High throughput systems
   - Balance of accuracy/efficiency
   - Most production systems use this

3. Fixed Window:
   - Simple internal systems
   - Non-critical rate limits
   - Lowest overhead needed

Formula for Sliding Window Counter:
estimatedCount = prevCount * (1 - progress) + currCount

Example at 75% into window:
  prevWindow: 8 requests
  currWindow: 3 requests
  progress: 0.75
  estimate = 8 * 0.25 + 3 = 5 requests
*/`
        }
      ]
    },
    {
      id: 'distributed',
      name: 'Distributed Rate Limiting',
      icon: '🌐',
      color: '#dc2626',
      description: 'Scale rate limiting across multiple servers using Redis for shared state and atomic operations.',
      diagram: DistributedRateLimiterDiagram,
      details: [
        {
          name: 'Redis Implementation',
          diagram: DistributedRateLimiterDiagram,
          explanation: 'In distributed systems, rate limit state must be shared across all servers. Redis is the most common choice due to: atomic operations (INCR, EXPIRE), high performance, built-in TTL for automatic cleanup, and Lua scripting for complex atomic operations. Each server acts as a rate limiter client, checking with Redis before allowing requests.',
          codeExample: `// Redis-based Rate Limiter (using Jedis)
public class RedisRateLimiter {
    private JedisPool jedisPool;
    private int maxRequests;
    private int windowSeconds;

    public RedisRateLimiter(JedisPool pool, int maxRequests, int windowSeconds) {
        this.jedisPool = pool;
        this.maxRequests = maxRequests;
        this.windowSeconds = windowSeconds;
    }

    public boolean allowRequest(String userId) {
        String key = "rate_limit:" + userId;

        try (Jedis jedis = jedisPool.getResource()) {
            Long count = jedis.incr(key);

            if (count == 1) {
                // First request in window, set expiration
                jedis.expire(key, windowSeconds);
            }

            return count <= maxRequests;
        }
    }
}`
        },
        {
          name: 'Lua Script for Atomicity',
          explanation: 'Basic Redis operations can have race conditions. Lua scripts execute atomically on Redis, ensuring thread-safe rate limiting. This script implements a sliding window counter: it gets current and previous window counts, calculates the weighted estimate, and only increments if under the limit. The entire operation is atomic.',
          codeExample: `// Atomic Sliding Window using Lua Script
public class RedisAtomicRateLimiter {
    private static final String LUA_SCRIPT =
        "local key = KEYS[1]\\n" +
        "local prev_key = KEYS[2]\\n" +
        "local limit = tonumber(ARGV[1])\\n" +
        "local window = tonumber(ARGV[2])\\n" +
        "local now = tonumber(ARGV[3])\\n" +
        "local prev_count = tonumber(redis.call('get', prev_key) or '0')\\n" +
        "local curr_count = tonumber(redis.call('get', key) or '0')\\n" +
        "local progress = (now % window) / window\\n" +
        "local estimate = prev_count * (1 - progress) + curr_count\\n" +
        "if estimate < limit then\\n" +
        "  redis.call('incr', key)\\n" +
        "  redis.call('expire', key, window * 2)\\n" +
        "  return 1\\n" +
        "end\\n" +
        "return 0";

    public boolean allowRequest(String userId) {
        long now = System.currentTimeMillis();
        long windowMs = windowSeconds * 1000L;
        long currWindow = now / windowMs;

        String currKey = "rl:" + userId + ":" + currWindow;
        String prevKey = "rl:" + userId + ":" + (currWindow - 1);

        try (Jedis jedis = jedisPool.getResource()) {
            Object result = jedis.eval(LUA_SCRIPT,
                Arrays.asList(currKey, prevKey),
                Arrays.asList(String.valueOf(maxRequests),
                             String.valueOf(windowMs),
                             String.valueOf(now)));
            return ((Long) result) == 1;
        }
    }
}`
        },
        {
          name: 'Race Condition Handling',
          explanation: 'Without proper atomic operations, race conditions can occur in distributed systems. Two servers might read the same count, both decide to allow the request, and both increment - exceeding the limit. Solutions include: Lua scripts (recommended), WATCH/MULTI/EXEC transactions, or distributed locks (slower).',
          codeExample: `// Race Condition Example and Solution

/* The Problem:
   Server A: read count=9, allow, incr -> count=10
   Server B: read count=9, allow, incr -> count=10

   Both allowed! But limit was 10, now we have 11 requests.
*/

// Solution 1: Lua Script (Best - shown above)

// Solution 2: Redis WATCH/MULTI/EXEC
public boolean allowRequestWithWatch(String userId) {
    String key = "rate_limit:" + userId;

    try (Jedis jedis = jedisPool.getResource()) {
        while (true) {
            jedis.watch(key);

            String countStr = jedis.get(key);
            int count = countStr == null ? 0 : Integer.parseInt(countStr);

            if (count >= maxRequests) {
                jedis.unwatch();
                return false;
            }

            Transaction tx = jedis.multi();
            tx.incr(key);
            tx.expire(key, windowSeconds);

            List<Object> results = tx.exec();
            if (results != null) {
                return true; // Transaction succeeded
            }
            // Transaction failed, retry
        }
    }
}

// Solution 3: Distributed Lock (Slowest)
public boolean allowRequestWithLock(String userId) {
    String lockKey = "lock:" + userId;
    String countKey = "rate_limit:" + userId;

    try (Jedis jedis = jedisPool.getResource()) {
        // Acquire lock with timeout
        String lockId = UUID.randomUUID().toString();
        String result = jedis.set(lockKey, lockId, "NX", "EX", 5);

        if (!"OK".equals(result)) {
            return false; // Could not acquire lock
        }

        try {
            Long count = jedis.incr(countKey);
            if (count == 1) {
                jedis.expire(countKey, windowSeconds);
            }
            return count <= maxRequests;
        } finally {
            // Release lock
            jedis.del(lockKey);
        }
    }
}`
        }
      ]
    },
    {
      id: 'scaling',
      name: 'Scaling & Best Practices',
      icon: '⚡',
      color: '#22c55e',
      description: 'Production considerations: scaling strategies, response headers, and implementation best practices.',
      diagram: ScalingDiagram,
      details: [
        {
          name: 'Scaling Strategies',
          diagram: ScalingDiagram,
          explanation: 'Three main approaches for scaling rate limiters: 1) Local (in-memory): Fast, no network calls, but only works for single-server. 2) Distributed (Redis): Consistent across servers, slight latency overhead. 3) Hybrid: Local rate limiting with periodic sync to central store, best for high-throughput systems that can tolerate eventual consistency.',
          codeExample: `// Hybrid Rate Limiter: Local + Distributed Sync
public class HybridRateLimiter {
    private final LocalRateLimiter local;
    private final RedisRateLimiter distributed;
    private final double localRatio; // e.g., 0.8 = 80% local limit

    public HybridRateLimiter(int limit, int windowSec, double localRatio) {
        int localLimit = (int) (limit * localRatio);
        int distributedLimit = limit;

        this.local = new LocalRateLimiter(localLimit, windowSec);
        this.distributed = new RedisRateLimiter(distributedLimit, windowSec);
        this.localRatio = localRatio;
    }

    public boolean allowRequest(String userId) {
        // Fast path: check local limit first
        if (!local.allowRequest(userId)) {
            return false;
        }

        // Slow path: check distributed limit
        // Only reached 20% of the time if well-distributed
        return distributed.allowRequest(userId);
    }
}

// Another approach: Async sync with local limiter
public class AsyncSyncRateLimiter {
    private final Map<String, AtomicInteger> localCounts;
    private final ScheduledExecutorService syncExecutor;

    public AsyncSyncRateLimiter(RedisRateLimiter distributed) {
        this.localCounts = new ConcurrentHashMap<>();

        // Sync to Redis every second
        syncExecutor.scheduleAtFixedRate(() -> {
            localCounts.forEach((userId, count) -> {
                int delta = count.getAndSet(0);
                if (delta > 0) {
                    distributed.addCount(userId, delta);
                }
            });
        }, 1, 1, TimeUnit.SECONDS);
    }
}`
        },
        {
          name: 'Response Headers',
          explanation: 'Standard rate limit response headers help clients adapt to rate limits gracefully. Include: X-RateLimit-Limit (max requests), X-RateLimit-Remaining (requests left), X-RateLimit-Reset (when limit resets), and Retry-After (seconds to wait when limited). This enables clients to implement backoff strategies.',
          codeExample: `// Rate Limit Response Headers (Spring Boot)
@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    @Autowired
    private RateLimiter rateLimiter;

    @Override
    public boolean preHandle(HttpServletRequest request,
                            HttpServletResponse response,
                            Object handler) {
        String userId = extractUserId(request);
        RateLimitResult result = rateLimiter.check(userId);

        // Always include rate limit headers
        response.setHeader("X-RateLimit-Limit",
            String.valueOf(result.getLimit()));
        response.setHeader("X-RateLimit-Remaining",
            String.valueOf(result.getRemaining()));
        response.setHeader("X-RateLimit-Reset",
            String.valueOf(result.getResetTimestamp()));

        if (!result.isAllowed()) {
            response.setStatus(429); // Too Many Requests
            response.setHeader("Retry-After",
                String.valueOf(result.getRetryAfterSeconds()));
            response.getWriter().write(
                "{\\"error\\": \\"Rate limit exceeded\\", " +
                "\\"retry_after\\": " + result.getRetryAfterSeconds() + "}");
            return false;
        }

        return true;
    }
}

// Result class with all metadata
public class RateLimitResult {
    private boolean allowed;
    private int limit;
    private int remaining;
    private long resetTimestamp;
    private int retryAfterSeconds;

    // getters...
}`
        },
        {
          name: 'Best Practices',
          explanation: 'Key production considerations: 1) Use tiered limits (free/pro/enterprise), 2) Implement graceful degradation, 3) Monitor rate limit metrics, 4) Consider user-agent and IP as backup identifiers, 5) Allow limit exemptions for internal services, 6) Use circuit breakers for Redis failures.',
          codeExample: `// Production Rate Limiter with Best Practices
public class ProductionRateLimiter {
    private final Map<String, RateLimitConfig> tierConfigs;
    private final RedisRateLimiter primary;
    private final LocalRateLimiter fallback;
    private final CircuitBreaker circuitBreaker;
    private final MetricsCollector metrics;

    public RateLimitResult check(Request request) {
        String userId = extractUserId(request);
        String tier = getUserTier(userId); // free, pro, enterprise
        RateLimitConfig config = tierConfigs.get(tier);

        // Exempt internal services
        if (isInternalService(request)) {
            return RateLimitResult.allowed(Integer.MAX_VALUE);
        }

        try {
            if (circuitBreaker.isOpen()) {
                // Fallback to local limiter
                metrics.increment("rate_limit.fallback");
                return fallback.check(userId, config);
            }

            RateLimitResult result = primary.check(userId, config);
            metrics.increment(result.isAllowed() ?
                "rate_limit.allowed" : "rate_limit.denied");

            return result;

        } catch (Exception e) {
            circuitBreaker.recordFailure();
            metrics.increment("rate_limit.error");

            // Graceful degradation: allow on error
            // Or use local fallback for safety
            return fallback.check(userId, config);
        }
    }
}

// Tiered configuration
Map<String, RateLimitConfig> tierConfigs = Map.of(
    "free", new RateLimitConfig(100, 60),      // 100/min
    "pro", new RateLimitConfig(1000, 60),      // 1000/min
    "enterprise", new RateLimitConfig(10000, 60) // 10000/min
);`
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
      { name: 'Rate Limiter', icon: '🚦', page: 'Rate Limiter' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #7f1d1d 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #ef4444, #f87171)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
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
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Rate Limiter Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to System Design
        </button>
      </div>

      {/* Breadcrumb navigation */}
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


      {/* Architecture Overview */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid #374151'
        }}>
          <h2 style={{ color: '#60a5fa', margin: '0 0 1rem 0', fontSize: '1.25rem' }}>
            Rate Limiting Architecture Overview
          </h2>
          <RateLimiterArchitectureDiagram />
          <p style={{ color: '#9ca3af', margin: '1rem 0 0 0', textAlign: 'center', fontSize: '0.9rem' }}>
            Rate limiters control request flow between clients and backend services, protecting against abuse and ensuring fair resource usage.
          </p>
        </div>
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
              <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.9)' }}>
                <CompletionCheckbox problemId={`RateLimiter-${concept.id}`} />
              </div>
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
                >X</button>
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

export default RateLimiter

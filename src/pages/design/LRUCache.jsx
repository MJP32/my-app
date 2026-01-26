/**
 * LRU Cache - Tab Template Format
 *
 * Covers LRU Cache concepts, data structures, implementation patterns,
 * thread safety, distributed caching, and related algorithms (LFU, TTL).
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#8b5cf6',
  primaryHover: '#a78bfa',
  bg: 'rgba(139, 92, 246, 0.1)',
  border: 'rgba(139, 92, 246, 0.3)',
  arrow: '#8b5cf6',
  hoverBg: 'rgba(139, 92, 246, 0.2)',
  topicBg: 'rgba(139, 92, 246, 0.2)'
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

// LRU Cache Architecture Diagram
const LRUCacheArchitectureDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="hashMapGradArch" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="dllGradArch" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="nodeGradArch" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="dummyGradArch" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowArch" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
      </marker>
      <marker id="arrowArchBlue" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
      </marker>
    </defs>
    <text x="400" y="25" fontSize="14" fontWeight="700" fill="#e5e7eb" textAnchor="middle">LRU Cache Architecture: HashMap + Doubly Linked List</text>
    <rect x="30" y="50" width="200" height="200" rx="12" fill="#1f2937" stroke="url(#hashMapGradArch)" strokeWidth="3" />
    <text x="130" y="75" fontSize="12" fontWeight="600" fill="#3b82f6" textAnchor="middle">HashMap&lt;K, Node&gt;</text>
    <text x="130" y="92" fontSize="10" fill="#9ca3af" textAnchor="middle">O(1) key lookup</text>
    <rect x="50" y="110" width="160" height="28" rx="4" fill="#374151" />
    <text x="60" y="128" fontSize="10" fill="#fbbf24">key: 1</text>
    <text x="140" y="128" fontSize="10" fill="#9ca3af">→ node</text>
    <rect x="50" y="145" width="160" height="28" rx="4" fill="#374151" />
    <text x="60" y="163" fontSize="10" fill="#fbbf24">key: 2</text>
    <text x="140" y="163" fontSize="10" fill="#9ca3af">→ node</text>
    <rect x="50" y="180" width="160" height="28" rx="4" fill="#374151" />
    <text x="60" y="198" fontSize="10" fill="#fbbf24">key: 3</text>
    <text x="140" y="198" fontSize="10" fill="#9ca3af">→ node</text>
    <path d="M 210 124 Q 260 124 280 150" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrowArchBlue)" />
    <path d="M 210 159 Q 260 159 350 180" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrowArchBlue)" />
    <path d="M 210 194 Q 280 194 420 180" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrowArchBlue)" />
    <rect x="280" y="50" width="490" height="200" rx="12" fill="#1f2937" stroke="url(#dllGradArch)" strokeWidth="3" />
    <text x="525" y="75" fontSize="12" fontWeight="600" fill="#8b5cf6" textAnchor="middle">Doubly Linked List (Order by Recency)</text>
    <rect x="300" y="120" width="70" height="80" rx="8" fill="url(#dummyGradArch)" />
    <text x="335" y="145" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">HEAD</text>
    <text x="335" y="162" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">(dummy)</text>
    <text x="335" y="180" fontSize="8" fill="white" opacity="0.6" textAnchor="middle">prev: null</text>
    <rect x="390" y="110" width="80" height="95" rx="8" fill="url(#nodeGradArch)" stroke="#10b981" strokeWidth="2" />
    <text x="430" y="132" fontSize="9" fontWeight="600" fill="white" textAnchor="middle">key: 1</text>
    <text x="430" y="148" fontSize="9" fill="white" opacity="0.9" textAnchor="middle">val: 100</text>
    <text x="430" y="165" fontSize="8" fill="white" opacity="0.7" textAnchor="middle">prev</text>
    <text x="430" y="180" fontSize="8" fill="white" opacity="0.7" textAnchor="middle">next</text>
    <text x="430" y="198" fontSize="8" fill="#fbbf24" textAnchor="middle">Most Recent</text>
    <rect x="490" y="120" width="80" height="80" rx="8" fill="url(#nodeGradArch)" />
    <text x="530" y="145" fontSize="9" fontWeight="600" fill="white" textAnchor="middle">key: 2</text>
    <text x="530" y="162" fontSize="9" fill="white" opacity="0.9" textAnchor="middle">val: 200</text>
    <text x="530" y="180" fontSize="8" fill="white" opacity="0.7" textAnchor="middle">prev | next</text>
    <rect x="590" y="110" width="80" height="95" rx="8" fill="url(#nodeGradArch)" stroke="#ef4444" strokeWidth="2" />
    <text x="630" y="132" fontSize="9" fontWeight="600" fill="white" textAnchor="middle">key: 3</text>
    <text x="630" y="148" fontSize="9" fill="white" opacity="0.9" textAnchor="middle">val: 300</text>
    <text x="630" y="165" fontSize="8" fill="white" opacity="0.7" textAnchor="middle">prev</text>
    <text x="630" y="180" fontSize="8" fill="white" opacity="0.7" textAnchor="middle">next</text>
    <text x="630" y="198" fontSize="8" fill="#ef4444" textAnchor="middle">Evict First</text>
    <rect x="690" y="120" width="70" height="80" rx="8" fill="url(#dummyGradArch)" />
    <text x="725" y="145" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">TAIL</text>
    <text x="725" y="162" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">(dummy)</text>
    <text x="725" y="180" fontSize="8" fill="white" opacity="0.6" textAnchor="middle">next: null</text>
    <line x1="370" y1="155" x2="390" y2="155" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowArch)" />
    <line x1="390" y1="165" x2="370" y2="165" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowArch)" />
    <line x1="470" y1="155" x2="490" y2="155" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowArch)" />
    <line x1="490" y1="165" x2="470" y2="165" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowArch)" />
    <line x1="570" y1="155" x2="590" y2="155" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowArch)" />
    <line x1="590" y1="165" x2="570" y2="165" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowArch)" />
    <line x1="670" y1="155" x2="690" y2="155" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowArch)" />
    <line x1="690" y1="165" x2="670" y2="165" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowArch)" />
    <text x="400" y="268" fontSize="10" fill="#9ca3af" textAnchor="middle">Capacity: 3 | HashMap provides O(1) lookup | DLL maintains access order</text>
  </svg>
)

// GET Operation Diagram
const GetOperationDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="stepGradGet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="nodeGradGet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="highlightGradGet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowGet" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
      <marker id="arrowGetYellow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#fbbf24" />
      </marker>
    </defs>
    <text x="400" y="25" fontSize="14" fontWeight="700" fill="#e5e7eb" textAnchor="middle">GET Operation: get(key=2) - Returns value, moves node to front</text>
    <rect x="30" y="50" width="180" height="80" rx="10" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" />
    <text x="120" y="75" fontSize="11" fontWeight="600" fill="#3b82f6" textAnchor="middle">Step 1: HashMap Lookup</text>
    <text x="120" y="95" fontSize="10" fill="#9ca3af" textAnchor="middle">map.get(2) → node</text>
    <text x="120" y="112" fontSize="9" fill="#10b981" textAnchor="middle">O(1) time</text>
    <line x1="210" y1="90" x2="240" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGet)" />
    <rect x="250" y="50" width="180" height="80" rx="10" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2" />
    <text x="340" y="75" fontSize="11" fontWeight="600" fill="#8b5cf6" textAnchor="middle">Step 2: Node Found</text>
    <rect x="300" y="85" width="80" height="35" rx="6" fill="url(#highlightGradGet)" />
    <text x="340" y="108" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">key:2 val:20</text>
    <line x1="430" y1="90" x2="460" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGet)" />
    <rect x="470" y="50" width="180" height="80" rx="10" fill="#1f2937" stroke="#f59e0b" strokeWidth="2" />
    <text x="560" y="75" fontSize="11" fontWeight="600" fill="#f59e0b" textAnchor="middle">Step 3: Move to Front</text>
    <text x="560" y="95" fontSize="9" fill="#9ca3af" textAnchor="middle">removeNode(node)</text>
    <text x="560" y="110" fontSize="9" fill="#9ca3af" textAnchor="middle">addToHead(node)</text>
    <line x1="650" y1="90" x2="680" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGet)" />
    <rect x="690" y="50" width="80" height="80" rx="10" fill="url(#stepGradGet)" />
    <text x="730" y="80" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Return</text>
    <text x="730" y="100" fontSize="14" fontWeight="700" fill="white" textAnchor="middle">20</text>
    <text x="730" y="118" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">value</text>
    <text x="400" y="228" fontSize="10" fill="#10b981" textAnchor="middle">Time Complexity: O(1) for both HashMap lookup and DLL pointer updates</text>
  </svg>
)

// PUT Operation Diagram
const PutOperationDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="newNodeGradPut" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="nodeGradPut" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="evictGradPut" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowPut" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
    </defs>
    <text x="400" y="25" fontSize="14" fontWeight="700" fill="#e5e7eb" textAnchor="middle">PUT Operation: put(key=4, value=40) - Add new, evict LRU if at capacity</text>
    <text x="130" y="55" fontSize="11" fontWeight="600" fill="#f59e0b" textAnchor="middle">Initial State (Capacity: 3, Full)</text>
    <rect x="30" y="70" width="50" height="40" rx="4" fill="#f59e0b" />
    <text x="55" y="95" fontSize="9" fill="white" textAnchor="middle">HEAD</text>
    <line x1="80" y1="90" x2="100" y2="90" stroke="#6b7280" strokeWidth="1.5" />
    <rect x="100" y="70" width="60" height="40" rx="4" fill="url(#nodeGradPut)" />
    <text x="130" y="87" fontSize="9" fill="white" textAnchor="middle">k:1 v:10</text>
    <text x="130" y="102" fontSize="8" fill="#10b981" textAnchor="middle">recent</text>
    <line x1="160" y1="90" x2="180" y2="90" stroke="#6b7280" strokeWidth="1.5" />
    <rect x="180" y="70" width="60" height="40" rx="4" fill="url(#nodeGradPut)" />
    <text x="210" y="92" fontSize="9" fill="white" textAnchor="middle">k:2 v:20</text>
    <line x1="240" y1="90" x2="260" y2="90" stroke="#6b7280" strokeWidth="1.5" />
    <rect x="260" y="70" width="60" height="40" rx="4" fill="url(#evictGradPut)" stroke="#ef4444" strokeWidth="2" />
    <text x="290" y="87" fontSize="9" fill="white" textAnchor="middle">k:3 v:30</text>
    <text x="290" y="102" fontSize="8" fill="#fbbf24" textAnchor="middle">LRU!</text>
    <line x1="320" y1="90" x2="340" y2="90" stroke="#6b7280" strokeWidth="1.5" />
    <rect x="340" y="70" width="50" height="40" rx="4" fill="#f59e0b" />
    <text x="365" y="95" fontSize="9" fill="white" textAnchor="middle">TAIL</text>
    <rect x="430" y="50" width="160" height="70" rx="8" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" />
    <text x="510" y="72" fontSize="10" fontWeight="600" fill="#3b82f6" textAnchor="middle">Step 1: Check Capacity</text>
    <text x="510" y="90" fontSize="9" fill="#9ca3af" textAnchor="middle">size (3) == capacity (3)</text>
    <text x="510" y="105" fontSize="9" fill="#ef4444" textAnchor="middle">Need to evict!</text>
    <rect x="610" y="50" width="160" height="70" rx="8" fill="#1f2937" stroke="#ef4444" strokeWidth="2" />
    <text x="690" y="72" fontSize="10" fontWeight="600" fill="#ef4444" textAnchor="middle">Step 2: Evict LRU</text>
    <text x="690" y="90" fontSize="9" fill="#9ca3af" textAnchor="middle">removeTail() → k:3</text>
    <text x="690" y="105" fontSize="9" fill="#9ca3af" textAnchor="middle">map.remove(3)</text>
    <line x1="400" y1="125" x2="400" y2="145" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowPut)" />
    <rect x="430" y="155" width="160" height="70" rx="8" fill="#1f2937" stroke="#10b981" strokeWidth="2" />
    <text x="510" y="177" fontSize="10" fontWeight="600" fill="#10b981" textAnchor="middle">Step 3: Add New Node</text>
    <text x="510" y="195" fontSize="9" fill="#9ca3af" textAnchor="middle">newNode = Node(4, 40)</text>
    <text x="510" y="210" fontSize="9" fill="#9ca3af" textAnchor="middle">addToHead(newNode)</text>
    <rect x="610" y="155" width="160" height="70" rx="8" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2" />
    <text x="690" y="177" fontSize="10" fontWeight="600" fill="#8b5cf6" textAnchor="middle">Step 4: Update Map</text>
    <text x="690" y="195" fontSize="9" fill="#9ca3af" textAnchor="middle">map.put(4, newNode)</text>
    <text x="690" y="210" fontSize="9" fill="#10b981" textAnchor="middle">Done!</text>
  </svg>
)

// Eviction Diagram
const EvictionDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="safeGradEvict" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="dangerGradEvict" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowEvict" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
      </marker>
    </defs>
    <text x="400" y="25" fontSize="14" fontWeight="700" fill="#e5e7eb" textAnchor="middle">LRU Eviction: Removing the Least Recently Used Entry</text>
    <text x="100" y="55" fontSize="11" fontWeight="600" fill="#9ca3af" textAnchor="middle">Access Timeline</text>
    <line x1="50" y1="70" x2="750" y2="70" stroke="#374151" strokeWidth="2" />
    <circle cx="100" cy="70" r="6" fill="#10b981" />
    <text x="100" y="90" fontSize="9" fill="#10b981" textAnchor="middle">t=0</text>
    <text x="100" y="105" fontSize="8" fill="#9ca3af" textAnchor="middle">put(A)</text>
    <circle cx="200" cy="70" r="6" fill="#10b981" />
    <text x="200" y="90" fontSize="9" fill="#10b981" textAnchor="middle">t=1</text>
    <text x="200" y="105" fontSize="8" fill="#9ca3af" textAnchor="middle">put(B)</text>
    <circle cx="300" cy="70" r="6" fill="#10b981" />
    <text x="300" y="90" fontSize="9" fill="#10b981" textAnchor="middle">t=2</text>
    <text x="300" y="105" fontSize="8" fill="#9ca3af" textAnchor="middle">put(C)</text>
    <circle cx="400" cy="70" r="6" fill="#3b82f6" />
    <text x="400" y="90" fontSize="9" fill="#3b82f6" textAnchor="middle">t=3</text>
    <text x="400" y="105" fontSize="8" fill="#9ca3af" textAnchor="middle">get(A)</text>
    <circle cx="500" cy="70" r="6" fill="#3b82f6" />
    <text x="500" y="90" fontSize="9" fill="#3b82f6" textAnchor="middle">t=4</text>
    <text x="500" y="105" fontSize="8" fill="#9ca3af" textAnchor="middle">get(C)</text>
    <circle cx="600" cy="70" r="6" fill="#f59e0b" />
    <text x="600" y="90" fontSize="9" fill="#f59e0b" textAnchor="middle">t=5</text>
    <text x="600" y="105" fontSize="8" fill="#f59e0b" textAnchor="middle">put(D)</text>
    <circle cx="700" cy="70" r="6" fill="#ef4444" />
    <text x="700" y="90" fontSize="9" fill="#ef4444" textAnchor="middle">EVICT</text>
    <rect x="50" y="120" width="320" height="90" rx="10" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="210" y="145" fontSize="11" fontWeight="600" fill="#9ca3af" textAnchor="middle">Cache State at t=5 (Before Eviction)</text>
    <rect x="70" y="160" width="70" height="40" rx="6" fill="url(#safeGradEvict)" />
    <text x="105" y="177" fontSize="9" fontWeight="600" fill="white" textAnchor="middle">C</text>
    <text x="105" y="192" fontSize="8" fill="white" opacity="0.8" textAnchor="middle">Most Recent</text>
    <rect x="150" y="160" width="70" height="40" rx="6" fill="url(#safeGradEvict)" opacity="0.8" />
    <text x="185" y="177" fontSize="9" fontWeight="600" fill="white" textAnchor="middle">A</text>
    <text x="185" y="192" fontSize="8" fill="white" opacity="0.8" textAnchor="middle">Recent</text>
    <rect x="230" y="160" width="70" height="40" rx="6" fill="url(#dangerGradEvict)" />
    <text x="265" y="177" fontSize="9" fontWeight="600" fill="white" textAnchor="middle">B</text>
    <text x="265" y="192" fontSize="8" fill="#fbbf24" textAnchor="middle">LRU - Evict!</text>
    <line x1="300" y1="180" x2="340" y2="180" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowEvict)" />
    <rect x="400" y="120" width="370" height="90" rx="10" fill="#1f2937" stroke="#ef4444" strokeWidth="2" />
    <text x="585" y="145" fontSize="11" fontWeight="600" fill="#ef4444" textAnchor="middle">Eviction Process</text>
    <text x="420" y="168" fontSize="10" fill="#9ca3af">1. removeTail() → Get node before TAIL (B)</text>
    <text x="420" y="186" fontSize="10" fill="#9ca3af">2. Update B.prev.next = TAIL</text>
    <text x="420" y="204" fontSize="10" fill="#9ca3af">3. map.remove(B.key) → Remove from HashMap</text>
  </svg>
)

// HashMap + DLL Data Structure Diagram
const DataStructureDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="nodeGradDS" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowDS" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Why HashMap + Doubly Linked List?
    </text>
    <rect x="50" y="50" width="200" height="130" rx="8" fill="#1f2937" stroke="#3b82f6" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">HashMap</text>
    <text x="150" y="100" textAnchor="middle" fill="#9ca3af" fontSize="10">O(1) key → node lookup</text>
    <text x="150" y="120" textAnchor="middle" fill="#9ca3af" fontSize="10">Direct access to any entry</text>
    <text x="150" y="140" textAnchor="middle" fill="#9ca3af" fontSize="10">No ordering information</text>
    <text x="150" y="165" textAnchor="middle" fill="#10b981" fontSize="10">Fast lookup!</text>
    <rect x="300" y="50" width="200" height="130" rx="8" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Doubly Linked List</text>
    <text x="400" y="100" textAnchor="middle" fill="#9ca3af" fontSize="10">O(1) add/remove at ends</text>
    <text x="400" y="120" textAnchor="middle" fill="#9ca3af" fontSize="10">O(1) remove arbitrary node</text>
    <text x="400" y="140" textAnchor="middle" fill="#9ca3af" fontSize="10">Maintains access order</text>
    <text x="400" y="165" textAnchor="middle" fill="#10b981" fontSize="10">Fast reordering!</text>
    <rect x="550" y="50" width="200" height="130" rx="8" fill="#1f2937" stroke="#10b981" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Combined: O(1) All Ops</text>
    <text x="650" y="100" textAnchor="middle" fill="#9ca3af" fontSize="10">get(key): lookup + move</text>
    <text x="650" y="120" textAnchor="middle" fill="#9ca3af" fontSize="10">put(key): add/update + move</text>
    <text x="650" y="140" textAnchor="middle" fill="#9ca3af" fontSize="10">evict(): remove tail</text>
    <text x="650" y="165" textAnchor="middle" fill="#fbbf24" fontSize="10">Perfect for LRU Cache!</text>
    <line x1="250" y1="115" x2="295" y2="115" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowDS)"/>
    <text x="272" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">+</text>
    <line x1="500" y1="115" x2="545" y2="115" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowDS)"/>
    <text x="522" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">=</text>
  </svg>
)

// Node Structure Diagram
const NodeStructureDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="nodeGradNS" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Node Structure in Doubly Linked List
    </text>
    <rect x="300" y="50" width="200" height="120" rx="10" fill="url(#nodeGradNS)" stroke="#10b981" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Node</text>
    <line x1="310" y1="85" x2="490" y2="85" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
    <text x="320" y="105" fill="white" fontSize="10">key: int</text>
    <text x="320" y="120" fill="white" fontSize="10">value: int</text>
    <text x="320" y="135" fill="white" fontSize="10">prev: Node*</text>
    <text x="320" y="150" fill="white" fontSize="10">next: Node*</text>
    <rect x="50" y="80" width="80" height="40" rx="6" fill="#374151" stroke="#6b7280" strokeWidth="1"/>
    <text x="90" y="105" textAnchor="middle" fill="#9ca3af" fontSize="10">prev node</text>
    <rect x="670" y="80" width="80" height="40" rx="6" fill="#374151" stroke="#6b7280" strokeWidth="1"/>
    <text x="710" y="105" textAnchor="middle" fill="#9ca3af" fontSize="10">next node</text>
    <line x1="130" y1="100" x2="290" y2="135" stroke="#6b7280" strokeWidth="2" strokeDasharray="4,2"/>
    <line x1="510" y1="145" x2="660" y2="100" stroke="#6b7280" strokeWidth="2" strokeDasharray="4,2"/>
  </svg>
)

// LRU Cache with Expiry Diagram
const LRUCacheExpiryDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="validGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="expiredGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="30" y="25" fontSize="11" fontWeight="600" fill="#9ca3af">LRU Cache with TTL (Time To Live)</text>
    <rect x="30" y="40" width="130" height="70" rx="8" fill="url(#validGrad)" />
    <text x="95" y="60" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">k:1 v:100</text>
    <text x="95" y="78" fontSize="9" fill="white" opacity="0.9" textAnchor="middle">TTL: 60s</text>
    <text x="95" y="95" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">expires: t+45s</text>
    <rect x="180" y="40" width="130" height="70" rx="8" fill="url(#validGrad)" />
    <text x="245" y="60" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">k:2 v:200</text>
    <text x="245" y="78" fontSize="9" fill="white" opacity="0.9" textAnchor="middle">TTL: 120s</text>
    <text x="245" y="95" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">expires: t+100s</text>
    <rect x="330" y="40" width="130" height="70" rx="8" fill="url(#expiredGrad)" />
    <text x="395" y="60" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">k:3 v:300</text>
    <text x="395" y="78" fontSize="9" fill="white" opacity="0.9" textAnchor="middle">TTL: 30s</text>
    <text x="395" y="95" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">EXPIRED</text>
    <rect x="500" y="35" width="170" height="85" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="585" y="55" fontSize="10" fontWeight="600" fill="#f59e0b" textAnchor="middle">Eviction Policy</text>
    <text x="510" y="75" fontSize="9" fill="#9ca3af">1. Check expiry first</text>
    <text x="510" y="92" fontSize="9" fill="#9ca3af">2. Remove expired items</text>
    <text x="510" y="109" fontSize="9" fill="#9ca3af">3. Then apply LRU</text>
    <text x="95" y="130" fontSize="9" fill="#10b981" textAnchor="middle">Valid</text>
    <text x="245" y="130" fontSize="9" fill="#10b981" textAnchor="middle">Valid</text>
    <text x="395" y="130" fontSize="9" fill="#ef4444" textAnchor="middle">Remove</text>
  </svg>
)

// LFU Cache Diagram
const LFUCacheDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="freq1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="freq2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="freq3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="30" y="20" fontSize="11" fontWeight="600" fill="#9ca3af">Frequency-Based Eviction (min_freq=1)</text>
    <rect x="30" y="35" width="180" height="40" rx="6" fill="url(#freq1Grad)" />
    <text x="120" y="58" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">freq=1: [D] → [E]</text>
    <text x="220" y="58" fontSize="9" fill="#ef4444" textAnchor="middle">← evict first</text>
    <rect x="30" y="85" width="180" height="40" rx="6" fill="url(#freq2Grad)" />
    <text x="120" y="108" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">freq=2: [B] → [C]</text>
    <rect x="30" y="135" width="180" height="40" rx="6" fill="url(#freq3Grad)" />
    <text x="120" y="158" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">freq=3: [A]</text>
    <rect x="320" y="35" width="350" height="130" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="495" y="55" fontSize="11" fontWeight="600" fill="#6366f1" textAnchor="middle">LFU Eviction Algorithm</text>
    <text x="335" y="78" fontSize="10" fill="#9ca3af">1. Track frequency count for each key</text>
    <text x="335" y="98" fontSize="10" fill="#9ca3af">2. Maintain min_freq pointer</text>
    <text x="335" y="118" fontSize="10" fill="#9ca3af">3. Evict from min_freq bucket (LRU order)</text>
    <text x="335" y="138" fontSize="10" fill="#9ca3af">4. On access: move to freq+1 bucket</text>
  </svg>
)

// Distributed Cache Diagram
const DistributedCacheDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="clientGradDist" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cacheNode1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cacheNode2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cacheNode3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowDist" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
      </marker>
    </defs>
    <text x="400" y="25" fontSize="14" fontWeight="700" fill="#e5e7eb" textAnchor="middle">Distributed LRU Cache with Consistent Hashing</text>
    <rect x="30" y="100" width="100" height="80" rx="10" fill="url(#clientGradDist)" />
    <text x="80" y="130" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Client</text>
    <text x="80" y="148" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">get(key)</text>
    <text x="80" y="163" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">put(key, val)</text>
    <line x1="130" y1="140" x2="180" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowDist)" />
    <text x="155" y="130" fontSize="8" fill="#9ca3af" textAnchor="middle">hash(key)</text>
    <circle cx="280" cy="140" r="70" fill="none" stroke="#4b5563" strokeWidth="2" strokeDasharray="4,4" />
    <text x="280" y="138" fontSize="10" fontWeight="600" fill="#9ca3af" textAnchor="middle">Hash</text>
    <text x="280" y="153" fontSize="10" fontWeight="600" fill="#9ca3af" textAnchor="middle">Ring</text>
    <circle cx="280" cy="70" r="10" fill="url(#cacheNode1Grad)" />
    <circle cx="340" cy="180" r="10" fill="url(#cacheNode2Grad)" />
    <circle cx="220" cy="180" r="10" fill="url(#cacheNode3Grad)" />
    <rect x="420" y="40" width="140" height="65" rx="8" fill="#1f2937" stroke="url(#cacheNode1Grad)" strokeWidth="2" />
    <text x="490" y="60" fontSize="10" fontWeight="600" fill="#10b981" textAnchor="middle">Cache Node 1</text>
    <text x="430" y="78" fontSize="9" fill="#9ca3af">LRU: [A] → [D]</text>
    <text x="430" y="93" fontSize="8" fill="#6b7280">Keys: A, D, G...</text>
    <rect x="420" y="115" width="140" height="65" rx="8" fill="#1f2937" stroke="url(#cacheNode2Grad)" strokeWidth="2" />
    <text x="490" y="135" fontSize="10" fontWeight="600" fill="#8b5cf6" textAnchor="middle">Cache Node 2</text>
    <text x="430" y="153" fontSize="9" fill="#9ca3af">LRU: [B] → [E]</text>
    <text x="430" y="168" fontSize="8" fill="#6b7280">Keys: B, E, H...</text>
    <rect x="420" y="190" width="140" height="65" rx="8" fill="#1f2937" stroke="url(#cacheNode3Grad)" strokeWidth="2" />
    <text x="490" y="210" fontSize="10" fontWeight="600" fill="#f59e0b" textAnchor="middle">Cache Node 3</text>
    <text x="430" y="228" fontSize="9" fill="#9ca3af">LRU: [C] → [F]</text>
    <text x="430" y="243" fontSize="8" fill="#6b7280">Keys: C, F, I...</text>
    <line x1="350" y1="75" x2="415" y2="72" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,2" />
    <line x1="350" y1="175" x2="415" y2="147" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4,2" />
    <line x1="235" y1="195" x2="415" y2="222" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
    <rect x="600" y="40" width="180" height="215" rx="10" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="690" y="65" fontSize="11" fontWeight="600" fill="#e5e7eb" textAnchor="middle">Benefits</text>
    <text x="615" y="90" fontSize="9" fill="#10b981">Horizontal Scaling</text>
    <text x="615" y="105" fontSize="8" fill="#9ca3af">Add nodes dynamically</text>
    <text x="615" y="130" fontSize="9" fill="#8b5cf6">Minimal Reshuffling</text>
    <text x="615" y="145" fontSize="8" fill="#9ca3af">Only K/N keys move</text>
    <text x="615" y="170" fontSize="9" fill="#f59e0b">Load Balancing</text>
    <text x="615" y="185" fontSize="8" fill="#9ca3af">Virtual nodes for even dist</text>
    <text x="615" y="210" fontSize="9" fill="#ef4444">Fault Tolerance</text>
    <text x="615" y="225" fontSize="8" fill="#9ca3af">Node failure is isolated</text>
    <text x="615" y="245" fontSize="9" fill="#3b82f6">Each node runs LRU!</text>
  </svg>
)

// Thread Safety Diagram
const ThreadSafetyDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowTS" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Thread-Safe LRU Cache Strategies
    </text>
    <rect x="50" y="50" width="200" height="130" rx="8" fill="#1f2937" stroke="#ef4444" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Global Lock</text>
    <text x="150" y="100" textAnchor="middle" fill="#9ca3af" fontSize="9">synchronized / ReentrantLock</text>
    <text x="150" y="120" textAnchor="middle" fill="#9ca3af" fontSize="9">Simple but blocks all ops</text>
    <text x="150" y="140" textAnchor="middle" fill="#9ca3af" fontSize="9">High contention</text>
    <text x="150" y="165" textAnchor="middle" fill="#f87171" fontSize="9">Low throughput</text>
    <rect x="300" y="50" width="200" height="130" rx="8" fill="#1f2937" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Read-Write Lock</text>
    <text x="400" y="100" textAnchor="middle" fill="#9ca3af" fontSize="9">ReentrantReadWriteLock</text>
    <text x="400" y="120" textAnchor="middle" fill="#9ca3af" fontSize="9">Multiple readers allowed</text>
    <text x="400" y="140" textAnchor="middle" fill="#9ca3af" fontSize="9">Writers exclusive</text>
    <text x="400" y="165" textAnchor="middle" fill="#fbbf24" fontSize="9">Better for read-heavy</text>
    <rect x="550" y="50" width="200" height="130" rx="8" fill="#1f2937" stroke="#10b981" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Striped/Segmented</text>
    <text x="650" y="100" textAnchor="middle" fill="#9ca3af" fontSize="9">ConcurrentHashMap style</text>
    <text x="650" y="120" textAnchor="middle" fill="#9ca3af" fontSize="9">Lock per segment</text>
    <text x="650" y="140" textAnchor="middle" fill="#9ca3af" fontSize="9">Parallel access to diff keys</text>
    <text x="650" y="165" textAnchor="middle" fill="#4ade80" fontSize="9">Best throughput!</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function LRUCache({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'lru-algorithm',
      name: 'LRU Algorithm',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Least Recently Used eviction policy - when cache is full, remove the item that was accessed longest ago.',
      diagram: LRUCacheArchitectureDiagram,
      details: [
        {
          name: 'Core Concept',
          diagram: LRUCacheArchitectureDiagram,
          explanation: `LRU (Least Recently Used) is a cache eviction policy that removes the least recently accessed item when the cache reaches capacity. The key insight is that recently accessed data is likely to be accessed again soon (temporal locality).

Key principles:
- Every access (get/put) makes an item "most recently used"
- When eviction is needed, remove the "least recently used" item
- Maintains access order, not insertion order
- O(1) time complexity for all operations`,
          codeExample: `// LRU Cache Core Operations
class LRUCache {
    private Map<Integer, Node> cache;
    private int capacity;
    private Node head, tail; // Dummy nodes

    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) return -1;

        moveToHead(node); // Mark as recently used
        return node.value;
    }

    public void put(int key, int value) {
        Node node = cache.get(key);
        if (node != null) {
            node.value = value;
            moveToHead(node);
        } else {
            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            addToHead(newNode);

            if (cache.size() > capacity) {
                Node removed = removeTail(); // Evict LRU
                cache.remove(removed.key);
            }
        }
    }
}`
        },
        {
          name: 'GET Operation',
          diagram: GetOperationDiagram,
          explanation: `The GET operation retrieves a value by key and updates the access order:

1. Look up key in HashMap - O(1)
2. If not found, return -1
3. If found:
   - Move the node to the front of the list (most recently used)
   - Return the value

Moving to front involves:
- Removing node from current position
- Inserting node right after head dummy

Both operations are O(1) thanks to the doubly linked list pointers.`,
          codeExample: `public int get(int key) {
    Node node = cache.get(key);
    if (node == null) {
        return -1; // Not found
    }

    // Move to head (most recently used)
    moveToHead(node);
    return node.value;
}

private void moveToHead(Node node) {
    removeNode(node);  // O(1) - just update pointers
    addToHead(node);   // O(1) - insert after head
}

private void removeNode(Node node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
}

private void addToHead(Node node) {
    node.prev = head;
    node.next = head.next;
    head.next.prev = node;
    head.next = node;
}`
        },
        {
          name: 'PUT Operation',
          diagram: PutOperationDiagram,
          explanation: `The PUT operation adds or updates a key-value pair:

1. Check if key exists in HashMap
2. If exists: Update value, move to front
3. If new:
   - Create new node
   - Add to HashMap and list head
   - If capacity exceeded:
     * Remove tail node (LRU)
     * Remove from HashMap

The eviction happens automatically when capacity is exceeded.`,
          codeExample: `public void put(int key, int value) {
    Node node = cache.get(key);

    if (node != null) {
        // Update existing
        node.value = value;
        moveToHead(node);
    } else {
        // Add new node
        Node newNode = new Node(key, value);
        cache.put(key, newNode);
        addToHead(newNode);

        // Check capacity
        if (cache.size() > capacity) {
            // Evict least recently used
            Node removed = removeTail();
            cache.remove(removed.key);
        }
    }
}

private Node removeTail() {
    Node node = tail.prev;
    removeNode(node);
    return node;
}`
        },
        {
          name: 'Eviction Process',
          diagram: EvictionDiagram,
          explanation: `LRU Eviction removes the least recently accessed item:

Access Timeline Example (capacity=3):
- t=0: put(A) → cache: [A]
- t=1: put(B) → cache: [B, A]
- t=2: put(C) → cache: [C, B, A]
- t=3: get(A) → cache: [A, C, B] (A moved to front)
- t=4: get(C) → cache: [C, A, B] (C moved to front)
- t=5: put(D) → evict B! cache: [D, C, A]

B is evicted because it hasn't been accessed since t=1.
A and C were both accessed more recently.`,
          codeExample: `// Example trace with capacity = 3
LRUCache cache = new LRUCache(3);

cache.put(1, 100);  // [1:100]
cache.put(2, 200);  // [2:200, 1:100]
cache.put(3, 300);  // [3:300, 2:200, 1:100]

cache.get(1);       // returns 100
                    // [1:100, 3:300, 2:200]

cache.put(4, 400);  // capacity exceeded!
                    // evict 2 (LRU)
                    // [4:400, 1:100, 3:300]

cache.get(2);       // returns -1 (evicted)
cache.get(3);       // returns 300
                    // [3:300, 4:400, 1:100]`
        }
      ]
    },
    {
      id: 'data-structures',
      name: 'Data Structures',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'HashMap + Doubly Linked List combination enables O(1) time complexity for all cache operations.',
      diagram: DataStructureDiagram,
      details: [
        {
          name: 'Why Two Data Structures?',
          diagram: DataStructureDiagram,
          explanation: `Neither HashMap nor Linked List alone can achieve O(1) for all LRU operations:

HashMap alone:
- O(1) lookup by key
- Cannot track access order
- Cannot find oldest item in O(1)

Linked List alone:
- O(1) add/remove at ends
- O(1) reorder with direct node reference
- O(n) lookup by key

Combined:
- HashMap: O(1) key → node lookup
- DLL: O(1) reordering and eviction
- Together: O(1) for get, put, and evict`,
          codeExample: `class LRUCache {
    // HashMap: key -> Node (O(1) lookup)
    private Map<Integer, Node> cache;

    // Doubly Linked List: maintains access order
    private Node head; // Dummy - most recently used after this
    private Node tail; // Dummy - least recently used before this

    public LRUCache(int capacity) {
        this.capacity = capacity;
        cache = new HashMap<>();

        // Initialize dummy head and tail
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
}`
        },
        {
          name: 'Node Structure',
          diagram: NodeStructureDiagram,
          explanation: `Each node in the doubly linked list contains:

- key: Needed to remove from HashMap during eviction
- value: The cached data
- prev: Pointer to previous node
- next: Pointer to next node

Why store key in node?
When we evict the tail node, we need its key to remove it from the HashMap. Without storing the key, we'd need O(n) to find which key maps to this node.

Dummy head/tail simplify edge cases:
- No null checks for prev/next
- Consistent add/remove logic
- head.next is always MRU
- tail.prev is always LRU`,
          codeExample: `private class Node {
    int key;    // Needed for HashMap removal
    int value;  // The cached data
    Node prev;  // Previous node pointer
    Node next;  // Next node pointer

    Node(int k, int v) {
        key = k;
        value = v;
    }
}

// Why we need key in Node:
private Node removeTail() {
    Node lru = tail.prev;
    removeNode(lru);
    return lru;  // Caller uses lru.key to remove from HashMap
}

// In put():
if (cache.size() > capacity) {
    Node removed = removeTail();
    cache.remove(removed.key);  // Need the key!
}`
        },
        {
          name: 'Dummy Head/Tail',
          explanation: `Dummy (sentinel) nodes eliminate edge cases:

Without dummies:
- Check if head is null when adding
- Check if removing the only node
- Update head/tail pointers specially
- Many null checks throughout

With dummies:
- head.next is always the MRU node (or tail if empty)
- tail.prev is always the LRU node (or head if empty)
- Same add/remove logic works for all cases
- No null pointer exceptions

The trade-off is two extra nodes, but code is much cleaner.`,
          codeExample: `// Without dummy nodes - many edge cases
void addToFront(Node node) {
    if (head == null) {
        head = tail = node;
    } else {
        node.next = head;
        head.prev = node;
        head = node;
    }
}

// With dummy nodes - clean and simple
void addToHead(Node node) {
    node.prev = head;
    node.next = head.next;
    head.next.prev = node;
    head.next = node;
}

// Always works, even for empty list!
// head <-> node <-> tail (when first node added)`
        }
      ]
    },
    {
      id: 'implementation',
      name: 'Implementation',
      icon: '💻',
      color: '#10b981',
      description: 'Complete LRU Cache implementation in Java with all helper methods and complexity analysis.',
      diagram: LRUCacheArchitectureDiagram,
      details: [
        {
          name: 'Complete Java Implementation',
          explanation: `Full LRU Cache implementation with HashMap + Doubly Linked List:

Time Complexity:
- get(key): O(1)
- put(key, value): O(1)

Space Complexity: O(capacity)

Key implementation details:
- Dummy head/tail for simpler code
- Node stores key for HashMap removal
- Helper methods for node operations`,
          codeExample: `class LRUCache {
    private class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { key = k; value = v; }
    }

    private Map<Integer, Node> cache;
    private int capacity;
    private Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        cache = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) return -1;
        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        Node node = cache.get(key);
        if (node != null) {
            node.value = value;
            moveToHead(node);
        } else {
            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            addToHead(newNode);
            if (cache.size() > capacity) {
                Node removed = removeTail();
                cache.remove(removed.key);
            }
        }
    }

    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    private Node removeTail() {
        Node node = tail.prev;
        removeNode(node);
        return node;
    }
}`
        },
        {
          name: 'Python Implementation',
          explanation: `Python implementation using custom Node class and dictionary:

Python's built-in OrderedDict can also implement LRU cache with move_to_end() method, but understanding the manual implementation is important for interviews.`,
          codeExample: `class LRUCache:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.prev = None
            self.next = None

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = self.Node(0, 0)
        self.tail = self.Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            new_node = self.Node(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)
            if len(self.cache) > self.capacity:
                removed = self._remove_tail()
                del self.cache[removed.key]

    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self):
        node = self.tail.prev
        self._remove_node(node)
        return node`
        },
        {
          name: 'Using LinkedHashMap (Java)',
          explanation: `Java's LinkedHashMap with accessOrder=true provides LRU functionality built-in:

- Constructor: LinkedHashMap(capacity, loadFactor, accessOrder)
- accessOrder=true: iteration order is access order (LRU)
- Override removeEldestEntry() to auto-evict

This is the simplest implementation but may not be allowed in interviews.`,
          codeExample: `// Simple LRU using LinkedHashMap
class LRUCacheSimple extends LinkedHashMap<Integer, Integer> {
    private int capacity;

    public LRUCacheSimple(int capacity) {
        // accessOrder = true -> LRU order
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    public int get(int key) {
        return super.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        super.put(key, value);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        // Auto-evict when over capacity
        return size() > capacity;
    }
}

// Usage:
LRUCacheSimple cache = new LRUCacheSimple(3);
cache.put(1, 100);
cache.put(2, 200);
cache.get(1);       // Access key 1
cache.put(3, 300);
cache.put(4, 400);  // Evicts key 2 (LRU)`
        }
      ]
    },
    {
      id: 'thread-safety',
      name: 'Thread Safety',
      icon: '🔒',
      color: '#ef4444',
      description: 'Making LRU Cache thread-safe with various synchronization strategies for concurrent access.',
      diagram: ThreadSafetyDiagram,
      details: [
        {
          name: 'Global Lock Approach',
          diagram: ThreadSafetyDiagram,
          explanation: `The simplest approach: wrap all operations with a single lock.

Pros:
- Easy to implement
- Guaranteed correctness

Cons:
- All operations serialize
- High contention under load
- Poor scalability

Use when: Low concurrency, simplicity preferred`,
          codeExample: `class ThreadSafeLRUCache {
    private final LRUCache cache;
    private final ReentrantLock lock = new ReentrantLock();

    public ThreadSafeLRUCache(int capacity) {
        cache = new LRUCache(capacity);
    }

    public int get(int key) {
        lock.lock();
        try {
            return cache.get(key);
        } finally {
            lock.unlock();
        }
    }

    public void put(int key, int value) {
        lock.lock();
        try {
            cache.put(key, value);
        } finally {
            lock.unlock();
        }
    }
}

// Or using synchronized:
class SynchronizedLRUCache {
    private final LRUCache cache;

    public synchronized int get(int key) {
        return cache.get(key);
    }

    public synchronized void put(int key, int value) {
        cache.put(key, value);
    }
}`
        },
        {
          name: 'Read-Write Lock',
          explanation: `Use ReadWriteLock to allow multiple concurrent readers:

Pros:
- Multiple readers can proceed in parallel
- Better for read-heavy workloads

Cons:
- LRU get() modifies order, needs write lock!
- May not help much for LRU specifically

Key insight: In LRU, even get() updates the list order, so it needs exclusive access. This limits the benefit of read-write locks for LRU.`,
          codeExample: `class RWLockLRUCache {
    private final LRUCache cache;
    private final ReentrantReadWriteLock rwLock =
        new ReentrantReadWriteLock();

    // Note: get() needs WRITE lock because it
    // modifies the access order!
    public int get(int key) {
        rwLock.writeLock().lock();
        try {
            return cache.get(key);
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    public void put(int key, int value) {
        rwLock.writeLock().lock();
        try {
            cache.put(key, value);
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    // peek() - read without updating order
    // This CAN use read lock
    public int peek(int key) {
        rwLock.readLock().lock();
        try {
            Node node = cache.getNode(key);
            return node != null ? node.value : -1;
        } finally {
            rwLock.readLock().unlock();
        }
    }
}`
        },
        {
          name: 'Segmented/Striped Locks',
          explanation: `Divide cache into segments, each with its own lock:

Pros:
- Parallel access to different segments
- Much better scalability
- Used by ConcurrentHashMap

Cons:
- Complex implementation
- Per-segment LRU, not global
- May evict more frequently used items

This is what production caches like Guava Cache use.`,
          codeExample: `class SegmentedLRUCache {
    private final LRUCache[] segments;
    private final ReentrantLock[] locks;
    private final int numSegments;

    public SegmentedLRUCache(int capacity, int numSegments) {
        this.numSegments = numSegments;
        segments = new LRUCache[numSegments];
        locks = new ReentrantLock[numSegments];

        int segmentCapacity = capacity / numSegments;
        for (int i = 0; i < numSegments; i++) {
            segments[i] = new LRUCache(segmentCapacity);
            locks[i] = new ReentrantLock();
        }
    }

    private int getSegment(int key) {
        return Math.abs(key % numSegments);
    }

    public int get(int key) {
        int seg = getSegment(key);
        locks[seg].lock();
        try {
            return segments[seg].get(key);
        } finally {
            locks[seg].unlock();
        }
    }

    public void put(int key, int value) {
        int seg = getSegment(key);
        locks[seg].lock();
        try {
            segments[seg].put(key, value);
        } finally {
            locks[seg].unlock();
        }
    }
}`
        }
      ]
    },
    {
      id: 'ttl-expiry',
      name: 'TTL & Expiry',
      icon: '⏰',
      color: '#f59e0b',
      description: 'LRU Cache with time-based expiration (TTL) - items expire after a specified time in addition to LRU eviction.',
      diagram: LRUCacheExpiryDiagram,
      details: [
        {
          name: 'TTL Concept',
          diagram: LRUCacheExpiryDiagram,
          explanation: `TTL (Time To Live) adds time-based expiration to LRU:

Dual eviction policy:
1. LRU eviction when capacity is reached
2. TTL expiration when item is too old

Use cases:
- Session caching (expire after inactivity)
- API response caching (honor Cache-Control)
- DNS caching
- OAuth token caching

Each entry stores: key, value, timestamp/expiryTime`,
          codeExample: `class LRUCacheWithExpiry {
    private class Node {
        int key, value;
        long timestamp;  // Creation/update time
        Node prev, next;

        Node(int k, int v, long t) {
            key = k;
            value = v;
            timestamp = t;
        }
    }

    private Map<Integer, Node> cache;
    private int capacity;
    private long ttl;  // Time to live in milliseconds
    private Node head, tail;

    public LRUCacheWithExpiry(int capacity, long ttlMs) {
        this.capacity = capacity;
        this.ttl = ttlMs;
        cache = new HashMap<>();
        head = new Node(0, 0, 0);
        tail = new Node(0, 0, 0);
        head.next = tail;
        tail.prev = head;
    }

    private boolean isExpired(Node node) {
        return System.currentTimeMillis() - node.timestamp > ttl;
    }
}`
        },
        {
          name: 'Lazy Expiry Strategy',
          explanation: `Check expiry only when accessing items:

On get():
- Check if item is expired
- If expired: remove and return -1
- If valid: move to head, return value

On put():
- Optionally clean expired entries first
- Proceed with normal put logic

Pros: Simple, no background threads
Cons: Expired items stay in memory until accessed`,
          codeExample: `public int get(int key) {
    Node node = cache.get(key);
    if (node == null) return -1;

    // Check expiry
    if (isExpired(node)) {
        removeNode(node);
        cache.remove(key);
        return -1;  // Treat as not found
    }

    moveToHead(node);
    return node.value;
}

public void put(int key, int value) {
    // Optional: clean expired from tail
    cleanExpired();

    long now = System.currentTimeMillis();
    Node node = cache.get(key);

    if (node != null) {
        node.value = value;
        node.timestamp = now;  // Refresh timestamp
        moveToHead(node);
    } else {
        Node newNode = new Node(key, value, now);
        cache.put(key, newNode);
        addToHead(newNode);

        if (cache.size() > capacity) {
            Node removed = removeTail();
            cache.remove(removed.key);
        }
    }
}

private void cleanExpired() {
    while (tail.prev != head && isExpired(tail.prev)) {
        Node expired = removeTail();
        cache.remove(expired.key);
    }
}`
        },
        {
          name: 'Active Expiry with Heap',
          explanation: `Use a priority queue (min-heap) ordered by expiry time:

Benefits:
- Can proactively clean expired items
- O(log n) to find next expiring item
- Better memory management

Implementation:
- Store (expiryTime, key) in min-heap
- Periodically poll and remove expired items
- Handle stale entries (already removed/updated)`,
          codeExample: `class LRUCacheWithActiveExpiry {
    private Map<Integer, Node> cache;
    private PriorityQueue<long[]> expiryQueue;
    // expiryQueue stores: [expiryTime, key]

    public LRUCacheWithActiveExpiry(int cap, long ttl) {
        cache = new HashMap<>();
        expiryQueue = new PriorityQueue<>(
            (a, b) -> Long.compare(a[0], b[0])
        );
        // ... init head, tail, etc.
    }

    public void put(int key, int value) {
        cleanExpired();

        long now = System.currentTimeMillis();
        long expiryTime = now + ttl;

        Node node = cache.get(key);
        if (node == null) {
            Node newNode = new Node(key, value, expiryTime);
            cache.put(key, newNode);
            addToHead(newNode);
            expiryQueue.offer(new long[]{expiryTime, key});
            // ... handle capacity
        } else {
            node.value = value;
            node.expiryTime = expiryTime;
            moveToHead(node);
            // Note: old entry stays in queue (handled in cleanExpired)
        }
    }

    private void cleanExpired() {
        long now = System.currentTimeMillis();
        while (!expiryQueue.isEmpty() &&
               expiryQueue.peek()[0] <= now) {
            long[] entry = expiryQueue.poll();
            int key = (int) entry[1];
            Node node = cache.get(key);
            // Check if node exists and matches expiry
            if (node != null && node.expiryTime <= now) {
                removeNode(node);
                cache.remove(key);
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'lfu-cache',
      name: 'LFU Cache',
      icon: '📊',
      color: '#6366f1',
      description: 'Least Frequently Used - evicts items with lowest access count. Better for frequency-based workloads.',
      diagram: LFUCacheDiagram,
      details: [
        {
          name: 'LFU vs LRU',
          diagram: LFUCacheDiagram,
          explanation: `LFU (Least Frequently Used) tracks access count, not recency:

LRU: Evict the item accessed longest ago
LFU: Evict the item accessed least often

When to use LFU:
- Repeated access patterns (hot items)
- Resistant to one-time scan pollution
- Content popularity tracking

LFU challenges:
- New items have low frequency (vulnerable)
- Old items may accumulate high frequency
- More complex data structures needed`,
          codeExample: `// Comparison
// LRU: Access order matters
// cache: [C, B, A] - most recent first
// put(D) -> evict A (oldest access)

// LFU: Access count matters
// cache: A(freq=5), B(freq=2), C(freq=1)
// put(D) -> evict C (lowest frequency)

// LFU tie-breaker: use LRU among same freq
// If B and C both have freq=2, evict older one

/*
 * LRU vs LFU Trade-offs:
 *
 * LRU:
 * + Simple implementation
 * + Good for temporal locality
 * - Vulnerable to scan (one-time access)
 *
 * LFU:
 * + Keeps hot items
 * + Resistant to scans
 * - Complex implementation
 * - New items easily evicted
 * - Frequency can become stale
 */`
        },
        {
          name: 'LFU Data Structures',
          explanation: `LFU requires tracking both frequency AND recency (for ties):

Data structures:
1. cache: Map<key, Node>
2. freqMap: Map<freq, DoublyLinkedList>
3. minFreq: int (track minimum frequency)

Each frequency has its own DLL (LRU order within freq).

Operations:
- get(key): increment freq, move to new freq list
- put(key): add with freq=1, evict from minFreq if needed
- evict(): remove from minFreq list (oldest in that freq)`,
          codeExample: `class LFUCache {
    // Node with frequency tracking
    private class Node {
        int key, value, freq;
        Node prev, next;
        Node(int k, int v) {
            key = k;
            value = v;
            freq = 1;
        }
    }

    // DLL for each frequency
    private class DLList {
        Node head, tail;
        int size;

        DLList() {
            head = new Node(0, 0);
            tail = new Node(0, 0);
            head.next = tail;
            tail.prev = head;
        }

        void add(Node node) { /* add to head */ }
        void remove(Node node) { /* remove node */ }
        Node removeLast() { /* remove from tail */ }
    }

    private Map<Integer, Node> cache;
    private Map<Integer, DLList> freqMap;
    private int capacity, minFreq;
}`
        },
        {
          name: 'LFU Implementation',
          explanation: `Complete LFU Cache implementation:

Key insight: When updating frequency:
1. Remove node from current freq list
2. Add to (freq+1) list
3. Update minFreq if current list becomes empty

New items always have freq=1, so minFreq resets to 1 on new insertions.`,
          codeExample: `public int get(int key) {
    Node node = cache.get(key);
    if (node == null) return -1;
    updateFreq(node);
    return node.value;
}

public void put(int key, int value) {
    if (capacity == 0) return;

    Node node = cache.get(key);
    if (node != null) {
        node.value = value;
        updateFreq(node);
    } else {
        if (cache.size() >= capacity) {
            // Evict from minFreq list
            DLList minList = freqMap.get(minFreq);
            Node removed = minList.removeLast();
            cache.remove(removed.key);
        }

        Node newNode = new Node(key, value);
        cache.put(key, newNode);
        freqMap.putIfAbsent(1, new DLList());
        freqMap.get(1).add(newNode);
        minFreq = 1;  // New item has freq=1
    }
}

private void updateFreq(Node node) {
    int freq = node.freq;
    DLList list = freqMap.get(freq);
    list.remove(node);

    // Update minFreq if this list is now empty
    if (freq == minFreq && list.size == 0) {
        minFreq++;
    }

    // Move to freq+1 list
    node.freq++;
    freqMap.putIfAbsent(node.freq, new DLList());
    freqMap.get(node.freq).add(node);
}`
        }
      ]
    },
    {
      id: 'distributed-cache',
      name: 'Distributed Cache',
      icon: '🌐',
      color: '#06b6d4',
      description: 'Scaling LRU Cache across multiple nodes using consistent hashing for distributed systems.',
      diagram: DistributedCacheDiagram,
      details: [
        {
          name: 'Distributed Architecture',
          diagram: DistributedCacheDiagram,
          explanation: `Scaling LRU cache to multiple machines:

Architecture:
1. Multiple cache nodes
2. Consistent hashing for key distribution
3. Each node runs its own LRU cache

Benefits:
- Horizontal scalability
- Higher total capacity
- Fault isolation

Challenges:
- Network latency
- Cache coherence
- Hot spots`,
          codeExample: `class DistributedLRUCache {
    private List<CacheNode> nodes;
    private ConsistentHash hashRing;

    public DistributedLRUCache(List<String> nodeAddresses) {
        nodes = new ArrayList<>();
        for (String addr : nodeAddresses) {
            nodes.add(new CacheNode(addr));
        }
        hashRing = new ConsistentHash(nodeAddresses);
    }

    public int get(int key) {
        CacheNode node = getNodeForKey(key);
        return node.get(key);  // RPC call
    }

    public void put(int key, int value) {
        CacheNode node = getNodeForKey(key);
        node.put(key, value);  // RPC call
    }

    private CacheNode getNodeForKey(int key) {
        String nodeAddr = hashRing.getNode(String.valueOf(key));
        return nodes.stream()
            .filter(n -> n.address.equals(nodeAddr))
            .findFirst()
            .orElseThrow();
    }
}`
        },
        {
          name: 'Consistent Hashing',
          explanation: `Consistent hashing minimizes key redistribution when nodes change:

Traditional hashing: hash(key) % N
- Adding node: ~(N-1)/N keys move
- Removing node: ~(N-1)/N keys move

Consistent hashing: hash(key) on ring
- Adding node: ~1/N keys move
- Removing node: ~1/N keys move

Virtual nodes ensure even distribution.`,
          codeExample: `class ConsistentHash {
    private TreeMap<Long, String> ring = new TreeMap<>();
    private int virtualNodes = 150;  // Per physical node

    public void addNode(String node) {
        for (int i = 0; i < virtualNodes; i++) {
            long hash = hash(node + "#" + i);
            ring.put(hash, node);
        }
    }

    public void removeNode(String node) {
        for (int i = 0; i < virtualNodes; i++) {
            long hash = hash(node + "#" + i);
            ring.remove(hash);
        }
    }

    public String getNode(String key) {
        if (ring.isEmpty()) return null;

        long hash = hash(key);
        // Find first node clockwise from hash
        Long nodeHash = ring.ceilingKey(hash);
        if (nodeHash == null) {
            nodeHash = ring.firstKey();  // Wrap around
        }
        return ring.get(nodeHash);
    }

    private long hash(String key) {
        // Use MD5, SHA-1, or similar
        return key.hashCode() & 0xFFFFFFFFL;
    }
}`
        },
        {
          name: 'Cache Coherence',
          explanation: `Handling updates and invalidation across nodes:

Strategies:
1. Write-through: Update cache + DB together
2. Write-behind: Update cache, async write to DB
3. Cache-aside: Application manages cache

Invalidation patterns:
- TTL-based: Eventual consistency
- Event-driven: Pub/sub for updates
- Version numbers: Detect stale data`,
          codeExample: `// Cache-Aside Pattern
class CacheAsideClient {
    private DistributedLRUCache cache;
    private Database db;

    public Data get(String key) {
        // Try cache first
        Data data = cache.get(key);
        if (data != null) {
            return data;  // Cache hit
        }

        // Cache miss - load from DB
        data = db.query(key);
        if (data != null) {
            cache.put(key, data);  // Populate cache
        }
        return data;
    }

    public void update(String key, Data data) {
        // Update DB first
        db.update(key, data);

        // Invalidate cache (not update!)
        cache.delete(key);

        // Why invalidate instead of update?
        // - Simpler, no race conditions
        // - Next read will refresh from DB
    }
}

// Event-driven Invalidation
class CacheInvalidationListener {
    @Subscribe
    public void onDataChange(DataChangeEvent event) {
        cache.delete(event.getKey());
        // Or: broadcast to all cache nodes
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
      { name: 'Design', icon: '🎨', page: 'Design' },
      { name: 'LRU Cache', icon: '🔄', page: 'LRU Cache' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #312e81 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(139, 92, 246, 0.2)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#a78bfa',
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
        <h1 style={titleStyle}>LRU Cache</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Design
        </button>
      </div>

      {/* Breadcrumb navigation */}
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
                    textAlign: 'left',
                    whiteSpace: 'pre-line'
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

export default LRUCache

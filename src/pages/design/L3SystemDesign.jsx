import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#22c55e',
  primaryHover: '#4ade80',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
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

const LibrarySystemDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-lib" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Library Management System</text>
    <rect x="50" y="50" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Member</text>
    <rect x="200" y="50" width="100" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="250" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Library</text>
    <rect x="350" y="50" width="100" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Book</text>
    <rect x="500" y="50" width="100" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="550" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">BookLoan</text>
    <rect x="650" y="50" width="100" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="700" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Reservation</text>
    <line x1="150" y1="75" x2="195" y2="75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow-lib)"/>
    <line x1="300" y1="75" x2="345" y2="75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow-lib)"/>
    <line x1="450" y1="75" x2="495" y2="75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow-lib)"/>
    <line x1="600" y1="75" x2="645" y2="75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow-lib)"/>
    <text x="400" y="140" textAnchor="middle" fill="#64748b" fontSize="10">Member borrows Book via BookLoan, can create Reservation</text>
  </svg>
)

const DeckOfCardsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-deck" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Deck of Cards Class Hierarchy</text>
    <rect x="300" y="40" width="200" height="40" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="400" y="65" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Game (abstract)</text>
    <rect x="100" y="120" width="120" height="40" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="160" y="145" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Deck</text>
    <rect x="340" y="120" width="120" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="145" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Card</text>
    <rect x="580" y="120" width="120" height="40" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="640" y="145" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Hand</text>
    <line x1="350" y1="80" x2="180" y2="115" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-deck)"/>
    <line x1="400" y1="80" x2="400" y2="115" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-deck)"/>
    <line x1="450" y1="80" x2="620" y2="115" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-deck)"/>
  </svg>
)

const VendingMachineDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-vend" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Vending Machine State Diagram</text>
    <rect x="50" y="80" width="100" height="50" rx="25" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="100" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Idle</text>
    <rect x="200" y="80" width="100" height="50" rx="25" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="250" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">HasMoney</text>
    <rect x="350" y="80" width="100" height="50" rx="25" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Selected</text>
    <rect x="500" y="80" width="100" height="50" rx="25" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="550" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Dispensing</text>
    <rect x="650" y="80" width="100" height="50" rx="25" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="700" y="105" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">OutOf</text>
    <text x="700" y="118" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Stock</text>
    <line x1="150" y1="105" x2="195" y2="105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-vend)"/>
    <line x1="300" y1="105" x2="345" y2="105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-vend)"/>
    <line x1="450" y1="105" x2="495" y2="105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-vend)"/>
    <line x1="600" y1="105" x2="645" y2="105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-vend)"/>
    <text x="175" y="95" textAnchor="middle" fill="#64748b" fontSize="8">insert</text>
    <text x="325" y="95" textAnchor="middle" fill="#64748b" fontSize="8">select</text>
    <text x="475" y="95" textAnchor="middle" fill="#64748b" fontSize="8">dispense</text>
  </svg>
)

const ATMDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-atm" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">ATM System Components</text>
    <rect x="50" y="60" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Card Reader</text>
    <rect x="220" y="60" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="280" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ATM Controller</text>
    <rect x="390" y="60" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="450" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Bank Server</text>
    <rect x="560" y="60" width="120" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="620" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Account</text>
    <rect x="220" y="130" width="120" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="280" y="160" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Cash Dispenser</text>
    <line x1="170" y1="85" x2="215" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-atm)"/>
    <line x1="340" y1="85" x2="385" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-atm)"/>
    <line x1="510" y1="85" x2="555" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-atm)"/>
    <line x1="280" y1="110" x2="280" y2="125" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-atm)"/>
  </svg>
)

const TodoAPIDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-todo" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Todo List REST API Flow</text>
    <rect x="50" y="70" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Client</text>
    <rect x="220" y="70" width="120" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="280" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">REST API</text>
    <rect x="410" y="70" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="470" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Controller</text>
    <rect x="600" y="70" width="120" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="660" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Database</text>
    <line x1="150" y1="95" x2="215" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-todo)"/>
    <line x1="340" y1="95" x2="405" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-todo)"/>
    <line x1="530" y1="95" x2="595" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-todo)"/>
    <text x="180" y="85" textAnchor="middle" fill="#64748b" fontSize="8">HTTP</text>
    <text x="370" y="85" textAnchor="middle" fill="#64748b" fontSize="8">Route</text>
    <text x="560" y="85" textAnchor="middle" fill="#64748b" fontSize="8">Query</text>
  </svg>
)

const BlogAPIDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-blog" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Blog API Entity Relationships</text>
    <rect x="300" y="50" width="200" height="40" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">User</text>
    <rect x="100" y="130" width="150" height="40" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="175" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Post</text>
    <rect x="325" y="130" width="150" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Comment</text>
    <rect x="550" y="130" width="150" height="40" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="625" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Tag</text>
    <line x1="350" y1="90" x2="200" y2="125" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-blog)"/>
    <line x1="400" y1="90" x2="400" y2="125" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-blog)"/>
    <line x1="450" y1="90" x2="600" y2="125" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-blog)"/>
    <text x="260" y="105" textAnchor="middle" fill="#64748b" fontSize="9">writes</text>
    <text x="420" y="105" textAnchor="middle" fill="#64748b" fontSize="9">comments</text>
    <text x="540" y="105" textAnchor="middle" fill="#64748b" fontSize="9">tags</text>
  </svg>
)

const UserAPIDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-user" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">User Authentication Flow</text>
    <rect x="50" y="70" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Client</text>
    <rect x="200" y="70" width="120" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="260" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Auth Service</text>
    <rect x="370" y="70" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="430" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">JWT Token</text>
    <rect x="540" y="70" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="600" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Protected API</text>
    <line x1="150" y1="95" x2="195" y2="95" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-user)"/>
    <line x1="320" y1="95" x2="365" y2="95" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-user)"/>
    <line x1="490" y1="95" x2="535" y2="95" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-user)"/>
    <text x="175" y="85" textAnchor="middle" fill="#64748b" fontSize="8">login</text>
    <text x="345" y="85" textAnchor="middle" fill="#64748b" fontSize="8">issue</text>
    <text x="515" y="85" textAnchor="middle" fill="#64748b" fontSize="8">access</text>
  </svg>
)

const LRUCacheDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-lru" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">LRU Cache: HashMap + Doubly Linked List</text>
    <rect x="50" y="60" width="150" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="125" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">HashMap</text>
    <text x="125" y="110" textAnchor="middle" fill="#93c5fd" fontSize="9">key to node ref</text>
    <text x="125" y="125" textAnchor="middle" fill="#93c5fd" fontSize="9">O(1) lookup</text>
    <rect x="280" y="60" width="80" height="50" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="320" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Head</text>
    <rect x="400" y="60" width="80" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="440" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Node</text>
    <text x="440" y="100" textAnchor="middle" fill="#86efac" fontSize="8">most recent</text>
    <rect x="520" y="60" width="80" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="560" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Node</text>
    <rect x="640" y="60" width="80" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="680" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Tail</text>
    <text x="680" y="100" textAnchor="middle" fill="#fca5a5" fontSize="8">LRU evict</text>
    <line x1="360" y1="85" x2="395" y2="85" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-lru)"/>
    <line x1="480" y1="85" x2="515" y2="85" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-lru)"/>
    <line x1="600" y1="85" x2="635" y2="85" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-lru)"/>
    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="10">Doubly linked for O(1) insert/remove at any position</text>
  </svg>
)

const LeaderboardDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-lead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Leaderboard with Redis Sorted Set</text>
    <rect x="100" y="60" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="160" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Game Server</text>
    <rect x="300" y="60" width="200" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="400" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Redis ZSET</text>
    <rect x="580" y="60" width="120" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="640" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Leaderboard</text>
    <line x1="220" y1="85" x2="295" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-lead)"/>
    <line x1="500" y1="85" x2="575" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-lead)"/>
    <text x="260" y="75" textAnchor="middle" fill="#64748b" fontSize="8">ZADD</text>
    <text x="540" y="75" textAnchor="middle" fill="#64748b" fontSize="8">ZREVRANGE</text>
    <text x="400" y="140" textAnchor="middle" fill="#64748b" fontSize="10">O(log n) for add/update, O(log n + k) for top-k query</text>
  </svg>
)

const AutocompleteDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-auto" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Trie-Based Autocomplete</text>
    <circle cx="400" cy="60" r="20" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="400" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">root</text>
    <circle cx="300" cy="120" r="20" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="300" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">c</text>
    <circle cx="400" cy="120" r="20" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">a</text>
    <circle cx="500" cy="120" r="20" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="500" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">t</text>
    <circle cx="260" cy="180" r="20" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="260" y="185" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">a</text>
    <circle cx="340" cy="180" r="20" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="340" y="185" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">o</text>
    <line x1="385" y1="75" x2="315" y2="105" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-auto)"/>
    <line x1="400" y1="80" x2="400" y2="98" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-auto)"/>
    <line x1="415" y1="75" x2="485" y2="105" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-auto)"/>
    <line x1="285" y1="135" x2="270" y2="158" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-auto)"/>
    <line x1="315" y1="135" x2="330" y2="158" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-auto)"/>
    <text x="620" y="100" textAnchor="start" fill="#64748b" fontSize="10">Each node stores</text>
    <text x="620" y="115" textAnchor="start" fill="#64748b" fontSize="10">top-k suggestions</text>
    <text x="620" y="130" textAnchor="start" fill="#64748b" fontSize="10">for its prefix</text>
  </svg>
)

const TaskSchedulerDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-task" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Task Scheduler with Min-Heap</text>
    <rect x="50" y="70" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Task Queue</text>
    <polygon points="280,70 340,120 220,120" fill="#14b8a6" stroke="#2dd4bf" strokeWidth="2"/>
    <text x="280" y="110" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Min-Heap</text>
    <rect x="400" y="70" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="460" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Worker</text>
    <rect x="580" y="70" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="640" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Execute</text>
    <line x1="170" y1="95" x2="215" y2="95" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-task)"/>
    <line x1="340" y1="95" x2="395" y2="95" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-task)"/>
    <line x1="520" y1="95" x2="575" y2="95" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-task)"/>
    <text x="195" y="85" textAnchor="middle" fill="#64748b" fontSize="8">add</text>
    <text x="370" y="85" textAnchor="middle" fill="#64748b" fontSize="8">pop min</text>
    <text x="550" y="85" textAnchor="middle" fill="#64748b" fontSize="8">run</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function L3SystemDesign({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'library-management',
      name: 'Library Management System',
      icon: '📚',
      color: '#22c55e',
      description: 'Design a system to manage library operations including books, members, and borrowing.',
      diagram: LibrarySystemDiagram,
      details: [
        {
          name: 'Core Entities',
          explanation: 'The system consists of key entities: Book (ISBN, title, author, publisher, copies, status), Member (memberId, name, email, borrowedBooks, fines), Librarian (employeeId, name, permissions), Library (name, address, books, members), BookLoan (book, member, issueDate, dueDate, returnDate), and Reservation (book, member, reservationDate, status). Library has many Books and Members. Member can borrow multiple Books (max limit). Book can have multiple Copies. BookLoan links Member to Book with dates.',
          codeExample: `public class Book {
    private String ISBN;
    private String title;
    private String author;
    private BookStatus status;
    private List<BookCopy> copies;
}

public class Member {
    private String memberId;
    private String name;
    private List<BookLoan> borrowedBooks;
    private double fines;
    private static final int MAX_BOOKS = 5;
}

public class BookLoan {
    private Book book;
    private Member member;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
}`
        },
        {
          name: 'Key Operations',
          explanation: 'Essential methods include: searchBook(query) returns List<Book> for finding books by title, author, or ISBN. issueBook(memberId, ISBN) creates a BookLoan and updates book availability. returnBook(loanId) processes return and calculates any fines. reserveBook(memberId, ISBN) creates a Reservation for unavailable books. calculateFine(loan) computes overdue charges based on return date vs due date.',
          codeExample: `public class LibraryService {
    public List<Book> searchBook(String query) {
        return bookRepository.findByTitleOrAuthorOrISBN(query);
    }

    public BookLoan issueBook(String memberId, String isbn) {
        Member member = memberRepository.findById(memberId);
        Book book = bookRepository.findByISBN(isbn);

        if (member.getBorrowedBooks().size() >= Member.MAX_BOOKS) {
            throw new MaxBooksExceededException();
        }
        if (!book.isAvailable()) {
            throw new BookNotAvailableException();
        }

        BookLoan loan = new BookLoan(book, member, LocalDate.now());
        loan.setDueDate(LocalDate.now().plusDays(14));
        return loanRepository.save(loan);
    }

    public double calculateFine(BookLoan loan) {
        long daysOverdue = ChronoUnit.DAYS.between(
            loan.getDueDate(), LocalDate.now());
        return daysOverdue > 0 ? daysOverdue * FINE_PER_DAY : 0;
    }
}`
        },
        {
          name: 'Design Patterns',
          explanation: 'Singleton pattern for Library ensures single instance managing all resources. Factory pattern for BookLoan creation encapsulates loan initialization logic. Observer pattern notifies waiting members when reserved books become available. Repository pattern abstracts data access. Strategy pattern can handle different fine calculation policies.',
          codeExample: `// Singleton for Library
public class Library {
    private static Library instance;
    private Library() {}

    public static synchronized Library getInstance() {
        if (instance == null) {
            instance = new Library();
        }
        return instance;
    }
}

// Observer for availability notifications
public interface BookAvailabilityObserver {
    void onBookAvailable(Book book);
}

public class ReservationNotifier {
    private Map<String, List<BookAvailabilityObserver>> observers;

    public void notifyAvailability(Book book) {
        List<BookAvailabilityObserver> bookObservers =
            observers.get(book.getISBN());
        if (bookObservers != null) {
            bookObservers.forEach(o -> o.onBookAvailable(book));
        }
    }
}`
        }
      ]
    },
    {
      id: 'deck-of-cards',
      name: 'Deck of Cards',
      icon: '🃏',
      color: '#ef4444',
      description: 'Design a generic deck of cards that can support multiple card games.',
      diagram: DeckOfCardsDiagram,
      details: [
        {
          name: 'Card & Deck Structure',
          explanation: 'Card has suit (Enum: HEARTS, DIAMONDS, CLUBS, SPADES) and rank (Enum: ACE through KING). Deck contains 52 Cards and tracks remaining cards. Hand holds a subset of Cards dealt from Deck. The design supports multiple decks for casino games and can be extended for different game types.',
          codeExample: `public enum Suit {
    HEARTS, DIAMONDS, CLUBS, SPADES
}

public enum Rank {
    ACE(1), TWO(2), THREE(3), FOUR(4), FIVE(5),
    SIX(6), SEVEN(7), EIGHT(8), NINE(9), TEN(10),
    JACK(11), QUEEN(12), KING(13);

    private final int value;
    Rank(int value) { this.value = value; }
    public int getValue() { return value; }
}

public class Card {
    private final Suit suit;
    private final Rank rank;
    private boolean faceUp;

    public Card(Suit suit, Rank rank) {
        this.suit = suit;
        this.rank = rank;
        this.faceUp = false;
    }
}

public class Deck {
    private List<Card> cards;
    private int currentIndex;

    public Deck() {
        cards = new ArrayList<>();
        for (Suit suit : Suit.values()) {
            for (Rank rank : Rank.values()) {
                cards.add(new Card(suit, rank));
            }
        }
        currentIndex = 0;
    }
}`
        },
        {
          name: 'Shuffle & Deal Operations',
          explanation: 'shuffle() uses Fisher-Yates algorithm for O(n) uniform random shuffle. dealCard() returns next card and increments index. dealHand(numCards) creates a Hand with specified number of cards. reset() reinitializes the deck for a new game. getRemainingCount() returns cards left in deck.',
          codeExample: `public class Deck {
    // Fisher-Yates shuffle - O(n)
    public void shuffle() {
        Random rand = new Random();
        for (int i = cards.size() - 1; i > 0; i--) {
            int j = rand.nextInt(i + 1);
            // Swap cards[i] and cards[j]
            Card temp = cards.get(i);
            cards.set(i, cards.get(j));
            cards.set(j, temp);
        }
        currentIndex = 0;
    }

    public Card dealCard() {
        if (currentIndex >= cards.size()) {
            throw new NoCardsRemainingException();
        }
        return cards.get(currentIndex++);
    }

    public Hand dealHand(int numCards) {
        List<Card> handCards = new ArrayList<>();
        for (int i = 0; i < numCards; i++) {
            handCards.add(dealCard());
        }
        return new Hand(handCards);
    }

    public int getRemainingCount() {
        return cards.size() - currentIndex;
    }

    public void reset() {
        currentIndex = 0;
        shuffle();
    }
}`
        },
        {
          name: 'Game Abstraction',
          explanation: 'Factory pattern creates different game types (Blackjack, Poker). Strategy pattern encapsulates different game rules. Template Method defines game flow with customizable steps. Abstract Game class defines common interface while concrete implementations handle specific rules.',
          codeExample: `public abstract class Game {
    protected Deck deck;
    protected List<Player> players;

    public abstract void dealInitialCards();
    public abstract boolean isGameOver();
    public abstract Player determineWinner();

    // Template method for game flow
    public void play() {
        deck.shuffle();
        dealInitialCards();
        while (!isGameOver()) {
            for (Player player : players) {
                playerTurn(player);
            }
        }
        announceWinner(determineWinner());
    }

    protected abstract void playerTurn(Player player);
}

public class BlackjackGame extends Game {
    @Override
    public void dealInitialCards() {
        for (Player player : players) {
            player.addCard(deck.dealCard());
            player.addCard(deck.dealCard());
        }
    }

    @Override
    public boolean isGameOver() {
        return players.stream()
            .allMatch(p -> p.isStanding() || p.isBusted());
    }
}

// Factory for creating games
public class GameFactory {
    public static Game createGame(GameType type, List<Player> players) {
        return switch (type) {
            case BLACKJACK -> new BlackjackGame(players);
            case POKER -> new PokerGame(players);
            default -> throw new IllegalArgumentException();
        };
    }
}`
        }
      ]
    },
    {
      id: 'vending-machine',
      name: 'Vending Machine',
      icon: '🏭',
      color: '#f59e0b',
      description: 'Design a vending machine with product selection, payment, and inventory management.',
      diagram: VendingMachineDiagram,
      details: [
        {
          name: 'Core Components',
          explanation: 'VendingMachine maintains inventory, currentState, and balance. Product has id, name, price, and quantity. Inventory organizes products in slots. Coin/Bill tracks denomination and count for change. State enum tracks machine status: Idle, HasMoney, Dispensing, OutOfStock.',
          codeExample: `public class VendingMachine {
    private Inventory inventory;
    private VendingState currentState;
    private double currentBalance;
    private Map<Denomination, Integer> cashBox;

    public VendingMachine() {
        this.inventory = new Inventory();
        this.currentState = VendingState.IDLE;
        this.currentBalance = 0;
        this.cashBox = new EnumMap<>(Denomination.class);
    }
}

public class Product {
    private String id;
    private String name;
    private double price;
    private int quantity;
}

public class Inventory {
    private Map<String, Product> slots; // slotCode -> Product

    public Product getProduct(String slotCode) {
        return slots.get(slotCode);
    }

    public void reduceQuantity(String slotCode) {
        Product p = slots.get(slotCode);
        p.setQuantity(p.getQuantity() - 1);
    }
}

public enum VendingState {
    IDLE, HAS_MONEY, DISPENSING, OUT_OF_STOCK
}`
        },
        {
          name: 'Key Operations',
          explanation: 'selectProduct(code) validates selection and checks availability. insertMoney(amount) adds to balance and transitions state. dispense() delivers product if sufficient funds. returnChange() calculates and returns coins using greedy algorithm. refund() returns all inserted money.',
          codeExample: `public class VendingMachine {
    public Product selectProduct(String code) {
        Product product = inventory.getProduct(code);
        if (product == null) {
            throw new InvalidSelectionException();
        }
        if (product.getQuantity() <= 0) {
            currentState = VendingState.OUT_OF_STOCK;
            throw new OutOfStockException();
        }
        return product;
    }

    public double insertMoney(double amount) {
        currentBalance += amount;
        currentState = VendingState.HAS_MONEY;
        return currentBalance;
    }

    public Product dispense(String code) {
        Product product = selectProduct(code);
        if (currentBalance < product.getPrice()) {
            throw new InsufficientFundsException();
        }

        currentState = VendingState.DISPENSING;
        inventory.reduceQuantity(code);
        double change = currentBalance - product.getPrice();
        currentBalance = 0;

        if (change > 0) {
            returnChange(change);
        }

        currentState = VendingState.IDLE;
        return product;
    }

    public List<Coin> returnChange(double amount) {
        List<Coin> change = new ArrayList<>();
        // Greedy algorithm for coin selection
        for (Denomination d : Denomination.values()) {
            while (amount >= d.getValue() && cashBox.get(d) > 0) {
                change.add(new Coin(d));
                amount -= d.getValue();
                cashBox.put(d, cashBox.get(d) - 1);
            }
        }
        return change;
    }
}`
        },
        {
          name: 'State Pattern',
          explanation: 'State pattern manages machine behavior based on current state. Each state handles operations differently. Transitions occur based on user actions. This cleanly separates state-specific logic and makes adding new states easy.',
          codeExample: `public interface VendingMachineState {
    void insertMoney(VendingMachine machine, double amount);
    void selectProduct(VendingMachine machine, String code);
    void dispense(VendingMachine machine);
    void refund(VendingMachine machine);
}

public class IdleState implements VendingMachineState {
    @Override
    public void insertMoney(VendingMachine machine, double amount) {
        machine.addToBalance(amount);
        machine.setState(new HasMoneyState());
    }

    @Override
    public void selectProduct(VendingMachine machine, String code) {
        throw new IllegalStateException("Insert money first");
    }

    @Override
    public void dispense(VendingMachine machine) {
        throw new IllegalStateException("Insert money first");
    }
}

public class HasMoneyState implements VendingMachineState {
    @Override
    public void selectProduct(VendingMachine machine, String code) {
        Product p = machine.getInventory().getProduct(code);
        if (machine.getBalance() >= p.getPrice()) {
            machine.setSelectedProduct(p);
            machine.setState(new DispensingState());
        }
    }

    @Override
    public void refund(VendingMachine machine) {
        machine.returnChange(machine.getBalance());
        machine.setBalance(0);
        machine.setState(new IdleState());
    }
}`
        }
      ]
    },
    {
      id: 'atm',
      name: 'ATM System',
      icon: '🏧',
      color: '#3b82f6',
      description: 'Design an ATM with authentication, transactions, and cash management.',
      diagram: ATMDiagram,
      details: [
        {
          name: 'System Components',
          explanation: 'ATM has location, cashDispenser, cardReader, and state. Account stores accountNumber, balance, type, and holder. Card contains cardNumber, expiryDate, and hashed PIN. Transaction records type, amount, timestamp, and status. CashDispenser tracks available denominations and counts.',
          codeExample: `public class ATM {
    private String location;
    private CashDispenser cashDispenser;
    private CardReader cardReader;
    private ATMState currentState;
    private Account currentAccount;
}

public class Account {
    private String accountNumber;
    private double balance;
    private AccountType type;
    private Customer holder;

    public synchronized boolean withdraw(double amount) {
        if (balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }

    public synchronized void deposit(double amount) {
        balance += amount;
    }
}

public class CashDispenser {
    private Map<Denomination, Integer> cashInventory;

    public boolean canDispense(double amount) {
        // Check if we have enough cash
        return calculateDispense(amount) != null;
    }

    public List<Bill> dispense(double amount) {
        List<Bill> bills = calculateDispense(amount);
        // Update inventory
        for (Bill bill : bills) {
            int count = cashInventory.get(bill.getDenomination());
            cashInventory.put(bill.getDenomination(), count - 1);
        }
        return bills;
    }
}`
        },
        {
          name: 'Transaction Operations',
          explanation: 'authenticateUser(card, PIN) validates credentials against bank server. withdraw(amount) checks balance and dispenses cash. deposit(amount) accepts cash/check and updates balance. transfer(toAccount, amount) moves funds between accounts. getBalance() returns current account balance. All operations create Transaction records.',
          codeExample: `public class ATMService {
    private BankServer bankServer;

    public boolean authenticateUser(Card card, String pin) {
        // Hash PIN and validate against stored hash
        String hashedPin = hashPin(pin);
        return bankServer.validateCredentials(
            card.getCardNumber(), hashedPin);
    }

    public Transaction withdraw(Account account, double amount) {
        Transaction tx = new Transaction(
            TransactionType.WITHDRAWAL, amount);

        try {
            if (!account.withdraw(amount)) {
                tx.setStatus(TransactionStatus.FAILED);
                throw new InsufficientFundsException();
            }

            if (!cashDispenser.canDispense(amount)) {
                account.deposit(amount); // Rollback
                tx.setStatus(TransactionStatus.FAILED);
                throw new CashDispenserException();
            }

            cashDispenser.dispense(amount);
            tx.setStatus(TransactionStatus.SUCCESS);

        } catch (Exception e) {
            tx.setStatus(TransactionStatus.FAILED);
            throw e;
        }

        return transactionRepository.save(tx);
    }

    public Transaction transfer(Account from, Account to, double amount) {
        synchronized (getLock(from, to)) {
            from.withdraw(amount);
            to.deposit(amount);
            return new Transaction(TransactionType.TRANSFER, amount);
        }
    }
}`
        },
        {
          name: 'Design Patterns',
          explanation: 'State pattern manages ATM states (Idle, CardInserted, Authenticated, Transaction). Command pattern encapsulates transactions as objects for undo/logging. Chain of Responsibility validates transactions through multiple checks (balance, daily limit, dispenser availability).',
          codeExample: `// Command pattern for transactions
public interface TransactionCommand {
    void execute();
    void undo();
}

public class WithdrawCommand implements TransactionCommand {
    private Account account;
    private double amount;
    private boolean executed = false;

    @Override
    public void execute() {
        if (account.withdraw(amount)) {
            executed = true;
        }
    }

    @Override
    public void undo() {
        if (executed) {
            account.deposit(amount);
            executed = false;
        }
    }
}

// Chain of Responsibility for validation
public abstract class TransactionValidator {
    protected TransactionValidator next;

    public void setNext(TransactionValidator next) {
        this.next = next;
    }

    public abstract boolean validate(Transaction tx);
}

public class BalanceValidator extends TransactionValidator {
    @Override
    public boolean validate(Transaction tx) {
        if (tx.getAccount().getBalance() < tx.getAmount()) {
            return false;
        }
        return next == null || next.validate(tx);
    }
}

public class DailyLimitValidator extends TransactionValidator {
    @Override
    public boolean validate(Transaction tx) {
        double todayTotal = getTodayWithdrawals(tx.getAccount());
        if (todayTotal + tx.getAmount() > DAILY_LIMIT) {
            return false;
        }
        return next == null || next.validate(tx);
    }
}`
        }
      ]
    },
    {
      id: 'todo-api',
      name: 'Todo List API',
      icon: '✅',
      color: '#10b981',
      description: 'Design a RESTful API for a todo list application.',
      diagram: TodoAPIDiagram,
      details: [
        {
          name: 'REST Endpoints',
          explanation: 'GET /todos - List all todos with pagination. POST /todos - Create new todo. GET /todos/:id - Get specific todo. PUT /todos/:id - Update todo. DELETE /todos/:id - Delete todo. PATCH /todos/:id/complete - Toggle completion status. Use query params for filtering: ?status=completed&priority=high. Pagination: ?page=1&limit=20.',
          codeExample: `@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @GetMapping
    public Page<Todo> listTodos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority) {

        Pageable pageable = PageRequest.of(page, limit);
        return todoService.findAll(status, priority, pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Todo createTodo(@Valid @RequestBody CreateTodoRequest request) {
        return todoService.create(request);
    }

    @GetMapping("/{id}")
    public Todo getTodo(@PathVariable Long id) {
        return todoService.findById(id)
            .orElseThrow(() -> new TodoNotFoundException(id));
    }

    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id,
                          @Valid @RequestBody UpdateTodoRequest request) {
        return todoService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTodo(@PathVariable Long id) {
        todoService.delete(id);
    }

    @PatchMapping("/{id}/complete")
    public Todo toggleComplete(@PathVariable Long id) {
        return todoService.toggleComplete(id);
    }
}`
        },
        {
          name: 'Request/Response DTOs',
          explanation: 'Create request: { title, description?, dueDate?, priority? }. Response: { id, title, description, completed, dueDate, priority, createdAt, updatedAt }. Use validation annotations for input validation. Include total count in response headers for pagination.',
          codeExample: `public class CreateTodoRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 200)
    private String title;

    @Size(max = 1000)
    private String description;

    @Future(message = "Due date must be in the future")
    private LocalDateTime dueDate;

    private Priority priority = Priority.MEDIUM;
}

public class TodoResponse {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private LocalDateTime dueDate;
    private Priority priority;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

// Entity
@Entity
@Table(name = "todos")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private boolean completed = false;

    private LocalDateTime dueDate;

    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.MEDIUM;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}`
        },
        {
          name: 'HTTP Status Codes',
          explanation: '200 OK - Successful GET/PUT request. 201 Created - Successful POST creating new resource. 204 No Content - Successful DELETE. 400 Bad Request - Invalid input validation. 404 Not Found - Todo does not exist. 401 Unauthorized - User not authenticated. 403 Forbidden - User lacks permission.',
          codeExample: `@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TodoNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(TodoNotFoundException ex) {
        return new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            LocalDateTime.now()
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.toList());

        return new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            "Validation failed",
            errors,
            LocalDateTime.now()
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponse handleForbidden(AccessDeniedException ex) {
        return new ErrorResponse(
            HttpStatus.FORBIDDEN.value(),
            "Access denied",
            LocalDateTime.now()
        );
    }
}`
        }
      ]
    },
    {
      id: 'blog-api',
      name: 'Blog Post API',
      icon: '📝',
      color: '#8b5cf6',
      description: 'Design a RESTful API for a blog platform with posts, comments, and users.',
      diagram: BlogAPIDiagram,
      details: [
        {
          name: 'REST Endpoints',
          explanation: 'GET /posts - List posts with pagination. POST /posts - Create post (auth required). GET /posts/:id - Get post with comments. PUT /posts/:id - Update post (owner only). DELETE /posts/:id - Delete post (owner only). GET /posts/:id/comments - Get comments. POST /posts/:id/comments - Add comment. GET /users/:id/posts - Get user posts. Filter: ?tag=tech&author=john. Sort: ?sort=-createdAt.',
          codeExample: `@RestController
@RequestMapping("/api")
public class BlogController {

    @GetMapping("/posts")
    public Page<PostSummary> listPosts(
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String author,
            @RequestParam(defaultValue = "-createdAt") String sort,
            Pageable pageable) {
        return postService.findAll(tag, author, sort, pageable);
    }

    @PostMapping("/posts")
    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.CREATED)
    public Post createPost(@Valid @RequestBody CreatePostRequest request,
                          @AuthenticationPrincipal User user) {
        return postService.create(request, user);
    }

    @GetMapping("/posts/{id}")
    public PostWithComments getPost(@PathVariable Long id) {
        return postService.findByIdWithComments(id);
    }

    @PutMapping("/posts/{id}")
    @PreAuthorize("@postSecurity.isOwner(#id, principal)")
    public Post updatePost(@PathVariable Long id,
                          @Valid @RequestBody UpdatePostRequest request) {
        return postService.update(id, request);
    }

    @GetMapping("/posts/{postId}/comments")
    public Page<Comment> getComments(@PathVariable Long postId,
                                     Pageable pageable) {
        return commentService.findByPostId(postId, pageable);
    }

    @PostMapping("/posts/{postId}/comments")
    @PreAuthorize("isAuthenticated()")
    public Comment addComment(@PathVariable Long postId,
                             @Valid @RequestBody CreateCommentRequest request,
                             @AuthenticationPrincipal User user) {
        return commentService.create(postId, request, user);
    }
}`
        },
        {
          name: 'Entity Relationships',
          explanation: 'User writes many Posts and Comments. Post has one Author (User), many Comments, and many Tags (ManyToMany). Comment belongs to one Post and one User. Tag can be on many Posts. Use lazy loading for collections to avoid N+1 queries.',
          codeExample: `@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "post_tags",
        joinColumns = @JoinColumn(name = "post_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    @CreatedDate
    private LocalDateTime createdAt;
}

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User author;
}`
        },
        {
          name: 'Authentication & Authorization',
          explanation: 'JWT tokens in Authorization header (Bearer token). Refresh token endpoint for token renewal. Role-based access: author (write own), admin (manage all), reader (read only). Use Spring Security annotations for method-level security.',
          codeExample: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/api/posts/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}

@Service
public class PostSecurityService {

    public boolean isOwner(Long postId, UserDetails principal) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) return false;
        return post.getAuthor().getUsername()
            .equals(principal.getUsername());
    }

    public boolean isOwnerOrAdmin(Long postId, UserDetails principal) {
        return isOwner(postId, principal) ||
            principal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }
}`
        }
      ]
    },
    {
      id: 'user-api',
      name: 'User Management API',
      icon: '👤',
      color: '#ec4899',
      description: 'Design a user management system with authentication, roles, and profiles.',
      diagram: UserAPIDiagram,
      details: [
        {
          name: 'Auth Endpoints',
          explanation: 'POST /auth/register - Create new account. POST /auth/login - Authenticate user, return tokens. POST /auth/logout - Invalidate session. POST /auth/refresh - Refresh access token. POST /auth/forgot-password - Request reset email. POST /auth/reset-password - Reset with token. GET /users/me - Get current user. PUT /users/me - Update profile.',
          codeExample: `@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/logout")
    public void logout(@RequestHeader("Authorization") String token) {
        authService.logout(extractToken(token));
    }

    @PostMapping("/refresh")
    public AuthResponse refresh(@RequestBody RefreshTokenRequest request) {
        return authService.refreshToken(request.getRefreshToken());
    }

    @PostMapping("/forgot-password")
    public void forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.sendPasswordResetEmail(request.getEmail());
    }

    @PostMapping("/reset-password")
    public void resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request.getToken(), request.getNewPassword());
    }
}

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/me")
    public UserResponse getCurrentUser(@AuthenticationPrincipal User user) {
        return userService.getCurrentUser(user);
    }

    @PutMapping("/me")
    public UserResponse updateProfile(@AuthenticationPrincipal User user,
                                      @Valid @RequestBody UpdateProfileRequest req) {
        return userService.updateProfile(user, req);
    }
}`
        },
        {
          name: 'Security Best Practices',
          explanation: 'Password hashing with bcrypt (cost factor 12+). JWT with short expiry (15 min) plus refresh tokens (7 days). Rate limiting on auth endpoints (5 attempts/minute). Email verification for registration. HTTPS only in production. Store refresh tokens securely, allow revocation.',
          codeExample: `@Service
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepo;

    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException();
        }

        User user = new User();
        user.setEmail(request.getEmail());
        // Bcrypt hashing
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmailVerified(false);
        user.setRole(Role.USER);

        userRepository.save(user);
        sendVerificationEmail(user);

        return new UserResponse(user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        if (!user.isEmailVerified()) {
            throw new EmailNotVerifiedException();
        }

        String accessToken = tokenProvider.generateAccessToken(user);
        String refreshToken = tokenProvider.generateRefreshToken(user);

        // Store refresh token for revocation
        refreshTokenRepo.save(new RefreshToken(user, refreshToken));

        return new AuthResponse(accessToken, refreshToken, user);
    }

    public void logout(String token) {
        // Add to blacklist or remove refresh token
        refreshTokenRepo.deleteByToken(token);
    }
}`
        },
        {
          name: 'Role-Based Access Control',
          explanation: 'Roles: admin (full access), moderator (manage content), user (basic access). Permissions: read, write, delete, admin. Middleware checks role on protected routes. Use hierarchical roles or permission-based checks.',
          codeExample: `public enum Role {
    USER,
    MODERATOR,
    ADMIN
}

public enum Permission {
    READ,
    WRITE,
    DELETE,
    MANAGE_USERS
}

@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Permission> permissions = new HashSet<>();

    public boolean hasPermission(Permission permission) {
        // Admin has all permissions
        if (role == Role.ADMIN) return true;
        return permissions.contains(permission);
    }
}

// Method security
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/users")
public List<User> getAllUsers() {
    return userService.findAll();
}

@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
@DeleteMapping("/posts/{id}")
public void deletePost(@PathVariable Long id) {
    postService.delete(id);
}

@PreAuthorize("@userSecurity.isOwner(#id, principal)")
@PutMapping("/users/{id}")
public User updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest req) {
    return userService.update(id, req);
}`
        }
      ]
    },
    {
      id: 'lru-cache',
      name: 'LRU Cache',
      icon: '💾',
      color: '#06b6d4',
      description: 'Design a Least Recently Used cache with O(1) operations.',
      diagram: LRUCacheDiagram,
      details: [
        {
          name: 'Data Structures',
          explanation: 'HashMap provides O(1) key lookup to node reference. Doubly Linked List enables O(1) insert/remove and maintains access order. Node contains key, value, prev, and next pointers. Head points to most recently used, tail to least recently used.',
          codeExample: `public class LRUCache<K, V> {
    private final int capacity;
    private final Map<K, Node<K, V>> map;
    private final Node<K, V> head;  // Dummy head
    private final Node<K, V> tail;  // Dummy tail

    private static class Node<K, V> {
        K key;
        V value;
        Node<K, V> prev;
        Node<K, V> next;

        Node(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();

        // Initialize dummy head and tail
        this.head = new Node<>(null, null);
        this.tail = new Node<>(null, null);
        head.next = tail;
        tail.prev = head;
    }
}`
        },
        {
          name: 'Get & Put Operations',
          explanation: 'GET: If key exists, move node to head (most recent), return value. PUT: If key exists, update value and move to head. If key does not exist, create node at head. If capacity exceeded, remove tail node (least recent) and delete from HashMap.',
          codeExample: `public class LRUCache<K, V> {

    public V get(K key) {
        Node<K, V> node = map.get(key);
        if (node == null) {
            return null;  // or throw exception
        }
        // Move to head (most recently used)
        moveToHead(node);
        return node.value;
    }

    public void put(K key, V value) {
        Node<K, V> node = map.get(key);

        if (node != null) {
            // Update existing
            node.value = value;
            moveToHead(node);
        } else {
            // Create new node
            Node<K, V> newNode = new Node<>(key, value);
            map.put(key, newNode);
            addToHead(newNode);

            // Evict if over capacity
            if (map.size() > capacity) {
                Node<K, V> lru = removeTail();
                map.remove(lru.key);
            }
        }
    }

    private void moveToHead(Node<K, V> node) {
        removeNode(node);
        addToHead(node);
    }

    private void addToHead(Node<K, V> node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node<K, V> node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private Node<K, V> removeTail() {
        Node<K, V> lru = tail.prev;
        removeNode(lru);
        return lru;
    }
}`
        },
        {
          name: 'Thread Safety',
          explanation: 'For concurrent access, use synchronized methods or ReentrantReadWriteLock. Read operations can use read lock (shared), write operations use write lock (exclusive). Consider using ConcurrentHashMap with synchronized list operations. Complexity remains O(1) for both get and put.',
          codeExample: `public class ConcurrentLRUCache<K, V> {
    private final int capacity;
    private final Map<K, Node<K, V>> map;
    private final Node<K, V> head;
    private final Node<K, V> tail;
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    public V get(K key) {
        lock.writeLock().lock();  // Need write lock to move node
        try {
            Node<K, V> node = map.get(key);
            if (node == null) return null;
            moveToHead(node);
            return node.value;
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void put(K key, V value) {
        lock.writeLock().lock();
        try {
            Node<K, V> node = map.get(key);
            if (node != null) {
                node.value = value;
                moveToHead(node);
            } else {
                Node<K, V> newNode = new Node<>(key, value);
                map.put(key, newNode);
                addToHead(newNode);
                if (map.size() > capacity) {
                    Node<K, V> lru = removeTail();
                    map.remove(lru.key);
                }
            }
        } finally {
            lock.writeLock().unlock();
        }
    }

    // Time: O(1) for both get and put
    // Space: O(capacity)
}`
        }
      ]
    },
    {
      id: 'leaderboard',
      name: 'Leaderboard System',
      icon: '🏆',
      color: '#f59e0b',
      description: 'Design a real-time leaderboard for ranking players by score.',
      diagram: LeaderboardDiagram,
      details: [
        {
          name: 'Data Structure Options',
          explanation: 'Sorted Array: Simple, fast range queries, but O(n) insert/update - good for small datasets. Balanced BST (TreeMap): O(log n) for all operations - good for medium datasets. Skip List: O(log n), simpler than BST - used by Redis. Bucket + Sorted Set: Very fast for score ranges - good for large scale.',
          codeExample: `// Approach 1: TreeMap for medium scale
public class Leaderboard {
    // score -> set of playerIds with that score
    private TreeMap<Integer, Set<String>> scoreToPlayers;
    // playerId -> score
    private Map<String, Integer> playerScores;

    public Leaderboard() {
        scoreToPlayers = new TreeMap<>(Collections.reverseOrder());
        playerScores = new HashMap<>();
    }

    // O(log n)
    public void addScore(String playerId, int score) {
        // Remove old score if exists
        if (playerScores.containsKey(playerId)) {
            int oldScore = playerScores.get(playerId);
            scoreToPlayers.get(oldScore).remove(playerId);
            if (scoreToPlayers.get(oldScore).isEmpty()) {
                scoreToPlayers.remove(oldScore);
            }
        }

        // Add new score
        playerScores.put(playerId, score);
        scoreToPlayers.computeIfAbsent(score, k -> new LinkedHashSet<>())
                      .add(playerId);
    }

    // O(k log n) where k is count
    public List<String> getTopK(int k) {
        List<String> result = new ArrayList<>();
        for (Set<String> players : scoreToPlayers.values()) {
            for (String player : players) {
                result.add(player);
                if (result.size() >= k) return result;
            }
        }
        return result;
    }
}`
        },
        {
          name: 'Redis Implementation',
          explanation: 'Redis Sorted Set (ZSET) provides O(log n) for all operations. ZADD leaderboard <score> <playerId> adds/updates score. ZREVRANGE leaderboard 0 9 gets top 10. ZREVRANK leaderboard <playerId> gets player rank. Handles millions of players efficiently.',
          codeExample: `// Using Redis with Jedis client
public class RedisLeaderboard {
    private final JedisPool jedisPool;
    private final String key = "leaderboard";

    public void addScore(String playerId, double score) {
        try (Jedis jedis = jedisPool.getResource()) {
            jedis.zadd(key, score, playerId);
        }
    }

    public List<String> getTopK(int k) {
        try (Jedis jedis = jedisPool.getResource()) {
            // ZREVRANGE returns highest scores first
            return jedis.zrevrange(key, 0, k - 1)
                        .stream().toList();
        }
    }

    public Long getRank(String playerId) {
        try (Jedis jedis = jedisPool.getResource()) {
            // ZREVRANK: 0 = highest score
            return jedis.zrevrank(key, playerId);
        }
    }

    public Double getScore(String playerId) {
        try (Jedis jedis = jedisPool.getResource()) {
            return jedis.zscore(key, playerId);
        }
    }

    public List<Tuple> getTopKWithScores(int k) {
        try (Jedis jedis = jedisPool.getResource()) {
            return jedis.zrevrangeWithScores(key, 0, k - 1)
                        .stream().toList();
        }
    }
}`
        },
        {
          name: 'Handling Ties',
          explanation: 'Include timestamp in score: score * 1e10 + (MAX_TS - timestamp) ensures earlier achievers rank higher. Secondary sort by name for deterministic ordering. Store composite key for complex tie-breaking rules.',
          codeExample: `public class LeaderboardWithTieBreaker {
    private static final long MAX_TIMESTAMP = 9999999999L;

    // Encode score with timestamp for tie-breaking
    // Earlier timestamp wins ties (lower composite = earlier)
    public double encodeScore(int score, long timestamp) {
        // score * 1e10 ensures score is primary sort key
        // Subtract from MAX to make earlier times sort higher
        return score * 1e10 + (MAX_TIMESTAMP - timestamp);
    }

    public int decodeScore(double compositeScore) {
        return (int) (compositeScore / 1e10);
    }

    public void addScore(String playerId, int score) {
        long timestamp = System.currentTimeMillis() / 1000;
        double compositeScore = encodeScore(score, timestamp);

        try (Jedis jedis = jedisPool.getResource()) {
            jedis.zadd("leaderboard", compositeScore, playerId);
        }
    }

    // Alternative: Store additional metadata
    public void addScoreWithMeta(String playerId, int score) {
        try (Jedis jedis = jedisPool.getResource()) {
            Pipeline p = jedis.pipelined();
            p.zadd("leaderboard", score, playerId);
            p.hset("leaderboard:meta:" + playerId, "timestamp",
                   String.valueOf(System.currentTimeMillis()));
            p.hset("leaderboard:meta:" + playerId, "name",
                   getPlayerName(playerId));
            p.sync();
        }
    }
}`
        }
      ]
    },
    {
      id: 'autocomplete',
      name: 'Autocomplete System',
      icon: '🔍',
      color: '#6366f1',
      description: 'Design a type-ahead suggestion system for search.',
      diagram: AutocompleteDiagram,
      details: [
        {
          name: 'Trie Data Structure',
          explanation: 'Trie (prefix tree) enables efficient prefix matching. TrieNode has children map, isWord flag, and topSuggestions list. Build trie from search history with frequencies. At each node, store top-k completions for that prefix for O(1) retrieval.',
          codeExample: `public class AutocompleteSystem {
    private TrieNode root;
    private static final int TOP_K = 5;

    static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isWord = false;
        int frequency = 0;
        List<String> topSuggestions = new ArrayList<>();
    }

    public AutocompleteSystem(String[] sentences, int[] frequencies) {
        root = new TrieNode();
        for (int i = 0; i < sentences.length; i++) {
            insert(sentences[i], frequencies[i]);
        }
    }

    private void insert(String word, int freq) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
            // Update top suggestions at each prefix node
            updateTopSuggestions(node, word, freq);
        }
        node.isWord = true;
        node.frequency += freq;
    }

    private void updateTopSuggestions(TrieNode node, String word, int freq) {
        // Add or update word in suggestions
        node.topSuggestions.removeIf(s -> s.equals(word));
        node.topSuggestions.add(word);

        // Sort by frequency (would need separate freq map)
        // Keep only top K
        if (node.topSuggestions.size() > TOP_K) {
            node.topSuggestions.remove(node.topSuggestions.size() - 1);
        }
    }
}`
        },
        {
          name: 'Query Processing',
          explanation: 'On query: traverse trie following input characters. Return pre-computed top-k at final node. Track current search prefix for incremental queries. Record user selections to update frequencies.',
          codeExample: `public class AutocompleteSystem {
    private TrieNode currentNode;
    private StringBuilder currentPrefix;

    public List<String> input(char c) {
        if (c == '#') {
            // User submitted query - record and reset
            String query = currentPrefix.toString();
            insert(query, 1);  // Increment frequency
            currentPrefix = new StringBuilder();
            currentNode = root;
            return Collections.emptyList();
        }

        currentPrefix.append(c);

        // Navigate to next node
        if (currentNode != null) {
            currentNode = currentNode.children.get(c);
        }

        // Return pre-computed suggestions
        if (currentNode == null) {
            return Collections.emptyList();
        }
        return new ArrayList<>(currentNode.topSuggestions);
    }

    // Alternative: DFS to find all completions
    public List<String> getSuggestions(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (!node.children.containsKey(c)) {
                return Collections.emptyList();
            }
            node = node.children.get(c);
        }

        // If top suggestions pre-computed, return directly
        if (!node.topSuggestions.isEmpty()) {
            return node.topSuggestions;
        }

        // Otherwise DFS to collect all words
        List<String> results = new ArrayList<>();
        dfs(node, prefix, results);
        return results.subList(0, Math.min(TOP_K, results.size()));
    }
}`
        },
        {
          name: 'Scaling & Optimization',
          explanation: 'Cache popular prefixes at CDN edge. Debounce client requests (wait 100-200ms). Shard trie by first 1-2 characters. Replicate for read scaling. Async updates to frequency counts. Use Count-Min Sketch for approximate counting at scale.',
          codeExample: `// Client-side debouncing
class AutocompleteClient {
    private debounceTimer: number | null = null;

    onInput(char: string) {
        // Clear previous timer
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }

        // Wait 150ms before sending request
        this.debounceTimer = setTimeout(() => {
            this.fetchSuggestions(this.currentPrefix);
        }, 150);
    }
}

// Server-side sharding
public class ShardedAutocomplete {
    private Map<String, AutocompleteSystem> shards;

    public ShardedAutocomplete() {
        // Shard by first 2 characters
        shards = new HashMap<>();
    }

    private String getShardKey(String prefix) {
        if (prefix.length() >= 2) {
            return prefix.substring(0, 2).toLowerCase();
        }
        return prefix.toLowerCase();
    }

    public List<String> getSuggestions(String prefix) {
        String shardKey = getShardKey(prefix);
        AutocompleteSystem shard = shards.get(shardKey);
        if (shard == null) {
            return Collections.emptyList();
        }
        return shard.getSuggestions(prefix);
    }

    // Async frequency updates
    public void recordQuery(String query) {
        CompletableFuture.runAsync(() -> {
            String shardKey = getShardKey(query);
            shards.computeIfAbsent(shardKey, k -> new AutocompleteSystem())
                  .insert(query, 1);
        });
    }
}`
        }
      ]
    },
    {
      id: 'task-scheduler',
      name: 'Task Scheduler',
      icon: '⏰',
      color: '#14b8a6',
      description: 'Design a system to schedule and execute tasks at specified times.',
      diagram: TaskSchedulerDiagram,
      details: [
        {
          name: 'Core Data Structures',
          explanation: 'Min-Heap (priority queue) ordered by execution time enables O(log n) operations. Task contains id, executionTime, callback, interval, and status. HashMap provides O(1) lookup for cancellation by taskId. Main loop sleeps until next task time.',
          codeExample: `public class TaskScheduler {
    private PriorityQueue<ScheduledTask> taskQueue;
    private Map<String, ScheduledTask> taskMap;
    private volatile boolean running;

    static class ScheduledTask implements Comparable<ScheduledTask> {
        String id;
        long executionTime;
        Runnable callback;
        long interval;  // 0 for one-time tasks
        boolean cancelled;

        @Override
        public int compareTo(ScheduledTask other) {
            return Long.compare(this.executionTime, other.executionTime);
        }
    }

    public TaskScheduler() {
        this.taskQueue = new PriorityQueue<>();
        this.taskMap = new ConcurrentHashMap<>();
        this.running = false;
    }

    public String schedule(Runnable task, long delay) {
        return schedule(task, delay, 0);
    }

    public String schedule(Runnable task, long delay, long interval) {
        ScheduledTask st = new ScheduledTask();
        st.id = UUID.randomUUID().toString();
        st.executionTime = System.currentTimeMillis() + delay;
        st.callback = task;
        st.interval = interval;
        st.cancelled = false;

        synchronized (taskQueue) {
            taskQueue.offer(st);
            taskMap.put(st.id, st);
            taskQueue.notify();  // Wake up scheduler
        }
        return st.id;
    }
}`
        },
        {
          name: 'Execution Loop',
          explanation: 'Main loop sleeps until next task execution time. Wake up, pop task from heap, execute if not cancelled. If recurring, calculate next time and re-add to heap. Use condition variable for efficient sleeping. Handle clock skew gracefully.',
          codeExample: `public class TaskScheduler {

    public void start() {
        running = true;
        Thread schedulerThread = new Thread(this::run);
        schedulerThread.setDaemon(true);
        schedulerThread.start();
    }

    private void run() {
        while (running) {
            synchronized (taskQueue) {
                try {
                    while (taskQueue.isEmpty() && running) {
                        taskQueue.wait();
                    }

                    if (!running) break;

                    ScheduledTask next = taskQueue.peek();
                    long now = System.currentTimeMillis();
                    long waitTime = next.executionTime - now;

                    if (waitTime > 0) {
                        taskQueue.wait(waitTime);
                        continue;
                    }

                    // Time to execute
                    taskQueue.poll();

                    if (!next.cancelled) {
                        // Execute in separate thread
                        executeTask(next);

                        // Reschedule if recurring
                        if (next.interval > 0) {
                            next.executionTime = now + next.interval;
                            taskQueue.offer(next);
                        } else {
                            taskMap.remove(next.id);
                        }
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }

    public boolean cancel(String taskId) {
        ScheduledTask task = taskMap.get(taskId);
        if (task != null) {
            task.cancelled = true;
            taskMap.remove(taskId);
            return true;
        }
        return false;
    }
}`
        },
        {
          name: 'Distributed Version',
          explanation: 'Coordinator assigns tasks to workers. Workers poll for tasks or use push model. Persist tasks to database for crash recovery. Use distributed lock (Redis/Zookeeper) for task claiming. Dead letter queue for failed tasks with retry logic.',
          codeExample: `// Distributed scheduler with Redis
public class DistributedTaskScheduler {
    private final JedisPool jedisPool;
    private final String workerId;

    public void schedule(Task task, long executeAt) {
        try (Jedis jedis = jedisPool.getResource()) {
            // Store task in sorted set by execution time
            jedis.zadd("scheduled_tasks", executeAt, task.getId());
            // Store task details
            jedis.hset("task:" + task.getId(), task.toMap());
        }
    }

    public void pollAndExecute() {
        try (Jedis jedis = jedisPool.getResource()) {
            long now = System.currentTimeMillis();

            // Get tasks ready to execute
            Set<String> readyTasks = jedis.zrangeByScore(
                "scheduled_tasks", 0, now, 0, 10);

            for (String taskId : readyTasks) {
                // Try to claim task with distributed lock
                String lockKey = "lock:" + taskId;
                String acquired = jedis.set(lockKey, workerId,
                    SetParams.setParams().nx().ex(30));

                if ("OK".equals(acquired)) {
                    try {
                        // Execute task
                        Map<String, String> taskData =
                            jedis.hgetAll("task:" + taskId);
                        executeTask(Task.fromMap(taskData));

                        // Remove from queue
                        jedis.zrem("scheduled_tasks", taskId);
                        jedis.del("task:" + taskId);
                    } catch (Exception e) {
                        // Move to dead letter queue
                        jedis.lpush("failed_tasks", taskId);
                    } finally {
                        jedis.del(lockKey);
                    }
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
      { name: 'Design', icon: '🎨', page: 'Design' },
      { name: 'L3 System Design', icon: '🌱', page: 'L3 System Design' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #22c55e, #4ade80)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>L3 System Design (Junior)</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Design
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={TOPIC_COLORS}
        />
      </div>

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
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu}
              colors={TOPIC_COLORS}
            />

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

            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = selectedConcept.diagram
              return (
                <div>
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

                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

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

export default L3SystemDesign

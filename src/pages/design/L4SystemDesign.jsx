/**
 * L4 System Design - Mid Level System Design Topics
 *
 * Tab template format for L4 (Mid) level system design interview questions.
 * Each concept covers a common system design problem with multiple detail tabs.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#3b82f6',
  primaryHover: '#60a5fa',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
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

const URLShortenerDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-url" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">URL Shortener Architecture</text>

    <rect x="30" y="70" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Client</text>

    <rect x="180" y="70" width="100" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="230" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Load Balancer</text>

    <rect x="330" y="70" width="100" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="380" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">API Server</text>

    <rect x="480" y="40" width="100" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="530" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Cache</text>

    <rect x="480" y="100" width="100" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="530" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Database</text>

    <rect x="630" y="70" width="120" height="50" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="690" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Key Generator</text>

    <line x1="130" y1="95" x2="175" y2="95" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-url)"/>
    <line x1="280" y1="95" x2="325" y2="95" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-url)"/>
    <line x1="430" y1="80" x2="475" y2="60" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-url)"/>
    <line x1="430" y1="110" x2="475" y2="120" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-url)"/>
    <line x1="580" y1="95" x2="625" y2="95" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-url)"/>

    <text x="400" y="180" textAnchor="middle" fill="#64748b" fontSize="10">Base62 encoding: 62^7 = 3.5 trillion unique URLs</text>
    <text x="400" y="200" textAnchor="middle" fill="#64748b" fontSize="10">Read:Write ratio typically 100:1 - heavy caching needed</text>
  </svg>
)

const ChatAppDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-chat" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#25d366" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Chat Application Architecture</text>

    <rect x="30" y="100" width="80" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="70" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">User A</text>

    <rect x="150" y="70" width="120" height="80" rx="8" fill="#25d366" stroke="#4ade80" strokeWidth="2"/>
    <text x="210" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">WebSocket</text>
    <text x="210" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Gateway</text>
    <text x="210" y="140" textAnchor="middle" fill="#d1fae5" fontSize="9">Connection Pool</text>

    <rect x="310" y="70" width="120" height="80" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="370" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Message</text>
    <text x="370" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Queue</text>
    <text x="370" y="140" textAnchor="middle" fill="#fef3c7" fontSize="9">Kafka/Redis</text>

    <rect x="470" y="50" width="100" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="520" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Chat Service</text>

    <rect x="470" y="110" width="100" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="520" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Database</text>

    <rect x="610" y="100" width="80" height="50" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="650" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">User B</text>

    <line x1="110" y1="125" x2="145" y2="110" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowhead-chat)"/>
    <line x1="270" y1="110" x2="305" y2="110" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowhead-chat)"/>
    <line x1="430" y1="95" x2="465" y2="70" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowhead-chat)"/>
    <line x1="430" y1="125" x2="465" y2="130" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowhead-chat)"/>
    <line x1="570" y1="110" x2="605" y2="125" stroke="#25d366" strokeWidth="2" markerEnd="url(#arrowhead-chat)"/>

    <text x="400" y="200" textAnchor="middle" fill="#64748b" fontSize="10">WebSocket for real-time bidirectional communication</text>
    <text x="400" y="220" textAnchor="middle" fill="#64748b" fontSize="10">Message queue for async processing and delivery guarantees</text>
  </svg>
)

const SocialFeedDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-feed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">News Feed Architecture (Fan-out)</text>

    <rect x="30" y="100" width="80" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="70" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">User Post</text>

    <rect x="150" y="80" width="100" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="200" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Post Service</text>
    <text x="200" y="130" textAnchor="middle" fill="#d1fae5" fontSize="9">Write to DB</text>

    <rect x="290" y="80" width="100" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="340" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Fan-out</text>
    <text x="340" y="130" textAnchor="middle" fill="#fef3c7" fontSize="9">Workers</text>

    <rect x="430" y="50" width="80" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="470" y="72" textAnchor="middle" fill="white" fontSize="9">Feed Cache A</text>

    <rect x="430" y="100" width="80" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="470" y="122" textAnchor="middle" fill="white" fontSize="9">Feed Cache B</text>

    <rect x="430" y="150" width="80" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="470" y="172" textAnchor="middle" fill="white" fontSize="9">Feed Cache C</text>

    <rect x="560" y="100" width="100" height="50" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="610" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Followers</text>

    <line x1="110" y1="125" x2="145" y2="115" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-feed)"/>
    <line x1="250" y1="115" x2="285" y2="115" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-feed)"/>
    <line x1="390" y1="95" x2="425" y2="67" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-feed)"/>
    <line x1="390" y1="115" x2="425" y2="117" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-feed)"/>
    <line x1="390" y1="135" x2="425" y2="167" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-feed)"/>
    <line x1="510" y1="117" x2="555" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-feed)"/>

    <text x="400" y="230" textAnchor="middle" fill="#64748b" fontSize="10">Fan-out on write: Pre-compute feeds for fast reads</text>
    <text x="400" y="250" textAnchor="middle" fill="#64748b" fontSize="10">Hybrid approach for celebrities: Fan-out on read for high-follower users</text>
  </svg>
)

const FileStorageDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-file" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">File Storage Architecture (Dropbox-style)</text>

    <rect x="30" y="90" width="80" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="70" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Client</text>
    <text x="70" y="135" textAnchor="middle" fill="#dbeafe" fontSize="9">Sync Agent</text>

    <rect x="160" y="70" width="100" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="210" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Block Server</text>

    <rect x="160" y="130" width="100" height="40" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="210" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Metadata</text>

    <rect x="310" y="70" width="100" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="360" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S3/Blob</text>

    <rect x="310" y="130" width="100" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="360" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Database</text>

    <rect x="460" y="90" width="100" height="60" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="510" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Sync Service</text>
    <text x="510" y="135" textAnchor="middle" fill="#cffafe" fontSize="9">Push Updates</text>

    <rect x="610" y="90" width="80" height="60" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="650" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Queue</text>

    <line x1="110" y1="105" x2="155" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-file)"/>
    <line x1="110" y1="135" x2="155" y2="150" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-file)"/>
    <line x1="260" y1="90" x2="305" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-file)"/>
    <line x1="260" y1="150" x2="305" y2="150" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-file)"/>
    <line x1="410" y1="120" x2="455" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-file)"/>
    <line x1="560" y1="120" x2="605" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-file)"/>

    <text x="400" y="210" textAnchor="middle" fill="#64748b" fontSize="10">Files chunked into 4MB blocks, deduplicated by content hash</text>
    <text x="400" y="230" textAnchor="middle" fill="#64748b" fontSize="10">Delta sync: Only upload changed blocks</text>
  </svg>
)

const WebCrawlerDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-crawler" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Web Crawler Architecture</text>

    <rect x="30" y="80" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Seed URLs</text>
    <text x="80" y="118" textAnchor="middle" fill="#dbeafe" fontSize="9">Priority Queue</text>

    <rect x="170" y="80" width="100" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="220" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">URL Frontier</text>
    <text x="220" y="118" textAnchor="middle" fill="#fecaca" fontSize="9">Politeness</text>

    <rect x="310" y="80" width="100" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="360" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Fetcher</text>
    <text x="360" y="118" textAnchor="middle" fill="#d1fae5" fontSize="9">HTTP Client</text>

    <rect x="450" y="80" width="100" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="500" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Parser</text>
    <text x="500" y="118" textAnchor="middle" fill="#fef3c7" fontSize="9">Extract Links</text>

    <rect x="590" y="60" width="80" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="630" y="82" textAnchor="middle" fill="white" fontSize="9">Content DB</text>

    <rect x="590" y="110" width="80" height="35" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="630" y="132" textAnchor="middle" fill="white" fontSize="9">URL Filter</text>

    <line x1="130" y1="105" x2="165" y2="105" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead-crawler)"/>
    <line x1="270" y1="105" x2="305" y2="105" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead-crawler)"/>
    <line x1="410" y1="105" x2="445" y2="105" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead-crawler)"/>
    <line x1="550" y1="90" x2="585" y2="77" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead-crawler)"/>
    <line x1="550" y1="120" x2="585" y2="127" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead-crawler)"/>

    <path d="M 630 145 L 630 180 L 220 180 L 220 135" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-crawler)" strokeDasharray="5,3"/>
    <text x="425" y="195" textAnchor="middle" fill="#64748b" fontSize="9">New URLs fed back to frontier</text>

    <text x="400" y="230" textAnchor="middle" fill="#64748b" fontSize="10">Bloom filter for URL deduplication, robots.txt compliance</text>
    <text x="400" y="250" textAnchor="middle" fill="#64748b" fontSize="10">Politeness: 1 req/sec per domain, respect Crawl-Delay</text>
  </svg>
)

const ParkingLotDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-parking" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Parking Lot System Design</text>

    <rect x="30" y="80" width="90" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="75" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Entry</text>
    <text x="75" y="125" textAnchor="middle" fill="#dbeafe" fontSize="9">Ticket Issue</text>
    <text x="75" y="140" textAnchor="middle" fill="#dbeafe" fontSize="9">Scanner</text>

    <rect x="160" y="60" width="120" height="100" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="220" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Parking Lot</text>
    <text x="220" y="105" textAnchor="middle" fill="#e9d5ff" fontSize="9">Floor 1: Compact</text>
    <text x="220" y="120" textAnchor="middle" fill="#e9d5ff" fontSize="9">Floor 2: Regular</text>
    <text x="220" y="135" textAnchor="middle" fill="#e9d5ff" fontSize="9">Floor 3: Large</text>
    <text x="220" y="150" textAnchor="middle" fill="#c4b5fd" fontSize="8">Display Board</text>

    <rect x="320" y="80" width="90" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="365" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Exit</text>
    <text x="365" y="125" textAnchor="middle" fill="#d1fae5" fontSize="9">Payment</text>
    <text x="365" y="140" textAnchor="middle" fill="#d1fae5" fontSize="9">Validation</text>

    <rect x="450" y="50" width="100" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="500" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Spot Manager</text>
    <text x="500" y="88" textAnchor="middle" fill="#fef3c7" fontSize="9">Allocation</text>

    <rect x="450" y="120" width="100" height="50" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="500" y="140" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Database</text>
    <text x="500" y="158" textAnchor="middle" fill="#fecaca" fontSize="9">Tickets, Spots</text>

    <rect x="590" y="80" width="100" height="70" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="640" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Payment</text>
    <text x="640" y="125" textAnchor="middle" fill="#cffafe" fontSize="9">Card/Cash</text>
    <text x="640" y="140" textAnchor="middle" fill="#cffafe" fontSize="9">Hourly/Daily</text>

    <line x1="120" y1="115" x2="155" y2="110" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead-parking)"/>
    <line x1="280" y1="110" x2="315" y2="115" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead-parking)"/>
    <line x1="280" y1="90" x2="445" y2="75" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead-parking)"/>
    <line x1="500" y1="100" x2="500" y2="115" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead-parking)"/>
    <line x1="410" y1="115" x2="585" y2="115" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead-parking)"/>

    <text x="400" y="210" textAnchor="middle" fill="#64748b" fontSize="10">Optimistic locking for spot assignment to prevent double booking</text>
    <text x="400" y="230" textAnchor="middle" fill="#64748b" fontSize="10">Strategy patterns for spot allocation (nearest, balanced, fill-floor)</text>
  </svg>
)

const FoodDeliveryDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-food" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ff6347" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Food Delivery Platform Architecture</text>

    <rect x="30" y="80" width="80" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="70" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Customer</text>

    <rect x="30" y="150" width="80" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="70" y="180" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Restaurant</text>

    <rect x="30" y="220" width="80" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="70" y="250" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Driver</text>

    <rect x="150" y="130" width="100" height="60" rx="8" fill="#ff6347" stroke="#ff7f50" strokeWidth="2"/>
    <text x="200" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">API Gateway</text>
    <text x="200" y="175" textAnchor="middle" fill="#fecaca" fontSize="9">Load Balancer</text>

    <rect x="290" y="60" width="90" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="335" y="85" textAnchor="middle" fill="white" fontSize="9">Order Service</text>

    <rect x="290" y="120" width="90" height="40" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="335" y="145" textAnchor="middle" fill="white" fontSize="9">Search Service</text>

    <rect x="290" y="180" width="90" height="40" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="335" y="205" textAnchor="middle" fill="white" fontSize="9">Dispatch</text>

    <rect x="290" y="240" width="90" height="40" rx="6" fill="#84cc16" stroke="#a3e635" strokeWidth="2"/>
    <text x="335" y="265" textAnchor="middle" fill="white" fontSize="9">Tracking</text>

    <rect x="420" y="100" width="90" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="465" y="125" textAnchor="middle" fill="white" fontSize="9">Database</text>

    <rect x="420" y="160" width="90" height="40" rx="6" fill="#14b8a6" stroke="#2dd4bf" strokeWidth="2"/>
    <text x="465" y="185" textAnchor="middle" fill="white" fontSize="9">Redis Cache</text>

    <rect x="420" y="220" width="90" height="40" rx="6" fill="#a855f7" stroke="#c084fc" strokeWidth="2"/>
    <text x="465" y="245" textAnchor="middle" fill="white" fontSize="9">Kafka Queue</text>

    <rect x="550" y="130" width="100" height="60" rx="8" fill="#fbbf24" stroke="#fcd34d" strokeWidth="2"/>
    <text x="600" y="155" textAnchor="middle" fill="#1f2937" fontSize="10" fontWeight="bold">Notification</text>
    <text x="600" y="175" textAnchor="middle" fill="#1f2937" fontSize="9">Push/SMS</text>

    <line x1="110" y1="105" x2="145" y2="145" stroke="#ff6347" strokeWidth="2" markerEnd="url(#arrowhead-food)"/>
    <line x1="110" y1="175" x2="145" y2="160" stroke="#ff6347" strokeWidth="2" markerEnd="url(#arrowhead-food)"/>
    <line x1="110" y1="245" x2="145" y2="175" stroke="#ff6347" strokeWidth="2" markerEnd="url(#arrowhead-food)"/>
    <line x1="250" y1="145" x2="285" y2="80" stroke="#ff6347" strokeWidth="2" markerEnd="url(#arrowhead-food)"/>
    <line x1="250" y1="160" x2="285" y2="200" stroke="#ff6347" strokeWidth="2" markerEnd="url(#arrowhead-food)"/>
    <line x1="380" y1="140" x2="415" y2="120" stroke="#ff6347" strokeWidth="2" markerEnd="url(#arrowhead-food)"/>
    <line x1="510" y1="180" x2="545" y2="160" stroke="#ff6347" strokeWidth="2" markerEnd="url(#arrowhead-food)"/>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function L4SystemDesign({ onBack }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'url-shortener',
      name: 'URL Shortener (bit.ly)',
      icon: '🔗',
      color: '#06b6d4',
      description: 'Design a URL shortening service with short URL generation, redirection, and analytics tracking.',
      diagram: URLShortenerDiagram,
      details: [
        {
          name: 'Core Requirements',
          diagram: URLShortenerDiagram,
          explanation: 'URL shorteners need to handle massive read traffic (100:1 read/write ratio). Key requirements include: generating unique short URLs, fast redirection (< 100ms), analytics tracking, optional custom aliases, and URL expiration. Scale considerations: 500M new URLs/month = ~200 URLs/sec writes, 20K reads/sec.',
          codeExample: `// URL Shortener Core Service
public class URLShortenerService {
    private final KeyGenerator keyGenerator;
    private final URLRepository repository;
    private final Cache<String, String> cache;

    public String shortenURL(String longURL, String customAlias) {
        // Check for existing URL (deduplication)
        String existing = repository.findByLongURL(longURL);
        if (existing != null) return existing;

        // Generate or use custom short key
        String shortKey = customAlias != null ? customAlias
            : keyGenerator.generateKey();

        // Store mapping
        URLMapping mapping = new URLMapping(shortKey, longURL,
            Instant.now(), Instant.now().plus(DEFAULT_TTL));
        repository.save(mapping);
        cache.put(shortKey, longURL);

        return BASE_URL + shortKey;
    }

    public String redirect(String shortKey) {
        // Check cache first
        String longURL = cache.get(shortKey);
        if (longURL == null) {
            longURL = repository.findByShortKey(shortKey);
            if (longURL != null) cache.put(shortKey, longURL);
        }

        // Track analytics asynchronously
        analyticsQueue.publish(new ClickEvent(shortKey, Instant.now()));
        return longURL;
    }
}`
        },
        {
          name: 'Key Generation',
          explanation: 'Base62 encoding (a-z, A-Z, 0-9) provides 62^n combinations. With 7 characters: 62^7 = 3.5 trillion URLs. Approaches: (1) Counter-based: Use distributed counter, encode to base62. Simple but predictable. (2) Hash-based: MD5/SHA of long URL, take first N chars. May have collisions. (3) Pre-generated keys: Generate keys offline, store in DB. Workers fetch batches. Best for high scale.',
          codeExample: `// Base62 Key Generation Strategies
public class KeyGenerator {
    private static final String BASE62 =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // Strategy 1: Counter-based (with ZooKeeper for distributed counter)
    public String counterBased(long counter) {
        StringBuilder sb = new StringBuilder();
        while (counter > 0) {
            sb.append(BASE62.charAt((int)(counter % 62)));
            counter /= 62;
        }
        return sb.reverse().toString().padStart(7, '0');
    }

    // Strategy 2: Hash-based
    public String hashBased(String longURL) {
        String hash = DigestUtils.md5Hex(longURL);
        return base62Encode(hash.substring(0, 12)); // First 12 hex chars
    }

    // Strategy 3: Pre-generated keys (recommended for scale)
    private final BlockingQueue<String> keyPool;

    public String getPreGeneratedKey() {
        return keyPool.take(); // Background job refills pool
    }
}

// Key Generation Service (runs offline)
@Scheduled(fixedRate = 60000)
public void refillKeyPool() {
    while (keyPool.size() < MIN_POOL_SIZE) {
        String key = generateUniqueKey();
        if (usedKeys.add(key)) { // Check not already used
            keyPool.offer(key);
        }
    }
}`
        },
        {
          name: 'Database Schema',
          explanation: 'Primary data store needs to handle billions of URL mappings. Schema optimized for fast lookups by short key. Indexes on short_key (primary) and long_url (for dedup). Partitioning by short_key hash for horizontal scaling. Cache layer (Redis/Memcached) essential for hot URLs.',
          codeExample: `-- URL Mappings Table
CREATE TABLE url_mappings (
    short_key VARCHAR(10) PRIMARY KEY,  -- Base62 encoded key
    long_url TEXT NOT NULL,
    user_id BIGINT,                      -- Optional: creator
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    click_count BIGINT DEFAULT 0
);

-- Index for deduplication check
CREATE INDEX idx_long_url ON url_mappings(long_url);

-- Analytics Table (separate for write scalability)
CREATE TABLE url_analytics (
    id BIGSERIAL PRIMARY KEY,
    short_key VARCHAR(10),
    clicked_at TIMESTAMP DEFAULT NOW(),
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    country VARCHAR(2),
    device_type VARCHAR(20)
);

-- Partitioned by date for efficient queries and retention
CREATE TABLE url_analytics_2024 PARTITION OF url_analytics
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');`
        },
        {
          name: 'Caching Strategy',
          explanation: 'With 100:1 read/write ratio, caching is critical. Use Redis cluster for distributed caching. Hot URLs (20% of URLs get 80% of traffic) should always be cached. Cache-aside pattern: check cache first, fallback to DB, populate cache on miss. TTL based on URL popularity.',
          codeExample: `// Redis Caching Layer
@Service
public class URLCacheService {
    private final RedisTemplate<String, String> redis;
    private final URLRepository repository;

    // Cache-aside pattern with dynamic TTL
    public String getLongURL(String shortKey) {
        // Check cache first
        String cached = redis.opsForValue().get(shortKey);
        if (cached != null) {
            // Extend TTL for frequently accessed URLs
            redis.expire(shortKey, calculateDynamicTTL(shortKey));
            return cached;
        }

        // Cache miss - fetch from DB
        URLMapping mapping = repository.findByShortKey(shortKey);
        if (mapping != null) {
            redis.opsForValue().set(
                shortKey,
                mapping.getLongUrl(),
                calculateDynamicTTL(shortKey)
            );
            return mapping.getLongUrl();
        }
        return null;
    }

    // Popular URLs get longer TTL
    private Duration calculateDynamicTTL(String shortKey) {
        Long hitCount = redis.opsForValue()
            .increment("hits:" + shortKey);
        if (hitCount > 1000) return Duration.ofHours(24);
        if (hitCount > 100) return Duration.ofHours(6);
        return Duration.ofHours(1);
    }

    // Bloom filter for non-existent URLs
    private final BloomFilter<String> bloomFilter;

    public boolean mightExist(String shortKey) {
        return bloomFilter.mightContain(shortKey);
    }
}`
        }
      ]
    },
    {
      id: 'chat-app',
      name: 'Chat Application',
      icon: '💬',
      color: '#25d366',
      description: 'Design a real-time messaging system with 1:1 chat, group messaging, presence, and delivery guarantees.',
      diagram: ChatAppDiagram,
      details: [
        {
          name: 'Architecture Overview',
          diagram: ChatAppDiagram,
          explanation: 'Chat apps require real-time bidirectional communication. Key components: WebSocket servers for persistent connections, message queue for async processing, presence service for online status, and push notification for offline users. Design for 50M DAU, 40 messages/user/day = 2B messages/day.',
          codeExample: `// WebSocket Connection Manager
@ServerEndpoint("/chat/{userId}")
public class ChatWebSocket {
    private static final ConcurrentMap<String, Session> sessions =
        new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userId) {
        sessions.put(userId, session);
        presenceService.setOnline(userId);

        // Deliver pending messages
        List<Message> pending = messageStore.getPendingMessages(userId);
        for (Message msg : pending) {
            sendMessage(session, msg);
        }
    }

    @OnMessage
    public void onMessage(String payload, Session session) {
        Message msg = parseMessage(payload);
        msg.setTimestamp(Instant.now());
        msg.setMessageId(generateMessageId());

        // Persist first (at-least-once delivery)
        messageStore.save(msg);

        // Route to recipient
        Session recipientSession = sessions.get(msg.getRecipientId());
        if (recipientSession != null) {
            sendMessage(recipientSession, msg);
        } else {
            // User offline - send push notification
            pushService.notify(msg.getRecipientId(), msg);
        }
    }

    @OnClose
    public void onClose(@PathParam("userId") String userId) {
        sessions.remove(userId);
        presenceService.setOffline(userId);
    }
}`
        },
        {
          name: 'Message Delivery',
          explanation: 'Delivery guarantees: At-most-once (fire and forget), At-least-once (retry until ack), Exactly-once (dedup with message ID). Most chat apps use at-least-once with client-side deduplication. Message states: Sent, Delivered, Read. Use message queues (Kafka) for reliable async delivery.',
          codeExample: `// Message Delivery Service with Guarantees
@Service
public class MessageDeliveryService {
    private final KafkaTemplate<String, Message> kafka;
    private final MessageStore messageStore;

    // At-least-once delivery with acknowledgment
    public void sendMessage(Message message) {
        // 1. Persist message with PENDING status
        message.setStatus(MessageStatus.PENDING);
        messageStore.save(message);

        // 2. Publish to Kafka for async delivery
        kafka.send("messages", message.getRecipientId(), message)
            .addCallback(
                result -> log.info("Message queued: {}", message.getId()),
                ex -> retryQueue.add(message)
            );
    }

    // Consumer processes messages
    @KafkaListener(topics = "messages")
    public void processMessage(Message message) {
        try {
            deliverToRecipient(message);
            message.setStatus(MessageStatus.DELIVERED);
            messageStore.updateStatus(message);
        } catch (UserOfflineException e) {
            // Store for later delivery, send push
            pushNotificationService.send(message);
        }
    }

    // Client acknowledges receipt
    public void acknowledgeDelivery(String messageId, String recipientId) {
        messageStore.markDelivered(messageId);

        // Notify sender of delivery
        notifySender(messageId, "delivered");
    }

    // Handle read receipts
    public void markAsRead(String messageId, String recipientId) {
        messageStore.markRead(messageId);
        notifySender(messageId, "read");
    }
}`
        },
        {
          name: 'Group Messaging',
          explanation: 'Group messages multiply delivery complexity. Fan-out approaches: (1) On-write: Copy message to each member inbox (fast reads, expensive writes). (2) On-read: Store once, query at read time (cheap writes, expensive reads). Hybrid: fan-out for small groups (<100), on-read for large groups.',
          codeExample: `// Group Chat Service
@Service
public class GroupChatService {
    private static final int FANOUT_THRESHOLD = 100;

    public void sendGroupMessage(Message message, String groupId) {
        Group group = groupStore.getGroup(groupId);
        List<String> members = group.getMemberIds();

        // Persist original message
        message.setGroupId(groupId);
        messageStore.save(message);

        if (members.size() <= FANOUT_THRESHOLD) {
            // Small group: fan-out on write
            fanOutToMembers(message, members);
        } else {
            // Large group: members pull on read
            // Just notify online members via WebSocket
            notifyOnlineMembers(message, members);
        }
    }

    private void fanOutToMembers(Message msg, List<String> members) {
        members.parallelStream()
            .filter(id -> !id.equals(msg.getSenderId()))
            .forEach(memberId -> {
                // Copy to member's inbox
                inboxStore.addMessage(memberId, msg);

                // Real-time delivery if online
                if (presenceService.isOnline(memberId)) {
                    webSocketManager.send(memberId, msg);
                }
            });
    }

    // Large group: members query group messages
    public List<Message> getGroupMessages(String groupId,
            String userId, Instant since) {
        return messageStore.getGroupMessages(groupId, since)
            .stream()
            .filter(m -> !m.getSenderId().equals(userId))
            .collect(toList());
    }
}`
        },
        {
          name: 'Presence & Status',
          explanation: 'Presence system tracks online/offline status. Challenges: WebSocket disconnects, multiple devices, battery drain on mobile. Use heartbeat mechanism with reasonable intervals (30s). Store last-seen timestamp. Presence updates fan-out to contacts (expensive for popular users).',
          codeExample: `// Presence Service
@Service
public class PresenceService {
    private final RedisTemplate<String, Long> redis;
    private static final long HEARTBEAT_INTERVAL = 30_000; // 30 seconds
    private static final long OFFLINE_THRESHOLD = 90_000;  // 90 seconds

    public void heartbeat(String userId) {
        long now = System.currentTimeMillis();
        String key = "presence:" + userId;

        Long lastSeen = redis.opsForValue().get(key);
        boolean wasOffline = lastSeen == null ||
            (now - lastSeen) > OFFLINE_THRESHOLD;

        redis.opsForValue().set(key, now, Duration.ofMinutes(2));

        if (wasOffline) {
            // User came online - notify contacts
            notifyContactsAsync(userId, PresenceStatus.ONLINE);
        }
    }

    public PresenceStatus getStatus(String userId) {
        Long lastSeen = redis.opsForValue().get("presence:" + userId);
        if (lastSeen == null) return PresenceStatus.OFFLINE;

        long elapsed = System.currentTimeMillis() - lastSeen;
        if (elapsed < OFFLINE_THRESHOLD) return PresenceStatus.ONLINE;
        return PresenceStatus.OFFLINE;
    }

    // Batch presence check for contact list
    public Map<String, PresenceStatus> getBatchStatus(List<String> userIds) {
        List<String> keys = userIds.stream()
            .map(id -> "presence:" + id)
            .collect(toList());

        List<Long> lastSeens = redis.opsForValue().multiGet(keys);
        // Map results...
    }

    // Limit fan-out for popular users
    private void notifyContactsAsync(String userId, PresenceStatus status) {
        List<String> contacts = contactService.getContacts(userId);
        if (contacts.size() > 1000) {
            // Too many contacts - let them poll
            return;
        }
        // Fan-out presence update
    }
}`
        }
      ]
    },
    {
      id: 'social-feed',
      name: 'Social Media Feed',
      icon: '📱',
      color: '#f59e0b',
      description: 'Design a news feed system with posts from followed users, ranking algorithms, and real-time updates.',
      diagram: SocialFeedDiagram,
      details: [
        {
          name: 'Feed Generation',
          diagram: SocialFeedDiagram,
          explanation: 'Two approaches: (1) Pull model (fan-out on read): Query posts from all followed users at read time. Simple but slow for users following many accounts. (2) Push model (fan-out on write): Pre-compute feeds when posts are created. Fast reads but expensive writes for celebrities. Hybrid approach best: push for regular users, pull for celebrities.',
          codeExample: `// Feed Generation Service
@Service
public class FeedService {
    private static final int CELEBRITY_THRESHOLD = 10_000;

    // Called when user creates a post
    public void publishPost(Post post) {
        // Save post
        postStore.save(post);

        int followerCount = followService.getFollowerCount(post.getUserId());

        if (followerCount < CELEBRITY_THRESHOLD) {
            // Regular user: fan-out on write
            fanOutPost(post);
        } else {
            // Celebrity: fans pull on read
            // Just invalidate cache for online followers
            invalidateFeedCaches(post.getUserId());
        }
    }

    private void fanOutPost(Post post) {
        List<String> followers = followService.getFollowers(post.getUserId());

        // Fan-out to each follower's feed cache
        CompletableFuture.runAsync(() -> {
            followers.parallelStream().forEach(followerId -> {
                feedCache.prependToFeed(followerId, post);
            });
        });
    }

    // Called when user views their feed
    public List<Post> getFeed(String userId, int page) {
        // Get pre-computed feed for regular followees
        List<Post> feed = feedCache.getFeed(userId, page);

        // Merge with celebrity posts (pulled on read)
        List<String> celebrityFollowees =
            followService.getCelebrityFollowees(userId);

        for (String celeb : celebrityFollowees) {
            List<Post> celebPosts = postStore.getRecentPosts(celeb);
            feed = mergeSorted(feed, celebPosts);
        }

        return feed;
    }
}`
        },
        {
          name: 'Feed Ranking',
          explanation: 'Chronological feeds are simple but not engaging. ML-based ranking improves engagement. Ranking signals: recency, engagement (likes, comments, shares), user affinity (interaction history), content type preferences, diversity. Two-stage ranking: candidate generation (1000s) then ranking (top 100).',
          codeExample: `// Feed Ranking Service
@Service
public class FeedRankingService {
    private final MLModel rankingModel;

    public List<Post> rankFeed(String userId, List<Post> candidates) {
        User user = userService.getUser(userId);
        Map<String, Double> affinityScores =
            affinityService.getAffinityScores(userId);

        // Score each candidate
        List<ScoredPost> scored = candidates.stream()
            .map(post -> {
                double score = calculateScore(post, user, affinityScores);
                return new ScoredPost(post, score);
            })
            .sorted(Comparator.comparingDouble(ScoredPost::getScore).reversed())
            .collect(toList());

        // Apply diversity rules
        return applyDiversityRules(scored);
    }

    private double calculateScore(Post post, User user,
            Map<String, Double> affinity) {
        double score = 0.0;

        // Recency decay (half-life of 6 hours)
        long ageHours = post.getAgeInHours();
        score += Math.exp(-0.693 * ageHours / 6) * 0.3;

        // Engagement signals
        score += Math.log1p(post.getLikeCount()) * 0.1;
        score += Math.log1p(post.getCommentCount()) * 0.15;
        score += Math.log1p(post.getShareCount()) * 0.2;

        // User affinity with author
        score += affinity.getOrDefault(post.getAuthorId(), 0.0) * 0.25;

        // ML model prediction
        score += rankingModel.predict(user, post) * 0.3;

        return score;
    }

    // Ensure feed diversity
    private List<Post> applyDiversityRules(List<ScoredPost> ranked) {
        // No more than 2 consecutive posts from same author
        // Mix content types (photos, text, videos)
        // Include some exploration posts
    }
}`
        },
        {
          name: 'Real-time Updates',
          explanation: 'Users expect real-time feed updates without refresh. Approaches: (1) Polling (simple, inefficient), (2) Long-polling (better, but still overhead), (3) WebSocket (real-time, maintains connection), (4) Server-Sent Events (SSE) for one-way updates. For feeds, SSE or periodic polling with delta updates works well.',
          codeExample: `// Real-time Feed Updates
@RestController
public class FeedController {

    // Server-Sent Events for real-time updates
    @GetMapping(value = "/feed/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<FeedUpdate> streamFeed(@RequestParam String userId) {
        return Flux.merge(
            // Initial feed load
            Flux.just(new FeedUpdate("initial", getFeed(userId))),

            // New posts from followed users
            feedEventBus.getUpdates(userId)
                .filter(update -> isRelevant(update, userId))
                .map(post -> new FeedUpdate("new_post", post)),

            // Engagement updates (someone liked a post in feed)
            engagementEventBus.getUpdates(userId)
                .map(event -> new FeedUpdate("engagement", event))
        );
    }

    // Efficient delta updates with cursor
    @GetMapping("/feed/delta")
    public FeedDelta getFeedDelta(
            @RequestParam String userId,
            @RequestParam String cursor,
            @RequestParam long lastTimestamp) {

        List<Post> newPosts = feedService.getNewPosts(userId, lastTimestamp);
        List<String> deletedIds = feedService.getDeletedIds(userId, lastTimestamp);
        Map<String, EngagementUpdate> engagementUpdates =
            feedService.getEngagementUpdates(userId, lastTimestamp);

        return new FeedDelta(newPosts, deletedIds, engagementUpdates,
            generateNewCursor());
    }
}

// Client-side polling optimization
// Poll frequency based on user activity:
// - Active (scrolling): 10 seconds
// - Idle (tab open): 60 seconds
// - Background: 5 minutes or push notification`
        },
        {
          name: 'Storage & Caching',
          explanation: 'Feed data has different access patterns: posts (write once, read many), feeds (personalized, frequently updated), social graph (slowly changing). Use specialized storage: Posts in distributed DB (Cassandra/DynamoDB), feeds in Redis (sorted sets), social graph in graph DB or denormalized. Heavy caching for hot users.',
          codeExample: `// Feed Storage Architecture
@Service
public class FeedStorageService {
    private final RedisTemplate<String, Post> feedCache;
    private final CassandraTemplate postStore;

    // Store user's feed in Redis sorted set (by timestamp)
    public void addToFeed(String userId, Post post) {
        String key = "feed:" + userId;
        feedCache.opsForZSet().add(key, post, post.getTimestamp());

        // Trim to keep only recent N posts
        feedCache.opsForZSet().removeRange(key, 0, -MAX_FEED_SIZE - 1);

        // Set TTL for inactive users
        feedCache.expire(key, Duration.ofDays(7));
    }

    public List<Post> getFeed(String userId, int offset, int limit) {
        String key = "feed:" + userId;

        // Check if feed exists in cache
        if (!feedCache.hasKey(key)) {
            // Rebuild feed for returning user
            rebuildFeed(userId);
        }

        // Get posts in reverse chronological order
        return feedCache.opsForZSet()
            .reverseRange(key, offset, offset + limit - 1);
    }

    // Rebuild feed from scratch
    private void rebuildFeed(String userId) {
        List<String> followees = followService.getFollowees(userId);

        // Get recent posts from all followees
        List<Post> posts = followees.parallelStream()
            .flatMap(followeeId ->
                postStore.getRecentPosts(followeeId, 100).stream())
            .sorted(Comparator.comparingLong(Post::getTimestamp).reversed())
            .limit(MAX_FEED_SIZE)
            .collect(toList());

        // Populate cache
        posts.forEach(post -> addToFeed(userId, post));
    }
}`
        }
      ]
    },
    {
      id: 'file-storage',
      name: 'File Storage (Dropbox)',
      icon: '📁',
      color: '#3b82f6',
      description: 'Design a cloud file storage and sync service with chunking, deduplication, and cross-device sync.',
      diagram: FileStorageDiagram,
      details: [
        {
          name: 'File Chunking',
          diagram: FileStorageDiagram,
          explanation: 'Large files are split into fixed-size chunks (typically 4MB). Benefits: (1) Delta sync - only upload changed chunks, (2) Parallel uploads/downloads, (3) Deduplication across files, (4) Resume interrupted transfers. Each chunk identified by content hash (SHA-256). Metadata tracks file to chunk mappings.',
          codeExample: `// File Chunking Service
public class ChunkingService {
    private static final int CHUNK_SIZE = 4 * 1024 * 1024; // 4MB

    public List<Chunk> chunkFile(File file) throws IOException {
        List<Chunk> chunks = new ArrayList<>();
        byte[] buffer = new byte[CHUNK_SIZE];

        try (FileInputStream fis = new FileInputStream(file)) {
            int bytesRead;
            int chunkIndex = 0;

            while ((bytesRead = fis.read(buffer)) != -1) {
                byte[] chunkData = Arrays.copyOf(buffer, bytesRead);
                String hash = calculateSHA256(chunkData);

                chunks.add(new Chunk(
                    hash,
                    chunkIndex++,
                    bytesRead,
                    chunkData
                ));
            }
        }

        return chunks;
    }

    // Content-defined chunking (CDC) for better dedup
    public List<Chunk> contentDefinedChunking(File file) {
        // Uses rolling hash (Rabin fingerprint) to find
        // chunk boundaries based on content patterns
        // More stable boundaries = better dedup when content shifts
        RollingHash hash = new RollingHash();
        List<Chunk> chunks = new ArrayList<>();

        // Find boundaries where hash matches pattern
        // Average chunk size ~4MB but varies with content
    }

    private String calculateSHA256(byte[] data) {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(data);
        return Base64.getEncoder().encodeToString(hash);
    }
}`
        },
        {
          name: 'Deduplication',
          explanation: 'Deduplication saves storage by storing identical content only once. Block-level dedup: compare chunk hashes, store unique chunks only. Global dedup across all users can achieve 50%+ storage savings. Reference counting tracks how many files reference each chunk.',
          codeExample: `// Deduplication Service
@Service
public class DeduplicationService {
    private final ChunkStore chunkStore;
    private final MetadataStore metadataStore;

    public FileUploadResult uploadFile(String userId, String path,
            List<Chunk> chunks) {
        List<ChunkReference> references = new ArrayList<>();
        long bytesUploaded = 0;
        long bytesDeduped = 0;

        for (Chunk chunk : chunks) {
            // Check if chunk already exists
            if (chunkStore.exists(chunk.getHash())) {
                // Chunk exists - just add reference
                chunkStore.incrementRefCount(chunk.getHash());
                bytesDeduped += chunk.getSize();
            } else {
                // New chunk - upload to blob storage
                chunkStore.store(chunk);
                bytesUploaded += chunk.getSize();
            }

            references.add(new ChunkReference(
                chunk.getHash(),
                chunk.getIndex(),
                chunk.getSize()
            ));
        }

        // Store file metadata with chunk references
        FileMetadata metadata = new FileMetadata(
            userId, path, references,
            calculateFileHash(chunks),
            System.currentTimeMillis()
        );
        metadataStore.save(metadata);

        return new FileUploadResult(
            metadata.getFileId(),
            bytesUploaded,
            bytesDeduped,
            (double) bytesDeduped / (bytesUploaded + bytesDeduped) * 100
        );
    }

    // Called when file is deleted
    public void deleteFile(String fileId) {
        FileMetadata metadata = metadataStore.get(fileId);

        for (ChunkReference ref : metadata.getChunks()) {
            int newRefCount = chunkStore.decrementRefCount(ref.getHash());
            if (newRefCount == 0) {
                // No more references - can delete chunk
                chunkStore.scheduleForDeletion(ref.getHash());
            }
        }

        metadataStore.delete(fileId);
    }
}`
        },
        {
          name: 'Sync Protocol',
          explanation: 'Sync keeps files consistent across devices. Challenge: concurrent edits, offline changes, conflicts. Sync protocol: (1) Client tracks local changes, (2) Sends delta to server, (3) Server applies changes, detects conflicts, (4) Server pushes updates to other devices. Version vectors for causality tracking.',
          codeExample: `// Sync Protocol Implementation
@Service
public class SyncService {

    public SyncResult sync(String userId, String deviceId,
            SyncRequest request) {

        List<FileChange> serverChanges = new ArrayList<>();
        List<ConflictInfo> conflicts = new ArrayList<>();

        // Process client changes
        for (FileChange clientChange : request.getChanges()) {
            FileMetadata serverFile = metadataStore.get(
                userId, clientChange.getPath());

            if (serverFile == null) {
                // New file - accept client version
                applyChange(userId, clientChange);
            } else if (clientChange.getBaseVersion() == serverFile.getVersion()) {
                // Clean update - no conflict
                applyChange(userId, clientChange);
            } else {
                // Conflict detected
                conflicts.add(resolveConflict(serverFile, clientChange));
            }
        }

        // Get changes from other devices
        serverChanges = metadataStore.getChangesSince(
            userId, request.getLastSyncTimestamp(), deviceId);

        return new SyncResult(
            serverChanges,
            conflicts,
            System.currentTimeMillis()
        );
    }

    private ConflictInfo resolveConflict(FileMetadata server,
            FileChange client) {
        // Strategy: Keep both versions, let user decide
        // Rename client version: "file.txt" -> "file (conflict).txt"

        String conflictPath = generateConflictPath(
            client.getPath(),
            client.getDeviceName()
        );

        // Save client version with conflict name
        applyChange(client.getUserId(),
            client.withPath(conflictPath));

        return new ConflictInfo(
            client.getPath(),
            conflictPath,
            server.getVersion(),
            client.getVersion()
        );
    }
}`
        },
        {
          name: 'Push Notifications',
          explanation: 'Real-time sync requires push notifications when files change on other devices. Long-polling or WebSocket connection to sync server. Notification contains only metadata (file changed), client pulls actual content. Batching for efficiency during bulk operations.',
          codeExample: `// Real-time Sync Notification Service
@Service
public class SyncNotificationService {
    private final Map<String, List<SseEmitter>> deviceConnections =
        new ConcurrentHashMap<>();

    // Device connects for real-time updates
    public SseEmitter subscribe(String userId, String deviceId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        deviceConnections
            .computeIfAbsent(userId, k -> new CopyOnWriteArrayList<>())
            .add(new DeviceEmitter(deviceId, emitter));

        emitter.onCompletion(() -> removeEmitter(userId, deviceId));
        emitter.onTimeout(() -> removeEmitter(userId, deviceId));

        return emitter;
    }

    // Called when file changes
    public void notifyFileChange(String userId, String sourceDeviceId,
            FileChangeNotification notification) {
        List<DeviceEmitter> emitters = deviceConnections.get(userId);
        if (emitters == null) return;

        for (DeviceEmitter de : emitters) {
            // Don't notify the device that made the change
            if (!de.getDeviceId().equals(sourceDeviceId)) {
                try {
                    de.getEmitter().send(
                        SseEmitter.event()
                            .name("file_change")
                            .data(notification)
                    );
                } catch (IOException e) {
                    removeEmitter(userId, de.getDeviceId());
                }
            }
        }
    }

    // Batch notifications during bulk operations
    @Async
    public void notifyBulkChanges(String userId, String sourceDeviceId,
            List<FileChangeNotification> changes) {
        // Debounce: wait 500ms, batch all changes
        Thread.sleep(500);

        notifyFileChange(userId, sourceDeviceId,
            new BulkChangeNotification(changes));
    }
}`
        }
      ]
    },
    {
      id: 'web-crawler',
      name: 'Web Crawler',
      icon: '🕷️',
      color: '#ef4444',
      description: 'Design a distributed web crawler that can index billions of pages with politeness and deduplication.',
      diagram: WebCrawlerDiagram,
      details: [
        {
          name: 'Architecture Overview',
          diagram: WebCrawlerDiagram,
          explanation: 'Web crawler downloads web pages for search engine indexing. Components: URL Frontier (priority queue of URLs), Fetcher (HTTP download), Parser (extract links/content), URL Filter (dedup, validate), Content Store. Scale: 1B pages/month = ~400 pages/sec. Challenges: politeness, duplicates, spider traps.',
          codeExample: `// Web Crawler Main Loop
public class WebCrawler {
    private final URLFrontier frontier;
    private final Fetcher fetcher;
    private final Parser parser;
    private final URLFilter filter;
    private final ContentStore store;

    public void crawl() {
        ExecutorService executor = Executors.newFixedThreadPool(100);

        while (true) {
            // Get batch of URLs to crawl
            List<CrawlTask> tasks = frontier.getNextBatch(100);

            List<Future<CrawlResult>> futures = tasks.stream()
                .map(task -> executor.submit(() -> crawlURL(task)))
                .collect(toList());

            // Process results
            for (Future<CrawlResult> future : futures) {
                try {
                    CrawlResult result = future.get(30, TimeUnit.SECONDS);
                    processResult(result);
                } catch (TimeoutException e) {
                    // URL took too long - skip
                }
            }
        }
    }

    private CrawlResult crawlURL(CrawlTask task) {
        String url = task.getUrl();

        // Check robots.txt
        if (!robotsService.isAllowed(url)) {
            return CrawlResult.blocked(url);
        }

        // Fetch page
        HttpResponse response = fetcher.fetch(url);
        if (response.getStatusCode() != 200) {
            return CrawlResult.failed(url, response.getStatusCode());
        }

        // Parse content and extract links
        ParsedPage page = parser.parse(response.getBody(), url);

        // Store content
        store.save(url, page.getContent(), page.getMetadata());

        return CrawlResult.success(url, page.getExtractedLinks());
    }

    private void processResult(CrawlResult result) {
        if (result.isSuccess()) {
            for (String link : result.getExtractedLinks()) {
                if (filter.shouldCrawl(link)) {
                    frontier.addURL(link, calculatePriority(link));
                }
            }
        }
    }
}`
        },
        {
          name: 'URL Frontier',
          explanation: 'URL Frontier manages URLs to crawl with priority and politeness. Structure: (1) Priority queues by importance (PageRank, freshness), (2) Per-host queues for politeness (one queue per domain), (3) Host selector ensures time gap between requests to same host. Backed by persistent storage (Kafka) for durability.',
          codeExample: `// URL Frontier with Politeness
public class URLFrontier {
    // Priority queue selector (round-robin across priority levels)
    private final List<PriorityQueue<URLEntry>> priorityQueues;

    // Per-host queues for politeness
    private final Map<String, Queue<URLEntry>> hostQueues;

    // Last crawl time per host
    private final Map<String, Long> hostLastCrawl;

    private static final long CRAWL_DELAY_MS = 1000; // 1 second between requests

    public void addURL(String url, int priority) {
        // Check if already seen
        if (seenURLs.contains(url)) return;
        seenURLs.add(url);

        String host = extractHost(url);
        URLEntry entry = new URLEntry(url, priority, System.currentTimeMillis());

        // Add to priority queue
        priorityQueues.get(priority).offer(entry);

        // Add to host queue
        hostQueues.computeIfAbsent(host, k -> new LinkedList<>())
            .offer(entry);
    }

    public List<CrawlTask> getNextBatch(int batchSize) {
        List<CrawlTask> batch = new ArrayList<>();
        long now = System.currentTimeMillis();

        // Round-robin across hosts, respecting politeness
        for (String host : hostQueues.keySet()) {
            if (batch.size() >= batchSize) break;

            Long lastCrawl = hostLastCrawl.get(host);
            if (lastCrawl != null && now - lastCrawl < CRAWL_DELAY_MS) {
                continue; // Too soon for this host
            }

            Queue<URLEntry> queue = hostQueues.get(host);
            if (!queue.isEmpty()) {
                URLEntry entry = queue.poll();
                batch.add(new CrawlTask(entry.getUrl(), host));
                hostLastCrawl.put(host, now);
            }
        }

        return batch;
    }

    // Prioritization: higher priority for important pages
    public int calculatePriority(String url) {
        int priority = 5; // Default medium priority

        // Home pages higher priority
        if (isHomePage(url)) priority += 2;

        // Known high-quality domains
        if (isHighQualityDomain(url)) priority += 1;

        // Deeper paths lower priority
        priority -= Math.min(3, countPathSegments(url));

        return Math.max(0, Math.min(10, priority));
    }
}`
        },
        {
          name: 'Deduplication',
          explanation: 'Two types of duplicates: (1) URL duplicates - same URL seen multiple times. Use Bloom filter (probabilistic, space-efficient). (2) Content duplicates - different URLs, same content. Use content fingerprinting (SimHash, MinHash). Near-duplicates detected with similarity threshold.',
          codeExample: `// Deduplication Service
public class DeduplicationService {
    // Bloom filter for URL deduplication (1B URLs, 1% false positive)
    private final BloomFilter<String> seenURLs =
        BloomFilter.create(Funnels.stringFunnel(), 1_000_000_000, 0.01);

    // Content fingerprint store
    private final Map<Long, String> contentFingerprints = new ConcurrentHashMap<>();

    public boolean isURLDuplicate(String url) {
        String normalizedURL = normalizeURL(url);
        if (seenURLs.mightContain(normalizedURL)) {
            return true; // Probably seen (may be false positive)
        }
        seenURLs.put(normalizedURL);
        return false;
    }

    // Normalize URL to canonical form
    private String normalizeURL(String url) {
        // Remove trailing slash
        // Sort query parameters
        // Remove tracking parameters (utm_*, fbclid, etc)
        // Convert to lowercase
        // Remove default ports
        return URLNormalizer.normalize(url);
    }

    public boolean isContentDuplicate(String content, String url) {
        // Calculate SimHash (locality-sensitive hash)
        long fingerprint = calculateSimHash(content);

        // Check for exact or near duplicates
        String existingURL = contentFingerprints.get(fingerprint);
        if (existingURL != null) {
            return true; // Exact duplicate
        }

        // Check Hamming distance for near-duplicates
        for (Map.Entry<Long, String> entry : contentFingerprints.entrySet()) {
            if (hammingDistance(fingerprint, entry.getKey()) < 3) {
                // Near duplicate (< 3 bit difference)
                return true;
            }
        }

        contentFingerprints.put(fingerprint, url);
        return false;
    }

    // SimHash for content fingerprinting
    private long calculateSimHash(String content) {
        int[] vector = new int[64];

        // Extract features (words/shingles)
        for (String feature : extractFeatures(content)) {
            long hash = hashFeature(feature);
            for (int i = 0; i < 64; i++) {
                if ((hash & (1L << i)) != 0) {
                    vector[i]++;
                } else {
                    vector[i]--;
                }
            }
        }

        // Convert to fingerprint
        long fingerprint = 0;
        for (int i = 0; i < 64; i++) {
            if (vector[i] > 0) {
                fingerprint |= (1L << i);
            }
        }
        return fingerprint;
    }
}`
        },
        {
          name: 'Robots.txt & Politeness',
          explanation: 'robots.txt specifies crawler rules per domain. Must fetch and cache robots.txt before crawling any page. Respect Crawl-delay directive. Politeness: limit requests per domain (1/sec default), use exponential backoff on errors. Identify crawler with User-Agent.',
          codeExample: `// Robots.txt Service
@Service
public class RobotsService {
    private final Cache<String, RobotRules> robotsCache =
        Caffeine.newBuilder()
            .maximumSize(100_000)
            .expireAfterWrite(Duration.ofHours(24))
            .build();

    private static final String USER_AGENT = "MySearchBot/1.0";

    public boolean isAllowed(String url) {
        String host = extractHost(url);
        RobotRules rules = getRobotRules(host);
        return rules.isAllowed(USER_AGENT, extractPath(url));
    }

    public int getCrawlDelay(String host) {
        RobotRules rules = getRobotRules(host);
        int delay = rules.getCrawlDelay(USER_AGENT);
        return Math.max(delay, 1); // Minimum 1 second
    }

    private RobotRules getRobotRules(String host) {
        return robotsCache.get(host, this::fetchRobotsTxt);
    }

    private RobotRules fetchRobotsTxt(String host) {
        try {
            String robotsUrl = "https://" + host + "/robots.txt";
            HttpResponse response = httpClient.fetch(robotsUrl,
                Duration.ofSeconds(5));

            if (response.getStatusCode() == 200) {
                return RobotRulesParser.parse(response.getBody());
            } else if (response.getStatusCode() == 404) {
                return RobotRules.allowAll(); // No robots.txt = allow all
            } else {
                return RobotRules.disallowAll(); // Error = be conservative
            }
        } catch (Exception e) {
            return RobotRules.disallowAll();
        }
    }
}

// Example robots.txt
/*
User-agent: *
Disallow: /private/
Disallow: /api/
Crawl-delay: 2

User-agent: Googlebot
Allow: /
Crawl-delay: 1
*/`
        }
      ]
    },
    {
      id: 'parking-lot',
      name: 'Parking Lot System',
      icon: '🚗',
      color: '#8b5cf6',
      description: 'Design a parking lot management system with spots, vehicles, payments, and real-time availability.',
      diagram: ParkingLotDiagram,
      details: [
        {
          name: 'Object-Oriented Design',
          diagram: ParkingLotDiagram,
          explanation: 'Classic OOD problem. Key entities: ParkingLot (has floors), ParkingFloor (has spots), ParkingSpot (compact/regular/large), Vehicle (motorcycle/car/truck), Ticket (entry time, spot), Payment. Use inheritance for spot and vehicle types. Strategy pattern for spot allocation algorithms.',
          codeExample: `// Core Domain Model
public class ParkingLot {
    private String id;
    private String name;
    private Address address;
    private List<ParkingFloor> floors;

    public ParkingTicket parkVehicle(Vehicle vehicle) {
        ParkingSpot spot = findAvailableSpot(vehicle.getType());
        if (spot == null) {
            throw new ParkingFullException("No spots for " + vehicle.getType());
        }

        spot.assignVehicle(vehicle);
        return new ParkingTicket(
            generateTicketId(),
            vehicle,
            spot,
            Instant.now()
        );
    }

    public Payment unparkVehicle(ParkingTicket ticket) {
        ticket.getSpot().removeVehicle();

        Duration duration = Duration.between(
            ticket.getEntryTime(),
            Instant.now()
        );

        BigDecimal amount = calculateFee(ticket.getSpot().getType(), duration);
        return new Payment(ticket.getId(), amount);
    }
}

public abstract class ParkingSpot {
    protected String spotNumber;
    protected SpotType type;
    protected Vehicle currentVehicle;
    protected boolean isAvailable = true;

    public abstract boolean canFit(VehicleType vehicleType);

    public void assignVehicle(Vehicle vehicle) {
        if (!canFit(vehicle.getType())) {
            throw new SpotMismatchException();
        }
        this.currentVehicle = vehicle;
        this.isAvailable = false;
    }
}

public class CompactSpot extends ParkingSpot {
    public CompactSpot(String number) {
        this.spotNumber = number;
        this.type = SpotType.COMPACT;
    }

    @Override
    public boolean canFit(VehicleType type) {
        return type == VehicleType.MOTORCYCLE || type == VehicleType.CAR;
    }
}

public class LargeSpot extends ParkingSpot {
    @Override
    public boolean canFit(VehicleType type) {
        return true; // Can fit all vehicle types
    }
}`
        },
        {
          name: 'Spot Allocation Strategies',
          explanation: 'Different allocation strategies optimize for different goals. (1) Nearest to entrance - minimizes walking, maximizes convenience. (2) Fill floor first - simplifies management. (3) Balanced across floors - distributes wear. Use Strategy pattern to swap algorithms. Consider: compact cars can use regular spots if needed.',
          codeExample: `// Spot Allocation Strategy Pattern
public interface SpotAllocationStrategy {
    ParkingSpot findSpot(List<ParkingFloor> floors, VehicleType vehicleType);
}

public class NearestEntranceStrategy implements SpotAllocationStrategy {
    @Override
    public ParkingSpot findSpot(List<ParkingFloor> floors, VehicleType type) {
        // Ground floor (index 0) is nearest to entrance
        for (ParkingFloor floor : floors) {
            for (ParkingSpot spot : floor.getSpots()) {
                if (spot.isAvailable() && spot.canFit(type)) {
                    return spot;
                }
            }
        }
        return null;
    }
}

public class FillFloorStrategy implements SpotAllocationStrategy {
    @Override
    public ParkingSpot findSpot(List<ParkingFloor> floors, VehicleType type) {
        for (ParkingFloor floor : floors) {
            // Fill current floor before moving to next
            long available = floor.getSpots().stream()
                .filter(s -> s.isAvailable() && s.canFit(type))
                .count();

            if (available > 0) {
                return floor.getSpots().stream()
                    .filter(s -> s.isAvailable() && s.canFit(type))
                    .findFirst()
                    .orElse(null);
            }
        }
        return null;
    }
}

public class SpotFallbackStrategy implements SpotAllocationStrategy {
    // If no exact match, try larger spot types
    @Override
    public ParkingSpot findSpot(List<ParkingFloor> floors, VehicleType type) {
        // First try exact match
        ParkingSpot spot = findExactMatch(floors, type);
        if (spot != null) return spot;

        // Fallback: compact car can use regular spot
        if (type == VehicleType.CAR) {
            spot = findSpotOfType(floors, SpotType.REGULAR);
            if (spot != null) return spot;

            // Last resort: use large spot
            return findSpotOfType(floors, SpotType.LARGE);
        }

        return null;
    }
}`
        },
        {
          name: 'Concurrency Control',
          explanation: 'Multiple entry gates can try to assign same spot simultaneously. Need concurrency control: (1) Pessimistic locking - lock spot during assignment (simple, but can cause contention). (2) Optimistic locking - check version, retry on conflict (better for high traffic). (3) Database-level constraints with unique index.',
          codeExample: `// Concurrency Control for Spot Assignment
@Service
public class SpotAssignmentService {

    // Approach 1: Pessimistic Locking
    @Transactional
    public ParkingSpot assignSpotPessimistic(String lotId, VehicleType type) {
        // SELECT ... FOR UPDATE locks the rows
        List<ParkingSpot> availableSpots = spotRepository
            .findAvailableWithLock(lotId, type);

        if (availableSpots.isEmpty()) {
            throw new NoSpotAvailableException();
        }

        ParkingSpot spot = availableSpots.get(0);
        spot.setAvailable(false);
        spotRepository.save(spot);

        return spot;
    }

    // Approach 2: Optimistic Locking with retry
    @Retryable(value = OptimisticLockException.class, maxAttempts = 3)
    @Transactional
    public ParkingSpot assignSpotOptimistic(String lotId, VehicleType type) {
        ParkingSpot spot = spotRepository
            .findFirstAvailable(lotId, type)
            .orElseThrow(NoSpotAvailableException::new);

        // Version check happens on save
        spot.setAvailable(false);
        spotRepository.save(spot); // Throws if version changed

        return spot;
    }

    // Approach 3: Atomic update with conditions
    public ParkingSpot assignSpotAtomic(String lotId, VehicleType type) {
        // UPDATE ... WHERE available = true returns affected rows
        int updated = spotRepository.atomicAssign(lotId, type, vehicleId);

        if (updated == 0) {
            throw new NoSpotAvailableException();
        }

        return spotRepository.findByVehicleId(vehicleId);
    }
}

@Entity
public class ParkingSpot {
    @Id
    private String id;

    @Version  // Optimistic locking version column
    private Long version;

    private boolean available;
    private String vehicleId;
}`
        },
        {
          name: 'Pricing & Payment',
          explanation: 'Pricing models: hourly rate, daily maximum cap, different rates by spot type, peak/off-peak pricing, monthly passes. Payment integration: credit card, cash, mobile pay. Generate receipt with breakdown. Handle edge cases: lost ticket, overnight parking, validation (mall/hospital).',
          codeExample: `// Pricing and Payment Service
@Service
public class PricingService {

    public BigDecimal calculateFee(ParkingTicket ticket) {
        Duration duration = Duration.between(
            ticket.getEntryTime(),
            Instant.now()
        );

        SpotType spotType = ticket.getSpot().getType();
        PricingConfig config = getPricingConfig(spotType);

        // Calculate hours (round up)
        long hours = (duration.toMinutes() + 59) / 60;

        BigDecimal fee = BigDecimal.ZERO;

        // Apply hourly rates with time-of-day pricing
        for (int i = 0; i < hours; i++) {
            Instant hourTime = ticket.getEntryTime().plus(Duration.ofHours(i));
            BigDecimal hourlyRate = getHourlyRate(config, hourTime);
            fee = fee.add(hourlyRate);
        }

        // Apply daily maximum cap
        long days = duration.toDays();
        BigDecimal dailyCap = config.getDailyMax().multiply(
            BigDecimal.valueOf(Math.max(1, days)));

        return fee.min(dailyCap);
    }

    private BigDecimal getHourlyRate(PricingConfig config, Instant time) {
        LocalTime localTime = LocalTime.ofInstant(time, ZoneId.systemDefault());

        // Peak hours: 8am-10am, 5pm-7pm
        if (isPeakHour(localTime)) {
            return config.getPeakHourlyRate();
        }
        return config.getBaseHourlyRate();
    }
}

@Service
public class PaymentService {

    @Transactional
    public Receipt processPayment(String ticketId, PaymentMethod method) {
        ParkingTicket ticket = ticketRepository.findById(ticketId)
            .orElseThrow(TicketNotFoundException::new);

        BigDecimal amount = pricingService.calculateFee(ticket);

        // Process payment based on method
        PaymentResult result = switch (method.getType()) {
            case CREDIT_CARD -> creditCardProcessor.charge(method, amount);
            case CASH -> cashProcessor.process(method, amount);
            case MOBILE_PAY -> mobilePayProcessor.process(method, amount);
        };

        if (!result.isSuccess()) {
            throw new PaymentFailedException(result.getError());
        }

        // Mark ticket as paid
        ticket.markPaid(amount, result.getTransactionId());
        ticketRepository.save(ticket);

        return generateReceipt(ticket, result);
    }
}`
        }
      ]
    },
    {
      id: 'food-delivery',
      name: 'Food Delivery (Uber Eats)',
      icon: '🍕',
      color: '#ff6347',
      description: 'Design a food delivery platform with restaurant discovery, real-time order tracking, and driver dispatch.',
      diagram: FoodDeliveryDiagram,
      details: [
        {
          name: 'System Overview',
          diagram: FoodDeliveryDiagram,
          explanation: 'Three-sided marketplace: customers, restaurants, drivers. Key services: Search (restaurant discovery), Order (cart, checkout), Dispatch (driver assignment), Tracking (real-time location), Payment. Challenges: real-time coordination, dynamic pricing, ETA estimation, driver routing.',
          codeExample: `// Order Service - Core Flow
@Service
public class OrderService {

    @Transactional
    public Order createOrder(CreateOrderRequest request) {
        // 1. Validate cart and calculate totals
        Cart cart = cartService.getCart(request.getCustomerId());
        Restaurant restaurant = restaurantService.get(cart.getRestaurantId());

        validateOperatingHours(restaurant);
        validateDeliveryDistance(request.getDeliveryAddress(), restaurant);

        // 2. Calculate pricing
        OrderPricing pricing = pricingService.calculate(cart, request);

        // 3. Create order
        Order order = Order.builder()
            .customerId(request.getCustomerId())
            .restaurantId(cart.getRestaurantId())
            .items(cart.getItems())
            .deliveryAddress(request.getDeliveryAddress())
            .subtotal(pricing.getSubtotal())
            .deliveryFee(pricing.getDeliveryFee())
            .serviceFee(pricing.getServiceFee())
            .tax(pricing.getTax())
            .total(pricing.getTotal())
            .status(OrderStatus.PENDING)
            .build();

        orderRepository.save(order);

        // 4. Reserve payment
        paymentService.authorize(order);

        // 5. Send to restaurant
        restaurantNotificationService.notifyNewOrder(order);

        // 6. Estimate delivery time
        order.setEstimatedDelivery(etaService.estimate(order));

        return order;
    }

    // Restaurant accepts order
    public void acceptOrder(String orderId, int prepTimeMinutes) {
        Order order = getOrder(orderId);
        order.setStatus(OrderStatus.ACCEPTED);
        order.setPrepTime(Duration.ofMinutes(prepTimeMinutes));

        // Update ETA and notify customer
        order.setEstimatedDelivery(etaService.recalculate(order));
        customerNotificationService.notifyOrderAccepted(order);

        // Request driver assignment
        dispatchService.requestDriver(order);
    }
}`
        },
        {
          name: 'Restaurant Search',
          explanation: 'Search needs: location-based filtering (within delivery radius), ranking by relevance/rating/ETA, filters (cuisine, price, dietary), personalization. Use Elasticsearch for text search + geospatial queries. Cache popular searches. Pre-compute ETAs for nearby restaurants.',
          codeExample: `// Restaurant Search Service
@Service
public class RestaurantSearchService {
    private final ElasticsearchClient esClient;

    public SearchResults search(SearchRequest request) {
        BoolQuery.Builder query = new BoolQuery.Builder();

        // 1. Geospatial filter - restaurants that deliver to location
        query.filter(geoDistance(
            "location",
            request.getLatitude(),
            request.getLongitude(),
            "10km"  // Max delivery radius
        ));

        // 2. Text search on name and cuisine
        if (request.getQuery() != null) {
            query.must(multiMatch(
                request.getQuery(),
                "name^2", "cuisineTypes", "menuItems.name"
            ));
        }

        // 3. Filters
        if (request.getCuisineTypes() != null) {
            query.filter(terms("cuisineTypes", request.getCuisineTypes()));
        }
        if (request.getPriceRange() != null) {
            query.filter(range("priceLevel")
                .lte(request.getPriceRange().getMax()));
        }
        if (request.getMinRating() != null) {
            query.filter(range("rating").gte(request.getMinRating()));
        }

        // 4. Only open restaurants
        query.filter(term("isOpen", true));

        // 5. Execute search with ranking
        SearchResponse<Restaurant> response = esClient.search(s -> s
            .index("restaurants")
            .query(query.build()._toQuery())
            .sort(buildSortCriteria(request))
            .from(request.getOffset())
            .size(request.getLimit()),
            Restaurant.class
        );

        // 6. Enrich with real-time data
        List<RestaurantResult> results = response.hits().hits().stream()
            .map(hit -> enrichWithRealTimeData(hit.source(), request))
            .collect(toList());

        return new SearchResults(results, response.hits().total().value());
    }

    private RestaurantResult enrichWithRealTimeData(Restaurant r,
            SearchRequest request) {
        // Calculate real-time ETA based on current orders
        Duration eta = etaService.estimateForRestaurant(
            r.getId(),
            request.getLatitude(),
            request.getLongitude()
        );

        return RestaurantResult.builder()
            .restaurant(r)
            .deliveryEta(eta)
            .deliveryFee(pricingService.calculateDeliveryFee(r, request))
            .build();
    }
}`
        },
        {
          name: 'Driver Dispatch',
          explanation: 'Dispatch matches orders to nearby available drivers. Factors: driver location, order pickup time, current driver load, driver preferences. Use geospatial index for nearby driver lookup. Batch dispatch for efficiency. Handle rejection and reassignment.',
          codeExample: `// Driver Dispatch Service
@Service
public class DispatchService {
    private final RedisTemplate<String, DriverLocation> redis;

    public void requestDriver(Order order) {
        Restaurant restaurant = restaurantService.get(order.getRestaurantId());
        Instant pickupTime = Instant.now().plus(order.getPrepTime());

        // Find available drivers near restaurant
        List<Driver> candidates = findNearbyDrivers(
            restaurant.getLocation(),
            5.0 // 5km radius
        );

        // Score and rank candidates
        List<ScoredDriver> ranked = candidates.stream()
            .filter(d -> d.getStatus() == DriverStatus.AVAILABLE)
            .map(d -> scoreDriver(d, order, pickupTime))
            .sorted(Comparator.comparingDouble(ScoredDriver::getScore).reversed())
            .limit(5)
            .collect(toList());

        // Send offer to best candidate
        if (!ranked.isEmpty()) {
            sendDriverOffer(ranked.get(0).getDriver(), order);
        } else {
            // No drivers available - queue for retry
            dispatchQueue.addWithDelay(order.getId(), Duration.ofMinutes(2));
        }
    }

    private double scoreDriver(Driver driver, Order order, Instant pickupTime) {
        double score = 0.0;

        // Distance to restaurant (closer is better)
        double distance = calculateDistance(
            driver.getLocation(),
            order.getRestaurantLocation()
        );
        score += (10 - distance) * 0.3; // Max 10km

        // ETA to pickup (earlier arrival for later pickup is better)
        Duration etaToPickup = estimateETA(driver.getLocation(),
            order.getRestaurantLocation());
        Duration waitTime = Duration.between(
            Instant.now().plus(etaToPickup),
            pickupTime
        );
        if (!waitTime.isNegative()) {
            score += 3.0; // Bonus for on-time arrival
        }

        // Driver rating
        score += driver.getRating() * 0.2;

        // Acceptance rate
        score += driver.getAcceptanceRate() * 0.1;

        return score;
    }

    // Driver location tracking with Redis geospatial
    public void updateDriverLocation(String driverId, double lat, double lng) {
        redis.opsForGeo().add(
            "driver_locations",
            new Point(lng, lat),
            driverId
        );
    }

    private List<Driver> findNearbyDrivers(Location center, double radiusKm) {
        GeoResults<RedisGeoCommands.GeoLocation<String>> results =
            redis.opsForGeo().radius(
                "driver_locations",
                new Circle(new Point(center.getLng(), center.getLat()),
                    new Distance(radiusKm, Metrics.KILOMETERS))
            );

        return results.getContent().stream()
            .map(r -> driverService.get(r.getContent().getName()))
            .collect(toList());
    }
}`
        },
        {
          name: 'Real-time Tracking',
          explanation: 'Track driver location in real-time for customers. Driver app sends location every 5-10 seconds. Use WebSocket or Server-Sent Events for push updates. Calculate ETA dynamically based on traffic and remaining distance. Update order status as driver progresses.',
          codeExample: `// Real-time Order Tracking
@Service
public class TrackingService {
    private final Map<String, List<SseEmitter>> orderSubscribers =
        new ConcurrentHashMap<>();

    // Customer subscribes to order updates
    public SseEmitter subscribeToOrder(String orderId, String customerId) {
        // Verify customer owns order
        Order order = orderService.getOrder(orderId);
        if (!order.getCustomerId().equals(customerId)) {
            throw new UnauthorizedException();
        }

        SseEmitter emitter = new SseEmitter(0L); // No timeout
        orderSubscribers
            .computeIfAbsent(orderId, k -> new CopyOnWriteArrayList<>())
            .add(emitter);

        // Send current state immediately
        sendUpdate(emitter, buildTrackingUpdate(order));

        return emitter;
    }

    // Driver updates location
    public void updateDriverLocation(String driverId, Location location) {
        // Find active order for driver
        Order order = orderService.getActiveOrderForDriver(driverId);
        if (order == null) return;

        // Store location
        locationStore.save(driverId, location);

        // Calculate new ETA
        Duration newEta = calculateETA(location, order.getDeliveryAddress());

        // Build and broadcast update
        TrackingUpdate update = TrackingUpdate.builder()
            .orderId(order.getId())
            .driverLocation(location)
            .estimatedArrival(Instant.now().plus(newEta))
            .status(order.getStatus())
            .build();

        broadcastUpdate(order.getId(), update);
    }

    private void broadcastUpdate(String orderId, TrackingUpdate update) {
        List<SseEmitter> emitters = orderSubscribers.get(orderId);
        if (emitters == null) return;

        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                    .name("location_update")
                    .data(update));
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        }
    }

    // Status progression: ACCEPTED -> PREPARING -> READY -> PICKED_UP -> DELIVERED
    public void updateOrderStatus(String orderId, OrderStatus newStatus) {
        Order order = orderService.getOrder(orderId);
        order.setStatus(newStatus);

        TrackingUpdate update = TrackingUpdate.builder()
            .orderId(orderId)
            .status(newStatus)
            .statusMessage(getStatusMessage(newStatus))
            .build();

        broadcastUpdate(orderId, update);

        // Send push notification for major status changes
        if (newStatus == OrderStatus.PICKED_UP ||
            newStatus == OrderStatus.DELIVERED) {
            pushNotificationService.notify(order.getCustomerId(), update);
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
      { name: 'L4 System Design', icon: '🚀', page: 'L4 System Design' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#60a5fa',
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
        <h1 style={titleStyle}>L4 System Design (Mid Level)</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
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
              width: '100%',
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

export default L4SystemDesign

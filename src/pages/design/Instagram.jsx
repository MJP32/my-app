import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#E1306C',
  primaryHover: '#f472b6',
  bg: 'rgba(225, 48, 108, 0.1)',
  border: 'rgba(225, 48, 108, 0.3)',
  arrow: '#E1306C',
  hoverBg: 'rgba(225, 48, 108, 0.2)',
  topicBg: 'rgba(225, 48, 108, 0.2)'
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

const FeedGenerationDiagram = () => (
  <svg viewBox="0 0 900 400" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="feedGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#833AB4" />
        <stop offset="100%" stopColor="#E1306C" />
      </linearGradient>
      <linearGradient id="feedGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F77737" />
        <stop offset="100%" stopColor="#FCAF45" />
      </linearGradient>
      <marker id="arrowFeed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#E1306C" />
      </marker>
    </defs>

    <rect x="0" y="0" width="900" height="400" fill="#1a1a2e" rx="12" />
    <text x="450" y="30" textAnchor="middle" fill="url(#feedGrad2)" fontSize="18" fontWeight="bold">Feed Generation Flow</text>

    <rect x="30" y="60" width="100" height="70" fill="url(#feedGrad1)" rx="10" />
    <text x="80" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">User</text>
    <text x="80" y="108" textAnchor="middle" fill="white" fontSize="9">Opens App</text>

    <rect x="170" y="60" width="120" height="70" fill="#06b6d4" rx="10" />
    <text x="230" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Redis Cache</text>
    <text x="230" y="108" textAnchor="middle" fill="white" fontSize="9">Check feed</text>

    <rect x="330" y="40" width="110" height="50" fill="#10b981" rx="8" />
    <text x="385" y="60" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Cache Hit</text>
    <text x="385" y="75" textAnchor="middle" fill="white" fontSize="9">&lt;50ms</text>

    <rect x="330" y="100" width="110" height="50" fill="#ef4444" rx="8" />
    <text x="385" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Cache Miss</text>
    <text x="385" y="135" textAnchor="middle" fill="white" fontSize="9">Fetch from DB</text>

    <rect x="480" y="100" width="120" height="60" fill="#374151" rx="8" />
    <text x="540" y="125" textAnchor="middle" fill="#E1306C" fontSize="10" fontWeight="bold">Neo4j</text>
    <text x="540" y="142" textAnchor="middle" fill="#9ca3af" fontSize="9">Fetch following list</text>

    <rect x="640" y="100" width="120" height="60" fill="#374151" rx="8" />
    <text x="700" y="125" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Cassandra</text>
    <text x="700" y="142" textAnchor="middle" fill="#9ca3af" fontSize="9">Fetch posts</text>

    <rect x="480" y="190" width="280" height="70" fill="url(#feedGrad1)" rx="10" />
    <text x="620" y="218" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ML Ranking Algorithm</text>
    <text x="620" y="238" textAnchor="middle" fill="white" fontSize="10">Engagement + Recency + Affinity</text>

    <rect x="80" y="190" width="90" height="50" fill="#374151" rx="6" />
    <text x="125" y="212" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">Engagement</text>
    <text x="125" y="228" textAnchor="middle" fill="#9ca3af" fontSize="8">Likes/Comments</text>

    <rect x="185" y="190" width="90" height="50" fill="#374151" rx="6" />
    <text x="230" y="212" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Recency</text>
    <text x="230" y="228" textAnchor="middle" fill="#9ca3af" fontSize="8">Post time</text>

    <rect x="290" y="190" width="90" height="50" fill="#374151" rx="6" />
    <text x="335" y="212" textAnchor="middle" fill="#E1306C" fontSize="9" fontWeight="bold">Affinity</text>
    <text x="335" y="228" textAnchor="middle" fill="#9ca3af" fontSize="8">Interaction freq</text>

    <rect x="350" y="290" width="200" height="60" fill="#10b981" rx="10" />
    <text x="450" y="315" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Personalized Feed</text>
    <text x="450" y="335" textAnchor="middle" fill="white" fontSize="10">Top 30 ranked posts</text>

    <rect x="600" y="290" width="140" height="60" fill="#06b6d4" rx="10" />
    <text x="670" y="315" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Update Cache</text>
    <text x="670" y="335" textAnchor="middle" fill="white" fontSize="9">5-min TTL</text>

    <path d="M 130 95 L 165 95" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowFeed)" />
    <path d="M 290 80 L 325 65" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrowFeed)" />
    <path d="M 290 110 L 325 125" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowFeed)" />
    <path d="M 440 125 L 475 125" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowFeed)" />
    <path d="M 600 130 L 635 130" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowFeed)" />
    <path d="M 700 160 L 620 185" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowFeed)" />
    <path d="M 335 240 L 480 215" stroke="#E1306C" strokeWidth="2" strokeDasharray="4" fill="none" />
    <path d="M 620 260 L 450 285" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrowFeed)" />
    <path d="M 550 320 L 595 320" stroke="#06b6d4" strokeWidth="2" fill="none" markerEnd="url(#arrowFeed)" />
    <path d="M 440 65 L 750 65 L 750 360 L 560 360 L 480 340" stroke="#10b981" strokeWidth="2" strokeDasharray="4" fill="none" />
    <text x="800" y="200" textAnchor="middle" fill="#10b981" fontSize="10" transform="rotate(90, 800, 200)">Fast path (90%)</text>
  </svg>
)

const PhotoUploadDiagram = () => (
  <svg viewBox="0 0 900 320" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="uploadGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#833AB4" />
        <stop offset="100%" stopColor="#E1306C" />
      </linearGradient>
      <linearGradient id="uploadGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#F77737" />
      </linearGradient>
      <linearGradient id="uploadGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F77737" />
        <stop offset="100%" stopColor="#FCAF45" />
      </linearGradient>
      <marker id="arrowWhite" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#E1306C" />
      </marker>
    </defs>

    <rect x="0" y="0" width="900" height="320" fill="#1a1a2e" rx="12" />
    <text x="450" y="30" textAnchor="middle" fill="url(#uploadGrad2)" fontSize="18" fontWeight="bold">Image Upload & Processing Pipeline</text>

    <rect x="30" y="60" width="120" height="80" fill="url(#uploadGrad1)" rx="10" />
    <text x="90" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">1. Upload</text>
    <text x="90" y="115" textAnchor="middle" fill="white" fontSize="9">Client selects</text>
    <text x="90" y="128" textAnchor="middle" fill="white" fontSize="9">photo</text>

    <rect x="180" y="60" width="120" height="80" fill="url(#uploadGrad2)" rx="10" />
    <text x="240" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">2. Pre-signed</text>
    <text x="240" y="112" textAnchor="middle" fill="white" fontSize="9">Get S3 URL</text>
    <text x="240" y="128" textAnchor="middle" fill="white" fontSize="9">from API</text>

    <rect x="330" y="60" width="120" height="80" fill="#059669" rx="10" />
    <text x="390" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">3. S3 Upload</text>
    <text x="390" y="112" textAnchor="middle" fill="white" fontSize="9">Direct upload</text>
    <text x="390" y="128" textAnchor="middle" fill="white" fontSize="9">to bucket</text>

    <rect x="480" y="60" width="120" height="80" fill="#f97316" rx="10" />
    <text x="540" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">4. Event</text>
    <text x="540" y="112" textAnchor="middle" fill="white" fontSize="9">Publish to</text>
    <text x="540" y="128" textAnchor="middle" fill="white" fontSize="9">Kafka</text>

    <rect x="630" y="60" width="120" height="80" fill="url(#uploadGrad3)" rx="10" />
    <text x="690" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">5. Process</text>
    <text x="690" y="112" textAnchor="middle" fill="white" fontSize="9">Resize, Filter</text>
    <text x="690" y="128" textAnchor="middle" fill="white" fontSize="9">Compress</text>

    <rect x="780" y="60" width="90" height="80" fill="#0891b2" rx="10" />
    <text x="825" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">6. CDN</text>
    <text x="825" y="115" textAnchor="middle" fill="white" fontSize="9">Distribute</text>

    <path d="M 150 100 L 175 100" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowWhite)" />
    <path d="M 300 100 L 325 100" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowWhite)" />
    <path d="M 450 100 L 475 100" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowWhite)" />
    <path d="M 600 100 L 625 100" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowWhite)" />
    <path d="M 750 100 L 775 100" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowWhite)" />

    <rect x="80" y="180" width="140" height="60" fill="#374151" rx="8" />
    <text x="150" y="205" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Generate Thumbnails</text>
    <text x="150" y="222" textAnchor="middle" fill="#9ca3af" fontSize="9">150, 320, 640, 1080px</text>

    <rect x="250" y="180" width="140" height="60" fill="#374151" rx="8" />
    <text x="320" y="205" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Convert to WebP</text>
    <text x="320" y="222" textAnchor="middle" fill="#9ca3af" fontSize="9">30% size reduction</text>

    <rect x="420" y="180" width="140" height="60" fill="#374151" rx="8" />
    <text x="490" y="205" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="bold">Extract EXIF</text>
    <text x="490" y="222" textAnchor="middle" fill="#9ca3af" fontSize="9">Location, timestamp</text>

    <rect x="590" y="180" width="140" height="60" fill="#374151" rx="8" />
    <text x="660" y="205" textAnchor="middle" fill="#E1306C" fontSize="10" fontWeight="bold">Apply Filters</text>
    <text x="660" y="222" textAnchor="middle" fill="#9ca3af" fontSize="9">User selected effects</text>

    <path d="M 690 140 L 690 155 L 400 155 L 400 175" stroke="#FCAF45" strokeWidth="2" strokeDasharray="4" fill="none" />

    <text x="450" y="280" textAnchor="middle" fill="#9ca3af" fontSize="11">Worker Pool: Parallel image processing with Kafka consumers</text>
    <rect x="180" y="290" width="540" height="20" fill="#1e293b" rx="4" />
    <text x="450" y="305" textAnchor="middle" fill="#06b6d4" fontSize="10">Average processing time: 2-3 seconds per image</text>
  </svg>
)

const DatabaseDesignDiagram = () => (
  <svg viewBox="0 0 900 350" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="dbGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#833AB4" />
        <stop offset="100%" stopColor="#E1306C" />
      </linearGradient>
      <marker id="arrowDB" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#E1306C" />
      </marker>
    </defs>

    <rect x="0" y="0" width="900" height="350" fill="#1a1a2e" rx="12" />
    <text x="450" y="30" textAnchor="middle" fill="url(#dbGrad1)" fontSize="18" fontWeight="bold">Multi-Database Architecture</text>

    <rect x="30" y="60" width="180" height="120" fill="#374151" rx="10" />
    <text x="120" y="90" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">Cassandra</text>
    <text x="120" y="115" textAnchor="middle" fill="#9ca3af" fontSize="10">Posts Storage</text>
    <text x="120" y="135" textAnchor="middle" fill="white" fontSize="9">Partition: user_id</text>
    <text x="120" y="150" textAnchor="middle" fill="white" fontSize="9">RF: 3 replicas</text>
    <text x="120" y="165" textAnchor="middle" fill="white" fontSize="9">95M posts/day</text>

    <rect x="240" y="60" width="180" height="120" fill="#374151" rx="10" />
    <text x="330" y="90" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">PostgreSQL</text>
    <text x="330" y="115" textAnchor="middle" fill="#9ca3af" fontSize="10">User Accounts</text>
    <text x="330" y="135" textAnchor="middle" fill="white" fontSize="9">100 shards</text>
    <text x="330" y="150" textAnchor="middle" fill="white" fontSize="9">ACID compliance</text>
    <text x="330" y="165" textAnchor="middle" fill="white" fontSize="9">1P + 2R per shard</text>

    <rect x="450" y="60" width="180" height="120" fill="#374151" rx="10" />
    <text x="540" y="90" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Neo4j</text>
    <text x="540" y="115" textAnchor="middle" fill="#9ca3af" fontSize="10">Social Graph</text>
    <text x="540" y="135" textAnchor="middle" fill="white" fontSize="9">Follow relationships</text>
    <text x="540" y="150" textAnchor="middle" fill="white" fontSize="9">Graph traversal</text>
    <text x="540" y="165" textAnchor="middle" fill="white" fontSize="9">Max 2 hops</text>

    <rect x="660" y="60" width="180" height="120" fill="#374151" rx="10" />
    <text x="750" y="90" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Redis</text>
    <text x="750" y="115" textAnchor="middle" fill="#9ca3af" fontSize="10">Cache Layer</text>
    <text x="750" y="135" textAnchor="middle" fill="white" fontSize="9">Feed cache: 5min TTL</text>
    <text x="750" y="150" textAnchor="middle" fill="white" fontSize="9">Stories: sorted sets</text>
    <text x="750" y="165" textAnchor="middle" fill="white" fontSize="9">Sessions & counters</text>

    <rect x="120" y="210" width="200" height="80" fill="#059669" rx="10" />
    <text x="220" y="245" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">S3 Object Storage</text>
    <text x="220" y="270" textAnchor="middle" fill="white" fontSize="10">Images: 347 PB (5 years)</text>

    <rect x="360" y="210" width="200" height="80" fill="#0891b2" rx="10" />
    <text x="460" y="245" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CloudFront CDN</text>
    <text x="460" y="270" textAnchor="middle" fill="white" fontSize="10">200+ edge locations</text>

    <rect x="600" y="210" width="200" height="80" fill="#7c3aed" rx="10" />
    <text x="700" y="245" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Elasticsearch</text>
    <text x="700" y="270" textAnchor="middle" fill="white" fontSize="10">Search: users, hashtags</text>

    <path d="M 220 180 L 220 205" stroke="#059669" strokeWidth="2" fill="none" markerEnd="url(#arrowDB)" />
    <path d="M 320 290 L 360 250" stroke="#0891b2" strokeWidth="2" fill="none" markerEnd="url(#arrowDB)" />
    <text x="450" y="320" textAnchor="middle" fill="#9ca3af" fontSize="11">Polyglot persistence: Use the right database for each data type</text>
  </svg>
)

const StoriesDiagram = () => (
  <svg viewBox="0 0 900 380" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="storyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#833AB4" />
        <stop offset="50%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#F77737" />
      </linearGradient>
      <linearGradient id="storyGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#FCAF45" />
      </linearGradient>
      <linearGradient id="expireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <marker id="arrowStory" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#E1306C" />
      </marker>
    </defs>

    <rect x="0" y="0" width="900" height="380" fill="#1a1a2e" rx="12" />
    <text x="450" y="30" textAnchor="middle" fill="url(#storyGrad2)" fontSize="18" fontWeight="bold">Stories Architecture (24-Hour Expiration)</text>

    <text x="200" y="60" textAnchor="middle" fill="url(#storyGrad1)" fontSize="14" fontWeight="bold">Story Upload</text>

    <rect x="30" y="80" width="100" height="60" fill="url(#storyGrad1)" rx="8" />
    <text x="80" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">User</text>
    <text x="80" y="120" textAnchor="middle" fill="white" fontSize="9">Posts Story</text>

    <rect x="160" y="80" width="100" height="60" fill="#059669" rx="8" />
    <text x="210" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S3</text>
    <text x="210" y="120" textAnchor="middle" fill="white" fontSize="9">Store Media</text>

    <rect x="290" y="80" width="110" height="60" fill="#06b6d4" rx="8" />
    <text x="345" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Redis</text>
    <text x="345" y="120" textAnchor="middle" fill="white" fontSize="9">Add to sorted set</text>

    <rect x="290" y="155" width="110" height="40" fill="url(#expireGrad)" rx="6" />
    <text x="345" y="175" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">TTL: 24 hours</text>
    <text x="345" y="188" textAnchor="middle" fill="white" fontSize="8">Auto-expire</text>

    <text x="700" y="60" textAnchor="middle" fill="url(#storyGrad1)" fontSize="14" fontWeight="bold">Story Viewing</text>

    <rect x="500" y="80" width="100" height="60" fill="url(#storyGrad1)" rx="8" />
    <text x="550" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">User</text>
    <text x="550" y="120" textAnchor="middle" fill="white" fontSize="9">Opens Stories</text>

    <rect x="630" y="80" width="110" height="60" fill="#06b6d4" rx="8" />
    <text x="685" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Redis</text>
    <text x="685" y="120" textAnchor="middle" fill="white" fontSize="9">Fetch active stories</text>

    <rect x="770" y="80" width="100" height="60" fill="#10b981" rx="8" />
    <text x="820" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Display</text>
    <text x="820" y="120" textAnchor="middle" fill="white" fontSize="9">Group by user</text>

    <rect x="630" y="155" width="110" height="40" fill="#374151" rx="6" />
    <text x="685" y="175" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Track Views</text>
    <text x="685" y="188" textAnchor="middle" fill="#9ca3af" fontSize="8">INCR counter</text>

    <rect x="200" y="220" width="500" height="90" fill="#1e293b" rx="10" stroke="#E1306C" strokeWidth="2" />
    <text x="450" y="245" textAnchor="middle" fill="url(#storyGrad1)" fontSize="12" fontWeight="bold">Stories Ring (Home Screen)</text>

    <circle cx="260" cy="280" r="22" fill="none" stroke="url(#storyGrad1)" strokeWidth="3" />
    <circle cx="260" cy="280" r="18" fill="#374151" />
    <text x="260" y="284" textAnchor="middle" fill="white" fontSize="8">User 1</text>

    <circle cx="330" cy="280" r="22" fill="none" stroke="url(#storyGrad1)" strokeWidth="3" />
    <circle cx="330" cy="280" r="18" fill="#374151" />
    <text x="330" y="284" textAnchor="middle" fill="white" fontSize="8">User 2</text>

    <circle cx="400" cy="280" r="22" fill="none" stroke="#6b7280" strokeWidth="3" />
    <circle cx="400" cy="280" r="18" fill="#374151" />
    <text x="400" y="284" textAnchor="middle" fill="#9ca3af" fontSize="8">Seen</text>

    <circle cx="470" cy="280" r="22" fill="none" stroke="url(#storyGrad1)" strokeWidth="3" />
    <circle cx="470" cy="280" r="18" fill="#374151" />
    <text x="470" y="284" textAnchor="middle" fill="white" fontSize="8">User 4</text>

    <circle cx="540" cy="280" r="22" fill="none" stroke="url(#storyGrad1)" strokeWidth="3" />
    <circle cx="540" cy="280" r="18" fill="#374151" />
    <text x="540" y="284" textAnchor="middle" fill="white" fontSize="8">User 5</text>

    <circle cx="610" cy="280" r="22" fill="none" stroke="#6b7280" strokeWidth="3" />
    <circle cx="610" cy="280" r="18" fill="#374151" />
    <text x="610" y="284" textAnchor="middle" fill="#9ca3af" fontSize="8">Seen</text>

    <rect x="30" y="330" width="180" height="40" fill="#374151" rx="6" />
    <text x="120" y="350" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Cron Job: Daily Cleanup</text>
    <text x="120" y="365" textAnchor="middle" fill="#9ca3af" fontSize="8">Delete expired S3 files</text>

    <rect x="690" y="330" width="180" height="40" fill="#374151" rx="6" />
    <text x="780" y="350" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="bold">Redis: Sorted Set</text>
    <text x="780" y="365" textAnchor="middle" fill="#9ca3af" fontSize="8">stories:{'{user_id}'} -&gt; timestamp</text>

    <path d="M 130 110 L 155 110" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowStory)" />
    <path d="M 260 110 L 285 110" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowStory)" />
    <path d="M 345 140 L 345 150" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowStory)" />
    <path d="M 600 110 L 625 110" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowStory)" />
    <path d="M 740 110 L 765 110" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowStory)" />
    <path d="M 685 140 L 685 150" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowStory)" />
  </svg>
)

const ScalingDiagram = () => (
  <svg viewBox="0 0 900 300" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="scaleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#833AB4" />
        <stop offset="100%" stopColor="#E1306C" />
      </linearGradient>
      <marker id="arrowScale" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#E1306C" />
      </marker>
    </defs>

    <rect x="0" y="0" width="900" height="300" fill="#1a1a2e" rx="12" />
    <text x="450" y="30" textAnchor="middle" fill="url(#scaleGrad1)" fontSize="18" fontWeight="bold">Multi-Layer Scaling Architecture</text>

    <rect x="30" y="60" width="120" height="80" fill="#8b5cf6" rx="10" />
    <text x="90" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Global DNS</text>
    <text x="90" y="115" textAnchor="middle" fill="white" fontSize="9">Route53</text>
    <text x="90" y="128" textAnchor="middle" fill="white" fontSize="8">Geo-routing</text>

    <rect x="180" y="60" width="140" height="80" fill="#3b82f6" rx="10" />
    <text x="250" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">CDN</text>
    <text x="250" y="115" textAnchor="middle" fill="white" fontSize="9">CloudFront</text>
    <text x="250" y="128" textAnchor="middle" fill="white" fontSize="8">200+ edge locations</text>

    <rect x="350" y="60" width="140" height="80" fill="#10b981" rx="10" />
    <text x="420" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Load Balancer</text>
    <text x="420" y="115" textAnchor="middle" fill="white" fontSize="9">ALB</text>
    <text x="420" y="128" textAnchor="middle" fill="white" fontSize="8">Path routing</text>

    <rect x="520" y="50" width="100" height="50" fill="#f59e0b" rx="8" />
    <text x="570" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Service 1</text>

    <rect x="520" y="105" width="100" height="50" fill="#f59e0b" rx="8" />
    <text x="570" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Service 2</text>

    <rect x="650" y="50" width="100" height="50" fill="#f59e0b" rx="8" />
    <text x="700" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Service N</text>

    <rect x="650" y="105" width="100" height="50" fill="#f59e0b" rx="8" />
    <text x="700" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Auto Scale</text>

    <rect x="780" y="60" width="90" height="80" fill="#06b6d4" rx="10" />
    <text x="825" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Redis</text>
    <text x="825" y="115" textAnchor="middle" fill="white" fontSize="9">Cluster</text>

    <rect x="100" y="180" width="160" height="60" fill="#374151" rx="8" />
    <text x="180" y="205" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Cache Hit: 95%</text>
    <text x="180" y="225" textAnchor="middle" fill="#9ca3af" fontSize="9">CDN + Redis</text>

    <rect x="300" y="180" width="160" height="60" fill="#374151" rx="8" />
    <text x="380" y="205" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Auto-Scale</text>
    <text x="380" y="225" textAnchor="middle" fill="#9ca3af" fontSize="9">100 - 10K instances</text>

    <rect x="500" y="180" width="160" height="60" fill="#374151" rx="8" />
    <text x="580" y="205" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">Sharding</text>
    <text x="580" y="225" textAnchor="middle" fill="#9ca3af" fontSize="9">1000 partitions</text>

    <rect x="700" y="180" width="160" height="60" fill="#374151" rx="8" />
    <text x="780" y="205" textAnchor="middle" fill="#E1306C" fontSize="11" fontWeight="bold">Replication</text>
    <text x="780" y="225" textAnchor="middle" fill="#9ca3af" fontSize="9">RF=3 per shard</text>

    <path d="M 150 100 L 175 100" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowScale)" />
    <path d="M 320 100 L 345 100" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowScale)" />
    <path d="M 490 75 L 515 75" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowScale)" />
    <path d="M 490 130 L 515 130" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowScale)" />
    <path d="M 620 75 L 645 75" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowScale)" />
    <path d="M 750 100 L 775 100" stroke="#06b6d4" strokeWidth="2" fill="none" markerEnd="url(#arrowScale)" />

    <text x="450" y="275" textAnchor="middle" fill="#9ca3af" fontSize="11">Design for 2B users, 500M DAU, 95M posts/day</text>
  </svg>
)

const NotificationDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="notifGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#833AB4" />
        <stop offset="100%" stopColor="#E1306C" />
      </linearGradient>
      <marker id="arrowNotif" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#E1306C" />
      </marker>
    </defs>

    <rect x="0" y="0" width="800" height="250" fill="#1a1a2e" rx="12" />
    <text x="400" y="30" textAnchor="middle" fill="url(#notifGrad1)" fontSize="16" fontWeight="bold">Push Notification Pipeline</text>

    <rect x="30" y="60" width="100" height="60" fill="url(#notifGrad1)" rx="8" />
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Event</text>
    <text x="80" y="100" textAnchor="middle" fill="white" fontSize="8">Like/Comment</text>

    <rect x="160" y="60" width="110" height="60" fill="#f97316" rx="8" />
    <text x="215" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Kafka</text>
    <text x="215" y="100" textAnchor="middle" fill="white" fontSize="8">Notification Topic</text>

    <rect x="300" y="60" width="130" height="60" fill="#3b82f6" rx="8" />
    <text x="365" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Notification Service</text>
    <text x="365" y="100" textAnchor="middle" fill="white" fontSize="8">Batch & Dedupe</text>

    <rect x="480" y="40" width="100" height="45" fill="#10b981" rx="6" />
    <text x="530" y="60" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">FCM</text>
    <text x="530" y="75" textAnchor="middle" fill="white" fontSize="8">Android</text>

    <rect x="480" y="95" width="100" height="45" fill="#8b5cf6" rx="6" />
    <text x="530" y="115" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">APNS</text>
    <text x="530" y="130" textAnchor="middle" fill="white" fontSize="8">iOS</text>

    <rect x="620" y="40" width="80" height="45" fill="#06b6d4" rx="6" />
    <text x="660" y="68" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">In-App</text>

    <rect x="620" y="95" width="80" height="45" fill="#f59e0b" rx="6" />
    <text x="660" y="123" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Email</text>

    <rect x="720" y="60" width="60" height="60" fill="#374151" rx="6" />
    <text x="750" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">User</text>
    <text x="750" y="100" textAnchor="middle" fill="#9ca3af" fontSize="8">Device</text>

    <path d="M 130 90 L 155 90" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowNotif)" />
    <path d="M 270 90 L 295 90" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowNotif)" />
    <path d="M 430 75 L 475 62" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrowNotif)" />
    <path d="M 430 105 L 475 117" stroke="#8b5cf6" strokeWidth="2" fill="none" markerEnd="url(#arrowNotif)" />
    <path d="M 580 62 L 615 62" stroke="#06b6d4" strokeWidth="2" fill="none" markerEnd="url(#arrowNotif)" />
    <path d="M 580 117 L 615 117" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowNotif)" />
    <path d="M 700 90 L 715 90" stroke="#E1306C" strokeWidth="2" fill="none" markerEnd="url(#arrowNotif)" />

    <rect x="150" y="165" width="500" height="70" fill="#1e293b" rx="8" />
    <text x="400" y="190" textAnchor="middle" fill="#E1306C" fontSize="11" fontWeight="bold">Notification Types</text>
    <text x="220" y="215" textAnchor="middle" fill="#9ca3af" fontSize="9">Likes</text>
    <text x="310" y="215" textAnchor="middle" fill="#9ca3af" fontSize="9">Comments</text>
    <text x="400" y="215" textAnchor="middle" fill="#9ca3af" fontSize="9">Followers</text>
    <text x="490" y="215" textAnchor="middle" fill="#9ca3af" fontSize="9">Mentions</text>
    <text x="580" y="215" textAnchor="middle" fill="#9ca3af" fontSize="9">Story Views</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Instagram({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'feed-generation',
      name: 'Feed Generation',
      icon: '📰',
      color: '#f59e0b',
      description: 'Personalized feed creation using ML ranking with fan-out strategies for regular users and celebrities.',
      diagram: FeedGenerationDiagram,
      details: [
        {
          name: 'Feed Generation Flow',
          diagram: FeedGenerationDiagram,
          explanation: 'When a user opens the app, we first check Redis cache for their pre-computed feed (5-minute TTL). Cache hits (~90%) return in <50ms. On cache miss, we fetch the following list from Neo4j, retrieve the last 100 posts per followed user from Cassandra in parallel, then apply ML ranking based on engagement, recency, and user affinity. The ranked feed is cached and the top 30 posts are returned.',
          codeExample: `// Feed Service - generateFeed()
public class FeedService {
    private final RedisTemplate<String, Feed> redisTemplate;
    private final Neo4jClient graphClient;
    private final CassandraTemplate cassandra;
    private final RankingModel rankingModel;

    public Feed generateFeed(String userId) {
        // 1. Check cache first (5-min TTL)
        String cacheKey = "feed:" + userId;
        Feed cachedFeed = redisTemplate.opsForValue().get(cacheKey);
        if (cachedFeed != null) {
            return cachedFeed; // Cache hit: <50ms
        }

        // 2. Cache miss: fetch from databases
        List<String> followingIds = graphClient.getFollowing(userId);

        // 3. Parallel fetch posts from Cassandra
        List<Post> posts = followingIds.parallelStream()
            .flatMap(id -> cassandra.getRecentPosts(id, 100).stream())
            .collect(Collectors.toList());

        // 4. Apply ML ranking
        List<Post> rankedPosts = rankingModel.rank(posts, userId);

        // 5. Cache result and return top 30
        Feed feed = new Feed(rankedPosts.subList(0, 30));
        redisTemplate.opsForValue().set(cacheKey, feed, Duration.ofMinutes(5));
        return feed;
    }
}`
        },
        {
          name: 'Fan-out Strategies',
          explanation: 'We use a hybrid fan-out approach: Fan-out on Write for regular users (<1M followers) pre-generates feeds when they post, enabling fast reads. Fan-out on Read for celebrities (>1M followers) computes feeds on-demand to avoid write amplification. During feed assembly, we mix celebrity posts with pre-computed feeds. This balances fast feed loading with efficient post creation.',
          codeExample: `// Hybrid Fan-out Implementation
public class PostService {
    private static final int CELEBRITY_THRESHOLD = 1_000_000;

    public void createPost(Post post) {
        // Save post to Cassandra
        cassandra.save(post);

        long followerCount = graphClient.getFollowerCount(post.getUserId());

        if (followerCount < CELEBRITY_THRESHOLD) {
            // Fan-out on Write: push to all followers' feeds
            List<String> followerIds = graphClient.getFollowers(post.getUserId());
            kafkaTemplate.send("feed-fanout", new FanoutEvent(post, followerIds));
        } else {
            // Celebrity: mark for Fan-out on Read
            redisTemplate.opsForSet().add("celebrity-posts:" + post.getUserId(), post.getId());
        }
    }
}

// Feed assembly includes celebrity posts
public Feed assembleFullFeed(String userId, List<Post> precomputedFeed) {
    List<String> followedCelebrities = getFollowedCelebrities(userId);
    List<Post> celebrityPosts = followedCelebrities.stream()
        .flatMap(id -> getRecentCelebrityPosts(id).stream())
        .collect(Collectors.toList());

    return mergAndRank(precomputedFeed, celebrityPosts);
}`
        },
        {
          name: 'ML Ranking Algorithm',
          explanation: 'The ranking algorithm scores posts based on multiple signals: Engagement (likes, comments, shares, saves), Recency (exponential decay from post time), User Affinity (historical interaction frequency with poster), Content Type (video > carousel > photo), and Dwell Time (how long users typically view similar content). A neural network model combines these features for real-time inference.',
          codeExample: `// ML Ranking Model
public class RankingModel {
    private final TensorFlowModel model;

    public List<Post> rank(List<Post> posts, String userId) {
        UserFeatures userFeatures = extractUserFeatures(userId);

        return posts.stream()
            .map(post -> {
                PostFeatures postFeatures = extractPostFeatures(post);
                double score = model.predict(combineFeatures(userFeatures, postFeatures));
                return new ScoredPost(post, score);
            })
            .sorted(Comparator.comparingDouble(ScoredPost::getScore).reversed())
            .map(ScoredPost::getPost)
            .collect(Collectors.toList());
    }

    private PostFeatures extractPostFeatures(Post post) {
        return PostFeatures.builder()
            .engagementRate(calculateEngagementRate(post))
            .recencyScore(calculateRecencyDecay(post.getCreatedAt()))
            .contentType(post.getMediaType().ordinal())
            .hashtagPopularity(getHashtagScore(post.getHashtags()))
            .authorVerified(post.getAuthor().isVerified() ? 1 : 0)
            .build();
    }

    private double calculateRecencyDecay(Instant createdAt) {
        long hoursAgo = Duration.between(createdAt, Instant.now()).toHours();
        return Math.exp(-0.1 * hoursAgo); // Exponential decay
    }
}`
        }
      ]
    },
    {
      id: 'image-storage',
      name: 'Image Storage & CDN',
      icon: '📸',
      color: '#10b981',
      description: 'Upload pipeline with pre-signed URLs, async processing, thumbnail generation, and global CDN distribution.',
      diagram: PhotoUploadDiagram,
      details: [
        {
          name: 'Upload Pipeline',
          diagram: PhotoUploadDiagram,
          explanation: 'The upload flow uses pre-signed URLs for direct S3 upload, bypassing the backend for large files. Client requests a pre-signed URL from the API, uploads directly to S3, then notifies the backend with the S3 key. A Kafka event triggers async processing. This approach reduces backend load and enables chunked/resumable uploads for large media files.',
          codeExample: `// Upload Service with Pre-signed URLs
@RestController
public class UploadController {
    private final S3Presigner s3Presigner;
    private final KafkaTemplate<String, ProcessingEvent> kafkaTemplate;

    @PostMapping("/upload/presigned-url")
    public PresignedUrlResponse getPresignedUrl(@RequestBody UploadRequest request) {
        String key = String.format("uploads/%s/%s/%s",
            Year.now(), Month.now(), UUID.randomUUID());

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
            .signatureDuration(Duration.ofMinutes(15))
            .putObjectRequest(b -> b.bucket("instagram-images").key(key))
            .build();

        PresignedPutObjectRequest presigned = s3Presigner.presignPutObject(presignRequest);
        return new PresignedUrlResponse(presigned.url().toString(), key);
    }

    @PostMapping("/upload/complete")
    public PostResponse completeUpload(@RequestBody CompleteUploadRequest request) {
        // Create post record
        Post post = postRepository.save(new Post(
            request.getUserId(),
            request.getS3Key(),
            request.getCaption()
        ));

        // Trigger async image processing
        kafkaTemplate.send("image-processing", new ProcessingEvent(post.getId(), request.getS3Key()));

        return new PostResponse(post.getId(), "Processing");
    }
}`
        },
        {
          name: 'Image Processing',
          explanation: 'Worker pools consume Kafka events for parallel image processing. Each image generates 4 thumbnail sizes (150, 320, 640, 1080px), converts to WebP format (30% smaller than JPEG), extracts EXIF metadata (location, timestamp, device), and applies user-selected filters. Processing averages 2-3 seconds per image with horizontal scaling.',
          codeExample: `// Image Processing Worker
@KafkaListener(topics = "image-processing")
public class ImageProcessingWorker {
    private final S3Client s3Client;
    private final int[] THUMBNAIL_SIZES = {150, 320, 640, 1080};

    @KafkaHandler
    public void processImage(ProcessingEvent event) {
        // 1. Download original from S3
        byte[] original = s3Client.getObject(GetObjectRequest.builder()
            .bucket("instagram-images")
            .key(event.getS3Key())
            .build()).readAllBytes();

        BufferedImage image = ImageIO.read(new ByteArrayInputStream(original));

        // 2. Generate thumbnails in parallel
        List<CompletableFuture<Void>> futures = Arrays.stream(THUMBNAIL_SIZES)
            .mapToObj(size -> CompletableFuture.runAsync(() -> {
                BufferedImage thumbnail = resizeImage(image, size);
                byte[] webpBytes = convertToWebP(thumbnail);
                String thumbnailKey = event.getS3Key().replace("uploads/", "thumbnails/" + size + "/");
                uploadToS3(thumbnailKey, webpBytes, "image/webp");
            }))
            .collect(Collectors.toList());

        // 3. Extract EXIF metadata
        ImageMetadata metadata = extractExifMetadata(original);

        // 4. Apply filters if requested
        if (event.getFilterId() != null) {
            byte[] filtered = applyFilter(original, event.getFilterId());
            uploadToS3(event.getS3Key().replace("uploads/", "processed/"), filtered, "image/webp");
        }

        // 5. Wait for all thumbnails and update post status
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
        postRepository.updateStatus(event.getPostId(), "READY", metadata);
    }
}`
        },
        {
          name: 'CDN Distribution',
          explanation: 'CloudFront CDN serves images from 200+ edge locations globally. Images have a 7-day TTL, thumbnails 1-day TTL. Cache hit rate exceeds 95%, reducing origin load by 85%. We use adaptive image serving based on device/connection quality, and progressive loading with blur-up technique for perceived performance.',
          codeExample: `// CloudFront Configuration & Adaptive Serving
// CloudFront distribution config
{
  "Origins": [{
    "DomainName": "instagram-images.s3.amazonaws.com",
    "S3OriginConfig": {
      "OriginAccessIdentity": "origin-access-identity/cloudfront/ABCDEF"
    }
  }],
  "CacheBehaviors": [{
    "PathPattern": "/thumbnails/*",
    "DefaultTTL": 86400,    // 1 day for thumbnails
    "MaxTTL": 604800        // 7 days max
  }, {
    "PathPattern": "/processed/*",
    "DefaultTTL": 604800,   // 7 days for processed images
    "MaxTTL": 2592000       // 30 days max
  }],
  "PriceClass": "PriceClass_All"  // Use all edge locations
}

// Adaptive image serving based on client hints
@GetMapping("/image/{postId}")
public ResponseEntity<Void> getImage(
    @PathVariable String postId,
    @RequestHeader(value = "Save-Data", required = false) String saveData,
    @RequestHeader(value = "Viewport-Width", required = false) Integer viewportWidth) {

    int targetSize = 1080; // default
    if ("on".equals(saveData) || (viewportWidth != null && viewportWidth < 400)) {
        targetSize = 320; // Low bandwidth or small screen
    } else if (viewportWidth != null && viewportWidth < 800) {
        targetSize = 640;
    }

    String cdnUrl = String.format("https://cdn.instagram.com/thumbnails/%d/%s.webp",
        targetSize, postId);

    return ResponseEntity.status(302)
        .header("Location", cdnUrl)
        .header("Cache-Control", "public, max-age=3600")
        .build();
}`
        }
      ]
    },
    {
      id: 'database-design',
      name: 'Database Design',
      icon: '🗄️',
      color: '#8b5cf6',
      description: 'Polyglot persistence with Cassandra for posts, PostgreSQL for users, Neo4j for social graph, and Redis caching.',
      diagram: DatabaseDesignDiagram,
      details: [
        {
          name: 'Multi-Database Architecture',
          diagram: DatabaseDesignDiagram,
          explanation: 'We use polyglot persistence - the right database for each data type. Cassandra handles posts (95M/day, write-heavy, horizontal scaling). PostgreSQL stores user accounts (ACID compliance for authentication). Neo4j manages the social graph (efficient relationship traversal). Redis provides caching and real-time features (feeds, sessions, counters). S3 stores media, Elasticsearch powers search.',
          codeExample: `// Data Access Layer with Multiple Databases
@Configuration
public class DatabaseConfig {

    // Cassandra for posts - write-optimized, horizontal scaling
    @Bean
    public CassandraTemplate cassandraTemplate() {
        return new CassandraTemplate(cassandraSession());
    }

    // PostgreSQL for users - ACID compliance
    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(postgresDataSource());
    }

    // Neo4j for social graph - relationship queries
    @Bean
    public Neo4jClient neo4jClient() {
        return Neo4jClient.create(driver());
    }

    // Redis for caching - sub-millisecond access
    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory());
        return template;
    }
}

// Post entity stored in Cassandra
@Table("posts")
public class Post {
    @PrimaryKeyColumn(type = PrimaryKeyType.PARTITIONED)
    private UUID userId;  // Partition key - all user's posts on same node

    @PrimaryKeyColumn(type = PrimaryKeyType.CLUSTERED, ordering = Ordering.DESCENDING)
    private UUID postId;  // Clustering key - sorted by time

    private String s3Key;
    private String caption;
    private Set<String> hashtags;
    private Instant createdAt;
}`
        },
        {
          name: 'Sharding Strategy',
          explanation: 'Cassandra uses user_id as partition key with 1000 shards via consistent hashing (RF=3). PostgreSQL has 100 shards using user_id % 100 routing, with 1 primary + 2 replicas per shard. Neo4j shards by user_id to keep user graphs co-located. Hot users (celebrities) have follower lists cached in Redis to avoid graph database hotspots.',
          codeExample: `// Sharding Configuration
public class ShardRouter {
    private static final int POSTGRES_SHARDS = 100;
    private static final int CELEBRITY_FOLLOWER_THRESHOLD = 1_000_000;

    // PostgreSQL shard routing for user data
    public DataSource getShardForUser(String userId) {
        int shardId = Math.abs(userId.hashCode() % POSTGRES_SHARDS);
        return shardDataSources.get(shardId);
    }

    // Cassandra handles sharding automatically via partition key
    // Just ensure user_id is the partition key in your schema

    // Neo4j follower queries with Redis caching for celebrities
    public List<String> getFollowers(String userId) {
        // Check if celebrity - use Redis cache
        if (isCelebrity(userId)) {
            String cacheKey = "followers:" + userId;
            Set<String> cached = redisTemplate.opsForSet().members(cacheKey);
            if (cached != null && !cached.isEmpty()) {
                return new ArrayList<>(cached);
            }
        }

        // Regular users - query Neo4j directly
        return neo4jClient.query(
            "MATCH (u:User {id: $userId})<-[:FOLLOWS]-(f:User) RETURN f.id LIMIT 1000")
            .bind(userId).to("userId")
            .fetchAs(String.class).all();
    }

    private boolean isCelebrity(String userId) {
        Long followerCount = redisTemplate.opsForValue().get("follower_count:" + userId);
        return followerCount != null && followerCount > CELEBRITY_FOLLOWER_THRESHOLD;
    }
}`
        },
        {
          name: 'Data Models',
          explanation: 'Posts in Cassandra are partitioned by user_id with time-based clustering for efficient timeline queries. Users in PostgreSQL have normalized schema with profile, settings, and authentication tables. Neo4j stores FOLLOWS relationships with timestamps. Redis uses sorted sets for feeds (score=timestamp), sets for stories, and strings for counters/sessions.',
          codeExample: `-- Cassandra: Posts table
CREATE TABLE posts (
    user_id UUID,
    post_id TIMEUUID,
    s3_key TEXT,
    caption TEXT,
    hashtags SET<TEXT>,
    like_count COUNTER,
    comment_count COUNTER,
    created_at TIMESTAMP,
    PRIMARY KEY (user_id, post_id)
) WITH CLUSTERING ORDER BY (post_id DESC);

-- PostgreSQL: Users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255),
    full_name VARCHAR(100),
    bio TEXT,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Neo4j: Social graph
CREATE (u1:User {id: 'user-1', username: 'alice'})
CREATE (u2:User {id: 'user-2', username: 'bob'})
CREATE (u1)-[:FOLLOWS {since: datetime()}]->(u2)

// Redis data structures
// Feed: sorted set with timestamp as score
ZADD feed:user-1 1706000000 post-id-1
ZADD feed:user-1 1706001000 post-id-2

// Stories: sorted set with expiration
ZADD stories:user-1 1706000000 story-id-1
EXPIRE stories:user-1 86400

// Counters
INCR likes:post-1
INCR followers:user-1`
        }
      ]
    },
    {
      id: 'scaling',
      name: 'Scaling Architecture',
      icon: '📈',
      color: '#3b82f6',
      description: 'Multi-layer scaling with CDN, load balancing, auto-scaling, and multi-layer caching for 2B users.',
      diagram: ScalingDiagram,
      details: [
        {
          name: 'Load Balancing',
          diagram: ScalingDiagram,
          explanation: 'Global load balancing uses Route53 with geo-routing and latency-based routing for optimal region selection. Regional ALBs handle path-based routing to services with weighted round-robin distribution. Health checks run every 30 seconds with automatic failover. SSL termination happens at the ALB layer. Connection draining ensures graceful service updates.',
          codeExample: `// Load Balancer Configuration (Terraform)
resource "aws_lb" "instagram_alb" {
  name               = "instagram-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = aws_subnet.public[*].id

  enable_deletion_protection = true
  enable_http2               = true
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.instagram_alb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = aws_acm_certificate.cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }
}

// Path-based routing rules
resource "aws_lb_listener_rule" "feed_service" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.feed_service.arn
  }

  condition {
    path_pattern {
      values = ["/api/feed/*"]
    }
  }
}

// Health check configuration
resource "aws_lb_target_group" "api" {
  name     = "api-target-group"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    enabled             = true
    interval            = 30
    path                = "/health"
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }
}`
        },
        {
          name: 'Auto-Scaling',
          explanation: 'Auto-scaling triggers at 70% CPU utilization, scaling up by 25% of current instances. Cooldown period is 5 minutes to prevent thrashing. Minimum capacity is 100 instances, maximum 10,000. We use predictive scaling based on historical patterns (morning commute, lunch breaks) and step scaling for sudden traffic spikes.',
          codeExample: `// Auto-Scaling Configuration
resource "aws_autoscaling_group" "feed_service" {
  name                = "feed-service-asg"
  min_size            = 100
  max_size            = 10000
  desired_capacity    = 200
  vpc_zone_identifier = aws_subnet.private[*].id
  target_group_arns   = [aws_lb_target_group.feed_service.arn]

  launch_template {
    id      = aws_launch_template.feed_service.id
    version = "$Latest"
  }

  instance_refresh {
    strategy = "Rolling"
    preferences {
      min_healthy_percentage = 75
    }
  }
}

// Target tracking scaling policy
resource "aws_autoscaling_policy" "cpu_target" {
  name                   = "cpu-target-tracking"
  policy_type            = "TargetTrackingScaling"
  autoscaling_group_name = aws_autoscaling_group.feed_service.name

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 70.0
  }
}

// Step scaling for sudden spikes
resource "aws_autoscaling_policy" "scale_up" {
  name                   = "scale-up"
  scaling_adjustment     = 25
  adjustment_type        = "PercentChangeInCapacity"
  cooldown               = 300
  autoscaling_group_name = aws_autoscaling_group.feed_service.name
}

// Predictive scaling for known patterns
resource "aws_autoscaling_policy" "predictive" {
  name                   = "predictive-scaling"
  policy_type            = "PredictiveScaling"
  autoscaling_group_name = aws_autoscaling_group.feed_service.name

  predictive_scaling_configuration {
    mode                   = "ForecastAndScale"
    scheduling_buffer_time = 300
  }
}`
        },
        {
          name: 'Caching Layers',
          explanation: 'L1 CDN caching at edge (95% hit rate, 7-day TTL for images). L2 Redis cluster for application caching (feeds 5-min, profiles 15-min, counters 1-min TTL). L3 in-memory LRU cache in each service instance (10-second TTL for hot data). This multi-layer approach reduces database load by 99% for read traffic.',
          codeExample: `// Multi-Layer Caching Implementation
@Service
public class CachingService {
    private final LoadingCache<String, Object> localCache;  // L3: In-memory
    private final RedisTemplate<String, Object> redisTemplate;  // L2: Redis

    public CachingService() {
        // L3: Local LRU cache with 10-second TTL
        this.localCache = Caffeine.newBuilder()
            .maximumSize(10_000)
            .expireAfterWrite(Duration.ofSeconds(10))
            .build(this::loadFromRedis);
    }

    public <T> T get(String key, Class<T> type, Supplier<T> dbFallback, Duration ttl) {
        // L3: Check local cache first
        T cached = type.cast(localCache.getIfPresent(key));
        if (cached != null) return cached;

        // L2: Check Redis
        cached = type.cast(redisTemplate.opsForValue().get(key));
        if (cached != null) {
            localCache.put(key, cached);
            return cached;
        }

        // Database fallback and populate caches
        T value = dbFallback.get();
        if (value != null) {
            redisTemplate.opsForValue().set(key, value, ttl);
            localCache.put(key, value);
        }
        return value;
    }
}

// Usage in Feed Service
public Feed getFeed(String userId) {
    return cachingService.get(
        "feed:" + userId,
        Feed.class,
        () -> feedRepository.generateFeed(userId),  // DB fallback
        Duration.ofMinutes(5)  // TTL for feeds
    );
}

// Redis Cache Aside Pattern for counters
public long incrementLikes(String postId) {
    String key = "likes:" + postId;
    Long count = redisTemplate.opsForValue().increment(key);

    // Async write-behind to database
    if (count % 100 == 0) {  // Batch updates every 100 likes
        kafkaTemplate.send("like-sync", new LikeSyncEvent(postId, count));
    }

    return count;
}`
        }
      ]
    },
    {
      id: 'stories',
      name: 'Stories Architecture',
      icon: '⏰',
      color: '#E1306C',
      description: 'Ephemeral 24-hour content with Redis sorted sets, automatic TTL expiration, and real-time view tracking.',
      diagram: StoriesDiagram,
      details: [
        {
          name: 'Story Upload Flow',
          diagram: StoriesDiagram,
          explanation: 'Stories upload follows a similar pattern to posts but with Redis as the primary metadata store. Media goes to S3 with a story-specific path. Story metadata is added to a Redis sorted set (score = timestamp) with a 24-hour TTL. This enables automatic expiration without cleanup jobs for metadata, while S3 files are cleaned by a daily cron job.',
          codeExample: `// Story Upload Service
@Service
public class StoryService {
    private final S3Client s3Client;
    private final RedisTemplate<String, String> redisTemplate;
    private final KafkaTemplate<String, NotificationEvent> notificationKafka;

    private static final Duration STORY_TTL = Duration.ofHours(24);

    public Story uploadStory(String userId, MultipartFile media) {
        // 1. Upload media to S3
        String storyId = UUID.randomUUID().toString();
        String s3Key = String.format("stories/%s/%s/%s",
            userId, LocalDate.now(), storyId);

        s3Client.putObject(PutObjectRequest.builder()
            .bucket("instagram-stories")
            .key(s3Key)
            .contentType(media.getContentType())
            .build(), RequestBody.fromBytes(media.getBytes()));

        // 2. Add to Redis sorted set (score = timestamp)
        String storiesKey = "stories:" + userId;
        long timestamp = Instant.now().toEpochMilli();

        redisTemplate.opsForZSet().add(storiesKey,
            storyId + ":" + s3Key, timestamp);

        // 3. Set/refresh 24-hour TTL on the sorted set
        redisTemplate.expire(storiesKey, STORY_TTL);

        // 4. Store view counter
        redisTemplate.opsForValue().set(
            "story_views:" + storyId, "0", STORY_TTL);

        // 5. Notify followers
        notifyFollowers(userId, storyId);

        return new Story(storyId, s3Key, timestamp);
    }

    private void notifyFollowers(String userId, String storyId) {
        notificationKafka.send("story-notifications",
            new NotificationEvent("NEW_STORY", userId, storyId));
    }
}`
        },
        {
          name: 'Story Viewing',
          explanation: 'When viewing stories, we fetch all active stories from followed users via Redis ZRANGEBYSCORE. Stories are grouped by user for sequential viewing (swipe through one user\'s stories before moving to next). View counts are tracked with Redis INCR for real-time updates. We mark stories as seen in a user-specific Redis set to update the story ring UI.',
          codeExample: `// Story Viewing Service
@Service
public class StoryViewService {
    private final RedisTemplate<String, String> redisTemplate;

    public List<UserStories> getStoriesForUser(String viewerId) {
        // Get list of users this viewer follows
        List<String> followingIds = socialGraphService.getFollowing(viewerId);

        long now = Instant.now().toEpochMilli();
        long yesterday = now - Duration.ofHours(24).toMillis();

        // Fetch active stories from each followed user
        return followingIds.stream()
            .map(userId -> {
                String storiesKey = "stories:" + userId;

                // Get stories from last 24 hours
                Set<ZSetOperations.TypedTuple<String>> stories =
                    redisTemplate.opsForZSet()
                        .rangeByScoreWithScores(storiesKey, yesterday, now);

                if (stories == null || stories.isEmpty()) {
                    return null;
                }

                // Check which stories this user has seen
                String seenKey = "seen:" + viewerId;
                Set<String> seenStoryIds = redisTemplate.opsForSet().members(seenKey);

                List<StoryItem> items = stories.stream()
                    .map(tuple -> parseStoryItem(tuple, seenStoryIds))
                    .collect(Collectors.toList());

                return new UserStories(userId, items);
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    }

    public void markStoryAsViewed(String viewerId, String storyId, String storyOwnerId) {
        // Increment view count
        redisTemplate.opsForValue().increment("story_views:" + storyId);

        // Add to viewer's seen set
        redisTemplate.opsForSet().add("seen:" + viewerId, storyId);

        // Add viewer to story's viewers list (for "who viewed" feature)
        redisTemplate.opsForZSet().add(
            "story_viewers:" + storyId,
            viewerId,
            Instant.now().toEpochMilli());
    }
}`
        },
        {
          name: 'Story Cleanup',
          explanation: 'Redis automatically expires story metadata via TTL, requiring no cleanup. S3 files need explicit deletion via a daily cron job that scans for stories older than 24 hours. We use S3 lifecycle policies as a backup to delete files older than 48 hours. View counts and viewer lists are also TTL-based for automatic cleanup.',
          codeExample: `// Story Cleanup Service
@Scheduled(cron = "0 0 * * * *")  // Run every hour
public class StoryCleanupJob {
    private final S3Client s3Client;
    private final RedisTemplate<String, String> redisTemplate;

    @Scheduled
    public void cleanupExpiredStories() {
        Instant cutoff = Instant.now().minus(Duration.ofHours(24));

        // List S3 objects older than 24 hours
        ListObjectsV2Request request = ListObjectsV2Request.builder()
            .bucket("instagram-stories")
            .prefix("stories/")
            .build();

        List<ObjectIdentifier> toDelete = new ArrayList<>();

        s3Client.listObjectsV2Paginator(request).stream()
            .flatMap(response -> response.contents().stream())
            .filter(obj -> obj.lastModified().isBefore(cutoff))
            .forEach(obj -> toDelete.add(
                ObjectIdentifier.builder().key(obj.key()).build()));

        // Batch delete (up to 1000 objects per request)
        Lists.partition(toDelete, 1000).forEach(batch -> {
            s3Client.deleteObjects(DeleteObjectsRequest.builder()
                .bucket("instagram-stories")
                .delete(Delete.builder().objects(batch).build())
                .build());
        });

        log.info("Deleted {} expired story files", toDelete.size());
    }
}

// S3 Lifecycle Policy (backup cleanup)
{
    "Rules": [{
        "ID": "ExpireOldStories",
        "Status": "Enabled",
        "Filter": {
            "Prefix": "stories/"
        },
        "Expiration": {
            "Days": 2
        }
    }]
}`
        }
      ]
    },
    {
      id: 'notifications',
      name: 'Notifications & Search',
      icon: '🔔',
      color: '#06b6d4',
      description: 'Push notification pipeline with FCM/APNS, and Elasticsearch-powered search for users, hashtags, and locations.',
      diagram: NotificationDiagram,
      details: [
        {
          name: 'Push Notifications',
          diagram: NotificationDiagram,
          explanation: 'Notifications flow through Kafka for reliable async delivery. The notification service batches and deduplicates events (e.g., "Alice and 5 others liked your post"). FCM handles Android, APNS handles iOS. In-app notifications update in real-time via WebSocket. Email digests go to inactive users. Rate limiting caps push notifications at 10 per day.',
          codeExample: `// Notification Service
@Service
public class NotificationService {
    private final FirebaseMessaging fcm;
    private final ApnsClient apnsClient;
    private final KafkaTemplate<String, NotificationEvent> kafka;

    private static final int MAX_PUSH_PER_DAY = 10;

    @KafkaListener(topics = "notifications")
    public void processNotification(NotificationEvent event) {
        String recipientId = event.getRecipientId();

        // Check rate limit
        String rateLimitKey = "notif_count:" + recipientId + ":" + LocalDate.now();
        Long count = redisTemplate.opsForValue().increment(rateLimitKey);
        if (count == 1) {
            redisTemplate.expire(rateLimitKey, Duration.ofDays(1));
        }
        if (count > MAX_PUSH_PER_DAY) {
            log.info("Rate limit exceeded for user {}", recipientId);
            return;
        }

        // Batch similar notifications
        String batchKey = "batch:" + event.getType() + ":" + event.getTargetId();
        redisTemplate.opsForList().rightPush(batchKey, event.getActorId());

        // Schedule batch send after 30 seconds
        scheduler.schedule(() -> sendBatchedNotification(batchKey, event),
            Instant.now().plusSeconds(30));
    }

    private void sendBatchedNotification(String batchKey, NotificationEvent event) {
        List<String> actors = redisTemplate.opsForList().range(batchKey, 0, -1);
        redisTemplate.delete(batchKey);

        if (actors == null || actors.isEmpty()) return;

        String message = formatMessage(event.getType(), actors, event.getTargetId());
        User recipient = userService.getUser(event.getRecipientId());

        // Send via appropriate channel
        if (recipient.getFcmToken() != null) {
            sendFcmNotification(recipient.getFcmToken(), message);
        }
        if (recipient.getApnsToken() != null) {
            sendApnsNotification(recipient.getApnsToken(), message);
        }

        // Always save to in-app notifications
        saveInAppNotification(event.getRecipientId(), message);
    }
}`
        },
        {
          name: 'Search Implementation',
          explanation: 'Elasticsearch powers search for users (by username, full name), hashtags (by text, popularity), and locations (by name, coordinates). Async indexing via Kafka keeps search in sync with data changes. Auto-complete uses prefix matching with a Trie structure. Results are ranked by a combination of relevance score and popularity metrics.',
          codeExample: `// Search Service with Elasticsearch
@Service
public class SearchService {
    private final ElasticsearchClient esClient;

    public SearchResults search(String query, SearchType type) {
        SearchRequest request = buildSearchRequest(query, type);
        SearchResponse<Object> response = esClient.search(request, Object.class);

        return parseResults(response);
    }

    private SearchRequest buildSearchRequest(String query, SearchType type) {
        return SearchRequest.of(s -> s
            .index(type.getIndexName())
            .query(q -> q
                .bool(b -> b
                    .should(sh -> sh
                        .multiMatch(mm -> mm
                            .query(query)
                            .fields("username^3", "full_name^2", "bio")
                            .type(TextQueryType.BestFields)
                            .fuzziness("AUTO")
                        )
                    )
                    .should(sh -> sh
                        .prefix(p -> p
                            .field("username")
                            .value(query.toLowerCase())
                            .boost(5.0f)  // Boost exact prefix matches
                        )
                    )
                )
            )
            .sort(so -> so
                .field(f -> f
                    .field("follower_count")
                    .order(SortOrder.Desc)
                )
            )
            .size(20)
        );
    }

    // Auto-complete for search suggestions
    public List<String> autoComplete(String prefix) {
        SearchRequest request = SearchRequest.of(s -> s
            .index("users", "hashtags")
            .query(q -> q
                .prefix(p -> p
                    .field("username")
                    .value(prefix.toLowerCase())
                )
            )
            .source(src -> src
                .filter(f -> f.includes("username", "hashtag_name"))
            )
            .size(10)
        );

        return esClient.search(request, Map.class).hits().hits().stream()
            .map(hit -> extractSuggestion(hit))
            .collect(Collectors.toList());
    }
}`
        },
        {
          name: 'Explore & Discover',
          explanation: 'The Explore page uses ML-based recommendations. We analyze user signals (engagement history, interests, following graph, dwell time) to build a user profile. A candidate generation phase selects ~1000 potentially relevant posts from trending, fresh, and quality pools. The ranking model scores and filters for diversity and safety before presenting the top 50 posts.',
          codeExample: `// Explore/Discover Recommendation Service
@Service
public class ExploreService {
    private final TensorFlowModel candidateModel;
    private final TensorFlowModel rankingModel;
    private final ContentModerationService moderationService;

    public List<Post> getExploreContent(String userId) {
        // 1. Build user profile from signals
        UserProfile profile = buildUserProfile(userId);

        // 2. Candidate generation: fetch ~1000 potential posts
        List<Post> candidates = new ArrayList<>();
        candidates.addAll(getTrendingPosts(200));  // High engagement
        candidates.addAll(getFreshPosts(profile.getInterests(), 500));  // Recent
        candidates.addAll(getQualityPosts(300));  // High-res, verified creators

        // 3. Score and rank candidates
        List<ScoredPost> scored = candidates.stream()
            .map(post -> new ScoredPost(post, rankingModel.score(profile, post)))
            .sorted(Comparator.comparing(ScoredPost::getScore).reversed())
            .collect(Collectors.toList());

        // 4. Apply diversity filter (avoid too many posts from same user/topic)
        List<Post> diverse = applyDiversityFilter(scored);

        // 5. Content moderation filter
        List<Post> safe = diverse.stream()
            .filter(post -> moderationService.isSafe(post))
            .collect(Collectors.toList());

        return safe.subList(0, Math.min(50, safe.size()));
    }

    private UserProfile buildUserProfile(String userId) {
        return UserProfile.builder()
            .engagementHistory(getRecentEngagements(userId))
            .interests(inferInterests(userId))
            .followingGraph(getFollowingSimilarity(userId))
            .avgDwellTime(getAvgDwellTime(userId))
            .build();
    }

    private List<Post> applyDiversityFilter(List<ScoredPost> posts) {
        Map<String, Integer> userCounts = new HashMap<>();
        Map<String, Integer> topicCounts = new HashMap<>();

        return posts.stream()
            .filter(sp -> {
                int userCount = userCounts.getOrDefault(sp.getPost().getUserId(), 0);
                int topicCount = topicCounts.getOrDefault(sp.getPost().getPrimaryTopic(), 0);

                if (userCount >= 3 || topicCount >= 5) return false;

                userCounts.put(sp.getPost().getUserId(), userCount + 1);
                topicCounts.put(sp.getPost().getPrimaryTopic(), topicCount + 1);
                return true;
            })
            .map(ScoredPost::getPost)
            .collect(Collectors.toList());
    }
}`
        }
      ]
    }
  ]

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

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'System Design', icon: '🏗️', page: 'System Design' },
      { name: 'Instagram', icon: '📸', page: 'Instagram' }
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

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #831843 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #E1306C, #833AB4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(225, 48, 108, 0.2)',
    border: '1px solid rgba(225, 48, 108, 0.3)',
    borderRadius: '0.5rem',
    color: '#f472b6',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Instagram System Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(225, 48, 108, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(225, 48, 108, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to System Design
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
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
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
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
              const DiagramComponent = detail.diagram || selectedConcept.diagram
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

export default Instagram

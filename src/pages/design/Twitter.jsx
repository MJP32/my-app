import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Breadcrumb from '../../components/Breadcrumb';

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#60a5fa',
  primaryHover: '#93c5fd',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
};

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
];

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const TwitterArchitectureDiagram = () => (
  <svg viewBox="0 0 800 500" className="w-full h-auto" style={{ maxHeight: '500px' }}>
    <defs>
      <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="lbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="apiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <linearGradient id="serviceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
      <linearGradient id="cacheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>
    <rect width="800" height="500" fill="#1F2937" rx="10"/>
    <text x="400" y="30" textAnchor="middle" fill="#60A5FA" fontSize="18" fontWeight="bold">Twitter System Architecture</text>
    <g filter="url(#shadow)">
      <rect x="300" y="50" width="200" height="50" rx="8" fill="url(#clientGrad)"/>
      <text x="400" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Clients (Web/iOS/Android)</text>
    </g>
    <path d="M400 100 L400 125 L390 115 M400 125 L410 115" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <g filter="url(#shadow)">
      <rect x="300" y="130" width="200" height="45" rx="8" fill="url(#lbGrad)"/>
      <text x="400" y="158" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Load Balancer (Nginx)</text>
    </g>
    <path d="M400 175 L400 200 L390 190 M400 200 L410 190" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <g filter="url(#shadow)">
      <rect x="300" y="205" width="200" height="45" rx="8" fill="url(#apiGrad)"/>
      <text x="400" y="233" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">API Gateway</text>
    </g>
    <path d="M300 250 L100 290" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <path d="M350 250 L250 290" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <path d="M450 250 L550 290" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <path d="M500 250 L700 290" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <g filter="url(#shadow)">
      <rect x="30" y="290" width="140" height="55" rx="8" fill="url(#serviceGrad)"/>
      <text x="100" y="312" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Tweet Service</text>
      <text x="100" y="330" textAnchor="middle" fill="white" fontSize="10">CRUD operations</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="180" y="290" width="140" height="55" rx="8" fill="url(#serviceGrad)"/>
      <text x="250" y="312" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">User Service</text>
      <text x="250" y="330" textAnchor="middle" fill="white" fontSize="10">Profiles, Auth</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="480" y="290" width="140" height="55" rx="8" fill="url(#serviceGrad)"/>
      <text x="550" y="312" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Timeline Service</text>
      <text x="550" y="330" textAnchor="middle" fill="white" fontSize="10">Feed generation</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="630" y="290" width="140" height="55" rx="8" fill="url(#serviceGrad)"/>
      <text x="700" y="312" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Search Service</text>
      <text x="700" y="330" textAnchor="middle" fill="white" fontSize="10">Elasticsearch</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="330" y="290" width="140" height="55" rx="8" fill="url(#serviceGrad)"/>
      <text x="400" y="312" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Follow Service</text>
      <text x="400" y="330" textAnchor="middle" fill="white" fontSize="10">Social graph</text>
    </g>
    <path d="M100 345 L100 390" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <path d="M250 345 L250 390" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <path d="M400 345 L400 390" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <path d="M550 345 L550 390" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <path d="M700 345 L700 390" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <g filter="url(#shadow)">
      <rect x="30" y="395" width="140" height="45" rx="8" fill="url(#dbGrad)"/>
      <text x="100" y="423" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">MySQL (Tweets)</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="180" y="395" width="140" height="45" rx="8" fill="url(#dbGrad)"/>
      <text x="250" y="423" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">MySQL (Users)</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="330" y="395" width="140" height="45" rx="8" fill="url(#dbGrad)"/>
      <text x="400" y="423" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Graph DB</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="480" y="395" width="140" height="45" rx="8" fill="url(#cacheGrad)"/>
      <text x="550" y="423" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Redis Cache</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="630" y="395" width="140" height="45" rx="8" fill="#06B6D4"/>
      <text x="700" y="423" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Elasticsearch</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="250" y="455" width="300" height="35" rx="8" fill="#8B5CF6"/>
      <text x="400" y="478" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Kafka Message Queue (Async Processing)</text>
    </g>
  </svg>
);

const FanOutDiagram = () => (
  <svg viewBox="0 0 800 400" className="w-full h-auto" style={{ maxHeight: '400px' }}>
    <defs>
      <linearGradient id="writeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="readGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="hybridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <rect width="800" height="400" fill="#1F2937" rx="10"/>
    <text x="400" y="25" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="bold">Fan-out Strategies Comparison</text>
    <rect x="20" y="40" width="240" height="350" rx="8" fill="#064E3B" fillOpacity="0.3" stroke="#10B981" strokeWidth="2"/>
    <text x="140" y="65" textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="bold">Fan-out on Write (Push)</text>
    <rect x="60" y="85" width="160" height="35" rx="6" fill="url(#writeGrad)"/>
    <text x="140" y="108" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">User Posts Tweet</text>
    <path d="M140 120 L140 145" stroke="#10B981" strokeWidth="2" fill="none"/>
    <polygon points="140,150 135,140 145,140" fill="#10B981"/>
    <rect x="60" y="155" width="160" height="35" rx="6" fill="#8B5CF6"/>
    <text x="140" y="178" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Kafka Queue</text>
    <path d="M140 190 L140 215" stroke="#10B981" strokeWidth="2" fill="none"/>
    <polygon points="140,220 135,210 145,210" fill="#10B981"/>
    <rect x="60" y="225" width="160" height="35" rx="6" fill="#F59E0B"/>
    <text x="140" y="248" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Fan-out Worker</text>
    <path d="M80 260 L50 295" stroke="#10B981" strokeWidth="2" fill="none"/>
    <path d="M110 260 L100 295" stroke="#10B981" strokeWidth="2" fill="none"/>
    <path d="M170 260 L180 295" stroke="#10B981" strokeWidth="2" fill="none"/>
    <path d="M200 260 L230 295" stroke="#10B981" strokeWidth="2" fill="none"/>
    <rect x="30" y="300" width="50" height="30" rx="4" fill="#EC4899"/>
    <text x="55" y="320" textAnchor="middle" fill="white" fontSize="8">Cache 1</text>
    <rect x="85" y="300" width="50" height="30" rx="4" fill="#EC4899"/>
    <text x="110" y="320" textAnchor="middle" fill="white" fontSize="8">Cache 2</text>
    <rect x="145" y="300" width="50" height="30" rx="4" fill="#EC4899"/>
    <text x="170" y="320" textAnchor="middle" fill="white" fontSize="8">Cache N</text>
    <rect x="200" y="300" width="50" height="30" rx="4" fill="#EC4899"/>
    <text x="225" y="320" textAnchor="middle" fill="white" fontSize="8">...</text>
    <text x="140" y="355" textAnchor="middle" fill="#10B981" fontSize="10">Write: O(n) followers</text>
    <text x="140" y="370" textAnchor="middle" fill="#10B981" fontSize="10">Read: O(1) - instant</text>
    <rect x="280" y="40" width="240" height="350" rx="8" fill="#1E3A5F" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
    <text x="400" y="65" textAnchor="middle" fill="#3B82F6" fontSize="14" fontWeight="bold">Fan-out on Read (Pull)</text>
    <rect x="320" y="85" width="160" height="35" rx="6" fill="url(#readGrad)"/>
    <text x="400" y="108" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Request Timeline</text>
    <path d="M400 120 L400 145" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <polygon points="400,150 395,140 405,140" fill="#3B82F6"/>
    <rect x="320" y="155" width="160" height="35" rx="6" fill="#F59E0B"/>
    <text x="400" y="178" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Timeline Service</text>
    <path d="M340 190 L310 225" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <path d="M380 190 L370 225" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <path d="M420 190 L430 225" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <path d="M460 190 L490 225" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <rect x="290" y="230" width="50" height="30" rx="4" fill="#EF4444"/>
    <text x="315" y="250" textAnchor="middle" fill="white" fontSize="8">User A</text>
    <rect x="350" y="230" width="50" height="30" rx="4" fill="#EF4444"/>
    <text x="375" y="250" textAnchor="middle" fill="white" fontSize="8">User B</text>
    <rect x="410" y="230" width="50" height="30" rx="4" fill="#EF4444"/>
    <text x="435" y="250" textAnchor="middle" fill="white" fontSize="8">User C</text>
    <rect x="470" y="230" width="50" height="30" rx="4" fill="#EF4444"/>
    <text x="495" y="250" textAnchor="middle" fill="white" fontSize="8">...</text>
    <path d="M315 260 L400 290" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <path d="M375 260 L400 290" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <path d="M435 260 L400 290" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <path d="M495 260 L400 290" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <rect x="340" y="295" width="120" height="35" rx="6" fill="#6366F1"/>
    <text x="400" y="318" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Merge & Sort</text>
    <text x="400" y="355" textAnchor="middle" fill="#3B82F6" fontSize="10">Write: O(1) - instant</text>
    <text x="400" y="370" textAnchor="middle" fill="#3B82F6" fontSize="10">Read: O(n) following</text>
    <rect x="540" y="40" width="240" height="350" rx="8" fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2"/>
    <text x="660" y="65" textAnchor="middle" fill="#F59E0B" fontSize="14" fontWeight="bold">Hybrid (Twitter's Approach)</text>
    <rect x="560" y="90" width="80" height="60" rx="6" fill="url(#writeGrad)"/>
    <text x="600" y="115" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Regular User</text>
    <text x="600" y="130" textAnchor="middle" fill="white" fontSize="8">&lt;10K followers</text>
    <text x="600" y="142" textAnchor="middle" fill="white" fontSize="8">Push model</text>
    <rect x="680" y="90" width="80" height="60" rx="6" fill="url(#readGrad)"/>
    <text x="720" y="115" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Celebrity</text>
    <text x="720" y="130" textAnchor="middle" fill="white" fontSize="8">&gt;1M followers</text>
    <text x="720" y="142" textAnchor="middle" fill="white" fontSize="8">Pull model</text>
    <path d="M600 150 L600 180" stroke="#10B981" strokeWidth="2" fill="none"/>
    <path d="M720 150 L720 180" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    <rect x="560" y="185" width="80" height="50" rx="6" fill="#EC4899"/>
    <text x="600" y="207" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Pre-computed</text>
    <text x="600" y="222" textAnchor="middle" fill="white" fontSize="9">Timeline Cache</text>
    <rect x="680" y="185" width="80" height="50" rx="6" fill="#EF4444"/>
    <text x="720" y="207" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Celebrity</text>
    <text x="720" y="222" textAnchor="middle" fill="white" fontSize="9">Tweets Store</text>
    <path d="M600 235 L660 270" stroke="#F59E0B" strokeWidth="2" fill="none"/>
    <path d="M720 235 L660 270" stroke="#F59E0B" strokeWidth="2" fill="none"/>
    <rect x="600" y="275" width="120" height="40" rx="6" fill="url(#hybridGrad)"/>
    <text x="660" y="293" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Merge at</text>
    <text x="660" y="307" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Read Time</text>
    <path d="M660 315 L660 340" stroke="#F59E0B" strokeWidth="2" fill="none"/>
    <polygon points="660,345 655,335 665,335" fill="#F59E0B"/>
    <rect x="600" y="350" width="120" height="30" rx="6" fill="#6366F1"/>
    <text x="660" y="370" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">User Timeline</text>
  </svg>
);

const SocialGraphDiagram = () => (
  <svg viewBox="0 0 800 380" className="w-full h-auto" style={{ maxHeight: '380px' }}>
    <defs>
      <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="celebGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <rect width="800" height="380" fill="#1F2937" rx="10"/>
    <text x="400" y="25" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="bold">Social Graph Structure (Follower/Following)</text>
    <rect x="20" y="40" width="380" height="320" rx="8" fill="#111827" stroke="#374151" strokeWidth="2"/>
    <text x="210" y="65" textAnchor="middle" fill="#60A5FA" fontSize="14" fontWeight="bold">Follow Graph Visualization</text>
    <circle cx="210" cy="160" r="40" fill="url(#celebGrad)" stroke="#F59E0B" strokeWidth="3"/>
    <text x="210" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Celebrity</text>
    <text x="210" y="172" textAnchor="middle" fill="white" fontSize="10">@elonmusk</text>
    <circle cx="80" cy="100" r="25" fill="url(#userGrad)"/>
    <text x="80" y="105" textAnchor="middle" fill="white" fontSize="9">User A</text>
    <circle cx="80" cy="180" r="25" fill="url(#userGrad)"/>
    <text x="80" y="185" textAnchor="middle" fill="white" fontSize="9">User B</text>
    <circle cx="80" cy="260" r="25" fill="url(#userGrad)"/>
    <text x="80" y="265" textAnchor="middle" fill="white" fontSize="9">User C</text>
    <circle cx="340" cy="100" r="25" fill="url(#userGrad)"/>
    <text x="340" y="105" textAnchor="middle" fill="white" fontSize="9">User D</text>
    <circle cx="340" cy="180" r="25" fill="url(#userGrad)"/>
    <text x="340" y="185" textAnchor="middle" fill="white" fontSize="9">User E</text>
    <circle cx="340" cy="260" r="25" fill="url(#userGrad)"/>
    <text x="340" y="265" textAnchor="middle" fill="white" fontSize="9">User F</text>
    <circle cx="210" cy="300" r="20" fill="#6B7280"/>
    <text x="210" y="305" textAnchor="middle" fill="white" fontSize="9">...</text>
    <path d="M105 100 L170 140" stroke="#10B981" strokeWidth="2" fill="none"/>
    <polygon points="170,140 158,138 164,148" fill="#10B981"/>
    <path d="M105 180 L170 165" stroke="#10B981" strokeWidth="2" fill="none"/>
    <polygon points="170,165 158,167 162,157" fill="#10B981"/>
    <path d="M105 260 L175 190" stroke="#10B981" strokeWidth="2" fill="none"/>
    <polygon points="175,190 163,192 167,182" fill="#10B981"/>
    <path d="M315 100 L250 140" stroke="#10B981" strokeWidth="2" fill="none"/>
    <polygon points="250,140 252,128 262,134" fill="#10B981"/>
    <path d="M315 180 L250 165" stroke="#10B981" strokeWidth="2" fill="none"/>
    <polygon points="250,165 252,153 262,157" fill="#10B981"/>
    <path d="M315 260 L245 190" stroke="#10B981" strokeWidth="2" fill="none"/>
    <polygon points="245,190 247,178 257,184" fill="#10B981"/>
    <text x="210" y="340" textAnchor="middle" fill="#10B981" fontSize="10">Arrows = "follows" relationship</text>
    <rect x="420" y="40" width="360" height="320" rx="8" fill="#111827" stroke="#374151" strokeWidth="2"/>
    <text x="600" y="65" textAnchor="middle" fill="#60A5FA" fontSize="14" fontWeight="bold">Graph Storage Strategies</text>
    <rect x="440" y="85" width="320" height="90" rx="6" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="1"/>
    <text x="600" y="105" textAnchor="middle" fill="#A78BFA" fontSize="12" fontWeight="bold">Option 1: Redis Sets (Adjacency List)</text>
    <rect x="455" y="115" width="145" height="50" rx="4" fill="#EC4899"/>
    <text x="527" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">followers:elonmusk</text>
    <text x="527" y="155" textAnchor="middle" fill="white" fontSize="8">[userA, userB, userC, ...]</text>
    <rect x="610" y="115" width="145" height="50" rx="4" fill="#3B82F6"/>
    <text x="682" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">following:userA</text>
    <text x="682" y="155" textAnchor="middle" fill="white" fontSize="8">[elonmusk, userB, ...]</text>
    <rect x="440" y="185" width="320" height="80" rx="6" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1"/>
    <text x="600" y="205" textAnchor="middle" fill="#6EE7B7" fontSize="12" fontWeight="bold">Option 2: Graph Database (Neo4j)</text>
    <text x="600" y="230" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="monospace">(UserA)-[:FOLLOWS]-&gt;(Celebrity)</text>
    <text x="600" y="250" textAnchor="middle" fill="#9CA3AF" fontSize="10">Native graph queries, efficient traversal</text>
    <rect x="440" y="275" width="320" height="75" rx="6" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1"/>
    <text x="600" y="295" textAnchor="middle" fill="#FCD34D" fontSize="12" fontWeight="bold">Option 3: MySQL (Follow Table)</text>
    <text x="600" y="320" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="monospace">| follower_id | following_id | created_at |</text>
    <text x="600" y="340" textAnchor="middle" fill="#9CA3AF" fontSize="9">Indexed on both columns for efficient lookups</text>
  </svg>
);

const TrendsDetectionDiagram = () => (
  <svg viewBox="0 0 800 380" className="w-full h-auto" style={{ maxHeight: '380px' }}>
    <defs>
      <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="hotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#F97316" />
      </linearGradient>
    </defs>
    <rect width="800" height="380" fill="#1F2937" rx="10"/>
    <text x="400" y="25" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="bold">Real-time Trending Topics Detection</text>
    <rect x="30" y="50" width="740" height="60" rx="8" fill="url(#streamGrad)" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#60A5FA" fontSize="14" fontWeight="bold">Incoming Tweet Stream (500M tweets/day)</text>
    <text x="400" y="95" textAnchor="middle" fill="#9CA3AF" fontSize="11">#bitcoin #AI #SuperBowl #ElonMusk #OpenAI #Tesla #crypto #ChatGPT ...</text>
    <rect x="60" y="130" width="100" height="50" rx="6" fill="#6366F1"/>
    <text x="110" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Kafka</text>
    <text x="110" y="170" textAnchor="middle" fill="white" fontSize="9">Tweet Events</text>
    <path d="M160 155 L200 155" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <polygon points="205,155 195,150 195,160" fill="#60A5FA"/>
    <rect x="210" y="130" width="130" height="50" rx="6" fill="#10B981"/>
    <text x="275" y="152" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Stream Processor</text>
    <text x="275" y="167" textAnchor="middle" fill="white" fontSize="9">(Flink/Spark)</text>
    <path d="M340 155 L380 155" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <polygon points="385,155 375,150 375,160" fill="#60A5FA"/>
    <rect x="390" y="130" width="130" height="50" rx="6" fill="#F59E0B"/>
    <text x="455" y="152" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Hashtag Extractor</text>
    <text x="455" y="167" textAnchor="middle" fill="white" fontSize="9">Parse & Normalize</text>
    <path d="M520 155 L560 155" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <polygon points="565,155 555,150 555,160" fill="#60A5FA"/>
    <rect x="570" y="130" width="100" height="50" rx="6" fill="#EC4899"/>
    <text x="620" y="152" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Count-Min</text>
    <text x="620" y="167" textAnchor="middle" fill="white" fontSize="9">Sketch</text>
    <path d="M670 155 L710 155" stroke="#60A5FA" strokeWidth="2" fill="none"/>
    <polygon points="715,155 705,150 705,160" fill="#60A5FA"/>
    <rect x="720" y="130" width="60" height="50" rx="6" fill="#EF4444"/>
    <text x="750" y="160" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Redis</text>
    <rect x="30" y="200" width="350" height="160" rx="8" fill="#111827" stroke="#374151" strokeWidth="2"/>
    <text x="205" y="225" textAnchor="middle" fill="#60A5FA" fontSize="13" fontWeight="bold">Sliding Window Algorithm</text>
    <rect x="50" y="245" width="60" height="30" rx="4" fill="#3B82F6" fillOpacity="0.5" stroke="#3B82F6"/>
    <text x="80" y="265" textAnchor="middle" fill="white" fontSize="9">T-4h</text>
    <rect x="115" y="245" width="60" height="30" rx="4" fill="#3B82F6" fillOpacity="0.6" stroke="#3B82F6"/>
    <text x="145" y="265" textAnchor="middle" fill="white" fontSize="9">T-3h</text>
    <rect x="180" y="245" width="60" height="30" rx="4" fill="#3B82F6" fillOpacity="0.7" stroke="#3B82F6"/>
    <text x="210" y="265" textAnchor="middle" fill="white" fontSize="9">T-2h</text>
    <rect x="245" y="245" width="60" height="30" rx="4" fill="#3B82F6" fillOpacity="0.85" stroke="#3B82F6"/>
    <text x="275" y="265" textAnchor="middle" fill="white" fontSize="9">T-1h</text>
    <rect x="310" y="245" width="60" height="30" rx="4" fill="#3B82F6" stroke="#3B82F6" strokeWidth="2"/>
    <text x="340" y="265" textAnchor="middle" fill="white" fontSize="9">Now</text>
    <text x="205" y="300" textAnchor="middle" fill="#9CA3AF" fontSize="10">Weighted counts: Recent hours count more</text>
    <text x="205" y="320" textAnchor="middle" fill="#9CA3AF" fontSize="10">Detect velocity: # mentions / time window</text>
    <text x="205" y="340" textAnchor="middle" fill="#9CA3AF" fontSize="10">Filter spam: Min unique users threshold</text>
    <rect x="400" y="200" width="380" height="160" rx="8" fill="#111827" stroke="#374151" strokeWidth="2"/>
    <text x="590" y="225" textAnchor="middle" fill="#60A5FA" fontSize="13" fontWeight="bold">Trending Topics Output</text>
    <g>
      <rect x="420" y="245" width="340" height="28" rx="4" fill="url(#hotGrad)"/>
      <text x="440" y="264" fill="white" fontSize="11" fontWeight="bold">1. #SuperBowl</text>
      <text x="720" y="264" textAnchor="end" fill="white" fontSize="10">2.5M tweets</text>
    </g>
    <g>
      <rect x="420" y="278" width="340" height="28" rx="4" fill="#F59E0B"/>
      <text x="440" y="297" fill="white" fontSize="11" fontWeight="bold">2. #Bitcoin</text>
      <text x="720" y="297" textAnchor="end" fill="white" fontSize="10">1.8M tweets</text>
    </g>
    <g>
      <rect x="420" y="311" width="340" height="28" rx="4" fill="#EAB308"/>
      <text x="440" y="330" fill="white" fontSize="11" fontWeight="bold">3. #ChatGPT</text>
      <text x="720" y="330" textAnchor="end" fill="white" fontSize="10">1.2M tweets</text>
    </g>
    <text x="590" y="355" textAnchor="middle" fill="#10B981" fontSize="10">Updated every 5 minutes, cached by region</text>
  </svg>
);

const DatabaseSchemaDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <rect width="800" height="300" fill="#1F2937" rx="10"/>
    <text x="400" y="25" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="bold">Core Database Tables</text>
    <rect x="30" y="50" width="220" height="120" rx="8" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="#60A5FA" fontSize="13" fontWeight="bold">Users Table</text>
    <text x="50" y="100" fill="#9CA3AF" fontSize="10" fontFamily="monospace">id (PK, bigint)</text>
    <text x="50" y="118" fill="#9CA3AF" fontSize="10" fontFamily="monospace">username (varchar, unique)</text>
    <text x="50" y="136" fill="#9CA3AF" fontSize="10" fontFamily="monospace">email (varchar)</text>
    <text x="50" y="154" fill="#9CA3AF" fontSize="10" fontFamily="monospace">created_at (timestamp)</text>
    <rect x="290" y="50" width="220" height="140" rx="8" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#6EE7B7" fontSize="13" fontWeight="bold">Tweets Table</text>
    <text x="310" y="100" fill="#9CA3AF" fontSize="10" fontFamily="monospace">id (PK, bigint)</text>
    <text x="310" y="118" fill="#9CA3AF" fontSize="10" fontFamily="monospace">user_id (FK, bigint)</text>
    <text x="310" y="136" fill="#9CA3AF" fontSize="10" fontFamily="monospace">content (varchar 280)</text>
    <text x="310" y="154" fill="#9CA3AF" fontSize="10" fontFamily="monospace">created_at (timestamp)</text>
    <text x="310" y="172" fill="#9CA3AF" fontSize="10" fontFamily="monospace">reply_to_id (FK, nullable)</text>
    <rect x="550" y="50" width="220" height="120" rx="8" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2"/>
    <text x="660" y="75" textAnchor="middle" fill="#FCD34D" fontSize="13" fontWeight="bold">Follows Table</text>
    <text x="570" y="100" fill="#9CA3AF" fontSize="10" fontFamily="monospace">follower_id (FK, bigint)</text>
    <text x="570" y="118" fill="#9CA3AF" fontSize="10" fontFamily="monospace">following_id (FK, bigint)</text>
    <text x="570" y="136" fill="#9CA3AF" fontSize="10" fontFamily="monospace">created_at (timestamp)</text>
    <text x="570" y="154" fill="#9CA3AF" fontSize="10" fontFamily="monospace">PK: (follower_id, following_id)</text>
    <rect x="160" y="200" width="220" height="80" rx="8" fill="#EC4899" fillOpacity="0.2" stroke="#EC4899" strokeWidth="2"/>
    <text x="270" y="225" textAnchor="middle" fill="#F472B6" fontSize="13" fontWeight="bold">Likes Table</text>
    <text x="180" y="250" fill="#9CA3AF" fontSize="10" fontFamily="monospace">user_id (FK), tweet_id (FK)</text>
    <text x="180" y="268" fill="#9CA3AF" fontSize="10" fontFamily="monospace">created_at (timestamp)</text>
    <rect x="420" y="200" width="220" height="80" rx="8" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="2"/>
    <text x="530" y="225" textAnchor="middle" fill="#A78BFA" fontSize="13" fontWeight="bold">Retweets Table</text>
    <text x="440" y="250" fill="#9CA3AF" fontSize="10" fontFamily="monospace">user_id (FK), tweet_id (FK)</text>
    <text x="440" y="268" fill="#9CA3AF" fontSize="10" fontFamily="monospace">created_at (timestamp)</text>
  </svg>
);

const CachingStrategyDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="cacheArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60A5FA" />
      </marker>
    </defs>
    <rect width="800" height="280" fill="#1F2937" rx="10"/>
    <text x="400" y="25" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="bold">Multi-Layer Caching Strategy</text>
    <rect x="50" y="60" width="140" height="70" rx="8" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
    <text x="120" y="90" textAnchor="middle" fill="#60A5FA" fontSize="12" fontWeight="bold">Client</text>
    <text x="120" y="110" textAnchor="middle" fill="#9CA3AF" fontSize="10">Browser Cache</text>
    <line x1="190" y1="95" x2="250" y2="95" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#cacheArrow)"/>
    <rect x="260" y="60" width="140" height="70" rx="8" fill="#8B5CF6" fillOpacity="0.3" stroke="#8B5CF6" strokeWidth="2"/>
    <text x="330" y="90" textAnchor="middle" fill="#A78BFA" fontSize="12" fontWeight="bold">CDN</text>
    <text x="330" y="110" textAnchor="middle" fill="#9CA3AF" fontSize="10">Edge Cache</text>
    <line x1="400" y1="95" x2="460" y2="95" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#cacheArrow)"/>
    <rect x="470" y="60" width="140" height="70" rx="8" fill="#EC4899" fillOpacity="0.3" stroke="#EC4899" strokeWidth="2"/>
    <text x="540" y="90" textAnchor="middle" fill="#F472B6" fontSize="12" fontWeight="bold">Redis</text>
    <text x="540" y="110" textAnchor="middle" fill="#9CA3AF" fontSize="10">Timeline Cache</text>
    <line x1="610" y1="95" x2="670" y2="95" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#cacheArrow)"/>
    <rect x="680" y="60" width="100" height="70" rx="8" fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" strokeWidth="2"/>
    <text x="730" y="90" textAnchor="middle" fill="#F87171" fontSize="12" fontWeight="bold">MySQL</text>
    <text x="730" y="110" textAnchor="middle" fill="#9CA3AF" fontSize="10">Source</text>
    <rect x="50" y="160" width="700" height="100" rx="8" fill="#111827" stroke="#374151" strokeWidth="2"/>
    <text x="400" y="185" textAnchor="middle" fill="#60A5FA" fontSize="13" fontWeight="bold">Redis Cache Structure</text>
    <text x="100" y="210" fill="#10B981" fontSize="10" fontWeight="bold">timeline:{'{userId}'}</text>
    <text x="100" y="228" fill="#9CA3AF" fontSize="9">Sorted Set: tweet_ids by timestamp</text>
    <text x="300" y="210" fill="#F59E0B" fontSize="10" fontWeight="bold">user:{'{userId}'}</text>
    <text x="300" y="228" fill="#9CA3AF" fontSize="9">Hash: profile data, counts</text>
    <text x="480" y="210" fill="#EC4899" fontSize="10" fontWeight="bold">tweet:{'{tweetId}'}</text>
    <text x="480" y="228" fill="#9CA3AF" fontSize="9">Hash: tweet content, metrics</text>
    <text x="660" y="210" fill="#8B5CF6" fontSize="10" fontWeight="bold">trends:{'{region}'}</text>
    <text x="660" y="228" fill="#9CA3AF" fontSize="9">Sorted Set: hashtags by count</text>
  </svg>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Twitter({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null);
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0);

  const concepts = [
    {
      id: 'requirements',
      name: 'System Requirements',
      icon: '📋',
      color: '#3b82f6',
      description: 'Functional and non-functional requirements for building a Twitter-scale social platform.',
      diagram: TwitterArchitectureDiagram,
      details: [
        {
          name: 'Functional Requirements',
          explanation: 'Core features that Twitter must support: Post tweets (280 chars with media), Follow/unfollow users to build social graph, View home timeline (tweets from followed users), Engagement features (like, retweet, reply, quote), Search for tweets, users, and hashtags, Trending topics (global and local), Real-time notifications (mentions, likes, follows), Direct messaging between users.',
          codeExample: `// Core Twitter API endpoints
public interface TwitterAPI {
    // Tweet operations
    Tweet postTweet(String userId, String content, List<Media> media);
    void deleteTweet(String userId, String tweetId);
    Tweet getTweet(String tweetId);

    // Timeline operations
    List<Tweet> getHomeTimeline(String userId, String cursor, int limit);
    List<Tweet> getUserTimeline(String userId, String cursor, int limit);

    // Social operations
    void follow(String userId, String targetUserId);
    void unfollow(String userId, String targetUserId);
    List<User> getFollowers(String userId, String cursor, int limit);
    List<User> getFollowing(String userId, String cursor, int limit);

    // Engagement
    void likeTweet(String userId, String tweetId);
    void retweet(String userId, String tweetId);
    Tweet reply(String userId, String tweetId, String content);
}`
        },
        {
          name: 'Non-Functional Requirements',
          explanation: 'Performance and reliability targets: High availability (99.99% uptime), Low latency (timeline load <200ms, tweet post <100ms), Eventual consistency acceptable for timelines, Strong consistency for writes (tweet creation, follows), Scalability to handle 500M tweets/day and 600K timeline reads/sec, Real-time delivery (tweets appear within seconds), Fault tolerance with graceful degradation.',
          codeExample: `// Performance SLA Configuration
public class TwitterSLA {
    // Latency targets
    public static final int TIMELINE_READ_P99_MS = 200;
    public static final int TWEET_POST_P99_MS = 100;
    public static final int SEARCH_P99_MS = 500;

    // Availability target
    public static final double AVAILABILITY_TARGET = 0.9999; // 99.99%

    // Throughput requirements
    public static final long TWEETS_PER_DAY = 500_000_000L;
    public static final long TWEETS_PER_SECOND_AVG = 6_000L;
    public static final long TWEETS_PER_SECOND_PEAK = 18_000L;
    public static final long TIMELINE_READS_PER_SECOND = 600_000L;

    // Consistency model
    public enum ConsistencyLevel {
        STRONG,    // For writes (tweets, follows)
        EVENTUAL   // For reads (timelines, counts)
    }
}`
        },
        {
          name: 'Scale Estimates',
          explanation: 'Capacity planning calculations: 350M+ monthly active users, 200M+ daily active users, 500M+ tweets per day (~6K tweets/sec average, 18K peak), 100:1 read-to-write ratio means 600K timeline reads/sec, Average tweet size ~300 bytes (text + metadata), Daily storage ~150GB for tweets only, 5-year storage with media ~100TB, Timeline cache stores last 800 tweets per user.',
          codeExample: `// Capacity Planning Calculator
public class CapacityPlanner {
    // User metrics
    private static final long MONTHLY_ACTIVE_USERS = 350_000_000L;
    private static final long DAILY_ACTIVE_USERS = 200_000_000L;

    // Tweet metrics
    private static final long TWEETS_PER_DAY = 500_000_000L;
    private static final int AVG_TWEET_SIZE_BYTES = 300;

    public long calculateDailyStorageGB() {
        return (TWEETS_PER_DAY * AVG_TWEET_SIZE_BYTES) / (1024 * 1024 * 1024);
        // Result: ~150 GB/day for tweets
    }

    public long calculateTimelineReadsPerSecond() {
        // 100:1 read-to-write ratio
        long tweetsPerSecond = TWEETS_PER_DAY / 86400;
        return tweetsPerSecond * 100;
        // Result: ~600,000 reads/second
    }

    public long calculateRedisMemoryGB() {
        // 800 tweet IDs per user, 8 bytes per ID
        long activeUserTimelines = DAILY_ACTIVE_USERS;
        long bytesPerTimeline = 800 * 8;
        return (activeUserTimelines * bytesPerTimeline) / (1024 * 1024 * 1024);
        // Result: ~1.2 TB for timeline cache
    }
}`
        }
      ]
    },
    {
      id: 'architecture',
      name: 'System Architecture',
      icon: '🏗️',
      color: '#8b5cf6',
      description: 'Microservices architecture with dedicated services for tweets, timelines, users, and search.',
      diagram: TwitterArchitectureDiagram,
      details: [
        {
          name: 'High-Level Architecture',
          diagram: TwitterArchitectureDiagram,
          explanation: 'Twitter uses a microservices architecture: Clients (Web, iOS, Android) connect through CDN (CloudFlare) for static assets. Load balancers (Nginx) distribute traffic across API Gateway instances. API Gateway handles authentication, rate limiting, and routing. Core microservices: Tweet Service, User Service, Timeline Service, Follow Service, Search Service, Notification Service. Each service has its own database and communicates via Kafka for async operations.',
          codeExample: `// API Gateway routing configuration
@Configuration
public class ApiGatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("tweets", r -> r
                .path("/api/v2/tweets/**")
                .filters(f -> f
                    .addRequestHeader("X-Request-Id", UUID.randomUUID().toString())
                    .circuitBreaker(c -> c.setName("tweetService")))
                .uri("lb://tweet-service"))
            .route("timeline", r -> r
                .path("/api/v2/users/*/timeline")
                .filters(f -> f.requestRateLimiter(c -> c.setRateLimiter(redisRateLimiter())))
                .uri("lb://timeline-service"))
            .route("users", r -> r
                .path("/api/v2/users/**")
                .uri("lb://user-service"))
            .route("search", r -> r
                .path("/api/v2/search/**")
                .uri("lb://search-service"))
            .build();
    }
}`
        },
        {
          name: 'Core Microservices',
          explanation: 'Tweet Service: CRUD operations for tweets, stores in MySQL (sharded by tweet ID), publishes to Kafka. User Service: Profile management, authentication (OAuth 2.0), follower/following counts. Timeline Service: Generates home timelines using fan-out strategy, reads from Redis cache. Follow Service: Manages social graph, stores in Graph DB or Redis adjacency lists. Search Service: Elasticsearch indexing for full-text search on tweets and users. Notification Service: Push notifications via APNs/FCM, WebSockets for real-time.',
          codeExample: `// Tweet Service implementation
@Service
public class TweetService {
    private final TweetRepository tweetRepository;
    private final KafkaTemplate<String, TweetEvent> kafkaTemplate;
    private final RedisTemplate<String, Tweet> redisTemplate;

    @Transactional
    public Tweet createTweet(String userId, CreateTweetRequest request) {
        // 1. Validate content (280 char limit, media types)
        validateTweetContent(request);

        // 2. Create tweet entity
        Tweet tweet = Tweet.builder()
            .id(snowflakeIdGenerator.nextId())
            .userId(userId)
            .content(request.getContent())
            .mediaIds(request.getMediaIds())
            .createdAt(Instant.now())
            .build();

        // 3. Persist to MySQL (sharded by user_id)
        tweetRepository.save(tweet);

        // 4. Cache the tweet
        redisTemplate.opsForValue().set(
            "tweet:" + tweet.getId(), tweet, Duration.ofHours(24));

        // 5. Publish event for fan-out
        kafkaTemplate.send("tweet-created",
            new TweetEvent(tweet.getId(), userId, TweetEventType.CREATED));

        return tweet;
    }
}`
        },
        {
          name: 'Message Queue (Kafka)',
          explanation: 'Kafka serves as the backbone for async communication: tweet-created topic triggers fan-out to followers timelines, search indexing, and analytics. user-followed topic updates social graph caches. notification-events topic for push notification delivery. Topics are partitioned by user_id for ordering guarantees. Consumer groups handle different processing (timeline-fanout-group, search-index-group, analytics-group). At-least-once delivery with idempotent consumers.',
          codeExample: `// Kafka configuration and consumers
@Configuration
public class KafkaConfig {
    @Bean
    public Map<String, Object> consumerConfigs() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092");
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "timeline-fanout-group");
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
        return props;
    }
}

@Service
public class FanOutConsumer {
    @KafkaListener(topics = "tweet-created", groupId = "timeline-fanout-group")
    public void handleTweetCreated(TweetEvent event) {
        String userId = event.getUserId();
        String tweetId = event.getTweetId();

        // Get follower list (paginated for large accounts)
        List<String> followers = followService.getFollowerIds(userId);

        // Fan-out to each follower's timeline cache
        for (String followerId : followers) {
            redisTemplate.opsForZSet().add(
                "timeline:" + followerId,
                tweetId,
                event.getTimestamp()
            );
            // Trim to keep only last 800 tweets
            redisTemplate.opsForZSet().removeRange(
                "timeline:" + followerId, 0, -801);
        }
    }
}`
        }
      ]
    },
    {
      id: 'timeline',
      name: 'Timeline Generation',
      icon: '📰',
      color: '#10b981',
      description: 'Hybrid fan-out strategy combining push for regular users and pull for celebrities.',
      diagram: FanOutDiagram,
      details: [
        {
          name: 'Fan-out on Write (Push)',
          diagram: FanOutDiagram,
          explanation: 'When a user posts a tweet, it is pushed to all followers timeline caches immediately. Process: User posts tweet -> Store in DB -> Publish to Kafka -> Fan-out workers consume event -> Query followers from graph DB -> Push tweet ID to each followers Redis timeline cache (ZADD). Complexity: Write O(n) where n = follower count, Read O(1). Best for: Users with <10K followers. Pros: Instant timeline reads. Cons: Expensive for celebrities.',
          codeExample: `// Fan-out on Write implementation
@Service
public class FanOutService {
    private final RedisTemplate<String, String> redis;
    private final FollowService followService;

    public void fanOutTweet(String tweetId, String authorId, long timestamp) {
        // Skip fan-out for celebrities (>1M followers)
        long followerCount = followService.getFollowerCount(authorId);
        if (followerCount > 1_000_000) {
            return; // Use pull model instead
        }

        // Get all followers (paginated for large accounts)
        Pageable pageable = PageRequest.of(0, 1000);
        Page<String> followers;

        do {
            followers = followService.getFollowerIds(authorId, pageable);

            // Batch write to Redis pipelines for efficiency
            redis.executePipelined((RedisCallback<Object>) connection -> {
                for (String followerId : followers.getContent()) {
                    byte[] key = ("timeline:" + followerId).getBytes();
                    connection.zAdd(key, timestamp, tweetId.getBytes());
                    // Trim old tweets (keep last 800)
                    connection.zRemRangeByRank(key, 0, -801);
                }
                return null;
            });

            pageable = pageable.next();
        } while (followers.hasNext());
    }
}`
        },
        {
          name: 'Fan-out on Read (Pull)',
          explanation: 'When a user requests their timeline, tweets are fetched on-demand from followed users. Process: User requests timeline -> Timeline service gets list of following -> Query recent tweets from each followed user -> Merge and sort by timestamp -> Return top N tweets. Complexity: Write O(1), Read O(n) where n = following count. Best for: Reading celebrity tweets. Pros: Fast tweet posting. Cons: Slower timeline reads.',
          codeExample: `// Fan-out on Read implementation
@Service
public class PullTimelineService {
    private final FollowService followService;
    private final TweetService tweetService;

    public List<Tweet> getTimeline(String userId, int limit) {
        // Get list of users this person follows
        List<String> following = followService.getFollowingIds(userId);

        // Fetch recent tweets from each followed user in parallel
        List<CompletableFuture<List<Tweet>>> futures = following.stream()
            .map(followedId -> CompletableFuture.supplyAsync(() ->
                tweetService.getRecentTweets(followedId, 20)))
            .collect(Collectors.toList());

        // Collect all tweets
        List<Tweet> allTweets = futures.stream()
            .map(CompletableFuture::join)
            .flatMap(List::stream)
            .collect(Collectors.toList());

        // Merge sort by timestamp (descending)
        return allTweets.stream()
            .sorted(Comparator.comparing(Tweet::getCreatedAt).reversed())
            .limit(limit)
            .collect(Collectors.toList());
    }
}`
        },
        {
          name: 'Hybrid Approach (Twitter)',
          explanation: 'Twitter combines both strategies based on user type. Regular users (<10K followers): Use push model - tweets are fanned out to follower caches. Celebrities (>1M followers): Use pull model - tweets stored separately, merged at read time. Timeline generation: 1) Fetch pre-computed timeline from Redis, 2) Identify followed celebrities, 3) Fetch their recent tweets, 4) Merge and sort, 5) Return results. Cache stores last 800 tweet IDs per user with 7-day TTL.',
          codeExample: `// Hybrid Timeline Service
@Service
public class HybridTimelineService {
    private final RedisTemplate<String, String> redis;
    private final TweetService tweetService;
    private final FollowService followService;

    public List<Tweet> getHomeTimeline(String userId, int limit) {
        // 1. Get pre-computed timeline (regular user tweets)
        Set<String> cachedTweetIds = redis.opsForZSet()
            .reverseRange("timeline:" + userId, 0, limit - 1);

        // 2. Find followed celebrities
        List<String> followedCelebrities = followService.getFollowing(userId)
            .stream()
            .filter(u -> u.getFollowerCount() > 1_000_000)
            .map(User::getId)
            .collect(Collectors.toList());

        // 3. Fetch celebrity tweets (pull model)
        List<Tweet> celebrityTweets = followedCelebrities.stream()
            .flatMap(celeb -> tweetService.getRecentTweets(celeb, 10).stream())
            .collect(Collectors.toList());

        // 4. Fetch cached tweets
        List<Tweet> cachedTweets = tweetService.getTweetsByIds(cachedTweetIds);

        // 5. Merge and sort
        List<Tweet> merged = new ArrayList<>();
        merged.addAll(cachedTweets);
        merged.addAll(celebrityTweets);

        return merged.stream()
            .sorted(Comparator.comparing(Tweet::getCreatedAt).reversed())
            .limit(limit)
            .collect(Collectors.toList());
    }
}`
        }
      ]
    },
    {
      id: 'social-graph',
      name: 'Social Graph',
      icon: '🔗',
      color: '#f59e0b',
      description: 'Managing follower/following relationships at scale with graph databases and Redis.',
      diagram: SocialGraphDiagram,
      details: [
        {
          name: 'Graph Structure',
          diagram: SocialGraphDiagram,
          explanation: 'The social graph represents follower/following relationships. Nodes are users, edges are "follows" relationships (directed). Key operations: Get followers of a user, Get users that a user follows, Check if user A follows user B, Get mutual followers (intersection). At Twitter scale: billions of edges, must support fast lookups and efficient traversal.',
          codeExample: `// Follow relationship operations
@Service
public class FollowService {
    private final FollowRepository followRepository;
    private final RedisTemplate<String, String> redis;

    @Transactional
    public void follow(String followerId, String followingId) {
        // 1. Validate users exist and not already following
        if (isFollowing(followerId, followingId)) {
            throw new AlreadyFollowingException();
        }

        // 2. Create follow relationship
        Follow follow = new Follow(followerId, followingId, Instant.now());
        followRepository.save(follow);

        // 3. Update Redis adjacency lists
        redis.opsForSet().add("following:" + followerId, followingId);
        redis.opsForSet().add("followers:" + followingId, followerId);

        // 4. Update counts (async)
        redis.opsForHash().increment("user:" + followerId, "following_count", 1);
        redis.opsForHash().increment("user:" + followingId, "follower_count", 1);
    }

    public boolean isFollowing(String followerId, String followingId) {
        // Check Redis first (fast path)
        Boolean isMember = redis.opsForSet()
            .isMember("following:" + followerId, followingId);
        if (isMember != null) return isMember;

        // Fall back to database
        return followRepository.existsByFollowerIdAndFollowingId(
            followerId, followingId);
    }
}`
        },
        {
          name: 'Storage Options',
          explanation: 'Option 1: Redis Sets - Store followers:userId and following:userId as sets. O(1) add/remove/check, O(n) to get all. Good for hot data. Option 2: Graph Database (Neo4j) - Native graph storage with Cypher queries. Efficient for traversals (friends of friends). Option 3: MySQL - Follow table with follower_id, following_id, created_at. Indexed on both columns. Twitter uses combination: Redis for hot data/counts, MySQL for persistence.',
          codeExample: `// Graph Database (Neo4j) option
@Repository
public class Neo4jFollowRepository {
    private final Driver driver;

    public void createFollow(String followerId, String followingId) {
        try (Session session = driver.session()) {
            session.writeTransaction(tx -> {
                tx.run("""
                    MATCH (follower:User {id: $followerId})
                    MATCH (following:User {id: $followingId})
                    CREATE (follower)-[:FOLLOWS {createdAt: datetime()}]->(following)
                    """,
                    Map.of("followerId", followerId, "followingId", followingId));
                return null;
            });
        }
    }

    public List<String> getFollowers(String userId, int limit) {
        try (Session session = driver.session()) {
            return session.readTransaction(tx -> {
                Result result = tx.run("""
                    MATCH (follower:User)-[:FOLLOWS]->(user:User {id: $userId})
                    RETURN follower.id
                    ORDER BY follower.followerCount DESC
                    LIMIT $limit
                    """,
                    Map.of("userId", userId, "limit", limit));
                return result.list(r -> r.get("follower.id").asString());
            });
        }
    }

    // Find mutual followers (friends of friends)
    public List<String> getMutualFollowers(String userId1, String userId2) {
        // Cypher makes this query elegant
        // ... MATCH (u1)<-[:FOLLOWS]-(mutual)-[:FOLLOWS]->(u2) ...
    }
}`
        },
        {
          name: 'Sharding Strategy',
          explanation: 'The follow relationship must be sharded for scale. Challenge: Need to efficiently query both followers AND following for any user. Solution 1: Store twice - shard followers by following_id, following by follower_id. More storage but O(1) lookups. Solution 2: Consistent hashing with lookup table for cross-shard queries. Twitter approach: Redis for adjacency lists (hot data), MySQL sharded by follower_id with secondary index.',
          codeExample: `// Dual-write sharding for follow relationships
@Service
public class ShardedFollowService {
    private final List<FollowShard> followerShards;  // Sharded by following_id
    private final List<FollowShard> followingShards; // Sharded by follower_id

    @Transactional
    public void follow(String followerId, String followingId) {
        // Write to both shards for efficient queries in both directions

        // Shard 1: For "get followers of X" queries
        // Sharded by following_id so all followers of X are co-located
        FollowShard followerShard = getShardByKey(followingId, followerShards);
        followerShard.insertFollower(followingId, followerId);

        // Shard 2: For "get following of X" queries
        // Sharded by follower_id so all users X follows are co-located
        FollowShard followingShard = getShardByKey(followerId, followingShards);
        followingShard.insertFollowing(followerId, followingId);
    }

    private FollowShard getShardByKey(String key, List<FollowShard> shards) {
        // Consistent hashing for even distribution
        int hash = Hashing.murmur3_32().hashString(key, UTF_8).asInt();
        int shardIndex = Math.abs(hash) % shards.size();
        return shards.get(shardIndex);
    }
}`
        }
      ]
    },
    {
      id: 'database',
      name: 'Database Design',
      icon: '🗄️',
      color: '#ef4444',
      description: 'MySQL sharding, schema design, and indexing strategies for Twitter-scale data.',
      diagram: DatabaseSchemaDiagram,
      details: [
        {
          name: 'Core Schema',
          diagram: DatabaseSchemaDiagram,
          explanation: 'Core tables: Users (id, username, email, bio, created_at), Tweets (id, user_id, content, media_ids, created_at, reply_to_id), Follows (follower_id, following_id, created_at), Likes (user_id, tweet_id, created_at), Retweets (user_id, tweet_id, created_at). IDs use Snowflake format (64-bit) for distributed generation. Timestamps enable time-range queries and ordering.',
          codeExample: `-- Core Twitter schema
CREATE TABLE users (
    id BIGINT PRIMARY KEY,           -- Snowflake ID
    username VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio VARCHAR(160),
    profile_image_url VARCHAR(500),
    follower_count INT DEFAULT 0,
    following_count INT DEFAULT 0,
    tweet_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_created_at (created_at)
);

CREATE TABLE tweets (
    id BIGINT PRIMARY KEY,           -- Snowflake ID (contains timestamp)
    user_id BIGINT NOT NULL,
    content VARCHAR(280) NOT NULL,
    media_ids JSON,                  -- Array of media IDs
    reply_to_id BIGINT,              -- NULL if not a reply
    retweet_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    reply_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_created (user_id, created_at DESC),
    INDEX idx_reply_to (reply_to_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);`
        },
        {
          name: 'Sharding Strategy',
          explanation: 'MySQL cannot handle Twitter scale on a single instance. Sharding approach: Users table: Shard by user_id using consistent hashing. Tweets table: Shard by user_id (not tweet_id) to co-locate user tweets for efficient timeline queries. Follows table: Dual sharding - by follower_id AND following_id for bidirectional lookups. Shard count: Start with 4096 virtual shards, map to physical nodes. Rebalancing: Use virtual shards for easy expansion.',
          codeExample: `// Database sharding implementation
@Service
public class ShardingService {
    private static final int VIRTUAL_SHARD_COUNT = 4096;
    private final Map<Integer, DataSource> shardMap;

    public DataSource getShardForUser(long userId) {
        // Consistent hashing for shard selection
        int virtualShard = Math.abs(
            Hashing.murmur3_32().hashLong(userId).asInt()
        ) % VIRTUAL_SHARD_COUNT;

        return shardMap.get(virtualShard);
    }

    public List<DataSource> getShardsForQuery(ShardQuery query) {
        if (query.hasUserId()) {
            // Single shard lookup
            return List.of(getShardForUser(query.getUserId()));
        }
        // Scatter-gather for cross-shard queries
        return new ArrayList<>(shardMap.values());
    }
}

// Sharded repository
@Repository
public class ShardedTweetRepository {
    private final ShardingService sharding;

    public void save(Tweet tweet) {
        DataSource shard = sharding.getShardForUser(tweet.getUserId());
        // Insert into appropriate shard
    }

    public List<Tweet> getUserTweets(long userId, int limit) {
        DataSource shard = sharding.getShardForUser(userId);
        // Query single shard - efficient!
    }
}`
        },
        {
          name: 'ID Generation (Snowflake)',
          explanation: 'Twitter uses Snowflake IDs: 64-bit integers that are time-sortable and globally unique. Structure: 1 bit sign + 41 bits timestamp (ms since epoch) + 10 bits machine ID + 12 bits sequence. Benefits: No central coordination needed, IDs are roughly time-ordered, Can extract creation timestamp from ID, 4096 IDs per millisecond per machine. Used for: tweet IDs, user IDs, DM IDs.',
          codeExample: `// Snowflake ID generator
public class SnowflakeIdGenerator {
    private static final long EPOCH = 1288834974657L; // Twitter epoch
    private static final int MACHINE_ID_BITS = 10;
    private static final int SEQUENCE_BITS = 12;

    private final long machineId;
    private long lastTimestamp = -1L;
    private long sequence = 0L;

    public SnowflakeIdGenerator(long machineId) {
        this.machineId = machineId;
    }

    public synchronized long nextId() {
        long timestamp = System.currentTimeMillis();

        if (timestamp == lastTimestamp) {
            sequence = (sequence + 1) & ((1 << SEQUENCE_BITS) - 1);
            if (sequence == 0) {
                // Wait for next millisecond
                timestamp = waitNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }

        lastTimestamp = timestamp;

        // Compose the ID
        return ((timestamp - EPOCH) << (MACHINE_ID_BITS + SEQUENCE_BITS))
             | (machineId << SEQUENCE_BITS)
             | sequence;
    }

    public static long extractTimestamp(long snowflakeId) {
        return (snowflakeId >> 22) + EPOCH;
    }
}`
        }
      ]
    },
    {
      id: 'caching',
      name: 'Caching Strategy',
      icon: '⚡',
      color: '#ec4899',
      description: 'Multi-layer caching with Redis for timelines, user data, and trending topics.',
      diagram: CachingStrategyDiagram,
      details: [
        {
          name: 'Cache Layers',
          diagram: CachingStrategyDiagram,
          explanation: 'Twitter uses multiple cache layers: 1) Client-side (browser/app cache), 2) CDN (CloudFlare) for static assets and images, 3) Redis cluster for dynamic data (timelines, user profiles, counts), 4) Application-level cache (local LRU). Cache-aside pattern: Read from cache, if miss read from DB and populate cache. Write-through for critical data (tweets), write-behind for counters.',
          codeExample: `// Multi-layer caching implementation
@Service
public class CacheService {
    private final RedisTemplate<String, Object> redis;
    private final Cache<String, Object> localCache; // Caffeine

    public <T> T get(String key, Class<T> type, Supplier<T> loader) {
        // Layer 1: Local cache (fastest, smallest)
        T value = localCache.getIfPresent(key);
        if (value != null) return value;

        // Layer 2: Redis cluster
        value = (T) redis.opsForValue().get(key);
        if (value != null) {
            localCache.put(key, value);
            return value;
        }

        // Layer 3: Database (slowest)
        value = loader.get();
        if (value != null) {
            // Populate both caches
            redis.opsForValue().set(key, value, Duration.ofHours(24));
            localCache.put(key, value);
        }

        return value;
    }

    // Write-through for tweets
    public void cacheTweet(Tweet tweet) {
        String key = "tweet:" + tweet.getId();
        redis.opsForValue().set(key, tweet, Duration.ofHours(48));
        localCache.put(key, tweet);
    }
}`
        },
        {
          name: 'Redis Data Structures',
          explanation: 'Timeline cache: Sorted Set (ZADD) with tweet IDs scored by timestamp. ZREVRANGE for retrieval, ZREMRANGEBYRANK to trim. User profile: Hash with fields (name, bio, follower_count, etc.). Trending topics: Sorted Set with hashtags scored by mention count. Sessions: String with JSON payload, TTL-based expiration. Follower lists: Sets for O(1) membership check.',
          codeExample: `// Redis data structure usage
@Service
public class RedisDataService {
    private final RedisTemplate<String, String> redis;

    // Timeline: Sorted Set
    public void addToTimeline(String userId, String tweetId, long timestamp) {
        String key = "timeline:" + userId;
        redis.opsForZSet().add(key, tweetId, timestamp);
        redis.opsForZSet().removeRange(key, 0, -801); // Keep last 800
    }

    public List<String> getTimeline(String userId, int offset, int limit) {
        String key = "timeline:" + userId;
        Set<String> ids = redis.opsForZSet()
            .reverseRange(key, offset, offset + limit - 1);
        return new ArrayList<>(ids);
    }

    // User profile: Hash
    public void cacheUserProfile(User user) {
        String key = "user:" + user.getId();
        Map<String, String> fields = Map.of(
            "username", user.getUsername(),
            "name", user.getName(),
            "bio", user.getBio(),
            "follower_count", String.valueOf(user.getFollowerCount())
        );
        redis.opsForHash().putAll(key, fields);
        redis.expire(key, Duration.ofHours(1));
    }

    // Trending: Sorted Set
    public void incrementTrend(String hashtag, String region) {
        String key = "trends:" + region;
        redis.opsForZSet().incrementScore(key, hashtag, 1);
    }
}`
        },
        {
          name: 'Cache Invalidation',
          explanation: 'Cache invalidation strategies: Time-based TTL: User profiles (1 hour), tweets (24 hours), timelines (7 days). Event-driven: Tweet deleted -> remove from author timeline, invalidate tweet cache. Follower list changes -> rebuild affected timelines. Write-through: Counters updated in cache and DB simultaneously. Versioning: Include version in cache key for schema changes.',
          codeExample: `// Cache invalidation patterns
@Service
public class CacheInvalidationService {
    private final RedisTemplate<String, Object> redis;
    private final KafkaTemplate<String, CacheEvent> kafka;

    // Event-driven invalidation via Kafka
    @KafkaListener(topics = "cache-invalidation")
    public void handleInvalidation(CacheEvent event) {
        switch (event.getType()) {
            case TWEET_DELETED -> {
                redis.delete("tweet:" + event.getTweetId());
                // Remove from author's timeline
                redis.opsForZSet().remove(
                    "timeline:" + event.getUserId(),
                    event.getTweetId()
                );
            }
            case USER_UPDATED -> {
                redis.delete("user:" + event.getUserId());
            }
            case FOLLOW_CHANGED -> {
                // Trigger timeline rebuild
                kafka.send("timeline-rebuild",
                    new TimelineRebuildEvent(event.getFollowerId()));
            }
        }
    }

    // Publish invalidation events
    public void onTweetDeleted(String tweetId, String userId) {
        kafka.send("cache-invalidation",
            CacheEvent.tweetDeleted(tweetId, userId));
    }
}`
        }
      ]
    },
    {
      id: 'search-trends',
      name: 'Search & Trends',
      icon: '🔍',
      color: '#06b6d4',
      description: 'Elasticsearch for full-text search and real-time trending topic detection.',
      diagram: TrendsDetectionDiagram,
      details: [
        {
          name: 'Search Architecture',
          explanation: 'Elasticsearch cluster for full-text search: Index tweets in near real-time via Kafka consumer. Search by content, hashtags, mentions, user. Ranking factors: relevance score, recency, engagement (likes, retweets), user authority. Index structure: Separate indices for tweets, users, hashtags. Sharding: Index per time period (rolling indices) for efficient deletion of old data.',
          codeExample: `// Elasticsearch indexing service
@Service
public class SearchIndexService {
    private final ElasticsearchClient esClient;

    // Index a tweet
    public void indexTweet(Tweet tweet) {
        TweetDocument doc = TweetDocument.builder()
            .id(tweet.getId())
            .userId(tweet.getUserId())
            .content(tweet.getContent())
            .hashtags(extractHashtags(tweet.getContent()))
            .mentions(extractMentions(tweet.getContent()))
            .likeCount(tweet.getLikeCount())
            .retweetCount(tweet.getRetweetCount())
            .createdAt(tweet.getCreatedAt())
            .build();

        // Use time-based index for efficient rotation
        String index = "tweets-" + getIndexSuffix(tweet.getCreatedAt());
        esClient.index(i -> i
            .index(index)
            .id(String.valueOf(tweet.getId()))
            .document(doc)
        );
    }

    // Search tweets
    public SearchResult searchTweets(String query, int page, int size) {
        SearchResponse<TweetDocument> response = esClient.search(s -> s
            .index("tweets-*")
            .query(q -> q
                .bool(b -> b
                    .should(sh -> sh.match(m -> m.field("content").query(query)))
                    .should(sh -> sh.term(t -> t.field("hashtags").value(query)))
                ))
            .sort(so -> so.field(f -> f.field("_score").order(SortOrder.Desc)))
            .sort(so -> so.field(f -> f.field("createdAt").order(SortOrder.Desc)))
            .from(page * size)
            .size(size),
            TweetDocument.class
        );
        return mapToSearchResult(response);
    }
}`
        },
        {
          name: 'Trending Detection',
          diagram: TrendsDetectionDiagram,
          explanation: 'Real-time trending topic detection pipeline: 1) Stream processor (Flink) consumes tweet events from Kafka, 2) Extract and normalize hashtags, 3) Count using sliding window (1-4 hours), 4) Apply velocity scoring (rapid increase = trending), 5) Filter spam (min unique users threshold), 6) Store in Redis sorted set per region, 7) Update every 5 minutes. Count-Min Sketch for memory-efficient counting.',
          codeExample: `// Trending topics detection with Flink
public class TrendingJob {
    public static void main(String[] args) {
        StreamExecutionEnvironment env =
            StreamExecutionEnvironment.getExecutionEnvironment();

        // Consume from Kafka
        DataStream<Tweet> tweets = env
            .addSource(new FlinkKafkaConsumer<>("tweets",
                new TweetSchema(), kafkaProps));

        // Extract hashtags and count in sliding window
        DataStream<HashtagCount> trends = tweets
            .flatMap(new HashtagExtractor())
            .keyBy(hashtag -> hashtag.getTag())
            .window(SlidingEventTimeWindows.of(
                Time.hours(1), Time.minutes(5)))
            .aggregate(new CountAggregator())
            .filter(count -> count.getUniqueUsers() > 100); // Spam filter

        // Calculate velocity (rate of change)
        DataStream<TrendingTopic> trending = trends
            .keyBy(HashtagCount::getTag)
            .process(new VelocityCalculator());

        // Write to Redis
        trending.addSink(new RedisSink<>(redisConfig,
            new TrendingRedisMapper()));

        env.execute("Trending Topics Detection");
    }
}

// Velocity calculation
public class VelocityCalculator extends KeyedProcessFunction<...> {
    private ValueState<Long> previousCount;

    public void processElement(HashtagCount current, Context ctx,
                               Collector<TrendingTopic> out) {
        Long prev = previousCount.value();
        if (prev != null) {
            double velocity = (current.getCount() - prev) / (double) prev;
            if (velocity > 0.5) { // 50% increase = trending
                out.collect(new TrendingTopic(
                    current.getTag(), current.getCount(), velocity));
            }
        }
        previousCount.update(current.getCount());
    }
}`
        },
        {
          name: 'Geo-based Trends',
          explanation: 'Trending topics vary by location: Global trends, Country-level trends, City-level trends. Implementation: Tag tweets with user location (from profile or IP geolocation). Maintain separate Redis sorted sets: trends:global, trends:US, trends:US:NYC. Users see trends for their location with global fallback. Challenges: Privacy (opt-in location), Sparse data for small regions, VPN/proxy detection.',
          codeExample: `// Geo-based trending service
@Service
public class GeoTrendingService {
    private final RedisTemplate<String, String> redis;

    public List<TrendingTopic> getTrends(String userId) {
        // Get user's location preference
        UserLocation location = getUserLocation(userId);

        // Try most specific first, fall back to broader regions
        List<String> keys = List.of(
            "trends:" + location.getCountry() + ":" + location.getCity(),
            "trends:" + location.getCountry(),
            "trends:global"
        );

        for (String key : keys) {
            Set<ZSetOperations.TypedTuple<String>> trends =
                redis.opsForZSet().reverseRangeWithScores(key, 0, 9);
            if (trends != null && trends.size() >= 5) {
                return mapToTrendingTopics(trends);
            }
        }

        // Fallback to global
        return getGlobalTrends();
    }

    // Update trends for all applicable regions
    public void updateTrend(String hashtag, String country, String city) {
        long timestamp = System.currentTimeMillis();

        // Increment in all applicable sorted sets
        redis.opsForZSet().incrementScore("trends:global", hashtag, 1);
        redis.opsForZSet().incrementScore("trends:" + country, hashtag, 1);
        redis.opsForZSet().incrementScore(
            "trends:" + country + ":" + city, hashtag, 1);

        // Set expiration (trends are ephemeral)
        redis.expire("trends:" + country + ":" + city, Duration.ofHours(24));
    }
}`
        }
      ]
    }
  ];

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null;

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1);
      setSelectedDetailIndex(0);
    }
  };

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1);
      setSelectedDetailIndex(0);
    }
  };

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'System Design', icon: '🏛️', page: 'System Design' },
      { name: 'Twitter/X', icon: '🐦', page: 'Twitter' }
    ];
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon });
    }
    return stack;
  };

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      onBack();
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (selectedConcept) {
          setSelectedConceptIndex(null);
        } else {
          onBack();
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault();
        handlePreviousConcept();
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault();
        handleNextConcept();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedConceptIndex, onBack]);

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  };

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#60a5fa',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Twitter/X System Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
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
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`;
              e.currentTarget.style.borderColor = concept.color;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = `${concept.color}40`;
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
              width: '100%',
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
              const detail = selectedConcept.details[selectedDetailIndex];
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length];
              const DiagramComponent = detail.diagram || selectedConcept.diagram;
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
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

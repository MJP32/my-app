import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import CompletionCheckbox from '../../components/CompletionCheckbox';

// SVG Diagram Components

// 1. High-level architecture: Client → API → Search Service → Trie/Index
const TypeAheadArchitectureDiagram = () => (
  <svg viewBox="0 0 900 400" className="w-full h-auto">
    <defs>
      <linearGradient id="archClientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6d28d9" />
      </linearGradient>
      <linearGradient id="archApiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id="archServiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="archTrieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="archCacheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <filter id="archShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
      <marker id="archArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="900" height="400" fill="#f8fafc" rx="12"/>

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">TypeAhead System Architecture</text>

    {/* Client Layer */}
    <g filter="url(#archShadow)">
      <rect x="30" y="80" width="120" height="80" rx="10" fill="url(#archClientGrad)"/>
      <text x="90" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">Web Client</text>
      <text x="90" y="135" textAnchor="middle" fontSize="10" fill="#e0e7ff">Browser/Mobile</text>
    </g>

    {/* API Gateway */}
    <g filter="url(#archShadow)">
      <rect x="220" y="80" width="140" height="80" rx="10" fill="url(#archApiGrad)"/>
      <text x="290" y="110" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">API Gateway</text>
      <text x="290" y="130" textAnchor="middle" fontSize="10" fill="#cffafe">Rate Limiting</text>
      <text x="290" y="145" textAnchor="middle" fontSize="10" fill="#cffafe">Load Balancing</text>
    </g>

    {/* Search Service */}
    <g filter="url(#archShadow)">
      <rect x="430" y="80" width="150" height="80" rx="10" fill="url(#archServiceGrad)"/>
      <text x="505" y="110" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">Search Service</text>
      <text x="505" y="130" textAnchor="middle" fontSize="10" fill="#d1fae5">Query Processing</text>
      <text x="505" y="145" textAnchor="middle" fontSize="10" fill="#d1fae5">Ranking</text>
    </g>

    {/* Trie/Index */}
    <g filter="url(#archShadow)">
      <rect x="650" y="80" width="140" height="80" rx="10" fill="url(#archTrieGrad)"/>
      <text x="720" y="110" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">Trie Index</text>
      <text x="720" y="130" textAnchor="middle" fontSize="10" fill="#fef3c7">Prefix Tree</text>
      <text x="720" y="145" textAnchor="middle" fontSize="10" fill="#fef3c7">In-Memory</text>
    </g>

    {/* Cache Layer */}
    <g filter="url(#archShadow)">
      <rect x="430" y="220" width="150" height="70" rx="10" fill="url(#archCacheGrad)"/>
      <text x="505" y="250" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">Redis Cache</text>
      <text x="505" y="270" textAnchor="middle" fontSize="10" fill="#fee2e2">Prefix → Suggestions</text>
    </g>

    {/* Database */}
    <g filter="url(#archShadow)">
      <rect x="650" y="220" width="140" height="70" rx="10" fill="#334155"/>
      <text x="720" y="250" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">Database</text>
      <text x="720" y="270" textAnchor="middle" fontSize="10" fill="#94a3b8">PostgreSQL</text>
    </g>

    {/* Arrows */}
    <line x1="150" y1="120" x2="215" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#archArrow)"/>
    <line x1="360" y1="120" x2="425" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#archArrow)"/>
    <line x1="580" y1="120" x2="645" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#archArrow)"/>
    <line x1="505" y1="160" x2="505" y2="215" stroke="#64748b" strokeWidth="2" markerEnd="url(#archArrow)"/>
    <line x1="580" y1="255" x2="645" y2="255" stroke="#64748b" strokeWidth="2" markerEnd="url(#archArrow)"/>
    <line x1="720" y1="160" x2="720" y2="215" stroke="#64748b" strokeWidth="2" markerEnd="url(#archArrow)"/>

    {/* Labels on arrows */}
    <text x="182" y="108" fontSize="9" fill="#64748b">GET /autocomplete</text>
    <text x="392" y="108" fontSize="9" fill="#64748b">Query</text>
    <text x="605" y="108" fontSize="9" fill="#64748b">Lookup</text>
    <text x="515" y="190" fontSize="9" fill="#64748b">Cache Hit</text>
    <text x="605" y="243" fontSize="9" fill="#64748b">Miss</text>

    {/* Response flow (dashed) */}
    <line x1="215" y1="140" x2="150" y2="140" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#archArrow)"/>
    <text x="182" y="155" fontSize="9" fill="#22c55e">Suggestions</text>

    {/* Legend */}
    <rect x="30" y="320" width="840" height="60" fill="#f1f5f9" rx="8"/>
    <text x="50" y="345" fontSize="11" fontWeight="bold" fill="#475569">Request Flow:</text>
    <line x1="140" y1="342" x2="180" y2="342" stroke="#64748b" strokeWidth="2" markerEnd="url(#archArrow)"/>
    <text x="190" y="346" fontSize="10" fill="#64748b">Solid arrows</text>
    <text x="290" y="345" fontSize="11" fontWeight="bold" fill="#475569">Response Flow:</text>
    <line x1="400" y1="342" x2="440" y2="342" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="450" y="346" fontSize="10" fill="#22c55e">Dashed arrows</text>
    <text x="550" y="345" fontSize="11" fontWeight="bold" fill="#475569">Latency Target:</text>
    <text x="660" y="346" fontSize="10" fill="#ef4444">{`P99 < 100ms`}</text>
  </svg>
);

// 2. Trie Data Structure for Prefix Matching
const TrieDataStructureDiagram = () => (
  <svg viewBox="0 0 800 500" className="w-full h-auto">
    <defs>
      <linearGradient id="trieNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="trieEndGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="trieHighlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <filter id="trieShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.3"/>
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="800" height="500" fill="#f8fafc" rx="12"/>

    {/* Title */}
    <text x="400" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">Trie Data Structure for Prefix "car"</text>

    {/* Root Node */}
    <g filter="url(#trieShadow)">
      <circle cx="400" cy="80" r="25" fill="url(#trieNodeGrad)"/>
      <text x="400" y="85" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">root</text>
    </g>

    {/* Level 1: 'c' */}
    <line x1="400" y1="105" x2="400" y2="145" stroke="#64748b" strokeWidth="2"/>
    <g filter="url(#trieShadow)">
      <circle cx="400" cy="170" r="25" fill="url(#trieHighlightGrad)"/>
      <text x="400" y="175" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">c</text>
    </g>

    {/* Level 2: 'a' */}
    <line x1="400" y1="195" x2="400" y2="235" stroke="#64748b" strokeWidth="2"/>
    <g filter="url(#trieShadow)">
      <circle cx="400" cy="260" r="25" fill="url(#trieHighlightGrad)"/>
      <text x="400" y="265" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">a</text>
    </g>

    {/* Level 3: 'r' - This is the prefix match node */}
    <line x1="400" y1="285" x2="400" y2="325" stroke="#64748b" strokeWidth="2"/>
    <g filter="url(#trieShadow)">
      <circle cx="400" cy="350" r="28" fill="url(#trieHighlightGrad)" stroke="#dc2626" strokeWidth="3"/>
      <text x="400" y="355" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">r</text>
    </g>

    {/* Prefix indicator */}
    <rect x="440" y="335" width="120" height="30" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
    <text x="500" y="355" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">Prefix: "car"</text>

    {/* Level 4: Branches from 'r' */}
    {/* Branch to empty (word: car) */}
    <line x1="360" y1="370" x2="280" y2="420" stroke="#22c55e" strokeWidth="2"/>
    <g filter="url(#trieShadow)">
      <circle cx="260" cy="440" r="22" fill="url(#trieEndGrad)"/>
      <text x="260" y="445" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">END</text>
    </g>
    <text x="260" y="475" textAnchor="middle" fontSize="11" fill="#059669" fontWeight="bold">"car" (1M)</text>

    {/* Branch to 's' (cars) */}
    <line x1="380" y1="375" x2="340" y2="420" stroke="#64748b" strokeWidth="2"/>
    <g filter="url(#trieShadow)">
      <circle cx="330" cy="440" r="20" fill="url(#trieNodeGrad)"/>
      <text x="330" y="445" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">s</text>
    </g>
    <text x="330" y="475" textAnchor="middle" fontSize="11" fill="#7c3aed">"cars" (500K)</text>

    {/* Branch to 'b' (carbon) */}
    <line x1="420" y1="375" x2="460" y2="420" stroke="#64748b" strokeWidth="2"/>
    <g filter="url(#trieShadow)">
      <circle cx="470" cy="440" r="20" fill="url(#trieNodeGrad)"/>
      <text x="470" y="445" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">b</text>
    </g>
    <text x="470" y="475" textAnchor="middle" fontSize="11" fill="#7c3aed">"carbon..." (300K)</text>

    {/* Branch to 'e' (career) */}
    <line x1="440" y1="370" x2="540" y2="420" stroke="#64748b" strokeWidth="2"/>
    <g filter="url(#trieShadow)">
      <circle cx="560" cy="440" r="20" fill="url(#trieNodeGrad)"/>
      <text x="560" y="445" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">e</text>
    </g>
    <text x="560" y="475" textAnchor="middle" fontSize="11" fill="#7c3aed">"career..." (200K)</text>

    {/* Explanation Box */}
    <rect x="600" y="80" width="180" height="150" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2"/>
    <text x="690" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">Trie Properties</text>
    <text x="615" y="130" fontSize="10" fill="#1e3a5a">- O(k) lookup time</text>
    <text x="615" y="150" fontSize="10" fill="#1e3a5a">- k = prefix length</text>
    <text x="615" y="170" fontSize="10" fill="#1e3a5a">- Store top N at each node</text>
    <text x="615" y="190" fontSize="10" fill="#1e3a5a">- Memory: ~100B/node</text>
    <text x="615" y="210" fontSize="10" fill="#1e3a5a">- Compressed (PATRICIA)</text>

    {/* Legend */}
    <rect x="20" y="80" width="150" height="130" rx="8" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="95" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">Legend</text>
    <circle cx="45" cy="130" r="10" fill="url(#trieHighlightGrad)"/>
    <text x="65" y="135" fontSize="10" fill="#64748b">Prefix path</text>
    <circle cx="45" cy="160" r="10" fill="url(#trieNodeGrad)"/>
    <text x="65" y="165" fontSize="10" fill="#64748b">Child node</text>
    <circle cx="45" cy="190" r="10" fill="url(#trieEndGrad)"/>
    <text x="65" y="195" fontSize="10" fill="#64748b">Word end</text>
  </svg>
);

// 3. Ranking Diagram - How suggestions are ranked by popularity/relevance
const RankingDiagram = () => (
  <svg viewBox="0 0 850 450" className="w-full h-auto">
    <defs>
      <linearGradient id="rankInputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="rankFeatureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id="rankModelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="rankOutputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <filter id="rankShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
      <marker id="rankArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="850" height="450" fill="#f8fafc" rx="12"/>

    {/* Title */}
    <text x="425" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">Suggestion Ranking Pipeline</text>

    {/* Input: Raw Suggestions */}
    <g filter="url(#rankShadow)">
      <rect x="30" y="70" width="140" height="100" rx="10" fill="url(#rankInputGrad)"/>
      <text x="100" y="100" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">Raw Suggestions</text>
      <text x="100" y="120" textAnchor="middle" fontSize="10" fill="#e0e7ff">From Trie</text>
      <text x="100" y="140" textAnchor="middle" fontSize="10" fill="#c4b5fd">car, cars, carbon,</text>
      <text x="100" y="155" textAnchor="middle" fontSize="10" fill="#c4b5fd">career, careful...</text>
    </g>

    {/* Feature Extraction */}
    <g filter="url(#rankShadow)">
      <rect x="220" y="50" width="160" height="300" rx="10" fill="url(#rankFeatureGrad)"/>
      <text x="300" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">Feature Extraction</text>

      {/* Feature boxes */}
      <rect x="235" y="100" width="130" height="35" rx="5" fill="#0e7490"/>
      <text x="300" y="115" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">Popularity</text>
      <text x="300" y="128" textAnchor="middle" fontSize="9" fill="#cffafe">Query frequency</text>

      <rect x="235" y="145" width="130" height="35" rx="5" fill="#0e7490"/>
      <text x="300" y="160" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">Recency</text>
      <text x="300" y="173" textAnchor="middle" fontSize="9" fill="#cffafe">Time decay factor</text>

      <rect x="235" y="190" width="130" height="35" rx="5" fill="#0e7490"/>
      <text x="300" y="205" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">Personalization</text>
      <text x="300" y="218" textAnchor="middle" fontSize="9" fill="#cffafe">User history match</text>

      <rect x="235" y="235" width="130" height="35" rx="5" fill="#0e7490"/>
      <text x="300" y="250" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">Context</text>
      <text x="300" y="263" textAnchor="middle" fontSize="9" fill="#cffafe">Location, device</text>

      <rect x="235" y="280" width="130" height="35" rx="5" fill="#0e7490"/>
      <text x="300" y="295" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">CTR</text>
      <text x="300" y="308" textAnchor="middle" fontSize="9" fill="#cffafe">Click-through rate</text>
    </g>

    {/* ML Model */}
    <g filter="url(#rankShadow)">
      <rect x="430" y="100" width="160" height="200" rx="10" fill="url(#rankModelGrad)"/>
      <text x="510" y="130" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">ML Ranking Model</text>
      <text x="510" y="150" textAnchor="middle" fontSize="10" fill="#fef3c7">(XGBoost/GBDT)</text>

      {/* Formula */}
      <rect x="445" y="165" width="130" height="60" rx="5" fill="#b45309"/>
      <text x="510" y="185" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">Score Formula:</text>
      <text x="510" y="200" textAnchor="middle" fontSize="8" fill="#fef3c7">w1×pop + w2×rec</text>
      <text x="510" y="212" textAnchor="middle" fontSize="8" fill="#fef3c7">+ w3×pers + w4×ctx</text>

      {/* Training info */}
      <text x="510" y="250" textAnchor="middle" fontSize="9" fill="#fef3c7">Trained daily</text>
      <text x="510" y="265" textAnchor="middle" fontSize="9" fill="#fef3c7">on click data</text>
      <text x="510" y="280" textAnchor="middle" fontSize="9" fill="#fef3c7">A/B tested</text>
    </g>

    {/* Output: Ranked Suggestions */}
    <g filter="url(#rankShadow)">
      <rect x="640" y="70" width="180" height="260" rx="10" fill="url(#rankOutputGrad)"/>
      <text x="730" y="100" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">Ranked Suggestions</text>
      <text x="730" y="118" textAnchor="middle" fontSize="10" fill="#d1fae5">Top 10 returned</text>

      {/* Ranked list */}
      <rect x="660" y="130" width="140" height="25" rx="4" fill="#047857"/>
      <text x="680" y="147" fontSize="10" fill="white">1. car</text>
      <text x="780" y="147" fontSize="9" fill="#a7f3d0">0.95</text>

      <rect x="660" y="160" width="140" height="25" rx="4" fill="#047857"/>
      <text x="680" y="177" fontSize="10" fill="white">2. cars</text>
      <text x="780" y="177" fontSize="9" fill="#a7f3d0">0.89</text>

      <rect x="660" y="190" width="140" height="25" rx="4" fill="#047857"/>
      <text x="680" y="207" fontSize="10" fill="white">3. carbon</text>
      <text x="780" y="207" fontSize="9" fill="#a7f3d0">0.82</text>

      <rect x="660" y="220" width="140" height="25" rx="4" fill="#047857"/>
      <text x="680" y="237" fontSize="10" fill="white">4. career</text>
      <text x="780" y="237" fontSize="9" fill="#a7f3d0">0.78</text>

      <rect x="660" y="250" width="140" height="25" rx="4" fill="#047857"/>
      <text x="680" y="267" fontSize="10" fill="white">5. careful</text>
      <text x="780" y="267" fontSize="9" fill="#a7f3d0">0.71</text>

      <text x="730" y="300" textAnchor="middle" fontSize="10" fill="#d1fae5">...</text>
    </g>

    {/* Arrows */}
    <line x1="170" y1="120" x2="215" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#rankArrow)"/>
    <line x1="380" y1="200" x2="425" y2="200" stroke="#64748b" strokeWidth="2" markerEnd="url(#rankArrow)"/>
    <line x1="590" y1="200" x2="635" y2="200" stroke="#64748b" strokeWidth="2" markerEnd="url(#rankArrow)"/>

    {/* Latency indicator */}
    <rect x="30" y="380" width="790" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
    <text x="425" y="400" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">Ranking Latency Budget</text>
    <text x="200" y="420" textAnchor="middle" fontSize="10" fill="#78350f">Feature Extraction: ~5ms</text>
    <text x="425" y="420" textAnchor="middle" fontSize="10" fill="#78350f">Model Inference: ~10ms</text>
    <text x="650" y="420" textAnchor="middle" fontSize="10" fill="#78350f">Total: ~15-20ms</text>
  </svg>
);

// 4. Multi-layer Caching Diagram
const CachingDiagram = () => (
  <svg viewBox="0 0 800 500" className="w-full h-auto">
    <defs>
      <linearGradient id="cacheL1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="cacheL2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id="cacheL3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="cacheL4Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="cacheDbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <filter id="cacheShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
      <marker id="cacheArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
      </marker>
      <marker id="cacheArrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#22c55e" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="800" height="500" fill="#f8fafc" rx="12"/>

    {/* Title */}
    <text x="400" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">Multi-Layer Caching Strategy</text>

    {/* Client */}
    <g filter="url(#cacheShadow)">
      <rect x="30" y="60" width="100" height="60" rx="8" fill="#64748b"/>
      <text x="80" y="85" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Client</text>
      <text x="80" y="100" textAnchor="middle" fontSize="9" fill="#e2e8f0">Browser/App</text>
    </g>

    {/* L1: Browser Cache */}
    <g filter="url(#cacheShadow)">
      <rect x="180" y="50" width="130" height="80" rx="10" fill="url(#cacheL1Grad)"/>
      <text x="245" y="75" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">L1: Browser Cache</text>
      <text x="245" y="95" textAnchor="middle" fontSize="9" fill="#e0e7ff">TTL: 5 min</text>
      <text x="245" y="110" textAnchor="middle" fontSize="9" fill="#c4b5fd">LocalStorage/Memory</text>
    </g>

    {/* L2: CDN Edge */}
    <g filter="url(#cacheShadow)">
      <rect x="360" y="50" width="130" height="80" rx="10" fill="url(#cacheL2Grad)"/>
      <text x="425" y="75" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">L2: CDN Edge</text>
      <text x="425" y="95" textAnchor="middle" fontSize="9" fill="#cffafe">TTL: 10 min</text>
      <text x="425" y="110" textAnchor="middle" fontSize="9" fill="#a5f3fc">CloudFront/Fastly</text>
    </g>

    {/* L3: Redis Cluster */}
    <g filter="url(#cacheShadow)">
      <rect x="540" y="50" width="130" height="80" rx="10" fill="url(#cacheL3Grad)"/>
      <text x="605" y="75" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">L3: Redis Cluster</text>
      <text x="605" y="95" textAnchor="middle" fontSize="9" fill="#fee2e2">TTL: 1 hour</text>
      <text x="605" y="110" textAnchor="middle" fontSize="9" fill="#fecaca">Distributed Cache</text>
    </g>

    {/* L4: App Memory */}
    <g filter="url(#cacheShadow)">
      <rect x="540" y="170" width="130" height="80" rx="10" fill="url(#cacheL4Grad)"/>
      <text x="605" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">L4: App Memory</text>
      <text x="605" y="215" textAnchor="middle" fontSize="9" fill="#d1fae5">LRU Cache</text>
      <text x="605" y="230" textAnchor="middle" fontSize="9" fill="#a7f3d0">Hot queries</text>
    </g>

    {/* Database/Trie */}
    <g filter="url(#cacheShadow)">
      <rect x="540" y="290" width="130" height="80" rx="10" fill="url(#cacheDbGrad)"/>
      <text x="605" y="315" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Trie Index</text>
      <text x="605" y="335" textAnchor="middle" fontSize="9" fill="#fef3c7">Source of Truth</text>
      <text x="605" y="350" textAnchor="middle" fontSize="9" fill="#fde68a">In-Memory</text>
    </g>

    {/* Arrows for request flow */}
    <line x1="130" y1="90" x2="175" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#cacheArrow)"/>
    <line x1="310" y1="90" x2="355" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#cacheArrow)"/>
    <line x1="490" y1="90" x2="535" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#cacheArrow)"/>
    <line x1="605" y1="130" x2="605" y2="165" stroke="#64748b" strokeWidth="2" markerEnd="url(#cacheArrow)"/>
    <line x1="605" y1="250" x2="605" y2="285" stroke="#64748b" strokeWidth="2" markerEnd="url(#cacheArrow)"/>

    {/* Hit/Miss labels */}
    <text x="152" y="80" fontSize="8" fill="#64748b">Request</text>
    <text x="332" y="80" fontSize="8" fill="#dc2626">Miss</text>
    <text x="512" y="80" fontSize="8" fill="#dc2626">Miss</text>
    <text x="620" y="150" fontSize="8" fill="#dc2626">Miss</text>
    <text x="620" y="270" fontSize="8" fill="#dc2626">Miss</text>

    {/* Cache hit rates box */}
    <rect x="30" y="160" width="200" height="200" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2"/>
    <text x="130" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">Cache Hit Rates</text>

    <rect x="50" y="200" width="160" height="30" rx="5" fill="#8b5cf6"/>
    <rect x="50" y="200" width="128" height="30" rx="5" fill="#a78bfa"/>
    <text x="130" y="220" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">L1: 80%</text>

    <rect x="50" y="240" width="160" height="30" rx="5" fill="#06b6d4"/>
    <rect x="50" y="240" width="144" height="30" rx="5" fill="#22d3ee"/>
    <text x="130" y="260" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">L2: 90%</text>

    <rect x="50" y="280" width="160" height="30" rx="5" fill="#ef4444"/>
    <rect x="50" y="280" width="152" height="30" rx="5" fill="#f87171"/>
    <text x="130" y="300" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">L3: 95%</text>

    <rect x="50" y="320" width="160" height="30" rx="5" fill="#10b981"/>
    <rect x="50" y="320" width="156" height="30" rx="5" fill="#34d399"/>
    <text x="130" y="340" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">L4: 98%</text>

    {/* Latency indicator */}
    <rect x="260" y="160" width="230" height="210" rx="10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/>
    <text x="375" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">Latency by Layer</text>

    <text x="280" y="215" fontSize="11" fill="#166534">L1 Hit:</text>
    <text x="440" y="215" fontSize="11" fontWeight="bold" fill="#15803d">&lt;1ms</text>

    <text x="280" y="245" fontSize="11" fill="#166534">L2 Hit:</text>
    <text x="440" y="245" fontSize="11" fontWeight="bold" fill="#15803d">~5ms</text>

    <text x="280" y="275" fontSize="11" fill="#166534">L3 Hit:</text>
    <text x="440" y="275" fontSize="11" fontWeight="bold" fill="#15803d">~10ms</text>

    <text x="280" y="305" fontSize="11" fill="#166534">L4 Hit:</text>
    <text x="440" y="305" fontSize="11" fontWeight="bold" fill="#15803d">~20ms</text>

    <text x="280" y="335" fontSize="11" fill="#166534">Trie Lookup:</text>
    <text x="440" y="335" fontSize="11" fontWeight="bold" fill="#dc2626">~50ms</text>

    <text x="280" y="360" fontSize="11" fill="#166534">Effective Avg:</text>
    <text x="440" y="360" fontSize="11" fontWeight="bold" fill="#15803d">&lt;15ms</text>

    {/* Cache key format */}
    <rect x="30" y="400" width="760" height="80" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
    <text x="410" y="425" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">Cache Key Strategy</text>
    <text x="200" y="455" textAnchor="middle" fontSize="11" fill="#78350f">Key Format: autocomplete:{'{prefix}'}:{'{lang}'}:{'{locale}'}</text>
    <text x="550" y="455" textAnchor="middle" fontSize="11" fill="#78350f">Example: autocomplete:car:en:US</text>
    <text x="410" y="475" textAnchor="middle" fontSize="10" fill="#92400e">Value: Compressed JSON array of top 10 suggestions with scores</text>
  </svg>
);

// 5. Data Collection and Indexing Diagram
const DataCollectionDiagram = () => (
  <svg viewBox="0 0 900 480" className="w-full h-auto">
    <defs>
      <linearGradient id="dcClientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="dcKafkaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="dcFlinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id="dcDbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="dcTrieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <filter id="dcShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
      <marker id="dcArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="900" height="480" fill="#f8fafc" rx="12"/>

    {/* Title */}
    <text x="450" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">Query Collection and Trie Indexing Pipeline</text>

    {/* User searches */}
    <g filter="url(#dcShadow)">
      <rect x="30" y="60" width="120" height="80" rx="10" fill="url(#dcClientGrad)"/>
      <text x="90" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">User Searches</text>
      <text x="90" y="110" textAnchor="middle" fontSize="9" fill="#e0e7ff">"car insurance"</text>
      <text x="90" y="125" textAnchor="middle" fontSize="9" fill="#c4b5fd">"car rental"</text>
    </g>

    {/* Query Logger */}
    <g filter="url(#dcShadow)">
      <rect x="30" y="170" width="120" height="70" rx="10" fill="#64748b"/>
      <text x="90" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Query Logger</text>
      <text x="90" y="220" textAnchor="middle" fontSize="9" fill="#e2e8f0">Async logging</text>
    </g>

    {/* Kafka */}
    <g filter="url(#dcShadow)">
      <rect x="200" y="130" width="140" height="140" rx="10" fill="url(#dcKafkaGrad)"/>
      <text x="270" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">Apache Kafka</text>
      <text x="270" y="180" textAnchor="middle" fontSize="10" fill="#fef3c7">Topic: search_queries</text>

      <rect x="215" y="195" width="110" height="25" rx="4" fill="#b45309"/>
      <text x="270" y="212" textAnchor="middle" fontSize="9" fill="white">Partition 0</text>

      <rect x="215" y="225" width="110" height="25" rx="4" fill="#b45309"/>
      <text x="270" y="242" textAnchor="middle" fontSize="9" fill="white">Partition 1</text>
    </g>

    {/* Apache Flink */}
    <g filter="url(#dcShadow)">
      <rect x="390" y="100" width="160" height="200" rx="10" fill="url(#dcFlinkGrad)"/>
      <text x="470" y="130" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">Apache Flink</text>
      <text x="470" y="150" textAnchor="middle" fontSize="10" fill="#cffafe">Stream Processing</text>

      <rect x="405" y="165" width="130" height="30" rx="5" fill="#0e7490"/>
      <text x="470" y="185" textAnchor="middle" fontSize="9" fill="white">5-min Tumbling Window</text>

      <rect x="405" y="205" width="130" height="30" rx="5" fill="#0e7490"/>
      <text x="470" y="225" textAnchor="middle" fontSize="9" fill="white">Count Aggregation</text>

      <rect x="405" y="245" width="130" height="30" rx="5" fill="#0e7490"/>
      <text x="470" y="265" textAnchor="middle" fontSize="9" fill="white">Trend Detection</text>
    </g>

    {/* Database */}
    <g filter="url(#dcShadow)">
      <rect x="600" y="80" width="140" height="100" rx="10" fill="url(#dcDbGrad)"/>
      <text x="670" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Query Database</text>
      <text x="670" y="130" textAnchor="middle" fontSize="10" fill="#d1fae5">Cassandra</text>
      <text x="670" y="150" textAnchor="middle" fontSize="9" fill="#a7f3d0">query → count, ts</text>
      <text x="670" y="165" textAnchor="middle" fontSize="9" fill="#a7f3d0">Append-only logs</text>
    </g>

    {/* Trie Builder */}
    <g filter="url(#dcShadow)">
      <rect x="600" y="210" width="140" height="90" rx="10" fill="#7c3aed"/>
      <text x="670" y="240" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Trie Builder</text>
      <text x="670" y="260" textAnchor="middle" fontSize="9" fill="#e0e7ff">Daily batch job</text>
      <text x="670" y="280" textAnchor="middle" fontSize="9" fill="#c4b5fd">Incremental updates</text>
    </g>

    {/* Trie Servers */}
    <g filter="url(#dcShadow)">
      <rect x="780" y="130" width="100" height="140" rx="10" fill="url(#dcTrieGrad)"/>
      <text x="830" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Trie Servers</text>

      <rect x="795" y="175" width="70" height="25" rx="4" fill="#b91c1c"/>
      <text x="830" y="192" textAnchor="middle" fontSize="9" fill="white">Shard 1</text>

      <rect x="795" y="205" width="70" height="25" rx="4" fill="#b91c1c"/>
      <text x="830" y="222" textAnchor="middle" fontSize="9" fill="white">Shard 2</text>

      <rect x="795" y="235" width="70" height="25" rx="4" fill="#b91c1c"/>
      <text x="830" y="252" textAnchor="middle" fontSize="9" fill="white">Shard N</text>
    </g>

    {/* Arrows */}
    <line x1="90" y1="140" x2="90" y2="165" stroke="#64748b" strokeWidth="2" markerEnd="url(#dcArrow)"/>
    <line x1="150" y1="205" x2="195" y2="205" stroke="#64748b" strokeWidth="2" markerEnd="url(#dcArrow)"/>
    <line x1="340" y1="200" x2="385" y2="200" stroke="#64748b" strokeWidth="2" markerEnd="url(#dcArrow)"/>
    <line x1="550" y1="130" x2="595" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#dcArrow)"/>
    <line x1="550" y1="255" x2="595" y2="255" stroke="#64748b" strokeWidth="2" markerEnd="url(#dcArrow)"/>
    <line x1="670" y1="180" x2="670" y2="205" stroke="#64748b" strokeWidth="2" markerEnd="url(#dcArrow)"/>
    <line x1="740" y1="200" x2="775" y2="200" stroke="#64748b" strokeWidth="2" markerEnd="url(#dcArrow)"/>

    {/* Labels */}
    <text x="105" y="155" fontSize="8" fill="#64748b">Log</text>
    <text x="170" y="195" fontSize="8" fill="#64748b">Publish</text>
    <text x="360" y="190" fontSize="8" fill="#64748b">Consume</text>
    <text x="570" y="120" fontSize="8" fill="#64748b">Store</text>
    <text x="560" y="245" fontSize="8" fill="#64748b">Trending</text>
    <text x="755" y="190" fontSize="8" fill="#64748b">Deploy</text>

    {/* Timeline section */}
    <rect x="30" y="330" width="850" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2"/>
    <text x="455" y="355" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">Processing Timeline</text>

    {/* Timeline bar */}
    <rect x="60" y="380" width="790" height="20" rx="5" fill="#e2e8f0"/>

    {/* Timeline segments */}
    <rect x="60" y="380" width="150" height="20" rx="5" fill="#f59e0b"/>
    <text x="135" y="395" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">Real-time (ms)</text>

    <rect x="210" y="380" width="200" height="20" rx="5" fill="#06b6d4"/>
    <text x="310" y="395" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">5-min Window</text>

    <rect x="410" y="380" width="150" height="20" rx="5" fill="#10b981"/>
    <text x="485" y="395" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">Incremental (5-10 min)</text>

    <rect x="560" y="380" width="290" height="20" rx="5" fill="#8b5cf6"/>
    <text x="705" y="395" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">Full Rebuild (Daily - Nightly)</text>

    {/* Labels below timeline */}
    <text x="135" y="425" textAnchor="middle" fontSize="9" fill="#64748b">Query Logging</text>
    <text x="310" y="425" textAnchor="middle" fontSize="9" fill="#64748b">Aggregation</text>
    <text x="485" y="425" textAnchor="middle" fontSize="9" fill="#64748b">Hot Path Updates</text>
    <text x="705" y="425" textAnchor="middle" fontSize="9" fill="#64748b">Complete Trie Rebuild</text>

    <text x="455" y="450" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="bold">Trending queries surface in 5-10 minutes | Full index refresh every 24 hours</text>
  </svg>
);

export default function TypeAhead({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'components', label: '🔧 Core Components', icon: '🔧' },
    { id: 'dataflow', label: '🔄 Data Flow', icon: '🔄' },
    { id: 'scalability', label: '📈 Scalability', icon: '📈' },
    { id: 'tradeoffs', label: '⚖️ Trade-offs', icon: '⚖️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gray-800 rounded-2xl shadow-lg p-6 border-l-8 border-purple-500">
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-5xl">🔍</span>
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Type Ahead System Design
              </span>
            </h1>
            <div className="w-24"></div>
          </div>
          <p className="text-gray-600 text-lg text-center">
            Design an autocomplete/type-ahead system like Google Search with prefix matching, ranking, caching, real-time suggestions, and billions of queries
          </p>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '0.5rem',
          overflowX: 'auto'
        }}>
          {tabs.map(tab => (
            <div key={tab.id} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.8)' }}>
                <CompletionCheckbox problemId={`TypeAhead-${tab.id}`} />
              </div>
              <button
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  backgroundColor: activeTab === tab.id ? '#f3e8ff' : 'transparent',
                  color: activeTab === tab.id ? '#7c3aed' : '#6b7280',
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
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-purple-600">📝</span>
                System Requirements
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-700 mb-3">✅ Functional Requirements</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Autocomplete:</strong> Suggest queries as user types (prefix matching)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Real-time:</strong> Return suggestions within 100ms</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Ranking:</strong> Sort suggestions by relevance and popularity</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Personalization:</strong> Consider user's search history and location</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Language Support:</strong> Multi-language autocomplete</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Trending Queries:</strong> Surface trending/popular searches</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-orange-700 mb-3">⚡ Non-Functional Requirements</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Low Latency:</strong> P99 latency &lt;100ms</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>High Availability:</strong> 99.99% uptime</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Scalability:</strong> Handle 10 billion queries/day</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Freshness:</strong> New trending queries appear within minutes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Relevance:</strong> High-quality, contextual suggestions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Diagram - New SVG Component */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-violet-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-violet-600">🏗️</span>
                High-Level Architecture
              </h2>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-8 rounded-xl border-2 border-violet-200 mb-6">
                <TypeAheadArchitectureDiagram />
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-8 rounded-xl border-2 border-violet-200">
                <svg viewBox="0 0 1200 800" className="w-full h-auto">
                  {/* Client Layer */}
                  <rect x="50" y="50" width="180" height="70" fill="#8b5cf6" rx="8"/>
                  <text x="140" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Web Client</text>
                  <text x="140" y="100" textAnchor="middle" fill="white" fontSize="11">Browser</text>

                  <rect x="270" y="50" width="180" height="70" fill="#8b5cf6" rx="8"/>
                  <text x="360" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Mobile App</text>
                  <text x="360" y="100" textAnchor="middle" fill="white" fontSize="11">iOS/Android</text>

                  {/* CDN/Edge */}
                  <rect x="160" y="170" width="260" height="60" fill="#06b6d4" rx="8"/>
                  <text x="290" y="205" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">CDN / Edge Servers</text>

                  {/* API Gateway */}
                  <rect x="160" y="270" width="260" height="60" fill="#6366f1" rx="8"/>
                  <text x="290" y="305" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">API Gateway</text>

                  {/* Services Layer */}
                  <rect x="50" y="380" width="180" height="90" fill="#10b981" rx="8"/>
                  <text x="140" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Query Service</text>
                  <text x="140" y="430" textAnchor="middle" fill="white" fontSize="10">Prefix Matching</text>
                  <text x="140" y="448" textAnchor="middle" fill="white" fontSize="10">Trie Traversal</text>

                  <rect x="260" y="380" width="180" height="90" fill="#f59e0b" rx="8"/>
                  <text x="350" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Ranking Service</text>
                  <text x="350" y="430" textAnchor="middle" fill="white" fontSize="10">Score Calculation</text>
                  <text x="350" y="448" textAnchor="middle" fill="white" fontSize="10">ML Models</text>

                  <rect x="470" y="380" width="180" height="90" fill="#ef4444" rx="8"/>
                  <text x="560" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Aggregator Service</text>
                  <text x="560" y="430" textAnchor="middle" fill="white" fontSize="10">Data Collection</text>
                  <text x="560" y="448" textAnchor="middle" fill="white" fontSize="10">Trend Detection</text>

                  <rect x="680" y="380" width="180" height="90" fill="#ec4899" rx="8"/>
                  <text x="770" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Analytics Service</text>
                  <text x="770" y="430" textAnchor="middle" fill="white" fontSize="10">Click Tracking</text>
                  <text x="770" y="448" textAnchor="middle" fill="white" fontSize="10">Popularity Scores</text>

                  <rect x="890" y="380" width="180" height="90" fill="#7c3aed" rx="8"/>
                  <text x="980" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Personalization</text>
                  <text x="980" y="430" textAnchor="middle" fill="white" fontSize="10">User History</text>
                  <text x="980" y="448" textAnchor="middle" fill="white" fontSize="10">Context</text>

                  {/* Cache Layer */}
                  <rect x="160" y="520" width="380" height="60" fill="#06b6d4" rx="8"/>
                  <text x="350" y="545" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Distributed Cache (Redis)</text>
                  <text x="350" y="565" textAnchor="middle" fill="white" fontSize="11">Prefix → Suggestions Mapping</text>

                  {/* Storage Layer */}
                  <rect x="50" y="630" width="180" height="80" fill="#334155" rx="8"/>
                  <text x="140" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Trie Database</text>
                  <text x="140" y="680" textAnchor="middle" fill="white" fontSize="10">PostgreSQL</text>

                  <rect x="260" y="630" width="180" height="80" fill="#334155" rx="8"/>
                  <text x="350" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Query Logs</text>
                  <text x="350" y="680" textAnchor="middle" fill="white" fontSize="10">Cassandra</text>

                  <rect x="470" y="630" width="180" height="80" fill="#334155" rx="8"/>
                  <text x="560" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Analytics DB</text>
                  <text x="560" y="680" textAnchor="middle" fill="white" fontSize="10">ClickHouse</text>

                  <rect x="680" y="630" width="180" height="80" fill="#059669" rx="8"/>
                  <text x="770" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">User Data</text>
                  <text x="770" y="680" textAnchor="middle" fill="white" fontSize="10">Redis/Postgres</text>

                  {/* Message Queue */}
                  <rect x="890" y="520" width="180" height="60" fill="#f97316" rx="8"/>
                  <text x="980" y="545" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Message Queue</text>
                  <text x="980" y="565" textAnchor="middle" fill="white" fontSize="10">Kafka</text>

                  {/* Connections */}
                  <path d="M 140 120 L 290 170" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                  <path d="M 360 120 L 290 170" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                  <path d="M 290 230 L 290 270" stroke="#6366f1" strokeWidth="2" fill="none"/>

                  <path d="M 290 330 L 140 380" stroke="#10b981" strokeWidth="2" fill="none"/>
                  <path d="M 290 330 L 350 380" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <path d="M 290 330 L 560 380" stroke="#ef4444" strokeWidth="2" fill="none"/>
                  <path d="M 290 330 L 770 380" stroke="#ec4899" strokeWidth="2" fill="none"/>
                  <path d="M 290 330 L 980 380" stroke="#7c3aed" strokeWidth="2" fill="none"/>

                  <path d="M 140 470 L 350 520" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                  <path d="M 350 470 L 350 520" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                  <path d="M 560 470 L 980 520" stroke="#f97316" strokeWidth="2" fill="none"/>
                  <path d="M 770 470 L 980 520" stroke="#f97316" strokeWidth="2" fill="none"/>

                  <path d="M 140 470 L 140 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 560 470 L 350 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 770 470 L 560 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 980 470 L 770 630" stroke="#059669" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="font-bold text-purple-900 mb-2">Client Layer</div>
                  <div className="text-sm text-purple-800">Clients send prefix queries as user types, debounced to reduce load</div>
                </div>
                <div className="bg-violet-50 p-4 rounded-lg border-l-4 border-violet-500">
                  <div className="font-bold text-violet-900 mb-2">Service Layer</div>
                  <div className="text-sm text-violet-800">Query processing, ranking, aggregation, and personalization services</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                  <div className="font-bold text-indigo-900 mb-2">Data Layer</div>
                  <div className="text-sm text-indigo-800">Trie data structure, query logs, and multi-tier caching</div>
                </div>
              </div>
            </div>

            {/* Scale Estimates */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-emerald-600">📊</span>
                Scale & Capacity Estimates
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4 text-lg">Traffic Estimates</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Daily queries: <strong>10 billion</strong></div>
                    <div>• QPS (average): <strong>~115,000</strong></div>
                    <div>• Peak QPS: <strong>~350,000</strong></div>
                    <div>• Autocomplete calls per query: <strong>~10</strong></div>
                    <div>• Autocomplete QPS: <strong>~1.15 million</strong></div>
                    <div>• Ratio - Autocomplete:Search: <strong>10:1</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-4 text-lg">Storage Estimates</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Unique queries in English: <strong>~1 billion</strong></div>
                    <div>• Average query length: <strong>~20 characters</strong></div>
                    <div>• Metadata per query: <strong>~30 bytes</strong></div>
                    <div>  - Frequency count: 8 bytes</div>
                    <div>  - Timestamp: 8 bytes</div>
                    <div>  - Language/locale: 4 bytes</div>
                    <div>• Total storage: <strong>1B × 50B = ~50 GB</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-4 text-lg">Trie Memory Requirements</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Nodes in trie: <strong>~10 billion</strong></div>
                    <div>  (26 letters × avg 4 levels × 1B queries)</div>
                    <div>• Memory per node: <strong>~100 bytes</strong></div>
                    <div>  - Children pointers: 52 bytes (26 × 2)</div>
                    <div>  - Metadata: 48 bytes</div>
                    <div>• Total trie memory: <strong>~1 TB</strong></div>
                    <div>• <strong>Solution:</strong> Shard across 100 servers (10GB each)</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-4 text-lg">Bandwidth & Latency</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Request size: <strong>~50 bytes</strong></div>
                    <div>• Response size: <strong>~500 bytes (10 suggestions)</strong></div>
                    <div>• Incoming bandwidth: <strong>~60 MB/s</strong></div>
                    <div>• Outgoing bandwidth: <strong>~600 MB/s</strong></div>
                    <div>• Target P99 latency: <strong>&lt;100ms</strong></div>
                    <div>• Cache hit target: <strong>&gt;90%</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Design Considerations */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-indigo-600">💡</span>
                Key Design Considerations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
                  <h3 className="font-bold text-indigo-900 mb-3 text-lg">Data Structure: Trie (Prefix Tree)</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Why Trie?</strong> Efficient prefix matching (O(k) where k = prefix length)</div>
                    <div>• Each node stores a character and pointers to children</div>
                    <div>• Leaf nodes or special markers indicate complete words</div>
                    <div>• Store top N suggestions at each node for fast lookup</div>
                    <div>• Example: "car" prefix matches "car", "cars", "carbon", "career"</div>
                    <div>• Space optimization: Compress chains of single-child nodes</div>
                  </div>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl border-l-4 border-pink-500">
                  <h3 className="font-bold text-pink-900 mb-3 text-lg">Ranking Factors</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Popularity:</strong> Query frequency (search count)</div>
                    <div>• <strong>Recency:</strong> Time decay (recent queries weighted higher)</div>
                    <div>• <strong>Personalization:</strong> User's search history</div>
                    <div>• <strong>Context:</strong> Time of day, location, device</div>
                    <div>• <strong>Trending:</strong> Spike in search volume (viral topics)</div>
                    <div>• <strong>Quality:</strong> Engagement metrics (click-through rate)</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h3 className="font-bold text-green-900 mb-3 text-lg">Client-Side Optimization</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Debouncing:</strong> Wait 200ms after last keystroke before API call</div>
                    <div>• <strong>Throttling:</strong> Max 1 request every 100ms</div>
                    <div>• <strong>Client Cache:</strong> Cache suggestions in browser (5 min TTL)</div>
                    <div>• <strong>Prefetching:</strong> Load suggestions for common prefixes</div>
                    <div>• <strong>Cancel on Type:</strong> Abort pending requests when user types more</div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                  <h3 className="font-bold text-yellow-900 mb-3 text-lg">Data Freshness</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Real-time Updates:</strong> Trending queries updated every 5-10 minutes</div>
                    <div>• <strong>Batch Processing:</strong> Full trie rebuild daily (offline)</div>
                    <div>• <strong>Incremental Updates:</strong> Hot path for viral queries</div>
                    <div>• <strong>Cache Invalidation:</strong> Invalidate cache on trie update</div>
                    <div>• <strong>A/B Testing:</strong> Test ranking algorithm changes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="space-y-6">
            {/* Ranking Pipeline Diagram */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-t-4 border-orange-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-orange-600">⭐</span>
                Ranking Pipeline Overview
              </h2>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200">
                <RankingDiagram />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Query Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                  <span>🔍</span>
                  Query Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="font-semibold text-green-900 mb-1">Core Functionality</div>
                    <div className="text-sm">• Receive prefix query from client</div>
                    <div className="text-sm">• Normalize input (lowercase, trim whitespace)</div>
                    <div className="text-sm">• Check cache for cached suggestions</div>
                    <div className="text-sm">• If cache miss, traverse Trie to find matches</div>
                    <div className="text-sm">• Return top 10 suggestions</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-1">Trie Traversal</div>
                    <div className="text-sm">• Start at root node</div>
                    <div className="text-sm">• For each character in prefix, navigate to child</div>
                    <div className="text-sm">• At prefix node, retrieve pre-computed top suggestions</div>
                    <div className="text-sm">• Time complexity: O(k) where k = prefix length</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-semibold text-purple-900 mb-1">Optimizations</div>
                    <div className="text-sm">• Store top N suggestions at each trie node</div>
                    <div className="text-sm">• Compress single-child chains (PATRICIA trie)</div>
                    <div className="text-sm">• Use bloom filter to check existence before lookup</div>
                  </div>
                </div>
              </div>

              {/* Ranking Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                  <span>⭐</span>
                  Ranking Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="font-semibold text-orange-900 mb-1">Scoring Formula</div>
                    <div className="text-sm font-mono bg-gray-800 p-2 rounded mt-2">
                      score = w1×popularity + w2×recency + w3×personalization + w4×context
                    </div>
                    <div className="text-sm mt-2">Where w1, w2, w3, w4 are learned weights from ML model</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="font-semibold text-red-900 mb-1">Popularity Signal</div>
                    <div className="text-sm">• Query frequency (search count)</div>
                    <div className="text-sm">• Time-decayed: recent_count + 0.5 × old_count</div>
                    <div className="text-sm">• Normalized by total query volume</div>
                  </div>
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <div className="font-semibold text-pink-900 mb-1">ML Model</div>
                    <div className="text-sm">• Gradient Boosted Trees (XGBoost)</div>
                    <div className="text-sm">• Features: query frequency, CTR, dwell time, recency</div>
                    <div className="text-sm">• Trained daily on historical data</div>
                    <div className="text-sm">• A/B tested before deployment</div>
                  </div>
                </div>
              </div>

              {/* Aggregator Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                  <span>📦</span>
                  Aggregator Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-1">Data Collection</div>
                    <div className="text-sm">• Consume query logs from Kafka</div>
                    <div className="text-sm">• Aggregate queries by prefix (hourly)</div>
                    <div className="text-sm">• Calculate frequency counts and trends</div>
                    <div className="text-sm">• Detect spikes (trending queries)</div>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <div className="font-semibold text-indigo-900 mb-1">Trie Updates</div>
                    <div className="text-sm">• <strong>Batch Mode:</strong> Full trie rebuild daily (offline)</div>
                    <div className="text-sm">• <strong>Incremental:</strong> Update hot nodes every 5 minutes</div>
                    <div className="text-sm">• <strong>Trending:</strong> Fast-track viral queries to trie</div>
                    <div className="text-sm">• Use versioning: old trie serves while new builds</div>
                  </div>
                  <div className="bg-cyan-50 p-3 rounded-lg">
                    <div className="font-semibold text-cyan-900 mb-1">Processing Pipeline</div>
                    <div className="text-sm">1. Query logs → Kafka topic</div>
                    <div className="text-sm">2. Apache Flink aggregates counts (5-min window)</div>
                    <div className="text-sm">3. Update frequency counts in database</div>
                    <div className="text-sm">4. Background job rebuilds trie nodes</div>
                  </div>
                </div>
              </div>

              {/* Cache Layer */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
                  <span>⚡</span>
                  Cache Layer
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-cyan-50 p-3 rounded-lg">
                    <div className="font-semibold text-cyan-900 mb-1">Multi-Tier Caching</div>
                    <div className="text-sm">• <strong>L1: Browser Cache</strong> - 5 min TTL, client-side</div>
                    <div className="text-sm">• <strong>L2: CDN Edge</strong> - 10 min TTL, popular prefixes</div>
                    <div className="text-sm">• <strong>L3: Redis Cluster</strong> - 1 hour TTL, all queries</div>
                    <div className="text-sm">• <strong>L4: Application Memory</strong> - In-process LRU cache</div>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <div className="font-semibold text-teal-900 mb-1">Cache Key Strategy</div>
                    <div className="text-sm">• Key format: <code className="bg-gray-800 px-2 py-1 rounded">prefix:lang:locale</code></div>
                    <div className="text-sm">• Example: <code className="bg-gray-800 px-2 py-1 rounded">car:en:US</code></div>
                    <div className="text-sm">• Store top 10 suggestions per key</div>
                    <div className="text-sm">• Compressed using Snappy (reduce bandwidth)</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-1">Cache Warming</div>
                    <div className="text-sm">• Pre-warm cache with top 10K queries</div>
                    <div className="text-sm">• Async refresh before expiration (TTL - 1 min)</div>
                    <div className="text-sm">• Cache hit rate target: &gt;95%</div>
                  </div>
                </div>
              </div>

              {/* Analytics Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-pink-700 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  Analytics Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <div className="font-semibold text-pink-900 mb-1">Tracked Metrics</div>
                    <div className="text-sm">• Query frequency (per prefix, per suggestion)</div>
                    <div className="text-sm">• Click-through rate (CTR) per suggestion</div>
                    <div className="text-sm">• Position bias (clicks by suggestion rank)</div>
                    <div className="text-sm">• Dwell time (time on result page)</div>
                    <div className="text-sm">• User engagement (searches per session)</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-semibold text-purple-900 mb-1">Data Pipeline</div>
                    <div className="text-sm">• Stream events to Kafka (async, non-blocking)</div>
                    <div className="text-sm">• Apache Flink processes streams (5-min windows)</div>
                    <div className="text-sm">• Aggregate metrics written to ClickHouse</div>
                    <div className="text-sm">• Real-time dashboards via Grafana</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="font-semibold text-yellow-900 mb-1">Trend Detection</div>
                    <div className="text-sm">• Detect spikes: current_count &gt; 3 × moving_average</div>
                    <div className="text-sm">• Fast-track trending queries to trie</div>
                    <div className="text-sm">• Expire old trends after 24 hours</div>
                  </div>
                </div>
              </div>

              {/* Personalization Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                  <span>👤</span>
                  Personalization Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-semibold text-purple-900 mb-1">User Context</div>
                    <div className="text-sm">• Search history (last 100 queries)</div>
                    <div className="text-sm">• Location (IP-based geolocation)</div>
                    <div className="text-sm">• Device type (mobile vs desktop)</div>
                    <div className="text-sm">• Language preference</div>
                    <div className="text-sm">• Time of day, day of week</div>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <div className="font-semibold text-indigo-900 mb-1">Personalization Logic</div>
                    <div className="text-sm">• Boost suggestions matching user's past queries</div>
                    <div className="text-sm">• Filter by language and locale</div>
                    <div className="text-sm">• Prioritize local results for location queries</div>
                    <div className="text-sm">• Re-rank based on user's click history</div>
                  </div>
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <div className="font-semibold text-pink-900 mb-1">Privacy</div>
                    <div className="text-sm">• Store user data encrypted at rest</div>
                    <div className="text-sm">• Anonymize after 90 days</div>
                    <div className="text-sm">• Respect user privacy settings</div>
                    <div className="text-sm">• GDPR-compliant deletion on request</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dataflow' && (
          <div className="space-y-8">
            {/* Query Processing Flow */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-green-600">🔍</span>
                Query Processing Flow
              </h2>

              <div className="space-y-4">
                {[
                  { step: 1, title: 'User Types Query', desc: 'User types "car" in search box, client debounces for 200ms', color: 'blue' },
                  { step: 2, title: 'Send API Request', desc: 'Client sends GET /autocomplete?q=car&lang=en&locale=US', color: 'green' },
                  { step: 3, title: 'CDN/Edge Check', desc: 'CDN checks if suggestions cached at edge location (10-min TTL)', color: 'cyan' },
                  { step: 4, title: 'API Gateway', desc: 'If CDN miss, request routed to API Gateway → Query Service', color: 'purple' },
                  { step: 5, title: 'Redis Cache Lookup', desc: 'Query Service checks Redis: GET "car:en:US" → returns cached suggestions (~5ms)', color: 'orange' },
                  { step: 6, title: 'Trie Traversal (Cache Miss)', desc: 'If cache miss, traverse Trie: root → c → a → r → get top 10 suggestions (~20ms)', color: 'red' },
                  { step: 7, title: 'Ranking & Personalization', desc: 'Ranking Service re-scores suggestions based on user context and ML model', color: 'pink' },
                  { step: 8, title: 'Return Suggestions', desc: 'Return JSON: ["car", "cars", "carbon", "career", ...] to client (<100ms total)', color: 'indigo' }
                ].map(item => (
                  <div key={item.step} className={`bg-${item.color}-50 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                    <div className="flex items-start gap-4">
                      <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-${item.color}-900 mb-1`}>{item.title}</div>
                        <div className="text-gray-700 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Collection Pipeline Diagram */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-amber-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-amber-600">📊</span>
                Query Collection & Indexing Pipeline
              </h2>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border-2 border-amber-200">
                <DataCollectionDiagram />
              </div>
            </div>

            {/* Trie Update Flow */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-orange-600">📦</span>
                Trie Update Flow
              </h2>

              <div className="space-y-4">
                {[
                  { step: 1, title: 'User Searches', desc: 'User completes search, query logged to Kafka topic "search_queries"', color: 'blue' },
                  { step: 2, title: 'Stream Aggregation', desc: 'Apache Flink consumes stream, aggregates query counts (5-min tumbling window)', color: 'green' },
                  { step: 3, title: 'Update Frequency Counts', desc: 'Write aggregated counts to Cassandra: UPDATE queries SET count=count+N WHERE query="car"', color: 'purple' },
                  { step: 4, title: 'Detect Trending', desc: 'Analytics Service detects spike: count > 3 × moving_average → mark as trending', color: 'orange' },
                  { step: 5, title: 'Incremental Trie Update', desc: 'For trending queries, update trie nodes immediately (hot path)', color: 'red' },
                  { step: 6, title: 'Full Trie Rebuild (Daily)', desc: 'Background job rebuilds entire trie from scratch using all query counts', color: 'pink' },
                  { step: 7, title: 'Atomic Swap', desc: 'Once new trie ready, atomically swap: old trie → new trie (zero downtime)', color: 'indigo' },
                  { step: 8, title: 'Cache Invalidation', desc: 'Invalidate Redis cache keys for updated prefixes, force re-fetch from new trie', color: 'cyan' }
                ].map(item => (
                  <div key={item.step} className={`bg-${item.color}-50 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                    <div className="flex items-start gap-4">
                      <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-${item.color}-900 mb-1`}>{item.title}</div>
                        <div className="text-gray-700 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Trie Structure */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-blue-600">🌳</span>
                Trie Structure Example
              </h2>

              {/* Trie Data Structure Diagram */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 mb-6">
                <TrieDataStructureDiagram />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3 text-lg">Trie for Prefix "car"</h3>
                  <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm space-y-1">
                    <div>root</div>
                    <div>&nbsp;└─ c</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;└─ a</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ r (freq: 1M)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ [END] "car"</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ s (freq: 500K)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;└─ [END] "cars"</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ b (freq: 300K)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;└─ o</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ n</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ [END] "carbon"</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ e (freq: 200K)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ e</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ r</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ [END] "career"</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-3 text-lg">Node Structure</h3>
                  <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm space-y-2">
                    <div className="text-gray-600">// TrieNode structure</div>
                    <div>class TrieNode {'{'}</div>
                    <div>&nbsp;&nbsp;char character;</div>
                    <div>&nbsp;&nbsp;Map&lt;char, TrieNode&gt; children;</div>
                    <div>&nbsp;&nbsp;boolean isEndOfWord;</div>
                    <div>&nbsp;&nbsp;long frequency;</div>
                    <div>&nbsp;&nbsp;List&lt;String&gt; topSuggestions;</div>
                    <div>&nbsp;&nbsp;// Pre-computed top 10</div>
                    <div>{'}'}</div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-gray-700">
                    <div><strong>Optimization:</strong> Store top 10 suggestions at each node</div>
                    <div><strong>Benefit:</strong> O(1) lookup instead of DFS traversal</div>
                    <div><strong>Trade-off:</strong> More memory, but much faster queries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scalability' && (
          <div className="space-y-8">
            {/* Trie Sharding */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-purple-600">🗄️</span>
                Trie Sharding Strategy
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-3">Horizontal Sharding</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• <strong>Shard by first character:</strong> 26 shards (a-z)</div>
                    <div>• <strong>Or by prefix hash:</strong> CRC32(prefix) % num_shards</div>
                    <div>• <strong>Shard count:</strong> 100-1000 shards</div>
                    <div>• <strong>Per-shard size:</strong> 1-10 GB (fits in memory)</div>
                    <div>• <strong>Replication:</strong> 3 replicas per shard (read scaling)</div>
                    <div>• <strong>Hot shards:</strong> Common prefixes get more replicas</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3">Shard Routing</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• <strong>Client-side routing:</strong> API Gateway routes to shard</div>
                    <div>• <strong>Routing key:</strong> First char of prefix</div>
                    <div>• <strong>Example:</strong> "car" → shard for 'c'</div>
                    <div>• <strong>Consistency:</strong> Use consistent hashing for resharding</div>
                    <div>• <strong>Discovery:</strong> ZooKeeper for shard registry</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-3">In-Memory Optimization</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• <strong>Load entire trie</strong> into RAM for fast access</div>
                    <div>• <strong>Compression:</strong> Use compressed trie (PATRICIA)</div>
                    <div>• <strong>Memory-mapped files:</strong> mmap() for large tries</div>
                    <div>• <strong>Serialization:</strong> Cap'n Proto or FlatBuffers</div>
                    <div>• <strong>GC optimization:</strong> Off-heap memory to avoid GC pauses</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-3">Failover & Recovery</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• <strong>Health checks:</strong> Heartbeat every 10 seconds</div>
                    <div>• <strong>Auto-failover:</strong> Route to replica on primary failure</div>
                    <div>• <strong>Backup:</strong> Snapshot tries to S3 every hour</div>
                    <div>• <strong>Recovery:</strong> Load from snapshot + replay logs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Caching at Scale */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-cyan-600">⚡</span>
                Caching at Scale
              </h2>

              {/* Multi-Layer Caching Diagram */}
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl border-2 border-cyan-200 mb-6">
                <CachingDiagram />
              </div>

              <div className="space-y-4">
                <div className="bg-cyan-50 p-6 rounded-xl border-l-4 border-cyan-500">
                  <div className="font-bold text-cyan-900 mb-3 text-lg">Redis Cluster Configuration</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>• <strong>Cluster mode:</strong> 100 shards (Redis Cluster)</div>
                    <div>• <strong>Replication:</strong> 1 master + 2 replicas per shard</div>
                    <div>• <strong>Total nodes:</strong> 300 Redis instances</div>
                    <div>• <strong>Memory per node:</strong> 64 GB</div>
                    <div>• <strong>Total cache capacity:</strong> ~6 TB</div>
                    <div>• <strong>Eviction policy:</strong> LRU (least recently used)</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <div className="font-bold text-blue-900 mb-3 text-lg">Cache Key Design</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• <strong>Key format:</strong> <code className="bg-gray-800 px-2 py-1 rounded">{'autocomplete:{prefix}:{lang}:{locale}'}</code></div>
                    <div>• <strong>Value:</strong> JSON array of top 10 suggestions</div>
                    <div>• <strong>TTL:</strong> 1 hour (longer for stable queries)</div>
                    <div>• <strong>Compression:</strong> Snappy compression (70% size reduction)</div>
                    <div>• <strong>Sharding:</strong> CRC16(key) % 16384 slots</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <div className="font-bold text-purple-900 mb-3 text-lg">Cache Warming Strategies</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• <strong>Pre-warming:</strong> Load top 10K queries on server start</div>
                    <div>• <strong>Async refresh:</strong> Refresh cache before TTL expires</div>
                    <div>• <strong>Thundering herd protection:</strong> Single-flight pattern (coalesce requests)</div>
                    <div>• <strong>Negative caching:</strong> Cache "no results" to avoid DB queries</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Load Balancing */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-orange-600">⚖️</span>
                Load Balancing & Auto-Scaling
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-3">Global Load Balancing</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• Route53 geo-routing to nearest region</div>
                    <div>• Latency-based routing</div>
                    <div>• Health checks every 30s</div>
                    <div>• Failover to backup region</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3">Regional Load Balancing</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• ALB (Application Load Balancer)</div>
                    <div>• Weighted round-robin</div>
                    <div>• Sticky sessions (optional)</div>
                    <div>• Connection draining</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-3">Auto-Scaling</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Trigger:</strong> CPU &gt; 70%</div>
                    <div>• <strong>Action:</strong> Add 20% instances</div>
                    <div>• <strong>Cooldown:</strong> 5 minutes</div>
                    <div>• <strong>Min:</strong> 50, <strong>Max:</strong> 5000</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Optimizations */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-green-600">🚀</span>
                Performance Optimizations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="font-bold text-green-900 mb-3 text-lg">Trie Optimizations</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Compressed trie (PATRICIA):</strong> Merge single-child chains</div>
                    <div>• <strong>Pre-computed suggestions:</strong> Store top N at each node</div>
                    <div>• <strong>Bloom filter:</strong> Quick existence check before traversal</div>
                    <div>• <strong>Memory-mapped I/O:</strong> Fast file access without loading entire trie</div>
                    <div>• <strong>Lock-free reads:</strong> Immutable trie structure for concurrent access</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="font-bold text-blue-900 mb-3 text-lg">API Optimizations</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Compression:</strong> Gzip API responses (80% reduction)</div>
                    <div>• <strong>HTTP/2:</strong> Multiplexing, header compression</div>
                    <div>• <strong>Keep-alive:</strong> Persistent connections</div>
                    <div>• <strong>Batching:</strong> Batch multiple prefix queries if needed</div>
                    <div>• <strong>Edge caching:</strong> CDN caches responses at edge (10-min TTL)</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="font-bold text-purple-900 mb-3 text-lg">Client Optimizations</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Debouncing:</strong> Wait 200ms after keystroke</div>
                    <div>• <strong>Throttling:</strong> Max 1 request per 100ms</div>
                    <div>• <strong>Request cancellation:</strong> Cancel pending on new keystroke</div>
                    <div>• <strong>Client-side cache:</strong> Cache in browser (5-min TTL)</div>
                    <div>• <strong>Prefetching:</strong> Predict next character, prefetch suggestions</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <div className="font-bold text-orange-900 mb-3 text-lg">Monitoring & Alerts</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Latency:</strong> P50, P90, P99, P999 metrics</div>
                    <div>• <strong>Cache hit rate:</strong> Target &gt;95%</div>
                    <div>• <strong>Error rate:</strong> Alert if &gt;0.1%</div>
                    <div>• <strong>QPS:</strong> Monitor spikes</div>
                    <div>• <strong>Distributed tracing:</strong> Jaeger for debugging</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-indigo-600">🛠️</span>
                Technology Stack
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200">
                  <h3 className="font-bold text-indigo-900 mb-4">Backend Services</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">API Layer: Go</div>
                      <div className="text-gray-700">High performance, low latency, excellent concurrency</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Stream Processing: Apache Flink</div>
                      <div className="text-gray-700">Real-time aggregation, windowing, exactly-once semantics</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Message Queue: Kafka</div>
                      <div className="text-gray-700">High throughput, durable, replay capability</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4">Data Storage</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">Trie Storage: PostgreSQL + In-Memory</div>
                      <div className="text-gray-700">Persistent storage, fast in-memory access</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Query Logs: Cassandra</div>
                      <div className="text-gray-700">Write-optimized, high throughput for logs</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Cache: Redis Cluster</div>
                      <div className="text-gray-700">Low latency, high throughput, automatic sharding</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Analytics: ClickHouse</div>
                      <div className="text-gray-700">Columnar OLAP, fast aggregations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Design Trade-offs */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-orange-600">⚖️</span>
                Key Design Trade-offs
              </h2>

              <div className="space-y-6">
                {/* Trie vs Database */}
                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-orange-900 mb-4">1. Trie vs Database Index for Prefix Matching</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2">Trie (Prefix Tree)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• O(k) prefix lookup (k = prefix length)</div>
                        <div>• Efficient memory usage with compression</div>
                        <div>• Fast in-memory access</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Large memory footprint (~1 TB)</div>
                        <div>• Complex to maintain and update</div>
                        <div>• Requires custom implementation</div>
                      </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-blue-200">
                      <div className="font-bold text-blue-700 mb-2">Database (LIKE query)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Simple implementation (SQL)</div>
                        <div>• No custom data structure needed</div>
                        <div>• Easier to update</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Slow: O(n) scan even with index</div>
                        <div>• High latency (&gt;500ms for 1B rows)</div>
                        <div>• Full-text index doesn't help for prefix</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-100 p-4 rounded-lg border-2 border-purple-300">
                    <div className="font-bold text-purple-900 mb-2">🎯 Our Decision: Trie with Database Backup</div>
                    <div className="text-sm text-gray-800">
                      Use in-memory Trie for real-time queries (low latency). Use database (PostgreSQL) for persistent storage and daily trie rebuilds. Best of both: fast queries + durable storage.
                    </div>
                  </div>
                </div>

                {/* Pre-compute vs On-the-fly */}
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">2. Pre-compute Suggestions vs On-the-fly Ranking</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2">Pre-compute (Store at Nodes)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Ultra-fast lookup: O(1) after prefix match</div>
                        <div>• Predictable latency (&lt;50ms)</div>
                        <div>• No ranking computation per request</div>
                        <div><strong>Cons:</strong></div>
                        <div>• More memory (store top N per node)</div>
                        <div>• Less personalized (global ranking)</div>
                        <div>• Stale data until next trie update</div>
                      </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-orange-200">
                      <div className="font-bold text-orange-700 mb-2">On-the-fly Ranking</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Fully personalized suggestions</div>
                        <div>• Real-time ranking adjustments</div>
                        <div>• Fresh data (no staleness)</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Higher latency (50-100ms extra for ML model)</div>
                        <div>• More CPU intensive</div>
                        <div>• Variable latency (P99 can spike)</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-100 p-4 rounded-lg border-2 border-cyan-300">
                    <div className="font-bold text-cyan-900 mb-2">🎯 Our Decision: Hybrid Approach</div>
                    <div className="text-sm text-gray-800">
                      Pre-compute global top 10 at each trie node for fast baseline. Then apply lightweight personalization layer (boost user's past queries, filter by language). Balances speed (pre-computed) with relevance (personalized).
                    </div>
                  </div>
                </div>

                {/* Cache TTL */}
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-900 mb-4">3. Short TTL vs Long TTL for Cache</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-blue-200">
                      <div className="font-bold text-blue-700 mb-2">Short TTL (5 minutes)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Fresh data, trending queries appear quickly</div>
                        <div>• Less stale results</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Higher cache miss rate</div>
                        <div>• More database/trie queries</div>
                        <div>• Higher latency on cache miss</div>
                      </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-purple-200">
                      <div className="font-bold text-purple-700 mb-2">Long TTL (1 hour)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• High cache hit rate (&gt;95%)</div>
                        <div>• Low latency (most queries hit cache)</div>
                        <div>• Reduced load on trie servers</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Stale data for trending queries</div>
                        <div>• Delayed updates (up to 1 hour)</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-100 p-4 rounded-lg border-2 border-emerald-300">
                    <div className="font-bold text-emerald-900 mb-2">🎯 Our Decision: Adaptive TTL</div>
                    <div className="text-sm text-gray-800">
                      Use 1-hour TTL for stable queries (long-tail). Use 5-minute TTL for trending/volatile prefixes. Detect trending queries via analytics, and invalidate their cache keys proactively. Best of both: high hit rate + fresh trends.
                    </div>
                  </div>
                </div>

                {/* Personalization */}
                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">4. Global Suggestions vs Personalized Suggestions</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2">Global (Same for Everyone)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Simple implementation</div>
                        <div>• High cache hit rate (shared cache)</div>
                        <div>• Fast (no personalization overhead)</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Less relevant for individual users</div>
                        <div>• Ignores user context and history</div>
                      </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-orange-200">
                      <div className="font-bold text-orange-700 mb-2">Personalized (Per User)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Highly relevant to user</div>
                        <div>• Better user experience</div>
                        <div>• Considers context (location, history)</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Low cache hit rate (unique per user)</div>
                        <div>• Slower (ML model inference)</div>
                        <div>• Privacy concerns (user tracking)</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-violet-100 p-4 rounded-lg border-2 border-violet-300">
                    <div className="font-bold text-violet-900 mb-2">🎯 Our Decision: Lightweight Personalization Layer</div>
                    <div className="text-sm text-gray-800">
                      Start with global suggestions (cached). Apply lightweight personalization: boost user's recent queries, filter by language/locale. This adds ~10-20ms but significantly improves relevance. Full ML personalization for logged-in users only (premium feature).
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Considerations */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-pink-600">💡</span>
                Additional Considerations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-pink-50 p-6 rounded-xl">
                  <h3 className="font-bold text-pink-900 mb-3">Content Filtering</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div>• <strong>Offensive content:</strong> Filter profanity, hate speech</div>
                    <div>• <strong>Spam detection:</strong> Block suspicious queries</div>
                    <div>• <strong>Trending abuse:</strong> Detect and filter manipulated trends</div>
                    <div>• <strong>DMCA compliance:</strong> Remove copyrighted content</div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="font-bold text-red-900 mb-3">Multi-language Support</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div>• <strong>Separate tries:</strong> One trie per language</div>
                    <div>• <strong>Unicode support:</strong> Handle non-ASCII characters</div>
                    <div>• <strong>Tokenization:</strong> Language-specific (e.g., Chinese)</div>
                    <div>• <strong>Translation:</strong> Suggest translations for popular queries</div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="font-bold text-yellow-900 mb-3">Disaster Recovery</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div>• <strong>Backups:</strong> Hourly snapshots to S3</div>
                    <div>• <strong>Multi-region:</strong> Active-active in 3 regions</div>
                    <div>• <strong>Failover:</strong> Automatic DNS failover (RTO &lt;1 min)</div>
                    <div>• <strong>Data loss:</strong> RPO &lt;5 minutes (incremental updates)</div>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl">
                  <h3 className="font-bold text-indigo-900 mb-3">Cost Optimization</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div>• <strong>CDN:</strong> Offload 40% traffic to edge (reduce server cost)</div>
                    <div>• <strong>Compression:</strong> Gzip reduces bandwidth by 80%</div>
                    <div>• <strong>Spot instances:</strong> Use for batch trie rebuilds</div>
                    <div>• <strong>Reserved capacity:</strong> 50% reserved, 50% on-demand</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

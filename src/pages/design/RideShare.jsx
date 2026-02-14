import React, { useState } from 'react';
import {
  ChevronDown, ChevronRight, MapPin, Users, Zap, Shield, Activity,
  AlertCircle, Check, Server, Database, Globe, Cloud, Network, Radio,
  Clock, TrendingUp, Layers, GitBranch, Box, FileText, Navigation
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import CompletionCheckbox from '../../components/CompletionCheckbox';

// SVG Diagram Components with Uber-inspired black/white theme

// 1. High-Level Architecture Diagram
const RideShareArchitectureDiagram = () => (
  <svg viewBox="0 0 900 500" className="w-full h-auto">
    <defs>
      <linearGradient id="uberBlack" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a1a1a" />
        <stop offset="100%" stopColor="#2d2d2d" />
      </linearGradient>
      <linearGradient id="uberGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06c167" />
        <stop offset="100%" stopColor="#04a659" />
      </linearGradient>
      <linearGradient id="uberBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#276ef1" />
        <stop offset="100%" stopColor="#1a5ed9" />
      </linearGradient>
      <linearGradient id="uberPurple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7356bf" />
        <stop offset="100%" stopColor="#5e45a8" />
      </linearGradient>
      <linearGradient id="uberOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f6b900" />
        <stop offset="100%" stopColor="#e5a800" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>

    {/* Background */}
    <rect width="900" height="500" fill="#0d0d0d" rx="12"/>

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">High-Level System Architecture</text>

    {/* Client Layer */}
    <g transform="translate(50, 60)">
      <rect width="160" height="80" rx="8" fill="url(#uberBlack)" stroke="#3d3d3d" strokeWidth="2" filter="url(#shadow)"/>
      <text x="80" y="35" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">Rider App</text>
      <text x="80" y="55" textAnchor="middle" fill="#9ca3af" fontSize="11">iOS / Android</text>
      <circle cx="80" cy="70" r="4" fill="#06c167"/>
    </g>

    <g transform="translate(250, 60)">
      <rect width="160" height="80" rx="8" fill="url(#uberBlack)" stroke="#3d3d3d" strokeWidth="2" filter="url(#shadow)"/>
      <text x="80" y="35" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">Driver App</text>
      <text x="80" y="55" textAnchor="middle" fill="#9ca3af" fontSize="11">Real-time GPS</text>
      <circle cx="80" cy="70" r="4" fill="#06c167"/>
    </g>

    {/* Arrows from clients to API Gateway */}
    <path d="M130 140 L130 170 L450 170 L450 200" stroke="#06c167" strokeWidth="2" fill="none" markerEnd="url(#arrowGreen)"/>
    <path d="M330 140 L330 170 L450 170 L450 200" stroke="#06c167" strokeWidth="2" fill="none"/>

    <defs>
      <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06c167"/>
      </marker>
      <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#276ef1"/>
      </marker>
      <marker id="arrowPurple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#7356bf"/>
      </marker>
    </defs>

    {/* API Gateway */}
    <g transform="translate(350, 200)">
      <rect width="200" height="70" rx="8" fill="url(#uberGreen)" filter="url(#shadow)"/>
      <text x="100" y="30" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">API Gateway</text>
      <text x="100" y="50" textAnchor="middle" fill="#e8f5e9" fontSize="11">Load Balancer / Auth / Rate Limit</text>
    </g>

    {/* Arrow from Gateway to Services */}
    <path d="M450 270 L450 310" stroke="#276ef1" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)"/>

    {/* Services Layer */}
    <g transform="translate(50, 320)">
      <rect width="130" height="70" rx="8" fill="url(#uberBlue)" filter="url(#shadow)"/>
      <text x="65" y="30" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Ride Service</text>
      <text x="65" y="48" textAnchor="middle" fill="#e3f2fd" fontSize="10">{`Booking & Status`}</text>
    </g>

    <g transform="translate(200, 320)">
      <rect width="130" height="70" rx="8" fill="url(#uberBlue)" filter="url(#shadow)"/>
      <text x="65" y="30" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Driver Service</text>
      <text x="65" y="48" textAnchor="middle" fill="#e3f2fd" fontSize="10">{`Location & Avail`}</text>
    </g>

    <g transform="translate(350, 320)">
      <rect width="130" height="70" rx="8" fill="url(#uberBlue)" filter="url(#shadow)"/>
      <text x="65" y="30" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Matching</text>
      <text x="65" y="48" textAnchor="middle" fill="#e3f2fd" fontSize="10">AI Algorithm</text>
    </g>

    <g transform="translate(500, 320)">
      <rect width="130" height="70" rx="8" fill="url(#uberBlue)" filter="url(#shadow)"/>
      <text x="65" y="30" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Payment</text>
      <text x="65" y="48" textAnchor="middle" fill="#e3f2fd" fontSize="10">Transactions</text>
    </g>

    <g transform="translate(650, 320)">
      <rect width="130" height="70" rx="8" fill="url(#uberBlue)" filter="url(#shadow)"/>
      <text x="65" y="30" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Notification</text>
      <text x="65" y="48" textAnchor="middle" fill="#e3f2fd" fontSize="10">Push / SMS</text>
    </g>

    {/* Arrows from Services to Databases */}
    <path d="M265 390 L265 420" stroke="#7356bf" strokeWidth="2" fill="none"/>
    <path d="M415 390 L415 420" stroke="#7356bf" strokeWidth="2" fill="none"/>
    <path d="M565 390 L565 420" stroke="#7356bf" strokeWidth="2" fill="none" markerEnd="url(#arrowPurple)"/>

    {/* Database Layer */}
    <g transform="translate(100, 420)">
      <rect width="120" height="60" rx="8" fill="url(#uberPurple)" filter="url(#shadow)"/>
      <text x="60" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">PostgreSQL</text>
      <text x="60" y="45" textAnchor="middle" fill="#ede7f6" fontSize="10">Primary Data</text>
    </g>

    <g transform="translate(240, 420)">
      <rect width="120" height="60" rx="8" fill="url(#uberPurple)" filter="url(#shadow)"/>
      <text x="60" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Redis</text>
      <text x="60" y="45" textAnchor="middle" fill="#ede7f6" fontSize="10">{`Cache & GEO`}</text>
    </g>

    <g transform="translate(380, 420)">
      <rect width="120" height="60" rx="8" fill="url(#uberPurple)" filter="url(#shadow)"/>
      <text x="60" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">MongoDB</text>
      <text x="60" y="45" textAnchor="middle" fill="#ede7f6" fontSize="10">Ride History</text>
    </g>

    <g transform="translate(520, 420)">
      <rect width="120" height="60" rx="8" fill="url(#uberPurple)" filter="url(#shadow)"/>
      <text x="60" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Kafka</text>
      <text x="60" y="45" textAnchor="middle" fill="#ede7f6" fontSize="10">Event Stream</text>
    </g>

    <g transform="translate(660, 420)">
      <rect width="120" height="60" rx="8" fill="url(#uberPurple)" filter="url(#shadow)"/>
      <text x="60" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Cassandra</text>
      <text x="60" y="45" textAnchor="middle" fill="#ede7f6" fontSize="10">Time Series</text>
    </g>

    {/* Web App */}
    <g transform="translate(690, 60)">
      <rect width="160" height="80" rx="8" fill="url(#uberBlack)" stroke="#3d3d3d" strokeWidth="2" filter="url(#shadow)"/>
      <text x="80" y="35" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">Web Dashboard</text>
      <text x="80" y="55" textAnchor="middle" fill="#9ca3af" fontSize="11">Admin Portal</text>
      <circle cx="80" cy="70" r="4" fill="#f6b900"/>
    </g>

    <path d="M770 140 L770 170 L450 170" stroke="#f6b900" strokeWidth="2" fill="none"/>

    {/* Legend */}
    <g transform="translate(20, 485)">
      <rect x="0" y="-10" width="12" height="12" rx="2" fill="url(#uberBlack)"/>
      <text x="18" y="0" fill="#9ca3af" fontSize="10">Client Apps</text>
      <rect x="100" y="-10" width="12" height="12" rx="2" fill="url(#uberGreen)"/>
      <text x="118" y="0" fill="#9ca3af" fontSize="10">Gateway</text>
      <rect x="180" y="-10" width="12" height="12" rx="2" fill="url(#uberBlue)"/>
      <text x="198" y="0" fill="#9ca3af" fontSize="10">Services</text>
      <rect x="260" y="-10" width="12" height="12" rx="2" fill="url(#uberPurple)"/>
      <text x="278" y="0" fill="#9ca3af" fontSize="10">Data Stores</text>
    </g>
  </svg>
);

// 2. Matching Algorithm Diagram
const MatchingAlgorithmDiagram = () => (
  <svg viewBox="0 0 900 480" className="w-full h-auto">
    <defs>
      <linearGradient id="matchGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06c167" />
        <stop offset="100%" stopColor="#04a659" />
      </linearGradient>
      <linearGradient id="matchBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#276ef1" />
        <stop offset="100%" stopColor="#1a5ed9" />
      </linearGradient>
      <linearGradient id="matchOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6b35" />
        <stop offset="100%" stopColor="#e55a2b" />
      </linearGradient>
      <radialGradient id="searchRadius" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#06c167" stopOpacity="0.3"/>
        <stop offset="70%" stopColor="#06c167" stopOpacity="0.1"/>
        <stop offset="100%" stopColor="#06c167" stopOpacity="0"/>
      </radialGradient>
      <filter id="matchShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>

    <rect width="900" height="480" fill="#0d0d0d" rx="12"/>
    <text x="450" y="35" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">Driver-Rider Matching with Geospatial Indexing</text>

    {/* Geospatial Map Area */}
    <g transform="translate(50, 60)">
      <rect width="380" height="320" rx="8" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="2"/>
      <text x="190" y="25" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">Geospatial Search Area</text>

      {/* Search Radius Circle */}
      <circle cx="190" cy="180" r="120" fill="url(#searchRadius)" stroke="#06c167" strokeWidth="2" strokeDasharray="8,4"/>
      <text x="190" y="310" textAnchor="middle" fill="#06c167" fontSize="11">5km Radius</text>

      {/* Rider (center) */}
      <g transform="translate(175, 165)">
        <circle r="20" fill="#276ef1" stroke="#ffffff" strokeWidth="3"/>
        <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">R</text>
      </g>
      <text x="190" y="220" textAnchor="middle" fill="#276ef1" fontSize="10">Rider Location</text>

      {/* Driver 1 - Closest */}
      <g transform="translate(120, 120)">
        <circle r="15" fill="#06c167" stroke="#ffffff" strokeWidth="2"/>
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">D1</text>
      </g>
      <text x="120" y="100" textAnchor="middle" fill="#06c167" fontSize="9">0.8km - Score: 95</text>

      {/* Driver 2 */}
      <g transform="translate(270, 140)">
        <circle r="15" fill="#06c167" stroke="#ffffff" strokeWidth="2"/>
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">D2</text>
      </g>
      <text x="270" y="120" textAnchor="middle" fill="#06c167" fontSize="9">1.2km - Score: 88</text>

      {/* Driver 3 */}
      <g transform="translate(150, 240)">
        <circle r="15" fill="#06c167" stroke="#ffffff" strokeWidth="2"/>
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">D3</text>
      </g>
      <text x="150" y="270" textAnchor="middle" fill="#06c167" fontSize="9">2.1km - Score: 72</text>

      {/* Driver 4 - Edge of radius */}
      <g transform="translate(280, 260)">
        <circle r="15" fill="#f6b900" stroke="#ffffff" strokeWidth="2"/>
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">D4</text>
      </g>
      <text x="280" y="290" textAnchor="middle" fill="#f6b900" fontSize="9">4.5km - Score: 45</text>

      {/* Driver 5 - Outside radius */}
      <g transform="translate(350, 100)">
        <circle r="15" fill="#ff6b35" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,2"/>
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">D5</text>
      </g>
      <text x="350" y="80" textAnchor="middle" fill="#ff6b35" fontSize="9">Outside Range</text>

      {/* Match line */}
      <line x1="190" y1="180" x2="120" y2="120" stroke="#06c167" strokeWidth="3" strokeDasharray="6,3">
        <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1s" repeatCount="indefinite"/>
      </line>
    </g>

    {/* Algorithm Steps */}
    <g transform="translate(470, 60)">
      <rect width="380" height="320" rx="8" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="2"/>
      <text x="190" y="25" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">Matching Algorithm</text>

      {/* Step 1 */}
      <g transform="translate(20, 45)">
        <rect width="340" height="50" rx="6" fill="#276ef1" filter="url(#matchShadow)"/>
        <circle cx="25" cy="25" r="12" fill="#ffffff"/>
        <text x="25" y="30" textAnchor="middle" fill="#276ef1" fontSize="12" fontWeight="bold">1</text>
        <text x="50" y="20" fill="#ffffff" fontSize="11" fontWeight="bold">Redis GEORADIUS Query</text>
        <text x="50" y="38" fill="#e3f2fd" fontSize="10">GEORADIUS drivers lat lng 5 km WITHDIST</text>
      </g>

      {/* Step 2 */}
      <g transform="translate(20, 105)">
        <rect width="340" height="50" rx="6" fill="#06c167" filter="url(#matchShadow)"/>
        <circle cx="25" cy="25" r="12" fill="#ffffff"/>
        <text x="25" y="30" textAnchor="middle" fill="#06c167" fontSize="12" fontWeight="bold">2</text>
        <text x="50" y="20" fill="#ffffff" fontSize="11" fontWeight="bold">Filter Available Drivers</text>
        <text x="50" y="38" fill="#e8f5e9" fontSize="10">Status: AVAILABLE, No active ride</text>
      </g>

      {/* Step 3 */}
      <g transform="translate(20, 165)">
        <rect width="340" height="50" rx="6" fill="#7356bf" filter="url(#matchShadow)"/>
        <circle cx="25" cy="25" r="12" fill="#ffffff"/>
        <text x="25" y="30" textAnchor="middle" fill="#7356bf" fontSize="12" fontWeight="bold">3</text>
        <text x="50" y="20" fill="#ffffff" fontSize="11" fontWeight="bold">Calculate Driver Score</text>
        <text x="50" y="38" fill="#ede7f6" fontSize="10">Score = (1/dist)*0.5 + rating*0.3 + (1/ETA)*0.2</text>
      </g>

      {/* Step 4 */}
      <g transform="translate(20, 225)">
        <rect width="340" height="50" rx="6" fill="#f6b900" filter="url(#matchShadow)"/>
        <circle cx="25" cy="25" r="12" fill="#1a1a1a"/>
        <text x="25" y="30" textAnchor="middle" fill="#f6b900" fontSize="12" fontWeight="bold">4</text>
        <text x="50" y="20" fill="#1a1a1a" fontSize="11" fontWeight="bold">Select Best Match</text>
        <text x="50" y="38" fill="#3d3d3d" fontSize="10">Optimistic lock + Send push notification</text>
      </g>

      {/* Metrics */}
      <g transform="translate(20, 285)">
        <rect width="155" height="28" rx="4" fill="#2d2d2d"/>
        <text x="78" y="19" textAnchor="middle" fill="#06c167" fontSize="11" fontWeight="bold">{`Latency: <500ms`}</text>
      </g>
      <g transform="translate(185, 285)">
        <rect width="175" height="28" rx="4" fill="#2d2d2d"/>
        <text x="88" y="19" textAnchor="middle" fill="#06c167" fontSize="11" fontWeight="bold">Match Rate: 99.5%</text>
      </g>
    </g>

    {/* H3 Hexagonal Grid Explanation */}
    <g transform="translate(50, 400)">
      <rect width="800" height="65" rx="8" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="2"/>
      <text x="20" y="25" fill="#ffffff" fontSize="12" fontWeight="bold">H3 Hexagonal Index:</text>
      <text x="20" y="45" fill="#9ca3af" fontSize="11">Uses Uber's H3 library for hierarchical spatial indexing. Hexagons provide uniform distance calculations and efficient neighbor lookups.</text>

      {/* Mini hexagons */}
      <g transform="translate(700, 32)">
        <polygon points="0,-12 10,-6 10,6 0,12 -10,6 -10,-6" fill="#06c167" stroke="#ffffff" strokeWidth="1"/>
        <polygon points="18,-6 28,0 28,12 18,18 8,12 8,0" fill="#06c167" stroke="#ffffff" strokeWidth="1" opacity="0.7"/>
        <polygon points="-18,-6 -8,0 -8,12 -18,18 -28,12 -28,0" fill="#06c167" stroke="#ffffff" strokeWidth="1" opacity="0.7"/>
      </g>
    </g>
  </svg>
);

// 3. Real-Time Location Diagram
const RealTimeLocationDiagram = () => (
  <svg viewBox="0 0 900 420" className="w-full h-auto">
    <defs>
      <linearGradient id="locGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06c167" />
        <stop offset="100%" stopColor="#04a659" />
      </linearGradient>
      <linearGradient id="locBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#276ef1" />
        <stop offset="100%" stopColor="#1a5ed9" />
      </linearGradient>
      <linearGradient id="locPurple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7356bf" />
        <stop offset="100%" stopColor="#5e45a8" />
      </linearGradient>
      <filter id="locShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
      <marker id="arrowWhite" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ffffff"/>
      </marker>
    </defs>

    <rect width="900" height="420" fill="#0d0d0d" rx="12"/>
    <text x="450" y="35" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">Real-Time Location Tracking Flow</text>

    {/* Driver Phone */}
    <g transform="translate(50, 70)">
      <rect width="120" height="180" rx="12" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="3"/>
      <rect x="10" y="30" width="100" height="130" rx="4" fill="#2d2d2d"/>
      <circle cx="60" cy="175" r="6" fill="#3d3d3d"/>
      <text x="60" y="55" textAnchor="middle" fill="#06c167" fontSize="11" fontWeight="bold">Driver App</text>

      {/* GPS Signal */}
      <g transform="translate(60, 100)">
        <circle r="8" fill="#06c167"/>
        <circle r="16" fill="none" stroke="#06c167" strokeWidth="1" opacity="0.6">
          <animate attributeName="r" values="16;30;16" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle r="24" fill="none" stroke="#06c167" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="24;40;24" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
        </circle>
      </g>
      <text x="60" y="145" textAnchor="middle" fill="#9ca3af" fontSize="9">GPS: 4Hz</text>
    </g>

    {/* Arrow 1 */}
    <g transform="translate(175, 150)">
      <line x1="0" y1="0" x2="60" y2="0" stroke="#06c167" strokeWidth="3" markerEnd="url(#arrowWhite)"/>
      <text x="30" y="-10" textAnchor="middle" fill="#06c167" fontSize="9">WebSocket</text>
      <text x="30" y="20" textAnchor="middle" fill="#9ca3af" fontSize="8">lat, lng, heading</text>
    </g>

    {/* Location Gateway */}
    <g transform="translate(250, 100)">
      <rect width="140" height="100" rx="8" fill="url(#locGreen)" filter="url(#locShadow)"/>
      <text x="70" y="35" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Location</text>
      <text x="70" y="52" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Gateway</text>
      <text x="70" y="75" textAnchor="middle" fill="#e8f5e9" fontSize="10">Batching</text>
      <text x="70" y="90" textAnchor="middle" fill="#e8f5e9" fontSize="10">Compression</text>
    </g>

    {/* Arrow 2 */}
    <g transform="translate(395, 150)">
      <line x1="0" y1="0" x2="50" y2="0" stroke="#276ef1" strokeWidth="3" markerEnd="url(#arrowWhite)"/>
      <text x="25" y="-10" textAnchor="middle" fill="#276ef1" fontSize="9">Kafka</text>
    </g>

    {/* Kafka */}
    <g transform="translate(455, 100)">
      <rect width="120" height="100" rx="8" fill="url(#locBlue)" filter="url(#locShadow)"/>
      <text x="60" y="35" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Kafka</text>
      <text x="60" y="55" textAnchor="middle" fill="#e3f2fd" fontSize="10">locations topic</text>
      <text x="60" y="75" textAnchor="middle" fill="#e3f2fd" fontSize="9">Partitioned by</text>
      <text x="60" y="90" textAnchor="middle" fill="#e3f2fd" fontSize="9">driver_id</text>
    </g>

    {/* Arrow 3 - to Redis */}
    <g transform="translate(580, 130)">
      <line x1="0" y1="0" x2="50" y2="-30" stroke="#7356bf" strokeWidth="3" markerEnd="url(#arrowWhite)"/>
    </g>

    {/* Arrow 4 - to Location Service */}
    <g transform="translate(580, 170)">
      <line x1="0" y1="0" x2="50" y2="30" stroke="#7356bf" strokeWidth="3" markerEnd="url(#arrowWhite)"/>
    </g>

    {/* Redis GEO */}
    <g transform="translate(640, 60)">
      <rect width="130" height="80" rx="8" fill="url(#locPurple)" filter="url(#locShadow)"/>
      <text x="65" y="30" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Redis GEO</text>
      <text x="65" y="50" textAnchor="middle" fill="#ede7f6" fontSize="10">GEOADD</text>
      <text x="65" y="68" textAnchor="middle" fill="#ede7f6" fontSize="10">drivers:active</text>
    </g>

    {/* Location Service */}
    <g transform="translate(640, 160)">
      <rect width="130" height="80" rx="8" fill="url(#locPurple)" filter="url(#locShadow)"/>
      <text x="65" y="30" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Location Svc</text>
      <text x="65" y="50" textAnchor="middle" fill="#ede7f6" fontSize="10">Broadcast to</text>
      <text x="65" y="68" textAnchor="middle" fill="#ede7f6" fontSize="10">active riders</text>
    </g>

    {/* Arrow to Rider */}
    <g transform="translate(775, 200)">
      <line x1="0" y1="0" x2="40" y2="0" stroke="#06c167" strokeWidth="3" markerEnd="url(#arrowWhite)"/>
    </g>

    {/* Rider Phone */}
    <g transform="translate(820, 110)">
      <rect width="60" height="100" rx="8" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="2"/>
      <rect x="5" y="15" width="50" height="65" rx="2" fill="#2d2d2d"/>

      {/* Moving dot animation */}
      <circle cx="30" cy="45" r="4" fill="#06c167">
        <animate attributeName="cx" values="20;40;20" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="35;55;35" dur="3s" repeatCount="indefinite"/>
      </circle>
      <text x="30" y="95" textAnchor="middle" fill="#9ca3af" fontSize="8">Rider</text>
    </g>

    {/* Bottom Stats Section */}
    <g transform="translate(50, 280)">
      <rect width="800" height="120" rx="8" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="2"/>
      <text x="400" y="25" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">Location Update Pipeline Metrics</text>

      {/* Metric Boxes */}
      <g transform="translate(30, 45)">
        <rect width="145" height="55" rx="6" fill="#2d2d2d"/>
        <text x="72" y="25" textAnchor="middle" fill="#06c167" fontSize="18" fontWeight="bold">100K/sec</text>
        <text x="72" y="45" textAnchor="middle" fill="#9ca3af" fontSize="10">Location Updates</text>
      </g>

      <g transform="translate(195, 45)">
        <rect width="145" height="55" rx="6" fill="#2d2d2d"/>
        <text x="72" y="25" textAnchor="middle" fill="#276ef1" fontSize="18" fontWeight="bold">&lt;100ms</text>
        <text x="72" y="45" textAnchor="middle" fill="#9ca3af" fontSize="10">End-to-End Latency</text>
      </g>

      <g transform="translate(360, 45)">
        <rect width="145" height="55" rx="6" fill="#2d2d2d"/>
        <text x="72" y="25" textAnchor="middle" fill="#7356bf" fontSize="18" fontWeight="bold">4 Hz</text>
        <text x="72" y="45" textAnchor="middle" fill="#9ca3af" fontSize="10">Update Frequency</text>
      </g>

      <g transform="translate(525, 45)">
        <rect width="145" height="55" rx="6" fill="#2d2d2d"/>
        <text x="72" y="25" textAnchor="middle" fill="#f6b900" fontSize="18" fontWeight="bold">3m</text>
        <text x="72" y="45" textAnchor="middle" fill="#9ca3af" fontSize="10">GPS Accuracy</text>
      </g>

      <g transform="translate(690, 45)">
        <rect width="80" height="55" rx="6" fill="#2d2d2d"/>
        <text x="40" y="25" textAnchor="middle" fill="#ff6b35" fontSize="18" fontWeight="bold">H3</text>
        <text x="40" y="45" textAnchor="middle" fill="#9ca3af" fontSize="10">Index</text>
      </g>
    </g>
  </svg>
);

// 4. Dynamic Pricing Diagram
const PricingDiagram = () => (
  <svg viewBox="0 0 900 450" className="w-full h-auto">
    <defs>
      <linearGradient id="priceRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="priceOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f6b900" />
        <stop offset="100%" stopColor="#e5a800" />
      </linearGradient>
      <linearGradient id="priceGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06c167" />
        <stop offset="100%" stopColor="#04a659" />
      </linearGradient>
      <linearGradient id="priceBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#276ef1" />
        <stop offset="100%" stopColor="#1a5ed9" />
      </linearGradient>
      <filter id="priceShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>

    <rect width="900" height="450" fill="#0d0d0d" rx="12"/>
    <text x="450" y="35" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">Dynamic / Surge Pricing Calculation</text>

    {/* Supply-Demand Graph */}
    <g transform="translate(50, 60)">
      <rect width="350" height="250" rx="8" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="2"/>
      <text x="175" y="25" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Supply vs Demand</text>

      {/* Axes */}
      <line x1="50" y1="220" x2="320" y2="220" stroke="#3d3d3d" strokeWidth="2"/>
      <line x1="50" y1="220" x2="50" y2="50" stroke="#3d3d3d" strokeWidth="2"/>
      <text x="185" y="245" textAnchor="middle" fill="#9ca3af" fontSize="10">Time</text>
      <text x="25" y="135" textAnchor="middle" fill="#9ca3af" fontSize="10" transform="rotate(-90, 25, 135)">Volume</text>

      {/* Demand curve (higher) */}
      <path d="M60 180 Q120 100 180 120 Q240 140 300 80" stroke="#ef4444" strokeWidth="3" fill="none"/>
      <text x="310" y="75" fill="#ef4444" fontSize="10" fontWeight="bold">Demand</text>

      {/* Supply curve (lower) */}
      <path d="M60 200 Q120 190 180 185 Q240 180 300 170" stroke="#06c167" strokeWidth="3" fill="none"/>
      <text x="310" y="175" fill="#06c167" fontSize="10" fontWeight="bold">Supply</text>

      {/* Gap area highlight */}
      <path d="M180 120 Q240 140 300 80 L300 170 Q240 180 180 185 Z" fill="#ef4444" opacity="0.15"/>

      {/* Surge indicator */}
      <g transform="translate(240, 95)">
        <rect width="60" height="25" rx="4" fill="#ef4444"/>
        <text x="30" y="17" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">2.5x</text>
      </g>
    </g>

    {/* Pricing Formula */}
    <g transform="translate(430, 60)">
      <rect width="420" height="120" rx="8" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="2"/>
      <text x="210" y="25" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Surge Pricing Formula</text>

      <g transform="translate(20, 45)">
        <rect width="380" height="55" rx="6" fill="#2d2d2d"/>
        <text x="190" y="25" textAnchor="middle" fill="#f6b900" fontSize="14" fontWeight="bold" fontFamily="monospace">
          surge = max(1.0, demand / supply)
        </text>
        <text x="190" y="45" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="monospace">
          final_price = base_fare * surge * distance_rate
        </text>
      </g>
    </g>

    {/* Pricing Factors */}
    <g transform="translate(430, 195)">
      <rect width="420" height="190" rx="8" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="2"/>
      <text x="210" y="25" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Pricing Factors</text>

      {/* Factor 1 */}
      <g transform="translate(15, 40)">
        <rect width="120" height="65" rx="6" fill="url(#priceRed)" filter="url(#priceShadow)"/>
        <text x="60" y="28" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Demand</text>
        <text x="60" y="45" textAnchor="middle" fill="#fee2e2" fontSize="9">Active requests</text>
        <text x="60" y="58" textAnchor="middle" fill="#fee2e2" fontSize="9">in area</text>
      </g>

      {/* Factor 2 */}
      <g transform="translate(150, 40)">
        <rect width="120" height="65" rx="6" fill="url(#priceGreen)" filter="url(#priceShadow)"/>
        <text x="60" y="28" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Supply</text>
        <text x="60" y="45" textAnchor="middle" fill="#e8f5e9" fontSize="9">Available drivers</text>
        <text x="60" y="58" textAnchor="middle" fill="#e8f5e9" fontSize="9">in area</text>
      </g>

      {/* Factor 3 */}
      <g transform="translate(285, 40)">
        <rect width="120" height="65" rx="6" fill="url(#priceBlue)" filter="url(#priceShadow)"/>
        <text x="60" y="28" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">External</text>
        <text x="60" y="45" textAnchor="middle" fill="#e3f2fd" fontSize="9">Weather, events</text>
        <text x="60" y="58" textAnchor="middle" fill="#e3f2fd" fontSize="9">time of day</text>
      </g>

      {/* Factor 4 */}
      <g transform="translate(15, 115)">
        <rect width="120" height="65" rx="6" fill="url(#priceOrange)" filter="url(#priceShadow)"/>
        <text x="60" y="28" textAnchor="middle" fill="#1a1a1a" fontSize="11" fontWeight="bold">Historical</text>
        <text x="60" y="45" textAnchor="middle" fill="#3d3d3d" fontSize="9">ML predictions</text>
        <text x="60" y="58" textAnchor="middle" fill="#3d3d3d" fontSize="9">pattern analysis</text>
      </g>

      {/* Factor 5 */}
      <g transform="translate(150, 115)">
        <rect width="120" height="65" rx="6" fill="#7356bf" filter="url(#priceShadow)"/>
        <text x="60" y="28" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Distance</text>
        <text x="60" y="45" textAnchor="middle" fill="#ede7f6" fontSize="9">Route length</text>
        <text x="60" y="58" textAnchor="middle" fill="#ede7f6" fontSize="9">+ traffic ETA</text>
      </g>

      {/* Factor 6 */}
      <g transform="translate(285, 115)">
        <rect width="120" height="65" rx="6" fill="#06b6d4" filter="url(#priceShadow)"/>
        <text x="60" y="28" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Vehicle Type</text>
        <text x="60" y="45" textAnchor="middle" fill="#e0f7fa" fontSize="9">UberX, Comfort</text>
        <text x="60" y="58" textAnchor="middle" fill="#e0f7fa" fontSize="9">Black, XL</text>
      </g>
    </g>

    {/* Surge Levels */}
    <g transform="translate(50, 330)">
      <rect width="800" height="100" rx="8" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="2"/>
      <text x="400" y="25" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Surge Multiplier Levels</text>

      {/* Level bars */}
      <g transform="translate(40, 45)">
        <rect width="80" height="40" rx="4" fill="#06c167"/>
        <text x="40" y="18" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">1.0x</text>
        <text x="40" y="33" textAnchor="middle" fill="#e8f5e9" fontSize="9">Normal</text>
      </g>

      <g transform="translate(140, 45)">
        <rect width="80" height="40" rx="4" fill="#84cc16"/>
        <text x="40" y="18" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">1.2x</text>
        <text x="40" y="33" textAnchor="middle" fill="#ecfccb" fontSize="9">Low</text>
      </g>

      <g transform="translate(240, 45)">
        <rect width="80" height="40" rx="4" fill="#f6b900"/>
        <text x="40" y="18" textAnchor="middle" fill="#1a1a1a" fontSize="14" fontWeight="bold">1.5x</text>
        <text x="40" y="33" textAnchor="middle" fill="#3d3d3d" fontSize="9">Moderate</text>
      </g>

      <g transform="translate(340, 45)">
        <rect width="80" height="40" rx="4" fill="#fb923c"/>
        <text x="40" y="18" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">1.8x</text>
        <text x="40" y="33" textAnchor="middle" fill="#ffedd5" fontSize="9">High</text>
      </g>

      <g transform="translate(440, 45)">
        <rect width="80" height="40" rx="4" fill="#f87171"/>
        <text x="40" y="18" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">2.0x</text>
        <text x="40" y="33" textAnchor="middle" fill="#fee2e2" fontSize="9">Very High</text>
      </g>

      <g transform="translate(540, 45)">
        <rect width="80" height="40" rx="4" fill="#ef4444"/>
        <text x="40" y="18" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">2.5x</text>
        <text x="40" y="33" textAnchor="middle" fill="#fee2e2" fontSize="9">Peak</text>
      </g>

      <g transform="translate(640, 45)">
        <rect width="80" height="40" rx="4" fill="#dc2626"/>
        <text x="40" y="18" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">3.0x+</text>
        <text x="40" y="33" textAnchor="middle" fill="#fee2e2" fontSize="9">Extreme</text>
      </g>

      {/* Arrow */}
      <line x1="40" y1="50" x2="720" y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" opacity="0.3"/>
    </g>
  </svg>
);

// 5. Trip Lifecycle Diagram
const TripLifecycleDiagram = () => (
  <svg viewBox="0 0 900 500" className="w-full h-auto">
    <defs>
      <linearGradient id="tripBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#276ef1" />
        <stop offset="100%" stopColor="#1a5ed9" />
      </linearGradient>
      <linearGradient id="tripGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06c167" />
        <stop offset="100%" stopColor="#04a659" />
      </linearGradient>
      <linearGradient id="tripOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f6b900" />
        <stop offset="100%" stopColor="#e5a800" />
      </linearGradient>
      <linearGradient id="tripPurple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7356bf" />
        <stop offset="100%" stopColor="#5e45a8" />
      </linearGradient>
      <linearGradient id="tripCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <filter id="tripShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
      <marker id="tripArrow" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#06c167"/>
      </marker>
    </defs>

    <rect width="900" height="500" fill="#0d0d0d" rx="12"/>
    <text x="450" y="35" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">Complete Trip Lifecycle</text>

    {/* Main Flow - Top Row */}
    {/* Step 1: Request */}
    <g transform="translate(50, 70)">
      <rect width="140" height="100" rx="10" fill="url(#tripBlue)" filter="url(#tripShadow)"/>
      <circle cx="20" cy="20" r="14" fill="#ffffff"/>
      <text x="20" y="25" textAnchor="middle" fill="#276ef1" fontSize="14" fontWeight="bold">1</text>
      <text x="70" y="50" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">REQUEST</text>
      <text x="70" y="70" textAnchor="middle" fill="#e3f2fd" fontSize="10">Rider opens app</text>
      <text x="70" y="85" textAnchor="middle" fill="#e3f2fd" fontSize="10">Sets pickup/dest</text>
    </g>

    {/* Arrow 1-2 */}
    <line x1="195" y1="120" x2="230" y2="120" stroke="#06c167" strokeWidth="3" markerEnd="url(#tripArrow)"/>

    {/* Step 2: Match */}
    <g transform="translate(235, 70)">
      <rect width="140" height="100" rx="10" fill="url(#tripGreen)" filter="url(#tripShadow)"/>
      <circle cx="20" cy="20" r="14" fill="#ffffff"/>
      <text x="20" y="25" textAnchor="middle" fill="#06c167" fontSize="14" fontWeight="bold">2</text>
      <text x="70" y="50" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">MATCH</text>
      <text x="70" y="70" textAnchor="middle" fill="#e8f5e9" fontSize="10">Find nearest driver</text>
      <text x="70" y="85" textAnchor="middle" fill="#e8f5e9" fontSize="10">{`Score & assign`}</text>
    </g>

    {/* Arrow 2-3 */}
    <line x1="380" y1="120" x2="415" y2="120" stroke="#06c167" strokeWidth="3" markerEnd="url(#tripArrow)"/>

    {/* Step 3: Pickup */}
    <g transform="translate(420, 70)">
      <rect width="140" height="100" rx="10" fill="url(#tripOrange)" filter="url(#tripShadow)"/>
      <circle cx="20" cy="20" r="14" fill="#1a1a1a"/>
      <text x="20" y="25" textAnchor="middle" fill="#f6b900" fontSize="14" fontWeight="bold">3</text>
      <text x="70" y="50" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="bold">PICKUP</text>
      <text x="70" y="70" textAnchor="middle" fill="#3d3d3d" fontSize="10">Driver en route</text>
      <text x="70" y="85" textAnchor="middle" fill="#3d3d3d" fontSize="10">Arrival confirm</text>
    </g>

    {/* Arrow 3-4 */}
    <line x1="565" y1="120" x2="600" y2="120" stroke="#06c167" strokeWidth="3" markerEnd="url(#tripArrow)"/>

    {/* Step 4: Trip */}
    <g transform="translate(605, 70)">
      <rect width="140" height="100" rx="10" fill="url(#tripPurple)" filter="url(#tripShadow)"/>
      <circle cx="20" cy="20" r="14" fill="#ffffff"/>
      <text x="20" y="25" textAnchor="middle" fill="#7356bf" fontSize="14" fontWeight="bold">4</text>
      <text x="70" y="50" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">IN TRIP</text>
      <text x="70" y="70" textAnchor="middle" fill="#ede7f6" fontSize="10">Live navigation</text>
      <text x="70" y="85" textAnchor="middle" fill="#ede7f6" fontSize="10">Real-time tracking</text>
    </g>

    {/* Arrow 4-5 */}
    <line x1="750" y1="120" x2="785" y2="120" stroke="#06c167" strokeWidth="3" markerEnd="url(#tripArrow)"/>

    {/* Step 5: Dropoff - Wraps down */}
    <g transform="translate(750, 70)">
      <rect width="100" height="100" rx="10" fill="url(#tripCyan)" filter="url(#tripShadow)"/>
      <circle cx="15" cy="15" r="12" fill="#ffffff"/>
      <text x="15" y="20" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="bold">5</text>
      <text x="50" y="50" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">DROPOFF</text>
      <text x="50" y="68" textAnchor="middle" fill="#e0f7fa" fontSize="9">Destination</text>
      <text x="50" y="82" textAnchor="middle" fill="#e0f7fa" fontSize="9">reached</text>
    </g>

    {/* Arrow down to Payment */}
    <path d="M800 175 L800 210 L675 210 L675 230" stroke="#06c167" strokeWidth="3" fill="none" markerEnd="url(#tripArrow)"/>

    {/* Step 6: Payment */}
    <g transform="translate(605, 235)">
      <rect width="140" height="100" rx="10" fill="#ef4444" filter="url(#tripShadow)"/>
      <circle cx="20" cy="20" r="14" fill="#ffffff"/>
      <text x="20" y="25" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">6</text>
      <text x="70" y="50" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">PAYMENT</text>
      <text x="70" y="70" textAnchor="middle" fill="#fee2e2" fontSize="10">Auto-charge</text>
      <text x="70" y="85" textAnchor="middle" fill="#fee2e2" fontSize="10">Receipt sent</text>
    </g>

    {/* Status Timeline */}
    <g transform="translate(50, 210)">
      <rect width="520" height="130" rx="8" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="2"/>
      <text x="260" y="25" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Ride Status State Machine</text>

      {/* Status boxes */}
      <g transform="translate(20, 45)">
        <rect width="70" height="30" rx="4" fill="#276ef1"/>
        <text x="35" y="20" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">PENDING</text>
      </g>

      <text x="100" y="65" fill="#06c167" fontSize="16">→</text>

      <g transform="translate(115, 45)">
        <rect width="70" height="30" rx="4" fill="#06c167"/>
        <text x="35" y="20" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">MATCHED</text>
      </g>

      <text x="195" y="65" fill="#06c167" fontSize="16">→</text>

      <g transform="translate(210, 45)">
        <rect width="70" height="30" rx="4" fill="#f6b900"/>
        <text x="35" y="20" textAnchor="middle" fill="#1a1a1a" fontSize="9" fontWeight="bold">ARRIVING</text>
      </g>

      <text x="290" y="65" fill="#06c167" fontSize="16">→</text>

      <g transform="translate(305, 45)">
        <rect width="70" height="30" rx="4" fill="#7356bf"/>
        <text x="35" y="20" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">IN_TRIP</text>
      </g>

      <text x="385" y="65" fill="#06c167" fontSize="16">→</text>

      <g transform="translate(400, 45)">
        <rect width="90" height="30" rx="4" fill="#06b6d4"/>
        <text x="45" y="20" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">COMPLETED</text>
      </g>

      {/* Cancel path */}
      <g transform="translate(20, 95)">
        <rect width="65" height="25" rx="4" fill="#ef4444"/>
        <text x="32" y="17" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">CANCELLED</text>
      </g>
      <text x="95" y="112" fill="#9ca3af" fontSize="9">(from any state before IN_TRIP)</text>
    </g>

    {/* Events Panel */}
    <g transform="translate(50, 360)">
      <rect width="800" height="120" rx="8" fill="#1a1a1a" stroke="#3d3d3d" strokeWidth="2"/>
      <text x="400" y="25" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Kafka Events Published During Trip</text>

      {/* Event boxes */}
      <g transform="translate(20, 45)">
        <rect width="115" height="55" rx="6" fill="#276ef1"/>
        <text x="57" y="20" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">ride.requested</text>
        <text x="57" y="38" textAnchor="middle" fill="#e3f2fd" fontSize="8">rider_id, pickup</text>
        <text x="57" y="50" textAnchor="middle" fill="#e3f2fd" fontSize="8">destination</text>
      </g>

      <g transform="translate(150, 45)">
        <rect width="115" height="55" rx="6" fill="#06c167"/>
        <text x="57" y="20" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">driver.matched</text>
        <text x="57" y="38" textAnchor="middle" fill="#e8f5e9" fontSize="8">driver_id, eta</text>
        <text x="57" y="50" textAnchor="middle" fill="#e8f5e9" fontSize="8">vehicle_info</text>
      </g>

      <g transform="translate(280, 45)">
        <rect width="115" height="55" rx="6" fill="#f6b900"/>
        <text x="57" y="20" textAnchor="middle" fill="#1a1a1a" fontSize="10" fontWeight="bold">driver.arrived</text>
        <text x="57" y="38" textAnchor="middle" fill="#3d3d3d" fontSize="8">timestamp</text>
        <text x="57" y="50" textAnchor="middle" fill="#3d3d3d" fontSize="8">location</text>
      </g>

      <g transform="translate(410, 45)">
        <rect width="115" height="55" rx="6" fill="#7356bf"/>
        <text x="57" y="20" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">trip.started</text>
        <text x="57" y="38" textAnchor="middle" fill="#ede7f6" fontSize="8">start_time</text>
        <text x="57" y="50" textAnchor="middle" fill="#ede7f6" fontSize="8">route_id</text>
      </g>

      <g transform="translate(540, 45)">
        <rect width="115" height="55" rx="6" fill="#06b6d4"/>
        <text x="57" y="20" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">trip.completed</text>
        <text x="57" y="38" textAnchor="middle" fill="#e0f7fa" fontSize="8">distance, duration</text>
        <text x="57" y="50" textAnchor="middle" fill="#e0f7fa" fontSize="8">final_fare</text>
      </g>

      <g transform="translate(670, 45)">
        <rect width="110" height="55" rx="6" fill="#ef4444"/>
        <text x="55" y="20" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">payment.processed</text>
        <text x="55" y="38" textAnchor="middle" fill="#fee2e2" fontSize="8">amount, method</text>
        <text x="55" y="50" textAnchor="middle" fill="#fee2e2" fontSize="8">receipt_url</text>
      </g>
    </g>
  </svg>
);

export default function RideShare({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('architecture');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Fault Tolerance Components
  const faultToleranceComponents = [
    {
      id: 'load-balancing',
      name: 'Load Balancing & Auto-Scaling',
      icon: Network,
      color: 'from-blue-500 to-blue-600',
      components: [
        'AWS Application Load Balancer (ALB)',
        'NGINX Layer 7 Load Balancer',
        'Auto Scaling Groups (Min: 5, Max: 50 instances)',
        'Health Check Endpoints (/health, /ready)',
        'Connection Draining (30s timeout)'
      ],
      faultTolerance: [
        'Multi-AZ deployment across 3 availability zones',
        'Auto-scaling based on CPU (>70%) and request count (>1000/min)',
        'Unhealthy instance replacement within 2 minutes',
        'Zero-downtime deployments with blue-green strategy',
        'Sticky sessions disabled for stateless architecture'
      ],
      metrics: 'Target: 99.95% uptime, Handles 50K concurrent connections'
    },
    {
      id: 'service-mesh',
      name: 'Service Mesh & Circuit Breakers',
      icon: GitBranch,
      color: 'from-purple-500 to-purple-600',
      components: [
        'Istio Service Mesh',
        'Envoy Sidecar Proxies',
        'Circuit Breaker (Hystrix/Resilience4j)',
        'Retry Logic with Exponential Backoff',
        'Bulkhead Pattern for Resource Isolation'
      ],
      faultTolerance: [
        'Circuit Breaker: Open after 5 consecutive failures',
        'Half-Open state: Test with 3 requests after 30s',
        'Timeout: 5s for driver matching, 3s for payment',
        'Retry: 3 attempts with exponential backoff (100ms, 200ms, 400ms)',
        'Fallback: Degraded mode - manual driver assignment'
      ],
      metrics: 'Prevents cascade failures, Reduces latency from 2s to 500ms'
    },
    {
      id: 'database-replication',
      name: 'Database Replication & Sharding',
      icon: Database,
      color: 'from-green-500 to-green-600',
      components: [
        'PostgreSQL Primary-Replica Setup (1 Primary + 3 Replicas)',
        'MongoDB Sharded Cluster (5 shards, 3 replicas each)',
        'Redis Sentinel (3 masters + 3 replicas)',
        'Cassandra Ring (9 nodes, RF=3)',
        'Automatic Failover with Patroni'
      ],
      faultTolerance: [
        'PostgreSQL: Automatic failover to replica in <30s',
        'MongoDB: Writes continue if 2/3 replicas available',
        'Redis Sentinel: Promotes replica to master automatically',
        'Cassandra: No single point of failure, quorum reads/writes',
        'Cross-region replication for disaster recovery'
      ],
      metrics: 'RPO: 1 minute, RTO: 30 seconds, 99.99% data durability'
    },
    {
      id: 'caching',
      name: 'Multi-Layer Caching Strategy',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      components: [
        'CDN Cache (CloudFront) - Static Assets',
        'Redis Cache (L1) - Hot Data',
        'Application Cache (L2) - Caffeine',
        'Database Query Cache (L3)',
        'Cache Invalidation via Pub/Sub'
      ],
      faultTolerance: [
        'CDN: 200+ edge locations, automatic failover',
        'Redis: Sentinel for HA, async replication',
        'Cache-aside pattern: Application continues if cache fails',
        'Write-through for critical data (user profiles)',
        'TTL-based expiration + event-driven invalidation'
      ],
      metrics: 'Cache hit rate: 95%, Latency reduction: 10x faster'
    },
    {
      id: 'message-queue',
      name: 'Message Queue & Event Streaming',
      icon: Radio,
      color: 'from-pink-500 to-pink-600',
      components: [
        'Apache Kafka (9 brokers, 3-node ZooKeeper)',
        'RabbitMQ for transactional messages',
        'Amazon SQS for dead letter queues',
        'Amazon SNS for fan-out notifications',
        'Kafka Streams for real-time processing'
      ],
      faultTolerance: [
        'Kafka: Replication factor 3, min in-sync replicas 2',
        'Consumer groups: Multiple consumers for parallelism',
        'Dead Letter Queue: Retry failed messages 3 times',
        'At-least-once delivery guarantee',
        'Idempotent producers and consumers'
      ],
      metrics: 'Throughput: 100K messages/sec, Lag: <100ms'
    },
    {
      id: 'geospatial',
      name: 'Geospatial Services & Routing',
      icon: MapPin,
      color: 'from-cyan-500 to-cyan-600',
      components: [
        'Redis Geospatial Index (GEORADIUS)',
        'Google S2 Geometry Library',
        'H3 Hexagonal Hierarchical Geospatial Indexing',
        'PostGIS for polygon searches',
        'GraphHopper for route optimization'
      ],
      faultTolerance: [
        'Distributed geospatial index across 5 Redis shards',
        'Fallback to PostGIS if Redis fails',
        'Pre-computed routes cached for 1 hour',
        'Real-time traffic data from multiple sources',
        'Graceful degradation: Use straight-line distance if routing fails'
      ],
      metrics: 'Match radius: 5km, Match time: <500ms, 99.9% accuracy'
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Observability',
      icon: Activity,
      color: 'from-red-500 to-red-600',
      components: [
        'Prometheus + Grafana for metrics',
        'ELK Stack for centralized logging',
        'Jaeger for distributed tracing',
        'PagerDuty for alerting',
        'AWS CloudWatch for infrastructure metrics'
      ],
      faultTolerance: [
        'Multi-region Prometheus with federation',
        'Log retention: 30 days hot, 1 year cold (S3)',
        'Trace sampling: 10% in production, 100% in staging',
        'Alerts: Latency >1s, Error rate >1%, Downtime >1min',
        'Self-healing: Auto-restart failed containers'
      ],
      metrics: 'MTTD: <1 minute, MTTR: <5 minutes'
    }
  ];

  // Real-time Matching Algorithm
  const matchingAlgorithm = {
    title: 'Real-Time Driver-Rider Matching',
    steps: [
      {
        step: '1. Rider Request',
        description: 'Rider submits pickup location and destination',
        latency: '<100ms',
        details: 'POST /api/rides with lat/lng coordinates',
        faultTolerance: 'Retry 3 times if request fails, fallback to phone booking'
      },
      {
        step: '2. Geospatial Query',
        description: 'Find available drivers within 5km radius',
        latency: '<200ms',
        details: 'Redis GEORADIUS query: GEORADIUS drivers:available {lat} {lng} 5 km WITHDIST',
        faultTolerance: 'If Redis fails, query PostGIS (slower but reliable)'
      },
      {
        step: '3. Driver Scoring',
        description: 'Score drivers based on distance, rating, ETA',
        latency: '<100ms',
        details: 'Score = (1/distance) * 0.5 + rating * 0.3 + (1/ETA) * 0.2',
        faultTolerance: 'Parallel scoring across multiple threads'
      },
      {
        step: '4. Match Assignment',
        description: 'Assign highest-scoring driver, send push notification',
        latency: '<200ms',
        details: 'Optimistic locking with version check to prevent double-booking',
        faultTolerance: 'If driver rejects, reassign to next best in <5s'
      },
      {
        step: '5. Real-Time Updates',
        description: 'WebSocket connection for live driver location',
        latency: '<1s updates',
        details: 'Driver location streamed via WebSocket, buffered to reduce bandwidth',
        faultTolerance: 'Fallback to HTTP long-polling if WebSocket fails'
      }
    ]
  };

  // System Scale
  const systemScale = {
    title: 'System Scale & Capacity',
    metrics: [
      {
        metric: 'Daily Active Users',
        value: '10 Million',
        calculation: '5M riders + 5M drivers',
        infrastructure: '50 application servers, 10 PostgreSQL replicas'
      },
      {
        metric: 'Concurrent Rides',
        value: '500,000',
        calculation: 'Peak: 10M users * 10% utilization * 50% peak multiplier',
        infrastructure: 'Redis: 100K ops/sec, Kafka: 50K messages/sec'
      },
      {
        metric: 'Requests per Second',
        value: '200,000 RPS',
        calculation: 'Location updates (100K RPS) + API calls (100K RPS)',
        infrastructure: 'Load balancers: 5 instances, Auto-scaling: 20-50 app servers'
      },
      {
        metric: 'Database Writes',
        value: '50,000 writes/sec',
        calculation: 'Ride updates + driver locations + payments',
        infrastructure: 'MongoDB sharded: 10K writes/shard/sec across 5 shards'
      },
      {
        metric: 'Data Storage',
        value: '50 TB',
        calculation: 'Rides: 20TB, Locations: 15TB, Payments: 10TB, Logs: 5TB',
        infrastructure: 'S3 for cold storage, EBS for hot data'
      }
    ]
  };

  // Disaster Recovery
  const disasterRecovery = {
    title: 'Disaster Recovery & Business Continuity',
    strategies: [
      {
        scenario: 'Single Server Failure',
        impact: 'Minimal - Load redistributed',
        recovery: 'Auto-scaling launches replacement in 2-3 minutes',
        rto: '<5 minutes',
        rpo: '0 (no data loss)'
      },
      {
        scenario: 'Database Primary Failure',
        impact: 'Read-only mode for 30 seconds',
        recovery: 'Patroni promotes replica to primary automatically',
        rto: '<30 seconds',
        rpo: '<1 minute'
      },
      {
        scenario: 'Availability Zone Outage',
        impact: '33% capacity reduction',
        recovery: 'Traffic rerouted to healthy AZs, auto-scaling compensates',
        rto: '<2 minutes',
        rpo: '<5 minutes'
      },
      {
        scenario: 'Region Outage',
        impact: 'Service degraded to backup region',
        recovery: 'DNS failover to secondary region (us-west-2)',
        rto: '<15 minutes',
        rpo: '<10 minutes'
      },
      {
        scenario: 'Complete System Compromise',
        impact: 'Full outage',
        recovery: 'Restore from daily backups, rebuild infrastructure from IaC',
        rto: '<4 hours',
        rpo: '<24 hours'
      }
    ]
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)' }}>
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {onBack && (
            <button
              onClick={onBack}
              style={{
                marginBottom: '2rem',
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
          )}

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Fault-Tolerant Ride Share</h1>
              <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg text-xs font-bold uppercase tracking-wide">High Availability</span>
            </div>
            <p className="text-xl text-gray-300 mb-6 font-light">
              Production-grade ride sharing platform · 10M users · 500K concurrent rides · 99.99% uptime
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-4 py-2 bg-blue-900/30 text-blue-400 rounded-lg text-sm font-medium border border-blue-700">Multi-AZ Deployment</span>
              <span className="px-4 py-2 bg-green-900/30 text-green-400 rounded-lg text-sm font-medium border border-green-700">Auto-Scaling</span>
              <span className="px-4 py-2 bg-purple-900/30 text-purple-400 rounded-lg text-sm font-medium border border-purple-700">Circuit Breakers</span>
              <span className="px-4 py-2 bg-orange-900/30 text-orange-400 rounded-lg text-sm font-medium border border-orange-700">Real-Time Matching</span>
              <span className="px-4 py-2 bg-pink-900/30 text-pink-400 rounded-lg text-sm font-medium border border-pink-700">Geospatial Indexing</span>
            </div>
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
            {[
              { id: 'architecture', label: 'Fault Tolerance' },
              { id: 'diagram', label: 'Component Diagram' },
              { id: 'matching', label: 'Real-Time Matching' },
              { id: 'scale', label: 'Scale & Capacity' },
              { id: 'recovery', label: 'Disaster Recovery' }
            ].map(tab => (
              <div key={tab.id} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.8)' }}>
                  <CompletionCheckbox problemId={`RideShare-${tab.id}`} />
                </div>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    backgroundColor: activeTab === tab.id ? '#374151' : 'transparent',
                    color: activeTab === tab.id ? '#60a5fa' : '#9ca3af',
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

          {/* Component Diagram Tab */}
          {activeTab === 'diagram' && (
            <div className="space-y-8">
              {/* High-Level Architecture SVG Diagram */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Server className="w-7 h-7 text-blue-400" />
                  System Architecture Overview
                </h2>
                <RideShareArchitectureDiagram />
              </div>

              {/* Trip Lifecycle SVG Diagram */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Navigation className="w-7 h-7 text-green-400" />
                  Complete Trip Lifecycle
                </h2>
                <TripLifecycleDiagram />
              </div>

              {/* Legend */}
              <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Layers className="w-7 h-7 text-gray-300" />
                  Component Architecture Legend
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-blue-900/30 p-3 rounded-lg border-2 border-blue-700">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="font-semibold text-blue-400">Client Layer</span>
                  </div>
                  <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg border-2 border-purple-700">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="font-semibold text-purple-400">Gateway</span>
                  </div>
                  <div className="flex items-center gap-3 bg-indigo-900/30 p-3 rounded-lg border-2 border-indigo-700">
                    <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                    <span className="font-semibold text-indigo-400">Service Mesh</span>
                  </div>
                  <div className="flex items-center gap-3 bg-green-900/30 p-3 rounded-lg border-2 border-green-700">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="font-semibold text-green-400">Application Services</span>
                  </div>
                  <div className="flex items-center gap-3 bg-cyan-900/30 p-3 rounded-lg border-2 border-cyan-700">
                    <div className="w-4 h-4 bg-cyan-500 rounded"></div>
                    <span className="font-semibold text-cyan-400">Geospatial</span>
                  </div>
                  <div className="flex items-center gap-3 bg-pink-900/30 p-3 rounded-lg border-2 border-pink-700">
                    <div className="w-4 h-4 bg-pink-500 rounded"></div>
                    <span className="font-semibold text-pink-400">Message Bus</span>
                  </div>
                  <div className="flex items-center gap-3 bg-yellow-900/30 p-3 rounded-lg border-2 border-yellow-700">
                    <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                    <span className="font-semibold text-yellow-400">Data Stores</span>
                  </div>
                  <div className="flex items-center gap-3 bg-orange-900/30 p-3 rounded-lg border-2 border-orange-700">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="font-semibold text-orange-400">External Services</span>
                  </div>
                  <div className="flex items-center gap-3 bg-red-900/30 p-3 rounded-lg border-2 border-red-700">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="font-semibold text-red-400">Observability</span>
                  </div>
                </div>
              </div>

              {/* Main Component Diagram */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border-2 border-slate-600 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Box className="w-8 h-8 text-blue-400" />
                  System Component Architecture
                </h2>

                {/* Layer 1: Client Layer */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Layer 1: Client Applications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-500 p-4 rounded-xl shadow-lg border-2 border-blue-300">
                      <div className="text-white font-bold text-lg mb-1">Rider Mobile App</div>
                      <div className="text-blue-100 text-sm">iOS/Android • React Native</div>
                    </div>
                    <div className="bg-blue-500 p-4 rounded-xl shadow-lg border-2 border-blue-300">
                      <div className="text-white font-bold text-lg mb-1">Driver Mobile App</div>
                      <div className="text-blue-100 text-sm">iOS/Android • Real-time GPS</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center my-4">
                  <div className="text-white text-2xl">↓</div>
                </div>

                {/* Layer 2: Gateway Layer */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Layer 2: API Gateway & Load Balancing
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-500 p-4 rounded-xl shadow-lg border-2 border-purple-300">
                      <div className="text-white font-bold text-lg mb-1">AWS ALB</div>
                      <div className="text-purple-100 text-sm">Multi-AZ • Auto-scaling</div>
                    </div>
                    <div className="bg-purple-500 p-4 rounded-xl shadow-lg border-2 border-purple-300">
                      <div className="text-white font-bold text-lg mb-1">API Gateway</div>
                      <div className="text-purple-100 text-sm">Rate Limiting • Auth • TLS</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center my-4">
                  <div className="text-white text-2xl">↓</div>
                </div>

                {/* Layer 3: Service Mesh */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    Layer 3: Service Mesh & Resilience
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-indigo-500 p-4 rounded-xl shadow-lg border-2 border-indigo-300">
                      <div className="text-white font-bold text-lg mb-1">Istio</div>
                      <div className="text-indigo-100 text-sm">Traffic Management</div>
                    </div>
                    <div className="bg-indigo-500 p-4 rounded-xl shadow-lg border-2 border-indigo-300">
                      <div className="text-white font-bold text-lg mb-1">Envoy Proxy</div>
                      <div className="text-indigo-100 text-sm">Sidecar Pattern</div>
                    </div>
                    <div className="bg-indigo-500 p-4 rounded-xl shadow-lg border-2 border-indigo-300">
                      <div className="text-white font-bold text-lg mb-1">Circuit Breaker</div>
                      <div className="text-indigo-100 text-sm">Resilience4j</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center my-4">
                  <div className="text-white text-2xl">↓</div>
                </div>

                {/* Layer 4: Application Services */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Layer 4: Microservices
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">Ride Service</div>
                      <div className="text-green-100 text-sm">Booking • Status</div>
                    </div>
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">Driver Service</div>
                      <div className="text-green-100 text-sm">Availability • Location</div>
                    </div>
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">Matching Service</div>
                      <div className="text-green-100 text-sm">AI-based Matching</div>
                    </div>
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">Payment Service</div>
                      <div className="text-green-100 text-sm">Processing • Wallet</div>
                    </div>
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">Notification Service</div>
                      <div className="text-green-100 text-sm">Push • SMS • Email</div>
                    </div>
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">User Service</div>
                      <div className="text-green-100 text-sm">Profile • Auth</div>
                    </div>
                  </div>
                </div>

                {/* Arrows Down - Split to Geospatial and Message Bus */}
                <div className="flex justify-around my-4">
                  <div className="text-white text-2xl">↓</div>
                  <div className="text-white text-2xl">↓</div>
                </div>

                {/* Layer 5 & 6: Geospatial and Message Bus (Side by Side) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Geospatial Services */}
                  <div>
                    <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Layer 5: Geospatial
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-cyan-500 p-4 rounded-xl shadow-lg border-2 border-cyan-300">
                        <div className="text-white font-bold text-lg mb-1">Redis GEO</div>
                        <div className="text-cyan-100 text-sm">GEORADIUS • 5km search</div>
                      </div>
                      <div className="bg-cyan-500 p-4 rounded-xl shadow-lg border-2 border-cyan-300">
                        <div className="text-white font-bold text-lg mb-1">PostGIS</div>
                        <div className="text-cyan-100 text-sm">Polygon searches</div>
                      </div>
                      <div className="bg-cyan-500 p-4 rounded-xl shadow-lg border-2 border-cyan-300">
                        <div className="text-white font-bold text-lg mb-1">GraphHopper</div>
                        <div className="text-cyan-100 text-sm">Route optimization</div>
                      </div>
                    </div>
                  </div>

                  {/* Message Bus */}
                  <div>
                    <h3 className="text-xl font-bold text-pink-300 mb-4 flex items-center gap-2">
                      <Radio className="w-5 h-5" />
                      Layer 6: Event Bus
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-pink-500 p-4 rounded-xl shadow-lg border-2 border-pink-300">
                        <div className="text-white font-bold text-lg mb-1">Kafka</div>
                        <div className="text-pink-100 text-sm">Event Streaming • 100K/sec</div>
                      </div>
                      <div className="bg-pink-500 p-4 rounded-xl shadow-lg border-2 border-pink-300">
                        <div className="text-white font-bold text-lg mb-1">RabbitMQ</div>
                        <div className="text-pink-100 text-sm">Transactional messages</div>
                      </div>
                      <div className="bg-pink-500 p-4 rounded-xl shadow-lg border-2 border-pink-300">
                        <div className="text-white font-bold text-lg mb-1">SQS/SNS</div>
                        <div className="text-pink-100 text-sm">Dead letter queue</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center my-4">
                  <div className="text-white text-2xl">↓</div>
                </div>

                {/* Layer 7: Data Stores */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Layer 7: Data Persistence
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-yellow-600 p-4 rounded-xl shadow-lg border-2 border-yellow-400">
                      <div className="text-white font-bold text-lg mb-1">PostgreSQL</div>
                      <div className="text-yellow-100 text-sm">Primary + 3 Replicas</div>
                    </div>
                    <div className="bg-yellow-600 p-4 rounded-xl shadow-lg border-2 border-yellow-400">
                      <div className="text-white font-bold text-lg mb-1">MongoDB</div>
                      <div className="text-yellow-100 text-sm">5 Shards • 3 Replicas</div>
                    </div>
                    <div className="bg-yellow-600 p-4 rounded-xl shadow-lg border-2 border-yellow-400">
                      <div className="text-white font-bold text-lg mb-1">Redis</div>
                      <div className="text-yellow-100 text-sm">Cache • Sentinel HA</div>
                    </div>
                    <div className="bg-yellow-600 p-4 rounded-xl shadow-lg border-2 border-yellow-400">
                      <div className="text-white font-bold text-lg mb-1">Cassandra</div>
                      <div className="text-yellow-100 text-sm">9 Nodes • RF=3</div>
                    </div>
                  </div>
                </div>

                {/* Layer 8: External Services */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-orange-300 mb-4 flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    Layer 8: External Integrations
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-orange-500 p-4 rounded-xl shadow-lg border-2 border-orange-300">
                      <div className="text-white font-bold text-lg mb-1">Maps API</div>
                      <div className="text-orange-100 text-sm">Google Maps • Routing</div>
                    </div>
                    <div className="bg-orange-500 p-4 rounded-xl shadow-lg border-2 border-orange-300">
                      <div className="text-white font-bold text-lg mb-1">Payment Gateway</div>
                      <div className="text-orange-100 text-sm">Stripe • PayPal</div>
                    </div>
                    <div className="bg-orange-500 p-4 rounded-xl shadow-lg border-2 border-orange-300">
                      <div className="text-white font-bold text-lg mb-1">Push Notifications</div>
                      <div className="text-orange-100 text-sm">FCM • APNs</div>
                    </div>
                  </div>
                </div>

                {/* Layer 9: Observability */}
                <div>
                  <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Layer 9: Monitoring & Observability
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-red-500 p-4 rounded-xl shadow-lg border-2 border-red-300">
                      <div className="text-white font-bold text-lg mb-1">Prometheus</div>
                      <div className="text-red-100 text-sm">Metrics Collection</div>
                    </div>
                    <div className="bg-red-500 p-4 rounded-xl shadow-lg border-2 border-red-300">
                      <div className="text-white font-bold text-lg mb-1">Grafana</div>
                      <div className="text-red-100 text-sm">Dashboards</div>
                    </div>
                    <div className="bg-red-500 p-4 rounded-xl shadow-lg border-2 border-red-300">
                      <div className="text-white font-bold text-lg mb-1">ELK Stack</div>
                      <div className="text-red-100 text-sm">Centralized Logging</div>
                    </div>
                    <div className="bg-red-500 p-4 rounded-xl shadow-lg border-2 border-red-300">
                      <div className="text-white font-bold text-lg mb-1">Jaeger</div>
                      <div className="text-red-100 text-sm">Distributed Tracing</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Flow Diagram with Patterns */}
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 border-2 border-indigo-700 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Network className="w-8 h-8 text-indigo-300" />
                  Component Flow with Design Patterns
                </h2>

                {/* Flow 1: Client to Gateway */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Globe className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Client Apps</div>
                      <div className="text-sm text-blue-100">Rider & Driver</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-purple-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-purple-400"></div>
                        </div>
                      </div>
                      <div className="bg-purple-900/30 border-2 border-purple-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-purple-300 text-sm">API Gateway Pattern</div>
                        <div className="text-xs text-purple-400">Single entry point • HTTPS/TLS 1.3</div>
                      </div>
                    </div>

                    <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Shield className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">API Gateway</div>
                      <div className="text-sm text-purple-100">ALB + Auth</div>
                    </div>
                  </div>
                </div>

                {/* Flow 2: Gateway to Service Mesh */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Shield className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">API Gateway</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-indigo-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-indigo-400"></div>
                        </div>
                      </div>
                      <div className="bg-indigo-900/30 border-2 border-indigo-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-indigo-300 text-sm">Service Mesh Pattern</div>
                        <div className="text-xs text-indigo-400">Sidecar Proxy • mTLS</div>
                      </div>
                    </div>

                    <div className="bg-indigo-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Network className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Istio/Envoy</div>
                      <div className="text-sm text-indigo-100">Service Mesh</div>
                    </div>
                  </div>
                </div>

                {/* Flow 3: Service Mesh to Microservices */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-indigo-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Network className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Service Mesh</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-green-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-green-400"></div>
                        </div>
                      </div>
                      <div className="bg-green-900/30 border-2 border-green-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-green-300 text-sm">Circuit Breaker Pattern</div>
                        <div className="text-xs text-green-400">Fault Tolerance • Resilience4j</div>
                      </div>
                    </div>

                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Microservices</div>
                      <div className="text-sm text-green-100">Ride/Driver/Payment</div>
                    </div>
                  </div>
                </div>

                {/* Flow 4: Matching Service to Geospatial */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Matching Service</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-cyan-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-cyan-400"></div>
                        </div>
                      </div>
                      <div className="bg-cyan-900/30 border-2 border-cyan-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-cyan-300 text-sm">Geospatial Indexing</div>
                        <div className="text-xs text-cyan-400">GEORADIUS • {'<500ms'} • 5km radius</div>
                      </div>
                    </div>

                    <div className="bg-cyan-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Redis GEO</div>
                      <div className="text-sm text-cyan-100">PostGIS Fallback</div>
                    </div>
                  </div>
                </div>

                {/* Flow 5: Services to Kafka */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">All Services</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-pink-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-pink-400"></div>
                        </div>
                      </div>
                      <div className="bg-pink-900/30 border-2 border-pink-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-pink-300 text-sm">Event-Driven Architecture</div>
                        <div className="text-xs text-pink-400">Pub/Sub • Async • 100K msgs/sec</div>
                      </div>
                    </div>

                    <div className="bg-pink-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Radio className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Kafka/RabbitMQ</div>
                      <div className="text-sm text-pink-100">Event Streaming</div>
                    </div>
                  </div>
                </div>

                {/* Flow 6: Services to Databases */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Services</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-yellow-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-yellow-400"></div>
                        </div>
                      </div>
                      <div className="bg-yellow-900/30 border-2 border-yellow-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-yellow-300 text-sm">Database per Service</div>
                        <div className="text-xs text-yellow-400">Polyglot Persistence • No Shared DB</div>
                      </div>
                    </div>

                    <div className="bg-yellow-600 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Database className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Data Stores</div>
                      <div className="text-sm text-yellow-100">PG/Mongo/Redis</div>
                    </div>
                  </div>
                </div>

                {/* Flow 7: Cache-Aside Pattern */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Services</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-orange-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-orange-400"></div>
                        </div>
                      </div>
                      <div className="bg-orange-900/30 border-2 border-orange-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-orange-300 text-sm">Cache-Aside Pattern</div>
                        <div className="text-xs text-orange-400">95% hit rate • 10x faster</div>
                      </div>
                    </div>

                    <div className="bg-yellow-600 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Zap className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Redis Cache</div>
                      <div className="text-sm text-yellow-100">L1/L2/L3 Caching</div>
                    </div>
                  </div>
                </div>

                {/* Flow 8: Distributed Tracing */}
                <div>
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">All Services</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-red-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-red-400"></div>
                        </div>
                      </div>
                      <div className="bg-red-900/30 border-2 border-red-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-red-300 text-sm">Distributed Tracing</div>
                        <div className="text-xs text-red-400">OpenTelemetry • Jaeger • 10% sampling</div>
                      </div>
                    </div>

                    <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Activity className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Observability</div>
                      <div className="text-sm text-red-100">Metrics/Logs/Traces</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Patterns Summary */}
              <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/30 rounded-2xl p-8 border-2 border-slate-700 shadow-lg">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-slate-300" />
                  Design Patterns Applied
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-purple-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">1</div>
                      <h3 className="text-lg font-bold text-white">API Gateway</h3>
                    </div>
                    <p className="text-sm text-gray-300">Single entry point for all client requests with authentication, rate limiting, and request routing.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-indigo-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-indigo-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">2</div>
                      <h3 className="text-lg font-bold text-white">Service Mesh</h3>
                    </div>
                    <p className="text-sm text-gray-300">Sidecar proxy pattern (Envoy) for service-to-service communication with mTLS and traffic management.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-green-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">3</div>
                      <h3 className="text-lg font-bold text-white">Circuit Breaker</h3>
                    </div>
                    <p className="text-sm text-gray-300">Prevents cascade failures by opening circuit after consecutive failures and testing with half-open state.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-cyan-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-cyan-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">4</div>
                      <h3 className="text-lg font-bold text-white">Geospatial Indexing</h3>
                    </div>
                    <p className="text-sm text-gray-300">Redis GEORADIUS for sub-500ms driver matching within 5km radius with PostGIS fallback.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-pink-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-pink-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">5</div>
                      <h3 className="text-lg font-bold text-white">Event-Driven</h3>
                    </div>
                    <p className="text-sm text-gray-300">Asynchronous communication via Kafka pub/sub for loose coupling and scalability (100K msgs/sec).</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-yellow-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-yellow-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">6</div>
                      <h3 className="text-lg font-bold text-white">Database per Service</h3>
                    </div>
                    <p className="text-sm text-gray-300">Polyglot persistence - each service owns its database (PostgreSQL, MongoDB, Cassandra, Redis).</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-orange-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">7</div>
                      <h3 className="text-lg font-bold text-white">Cache-Aside</h3>
                    </div>
                    <p className="text-sm text-gray-300">Multi-layer caching (CDN/Redis/App) with 95% hit rate and 10x latency reduction.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-red-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">8</div>
                      <h3 className="text-lg font-bold text-white">Distributed Tracing</h3>
                    </div>
                    <p className="text-sm text-gray-300">OpenTelemetry + Jaeger for request tracing across microservices with 10% production sampling.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-blue-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">9</div>
                      <h3 className="text-lg font-bold text-white">Auto-Scaling</h3>
                    </div>
                    <p className="text-sm text-gray-300">Horizontal scaling based on CPU (&gt;70%) and request count (&gt;1000/min) with 5-50 instances.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Architecture Tab */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {faultToleranceComponents.map((component) => {
                const Icon = component.icon;
                return (
                  <div key={component.id}>
                    <button
                      onClick={() => toggleSection(component.id)}
                      className={`w-full p-5 rounded-xl bg-gradient-to-r ${component.color} text-white font-semibold flex items-center gap-4 hover:shadow-lg transition-all border border-white/20`}
                    >
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Icon size={22} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-lg">{component.name}</div>
                        <div className="text-sm opacity-90 font-normal">{component.metrics}</div>
                      </div>
                      {expandedSections[component.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>

                    {expandedSections[component.id] && (
                      <div className="bg-gray-800 mt-3 p-6 rounded-xl border border-gray-700">
                        {/* Components */}
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                          <Box className="w-5 h-5 text-blue-400" />
                          Components
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          {component.components.map((comp, i) => (
                            <div key={i} className="flex items-start gap-2 text-gray-300 text-sm bg-gray-900 p-3 rounded-lg border border-gray-700">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                              <span>{comp}</span>
                            </div>
                          ))}
                        </div>

                        {/* Fault Tolerance Strategies */}
                        <h4 className="text-white font-bold mb-4 mt-8 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-400" />
                          Fault Tolerance Strategies
                        </h4>
                        <div className="space-y-3">
                          {component.faultTolerance.map((strategy, i) => (
                            <div key={i} className="flex gap-3 bg-gray-900 p-4 rounded-lg border border-green-900">
                              <Check className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                              <p className="text-gray-300 text-sm leading-relaxed">{strategy}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Matching Tab */}
          {activeTab === 'matching' && (
            <div className="space-y-6">
              {/* Matching Algorithm SVG Diagram */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <MapPin className="w-7 h-7 text-green-400" />
                  Geospatial Matching Visualization
                </h2>
                <MatchingAlgorithmDiagram />
              </div>

              {/* Real-Time Location SVG Diagram */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Radio className="w-7 h-7 text-blue-400" />
                  Real-Time GPS Tracking Flow
                </h2>
                <RealTimeLocationDiagram />
              </div>

              {/* Dynamic Pricing SVG Diagram */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <TrendingUp className="w-7 h-7 text-yellow-400" />
                  Dynamic Surge Pricing
                </h2>
                <PricingDiagram />
              </div>

              <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 rounded-2xl p-8 border border-gray-700 shadow-sm">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <Navigation className="w-6 h-6 text-blue-400" />
                  </div>
                  {matchingAlgorithm.title}
                </h2>
                <div className="space-y-4">
                  {matchingAlgorithm.steps.map((step, i) => (
                    <div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-white">{step.step}</h3>
                            <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-semibold">{step.latency}</span>
                          </div>
                          <p className="text-gray-300 mb-3">{step.description}</p>
                          <div className="bg-blue-900/30 p-3 rounded-lg mb-3">
                            <p className="text-sm text-blue-300 font-mono">{step.details}</p>
                          </div>
                          <div className="bg-green-900/30 p-3 rounded-lg border border-green-700">
                            <p className="text-sm text-green-300">
                              <span className="font-semibold">Fault Tolerance:</span> {step.faultTolerance}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scale Tab */}
          {activeTab === 'scale' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 border border-blue-700 shadow-sm">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  {systemScale.title}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {systemScale.metrics.map((metric, i) => (
                    <div key={i} className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                      <h3 className="text-lg font-bold text-white mb-4">{metric.metric}</h3>
                      <div className="space-y-2.5">
                        <p className="text-3xl font-bold text-blue-400">{metric.value}</p>
                        <p className="text-sm text-gray-300"><span className="font-semibold text-white">Calculation:</span> {metric.calculation}</p>
                        <div className="pt-3 mt-3 border-t border-gray-700">
                          <p className="text-sm text-green-400 font-medium flex items-start gap-2">
                            <Check size={18} className="flex-shrink-0 mt-0.5" />
                            <span>{metric.infrastructure}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recovery Tab */}
          {activeTab === 'recovery' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-8 border border-red-700 shadow-sm">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-red-600 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  {disasterRecovery.title}
                </h2>
                <div className="space-y-4">
                  {disasterRecovery.strategies.map((strategy, i) => (
                    <div key={i} className="bg-gray-800 p-6 rounded-xl border border-red-700 shadow-sm">
                      <h3 className="text-lg font-bold text-white mb-4">{strategy.scenario}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold mb-1">RTO (Recovery Time)</p>
                          <p className="text-lg font-bold text-orange-400">{strategy.rto}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold mb-1">RPO (Data Loss)</p>
                          <p className="text-lg font-bold text-orange-400">{strategy.rpo}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-300"><span className="font-semibold text-white">Impact:</span> {strategy.impact}</p>
                        <div className="bg-green-900/30 p-3 rounded-lg border border-green-700">
                          <p className="text-sm text-green-300">
                            <span className="font-semibold">Recovery:</span> {strategy.recovery}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

// SVG Diagram Components

// 1. High-Level Architecture Diagram: Clients -> WebSocket Gateway -> Collaboration Service -> Storage
const GoogleDocsArchitectureDiagram = () => (
  <svg viewBox="0 0 900 500" className="w-full h-auto">
    <defs>
      <linearGradient id="archClientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4285F4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1a73e8', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="archGatewayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#34A853', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1e8e3e', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="archServiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FBBC04', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f9ab00', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="archStorageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#EA4335', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d93025', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="archArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#9ca3af" />
      </marker>
      <filter id="archShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Title */}
    <text x="450" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
      Google Docs High-Level Architecture
    </text>

    {/* Clients Layer */}
    <g filter="url(#archShadow)">
      <rect x="30" y="60" width="120" height="80" fill="url(#archClientGrad)" rx="10" />
      <text x="90" y="95" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Web Client</text>
      <text x="90" y="115" fontSize="10" fill="#e3f2fd" textAnchor="middle">React Editor</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="30" y="160" width="120" height="80" fill="url(#archClientGrad)" rx="10" />
      <text x="90" y="195" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Mobile Client</text>
      <text x="90" y="215" fontSize="10" fill="#e3f2fd" textAnchor="middle">iOS / Android</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="30" y="260" width="120" height="80" fill="url(#archClientGrad)" rx="10" />
      <text x="90" y="295" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Desktop Client</text>
      <text x="90" y="315" fontSize="10" fill="#e3f2fd" textAnchor="middle">Electron App</text>
    </g>

    {/* Client Label */}
    <text x="90" y="370" fontSize="14" fontWeight="bold" fill="#4285F4" textAnchor="middle">CLIENTS</text>

    {/* WebSocket Gateway */}
    <g filter="url(#archShadow)">
      <rect x="220" y="120" width="160" height="160" fill="url(#archGatewayGrad)" rx="12" />
      <text x="300" y="160" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">WebSocket</text>
      <text x="300" y="180" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Gateway</text>
      <line x1="240" y1="195" x2="360" y2="195" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <text x="300" y="215" fontSize="10" fill="#e8f5e9" textAnchor="middle">Connection Manager</text>
      <text x="300" y="232" fontSize="10" fill="#e8f5e9" textAnchor="middle">Session Handler</text>
      <text x="300" y="249" fontSize="10" fill="#e8f5e9" textAnchor="middle">Load Balancer</text>
      <text x="300" y="266" fontSize="10" fill="#e8f5e9" textAnchor="middle">Heartbeat Monitor</text>
    </g>
    <text x="300" y="310" fontSize="14" fontWeight="bold" fill="#34A853" textAnchor="middle">GATEWAY</text>

    {/* Collaboration Service */}
    <g filter="url(#archShadow)">
      <rect x="450" y="80" width="180" height="240" fill="url(#archServiceGrad)" rx="12" />
      <text x="540" y="115" fontSize="14" fontWeight="bold" fill="#5d4037" textAnchor="middle">Collaboration</text>
      <text x="540" y="135" fontSize="14" fontWeight="bold" fill="#5d4037" textAnchor="middle">Service</text>
      <line x1="470" y1="150" x2="610" y2="150" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <text x="540" y="175" fontSize="11" fill="#5d4037" textAnchor="middle">OT Engine</text>
      <text x="540" y="195" fontSize="11" fill="#5d4037" textAnchor="middle">Conflict Resolver</text>
      <text x="540" y="215" fontSize="11" fill="#5d4037" textAnchor="middle">Presence Tracker</text>
      <text x="540" y="235" fontSize="11" fill="#5d4037" textAnchor="middle">Cursor Sync</text>
      <text x="540" y="255" fontSize="11" fill="#5d4037" textAnchor="middle">Version Manager</text>
      <text x="540" y="275" fontSize="11" fill="#5d4037" textAnchor="middle">History Service</text>
      <text x="540" y="295" fontSize="11" fill="#5d4037" textAnchor="middle">Permissions</text>
    </g>
    <text x="540" y="345" fontSize="14" fontWeight="bold" fill="#FBBC04" textAnchor="middle">SERVICE</text>

    {/* Storage Layer */}
    <g filter="url(#archShadow)">
      <rect x="700" y="60" width="170" height="70" fill="url(#archStorageGrad)" rx="8" />
      <text x="785" y="90" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Document DB</text>
      <text x="785" y="110" fontSize="10" fill="#ffcdd2" textAnchor="middle">PostgreSQL / Spanner</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="700" y="150" width="170" height="70" fill="url(#archStorageGrad)" rx="8" />
      <text x="785" y="180" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Cache Layer</text>
      <text x="785" y="200" fontSize="10" fill="#ffcdd2" textAnchor="middle">Redis Cluster</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="700" y="240" width="170" height="70" fill="url(#archStorageGrad)" rx="8" />
      <text x="785" y="270" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Object Storage</text>
      <text x="785" y="290" fontSize="10" fill="#ffcdd2" textAnchor="middle">GCS / S3</text>
    </g>
    <text x="785" y="340" fontSize="14" fontWeight="bold" fill="#EA4335" textAnchor="middle">STORAGE</text>

    {/* Arrows */}
    <path d="M 150 100 L 210 175" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#archArrow)" />
    <path d="M 150 200 L 210 200" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#archArrow)" />
    <path d="M 150 300 L 210 225" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#archArrow)" />

    <path d="M 380 200 L 440 200" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#archArrow)" />

    <path d="M 630 120 L 690 95" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#archArrow)" />
    <path d="M 630 200 L 690 185" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#archArrow)" />
    <path d="M 630 280 L 690 275" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#archArrow)" />

    {/* Bidirectional Labels */}
    <text x="175" y="140" fontSize="9" fill="#9ca3af" textAnchor="middle">WS</text>
    <text x="410" y="190" fontSize="9" fill="#9ca3af" textAnchor="middle">Events</text>
    <text x="665" y="140" fontSize="9" fill="#9ca3af" textAnchor="middle">R/W</text>

    {/* Flow Description */}
    <rect x="30" y="400" width="840" height="80" fill="rgba(66, 133, 244, 0.1)" rx="8" stroke="#4285F4" strokeWidth="1" />
    <text x="450" y="425" fontSize="12" fontWeight="bold" fill="#4285F4" textAnchor="middle">Data Flow</text>
    <text x="450" y="445" fontSize="11" fill="#9ca3af" textAnchor="middle">
      1. Client connects via WebSocket  |  2. Gateway routes to Service  |  3. OT transforms applied
    </text>
    <text x="450" y="465" fontSize="11" fill="#9ca3af" textAnchor="middle">
      4. Changes persisted to DB  |  5. Broadcast to all connected clients  |  6. Cache updated
    </text>
  </svg>
);

// 2. Operational Transform Diagram showing conflict resolution
const OperationalTransformDiagram = () => (
  <svg viewBox="0 0 900 550" className="w-full h-auto">
    <defs>
      <linearGradient id="otUserAGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4285F4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1a73e8', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="otUserBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#34A853', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1e8e3e', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="otServerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FBBC04', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f9ab00', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="otConflictGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#EA4335', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d93025', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="otArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#9ca3af" />
      </marker>
      <marker id="otArrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#4285F4" />
      </marker>
      <marker id="otArrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#34A853" />
      </marker>
    </defs>

    {/* Title */}
    <text x="450" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
      Operational Transform - Conflict Resolution
    </text>

    {/* Timeline */}
    <line x1="100" y1="80" x2="100" y2="480" stroke="#4285F4" strokeWidth="3" />
    <line x1="450" y1="80" x2="450" y2="480" stroke="#FBBC04" strokeWidth="3" />
    <line x1="800" y1="80" x2="800" y2="480" stroke="#34A853" strokeWidth="3" />

    {/* Labels */}
    <rect x="40" y="50" width="120" height="30" fill="url(#otUserAGrad)" rx="6" />
    <text x="100" y="70" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">User A (Alice)</text>

    <rect x="390" y="50" width="120" height="30" fill="url(#otServerGrad)" rx="6" />
    <text x="450" y="70" fontSize="12" fontWeight="bold" fill="#5d4037" textAnchor="middle">OT Server</text>

    <rect x="740" y="50" width="120" height="30" fill="url(#otUserBGrad)" rx="6" />
    <text x="800" y="70" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">User B (Bob)</text>

    {/* Initial State */}
    <rect x="300" y="95" width="300" height="35" fill="#1f2937" stroke="#374151" strokeWidth="2" rx="6" />
    <text x="450" y="118" fontSize="12" fill="#9ca3af" textAnchor="middle">Initial: "Hello World" (v0)</text>

    {/* User A types at t1 */}
    <rect x="20" y="150" width="160" height="50" fill="rgba(66, 133, 244, 0.2)" stroke="#4285F4" strokeWidth="2" rx="6" />
    <text x="100" y="172" fontSize="11" fill="#4285F4" textAnchor="middle">t1: Insert "X" at pos 5</text>
    <text x="100" y="190" fontSize="10" fill="#93c5fd" textAnchor="middle">"HelloX World"</text>

    {/* User B types at t1 (concurrent) */}
    <rect x="720" y="150" width="160" height="50" fill="rgba(52, 168, 83, 0.2)" stroke="#34A853" strokeWidth="2" rx="6" />
    <text x="800" y="172" fontSize="11" fill="#34A853" textAnchor="middle">t1: Insert "Y" at pos 11</text>
    <text x="800" y="190" fontSize="10" fill="#86efac" textAnchor="middle">"Hello WorldY"</text>

    {/* Operations sent to server */}
    <path d="M 180 175 L 390 230" stroke="#4285F4" strokeWidth="2" markerEnd="url(#otArrowBlue)" />
    <text x="270" y="195" fontSize="10" fill="#4285F4" textAnchor="middle">Op A: ins(5,"X")</text>

    <path d="M 720 175 L 510 230" stroke="#34A853" strokeWidth="2" markerEnd="url(#otArrowGreen)" />
    <text x="630" y="195" fontSize="10" fill="#34A853" textAnchor="middle">Op B: ins(11,"Y")</text>

    {/* Server receives - conflict detected */}
    <rect x="350" y="220" width="200" height="60" fill="url(#otConflictGrad)" rx="8" />
    <text x="450" y="245" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Conflict Detected!</text>
    <text x="450" y="265" fontSize="10" fill="#ffcdd2" textAnchor="middle">Both ops based on v0</text>

    {/* Transform Operations */}
    <rect x="350" y="300" width="200" height="80" fill="url(#otServerGrad)" rx="8" />
    <text x="450" y="325" fontSize="12" fontWeight="bold" fill="#5d4037" textAnchor="middle">OT Transform</text>
    <text x="450" y="345" fontSize="10" fill="#5d4037" textAnchor="middle">Apply A first: ins(5,"X")</text>
    <text x="450" y="360" fontSize="10" fill="#5d4037" textAnchor="middle">Transform B: ins(5,"X") + ins(11,"Y")</text>
    <text x="450" y="375" fontSize="10" fill="#5d4037" textAnchor="middle">= ins(12,"Y") (position shifted!)</text>

    {/* Transformed ops sent back */}
    <path d="M 390 360 L 180 400" stroke="#4285F4" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#otArrowBlue)" />
    <text x="260" y="390" fontSize="9" fill="#4285F4" textAnchor="middle">ACK + Op B'</text>

    <path d="M 510 360 L 720 400" stroke="#34A853" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#otArrowGreen)" />
    <text x="640" y="390" fontSize="9" fill="#34A853" textAnchor="middle">ACK + Op A</text>

    {/* Final converged state */}
    <rect x="20" y="410" width="160" height="50" fill="rgba(66, 133, 244, 0.2)" stroke="#4285F4" strokeWidth="2" rx="6" />
    <text x="100" y="432" fontSize="11" fill="#4285F4" textAnchor="middle">Apply B' (transformed)</text>
    <text x="100" y="450" fontSize="10" fill="#93c5fd" textAnchor="middle">"HelloX WorldY"</text>

    <rect x="720" y="410" width="160" height="50" fill="rgba(52, 168, 83, 0.2)" stroke="#34A853" strokeWidth="2" rx="6" />
    <text x="800" y="432" fontSize="11" fill="#34A853" textAnchor="middle">Apply A</text>
    <text x="800" y="450" fontSize="10" fill="#86efac" textAnchor="middle">"HelloX WorldY"</text>

    {/* Final State Box */}
    <rect x="300" y="480" width="300" height="50" fill="rgba(52, 168, 83, 0.3)" stroke="#34A853" strokeWidth="2" rx="8" />
    <text x="450" y="503" fontSize="13" fontWeight="bold" fill="#34A853" textAnchor="middle">Converged: "HelloX WorldY" (v2)</text>
    <text x="450" y="520" fontSize="10" fill="#86efac" textAnchor="middle">All clients have identical state</text>

    {/* Legend */}
    <rect x="30" y="495" width="180" height="40" fill="#1f2937" stroke="#374151" strokeWidth="1" rx="4" />
    <text x="40" y="512" fontSize="10" fill="#9ca3af">Key: OT adjusts positions so</text>
    <text x="40" y="526" fontSize="10" fill="#9ca3af">concurrent ops don't conflict</text>
  </svg>
);

// 3. Presence and Cursors Diagram showing multiple users editing
const PresenceAndCursorsDiagram = () => (
  <svg viewBox="0 0 900 400" className="w-full h-auto">
    <defs>
      <linearGradient id="presDocGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#374151', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1f2937', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="presShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* Title */}
    <text x="450" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
      Presence System - Multi-User Cursor Tracking
    </text>

    {/* Document Canvas */}
    <rect x="50" y="50" width="600" height="280" fill="url(#presDocGrad)" rx="12" filter="url(#presShadow)" stroke="#4b5563" strokeWidth="2" />

    {/* Document Header */}
    <rect x="50" y="50" width="600" height="40" fill="#4b5563" rx="12" />
    <rect x="50" y="70" width="600" height="20" fill="#4b5563" />
    <text x="70" y="78" fontSize="14" fontWeight="bold" fill="#f3f4f6">Untitled Document</text>

    {/* Collaborator avatars in header */}
    <circle cx="550" cy="70" r="14" fill="#4285F4" />
    <text x="550" y="75" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">A</text>
    <circle cx="580" cy="70" r="14" fill="#34A853" />
    <text x="580" y="75" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">B</text>
    <circle cx="610" cy="70" r="14" fill="#EA4335" />
    <text x="610" y="75" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">C</text>

    {/* Document Text Lines */}
    <text x="70" y="120" fontSize="14" fill="#e5e7eb" fontFamily="monospace">The quick brown fox jumps over the lazy dog.</text>
    <text x="70" y="150" fontSize="14" fill="#e5e7eb" fontFamily="monospace">Lorem ipsum dolor sit amet, consectetur</text>
    <text x="70" y="180" fontSize="14" fill="#e5e7eb" fontFamily="monospace">adipiscing elit. Sed do eiusmod tempor</text>
    <text x="70" y="210" fontSize="14" fill="#e5e7eb" fontFamily="monospace">incididunt ut labore et dolore magna aliqua.</text>
    <text x="70" y="240" fontSize="14" fill="#e5e7eb" fontFamily="monospace">Ut enim ad minim veniam, quis nostrud.</text>
    <text x="70" y="270" fontSize="14" fill="#e5e7eb" fontFamily="monospace">Duis aute irure dolor in reprehenderit.</text>
    <text x="70" y="300" fontSize="14" fill="#e5e7eb" fontFamily="monospace">Excepteur sint occaecat cupidatat non.</text>

    {/* User A Cursor - Blue */}
    <line x1="165" y1="107" x2="165" y2="125" stroke="#4285F4" strokeWidth="2" />
    <rect x="165" y="95" width="50" height="14" fill="#4285F4" rx="2" />
    <text x="170" y="105" fontSize="9" fill="white">Alice</text>

    {/* User B Cursor - Green */}
    <line x1="295" y1="167" x2="295" y2="185" stroke="#34A853" strokeWidth="2" />
    <rect x="295" y="155" width="40" height="14" fill="#34A853" rx="2" />
    <text x="300" y="165" fontSize="9" fill="white">Bob</text>

    {/* User C Selection Highlight - Red */}
    <rect x="70" y="225" width="200" height="18" fill="rgba(234, 67, 53, 0.3)" />
    <line x1="270" y1="223" x2="270" y2="245" stroke="#EA4335" strokeWidth="2" />
    <rect x="270" y="211" width="55" height="14" fill="#EA4335" rx="2" />
    <text x="275" y="221" fontSize="9" fill="white">Charlie</text>

    {/* Presence Panel on Right */}
    <rect x="680" y="50" width="190" height="280" fill="#1f2937" rx="12" stroke="#374151" strokeWidth="2" />
    <text x="775" y="80" fontSize="14" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">Active Users (3)</text>
    <line x1="695" y1="95" x2="855" y2="95" stroke="#374151" strokeWidth="1" />

    {/* User A */}
    <circle cx="715" cy="125" r="15" fill="#4285F4" />
    <text x="715" y="130" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">A</text>
    <text x="745" y="122" fontSize="12" fill="#e5e7eb">Alice Chen</text>
    <text x="745" y="138" fontSize="10" fill="#9ca3af">Editing line 1</text>
    <circle cx="850" cy="125" r="5" fill="#4ade80" />

    {/* User B */}
    <circle cx="715" cy="180" r="15" fill="#34A853" />
    <text x="715" y="185" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">B</text>
    <text x="745" y="177" fontSize="12" fill="#e5e7eb">Bob Smith</text>
    <text x="745" y="193" fontSize="10" fill="#9ca3af">Editing line 3</text>
    <circle cx="850" cy="180" r="5" fill="#4ade80" />

    {/* User C */}
    <circle cx="715" cy="235" r="15" fill="#EA4335" />
    <text x="715" y="240" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">C</text>
    <text x="745" y="232" fontSize="12" fill="#e5e7eb">Charlie Kim</text>
    <text x="745" y="248" fontSize="10" fill="#9ca3af">Selecting text</text>
    <circle cx="850" cy="235" r="5" fill="#4ade80" />

    {/* Typing indicator */}
    <rect x="695" y="270" width="160" height="45" fill="rgba(66, 133, 244, 0.1)" rx="6" stroke="#4285F4" strokeWidth="1" strokeDasharray="3,3" />
    <text x="775" y="290" fontSize="10" fill="#4285F4" textAnchor="middle">Alice is typing...</text>
    <circle cx="745" cy="303" r="3" fill="#4285F4">
      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
    </circle>
    <circle cx="760" cy="303" r="3" fill="#4285F4">
      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.2s" />
    </circle>
    <circle cx="775" cy="303" r="3" fill="#4285F4">
      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.4s" />
    </circle>

    {/* Data Flow Description */}
    <rect x="50" y="350" width="820" height="40" fill="rgba(52, 168, 83, 0.1)" rx="6" stroke="#34A853" strokeWidth="1" />
    <text x="460" y="375" fontSize="11" fill="#9ca3af" textAnchor="middle">
      Cursor positions broadcast via WebSocket every 50ms | Presence updates via Redis Pub/Sub | Color-coded per user
    </text>
  </svg>
);

// 4. Document Storage Diagram showing how documents are stored and versioned
const DocumentStorageDiagram = () => (
  <svg viewBox="0 0 900 500" className="w-full h-auto">
    <defs>
      <linearGradient id="storeDocGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4285F4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1a73e8', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="storeOpsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#34A853', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1e8e3e', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="storeSnapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FBBC04', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f9ab00', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="storeArchiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#EA4335', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d93025', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="storeArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#9ca3af" />
      </marker>
      <filter id="storeShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Title */}
    <text x="450" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
      Document Storage Architecture
    </text>

    {/* Hot Storage - Redis */}
    <rect x="30" y="60" width="250" height="180" fill="#1f2937" rx="12" stroke="#4285F4" strokeWidth="2" filter="url(#storeShadow)" />
    <rect x="30" y="60" width="250" height="40" fill="url(#storeDocGrad)" rx="12" />
    <rect x="30" y="85" width="250" height="15" fill="url(#storeDocGrad)" />
    <text x="155" y="88" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Hot Storage (Redis)</text>

    <text x="50" y="125" fontSize="11" fill="#9ca3af">Active Documents Cache</text>
    <rect x="50" y="135" width="210" height="25" fill="#374151" rx="4" />
    <text x="60" y="152" fontSize="10" fill="#60a5fa" fontFamily="monospace">doc:123 → current_content</text>

    <rect x="50" y="165" width="210" height="25" fill="#374151" rx="4" />
    <text x="60" y="182" fontSize="10" fill="#60a5fa" fontFamily="monospace">doc:123:cursors → [user_positions]</text>

    <rect x="50" y="195" width="210" height="25" fill="#374151" rx="4" />
    <text x="60" y="212" fontSize="10" fill="#60a5fa" fontFamily="monospace">doc:123:presence → [online_users]</text>

    <text x="155" y="235" fontSize="10" fill="#4285F4" textAnchor="middle">TTL: 30 min | LRU eviction</text>

    {/* Primary Storage - PostgreSQL */}
    <rect x="320" y="60" width="260" height="180" fill="#1f2937" rx="12" stroke="#34A853" strokeWidth="2" filter="url(#storeShadow)" />
    <rect x="320" y="60" width="260" height="40" fill="url(#storeOpsGrad)" rx="12" />
    <rect x="320" y="85" width="260" height="15" fill="url(#storeOpsGrad)" />
    <text x="450" y="88" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Primary DB (PostgreSQL)</text>

    <text x="340" y="125" fontSize="11" fill="#9ca3af">Documents Table</text>
    <rect x="340" y="135" width="220" height="40" fill="#374151" rx="4" />
    <text x="350" y="152" fontSize="9" fill="#86efac" fontFamily="monospace">id | title | content | owner_id</text>
    <text x="350" y="167" fontSize="9" fill="#86efac" fontFamily="monospace">version | created | updated</text>

    <text x="340" y="195" fontSize="11" fill="#9ca3af">Operations Log Table</text>
    <rect x="340" y="205" width="220" height="25" fill="#374151" rx="4" />
    <text x="350" y="222" fontSize="9" fill="#86efac" fontFamily="monospace">doc_id | op_type | position | data | v</text>

    {/* Snapshot Storage */}
    <rect x="620" y="60" width="250" height="180" fill="#1f2937" rx="12" stroke="#FBBC04" strokeWidth="2" filter="url(#storeShadow)" />
    <rect x="620" y="60" width="250" height="40" fill="url(#storeSnapGrad)" rx="12" />
    <rect x="620" y="85" width="250" height="15" fill="url(#storeSnapGrad)" />
    <text x="745" y="88" fontSize="14" fontWeight="bold" fill="#5d4037" textAnchor="middle">Snapshots (GCS/S3)</text>

    <text x="640" y="125" fontSize="11" fill="#9ca3af">Full Document Snapshots</text>
    <g>
      <rect x="640" y="135" width="70" height="80" fill="#374151" rx="4" />
      <text x="675" y="160" fontSize="10" fill="#fde68a" textAnchor="middle">v100</text>
      <text x="675" y="175" fontSize="8" fill="#9ca3af" textAnchor="middle">50KB</text>
      <text x="675" y="200" fontSize="8" fill="#6b7280" textAnchor="middle">Jan 1</text>
    </g>
    <g>
      <rect x="720" y="135" width="70" height="80" fill="#374151" rx="4" />
      <text x="755" y="160" fontSize="10" fill="#fde68a" textAnchor="middle">v200</text>
      <text x="755" y="175" fontSize="8" fill="#9ca3af" textAnchor="middle">52KB</text>
      <text x="755" y="200" fontSize="8" fill="#6b7280" textAnchor="middle">Jan 15</text>
    </g>
    <g>
      <rect x="800" y="135" width="50" height="80" fill="#374151" rx="4" />
      <text x="825" y="175" fontSize="16" fill="#6b7280" textAnchor="middle">...</text>
    </g>

    <text x="745" y="235" fontSize="10" fill="#FBBC04" textAnchor="middle">Every 100 ops | Compressed</text>

    {/* Archive Storage */}
    <rect x="320" y="280" width="260" height="120" fill="#1f2937" rx="12" stroke="#EA4335" strokeWidth="2" filter="url(#storeShadow)" />
    <rect x="320" y="280" width="260" height="35" fill="url(#storeArchiveGrad)" rx="12" />
    <rect x="320" y="300" width="260" height="15" fill="url(#storeArchiveGrad)" />
    <text x="450" y="305" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Cold Archive (Glacier)</text>

    <text x="340" y="340" fontSize="11" fill="#9ca3af">Older Versions (90+ days)</text>
    <text x="340" y="360" fontSize="10" fill="#fca5a5">Compressed snapshots + diff chains</text>
    <text x="340" y="380" fontSize="10" fill="#fca5a5">Retrieval: minutes to hours</text>

    {/* Data Flow Arrows */}
    <path d="M 155 240 L 155 260 L 320 300" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#storeArrow)" />
    <text x="200" y="285" fontSize="9" fill="#6b7280">Evicted</text>

    <path d="M 450 240 L 450 275" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#storeArrow)" />
    <text x="475" y="265" fontSize="9" fill="#6b7280">Archive</text>

    <path d="M 745 240 L 580 290" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#storeArrow)" />

    <path d="M 280 150 L 310 150" stroke="#4ade80" strokeWidth="2" markerEnd="url(#storeArrow)" />
    <text x="295" y="140" fontSize="9" fill="#4ade80">Persist</text>

    <path d="M 580 150 L 610 150" stroke="#fde68a" strokeWidth="2" markerEnd="url(#storeArrow)" />
    <text x="595" y="140" fontSize="9" fill="#fde68a">Snapshot</text>

    {/* Legend */}
    <rect x="30" y="420" width="840" height="65" fill="rgba(66, 133, 244, 0.1)" rx="8" stroke="#374151" strokeWidth="1" />
    <text x="450" y="445" fontSize="12" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">Storage Strategy</text>
    <text x="450" y="465" fontSize="10" fill="#9ca3af" textAnchor="middle">
      Hot (Redis): Active docs, ~1GB/server | Warm (PostgreSQL): All docs + ops log, sharded by doc_id
    </text>
    <text x="450" y="480" fontSize="10" fill="#9ca3af" textAnchor="middle">
      Cold (GCS): Snapshots every 100 ops | Archive (Glacier): Docs inactive 90+ days
    </text>
  </svg>
);

// 5. Revision History Diagram showing how revision history and undo/redo work
const RevisionHistoryDiagram = () => (
  <svg viewBox="0 0 900 480" className="w-full h-auto">
    <defs>
      <linearGradient id="revMainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#4285F4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#34A853', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="revSnapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FBBC04', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f9ab00', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="revDiffGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#34A853', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1e8e3e', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="revArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#9ca3af" />
      </marker>
      <marker id="revArrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="2.5" orient="auto">
        <polygon points="0 0, 8 2.5, 0 5" fill="#34A853" />
      </marker>
      <filter id="revShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Title */}
    <text x="450" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
      Revision History & Undo/Redo System
    </text>

    {/* Timeline */}
    <line x1="50" y1="100" x2="850" y2="100" stroke="url(#revMainGrad)" strokeWidth="4" />

    {/* Version markers */}
    {/* v0 - Initial */}
    <g filter="url(#revShadow)">
      <circle cx="100" cy="100" r="20" fill="url(#revSnapGrad)" stroke="#f59e0b" strokeWidth="2" />
      <text x="100" y="105" fontSize="10" fontWeight="bold" fill="#5d4037" textAnchor="middle">v0</text>
    </g>
    <text x="100" y="145" fontSize="10" fill="#FBBC04" textAnchor="middle">Snapshot</text>
    <text x="100" y="160" fontSize="9" fill="#9ca3af" textAnchor="middle">"Hello"</text>

    {/* v1-v99 - Diffs */}
    <g filter="url(#revShadow)">
      <circle cx="200" cy="100" r="12" fill="url(#revDiffGrad)" stroke="#059669" strokeWidth="1" />
      <text x="200" y="104" fontSize="8" fill="white" textAnchor="middle">v1</text>
    </g>
    <text x="200" y="135" fontSize="8" fill="#34A853" textAnchor="middle">+World</text>

    <g filter="url(#revShadow)">
      <circle cx="260" cy="100" r="12" fill="url(#revDiffGrad)" stroke="#059669" strokeWidth="1" />
      <text x="260" y="104" fontSize="8" fill="white" textAnchor="middle">v2</text>
    </g>
    <text x="260" y="135" fontSize="8" fill="#34A853" textAnchor="middle">+!</text>

    <text x="320" y="105" fontSize="16" fill="#6b7280">...</text>

    <g filter="url(#revShadow)">
      <circle cx="380" cy="100" r="12" fill="url(#revDiffGrad)" stroke="#059669" strokeWidth="1" />
      <text x="380" y="104" fontSize="8" fill="white" textAnchor="middle">v99</text>
    </g>

    {/* v100 - Snapshot */}
    <g filter="url(#revShadow)">
      <circle cx="450" cy="100" r="20" fill="url(#revSnapGrad)" stroke="#f59e0b" strokeWidth="2" />
      <text x="450" y="105" fontSize="10" fontWeight="bold" fill="#5d4037" textAnchor="middle">v100</text>
    </g>
    <text x="450" y="145" fontSize="10" fill="#FBBC04" textAnchor="middle">Snapshot</text>
    <text x="450" y="160" fontSize="9" fill="#9ca3af" textAnchor="middle">Full doc</text>

    {/* v101+ */}
    <g filter="url(#revShadow)">
      <circle cx="540" cy="100" r="12" fill="url(#revDiffGrad)" stroke="#059669" strokeWidth="1" />
      <text x="540" y="104" fontSize="8" fill="white" textAnchor="middle">v101</text>
    </g>

    <text x="600" y="105" fontSize="16" fill="#6b7280">...</text>

    <g filter="url(#revShadow)">
      <circle cx="660" cy="100" r="12" fill="url(#revDiffGrad)" stroke="#059669" strokeWidth="1" />
      <text x="660" y="104" fontSize="8" fill="white" textAnchor="middle">v150</text>
    </g>

    {/* Current version */}
    <g filter="url(#revShadow)">
      <circle cx="750" cy="100" r="18" fill="#4285F4" stroke="#1d4ed8" strokeWidth="3" />
      <text x="750" y="105" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">v151</text>
    </g>
    <text x="750" y="145" fontSize="10" fill="#4285F4" textAnchor="middle">Current</text>
    <rect x="800" y="85" width="50" height="30" fill="#4285F4" rx="4" />
    <text x="825" y="105" fontSize="9" fill="white" textAnchor="middle">HEAD</text>

    {/* Undo/Redo Section */}
    <rect x="50" y="190" width="380" height="140" fill="#1f2937" rx="12" stroke="#4285F4" strokeWidth="2" />
    <text x="240" y="215" fontSize="14" fontWeight="bold" fill="#4285F4" textAnchor="middle">Undo Stack (Per User)</text>

    <g>
      <rect x="70" y="235" width="80" height="35" fill="#374151" rx="4" />
      <text x="110" y="255" fontSize="9" fill="#60a5fa" textAnchor="middle">Op: ins(5,"X")</text>
      <text x="110" y="268" fontSize="8" fill="#9ca3af" textAnchor="middle">inverse: del(5,1)</text>
    </g>
    <g>
      <rect x="160" y="235" width="80" height="35" fill="#374151" rx="4" />
      <text x="200" y="255" fontSize="9" fill="#60a5fa" textAnchor="middle">Op: del(0,5)</text>
      <text x="200" y="268" fontSize="8" fill="#9ca3af" textAnchor="middle">inverse: ins(0,"Hello")</text>
    </g>
    <g>
      <rect x="250" y="235" width="80" height="35" fill="#374151" rx="4" />
      <text x="290" y="255" fontSize="9" fill="#60a5fa" textAnchor="middle">Op: ins(0,"Hi")</text>
      <text x="290" y="268" fontSize="8" fill="#9ca3af" textAnchor="middle">inverse: del(0,2)</text>
    </g>
    <g>
      <rect x="340" y="235" width="70" height="35" fill="#4285F4" rx="4" stroke="#60a5fa" strokeWidth="2" />
      <text x="375" y="255" fontSize="9" fill="white" textAnchor="middle">Latest</text>
      <text x="375" y="268" fontSize="8" fill="#bfdbfe" textAnchor="middle">TOP</text>
    </g>

    <text x="240" y="295" fontSize="10" fill="#9ca3af" textAnchor="middle">Ctrl+Z applies inverse of top operation</text>
    <path d="M 375 275 C 375 295, 340 305, 300 305" stroke="#f87171" strokeWidth="2" markerEnd="url(#revArrow)" strokeDasharray="4,2" />
    <text x="350" y="315" fontSize="9" fill="#f87171">Undo</text>

    {/* Redo Section */}
    <rect x="470" y="190" width="380" height="140" fill="#1f2937" rx="12" stroke="#34A853" strokeWidth="2" />
    <text x="660" y="215" fontSize="14" fontWeight="bold" fill="#34A853" textAnchor="middle">Redo Stack (Per User)</text>

    <g>
      <rect x="490" y="235" width="80" height="35" fill="#374151" rx="4" />
      <text x="530" y="255" fontSize="9" fill="#86efac" textAnchor="middle">Undone Op 1</text>
      <text x="530" y="268" fontSize="8" fill="#9ca3af" textAnchor="middle">ready to redo</text>
    </g>
    <g>
      <rect x="580" y="235" width="80" height="35" fill="#374151" rx="4" />
      <text x="620" y="255" fontSize="9" fill="#86efac" textAnchor="middle">Undone Op 2</text>
      <text x="620" y="268" fontSize="8" fill="#9ca3af" textAnchor="middle">ready to redo</text>
    </g>
    <g>
      <rect x="670" y="235" width="60" height="35" fill="#374151" rx="4" stroke="#34A853" strokeWidth="1" strokeDasharray="3,3" />
      <text x="700" y="258" fontSize="10" fill="#6b7280" textAnchor="middle">empty</text>
    </g>

    <text x="660" y="295" fontSize="10" fill="#9ca3af" textAnchor="middle">Ctrl+Y re-applies undone operation</text>
    <path d="M 530 270 C 530 295, 570 305, 615 305" stroke="#4ade80" strokeWidth="2" markerEnd="url(#revArrowGreen)" strokeDasharray="4,2" />
    <text x="555" y="315" fontSize="9" fill="#4ade80">Redo</text>

    {/* Restore Version Section */}
    <rect x="50" y="350" width="800" height="110" fill="rgba(251, 188, 4, 0.1)" rx="12" stroke="#FBBC04" strokeWidth="2" />
    <text x="450" y="380" fontSize="14" fontWeight="bold" fill="#FBBC04" textAnchor="middle">Restoring a Previous Version</text>

    <g>
      <rect x="80" y="400" width="140" height="45" fill="#374151" rx="6" />
      <text x="150" y="420" fontSize="10" fill="#fde68a" textAnchor="middle">1. Find nearest snapshot</text>
      <text x="150" y="435" fontSize="9" fill="#9ca3af" textAnchor="middle">e.g., v100 for restoring v125</text>
    </g>
    <path d="M 220 422 L 260 422" stroke="#FBBC04" strokeWidth="2" markerEnd="url(#revArrow)" />

    <g>
      <rect x="270" y="400" width="140" height="45" fill="#374151" rx="6" />
      <text x="340" y="420" fontSize="10" fill="#fde68a" textAnchor="middle">2. Apply diffs forward</text>
      <text x="340" y="435" fontSize="9" fill="#9ca3af" textAnchor="middle">v100→v101→...→v125</text>
    </g>
    <path d="M 410 422 L 450 422" stroke="#FBBC04" strokeWidth="2" markerEnd="url(#revArrow)" />

    <g>
      <rect x="460" y="400" width="140" height="45" fill="#374151" rx="6" />
      <text x="530" y="420" fontSize="10" fill="#fde68a" textAnchor="middle">3. Reconstruct doc</text>
      <text x="530" y="435" fontSize="9" fill="#9ca3af" textAnchor="middle">Full content at v125</text>
    </g>
    <path d="M 600 422 L 640 422" stroke="#FBBC04" strokeWidth="2" markerEnd="url(#revArrow)" />

    <g>
      <rect x="650" y="400" width="180" height="45" fill="#34A853" rx="6" />
      <text x="740" y="420" fontSize="10" fill="white" textAnchor="middle">4. Create new version</text>
      <text x="740" y="435" fontSize="9" fill="#d1fae5" textAnchor="middle">v152 = restored from v125</text>
    </g>
  </svg>
);

export default function GoogleDocs({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 p-4 md:p-8">
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
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              📝 Google Docs System Design
            </h1>
            <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wide">
              Collaborative Editing
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Real-time collaborative document editing · Millions of concurrent users · Conflict resolution · &lt;200ms latency
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-blue-900/30 text-blue-400 rounded-lg text-sm font-medium border border-blue-700">WebSocket Real-Time</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-400 rounded-lg text-sm font-medium border border-green-700">Operational Transform</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-400 rounded-lg text-sm font-medium border border-purple-700">Eventual Consistency</span>
            <span className="px-4 py-2 bg-orange-900/30 text-orange-400 rounded-lg text-sm font-medium border border-orange-700">Distributed System</span>
            <span className="px-4 py-2 bg-pink-900/30 text-pink-400 rounded-lg text-sm font-medium border border-pink-700">Event Streaming</span>
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
            { id: 'overview', label: 'Overview' },
            { id: 'components', label: 'Core Components' },
            { id: 'dataflow', label: 'Data Flow' },
            { id: 'scalability', label: 'Scalability' },
            { id: 'tradeoffs', label: 'Trade-offs' }
          ].map(tab => (
            <button
              key={tab.id}
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
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Overview */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-2xl p-6 border-2 border-blue-700 shadow-lg">
              <h2 className="text-2xl font-bold text-blue-300 mb-4">System Overview</h2>
              <p className="text-blue-200 leading-relaxed">
                Design a real-time collaborative document editing system like Google Docs that allows multiple users to
                simultaneously edit documents, see each other's changes in real-time, handle conflicts, and ensure
                data consistency across distributed servers serving millions of concurrent users.
              </p>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Functional & Non-Functional Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Functional Requirements */}
                <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-2xl p-6 border-2 border-green-700 shadow-sm">
                  <h3 className="text-xl font-bold text-green-300 mb-4">✅ Functional Requirements</h3>
                  <ul className="space-y-2 text-green-200">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Real-time collaborative editing (multiple users)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Character-by-character updates visible to all</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Cursor position tracking for each user</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Conflict resolution (concurrent edits)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Document version history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Offline editing support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Rich text formatting, comments, suggestions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Document sharing & permissions</span>
                    </li>
                  </ul>
                </div>

                {/* Non-Functional Requirements */}
                <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-2xl p-6 border-2 border-orange-700 shadow-sm">
                  <h3 className="text-xl font-bold text-orange-300 mb-4">⚡ Non-Functional Requirements</h3>
                  <ul className="space-y-2 text-orange-200">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span><strong>Latency:</strong> &lt; 200ms for edit propagation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span><strong>Availability:</strong> 99.99% uptime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span><strong>Scale:</strong> Millions of concurrent documents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span><strong>Consistency:</strong> Eventual consistency acceptable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span><strong>Durability:</strong> No data loss</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span><strong>Security:</strong> End-to-end encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span><strong>Concurrency:</strong> 100+ users per document</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* High-Level Architecture */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">High-Level Architecture</h2>
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <GoogleDocsArchitectureDiagram />
              </div>
            </div>

            {/* Presence & Cursors Diagram */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Multi-User Presence & Cursor Tracking</h2>
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <PresenceAndCursorsDiagram />
              </div>
            </div>

          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Core Components Deep Dive</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WebSocket Server */}
              <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-2xl p-6 border-2 border-green-700 shadow-sm">
                <h3 className="text-xl font-bold text-green-300 mb-4">🌐 WebSocket Server</h3>
                <ul className="space-y-3 text-green-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1 font-bold">•</span>
                    <span><strong>Persistent Connections:</strong> Maintain long-lived connections for real-time updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1 font-bold">•</span>
                    <span><strong>Sticky Sessions:</strong> All users of a document connect to same WS server</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1 font-bold">•</span>
                    <span><strong>Heartbeat:</strong> Ping/pong to detect disconnects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1 font-bold">•</span>
                    <span><strong>Reconnection:</strong> Auto-reconnect with exponential backoff</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1 font-bold">•</span>
                    <span><strong>Broadcast:</strong> Push edits to all connected clients instantly</span>
                  </li>
                </ul>
              </div>

              {/* Operational Transform */}
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-2xl p-6 border-2 border-blue-700 shadow-sm">
                <h3 className="text-xl font-bold text-blue-300 mb-4">🔄 Operational Transform (OT)</h3>
                <ul className="space-y-3 text-blue-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    <span><strong>Purpose:</strong> Resolve concurrent editing conflicts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    <span><strong>Operations:</strong> Insert, Delete, Retain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    <span><strong>Transform:</strong> Adjust operations based on concurrent edits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    <span><strong>Example:</strong> User A inserts at pos 5, User B deletes at pos 3 → Transform B's operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    <span><strong>Convergence:</strong> All clients reach same final state</span>
                  </li>
                </ul>
              </div>

              {/* CRDT */}
              <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-2xl p-6 border-2 border-orange-700 shadow-sm">
                <h3 className="text-xl font-bold text-orange-300 mb-4">📊 CRDT (Alternative to OT)</h3>
                <ul className="space-y-3 text-orange-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 font-bold">•</span>
                    <span><strong>Conflict-free:</strong> Mathematically guarantees convergence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 font-bold">•</span>
                    <span><strong>No Server Transform:</strong> Clients merge independently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 font-bold">•</span>
                    <span><strong>Commutative:</strong> Order of operations doesn't matter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 font-bold">•</span>
                    <span><strong>Yjs/Automerge:</strong> Popular CRDT libraries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 font-bold">•</span>
                    <span><strong>Trade-off:</strong> More complex data structures, but simpler logic</span>
                  </li>
                </ul>
              </div>

              {/* Document Storage */}
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-2xl p-6 border-2 border-purple-700 shadow-sm">
                <h3 className="text-xl font-bold text-purple-300 mb-4">💾 Document Storage</h3>
                <ul className="space-y-3 text-purple-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1 font-bold">•</span>
                    <span><strong>Schema:</strong> doc_id, content, metadata, version</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1 font-bold">•</span>
                    <span><strong>Sharding:</strong> Partition by doc_id for horizontal scaling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1 font-bold">•</span>
                    <span><strong>Replication:</strong> Primary-replica for read scaling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1 font-bold">•</span>
                    <span><strong>Snapshots:</strong> Periodic full snapshots (every 100 ops)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1 font-bold">•</span>
                    <span><strong>Operations Log:</strong> Store individual edit operations</span>
                  </li>
                </ul>
              </div>

              {/* Caching Strategy */}
              <div className="bg-gradient-to-br from-pink-900/30 to-pink-900/30 rounded-2xl p-6 border-2 border-pink-700 shadow-sm">
                <h3 className="text-xl font-bold text-pink-300 mb-4">⚡ Caching Strategy</h3>
                <ul className="space-y-3 text-pink-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 mt-1 font-bold">•</span>
                    <span><strong>Redis:</strong> Cache active documents in memory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 mt-1 font-bold">•</span>
                    <span><strong>TTL:</strong> 30 min expiry for inactive docs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 mt-1 font-bold">•</span>
                    <span><strong>LRU Eviction:</strong> Remove least recently used</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 mt-1 font-bold">•</span>
                    <span><strong>Presence Cache:</strong> Active users per document</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 mt-1 font-bold">•</span>
                    <span><strong>Hot Documents:</strong> Pin frequently accessed docs</span>
                  </li>
                </ul>
              </div>

              {/* Version History */}
              <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-900/30 rounded-2xl p-6 border-2 border-emerald-700 shadow-sm">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">📜 Version History</h3>
                <ul className="space-y-3 text-emerald-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span><strong>Snapshots:</strong> Full document state every N edits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span><strong>Diffs:</strong> Store deltas between snapshots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span><strong>Replay:</strong> Reconstruct any version by applying diffs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span><strong>Compression:</strong> LZ4/Snappy for storage efficiency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span><strong>Object Storage:</strong> Move old versions to S3/GCS</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Document Storage Architecture Diagram */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Document Storage Architecture</h2>
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <DocumentStorageDiagram />
              </div>
            </div>

            {/* Revision History & Undo/Redo Diagram */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Revision History & Undo/Redo System</h2>
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <RevisionHistoryDiagram />
              </div>
            </div>
          </div>
        )}

        {/* Data Flow Tab */}
        {activeTab === 'dataflow' && (
          <div className="space-y-8">
            {/* User Edit Flow */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Data Flow: User Makes an Edit</h2>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/50 rounded-2xl p-8 border-2 border-gray-700 shadow-lg">
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="font-bold text-blue-300 mb-2">1. User Types</div>
                    <div className="text-gray-300 ml-4">↓ Client captures keystroke (e.g., insert "H" at position 10)</div>
                    <div className="text-blue-400 ml-4 mt-1">↓ Generate operation: {`{ type: 'insert', pos: 10, char: 'H', userId: 'user123', version: 42 }`}</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                    <div className="font-bold text-green-300 mb-2">2. Optimistic Update</div>
                    <div className="text-gray-300 ml-4">↓ Immediately show "H" in local editor (no lag)</div>
                    <div className="text-green-400 ml-4 mt-1">↓ User sees instant feedback</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500">
                    <div className="font-bold text-purple-300 mb-2">3. Send to Server</div>
                    <div className="text-gray-300 ml-4">↓ WebSocket sends operation to WS server</div>
                    <div className="text-purple-400 ml-4 mt-1">↓ Persistent connection, no HTTP overhead</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-orange-500">
                    <div className="font-bold text-orange-300 mb-2">4. OT/CRDT Transform</div>
                    <div className="text-gray-300 ml-4">↓ Server applies Operational Transform</div>
                    <div className="text-orange-400 ml-4">↓ Check for concurrent edits from other users</div>
                    <div className="text-orange-400 ml-4">↓ Transform operation if needed (e.g., adjust position)</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-indigo-500">
                    <div className="font-bold text-indigo-300 mb-2">5. Persist to DB</div>
                    <div className="text-gray-300 ml-4">↓ Append operation to operations log</div>
                    <div className="text-indigo-400 ml-4">↓ Write to PostgreSQL/MongoDB</div>
                    <div className="text-indigo-400 ml-4">↓ Update document version to 43</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-pink-500">
                    <div className="font-bold text-pink-300 mb-2">6. Broadcast via Pub/Sub</div>
                    <div className="text-gray-300 ml-4">↓ Publish to Kafka/RabbitMQ</div>
                    <div className="text-pink-400 ml-4">↓ Topic: doc_edits_123 (document ID)</div>
                    <div className="text-pink-400 ml-4">↓ All WS servers subscribe to this topic</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-teal-500">
                    <div className="font-bold text-teal-300 mb-2">7. Push to Clients</div>
                    <div className="text-gray-300 ml-4">↓ Each WS server pushes to connected clients</div>
                    <div className="text-teal-400 ml-4">↓ All other users see "H" appear at position 10</div>
                    <div className="text-teal-400 ml-4">↓ Cursor positions updated if necessary</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-cyan-500">
                    <div className="font-bold text-cyan-300 mb-2">8. Update Cache</div>
                    <div className="text-gray-300 ml-4">↓ Redis cache updated with latest doc state</div>
                    <div className="text-cyan-400 ml-4">↓ Next read will be fast (cache hit)</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-lg text-white font-bold text-center mt-6">
                    Total Latency: ~100-200ms end-to-end
                  </div>
                </div>
              </div>
            </div>

            {/* OT Visual Diagram */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Operational Transform - Visual Timeline</h2>
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <OperationalTransformDiagram />
              </div>
            </div>

            {/* Conflict Resolution */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Operational Transform - Conflict Resolution Example</h2>
              <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/30 rounded-2xl p-8 border-2 border-yellow-700 shadow-lg">
                <div className="text-lg font-bold text-yellow-300 mb-6">Scenario: Two users edit simultaneously</div>

                <div className="bg-gray-800 rounded-xl p-6 space-y-4 font-mono text-sm border-2 border-yellow-700">
                  <div className="text-gray-200">
                    <strong>Initial Document State:</strong> "Hello World" (version 10)
                  </div>

                  <div className="border-t-2 border-gray-700 pt-4">
                    <div className="text-blue-300 font-bold">User A Operation:</div>
                    <div className="ml-4 text-gray-300">Insert "Beautiful " at position 6</div>
                    <div className="ml-4 text-blue-400">→ {`{ type: 'insert', pos: 6, text: 'Beautiful ', version: 10 }`}</div>
                    <div className="ml-4 text-gray-300">→ User A's view: "Hello <span className="bg-green-800 px-1">Beautiful </span>World"</div>
                  </div>

                  <div className="border-t-2 border-gray-700 pt-4">
                    <div className="text-purple-300 font-bold">User B Operation:</div>
                    <div className="ml-4 text-gray-300">Delete characters 0-5 (delete "Hello")</div>
                    <div className="ml-4 text-purple-400">→ {`{ type: 'delete', pos: 0, len: 5, version: 10 }`}</div>
                    <div className="ml-4 text-gray-300">→ User B's view: "<span className="bg-red-800 line-through px-1">Hello</span> World"</div>
                  </div>

                  <div className="bg-red-900/50 p-4 rounded-lg border-2 border-red-700">
                    <div className="text-red-300 font-bold">❌ Conflict: Both operations based on version 10!</div>
                  </div>

                  <div className="border-t-2 border-gray-700 pt-4">
                    <div className="text-gray-200 font-bold mb-2">Server Receives Both:</div>
                    <div className="ml-4 space-y-2">
                      <div className="text-gray-300">1. User A's operation arrives first → Applied → Doc version 11</div>
                      <div className="ml-4 text-gray-400">Document: "Hello Beautiful World"</div>
                      <div className="mt-2 text-gray-300">2. User B's operation arrives second → <strong className="text-orange-400">Must Transform!</strong></div>
                      <div className="ml-4 text-orange-400">Original op: Delete(0, 5) based on version 10</div>
                      <div className="ml-4 text-green-400">Transformed op: Delete(0, 5) - User A inserted after pos 6, doesn't affect this delete</div>
                      <div className="ml-4 text-gray-300">Apply delete → Doc version 12</div>
                    </div>
                  </div>

                  <div className="bg-green-900/50 p-4 rounded-lg border-2 border-green-700">
                    <div className="text-green-300 font-bold">✅ Final Converged State: " Beautiful World" (version 12)</div>
                    <div className="text-green-400 italic ml-4 mt-2">All clients eventually converge to this state</div>
                  </div>
                </div>

                <div className="mt-6 text-sm text-yellow-300 italic">
                  Note: This is a simplified example. Real OT is more complex and handles character-level transforms,
                  cursor position adjustments, and maintains causal ordering.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scalability Tab */}
        {activeTab === 'scalability' && (
          <div className="space-y-8">
            {/* Performance Optimizations */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Scalability & Performance Optimizations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/30 rounded-2xl p-6 border-2 border-cyan-700 shadow-sm">
                  <h3 className="text-lg font-bold text-cyan-300 mb-3">🌍 Geographic Distribution</h3>
                  <ul className="space-y-2 text-cyan-200 text-sm">
                    <li>• Deploy WS servers in multiple regions (US, EU, APAC)</li>
                    <li>• Route users to nearest region for low latency</li>
                    <li>• Cross-region replication for disaster recovery</li>
                    <li>• Eventual consistency across regions acceptable</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-2xl p-6 border-2 border-green-700 shadow-sm">
                  <h3 className="text-lg font-bold text-green-300 mb-3">⚡ Connection Pooling</h3>
                  <ul className="space-y-2 text-green-200 text-sm">
                    <li>• Each WS server handles 10K-50K connections</li>
                    <li>• Use C10K problem solutions (epoll, kqueue)</li>
                    <li>• Horizontal scaling by adding more WS servers</li>
                    <li>• Load balancer uses consistent hashing by doc_id</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-2xl p-6 border-2 border-orange-700 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-300 mb-3">📦 Operation Batching</h3>
                  <ul className="space-y-2 text-orange-200 text-sm">
                    <li>• Batch rapid keystrokes (e.g., typing fast)</li>
                    <li>• Send batch every 50-100ms instead of per character</li>
                    <li>• Reduces network overhead and server load</li>
                    <li>• Trade-off: Slight delay vs. reduced load</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-2xl p-6 border-2 border-purple-700 shadow-sm">
                  <h3 className="text-lg font-bold text-purple-300 mb-3">💾 Differential Sync</h3>
                  <ul className="space-y-2 text-purple-200 text-sm">
                    <li>• Only send changed parts of document</li>
                    <li>• Use diffing algorithms (Myers, Google Diff-Match-Patch)</li>
                    <li>• Compress diffs before sending (gzip, Brotli)</li>
                    <li>• Significantly reduces bandwidth</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-pink-900/30 to-pink-900/30 rounded-2xl p-6 border-2 border-pink-700 shadow-sm">
                  <h3 className="text-lg font-bold text-pink-300 mb-3">🔒 Security & Auth</h3>
                  <ul className="space-y-2 text-pink-200 text-sm">
                    <li>• JWT tokens for WebSocket authentication</li>
                    <li>• Document-level permissions (view, edit, comment)</li>
                    <li>• TLS/SSL for encrypted connections</li>
                    <li>• Rate limiting per user to prevent abuse</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-900/30 rounded-2xl p-6 border-2 border-emerald-700 shadow-sm">
                  <h3 className="text-lg font-bold text-emerald-300 mb-3">📊 Monitoring & Observability</h3>
                  <ul className="space-y-2 text-emerald-200 text-sm">
                    <li>• Track: edit latency, WS connection count, OT conflicts</li>
                    <li>• Distributed tracing (Jaeger, Zipkin)</li>
                    <li>• Metrics: Prometheus + Grafana dashboards</li>
                    <li>• Alerts: High latency, connection drops, DB lag</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Capacity Estimation */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Back-of-the-Envelope Capacity Estimation</h2>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/50 rounded-2xl p-8 border-2 border-gray-700 shadow-lg">
                <div className="space-y-6 font-mono text-sm">
                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-blue-500">
                    <div className="font-bold text-blue-300 mb-3 text-lg">Assumptions</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• 100 million users, 10% active daily = 10M DAU</div>
                      <div>• Average 5 documents open per user per day</div>
                      <div>• Average 100 edits per document per session</div>
                      <div>• Peak concurrent users: 1M</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-500">
                    <div className="font-bold text-green-300 mb-3 text-lg">Storage</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• 500M total documents</div>
                      <div>• Average doc size: 50 KB (text + metadata)</div>
                      <div>• Total: 500M * 50 KB = 25 TB</div>
                      <div className="text-green-400 font-bold">• With version history (10x): 250 TB</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-purple-500">
                    <div className="font-bold text-purple-300 mb-3 text-lg">Bandwidth</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• 10M DAU * 5 docs * 100 edits = 5B operations/day</div>
                      <div>• 5B / 86400 sec ≈ 58K operations/sec</div>
                      <div className="text-purple-400 font-bold">• Peak (3x average): ~175K ops/sec</div>
                      <div>• Operation size: 200 bytes (JSON)</div>
                      <div className="text-purple-400 font-bold">• Bandwidth: 175K * 200 bytes = 35 MB/sec = 280 Mbps</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-orange-500">
                    <div className="font-bold text-orange-300 mb-3 text-lg">WebSocket Servers</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• 1M concurrent connections</div>
                      <div>• Each server handles 50K connections</div>
                      <div className="text-orange-400 font-bold">• Required servers: 1M / 50K = 20 servers</div>
                      <div className="text-orange-400 font-bold">• With 2x redundancy: 40 servers</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-pink-500">
                    <div className="font-bold text-pink-300 mb-3 text-lg">Database</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• 175K writes/sec during peak</div>
                      <div>• Use sharding (10 shards): 17.5K writes/sec per shard</div>
                      <div>• Each shard: Primary + 2 replicas</div>
                      <div className="text-pink-400 font-bold">• Total DB instances: 30 (10 primaries + 20 replicas)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trade-offs Tab */}
        {activeTab === 'tradeoffs' && (
          <div className="space-y-8">
            {/* Technology Stack */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  'WebSocket (Socket.io / ws)',
                  'Operational Transform (OT)',
                  'CRDT (Yjs / Automerge)',
                  'Node.js / Go',
                  'React / Vue.js',
                  'Redis Cache',
                  'PostgreSQL / MongoDB',
                  'Kafka / RabbitMQ',
                  'AWS S3 / Google Cloud Storage',
                  'Kubernetes',
                  'Docker',
                  'NGINX Load Balancer',
                  'JWT Authentication',
                  'Prometheus',
                  'Grafana',
                  'Distributed Tracing'
                ].map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 border-2 border-gray-600 rounded-lg text-sm font-semibold text-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Trade-offs */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Key Trade-offs & Design Decisions</h2>
              <div className="space-y-6">
                {/* OT vs CRDT */}
                <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-2xl p-8 border-2 border-orange-700 shadow-lg">
                  <h3 className="text-xl font-bold text-orange-300 mb-4">1. OT vs CRDT</h3>
                  <div className="space-y-3 text-orange-200">
                    <div><strong className="text-orange-300">OT Pros:</strong> More mature, better for text, simpler data structures</div>
                    <div><strong className="text-orange-300">OT Cons:</strong> Requires centralized server for transform, complex algorithm</div>
                    <div><strong className="text-orange-300">CRDT Pros:</strong> Decentralized, guaranteed convergence, simpler logic</div>
                    <div><strong className="text-orange-300">CRDT Cons:</strong> Complex data structures, higher memory usage</div>
                    <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-orange-500 mt-4">
                      <strong className="text-orange-300">Decision:</strong> Use OT for simplicity (Google Docs uses OT)
                    </div>
                  </div>
                </div>

                {/* Consistency vs Availability */}
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-2xl p-8 border-2 border-purple-700 shadow-lg">
                  <h3 className="text-xl font-bold text-purple-300 mb-4">2. Consistency vs Availability (CAP Theorem)</h3>
                  <div className="space-y-3 text-purple-200">
                    <div><strong className="text-purple-300">Trade-off:</strong> Can't have both strong consistency AND high availability in distributed system</div>
                    <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500">
                      <strong className="text-purple-300">Decision:</strong> Choose Availability + Eventual Consistency
                    </div>
                    <div><strong className="text-purple-300">Reasoning:</strong> Users can tolerate seeing slightly stale cursor positions, but not disconnections</div>
                  </div>
                </div>

                {/* WebSocket vs Long Polling */}
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-2xl p-8 border-2 border-blue-700 shadow-lg">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">3. WebSocket vs Long Polling</h3>
                  <div className="space-y-3 text-blue-200">
                    <div><strong className="text-blue-300">WebSocket Pros:</strong> True real-time, bidirectional, low latency</div>
                    <div><strong className="text-blue-300">WebSocket Cons:</strong> Not supported by all proxies/firewalls</div>
                    <div><strong className="text-blue-300">Long Polling:</strong> Fallback for legacy environments</div>
                    <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
                      <strong className="text-blue-300">Decision:</strong> WebSocket primary, Long Polling fallback
                    </div>
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

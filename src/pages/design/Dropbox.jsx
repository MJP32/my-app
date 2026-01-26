import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { useTheme } from '../../contexts/ThemeContext'

// SVG Diagram: High-Level Architecture
const DropboxArchitectureDiagram = () => (
  <svg viewBox="0 0 900 500" style={{ width: '100%', maxWidth: '900px', height: 'auto' }}>
    <defs>
      <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="syncGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <linearGradient id="blockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="metaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="storageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>

    {/* Background */}
    <rect width="900" height="500" fill="#1F2937" rx="12"/>

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#F9FAFB" fontSize="18" fontWeight="bold">Dropbox High-Level Architecture</text>

    {/* Desktop Client */}
    <g filter="url(#shadow)">
      <rect x="50" y="70" width="140" height="80" rx="8" fill="url(#clientGrad)"/>
      <text x="120" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Desktop Client</text>
      <text x="120" y="125" textAnchor="middle" fill="#BFDBFE" fontSize="10">Windows/Mac/Linux</text>
      <text x="120" y="140" textAnchor="middle" fill="#BFDBFE" fontSize="18">&#128187;</text>
    </g>

    {/* Mobile Client */}
    <g filter="url(#shadow)">
      <rect x="50" y="170" width="140" height="80" rx="8" fill="url(#clientGrad)"/>
      <text x="120" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Mobile Client</text>
      <text x="120" y="225" textAnchor="middle" fill="#BFDBFE" fontSize="10">iOS / Android</text>
      <text x="120" y="240" textAnchor="middle" fill="#BFDBFE" fontSize="18">&#128241;</text>
    </g>

    {/* Web Client */}
    <g filter="url(#shadow)">
      <rect x="50" y="270" width="140" height="80" rx="8" fill="url(#clientGrad)"/>
      <text x="120" y="305" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Web Browser</text>
      <text x="120" y="325" textAnchor="middle" fill="#BFDBFE" fontSize="10">dropbox.com</text>
      <text x="120" y="340" textAnchor="middle" fill="#BFDBFE" fontSize="18">&#127760;</text>
    </g>

    {/* Arrows from clients to sync service */}
    <path d="M190 110 L280 200" stroke="#60A5FA" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)"/>
    <path d="M190 210 L280 210" stroke="#60A5FA" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)"/>
    <path d="M190 310 L280 220" stroke="#60A5FA" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)"/>

    {/* Sync Service */}
    <g filter="url(#shadow)">
      <rect x="280" y="160" width="160" height="100" rx="8" fill="url(#syncGrad)"/>
      <text x="360" y="195" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Sync Service</text>
      <text x="360" y="215" textAnchor="middle" fill="#DDD6FE" fontSize="10">WebSocket + Long Poll</text>
      <text x="360" y="235" textAnchor="middle" fill="#DDD6FE" fontSize="10">Change Detection</text>
      <text x="360" y="250" textAnchor="middle" fill="#DDD6FE" fontSize="16">&#128260;</text>
    </g>

    {/* Arrow to Block Servers */}
    <path d="M440 190 L520 140" stroke="#A78BFA" strokeWidth="2" fill="none" markerEnd="url(#arrowPurple)"/>

    {/* Arrow to Metadata DB */}
    <path d="M440 230 L520 280" stroke="#A78BFA" strokeWidth="2" fill="none" markerEnd="url(#arrowPurple)"/>

    {/* Block Servers */}
    <g filter="url(#shadow)">
      <rect x="520" y="80" width="160" height="100" rx="8" fill="url(#blockGrad)"/>
      <text x="600" y="115" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Block Servers</text>
      <text x="600" y="135" textAnchor="middle" fill="#A7F3D0" fontSize="10">Chunking (4MB)</text>
      <text x="600" y="155" textAnchor="middle" fill="#A7F3D0" fontSize="10">Deduplication</text>
      <text x="600" y="170" textAnchor="middle" fill="#A7F3D0" fontSize="16">&#128230;</text>
    </g>

    {/* Metadata DB */}
    <g filter="url(#shadow)">
      <rect x="520" y="240" width="160" height="100" rx="8" fill="url(#metaGrad)"/>
      <text x="600" y="275" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Metadata DB</text>
      <text x="600" y="295" textAnchor="middle" fill="#FDE68A" fontSize="10">PostgreSQL (Sharded)</text>
      <text x="600" y="315" textAnchor="middle" fill="#FDE68A" fontSize="10">Files, Folders, Users</text>
      <text x="600" y="330" textAnchor="middle" fill="#FDE68A" fontSize="16">&#128451;</text>
    </g>

    {/* Arrow to Cloud Storage */}
    <path d="M680 130 L760 200" stroke="#34D399" strokeWidth="2" fill="none" markerEnd="url(#arrowGreen)"/>
    <path d="M680 290 L760 220" stroke="#FBBF24" strokeWidth="2" fill="none" markerEnd="url(#arrowYellow)"/>

    {/* Cloud Storage (S3) */}
    <g filter="url(#shadow)">
      <rect x="760" y="160" width="120" height="100" rx="8" fill="url(#storageGrad)"/>
      <text x="820" y="195" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Cloud Storage</text>
      <text x="820" y="215" textAnchor="middle" fill="#FBCFE8" fontSize="10">Amazon S3</text>
      <text x="820" y="235" textAnchor="middle" fill="#FBCFE8" fontSize="10">Block Data</text>
      <text x="820" y="250" textAnchor="middle" fill="#FBCFE8" fontSize="16">&#9729;</text>
    </g>

    {/* Cache Layer */}
    <g filter="url(#shadow)">
      <rect x="380" y="380" width="140" height="70" rx="8" fill="#374151" stroke="#6B7280" strokeWidth="2"/>
      <text x="450" y="410" textAnchor="middle" fill="#F9FAFB" fontSize="12" fontWeight="bold">Redis Cache</text>
      <text x="450" y="430" textAnchor="middle" fill="#9CA3AF" fontSize="10">Metadata + Sessions</text>
    </g>

    {/* Arrow from Sync to Cache */}
    <path d="M360 260 L400 380" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5" fill="none"/>

    {/* Message Queue */}
    <g filter="url(#shadow)">
      <rect x="580" y="380" width="140" height="70" rx="8" fill="#374151" stroke="#6B7280" strokeWidth="2"/>
      <text x="650" y="410" textAnchor="middle" fill="#F9FAFB" fontSize="12" fontWeight="bold">Message Queue</text>
      <text x="650" y="430" textAnchor="middle" fill="#9CA3AF" fontSize="10">Kafka / SQS</text>
    </g>

    {/* Arrow from Metadata to Queue */}
    <path d="M600 340 L620 380" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5" fill="none"/>

    {/* Legend */}
    <rect x="50" y="400" width="200" height="80" rx="6" fill="#111827" stroke="#374151"/>
    <text x="60" y="420" fill="#9CA3AF" fontSize="10">Legend:</text>
    <line x1="60" y1="435" x2="90" y2="435" stroke="#60A5FA" strokeWidth="2"/>
    <text x="95" y="438" fill="#9CA3AF" fontSize="9">Client Connection</text>
    <line x1="60" y1="455" x2="90" y2="455" stroke="#A78BFA" strokeWidth="2"/>
    <text x="95" y="458" fill="#9CA3AF" fontSize="9">Internal Service</text>
    <line x1="60" y1="475" x2="90" y2="475" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="95" y="478" fill="#9CA3AF" fontSize="9">Async / Cache</text>

    {/* Arrow markers */}
    <defs>
      <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#60A5FA"/>
      </marker>
      <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#A78BFA"/>
      </marker>
      <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#34D399"/>
      </marker>
      <marker id="arrowYellow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#FBBF24"/>
      </marker>
    </defs>
  </svg>
)

// SVG Diagram: File Sync / Block-Level Synchronization
const FileSyncDiagram = () => (
  <svg viewBox="0 0 900 450" style={{ width: '100%', maxWidth: '900px', height: 'auto' }}>
    <defs>
      <linearGradient id="fileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="chunkGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="chunkGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="chunkGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
      <linearGradient id="hashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <filter id="shadowSync" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>

    {/* Background */}
    <rect width="900" height="450" fill="#1F2937" rx="12"/>

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#F9FAFB" fontSize="18" fontWeight="bold">{`Block-Level Synchronization & Deduplication`}</text>

    {/* Original File */}
    <g filter="url(#shadowSync)">
      <rect x="40" y="70" width="120" height="160" rx="6" fill="url(#fileGrad)"/>
      <text x="100" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Original File</text>
      <text x="100" y="115" textAnchor="middle" fill="#BFDBFE" fontSize="10">document.pdf</text>
      <text x="100" y="135" textAnchor="middle" fill="#BFDBFE" fontSize="10">(12 MB)</text>
      <rect x="55" y="150" width="90" height="70" rx="4" fill="white" opacity="0.2"/>
      <text x="100" y="190" textAnchor="middle" fill="white" fontSize="28">&#128196;</text>
    </g>

    {/* Chunking Arrow */}
    <path d="M160 150 L200 150" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowBlueSync)"/>
    <text x="180" y="140" textAnchor="middle" fill="#9CA3AF" fontSize="9">Chunk</text>

    {/* Chunked Blocks */}
    <g filter="url(#shadowSync)">
      <rect x="210" y="60" width="100" height="50" rx="4" fill="url(#chunkGrad1)"/>
      <text x="260" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Chunk 1</text>
      <text x="260" y="100" textAnchor="middle" fill="#A7F3D0" fontSize="9">4 MB</text>
    </g>

    <g filter="url(#shadowSync)">
      <rect x="210" y="120" width="100" height="50" rx="4" fill="url(#chunkGrad2)"/>
      <text x="260" y="140" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Chunk 2</text>
      <text x="260" y="160" textAnchor="middle" fill="#FDE68A" fontSize="9">4 MB</text>
    </g>

    <g filter="url(#shadowSync)">
      <rect x="210" y="180" width="100" height="50" rx="4" fill="url(#chunkGrad3)"/>
      <text x="260" y="200" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Chunk 3</text>
      <text x="260" y="220" textAnchor="middle" fill="#FBCFE8" fontSize="9">4 MB</text>
    </g>

    {/* Hash Computation Arrow */}
    <path d="M310 85 L360 85" stroke="#34D399" strokeWidth="2" markerEnd="url(#arrowGreenSync)"/>
    <path d="M310 145 L360 145" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrowYellowSync)"/>
    <path d="M310 205 L360 205" stroke="#EC4899" strokeWidth="2" markerEnd="url(#arrowPinkSync)"/>
    <text x="335" y="255" textAnchor="middle" fill="#9CA3AF" fontSize="9">SHA-256</text>

    {/* Hash Values */}
    <g filter="url(#shadowSync)">
      <rect x="370" y="60" width="140" height="50" rx="4" fill="url(#hashGrad)"/>
      <text x="440" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Hash: a3f2b1c...</text>
      <text x="440" y="100" textAnchor="middle" fill="#DDD6FE" fontSize="8">Unique identifier</text>
    </g>

    <g filter="url(#shadowSync)">
      <rect x="370" y="120" width="140" height="50" rx="4" fill="url(#hashGrad)"/>
      <text x="440" y="140" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Hash: 7e9d4f2...</text>
      <text x="440" y="160" textAnchor="middle" fill="#DDD6FE" fontSize="8">Unique identifier</text>
    </g>

    <g filter="url(#shadowSync)">
      <rect x="370" y="180" width="140" height="50" rx="4" fill="url(#hashGrad)"/>
      <text x="440" y="200" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Hash: b2c8e5a...</text>
      <text x="440" y="220" textAnchor="middle" fill="#DDD6FE" fontSize="8">Unique identifier</text>
    </g>

    {/* Check Hash Index Arrow */}
    <path d="M510 145 L560 145" stroke="#A78BFA" strokeWidth="2" markerEnd="url(#arrowPurpleSync)"/>
    <text x="535" y="135" textAnchor="middle" fill="#9CA3AF" fontSize="9">Lookup</text>

    {/* Hash Index (DynamoDB) */}
    <g filter="url(#shadowSync)">
      <rect x="570" y="70" width="130" height="150" rx="6" fill="#374151" stroke="#6B7280" strokeWidth="2"/>
      <text x="635" y="95" textAnchor="middle" fill="#F9FAFB" fontSize="11" fontWeight="bold">Hash Index</text>
      <text x="635" y="115" textAnchor="middle" fill="#9CA3AF" fontSize="9">(DynamoDB)</text>
      <line x1="585" y1="125" x2="685" y2="125" stroke="#4B5563"/>
      <text x="590" y="145" fill="#10B981" fontSize="9">{`a3f2b1c... &#10004;`}</text>
      <text x="590" y="165" fill="#EF4444" fontSize="9">{`7e9d4f2... &#10008;`}</text>
      <text x="590" y="185" fill="#10B981" fontSize="9">{`b2c8e5a... &#10004;`}</text>
      <text x="635" y="210" textAnchor="middle" fill="#6B7280" fontSize="8">Exists? Y/N</text>
    </g>

    {/* Upload Decision Arrow */}
    <path d="M700 145 L750 145" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowGraySync)"/>
    <text x="725" y="135" textAnchor="middle" fill="#9CA3AF" fontSize="9">Upload</text>

    {/* S3 Storage */}
    <g filter="url(#shadowSync)">
      <rect x="760" y="70" width="120" height="150" rx="6" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="2"/>
      <text x="820" y="95" textAnchor="middle" fill="#F9FAFB" fontSize="11" fontWeight="bold">S3 Storage</text>
      <line x1="775" y1="105" x2="865" y2="105" stroke="#3B82F6"/>
      <text x="820" y="130" textAnchor="middle" fill="#9CA3AF" fontSize="9">Only Chunk 2</text>
      <text x="820" y="150" textAnchor="middle" fill="#9CA3AF" fontSize="9">uploaded!</text>
      <rect x="785" y="160" width="70" height="40" rx="4" fill="url(#chunkGrad2)"/>
      <text x="820" y="185" textAnchor="middle" fill="white" fontSize="9">Chunk 2</text>
    </g>

    {/* Bottom Section - Dedup Savings */}
    <rect x="40" y="280" width="840" height="150" rx="8" fill="#111827" stroke="#374151"/>
    <text x="460" y="310" textAnchor="middle" fill="#F9FAFB" fontSize="14" fontWeight="bold">Deduplication Savings</text>

    {/* Without Dedup */}
    <rect x="70" y="330" width="350" height="80" rx="6" fill="#7F1D1D" fillOpacity="0.3" stroke="#EF4444"/>
    <text x="245" y="355" textAnchor="middle" fill="#FCA5A5" fontSize="11" fontWeight="bold">Without Deduplication</text>
    <rect x="90" y="365" width="80" height="30" rx="3" fill="#EF4444"/>
    <rect x="175" y="365" width="80" height="30" rx="3" fill="#EF4444"/>
    <rect x="260" y="365" width="80" height="30" rx="3" fill="#EF4444"/>
    <text x="245" y="410" textAnchor="middle" fill="#FCA5A5" fontSize="10">Upload: 12 MB (all chunks)</text>

    {/* With Dedup */}
    <rect x="480" y="330" width="350" height="80" rx="6" fill="#14532D" fillOpacity="0.3" stroke="#10B981"/>
    <text x="655" y="355" textAnchor="middle" fill="#6EE7B7" fontSize="11" fontWeight="bold">With Deduplication</text>
    <rect x="500" y="365" width="80" height="30" rx="3" fill="#374151" stroke="#6B7280" strokeDasharray="4"/>
    <text x="540" y="385" textAnchor="middle" fill="#6B7280" fontSize="8">Skip</text>
    <rect x="585" y="365" width="80" height="30" rx="3" fill="#10B981"/>
    <text x="625" y="385" textAnchor="middle" fill="white" fontSize="8">Upload</text>
    <rect x="670" y="365" width="80" height="30" rx="3" fill="#374151" stroke="#6B7280" strokeDasharray="4"/>
    <text x="710" y="385" textAnchor="middle" fill="#6B7280" fontSize="8">Skip</text>
    <text x="655" y="410" textAnchor="middle" fill="#6EE7B7" fontSize="10">Upload: 4 MB only (67% saved!)</text>

    {/* Arrow markers */}
    <defs>
      <marker id="arrowBlueSync" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#60A5FA"/>
      </marker>
      <marker id="arrowPurpleSync" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#A78BFA"/>
      </marker>
      <marker id="arrowGreenSync" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#34D399"/>
      </marker>
      <marker id="arrowYellowSync" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#FBBF24"/>
      </marker>
      <marker id="arrowPinkSync" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#EC4899"/>
      </marker>
      <marker id="arrowGraySync" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#6B7280"/>
      </marker>
    </defs>
  </svg>
)

// SVG Diagram: Conflict Resolution
const ConflictResolutionDiagram = () => (
  <svg viewBox="0 0 900 480" style={{ width: '100%', maxWidth: '900px', height: 'auto' }}>
    <defs>
      <linearGradient id="device1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="device2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="serverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <linearGradient id="conflictGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
      <linearGradient id="resolveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="shadowConflict" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>

    {/* Background */}
    <rect width="900" height="480" fill="#1F2937" rx="12"/>

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#F9FAFB" fontSize="18" fontWeight="bold">{`Conflict Detection & Resolution`}</text>

    {/* Timeline */}
    <line x1="50" y1="450" x2="850" y2="450" stroke="#4B5563" strokeWidth="2"/>
    <text x="50" y="470" fill="#9CA3AF" fontSize="10">T0</text>
    <text x="250" y="470" fill="#9CA3AF" fontSize="10">T1</text>
    <text x="450" y="470" fill="#9CA3AF" fontSize="10">T2</text>
    <text x="650" y="470" fill="#9CA3AF" fontSize="10">T3</text>
    <text x="850" y="470" fill="#9CA3AF" fontSize="10">T4</text>

    {/* Device A - Laptop */}
    <g filter="url(#shadowConflict)">
      <rect x="40" y="70" width="120" height="80" rx="6" fill="url(#device1Grad)"/>
      <text x="100" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Device A</text>
      <text x="100" y="120" textAnchor="middle" fill="#BFDBFE" fontSize="10">Laptop</text>
      <text x="100" y="140" textAnchor="middle" fill="white" fontSize="16">&#128187;</text>
    </g>

    {/* Device B - Phone */}
    <g filter="url(#shadowConflict)">
      <rect x="40" y="180" width="120" height="80" rx="6" fill="url(#device2Grad)"/>
      <text x="100" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Device B</text>
      <text x="100" y="230" textAnchor="middle" fill="#A7F3D0" fontSize="10">Phone</text>
      <text x="100" y="250" textAnchor="middle" fill="white" fontSize="16">&#128241;</text>
    </g>

    {/* Server */}
    <g filter="url(#shadowConflict)">
      <rect x="40" y="300" width="120" height="80" rx="6" fill="url(#serverGrad)"/>
      <text x="100" y="330" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Server</text>
      <text x="100" y="350" textAnchor="middle" fill="#DDD6FE" fontSize="10">Dropbox Cloud</text>
      <text x="100" y="370" textAnchor="middle" fill="white" fontSize="16">&#9729;</text>
    </g>

    {/* Initial State - T0 */}
    <rect x="180" y="70" width="80" height="40" rx="4" fill="#374151" stroke="#6B7280"/>
    <text x="220" y="95" textAnchor="middle" fill="#9CA3AF" fontSize="9">file.txt v1</text>

    <rect x="180" y="200" width="80" height="40" rx="4" fill="#374151" stroke="#6B7280"/>
    <text x="220" y="225" textAnchor="middle" fill="#9CA3AF" fontSize="9">file.txt v1</text>

    <rect x="180" y="320" width="80" height="40" rx="4" fill="#374151" stroke="#6B7280"/>
    <text x="220" y="345" textAnchor="middle" fill="#9CA3AF" fontSize="9">file.txt v1</text>

    {/* T1 - Device A edits */}
    <rect x="290" y="70" width="100" height="50" rx="4" fill="url(#device1Grad)"/>
    <text x="340" y="90" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Edit: "Hello"</text>
    <text x="340" y="110" textAnchor="middle" fill="#BFDBFE" fontSize="8">Local v2a</text>

    {/* T1 - Device B edits (simultaneously) */}
    <rect x="290" y="200" width="100" height="50" rx="4" fill="url(#device2Grad)"/>
    <text x="340" y="220" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Edit: "World"</text>
    <text x="340" y="240" textAnchor="middle" fill="#A7F3D0" fontSize="8">Local v2b</text>

    {/* Arrows from devices to server */}
    <path d="M390 95 L460 320" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowBlueConflict)"/>
    <text x="410" y="200" fill="#60A5FA" fontSize="8" transform="rotate(60 410 200)">Sync @T2</text>

    <path d="M390 225 L470 320" stroke="#34D399" strokeWidth="2" markerEnd="url(#arrowGreenConflict)"/>
    <text x="450" y="260" fill="#34D399" fontSize="8" transform="rotate(55 450 260)">Sync @T2.1</text>

    {/* T2 - Conflict Detection */}
    <g filter="url(#shadowConflict)">
      <rect x="480" y="290" width="140" height="100" rx="6" fill="url(#conflictGrad)"/>
      <text x="550" y="320" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">CONFLICT!</text>
      <text x="550" y="340" textAnchor="middle" fill="#FECACA" fontSize="9">Both modified v1</text>
      <text x="550" y="360" textAnchor="middle" fill="#FECACA" fontSize="9">Base version same</text>
      <text x="550" y="380" textAnchor="middle" fill="white" fontSize="14">&#9888;</text>
    </g>

    {/* T3 - Resolution */}
    <g filter="url(#shadowConflict)">
      <rect x="660" y="280" width="180" height="120" rx="6" fill="url(#resolveGrad)"/>
      <text x="750" y="305" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Resolution (LWW)</text>
      <line x1="675" y1="315" x2="825" y2="315" stroke="white" strokeOpacity="0.3"/>
      <text x="750" y="335" textAnchor="middle" fill="#FEF3C7" fontSize="9">Winner: Device B</text>
      <text x="750" y="355" textAnchor="middle" fill="#FEF3C7" fontSize="8">(Later timestamp)</text>
      <rect x="680" y="365" width="140" height="25" rx="3" fill="white" fillOpacity="0.2"/>
      <text x="750" y="382" textAnchor="middle" fill="white" fontSize="8">file.txt v2 = "World"</text>
    </g>

    {/* Arrow from conflict to resolution */}
    <path d="M620 340 L660 340" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrowOrangeConflict)"/>

    {/* T4 - Final State */}
    <rect x="720" y="70" width="120" height="50" rx="4" fill="#374151" stroke="#3B82F6"/>
    <text x="780" y="90" textAnchor="middle" fill="#60A5FA" fontSize="9">file.txt v2</text>
    <text x="780" y="108" textAnchor="middle" fill="#9CA3AF" fontSize="8">"World"</text>

    <rect x="720" y="135" width="120" height="50" rx="4" fill="#374151" stroke="#EF4444" strokeDasharray="4"/>
    <text x="780" y="155" textAnchor="middle" fill="#FCA5A5" fontSize="8">file (A's conflict)</text>
    <text x="780" y="170" textAnchor="middle" fill="#9CA3AF" fontSize="8">"Hello"</text>

    <rect x="720" y="200" width="120" height="50" rx="4" fill="#374151" stroke="#10B981"/>
    <text x="780" y="220" textAnchor="middle" fill="#6EE7B7" fontSize="9">file.txt v2</text>
    <text x="780" y="238" textAnchor="middle" fill="#9CA3AF" fontSize="8">"World"</text>

    {/* Arrow from resolution to final states */}
    <path d="M750 280 L780 185" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4"/>

    {/* Legend Box */}
    <rect x="50" y="400" width="280" height="40" rx="4" fill="#111827" stroke="#374151"/>
    <text x="60" y="420" fill="#9CA3AF" fontSize="9">Conflict Copy: "file (User A's conflicted copy).txt"</text>
    <text x="60" y="432" fill="#6B7280" fontSize="8">Preserves both versions for manual merge</text>

    {/* Arrow markers */}
    <defs>
      <marker id="arrowBlueConflict" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#60A5FA"/>
      </marker>
      <marker id="arrowGreenConflict" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#34D399"/>
      </marker>
      <marker id="arrowOrangeConflict" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#F59E0B"/>
      </marker>
    </defs>
  </svg>
)

// SVG Diagram: Metadata Service
const MetadataServiceDiagram = () => (
  <svg viewBox="0 0 900 450" style={{ width: '100%', maxWidth: '900px', height: 'auto' }}>
    <defs>
      <linearGradient id="apiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="cacheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
      <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="shardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <filter id="shadowMeta" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>

    {/* Background */}
    <rect width="900" height="450" fill="#1F2937" rx="12"/>

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#F9FAFB" fontSize="18" fontWeight="bold">Metadata Service Architecture</text>

    {/* Client Request */}
    <g filter="url(#shadowMeta)">
      <rect x="40" y="80" width="120" height="70" rx="6" fill="#374151" stroke="#6B7280"/>
      <text x="100" y="110" textAnchor="middle" fill="#F9FAFB" fontSize="11" fontWeight="bold">Client</text>
      <text x="100" y="130" textAnchor="middle" fill="#9CA3AF" fontSize="9">GET /files/metadata</text>
    </g>

    {/* Arrow to API */}
    <path d="M160 115 L220 115" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowBlueMeta)"/>

    {/* API Gateway */}
    <g filter="url(#shadowMeta)">
      <rect x="230" y="70" width="140" height="90" rx="6" fill="url(#apiGrad)"/>
      <text x="300" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Metadata API</text>
      <text x="300" y="120" textAnchor="middle" fill="#BFDBFE" fontSize="9">Authentication</text>
      <text x="300" y="140" textAnchor="middle" fill="#BFDBFE" fontSize="9">Rate Limiting</text>
    </g>

    {/* Arrow to Cache */}
    <path d="M370 100 L440 100" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowBlueMeta)"/>
    <text x="405" y="90" textAnchor="middle" fill="#9CA3AF" fontSize="8">1. Check</text>

    {/* Redis Cache */}
    <g filter="url(#shadowMeta)">
      <rect x="450" y="60" width="150" height="100" rx="6" fill="url(#cacheGrad)"/>
      <text x="525" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Redis Cache</text>
      <text x="525" y="110" textAnchor="middle" fill="#FECACA" fontSize="9">TTL: 5 minutes</text>
      <text x="525" y="130" textAnchor="middle" fill="#FECACA" fontSize="9">Hot metadata</text>
      <text x="525" y="150" textAnchor="middle" fill="white" fontSize="14">&#9889;</text>
    </g>

    {/* Cache Hit Arrow */}
    <path d="M525 160 L525 190 L160 190 L160 130" stroke="#10B981" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowGreenMeta)"/>
    <text x="340" y="185" textAnchor="middle" fill="#10B981" fontSize="8">Cache Hit (fast!)</text>

    {/* Cache Miss Arrow */}
    <path d="M600 110 L680 110 L680 200" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrowRedMeta)"/>
    <text x="640" y="100" textAnchor="middle" fill="#EF4444" fontSize="8">Miss</text>

    {/* Shard Router */}
    <g filter="url(#shadowMeta)">
      <rect x="620" y="210" width="140" height="80" rx="6" fill="#374151" stroke="#6B7280"/>
      <text x="690" y="240" textAnchor="middle" fill="#F9FAFB" fontSize="11" fontWeight="bold">Shard Router</text>
      <text x="690" y="260" textAnchor="middle" fill="#9CA3AF" fontSize="9">user_id % N</text>
      <text x="690" y="280" textAnchor="middle" fill="#9CA3AF" fontSize="9">Consistent Hash</text>
    </g>

    {/* Arrows to Shards */}
    <path d="M620 250 L520 320" stroke="#A78BFA" strokeWidth="2" markerEnd="url(#arrowPurpleMeta)"/>
    <path d="M690 290 L690 320" stroke="#A78BFA" strokeWidth="2" markerEnd="url(#arrowPurpleMeta)"/>
    <path d="M760 250 L840 320" stroke="#A78BFA" strokeWidth="2" markerEnd="url(#arrowPurpleMeta)"/>

    {/* Database Shards */}
    <g filter="url(#shadowMeta)">
      <rect x="440" y="330" width="120" height="100" rx="6" fill="url(#shardGrad)"/>
      <text x="500" y="360" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Shard 1</text>
      <text x="500" y="380" textAnchor="middle" fill="#DDD6FE" fontSize="8">PostgreSQL</text>
      <text x="500" y="400" textAnchor="middle" fill="#DDD6FE" fontSize="8">Users 0-99M</text>
      <rect x="455" y="405" width="90" height="18" rx="2" fill="white" fillOpacity="0.1"/>
      <text x="500" y="417" textAnchor="middle" fill="#DDD6FE" fontSize="7">Read Replicas: 3</text>
    </g>

    <g filter="url(#shadowMeta)">
      <rect x="620" y="330" width="120" height="100" rx="6" fill="url(#shardGrad)"/>
      <text x="680" y="360" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Shard 2</text>
      <text x="680" y="380" textAnchor="middle" fill="#DDD6FE" fontSize="8">PostgreSQL</text>
      <text x="680" y="400" textAnchor="middle" fill="#DDD6FE" fontSize="8">Users 100-199M</text>
      <rect x="635" y="405" width="90" height="18" rx="2" fill="white" fillOpacity="0.1"/>
      <text x="680" y="417" textAnchor="middle" fill="#DDD6FE" fontSize="7">Read Replicas: 3</text>
    </g>

    <g filter="url(#shadowMeta)">
      <rect x="780" y="330" width="100" height="100" rx="6" fill="url(#shardGrad)"/>
      <text x="830" y="360" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Shard N</text>
      <text x="830" y="380" textAnchor="middle" fill="#DDD6FE" fontSize="8">PostgreSQL</text>
      <text x="830" y="400" textAnchor="middle" fill="#DDD6FE" fontSize="8">Users ...</text>
      <text x="830" y="420" textAnchor="middle" fill="white" fontSize="10">...</text>
    </g>

    {/* Schema Box */}
    <rect x="40" y="230" width="200" height="200" rx="6" fill="#111827" stroke="#374151"/>
    <text x="140" y="255" textAnchor="middle" fill="#F9FAFB" fontSize="11" fontWeight="bold">Metadata Schema</text>
    <line x1="50" y1="265" x2="230" y2="265" stroke="#374151"/>
    <text x="55" y="285" fill="#60A5FA" fontSize="9" fontFamily="monospace">file_id: UUID</text>
    <text x="55" y="302" fill="#9CA3AF" fontSize="9" fontFamily="monospace">name: VARCHAR</text>
    <text x="55" y="319" fill="#9CA3AF" fontSize="9" fontFamily="monospace">path: VARCHAR</text>
    <text x="55" y="336" fill="#9CA3AF" fontSize="9" fontFamily="monospace">size: BIGINT</text>
    <text x="55" y="353" fill="#9CA3AF" fontSize="9" fontFamily="monospace">chunks: JSONB[]</text>
    <text x="55" y="370" fill="#9CA3AF" fontSize="9" fontFamily="monospace">version: INT</text>
    <text x="55" y="387" fill="#9CA3AF" fontSize="9" fontFamily="monospace">modified_at: TIMESTAMP</text>
    <text x="55" y="404" fill="#10B981" fontSize="9" fontFamily="monospace">user_id: UUID (shard key)</text>
    <text x="55" y="421" fill="#9CA3AF" fontSize="9" fontFamily="monospace">permissions: JSONB</text>

    {/* Response Flow */}
    <rect x="270" y="200" width="120" height="50" rx="4" fill="#14532D" stroke="#10B981"/>
    <text x="330" y="225" textAnchor="middle" fill="#6EE7B7" fontSize="9" fontWeight="bold">Response</text>
    <text x="330" y="242" textAnchor="middle" fill="#A7F3D0" fontSize="8">{'<'} 50ms p99</text>

    {/* Arrow from response to cache (write-through) */}
    <path d="M390 225 L450 150" stroke="#6B7280" strokeWidth="1" strokeDasharray="4"/>
    <text x="420" y="180" textAnchor="middle" fill="#6B7280" fontSize="7">Update cache</text>

    {/* Arrow markers */}
    <defs>
      <marker id="arrowBlueMeta" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#60A5FA"/>
      </marker>
      <marker id="arrowGreenMeta" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#10B981"/>
      </marker>
      <marker id="arrowRedMeta" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#EF4444"/>
      </marker>
      <marker id="arrowPurpleMeta" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#A78BFA"/>
      </marker>
    </defs>
  </svg>
)

// SVG Diagram: Sharing and Permissions
const SharingDiagram = () => (
  <svg viewBox="0 0 900 500" style={{ width: '100%', maxWidth: '900px', height: 'auto' }}>
    <defs>
      <linearGradient id="ownerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="editorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="viewerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="publicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
      <linearGradient id="folderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <filter id="shadowShare" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>

    {/* Background */}
    <rect width="900" height="500" fill="#1F2937" rx="12"/>

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#F9FAFB" fontSize="18" fontWeight="bold">{`Sharing & Permissions Model`}</text>

    {/* Shared Folder */}
    <g filter="url(#shadowShare)">
      <rect x="350" y="70" width="200" height="120" rx="8" fill="url(#folderGrad)"/>
      <text x="450" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Project Folder</text>
      <text x="450" y="130" textAnchor="middle" fill="#DDD6FE" fontSize="10">/Team/Project Alpha</text>
      <text x="450" y="160" textAnchor="middle" fill="white" fontSize="24">&#128193;</text>
    </g>

    {/* Owner */}
    <g filter="url(#shadowShare)">
      <rect x="50" y="100" width="130" height="100" rx="6" fill="url(#ownerGrad)"/>
      <text x="115" y="130" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">OWNER</text>
      <text x="115" y="150" textAnchor="middle" fill="#BFDBFE" fontSize="9">Alice</text>
      <text x="115" y="170" textAnchor="middle" fill="#BFDBFE" fontSize="8">Full Control</text>
      <text x="115" y="190" textAnchor="middle" fill="white" fontSize="14">&#128081;</text>
    </g>

    {/* Arrow from owner to folder */}
    <path d="M180 150 L350 130" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowBlueShare)"/>

    {/* Editor */}
    <g filter="url(#shadowShare)">
      <rect x="720" y="80" width="130" height="100" rx="6" fill="url(#editorGrad)"/>
      <text x="785" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">EDITOR</text>
      <text x="785" y="130" textAnchor="middle" fill="#A7F3D0" fontSize="9">Bob</text>
      <text x="785" y="150" textAnchor="middle" fill="#A7F3D0" fontSize="8">Read + Write</text>
      <text x="785" y="170" textAnchor="middle" fill="white" fontSize="14">&#9998;</text>
    </g>

    {/* Arrow from folder to editor */}
    <path d="M550 130 L720 130" stroke="#34D399" strokeWidth="2" markerEnd="url(#arrowGreenShare)"/>

    {/* Viewer */}
    <g filter="url(#shadowShare)">
      <rect x="720" y="200" width="130" height="100" rx="6" fill="url(#viewerGrad)"/>
      <text x="785" y="230" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">VIEWER</text>
      <text x="785" y="250" textAnchor="middle" fill="#FDE68A" fontSize="9">Carol</text>
      <text x="785" y="270" textAnchor="middle" fill="#FDE68A" fontSize="8">Read Only</text>
      <text x="785" y="290" textAnchor="middle" fill="white" fontSize="14">&#128065;</text>
    </g>

    {/* Arrow from folder to viewer */}
    <path d="M550 160 L720 230" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrowYellowShare)"/>

    {/* Public Link */}
    <g filter="url(#shadowShare)">
      <rect x="350" y="230" width="200" height="90" rx="6" fill="url(#publicGrad)"/>
      <text x="450" y="260" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PUBLIC LINK</text>
      <text x="450" y="280" textAnchor="middle" fill="#FBCFE8" fontSize="8">dropbox.com/s/abc123</text>
      <text x="450" y="300" textAnchor="middle" fill="#FBCFE8" fontSize="8">Anyone with link</text>
    </g>

    {/* Arrow from folder to public link */}
    <path d="M450 190 L450 230" stroke="#EC4899" strokeWidth="2" markerEnd="url(#arrowPinkShare)"/>

    {/* Permissions Table */}
    <rect x="50" y="350" width="380" height="130" rx="6" fill="#111827" stroke="#374151"/>
    <text x="240" y="375" textAnchor="middle" fill="#F9FAFB" fontSize="12" fontWeight="bold">Permission Levels</text>
    <line x1="60" y1="385" x2="420" y2="385" stroke="#374151"/>

    {/* Table headers */}
    <text x="100" y="405" fill="#9CA3AF" fontSize="9" fontWeight="bold">Action</text>
    <text x="200" y="405" fill="#3B82F6" fontSize="9" fontWeight="bold">Owner</text>
    <text x="280" y="405" fill="#10B981" fontSize="9" fontWeight="bold">Editor</text>
    <text x="360" y="405" fill="#F59E0B" fontSize="9" fontWeight="bold">Viewer</text>

    {/* Table rows */}
    <text x="100" y="425" fill="#9CA3AF" fontSize="9">View files</text>
    <text x="210" y="425" fill="#10B981" fontSize="9">&#10004;</text>
    <text x="290" y="425" fill="#10B981" fontSize="9">&#10004;</text>
    <text x="370" y="425" fill="#10B981" fontSize="9">&#10004;</text>

    <text x="100" y="445" fill="#9CA3AF" fontSize="9">Edit files</text>
    <text x="210" y="445" fill="#10B981" fontSize="9">&#10004;</text>
    <text x="290" y="445" fill="#10B981" fontSize="9">&#10004;</text>
    <text x="370" y="445" fill="#EF4444" fontSize="9">&#10008;</text>

    <text x="100" y="465" fill="#9CA3AF" fontSize="9">Manage sharing</text>
    <text x="210" y="465" fill="#10B981" fontSize="9">&#10004;</text>
    <text x="290" y="465" fill="#EF4444" fontSize="9">&#10008;</text>
    <text x="370" y="465" fill="#EF4444" fontSize="9">&#10008;</text>

    {/* Link Settings */}
    <rect x="470" y="350" width="380" height="130" rx="6" fill="#111827" stroke="#374151"/>
    <text x="660" y="375" textAnchor="middle" fill="#F9FAFB" fontSize="12" fontWeight="bold">Link Settings</text>
    <line x1="480" y1="385" x2="840" y2="385" stroke="#374151"/>

    <text x="490" y="405" fill="#EC4899" fontSize="9">&#128279; Password Protection</text>
    <text x="490" y="425" fill="#EC4899" fontSize="9">&#128337; Expiration Date</text>
    <text x="490" y="445" fill="#EC4899" fontSize="9">&#128203; Download Disabled</text>
    <text x="490" y="465" fill="#EC4899" fontSize="9">&#128202; View Analytics</text>

    <text x="700" y="405" fill="#6B7280" fontSize="9">Optional security</text>
    <text x="700" y="425" fill="#6B7280" fontSize="9">Auto-disable link</text>
    <text x="700" y="445" fill="#6B7280" fontSize="9">View only in browser</text>
    <text x="700" y="465" fill="#6B7280" fontSize="9">Track who accessed</text>

    {/* Inheritance Arrow */}
    <g filter="url(#shadowShare)">
      <rect x="200" y="230" width="100" height="60" rx="4" fill="#374151" stroke="#6B7280"/>
      <text x="250" y="255" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontWeight="bold">Inheritance</text>
      <text x="250" y="275" textAnchor="middle" fill="#6B7280" fontSize="8">Subfolders inherit</text>
    </g>

    <path d="M250 190 L250 230" stroke="#6B7280" strokeWidth="1" strokeDasharray="4"/>

    {/* Arrow markers */}
    <defs>
      <marker id="arrowBlueShare" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#60A5FA"/>
      </marker>
      <marker id="arrowGreenShare" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#34D399"/>
      </marker>
      <marker id="arrowYellowShare" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#FBBF24"/>
      </marker>
      <marker id="arrowPinkShare" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#EC4899"/>
      </marker>
    </defs>
  </svg>
)

function Dropbox({ onBack, breadcrumb }) {
  const { colors } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: colors.bgPrimary, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.6rem 1.25rem',
            fontSize: '0.95rem',
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
          ← Back to Projects
        </button>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: colors.textPrimary,
          margin: 0
        }}>
          📁 Dropbox File Storage & Sync System Design
        </h1>
        <div style={{ width: '140px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: `1px solid ${colors.border}`,
        paddingBottom: '0.5rem',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'overview', label: 'Overview', icon: '📋' },
          { id: 'architecture', label: 'Architecture', icon: '🏗️' },
          { id: 'sync', label: 'File Sync', icon: '🔄' },
          { id: 'dedup', label: 'Deduplication', icon: '🗜️' },
          { id: 'features', label: 'Features', icon: '✨' },
          { id: 'scalability', label: 'Scalability', icon: '⚡' },
          { id: 'api', label: 'API Endpoints', icon: '🔌' }
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
              transition: 'all 0.2s'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        backgroundColor: colors.bgSecondary,
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minHeight: '500px',
        color: colors.textPrimary
      }}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">System Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                Design a cloud file storage and synchronization service like Dropbox that allows users to store files,
                sync across devices, share with others, and maintain version history. The system must handle file
                deduplication, conflict resolution, and efficient bandwidth usage.
              </p>
            </div>

            {/* Scale Metrics */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">📊 Scale & Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">700M+</div>
                  <div className="text-sm text-gray-600">Registered users</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">600M+</div>
                  <div className="text-sm text-gray-600">Files uploaded daily</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">2 EB+</div>
                  <div className="text-sm text-gray-600">Data stored (Exabytes)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">1B+</div>
                  <div className="text-sm text-gray-600">File uploads/day</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Bandwidth saved via dedup</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">5 devices</div>
                  <div className="text-sm text-gray-600">Average devices per user</div>
                </div>
              </div>
            </div>

            {/* Functional Requirements */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-800">🎯 Functional Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Core Features:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Upload and download files</li>
                    <li>✓ File/folder synchronization across devices</li>
                    <li>✓ Automatic sync on file changes</li>
                    <li>✓ Share files and folders</li>
                    <li>✓ Offline access to files</li>
                    <li>✓ File version history</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Advanced Features:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Conflict resolution</li>
                    <li>✓ File deduplication</li>
                    <li>✓ Delta sync (only changed parts)</li>
                    <li>✓ Public/private sharing links</li>
                    <li>✓ Collaborative editing</li>
                    <li>✓ File recovery (deleted files)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Functional Requirements */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-4 text-purple-800">⚙️ Non-Functional Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Reliability:</strong> 99.99% uptime, no data loss</li>
                    <li><strong>Consistency:</strong> Eventual consistency for sync</li>
                    <li><strong>Latency:</strong> {'<'} 2 sec for file metadata sync</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Bandwidth:</strong> Minimize via chunking + dedup</li>
                    <li><strong>Security:</strong> Encryption at rest and in transit</li>
                    <li><strong>Scalability:</strong> Handle billions of files</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Architecture Tab */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">High-Level Architecture</h2>

            {/* Architecture Diagram */}
            <div className="flex justify-center mb-8">
              <DropboxArchitectureDiagram />
            </div>

            <div className="flex flex-col items-center space-y-4">
              {/* Client Layer */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">📱 Dropbox Clients</div>
                  <div className="text-sm text-blue-100">Desktop (Windows, Mac, Linux) • Mobile (iOS, Android) • Web Browser</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Load Balancer */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">⚖️ Load Balancer (ELB)</div>
                  <div className="text-sm text-purple-100">Distribute requests across API servers • Health checks • SSL termination</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* API Servers */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">🖥️ API Servers (Stateless)</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Upload API',
                      'Download API',
                      'Metadata API',
                      'Sync API',
                      'Sharing API',
                      'Auth API',
                      'Notification API',
                      'Search API'
                    ].map(api => (
                      <div key={api} className="bg-white/20 rounded-lg p-3 backdrop-blur text-center text-sm font-medium">
                        {api}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Message Queue */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">📬 Message Queue (Kafka/SQS)</div>
                  <div className="text-sm text-orange-100">Async processing • Sync notifications • File upload events</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Storage Layer */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 shadow-xl border-2 border-indigo-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">💾 Storage Layer</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">S3 / Block Storage</div>
                      <div className="text-xs text-indigo-100">File chunks (4MB)</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">PostgreSQL</div>
                      <div className="text-xs text-indigo-100">File metadata</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Redis</div>
                      <div className="text-xs text-indigo-100">Cache, sessions</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Cassandra</div>
                      <div className="text-xs text-indigo-100">User activity logs</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Elasticsearch</div>
                      <div className="text-xs text-indigo-100">File search</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">DynamoDB</div>
                      <div className="text-xs text-indigo-100">Chunk hash index</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata Service Diagram */}
            <div className="mt-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border-2 border-amber-200">
              <h3 className="text-2xl font-bold mb-4 text-amber-800">Metadata Service Architecture</h3>
              <div className="flex justify-center">
                <MetadataServiceDiagram />
              </div>
            </div>

            {/* Key Components */}
            <div className="mt-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200">
              <h3 className="text-2xl font-bold mb-4 text-pink-800">Key Components</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📂 Metadata Database</div>
                  <div className="text-sm text-gray-600">Stores file/folder names, paths, permissions, versions, sharing info</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🗂️ Block Storage (S3)</div>
                  <div className="text-sm text-gray-600">Stores actual file chunks (4MB blocks), deduplicated via SHA-256 hash</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔄 Sync Service</div>
                  <div className="text-sm text-gray-600">Monitors file changes, notifies other devices via WebSocket/long polling</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔍 Deduplication Engine</div>
                  <div className="text-sm text-gray-600">Chunk-level dedup using content-defined chunking (CDC)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* File Sync Tab */}
        {activeTab === 'sync' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">File Synchronization</h2>

            {/* File Sync Diagram */}
            <div className="flex justify-center mb-8">
              <FileSyncDiagram />
            </div>

            {/* Upload Flow */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">📤 File Upload Flow</h3>

              <div className="flex flex-col items-center space-y-4">
                {/* Step 1 */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">1️⃣ File Chunking</div>
                    <div className="text-sm text-blue-100">Split file into 4MB chunks using content-defined chunking (CDC)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-blue-400">↓</div>
                </div>

                {/* Step 2 */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">2️⃣ Compute Chunk Hashes</div>
                    <div className="text-sm text-green-100">Calculate SHA-256 hash for each chunk for deduplication</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-green-400">↓</div>
                </div>

                {/* Step 3 */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-xl border-2 border-yellow-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">3️⃣ Check if Chunks Exist</div>
                    <div className="text-sm text-yellow-100">Query hash index (DynamoDB) to see if chunks already stored</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-yellow-400">↓</div>
                </div>

                {/* Step 4 */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">4️⃣ Upload Missing Chunks Only</div>
                    <div className="text-sm text-orange-100">Upload only new chunks to S3, skip existing ones (dedup!)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-orange-400">↓</div>
                </div>

                {/* Step 5 */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">5️⃣ Update Metadata</div>
                    <div className="text-sm text-purple-100">Store file metadata in PostgreSQL (name, path, chunk references)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-purple-400">↓</div>
                </div>

                {/* Step 6 */}
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 shadow-xl border-2 border-pink-400 max-w-3xl w-full">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">6️⃣ Notify Other Devices</div>
                    <div className="text-sm text-pink-100">Push notification via WebSocket to sync file to other devices</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Flow */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">📥 File Download Flow</h3>

              <div className="flex flex-col items-center space-y-4">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 shadow-xl border-2 border-indigo-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">1️⃣ Fetch File Metadata</div>
                    <div className="text-sm text-indigo-100">Get list of chunk hashes from PostgreSQL</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-indigo-400">↓</div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl p-6 shadow-xl border-2 border-cyan-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">2️⃣ Download Chunks</div>
                    <div className="text-sm text-cyan-100">Download chunks from S3 in parallel (up to 10 concurrent)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-cyan-400">↓</div>
                </div>

                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 shadow-xl border-2 border-teal-400 max-w-3xl w-full">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">3️⃣ Reassemble File</div>
                    <div className="text-sm text-teal-100">Combine chunks in correct order, verify integrity</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conflict Resolution */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-2xl font-bold mb-4 text-red-800">Conflict Resolution</h3>

              {/* Conflict Resolution Diagram */}
              <div className="flex justify-center mb-6">
                <ConflictResolutionDiagram />
              </div>

              <div className="space-y-3">
                <p className="text-gray-700">
                  When the same file is modified on multiple devices simultaneously:
                </p>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🕐 Last-Write-Wins (LWW)</div>
                  <div className="text-sm text-gray-600">Most recent timestamp wins, but keep conflicting copy</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📋 Conflicted Copy</div>
                  <div className="text-sm text-gray-600">Create "file (User's conflicted copy 2024-01-15).txt" for losing version</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔢 Version Vectors</div>
                  <div className="text-sm text-gray-600">Track version history per device to detect conflicts</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deduplication Tab */}
        {activeTab === 'dedup' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">🗜️ File Deduplication</h2>

            {/* Why Dedup */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-2xl font-bold mb-4 text-yellow-800">💡 Why Deduplication?</h3>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Dropbox saves <strong>95% bandwidth and storage</strong> through deduplication:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Same file uploaded by multiple users → store once</li>
                  <li>• File modified → only upload changed chunks</li>
                  <li>• Large files (videos, ISOs) commonly shared</li>
                  <li>• Operating system files identical across users</li>
                </ul>
              </div>
            </div>

            {/* Content-Defined Chunking */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">✂️ Content-Defined Chunking (CDC)</h3>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 shadow">
                    <div className="font-bold text-gray-800 mb-2">❌ Fixed-Size Chunking (Not Used)</div>
                    <div className="text-sm text-gray-600 mb-2">
                      Split file every 4MB exactly
                    </div>
                    <div className="text-xs text-red-600">
                      Problem: Insert 1 byte at start → all chunks shift → no dedup!
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow border-2 border-green-400">
                    <div className="font-bold text-gray-800 mb-2">✅ Content-Defined Chunking (Used)</div>
                    <div className="text-sm text-gray-600 mb-2">
                      Split at boundaries based on content (rolling hash)
                    </div>
                    <div className="text-xs text-green-600">
                      Benefit: Insert 1 byte → only affected chunk changes, rest stay same!
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                <h4 className="text-xl font-bold mb-3 text-purple-800">How CDC Works:</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="bg-white rounded-lg p-3 shadow">
                    <strong>1. Rolling Hash:</strong> Compute hash over sliding window (48 bytes)
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow">
                    <strong>2. Boundary Detection:</strong> If hash mod 8192 == 0, mark chunk boundary
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow">
                    <strong>3. Chunk Size Limits:</strong> Min 2MB, Max 8MB, Avg 4MB
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow">
                    <strong>4. SHA-256 Hash:</strong> Compute strong hash of chunk for dedup
                  </div>
                </div>
              </div>
            </div>

            {/* Dedup Example */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-800">📊 Deduplication Example</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">Scenario:</div>
                  <div className="text-sm text-gray-600">
                    • User A uploads "movie.mp4" (1GB) → 250 chunks<br/>
                    • User B uploads same "movie.mp4" → 0 chunks uploaded!<br/>
                    • Storage used: 1GB (not 2GB)<br/>
                    • Bandwidth saved: 1GB
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">Delta Sync:</div>
                  <div className="text-sm text-gray-600">
                    • User edits 1 page in 100-page PDF → Only 1 chunk changes<br/>
                    • Upload only the modified chunk (~40 KB instead of 5 MB)
                  </div>
                </div>
              </div>
            </div>

            {/* Hash Index */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-2xl font-bold mb-4 text-orange-800">🗂️ Chunk Hash Index</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📦 DynamoDB Table</div>
                  <div className="text-sm text-gray-600 font-mono">
                    Key: chunk_hash (SHA-256)<br/>
                    Value: s3_key, size, ref_count
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">⚡ Redis Cache</div>
                  <div className="text-sm text-gray-600">Cache popular chunks (hot files) for fast lookup</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🗑️ Garbage Collection</div>
                  <div className="text-sm text-gray-600">When ref_count reaches 0, mark chunk for deletion after 30 days</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Key Features</h2>

            {/* Sharing Diagram */}
            <div className="flex justify-center mb-8">
              <SharingDiagram />
            </div>

            {/* File Sharing */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">File Sharing</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🌐 Public Links</div>
                  <div className="text-sm text-gray-600">Generate shareable URL, optional password protection, expiration date</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">👥 Shared Folders</div>
                  <div className="text-sm text-gray-600">Invite users to folder, real-time collaboration, permission levels (view/edit)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📧 Share via Email</div>
                  <div className="text-sm text-gray-600">Send file links directly to email addresses</div>
                </div>
              </div>
            </div>

            {/* Version History */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-800">📜 Version History</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">⏮️ Restore Previous Versions</div>
                  <div className="text-sm text-gray-600">Keep last 30 days of versions (or unlimited for paid plans)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📸 Snapshots</div>
                  <div className="text-sm text-gray-600">Store metadata + chunk references for each version</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🗑️ Deleted File Recovery</div>
                  <div className="text-sm text-gray-600">Recover deleted files within 30-day retention period</div>
                </div>
              </div>
            </div>

            {/* Offline Access */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-4 text-purple-800">📴 Offline Access</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">💾 Local Cache</div>
                  <div className="text-sm text-gray-600">Store frequently accessed files locally on device</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">✏️ Offline Edits</div>
                  <div className="text-sm text-gray-600">Make changes offline, sync when connection restored</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔄 Smart Sync</div>
                  <div className="text-sm text-gray-600">Mark files as "online-only" to save disk space</div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-2xl font-bold mb-4 text-orange-800">🔍 File Search</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📝 Full-Text Search</div>
                  <div className="text-sm text-gray-600">Search file names, content (PDFs, docs), metadata using Elasticsearch</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🏷️ Filters</div>
                  <div className="text-sm text-gray-600">Filter by file type, date modified, size, owner</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🤖 ML-Powered</div>
                  <div className="text-sm text-gray-600">Image recognition, OCR for scanned documents, tag suggestions</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scalability Tab */}
        {activeTab === 'scalability' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">⚡ Scalability & Performance</h2>

            {/* Database Scaling */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">🗄️ Metadata Database Scaling</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔀 Sharding by User ID</div>
                  <div className="text-sm text-gray-600">Partition PostgreSQL by user_id for horizontal scaling</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔄 Read Replicas</div>
                  <div className="text-sm text-gray-600">Multiple read replicas per shard for read-heavy workload</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">⚡ Redis Caching</div>
                  <div className="text-sm text-gray-600">Cache file metadata, folder listings, user sessions (TTL: 5 min)</div>
                </div>
              </div>
            </div>

            {/* Storage Scaling */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-800">📦 Block Storage Scaling</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">☁️ S3 Multi-Region</div>
                  <div className="text-sm text-gray-600">Replicate hot chunks across regions for lower latency</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">❄️ Cold Storage</div>
                  <div className="text-sm text-gray-600">Move rarely-accessed chunks to S3 Glacier (90% cost savings)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🎯 Intelligent Tiering</div>
                  <div className="text-sm text-gray-600">Auto-move chunks between hot/warm/cold storage based on access patterns</div>
                </div>
              </div>
            </div>

            {/* Upload/Download Optimization */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-4 text-purple-800">⬆️ Upload/Download Optimization</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔀 Parallel Uploads</div>
                  <div className="text-sm text-gray-600">Upload up to 20 chunks in parallel using HTTP/2 multiplexing</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔄 Resumable Uploads</div>
                  <div className="text-sm text-gray-600">Track uploaded chunks, resume from failure point</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📶 Bandwidth Throttling</div>
                  <div className="text-sm text-gray-600">Rate limit uploads/downloads to prevent network saturation</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🗜️ Compression</div>
                  <div className="text-sm text-gray-600">Compress text files before upload (gzip), skip for already compressed (video, images)</div>
                </div>
              </div>
            </div>

            {/* Notification System */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-2xl font-bold mb-4 text-orange-800">📬 Notification System</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔌 WebSocket Connections</div>
                  <div className="text-sm text-gray-600">Persistent connections for real-time sync notifications</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📊 Long Polling Fallback</div>
                  <div className="text-sm text-gray-600">For clients that can't maintain WebSocket</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📮 Message Queue (Kafka)</div>
                  <div className="text-sm text-gray-600">Publish file change events to topic, notification servers consume</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200">
              <h3 className="text-2xl font-bold mb-4 text-pink-800">📊 Performance Targets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">{'<'} 2 sec</div>
                  <div className="text-sm text-gray-600">File metadata sync latency</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Bandwidth saved via dedup</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">99.99%</div>
                  <div className="text-sm text-gray-600">Durability (no data loss)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">50 MB/s</div>
                  <div className="text-sm text-gray-600">Average upload speed</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">100 MB/s</div>
                  <div className="text-sm text-gray-600">Average download speed</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">{'<'} 100ms</div>
                  <div className="text-sm text-gray-600">Metadata API response time (p95)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Endpoints Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* API Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">🔌 Dropbox API Overview</h2>
              <p className="text-gray-700 mb-4">
                RESTful API with OAuth 2.0 authentication. Supports file operations, sharing, and team management.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-blue-600 mb-2">Base URL</div>
                  <code className="text-sm text-gray-700">https://api.dropboxapi.com/2</code>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-blue-600 mb-2">Authentication</div>
                  <code className="text-sm text-gray-700">OAuth 2.0 Bearer Token</code>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-blue-600 mb-2">Content Host</div>
                  <code className="text-sm text-gray-700">https://content.dropboxapi.com/2</code>
                </div>
              </div>
            </div>

            {/* File Operations APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">📁 File Operations APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/upload</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Upload a file (up to 150MB)</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Headers:</div>
                    <pre className="text-xs text-gray-700">
{`Dropbox-API-Arg: {
  "path": "/Homework/math.txt",
  "mode": "add",
  "autorename": true
}
Content-Type: application/octet-stream`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/upload_session/start</code>
                  </div>
                  <p className="text-sm text-gray-600">Upload large files in chunks (session-based)</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/download</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Download a file</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Response Headers:</div>
                    <pre className="text-xs text-gray-700">
{`Dropbox-API-Result: {
  "name": "math.txt",
  "size": 1024,
  "path_display": "/Homework/math.txt"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-700">/files/get_metadata</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Get file/folder metadata</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  ".tag": "file",
  "name": "math.txt",
  "id": "id:a4ayc_80_OEAAAAAAAAAXw",
  "path_display": "/Homework/math.txt",
  "size": 1024,
  "server_modified": "2024-01-20T10:00:00Z",
  "rev": "015f9a50d3f8fc0000000001c"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/delete_v2</code>
                  </div>
                  <p className="text-sm text-gray-600">Delete a file or folder</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/move_v2</code>
                  </div>
                  <p className="text-sm text-gray-600">Move a file or folder</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/copy_v2</code>
                  </div>
                  <p className="text-sm text-gray-600">Copy a file or folder</p>
                </div>
              </div>
            </div>

            {/* Folder Operations APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">📂 Folder Operations APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/create_folder_v2</code>
                  </div>
                  <p className="text-sm text-gray-600">Create a new folder</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/list_folder</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">List folder contents</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "entries": [
    {
      ".tag": "file",
      "name": "math.txt",
      "path_display": "/Homework/math.txt"
    },
    {
      ".tag": "folder",
      "name": "Photos",
      "path_display": "/Photos"
    }
  ],
  "has_more": false
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/list_folder/continue</code>
                  </div>
                  <p className="text-sm text-gray-600">Paginate through folder contents</p>
                </div>
              </div>
            </div>

            {/* Sharing APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">🔗 Sharing APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/sharing/create_shared_link_with_settings</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Create a shared link</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "path": "/Photos/vacation.jpg",
  "settings": {
    "requested_visibility": "public",
    "audience": "public",
    "access": "viewer"
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/sharing/share_folder</code>
                  </div>
                  <p className="text-sm text-gray-600">Share a folder with specific users</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-700">/sharing/list_shared_links</code>
                  </div>
                  <p className="text-sm text-gray-600">List shared links</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/sharing/revoke_shared_link</code>
                  </div>
                  <p className="text-sm text-gray-600">Revoke a shared link</p>
                </div>
              </div>
            </div>

            {/* Search & Version History */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">🔍 Search & Version APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/search_v2</code>
                  </div>
                  <p className="text-sm text-gray-600">Search for files and folders</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/list_revisions</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Get file version history</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "entries": [
    {
      "name": "math.txt",
      "rev": "015f9a50d3f8fc0000000001c",
      "size": 1024,
      "server_modified": "2024-01-20T10:00:00Z"
    }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/restore</code>
                  </div>
                  <p className="text-sm text-gray-600">Restore a previous file version</p>
                </div>
              </div>
            </div>

            {/* Response Codes */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">📊 HTTP Status Codes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <div className="text-green-400 font-bold">200 OK</div>
                  <div className="text-gray-300 text-sm">Request successful</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">400 Bad Request</div>
                  <div className="text-gray-300 text-sm">Invalid request parameters</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">401 Unauthorized</div>
                  <div className="text-gray-300 text-sm">Invalid or expired token</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">409 Conflict</div>
                  <div className="text-gray-300 text-sm">File/folder already exists</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">429 Too Many Requests</div>
                  <div className="text-gray-300 text-sm">Rate limit exceeded</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">507 Insufficient Storage</div>
                  <div className="text-gray-300 text-sm">User out of space</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropbox

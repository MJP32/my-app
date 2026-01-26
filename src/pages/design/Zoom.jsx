/**
 * Zoom Video Conferencing System Design
 *
 * Tab template format with concept cards and detail modals
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

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

const ZoomArchitectureDiagram = () => (
  <svg viewBox="0 0 900 500" className="w-full h-auto" style={{ maxHeight: '500px' }}>
    <defs>
      <linearGradient id="clientGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="routerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <linearGradient id="serverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60A5FA" />
      </marker>
      <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    <rect width="900" height="500" fill="#1F2937" rx="10" />
    <text x="450" y="35" textAnchor="middle" fill="#F9FAFB" fontSize="20" fontWeight="bold">Zoom High-Level Architecture</text>

    {/* Client Layer */}
    <g filter="url(#dropShadow)">
      <rect x="50" y="70" width="120" height="80" rx="10" fill="url(#clientGradient)" />
      <text x="110" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Desktop</text>
      <text x="110" y="125" textAnchor="middle" fill="#BFDBFE" fontSize="10">Win/Mac/Linux</text>
    </g>

    <g filter="url(#dropShadow)">
      <rect x="200" y="70" width="120" height="80" rx="10" fill="url(#clientGradient)" />
      <text x="260" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Mobile</text>
      <text x="260" y="125" textAnchor="middle" fill="#BFDBFE" fontSize="10">iOS/Android</text>
    </g>

    <g filter="url(#dropShadow)">
      <rect x="350" y="70" width="120" height="80" rx="10" fill="url(#clientGradient)" />
      <text x="410" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Web Client</text>
      <text x="410" y="125" textAnchor="middle" fill="#BFDBFE" fontSize="10">WebRTC</text>
    </g>

    <text x="260" y="60" textAnchor="middle" fill="#9CA3AF" fontSize="14" fontWeight="bold">ZOOM CLIENTS</text>

    {/* Arrows from clients to routers */}
    <line x1="110" y1="150" x2="250" y2="200" stroke="url(#arrowGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <line x1="260" y1="150" x2="350" y2="200" stroke="url(#arrowGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <line x1="410" y1="150" x2="450" y2="200" stroke="url(#arrowGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />

    {/* Multimedia Routers (Edge Network) */}
    <g filter="url(#dropShadow)">
      <rect x="200" y="200" width="180" height="90" rx="10" fill="url(#routerGradient)" />
      <text x="290" y="235" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Multimedia Router</text>
      <text x="290" y="255" textAnchor="middle" fill="#DDD6FE" fontSize="11">Edge Location 1</text>
      <text x="290" y="275" textAnchor="middle" fill="#C4B5FD" fontSize="10">STUN/TURN/SFU</text>
    </g>

    <g filter="url(#dropShadow)">
      <rect x="420" y="200" width="180" height="90" rx="10" fill="url(#routerGradient)" />
      <text x="510" y="235" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Multimedia Router</text>
      <text x="510" y="255" textAnchor="middle" fill="#DDD6FE" fontSize="11">Edge Location 2</text>
      <text x="510" y="275" textAnchor="middle" fill="#C4B5FD" fontSize="10">STUN/TURN/SFU</text>
    </g>

    <g filter="url(#dropShadow)">
      <rect x="640" y="200" width="180" height="90" rx="10" fill="url(#routerGradient)" />
      <text x="730" y="235" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Multimedia Router</text>
      <text x="730" y="255" textAnchor="middle" fill="#DDD6FE" fontSize="11">Edge Location 3</text>
      <text x="730" y="275" textAnchor="middle" fill="#C4B5FD" fontSize="10">STUN/TURN/SFU</text>
    </g>

    <text x="510" y="190" textAnchor="middle" fill="#9CA3AF" fontSize="14" fontWeight="bold">GLOBAL EDGE NETWORK (50+ Data Centers)</text>

    {/* Arrows from routers to meeting servers */}
    <line x1="290" y1="290" x2="350" y2="340" stroke="url(#arrowGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <line x1="510" y1="290" x2="450" y2="340" stroke="url(#arrowGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <line x1="730" y1="290" x2="550" y2="340" stroke="url(#arrowGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />

    {/* Meeting Servers */}
    <g filter="url(#dropShadow)">
      <rect x="300" y="340" width="300" height="100" rx="10" fill="url(#serverGradient)" />
      <text x="450" y="375" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Meeting Servers</text>
      <text x="450" y="400" textAnchor="middle" fill="#A7F3D0" fontSize="12">Media Processing | Recording | Transcription</text>
      <text x="450" y="420" textAnchor="middle" fill="#6EE7B7" fontSize="11">Signaling | Presence | Chat</text>
    </g>

    <text x="450" y="330" textAnchor="middle" fill="#9CA3AF" fontSize="14" fontWeight="bold">MEETING INFRASTRUCTURE</text>

    {/* Backend Services Box */}
    <g filter="url(#dropShadow)">
      <rect x="650" y="340" width="200" height="100" rx="10" fill="#374151" stroke="#4B5563" strokeWidth="2" />
      <text x="750" y="375" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Backend Services</text>
      <text x="750" y="400" textAnchor="middle" fill="#9CA3AF" fontSize="11">Auth | Users | Billing</text>
      <text x="750" y="420" textAnchor="middle" fill="#9CA3AF" fontSize="11">Analytics | Webhooks</text>
    </g>

    {/* Connection line between meeting servers and backend */}
    <line x1="600" y1="390" x2="650" y2="390" stroke="#4B5563" strokeWidth="2" strokeDasharray="5,5" />

    {/* Legend */}
    <rect x="50" y="420" width="150" height="70" rx="5" fill="#374151" stroke="#4B5563" />
    <text x="60" y="440" fill="#9CA3AF" fontSize="10">Legend:</text>
    <line x1="60" y1="455" x2="90" y2="455" stroke="url(#arrowGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <text x="100" y="458" fill="#9CA3AF" fontSize="10">Media Flow</text>
    <line x1="60" y1="475" x2="90" y2="475" stroke="#4B5563" strokeWidth="2" strokeDasharray="5,5" />
    <text x="100" y="478" fill="#9CA3AF" fontSize="10">Control Plane</text>
  </svg>
)

const MediaFlowDiagram = () => (
  <svg viewBox="0 0 900 450" className="w-full h-auto" style={{ maxHeight: '450px' }}>
    <defs>
      <linearGradient id="participantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="sfuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="videoStream" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#16A34A" />
      </linearGradient>
      <linearGradient id="audioStream" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <marker id="videoArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#22C55E" />
      </marker>
      <marker id="audioArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#8B5CF6" />
      </marker>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <rect width="900" height="450" fill="#1F2937" rx="10" />
    <text x="450" y="30" textAnchor="middle" fill="#F9FAFB" fontSize="18" fontWeight="bold">SFU (Selective Forwarding Unit) Media Flow</text>

    {/* Participants on the left */}
    <g>
      <rect x="50" y="80" width="100" height="70" rx="8" fill="url(#participantGrad)" filter="url(#glow)" />
      <text x="100" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Participant A</text>
      <text x="100" y="130" textAnchor="middle" fill="#BFDBFE" fontSize="9">1080p + Audio</text>
    </g>

    <g>
      <rect x="50" y="180" width="100" height="70" rx="8" fill="url(#participantGrad)" filter="url(#glow)" />
      <text x="100" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Participant B</text>
      <text x="100" y="230" textAnchor="middle" fill="#BFDBFE" fontSize="9">720p + Audio</text>
    </g>

    <g>
      <rect x="50" y="280" width="100" height="70" rx="8" fill="url(#participantGrad)" filter="url(#glow)" />
      <text x="100" y="310" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Participant C</text>
      <text x="100" y="330" textAnchor="middle" fill="#BFDBFE" fontSize="9">480p + Audio</text>
    </g>

    {/* Arrows to SFU - Video streams */}
    <line x1="150" y1="105" x2="350" y2="170" stroke="url(#videoStream)" strokeWidth="3" markerEnd="url(#videoArrow)" />
    <line x1="150" y1="215" x2="350" y2="200" stroke="url(#videoStream)" strokeWidth="3" markerEnd="url(#videoArrow)" />
    <line x1="150" y1="315" x2="350" y2="230" stroke="url(#videoStream)" strokeWidth="3" markerEnd="url(#videoArrow)" />

    {/* Audio streams */}
    <line x1="150" y1="125" x2="350" y2="185" stroke="url(#audioStream)" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#audioArrow)" />
    <line x1="150" y1="230" x2="350" y2="210" stroke="url(#audioStream)" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#audioArrow)" />
    <line x1="150" y1="330" x2="350" y2="235" stroke="url(#audioStream)" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#audioArrow)" />

    {/* SFU Server */}
    <g filter="url(#glow)">
      <rect x="350" y="120" width="200" height="160" rx="12" fill="url(#sfuGrad)" />
      <text x="450" y="160" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">SFU Server</text>
      <text x="450" y="185" textAnchor="middle" fill="#FEF3C7" fontSize="11">Selective Forwarding</text>
      <line x1="370" y1="200" x2="530" y2="200" stroke="white" strokeOpacity="0.3" />
      <text x="450" y="220" textAnchor="middle" fill="#FDE68A" fontSize="10">No Transcoding</text>
      <text x="450" y="240" textAnchor="middle" fill="#FDE68A" fontSize="10">Simulcast Support</text>
      <text x="450" y="260" textAnchor="middle" fill="#FDE68A" fontSize="10">Bandwidth Adaptation</text>
    </g>

    {/* Participants on the right */}
    <g>
      <rect x="750" y="80" width="100" height="70" rx="8" fill="url(#participantGrad)" filter="url(#glow)" />
      <text x="800" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Participant A</text>
      <text x="800" y="130" textAnchor="middle" fill="#BFDBFE" fontSize="9">Receives B+C</text>
    </g>

    <g>
      <rect x="750" y="180" width="100" height="70" rx="8" fill="url(#participantGrad)" filter="url(#glow)" />
      <text x="800" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Participant B</text>
      <text x="800" y="230" textAnchor="middle" fill="#BFDBFE" fontSize="9">Receives A+C</text>
    </g>

    <g>
      <rect x="750" y="280" width="100" height="70" rx="8" fill="url(#participantGrad)" filter="url(#glow)" />
      <text x="800" y="310" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Participant C</text>
      <text x="800" y="330" textAnchor="middle" fill="#BFDBFE" fontSize="9">Receives A+B</text>
    </g>

    {/* Arrows from SFU */}
    <line x1="550" y1="170" x2="750" y2="105" stroke="url(#videoStream)" strokeWidth="3" markerEnd="url(#videoArrow)" />
    <line x1="550" y1="200" x2="750" y2="215" stroke="url(#videoStream)" strokeWidth="3" markerEnd="url(#videoArrow)" />
    <line x1="550" y1="230" x2="750" y2="315" stroke="url(#videoStream)" strokeWidth="3" markerEnd="url(#videoArrow)" />

    {/* Simulcast info box */}
    <rect x="350" y="310" width="200" height="80" rx="8" fill="#374151" stroke="#4B5563" strokeWidth="2" />
    <text x="450" y="335" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="bold">Simulcast Layers</text>
    <text x="450" y="355" textAnchor="middle" fill="#9CA3AF" fontSize="10">High: 1080p @ 2.5 Mbps</text>
    <text x="450" y="370" textAnchor="middle" fill="#9CA3AF" fontSize="10">Medium: 720p @ 1 Mbps</text>
    <text x="450" y="385" textAnchor="middle" fill="#9CA3AF" fontSize="10">Low: 360p @ 300 Kbps</text>

    {/* Legend */}
    <rect x="620" y="310" width="160" height="80" rx="8" fill="#374151" stroke="#4B5563" strokeWidth="2" />
    <text x="700" y="330" textAnchor="middle" fill="#9CA3AF" fontSize="11" fontWeight="bold">Stream Types</text>
    <line x1="640" y1="350" x2="680" y2="350" stroke="url(#videoStream)" strokeWidth="3" />
    <text x="690" y="353" fill="#22C55E" fontSize="10">Video</text>
    <line x1="640" y1="370" x2="680" y2="370" stroke="url(#audioStream)" strokeWidth="2" strokeDasharray="4,2" />
    <text x="690" y="373" fill="#8B5CF6" fontSize="10">Audio</text>

    {/* Key insight */}
    <text x="450" y="430" textAnchor="middle" fill="#60A5FA" fontSize="12" fontStyle="italic">Each participant sends 1 stream, receives N-1 streams (no mixing overhead)</text>
  </svg>
)

const WebRTCDiagram = () => (
  <svg viewBox="0 0 900 500" className="w-full h-auto" style={{ maxHeight: '500px' }}>
    <defs>
      <linearGradient id="peerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="signalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="stunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="turnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="mediaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#16A34A" />
      </linearGradient>
      <marker id="sigArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#8B5CF6" />
      </marker>
      <marker id="mediaArrowG" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#22C55E" />
      </marker>
      <marker id="stunArrowM" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#10B981" />
      </marker>
    </defs>

    <rect width="900" height="500" fill="#1F2937" rx="10" />
    <text x="450" y="30" textAnchor="middle" fill="#F9FAFB" fontSize="18" fontWeight="bold">WebRTC Signaling & Media Transport</text>

    {/* Peer A */}
    <g>
      <rect x="50" y="150" width="150" height="180" rx="12" fill="url(#peerGrad)" />
      <text x="125" y="185" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Peer A</text>
      <text x="125" y="205" textAnchor="middle" fill="#BFDBFE" fontSize="11">(Caller)</text>
      <line x1="65" y1="220" x2="185" y2="220" stroke="white" strokeOpacity="0.3" />
      <text x="125" y="245" textAnchor="middle" fill="#93C5FD" fontSize="10">getUserMedia()</text>
      <text x="125" y="265" textAnchor="middle" fill="#93C5FD" fontSize="10">RTCPeerConnection</text>
      <text x="125" y="285" textAnchor="middle" fill="#93C5FD" fontSize="10">ICE Candidates</text>
      <text x="125" y="305" textAnchor="middle" fill="#93C5FD" fontSize="10">SDP Offer</text>
    </g>

    {/* Peer B */}
    <g>
      <rect x="700" y="150" width="150" height="180" rx="12" fill="url(#peerGrad)" />
      <text x="775" y="185" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Peer B</text>
      <text x="775" y="205" textAnchor="middle" fill="#BFDBFE" fontSize="11">(Callee)</text>
      <line x1="715" y1="220" x2="835" y2="220" stroke="white" strokeOpacity="0.3" />
      <text x="775" y="245" textAnchor="middle" fill="#93C5FD" fontSize="10">getUserMedia()</text>
      <text x="775" y="265" textAnchor="middle" fill="#93C5FD" fontSize="10">RTCPeerConnection</text>
      <text x="775" y="285" textAnchor="middle" fill="#93C5FD" fontSize="10">ICE Candidates</text>
      <text x="775" y="305" textAnchor="middle" fill="#93C5FD" fontSize="10">SDP Answer</text>
    </g>

    {/* Signaling Server */}
    <g>
      <rect x="375" y="60" width="150" height="100" rx="10" fill="url(#signalGrad)" />
      <text x="450" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Signaling Server</text>
      <text x="450" y="115" textAnchor="middle" fill="#DDD6FE" fontSize="10">(WebSocket)</text>
      <text x="450" y="140" textAnchor="middle" fill="#C4B5FD" fontSize="9">SDP + ICE Exchange</text>
    </g>

    {/* Signaling arrows */}
    <path d="M 200 180 Q 300 100 375 100" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#sigArrow)" />
    <text x="270" y="120" fill="#A78BFA" fontSize="9">1. SDP Offer</text>

    <path d="M 525 100 Q 600 100 700 180" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#sigArrow)" />
    <text x="620" y="120" fill="#A78BFA" fontSize="9">2. Offer</text>

    <path d="M 700 200 Q 600 130 525 120" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#sigArrow)" />
    <text x="620" y="160" fill="#A78BFA" fontSize="9">3. SDP Answer</text>

    <path d="M 375 120 Q 300 130 200 200" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#sigArrow)" />
    <text x="270" y="165" fill="#A78BFA" fontSize="9">4. Answer</text>

    {/* ICE Candidates arrows */}
    <path d="M 200 260 Q 300 200 375 140" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#sigArrow)" />
    <path d="M 525 140 Q 600 200 700 260" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#sigArrow)" />
    <text x="450" y="195" textAnchor="middle" fill="#A78BFA" fontSize="8">5. ICE Candidates (trickle)</text>

    {/* STUN Server */}
    <g>
      <rect x="250" y="360" width="120" height="80" rx="10" fill="url(#stunGrad)" />
      <text x="310" y="390" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">STUN Server</text>
      <text x="310" y="410" textAnchor="middle" fill="#A7F3D0" fontSize="9">NAT Discovery</text>
      <text x="310" y="425" textAnchor="middle" fill="#6EE7B7" fontSize="8">Public IP:Port</text>
    </g>

    {/* TURN Server */}
    <g>
      <rect x="530" y="360" width="120" height="80" rx="10" fill="url(#turnGrad)" />
      <text x="590" y="390" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">TURN Server</text>
      <text x="590" y="410" textAnchor="middle" fill="#FEF3C7" fontSize="9">Relay Fallback</text>
      <text x="590" y="425" textAnchor="middle" fill="#FDE68A" fontSize="8">If P2P Fails</text>
    </g>

    {/* Arrows to STUN/TURN */}
    <line x1="125" y1="330" x2="250" y2="380" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#stunArrowM)" />
    <line x1="775" y1="330" x2="650" y2="380" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#stunArrowM)" />
    <text x="450" y="355" textAnchor="middle" fill="#9CA3AF" fontSize="9">6. NAT Traversal</text>

    {/* Direct P2P Media Flow */}
    <g>
      <rect x="350" y="240" width="200" height="50" rx="8" fill="url(#mediaGrad)" />
      <text x="450" y="260" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Direct P2P Media (UDP)</text>
      <text x="450" y="278" textAnchor="middle" fill="#BBF7D0" fontSize="9">RTP/SRTP Streams</text>
    </g>

    {/* Media flow arrows */}
    <line x1="200" y1="265" x2="350" y2="265" stroke="#22C55E" strokeWidth="3" markerEnd="url(#mediaArrowG)" />
    <line x1="550" y1="265" x2="700" y2="265" stroke="#22C55E" strokeWidth="3" markerEnd="url(#mediaArrowG)" />
    <text x="450" y="310" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">7. Media Exchange (after ICE success)</text>

    {/* Protocol boxes at bottom */}
    <text x="450" y="455" textAnchor="middle" fill="#9CA3AF" fontSize="12" fontWeight="bold">Transport Protocols</text>

    <rect x="100" y="465" width="140" height="30" rx="5" fill="#374151" stroke="#8B5CF6" strokeWidth="1" />
    <text x="170" y="485" textAnchor="middle" fill="#A78BFA" fontSize="10">Signaling: WebSocket</text>

    <rect x="280" y="465" width="140" height="30" rx="5" fill="#374151" stroke="#10B981" strokeWidth="1" />
    <text x="350" y="485" textAnchor="middle" fill="#6EE7B7" fontSize="10">STUN/TURN: UDP</text>

    <rect x="460" y="465" width="140" height="30" rx="5" fill="#374151" stroke="#22C55E" strokeWidth="1" />
    <text x="530" y="485" textAnchor="middle" fill="#86EFAC" fontSize="10">Media: RTP/SRTP</text>

    <rect x="640" y="465" width="160" height="30" rx="5" fill="#374151" stroke="#3B82F6" strokeWidth="1" />
    <text x="720" y="485" textAnchor="middle" fill="#93C5FD" fontSize="10">Encryption: DTLS-SRTP</text>
  </svg>
)

const RecordingDiagram = () => (
  <svg viewBox="0 0 900 350" className="w-full h-auto" style={{ maxHeight: '350px' }}>
    <defs>
      <linearGradient id="meetingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="recorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
      <linearGradient id="processGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="storageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <marker id="recArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#EF4444" />
      </marker>
      <marker id="procArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#F59E0B" />
      </marker>
      <marker id="storeArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#8B5CF6" />
      </marker>
    </defs>

    <rect width="900" height="350" fill="#1F2937" rx="10" />
    <text x="450" y="30" textAnchor="middle" fill="#F9FAFB" fontSize="18" fontWeight="bold">Cloud Recording Pipeline</text>

    {/* Meeting source */}
    <g>
      <rect x="50" y="70" width="150" height="120" rx="10" fill="url(#meetingGrad)" />
      <text x="125" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Live Meeting</text>
      <line x1="65" y1="115" x2="185" y2="115" stroke="white" strokeOpacity="0.3" />
      <text x="125" y="140" textAnchor="middle" fill="#BFDBFE" fontSize="10">Video Streams</text>
      <text x="125" y="158" textAnchor="middle" fill="#BFDBFE" fontSize="10">Audio Streams</text>
      <text x="125" y="176" textAnchor="middle" fill="#BFDBFE" fontSize="10">Screen Share</text>
    </g>

    {/* Recording indicator */}
    <circle cx="175" cy="82" r="8" fill="#EF4444">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <text x="192" y="87" fill="#EF4444" fontSize="10" fontWeight="bold">REC</text>

    {/* Arrow to recorder */}
    <line x1="200" y1="130" x2="270" y2="130" stroke="#EF4444" strokeWidth="3" markerEnd="url(#recArrow)" />

    {/* Recording Service */}
    <g>
      <rect x="270" y="60" width="160" height="140" rx="10" fill="url(#recorderGrad)" />
      <text x="350" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Recording</text>
      <text x="350" y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Service</text>
      <line x1="285" y1="125" x2="415" y2="125" stroke="white" strokeOpacity="0.3" />
      <text x="350" y="145" textAnchor="middle" fill="#FEE2E2" fontSize="10">Capture All Streams</text>
      <text x="350" y="163" textAnchor="middle" fill="#FECACA" fontSize="9">Layout Composition</text>
      <text x="350" y="181" textAnchor="middle" fill="#FECACA" fontSize="9">Real-time Encoding</text>
    </g>

    {/* Arrow to processing */}
    <line x1="430" y1="130" x2="500" y2="130" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#procArrow)" />

    {/* Processing Service */}
    <g>
      <rect x="500" y="50" width="160" height="160" rx="10" fill="url(#processGrad)" />
      <text x="580" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Processing</text>
      <text x="580" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Pipeline</text>
      <line x1="515" y1="115" x2="645" y2="115" stroke="white" strokeOpacity="0.3" />
      <text x="580" y="135" textAnchor="middle" fill="#FEF3C7" fontSize="10">Transcoding</text>
      <text x="580" y="153" textAnchor="middle" fill="#FDE68A" fontSize="9">Transcription (ASR)</text>
      <text x="580" y="171" textAnchor="middle" fill="#FDE68A" fontSize="9">Thumbnail Gen</text>
      <text x="580" y="189" textAnchor="middle" fill="#FDE68A" fontSize="9">Encryption</text>
    </g>

    {/* Arrow to storage */}
    <line x1="660" y1="130" x2="730" y2="130" stroke="#8B5CF6" strokeWidth="3" markerEnd="url(#storeArrow)" />

    {/* Cloud Storage */}
    <g>
      <rect x="730" y="60" width="140" height="140" rx="10" fill="url(#storageGrad)" />
      <text x="800" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Cloud</text>
      <text x="800" y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Storage</text>
      <line x1="745" y1="125" x2="855" y2="125" stroke="white" strokeOpacity="0.3" />
      <text x="800" y="145" textAnchor="middle" fill="#EDE9FE" fontSize="10">S3 / Azure Blob</text>
      <text x="800" y="163" textAnchor="middle" fill="#DDD6FE" fontSize="9">Multi-Region</text>
      <text x="800" y="181" textAnchor="middle" fill="#DDD6FE" fontSize="9">99.999% Durability</text>
    </g>

    {/* Output formats */}
    <text x="450" y="250" textAnchor="middle" fill="#9CA3AF" fontSize="14" fontWeight="bold">Output Formats</text>

    <rect x="150" y="270" width="100" height="60" rx="8" fill="#374151" stroke="#8B5CF6" strokeWidth="2" />
    <text x="200" y="295" textAnchor="middle" fill="#8B5CF6" fontSize="11" fontWeight="bold">MP4</text>
    <text x="200" y="315" textAnchor="middle" fill="#9CA3AF" fontSize="9">Video + Audio</text>

    <rect x="300" y="270" width="100" height="60" rx="8" fill="#374151" stroke="#06B6D4" strokeWidth="2" />
    <text x="350" y="295" textAnchor="middle" fill="#06B6D4" fontSize="11" fontWeight="bold">M4A</text>
    <text x="350" y="315" textAnchor="middle" fill="#9CA3AF" fontSize="9">Audio Only</text>

    <rect x="450" y="270" width="100" height="60" rx="8" fill="#374151" stroke="#EC4899" strokeWidth="2" />
    <text x="500" y="295" textAnchor="middle" fill="#EC4899" fontSize="11" fontWeight="bold">VTT/SRT</text>
    <text x="500" y="315" textAnchor="middle" fill="#9CA3AF" fontSize="9">Transcription</text>

    <rect x="600" y="270" width="100" height="60" rx="8" fill="#374151" stroke="#22C55E" strokeWidth="2" />
    <text x="650" y="295" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">JSON</text>
    <text x="650" y="315" textAnchor="middle" fill="#9CA3AF" fontSize="9">Metadata</text>
  </svg>
)

const ScalingDiagram = () => (
  <svg viewBox="0 0 800 280" className="w-full h-auto" style={{ maxHeight: '280px' }}>
    <defs>
      <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>

    <rect width="800" height="280" fill="#1F2937" rx="10" />
    <text x="400" y="25" textAnchor="middle" fill="#F9FAFB" fontSize="16" fontWeight="bold">Global Edge Network</text>

    {/* World representation */}
    <ellipse cx="400" cy="150" rx="300" ry="100" fill="none" stroke="#374151" strokeWidth="2" strokeDasharray="5,5" />

    {/* Edge nodes */}
    <g>
      <circle cx="150" cy="100" r="30" fill="url(#edgeGrad)" />
      <text x="150" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">US West</text>
    </g>
    <g>
      <circle cx="280" cy="80" r="30" fill="url(#edgeGrad)" />
      <text x="280" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">US East</text>
    </g>
    <g>
      <circle cx="450" cy="70" r="30" fill="url(#edgeGrad)" />
      <text x="450" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">EU</text>
    </g>
    <g>
      <circle cx="580" cy="100" r="30" fill="url(#edgeGrad)" />
      <text x="580" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Asia</text>
    </g>
    <g>
      <circle cx="680" cy="150" r="30" fill="url(#edgeGrad)" />
      <text x="680" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">APAC</text>
    </g>
    <g>
      <circle cx="300" cy="200" r="30" fill="url(#edgeGrad)" />
      <text x="300" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">LATAM</text>
    </g>

    {/* Connection lines */}
    <line x1="180" y1="100" x2="250" y2="85" stroke="#4ade80" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="310" y1="80" x2="420" y2="70" stroke="#4ade80" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="480" y1="75" x2="550" y2="100" stroke="#4ade80" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="610" y1="110" x2="650" y2="135" stroke="#4ade80" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="280" y1="110" x2="290" y2="170" stroke="#4ade80" strokeWidth="1" strokeOpacity="0.5" />

    {/* Info boxes */}
    <rect x="100" y="240" width="150" height="30" rx="5" fill="#374151" stroke="#10B981" strokeWidth="1" />
    <text x="175" y="260" textAnchor="middle" fill="#4ade80" fontSize="10">50+ Data Centers</text>

    <rect x="325" y="240" width="150" height="30" rx="5" fill="#374151" stroke="#10B981" strokeWidth="1" />
    <text x="400" y="260" textAnchor="middle" fill="#4ade80" fontSize="10">{'<'} 50ms Edge Latency</text>

    <rect x="550" y="240" width="150" height="30" rx="5" fill="#374151" stroke="#10B981" strokeWidth="1" />
    <text x="625" y="260" textAnchor="middle" fill="#4ade80" fontSize="10">Auto-Failover</text>
  </svg>
)

const SecurityDiagram = () => (
  <svg viewBox="0 0 800 200" className="w-full h-auto" style={{ maxHeight: '200px' }}>
    <defs>
      <linearGradient id="secureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
    </defs>

    <rect width="800" height="200" fill="#1F2937" rx="10" />
    <text x="400" y="25" textAnchor="middle" fill="#F9FAFB" fontSize="16" fontWeight="bold">End-to-End Encryption (E2EE)</text>

    {/* Sender */}
    <rect x="50" y="60" width="120" height="80" rx="8" fill="#3B82F6" />
    <text x="110" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Sender</text>
    <text x="110" y="115" textAnchor="middle" fill="#BFDBFE" fontSize="10">Encrypts with</text>
    <text x="110" y="130" textAnchor="middle" fill="#BFDBFE" fontSize="10">meeting key</text>

    {/* Arrow 1 */}
    <line x1="170" y1="100" x2="260" y2="100" stroke="#EF4444" strokeWidth="2" />
    <polygon points="260,95 270,100 260,105" fill="#EF4444" />
    <text x="215" y="85" textAnchor="middle" fill="#FCA5A5" fontSize="9">Encrypted</text>

    {/* Server */}
    <rect x="270" y="50" width="180" height="100" rx="8" fill="#374151" stroke="#EF4444" strokeWidth="2" />
    <text x="360" y="80" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">Zoom Servers</text>
    <text x="360" y="105" textAnchor="middle" fill="#9CA3AF" fontSize="10">Cannot decrypt</text>
    <text x="360" y="120" textAnchor="middle" fill="#9CA3AF" fontSize="10">No access to keys</text>
    <text x="360" y="135" textAnchor="middle" fill="#9CA3AF" fontSize="10">Forward only</text>

    {/* Arrow 2 */}
    <line x1="450" y1="100" x2="540" y2="100" stroke="#EF4444" strokeWidth="2" />
    <polygon points="540,95 550,100 540,105" fill="#EF4444" />
    <text x="495" y="85" textAnchor="middle" fill="#FCA5A5" fontSize="9">Encrypted</text>

    {/* Receiver */}
    <rect x="550" y="60" width="120" height="80" rx="8" fill="#22C55E" />
    <text x="610" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Receiver</text>
    <text x="610" y="115" textAnchor="middle" fill="#BBF7D0" fontSize="10">Decrypts with</text>
    <text x="610" y="130" textAnchor="middle" fill="#BBF7D0" fontSize="10">meeting key</text>

    {/* Key distribution */}
    <rect x="280" y="160" width="160" height="30" rx="5" fill="#374151" stroke="#F59E0B" strokeWidth="1" />
    <text x="360" y="180" textAnchor="middle" fill="#FBBF24" fontSize="10">AES-256-GCM Encryption</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Zoom({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'architecture',
      name: 'System Architecture',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'High-level architecture of a video conferencing platform with clients, edge network, and backend services.',
      diagram: ZoomArchitectureDiagram,
      details: [
        {
          name: 'Client Layer',
          diagram: ZoomArchitectureDiagram,
          explanation: 'Zoom supports multiple client platforms: Desktop (Windows, macOS, Linux), Mobile (iOS, Android), and Web browsers using WebRTC. Native clients use custom codecs and protocols for optimal performance, while web clients rely on standard WebRTC APIs. All clients implement adaptive bitrate streaming, noise suppression, and virtual background features locally.',
          codeExample: `// Zoom Client Architecture
class ZoomClient {
    private MediaCapture mediaCapture;
    private VideoEncoder encoder;
    private WebSocketConnection signaling;
    private RTCPeerConnection peerConnection;

    public void joinMeeting(String meetingId, String password) {
        // 1. Connect to signaling server
        signaling.connect("wss://zoom.us/signaling");

        // 2. Authenticate and get meeting info
        MeetingInfo info = signaling.authenticate(meetingId, password);

        // 3. Initialize media capture
        mediaCapture.startCamera(1080, 30); // 1080p @ 30fps
        mediaCapture.startMicrophone();

        // 4. Connect to SFU/multimedia router
        peerConnection.connect(info.getMediaServerUrl());

        // 5. Start sending/receiving streams
        startMediaStreaming();
    }
}`
        },
        {
          name: 'Edge Network',
          explanation: 'Zoom operates 50+ data centers globally, forming a distributed edge network. Multimedia routers at each edge location handle STUN/TURN services for NAT traversal and SFU (Selective Forwarding Unit) for group calls. Geographic routing ensures users connect to the nearest edge server, minimizing latency. Each edge node can process and forward media independently.',
          codeExample: `// Edge Router Configuration
@Configuration
public class MultimediaRouterConfig {

    @Bean
    public STUNServer stunServer() {
        return STUNServer.builder()
            .port(3478)
            .publicIP(getPublicIP())
            .build();
    }

    @Bean
    public TURNServer turnServer() {
        return TURNServer.builder()
            .port(443)  // Use HTTPS port for firewall traversal
            .relayIPRange("10.0.0.0/8")
            .credentials(loadCredentials())
            .build();
    }

    @Bean
    public SFURouter sfuRouter() {
        return SFURouter.builder()
            .maxParticipants(1000)
            .simulcastEnabled(true)
            .bandwidthEstimation(true)
            .build();
    }
}`
        },
        {
          name: 'Backend Services',
          explanation: 'The backend is composed of microservices: Auth Service (OAuth, SSO, MFA), Meeting Service (scheduling, management), User Service (profiles, settings), Chat Service (messages, file sharing), Recording Service (capture, storage), Analytics (usage metrics), Presence (online status), and Notification (push, email). Services communicate via gRPC and message queues.',
          codeExample: `// Meeting Service Implementation
@Service
public class MeetingService {

    @Autowired
    private MeetingRepository repository;

    @Autowired
    private NotificationService notifications;

    public Meeting createMeeting(CreateMeetingRequest request) {
        Meeting meeting = Meeting.builder()
            .id(generateMeetingId())
            .hostId(request.getHostId())
            .topic(request.getTopic())
            .startTime(request.getStartTime())
            .duration(request.getDuration())
            .password(generatePassword())
            .settings(MeetingSettings.builder()
                .waitingRoom(true)
                .muteOnEntry(true)
                .hostVideo(true)
                .participantVideo(true)
                .build())
            .build();

        repository.save(meeting);
        notifications.sendInvites(meeting, request.getInvitees());

        return meeting;
    }
}`
        },
        {
          name: 'Data Storage',
          explanation: 'Multiple specialized databases are used: PostgreSQL for users, meetings, and settings (ACID transactions); Redis for presence, session data, and caching (sub-millisecond latency); S3/Azure Blob for recordings, files, and assets (petabyte scale); Cassandra for chat history and analytics (high write throughput). Data is replicated across regions for durability.',
          codeExample: `// Multi-Database Repository Pattern
@Repository
public class ZoomDataRepository {

    @Autowired
    private JdbcTemplate postgres;  // Users, Meetings

    @Autowired
    private RedisTemplate<String, Object> redis;  // Sessions

    @Autowired
    private CassandraTemplate cassandra;  // Chat History

    @Autowired
    private S3Client s3;  // Recordings

    public UserSession getSession(String sessionId) {
        // Check Redis cache first (sub-ms latency)
        UserSession session = redis.opsForValue()
            .get("session:" + sessionId);

        if (session == null) {
            // Fallback to Postgres
            session = postgres.queryForObject(
                "SELECT * FROM sessions WHERE id = ?",
                sessionId
            );
            // Cache for future requests
            redis.opsForValue().set(
                "session:" + sessionId,
                session,
                Duration.ofMinutes(30)
            );
        }
        return session;
    }
}`
        }
      ]
    },
    {
      id: 'webrtc',
      name: 'WebRTC & Media Servers',
      icon: '📡',
      color: '#8b5cf6',
      description: 'WebRTC signaling, ICE/STUN/TURN for NAT traversal, and SFU architecture for scalable group calls.',
      diagram: WebRTCDiagram,
      details: [
        {
          name: 'WebRTC Signaling',
          diagram: WebRTCDiagram,
          explanation: 'WebRTC requires a signaling server to exchange session descriptions (SDP) and ICE candidates between peers. The signaling server uses WebSocket for real-time bidirectional communication. The flow: Caller creates offer SDP -> sends via signaling -> Callee receives and creates answer SDP -> sends back -> Both exchange ICE candidates -> Direct P2P connection established.',
          codeExample: `// WebRTC Signaling Server
@ServerEndpoint("/signaling/{meetingId}")
public class SignalingEndpoint {

    private static Map<String, Set<Session>> meetings =
        new ConcurrentHashMap<>();

    @OnMessage
    public void handleMessage(Session session, String message) {
        SignalingMessage msg = parse(message);

        switch (msg.getType()) {
            case "offer":
                // Forward SDP offer to other participants
                broadcast(msg.getMeetingId(), msg, session);
                break;

            case "answer":
                // Forward SDP answer to caller
                sendTo(msg.getTargetId(), msg);
                break;

            case "ice-candidate":
                // Forward ICE candidate to peer
                sendTo(msg.getTargetId(), msg);
                break;

            case "join":
                // Add to meeting and notify others
                addToMeeting(session, msg.getMeetingId());
                notifyParticipantJoined(msg);
                break;
        }
    }
}`
        },
        {
          name: 'STUN/TURN NAT Traversal',
          explanation: 'STUN (Session Traversal Utilities for NAT) helps discover public IP addresses when behind NAT. TURN (Traversal Using Relays around NAT) acts as a relay when direct P2P fails due to symmetric NAT or restrictive firewalls. ICE (Interactive Connectivity Establishment) tries connection candidates in order: host (local), srflx (STUN), relay (TURN). ~85% of connections succeed without TURN.',
          codeExample: `// ICE Configuration
const iceConfiguration = {
    iceServers: [
        // STUN servers for NAT discovery
        { urls: 'stun:stun.zoom.us:3478' },
        { urls: 'stun:stun.zoom.us:5349' },

        // TURN servers for relay fallback
        {
            urls: 'turn:turn.zoom.us:443?transport=tcp',
            username: 'user',
            credential: 'pass'
        },
        {
            urls: 'turns:turn.zoom.us:443?transport=tcp',
            username: 'user',
            credential: 'pass'
        }
    ],
    iceCandidatePoolSize: 10,
    iceTransportPolicy: 'all'  // or 'relay' to force TURN
};

const peerConnection = new RTCPeerConnection(iceConfiguration);

peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
        // Send candidate to peer via signaling
        signalingChannel.send({
            type: 'ice-candidate',
            candidate: event.candidate
        });
    }
};`
        },
        {
          name: 'SFU Architecture',
          diagram: MediaFlowDiagram,
          explanation: 'SFU (Selective Forwarding Unit) is used for group calls (3+ participants). Unlike Mesh (N^2 connections) or MCU (server mixes all streams), SFU simply forwards streams without transcoding. Each participant sends 1 stream, receives N-1 streams. Simulcast: sender encodes multiple quality layers (1080p, 720p, 360p), SFU selects appropriate quality per recipient based on their bandwidth.',
          codeExample: `// SFU Server Implementation
public class SFUServer {

    private Map<String, Meeting> meetings = new ConcurrentHashMap<>();

    public void handleIncomingStream(
            String meetingId,
            String participantId,
            MediaStream stream) {

        Meeting meeting = meetings.get(meetingId);

        // Store the incoming stream
        meeting.addStream(participantId, stream);

        // Forward to all other participants
        for (Participant p : meeting.getParticipants()) {
            if (!p.getId().equals(participantId)) {
                // Select quality based on receiver's bandwidth
                int quality = selectQuality(
                    stream.getSimulcastLayers(),
                    p.getEstimatedBandwidth()
                );

                // Forward stream (no transcoding!)
                p.sendStream(stream.getLayer(quality));
            }
        }
    }

    private int selectQuality(
            List<SimulcastLayer> layers,
            long bandwidth) {
        // High: > 2.5 Mbps, Medium: > 1 Mbps, Low: < 1 Mbps
        if (bandwidth > 2_500_000) return 0;  // 1080p
        if (bandwidth > 1_000_000) return 1;  // 720p
        return 2;  // 360p
    }
}`
        },
        {
          name: 'Video/Audio Codecs',
          explanation: 'Video codecs: H.264/AVC (most compatible), VP8/VP9 (WebRTC default, open source), H.265/HEVC (better compression for 4K), AV1 (next-gen, 30% better than VP9). Audio codecs: Opus (WebRTC default, 6-510 kbps, low latency), AAC (high quality, widely supported), G.722 (HD voice for telephony). Zoom uses hardware acceleration when available.',
          codeExample: `// Codec Negotiation
const codecPreferences = {
    video: [
        { mimeType: 'video/VP9', clockRate: 90000 },
        { mimeType: 'video/VP8', clockRate: 90000 },
        { mimeType: 'video/H264', clockRate: 90000,
          sdpFmtpLine: 'level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f' }
    ],
    audio: [
        { mimeType: 'audio/opus', clockRate: 48000, channels: 2 },
        { mimeType: 'audio/PCMU', clockRate: 8000 },
        { mimeType: 'audio/PCMA', clockRate: 8000 }
    ]
};

// Set preferred codecs on sender
const sender = peerConnection.addTrack(videoTrack, stream);
const params = sender.getParameters();
params.codecs = codecPreferences.video;
sender.setParameters(params);

// Enable simulcast
const transceiver = peerConnection.addTransceiver('video', {
    direction: 'sendonly',
    streams: [stream],
    sendEncodings: [
        { rid: 'high', maxBitrate: 2500000, maxFramerate: 30 },
        { rid: 'medium', maxBitrate: 1000000, maxFramerate: 30, scaleResolutionDownBy: 2 },
        { rid: 'low', maxBitrate: 300000, maxFramerate: 15, scaleResolutionDownBy: 4 }
    ]
});`
        }
      ]
    },
    {
      id: 'features',
      name: 'Core Features',
      icon: '🎯',
      color: '#f59e0b',
      description: 'Screen sharing, recording, virtual backgrounds, breakout rooms, and AI-powered features.',
      details: [
        {
          name: 'Screen Sharing',
          explanation: 'Screen sharing uses getDisplayMedia() API to capture screen, window, or browser tab. Content optimization detects video vs. text content and adjusts encoding: text gets high bitrate + low FPS for clarity, video gets high FPS + adaptive bitrate. Remote control allows viewers to control shared screen via mouse/keyboard event forwarding. Annotations are synced in real-time.',
          codeExample: `// Screen Sharing Implementation
async function startScreenShare() {
    const constraints = {
        video: {
            cursor: 'always',
            displaySurface: 'monitor',  // or 'window', 'browser'
            frameRate: { max: 30 },
            width: { max: 1920 },
            height: { max: 1080 }
        },
        audio: true  // System audio capture
    };

    try {
        const stream = await navigator.mediaDevices
            .getDisplayMedia(constraints);

        // Detect content type for optimization
        const videoTrack = stream.getVideoTracks()[0];
        const settings = videoTrack.getSettings();

        if (settings.displaySurface === 'monitor') {
            // Full screen - optimize for mixed content
            applyMixedContentOptimization(stream);
        }

        // Add to peer connection
        const sender = peerConnection.addTrack(
            videoTrack,
            stream
        );

        // Handle share end
        videoTrack.onended = () => stopScreenShare();

        return stream;
    } catch (err) {
        console.error('Screen share failed:', err);
    }
}`
        },
        {
          name: 'Cloud Recording',
          diagram: RecordingDiagram,
          explanation: 'Cloud recording captures all streams server-side: active speaker view, gallery view, or shared screen with speaker thumbnail. Processing pipeline: real-time encoding during meeting, post-processing for transcoding/transcription/thumbnails, encryption at rest (AES-256), storage in S3 with multi-region replication. Outputs: MP4 video, M4A audio, VTT/SRT captions, JSON metadata.',
          codeExample: `// Recording Service
@Service
public class RecordingService {

    @Autowired
    private S3Client s3;

    @Autowired
    private TranscriptionService transcription;

    public Recording processRecording(
            String meetingId,
            List<MediaStream> streams) {

        // 1. Compose layout (speaker/gallery view)
        VideoComposer composer = new VideoComposer();
        composer.setLayout(RecordingLayout.SPEAKER_VIEW);

        for (MediaStream stream : streams) {
            composer.addStream(stream);
        }

        // 2. Encode to MP4
        byte[] videoData = composer.encodeToMP4(
            VideoCodec.H264,
            AudioCodec.AAC,
            new Resolution(1920, 1080),
            30  // fps
        );

        // 3. Generate transcript
        String transcript = transcription.transcribe(
            composer.getAudioTrack(),
            Language.ENGLISH
        );

        // 4. Upload to S3 with encryption
        String videoUrl = s3.putObject(
            PutObjectRequest.builder()
                .bucket("zoom-recordings")
                .key(meetingId + "/video.mp4")
                .serverSideEncryption(ServerSideEncryption.AES256)
                .build(),
            videoData
        );

        return new Recording(videoUrl, transcript);
    }
}`
        },
        {
          name: 'Virtual Backgrounds',
          explanation: 'Virtual backgrounds use ML-based person segmentation to separate foreground (person) from background. TensorFlow.js or WebGL shaders run real-time inference at 30fps. Options: static image, video, blur effect. Processing can run on CPU (fallback), GPU (WebGL), or dedicated NPU. Green screen mode uses color keying for better edge detection.',
          codeExample: `// Virtual Background with TensorFlow.js
import * as bodyPix from '@tensorflow-models/body-pix';

class VirtualBackground {
    private net: bodyPix.BodyPix;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    async initialize() {
        // Load BodyPix model
        this.net = await bodyPix.load({
            architecture: 'MobileNetV1',
            outputStride: 16,
            multiplier: 0.75,
            quantBytes: 2
        });
    }

    async processFrame(video: HTMLVideoElement, background: HTMLImageElement) {
        // Segment person from background
        const segmentation = await this.net.segmentPerson(video, {
            flipHorizontal: false,
            internalResolution: 'medium',
            segmentationThreshold: 0.7
        });

        // Draw background
        this.ctx.drawImage(background, 0, 0);

        // Create person mask
        const mask = bodyPix.toMask(
            segmentation,
            { r: 0, g: 0, b: 0, a: 0 },   // background
            { r: 0, g: 0, b: 0, a: 255 }  // foreground
        );

        // Composite person over background
        this.ctx.globalCompositeOperation = 'destination-over';
        this.ctx.drawImage(video, 0, 0);

        // Return processed stream
        return this.canvas.captureStream(30);
    }
}`
        },
        {
          name: 'Breakout Rooms',
          explanation: 'Breakout rooms allow hosts to split participants into up to 50 separate sessions. Implementation: each room is a separate SFU conference with its own signaling. Participants can be pre-assigned or auto-distributed. Host can broadcast messages to all rooms, move participants between rooms, and set timers. Return to main room tears down sub-conferences and reconnects everyone.',
          codeExample: `// Breakout Room Management
@Service
public class BreakoutRoomService {

    @Autowired
    private MeetingService meetingService;

    public List<BreakoutRoom> createRooms(
            String mainMeetingId,
            int roomCount,
            List<String> participantIds,
            boolean autoAssign) {

        List<BreakoutRoom> rooms = new ArrayList<>();

        for (int i = 0; i < roomCount; i++) {
            // Create sub-meeting for each room
            BreakoutRoom room = BreakoutRoom.builder()
                .id(generateRoomId())
                .parentMeetingId(mainMeetingId)
                .name("Room " + (i + 1))
                .sfuEndpoint(allocateSFU())
                .build();
            rooms.add(room);
        }

        if (autoAssign) {
            // Distribute participants evenly
            int roomIndex = 0;
            for (String pid : participantIds) {
                rooms.get(roomIndex).addParticipant(pid);
                roomIndex = (roomIndex + 1) % roomCount;
            }
        }

        return rooms;
    }

    public void broadcastToAllRooms(
            String mainMeetingId,
            String message) {
        List<BreakoutRoom> rooms = getRooms(mainMeetingId);
        for (BreakoutRoom room : rooms) {
            sendMessage(room.getId(), message);
        }
    }
}`
        }
      ]
    },
    {
      id: 'scaling',
      name: 'Scaling & Performance',
      icon: '📈',
      color: '#10b981',
      description: 'Strategies for handling 1000+ participant meetings, global edge network, and bandwidth optimization.',
      diagram: ScalingDiagram,
      details: [
        {
          name: 'Large Meeting Optimization',
          explanation: 'For meetings with 1000+ participants: Gallery view renders only visible tiles (9-49), others are lazy-loaded on scroll. Active speaker detection prioritizes bandwidth for speakers. Video on-demand: request video only for visible participants, audio-only for off-screen. Webinar mode: 10K+ attendees view-only, panelists broadcast via hybrid SFU+CDN architecture.',
          codeExample: `// Large Meeting Optimization
class LargeMeetingHandler {

    private static final int VISIBLE_TILES = 25;

    public void optimizeVideoSubscription(
            List<Participant> all,
            List<Participant> visible) {

        for (Participant p : all) {
            if (visible.contains(p)) {
                // Subscribe to video
                p.setVideoSubscription(true);

                // Higher quality for active speaker
                if (p.isActiveSpeaker()) {
                    p.setVideoQuality(VideoQuality.HIGH);
                } else {
                    p.setVideoQuality(VideoQuality.MEDIUM);
                }
            } else {
                // Audio only for non-visible
                p.setVideoSubscription(false);
            }
        }
    }

    public void handleGalleryScroll(int startIndex) {
        // Lazy load videos for newly visible tiles
        List<Participant> newlyVisible = participants
            .subList(startIndex, startIndex + VISIBLE_TILES);

        for (Participant p : newlyVisible) {
            if (!p.hasVideoSubscription()) {
                requestVideo(p);
            }
        }

        // Unsubscribe from now-hidden participants
        List<Participant> nowHidden = participants.stream()
            .filter(p -> !newlyVisible.contains(p))
            .collect(toList());

        for (Participant p : nowHidden) {
            unsubscribeVideo(p);
        }
    }
}`
        },
        {
          name: 'Global Edge Network',
          diagram: ScalingDiagram,
          explanation: 'Zoom operates 50+ data centers globally across North America, Europe, Asia-Pacific, and South America. Intelligent routing selects the nearest edge based on latency, capacity, and network conditions. Auto-failover to backup data center if primary fails (no meeting interruption). Edge processing runs media mixing/SFU locally for lowest latency. Anycast DNS enables fast nearest-node discovery.',
          codeExample: `// Geographic Load Balancer
@Service
public class GeoLoadBalancer {

    private List<DataCenter> dataCenters;

    public DataCenter selectBestDataCenter(
            String clientIP,
            String meetingId) {

        GeoLocation clientLocation = geoIP.lookup(clientIP);
        Meeting meeting = meetingService.get(meetingId);

        // Score each data center
        List<ScoredDC> scored = dataCenters.stream()
            .map(dc -> new ScoredDC(dc, calculateScore(
                dc, clientLocation, meeting
            )))
            .sorted(Comparator.comparingDouble(s -> s.score))
            .collect(toList());

        // Return best available
        for (ScoredDC s : scored) {
            if (s.dc.hasCapacity() && s.dc.isHealthy()) {
                return s.dc;
            }
        }

        throw new NoCapacityException();
    }

    private double calculateScore(
            DataCenter dc,
            GeoLocation client,
            Meeting meeting) {

        double latency = dc.measureLatency(client);
        double load = dc.getCurrentLoad();

        // Prefer DCs where other participants are
        int sameRegionParticipants = meeting.getParticipants()
            .stream()
            .filter(p -> p.getDataCenter().equals(dc))
            .count();

        return latency * 0.5 + load * 0.3
             - sameRegionParticipants * 10;
    }
}`
        },
        {
          name: 'Adaptive Bitrate',
          explanation: 'Network conditions are monitored every 1-2 seconds: RTT, packet loss, jitter, available bandwidth. Quality adjusts dynamically: High bandwidth (>2.5 Mbps) gets 1080p, medium (>1 Mbps) gets 720p, low (<1 Mbps) gets 360p, critical (<100 Kbps) falls back to audio-only. Audio is always prioritized over video. Simulcast enables per-recipient quality selection.',
          codeExample: `// Adaptive Bitrate Controller
class AdaptiveBitrateController {

    private static final long SAMPLE_INTERVAL_MS = 1500;

    public void monitorAndAdapt(RTCPeerConnection pc) {
        scheduler.scheduleAtFixedRate(() -> {
            RTCStatsReport stats = pc.getStats();

            // Calculate network metrics
            long rtt = stats.getRoundTripTime();
            double packetLoss = stats.getPacketLoss();
            long availableBandwidth =
                stats.getAvailableOutgoingBitrate();
            long jitter = stats.getJitter();

            // Determine quality level
            VideoQuality quality;
            if (availableBandwidth > 2_500_000
                    && packetLoss < 0.01
                    && rtt < 100) {
                quality = VideoQuality.HIGH_1080P;
            } else if (availableBandwidth > 1_000_000
                    && packetLoss < 0.03) {
                quality = VideoQuality.MEDIUM_720P;
            } else if (availableBandwidth > 300_000) {
                quality = VideoQuality.LOW_360P;
            } else {
                quality = VideoQuality.AUDIO_ONLY;
            }

            // Apply quality change
            if (quality != currentQuality) {
                applyQualityChange(quality);
                currentQuality = quality;
            }

        }, 0, SAMPLE_INTERVAL_MS, TimeUnit.MILLISECONDS);
    }
}`
        },
        {
          name: 'Performance Targets',
          explanation: 'Key performance metrics: End-to-end latency <150ms for real-time feel, packet loss <1%, jitter <30ms, video frame rate 30fps at 1080p, time to join meeting <3 seconds, service uptime 99.9% (8.76 hours/year downtime). Monitoring tracks these metrics per session and triggers alerts for degradation.',
          codeExample: `// Performance Monitoring
@Component
public class PerformanceMonitor {

    @Autowired
    private MetricsService metrics;

    @Autowired
    private AlertService alerts;

    // SLA Thresholds
    private static final long MAX_LATENCY_MS = 150;
    private static final double MAX_PACKET_LOSS = 0.01;
    private static final long MAX_JITTER_MS = 30;
    private static final int MIN_FRAME_RATE = 25;
    private static final long MAX_JOIN_TIME_MS = 3000;

    @Scheduled(fixedRate = 5000)
    public void checkPerformance() {
        for (Meeting meeting : activeMeetings) {
            for (Participant p : meeting.getParticipants()) {
                SessionMetrics m = p.getMetrics();

                // Check latency
                if (m.getLatency() > MAX_LATENCY_MS) {
                    alerts.warn("High latency", p, m);
                }

                // Check packet loss
                if (m.getPacketLoss() > MAX_PACKET_LOSS) {
                    alerts.warn("Packet loss", p, m);
                }

                // Check frame rate
                if (m.getFrameRate() < MIN_FRAME_RATE) {
                    alerts.info("Low frame rate", p, m);
                }

                // Record metrics for dashboards
                metrics.record("meeting.latency", m.getLatency());
                metrics.record("meeting.packet_loss", m.getPacketLoss());
                metrics.record("meeting.frame_rate", m.getFrameRate());
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'security',
      name: 'Security & Encryption',
      icon: '🔒',
      color: '#ef4444',
      description: 'End-to-end encryption, authentication, waiting rooms, and security best practices.',
      diagram: SecurityDiagram,
      details: [
        {
          name: 'End-to-End Encryption',
          diagram: SecurityDiagram,
          explanation: 'E2EE ensures only meeting participants can decrypt media - Zoom servers cannot access content. Uses AES-256-GCM encryption with meeting-specific keys. Key exchange via public key cryptography. When E2EE is enabled, server-side features (recording, transcription) are disabled since server cannot decrypt. Participants see a security code to verify E2EE is active.',
          codeExample: `// End-to-End Encryption Implementation
class E2EEManager {

    private KeyPair localKeyPair;
    private Map<String, PublicKey> participantKeys;
    private SecretKey meetingKey;

    public void initialize(String meetingId) {
        // Generate local key pair
        KeyPairGenerator kpg = KeyPairGenerator.getInstance("X25519");
        localKeyPair = kpg.generateKeyPair();

        // Exchange public keys via signaling
        signalingChannel.send(new KeyExchangeMessage(
            localKeyPair.getPublic()
        ));
    }

    public void onParticipantKeyReceived(
            String participantId,
            PublicKey theirPublicKey) {
        participantKeys.put(participantId, theirPublicKey);

        // Derive shared secret using ECDH
        KeyAgreement ka = KeyAgreement.getInstance("X25519");
        ka.init(localKeyPair.getPrivate());
        ka.doPhase(theirPublicKey, true);
        byte[] sharedSecret = ka.generateSecret();

        // Derive meeting key from shared secret
        meetingKey = deriveKey(sharedSecret, "meeting-key");
    }

    public byte[] encryptMedia(byte[] plaintext) {
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        byte[] iv = generateRandomIV(12);
        cipher.init(Cipher.ENCRYPT_MODE, meetingKey,
            new GCMParameterSpec(128, iv));
        byte[] ciphertext = cipher.doFinal(plaintext);
        return concat(iv, ciphertext);
    }
}`
        },
        {
          name: 'Waiting Room',
          explanation: 'Waiting room holds participants until host admits them. Prevents "Zoom-bombing" and unauthorized access. Host sees list of waiting participants with names/photos. Options: admit all, admit individually, remove from waiting room. Can be combined with passcode for two-factor meeting security. Enterprise admins can enforce waiting room by policy.',
          codeExample: `// Waiting Room Implementation
@Service
public class WaitingRoomService {

    @Autowired
    private WebSocketHandler wsHandler;

    private Map<String, Queue<WaitingParticipant>> waitingRooms;

    public void handleJoinRequest(
            String meetingId,
            Participant participant) {

        Meeting meeting = meetingService.get(meetingId);

        if (meeting.isWaitingRoomEnabled()) {
            // Add to waiting room
            WaitingParticipant wp = new WaitingParticipant(
                participant, Instant.now()
            );
            waitingRooms.get(meetingId).add(wp);

            // Notify host
            wsHandler.sendToHost(meetingId, new WaitingNotification(
                participant.getName(),
                participant.getEmail(),
                participant.getProfilePicture()
            ));

            // Notify participant they're waiting
            wsHandler.sendTo(participant, new WaitingMessage(
                "Please wait for the host to admit you"
            ));
        } else {
            // Direct admit
            admitParticipant(meetingId, participant.getId());
        }
    }

    public void admitParticipant(
            String meetingId,
            String participantId) {
        WaitingParticipant wp = waitingRooms.get(meetingId)
            .stream()
            .filter(p -> p.getId().equals(participantId))
            .findFirst()
            .orElseThrow();

        // Move to meeting
        meetingService.addParticipant(meetingId, wp.getParticipant());
        waitingRooms.get(meetingId).remove(wp);
    }
}`
        },
        {
          name: 'Authentication & SSO',
          explanation: 'Authentication options: Email/password with MFA, OAuth (Google, Facebook), SAML SSO for enterprise, API tokens (JWT, OAuth 2.0). Enterprise features: SCIM provisioning, domain verification, managed domains. Meeting security: passcodes, meeting locks (prevent new joins), registration required for webinars. Rate limiting and CAPTCHA prevent brute force attacks.',
          codeExample: `// Authentication Service
@Service
public class AuthService {

    @Autowired
    private SAMLService samlService;

    @Autowired
    private OAuthService oauthService;

    @Autowired
    private MFAService mfaService;

    public AuthResult authenticate(AuthRequest request) {
        User user;

        switch (request.getMethod()) {
            case SAML_SSO:
                // Enterprise SSO
                SAMLResponse samlResponse = samlService.validate(
                    request.getSamlToken()
                );
                user = userService.findByEmail(
                    samlResponse.getEmail()
                );
                break;

            case OAUTH:
                // Google/Facebook OAuth
                OAuthToken token = oauthService.exchange(
                    request.getOAuthCode(),
                    request.getProvider()
                );
                user = userService.findOrCreate(
                    token.getEmail()
                );
                break;

            case PASSWORD:
                // Email/password
                user = userService.findByEmail(request.getEmail());
                if (!passwordEncoder.matches(
                        request.getPassword(),
                        user.getPasswordHash())) {
                    throw new InvalidCredentialsException();
                }
                break;
        }

        // Check MFA if enabled
        if (user.isMfaEnabled()) {
            if (!mfaService.verify(user, request.getMfaCode())) {
                return AuthResult.mfaRequired(user.getId());
            }
        }

        // Generate session token
        String token = jwtService.generateToken(user);
        return AuthResult.success(token, user);
    }
}`
        },
        {
          name: 'Meeting Passwords & Locks',
          explanation: 'Meeting passwords add authentication layer - embedded in invite links for convenience or entered manually. Meeting lock prevents any new participants after meeting starts (useful for sensitive discussions). Additional controls: disable screen sharing for participants, mute all on entry, disable file transfer, restrict chat to host only.',
          codeExample: `// Meeting Security Controls
@RestController
@RequestMapping("/api/meetings/{meetingId}")
public class MeetingSecurityController {

    @PutMapping("/lock")
    public void lockMeeting(@PathVariable String meetingId) {
        Meeting meeting = meetingService.get(meetingId);
        validateHost(meeting);

        meeting.setLocked(true);
        meetingService.save(meeting);

        // Notify all participants
        wsHandler.broadcast(meetingId, new LockNotification(
            "Meeting has been locked by host"
        ));
    }

    @PutMapping("/security-settings")
    public void updateSecuritySettings(
            @PathVariable String meetingId,
            @RequestBody SecuritySettings settings) {

        Meeting meeting = meetingService.get(meetingId);
        validateHost(meeting);

        meeting.setSettings(MeetingSettings.builder()
            .waitingRoom(settings.isWaitingRoom())
            .password(settings.getPassword())
            .allowScreenShare(settings.isAllowScreenShare())
            .muteOnEntry(settings.isMuteOnEntry())
            .allowChat(settings.isAllowChat())
            .allowFileTransfer(settings.isAllowFileTransfer())
            .allowUnmute(settings.isAllowUnmute())
            .build());

        meetingService.save(meeting);
    }

    @PostMapping("/remove-participant/{participantId}")
    public void removeParticipant(
            @PathVariable String meetingId,
            @PathVariable String participantId) {

        Meeting meeting = meetingService.get(meetingId);
        validateHost(meeting);

        // Remove from meeting
        meeting.removeParticipant(participantId);

        // Optionally block from rejoining
        meeting.getBlockList().add(participantId);

        meetingService.save(meeting);
    }
}`
        }
      ]
    },
    {
      id: 'api',
      name: 'API Design',
      icon: '🔌',
      color: '#06b6d4',
      description: 'RESTful API endpoints for meeting management, users, recordings, and webhooks.',
      details: [
        {
          name: 'Meeting APIs',
          explanation: 'RESTful API with OAuth 2.0/JWT authentication. Core endpoints: POST /users/{userId}/meetings (create), GET /meetings/{meetingId} (details), PATCH /meetings/{meetingId} (update), DELETE /meetings/{meetingId} (cancel), GET /users/{userId}/meetings (list). Rate limits: 50-100 req/sec per endpoint. Response includes join_url for participants and start_url for host.',
          codeExample: `// Create Meeting API
POST /users/{userId}/meetings
Authorization: Bearer {access_token}
Content-Type: application/json

{
    "topic": "Weekly Team Sync",
    "type": 2,  // 1=instant, 2=scheduled, 3=recurring
    "start_time": "2024-01-20T10:00:00Z",
    "duration": 60,
    "timezone": "America/New_York",
    "password": "abc123",
    "agenda": "Discuss project updates",
    "settings": {
        "host_video": true,
        "participant_video": true,
        "waiting_room": true,
        "join_before_host": false,
        "mute_upon_entry": true,
        "auto_recording": "cloud"
    }
}

// Response
{
    "id": 123456789,
    "topic": "Weekly Team Sync",
    "join_url": "https://zoom.us/j/123456789?pwd=xxx",
    "start_url": "https://zoom.us/s/123456789?zak=yyy",
    "password": "abc123",
    "status": "waiting",
    "created_at": "2024-01-15T08:30:00Z"
}`
        },
        {
          name: 'Participant APIs',
          explanation: 'Real-time participant management during live meetings. GET /meetings/{id}/participants (list), PUT /live_meetings/{id}/participants/{participantId} (update: mute/unmute, spotlight, lower hand, rename). Participant details include: name, email, join time, duration, device info, attentiveness score. Dashboard API for admin analytics.',
          codeExample: `// List Meeting Participants
GET /meetings/{meetingId}/participants
Authorization: Bearer {access_token}

// Response
{
    "page_count": 1,
    "page_size": 30,
    "total_records": 5,
    "participants": [
        {
            "id": "abc123",
            "user_id": "user789",
            "name": "John Doe",
            "email": "john@example.com",
            "join_time": "2024-01-20T10:05:00Z",
            "leave_time": null,
            "duration": 3600,
            "attentiveness_score": 95,
            "status": "in_meeting",
            "video_quality": "good",
            "audio_quality": "good"
        }
    ]
}

// Update Participant (during live meeting)
PUT /live_meetings/{meetingId}/participants/{participantId}
{
    "action": "mute",
    // or: "unmute", "spotlight", "unspotlight",
    //     "rename", "lower_hand"
    "value": true
}`
        },
        {
          name: 'Recording APIs',
          explanation: 'Manage cloud recordings: GET /meetings/{id}/recordings (list files), DELETE /meetings/{id}/recordings/{recordingId} (delete), GET /meetings/{id}/recordings/{recordingId}/status (processing status). Recording files include: video (MP4), audio-only (M4A), transcription (VTT), chat (TXT). Download URLs are time-limited (signed URLs).',
          codeExample: `// Get Meeting Recordings
GET /meetings/{meetingId}/recordings
Authorization: Bearer {access_token}

// Response
{
    "meeting_id": 123456789,
    "host_email": "host@example.com",
    "recording_start": "2024-01-20T10:00:00Z",
    "recording_end": "2024-01-20T11:00:00Z",
    "total_size": 524288000,
    "recording_files": [
        {
            "id": "rec123",
            "recording_type": "shared_screen_with_speaker_view",
            "file_type": "MP4",
            "file_size": 500000000,
            "download_url": "https://zoom.us/rec/download/xxx",
            "play_url": "https://zoom.us/rec/play/xxx",
            "status": "completed"
        },
        {
            "id": "rec456",
            "recording_type": "audio_only",
            "file_type": "M4A",
            "file_size": 20000000,
            "download_url": "https://zoom.us/rec/download/yyy"
        },
        {
            "id": "rec789",
            "recording_type": "audio_transcript",
            "file_type": "VTT",
            "file_size": 50000,
            "download_url": "https://zoom.us/rec/download/zzz"
        }
    ]
}`
        },
        {
          name: 'Webhooks',
          explanation: 'Event-driven notifications for meeting lifecycle: meeting.started, meeting.ended, participant.joined, participant.left, recording.completed. Webhook payload includes event type, timestamp, and relevant data. Verification via HMAC signature. Retry logic with exponential backoff. Event types for webinars, users, recordings, and chat messages.',
          codeExample: `// Webhook Event Handler
@RestController
@RequestMapping("/webhooks/zoom")
public class ZoomWebhookController {

    @Value("\${zoom.webhook.secret}")
    private String webhookSecret;

    @PostMapping
    public ResponseEntity<String> handleWebhook(
            @RequestHeader("x-zm-signature") String signature,
            @RequestBody String payload) {

        // Verify webhook signature
        String computed = HmacUtils.hmacSha256Hex(
            webhookSecret, payload
        );
        if (!computed.equals(signature)) {
            return ResponseEntity.status(401).build();
        }

        WebhookEvent event = objectMapper.readValue(
            payload, WebhookEvent.class
        );

        switch (event.getEvent()) {
            case "meeting.started":
                handleMeetingStarted(event.getPayload());
                break;

            case "meeting.ended":
                handleMeetingEnded(event.getPayload());
                break;

            case "meeting.participant_joined":
                handleParticipantJoined(event.getPayload());
                break;

            case "recording.completed":
                handleRecordingCompleted(event.getPayload());
                break;
        }

        return ResponseEntity.ok("received");
    }

    private void handleRecordingCompleted(JsonNode payload) {
        String meetingId = payload.get("meeting_id").asText();
        String downloadUrl = payload.get("download_url").asText();

        // Process recording (e.g., transcription, archival)
        recordingService.processNewRecording(
            meetingId, downloadUrl
        );
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
      { name: 'System Design', icon: '🏛️', page: 'System Design' },
      { name: 'Zoom', icon: '📹', page: 'Zoom' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
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
        <h1 style={titleStyle}>Zoom Video Conferencing System Design</h1>
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
          ← Back to System Design
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

export default Zoom

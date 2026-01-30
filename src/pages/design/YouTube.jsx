import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

// SVG Diagram Components

// 1. High-Level Architecture Diagram: Upload → Processing → Storage → CDN → Playback
const YouTubeArchitectureDiagram = () => (
  <svg viewBox="0 0 900 400" className="w-full h-auto">
    <defs>
      <linearGradient id="ytUploadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="ytProcessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="ytStorageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="ytCdnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="ytPlayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="ytArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
      </marker>
      <filter id="ytShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Title */}
    <text x="450" y="30" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
      YouTube High-Level Architecture Flow
    </text>

    {/* Step 1: Upload */}
    <g filter="url(#ytShadow)">
      <rect x="20" y="80" width="140" height="100" rx="12" fill="url(#ytUploadGrad)" stroke="#16a34a" strokeWidth="2" />
      <text x="90" y="115" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">UPLOAD</text>
      <text x="90" y="135" fontSize="10" fill="#dcfce7" textAnchor="middle">Chunked Upload</text>
      <text x="90" y="150" fontSize="10" fill="#dcfce7" textAnchor="middle">Resume Support</text>
      <text x="90" y="165" fontSize="10" fill="#dcfce7" textAnchor="middle">Virus Scan</text>
    </g>

    {/* Arrow 1 */}
    <path d="M 160 130 L 195 130" stroke="#ef4444" strokeWidth="3" markerEnd="url(#ytArrow)" />
    <text x="177" y="120" fontSize="9" fill="#fca5a5" textAnchor="middle">Raw</text>

    {/* Step 2: Processing */}
    <g filter="url(#ytShadow)">
      <rect x="200" y="80" width="140" height="100" rx="12" fill="url(#ytProcessGrad)" stroke="#d97706" strokeWidth="2" />
      <text x="270" y="115" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">PROCESSING</text>
      <text x="270" y="135" fontSize="10" fill="#fef3c7" textAnchor="middle">Transcoding</text>
      <text x="270" y="150" fontSize="10" fill="#fef3c7" textAnchor="middle">8 Resolutions</text>
      <text x="270" y="165" fontSize="10" fill="#fef3c7" textAnchor="middle">Thumbnails</text>
    </g>

    {/* Arrow 2 */}
    <path d="M 340 130 L 375 130" stroke="#ef4444" strokeWidth="3" markerEnd="url(#ytArrow)" />
    <text x="357" y="120" fontSize="9" fill="#fca5a5" textAnchor="middle">Encoded</text>

    {/* Step 3: Storage */}
    <g filter="url(#ytShadow)">
      <rect x="380" y="80" width="140" height="100" rx="12" fill="url(#ytStorageGrad)" stroke="#2563eb" strokeWidth="2" />
      <text x="450" y="115" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">STORAGE</text>
      <text x="450" y="135" fontSize="10" fill="#dbeafe" textAnchor="middle">Object Storage</text>
      <text x="450" y="150" fontSize="10" fill="#dbeafe" textAnchor="middle">S3 / GCS</text>
      <text x="450" y="165" fontSize="10" fill="#dbeafe" textAnchor="middle">Petabytes</text>
    </g>

    {/* Arrow 3 */}
    <path d="M 520 130 L 555 130" stroke="#ef4444" strokeWidth="3" markerEnd="url(#ytArrow)" />
    <text x="537" y="120" fontSize="9" fill="#fca5a5" textAnchor="middle">Push</text>

    {/* Step 4: CDN */}
    <g filter="url(#ytShadow)">
      <rect x="560" y="80" width="140" height="100" rx="12" fill="url(#ytCdnGrad)" stroke="#dc2626" strokeWidth="2" />
      <text x="630" y="115" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">CDN</text>
      <text x="630" y="135" fontSize="10" fill="#fecaca" textAnchor="middle">Edge Servers</text>
      <text x="630" y="150" fontSize="10" fill="#fecaca" textAnchor="middle">200+ PoPs</text>
      <text x="630" y="165" fontSize="10" fill="#fecaca" textAnchor="middle">95% Cache Hit</text>
    </g>

    {/* Arrow 4 */}
    <path d="M 700 130 L 735 130" stroke="#ef4444" strokeWidth="3" markerEnd="url(#ytArrow)" />
    <text x="717" y="120" fontSize="9" fill="#fca5a5" textAnchor="middle">Stream</text>

    {/* Step 5: Playback */}
    <g filter="url(#ytShadow)">
      <rect x="740" y="80" width="140" height="100" rx="12" fill="url(#ytPlayGrad)" stroke="#9333ea" strokeWidth="2" />
      <text x="810" y="115" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">PLAYBACK</text>
      <text x="810" y="135" fontSize="10" fill="#e9d5ff" textAnchor="middle">Adaptive Bitrate</text>
      <text x="810" y="150" fontSize="10" fill="#e9d5ff" textAnchor="middle">HLS / DASH</text>
      <text x="810" y="165" fontSize="10" fill="#e9d5ff" textAnchor="middle">2B Users</text>
    </g>

    {/* Bottom Labels */}
    <g>
      <rect x="20" y="220" width="140" height="60" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="1" />
      <text x="90" y="245" fontSize="11" fontWeight="bold" fill="#22c55e" textAnchor="middle">Creator</text>
      <text x="90" y="262" fontSize="10" fill="#9ca3af" textAnchor="middle">500 hrs/min</text>
    </g>
    <g>
      <rect x="740" y="220" width="140" height="60" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="1" />
      <text x="810" y="245" fontSize="11" fontWeight="bold" fill="#a855f7" textAnchor="middle">Viewer</text>
      <text x="810" y="262" fontSize="10" fill="#9ca3af" textAnchor="middle">1B hrs/day</text>
    </g>

    {/* Connecting lines to labels */}
    <path d="M 90 180 L 90 220" stroke="#4b5563" strokeWidth="2" strokeDasharray="4,4" />
    <path d="M 810 180 L 810 220" stroke="#4b5563" strokeWidth="2" strokeDasharray="4,4" />

    {/* Processing Time Labels */}
    <rect x="200" y="320" width="500" height="50" rx="8" fill="#dc2626" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
    <text x="450" y="345" fontSize="12" fontWeight="bold" fill="#ef4444" textAnchor="middle">End-to-End Pipeline</text>
    <text x="450" y="360" fontSize="10" fill="#fca5a5" textAnchor="middle">{`Upload: 1-5 min | Transcode: 5-30 min | CDN: Instant | Playback: &lt;2s start`}</text>
  </svg>
);

// 2. Video Processing Pipeline Diagram
const VideoProcessingDiagram = () => (
  <svg viewBox="0 0 900 450" className="w-full h-auto">
    <defs>
      <linearGradient id="vpIngestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="vpTranscodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="vpPackageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#eab308', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ca8a04', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="vpStoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="vpArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#f97316" />
      </marker>
    </defs>

    {/* Title */}
    <text x="450" y="25" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
      Video Processing Pipeline
    </text>

    {/* Ingest Stage */}
    <g>
      <rect x="30" y="60" width="150" height="120" rx="10" fill="url(#vpIngestGrad)" stroke="#b91c1c" strokeWidth="2" />
      <text x="105" y="90" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">INGEST</text>
      <line x1="45" y1="100" x2="165" y2="100" stroke="white" strokeOpacity="0.3" />
      <text x="105" y="120" fontSize="10" fill="#fecaca" textAnchor="middle">Receive Chunks</text>
      <text x="105" y="135" fontSize="10" fill="#fecaca" textAnchor="middle">Reassemble File</text>
      <text x="105" y="150" fontSize="10" fill="#fecaca" textAnchor="middle">Validate Format</text>
      <text x="105" y="165" fontSize="10" fill="#fecaca" textAnchor="middle">Extract Metadata</text>
    </g>

    {/* Arrow to Transcode */}
    <path d="M 180 120 L 215 120" stroke="#f97316" strokeWidth="3" markerEnd="url(#vpArrow)" />

    {/* Transcode Stage - Multiple Resolutions */}
    <g>
      <rect x="220" y="40" width="300" height="180" rx="10" fill="url(#vpTranscodeGrad)" stroke="#c2410c" strokeWidth="2" />
      <text x="370" y="65" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">TRANSCODE (FFmpeg)</text>
      <line x1="235" y1="75" x2="505" y2="75" stroke="white" strokeOpacity="0.3" />

      {/* Resolution boxes */}
      <rect x="235" y="85" width="60" height="28" rx="4" fill="#1f2937" stroke="#374151" />
      <text x="265" y="104" fontSize="10" fill="#fdba74" textAnchor="middle">2160p</text>

      <rect x="300" y="85" width="60" height="28" rx="4" fill="#1f2937" stroke="#374151" />
      <text x="330" y="104" fontSize="10" fill="#fdba74" textAnchor="middle">1440p</text>

      <rect x="365" y="85" width="60" height="28" rx="4" fill="#1f2937" stroke="#374151" />
      <text x="395" y="104" fontSize="10" fill="#fdba74" textAnchor="middle">1080p</text>

      <rect x="430" y="85" width="60" height="28" rx="4" fill="#1f2937" stroke="#374151" />
      <text x="460" y="104" fontSize="10" fill="#fdba74" textAnchor="middle">720p</text>

      <rect x="235" y="118" width="60" height="28" rx="4" fill="#1f2937" stroke="#374151" />
      <text x="265" y="137" fontSize="10" fill="#fdba74" textAnchor="middle">480p</text>

      <rect x="300" y="118" width="60" height="28" rx="4" fill="#1f2937" stroke="#374151" />
      <text x="330" y="137" fontSize="10" fill="#fdba74" textAnchor="middle">360p</text>

      <rect x="365" y="118" width="60" height="28" rx="4" fill="#1f2937" stroke="#374151" />
      <text x="395" y="137" fontSize="10" fill="#fdba74" textAnchor="middle">240p</text>

      <rect x="430" y="118" width="60" height="28" rx="4" fill="#1f2937" stroke="#374151" />
      <text x="460" y="137" fontSize="10" fill="#fdba74" textAnchor="middle">144p</text>

      {/* Codecs */}
      <text x="280" y="175" fontSize="9" fill="#fed7aa" textAnchor="middle">H.264</text>
      <text x="370" y="175" fontSize="9" fill="#fed7aa" textAnchor="middle">VP9</text>
      <text x="460" y="175" fontSize="9" fill="#fed7aa" textAnchor="middle">AV1</text>

      {/* Thumbnails */}
      <text x="370" y="200" fontSize="10" fill="white" textAnchor="middle">+ Thumbnails + Preview Sprites</text>
    </g>

    {/* Arrow to Package */}
    <path d="M 520 130 L 555 130" stroke="#f97316" strokeWidth="3" markerEnd="url(#vpArrow)" />

    {/* Package Stage */}
    <g>
      <rect x="560" y="60" width="140" height="120" rx="10" fill="url(#vpPackageGrad)" stroke="#a16207" strokeWidth="2" />
      <text x="630" y="90" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">PACKAGE</text>
      <line x1="575" y1="100" x2="685" y2="100" stroke="white" strokeOpacity="0.3" />
      <text x="630" y="120" fontSize="10" fill="#fef9c3" textAnchor="middle">Segment Videos</text>
      <text x="630" y="135" fontSize="10" fill="#fef9c3" textAnchor="middle">Create Manifests</text>
      <text x="630" y="150" fontSize="10" fill="#fef9c3" textAnchor="middle">HLS (.m3u8)</text>
      <text x="630" y="165" fontSize="10" fill="#fef9c3" textAnchor="middle">DASH (.mpd)</text>
    </g>

    {/* Arrow to Store */}
    <path d="M 700 120 L 735 120" stroke="#f97316" strokeWidth="3" markerEnd="url(#vpArrow)" />

    {/* Store Stage */}
    <g>
      <rect x="740" y="60" width="140" height="120" rx="10" fill="url(#vpStoreGrad)" stroke="#15803d" strokeWidth="2" />
      <text x="810" y="90" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">STORE</text>
      <line x1="755" y1="100" x2="865" y2="100" stroke="white" strokeOpacity="0.3" />
      <text x="810" y="120" fontSize="10" fill="#dcfce7" textAnchor="middle">Object Storage</text>
      <text x="810" y="135" fontSize="10" fill="#dcfce7" textAnchor="middle">S3 / GCS</text>
      <text x="810" y="150" fontSize="10" fill="#dcfce7" textAnchor="middle">CDN Origin</text>
      <text x="810" y="165" fontSize="10" fill="#dcfce7" textAnchor="middle">Replicated</text>
    </g>

    {/* Bottom: Worker Details */}
    <rect x="30" y="250" width="850" height="100" rx="10" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="455" y="275" fontSize="14" fontWeight="bold" fill="#f97316" textAnchor="middle">Parallel Processing Architecture</text>

    {/* Worker icons */}
    <g>
      <rect x="60" y="290" width="100" height="45" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
      <text x="110" y="312" fontSize="10" fontWeight="bold" fill="#ef4444" textAnchor="middle">Kafka Queue</text>
      <text x="110" y="326" fontSize="9" fill="#fca5a5" textAnchor="middle">Job Distribution</text>
    </g>

    <g>
      <rect x="180" y="290" width="100" height="45" rx="6" fill="#f97316" fillOpacity="0.2" stroke="#f97316" />
      <text x="230" y="312" fontSize="10" fontWeight="bold" fill="#f97316" textAnchor="middle">5,000+ Workers</text>
      <text x="230" y="326" fontSize="9" fill="#fdba74" textAnchor="middle">GPU Instances</text>
    </g>

    <g>
      <rect x="300" y="290" width="100" height="45" rx="6" fill="#eab308" fillOpacity="0.2" stroke="#eab308" />
      <text x="350" y="312" fontSize="10" fontWeight="bold" fill="#eab308" textAnchor="middle">Segment Split</text>
      <text x="350" y="326" fontSize="9" fill="#fde047" textAnchor="middle">1-min Chunks</text>
    </g>

    <g>
      <rect x="420" y="290" width="100" height="45" rx="6" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
      <text x="470" y="312" fontSize="10" fontWeight="bold" fill="#22c55e" textAnchor="middle">10x Faster</text>
      <text x="470" y="326" fontSize="9" fill="#86efac" textAnchor="middle">vs Sequential</text>
    </g>

    <g>
      <rect x="540" y="290" width="100" height="45" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
      <text x="590" y="312" fontSize="10" fontWeight="bold" fill="#3b82f6" textAnchor="middle">Auto-Scale</text>
      <text x="590" y="326" fontSize="9" fill="#93c5fd" textAnchor="middle">Based on Queue</text>
    </g>

    <g>
      <rect x="660" y="290" width="100" height="45" rx="6" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" />
      <text x="710" y="312" fontSize="10" fontWeight="bold" fill="#a855f7" textAnchor="middle">5-30 min</text>
      <text x="710" y="326" fontSize="9" fill="#d8b4fe" textAnchor="middle">Per Video</text>
    </g>

    <g>
      <rect x="780" y="290" width="100" height="45" rx="6" fill="#ec4899" fillOpacity="0.2" stroke="#ec4899" />
      <text x="830" y="312" fontSize="10" fontWeight="bold" fill="#ec4899" textAnchor="middle">720K hrs/day</text>
      <text x="830" y="326" fontSize="9" fill="#f9a8d4" textAnchor="middle">Processed</text>
    </g>

    {/* Bottom Stats Bar */}
    <rect x="30" y="380" width="850" height="50" rx="8" fill="#dc2626" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1" />
    <text x="455" y="405" fontSize="11" fill="#fca5a5" textAnchor="middle">
      Input: MP4, AVI, MOV, MKV, WebM | Output: 8 resolutions x 3 codecs = 24 variants per video
    </text>
    <text x="455" y="420" fontSize="10" fill="#f87171" textAnchor="middle">
      Storage: ~10x original file size after multi-resolution encoding
    </text>
  </svg>
);

// 3. CDN Architecture Diagram
const CDNArchitectureDiagram = () => (
  <svg viewBox="0 0 900 500" className="w-full h-auto">
    <defs>
      <linearGradient id="cdnOriginGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cdnShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cdnEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cdnUserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="cdnArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
      </marker>
      <marker id="cdnArrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
      </marker>
    </defs>

    {/* Title */}
    <text x="450" y="25" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
      YouTube CDN Architecture - Global Video Distribution
    </text>

    {/* Origin Server */}
    <g>
      <rect x="380" y="50" width="140" height="90" rx="10" fill="url(#cdnOriginGrad)" stroke="#1d4ed8" strokeWidth="2" />
      <text x="450" y="75" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">ORIGIN</text>
      <text x="450" y="95" fontSize="10" fill="#dbeafe" textAnchor="middle">S3 / GCS</text>
      <text x="450" y="110" fontSize="10" fill="#dbeafe" textAnchor="middle">Master Storage</text>
      <text x="450" y="125" fontSize="10" fill="#bfdbfe" textAnchor="middle">Petabytes</text>
    </g>

    {/* Origin Shield Layer */}
    <rect x="200" y="170" width="500" height="70" rx="10" fill="url(#cdnShieldGrad)" stroke="#b45309" strokeWidth="2" />
    <text x="450" y="195" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">ORIGIN SHIELD (Regional Cache)</text>
    <text x="450" y="215" fontSize="10" fill="#fef3c7" textAnchor="middle">Reduces Origin Load | 6 Global Regions | Cache Miss Buffer</text>
    <text x="450" y="230" fontSize="9" fill="#fde68a" textAnchor="middle">US-East | US-West | Europe | Asia-Pacific | South America | Middle East</text>

    {/* Arrows from Origin to Shield */}
    <path d="M 450 140 L 450 170" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#cdnArrow)" />

    {/* Edge Servers Layer */}
    <text x="450" y="270" fontSize="14" fontWeight="bold" fill="#ef4444" textAnchor="middle">
      EDGE SERVERS (200+ Points of Presence)
    </text>

    {/* Edge server boxes - Row 1 */}
    <g>
      <rect x="30" y="290" width="110" height="70" rx="8" fill="url(#cdnEdgeGrad)" stroke="#b91c1c" strokeWidth="1" />
      <text x="85" y="315" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">New York</text>
      <text x="85" y="330" fontSize="9" fill="#fecaca" textAnchor="middle">Edge PoP</text>
      <text x="85" y="345" fontSize="9" fill="#fca5a5" textAnchor="middle">~5ms latency</text>
    </g>
    <g>
      <rect x="155" y="290" width="110" height="70" rx="8" fill="url(#cdnEdgeGrad)" stroke="#b91c1c" strokeWidth="1" />
      <text x="210" y="315" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">London</text>
      <text x="210" y="330" fontSize="9" fill="#fecaca" textAnchor="middle">Edge PoP</text>
      <text x="210" y="345" fontSize="9" fill="#fca5a5" textAnchor="middle">~8ms latency</text>
    </g>
    <g>
      <rect x="280" y="290" width="110" height="70" rx="8" fill="url(#cdnEdgeGrad)" stroke="#b91c1c" strokeWidth="1" />
      <text x="335" y="315" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Tokyo</text>
      <text x="335" y="330" fontSize="9" fill="#fecaca" textAnchor="middle">Edge PoP</text>
      <text x="335" y="345" fontSize="9" fill="#fca5a5" textAnchor="middle">~10ms latency</text>
    </g>
    <g>
      <rect x="405" y="290" width="110" height="70" rx="8" fill="url(#cdnEdgeGrad)" stroke="#b91c1c" strokeWidth="1" />
      <text x="460" y="315" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Sydney</text>
      <text x="460" y="330" fontSize="9" fill="#fecaca" textAnchor="middle">Edge PoP</text>
      <text x="460" y="345" fontSize="9" fill="#fca5a5" textAnchor="middle">~15ms latency</text>
    </g>
    <g>
      <rect x="530" y="290" width="110" height="70" rx="8" fill="url(#cdnEdgeGrad)" stroke="#b91c1c" strokeWidth="1" />
      <text x="585" y="315" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Sao Paulo</text>
      <text x="585" y="330" fontSize="9" fill="#fecaca" textAnchor="middle">Edge PoP</text>
      <text x="585" y="345" fontSize="9" fill="#fca5a5" textAnchor="middle">~12ms latency</text>
    </g>
    <g>
      <rect x="655" y="290" width="110" height="70" rx="8" fill="url(#cdnEdgeGrad)" stroke="#b91c1c" strokeWidth="1" />
      <text x="710" y="315" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Mumbai</text>
      <text x="710" y="330" fontSize="9" fill="#fecaca" textAnchor="middle">Edge PoP</text>
      <text x="710" y="345" fontSize="9" fill="#fca5a5" textAnchor="middle">~20ms latency</text>
    </g>
    <g>
      <rect x="780" y="290" width="100" height="70" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="1" />
      <text x="830" y="315" fontSize="11" fontWeight="bold" fill="#9ca3af" textAnchor="middle">+194 more</text>
      <text x="830" y="335" fontSize="9" fill="#6b7280" textAnchor="middle">worldwide</text>
    </g>

    {/* Arrows from Shield to Edge */}
    <path d="M 300 240 L 85 290" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
    <path d="M 350 240 L 210 290" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
    <path d="M 400 240 L 335 290" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
    <path d="M 500 240 L 460 290" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
    <path d="M 550 240 L 585 290" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
    <path d="M 600 240 L 710 290" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />

    {/* Users */}
    <text x="450" y="395" fontSize="14" fontWeight="bold" fill="#22c55e" textAnchor="middle">
      VIEWERS (2 Billion Users Globally)
    </text>

    {/* User icons */}
    <g>
      <circle cx="85" cy="440" r="25" fill="url(#cdnUserGrad)" stroke="#15803d" strokeWidth="2" />
      <text x="85" y="445" fontSize="20" textAnchor="middle">👤</text>
    </g>
    <g>
      <circle cx="210" cy="440" r="25" fill="url(#cdnUserGrad)" stroke="#15803d" strokeWidth="2" />
      <text x="210" y="445" fontSize="20" textAnchor="middle">👤</text>
    </g>
    <g>
      <circle cx="335" cy="440" r="25" fill="url(#cdnUserGrad)" stroke="#15803d" strokeWidth="2" />
      <text x="335" y="445" fontSize="20" textAnchor="middle">👤</text>
    </g>
    <g>
      <circle cx="460" cy="440" r="25" fill="url(#cdnUserGrad)" stroke="#15803d" strokeWidth="2" />
      <text x="460" y="445" fontSize="20" textAnchor="middle">👤</text>
    </g>
    <g>
      <circle cx="585" cy="440" r="25" fill="url(#cdnUserGrad)" stroke="#15803d" strokeWidth="2" />
      <text x="585" y="445" fontSize="20" textAnchor="middle">👤</text>
    </g>
    <g>
      <circle cx="710" cy="440" r="25" fill="url(#cdnUserGrad)" stroke="#15803d" strokeWidth="2" />
      <text x="710" y="445" fontSize="20" textAnchor="middle">👤</text>
    </g>
    <g>
      <circle cx="830" cy="440" r="25" fill="#374151" stroke="#4b5563" strokeWidth="2" />
      <text x="830" y="445" fontSize="14" fill="#9ca3af" textAnchor="middle">...</text>
    </g>

    {/* Arrows from Edge to Users */}
    <path d="M 85 360 L 85 415" stroke="#22c55e" strokeWidth="2" markerEnd="url(#cdnArrowGreen)" />
    <path d="M 210 360 L 210 415" stroke="#22c55e" strokeWidth="2" markerEnd="url(#cdnArrowGreen)" />
    <path d="M 335 360 L 335 415" stroke="#22c55e" strokeWidth="2" markerEnd="url(#cdnArrowGreen)" />
    <path d="M 460 360 L 460 415" stroke="#22c55e" strokeWidth="2" markerEnd="url(#cdnArrowGreen)" />
    <path d="M 585 360 L 585 415" stroke="#22c55e" strokeWidth="2" markerEnd="url(#cdnArrowGreen)" />
    <path d="M 710 360 L 710 415" stroke="#22c55e" strokeWidth="2" markerEnd="url(#cdnArrowGreen)" />

    {/* Stats at bottom */}
    <rect x="200" y="475" width="500" height="20" rx="4" fill="#dc2626" fillOpacity="0.2" />
    <text x="450" y="489" fontSize="10" fill="#fca5a5" textAnchor="middle">{`
      Cache Hit Rate: 95% | Bandwidth: 100+ Tbps | Video Start Time: &lt;2s | Pre-warming for Viral Content
    `}</text>
  </svg>
);

// 4. Recommendation System ML Pipeline Diagram
const RecommendationSystemDiagram = () => (
  <svg viewBox="0 0 900 480" className="w-full h-auto">
    <defs>
      <linearGradient id="recDataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="recFeatureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="recModelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="recRankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="recServeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="recArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
      </marker>
    </defs>

    {/* Title */}
    <text x="450" y="25" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
      YouTube Recommendation System - ML Pipeline
    </text>

    {/* Data Sources */}
    <text x="100" y="55" fontSize="12" fontWeight="bold" fill="#3b82f6" textAnchor="middle">DATA SOURCES</text>

    <g>
      <rect x="30" y="70" width="140" height="50" rx="6" fill="url(#recDataGrad)" stroke="#1d4ed8" strokeWidth="1" />
      <text x="100" y="92" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">Watch History</text>
      <text x="100" y="107" fontSize="9" fill="#dbeafe" textAnchor="middle">Views, Duration, Skip</text>
    </g>
    <g>
      <rect x="30" y="130" width="140" height="50" rx="6" fill="url(#recDataGrad)" stroke="#1d4ed8" strokeWidth="1" />
      <text x="100" y="152" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">User Interactions</text>
      <text x="100" y="167" fontSize="9" fill="#dbeafe" textAnchor="middle">Likes, Comments, Shares</text>
    </g>
    <g>
      <rect x="30" y="190" width="140" height="50" rx="6" fill="url(#recDataGrad)" stroke="#1d4ed8" strokeWidth="1" />
      <text x="100" y="212" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">Video Metadata</text>
      <text x="100" y="227" fontSize="9" fill="#dbeafe" textAnchor="middle">Title, Tags, Category</text>
    </g>
    <g>
      <rect x="30" y="250" width="140" height="50" rx="6" fill="url(#recDataGrad)" stroke="#1d4ed8" strokeWidth="1" />
      <text x="100" y="272" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">User Profile</text>
      <text x="100" y="287" fontSize="9" fill="#dbeafe" textAnchor="middle">Demographics, Prefs</text>
    </g>

    {/* Arrow from Data to Features */}
    <path d="M 170 180 L 210 180" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#recArrow)" />

    {/* Feature Engineering */}
    <g>
      <rect x="220" y="80" width="160" height="200" rx="8" fill="url(#recFeatureGrad)" stroke="#6d28d9" strokeWidth="2" />
      <text x="300" y="105" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">FEATURE</text>
      <text x="300" y="120" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">ENGINEERING</text>
      <line x1="235" y1="130" x2="365" y2="130" stroke="white" strokeOpacity="0.3" />
      <text x="300" y="150" fontSize="9" fill="#ede9fe" textAnchor="middle">User Embeddings</text>
      <text x="300" y="168" fontSize="9" fill="#ede9fe" textAnchor="middle">Video Embeddings</text>
      <text x="300" y="186" fontSize="9" fill="#ede9fe" textAnchor="middle">Context Features</text>
      <text x="300" y="204" fontSize="9" fill="#ede9fe" textAnchor="middle">Co-watch Patterns</text>
      <text x="300" y="222" fontSize="9" fill="#ede9fe" textAnchor="middle">Time Decay</text>
      <text x="300" y="240" fontSize="9" fill="#ede9fe" textAnchor="middle">Device/Location</text>
      <text x="300" y="260" fontSize="9" fill="#ddd6fe" textAnchor="middle">TensorFlow</text>
    </g>

    {/* Arrow from Features to Model */}
    <path d="M 380 180 L 420 180" stroke="#ef4444" strokeWidth="2" markerEnd="url(#recArrow)" />

    {/* ML Model */}
    <g>
      <rect x="430" y="60" width="180" height="240" rx="8" fill="url(#recModelGrad)" stroke="#b91c1c" strokeWidth="2" />
      <text x="520" y="85" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">ML MODEL</text>
      <line x1="445" y1="95" x2="595" y2="95" stroke="white" strokeOpacity="0.3" />

      <rect x="445" y="105" width="150" height="35" rx="4" fill="#1f2937" stroke="#374151" />
      <text x="520" y="120" fontSize="9" fontWeight="bold" fill="#fca5a5" textAnchor="middle">Candidate Generation</text>
      <text x="520" y="133" fontSize="8" fill="#9ca3af" textAnchor="middle">Deep Neural Network</text>

      <path d="M 520 140 L 520 150" stroke="#6b7280" strokeWidth="1" />

      <rect x="445" y="150" width="150" height="35" rx="4" fill="#1f2937" stroke="#374151" />
      <text x="520" y="165" fontSize="9" fontWeight="bold" fill="#fca5a5" textAnchor="middle">Ranking Model</text>
      <text x="520" y="178" fontSize="8" fill="#9ca3af" textAnchor="middle">{`Wide & Deep Learning`}</text>

      <path d="M 520 185 L 520 195" stroke="#6b7280" strokeWidth="1" />

      <rect x="445" y="195" width="150" height="35" rx="4" fill="#1f2937" stroke="#374151" />
      <text x="520" y="210" fontSize="9" fontWeight="bold" fill="#fca5a5" textAnchor="middle">Re-ranking Layer</text>
      <text x="520" y="223" fontSize="8" fill="#9ca3af" textAnchor="middle">{`Diversity & Freshness`}</text>

      <text x="520" y="255" fontSize="9" fill="#fecaca" textAnchor="middle">Millions of Parameters</text>
      <text x="520" y="270" fontSize="9" fill="#fecaca" textAnchor="middle">Billions of Examples</text>
      <text x="520" y="285" fontSize="9" fill="#fca5a5" textAnchor="middle">TensorFlow Serving</text>
    </g>

    {/* Arrow from Model to Ranking */}
    <path d="M 610 180 L 640 180" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#recArrow)" />

    {/* Ranking & Filtering */}
    <g>
      <rect x="650" y="100" width="130" height="160" rx="8" fill="url(#recRankGrad)" stroke="#b45309" strokeWidth="2" />
      <text x="715" y="125" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">RANKING</text>
      <line x1="665" y1="135" x2="765" y2="135" stroke="white" strokeOpacity="0.3" />
      <text x="715" y="155" fontSize="9" fill="#fef3c7" textAnchor="middle">Relevance Score</text>
      <text x="715" y="172" fontSize="9" fill="#fef3c7" textAnchor="middle">Quality Filters</text>
      <text x="715" y="189" fontSize="9" fill="#fef3c7" textAnchor="middle">Policy Checks</text>
      <text x="715" y="206" fontSize="9" fill="#fef3c7" textAnchor="middle">A/B Testing</text>
      <text x="715" y="223" fontSize="9" fill="#fef3c7" textAnchor="middle">Personalization</text>
      <text x="715" y="243" fontSize="9" fill="#fde68a" textAnchor="middle">&lt;100ms latency</text>
    </g>

    {/* Arrow from Ranking to Serve */}
    <path d="M 780 180 L 810 180" stroke="#22c55e" strokeWidth="2" markerEnd="url(#recArrow)" />

    {/* Serve */}
    <g>
      <rect x="820" y="120" width="70" height="120" rx="8" fill="url(#recServeGrad)" stroke="#15803d" strokeWidth="2" />
      <text x="855" y="150" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">SERVE</text>
      <line x1="830" y1="160" x2="880" y2="160" stroke="white" strokeOpacity="0.3" />
      <text x="855" y="180" fontSize="9" fill="#dcfce7" textAnchor="middle">Home</text>
      <text x="855" y="195" fontSize="9" fill="#dcfce7" textAnchor="middle">Up Next</text>
      <text x="855" y="210" fontSize="9" fill="#dcfce7" textAnchor="middle">Search</text>
      <text x="855" y="225" fontSize="9" fill="#dcfce7" textAnchor="middle">Trending</text>
    </g>

    {/* Feedback Loop */}
    <rect x="200" y="330" width="600" height="60" rx="8" fill="#1f2937" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,3" />
    <text x="500" y="355" fontSize="11" fontWeight="bold" fill="#ef4444" textAnchor="middle">
      FEEDBACK LOOP - Continuous Learning
    </text>
    <text x="500" y="375" fontSize="9" fill="#fca5a5" textAnchor="middle">
      User clicks, watch time, skips, likes → Real-time feature updates → Model retraining (daily/weekly)
    </text>

    {/* Arrow for feedback */}
    <path d="M 855 240 L 855 360 L 800 360" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
    <path d="M 200 360 L 100 360 L 100 300" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />

    {/* Bottom Stats */}
    <rect x="100" y="420" width="700" height="50" rx="8" fill="#dc2626" fillOpacity="0.15" stroke="#ef4444" />
    <text x="450" y="442" fontSize="10" fill="#fca5a5" textAnchor="middle">
      Scale: 2B users | 800M videos indexed | Billions of predictions/day | 70% of watch time from recommendations
    </text>
    <text x="450" y="458" fontSize="9" fill="#f87171" textAnchor="middle">
      Objectives: Maximize watch time + user satisfaction | Minimize harmful content | Balance freshness vs relevance
    </text>
  </svg>
);

// 5. Live Streaming Diagram
const LiveStreamingDiagram = () => (
  <svg viewBox="0 0 900 420" className="w-full h-auto">
    <defs>
      <linearGradient id="lsCreatorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="lsIngestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="lsTranscodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#eab308', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ca8a04', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="lsPackageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="lsCdnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="lsViewerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="lsArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
      </marker>
    </defs>

    {/* Title */}
    <text x="450" y="25" fontSize="18" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
      YouTube Live Streaming - Real-Time Video Distribution
    </text>

    {/* Main Pipeline */}
    <text x="450" y="55" fontSize="12" fill="#9ca3af" textAnchor="middle">
      Ultra-Low Latency: 3-10 seconds end-to-end
    </text>

    {/* Creator/Broadcaster */}
    <g>
      <rect x="30" y="80" width="120" height="110" rx="10" fill="url(#lsCreatorGrad)" stroke="#b91c1c" strokeWidth="2" />
      <text x="90" y="105" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">CREATOR</text>
      <line x1="40" y1="115" x2="140" y2="115" stroke="white" strokeOpacity="0.3" />
      <text x="90" y="135" fontSize="9" fill="#fecaca" textAnchor="middle">Camera/Encoder</text>
      <text x="90" y="150" fontSize="9" fill="#fecaca" textAnchor="middle">RTMP Push</text>
      <text x="90" y="165" fontSize="9" fill="#fecaca" textAnchor="middle">OBS/Wirecast</text>
      <text x="90" y="180" fontSize="9" fill="#fca5a5" textAnchor="middle">1080p60</text>
    </g>

    {/* Arrow */}
    <path d="M 150 135 L 175 135" stroke="#f97316" strokeWidth="3" markerEnd="url(#lsArrow)" />
    <text x="162" y="125" fontSize="8" fill="#fdba74" textAnchor="middle">RTMP</text>

    {/* Ingest Servers */}
    <g>
      <rect x="180" y="80" width="130" height="110" rx="10" fill="url(#lsIngestGrad)" stroke="#c2410c" strokeWidth="2" />
      <text x="245" y="105" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">INGEST</text>
      <line x1="190" y1="115" x2="300" y2="115" stroke="white" strokeOpacity="0.3" />
      <text x="245" y="135" fontSize="9" fill="#fed7aa" textAnchor="middle">RTMP Servers</text>
      <text x="245" y="150" fontSize="9" fill="#fed7aa" textAnchor="middle">Global PoPs</text>
      <text x="245" y="165" fontSize="9" fill="#fed7aa" textAnchor="middle">{`Auth & Validate`}</text>
      <text x="245" y="180" fontSize="9" fill="#fdba74" textAnchor="middle">Nearest Edge</text>
    </g>

    {/* Arrow */}
    <path d="M 310 135 L 335 135" stroke="#eab308" strokeWidth="3" markerEnd="url(#lsArrow)" />

    {/* Real-Time Transcoding */}
    <g>
      <rect x="340" y="80" width="140" height="110" rx="10" fill="url(#lsTranscodeGrad)" stroke="#a16207" strokeWidth="2" />
      <text x="410" y="105" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">TRANSCODE</text>
      <line x1="350" y1="115" x2="470" y2="115" stroke="white" strokeOpacity="0.3" />
      <text x="410" y="135" fontSize="9" fill="#fef9c3" textAnchor="middle">Real-Time Encode</text>
      <text x="410" y="150" fontSize="9" fill="#fef9c3" textAnchor="middle">ABR Ladders</text>
      <text x="410" y="165" fontSize="9" fill="#fef9c3" textAnchor="middle">GPU Accelerated</text>
      <text x="410" y="180" fontSize="9" fill="#fde047" textAnchor="middle">&lt;1s latency</text>
    </g>

    {/* Arrow */}
    <path d="M 480 135 L 505 135" stroke="#22c55e" strokeWidth="3" markerEnd="url(#lsArrow)" />

    {/* Packaging */}
    <g>
      <rect x="510" y="80" width="130" height="110" rx="10" fill="url(#lsPackageGrad)" stroke="#15803d" strokeWidth="2" />
      <text x="575" y="105" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">PACKAGE</text>
      <line x1="520" y1="115" x2="630" y2="115" stroke="white" strokeOpacity="0.3" />
      <text x="575" y="135" fontSize="9" fill="#dcfce7" textAnchor="middle">LL-HLS Segments</text>
      <text x="575" y="150" fontSize="9" fill="#dcfce7" textAnchor="middle">2-4s Chunks</text>
      <text x="575" y="165" fontSize="9" fill="#dcfce7" textAnchor="middle">Manifest Update</text>
      <text x="575" y="180" fontSize="9" fill="#86efac" textAnchor="middle">Instant</text>
    </g>

    {/* Arrow */}
    <path d="M 640 135 L 665 135" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#lsArrow)" />

    {/* CDN */}
    <g>
      <rect x="670" y="80" width="110" height="110" rx="10" fill="url(#lsCdnGrad)" stroke="#1d4ed8" strokeWidth="2" />
      <text x="725" y="105" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">CDN</text>
      <line x1="680" y1="115" x2="770" y2="115" stroke="white" strokeOpacity="0.3" />
      <text x="725" y="135" fontSize="9" fill="#dbeafe" textAnchor="middle">Edge Cache</text>
      <text x="725" y="150" fontSize="9" fill="#dbeafe" textAnchor="middle">Push Updates</text>
      <text x="725" y="165" fontSize="9" fill="#dbeafe" textAnchor="middle">Global Fanout</text>
      <text x="725" y="180" fontSize="9" fill="#93c5fd" textAnchor="middle">200+ PoPs</text>
    </g>

    {/* Arrow */}
    <path d="M 780 135 L 805 135" stroke="#a855f7" strokeWidth="3" markerEnd="url(#lsArrow)" />

    {/* Viewers */}
    <g>
      <rect x="810" y="80" width="80" height="110" rx="10" fill="url(#lsViewerGrad)" stroke="#7c3aed" strokeWidth="2" />
      <text x="850" y="105" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">VIEWERS</text>
      <line x1="820" y1="115" x2="880" y2="115" stroke="white" strokeOpacity="0.3" />
      <text x="850" y="135" fontSize="9" fill="#e9d5ff" textAnchor="middle">HLS Player</text>
      <text x="850" y="150" fontSize="9" fill="#e9d5ff" textAnchor="middle">ABR Switch</text>
      <text x="850" y="165" fontSize="9" fill="#e9d5ff" textAnchor="middle">Buffer</text>
      <text x="850" y="180" fontSize="9" fill="#d8b4fe" textAnchor="middle">Millions</text>
    </g>

    {/* Live Chat Section */}
    <rect x="30" y="220" width="400" height="90" rx="10" fill="#1f2937" stroke="#ef4444" strokeWidth="2" />
    <text x="230" y="245" fontSize="12" fontWeight="bold" fill="#ef4444" textAnchor="middle">{`LIVE CHAT & INTERACTIONS`}</text>
    <line x1="45" y1="255" x2="415" y2="255" stroke="#374151" />

    <g>
      <rect x="50" y="265" width="110" height="35" rx="4" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
      <text x="105" y="285" fontSize="9" fontWeight="bold" fill="#ef4444" textAnchor="middle">WebSocket</text>
      <text x="105" y="295" fontSize="8" fill="#fca5a5" textAnchor="middle">Real-time msgs</text>
    </g>
    <g>
      <rect x="170" y="265" width="110" height="35" rx="4" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
      <text x="225" y="285" fontSize="9" fontWeight="bold" fill="#f59e0b" textAnchor="middle">Super Chat</text>
      <text x="225" y="295" fontSize="8" fill="#fcd34d" textAnchor="middle">Paid highlights</text>
    </g>
    <g>
      <rect x="290" y="265" width="110" height="35" rx="4" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
      <text x="345" y="285" fontSize="9" fontWeight="bold" fill="#22c55e" textAnchor="middle">{`Polls/Q&A`}</text>
      <text x="345" y="295" fontSize="8" fill="#86efac" textAnchor="middle">Engagement</text>
    </g>

    {/* DVR/Recording Section */}
    <rect x="450" y="220" width="440" height="90" rx="10" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" />
    <text x="670" y="245" fontSize="12" fontWeight="bold" fill="#3b82f6" textAnchor="middle">{`DVR & RECORDING`}</text>
    <line x1="465" y1="255" x2="875" y2="255" stroke="#374151" />

    <g>
      <rect x="470" y="265" width="120" height="35" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
      <text x="530" y="285" fontSize="9" fontWeight="bold" fill="#3b82f6" textAnchor="middle">Live Rewind</text>
      <text x="530" y="295" fontSize="8" fill="#93c5fd" textAnchor="middle">4-hour buffer</text>
    </g>
    <g>
      <rect x="600" y="265" width="120" height="35" rx="4" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" />
      <text x="660" y="285" fontSize="9" fontWeight="bold" fill="#a855f7" textAnchor="middle">VOD Archive</text>
      <text x="660" y="295" fontSize="8" fill="#d8b4fe" textAnchor="middle">Auto-save</text>
    </g>
    <g>
      <rect x="730" y="265" width="140" height="35" rx="4" fill="#ec4899" fillOpacity="0.2" stroke="#ec4899" />
      <text x="800" y="285" fontSize="9" fontWeight="bold" fill="#ec4899" textAnchor="middle">Highlights/Clips</text>
      <text x="800" y="295" fontSize="8" fill="#f9a8d4" textAnchor="middle">Creator tools</text>
    </g>

    {/* Bottom Stats */}
    <rect x="30" y="340" width="860" height="70" rx="10" fill="#dc2626" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1" />
    <text x="450" y="365" fontSize="11" fontWeight="bold" fill="#ef4444" textAnchor="middle">
      LIVE STREAMING SCALE
    </text>
    <text x="225" y="385" fontSize="10" fill="#fca5a5" textAnchor="middle">Peak Concurrent: 10M+ viewers</text>
    <text x="450" y="385" fontSize="10" fill="#fca5a5" textAnchor="middle">Latency: 3-10s (Ultra-Low)</text>
    <text x="675" y="385" fontSize="10" fill="#fca5a5" textAnchor="middle">Chat: 100K+ msgs/sec</text>
    <text x="450" y="400" fontSize="9" fill="#f87171" textAnchor="middle">
      Protocols: RTMP ingest | LL-HLS/LL-DASH delivery | WebSocket chat | QUIC for optimization
    </text>
  </svg>
);

export default function YouTube({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              ▶️ YouTube System Design
            </h1>
            <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-lg text-xs font-bold uppercase tracking-wide">
              Video Streaming
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Scalable video streaming platform · 2 billion users · 500 hours uploaded/min · Global CDN delivery
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg text-sm font-medium border border-red-700">Video Transcoding</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-400 rounded-lg text-sm font-medium border border-blue-700">CDN Distribution</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-400 rounded-lg text-sm font-medium border border-green-700">Recommendation Engine</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-400 rounded-lg text-sm font-medium border border-purple-700">Adaptive Streaming</span>
            <span className="px-4 py-2 bg-orange-900/30 text-orange-400 rounded-lg text-sm font-medium border border-orange-700">Real-Time Analytics</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu} />

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
                color: activeTab === tab.id ? '#f87171' : '#9ca3af',
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
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-2xl p-6 border-2 border-red-700 shadow-lg">
              <h2 className="text-2xl font-bold text-red-400 mb-4">System Overview</h2>
              <p className="text-red-300 leading-relaxed">
                Design a video streaming platform like YouTube that handles video upload, transcoding, storage,
                delivery via CDN, recommendations, search, comments, and analytics at massive scale. The system
                must support billions of users, millions of concurrent viewers, and petabytes of video content
                with low latency streaming worldwide.
              </p>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Functional & Non-Functional Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Functional Requirements */}
                <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl p-6 border-2 border-green-700 shadow-sm">
                  <h3 className="text-xl font-bold text-green-400 mb-4">✅ Functional Requirements</h3>
                  <ul className="space-y-2 text-green-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Upload videos (various formats, sizes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Stream videos with adaptive bitrate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Search videos by title, tags, description</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Video recommendations (personalized feed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Like, comment, subscribe, share</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>View count, analytics for creators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Live streaming support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Playlists, channels, subscriptions</span>
                    </li>
                  </ul>
                </div>

                {/* Non-Functional Requirements */}
                <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 rounded-2xl p-6 border-2 border-orange-700 shadow-sm">
                  <h3 className="text-xl font-bold text-orange-400 mb-4">⚡ Non-Functional Requirements</h3>
                  <ul className="space-y-2 text-orange-300">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Availability:</strong> 99.99% uptime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Latency:</strong> Video start &lt; 2 seconds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Scale:</strong> 2B users, 1B hours watched/day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Upload:</strong> 500 hours of video/minute</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Storage:</strong> Petabytes of video data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Bandwidth:</strong> Global CDN distribution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Reliability:</strong> No video loss during upload</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* High-Level Architecture */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">High-Level Architecture</h2>
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <svg viewBox="0 0 1200 800" className="w-full h-auto">
                  <defs>
                    <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="uploadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="cdnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="storageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
                    </linearGradient>
                    <marker id="arrowYT" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#6b7280" />
                    </marker>
                  </defs>

                  {/* Title */}
                  <text x="600" y="30" fontSize="22" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
                    YouTube System Architecture
                  </text>

                  {/* Users */}
                  <g>
                    <rect x="50" y="80" width="140" height="80" fill="url(#userGrad)" stroke="#2563eb" strokeWidth="2" rx="8" />
                    <text x="120" y="110" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Content Creator</text>
                    <text x="120" y="130" fontSize="12" fill="white" textAnchor="middle">Upload Videos</text>
                    <text x="120" y="145" fontSize="11" fill="#dbeafe" textAnchor="middle">Web/Mobile</text>
                  </g>

                  <g>
                    <rect x="230" y="80" width="140" height="80" fill="url(#userGrad)" stroke="#2563eb" strokeWidth="2" rx="8" />
                    <text x="300" y="110" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Viewer</text>
                    <text x="300" y="130" fontSize="12" fill="white" textAnchor="middle">Watch Videos</text>
                    <text x="300" y="145" fontSize="11" fill="#dbeafe" textAnchor="middle">Streaming</text>
                  </g>

                  {/* API Gateway */}
                  <rect x="150" y="210" width="150" height="60" fill="url(#apiGrad)" stroke="#7c3aed" strokeWidth="2" rx="6" />
                  <text x="225" y="235" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">API Gateway</text>
                  <text x="225" y="253" fontSize="11" fill="#ede9fe" textAnchor="middle">Load Balancer</text>

                  {/* Upload Service */}
                  <g>
                    <rect x="50" y="320" width="160" height="100" fill="url(#uploadGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="130" y="345" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Upload Service</text>
                    <line x1="60" y1="355" x2="200" y2="355" stroke="white" strokeWidth="1" opacity="0.5" />
                    <text x="130" y="375" fontSize="11" fill="white" textAnchor="middle">• Chunked Upload</text>
                    <text x="130" y="392" fontSize="11" fill="white" textAnchor="middle">• Resume Support</text>
                    <text x="130" y="409" fontSize="11" fill="white" textAnchor="middle">• Metadata Extract</text>
                  </g>

                  {/* Transcoding Service */}
                  <g>
                    <rect x="240" y="320" width="160" height="100" fill="url(#uploadGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="320" y="345" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Transcoding</text>
                    <line x1="250" y1="355" x2="390" y2="355" stroke="white" strokeWidth="1" opacity="0.5" />
                    <text x="320" y="375" fontSize="11" fill="white" textAnchor="middle">• Multiple Resolutions</text>
                    <text x="320" y="392" fontSize="11" fill="white" textAnchor="middle">• H.264/VP9/AV1</text>
                    <text x="320" y="409" fontSize="11" fill="white" textAnchor="middle">• Thumbnail Gen</text>
                  </g>

                  {/* Streaming Service */}
                  <g>
                    <rect x="430" y="320" width="160" height="100" fill="url(#uploadGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="510" y="345" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Streaming Service</text>
                    <line x1="440" y1="355" x2="580" y2="355" stroke="white" strokeWidth="1" opacity="0.5" />
                    <text x="510" y="375" fontSize="11" fill="white" textAnchor="middle">• Adaptive Bitrate</text>
                    <text x="510" y="392" fontSize="11" fill="white" textAnchor="middle">• HLS/DASH</text>
                    <text x="510" y="409" fontSize="11" fill="white" textAnchor="middle">• Quality Selection</text>
                  </g>

                  {/* Recommendation Service */}
                  <g>
                    <rect x="620" y="320" width="160" height="100" fill="url(#uploadGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="700" y="345" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Recommendation</text>
                    <line x1="630" y1="355" x2="770" y2="355" stroke="white" strokeWidth="1" opacity="0.5" />
                    <text x="700" y="375" fontSize="11" fill="white" textAnchor="middle">• ML Model</text>
                    <text x="700" y="392" fontSize="11" fill="white" textAnchor="middle">• User Preferences</text>
                    <text x="700" y="409" fontSize="11" fill="white" textAnchor="middle">• Trending Videos</text>
                  </g>

                  {/* Search Service */}
                  <g>
                    <rect x="810" y="320" width="160" height="100" fill="url(#uploadGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="890" y="345" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Search Service</text>
                    <line x1="820" y1="355" x2="960" y2="355" stroke="white" strokeWidth="1" opacity="0.5" />
                    <text x="890" y="375" fontSize="11" fill="white" textAnchor="middle">• Elasticsearch</text>
                    <text x="890" y="392" fontSize="11" fill="white" textAnchor="middle">• Full-Text Search</text>
                    <text x="890" y="409" fontSize="11" fill="white" textAnchor="middle">• Auto-Complete</text>
                  </g>

                  {/* CDN */}
                  <rect x="1000" y="80" width="150" height="340" fill="url(#cdnGrad)" stroke="#dc2626" strokeWidth="2" rx="6" />
                  <text x="1075" y="110" fontSize="15" fontWeight="bold" fill="white" textAnchor="middle">CDN</text>
                  <text x="1075" y="130" fontSize="12" fill="white" textAnchor="middle">(Global)</text>
                  <line x1="1010" y1="140" x2="1140" y2="140" stroke="white" strokeWidth="1" />
                  <text x="1075" y="165" fontSize="11" fill="white" textAnchor="middle">Edge Locations:</text>
                  <text x="1075" y="185" fontSize="11" fill="#fecaca" textAnchor="middle">• North America</text>
                  <text x="1075" y="203" fontSize="11" fill="#fecaca" textAnchor="middle">• Europe</text>
                  <text x="1075" y="221" fontSize="11" fill="#fecaca" textAnchor="middle">• Asia Pacific</text>
                  <text x="1075" y="239" fontSize="11" fill="#fecaca" textAnchor="middle">• South America</text>
                  <text x="1075" y="257" fontSize="11" fill="#fecaca" textAnchor="middle">• Africa</text>
                  <line x1="1010" y1="270" x2="1140" y2="270" stroke="white" strokeWidth="1" />
                  <text x="1075" y="290" fontSize="11" fill="white" textAnchor="middle">Cache Hit Rate:</text>
                  <text x="1075" y="308" fontSize="13" fontWeight="bold" fill="#fef3c7" textAnchor="middle">~95%</text>
                  <text x="1075" y="335" fontSize="11" fill="white" textAnchor="middle">Bandwidth:</text>
                  <text x="1075" y="353" fontSize="13" fontWeight="bold" fill="#fef3c7" textAnchor="middle">100+ Tbps</text>
                  <text x="1075" y="380" fontSize="10" fill="#fecaca" textAnchor="middle">CloudFlare/Akamai</text>
                  <text x="1075" y="395" fontSize="10" fill="#fecaca" textAnchor="middle">AWS CloudFront</text>

                  {/* Storage Layer */}
                  <text x="400" y="490" fontSize="16" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">{`Storage & Database Layer`}</text>

                  <g>
                    <rect x="50" y="510" width="180" height="80" fill="url(#storageGrad)" stroke="#d97706" strokeWidth="2" rx="6" />
                    <text x="140" y="535" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Object Storage</text>
                    <text x="140" y="555" fontSize="12" fill="white" textAnchor="middle">S3 / Google Cloud</text>
                    <text x="140" y="572" fontSize="11" fill="#fef3c7" textAnchor="middle">Videos (Raw/Encoded)</text>
                  </g>

                  <g>
                    <rect x="260" y="510" width="180" height="80" fill="url(#storageGrad)" stroke="#d97706" strokeWidth="2" rx="6" />
                    <text x="350" y="535" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Metadata DB</text>
                    <text x="350" y="555" fontSize="12" fill="white" textAnchor="middle">PostgreSQL/Cassandra</text>
                    <text x="350" y="572" fontSize="11" fill="#fef3c7" textAnchor="middle">Title, Tags, Views</text>
                  </g>

                  <g>
                    <rect x="470" y="510" width="180" height="80" fill="url(#storageGrad)" stroke="#d97706" strokeWidth="2" rx="6" />
                    <text x="560" y="535" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Redis Cache</text>
                    <text x="560" y="555" fontSize="12" fill="white" textAnchor="middle">In-Memory</text>
                    <text x="560" y="572" fontSize="11" fill="#fef3c7" textAnchor="middle">Hot Videos, Sessions</text>
                  </g>

                  <g>
                    <rect x="680" y="510" width="180" height="80" fill="url(#storageGrad)" stroke="#d97706" strokeWidth="2" rx="6" />
                    <text x="770" y="535" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Analytics DB</text>
                    <text x="770" y="555" fontSize="12" fill="white" textAnchor="middle">BigQuery/Hadoop</text>
                    <text x="770" y="572" fontSize="11" fill="#fef3c7" textAnchor="middle">Views, Engagement</text>
                  </g>

                  {/* Message Queue */}
                  <rect x="320" y="640" width="200" height="80" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="6" />
                  <text x="420" y="665" fontSize="14" fontWeight="bold" fill="#78350f" textAnchor="middle">Message Queue</text>
                  <text x="420" y="685" fontSize="12" fill="#78350f" textAnchor="middle">Kafka / RabbitMQ</text>
                  <text x="420" y="703" fontSize="11" fill="#78350f" textAnchor="middle">Events, Notifications</text>

                  {/* Arrows */}
                  <path d="M 120 160 L 200 210" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                  <path d="M 300 160 L 250 210" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />

                  <path d="M 180 270 L 130 320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                  <path d="M 225 270 L 320 320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                  <path d="M 270 270 L 510 320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />

                  <path d="M 590 370 L 1000 240" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" />

                  <path d="M 130 420 L 130 510" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                  <path d="M 320 420 L 350 510" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                  <path d="M 510 420 L 560 510" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />

                  <path d="M 320 590 L 380 640" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                </svg>
              </div>
            </div>

            {/* Pipeline Flow Diagram */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Pipeline Flow: Upload to Playback</h2>
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <YouTubeArchitectureDiagram />
              </div>
            </div>
          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Core Components Deep Dive</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload Service */}
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl p-6 border-2 border-green-700 shadow-sm">
                <h3 className="text-xl font-bold text-green-400 mb-4">📤 Upload Service</h3>
                <ul className="space-y-3 text-green-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 font-bold">•</span>
                    <span><strong>Chunked Upload:</strong> Split large files into 10MB chunks for reliability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 font-bold">•</span>
                    <span><strong>Resume Support:</strong> Continue failed uploads from last chunk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 font-bold">•</span>
                    <span><strong>Metadata Extraction:</strong> Duration, resolution, codec, bitrate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 font-bold">•</span>
                    <span><strong>Virus Scan:</strong> Check for malware before processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 font-bold">•</span>
                    <span><strong>Duplicate Detection:</strong> Hash-based deduplication</span>
                  </li>
                </ul>
              </div>

              {/* Transcoding Service */}
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl p-6 border-2 border-blue-700 shadow-sm">
                <h3 className="text-xl font-bold text-blue-400 mb-4">🎬 Transcoding Service</h3>
                <ul className="space-y-3 text-blue-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 font-bold">•</span>
                    <span><strong>Multiple Resolutions:</strong> 144p, 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 font-bold">•</span>
                    <span><strong>Codecs:</strong> H.264 (compatibility), VP9/AV1 (efficiency)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 font-bold">•</span>
                    <span><strong>FFmpeg:</strong> Industry-standard transcoding tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 font-bold">•</span>
                    <span><strong>Thumbnail Generation:</strong> Extract keyframes at intervals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 font-bold">•</span>
                    <span><strong>Queue-Based:</strong> Kafka message queue for async processing</span>
                  </li>
                </ul>
              </div>

              {/* CDN */}
              <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-2xl p-6 border-2 border-red-700 shadow-sm">
                <h3 className="text-xl font-bold text-red-400 mb-4">🌐 CDN (Content Delivery Network)</h3>
                <ul className="space-y-3 text-red-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 font-bold">•</span>
                    <span><strong>Edge Locations:</strong> 200+ PoPs worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 font-bold">•</span>
                    <span><strong>Cache Strategy:</strong> Popular videos cached at edge, cold in origin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 font-bold">•</span>
                    <span><strong>Geo-Routing:</strong> Route users to nearest edge server</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 font-bold">•</span>
                    <span><strong>Bandwidth:</strong> 100+ Tbps global capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 font-bold">•</span>
                    <span><strong>Origin Shield:</strong> Protect origin from cache misses</span>
                  </li>
                </ul>
              </div>

              {/* Adaptive Streaming */}
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-2xl p-6 border-2 border-purple-700 shadow-sm">
                <h3 className="text-xl font-bold text-purple-400 mb-4">📊 Adaptive Bitrate Streaming</h3>
                <ul className="space-y-3 text-purple-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1 font-bold">•</span>
                    <span><strong>HLS (HTTP Live Streaming):</strong> Apple standard, .m3u8 playlist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1 font-bold">•</span>
                    <span><strong>DASH (MPEG-DASH):</strong> Open standard for streaming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1 font-bold">•</span>
                    <span><strong>Segment Size:</strong> 2-10 second video chunks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1 font-bold">•</span>
                    <span><strong>Quality Switch:</strong> Dynamic based on bandwidth/buffer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1 font-bold">•</span>
                    <span><strong>Buffer Management:</strong> Pre-load next segments to prevent stall</span>
                  </li>
                </ul>
              </div>

              {/* Recommendation Engine */}
              <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 rounded-2xl p-6 border-2 border-orange-700 shadow-sm">
                <h3 className="text-xl font-bold text-orange-400 mb-4">🤖 Recommendation Engine</h3>
                <ul className="space-y-3 text-orange-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 font-bold">•</span>
                    <span><strong>Collaborative Filtering:</strong> Users who watched X also watched Y</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 font-bold">•</span>
                    <span><strong>Content-Based:</strong> Similar videos based on metadata/tags</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 font-bold">•</span>
                    <span><strong>Deep Learning:</strong> Neural networks (TensorFlow) for predictions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 font-bold">•</span>
                    <span><strong>Real-Time:</strong> Update recommendations as user watches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 font-bold">•</span>
                    <span><strong>A/B Testing:</strong> Continuous model improvements</span>
                  </li>
                </ul>
              </div>

              {/* Search Service */}
              <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/30 rounded-2xl p-6 border-2 border-cyan-700 shadow-sm">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">🔍 Search Service</h3>
                <ul className="space-y-3 text-cyan-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1 font-bold">•</span>
                    <span><strong>Elasticsearch:</strong> Distributed full-text search engine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1 font-bold">•</span>
                    <span><strong>Indexing:</strong> Title, description, tags, captions, transcript</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1 font-bold">•</span>
                    <span><strong>Ranking:</strong> Relevance score + popularity + recency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1 font-bold">•</span>
                    <span><strong>Autocomplete:</strong> Prefix search with suggestions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1 font-bold">•</span>
                    <span><strong>Filters:</strong> Upload date, duration, quality, channel</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CDN Architecture Diagram */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">CDN Architecture Visualization</h2>
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <CDNArchitectureDiagram />
              </div>
            </div>

            {/* Recommendation System Diagram */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recommendation System ML Pipeline</h2>
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <RecommendationSystemDiagram />
              </div>
            </div>
          </div>
        )}

        {/* Data Flow Tab */}
        {activeTab === 'dataflow' && (
          <div className="space-y-8">
            {/* Upload Flow */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Data Flow: Video Upload & Processing</h2>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 border-2 border-gray-700 shadow-lg">
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                    <div className="font-bold text-green-400 mb-2">1. User Uploads Video</div>
                    <div className="text-gray-300 ml-4">↓ Creator selects video file (MP4, AVI, MOV, etc.)</div>
                    <div className="text-green-400 ml-4 mt-1">↓ Client splits file into 10MB chunks</div>
                    <div className="text-green-400 ml-4">↓ POST /api/upload with chunk + metadata</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="font-bold text-blue-400 mb-2">2. Upload Service Receives</div>
                    <div className="text-gray-300 ml-4">↓ Store chunks in temporary storage</div>
                    <div className="text-blue-400 ml-4">↓ Track upload progress (resume support)</div>
                    <div className="text-blue-400 ml-4">↓ When all chunks received → reassemble file</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500">
                    <div className="font-bold text-purple-400 mb-2">3. Store Original in S3</div>
                    <div className="text-gray-300 ml-4">↓ Upload raw video to S3 bucket (origin storage)</div>
                    <div className="text-purple-400 ml-4">↓ Path: s3://videos/raw/video_id_original.mp4</div>
                    <div className="text-purple-400 ml-4">↓ Extract metadata: duration, resolution, codec</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-orange-500">
                    <div className="font-bold text-orange-400 mb-2">4. Publish to Message Queue</div>
                    <div className="text-gray-300 ml-4">↓ Kafka topic: video_uploaded</div>
                    <div className="text-orange-400 ml-4">↓ Message: {`{ video_id, user_id, s3_path, metadata }`}</div>
                    <div className="text-orange-400 ml-4">↓ Transcoding workers subscribe to this topic</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-indigo-500">
                    <div className="font-bold text-indigo-400 mb-2">5. Transcoding Workers Process</div>
                    <div className="text-gray-300 ml-4">↓ Pull video from S3</div>
                    <div className="text-indigo-400 ml-4">↓ FFmpeg transcode to 8 resolutions (144p → 2160p)</div>
                    <div className="text-indigo-400 ml-4">↓ Generate thumbnails (every 10 seconds)</div>
                    <div className="text-indigo-400 ml-4">↓ Create HLS/DASH manifests (.m3u8)</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-pink-500">
                    <div className="font-bold text-pink-400 mb-2">6. Store Encoded Videos</div>
                    <div className="text-gray-300 ml-4">↓ Upload all versions to S3</div>
                    <div className="text-pink-400 ml-4">↓ s3://videos/encoded/video_id_720p.mp4</div>
                    <div className="text-pink-400 ml-4">↓ s3://videos/encoded/video_id_1080p.mp4</div>
                    <div className="text-pink-400 ml-4">↓ Update metadata DB with all URLs</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-red-500">
                    <div className="font-bold text-red-400 mb-2">7. Distribute to CDN</div>
                    <div className="text-gray-300 ml-4">↓ Pre-warm CDN cache for popular videos</div>
                    <div className="text-red-400 ml-4">↓ Push to edge locations globally</div>
                    <div className="text-red-400 ml-4">↓ Video now available for streaming worldwide</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-teal-500">
                    <div className="font-bold text-teal-400 mb-2">8. Index for Search</div>
                    <div className="text-gray-300 ml-4">↓ Extract: title, description, tags, captions</div>
                    <div className="text-teal-400 ml-4">↓ Index in Elasticsearch</div>
                    <div className="text-teal-400 ml-4">↓ Video now searchable and discoverable</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-lg text-white font-bold text-center mt-6">
                    Total Processing Time: 5-30 minutes (depends on video length and quality)
                  </div>
                </div>
              </div>
            </div>

            {/* Streaming Flow */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Data Flow: Video Streaming to Viewer</h2>
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl p-8 border-2 border-blue-700 shadow-lg">
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="font-bold text-blue-400 mb-2">1. User Clicks Video</div>
                    <div className="text-gray-300 ml-4">↓ GET /api/videos/video_id</div>
                    <div className="text-blue-400 ml-4">↓ Return: metadata, thumbnail, HLS manifest URL</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500">
                    <div className="font-bold text-purple-400 mb-2">2. Video Player Initializes</div>
                    <div className="text-gray-300 ml-4">↓ Load HLS manifest (.m3u8)</div>
                    <div className="text-purple-400 ml-4">↓ Manifest contains all quality variants</div>
                    <div className="text-purple-400 ml-4">↓ Player detects bandwidth → selects initial quality</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-red-500">
                    <div className="font-bold text-red-400 mb-2">3. Request Video Segments</div>
                    <div className="text-gray-300 ml-4">↓ GET cdn.youtube.com/video_id/720p/segment_0.ts</div>
                    <div className="text-red-400 ml-4">↓ CDN checks cache → HIT (95% of time)</div>
                    <div className="text-red-400 ml-4">↓ If MISS → fetch from origin S3</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                    <div className="font-bold text-green-400 mb-2">4. Adaptive Streaming</div>
                    <div className="text-gray-300 ml-4">↓ Player monitors: bandwidth, buffer level</div>
                    <div className="text-green-400 ml-4">↓ If bandwidth drops → switch to 480p</div>
                    <div className="text-green-400 ml-4">↓ If bandwidth improves → switch to 1080p</div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-orange-500">
                    <div className="font-bold text-orange-400 mb-2">5. Track Analytics</div>
                    <div className="text-gray-300 ml-4">↓ Send events: play, pause, seek, quality_change</div>
                    <div className="text-orange-400 ml-4">↓ POST /api/analytics with: video_id, timestamp, event</div>
                    <div className="text-orange-400 ml-4">↓ Update view count, watch time in real-time</div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-lg text-white font-bold text-center mt-6">
                    Initial Buffering: &lt; 2 seconds · Smooth playback with adaptive quality
                  </div>
                </div>
              </div>
            </div>

            {/* Video Processing Pipeline Diagram */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Video Processing Pipeline Visualization</h2>
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <VideoProcessingDiagram />
              </div>
            </div>

            {/* Live Streaming Diagram */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Live Streaming Architecture</h2>
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <LiveStreamingDiagram />
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
                <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-2xl p-6 border-2 border-red-700 shadow-sm">
                  <h3 className="text-lg font-bold text-red-400 mb-3">🌍 CDN Multi-Tier Cache</h3>
                  <ul className="space-y-2 text-red-300 text-sm">
                    <li>• Edge cache (closest to user) - 90% hit rate</li>
                    <li>• Regional cache (mid-tier) - 5% hit rate</li>
                    <li>• Origin (S3) - 5% miss rate</li>
                    <li>• Pre-warming for viral/trending videos</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl p-6 border-2 border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">⚡ Parallel Transcoding</h3>
                  <ul className="space-y-2 text-blue-300 text-sm">
                    <li>• Split video into segments (1-minute chunks)</li>
                    <li>• Transcode segments in parallel (100+ workers)</li>
                    <li>• GPU-accelerated encoding (NVIDIA, AWS EC2)</li>
                    <li>• 10x faster than sequential processing</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl p-6 border-2 border-green-700 shadow-sm">
                  <h3 className="text-lg font-bold text-green-400 mb-3">📦 Database Sharding</h3>
                  <ul className="space-y-2 text-green-300 text-sm">
                    <li>• Shard by video_id (consistent hashing)</li>
                    <li>• 100 shards for metadata DB</li>
                    <li>• Each shard: 1 primary + 2 replicas</li>
                    <li>• Read replicas for analytics queries</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-2xl p-6 border-2 border-purple-700 shadow-sm">
                  <h3 className="text-lg font-bold text-purple-400 mb-3">🔥 Hot/Cold Storage</h3>
                  <ul className="space-y-2 text-purple-300 text-sm">
                    <li>• Hot (new videos, &lt;30 days): SSD, CDN cache</li>
                    <li>• Warm (30-365 days): Standard storage</li>
                    <li>• Cold (1+ years): Glacier, on-demand retrieval</li>
                    <li>• 80% cost reduction for old content</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 rounded-2xl p-6 border-2 border-orange-700 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">🤖 ML Model Serving</h3>
                  <ul className="space-y-2 text-orange-300 text-sm">
                    <li>• TensorFlow Serving for recommendations</li>
                    <li>• Model versioning and A/B testing</li>
                    <li>• GPU clusters for inference (batch processing)</li>
                    <li>• Cache predictions for popular users</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/30 rounded-2xl p-6 border-2 border-cyan-700 shadow-sm">
                  <h3 className="text-lg font-bold text-cyan-400 mb-3">📊 Real-Time Analytics</h3>
                  <ul className="space-y-2 text-cyan-300 text-sm">
                    <li>• Apache Kafka for event streaming</li>
                    <li>• Apache Flink for stream processing</li>
                    <li>• Redis for real-time counters (views, likes)</li>
                    <li>• BigQuery for long-term analytics</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Capacity Estimation */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Back-of-the-Envelope Capacity Estimation</h2>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 border-2 border-gray-700 shadow-lg">
                <div className="space-y-6 font-mono text-sm">
                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-red-500">
                    <div className="font-bold text-red-400 mb-3 text-lg">Assumptions</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• 2 billion users, 30% active daily = 600M DAU</div>
                      <div>• Average 5 videos watched per user per day</div>
                      <div>• Average video length: 10 minutes</div>
                      <div>• 500 hours of video uploaded per minute</div>
                      <div>• Upload:Watch ratio = 1:1000</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-blue-500">
                    <div className="font-bold text-blue-400 mb-3 text-lg">Daily Video Views</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• 600M DAU × 5 videos = 3 billion videos/day</div>
                      <div>• 3B videos × 10 min = 30 billion minutes watched/day</div>
                      <div className="text-blue-400 font-bold">• ≈ 500 million hours watched per day</div>
                      <div>• Peak concurrent viewers: ~5 million</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-500">
                    <div className="font-bold text-green-400 mb-3 text-lg">Storage Requirements</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• Upload rate: 500 hours/min = 720,000 hours/day</div>
                      <div>• Average bitrate: 5 Mbps (1080p)</div>
                      <div>• Storage per hour: 5 Mbps × 3600s ÷ 8 = 2.25 GB/hour</div>
                      <div>• Daily upload: 720K × 2.25 GB = 1.62 PB/day (raw)</div>
                      <div>• With 8 resolutions: 1.62 PB × 8 = 12.96 PB/day (encoded)</div>
                      <div className="text-green-400 font-bold">• Total: ~13 PB per day</div>
                      <div className="text-green-400 font-bold">• Yearly: ~4.7 Exabytes (EB)</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-purple-500">
                    <div className="font-bold text-purple-400 mb-3 text-lg">Bandwidth Requirements</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• Peak viewers: 5M concurrent</div>
                      <div>• Average bitrate: 3 Mbps (720p adaptive)</div>
                      <div className="text-purple-400 font-bold">• Peak bandwidth: 5M × 3 Mbps = 15 Tbps</div>
                      <div>• CDN capacity needed: 20-30 Tbps (with buffer)</div>
                      <div>• Upload bandwidth: 500 hrs/min × 5 Mbps = 150 Gbps</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-orange-500">
                    <div className="font-bold text-orange-400 mb-3 text-lg">Transcoding Infrastructure</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• Upload: 720,000 hours/day = 500 hours/minute</div>
                      <div>• Transcoding time: 1 hour video = 10 min (with parallelization)</div>
                      <div>• Workers needed: 500 hours × 10 min = 5,000 worker-minutes/min</div>
                      <div className="text-orange-400 font-bold">• ~5,000 transcoding workers (GPU instances)</div>
                      <div>• Using AWS c5.4xlarge: ~$0.68/hour × 5,000 = $3,400/hour</div>
                      <div className="text-orange-400 font-bold">• Daily cost: ~$82,000 (transcoding only)</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-pink-500">
                    <div className="font-bold text-pink-400 mb-3 text-lg">Database Capacity</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• Total videos: 800 million (accumulated over years)</div>
                      <div>• Metadata per video: 10 KB (title, desc, tags, stats)</div>
                      <div>• Total metadata: 800M × 10 KB = 8 TB</div>
                      <div>• With sharding (100 shards): 80 GB per shard</div>
                      <div>• User data: 2B users × 5 KB = 10 TB</div>
                      <div className="text-pink-400 font-bold">• Total DB: ~20 TB (highly manageable)</div>
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
                  'FFmpeg (Transcoding)',
                  'HLS / MPEG-DASH',
                  'H.264 / VP9 / AV1',
                  'AWS S3 / Google Cloud Storage',
                  'CloudFront / Akamai CDN',
                  'PostgreSQL / Cassandra',
                  'Redis Cache',
                  'Elasticsearch',
                  'Apache Kafka',
                  'Apache Flink',
                  'TensorFlow / PyTorch',
                  'Kubernetes',
                  'Docker',
                  'NGINX',
                  'Node.js / Go',
                  'React / React Native',
                  'BigQuery / Hadoop',
                  'Grafana / Prometheus'
                ].map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 border-2 border-gray-600 rounded-lg text-sm font-semibold text-gray-200 shadow-sm hover:shadow-md transition-shadow"
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
                {/* Push vs Pull CDN */}
                <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-2xl p-8 border-2 border-red-700 shadow-lg">
                  <h3 className="text-xl font-bold text-red-400 mb-4">1. Push CDN vs Pull CDN</h3>
                  <div className="space-y-3 text-red-300">
                    <div><strong className="text-red-400">Push CDN:</strong> Origin pushes content to all edge servers proactively</div>
                    <div className="ml-4">• Pros: Faster first access, predictable bandwidth</div>
                    <div className="ml-4">• Cons: Wastes storage/bandwidth for unpopular videos</div>
                    <div><strong className="text-red-400">Pull CDN:</strong> Edge servers pull content on-demand (cache miss)</div>
                    <div className="ml-4">• Pros: Efficient storage, only cache popular content</div>
                    <div className="ml-4">• Cons: Slower first access (cache miss penalty)</div>
                    <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-red-500 mt-4">
                      <strong className="text-red-400">Decision:</strong> Hybrid approach - Push for trending/viral videos, Pull for long-tail content
                    </div>
                  </div>
                </div>

                {/* Storage Codec */}
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl p-8 border-2 border-blue-700 shadow-lg">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">2. Video Codec Selection</h3>
                  <div className="space-y-3 text-blue-300">
                    <div><strong className="text-blue-400">H.264 (AVC):</strong> Most compatible, 95% device support</div>
                    <div className="ml-4">• Pros: Universal compatibility, hardware acceleration</div>
                    <div className="ml-4">• Cons: Larger file sizes, less efficient</div>
                    <div><strong className="text-blue-400">VP9:</strong> Google's codec, 30% better compression than H.264</div>
                    <div className="ml-4">• Pros: Better quality at same bitrate, royalty-free</div>
                    <div className="ml-4">• Cons: Slower encoding, less hardware support</div>
                    <div><strong className="text-blue-400">AV1:</strong> Next-gen codec, 50% better than H.264</div>
                    <div className="ml-4">• Pros: Best compression, royalty-free, future-proof</div>
                    <div className="ml-4">• Cons: Very slow encoding, limited device support (2024)</div>
                    <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
                      <strong className="text-blue-400">Decision:</strong> Multi-codec strategy - H.264 (default), VP9 (Chrome), AV1 (gradual rollout)
                    </div>
                  </div>
                </div>

                {/* SQL vs NoSQL */}
                <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl p-8 border-2 border-green-700 shadow-lg">
                  <h3 className="text-xl font-bold text-green-400 mb-4">3. SQL vs NoSQL for Metadata</h3>
                  <div className="space-y-3 text-green-300">
                    <div><strong className="text-green-400">PostgreSQL (SQL):</strong> Relational database with ACID guarantees</div>
                    <div className="ml-4">• Pros: Strong consistency, complex queries, joins</div>
                    <div className="ml-4">• Cons: Harder to shard, vertical scaling limits</div>
                    <div><strong className="text-green-400">Cassandra (NoSQL):</strong> Distributed wide-column store</div>
                    <div className="ml-4">• Pros: Horizontal scaling, high write throughput, fault-tolerant</div>
                    <div className="ml-4">• Cons: Eventual consistency, limited query flexibility</div>
                    <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-500 mt-4">
                      <strong className="text-green-400">Decision:</strong> PostgreSQL for user/channel data (ACID needed), Cassandra for video metadata (scale &gt; consistency)
                    </div>
                  </div>
                </div>

                {/* Synchronous vs Asynchronous */}
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-2xl p-8 border-2 border-purple-700 shadow-lg">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">4. Synchronous vs Asynchronous Processing</h3>
                  <div className="space-y-3 text-purple-300">
                    <div><strong className="text-purple-400">Synchronous:</strong> Upload service waits for transcoding to complete</div>
                    <div className="ml-4">• Pros: Immediate feedback to user</div>
                    <div className="ml-4">• Cons: Long upload times (30+ min), ties up resources</div>
                    <div><strong className="text-purple-400">Asynchronous:</strong> Upload completes, transcoding happens in background</div>
                    <div className="ml-4">• Pros: Fast upload response, better resource utilization</div>
                    <div className="ml-4">• Cons: Delayed availability (video not immediately watchable)</div>
                    <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500 mt-4">
                      <strong className="text-purple-400">Decision:</strong> Asynchronous with notifications - Upload returns instantly, notify creator when processing complete
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

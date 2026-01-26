/**
 * Apartment Alarm System Design
 *
 * IoT-based security system for apartment buildings with real-time monitoring,
 * sensor integration, mobile alerts, and emergency response.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#ef4444',
  primaryHover: '#f87171',
  bg: 'rgba(239, 68, 68, 0.1)',
  border: 'rgba(239, 68, 68, 0.3)',
  arrow: '#dc2626',
  hoverBg: 'rgba(239, 68, 68, 0.2)',
  topicBg: 'rgba(239, 68, 68, 0.2)'
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

const SystemArchitectureDiagram = () => (
  <svg viewBox="0 0 900 500" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="450" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      High-Level System Architecture
    </text>

    {/* IoT Devices Layer */}
    <rect x="50" y="50" width="100" height="45" rx="6" fill="#dc2626" stroke="#ef4444" strokeWidth="2"/>
    <text x="100" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Door Sensors</text>
    <text x="100" y="85" textAnchor="middle" fill="white" fontSize="8">Zigbee</text>

    <rect x="170" y="50" width="100" height="45" rx="6" fill="#dc2626" stroke="#ef4444" strokeWidth="2"/>
    <text x="220" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Motion</text>
    <text x="220" y="85" textAnchor="middle" fill="white" fontSize="8">PIR WiFi</text>

    <rect x="290" y="50" width="100" height="45" rx="6" fill="#dc2626" stroke="#ef4444" strokeWidth="2"/>
    <text x="340" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Fire Alarms</text>
    <text x="340" y="85" textAnchor="middle" fill="white" fontSize="8">Smoke/Heat</text>

    <rect x="410" y="50" width="100" height="45" rx="6" fill="#dc2626" stroke="#ef4444" strokeWidth="2"/>
    <text x="460" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Cameras</text>
    <text x="460" y="85" textAnchor="middle" fill="white" fontSize="8">1080p RTSP</text>

    <rect x="530" y="50" width="100" height="45" rx="6" fill="#dc2626" stroke="#ef4444" strokeWidth="2"/>
    <text x="580" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Access Ctrl</text>
    <text x="580" y="85" textAnchor="middle" fill="white" fontSize="8">RFID/PIN</text>

    {/* IoT Gateway */}
    <rect x="170" y="130" width="360" height="45" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="350" y="158" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">IoT Gateway / MQTT Broker</text>

    {/* Edge Processing */}
    <rect x="560" y="130" width="140" height="45" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="630" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Edge Processing</text>
    <text x="630" y="165" textAnchor="middle" fill="white" fontSize="8">Local AI</text>

    {/* API Gateway & Load Balancer */}
    <rect x="250" y="210" width="200" height="40" rx="6" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="350" y="235" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">API Gateway + Load Balancer</text>

    {/* Microservices */}
    <rect x="50" y="290" width="120" height="60" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="110" y="315" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Alarm Service</text>
    <text x="110" y="335" textAnchor="middle" fill="white" fontSize="8">Rule Engine</text>

    <rect x="190" y="290" width="120" height="60" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="250" y="315" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Alert Service</text>
    <text x="250" y="335" textAnchor="middle" fill="white" fontSize="8">Push/SMS</text>

    <rect x="330" y="290" width="120" height="60" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="390" y="315" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">User Service</text>
    <text x="390" y="335" textAnchor="middle" fill="white" fontSize="8">Auth</text>

    <rect x="470" y="290" width="120" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="530" y="315" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Video Service</text>
    <text x="530" y="335" textAnchor="middle" fill="white" fontSize="8">Stream/Record</text>

    <rect x="610" y="290" width="120" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="670" y="315" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Access Service</text>
    <text x="670" y="335" textAnchor="middle" fill="white" fontSize="8">Entry Logs</text>

    {/* Message Queue */}
    <rect x="200" y="390" width="200" height="40" rx="6" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="300" y="415" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Kafka / MQTT Queue</text>

    {/* Cache */}
    <rect x="430" y="390" width="140" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="500" y="415" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Redis Cache</text>

    {/* Databases */}
    <rect x="100" y="460" width="100" height="35" rx="6" fill="#334155" stroke="#64748b" strokeWidth="2"/>
    <text x="150" y="482" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">TimescaleDB</text>

    <rect x="220" y="460" width="100" height="35" rx="6" fill="#334155" stroke="#64748b" strokeWidth="2"/>
    <text x="270" y="482" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PostgreSQL</text>

    <rect x="340" y="460" width="100" height="35" rx="6" fill="#334155" stroke="#64748b" strokeWidth="2"/>
    <text x="390" y="482" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MongoDB</text>

    <rect x="460" y="460" width="100" height="35" rx="6" fill="#059669" stroke="#10b981" strokeWidth="2"/>
    <text x="510" y="482" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">S3 Video</text>

    {/* Connections */}
    <line x1="100" y1="95" x2="350" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <line x1="220" y1="95" x2="350" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <line x1="340" y1="95" x2="350" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <line x1="460" y1="95" x2="350" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <line x1="580" y1="95" x2="350" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)"/>

    <line x1="350" y1="175" x2="350" y2="210" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <line x1="350" y1="250" x2="350" y2="290" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)"/>
  </svg>
)

const IoTGatewayDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-iot" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      IoT Gateway Architecture
    </text>

    {/* Sensors */}
    <rect x="30" y="60" width="80" height="100" rx="6" fill="rgba(220, 38, 38, 0.3)" stroke="#dc2626" strokeWidth="2"/>
    <text x="70" y="90" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Sensors</text>
    <text x="70" y="110" textAnchor="middle" fill="#94a3b8" fontSize="8">Zigbee</text>
    <text x="70" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8">Z-Wave</text>
    <text x="70" y="140" textAnchor="middle" fill="#94a3b8" fontSize="8">WiFi</text>

    {/* Protocol Handler */}
    <rect x="160" y="80" width="120" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="220" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Protocol Handler</text>
    <text x="220" y="125" textAnchor="middle" fill="white" fontSize="8">Multi-protocol</text>

    {/* MQTT Broker */}
    <rect x="330" y="80" width="120" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="390" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MQTT Broker</text>
    <text x="390" y="125" textAnchor="middle" fill="white" fontSize="8">Mosquitto</text>

    {/* Edge Processing */}
    <rect x="500" y="80" width="120" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="560" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Edge AI</text>
    <text x="560" y="125" textAnchor="middle" fill="white" fontSize="8">Local Processing</text>

    {/* Cloud */}
    <rect x="670" y="60" width="100" height="100" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="720" y="100" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Cloud</text>
    <text x="720" y="120" textAnchor="middle" fill="#94a3b8" fontSize="8">Backend</text>
    <text x="720" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">Services</text>

    {/* Arrows */}
    <line x1="110" y1="110" x2="155" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-iot)"/>
    <line x1="280" y1="110" x2="325" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-iot)"/>
    <line x1="450" y1="110" x2="495" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-iot)"/>
    <line x1="620" y1="110" x2="665" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-iot)"/>
  </svg>
)

const MQTTTopicsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      MQTT Topic Hierarchy
    </text>

    {/* Root */}
    <rect x="350" y="50" width="100" height="35" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="72" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">building/</text>

    {/* Level 1 */}
    <rect x="100" y="110" width="120" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="160" y="132" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">sensors/</text>

    <rect x="280" y="110" width="120" height="35" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="340" y="132" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">cameras/</text>

    <rect x="460" y="110" width="120" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="520" y="132" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">access/</text>

    <rect x="640" y="110" width="120" height="35" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="700" y="132" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">alarms/</text>

    {/* Level 2 */}
    <rect x="30" y="170" width="90" height="30" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="75" y="190" textAnchor="middle" fill="#60a5fa" fontSize="8">door/apt_501</text>

    <rect x="130" y="170" width="90" height="30" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="175" y="190" textAnchor="middle" fill="#60a5fa" fontSize="8">motion/apt_501</text>

    <rect x="280" y="170" width="120" height="30" rx="4" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981"/>
    <text x="340" y="190" textAnchor="middle" fill="#34d399" fontSize="8">lobby/cam_001</text>

    <rect x="460" y="170" width="120" height="30" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="520" y="190" textAnchor="middle" fill="#a78bfa" fontSize="8">entry/main_gate</text>

    <rect x="640" y="170" width="120" height="30" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444"/>
    <text x="700" y="190" textAnchor="middle" fill="#f87171" fontSize="8">fire/apt_501</text>

    {/* Lines */}
    <line x1="400" y1="85" x2="160" y2="110" stroke="#64748b" strokeWidth="1"/>
    <line x1="400" y1="85" x2="340" y2="110" stroke="#64748b" strokeWidth="1"/>
    <line x1="400" y1="85" x2="520" y2="110" stroke="#64748b" strokeWidth="1"/>
    <line x1="400" y1="85" x2="700" y2="110" stroke="#64748b" strokeWidth="1"/>

    <line x1="160" y1="145" x2="75" y2="170" stroke="#64748b" strokeWidth="1"/>
    <line x1="160" y1="145" x2="175" y2="170" stroke="#64748b" strokeWidth="1"/>
    <line x1="340" y1="145" x2="340" y2="170" stroke="#64748b" strokeWidth="1"/>
    <line x1="520" y1="145" x2="520" y2="170" stroke="#64748b" strokeWidth="1"/>
    <line x1="700" y1="145" x2="700" y2="170" stroke="#64748b" strokeWidth="1"/>
  </svg>
)

const EdgeProcessingDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-edge" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Edge Processing Pipeline
    </text>

    <rect x="40" y="70" width="120" height="80" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="100" y="100" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Raw Events</text>
    <text x="100" y="120" textAnchor="middle" fill="#94a3b8" fontSize="8">100+ events/sec</text>
    <text x="100" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">per building</text>

    <rect x="200" y="70" width="120" height="80" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="260" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Filter</text>
    <text x="260" y="120" textAnchor="middle" fill="white" fontSize="8">Debounce</text>
    <text x="260" y="135" textAnchor="middle" fill="white" fontSize="8">Validate</text>

    <rect x="360" y="70" width="120" height="80" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="420" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">AI Detection</text>
    <text x="420" y="120" textAnchor="middle" fill="white" fontSize="8">Person/Vehicle</text>
    <text x="420" y="135" textAnchor="middle" fill="white" fontSize="8">False Alarm Filter</text>

    <rect x="520" y="70" width="120" height="80" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="580" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Rule Engine</text>
    <text x="580" y="120" textAnchor="middle" fill="white" fontSize="8">Local Processing</text>
    <text x="580" y="135" textAnchor="middle" fill="white" fontSize="8">Works Offline</text>

    <rect x="680" y="70" width="100" height="80" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="730" y="100" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Alarms</text>
    <text x="730" y="120" textAnchor="middle" fill="#94a3b8" fontSize="8">~5% of events</text>
    <text x="730" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">trigger alerts</text>

    <line x1="160" y1="110" x2="195" y2="110" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-edge)"/>
    <line x1="320" y1="110" x2="355" y2="110" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-edge)"/>
    <line x1="480" y1="110" x2="515" y2="110" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-edge)"/>
    <line x1="640" y1="110" x2="675" y2="110" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-edge)"/>
  </svg>
)

const SensorTypesDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Sensor Types and Protocols
    </text>

    {/* Door/Window */}
    <rect x="40" y="50" width="140" height="150" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="80" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Door/Window</text>
    <text x="110" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Magnetic Reed Switch</text>
    <text x="110" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Protocol: Zigbee</text>
    <text x="110" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">Battery: 2+ years</text>
    <text x="110" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">Range: 20m</text>
    <text x="110" y="185" textAnchor="middle" fill="#4ade80" fontSize="9">Instant trigger</text>

    {/* Motion */}
    <rect x="200" y="50" width="140" height="150" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="270" y="80" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Motion (PIR)</text>
    <text x="270" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Passive Infrared</text>
    <text x="270" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Protocol: WiFi</text>
    <text x="270" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">Battery: 1 year</text>
    <text x="270" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">Range: 10m/90deg</text>
    <text x="270" y="185" textAnchor="middle" fill="#fbbf24" fontSize="9">Pet immune avail</text>

    {/* Fire/Smoke */}
    <rect x="360" y="50" width="140" height="150" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="430" y="80" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Fire/Smoke</text>
    <text x="430" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Photoelectric+Heat</text>
    <text x="430" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Protocol: Z-Wave</text>
    <text x="430" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">Battery: 10 years</text>
    <text x="430" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">Interconnected</text>
    <text x="430" y="185" textAnchor="middle" fill="#ef4444" fontSize="9">CRITICAL priority</text>

    {/* Glass Break */}
    <rect x="520" y="50" width="140" height="150" rx="8" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="590" y="80" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="bold">Glass Break</text>
    <text x="590" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Acoustic Sensor</text>
    <text x="590" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Protocol: Zigbee</text>
    <text x="590" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">Battery: 3 years</text>
    <text x="590" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">Range: 25ft radius</text>
    <text x="590" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">Dual-stage verify</text>

    {/* Water Leak */}
    <rect x="680" y="50" width="100" height="150" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="730" y="80" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Water Leak</text>
    <text x="730" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Conductivity</text>
    <text x="730" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">WiFi</text>
    <text x="730" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">2 years</text>
    <text x="730" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">Probe cable</text>
    <text x="730" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">Auto shutoff</text>
  </svg>
)

const IntrusionFlowDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-flow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Intrusion Detection Flow
    </text>

    {/* Step 1 */}
    <rect x="30" y="50" width="100" height="50" rx="6" fill="#dc2626" stroke="#ef4444" strokeWidth="2"/>
    <text x="80" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">1. Door Open</text>
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="8">Sensor Trigger</text>

    {/* Step 2 */}
    <rect x="160" y="50" width="100" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="210" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">2. MQTT</text>
    <text x="210" y="85" textAnchor="middle" fill="white" fontSize="8">Publish Event</text>

    {/* Step 3 */}
    <rect x="290" y="50" width="100" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="340" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">3. Edge Check</text>
    <text x="340" y="85" textAnchor="middle" fill="white" fontSize="8">Armed State?</text>

    {/* Step 4 */}
    <rect x="420" y="50" width="100" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="470" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">4. Grace Period</text>
    <text x="470" y="85" textAnchor="middle" fill="white" fontSize="8">30 sec delay</text>

    {/* Step 5 - Branch */}
    <rect x="550" y="50" width="100" height="50" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="600" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">5. Disarmed?</text>
    <text x="600" y="85" textAnchor="middle" fill="white" fontSize="8">PIN entered</text>

    <rect x="680" y="50" width="100" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="730" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">NO ALARM</text>

    {/* Alarm Path */}
    <rect x="550" y="130" width="100" height="50" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="600" y="150" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">6. ALARM!</text>
    <text x="600" y="165" textAnchor="middle" fill="white" fontSize="8">Kafka Event</text>

    {/* Step 7-9 */}
    <rect x="290" y="210" width="100" height="50" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="340" y="230" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">7. Alert Svc</text>
    <text x="340" y="245" textAnchor="middle" fill="white" fontSize="8">Push + SMS</text>

    <rect x="420" y="210" width="100" height="50" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="470" y="230" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">8. Sirens</text>
    <text x="470" y="245" textAnchor="middle" fill="white" fontSize="8">Strobe Lights</text>

    <rect x="550" y="210" width="120" height="50" rx="6" fill="#7c3aed" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="610" y="230" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">9. Emergency</text>
    <text x="610" y="245" textAnchor="middle" fill="white" fontSize="8">Dispatch if critical</text>

    {/* Arrows */}
    <line x1="130" y1="75" x2="155" y2="75" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-flow)"/>
    <line x1="260" y1="75" x2="285" y2="75" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-flow)"/>
    <line x1="390" y1="75" x2="415" y2="75" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-flow)"/>
    <line x1="520" y1="75" x2="545" y2="75" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-flow)"/>
    <line x1="650" y1="75" x2="675" y2="75" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-flow)"/>

    <line x1="600" y1="100" x2="600" y2="125" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-flow)"/>
    <text x="615" y="115" fill="#f87171" fontSize="8">No</text>

    <line x1="550" y1="155" x2="390" y2="210" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-flow)"/>
    <line x1="390" y1="235" x2="415" y2="235" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-flow)"/>
    <line x1="520" y1="235" x2="545" y2="235" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-flow)"/>
  </svg>
)

const AlertChannelsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-alert" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Multi-Channel Alert System
    </text>

    {/* Alert Service */}
    <rect x="50" y="80" width="130" height="80" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="115" y="110" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Alert Service</text>
    <text x="115" y="130" textAnchor="middle" fill="white" fontSize="9">Priority Router</text>
    <text x="115" y="145" textAnchor="middle" fill="white" fontSize="9">Retry Logic</text>

    {/* Channels */}
    <rect x="250" y="40" width="120" height="45" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="310" y="60" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Push (FCM/APNS)</text>
    <text x="310" y="75" textAnchor="middle" fill="white" fontSize="8">Fastest - P1</text>

    <rect x="250" y="95" width="120" height="45" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="310" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SMS (Twilio)</text>
    <text x="310" y="130" textAnchor="middle" fill="white" fontSize="8">Critical - P2</text>

    <rect x="250" y="150" width="120" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="310" y="170" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Email</text>
    <text x="310" y="185" textAnchor="middle" fill="white" fontSize="8">Low priority - P3</text>

    {/* Recipients */}
    <rect x="440" y="40" width="100" height="45" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e"/>
    <text x="490" y="67" textAnchor="middle" fill="#4ade80" fontSize="10">Resident</text>

    <rect x="440" y="95" width="100" height="45" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b"/>
    <text x="490" y="122" textAnchor="middle" fill="#fbbf24" fontSize="10">Building Mgmt</text>

    <rect x="440" y="150" width="100" height="45" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444"/>
    <text x="490" y="177" textAnchor="middle" fill="#f87171" fontSize="10">Monitoring Co</text>

    {/* Emergency */}
    <rect x="610" y="70" width="150" height="100" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="685" y="100" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Emergency</text>
    <text x="685" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">911 Auto-dial</text>
    <text x="685" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Fire Dept Direct</text>
    <text x="685" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Police Dispatch</text>

    {/* Arrows */}
    <line x1="180" y1="100" x2="245" y2="62" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-alert)"/>
    <line x1="180" y1="120" x2="245" y2="117" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-alert)"/>
    <line x1="180" y1="140" x2="245" y2="172" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-alert)"/>

    <line x1="370" y1="62" x2="435" y2="62" stroke="#64748b" strokeWidth="1"/>
    <line x1="370" y1="117" x2="435" y2="117" stroke="#64748b" strokeWidth="1"/>
    <line x1="370" y1="172" x2="435" y2="172" stroke="#64748b" strokeWidth="1"/>

    <line x1="540" y1="117" x2="605" y2="120" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-alert)"/>
  </svg>
)

const VideoStreamingDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-video" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Video Streaming Architecture
    </text>

    {/* Camera */}
    <rect x="30" y="70" width="100" height="70" rx="6" fill="#dc2626" stroke="#ef4444" strokeWidth="2"/>
    <text x="80" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">IP Camera</text>
    <text x="80" y="115" textAnchor="middle" fill="white" fontSize="8">1080p RTSP</text>
    <text x="80" y="130" textAnchor="middle" fill="white" fontSize="8">H.265</text>

    {/* NVR */}
    <rect x="180" y="70" width="120" height="70" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="240" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">NVR / Frigate</text>
    <text x="240" y="115" textAnchor="middle" fill="white" fontSize="8">Local Recording</text>
    <text x="240" y="130" textAnchor="middle" fill="white" fontSize="8">AI Detection</text>

    {/* CDN */}
    <rect x="350" y="70" width="120" height="70" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="410" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CDN / HLS</text>
    <text x="410" y="115" textAnchor="middle" fill="white" fontSize="8">Live Streaming</text>
    <text x="410" y="130" textAnchor="middle" fill="white" fontSize="8">Adaptive Bitrate</text>

    {/* S3 */}
    <rect x="520" y="50" width="100" height="50" rx="6" fill="#059669" stroke="#10b981" strokeWidth="2"/>
    <text x="570" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S3 / NAS</text>
    <text x="570" y="90" textAnchor="middle" fill="white" fontSize="8">30-day clips</text>

    {/* Mobile */}
    <rect x="520" y="110" width="100" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="570" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Mobile App</text>
    <text x="570" y="150" textAnchor="middle" fill="white" fontSize="8">Live View</text>

    {/* Dashboard */}
    <rect x="670" y="70" width="100" height="70" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="720" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Dashboard</text>
    <text x="720" y="115" textAnchor="middle" fill="white" fontSize="8">Security Staff</text>
    <text x="720" y="130" textAnchor="middle" fill="white" fontSize="8">Multi-view</text>

    {/* Arrows */}
    <line x1="130" y1="105" x2="175" y2="105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-video)"/>
    <line x1="300" y1="105" x2="345" y2="105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-video)"/>
    <line x1="470" y1="90" x2="515" y2="75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-video)"/>
    <line x1="470" y1="120" x2="515" y2="135" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-video)"/>
    <line x1="620" y1="135" x2="665" y2="115" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-video)"/>
  </svg>
)

const AccessControlDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-access" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Access Control Methods
    </text>

    {/* Entry Methods */}
    <rect x="40" y="50" width="90" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="85" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">RFID Card</text>
    <text x="85" y="85" textAnchor="middle" fill="white" fontSize="8">Contactless</text>

    <rect x="150" y="50" width="90" height="50" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="195" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PIN Code</text>
    <text x="195" y="85" textAnchor="middle" fill="white" fontSize="8">4-8 digits</text>

    <rect x="260" y="50" width="90" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="305" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Mobile App</text>
    <text x="305" y="85" textAnchor="middle" fill="white" fontSize="8">BLE/NFC</text>

    <rect x="370" y="50" width="90" height="50" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="415" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Biometric</text>
    <text x="415" y="85" textAnchor="middle" fill="white" fontSize="8">Fingerprint</text>

    {/* Access Controller */}
    <rect x="200" y="130" width="200" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="300" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Access Controller</text>
    <text x="300" y="172" textAnchor="middle" fill="white" fontSize="9">Validate + Log</text>

    {/* Lock */}
    <rect x="480" y="130" width="100" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="530" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Electric Lock</text>
    <text x="530" y="172" textAnchor="middle" fill="white" fontSize="9">Unlock 5s</text>

    {/* Cloud */}
    <rect x="650" y="130" width="120" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="710" y="155" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Cloud Logs</text>
    <text x="710" y="172" textAnchor="middle" fill="#94a3b8" fontSize="8">Entry/Exit Audit</text>

    {/* Arrows */}
    <line x1="85" y1="100" x2="200" y2="130" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-access)"/>
    <line x1="195" y1="100" x2="250" y2="130" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-access)"/>
    <line x1="305" y1="100" x2="300" y2="130" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-access)"/>
    <line x1="415" y1="100" x2="350" y2="130" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-access)"/>

    <line x1="400" y1="155" x2="475" y2="155" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-access)"/>
    <line x1="580" y1="155" x2="645" y2="155" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-access)"/>
  </svg>
)

const RedundancyDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-redundancy" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Redundancy and Failover
    </text>

    {/* Gateway */}
    <rect x="50" y="70" width="130" height="100" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="115" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">IoT Gateway</text>
    <text x="115" y="120" textAnchor="middle" fill="white" fontSize="8">UPS Battery</text>
    <text x="115" y="140" textAnchor="middle" fill="white" fontSize="8">24h Backup</text>
    <text x="115" y="155" textAnchor="middle" fill="white" fontSize="8">Local Storage</text>

    {/* Primary */}
    <rect x="250" y="50" width="130" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="315" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">WiFi/Ethernet</text>
    <text x="315" y="95" textAnchor="middle" fill="white" fontSize="8">Primary Link</text>

    {/* Backup */}
    <rect x="250" y="130" width="130" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="315" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Cellular 4G/5G</text>
    <text x="315" y="175" textAnchor="middle" fill="white" fontSize="8">Backup Link</text>

    {/* Failover Logic */}
    <rect x="450" y="80" width="130" height="80" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="515" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Auto Failover</text>
    <text x="515" y="130" textAnchor="middle" fill="white" fontSize="8">10s detection</text>
    <text x="515" y="145" textAnchor="middle" fill="white" fontSize="8">Seamless switch</text>

    {/* Cloud */}
    <rect x="650" y="70" width="120" height="100" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="710" y="100" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Cloud Backend</text>
    <text x="710" y="120" textAnchor="middle" fill="#94a3b8" fontSize="8">Multi-region</text>
    <text x="710" y="140" textAnchor="middle" fill="#94a3b8" fontSize="8">99.99% uptime</text>
    <text x="710" y="155" textAnchor="middle" fill="#94a3b8" fontSize="8">Event sync</text>

    {/* Arrows */}
    <line x1="180" y1="100" x2="245" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-redundancy)"/>
    <line x1="180" y1="140" x2="245" y2="160" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-redundancy)"/>
    <line x1="380" y1="80" x2="445" y2="100" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-redundancy)"/>
    <line x1="380" y1="160" x2="445" y2="140" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-redundancy)"/>
    <line x1="580" y1="120" x2="645" y2="120" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-redundancy)"/>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function ApartmentAlarmSystem({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'iot-architecture',
      name: 'IoT Architecture',
      icon: '📡',
      color: '#f59e0b',
      description: 'IoT gateway, MQTT messaging, and edge processing for sensor data collection and local intelligence.',
      diagram: SystemArchitectureDiagram,
      details: [
        {
          name: 'IoT Gateway',
          diagram: IoTGatewayDiagram,
          explanation: 'The IoT Gateway serves as the central hub connecting all sensors to the cloud. It runs an MQTT broker (Mosquitto) for lightweight pub/sub messaging, handles protocol translation (Zigbee, Z-Wave, WiFi), and provides local storage for offline operation. Raspberry Pi 4 or NVIDIA Jetson for AI workloads. Gateway maintains sensor state and publishes events to cloud backend via TLS-encrypted MQTT or HTTPS.',
          codeExample: `// IoT Gateway - MQTT Event Handler (Node.js)
const mqtt = require('mqtt');
const { Kafka } = require('kafkajs');

const mqttClient = mqtt.connect('mqtt://localhost:1883');
const kafka = new Kafka({ brokers: ['kafka:9092'] });
const producer = kafka.producer();

// Subscribe to all sensor topics
mqttClient.on('connect', () => {
  mqttClient.subscribe('building/+/sensors/#', (err) => {
    if (!err) console.log('Subscribed to sensor topics');
  });
});

// Process incoming sensor events
mqttClient.on('message', async (topic, message) => {
  const event = JSON.parse(message.toString());
  const [, buildingId, , sensorType, apartmentId] = topic.split('/');

  // Enrich event with metadata
  const enrichedEvent = {
    ...event,
    buildingId,
    sensorType,
    apartmentId,
    receivedAt: Date.now(),
    processedLocally: true
  };

  // Forward to Kafka for cloud processing
  await producer.send({
    topic: 'sensor-events',
    messages: [{
      key: apartmentId,
      value: JSON.stringify(enrichedEvent)
    }]
  });

  // Also trigger local edge processing
  await processLocally(enrichedEvent);
});`
        },
        {
          name: 'MQTT Topics',
          diagram: MQTTTopicsDiagram,
          explanation: 'MQTT topic hierarchy organizes sensor data by building, type, and location. Topics follow pattern: building/{id}/sensors/{type}/{apartment_id}. QoS levels ensure reliability: QoS 0 for heartbeats, QoS 1 for sensor events, QoS 2 for alarms. Retained messages store last known state for new subscribers. Last Will and Testament (LWT) detects offline sensors.',
          codeExample: `// MQTT Topic Configuration
const MQTT_TOPICS = {
  // Sensor events (QoS 1 - at least once delivery)
  sensors: {
    door: 'building/{buildingId}/sensors/door/{apartmentId}',
    motion: 'building/{buildingId}/sensors/motion/{apartmentId}',
    smoke: 'building/{buildingId}/sensors/smoke/{apartmentId}',
    glass: 'building/{buildingId}/sensors/glass/{apartmentId}',
    water: 'building/{buildingId}/sensors/water/{apartmentId}'
  },

  // Commands to devices (QoS 2 - exactly once)
  commands: {
    arm: 'building/{buildingId}/commands/arm/{apartmentId}',
    disarm: 'building/{buildingId}/commands/disarm/{apartmentId}',
    siren: 'building/{buildingId}/commands/siren/{apartmentId}'
  },

  // Alarm events (QoS 2 - critical)
  alarms: 'building/{buildingId}/alarms/{severity}/{apartmentId}',

  // Device status (retained messages)
  status: 'building/{buildingId}/status/{deviceId}'
};

// Sensor event payload schema
interface SensorEvent {
  deviceId: string;
  type: 'door' | 'motion' | 'smoke' | 'glass' | 'water';
  state: 'open' | 'closed' | 'triggered' | 'clear';
  batteryLevel: number;  // 0-100%
  signalStrength: number; // RSSI
  timestamp: number;
  metadata?: Record<string, unknown>;
}`
        },
        {
          name: 'Edge Processing',
          diagram: EdgeProcessingDiagram,
          explanation: 'Edge processing runs on the IoT gateway for low-latency alarm detection even when offline. Local AI models detect persons/vehicles to reduce false alarms. Rule engine evaluates armed state, zones, and schedules. Events are cached locally (7 days) and synced when connection restores. 95% of events are filtered locally - only actionable events reach the cloud.',
          codeExample: `// Edge Processing - Local Rule Engine
class EdgeRuleEngine {
  private alarmStates: Map<string, AlarmState> = new Map();
  private eventBuffer: CircularBuffer<SensorEvent>;

  async processEvent(event: SensorEvent): Promise<AlarmDecision> {
    const apartmentId = event.apartmentId;
    const state = this.alarmStates.get(apartmentId);

    // 1. Check if alarm is armed
    if (!state?.armed) {
      return { action: 'log_only', reason: 'disarmed' };
    }

    // 2. Debounce - ignore duplicate events within 5 seconds
    if (this.isDuplicate(event)) {
      return { action: 'ignore', reason: 'debounce' };
    }

    // 3. AI-based false alarm filtering (runs on GPU)
    if (event.type === 'motion' && this.aiModel) {
      const isHuman = await this.aiModel.detectPerson(event.imageData);
      if (!isHuman) {
        return { action: 'log_only', reason: 'pet_detected' };
      }
    }

    // 4. Evaluate zone rules
    const zone = state.zones.find(z => z.sensors.includes(event.deviceId));
    if (zone?.entryDelay && event.type === 'door') {
      // Start grace period for entry door
      this.startGracePeriod(apartmentId, zone.entryDelay);
      return { action: 'pending', gracePeriodMs: zone.entryDelay * 1000 };
    }

    // 5. Trigger immediate alarm
    return {
      action: 'alarm',
      severity: this.calculateSeverity(event, state),
      notifyCloud: true,
      activateSiren: true
    };
  }
}`
        }
      ]
    },
    {
      id: 'sensor-integration',
      name: 'Sensor Integration',
      icon: '🚪',
      color: '#dc2626',
      description: 'Door/window sensors, motion detectors, fire alarms, glass break, and water leak sensors for comprehensive coverage.',
      diagram: SensorTypesDiagram,
      details: [
        {
          name: 'Door/Window Sensors',
          diagram: SensorTypesDiagram,
          explanation: 'Magnetic reed switch sensors detect when doors or windows are opened. Zigbee protocol for low power consumption (2+ year battery life) and mesh networking. Each apartment has 6-10 sensors covering all entry points. Sensors report state changes instantly with tamper detection. Zone classification: perimeter (doors/windows) vs interior (motion) for different arm modes.',
          codeExample: `// Door Sensor Event Handler
interface DoorSensorEvent {
  deviceId: string;
  apartmentId: string;
  location: 'front_door' | 'back_door' | 'window_bedroom' | string;
  state: 'open' | 'closed';
  tampered: boolean;
  batteryLevel: number;
  timestamp: number;
}

class DoorSensorHandler {
  async handleEvent(event: DoorSensorEvent): Promise<void> {
    // Check for tamper - always alert regardless of arm state
    if (event.tampered) {
      await this.triggerTamperAlarm(event);
      return;
    }

    // Check battery level - alert at 20%
    if (event.batteryLevel < 20) {
      await this.sendLowBatteryAlert(event);
    }

    // Get alarm state for this apartment
    const alarmState = await this.getAlarmState(event.apartmentId);

    if (!alarmState.armed) {
      // Just log the event
      await this.logEvent(event);
      return;
    }

    // Armed - check zone type
    const zone = alarmState.getZone(event.deviceId);

    if (zone.type === 'entry' && event.state === 'open') {
      // Entry door - start countdown
      await this.startEntryCountdown(event, zone.entryDelaySeconds);
    } else if (event.state === 'open') {
      // Non-entry point opened while armed - immediate alarm
      await this.triggerIntrusionAlarm(event);
    }
  }
}`
        },
        {
          name: 'Motion Detectors',
          diagram: SensorTypesDiagram,
          explanation: 'Passive Infrared (PIR) sensors detect body heat movement. WiFi-connected for richer data (optional camera integration). Pet-immune models ignore animals under 40lbs. Motion zones cover interior spaces - armed only in "Away" mode, not "Home" mode. Detection range: 10 meters, 90-degree field of view. Dual-sensor verification reduces false alarms.',
          codeExample: `// Motion Detector Configuration
interface MotionSensorConfig {
  deviceId: string;
  apartmentId: string;
  sensitivity: 'low' | 'medium' | 'high';
  petImmune: boolean;
  petWeightLimit: number;  // in lbs
  detectionZone: {
    rangeMeters: number;
    angleHorizontal: number;
    angleVertical: number;
  };
  schedules: {
    dayOfWeek: number[];
    startTime: string;  // HH:mm
    endTime: string;
    enabled: boolean;
  }[];
}

class MotionSensorService {
  async processMotion(event: MotionEvent): Promise<void> {
    const config = await this.getConfig(event.deviceId);
    const alarmState = await this.getAlarmState(event.apartmentId);

    // Motion sensors only active in AWAY mode
    if (alarmState.mode !== 'AWAY') {
      return;
    }

    // Check if within active schedule
    if (!this.isWithinSchedule(config.schedules)) {
      return;
    }

    // For pet-immune sensors, check if AI detected human
    if (config.petImmune && event.hasImage) {
      const detection = await this.aiService.classify(event.imageData);
      if (detection.type === 'pet' && detection.estimatedWeight < config.petWeightLimit) {
        await this.logFalseAlarm(event, 'pet_detected');
        return;
      }
    }

    // Trigger alarm
    await this.triggerAlarm(event, 'motion_detected');
  }
}`
        },
        {
          name: 'Fire/Smoke Alarms',
          diagram: SensorTypesDiagram,
          explanation: 'Combination photoelectric smoke + heat rise detectors for comprehensive fire detection. Z-Wave interconnected - one triggers all. 10-year sealed battery. Always active regardless of arm state. CRITICAL priority bypasses all filters. Triggers building-wide evacuation, 911 auto-dial, elevator recall. Dual-sensor verification reduces cooking false alarms.',
          codeExample: `// Fire Alarm Service - Critical Priority Handler
class FireAlarmService {
  private readonly CRITICAL_PRIORITY = 0;  // Highest priority

  async handleFireEvent(event: FireAlarmEvent): Promise<void> {
    // Fire alarms ALWAYS trigger - no arm state check
    console.log(\`CRITICAL: Fire alarm triggered in \${event.apartmentId}\`);

    // 1. Immediately trigger building-wide alert
    await this.triggerBuildingAlarm(event.buildingId, 'FIRE');

    // 2. Parallel actions - don't wait
    await Promise.all([
      // Auto-dial 911 with building address
      this.emergencyDispatch.call911({
        type: 'FIRE',
        address: await this.getBuildingAddress(event.buildingId),
        apartment: event.apartmentId,
        sensorLocation: event.location
      }),

      // Notify fire department directly
      this.emergencyDispatch.notifyFireDept(event.buildingId),

      // Unlock all emergency exits
      this.accessControl.unlockEmergencyExits(event.buildingId),

      // Recall elevators to ground floor
      this.elevatorControl.recallToGround(event.buildingId),

      // Send push notifications to ALL residents
      this.alertService.broadcastEvacuation(event.buildingId),

      // Start recording all cameras
      this.videoService.startEmergencyRecording(event.buildingId)
    ]);

    // 3. Notify monitoring company
    await this.monitoringService.dispatchGuard(event.buildingId, 'FIRE');
  }
}`
        }
      ]
    },
    {
      id: 'alert-system',
      name: 'Alert System',
      icon: '🔔',
      color: '#06b6d4',
      description: 'Multi-channel notifications (push, SMS, email), emergency dispatch, and alert escalation for timely response.',
      diagram: AlertChannelsDiagram,
      details: [
        {
          name: 'Multi-Channel Notifications',
          diagram: AlertChannelsDiagram,
          explanation: 'Alert Service routes notifications through multiple channels based on priority: Push (FCM/APNS) for fastest delivery, SMS (Twilio) for critical alarms, Email for low-priority events. Each user configures notification preferences. Delivery confirmation required - if push fails, fallback to SMS. Rate limiting prevents alert fatigue (max 5 non-critical per hour).',
          codeExample: `// Alert Service - Multi-Channel Notification
class AlertService {
  private channels = {
    push: new PushNotificationService(),
    sms: new TwilioService(),
    email: new SendGridService()
  };

  async sendAlert(alert: Alert): Promise<DeliveryReport> {
    const user = await this.userService.getUser(alert.userId);
    const preferences = user.notificationPreferences;

    // Determine channels based on priority
    const channels = this.selectChannels(alert.priority, preferences);

    const results: DeliveryResult[] = [];

    for (const channel of channels) {
      try {
        const result = await this.sendViaChannel(channel, alert, user);
        results.push(result);

        // For critical alerts, require acknowledgment
        if (alert.priority === 'CRITICAL') {
          const acked = await this.waitForAck(alert.id, channel, 60_000);
          if (acked) break;  // Stop trying other channels
        } else if (result.delivered) {
          break;  // Non-critical: first success is enough
        }
      } catch (error) {
        results.push({ channel, delivered: false, error });
      }
    }

    return { alertId: alert.id, results };
  }

  private selectChannels(priority: Priority, prefs: Preferences): Channel[] {
    switch (priority) {
      case 'CRITICAL':
        return ['push', 'sms', 'email'];  // All channels
      case 'HIGH':
        return ['push', 'sms'];
      case 'MEDIUM':
        return prefs.enablePush ? ['push'] : ['email'];
      case 'LOW':
        return ['email'];
    }
  }
}`
        },
        {
          name: 'Emergency Dispatch',
          diagram: AlertChannelsDiagram,
          explanation: 'Automatic emergency dispatch for critical events. Fire alarms trigger 911 auto-dial with building address and apartment number. Break-in alarms notify police with entry point details. Integration with professional monitoring company (ADT, SimpliSafe) for 24/7 human verification before dispatch. Panic button provides one-touch emergency response.',
          codeExample: `// Emergency Dispatch Service
class EmergencyDispatchService {
  private readonly MONITORING_CENTER = 'wss://monitoring.secureco.com';

  async dispatch(event: CriticalEvent): Promise<DispatchResult> {
    const building = await this.getBuildingInfo(event.buildingId);

    // 1. Notify professional monitoring center
    const monitoringResult = await this.notifyMonitoringCenter({
      type: event.type,
      building: building,
      apartment: event.apartmentId,
      timestamp: event.timestamp,
      sensorData: event.rawData,
      videoClipUrl: await this.getVideoClip(event)
    });

    // 2. If monitoring center confirms threat, dispatch emergency services
    if (monitoringResult.threatConfirmed || event.type === 'FIRE') {
      const emergencyResponse = await this.callEmergencyServices({
        service: this.mapToEmergencyService(event.type),
        address: building.address,
        unit: event.apartmentId,
        emergencyType: event.type,
        additionalInfo: \`Alarm triggered at \${event.location}. \` +
          \`Building access code: \${building.emergencyAccessCode}\`
      });

      // 3. Log dispatch for compliance
      await this.logDispatch(event, emergencyResponse);

      return {
        dispatched: true,
        emergencyService: emergencyResponse.service,
        eta: emergencyResponse.estimatedArrival,
        caseNumber: emergencyResponse.caseId
      };
    }

    return { dispatched: false, reason: 'threat_not_confirmed' };
  }

  private mapToEmergencyService(type: string): string {
    const mapping = {
      'FIRE': '911-FIRE',
      'SMOKE': '911-FIRE',
      'INTRUSION': '911-POLICE',
      'PANIC': '911-POLICE',
      'MEDICAL': '911-EMS'
    };
    return mapping[type] || '911';
  }
}`
        },
        {
          name: 'Alert Escalation',
          diagram: AlertChannelsDiagram,
          explanation: 'Escalation ladder ensures alarms are not ignored. If resident does not acknowledge within 5 minutes, escalate to emergency contacts. After 10 minutes, notify building management. After 15 minutes, dispatch security guard. Critical alarms (fire, panic) skip escalation and dispatch immediately. All escalations logged for audit.',
          codeExample: `// Alert Escalation Service
class AlertEscalationService {
  private readonly escalationLadder: EscalationStep[] = [
    { delayMinutes: 0, target: 'resident', channels: ['push', 'sms'] },
    { delayMinutes: 5, target: 'emergency_contacts', channels: ['push', 'sms'] },
    { delayMinutes: 10, target: 'building_management', channels: ['push', 'sms', 'email'] },
    { delayMinutes: 15, target: 'security_dispatch', channels: ['internal'] },
    { delayMinutes: 20, target: 'monitoring_center', channels: ['direct'] }
  ];

  async startEscalation(alert: Alert): Promise<void> {
    // Critical alerts bypass escalation - immediate dispatch
    if (alert.priority === 'CRITICAL') {
      await this.emergencyDispatch.dispatch(alert);
      return;
    }

    // Start escalation timer
    const escalationId = await this.createEscalation(alert);

    for (const step of this.escalationLadder) {
      // Wait for acknowledgment or timeout
      const timeout = step.delayMinutes * 60 * 1000;
      const acknowledged = await this.waitForAck(alert.id, timeout);

      if (acknowledged) {
        await this.closeEscalation(escalationId, 'acknowledged', step.target);
        return;
      }

      // Escalate to next level
      const targets = await this.getTargets(alert.apartmentId, step.target);
      await this.sendToTargets(alert, targets, step.channels);

      await this.logEscalation(escalationId, step);
    }

    // All escalation steps exhausted - final action
    await this.emergencyDispatch.dispatch(alert);
  }
}`
        }
      ]
    },
    {
      id: 'video-surveillance',
      name: 'Video Surveillance',
      icon: '📹',
      color: '#8b5cf6',
      description: 'IP camera streaming, NVR recording, AI motion detection, and live monitoring for common areas.',
      diagram: VideoStreamingDiagram,
      details: [
        {
          name: 'Video Streaming',
          diagram: VideoStreamingDiagram,
          explanation: 'IP cameras stream 1080p video via RTSP to local NVR (Frigate or Shinobi). H.265 compression reduces bandwidth by 50% vs H.264. HLS streaming for mobile/web viewing with adaptive bitrate. CDN distribution for low-latency live view. WebRTC for two-way audio (door intercoms). Cameras in common areas only - lobby, parking, hallways (not near apartment doors for privacy).',
          codeExample: `// Video Streaming Service
class VideoStreamingService {
  private readonly nvrEndpoint = 'rtsp://nvr.local:554';
  private readonly hlsEndpoint = 'https://cdn.securealarm.com/hls';

  async getLiveStream(cameraId: string, userId: string): Promise<StreamInfo> {
    // Verify user has permission to view this camera
    await this.authService.verifyVideoAccess(userId, cameraId);

    // Get camera configuration
    const camera = await this.cameraRegistry.get(cameraId);

    // Generate time-limited signed URL for HLS stream
    const streamToken = await this.generateStreamToken(cameraId, userId, 3600);

    return {
      streamUrl: \`\${this.hlsEndpoint}/\${cameraId}/playlist.m3u8?token=\${streamToken}\`,
      format: 'HLS',
      quality: {
        available: ['1080p', '720p', '480p', '360p'],
        adaptive: true
      },
      features: {
        twoWayAudio: camera.hasAudio,
        ptz: camera.hasPTZ,
        nightVision: camera.hasIR
      }
    };
  }

  async getRecordedClip(cameraId: string, startTime: Date, endTime: Date): Promise<ClipInfo> {
    // Clips are stored in S3 with 30-day retention
    const clipPath = \`recordings/\${cameraId}/\${formatDate(startTime)}.mp4\`;

    const signedUrl = await this.s3.getSignedUrl('getObject', {
      Bucket: 'alarm-video-storage',
      Key: clipPath,
      Expires: 3600  // 1 hour
    });

    return { url: signedUrl, duration: diffSeconds(startTime, endTime) };
  }
}`
        },
        {
          name: 'Recording & Storage',
          diagram: VideoStreamingDiagram,
          explanation: '24/7 continuous recording to local NAS with cloud backup to S3. 30-day retention for common areas, 90 days for incident-flagged clips. Motion-triggered recording reduces storage: only record when activity detected. H.265 at 2Mbps = ~21GB per camera per day. Total storage for 50 cameras: ~1TB/day, ~30TB for 30 days.',
          codeExample: `// Video Recording & Storage Service
class VideoStorageService {
  private readonly RETENTION_DAYS = {
    continuous: 30,
    incident: 90,
    flagged: 365
  };

  async saveRecording(cameraId: string, segment: VideoSegment): Promise<void> {
    // Determine storage tier based on motion detection
    const hasMotion = await this.motionDetector.analyze(segment);
    const tier = hasMotion ? 'motion' : 'continuous';

    // Local NAS for immediate access
    await this.nas.store({
      path: \`/recordings/\${cameraId}/\${segment.date}/\${segment.time}.mp4\`,
      data: segment.data,
      tier: tier
    });

    // Async upload to S3 for redundancy
    await this.uploadQueue.add({
      cameraId,
      segment,
      priority: hasMotion ? 'high' : 'low'
    });
  }

  async flagForRetention(clipId: string, reason: string): Promise<void> {
    // Mark clip for extended retention (incident review)
    await this.db.clips.update(clipId, {
      retentionDays: this.RETENTION_DAYS.incident,
      flagReason: reason,
      flaggedAt: new Date()
    });
  }

  // Cleanup job runs nightly
  async cleanupExpiredRecordings(): Promise<void> {
    const cutoffDate = subDays(new Date(), this.RETENTION_DAYS.continuous);

    const expired = await this.db.clips.findExpired(cutoffDate);

    for (const clip of expired) {
      // Skip if flagged for longer retention
      if (clip.flaggedAt) continue;

      await this.nas.delete(clip.path);
      await this.s3.delete(clip.s3Key);
      await this.db.clips.delete(clip.id);
    }
  }
}`
        },
        {
          name: 'AI Motion Detection',
          diagram: VideoStreamingDiagram,
          explanation: 'Edge AI running on Coral TPU or NVIDIA Jetson for real-time object detection. Distinguishes persons, vehicles, animals to reduce false alarms. Face recognition for access control (optional). License plate recognition for parking. Privacy zones mask windows and balconies. Models: YOLO for detection, ArcFace for recognition.',
          codeExample: `// AI Motion Detection Service
class AIMotionDetectionService {
  private detector: ObjectDetector;
  private faceRecognizer: FaceRecognizer;

  constructor() {
    // Load models for edge TPU
    this.detector = new ObjectDetector('yolov8n_edgetpu.tflite');
    this.faceRecognizer = new FaceRecognizer('arcface_edgetpu.tflite');
  }

  async analyzeFrame(frame: VideoFrame, cameraId: string): Promise<DetectionResult> {
    // Apply privacy mask before processing
    const maskedFrame = await this.applyPrivacyMask(frame, cameraId);

    // Run object detection
    const detections = await this.detector.detect(maskedFrame);

    // Filter and classify
    const results: Detection[] = [];

    for (const detection of detections) {
      if (detection.confidence < 0.7) continue;

      if (detection.class === 'person') {
        // Optionally run face recognition for access control cameras
        if (this.isFaceRecognitionEnabled(cameraId)) {
          const face = await this.faceRecognizer.identify(detection.boundingBox);
          if (face.match) {
            results.push({
              type: 'known_person',
              identity: face.identity,
              confidence: face.confidence
            });
            continue;
          }
        }

        results.push({ type: 'unknown_person', confidence: detection.confidence });
      } else if (detection.class === 'vehicle') {
        results.push({ type: 'vehicle', confidence: detection.confidence });
      } else if (['dog', 'cat'].includes(detection.class)) {
        results.push({ type: 'pet', confidence: detection.confidence });
      }
    }

    return { detections: results, frameTime: frame.timestamp };
  }
}`
        }
      ]
    },
    {
      id: 'access-control',
      name: 'Access Control',
      icon: '🔑',
      color: '#10b981',
      description: 'RFID keycards, PIN codes, mobile app unlock, biometrics, and guest access management.',
      diagram: AccessControlDiagram,
      details: [
        {
          name: 'Entry Methods',
          diagram: AccessControlDiagram,
          explanation: 'Multiple entry methods for convenience and security: RFID keycards/fobs (contactless, no battery), PIN codes (4-8 digits, can be temporary), Mobile app (Bluetooth/NFC proximity unlock), Biometric (fingerprint or face recognition for high-security areas). Each method logs entry with timestamp, user ID, and location. Two-factor authentication optional for sensitive areas.',
          codeExample: `// Access Control Entry Methods
class AccessControlService {
  async validateEntry(request: EntryRequest): Promise<EntryResult> {
    let credential: ValidatedCredential;

    switch (request.method) {
      case 'rfid':
        credential = await this.validateRFID(request.cardId);
        break;

      case 'pin':
        credential = await this.validatePIN(request.pin, request.readerId);
        break;

      case 'mobile':
        credential = await this.validateMobileCredential(
          request.userId,
          request.bleToken,
          request.readerId
        );
        break;

      case 'biometric':
        credential = await this.validateBiometric(
          request.biometricData,
          request.readerId
        );
        break;
    }

    if (!credential.valid) {
      await this.logFailedAttempt(request);
      return { allowed: false, reason: credential.reason };
    }

    // Check access permissions for this door
    const hasAccess = await this.checkPermissions(
      credential.userId,
      request.doorId,
      new Date()
    );

    if (!hasAccess) {
      await this.logDeniedAccess(request, credential.userId);
      return { allowed: false, reason: 'no_permission' };
    }

    // Unlock door
    await this.unlockDoor(request.doorId, 5000);  // 5 second unlock

    // Log successful entry
    await this.logEntry(request, credential.userId);

    return { allowed: true, userId: credential.userId };
  }
}`
        },
        {
          name: 'Access Logs',
          diagram: AccessControlDiagram,
          explanation: 'Comprehensive access logging for security audit and compliance. Every entry/exit recorded with: timestamp, user ID, door/reader ID, entry method, success/failure. Failed attempts trigger alerts after 3 consecutive failures. Logs retained for 1 year for compliance. Real-time dashboard shows who is in building. Export to CSV/PDF for reports.',
          codeExample: `// Access Log Service
interface AccessLogEntry {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  doorId: string;
  doorName: string;
  method: 'rfid' | 'pin' | 'mobile' | 'biometric';
  result: 'granted' | 'denied' | 'failed';
  reason?: string;
  apartmentId?: string;
}

class AccessLogService {
  private readonly FAILED_ATTEMPT_THRESHOLD = 3;

  async logAccess(entry: AccessLogEntry): Promise<void> {
    // Store in TimescaleDB for time-series queries
    await this.db.accessLogs.insert(entry);

    // Check for suspicious activity
    if (entry.result !== 'granted') {
      await this.checkSuspiciousActivity(entry);
    }

    // Update presence tracking
    if (entry.result === 'granted') {
      await this.presenceService.updateLocation(
        entry.userId,
        entry.doorId,
        entry.timestamp
      );
    }
  }

  async checkSuspiciousActivity(entry: AccessLogEntry): Promise<void> {
    // Count recent failed attempts
    const recentFails = await this.db.accessLogs.count({
      doorId: entry.doorId,
      result: { $in: ['denied', 'failed'] },
      timestamp: { $gte: subMinutes(new Date(), 5) }
    });

    if (recentFails >= this.FAILED_ATTEMPT_THRESHOLD) {
      await this.alertService.send({
        type: 'suspicious_access',
        severity: 'HIGH',
        doorId: entry.doorId,
        message: \`\${recentFails} failed access attempts in 5 minutes\`,
        notifyBuilding: true
      });
    }
  }

  async generateReport(buildingId: string, dateRange: DateRange): Promise<Report> {
    const logs = await this.db.accessLogs.find({
      buildingId,
      timestamp: { $gte: dateRange.start, $lte: dateRange.end }
    });

    return {
      totalEntries: logs.filter(l => l.result === 'granted').length,
      deniedAttempts: logs.filter(l => l.result !== 'granted').length,
      uniqueUsers: new Set(logs.map(l => l.userId)).size,
      peakHour: this.findPeakHour(logs),
      logs: logs
    };
  }
}`
        },
        {
          name: 'Guest Access',
          diagram: AccessControlDiagram,
          explanation: 'Temporary access for visitors, delivery persons, and service providers. Residents generate time-limited PIN codes (2-hour window) via mobile app. Delivery lockers with one-time codes. Service provider access (cleaners, maintenance) with recurring schedules. All guest access logged and automatically revoked after expiration.',
          codeExample: `// Guest Access Service
class GuestAccessService {
  async createGuestCode(request: GuestCodeRequest): Promise<GuestCode> {
    // Verify resident has permission to create guest codes
    await this.authService.verifyResident(request.residentId, request.apartmentId);

    // Generate unique PIN code
    const pin = this.generateUniquePin(6);

    // Create time-limited access
    const guestCode: GuestCode = {
      id: uuid(),
      pin: pin,
      createdBy: request.residentId,
      apartmentId: request.apartmentId,
      guestName: request.guestName,
      guestPhone: request.guestPhone,
      accessAreas: request.accessAreas || ['main_entrance', 'elevator'],
      validFrom: request.validFrom || new Date(),
      validUntil: request.validUntil,
      maxUses: request.maxUses || 1,
      usesRemaining: request.maxUses || 1
    };

    await this.db.guestCodes.insert(guestCode);

    // Send PIN to guest via SMS
    if (request.sendSms && request.guestPhone) {
      await this.smsService.send(request.guestPhone,
        \`Your guest access code for \${request.buildingName}: \${pin}. \\n\` +
        \`Valid: \${formatDateTime(guestCode.validFrom)} - \${formatDateTime(guestCode.validUntil)}\`
      );
    }

    return guestCode;
  }

  async validateGuestCode(pin: string, doorId: string): Promise<ValidationResult> {
    const code = await this.db.guestCodes.findByPin(pin);

    if (!code) {
      return { valid: false, reason: 'invalid_code' };
    }

    const now = new Date();

    if (now < code.validFrom || now > code.validUntil) {
      return { valid: false, reason: 'expired' };
    }

    if (code.usesRemaining <= 0) {
      return { valid: false, reason: 'max_uses_exceeded' };
    }

    if (!code.accessAreas.includes(doorId)) {
      return { valid: false, reason: 'no_access_to_door' };
    }

    // Decrement uses
    await this.db.guestCodes.update(code.id, {
      usesRemaining: code.usesRemaining - 1
    });

    return { valid: true, guestName: code.guestName };
  }
}`
        }
      ]
    },
    {
      id: 'system-reliability',
      name: 'System Reliability',
      icon: '🔄',
      color: '#3b82f6',
      description: 'Dual communication, battery backup, edge processing, and data retention for 99.99% availability.',
      diagram: RedundancyDiagram,
      details: [
        {
          name: 'Dual Communication',
          diagram: RedundancyDiagram,
          explanation: 'Primary WiFi/Ethernet connection with cellular (4G/5G) backup. Automatic failover within 10 seconds if primary fails. Cellular module in IoT gateway with pre-paid data plan. Heartbeat monitoring detects connection loss. Both paths encrypted with TLS 1.3. Cellular used for critical alerts even when WiFi available (redundant path).',
          codeExample: `// Dual Communication Handler
class DualCommunicationService {
  private primaryConnection: Connection;
  private backupConnection: Connection;
  private activeConnection: 'primary' | 'backup' = 'primary';

  private readonly FAILOVER_TIMEOUT_MS = 10_000;
  private readonly HEARTBEAT_INTERVAL_MS = 5_000;

  async initialize(): Promise<void> {
    // Initialize both connections
    this.primaryConnection = new WiFiConnection(this.config.wifi);
    this.backupConnection = new CellularConnection(this.config.cellular);

    // Start heartbeat monitoring
    this.startHeartbeatMonitor();
  }

  private startHeartbeatMonitor(): void {
    setInterval(async () => {
      const primaryHealthy = await this.checkHealth(this.primaryConnection);

      if (!primaryHealthy && this.activeConnection === 'primary') {
        console.log('Primary connection failed, switching to backup');
        await this.switchToBackup();
      } else if (primaryHealthy && this.activeConnection === 'backup') {
        console.log('Primary connection restored, switching back');
        await this.switchToPrimary();
      }
    }, this.HEARTBEAT_INTERVAL_MS);
  }

  async sendMessage(message: Message): Promise<void> {
    const connection = this.getActiveConnection();

    try {
      await connection.send(message, { timeout: this.FAILOVER_TIMEOUT_MS });
    } catch (error) {
      // Failover on send failure
      await this.failover();
      await this.getActiveConnection().send(message);
    }

    // For critical messages, also send via backup path
    if (message.priority === 'CRITICAL') {
      await this.backupConnection.send(message).catch(() => {
        // Log but don't fail - primary already succeeded
        console.warn('Backup path failed for critical message');
      });
    }
  }
}`
        },
        {
          name: 'Battery Backup',
          diagram: RedundancyDiagram,
          explanation: 'UPS for IoT gateway provides 24-hour runtime during power outage. All sensors battery-powered with 2+ year lifespan. Low battery alerts at 20% threshold. Cloud-synced battery status for proactive replacement. Gateway stores 7 days of events locally during extended outage. Automatic sync when power/connection restored.',
          codeExample: `// Battery & Power Management
class PowerManagementService {
  private readonly LOW_BATTERY_THRESHOLD = 20;
  private readonly CRITICAL_BATTERY_THRESHOLD = 10;

  async checkBatteryStatus(): Promise<BatteryReport> {
    const devices = await this.deviceRegistry.getAllDevices();
    const report: BatteryReport = {
      healthy: [],
      low: [],
      critical: [],
      ups: await this.getUPSStatus()
    };

    for (const device of devices) {
      if (!device.hasBattery) continue;

      const status = await this.getBatteryLevel(device.id);

      if (status.level < this.CRITICAL_BATTERY_THRESHOLD) {
        report.critical.push({ device, level: status.level });
        await this.sendCriticalBatteryAlert(device, status);
      } else if (status.level < this.LOW_BATTERY_THRESHOLD) {
        report.low.push({ device, level: status.level });
        await this.sendLowBatteryAlert(device, status);
      } else {
        report.healthy.push({ device, level: status.level });
      }
    }

    return report;
  }

  async handlePowerOutage(): Promise<void> {
    console.log('Power outage detected, switching to battery backup');

    // 1. Reduce non-essential operations
    await this.reducePollingFrequency();

    // 2. Disable non-critical logging
    await this.setEssentialLoggingOnly();

    // 3. Notify monitoring center
    await this.alertService.send({
      type: 'power_outage',
      severity: 'HIGH',
      message: 'Building power outage - running on battery backup',
      estimatedRuntime: await this.getEstimatedRuntime()
    });

    // 4. Continue core alarm functionality
    // Alarms, sensors, and critical alerts continue normally
  }
}`
        },
        {
          name: 'Data Retention',
          diagram: RedundancyDiagram,
          explanation: 'Tiered storage for cost optimization: Hot (30 days) in TimescaleDB for fast queries, Warm (90 days) compressed, Cold (1 year) in S3 Glacier for compliance. Video: 30 days rolling, incident clips 1 year. GDPR/CCPA compliant with right to deletion. Automatic data lifecycle management. Audit logs immutable for 7 years.',
          codeExample: `// Data Retention & Lifecycle Management
class DataRetentionService {
  private readonly RETENTION_POLICIES = {
    sensorEvents: {
      hot: 30,      // Days in TimescaleDB
      warm: 90,     // Days compressed
      cold: 365,    // Days in Glacier
      delete: 730   // Days until deletion
    },
    accessLogs: {
      hot: 90,
      warm: 365,
      cold: 2555,   // 7 years for compliance
      delete: null  // Never auto-delete
    },
    videoRecordings: {
      continuous: 30,
      motionClips: 90,
      incidentFlagged: 365,
      delete: 400
    }
  };

  // Run nightly
  async runLifecycleManagement(): Promise<void> {
    const now = new Date();

    // Migrate sensor events to warm storage
    const warmCutoff = subDays(now, this.RETENTION_POLICIES.sensorEvents.hot);
    await this.compressAndArchive('sensor_events', warmCutoff, 'warm');

    // Migrate warm to cold (Glacier)
    const coldCutoff = subDays(now, this.RETENTION_POLICIES.sensorEvents.warm);
    await this.migrateToGlacier('sensor_events', coldCutoff);

    // Delete expired data
    const deleteCutoff = subDays(now, this.RETENTION_POLICIES.sensorEvents.delete);
    await this.deleteExpired('sensor_events', deleteCutoff);

    // Video cleanup
    await this.cleanupExpiredVideos();
  }

  // GDPR: Right to be forgotten
  async deleteUserData(userId: string): Promise<DeletionReport> {
    const tables = ['sensor_events', 'access_logs', 'alerts', 'user_preferences'];
    const report: DeletionReport = { tablesProcessed: [], recordsDeleted: 0 };

    for (const table of tables) {
      const count = await this.db[table].delete({ userId });
      report.tablesProcessed.push(table);
      report.recordsDeleted += count;
    }

    // Anonymize video metadata (can't delete video of common areas)
    await this.anonymizeVideoMetadata(userId);

    return report;
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
      { name: 'System Design', icon: '🏗️', page: 'Design' },
      { name: 'Apartment Alarm System', icon: '🚨', page: 'ApartmentAlarmSystem' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #450a0a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #f87171, #ef4444)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '0.5rem',
    color: '#f87171',
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
        <h1 style={titleStyle}>Apartment Alarm System</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
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
              {concept.details.length} topics • Click to explore
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
                      language="typescript"
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

export default ApartmentAlarmSystem

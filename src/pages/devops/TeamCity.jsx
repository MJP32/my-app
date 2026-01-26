import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

const TEAMCITY_COLORS = {
  primary: '#6366f1',
  primaryHover: '#818cf8',
  bg: 'rgba(99, 102, 241, 0.1)',
  border: 'rgba(99, 102, 241, 0.3)',
  arrow: '#6366f1',
  hoverBg: 'rgba(99, 102, 241, 0.2)',
  topicBg: 'rgba(99, 102, 241, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// TeamCity Architecture Diagram
const TeamCityArchitectureDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">TeamCity Architecture</text>

    {/* Server */}
    <rect x="250" y="40" width="200" height="60" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="65" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">TeamCity Server</text>
    <text x="350" y="85" textAnchor="middle" fill="#93c5fd" fontSize="9">Build Queue • Configuration • UI</text>

    {/* Build Queue */}
    <rect x="480" y="40" width="150" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="555" y="65" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Build Queue</text>
    <text x="555" y="82" textAnchor="middle" fill="#fcd34d" fontSize="8">Prioritized Jobs</text>

    {/* Agents */}
    <rect x="50" y="130" width="120" height="40" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="110" y="155" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Agent 1</text>

    <rect x="190" y="130" width="120" height="40" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="250" y="155" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Agent 2</text>

    <rect x="330" y="130" width="120" height="40" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="390" y="155" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Agent 3</text>

    <rect x="470" y="130" width="120" height="40" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="530" y="155" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Cloud Agent</text>

    {/* Connections */}
    <line x1="350" y1="100" x2="110" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="4"/>
    <line x1="350" y1="100" x2="250" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="4"/>
    <line x1="350" y1="100" x2="390" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="4"/>
    <line x1="350" y1="100" x2="530" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="4"/>
    <line x1="450" y1="70" x2="480" y2="70" stroke="#f59e0b" strokeWidth="2"/>
  </svg>
)

// Build Chain Diagram
const BuildChainDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Build Chain - Dependency Flow</text>

    {/* Build stages */}
    <rect x="30" y="50" width="120" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="90" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Compile</text>
    <text x="90" y="88" textAnchor="middle" fill="#93c5fd" fontSize="7">Source Code</text>

    <rect x="180" y="50" width="120" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="240" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Unit Tests</text>
    <text x="240" y="88" textAnchor="middle" fill="#86efac" fontSize="7">Test Suite</text>

    <rect x="330" y="50" width="120" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="390" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Integration</text>
    <text x="390" y="88" textAnchor="middle" fill="#fcd34d" fontSize="7">API Tests</text>

    <rect x="480" y="50" width="120" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="540" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Deploy</text>
    <text x="540" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="7">Production</text>

    {/* Arrows */}
    <path d="M 150 75 L 175 75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 300 75 L 325 75" stroke="#fbbf24" strokeWidth="2"/>
    <path d="M 450 75 L 475 75" stroke="#a78bfa" strokeWidth="2"/>

    {/* Artifact flow */}
    <rect x="180" y="115" width="300" height="30" rx="4" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1"/>
    <text x="330" y="135" textAnchor="middle" fill="#f87171" fontSize="9">Artifacts flow through snapshot dependencies</text>
  </svg>
)

// Kotlin DSL Diagram
const KotlinDSLDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Configuration as Code - Kotlin DSL vs XML</text>

    {/* Kotlin DSL */}
    <rect x="50" y="45" width="280" height="90" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="190" y="70" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Kotlin DSL</text>
    <text x="190" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="8">Type-safe • IDE support</text>
    <text x="190" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="8">Refactorable • Version control</text>
    <text x="190" y="120" textAnchor="middle" fill="#c4b5fd" fontSize="8">Reusable components</text>

    {/* XML */}
    <rect x="370" y="45" width="280" height="90" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="510" y="70" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">XML Configuration</text>
    <text x="510" y="90" textAnchor="middle" fill="#fcd34d" fontSize="8">Traditional format</text>
    <text x="510" y="105" textAnchor="middle" fill="#fcd34d" fontSize="8">UI-generated</text>
    <text x="510" y="120" textAnchor="middle" fill="#fcd34d" fontSize="8">Portable settings</text>

    {/* Conversion arrow */}
    <path d="M 330 90 L 365 90" stroke="#64748b" strokeWidth="2" strokeDasharray="4"/>
    <text x="347" y="80" textAnchor="middle" fill="#64748b" fontSize="8">sync</text>
  </svg>
)

// Agent Pool Diagram
const AgentPoolDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Agent Pool Management</text>

    {/* Linux Pool */}
    <rect x="30" y="45" width="200" height="80" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="130" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Linux Pool</text>
    <rect x="50" y="82" width="50" height="30" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="75" y="102" textAnchor="middle" fill="#4ade80" fontSize="7">Agent 1</text>
    <rect x="110" y="82" width="50" height="30" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="135" y="102" textAnchor="middle" fill="#4ade80" fontSize="7">Agent 2</text>
    <rect x="170" y="82" width="50" height="30" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="195" y="102" textAnchor="middle" fill="#4ade80" fontSize="7">Agent 3</text>

    {/* Windows Pool */}
    <rect x="250" y="45" width="200" height="80" rx="8" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Windows Pool</text>
    <rect x="270" y="82" width="50" height="30" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="295" y="102" textAnchor="middle" fill="#4ade80" fontSize="7">Agent 1</text>
    <rect x="330" y="82" width="50" height="30" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="355" y="102" textAnchor="middle" fill="#4ade80" fontSize="7">Agent 2</text>
    <rect x="390" y="82" width="50" height="30" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="415" y="102" textAnchor="middle" fill="#fbbf24" fontSize="7">Cloud</text>

    {/* Docker Pool */}
    <rect x="470" y="45" width="200" height="80" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="570" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Docker Pool</text>
    <rect x="490" y="82" width="50" height="30" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="515" y="102" textAnchor="middle" fill="#4ade80" fontSize="7">Container</text>
    <rect x="550" y="82" width="50" height="30" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="575" y="102" textAnchor="middle" fill="#4ade80" fontSize="7">Container</text>
    <rect x="610" y="82" width="50" height="30" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="635" y="102" textAnchor="middle" fill="#4ade80" fontSize="7">Container</text>

    {/* Requirements */}
    <rect x="150" y="140" width="400" height="30" rx="4" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1"/>
    <text x="350" y="160" textAnchor="middle" fill="#f87171" fontSize="9">Agent requirements match builds to compatible pools</text>
  </svg>
)

// Docker Integration Diagram
const DockerIntegrationDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">TeamCity Docker Integration</text>

    {/* TeamCity Server */}
    <rect x="50" y="50" width="140" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="80" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">TeamCity Server</text>
    <text x="120" y="100" textAnchor="middle" fill="#93c5fd" fontSize="8">Build Configs</text>

    {/* Docker Runner */}
    <rect x="240" y="50" width="140" height="70" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="310" y="75" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Docker Runner</text>
    <text x="310" y="95" textAnchor="middle" fill="#a5f3fc" fontSize="8">Build/Push/Pull</text>
    <text x="310" y="110" textAnchor="middle" fill="#a5f3fc" fontSize="8">docker-compose</text>

    {/* Docker Registry */}
    <rect x="430" y="50" width="140" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="500" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Container Registry</text>
    <text x="500" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">DockerHub/ECR</text>
    <text x="500" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="8">Harbor/GCR</text>

    {/* Docker Agents */}
    <rect x="620" y="50" width="140" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="690" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Docker Agents</text>
    <text x="690" y="95" textAnchor="middle" fill="#86efac" fontSize="8">Ephemeral containers</text>
    <text x="690" y="110" textAnchor="middle" fill="#86efac" fontSize="8">Auto-scaling</text>

    {/* Arrows */}
    <path d="M 190 85 L 235 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 380 85 L 425 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 570 85 L 615 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>

    {/* Features */}
    <rect x="150" y="145" width="500" height="35" rx="4" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="400" y="168" textAnchor="middle" fill="#22d3ee" fontSize="9">Multi-stage builds • Layer caching • Image cleanup • Docker Wrapper</text>
  </svg>
)

// Testing Integration Diagram
const TestingIntegrationDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">TeamCity Test Reporting</text>

    {/* Test Runners */}
    <rect x="50" y="45" width="180" height="80" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="140" y="68" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Test Runners</text>
    <text x="140" y="88" textAnchor="middle" fill="#86efac" fontSize="8">JUnit • TestNG • NUnit</text>
    <text x="140" y="103" textAnchor="middle" fill="#86efac" fontSize="8">Cypress • Selenium</text>
    <text x="140" y="118" textAnchor="middle" fill="#86efac" fontSize="8">pytest • Jest</text>

    {/* Service Messages */}
    <rect x="280" y="45" width="140" height="80" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="68" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Service Messages</text>
    <text x="350" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">##teamcity[...]</text>
    <text x="350" y="103" textAnchor="middle" fill="#fcd34d" fontSize="8">Real-time streaming</text>
    <text x="350" y="118" textAnchor="middle" fill="#fcd34d" fontSize="8">Test metadata</text>

    {/* Test Results */}
    <rect x="470" y="45" width="140" height="80" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="540" y="68" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Test Analysis</text>
    <text x="540" y="88" textAnchor="middle" fill="#93c5fd" fontSize="8">Flaky test detection</text>
    <text x="540" y="103" textAnchor="middle" fill="#93c5fd" fontSize="8">History & trends</text>
    <text x="540" y="118" textAnchor="middle" fill="#93c5fd" fontSize="8">Muted tests</text>

    {/* Coverage */}
    <rect x="660" y="45" width="110" height="80" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="715" y="68" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Coverage</text>
    <text x="715" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="8">JaCoCo</text>
    <text x="715" y="103" textAnchor="middle" fill="#c4b5fd" fontSize="8">dotCover</text>
    <text x="715" y="118" textAnchor="middle" fill="#c4b5fd" fontSize="8">Istanbul</text>

    {/* Arrows */}
    <path d="M 230 85 L 275 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 420 85 L 465 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 610 85 L 655 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>

    {/* Footer */}
    <rect x="150" y="145" width="500" height="35" rx="4" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1"/>
    <text x="400" y="168" textAnchor="middle" fill="#4ade80" fontSize="9">Parallel test execution • Test grouping • Re-run failed tests • Build problem detection</text>
  </svg>
)

// Security Diagram
const SecurityDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">TeamCity Security Features</text>

    {/* Authentication */}
    <rect x="50" y="50" width="140" height="65" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Authentication</text>
    <text x="120" y="93" textAnchor="middle" fill="#93c5fd" fontSize="8">LDAP/AD • SAML</text>
    <text x="120" y="108" textAnchor="middle" fill="#93c5fd" fontSize="8">2FA • OAuth</text>

    {/* Authorization */}
    <rect x="210" y="50" width="140" height="65" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="280" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Authorization</text>
    <text x="280" y="93" textAnchor="middle" fill="#86efac" fontSize="8">Role-based access</text>
    <text x="280" y="108" textAnchor="middle" fill="#86efac" fontSize="8">Project permissions</text>

    {/* Secrets */}
    <rect x="370" y="50" width="140" height="65" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="440" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Secrets Management</text>
    <text x="440" y="93" textAnchor="middle" fill="#fcd34d" fontSize="8">HashiCorp Vault</text>
    <text x="440" y="108" textAnchor="middle" fill="#fcd34d" fontSize="8">Secure parameters</text>

    {/* Audit */}
    <rect x="530" y="50" width="140" height="65" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Audit & Compliance</text>
    <text x="600" y="93" textAnchor="middle" fill="#c4b5fd" fontSize="8">Action audit log</text>
    <text x="600" y="108" textAnchor="middle" fill="#c4b5fd" fontSize="8">Change tracking</text>

    {/* Agent Security */}
    <rect x="690" y="50" width="90" height="65" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="735" y="75" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Agents</text>
    <text x="735" y="93" textAnchor="middle" fill="#fbcfe8" fontSize="8">TLS comms</text>
    <text x="735" y="108" textAnchor="middle" fill="#fbcfe8" fontSize="8">Auth tokens</text>

    {/* Footer */}
    <rect x="100" y="135" width="600" height="45" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1"/>
    <text x="400" y="155" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Security Best Practices</text>
    <text x="400" y="172" textAnchor="middle" fill="#fca5a5" fontSize="8">Clean checkout • Hidden passwords in logs • Restricted agent access • HTTPS everywhere</text>
  </svg>
)

// Integrations Diagram
const IntegrationsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">TeamCity Integrations</text>

    {/* TeamCity Hub */}
    <circle cx="400" cy="100" r="50" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="95" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">TeamCity</text>
    <text x="400" y="112" textAnchor="middle" fill="#93c5fd" fontSize="8">Server</text>

    {/* IDE Integration */}
    <rect x="50" y="40" width="110" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="105" y="62" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">JetBrains IDEs</text>
    <text x="105" y="78" textAnchor="middle" fill="#c4b5fd" fontSize="7">IntelliJ, WebStorm</text>
    <line x1="160" y1="65" x2="350" y2="85" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3"/>

    {/* VCS */}
    <rect x="50" y="110" width="110" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="105" y="132" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Version Control</text>
    <text x="105" y="148" textAnchor="middle" fill="#fcd34d" fontSize="7">GitHub, GitLab, BB</text>
    <line x1="160" y1="135" x2="350" y2="110" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3"/>

    {/* Cloud */}
    <rect x="640" y="40" width="110" height="50" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="695" y="62" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Cloud Providers</text>
    <text x="695" y="78" textAnchor="middle" fill="#a5f3fc" fontSize="7">AWS, Azure, GCP</text>
    <line x1="640" y1="65" x2="450" y2="85" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3"/>

    {/* Issue Trackers */}
    <rect x="640" y="110" width="110" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="695" y="132" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Issue Trackers</text>
    <text x="695" y="148" textAnchor="middle" fill="#86efac" fontSize="7">Jira, YouTrack</text>
    <line x1="640" y1="135" x2="450" y2="110" stroke="#22c55e" strokeWidth="1" strokeDasharray="3"/>

    {/* Notifications */}
    <rect x="280" y="160" width="90" height="35" rx="4" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="325" y="182" textAnchor="middle" fill="#f472b6" fontSize="8">Slack/Email</text>

    {/* Artifacts */}
    <rect x="430" y="160" width="90" height="35" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="475" y="182" textAnchor="middle" fill="#a78bfa" fontSize="8">Artifactory/S3</text>
  </svg>
)

// Simple syntax highlighter for configuration files and build scripts
const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments
    highlighted = highlighted.replace(/(#.*$|\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting
    highlighted = highlighted
      .replace(/\b(id|name|type|vcs|runner|param|step|trigger|requirement|feature|option|value|key|buildType|template|project|settings|checkout|build|test|deploy|clean|artifact|dependency|snapshot|configuration)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(maven|gradle|docker|kotlin|groovy|xml|yaml|shell|powershell|python|node|npm|dotnet|java|git|svn)\b/gi, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/(--[\w-]+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </pre>
  )
}

function TeamCity({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'fundamentals',
      name: 'TeamCity Fundamentals',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Build Server coordinates agents and configurations. Kotlin DSL or XML for settings. Supports Git, SVN, Perforce, Mercurial VCS roots.',
      diagram: TeamCityArchitectureDiagram,
      details: [
        {
          name: 'Architecture Overview',
          explanation: 'TeamCity is a powerful CI/CD server by JetBrains that automates build, test, and deployment processes. The architecture consists of a central Build Server that manages configurations, a Build Queue that prioritizes jobs, and multiple Build Agents that execute builds. The server handles authentication, authorization, and provides a web UI for configuration and monitoring.',
          codeExample: `// Kotlin DSL - Project structure in settings.kts
import jetbrains.buildServer.configs.kotlin.*

version = "2024.03"

project {
    // Project settings
    description = "Main CI/CD Pipeline"

    // Define VCS root at project level
    vcsRoot(MainVcsRoot)

    // Build configurations
    buildType(Build)
    buildType(Test)
    buildType(Deploy)

    // Subprojects for organization
    subProject(IntegrationTests)
    subProject(PerformanceTests)

    // Project-level parameters
    params {
        param("env.JAVA_HOME", "/opt/java/jdk-17")
        password("env.DEPLOY_TOKEN", "credentialsJSON:abc-123")
    }
}`
        },
        {
          name: 'Build Configuration',
          explanation: 'Build Configuration defines what, how, and when to build. It includes VCS roots for source code access, build steps that define the build process, triggers that initiate builds automatically, and failure conditions. Configurations can be based on templates for reusability and can inherit settings from parent projects.',
          codeExample: `// Kotlin DSL - Build Configuration
object Build : BuildType({
    id("Build")
    name = "Build Application"
    description = "Compile and package the application"

    vcs {
        root(MainVcsRoot)
        cleanCheckout = true
    }

    steps {
        gradle {
            name = "Build with Gradle"
            tasks = "clean build"
            buildFile = "build.gradle.kts"
            gradleWrapperPath = ""
            jdkHome = "%env.JDK_17%"
        }
    }

    triggers {
        vcs {
            branchFilter = "+:*"
            quietPeriodSeconds = 60
        }
    }

    failureConditions {
        executionTimeoutMin = 30
        testFailure = true
        nonZeroExitCode = true
    }

    artifactRules = """
        build/libs/*.jar => artifacts
        build/reports/** => reports.zip
    """.trimIndent()
})`
        },
        {
          name: 'Build Agents',
          explanation: 'Build Agents are machines that execute build configurations. They can be installed on various platforms (Linux, Windows, macOS) and register with the server. Agents report their capabilities (installed tools, environment) and the server matches builds to compatible agents. Cloud agents can be provisioned on-demand.',
          codeExample: `// buildAgent.properties - Agent configuration
serverUrl=https://teamcity.example.com
name=linux-agent-01
workDir=../work
tempDir=../temp
systemDir=../system

# Agent environment capabilities
env.JAVA_HOME=/opt/java/jdk-17
env.MAVEN_HOME=/opt/maven
env.GRADLE_HOME=/opt/gradle
env.DOCKER_VERSION=24.0.7

# Custom agent properties
system.agent.pool=linux-pool
system.agent.capability.docker=true
system.agent.capability.nodejs=18.x

# Authorization token (generated by server)
authorizationToken=abc123xyz

---
# Kotlin DSL - Agent requirements
object Build : BuildType({
    requirements {
        contains("teamcity.agent.jvm.os.name", "Linux")
        exists("env.DOCKER_VERSION")
        moreThan("teamcity.agent.hardware.memorySizeMb", "4096")
        equals("system.agent.capability.docker", "true")
    }
})`
        },
        {
          name: 'VCS Roots',
          explanation: 'VCS Roots define connections to version control systems like Git, SVN, Mercurial, or Perforce. They specify repository URL, authentication credentials, branch specifications, and checkout rules. Multiple build configurations can share the same VCS root for consistency.',
          codeExample: `// Kotlin DSL - VCS Root definition
object MainVcsRoot : GitVcsRoot({
    id("MainGitRepo")
    name = "Main Repository"
    url = "git@github.com:company/project.git"
    branch = "refs/heads/main"

    // Branch specification for feature branches
    branchSpec = """
        +:refs/heads/*
        +:refs/pull/*/head
    """.trimIndent()

    // Authentication
    authMethod = uploadedKey {
        uploadedKey = "github-deploy-key"
        userName = "git"
    }

    // Checkout rules - what to include/exclude
    checkoutRules = """
        +:.
        -:docs
        -:*.md
    """.trimIndent()

    // Submodule handling
    submoduleCheckout = GitVcsRoot.SubmoduleCheckout.CHECKOUT
    useMirrors = true

    // Polling interval
    pollInterval = 60
})`
        },
        {
          name: 'Build Triggers',
          explanation: 'Build Triggers automatically initiate builds based on conditions: VCS triggers on commits, schedule triggers for nightly builds, finish build triggers when dependencies complete, and remote run triggers for pre-tested commits. Triggers can have branch filters and quiet periods.',
          codeExample: `// Kotlin DSL - Various trigger types
object Build : BuildType({
    triggers {
        // VCS trigger - on code changes
        vcs {
            branchFilter = """
                +:*
                -:refs/heads/experimental/*
            """.trimIndent()
            quietPeriodSeconds = 60
            triggerRules = """
                -:comment=.*\\[skip ci\\].*:**
                -:**.md
            """.trimIndent()
        }

        // Schedule trigger - nightly builds
        schedule {
            schedulingPolicy = daily {
                hour = 2
                minute = 0
            }
            branchFilter = "+:refs/heads/main"
            triggerBuild = always()
            withPendingChangesOnly = false
        }

        // Finish build trigger - chain execution
        finishBuildTrigger {
            buildType = "\${Build.id}"
            successfulOnly = true
            branchFilter = "+:*"
        }

        // Retry trigger - for flaky builds
        retryBuild {
            delaySeconds = 60
            attempts = 2
            moveToTheQueueTop = true
        }
    }
})`
        },
        {
          name: 'Artifacts',
          explanation: 'Artifacts are build outputs stored by TeamCity for later use. They can be downloaded, used by dependent builds, or deployed. Artifact rules define which files to publish, with support for patterns and destination paths. Artifacts have retention policies to manage storage.',
          codeExample: `// Kotlin DSL - Artifact configuration
object Build : BuildType({
    // Publish artifacts from this build
    artifactRules = """
        // Format: source => destination
        build/libs/*.jar => artifacts/
        build/distributions/*.zip => distributions/
        build/reports/** => reports.zip
        coverage/lcov.info => coverage/

        // Exclude patterns
        -:build/libs/*-sources.jar
    """.trimIndent()

    // Artifact dependencies from other builds
    dependencies {
        artifacts(SharedLibrary) {
            buildRule = lastSuccessful()
            artifactRules = """
                libs/*.jar => lib/
                config/*.properties => config/
            """.trimIndent()
            cleanDestination = true
        }
    }
})

// XML Configuration equivalent
/*
<artifact-rules>
  <include>
    <rule>build/libs/*.jar =&gt; artifacts/</rule>
    <rule>build/reports/** =&gt; reports.zip</rule>
  </include>
  <exclude>
    <rule>build/libs/*-sources.jar</rule>
  </exclude>
</artifact-rules>
*/`
        }
      ]
    },
    {
      id: 'pipelines',
      name: 'Build Pipelines',
      icon: '🔄',
      color: '#10b981',
      description: 'Snapshot dependencies for build chains, artifact dependencies for outputs. Parallel execution with failure-fast option. Build queue prioritization.',
      diagram: BuildChainDiagram,
      details: [
        {
          name: 'Build Chains',
          explanation: 'Build Chains orchestrate multiple build configurations with dependencies. Snapshot dependencies ensure builds use the same source revision. Artifact dependencies pass outputs between builds. Chains enable complex workflows like compile → test → deploy with proper ordering and failure handling.',
          codeExample: `// Kotlin DSL - Build Chain with Dependencies
object Compile : BuildType({
    id("Compile")
    name = "Compile"

    steps {
        gradle {
            tasks = "clean compileJava"
        }
    }

    artifactRules = "build/classes/** => classes.zip"
})

object UnitTest : BuildType({
    id("UnitTest")
    name = "Unit Tests"

    dependencies {
        snapshot(Compile) {
            onDependencyFailure = FailureAction.FAIL_TO_START
        }
        artifacts(Compile) {
            artifactRules = "classes.zip!** => build/classes"
        }
    }

    steps {
        gradle {
            tasks = "test"
        }
    }
})

object Deploy : BuildType({
    id("Deploy")
    name = "Deploy to Production"

    dependencies {
        snapshot(UnitTest) {
            onDependencyFailure = FailureAction.FAIL_TO_START
            onDependencyCancel = FailureAction.CANCEL
        }
    }

    steps {
        script {
            scriptContent = "./deploy.sh %env.DEPLOY_TARGET%"
        }
    }
})`
        },
        {
          name: 'Snapshot Dependencies',
          explanation: 'Snapshot dependencies ensure builds in a chain use the same source revision. When a build with dependencies is triggered, TeamCity creates a build chain that runs all required builds with consistent sources. This guarantees that tested code is exactly what gets deployed.',
          codeExample: `// Kotlin DSL - Snapshot Dependencies
object IntegrationTest : BuildType({
    id("IntegrationTest")
    name = "Integration Tests"

    dependencies {
        // Snapshot dependency ensures same VCS revision
        snapshot(Compile) {
            // What to do if dependency fails
            onDependencyFailure = FailureAction.FAIL_TO_START
            onDependencyCancel = FailureAction.CANCEL

            // Reuse builds from the same chain
            reuseBuilds = ReuseBuilds.ANY
            synchronizeRevisions = true
        }

        snapshot(UnitTest) {
            onDependencyFailure = FailureAction.FAIL_TO_START
        }
    }

    // Build will wait for dependencies
    // and use the exact same source revision
})

// XML equivalent
/*
<snapshot-dependencies>
  <depend-on sourceBuildTypeId="Compile">
    <options>
      <option name="run-build-if-dependency-failed" value="FAIL_TO_START"/>
      <option name="take-started-build-with-same-revisions" value="true"/>
      <option name="take-successful-builds-only" value="true"/>
    </options>
  </depend-on>
</snapshot-dependencies>
*/`
        },
        {
          name: 'Artifact Dependencies',
          explanation: 'Artifact dependencies download artifacts from other build configurations. Configure which artifacts to download, from which build (last successful, same chain, specific), and where to place them. This enables modular pipelines where each stage produces outputs for the next.',
          codeExample: `// Kotlin DSL - Artifact Dependencies
object PackageApp : BuildType({
    id("PackageApp")
    name = "Package Application"

    dependencies {
        // Download from last successful build
        artifacts(Compile) {
            buildRule = lastSuccessful()
            artifactRules = """
                classes.zip!** => build/classes
                resources.zip => build/resources
            """.trimIndent()
            cleanDestination = true
        }

        // Download from same build chain
        artifacts(GenerateAssets) {
            buildRule = sameChainOrLastFinished()
            artifactRules = "assets/** => src/main/resources/static"
        }

        // Download from specific build
        artifacts(SharedConfig) {
            buildRule = build("%config.build.number%")
            artifactRules = "config/*.yml => config/"
        }

        // Download from tag
        artifacts(ReleaseArtifacts) {
            buildRule = tag("release-*")
            artifactRules = "*.jar => lib/"
        }
    }

    steps {
        gradle {
            tasks = "packageDistribution"
        }
    }
})`
        },
        {
          name: 'Parallel Execution',
          explanation: 'TeamCity can execute independent builds in parallel across multiple agents. Build chains automatically parallelize stages without dependencies. Composite builds aggregate results from parallel builds. This significantly reduces overall pipeline time for complex projects.',
          codeExample: `// Kotlin DSL - Parallel Build Configuration
object TestMatrix : BuildType({
    id("TestMatrix")
    name = "Test Matrix - Parallel"

    // Use composite build to aggregate parallel tests
    type = BuildTypeSettings.Type.COMPOSITE

    dependencies {
        // These run in parallel (no dependencies between them)
        snapshot(TestJava8) {}
        snapshot(TestJava11) {}
        snapshot(TestJava17) {}
        snapshot(TestJava21) {}
    }
})

// Individual test configurations
object TestJava8 : BuildType({
    name = "Tests - Java 8"
    requirements {
        equals("env.JAVA_VERSION", "8")
    }
    steps {
        gradle { tasks = "test" }
    }
})

object TestJava11 : BuildType({
    name = "Tests - Java 11"
    requirements {
        equals("env.JAVA_VERSION", "11")
    }
    steps {
        gradle { tasks = "test" }
    }
})

// Parallel matrix with parameters
object TestWithMatrix : BuildType({
    steps {
        // Parallel test execution using build feature
    }

    features {
        parallelTests {
            numberOfBatches = 4
        }
    }
})`
        },
        {
          name: 'Failure Handling',
          explanation: 'Configure how failures propagate through build chains. Options include: fail immediately on any failure, continue despite failures, mark as failed but continue, or cancel remaining builds. Different failure actions can be set for dependency failures vs build failures.',
          codeExample: `// Kotlin DSL - Failure Handling Configuration
object Deploy : BuildType({
    id("Deploy")
    name = "Deploy with Failure Handling"

    dependencies {
        snapshot(Build) {
            // Options: FAIL_TO_START, ADD_PROBLEM, IGNORE, CANCEL
            onDependencyFailure = FailureAction.FAIL_TO_START
            onDependencyCancel = FailureAction.CANCEL
        }

        snapshot(IntegrationTests) {
            // Continue even if tests fail (for notifications)
            onDependencyFailure = FailureAction.ADD_PROBLEM
        }
    }

    failureConditions {
        // Fail if build runs too long
        executionTimeoutMin = 60

        // Fail on test failures
        testFailure = true

        // Fail on specific error messages
        failOnText {
            conditionType = BuildFailureOnText.ConditionType.CONTAINS
            pattern = "FATAL ERROR"
            failureMessage = "Build failed due to fatal error"
            reverse = false
        }

        // Fail if metric threshold exceeded
        failOnMetricChange {
            metric = BuildFailureOnMetric.MetricType.TEST_COUNT
            threshold = 10
            units = BuildFailureOnMetric.MetricUnit.DEFAULT_UNIT
            comparison = BuildFailureOnMetric.MetricComparison.LESS
        }

        // Fail on OOM
        javaCrash = true
    }
})`
        },
        {
          name: 'Meta-Runners',
          explanation: 'Meta-Runners are custom reusable build steps defined in XML. They encapsulate common build logic that can be shared across projects. Meta-runners can have parameters, making them flexible templates. They appear as regular build runners in the UI.',
          codeExample: `<!-- Meta-Runner XML Definition -->
<!-- File: .teamcity/pluginData/metaRunners/DeployToK8s.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<meta-runner name="Deploy to Kubernetes">
  <description>Deploy application to Kubernetes cluster</description>
  <settings>
    <parameters>
      <param name="k8s.cluster" value="" spec="text
        label='Kubernetes Cluster'
        description='Target cluster URL'"/>
      <param name="k8s.namespace" value="default" spec="text
        label='Namespace'"/>
      <param name="k8s.deployment" value="" spec="text
        label='Deployment Name'"/>
      <param name="docker.image" value="" spec="text
        label='Docker Image'"/>
    </parameters>
    <build-runners>
      <runner name="Deploy" type="simpleRunner">
        <parameters>
          <param name="script.content"><![CDATA[
#!/bin/bash
set -e

# Configure kubectl
kubectl config set-cluster target --server=%k8s.cluster%
kubectl config use-context target

# Update deployment image
kubectl set image deployment/%k8s.deployment% \\
  app=%docker.image% \\
  -n %k8s.namespace%

# Wait for rollout
kubectl rollout status deployment/%k8s.deployment% \\
  -n %k8s.namespace% \\
  --timeout=300s

echo "Deployment complete!"
          ]]></param>
          <param name="use.custom.script" value="true"/>
        </parameters>
      </runner>
    </build-runners>
  </settings>
</meta-runner>`
        }
      ]
    },
    {
      id: 'kotlin-dsl',
      name: 'Kotlin DSL',
      icon: '📝',
      color: '#8b5cf6',
      description: 'settings.kts versioned in repo. Object-based configuration with IDE auto-complete. Patches for environment-specific overrides.',
      diagram: KotlinDSLDiagram,
      details: [
        {
          name: 'DSL Overview',
          explanation: 'Kotlin DSL allows defining TeamCity configurations as code in Kotlin. It provides type safety, IDE support with autocompletion, and the ability to use programming constructs like loops, conditionals, and functions. Configurations are stored in .teamcity folder and synced with the server.',
          codeExample: `// settings.kts - Entry point for Kotlin DSL
import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.buildSteps.*
import jetbrains.buildServer.configs.kotlin.triggers.*
import jetbrains.buildServer.configs.kotlin.vcs.*

version = "2024.03"

project {
    description = "My Application CI/CD"

    // VCS Roots
    vcsRoot(GitHubVcsRoot)

    // Build Configurations
    buildType(Build)
    buildType(Test)
    buildType(Deploy)

    // Parameters available to all builds
    params {
        param("env.PROJECT_NAME", "my-app")
        param("env.JAVA_VERSION", "17")
    }

    // Cleanup rules
    cleanup {
        keepRule {
            id = "keep-releases"
            keepAtLeast = allBuilds()
            applyToBuilds {
                withTags = anyOf("release")
            }
            dataToKeep = everything()
        }
    }
}`
        },
        {
          name: 'Project Structure',
          explanation: 'A DSL project contains settings.kts as the entry point, plus additional Kotlin files for organization. Projects can contain subprojects, build configurations, templates, and VCS roots. The structure mirrors the TeamCity project hierarchy with type-safe references between components.',
          codeExample: `// File structure for Kotlin DSL project
.teamcity/
├── settings.kts          # Entry point
├── pom.xml               # Maven for IDE support
├── _Self/
│   └── Project.kt        # Main project definition
├── buildTypes/
│   ├── Build.kt          # Build configuration
│   ├── Test.kt           # Test configuration
│   └── Deploy.kt         # Deploy configuration
├── vcsRoots/
│   └── MainVcs.kt        # VCS root definitions
├── templates/
│   └── GradleBuild.kt    # Reusable templates
└── extensions/
    └── CustomSteps.kt    # Custom extensions

---
// settings.kts with modular imports
import jetbrains.buildServer.configs.kotlin.*
import buildTypes.*
import vcsRoots.*
import templates.*

version = "2024.03"

project {
    vcsRoot(MainVcsRoot)

    template(GradleBuildTemplate)

    buildType(Build)
    buildType(Test)
    buildType(Deploy)

    subProject(IntegrationProject)
    subProject(PerformanceProject)
}`
        },
        {
          name: 'Build Types',
          explanation: 'BuildType in Kotlin DSL defines a build configuration. It includes id, name, VCS settings, build steps, triggers, features, and dependencies. Build types can inherit from templates using templates() function. Parameters can be defined at build type level or inherited from project.',
          codeExample: `// Kotlin DSL - Complete BuildType definition
object Build : BuildType({
    id("Build_Main")
    name = "Build Application"
    description = "Compile, test, and package"

    // Build number format
    buildNumberPattern = "%build.counter%-%build.vcs.number.1%"

    // VCS Settings
    vcs {
        root(MainVcsRoot)
        cleanCheckout = true
        checkoutMode = CheckoutMode.ON_AGENT
    }

    // Parameters
    params {
        param("gradle.opts", "-Xmx2g")
        checkbox("skip.tests", "false",
            label = "Skip Tests",
            checked = "true", unchecked = "false")
    }

    // Build Steps
    steps {
        gradle {
            name = "Build"
            tasks = "clean build"
            buildFile = "build.gradle.kts"
            gradleParams = "%gradle.opts%"
            jdkHome = "%env.JDK_17%"
        }

        script {
            name = "Package"
            scriptContent = """
                #!/bin/bash
                echo "Build number: %build.number%"
                ./package.sh
            """.trimIndent()
        }
    }

    // Triggers
    triggers {
        vcs {
            quietPeriodSeconds = 60
        }
    }

    // Features
    features {
        perfmon {}
        commitStatusPublisher {
            vcsRootExtId = "\${MainVcsRoot.id}"
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:github-token"
                }
            }
        }
    }
})`
        },
        {
          name: 'Templates',
          explanation: 'Templates define reusable build configuration patterns. Build types reference templates and can override specific settings. Templates reduce duplication across similar builds. They support parameter definitions that build types can customize.',
          codeExample: `// Kotlin DSL - Template definition
object GradleBuildTemplate : Template({
    id("Template_GradleBuild")
    name = "Gradle Build Template"

    params {
        param("gradle.tasks", "build")
        param("gradle.jdk", "%env.JDK_17%")
    }

    vcs {
        root(MainVcsRoot)
    }

    steps {
        gradle {
            name = "Gradle Build"
            tasks = "%gradle.tasks%"
            jdkHome = "%gradle.jdk%"
            enableStacktrace = true
        }
    }

    features {
        perfmon {}
    }

    failureConditions {
        testFailure = true
    }
})

// BuildType using template
object ServiceBuild : BuildType({
    id("Build_Service")
    name = "Service Build"

    // Reference the template
    templates(GradleBuildTemplate)

    // Override template parameters
    params {
        param("gradle.tasks", "clean build publishToMavenLocal")
    }

    // Add additional steps
    steps {
        dockerCommand {
            name = "Build Docker Image"
            commandType = build {
                source = file {
                    path = "Dockerfile"
                }
                namesAndTags = "myapp:%build.number%"
            }
        }
    }
})`
        },
        {
          name: 'Versioned Settings',
          explanation: 'Versioned Settings synchronize DSL configurations with the TeamCity server. Changes in Git are automatically applied to the server. Two-way sync allows editing in UI and committing changes back. Conflicts are detected and reported for manual resolution.',
          codeExample: `// settings.kts - Versioned Settings Configuration
version = "2024.03"

project {
    // Versioned settings mode
    versionedSettings {
        // Where to store settings
        mode = VersionedSettings.Mode.ENABLED

        // Root VCS for settings
        rootExtId = MainVcsRoot.id

        // How to handle conflicts
        showChanges = true
        buildSettingsMode = VersionedSettings.BuildSettingsMode.PREFER_SETTINGS_FROM_VCS
    }

    // When importing from VCS
    params {
        // Portable format for cross-server compatibility
        param("teamcity.versioned.settings.format", "kotlin")
    }
}

---
// pom.xml for IDE support
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.example</groupId>
    <artifactId>teamcity-settings</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.jetbrains.teamcity</groupId>
            <artifactId>configs-dsl-kotlin</artifactId>
            <version>2024.03</version>
        </dependency>
    </dependencies>
</project>`
        },
        {
          name: 'Extending DSL',
          explanation: 'Create reusable functions and extensions to reduce duplication. Define custom build step functions, parameter sets, or entire pipeline patterns. Share extensions across projects via dependencies. Use Kotlin features like extension functions and inline classes.',
          codeExample: `// Custom extension functions
// File: extensions/CustomSteps.kt
package extensions

import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.buildSteps.*

// Extension function for Docker builds
fun BuildSteps.dockerBuildAndPush(
    imageName: String,
    dockerfile: String = "Dockerfile",
    registry: String = "docker.io"
) {
    dockerCommand {
        name = "Build: $imageName"
        commandType = build {
            source = file { path = dockerfile }
            namesAndTags = "$registry/$imageName:%build.number%"
        }
    }
    dockerCommand {
        name = "Push: $imageName"
        commandType = push {
            namesAndTags = "$registry/$imageName:%build.number%"
        }
    }
}

// Reusable pipeline pattern
fun Project.microservicePipeline(
    serviceName: String,
    repoUrl: String
) {
    val vcs = GitVcsRoot {
        id("${serviceName}_VCS")
        url = repoUrl
    }
    vcsRoot(vcs)

    buildType {
        id("${serviceName}_Build")
        name = "$serviceName - Build"
        vcs { root(vcs) }
        steps {
            gradle { tasks = "build" }
            dockerBuildAndPush(serviceName)
        }
    }
}

// Usage in settings.kts
project {
    microservicePipeline("user-service", "git@github.com:org/user-service.git")
    microservicePipeline("order-service", "git@github.com:org/order-service.git")
}`
        }
      ]
    },
    {
      id: 'agents',
      name: 'Agent Management',
      icon: '🖥️',
      color: '#06b6d4',
      description: 'Agent pools isolate resources by OS or team. Requirements match builds to compatible agents. Cloud profiles enable elastic scaling with auto-provisioning.',
      diagram: AgentPoolDiagram,
      details: [
        {
          name: 'Agent Pools',
          explanation: 'Agent Pools group agents with similar capabilities. Projects are assigned to pools, restricting which agents can run their builds. Pools enable resource isolation between teams, separate environments (dev, production), or specialized hardware. Default pool accepts all unassigned agents.',
          codeExample: `// Kotlin DSL - Agent Pool Configuration
object Build : BuildType({
    id("Build")
    name = "Build Application"

    // Require specific agent pool
    requirements {
        equals("system.agent.pool", "linux-production")
    }
})

---
// REST API - Create and manage pools
# Create new agent pool
curl -X POST "https://teamcity.example.com/app/rest/agentPools" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "linux-production",
    "maxAgents": 10
  }'

# Assign project to pool
curl -X POST "https://teamcity.example.com/app/rest/agentPools/id:3/projects" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "id": "MyProject"
  }'

# Move agent to pool
curl -X PUT "https://teamcity.example.com/app/rest/agents/id:5/pool" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "id": 3
  }'`
        },
        {
          name: 'Agent Requirements',
          explanation: 'Build configurations define agent requirements that must be met. Requirements can check for installed tools, environment variables, OS type, or custom properties. TeamCity matches builds to agents meeting all requirements. Unmet requirements prevent builds from starting.',
          codeExample: `// Kotlin DSL - Agent Requirements
object DockerBuild : BuildType({
    id("DockerBuild")
    name = "Docker Build"

    requirements {
        // OS requirements
        contains("teamcity.agent.jvm.os.name", "Linux")

        // Tool requirements
        exists("docker.version")
        exists("docker.server.version")

        // Version requirements
        moreThanVer("docker.version", "20.0")

        // Memory requirements
        moreThan("teamcity.agent.hardware.memorySizeMb", "8192")

        // Custom properties
        equals("system.agent.capability.gpu", "true")

        // Environment variables
        exists("env.AWS_ACCESS_KEY_ID")

        // Negative requirements
        doesNotExist("system.agent.maintenance")
        doesNotEqual("system.agent.environment", "legacy")

        // Regex matching
        matches("env.JAVA_HOME", "/opt/java/jdk-1[78].*")
    }
})

---
// buildAgent.properties - Defining capabilities
# System properties (auto-detected)
system.teamcity.agent.cpuBenchmark=523

# Custom capabilities
system.agent.capability.gpu=true
system.agent.capability.docker=true
system.agent.environment=production`
        },
        {
          name: 'Cloud Agents',
          explanation: 'Cloud profiles enable dynamic agent provisioning in AWS, Azure, GCP, or VMware. Agents are started on demand when builds queue and terminated when idle. This provides elastic capacity without maintaining always-on infrastructure. Cloud agents reduce costs for variable workloads.',
          codeExample: `// AWS EC2 Cloud Profile Configuration (XML)
<!-- .teamcity/pluginData/cloud/amazon-ec2.xml -->
<profile>
  <cloud-code>amazon</cloud-code>
  <name>AWS Production Agents</name>
  <enabled>true</enabled>
  <parameters>
    <param name="secure:access_key_id" value="credentialsJSON:aws-key"/>
    <param name="secure:secret_access_key" value="credentialsJSON:aws-secret"/>
    <param name="region" value="us-east-1"/>
    <param name="instances_limit" value="10"/>
  </parameters>
  <images>
    <image>
      <source-image>ami-0123456789abcdef0</source-image>
      <instance-type>t3.large</instance-type>
      <agent-pool-id>3</agent-pool-id>
      <maximum-instances>5</maximum-instances>
      <subnet-id>subnet-abc123</subnet-id>
      <security-groups>sg-abc123</security-groups>
      <key-pair-name>teamcity-agents</key-pair-name>
    </image>
  </images>
</profile>

---
# Kubernetes Cloud Profile
# Uses Kubernetes plugin for dynamic agents
apiVersion: v1
kind: Pod
metadata:
  name: teamcity-agent
spec:
  containers:
  - name: teamcity-agent
    image: jetbrains/teamcity-agent:latest
    env:
    - name: SERVER_URL
      value: "https://teamcity.example.com"
    - name: AGENT_TOKEN
      valueFrom:
        secretKeyRef:
          name: teamcity-agent
          key: token
    resources:
      requests:
        memory: "4Gi"
        cpu: "2"
      limits:
        memory: "8Gi"
        cpu: "4"`
        },
        {
          name: 'Agent Authorization',
          explanation: 'New agents require authorization before running builds. This security feature prevents unauthorized machines from accessing source code and secrets. Agents can be authorized manually or automatically based on rules. Agent tokens provide secure registration.',
          codeExample: `// Agent authorization configuration
# Generate authorization token on server
curl -X POST "https://teamcity.example.com/app/rest/agents/authorization" \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "new-agent-01",
    "pool": {"id": 3}
  }'

---
// buildAgent.properties with pre-authorized token
serverUrl=https://teamcity.example.com
name=agent-01
authorizationToken=eyJhbGciOiJIUzI1NiJ9...

# Alternative: IP-based auto-authorization
# Configure on server side in
# <TeamCity Data Directory>/config/main-config.xml
<agent-auto-authorize>
  <enabled>true</enabled>
  <ip-patterns>
    <pattern>10.0.0.*</pattern>
    <pattern>192.168.1.*</pattern>
  </ip-patterns>
</agent-auto-authorize>

---
# REST API - Authorize pending agent
curl -X PUT "https://teamcity.example.com/app/rest/agents/id:123/authorized" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: text/plain" \\
  -d "true"

# Assign to pool during authorization
curl -X PUT "https://teamcity.example.com/app/rest/agents/id:123" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "authorized": true,
    "pool": {"id": 3}
  }'`
        },
        {
          name: 'Agent Maintenance',
          explanation: 'Agents can be disabled for maintenance without losing configuration. Disconnected agents are detected and reported. Agent logs help diagnose issues. Agents can be upgraded remotely through the server. Health monitoring tracks agent performance.',
          codeExample: `# REST API - Agent maintenance operations

# Disable agent for maintenance
curl -X PUT "https://teamcity.example.com/app/rest/agents/id:123/enabled" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: text/plain" \\
  -d "false"

# Add comment explaining maintenance
curl -X PUT "https://teamcity.example.com/app/rest/agents/id:123/enabledInfo" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "status": false,
    "comment": {"text": "Scheduled OS updates"}
  }'

# Check agent health
curl "https://teamcity.example.com/app/rest/agents/id:123" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Accept: application/json"

# View agent logs (from agent machine)
tail -f <agent_home>/logs/teamcity-agent.log

---
# Automated agent upgrade script
#!/bin/bash
# upgrade-agents.sh

AGENTS=$(curl -s "https://teamcity.example.com/app/rest/agents?locator=connected:true" \\
  -H "Authorization: Bearer $TOKEN" | jq -r '.agent[].id')

for AGENT_ID in $AGENTS; do
  echo "Upgrading agent $AGENT_ID"
  curl -X POST "https://teamcity.example.com/app/rest/agents/id:$AGENT_ID/upgrade" \\
    -H "Authorization: Bearer $TOKEN"
done`
        }
      ]
    },
    {
      id: 'docker',
      name: 'Docker Integration',
      icon: '🐳',
      color: '#2563eb',
      description: 'Native Docker build runner with multi-stage support and layer caching. Docker Compose for integration tests. Run steps in containers for isolated environments.',
      diagram: DockerIntegrationDiagram,
      details: [
        {
          name: 'Docker Build Runner',
          explanation: 'Native Docker build step that builds images from Dockerfiles. Supports multi-stage builds, build arguments, and multiple tags. Images can be tagged with build number or Git hash. Build context can be customized. Caching layers improves build performance.',
          codeExample: `// Kotlin DSL - Docker Build Configuration
object DockerBuild : BuildType({
    id("DockerBuild")
    name = "Docker Build"

    steps {
        // Build Docker image
        dockerCommand {
            name = "Build Image"
            commandType = build {
                source = file {
                    path = "Dockerfile"
                }
                // Multiple tags
                namesAndTags = """
                    myregistry.io/myapp:%build.number%
                    myregistry.io/myapp:latest
                    myregistry.io/myapp:%build.vcs.number%
                """.trimIndent()
                // Build arguments
                commandArgs = """
                    --build-arg VERSION=%build.number%
                    --build-arg GIT_COMMIT=%build.vcs.number%
                    --build-arg BUILD_DATE=%system.build.start.date%
                """.trimIndent()
                // Build context
                contextDir = "."
            }
        }

        // Push to registry
        dockerCommand {
            name = "Push Image"
            commandType = push {
                namesAndTags = """
                    myregistry.io/myapp:%build.number%
                    myregistry.io/myapp:latest
                """.trimIndent()
            }
        }
    }

    features {
        dockerSupport {
            loginToRegistry = on {
                dockerRegistryId = "PROJECT_EXT_1"
            }
        }
    }
})`
        },
        {
          name: 'Docker Compose',
          explanation: 'Docker Compose runner orchestrates multi-container builds. It can build, up, down, and run commands in compose environments. Perfect for integration tests requiring databases, caches, or services. Compose files can use build-time variables from TeamCity.',
          codeExample: `// Kotlin DSL - Docker Compose Runner
object IntegrationTests : BuildType({
    id("IntegrationTests")
    name = "Integration Tests with Compose"

    steps {
        // Start services
        dockerCompose {
            name = "Start Test Environment"
            file = "docker-compose.test.yml"
            // Build images before starting
            commandType = DockerComposeCommandType.UP
            arguments = "--build -d"
            // Scale specific services
            services = "db redis"
        }

        // Wait for services to be ready
        script {
            name = "Wait for Services"
            scriptContent = """
                #!/bin/bash
                echo "Waiting for database..."
                until docker compose -f docker-compose.test.yml exec -T db pg_isready; do
                  sleep 1
                done
                echo "Database is ready!"
            """.trimIndent()
        }

        // Run tests
        dockerCompose {
            name = "Run Tests"
            file = "docker-compose.test.yml"
            commandType = DockerComposeCommandType.RUN
            arguments = "--rm app pytest tests/"
        }

        // Cleanup
        dockerCompose {
            name = "Cleanup"
            file = "docker-compose.test.yml"
            commandType = DockerComposeCommandType.DOWN
            arguments = "-v --remove-orphans"
            executionMode = BuildStep.ExecutionMode.ALWAYS
        }
    }
})

---
# docker-compose.test.yml
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: test
      POSTGRES_PASSWORD: test
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]

  redis:
    image: redis:7-alpine

  app:
    build: .
    depends_on:
      - db
      - redis
    environment:
      DATABASE_URL: postgresql://test:test@db/testdb
      REDIS_URL: redis://redis:6379`
        },
        {
          name: 'Docker Registry',
          explanation: 'Configure Docker registry connections for push and pull operations. Supports Docker Hub, AWS ECR, Azure ACR, GCR, and private registries. Credentials are stored securely. Automatic login before build steps that need registry access.',
          codeExample: `// Kotlin DSL - Docker Registry Configuration
project {
    // Docker Hub connection
    features {
        dockerRegistry {
            id = "PROJECT_EXT_DOCKER_HUB"
            name = "Docker Hub"
            url = "https://docker.io"
            userName = "myuser"
            password = "credentialsJSON:docker-hub-token"
        }

        // AWS ECR connection
        dockerRegistry {
            id = "PROJECT_EXT_ECR"
            name = "AWS ECR"
            url = "https://123456789.dkr.ecr.us-east-1.amazonaws.com"
            // Uses AWS credentials from build
        }

        // Private registry
        dockerRegistry {
            id = "PROJECT_EXT_PRIVATE"
            name = "Private Registry"
            url = "https://registry.company.com"
            userName = "teamcity"
            password = "credentialsJSON:registry-password"
        }
    }
}

---
// BuildType using registry login
object PushToECR : BuildType({
    features {
        dockerSupport {
            // Auto-login before docker commands
            loginToRegistry = on {
                dockerRegistryId = "PROJECT_EXT_ECR"
            }
            // Clean images after build
            cleanupPushedImages = true
        }
    }

    steps {
        // ECR login for AWS (automatic with feature)
        script {
            name = "ECR Login"
            scriptContent = """
                aws ecr get-login-password --region us-east-1 | \\
                docker login --username AWS --password-stdin \\
                123456789.dkr.ecr.us-east-1.amazonaws.com
            """.trimIndent()
        }

        dockerCommand {
            commandType = push {
                namesAndTags = "123456789.dkr.ecr.us-east-1.amazonaws.com/myapp:%build.number%"
            }
        }
    }
})`
        },
        {
          name: 'Docker Wrapper',
          explanation: 'Run build steps inside Docker containers for isolated, reproducible environments. Container images provide consistent tooling regardless of agent. Volumes mount source code and caches. Perfect for builds requiring specific tool versions or dependencies.',
          codeExample: `// Kotlin DSL - Docker Wrapper for Build Steps
object BuildInDocker : BuildType({
    id("BuildInDocker")
    name = "Build in Docker Container"

    steps {
        // Run Gradle build inside container
        gradle {
            name = "Build with Gradle"
            tasks = "clean build"

            // Run inside Docker container
            dockerImage = "gradle:8.5-jdk17"
            dockerImagePlatform = GradleBuildStep.ImagePlatform.Linux
            dockerRunParameters = """
                -v /var/cache/gradle:/home/gradle/.gradle
                --memory=4g
                --cpus=2
            """.trimIndent()
        }

        // Run Node.js build in container
        script {
            name = "Build Frontend"
            scriptContent = """
                npm ci
                npm run build
                npm test
            """.trimIndent()

            dockerImage = "node:20-alpine"
            dockerImagePlatform = ScriptBuildStep.ImagePlatform.Linux
            dockerRunParameters = """
                -v /var/cache/npm:/root/.npm
                -e CI=true
            """.trimIndent()
        }

        // Python tests in container
        python {
            name = "Run Python Tests"
            command = pytest {
                arguments = "tests/ -v --junitxml=reports/junit.xml"
            }

            dockerImage = "python:3.11-slim"
            dockerRunParameters = "-v /var/cache/pip:/root/.cache/pip"
        }
    }

    features {
        dockerSupport {
            cleanupPushedImages = true
        }
    }
})`
        },
        {
          name: 'Container Agents',
          explanation: 'Build agents can run as Docker containers themselves. JetBrains provides official images with common tools. Custom images can include project-specific tools. Kubernetes can orchestrate container agents for elastic scaling. docker-in-docker or socket mounting for Docker builds.',
          codeExample: `# Docker Compose for Container Agent
# docker-compose.agent.yml
services:
  teamcity-agent:
    image: jetbrains/teamcity-agent:latest
    privileged: true  # Required for docker-in-docker
    environment:
      - SERVER_URL=https://teamcity.example.com
      - AGENT_NAME=docker-agent-01
    volumes:
      # Docker socket for DinD
      - /var/run/docker.sock:/var/run/docker.sock
      # Persistent agent data
      - agent-conf:/data/teamcity_agent/conf
      # Build caches
      - gradle-cache:/root/.gradle
      - maven-cache:/root/.m2
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 8G

volumes:
  agent-conf:
  gradle-cache:
  maven-cache:

---
# Custom Agent Dockerfile
FROM jetbrains/teamcity-agent:latest

# Install additional tools
RUN apt-get update && apt-get install -y \\
    python3-pip \\
    nodejs \\
    npm \\
    kubectl \\
    helm \\
    && rm -rf /var/lib/apt/lists/*

# Install AWS CLI
RUN pip3 install awscli

# Configure tools
ENV JAVA_HOME=/opt/java/openjdk
ENV PATH=$PATH:/usr/local/bin

---
# Kubernetes Deployment for Agents
apiVersion: apps/v1
kind: Deployment
metadata:
  name: teamcity-agent
spec:
  replicas: 3
  selector:
    matchLabels:
      app: teamcity-agent
  template:
    metadata:
      labels:
        app: teamcity-agent
    spec:
      containers:
      - name: agent
        image: jetbrains/teamcity-agent:latest
        env:
        - name: SERVER_URL
          value: "https://teamcity.example.com"
        - name: AGENT_TOKEN
          valueFrom:
            secretKeyRef:
              name: teamcity-agent
              key: token
        volumeMounts:
        - name: docker-sock
          mountPath: /var/run/docker.sock
      volumes:
      - name: docker-sock
        hostPath:
          path: /var/run/docker.sock`
        }
      ]
    },
    {
      id: 'testing',
      name: 'Testing & Reporting',
      icon: '📊',
      color: '#f59e0b',
      description: 'Auto-parse JUnit, TestNG, NUnit, pytest results. Track flaky tests and test history. Code coverage integration (JaCoCo, Istanbul) with threshold enforcement.',
      diagram: TestingIntegrationDiagram,
      details: [
        {
          name: 'Test Reporting',
          explanation: 'TeamCity automatically detects and parses test results from JUnit, TestNG, NUnit, pytest, and many other frameworks. Tests appear in the build results with pass/fail status, duration, and output. Service messages enable custom test reporting from any language.',
          codeExample: `// Kotlin DSL - Test Reporting Configuration
object Test : BuildType({
    id("Test")
    name = "Run Tests"

    steps {
        gradle {
            name = "Run JUnit Tests"
            tasks = "test"
            // JUnit results are auto-detected from build/test-results
        }

        // Custom test reporter for non-standard output
        script {
            name = "Run Custom Tests"
            scriptContent = """
                #!/bin/bash
                # TeamCity service messages for test reporting
                echo "##teamcity[testSuiteStarted name='CustomSuite']"

                for test in test1 test2 test3; do
                    echo "##teamcity[testStarted name='$test']"

                    # Run test and capture result
                    if ./run_test.sh $test; then
                        echo "##teamcity[testFinished name='$test']"
                    else
                        echo "##teamcity[testFailed name='$test' message='Test failed']"
                        echo "##teamcity[testFinished name='$test']"
                    fi
                done

                echo "##teamcity[testSuiteFinished name='CustomSuite']"
            """.trimIndent()
        }
    }

    features {
        // Import additional test reports
        xmlReport {
            reportType = XmlReport.XmlReportType.JUNIT
            rules = """
                **/test-results/**/*.xml
                **/surefire-reports/*.xml
            """.trimIndent()
        }
    }
})`
        },
        {
          name: 'Test History',
          explanation: 'Track test performance over time with historical data. See when tests started failing, identify slow tests, and track reliability. Compare test durations across builds. History helps identify regressions and performance degradation. Investigate test to see its full history.',
          codeExample: `// Kotlin DSL - Test Duration Thresholds
object Test : BuildType({
    failureConditions {
        // Fail if tests take too long
        testFailure = true

        // Fail if test duration increases significantly
        failOnMetricChange {
            metric = BuildFailureOnMetric.MetricType.TEST_DURATION
            threshold = 20
            units = BuildFailureOnMetric.MetricUnit.PERCENTS
            comparison = BuildFailureOnMetric.MetricComparison.MORE
            compareTo = value()
        }
    }
})

---
# REST API - Query test history
# Get test runs for a specific test
curl "https://teamcity.example.com/app/rest/testOccurrences?locator=test:(name:com.example.MyTest.testMethod)" \\
  -H "Authorization: Bearer $TOKEN"

# Get slow tests
curl "https://teamcity.example.com/app/rest/testOccurrences?locator=build:(id:12345),status:SUCCESS&fields=testOccurrence(name,duration)" \\
  -H "Authorization: Bearer $TOKEN" | jq '.testOccurrence | sort_by(.duration) | reverse | .[0:10]'

# Compare test durations between builds
curl "https://teamcity.example.com/app/rest/builds?locator=buildType:Test,count:10&fields=build(id,number,statistics(property(name,value)))" \\
  -H "Authorization: Bearer $TOKEN"`
        },
        {
          name: 'Flaky Tests',
          explanation: 'TeamCity identifies flaky tests that pass and fail inconsistently. Flaky test detector analyzes test history for unstable patterns. Mute flaky tests to prevent blocking builds while investigating. Flakiness percentage is tracked per test.',
          codeExample: `// Kotlin DSL - Flaky Test Configuration
object Test : BuildType({
    features {
        // Enable flaky test detection
        investigations {
            // Auto-assign investigations for new failures
            autoAssignee = "%teamcity.build.triggeredBy.username%"
        }
    }
})

---
# REST API - Mute flaky tests
# Mute a specific flaky test
curl -X POST "https://teamcity.example.com/app/rest/mutes" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "assignment": {
      "user": {"username": "admin"}
    },
    "scope": {
      "project": {"id": "MyProject"}
    },
    "target": {
      "tests": {
        "test": [
          {"name": "com.example.FlakyTest.testUnstable"}
        ]
      }
    },
    "resolution": {
      "type": "whenFixed"
    }
  }'

# Get all muted tests
curl "https://teamcity.example.com/app/rest/mutes?locator=project:MyProject" \\
  -H "Authorization: Bearer $TOKEN"

# Unmute a test
curl -X DELETE "https://teamcity.example.com/app/rest/mutes/id:123" \\
  -H "Authorization: Bearer $TOKEN"

# Service message to report flaky test
echo "##teamcity[testMetadata testName='testMethod' name='flaky' value='true']"`
        },
        {
          name: 'Code Coverage',
          explanation: 'Integrated support for code coverage tools: JaCoCo, Istanbul, dotCover, and more. Coverage reports show line, branch, and method coverage. Set minimum coverage thresholds as build failure conditions. Track coverage trends over time.',
          codeExample: `// Kotlin DSL - Code Coverage Configuration
object TestWithCoverage : BuildType({
    id("TestWithCoverage")
    name = "Tests with Coverage"

    steps {
        gradle {
            name = "Run Tests with JaCoCo"
            tasks = "test jacocoTestReport"
            coverageEngine = jacoco {
                classLocations = "+:build/classes/java/main/**"
            }
        }
    }

    // Coverage thresholds
    failureConditions {
        // Fail if coverage drops
        failOnMetricChange {
            metric = BuildFailureOnMetric.MetricType.COVERAGE_LINE_PERCENTAGE
            threshold = 5
            units = BuildFailureOnMetric.MetricUnit.PERCENTS
            comparison = BuildFailureOnMetric.MetricComparison.LESS
            compareTo = build {
                buildRule = lastSuccessful()
            }
        }
    }

    features {
        // IntelliJ IDEA coverage (alternative)
        coverageEngine {
            engine = idea {
                includeClasses = "com.example.*"
                excludeClasses = "com.example.generated.*"
            }
        }
    }
})

---
# Istanbul coverage for JavaScript (package.json)
{
  "scripts": {
    "test:coverage": "nyc --reporter=lcov --reporter=teamcity mocha"
  }
}

# TeamCity picks up coverage from lcov.info
# Service messages also supported:
# ##teamcity[buildStatisticValue key='CodeCoverageL' value='85.5']`
        },
        {
          name: 'Test Parallelization',
          explanation: 'Distribute tests across multiple agents for faster execution. TeamCity can split test suites automatically based on test duration history. Parallel test execution significantly reduces feedback time for large test suites.',
          codeExample: `// Kotlin DSL - Parallel Test Execution
object ParallelTests : BuildType({
    id("ParallelTests")
    name = "Parallel Test Execution"

    // Use composite build to aggregate parallel tests
    type = BuildTypeSettings.Type.COMPOSITE

    dependencies {
        // Parallel test batches
        snapshot(TestBatch1) {}
        snapshot(TestBatch2) {}
        snapshot(TestBatch3) {}
        snapshot(TestBatch4) {}
    }
})

// Alternative: Built-in parallel tests feature
object AutoParallelTests : BuildType({
    features {
        parallelTests {
            // Automatically split tests across agents
            numberOfBatches = 4
            // Use test duration history for optimal splitting
        }
    }

    steps {
        gradle {
            tasks = "test"
            // Tests will be filtered automatically
            gradleParams = "-PtestFilter=%teamcity.build.parallelTests.currentBatch%"
        }
    }
})

---
# build.gradle.kts - Support for parallel test batches
tasks.test {
    val testFilter = project.findProperty("testFilter") as? String
    if (testFilter != null) {
        // Filter is JSON array of test class names
        val classes = groovy.json.JsonSlurper().parseText(testFilter) as List<*>
        filter {
            classes.forEach { includeTestsMatching(it as String) }
        }
    }
}`
        },
        {
          name: 'Re-running Failed Tests',
          explanation: 'Quickly re-run only failed tests instead of the entire suite. This saves time when diagnosing flaky or environment-dependent failures. Failed tests can be marked as muted to continue pipeline while investigating.',
          codeExample: `// Kotlin DSL - Re-run Failed Tests
object RetryFailedTests : BuildType({
    id("RetryFailedTests")
    name = "Retry Failed Tests"

    steps {
        gradle {
            name = "Run Tests"
            tasks = "test"
        }

        // Re-run failed tests step
        gradle {
            name = "Retry Failed Tests"
            tasks = "test"
            gradleParams = "--rerun-tasks"

            conditions {
                // Only run if previous step failed
                equals("teamcity.build.failedTests.count", "0").not()
            }
        }
    }

    triggers {
        // Automatic retry on failure
        retryBuild {
            delaySeconds = 30
            attempts = 2
            moveToTheQueueTop = true
            // Only retry on specific failures
            retryIfBuildFailed = true
        }
    }
})

---
# Script to re-run specific failed tests
#!/bin/bash
# rerun-failed-tests.sh

# Get failed tests from TeamCity
FAILED_TESTS=$(curl -s "https://teamcity.example.com/app/rest/testOccurrences?locator=build:(id:%teamcity.build.id%),status:FAILURE" \\
  -H "Authorization: Bearer $TOKEN" | jq -r '.testOccurrence[].name')

if [ -n "$FAILED_TESTS" ]; then
    echo "Re-running failed tests:"
    echo "$FAILED_TESTS"

    # Convert to Gradle filter
    FILTER=$(echo "$FAILED_TESTS" | tr '\\n' ',' | sed 's/,$//')

    ./gradlew test --tests "$FILTER" --rerun-tasks
else
    echo "No failed tests to retry"
fi`
        }
      ]
    },
    {
      id: 'security',
      name: 'Security & Secrets',
      icon: '🔐',
      color: '#ef4444',
      description: 'Encrypted password parameters masked in logs. LDAP, AD, OAuth authentication. Role-based access control at project/build level. Comprehensive audit logging.',
      diagram: SecurityDiagram,
      details: [
        {
          name: 'Typed Parameters',
          explanation: 'Parameters can have types: password, checkbox, select, text. Password parameters are encrypted and masked in logs. They can be used in build steps and passed to scripts. Parameter specs control visibility and editability.',
          codeExample: `// Kotlin DSL - Typed Parameters
object Deploy : BuildType({
    id("Deploy")
    name = "Deploy Application"

    params {
        // Simple text parameter
        text("env.APP_NAME", "myapp", label = "Application Name",
             description = "Name of the application")

        // Password parameter (encrypted, masked in logs)
        password("env.DEPLOY_TOKEN", "credentialsJSON:deploy-token",
                 label = "Deploy Token",
                 description = "Token for deployment")

        // Checkbox parameter
        checkbox("skip.tests", "false",
                 label = "Skip Tests",
                 checked = "true",
                 unchecked = "false")

        // Select parameter with options
        select("env.ENVIRONMENT", "staging",
               label = "Target Environment",
               options = listOf("development", "staging", "production"))

        // Text with validation
        text("version", "", label = "Version",
             regex = """\\d+\\.\\d+\\.\\d+""",
             validationMessage = "Must be semantic version (x.y.z)")

        // Hidden parameter
        param("internal.build.key", "value") {
            display = ParameterDisplay.HIDDEN
        }
    }

    steps {
        script {
            scriptContent = """
                echo "Deploying %env.APP_NAME% to %env.ENVIRONMENT%"
                # Password is automatically masked: ******
                ./deploy.sh --token=%env.DEPLOY_TOKEN%
            """.trimIndent()
        }
    }
})`
        },
        {
          name: 'Secure Values',
          explanation: 'Secure values store sensitive data encrypted on the server. Referenced via credentialsJSON tokens in configurations. Values are decrypted only during build execution. Even admins cannot view stored secrets. Rotation is supported without changing configurations.',
          codeExample: `// Kotlin DSL - Secure Values Configuration
project {
    // Secure tokens stored at project level
    features {
        // AWS credentials
        feature {
            id = "aws-credentials"
            type = "OAuthProvider"
            param("providerType", "AWS")
            param("secure:aws.access.key.id", "credentialsJSON:aws-access-key")
            param("secure:aws.secret.access.key", "credentialsJSON:aws-secret-key")
        }
    }
}

object Deploy : BuildType({
    params {
        // Reference secure values by token ID
        password("env.AWS_ACCESS_KEY_ID", "credentialsJSON:aws-access-key")
        password("env.AWS_SECRET_ACCESS_KEY", "credentialsJSON:aws-secret-key")
        password("env.DATABASE_PASSWORD", "credentialsJSON:db-password")

        // SSH key reference
        password("env.SSH_KEY", "credentialsJSON:deploy-ssh-key")
    }

    steps {
        script {
            scriptContent = """
                # Secure values are decrypted at runtime
                # and masked in all logs: ******

                # AWS credentials available as env vars
                aws s3 cp artifact.zip s3://my-bucket/

                # Write SSH key for deployment
                echo "%env.SSH_KEY%" > /tmp/deploy_key
                chmod 600 /tmp/deploy_key
                ssh -i /tmp/deploy_key user@server "deploy.sh"
                rm /tmp/deploy_key
            """.trimIndent()
        }
    }
})`
        },
        {
          name: 'Authentication',
          explanation: 'Multiple authentication methods: built-in, LDAP, Active Directory, OAuth (GitHub, GitLab, Bitbucket). Two-factor authentication for enhanced security. Token-based authentication for REST API and agents. Session management and timeout policies.',
          codeExample: `<!-- Authentication configuration -->
<!-- <TeamCity Data>/config/auth-config.xml -->
<auth-config>
  <!-- Built-in authentication -->
  <auth-module>
    <type>default</type>
    <properties>
      <property name="freeRegistration" value="false"/>
    </properties>
  </auth-module>

  <!-- LDAP/Active Directory -->
  <auth-module>
    <type>LDAP</type>
    <properties>
      <property name="ldap.url" value="ldap://ldap.example.com:389"/>
      <property name="ldap.baseDN" value="dc=example,dc=com"/>
      <property name="ldap.userFilter" value="(sAMAccountName=$login$)"/>
      <property name="ldap.syncUsers" value="true"/>
    </properties>
  </auth-module>

  <!-- GitHub OAuth -->
  <auth-module>
    <type>GitHub.com</type>
    <properties>
      <property name="clientId" value="your-client-id"/>
      <property name="clientSecret" value="your-client-secret"/>
      <property name="scope" value="user:email,read:org"/>
    </properties>
  </auth-module>
</auth-config>

---
# Create access token via REST API
curl -X POST "https://teamcity.example.com/app/rest/users/current/tokens" \\
  -H "Authorization: Basic $(echo -n user:password | base64)" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "ci-automation-token",
    "expirationTime": "2025-12-31T23:59:59Z",
    "permissions": {
      "project": {
        "id": "MyProject",
        "permission": ["RUN_BUILD", "VIEW_PROJECT"]
      }
    }
  }'`
        },
        {
          name: 'Authorization',
          explanation: 'Role-based access control (RBAC) with predefined and custom roles. Permissions can be set at server, project, or build configuration level. Roles include: System Admin, Project Admin, Developer, Viewer. Fine-grained permissions for specific actions.',
          codeExample: `# REST API - Role and Permission Management

# List all roles
curl "https://teamcity.example.com/app/rest/roles" \\
  -H "Authorization: Bearer $TOKEN"

# Create custom role
curl -X POST "https://teamcity.example.com/app/rest/roles" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "id": "RELEASE_MANAGER",
    "name": "Release Manager",
    "permissions": {
      "permission": [
        {"id": "RUN_BUILD"},
        {"id": "CANCEL_BUILD"},
        {"id": "PIN_UNPIN_BUILD"},
        {"id": "TAG_BUILD"},
        {"id": "CHANGE_CLEANUP_RULES"}
      ]
    }
  }'

# Assign role to user at project level
curl -X POST "https://teamcity.example.com/app/rest/users/username:john/roles" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "roleId": "RELEASE_MANAGER",
    "scope": "p:MyProject"
  }'

# Assign role to group
curl -X POST "https://teamcity.example.com/app/rest/userGroups/key:developers/roles" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "roleId": "PROJECT_DEVELOPER",
    "scope": "p:MyProject"
  }'

# Get user permissions
curl "https://teamcity.example.com/app/rest/users/current/permissions?locator=project:MyProject" \\
  -H "Authorization: Bearer $TOKEN"`
        },
        {
          name: 'Audit Log',
          explanation: 'Comprehensive audit trail of all configuration changes and security events. Track who changed what and when. Login attempts, permission changes, and build operations are logged. Export audit logs for compliance and forensics.',
          codeExample: `# REST API - Audit Log Queries

# Get recent audit events
curl "https://teamcity.example.com/app/rest/audit?locator=count:100" \\
  -H "Authorization: Bearer $TOKEN"

# Filter by user
curl "https://teamcity.example.com/app/rest/audit?locator=user:john,count:50" \\
  -H "Authorization: Bearer $TOKEN"

# Filter by action type
curl "https://teamcity.example.com/app/rest/audit?locator=action:CONFIGURATION_CHANGE" \\
  -H "Authorization: Bearer $TOKEN"

# Filter by date range
curl "https://teamcity.example.com/app/rest/audit?locator=startDate:20240101T000000,endDate:20240131T235959" \\
  -H "Authorization: Bearer $TOKEN"

# Filter by affected object
curl "https://teamcity.example.com/app/rest/audit?locator=affectedObject:(type:buildType,id:MyBuild)" \\
  -H "Authorization: Bearer $TOKEN"

---
# Export audit log for compliance
#!/bin/bash
# export-audit-log.sh

DATE=$(date -d "30 days ago" +%Y%m%dT000000)
OUTPUT_FILE="audit-$(date +%Y%m%d).json"

curl "https://teamcity.example.com/app/rest/audit?locator=startDate:$DATE,count:10000" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Accept: application/json" \\
  -o "$OUTPUT_FILE"

# Convert to CSV for analysis
jq -r '.auditEvent[] |
  [.timestamp, .user.username, .action.name, .objectType, .objectName] |
  @csv' "$OUTPUT_FILE" > "audit-$(date +%Y%m%d).csv"

echo "Audit log exported to $OUTPUT_FILE"`
        }
      ]
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: '🔌',
      color: '#ec4899',
      description: 'Issue tracker integration (Jira, GitHub, GitLab). Commit status publisher for PR checks. REST API for automation. Slack, Teams, and webhook notifications.',
      diagram: IntegrationsDiagram,
      details: [
        {
          name: 'Issue Trackers',
          explanation: 'Connect to Jira, YouTrack, GitHub Issues, GitLab Issues, Azure DevOps, and more. TeamCity links commits to issues and shows issue details in builds. Issue status can be updated automatically. Custom regex patterns match issue references.',
          codeExample: `// Kotlin DSL - Issue Tracker Integration
project {
    features {
        // Jira integration
        feature {
            id = "PROJECT_EXT_JIRA"
            type = "IssueTracker"
            param("type", "jira")
            param("name", "Jira")
            param("pattern", """(\\b[A-Z]+-\\d+\\b)""")
            param("host", "https://company.atlassian.net")
            param("username", "teamcity@company.com")
            param("secure:password", "credentialsJSON:jira-api-token")
        }

        // GitHub Issues
        feature {
            id = "PROJECT_EXT_GITHUB"
            type = "IssueTracker"
            param("type", "GithubIssues")
            param("repository", "https://github.com/company/repo")
            param("pattern", """#(\\d+)""")
            param("authType", "token")
            param("secure:accessToken", "credentialsJSON:github-token")
        }

        // YouTrack
        feature {
            id = "PROJECT_EXT_YOUTRACK"
            type = "IssueTracker"
            param("type", "youtrack")
            param("host", "https://company.youtrack.cloud")
            param("pattern", """(\\bPROJ-\\d+\\b)""")
            param("secure:password", "credentialsJSON:youtrack-token")
        }
    }
}

// Build shows linked issues from commit messages
// Example commit: "Fix login bug PROJ-123 #456"`
        },
        {
          name: 'Commit Status Publisher',
          explanation: 'Report build status to VCS platforms: GitHub, GitLab, Bitbucket, Azure DevOps. Status checks show pending, success, or failure on pull requests. Multiple build configurations can report to the same commit. Enables required status checks for merging.',
          codeExample: `// Kotlin DSL - Commit Status Publisher
object Build : BuildType({
    id("Build")
    name = "Build and Test"

    features {
        // GitHub commit status
        commitStatusPublisher {
            vcsRootExtId = "\${MainVcsRoot.id}"
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:github-token"
                }
            }
        }

        // GitLab commit status
        commitStatusPublisher {
            vcsRootExtId = "\${GitLabVcsRoot.id}"
            publisher = gitlab {
                gitlabApiUrl = "https://gitlab.company.com/api/v4"
                accessToken = "credentialsJSON:gitlab-token"
            }
        }

        // Bitbucket commit status
        commitStatusPublisher {
            vcsRootExtId = "\${BitbucketVcsRoot.id}"
            publisher = bitbucketServer {
                url = "https://bitbucket.company.com"
                userName = "teamcity"
                password = "credentialsJSON:bitbucket-password"
            }
        }

        // Azure DevOps commit status
        commitStatusPublisher {
            vcsRootExtId = "\${AzureVcsRoot.id}"
            publisher = tfs {
                serverUrl = "https://dev.azure.com/company"
                authType = token {
                    token = "credentialsJSON:azure-token"
                }
            }
        }
    }
})`
        },
        {
          name: 'Notifications',
          explanation: 'Send notifications via email, Slack, Microsoft Teams, or webhooks. Configure notification rules based on build events: failure, success, changes. Personal notification settings let users choose their preferences. Custom notification templates for branding.',
          codeExample: `// Kotlin DSL - Notification Configuration
object Build : BuildType({
    features {
        // Slack notifications
        notifications {
            notifierSettings = slackNotifier {
                connection = "PROJECT_EXT_SLACK"
                sendTo = "#builds"
                messageFormat = verboseMessageFormat {
                    addStatusText = true
                    addBranch = true
                    addBuildStatus = true
                    addChanges = true
                }
            }
            buildStarted = true
            buildFailed = true
            buildFinishedSuccessfully = false  // Only notify on failure
            firstSuccessAfterFailure = true
        }

        // Email notifications
        notifications {
            notifierSettings = emailNotifier {
                email = "team@company.com"
            }
            buildFailed = true
            buildProbablyHanging = true
        }
    }
})

---
// Webhook notification for custom integrations
object BuildWithWebhook : BuildType({
    features {
        notifications {
            notifierSettings = webhookNotifier {
                url = "https://api.company.com/teamcity-webhook"
                authentication = bearerToken {
                    token = "credentialsJSON:webhook-token"
                }
            }
            buildFailed = true
            buildFinishedSuccessfully = true
            buildStarted = true
        }
    }
})

# Slack connection at project level
project {
    features {
        feature {
            id = "PROJECT_EXT_SLACK"
            type = "OAuthProvider"
            param("providerType", "slackConnection")
            param("secure:token", "credentialsJSON:slack-bot-token")
        }
    }
}`
        },
        {
          name: 'REST API',
          explanation: 'Comprehensive REST API for automation and integration. Trigger builds, query status, manage configurations, and access build data programmatically. Authentication via tokens. API documentation with examples available in TeamCity installation.',
          codeExample: `# TeamCity REST API Examples

# Trigger a build
curl -X POST "https://teamcity.example.com/app/rest/buildQueue" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "buildType": {"id": "MyProject_Build"},
    "properties": {
      "property": [
        {"name": "env.VERSION", "value": "1.2.3"},
        {"name": "env.DEPLOY_TARGET", "value": "staging"}
      ]
    },
    "branchName": "refs/heads/feature-branch"
  }'

# Get build status
curl "https://teamcity.example.com/app/rest/builds/id:12345" \\
  -H "Authorization: Bearer $TOKEN"

# Get running builds
curl "https://teamcity.example.com/app/rest/builds?locator=running:true,buildType:MyProject_Build" \\
  -H "Authorization: Bearer $TOKEN"

# Download artifacts
curl "https://teamcity.example.com/app/rest/builds/id:12345/artifacts/content/artifact.zip" \\
  -H "Authorization: Bearer $TOKEN" \\
  -o artifact.zip

# Get build log
curl "https://teamcity.example.com/downloadBuildLog.html?buildId=12345" \\
  -H "Authorization: Bearer $TOKEN" \\
  -o build.log

# Cancel a running build
curl -X POST "https://teamcity.example.com/app/rest/builds/id:12345" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "state": "finished",
    "canceledInfo": {"comment": "Cancelled by automation"}
  }'

# Pin a build
curl -X PUT "https://teamcity.example.com/app/rest/builds/id:12345/pin" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: text/plain" \\
  -d "Release v1.2.3"`
        },
        {
          name: 'IDE Integration',
          explanation: 'IntelliJ IDEA, VS Code, and other JetBrains IDEs have TeamCity plugins. View build status, trigger builds, and run pre-tested commits directly from IDE. Remote run allows testing changes before committing. Seamless development workflow integration.',
          codeExample: `// IntelliJ IDEA TeamCity Plugin Configuration
// Settings -> Tools -> TeamCity

// 1. Server connection
Server URL: https://teamcity.example.com
Username: developer@company.com
Token: <personal-access-token>

// 2. Remote Run (Pre-tested Commit)
// Right-click on project -> Run Remote Build
// - Select changes to include
// - Choose build configuration
// - Wait for results before committing

---
// .idea/teamcity-mappings.xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
  <component name="TeamcityProjectMappings">
    <server url="https://teamcity.example.com">
      <project name="MyProject" buildTypeId="MyProject_Build">
        <mapping localPath="src" serverPath="src"/>
      </project>
    </server>
  </component>
</project>

---
// VS Code TeamCity Extension settings.json
{
  "teamcity.serverUrl": "https://teamcity.example.com",
  "teamcity.projectId": "MyProject",
  "teamcity.showBuildStatus": true,
  "teamcity.pollingInterval": 30000,
  "teamcity.buildConfigurations": [
    "MyProject_Build",
    "MyProject_Test",
    "MyProject_Deploy"
  ]
}

// Remote run from terminal (using REST API)
# Create personal build with local changes
git diff > changes.patch
curl -X POST "https://teamcity.example.com/app/rest/buildQueue" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "buildType": {"id": "MyProject_Build"},
    "personal": true,
    "changes": {"file": [{"name": "changes.patch"}]}
  }'`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

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
      { name: 'DevOps', icon: '🔧', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'TeamCity', icon: '🏗️', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'TeamCity', icon: '🏗️' })
    }

    return stack
  }

  const handleBreadcrumbClick = (index) => {
    const stack = buildBreadcrumbStack()
    if (stack[index].onClick) {
      stack[index].onClick()
    }
  }

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
    background: 'linear-gradient(135deg, #93c5fd, #60a5fa)',
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

  const navButtonStyle = {
    padding: '0.75rem 1.25rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
            ← Back to DevOps
          </button>
          <h1 style={titleStyle}>TeamCity</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              style={navButtonStyle}
              onClick={onNext}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={TEAMCITY_COLORS}
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
              {concept.details.length} topics • Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Concept Detail Modal */}
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
              colors={TEAMCITY_COLORS}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <h2 style={{ color: selectedConcept.color, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button onClick={handlePreviousConcept} disabled={selectedConceptIndex === 0} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>{selectedConceptIndex + 1}/{concepts.length}</span>
                <button onClick={handleNextConcept} disabled={selectedConceptIndex === concepts.length - 1} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>→</button>
                <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button key={i} onClick={() => setSelectedDetailIndex(i)} style={{ padding: '0.5rem 1rem', background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)', border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`, borderRadius: '0.5rem', color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedDetailIndex === i ? '600' : '400', transition: 'all 0.2s' }}>{detail.name}</button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  {DiagramComponent && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  {detail.codeExample && (
                    <div style={{
                      background: '#1e1e1e',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      border: '1px solid #333',
                      marginTop: '1rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.75rem',
                        paddingBottom: '0.5rem',
                        borderBottom: '1px solid #333'
                      }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '500' }}>Code Example</span>
                      </div>
                      <div style={{ overflowX: 'auto' }}>
                        <SyntaxHighlighter code={detail.codeExample} />
                      </div>
                    </div>
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

export default TeamCity

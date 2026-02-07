import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

const JENKINS_COLORS = {
  primary: '#d62728',
  primaryHover: '#ef4444',
  bg: 'rgba(214, 39, 40, 0.1)',
  border: 'rgba(214, 39, 40, 0.3)',
  arrow: '#d62728',
  hoverBg: 'rgba(214, 39, 40, 0.2)',
  topicBg: 'rgba(214, 39, 40, 0.2)'
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

// Jenkins Pipeline Diagram - Pipeline stages flow
const JenkinsPipelineDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="pipelineArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Jenkins Pipeline Stages Flow</text>
    <rect x="30" y="60" width="130" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="95" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Checkout</text>
    <text x="95" y="108" textAnchor="middle" fill="#bfdbfe" fontSize="9">git clone</text>
    <text x="95" y="122" textAnchor="middle" fill="#bfdbfe" fontSize="9">checkout scm</text>
    <rect x="200" y="60" width="130" height="70" rx="8" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="265" y="90" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Build</text>
    <text x="265" y="108" textAnchor="middle" fill="#93c5fd" fontSize="9">mvn compile</text>
    <text x="265" y="122" textAnchor="middle" fill="#93c5fd" fontSize="9">npm build</text>
    <rect x="370" y="60" width="130" height="70" rx="8" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="435" y="90" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Test</text>
    <text x="435" y="108" textAnchor="middle" fill="#93c5fd" fontSize="9">{`Unit & Integration`}</text>
    <text x="435" y="122" textAnchor="middle" fill="#93c5fd" fontSize="9">Code Coverage</text>
    <rect x="540" y="60" width="130" height="70" rx="8" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="605" y="90" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Deploy</text>
    <text x="605" y="108" textAnchor="middle" fill="#93c5fd" fontSize="9">Push to Registry</text>
    <text x="605" y="122" textAnchor="middle" fill="#93c5fd" fontSize="9">Deploy to K8s</text>
    <rect x="710" y="60" width="60" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="740" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Done</text>
    <line x1="160" y1="95" x2="195" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#pipelineArrow)"/>
    <line x1="330" y1="95" x2="365" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#pipelineArrow)"/>
    <line x1="500" y1="95" x2="535" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#pipelineArrow)"/>
    <line x1="670" y1="95" x2="705" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#pipelineArrow)"/>
    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="10">{`Declarative Pipeline: pipeline {'{'} agent any {'>'} stages {'{'} stage('...') {'{'} steps {'{'}...{'}'} {'}'} {'}'} {'}'}`}</text>
  </svg>
)

// Jenkins Agent Diagram - Master-Agent architecture
const JenkinsAgentDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="agentArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Jenkins Master-Agent Architecture</text>
    <rect x="300" y="45" width="200" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="72" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Jenkins Controller</text>
    <text x="400" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="10">{`Orchestration & UI`}</text>
    <rect x="50" y="150" width="140" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="120" y="175" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Linux Agent</text>
    <text x="120" y="195" textAnchor="middle" fill="#86efac" fontSize="9">Docker builds</text>
    <text x="120" y="210" textAnchor="middle" fill="#86efac" fontSize="9">SSH/JNLP</text>
    <rect x="230" y="150" width="140" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="300" y="175" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Windows Agent</text>
    <text x="300" y="195" textAnchor="middle" fill="#fcd34d" fontSize="9">.NET builds</text>
    <text x="300" y="210" textAnchor="middle" fill="#fcd34d" fontSize="9">JNLP</text>
    <rect x="410" y="150" width="140" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="480" y="175" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Docker Agent</text>
    <text x="480" y="195" textAnchor="middle" fill="#c4b5fd" fontSize="9">Ephemeral containers</text>
    <text x="480" y="210" textAnchor="middle" fill="#c4b5fd" fontSize="9">Dynamic scaling</text>
    <rect x="590" y="150" width="140" height="70" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="660" y="175" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">K8s Pod Agent</text>
    <text x="660" y="195" textAnchor="middle" fill="#a5f3fc" fontSize="9">Pod templates</text>
    <text x="660" y="210" textAnchor="middle" fill="#a5f3fc" fontSize="9">Auto-provisioned</text>
    <path d="M 340 105 Q 250 130, 150 150" fill="none" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#agentArrow)"/>
    <path d="M 380 105 Q 350 130, 320 150" fill="none" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#agentArrow)"/>
    <path d="M 420 105 Q 450 130, 470 150" fill="none" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#agentArrow)"/>
    <path d="M 460 105 Q 550 130, 640 150" fill="none" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#agentArrow)"/>
    <text x="220" y="130" fill="#93c5fd" fontSize="8">Distribute jobs</text>
    <text x="560" y="130" fill="#93c5fd" fontSize="8">Distribute jobs</text>
  </svg>
)

// Jenkins Job Diagram - Freestyle vs Pipeline comparison
const JenkinsJobDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Freestyle Job vs Pipeline Job</text>
    <rect x="50" y="50" width="300" height="130" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Freestyle Job</text>
    <text x="200" y="100" textAnchor="middle" fill="#fcd34d" fontSize="10">GUI-based configuration</text>
    <text x="200" y="120" textAnchor="middle" fill="#fcd34d" fontSize="10">Simple build steps</text>
    <text x="200" y="140" textAnchor="middle" fill="#fcd34d" fontSize="10">Limited pipeline features</text>
    <text x="200" y="160" textAnchor="middle" fill="#fcd34d" fontSize="10">Good for simple tasks</text>
    <rect x="450" y="50" width="300" height="130" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">Pipeline Job</text>
    <text x="600" y="100" textAnchor="middle" fill="#93c5fd" fontSize="10">Code-based (Jenkinsfile)</text>
    <text x="600" y="120" textAnchor="middle" fill="#93c5fd" fontSize="10">Version controlled</text>
    <text x="600" y="140" textAnchor="middle" fill="#93c5fd" fontSize="10">Parallel stages, shared libs</text>
    <text x="600" y="160" textAnchor="middle" fill="#93c5fd" fontSize="10">Best for CI/CD workflows</text>
    <text x="400" y="110" textAnchor="middle" fill="#64748b" fontSize="24">vs</text>
  </svg>
)

// Shared Library Diagram - Library structure
const SharedLibraryDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Jenkins Shared Library Structure</text>
    <rect x="250" y="45" width="300" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="72" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">jenkins-shared-library/</text>
    <rect x="100" y="110" width="150" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="175" y="135" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">vars/</text>
    <text x="175" y="155" textAnchor="middle" fill="#86efac" fontSize="9">Global variables</text>
    <text x="175" y="168" textAnchor="middle" fill="#86efac" fontSize="8">buildMaven.groovy</text>
    <rect x="280" y="110" width="150" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="355" y="135" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">src/</text>
    <text x="355" y="155" textAnchor="middle" fill="#c4b5fd" fontSize="9">Groovy classes</text>
    <text x="355" y="168" textAnchor="middle" fill="#c4b5fd" fontSize="8">com/company/Utils</text>
    <rect x="460" y="110" width="150" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="535" y="135" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">resources/</text>
    <text x="535" y="155" textAnchor="middle" fill="#fcd34d" fontSize="9">Non-Groovy files</text>
    <text x="535" y="168" textAnchor="middle" fill="#fcd34d" fontSize="8">scripts/, templates/</text>
    <line x1="300" y1="85" x2="200" y2="110" stroke="#60a5fa" strokeWidth="1.5"/>
    <line x1="400" y1="85" x2="380" y2="110" stroke="#60a5fa" strokeWidth="1.5"/>
    <line x1="500" y1="85" x2="510" y2="110" stroke="#60a5fa" strokeWidth="1.5"/>
    <rect x="200" y="195" width="400" height="50" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="400" y="217" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Usage in Jenkinsfile:</text>
    <text x="400" y="235" textAnchor="middle" fill="#93c5fd" fontSize="9">@Library('my-shared-library@main') _  |  buildMaven()</text>
  </svg>
)

// Docker Integration Diagram
const DockerIntegrationDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="dockerArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Jenkins Docker Integration Flow</text>
    <rect x="50" y="60" width="120" height="70" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="90" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Jenkinsfile</text>
    <text x="110" y="108" textAnchor="middle" fill="#93c5fd" fontSize="9">{'agent { docker }'}</text>
    <rect x="220" y="60" width="120" height="70" rx="8" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="280" y="90" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">Pull Image</text>
    <text x="280" y="108" textAnchor="middle" fill="#a5f3fc" fontSize="9">maven:3.8-jdk11</text>
    <rect x="390" y="60" width="120" height="70" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="450" y="90" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Run Build</text>
    <text x="450" y="108" textAnchor="middle" fill="#86efac" fontSize="9">mvn package</text>
    <rect x="560" y="60" width="120" height="70" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="620" y="90" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Build Image</text>
    <text x="620" y="108" textAnchor="middle" fill="#c4b5fd" fontSize="9">docker.build()</text>
    <rect x="730" y="60" width="50" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="755" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Push</text>
    <line x1="170" y1="95" x2="215" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#dockerArrow)"/>
    <line x1="340" y1="95" x2="385" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#dockerArrow)"/>
    <line x1="510" y1="95" x2="555" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#dockerArrow)"/>
    <line x1="680" y1="95" x2="725" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#dockerArrow)"/>
    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="10">Docker agent provides isolated, consistent build environments</text>
    <text x="400" y="180" textAnchor="middle" fill="#64748b" fontSize="10">docker.withRegistry() for authenticated pushes to ECR, GCR, DockerHub</text>
  </svg>
)

// Kubernetes Pod Template Diagram
const KubernetesPodDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Kubernetes Pod Template for Jenkins Agent</text>
    <rect x="150" y="50" width="500" height="140" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="400" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Jenkins Agent Pod</text>
    <rect x="180" y="90" width="100" height="80" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="230" y="115" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">JNLP</text>
    <text x="230" y="133" textAnchor="middle" fill="#86efac" fontSize="8">jenkins-agent</text>
    <text x="230" y="148" textAnchor="middle" fill="#86efac" fontSize="7">Communication</text>
    <text x="230" y="163" textAnchor="middle" fill="#86efac" fontSize="7">with controller</text>
    <rect x="300" y="90" width="100" height="80" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="115" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Maven</text>
    <text x="350" y="133" textAnchor="middle" fill="#c4b5fd" fontSize="8">maven:3.8</text>
    <text x="350" y="148" textAnchor="middle" fill="#c4b5fd" fontSize="7">Build container</text>
    <text x="350" y="163" textAnchor="middle" fill="#c4b5fd" fontSize="7">mvn commands</text>
    <rect x="420" y="90" width="100" height="80" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="470" y="115" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Docker</text>
    <text x="470" y="133" textAnchor="middle" fill="#a5f3fc" fontSize="8">docker:dind</text>
    <text x="470" y="148" textAnchor="middle" fill="#a5f3fc" fontSize="7">Build images</text>
    <text x="470" y="163" textAnchor="middle" fill="#a5f3fc" fontSize="7">docker socket</text>
    <rect x="540" y="90" width="100" height="80" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="590" y="115" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Kubectl</text>
    <text x="590" y="133" textAnchor="middle" fill="#fcd34d" fontSize="8">bitnami/kubectl</text>
    <text x="590" y="148" textAnchor="middle" fill="#fcd34d" fontSize="7">Deploy to K8s</text>
    <text x="590" y="163" textAnchor="middle" fill="#fcd34d" fontSize="7">kubectl apply</text>
    <text x="400" y="210" textAnchor="middle" fill="#64748b" fontSize="10">container('maven') {'{'} sh 'mvn package' {'}'} | Sidecar containers provide isolated tools</text>
  </svg>
)

// Credentials Diagram
const CredentialsDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Jenkins Credentials Management</text>
    <rect x="300" y="45" width="200" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Credentials Store</text>
    <rect x="50" y="110" width="140" height="55" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="120" y="133" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Username/Password</text>
    <text x="120" y="152" textAnchor="middle" fill="#fca5a5" fontSize="8">$DB_CREDS_USR/PSW</text>
    <rect x="220" y="110" width="140" height="55" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="290" y="133" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Secret Text</text>
    <text x="290" y="152" textAnchor="middle" fill="#86efac" fontSize="8">API_KEY, tokens</text>
    <rect x="390" y="110" width="140" height="55" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="460" y="133" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">SSH Key</text>
    <text x="460" y="152" textAnchor="middle" fill="#c4b5fd" fontSize="8">sshagent([...])</text>
    <rect x="560" y="110" width="140" height="55" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="630" y="133" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Certificate</text>
    <text x="630" y="152" textAnchor="middle" fill="#fcd34d" fontSize="8">PKCS12, PEM</text>
    <line x1="340" y1="90" x2="150" y2="110" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="370" y1="90" x2="290" y2="110" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="430" y1="90" x2="460" y2="110" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="460" y1="90" x2="600" y2="110" stroke="#60a5fa" strokeWidth="1"/>
  </svg>
)

// Plugin Architecture Diagram
const PluginArchitectureDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Jenkins Plugin Ecosystem</text>
    <circle cx="400" cy="110" r="45" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="105" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Jenkins</text>
    <text x="400" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="9">Core</text>
    <rect x="50" y="60" width="100" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="100" y="82" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Pipeline</text>
    <text x="100" y="100" textAnchor="middle" fill="#86efac" fontSize="8">workflow-*</text>
    <rect x="50" y="125" width="100" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="100" y="147" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Docker</text>
    <text x="100" y="165" textAnchor="middle" fill="#c4b5fd" fontSize="8">docker-workflow</text>
    <rect x="200" y="35" width="100" height="50" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="250" y="57" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Git</text>
    <text x="250" y="75" textAnchor="middle" fill="#a5f3fc" fontSize="8">git, github</text>
    <rect x="200" y="150" width="100" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="250" y="172" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Kubernetes</text>
    <text x="250" y="190" textAnchor="middle" fill="#fcd34d" fontSize="8">kubernetes</text>
    <rect x="500" y="35" width="100" height="50" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="550" y="57" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Blue Ocean</text>
    <text x="550" y="75" textAnchor="middle" fill="#fbcfe8" fontSize="8">Modern UI</text>
    <rect x="500" y="150" width="100" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="550" y="172" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Credentials</text>
    <text x="550" y="190" textAnchor="middle" fill="#93c5fd" fontSize="8">credentials-*</text>
    <rect x="650" y="60" width="100" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="700" y="82" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">SonarQube</text>
    <text x="700" y="100" textAnchor="middle" fill="#86efac" fontSize="8">sonar-scanner</text>
    <rect x="650" y="125" width="100" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="700" y="147" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Slack</text>
    <text x="700" y="165" textAnchor="middle" fill="#c4b5fd" fontSize="8">slack-notifier</text>
    <line x1="150" y1="85" x2="355" y2="100" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="150" y1="150" x2="355" y2="120" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="300" y1="60" x2="360" y2="85" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="300" y1="175" x2="360" y2="130" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="445" y1="100" x2="500" y2="60" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="445" y1="120" x2="500" y2="175" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="445" y1="100" x2="650" y2="85" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="445" y1="120" x2="650" y2="150" stroke="#60a5fa" strokeWidth="1"/>
  </svg>
)

function Jenkins({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'pipeline-as-code',
      name: 'Pipeline as Code',
      icon: '📜',
      color: '#3b82f6',
      description: 'Declarative syntax with pipeline{}, agent{}, stages{}, and post{}. Scripted pipelines use Groovy for complex logic. Jenkinsfile in repo enables pipeline-as-code for version control and GitOps workflows.',
      diagram: JenkinsPipelineDiagram,
      details: [
        {
          name: 'Declarative Pipeline',
          explanation: 'Declarative Pipeline provides a simplified, opinionated syntax for defining CI/CD workflows. It uses predefined sections like pipeline, agent, stages, steps, and post. The structured format enforces best practices and is easier to read and maintain. Supports conditional execution with when blocks, parallel stages, and input steps for manual approval gates.',
          codeExample: `// Jenkinsfile - Declarative Pipeline
pipeline {
    agent any

    environment {
        APP_NAME = 'my-application'
        DEPLOY_ENV = 'staging'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'mvn test'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'mvn verify -Pintegration'
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            input {
                message "Deploy to production?"
                ok "Yes, deploy!"
            }
            steps {
                sh './deploy.sh \${DEPLOY_ENV}'
            }
        }
    }

    post {
        always {
            junit '**/target/surefire-reports/*.xml'
            cleanWs()
        }
        success {
            slackSend color: 'good', message: "Build succeeded!"
        }
        failure {
            slackSend color: 'danger', message: "Build failed!"
        }
    }
}`
        },
        {
          name: 'Scripted Pipeline',
          explanation: 'Scripted Pipeline offers full Groovy programming capabilities for complex workflows. Uses node and stage blocks with imperative programming style. Provides maximum flexibility for advanced use cases like dynamic stage generation, complex conditionals, and custom logic. Best for teams needing programmatic control over pipeline behavior.',
          codeExample: `// Jenkinsfile - Scripted Pipeline
node('linux') {
    def services = ['api', 'web', 'worker']
    def buildResults = [:]

    try {
        stage('Checkout') {
            checkout scm
            env.GIT_COMMIT = sh(
                script: 'git rev-parse HEAD',
                returnStdout: true
            ).trim()
        }

        stage('Dynamic Builds') {
            // Generate stages dynamically
            def parallelBuilds = [:]

            services.each { service ->
                parallelBuilds[service] = {
                    stage("Build \${service}") {
                        dir(service) {
                            def result = sh(
                                script: 'mvn package',
                                returnStatus: true
                            )
                            buildResults[service] = result == 0
                        }
                    }
                }
            }

            parallel parallelBuilds
        }

        stage('Conditional Deploy') {
            if (env.BRANCH_NAME == 'main') {
                def failedServices = buildResults.findAll { !it.value }
                if (failedServices.isEmpty()) {
                    sh './deploy-all.sh'
                } else {
                    error "Failed: \${failedServices.keySet()}"
                }
            }
        }

    } catch (Exception e) {
        currentBuild.result = 'FAILURE'
        throw e
    } finally {
        cleanWs()
    }
}`
        },
        {
          name: 'Jenkinsfile Best Practices',
          explanation: 'Store Jenkinsfiles in the root of your repository for version control. Use environment variables for configuration. Define stages clearly: Checkout, Build, Test, Deploy. Implement proper error handling with try-catch-finally. Use post blocks for cleanup and notifications. Keep pipelines DRY with shared libraries.',
          codeExample: `// Jenkinsfile - Best Practices Example
@Library('my-shared-library@main') _

pipeline {
    agent { label 'docker' }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    environment {
        // Use credentials binding
        DOCKER_CREDS = credentials('docker-hub-creds')
        // Avoid hardcoding values
        VERSION = "\${env.BUILD_NUMBER}-\${env.GIT_COMMIT?.take(7)}"
    }

    stages {
        stage('Setup') {
            steps {
                // Use shared library functions
                setupBuildEnvironment()
            }
        }

        stage('Build & Test') {
            steps {
                // Fail fast, clear stage names
                sh '''
                    mvn clean verify \\
                        -Dmaven.test.failure.ignore=false \\
                        -Dversion=\${VERSION}
                '''
            }
        }

        stage('Security Scan') {
            steps {
                // Run security checks
                sh 'trivy image --exit-code 1 myapp:\${VERSION}'
            }
        }
    }

    post {
        always {
            // Always archive test results
            junit allowEmptyResults: true,
                  testResults: '**/target/surefire-reports/*.xml'
            // Cleanup workspace
            cleanWs()
        }
        failure {
            // Notify on failure
            emailext subject: "FAILED: \${env.JOB_NAME}",
                     body: "Check: \${env.BUILD_URL}",
                     recipientProviders: [culprits()]
        }
    }
}`
        },
        {
          name: 'Stages and Steps',
          explanation: 'Stages represent major phases of your pipeline (Build, Test, Deploy). Each stage contains steps that execute commands. Use parallel blocks to run independent stages concurrently. Steps include sh/bat for shell commands, script blocks for Groovy code, and plugin-provided steps. Organize stages logically for clear pipeline visualization.',
          codeExample: `// Stages and Steps Examples
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                // Shell command
                sh 'mvn compile'

                // Windows batch
                // bat 'msbuild solution.sln'

                // Script block for Groovy
                script {
                    def version = readFile('VERSION').trim()
                    env.APP_VERSION = version
                }
            }
        }

        stage('Parallel Testing') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'mvn test -Dtest=*Unit*'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'mvn test -Dtest=*Integration*'
                    }
                }
                stage('E2E Tests') {
                    agent { label 'chrome' }
                    steps {
                        sh 'npm run e2e'
                    }
                }
            }
            // Fail immediately if any parallel stage fails
            failFast true
        }

        stage('Deploy Stages') {
            stages {
                stage('Deploy to Staging') {
                    steps {
                        sh './deploy.sh staging'
                    }
                }
                stage('Smoke Tests') {
                    steps {
                        sh './smoke-tests.sh'
                    }
                }
                stage('Deploy to Production') {
                    steps {
                        sh './deploy.sh production'
                    }
                }
            }
        }
    }
}`
        },
        {
          name: 'Parameters and Triggers',
          explanation: 'Parameters allow runtime input: choice, string, boolean, password types. Access via params.PARAM_NAME. Triggers automate pipeline execution: pollSCM for periodic checks, cron for scheduled runs, upstream for job dependencies. webhooks and GitHub/GitLab triggers enable event-driven pipelines.',
          codeExample: `// Parameters and Triggers
pipeline {
    agent any

    parameters {
        string(
            name: 'DEPLOY_ENV',
            defaultValue: 'staging',
            description: 'Target environment'
        )
        choice(
            name: 'REGION',
            choices: ['us-east-1', 'eu-west-1', 'ap-south-1'],
            description: 'AWS Region'
        )
        booleanParam(
            name: 'RUN_TESTS',
            defaultValue: true,
            description: 'Run test suite?'
        )
        password(
            name: 'API_TOKEN',
            description: 'API authentication token'
        )
    }

    triggers {
        // Poll SCM every 5 minutes
        pollSCM('H/5 * * * *')

        // Nightly build at 2 AM
        cron('0 2 * * *')

        // Trigger when upstream job completes
        upstream(
            upstreamProjects: 'build-base-image',
            threshold: hudson.model.Result.SUCCESS
        )

        // GitHub webhook (requires plugin)
        // githubPush()
    }

    stages {
        stage('Using Parameters') {
            steps {
                echo "Deploying to: \${params.DEPLOY_ENV}"
                echo "Region: \${params.REGION}"

                script {
                    if (params.RUN_TESTS) {
                        sh 'mvn test'
                    } else {
                        echo 'Skipping tests'
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                expression { params.DEPLOY_ENV != 'production' }
            }
            steps {
                sh """
                    ./deploy.sh \\
                        --env \${params.DEPLOY_ENV} \\
                        --region \${params.REGION}
                """
            }
        }
    }
}`
        },
        {
          name: 'Post Actions',
          explanation: 'Post blocks execute after pipeline completion based on status: always, success, failure, unstable, changed, aborted, cleanup. Use for notifications (email, Slack), artifact archiving, test result publishing, and workspace cleanup. Ensures cleanup runs regardless of pipeline outcome.',
          codeExample: `// Post Actions Examples
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'mvn package'
            }
            // Stage-level post actions
            post {
                success {
                    stash includes: 'target/*.jar', name: 'app-jar'
                }
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
    }

    // Pipeline-level post actions
    post {
        always {
            // Always runs - cleanup & reporting
            junit '**/target/surefire-reports/*.xml'
            jacoco execPattern: '**/target/jacoco.exec'
            archiveArtifacts artifacts: 'target/*.jar',
                             allowEmptyArchive: true
        }

        success {
            // Only on success
            slackSend channel: '#builds',
                      color: 'good',
                      message: "SUCCESS: \${env.JOB_NAME} #\${env.BUILD_NUMBER}"
        }

        failure {
            // Only on failure
            emailext subject: "FAILED: \${env.JOB_NAME}",
                     body: '''
                         Build failed!
                         Check console: \${BUILD_URL}console
                     ''',
                     recipientProviders: [
                         developers(),
                         culprits()
                     ]
        }

        unstable {
            // When tests fail but build succeeds
            echo 'Tests failed - marking unstable'
        }

        changed {
            // Status changed from previous build
            echo "Build status changed to: \${currentBuild.result}"
        }

        cleanup {
            // Runs after all other post conditions
            cleanWs()
            sh 'docker system prune -f'
        }
    }
}`
        }
      ]
    },
    {
      id: 'agents-executors',
      name: 'Agents & Executors',
      icon: '🖥️',
      color: '#10b981',
      description: 'Controller distributes work to agents via JNLP/SSH. Label expressions for agent selection (linux&&docker). Cloud agents auto-scale with Docker/Kubernetes plugins for dynamic provisioning.',
      diagram: JenkinsAgentDiagram,
      details: [
        {
          name: 'Controller (Master)',
          explanation: 'The Jenkins Controller manages the CI/CD environment: scheduling builds, dispatching to agents, monitoring executors, and serving the web UI. Should not run builds directly in production. Handles configuration, plugin management, and job definitions. Use controller-only mode for security and stability.',
          codeExample: `// Jenkins Controller Configuration (JCasC YAML)
jenkins:
  systemMessage: "Jenkins CI/CD Platform"
  numExecutors: 0  # Controller should NOT run builds
  mode: EXCLUSIVE  # Only run jobs explicitly assigned

  # Security settings
  securityRealm:
    ldap:
      configurations:
        - server: "ldap.company.com"
          rootDN: "dc=company,dc=com"

  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions:
              - "Overall/Administer"
          - name: "developer"
            permissions:
              - "Job/Build"
              - "Job/Read"

  # Agent configuration
  clouds:
    - kubernetes:
        name: "k8s-cloud"
        serverUrl: "https://kubernetes.default"
        namespace: "jenkins"
        jenkinsUrl: "http://jenkins:8080"

# Disable CLI over remoting (security)
jenkins:
  remotingSecurity:
    enabled: true`
        },
        {
          name: 'Agent Types',
          explanation: 'Permanent agents are always connected (physical/VM servers). Cloud agents spin up on demand (AWS, Azure, GCP). Docker agents run in containers. Kubernetes agents use pod templates. Each type balances cost, availability, and isolation. Choose based on workload patterns and infrastructure.',
          codeExample: `// Different Agent Types in Jenkinsfile
pipeline {
    // 1. Any available agent
    agent any

    // 2. Specific labeled agent
    // agent { label 'linux && docker' }

    // 3. Docker container agent
    // agent {
    //     docker {
    //         image 'maven:3.8-jdk11'
    //         args '-v /root/.m2:/root/.m2'
    //     }
    // }

    // 4. Kubernetes pod agent
    // agent {
    //     kubernetes {
    //         yaml '''
    //             apiVersion: v1
    //             kind: Pod
    //             spec:
    //               containers:
    //               - name: maven
    //                 image: maven:3.8-jdk11
    //                 command: ['sleep', 'infinity']
    //         '''
    //     }
    // }

    // 5. No agent (for orchestration-only stages)
    // agent none

    stages {
        stage('Build') {
            // Stage-specific agent override
            agent {
                docker {
                    image 'node:18'
                    reuseNode true  // Use same workspace
                }
            }
            steps {
                sh 'npm install && npm run build'
            }
        }

        stage('Deploy') {
            agent { label 'deploy-server' }
            steps {
                sh './deploy.sh'
            }
        }
    }
}`
        },
        {
          name: 'Connection Methods',
          explanation: 'SSH agents connect via SSH from controller. JNLP (Java Web Start) agents initiate connection from agent to controller (useful for firewalled networks). WebSocket provides modern, firewall-friendly connections. inbound-agent Docker image simplifies containerized agents.',
          codeExample: `// SSH Agent Setup (Groovy init script)
import jenkins.model.*
import hudson.plugins.sshslaves.*
import hudson.slaves.*

def jenkins = Jenkins.instance

// SSH Agent configuration
def sshCredentialsId = 'ssh-agent-key'
def launcher = new SSHLauncher(
    '192.168.1.100',           // host
    22,                         // port
    sshCredentialsId,          // credentials ID
    null,                       // JVM options
    null,                       // Java path
    null,                       // prefix start command
    null,                       // suffix start command
    30,                         // connection timeout
    3,                          // max retries
    15                          // retry wait time
)

def agent = new DumbSlave(
    'linux-agent-1',           // name
    '/home/jenkins/agent',     // remote FS
    launcher
)
agent.setLabelString('linux docker')
agent.setNumExecutors(4)
agent.setRetentionStrategy(new RetentionStrategy.Always())

jenkins.addNode(agent)

// ----------------------------------------
// JNLP Agent - Run on agent machine:
// java -jar agent.jar \\
//   -jnlpUrl http://jenkins:8080/computer/agent1/slave-agent.jnlp \\
//   -secret <secret> \\
//   -workDir "/home/jenkins/agent"

// Docker JNLP Agent:
// docker run -d jenkins/inbound-agent \\
//   -url http://jenkins:8080 \\
//   -secret <secret> \\
//   -name agent1 \\
//   -workDir /home/jenkins/agent`
        },
        {
          name: 'Labels and Node Selection',
          explanation: 'Labels categorize agents by capability: linux, windows, docker, gpu, large-memory. Pipeline agent directive selects nodes: agent { label \'docker\' }. Combine labels: agent { label \'linux && docker\' }. Use labels to match jobs with appropriate resources.',
          codeExample: `// Label-based Agent Selection
pipeline {
    agent none  // Don't allocate global agent

    stages {
        stage('Build on Linux') {
            agent { label 'linux' }
            steps {
                sh 'make build'
            }
        }

        stage('Build on Windows') {
            agent { label 'windows' }
            steps {
                bat 'msbuild solution.sln'
            }
        }

        stage('Docker Build') {
            // Combine labels with boolean operators
            agent { label 'linux && docker && large-memory' }
            steps {
                sh 'docker build -t myapp .'
            }
        }

        stage('GPU Tests') {
            // Agent with GPU capability
            agent { label 'gpu && cuda11' }
            steps {
                sh 'python run_ml_tests.py'
            }
        }

        stage('Multi-Platform') {
            parallel {
                stage('Linux x64') {
                    agent { label 'linux && amd64' }
                    steps { sh './build.sh' }
                }
                stage('Linux ARM') {
                    agent { label 'linux && arm64' }
                    steps { sh './build.sh' }
                }
                stage('macOS') {
                    agent { label 'macos && xcode14' }
                    steps { sh 'xcodebuild' }
                }
            }
        }
    }
}

// Label expressions:
// label 'linux'           - Simple match
// label 'linux && docker' - Both required
// label 'linux || macos'  - Either one
// label '!windows'        - Not windows
// label 'deploy-*'        - Wildcard match`
        },
        {
          name: 'Executors and Concurrency',
          explanation: 'Executors are slots for running builds on an agent. Configure based on CPU/memory capacity. More executors = more concurrent builds but resource contention. Use throttle-concurrents plugin to limit specific job concurrency. Monitor executor utilization for capacity planning.',
          codeExample: `// Executor and Concurrency Management
pipeline {
    agent any

    options {
        // Prevent concurrent executions of this pipeline
        disableConcurrentBuilds()

        // Or allow with abort of older builds
        // disableConcurrentBuilds(abortPrevious: true)

        // Throttle plugin - limit concurrent builds
        // throttleJobProperty(
        //     categories: ['deploy-jobs'],
        //     maxConcurrentTotal: 2,
        //     maxConcurrentPerNode: 1
        // )
    }

    stages {
        stage('Resource-Intensive') {
            options {
                // Lock a resource during this stage
                lock(resource: 'database-test-instance')
            }
            steps {
                sh 'run-heavy-tests.sh'
            }
        }

        stage('Limited Parallel') {
            steps {
                script {
                    def tests = ['a', 'b', 'c', 'd', 'e', 'f']
                    def parallelStages = [:]

                    tests.each { test ->
                        parallelStages[test] = {
                            // Each runs on available executor
                            node('test-agent') {
                                sh "run-test-\${test}.sh"
                            }
                        }
                    }

                    // Run with limited parallelism
                    parallel parallelStages
                }
            }
        }

        stage('Milestone') {
            steps {
                // Cancel older builds at this point
                milestone(1)
                sh 'deploy.sh'
            }
        }
    }
}

// Agent executor configuration (JCasC):
// nodes:
//   - permanent:
//       name: "build-agent"
//       numExecutors: 4  # Based on CPU cores
//       labelString: "linux docker"`
        },
        {
          name: 'Agent Provisioning',
          explanation: 'Static provisioning maintains fixed agent pool. Dynamic provisioning creates agents on demand, destroying after use. Kubernetes plugin provisions pods per build. Cloud plugins (EC2, Azure) spin up VMs. Dynamic provisioning reduces costs and ensures clean environments.',
          codeExample: `// Dynamic Agent Provisioning Examples

// 1. Kubernetes Pod Provisioning (JCasC)
jenkins:
  clouds:
    - kubernetes:
        name: "k8s"
        serverUrl: "https://kubernetes.default.svc"
        namespace: "jenkins-agents"
        jenkinsUrl: "http://jenkins.jenkins.svc:8080"
        podLabels:
          - key: "jenkins"
            value: "agent"
        templates:
          - name: "maven"
            label: "maven"
            containers:
              - name: "maven"
                image: "maven:3.8-jdk11"
                workingDir: "/home/jenkins/agent"
                resourceRequestCpu: "1"
                resourceRequestMemory: "2Gi"

// 2. AWS EC2 Provisioning (JCasC)
jenkins:
  clouds:
    - amazonEC2:
        name: "aws-ec2"
        region: "us-east-1"
        templates:
          - ami: "ami-0123456789abcdef0"
            type: "t3.large"
            labelString: "ec2-linux"
            remoteFS: "/home/ec2-user/jenkins"
            idleTerminationMinutes: "30"
            spotConfig:
              spotMaxBidPrice: "0.05"

// 3. Docker Cloud (JCasC)
jenkins:
  clouds:
    - docker:
        name: "docker-local"
        dockerApi:
          dockerHost:
            uri: "unix:///var/run/docker.sock"
        templates:
          - labelString: "docker-agent"
            dockerTemplateBase:
              image: "jenkins/inbound-agent"
            remoteFs: "/home/jenkins/agent"
            instanceCapStr: "10"

// Pipeline using dynamic agent:
pipeline {
    agent {
        kubernetes {
            label 'maven-pod'
            idleMinutes 5  // Keep pod for 5 min after build
            yamlFile 'jenkins/pod-template.yaml'
        }
    }
    stages {
        stage('Build') {
            steps {
                container('maven') {
                    sh 'mvn package'
                }
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'docker-kubernetes',
      name: 'Docker & Kubernetes',
      icon: '🚢',
      color: '#8b5cf6',
      description: 'agent{ docker{ image } } for isolated builds, docker.withRegistry() for ECR/GCR pushes. Kubernetes plugin provisions ephemeral pods with JNLP/Maven/Docker sidecar containers for scalable CI/CD.',
      diagram: DockerIntegrationDiagram,
      details: [
        {
          name: 'Docker Agent',
          explanation: 'Run pipeline steps inside Docker containers for isolated, reproducible builds. Specify image: agent { docker { image \'maven:3.8-jdk11\' } }. Mount volumes for caching: args \'-v /root/.m2:/root/.m2\'. Containers are destroyed after pipeline completes, ensuring clean environments.',
          codeExample: `// Docker Agent Examples
pipeline {
    // Global Docker agent
    agent {
        docker {
            image 'maven:3.8-jdk11'
            // Mount cache for faster builds
            args '-v \$HOME/.m2:/root/.m2'
            // Use custom registry
            registryUrl 'https://registry.company.com'
            registryCredentialsId 'docker-registry-creds'
        }
    }

    stages {
        stage('Build with Maven') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Node.js Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    // Reuse workspace from parent agent
                    reuseNode true
                    // Additional arguments
                    args '''
                        -v \$HOME/.npm:/root/.npm
                        -e NODE_ENV=production
                    '''
                }
            }
            steps {
                sh 'npm ci && npm run build'
            }
        }

        stage('Python Tests') {
            agent {
                docker {
                    image 'python:3.11'
                    args '-v \$HOME/.cache/pip:/root/.cache/pip'
                }
            }
            steps {
                sh '''
                    pip install -r requirements.txt
                    pytest tests/
                '''
            }
        }

        stage('Custom Dockerfile') {
            agent {
                dockerfile {
                    filename 'Dockerfile.build'
                    dir 'docker'
                    additionalBuildArgs '--build-arg VERSION=1.0'
                }
            }
            steps {
                sh './custom-build.sh'
            }
        }
    }
}`
        },
        {
          name: 'Docker Pipeline Plugin',
          explanation: 'Build Docker images: docker.build(\'myapp:${BUILD_NUMBER}\'). Push to registries: docker.withRegistry(\'url\', \'credentials-id\'). Run containers for testing: docker.image(\'postgres\').withRun(). Supports multi-stage builds and BuildKit. Essential for containerized deployment workflows.',
          codeExample: `// Docker Pipeline Plugin - Build and Push
pipeline {
    agent any

    environment {
        REGISTRY = 'registry.company.com'
        IMAGE_NAME = 'myapp'
        IMAGE_TAG = "\${BUILD_NUMBER}"
    }

    stages {
        stage('Build Image') {
            steps {
                script {
                    // Build Docker image
                    def customImage = docker.build(
                        "\${REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}",
                        "--build-arg VERSION=\${IMAGE_TAG} ."
                    )

                    // Push to registry
                    docker.withRegistry(
                        "https://\${REGISTRY}",
                        'docker-registry-creds'
                    ) {
                        customImage.push()
                        customImage.push('latest')
                    }
                }
            }
        }

        stage('Test with Services') {
            steps {
                script {
                    // Run PostgreSQL for testing
                    docker.image('postgres:14').withRun(
                        '-e POSTGRES_PASSWORD=test -e POSTGRES_DB=testdb'
                    ) { db ->
                        // Get container info
                        def dbHost = sh(
                            script: "docker inspect -f '{{.NetworkSettings.IPAddress}}' \${db.id}",
                            returnStdout: true
                        ).trim()

                        // Run tests against database
                        docker.image("\${REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}").inside(
                            "-e DB_HOST=\${dbHost} -e DB_NAME=testdb"
                        ) {
                            sh 'npm run test:integration'
                        }
                    }
                }
            }
        }

        stage('Multi-Registry Push') {
            steps {
                script {
                    def image = docker.image("\${REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}")

                    // Push to AWS ECR
                    docker.withRegistry(
                        'https://123456789.dkr.ecr.us-east-1.amazonaws.com',
                        'ecr:us-east-1:aws-credentials'
                    ) {
                        image.push()
                    }

                    // Push to GCR
                    docker.withRegistry(
                        'https://gcr.io',
                        'gcr:my-gcp-project'
                    ) {
                        image.push()
                    }
                }
            }
        }
    }
}`
        },
        {
          name: 'Kubernetes Plugin',
          explanation: 'Provision Jenkins agents as Kubernetes pods. Define pod templates in pipeline or Jenkins configuration. Pods are created on demand and terminated after use. Enables massive scalability and resource efficiency. Integrates with cluster autoscaling for cost optimization.',
          diagram: KubernetesPodDiagram,
          codeExample: `// Kubernetes Plugin - Pod Agent
pipeline {
    agent {
        kubernetes {
            // Use YAML for pod definition
            yaml '''
                apiVersion: v1
                kind: Pod
                metadata:
                  labels:
                    jenkins: agent
                spec:
                  containers:
                  - name: jnlp
                    image: jenkins/inbound-agent:latest
                    resources:
                      requests:
                        memory: "256Mi"
                        cpu: "100m"
                  - name: maven
                    image: maven:3.8-jdk11
                    command: ['sleep', 'infinity']
                    volumeMounts:
                    - name: maven-cache
                      mountPath: /root/.m2
                  - name: docker
                    image: docker:24-dind
                    securityContext:
                      privileged: true
                    volumeMounts:
                    - name: docker-socket
                      mountPath: /var/run/docker.sock
                  volumes:
                  - name: maven-cache
                    persistentVolumeClaim:
                      claimName: maven-cache-pvc
                  - name: docker-socket
                    hostPath:
                      path: /var/run/docker.sock
            '''
            // Keep pod alive between stages
            idleMinutes 10
        }
    }

    stages {
        stage('Build') {
            steps {
                container('maven') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Docker Build') {
            steps {
                container('docker') {
                    sh '''
                        docker build -t myapp:\${BUILD_NUMBER} .
                        docker push myapp:\${BUILD_NUMBER}
                    '''
                }
            }
        }
    }
}`
        },
        {
          name: 'Pod Templates',
          explanation: 'Define multi-container pods with YAML: JNLP container for communication, plus build containers (maven, docker, kubectl). Use container() step to switch contexts. Mount volumes for caching and Docker socket. Configure resource requests/limits for predictable scheduling.',
          codeExample: `// Pod Template Examples
// jenkins/pod-templates/java-builder.yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: jenkins-agent
spec:
  serviceAccountName: jenkins-agent
  containers:
    # JNLP container (required for communication)
    - name: jnlp
      image: jenkins/inbound-agent:4.13-2-jdk11
      resources:
        requests:
          memory: "256Mi"
          cpu: "200m"
        limits:
          memory: "512Mi"
          cpu: "500m"

    # Maven build container
    - name: maven
      image: maven:3.8-jdk17
      command: ['cat']
      tty: true
      resources:
        requests:
          memory: "1Gi"
          cpu: "500m"
        limits:
          memory: "2Gi"
          cpu: "1000m"
      volumeMounts:
        - name: maven-cache
          mountPath: /root/.m2/repository

    # Kubectl for deployments
    - name: kubectl
      image: bitnami/kubectl:1.27
      command: ['cat']
      tty: true

    # Helm for chart deployments
    - name: helm
      image: alpine/helm:3.12
      command: ['cat']
      tty: true

  volumes:
    - name: maven-cache
      persistentVolumeClaim:
        claimName: maven-repo-cache

---
// Jenkinsfile using pod template
pipeline {
    agent {
        kubernetes {
            yamlFile 'jenkins/pod-templates/java-builder.yaml'
        }
    }

    stages {
        stage('Build') {
            steps {
                container('maven') {
                    sh 'mvn package -B'
                }
            }
        }

        stage('Deploy') {
            steps {
                container('kubectl') {
                    sh 'kubectl apply -f k8s/'
                }
                container('helm') {
                    sh 'helm upgrade --install myapp ./chart'
                }
            }
        }
    }
}`
        },
        {
          name: 'Docker-in-Docker',
          explanation: 'Build Docker images inside containers. Mount host Docker socket: -v /var/run/docker.sock:/var/run/docker.sock. Alternative: use Docker-in-Docker (dind) image with privileged mode. Consider security implications. Kaniko provides rootless image building in Kubernetes.',
          codeExample: `// Docker-in-Docker Options

// Option 1: Mount Docker socket (simpler, shared daemon)
pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  - name: docker
                    image: docker:24-cli
                    command: ['cat']
                    tty: true
                    volumeMounts:
                    - name: docker-socket
                      mountPath: /var/run/docker.sock
                  volumes:
                  - name: docker-socket
                    hostPath:
                      path: /var/run/docker.sock
            '''
        }
    }
    stages {
        stage('Build') {
            steps {
                container('docker') {
                    sh 'docker build -t myapp .'
                }
            }
        }
    }
}

// Option 2: Docker-in-Docker (isolated, privileged)
pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  - name: dind
                    image: docker:24-dind
                    securityContext:
                      privileged: true
                    env:
                    - name: DOCKER_TLS_CERTDIR
                      value: ""
                  - name: docker-cli
                    image: docker:24-cli
                    command: ['cat']
                    tty: true
                    env:
                    - name: DOCKER_HOST
                      value: tcp://localhost:2375
            '''
        }
    }
    stages {
        stage('Build') {
            steps {
                container('docker-cli') {
                    sh 'docker build -t myapp .'
                }
            }
        }
    }
}

// Option 3: Kaniko (rootless, secure)
pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  - name: kaniko
                    image: gcr.io/kaniko-project/executor:debug
                    command: ['cat']
                    tty: true
                    volumeMounts:
                    - name: docker-config
                      mountPath: /kaniko/.docker
                  volumes:
                  - name: docker-config
                    secret:
                      secretName: docker-registry-config
            '''
        }
    }
    stages {
        stage('Build with Kaniko') {
            steps {
                container('kaniko') {
                    sh '''
                        /kaniko/executor \\
                            --dockerfile=Dockerfile \\
                            --context=dir://. \\
                            --destination=registry.io/myapp:\${BUILD_NUMBER}
                    '''
                }
            }
        }
    }
}`
        },
        {
          name: 'Kubernetes Deployments',
          explanation: 'Deploy to Kubernetes from Jenkins: kubectl set image, kubectl apply, helm upgrade. Use kubeconfig credentials for cluster access. Implement canary and blue-green deployments. Monitor rollout status: kubectl rollout status. Integrate with GitOps tools like ArgoCD.',
          codeExample: `// Kubernetes Deployment Strategies
pipeline {
    agent {
        kubernetes {
            yamlFile 'jenkins/pod-template.yaml'
        }
    }

    environment {
        KUBECONFIG = credentials('kubeconfig-prod')
        IMAGE_TAG = "\${BUILD_NUMBER}"
    }

    stages {
        stage('Deploy to Staging') {
            steps {
                container('kubectl') {
                    sh '''
                        # Update image in deployment
                        kubectl set image deployment/myapp \\
                            myapp=registry.io/myapp:\${IMAGE_TAG} \\
                            -n staging

                        # Wait for rollout
                        kubectl rollout status deployment/myapp \\
                            -n staging --timeout=300s
                    '''
                }
            }
        }

        stage('Canary Deploy') {
            steps {
                container('kubectl') {
                    sh '''
                        # Deploy canary (10% traffic)
                        kubectl apply -f - <<EOF
                        apiVersion: apps/v1
                        kind: Deployment
                        metadata:
                          name: myapp-canary
                          namespace: production
                        spec:
                          replicas: 1  # Main has 9 replicas
                          selector:
                            matchLabels:
                              app: myapp
                              track: canary
                          template:
                            spec:
                              containers:
                              - name: myapp
                                image: registry.io/myapp:\${IMAGE_TAG}
                        EOF
                    '''
                }

                // Run canary tests
                sh './run-canary-tests.sh'
            }
        }

        stage('Full Rollout') {
            input {
                message "Promote canary to production?"
                ok "Deploy"
            }
            steps {
                container('helm') {
                    sh '''
                        helm upgrade myapp ./charts/myapp \\
                            --namespace production \\
                            --set image.tag=\${IMAGE_TAG} \\
                            --set replicas=10 \\
                            --wait --timeout 5m
                    '''
                }

                // Delete canary
                container('kubectl') {
                    sh 'kubectl delete deployment myapp-canary -n production'
                }
            }
        }

        stage('GitOps - ArgoCD') {
            steps {
                // Update GitOps repo instead of direct deploy
                sh '''
                    git clone git@github.com:company/k8s-manifests.git
                    cd k8s-manifests
                    yq -i '.spec.template.spec.containers[0].image = "registry.io/myapp:'\${IMAGE_TAG}'"' \\
                        apps/myapp/deployment.yaml
                    git commit -am "Update myapp to \${IMAGE_TAG}"
                    git push
                '''
                // ArgoCD will sync automatically
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'shared-libraries',
      name: 'Shared Libraries',
      icon: '📚',
      color: '#f59e0b',
      description: 'vars/ for global functions, src/ for Groovy classes, resources/ for templates. @Library annotation loads libraries at specific versions. Enables DRY pipelines with standardized steps across teams.',
      diagram: SharedLibraryDiagram,
      details: [
        {
          name: 'Library Structure',
          explanation: 'Shared libraries have three directories: vars/ for global variables (custom steps), src/ for Groovy classes, resources/ for non-Groovy files. Store in Git repository. vars/myStep.groovy creates a callable step myStep(). Follow the standard directory layout for Jenkins to recognize components.',
          codeExample: `// Shared Library Directory Structure
jenkins-shared-library/
├── vars/                          # Global variables (pipeline steps)
│   ├── buildMaven.groovy          # Creates 'buildMaven' step
│   ├── buildDocker.groovy         # Creates 'buildDocker' step
│   ├── deployToK8s.groovy         # Creates 'deployToK8s' step
│   └── notifySlack.groovy         # Creates 'notifySlack' step
│
├── src/                           # Groovy source files (classes)
│   └── com/
│       └── company/
│           ├── Docker.groovy      # Docker utilities class
│           ├── Kubernetes.groovy  # K8s deployment class
│           └── Utils.groovy       # General utilities
│
├── resources/                     # Non-Groovy files
│   ├── scripts/
│   │   ├── deploy.sh
│   │   └── healthcheck.sh
│   ├── templates/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   └── config/
│       └── sonar-project.properties
│
└── test/                          # Unit tests
    └── groovy/
        └── BuildMavenTest.groovy

// Usage in Jenkinsfile:
@Library('jenkins-shared-library@main') _

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                buildMaven()      // Calls vars/buildMaven.groovy
                buildDocker()     // Calls vars/buildDocker.groovy
            }
        }
    }
}`
        },
        {
          name: 'Global Variables (vars/)',
          explanation: 'Files in vars/ become global pipeline steps. def call() method is the entry point. Accept parameters: def call(Map config). Return values or execute pipeline DSL. Example: vars/buildMaven.groovy with call(goals: \'package\', runTests: true). Provides organization-wide custom steps.',
          codeExample: `// vars/buildMaven.groovy
def call(Map config = [:]) {
    // Default values
    def goals = config.goals ?: 'clean package'
    def skipTests = config.skipTests ?: false
    def mavenImage = config.mavenImage ?: 'maven:3.8-jdk11'

    // Execute in Docker container
    docker.image(mavenImage).inside('-v \$HOME/.m2:/root/.m2') {
        sh """
            mvn \${goals} \\
                -Dmaven.test.skip=\${skipTests} \\
                -B -V
        """
    }
}

// vars/buildDocker.groovy
def call(Map config) {
    def imageName = config.imageName
    def tag = config.tag ?: env.BUILD_NUMBER
    def dockerfile = config.dockerfile ?: 'Dockerfile'

    def image = docker.build(
        "\${imageName}:\${tag}",
        "-f \${dockerfile} ."
    )

    if (config.push) {
        docker.withRegistry(config.registry, config.credentials) {
            image.push()
            image.push('latest')
        }
    }

    return image
}

// vars/notifySlack.groovy
def call(String status, String channel = '#builds') {
    def color = status == 'SUCCESS' ? 'good' : 'danger'
    def message = "\${env.JOB_NAME} #\${env.BUILD_NUMBER}: \${status}"

    slackSend(
        channel: channel,
        color: color,
        message: message,
        attachments: [[
            title: 'Build Details',
            title_link: env.BUILD_URL,
            text: "Branch: \${env.BRANCH_NAME}"
        ]]
    )
}

// Usage in Jenkinsfile:
@Library('my-shared-lib') _

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                buildMaven(goals: 'clean verify', skipTests: false)
                buildDocker(
                    imageName: 'myapp',
                    push: true,
                    registry: 'https://ecr.aws',
                    credentials: 'ecr-creds'
                )
            }
        }
    }
    post {
        always {
            notifySlack(currentBuild.result)
        }
    }
}`
        },
        {
          name: 'Groovy Classes (src/)',
          explanation: 'src/com/company/Utils.groovy contains reusable classes. Must implement Serializable for pipeline use. Instantiate in pipelines: new com.company.Utils(this). Useful for complex logic, API clients, and helper functions. Keep business logic separate from pipeline DSL.',
          codeExample: `// src/com/company/Docker.groovy
package com.company

class Docker implements Serializable {
    def steps

    Docker(steps) {
        this.steps = steps
    }

    def build(String imageName, String tag, Map args = [:]) {
        def dockerfile = args.dockerfile ?: 'Dockerfile'
        def context = args.context ?: '.'
        def buildArgs = args.buildArgs?.collect { "--build-arg \${it}" }?.join(' ') ?: ''

        steps.sh """
            docker build \\
                -t \${imageName}:\${tag} \\
                -f \${dockerfile} \\
                \${buildArgs} \\
                \${context}
        """

        return "\${imageName}:\${tag}"
    }

    def push(String image, String registry, String credentialsId) {
        steps.docker.withRegistry("https://\${registry}", credentialsId) {
            steps.sh "docker push \${image}"
        }
    }

    def scanImage(String image) {
        def result = steps.sh(
            script: "trivy image --exit-code 0 --severity HIGH,CRITICAL \${image}",
            returnStatus: true
        )
        return result == 0
    }
}

// src/com/company/Kubernetes.groovy
package com.company

class Kubernetes implements Serializable {
    def steps
    String namespace

    Kubernetes(steps, String namespace = 'default') {
        this.steps = steps
        this.namespace = namespace
    }

    def deploy(String deployment, String image) {
        steps.sh """
            kubectl set image deployment/\${deployment} \\
                \${deployment}=\${image} \\
                -n \${namespace}
            kubectl rollout status deployment/\${deployment} \\
                -n \${namespace} --timeout=300s
        """
    }

    def rollback(String deployment) {
        steps.sh "kubectl rollout undo deployment/\${deployment} -n \${namespace}"
    }
}

// Usage in Jenkinsfile:
@Library('my-shared-lib') _
import com.company.Docker
import com.company.Kubernetes

pipeline {
    agent any
    stages {
        stage('Build & Deploy') {
            steps {
                script {
                    def docker = new Docker(this)
                    def k8s = new Kubernetes(this, 'production')

                    def image = docker.build('myapp', env.BUILD_NUMBER)
                    docker.push(image, 'ecr.aws', 'ecr-creds')

                    if (docker.scanImage(image)) {
                        k8s.deploy('myapp', image)
                    } else {
                        error 'Security scan failed'
                    }
                }
            }
        }
    }
}`
        },
        {
          name: 'Resources',
          explanation: 'resources/ contains non-Groovy files: shell scripts, config templates, JSON schemas. Access via libraryResource: def script = libraryResource(\'scripts/deploy.sh\'). Write to workspace and execute. Useful for sharing scripts and configurations across pipelines.',
          codeExample: `// resources/scripts/deploy.sh
#!/bin/bash
set -e

ENVIRONMENT=\$1
IMAGE_TAG=\$2

echo "Deploying to \${ENVIRONMENT} with tag \${IMAGE_TAG}"

kubectl apply -f k8s/\${ENVIRONMENT}/
kubectl set image deployment/app app=myapp:\${IMAGE_TAG}
kubectl rollout status deployment/app --timeout=300s

// resources/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{APP_NAME}}
  namespace: {{NAMESPACE}}
spec:
  replicas: {{REPLICAS}}
  selector:
    matchLabels:
      app: {{APP_NAME}}
  template:
    spec:
      containers:
      - name: {{APP_NAME}}
        image: {{IMAGE}}:{{TAG}}
        ports:
        - containerPort: {{PORT}}

// vars/deployWithTemplate.groovy
def call(Map config) {
    // Load template from resources
    def template = libraryResource('templates/deployment.yaml')

    // Replace placeholders
    def manifest = template
        .replace('{{APP_NAME}}', config.appName)
        .replace('{{NAMESPACE}}', config.namespace)
        .replace('{{REPLICAS}}', config.replicas.toString())
        .replace('{{IMAGE}}', config.image)
        .replace('{{TAG}}', config.tag)
        .replace('{{PORT}}', config.port.toString())

    // Write to workspace and apply
    writeFile file: 'deployment.yaml', text: manifest
    sh 'kubectl apply -f deployment.yaml'

    // Load and execute deploy script
    def deployScript = libraryResource('scripts/deploy.sh')
    writeFile file: 'deploy.sh', text: deployScript
    sh "chmod +x deploy.sh && ./deploy.sh \${config.namespace} \${config.tag}"
}

// Jenkinsfile usage:
@Library('my-shared-lib') _

pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                deployWithTemplate(
                    appName: 'myapp',
                    namespace: 'production',
                    replicas: 3,
                    image: 'registry.io/myapp',
                    tag: env.BUILD_NUMBER,
                    port: 8080
                )
            }
        }
    }
}`
        },
        {
          name: 'Library Configuration',
          explanation: 'Configure globally in Manage Jenkins > Configure System > Global Pipeline Libraries. Or load dynamically: @Library(\'my-lib@branch\') _. Specify version: @Library(\'my-lib@v1.0.0\'). Use implicit loading or explicit import. Control which libraries are trusted for sandbox bypass.',
          codeExample: `// JCasC Configuration for Shared Libraries
unclassified:
  globalLibraries:
    libraries:
      - name: "my-shared-library"
        defaultVersion: "main"
        implicit: false  # Must be explicitly loaded
        allowVersionOverride: true
        retriever:
          modernSCM:
            scm:
              git:
                remote: "git@github.com:company/jenkins-shared-lib.git"
                credentialsId: "github-ssh-key"
                traits:
                  - branchDiscoveryTrait

      - name: "trusted-library"
        defaultVersion: "v1.0.0"
        implicit: true  # Auto-loaded in all pipelines
        allowVersionOverride: false
        retriever:
          modernSCM:
            scm:
              git:
                remote: "git@github.com:company/trusted-lib.git"
                credentialsId: "github-ssh-key"

// Jenkinsfile - Loading Libraries

// Load with default version
@Library('my-shared-library') _

// Load specific version/branch
@Library('my-shared-library@v2.0.0') _
@Library('my-shared-library@feature-branch') _

// Load multiple libraries
@Library(['my-shared-library@main', 'another-lib@v1.0']) _

// Dynamic loading (within pipeline)
pipeline {
    agent any
    stages {
        stage('Dynamic Load') {
            steps {
                script {
                    // Load library at runtime
                    library 'my-shared-library@main'

                    // Now use library functions
                    buildMaven()
                }
            }
        }
    }
}

// Import specific classes
@Library('my-shared-library') _
import com.company.Docker
import com.company.Kubernetes

// Or import all
@Library('my-shared-library') import com.company.*`
        },
        {
          name: 'Testing Libraries',
          explanation: 'Unit test shared library code with Jenkins Pipeline Unit framework. Mock pipeline steps and verify behavior. Use Gradle or Maven for test execution. Implement CI for the library itself. Test in sandbox before deploying to production Jenkins.',
          codeExample: `// build.gradle for testing shared library
plugins {
    id 'groovy'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.codehaus.groovy:groovy-all:3.0.9'
    testImplementation 'com.lesfurets:jenkins-pipeline-unit:1.13'
    testImplementation 'junit:junit:4.13.2'
}

sourceSets {
    main {
        groovy {
            srcDirs = ['src', 'vars']
        }
    }
    test {
        groovy {
            srcDirs = ['test/groovy']
        }
    }
}

// test/groovy/BuildMavenTest.groovy
import com.lesfurets.jenkins.unit.BasePipelineTest
import org.junit.Before
import org.junit.Test
import static org.junit.Assert.*

class BuildMavenTest extends BasePipelineTest {

    @Override
    @Before
    void setUp() throws Exception {
        super.setUp()
        // Register vars scripts
        helper.registerAllowedMethod('sh', [String], { cmd ->
            println "Executing: \${cmd}"
        })
        helper.registerAllowedMethod('docker', [Map, Closure], { config, body ->
            body()
        })
    }

    @Test
    void testBuildMavenDefault() {
        def script = loadScript('vars/buildMaven.groovy')

        script.call()

        // Verify sh was called with expected command
        def shCalls = helper.callStack.findAll { it.methodName == 'sh' }
        assertTrue(shCalls.any { it.args[0].contains('mvn clean package') })
    }

    @Test
    void testBuildMavenCustomGoals() {
        def script = loadScript('vars/buildMaven.groovy')

        script.call(goals: 'verify', skipTests: true)

        def shCalls = helper.callStack.findAll { it.methodName == 'sh' }
        assertTrue(shCalls.any { it.args[0].contains('mvn verify') })
        assertTrue(shCalls.any { it.args[0].contains('-Dmaven.test.skip=true') })
    }
}

// CI Pipeline for the shared library itself
// Jenkinsfile in the shared library repo
pipeline {
    agent { docker { image 'gradle:7-jdk11' } }

    stages {
        stage('Test') {
            steps {
                sh 'gradle test'
            }
            post {
                always {
                    junit 'build/test-results/test/*.xml'
                }
            }
        }

        stage('Tag Release') {
            when { branch 'main' }
            steps {
                sh '''
                    VERSION=\$(cat VERSION)
                    git tag -a "v\${VERSION}" -m "Release \${VERSION}"
                    git push origin "v\${VERSION}"
                '''
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'plugins-integrations',
      name: 'Plugins & Integrations',
      icon: '🔌',
      color: '#ec4899',
      description: 'Git/GitHub webhook integration for PR pipelines, SonarQube with Quality Gates, Slack/Teams notifications. Docker, Kubernetes, AWS, Azure, GCP plugins enable cloud-native CI/CD.',
      diagram: PluginArchitectureDiagram,
      details: [
        {
          name: 'Git Integration',
          explanation: 'Git plugin provides checkout step and SCM configuration. GitHub plugin adds webhook support, status checks, and PR building. GitLab plugin offers similar GitLab integration. Branch Source plugins enable multibranch pipelines with automatic branch discovery. Configure credentials for private repositories.',
          codeExample: `// Git Integration Examples
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Simple checkout from SCM configured in job
                checkout scm

                // Explicit Git checkout
                checkout([
                    \$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    extensions: [
                        [\$class: 'CloneOption', depth: 1, shallow: true],
                        [\$class: 'CleanBeforeCheckout']
                    ],
                    userRemoteConfigs: [[
                        url: 'https://github.com/company/repo.git',
                        credentialsId: 'github-token'
                    ]]
                ])
            }
        }

        stage('Git Info') {
            steps {
                script {
                    // Get commit info
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    env.GIT_AUTHOR = sh(
                        script: 'git log -1 --format=%an',
                        returnStdout: true
                    ).trim()

                    env.GIT_MESSAGE = sh(
                        script: 'git log -1 --format=%s',
                        returnStdout: true
                    ).trim()
                }
            }
        }

        stage('GitHub Status') {
            steps {
                // Update GitHub commit status
                githubNotify(
                    status: 'PENDING',
                    description: 'Build in progress',
                    context: 'ci/jenkins'
                )
            }
        }
    }

    post {
        success {
            githubNotify(
                status: 'SUCCESS',
                description: 'Build passed',
                context: 'ci/jenkins'
            )
        }
        failure {
            githubNotify(
                status: 'FAILURE',
                description: 'Build failed',
                context: 'ci/jenkins'
            )
        }
    }
}

// Multibranch Pipeline - Automatic PR Builds
// Configure GitHub Branch Source in job config
// Jenkinsfile will be discovered in each branch/PR`
        },
        {
          name: 'Code Quality',
          explanation: 'SonarQube Scanner plugin integrates static analysis. Configure SonarQube server in Jenkins, use withSonarQubeEnv() step. Wait for Quality Gate: waitForQualityGate(). JaCoCo plugin publishes code coverage. Warnings Next Generation aggregates compiler warnings and static analysis results.',
          codeExample: `// SonarQube Integration
pipeline {
    agent any

    environment {
        SONAR_PROJECT = 'my-project'
    }

    stages {
        stage('Build & Test') {
            steps {
                sh 'mvn clean verify'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Use configured SonarQube server
                withSonarQubeEnv('SonarQube-Server') {
                    sh '''
                        mvn sonar:sonar \\
                            -Dsonar.projectKey=\${SONAR_PROJECT} \\
                            -Dsonar.coverage.jacoco.xmlReportPaths=target/jacoco.xml
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                // Wait for SonarQube webhook callback
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}

// JaCoCo Coverage
pipeline {
    agent any

    stages {
        stage('Test with Coverage') {
            steps {
                sh 'mvn test jacoco:report'
            }
            post {
                always {
                    // Publish coverage report
                    jacoco(
                        execPattern: '**/target/jacoco.exec',
                        classPattern: '**/target/classes',
                        sourcePattern: '**/src/main/java',
                        exclusionPattern: '**/test/**',
                        minimumLineCoverage: '80',
                        maximumLineCoverage: '100'
                    )
                }
            }
        }
    }
}

// Warnings Next Generation
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'mvn compile 2>&1 | tee build.log'
            }
            post {
                always {
                    recordIssues(
                        tools: [
                            java(),
                            checkStyle(pattern: '**/checkstyle-result.xml'),
                            spotBugs(pattern: '**/spotbugsXml.xml'),
                            pmdParser(pattern: '**/pmd.xml')
                        ],
                        qualityGates: [[threshold: 10, type: 'TOTAL', unstable: true]]
                    )
                }
            }
        }
    }
}`
        },
        {
          name: 'Artifact Management',
          explanation: 'Publish artifacts: archiveArtifacts artifacts: \'**/target/*.jar\'. Nexus/Artifactory plugins deploy to artifact repositories. S3 plugin uploads to AWS S3. Fingerprint artifacts for traceability. Copy Artifact plugin shares artifacts between jobs.',
          codeExample: `// Artifact Management Examples
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'mvn package -DskipTests'
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Archive in Jenkins
                archiveArtifacts(
                    artifacts: '**/target/*.jar',
                    fingerprint: true,
                    onlyIfSuccessful: true
                )

                // Stash for later stages
                stash(
                    name: 'app-jar',
                    includes: 'target/*.jar'
                )
            }
        }

        stage('Deploy to Nexus') {
            steps {
                // Using Nexus Artifact Uploader plugin
                nexusArtifactUploader(
                    nexusVersion: 'nexus3',
                    protocol: 'https',
                    nexusUrl: 'nexus.company.com',
                    groupId: 'com.company',
                    version: "\${env.BUILD_NUMBER}",
                    repository: 'maven-releases',
                    credentialsId: 'nexus-credentials',
                    artifacts: [[
                        artifactId: 'myapp',
                        classifier: '',
                        file: 'target/myapp.jar',
                        type: 'jar'
                    ]]
                )
            }
        }

        stage('Upload to S3') {
            steps {
                withAWS(credentials: 'aws-credentials', region: 'us-east-1') {
                    s3Upload(
                        bucket: 'my-artifacts-bucket',
                        path: "builds/\${env.BUILD_NUMBER}/",
                        includePathPattern: 'target/*.jar'
                    )
                }
            }
        }

        stage('Artifactory Deploy') {
            steps {
                rtUpload(
                    serverId: 'artifactory-server',
                    spec: '''{
                        "files": [{
                            "pattern": "target/*.jar",
                            "target": "libs-release-local/com/company/myapp/\${BUILD_NUMBER}/"
                        }]
                    }'''
                )

                // Publish build info
                rtPublishBuildInfo(serverId: 'artifactory-server')
            }
        }
    }
}

// Copy Artifacts Between Jobs
pipeline {
    agent any
    stages {
        stage('Get Upstream Artifacts') {
            steps {
                copyArtifacts(
                    projectName: 'upstream-build-job',
                    filter: '**/*.jar',
                    target: 'libs/',
                    selector: lastSuccessful()
                )
            }
        }
    }
}`
        },
        {
          name: 'Notifications',
          explanation: 'Email Extension (emailext) sends customizable emails with build logs. Slack Notification plugin posts to Slack channels. Microsoft Teams plugin for Teams integration. Configure in post blocks based on build status. Include build details, test results, and change logs.',
          codeExample: `// Notification Examples
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'mvn package'
            }
        }
    }

    post {
        always {
            // Slack notification
            slackSend(
                channel: '#ci-builds',
                color: currentBuild.result == 'SUCCESS' ? 'good' : 'danger',
                message: """
                    *\${currentBuild.result}*: Job \${env.JOB_NAME} #\${env.BUILD_NUMBER}
                    Branch: \${env.BRANCH_NAME}
                    <\${env.BUILD_URL}|View Build>
                """.stripIndent()
            )
        }

        failure {
            // Email notification on failure
            emailext(
                subject: "FAILED: \${env.JOB_NAME} #\${env.BUILD_NUMBER}",
                body: '''
                    <h2>Build Failed</h2>
                    <p>Job: \${JOB_NAME}</p>
                    <p>Build Number: \${BUILD_NUMBER}</p>
                    <p>Build URL: <a href="\${BUILD_URL}">\${BUILD_URL}</a></p>
                    <h3>Changes:</h3>
                    \${CHANGES}
                    <h3>Console Output (last 100 lines):</h3>
                    <pre>\${BUILD_LOG, maxLines=100}</pre>
                ''',
                mimeType: 'text/html',
                recipientProviders: [
                    [\$class: 'DevelopersRecipientProvider'],
                    [\$class: 'CulpritsRecipientProvider'],
                    [\$class: 'RequesterRecipientProvider']
                ],
                attachLog: true,
                compressLog: true
            )

            // Microsoft Teams notification
            office365ConnectorSend(
                webhookUrl: '\${TEAMS_WEBHOOK_URL}',
                color: 'FF0000',
                message: "Build Failed: \${env.JOB_NAME}",
                factDefinitions: [
                    [name: 'Build', template: '#\${BUILD_NUMBER}'],
                    [name: 'Status', template: 'FAILED'],
                    [name: 'Branch', template: '\${BRANCH_NAME}']
                ]
            )
        }

        success {
            // Discord notification (using webhook)
            discordSend(
                webhookURL: '\${DISCORD_WEBHOOK}',
                title: 'Build Succeeded',
                description: "Job: \${env.JOB_NAME}\\nBuild: #\${env.BUILD_NUMBER}",
                link: env.BUILD_URL,
                result: 'SUCCESS'
            )
        }
    }
}`
        },
        {
          name: 'Cloud Platforms',
          explanation: 'AWS Steps plugin provides AWS CLI and SDK integration. Azure Credentials plugin manages Azure service principals. Google Cloud Build plugin integrates GCP. Use cloud plugins for dynamic agent provisioning, artifact storage, and deployments. Configure cloud credentials securely.',
          codeExample: `// Cloud Platform Integration

// AWS Integration
pipeline {
    agent any

    stages {
        stage('AWS Operations') {
            steps {
                withAWS(credentials: 'aws-credentials', region: 'us-east-1') {
                    // S3 operations
                    s3Upload(bucket: 'my-bucket', path: 'artifacts/', file: 'app.jar')
                    s3Download(bucket: 'my-bucket', path: 'config/', file: 'config.json')

                    // ECR login and push
                    sh '''
                        aws ecr get-login-password | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
                        docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/myapp:\${BUILD_NUMBER}
                    '''

                    // ECS deployment
                    sh '''
                        aws ecs update-service \\
                            --cluster my-cluster \\
                            --service my-service \\
                            --force-new-deployment
                    '''

                    // Lambda deployment
                    sh '''
                        aws lambda update-function-code \\
                            --function-name my-function \\
                            --zip-file fileb://function.zip
                    '''
                }
            }
        }
    }
}

// Azure Integration
pipeline {
    agent any

    stages {
        stage('Azure Operations') {
            steps {
                withCredentials([azureServicePrincipal('azure-sp-creds')]) {
                    sh '''
                        az login --service-principal \\
                            -u \$AZURE_CLIENT_ID \\
                            -p \$AZURE_CLIENT_SECRET \\
                            --tenant \$AZURE_TENANT_ID

                        # ACR push
                        az acr login --name myregistry
                        docker push myregistry.azurecr.io/myapp:\${BUILD_NUMBER}

                        # AKS deployment
                        az aks get-credentials --resource-group myRG --name myAKS
                        kubectl set image deployment/myapp myapp=myregistry.azurecr.io/myapp:\${BUILD_NUMBER}
                    '''
                }
            }
        }
    }
}

// GCP Integration
pipeline {
    agent any

    stages {
        stage('GCP Operations') {
            steps {
                withCredentials([file(credentialsId: 'gcp-key', variable: 'GCP_KEY')]) {
                    sh '''
                        gcloud auth activate-service-account --key-file=\$GCP_KEY
                        gcloud config set project my-project

                        # GCR push
                        gcloud auth configure-docker
                        docker push gcr.io/my-project/myapp:\${BUILD_NUMBER}

                        # GKE deployment
                        gcloud container clusters get-credentials my-cluster --zone us-central1-a
                        kubectl set image deployment/myapp myapp=gcr.io/my-project/myapp:\${BUILD_NUMBER}

                        # Cloud Run deployment
                        gcloud run deploy myapp \\
                            --image gcr.io/my-project/myapp:\${BUILD_NUMBER} \\
                            --region us-central1
                    '''
                }
            }
        }
    }
}`
        },
        {
          name: 'Blue Ocean',
          explanation: 'Blue Ocean provides a modern, visual UI for pipelines. Pipeline editor for creating Jenkinsfiles visually. Improved visualization of parallel stages and branches. Better GitHub/Bitbucket integration with automatic pipeline creation. Install as plugin, access via /blue URL path.',
          codeExample: `// Blue Ocean Optimized Jenkinsfile
// Blue Ocean visualizes this pipeline beautifully

pipeline {
    agent any

    options {
        // Blue Ocean shows these in the UI
        timestamps()
        ansiColor('xterm')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'mvn compile'
            }
        }

        stage('Test') {
            // Parallel stages shown side-by-side in Blue Ocean
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'mvn test -Dtest=*Unit*'
                    }
                    post {
                        always {
                            junit '**/target/surefire-reports/*Unit*.xml'
                        }
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'mvn test -Dtest=*Integration*'
                    }
                    post {
                        always {
                            junit '**/target/surefire-reports/*Integration*.xml'
                        }
                    }
                }
                stage('Security Scan') {
                    steps {
                        sh 'mvn dependency-check:check'
                    }
                }
            }
        }

        stage('Deploy') {
            // Sequential stages within Deploy
            stages {
                stage('Staging') {
                    steps {
                        echo 'Deploying to staging...'
                        sh './deploy.sh staging'
                    }
                }
                stage('Approval') {
                    // Blue Ocean shows nice input dialog
                    input {
                        message 'Deploy to production?'
                        ok 'Yes, deploy!'
                        submitter 'admin,release-manager'
                        parameters {
                            string(name: 'RELEASE_NOTES', defaultValue: '', description: 'Release notes')
                        }
                    }
                    steps {
                        echo "Approved with notes: \${RELEASE_NOTES}"
                    }
                }
                stage('Production') {
                    steps {
                        sh './deploy.sh production'
                    }
                }
            }
        }
    }

    post {
        // Blue Ocean shows post actions clearly
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

// Access Blue Ocean at: http://jenkins-url/blue
// Create pipeline: Blue Ocean > New Pipeline > Select repo
// Edit visually: Blue Ocean > Pipeline > Edit`
        }
      ]
    },
    {
      id: 'credentials-security',
      name: 'Credentials & Security',
      icon: '🔒',
      color: '#14b8a6',
      description: 'Credentials binding with withCredentials() masks secrets in logs. Username/Password, SSH keys, tokens, certificates stored securely. Matrix/Role-based RBAC with LDAP/AD integration for enterprise auth.',
      diagram: CredentialsDiagram,
      details: [
        {
          name: 'Credentials Types',
          explanation: 'Username/Password: access via credentials() binding, _USR and _PSW suffixes. Secret Text: single secret value (API keys, tokens). SSH Username with Private Key: for Git and server access. Certificate: PKCS12 or PEM files. Secret File: arbitrary secret files. Each type has specific use cases and access methods.',
          codeExample: `// Credentials Types in Jenkins

// 1. Username/Password
pipeline {
    agent any
    environment {
        // Simple binding - creates _USR and _PSW variables
        DB_CREDS = credentials('database-credentials')
    }
    stages {
        stage('Use Credentials') {
            steps {
                sh '''
                    echo "User: \$DB_CREDS_USR"
                    # Password is masked in logs
                    mysql -u \$DB_CREDS_USR -p\$DB_CREDS_PSW -h db.example.com
                '''
            }
        }
    }
}

// 2. Secret Text (API tokens, keys)
pipeline {
    agent any
    environment {
        API_TOKEN = credentials('api-token-secret')
    }
    stages {
        stage('API Call') {
            steps {
                sh 'curl -H "Authorization: Bearer \$API_TOKEN" https://api.example.com'
            }
        }
    }
}

// 3. SSH Private Key
pipeline {
    agent any
    stages {
        stage('SSH Deploy') {
            steps {
                sshagent(['ssh-deploy-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no deploy@server.com "cd /app && git pull"
                        scp -r dist/* deploy@server.com:/var/www/html/
                    '''
                }
            }
        }
    }
}

// 4. Secret File (kubeconfig, service account JSON)
pipeline {
    agent any
    stages {
        stage('K8s Deploy') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh 'kubectl apply -f deployment.yaml'
                }
            }
        }
    }
}

// 5. Certificate
pipeline {
    agent any
    stages {
        stage('Use Certificate') {
            steps {
                withCredentials([certificate(
                    credentialsId: 'client-cert',
                    keystoreVariable: 'KEYSTORE',
                    passwordVariable: 'KEYSTORE_PASS'
                )]) {
                    sh 'curl --cert \$KEYSTORE:\$KEYSTORE_PASS https://secure-api.com'
                }
            }
        }
    }
}`
        },
        {
          name: 'Credentials Binding',
          explanation: 'Use credentials() in environment block for simple binding. withCredentials() step for scoped access. Credentials are masked in console output. Access parts: $CREDS_USR, $CREDS_PSW for username/password. sshagent() wraps steps with SSH agent. Avoid printing credentials in logs.',
          codeExample: `// Credentials Binding Patterns
pipeline {
    agent any

    stages {
        stage('Multiple Credentials') {
            steps {
                // withCredentials for scoped, multiple bindings
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-hub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    ),
                    string(
                        credentialsId: 'sonar-token',
                        variable: 'SONAR_TOKEN'
                    ),
                    file(
                        credentialsId: 'gcp-key',
                        variable: 'GOOGLE_APPLICATION_CREDENTIALS'
                    ),
                    sshUserPrivateKey(
                        credentialsId: 'deploy-ssh',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    sh '''
                        # Docker login
                        echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin

                        # Use GCP credentials
                        gcloud auth activate-service-account --key-file=\$GOOGLE_APPLICATION_CREDENTIALS

                        # SonarQube analysis
                        mvn sonar:sonar -Dsonar.login=\$SONAR_TOKEN

                        # SSH with key file
                        ssh -i \$SSH_KEY \$SSH_USER@server.com 'deploy.sh'
                    '''
                }
                // Credentials are out of scope here
            }
        }

        stage('AWS Credentials') {
            steps {
                withCredentials([[
                    \$class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-prod',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh 'aws s3 ls'
                }
            }
        }

        stage('HashiCorp Vault') {
            steps {
                // Vault plugin integration
                withVault(
                    configuration: [
                        vaultUrl: 'https://vault.company.com',
                        vaultCredentialId: 'vault-approle'
                    ],
                    vaultSecrets: [[
                        path: 'secret/data/myapp',
                        secretValues: [
                            [envVar: 'DB_PASSWORD', vaultKey: 'db_password'],
                            [envVar: 'API_KEY', vaultKey: 'api_key']
                        ]
                    ]]
                ) {
                    sh './app-with-secrets.sh'
                }
            }
        }
    }
}`
        },
        {
          name: 'Credentials Scope',
          explanation: 'System credentials: available only to Jenkins system (agents, plugins). Global credentials: available to all jobs. Folder credentials: scoped to folder and subfolders. Use folder-level credentials for team isolation. Prefer narrowest scope for security.',
          codeExample: `// Credentials Scope Configuration (JCasC)

// JCasC YAML for credential scopes
credentials:
  system:
    domainCredentials:
      - credentials:
          # Global scope - available to all jobs
          - usernamePassword:
              scope: GLOBAL
              id: "github-bot"
              username: "jenkins-bot"
              password: "\${GITHUB_TOKEN}"
              description: "GitHub bot account"

          # System scope - only for Jenkins internal use
          - usernamePassword:
              scope: SYSTEM
              id: "agent-connection"
              username: "agent"
              password: "\${AGENT_SECRET}"
              description: "Agent connection credentials"

// Folder-scoped credentials (via folder config)
// Manage Jenkins > [Folder] > Credentials

// Jenkinsfile with folder credentials
pipeline {
    agent any

    stages {
        stage('Team A Deploy') {
            steps {
                // Uses folder-scoped credential
                // Only accessible in this folder
                withCredentials([
                    usernamePassword(
                        credentialsId: 'team-a-aws',  // Folder scope
                        usernameVariable: 'AWS_ACCESS_KEY',
                        passwordVariable: 'AWS_SECRET_KEY'
                    )
                ]) {
                    sh 'aws s3 sync ./dist s3://team-a-bucket/'
                }
            }
        }
    }
}

// Credential domains for URL-based scoping
credentials:
  system:
    domainCredentials:
      - domain:
          name: "GitHub"
          specifications:
            - hostnameSpecification:
                includes: "github.com,*.github.com"
        credentials:
          - usernamePassword:
              id: "github-creds"
              username: "user"
              password: "\${GITHUB_TOKEN}"

      - domain:
          name: "AWS"
          specifications:
            - hostnameSpecification:
                includes: "*.amazonaws.com"
        credentials:
          - usernamePassword:
              id: "aws-creds"
              username: "\${AWS_KEY}"
              password: "\${AWS_SECRET}"`
        },
        {
          name: 'RBAC and Authorization',
          explanation: 'Matrix Authorization provides fine-grained permissions. Role Strategy plugin adds role-based access control. Configure per-job, per-folder, or global permissions. Separate admin, developer, and viewer roles. Use LDAP/AD integration for enterprise authentication.',
          codeExample: `// Role-Based Access Control Configuration (JCasC)

jenkins:
  authorizationStrategy:
    roleBased:
      roles:
        global:
          # Admin role - full access
          - name: "admin"
            description: "Jenkins administrators"
            permissions:
              - "Overall/Administer"
              - "Overall/Read"
              - "Job/Build"
              - "Job/Cancel"
              - "Job/Configure"
              - "Job/Create"
              - "Job/Delete"
              - "Job/Read"
              - "Job/Workspace"
              - "Credentials/Create"
              - "Credentials/Delete"
              - "Credentials/Update"
              - "Credentials/View"
            entries:
              - group: "jenkins-admins"

          # Developer role - build and view
          - name: "developer"
            description: "Developers"
            permissions:
              - "Overall/Read"
              - "Job/Build"
              - "Job/Cancel"
              - "Job/Read"
              - "Job/Workspace"
            entries:
              - group: "developers"

          # Viewer role - read only
          - name: "viewer"
            description: "Read-only access"
            permissions:
              - "Overall/Read"
              - "Job/Read"
            entries:
              - group: "everyone"

        items:
          # Project-specific roles
          - name: "team-a-admin"
            description: "Team A project admin"
            pattern: "team-a/.*"
            permissions:
              - "Job/Build"
              - "Job/Configure"
              - "Job/Read"
              - "Job/Workspace"
              - "Credentials/View"
            entries:
              - group: "team-a-leads"

  securityRealm:
    ldap:
      configurations:
        - server: "ldap://ldap.company.com"
          rootDN: "dc=company,dc=com"
          userSearchBase: "ou=Users"
          userSearch: "uid={0}"
          groupSearchBase: "ou=Groups"
          groupSearchFilter: "(& (cn={0}) (objectclass=posixGroup))"
      cache:
        size: 100
        ttl: 300

// Matrix Authorization (alternative)
jenkins:
  authorizationStrategy:
    projectMatrix:
      permissions:
        - "Overall/Administer:admin-group"
        - "Overall/Read:authenticated"
        - "Job/Build:developers"
        - "Job/Read:authenticated"`
        },
        {
          name: 'Script Security',
          explanation: 'Pipeline scripts run in sandbox by default. Unapproved methods require admin approval. In-process Script Approval manages approvals. Trusted shared libraries bypass sandbox. Be cautious with @NonCPS methods. Review and minimize script approvals.',
          codeExample: `// Script Security Patterns

// Sandbox-safe operations (no approval needed)
pipeline {
    agent any
    stages {
        stage('Safe Operations') {
            steps {
                script {
                    // String operations
                    def version = "1.0.\${env.BUILD_NUMBER}"

                    // Collections
                    def items = ['a', 'b', 'c']
                    items.each { echo it }

                    // Map operations
                    def config = [name: 'app', port: 8080]
                    echo "Name: \${config.name}"
                }
            }
        }
    }
}

// Operations requiring approval
pipeline {
    agent any
    stages {
        stage('Needs Approval') {
            steps {
                script {
                    // File operations - needs approval
                    // new File('/etc/passwd').text

                    // System commands - use sh instead
                    // Runtime.getRuntime().exec('ls')

                    // Reflection - needs approval
                    // this.class.classLoader
                }
            }
        }
    }
}

// @NonCPS for non-serializable operations
@NonCPS
def parseJson(String json) {
    // JsonSlurper is not serializable
    // Must use @NonCPS or Jenkins will fail
    def slurper = new groovy.json.JsonSlurper()
    return slurper.parseText(json)
}

pipeline {
    agent any
    stages {
        stage('Parse Config') {
            steps {
                script {
                    def json = readFile('config.json')
                    def config = parseJson(json)
                    echo "App: \${config.app.name}"
                }
            }
        }
    }
}

// Trusted Shared Library (bypasses sandbox)
// Configure in Global Pipeline Libraries with:
// "Load implicitly: true" and "Allow default version to be overridden: false"

// Library marked as trusted can use any Groovy
// vars/unsafeOperation.groovy
def call() {
    // This runs outside sandbox
    def file = new File('/var/jenkins/data.txt')
    return file.text
}

// Script Approval (Manage Jenkins > In-process Script Approval)
// Review and approve only necessary signatures:
// - method groovy.json.JsonSlurper parseText java.lang.String
// - staticMethod org.codehaus.groovy.runtime.DefaultGroovyMethods...`
        },
        {
          name: 'Security Best Practices',
          explanation: 'Enable CSRF protection. Use HTTPS for Jenkins URL. Disable CLI over remoting. Run controller in dedicated security realm. Audit plugin versions for vulnerabilities. Use credentials, never hardcode secrets. Enable build log masking. Regular security updates.',
          codeExample: `// Security Best Practices (JCasC)

jenkins:
  # Disable executors on controller
  numExecutors: 0

  # CSRF Protection
  crumbIssuer:
    standard:
      excludeClientIPFromCrumb: false

  # Disable CLI over remoting
  remotingSecurity:
    enabled: true

  # Disable deprecated protocols
  agentProtocols:
    - "JNLP4-connect"
    - "Ping"

  # Security Realm
  securityRealm:
    ldap:
      configurations:
        - server: "ldaps://ldap.company.com:636"

  # Disable script console for non-admins
  # (via Matrix Authorization)

unclassified:
  # Configure root URL with HTTPS
  location:
    url: "https://jenkins.company.com/"

  # Build discarder
  buildDiscarders:
    configuredBuildDiscarder:
      discarder:
        logRotator:
          daysToKeep: "30"
          numToKeep: "100"

// Jenkinsfile Security Practices
pipeline {
    agent any

    options {
        // Mask passwords in logs
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Secure Practices') {
            steps {
                // GOOD: Use credentials binding
                withCredentials([string(credentialsId: 'api-key', variable: 'API_KEY')]) {
                    sh 'curl -H "Auth: \$API_KEY" https://api.example.com'
                }

                // BAD: Never hardcode secrets
                // sh 'curl -H "Auth: abc123secret" https://api.example.com'

                // GOOD: Use mask-passwords plugin
                wrap([\$class: 'MaskPasswordsBuildWrapper']) {
                    sh 'echo "Using masked value"'
                }

                // GOOD: Validate inputs
                script {
                    if (params.DEPLOY_ENV ==~ /^(dev|staging|prod)\$/) {
                        sh "./deploy.sh \${params.DEPLOY_ENV}"
                    } else {
                        error "Invalid environment"
                    }
                }
            }
        }
    }
}

// Plugin Security Auditing Script
// Run in Script Console periodically
import jenkins.model.Jenkins

Jenkins.instance.pluginManager.plugins.each { plugin ->
    def warnings = Jenkins.instance.getExtensionList(
        jenkins.security.UpdateSiteWarningsMonitor
    )[0]?.getActivePluginWarningsByPlugin()?.get(plugin.shortName)

    if (warnings) {
        println "\${plugin.displayName}: \${warnings*.message}"
    }
}`
        }
      ]
    },
    {
      id: 'job-types',
      name: 'Job Types & Configuration',
      icon: '📋',
      color: '#6366f1',
      description: 'Freestyle for simple builds, Pipeline for Jenkinsfile-based workflows. Multibranch auto-discovers branches/PRs, Organization Folders scan entire repos. JCasC enables Infrastructure-as-Code for Jenkins config.',
      diagram: JenkinsJobDiagram,
      details: [
        {
          name: 'Freestyle Jobs',
          explanation: 'GUI-configured jobs with build steps and post-build actions. Good for simple tasks: single repository, straightforward build. Limited pipeline capabilities (no parallel, limited conditionals). Use for legacy compatibility or quick one-off jobs. Consider migrating to Pipeline for complex workflows.',
          codeExample: `// Freestyle Job Configuration (Job DSL)
// Use Job DSL plugin to create Freestyle jobs programmatically

job('my-freestyle-job') {
    description('Simple build job')

    // Source Code Management
    scm {
        git {
            remote {
                url('https://github.com/company/repo.git')
                credentials('github-credentials')
            }
            branch('*/main')
        }
    }

    // Build Triggers
    triggers {
        scm('H/5 * * * *')  // Poll every 5 minutes
        cron('0 2 * * *')    // Nightly at 2 AM
    }

    // Build Environment
    wrappers {
        timeout {
            absolute(30)
        }
        credentialsBinding {
            string('API_KEY', 'api-key-credential')
        }
        timestamps()
    }

    // Build Steps
    steps {
        shell('mvn clean package')
        shell('./deploy.sh staging')
    }

    // Post-build Actions
    publishers {
        archiveArtifacts('target/*.jar')
        junit('**/target/surefire-reports/*.xml')
        mailer('team@company.com', true, true)

        slackNotifier {
            room('#builds')
            notifySuccess(true)
            notifyFailure(true)
        }
    }
}

// Freestyle jobs are configured in Jenkins UI:
// New Item > Freestyle project
// - Source Code Management: Git
// - Build Triggers: Poll SCM, Build periodically
// - Build: Execute shell
// - Post-build: Archive artifacts, JUnit, Email`
        },
        {
          name: 'Pipeline Jobs',
          explanation: 'Define build process in Jenkinsfile. Pipeline script can be inline or from SCM. Supports full pipeline DSL: stages, parallel, conditionals. Blue Ocean compatible. Single branch focused. Use for main branch CI/CD or when Jenkinsfile location is non-standard.',
          codeExample: `// Pipeline Job Configuration

// Option 1: Pipeline script from SCM
// In Jenkins: New Item > Pipeline
// Definition: Pipeline script from SCM
// SCM: Git
// Script Path: Jenkinsfile (or custom path like ci/Jenkinsfile)

// Option 2: Inline Pipeline Script (in Jenkins UI)
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'mvn package'
            }
        }
    }
}

// Job DSL to create Pipeline job
pipelineJob('my-pipeline') {
    description('Pipeline job from SCM')

    // Pipeline from repository
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        url('https://github.com/company/repo.git')
                        credentials('github-credentials')
                    }
                    branch('*/main')
                }
            }
            // Path to Jenkinsfile
            scriptPath('Jenkinsfile')
        }
    }

    // Triggers
    triggers {
        githubPush()
    }

    // Properties
    properties {
        disableConcurrentBuilds()
        buildDiscarder {
            strategy {
                logRotator {
                    numToKeepStr('10')
                }
            }
        }
    }
}

// Lightweight checkout (only Jenkinsfile)
pipelineJob('lightweight-pipeline') {
    definition {
        cpsScm {
            scm {
                git {
                    remote { url('https://github.com/company/repo.git') }
                    branch('*/main')
                }
            }
            scriptPath('Jenkinsfile')
            lightweight(true)  // Only checkout Jenkinsfile initially
        }
    }
}`
        },
        {
          name: 'Multibranch Pipeline',
          explanation: 'Automatically discovers branches in repository. Creates pipeline job per branch/PR. Looks for Jenkinsfile in each branch. Supports branch-specific behavior via when clauses. Ideal for feature branch workflows and PR validation. Configure branch sources and discovery strategies.',
          codeExample: `// Multibranch Pipeline Configuration

// Job DSL for Multibranch Pipeline
multibranchPipelineJob('my-multibranch') {
    description('Builds all branches and PRs')

    branchSources {
        github {
            id('github-source')
            repoOwner('company')
            repository('repo')
            credentialsId('github-token')

            // Build strategies
            buildStrategies {
                buildAllBranches {
                    strategies {
                        // Build discovered branches
                        buildAllBranches()
                    }
                }
            }
        }
    }

    // Orphaned item strategy
    orphanedItemStrategy {
        discardOldItems {
            numToKeep(10)
        }
    }

    // Scan triggers
    triggers {
        periodic(1)  // Scan every minute
    }

    // Factory
    factory {
        workflowBranchProjectFactory {
            scriptPath('Jenkinsfile')
        }
    }
}

// Jenkinsfile with branch-specific behavior
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'mvn package'
            }
        }

        stage('Deploy to Dev') {
            when {
                branch 'develop'
            }
            steps {
                sh './deploy.sh dev'
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                sh './deploy.sh staging'
            }
        }

        stage('Deploy to Prod') {
            when {
                // Only for release branches
                branch pattern: 'release/*', comparator: 'GLOB'
            }
            steps {
                input 'Deploy to production?'
                sh './deploy.sh production'
            }
        }

        stage('PR Validation') {
            when {
                changeRequest()  // Only for PRs
            }
            steps {
                sh 'mvn verify'
                githubNotify status: 'SUCCESS', context: 'ci/validation'
            }
        }
    }
}`
        },
        {
          name: 'Organization Folders',
          explanation: 'Scan entire GitHub/GitLab organization or Bitbucket team. Creates Multibranch Pipelines for each repository with Jenkinsfile. Automatic project discovery and cleanup. Great for microservices architectures. Configure organization credentials and scanning intervals.',
          codeExample: `// Organization Folder Configuration

// Job DSL for GitHub Organization Folder
organizationFolder('my-org') {
    description('All repositories in GitHub organization')

    organizations {
        github {
            repoOwner('my-company')
            credentialsId('github-org-token')

            // API endpoint for GitHub Enterprise
            // apiUri('https://github.company.com/api/v3')

            traits {
                // Discover branches
                gitHubBranchDiscovery {
                    strategyId(1)  // Only branches with PRs
                }

                // Discover PRs
                gitHubPullRequestDiscovery {
                    strategyId(1)  // Merge with target
                }

                // Filter repositories
                sourceWildcardFilter {
                    includes('*')
                    excludes('legacy-* old-*')
                }

                // Clone behavior
                cloneOption {
                    shallow(true)
                    depth(1)
                    timeout(10)
                }
            }
        }
    }

    // Project factories
    projectFactories {
        workflowMultiBranchProjectFactory {
            scriptPath('Jenkinsfile')
        }
    }

    // Scan triggers
    triggers {
        periodicFolderTrigger {
            interval('5m')
        }
    }

    // Orphaned items
    orphanedItemStrategy {
        discardOldItems {
            numToKeep(5)
        }
    }
}

// GitLab Organization Folder
organizationFolder('gitlab-org') {
    organizations {
        gitLabSCMNavigator {
            projectOwner('my-group')
            credentialsId('gitlab-token')
            serverName('gitlab.company.com')

            traits {
                gitLabBranchDiscovery()
                gitLabMergeRequestDiscovery()
            }
        }
    }
}

// Bitbucket Organization Folder
organizationFolder('bitbucket-team') {
    organizations {
        bitbucket {
            repoOwner('my-team')
            credentialsId('bitbucket-creds')
            serverUrl('https://bitbucket.company.com')

            traits {
                bitbucketBranchDiscovery()
                bitbucketPullRequestDiscovery()
            }
        }
    }
}`
        },
        {
          name: 'Job DSL',
          explanation: 'Programmatically create and configure jobs. Use Job DSL plugin with Groovy scripts. seed job generates other jobs. Version control job definitions. Enables Infrastructure as Code for Jenkins configuration. Combine with shared libraries for standardized jobs.',
          codeExample: `// Job DSL Examples

// Seed job that creates other jobs
// Create a Freestyle job named "seed-job"
// Build step: Process Job DSLs
// DSL Scripts: jobs/**/*.groovy

// jobs/microservices.groovy
def services = ['api', 'web', 'worker', 'auth']

services.each { service ->
    pipelineJob("microservices/\${service}") {
        description("CI/CD for \${service} service")

        parameters {
            stringParam('DEPLOY_ENV', 'dev', 'Target environment')
            booleanParam('RUN_TESTS', true, 'Run test suite')
        }

        definition {
            cpsScm {
                scm {
                    git {
                        remote {
                            url("https://github.com/company/\${service}.git")
                            credentials('github-token')
                        }
                        branch('*/main')
                    }
                }
                scriptPath('Jenkinsfile')
            }
        }

        triggers {
            githubPush()
        }

        properties {
            disableConcurrentBuilds()
        }
    }
}

// jobs/utilities.groovy
folder('utilities') {
    description('Utility jobs')
}

pipelineJob('utilities/cleanup-docker') {
    triggers {
        cron('0 3 * * *')  // 3 AM daily
    }

    definition {
        cps {
            script('''
                pipeline {
                    agent { label 'docker' }
                    stages {
                        stage('Cleanup') {
                            steps {
                                sh 'docker system prune -af --volumes'
                            }
                        }
                    }
                }
            ''')
        }
    }
}

// jobs/templates/standard-pipeline.groovy
class StandardPipeline {
    static void create(def dslFactory, String name, Map config) {
        dslFactory.pipelineJob(name) {
            description(config.description ?: "Pipeline for \${name}")

            definition {
                cpsScm {
                    scm {
                        git {
                            remote {
                                url(config.repoUrl)
                                credentials('github-token')
                            }
                            branch(config.branch ?: '*/main')
                        }
                    }
                    scriptPath(config.jenkinsfile ?: 'Jenkinsfile')
                }
            }

            if (config.cron) {
                triggers { cron(config.cron) }
            }
        }
    }
}

// Usage:
StandardPipeline.create(this, 'my-app', [
    repoUrl: 'https://github.com/company/my-app.git',
    description: 'Main application',
    cron: 'H 2 * * *'
])`
        },
        {
          name: 'Configuration as Code',
          explanation: 'JCasC (Jenkins Configuration as Code) plugin manages Jenkins config in YAML. Define system settings, credentials, tools, and security. Store in version control, apply on startup. Enables reproducible Jenkins instances. Essential for Jenkins automation and disaster recovery.',
          codeExample: `// jenkins.yaml - Complete JCasC Configuration

jenkins:
  systemMessage: "Jenkins CI/CD - Managed by Configuration as Code"
  numExecutors: 0
  mode: EXCLUSIVE

  # Security Configuration
  securityRealm:
    ldap:
      configurations:
        - server: "ldaps://ldap.company.com:636"
          rootDN: "dc=company,dc=com"
          userSearch: "uid={0}"
          groupSearchBase: "ou=Groups"

  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions: ["Overall/Administer"]
            entries:
              - group: "jenkins-admins"
          - name: "developer"
            permissions: ["Job/Build", "Job/Read"]
            entries:
              - group: "developers"

  # Cloud Agents
  clouds:
    - kubernetes:
        name: "k8s"
        serverUrl: "https://kubernetes.default.svc"
        namespace: "jenkins-agents"
        jenkinsUrl: "http://jenkins.jenkins.svc:8080"
        templates:
          - name: "maven"
            label: "maven"
            containers:
              - name: "maven"
                image: "maven:3.8-jdk11"
                workingDir: "/home/jenkins/agent"

  # Global Tool Configuration
  tools:
    git:
      installations:
        - name: "git"
          home: "/usr/bin/git"
    maven:
      installations:
        - name: "maven-3.8"
          properties:
            - installSource:
                installers:
                  - maven:
                      id: "3.8.6"
    jdk:
      installations:
        - name: "jdk-11"
          properties:
            - installSource:
                installers:
                  - adoptOpenJdkInstaller:
                      id: "jdk-11.0.11+9"

# Credentials
credentials:
  system:
    domainCredentials:
      - credentials:
          - usernamePassword:
              id: "github-token"
              username: "jenkins-bot"
              password: "\${GITHUB_TOKEN}"
          - string:
              id: "sonar-token"
              secret: "\${SONAR_TOKEN}"
          - file:
              id: "kubeconfig"
              fileName: "config"
              secretBytes: "\${KUBECONFIG_B64}"

# Unclassified (plugins)
unclassified:
  location:
    url: "https://jenkins.company.com/"
    adminAddress: "jenkins-admin@company.com"

  globalLibraries:
    libraries:
      - name: "shared-library"
        defaultVersion: "main"
        retriever:
          modernSCM:
            scm:
              git:
                remote: "https://github.com/company/jenkins-lib.git"
                credentialsId: "github-token"

  slackNotifier:
    teamDomain: "company"
    tokenCredentialId: "slack-token"

# Apply with:
# CASC_JENKINS_CONFIG=/path/to/jenkins.yaml
# Or: Manage Jenkins > Configuration as Code > Apply new configuration`
        }
      ]
    },
    {
      id: 'testing-quality',
      name: 'Testing & Quality Gates',
      icon: '🧪',
      color: '#ef4444',
      description: 'Parallel test stages with junit plugin for result publishing. SonarQube Quality Gates with waitForQualityGate() enforcement. JaCoCo coverage thresholds, performance baselines, security scanning with OWASP/Trivy.',
      details: [
        {
          name: 'Test Execution',
          explanation: 'Run tests in dedicated stage: mvn test, npm test, pytest. Parallel test execution for speed: parallel { stage(\'Unit\') {...} stage(\'Integration\') {...} }. Use test containers for integration tests. Set timeouts to prevent hung tests. Fail fast with failFast: true in parallel blocks.',
          codeExample: `// Test Execution Strategies
pipeline {
    agent any

    stages {
        stage('Unit Tests') {
            steps {
                sh 'mvn test -Dtest=*Unit*'
            }
        }

        stage('Parallel Tests') {
            parallel {
                stage('Integration') {
                    agent { label 'docker' }
                    steps {
                        sh 'mvn test -Dtest=*Integration*'
                    }
                }
                stage('E2E') {
                    agent { label 'chrome' }
                    steps {
                        sh 'npm run test:e2e'
                    }
                }
                stage('Performance') {
                    agent { label 'performance' }
                    steps {
                        sh 'mvn gatling:test'
                    }
                }
            }
            failFast true  // Stop all parallel stages on first failure
        }

        stage('Test with Containers') {
            steps {
                script {
                    // Start test database
                    docker.image('postgres:14').withRun(
                        '-e POSTGRES_PASSWORD=test -e POSTGRES_DB=testdb'
                    ) { db ->
                        // Start app container linked to db
                        docker.image('myapp:test').inside(
                            "--link \${db.id}:db"
                        ) {
                            sh 'npm run test:integration'
                        }
                    }
                }
            }
        }

        stage('Testcontainers') {
            agent {
                docker {
                    image 'maven:3.8-jdk11'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                // Uses Testcontainers library
                sh 'mvn test -Pintegration-tests'
            }
        }
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
    }
}`
        },
        {
          name: 'Test Reporting',
          explanation: 'JUnit plugin publishes test results: junit \'**/target/surefire-reports/*.xml\'. Visualize pass/fail trends over time. Link to specific test failures. NUnit and other frameworks use similar patterns. Always publish in post { always { } } block to capture failures.',
          codeExample: `// Test Reporting Examples
pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                // Java/Maven
                sh 'mvn test'

                // Node.js with Jest
                // sh 'npm test -- --ci --reporters=default --reporters=jest-junit'

                // Python with pytest
                // sh 'pytest --junitxml=test-results.xml'

                // .NET
                // bat 'dotnet test --logger:trx'
            }
        }
    }

    post {
        always {
            // JUnit report - always publish (even on failure)
            junit(
                testResults: '**/target/surefire-reports/*.xml',
                allowEmptyResults: true,
                skipPublishingChecks: false
            )

            // Multiple test formats
            junit testResults: '**/test-results/*.xml'

            // NUnit results
            // nunit testResultsPattern: '**/TestResults/*.xml'

            // xUnit for multiple formats
            xunit([
                JUnit(pattern: '**/target/surefire-reports/*.xml'),
                NUnit3(pattern: '**/TestResults/*.xml'),
                GoogleTest(pattern: '**/test-results/*.xml')
            ])

            // Allure reports (rich test reports)
            allure([
                results: [[path: 'target/allure-results']]
            ])

            // Cucumber reports
            cucumber(
                fileIncludePattern: '**/*.json',
                jsonReportDirectory: 'target/cucumber-reports'
            )

            // HTML Publisher for custom reports
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'target/site',
                reportFiles: 'surefire-report.html',
                reportName: 'Test Report'
            ])
        }

        unstable {
            // Send notification when tests fail
            slackSend(
                color: 'warning',
                message: "Tests failed in \${env.JOB_NAME}"
            )
        }
    }
}`
        },
        {
          name: 'Code Coverage',
          explanation: 'JaCoCo plugin for Java coverage: jacoco(). Cobertura plugin alternative. Configure coverage thresholds: minimum line/branch coverage. Fail builds below threshold. Publish coverage trends. Istanbul/NYC for JavaScript, coverage.py for Python.',
          codeExample: `// Code Coverage Examples
pipeline {
    agent any

    stages {
        stage('Test with Coverage') {
            steps {
                // Java with JaCoCo (Maven)
                sh 'mvn clean verify'

                // Or explicit JaCoCo
                // sh 'mvn test jacoco:report'
            }
        }
    }

    post {
        always {
            // JaCoCo coverage report
            jacoco(
                execPattern: '**/target/jacoco.exec',
                classPattern: '**/target/classes',
                sourcePattern: '**/src/main/java',
                exclusionPattern: '**/test/**,**/*Config*',

                // Thresholds (fail build if not met)
                minimumLineCoverage: '80',
                minimumBranchCoverage: '70',
                minimumMethodCoverage: '80',
                minimumClassCoverage: '90',
                minimumInstructionCoverage: '75',
                minimumComplexityCoverage: '70',

                // Delta thresholds (vs previous build)
                maximumLineCoverageDecrease: '5',
                maximumBranchCoverageDecrease: '5',

                // Build status
                changeBuildStatus: true
            )

            // Cobertura alternative
            // cobertura(
            //     coberturaReportFile: '**/coverage.xml',
            //     conditionalCoverageTargets: '70, 0, 0',
            //     lineCoverageTargets: '80, 0, 0',
            //     failUnhealthy: false,
            //     failUnstable: false
            // )
        }
    }
}

// JavaScript/TypeScript Coverage
pipeline {
    agent { docker { image 'node:18' } }

    stages {
        stage('Test with Coverage') {
            steps {
                sh '''
                    npm ci
                    npm run test:coverage
                '''
            }
        }
    }

    post {
        always {
            // Istanbul/NYC coverage
            publishCoverage(
                adapters: [
                    istanbulCoberturaAdapter('coverage/cobertura-coverage.xml')
                ],
                sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
            )
        }
    }
}

// Python Coverage
pipeline {
    agent { docker { image 'python:3.11' } }

    stages {
        stage('Test') {
            steps {
                sh '''
                    pip install pytest pytest-cov
                    pytest --cov=src --cov-report=xml tests/
                '''
            }
        }
    }

    post {
        always {
            cobertura coberturaReportFile: 'coverage.xml'
        }
    }
}`
        },
        {
          name: 'SonarQube Integration',
          explanation: 'Configure SonarQube server in Jenkins global configuration. Use withSonarQubeEnv step for analysis. Quality Gate checks: waitForQualityGate(abortPipeline: true). Webhook from SonarQube notifies Jenkins of gate status. Enforce code quality standards automatically.',
          codeExample: `// SonarQube Integration
pipeline {
    agent any

    environment {
        SONAR_PROJECT_KEY = 'my-project'
    }

    stages {
        stage('Build & Test') {
            steps {
                sh 'mvn clean verify'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube-Server') {
                    // Maven project
                    sh '''
                        mvn sonar:sonar \\
                            -Dsonar.projectKey=\${SONAR_PROJECT_KEY} \\
                            -Dsonar.projectName="My Project" \\
                            -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml \\
                            -Dsonar.java.binaries=target/classes
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                // Wait for SonarQube webhook
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}

// SonarQube Scanner for other languages
pipeline {
    agent any

    stages {
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube-Server') {
                    // Using SonarScanner
                    sh '''
                        sonar-scanner \\
                            -Dsonar.projectKey=my-js-project \\
                            -Dsonar.sources=src \\
                            -Dsonar.tests=test \\
                            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \\
                            -Dsonar.testExecutionReportPaths=test-report.xml
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    def qg = waitForQualityGate()
                    if (qg.status != 'OK') {
                        unstable "Quality Gate failed: \${qg.status}"
                    }
                }
            }
        }
    }
}

// Configure SonarQube Webhook:
// SonarQube > Administration > Configuration > Webhooks
// URL: https://jenkins.company.com/sonarqube-webhook/

// JCasC configuration for SonarQube
unclassified:
  sonarGlobalConfiguration:
    installations:
      - name: "SonarQube-Server"
        serverUrl: "https://sonarqube.company.com"
        credentialsId: "sonar-token"`
        },
        {
          name: 'Performance Testing',
          explanation: 'Run JMeter, Gatling, or k6 tests in pipeline. Performance plugin publishes results and trends. Set thresholds for response time and error rate. Compare against baseline. Run in dedicated stage with appropriate resources. Consider running on schedule vs every commit.',
          codeExample: `// Performance Testing Examples

// JMeter Performance Tests
pipeline {
    agent { label 'performance' }

    stages {
        stage('Deploy to Test Env') {
            steps {
                sh './deploy.sh performance-env'
            }
        }

        stage('JMeter Tests') {
            steps {
                sh '''
                    jmeter -n \\
                        -t tests/performance/load-test.jmx \\
                        -l results/results.jtl \\
                        -e -o results/html-report \\
                        -Jthreads=100 \\
                        -Jrampup=60 \\
                        -Jduration=300
                '''
            }
            post {
                always {
                    perfReport(
                        sourceDataFiles: 'results/*.jtl',
                        errorFailedThreshold: 5,
                        errorUnstableThreshold: 3,
                        relativeFailedThresholdPositive: 20,
                        relativeUnstableThresholdPositive: 10
                    )

                    publishHTML([
                        reportDir: 'results/html-report',
                        reportFiles: 'index.html',
                        reportName: 'JMeter Report'
                    ])
                }
            }
        }
    }
}

// Gatling Performance Tests
pipeline {
    agent { docker { image 'denvazh/gatling:3.9.0' } }

    stages {
        stage('Gatling Tests') {
            steps {
                sh '''
                    gatling.sh \\
                        -s simulations.LoadTestSimulation \\
                        -rd "Build \${BUILD_NUMBER}"
                '''
            }
            post {
                always {
                    gatlingArchive()

                    // Or manual HTML publish
                    publishHTML([
                        reportDir: 'target/gatling/*/html',
                        reportFiles: 'index.html',
                        reportName: 'Gatling Report'
                    ])
                }
            }
        }
    }
}

// k6 Load Tests
pipeline {
    agent { docker { image 'grafana/k6' } }

    stages {
        stage('k6 Tests') {
            steps {
                sh '''
                    k6 run \\
                        --out json=results.json \\
                        --summary-export=summary.json \\
                        tests/load-test.js
                '''

                script {
                    def summary = readJSON file: 'summary.json'
                    def p95 = summary.metrics.http_req_duration.values.p95

                    if (p95 > 500) {
                        unstable "P95 latency \${p95}ms exceeds 500ms threshold"
                    }
                }
            }
        }
    }
}`
        },
        {
          name: 'Security Scanning',
          explanation: 'OWASP Dependency-Check scans for vulnerable dependencies. Trivy scans container images. Snyk plugin for comprehensive security scanning. Fail builds on critical vulnerabilities. Generate security reports. Integrate with security dashboards.',
          codeExample: `// Security Scanning Examples
pipeline {
    agent any

    stages {
        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck(
                    additionalArguments: '''
                        --scan ./
                        --format HTML
                        --format JSON
                        --out ./dependency-check-report
                    ''',
                    odcInstallation: 'dependency-check'
                )
            }
            post {
                always {
                    dependencyCheckPublisher(
                        pattern: '**/dependency-check-report.json',
                        failedTotalCritical: 0,
                        failedTotalHigh: 5,
                        unstableTotalCritical: 0,
                        unstableTotalHigh: 1
                    )
                }
            }
        }

        stage('Container Security - Trivy') {
            steps {
                sh '''
                    # Scan container image
                    trivy image \\
                        --exit-code 1 \\
                        --severity CRITICAL,HIGH \\
                        --format json \\
                        --output trivy-results.json \\
                        myapp:\${BUILD_NUMBER}
                '''
            }
            post {
                always {
                    recordIssues(
                        tools: [trivy(pattern: 'trivy-results.json')]
                    )
                }
            }
        }

        stage('Snyk Security Scan') {
            steps {
                snykSecurity(
                    snykInstallation: 'snyk',
                    snykTokenId: 'snyk-token',
                    severity: 'high',
                    failOnIssues: true,
                    additionalArguments: '--all-projects'
                )
            }
        }

        stage('SAST - SonarQube') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'mvn sonar:sonar -Dsonar.security.hotspots.analysis=true'
                }
            }
        }

        stage('Secret Scanning') {
            steps {
                sh '''
                    # Gitleaks for secret detection
                    gitleaks detect \\
                        --source . \\
                        --report-format json \\
                        --report-path gitleaks-report.json \\
                        --exit-code 1
                '''
            }
        }

        stage('License Compliance') {
            steps {
                sh '''
                    # FOSSA or similar
                    fossa analyze
                    fossa test --timeout 600
                '''
            }
        }
    }

    post {
        always {
            // Archive security reports
            archiveArtifacts(
                artifacts: '**/dependency-check-report.*, **/trivy-*.json, **/gitleaks-*.json',
                allowEmptyArchive: true
            )

            // Send to security dashboard
            // sendSecurityReport(...)
        }
    }
}`
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
      stack.push({ name: 'Jenkins', icon: '🔨', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Jenkins', icon: '🔨' })
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
          <h1 style={titleStyle}>Jenkins CI/CD</h1>
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
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={JENKINS_COLORS}
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

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={JENKINS_COLORS.primary}
      />


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
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={JENKINS_COLORS}
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
                    <SyntaxHighlighter
                      language="groovy"
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

export default Jenkins

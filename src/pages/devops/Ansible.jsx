import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

const ANSIBLE_COLORS = {
  primary: '#ee0000',
  primaryHover: '#ff3333',
  bg: 'rgba(238, 0, 0, 0.1)',
  border: 'rgba(238, 0, 0, 0.3)',
  arrow: '#ee0000',
  hoverBg: 'rgba(238, 0, 0, 0.2)',
  topicBg: 'rgba(238, 0, 0, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

const AnsibleArchitectureDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="ansArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ee0000" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#aa0000" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowAnsArch" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#ee0000"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#ansArchGrad)" stroke="#ee0000" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#ff6666" fontSize="14" fontWeight="bold">Ansible Architecture — Agentless Push Model</text>
    <rect x="20" y="40" width="120" height="50" rx="6" fill="#1e3a5f" stroke="#ee0000" strokeWidth="1.5"/>
    <text x="80" y="60" textAnchor="middle" fill="#ff6666" fontSize="9" fontWeight="bold">Control Node</text>
    <text x="80" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">ansible / ansible-playbook</text>
    <line x1="140" y1="55" x2="195" y2="45" stroke="#ee0000" strokeWidth="2" markerEnd="url(#arrowAnsArch)"/>
    <line x1="140" y1="65" x2="195" y2="65" stroke="#ee0000" strokeWidth="2" markerEnd="url(#arrowAnsArch)"/>
    <line x1="140" y1="75" x2="195" y2="85" stroke="#ee0000" strokeWidth="2" markerEnd="url(#arrowAnsArch)"/>
    <rect x="200" y="35" width="80" height="20" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1"/>
    <text x="240" y="49" textAnchor="middle" fill="#60a5fa" fontSize="8">SSH / WinRM</text>
    <rect x="200" y="55" width="80" height="20" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1"/>
    <text x="240" y="69" textAnchor="middle" fill="#60a5fa" fontSize="8">SSH / WinRM</text>
    <rect x="200" y="75" width="80" height="20" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1"/>
    <text x="240" y="89" textAnchor="middle" fill="#60a5fa" fontSize="8">SSH / WinRM</text>
    <line x1="280" y1="45" x2="325" y2="45" stroke="#ee0000" strokeWidth="1.5" markerEnd="url(#arrowAnsArch)"/>
    <line x1="280" y1="65" x2="325" y2="65" stroke="#ee0000" strokeWidth="1.5" markerEnd="url(#arrowAnsArch)"/>
    <line x1="280" y1="85" x2="325" y2="85" stroke="#ee0000" strokeWidth="1.5" markerEnd="url(#arrowAnsArch)"/>
    <rect x="330" y="35" width="100" height="20" rx="4" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="380" y="49" textAnchor="middle" fill="#4ade80" fontSize="8">Web Server</text>
    <rect x="330" y="55" width="100" height="20" rx="4" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="380" y="69" textAnchor="middle" fill="#4ade80" fontSize="8">DB Server</text>
    <rect x="330" y="75" width="100" height="20" rx="4" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="380" y="89" textAnchor="middle" fill="#4ade80" fontSize="8">App Server</text>
    <rect x="470" y="40" width="200" height="55" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="570" y="58" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Key Properties</text>
    <text x="570" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">Agentless • Idempotent</text>
    <text x="570" y="86" textAnchor="middle" fill="#94a3b8" fontSize="8">YAML-based • Push model</text>
    <rect x="20" y="105" width="110" height="30" rx="4" fill="#166534" stroke="#22c55e" strokeWidth="1"/>
    <text x="75" y="124" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">No agents needed</text>
    <text x="200" y="124" fill="#94a3b8" fontSize="9">Modules execute on remote hosts, then are removed — nothing persists</text>
  </svg>
)

const PlaybookFlowDiagram = () => (
  <svg viewBox="0 0 700 150" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="pbFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#15803d" stopOpacity="0.05"/>
      </linearGradient>
      <marker id="arrowPbFlow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#22c55e"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="140" rx="10" fill="url(#pbFlowGrad)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">Playbook Execution Flow</text>
    <rect x="20" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#ee0000" strokeWidth="1.5"/>
    <text x="70" y="60" textAnchor="middle" fill="#ff6666" fontSize="9" fontWeight="bold">Playbook</text>
    <text x="70" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">.yml file</text>
    <line x1="120" y1="65" x2="155" y2="65" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowPbFlow)"/>
    <rect x="160" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="210" y="60" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Inventory</text>
    <text x="210" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">hosts / groups</text>
    <line x1="260" y1="65" x2="295" y2="65" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowPbFlow)"/>
    <rect x="300" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="350" y="60" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Tasks</text>
    <text x="350" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">modules called</text>
    <line x1="400" y1="65" x2="435" y2="65" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowPbFlow)"/>
    <rect x="440" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="490" y="60" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Handlers</text>
    <text x="490" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">notify triggers</text>
    <line x1="540" y1="65" x2="575" y2="65" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowPbFlow)"/>
    <rect x="580" y="40" width="90" height="50" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="625" y="60" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Result</text>
    <text x="625" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">ok/changed/failed</text>
    <text x="350" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Each task runs a module → gathers facts → reports status → idempotent by design</text>
  </svg>
)

const RoleStructureDiagram = () => (
  <svg viewBox="0 0 700 170" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="roleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="160" rx="10" fill="url(#roleGrad)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">Ansible Role Directory Structure</text>
    <rect x="280" y="35" width="140" height="24" rx="4" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="350" y="51" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">roles/my_role/</text>
    <rect x="20" y="75" width="90" height="35" rx="4" fill="#374151" stroke="#ee0000" strokeWidth="1"/>
    <text x="65" y="90" textAnchor="middle" fill="#ff6666" fontSize="8" fontWeight="bold">tasks/</text>
    <text x="65" y="102" textAnchor="middle" fill="#94a3b8" fontSize="7">main.yml</text>
    <rect x="120" y="75" width="90" height="35" rx="4" fill="#374151" stroke="#22c55e" strokeWidth="1"/>
    <text x="165" y="90" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="bold">handlers/</text>
    <text x="165" y="102" textAnchor="middle" fill="#94a3b8" fontSize="7">main.yml</text>
    <rect x="220" y="75" width="90" height="35" rx="4" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="265" y="90" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">templates/</text>
    <text x="265" y="102" textAnchor="middle" fill="#94a3b8" fontSize="7">*.j2 files</text>
    <rect x="320" y="75" width="90" height="35" rx="4" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="365" y="90" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">vars/</text>
    <text x="365" y="102" textAnchor="middle" fill="#94a3b8" fontSize="7">main.yml</text>
    <rect x="420" y="75" width="90" height="35" rx="4" fill="#374151" stroke="#ec4899" strokeWidth="1"/>
    <text x="465" y="90" textAnchor="middle" fill="#f472b6" fontSize="8" fontWeight="bold">defaults/</text>
    <text x="465" y="102" textAnchor="middle" fill="#94a3b8" fontSize="7">main.yml</text>
    <rect x="520" y="75" width="80" height="35" rx="4" fill="#374151" stroke="#06b6d4" strokeWidth="1"/>
    <text x="560" y="90" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="bold">files/</text>
    <text x="560" y="102" textAnchor="middle" fill="#94a3b8" fontSize="7">static files</text>
    <rect x="610" y="75" width="70" height="35" rx="4" fill="#374151" stroke="#94a3b8" strokeWidth="1"/>
    <text x="645" y="90" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">meta/</text>
    <text x="645" y="102" textAnchor="middle" fill="#94a3b8" fontSize="7">dependencies</text>
    <text x="350" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Roles encapsulate reusable automation — share via Ansible Galaxy or private repos</text>
    <line x1="350" y1="59" x2="65" y2="75" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="59" x2="165" y2="75" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="59" x2="265" y2="75" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="59" x2="365" y2="75" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="59" x2="465" y2="75" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="59" x2="560" y2="75" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="59" x2="645" y2="75" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3"/>
  </svg>
)

const InventoryDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="invGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#invGrad)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">Inventory — Static &amp; Dynamic Sources</text>
    <rect x="20" y="40" width="200" height="100" rx="6" fill="#1e3a5f" stroke="#ee0000" strokeWidth="1.5"/>
    <text x="120" y="58" textAnchor="middle" fill="#ff6666" fontSize="10" fontWeight="bold">Static Inventory</text>
    <text x="120" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">[webservers]</text>
    <text x="120" y="88" textAnchor="middle" fill="#94a3b8" fontSize="8">web1.example.com</text>
    <text x="120" y="101" textAnchor="middle" fill="#94a3b8" fontSize="8">[databases]</text>
    <text x="120" y="114" textAnchor="middle" fill="#94a3b8" fontSize="8">db1.example.com</text>
    <text x="120" y="127" textAnchor="middle" fill="#94a3b8" fontSize="8">db2.example.com</text>
    <rect x="250" y="40" width="200" height="100" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="350" y="58" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Dynamic Inventory</text>
    <text x="350" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">AWS EC2 plugin</text>
    <text x="350" y="88" textAnchor="middle" fill="#94a3b8" fontSize="8">Azure RM plugin</text>
    <text x="350" y="101" textAnchor="middle" fill="#94a3b8" fontSize="8">GCP plugin</text>
    <text x="350" y="114" textAnchor="middle" fill="#94a3b8" fontSize="8">Kubernetes plugin</text>
    <text x="350" y="127" textAnchor="middle" fill="#94a3b8" fontSize="8">Custom scripts</text>
    <rect x="480" y="40" width="190" height="100" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="575" y="58" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Host Variables</text>
    <text x="575" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">host_vars/web1.yml</text>
    <text x="575" y="88" textAnchor="middle" fill="#94a3b8" fontSize="8">group_vars/webservers.yml</text>
    <text x="575" y="101" textAnchor="middle" fill="#94a3b8" fontSize="8">group_vars/all.yml</text>
    <text x="575" y="114" textAnchor="middle" fill="#94a3b8" fontSize="8">Vault-encrypted secrets</text>
  </svg>
)

const VaultDiagram = () => (
  <svg viewBox="0 0 700 140" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="vaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowVault" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="130" rx="10" fill="url(#vaultGrad)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">Ansible Vault — Secrets Management</text>
    <rect x="20" y="40" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="85" y="60" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Plaintext Secrets</text>
    <text x="85" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">passwords, keys, tokens</text>
    <line x1="150" y1="65" x2="195" y2="65" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowVault)"/>
    <rect x="200" y="40" width="150" height="50" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="275" y="58" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">ansible-vault</text>
    <text x="275" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">AES-256 encryption</text>
    <text x="275" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7">encrypt / decrypt / edit</text>
    <line x1="350" y1="65" x2="395" y2="65" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowVault)"/>
    <rect x="400" y="40" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="465" y="60" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Encrypted File</text>
    <text x="465" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">safe for version control</text>
    <line x1="530" y1="65" x2="575" y2="65" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowVault)"/>
    <rect x="580" y="40" width="90" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="625" y="60" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Playbook</text>
    <text x="625" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">auto-decrypts</text>
    <text x="350" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Use --vault-password-file or --ask-vault-pass at runtime to decrypt</text>
  </svg>
)

const AWXDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="awxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowAwx" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#06b6d4"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#awxGrad)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">AWX / Ansible Tower — Enterprise Automation</text>
    <rect x="20" y="40" width="120" height="55" rx="6" fill="#1e3a5f" stroke="#ee0000" strokeWidth="1.5"/>
    <text x="80" y="60" textAnchor="middle" fill="#ff6666" fontSize="9" fontWeight="bold">Git Repo</text>
    <text x="80" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">playbooks, roles</text>
    <text x="80" y="87" textAnchor="middle" fill="#94a3b8" fontSize="7">inventories</text>
    <line x1="140" y1="67" x2="185" y2="67" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowAwx)"/>
    <rect x="190" y="35" width="160" height="75" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="270" y="55" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">AWX / Tower</text>
    <text x="270" y="72" textAnchor="middle" fill="#94a3b8" fontSize="8">Web UI &amp; REST API</text>
    <text x="270" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">RBAC, Scheduling</text>
    <text x="270" y="98" textAnchor="middle" fill="#94a3b8" fontSize="8">Credentials, Logging</text>
    <line x1="350" y1="67" x2="395" y2="67" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowAwx)"/>
    <rect x="400" y="40" width="130" height="55" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="465" y="60" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Job Templates</text>
    <text x="465" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Workflows, Surveys</text>
    <text x="465" y="87" textAnchor="middle" fill="#94a3b8" fontSize="7">Notifications</text>
    <line x1="530" y1="67" x2="565" y2="67" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowAwx)"/>
    <rect x="570" y="40" width="100" height="55" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="620" y="60" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Execution</text>
    <text x="620" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Execution Env</text>
    <text x="620" y="87" textAnchor="middle" fill="#94a3b8" fontSize="7">Container-based</text>
    <text x="350" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">AWX provides centralized management, audit trails, and RBAC for team-based Ansible automation</text>
  </svg>
)

const SyntaxHighlighter = ({ code }) => (
  <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.85rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace" }}>
    {code}
  </pre>
)

function Ansible({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'ansible-architecture',
      name: 'Architecture & Components',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Ansible is an agentless automation tool that uses SSH (Linux) or WinRM (Windows) to manage infrastructure. The control node pushes configurations to managed nodes without requiring any agent installation. It follows a push-based, idempotent model using YAML for configuration.',
      diagram: AnsibleArchitectureDiagram,
      details: [
        {
          name: 'How Ansible Works',
          explanation: 'Ansible operates on a push model from a single control node. When you run a playbook, Ansible connects to target hosts via SSH, copies the necessary module code, executes it remotely, and then removes the temporary files. No daemon or agent runs on managed nodes. The control node needs Python and Ansible installed; managed nodes only need Python and SSH. This agentless architecture reduces maintenance overhead and security surface area.',
          codeExample: `# Install Ansible (control node only)
pip install ansible
# or on Ubuntu/Debian:
sudo apt install ansible

# Verify installation
ansible --version
# ansible [core 2.16.x]
#   config file = /etc/ansible/ansible.cfg
#   python version = 3.11.x

# Test connectivity to all hosts
ansible all -m ping -i inventory.ini

# Run ad-hoc command on all web servers
ansible webservers -m shell -a "uptime" -i inventory.ini

# Run ad-hoc command with become (sudo)
ansible databases -m apt -a "name=postgresql state=present" \\
  --become -i inventory.ini

# Key components:
# - Control Node:  Where Ansible runs (your laptop, CI server)
# - Managed Nodes: Target servers (no agent needed)
# - Inventory:     List of managed nodes (static or dynamic)
# - Modules:       Units of work (apt, copy, service, template, etc.)
# - Playbooks:     YAML files defining automation tasks
# - Plugins:       Extend Ansible (connection, callback, lookup, filter)
# - Collections:   Distribution format for roles, modules, plugins`
        },
        {
          name: 'Configuration',
          explanation: 'Ansible configuration is controlled by ansible.cfg, which can be placed in the project directory, home directory, or /etc/ansible/. Settings include inventory path, remote user, SSH options, privilege escalation, and timeout values. Configuration precedence: ANSIBLE_* environment variables > ./ansible.cfg > ~/.ansible.cfg > /etc/ansible/ansible.cfg.',
          codeExample: `# ansible.cfg — project-level configuration
[defaults]
inventory = ./inventory
remote_user = deploy
host_key_checking = False
timeout = 30
forks = 20                    # Parallel host connections
retry_files_enabled = False
stdout_callback = yaml        # Readable output format
collections_paths = ./collections

[privilege_escalation]
become = True
become_method = sudo
become_user = root
become_ask_pass = False

[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=60s
pipelining = True             # Reduces SSH operations
control_path_dir = /tmp/.ansible/cp

# Environment variable overrides
# export ANSIBLE_CONFIG=./ansible.cfg
# export ANSIBLE_INVENTORY=./inventory
# export ANSIBLE_REMOTE_USER=deploy
# export ANSIBLE_BECOME=True

# Check effective configuration
ansible-config dump --only-changed

# List all configuration options
ansible-config list`
        },
        {
          name: 'Connection Types',
          explanation: 'Ansible supports multiple connection plugins beyond SSH. The "local" connection runs on the control node itself, "docker" connects to Docker containers, and "winrm" manages Windows hosts. For network devices, plugins like "network_cli" and "httpapi" handle vendor-specific protocols. Connection-level variables can be set per host or group in the inventory.',
          codeExample: `# Connection types in inventory
[linux_servers]
web1 ansible_host=10.0.1.10 ansible_connection=ssh
web2 ansible_host=10.0.1.11 ansible_connection=ssh

[windows_servers]
win1 ansible_host=10.0.2.10 ansible_connection=winrm
win2 ansible_host=10.0.2.11 ansible_connection=winrm

[windows_servers:vars]
ansible_user=Administrator
ansible_password="{{ vault_win_password }}"
ansible_winrm_transport=ntlm
ansible_port=5986
ansible_winrm_server_cert_validation=ignore

[local]
localhost ansible_connection=local

[containers]
app_container ansible_connection=docker

[network_devices]
switch1 ansible_connection=network_cli
  ansible_network_os=ios
  ansible_user=admin

# Playbook using different connection per play
---
- name: Configure Linux servers
  hosts: linux_servers
  tasks:
    - name: Install nginx
      apt: name=nginx state=present

- name: Configure Windows servers
  hosts: windows_servers
  tasks:
    - name: Install IIS
      win_feature: name=Web-Server state=present`
        }
      ]
    },
    {
      id: 'ansible-inventory',
      name: 'Inventory & Host Management',
      icon: '📋',
      color: '#22c55e',
      description: 'Inventory defines the managed hosts and groups. Static inventory uses INI or YAML files, while dynamic inventory scripts or plugins query cloud providers (AWS, Azure, GCP) at runtime. Groups enable running tasks on subsets of hosts, and group/host variables customize behavior per environment.',
      diagram: InventoryDiagram,
      details: [
        {
          name: 'Static Inventory',
          explanation: 'Static inventory files define hosts and groups in INI or YAML format. Hosts can belong to multiple groups, and groups can be nested using the :children suffix. Variables can be set per host or per group. The "all" group implicitly contains every host. Best practice is to keep inventory files per environment (dev, staging, production) with group_vars and host_vars directories.',
          codeExample: `# inventory/production.ini — INI format
[webservers]
web1.example.com ansible_port=2222
web2.example.com
web3.example.com

[databases]
db1.example.com ansible_user=dbadmin
db2.example.com ansible_user=dbadmin

[loadbalancers]
lb1.example.com

[monitoring]
prometheus.example.com
grafana.example.com

# Group of groups
[backend:children]
webservers
databases

[infrastructure:children]
loadbalancers
monitoring

# Group variables
[webservers:vars]
http_port=8080
app_env=production

[databases:vars]
db_port=5432
backup_enabled=true

# --- YAML format (inventory/production.yml) ---
all:
  children:
    webservers:
      hosts:
        web1.example.com:
          http_port: 8080
        web2.example.com:
          http_port: 8080
      vars:
        app_env: production
    databases:
      hosts:
        db1.example.com:
        db2.example.com:
      vars:
        db_port: 5432`
        },
        {
          name: 'Dynamic Inventory',
          explanation: 'Dynamic inventory plugins query external sources (cloud APIs, CMDBs, container orchestrators) to build the host list at runtime. This eliminates manual inventory maintenance for cloud environments where servers are frequently created and destroyed. AWS EC2, Azure, GCP, and Kubernetes plugins are built-in. Custom scripts return JSON in a specific format.',
          codeExample: `# aws_ec2.yml — AWS dynamic inventory plugin
plugin: amazon.aws.aws_ec2
regions:
  - us-east-1
  - us-west-2

# Filter instances
filters:
  tag:Environment: production
  instance-state-name: running

# Group by tags and properties
keyed_groups:
  - key: tags.Role
    prefix: role
  - key: placement.region
    prefix: region
  - key: instance_type
    prefix: type

# Set host variables from instance attributes
compose:
  ansible_host: public_ip_address
  ansible_user: "'ec2-user'"
  instance_id: instance_id

hostnames:
  - tag:Name
  - private-ip-address

# Use it:
# ansible-inventory -i aws_ec2.yml --graph
# ansible -i aws_ec2.yml role_webserver -m ping

# --- Azure dynamic inventory ---
# azure_rm.yml
plugin: azure.azcollection.azure_rm
auth_source: auto
include_vm_resource_groups:
  - production-rg
keyed_groups:
  - key: tags.role | default('untagged')
    prefix: role

# --- Custom script (must return JSON) ---
# inventory_script.py --list
# {
#   "webservers": { "hosts": ["web1", "web2"] },
#   "databases":  { "hosts": ["db1"] },
#   "_meta": {
#     "hostvars": {
#       "web1": { "http_port": 8080 }
#     }
#   }
# }`
        },
        {
          name: 'Host & Group Variables',
          explanation: 'Variables can be defined at multiple levels: host_vars (per-host), group_vars (per-group), inventory inline, playbook vars, role defaults, and command line. Ansible merges variables with a defined precedence order (22 levels). Best practice is to use group_vars/all.yml for global defaults, group_vars/<group>.yml for group-specific settings, and host_vars/<host>.yml for host overrides.',
          codeExample: `# Directory structure for variables
inventory/
  production/
    hosts.ini
    group_vars/
      all.yml          # Applied to all hosts
      webservers.yml   # Applied to webservers group
      databases.yml    # Applied to databases group
    host_vars/
      web1.example.com.yml  # Only for this host

# group_vars/all.yml — global defaults
---
ntp_server: time.example.com
dns_servers:
  - 10.0.0.2
  - 10.0.0.3
deploy_user: deploy
log_level: info

# group_vars/webservers.yml
---
http_port: 8080
max_connections: 1000
ssl_enabled: true
app_version: "2.5.0"

# host_vars/web1.example.com.yml — host override
---
max_connections: 2000   # This host gets more capacity
debug_mode: true

# Variable precedence (lowest to highest):
# 1.  role defaults (defaults/main.yml)
# 2.  inventory group_vars/all
# 3.  inventory group_vars/*
# 4.  inventory host_vars/*
# 5.  playbook group_vars/*
# 6.  playbook host_vars/*
# 7.  host facts / cached facts
# 8.  play vars
# 9.  play vars_prompt
# 10. play vars_files
# 11. role vars (vars/main.yml)
# 12. block vars
# 13. task vars
# 14. include_vars
# 15. set_facts / registered vars
# 16. role params
# 17. include params
# 18. extra vars (-e) — ALWAYS WIN`
        },
        {
          name: 'Host Patterns',
          explanation: 'Host patterns specify which hosts a play targets. You can use group names, wildcards, intersections (&), unions (:), and exclusions (!). Patterns support regex with the ~ prefix. Limiting execution to specific hosts at runtime with --limit is useful for testing or targeted deployments.',
          codeExample: `# Host pattern examples in playbooks and CLI

# Target a single host
ansible web1.example.com -m ping

# Target a group
ansible webservers -m ping

# Target all hosts
ansible all -m ping

# Union — hosts in EITHER group
ansible 'webservers:databases' -m ping

# Intersection — hosts in BOTH groups
ansible 'webservers:&production' -m ping

# Exclusion — webservers but NOT loadbalancers
ansible 'webservers:!loadbalancers' -m ping

# Wildcard
ansible '*.example.com' -m ping

# Regex (prefix with ~)
ansible '~web[0-9]+\\.example\\.com' -m ping

# Combine patterns
ansible 'webservers:&production:!maintenance' -m ping

# In playbook:
---
- name: Deploy to staging web servers
  hosts: webservers:&staging
  tasks:
    - name: Deploy application
      copy:
        src: app.jar
        dest: /opt/app/app.jar

# Runtime limit
ansible-playbook deploy.yml --limit web1.example.com
ansible-playbook deploy.yml --limit 'webservers:&us-east'

# List matching hosts (dry run)
ansible-playbook deploy.yml --list-hosts`
        }
      ]
    },
    {
      id: 'ansible-playbooks',
      name: 'Playbooks & Tasks',
      icon: '📝',
      color: '#f59e0b',
      description: 'Playbooks are YAML files that define ordered automation workflows. A playbook contains plays, each targeting a set of hosts and listing tasks to execute. Tasks invoke modules (apt, copy, service, template) and support conditionals, loops, handlers, tags, and error handling for flexible automation.',
      diagram: PlaybookFlowDiagram,
      details: [
        {
          name: 'Playbook Structure',
          explanation: 'A playbook is a list of plays. Each play maps a group of hosts to tasks. Tasks run in order and call Ansible modules. The play specifies connection details, privilege escalation, and variables. Tasks can have names (for readability), register output, use when conditions, and notify handlers. Multiple plays in one playbook can target different host groups.',
          codeExample: `---
# deploy.yml — Multi-play playbook
- name: Configure web servers
  hosts: webservers
  become: true
  vars:
    app_port: 8080
    app_user: appuser

  pre_tasks:
    - name: Update apt cache
      apt:
        update_cache: yes
        cache_valid_time: 3600

  tasks:
    - name: Install required packages
      apt:
        name:
          - nginx
          - python3
          - python3-pip
        state: present

    - name: Create application user
      user:
        name: "{{ app_user }}"
        shell: /bin/bash
        system: yes

    - name: Deploy application config
      template:
        src: templates/app.conf.j2
        dest: /etc/app/config.yml
        owner: "{{ app_user }}"
        mode: '0644'
      notify: restart app

    - name: Ensure app is running
      systemd:
        name: myapp
        state: started
        enabled: yes

  handlers:
    - name: restart app
      systemd:
        name: myapp
        state: restarted

  post_tasks:
    - name: Verify app health
      uri:
        url: "http://localhost:{{ app_port }}/health"
        status_code: 200
      retries: 5
      delay: 3

- name: Configure database servers
  hosts: databases
  become: true
  tasks:
    - name: Install PostgreSQL
      apt:
        name: postgresql
        state: present`
        },
        {
          name: 'Conditionals & Loops',
          explanation: 'Tasks can be conditionally executed with "when" clauses that evaluate Jinja2 expressions. Loops iterate over lists, dictionaries, or ranges using "loop" (or the older "with_*" syntax). You can combine conditionals with loops, register task output and use it in subsequent conditions, and use block/rescue/always for error handling similar to try/catch/finally.',
          codeExample: `---
- name: Conditional and loop examples
  hosts: all
  become: true
  vars:
    packages:
      - nginx
      - postgresql
      - redis
    deploy_env: production

  tasks:
    # Conditional based on variable
    - name: Install debug tools (non-production only)
      apt:
        name: strace
        state: present
      when: deploy_env != 'production'

    # Conditional based on facts
    - name: Install on Debian-based systems
      apt:
        name: "{{ item }}"
        state: present
      loop: "{{ packages }}"
      when: ansible_os_family == 'Debian'

    # Conditional based on registered variable
    - name: Check if config exists
      stat:
        path: /etc/app/config.yml
      register: config_file

    - name: Create default config
      template:
        src: default_config.j2
        dest: /etc/app/config.yml
      when: not config_file.stat.exists

    # Loop with index
    - name: Create multiple users
      user:
        name: "{{ item.name }}"
        uid: "{{ item.uid }}"
        groups: "{{ item.groups }}"
      loop:
        - { name: 'alice', uid: 1001, groups: 'admin' }
        - { name: 'bob',   uid: 1002, groups: 'developers' }
        - { name: 'carol', uid: 1003, groups: 'developers' }

    # Loop with dict
    - name: Configure sysctl parameters
      sysctl:
        name: "{{ item.key }}"
        value: "{{ item.value }}"
        state: present
      loop: "{{ sysctl_params | dict2items }}"
      vars:
        sysctl_params:
          net.core.somaxconn: 65535
          vm.swappiness: 10

    # Block with error handling
    - name: Deploy with rollback
      block:
        - name: Deploy new version
          copy:
            src: app-v2.jar
            dest: /opt/app/app.jar
        - name: Restart application
          systemd:
            name: myapp
            state: restarted
        - name: Health check
          uri:
            url: http://localhost:8080/health
          retries: 3
          delay: 5
      rescue:
        - name: Rollback to previous version
          copy:
            src: app-v1.jar
            dest: /opt/app/app.jar
        - name: Restart with old version
          systemd:
            name: myapp
            state: restarted
      always:
        - name: Log deployment result
          debug:
            msg: "Deployment completed (check for rescue)"
`
        },
        {
          name: 'Tags & Handlers',
          explanation: 'Tags let you run specific subsets of tasks from a playbook. Handlers are tasks triggered by "notify" and run only once at the end of a play, even if notified multiple times. This is ideal for restarting services only when configuration actually changes. Use "flush_handlers" to run handlers mid-play if needed.',
          codeExample: `---
- name: Full stack deployment
  hosts: webservers
  become: true

  tasks:
    # Tagged tasks — run selectively
    - name: Install system packages
      apt:
        name: "{{ item }}"
        state: present
      loop:
        - nginx
        - certbot
      tags: [packages, setup]

    - name: Deploy nginx config
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
        validate: nginx -t -c %s
      notify:
        - reload nginx
        - update monitoring
      tags: [nginx, config]

    - name: Deploy SSL certificate
      copy:
        src: "{{ ssl_cert_path }}"
        dest: /etc/ssl/certs/app.crt
      notify: reload nginx
      tags: [ssl, config]

    - name: Deploy application
      copy:
        src: app.jar
        dest: /opt/app/app.jar
      notify: restart app
      tags: [deploy, app]

    # Force handlers to run NOW (before continuing)
    - meta: flush_handlers
      tags: always

    - name: Run smoke tests
      uri:
        url: https://localhost/health
        validate_certs: no
      tags: [test, deploy]

  handlers:
    - name: reload nginx
      systemd:
        name: nginx
        state: reloaded

    - name: restart app
      systemd:
        name: myapp
        state: restarted

    - name: update monitoring
      uri:
        url: http://monitoring/api/deploy
        method: POST
        body_format: json
        body:
          service: webapp
          action: deployed

# Run only specific tags:
# ansible-playbook deploy.yml --tags deploy
# ansible-playbook deploy.yml --tags "nginx,ssl"
# ansible-playbook deploy.yml --skip-tags test

# Special tags:
# always — runs regardless of tag filter
# never  — only runs if explicitly requested`
        },
        {
          name: 'Delegation & Serial',
          explanation: 'Delegation runs a task on a different host than the play target. This is useful for load balancer management, database migrations, or API calls to external services. Serial controls how many hosts are processed at once (rolling updates). Max_fail_percentage stops the play if too many hosts fail, preventing cascading failures.',
          codeExample: `---
# Rolling deployment with delegation
- name: Rolling update with zero downtime
  hosts: webservers
  become: true
  serial: 2                   # Process 2 hosts at a time
  max_fail_percentage: 25     # Stop if >25% of hosts fail

  pre_tasks:
    # Remove host from load balancer BEFORE deploying
    - name: Disable in load balancer
      uri:
        url: "http://lb.example.com/api/backends/{{ inventory_hostname }}"
        method: DELETE
      delegate_to: localhost   # Run on control node

    - name: Wait for connections to drain
      wait_for:
        timeout: 30

  tasks:
    - name: Deploy new version
      copy:
        src: app-v2.jar
        dest: /opt/app/app.jar

    - name: Restart application
      systemd:
        name: myapp
        state: restarted

    - name: Wait for app to be healthy
      uri:
        url: "http://{{ inventory_hostname }}:8080/health"
        status_code: 200
      retries: 10
      delay: 5
      delegate_to: localhost

  post_tasks:
    # Re-add to load balancer AFTER healthy
    - name: Enable in load balancer
      uri:
        url: "http://lb.example.com/api/backends"
        method: POST
        body_format: json
        body:
          host: "{{ inventory_hostname }}"
          port: 8080
      delegate_to: localhost

# Serial can also be a percentage or list
# serial: "30%"         — 30% of hosts at a time
# serial: [1, 3, 5]     — first 1, then 3, then 5 at a time
# This is a "canary deployment" pattern`
        }
      ]
    },
    {
      id: 'ansible-roles',
      name: 'Roles & Collections',
      icon: '📦',
      color: '#8b5cf6',
      description: 'Roles provide a standardized directory structure for organizing tasks, handlers, variables, templates, and files into reusable units. Collections bundle roles, modules, and plugins for distribution via Ansible Galaxy. Roles promote code reuse, separation of concerns, and team collaboration.',
      diagram: RoleStructureDiagram,
      details: [
        {
          name: 'Role Structure',
          explanation: 'A role is a directory with a predefined structure: tasks/ (main logic), handlers/ (triggered actions), templates/ (Jinja2 files), files/ (static files), vars/ (high-priority variables), defaults/ (low-priority defaults), and meta/ (role metadata and dependencies). Ansible automatically loads main.yml from each directory when the role is invoked. Use ansible-galaxy init to scaffold a new role.',
          codeExample: `# Create a new role scaffold
ansible-galaxy init roles/nginx

# Generated structure:
# roles/nginx/
#   README.md
#   defaults/main.yml    ← Default variables (lowest priority)
#   files/               ← Static files to copy
#   handlers/main.yml    ← Handler definitions
#   meta/main.yml        ← Role metadata & dependencies
#   tasks/main.yml       ← Main task list
#   templates/           ← Jinja2 templates
#   tests/               ← Test playbooks
#   vars/main.yml        ← Variables (high priority)

# --- roles/nginx/defaults/main.yml ---
nginx_port: 80
nginx_worker_processes: auto
nginx_worker_connections: 1024
nginx_ssl_enabled: false

# --- roles/nginx/tasks/main.yml ---
---
- name: Install nginx
  apt:
    name: nginx
    state: present
  notify: restart nginx

- name: Deploy nginx config
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/nginx.conf
    validate: nginx -t -c %s
  notify: reload nginx

- name: Deploy site config
  template:
    src: site.conf.j2
    dest: /etc/nginx/sites-available/default
  notify: reload nginx

- name: Enable nginx
  systemd:
    name: nginx
    state: started
    enabled: yes

# Include SSL tasks conditionally
- import_tasks: ssl.yml
  when: nginx_ssl_enabled

# --- roles/nginx/handlers/main.yml ---
---
- name: restart nginx
  systemd:
    name: nginx
    state: restarted

- name: reload nginx
  systemd:
    name: nginx
    state: reloaded

# --- roles/nginx/meta/main.yml ---
---
dependencies:
  - role: common
  - role: firewall
    vars:
      firewall_allowed_ports:
        - "{{ nginx_port }}"`
        },
        {
          name: 'Using Roles in Playbooks',
          explanation: 'Roles can be included in playbooks using the "roles" keyword, "include_role", or "import_role". The roles keyword runs roles before tasks. include_role is dynamic (supports loops and conditionals), while import_role is static (processed at parse time). Role parameters can be passed to override defaults.',
          codeExample: `---
# Method 1: roles keyword (classic)
- name: Configure web servers
  hosts: webservers
  become: true
  roles:
    - common                         # Simple role reference
    - role: nginx                    # Role with parameters
      vars:
        nginx_port: 8080
        nginx_ssl_enabled: true
    - role: app_deploy
      vars:
        app_version: "2.5.0"
      tags: deploy

# Method 2: include_role (dynamic, supports loops)
- name: Configure servers dynamically
  hosts: all
  become: true
  tasks:
    - name: Apply base configuration
      include_role:
        name: common

    - name: Apply role based on server type
      include_role:
        name: "{{ server_role }}"
      loop: "{{ assigned_roles }}"
      loop_control:
        loop_var: server_role

# Method 3: import_role (static, processed at parse time)
- name: Configure database
  hosts: databases
  become: true
  tasks:
    - import_role:
        name: postgresql
      vars:
        pg_version: 15

# Role execution order in a play:
# 1. pre_tasks
# 2. handlers (from pre_tasks)
# 3. roles
# 4. tasks
# 5. handlers (from roles + tasks)
# 6. post_tasks
# 7. handlers (from post_tasks)`
        },
        {
          name: 'Ansible Galaxy & Collections',
          explanation: 'Ansible Galaxy is the community hub for sharing roles and collections. Collections are the modern packaging format that bundles roles, modules, plugins, and documentation. Use requirements.yml to declare dependencies and ansible-galaxy to install them. Collections use a namespace.collection format (e.g., community.postgresql).',
          codeExample: `# Install a role from Galaxy
ansible-galaxy install geerlingguy.docker
ansible-galaxy install geerlingguy.postgresql

# Install a collection
ansible-galaxy collection install community.postgresql
ansible-galaxy collection install amazon.aws

# requirements.yml — declare all dependencies
---
roles:
  - name: geerlingguy.docker
    version: "6.1.0"
  - name: geerlingguy.nginx
  - name: company.internal_role
    src: git@github.com:company/ansible-role-internal.git
    scm: git
    version: main

collections:
  - name: community.postgresql
    version: ">=3.0.0"
  - name: amazon.aws
    version: "7.0.0"
  - name: community.docker
  - name: ansible.posix

# Install all dependencies
ansible-galaxy install -r requirements.yml
ansible-galaxy collection install -r requirements.yml

# Using collection modules in playbooks
---
- name: Manage PostgreSQL
  hosts: databases
  become: true
  collections:
    - community.postgresql

  tasks:
    # Short module name (with collections declared above)
    - name: Create database
      postgresql_db:
        name: myapp
        state: present

    # Fully qualified collection name (FQCN) — recommended
    - name: Create database user
      community.postgresql.postgresql_user:
        name: appuser
        password: "{{ vault_db_password }}"
        db: myapp
        priv: "ALL"

    - name: Create S3 bucket
      amazon.aws.s3_bucket:
        name: my-app-bucket
        region: us-east-1`
        }
      ]
    },
    {
      id: 'ansible-templates',
      name: 'Templates & Vault',
      icon: '🔐',
      color: '#f97316',
      description: 'Ansible uses Jinja2 for templating configuration files with dynamic values, conditionals, and loops. Ansible Vault encrypts sensitive data (passwords, keys, certificates) with AES-256, allowing secrets to be safely stored in version control and automatically decrypted during playbook runs.',
      diagram: VaultDiagram,
      details: [
        {
          name: 'Jinja2 Templates',
          explanation: 'Templates use Jinja2 syntax to generate configuration files with dynamic values from variables and facts. The template module renders .j2 files and deploys them to managed nodes. Templates support variable substitution ({{ }}), conditionals ({% if %}), loops ({% for %}), and filters (|default, |join, |upper). This is the primary way to generate environment-specific configurations.',
          codeExample: `# templates/nginx.conf.j2
worker_processes {{ nginx_worker_processes | default('auto') }};

events {
    worker_connections {{ nginx_worker_connections | default(1024) }};
}

http {
    # Upstream — generated from inventory group
    upstream app_backend {
{% for host in groups['webservers'] %}
        server {{ hostvars[host]['ansible_host'] }}:{{ app_port | default(8080) }};
{% endfor %}
    }

    server {
        listen {{ nginx_port | default(80) }};
        server_name {{ server_name }};

{% if nginx_ssl_enabled | default(false) %}
        listen 443 ssl;
        ssl_certificate /etc/ssl/certs/{{ ssl_cert_name }};
        ssl_certificate_key /etc/ssl/private/{{ ssl_key_name }};
{% endif %}

        location / {
            proxy_pass http://app_backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

{% for location in extra_locations | default([]) %}
        location {{ location.path }} {
            {{ location.config }}
        }
{% endfor %}
    }
}

# --- templates/env.j2 ---
# Application environment file
APP_ENV={{ deploy_env }}
DB_HOST={{ db_host }}
DB_PORT={{ db_port | default(5432) }}
DB_NAME={{ db_name }}
DB_USER={{ db_user }}
DB_PASS={{ vault_db_password }}
REDIS_URL=redis://{{ redis_host }}:{{ redis_port | default(6379) }}
LOG_LEVEL={{ log_level | default('info') | upper }}
SECRET_KEY={{ vault_secret_key }}

# Common Jinja2 filters:
# {{ var | default('fallback') }}
# {{ list | join(', ') }}
# {{ string | upper / lower / capitalize }}
# {{ path | basename / dirname }}
# {{ dict | to_json / to_yaml }}
# {{ number | int / float }}
# {{ list | select('match', 'web.*') | list }}`
        },
        {
          name: 'Ansible Vault',
          explanation: 'Ansible Vault encrypts sensitive data using AES-256 encryption. You can encrypt entire files or individual variables (inline vault). Encrypted files look like random text and are safe to commit to version control. At runtime, provide the vault password via --ask-vault-pass, --vault-password-file, or ANSIBLE_VAULT_PASSWORD_FILE environment variable. Multiple vault IDs support different passwords for different environments.',
          codeExample: `# Encrypt an entire file
ansible-vault encrypt group_vars/production/secrets.yml

# Encrypted file looks like:
# $ANSIBLE_VAULT;1.1;AES256
# 61626364656667...

# Decrypt a file
ansible-vault decrypt group_vars/production/secrets.yml

# Edit encrypted file in-place
ansible-vault edit group_vars/production/secrets.yml

# View encrypted file without decrypting
ansible-vault view group_vars/production/secrets.yml

# Re-key (change password)
ansible-vault rekey group_vars/production/secrets.yml

# Encrypt a single string (inline vault)
ansible-vault encrypt_string 'SuperSecretPassword' --name 'db_password'
# Output:
# db_password: !vault |
#   $ANSIBLE_VAULT;1.1;AES256
#   61626364656667...

# Use inline vault in variables file
# group_vars/production/vars.yml
---
db_user: appuser
db_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  326536323839353166303561...
app_secret_key: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  653264323932663038363134...

# Run playbook with vault
ansible-playbook deploy.yml --ask-vault-pass
ansible-playbook deploy.yml --vault-password-file ~/.vault_pass

# Multiple vault IDs (different passwords per env)
ansible-playbook deploy.yml \\
  --vault-id dev@~/.vault_dev \\
  --vault-id prod@~/.vault_prod

# Encrypt with a specific vault ID
ansible-vault encrypt --vault-id prod@prompt secrets.yml`
        },
        {
          name: 'Facts & Registered Variables',
          explanation: 'Ansible automatically gathers system facts (OS, IP, memory, disk) from managed nodes via the setup module. Facts are available as variables in playbooks and templates. You can also register task output as variables and use custom facts. Fact caching improves performance for large inventories by storing gathered facts between runs.',
          codeExample: `---
- name: Facts and registered variables
  hosts: all
  gather_facts: true   # Default: true

  tasks:
    # Access gathered facts
    - name: Show OS information
      debug:
        msg: >
          OS: {{ ansible_distribution }} {{ ansible_distribution_version }}
          Arch: {{ ansible_architecture }}
          Kernel: {{ ansible_kernel }}
          RAM: {{ ansible_memtotal_mb }}MB
          CPUs: {{ ansible_processor_vcpus }}
          IP: {{ ansible_default_ipv4.address }}

    # Conditional on facts
    - name: Install on Ubuntu
      apt:
        name: nginx
      when: ansible_distribution == 'Ubuntu'

    - name: Install on CentOS
      yum:
        name: nginx
      when: ansible_distribution == 'CentOS'

    # Register task output
    - name: Check disk usage
      shell: df -h / | tail -1 | awk '{print $5}' | tr -d '%'
      register: disk_usage
      changed_when: false

    - name: Warn if disk is full
      debug:
        msg: "WARNING: Disk usage is {{ disk_usage.stdout }}%"
      when: disk_usage.stdout | int > 80

    # Custom facts (placed on managed nodes)
    # /etc/ansible/facts.d/app.fact (JSON or INI)
    # { "version": "2.5.0", "environment": "production" }
    # Access as: ansible_local.app.version

    # Set facts dynamically
    - name: Set computed fact
      set_fact:
        total_app_memory: "{{ (ansible_memtotal_mb * 0.7) | int }}m"

    - name: Use computed fact
      template:
        src: jvm_opts.j2
        dest: /etc/app/jvm.opts
      # Template uses {{ total_app_memory }}

# Fact caching in ansible.cfg
# [defaults]
# gathering = smart
# fact_caching = jsonfile
# fact_caching_connection = /tmp/ansible_facts
# fact_caching_timeout = 86400`
        }
      ]
    },
    {
      id: 'ansible-cicd',
      name: 'CI/CD & AWX Integration',
      icon: '🔄',
      color: '#06b6d4',
      description: 'Ansible integrates with CI/CD pipelines (Jenkins, GitLab CI, GitHub Actions) for automated infrastructure provisioning and application deployment. AWX (open-source) and Ansible Tower (commercial) provide a web UI, REST API, RBAC, scheduling, and audit logging for enterprise Ansible automation.',
      diagram: AWXDiagram,
      details: [
        {
          name: 'CI/CD Pipeline Integration',
          explanation: 'Ansible playbooks can be triggered from any CI/CD system as a deployment step. Common patterns: use a Docker image with Ansible pre-installed, store vault passwords as CI secrets, run ansible-lint for syntax validation, use --check for dry runs, and --diff to show changes. Environment-specific inventory files enable the same playbook to deploy to dev, staging, and production.',
          codeExample: `# .gitlab-ci.yml — GitLab CI integration
stages:
  - lint
  - test
  - deploy

lint:
  stage: lint
  image: cytopia/ansible-lint
  script:
    - ansible-lint playbooks/
    - ansible-playbook --syntax-check playbooks/deploy.yml

test:
  stage: test
  image: ansible/ansible-runner
  script:
    - ansible-playbook playbooks/deploy.yml \\
        --check --diff \\
        -i inventory/staging \\
        --vault-password-file {'<'}(echo "$VAULT_PASSWORD")

deploy_staging:
  stage: deploy
  image: ansible/ansible-runner
  script:
    - ansible-galaxy install -r requirements.yml
    - ansible-playbook playbooks/deploy.yml \\
        -i inventory/staging \\
        --vault-password-file {'<'}(echo "$VAULT_PASSWORD")
  environment: staging
  only:
    - develop

deploy_production:
  stage: deploy
  image: ansible/ansible-runner
  script:
    - ansible-galaxy install -r requirements.yml
    - ansible-playbook playbooks/deploy.yml \\
        -i inventory/production \\
        --vault-password-file {'<'}(echo "$VAULT_PASSWORD") \\
        -e "app_version=$CI_COMMIT_TAG"
  environment: production
  only:
    - tags
  when: manual   # Require manual approval

# --- GitHub Actions ---
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Ansible
        uses: dawidd6/action-ansible-playbook@v2
        with:
          playbook: playbooks/deploy.yml
          inventory: inventory/production
          vault_password: \${{ secrets.VAULT_PASSWORD }}
          options: --diff`
        },
        {
          name: 'AWX & Ansible Tower',
          explanation: 'AWX (open-source upstream of Ansible Tower) provides a web-based UI and REST API for managing Ansible automation at scale. Key features: RBAC for team access control, job templates for reusable playbook configurations, workflow templates for multi-step automation, scheduling for recurring jobs, credential management, and comprehensive audit logging. It runs playbooks in isolated execution environments (containers).',
          codeExample: `# AWX/Tower Key Concepts:

# 1. Organizations — top-level isolation
# 2. Teams — groups of users with shared permissions
# 3. Credentials — SSH keys, vault passwords, cloud tokens
# 4. Projects — Git repos containing playbooks
# 5. Inventories — host lists (static or synced from cloud)
# 6. Job Templates — playbook + inventory + credential
# 7. Workflow Templates — chain multiple job templates
# 8. Execution Environments — container images with dependencies

# --- REST API Examples ---

# List job templates
curl -s -u admin:password \\
  https://awx.example.com/api/v2/job_templates/ | jq '.results[].name'

# Launch a job template
curl -X POST -u admin:password \\
  -H "Content-Type: application/json" \\
  -d '{"extra_vars": {"app_version": "2.5.0"}}' \\
  https://awx.example.com/api/v2/job_templates/42/launch/

# Check job status
curl -s -u admin:password \\
  https://awx.example.com/api/v2/jobs/123/ | jq '.status'

# --- Workflow Template (YAML definition) ---
# Workflow: Deploy → Test → Promote
# Step 1: Deploy to staging
#   on_success → Step 2: Run integration tests
#     on_success → Step 3: Deploy to production
#     on_failure → Step 4: Rollback staging
#
# Workflows support:
# - Convergence (wait for multiple steps)
# - Branching (success/failure/always paths)
# - Survey prompts (user input at launch time)
# - Approval nodes (human gates)

# --- Install AWX with Docker Compose ---
# git clone https://github.com/ansible/awx.git
# cd awx
# make docker-compose-build
# make docker-compose

# --- AWX Operator for Kubernetes ---
# Install via operator:
# kubectl apply -f awx-operator.yml
# kubectl apply -f awx-instance.yml`
        },
        {
          name: 'Testing & Best Practices',
          explanation: 'Ansible automation should be tested using ansible-lint (style and best practices), Molecule (role testing with Docker containers), and --check mode (dry run). Best practices include: use FQCN for module names, always name tasks, use tags for selective execution, keep playbooks idempotent, use roles for reusability, encrypt secrets with Vault, and pin collection versions.',
          codeExample: `# --- ansible-lint ---
pip install ansible-lint
ansible-lint playbooks/

# Common lint rules:
# - no-changed-when: Tasks using shell/command need changed_when
# - yaml[truthy]: Use true/false not yes/no
# - name[missing]: All tasks should have names
# - fqcn[action-core]: Use fully qualified module names

# --- Molecule (role testing) ---
pip install molecule molecule-docker

# Initialize Molecule in a role
cd roles/nginx
molecule init scenario

# molecule/default/molecule.yml
---
driver:
  name: docker
platforms:
  - name: ubuntu
    image: ubuntu:22.04
    pre_build_image: true
  - name: debian
    image: debian:12
    pre_build_image: true
provisioner:
  name: ansible
verifier:
  name: ansible

# molecule/default/converge.yml
---
- name: Converge
  hosts: all
  become: true
  roles:
    - role: nginx

# molecule/default/verify.yml
---
- name: Verify
  hosts: all
  tasks:
    - name: Check nginx is running
      service_facts:
    - name: Assert nginx is running
      assert:
        that:
          - "'nginx' in services"
          - "services['nginx'].state == 'running'"

# Run Molecule tests
molecule test          # Full lifecycle
molecule converge      # Just apply role
molecule verify        # Just run verification
molecule destroy       # Clean up containers

# --- Best Practices Checklist ---
# 1. Use FQCN: ansible.builtin.apt not apt
# 2. Always name tasks descriptively
# 3. Use tags for selective runs
# 4. Pin versions in requirements.yml
# 5. Keep secrets in Vault, never in plain text
# 6. Use --check --diff before applying
# 7. Test with Molecule before deploying
# 8. Use group_vars/host_vars, not inline vars
# 9. Set changed_when/failed_when for shell tasks
# 10. Document roles with README.md`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedConceptIndex !== null) {
        setSelectedConceptIndex(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1a0a0a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <Breadcrumb
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          section={breadcrumb?.section}
          category={breadcrumb?.category}
          topic={breadcrumb?.topic || 'Ansible'}
          colors={breadcrumb?.colors || ANSIBLE_COLORS}
        />

        <CollapsibleSidebar
          items={concepts}
          selectedIndex={selectedConceptIndex}
          onSelect={(index) => { setSelectedConceptIndex(index); setSelectedDetailIndex(0) }}
          title="Topics"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={ANSIBLE_COLORS.primary}
        />

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          {onPrevious ? (
            <button onClick={onPrevious} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(238, 0, 0, 0.2)', border: '1px solid rgba(238, 0, 0, 0.3)', borderRadius: '0.5rem', color: '#ff6666', cursor: 'pointer', fontSize: '0.85rem' }}>
              ← {previousName || 'Previous'}
            </button>
          ) : <div />}
          {onNext ? (
            <button onClick={onNext} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(238, 0, 0, 0.2)', border: '1px solid rgba(238, 0, 0, 0.3)', borderRadius: '0.5rem', color: '#ff6666', cursor: 'pointer', fontSize: '0.85rem' }}>
              {nextName || 'Next'} →
            </button>
          ) : <div />}
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ee0000' }}>Ansible</h1>
        <p style={{ fontSize: '1.1rem', color: '#d1d5db', marginBottom: '2rem', lineHeight: '1.6' }}>
          Agentless automation platform for configuration management, application deployment, and infrastructure orchestration.
        </p>

        {/* Concept Cards Grid */}
        {selectedConceptIndex === null && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {concepts.map((concept, index) => (
              <button
                key={concept.id}
                onClick={() => { setSelectedConceptIndex(index); setSelectedDetailIndex(0) }}
                style={{
                  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${concept.color}40`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'left',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = concept.color
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 10px 30px ${concept.color}20`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${concept.color}40`
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '2rem' }}>{concept.icon}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: concept.color }}>{concept.name}</h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: '1.6' }}>{concept.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.75rem' }}>
                  {concept.details.map((d, i) => (
                    <span key={i} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: `${concept.color}15`, border: `1px solid ${concept.color}30`, borderRadius: '0.25rem', color: concept.color }}>{d.name}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Concept Detail View */}
        {selectedConcept && (
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '0.75rem', border: `2px solid ${selectedConcept.color}40`, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{selectedConcept.icon}</span>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: selectedConcept.color }}>{selectedConcept.name}</h2>
              </div>
              <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
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
              const DiagramComponent = selectedConcept.diagram
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
                    <div style={{ marginTop: '1rem' }}>
                      <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: '600' }}>Code Example</h4>
                      <div style={{
                        background: '#1e1e1e',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        border: '1px solid #333',
                        overflow: 'auto',
                        maxHeight: '400px'
                      }}>
                        <SyntaxHighlighter code={detail.codeExample} />
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

export default Ansible

import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

const UNIX_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(74, 222, 128, 0.1)',
  border: 'rgba(74, 222, 128, 0.3)',
  arrow: '#4ade80',
  hoverBg: 'rgba(74, 222, 128, 0.2)',
  topicBg: 'rgba(74, 222, 128, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

const ShellPipelineDiagram = () => (
  <svg viewBox="0 0 700 140" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#16a34a" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowPipe" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#4ade80"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="130" rx="10" fill="url(#pipeGrad)" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">Unix Pipeline — stdin → process → stdout</text>
    <rect x="20" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="70" y="60" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Input</text>
    <text x="70" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">file / stdin</text>
    <line x1="120" y1="65" x2="155" y2="65" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowPipe)"/>
    <rect x="160" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="210" y="55" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">grep</text>
    <text x="210" y="70" textAnchor="middle" fill="#94a3b8" fontSize="8">filter lines</text>
    <text x="210" y="82" textAnchor="middle" fill="#4ade80" fontSize="10">|</text>
    <line x1="260" y1="65" x2="295" y2="65" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowPipe)"/>
    <rect x="300" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#ee0000" strokeWidth="1.5"/>
    <text x="350" y="55" textAnchor="middle" fill="#ff6666" fontSize="9" fontWeight="bold">awk</text>
    <text x="350" y="70" textAnchor="middle" fill="#94a3b8" fontSize="8">extract fields</text>
    <text x="350" y="82" textAnchor="middle" fill="#4ade80" fontSize="10">|</text>
    <line x1="400" y1="65" x2="435" y2="65" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowPipe)"/>
    <rect x="440" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="490" y="55" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">sort | uniq</text>
    <text x="490" y="70" textAnchor="middle" fill="#94a3b8" fontSize="8">deduplicate</text>
    <text x="490" y="82" textAnchor="middle" fill="#4ade80" fontSize="10">|</text>
    <line x1="540" y1="65" x2="575" y2="65" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowPipe)"/>
    <rect x="580" y="40" width="90" height="50" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="625" y="60" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Output</text>
    <text x="625" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">file / stdout</text>
    <text x="350" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Each process reads stdin, transforms data, writes stdout — composable Unix philosophy</text>
  </svg>
)

const ProcessManagementDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="procGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowProc" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#procGrad)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">Process Lifecycle — Signals &amp; Job Control</text>
    <rect x="20" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="70" y="60" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Running</text>
    <text x="70" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">PID assigned</text>
    <line x1="120" y1="55" x2="165" y2="45" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowProc)"/>
    <line x1="120" y1="65" x2="165" y2="65" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowProc)"/>
    <line x1="120" y1="75" x2="165" y2="85" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowProc)"/>
    <rect x="170" y="35" width="120" height="20" rx="4" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="230" y="49" textAnchor="middle" fill="#fbbf24" fontSize="8">SIGSTOP (Ctrl+Z)</text>
    <rect x="170" y="55" width="120" height="20" rx="4" fill="#374151" stroke="#ef4444" strokeWidth="1"/>
    <text x="230" y="69" textAnchor="middle" fill="#f87171" fontSize="8">SIGTERM (kill)</text>
    <rect x="170" y="75" width="120" height="20" rx="4" fill="#374151" stroke="#ee0000" strokeWidth="1"/>
    <text x="230" y="89" textAnchor="middle" fill="#ff6666" fontSize="8">SIGKILL (kill -9)</text>
    <line x1="290" y1="45" x2="335" y2="45" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowProc)"/>
    <line x1="290" y1="65" x2="335" y2="65" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowProc)"/>
    <line x1="290" y1="85" x2="335" y2="85" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowProc)"/>
    <rect x="340" y="35" width="100" height="20" rx="4" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="390" y="49" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">Stopped</text>
    <rect x="340" y="55" width="100" height="20" rx="4" fill="#1e3a5f" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="390" y="69" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="bold">Terminated</text>
    <rect x="340" y="75" width="100" height="20" rx="4" fill="#1e3a5f" stroke="#ee0000" strokeWidth="1.5"/>
    <text x="390" y="89" textAnchor="middle" fill="#ff6666" fontSize="8" fontWeight="bold">Killed</text>
    <rect x="480" y="40" width="190" height="55" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="1.5"/>
    <text x="575" y="58" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Job Control</text>
    <text x="575" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">fg / bg / jobs / nohup</text>
    <text x="575" y="86" textAnchor="middle" fill="#94a3b8" fontSize="8">disown / screen / tmux</text>
    <text x="350" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Signals control process behavior — trap signals in scripts for graceful cleanup</text>
  </svg>
)

const TextProcessingDiagram = () => (
  <svg viewBox="0 0 700 150" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="textProcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="140" rx="10" fill="url(#textProcGrad)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">Text Processing Toolkit</text>
    <rect x="20" y="40" width="100" height="75" rx="6" fill="#1e3a5f" stroke="#ee0000" strokeWidth="1.5"/>
    <text x="70" y="58" textAnchor="middle" fill="#ff6666" fontSize="10" fontWeight="bold">grep</text>
    <text x="70" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">Pattern match</text>
    <text x="70" y="86" textAnchor="middle" fill="#94a3b8" fontSize="8">Filter lines</text>
    <text x="70" y="99" textAnchor="middle" fill="#94a3b8" fontSize="8">Regex support</text>
    <rect x="135" y="40" width="100" height="75" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="185" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">sed</text>
    <text x="185" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">Stream editor</text>
    <text x="185" y="86" textAnchor="middle" fill="#94a3b8" fontSize="8">Find/replace</text>
    <text x="185" y="99" textAnchor="middle" fill="#94a3b8" fontSize="8">In-place edit</text>
    <rect x="250" y="40" width="100" height="75" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="300" y="58" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">awk</text>
    <text x="300" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">Field processing</text>
    <text x="300" y="86" textAnchor="middle" fill="#94a3b8" fontSize="8">Columnar data</text>
    <text x="300" y="99" textAnchor="middle" fill="#94a3b8" fontSize="8">Mini language</text>
    <rect x="365" y="40" width="100" height="75" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="415" y="58" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">cut / tr</text>
    <text x="415" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">Extract fields</text>
    <text x="415" y="86" textAnchor="middle" fill="#94a3b8" fontSize="8">Translate chars</text>
    <text x="415" y="99" textAnchor="middle" fill="#94a3b8" fontSize="8">Delimiters</text>
    <rect x="480" y="40" width="100" height="75" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="530" y="58" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">sort / uniq</text>
    <text x="530" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">Order data</text>
    <text x="530" y="86" textAnchor="middle" fill="#94a3b8" fontSize="8">Deduplicate</text>
    <text x="530" y="99" textAnchor="middle" fill="#94a3b8" fontSize="8">Count unique</text>
    <rect x="595" y="40" width="80" height="75" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="1.5"/>
    <text x="635" y="58" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">xargs</text>
    <text x="635" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">Build cmds</text>
    <text x="635" y="86" textAnchor="middle" fill="#94a3b8" fontSize="8">Parallel exec</text>
    <text x="635" y="99" textAnchor="middle" fill="#94a3b8" fontSize="8">Batch ops</text>
  </svg>
)

const FileSystemDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="fsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#fsGrad)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">File System Hierarchy &amp; Permissions</text>
    <rect x="300" y="35" width="100" height="22" rx="4" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="350" y="50" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">/  (root)</text>
    <rect x="30" y="75" width="70" height="22" rx="4" fill="#374151" stroke="#22c55e" strokeWidth="1"/>
    <text x="65" y="90" textAnchor="middle" fill="#4ade80" fontSize="8">/bin</text>
    <rect x="110" y="75" width="70" height="22" rx="4" fill="#374151" stroke="#22c55e" strokeWidth="1"/>
    <text x="145" y="90" textAnchor="middle" fill="#4ade80" fontSize="8">/etc</text>
    <rect x="190" y="75" width="70" height="22" rx="4" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="225" y="90" textAnchor="middle" fill="#60a5fa" fontSize="8">/home</text>
    <rect x="270" y="75" width="70" height="22" rx="4" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="305" y="90" textAnchor="middle" fill="#a78bfa" fontSize="8">/var</text>
    <rect x="350" y="75" width="70" height="22" rx="4" fill="#374151" stroke="#ee0000" strokeWidth="1"/>
    <text x="385" y="90" textAnchor="middle" fill="#ff6666" fontSize="8">/tmp</text>
    <rect x="430" y="75" width="70" height="22" rx="4" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="465" y="90" textAnchor="middle" fill="#fbbf24" fontSize="8">/usr</text>
    <rect x="510" y="75" width="70" height="22" rx="4" fill="#374151" stroke="#06b6d4" strokeWidth="1"/>
    <text x="545" y="90" textAnchor="middle" fill="#22d3ee" fontSize="8">/opt</text>
    <rect x="590" y="75" width="80" height="22" rx="4" fill="#374151" stroke="#ec4899" strokeWidth="1"/>
    <text x="630" y="90" textAnchor="middle" fill="#f472b6" fontSize="8">/proc</text>
    <line x1="350" y1="57" x2="65" y2="75" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="57" x2="145" y2="75" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="57" x2="225" y2="75" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="57" x2="305" y2="75" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="57" x2="385" y2="75" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="57" x2="465" y2="75" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="57" x2="545" y2="75" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="350" y1="57" x2="630" y2="75" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
    <text x="180" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Permissions: rwxr-xr-x  (owner/group/other)</text>
    <text x="530" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">chmod 755 = rwxr-xr-x</text>
  </svg>
)

const NetworkDiagram = () => (
  <svg viewBox="0 0 700 140" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="130" rx="10" fill="url(#netGrad)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">Networking &amp; Diagnostics Toolkit</text>
    <rect x="20" y="40" width="100" height="35" rx="4" fill="#1e3a5f" stroke="#ee0000" strokeWidth="1.5"/>
    <text x="70" y="54" textAnchor="middle" fill="#ff6666" fontSize="9" fontWeight="bold">curl / wget</text>
    <text x="70" y="67" textAnchor="middle" fill="#94a3b8" fontSize="7">HTTP requests</text>
    <rect x="130" y="40" width="100" height="35" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="180" y="54" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">ss / netstat</text>
    <text x="180" y="67" textAnchor="middle" fill="#94a3b8" fontSize="7">Socket stats</text>
    <rect x="240" y="40" width="100" height="35" rx="4" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="290" y="54" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">dig / nslookup</text>
    <text x="290" y="67" textAnchor="middle" fill="#94a3b8" fontSize="7">DNS queries</text>
    <rect x="350" y="40" width="100" height="35" rx="4" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="400" y="54" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">tcpdump</text>
    <text x="400" y="67" textAnchor="middle" fill="#94a3b8" fontSize="7">Packet capture</text>
    <rect x="460" y="40" width="100" height="35" rx="4" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="510" y="54" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">iptables / nft</text>
    <text x="510" y="67" textAnchor="middle" fill="#94a3b8" fontSize="7">Firewall rules</text>
    <rect x="570" y="40" width="100" height="35" rx="4" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="1.5"/>
    <text x="620" y="54" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">ssh / scp</text>
    <text x="620" y="67" textAnchor="middle" fill="#94a3b8" fontSize="7">Remote access</text>
    <text x="350" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Essential tools for debugging connectivity, DNS, firewalls, and remote management</text>
  </svg>
)

const SyntaxHighlighter = ({ code }) => (
  <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.85rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace" }}>
    {code}
  </pre>
)

function UnixScripting({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'shell-fundamentals',
      name: 'Shell Scripting Fundamentals',
      icon: '🐚',
      color: '#3b82f6',
      description: 'Bash is the default shell on most Linux systems. Shell scripts automate repetitive tasks using variables, control flow, functions, and command substitution. Understanding shebang lines, exit codes, quoting rules, and parameter expansion is essential for writing robust scripts.',
      diagram: ShellPipelineDiagram,
      details: [
        {
          name: 'Variables & Quoting',
          explanation: 'Shell variables store strings by default. Double quotes allow variable expansion while preserving spaces; single quotes treat everything literally. Parameter expansion (${var}) supports default values, substring, and pattern matching. Special variables include $0 (script name), $1-$9 (arguments), $# (arg count), $@ (all args), $? (last exit code), and $$ (PID).',
          codeExample: `#!/bin/bash
# Shebang — tells OS which interpreter to use
set -euo pipefail   # Exit on error, undefined var, pipe failure

# Variables (no spaces around =)
name="World"
count=42
readonly PI=3.14159   # Constant

# Quoting rules
echo "Hello $name"         # Variable expansion → Hello World
echo 'Hello $name'         # Literal → Hello $name
echo "Files: $(ls | wc -l)"  # Command substitution

# Parameter expansion
echo "\${name:-default}"     # Use default if unset
echo "\${name:=fallback}"    # Set and use default if unset
echo "\${name:+alternate}"   # Use alternate if set
echo "\${#name}"             # String length → 5
echo "\${name^^}"            # Uppercase → WORLD
echo "\${name,,}"            # Lowercase → world
echo "\${name:0:3}"          # Substring → Wor

# Arrays
fruits=("apple" "banana" "cherry")
echo "\${fruits[0]}"         # First element
echo "\${fruits[@]}"         # All elements
echo "\${#fruits[@]}"        # Array length

# Associative arrays (bash 4+)
declare -A config
config[host]="localhost"
config[port]="8080"
echo "\${config[host]}:\${config[port]}"

# Special variables
echo "Script: $0"
echo "Args: $@"
echo "Arg count: $#"
echo "Last exit: $?"
echo "PID: $$"
echo "Last bg PID: $!"`
        },
        {
          name: 'Control Flow',
          explanation: 'Bash supports if/elif/else, for loops, while loops, case statements, and select menus. Test conditions use [ ] (test) or [[ ]] (extended test with regex and pattern matching). Arithmetic uses (( )) or $(( )). For loops can iterate over lists, ranges, command output, or use C-style syntax.',
          codeExample: `#!/bin/bash
set -euo pipefail

# If/elif/else
if [[ -f "/etc/hosts" ]]; then
    echo "File exists"
elif [[ -d "/etc" ]]; then
    echo "Directory exists"
else
    echo "Neither"
fi

# String comparison
if [[ "$name" == "admin" ]]; then echo "Admin"; fi
if [[ "$name" =~ ^[A-Z] ]]; then echo "Starts uppercase"; fi
if [[ -z "$var" ]]; then echo "Empty"; fi
if [[ -n "$var" ]]; then echo "Not empty"; fi

# Numeric comparison
if (( count > 10 )); then echo "Big"; fi
if [[ "$count" -gt 10 ]]; then echo "Also big"; fi

# For loop — list
for fruit in apple banana cherry; do
    echo "Fruit: $fruit"
done

# For loop — range
for i in {1..10}; do echo "$i"; done

# For loop — C-style
for ((i=0; i<10; i++)); do echo "$i"; done

# For loop — command output
for file in *.log; do
    echo "Processing: $file"
done

# While loop
counter=0
while (( counter < 5 )); do
    echo "Count: $counter"
    ((counter++))
done

# While read — process line by line
while IFS= read -r line; do
    echo "Line: $line"
done {'<'} input.txt

# Case statement
case "$1" in
    start)  echo "Starting...";;
    stop)   echo "Stopping...";;
    restart)
        echo "Restarting..."
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac`
        },
        {
          name: 'Functions & Error Handling',
          explanation: 'Functions encapsulate reusable logic. They receive arguments via $1, $2, etc. and return exit codes (0=success). Use "local" for function-scoped variables. Error handling uses set -e (exit on error), trap for cleanup on EXIT/ERR signals, and custom error functions. The "||" and "&&" operators chain commands based on exit codes.',
          codeExample: `#!/bin/bash
set -euo pipefail

# Function definition
greet() {
    local name="$1"      # Local variable
    local greeting="\${2:-Hello}"
    echo "$greeting, $name!"
    return 0              # Exit code (0 = success)
}

greet "Alice" "Hi"        # → Hi, Alice!

# Function with validation
deploy() {
    local version="$1"
    local env="\${2:-staging}"

    if [[ -z "$version" ]]; then
        echo "ERROR: Version required" >&2
        return 1
    fi

    echo "Deploying v$version to $env"
}

# Trap for cleanup
cleanup() {
    echo "Cleaning up temp files..."
    rm -f /tmp/myapp_*.tmp
}
trap cleanup EXIT        # Run on any exit
trap cleanup ERR         # Run on error

# Error handling patterns
# Pattern 1: || operator
command_that_might_fail || {
    echo "Command failed, handling error" >&2
    exit 1
}

# Pattern 2: Custom die function
die() {
    echo "FATAL: $*" >&2
    exit 1
}
[[ -f config.yml ]] || die "config.yml not found"

# Pattern 3: Retry logic
retry() {
    local max_attempts="$1"
    shift
    local attempt=1
    while (( attempt <= max_attempts )); do
        if "$@"; then
            return 0
        fi
        echo "Attempt $attempt failed, retrying..." >&2
        ((attempt++))
        sleep 2
    done
    return 1
}
retry 3 curl -sf http://localhost:8080/health

# Logging function
log() {
    local level="$1"
    shift
    echo "[\$(date '+%Y-%m-%d %H:%M:%S')] [$level] $*" >&2
}
log INFO "Deployment started"
log ERROR "Connection failed"`
        }
      ]
    },
    {
      id: 'text-processing',
      name: 'Text Processing',
      icon: '📝',
      color: '#f59e0b',
      description: 'Unix text processing tools (grep, sed, awk, cut, sort, uniq, tr, xargs) form a powerful pipeline for transforming data. Mastering these tools is essential for log analysis, data extraction, configuration management, and automation scripts in DevOps workflows.',
      diagram: TextProcessingDiagram,
      details: [
        {
          name: 'grep & Regular Expressions',
          explanation: 'grep searches files or stdin for lines matching a pattern. Use -i for case-insensitive, -r for recursive directory search, -n for line numbers, -c for count, -v for inverse match, -l for filenames only, and -E for extended regex. grep is the most-used text tool in DevOps for log analysis, searching configs, and filtering command output.',
          codeExample: `# Basic grep
grep "ERROR" /var/log/app.log
grep -i "warning" /var/log/app.log     # Case-insensitive
grep -n "Exception" app.log            # With line numbers
grep -c "ERROR" app.log                # Count matches
grep -v "DEBUG" app.log                # Exclude DEBUG lines
grep -l "TODO" src/*.java              # Files containing TODO

# Recursive search
grep -r "password" /etc/                # Recursive
grep -rn "import.*spring" src/          # Recursive with line numbers
grep -rl "deprecated" --include="*.java" src/

# Extended regex (-E or egrep)
grep -E "ERROR|WARN|FATAL" app.log     # OR pattern
grep -E "^[0-9]{4}-[0-9]{2}" app.log  # Date pattern
grep -E "status=[45][0-9]{2}" access.log  # HTTP 4xx/5xx

# Context lines
grep -A 3 "Exception" app.log         # 3 lines after
grep -B 2 "Exception" app.log         # 2 lines before
grep -C 5 "OutOfMemoryError" app.log  # 5 lines around

# Practical DevOps examples
# Find slow API calls (>1000ms)
grep -E "duration=[0-9]{4,}" access.log

# Extract unique IP addresses
grep -oE "[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+" access.log | sort -u

# Find config issues
grep -rn "localhost" /etc/nginx/ --include="*.conf"

# Count errors per hour
grep "ERROR" app.log | cut -d' ' -f1,2 | cut -d: -f1,2 | sort | uniq -c`
        },
        {
          name: 'sed — Stream Editor',
          explanation: 'sed performs text transformations on streams or files. The most common use is substitution (s/pattern/replacement/). Use -i for in-place editing, -n with /p for selective printing, and addresses (line numbers or patterns) to target specific lines. sed is essential for automated config file modifications in deployment scripts.',
          codeExample: `# Basic substitution
echo "Hello World" | sed 's/World/Unix/'
# → Hello Unix

# Global substitution (all occurrences on line)
echo "aaa bbb aaa" | sed 's/aaa/xxx/g'
# → xxx bbb xxx

# In-place file editing
sed -i 's/old_value/new_value/g' config.yml
sed -i.bak 's/old/new/g' file.txt    # Keep backup

# Delete lines
sed '/^#/d' config.conf              # Remove comments
sed '/^$/d' file.txt                 # Remove empty lines
sed '1,5d' file.txt                  # Delete lines 1-5

# Print specific lines
sed -n '10,20p' file.txt             # Print lines 10-20
sed -n '/START/,/END/p' file.txt     # Print between patterns

# Insert and append
sed '3i\\New line before line 3' file.txt
sed '3a\\New line after line 3' file.txt

# Multiple operations
sed -e 's/foo/bar/g' -e 's/baz/qux/g' file.txt

# Practical DevOps examples
# Update config value
sed -i 's/^port=.*/port=8080/' app.properties

# Comment out a line
sed -i 's/^dangerous_setting/# dangerous_setting/' config.yml

# Replace between markers
sed -i '/# BEGIN MANAGED/,/# END MANAGED/c\\
# BEGIN MANAGED\\
server_name example.com;\\
listen 443 ssl;\\
# END MANAGED' nginx.conf

# Extract version from pom.xml
sed -n 's/.*<version>\\(.*\\)<\\/version>.*/\\1/p' pom.xml | head -1`
        },
        {
          name: 'awk — Pattern Processing',
          explanation: 'awk is a field-oriented text processing language. It automatically splits each line into fields ($1, $2, ...) by whitespace. It supports variables, conditionals, loops, and built-in functions. awk excels at extracting columns, computing aggregates, and generating reports from structured text like logs and CSV files.',
          codeExample: `# Basic field extraction
echo "John 25 Engineer" | awk '{print $1, $3}'
# → John Engineer

# Custom field separator
awk -F: '{print $1, $3}' /etc/passwd   # User and UID
awk -F, '{print $2}' data.csv          # Second CSV column

# Pattern matching
awk '/ERROR/ {print $0}' app.log       # Lines with ERROR
awk '$3 > 100 {print $1, $3}' data.txt # Where field 3 > 100

# Built-in variables
# NR = record (line) number
# NF = number of fields
# FS = field separator
# OFS = output field separator

awk '{print NR, $0}' file.txt          # Add line numbers
awk 'NF > 3' file.txt                  # Lines with >3 fields
awk 'END {print NR}' file.txt          # Total line count

# Aggregation
awk '{sum += $2} END {print "Total:", sum}' sales.txt
awk '{sum += $2; count++} END {print "Avg:", sum/count}' data.txt

# Practical DevOps examples
# Analyze access log — requests per status code
awk '{print $9}' access.log | sort | uniq -c | sort -rn

# Top 10 IPs by request count
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# Average response time
awk '{sum += $NF; count++} END {print "Avg:", sum/count, "ms"}' access.log

# Disk usage report — show partitions over 80%
df -h | awk 'NR>1 && int($5)>80 {print $6, $5}'

# Process memory usage — top 10
ps aux | awk 'NR>1 {print $4, $11}' | sort -rn | head -10

# CSV to formatted table
awk -F, '{printf "%-20s %-10s %s\\n", $1, $2, $3}' data.csv`
        },
        {
          name: 'Pipelines & xargs',
          explanation: 'Unix pipelines connect commands via stdout→stdin. Combine simple tools into powerful data processing chains. xargs builds and executes commands from stdin, enabling batch operations. Use tee to split output, process substitution <() for comparing commands, and here-strings <<< for inline input.',
          codeExample: `# Pipeline composition
# Find top 5 largest files in /var/log
find /var/log -type f -exec du -h {} + | sort -rh | head -5

# Count unique error types in log
grep "ERROR" app.log | awk -F: '{print $4}' | sort | uniq -c | sort -rn

# Extract and deduplicate email addresses
grep -oE "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" file.txt | sort -u

# xargs — build commands from stdin
find . -name "*.tmp" | xargs rm -f
find . -name "*.java" | xargs grep "TODO"

# xargs with placeholder
find . -name "*.log" | xargs -I{} gzip {}

# xargs parallel execution
find . -name "*.png" | xargs -P4 -I{} convert {} -resize 50% {}

# tee — split output
command | tee output.log              # Show and save
command | tee /dev/stderr | next_cmd  # Show and pipe

# Process substitution
diff {'<'}(sort file1.txt) {'<'}(sort file2.txt)    # Compare sorted
diff {'<'}(ssh host1 cat /etc/hosts) {'<'}(ssh host2 cat /etc/hosts)

# Here-string
grep "error" {'<'}{'<'}{'<'} "This has an error in it"

# Practical pipeline examples
# Monitor log in real-time, filter errors
tail -f app.log | grep --line-buffered "ERROR"

# Parse JSON with jq (if available)
curl -s api.example.com/status | jq '.services[] | select(.status != "healthy")'

# Find and kill processes by name
ps aux | grep "[j]ava" | awk '{print $2}' | xargs kill

# Batch rename files
ls *.txt | sed 's/.txt$//' | xargs -I{} mv {}.txt {}.bak`
        }
      ]
    },
    {
      id: 'file-system',
      name: 'File System & Permissions',
      icon: '📂',
      color: '#22c55e',
      description: 'Understanding the Unix file system hierarchy (FHS), file permissions (rwx), ownership (user/group), and disk management is fundamental. Commands like find, chmod, chown, ln, df, du, and mount are used daily for system administration and deployment scripts.',
      diagram: FileSystemDiagram,
      details: [
        {
          name: 'File Operations & find',
          explanation: 'The find command searches directory trees with powerful filters: name patterns, file types, size, modification time, permissions, and ownership. Combined with -exec or xargs, it enables batch operations on matched files. Understanding the difference between hard links and symbolic links, and file attributes, is important for deployment and configuration management.',
          codeExample: `# find — search files by criteria
find /var/log -name "*.log" -mtime -7        # Modified in last 7 days
find . -type f -size +100M                   # Files over 100MB
find . -name "*.class" -delete               # Delete matching files
find . -type f -perm 777                     # World-writable files
find . -user root -type f                    # Files owned by root
find . -empty -type d                        # Empty directories

# find with -exec
find . -name "*.java" -exec grep -l "TODO" {} \\;
find /tmp -mtime +30 -exec rm -f {} +       # Bulk delete old files

# find with size/time
find . -newer reference.txt                  # Newer than reference
find . -type f -amin -60                     # Accessed in last hour

# Disk usage
du -sh /var/log/*                            # Size of each item
du -sh . --max-depth=1 | sort -rh           # Sorted dir sizes
df -h                                        # Filesystem usage

# Links
ln -s /opt/app/current/bin/app /usr/local/bin/app  # Symlink
ln file1.txt file1_hard.txt                  # Hard link

# File operations
cp -r src/ dest/                             # Recursive copy
rsync -avz src/ dest/                        # Incremental sync
rsync -avz --delete src/ user@host:dest/     # Remote sync

# Archive and compress
tar czf backup.tar.gz /var/log/              # Create tar.gz
tar xzf backup.tar.gz                        # Extract
tar czf backup-\$(date +%Y%m%d).tar.gz /data  # Dated backup`
        },
        {
          name: 'Permissions & Ownership',
          explanation: 'Unix permissions control read (r=4), write (w=2), and execute (x=1) access for owner, group, and others. chmod sets permissions numerically (755) or symbolically (u+x). chown changes file ownership. The sticky bit, setuid, and setgid are special permissions for shared directories and executables. umask sets default permissions for new files.',
          codeExample: `# Permission format: type|owner|group|other
# -rwxr-xr-x  →  regular file, 755
# drwxr-x---  →  directory, 750

# chmod — change permissions
chmod 755 script.sh           # rwxr-xr-x (owner:rwx, group:rx, other:rx)
chmod 644 config.yml          # rw-r--r-- (owner:rw, others: read only)
chmod 600 id_rsa              # rw------- (private key, owner only)
chmod +x deploy.sh            # Add execute for all
chmod u+x,g+r script.sh      # Owner +execute, group +read
chmod -R 755 /var/www/        # Recursive

# chown — change ownership
chown deploy:deploy /opt/app/          # User and group
chown -R www-data:www-data /var/www/   # Recursive
chown :developers project/             # Change group only

# Special permissions
chmod u+s /usr/bin/passwd     # setuid — runs as file owner
chmod g+s /shared/            # setgid — new files inherit group
chmod +t /tmp/                # sticky bit — only owner can delete

# umask — default permission mask
umask 022                     # New files: 644, dirs: 755
umask 077                     # New files: 600, dirs: 700

# ACL — fine-grained permissions (beyond owner/group/other)
setfacl -m u:deploy:rwx /opt/app/
setfacl -m g:developers:rx /opt/app/
getfacl /opt/app/

# Practical examples
# Secure SSH directory
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
chmod 644 ~/.ssh/authorized_keys

# Web server directory
chown -R www-data:www-data /var/www/html
find /var/www/html -type d -exec chmod 755 {} \\;
find /var/www/html -type f -exec chmod 644 {} \\;`
        }
      ]
    },
    {
      id: 'process-management',
      name: 'Process & System Management',
      icon: '⚙️',
      color: '#8b5cf6',
      description: 'Process management includes monitoring (ps, top, htop), signaling (kill, trap), job control (bg, fg, nohup), and service management (systemctl). Understanding process states, signals, resource limits, and cron scheduling is critical for production system administration.',
      diagram: ProcessManagementDiagram,
      details: [
        {
          name: 'Process Monitoring',
          explanation: 'ps shows process snapshots, top/htop provide real-time monitoring, and /proc filesystem exposes kernel-level process info. Understanding process states (R=running, S=sleeping, D=uninterruptible, Z=zombie, T=stopped) and resource usage (CPU, memory, I/O) is essential for troubleshooting production systems.',
          codeExample: `# ps — process snapshot
ps aux                                # All processes, full detail
ps aux --sort=-%mem | head -10        # Top 10 by memory
ps aux --sort=-%cpu | head -10        # Top 10 by CPU
ps -ef --forest                       # Process tree

# Filter processes
ps aux | grep "[j]ava"               # Java processes (no grep itself)
ps -u deploy                          # Processes by user
pgrep -la java                        # PID and command for java

# top / htop — real-time monitoring
top -b -n 1 | head -20               # Batch mode, one iteration
top -p 1234                           # Monitor specific PID

# /proc filesystem
cat /proc/cpuinfo                     # CPU information
cat /proc/meminfo                     # Memory information
cat /proc/1234/status                 # Process 1234 status
ls -la /proc/1234/fd                  # Open file descriptors

# System resource usage
free -h                               # Memory usage
uptime                                # Load average
vmstat 1 5                            # Virtual memory stats
iostat -x 1 5                         # I/O stats
lsof -p 1234                          # Open files by process
lsof -i :8080                         # Process using port 8080

# Practical monitoring examples
# Check if service is running
pgrep -x nginx > /dev/null && echo "Running" || echo "Stopped"

# Watch for high CPU
while true; do
    cpu=\$(top -bn1 | grep "Cpu(s)" | awk '{print \$2}')
    if (( \$(echo "\$cpu > 90" | bc -l) )); then
        echo "HIGH CPU: \$cpu%" | mail -s "Alert" admin@example.com
    fi
    sleep 60
done`
        },
        {
          name: 'Signals & Job Control',
          explanation: 'Signals are software interrupts sent to processes. SIGTERM (15) requests graceful shutdown, SIGKILL (9) forces immediate termination, SIGHUP (1) signals config reload, and SIGINT (2) is sent by Ctrl+C. In scripts, trap catches signals for cleanup. Job control (bg, fg, &, nohup, disown) manages background processes.',
          codeExample: `# Common signals
kill 1234                     # SIGTERM (graceful shutdown)
kill -9 1234                  # SIGKILL (force kill)
kill -HUP 1234               # SIGHUP (reload config)
kill -USR1 1234               # SIGUSR1 (custom signal)
killall nginx                 # Kill by name
pkill -f "java.*myapp"       # Kill by pattern

# Trap signals in scripts
#!/bin/bash
cleanup() {
    echo "Caught signal, cleaning up..."
    rm -f /tmp/myapp.pid
    exit 0
}
trap cleanup SIGTERM SIGINT SIGHUP
trap 'echo "Error on line $LINENO"' ERR

echo $$ > /tmp/myapp.pid
while true; do
    # Main application loop
    sleep 1
done

# Job control
long_running_command &        # Run in background
jobs                          # List background jobs
fg %1                         # Bring job 1 to foreground
bg %1                         # Resume job 1 in background
disown %1                     # Detach from terminal
nohup command &               # Survive terminal close

# screen / tmux — persistent sessions
tmux new -s deploy            # New named session
tmux attach -t deploy         # Reattach
tmux ls                       # List sessions
# Ctrl+B d — detach

# Systemd service management
systemctl start nginx
systemctl stop nginx
systemctl restart nginx
systemctl reload nginx
systemctl status nginx
systemctl enable nginx        # Start on boot
systemctl disable nginx
journalctl -u nginx -f        # Follow service logs
journalctl -u nginx --since "1 hour ago"`
        },
        {
          name: 'Cron & Scheduling',
          explanation: 'Cron schedules recurring tasks using a time-based syntax: minute hour day-of-month month day-of-week. Crontab files define per-user schedules. System cron directories (/etc/cron.d, /etc/cron.daily) handle system-level tasks. Modern alternatives include systemd timers. Always redirect cron output and use flock for preventing overlapping runs.',
          codeExample: `# Cron syntax: min hour dom month dow command
# *    *    *   *     *
# |    |    |   |     |
# |    |    |   |     +--- Day of week (0-7, Sun=0 or 7)
# |    |    |   +--------- Month (1-12)
# |    |    +------------- Day of month (1-31)
# |    +------------------ Hour (0-23)
# +----------------------- Minute (0-59)

# Edit crontab
crontab -e
crontab -l                    # List current crontab

# Examples
# Every 5 minutes
*/5 * * * * /opt/scripts/health_check.sh

# Daily at 2:30 AM
30 2 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1

# Every Monday at 9 AM
0 9 * * 1 /opt/scripts/weekly_report.sh

# First day of each month
0 0 1 * * /opt/scripts/monthly_cleanup.sh

# Every 15 minutes during business hours
*/15 9-17 * * 1-5 /opt/scripts/sync.sh

# Best practices
# 1. Always redirect output
* * * * * /script.sh >> /var/log/script.log 2>&1

# 2. Use flock to prevent overlapping runs
*/5 * * * * flock -n /tmp/job.lock /opt/scripts/job.sh

# 3. Set PATH and environment
PATH=/usr/local/bin:/usr/bin:/bin
MAILTO=admin@example.com

# Systemd timer (modern alternative)
# /etc/systemd/system/backup.timer
# [Unit]
# Description=Daily backup
# [Timer]
# OnCalendar=*-*-* 02:30:00
# Persistent=true
# [Install]
# WantedBy=timers.target

# systemctl enable --now backup.timer
# systemctl list-timers`
        }
      ]
    },
    {
      id: 'networking',
      name: 'Networking & Diagnostics',
      icon: '🌐',
      color: '#06b6d4',
      description: 'Network troubleshooting with curl, dig, ss, netstat, tcpdump, and iptables. SSH configuration and tunneling for secure remote management. Understanding DNS resolution, TCP connections, port scanning, and firewall rules is essential for DevOps infrastructure management.',
      diagram: NetworkDiagram,
      details: [
        {
          name: 'HTTP & API Tools',
          explanation: 'curl is the primary tool for testing APIs, downloading files, and debugging HTTP issues. It supports all HTTP methods, headers, authentication, cookies, and SSL. wget is an alternative for recursive downloads. Use curl in scripts for health checks, API integrations, and deployment triggers.',
          codeExample: `# curl — HTTP requests
curl http://example.com                       # GET
curl -o file.html http://example.com          # Save to file
curl -I http://example.com                    # Headers only
curl -v http://example.com                    # Verbose (debug)

# POST with data
curl -X POST http://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer TOKEN" \\
  -d '{"name": "Alice", "email": "alice@example.com"}'

# POST with form data
curl -X POST http://example.com/upload \\
  -F "file=@document.pdf" \\
  -F "description=My file"

# Follow redirects and show timing
curl -L -w "\\nHTTP Code: %{http_code}\\nTime: %{time_total}s\\n" \\
  http://example.com

# API health check script
check_health() {
    local url="$1"
    local status
    status=\$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [[ "$status" == "200" ]]; then
        echo "OK: $url"
    else
        echo "FAIL: $url (HTTP $status)" >&2
        return 1
    fi
}
check_health "http://localhost:8080/health"

# Download with retry
curl --retry 3 --retry-delay 5 -O http://example.com/file.tar.gz

# Certificate info
curl -vI https://example.com 2>&1 | grep -A5 "Server certificate"

# wget — recursive download
wget -r --no-parent -l 2 http://example.com/docs/`
        },
        {
          name: 'SSH & Remote Management',
          explanation: 'SSH provides encrypted remote access and tunneling. SSH keys replace passwords for authentication. SSH config files simplify connection management. Port forwarding (local and remote) creates secure tunnels. SCP and rsync transfer files securely. SSH agent forwarding enables multi-hop access.',
          codeExample: `# SSH key generation
ssh-keygen -t ed25519 -C "deploy@company.com"
ssh-keygen -t rsa -b 4096 -C "deploy@company.com"

# Copy public key to server
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server

# SSH config (~/.ssh/config) — simplify connections
# Host prod-web
#     HostName 10.0.1.50
#     User deploy
#     IdentityFile ~/.ssh/deploy_key
#     Port 2222
#
# Host staging-*
#     User deploy
#     IdentityFile ~/.ssh/staging_key
#     ProxyJump bastion
#
# Host bastion
#     HostName bastion.example.com
#     User admin

# Then simply: ssh prod-web

# Port forwarding (tunnels)
# Local: access remote service on local port
ssh -L 5432:db-server:5432 bastion
# Now: psql -h localhost -p 5432

# Remote: expose local service to remote
ssh -R 8080:localhost:3000 server
# Server can now access your local :3000 on its :8080

# Dynamic SOCKS proxy
ssh -D 1080 bastion
# Configure browser to use SOCKS5 localhost:1080

# File transfer
scp file.txt user@server:/opt/app/
scp -r directory/ user@server:/opt/
rsync -avz --progress local/ user@server:remote/

# Run remote command
ssh server "systemctl restart nginx"
ssh server "df -h && free -h"

# Multi-hop through bastion
ssh -J bastion internal-server`
        },
        {
          name: 'DNS & Connection Diagnostics',
          explanation: 'dig and nslookup query DNS records. ss (modern netstat) shows socket statistics. ping and traceroute verify connectivity. tcpdump captures network packets for deep analysis. These tools are essential for diagnosing connectivity issues, DNS problems, and network latency in production environments.',
          codeExample: `# DNS lookup
dig example.com                        # Full DNS query
dig example.com A +short              # Just the IP
dig example.com MX                    # Mail records
dig @8.8.8.8 example.com             # Query specific DNS server
dig -x 93.184.216.34                  # Reverse lookup
nslookup example.com                  # Alternative

# Socket statistics (ss replaces netstat)
ss -tlnp                              # TCP listening ports with process
ss -tunap                             # All TCP/UDP connections
ss -s                                 # Socket statistics summary
ss state established                  # Established connections

# Connectivity
ping -c 4 example.com                # 4 pings
traceroute example.com                # Route to host
mtr example.com                       # Continuous traceroute

# Port checking
nc -zv host 80                        # Check if port is open
nc -zv host 1-1024                    # Scan port range
timeout 3 bash -c '</dev/tcp/host/80' && echo "Open"

# tcpdump — packet capture
sudo tcpdump -i eth0 port 80          # HTTP traffic
sudo tcpdump -i any host 10.0.1.50   # Traffic to/from host
sudo tcpdump -i eth0 -w capture.pcap  # Save to file
sudo tcpdump -A port 80               # Show ASCII content

# Practical diagnostics
# Check if service is reachable
for host in web1 web2 web3; do
    if nc -zw2 \$host 8080 2>/dev/null; then
        echo "OK: \$host:8080"
    else
        echo "FAIL: \$host:8080" >&2
    fi
done

# Monitor connections to a service
watch -n1 'ss -tn state established | grep :8080 | wc -l'`
        }
      ]
    },
    {
      id: 'automation-patterns',
      name: 'Automation Patterns',
      icon: '🤖',
      color: '#ec4899',
      description: 'Real-world shell scripting patterns for DevOps: deployment scripts, log rotation, backup automation, health monitoring, and environment setup. These patterns combine fundamental shell skills into production-ready automation that integrates with CI/CD pipelines and infrastructure management.',
      details: [
        {
          name: 'Deployment Scripts',
          explanation: 'Production deployment scripts follow a pattern: validate prerequisites, create backups, deploy artifacts, verify health, and provide rollback capability. Use functions for modularity, proper error handling with traps, and logging for audit trails. Atomic deployments use symlinks to switch between versions.',
          codeExample: `#!/bin/bash
set -euo pipefail

# === Deployment Script with Rollback ===
APP_NAME="myapp"
DEPLOY_DIR="/opt/\${APP_NAME}"
RELEASES_DIR="\${DEPLOY_DIR}/releases"
CURRENT_LINK="\${DEPLOY_DIR}/current"
ARTIFACT="$1"
TIMESTAMP=\$(date +%Y%m%d_%H%M%S)
RELEASE_DIR="\${RELEASES_DIR}/\${TIMESTAMP}"
HEALTH_URL="http://localhost:8080/health"

log() { echo "[\$(date '+%H:%M:%S')] $*"; }

die() { log "FATAL: $*" >&2; exit 1; }

cleanup() {
    if [[ "\${DEPLOY_SUCCESS:-false}" != "true" ]]; then
        log "Deploy failed — rolling back"
        rollback
    fi
}
trap cleanup EXIT

validate() {
    [[ -f "$ARTIFACT" ]] || die "Artifact not found: $ARTIFACT"
    command -v curl >/dev/null || die "curl not installed"
    log "Validation passed"
}

backup() {
    if [[ -L "$CURRENT_LINK" ]]; then
        local prev=\$(readlink "$CURRENT_LINK")
        echo "$prev" > "\${DEPLOY_DIR}/previous_release"
        log "Backed up previous: $prev"
    fi
}

deploy() {
    mkdir -p "$RELEASE_DIR"
    cp "$ARTIFACT" "\${RELEASE_DIR}/app.jar"
    cp "\${CURRENT_LINK}/config.yml" "\${RELEASE_DIR}/" 2>/dev/null || true

    # Atomic symlink switch
    ln -sfn "$RELEASE_DIR" "\${CURRENT_LINK}.new"
    mv -T "\${CURRENT_LINK}.new" "$CURRENT_LINK"
    log "Deployed to $RELEASE_DIR"
}

restart_service() {
    sudo systemctl restart "$APP_NAME"
    log "Service restarted"
}

health_check() {
    local retries=10
    for ((i=1; i<=retries; i++)); do
        if curl -sf "$HEALTH_URL" > /dev/null 2>&1; then
            log "Health check passed"
            return 0
        fi
        log "Health check attempt $i/$retries..."
        sleep 3
    done
    die "Health check failed after $retries attempts"
}

rollback() {
    if [[ -f "\${DEPLOY_DIR}/previous_release" ]]; then
        local prev=\$(cat "\${DEPLOY_DIR}/previous_release")
        ln -sfn "$prev" "$CURRENT_LINK"
        sudo systemctl restart "$APP_NAME"
        log "Rolled back to $prev"
    fi
}

# Main
log "Starting deploy of $ARTIFACT"
validate
backup
deploy
restart_service
health_check
DEPLOY_SUCCESS=true
log "Deploy completed successfully"

# Cleanup old releases (keep last 5)
ls -dt "\${RELEASES_DIR}"/*/ | tail -n +6 | xargs rm -rf
log "Cleaned up old releases"`
        },
        {
          name: 'Log Analysis & Monitoring',
          explanation: 'Shell scripts for real-time log monitoring, alerting, and report generation. Combine tail -f with grep for live filtering, use awk for aggregation, and send alerts via curl to Slack or email. Logrotate configuration manages log file sizes and retention.',
          codeExample: `#!/bin/bash
# === Real-time Error Monitor with Alerting ===
LOG_FILE="/var/log/app/application.log"
SLACK_WEBHOOK="https://hooks.slack.com/services/xxx"
ERROR_THRESHOLD=10
CHECK_INTERVAL=300  # 5 minutes

send_alert() {
    local message="$1"
    curl -s -X POST "$SLACK_WEBHOOK" \\
        -H 'Content-Type: application/json' \\
        -d "{\"text\": \"$message\"}" > /dev/null
}

# Count errors in last N seconds
count_recent_errors() {
    local seconds="$1"
    local since=\$(date -d "-\${seconds} seconds" '+%Y-%m-%d %H:%M:%S')
    awk -v since="$since" '$0 >= since && /ERROR/' "$LOG_FILE" | wc -l
}

# === Log Analysis One-Liners ===

# Errors per hour
awk '/ERROR/ {print substr(\$1,1,13)}' app.log | sort | uniq -c

# Top 10 error messages
grep "ERROR" app.log | awk -F'ERROR' '{print \$2}' | \\
    sort | uniq -c | sort -rn | head -10

# Response time percentiles
awk '/response_time/ {print \$NF}' access.log | sort -n | \\
    awk '{a[NR]=\$1} END {
        print "P50:", a[int(NR*0.5)];
        print "P95:", a[int(NR*0.95)];
        print "P99:", a[int(NR*0.99)];
    }'

# Requests per second over time
awk '{print \$4}' access.log | cut -d: -f1-3 | sort | uniq -c

# === Logrotate Configuration ===
# /etc/logrotate.d/myapp
# /var/log/myapp/*.log {
#     daily
#     rotate 30
#     compress
#     delaycompress
#     missingok
#     notifempty
#     create 0644 appuser appgroup
#     postrotate
#         systemctl reload myapp
#     endscript
# }

# === Backup Script ===
#!/bin/bash
BACKUP_DIR="/backup/\$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

# Database backup
pg_dump -Fc mydb > "\${BACKUP_DIR}/db.dump"

# Application config backup
tar czf "\${BACKUP_DIR}/config.tar.gz" /etc/myapp/

# Verify backup
if [[ -s "\${BACKUP_DIR}/db.dump" ]]; then
    echo "Backup successful: \$(du -sh "\${BACKUP_DIR}")"
else
    echo "Backup FAILED" >&2
    exit 1
fi

# Cleanup backups older than 30 days
find /backup -maxdepth 1 -mtime +30 -exec rm -rf {} +`
        },
        {
          name: 'Environment Setup Scripts',
          explanation: 'Bootstrap scripts automate development environment and server setup. They handle package installation, configuration file generation, service setup, and validation. Use feature detection over OS detection where possible, and make scripts idempotent so they can be safely re-run.',
          codeExample: `#!/bin/bash
set -euo pipefail

# === Server Bootstrap Script ===
log() { echo "[SETUP] $*"; }

# Detect OS
if [[ -f /etc/debian_version ]]; then
    PKG_MANAGER="apt"
    PKG_INSTALL="apt install -y"
    apt update
elif [[ -f /etc/redhat-release ]]; then
    PKG_MANAGER="yum"
    PKG_INSTALL="yum install -y"
else
    echo "Unsupported OS" >&2; exit 1
fi

# Install packages (idempotent)
install_if_missing() {
    for pkg in "$@"; do
        if ! command -v "$pkg" &>/dev/null; then
            log "Installing $pkg..."
            sudo $PKG_INSTALL "$pkg"
        else
            log "$pkg already installed"
        fi
    done
}

install_if_missing git curl wget jq htop

# Create application user
if ! id -u deploy &>/dev/null; then
    sudo useradd -m -s /bin/bash deploy
    sudo usermod -aG sudo deploy
    log "Created deploy user"
fi

# Setup SSH keys
DEPLOY_HOME="/home/deploy"
sudo mkdir -p "\${DEPLOY_HOME}/.ssh"
sudo chmod 700 "\${DEPLOY_HOME}/.ssh"

# Generate config from template
generate_config() {
    local env="\${1:-production}"
    cat > /etc/myapp/config.yml {'<'}<YAML
environment: \$env
database:
  host: \${DB_HOST:-localhost}
  port: \${DB_PORT:-5432}
  name: \${DB_NAME:-myapp}
logging:
  level: \${LOG_LEVEL:-info}
  file: /var/log/myapp/app.log
YAML
    log "Generated config for \$env environment"
}

# Setup systemd service
setup_service() {
    cat > /etc/systemd/system/myapp.service {'<'}<EOF
[Unit]
Description=My Application
After=network.target postgresql.service

[Service]
Type=simple
User=deploy
WorkingDirectory=/opt/myapp/current
ExecStart=/usr/bin/java -jar app.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
    sudo systemctl daemon-reload
    sudo systemctl enable myapp
    log "Service configured"
}

# Main
log "Starting server setup"
install_if_missing git curl wget jq
generate_config "\${APP_ENV:-production}"
setup_service
log "Setup complete"`
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
      background: 'linear-gradient(to bottom right, #111827, #0a1f0a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <Breadcrumb
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          section={breadcrumb?.section}
          category={breadcrumb?.category}
          topic={breadcrumb?.topic || 'Unix Scripting'}
          colors={breadcrumb?.colors || UNIX_COLORS}
        />

        <CollapsibleSidebar
          items={concepts}
          selectedIndex={selectedConceptIndex}
          onSelect={(index) => { setSelectedConceptIndex(index); setSelectedDetailIndex(0) }}
          title="Topics"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={UNIX_COLORS.primary}
        />

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          {onPrevious ? (
            <button onClick={onPrevious} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(74, 222, 128, 0.2)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '0.5rem', color: '#86efac', cursor: 'pointer', fontSize: '0.85rem' }}>
              ← {previousName || 'Previous'}
            </button>
          ) : <div />}
          {onNext ? (
            <button onClick={onNext} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(74, 222, 128, 0.2)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '0.5rem', color: '#86efac', cursor: 'pointer', fontSize: '0.85rem' }}>
              {nextName || 'Next'} →
            </button>
          ) : <div />}
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#4ade80' }}>Unix Scripting</h1>
        <p style={{ fontSize: '1.1rem', color: '#d1d5db', marginBottom: '2rem', lineHeight: '1.6' }}>
          Shell scripting, command-line tools, and Unix automation for DevOps workflows and system administration.
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

export default UnixScripting

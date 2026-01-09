import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function GoogleDocs({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-blue-700 hover:border-blue-600 text-blue-300 hover:text-blue-200 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
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
        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'components', 'dataflow', 'scalability', 'tradeoffs'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-blue-400 bg-blue-900/30 border-b-2 border-blue-400 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'components' && 'Core Components'}
              {tab === 'dataflow' && 'Data Flow'}
              {tab === 'scalability' && 'Scalability'}
              {tab === 'tradeoffs' && 'Trade-offs'}
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
                <svg viewBox="0 0 1000 700" className="w-full h-auto">
                  <defs>
                    <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="wsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="serviceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
                    </linearGradient>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#9ca3af" />
                    </marker>
                  </defs>

                  {/* Title */}
                  <text x="500" y="30" fontSize="20" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">
                    Google Docs System Architecture
                  </text>

                  {/* Clients */}
                  <g>
                    <rect x="50" y="80" width="140" height="80" fill="url(#clientGrad)" stroke="#2563eb" strokeWidth="2" rx="8" />
                    <text x="120" y="110" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Client A</text>
                    <text x="120" y="130" fontSize="12" fill="white" textAnchor="middle">(Web/Mobile)</text>
                    <text x="120" y="145" fontSize="11" fill="#dbeafe" textAnchor="middle">Real-time Editor</text>
                  </g>

                  <g>
                    <rect x="230" y="80" width="140" height="80" fill="url(#clientGrad)" stroke="#2563eb" strokeWidth="2" rx="8" />
                    <text x="300" y="110" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Client B</text>
                    <text x="300" y="130" fontSize="12" fill="white" textAnchor="middle">(Web/Mobile)</text>
                    <text x="300" y="145" fontSize="11" fill="#dbeafe" textAnchor="middle">Real-time Editor</text>
                  </g>

                  <g>
                    <rect x="410" y="80" width="140" height="80" fill="url(#clientGrad)" stroke="#2563eb" strokeWidth="2" rx="8" />
                    <text x="480" y="110" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Client C</text>
                    <text x="480" y="130" fontSize="12" fill="white" textAnchor="middle">(Web/Mobile)</text>
                    <text x="480" y="145" fontSize="11" fill="#dbeafe" textAnchor="middle">Real-time Editor</text>
                  </g>

                  {/* Load Balancer */}
                  <rect x="200" y="210" width="200" height="50" fill="#6366f1" stroke="#4f46e5" strokeWidth="2" rx="6" />
                  <text x="300" y="240" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Load Balancer / API Gateway</text>

                  {/* WebSocket Servers */}
                  <text x="300" y="310" fontSize="16" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">WebSocket Server Cluster</text>

                  <g>
                    <rect x="80" y="330" width="130" height="70" fill="url(#wsGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="145" y="355" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">WS Server 1</text>
                    <text x="145" y="372" fontSize="11" fill="white" textAnchor="middle">Sticky Sessions</text>
                    <text x="145" y="387" fontSize="10" fill="#d1fae5" textAnchor="middle">Doc: 123, 456...</text>
                  </g>

                  <g>
                    <rect x="235" y="330" width="130" height="70" fill="url(#wsGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="300" y="355" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">WS Server 2</text>
                    <text x="300" y="372" fontSize="11" fill="white" textAnchor="middle">Sticky Sessions</text>
                    <text x="300" y="387" fontSize="10" fill="#d1fae5" textAnchor="middle">Doc: 789, 101...</text>
                  </g>

                  <g>
                    <rect x="390" y="330" width="130" height="70" fill="url(#wsGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="455" y="355" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">WS Server N</text>
                    <text x="455" y="372" fontSize="11" fill="white" textAnchor="middle">Sticky Sessions</text>
                    <text x="455" y="387" fontSize="10" fill="#d1fae5" textAnchor="middle">Doc: 112...</text>
                  </g>

                  {/* Message Queue/Pub-Sub */}
                  <rect x="590" y="200" width="170" height="200" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="6" />
                  <text x="675" y="225" fontSize="14" fontWeight="bold" fill="#78350f" textAnchor="middle">Message Queue</text>
                  <text x="675" y="245" fontSize="12" fill="#78350f" textAnchor="middle">(Pub/Sub)</text>
                  <line x1="600" y1="250" x2="750" y2="250" stroke="#78350f" strokeWidth="1" />
                  <text x="675" y="275" fontSize="11" fill="#78350f" textAnchor="middle">Kafka / RabbitMQ</text>
                  <text x="675" y="295" fontSize="10" fill="#78350f" textAnchor="middle">Topics:</text>
                  <text x="675" y="312" fontSize="10" fill="#78350f" textAnchor="middle">• doc_edits</text>
                  <text x="675" y="327" fontSize="10" fill="#78350f" textAnchor="middle">• cursor_updates</text>
                  <text x="675" y="342" fontSize="10" fill="#78350f" textAnchor="middle">• presence</text>
                  <text x="675" y="365" fontSize="11" fontWeight="600" fill="#78350f" textAnchor="middle">Broadcast edits to</text>
                  <text x="675" y="382" fontSize="11" fontWeight="600" fill="#78350f" textAnchor="middle">all WS servers</text>

                  {/* Backend Services */}
                  <text x="300" y="460" fontSize="16" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">Backend Services</text>

                  <g>
                    <rect x="50" y="480" width="140" height="60" fill="url(#serviceGrad)" stroke="#7c3aed" strokeWidth="2" rx="6" />
                    <text x="120" y="502" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Document</text>
                    <text x="120" y="518" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Service</text>
                    <text x="120" y="532" fontSize="10" fill="#ede9fe" textAnchor="middle">CRUD operations</text>
                  </g>

                  <g>
                    <rect x="220" y="480" width="140" height="60" fill="url(#serviceGrad)" stroke="#7c3aed" strokeWidth="2" rx="6" />
                    <text x="290" y="502" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">OT/CRDT</text>
                    <text x="290" y="518" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Service</text>
                    <text x="290" y="532" fontSize="10" fill="#ede9fe" textAnchor="middle">Conflict resolution</text>
                  </g>

                  <g>
                    <rect x="390" y="480" width="140" height="60" fill="url(#serviceGrad)" stroke="#7c3aed" strokeWidth="2" rx="6" />
                    <text x="460" y="502" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Version History</text>
                    <text x="460" y="518" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Service</text>
                    <text x="460" y="532" fontSize="10" fill="#ede9fe" textAnchor="middle">Snapshots & diffs</text>
                  </g>

                  {/* Storage Layer */}
                  <text x="300" y="600" fontSize="16" fontWeight="bold" fill="#f3f4f6" textAnchor="middle">Storage Layer</text>

                  <g>
                    <rect x="50" y="620" width="140" height="60" fill="url(#dbGrad)" stroke="#d97706" strokeWidth="2" rx="6" />
                    <text x="120" y="642" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">PostgreSQL /</text>
                    <text x="120" y="658" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">MongoDB</text>
                    <text x="120" y="672" fontSize="10" fill="#fef3c7" textAnchor="middle">Documents</text>
                  </g>

                  <g>
                    <rect x="220" y="620" width="140" height="60" fill="url(#dbGrad)" stroke="#d97706" strokeWidth="2" rx="6" />
                    <text x="290" y="642" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Redis</text>
                    <text x="290" y="658" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Cache</text>
                    <text x="290" y="672" fontSize="10" fill="#fef3c7" textAnchor="middle">Active docs cache</text>
                  </g>

                  <g>
                    <rect x="390" y="620" width="140" height="60" fill="url(#dbGrad)" stroke="#d97706" strokeWidth="2" rx="6" />
                    <text x="460" y="642" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Object Storage</text>
                    <text x="460" y="658" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">(S3/GCS)</text>
                    <text x="460" y="672" fontSize="10" fill="#fef3c7" textAnchor="middle">History snapshots</text>
                  </g>

                  {/* CDN */}
                  <rect x="800" y="80" width="150" height="80" fill="#4338ca" stroke="#6366f1" strokeWidth="2" rx="6" />
                  <text x="875" y="110" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">CDN</text>
                  <text x="875" y="130" fontSize="11" fill="#c7d2fe" textAnchor="middle">Static Assets</text>
                  <text x="875" y="145" fontSize="10" fill="#a5b4fc" textAnchor="middle">Editor JS/CSS</text>

                  {/* Arrows */}
                  <path d="M 120 160 L 240 210" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />
                  <path d="M 300 160 L 300 210" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />
                  <path d="M 480 160 L 360 210" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />

                  <path d="M 210 260 L 145 330" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />
                  <path d="M 300 260 L 300 330" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />
                  <path d="M 390 260 L 455 330" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />

                  <path d="M 520 365 L 590 300" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 300 400 L 675 400" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 145 400 L 145 480" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />

                  <path d="M 120 540 L 120 620" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />
                  <path d="M 290 540 L 290 620" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />
                  <path d="M 460 540 L 460 620" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />
                </svg>
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

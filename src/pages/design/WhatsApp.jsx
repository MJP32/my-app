import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function WhatsApp({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'components', label: '🔧 Core Components', icon: '🔧' },
    { id: 'dataflow', label: '🔄 Data Flow', icon: '🔄' },
    { id: 'scalability', label: '📈 Scalability', icon: '📈' },
    { id: 'tradeoffs', label: '⚖️ Trade-offs', icon: '⚖️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gray-800 rounded-2xl shadow-lg p-6 border-l-8 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              style={{
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
            <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-3">
              <span className="text-5xl">💬</span>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                WhatsApp System Design
              </span>
            </h1>
            <div className="w-24"></div>
          </div>
          <p className="text-gray-300 text-lg text-center">
            Design a messaging platform like WhatsApp with real-time messaging, end-to-end encryption, group chats, media sharing, and billions of messages daily
          </p>
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
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: activeTab === tab.id ? '#374151' : 'transparent',
                color: activeTab === tab.id ? '#4ade80' : '#9ca3af',
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Requirements */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">📝</span>
                System Requirements
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-400 mb-3">✅ Functional Requirements</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>1-on-1 Messaging:</strong> Send/receive text messages in real-time</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Group Chats:</strong> Support up to 256 members per group</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Media Sharing:</strong> Images, videos, audio, documents (up to 2GB)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>End-to-End Encryption:</strong> Messages encrypted with Signal Protocol</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Delivery Status:</strong> Sent (✓), delivered (✓✓), read (blue ✓✓)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Online Status:</strong> Show when users are online, last seen</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Voice/Video Calls:</strong> 1-on-1 and group calls (up to 8 participants)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-orange-400 mb-3">⚡ Non-Functional Requirements</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Low Latency:</strong> Message delivery &lt;100ms (same region)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>High Availability:</strong> 99.99% uptime for messaging</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Scalability:</strong> Support 2 billion users, 100B messages/day</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Consistency:</strong> At-least-once delivery guarantee</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Security:</strong> End-to-end encryption, no server can read messages</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Offline Support:</strong> Queue messages when recipient is offline</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-emerald-400">🏗️</span>
                High-Level Architecture
              </h2>

              <div className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 p-8 rounded-xl border-2 border-emerald-700">
                <svg viewBox="0 0 1400 900" className="w-full h-auto">
                  {/* Clients */}
                  <rect x="50" y="50" width="160" height="70" fill="#25d366" rx="8"/>
                  <text x="130" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Mobile Client A</text>
                  <text x="130" y="100" textAnchor="middle" fill="white" fontSize="11">User 1</text>

                  <rect x="250" y="50" width="160" height="70" fill="#25d366" rx="8"/>
                  <text x="330" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Mobile Client B</text>
                  <text x="330" y="100" textAnchor="middle" fill="white" fontSize="11">User 2</text>

                  <rect x="450" y="50" width="160" height="70" fill="#25d366" rx="8"/>
                  <text x="530" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Web Client</text>
                  <text x="530" y="100" textAnchor="middle" fill="white" fontSize="11">WhatsApp Web</text>

                  {/* Load Balancer */}
                  <rect x="200" y="170" width="260" height="60" fill="#8b5cf6" rx="8"/>
                  <text x="330" y="205" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Load Balancer</text>

                  {/* WebSocket Gateway */}
                  <rect x="200" y="270" width="260" height="60" fill="#6366f1" rx="8"/>
                  <text x="330" y="305" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">WebSocket Gateway Cluster</text>

                  {/* Services */}
                  <rect x="50" y="380" width="160" height="90" fill="#10b981" rx="8"/>
                  <text x="130" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Message Service</text>
                  <text x="130" y="430" textAnchor="middle" fill="white" fontSize="10">Send/Receive</text>
                  <text x="130" y="448" textAnchor="middle" fill="white" fontSize="10">Encryption</text>

                  <rect x="240" y="380" width="160" height="90" fill="#f59e0b" rx="8"/>
                  <text x="320" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Group Chat Service</text>
                  <text x="320" y="430" textAnchor="middle" fill="white" fontSize="10">Fan-out Messages</text>
                  <text x="320" y="448" textAnchor="middle" fill="white" fontSize="10">Member Management</text>

                  <rect x="430" y="380" width="160" height="90" fill="#ef4444" rx="8"/>
                  <text x="510" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Media Service</text>
                  <text x="510" y="430" textAnchor="middle" fill="white" fontSize="10">Upload/Download</text>
                  <text x="510" y="448" textAnchor="middle" fill="white" fontSize="10">Compression</text>

                  <rect x="620" y="380" width="160" height="90" fill="#ec4899" rx="8"/>
                  <text x="700" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Presence Service</text>
                  <text x="700" y="430" textAnchor="middle" fill="white" fontSize="10">Online/Offline</text>
                  <text x="700" y="448" textAnchor="middle" fill="white" fontSize="10">Last Seen</text>

                  <rect x="810" y="380" width="160" height="90" fill="#8b5cf6" rx="8"/>
                  <text x="890" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Auth Service</text>
                  <text x="890" y="430" textAnchor="middle" fill="white" fontSize="10">Phone Verification</text>
                  <text x="890" y="448" textAnchor="middle" fill="white" fontSize="10">Session Management</text>

                  <rect x="1000" y="380" width="160" height="90" fill="#06b6d4" rx="8"/>
                  <text x="1080" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Notification Service</text>
                  <text x="1080" y="430" textAnchor="middle" fill="white" fontSize="10">Push Notifications</text>
                  <text x="1080" y="448" textAnchor="middle" fill="white" fontSize="10">FCM/APNS</text>

                  {/* Message Queue */}
                  <rect x="200" y="520" width="260" height="60" fill="#f97316" rx="8"/>
                  <text x="330" y="545" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Message Queue (Kafka)</text>
                  <text x="330" y="565" textAnchor="middle" fill="white" fontSize="11">Async Processing</text>

                  {/* Cache Layer */}
                  <rect x="620" y="520" width="340" height="60" fill="#06b6d4" rx="8"/>
                  <text x="790" y="545" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Cache Layer (Redis)</text>
                  <text x="790" y="565" textAnchor="middle" fill="white" fontSize="11">Sessions, Online Status, Recent Messages</text>

                  {/* Databases */}
                  <rect x="50" y="630" width="160" height="80" fill="#334155" rx="8"/>
                  <text x="130" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Message DB</text>
                  <text x="130" y="680" textAnchor="middle" fill="white" fontSize="10">Cassandra</text>

                  <rect x="240" y="630" width="160" height="80" fill="#334155" rx="8"/>
                  <text x="320" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">User DB</text>
                  <text x="320" y="680" textAnchor="middle" fill="white" fontSize="10">PostgreSQL</text>

                  <rect x="430" y="630" width="160" height="80" fill="#334155" rx="8"/>
                  <text x="510" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Group DB</text>
                  <text x="510" y="680" textAnchor="middle" fill="white" fontSize="10">PostgreSQL</text>

                  <rect x="620" y="630" width="160" height="80" fill="#059669" rx="8"/>
                  <text x="700" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Media Storage</text>
                  <text x="700" y="680" textAnchor="middle" fill="white" fontSize="10">S3/MinIO</text>

                  <rect x="810" y="630" width="160" height="80" fill="#0891b2" rx="8"/>
                  <text x="890" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">CDN</text>
                  <text x="890" y="680" textAnchor="middle" fill="white" fontSize="10">CloudFront</text>

                  <rect x="1000" y="630" width="160" height="80" fill="#7c3aed" rx="8"/>
                  <text x="1080" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Analytics DB</text>
                  <text x="1080" y="680" textAnchor="middle" fill="white" fontSize="10">ClickHouse</text>

                  {/* Connections */}
                  <path d="M 130 120 L 330 170" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  <path d="M 330 120 L 330 170" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  <path d="M 530 120 L 330 170" stroke="#8b5cf6" strokeWidth="2" fill="none"/>

                  <path d="M 330 230 L 330 270" stroke="#6366f1" strokeWidth="2" fill="none"/>

                  <path d="M 330 330 L 130 380" stroke="#10b981" strokeWidth="2" fill="none"/>
                  <path d="M 330 330 L 320 380" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <path d="M 330 330 L 510 380" stroke="#ef4444" strokeWidth="2" fill="none"/>
                  <path d="M 330 330 L 700 380" stroke="#ec4899" strokeWidth="2" fill="none"/>

                  <path d="M 130 470 L 330 520" stroke="#f97316" strokeWidth="2" fill="none"/>
                  <path d="M 320 470 L 330 520" stroke="#f97316" strokeWidth="2" fill="none"/>
                  <path d="M 510 470 L 330 520" stroke="#f97316" strokeWidth="2" fill="none"/>

                  <path d="M 700 470 L 790 520" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                  <path d="M 1080 470 L 790 520" stroke="#06b6d4" strokeWidth="2" fill="none"/>

                  <path d="M 130 470 L 130 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 320 470 L 320 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 320 470 L 510 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 510 470 L 700 630" stroke="#059669" strokeWidth="2" fill="none"/>
                  <path d="M 510 470 L 890 630" stroke="#0891b2" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="font-bold text-green-400 mb-2">Client Layer</div>
                  <div className="text-sm text-green-300">Mobile and web clients maintain persistent WebSocket connections</div>
                </div>
                <div className="bg-emerald-900/30 p-4 rounded-lg border-l-4 border-emerald-500">
                  <div className="font-bold text-emerald-400 mb-2">Service Layer</div>
                  <div className="text-sm text-emerald-300">Microservices handle messaging, media, groups, and presence</div>
                </div>
                <div className="bg-teal-900/30 p-4 rounded-lg border-l-4 border-teal-500">
                  <div className="font-bold text-teal-400 mb-2">Data Layer</div>
                  <div className="text-sm text-teal-300">Distributed databases with Redis for caching and S3 for media</div>
                </div>
              </div>
            </div>

            {/* Scale Estimates */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-400">📊</span>
                Scale & Capacity Estimates
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border-2 border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-4 text-lg">User Base & Traffic</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Total users: <strong>2 billion</strong></div>
                    <div>• Daily active users (DAU): <strong>600 million</strong></div>
                    <div>• Average messages per user/day: <strong>~170</strong></div>
                    <div>• Total messages per day: <strong>~100 billion</strong></div>
                    <div>• Messages per second: <strong>~1.2 million QPS</strong></div>
                    <div>• Peak traffic: <strong>~4 million QPS</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border-2 border-green-700">
                  <h3 className="font-bold text-green-400 mb-4 text-lg">Storage Requirements</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Average message size: <strong>~100 bytes</strong></div>
                    <div>• Daily message storage: <strong>10 TB/day</strong></div>
                    <div>• 5-year message storage: <strong>~18 PB</strong></div>
                    <div>• Media per day: <strong>~1 billion files</strong></div>
                    <div>• Average media size: <strong>~500 KB</strong></div>
                    <div>• Daily media storage: <strong>~500 TB/day</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border-2 border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-4 text-lg">WebSocket Connections</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Concurrent connections: <strong>~300 million</strong></div>
                    <div>• Connections per server: <strong>~50,000</strong></div>
                    <div>• Required servers: <strong>~6,000</strong></div>
                    <div>• Connection overhead: <strong>~5 KB per connection</strong></div>
                    <div>• Total memory for connections: <strong>~1.5 TB</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-6 rounded-xl border-2 border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-4 text-lg">Bandwidth Estimates</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Message traffic: <strong>~120 MB/s</strong></div>
                    <div>• Media upload: <strong>~6 GB/s</strong></div>
                    <div>• Media download: <strong>~60 GB/s</strong></div>
                    <div>• Total bandwidth: <strong>~66 GB/s (~530 Gbps)</strong></div>
                    <div>• Peak bandwidth: <strong>~2 Tbps</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional tabs would continue here with similar structure... */}
        {/* For brevity, I'll indicate the remaining tabs need similar comprehensive content */}

        {activeTab === 'components' && (
          <div className="space-y-8">
            {/* Message Service */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">💬</span>
                1. Message Service
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-400 mb-3">Responsibilities</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Message Routing:</strong> Route messages to recipients through WebSocket connections</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Encryption:</strong> Handle Signal Protocol key exchange and encryption</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Delivery Receipts:</strong> Track sent/delivered/read status</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Offline Queue:</strong> Store messages for offline users</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Message Persistence:</strong> Store encrypted messages in Cassandra</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">Implementation</h3>
                  <div className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-gray-300 space-y-2">
                    <div className="text-green-400">// Message delivery flow</div>
                    <div>1. Client sends encrypted message</div>
                    <div>2. Message Service receives via WebSocket</div>
                    <div>3. Store in Cassandra (encrypted)</div>
                    <div>4. Check if recipient online (Redis)</div>
                    <div>5. If online: push via WebSocket</div>
                    <div>6. If offline: queue + send push notification</div>
                    <div>7. Send delivery receipt to sender</div>
                    <div className="mt-3 text-orange-400">// At-least-once delivery</div>
                    <div>• Use message IDs for deduplication</div>
                    <div>• Retry with exponential backoff</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                <div className="font-bold text-green-400 mb-2">Key Technology</div>
                <div className="text-sm text-green-300">
                  <strong>Signal Protocol:</strong> Implements Perfect Forward Secrecy (PFS) using Double Ratchet Algorithm.
                  Each message encrypted with unique key. Server never has access to decryption keys.
                </div>
              </div>
            </div>

            {/* Media Service */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-red-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-red-400">📎</span>
                2. Media Service
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-red-400 mb-3">Responsibilities</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Upload:</strong> Handle images, videos, audio, documents (up to 2GB)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Compression:</strong> Compress images/videos to reduce bandwidth</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Encryption:</strong> Encrypt media files (AES-256)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Storage:</strong> Store in S3/MinIO with CDN delivery</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Thumbnails:</strong> Generate thumbnails for images and video</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">Media Pipeline</h3>
                  <div className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-gray-300 space-y-2">
                    <div className="text-red-400">// Upload Flow</div>
                    <div>1. Client requests upload URL (signed)</div>
                    <div>2. Client encrypts media locally</div>
                    <div>3. Upload to S3 via presigned URL</div>
                    <div>4. Async: compress + generate thumbnails</div>
                    <div>5. Send media reference in message</div>
                    <div className="mt-3 text-orange-400">// Download Flow</div>
                    <div>1. Client requests download URL</div>
                    <div>2. Serve from CDN (cached)</div>
                    <div>3. Client decrypts locally</div>
                    <div>4. Display to user</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-red-900/30 p-4 rounded-lg border-l-4 border-red-500">
                  <div className="font-bold text-red-400 mb-2">Image Compression</div>
                  <div className="text-sm text-red-300">JPEG/WebP with 80% quality. Resize to max 1600px width.</div>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="font-bold text-orange-400 mb-2">Video Compression</div>
                  <div className="text-sm text-orange-300">H.264 codec, 720p max, 1.5Mbps bitrate for bandwidth efficiency.</div>
                </div>
                <div className="bg-amber-900/30 p-4 rounded-lg border-l-4 border-amber-500">
                  <div className="font-bold text-amber-400 mb-2">E2E Encryption</div>
                  <div className="text-sm text-amber-300">AES-256 encryption. Keys shared via Signal Protocol messages.</div>
                </div>
              </div>
            </div>

            {/* Group Chat Service */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-amber-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-amber-400">👥</span>
                3. Group Chat Service
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-amber-400 mb-3">Responsibilities</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span><strong>Group Management:</strong> Create, update, delete groups (up to 256 members)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span><strong>Member Operations:</strong> Add/remove members, admin permissions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span><strong>Message Fan-out:</strong> Distribute messages to all group members</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span><strong>Sender Key:</strong> Use Sender Key protocol for group encryption</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span><strong>Delivery Tracking:</strong> Track which members received/read messages</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">Group Message Flow</h3>
                  <div className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-gray-300 space-y-2">
                    <div className="text-amber-400">// Sender Key Protocol</div>
                    <div>1. Group creator generates sender key</div>
                    <div>2. Distribute key to all members (encrypted)</div>
                    <div>3. Member sends message encrypted with sender key</div>
                    <div>4. Fan-out to all members via Message Service</div>
                    <div>5. Each member decrypts with sender key</div>
                    <div className="mt-3 text-orange-400">// Key Rotation</div>
                    <div>• Rotate sender key when member leaves</div>
                    <div>• Prevents removed members from reading new messages</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-amber-900/30 p-4 rounded-lg border-l-4 border-amber-500">
                <div className="font-bold text-amber-400 mb-2">Fan-out Strategy</div>
                <div className="text-sm text-amber-300">
                  Use <strong>fan-out on write</strong> for groups. Single message from sender → N copies to N members.
                  Cache group member lists in Redis for fast lookup. Use Kafka for async fan-out processing.
                </div>
              </div>
            </div>

            {/* Presence Service */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-pink-400">🟢</span>
                4. Presence Service
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-pink-400 mb-3">Responsibilities</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span><strong>Online Status:</strong> Track online/offline status of users</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span><strong>Last Seen:</strong> Store last active timestamp</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span><strong>Typing Indicators:</strong> Show when user is typing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span><strong>Heartbeats:</strong> Monitor active WebSocket connections</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span><strong>Privacy Settings:</strong> Control who sees online status</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">Implementation</h3>
                  <div className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-gray-300 space-y-2">
                    <div className="text-pink-400">// Redis for Presence</div>
                    <div>Key: user:&lt;user_id&gt;:presence</div>
                    <div>Value: &#123; online: true, lastSeen: timestamp &#125;</div>
                    <div>TTL: 60 seconds (refresh via heartbeat)</div>
                    <div className="mt-3 text-orange-400">// Heartbeat Protocol</div>
                    <div>• Client sends heartbeat every 30s</div>
                    <div>• Server updates Redis TTL</div>
                    <div>• If no heartbeat: mark offline after TTL expires</div>
                    <div className="mt-3 text-green-400">// Typing Indicator</div>
                    <div>• Broadcast "typing" event to chat participants</div>
                    <div>• Stop after 5s of no activity</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-pink-900/30 p-4 rounded-lg border-l-4 border-pink-500">
                <div className="font-bold text-pink-400 mb-2">Scalability</div>
                <div className="text-sm text-pink-300">
                  Store presence in Redis Cluster with replication. Use pub/sub for typing indicators.
                  Cache "last seen" in Redis with write-through to PostgreSQL for persistence.
                </div>
              </div>
            </div>

            {/* Auth Service */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-purple-400">🔐</span>
                5. Authentication Service
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">Responsibilities</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span><strong>Phone Verification:</strong> SMS/voice OTP for registration</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span><strong>Session Management:</strong> JWT tokens with refresh mechanism</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span><strong>Multi-device:</strong> Support up to 5 linked devices per account</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span><strong>Key Management:</strong> Store public keys for E2E encryption</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span><strong>2FA:</strong> Optional two-factor authentication (PIN)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">Registration Flow</h3>
                  <div className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-gray-300 space-y-2">
                    <div className="text-purple-400">// Phone Number Verification</div>
                    <div>1. User enters phone number</div>
                    <div>2. Server sends 6-digit OTP via SMS</div>
                    <div>3. User submits OTP</div>
                    <div>4. Server validates OTP</div>
                    <div>5. Create user account in PostgreSQL</div>
                    <div>6. Generate identity keys (Signal Protocol)</div>
                    <div>7. Issue JWT access + refresh tokens</div>
                    <div>8. Store session in Redis</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="font-bold text-purple-400 mb-2">Multi-Device Support</div>
                <div className="text-sm text-purple-300">
                  Each device has its own identity key pair. Messages sent to all devices of a recipient.
                  Use device IDs in message routing. Sync message history via end-to-end encrypted backup.
                </div>
              </div>
            </div>

            {/* Notification Service */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">🔔</span>
                6. Notification Service
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">Responsibilities</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">•</span>
                      <span><strong>Push Notifications:</strong> FCM (Android) and APNS (iOS)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">•</span>
                      <span><strong>Message Alerts:</strong> Notify users of new messages when offline</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">•</span>
                      <span><strong>Privacy:</strong> Don't include message content (E2E encrypted)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">•</span>
                      <span><strong>Batching:</strong> Batch multiple messages to reduce battery drain</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">•</span>
                      <span><strong>Custom Settings:</strong> Mute, notification sounds, vibration patterns</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">Notification Flow</h3>
                  <div className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-gray-300 space-y-2">
                    <div className="text-cyan-400">// Push Notification</div>
                    <div>1. Message Service detects offline recipient</div>
                    <div>2. Publish to Kafka notification topic</div>
                    <div>3. Notification Service consumes event</div>
                    <div>4. Check user preferences (muted?)</div>
                    <div>5. Send to FCM/APNS</div>
                    <div>6. Notification: "New message from [Sender]"</div>
                    <div className="mt-3 text-orange-400">// Privacy Consideration</div>
                    <div>• Never include encrypted message content</div>
                    <div>• Only sender name + generic alert</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-cyan-900/30 p-4 rounded-lg border-l-4 border-cyan-500">
                <div className="font-bold text-cyan-400 mb-2">Optimization</div>
                <div className="text-sm text-cyan-300">
                  Batch notifications: If user receives 5 messages in 10s, send single notification "5 new messages from [Sender]".
                  Use silent push for delivery receipts. Respect quiet hours and mute settings.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dataflow' && (
          <div className="space-y-8">
            {/* 1-on-1 Message Flow */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-600">💬</span>
                1-on-1 Message Delivery Flow
              </h2>

              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border-2 border-green-700">
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <strong className="text-green-400">Client A Encryption:</strong>
                      <div className="text-gray-300 mt-1">User A types message → Encrypt with Signal Protocol using recipient's public key → Generate unique message ID → Send via WebSocket to Gateway</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <strong className="text-green-400">WebSocket Gateway:</strong>
                      <div className="text-gray-300 mt-1">Authenticate WebSocket connection → Route to Message Service based on sender ID → Maintain persistent connection for real-time delivery</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <strong className="text-green-400">Message Service Processing:</strong>
                      <div className="text-gray-300 mt-1">Validate message → Check recipient exists → Store encrypted message in Cassandra (partitioned by user ID) → Generate delivery receipt</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                    <div>
                      <strong className="text-green-400">Presence Check:</strong>
                      <div className="text-gray-300 mt-1">Query Redis for recipient online status → If online: get WebSocket server ID → If offline: add to offline queue + trigger notification</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</div>
                    <div>
                      <strong className="text-green-400">Delivery to Recipient:</strong>
                      <div className="text-gray-300 mt-1">If online: push encrypted message via WebSocket to Client B → Client B decrypts locally with private key → Display message</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">6</div>
                    <div>
                      <strong className="text-green-400">Delivery Receipts:</strong>
                      <div className="text-gray-300 mt-1">Client B sends "delivered" receipt → Server forwards to Client A (✓✓) → When user reads: send "read" receipt → Forward to Client A (blue ✓✓)</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">7</div>
                    <div>
                      <strong className="text-green-400">Offline Queue:</strong>
                      <div className="text-gray-300 mt-1">If recipient offline: store in offline queue (Cassandra) → When client comes online: fetch all queued messages → Deliver in order → Clear queue</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">8</div>
                    <div>
                      <strong className="text-green-400">Push Notification:</strong>
                      <div className="text-gray-300 mt-1">For offline users: Notification Service sends push via FCM/APNS → Generic notification "New message from [Name]" (no content for privacy)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="font-bold text-green-400 mb-2">Message Structure</div>
                  <div className="text-sm text-green-300 font-mono">
                    &#123; messageId, senderId, recipientId, encryptedContent, timestamp, type: "text" &#125;
                  </div>
                </div>
                <div className="bg-emerald-900/30 p-4 rounded-lg border-l-4 border-emerald-500">
                  <div className="font-bold text-emerald-400 mb-2">Latency</div>
                  <div className="text-sm text-emerald-300">
                    Same region: &lt;100ms | Cross-region: 200-500ms | Offline delivery: when user reconnects
                  </div>
                </div>
              </div>
            </div>

            {/* Group Message Flow */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-amber-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-amber-400">👥</span>
                Group Message Flow
              </h2>

              <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 p-6 rounded-xl border-2 border-amber-700">
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <strong className="text-amber-400">Sender Key Encryption:</strong>
                      <div className="text-gray-300 mt-1">User types message in group → Encrypt with group's sender key (shared secret) → Single encrypted message for all members</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <strong className="text-amber-400">Message Service Receives:</strong>
                      <div className="text-gray-300 mt-1">Validate message → Verify sender is group member → Fetch group member list from Redis cache (256 members max)</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <strong className="text-amber-400">Fan-out Processing:</strong>
                      <div className="text-gray-300 mt-1">Publish to Kafka topic for async processing → Group Chat Service consumes event → Create N copies (one per member) → Store in each member's Cassandra partition</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                    <div>
                      <strong className="text-amber-400">Delivery to Online Members:</strong>
                      <div className="text-gray-300 mt-1">Check presence for each member → Push to online members via WebSocket → Each client decrypts with sender key</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</div>
                    <div>
                      <strong className="text-amber-400">Offline Members:</strong>
                      <div className="text-gray-300 mt-1">Add to each offline member's queue → Send push notification → When they reconnect: fetch queued messages</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">6</div>
                    <div>
                      <strong className="text-amber-400">Read Receipts:</strong>
                      <div className="text-gray-300 mt-1">Track which members read message → Aggregate receipts → Show "Read by 15/20" to sender</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-amber-900/30 p-4 rounded-lg border-l-4 border-amber-500">
                <div className="font-bold text-amber-400 mb-2">Key Rotation on Member Removal</div>
                <div className="text-sm text-amber-300">
                  When member leaves: Generate new sender key → Distribute to remaining members via encrypted 1-on-1 messages →
                  Old member cannot decrypt new messages (forward secrecy maintained)
                </div>
              </div>
            </div>

            {/* Media Upload/Download Flow */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-red-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-red-400">📎</span>
                Media Upload & Download Flow
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 p-6 rounded-xl border-2 border-red-700">
                  <h3 className="font-bold text-red-400 mb-4 text-lg">Upload Flow</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">1.</span>
                      <div className="text-sm">User selects media (photo/video/document) in app</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">2.</span>
                      <div className="text-sm">Client generates AES-256 encryption key</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">3.</span>
                      <div className="text-sm">Encrypt media locally (never uploaded unencrypted)</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">4.</span>
                      <div className="text-sm">Request presigned S3 upload URL from Media Service</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">5.</span>
                      <div className="text-sm">Upload encrypted file directly to S3 (bypass server)</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">6.</span>
                      <div className="text-sm">S3 upload complete → trigger Lambda for processing</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">7.</span>
                      <div className="text-sm">Generate thumbnails (for images/videos)</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">8.</span>
                      <div className="text-sm">Send message with media reference + encryption key (encrypted via Signal Protocol)</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-xl border-2 border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-4 text-lg">Download Flow</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">1.</span>
                      <div className="text-sm">User opens chat → sees media thumbnail placeholder</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">2.</span>
                      <div className="text-sm">Client extracts media reference + decryption key from message</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">3.</span>
                      <div className="text-sm">Request download URL from Media Service</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">4.</span>
                      <div className="text-sm">Service returns CDN URL (cached at edge)</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">5.</span>
                      <div className="text-sm">Download encrypted media from CDN (fast)</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">6.</span>
                      <div className="text-sm">Decrypt locally with AES-256 key</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">7.</span>
                      <div className="text-sm">Display to user in chat</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">8.</span>
                      <div className="text-sm">Cache decrypted media locally for faster access</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-red-900/30 p-4 rounded-lg border-l-4 border-red-500">
                  <div className="font-bold text-red-400 mb-2">Security</div>
                  <div className="text-sm text-red-300">Media never stored unencrypted on server. S3 stores encrypted blobs only.</div>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="font-bold text-orange-400 mb-2">Performance</div>
                  <div className="text-sm text-orange-300">CDN caching reduces latency. Progressive download for large videos.</div>
                </div>
                <div className="bg-amber-900/30 p-4 rounded-lg border-l-4 border-amber-500">
                  <div className="font-bold text-amber-400 mb-2">Compression</div>
                  <div className="text-sm text-amber-300">Images: 80% JPEG quality. Videos: H.264, 720p max, 1.5Mbps.</div>
                </div>
              </div>
            </div>

            {/* Connection Lifecycle */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-purple-600">🔌</span>
                WebSocket Connection Lifecycle
              </h2>

              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border-2 border-purple-700">
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <strong className="text-purple-400">Connection Establishment:</strong>
                      <div className="text-gray-300 mt-1">Client sends WebSocket upgrade request → Load balancer routes to Gateway server → Auth Service validates JWT token → Connection established + stored in Redis</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <strong className="text-purple-400">Heartbeat Protocol:</strong>
                      <div className="text-gray-300 mt-1">Client sends ping every 30s → Server responds with pong → Update presence in Redis (TTL: 60s) → If no ping: connection considered dead</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <strong className="text-purple-400">Message Flow:</strong>
                      <div className="text-gray-300 mt-1">Bidirectional: Client sends → Server routes to recipient | Server pushes → Client receives → Real-time delivery via persistent connection</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                    <div>
                      <strong className="text-purple-400">Disconnection:</strong>
                      <div className="text-gray-300 mt-1">Network loss or app close → Remove from Redis presence → Mark offline → Queue new messages → Send push notifications</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</div>
                    <div>
                      <strong className="text-purple-400">Reconnection:</strong>
                      <div className="text-gray-300 mt-1">Client reconnects → Fetch all queued messages (pagination) → Mark as delivered → Update presence to online</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="font-bold text-purple-400 mb-2">Scalability</div>
                <div className="text-sm text-purple-300">
                  Each Gateway server handles ~50,000 concurrent WebSocket connections. 300M concurrent users require ~6,000 servers.
                  Use consistent hashing to route users to same server for session affinity.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scalability' && (
          <div className="space-y-8">
            {/* Database Sharding */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-600">💾</span>
                Database Sharding Strategy
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border-2 border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-4 text-lg">Cassandra (Messages)</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="text-sm">
                      <strong className="text-blue-400">Partition Key:</strong> user_id (ensures all user's messages on same node)
                    </div>
                    <div className="text-sm">
                      <strong className="text-blue-400">Clustering Key:</strong> timestamp (messages sorted by time)
                    </div>
                    <div className="text-sm">
                      <strong className="text-blue-400">Replication:</strong> RF=3 (3 copies across datacenters)
                    </div>
                    <div className="text-sm">
                      <strong className="text-blue-400">Consistency:</strong> QUORUM (balance consistency + availability)
                    </div>
                    <div className="text-sm">
                      <strong className="text-blue-400">Shards:</strong> 1000+ nodes for horizontal scaling
                    </div>
                    <div className="text-sm">
                      <strong className="text-blue-400">TTL:</strong> Messages auto-deleted after 30 days (configurable)
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border-2 border-green-700">
                  <h3 className="font-bold text-green-400 mb-4 text-lg">PostgreSQL (Users & Groups)</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="text-sm">
                      <strong className="text-green-400">Sharding:</strong> Hash-based on user_id / group_id
                    </div>
                    <div className="text-sm">
                      <strong className="text-green-400">Shards:</strong> 128 shards (grows with user base)
                    </div>
                    <div className="text-sm">
                      <strong className="text-green-400">Read Replicas:</strong> 5 replicas per master for read scaling
                    </div>
                    <div className="text-sm">
                      <strong className="text-green-400">Connection Pooling:</strong> PgBouncer for efficient connections
                    </div>
                    <div className="text-sm">
                      <strong className="text-green-400">Indexes:</strong> B-tree on phone_number, username for fast lookups
                    </div>
                    <div className="text-sm">
                      <strong className="text-green-400">Backup:</strong> Continuous archiving with PITR (Point-in-Time Recovery)
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="font-bold text-blue-400 mb-2">S3 Media Storage</div>
                  <div className="text-sm text-blue-300">
                    Partition by: /media/&#123;year&#125;/&#123;month&#125;/&#123;day&#125;/&#123;user_id&#125;/&#123;file_id&#125;
                    <br/>Lifecycle: Move to Glacier after 90 days for cost savings
                  </div>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="font-bold text-green-400 mb-2">Data Partitioning Benefits</div>
                  <div className="text-sm text-green-300">
                    Hot shard mitigation, independent scaling, fault isolation, faster queries
                  </div>
                </div>
              </div>
            </div>

            {/* Caching Strategy */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-red-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-red-600">⚡</span>
                Multi-Layer Caching
              </h2>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 p-6 rounded-xl border-2 border-red-700">
                  <h3 className="font-bold text-red-400 mb-4 text-lg">Redis Cluster Architecture</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="font-bold text-orange-400">Presence Cache</div>
                      <div className="text-sm text-gray-700">
                        • Online/offline status<br/>
                        • Last seen timestamps<br/>
                        • TTL: 60 seconds<br/>
                        • 300M concurrent users<br/>
                        • ~1.5 TB memory
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold text-orange-400">Session Cache</div>
                      <div className="text-sm text-gray-700">
                        • User sessions (JWT)<br/>
                        • WebSocket connections<br/>
                        • TTL: 24 hours<br/>
                        • Device mapping<br/>
                        • ~500 GB memory
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold text-orange-400">Message Cache</div>
                      <div className="text-sm text-gray-700">
                        • Recent messages (last hour)<br/>
                        • Group member lists<br/>
                        • TTL: 1 hour<br/>
                        • Write-through to Cassandra<br/>
                        • ~2 TB memory
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <div className="font-bold text-orange-400 mb-2">Redis Configuration</div>
                    <div className="text-sm text-orange-300">
                      Cluster mode: 100 shards | Replication: Master + 2 replicas | Eviction: LRU policy | Persistence: RDB snapshots
                    </div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                    <div className="font-bold text-amber-400 mb-2">CDN for Media</div>
                    <div className="text-sm text-amber-300">
                      CloudFront with 200+ edge locations | Cache images/videos/documents | TTL: 7 days | 95% cache hit rate
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Load Balancing & Auto-scaling */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-purple-600">⚖️</span>
                Load Balancing & Auto-scaling
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border-2 border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-4 text-lg">Load Balancer Hierarchy</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <strong className="text-purple-400">DNS Load Balancing (Route 53):</strong>
                        <div className="text-sm text-gray-300 mt-1">Geo-routing to nearest datacenter | Latency-based routing | Health checks with failover</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <strong className="text-purple-400">Application Load Balancer (ALB):</strong>
                        <div className="text-sm text-gray-300 mt-1">Distribute across WebSocket Gateway servers | Sticky sessions with cookies | HTTP/2 support</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <strong className="text-purple-400">Consistent Hashing:</strong>
                        <div className="text-sm text-gray-300 mt-1">Route user to same WebSocket server for session affinity | Virtual nodes for better distribution</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h3 className="font-bold text-green-400 mb-4">Auto-scaling Policies</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>WebSocket Gateways:</strong> Scale on CPU &gt; 70% or connection count &gt; 45K</div>
                      <div><strong>Message Service:</strong> Scale on message queue depth &gt; 10K</div>
                      <div><strong>Media Service:</strong> Scale on upload QPS &gt; 50K</div>
                      <div><strong>Cooldown:</strong> 5 minutes between scaling events</div>
                      <div><strong>Min/Max:</strong> Min 100 instances, Max 10,000 instances</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h3 className="font-bold text-blue-400 mb-4">Traffic Patterns</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Peak Hours:</strong> 6-10 PM local time (4x normal traffic)</div>
                      <div><strong>Geographic Distribution:</strong> Follow the sun pattern</div>
                      <div><strong>Predictive Scaling:</strong> Pre-scale before expected peaks</div>
                      <div><strong>Regional Isolation:</strong> Independent scaling per region</div>
                      <div><strong>Graceful Degradation:</strong> Offline queue when overloaded</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WebSocket Scaling */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-600">🔌</span>
                WebSocket Connection Management
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200">
                  <h3 className="font-bold text-cyan-900 mb-4 text-lg">Connection Distribution</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="text-sm">
                      <strong>Concurrent Connections:</strong> 300 million active users
                    </div>
                    <div className="text-sm">
                      <strong>Per Server Capacity:</strong> ~50,000 connections (16-core, 64GB RAM)
                    </div>
                    <div className="text-sm">
                      <strong>Total Servers:</strong> ~6,000 WebSocket Gateway servers
                    </div>
                    <div className="text-sm">
                      <strong>Memory per Connection:</strong> ~5 KB (1.5 TB total)
                    </div>
                    <div className="text-sm">
                      <strong>Deployment:</strong> Across 20 regions globally
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-green-50 p-6 rounded-xl border-2 border-teal-200">
                  <h3 className="font-bold text-teal-900 mb-4 text-lg">Connection Handling</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="text-sm">
                      <strong>Sticky Sessions:</strong> User always routed to same server
                    </div>
                    <div className="text-sm">
                      <strong>Connection Registry:</strong> Store in Redis (user_id → server_id)
                    </div>
                    <div className="text-sm">
                      <strong>Server Failure:</strong> Clients auto-reconnect to new server
                    </div>
                    <div className="text-sm">
                      <strong>Graceful Shutdown:</strong> Drain connections before scaling down
                    </div>
                    <div className="text-sm">
                      <strong>Keep-alive:</strong> 30s heartbeat to prevent timeout
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-cyan-900/30 p-4 rounded-lg border-l-4 border-cyan-500">
                <div className="font-bold text-cyan-400 mb-2">Message Routing</div>
                <div className="text-sm text-cyan-300">
                  When user sends message: WebSocket Gateway → Message Service → Query Redis for recipient's server ID →
                  Route to that server → Deliver via WebSocket. Cross-server communication via internal message bus (RabbitMQ).
                </div>
              </div>
            </div>

            {/* Performance Optimizations */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-600">🚀</span>
                Performance Optimizations
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="font-bold text-green-400 mb-2">Message Batching</div>
                  <div className="text-sm text-green-300">
                    Batch delivery receipts (sent/delivered/read) to reduce network calls. Send batch every 2s or 50 receipts.
                  </div>
                </div>

                <div className="bg-emerald-900/30 p-4 rounded-lg border-l-4 border-emerald-500">
                  <div className="font-bold text-emerald-400 mb-2">Connection Pooling</div>
                  <div className="text-sm text-emerald-300">
                    Database connection pools (100 per service). Redis connection multiplexing. Reuse HTTP/2 connections.
                  </div>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                  <div className="font-bold text-teal-900 mb-2">Compression</div>
                  <div className="text-sm text-teal-800">
                    GZIP compression for messages &gt; 1KB. Protobuf for binary serialization. 70% bandwidth reduction.
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="font-bold text-blue-400 mb-2">Lazy Loading</div>
                  <div className="text-sm text-blue-300">
                    Load chat history on demand (50 messages at a time). Download media only when user scrolls to it.
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                  <div className="font-bold text-indigo-900 mb-2">CDN Optimization</div>
                  <div className="text-sm text-indigo-800">
                    Edge caching for media. Brotli compression for web clients. HTTP/3 with QUIC for faster uploads.
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="font-bold text-purple-400 mb-2">Database Optimization</div>
                  <div className="text-sm text-purple-300">
                    Denormalize for read performance. Materialized views for analytics. Partition pruning for faster queries.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tradeoffs' && (
          <div className="space-y-8">
            {/* Technology Stack */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-purple-600">🛠️</span>
                Technology Stack Decisions
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border-2 border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-4 text-lg">Backend Technologies</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Programming Languages</div>
                      <div className="text-sm text-gray-700">
                        <strong>Erlang/Elixir</strong> for WebSocket gateways (OTP framework, excellent for concurrent connections)
                        <br/><strong>Go</strong> for Message Service (high throughput, low latency)
                        <br/><strong>Node.js</strong> for API Gateway (async I/O, quick development)
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Message Queue</div>
                      <div className="text-sm text-gray-700">
                        <strong>Apache Kafka</strong> - High throughput, durable, supports 1.2M messages/sec
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Real-time Protocol</div>
                      <div className="text-sm text-gray-700">
                        <strong>WebSocket</strong> over HTTP/2 for bidirectional, full-duplex communication
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border-2 border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-4 text-lg">Infrastructure</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Cloud Provider</div>
                      <div className="text-sm text-gray-700">
                        <strong>Multi-cloud</strong> (AWS primary, GCP backup) for resilience and avoiding vendor lock-in
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Container Orchestration</div>
                      <div className="text-sm text-gray-700">
                        <strong>Kubernetes</strong> for auto-scaling, self-healing, service discovery
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Service Mesh</div>
                      <div className="text-sm text-gray-700">
                        <strong>Istio</strong> for traffic management, circuit breaking, observability
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Encryption Trade-off */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-600">🔐</span>
                Trade-off 1: End-to-End Encryption Implementation
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                    <h3 className="font-bold text-red-400 mb-3 text-lg">❌ Server-Side Encryption</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Pros:</strong></div>
                      <div>• Easier to implement message search/indexing</div>
                      <div>• Can provide cloud backup easily</div>
                      <div>• Multi-device sync is simpler</div>
                      <div>• Can apply content moderation</div>
                      <div className="mt-3"><strong>Cons:</strong></div>
                      <div>• Server can read all messages (privacy risk)</div>
                      <div>• Single point of failure for security</div>
                      <div>• Government can compel access</div>
                      <div>• Vulnerable to server breaches</div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                    <h3 className="font-bold text-green-400 mb-3 text-lg">✅ End-to-End Encryption (Signal Protocol)</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Pros:</strong></div>
                      <div>• Maximum privacy - only participants can read</div>
                      <div>• Perfect Forward Secrecy (PFS)</div>
                      <div>• Server cannot be compelled to decrypt</div>
                      <div>• Industry standard (trusted by security experts)</div>
                      <div className="mt-3"><strong>Cons:</strong></div>
                      <div>• Cannot implement server-side search</div>
                      <div>• Complex multi-device synchronization</div>
                      <div>• Cannot do server-side content moderation</div>
                      <div>• Higher client-side CPU usage</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="font-bold text-green-400 mb-2">Decision: End-to-End Encryption ✅</div>
                  <div className="text-sm text-green-300">
                    WhatsApp chose E2E encryption because <strong>user privacy is paramount</strong>. The drawbacks (no server search, complex sync) are acceptable trade-offs.
                    Implemented using <strong>Signal Protocol</strong> with Double Ratchet Algorithm for PFS. Each message encrypted with unique ephemeral key.
                  </div>
                </div>
              </div>
            </div>

            {/* Database Trade-off */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-600">💾</span>
                Trade-off 2: SQL vs NoSQL for Messages
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                    <h3 className="font-bold text-red-400 mb-3 text-lg">❌ PostgreSQL (SQL)</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Pros:</strong></div>
                      <div>• ACID transactions</div>
                      <div>• Complex queries with JOINs</div>
                      <div>• Mature ecosystem and tools</div>
                      <div>• Strong consistency guarantees</div>
                      <div className="mt-3"><strong>Cons:</strong></div>
                      <div>• Harder to scale horizontally (sharding complex)</div>
                      <div>• Write throughput limited</div>
                      <div>• Higher latency at massive scale</div>
                      <div>• Vertical scaling expensive</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                    <h3 className="font-bold text-blue-400 mb-3 text-lg">✅ Cassandra (NoSQL)</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Pros:</strong></div>
                      <div>• Excellent write performance (1.2M writes/sec)</div>
                      <div>• Linear horizontal scaling</div>
                      <div>• No single point of failure</div>
                      <div>• Tunable consistency (QUORUM, ONE, ALL)</div>
                      <div className="mt-3"><strong>Cons:</strong></div>
                      <div>• No JOINs (denormalization required)</div>
                      <div>• Limited query flexibility</div>
                      <div>• Eventual consistency by default</div>
                      <div>• More complex data modeling</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="font-bold text-blue-400 mb-2">Decision: Cassandra for Messages ✅</div>
                  <div className="text-sm text-blue-300">
                    Messages are <strong>write-heavy</strong> (100B messages/day) and don't require complex queries. Cassandra's horizontal scaling and write performance make it ideal.
                    Use <strong>PostgreSQL for users/groups</strong> where ACID is important. Partition key: user_id. Clustering key: timestamp.
                  </div>
                </div>
              </div>
            </div>

            {/* Push vs Pull Trade-off */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-orange-600">🔄</span>
                Trade-off 3: Push vs Pull for Message Delivery
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                    <h3 className="font-bold text-red-400 mb-3 text-lg">❌ Pull (Client Polling)</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Pros:</strong></div>
                      <div>• Simpler server architecture</div>
                      <div>• No persistent connections needed</div>
                      <div>• Easier to scale (stateless)</div>
                      <div>• Works with HTTP/REST</div>
                      <div className="mt-3"><strong>Cons:</strong></div>
                      <div>• High latency (poll interval delay)</div>
                      <div>• Wasted bandwidth on empty polls</div>
                      <div>• Battery drain on mobile</div>
                      <div>• Poor user experience (not real-time)</div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                    <h3 className="font-bold text-orange-400 mb-3 text-lg">✅ Push (WebSocket)</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Pros:</strong></div>
                      <div>• Real-time delivery (&lt;100ms)</div>
                      <div>• Efficient - messages pushed only when needed</div>
                      <div>• Better battery life (no constant polling)</div>
                      <div>• Great user experience</div>
                      <div className="mt-3"><strong>Cons:</strong></div>
                      <div>• Complex server (stateful connections)</div>
                      <div>• Requires WebSocket infrastructure</div>
                      <div>• Connection management overhead</div>
                      <div>• Need fallback for offline users</div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="font-bold text-orange-400 mb-2">Decision: Push via WebSocket ✅</div>
                  <div className="text-sm text-orange-300">
                    Messaging requires <strong>real-time delivery</strong>. WebSocket provides instant push with low latency.
                    Use <strong>FCM/APNS push notifications</strong> as fallback for offline users. Maintain 300M concurrent WebSocket connections across 6,000 servers.
                  </div>
                </div>
              </div>
            </div>

            {/* Media Storage Trade-off */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-600">📁</span>
                Trade-off 4: Media Storage (S3 vs Database)
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                    <h3 className="font-bold text-red-400 mb-3 text-lg">❌ Store in Database (BLOB)</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Pros:</strong></div>
                      <div>• Simpler architecture (single storage system)</div>
                      <div>• ACID transactions with metadata</div>
                      <div>• Easier backup (single system)</div>
                      <div>• Access control via database</div>
                      <div className="mt-3"><strong>Cons:</strong></div>
                      <div>• Database bloat (500 TB/day media)</div>
                      <div>• Expensive storage costs</div>
                      <div>• Slower access for large files</div>
                      <div>• Cannot use CDN effectively</div>
                    </div>
                  </div>

                  <div className="bg-cyan-50 p-6 rounded-xl border-2 border-cyan-200">
                    <h3 className="font-bold text-cyan-900 mb-3 text-lg">✅ S3 + CDN</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Pros:</strong></div>
                      <div>• Cheap storage ($0.023/GB/month)</div>
                      <div>• Unlimited scalability</div>
                      <div>• CDN integration (fast global delivery)</div>
                      <div>• Lifecycle policies (move to Glacier)</div>
                      <div className="mt-3"><strong>Cons:</strong></div>
                      <div>• More complex architecture</div>
                      <div>• Need to manage two systems</div>
                      <div>• Eventual consistency</div>
                      <div>• Presigned URL management</div>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                  <div className="font-bold text-cyan-900 mb-2">Decision: S3 + CDN ✅</div>
                  <div className="text-sm text-cyan-300">
                    500 TB/day media upload requires <strong>cheap, scalable object storage</strong>. S3 cost: ~$150K/month vs millions in database storage.
                    Use <strong>CloudFront CDN</strong> for fast global delivery (95% cache hit rate). Store metadata in database, files in S3.
                  </div>
                </div>
              </div>
            </div>

            {/* Consistency Trade-off */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-pink-600">⚖️</span>
                Trade-off 5: Strong vs Eventual Consistency
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
                    <h3 className="font-bold text-pink-900 mb-3 text-lg">Strong Consistency (ALL)</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Pros:</strong></div>
                      <div>• Guaranteed up-to-date reads</div>
                      <div>• No stale data</div>
                      <div>• Simpler application logic</div>
                      <div className="mt-3"><strong>Cons:</strong></div>
                      <div>• Higher latency (wait for all replicas)</div>
                      <div>• Lower availability (CAP theorem)</div>
                      <div>• Poor performance during network partitions</div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                    <h3 className="font-bold text-purple-400 mb-3 text-lg">Tunable Consistency (QUORUM)</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Pros:</strong></div>
                      <div>• Balance consistency + availability</div>
                      <div>• Lower latency than ALL</div>
                      <div>• Survives node failures</div>
                      <div className="mt-3"><strong>Cons:</strong></div>
                      <div>• Possibility of stale reads (rare)</div>
                      <div>• More complex to reason about</div>
                      <div>• Need conflict resolution strategy</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="font-bold text-purple-400 mb-2">Decision: QUORUM Consistency ✅</div>
                  <div className="text-sm text-purple-300">
                    Use <strong>QUORUM</strong> (majority of replicas) for Cassandra. With RF=3, need 2/3 nodes to confirm.
                    Provides <strong>balance</strong>: tolerate 1 node failure while maintaining consistency. Message ordering guaranteed per conversation.
                    For critical operations (user registration), use stronger consistency.
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 border-2 border-green-300">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-600">📊</span>
                Summary of Key Decisions
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-bold text-green-400 mb-1">✅ End-to-End Encryption</div>
                    <div className="text-sm text-gray-700">Privacy over convenience</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-bold text-green-400 mb-1">✅ Cassandra for Messages</div>
                    <div className="text-sm text-gray-700">Write performance + horizontal scaling</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-bold text-green-400 mb-1">✅ WebSocket Push</div>
                    <div className="text-sm text-gray-700">Real-time delivery &lt; 100ms</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-bold text-green-400 mb-1">✅ S3 + CDN</div>
                    <div className="text-sm text-gray-700">Cost-effective media at scale</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-bold text-green-400 mb-1">✅ QUORUM Consistency</div>
                    <div className="text-sm text-gray-700">Balance availability + consistency</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-bold text-green-400 mb-1">✅ Multi-cloud</div>
                    <div className="text-sm text-gray-700">Avoid vendor lock-in + resilience</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                <div className="font-bold text-gray-900 mb-2">Core Philosophy</div>
                <div className="text-sm text-gray-700">
                  WhatsApp's architecture prioritizes <strong>privacy, scalability, and reliability</strong> over features like server-side search or cloud backups.
                  Every trade-off reinforces the commitment to end-to-end encryption and low-latency messaging at global scale.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

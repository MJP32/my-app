import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function TinyURL({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '' },
    { id: 'components', label: 'Core Components', icon: '' },
    { id: 'dataflow', label: 'Data Flow', icon: '' },
    { id: 'scalability', label: 'Scalability', icon: '' },
    { id: 'tradeoffs', label: 'Trade-offs', icon: '' }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)' }}>
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 bg-gray-800 rounded-2xl shadow-lg p-6 border-l-8 border-cyan-500">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-300 font-medium"
              >
                <span>←</span>
                <span>Back</span>
              </button>
              <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-3">
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  TinyURL System Design
                </span>
              </h1>
              <div className="w-24"></div>
            </div>
            <p className="text-gray-300 text-lg text-center">
              Design a URL shortening service like TinyURL or Bitly with short URL generation, redirection, analytics, and high-volume traffic handling
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0" style={{ backgroundColor: '#1f2937' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                  activeTab === tab.id
                    ? 'text-cyan-400 bg-cyan-900/30 border-b-4 border-cyan-400 -mb-0.5'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Requirements */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400">System Requirements</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-400 mb-3">Functional Requirements</h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>URL Shortening:</strong> Convert long URLs to short, unique aliases</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Redirection:</strong> Redirect short URLs to original long URLs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Custom Aliases:</strong> Allow users to create custom short URLs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Expiration:</strong> Support URL expiration and deletion</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Analytics:</strong> Track clicks, geographic data, referrers</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>API Access:</strong> Provide REST API for programmatic access</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-orange-400 mb-3">Non-Functional Requirements</h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>High Availability:</strong> 99.99% uptime for redirection</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Low Latency:</strong> Redirection &lt;10ms (P99)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Scalability:</strong> Handle millions of URLs and billions of redirects</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>URL Uniqueness:</strong> No collisions, guaranteed unique short URLs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Predictability:</strong> Short URLs should not be easily guessable</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Durability:</strong> URLs persist and don't break over time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture Diagram */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-teal-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-teal-400">High-Level Architecture</span>
                </h2>

                <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 p-8 rounded-xl border-2 border-teal-700">
                  <svg viewBox="0 0 1200 800" className="w-full h-auto">
                    {/* Client Layer */}
                    <rect x="50" y="50" width="180" height="80" fill="#06b6d4" rx="8"/>
                    <text x="140" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Web Client</text>
                    <text x="140" y="105" textAnchor="middle" fill="white" fontSize="12">Browser</text>

                    <rect x="270" y="50" width="180" height="80" fill="#06b6d4" rx="8"/>
                    <text x="360" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Mobile App</text>
                    <text x="360" y="105" textAnchor="middle" fill="white" fontSize="12">iOS/Android</text>

                    <rect x="490" y="50" width="180" height="80" fill="#06b6d4" rx="8"/>
                    <text x="580" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">API Clients</text>
                    <text x="580" y="105" textAnchor="middle" fill="white" fontSize="12">Third-party Apps</text>

                    {/* Load Balancer */}
                    <rect x="250" y="180" width="220" height="60" fill="#8b5cf6" rx="8"/>
                    <text x="360" y="215" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Load Balancer (Nginx)</text>

                    {/* API Gateway */}
                    <rect x="250" y="280" width="220" height="60" fill="#6366f1" rx="8"/>
                    <text x="360" y="315" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">API Gateway</text>

                    {/* Services Layer */}
                    <rect x="50" y="390" width="180" height="100" fill="#10b981" rx="8"/>
                    <text x="140" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Shortening Service</text>
                    <text x="140" y="445" textAnchor="middle" fill="white" fontSize="11">Generate Short URLs</text>
                    <text x="140" y="465" textAnchor="middle" fill="white" fontSize="11">Base62 Encoding</text>

                    <rect x="270" y="390" width="180" height="100" fill="#f59e0b" rx="8"/>
                    <text x="360" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Redirect Service</text>
                    <text x="360" y="445" textAnchor="middle" fill="white" fontSize="11">Lookup & Redirect</text>
                    <text x="360" y="465" textAnchor="middle" fill="white" fontSize="11">Cache First</text>

                    <rect x="490" y="390" width="180" height="100" fill="#ef4444" rx="8"/>
                    <text x="580" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Analytics Service</text>
                    <text x="580" y="445" textAnchor="middle" fill="white" fontSize="11">Click Tracking</text>
                    <text x="580" y="465" textAnchor="middle" fill="white" fontSize="11">Geo/Referrer Data</text>

                    <rect x="710" y="390" width="180" height="100" fill="#ec4899" rx="8"/>
                    <text x="800" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">ID Generator</text>
                    <text x="800" y="445" textAnchor="middle" fill="white" fontSize="11">Distributed IDs</text>
                    <text x="800" y="465" textAnchor="middle" fill="white" fontSize="11">Snowflake/UUID</text>

                    {/* Cache Layer */}
                    <rect x="50" y="540" width="400" height="60" fill="#06b6d4" rx="8"/>
                    <text x="250" y="565" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Cache Layer (Redis Cluster)</text>
                    <text x="250" y="585" textAnchor="middle" fill="white" fontSize="11">Short URL → Long URL Mapping</text>

                    {/* Database Layer */}
                    <rect x="50" y="650" width="180" height="80" fill="#334155" rx="8"/>
                    <text x="140" y="680" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">URL Database</text>
                    <text x="140" y="700" textAnchor="middle" fill="white" fontSize="11">PostgreSQL/MySQL</text>

                    <rect x="270" y="650" width="180" height="80" fill="#334155" rx="8"/>
                    <text x="360" y="680" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Analytics DB</text>
                    <text x="360" y="700" textAnchor="middle" fill="white" fontSize="11">ClickHouse/Cassandra</text>

                    <rect x="490" y="650" width="180" height="80" fill="#059669" rx="8"/>
                    <text x="580" y="680" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Rate Limiter</text>
                    <text x="580" y="700" textAnchor="middle" fill="white" fontSize="11">Redis (Token Bucket)</text>

                    {/* ZooKeeper */}
                    <rect x="710" y="540" width="180" height="60" fill="#7c3aed" rx="8"/>
                    <text x="800" y="565" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">ZooKeeper</text>
                    <text x="800" y="585" textAnchor="middle" fill="white" fontSize="11">ID Range Coordination</text>

                    {/* Message Queue */}
                    <rect x="930" y="390" width="180" height="100" fill="#f97316" rx="8"/>
                    <text x="1020" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Message Queue</text>
                    <text x="1020" y="445" textAnchor="middle" fill="white" fontSize="11">Kafka</text>
                    <text x="1020" y="465" textAnchor="middle" fill="white" fontSize="11">Async Analytics</text>

                    {/* Connections */}
                    <path d="M 140 130 L 360 180" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                    <path d="M 360 130 L 360 180" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                    <path d="M 580 130 L 360 180" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                    <path d="M 360 240 L 360 280" stroke="#6366f1" strokeWidth="2" fill="none"/>
                    <path d="M 360 340 L 140 390" stroke="#10b981" strokeWidth="2" fill="none"/>
                    <path d="M 360 340 L 360 390" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                    <path d="M 360 340 L 580 390" stroke="#ef4444" strokeWidth="2" fill="none"/>
                    <path d="M 360 340 L 800 390" stroke="#ec4899" strokeWidth="2" fill="none"/>

                    <path d="M 140 490 L 250 540" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                    <path d="M 360 490 L 250 540" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                    <path d="M 580 490 L 1020 490" stroke="#f97316" strokeWidth="2" fill="none"/>
                    <path d="M 800 490 L 800 540" stroke="#7c3aed" strokeWidth="2" fill="none"/>

                    <path d="M 140 490 L 140 650" stroke="#334155" strokeWidth="2" fill="none"/>
                    <path d="M 580 490 L 360 650" stroke="#334155" strokeWidth="2" fill="none"/>
                    <path d="M 360 340 L 580 650" stroke="#059669" strokeWidth="2" fill="none"/>
                  </svg>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="bg-cyan-900/30 p-4 rounded-lg border-l-4 border-cyan-500">
                    <div className="font-bold text-cyan-400 mb-2">Client Layer</div>
                    <div className="text-sm text-cyan-300">Web, mobile, and API clients access the service via REST APIs</div>
                  </div>
                  <div className="bg-teal-900/30 p-4 rounded-lg border-l-4 border-teal-500">
                    <div className="font-bold text-teal-400 mb-2">Service Layer</div>
                    <div className="text-sm text-teal-300">Microservices for URL shortening, redirection, and analytics</div>
                  </div>
                  <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="font-bold text-blue-400 mb-2">Data Layer</div>
                    <div className="text-sm text-blue-300">PostgreSQL for URLs, Redis for caching, ClickHouse for analytics</div>
                  </div>
                </div>
              </div>

              {/* Scale Estimates */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-emerald-400">Scale & Capacity Estimates</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h3 className="font-bold text-blue-400 mb-4 text-lg">Traffic Assumptions</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• New URLs created: <strong>100 million/month</strong></div>
                      <div>• URL shortening requests: <strong>40 requests/second</strong></div>
                      <div>• Read:Write ratio: <strong>100:1</strong></div>
                      <div>• Redirects per second: <strong>~4,000 QPS</strong></div>
                      <div>• Peak traffic: <strong>3x average = 12K QPS</strong></div>
                      <div>• Monthly redirects: <strong>~10 billion</strong></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h3 className="font-bold text-green-400 mb-4 text-lg">Storage Estimates</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• URLs per year: <strong>1.2 billion</strong></div>
                      <div>• Storage per URL record: <strong>~500 bytes</strong></div>
                      <div>  - Short URL: 7 bytes</div>
                      <div>  - Long URL: ~200 bytes avg</div>
                      <div>  - Metadata: ~300 bytes</div>
                      <div>• Yearly storage: <strong>1.2B x 500B = 600 GB/year</strong></div>
                      <div>• 10-year storage: <strong>~6 TB</strong></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border-2 border-purple-700">
                    <h3 className="font-bold text-purple-400 mb-4 text-lg">Cache Requirements</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• Follow 80/20 rule: <strong>20% of URLs = 80% of traffic</strong></div>
                      <div>• Daily redirects: <strong>~330 million</strong></div>
                      <div>• Cache 20% of hot URLs</div>
                      <div>• Cache entry size: <strong>~300 bytes</strong></div>
                      <div>• Daily cache needs: <strong>~20 GB</strong></div>
                      <div>• With metadata & overhead: <strong>~50 GB</strong></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-6 rounded-xl border-2 border-orange-700">
                    <h3 className="font-bold text-orange-400 mb-4 text-lg">Bandwidth Estimates</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• <strong>Write bandwidth (shortening):</strong></div>
                      <div>  40 requests/s x 500 bytes = <strong>20 KB/s</strong></div>
                      <div>• <strong>Read bandwidth (redirects):</strong></div>
                      <div>  4,000 requests/s x 500 bytes = <strong>2 MB/s</strong></div>
                      <div>• <strong>Peak bandwidth:</strong></div>
                      <div>  12,000 requests/s x 500 bytes = <strong>6 MB/s</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Design Considerations */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-indigo-400">Key Design Considerations</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-indigo-900/30 p-6 rounded-xl border-l-4 border-indigo-500">
                    <h3 className="font-bold text-indigo-400 mb-3 text-lg">Short URL Length Calculation</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Using Base62 encoding: [a-zA-Z0-9] = 62 characters</div>
                      <div>• Need to support 1.2B URLs/year for 10 years = 12B URLs</div>
                      <div>• 62^6 = 56.8 billion combinations</div>
                      <div>• 62^7 = 3.5 trillion combinations</div>
                      <div>• <strong>Decision: Use 7-character short URLs</strong></div>
                      <div>• Example: <code className="bg-gray-900 px-2 py-1 rounded">tinyurl.com/aB3xY2z</code></div>
                    </div>
                  </div>

                  <div className="bg-pink-900/30 p-6 rounded-xl border-l-4 border-pink-500">
                    <h3 className="font-bold text-pink-400 mb-3 text-lg">Collision Handling</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Problem:</strong> Hash collisions when encoding same URL</div>
                      <div>• <strong>Solution 1:</strong> Append incrementing counter (0, 1, 2...)</div>
                      <div>• <strong>Solution 2:</strong> Use unique ID generator (Snowflake)</div>
                      <div>• <strong>Solution 3:</strong> Pre-generate key pool via ZooKeeper</div>
                      <div>• <strong>Chosen:</strong> ID generator + Base62 encoding</div>
                      <div>• Guarantees uniqueness without DB lookups</div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="font-bold text-green-400 mb-3 text-lg">Data Retention Policy</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Default expiration:</strong> URLs never expire</div>
                      <div>• <strong>Optional TTL:</strong> User can set expiration (30d, 90d, 1y)</div>
                      <div>• <strong>Inactive URLs:</strong> Archive after 2 years of no clicks</div>
                      <div>• <strong>Cleanup job:</strong> Daily batch job to purge expired URLs</div>
                      <div>• <strong>Recycling:</strong> Reuse short codes after 5+ years</div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/30 p-6 rounded-xl border-l-4 border-yellow-500">
                    <h3 className="font-bold text-yellow-400 mb-3 text-lg">Rate Limiting Strategy</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Anonymous users:</strong> 10 URLs/hour per IP</div>
                      <div>• <strong>Registered users:</strong> 100 URLs/hour</div>
                      <div>• <strong>Premium users:</strong> 1,000 URLs/hour</div>
                      <div>• <strong>API clients:</strong> Rate limited by API key</div>
                      <div>• <strong>Algorithm:</strong> Token bucket (Redis)</div>
                      <div>• <strong>Response:</strong> HTTP 429 Too Many Requests</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'components' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* URL Shortening Service */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    URL Shortening Service
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-green-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-green-400 mb-1">Core Functionality</div>
                      <div className="text-sm">• Accept long URL from client</div>
                      <div className="text-sm">• Generate unique short URL</div>
                      <div className="text-sm">• Store mapping in database</div>
                      <div className="text-sm">• Return short URL to client</div>
                    </div>
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-blue-400 mb-1">ID Generation Approaches</div>
                      <div className="text-sm">• <strong>Hash-based:</strong> MD5/SHA256 → Base62 (7 chars)</div>
                      <div className="text-sm">• <strong>Counter-based:</strong> Auto-increment ID → Base62</div>
                      <div className="text-sm">• <strong>Snowflake:</strong> Distributed unique ID generator</div>
                      <div className="text-sm">• <strong>Key Generation Service:</strong> Pre-generated pool</div>
                    </div>
                    <div className="bg-purple-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-purple-400 mb-1">Optimizations</div>
                      <div className="text-sm">• Check if long URL already exists (cache + DB)</div>
                      <div className="text-sm">• Validate URL format before processing</div>
                      <div className="text-sm">• Sanitize URLs (remove tracking params)</div>
                      <div className="text-sm">• Rate limit per user/IP to prevent abuse</div>
                    </div>
                  </div>
                </div>

                {/* Redirect Service */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                    Redirect Service
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-orange-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-orange-400 mb-1">Redirection Flow</div>
                      <div className="text-sm">1. Client requests short URL (e.g., /aB3xY2z)</div>
                      <div className="text-sm">2. Check Redis cache for mapping</div>
                      <div className="text-sm">3. If cache miss, query database</div>
                      <div className="text-sm">4. Return HTTP 301/302 redirect to long URL</div>
                      <div className="text-sm">5. Cache result for future requests</div>
                    </div>
                    <div className="bg-red-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-red-400 mb-1">HTTP Status Codes</div>
                      <div className="text-sm">• <strong>301 Permanent:</strong> Browsers cache, faster but no analytics</div>
                      <div className="text-sm">• <strong>302 Temporary:</strong> Always hits server, enables analytics</div>
                      <div className="text-sm">• <strong>404 Not Found:</strong> Short URL doesn't exist or expired</div>
                      <div className="text-sm">• <strong>Decision:</strong> Use 302 for tracking, 301 for performance</div>
                    </div>
                    <div className="bg-pink-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-pink-400 mb-1">Performance</div>
                      <div className="text-sm">• Cache hit rate target: <strong>95%+</strong></div>
                      <div className="text-sm">• Redirect latency: <strong>&lt;10ms (P99)</strong></div>
                      <div className="text-sm">• Use CDN for static redirect pages</div>
                      <div className="text-sm">• Connection pooling to database</div>
                    </div>
                  </div>
                </div>

                {/* Analytics Service */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                    Analytics Service
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-blue-400 mb-1">Tracked Metrics</div>
                      <div className="text-sm">• Total clicks per short URL</div>
                      <div className="text-sm">• Unique visitors (track by cookie/IP)</div>
                      <div className="text-sm">• Geographic location (country, city)</div>
                      <div className="text-sm">• Referrer source (where click came from)</div>
                      <div className="text-sm">• Device type (mobile, desktop, tablet)</div>
                      <div className="text-sm">• Browser and OS information</div>
                      <div className="text-sm">• Click timeline (hourly, daily, monthly)</div>
                    </div>
                    <div className="bg-indigo-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-indigo-400 mb-1">Implementation</div>
                      <div className="text-sm">• <strong>Async Processing:</strong> Publish click events to Kafka</div>
                      <div className="text-sm">• <strong>Batch Writes:</strong> Aggregate and write every 10 seconds</div>
                      <div className="text-sm">• <strong>Database:</strong> ClickHouse (columnar OLAP)</div>
                      <div className="text-sm">• <strong>Real-time:</strong> Update Redis counters for live stats</div>
                    </div>
                    <div className="bg-cyan-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-cyan-400 mb-1">User Dashboard</div>
                      <div className="text-sm">• Real-time click counter</div>
                      <div className="text-sm">• Geographic heat map</div>
                      <div className="text-sm">• Top referrers chart</div>
                      <div className="text-sm">• Device breakdown pie chart</div>
                    </div>
                  </div>
                </div>

                {/* ID Generator Service */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                    ID Generator Service
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-pink-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-pink-400 mb-1">Snowflake Algorithm</div>
                      <div className="text-sm">• <strong>64-bit ID structure:</strong></div>
                      <div className="text-sm">  - 1 bit: Sign (always 0)</div>
                      <div className="text-sm">  - 41 bits: Timestamp (milliseconds since epoch)</div>
                      <div className="text-sm">  - 10 bits: Machine ID (1024 machines)</div>
                      <div className="text-sm">  - 12 bits: Sequence (4096 IDs/ms per machine)</div>
                      <div className="text-sm">• Generates <strong>4 million IDs/second</strong> per machine</div>
                    </div>
                    <div className="bg-purple-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-purple-400 mb-1">Base62 Encoding</div>
                      <div className="text-sm">• Convert 64-bit ID to Base62 string</div>
                      <div className="text-sm">• Character set: [a-z, A-Z, 0-9] = 62 chars</div>
                      <div className="text-sm">• Example: 123456789 → "8M0kX"</div>
                      <div className="text-sm">• Pad to 7 characters: "008M0kX"</div>
                    </div>
                    <div className="bg-yellow-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-yellow-400 mb-1">Alternatives</div>
                      <div className="text-sm">• <strong>UUID:</strong> Simple but too long (36 chars)</div>
                      <div className="text-sm">• <strong>Key Generation Service:</strong> Pre-generate via ZooKeeper</div>
                      <div className="text-sm">• <strong>Database Auto-increment:</strong> Single point of failure</div>
                    </div>
                  </div>
                </div>

                {/* Cache Layer */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    Cache Layer (Redis)
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-cyan-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-cyan-400 mb-1">Cache Strategy</div>
                      <div className="text-sm">• <strong>Write-through:</strong> Update cache when creating URL</div>
                      <div className="text-sm">• <strong>Cache-aside:</strong> Lazy load on redirect requests</div>
                      <div className="text-sm">• <strong>TTL:</strong> 24 hours for URL mappings</div>
                      <div className="text-sm">• <strong>Eviction:</strong> LRU (Least Recently Used)</div>
                    </div>
                    <div className="bg-teal-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-teal-400 mb-1">Data Structures</div>
                      <div className="text-sm">• <strong>Hash:</strong> Store short → long URL mapping</div>
                      <div className="text-sm">• <strong>String:</strong> Store click counters</div>
                      <div className="text-sm">• <strong>Set:</strong> Track unique visitors</div>
                      <div className="text-sm">• <strong>Sorted Set:</strong> Popular URLs leaderboard</div>
                    </div>
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-blue-400 mb-1">High Availability</div>
                      <div className="text-sm">• Redis Cluster with 6 nodes (3 masters, 3 replicas)</div>
                      <div className="text-sm">• Automatic failover via Redis Sentinel</div>
                      <div className="text-sm">• Data sharded across masters by key hash</div>
                    </div>
                  </div>
                </div>

                {/* Database */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                    Database Layer
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="bg-purple-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-purple-400 mb-1">URL Table Schema</div>
                      <div className="text-sm font-mono bg-gray-900 p-2 rounded">
                        <div>id: BIGINT PRIMARY KEY</div>
                        <div>short_url: VARCHAR(7) UNIQUE</div>
                        <div>long_url: TEXT</div>
                        <div>user_id: BIGINT (nullable)</div>
                        <div>created_at: TIMESTAMP</div>
                        <div>expires_at: TIMESTAMP (nullable)</div>
                        <div>click_count: BIGINT DEFAULT 0</div>
                      </div>
                    </div>
                    <div className="bg-indigo-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-indigo-400 mb-1">Indexes</div>
                      <div className="text-sm">• Primary: <code>id</code></div>
                      <div className="text-sm">• Unique: <code>short_url</code> (for fast lookup)</div>
                      <div className="text-sm">• Index: <code>long_url</code> (hash index for deduplication)</div>
                      <div className="text-sm">• Index: <code>user_id</code> (for user's URL list)</div>
                      <div className="text-sm">• Index: <code>created_at</code> (for cleanup jobs)</div>
                    </div>
                    <div className="bg-pink-900/30 p-3 rounded-lg">
                      <div className="font-semibold text-pink-400 mb-1">Database Choice</div>
                      <div className="text-sm">• <strong>PostgreSQL:</strong> ACID, mature, good for 10TB scale</div>
                      <div className="text-sm">• <strong>Sharding:</strong> By short_url hash (consistent hashing)</div>
                      <div className="text-sm">• <strong>Replication:</strong> Master-slave (1 master, 2 replicas)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dataflow' && (
            <div className="space-y-8">
              {/* URL Shortening Flow */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-green-400">URL Shortening Flow</span>
                </h2>

                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Client Sends Long URL', desc: 'POST request to /api/shorten with long URL and optional custom alias', color: 'blue' },
                    { step: 2, title: 'Validate & Sanitize', desc: 'Check URL format, remove tracking parameters, validate custom alias availability', color: 'green' },
                    { step: 3, title: 'Check Deduplication', desc: 'Query cache/DB to see if long URL already has a short URL (save storage)', color: 'purple' },
                    { step: 4, title: 'Generate Unique ID', desc: 'If new URL, generate unique ID via Snowflake algorithm (64-bit distributed ID)', color: 'orange' },
                    { step: 5, title: 'Encode to Base62', desc: 'Convert numeric ID to Base62 string: 123456789 → "8M0kX", pad to 7 chars', color: 'red' },
                    { step: 6, title: 'Store in Database', desc: 'Insert mapping into URL table: (short_url, long_url, user_id, created_at)', color: 'pink' },
                    { step: 7, title: 'Update Cache', desc: 'Write-through: Add mapping to Redis cache with 24-hour TTL', color: 'cyan' },
                    { step: 8, title: 'Return Short URL', desc: 'API returns short URL to client: { "short_url": "tinyurl.com/8M0kX" }', color: 'indigo' }
                  ].map(item => (
                    <div key={item.step} className={`bg-${item.color}-900/30 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                      <div className="flex items-start gap-4">
                        <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-${item.color}-400 mb-1`}>{item.title}</div>
                          <div className="text-gray-300 text-sm">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* URL Redirection Flow */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-orange-400">URL Redirection Flow</span>
                </h2>

                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Client Requests Short URL', desc: 'User clicks short URL: GET tinyurl.com/8M0kX', color: 'blue' },
                    { step: 2, title: 'Load Balancer Routes Request', desc: 'Nginx routes to available Redirect Service instance', color: 'purple' },
                    { step: 3, title: 'Check Cache (Redis)', desc: 'Query Redis for short URL → long URL mapping (key: "8M0kX")', color: 'cyan' },
                    { step: 4, title: 'Cache Hit: Return Long URL', desc: 'If found in cache (~95% hit rate), retrieve long URL in <5ms', color: 'green' },
                    { step: 5, title: 'Cache Miss: Query Database', desc: 'If not in cache, query PostgreSQL: SELECT long_url WHERE short_url="8M0kX"', color: 'orange' },
                    { step: 6, title: 'Update Cache', desc: 'Store result in Redis with 24-hour TTL for future requests', color: 'pink' },
                    { step: 7, title: 'Track Analytics (Async)', desc: 'Publish click event to Kafka: {short_url, IP, user_agent, referrer, timestamp}', color: 'red' },
                    { step: 8, title: 'HTTP Redirect', desc: 'Return HTTP 302 redirect to long URL (or 404 if not found)', color: 'indigo' }
                  ].map(item => (
                    <div key={item.step} className={`bg-${item.color}-900/30 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                      <div className="flex items-start gap-4">
                        <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-${item.color}-400 mb-1`}>{item.title}</div>
                          <div className="text-gray-300 text-sm">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Processing */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-blue-400">Analytics Processing Flow</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h3 className="font-bold text-blue-400 mb-3 text-lg">Real-time Path</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-blue-500">
                        <div className="font-semibold text-blue-300 text-sm">1. Capture Click Event</div>
                        <div className="text-xs text-gray-400 mt-1">Extract IP, user_agent, referrer from HTTP request</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-cyan-500">
                        <div className="font-semibold text-cyan-300 text-sm">2. Increment Redis Counter</div>
                        <div className="text-xs text-gray-400 mt-1">INCR clicks:8M0kX (atomic operation)</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-teal-500">
                        <div className="font-semibold text-teal-300 text-sm">3. Update Dashboard</div>
                        <div className="text-xs text-gray-400 mt-1">WebSocket push to connected clients for live updates</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-6 rounded-xl border-2 border-purple-700">
                    <h3 className="font-bold text-purple-400 mb-3 text-lg">Batch Path</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-purple-500">
                        <div className="font-semibold text-purple-300 text-sm">1. Publish to Kafka</div>
                        <div className="text-xs text-gray-400 mt-1">Topic: "click_events", partition by short_url hash</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-pink-500">
                        <div className="font-semibold text-pink-300 text-sm">2. Stream Processing</div>
                        <div className="text-xs text-gray-400 mt-1">Apache Flink aggregates events every 10 seconds</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border-l-4 border-red-500">
                        <div className="font-semibold text-red-300 text-sm">3. Batch Write to ClickHouse</div>
                        <div className="text-xs text-gray-400 mt-1">Insert aggregated analytics data for reporting</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h3 className="font-bold text-green-400 mb-3 text-lg">Geo IP Enrichment</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>• Lookup IP address in MaxMind GeoIP database</div>
                      <div>• Extract country, region, city coordinates</div>
                      <div>• Cache results in Redis (IP → location)</div>
                      <div>• Display on geographic heat map</div>
                    </div>
                  </div>

                  <div className="bg-orange-900/30 p-6 rounded-xl border-2 border-orange-700">
                    <h3 className="font-bold text-orange-400 mb-3 text-lg">User Agent Parsing</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>• Parse user_agent string to extract device info</div>
                      <div>• Identify browser (Chrome, Safari, Firefox)</div>
                      <div>• Identify OS (Windows, macOS, iOS, Android)</div>
                      <div>• Identify device type (mobile, desktop, tablet)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scalability' && (
            <div className="space-y-8">
              {/* Database Sharding */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-purple-400">Database Sharding Strategy</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-900/30 p-6 rounded-xl border-2 border-purple-700">
                    <h3 className="font-bold text-purple-400 mb-3">Hash-based Sharding</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• <strong>Shard Key:</strong> short_url</div>
                      <div>• <strong>Hash Function:</strong> CRC32(short_url) % num_shards</div>
                      <div>• <strong>Number of Shards:</strong> 64 initially</div>
                      <div>• <strong>Routing:</strong> Application-level sharding</div>
                      <div>• <strong>Pros:</strong> Even distribution, simple logic</div>
                      <div>• <strong>Cons:</strong> Resharding requires data migration</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h3 className="font-bold text-blue-400 mb-3">Consistent Hashing</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• <strong>Hash Ring:</strong> Map shards to ring (0 to 2^32-1)</div>
                      <div>• <strong>Virtual Nodes:</strong> 150 vnodes per physical shard</div>
                      <div>• <strong>Lookup:</strong> Find first shard clockwise from hash</div>
                      <div>• <strong>Pros:</strong> Easy to add/remove shards (minimal rebalancing)</div>
                      <div>• <strong>Cons:</strong> More complex implementation</div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h3 className="font-bold text-green-400 mb-3">Replication Strategy</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• <strong>Primary-Replica:</strong> 1 primary + 2 replicas per shard</div>
                      <div>• <strong>Writes:</strong> Go to primary, async replicate to replicas</div>
                      <div>• <strong>Reads:</strong> Load balanced across primary + replicas</div>
                      <div>• <strong>Failover:</strong> Automatic promotion via Patroni/PgPool</div>
                      <div>• <strong>Read:Write = 100:1:</strong> Replicas handle most traffic</div>
                    </div>
                  </div>

                  <div className="bg-orange-900/30 p-6 rounded-xl border-2 border-orange-700">
                    <h3 className="font-bold text-orange-400 mb-3">Hot Shard Mitigation</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• <strong>Detection:</strong> Monitor QPS per shard (alert if &gt;2x avg)</div>
                      <div>• <strong>Cache Layer:</strong> Hot URLs cached in Redis (99% hit rate)</div>
                      <div>• <strong>Read Replicas:</strong> Add more replicas to hot shards</div>
                      <div>• <strong>Resharding:</strong> Split hot shard into 2+ smaller shards</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Caching Strategy */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400">Multi-Layer Caching</span>
                </h2>

                <div className="space-y-4">
                  <div className="bg-cyan-900/30 p-6 rounded-xl border-l-4 border-cyan-500">
                    <div className="font-bold text-cyan-400 mb-3 text-lg">L1: CDN Cache (Edge)</div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>• Cache static assets (HTML, JS, CSS)</div>
                      <div>• Cache popular short URL redirects</div>
                      <div>• TTL: 1 hour for redirects</div>
                      <div>• Reduces server load by 40-50%</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
                    <div className="font-bold text-blue-400 mb-3 text-lg">L2: Application Cache (Redis)</div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>• Cache all short → long URL mappings</div>
                      <div>• Cache user data, rate limit counters</div>
                      <div>• TTL: 24 hours for URL mappings</div>
                      <div>• Target cache hit rate: 95%+</div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-6 rounded-xl border-l-4 border-purple-500">
                    <div className="font-bold text-purple-400 mb-3 text-lg">L3: Database Query Cache</div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>• PostgreSQL shared_buffers (16 GB)</div>
                      <div>• OS page cache (32 GB)</div>
                      <div>• Frequently accessed rows stay in memory</div>
                      <div>• Reduces disk I/O by 80%+</div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-l-4 border-green-500">
                    <div className="font-bold text-green-400 mb-3 text-lg">Cache Invalidation</div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>• <strong>URL Update/Delete:</strong> Invalidate cache entry immediately</div>
                      <div>• <strong>Expiration:</strong> Lazy deletion on next access (check expires_at)</div>
                      <div>• <strong>Custom Alias Change:</strong> Delete old key, create new key</div>
                      <div>• <strong>Pattern:</strong> Write-through for creates, cache-aside for reads</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Load Balancing */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-orange-400">Load Balancing & Auto-Scaling</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-orange-900/30 p-6 rounded-xl border-2 border-orange-700">
                    <h3 className="font-bold text-orange-400 mb-3">DNS Load Balancing</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Route53 geo-routing to nearest region</div>
                      <div>• Health checks every 30 seconds</div>
                      <div>• Failover to backup region on failure</div>
                      <div>• Weighted routing for A/B testing</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h3 className="font-bold text-blue-400 mb-3">L7 Load Balancer</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Nginx/HAProxy for HTTP load balancing</div>
                      <div>• Round-robin with least connections</div>
                      <div>• Sticky sessions for analytics dashboards</div>
                      <div>• SSL termination at load balancer</div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-6 rounded-xl border-2 border-purple-700">
                    <h3 className="font-bold text-purple-400 mb-3">Auto-Scaling</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Trigger:</strong> CPU &gt; 70% for 5 minutes</div>
                      <div>• <strong>Action:</strong> Add 25% more instances</div>
                      <div>• <strong>Cooldown:</strong> 5 minutes between scales</div>
                      <div>• <strong>Min:</strong> 10 instances, <strong>Max:</strong> 1000</div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h3 className="font-bold text-green-400 mb-3">Service Discovery</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Consul for service registry</div>
                      <div>• Health checks via HTTP /health endpoint</div>
                      <div>• Automatic deregistration on failure</div>
                      <div>• DNS-based service discovery</div>
                    </div>
                  </div>

                  <div className="bg-pink-900/30 p-6 rounded-xl border-2 border-pink-700">
                    <h3 className="font-bold text-pink-400 mb-3">Circuit Breaker</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Detect database failures (&gt;10% errors)</div>
                      <div>• Open circuit, serve from cache only</div>
                      <div>• Half-open after 60 seconds (test recovery)</div>
                      <div>• Close circuit when DB healthy again</div>
                    </div>
                  </div>

                  <div className="bg-cyan-900/30 p-6 rounded-xl border-2 border-cyan-700">
                    <h3 className="font-bold text-cyan-400 mb-3">Rate Limiting</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• Token bucket algorithm in Redis</div>
                      <div>• 10 requests/hour per IP (anon users)</div>
                      <div>• 100 requests/hour per API key</div>
                      <div>• Return 429 Too Many Requests</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Optimizations */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-green-400">Performance Optimizations</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-900/30 p-6 rounded-xl">
                    <div className="font-bold text-green-400 mb-3 text-lg">Database Optimizations</div>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Indexes:</strong> B-tree on short_url (primary lookup)</div>
                      <div>• <strong>Connection Pooling:</strong> PgBouncer (max 100 connections)</div>
                      <div>• <strong>Prepared Statements:</strong> Reduce parsing overhead</div>
                      <div>• <strong>Query Optimization:</strong> No JOINs needed (simple key-value)</div>
                      <div>• <strong>VACUUM:</strong> Regular cleanup of dead tuples</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl">
                    <div className="font-bold text-blue-400 mb-3 text-lg">API Optimizations</div>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Compression:</strong> Gzip API responses (reduce bandwidth 70%)</div>
                      <div>• <strong>HTTP/2:</strong> Multiplexing, header compression</div>
                      <div>• <strong>Keep-Alive:</strong> Reuse TCP connections</div>
                      <div>• <strong>Async I/O:</strong> Non-blocking Redis/DB calls</div>
                      <div>• <strong>Batching:</strong> Batch analytics writes (10s window)</div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-6 rounded-xl">
                    <div className="font-bold text-purple-400 mb-3 text-lg">Client Optimizations</div>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Browser Caching:</strong> Cache-Control: max-age=3600</div>
                      <div>• <strong>Prefetching:</strong> DNS prefetch for redirect domains</div>
                      <div>• <strong>Minification:</strong> Minify JS/CSS (40% size reduction)</div>
                      <div>• <strong>Lazy Loading:</strong> Load analytics charts on demand</div>
                    </div>
                  </div>

                  <div className="bg-orange-900/30 p-6 rounded-xl">
                    <div className="font-bold text-orange-400 mb-3 text-lg">Monitoring & Alerting</div>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div>• <strong>Metrics:</strong> Prometheus + Grafana dashboards</div>
                      <div>• <strong>Logging:</strong> ELK stack for centralized logs</div>
                      <div>• <strong>Tracing:</strong> Jaeger for distributed tracing</div>
                      <div>• <strong>Alerts:</strong> PagerDuty for on-call notifications</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tradeoffs' && (
            <div className="space-y-8">
              {/* Technology Stack */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-indigo-400">Technology Stack</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-indigo-900/30 p-6 rounded-xl border-2 border-indigo-700">
                    <h3 className="font-bold text-indigo-400 mb-4">Backend Services</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-white">API Layer: Go</div>
                        <div className="text-gray-300">High performance, low latency for redirect service</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Load Balancer: Nginx</div>
                        <div className="text-gray-300">L7 load balancing, SSL termination, 100K+ RPS</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Message Queue: Kafka</div>
                        <div className="text-gray-300">High throughput event streaming for analytics</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h3 className="font-bold text-blue-400 mb-4">Data Storage</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-white">Primary DB: PostgreSQL</div>
                        <div className="text-gray-300">ACID compliance, mature, great for &lt;10TB scale</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Cache: Redis Cluster</div>
                        <div className="text-gray-300">In-memory, high performance, automatic sharding</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Analytics: ClickHouse</div>
                        <div className="text-gray-300">Columnar OLAP, fast aggregations for reporting</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h3 className="font-bold text-green-400 mb-4">Infrastructure</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-white">Cloud: AWS</div>
                        <div className="text-gray-300">EC2 for compute, S3 for backups, CloudFront CDN</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Orchestration: Kubernetes</div>
                        <div className="text-gray-300">Container orchestration, auto-scaling, self-healing</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Coordination: ZooKeeper</div>
                        <div className="text-gray-300">Distributed coordination for ID ranges</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-6 rounded-xl border-2 border-purple-700">
                    <h3 className="font-bold text-purple-400 mb-4">Monitoring & Ops</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-white">Metrics: Prometheus + Grafana</div>
                        <div className="text-gray-300">Time-series metrics, real-time dashboards</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Logging: ELK Stack</div>
                        <div className="text-gray-300">Elasticsearch, Logstash, Kibana for log analysis</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Tracing: Jaeger</div>
                        <div className="text-gray-300">Distributed tracing for debugging latency issues</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Design Trade-offs */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-orange-400">Key Design Trade-offs</span>
                </h2>

                <div className="space-y-6">
                  {/* Hashing vs Counter */}
                  <div className="bg-orange-900/30 p-6 rounded-xl border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-orange-400 mb-4">1. Hash-based vs Counter-based ID Generation</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-blue-700">
                        <div className="font-bold text-blue-400 mb-2">Hash-based (MD5 + Base62)</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Same long URL → same short URL (idempotent)</div>
                          <div>• No coordination needed (stateless)</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Hash collisions require handling</div>
                          <div>• Need to query DB to check duplicates</div>
                          <div>• Predictable (security concern)</div>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-green-700">
                        <div className="font-bold text-green-400 mb-2">Counter-based (Snowflake)</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Guaranteed unique (no collisions)</div>
                          <div>• High performance (4M IDs/sec)</div>
                          <div>• Sortable by creation time</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Same long URL → different short URLs</div>
                          <div>• Requires coordination (ZooKeeper)</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-900/30 p-4 rounded-lg border-2 border-purple-700">
                      <div className="font-bold text-purple-400 mb-2">Our Decision: Snowflake + Deduplication Layer</div>
                      <div className="text-sm text-gray-300">
                        Use Snowflake for guaranteed uniqueness and performance. Add deduplication layer: before generating new ID, check cache/DB if long URL already exists. If yes, return existing short URL. This combines benefits of both approaches.
                      </div>
                    </div>
                  </div>

                  {/* HTTP 301 vs 302 */}
                  <div className="bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">2. HTTP 301 (Permanent) vs 302 (Temporary) Redirect</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-green-700">
                        <div className="font-bold text-green-400 mb-2">301 Permanent Redirect</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Browser caches redirect (faster subsequent clicks)</div>
                          <div>• Reduces server load significantly</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Can't track analytics (cached redirects bypass server)</div>
                          <div>• Can't update destination URL (cached in browser)</div>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-orange-700">
                        <div className="font-bold text-orange-400 mb-2">302 Temporary Redirect</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Always hits server (analytics tracking works)</div>
                          <div>• Can update destination URL dynamically</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Higher server load (every click hits server)</div>
                          <div>• Slightly slower user experience</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-cyan-900/30 p-4 rounded-lg border-2 border-cyan-700">
                      <div className="font-bold text-cyan-400 mb-2">Our Decision: 302 for Analytics, Configurable 301 for Power Users</div>
                      <div className="text-sm text-gray-300">
                        Default to 302 to enable analytics tracking. Offer 301 as premium feature for users who prefer performance over analytics. CDN caching (1-hour TTL) mitigates 302 performance impact.
                      </div>
                    </div>
                  </div>

                  {/* SQL vs NoSQL */}
                  <div className="bg-green-900/30 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-green-400 mb-4">3. SQL (PostgreSQL) vs NoSQL (Cassandra) for URL Storage</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-blue-700">
                        <div className="font-bold text-blue-400 mb-2">SQL (PostgreSQL)</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• ACID guarantees (data consistency)</div>
                          <div>• Mature ecosystem, well-understood</div>
                          <div>• Good for &lt;10TB scale with sharding</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Vertical scaling limits</div>
                          <div>• Manual sharding complexity</div>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-purple-700">
                        <div className="font-bold text-purple-400 mb-2">NoSQL (Cassandra)</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Horizontal scaling (petabyte scale)</div>
                          <div>• Auto-sharding, no manual partitioning</div>
                          <div>• Write-optimized (good for analytics)</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Eventual consistency (not ACID)</div>
                          <div>• Steeper learning curve</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-900/30 p-4 rounded-lg border-2 border-emerald-700">
                      <div className="font-bold text-emerald-400 mb-2">Our Decision: PostgreSQL with Sharding</div>
                      <div className="text-sm text-gray-300">
                        For TinyURL, data model is simple (key-value), and scale is manageable (6TB for 10 years). PostgreSQL offers ACID guarantees, mature tooling, and simpler operations. Shard by short_url hash across 64 nodes. Use Cassandra for analytics DB where write volume is higher and eventual consistency is acceptable.
                      </div>
                    </div>
                  </div>

                  {/* Custom Aliases */}
                  <div className="bg-purple-900/30 p-6 rounded-xl border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">4. Custom Aliases: Allowed vs Auto-Generated Only</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-green-700">
                        <div className="font-bold text-green-400 mb-2">Allow Custom Aliases</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• Better user experience (memorable URLs)</div>
                          <div>• Branding opportunities (tinyurl.com/nike)</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Uniqueness check (query DB before insert)</div>
                          <div>• Squatting prevention (reserve popular names)</div>
                          <div>• Profanity filtering required</div>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg border-2 border-orange-700">
                        <div className="font-bold text-orange-400 mb-2">Auto-Generated Only</div>
                        <div className="text-sm space-y-1 text-gray-300">
                          <div><strong>Pros:</strong></div>
                          <div>• No uniqueness checks (guaranteed unique via ID gen)</div>
                          <div>• Simpler implementation, faster</div>
                          <div>• No squatting or abuse issues</div>
                          <div><strong>Cons:</strong></div>
                          <div>• Not user-friendly (random strings)</div>
                          <div>• Limits branding opportunities</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-violet-900/30 p-4 rounded-lg border-2 border-violet-700">
                      <div className="font-bold text-violet-400 mb-2">Our Decision: Support Both (Premium Feature)</div>
                      <div className="text-sm text-gray-300">
                        Auto-generate by default for speed and simplicity. Offer custom aliases as premium feature: validate format (alphanumeric only), check uniqueness, filter profanity. Charge for custom aliases to prevent squatting and monetize the feature.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Considerations */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-pink-400">Additional Considerations</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-pink-900/30 p-6 rounded-xl">
                    <h3 className="font-bold text-pink-400 mb-3">Security</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>• <strong>DDoS Protection:</strong> CloudFlare for traffic filtering</div>
                      <div>• <strong>Malicious URLs:</strong> Check against Google Safe Browsing API</div>
                      <div>• <strong>Phishing Prevention:</strong> Block known phishing domains</div>
                      <div>• <strong>Encryption:</strong> TLS 1.3 for all traffic, encrypt DB at rest</div>
                      <div>• <strong>API Keys:</strong> SHA-256 hashed, rotatable</div>
                    </div>
                  </div>

                  <div className="bg-red-900/30 p-6 rounded-xl">
                    <h3 className="font-bold text-red-400 mb-3">Compliance</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>• <strong>GDPR:</strong> User data deletion within 30 days</div>
                      <div>• <strong>DMCA:</strong> Process takedown requests within 24 hours</div>
                      <div>• <strong>Terms of Service:</strong> Prohibit illegal content</div>
                      <div>• <strong>Privacy:</strong> Anonymize IP addresses after 90 days</div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/30 p-6 rounded-xl">
                    <h3 className="font-bold text-yellow-400 mb-3">Disaster Recovery</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>• <strong>Backups:</strong> Daily snapshots to S3 Glacier (7-year retention)</div>
                      <div>• <strong>Multi-region:</strong> Active-active in US-East and EU-West</div>
                      <div>• <strong>Failover:</strong> Automated DNS failover (RTO &lt;5 min)</div>
                      <div>• <strong>Data Loss:</strong> RPO &lt;1 minute with streaming replication</div>
                    </div>
                  </div>

                  <div className="bg-indigo-900/30 p-6 rounded-xl">
                    <h3 className="font-bold text-indigo-400 mb-3">Monetization</h3>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>• <strong>Free Tier:</strong> 10 URLs/hour, auto-generated aliases</div>
                      <div>• <strong>Premium:</strong> $9/month - custom aliases, analytics, no ads</div>
                      <div>• <strong>Enterprise:</strong> $99/month - API access, white-label, SLA</div>
                      <div>• <strong>Ads:</strong> Display ads on interstitial pages (optional)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function Newsfeed({ onBack }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'components', label: '🔧 Core Components', icon: '🔧' },
    { id: 'dataflow', label: '🔄 Data Flow', icon: '🔄' },
    { id: 'scalability', label: '📈 Scalability', icon: '📈' },
    { id: 'tradeoffs', label: '⚖️ Trade-offs', icon: '⚖️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border-l-8 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
            >
              <span>←</span>
              <span>Back</span>
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-5xl">📰</span>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Newsfeed System Design
              </span>
            </h1>
            <div className="w-24"></div>
          </div>
          <p className="text-gray-600 text-lg text-center">
            Design a scalable newsfeed system like Facebook or Twitter with fan-out strategies, ranking algorithms, and personalized content delivery
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b-2 border-gray-200 overflow-x-auto pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-blue-50 border-b-4 border-blue-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-blue-600">📝</span>
                System Requirements
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-700 mb-3">✅ Functional Requirements</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Feed Generation:</strong> Create personalized newsfeeds for users based on their connections</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Post Creation:</strong> Users can create posts (text, images, videos, links)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Follow/Friend:</strong> Users can follow others or become friends</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Feed Ranking:</strong> Posts ranked by relevance, recency, and engagement</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Real-time Updates:</strong> New posts appear in followers' feeds quickly</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Interactions:</strong> Like, comment, share, save posts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Pagination:</strong> Infinite scroll with lazy loading</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-orange-700 mb-3">⚡ Non-Functional Requirements</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>High Availability:</strong> 99.99% uptime for feed service</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Low Latency:</strong> Feed loads in &lt;500ms (P95)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Scalability:</strong> Support billions of users and posts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Eventual Consistency:</strong> Acceptable for feed updates (not critical data)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Fault Tolerance:</strong> System continues with degraded performance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Global Distribution:</strong> CDN for media, regional data centers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-indigo-600">🏗️</span>
                High-Level Architecture
              </h2>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border-2 border-indigo-200">
                <svg viewBox="0 0 1400 900" className="w-full h-auto">
                  {/* Client Layer */}
                  <rect x="50" y="50" width="200" height="80" fill="#3b82f6" rx="8"/>
                  <text x="150" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Web Client</text>
                  <text x="150" y="105" textAnchor="middle" fill="white" fontSize="12">React/Vue/Angular</text>

                  <rect x="300" y="50" width="200" height="80" fill="#3b82f6" rx="8"/>
                  <text x="400" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Mobile Apps</text>
                  <text x="400" y="105" textAnchor="middle" fill="white" fontSize="12">iOS/Android</text>

                  {/* Load Balancer */}
                  <rect x="175" y="180" width="250" height="60" fill="#8b5cf6" rx="8"/>
                  <text x="300" y="215" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Load Balancer (Nginx)</text>

                  {/* API Gateway */}
                  <rect x="175" y="280" width="250" height="60" fill="#6366f1" rx="8"/>
                  <text x="300" y="315" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">API Gateway</text>

                  {/* Microservices Layer */}
                  <rect x="50" y="390" width="180" height="100" fill="#10b981" rx="8"/>
                  <text x="140" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Post Service</text>
                  <text x="140" y="445" textAnchor="middle" fill="white" fontSize="11">Create/Edit Posts</text>
                  <text x="140" y="465" textAnchor="middle" fill="white" fontSize="11">Media Upload</text>

                  <rect x="260" y="390" width="180" height="100" fill="#f59e0b" rx="8"/>
                  <text x="350" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Feed Generation</text>
                  <text x="350" y="445" textAnchor="middle" fill="white" fontSize="11">Fan-out Service</text>
                  <text x="350" y="465" textAnchor="middle" fill="white" fontSize="11">Ranking Engine</text>

                  <rect x="470" y="390" width="180" height="100" fill="#ef4444" rx="8"/>
                  <text x="560" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">User Service</text>
                  <text x="560" y="445" textAnchor="middle" fill="white" fontSize="11">Profile/Friends</text>
                  <text x="560" y="465" textAnchor="middle" fill="white" fontSize="11">Follow Graph</text>

                  <rect x="680" y="390" width="180" height="100" fill="#ec4899" rx="8"/>
                  <text x="770" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Notification Service</text>
                  <text x="770" y="445" textAnchor="middle" fill="white" fontSize="11">Push/Email/SMS</text>
                  <text x="770" y="465" textAnchor="middle" fill="white" fontSize="11">Real-time Updates</text>

                  <rect x="890" y="390" width="180" height="100" fill="#8b5cf6" rx="8"/>
                  <text x="980" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Analytics Service</text>
                  <text x="980" y="445" textAnchor="middle" fill="white" fontSize="11">Engagement Metrics</text>
                  <text x="980" y="465" textAnchor="middle" fill="white" fontSize="11">ML Training Data</text>

                  {/* Message Queue */}
                  <rect x="175" y="540" width="250" height="60" fill="#f97316" rx="8"/>
                  <text x="300" y="565" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Message Queue (Kafka)</text>
                  <text x="300" y="585" textAnchor="middle" fill="white" fontSize="11">Event Streaming</text>

                  {/* Cache Layer */}
                  <rect x="550" y="540" width="200" height="60" fill="#06b6d4" rx="8"/>
                  <text x="650" y="565" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Cache (Redis)</text>
                  <text x="650" y="585" textAnchor="middle" fill="white" fontSize="11">Feed Cache, Hot Data</text>

                  {/* Database Layer */}
                  <rect x="50" y="650" width="180" height="80" fill="#334155" rx="8"/>
                  <text x="140" y="680" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Post DB</text>
                  <text x="140" y="700" textAnchor="middle" fill="white" fontSize="11">Cassandra/MongoDB</text>

                  <rect x="260" y="650" width="180" height="80" fill="#334155" rx="8"/>
                  <text x="350" y="680" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">User DB</text>
                  <text x="350" y="700" textAnchor="middle" fill="white" fontSize="11">PostgreSQL</text>

                  <rect x="470" y="650" width="180" height="80" fill="#334155" rx="8"/>
                  <text x="560" y="680" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Graph DB</text>
                  <text x="560" y="700" textAnchor="middle" fill="white" fontSize="11">Neo4j (Follow Graph)</text>

                  <rect x="680" y="650" width="180" height="80" fill="#334155" rx="8"/>
                  <text x="770" y="680" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Feed DB</text>
                  <text x="770" y="700" textAnchor="middle" fill="white" fontSize="11">Redis/Cassandra</text>

                  {/* Object Storage */}
                  <rect x="890" y="650" width="180" height="80" fill="#059669" rx="8"/>
                  <text x="980" y="680" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Object Storage</text>
                  <text x="980" y="700" textAnchor="middle" fill="white" fontSize="11">S3/GCS (Media)</text>

                  {/* CDN */}
                  <rect x="1100" y="390" width="180" height="100" fill="#0891b2" rx="8"/>
                  <text x="1190" y="425" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CDN</text>
                  <text x="1190" y="445" textAnchor="middle" fill="white" fontSize="11">CloudFront/Fastly</text>
                  <text x="1190" y="465" textAnchor="middle" fill="white" fontSize="11">Media Delivery</text>

                  {/* ML Service */}
                  <rect x="1100" y="540" width="180" height="60" fill="#7c3aed" rx="8"/>
                  <text x="1190" y="565" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">ML Ranking Service</text>
                  <text x="1190" y="585" textAnchor="middle" fill="white" fontSize="11">TensorFlow/PyTorch</text>

                  {/* Connections */}
                  <path d="M 150 130 L 300 180" stroke="#6366f1" strokeWidth="2" fill="none"/>
                  <path d="M 400 130 L 300 180" stroke="#6366f1" strokeWidth="2" fill="none"/>
                  <path d="M 300 240 L 300 280" stroke="#6366f1" strokeWidth="2" fill="none"/>
                  <path d="M 300 340 L 140 390" stroke="#10b981" strokeWidth="2" fill="none"/>
                  <path d="M 300 340 L 350 390" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <path d="M 300 340 L 560 390" stroke="#ef4444" strokeWidth="2" fill="none"/>
                  <path d="M 300 340 L 770 390" stroke="#ec4899" strokeWidth="2" fill="none"/>
                  <path d="M 300 340 L 980 390" stroke="#8b5cf6" strokeWidth="2" fill="none"/>

                  <path d="M 140 490 L 300 540" stroke="#f97316" strokeWidth="2" fill="none"/>
                  <path d="M 350 490 L 300 540" stroke="#f97316" strokeWidth="2" fill="none"/>
                  <path d="M 560 490 L 300 540" stroke="#f97316" strokeWidth="2" fill="none"/>

                  <path d="M 350 490 L 650 540" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                  <path d="M 560 490 L 650 540" stroke="#06b6d4" strokeWidth="2" fill="none"/>

                  <path d="M 140 490 L 140 650" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 560 490 L 350 650" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 560 490 L 560 650" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 350 490 L 770 650" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 140 490 L 980 650" stroke="#059669" strokeWidth="2" fill="none"/>

                  <path d="M 980 490 L 1190 540" stroke="#7c3aed" strokeWidth="2" fill="none"/>
                  <path d="M 1190 440 L 1100 440" stroke="#0891b2" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="font-bold text-blue-900 mb-2">Client Layer</div>
                  <div className="text-sm text-blue-800">Web and mobile clients communicate via REST/GraphQL APIs</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="font-bold text-green-900 mb-2">Service Layer</div>
                  <div className="text-sm text-green-800">Microservices handle posts, feeds, users, and notifications</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="font-bold text-purple-900 mb-2">Data Layer</div>
                  <div className="text-sm text-purple-800">Multiple databases optimized for different access patterns</div>
                </div>
              </div>
            </div>

            {/* Scale Estimates */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-emerald-600">📊</span>
                Scale & Capacity Estimates
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4 text-lg">User Base & Activity</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Total users: <strong>3 billion</strong></div>
                    <div>• Daily active users (DAU): <strong>1 billion</strong></div>
                    <div>• Average friends/followers: <strong>200</strong></div>
                    <div>• Posts created per day: <strong>100 million</strong></div>
                    <div>• Feed views per user/day: <strong>10</strong></div>
                    <div>• Posts per feed load: <strong>20</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-4 text-lg">Traffic Estimates</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Feed generation requests: <strong>10B/day</strong></div>
                    <div>• QPS (queries per second): <strong>~115K QPS</strong></div>
                    <div>• Peak QPS: <strong>~350K QPS</strong></div>
                    <div>• Write QPS (posts): <strong>~1,200 QPS</strong></div>
                    <div>• Read:Write ratio: <strong>100:1</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-4 text-lg">Storage Requirements</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Average post size: <strong>1 KB (text only)</strong></div>
                    <div>• With media (avg): <strong>500 KB/post</strong></div>
                    <div>• Daily storage (posts): <strong>50 TB/day</strong></div>
                    <div>• 5-year storage: <strong>~91 PB</strong></div>
                    <div>• Feed cache per user: <strong>100 KB</strong></div>
                    <div>• Total cache needed: <strong>~100 TB</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-4 text-lg">Bandwidth Estimates</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Incoming (posts): <strong>~600 MB/s</strong></div>
                    <div>• Outgoing (feeds): <strong>~60 GB/s</strong></div>
                    <div>• Peak bandwidth: <strong>~180 GB/s</strong></div>
                    <div>• CDN bandwidth: <strong>~500 Tbps</strong></div>
                    <div>• Media transfer: <strong>~90% of traffic</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Post Service */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                  <span>📝</span>
                  Post Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="font-semibold text-green-900 mb-1">Responsibilities</div>
                    <div className="text-sm">• Create, edit, delete posts</div>
                    <div className="text-sm">• Handle text, images, videos, links</div>
                    <div className="text-sm">• Extract metadata and hashtags</div>
                    <div className="text-sm">• Trigger fan-out on post creation</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-1">Technology Stack</div>
                    <div className="text-sm">• <strong>API:</strong> Node.js/Go microservices</div>
                    <div className="text-sm">• <strong>Storage:</strong> Cassandra (wide-column store)</div>
                    <div className="text-sm">• <strong>Media:</strong> S3 for images/videos</div>
                    <div className="text-sm">• <strong>Queue:</strong> Kafka for async processing</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="font-semibold text-yellow-900 mb-1">Key Features</div>
                    <div className="text-sm">• Idempotent post creation (avoid duplicates)</div>
                    <div className="text-sm">• Rate limiting per user (prevent spam)</div>
                    <div className="text-sm">• Content moderation (AI/manual review)</div>
                    <div className="text-sm">• Privacy settings (public/friends/custom)</div>
                  </div>
                </div>
              </div>

              {/* Feed Generation Service */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                  <span>🔄</span>
                  Feed Generation Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="font-semibold text-orange-900 mb-1">Fan-out Strategies</div>
                    <div className="text-sm">• <strong>Fan-out on Write:</strong> Pre-generate feeds when post created</div>
                    <div className="text-sm">• <strong>Fan-out on Read:</strong> Generate feed when user requests</div>
                    <div className="text-sm">• <strong>Hybrid:</strong> Celebrities use fan-out on read, regular users on write</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-semibold text-purple-900 mb-1">Feed Assembly</div>
                    <div className="text-sm">• Fetch user's follow list from Graph DB</div>
                    <div className="text-sm">• Retrieve recent posts from each followed user</div>
                    <div className="text-sm">• Merge and rank posts by ML model</div>
                    <div className="text-sm">• Cache assembled feed in Redis (TTL: 5 min)</div>
                  </div>
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <div className="font-semibold text-pink-900 mb-1">Optimization</div>
                    <div className="text-sm">• Pre-compute feeds for active users</div>
                    <div className="text-sm">• Lazy load for inactive users (on-demand)</div>
                    <div className="text-sm">• Batch processing for fan-out (reduce DB load)</div>
                  </div>
                </div>
              </div>

              {/* Ranking Engine */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                  <span>⭐</span>
                  Ranking Engine
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-1">Ranking Signals</div>
                    <div className="text-sm">• <strong>Recency:</strong> Newer posts ranked higher</div>
                    <div className="text-sm">• <strong>Engagement:</strong> Likes, comments, shares</div>
                    <div className="text-sm">• <strong>Affinity:</strong> User's interaction history with poster</div>
                    <div className="text-sm">• <strong>Content Type:</strong> Video &gt; Image &gt; Text</div>
                    <div className="text-sm">• <strong>Dwell Time:</strong> How long users view post</div>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <div className="font-semibold text-indigo-900 mb-1">ML Models</div>
                    <div className="text-sm">• <strong>Logistic Regression:</strong> Quick scoring baseline</div>
                    <div className="text-sm">• <strong>Gradient Boosting:</strong> XGBoost for feature engineering</div>
                    <div className="text-sm">• <strong>Deep Learning:</strong> Neural networks for personalization</div>
                    <div className="text-sm">• <strong>A/B Testing:</strong> Continuous model improvement</div>
                  </div>
                  <div className="bg-cyan-50 p-3 rounded-lg">
                    <div className="font-semibold text-cyan-900 mb-1">Real-time Adjustments</div>
                    <div className="text-sm">• Trending topics boosted temporarily</div>
                    <div className="text-sm">• Viral posts propagated faster</div>
                    <div className="text-sm">• Spam/low-quality posts demoted</div>
                  </div>
                </div>
              </div>

              {/* User/Graph Service */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
                  <span>👥</span>
                  User & Graph Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="font-semibold text-red-900 mb-1">User Management</div>
                    <div className="text-sm">• Profile data (name, bio, avatar)</div>
                    <div className="text-sm">• Authentication & authorization</div>
                    <div className="text-sm">• User preferences & settings</div>
                    <div className="text-sm">• Privacy & blocking controls</div>
                  </div>
                  <div className="bg-rose-50 p-3 rounded-lg">
                    <div className="font-semibold text-rose-900 mb-1">Social Graph</div>
                    <div className="text-sm">• <strong>Follow Relationships:</strong> Directed graph (A→B)</div>
                    <div className="text-sm">• <strong>Friend Relationships:</strong> Bidirectional (A↔B)</div>
                    <div className="text-sm">• <strong>Storage:</strong> Neo4j or adjacency list in PostgreSQL</div>
                    <div className="text-sm">• <strong>Queries:</strong> Get followers, following, mutual friends</div>
                  </div>
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <div className="font-semibold text-pink-900 mb-1">Graph Optimizations</div>
                    <div className="text-sm">• Cache popular users' follower lists</div>
                    <div className="text-sm">• Shard by user ID (consistent hashing)</div>
                    <div className="text-sm">• Denormalize for read performance</div>
                  </div>
                </div>
              </div>

              {/* Notification Service */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-pink-700 mb-4 flex items-center gap-2">
                  <span>🔔</span>
                  Notification Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <div className="font-semibold text-pink-900 mb-1">Notification Types</div>
                    <div className="text-sm">• New post from followed user</div>
                    <div className="text-sm">• Likes, comments, mentions on your post</div>
                    <div className="text-sm">• Friend requests, new followers</div>
                    <div className="text-sm">• Trending topics & recommendations</div>
                  </div>
                  <div className="bg-fuchsia-50 p-3 rounded-lg">
                    <div className="font-semibold text-fuchsia-900 mb-1">Delivery Channels</div>
                    <div className="text-sm">• <strong>Push Notifications:</strong> Firebase/APNs for mobile</div>
                    <div className="text-sm">• <strong>WebSocket:</strong> Real-time in-app updates</div>
                    <div className="text-sm">• <strong>Email:</strong> Digest emails for inactive users</div>
                    <div className="text-sm">• <strong>SMS:</strong> Critical notifications only</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-semibold text-purple-900 mb-1">Optimization</div>
                    <div className="text-sm">• User preferences for notification frequency</div>
                    <div className="text-sm">• Batch notifications to reduce noise</div>
                    <div className="text-sm">• Priority queue (urgent vs non-urgent)</div>
                  </div>
                </div>
              </div>

              {/* Cache & CDN */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
                  <span>⚡</span>
                  Cache & CDN
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-cyan-50 p-3 rounded-lg">
                    <div className="font-semibold text-cyan-900 mb-1">Redis Cache Layers</div>
                    <div className="text-sm">• <strong>Feed Cache:</strong> Pre-generated feeds (5 min TTL)</div>
                    <div className="text-sm">• <strong>Post Cache:</strong> Hot posts (viral content)</div>
                    <div className="text-sm">• <strong>User Cache:</strong> Profile data, preferences</div>
                    <div className="text-sm">• <strong>Graph Cache:</strong> Follower/following lists</div>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <div className="font-semibold text-teal-900 mb-1">CDN Strategy</div>
                    <div className="text-sm">• CloudFront/Fastly for media delivery</div>
                    <div className="text-sm">• Edge caching for images/videos (long TTL)</div>
                    <div className="text-sm">• Geographic distribution (low latency)</div>
                    <div className="text-sm">• Cache invalidation on content update</div>
                  </div>
                  <div className="bg-sky-50 p-3 rounded-lg">
                    <div className="font-semibold text-sky-900 mb-1">Cache Eviction</div>
                    <div className="text-sm">• LRU (Least Recently Used) for feed cache</div>
                    <div className="text-sm">• Write-through for critical data</div>
                    <div className="text-sm">• Lazy loading for cold data</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dataflow' && (
          <div className="space-y-8">
            {/* Post Creation Flow */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-green-600">📤</span>
                Post Creation & Fan-out Flow
              </h2>

              <div className="space-y-4">
                {[
                  { step: 1, title: 'User Creates Post', desc: 'User submits post via mobile/web client (text, media, hashtags)', color: 'blue' },
                  { step: 2, title: 'Upload to Post Service', desc: 'API Gateway routes to Post Service, media uploaded to S3 in parallel', color: 'green' },
                  { step: 3, title: 'Store Post Data', desc: 'Post metadata saved to Cassandra (post_id, user_id, content, timestamp)', color: 'purple' },
                  { step: 4, title: 'Publish to Kafka', desc: 'Post creation event published to Kafka topic "new_posts"', color: 'orange' },
                  { step: 5, title: 'Fan-out Decision', desc: 'Check user type: Celebrity (&gt;1M followers) → fan-out on read, Regular → fan-out on write', color: 'red' },
                  { step: 6, title: 'Fan-out on Write', desc: 'Fetch follower list from Graph DB, write post_id to each follower\'s feed in Redis', color: 'pink' },
                  { step: 7, title: 'Send Notifications', desc: 'Notification Service sends push/in-app notifications to active followers', color: 'indigo' },
                  { step: 8, title: 'Return Success', desc: 'API returns success to client, post visible in user\'s own feed immediately', color: 'cyan' }
                ].map(item => (
                  <div key={item.step} className={`bg-${item.color}-50 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                    <div className="flex items-start gap-4">
                      <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-${item.color}-900 mb-1`}>{item.title}</div>
                        <div className="text-gray-700 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feed Retrieval Flow */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-blue-600">📥</span>
                Feed Retrieval Flow
              </h2>

              <div className="space-y-4">
                {[
                  { step: 1, title: 'User Requests Feed', desc: 'User opens app or refreshes feed, request sent to API Gateway', color: 'blue' },
                  { step: 2, title: 'Check Feed Cache', desc: 'Feed Service checks Redis for cached feed (key: user_id, TTL: 5 min)', color: 'cyan' },
                  { step: 3, title: 'Cache Hit: Return Cached Feed', desc: 'If cache hit, return pre-generated feed (< 50ms latency)', color: 'green' },
                  { step: 4, title: 'Cache Miss: Fetch User Graph', desc: 'Query Graph DB for user\'s following list (up to 200 users)', color: 'purple' },
                  { step: 5, title: 'Retrieve Recent Posts', desc: 'For each followed user, fetch last 10 posts from Post DB (parallel queries)', color: 'orange' },
                  { step: 6, title: 'Merge & Rank Posts', desc: 'Merge all posts, apply ML ranking model (recency, engagement, affinity)', color: 'red' },
                  { step: 7, title: 'Hydrate Post Data', desc: 'Fetch post content, media URLs, user info, engagement counts', color: 'pink' },
                  { step: 8, title: 'Cache & Return', desc: 'Cache assembled feed in Redis, return top 20 posts to client', color: 'indigo' }
                ].map(item => (
                  <div key={item.step} className={`bg-${item.color}-50 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                    <div className="flex items-start gap-4">
                      <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-${item.color}-900 mb-1`}>{item.title}</div>
                        <div className="text-gray-700 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Updates */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-purple-600">🔴</span>
                Real-time Feed Updates
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-3 text-lg">WebSocket Connection</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• Client establishes WebSocket with Notification Service on app open</div>
                    <div>• Server maintains connection mapping (user_id → socket_id)</div>
                    <div>• When new post created, server pushes event to connected followers</div>
                    <div>• Client receives event, displays "New posts available" banner</div>
                    <div>• User clicks banner to refresh feed and see new content</div>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200">
                  <h3 className="font-bold text-indigo-900 mb-3 text-lg">Long Polling Fallback</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• For clients that don't support WebSocket (old browsers)</div>
                    <div>• Client sends long-polling request to server</div>
                    <div>• Server holds request until new content available (30s timeout)</div>
                    <div>• Returns immediately if new posts, else timeout and retry</div>
                    <div>• Higher latency (~1-2s) but more compatible</div>
                  </div>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
                  <h3 className="font-bold text-pink-900 mb-3 text-lg">Server-Sent Events (SSE)</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• One-way communication from server to client</div>
                    <div>• Simpler than WebSocket for read-only updates</div>
                    <div>• Client opens EventSource connection</div>
                    <div>• Server pushes feed update events</div>
                    <div>• Auto-reconnection on connection loss</div>
                  </div>
                </div>

                <div className="bg-cyan-50 p-6 rounded-xl border-2 border-cyan-200">
                  <h3 className="font-bold text-cyan-900 mb-3 text-lg">Pull-based Refresh</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• User manually pulls to refresh feed</div>
                    <div>• Server checks timestamp of last fetch</div>
                    <div>• Returns only posts created after timestamp</div>
                    <div>• Merge new posts with existing feed on client</div>
                    <div>• Simple, no persistent connection needed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scalability' && (
          <div className="space-y-8">
            {/* Database Sharding */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-purple-600">🗄️</span>
                Database Sharding Strategy
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-3">Post Data Sharding</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• <strong>Shard Key:</strong> post_id (hash-based)</div>
                    <div>• <strong>Shards:</strong> 1000 shards initially</div>
                    <div>• <strong>Distribution:</strong> Consistent hashing for even load</div>
                    <div>• <strong>Database:</strong> Cassandra (auto-sharding)</div>
                    <div>• <strong>Replication:</strong> 3 replicas per shard (high availability)</div>
                    <div>• <strong>Hot Shard Handling:</strong> Replicate viral posts to more nodes</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3">User/Graph Sharding</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• <strong>Shard Key:</strong> user_id</div>
                    <div>• <strong>Co-location:</strong> User data + their graph in same shard</div>
                    <div>• <strong>Cross-shard Queries:</strong> Scatter-gather for feed assembly</div>
                    <div>• <strong>Database:</strong> PostgreSQL with Citus extension</div>
                    <div>• <strong>Read Replicas:</strong> 5-10 read replicas per shard</div>
                    <div>• <strong>Celebrity Handling:</strong> Separate hot partition for high-follower users</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-3">Feed Data Sharding</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• <strong>Shard Key:</strong> user_id (each user's feed in one shard)</div>
                    <div>• <strong>Storage:</strong> Redis Cluster with 100 shards</div>
                    <div>• <strong>Data Structure:</strong> Sorted Set (score = timestamp)</div>
                    <div>• <strong>TTL:</strong> 5 minutes for cached feeds</div>
                    <div>• <strong>Eviction:</strong> LRU for inactive users</div>
                    <div>• <strong>Persistence:</strong> Cassandra backup for feed history</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-3">Analytics Sharding</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• <strong>Time-based Sharding:</strong> Partition by day/week</div>
                    <div>• <strong>Database:</strong> ClickHouse (columnar OLAP)</div>
                    <div>• <strong>Use Case:</strong> Engagement metrics, trending analysis</div>
                    <div>• <strong>Retention:</strong> Hot data (7 days), warm (30 days), cold (1 year)</div>
                    <div>• <strong>Aggregation:</strong> Pre-aggregated hourly/daily summaries</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Caching Strategy */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-cyan-600">⚡</span>
                Multi-Layer Caching Strategy
              </h2>

              <div className="space-y-4">
                <div className="bg-cyan-50 p-6 rounded-xl border-l-4 border-cyan-500">
                  <div className="font-bold text-cyan-900 mb-3 text-lg">L1: Client-Side Cache (App Memory)</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>• Cache feed data in app memory</div>
                    <div>• Cache user profiles, media thumbnails</div>
                    <div>• TTL: 1-2 minutes</div>
                    <div>• Reduces API calls by 30-40%</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <div className="font-bold text-blue-900 mb-3 text-lg">L2: CDN Cache (Edge Servers)</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>• Cache media files (images, videos)</div>
                    <div>• Cache static assets (JS, CSS)</div>
                    <div>• TTL: 24 hours for media, 7 days for assets</div>
                    <div>• 95%+ cache hit rate for media</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <div className="font-bold text-purple-900 mb-3 text-lg">L3: Application Cache (Redis)</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>• Feed cache (pre-generated feeds)</div>
                    <div>• Post cache (hot/viral posts)</div>
                    <div>• User cache (profiles, preferences)</div>
                    <div>• Graph cache (follower lists)</div>
                    <div>• TTL: 5 min (feeds), 1 hour (posts), 15 min (users)</div>
                    <div>• 100 TB total cache capacity</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <div className="font-bold text-green-900 mb-3 text-lg">L4: Database Query Cache</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>• PostgreSQL query result cache</div>
                    <div>• Cassandra row cache</div>
                    <div>• Cache frequent queries (user lookup, post fetch)</div>
                    <div>• Automatic invalidation on write</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Load Balancing */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-orange-600">⚖️</span>
                Load Balancing & Auto-Scaling
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-3">DNS Load Balancing</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• Route53 geo-routing</div>
                    <div>• Direct users to nearest region</div>
                    <div>• Failover to backup regions</div>
                    <div>• Health checks every 30s</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3">L4 Load Balancer</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• TCP/UDP load balancing</div>
                    <div>• High throughput (millions of requests/s)</div>
                    <div>• Minimal latency overhead</div>
                    <div>• Connection draining on failure</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-3">L7 Load Balancer</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• HTTP/HTTPS load balancing</div>
                    <div>• Path-based routing (/api/posts → Post Service)</div>
                    <div>• SSL termination</div>
                    <div>• Rate limiting per user</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-3">Auto-Scaling Policies</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Metric:</strong> CPU &gt; 70%</div>
                    <div>• <strong>Action:</strong> Add 20% more instances</div>
                    <div>• <strong>Cooldown:</strong> 5 minutes</div>
                    <div>• <strong>Min:</strong> 100 instances, <strong>Max:</strong> 10,000</div>
                  </div>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
                  <h3 className="font-bold text-pink-900 mb-3">Predictive Scaling</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• Analyze historical traffic patterns</div>
                    <div>• Pre-scale before peak hours</div>
                    <div>• Event-based scaling (World Cup, etc.)</div>
                    <div>• ML-based demand forecasting</div>
                  </div>
                </div>

                <div className="bg-cyan-50 p-6 rounded-xl border-2 border-cyan-200">
                  <h3 className="font-bold text-cyan-900 mb-3">Circuit Breaker</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• Detect failing services</div>
                    <div>• Stop sending requests (prevent cascade)</div>
                    <div>• Return cached/default response</div>
                    <div>• Auto-retry after cooldown period</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Optimizations */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-green-600">🚀</span>
                Performance Optimizations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="font-bold text-green-900 mb-3 text-lg">Feed Generation</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Pre-compute feeds</strong> for active users during low-traffic hours</div>
                    <div>• <strong>Batch fan-out</strong> writes (1000 users per batch)</div>
                    <div>• <strong>Async processing</strong> via Kafka (non-blocking)</div>
                    <div>• <strong>Pagination</strong>: Fetch only 20 posts per request</div>
                    <div>• <strong>Lazy loading</strong>: Images/videos load on scroll</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="font-bold text-blue-900 mb-3 text-lg">Database Optimization</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Denormalization</strong>: Store redundant data for fast reads</div>
                    <div>• <strong>Indexing</strong>: B-tree on user_id, timestamp columns</div>
                    <div>• <strong>Connection pooling</strong>: Reuse DB connections (reduce overhead)</div>
                    <div>• <strong>Read replicas</strong>: 10+ replicas for read-heavy workload</div>
                    <div>• <strong>Write batching</strong>: Group multiple writes into one transaction</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="font-bold text-purple-900 mb-3 text-lg">Network Optimization</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>HTTP/2</strong>: Multiplexing, header compression</div>
                    <div>• <strong>gRPC</strong>: Binary protocol for inter-service communication</div>
                    <div>• <strong>Compression</strong>: Gzip for API responses (reduce bandwidth)</div>
                    <div>• <strong>Keep-alive</strong>: Persistent connections (reduce handshakes)</div>
                    <div>• <strong>Protocol Buffers</strong>: Efficient serialization (vs JSON)</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <div className="font-bold text-orange-900 mb-3 text-lg">Client-Side Optimization</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Virtual scrolling</strong>: Render only visible posts</div>
                    <div>• <strong>Image lazy loading</strong>: Load images as user scrolls</div>
                    <div>• <strong>Thumbnail generation</strong>: 240p previews for fast loading</div>
                    <div>• <strong>Prefetching</strong>: Load next page while user views current</div>
                    <div>• <strong>Debouncing</strong>: Rate limit API calls on scroll</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tradeoffs' && (
          <div className="space-y-8">
            {/* Technology Stack */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-indigo-600">🛠️</span>
                Technology Stack Decisions
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200">
                  <h3 className="font-bold text-indigo-900 mb-4">Backend Services</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">API Layer: Node.js + Go</div>
                      <div className="text-gray-700">Node.js for I/O-bound operations, Go for CPU-intensive tasks (ranking)</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Message Queue: Kafka</div>
                      <div className="text-gray-700">High throughput, persistence, replay capability for fan-out</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Real-time: WebSocket (Socket.io)</div>
                      <div className="text-gray-700">Bidirectional, low-latency for live updates</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4">Databases</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">Post Storage: Cassandra</div>
                      <div className="text-gray-700">Wide-column, write-optimized, auto-sharding, high availability</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">User Data: PostgreSQL</div>
                      <div className="text-gray-700">ACID compliance, relational queries, mature ecosystem</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Social Graph: Neo4j</div>
                      <div className="text-gray-700">Graph database, efficient traversal for follow relationships</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-4">Caching & Storage</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">Cache: Redis Cluster</div>
                      <div className="text-gray-700">In-memory, data structures (sorted sets for feeds), pub/sub</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Object Storage: AWS S3</div>
                      <div className="text-gray-700">Unlimited storage, 99.999999999% durability, CDN integration</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">CDN: CloudFront</div>
                      <div className="text-gray-700">Global edge locations, low latency, automatic scaling</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-4">ML & Analytics</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">ML Framework: TensorFlow/PyTorch</div>
                      <div className="text-gray-700">Deep learning for ranking, recommendation personalization</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Feature Store: Feast</div>
                      <div className="text-gray-700">Centralized feature management for ML models</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Analytics: ClickHouse</div>
                      <div className="text-gray-700">Columnar OLAP, fast aggregations, real-time dashboards</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Trade-offs */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-orange-600">⚖️</span>
                Key Design Trade-offs
              </h2>

              <div className="space-y-6">
                {/* Fan-out Strategy */}
                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-orange-900 mb-4">1. Fan-out on Write vs Fan-out on Read</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2 flex items-center gap-2">
                        <span>✅</span>
                        <span>Fan-out on Write (Push Model)</span>
                      </div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Fast read (pre-computed feeds)</div>
                        <div>• Low latency for end users (&lt;50ms)</div>
                        <div>• Good for users with moderate followers</div>
                        <div><strong>Cons:</strong></div>
                        <div>• High write cost (celebrity with 100M followers)</div>
                        <div>• Wasted work for inactive users</div>
                        <div>• Storage overhead (duplicate post IDs)</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <div className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                        <span>✅</span>
                        <span>Fan-out on Read (Pull Model)</span>
                      </div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Low write cost (just store post)</div>
                        <div>• No wasted work for inactive users</div>
                        <div>• Always fresh data (no stale feeds)</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Slow read (compute on demand)</div>
                        <div>• High read latency (500ms - 2s)</div>
                        <div>• Database hot spots for popular users</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-100 p-4 rounded-lg border-2 border-purple-300">
                    <div className="font-bold text-purple-900 mb-2">🎯 Our Decision: Hybrid Approach</div>
                    <div className="text-sm text-gray-800">
                      • <strong>Regular users (&lt;1M followers):</strong> Fan-out on write (fast reads for 99% of users)
                      <br/>• <strong>Celebrities (&gt;1M followers):</strong> Fan-out on read (avoid write amplification)
                      <br/>• <strong>Feed assembly:</strong> Merge celebrity posts on-demand during feed retrieval
                      <br/>• <strong>Best of both worlds:</strong> Fast for most users, efficient for high-follower accounts
                    </div>
                  </div>
                </div>

                {/* Consistency Model */}
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">2. Strong Consistency vs Eventual Consistency</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                      <div className="font-bold text-red-700 mb-2">Strong Consistency</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Use Cases:</strong></div>
                        <div>• Financial transactions (likes count? No)</div>
                        <div>• User account data (email, password)</div>
                        <div>• Privacy settings (critical)</div>
                        <div><strong>Impact:</strong> Higher latency, lower availability</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2">Eventual Consistency</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Use Cases:</strong></div>
                        <div>• Newsfeed posts (OK if 1-2s delay)</div>
                        <div>• Like/comment counts (approximate OK)</div>
                        <div>• Follower counts</div>
                        <div><strong>Impact:</strong> Lower latency, higher availability</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-100 p-4 rounded-lg border-2 border-cyan-300">
                    <div className="font-bold text-cyan-900 mb-2">🎯 Our Decision: Eventual Consistency for Feeds</div>
                    <div className="text-sm text-gray-800">
                      Newsfeeds are not mission-critical. Users can tolerate 1-2 second delay for new posts to appear. This allows us to use Cassandra (AP system) for high availability and partition tolerance. Strong consistency used only for auth and payments.
                    </div>
                  </div>
                </div>

                {/* SQL vs NoSQL */}
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-900 mb-4">3. SQL vs NoSQL for Post Storage</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <div className="font-bold text-blue-700 mb-2">SQL (PostgreSQL)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div>• <strong>Pros:</strong> ACID, joins, complex queries, mature</div>
                        <div>• <strong>Cons:</strong> Vertical scaling limits, sharding complexity</div>
                        <div>• <strong>Fit:</strong> Good for structured user data</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2">NoSQL (Cassandra)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div>• <strong>Pros:</strong> Horizontal scaling, write-optimized, auto-sharding</div>
                        <div>• <strong>Cons:</strong> No joins, eventual consistency, learning curve</div>
                        <div>• <strong>Fit:</strong> Perfect for high-volume posts</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-100 p-4 rounded-lg border-2 border-emerald-300">
                    <div className="font-bold text-emerald-900 mb-2">🎯 Our Decision: NoSQL (Cassandra) for Posts</div>
                    <div className="text-sm text-gray-800">
                      Post data is write-heavy (100M posts/day), schema is simple (no complex joins needed), and we need horizontal scalability. Cassandra's tunable consistency and auto-sharding make it ideal. Use PostgreSQL for user accounts where ACID is important.
                    </div>
                  </div>
                </div>

                {/* Real-time Updates */}
                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">4. WebSocket vs Long Polling vs SSE</h3>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <div className="font-bold text-blue-700 mb-2 text-sm">WebSocket</div>
                      <div className="text-xs space-y-1 text-gray-700">
                        <div>• Bidirectional, low latency</div>
                        <div>• Persistent connection (resource intensive)</div>
                        <div>• Best for chat, real-time collaboration</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                      <div className="font-bold text-orange-700 mb-2 text-sm">Long Polling</div>
                      <div className="text-xs space-y-1 text-gray-700">
                        <div>• HTTP-based, compatible with all browsers</div>
                        <div>• Higher latency (1-2s)</div>
                        <div>• Fallback for old clients</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2 text-sm">Server-Sent Events</div>
                      <div className="text-xs space-y-1 text-gray-700">
                        <div>• One-way (server → client)</div>
                        <div>• Simple, auto-reconnect</div>
                        <div>• Good for notifications, feed updates</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-violet-100 p-4 rounded-lg border-2 border-violet-300">
                    <div className="font-bold text-violet-900 mb-2">🎯 Our Decision: WebSocket with Long Polling Fallback</div>
                    <div className="text-sm text-gray-800">
                      Use WebSocket for modern clients (low latency, efficient for feed updates). Fallback to long polling for old browsers. SSE is simpler but one-way only. For newsfeeds, bidirectional isn't critical, but WebSocket gives us flexibility for future features (live video, stories).
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Considerations */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-pink-600">💡</span>
                Additional Considerations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-pink-50 p-6 rounded-xl">
                  <h3 className="font-bold text-pink-900 mb-3">Content Moderation</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div>• AI-based moderation (NSFW detection, hate speech)</div>
                    <div>• User reporting system with priority queue</div>
                    <div>• Human moderators for edge cases</div>
                    <div>• Shadow banning for spam/abuse</div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="font-bold text-red-900 mb-3">Privacy & Security</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div>• Post visibility settings (public/friends/custom)</div>
                    <div>• GDPR compliance (data export, right to be forgotten)</div>
                    <div>• Rate limiting to prevent API abuse</div>
                    <div>• Encryption at rest and in transit (TLS 1.3)</div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="font-bold text-yellow-900 mb-3">Disaster Recovery</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div>• Multi-region replication (primary + 2 replicas)</div>
                    <div>• Daily backups to S3 Glacier (7-year retention)</div>
                    <div>• Automated failover (RTO &lt; 5 min, RPO &lt; 1 min)</div>
                    <div>• Chaos engineering (test failure scenarios)</div>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl">
                  <h3 className="font-bold text-indigo-900 mb-3">Monitoring & Alerts</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div>• Prometheus + Grafana for metrics</div>
                    <div>• ELK stack for centralized logging</div>
                    <div>• PagerDuty for on-call alerting</div>
                    <div>• Distributed tracing (Jaeger) for debugging</div>
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

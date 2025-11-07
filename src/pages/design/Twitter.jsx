import React, { useState } from 'react';

export default function Twitter({ onBack }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              🐦 Twitter/X System Design
            </h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-wide">
              Social Media
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-6 font-light">
            Scalable social media platform · 350M+ users · 500M+ tweets/day · Real-time timelines · Trending topics
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">Fan-out Strategy</span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">Real-time Feeds</span>
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">Graph Database</span>
            <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100">Redis Cache</span>
            <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-lg text-sm font-medium border border-pink-100">Search & Trends</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-0">
          {['overview', 'architecture', 'timeline', 'features', 'scalability', 'api'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'architecture' && 'Architecture'}
              {tab === 'timeline' && 'Timeline Generation'}
              {tab === 'features' && 'Key Features'}
              {tab === 'scalability' && 'Scalability'}
              {tab === 'api' && 'API Endpoints'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Requirements */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">System Requirements</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-4">Functional Requirements</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Post Tweets:</strong> Text, images, videos (280 chars)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Follow/Unfollow:</strong> Build social graph</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Timeline:</strong> View tweets from followed users</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Engagement:</strong> Like, retweet, reply, quote</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Search:</strong> Find tweets, users, hashtags</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Trends:</strong> Show trending topics globally/locally</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Notifications:</strong> Real-time mentions, likes, follows</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-4">Non-Functional Requirements</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>High Availability:</strong> 99.99% uptime</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Low Latency:</strong> Timeline load &lt;200ms</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Eventual Consistency:</strong> Acceptable for timelines</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Scalability:</strong> Handle 500M tweets/day</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Real-time:</strong> Tweets appear instantly</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Fault Tolerance:</strong> Graceful degradation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Scale Estimates */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">📊 Scale Estimates</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-blue-400 text-3xl font-bold">350M+</div>
                  <div className="text-gray-300 text-sm">Active Users</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 text-3xl font-bold">500M+</div>
                  <div className="text-gray-300 text-sm">Tweets per Day</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="text-purple-400 text-3xl font-bold">200M+</div>
                  <div className="text-gray-300 text-sm">Daily Active Users</div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Traffic & Storage Calculations</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-semibold">Tweets per second (average):</span>
                    <span className="text-blue-400 font-mono">~6,000 tweets/sec</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-semibold">Peak traffic (3x average):</span>
                    <span className="text-blue-400 font-mono">~18,000 tweets/sec</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-semibold">Timeline reads (100:1 read/write):</span>
                    <span className="text-blue-400 font-mono">~600,000 req/sec</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-semibold">Avg tweet size (text + metadata):</span>
                    <span className="text-blue-400 font-mono">~300 bytes</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-semibold">Daily storage (tweets only):</span>
                    <span className="text-green-400 font-mono font-bold">~150 GB/day</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">5-year storage (with media):</span>
                    <span className="text-yellow-400 font-mono font-bold">~100 TB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-8">
            {/* High-Level Architecture */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">🏗️ High-Level Architecture</h2>

              {/* Modern Visual Diagram */}
              <div className="space-y-6">
                {/* Client Layer */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-3xl w-full">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold mb-2">📱 Client Applications</div>
                      <div className="text-sm text-blue-100">Web • iOS • Android • Mobile Web</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-gray-500">↓</div>
                </div>

                {/* CDN Layer */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold mb-2">☁️ CDN (CloudFlare)</div>
                      <div className="text-sm text-purple-100">Static assets • Images • Videos • Global edge locations</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-gray-500">↓</div>
                </div>

                {/* Load Balancer */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400 max-w-3xl w-full">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold mb-2">⚖️ Load Balancer</div>
                      <div className="text-sm text-green-100">Nginx • Round-robin • Health checks • SSL termination</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-gray-500">↓</div>
                </div>

                {/* Application Servers */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400">
                  <div className="text-white">
                    <div className="text-2xl font-bold mb-4 text-center">⚙️ Application Servers (Microservices)</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Tweet Service</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">User Service</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Timeline Service</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Search Service</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Follow Service</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Trend Service</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Notification</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Media Service</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-gray-500">↓</div>
                </div>

                {/* Data Layer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 shadow-xl border-2 border-red-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3 text-center">🗄️ Primary DB</div>
                      <div className="space-y-2 text-sm">
                        <div className="bg-white/20 rounded p-2 backdrop-blur">MySQL Cluster</div>
                        <div className="text-xs text-red-100 text-center">Users, Tweets, Follows</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-xl border-2 border-yellow-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3 text-center">⚡ Cache Layer</div>
                      <div className="space-y-2 text-sm">
                        <div className="bg-white/20 rounded p-2 backdrop-blur">Redis Cluster</div>
                        <div className="text-xs text-yellow-100 text-center">Timelines, User data</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 shadow-xl border-2 border-cyan-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3 text-center">🔍 Search</div>
                      <div className="space-y-2 text-sm">
                        <div className="bg-white/20 rounded p-2 backdrop-blur">Elasticsearch</div>
                        <div className="text-xs text-cyan-100 text-center">Tweets, Users, Hashtags</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Queue */}
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 shadow-xl border-2 border-pink-400 mt-4">
                  <div className="text-white">
                    <div className="text-2xl font-bold mb-3 text-center">📬 Message Queue (Kafka)</div>
                    <div className="text-sm text-center text-pink-100">
                      Async processing • Fan-out writes • Analytics • Notifications
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
                <h3 className="text-xl font-bold text-blue-700 mb-4">🎯 Core Services</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Tweet Service:</strong> Create, delete, get tweets
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Timeline Service:</strong> Generate home and user timelines
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Follow Service:</strong> Follow graph management
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Search Service:</strong> Full-text search for tweets/users
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-lg">
                <h3 className="text-xl font-bold text-green-700 mb-4">💾 Data Storage</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>MySQL:</strong> User profiles, tweets, relationships (sharded)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Redis:</strong> Timeline cache, user sessions, trending topics
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Elasticsearch:</strong> Full-text search indexing
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>S3:</strong> Media files (images, videos)
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-8">
            {/* Timeline Generation Strategies */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 border-2 border-purple-500">
              <h2 className="text-3xl font-bold text-white mb-6">📰 Timeline Generation Strategies</h2>

              <p className="text-gray-300 text-lg mb-6">
                Twitter uses a <strong className="text-purple-400">hybrid approach</strong> combining fan-out-on-write
                and fan-out-on-read based on user characteristics.
              </p>

              {/* Fan-out on Write */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">Strategy 1: Fan-out on Write (Push)</h3>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400">
                    <div className="text-white text-center">
                      <div className="text-xl font-bold mb-2">👤 User posts a tweet</div>
                      <div className="text-sm text-blue-100">User has 1,000 followers</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="text-4xl text-purple-400">↓</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3 text-center">📬 Fan-out Worker (Kafka Consumer)</div>
                      <ul className="space-y-2 text-sm text-orange-50">
                        <li>• Fetch all follower IDs from Follow Service</li>
                        <li>• For each follower, push tweet ID to their timeline cache (Redis)</li>
                        <li>• 1,000 Redis writes executed asynchronously</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="text-4xl text-purple-400">↓</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3 text-center">⚡ Result: Fast Reads</div>
                      <ul className="space-y-2 text-sm text-green-50">
                        <li>✓ Timeline read = single Redis GET operation</li>
                        <li>✓ &lt;10ms response time</li>
                        <li>✓ Great for users with &lt;10K followers</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/50 rounded-lg p-4 mt-4">
                  <div className="text-green-300 font-semibold mb-2">Pros:</div>
                  <ul className="text-green-100 text-sm space-y-1">
                    <li>• Fast timeline reads (pre-computed)</li>
                    <li>• Low latency for users</li>
                  </ul>
                  <div className="text-red-300 font-semibold mt-3 mb-2">Cons:</div>
                  <ul className="text-red-100 text-sm space-y-1">
                    <li>• Expensive for celebrities (millions of writes)</li>
                    <li>• Slow tweet posting for high-follower users</li>
                  </ul>
                </div>
              </div>

              {/* Fan-out on Read */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">Strategy 2: Fan-out on Read (Pull)</h3>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400">
                    <div className="text-white text-center">
                      <div className="text-xl font-bold mb-2">👤 User requests timeline</div>
                      <div className="text-sm text-blue-100">User follows 300 people</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="text-4xl text-purple-400">↓</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3 text-center">🔍 Timeline Service</div>
                      <ul className="space-y-2 text-sm text-orange-50">
                        <li>• Fetch all following IDs from Follow Service</li>
                        <li>• Query recent tweets from all 300 users</li>
                        <li>• Merge and sort by timestamp</li>
                        <li>• Return top 50 tweets</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="text-4xl text-purple-400">↓</div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-xl border-2 border-yellow-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3 text-center">📊 Result: Heavy Reads</div>
                      <ul className="space-y-2 text-sm text-yellow-50">
                        <li>• 300 DB queries + merge sort</li>
                        <li>• ~200-500ms response time</li>
                        <li>• Used for celebrity tweets</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/50 rounded-lg p-4 mt-4">
                  <div className="text-green-300 font-semibold mb-2">Pros:</div>
                  <ul className="text-green-100 text-sm space-y-1">
                    <li>• Fast tweet posting (no fan-out)</li>
                    <li>• Works well for celebrities</li>
                  </ul>
                  <div className="text-red-300 font-semibold mt-3 mb-2">Cons:</div>
                  <ul className="text-red-100 text-sm space-y-1">
                    <li>• Slow timeline reads (heavy computation)</li>
                    <li>• High database load</li>
                  </ul>
                </div>
              </div>

              {/* Hybrid Approach */}
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 shadow-xl border-2 border-pink-400">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">🎯 Twitter's Hybrid Approach</div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-2xl">✓</span>
                      <div>
                        <strong>Regular users (&lt;10K followers):</strong> Fan-out on write to Redis cache
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-2xl">✓</span>
                      <div>
                        <strong>Celebrities (&gt;1M followers):</strong> Fan-out on read (pull dynamically)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-2xl">✓</span>
                      <div>
                        <strong>Timeline generation:</strong> Merge pre-computed + celebrity tweets
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-2xl">✓</span>
                      <div>
                        <strong>Cache TTL:</strong> Keep last 800 tweets in Redis (7 days)
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-8">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trending Topics */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-800 mb-4">🔥 Trending Topics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <div className="font-semibold text-gray-900">Real-time Analytics</div>
                      <div className="text-sm text-gray-600">Count hashtag mentions in sliding window (1 hour)</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <div className="font-semibold text-gray-900">Redis Sorted Sets</div>
                      <div className="text-sm text-gray-600">Store trending scores, auto-expire after 24h</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <div className="font-semibold text-gray-900">Geo-based Trends</div>
                      <div className="text-sm text-gray-600">Different trends per country/city</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Search */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4">🔍 Search</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📝</span>
                    <div>
                      <div className="font-semibold text-gray-900">Elasticsearch Indexing</div>
                      <div className="text-sm text-gray-600">Full-text search on tweets, users, hashtags</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <div className="font-semibold text-gray-900">Real-time Indexing</div>
                      <div className="text-sm text-gray-600">Tweets indexed within seconds via Kafka</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <div className="font-semibold text-gray-900">Ranking Algorithm</div>
                      <div className="text-sm text-gray-600">Sort by relevance, recency, engagement</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Notifications */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4">🔔 Notifications</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <div className="font-semibold text-gray-900">Push Notifications</div>
                      <div className="text-sm text-gray-600">APNs (iOS) and FCM (Android)</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <div className="font-semibold text-gray-900">WebSockets</div>
                      <div className="text-sm text-gray-600">Real-time updates for web clients</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <div className="font-semibold text-gray-900">Smart Batching</div>
                      <div className="text-sm text-gray-600">Aggregate notifications to reduce noise</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Media Upload */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-4">📸 Media Upload</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">☁️</span>
                    <div>
                      <div className="font-semibold text-gray-900">S3 Storage</div>
                      <div className="text-sm text-gray-600">Scalable object storage for images/videos</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎬</span>
                    <div>
                      <div className="font-semibold text-gray-900">Video Processing</div>
                      <div className="text-sm text-gray-600">Transcode to multiple formats and resolutions</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <div className="font-semibold text-gray-900">CDN Delivery</div>
                      <div className="text-sm text-gray-600">CloudFlare for fast global distribution</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scalability' && (
          <div className="space-y-8">
            {/* Scaling Strategies */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 border-2 border-blue-500">
              <h2 className="text-3xl font-bold text-white mb-6">📈 Scalability Strategies</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">🗄️ Database Sharding</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>User Sharding:</strong> Shard by userId using consistent hashing
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>Tweet Sharding:</strong> Shard by tweetId for even distribution
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>Follow Graph:</strong> Store in graph database (Neo4j) or Redis
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-300 mb-4">⚡ Caching Strategy</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>Timeline Cache:</strong> Redis sorted sets (800 tweets per user)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>User Cache:</strong> Profile data, follower counts (1 hour TTL)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>CDN Cache:</strong> Static assets, profile images
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">📊 Performance Targets</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-blue-400 text-3xl font-bold">&lt;200ms</div>
                  <div className="text-gray-300 text-sm">Timeline Load Time</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 text-3xl font-bold">&lt;100ms</div>
                  <div className="text-gray-300 text-sm">Tweet Post Time</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="text-purple-400 text-3xl font-bold">99.99%</div>
                  <div className="text-gray-300 text-sm">Availability SLA</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="text-yellow-400 text-3xl font-bold">18K/sec</div>
                  <div className="text-gray-300 text-sm">Peak Tweet Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Endpoints Tab */}
        {activeTab === 'api' && (
          <div className="space-y-8">
            {/* API Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">API Overview</h2>
              <p className="text-gray-700 mb-4">
                RESTful API with OAuth 2.0 authentication. All endpoints return JSON responses and support pagination.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-blue-100">
                  <div className="font-bold text-blue-600 mb-2">Base URL</div>
                  <code className="text-sm text-gray-700">https://api.twitter.com/v2</code>
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-100">
                  <div className="font-bold text-blue-600 mb-2">Authentication</div>
                  <code className="text-sm text-gray-700">Bearer Token / OAuth 2.0</code>
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-100">
                  <div className="font-bold text-blue-600 mb-2">Rate Limit</div>
                  <code className="text-sm text-gray-700">300 requests / 15 min</code>
                </div>
              </div>
            </div>

            {/* Tweet Endpoints */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Tweet Endpoints</h2>

              <div className="space-y-6">
                {/* Post Tweet */}
                <div className="border-l-4 border-green-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-sm">POST</span>
                    <code className="text-gray-700 font-mono text-sm">/tweets</code>
                  </div>
                  <p className="text-gray-600 mb-3">Create a new tweet</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Request Body:</div>
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "text": "Hello World!",
  "media_ids": ["123456789"],
  "reply_settings": "everyone"
}`}
                    </pre>
                  </div>
                </div>

                {/* Get Tweet */}
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">GET</span>
                    <code className="text-gray-700 font-mono text-sm">/tweets/:id</code>
                  </div>
                  <p className="text-gray-600 mb-3">Retrieve a specific tweet by ID</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Response:</div>
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "id": "1234567890",
  "text": "Hello World!",
  "author_id": "987654321",
  "created_at": "2024-01-15T10:30:00Z",
  "metrics": {
    "retweet_count": 42,
    "like_count": 128,
    "reply_count": 15
  }
}`}
                    </pre>
                  </div>
                </div>

                {/* Delete Tweet */}
                <div className="border-l-4 border-red-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-bold text-sm">DELETE</span>
                    <code className="text-gray-700 font-mono text-sm">/tweets/:id</code>
                  </div>
                  <p className="text-gray-600">Delete a tweet</p>
                </div>
              </div>
            </div>

            {/* Timeline Endpoints */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📰 Timeline Endpoints</h2>

              <div className="space-y-6">
                {/* Home Timeline */}
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">GET</span>
                    <code className="text-gray-700 font-mono text-sm">/users/:id/timeline</code>
                  </div>
                  <p className="text-gray-600 mb-3">Get user's home timeline (tweets from followed users)</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Query Parameters:</div>
                    <pre className="text-xs text-gray-700">
{`max_results=20
pagination_token=abc123
since_id=1234567890`}
                    </pre>
                  </div>
                </div>

                {/* User Tweets */}
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">GET</span>
                    <code className="text-gray-700 font-mono text-sm">/users/:id/tweets</code>
                  </div>
                  <p className="text-gray-600">Get tweets posted by a specific user</p>
                </div>
              </div>
            </div>

            {/* User Endpoints */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">👤 User Endpoints</h2>

              <div className="space-y-6">
                {/* Get User */}
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">GET</span>
                    <code className="text-gray-700 font-mono text-sm">/users/:id</code>
                  </div>
                  <p className="text-gray-600 mb-3">Get user profile information</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Response:</div>
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "id": "987654321",
  "username": "johndoe",
  "name": "John Doe",
  "bio": "Software Engineer",
  "followers_count": 1500,
  "following_count": 300,
  "verified": true
}`}
                    </pre>
                  </div>
                </div>

                {/* Follow User */}
                <div className="border-l-4 border-green-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-sm">POST</span>
                    <code className="text-gray-700 font-mono text-sm">/users/:id/following</code>
                  </div>
                  <p className="text-gray-600">Follow a user</p>
                </div>

                {/* Unfollow User */}
                <div className="border-l-4 border-red-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-bold text-sm">DELETE</span>
                    <code className="text-gray-700 font-mono text-sm">/users/:id/following/:target_user_id</code>
                  </div>
                  <p className="text-gray-600">Unfollow a user</p>
                </div>

                {/* Get Followers */}
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">GET</span>
                    <code className="text-gray-700 font-mono text-sm">/users/:id/followers</code>
                  </div>
                  <p className="text-gray-600">Get list of user's followers</p>
                </div>
              </div>
            </div>

            {/* Engagement Endpoints */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❤️ Engagement Endpoints</h2>

              <div className="space-y-6">
                {/* Like Tweet */}
                <div className="border-l-4 border-green-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-sm">POST</span>
                    <code className="text-gray-700 font-mono text-sm">/users/:id/likes</code>
                  </div>
                  <p className="text-gray-600">Like a tweet</p>
                </div>

                {/* Retweet */}
                <div className="border-l-4 border-green-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-sm">POST</span>
                    <code className="text-gray-700 font-mono text-sm">/users/:id/retweets</code>
                  </div>
                  <p className="text-gray-600">Retweet a tweet</p>
                </div>
              </div>
            </div>

            {/* Search Endpoints */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 Search Endpoints</h2>

              <div className="space-y-6">
                {/* Search Tweets */}
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">GET</span>
                    <code className="text-gray-700 font-mono text-sm">/tweets/search/recent</code>
                  </div>
                  <p className="text-gray-600 mb-3">Search recent tweets</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Query Parameters:</div>
                    <pre className="text-xs text-gray-700">
{`query=machine learning
max_results=100
sort_order=relevancy`}
                    </pre>
                  </div>
                </div>

                {/* Trending Topics */}
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">GET</span>
                    <code className="text-gray-700 font-mono text-sm">/trends</code>
                  </div>
                  <p className="text-gray-600">Get trending topics</p>
                </div>
              </div>
            </div>

            {/* Response Codes */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">📊 HTTP Status Codes</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 font-bold mb-1">200 OK</div>
                  <div className="text-gray-300 text-sm">Request successful</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 font-bold mb-1">201 Created</div>
                  <div className="text-gray-300 text-sm">Resource created successfully</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="text-yellow-400 font-bold mb-1">400 Bad Request</div>
                  <div className="text-gray-300 text-sm">Invalid request parameters</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="text-yellow-400 font-bold mb-1">401 Unauthorized</div>
                  <div className="text-gray-300 text-sm">Authentication required</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="text-red-400 font-bold mb-1">404 Not Found</div>
                  <div className="text-gray-300 text-sm">Resource doesn't exist</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="text-red-400 font-bold mb-1">429 Too Many Requests</div>
                  <div className="text-gray-300 text-sm">Rate limit exceeded</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

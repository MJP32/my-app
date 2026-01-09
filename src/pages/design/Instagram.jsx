import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function Instagram({ onBack, breadcrumb }) {
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
        <div className="mb-8 bg-gray-800 rounded-2xl shadow-lg p-6 border-l-8 border-pink-500">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-pink-300 font-medium border border-pink-700"
            >
              <span>←</span>
              <span>Back</span>
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-3">
              <span className="text-5xl">📸</span>
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Instagram System Design
              </span>
            </h1>
            <div className="w-24"></div>
          </div>
          <p className="text-gray-300 text-lg text-center">
            Design a photo-sharing platform like Instagram with image upload/storage, feed generation, stories, likes/comments, followers, and billion-user scale
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab.id
                  ? 'text-pink-400 bg-pink-900/30 border-b-4 border-pink-500 -mb-0.5'
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
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-pink-400">📝</span>
                System Requirements
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-400 mb-3">✅ Functional Requirements</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Upload Photos:</strong> Users can upload images (up to 10 per post)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Feed Generation:</strong> Personalized feed showing posts from followed users</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Stories:</strong> Ephemeral content (disappears after 24 hours)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Social Interactions:</strong> Like, comment, share, save posts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Follow/Unfollow:</strong> Build social graph by following users</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Explore Page:</strong> Discover new content based on interests</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Search:</strong> Search users, hashtags, locations</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-orange-400 mb-3">⚡ Non-Functional Requirements</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>High Availability:</strong> 99.99% uptime</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Low Latency:</strong> Feed loads in &lt;500ms (P95)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Scalability:</strong> Support 2 billion users, 95M posts/day</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Reliability:</strong> No data loss for uploaded photos</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Performance:</strong> Fast image loading with adaptive quality</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-purple-400">🏗️</span>
                High-Level Architecture
              </h2>

              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 rounded-xl border-2 border-purple-700">
                <svg viewBox="0 0 1400 900" className="w-full h-auto">
                  {/* Client Layer */}
                  <rect x="50" y="50" width="160" height="70" fill="#e91e63" rx="8"/>
                  <text x="130" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Mobile App</text>
                  <text x="130" y="100" textAnchor="middle" fill="white" fontSize="11">iOS/Android</text>

                  <rect x="250" y="50" width="160" height="70" fill="#e91e63" rx="8"/>
                  <text x="330" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Web Client</text>
                  <text x="330" y="100" textAnchor="middle" fill="white" fontSize="11">React/Next.js</text>

                  {/* CDN */}
                  <rect x="450" y="50" width="160" height="70" fill="#0891b2" rx="8"/>
                  <text x="530" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CDN</text>
                  <text x="530" y="100" textAnchor="middle" fill="white" fontSize="11">CloudFront</text>

                  {/* Load Balancer */}
                  <rect x="150" y="170" width="260" height="60" fill="#8b5cf6" rx="8"/>
                  <text x="280" y="205" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Load Balancer</text>

                  {/* API Gateway */}
                  <rect x="150" y="270" width="260" height="60" fill="#6366f1" rx="8"/>
                  <text x="280" y="305" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">API Gateway</text>

                  {/* Services Layer */}
                  <rect x="50" y="380" width="160" height="90" fill="#10b981" rx="8"/>
                  <text x="130" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Upload Service</text>
                  <text x="130" y="430" textAnchor="middle" fill="white" fontSize="10">Image Processing</text>
                  <text x="130" y="448" textAnchor="middle" fill="white" fontSize="10">Resize/Compress</text>

                  <rect x="240" y="380" width="160" height="90" fill="#f59e0b" rx="8"/>
                  <text x="320" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Feed Service</text>
                  <text x="320" y="430" textAnchor="middle" fill="white" fontSize="10">Generate Feed</text>
                  <text x="320" y="448" textAnchor="middle" fill="white" fontSize="10">Ranking</text>

                  <rect x="430" y="380" width="160" height="90" fill="#ef4444" rx="8"/>
                  <text x="510" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">User Service</text>
                  <text x="510" y="430" textAnchor="middle" fill="white" fontSize="10">Profile/Auth</text>
                  <text x="510" y="448" textAnchor="middle" fill="white" fontSize="10">Follow Graph</text>

                  <rect x="620" y="380" width="160" height="90" fill="#ec4899" rx="8"/>
                  <text x="700" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Story Service</text>
                  <text x="700" y="430" textAnchor="middle" fill="white" fontSize="10">24hr Content</text>
                  <text x="700" y="448" textAnchor="middle" fill="white" fontSize="10">Auto-Expire</text>

                  <rect x="810" y="380" width="160" height="90" fill="#8b5cf6" rx="8"/>
                  <text x="890" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Search Service</text>
                  <text x="890" y="430" textAnchor="middle" fill="white" fontSize="10">Users/Hashtags</text>
                  <text x="890" y="448" textAnchor="middle" fill="white" fontSize="10">Elasticsearch</text>

                  <rect x="1000" y="380" width="160" height="90" fill="#06b6d4" rx="8"/>
                  <text x="1080" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Notification</text>
                  <text x="1080" y="430" textAnchor="middle" fill="white" fontSize="10">Push/In-App</text>
                  <text x="1080" y="448" textAnchor="middle" fill="white" fontSize="10">FCM/APNS</text>

                  {/* Message Queue */}
                  <rect x="150" y="520" width="260" height="60" fill="#f97316" rx="8"/>
                  <text x="280" y="545" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Message Queue (Kafka)</text>
                  <text x="280" y="565" textAnchor="middle" fill="white" fontSize="11">Async Processing</text>

                  {/* Cache Layer */}
                  <rect x="620" y="520" width="340" height="60" fill="#06b6d4" rx="8"/>
                  <text x="790" y="545" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Cache Layer (Redis)</text>
                  <text x="790" y="565" textAnchor="middle" fill="white" fontSize="11">Feed, User Data, Hot Content</text>

                  {/* Databases */}
                  <rect x="50" y="630" width="160" height="80" fill="#334155" rx="8"/>
                  <text x="130" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Post DB</text>
                  <text x="130" y="680" textAnchor="middle" fill="white" fontSize="10">Cassandra</text>

                  <rect x="240" y="630" width="160" height="80" fill="#334155" rx="8"/>
                  <text x="320" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">User DB</text>
                  <text x="320" y="680" textAnchor="middle" fill="white" fontSize="10">PostgreSQL</text>

                  <rect x="430" y="630" width="160" height="80" fill="#334155" rx="8"/>
                  <text x="510" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Graph DB</text>
                  <text x="510" y="680" textAnchor="middle" fill="white" fontSize="10">Neo4j</text>

                  <rect x="620" y="630" width="160" height="80" fill="#059669" rx="8"/>
                  <text x="700" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Object Storage</text>
                  <text x="700" y="680" textAnchor="middle" fill="white" fontSize="10">S3</text>

                  <rect x="810" y="630" width="160" height="80" fill="#7c3aed" rx="8"/>
                  <text x="890" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Search Index</text>
                  <text x="890" y="680" textAnchor="middle" fill="white" fontSize="10">Elasticsearch</text>

                  <rect x="1000" y="630" width="160" height="80" fill="#0891b2" rx="8"/>
                  <text x="1080" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Analytics DB</text>
                  <text x="1080" y="680" textAnchor="middle" fill="white" fontSize="10">ClickHouse</text>

                  {/* Connections */}
                  <path d="M 130 120 L 280 170" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  <path d="M 330 120 L 280 170" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  <path d="M 530 120 L 530 300" stroke="#0891b2" strokeWidth="2" fill="none" strokeDasharray="5,5"/>

                  <path d="M 280 230 L 280 270" stroke="#6366f1" strokeWidth="2" fill="none"/>

                  <path d="M 280 330 L 130 380" stroke="#10b981" strokeWidth="2" fill="none"/>
                  <path d="M 280 330 L 320 380" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <path d="M 280 330 L 510 380" stroke="#ef4444" strokeWidth="2" fill="none"/>
                  <path d="M 280 330 L 700 380" stroke="#ec4899" strokeWidth="2" fill="none"/>
                  <path d="M 280 330 L 890 380" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  <path d="M 280 330 L 1080 380" stroke="#06b6d4" strokeWidth="2" fill="none"/>

                  <path d="M 130 470 L 280 520" stroke="#f97316" strokeWidth="2" fill="none"/>
                  <path d="M 320 470 L 280 520" stroke="#f97316" strokeWidth="2" fill="none"/>
                  <path d="M 510 470 L 790 520" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                  <path d="M 700 470 L 790 520" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                  <path d="M 1080 470 L 790 520" stroke="#06b6d4" strokeWidth="2" fill="none"/>

                  <path d="M 130 470 L 130 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 510 470 L 320 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 510 470 L 510 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 130 470 L 700 630" stroke="#059669" strokeWidth="2" fill="none"/>
                  <path d="M 890 470 L 890 630" stroke="#7c3aed" strokeWidth="2" fill="none"/>
                  <path d="M 1080 470 L 1080 630" stroke="#0891b2" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-pink-900/30 p-4 rounded-lg border-l-4 border-pink-500">
                  <div className="font-bold text-pink-300 mb-2">Client Layer</div>
                  <div className="text-sm text-pink-200">Mobile and web apps with CDN for fast media delivery</div>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="font-bold text-purple-300 mb-2">Service Layer</div>
                  <div className="text-sm text-purple-200">Microservices for upload, feed, users, stories, search</div>
                </div>
                <div className="bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-500">
                  <div className="font-bold text-indigo-300 mb-2">Data Layer</div>
                  <div className="text-sm text-indigo-200">Distributed databases with S3 for images and Redis for caching</div>
                </div>
              </div>
            </div>

            {/* Scale Estimates */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-emerald-400">📊</span>
                Scale & Capacity Estimates
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border-2 border-blue-700">
                  <h3 className="font-bold text-blue-300 mb-4 text-lg">User Base & Activity</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Total users: <strong>2 billion</strong></div>
                    <div>• Daily active users (DAU): <strong>500 million</strong></div>
                    <div>• Photos uploaded per day: <strong>95 million</strong></div>
                    <div>• Stories posted per day: <strong>500 million</strong></div>
                    <div>• Average photos per user: <strong>~200 photos</strong></div>
                    <div>• Likes per day: <strong>4.2 billion</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border-2 border-green-700">
                  <h3 className="font-bold text-green-300 mb-4 text-lg">Storage Requirements</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Average photo size: <strong>~2 MB (original)</strong></div>
                    <div>• Thumbnails (3 sizes): <strong>~200 KB total</strong></div>
                    <div>• Daily photo storage: <strong>~190 TB/day</strong></div>
                    <div>• 5-year photo storage: <strong>~347 PB</strong></div>
                    <div>• Story storage (24hr): <strong>~1 PB (rotating)</strong></div>
                    <div>• Metadata: <strong>~10 TB</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border-2 border-purple-700">
                  <h3 className="font-bold text-purple-300 mb-4 text-lg">Traffic Estimates</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Feed requests per day: <strong>~2.5 billion</strong></div>
                    <div>• QPS (average): <strong>~29,000</strong></div>
                    <div>• Peak QPS: <strong>~90,000</strong></div>
                    <div>• Image view requests: <strong>~10 billion/day</strong></div>
                    <div>• CDN traffic: <strong>~85% of requests</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-6 rounded-xl border-2 border-orange-700">
                  <h3 className="font-bold text-orange-300 mb-4 text-lg">Bandwidth Requirements</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Upload bandwidth: <strong>~22 GB/s</strong></div>
                    <div>• Download bandwidth: <strong>~230 GB/s</strong></div>
                    <div>• Total bandwidth: <strong>~252 GB/s (~2 Tbps)</strong></div>
                    <div>• CDN bandwidth: <strong>~195 GB/s</strong></div>
                    <div>• Peak bandwidth: <strong>~6 Tbps</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-indigo-400">✨</span>
                Key Features & Considerations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-900/30 p-6 rounded-xl border-l-4 border-indigo-500">
                  <h3 className="font-bold text-indigo-300 mb-3 text-lg">Image Processing Pipeline</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div>• <strong>Upload:</strong> Original image uploaded to S3</div>
                    <div>• <strong>Async Processing:</strong> Kafka event triggers image processing</div>
                    <div>• <strong>Generate Thumbnails:</strong> 150px, 320px, 640px, 1080px</div>
                    <div>• <strong>Compression:</strong> WebP format (30% smaller than JPEG)</div>
                    <div>• <strong>CDN Distribution:</strong> Push to CloudFront edge locations</div>
                    <div>• <strong>Metadata Extraction:</strong> EXIF data, location, timestamp</div>
                  </div>
                </div>

                <div className="bg-pink-900/30 p-6 rounded-xl border-l-4 border-pink-500">
                  <h3 className="font-bold text-pink-300 mb-3 text-lg">Feed Ranking Algorithm</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div>• <strong>Recency:</strong> Recent posts weighted higher</div>
                    <div>• <strong>Engagement:</strong> Likes, comments, shares, saves</div>
                    <div>• <strong>Affinity:</strong> User's interaction with poster</div>
                    <div>• <strong>Content Type:</strong> Video &gt; Carousel &gt; Photo</div>
                    <div>• <strong>Dwell Time:</strong> How long user views post</div>
                    <div>• <strong>ML Model:</strong> Neural network trained on user behavior</div>
                  </div>
                </div>

                <div className="bg-green-900/30 p-6 rounded-xl border-l-4 border-green-500">
                  <h3 className="font-bold text-green-300 mb-3 text-lg">Stories Architecture</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div>• <strong>Ephemeral Storage:</strong> Auto-delete after 24 hours</div>
                    <div>• <strong>Hot Storage:</strong> Redis for active stories (fast access)</div>
                    <div>• <strong>TTL:</strong> 24-hour expiration timestamp</div>
                    <div>• <strong>Batch Deletion:</strong> Cron job removes expired stories</div>
                    <div>• <strong>View Count:</strong> Tracked in real-time (Redis counters)</div>
                    <div>• <strong>Sequential Display:</strong> Stories from same user grouped</div>
                  </div>
                </div>

                <div className="bg-yellow-900/30 p-6 rounded-xl border-l-4 border-yellow-500">
                  <h3 className="font-bold text-yellow-300 mb-3 text-lg">Follow Graph Management</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div>• <strong>Graph Database:</strong> Neo4j for follow relationships</div>
                    <div>• <strong>Bi-directional:</strong> Track followers and following</div>
                    <div>• <strong>Cache:</strong> Redis for celebrity follower lists (&gt;1M)</div>
                    <div>• <strong>Fan-out:</strong> Write for regular users, read for celebrities</div>
                    <div>• <strong>Suggested Users:</strong> Collaborative filtering algorithm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Upload Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <span>📤</span>
                  Upload Service
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="bg-green-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-green-300 mb-1">Upload Flow</div>
                    <div className="text-sm">• Client uploads image to Upload Service</div>
                    <div className="text-sm">• Store original in S3 with unique key (UUID)</div>
                    <div className="text-sm">• Publish event to Kafka for async processing</div>
                    <div className="text-sm">• Return post ID to client immediately</div>
                  </div>
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-blue-300 mb-1">Image Processing</div>
                    <div className="text-sm">• <strong>Worker pool:</strong> Consume Kafka events</div>
                    <div className="text-sm">• <strong>Generate thumbnails:</strong> 4 sizes (150, 320, 640, 1080px)</div>
                    <div className="text-sm">• <strong>Format conversion:</strong> JPEG → WebP (30% smaller)</div>
                    <div className="text-sm">• <strong>EXIF extraction:</strong> Location, timestamp, device</div>
                    <div className="text-sm">• <strong>CDN push:</strong> Distribute to edge locations</div>
                  </div>
                  <div className="bg-purple-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-purple-300 mb-1">Optimizations</div>
                    <div className="text-sm">• Chunked upload for large files (multipart)</div>
                    <div className="text-sm">• Pre-signed URLs for direct S3 upload</div>
                    <div className="text-sm">• Parallel processing with worker pool</div>
                  </div>
                </div>
              </div>

              {/* Feed Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                  <span>📰</span>
                  Feed Service
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="bg-orange-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-orange-300 mb-1">Feed Generation</div>
                    <div className="text-sm">• <strong>Fetch following list:</strong> From Graph DB</div>
                    <div className="text-sm">• <strong>Get posts:</strong> Last 100 posts from each user</div>
                    <div className="text-sm">• <strong>Merge & rank:</strong> ML ranking algorithm</div>
                    <div className="text-sm">• <strong>Cache result:</strong> Store in Redis (5-min TTL)</div>
                  </div>
                  <div className="bg-red-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-red-300 mb-1">Fan-out Strategy</div>
                    <div className="text-sm">• <strong>Regular users:</strong> Fan-out on write (pre-generate)</div>
                    <div className="text-sm">• <strong>Celebrities:</strong> Fan-out on read (on-demand)</div>
                    <div className="text-sm">• <strong>Hybrid:</strong> Mix celebrity posts during feed assembly</div>
                  </div>
                  <div className="bg-pink-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-pink-300 mb-1">Ranking Signals</div>
                    <div className="text-sm">• Engagement rate (likes/comments)</div>
                    <div className="text-sm">• Recency (posted in last 24 hours)</div>
                    <div className="text-sm">• User affinity (interaction history)</div>
                    <div className="text-sm">• Content type (video prioritized)</div>
                  </div>
                </div>
              </div>

              {/* Story Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                  <span>⏰</span>
                  Story Service
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="bg-pink-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-pink-300 mb-1">Story Upload</div>
                    <div className="text-sm">• Upload image/video to S3</div>
                    <div className="text-sm">• Store metadata in Redis with 24hr TTL</div>
                    <div className="text-sm">• Add to user's story ring (sorted set by timestamp)</div>
                    <div className="text-sm">• Notify followers via push notification</div>
                  </div>
                  <div className="bg-purple-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-purple-300 mb-1">Story Retrieval</div>
                    <div className="text-sm">• Fetch active stories from Redis</div>
                    <div className="text-sm">• Group by user (sequential viewing)</div>
                    <div className="text-sm">• Track views in real-time (Redis counter)</div>
                    <div className="text-sm">• Mark as seen for current user</div>
                  </div>
                  <div className="bg-yellow-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-yellow-300 mb-1">Expiration & Cleanup</div>
                    <div className="text-sm">• Redis TTL auto-expires after 24 hours</div>
                    <div className="text-sm">• Cron job deletes S3 files daily</div>
                    <div className="text-sm">• Batch deletion for efficiency</div>
                  </div>
                </div>
              </div>

              {/* User Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <span>👤</span>
                  User Service
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-blue-300 mb-1">User Management</div>
                    <div className="text-sm">• Profile data (name, bio, avatar)</div>
                    <div className="text-sm">• Authentication (phone/email + OTP)</div>
                    <div className="text-sm">• Session management (JWT tokens)</div>
                    <div className="text-sm">• Privacy settings (public/private account)</div>
                  </div>
                  <div className="bg-indigo-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-indigo-300 mb-1">Social Graph</div>
                    <div className="text-sm">• <strong>Follow/Unfollow:</strong> Update Neo4j graph</div>
                    <div className="text-sm">• <strong>Follower count:</strong> Cached in Redis</div>
                    <div className="text-sm">• <strong>Suggested users:</strong> Collaborative filtering</div>
                    <div className="text-sm">• <strong>Mutual follows:</strong> Graph traversal query</div>
                  </div>
                  <div className="bg-cyan-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-cyan-300 mb-1">User Discovery</div>
                    <div className="text-sm">• Search by username (Elasticsearch)</div>
                    <div className="text-sm">• Suggested users based on follows</div>
                    <div className="text-sm">• Popular accounts (trending)</div>
                  </div>
                </div>
              </div>

              {/* Search Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                  <span>🔍</span>
                  Search Service
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="bg-purple-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-purple-300 mb-1">Search Types</div>
                    <div className="text-sm">• <strong>Users:</strong> Search by username, full name</div>
                    <div className="text-sm">• <strong>Hashtags:</strong> Search posts by hashtag</div>
                    <div className="text-sm">• <strong>Locations:</strong> Search posts by location</div>
                    <div className="text-sm">• <strong>Explore:</strong> Discover new content</div>
                  </div>
                  <div className="bg-indigo-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-indigo-300 mb-1">Implementation</div>
                    <div className="text-sm">• <strong>Elasticsearch:</strong> Full-text search index</div>
                    <div className="text-sm">• <strong>Indexing:</strong> Async indexing via Kafka</div>
                    <div className="text-sm">• <strong>Auto-complete:</strong> Prefix matching (Trie)</div>
                    <div className="text-sm">• <strong>Ranking:</strong> Popularity + relevance score</div>
                  </div>
                  <div className="bg-pink-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-pink-300 mb-1">Explore Page</div>
                    <div className="text-sm">• Personalized recommendations</div>
                    <div className="text-sm">• ML model based on user interests</div>
                    <div className="text-sm">• Trending posts & hashtags</div>
                  </div>
                </div>
              </div>

              {/* Notification Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <span>🔔</span>
                  Notification Service
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="bg-cyan-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-cyan-300 mb-1">Notification Types</div>
                    <div className="text-sm">• Likes on your post</div>
                    <div className="text-sm">• Comments on your post</div>
                    <div className="text-sm">• New follower</div>
                    <div className="text-sm">• Mentions in posts/comments</div>
                    <div className="text-sm">• Story views</div>
                  </div>
                  <div className="bg-teal-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-teal-300 mb-1">Delivery Channels</div>
                    <div className="text-sm">• <strong>Push:</strong> FCM (Android), APNS (iOS)</div>
                    <div className="text-sm">• <strong>In-app:</strong> Real-time notification bell</div>
                    <div className="text-sm">• <strong>Email:</strong> Digest for inactive users</div>
                  </div>
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-blue-300 mb-1">Optimizations</div>
                    <div className="text-sm">• Batch notifications (group similar events)</div>
                    <div className="text-sm">• User preferences (notification settings)</div>
                    <div className="text-sm">• Rate limiting (max 10 push/day)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dataflow' && (
          <div className="space-y-8">
            {/* Photo Upload Flow */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">📤</span>
                Photo Upload & Processing Flow
              </h2>

              <div className="space-y-4">
                {[
                  { step: 1, title: 'User Selects Photo', desc: 'User selects photo from camera roll, applies filters/effects on client', color: 'blue' },
                  { step: 2, title: 'Client-side Compression', desc: 'Compress image to ~2MB max, generate thumbnail preview', color: 'green' },
                  { step: 3, title: 'Request Pre-signed URL', desc: 'API Gateway generates S3 pre-signed URL for direct upload', color: 'purple' },
                  { step: 4, title: 'Upload to S3', desc: 'Client uploads directly to S3 using pre-signed URL (bypasses backend)', color: 'orange' },
                  { step: 5, title: 'Create Post Metadata', desc: 'POST /posts → Store post record in Cassandra (post_id, user_id, s3_key, caption)', color: 'red' },
                  { step: 6, title: 'Publish Processing Event', desc: 'Publish event to Kafka topic "image_processing" with post_id and S3 key', color: 'pink' },
                  { step: 7, title: 'Async Image Processing', desc: 'Worker pool generates 4 thumbnails, converts to WebP, extracts EXIF', color: 'indigo' },
                  { step: 8, title: 'Fan-out to Followers', desc: 'Add post to followers\' feeds (Redis sorted sets), notify followers', color: 'cyan' }
                ].map(item => (
                  <div key={item.step} className={`bg-${item.color}-900/30 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                    <div className="flex items-start gap-4">
                      <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-${item.color}-300 mb-1`}>{item.title}</div>
                        <div className="text-gray-300 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feed Generation Flow */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-orange-400">📰</span>
                Feed Generation Flow
              </h2>

              <div className="space-y-4">
                {[
                  { step: 1, title: 'User Opens App', desc: 'User opens Instagram app, requests feed: GET /feed', color: 'blue' },
                  { step: 2, title: 'Check Feed Cache', desc: 'Query Redis: GET feed:{user_id} → Check if cached feed exists (5-min TTL)', color: 'cyan' },
                  { step: 3, title: 'Cache Hit → Return Feed', desc: 'If cache hit (~90%), return cached feed (<50ms latency)', color: 'green' },
                  { step: 4, title: 'Cache Miss → Fetch Graph', desc: 'Query Neo4j for user\'s following list (up to 1000 users)', color: 'purple' },
                  { step: 5, title: 'Fetch Posts', desc: 'For each followed user, fetch last 100 posts from Cassandra (parallel queries)', color: 'orange' },
                  { step: 6, title: 'Merge & Rank', desc: 'Merge all posts, apply ML ranking model (engagement, recency, affinity)', color: 'red' },
                  { step: 7, title: 'Hydrate Post Data', desc: 'Fetch user profiles, like counts, comment counts, image URLs from cache/DB', color: 'pink' },
                  { step: 8, title: 'Cache & Return', desc: 'Cache result in Redis (5-min TTL), return top 30 posts to client', color: 'indigo' }
                ].map(item => (
                  <div key={item.step} className={`bg-${item.color}-900/30 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                    <div className="flex items-start gap-4">
                      <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-${item.color}-300 mb-1`}>{item.title}</div>
                        <div className="text-gray-300 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Story Flow */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-pink-400">⏰</span>
                Story Upload & Viewing Flow
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-pink-300 text-lg mb-3">Story Upload</h3>
                  {[
                    { step: 1, title: 'Upload Story', desc: 'Upload image/video to S3', color: 'blue' },
                    { step: 2, title: 'Store in Redis', desc: 'Add to stories:{user_id} sorted set (score = timestamp)', color: 'green' },
                    { step: 3, title: 'Set TTL', desc: 'Set 24-hour expiration on Redis key', color: 'purple' },
                    { step: 4, title: 'Notify Followers', desc: 'Push notification to active followers', color: 'orange' }
                  ].map(item => (
                    <div key={item.step} className={`bg-${item.color}-900/30 p-4 rounded-lg border-l-4 border-${item.color}-500`}>
                      <div className="flex items-start gap-3">
                        <div className={`bg-${item.color}-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold flex-shrink-0 text-sm`}>
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-${item.color}-300 text-sm mb-1`}>{item.title}</div>
                          <div className="text-gray-300 text-xs">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-indigo-300 text-lg mb-3">Story Viewing</h3>
                  {[
                    { step: 1, title: 'Fetch Active Stories', desc: 'Query Redis for stories from followed users', color: 'blue' },
                    { step: 2, title: 'Group by User', desc: 'Group stories for sequential viewing', color: 'green' },
                    { step: 3, title: 'Track View', desc: 'Increment view count: INCR story_views:{story_id}', color: 'purple' },
                    { step: 4, title: 'Mark as Seen', desc: 'Add to seen:{user_id} set to hide ring', color: 'orange' }
                  ].map(item => (
                    <div key={item.step} className={`bg-${item.color}-900/30 p-4 rounded-lg border-l-4 border-${item.color}-500`}>
                      <div className="flex items-start gap-3">
                        <div className={`bg-${item.color}-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold flex-shrink-0 text-sm`}>
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-${item.color}-300 text-sm mb-1`}>{item.title}</div>
                          <div className="text-gray-300 text-xs">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
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
                <span className="text-purple-400">🗄️</span>
                Database Sharding Strategy
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-900/30 p-6 rounded-xl border-2 border-purple-700">
                  <h3 className="font-bold text-purple-300 mb-3">Post Data Sharding (Cassandra)</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• <strong>Shard key:</strong> user_id (all user's posts on same shard)</div>
                    <div>• <strong>Partition:</strong> 1000 shards via consistent hashing</div>
                    <div>• <strong>Replication:</strong> RF=3 (3 replicas per shard)</div>
                    <div>• <strong>Write path:</strong> Coordinator writes to 3 replicas</div>
                    <div>• <strong>Read path:</strong> Query any replica (quorum read)</div>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                  <h3 className="font-bold text-blue-300 mb-3">User Data Sharding (PostgreSQL)</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• <strong>Shard key:</strong> user_id</div>
                    <div>• <strong>Shards:</strong> 100 PostgreSQL instances</div>
                    <div>• <strong>Routing:</strong> user_id % 100 → shard number</div>
                    <div>• <strong>Replication:</strong> 1 primary + 2 replicas per shard</div>
                    <div>• <strong>Read scaling:</strong> Route reads to replicas</div>
                  </div>
                </div>

                <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                  <h3 className="font-bold text-green-300 mb-3">Graph Data (Neo4j)</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• <strong>Shard by user_id:</strong> User's graph on same node</div>
                    <div>• <strong>Hot users:</strong> Celebrities cached in Redis</div>
                    <div>• <strong>Follower list:</strong> Paginated queries (1000 at a time)</div>
                    <div>• <strong>Traversal:</strong> Limit depth to 2 hops</div>
                  </div>
                </div>

                <div className="bg-orange-900/30 p-6 rounded-xl border-2 border-orange-700">
                  <h3 className="font-bold text-orange-300 mb-3">Object Storage (S3)</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• <strong>Bucket structure:</strong> /images/{'{year}'}/{'{month}'}/{'{day}'}/{'{uuid}'}.webp</div>
                    <div>• <strong>Lifecycle:</strong> Move to Glacier after 1 year</div>
                    <div>• <strong>CDN:</strong> CloudFront for edge caching</div>
                    <div>• <strong>Replication:</strong> Cross-region for disaster recovery</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Caching Strategy */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">⚡</span>
                Multi-Layer Caching
              </h2>

              <div className="space-y-4">
                <div className="bg-cyan-900/30 p-6 rounded-xl border-l-4 border-cyan-500">
                  <div className="font-bold text-cyan-300 mb-3 text-lg">L1: CDN Cache (Edge)</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>• Cache images at edge locations (200+ globally)</div>
                    <div>• TTL: 7 days for images, 1 day for thumbnails</div>
                    <div>• Cache hit rate: &gt;95%</div>
                    <div>• Reduces origin load by 85%</div>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
                  <div className="font-bold text-blue-300 mb-3 text-lg">L2: Redis Cache (Application)</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>• Feed cache: 5-minute TTL</div>
                    <div>• User profiles: 15-minute TTL</div>
                    <div>• Like/comment counts: 1-minute TTL</div>
                    <div>• Stories: Real-time (no TTL, manual invalidation)</div>
                  </div>
                </div>

                <div className="bg-purple-900/30 p-6 rounded-xl border-l-4 border-purple-500">
                  <div className="font-bold text-purple-300 mb-3 text-lg">L3: In-Memory Cache (Service)</div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>• LRU cache in each service instance</div>
                    <div>• Cache hot data (celebrity profiles, trending posts)</div>
                    <div>• 10-second TTL to avoid stale data</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Load Balancing */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-orange-400">⚖️</span>
                Load Balancing & Auto-Scaling
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-900/30 p-6 rounded-xl border-2 border-orange-700">
                  <h3 className="font-bold text-orange-300 mb-3">Global LB</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div>• Route53 geo-routing</div>
                    <div>• Latency-based routing</div>
                    <div>• Health checks (30s interval)</div>
                    <div>• Automatic failover</div>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                  <h3 className="font-bold text-blue-300 mb-3">Regional LB</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div>• ALB with path routing</div>
                    <div>• Weighted round-robin</div>
                    <div>• Connection draining</div>
                    <div>• SSL termination</div>
                  </div>
                </div>

                <div className="bg-purple-900/30 p-6 rounded-xl border-2 border-purple-700">
                  <h3 className="font-bold text-purple-300 mb-3">Auto-Scaling</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div>• Trigger: CPU &gt; 70%</div>
                    <div>• Scale up: +25% instances</div>
                    <div>• Cooldown: 5 minutes</div>
                    <div>• Min: 100, Max: 10K</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Optimizations */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">🚀</span>
                Performance Optimizations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-900/30 p-6 rounded-xl">
                  <div className="font-bold text-green-300 mb-3 text-lg">Image Optimizations</div>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div>• <strong>WebP format:</strong> 30% smaller than JPEG</div>
                    <div>• <strong>Progressive loading:</strong> Blur-up technique</div>
                    <div>• <strong>Lazy loading:</strong> Load images as user scrolls</div>
                    <div>• <strong>Responsive images:</strong> Serve appropriate size for device</div>
                    <div>• <strong>Compression:</strong> Quality 85 (optimal quality/size)</div>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-6 rounded-xl">
                  <div className="font-bold text-blue-300 mb-3 text-lg">Feed Optimizations</div>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div>• <strong>Pre-fetching:</strong> Load next page while viewing current</div>
                    <div>• <strong>Pagination:</strong> Load 30 posts at a time</div>
                    <div>• <strong>Parallel queries:</strong> Fetch posts from multiple shards</div>
                    <div>• <strong>Denormalization:</strong> Store user data with posts</div>
                    <div>• <strong>Cache warming:</strong> Pre-generate feeds for active users</div>
                  </div>
                </div>

                <div className="bg-purple-900/30 p-6 rounded-xl">
                  <div className="font-bold text-purple-300 mb-3 text-lg">API Optimizations</div>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div>• <strong>GraphQL:</strong> Client requests exact data needed</div>
                    <div>• <strong>Batching:</strong> DataLoader for N+1 query prevention</div>
                    <div>• <strong>Compression:</strong> Gzip responses (70% reduction)</div>
                    <div>• <strong>HTTP/2:</strong> Multiplexing for parallel requests</div>
                  </div>
                </div>

                <div className="bg-orange-900/30 p-6 rounded-xl">
                  <div className="font-bold text-orange-300 mb-3 text-lg">Monitoring</div>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div>• <strong>Metrics:</strong> Prometheus + Grafana</div>
                    <div>• <strong>Logging:</strong> ELK stack</div>
                    <div>• <strong>Tracing:</strong> Jaeger for distributed tracing</div>
                    <div>• <strong>Alerts:</strong> PagerDuty for on-call</div>
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
                <span className="text-indigo-400">🛠️</span>
                Technology Stack
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-900/30 p-6 rounded-xl border-2 border-indigo-700">
                  <h3 className="font-bold text-indigo-300 mb-4">Backend Services</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-white">API: Python (Django) / Node.js</div>
                      <div className="text-gray-300">Fast development, rich ecosystem for image processing</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Message Queue: Kafka</div>
                      <div className="text-gray-300">High throughput for async image processing</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Image Processing: Python (Pillow/OpenCV)</div>
                      <div className="text-gray-300">Rich library support for image manipulation</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                  <h3 className="font-bold text-blue-300 mb-4">Data Storage</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-white">Posts: Cassandra</div>
                      <div className="text-gray-300">Write-optimized, horizontal scaling for posts</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Users: PostgreSQL</div>
                      <div className="text-gray-300">ACID compliance for user accounts</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Graph: Neo4j</div>
                      <div className="text-gray-300">Efficient follow relationship queries</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Images: S3 + CloudFront CDN</div>
                      <div className="text-gray-300">Scalable object storage with edge delivery</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Design Trade-offs */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-orange-400">⚖️</span>
                Key Design Trade-offs
              </h2>

              <div className="space-y-6">
                {/* Fan-out Strategy */}
                <div className="bg-orange-900/30 p-6 rounded-xl border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-orange-300 mb-4">1. Fan-out on Write vs Fan-out on Read</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-green-700">
                      <div className="font-bold text-green-400 mb-2">Fan-out on Write</div>
                      <div className="text-sm space-y-1 text-gray-300">
                        <div><strong>Pros:</strong></div>
                        <div>• Fast feed loading (&lt;50ms)</div>
                        <div>• Pre-computed feeds</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Slow post creation for celebrities</div>
                        <div>• Wasted work for inactive users</div>
                      </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-blue-700">
                      <div className="font-bold text-blue-400 mb-2">Fan-out on Read</div>
                      <div className="text-sm space-y-1 text-gray-300">
                        <div><strong>Pros:</strong></div>
                        <div>• Fast post creation</div>
                        <div>• Always fresh data</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Slow feed loading (&gt;500ms)</div>
                        <div>• High database load</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-4 rounded-lg border-2 border-purple-700">
                    <div className="font-bold text-purple-300 mb-2">🎯 Our Decision: Hybrid Approach</div>
                    <div className="text-sm text-gray-300">
                      Fan-out on write for regular users (&lt;1M followers). Fan-out on read for celebrities (&gt;1M followers). Mix celebrity posts during feed assembly. Balances fast feeds with efficient post creation.
                    </div>
                  </div>
                </div>

                {/* SQL vs NoSQL */}
                <div className="bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">2. SQL vs NoSQL for Post Storage</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-purple-700">
                      <div className="font-bold text-purple-400 mb-2">SQL (PostgreSQL)</div>
                      <div className="text-sm space-y-1 text-gray-300">
                        <div><strong>Pros:</strong></div>
                        <div>• ACID guarantees</div>
                        <div>• Complex queries (joins)</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Vertical scaling limits</div>
                        <div>• Sharding complexity</div>
                      </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-green-700">
                      <div className="font-bold text-green-400 mb-2">NoSQL (Cassandra)</div>
                      <div className="text-sm space-y-1 text-gray-300">
                        <div><strong>Pros:</strong></div>
                        <div>• Horizontal scaling</div>
                        <div>• Write-optimized (95M posts/day)</div>
                        <div><strong>Cons:</strong></div>
                        <div>• No joins</div>
                        <div>• Eventual consistency</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-900/30 p-4 rounded-lg border-2 border-cyan-700">
                    <div className="font-bold text-cyan-300 mb-2">🎯 Our Decision: Cassandra for Posts</div>
                    <div className="text-sm text-gray-300">
                      Posts are write-heavy (95M/day) with simple schema. No complex joins needed. Cassandra's horizontal scaling and write performance make it ideal. Use PostgreSQL for user accounts where ACID is critical.
                    </div>
                  </div>
                </div>

                {/* Image Storage */}
                <div className="bg-green-900/30 p-6 rounded-xl border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-300 mb-4">3. Database Blob Storage vs Object Storage (S3)</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-blue-700">
                      <div className="font-bold text-blue-400 mb-2">Database Blob Storage</div>
                      <div className="text-sm space-y-1 text-gray-300">
                        <div><strong>Pros:</strong></div>
                        <div>• Transactional consistency with metadata</div>
                        <div>• Single query for image + metadata</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Database bloat (347 PB over 5 years)</div>
                        <div>• Expensive storage</div>
                        <div>• Poor CDN integration</div>
                      </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-green-700">
                      <div className="font-bold text-green-400 mb-2">Object Storage (S3)</div>
                      <div className="text-sm space-y-1 text-gray-300">
                        <div><strong>Pros:</strong></div>
                        <div>• Unlimited scalability</div>
                        <div>• Cost-effective ($0.023/GB)</div>
                        <div>• CDN integration (CloudFront)</div>
                        <div>• Lifecycle policies (Glacier)</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Separate from database (two queries)</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-900/30 p-4 rounded-lg border-2 border-emerald-700">
                    <div className="font-bold text-emerald-300 mb-2">🎯 Our Decision: S3 + CDN</div>
                    <div className="text-sm text-gray-300">
                      Images are large (347 PB over 5 years) and accessed frequently. S3 offers unlimited scalability, low cost, and seamless CDN integration. Store metadata in database, images in S3. Use S3 pre-signed URLs for direct upload (bypass backend).
                    </div>
                  </div>
                </div>

                {/* Stories Storage */}
                <div className="bg-purple-900/30 p-6 rounded-xl border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-purple-300 mb-4">4. Stories: Database vs In-Memory (Redis)</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-blue-700">
                      <div className="font-bold text-blue-400 mb-2">Database Storage</div>
                      <div className="text-sm space-y-1 text-gray-300">
                        <div><strong>Pros:</strong></div>
                        <div>• Persistent and durable</div>
                        <div>• Can query historical stories</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Overhead for 24hr content</div>
                        <div>• Cleanup complexity</div>
                        <div>• Higher latency</div>
                      </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-pink-700">
                      <div className="font-bold text-pink-400 mb-2">Redis (In-Memory)</div>
                      <div className="text-sm space-y-1 text-gray-300">
                        <div><strong>Pros:</strong></div>
                        <div>• Ultra-fast access (&lt;5ms)</div>
                        <div>• Built-in TTL (auto-expire after 24hr)</div>
                        <div>• Simple cleanup</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Not durable (risk of data loss)</div>
                        <div>• Memory expensive for large scale</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-violet-900/30 p-4 rounded-lg border-2 border-violet-700">
                    <div className="font-bold text-violet-300 mb-2">🎯 Our Decision: Redis + S3 Hybrid</div>
                    <div className="text-sm text-gray-300">
                      Store story metadata in Redis (sorted sets with 24hr TTL). Store images/videos in S3. Redis provides fast access and automatic expiration. S3 provides durable storage. Background job deletes S3 files after 24 hours.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Considerations */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-pink-400">💡</span>
                Additional Considerations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-pink-900/30 p-6 rounded-xl">
                  <h3 className="font-bold text-pink-300 mb-3">Content Moderation</h3>
                  <div className="text-sm text-gray-300 space-y-2">
                    <div>• <strong>AI detection:</strong> NSFW content, violence, hate speech</div>
                    <div>• <strong>User reporting:</strong> Flag inappropriate content</div>
                    <div>• <strong>Human review:</strong> Moderators review flagged content</div>
                    <div>• <strong>Automated removal:</strong> Block uploads with high confidence</div>
                  </div>
                </div>

                <div className="bg-red-900/30 p-6 rounded-xl">
                  <h3 className="font-bold text-red-300 mb-3">Privacy & Security</h3>
                  <div className="text-sm text-gray-300 space-y-2">
                    <div>• <strong>Private accounts:</strong> Only followers see posts</div>
                    <div>• <strong>Block users:</strong> Prevent interaction</div>
                    <div>• <strong>GDPR compliance:</strong> Data export, deletion rights</div>
                    <div>• <strong>Encryption:</strong> TLS for data in transit, AES for at rest</div>
                  </div>
                </div>

                <div className="bg-yellow-900/30 p-6 rounded-xl">
                  <h3 className="font-bold text-yellow-300 mb-3">Disaster Recovery</h3>
                  <div className="text-sm text-gray-300 space-y-2">
                    <div>• <strong>Multi-region:</strong> Active-active in 3 regions</div>
                    <div>• <strong>Backups:</strong> Daily snapshots to S3 Glacier</div>
                    <div>• <strong>Failover:</strong> Automatic DNS failover (RTO &lt;5 min)</div>
                    <div>• <strong>Data loss:</strong> RPO &lt;1 min with async replication</div>
                  </div>
                </div>

                <div className="bg-indigo-900/30 p-6 rounded-xl">
                  <h3 className="font-bold text-indigo-300 mb-3">Cost Optimization</h3>
                  <div className="text-sm text-gray-300 space-y-2">
                    <div>• <strong>S3 Lifecycle:</strong> Move old images to Glacier (80% savings)</div>
                    <div>• <strong>CDN:</strong> Reduce origin bandwidth by 85%</div>
                    <div>• <strong>Image compression:</strong> WebP saves 30% storage</div>
                    <div>• <strong>Reserved capacity:</strong> 60% reserved, 40% spot/on-demand</div>
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

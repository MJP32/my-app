import React, { useState } from 'react';

export default function YouTube({ onBack }) {
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
              ▶️ YouTube System Design
            </h1>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold uppercase tracking-wide">
              Video Streaming
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-6 font-light">
            Scalable video streaming platform · 2 billion users · 500 hours uploaded/min · Global CDN delivery
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-100">Video Transcoding</span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">CDN Distribution</span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">Recommendation Engine</span>
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">Adaptive Streaming</span>
            <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100">Real-Time Analytics</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-0">
          {['overview', 'components', 'dataflow', 'scalability', 'tradeoffs'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-red-600 bg-red-50 border-b-2 border-red-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200 shadow-lg">
              <h2 className="text-2xl font-bold text-red-900 mb-4">System Overview</h2>
              <p className="text-red-800 leading-relaxed">
                Design a video streaming platform like YouTube that handles video upload, transcoding, storage,
                delivery via CDN, recommendations, search, comments, and analytics at massive scale. The system
                must support billions of users, millions of concurrent viewers, and petabytes of video content
                with low latency streaming worldwide.
              </p>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Functional & Non-Functional Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Functional Requirements */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 shadow-sm">
                  <h3 className="text-xl font-bold text-green-900 mb-4">✅ Functional Requirements</h3>
                  <ul className="space-y-2 text-green-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Upload videos (various formats, sizes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Stream videos with adaptive bitrate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Search videos by title, tags, description</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Video recommendations (personalized feed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Like, comment, subscribe, share</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>View count, analytics for creators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Live streaming support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Playlists, channels, subscriptions</span>
                    </li>
                  </ul>
                </div>

                {/* Non-Functional Requirements */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200 shadow-sm">
                  <h3 className="text-xl font-bold text-orange-900 mb-4">⚡ Non-Functional Requirements</h3>
                  <ul className="space-y-2 text-orange-800">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Availability:</strong> 99.99% uptime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Latency:</strong> Video start &lt; 2 seconds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Scale:</strong> 2B users, 1B hours watched/day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Upload:</strong> 500 hours of video/minute</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Storage:</strong> Petabytes of video data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Bandwidth:</strong> Global CDN distribution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Reliability:</strong> No video loss during upload</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* High-Level Architecture */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">High-Level Architecture</h2>
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
                <svg viewBox="0 0 1200 800" className="w-full h-auto">
                  <defs>
                    <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="uploadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="cdnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="storageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
                    </linearGradient>
                    <marker id="arrowYT" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#6b7280" />
                    </marker>
                  </defs>

                  {/* Title */}
                  <text x="600" y="30" fontSize="22" fontWeight="bold" fill="#1f2937" textAnchor="middle">
                    YouTube System Architecture
                  </text>

                  {/* Users */}
                  <g>
                    <rect x="50" y="80" width="140" height="80" fill="url(#userGrad)" stroke="#2563eb" strokeWidth="2" rx="8" />
                    <text x="120" y="110" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Content Creator</text>
                    <text x="120" y="130" fontSize="12" fill="white" textAnchor="middle">Upload Videos</text>
                    <text x="120" y="145" fontSize="11" fill="#dbeafe" textAnchor="middle">Web/Mobile</text>
                  </g>

                  <g>
                    <rect x="230" y="80" width="140" height="80" fill="url(#userGrad)" stroke="#2563eb" strokeWidth="2" rx="8" />
                    <text x="300" y="110" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Viewer</text>
                    <text x="300" y="130" fontSize="12" fill="white" textAnchor="middle">Watch Videos</text>
                    <text x="300" y="145" fontSize="11" fill="#dbeafe" textAnchor="middle">Streaming</text>
                  </g>

                  {/* API Gateway */}
                  <rect x="150" y="210" width="150" height="60" fill="url(#apiGrad)" stroke="#7c3aed" strokeWidth="2" rx="6" />
                  <text x="225" y="235" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">API Gateway</text>
                  <text x="225" y="253" fontSize="11" fill="#ede9fe" textAnchor="middle">Load Balancer</text>

                  {/* Upload Service */}
                  <g>
                    <rect x="50" y="320" width="160" height="100" fill="url(#uploadGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="130" y="345" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Upload Service</text>
                    <line x1="60" y1="355" x2="200" y2="355" stroke="white" strokeWidth="1" opacity="0.5" />
                    <text x="130" y="375" fontSize="11" fill="white" textAnchor="middle">• Chunked Upload</text>
                    <text x="130" y="392" fontSize="11" fill="white" textAnchor="middle">• Resume Support</text>
                    <text x="130" y="409" fontSize="11" fill="white" textAnchor="middle">• Metadata Extract</text>
                  </g>

                  {/* Transcoding Service */}
                  <g>
                    <rect x="240" y="320" width="160" height="100" fill="url(#uploadGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="320" y="345" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Transcoding</text>
                    <line x1="250" y1="355" x2="390" y2="355" stroke="white" strokeWidth="1" opacity="0.5" />
                    <text x="320" y="375" fontSize="11" fill="white" textAnchor="middle">• Multiple Resolutions</text>
                    <text x="320" y="392" fontSize="11" fill="white" textAnchor="middle">• H.264/VP9/AV1</text>
                    <text x="320" y="409" fontSize="11" fill="white" textAnchor="middle">• Thumbnail Gen</text>
                  </g>

                  {/* Streaming Service */}
                  <g>
                    <rect x="430" y="320" width="160" height="100" fill="url(#uploadGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="510" y="345" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Streaming Service</text>
                    <line x1="440" y1="355" x2="580" y2="355" stroke="white" strokeWidth="1" opacity="0.5" />
                    <text x="510" y="375" fontSize="11" fill="white" textAnchor="middle">• Adaptive Bitrate</text>
                    <text x="510" y="392" fontSize="11" fill="white" textAnchor="middle">• HLS/DASH</text>
                    <text x="510" y="409" fontSize="11" fill="white" textAnchor="middle">• Quality Selection</text>
                  </g>

                  {/* Recommendation Service */}
                  <g>
                    <rect x="620" y="320" width="160" height="100" fill="url(#uploadGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="700" y="345" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Recommendation</text>
                    <line x1="630" y1="355" x2="770" y2="355" stroke="white" strokeWidth="1" opacity="0.5" />
                    <text x="700" y="375" fontSize="11" fill="white" textAnchor="middle">• ML Model</text>
                    <text x="700" y="392" fontSize="11" fill="white" textAnchor="middle">• User Preferences</text>
                    <text x="700" y="409" fontSize="11" fill="white" textAnchor="middle">• Trending Videos</text>
                  </g>

                  {/* Search Service */}
                  <g>
                    <rect x="810" y="320" width="160" height="100" fill="url(#uploadGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="890" y="345" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Search Service</text>
                    <line x1="820" y1="355" x2="960" y2="355" stroke="white" strokeWidth="1" opacity="0.5" />
                    <text x="890" y="375" fontSize="11" fill="white" textAnchor="middle">• Elasticsearch</text>
                    <text x="890" y="392" fontSize="11" fill="white" textAnchor="middle">• Full-Text Search</text>
                    <text x="890" y="409" fontSize="11" fill="white" textAnchor="middle">• Auto-Complete</text>
                  </g>

                  {/* CDN */}
                  <rect x="1000" y="80" width="150" height="340" fill="url(#cdnGrad)" stroke="#dc2626" strokeWidth="2" rx="6" />
                  <text x="1075" y="110" fontSize="15" fontWeight="bold" fill="white" textAnchor="middle">CDN</text>
                  <text x="1075" y="130" fontSize="12" fill="white" textAnchor="middle">(Global)</text>
                  <line x1="1010" y1="140" x2="1140" y2="140" stroke="white" strokeWidth="1" />
                  <text x="1075" y="165" fontSize="11" fill="white" textAnchor="middle">Edge Locations:</text>
                  <text x="1075" y="185" fontSize="11" fill="#fecaca" textAnchor="middle">• North America</text>
                  <text x="1075" y="203" fontSize="11" fill="#fecaca" textAnchor="middle">• Europe</text>
                  <text x="1075" y="221" fontSize="11" fill="#fecaca" textAnchor="middle">• Asia Pacific</text>
                  <text x="1075" y="239" fontSize="11" fill="#fecaca" textAnchor="middle">• South America</text>
                  <text x="1075" y="257" fontSize="11" fill="#fecaca" textAnchor="middle">• Africa</text>
                  <line x1="1010" y1="270" x2="1140" y2="270" stroke="white" strokeWidth="1" />
                  <text x="1075" y="290" fontSize="11" fill="white" textAnchor="middle">Cache Hit Rate:</text>
                  <text x="1075" y="308" fontSize="13" fontWeight="bold" fill="#fef3c7" textAnchor="middle">~95%</text>
                  <text x="1075" y="335" fontSize="11" fill="white" textAnchor="middle">Bandwidth:</text>
                  <text x="1075" y="353" fontSize="13" fontWeight="bold" fill="#fef3c7" textAnchor="middle">100+ Tbps</text>
                  <text x="1075" y="380" fontSize="10" fill="#fecaca" textAnchor="middle">CloudFlare/Akamai</text>
                  <text x="1075" y="395" fontSize="10" fill="#fecaca" textAnchor="middle">AWS CloudFront</text>

                  {/* Storage Layer */}
                  <text x="400" y="490" fontSize="16" fontWeight="bold" fill="#1f2937" textAnchor="middle">Storage & Database Layer</text>

                  <g>
                    <rect x="50" y="510" width="180" height="80" fill="url(#storageGrad)" stroke="#d97706" strokeWidth="2" rx="6" />
                    <text x="140" y="535" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Object Storage</text>
                    <text x="140" y="555" fontSize="12" fill="white" textAnchor="middle">S3 / Google Cloud</text>
                    <text x="140" y="572" fontSize="11" fill="#fef3c7" textAnchor="middle">Videos (Raw/Encoded)</text>
                  </g>

                  <g>
                    <rect x="260" y="510" width="180" height="80" fill="url(#storageGrad)" stroke="#d97706" strokeWidth="2" rx="6" />
                    <text x="350" y="535" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Metadata DB</text>
                    <text x="350" y="555" fontSize="12" fill="white" textAnchor="middle">PostgreSQL/Cassandra</text>
                    <text x="350" y="572" fontSize="11" fill="#fef3c7" textAnchor="middle">Title, Tags, Views</text>
                  </g>

                  <g>
                    <rect x="470" y="510" width="180" height="80" fill="url(#storageGrad)" stroke="#d97706" strokeWidth="2" rx="6" />
                    <text x="560" y="535" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Redis Cache</text>
                    <text x="560" y="555" fontSize="12" fill="white" textAnchor="middle">In-Memory</text>
                    <text x="560" y="572" fontSize="11" fill="#fef3c7" textAnchor="middle">Hot Videos, Sessions</text>
                  </g>

                  <g>
                    <rect x="680" y="510" width="180" height="80" fill="url(#storageGrad)" stroke="#d97706" strokeWidth="2" rx="6" />
                    <text x="770" y="535" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Analytics DB</text>
                    <text x="770" y="555" fontSize="12" fill="white" textAnchor="middle">BigQuery/Hadoop</text>
                    <text x="770" y="572" fontSize="11" fill="#fef3c7" textAnchor="middle">Views, Engagement</text>
                  </g>

                  {/* Message Queue */}
                  <rect x="320" y="640" width="200" height="80" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="6" />
                  <text x="420" y="665" fontSize="14" fontWeight="bold" fill="#78350f" textAnchor="middle">Message Queue</text>
                  <text x="420" y="685" fontSize="12" fill="#78350f" textAnchor="middle">Kafka / RabbitMQ</text>
                  <text x="420" y="703" fontSize="11" fill="#78350f" textAnchor="middle">Events, Notifications</text>

                  {/* Arrows */}
                  <path d="M 120 160 L 200 210" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                  <path d="M 300 160 L 250 210" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />

                  <path d="M 180 270 L 130 320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                  <path d="M 225 270 L 320 320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                  <path d="M 270 270 L 510 320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />

                  <path d="M 590 370 L 1000 240" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" />

                  <path d="M 130 420 L 130 510" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                  <path d="M 320 420 L 350 510" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                  <path d="M 510 420 L 560 510" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />

                  <path d="M 320 590 L 380 640" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowYT)" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Components Deep Dive</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload Service */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 shadow-sm">
                <h3 className="text-xl font-bold text-green-900 mb-4">📤 Upload Service</h3>
                <ul className="space-y-3 text-green-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1 font-bold">•</span>
                    <span><strong>Chunked Upload:</strong> Split large files into 10MB chunks for reliability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1 font-bold">•</span>
                    <span><strong>Resume Support:</strong> Continue failed uploads from last chunk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1 font-bold">•</span>
                    <span><strong>Metadata Extraction:</strong> Duration, resolution, codec, bitrate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1 font-bold">•</span>
                    <span><strong>Virus Scan:</strong> Check for malware before processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1 font-bold">•</span>
                    <span><strong>Duplicate Detection:</strong> Hash-based deduplication</span>
                  </li>
                </ul>
              </div>

              {/* Transcoding Service */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 shadow-sm">
                <h3 className="text-xl font-bold text-blue-900 mb-4">🎬 Transcoding Service</h3>
                <ul className="space-y-3 text-blue-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 font-bold">•</span>
                    <span><strong>Multiple Resolutions:</strong> 144p, 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 font-bold">•</span>
                    <span><strong>Codecs:</strong> H.264 (compatibility), VP9/AV1 (efficiency)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 font-bold">•</span>
                    <span><strong>FFmpeg:</strong> Industry-standard transcoding tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 font-bold">•</span>
                    <span><strong>Thumbnail Generation:</strong> Extract keyframes at intervals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 font-bold">•</span>
                    <span><strong>Queue-Based:</strong> Kafka message queue for async processing</span>
                  </li>
                </ul>
              </div>

              {/* CDN */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200 shadow-sm">
                <h3 className="text-xl font-bold text-red-900 mb-4">🌐 CDN (Content Delivery Network)</h3>
                <ul className="space-y-3 text-red-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1 font-bold">•</span>
                    <span><strong>Edge Locations:</strong> 200+ PoPs worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1 font-bold">•</span>
                    <span><strong>Cache Strategy:</strong> Popular videos cached at edge, cold in origin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1 font-bold">•</span>
                    <span><strong>Geo-Routing:</strong> Route users to nearest edge server</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1 font-bold">•</span>
                    <span><strong>Bandwidth:</strong> 100+ Tbps global capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1 font-bold">•</span>
                    <span><strong>Origin Shield:</strong> Protect origin from cache misses</span>
                  </li>
                </ul>
              </div>

              {/* Adaptive Streaming */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200 shadow-sm">
                <h3 className="text-xl font-bold text-purple-900 mb-4">📊 Adaptive Bitrate Streaming</h3>
                <ul className="space-y-3 text-purple-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1 font-bold">•</span>
                    <span><strong>HLS (HTTP Live Streaming):</strong> Apple standard, .m3u8 playlist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1 font-bold">•</span>
                    <span><strong>DASH (MPEG-DASH):</strong> Open standard for streaming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1 font-bold">•</span>
                    <span><strong>Segment Size:</strong> 2-10 second video chunks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1 font-bold">•</span>
                    <span><strong>Quality Switch:</strong> Dynamic based on bandwidth/buffer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1 font-bold">•</span>
                    <span><strong>Buffer Management:</strong> Pre-load next segments to prevent stall</span>
                  </li>
                </ul>
              </div>

              {/* Recommendation Engine */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200 shadow-sm">
                <h3 className="text-xl font-bold text-orange-900 mb-4">🤖 Recommendation Engine</h3>
                <ul className="space-y-3 text-orange-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1 font-bold">•</span>
                    <span><strong>Collaborative Filtering:</strong> Users who watched X also watched Y</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1 font-bold">•</span>
                    <span><strong>Content-Based:</strong> Similar videos based on metadata/tags</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1 font-bold">•</span>
                    <span><strong>Deep Learning:</strong> Neural networks (TensorFlow) for predictions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1 font-bold">•</span>
                    <span><strong>Real-Time:</strong> Update recommendations as user watches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1 font-bold">•</span>
                    <span><strong>A/B Testing:</strong> Continuous model improvements</span>
                  </li>
                </ul>
              </div>

              {/* Search Service */}
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 border-2 border-cyan-200 shadow-sm">
                <h3 className="text-xl font-bold text-cyan-900 mb-4">🔍 Search Service</h3>
                <ul className="space-y-3 text-cyan-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1 font-bold">•</span>
                    <span><strong>Elasticsearch:</strong> Distributed full-text search engine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1 font-bold">•</span>
                    <span><strong>Indexing:</strong> Title, description, tags, captions, transcript</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1 font-bold">•</span>
                    <span><strong>Ranking:</strong> Relevance score + popularity + recency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1 font-bold">•</span>
                    <span><strong>Autocomplete:</strong> Prefix search with suggestions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1 font-bold">•</span>
                    <span><strong>Filters:</strong> Upload date, duration, quality, channel</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Data Flow Tab */}
        {activeTab === 'dataflow' && (
          <div className="space-y-8">
            {/* Upload Flow */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Flow: Video Upload & Processing</h2>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                    <div className="font-bold text-green-900 mb-2">1. User Uploads Video</div>
                    <div className="text-gray-700 ml-4">↓ Creator selects video file (MP4, AVI, MOV, etc.)</div>
                    <div className="text-green-700 ml-4 mt-1">↓ Client splits file into 10MB chunks</div>
                    <div className="text-green-700 ml-4">↓ POST /api/upload with chunk + metadata</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="font-bold text-blue-900 mb-2">2. Upload Service Receives</div>
                    <div className="text-gray-700 ml-4">↓ Store chunks in temporary storage</div>
                    <div className="text-blue-700 ml-4">↓ Track upload progress (resume support)</div>
                    <div className="text-blue-700 ml-4">↓ When all chunks received → reassemble file</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                    <div className="font-bold text-purple-900 mb-2">3. Store Original in S3</div>
                    <div className="text-gray-700 ml-4">↓ Upload raw video to S3 bucket (origin storage)</div>
                    <div className="text-purple-700 ml-4">↓ Path: s3://videos/raw/video_id_original.mp4</div>
                    <div className="text-purple-700 ml-4">↓ Extract metadata: duration, resolution, codec</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                    <div className="font-bold text-orange-900 mb-2">4. Publish to Message Queue</div>
                    <div className="text-gray-700 ml-4">↓ Kafka topic: video_uploaded</div>
                    <div className="text-orange-700 ml-4">↓ Message: {`{ video_id, user_id, s3_path, metadata }`}</div>
                    <div className="text-orange-700 ml-4">↓ Transcoding workers subscribe to this topic</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                    <div className="font-bold text-indigo-900 mb-2">5. Transcoding Workers Process</div>
                    <div className="text-gray-700 ml-4">↓ Pull video from S3</div>
                    <div className="text-indigo-700 ml-4">↓ FFmpeg transcode to 8 resolutions (144p → 2160p)</div>
                    <div className="text-indigo-700 ml-4">↓ Generate thumbnails (every 10 seconds)</div>
                    <div className="text-indigo-700 ml-4">↓ Create HLS/DASH manifests (.m3u8)</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-pink-500">
                    <div className="font-bold text-pink-900 mb-2">6. Store Encoded Videos</div>
                    <div className="text-gray-700 ml-4">↓ Upload all versions to S3</div>
                    <div className="text-pink-700 ml-4">↓ s3://videos/encoded/video_id_720p.mp4</div>
                    <div className="text-pink-700 ml-4">↓ s3://videos/encoded/video_id_1080p.mp4</div>
                    <div className="text-pink-700 ml-4">↓ Update metadata DB with all URLs</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <div className="font-bold text-red-900 mb-2">7. Distribute to CDN</div>
                    <div className="text-gray-700 ml-4">↓ Pre-warm CDN cache for popular videos</div>
                    <div className="text-red-700 ml-4">↓ Push to edge locations globally</div>
                    <div className="text-red-700 ml-4">↓ Video now available for streaming worldwide</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-teal-500">
                    <div className="font-bold text-teal-900 mb-2">8. Index for Search</div>
                    <div className="text-gray-700 ml-4">↓ Extract: title, description, tags, captions</div>
                    <div className="text-teal-700 ml-4">↓ Index in Elasticsearch</div>
                    <div className="text-teal-700 ml-4">↓ Video now searchable and discoverable</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white font-bold text-center mt-6">
                    Total Processing Time: 5-30 minutes (depends on video length and quality)
                  </div>
                </div>
              </div>
            </div>

            {/* Streaming Flow */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Flow: Video Streaming to Viewer</h2>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="font-bold text-blue-900 mb-2">1. User Clicks Video</div>
                    <div className="text-gray-700 ml-4">↓ GET /api/videos/video_id</div>
                    <div className="text-blue-700 ml-4">↓ Return: metadata, thumbnail, HLS manifest URL</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                    <div className="font-bold text-purple-900 mb-2">2. Video Player Initializes</div>
                    <div className="text-gray-700 ml-4">↓ Load HLS manifest (.m3u8)</div>
                    <div className="text-purple-700 ml-4">↓ Manifest contains all quality variants</div>
                    <div className="text-purple-700 ml-4">↓ Player detects bandwidth → selects initial quality</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <div className="font-bold text-red-900 mb-2">3. Request Video Segments</div>
                    <div className="text-gray-700 ml-4">↓ GET cdn.youtube.com/video_id/720p/segment_0.ts</div>
                    <div className="text-red-700 ml-4">↓ CDN checks cache → HIT (95% of time)</div>
                    <div className="text-red-700 ml-4">↓ If MISS → fetch from origin S3</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                    <div className="font-bold text-green-900 mb-2">4. Adaptive Streaming</div>
                    <div className="text-gray-700 ml-4">↓ Player monitors: bandwidth, buffer level</div>
                    <div className="text-green-700 ml-4">↓ If bandwidth drops → switch to 480p</div>
                    <div className="text-green-700 ml-4">↓ If bandwidth improves → switch to 1080p</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                    <div className="font-bold text-orange-900 mb-2">5. Track Analytics</div>
                    <div className="text-gray-700 ml-4">↓ Send events: play, pause, seek, quality_change</div>
                    <div className="text-orange-700 ml-4">↓ POST /api/analytics with: video_id, timestamp, event</div>
                    <div className="text-orange-700 ml-4">↓ Update view count, watch time in real-time</div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white font-bold text-center mt-6">
                    Initial Buffering: &lt; 2 seconds · Smooth playback with adaptive quality
                  </div>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Scalability & Performance Optimizations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200 shadow-sm">
                  <h3 className="text-lg font-bold text-red-900 mb-3">🌍 CDN Multi-Tier Cache</h3>
                  <ul className="space-y-2 text-red-800 text-sm">
                    <li>• Edge cache (closest to user) - 90% hit rate</li>
                    <li>• Regional cache (mid-tier) - 5% hit rate</li>
                    <li>• Origin (S3) - 5% miss rate</li>
                    <li>• Pre-warming for viral/trending videos</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">⚡ Parallel Transcoding</h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• Split video into segments (1-minute chunks)</li>
                    <li>• Transcode segments in parallel (100+ workers)</li>
                    <li>• GPU-accelerated encoding (NVIDIA, AWS EC2)</li>
                    <li>• 10x faster than sequential processing</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 shadow-sm">
                  <h3 className="text-lg font-bold text-green-900 mb-3">📦 Database Sharding</h3>
                  <ul className="space-y-2 text-green-800 text-sm">
                    <li>• Shard by video_id (consistent hashing)</li>
                    <li>• 100 shards for metadata DB</li>
                    <li>• Each shard: 1 primary + 2 replicas</li>
                    <li>• Read replicas for analytics queries</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200 shadow-sm">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">🔥 Hot/Cold Storage</h3>
                  <ul className="space-y-2 text-purple-800 text-sm">
                    <li>• Hot (new videos, &lt;30 days): SSD, CDN cache</li>
                    <li>• Warm (30-365 days): Standard storage</li>
                    <li>• Cold (1+ years): Glacier, on-demand retrieval</li>
                    <li>• 80% cost reduction for old content</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-900 mb-3">🤖 ML Model Serving</h3>
                  <ul className="space-y-2 text-orange-800 text-sm">
                    <li>• TensorFlow Serving for recommendations</li>
                    <li>• Model versioning and A/B testing</li>
                    <li>• GPU clusters for inference (batch processing)</li>
                    <li>• Cache predictions for popular users</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 border-2 border-cyan-200 shadow-sm">
                  <h3 className="text-lg font-bold text-cyan-900 mb-3">📊 Real-Time Analytics</h3>
                  <ul className="space-y-2 text-cyan-800 text-sm">
                    <li>• Apache Kafka for event streaming</li>
                    <li>• Apache Flink for stream processing</li>
                    <li>• Redis for real-time counters (views, likes)</li>
                    <li>• BigQuery for long-term analytics</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Capacity Estimation */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Back-of-the-Envelope Capacity Estimation</h2>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
                <div className="space-y-6 font-mono text-sm">
                  <div className="bg-white p-6 rounded-xl border-l-4 border-red-500">
                    <div className="font-bold text-red-900 mb-3 text-lg">Assumptions</div>
                    <div className="space-y-1 text-gray-700">
                      <div>• 2 billion users, 30% active daily = 600M DAU</div>
                      <div>• Average 5 videos watched per user per day</div>
                      <div>• Average video length: 10 minutes</div>
                      <div>• 500 hours of video uploaded per minute</div>
                      <div>• Upload:Watch ratio = 1:1000</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500">
                    <div className="font-bold text-blue-900 mb-3 text-lg">Daily Video Views</div>
                    <div className="space-y-1 text-gray-700">
                      <div>• 600M DAU × 5 videos = 3 billion videos/day</div>
                      <div>• 3B videos × 10 min = 30 billion minutes watched/day</div>
                      <div className="text-blue-700 font-bold">• ≈ 500 million hours watched per day</div>
                      <div>• Peak concurrent viewers: ~5 million</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border-l-4 border-green-500">
                    <div className="font-bold text-green-900 mb-3 text-lg">Storage Requirements</div>
                    <div className="space-y-1 text-gray-700">
                      <div>• Upload rate: 500 hours/min = 720,000 hours/day</div>
                      <div>• Average bitrate: 5 Mbps (1080p)</div>
                      <div>• Storage per hour: 5 Mbps × 3600s ÷ 8 = 2.25 GB/hour</div>
                      <div>• Daily upload: 720K × 2.25 GB = 1.62 PB/day (raw)</div>
                      <div>• With 8 resolutions: 1.62 PB × 8 = 12.96 PB/day (encoded)</div>
                      <div className="text-green-700 font-bold">• Total: ~13 PB per day</div>
                      <div className="text-green-700 font-bold">• Yearly: ~4.7 Exabytes (EB)</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500">
                    <div className="font-bold text-purple-900 mb-3 text-lg">Bandwidth Requirements</div>
                    <div className="space-y-1 text-gray-700">
                      <div>• Peak viewers: 5M concurrent</div>
                      <div>• Average bitrate: 3 Mbps (720p adaptive)</div>
                      <div className="text-purple-700 font-bold">• Peak bandwidth: 5M × 3 Mbps = 15 Tbps</div>
                      <div>• CDN capacity needed: 20-30 Tbps (with buffer)</div>
                      <div>• Upload bandwidth: 500 hrs/min × 5 Mbps = 150 Gbps</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border-l-4 border-orange-500">
                    <div className="font-bold text-orange-900 mb-3 text-lg">Transcoding Infrastructure</div>
                    <div className="space-y-1 text-gray-700">
                      <div>• Upload: 720,000 hours/day = 500 hours/minute</div>
                      <div>• Transcoding time: 1 hour video = 10 min (with parallelization)</div>
                      <div>• Workers needed: 500 hours × 10 min = 5,000 worker-minutes/min</div>
                      <div className="text-orange-700 font-bold">• ~5,000 transcoding workers (GPU instances)</div>
                      <div>• Using AWS c5.4xlarge: ~$0.68/hour × 5,000 = $3,400/hour</div>
                      <div className="text-orange-700 font-bold">• Daily cost: ~$82,000 (transcoding only)</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border-l-4 border-pink-500">
                    <div className="font-bold text-pink-900 mb-3 text-lg">Database Capacity</div>
                    <div className="space-y-1 text-gray-700">
                      <div>• Total videos: 800 million (accumulated over years)</div>
                      <div>• Metadata per video: 10 KB (title, desc, tags, stats)</div>
                      <div>• Total metadata: 800M × 10 KB = 8 TB</div>
                      <div>• With sharding (100 shards): 80 GB per shard</div>
                      <div>• User data: 2B users × 5 KB = 10 TB</div>
                      <div className="text-pink-700 font-bold">• Total DB: ~20 TB (highly manageable)</div>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology Stack</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  'FFmpeg (Transcoding)',
                  'HLS / MPEG-DASH',
                  'H.264 / VP9 / AV1',
                  'AWS S3 / Google Cloud Storage',
                  'CloudFront / Akamai CDN',
                  'PostgreSQL / Cassandra',
                  'Redis Cache',
                  'Elasticsearch',
                  'Apache Kafka',
                  'Apache Flink',
                  'TensorFlow / PyTorch',
                  'Kubernetes',
                  'Docker',
                  'NGINX',
                  'Node.js / Go',
                  'React / React Native',
                  'BigQuery / Hadoop',
                  'Grafana / Prometheus'
                ].map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Trade-offs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Trade-offs & Design Decisions</h2>
              <div className="space-y-6">
                {/* Push vs Pull CDN */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-300 shadow-lg">
                  <h3 className="text-xl font-bold text-red-900 mb-4">1. Push CDN vs Pull CDN</h3>
                  <div className="space-y-3 text-red-800">
                    <div><strong className="text-red-900">Push CDN:</strong> Origin pushes content to all edge servers proactively</div>
                    <div className="ml-4">• Pros: Faster first access, predictable bandwidth</div>
                    <div className="ml-4">• Cons: Wastes storage/bandwidth for unpopular videos</div>
                    <div><strong className="text-red-900">Pull CDN:</strong> Edge servers pull content on-demand (cache miss)</div>
                    <div className="ml-4">• Pros: Efficient storage, only cache popular content</div>
                    <div className="ml-4">• Cons: Slower first access (cache miss penalty)</div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500 mt-4">
                      <strong className="text-red-900">Decision:</strong> Hybrid approach - Push for trending/viral videos, Pull for long-tail content
                    </div>
                  </div>
                </div>

                {/* Storage Codec */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-300 shadow-lg">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">2. Video Codec Selection</h3>
                  <div className="space-y-3 text-blue-800">
                    <div><strong className="text-blue-900">H.264 (AVC):</strong> Most compatible, 95% device support</div>
                    <div className="ml-4">• Pros: Universal compatibility, hardware acceleration</div>
                    <div className="ml-4">• Cons: Larger file sizes, less efficient</div>
                    <div><strong className="text-blue-900">VP9:</strong> Google's codec, 30% better compression than H.264</div>
                    <div className="ml-4">• Pros: Better quality at same bitrate, royalty-free</div>
                    <div className="ml-4">• Cons: Slower encoding, less hardware support</div>
                    <div><strong className="text-blue-900">AV1:</strong> Next-gen codec, 50% better than H.264</div>
                    <div className="ml-4">• Pros: Best compression, royalty-free, future-proof</div>
                    <div className="ml-4">• Cons: Very slow encoding, limited device support (2024)</div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 mt-4">
                      <strong className="text-blue-900">Decision:</strong> Multi-codec strategy - H.264 (default), VP9 (Chrome), AV1 (gradual rollout)
                    </div>
                  </div>
                </div>

                {/* SQL vs NoSQL */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-300 shadow-lg">
                  <h3 className="text-xl font-bold text-green-900 mb-4">3. SQL vs NoSQL for Metadata</h3>
                  <div className="space-y-3 text-green-800">
                    <div><strong className="text-green-900">PostgreSQL (SQL):</strong> Relational database with ACID guarantees</div>
                    <div className="ml-4">• Pros: Strong consistency, complex queries, joins</div>
                    <div className="ml-4">• Cons: Harder to shard, vertical scaling limits</div>
                    <div><strong className="text-green-900">Cassandra (NoSQL):</strong> Distributed wide-column store</div>
                    <div className="ml-4">• Pros: Horizontal scaling, high write throughput, fault-tolerant</div>
                    <div className="ml-4">• Cons: Eventual consistency, limited query flexibility</div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 mt-4">
                      <strong className="text-green-900">Decision:</strong> PostgreSQL for user/channel data (ACID needed), Cassandra for video metadata (scale &gt; consistency)
                    </div>
                  </div>
                </div>

                {/* Synchronous vs Asynchronous */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-300 shadow-lg">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">4. Synchronous vs Asynchronous Processing</h3>
                  <div className="space-y-3 text-purple-800">
                    <div><strong className="text-purple-900">Synchronous:</strong> Upload service waits for transcoding to complete</div>
                    <div className="ml-4">• Pros: Immediate feedback to user</div>
                    <div className="ml-4">• Cons: Long upload times (30+ min), ties up resources</div>
                    <div><strong className="text-purple-900">Asynchronous:</strong> Upload completes, transcoding happens in background</div>
                    <div className="ml-4">• Pros: Fast upload response, better resource utilization</div>
                    <div className="ml-4">• Cons: Delayed availability (video not immediately watchable)</div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500 mt-4">
                      <strong className="text-purple-900">Decision:</strong> Asynchronous with notifications - Upload returns instantly, notify creator when processing complete
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

import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function Netflix({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🎬 Netflix System Design
            </h1>
            <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-lg text-xs font-bold uppercase tracking-wide">
              Streaming Platform
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Global streaming platform · 230M+ subscribers · 70+ countries · 1 billion hours watched/week · Adaptive bitrate streaming
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg text-sm font-medium border border-red-700">Video Encoding</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-400 rounded-lg text-sm font-medium border border-blue-700">CDN Architecture</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-400 rounded-lg text-sm font-medium border border-green-700">ML Recommendations</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-400 rounded-lg text-sm font-medium border border-purple-700">Microservices</span>
            <span className="px-4 py-2 bg-orange-900/30 text-orange-400 rounded-lg text-sm font-medium border border-orange-700">AWS Cloud</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'architecture', 'encoding', 'cdn', 'recommendations', 'scalability'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-red-400 bg-red-900/30 border-b-2 border-red-400 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'architecture' && 'Architecture'}
              {tab === 'encoding' && 'Video Encoding'}
              {tab === 'cdn' && 'CDN & Delivery'}
              {tab === 'recommendations' && 'Recommendations'}
              {tab === 'scalability' && 'Scalability'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Requirements */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border-2 border-red-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">System Requirements</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
                  <h3 className="text-lg font-bold text-red-700 mb-4">Functional Requirements</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Video Streaming:</strong> Play videos with adaptive bitrate</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Video Upload:</strong> Content providers upload videos</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Search & Browse:</strong> Find content by title, genre, actor</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Personalization:</strong> Recommend content based on history</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Profiles:</strong> Multiple user profiles per account</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Resume Playback:</strong> Continue watching across devices</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Offline Download:</strong> Download for offline viewing</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
                  <h3 className="text-lg font-bold text-red-700 mb-4">Non-Functional Requirements</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>High Availability:</strong> 99.99% uptime SLA</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Low Latency:</strong> Video start time &lt;2 seconds</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Scalability:</strong> Handle 230M+ concurrent users</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Quality:</strong> Support 4K, HDR, Dolby Atmos</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Global Reach:</strong> Serve 70+ countries</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Cost Efficient:</strong> Optimize CDN and storage costs</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Security:</strong> DRM protection and encryption</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Scale Estimates */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">📊 Scale Estimates</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="text-red-400 text-3xl font-bold">230M+</div>
                  <div className="text-gray-300 text-sm">Active Subscribers</div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-blue-400 text-3xl font-bold">1B hrs</div>
                  <div className="text-gray-300 text-sm">Watched per Week</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 text-3xl font-bold">15,000+</div>
                  <div className="text-gray-300 text-sm">Total Titles</div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Traffic & Storage Calculations</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-semibold">Daily Active Users (DAU):</span>
                    <span className="text-blue-400 font-mono">~100M users</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-semibold">Avg Watch Time per User:</span>
                    <span className="text-blue-400 font-mono">2 hours/day</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-semibold">Peak Concurrent Streams:</span>
                    <span className="text-blue-400 font-mono">~20M streams</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-semibold">Avg Video Bitrate (1080p):</span>
                    <span className="text-blue-400 font-mono">5 Mbps</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-semibold">Peak Bandwidth Required:</span>
                    <span className="text-green-400 font-mono font-bold">100 Tbps</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-semibold">Storage per Movie (all formats):</span>
                    <span className="text-blue-400 font-mono">~100 GB</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">Total Storage Needed:</span>
                    <span className="text-yellow-400 font-mono font-bold">~1.5 PB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-4">🎯 Core Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎬</span>
                    <div>
                      <div className="font-semibold text-gray-900">Adaptive Bitrate Streaming</div>
                      <div className="text-sm text-gray-600">Auto-adjust quality based on bandwidth</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <div className="font-semibold text-gray-900">ML-Powered Recommendations</div>
                      <div className="text-sm text-gray-600">Personalized content suggestions</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <div className="font-semibold text-gray-900">Global CDN Network</div>
                      <div className="text-sm text-gray-600">Low-latency delivery worldwide</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <div className="font-semibold text-gray-900">Cross-Platform Sync</div>
                      <div className="text-sm text-gray-600">Continue watching on any device</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4">⚡ Performance Metrics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <div className="font-semibold text-gray-900">Video Start Time</div>
                      <div className="text-sm text-gray-600">&lt;2 seconds on average</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <div className="font-semibold text-gray-900">Buffering Rate</div>
                      <div className="text-sm text-gray-600">&lt;1% of total play time</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <div className="font-semibold text-gray-900">Availability SLA</div>
                      <div className="text-sm text-gray-600">99.99% uptime guaranteed</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <div className="font-semibold text-gray-900">Content Protection</div>
                      <div className="text-sm text-gray-600">DRM + AES-256 encryption</div>
                    </div>
                  </li>
                </ul>
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
                      <div className="text-sm text-blue-100">Web • iOS • Android • Smart TV • Gaming Consoles • Set-Top Boxes</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                  <div className="text-4xl text-gray-500">↓</div>
                </div>

                {/* CDN Layer */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold mb-2">☁️ AWS CloudFront (CDN)</div>
                      <div className="text-sm text-purple-100">Global edge locations • 200+ POPs • Low-latency delivery</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down - Split */}
                <div className="flex justify-center gap-32">
                  <div className="text-4xl text-gray-500">↓</div>
                  <div className="text-4xl text-gray-500">↓</div>
                </div>

                {/* API Gateway & Open Connect */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3">🌐 API Gateway</div>
                      <ul className="space-y-2 text-sm text-green-50">
                        <li>• Authentication (OAuth 2.0)</li>
                        <li>• Rate Limiting</li>
                        <li>• Request Routing</li>
                        <li>• Load Balancing</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 shadow-xl border-2 border-red-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3">🎬 Open Connect CDN</div>
                      <ul className="space-y-2 text-sm text-red-50">
                        <li>• Video Streaming</li>
                        <li>• ISP Appliances</li>
                        <li>• 95% of Traffic</li>
                        <li>• 17,000+ Servers</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                  <div className="text-4xl text-gray-500">↓</div>
                </div>

                {/* Microservices Layer */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400">
                  <div className="text-white">
                    <div className="text-2xl font-bold mb-4 text-center">⚙️ Microservices Architecture (Spring Boot)</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">User Service</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Auth Service</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Subscription</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Payment</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Profile</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Search</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Catalog</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Recommendations</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Playback</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Analytics</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Admin Portal</div>
                      <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur">Content Ingestion</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                  <div className="text-4xl text-gray-500">↓</div>
                </div>

                {/* Data Layer */}
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 shadow-xl border-2 border-indigo-400">
                  <div className="text-white">
                    <div className="text-2xl font-bold mb-4 text-center">💾 Data Layer</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
                        <div className="font-bold mb-1">Cassandra</div>
                        <div className="text-xs text-indigo-100">Video Metadata</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
                        <div className="font-bold mb-1">MySQL/Aurora</div>
                        <div className="text-xs text-indigo-100">User & Billing</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
                        <div className="font-bold mb-1">ElasticSearch</div>
                        <div className="text-xs text-indigo-100">Search Index</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
                        <div className="font-bold mb-1">Redis Cache</div>
                        <div className="text-xs text-indigo-100">Session & Cache</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Processing Pipeline */}
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 shadow-xl border-2 border-pink-400 mt-8">
                  <div className="text-white">
                    <div className="text-2xl font-bold mb-4 text-center">🎥 Video Processing Pipeline</div>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <div className="bg-white/20 rounded-lg px-6 py-3 backdrop-blur font-semibold">S3 Storage</div>
                      <div className="text-2xl">→</div>
                      <div className="bg-white/20 rounded-lg px-6 py-3 backdrop-blur font-semibold">Encoding</div>
                      <div className="text-2xl">→</div>
                      <div className="bg-white/20 rounded-lg px-6 py-3 backdrop-blur font-semibold">Quality Control</div>
                      <div className="text-2xl">→</div>
                      <div className="bg-white/20 rounded-lg px-6 py-3 backdrop-blur font-semibold">CDN Upload</div>
                    </div>
                    <div className="text-center text-sm text-pink-100 mt-3">Multiple bitrates, formats, and resolutions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-red-200 shadow-lg">
                <h3 className="text-xl font-bold text-red-700 mb-4">🎯 Client Layer</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Web App:</strong> React/Next.js with server-side rendering
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Mobile:</strong> Native iOS (Swift) and Android (Kotlin)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Smart TV:</strong> Custom apps for Samsung, LG, Fire TV
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Video Player:</strong> Custom player with ABR support
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
                <h3 className="text-xl font-bold text-blue-700 mb-4">🌐 API Gateway</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Zuul Gateway:</strong> Netflix's own API gateway
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Authentication:</strong> OAuth 2.0 + JWT tokens
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Rate Limiting:</strong> Per-user and per-IP limits
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Load Balancing:</strong> Ribbon for client-side LB
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-lg">
                <h3 className="text-xl font-bold text-green-700 mb-4">⚙️ Microservices</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>User Service:</strong> User profiles, preferences, history
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Catalog Service:</strong> Video metadata, categories, tags
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Playback Service:</strong> Video URLs, DRM, analytics
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Recommendation:</strong> ML-based content suggestions
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-lg">
                <h3 className="text-xl font-bold text-purple-700 mb-4">💾 Data Storage</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Cassandra:</strong> Video metadata, viewing history
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>MySQL/Aurora:</strong> User accounts, subscriptions
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>S3:</strong> Video files, thumbnails, subtitles
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Redis:</strong> Session cache, API response cache
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Netflix Tech Stack */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Netflix Technology Stack</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <h4 className="font-bold text-orange-700 mb-2">Backend</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Spring Boot (Java)</li>
                    <li>• Node.js (for BFF)</li>
                    <li>• Zuul (API Gateway)</li>
                    <li>• Eureka (Service Discovery)</li>
                    <li>• Hystrix (Circuit Breaker)</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <h4 className="font-bold text-orange-700 mb-2">Databases</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Cassandra (NoSQL)</li>
                    <li>• MySQL/Aurora (SQL)</li>
                    <li>• Redis (Caching)</li>
                    <li>• ElasticSearch (Search)</li>
                    <li>• S3 (Object Storage)</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <h4 className="font-bold text-orange-700 mb-2">Infrastructure</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• AWS Cloud (EC2, Lambda)</li>
                    <li>• CloudFront (CDN)</li>
                    <li>• Open Connect (CDN)</li>
                    <li>• Docker + Kubernetes</li>
                    <li>• Kafka (Event Streaming)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'encoding' && (
          <div className="space-y-8">
            {/* Video Encoding Pipeline */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 border-2 border-purple-500">
              <h2 className="text-3xl font-bold text-white mb-6">🎬 Video Encoding Pipeline</h2>

              {/* Modern Visual Pipeline */}
              <div className="space-y-6">
                {/* Step 1: Content Upload */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">📤 Content Upload (Studio Partners)</div>
                    <div className="text-sm text-blue-100">High-quality master file (e.g., 4K ProRes)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-purple-400">↓</div>
                </div>

                {/* Step 2: S3 Storage */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">💾 S3 Storage (Master Copy)</div>
                    <div className="text-sm text-green-100">Triggers encoding workflow</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-purple-400">↓</div>
                </div>

                {/* Step 3: Encoding Pipeline */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-4 text-center">⚙️ Encoding Pipeline (AWS Batch/EC2)</div>
                    <div className="bg-white/20 rounded-lg p-4 backdrop-blur mb-4">
                      <div className="font-semibold mb-3 text-center">Parallel Encoding Jobs (1000+ concurrent instances)</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="bg-white/20 rounded p-2">→ 4K (15 Mbps, 25 Mbps)</div>
                        <div className="bg-white/20 rounded p-2">→ 1080p (5, 8, 10 Mbps)</div>
                        <div className="bg-white/20 rounded p-2">→ 720p (2, 3, 5 Mbps)</div>
                        <div className="bg-white/20 rounded p-2">→ 480p (1, 1.5 Mbps)</div>
                        <div className="bg-white/20 rounded p-2 md:col-span-2 text-center">→ 360p (500, 800 Kbps)</div>
                      </div>
                    </div>
                    <div className="text-sm text-center text-orange-100">Codecs: H.264, H.265 (HEVC), VP9, AV1</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-purple-400">↓</div>
                </div>

                {/* Step 4: Additional Processing */}
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 shadow-xl border-2 border-pink-400">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-3">🎨 Additional Processing</div>
                    <ul className="space-y-2 text-sm text-pink-50">
                      <li>• Generate thumbnails (multiple per video)</li>
                      <li>• Extract/encode subtitles (50+ languages)</li>
                      <li>• Create preview clips (auto-play previews)</li>
                      <li>• Apply DRM encryption (Widevine, FairPlay)</li>
                      <li>• Generate audio tracks (multiple languages, 5.1, Atmos)</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-purple-400">↓</div>
                </div>

                {/* Step 5: Quality Control */}
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-xl border-2 border-yellow-400">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-3">✅ Quality Control (QC)</div>
                    <ul className="space-y-2 text-sm text-yellow-50">
                      <li>• Automated checks (resolution, bitrate, sync)</li>
                      <li>• Visual quality analysis (VMAF score)</li>
                      <li>• Audio quality checks</li>
                      <li>• Playback testing</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-purple-400">↓</div>
                </div>

                {/* Step 6: CDN Upload */}
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 shadow-xl border-2 border-cyan-400">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-3">🌐 Upload to CDN (S3 + CloudFront + Open Connect)</div>
                    <ul className="space-y-2 text-sm text-cyan-50">
                      <li>• Distribute to 200+ edge locations globally</li>
                      <li>• Pre-populate ISP caches for popular content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Encoding Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-lg">
                <h3 className="text-xl font-bold text-purple-700 mb-4">📊 Encoding Profiles</h3>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="font-bold text-purple-900 mb-2">4K Ultra HD (2160p)</div>
                    <div className="text-sm text-gray-700">
                      • Resolution: 3840×2160<br/>
                      • Bitrate: 15-25 Mbps<br/>
                      • Codec: H.265 (HEVC), VP9<br/>
                      • HDR10, Dolby Vision support
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="font-bold text-purple-900 mb-2">Full HD (1080p)</div>
                    <div className="text-sm text-gray-700">
                      • Resolution: 1920×1080<br/>
                      • Bitrate: 5-10 Mbps<br/>
                      • Codec: H.264, H.265<br/>
                      • Most popular format
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="font-bold text-purple-900 mb-2">HD (720p) & SD</div>
                    <div className="text-sm text-gray-700">
                      • 720p: 2-5 Mbps<br/>
                      • 480p: 1-1.5 Mbps<br/>
                      • 360p: 500-800 Kbps<br/>
                      • For slower connections
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
                <h3 className="text-xl font-bold text-blue-700 mb-4">⚙️ Encoding Optimizations</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">✓</span>
                    <div>
                      <strong>Per-Title Encoding:</strong> Custom bitrate ladder per video based on complexity
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">✓</span>
                    <div>
                      <strong>Per-Shot Encoding:</strong> Optimize each scene individually for quality
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">✓</span>
                    <div>
                      <strong>Dynamic Optimizer:</strong> ML model predicts optimal encoding settings
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">✓</span>
                    <div>
                      <strong>Parallel Processing:</strong> 1000+ EC2 instances encoding simultaneously
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">✓</span>
                    <div>
                      <strong>Cost Optimization:</strong> Spot instances save 70% on encoding costs
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">✓</span>
                    <div>
                      <strong>Quality Metrics:</strong> VMAF score ensures perceptual quality
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Encoding Stats */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Encoding Performance</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">~12 hours</div>
                  <div className="text-sm text-gray-600">Average encoding time for 2-hour movie (all formats)</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">~120 files</div>
                  <div className="text-sm text-gray-600">Generated per video (formats + subtitles + thumbnails)</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">70% savings</div>
                  <div className="text-sm text-gray-600">Cost reduction using spot instances and optimizations</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cdn' && (
          <div className="space-y-8">
            {/* CDN Architecture */}
            <div className="bg-gradient-to-br from-cyan-900 to-blue-900 rounded-2xl p-8 border-2 border-cyan-500">
              <h2 className="text-3xl font-bold text-white mb-6">🌐 Content Delivery Network (CDN)</h2>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">Open Connect CDN Architecture</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Netflix built its own CDN called <strong className="text-cyan-400">Open Connect</strong> to deliver 95% of traffic.
                  It consists of servers placed directly inside ISP datacenters worldwide.
                </p>

                {/* Modern Visual CDN Flow */}
                <div className="space-y-6">
                  {/* User Request */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400">
                    <div className="text-white text-center">
                      <div className="text-xl font-bold mb-2">👤 User Request</div>
                      <div className="text-sm text-blue-100">Video playback request</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="text-4xl text-cyan-400">↓</div>
                  </div>

                  {/* Open Connect Decision Engine */}
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3 text-center">🧠 Content Routing Decision</div>
                      <ul className="space-y-2 text-sm text-purple-50">
                        <li>• Determine user's ISP and location</li>
                        <li>• Check nearest Open Connect Appliance (OCA)</li>
                        <li>• Verify content availability in cache</li>
                        <li>• Select optimal server based on:</li>
                        <ul className="ml-6 space-y-1 mt-2">
                          <li>- Network latency</li>
                          <li>- Server load</li>
                          <li>- Content popularity</li>
                        </ul>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="text-4xl text-cyan-400">↓</div>
                  </div>

                  {/* ISP-Level OCA */}
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-4 text-center">🏢 ISP-Level Open Connect Appliances</div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white/20 rounded-lg p-4 backdrop-blur text-center">
                          <div className="font-bold mb-2">AT&T ISP</div>
                          <div className="text-sm">OCA Rack</div>
                          <div className="text-xs text-green-100 mt-1">200TB+</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4 backdrop-blur text-center">
                          <div className="font-bold mb-2">Comcast ISP</div>
                          <div className="text-sm">OCA Rack</div>
                          <div className="text-xs text-green-100 mt-1">200TB+</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4 backdrop-blur text-center">
                          <div className="font-bold mb-2">Verizon ISP</div>
                          <div className="text-sm">OCA Rack</div>
                          <div className="text-xs text-green-100 mt-1">200TB+</div>
                        </div>
                      </div>

                      <div className="bg-green-900/50 rounded-lg p-4 text-sm text-center space-y-1">
                        <div>✓ 95% of traffic served from ISP caches</div>
                        <div>✓ Zero peering costs for ISPs</div>
                        <div>✓ Lowest latency for users</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-4">
                    <div className="text-xl text-cyan-400">(Cache Miss - 5% traffic)</div>
                    <div className="text-4xl text-cyan-400">↓</div>
                  </div>

                  {/* AWS CloudFront Backup */}
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3 text-center">☁️ AWS CloudFront (Backup CDN)</div>
                      <ul className="space-y-2 text-sm text-orange-50">
                        <li>• Edge locations in 200+ cities</li>
                        <li>• Handles traffic spikes and new content</li>
                        <li>• Fallback when OCA unavailable</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="text-4xl text-cyan-400">↓</div>
                  </div>

                  {/* Origin Servers */}
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 shadow-xl border-2 border-red-400">
                    <div className="text-white">
                      <div className="text-xl font-bold mb-3 text-center">💾 Origin Servers (S3)</div>
                      <ul className="space-y-2 text-sm text-red-50">
                        <li>• Master storage of all encoded videos</li>
                        <li>• Rarely accessed directly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* CDN Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-cyan-200 shadow-lg">
                <h3 className="text-xl font-bold text-cyan-700 mb-4">🎯 Open Connect Benefits</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>ISP Partnership:</strong> Free OCA appliances for ISPs (200TB+ storage)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Zero Peering Costs:</strong> ISPs save bandwidth costs
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Low Latency:</strong> Content served from within ISP network
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Intelligent Caching:</strong> Pre-populate popular content at night
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Global Reach:</strong> 17,000+ servers in 1,000+ locations
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
                <h3 className="text-xl font-bold text-blue-700 mb-4">⚡ Adaptive Bitrate Streaming</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Dynamic Quality:</strong> Auto-adjust based on bandwidth
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Segment Switching:</strong> Change quality every 2-10 seconds
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Buffer Management:</strong> Maintain 10-30 sec buffer
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Network Monitoring:</strong> Continuous bandwidth testing
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Prefetching:</strong> Download next segments in advance
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CDN Performance */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 CDN Performance Metrics</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600">Traffic served by Open Connect</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">&lt;2 sec</div>
                  <div className="text-sm text-gray-600">Average video start time</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">99.99%</div>
                  <div className="text-sm text-gray-600">CDN availability</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">100 Tbps</div>
                  <div className="text-sm text-gray-600">Peak bandwidth capacity</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-8">
            {/* Recommendation System */}
            <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 border-2 border-purple-500">
              <h2 className="text-3xl font-bold text-white mb-6">🤖 ML-Powered Recommendation System</h2>

              <p className="text-gray-300 text-lg mb-6">
                Netflix's recommendation system generates <strong className="text-purple-400">80% of watched content</strong> and
                saves <strong className="text-green-400">$1B annually</strong> by reducing churn.
              </p>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/30">
                <pre className="text-sm text-gray-300 overflow-x-auto font-mono leading-relaxed">
{`┌─────────────────────────────────────────────────────────────────────┐
│                     User Interaction Data                           │
│  • Watch history (title, duration, completion %)                   │
│  • Ratings (thumbs up/down)                                        │
│  • Search queries                                                  │
│  • Browsing patterns (hover time, clicks)                          │
│  • Device type, time of day, day of week                           │
│  • Skip/rewind behavior                                            │
└────────────────────────┬────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  Feature Engineering Pipeline                       │
│  • User features: demographics, viewing habits, preferences        │
│  • Content features: genre, actors, director, year, popularity     │
│  • Context features: time, device, location                        │
│  • Interaction features: watch time, completion rate               │
└────────────────────────┬────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    ML Models (Ensemble)                             │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Collaborative Filtering (Matrix Factorization)              │  │
│  │  • User-item interaction matrix                              │  │
│  │  • SVD, ALS algorithms                                       │  │
│  │  • "Users like you also watched..."                          │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Content-Based Filtering                                     │  │
│  │  • Title metadata, genre, cast, tags                         │  │
│  │  • TF-IDF, Word2Vec embeddings                               │  │
│  │  • "More like this title..."                                 │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Deep Learning Models (Neural Networks)                      │  │
│  │  • Multi-layer perceptrons                                   │  │
│  │  • Ranking models (LambdaMART, XGBoost)                      │  │
│  │  • Sequence models (RNN, LSTM) for session-based            │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Contextual Bandits                                          │  │
│  │  • Real-time A/B testing                                     │  │
│  │  • Explore vs Exploit tradeoff                               │  │
│  │  • Personalized ranking                                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   Ranking & Personalization                         │
│  • Generate top-N recommendations per user                         │
│  • Re-rank based on context (time, device)                         │
│  • Diversity optimization (avoid echo chamber)                     │
│  • Freshness boost for new content                                 │
└────────────────────────┬────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  Personalized Homepage Rows                         │
│  • "Top Picks for [User]"                                          │
│  • "Because you watched [Title]"                                   │
│  • "Trending Now"                                                  │
│  • "New Releases"                                                  │
│  • Genre-specific rows                                             │
└─────────────────────────────────────────────────────────────────────┘`}
                </pre>
              </div>
            </div>

            {/* Recommendation Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-lg">
                <h3 className="text-xl font-bold text-purple-700 mb-4">🎯 Key ML Techniques</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Collaborative Filtering:</strong> User similarity and item similarity
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Matrix Factorization:</strong> SVD, ALS for implicit feedback
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Deep Learning:</strong> Neural networks for complex patterns
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Ensemble Methods:</strong> Combine multiple models for accuracy
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Contextual Bandits:</strong> Online learning and exploration
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-pink-200 shadow-lg">
                <h3 className="text-xl font-bold text-pink-700 mb-4">🎨 Personalization Features</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Custom Thumbnails:</strong> A/B test images per user
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Dynamic Rows:</strong> Personalized homepage layout
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Title Ranking:</strong> Reorder based on preferences
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Search Results:</strong> Personalized search ranking
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Email Campaigns:</strong> Personalized recommendations
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Recommendation Stats */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Recommendation Impact</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">80%</div>
                  <div className="text-sm text-gray-600">Content watched from recommendations</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">$1B</div>
                  <div className="text-sm text-gray-600">Annual savings from reduced churn</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">1000s</div>
                  <div className="text-sm text-gray-600">A/B tests run annually</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">&lt;100ms</div>
                  <div className="text-sm text-gray-600">Recommendation latency</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scalability' && (
          <div className="space-y-8">
            {/* Scalability Strategies */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 border-2 border-blue-500">
              <h2 className="text-3xl font-bold text-white mb-6">📈 Scalability & High Availability</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">🚀 Horizontal Scaling</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>Microservices:</strong> 700+ independent services
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>Auto-Scaling:</strong> Add/remove EC2 instances dynamically
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>Load Balancing:</strong> Ribbon (client-side) + ELB (server-side)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>Stateless Services:</strong> Easy to scale horizontally
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-300 mb-4">💾 Database Scaling</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>Cassandra:</strong> Distributed NoSQL, linear scalability
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>Replication:</strong> Multi-region replication for DR
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>Caching:</strong> Redis + EVCache for hot data
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold mt-1">✓</span>
                      <div>
                        <strong>Partitioning:</strong> Shard by userId for even distribution
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Resilience Patterns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-red-200 shadow-lg">
                <h3 className="text-xl font-bold text-red-700 mb-4">🛡️ Resilience Patterns</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Hystrix Circuit Breaker:</strong> Prevent cascade failures
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Bulkheads:</strong> Isolate thread pools per service
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Fallbacks:</strong> Graceful degradation with default responses
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Timeouts:</strong> Fail fast with configurable timeouts
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Retries:</strong> Exponential backoff for transient failures
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-lg">
                <h3 className="text-xl font-bold text-purple-700 mb-4">🔍 Observability</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Distributed Tracing:</strong> Track requests across services
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Metrics:</strong> Atlas for real-time metrics (1M+ metrics)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Logging:</strong> Centralized logging with ELK stack
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Alerting:</strong> Automated alerts for SLA violations
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">▸</span>
                    <div>
                      <strong>Chaos Engineering:</strong> Chaos Monkey for resilience testing
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Performance Optimizations */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Performance Optimizations</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-700 mb-3">Caching Strategy</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>Client-side:</strong> Browser cache for static assets</li>
                    <li>• <strong>CDN cache:</strong> Video segments at edge</li>
                    <li>• <strong>Application cache:</strong> Redis/EVCache for API responses</li>
                    <li>• <strong>Database cache:</strong> Query result caching</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-700 mb-3">Network Optimization</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>HTTP/2:</strong> Multiplexing, header compression</li>
                    <li>• <strong>Connection Pooling:</strong> Reuse TCP connections</li>
                    <li>• <strong>Compression:</strong> Gzip/Brotli for text content</li>
                    <li>• <strong>Prefetching:</strong> Download likely next segments</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-700 mb-3">Code Optimization</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>Async Processing:</strong> Non-blocking I/O</li>
                    <li>• <strong>Lazy Loading:</strong> Load content on demand</li>
                    <li>• <strong>Code Splitting:</strong> Bundle optimization</li>
                    <li>• <strong>Image Optimization:</strong> WebP, lazy load</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* System Metrics */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">📊 System Performance Metrics</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-blue-400 text-3xl font-bold">99.99%</div>
                  <div className="text-gray-300 text-sm">Availability SLA</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 text-3xl font-bold">&lt;2s</div>
                  <div className="text-gray-300 text-sm">Video Start Time</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="text-purple-400 text-3xl font-bold">&lt;100ms</div>
                  <div className="text-gray-300 text-sm">API Response Time</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="text-yellow-400 text-3xl font-bold">20M+</div>
                  <div className="text-gray-300 text-sm">Concurrent Streams</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

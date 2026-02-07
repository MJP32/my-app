import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function CDN({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-teal-700 hover:border-teal-600 text-teal-300 hover:text-teal-200 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🌐 Content Delivery Network
            </h1>
            <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-teal-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Deliver content faster to users worldwide using geographically distributed edge servers
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-teal-900/30 text-teal-300 rounded-lg text-sm font-medium border border-teal-700">Edge Locations</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">Caching</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Low Latency</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">Global Distribution</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'how-it-works', 'strategies', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-teal-400 bg-teal-900/30 border-b-2 border-teal-400 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'how-it-works' && 'How It Works'}
              {tab === 'strategies' && 'Optimization Strategies'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-teal-700">
              <h2 className="text-3xl font-bold text-white mb-6">What is a CDN?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                A Content Delivery Network (CDN) is a geographically distributed network of servers that work together to
                deliver content to users quickly and reliably. CDNs cache content at edge locations closer to end users,
                reducing latency and improving load times.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Instead of every user downloading files from your origin server (which might be far away), they get content
                from the nearest edge server. This dramatically improves performance, especially for global audiences.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Benefits of Using a CDN</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">⚡ Faster Load Times</h3>
                  <p className="text-gray-300">Serve content from geographically closer servers, reducing latency and improving page load speed</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">📉 Reduced Bandwidth Costs</h3>
                  <p className="text-gray-300">Offload traffic from origin server to CDN edge servers, reducing bandwidth usage</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🌍 Global Reach</h3>
                  <p className="text-gray-300">Serve users worldwide with consistent performance regardless of location</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🛡️ DDoS Protection</h3>
                  <p className="text-gray-300">Distributed architecture absorbs and mitigates DDoS attacks, protecting origin servers</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">📈 Improved Availability</h3>
                  <p className="text-gray-300">Multiple edge servers provide redundancy. If one fails, others handle traffic</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🔒 Enhanced Security</h3>
                  <p className="text-gray-300">SSL/TLS termination, bot detection, and web application firewall capabilities</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Types of Content Served by CDN</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">📄 Static Content</h3>
                  <p className="text-gray-300 text-sm">Images, CSS, JavaScript, fonts - content that doesn't change often</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">🎥 Video Streaming</h3>
                  <p className="text-gray-300 text-sm">On-demand and live video with adaptive bitrate streaming</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">📱 Mobile Applications</h3>
                  <p className="text-gray-300 text-sm">App assets, updates, and API responses</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">🔄 Dynamic Content</h3>
                  <p className="text-gray-300 text-sm">API responses, personalized content with edge computing</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">CDN Request Flow</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-4">Step-by-Step Process:</h3>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">1.</span>
                    <span>User requests content (e.g., visits website, loads image)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">2.</span>
                    <span>DNS routes request to nearest CDN edge server based on user location</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">3.</span>
                    <span>Edge server checks if content is cached locally</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">4.</span>
                    <span><strong>Cache Hit:</strong> Edge server returns cached content immediately (fast!)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">5.</span>
                    <span><strong>Cache Miss:</strong> Edge server fetches from origin server</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">6.</span>
                    <span>Edge server caches content and returns to user</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">7.</span>
                    <span>Subsequent requests from that region get cached content (no origin hit)</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Edge Locations & Points of Presence (PoPs)</h2>
              <p className="text-gray-300 text-lg mb-6">
                CDN providers operate hundreds of edge locations worldwide, strategically placed to minimize distance to users.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Cloudflare</h3>
                  <p className="text-gray-300 text-sm">275+ cities worldwide</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">AWS CloudFront</h3>
                  <p className="text-gray-300 text-sm">400+ edge locations</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Akamai</h3>
                  <p className="text-gray-300 text-sm">4,000+ PoPs globally</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Cache Behavior</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">Cache-Control Headers</h3>
                  <div className="bg-green-900/30 p-4 rounded-lg font-mono text-sm text-gray-300 space-y-1">
                    <div>Cache-Control: public, max-age=31536000</div>
                    <div>Cache-Control: private, no-cache</div>
                    <div>Cache-Control: no-store</div>
                  </div>
                  <p className="text-sm text-gray-400 mt-3">Origin server tells CDN how long to cache content</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">ETag & Conditional Requests</h3>
                  <p className="text-gray-300 mb-2">
                    CDN validates cached content freshness using ETags. If content unchanged, origin returns 304 Not Modified.
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">Cache Invalidation</h3>
                  <p className="text-gray-300">
                    Manually purge cached content when updated. Methods: purge by URL, purge by tag, purge all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Cache Key Optimization</h2>
              <p className="text-gray-300 text-lg mb-4">
                Define what makes a cached object unique to maximize cache hit ratio.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Default Cache Key</h3>
                  <code className="text-sm bg-orange-900/30 px-2 py-1 rounded text-orange-300">protocol + domain + path + query string</code>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Ignore Query Strings</h3>
                  <p className="text-gray-300 text-sm">Cache same content for /image.jpg?v=1 and /image.jpg?v=2</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Include Headers</h3>
                  <p className="text-gray-300 text-sm">Cache based on Accept-Language, User-Agent for personalized content</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Edge Computing</h2>
              <p className="text-gray-300 text-lg mb-4">
                Run code at edge locations to process requests closer to users.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">Use Cases:</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• A/B testing at edge</li>
                    <li>• Request/response modification</li>
                    <li>• Authentication/authorization</li>
                    <li>• URL rewriting and redirects</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">Examples:</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Cloudflare Workers</li>
                    <li>• AWS Lambda@Edge</li>
                    <li>• Fastly Compute@Edge</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Image Optimization</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Automatic Format Conversion</h3>
                  <p className="text-gray-300 text-sm">Serve WebP to Chrome, JPEG to Safari automatically</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Responsive Images</h3>
                  <p className="text-gray-300 text-sm">Resize images on-the-fly based on device size</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Lazy Loading & Compression</h3>
                  <p className="text-gray-300 text-sm">Optimize quality and compress to reduce file size</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Best Practices</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">1. Use Long Cache TTLs for Static Assets</h3>
                  <p className="text-gray-300 text-sm">Cache images, CSS, JS for 1 year. Use versioned filenames (bundle.v123.js)</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">2. Enable Compression</h3>
                  <p className="text-gray-300 text-sm">Gzip or Brotli compression for text-based files (HTML, CSS, JS)</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">3. Monitor Cache Hit Ratio</h3>
                  <p className="text-gray-300 text-sm">Aim for 85%+ cache hit ratio. Low ratio means poor cache configuration</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">4. Use HTTP/2 or HTTP/3</h3>
                  <p className="text-gray-300 text-sm">Multiplexing, header compression, and better performance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Popular CDN Providers</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Cloudflare</h3>
                  <p className="text-gray-300 mb-2">Global CDN with free tier, DDoS protection, and edge computing</p>
                  <span className="text-sm text-gray-400">Best for: General purpose, security-focused</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">AWS CloudFront</h3>
                  <p className="text-gray-300 mb-2">Integrated with AWS services, Lambda@Edge for serverless compute</p>
                  <span className="text-sm text-gray-400">Best for: AWS ecosystem, enterprise applications</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Akamai</h3>
                  <p className="text-gray-300 mb-2">Largest CDN network, enterprise-grade performance and reliability</p>
                  <span className="text-sm text-gray-400">Best for: Large enterprises, streaming media</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Fastly</h3>
                  <p className="text-gray-300 mb-2">Real-time purging, VCL customization, instant cache updates</p>
                  <span className="text-sm text-gray-400">Best for: Dynamic content, real-time applications</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Impact</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🎬 Netflix</h3>
                  <p className="text-gray-300">Uses custom CDN (Open Connect) to cache video content at ISP locations worldwide</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🛒 E-Commerce Sites</h3>
                  <p className="text-gray-300">100ms faster load time can increase conversion by 1%. CDN critical for global retailers.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">📰 News Websites</h3>
                  <p className="text-gray-300">Handle traffic spikes during breaking news by serving from edge cache</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🎮 Gaming Downloads</h3>
                  <p className="text-gray-300">Distribute multi-GB game files efficiently without overwhelming origin servers</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

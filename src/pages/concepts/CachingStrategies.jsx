import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function CachingStrategies({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-green-700 hover:border-green-600 text-green-300 hover:text-green-200 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              💾 Caching Strategies
            </h1>
            <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-green-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Improve application performance by storing frequently accessed data in fast-access storage
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Cache-Aside</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">Write-Through</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">Write-Back</span>
            <span className="px-4 py-2 bg-orange-900/30 text-orange-300 rounded-lg text-sm font-medium border border-orange-700">LRU/LFU</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'patterns', 'eviction', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-green-400 bg-green-900/30 border-b-2 border-green-400 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'patterns' && 'Cache Patterns'}
              {tab === 'eviction' && 'Eviction Policies'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">What is Caching?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Caching is a technique to store copies of frequently accessed data in a fast-access storage layer (cache)
                to reduce latency and load on slower backend systems like databases or external APIs.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                A cache acts as a temporary storage that sits between your application and the data source,
                dramatically improving response times for repeated requests.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Benefits of Caching</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">⚡ Reduced Latency</h3>
                  <p className="text-gray-300">Serve data from memory (microseconds) instead of disk/network (milliseconds)</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">📉 Lower Database Load</h3>
                  <p className="text-gray-300">Reduce expensive database queries by serving frequently accessed data from cache</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">💰 Cost Savings</h3>
                  <p className="text-gray-300">Reduce API calls to paid services and lower infrastructure costs</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">📈 Scalability</h3>
                  <p className="text-gray-300">Handle more requests with the same backend resources</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Cache Hierarchy</h2>
              <div className="space-y-3">
                <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-4 text-white">
                  <div className="font-bold text-lg mb-1">L1: Browser Cache</div>
                  <div className="text-sm text-gray-300">Store static assets locally (images, CSS, JS)</div>
                </div>
                <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-4 text-white">
                  <div className="font-bold text-lg mb-1">L2: CDN Cache</div>
                  <div className="text-sm text-gray-300">Distributed edge servers cache content globally</div>
                </div>
                <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg p-4 text-white">
                  <div className="font-bold text-lg mb-1">L3: Application Cache (Redis, Memcached)</div>
                  <div className="text-sm text-gray-300">In-memory data store for application data</div>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/40 rounded-lg p-4 text-white">
                  <div className="font-bold text-lg mb-1">L4: Database Query Cache</div>
                  <div className="text-sm text-gray-300">Database caches query results internally</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">🔄 Cache-Aside (Lazy Loading)</h2>
              <p className="text-gray-300 text-lg mb-4">Application checks cache first, loads from DB if miss, then stores in cache.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700 mb-4">
                <h3 className="font-bold text-green-400 mb-3">Flow:</h3>
                <ol className="space-y-2 text-gray-300">
                  <li>1. Application requests data from cache</li>
                  <li>2. If cache hit → return cached data</li>
                  <li>3. If cache miss → query database</li>
                  <li>4. Store result in cache for future requests</li>
                  <li>5. Return data to application</li>
                </ol>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h4 className="font-bold text-green-400 mb-2">✅ Pros:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Cache only what's needed</li>
                    <li>• Cache failures don't break system</li>
                    <li>• Most common pattern</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h4 className="font-bold text-red-400 mb-2">❌ Cons:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Cache misses cause latency</li>
                    <li>• Stale data possible</li>
                    <li>• Extra code complexity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">📝 Write-Through</h2>
              <p className="text-gray-300 text-lg mb-4">Write to cache and database simultaneously. Cache is always in sync.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-3">Flow:</h3>
                <ol className="space-y-2 text-gray-300">
                  <li>1. Application writes data</li>
                  <li>2. Update cache first</li>
                  <li>3. Synchronously write to database</li>
                  <li>4. Confirm write to application</li>
                </ol>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-blue-400 mb-2">✅ Pros:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Cache always consistent</li>
                    <li>• No stale data</li>
                    <li>• Reads always fast</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-red-400 mb-2">❌ Cons:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Higher write latency</li>
                    <li>• May cache rarely-read data</li>
                    <li>• Two write operations required</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">💨 Write-Back (Write-Behind)</h2>
              <p className="text-gray-300 text-lg mb-4">Write to cache immediately, asynchronously write to database later.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700 mb-4">
                <h3 className="font-bold text-purple-400 mb-3">Flow:</h3>
                <ol className="space-y-2 text-gray-300">
                  <li>1. Application writes data to cache</li>
                  <li>2. Immediately confirm to application (fast!)</li>
                  <li>3. Background job writes to database later</li>
                  <li>4. Can batch multiple writes for efficiency</li>
                </ol>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h4 className="font-bold text-purple-400 mb-2">✅ Pros:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Very fast writes</li>
                    <li>• Can batch database writes</li>
                    <li>• Better write performance</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h4 className="font-bold text-red-400 mb-2">❌ Cons:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Data loss risk if cache fails</li>
                    <li>• Complex implementation</li>
                    <li>• Eventual consistency</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">🔄 Refresh-Ahead</h2>
              <p className="text-gray-300 text-lg mb-4">Automatically refresh cached data before it expires based on access patterns.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-orange-700 mb-4">
                <h3 className="font-bold text-orange-400 mb-3">How it works:</h3>
                <p className="text-gray-300 mb-2">Monitor cache access patterns and preemptively refresh popular items before expiration</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h4 className="font-bold text-orange-400 mb-2">✅ Pros:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Reduced latency for popular items</li>
                    <li>• Proactive cache warming</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h4 className="font-bold text-red-400 mb-2">❌ Cons:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Accuracy depends on predictions</li>
                    <li>• May waste resources on unused data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eviction' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">🗑️ LRU (Least Recently Used)</h2>
              <p className="text-gray-300 text-lg mb-4">Evicts the least recently accessed items first.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                <h3 className="font-bold text-blue-400 mb-3">Implementation:</h3>
                <p className="text-gray-300 mb-4">Doubly linked list + HashMap for O(1) access and eviction</p>
                <h3 className="font-bold text-blue-400 mb-3">Best for:</h3>
                <p className="text-gray-300 mb-2">Workloads where recently accessed items are likely to be accessed again</p>
                <h3 className="font-bold text-blue-400 mb-3">Example:</h3>
                <p className="text-gray-300">Cache: [A, B, C, D]. Access E → Evict A (oldest). Cache: [B, C, D, E]</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">📊 LFU (Least Frequently Used)</h2>
              <p className="text-gray-300 text-lg mb-4">Evicts items with the lowest access frequency.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                <h3 className="font-bold text-green-400 mb-3">Implementation:</h3>
                <p className="text-gray-300 mb-4">Track access count for each item, evict lowest count</p>
                <h3 className="font-bold text-green-400 mb-3">Best for:</h3>
                <p className="text-gray-300 mb-2">Workloads with clear hot/cold data patterns</p>
                <h3 className="font-bold text-green-400 mb-3">Challenge:</h3>
                <p className="text-gray-300">Old popular items may stay forever even if no longer accessed</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">⏰ TTL (Time to Live)</h2>
              <p className="text-gray-300 text-lg mb-4">Items expire after a fixed time period.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                <h3 className="font-bold text-purple-400 mb-3">How it works:</h3>
                <p className="text-gray-300 mb-4">Set expiration timestamp when caching. Remove when TTL expires.</p>
                <h3 className="font-bold text-purple-400 mb-3">Best for:</h3>
                <p className="text-gray-300 mb-2">Data that becomes stale over time (news, pricing, weather)</p>
                <h3 className="font-bold text-purple-400 mb-3">Example:</h3>
                <p className="text-gray-300">Cache product prices with 5-minute TTL to balance freshness and performance</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">🎲 Random Replacement</h2>
              <p className="text-gray-300 text-lg mb-4">Randomly select an item to evict.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                <h3 className="font-bold text-orange-400 mb-3">Advantages:</h3>
                <p className="text-gray-300 mb-4">Simple to implement, no metadata needed</p>
                <h3 className="font-bold text-orange-400 mb-3">Disadvantages:</h3>
                <p className="text-gray-300">May evict frequently accessed items, unpredictable performance</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Popular Caching Technologies</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Redis</h3>
                  <p className="text-gray-300 mb-2">In-memory data store supporting strings, hashes, lists, sets, sorted sets, and more</p>
                  <span className="text-sm text-gray-400">Persistence, pub/sub, transactions, Lua scripting</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Memcached</h3>
                  <p className="text-gray-300 mb-2">Simple, high-performance distributed memory caching system</p>
                  <span className="text-sm text-gray-400">Key-value store, LRU eviction, multi-threaded</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">CDN (CloudFront, Cloudflare)</h3>
                  <p className="text-gray-300 mb-2">Distributed network of edge servers caching static content</p>
                  <span className="text-sm text-gray-400">Global distribution, DDoS protection</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Application-Level Cache</h3>
                  <p className="text-gray-300 mb-2">In-process caching using language-specific libraries</p>
                  <span className="text-sm text-gray-400">Caffeine (Java), Guava Cache, node-cache (Node.js)</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Use Cases</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🛒 E-Commerce Product Catalog</h3>
                  <p className="text-gray-300">Cache product details, inventory, and pricing with short TTL to balance freshness and performance</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">👤 User Session Data</h3>
                  <p className="text-gray-300">Store session tokens, user preferences, and auth state in Redis for fast access across requests</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">📊 Analytics Dashboard</h3>
                  <p className="text-gray-300">Cache aggregated metrics and expensive query results with periodic refresh</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🔍 Search Results</h3>
                  <p className="text-gray-300">Cache popular search queries to reduce load on search engines and improve response times</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

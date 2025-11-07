import React, { useState } from 'react';

export default function DatabaseSharding({ onBack }) {
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
              🗄️ Database Sharding
            </h1>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold uppercase tracking-wide">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-6 font-light">
            Horizontally partition data across multiple databases to achieve massive scale and performance
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">Horizontal Partitioning</span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">Shard Key</span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">Range-Based</span>
            <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100">Hash-Based</span>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-0">
          {['overview', 'strategies', 'challenges', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-purple-600 bg-purple-50 border-b-2 border-purple-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'strategies' && 'Sharding Strategies'}
              {tab === 'challenges' && 'Challenges'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Database Sharding?</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Database sharding is a horizontal partitioning technique where data is split across multiple database instances (shards).
                Each shard contains a subset of the total data and operates independently, allowing the system to scale beyond the limits of a single database.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Unlike vertical partitioning (splitting by columns), sharding splits data by rows, distributing complete records across multiple databases.
                Each shard has the same schema but different data.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits of Sharding</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">📈 Horizontal Scalability</h3>
                  <p className="text-gray-700">Add more shards to handle increased data volume and traffic, scaling beyond single-server limits</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">⚡ Improved Performance</h3>
                  <p className="text-gray-700">Smaller datasets per shard mean faster queries, reduced index size, and better cache utilization</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">🌍 Geographic Distribution</h3>
                  <p className="text-gray-700">Place shards closer to users in different regions to reduce latency</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">🔒 Fault Isolation</h3>
                  <p className="text-gray-700">Failure of one shard doesn't affect others, limiting blast radius of outages</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sharding vs Partitioning</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-xl font-bold text-green-700 mb-4">Horizontal Partitioning (Sharding)</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Splits data by rows across multiple servers</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Each shard has same schema, different data</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Scales to multiple physical machines</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Example: Users 1-1000 on Shard A, 1001-2000 on Shard B</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-xl font-bold text-green-700 mb-4">Vertical Partitioning</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Splits data by columns into separate tables</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Different schemas per partition</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Can be on same or different servers</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Example: User profile table separate from user preferences table</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🔢 Range-Based Sharding</h2>
              <p className="text-gray-700 text-lg mb-4">Partition data based on ranges of the shard key value.</p>
              <div className="bg-white p-6 rounded-xl border border-blue-100 mb-4">
                <h3 className="font-bold text-blue-700 mb-3">How it works:</h3>
                <p className="text-gray-700 mb-4">Define ranges for shard key (e.g., User IDs 1-1000 → Shard 1, 1001-2000 → Shard 2)</p>
                <h3 className="font-bold text-blue-700 mb-3">Example:</h3>
                <div className="bg-blue-50 p-4 rounded-lg text-gray-700 mb-4">
                  Shard 1: User IDs 1-10,000<br/>
                  Shard 2: User IDs 10,001-20,000<br/>
                  Shard 3: User IDs 20,001-30,000
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-700 mb-2">✅ Pros:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Simple to implement and understand</li>
                    <li>• Range queries are efficient</li>
                    <li>• Easy to add new shards</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-red-700 mb-2">❌ Cons:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Can lead to unbalanced shards (hot spots)</li>
                    <li>• New users may overload recent shards</li>
                    <li>• Requires monitoring for rebalancing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">#️⃣ Hash-Based Sharding</h2>
              <p className="text-gray-700 text-lg mb-4">Apply a hash function to the shard key to determine the shard.</p>
              <div className="bg-white p-6 rounded-xl border border-green-100 mb-4">
                <h3 className="font-bold text-green-700 mb-3">How it works:</h3>
                <p className="text-gray-700 mb-4">hash(shard_key) % number_of_shards = target_shard</p>
                <h3 className="font-bold text-green-700 mb-3">Example:</h3>
                <div className="bg-green-50 p-4 rounded-lg text-gray-700 mb-4">
                  hash(user_id) % 4 = shard_number<br/>
                  User ID 12345 → hash = 8 → 8 % 4 = 0 → Shard 0<br/>
                  User ID 67890 → hash = 13 → 13 % 4 = 1 → Shard 1
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-700 mb-2">✅ Pros:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Even distribution of data</li>
                    <li>• Eliminates hot spots</li>
                    <li>• Predictable shard selection</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h4 className="font-bold text-red-700 mb-2">❌ Cons:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Range queries require scanning all shards</li>
                    <li>• Adding shards requires rehashing all data</li>
                    <li>• Consider consistent hashing to mitigate</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📂 Directory-Based Sharding</h2>
              <p className="text-gray-700 text-lg mb-4">Maintain a lookup table that maps entities to shards.</p>
              <div className="bg-white p-6 rounded-xl border border-purple-100 mb-4">
                <h3 className="font-bold text-purple-700 mb-3">How it works:</h3>
                <p className="text-gray-700 mb-4">A central directory service stores the mapping of each key to its shard</p>
                <h3 className="font-bold text-purple-700 mb-3">Example:</h3>
                <div className="bg-purple-50 p-4 rounded-lg text-gray-700 mb-4">
                  Directory Table:<br/>
                  user_123 → Shard_A<br/>
                  user_456 → Shard_B<br/>
                  user_789 → Shard_A
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-purple-100">
                  <h4 className="font-bold text-purple-700 mb-2">✅ Pros:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Most flexible approach</li>
                    <li>• Easy to migrate data between shards</li>
                    <li>• Custom shard assignment logic</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-purple-100">
                  <h4 className="font-bold text-red-700 mb-2">❌ Cons:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Directory service is single point of failure</li>
                    <li>• Extra lookup adds latency</li>
                    <li>• Directory can become bottleneck</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🌍 Geographic Sharding</h2>
              <p className="text-gray-700 text-lg mb-4">Partition data based on geographic location of users or data.</p>
              <div className="bg-white p-6 rounded-xl border border-orange-100 mb-4">
                <h3 className="font-bold text-orange-700 mb-3">How it works:</h3>
                <p className="text-gray-700 mb-4">Route users to database shards in their geographic region</p>
                <h3 className="font-bold text-orange-700 mb-3">Example:</h3>
                <div className="bg-orange-50 p-4 rounded-lg text-gray-700">
                  US users → US East Shard<br/>
                  EU users → EU West Shard<br/>
                  Asia users → Asia Pacific Shard
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-orange-100">
                <h4 className="font-bold text-orange-700 mb-2">Best for:</h4>
                <p className="text-gray-700">Applications with strong geographic access patterns and data residency requirements</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border-2 border-red-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Challenges</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-700 text-lg mb-3">🔄 Cross-Shard Queries</h3>
                  <p className="text-gray-700 mb-2">Queries spanning multiple shards are complex and slow</p>
                  <p className="text-sm text-gray-600">Solution: Denormalize data, use application-level joins, or avoid cross-shard queries in design</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-700 text-lg mb-3">🔗 Referential Integrity</h3>
                  <p className="text-gray-700 mb-2">Foreign key constraints don't work across shards</p>
                  <p className="text-sm text-gray-600">Solution: Enforce constraints at application level, use eventual consistency patterns</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-700 text-lg mb-3">⚖️ Rebalancing</h3>
                  <p className="text-gray-700 mb-2">Adding/removing shards or redistributing data is complex</p>
                  <p className="text-sm text-gray-600">Solution: Use consistent hashing, plan for gradual migration, maintain shard size monitoring</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-700 text-lg mb-3">🎯 Shard Key Selection</h3>
                  <p className="text-gray-700 mb-2">Wrong shard key can cause uneven distribution and hot spots</p>
                  <p className="text-sm text-gray-600">Solution: Choose high-cardinality keys with even distribution, analyze access patterns</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-700 text-lg mb-3">💾 Backup and Recovery</h3>
                  <p className="text-gray-700 mb-2">Managing backups across multiple shards increases complexity</p>
                  <p className="text-sm text-gray-600">Solution: Automated backup orchestration, point-in-time recovery across all shards</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Practices</h2>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-yellow-100">
                  <h3 className="font-bold text-yellow-700 mb-2">1. Choose the Right Shard Key</h3>
                  <p className="text-gray-700">High cardinality, even distribution, aligns with query patterns</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-yellow-100">
                  <h3 className="font-bold text-yellow-700 mb-2">2. Plan for Growth</h3>
                  <p className="text-gray-700">Start with more shards than currently needed to avoid frequent rebalancing</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-yellow-100">
                  <h3 className="font-bold text-yellow-700 mb-2">3. Monitor Shard Health</h3>
                  <p className="text-gray-700">Track size, query load, and performance metrics per shard</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-yellow-100">
                  <h3 className="font-bold text-yellow-700 mb-2">4. Use Consistent Hashing</h3>
                  <p className="text-gray-700">Minimize data movement when adding or removing shards</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-yellow-100">
                  <h3 className="font-bold text-yellow-700 mb-2">5. Denormalize When Necessary</h3>
                  <p className="text-gray-700">Accept some data duplication to avoid expensive cross-shard joins</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Examples</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">Instagram</h3>
                  <p className="text-gray-700 mb-2">Shards users across thousands of PostgreSQL databases using user ID</p>
                  <span className="text-sm text-gray-500">Hash-based sharding with consistent hashing for scaling</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">MongoDB</h3>
                  <p className="text-gray-700 mb-2">Built-in sharding with automatic data distribution and balancing</p>
                  <span className="text-sm text-gray-500">Supports range, hash, and zone-based sharding strategies</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">Discord</h3>
                  <p className="text-gray-700 mb-2">Shards messages by channel ID across Cassandra clusters</p>
                  <span className="text-sm text-gray-500">Hash-based sharding for even distribution of chat data</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">Shopify</h3>
                  <p className="text-gray-700 mb-2">Shards merchant data by shop ID across MySQL databases</p>
                  <span className="text-sm text-gray-500">Each shop's data in one shard for transactional consistency</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Use Cases</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">📱 Social Media Platforms</h3>
                  <p className="text-gray-700">Shard user data by user ID to handle billions of users and their content</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">🛒 E-Commerce Marketplaces</h3>
                  <p className="text-gray-700">Shard by seller/merchant ID to isolate tenant data and scale independently</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">📊 Analytics Platforms</h3>
                  <p className="text-gray-700">Time-based sharding for log data, keeping recent data hot and archiving old shards</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">🎮 Gaming Platforms</h3>
                  <p className="text-gray-700">Shard player data by region or game server to optimize latency and isolation</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

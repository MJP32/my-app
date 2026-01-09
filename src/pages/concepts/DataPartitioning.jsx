import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function DataPartitioning({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-orange-700 hover:border-orange-600 text-orange-300 hover:text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              📊 Data Partitioning
            </h1>
            <span className="px-3 py-1 bg-orange-900/50 text-orange-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-orange-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Split large datasets into smaller, manageable pieces for improved performance and scalability
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-orange-900/30 text-orange-300 rounded-lg text-sm font-medium border border-orange-700">Horizontal</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">Vertical</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Functional</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">Range-Based</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'strategies', 'considerations', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-orange-400 bg-orange-900/30 border-b-2 border-orange-400 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'strategies' && 'Partitioning Strategies'}
              {tab === 'considerations' && 'Key Considerations'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">What is Data Partitioning?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Data partitioning is the process of dividing a large dataset into smaller, more manageable segments called partitions.
                Each partition can be stored on different servers or physical locations, enabling better performance and scalability.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Partitioning is fundamental to building systems that handle massive amounts of data. It enables parallel processing,
                improves query performance, and allows systems to scale beyond the limits of a single machine.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Benefits of Partitioning</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">⚡ Improved Performance</h3>
                  <p className="text-gray-300">Queries scan smaller datasets, indexes are smaller, parallel processing across partitions</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">📈 Scalability</h3>
                  <p className="text-gray-300">Distribute partitions across multiple servers to handle growing data volumes</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🔧 Manageability</h3>
                  <p className="text-gray-300">Easier to backup, restore, and maintain smaller partitions independently</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🌍 Geographic Distribution</h3>
                  <p className="text-gray-300">Place partitions closer to users in different regions for lower latency</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Partitioning vs Sharding</h2>
              <p className="text-gray-300 text-lg mb-6">
                These terms are often used interchangeably, but there's a subtle distinction:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">Partitioning</h3>
                  <p className="text-gray-300 mb-2">General term for splitting data into segments</p>
                  <p className="text-sm text-gray-400">Can be on same server or different servers</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">Sharding</h3>
                  <p className="text-gray-300 mb-2">Horizontal partitioning across multiple servers</p>
                  <p className="text-sm text-gray-400">Always implies distributed system</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">↔️ Horizontal Partitioning (Sharding)</h2>
              <p className="text-gray-300 text-lg mb-4">Split rows across multiple tables/databases with same schema.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-3">Example:</h3>
                <div className="bg-blue-900/30 p-4 rounded-lg text-gray-300 space-y-1 text-sm">
                  <div>Partition 1: Users with ID 1-1,000,000</div>
                  <div>Partition 2: Users with ID 1,000,001-2,000,000</div>
                  <div>Partition 3: Users with ID 2,000,001-3,000,000</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-blue-400 mb-2">✅ Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Scales to multiple servers</li>
                    <li>• Smaller indexes, faster queries</li>
                    <li>• Parallel processing</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-red-400 mb-2">❌ Challenges:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Cross-partition queries expensive</li>
                    <li>• Rebalancing complexity</li>
                    <li>• Need good partition key</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">⬇️ Vertical Partitioning</h2>
              <p className="text-gray-300 text-lg mb-4">Split columns into separate tables based on access patterns.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700 mb-4">
                <h3 className="font-bold text-green-400 mb-3">Example:</h3>
                <div className="bg-green-900/30 p-4 rounded-lg text-gray-300 space-y-1 text-sm">
                  <div>User_Core: id, name, email (frequently accessed)</div>
                  <div>User_Profile: id, bio, avatar, preferences (less frequently accessed)</div>
                  <div>User_Settings: id, theme, notifications (rarely accessed)</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h4 className="font-bold text-green-400 mb-2">✅ Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Reduce I/O for common queries</li>
                    <li>• Better cache utilization</li>
                    <li>• Separate storage types (SSD vs HDD)</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h4 className="font-bold text-red-400 mb-2">❌ Challenges:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Joins when accessing multiple tables</li>
                    <li>• Application complexity</li>
                    <li>• Data normalization trade-offs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">🎯 Functional Partitioning</h2>
              <p className="text-gray-300 text-lg mb-4">Separate data by business function or domain.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700 mb-4">
                <h3 className="font-bold text-purple-400 mb-3">Example - E-Commerce:</h3>
                <div className="bg-purple-900/30 p-4 rounded-lg text-gray-300 space-y-1 text-sm">
                  <div>Database 1: User data (authentication, profiles)</div>
                  <div>Database 2: Product data (catalog, inventory)</div>
                  <div>Database 3: Order data (orders, transactions)</div>
                  <div>Database 4: Analytics data (events, metrics)</div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                <h4 className="font-bold text-purple-400 mb-2">Best for:</h4>
                <p className="text-gray-300 text-sm">Microservices architecture, domain-driven design, service isolation</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Partition Key Selection</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-3">Good Partition Keys:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>High Cardinality:</strong> Many distinct values (user_id, not gender)</li>
                    <li>• <strong>Even Distribution:</strong> Uniform distribution across partitions</li>
                    <li>• <strong>Query Aligned:</strong> Frequently used in WHERE clauses</li>
                    <li>• <strong>Stable:</strong> Doesn't change often (immutable fields)</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 mb-3">Poor Partition Keys:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Low cardinality fields (status, country)</li>
                    <li>• Monotonically increasing values (auto-increment ID, timestamp)</li>
                    <li>• Fields with skewed distribution</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'considerations' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-red-700">
              <h2 className="text-3xl font-bold text-white mb-6">Challenges and Trade-offs</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 text-lg mb-3">Cross-Partition Queries</h3>
                  <p className="text-gray-300 mb-2">Queries spanning multiple partitions are slow and expensive</p>
                  <p className="text-sm text-gray-400">Solution: Denormalize data, use partition key in queries, aggregate tables</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 text-lg mb-3">Referential Integrity</h3>
                  <p className="text-gray-300 mb-2">Foreign key constraints don't work across partitions/databases</p>
                  <p className="text-sm text-gray-400">Solution: Enforce at application level, use eventual consistency</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 text-lg mb-3">Unbalanced Partitions</h3>
                  <p className="text-gray-300 mb-2">Some partitions may grow much larger than others (hot spots)</p>
                  <p className="text-sm text-gray-400">Solution: Choose better partition key, monitor and rebalance, use composite keys</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 text-lg mb-3">Joins Across Partitions</h3>
                  <p className="text-gray-300 mb-2">Distributed joins are complex and slow</p>
                  <p className="text-sm text-gray-400">Solution: Denormalize data, application-level joins, co-locate related data</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Partition Pruning</h2>
              <p className="text-gray-300 text-lg mb-4">
                Query optimizer eliminates partitions that don't contain relevant data.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                <h3 className="font-bold text-blue-400 mb-3">Example:</h3>
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-white mb-3">
                  <div className="text-green-400 mb-2">-- Query with partition key</div>
                  <div>SELECT * FROM orders WHERE user_id = 12345;</div>
                  <div className="text-gray-400 mt-2">// Only scans partition containing user 12345</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-white">
                  <div className="text-green-400 mb-2">-- Query without partition key</div>
                  <div>SELECT * FROM orders WHERE order_date = '2024-01-01';</div>
                  <div className="text-gray-400 mt-2">// Scans ALL partitions (slow!)</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Best Practices</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">1. Always Include Partition Key in Queries</h3>
                  <p className="text-gray-300 text-sm">Enables partition pruning for faster queries</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">2. Monitor Partition Sizes</h3>
                  <p className="text-gray-300 text-sm">Track growth, detect imbalances, plan for rebalancing</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">3. Design for Data Locality</h3>
                  <p className="text-gray-300 text-sm">Co-locate frequently joined data in same partition</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">4. Plan for Growth</h3>
                  <p className="text-gray-300 text-sm">Over-partition initially to avoid frequent rebalancing</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">5. Test Partition Strategy</h3>
                  <p className="text-gray-300 text-sm">Validate with production-like data before going live</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Database-Specific Partitioning</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">PostgreSQL</h3>
                  <p className="text-gray-300 mb-2">Native table partitioning with range, list, and hash strategies</p>
                  <span className="text-sm text-gray-400">Declarative partitioning, automatic partition pruning, parallel queries</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">MySQL</h3>
                  <p className="text-gray-300 mb-2">Table partitioning with RANGE, LIST, HASH, and KEY methods</p>
                  <span className="text-sm text-gray-400">Partition pruning, local indexes per partition</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Cassandra</h3>
                  <p className="text-gray-300 mb-2">Automatic partitioning using partition key from primary key</p>
                  <span className="text-sm text-gray-400">Consistent hashing, distributed across nodes, tunable replication</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">MongoDB</h3>
                  <p className="text-gray-300 mb-2">Sharding with range, hash, or zone-based strategies</p>
                  <span className="text-sm text-gray-400">Automatic balancing, shard key selection critical</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Use Cases</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">📅 Time-Series Data</h3>
                  <p className="text-gray-300 mb-2">Partition by date/time for logs, metrics, events</p>
                  <code className="text-xs bg-blue-900/30 px-2 py-1 rounded block mt-2 text-blue-300">Partition by month: logs_202401, logs_202402, logs_202403</code>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🌍 Multi-Tenant SaaS</h3>
                  <p className="text-gray-300 mb-2">Partition by tenant_id to isolate customer data</p>
                  <code className="text-xs bg-blue-900/30 px-2 py-1 rounded block mt-2 text-blue-300">Each tenant in separate partition for security and performance</code>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">👥 Social Networks</h3>
                  <p className="text-gray-300 mb-2">Partition users by user_id, shard across hundreds of databases</p>
                  <code className="text-xs bg-blue-900/30 px-2 py-1 rounded block mt-2 text-blue-300">Instagram: Sharded PostgreSQL by user_id for billions of users</code>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🛒 E-Commerce Orders</h3>
                  <p className="text-gray-300 mb-2">Partition by order date for efficient querying and archival</p>
                  <code className="text-xs bg-blue-900/30 px-2 py-1 rounded block mt-2 text-blue-300">Recent orders on fast storage, old orders archived</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

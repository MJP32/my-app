import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function DatabaseReplication({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-purple-700 hover:border-purple-600 text-purple-300 hover:text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🔁 Database Replication
            </h1>
            <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-purple-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Copy and synchronize data across multiple database instances for high availability and performance
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">Primary-Replica</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">Multi-Master</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Synchronous</span>
            <span className="px-4 py-2 bg-orange-900/30 text-orange-300 rounded-lg text-sm font-medium border border-orange-700">Asynchronous</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'types', 'strategies', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-purple-400 bg-purple-900/30 border-b-2 border-purple-400 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'types' && 'Replication Types'}
              {tab === 'strategies' && 'Strategies'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">What is Database Replication?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Database replication involves copying and maintaining database data in multiple locations (replicas).
                Changes made to one database are propagated to others, keeping them in sync.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Replication provides high availability, disaster recovery, read scalability, and geographic distribution.
                It's a fundamental pattern in distributed database systems.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Benefits of Replication</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🚀 Improved Performance</h3>
                  <p className="text-gray-300">Distribute read queries across replicas, reducing load on primary database</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">💪 High Availability</h3>
                  <p className="text-gray-300">If primary fails, promote replica to primary for minimal downtime</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🌍 Geographic Distribution</h3>
                  <p className="text-gray-300">Place replicas closer to users in different regions for lower latency</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🔒 Disaster Recovery</h3>
                  <p className="text-gray-300">Backup data in multiple locations protects against data center failures</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Replication Lag</h2>
              <p className="text-gray-300 text-lg mb-6">
                The delay between a write on the primary and when it appears on replicas. Critical consideration in system design.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">Causes of Lag</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Network latency between data centers</li>
                    <li>• Heavy write load overwhelming replicas</li>
                    <li>• Large transactions taking time to apply</li>
                    <li>• Replica performing maintenance operations</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">Impact</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Users may read stale data</li>
                    <li>• Can cause consistency issues</li>
                    <li>• Monitor lag metrics closely</li>
                    <li>• Alert when lag exceeds threshold</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Primary-Replica (Master-Slave)</h2>
              <p className="text-gray-300 text-lg mb-4">One primary accepts writes, multiple read-only replicas receive updates.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-3">How it works:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• All writes go to primary database</li>
                  <li>• Primary logs changes (write-ahead log, binlog)</li>
                  <li>• Replicas pull or receive changes from primary</li>
                  <li>• Replicas apply changes to their local copy</li>
                  <li>• Read queries distributed across replicas</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-blue-400 mb-2">✅ Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Simple to implement and understand</li>
                    <li>• Read scalability (add more replicas)</li>
                    <li>• No write conflicts</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-red-400 mb-2">❌ Disadvantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Primary is single point of failure for writes</li>
                    <li>• Can't scale write throughput</li>
                    <li>• Failover complexity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Multi-Master (Multi-Primary)</h2>
              <p className="text-gray-300 text-lg mb-4">Multiple nodes accept writes, sync changes between each other.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700 mb-4">
                <h3 className="font-bold text-purple-400 mb-3">How it works:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Multiple nodes accept both reads and writes</li>
                  <li>• Each node replicates to other nodes</li>
                  <li>• Conflict detection and resolution needed</li>
                  <li>• Can write to nearest node for lower latency</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h4 className="font-bold text-purple-400 mb-2">✅ Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Write scalability across regions</li>
                    <li>• No single point of failure</li>
                    <li>• Low latency writes globally</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h4 className="font-bold text-red-400 mb-2">❌ Disadvantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Complex conflict resolution</li>
                    <li>• Potential data inconsistencies</li>
                    <li>• Harder to reason about</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Synchronous vs Asynchronous</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700 shadow-sm">
                  <h3 className="text-xl font-bold text-green-400 mb-4">Synchronous Replication</h3>
                  <p className="text-gray-300 mb-4">
                    Write completes only after replicas acknowledge receipt. Guarantees consistency but adds latency.
                  </p>
                  <div className="bg-green-900/30 p-3 rounded-lg text-sm">
                    <div className="font-bold text-green-400 mb-1">Use when:</div>
                    <div className="text-gray-300">Data loss is unacceptable (financial transactions)</div>
                  </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700 shadow-sm">
                  <h3 className="text-xl font-bold text-green-400 mb-4">Asynchronous Replication</h3>
                  <p className="text-gray-300 mb-4">
                    Write completes immediately, replicas update later. Better performance but potential data loss during failures.
                  </p>
                  <div className="bg-green-900/30 p-3 rounded-lg text-sm">
                    <div className="font-bold text-green-400 mb-1">Use when:</div>
                    <div className="text-gray-300">Performance matters more than immediate consistency</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Semi-Synchronous Replication</h2>
              <p className="text-gray-300 text-lg mb-4">Hybrid approach: wait for at least one replica to acknowledge.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                <h3 className="font-bold text-orange-400 mb-3">How it works:</h3>
                <p className="text-gray-300 mb-4">
                  Primary waits for acknowledgment from one replica, then completes write. Other replicas update asynchronously.
                  Balances durability and performance.
                </p>
                <div className="bg-orange-900/30 p-4 rounded-lg">
                  <div className="font-bold text-orange-400 mb-2">Example: MySQL Semi-Sync</div>
                  <p className="text-gray-300 text-sm">
                    Primary waits for one replica acknowledgment. If replica too slow, falls back to async mode.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Failover Strategies</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-lg mb-3">Automatic Failover</h3>
                  <p className="text-gray-300 mb-3">System detects primary failure and promotes replica automatically.</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Health checks detect primary down</li>
                    <li>• Elect new primary from replicas (usually most up-to-date)</li>
                    <li>• Reconfigure other replicas to follow new primary</li>
                    <li>• Update application connection strings</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-lg mb-3">Manual Failover</h3>
                  <p className="text-gray-300 mb-3">Operations team manually promotes replica during maintenance or failure.</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• More control over process</li>
                    <li>• Verify data consistency before promotion</li>
                    <li>• Higher downtime than automatic</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Monitoring Replication Health</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Replication Lag</h3>
                  <p className="text-gray-300 text-sm">Monitor delay between primary and replicas. Alert if exceeds threshold (e.g., 10 seconds).</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Replica Status</h3>
                  <p className="text-gray-300 text-sm">Check if replication is running, no errors in replication threads.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Network Connectivity</h3>
                  <p className="text-gray-300 text-sm">Ensure stable connection between primary and replicas.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Data Consistency</h3>
                  <p className="text-gray-300 text-sm">Periodic checksums to verify data matches across nodes.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Conflict Resolution (Multi-Master)</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Last Write Wins (LWW)</h3>
                  <p className="text-gray-300 text-sm">Use timestamp to determine which write is most recent. Simple but can lose updates.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Application-Level Resolution</h3>
                  <p className="text-gray-300 text-sm">Detect conflicts, present both versions to application/user for resolution.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Conflict-Free Replicated Data Types (CRDTs)</h3>
                  <p className="text-gray-300 text-sm">Data structures designed to merge concurrent updates automatically.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Best Practices</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">1. Monitor Lag Continuously</h3>
                  <p className="text-gray-300 text-sm">Set up alerts for replication lag. Investigate if lag grows unexpectedly.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">2. Test Failover Regularly</h3>
                  <p className="text-gray-300 text-sm">Practice failover procedures. Ensure they work when you need them.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">3. Use Connection Pooling</h3>
                  <p className="text-gray-300 text-sm">Distribute read queries across replicas efficiently with load balancing.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">4. Separate Read and Write Connections</h3>
                  <p className="text-gray-300 text-sm">Direct writes to primary, reads to replicas. Handle read-your-writes consistency.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Database-Specific Replication</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">MySQL Replication</h3>
                  <p className="text-gray-300 mb-2">Binary log-based replication with async, semi-sync, and group replication</p>
                  <span className="text-sm text-gray-400">Primary-replica, GTID for failover, read replicas for scaling</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">PostgreSQL Streaming Replication</h3>
                  <p className="text-gray-300 mb-2">WAL-based streaming with physical and logical replication</p>
                  <span className="text-sm text-gray-400">Sync/async modes, hot standby for reads, automatic failover with tools</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">MongoDB Replica Sets</h3>
                  <p className="text-gray-300 mb-2">Automatic failover with primary election, oplog-based replication</p>
                  <span className="text-sm text-gray-400">3+ nodes recommended, automatic primary election, read preferences</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Cassandra Multi-Datacenter</h3>
                  <p className="text-gray-300 mb-2">Multi-master replication across data centers with tunable consistency</p>
                  <span className="text-sm text-gray-400">No single point of failure, cross-DC replication, eventual consistency</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Architectures</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">📱 Social Media Platform</h3>
                  <p className="text-gray-300">Primary in main DC, read replicas in multiple regions. Users read from nearest replica.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🏦 Banking System</h3>
                  <p className="text-gray-300">Synchronous replication to DR site. Guarantee no data loss during failures.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🛒 E-Commerce</h3>
                  <p className="text-gray-300">Async replicas for product catalog reads. Sync replication for order/payment data.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">📊 Analytics Platform</h3>
                  <p className="text-gray-300">Dedicated read replica for analytics queries. Don't impact production primary.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

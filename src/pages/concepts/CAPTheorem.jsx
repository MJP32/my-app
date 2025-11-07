import React, { useState } from 'react';

export default function CAPTheorem({ onBack }) {
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
              🔺 CAP Theorem
            </h1>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold uppercase tracking-wide">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-6 font-light">
            Understand the fundamental trade-offs in distributed systems: Consistency, Availability, Partition Tolerance
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">Consistency</span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">Availability</span>
            <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100">Partition Tolerance</span>
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">Trade-offs</span>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-0">
          {['overview', 'combinations', 'theorem', 'examples'].map(tab => (
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
              {tab === 'combinations' && 'CAP Combinations'}
              {tab === 'theorem' && 'Understanding CAP'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border-2 border-red-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is the CAP Theorem?</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                The CAP theorem, proposed by Eric Brewer, states that a distributed data store cannot simultaneously provide
                more than two out of the following three guarantees: Consistency, Availability, and Partition Tolerance.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                This theorem is fundamental to understanding the trade-offs in distributed systems design. When network partitions
                occur (which they inevitably do), you must choose between consistency and availability.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">The Three Guarantees</h2>
              <div className="space-y-4">
                <div className="bg-blue-500/20 border-2 border-blue-500/40 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">C - Consistency</h3>
                  <p className="text-gray-200 text-lg mb-2">
                    Every read receives the most recent write or an error. All nodes see the same data at the same time.
                  </p>
                  <p className="text-gray-300 text-sm">
                    Example: After updating your profile picture, everyone sees the new picture immediately
                  </p>
                </div>
                <div className="bg-green-500/20 border-2 border-green-500/40 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">A - Availability</h3>
                  <p className="text-gray-200 text-lg mb-2">
                    Every request receives a response (success or failure), without guarantee that it contains the most recent write.
                  </p>
                  <p className="text-gray-300 text-sm">
                    Example: The system always responds even if some nodes are down
                  </p>
                </div>
                <div className="bg-orange-500/20 border-2 border-orange-500/40 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">P - Partition Tolerance</h3>
                  <p className="text-gray-200 text-lg mb-2">
                    The system continues to operate despite network partitions (communication breakdowns between nodes).
                  </p>
                  <p className="text-gray-300 text-sm">
                    Example: System functions even when network splits nodes into groups that can't communicate
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Only Two?</h2>
              <p className="text-gray-700 text-lg mb-4">
                In a distributed system, network partitions are inevitable. Cables get cut, routers fail, data centers lose connectivity.
                When a partition occurs, you're forced to choose:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-yellow-100 shadow-sm">
                  <h3 className="text-lg font-bold text-yellow-700 mb-3">Choose Consistency</h3>
                  <p className="text-gray-700">Wait for the partition to resolve, potentially becoming unavailable. Some nodes may return errors.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-yellow-100 shadow-sm">
                  <h3 className="text-lg font-bold text-yellow-700 mb-3">Choose Availability</h3>
                  <p className="text-gray-700">Continue serving requests from all nodes, risking that different nodes return different data.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'combinations' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">CP - Consistency + Partition Tolerance</h2>
              <p className="text-gray-700 text-lg mb-4">Sacrifice availability to maintain consistency during partitions.</p>
              <div className="bg-white p-6 rounded-xl border border-blue-100 mb-4">
                <h3 className="font-bold text-blue-700 mb-3">Behavior:</h3>
                <p className="text-gray-700 mb-4">
                  When a partition occurs, the system may reject requests or timeout until consistency can be guaranteed.
                  Nodes in the minority partition will refuse to serve requests to avoid returning stale data.
                </p>
                <h3 className="font-bold text-blue-700 mb-3">Use Cases:</h3>
                <p className="text-gray-700">
                  Banking systems, financial transactions, inventory management - where stale data could cause serious issues
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-bold text-blue-700 mb-3">Examples:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>MongoDB:</strong> Can be configured for strong consistency</li>
                  <li>• <strong>HBase:</strong> Prioritizes consistency over availability</li>
                  <li>• <strong>Redis:</strong> With synchronous replication</li>
                  <li>• <strong>Apache ZooKeeper:</strong> Coordination service with strong consistency</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">AP - Availability + Partition Tolerance</h2>
              <p className="text-gray-700 text-lg mb-4">Sacrifice consistency to maintain availability during partitions.</p>
              <div className="bg-white p-6 rounded-xl border border-green-100 mb-4">
                <h3 className="font-bold text-green-700 mb-3">Behavior:</h3>
                <p className="text-gray-700 mb-4">
                  When a partition occurs, all nodes remain available and accept reads/writes. Different nodes may return
                  different data (eventual consistency). The system reconciles differences when partition heals.
                </p>
                <h3 className="font-bold text-green-700 mb-3">Use Cases:</h3>
                <p className="text-gray-700">
                  Social media feeds, product catalogs, caching - where eventual consistency is acceptable
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h3 className="font-bold text-green-700 mb-3">Examples:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Cassandra:</strong> Highly available distributed database</li>
                  <li>• <strong>DynamoDB:</strong> AWS's managed NoSQL database</li>
                  <li>• <strong>CouchDB:</strong> Document database with eventual consistency</li>
                  <li>• <strong>Riak:</strong> Distributed key-value store</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">CA - Consistency + Availability</h2>
              <p className="text-gray-700 text-lg mb-4">No partition tolerance - only possible in non-distributed systems.</p>
              <div className="bg-white p-6 rounded-xl border border-purple-100 mb-4">
                <h3 className="font-bold text-purple-700 mb-3">Reality Check:</h3>
                <p className="text-gray-700 mb-4">
                  True CA systems don't exist in distributed environments because network partitions are inevitable.
                  CA is only achievable in single-node systems or systems that can guarantee no network failures.
                </p>
                <h3 className="font-bold text-purple-700 mb-3">Practical Application:</h3>
                <p className="text-gray-700">
                  Traditional single-server relational databases (PostgreSQL, MySQL) running on one machine are CA systems,
                  but they don't scale horizontally and have single point of failure.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <h3 className="font-bold text-purple-700 mb-3">Examples:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Single-node PostgreSQL</li>
                  <li>• Single-node MySQL</li>
                  <li>• Single-server applications</li>
                  <li>• Not realistic for distributed systems</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'theorem' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Misconceptions</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-orange-100">
                  <h3 className="font-bold text-red-700 mb-3">❌ "You can only have 2 out of 3 at all times"</h3>
                  <p className="text-gray-700 mb-2">Reality: During normal operations (no partition), you can have all three!</p>
                  <p className="text-sm text-gray-600">The choice only matters when a network partition occurs.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-orange-100">
                  <h3 className="font-bold text-red-700 mb-3">❌ "CAP is binary - either 100% or 0%"</h3>
                  <p className="text-gray-700 mb-2">Reality: These properties exist on a spectrum with tunable trade-offs</p>
                  <p className="text-sm text-gray-600">You can tune consistency levels (eventual, strong, causal) and availability guarantees.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-orange-100">
                  <h3 className="font-bold text-red-700 mb-3">❌ "Partition tolerance is optional"</h3>
                  <p className="text-gray-700 mb-2">Reality: In distributed systems, partitions will happen</p>
                  <p className="text-sm text-gray-600">You must build for partition tolerance. The real choice is between C and A during partitions.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Modern Perspective: PACELC</h2>
              <p className="text-gray-700 text-lg mb-6">
                PACELC extends CAP theorem: "if Partition, choose between Availability and Consistency, Else (no partition)
                choose between Latency and Consistency"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">During Partition (P)</h3>
                  <p className="text-gray-700">Choose between Availability (A) or Consistency (C)</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">During Normal Operation (E)</h3>
                  <p className="text-gray-700">Choose between Latency (L) or Consistency (C)</p>
                </div>
              </div>
              <div className="mt-6 bg-blue-50 p-6 rounded-xl">
                <h3 className="font-bold text-blue-700 mb-3">Examples:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>PA/EL:</strong> Cassandra - Available during partitions, low latency normally</li>
                  <li>• <strong>PC/EC:</strong> HBase - Consistent during partitions, consistent normally (higher latency)</li>
                  <li>• <strong>PA/EC:</strong> DynamoDB - Available during partitions, tunable consistency normally</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tunable Consistency</h2>
              <p className="text-gray-700 text-lg mb-6">
                Modern databases offer tunable consistency levels, allowing you to choose different guarantees per operation.
              </p>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Strong Consistency (Linearizability)</h3>
                  <p className="text-gray-700 text-sm">All reads see the most recent write. Highest consistency, lowest availability.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Causal Consistency</h3>
                  <p className="text-gray-700 text-sm">Causally related operations are seen in order. Balance between strong and eventual.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Eventual Consistency</h3>
                  <p className="text-gray-700 text-sm">Given enough time without updates, all replicas converge. Highest availability.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Read-Your-Writes</h3>
                  <p className="text-gray-700 text-sm">A user sees their own writes immediately, but others may see them later.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World CAP Decisions</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 text-xl mb-2">Banking System (CP)</h3>
                  <p className="text-gray-700 mb-2">
                    Choose consistency over availability. Account balances must be accurate. Better to show an error
                    than incorrect balance during network issues.
                  </p>
                  <span className="text-sm text-gray-500">Sacrifice: May be unavailable during network partitions</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 text-xl mb-2">Social Media Feed (AP)</h3>
                  <p className="text-gray-700 mb-2">
                    Choose availability over consistency. Users should always be able to read/post content.
                    It's okay if different users see slightly different feeds temporarily.
                  </p>
                  <span className="text-sm text-gray-500">Sacrifice: Users may see stale data during network issues</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 text-xl mb-2">DNS System (AP)</h3>
                  <p className="text-gray-700 mb-2">
                    Global DNS prioritizes availability. It's critical that DNS always responds,
                    even if some records might be stale during propagation.
                  </p>
                  <span className="text-sm text-gray-500">Sacrifice: DNS changes take time to propagate globally</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 text-xl mb-2">Shopping Cart (AP → CP)</h3>
                  <p className="text-gray-700 mb-2">
                    Browse with AP (eventual consistency), but checkout with CP (strong consistency).
                    Different parts of the system can make different CAP trade-offs.
                  </p>
                  <span className="text-sm text-gray-500">Hybrid approach: different guarantees for different operations</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Database Categorization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-blue-700">CP Systems</h3>
                  <div className="bg-white p-4 rounded-xl border border-blue-100">
                    <p className="font-bold text-gray-800">MongoDB</p>
                    <p className="text-sm text-gray-600">With majority write concern</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-blue-100">
                    <p className="font-bold text-gray-800">HBase</p>
                    <p className="text-sm text-gray-600">Strong consistency model</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-blue-100">
                    <p className="font-bold text-gray-800">Redis</p>
                    <p className="text-sm text-gray-600">With AOF and sync replication</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-blue-100">
                    <p className="font-bold text-gray-800">ZooKeeper</p>
                    <p className="text-sm text-gray-600">Consensus-based coordination</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-green-700">AP Systems</h3>
                  <div className="bg-white p-4 rounded-xl border border-green-100">
                    <p className="font-bold text-gray-800">Cassandra</p>
                    <p className="text-sm text-gray-600">Always available, eventually consistent</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-green-100">
                    <p className="font-bold text-gray-800">DynamoDB</p>
                    <p className="text-sm text-gray-600">Highly available key-value store</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-green-100">
                    <p className="font-bold text-gray-800">CouchDB</p>
                    <p className="text-sm text-gray-600">Multi-master replication</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-green-100">
                    <p className="font-bold text-gray-800">Riak</p>
                    <p className="text-sm text-gray-600">Distributed with eventual consistency</p>
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

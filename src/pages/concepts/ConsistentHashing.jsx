import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function ConsistentHashing({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-yellow-700 hover:border-yellow-600 text-yellow-300 hover:text-yellow-200 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🔑 Consistent Hashing
            </h1>
            <span className="px-3 py-1 bg-yellow-900/50 text-yellow-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-yellow-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Distribute data across nodes with minimal redistribution when scaling
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-yellow-900/30 text-yellow-300 rounded-lg text-sm font-medium border border-yellow-700">Hash Ring</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">Virtual Nodes</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Minimal Remapping</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">Scalability</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'algorithm', 'virtual-nodes', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-yellow-400 bg-yellow-900/30 border-b-2 border-yellow-400 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'algorithm' && 'How It Works'}
              {tab === 'virtual-nodes' && 'Virtual Nodes'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-2xl p-8 border-2 border-yellow-700">
              <h2 className="text-3xl font-bold text-white mb-6">What is Consistent Hashing?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Consistent hashing is a distributed hashing technique that minimizes key redistribution when nodes are added or removed.
                Traditional hashing requires remapping most keys when cluster size changes, but consistent hashing only affects a small fraction.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                It's essential for building scalable distributed systems like caches, databases, and load balancers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-red-700">
              <h2 className="text-3xl font-bold text-white mb-6">The Problem with Simple Hashing</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-red-700 mb-4">
                <h3 className="font-bold text-red-400 mb-3">Simple Hash Formula:</h3>
                <code className="bg-red-900/30 px-4 py-2 rounded block mb-4 text-red-300">server = hash(key) % N</code>
                <p className="text-gray-300 mb-4">
                  When N changes (add/remove server), almost all keys map to different servers. This causes massive data redistribution.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🔄 Minimal Remapping</h3>
                  <p className="text-gray-300">Only K/N keys remapped on average (K=keys, N=nodes)</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">📈 Scalability</h3>
                  <p className="text-gray-300">Add/remove servers with minimal disruption</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">⚖️ Load Balance</h3>
                  <p className="text-gray-300">Virtual nodes ensure even distribution</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">💪 Fault Tolerance</h3>
                  <p className="text-gray-300">System continues with failed nodes</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'algorithm' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">The Hash Ring</h2>
              <p className="text-gray-300 text-lg mb-6">
                Imagine a circle (ring) with positions from 0 to 2^32-1. Both servers and keys are hashed to positions on this ring.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                <h3 className="font-bold text-purple-400 mb-4">Algorithm:</h3>
                <ol className="space-y-3 text-gray-300">
                  <li>1. Hash each server to position on ring</li>
                  <li>2. Hash each key to position on ring</li>
                  <li>3. Walk clockwise from key until you find a server</li>
                  <li>4. That server stores the key</li>
                </ol>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Adding a Node</h2>
              <p className="text-gray-300 mb-4">
                When adding a server, only keys in one section of the ring move. Other keys stay on their current servers.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                <div className="bg-green-900/30 p-4 rounded-lg text-gray-300">
                  Only keys between new server and previous server need to move. This is approximately K/N keys where K is total keys and N is number of nodes.
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Removing a Node</h2>
              <p className="text-gray-300 mb-4">
                When removing a server, its keys move to the next server clockwise on the ring.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                <div className="bg-blue-900/30 p-4 rounded-lg text-gray-300">
                  Only the failed node's keys are redistributed. The rest of the system is unaffected.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'virtual-nodes' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Why Virtual Nodes?</h2>
              <p className="text-gray-300 text-lg mb-4">
                With few physical nodes, basic consistent hashing can lead to uneven load distribution. Virtual nodes solve this.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                <h3 className="font-bold text-orange-400 mb-3">Problem:</h3>
                <p className="text-gray-300">
                  3 servers might cover 30%, 35%, and 35% of ring due to random hash positions. Load is unbalanced.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Virtual Nodes Solution</h2>
              <p className="text-gray-300 text-lg mb-4">
                Each physical server gets multiple virtual nodes (100-200) distributed around the ring.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <div className="bg-blue-900/30 p-4 rounded-lg text-gray-300">
                  <div>Server A: hash("A-1"), hash("A-2"), ..., hash("A-150")</div>
                  <div>Server B: hash("B-1"), hash("B-2"), ..., hash("B-150")</div>
                  <div>Server C: hash("C-1"), hash("C-2"), ..., hash("C-150")</div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                <h4 className="font-bold text-blue-400 mb-2">Benefits:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• More even data distribution</li>
                  <li>• Smoother load balancing</li>
                  <li>• Can weight nodes by capacity</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Weighted Virtual Nodes</h2>
              <p className="text-gray-300 text-lg mb-4">
                Give more powerful servers more virtual nodes to handle proportional load.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                <div className="bg-green-900/30 p-4 rounded-lg text-gray-300">
                  <div>Server A (16GB): 100 virtual nodes</div>
                  <div>Server B (32GB): 200 virtual nodes</div>
                  <div>Server C (64GB): 400 virtual nodes</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Applications</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Amazon DynamoDB</h3>
                  <p className="text-gray-300 mb-2">Uses consistent hashing to partition data across nodes</p>
                  <span className="text-sm text-gray-400">Automatic rebalancing when nodes added/removed</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Apache Cassandra</h3>
                  <p className="text-gray-300 mb-2">Built-in consistent hashing with virtual nodes</p>
                  <span className="text-sm text-gray-400">Vnodes for even distribution</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Memcached Clients</h3>
                  <p className="text-gray-300 mb-2">Client libraries use consistent hashing for cache distribution</p>
                  <span className="text-sm text-gray-400">Minimal cache invalidation on scaling</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Use Cases</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">💾 Distributed Caching</h3>
                  <p className="text-gray-300">Distribute cache keys across multiple cache servers</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🗄️ Database Sharding</h3>
                  <p className="text-gray-300">Partition data across database shards efficiently</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">⚖️ Load Balancing</h3>
                  <p className="text-gray-300">Distribute requests with session affinity</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">📦 Object Storage</h3>
                  <p className="text-gray-300">Distribute files across storage nodes</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

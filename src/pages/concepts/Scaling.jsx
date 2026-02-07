import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function Scaling({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-cyan-700 hover:border-cyan-600 text-cyan-300 hover:text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              📈 Horizontal vs Vertical Scaling
            </h1>
            <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-cyan-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Scale your system to handle increased load by adding more resources or improving existing ones
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-cyan-900/30 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-700">Scale Out</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">Scale Up</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Distributed Systems</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">Load Distribution</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'comparison', 'patterns', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-cyan-400 bg-cyan-900/30 border-b-2 border-cyan-600 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'comparison' && 'Horizontal vs Vertical'}
              {tab === 'patterns' && 'Scaling Patterns'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-2xl p-8 border-2 border-cyan-700">
              <h2 className="text-3xl font-bold text-white mb-6">What is Scaling?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Scaling is the ability to handle increased load by adding resources to your system.
                As your application grows, you need strategies to maintain performance, availability, and responsiveness.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                There are two fundamental approaches: vertical scaling (making individual machines more powerful)
                and horizontal scaling (adding more machines). Each has distinct trade-offs and use cases.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">The Two Scaling Approaches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-500/20 border-2 border-blue-500/40 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">⬆️ Vertical Scaling (Scale Up)</h3>
                  <p className="text-gray-200 text-lg mb-3">Add more power to existing machine</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Upgrade CPU to more cores/faster speed</li>
                    <li>• Add more RAM</li>
                    <li>• Use faster storage (SSD, NVMe)</li>
                    <li>• Increase network bandwidth</li>
                  </ul>
                </div>
                <div className="bg-green-500/20 border-2 border-green-500/40 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">↔️ Horizontal Scaling (Scale Out)</h3>
                  <p className="text-gray-200 text-lg mb-3">Add more machines to the pool</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Add more servers</li>
                    <li>• Distribute load across servers</li>
                    <li>• Use load balancers</li>
                    <li>• Design for distributed systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">When to Scale?</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">📊 High CPU Usage</h3>
                  <p className="text-gray-300 text-sm">Sustained CPU usage above 70-80% indicates need for more compute power</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">💾 Memory Pressure</h3>
                  <p className="text-gray-300 text-sm">High memory usage causes swapping and degraded performance</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">⏱️ Increased Latency</h3>
                  <p className="text-gray-300 text-sm">Response times growing as load increases</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">🔴 Error Rates Rising</h3>
                  <p className="text-gray-300 text-sm">Timeouts and connection errors due to resource exhaustion</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Vertical Scaling (Scale Up)</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-3">How it works:</h3>
                <p className="text-gray-300">
                  Replace current server with a more powerful one. Upgrade from 4 cores to 16 cores, 32GB RAM to 128GB RAM, etc.
                  Application code typically doesn't need changes.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-blue-400 mb-3">✅ Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Simple to implement - just upgrade hardware</li>
                    <li>• No application code changes needed</li>
                    <li>• No complexity of distributed systems</li>
                    <li>• Data consistency is easy (single machine)</li>
                    <li>• Lower licensing costs (single server)</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-red-400 mb-3">❌ Disadvantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Hardware limits (can't scale forever)</li>
                    <li>• Expensive at high end (exponential cost)</li>
                    <li>• Downtime during upgrades</li>
                    <li>• Single point of failure</li>
                    <li>• Geographic limitations (one location)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Horizontal Scaling (Scale Out)</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700 mb-4">
                <h3 className="font-bold text-green-400 mb-3">How it works:</h3>
                <p className="text-gray-300">
                  Add more servers to handle load. Use load balancer to distribute traffic. Design application to work
                  across multiple nodes. Each server handles a portion of total load.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h4 className="font-bold text-green-400 mb-3">✅ Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Nearly infinite scalability (add more servers)</li>
                    <li>• Cost-effective (use commodity hardware)</li>
                    <li>• High availability (redundancy built-in)</li>
                    <li>• No downtime for scaling (add servers live)</li>
                    <li>• Geographic distribution possible</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h4 className="font-bold text-red-400 mb-3">❌ Disadvantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Complex architecture and code changes</li>
                    <li>• Data consistency challenges</li>
                    <li>• Network latency between nodes</li>
                    <li>• More operational complexity</li>
                    <li>• Requires stateless design or session management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Decision Matrix</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-800 rounded-xl overflow-hidden border border-purple-700">
                  <thead className="bg-purple-900/50">
                    <tr>
                      <th className="p-4 text-left font-bold text-purple-300">Factor</th>
                      <th className="p-4 text-left font-bold text-blue-300">Vertical Scaling</th>
                      <th className="p-4 text-left font-bold text-green-300">Horizontal Scaling</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-purple-700">
                      <td className="p-4 font-semibold">Cost</td>
                      <td className="p-4">Expensive at scale</td>
                      <td className="p-4">Linear, cost-effective</td>
                    </tr>
                    <tr className="border-t border-purple-700">
                      <td className="p-4 font-semibold">Complexity</td>
                      <td className="p-4">Low</td>
                      <td className="p-4">High</td>
                    </tr>
                    <tr className="border-t border-purple-700">
                      <td className="p-4 font-semibold">Scalability Limit</td>
                      <td className="p-4">Hardware limits</td>
                      <td className="p-4">Nearly unlimited</td>
                    </tr>
                    <tr className="border-t border-purple-700">
                      <td className="p-4 font-semibold">High Availability</td>
                      <td className="p-4">Requires failover setup</td>
                      <td className="p-4">Built-in redundancy</td>
                    </tr>
                    <tr className="border-t border-purple-700">
                      <td className="p-4 font-semibold">Implementation</td>
                      <td className="p-4">Quick, minimal changes</td>
                      <td className="p-4">Requires architecture changes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-2xl p-8 border-2 border-yellow-700">
              <h2 className="text-3xl font-bold text-white mb-6">Hybrid Approach</h2>
              <p className="text-gray-300 text-lg mb-6">
                Most real-world systems use both strategies together for optimal results.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-yellow-700">
                <h3 className="font-bold text-yellow-400 mb-3">Common Pattern:</h3>
                <ol className="space-y-2 text-gray-300">
                  <li>1. Start with vertical scaling for simplicity</li>
                  <li>2. Scale vertically to reasonable limits (cost-effective range)</li>
                  <li>3. Add horizontal scaling when vertical becomes too expensive</li>
                  <li>4. Continue horizontal scaling as needed</li>
                  <li>5. Use vertical scaling for individual nodes in horizontal setup</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Stateless Architecture</h2>
              <p className="text-gray-300 text-lg mb-4">
                Critical for horizontal scaling. No session state stored on servers themselves.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-3">Key Principles:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Store session data in external cache (Redis, Memcached)</li>
                  <li>• Use JWT tokens for stateless authentication</li>
                  <li>• Any server can handle any request</li>
                  <li>• Servers are interchangeable</li>
                </ul>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                <h4 className="font-bold text-blue-400 mb-2">Benefits:</h4>
                <p className="text-gray-300 text-sm">Easy to add/remove servers, auto-scaling works smoothly, load balancer can route to any server</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Database Scaling Strategies</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">Read Replicas</h3>
                  <p className="text-gray-300">Horizontally scale reads by adding replica databases. Write to primary, read from replicas.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">Sharding</h3>
                  <p className="text-gray-300">Horizontally partition data across multiple databases. Each shard handles subset of data.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">Caching Layer</h3>
                  <p className="text-gray-300">Add Redis/Memcached to reduce database load. Cache frequently accessed data.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Auto-Scaling</h2>
              <p className="text-gray-300 text-lg mb-4">
                Automatically add or remove servers based on metrics like CPU, memory, request rate.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Scale-Out Triggers</h3>
                  <p className="text-gray-300 text-sm">CPU {'>'} 70% for 5 minutes → Add 2 servers</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Scale-In Triggers</h3>
                  <p className="text-gray-300 text-sm">CPU {'<'} 30% for 15 minutes → Remove servers (keep minimum)</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Scheduled Scaling</h3>
                  <p className="text-gray-300 text-sm">Scale up before known traffic peaks (Black Friday, product launches)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Microservices Scaling</h2>
              <p className="text-gray-300 text-lg mb-4">
                Scale individual services independently based on their specific needs.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                <h3 className="font-bold text-orange-400 mb-3">Example:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Auth Service: 3 instances (low traffic)</li>
                  <li>• Product Catalog: 10 instances (high read traffic)</li>
                  <li>• Payment Service: 5 instances (moderate, critical)</li>
                  <li>• Image Processing: Auto-scale 5-50 instances (variable load)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Scaling Journeys</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Instagram</h3>
                  <p className="text-gray-300 mb-2">Started on single server, now thousands of servers handling 2B+ users</p>
                  <p className="text-sm text-gray-400">Strategy: Horizontal scaling with sharded PostgreSQL, extensive caching, CDN</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Netflix</h3>
                  <p className="text-gray-300 mb-2">Massive horizontal scaling on AWS with microservices architecture</p>
                  <p className="text-sm text-gray-400">Strategy: Thousands of EC2 instances, auto-scaling, multi-region deployment</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Stack Overflow</h3>
                  <p className="text-gray-300 mb-2">Vertical scaling success story - powerful servers instead of many small ones</p>
                  <p className="text-sm text-gray-400">Strategy: High-end servers with SSD, aggressive caching, efficient code</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Component-Specific Scaling</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">Web Servers</h3>
                  <p className="text-gray-300 text-sm">Horizontal: Add more instances behind load balancer. Stateless design.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">Databases</h3>
                  <p className="text-gray-300 text-sm">Vertical + Horizontal: Bigger instances for primary, read replicas for reads, sharding for writes.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">Caches</h3>
                  <p className="text-gray-300 text-sm">Horizontal: Add more cache nodes. Use consistent hashing for distribution.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">Message Queues</h3>
                  <p className="text-gray-300 text-sm">Horizontal: Add more workers to process messages. Add more queue partitions.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function ConsistencyPatterns({ onBack }) {
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
              🔄 Consistency Patterns
            </h1>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg text-xs font-bold uppercase tracking-wide">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-6 font-light">
            Understand different consistency models and their trade-offs in distributed systems
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-lg text-sm font-medium border border-cyan-100">Strong Consistency</span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">Eventual Consistency</span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">Causal Consistency</span>
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">Read-Your-Writes</span>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-0">
          {['overview', 'models', 'patterns', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-cyan-600 bg-cyan-50 border-b-2 border-cyan-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'models' && 'Consistency Models'}
              {tab === 'patterns' && 'Implementation Patterns'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What are Consistency Patterns?</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Consistency patterns define how and when data becomes consistent across distributed systems. They represent
                different trade-offs between consistency guarantees, performance, and availability.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Choosing the right consistency model depends on your application's requirements. Financial systems need strong
                consistency, while social media can tolerate eventual consistency for better availability and performance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">The Consistency Spectrum</h2>
              <div className="space-y-3">
                <div className="bg-red-500/30 border-l-4 border-red-500 rounded-lg p-4 text-white">
                  <div className="font-bold text-lg mb-1">Strong Consistency (Linearizability)</div>
                  <div className="text-sm text-gray-300">Highest consistency, highest latency, lowest availability</div>
                </div>
                <div className="bg-orange-500/30 border-l-4 border-orange-500 rounded-lg p-4 text-white">
                  <div className="font-bold text-lg mb-1">Sequential Consistency</div>
                  <div className="text-sm text-gray-300">Operations appear in some sequential order</div>
                </div>
                <div className="bg-yellow-500/30 border-l-4 border-yellow-500 rounded-lg p-4 text-white">
                  <div className="font-bold text-lg mb-1">Causal Consistency</div>
                  <div className="text-sm text-gray-300">Causally related operations are ordered</div>
                </div>
                <div className="bg-blue-500/30 border-l-4 border-blue-500 rounded-lg p-4 text-white">
                  <div className="font-bold text-lg mb-1">Session Consistency</div>
                  <div className="text-sm text-gray-300">Guarantees within a session</div>
                </div>
                <div className="bg-green-500/30 border-l-4 border-green-500 rounded-lg p-4 text-white">
                  <div className="font-bold text-lg mb-1">Eventual Consistency</div>
                  <div className="text-sm text-gray-300">Lowest consistency, lowest latency, highest availability</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Consistency Matters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">💰 Financial Correctness</h3>
                  <p className="text-gray-700">Bank account balances must be accurate. Can't have two users withdrawing the same money.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">🎫 Inventory Management</h3>
                  <p className="text-gray-700">Can't oversell products. Last item must only be sold once, not to multiple customers.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">👤 User Experience</h3>
                  <p className="text-gray-700">Users expect to see their own updates immediately after making changes.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">🔒 Security</h3>
                  <p className="text-gray-700">Permission changes must be immediately effective to prevent unauthorized access.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border-2 border-red-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🔒 Strong Consistency (Linearizability)</h2>
              <p className="text-gray-700 text-lg mb-4">All clients see the same data at the same time, as if there's only one copy.</p>
              <div className="bg-white p-6 rounded-xl border border-red-100 mb-4">
                <h3 className="font-bold text-red-700 mb-3">Guarantees:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Once a write completes, all subsequent reads see that value</li>
                  <li>• Operations appear to be instantaneous</li>
                  <li>• Total ordering of all operations</li>
                  <li>• Acts like a single-server system</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-red-100">
                  <h4 className="font-bold text-red-700 mb-2">✅ Pros:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Easiest to reason about</li>
                    <li>• No stale data</li>
                    <li>• Matches developer expectations</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-red-100">
                  <h4 className="font-bold text-gray-600 mb-2">❌ Cons:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Highest latency</li>
                    <li>• Lower availability</li>
                    <li>• Requires coordination</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">⏰ Eventual Consistency</h2>
              <p className="text-gray-700 text-lg mb-4">Given enough time without updates, all replicas will converge to the same value.</p>
              <div className="bg-white p-6 rounded-xl border border-green-100 mb-4">
                <h3 className="font-bold text-green-700 mb-3">Guarantees:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Updates will propagate to all replicas eventually</li>
                  <li>• No guarantee when convergence happens</li>
                  <li>• Different replicas may return different values temporarily</li>
                  <li>• Conflict resolution needed for concurrent updates</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-700 mb-2">✅ Pros:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• High availability</li>
                    <li>• Low latency</li>
                    <li>• Good for geo-distribution</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h4 className="font-bold text-gray-600 mb-2">❌ Cons:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• May read stale data</li>
                    <li>• Complex conflict resolution</li>
                    <li>• Harder to reason about</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🔗 Causal Consistency</h2>
              <p className="text-gray-700 text-lg mb-4">Operations that are causally related are seen in the same order by all processes.</p>
              <div className="bg-white p-6 rounded-xl border border-blue-100 mb-4">
                <h3 className="font-bold text-blue-700 mb-3">How it works:</h3>
                <p className="text-gray-700 mb-4">
                  If operation A causes operation B, all processes see A before B. Concurrent operations can be seen in different orders.
                </p>
                <h3 className="font-bold text-blue-700 mb-3">Example:</h3>
                <div className="bg-blue-50 p-4 rounded-lg text-gray-700">
                  Alice posts: "Look at this photo!" (A)<br/>
                  Alice uploads photo (B) - caused by A<br/>
                  Everyone sees A before B, never B before A
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-700 mb-2">Use Cases:</h4>
                <p className="text-gray-700 text-sm">Social media, comment threads, collaborative editing</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">👤 Session Consistency Guarantees</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">Read-Your-Writes</h3>
                  <p className="text-gray-700">A user always sees their own updates immediately</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">Monotonic Reads</h3>
                  <p className="text-gray-700">If you read a value, subsequent reads never return older values</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">Monotonic Writes</h3>
                  <p className="text-gray-700">Writes by the same process are applied in order</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">Writes-Follow-Reads</h3>
                  <p className="text-gray-700">Writes are ordered after reads that triggered them</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Quorum-Based Consistency</h2>
              <p className="text-gray-700 text-lg mb-4">Use voting to ensure consistency across replicas.</p>
              <div className="bg-white p-6 rounded-xl border border-blue-100 mb-4">
                <h3 className="font-bold text-blue-700 mb-3">Formula:</h3>
                <div className="bg-blue-50 p-4 rounded-lg text-gray-700 mb-4 font-mono">
                  R + W {'>'} N<br/>
                  R = Read quorum, W = Write quorum, N = Total replicas
                </div>
                <h3 className="font-bold text-blue-700 mb-3">Examples:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• N=3, R=2, W=2: Balance read/write performance</li>
                  <li>• N=3, R=1, W=3: Fast reads, slower writes</li>
                  <li>• N=3, R=3, W=1: Fast writes, slower reads</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Vector Clocks</h2>
              <p className="text-gray-700 text-lg mb-4">Track causality in distributed systems to detect conflicts.</p>
              <div className="bg-white p-6 rounded-xl border border-green-100 mb-4">
                <h3 className="font-bold text-green-700 mb-3">How it works:</h3>
                <p className="text-gray-700 mb-4">
                  Each node maintains a vector of logical clocks. When comparing two versions, you can determine
                  if one causally precedes the other or if they're concurrent.
                </p>
                <h3 className="font-bold text-green-700 mb-3">Example:</h3>
                <div className="bg-green-50 p-4 rounded-lg text-gray-700">
                  Version A: {'{A:1, B:0, C:0}'}<br/>
                  Version B: {'{A:1, B:1, C:0}'}<br/>
                  B happened after A (causal)<br/><br/>
                  Version C: {'{A:2, B:0, C:0}'}<br/>
                  Version D: {'{A:1, B:1, C:0}'}<br/>
                  C and D are concurrent (conflict!)
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Conflict Resolution Strategies</h2>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">Last-Write-Wins (LWW)</h3>
                  <p className="text-gray-700 text-sm">Use timestamp to pick the latest value. Simple but can lose data.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">Application-Level Resolution</h3>
                  <p className="text-gray-700 text-sm">Return all conflicting versions to the application to resolve.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">CRDTs (Conflict-Free Replicated Data Types)</h3>
                  <p className="text-gray-700 text-sm">Data structures designed to automatically merge concurrent updates.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">Custom Merge Functions</h3>
                  <p className="text-gray-700 text-sm">Domain-specific logic (e.g., shopping cart merges all items).</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Read Repair</h2>
              <p className="text-gray-700 text-lg mb-4">Fix inconsistencies during read operations.</p>
              <div className="bg-white p-6 rounded-xl border border-orange-100">
                <h3 className="font-bold text-orange-700 mb-3">Process:</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Read from multiple replicas</li>
                  <li>2. Compare returned values</li>
                  <li>3. If inconsistent, determine correct value</li>
                  <li>4. Update stale replicas in background</li>
                  <li>5. Return correct value to client</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Database Consistency Models</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">DynamoDB</h3>
                  <p className="text-gray-700 mb-2">Eventual consistency by default, strong consistency optional per read</p>
                  <span className="text-sm text-gray-500">Trade-off: Choose consistency level per operation</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">Cassandra</h3>
                  <p className="text-gray-700 mb-2">Tunable consistency with quorum reads/writes (ONE, QUORUM, ALL)</p>
                  <span className="text-sm text-gray-500">Flexibility: Tune R and W per query</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">MongoDB</h3>
                  <p className="text-gray-700 mb-2">Strong consistency with majority write concern and read concern</p>
                  <span className="text-sm text-gray-500">Configurable: Balance consistency and performance</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">Cosmos DB</h3>
                  <p className="text-gray-700 mb-2">Five consistency levels: Strong, Bounded Staleness, Session, Consistent Prefix, Eventual</p>
                  <span className="text-sm text-gray-500">Spectrum: Choose exact trade-off you need</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Scenarios</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">💬 Social Media Timeline</h3>
                  <p className="text-gray-700 mb-2"><strong>Model:</strong> Eventual Consistency</p>
                  <p className="text-sm text-gray-600">It's okay if different users see posts in slightly different orders. High availability is critical.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">💳 Payment Processing</h3>
                  <p className="text-gray-700 mb-2"><strong>Model:</strong> Strong Consistency</p>
                  <p className="text-sm text-gray-600">Account balances must be exact. Double-charging or balance errors are unacceptable.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">🛒 Shopping Cart</h3>
                  <p className="text-gray-700 mb-2"><strong>Model:</strong> Read-Your-Writes + Eventual Consistency</p>
                  <p className="text-sm text-gray-600">Users must see their cart changes immediately. Different carts can merge with CRDTs.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">📝 Collaborative Document</h3>
                  <p className="text-gray-700 mb-2"><strong>Model:</strong> Causal Consistency + CRDTs</p>
                  <p className="text-sm text-gray-600">Edits must respect causality. Concurrent edits merge automatically.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

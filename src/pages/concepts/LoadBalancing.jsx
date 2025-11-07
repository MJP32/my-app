import React, { useState } from 'react';

export default function LoadBalancing({ onBack }) {
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
              ⚖️ Load Balancing
            </h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-wide">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-6 font-light">
            Distribute traffic across multiple servers to improve reliability, scalability, and performance
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">Round Robin</span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">Least Connections</span>
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">IP Hash</span>
            <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100">Health Checks</span>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-0">
          {['overview', 'algorithms', 'implementation', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'algorithms' && 'Algorithms'}
              {tab === 'implementation' && 'Implementation'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Load Balancing?</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Load balancing is the process of distributing network traffic across multiple servers to ensure no single server becomes overwhelmed.
                It acts as a "traffic cop" sitting in front of your servers, routing client requests efficiently across all servers capable of fulfilling those requests.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Load balancers increase availability and reliability by redirecting requests to healthy servers when one fails,
                and improve performance by preventing any single server from being overworked.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">⚡ Performance</h3>
                  <p className="text-gray-700">Distribute workload evenly, preventing server overload and reducing response times</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">🎯 High Availability</h3>
                  <p className="text-gray-700">Automatic failover to healthy servers ensures continuous service even during server failures</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">📈 Scalability</h3>
                  <p className="text-gray-700">Easily add or remove servers based on traffic demands without downtime</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">🛡️ Security</h3>
                  <p className="text-gray-700">Hide internal server IPs and provide DDoS protection through traffic distribution</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Layer 4 vs Layer 7 Load Balancing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Layer 4 (Transport Layer)</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>Routes based on IP address and TCP/UDP port</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>Faster, less resource-intensive</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>Cannot make routing decisions based on content</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>Example: AWS Network Load Balancer</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Layer 7 (Application Layer)</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>Routes based on content (URL, headers, cookies)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>More intelligent routing decisions</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>Can terminate SSL/TLS connections</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>Example: AWS Application Load Balancer, Nginx</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'algorithms' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🔄 Round Robin</h2>
              <p className="text-gray-700 text-lg mb-4">Distributes requests sequentially across all servers in the pool.</p>
              <div className="bg-white p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-700 mb-2">How it works:</h3>
                <p className="text-gray-700 mb-4">Request 1 → Server A, Request 2 → Server B, Request 3 → Server C, Request 4 → Server A...</p>
                <h3 className="font-bold text-blue-700 mb-2">Best for:</h3>
                <p className="text-gray-700 mb-4">Servers with similar processing power and requests with similar complexity</p>
                <h3 className="font-bold text-blue-700 mb-2">Limitation:</h3>
                <p className="text-gray-700">Doesn't account for server load or response time differences</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 Least Connections</h2>
              <p className="text-gray-700 text-lg mb-4">Routes to the server with the fewest active connections.</p>
              <div className="bg-white p-6 rounded-xl border border-green-100">
                <h3 className="font-bold text-green-700 mb-2">How it works:</h3>
                <p className="text-gray-700 mb-4">Maintains connection count for each server and sends new requests to the least busy one</p>
                <h3 className="font-bold text-green-700 mb-2">Best for:</h3>
                <p className="text-gray-700 mb-4">Requests with varying response times and long-lived connections</p>
                <h3 className="font-bold text-green-700 mb-2">Advantage:</h3>
                <p className="text-gray-700">Better distribution when requests have different processing times</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🔑 IP Hash</h2>
              <p className="text-gray-700 text-lg mb-4">Routes requests from the same client IP to the same server.</p>
              <div className="bg-white p-6 rounded-xl border border-purple-100">
                <h3 className="font-bold text-purple-700 mb-2">How it works:</h3>
                <p className="text-gray-700 mb-4">Hash the client's IP address to determine which server to route to</p>
                <h3 className="font-bold text-purple-700 mb-2">Best for:</h3>
                <p className="text-gray-700 mb-4">Session persistence, caching benefits from hitting same server</p>
                <h3 className="font-bold text-purple-700 mb-2">Use case:</h3>
                <p className="text-gray-700">Applications that need sticky sessions without application-level session management</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">⚙️ Weighted Round Robin</h2>
              <p className="text-gray-700 text-lg mb-4">Assigns weights to servers based on their capacity.</p>
              <div className="bg-white p-6 rounded-xl border border-orange-100">
                <h3 className="font-bold text-orange-700 mb-2">How it works:</h3>
                <p className="text-gray-700 mb-4">Servers with higher weights receive more requests proportionally</p>
                <h3 className="font-bold text-orange-700 mb-2">Example:</h3>
                <p className="text-gray-700 mb-4">Server A (weight=3), Server B (weight=1) → A gets 75% of traffic, B gets 25%</p>
                <h3 className="font-bold text-orange-700 mb-2">Best for:</h3>
                <p className="text-gray-700">Servers with different hardware capabilities</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'implementation' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Health Checks</h2>
              <p className="text-gray-700 text-lg mb-6">
                Load balancers continuously monitor server health to ensure traffic only goes to healthy servers.
              </p>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-4">
                <h3 className="font-bold text-gray-900 mb-3">Types of Health Checks:</h3>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-500 font-bold">•</span>
                    <span><strong>Passive:</strong> Monitor existing traffic for errors (5xx responses)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-500 font-bold">•</span>
                    <span><strong>Active:</strong> Periodic requests to health endpoint (e.g., /health, /ping)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-500 font-bold">•</span>
                    <span><strong>Deep Health Checks:</strong> Verify database connections, dependencies</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm">
                <div className="text-green-400 mb-2"># Nginx health check configuration</div>
                <div>upstream backend {'{'}</div>
                <div className="ml-4">server backend1.example.com;</div>
                <div className="ml-4">server backend2.example.com;</div>
                <div className="ml-4">server backend3.example.com;</div>
                <div>{'}'}</div>
                <div className="mt-4">server {'{'}</div>
                <div className="ml-4">location / {'{'}</div>
                <div className="ml-8">proxy_pass http://backend;</div>
                <div className="ml-8">proxy_next_upstream error timeout http_500;</div>
                <div className="ml-8">health_check interval=5s fails=3 passes=2;</div>
                <div className="ml-4">{'}'}</div>
                <div>{'}'}</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Session Persistence</h2>
              <p className="text-gray-700 text-lg mb-6">
                Ensure requests from the same user go to the same server (sticky sessions).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">Cookie-based</h3>
                  <p className="text-gray-700">Load balancer sets a cookie identifying the server</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">IP-based</h3>
                  <p className="text-gray-700">Use client IP hash to consistently route to same server</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Load Balancers</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">Nginx</h3>
                  <p className="text-gray-700 mb-2">Open-source web server and reverse proxy with load balancing capabilities</p>
                  <span className="text-sm text-gray-500">Layer 7, HTTP/HTTPS, TCP/UDP</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">HAProxy</h3>
                  <p className="text-gray-700 mb-2">High-performance load balancer for TCP and HTTP applications</p>
                  <span className="text-sm text-gray-500">Layer 4 & 7, Widely used in production</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">AWS Elastic Load Balancer</h3>
                  <p className="text-gray-700 mb-2">Managed load balancing service with ALB, NLB, and GLB options</p>
                  <span className="text-sm text-gray-500">Application, Network, and Gateway Load Balancers</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">Google Cloud Load Balancing</h3>
                  <p className="text-gray-700 mb-2">Fully distributed, software-defined managed service</p>
                  <span className="text-sm text-gray-500">Global and regional load balancing</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">🌐 Web Applications</h3>
                  <p className="text-gray-700">Distribute HTTP/HTTPS traffic across multiple web servers for high availability and scalability</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">🎮 Gaming Servers</h3>
                  <p className="text-gray-700">Balance player connections across game servers based on geographic location and server load</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">📱 API Gateways</h3>
                  <p className="text-gray-700">Route API requests to backend microservices with rate limiting and authentication</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">💾 Database Read Replicas</h3>
                  <p className="text-gray-700">Distribute read queries across multiple database replicas to reduce load on primary</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function Proxies({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-indigo-700 hover:border-indigo-600 text-indigo-300 hover:text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🚪 Proxies & Reverse Proxies
            </h1>
            <span className="px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-indigo-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Understand forward proxies and reverse proxies for security, performance, and load distribution
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-indigo-900/30 text-indigo-300 rounded-lg text-sm font-medium border border-indigo-700">Forward Proxy</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">Reverse Proxy</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">Load Balancing</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Caching</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'types', 'use-cases', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-indigo-400 bg-indigo-900/30 border-b-2 border-indigo-600 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'types' && 'Proxy Types'}
              {tab === 'use-cases' && 'Use Cases'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl p-8 border-2 border-indigo-700">
              <h2 className="text-3xl font-bold text-white mb-6">What is a Proxy?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                A proxy is an intermediary server that sits between clients and servers. It acts as a gateway,
                forwarding requests and responses while potentially adding functionality like caching, security, or load balancing.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Proxies can work in two directions: forward proxies protect clients, and reverse proxies protect servers.
                Understanding both is crucial for system design.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Forward vs Reverse Proxy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-500/20 border-2 border-blue-500/40 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">→ Forward Proxy</h3>
                  <p className="text-gray-200 mb-3">Client-side proxy protecting users</p>
                  <div className="bg-blue-500/30 p-3 rounded-lg text-gray-200 text-sm mb-3">
                    Client → Forward Proxy → Internet → Server
                  </div>
                  <p className="text-gray-300 text-sm">Server sees proxy IP, not client IP</p>
                </div>
                <div className="bg-purple-500/20 border-2 border-purple-500/40 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">← Reverse Proxy</h3>
                  <p className="text-gray-200 mb-3">Server-side proxy protecting backend</p>
                  <div className="bg-purple-500/30 p-3 rounded-lg text-gray-200 text-sm mb-3">
                    Client → Internet → Reverse Proxy → Server
                  </div>
                  <p className="text-gray-300 text-sm">Client sees proxy IP, not server IP</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Benefits of Using Proxies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700 shadow-sm">
                  <h3 className="text-lg font-bold text-green-400 mb-3">🔒 Security</h3>
                  <p className="text-gray-300">Hide origin server IPs, filter malicious traffic, implement WAF rules</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700 shadow-sm">
                  <h3 className="text-lg font-bold text-green-400 mb-3">⚡ Performance</h3>
                  <p className="text-gray-300">Cache responses, compress content, terminate SSL/TLS connections</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700 shadow-sm">
                  <h3 className="text-lg font-bold text-green-400 mb-3">⚖️ Load Balancing</h3>
                  <p className="text-gray-300">Distribute traffic across multiple backend servers</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700 shadow-sm">
                  <h3 className="text-lg font-bold text-green-400 mb-3">🌍 Access Control</h3>
                  <p className="text-gray-300">Filter requests, enforce policies, log all traffic</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Forward Proxy</h2>
              <p className="text-gray-300 text-lg mb-4">Sits between client and internet, forwarding client requests.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-3">Common Uses:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Anonymous browsing:</strong> Hide client IP address from destination servers</li>
                  <li>• <strong>Content filtering:</strong> Block access to certain websites (corporate/school networks)</li>
                  <li>• <strong>Caching:</strong> Cache frequently accessed content to reduce bandwidth</li>
                  <li>• <strong>Bypass restrictions:</strong> Access geo-blocked content (VPNs act as proxies)</li>
                </ul>
              </div>
              <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-700">
                <h3 className="font-bold text-blue-400 mb-3">Examples:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Corporate proxy servers (Squid, Blue Coat)</li>
                  <li>• VPN services (NordVPN, ExpressVPN)</li>
                  <li>• Browser extensions (proxy switchers)</li>
                  <li>• SOCKS5 proxies for applications</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Reverse Proxy</h2>
              <p className="text-gray-300 text-lg mb-4">Sits in front of backend servers, forwarding client requests to appropriate server.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700 mb-4">
                <h3 className="font-bold text-purple-400 mb-3">Common Uses:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Load balancing:</strong> Distribute traffic across multiple backend servers</li>
                  <li>• <strong>SSL termination:</strong> Handle SSL/TLS encryption, reducing backend load</li>
                  <li>• <strong>Caching:</strong> Cache static content, reduce backend server load</li>
                  <li>• <strong>Security:</strong> Hide backend topology, DDoS protection, WAF</li>
                  <li>• <strong>Compression:</strong> Compress responses before sending to clients</li>
                  <li>• <strong>Request routing:</strong> Route to different services based on URL path</li>
                </ul>
              </div>
              <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700">
                <h3 className="font-bold text-purple-400 mb-3">Examples:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Nginx (most popular reverse proxy)</li>
                  <li>• HAProxy (high-performance load balancer)</li>
                  <li>• Apache with mod_proxy</li>
                  <li>• Cloudflare (global reverse proxy/CDN)</li>
                  <li>• AWS ALB/NLB</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">API Gateway</h2>
              <p className="text-gray-300 text-lg mb-4">Specialized reverse proxy for API management.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700 mb-4">
                <h3 className="font-bold text-green-400 mb-3">Additional Features:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Authentication and authorization</li>
                  <li>• Rate limiting and throttling</li>
                  <li>• Request/response transformation</li>
                  <li>• API versioning</li>
                  <li>• Analytics and monitoring</li>
                  <li>• Protocol translation (REST to gRPC)</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h4 className="font-bold text-green-400 mb-2">Cloud Solutions:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• AWS API Gateway</li>
                    <li>• Azure API Management</li>
                    <li>• Google Cloud Endpoints</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h4 className="font-bold text-green-400 mb-2">Self-Hosted:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Kong Gateway</li>
                    <li>• Tyk</li>
                    <li>• Apigee (Google)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Transparent vs Non-Transparent Proxy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">Transparent Proxy</h3>
                  <p className="text-gray-300 mb-3">Client unaware of proxy existence. Network-level interception.</p>
                  <p className="text-sm text-gray-400">Use: Corporate networks, ISP-level filtering</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">Non-Transparent Proxy</h3>
                  <p className="text-gray-300 mb-3">Client explicitly configured to use proxy.</p>
                  <p className="text-sm text-gray-400">Use: VPNs, manual browser proxy settings</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'use-cases' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">SSL/TLS Termination</h2>
              <p className="text-gray-300 text-lg mb-4">
                Reverse proxy handles SSL/TLS encryption/decryption, reducing load on backend servers.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-3">Benefits:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Centralize SSL certificate management</li>
                  <li>• Offload CPU-intensive encryption from application servers</li>
                  <li>• Enable HTTP/2 at edge while using HTTP/1.1 internally</li>
                  <li>• Simplify certificate renewal and rotation</li>
                </ul>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg font-mono text-sm border border-blue-700">
                <div className="text-blue-400 mb-2"># Nginx SSL termination</div>
                <div className="text-gray-300">
                  Client (HTTPS) → Nginx (terminates SSL) → Backend (HTTP)
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Microservices Routing</h2>
              <p className="text-gray-300 text-lg mb-4">
                Route requests to different microservices based on URL path, headers, or other criteria.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                <h3 className="font-bold text-green-400 mb-3">Routing Example:</h3>
                <div className="bg-green-900/30 p-4 rounded-lg font-mono text-sm space-y-1 text-gray-300 border border-green-700">
                  <div>example.com/api/users → User Service</div>
                  <div>example.com/api/products → Product Service</div>
                  <div>example.com/api/orders → Order Service</div>
                  <div>example.com/static/* → CDN/Static Server</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Caching</h2>
              <p className="text-gray-300 text-lg mb-4">
                Cache responses at proxy layer to reduce backend load and improve response times.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-3">Static Content Caching</h3>
                  <p className="text-gray-300 mb-2">Cache images, CSS, JavaScript for long periods (1 year)</p>
                  <code className="text-xs bg-purple-900/30 px-2 py-1 rounded text-purple-300 border border-purple-700">Cache-Control: public, max-age=31536000</code>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-3">API Response Caching</h3>
                  <p className="text-gray-300 mb-2">Cache API responses for short periods (minutes)</p>
                  <code className="text-xs bg-purple-900/30 px-2 py-1 rounded text-purple-300 border border-purple-700">Cache-Control: public, max-age=300</code>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Security Features</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">DDoS Protection</h3>
                  <p className="text-gray-300 text-sm">Absorb and filter malicious traffic before it reaches backend</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Web Application Firewall (WAF)</h3>
                  <p className="text-gray-300 text-sm">Filter requests based on rules (SQL injection, XSS prevention)</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">IP Allowlist/Blocklist</h3>
                  <p className="text-gray-300 text-sm">Allow/deny traffic from specific IP addresses or ranges</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Rate Limiting</h3>
                  <p className="text-gray-300 text-sm">Limit requests per IP/user to prevent abuse</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Popular Proxy Solutions</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Nginx</h3>
                  <p className="text-gray-300 mb-2">Most popular reverse proxy and web server. High performance, low memory.</p>
                  <span className="text-sm text-gray-400">Use for: Reverse proxy, load balancing, caching, SSL termination</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">HAProxy</h3>
                  <p className="text-gray-300 mb-2">High-performance TCP/HTTP load balancer. Industry standard for reliability.</p>
                  <span className="text-sm text-gray-400">Use for: Load balancing, high availability, Layer 4/7 proxying</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Envoy</h3>
                  <p className="text-gray-300 mb-2">Modern proxy designed for cloud-native applications and service meshes.</p>
                  <span className="text-sm text-gray-400">Use for: Microservices, service mesh (Istio), API gateway</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Squid</h3>
                  <p className="text-gray-300 mb-2">Caching forward proxy for web content. Reduces bandwidth and improves response times.</p>
                  <span className="text-sm text-gray-400">Use for: Forward proxy, content caching, bandwidth optimization</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Architectures</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🌐 Web Application</h3>
                  <p className="text-gray-300 mb-2">
                    Cloudflare (CDN + DDoS) → AWS ALB (load balancer) → Nginx (reverse proxy) → App Servers
                  </p>
                  <p className="text-sm text-gray-400">Multi-layer proxy for security, performance, and routing</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🏢 Corporate Network</h3>
                  <p className="text-gray-300 mb-2">
                    Employees → Forward Proxy (Squid) → Internet. Caching, filtering, monitoring.
                  </p>
                  <p className="text-sm text-gray-400">Content filtering, bandwidth optimization, access logging</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🔧 Microservices</h3>
                  <p className="text-gray-300 mb-2">
                    Client → API Gateway (Kong) → Service Mesh (Envoy sidecars) → Microservices
                  </p>
                  <p className="text-sm text-gray-400">Authentication, routing, observability, service-to-service communication</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

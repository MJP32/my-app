import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function ServiceMesh({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-teal-700 hover:border-teal-600 text-teal-300 hover:text-teal-200 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🕸️ Service Mesh
            </h1>
            <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-teal-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            A dedicated infrastructure layer that manages service-to-service communication in microservices
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-teal-900/30 text-teal-300 rounded-lg text-sm font-medium border border-teal-700">Sidecar Proxy</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">mTLS</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Traffic Management</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">Observability</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'sidecar', 'features', 'istio-envoy'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-teal-400 bg-teal-900/30 border-b-2 border-teal-400 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'sidecar' && 'Sidecar Pattern'}
              {tab === 'features' && 'Features'}
              {tab === 'istio-envoy' && 'Istio & Envoy'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-teal-700">
              <h2 className="text-3xl font-bold text-white mb-6">What is a Service Mesh?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                A service mesh is a dedicated infrastructure layer for handling service-to-service communication within a
                microservices architecture. Instead of baking networking logic into each service, the mesh moves concerns
                like routing, retries, encryption, and telemetry into a transparent layer that sits between your services.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                As the number of services grows, the network of calls between them becomes complex and hard to secure or
                observe. A service mesh provides a consistent, language-agnostic way to manage this communication without
                modifying application code.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">The Problem It Solves</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">🔍 Observability</h3>
                  <p className="text-gray-300">Uniform metrics, distributed tracing, and access logs for every call without instrumenting each service</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">🔒 Security</h3>
                  <p className="text-gray-300">Automatic mutual TLS, identity, and authorization policies between services with zero app changes</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">🚦 Traffic Management</h3>
                  <p className="text-gray-300">Canary releases, retries, timeouts, and circuit breaking controlled centrally via configuration</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Data Plane vs Control Plane</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-3">Data Plane</h3>
                  <p className="text-gray-300 mb-2">
                    The set of sidecar proxies deployed alongside each service. They intercept and handle every network
                    packet flowing in and out, applying routing, encryption, load balancing, and telemetry collection.
                  </p>
                  <span className="text-sm text-gray-400">Does the actual work on the request path</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-3">Control Plane</h3>
                  <p className="text-gray-300 mb-2">
                    The management layer that configures the proxies. It distributes routing rules, security policies, and
                    service discovery information to every sidecar, but does not sit on the request path itself.
                  </p>
                  <span className="text-sm text-gray-400">Configures and coordinates the data plane</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sidecar' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-teal-700">
              <h2 className="text-3xl font-bold text-white mb-6">The Sidecar Proxy Pattern</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                The sidecar pattern deploys a lightweight proxy in the same pod or host as each service instance. Because it
                shares the network namespace with the application, it can transparently intercept all inbound and outbound
                traffic. The application sends requests as if talking directly to other services, while the sidecar quietly
                handles the heavy lifting.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Every service instance gets its own dedicated proxy. Together, all the sidecars form the data plane of the mesh.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">How It Works</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                <ol className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">1.</span>
                    <span>An application makes an outbound call to another service by its normal hostname</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">2.</span>
                    <span>Traffic is transparently redirected (often via iptables rules) to the local sidecar proxy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">3.</span>
                    <span>The sidecar applies routing rules, encrypts the connection, and load balances across endpoints</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">4.</span>
                    <span>The receiving service\'s sidecar accepts the connection, terminates TLS, and enforces policy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">5.</span>
                    <span>The request is forwarded to the local application over the loopback interface</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[24px]">6.</span>
                    <span>Both proxies emit metrics, traces, and logs for the entire exchange</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Pros & Cons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-3">✅ Advantages</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Zero application code changes — networking is fully decoupled</li>
                    <li>• Language and framework agnostic across polyglot stacks</li>
                    <li>• Consistent security and observability everywhere</li>
                    <li>• Operational logic can be updated independently of services</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-red-400 text-xl mb-3">⚠️ Trade-offs</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Added latency from extra network hops through proxies</li>
                    <li>• Resource cost — CPU and memory for one proxy per instance</li>
                    <li>• Increased operational complexity to run the mesh itself</li>
                    <li>• Steeper learning curve and harder debugging surface</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Security: mTLS & TLS Termination</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Mutual TLS (mTLS)</h3>
                  <p className="text-gray-300">
                    Both the client and server sidecars present certificates and verify each other\'s identity, encrypting
                    all service-to-service traffic and preventing impersonation. The control plane issues and rotates the
                    certificates automatically.
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">TLS Termination</h3>
                  <p className="text-gray-300">
                    Sidecars terminate TLS at the edge of each service, so applications can communicate in plaintext locally
                    while all on-the-wire traffic between hosts remains encrypted.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Traffic Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🐤 Canary & Blue-Green</h3>
                  <p className="text-gray-300 text-sm">Shift a percentage of traffic to a new version, or switch fleets instantly with weighted routing</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🔁 Retries & Timeouts</h3>
                  <p className="text-gray-300 text-sm">Automatically retry transient failures and bound request latency with per-route timeouts</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">⚡ Circuit Breaking</h3>
                  <p className="text-gray-300 text-sm">Eject unhealthy endpoints and shed load to prevent cascading failures across services</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">⚖️ Load Balancing</h3>
                  <p className="text-gray-300 text-sm">Round-robin, least-request, and locality-aware balancing across healthy instances</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Observability & Policy</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">📊 Metrics</h3>
                  <p className="text-gray-300 text-sm">Golden signals — request rate, error rate, and latency — exported for every service automatically</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">🔗 Distributed Tracing</h3>
                  <p className="text-gray-300 text-sm">Proxies propagate trace headers so requests can be followed end-to-end across many services</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">🛡️ Policy & Authorization</h3>
                  <p className="text-gray-300 text-sm">Fine-grained authz rules decide which services may call which, based on verified identity</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'istio-envoy' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-teal-700">
              <h2 className="text-3xl font-bold text-white mb-6">Istio + Envoy</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Istio is the most widely adopted service mesh. It pairs a powerful control plane with Envoy, a
                high-performance proxy, to deliver traffic management, security, and observability across a Kubernetes cluster.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">How They Fit Together</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-3">🧠 Istio — Control Plane (istiod)</h3>
                  <p className="text-gray-300 mb-2">
                    <code className="text-sm bg-blue-900/30 px-2 py-1 rounded text-blue-300">istiod</code> is the unified control plane.
                    It handles service discovery, translates high-level routing and policy configuration into Envoy config,
                    and acts as a certificate authority that issues and rotates the certificates used for mTLS.
                  </p>
                  <span className="text-sm text-gray-400">Configures every proxy via the xDS APIs</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-3">🚀 Envoy — Data Plane</h3>
                  <p className="text-gray-300 mb-2">
                    Envoy is a high-performance proxy written in C++. It is deployed as the sidecar next to each service and
                    does the real work — routing, load balancing, mTLS, retries, and telemetry — based on configuration
                    streamed from istiod.
                  </p>
                  <span className="text-sm text-gray-400">One Envoy per service instance</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Request Lifecycle in Istio</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                <ol className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="font-bold text-purple-400 min-w-[24px]">1.</span>
                    <span>An operator applies a VirtualService or DestinationRule resource to the cluster</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-purple-400 min-w-[24px]">2.</span>
                    <span>istiod converts it into Envoy configuration and pushes it to every relevant sidecar over xDS</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-purple-400 min-w-[24px]">3.</span>
                    <span>The Envoy sidecars enforce the new routing, security, and resilience rules on live traffic</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-purple-400 min-w-[24px]">4.</span>
                    <span>Telemetry flows back out to monitoring and tracing backends for observability</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Alternatives</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Linkerd</h3>
                  <p className="text-gray-300 mb-2">
                    A lightweight, CNCF-graduated service mesh focused on simplicity and low overhead. It uses its own
                    purpose-built micro-proxy written in Rust instead of Envoy.
                  </p>
                  <span className="text-sm text-gray-400">Best for: minimal footprint, ease of operation</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Consul Connect & Cilium</h3>
                  <p className="text-gray-300 mb-2">
                    HashiCorp Consul provides a mesh with strong multi-platform service discovery, while Cilium offers an
                    eBPF-based approach that can reduce or eliminate per-pod sidecars.
                  </p>
                  <span className="text-sm text-gray-400">Best for: hybrid environments and sidecar-less designs</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

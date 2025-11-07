import React, { useState } from 'react';

export default function Microservices({ onBack }) {
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
              🧩 Microservices Architecture
            </h1>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold uppercase tracking-wide">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-6 font-light">
            Build applications as a collection of small, independent services that communicate over well-defined APIs
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">Service Decomposition</span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">API Gateway</span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">Service Discovery</span>
            <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100">Scalability</span>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-0">
          {['overview', 'patterns', 'challenges', 'examples'].map(tab => (
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
              {tab === 'patterns' && 'Patterns'}
              {tab === 'challenges' && 'Challenges'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What are Microservices?</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Microservices is an architectural style that structures an application as a collection of loosely coupled,
                independently deployable services. Each service is self-contained, owns its data, and communicates with other
                services through well-defined APIs (typically REST, gRPC, or message queues).
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Unlike monolithic architecture where all components are tightly integrated, microservices enable teams to develop,
                deploy, and scale services independently, improving agility and resilience.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits of Microservices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">🚀 Independent Deployment</h3>
                  <p className="text-gray-700">Deploy and scale services independently without affecting the entire system</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">🔧 Technology Flexibility</h3>
                  <p className="text-gray-700">Each service can use different programming languages, databases, and frameworks</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">👥 Team Autonomy</h3>
                  <p className="text-gray-700">Small teams can own and maintain services end-to-end</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">🛡️ Fault Isolation</h3>
                  <p className="text-gray-700">Failure in one service doesn't bring down the entire application</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">📈 Selective Scaling</h3>
                  <p className="text-gray-700">Scale only the services that need more resources</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">🔄 Easier Updates</h3>
                  <p className="text-gray-700">Update services without redeploying the entire application</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Monolith vs Microservices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 text-xl mb-4">🏢 Monolithic Architecture</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Single codebase and deployment unit</li>
                    <li>• Tight coupling between components</li>
                    <li>• Scale entire application together</li>
                    <li>• Easier to develop initially</li>
                    <li>• Simpler deployment and testing</li>
                    <li>• Single database</li>
                    <li>• ❌ Hard to scale and maintain at scale</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 text-xl mb-4">🧩 Microservices</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Multiple independent services</li>
                    <li>• Loose coupling via APIs</li>
                    <li>• Scale services independently</li>
                    <li>• More complex initially</li>
                    <li>• Distributed system challenges</li>
                    <li>• Database per service</li>
                    <li>• ✅ Better scalability and maintainability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🚪 API Gateway Pattern</h2>
              <p className="text-gray-700 text-lg mb-4">
                Single entry point for all client requests. Routes requests to appropriate microservices, handles authentication, rate limiting, and aggregation.
              </p>
              <div className="bg-white p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-700 mb-3">Benefits:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Simplifies client code (single endpoint)</li>
                  <li>• Centralized authentication and authorization</li>
                  <li>• Request/response transformation</li>
                  <li>• Protocol translation (REST to gRPC)</li>
                  <li>• Examples: Kong, AWS API Gateway, Nginx</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🔍 Service Discovery Pattern</h2>
              <p className="text-gray-700 text-lg mb-4">
                Automatically detect service instances and their network locations in dynamic environments.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-3">Client-Side Discovery</h3>
                  <p className="text-gray-700 text-sm mb-2">Client queries service registry and load balances requests</p>
                  <p className="text-xs text-gray-500">Tools: Eureka, Consul</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-3">Server-Side Discovery</h3>
                  <p className="text-gray-700 text-sm mb-2">Load balancer queries registry and routes requests</p>
                  <p className="text-xs text-gray-500">Tools: Kubernetes Services, AWS ELB</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🔄 Circuit Breaker Pattern</h2>
              <p className="text-gray-700 text-lg mb-4">
                Prevent cascading failures by stopping requests to failing services and allowing them time to recover.
              </p>
              <div className="bg-white p-6 rounded-xl border border-purple-100">
                <h3 className="font-bold text-purple-700 mb-3">States:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">Closed</span>
                    <p className="text-gray-700 text-sm">Normal operation, requests flow through</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">Open</span>
                    <p className="text-gray-700 text-sm">Too many failures, reject requests immediately</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">Half-Open</span>
                    <p className="text-gray-700 text-sm">Allow limited requests to test if service recovered</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Library: Netflix Hystrix, Resilience4j</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📦 Saga Pattern (Distributed Transactions)</h2>
              <p className="text-gray-700 text-lg mb-4">
                Manage transactions across multiple microservices without distributed locks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-orange-100">
                  <h3 className="font-bold text-orange-700 mb-3">Choreography</h3>
                  <p className="text-gray-700 text-sm">Each service publishes events and listens for events to trigger next step</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-orange-100">
                  <h3 className="font-bold text-orange-700 mb-3">Orchestration</h3>
                  <p className="text-gray-700 text-sm">Central orchestrator coordinates the transaction flow</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Other Important Patterns</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Bulkhead Pattern</h3>
                  <p className="text-gray-700 text-sm">Isolate resources to prevent failure propagation</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Sidecar Pattern</h3>
                  <p className="text-gray-700 text-sm">Deploy helper containers alongside main service</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Strangler Fig</h3>
                  <p className="text-gray-700 text-sm">Gradually migrate from monolith to microservices</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Backend for Frontend (BFF)</h3>
                  <p className="text-gray-700 text-sm">Separate API gateway for each client type</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Challenges</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-700 mb-2">🌐 Network Latency</h3>
                  <p className="text-gray-700 mb-2">Inter-service calls over network introduce latency and failures</p>
                  <p className="text-sm text-gray-600"><strong>Solution:</strong> Use caching, async communication, circuit breakers</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-700 mb-2">🔍 Distributed Tracing</h3>
                  <p className="text-gray-700 mb-2">Debugging across multiple services is complex</p>
                  <p className="text-sm text-gray-600"><strong>Solution:</strong> Use distributed tracing (Jaeger, Zipkin) with correlation IDs</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-700 mb-2">💾 Data Consistency</h3>
                  <p className="text-gray-700 mb-2">Maintaining consistency across service databases</p>
                  <p className="text-sm text-gray-600"><strong>Solution:</strong> Eventual consistency, Saga pattern, event sourcing</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-700 mb-2">🚀 Deployment Complexity</h3>
                  <p className="text-gray-700 mb-2">Managing deployments of dozens/hundreds of services</p>
                  <p className="text-sm text-gray-600"><strong>Solution:</strong> Kubernetes, CI/CD pipelines, infrastructure as code</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-700 mb-2">📊 Monitoring & Observability</h3>
                  <p className="text-gray-700 mb-2">Monitoring health and performance of distributed system</p>
                  <p className="text-sm text-gray-600"><strong>Solution:</strong> Centralized logging (ELK), metrics (Prometheus), APM tools</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-700 mb-2">🔐 Security</h3>
                  <p className="text-gray-700 mb-2">Securing inter-service communication and auth</p>
                  <p className="text-sm text-gray-600"><strong>Solution:</strong> mTLS, service mesh, API gateway authentication</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Companies Using Microservices</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Netflix</h3>
                  <p className="text-gray-700">700+ microservices handling billions of API requests daily. Pioneered many patterns (Hystrix, Eureka, Zuul)</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Amazon</h3>
                  <p className="text-gray-700">Migrated from monolith to microservices. Each team owns services end-to-end (two-pizza teams)</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Uber</h3>
                  <p className="text-gray-700">2000+ microservices for ride-hailing, payments, mapping, and more. Uses service mesh (Envoy)</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Spotify</h3>
                  <p className="text-gray-700">Autonomous "squads" own microservices. Uses event-driven architecture for real-time features</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">Orchestration</h3>
                  <p className="text-gray-700 text-sm">Kubernetes, Docker Swarm, Nomad</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">Service Mesh</h3>
                  <p className="text-gray-700 text-sm">Istio, Linkerd, Consul Connect</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">API Gateway</h3>
                  <p className="text-gray-700 text-sm">Kong, AWS API Gateway, Apigee</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">Service Discovery</h3>
                  <p className="text-gray-700 text-sm">Consul, Eureka, etcd, ZooKeeper</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">Monitoring</h3>
                  <p className="text-gray-700 text-sm">Prometheus, Grafana, Datadog, New Relic</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">Tracing</h3>
                  <p className="text-gray-700 text-sm">Jaeger, Zipkin, AWS X-Ray</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

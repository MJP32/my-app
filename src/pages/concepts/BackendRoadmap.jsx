import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';

/**
 * Backend Engineering Roadmap
 *
 * A guided learning path across 10 backend-engineering categories. Each item
 * links to its existing topic page via the `onNavigate(target)` callback, which
 * App.jsx maps to either a selectedOption page or a modal page. Items marked
 * `isNew` point to pages added alongside this roadmap.
 */

const SECTIONS = [
  {
    num: 1,
    title: 'Communication Protocols',
    icon: '🔌',
    color: 'teal',
    items: [
      { label: 'TCP basics', target: 'Network Protocols', isNew: true },
      { label: 'UDP basics', target: 'Network Protocols', isNew: true },
      { label: 'HTTP/1, HTTP/2, HTTP/3', target: 'Network Protocols', isNew: true },
      { label: 'WebSockets', target: 'WebSockets' },
      { label: 'gRPC', target: 'gRPC' },
      { label: 'REST', target: 'REST API' },
    ],
  },
  {
    num: 2,
    title: 'Web Servers & Frameworks',
    icon: '🖥️',
    color: 'blue',
    items: [
      { label: 'Web server internals (NGINX, Apache, NodeJS)', target: 'Web Server Internals', isNew: true },
      { label: 'Reverse proxies', target: 'Proxies' },
      { label: 'Load balancers', target: 'Load Balancing' },
      { label: 'Edge servers', target: 'CDN' },
      { label: 'Threading models (blocking, non-blocking)', target: 'Web Server Internals', isNew: true },
      { label: 'Caching (server-side)', target: 'Caching Strategies' },
      { label: 'Web frameworks (Express, Django, Spring, Flask)', target: 'Spring' },
    ],
  },
  {
    num: 3,
    title: 'Database Engineering',
    icon: '🗄️',
    color: 'green',
    items: [
      { label: 'Relational databases (Postgres, MySQL, Oracle)', target: 'PostgreSQL' },
      { label: 'ACID properties', target: 'SQLFundamentals' },
      { label: 'Transactions', target: 'SQLFundamentals' },
      { label: 'Indexing', target: 'SQL' },
      { label: 'Data modeling & normalization', target: 'SQLFundamentals' },
      { label: 'SQL basics & optimization', target: 'SQL' },
      { label: 'NoSQL databases (MongoDB, DynamoDB, Cassandra, Redis)', target: 'NoSQL' },
      { label: 'CAP theorem', target: 'CAP Theorem' },
      { label: 'Sharding & replication', target: 'Database Sharding' },
      { label: 'Eventual consistency', target: 'Consistency Patterns' },
    ],
  },
  {
    num: 4,
    title: 'Proxies & Load Balancing',
    icon: '🔀',
    color: 'purple',
    items: [
      { label: 'Proxy servers', target: 'Proxies' },
      { label: 'Reverse proxy concepts', target: 'Proxies' },
      { label: 'TLS termination', target: 'Service Mesh', isNew: true },
      { label: 'Service meshes (Istio, Envoy)', target: 'Service Mesh', isNew: true },
      { label: 'Load balancing strategies (round robin, least connections, etc.)', target: 'Load Balancing' },
    ],
  },
  {
    num: 5,
    title: 'Caching',
    icon: '⚡',
    color: 'amber',
    items: [
      { label: 'In-memory caches (Redis, Memcached)', target: 'Redis' },
      { label: 'Stateful vs stateless caching', target: 'Caching Strategies' },
      { label: 'Cache invalidation', target: 'Caching Strategies' },
      { label: 'Client / server / reverse proxy / database caching layers', target: 'Caching Strategies' },
    ],
  },
  {
    num: 6,
    title: 'Messaging & Queues',
    icon: '📨',
    color: 'pink',
    items: [
      { label: 'Message brokers (RabbitMQ, Kafka, SQS)', target: 'Message Queues' },
      { label: 'Publish/Subscribe systems', target: 'Kafka' },
      { label: 'Point-to-point queues', target: 'RabbitMQ' },
      { label: 'Event-driven architecture', target: 'Event Driven Architecture' },
    ],
  },
  {
    num: 7,
    title: 'API Design & Message Formats',
    icon: '🔗',
    color: 'cyan',
    items: [
      { label: 'RESTful APIs', target: 'REST API' },
      { label: 'gRPC APIs', target: 'gRPC' },
      { label: 'API versioning', target: 'API Design' },
      { label: 'JSON', target: 'API Design' },
      { label: 'XML', target: 'API Design' },
      { label: 'Protocol Buffers', target: 'gRPC' },
      { label: 'API documentation', target: 'API Design' },
    ],
  },
  {
    num: 8,
    title: 'Security Fundamentals',
    icon: '🔒',
    color: 'red',
    items: [
      { label: 'TLS/SSL basics', target: 'Web Security Fundamentals', isNew: true },
      { label: 'Authentication (JWT, OAuth, API keys)', target: 'JWT' },
      { label: 'Authorization', target: 'OAuth' },
      { label: 'Secure secret storage', target: 'Web Security Fundamentals', isNew: true },
      { label: 'SQL injection, XSS, CSRF prevention', target: 'Web Security Fundamentals', isNew: true },
      { label: 'Firewalls & port management', target: 'Web Security Fundamentals', isNew: true },
      { label: 'DDoS basics', target: 'Web Security Fundamentals', isNew: true },
    ],
  },
  {
    num: 9,
    title: 'Monitoring, Logging, Debugging',
    icon: '📊',
    color: 'indigo',
    items: [
      { label: 'Application metrics', target: 'Prometheus' },
      { label: 'Centralized logging', target: 'ELK Stack' },
      { label: 'Distributed tracing', target: 'Zipkin' },
      { label: 'Alerting', target: 'Grafana' },
      { label: 'Health checks', target: 'Prometheus' },
    ],
  },
  {
    num: 10,
    title: 'Core Engineering Skills',
    icon: '🛠️',
    color: 'orange',
    items: [
      { label: 'One backend language (Python, Java, Go, Node.js, Rust, etc.)', target: 'Java' },
      { label: 'Version control (Git)', target: 'DevOps' },
      { label: 'Build tools', target: 'Maven' },
      { label: 'CI/CD basics', target: 'DevOps' },
      { label: 'Containerization (Docker, Kubernetes basics)', target: 'Docker' },
      { label: 'Writing clean, maintainable code', target: 'Design Patterns' },
      { label: 'Production deployments', target: 'DevOps' },
    ],
  },
];

const COLOR_MAP = {
  teal: { border: 'border-teal-700', badge: 'bg-teal-900/50 text-teal-300 border-teal-700', num: 'bg-teal-600' },
  blue: { border: 'border-blue-700', badge: 'bg-blue-900/50 text-blue-300 border-blue-700', num: 'bg-blue-600' },
  green: { border: 'border-green-700', badge: 'bg-green-900/50 text-green-300 border-green-700', num: 'bg-green-600' },
  purple: { border: 'border-purple-700', badge: 'bg-purple-900/50 text-purple-300 border-purple-700', num: 'bg-purple-600' },
  amber: { border: 'border-amber-700', badge: 'bg-amber-900/50 text-amber-300 border-amber-700', num: 'bg-amber-600' },
  pink: { border: 'border-pink-700', badge: 'bg-pink-900/50 text-pink-300 border-pink-700', num: 'bg-pink-600' },
  cyan: { border: 'border-cyan-700', badge: 'bg-cyan-900/50 text-cyan-300 border-cyan-700', num: 'bg-cyan-600' },
  red: { border: 'border-red-700', badge: 'bg-red-900/50 text-red-300 border-red-700', num: 'bg-red-600' },
  indigo: { border: 'border-indigo-700', badge: 'bg-indigo-900/50 text-indigo-300 border-indigo-700', num: 'bg-indigo-600' },
  orange: { border: 'border-orange-700', badge: 'bg-orange-900/50 text-orange-300 border-orange-700', num: 'bg-orange-600' },
};

export default function BackendRoadmap({ onBack, breadcrumb, onNavigate }) {
  const go = (target) => {
    if (typeof onNavigate === 'function') onNavigate(target);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-teal-700 hover:border-teal-600 text-teal-300 hover:text-teal-200 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🧭 Backend Engineering Roadmap
            </h1>
            <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-teal-700">
              Learning Path
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            A guided path through the 10 pillars of backend engineering. Click any topic to jump to its page.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-teal-900/30 text-teal-300 rounded-lg text-sm font-medium border border-teal-700">10 Categories</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">60+ Topics</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Linked to Topic Pages</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {SECTIONS.map((section) => {
            const c = COLOR_MAP[section.color];
            return (
              <div key={section.num} className={`bg-gray-800/50 border-2 ${c.border} rounded-2xl p-6 shadow-lg`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`flex items-center justify-center w-9 h-9 rounded-full ${c.num} text-white font-bold text-sm`}>
                    {section.num}
                  </span>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span>{section.icon}</span>
                    {section.title}
                  </h2>
                </div>
                <div className="flex flex-col gap-2">
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => go(item.target)}
                      className="group text-left flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-900/40 hover:bg-gray-900/80 border border-gray-700 hover:border-gray-500 rounded-xl transition-all"
                    >
                      <span className="text-gray-200 group-hover:text-white text-sm font-medium">
                        {item.label}
                      </span>
                      <span className="flex items-center gap-2 shrink-0">
                        {item.isNew && (
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border ${c.badge}`}>
                            New
                          </span>
                        )}
                        <span className="text-gray-500 group-hover:text-gray-300 transition-colors">→</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

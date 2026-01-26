import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '../../contexts/ThemeContext';

export default function MonolithToMicroservice({ onBack, breadcrumb }) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'strategy', label: '🎯 Migration Strategy', icon: '🎯' },
    { id: 'implementation', label: '⚙️ Implementation', icon: '⚙️' },
    { id: 'results', label: '📊 Results & Metrics', icon: '📊' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.bgPrimary, padding: '1rem' }} className="md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div style={{ backgroundColor: colors.bgSecondary, borderLeft: '8px solid #9333ea' }} className="mb-8 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              style={{
                backgroundColor: colors.bgPrimary,
                color: colors.textPrimary,
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <span>←</span>
              <span>Back</span>
            </button>
            <h1 style={{ color: colors.textPrimary }} className="text-4xl md:text-5xl font-bold flex items-center gap-3">
              <span className="text-5xl">🔄</span>
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Monolith to Microservices
              </span>
            </h1>
            <div className="w-24"></div>
          </div>
          <p style={{ color: colors.textSecondary }} className="text-lg text-center">
            Decomposed a monolithic VaR/CVaR system into microservices using the Strangler Fig Pattern, eliminating vendor dependencies and achieving 40% performance improvement
          </p>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b-2 border-gray-200 overflow-x-auto pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab.id
                  ? 'text-purple-600 bg-purple-50 border-b-4 border-purple-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Project Overview */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-purple-600">📝</span>
                Project Context
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">🏢 Business Challenge</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Legacy Monolith:</strong> Tightly coupled VaR/CVaR risk calculation system</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Vendor Lock-in:</strong> Expensive third-party vendor system with annual licensing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Slow Development:</strong> Single codebase hindered parallel team development</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Scaling Issues:</strong> Could not scale individual components independently</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>High Risk:</strong> Deployment of any feature affected entire system</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-700 mb-3">✅ Solution & Goals</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Decomposition:</strong> Break monolith into domain-driven microservices</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Zero Downtime:</strong> Migrate incrementally without service interruption</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Vendor Elimination:</strong> Replace vendor system with in-house solution</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Independent Scaling:</strong> Scale services based on individual load</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Technology Freedom:</strong> Use best tool for each domain</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-indigo-600">🏗️</span>
                Migration Architecture
              </h2>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-200">
                <svg viewBox="0 0 1200 800" className="w-full h-auto">
                  <defs>
                    <linearGradient id="monolithGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="microserviceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="stranglerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
                    </linearGradient>
                    <marker id="arrowMigration" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
                    </marker>
                  </defs>

                  {/* Legacy Monolith */}
                  <rect x="50" y="150" width="220" height="280" fill="url(#monolithGrad)" stroke="#dc2626" strokeWidth="3" rx="8" />
                  <text x="160" y="185" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">Legacy VaR/CVaR</text>
                  <text x="160" y="210" fontSize="14" fill="white" textAnchor="middle">Monolith</text>
                  <line x1="60" y1="220" x2="260" y2="220" stroke="white" strokeWidth="2" />

                  <text x="160" y="250" fontSize="13" fill="white" textAnchor="middle">📊 Risk Calculation</text>
                  <text x="160" y="275" fontSize="13" fill="white" textAnchor="middle">💾 Data Management</text>
                  <text x="160" y="300" fontSize="13" fill="white" textAnchor="middle">📈 Portfolio Analysis</text>
                  <text x="160" y="325" fontSize="13" fill="white" textAnchor="middle">🔍 Scenario Engine</text>
                  <text x="160" y="350" fontSize="13" fill="white" textAnchor="middle">📋 Reporting</text>
                  <text x="160" y="375" fontSize="13" fill="white" textAnchor="middle">⚙️ Vendor System</text>
                  <text x="160" y="400" fontSize="11" fill="#fee2e2" textAnchor="middle" fontStyle="italic">Tightly Coupled</text>
                  <text x="160" y="415" fontSize="10" fill="#fecaca" textAnchor="middle">Single Deployment</text>

                  {/* Strangler Facade */}
                  <rect x="350" y="180" width="180" height="200" fill="url(#stranglerGrad)" stroke="#d97706" strokeWidth="3" rx="8" />
                  <text x="440" y="215" fontSize="17" fontWeight="bold" fill="white" textAnchor="middle">Strangler Facade</text>
                  <text x="440" y="235" fontSize="13" fill="white" textAnchor="middle">(API Gateway)</text>
                  <line x1="360" y1="245" x2="520" y2="245" stroke="white" strokeWidth="2" />

                  <text x="440" y="270" fontSize="13" fill="white" textAnchor="middle">Smart Routing</text>
                  <text x="440" y="295" fontSize="12" fill="#fef3c7" textAnchor="middle">if (migrated)</text>
                  <text x="440" y="315" fontSize="12" fill="#fef3c7" textAnchor="middle">  → Microservice</text>
                  <text x="440" y="335" fontSize="12" fill="#fef3c7" textAnchor="middle">else</text>
                  <text x="440" y="355" fontSize="12" fill="#fef3c7" textAnchor="middle">  → Monolith</text>

                  {/* Arrow from Monolith to Facade */}
                  <path d="M 270 290 L 350 290" stroke="#f59e0b" strokeWidth="4" markerEnd="url(#arrowMigration)" />

                  {/* Microservices */}
                  <g>
                    <rect x="600" y="50" width="160" height="85" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="680" y="80" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">Risk Calculation</text>
                    <text x="680" y="100" fontSize="12" fill="white" textAnchor="middle">Service</text>
                    <text x="680" y="120" fontSize="11" fill="#d1fae5" textAnchor="middle">✓ Migrated | Java/Spring</text>
                  </g>

                  <g>
                    <rect x="790" y="50" width="160" height="85" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="870" y="80" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">Portfolio</text>
                    <text x="870" y="100" fontSize="12" fill="white" textAnchor="middle">Service</text>
                    <text x="870" y="120" fontSize="11" fill="#d1fae5" textAnchor="middle">✓ Migrated | Go</text>
                  </g>

                  <g>
                    <rect x="600" y="165" width="160" height="85" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="680" y="195" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">Data Aggregation</text>
                    <text x="680" y="215" fontSize="12" fill="white" textAnchor="middle">Service</text>
                    <text x="680" y="235" fontSize="11" fill="#d1fae5" textAnchor="middle">✓ Migrated | Python</text>
                  </g>

                  <g>
                    <rect x="790" y="165" width="160" height="85" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="870" y="195" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">Scenario Engine</text>
                    <text x="870" y="215" fontSize="12" fill="white" textAnchor="middle">Service</text>
                    <text x="870" y="235" fontSize="11" fill="#d1fae5" textAnchor="middle">✓ Migrated | Java</text>
                  </g>

                  <g>
                    <rect x="600" y="280" width="160" height="85" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="680" y="310" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">Reporting</text>
                    <text x="680" y="330" fontSize="12" fill="white" textAnchor="middle">Service</text>
                    <text x="680" y="350" fontSize="11" fill="#d1fae5" textAnchor="middle">✓ Migrated | Node.js</text>
                  </g>

                  <g>
                    <rect x="790" y="280" width="160" height="85" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
                    <text x="870" y="310" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">CVaR Analytics</text>
                    <text x="870" y="330" fontSize="12" fill="white" textAnchor="middle">Service</text>
                    <text x="870" y="350" fontSize="11" fill="#d1fae5" textAnchor="middle">✓ Migrated | Java</text>
                  </g>

                  {/* Arrows from Facade to Microservices */}
                  <path d="M 530 240 L 600 92" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowMigration)" />
                  <path d="M 530 260 L 600 207" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowMigration)" />
                  <path d="M 530 280 L 600 322" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowMigration)" />
                  <path d="M 530 250 L 790 92" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowMigration)" />
                  <path d="M 530 270 L 790 207" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowMigration)" />
                  <path d="M 530 290 L 790 322" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowMigration)" />

                  {/* Supporting Services */}
                  <rect x="1000" y="50" width="140" height="70" fill="#6366f1" stroke="#4f46e5" strokeWidth="2" rx="6" />
                  <text x="1070" y="75" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Event Bus</text>
                  <text x="1070" y="95" fontSize="11" fill="white" textAnchor="middle">Apache Kafka</text>

                  <rect x="1000" y="140" width="140" height="70" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2" rx="6" />
                  <text x="1070" y="165" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Service Registry</text>
                  <text x="1070" y="185" fontSize="11" fill="white" textAnchor="middle">Consul</text>

                  <rect x="1000" y="230" width="140" height="70" fill="#ec4899" stroke="#db2777" strokeWidth="2" rx="6" />
                  <text x="1070" y="255" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Config Server</text>
                  <text x="1070" y="275" fontSize="11" fill="white" textAnchor="middle">Spring Cloud</text>

                  <rect x="1000" y="320" width="140" height="70" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" rx="6" />
                  <text x="1070" y="345" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Distributed Cache</text>
                  <text x="1070" y="365" fontSize="11" fill="white" textAnchor="middle">Redis</text>

                  {/* Timeline */}
                  <rect x="50" y="470" width="1090" height="100" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" rx="8" />
                  <text x="595" y="500" fontSize="16" fontWeight="bold" fill="#374151" textAnchor="middle">Migration Timeline (18 Months)</text>

                  <text x="80" y="530" fontSize="13" fill="#6b7280" fontWeight="600">Phase 1 (Q1-Q2)</text>
                  <text x="80" y="548" fontSize="11" fill="#6b7280">• Deploy Strangler Facade</text>
                  <text x="80" y="563" fontSize="11" fill="#6b7280">• Observability Setup</text>

                  <text x="330" y="530" fontSize="13" fill="#6b7280" fontWeight="600">Phase 2 (Q2-Q3)</text>
                  <text x="330" y="548" fontSize="11" fill="#6b7280">{`• Migrate Risk &amp; Portfolio`}</text>
                  <text x="330" y="563" fontSize="11" fill="#6b7280">• Parallel Running</text>

                  <text x="600" y="530" fontSize="13" fill="#6b7280" fontWeight="600">Phase 3 (Q3-Q4)</text>
                  <text x="600" y="548" fontSize="11" fill="#6b7280">• Migrate Remaining Services</text>
                  <text x="600" y="563" fontSize="11" fill="#6b7280">• Vendor Decommission</text>

                  <text x="900" y="530" fontSize="13" fill="#6b7280" fontWeight="600">Phase 4 (Q1)</text>
                  <text x="900" y="548" fontSize="11" fill="#6b7280">• Remove Monolith</text>
                  <text x="900" y="563" fontSize="11" fill="#6b7280">• Full Migration Complete</text>

                  {/* VaR/CVaR Label */}
                  <rect x="400" y="650" width="400" height="100" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" rx="8" />
                  <text x="600" y="680" fontSize="15" fontWeight="bold" fill="#6b21a8" textAnchor="middle">VaR/CVaR System Overview</text>
                  <text x="600" y="705" fontSize="12" fill="#7c3aed" textAnchor="middle">Value at Risk (VaR): Max potential loss at confidence level</text>
                  <text x="600" y="725" fontSize="12" fill="#7c3aed" textAnchor="middle">Conditional VaR (CVaR): Expected loss beyond VaR threshold</text>
                </svg>
              </div>
            </div>

            {/* Domain Decomposition */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-emerald-600">🧩</span>
                Domain Decomposition
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Risk Calculation Service',
                    icon: '📊',
                    color: 'blue',
                    responsibilities: [
                      'VaR calculations (Historical, Parametric, Monte Carlo)',
                      'CVaR computations',
                      'Stress testing scenarios',
                      'Risk aggregation'
                    ]
                  },
                  {
                    name: 'Portfolio Service',
                    icon: '💼',
                    color: 'green',
                    responsibilities: [
                      'Portfolio composition management',
                      'Position tracking',
                      'Asset allocation',
                      'Performance analytics'
                    ]
                  },
                  {
                    name: 'Data Aggregation Service',
                    icon: '💾',
                    color: 'purple',
                    responsibilities: [
                      'Market data ingestion',
                      'Historical price data',
                      'Data quality checks',
                      'Normalization &amp; transformation'
                    ]
                  },
                  {
                    name: 'Scenario Engine Service',
                    icon: '🔍',
                    color: 'orange',
                    responsibilities: [
                      'Scenario generation',
                      'Simulation execution',
                      'What-if analysis',
                      'Sensitivity analysis'
                    ]
                  },
                  {
                    name: 'Reporting Service',
                    icon: '📋',
                    color: 'pink',
                    responsibilities: [
                      'Report generation',
                      'Dashboard data aggregation',
                      'PDF/Excel export',
                      'Regulatory compliance reports'
                    ]
                  },
                  {
                    name: 'CVaR Analytics Service',
                    icon: '📈',
                    color: 'indigo',
                    responsibilities: [
                      'Advanced CVaR calculations',
                      'Tail risk analysis',
                      'Correlation analysis',
                      'Risk contribution metrics'
                    ]
                  }
                ].map((service, index) => (
                  <div key={index} className={`bg-${service.color}-50 p-6 rounded-xl border-2 border-${service.color}-200`}>
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h3 className={`font-bold text-${service.color}-900 mb-3 text-lg`}>{service.name}</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {service.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`text-${service.color}-500 mt-0.5`}>•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="space-y-8">
            {/* Strangler Fig Pattern */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-amber-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-amber-600">🎯</span>
                Strangler Fig Pattern
              </h2>

              <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500 mb-6">
                <h3 className="font-bold text-amber-900 mb-3 text-lg">Pattern Overview</h3>
                <p style={{ color: colors.textSecondary }} className=" mb-4">
                  The Strangler Fig pattern is named after the strangler fig tree, which grows around an existing tree, eventually replacing it entirely. In software migration, we gradually replace functionality from the legacy monolith by routing requests through a facade (API Gateway) that directs traffic to either the old or new system based on what's been migrated.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div style={{ backgroundColor: colors.bgPrimary }} className="p-4 rounded-lg">
                    <div className="font-semibold text-green-700 mb-2">✅ Advantages</div>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>• Zero downtime migration</li>
                      <li>• Incremental, low-risk approach</li>
                      <li>• Parallel running for validation</li>
                      <li>• Easy rollback if issues arise</li>
                      <li>• Business continuity maintained</li>
                    </ul>
                  </div>
                  <div style={{ backgroundColor: colors.bgPrimary }} className="p-4 rounded-lg">
                    <div className="font-semibold text-orange-700 mb-2">⚠️ Challenges</div>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>• Managing dual systems complexity</li>
                      <li>• Data synchronization between old/new</li>
                      <li>• Increased infrastructure costs temporarily</li>
                      <li>• Requires careful routing logic</li>
                      <li>• Extended migration timeline</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4 text-lg">Step 1: Deploy Facade</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>• <strong>API Gateway Setup:</strong> Deploy Kong/NGINX as routing layer</div>
                    <div>• <strong>Initial Routing:</strong> All requests go to monolith (100%)</div>
                    <div>• <strong>Monitoring:</strong> Add distributed tracing (Jaeger)</div>
                    <div>• <strong>Logging:</strong> Centralized logging (ELK stack)</div>
                    <div>• <strong>Testing:</strong> Verify no performance degradation</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-4 text-lg">Step 2: Extract First Service</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>• <strong>Choose Domain:</strong> Start with least coupled (Reporting)</div>
                    <div>• <strong>Build Microservice:</strong> Implement new service independently</div>
                    <div>• <strong>Shadow Mode:</strong> Run parallel, compare results</div>
                    <div>• <strong>Update Routing:</strong> Shift traffic gradually (10% → 50% → 100%)</div>
                    <div>• <strong>Monitor:</strong> Watch for errors, latency issues</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-4 text-lg">Step 3: Repeat for Each Domain</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>• <strong>Prioritize:</strong> Order by coupling (loose → tight)</div>
                    <div>• <strong>Data Migration:</strong> Move domain data to new DB</div>
                    <div>• <strong>Event Synchronization:</strong> Use Kafka for eventual consistency</div>
                    <div>• <strong>Testing:</strong> Integration tests between services</div>
                    <div>• <strong>Cutover:</strong> Complete migration per domain</div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                  <h3 className="font-bold text-red-900 mb-4 text-lg">Step 4: Decommission Monolith</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>• <strong>Verification:</strong> Confirm 0% monolith traffic</div>
                    <div>• <strong>Data Archival:</strong> Archive historical monolith data</div>
                    <div>• <strong>Infrastructure:</strong> Shut down monolith servers</div>
                    <div>• <strong>Cleanup:</strong> Remove facade routing to monolith</div>
                    <div>• <strong>Celebrate:</strong> Migration complete! 🎉</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Migration Phases */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-indigo-600">📅</span>
                Migration Phases (18 Months)
              </h2>

              <div className="space-y-6">
                {[
                  {
                    phase: 'Phase 1',
                    duration: 'Months 1-3',
                    title: 'Foundation & Facade Setup',
                    color: 'blue',
                    tasks: [
                      { task: 'Deploy API Gateway (Kong)', status: 'complete' },
                      { task: 'Setup distributed tracing (Jaeger)', status: 'complete' },
                      { task: 'Implement centralized logging (ELK)', status: 'complete' },
                      { task: 'Configure service discovery (Consul)', status: 'complete' },
                      { task: 'Establish CI/CD pipelines (Jenkins)', status: 'complete' },
                      { task: 'Create containerization strategy (Docker)', status: 'complete' }
                    ]
                  },
                  {
                    phase: 'Phase 2',
                    duration: 'Months 4-9',
                    title: 'Core Services Migration',
                    color: 'green',
                    tasks: [
                      { task: 'Extract Reporting Service (Month 4-5)', status: 'complete' },
                      { task: 'Extract Data Aggregation Service (Month 5-6)', status: 'complete' },
                      { task: 'Extract Risk Calculation Service (Month 6-8)', status: 'complete' },
                      { task: 'Extract Portfolio Service (Month 8-9)', status: 'complete' },
                      { task: 'Implement event-driven sync (Kafka)', status: 'complete' },
                      { task: 'Data migration for each domain', status: 'complete' }
                    ]
                  },
                  {
                    phase: 'Phase 3',
                    duration: 'Months 10-15',
                    title: 'Vendor Replacement & Advanced Services',
                    color: 'purple',
                    tasks: [
                      { task: 'Extract Scenario Engine Service (Month 10-11)', status: 'complete' },
                      { task: 'Extract CVaR Analytics Service (Month 11-12)', status: 'complete' },
                      { task: 'Replace vendor system functionality (Month 12-14)', status: 'complete' },
                      { task: 'Migrate vendor-specific calculations', status: 'complete' },
                      { task: 'Parallel running: vendor vs. new system', status: 'complete' },
                      { task: 'Vendor system decommissioning (Month 15)', status: 'complete' }
                    ]
                  },
                  {
                    phase: 'Phase 4',
                    duration: 'Months 16-18',
                    title: 'Monolith Decommission & Optimization',
                    color: 'red',
                    tasks: [
                      { task: 'Redirect all traffic through microservices', status: 'complete' },
                      { task: 'Performance tuning and optimization', status: 'complete' },
                      { task: 'Remove monolith infrastructure', status: 'complete' },
                      { task: 'Update documentation and runbooks', status: 'complete' },
                      { task: 'Team training on new architecture', status: 'complete' },
                      { task: 'Post-migration monitoring and fixes', status: 'complete' }
                    ]
                  }
                ].map((phase, index) => (
                  <div key={index} className={`bg-${phase.color}-50 p-6 rounded-xl border-l-4 border-${phase.color}-500`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`text-xl font-bold text-${phase.color}-900`}>{phase.phase}: {phase.title}</h3>
                        <p className={`text-sm text-${phase.color}-700 mt-1`}>{phase.duration}</p>
                      </div>
                      <span className={`px-3 py-1 bg-${phase.color}-100 text-${phase.color}-800 rounded-full text-xs font-semibold`}>
                        {phase.tasks.length} Tasks
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {phase.tasks.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{item.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Mitigation */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-rose-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-rose-600">🛡️</span>
                Risk Mitigation Strategies
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    risk: 'Data Inconsistency',
                    icon: '💾',
                    color: 'red',
                    mitigation: [
                      'Event-driven architecture with Kafka',
                      'Eventual consistency patterns',
                      'Saga pattern for distributed transactions',
                      'Regular data reconciliation jobs'
                    ]
                  },
                  {
                    risk: 'Performance Degradation',
                    icon: '⚡',
                    color: 'orange',
                    mitigation: [
                      'Continuous performance monitoring',
                      'Load testing before cutover',
                      'Caching strategy (Redis)',
                      'Database query optimization'
                    ]
                  },
                  {
                    risk: 'Service Dependencies',
                    icon: '🔗',
                    color: 'yellow',
                    mitigation: [
                      'Circuit breaker pattern (Hystrix)',
                      'Retry logic with exponential backoff',
                      'Fallback mechanisms',
                      'Asynchronous communication where possible'
                    ]
                  },
                  {
                    risk: 'Failed Migration',
                    icon: '❌',
                    color: 'purple',
                    mitigation: [
                      'Feature flags for instant rollback',
                      'Blue-green deployment strategy',
                      'Comprehensive integration tests',
                      'Staged rollout (canary deployments)'
                    ]
                  }
                ].map((item, index) => (
                  <div key={index} className={`bg-${item.color}-50 p-6 rounded-xl border-2 border-${item.color}-200`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{item.icon}</span>
                      <h3 className={`font-bold text-${item.color}-900 text-lg`}>{item.risk}</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {item.mitigation.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`text-${item.color}-500 mt-0.5`}>•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'implementation' && (
          <div className="space-y-8">
            {/* Technology Stack */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-cyan-600">🛠️</span>
                Technology Stack
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4">Microservices Framework</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">Spring Boot 2.7</div>
                      <div style={{ color: colors.textSecondary }} className="">Java microservices (Risk, CVaR, Scenario)</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Go 1.19</div>
                      <div style={{ color: colors.textSecondary }} className="">High-performance Portfolio Service</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Python 3.10</div>
                      <div style={{ color: colors.textSecondary }} className="">Data Aggregation &amp; ML pipelines</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Node.js 18</div>
                      <div style={{ color: colors.textSecondary }} className="">Reporting Service with PDF generation</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-4">Infrastructure & DevOps</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">Kubernetes 1.25</div>
                      <div style={{ color: colors.textSecondary }} className="">Container orchestration, auto-scaling</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Docker</div>
                      <div style={{ color: colors.textSecondary }} className="">Containerization for all services</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Jenkins</div>
                      <div style={{ color: colors.textSecondary }} className="">CI/CD pipelines, automated testing</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Helm Charts</div>
                      <div style={{ color: colors.textSecondary }} className="">Kubernetes deployment management</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-4">API Gateway & Service Mesh</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">Kong Gateway</div>
                      <div style={{ color: colors.textSecondary }} className="">API routing, rate limiting, auth</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Istio Service Mesh</div>
                      <div style={{ color: colors.textSecondary }} className="">Traffic management, observability</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Envoy Proxy</div>
                      <div style={{ color: colors.textSecondary }} className="">Sidecar proxies for services</div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-4">Data & Messaging</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">Apache Kafka</div>
                      <div style={{ color: colors.textSecondary }} className="">Event streaming, async messaging</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">PostgreSQL 14</div>
                      <div style={{ color: colors.textSecondary }} className="">Primary database per service</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Redis 7</div>
                      <div style={{ color: colors.textSecondary }} className="">Distributed caching, session store</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">MongoDB</div>
                      <div style={{ color: colors.textSecondary }} className="">Document storage for reporting</div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                  <h3 className="font-bold text-red-900 mb-4">Observability & Monitoring</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">Prometheus</div>
                      <div style={{ color: colors.textSecondary }} className="">Metrics collection &amp; alerting</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Grafana</div>
                      <div style={{ color: colors.textSecondary }} className="">Dashboards &amp; visualization</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Jaeger</div>
                      <div style={{ color: colors.textSecondary }} className="">Distributed tracing</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">ELK Stack</div>
                      <div style={{ color: colors.textSecondary }} className="">Centralized logging</div>
                    </div>
                  </div>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
                  <h3 className="font-bold text-pink-900 mb-4">Service Discovery & Config</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">Consul</div>
                      <div style={{ color: colors.textSecondary }} className="">Service registry &amp; discovery</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Spring Cloud Config</div>
                      <div style={{ color: colors.textSecondary }} className="">Centralized configuration</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Vault</div>
                      <div style={{ color: colors.textSecondary }} className="">Secrets management</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Patterns */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-violet-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-violet-600">🏛️</span>
                Architecture Patterns Implemented
              </h2>

              <div className="space-y-4">
                {[
                  {
                    pattern: 'Domain-Driven Design (DDD)',
                    description: 'Organized services around business domains (Risk, Portfolio, Data)',
                    benefits: ['Clear boundaries', 'Business-aligned', 'Independent development'],
                    color: 'blue'
                  },
                  {
                    pattern: 'Event-Driven Architecture',
                    description: 'Services communicate via Kafka events for loose coupling',
                    benefits: ['Asynchronous processing', 'Scalability', 'Resilience'],
                    color: 'green'
                  },
                  {
                    pattern: 'API Gateway Pattern',
                    description: 'Kong Gateway as single entry point for all client requests',
                    benefits: ['Centralized routing', 'Security', 'Rate limiting'],
                    color: 'purple'
                  },
                  {
                    pattern: 'Circuit Breaker Pattern',
                    description: 'Hystrix/Resilience4j prevents cascading failures',
                    benefits: ['Fault tolerance', 'Graceful degradation', 'Fast failure'],
                    color: 'red'
                  },
                  {
                    pattern: 'Database per Service',
                    description: 'Each microservice owns its database schema',
                    benefits: ['Data isolation', 'Independent scaling', 'Technology choice'],
                    color: 'orange'
                  },
                  {
                    pattern: 'Saga Pattern',
                    description: 'Choreography-based sagas for distributed transactions',
                    benefits: ['Eventual consistency', 'No 2PC', 'Scalable transactions'],
                    color: 'pink'
                  }
                ].map((item, index) => (
                  <div key={index} className={`bg-${item.color}-50 p-5 rounded-xl border-l-4 border-${item.color}-500`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-bold text-${item.color}-900 text-lg`}>{item.pattern}</h3>
                    </div>
                    <p style={{ color: colors.textSecondary }} className=" mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.benefits.map((benefit, idx) => (
                        <span key={idx} className={`px-3 py-1 bg-${item.color}-100 text-${item.color}-800 rounded-full text-xs font-medium`}>
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Migration Strategy */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-teal-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-teal-600">💾</span>
                Data Migration Strategy
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-teal-50 p-6 rounded-xl">
                  <h3 className="font-bold text-teal-900 mb-4 text-lg">Dual-Write Approach</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">1.</span>
                      <div>
                        <div className="font-semibold">Write to Both Systems</div>
                        <div>During transition, write data to both monolith and new service</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">2.</span>
                      <div>
                        <div className="font-semibold">Read from Monolith</div>
                        <div>Continue reading from monolith for consistency</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">3.</span>
                      <div>
                        <div className="font-semibold">Backfill Historical Data</div>
                        <div>ETL jobs migrate historical data to new service DB</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">4.</span>
                      <div>
                        <div className="font-semibold">Verification Period</div>
                        <div>Compare data consistency between systems</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">5.</span>
                      <div>
                        <div className="font-semibold">Cutover</div>
                        <div>Switch reads to new service, stop monolith writes</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-bold text-blue-900 mb-4 text-lg">Event Sourcing for Sync</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <div>
                        <div className="font-semibold">Change Data Capture (CDC)</div>
                        <div>Debezium captures monolith DB changes, publishes to Kafka</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <div>
                        <div className="font-semibold">Event Streaming</div>
                        <div>New services consume events, update their databases</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <div>
                        <div className="font-semibold">Eventual Consistency</div>
                        <div>Accept temporary inconsistency (milliseconds lag)</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <div>
                        <div className="font-semibold">Reconciliation Jobs</div>
                        <div>Daily jobs verify data consistency across systems</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 p-5 rounded-xl border-l-4 border-amber-500">
                <h4 className="font-bold text-amber-900 mb-2">⚠️ Key Challenges</h4>
                <ul className="text-sm text-gray-700 space-y-2 ml-4">
                  <li>• <strong>Schema Differences:</strong> Monolith had denormalized data; had to normalize in new services</li>
                  <li>• <strong>Legacy Vendor Data:</strong> Vendor DB schemas were proprietary; required reverse engineering</li>
                  <li>• <strong>Transaction Boundaries:</strong> Multi-table updates in monolith became distributed transactions</li>
                  <li>• <strong>Data Volume:</strong> 10+ years of historical data required months of backfilling</li>
                </ul>
              </div>
            </div>

            {/* Testing Strategy */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-emerald-600">🧪</span>
                Testing Strategy
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 p-6 rounded-xl">
                  <h3 className="font-bold text-emerald-900 mb-3">Unit Testing</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• JUnit 5 for Java services</li>
                    <li>• pytest for Python services</li>
                    <li>• &gt;80% code coverage target</li>
                    <li>• Mocked external dependencies</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-bold text-blue-900 mb-3">Integration Testing</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Testcontainers for DB/Kafka</li>
                    <li>• API contract testing (Pact)</li>
                    <li>• End-to-end test suites</li>
                    <li>• Chaos engineering (Chaos Monkey)</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="font-bold text-purple-900 mb-3">Performance Testing</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Load testing with JMeter</li>
                    <li>• Stress testing under peak load</li>
                    <li>• Latency monitoring (P95, P99)</li>
                    <li>• Comparison: old vs. new system</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-green-600">📊</span>
                Key Results & Metrics
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[
                  { metric: '40%', label: 'Faster Calculations', icon: '⚡', color: 'blue' },
                  { metric: '$500K', label: 'Annual Cost Savings', icon: '💰', color: 'green' },
                  { metric: '99.95%', label: 'Uptime Achieved', icon: '🎯', color: 'purple' },
                  { metric: '6x', label: 'Deployment Frequency', icon: '🚀', color: 'orange' }
                ].map((item, index) => (
                  <div key={index} className={`bg-${item.color}-50 p-6 rounded-xl border-2 border-${item.color}-200 text-center`}>
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className={`text-4xl font-bold text-${item.color}-600 mb-2`}>{item.metric}</div>
                    <div className="text-sm text-gray-700 font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2 text-lg">
                    <span>⚡</span>
                    Performance Improvements
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <div>
                        <strong>VaR Calculation Time:</strong> Reduced from 45s to 27s (40% improvement)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <div>
                        <strong>API Latency:</strong> P95 reduced from 2.5s to 800ms
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <div>
                        <strong>Throughput:</strong> System now handles 3x more concurrent calculations
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <div>
                        <strong>Report Generation:</strong> 60% faster (from 20s to 8s)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <div>
                        <strong>Database Queries:</strong> Optimized indexes reduced query time by 75%
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2 text-lg">
                    <span>💰</span>
                    Cost Savings
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <div>
                        <strong>Vendor Licensing:</strong> Eliminated $400K annual license fee
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <div>
                        <strong>Infrastructure:</strong> Reduced by 25% through right-sizing services
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <div>
                        <strong>Support Costs:</strong> Saved $50K/year on vendor support contracts
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <div>
                        <strong>Maintenance:</strong> 40% reduction in maintenance hours
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <div>
                        <strong>Cloud Costs:</strong> Kubernetes auto-scaling saved 30% on compute
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <h3 className="font-bold text-purple-900 mb-4 flex items-center gap-2 text-lg">
                    <span>🚀</span>
                    Development Agility
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <div>
                        <strong>Deployment Frequency:</strong> From monthly to weekly (6x increase)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <div>
                        <strong>Lead Time:</strong> Feature to production reduced from 4 weeks to 3 days
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <div>
                        <strong>Team Autonomy:</strong> 6 independent teams vs. 1 monolithic team
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <div>
                        <strong>Technology Choice:</strong> Teams free to choose best tool per service
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <div>
                        <strong>Parallel Development:</strong> 3x more features developed concurrently
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                  <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2 text-lg">
                    <span>🛡️</span>
                    Reliability & Resilience
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <div>
                        <strong>Uptime:</strong> Improved from 99.5% to 99.95%
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <div>
                        <strong>MTTR:</strong> Mean time to recovery reduced by 70%
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <div>
                        <strong>Blast Radius:</strong> Service failures now isolated to single domain
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <div>
                        <strong>Rollback Time:</strong> Instant rollback vs. 2-hour monolith revert
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <div>
                        <strong>Incident Frequency:</strong> 50% reduction in production incidents
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Challenges Overcome */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-orange-600">🏔️</span>
                Challenges Overcome
              </h2>

              <div className="space-y-4">
                {[
                  {
                    challenge: 'Vendor System Black Box',
                    description: 'Proprietary vendor code with no documentation',
                    solution: 'Reverse-engineered through extensive testing and observation. Built comprehensive test suite to validate parity.',
                    color: 'red'
                  },
                  {
                    challenge: 'Complex Calculation Logic',
                    description: 'Deeply nested VaR/CVaR algorithms with 15 years of business rules',
                    solution: 'Extracted domain logic incrementally. Parallel running for 3 months to validate results matched exactly.',
                    color: 'orange'
                  },
                  {
                    challenge: 'Data Consistency',
                    description: 'Maintaining consistency during dual-write period',
                    solution: 'Implemented event sourcing with Kafka. Reconciliation jobs flagged discrepancies for manual review.',
                    color: 'yellow'
                  },
                  {
                    challenge: 'Team Resistance',
                    description: 'Development team comfortable with monolith, skeptical of microservices',
                    solution: 'Extensive training, pair programming, and gradual transition. Demonstrated early wins to build confidence.',
                    color: 'green'
                  },
                  {
                    challenge: 'Performance Concerns',
                    description: 'Network latency between services could degrade performance',
                    solution: 'Aggressive caching (Redis), async communication, and database optimization. Achieved 40% performance gain.',
                    color: 'blue'
                  },
                  {
                    challenge: 'Testing Complexity',
                    description: 'Integration testing across 6 services vs. single monolith',
                    solution: 'Contract testing with Pact, testcontainers for local testing, comprehensive E2E suite.',
                    color: 'purple'
                  }
                ].map((item, index) => (
                  <div key={index} className={`bg-${item.color}-50 p-5 rounded-xl border-l-4 border-${item.color}-500`}>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h3 className={`font-bold text-${item.color}-900 mb-2`}>Challenge</h3>
                        <p className="text-sm text-gray-700">{item.challenge}</p>
                        <p className="text-xs text-gray-600 mt-1 italic">{item.description}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className={`font-bold text-${item.color}-900 mb-2`}>Solution</h3>
                        <p className="text-sm text-gray-700">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lessons Learned */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-indigo-600">💡</span>
                Lessons Learned
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                    <span>✅</span>
                    What Worked Well
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <div><strong>Strangler Pattern:</strong> Zero downtime migration was a huge win</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <div><strong>Domain-Driven Design:</strong> Clear boundaries made decomposition straightforward</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <div><strong>Event Sourcing:</strong> Kafka made data sync reliable and traceable</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <div><strong>Feature Flags:</strong> Enabled instant rollback and gradual rollout</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <div><strong>Comprehensive Testing:</strong> Caught issues before production</div>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                    <span>⚠️</span>
                    What We'd Do Differently
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <div><strong>Data Migration Earlier:</strong> Should have started backfilling data sooner</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <div><strong>More Observability:</strong> Distributed tracing from day 1, not added later</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <div><strong>Contract Testing:</strong> Implement Pact earlier to avoid integration issues</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <div><strong>Chaos Engineering:</strong> Test failure scenarios more thoroughly upfront</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <div><strong>Team Training:</strong> More upfront training on microservices patterns</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Future Roadmap */}
            <div style={{ backgroundColor: colors.bgSecondary }} className="rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-cyan-600">🔮</span>
                Future Roadmap
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    phase: 'Q2 2024',
                    title: 'ML Integration',
                    items: [
                      'ML-based risk prediction models',
                      'Anomaly detection service',
                      'Automated scenario generation'
                    ],
                    color: 'blue'
                  },
                  {
                    phase: 'Q3 2024',
                    title: 'Advanced Analytics',
                    items: [
                      'Real-time streaming analytics',
                      'Enhanced CVaR algorithms',
                      'Multi-asset correlation engine'
                    ],
                    color: 'green'
                  },
                  {
                    phase: 'Q4 2024',
                    title: 'Platform Enhancement',
                    items: [
                      'GraphQL API layer',
                      'WebSocket real-time updates',
                      'Mobile app support'
                    ],
                    color: 'purple'
                  }
                ].map((item, index) => (
                  <div key={index} className={`bg-${item.color}-50 p-6 rounded-xl border-2 border-${item.color}-200`}>
                    <div className={`text-xs font-bold text-${item.color}-600 mb-2`}>{item.phase}</div>
                    <h3 className={`font-bold text-${item.color}-900 mb-4 text-lg`}>{item.title}</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {item.items.map((i, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`text-${item.color}-500 mt-0.5`}>•</span>
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Summary */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <span>🎉</span>
                Migration Success Summary
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3">Key Achievements</h3>
                  <ul className="space-y-2">
                    <li>✓ 18-month migration with zero downtime</li>
                    <li>✓ 40% performance improvement</li>
                    <li>✓ $500K annual cost savings</li>
                    <li>✓ Eliminated vendor dependencies</li>
                    <li>✓ 6x increase in deployment frequency</li>
                    <li>✓ 99.95% uptime achieved</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Business Impact</h3>
                  <p className="text-white/90 leading-relaxed">
                    Successfully transformed a monolithic VaR/CVaR system into a modern, scalable microservices architecture. The migration enabled faster innovation, reduced costs, improved performance, and positioned the platform for future growth. Most importantly, we eliminated the expensive vendor dependency and gained full control over our risk calculation systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

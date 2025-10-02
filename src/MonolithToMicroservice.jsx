import { useState } from 'react'

export default function MonolithToMicroservice({ onBack }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#4f46e5'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6366f1'}
        >
          ← Back
        </button>
      </div>

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        Monolith to Microservice Migration
      </h1>

      <div style={{
        backgroundColor: '#f0f9ff',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        marginBottom: '2rem',
        borderLeft: '4px solid #0ea5e9'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#0c4a6e' }}>
          Project Overview
        </h2>
        <p style={{ color: '#075985', lineHeight: '1.6' }}>
          Decomposed a monolithic VaR/CVaR (Value at Risk / Conditional Value at Risk) calculation system into microservices
          using the <strong>Strangler Fig Pattern</strong>. Successfully decommissioned a legacy vendor system by
          incrementally migrating functionality to a modern, domain-driven microservices architecture.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Migration Architecture
        </h2>
        <svg viewBox="0 0 900 550" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem auto', display: 'block', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: 'white' }}>
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
          <rect x="50" y="150" width="200" height="250" fill="url(#monolithGrad)" stroke="#dc2626" strokeWidth="3" rx="8" />
          <text x="150" y="185" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">Legacy VaR/CVaR</text>
          <text x="150" y="205" fontSize="14" fill="white" textAnchor="middle">Monolith</text>
          <line x1="60" y1="215" x2="240" y2="215" stroke="white" strokeWidth="2" />

          <text x="150" y="240" fontSize="13" fill="white" textAnchor="middle">📊 Risk Calculation</text>
          <text x="150" y="265" fontSize="13" fill="white" textAnchor="middle">💾 Data Management</text>
          <text x="150" y="290" fontSize="13" fill="white" textAnchor="middle">📈 Portfolio Analysis</text>
          <text x="150" y="315" fontSize="13" fill="white" textAnchor="middle">🔍 Scenario Engine</text>
          <text x="150" y="340" fontSize="13" fill="white" textAnchor="middle">📋 Reporting</text>
          <text x="150" y="365" fontSize="13" fill="white" textAnchor="middle">⚙️ Vendor System</text>
          <text x="150" y="385" fontSize="11" fill="#fee2e2" textAnchor="middle" fontStyle="italic">Tightly Coupled</text>

          {/* Strangler Fig Facade */}
          <rect x="320" y="180" width="160" height="190" fill="url(#stranglerGrad)" stroke="#d97706" strokeWidth="3" rx="8" />
          <text x="400" y="210" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Strangler Facade</text>
          <text x="400" y="230" fontSize="12" fill="white" textAnchor="middle">(API Gateway)</text>
          <line x1="330" y1="240" x2="470" y2="240" stroke="white" strokeWidth="1" />

          <text x="400" y="265" fontSize="12" fill="white" textAnchor="middle">Request Routing</text>
          <text x="400" y="285" fontSize="12" fill="white" textAnchor="middle">↓</text>
          <text x="400" y="305" fontSize="11" fill="#fef3c7" textAnchor="middle">Old → Monolith</text>
          <text x="400" y="325" fontSize="11" fill="#fef3c7" textAnchor="middle">New → Microservices</text>
          <text x="400" y="350" fontSize="11" fill="white" textAnchor="middle" fontWeight="600">Incremental Migration</text>

          {/* Arrow from Monolith to Facade */}
          <path d="M 250 275 L 320 275" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowMigration)" />

          {/* Microservices */}
          <g>
            <rect x="550" y="50" width="140" height="70" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
            <text x="620" y="75" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Risk Calculation</text>
            <text x="620" y="92" fontSize="11" fill="white" textAnchor="middle">Service</text>
            <text x="620" y="108" fontSize="10" fill="#d1fae5" textAnchor="middle">✓ Migrated</text>
          </g>

          <g>
            <rect x="720" y="50" width="140" height="70" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
            <text x="790" y="75" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Portfolio</text>
            <text x="790" y="92" fontSize="11" fill="white" textAnchor="middle">Service</text>
            <text x="790" y="108" fontSize="10" fill="#d1fae5" textAnchor="middle">✓ Migrated</text>
          </g>

          <g>
            <rect x="550" y="145" width="140" height="70" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
            <text x="620" y="170" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Data</text>
            <text x="620" y="187" fontSize="11" fill="white" textAnchor="middle">Service</text>
            <text x="620" y="203" fontSize="10" fill="#d1fae5" textAnchor="middle">✓ Migrated</text>
          </g>

          <g>
            <rect x="720" y="145" width="140" height="70" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
            <text x="790" y="170" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Scenario Engine</text>
            <text x="790" y="187" fontSize="11" fill="white" textAnchor="middle">Service</text>
            <text x="790" y="203" fontSize="10" fill="#d1fae5" textAnchor="middle">✓ Migrated</text>
          </g>

          <g>
            <rect x="550" y="240" width="140" height="70" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
            <text x="620" y="265" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Reporting</text>
            <text x="620" y="282" fontSize="11" fill="white" textAnchor="middle">Service</text>
            <text x="620" y="298" fontSize="10" fill="#d1fae5" textAnchor="middle">✓ Migrated</text>
          </g>

          <g>
            <rect x="720" y="240" width="140" height="70" fill="url(#microserviceGrad)" stroke="#059669" strokeWidth="2" rx="6" />
            <text x="790" y="265" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">CVaR Analytics</text>
            <text x="790" y="282" fontSize="11" fill="white" textAnchor="middle">Service</text>
            <text x="790" y="298" fontSize="10" fill="#d1fae5" textAnchor="middle">✓ Migrated</text>
          </g>

          {/* Arrows from Facade to Microservices */}
          <path d="M 480 220 L 550 85" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowMigration)" />
          <path d="M 480 235 L 550 180" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowMigration)" />
          <path d="M 480 250 L 550 275" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowMigration)" />

          {/* Timeline */}
          <rect x="50" y="430" width="810" height="80" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" rx="6" />
          <text x="455" y="455" fontSize="14" fontWeight="bold" fill="#374151" textAnchor="middle">Migration Timeline</text>

          <text x="60" y="480" fontSize="12" fill="#6b7280" fontWeight="600">Phase 1:</text>
          <text x="60" y="497" fontSize="11" fill="#6b7280">Setup Strangler Facade</text>

          <text x="240" y="480" fontSize="12" fill="#6b7280" fontWeight="600">Phase 2:</text>
          <text x="240" y="497" fontSize="11" fill="#6b7280">Migrate by Domain</text>

          <text x="430" y="480" fontSize="12" fill="#6b7280" fontWeight="600">Phase 3:</text>
          <text x="430" y="497" fontSize="11" fill="#6b7280">Decommission Vendor</text>

          <text x="640" y="480" fontSize="12" fill="#6b7280" fontWeight="600">Phase 4:</text>
          <text x="640" y="497" fontSize="11" fill="#6b7280">Remove Monolith</text>
        </svg>
      </div>

      {/* Key Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{
          backgroundColor: '#fef3c7',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          borderLeft: '4px solid #f59e0b'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#92400e' }}>
            🎯 Strangler Fig Pattern
          </h3>
          <ul style={{ color: '#78350f', lineHeight: '1.8', marginLeft: '1.5rem' }}>
            <li>API Gateway routes to old or new system</li>
            <li>Incremental migration by domain boundary</li>
            <li>Zero downtime during transition</li>
            <li>Gradual decommissioning of monolith</li>
            <li>Risk mitigation through parallel running</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: '#dbeafe',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          borderLeft: '4px solid #3b82f6'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1e3a8a' }}>
            📊 VaR/CVaR System
          </h3>
          <ul style={{ color: '#1e40af', lineHeight: '1.8', marginLeft: '1.5rem' }}>
            <li>Value at Risk calculations</li>
            <li>Conditional Value at Risk analytics</li>
            <li>Portfolio risk assessment</li>
            <li>Monte Carlo simulations</li>
            <li>Stress testing scenarios</li>
            <li>Real-time risk reporting</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: '#dcfce7',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          borderLeft: '4px solid #10b981'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#065f46' }}>
            🏗️ Domain Decomposition
          </h3>
          <ul style={{ color: '#047857', lineHeight: '1.8', marginLeft: '1.5rem' }}>
            <li>Risk Calculation Service</li>
            <li>Portfolio Management Service</li>
            <li>Data Aggregation Service</li>
            <li>Scenario Engine Service</li>
            <li>Reporting Service</li>
            <li>CVaR Analytics Service</li>
          </ul>
        </div>
      </div>

      {/* Technical Implementation */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Technical Implementation
        </h2>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          marginBottom: '1rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
            Phase 1: Strangler Facade Setup
          </h3>
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: '#1f2937',
            overflowX: 'auto'
          }}>
            <div>• Deployed API Gateway (Kong/NGINX) as facade layer</div>
            <div>• Configured routing rules: /api/risk/* → Monolith (initially)</div>
            <div>• Implemented request/response logging and monitoring</div>
            <div>• Set up feature flags for gradual traffic shifting</div>
            <div>• Established observability with distributed tracing</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          marginBottom: '1rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
            Phase 2: Domain-by-Domain Migration
          </h3>
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: '#1f2937',
            overflowX: 'auto'
          }}>
            <div>1. Extract Risk Calculation domain:</div>
            <div>   - Created Risk Calculation microservice</div>
            <div>   - Migrated calculation algorithms and models</div>
            <div>   - Updated facade: /api/risk/calculate → New Service</div>
            <div>   - Ran parallel for validation (shadow mode)</div>
            <div></div>
            <div>2. Migrate Portfolio domain:</div>
            <div>   - Separated portfolio data and logic</div>
            <div>   - Implemented event-driven sync with Event Bus</div>
            <div>   - Updated routing progressively</div>
            <div></div>
            <div>3. Continue with remaining domains...</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          marginBottom: '1rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
            Phase 3: Vendor System Decommissioning
          </h3>
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: '#1f2937',
            overflowX: 'auto'
          }}>
            <div>• Identified vendor system dependencies in monolith</div>
            <div>• Replicated critical vendor functionality in microservices</div>
            <div>• Migrated data from vendor DB to new services</div>
            <div>• Ran validation period with dual systems</div>
            <div>• Gradually reduced vendor system usage to 0%</div>
            <div>• Official vendor decommissioning and license termination</div>
          </div>
        </div>
      </div>

      {/* Results and Benefits */}
      <div style={{
        backgroundColor: '#ecfdf5',
        padding: '2rem',
        borderRadius: '0.75rem',
        border: '2px solid #10b981'
      }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#065f46' }}>
          Results & Benefits
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#047857', marginBottom: '0.5rem' }}>
              ⚡ Performance
            </h4>
            <ul style={{ color: '#065f46', marginLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>40% reduction in calculation time</li>
              <li>Independent scaling per service</li>
              <li>Optimized resource utilization</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#047857', marginBottom: '0.5rem' }}>
              💰 Cost Savings
            </h4>
            <ul style={{ color: '#065f46', marginLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Eliminated vendor licensing fees</li>
              <li>Reduced infrastructure costs</li>
              <li>Lower maintenance overhead</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#047857', marginBottom: '0.5rem' }}>
              🚀 Agility
            </h4>
            <ul style={{ color: '#065f46', marginLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Faster feature deployment</li>
              <li>Independent team ownership</li>
              <li>Technology flexibility per service</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#047857', marginBottom: '0.5rem' }}>
              🛡️ Resilience
            </h4>
            <ul style={{ color: '#065f46', marginLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Isolated failure domains</li>
              <li>Circuit breaker patterns</li>
              <li>Better disaster recovery</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technologies Used */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Technologies & Patterns
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {[
            'Strangler Fig Pattern',
            'Domain-Driven Design',
            'API Gateway',
            'Spring Boot',
            'Kubernetes',
            'Docker',
            'Event-Driven Architecture',
            'Circuit Breaker',
            'Service Discovery',
            'Distributed Tracing',
            'Feature Flags',
            'Apache Kafka',
            'Redis Cache',
            'PostgreSQL',
            'Prometheus',
            'Grafana'
          ].map((tech, index) => (
            <span
              key={index}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

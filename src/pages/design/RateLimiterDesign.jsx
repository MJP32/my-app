import { useState } from 'react'

function RateLimiterDesign({ onBack }) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f3e8ff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.6rem 1.25rem',
            fontSize: '0.95rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Back to Projects
        </button>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0
        }}>
          ⏱️ Rate Limiter System Design
        </h1>
        <div style={{ width: '140px' }}></div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        padding: '0.75rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        {[
          { id: 'overview', label: 'Overview', icon: '📋' },
          { id: 'algorithms', label: 'Algorithms', icon: '🧮' },
          { id: 'redis', label: 'Redis Implementation', icon: '🔴' },
          { id: 'distributed', label: 'Distributed', icon: '🌐' },
          { id: 'advanced', label: 'Advanced Features', icon: '✨' },
          { id: 'api', label: 'API Endpoints', icon: '🔌' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.6rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: activeTab === tab.id ? '#8b5cf6' : '#f3f4f6',
              color: activeTab === tab.id ? 'white' : '#4b5563',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minHeight: '500px'
      }}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">System Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                Design a distributed rate limiting system that protects APIs from abuse, prevents DDoS attacks,
                ensures fair resource allocation, and maintains system stability. Implement using token bucket
                or sliding window algorithms with Redis for distributed coordination.
              </p>
            </div>

            {/* Scale Metrics */}
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-4 text-purple-800">📊 Scale & Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-purple-600 mb-1">100K</div>
                  <div className="text-sm text-gray-600">Rate limit checks per second</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{'<'} 1ms</div>
                  <div className="text-sm text-gray-600">Rate limit check latency (p95)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-purple-600 mb-1">1M+</div>
                  <div className="text-sm text-gray-600">Unique rate limit keys</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-purple-600 mb-1">99.99%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-purple-600 mb-1">99.9%</div>
                  <div className="text-sm text-gray-600">Availability</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-purple-600 mb-1">10 regions</div>
                  <div className="text-sm text-gray-600">Global deployment</div>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">🎯 Common Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-blue-700 mb-2">API Protection:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Limit requests per user/IP</li>
                    <li>✓ Prevent DDoS attacks</li>
                    <li>✓ Throttle expensive operations</li>
                    <li>✓ Enforce pricing tiers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-700 mb-2">Resource Protection:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Database query limiting</li>
                    <li>✓ Email/SMS quotas</li>
                    <li>✓ Login attempt throttling</li>
                    <li>✓ File upload limits</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-800">⚙️ Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Functional:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Allow N requests per time window</li>
                    <li>✓ Configurable time windows (second, minute, hour, day)</li>
                    <li>✓ Multiple limiting strategies</li>
                    <li>✓ Per-user, per-IP, per-API key limits</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Non-Functional:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Low latency ({'<'}1ms)</li>
                    <li>✓ High throughput (100K+ checks/sec)</li>
                    <li>✓ Fault tolerant (graceful degradation)</li>
                    <li>✓ Horizontally scalable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Endpoints Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* API Overview */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
              <h2 className="text-2xl font-bold mb-4 text-purple-800">🔌 Rate Limiter API Overview</h2>
              <p className="text-gray-700 mb-4">
                RESTful API for checking and enforcing rate limits across your services. Supports multiple limiting strategies and custom rules.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-purple-600 mb-2">Base URL</div>
                  <code className="text-sm text-gray-700">https://api.ratelimiter.com/v1</code>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-purple-600 mb-2">Authentication</div>
                  <code className="text-sm text-gray-700">API Key</code>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-purple-600 mb-2">Latency</div>
                  <code className="text-sm text-gray-700">{'<'} 1ms (p95)</code>
                </div>
              </div>
            </div>

            {/* Rate Limit Check APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">✅ Rate Limit Check APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/check</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Check if request is allowed under rate limit</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Request:</div>
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "key": "user:123:api",
  "limit": 100,
  "window": 60
}`}
                    </pre>
                    <div className="text-xs font-semibold text-gray-700 mt-2 mb-1">Response:</div>
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "allowed": true,
  "remaining": 99,
  "reset_at": 1705753200,
  "retry_after": null
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/check/multi</code>
                  </div>
                  <p className="text-sm text-gray-600">Check multiple rate limits at once</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-700">/status/:key</code>
                  </div>
                  <p className="text-sm text-gray-600">Get current rate limit status for a key</p>
                </div>
              </div>
            </div>

            {/* Rule Management APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">⚙️ Rule Management APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/rules</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Create a new rate limit rule</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "name": "api_user_limit",
  "pattern": "user:*:api",
  "limit": 1000,
  "window": 3600,
  "algorithm": "token_bucket",
  "description": "API requests per user per hour"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-700">/rules</code>
                  </div>
                  <p className="text-sm text-gray-600">List all rate limit rules</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-700">/rules/:ruleId</code>
                  </div>
                  <p className="text-sm text-gray-600">Get rule details</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">PUT</span>
                    <code className="text-sm text-gray-700">/rules/:ruleId</code>
                  </div>
                  <p className="text-sm text-gray-600">Update a rule</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">DELETE</span>
                    <code className="text-sm text-gray-700">/rules/:ruleId</code>
                  </div>
                  <p className="text-sm text-gray-600">Delete a rule</p>
                </div>
              </div>
            </div>

            {/* Override & Exemption APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">🔓 Override & Exemption APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/exemptions</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Create an exemption (whitelist key)</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "key": "user:admin:api",
  "expires_at": "2024-12-31T23:59:59Z",
  "reason": "Admin account"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-700">/exemptions</code>
                  </div>
                  <p className="text-sm text-gray-600">List all exemptions</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/reset</code>
                  </div>
                  <p className="text-sm text-gray-600">Reset rate limit counter for a key</p>
                </div>
              </div>
            </div>

            {/* Analytics APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">📊 Analytics APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-700">/analytics/top-consumers</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Get keys with highest request rates</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "period": "1h",
  "top_consumers": [
    {
      "key": "user:456:api",
      "requests": 8950,
      "rate_limited": 150
    }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-700">/analytics/blocked</code>
                  </div>
                  <p className="text-sm text-gray-600">Get recently blocked requests</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-700">/analytics/metrics</code>
                  </div>
                  <p className="text-sm text-gray-600">Get overall metrics (total requests, blocked rate, avg latency)</p>
                </div>
              </div>
            </div>

            {/* Response Codes */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">📊 HTTP Status Codes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <div className="text-green-400 font-bold">200 OK</div>
                  <div className="text-gray-300 text-sm">Request allowed</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">400 Bad Request</div>
                  <div className="text-gray-300 text-sm">Invalid parameters</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">401 Unauthorized</div>
                  <div className="text-gray-300 text-sm">Invalid API key</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">429 Too Many Requests</div>
                  <div className="text-gray-300 text-sm">Rate limit exceeded</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">503 Service Unavailable</div>
                  <div className="text-gray-300 text-sm">Rate limiter unavailable</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional tabs would go here - continuing from where the previous attempt left off */}
        {activeTab !== 'overview' && activeTab !== 'api' && (
          <div className="text-center text-gray-500 py-8">
            Content for {activeTab} tab coming soon...
          </div>
        )}
      </div>
    </div>
  )
}

export default RateLimiterDesign

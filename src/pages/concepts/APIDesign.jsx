import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function APIDesign({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-orange-700 hover:border-orange-500 text-orange-300 hover:text-orange-200 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🔌 API Design & REST
            </h1>
            <span className="px-3 py-1 bg-orange-900/50 text-orange-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-orange-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Design robust, scalable, and developer-friendly APIs using REST principles and best practices
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-orange-900/30 text-orange-300 rounded-lg text-sm font-medium border border-orange-700">REST</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">HTTP Methods</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Resource-Based</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">Versioning</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'rest', 'design', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-orange-400 bg-orange-900/30 border-b-2 border-orange-500 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'rest' && 'REST Principles'}
              {tab === 'design' && 'Best Practices'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">What is REST?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                REST (Representational State Transfer) is an architectural style for designing networked applications.
                It uses standard HTTP methods and is stateless, scalable, and simple to understand.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                RESTful APIs treat everything as a resource (users, products, orders) identified by URLs,
                and use HTTP verbs (GET, POST, PUT, DELETE) to perform operations on these resources.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">HTTP Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-green-400 mb-3">GET</h3>
                  <p className="text-gray-300 mb-2">Retrieve data without side effects</p>
                  <p className="text-sm text-gray-400">Idempotent, Cacheable, Safe</p>
                  <code className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded mt-2 block">GET /api/users/123</code>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">POST</h3>
                  <p className="text-gray-300 mb-2">Create new resources</p>
                  <p className="text-sm text-gray-400">Not idempotent, Not safe</p>
                  <code className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded mt-2 block">POST /api/users</code>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">PUT</h3>
                  <p className="text-gray-300 mb-2">Update/replace entire resource</p>
                  <p className="text-sm text-gray-400">Idempotent, Not safe</p>
                  <code className="text-xs bg-orange-900/30 text-orange-300 px-2 py-1 rounded mt-2 block">PUT /api/users/123</code>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-purple-400 mb-3">PATCH</h3>
                  <p className="text-gray-300 mb-2">Partially update resource</p>
                  <p className="text-sm text-gray-400">Not idempotent, Not safe</p>
                  <code className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded mt-2 block">PATCH /api/users/123</code>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-red-400 mb-3">DELETE</h3>
                  <p className="text-gray-300 mb-2">Remove resource</p>
                  <p className="text-sm text-gray-400">Idempotent, Not safe</p>
                  <code className="text-xs bg-red-900/30 text-red-300 px-2 py-1 rounded mt-2 block">DELETE /api/users/123</code>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-300 mb-3">HEAD</h3>
                  <p className="text-gray-300 mb-2">Get headers only (no body)</p>
                  <p className="text-sm text-gray-400">Idempotent, Safe</p>
                  <code className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mt-2 block">HEAD /api/users/123</code>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">HTTP Status Codes</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">2xx Success</h3>
                  <p className="text-sm text-gray-300">200 OK, 201 Created, 204 No Content</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-yellow-400 mb-2">3xx Redirection</h3>
                  <p className="text-sm text-gray-300">301 Moved Permanently, 304 Not Modified</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-orange-400 mb-2">4xx Client Errors</h3>
                  <p className="text-sm text-gray-300">400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-red-400 mb-2">5xx Server Errors</h3>
                  <p className="text-sm text-gray-300">500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rest' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">REST Constraints</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-lg mb-3">1. Client-Server Architecture</h3>
                  <p className="text-gray-300">Separation of concerns. Client handles UI, server handles data storage and business logic.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-lg mb-3">2. Stateless</h3>
                  <p className="text-gray-300">Each request contains all information needed. Server doesn't store client state between requests.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-lg mb-3">3. Cacheable</h3>
                  <p className="text-gray-300">Responses explicitly indicate if they can be cached to improve performance.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-lg mb-3">4. Uniform Interface</h3>
                  <p className="text-gray-300">Standard methods and resource identification. Resources vs representations.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-lg mb-3">5. Layered System</h3>
                  <p className="text-gray-300">Client can't tell if connected directly to server or through intermediaries (load balancer, cache).</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Resource Design</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700 mb-4">
                <h3 className="font-bold text-green-400 mb-3">Good Resource URLs:</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <code className="text-gray-300">GET /users</code>
                    <span className="text-gray-400">- List users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <code className="text-gray-300">GET /users/123</code>
                    <span className="text-gray-400">- Get specific user</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <code className="text-gray-300">GET /users/123/orders</code>
                    <span className="text-gray-400">- User's orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <code className="text-gray-300">POST /users/123/orders</code>
                    <span className="text-gray-400">- Create order</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                <h3 className="font-bold text-red-400 mb-3">Poor Resource URLs (Avoid):</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">✗</span>
                    <code className="text-gray-300">GET /getUsers</code>
                    <span className="text-gray-400">- Don't use verbs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">✗</span>
                    <code className="text-gray-300">POST /users/delete/123</code>
                    <span className="text-gray-400">- Use DELETE method</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">✗</span>
                    <code className="text-gray-300">GET /api/v1/user</code>
                    <span className="text-gray-400">- Use plural nouns</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Idempotency</h2>
              <p className="text-gray-300 text-lg mb-6">
                An operation is idempotent if performing it multiple times has the same effect as performing it once.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Idempotent Methods</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• GET - Read same data repeatedly</li>
                    <li>• PUT - Set to same value repeatedly</li>
                    <li>• DELETE - Delete already deleted resource</li>
                    <li>• HEAD - Same as GET for headers</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Non-Idempotent Methods</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• POST - Creates duplicate resources</li>
                    <li>• PATCH - Depends on implementation</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-2">Use idempotency keys for POST when needed</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">API Versioning</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-3">URI Versioning</h3>
                  <code className="text-sm bg-orange-900/30 text-orange-300 px-3 py-2 rounded block mb-2">/api/v1/users</code>
                  <p className="text-gray-300 text-sm">Simple, visible, easy to route. Most common approach.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-3">Header Versioning</h3>
                  <code className="text-sm bg-orange-900/30 text-orange-300 px-3 py-2 rounded block mb-2">Accept: application/vnd.api+json;version=1</code>
                  <p className="text-gray-300 text-sm">Cleaner URLs, but less visible to developers.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-3">Query Parameter</h3>
                  <code className="text-sm bg-orange-900/30 text-orange-300 px-3 py-2 rounded block mb-2">/api/users?version=1</code>
                  <p className="text-gray-300 text-sm">Easy to add, but can clutter query params.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Pagination</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-3">Offset-Based Pagination</h3>
                <code className="text-sm bg-blue-900/30 text-blue-300 px-3 py-2 rounded block mb-2">GET /users?page=2&limit=20</code>
                <p className="text-gray-300 mb-3">Simple but can skip/duplicate items if data changes.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                <h3 className="font-bold text-blue-400 mb-3">Cursor-Based Pagination</h3>
                <code className="text-sm bg-blue-900/30 text-blue-300 px-3 py-2 rounded block mb-2">GET /users?cursor=eyJpZCI6MTIzfQ==&limit=20</code>
                <p className="text-gray-300">More reliable for real-time data. Used by Facebook, Twitter APIs.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Filtering, Sorting, Searching</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Filtering</h3>
                  <code className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">GET /users?status=active&role=admin</code>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Sorting</h3>
                  <code className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">GET /users?sort=-created_at,name</code>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Field Selection</h3>
                  <code className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">GET /users?fields=id,name,email</code>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">Full-Text Search</h3>
                  <code className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">GET /users?q=john+doe</code>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Error Handling</h2>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm">
                <div className="text-gray-400 mb-2">// Consistent error response format</div>
                <div>{'{'}</div>
                <div className="ml-4">"error": {'{'}</div>
                <div className="ml-8">"code": "USER_NOT_FOUND",</div>
                <div className="ml-8">"message": "User with ID 123 not found",</div>
                <div className="ml-8">"details": {'{'}</div>
                <div className="ml-12">"userId": 123</div>
                <div className="ml-8">{'}'}</div>
                <div className="ml-4">{'}'},</div>
                <div className="ml-4">"status": 404</div>
                <div>{'}'}</div>
              </div>
              <div className="mt-4 bg-gray-800 p-4 rounded-xl border border-purple-700">
                <h3 className="font-bold text-purple-400 mb-2">Best Practices:</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Use appropriate HTTP status codes</li>
                  <li>• Include machine-readable error codes</li>
                  <li>• Provide helpful error messages</li>
                  <li>• Don't expose internal details</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-2xl p-8 border-2 border-yellow-700">
              <h2 className="text-3xl font-bold text-white mb-6">Rate Limiting</h2>
              <p className="text-gray-300 mb-4">Protect your API from abuse and ensure fair usage.</p>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm mb-4">
                <div className="text-gray-400 mb-2">// Rate limit headers</div>
                <div>X-RateLimit-Limit: 1000</div>
                <div>X-RateLimit-Remaining: 999</div>
                <div>X-RateLimit-Reset: 1634567890</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-yellow-700">
                <h3 className="font-bold text-yellow-400 mb-2">Common Strategies:</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Fixed window: 1000 requests per hour</li>
                  <li>• Sliding window: More granular than fixed</li>
                  <li>• Token bucket: Allows bursts</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Real-World API Examples</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Stripe API</h3>
                  <p className="text-gray-300 mb-2">Clean, intuitive REST API for payments with excellent documentation</p>
                  <code className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">POST /v1/charges</code>
                  <p className="text-sm text-gray-400 mt-2">Idempotency keys, clear errors, consistent patterns</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">GitHub API</h3>
                  <p className="text-gray-300 mb-2">Comprehensive REST API with HATEOAS links and pagination</p>
                  <code className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">GET /repos/:owner/:repo/issues</code>
                  <p className="text-sm text-gray-400 mt-2">Link headers for pagination, ETag for caching</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Twilio API</h3>
                  <p className="text-gray-300 mb-2">Simple, well-documented API for communications</p>
                  <code className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">POST /2010-04-01/Accounts/:AccountSid/Messages.json</code>
                  <p className="text-sm text-gray-400 mt-2">Date-based versioning, clear resource hierarchy</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Complete CRUD Example</h2>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm">
                <div className="mb-3">
                  <div className="text-green-400">// List all users</div>
                  <div>GET /api/v1/users?page=1&limit=20</div>
                </div>
                <div className="mb-3">
                  <div className="text-green-400">// Get single user</div>
                  <div>GET /api/v1/users/123</div>
                </div>
                <div className="mb-3">
                  <div className="text-green-400">// Create user</div>
                  <div>POST /api/v1/users</div>
                  <div className="text-blue-400">Body: {'{'} "name": "John", "email": "john@example.com" {'}'}</div>
                </div>
                <div className="mb-3">
                  <div className="text-green-400">// Update user (full replacement)</div>
                  <div>PUT /api/v1/users/123</div>
                  <div className="text-blue-400">Body: {'{'} "name": "John Doe", "email": "john@example.com" {'}'}</div>
                </div>
                <div className="mb-3">
                  <div className="text-green-400">// Partial update</div>
                  <div>PATCH /api/v1/users/123</div>
                  <div className="text-blue-400">Body: {'{'} "email": "newemail@example.com" {'}'}</div>
                </div>
                <div>
                  <div className="text-green-400">// Delete user</div>
                  <div>DELETE /api/v1/users/123</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

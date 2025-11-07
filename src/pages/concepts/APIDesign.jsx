import React, { useState } from 'react';

export default function APIDesign({ onBack }) {
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
              🔌 API Design & REST
            </h1>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-bold uppercase tracking-wide">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-6 font-light">
            Design robust, scalable, and developer-friendly APIs using REST principles and best practices
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100">REST</span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">HTTP Methods</span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">Resource-Based</span>
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">Versioning</span>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-0">
          {['overview', 'rest', 'design', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-orange-600 bg-orange-50 border-b-2 border-orange-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is REST?</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                REST (Representational State Transfer) is an architectural style for designing networked applications.
                It uses standard HTTP methods and is stateless, scalable, and simple to understand.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                RESTful APIs treat everything as a resource (users, products, orders) identified by URLs,
                and use HTTP verbs (GET, POST, PUT, DELETE) to perform operations on these resources.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">HTTP Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">GET</h3>
                  <p className="text-gray-700 mb-2">Retrieve data without side effects</p>
                  <p className="text-sm text-gray-600">Idempotent, Cacheable, Safe</p>
                  <code className="text-xs bg-green-50 px-2 py-1 rounded mt-2 block">GET /api/users/123</code>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">POST</h3>
                  <p className="text-gray-700 mb-2">Create new resources</p>
                  <p className="text-sm text-gray-600">Not idempotent, Not safe</p>
                  <code className="text-xs bg-blue-50 px-2 py-1 rounded mt-2 block">POST /api/users</code>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-700 mb-3">PUT</h3>
                  <p className="text-gray-700 mb-2">Update/replace entire resource</p>
                  <p className="text-sm text-gray-600">Idempotent, Not safe</p>
                  <code className="text-xs bg-orange-50 px-2 py-1 rounded mt-2 block">PUT /api/users/123</code>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">PATCH</h3>
                  <p className="text-gray-700 mb-2">Partially update resource</p>
                  <p className="text-sm text-gray-600">Not idempotent, Not safe</p>
                  <code className="text-xs bg-purple-50 px-2 py-1 rounded mt-2 block">PATCH /api/users/123</code>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-red-700 mb-3">DELETE</h3>
                  <p className="text-gray-700 mb-2">Remove resource</p>
                  <p className="text-sm text-gray-600">Idempotent, Not safe</p>
                  <code className="text-xs bg-red-50 px-2 py-1 rounded mt-2 block">DELETE /api/users/123</code>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">HEAD</h3>
                  <p className="text-gray-700 mb-2">Get headers only (no body)</p>
                  <p className="text-sm text-gray-600">Idempotent, Safe</p>
                  <code className="text-xs bg-gray-50 px-2 py-1 rounded mt-2 block">HEAD /api/users/123</code>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">HTTP Status Codes</h2>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">2xx Success</h3>
                  <p className="text-sm text-gray-700">200 OK, 201 Created, 204 No Content</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-yellow-700 mb-2">3xx Redirection</h3>
                  <p className="text-sm text-gray-700">301 Moved Permanently, 304 Not Modified</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-orange-700 mb-2">4xx Client Errors</h3>
                  <p className="text-sm text-gray-700">400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-red-700 mb-2">5xx Server Errors</h3>
                  <p className="text-sm text-gray-700">500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rest' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">REST Constraints</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 text-lg mb-3">1. Client-Server Architecture</h3>
                  <p className="text-gray-700">Separation of concerns. Client handles UI, server handles data storage and business logic.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 text-lg mb-3">2. Stateless</h3>
                  <p className="text-gray-700">Each request contains all information needed. Server doesn't store client state between requests.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 text-lg mb-3">3. Cacheable</h3>
                  <p className="text-gray-700">Responses explicitly indicate if they can be cached to improve performance.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 text-lg mb-3">4. Uniform Interface</h3>
                  <p className="text-gray-700">Standard methods and resource identification. Resources vs representations.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 text-lg mb-3">5. Layered System</h3>
                  <p className="text-gray-700">Client can't tell if connected directly to server or through intermediaries (load balancer, cache).</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Resource Design</h2>
              <div className="bg-white p-6 rounded-xl border border-green-100 mb-4">
                <h3 className="font-bold text-green-700 mb-3">Good Resource URLs:</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <code className="text-gray-700">GET /users</code>
                    <span className="text-gray-500">- List users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <code className="text-gray-700">GET /users/123</code>
                    <span className="text-gray-500">- Get specific user</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <code className="text-gray-700">GET /users/123/orders</code>
                    <span className="text-gray-500">- User's orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <code className="text-gray-700">POST /users/123/orders</code>
                    <span className="text-gray-500">- Create order</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-red-100">
                <h3 className="font-bold text-red-700 mb-3">Poor Resource URLs (Avoid):</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    <code className="text-gray-700">GET /getUsers</code>
                    <span className="text-gray-500">- Don't use verbs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    <code className="text-gray-700">POST /users/delete/123</code>
                    <span className="text-gray-500">- Use DELETE method</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    <code className="text-gray-700">GET /api/v1/user</code>
                    <span className="text-gray-500">- Use plural nouns</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Idempotency</h2>
              <p className="text-gray-700 text-lg mb-6">
                An operation is idempotent if performing it multiple times has the same effect as performing it once.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Idempotent Methods</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• GET - Read same data repeatedly</li>
                    <li>• PUT - Set to same value repeatedly</li>
                    <li>• DELETE - Delete already deleted resource</li>
                    <li>• HEAD - Same as GET for headers</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-orange-100">
                  <h3 className="font-bold text-orange-700 mb-2">Non-Idempotent Methods</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• POST - Creates duplicate resources</li>
                    <li>• PATCH - Depends on implementation</li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-2">Use idempotency keys for POST when needed</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">API Versioning</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-orange-100">
                  <h3 className="font-bold text-orange-700 mb-3">URI Versioning</h3>
                  <code className="text-sm bg-orange-50 px-3 py-2 rounded block mb-2">/api/v1/users</code>
                  <p className="text-gray-700 text-sm">Simple, visible, easy to route. Most common approach.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-orange-100">
                  <h3 className="font-bold text-orange-700 mb-3">Header Versioning</h3>
                  <code className="text-sm bg-orange-50 px-3 py-2 rounded block mb-2">Accept: application/vnd.api+json;version=1</code>
                  <p className="text-gray-700 text-sm">Cleaner URLs, but less visible to developers.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-orange-100">
                  <h3 className="font-bold text-orange-700 mb-3">Query Parameter</h3>
                  <code className="text-sm bg-orange-50 px-3 py-2 rounded block mb-2">/api/users?version=1</code>
                  <p className="text-gray-700 text-sm">Easy to add, but can clutter query params.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Pagination</h2>
              <div className="bg-white p-6 rounded-xl border border-blue-100 mb-4">
                <h3 className="font-bold text-blue-700 mb-3">Offset-Based Pagination</h3>
                <code className="text-sm bg-blue-50 px-3 py-2 rounded block mb-2">GET /users?page=2&limit=20</code>
                <p className="text-gray-700 mb-3">Simple but can skip/duplicate items if data changes.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-700 mb-3">Cursor-Based Pagination</h3>
                <code className="text-sm bg-blue-50 px-3 py-2 rounded block mb-2">GET /users?cursor=eyJpZCI6MTIzfQ==&limit=20</code>
                <p className="text-gray-700">More reliable for real-time data. Used by Facebook, Twitter APIs.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Filtering, Sorting, Searching</h2>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Filtering</h3>
                  <code className="text-xs bg-green-50 px-2 py-1 rounded">GET /users?status=active&role=admin</code>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Sorting</h3>
                  <code className="text-xs bg-green-50 px-2 py-1 rounded">GET /users?sort=-created_at,name</code>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Field Selection</h3>
                  <code className="text-xs bg-green-50 px-2 py-1 rounded">GET /users?fields=id,name,email</code>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Full-Text Search</h3>
                  <code className="text-xs bg-green-50 px-2 py-1 rounded">GET /users?q=john+doe</code>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Error Handling</h2>
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
              <div className="mt-4 bg-white p-4 rounded-xl border border-purple-100">
                <h3 className="font-bold text-purple-700 mb-2">Best Practices:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Use appropriate HTTP status codes</li>
                  <li>• Include machine-readable error codes</li>
                  <li>• Provide helpful error messages</li>
                  <li>• Don't expose internal details</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Rate Limiting</h2>
              <p className="text-gray-700 mb-4">Protect your API from abuse and ensure fair usage.</p>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm mb-4">
                <div className="text-gray-400 mb-2">// Rate limit headers</div>
                <div>X-RateLimit-Limit: 1000</div>
                <div>X-RateLimit-Remaining: 999</div>
                <div>X-RateLimit-Reset: 1634567890</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-yellow-100">
                <h3 className="font-bold text-yellow-700 mb-2">Common Strategies:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
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
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World API Examples</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">Stripe API</h3>
                  <p className="text-gray-700 mb-2">Clean, intuitive REST API for payments with excellent documentation</p>
                  <code className="text-xs bg-green-50 px-2 py-1 rounded">POST /v1/charges</code>
                  <p className="text-sm text-gray-500 mt-2">Idempotency keys, clear errors, consistent patterns</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">GitHub API</h3>
                  <p className="text-gray-700 mb-2">Comprehensive REST API with HATEOAS links and pagination</p>
                  <code className="text-xs bg-green-50 px-2 py-1 rounded">GET /repos/:owner/:repo/issues</code>
                  <p className="text-sm text-gray-500 mt-2">Link headers for pagination, ETag for caching</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 text-xl mb-2">Twilio API</h3>
                  <p className="text-gray-700 mb-2">Simple, well-documented API for communications</p>
                  <code className="text-xs bg-green-50 px-2 py-1 rounded">POST /2010-04-01/Accounts/:AccountSid/Messages.json</code>
                  <p className="text-sm text-gray-500 mt-2">Date-based versioning, clear resource hierarchy</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete CRUD Example</h2>
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

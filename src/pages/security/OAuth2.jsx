import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// OAuth 2.0 Authorization Code Flow Diagram
const OAuth2FlowDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">OAuth 2.0 Authorization Code Flow</text>

    <rect x="30" y="45" width="90" height="45" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="75" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Client App</text>

    <rect x="150" y="45" width="120" height="45" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="210" y="65" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">1. Auth Request</text>
    <text x="210" y="80" textAnchor="middle" fill="#fcd34d" fontSize="7">redirect_uri, scope</text>

    <rect x="300" y="45" width="100" height="45" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="65" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="bold">2. User Login</text>
    <text x="350" y="80" textAnchor="middle" fill="#c4b5fd" fontSize="7">Consent</text>

    <rect x="430" y="45" width="110" height="45" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="485" y="65" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="bold">3. Auth Code</text>
    <text x="485" y="80" textAnchor="middle" fill="#86efac" fontSize="7">code=xyz</text>

    <rect x="570" y="45" width="100" height="45" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="620" y="65" textAnchor="middle" fill="#f472b6" fontSize="8" fontWeight="bold">4. Exchange</text>
    <text x="620" y="80" textAnchor="middle" fill="#fbcfe8" fontSize="7">code + secret</text>

    <rect x="700" y="45" width="80" height="45" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="740" y="65" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="bold">5. Tokens</text>
    <text x="740" y="80" textAnchor="middle" fill="#a5f3fc" fontSize="7">access+refresh</text>

    <path d="M 120 67 L 145 67" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 270 67 L 295 67" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 400 67 L 425 67" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 540 67 L 565 67" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 670 67 L 695 67" stroke="#64748b" strokeWidth="1.5"/>

    <rect x="100" y="110" width="600" height="70" rx="6" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    <text x="400" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Grant Types</text>
    <text x="180" y="150" textAnchor="middle" fill="#60a5fa" fontSize="8">Authorization Code</text>
    <text x="320" y="150" textAnchor="middle" fill="#4ade80" fontSize="8">Client Credentials</text>
    <text x="460" y="150" textAnchor="middle" fill="#fbbf24" fontSize="8">PKCE (mobile/SPA)</text>
    <text x="600" y="150" textAnchor="middle" fill="#f472b6" fontSize="8">Refresh Token</text>
    <text x="400" y="170" textAnchor="middle" fill="#64748b" fontSize="8">{`Implicit & Password grants deprecated in OAuth 2.1`}</text>
  </svg>
)

export default function OAuth2({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'flows', label: '🔄 Grant Types', icon: '🔄' },
    { id: 'implementation', label: '⚙️ Implementation', icon: '⚙️' },
    { id: 'security', label: '🛡️ Security', icon: '🛡️' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 text-white p-6">
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="mb-6 px-6 py-3 bg-gray-800 border border-green-700 text-green-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold flex items-center gap-2"
            >
              <span>←</span>
              <span>Back to Security</span>
            </button>

            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl shadow-2xl p-8 text-white border border-green-700">
              <h1 className="text-4xl font-bold mb-3" style={{
                background: 'linear-gradient(to right, #fca5a5, #ef4444)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>🛡️ OAuth 2.0</h1>
              <p className="text-xl text-gray-300">Modern Authorization Framework</p>
            </div>
          </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        {/* Tabs */}
        <div className="bg-gray-800 rounded-xl shadow-md p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* OAuth 2.0 Flow Diagram */}
              <div className="bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-green-600">
                <OAuth2FlowDiagram />
              </div>
              {/* What is OAuth 2.0 */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">💡</span>
                  What is OAuth 2.0?
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  OAuth 2.0 is an authorization framework (RFC 6749) that enables applications to obtain limited access
                  to user accounts on an HTTP service. It works by delegating user authentication to the service hosting
                  the user account and authorizing third-party applications to access that account.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Industry standard for authorization',
                    'Multiple grant types for different use cases',
                    'Bearer tokens (simpler than signatures)',
                    'Relies on HTTPS for security',
                    'Supports refresh tokens',
                    'Extensible framework (not a protocol)'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-green-900/30 rounded-lg">
                      <span className="text-green-400 font-bold text-sm mt-0.5">{idx + 1}</span>
                      <span className="text-gray-300 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roles */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">👥</span>
                  OAuth 2.0 Roles
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      role: 'Resource Owner',
                      icon: '👤',
                      description: 'The user who owns the data and grants access',
                      example: 'You, when authorizing an app to access your Google Drive',
                      color: 'blue'
                    },
                    {
                      role: 'Client',
                      icon: '📱',
                      description: 'The application requesting access to resources',
                      example: 'Mobile app, SPA, or server-side application',
                      color: 'purple'
                    },
                    {
                      role: 'Authorization Server',
                      icon: '🔐',
                      description: 'Issues access tokens after authentication',
                      example: 'Google\'s OAuth server, Auth0, Okta',
                      color: 'green'
                    },
                    {
                      role: 'Resource Server',
                      icon: '🗄️',
                      description: 'Hosts protected resources, accepts tokens',
                      example: 'Google Drive API, GitHub API',
                      color: 'orange'
                    }
                  ].map((item, index) => (
                    <div key={index} className={`bg-${item.color}-900/30 p-6 rounded-xl border-l-4 border-${item.color}-500`}>
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">{item.icon}</span>
                        <div>
                          <h4 className={`font-bold text-${item.color}-400 text-lg mb-2`}>{item.role}</h4>
                          <p className="text-gray-300 mb-2 text-sm">{item.description}</p>
                          <div className="text-xs text-gray-400 bg-gray-900 p-2 rounded">
                            <strong>Example:</strong> {item.example}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tokens */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎫</span>
                  Token Types
                </h3>

                <div className="space-y-4">
                  <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h4 className="font-bold text-green-400 mb-3 text-lg flex items-center gap-2">
                      <span>✅</span> Access Token
                    </h4>
                    <p className="text-gray-300 mb-3">
                      Short-lived token used to access protected resources. Typically expires in 5-60 minutes.
                    </p>
                    <div className="bg-gray-900 p-3 rounded-lg">
                      <code className="text-green-400 text-xs">
                        Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
                      </code>
                    </div>
                    <div className="mt-3 text-sm text-gray-400">
                      <strong>Format:</strong> Can be JWT (self-contained) or opaque string (requires validation)
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-700">
                    <h4 className="font-bold text-blue-400 mb-3 text-lg flex items-center gap-2">
                      <span>🔄</span> Refresh Token
                    </h4>
                    <p className="text-gray-300 mb-3">
                      Long-lived token used to obtain new access tokens without re-authentication. Typically expires in days/weeks.
                    </p>
                    <div className="bg-gray-900 p-3 rounded-lg">
                      <code className="text-green-400 text-xs">
                        POST /token
                        <br />grant_type=refresh_token&amp;refresh_token=tGzv3JOkF0XG5Qx2TlKWIA
                      </code>
                    </div>
                    <div className="mt-3 text-sm text-gray-400">
                      <strong>Security:</strong> Must be stored securely, can be revoked by authorization server
                    </div>
                  </div>

                  <div className="bg-orange-900/30 p-6 rounded-xl border-2 border-orange-700">
                    <h4 className="font-bold text-orange-400 mb-3 text-lg flex items-center gap-2">
                      <span>🔑</span> ID Token (OpenID Connect)
                    </h4>
                    <p className="text-gray-300 mb-3">
                      JWT containing user identity information. Part of OpenID Connect (built on OAuth 2.0).
                    </p>
                    <div className="bg-gray-900 p-3 rounded-lg">
                      <code className="text-green-400 text-xs">
                        {`{"sub": "user123", "name": "John Doe", "email": "john@example.com"}`}
                      </code>
                    </div>
                    <div className="mt-3 text-sm text-gray-400">
                      <strong>Use Case:</strong> Authentication (who the user is) vs authorization (what they can access)
                    </div>
                  </div>
                </div>
              </div>

              {/* OAuth 2.0 vs 1.0 */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-amber-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔄</span>
                  Key Improvements over OAuth 1.0
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'No cryptographic signatures required',
                    'Bearer tokens - simpler to implement',
                    'Multiple grant types for different scenarios',
                    'Native refresh token support',
                    'Better mobile and SPA support',
                    'Shorter token lifetimes for security',
                    'Extensible framework (vs fixed protocol)',
                    'Widespread adoption and tooling'
                  ].map((improvement, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-green-900/30 rounded-lg">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-gray-300 text-sm">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flows' && (
            <div className="space-y-8">
              {/* Authorization Code Flow */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">1️⃣</span>
                  Authorization Code Flow (Most Secure)
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Best for server-side web applications. The authorization code is exchanged for tokens on the server,
                  keeping client secret secure.
                </p>

                <div className="bg-blue-900/30 p-6 rounded-xl mb-6 border border-blue-700">
                  <h4 className="font-bold text-blue-400 mb-3">Use Cases</h4>
                  <div className="text-sm text-gray-300">
                    ✓ Server-side web apps (Node.js, Java, Python, .NET)
                    <br />✓ Applications that can securely store client secret
                    <br />✓ Most secure flow, recommended for production
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800 border-l-4 border-green-500 p-4 rounded-lg shadow">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                      <div>
                        <strong className="text-white">User → Authorization Request</strong>
                        <div className="text-sm text-gray-400 mt-1">Client redirects user to authorization server</div>
                        <div className="bg-gray-900 p-2 rounded mt-2 text-xs overflow-x-auto">
                          <code className="text-green-400">
                            GET /authorize?response_type=code&amp;client_id=CLIENT_ID&amp;redirect_uri=CALLBACK&amp;scope=read&amp;state=xyz
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 border-l-4 border-blue-500 p-4 rounded-lg shadow">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                      <div>
                        <strong className="text-white">User Authenticates & Grants Permission</strong>
                        <div className="text-sm text-gray-400 mt-1">User logs in and approves access</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 border-l-4 border-purple-500 p-4 rounded-lg shadow">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                      <div>
                        <strong className="text-white">Authorization Server → Authorization Code</strong>
                        <div className="text-sm text-gray-400 mt-1">Redirects back with code</div>
                        <div className="bg-gray-900 p-2 rounded mt-2 text-xs overflow-x-auto">
                          <code className="text-green-400">
                            GET /callback?code=AUTHORIZATION_CODE&amp;state=xyz
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 border-l-4 border-orange-500 p-4 rounded-lg shadow">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">4</div>
                      <div>
                        <strong className="text-white">Client → Token Request (Backend)</strong>
                        <div className="text-sm text-gray-400 mt-1">Exchange code for access token + refresh token</div>
                        <div className="bg-gray-900 p-2 rounded mt-2 text-xs overflow-x-auto">
                          <code className="text-green-400">
                            POST /token
                            <br />grant_type=authorization_code
                            <br />&amp;code=AUTHORIZATION_CODE
                            <br />&amp;redirect_uri=CALLBACK
                            <br />&amp;client_id=CLIENT_ID
                            <br />&amp;client_secret=CLIENT_SECRET
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 border-l-4 border-cyan-500 p-4 rounded-lg shadow">
                    <div className="flex items-start gap-3">
                      <div className="bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">5</div>
                      <div>
                        <strong className="text-white">Authorization Server → Tokens</strong>
                        <div className="text-sm text-gray-400 mt-1">Returns access token and refresh token</div>
                        <div className="bg-gray-900 p-2 rounded mt-2 text-xs overflow-x-auto">
                          <code className="text-green-400">
                            {`{"access_token": "eyJhbGc...", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "tGzv3..."}`}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Credentials Flow */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">2️⃣</span>
                  Client Credentials Flow (Machine-to-Machine)
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Used for server-to-server authentication where no user is involved. Client authenticates with its own credentials.
                </p>

                <div className="bg-purple-900/30 p-6 rounded-xl mb-6 border border-purple-700">
                  <h4 className="font-bold text-purple-400 mb-3">Use Cases</h4>
                  <div className="text-sm text-gray-300">
                    ✓ Microservices communication
                    <br />✓ CLI tools
                    <br />✓ Batch jobs and cron tasks
                    <br />✓ Backend services accessing APIs
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`POST /token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=CLIENT_ID
&client_secret=CLIENT_SECRET
&scope=api:read api:write

Response:
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "api:read api:write"
}`}
                  </pre>
                </div>

                <div className="mt-4 p-4 bg-amber-900/30 rounded-lg border border-amber-700">
                  <strong className="text-amber-400">⚠️ Security Note:</strong>
                  <span className="text-gray-300"> No refresh token issued. Client must request new token when expired. Protect client secret!</span>
                </div>
              </div>

              {/* PKCE Flow */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">3️⃣</span>
                  Authorization Code + PKCE (For Mobile & SPA)
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Proof Key for Code Exchange (PKCE) protects authorization code flow for public clients that can't securely store secrets.
                </p>

                <div className="bg-green-900/30 p-6 rounded-xl mb-6 border border-green-700">
                  <h4 className="font-bold text-green-400 mb-3">Use Cases</h4>
                  <div className="text-sm text-gray-300">
                    ✓ Single Page Applications (React, Vue, Angular)
                    <br />✓ Mobile apps (iOS, Android)
                    <br />✓ Desktop applications
                    <br />✓ Any public client that can't keep secrets
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
                    <h4 className="font-bold text-green-400 mb-2">How PKCE Works</h4>
                    <ol className="space-y-2 text-sm text-gray-300">
                      <li>1. Client generates random <code className="bg-gray-900 px-2 py-1 rounded text-green-400">code_verifier</code> (43-128 characters)</li>
                      <li>2. Client creates <code className="bg-gray-900 px-2 py-1 rounded text-green-400">code_challenge</code> = SHA256(code_verifier)</li>
                      <li>3. Authorization request includes <code className="bg-gray-900 px-2 py-1 rounded text-green-400">code_challenge</code></li>
                      <li>4. Token request includes original <code className="bg-gray-900 px-2 py-1 rounded text-green-400">code_verifier</code></li>
                      <li>5. Server verifies: SHA256(code_verifier) == stored code_challenge</li>
                    </ol>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`// Step 1: Generate code verifier
const codeVerifier = generateRandomString(128);

// Step 2: Create code challenge
const codeChallenge = base64URL(SHA256(codeVerifier));

// Step 3: Authorization request
GET /authorize?
  response_type=code
  &client_id=CLIENT_ID
  &redirect_uri=CALLBACK
  &code_challenge=CODE_CHALLENGE
  &code_challenge_method=S256

// Step 4: Token request (after getting authorization code)
POST /token
grant_type=authorization_code
&code=AUTHORIZATION_CODE
&redirect_uri=CALLBACK
&client_id=CLIENT_ID
&code_verifier=CODE_VERIFIER  // Original verifier`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Implicit Flow (Deprecated) */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-red-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">❌</span>
                  Implicit Flow (Deprecated)
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Returns access token directly in URL fragment. <strong>No longer recommended - use PKCE instead!</strong>
                </p>

                <div className="bg-red-900/30 p-6 rounded-xl border-2 border-red-700">
                  <h4 className="font-bold text-red-400 mb-3">⚠️ Security Issues</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Token exposed in URL (browser history, logs)</li>
                    <li>• No refresh tokens (less secure re-authentication)</li>
                    <li>• Susceptible to token injection attacks</li>
                    <li>• Cannot verify client identity</li>
                  </ul>
                  <div className="mt-4 p-3 bg-gray-900 rounded">
                    <strong className="text-red-400">Recommendation:</strong>
                    <span className="text-gray-300"> Use Authorization Code + PKCE for all SPAs and mobile apps</span>
                  </div>
                </div>
              </div>

              {/* Password Grant (Deprecated) */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-orange-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">⚠️</span>
                  Resource Owner Password Credentials (Legacy)
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  User provides username/password directly to client. <strong>Only for highly trusted applications!</strong>
                </p>

                <div className="bg-orange-900/30 p-6 rounded-xl border border-orange-700">
                  <h4 className="font-bold text-orange-400 mb-3">When to Use (Rarely)</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• First-party apps only (e.g., official mobile app)</li>
                    <li>• Migration from legacy auth systems</li>
                    <li>• When other flows are not feasible</li>
                  </ul>
                  <div className="mt-4 bg-gray-900 p-3 rounded">
                    <div className="bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                      <code className="text-green-400">
                        POST /token
                        <br />grant_type=password&amp;username=user&amp;password=pass&amp;client_id=CLIENT_ID
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'implementation' && (
            <div className="space-y-8">
              {/* Spring Boot Implementation */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">☕</span>
                  Spring Boot OAuth 2.0 Client
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-3">1. Add Dependencies (Maven)</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-3">2. Configure application.yml</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: \${GOOGLE_CLIENT_ID}
            client-secret: \${GOOGLE_CLIENT_SECRET}
            scope:
              - email
              - profile
          github:
            client-id: \${GITHUB_CLIENT_ID}
            client-secret: \${GITHUB_CLIENT_SECRET}
            scope:
              - user:email
              - read:user`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-3">3. Security Configuration</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/login").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
                .failureUrl("/login?error=true")
            );

        return http.build();
    }
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-3">4. Access User Info in Controller</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`@RestController
public class UserController {

    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return principal.getAttributes();
    }

    @GetMapping("/dashboard")
    public String dashboard(@AuthenticationPrincipal OAuth2User principal) {
        String name = principal.getAttribute("name");
        String email = principal.getAttribute("email");
        return "Welcome " + name + " (" + email + ")";
    }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Server */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🗄️</span>
                  Spring Boot OAuth 2.0 Resource Server
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3">1. Add Dependency</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3">2. Configure JWT Validation</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://auth.example.com
          jwk-set-uri: https://auth.example.com/.well-known/jwks.json`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3">3. Security Configuration</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class ResourceServerConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/api/**").authenticated()
                .anyRequest().denyAll()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(jwtAuthenticationConverter())
                )
            );

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        converter.setAuthoritiesClaimName("roles");
        converter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(converter);
        return jwtConverter;
    }
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3">4. Protected API Endpoints</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/data")
    public ResponseEntity<String> getData(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        String email = jwt.getClaim("email");
        return ResponseEntity.ok("Data for user: " + email);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        // Only accessible by users with ADMIN role
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_read', 'SCOPE_write')")
    @PostMapping("/resources")
    public ResponseEntity<String> createResource(@RequestBody String data) {
        // Requires 'read' or 'write' scope
        return ResponseEntity.ok("Resource created");
    }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Token Refresh */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔄</span>
                  Implementing Token Refresh
                </h3>

                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`@Service
public class OAuth2TokenService {

    @Autowired
    private RestTemplate restTemplate;

    public TokenResponse refreshAccessToken(String refreshToken,
                                           String clientId,
                                           String clientSecret,
                                           String tokenEndpoint) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Add Basic Auth
        String auth = clientId + ":" + clientSecret;
        byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes());
        String authHeader = "Basic " + new String(encodedAuth);
        headers.set("Authorization", authHeader);

        // Build request body
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "refresh_token");
        body.add("refresh_token", refreshToken);

        HttpEntity<MultiValueMap<String, String>> request =
            new HttpEntity<>(body, headers);

        // Call token endpoint
        ResponseEntity<TokenResponse> response = restTemplate.postForEntity(
            tokenEndpoint,
            request,
            TokenResponse.class
        );

        return response.getBody();
    }

    // Automatic refresh interceptor
    @Component
    public class TokenRefreshInterceptor implements ClientHttpRequestInterceptor {

        @Override
        public ClientHttpResponse intercept(HttpRequest request,
                                            byte[] body,
                                            ClientHttpRequestExecution execution) throws IOException {

            // Check if token is expired
            if (isTokenExpired()) {
                // Refresh token
                TokenResponse newTokens = refreshAccessToken(
                    storedRefreshToken,
                    clientId,
                    clientSecret,
                    tokenEndpoint
                );

                // Update stored tokens
                updateTokens(newTokens);

                // Add new access token to request
                request.getHeaders().setBearerAuth(newTokens.getAccessToken());
            }

            return execution.execute(request, body);
        }
    }
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8">
              {/* Security Best Practices */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-red-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🛡️</span>
                  OAuth 2.0 Security Best Practices
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: '1. Always Use HTTPS',
                      description: 'OAuth 2.0 relies entirely on TLS/HTTPS for security. Never use OAuth over HTTP in production.',
                      code: 'Enforce HTTPS: spring.security.require-ssl=true',
                      color: 'red'
                    },
                    {
                      title: '2. Validate Redirect URIs',
                      description: 'Whitelist exact redirect URIs. Never use wildcards or allow user-controlled redirect URIs.',
                      code: 'Strict matching: "https://app.example.com/callback" (not "https://app.example.com/*")',
                      color: 'orange'
                    },
                    {
                      title: '3. Use State Parameter',
                      description: 'Prevent CSRF attacks by including a unique state parameter in authorization requests.',
                      code: 'state=random_value_unique_per_request (verify on callback)',
                      color: 'amber'
                    },
                    {
                      title: '4. Use PKCE for Public Clients',
                      description: 'Always use PKCE for SPAs and mobile apps. Protects against authorization code interception.',
                      code: 'code_challenge_method=S256 (SHA-256 hashing)',
                      color: 'yellow'
                    },
                    {
                      title: '5. Short Token Lifetimes',
                      description: 'Access tokens should expire quickly (5-15 min). Use refresh tokens for longer sessions.',
                      code: 'expires_in: 900 (15 minutes)',
                      color: 'lime'
                    },
                    {
                      title: '6. Secure Token Storage',
                      description: 'Store refresh tokens securely. Use HttpOnly cookies or encrypted storage, never localStorage.',
                      code: 'HttpOnly, Secure, SameSite=Strict cookies',
                      color: 'green'
                    },
                    {
                      title: '7. Implement Token Revocation',
                      description: 'Provide mechanism to revoke tokens on logout or security events.',
                      code: 'POST /revoke with token parameter',
                      color: 'teal'
                    },
                    {
                      title: '8. Validate JWT Signatures',
                      description: 'Always verify JWT signatures. Never accept unsigned tokens (alg: "none").',
                      code: 'jwt.verifyWith(publicKey).build().parseSignedClaims(token)',
                      color: 'cyan'
                    }
                  ].map((practice, index) => (
                    <div key={index} className={`bg-${practice.color}-900/30 p-5 rounded-xl border-l-4 border-${practice.color}-500`}>
                      <h4 className={`font-bold text-${practice.color}-400 mb-2`}>{practice.title}</h4>
                      <p className="text-gray-300 mb-3">{practice.description}</p>
                      <div className="bg-gray-900 p-3 rounded-lg">
                        <code className="text-green-400 text-sm">{practice.code}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Vulnerabilities */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">⚠️</span>
                  Common OAuth 2.0 Vulnerabilities
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      vuln: 'Authorization Code Interception',
                      attack: 'Attacker intercepts authorization code and exchanges it for tokens',
                      mitigation: 'Use PKCE (code_challenge) for all clients, especially public ones',
                      severity: 'HIGH'
                    },
                    {
                      vuln: 'Open Redirect',
                      attack: 'Attacker manipulates redirect_uri to steal authorization code',
                      mitigation: 'Whitelist exact redirect URIs, no wildcards or pattern matching',
                      severity: 'HIGH'
                    },
                    {
                      vuln: 'CSRF on Callback',
                      attack: 'Attacker tricks user into using attacker\'s authorization code',
                      mitigation: 'Use state parameter and verify it matches on callback',
                      severity: 'MEDIUM'
                    },
                    {
                      vuln: 'Token Leakage via Referer',
                      attack: 'Access token in URL fragment leaked via Referer header',
                      mitigation: 'Avoid implicit flow, use authorization code flow instead',
                      severity: 'HIGH'
                    },
                    {
                      vuln: 'Insufficient Scope Validation',
                      attack: 'Client requests excessive scopes, user unknowingly grants them',
                      mitigation: 'Principle of least privilege, clear scope descriptions',
                      severity: 'MEDIUM'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-red-900/30 p-6 rounded-xl border-2 border-red-700">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-3xl">🚨</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-red-400 text-lg">{item.vuln}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              item.severity === 'HIGH' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
                            }`}>
                              {item.severity}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <strong className="text-red-400">Attack:</strong>
                              <span className="text-gray-300"> {item.attack}</span>
                            </div>
                            <div>
                              <strong className="text-green-400">Mitigation:</strong>
                              <span className="text-gray-300"> {item.mitigation}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Checklist */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span>✅</span>
                  OAuth 2.0 Security Checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Enforce HTTPS for all OAuth endpoints',
                    'Validate and whitelist exact redirect URIs',
                    'Use state parameter (CSRF protection)',
                    'Implement PKCE for all public clients',
                    'Use short-lived access tokens (5-15 min)',
                    'Implement secure refresh token rotation',
                    'Store tokens in HttpOnly secure cookies',
                    'Validate JWT signatures and claims',
                    'Implement token revocation endpoint',
                    'Use appropriate grant type for use case',
                    'Validate scopes and implement least privilege',
                    'Monitor for suspicious authorization patterns',
                    'Implement rate limiting on token endpoints',
                    'Regular security audits and pen testing',
                    'Keep OAuth libraries up to date',
                    'Log all authorization and token events'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-green-200">✓</span>
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

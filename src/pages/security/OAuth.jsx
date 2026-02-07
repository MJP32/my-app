import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// OAuth 1.0 Flow Diagram
const OAuthFlowDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">OAuth 1.0 Three-Legged Flow</text>

    <rect x="30" y="50" width="100" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="80" y="80" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Consumer</text>

    <rect x="200" y="50" width="130" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="265" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">1. Request Token</text>
    <text x="265" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">oauth_callback</text>

    <rect x="400" y="50" width="130" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="465" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">2. User Authorizes</text>
    <text x="465" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="8">oauth_verifier</text>

    <rect x="600" y="50" width="130" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="665" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">3. Access Token</text>
    <text x="665" y="88" textAnchor="middle" fill="#86efac" fontSize="8">oauth_token</text>

    <path d="M 130 75 L 195 75" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 330 75 L 395 75" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 530 75 L 595 75" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>

    <rect x="150" y="120" width="500" height="60" rx="6" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    <text x="400" y="142" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Signature: HMAC-SHA1 / RSA-SHA1</text>
    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="8">Each request signed with consumer secret + token secret | Nonce prevents replay</text>
  </svg>
)

export default function OAuth({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'flow', label: '🔄 Auth Flow', icon: '🔄' },
    { id: 'implementation', label: '⚙️ Implementation', icon: '⚙️' },
    { id: 'vs2', label: '⚖️ vs OAuth 2.0', icon: '⚖️' }
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

            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl shadow-2xl p-8 text-white border border-blue-700">
              <h1 className="text-4xl font-bold mb-3" style={{
                background: 'linear-gradient(to right, #fca5a5, #ef4444)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>🔐 OAuth 1.0</h1>
              <p className="text-xl text-gray-300">Signature-Based Secure Authorization Protocol</p>
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
                    ? 'bg-blue-600 text-white shadow-lg'
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
              {/* OAuth Flow Diagram */}
              <div className="bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                <OAuthFlowDiagram />
              </div>
              {/* What is OAuth 1.0 */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">💡</span>
                  What is OAuth 1.0?
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  OAuth 1.0 (Open Authorization) is an open standard protocol that allows users to grant third-party
                  applications limited access to their resources without sharing passwords. It uses cryptographic signatures
                  to verify the authenticity of requests.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Signature-based authentication (HMAC-SHA1)',
                    'No password sharing with third-party apps',
                    'Delegated authorization mechanism',
                    'Request signing prevents tampering',
                    'Token-based access control',
                    'Works over non-HTTPS connections (though not recommended)'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-blue-900/30 rounded-lg">
                      <span className="text-blue-400 font-bold text-sm mt-0.5">{idx + 1}</span>
                      <span className="text-gray-300 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Components */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-cyan-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔑</span>
                  OAuth 1.0 Roles & Tokens
                </h3>

                <div className="space-y-4">
                  <div className="bg-purple-900/30 p-6 rounded-xl border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-400 mb-3 text-lg">Roles</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="font-semibold text-purple-400 mb-2">👤 User (Resource Owner)</div>
                        <div className="text-sm text-gray-300">The person who owns the data (e.g., Twitter account owner)</div>
                      </div>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="font-semibold text-purple-400 mb-2">🌐 Service Provider</div>
                        <div className="text-sm text-gray-300">The platform hosting the resources (e.g., Twitter API)</div>
                      </div>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="font-semibold text-purple-400 mb-2">📱 Consumer (Client App)</div>
                        <div className="text-sm text-gray-300">Third-party app requesting access (e.g., TweetDeck)</div>
                      </div>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="font-semibold text-purple-400 mb-2">🔐 Service Provider's Auth Server</div>
                        <div className="text-sm text-gray-300">Issues tokens and validates signatures</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-6 rounded-xl border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-3 text-lg">Tokens & Credentials</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Consumer Key', desc: 'Identifies the client application to the service provider', icon: '🔑' },
                        { name: 'Consumer Secret', desc: 'Secret key used to sign requests (shared secret)', icon: '🤐' },
                        { name: 'Request Token', desc: 'Temporary token obtained before user authorization', icon: '📝' },
                        { name: 'Access Token', desc: 'Token used to access protected resources after authorization', icon: '✅' },
                        { name: 'Token Secret', desc: 'Secret paired with access token for signing', icon: '🔒' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-gray-900 p-3 rounded-lg">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <div className="font-semibold text-green-400">{item.name}</div>
                            <div className="text-sm text-gray-300">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Use Cases */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-orange-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Historical Context & Usage
                </h3>
                <p className="text-gray-300 mb-6">
                  OAuth 1.0 was widely used by platforms like Twitter (until 2023), LinkedIn, and Tumblr. While largely
                  superseded by OAuth 2.0, it's still important to understand for legacy systems and specific security requirements.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-900/30 p-6 rounded-xl border border-green-700">
                    <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                      <span>✅</span> When OAuth 1.0 Was Preferred
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Systems requiring cryptographic signatures</li>
                      <li>• Legacy enterprise integrations</li>
                      <li>• Enhanced security over non-HTTPS</li>
                      <li>• Preventing replay attacks</li>
                      <li>• Strong request integrity guarantees</li>
                    </ul>
                  </div>

                  <div className="bg-amber-900/30 p-6 rounded-xl border border-amber-700">
                    <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2">
                      <span>⚠️</span> Why It's Been Superseded
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Complex implementation (signature generation)</li>
                      <li>• Poor mobile/SPA support</li>
                      <li>• Limited extensibility</li>
                      <li>• OAuth 2.0 is simpler with HTTPS</li>
                      <li>• Most providers migrated to OAuth 2.0</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flow' && (
            <div className="space-y-8">
              {/* Three-Legged OAuth Flow */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔄</span>
                  Three-Legged OAuth 1.0 Flow
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  OAuth 1.0 uses a "three-legged" authorization flow involving Consumer, Service Provider, and User.
                </p>

                {/* Visual Flow Diagram */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-8 rounded-xl mb-8 border border-blue-700">
                  <div className="space-y-8">
                    {/* Step 1 */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-green-500">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-green-400 text-lg mb-2">Obtain Request Token</h4>
                          <p className="text-gray-300 mb-3">Consumer requests a temporary request token from Service Provider</p>
                          <div className="bg-gray-900 p-3 rounded-lg mb-2">
                            <code className="text-green-400 text-xs">
                              POST https://api.twitter.com/oauth/request_token
                              <br />oauth_consumer_key=[KEY]
                              <br />oauth_signature_method=HMAC-SHA1
                              <br />oauth_signature=[SIGNATURE]
                            </code>
                          </div>
                          <div className="text-sm text-gray-400">
                            <strong>Response:</strong> oauth_token=REQUEST_TOKEN&amp;oauth_token_secret=SECRET
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-blue-400 text-lg mb-2">Redirect User for Authorization</h4>
                          <p className="text-gray-300 mb-3">Consumer redirects user to Service Provider's authorization page</p>
                          <div className="bg-gray-900 p-3 rounded-lg mb-2">
                            <code className="text-green-400 text-xs">
                              GET https://api.twitter.com/oauth/authorize?oauth_token=REQUEST_TOKEN
                            </code>
                          </div>
                          <div className="text-sm text-gray-400">
                            User logs in and grants permission to the Consumer application
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-purple-400 text-lg mb-2">Callback with Verifier</h4>
                          <p className="text-gray-300 mb-3">Service Provider redirects back to Consumer with verification code</p>
                          <div className="bg-gray-900 p-3 rounded-lg mb-2">
                            <code className="text-green-400 text-xs">
                              GET https://myconsumerapp.com/callback?oauth_token=REQUEST_TOKEN&amp;oauth_verifier=VERIFIER
                            </code>
                          </div>
                          <div className="text-sm text-gray-400">
                            Consumer receives request token and verifier code
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">4</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-orange-400 text-lg mb-2">Exchange for Access Token</h4>
                          <p className="text-gray-300 mb-3">Consumer exchanges request token and verifier for access token</p>
                          <div className="bg-gray-900 p-3 rounded-lg mb-2">
                            <code className="text-green-400 text-xs">
                              POST https://api.twitter.com/oauth/access_token
                              <br />oauth_token=REQUEST_TOKEN
                              <br />oauth_verifier=VERIFIER
                              <br />oauth_signature=[SIGNATURE]
                            </code>
                          </div>
                          <div className="text-sm text-gray-400">
                            <strong>Response:</strong> oauth_token=ACCESS_TOKEN&amp;oauth_token_secret=TOKEN_SECRET
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 5 */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-cyan-500">
                      <div className="flex items-start gap-4">
                        <div className="bg-cyan-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">5</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-cyan-400 text-lg mb-2">Access Protected Resources</h4>
                          <p className="text-gray-300 mb-3">Consumer uses access token to make authenticated API requests</p>
                          <div className="bg-gray-900 p-3 rounded-lg mb-2">
                            <code className="text-green-400 text-xs">
                              GET https://api.twitter.com/1.1/account/verify_credentials.json
                              <br />Authorization: OAuth oauth_consumer_key=[KEY], oauth_token=ACCESS_TOKEN, oauth_signature=[SIGNATURE]
                            </code>
                          </div>
                          <div className="text-sm text-gray-400">
                            Each request must be signed with consumer secret and token secret
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signature Generation */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-red-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">✍️</span>
                  Request Signature Generation (HMAC-SHA1)
                </h3>
                <p className="text-gray-300 mb-6">
                  OAuth 1.0's security relies on cryptographic signatures. Each request must be signed to prove authenticity.
                </p>

                <div className="space-y-6">
                  <div className="bg-amber-900/30 p-6 rounded-xl border border-amber-700">
                    <h4 className="font-bold text-amber-400 mb-3">Signature Base String Creation</h4>
                    <ol className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-amber-400">1.</span>
                        <div>
                          <strong>Collect Parameters:</strong> All OAuth parameters, query parameters, and POST body parameters
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-amber-400">2.</span>
                        <div>
                          <strong>Normalize:</strong> Sort parameters alphabetically and URL-encode
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-amber-400">3.</span>
                        <div>
                          <strong>Build Base String:</strong> HTTP_METHOD&amp;URL&amp;PARAMETERS
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-amber-400">4.</span>
                        <div>
                          <strong>Create Signing Key:</strong> consumer_secret&amp;token_secret
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-amber-400">5.</span>
                        <div>
                          <strong>Generate Signature:</strong> HMAC-SHA1(base_string, signing_key)
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-xl">
                    <pre className="text-green-400 text-xs overflow-x-auto">
{`// Example Signature Base String:
POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&
oauth_consumer_key%3Dxvz1evFS4wEEPTGEFPHBog%26
oauth_nonce%3DkYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg%26
oauth_signature_method%3DHMAC-SHA1%26
oauth_timestamp%3D1318622958%26
oauth_token%3D370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb%26
oauth_version%3D1.0%26
status%3DHello%20Ladies%20%2B%20Gentlemen

// Signing Key:
kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw&LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE

// Generated Signature (Base64):
tnnArxj06cWHq44gCs1OSKk/jLY=`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'implementation' && (
            <div className="space-y-8">
              {/* Java Implementation */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-orange-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">☕</span>
                  Java Implementation (Scribe OAuth Library)
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-orange-400 mb-3">1. Add Maven Dependency</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`<dependency>
    <groupId>com.github.scribejava</groupId>
    <artifactId>scribejava-apis</artifactId>
    <version>8.3.3</version>
</dependency>`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-orange-400 mb-3">2. OAuth Service Configuration</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`import com.github.scribejava.apis.TwitterApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.*;
import com.github.scribejava.core.oauth.OAuth10aService;

public class OAuth1Example {

    private static final String CONSUMER_KEY = "your_consumer_key";
    private static final String CONSUMER_SECRET = "your_consumer_secret";
    private static final String CALLBACK_URL = "http://localhost:8080/callback";

    public void initializeOAuth() {
        OAuth10aService service = new ServiceBuilder(CONSUMER_KEY)
                .apiSecret(CONSUMER_SECRET)
                .callback(CALLBACK_URL)
                .build(TwitterApi.instance());
    }
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-orange-400 mb-3">3. Obtain Request Token</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`public String getAuthorizationUrl(OAuth10aService service) throws Exception {
    // Step 1: Obtain request token
    OAuth1RequestToken requestToken = service.getRequestToken();

    // Step 2: Get authorization URL
    String authorizationUrl = service.getAuthorizationUrl(requestToken);

    // Store request token in session for later use
    session.setAttribute("requestToken", requestToken);

    // Redirect user to authorization URL
    return authorizationUrl;
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-orange-400 mb-3">4. Handle Callback & Exchange for Access Token</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`@GetMapping("/callback")
public String handleCallback(@RequestParam("oauth_token") String oauthToken,
                            @RequestParam("oauth_verifier") String verifier,
                            HttpSession session) throws Exception {

    // Retrieve request token from session
    OAuth1RequestToken requestToken =
        (OAuth1RequestToken) session.getAttribute("requestToken");

    // Exchange request token + verifier for access token
    OAuth1AccessToken accessToken = service.getAccessToken(requestToken, verifier);

    // Store access token for future API calls
    session.setAttribute("accessToken", accessToken);

    return "Authorization successful!";
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-orange-400 mb-3">5. Make Authenticated API Requests</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`public void makeApiRequest(OAuth10aService service,
                          OAuth1AccessToken accessToken) throws Exception {

    // Create signed request
    OAuthRequest request = new OAuthRequest(
        Verb.GET,
        "https://api.twitter.com/1.1/account/verify_credentials.json"
    );

    // Sign the request with access token
    service.signRequest(accessToken, request);

    // Execute request
    Response response = service.execute(request);

    // Handle response
    if (response.isSuccessful()) {
        String jsonResponse = response.getBody();
        System.out.println("User data: " + jsonResponse);
    }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manual Signature Generation */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">✍️</span>
                  Manual Signature Generation (Educational)
                </h3>
                <p className="text-gray-300 mb-6">
                  Understanding signature generation helps debug OAuth 1.0 issues. Libraries handle this automatically.
                </p>

                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class OAuth1Signature {

    public String generateSignature(String baseString,
                                    String consumerSecret,
                                    String tokenSecret) throws Exception {

        // Create signing key: consumer_secret&token_secret
        String signingKey = URLEncoder.encode(consumerSecret, "UTF-8") + "&" +
                           URLEncoder.encode(tokenSecret, "UTF-8");

        // Initialize HMAC-SHA1
        Mac mac = Mac.getInstance("HmacSHA1");
        SecretKeySpec secretKey = new SecretKeySpec(
            signingKey.getBytes("UTF-8"),
            "HmacSHA1"
        );
        mac.init(secretKey);

        // Generate signature
        byte[] signatureBytes = mac.doFinal(baseString.getBytes("UTF-8"));

        // Base64 encode
        return Base64.getEncoder().encodeToString(signatureBytes);
    }

    public String createBaseString(String httpMethod,
                                  String url,
                                  Map<String, String> params) {

        // 1. Sort parameters alphabetically
        TreeMap<String, String> sortedParams = new TreeMap<>(params);

        // 2. Build parameter string
        StringBuilder paramString = new StringBuilder();
        for (Map.Entry<String, String> entry : sortedParams.entrySet()) {
            if (paramString.length() > 0) paramString.append("&");
            paramString.append(URLEncoder.encode(entry.getKey(), "UTF-8"))
                      .append("=")
                      .append(URLEncoder.encode(entry.getValue(), "UTF-8"));
        }

        // 3. Build base string
        return httpMethod.toUpperCase() + "&" +
               URLEncoder.encode(url, "UTF-8") + "&" +
               URLEncoder.encode(paramString.toString(), "UTF-8");
    }
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vs2' && (
            <div className="space-y-8">
              {/* OAuth 1.0 vs 2.0 Comparison */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-indigo-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">⚖️</span>
                  OAuth 1.0 vs OAuth 2.0
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-indigo-900/30">
                        <th className="border border-indigo-700 p-3 text-left font-bold text-indigo-400">Feature</th>
                        <th className="border border-indigo-700 p-3 text-left font-bold text-blue-400">OAuth 1.0</th>
                        <th className="border border-indigo-700 p-3 text-left font-bold text-green-400">OAuth 2.0</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          feature: 'Complexity',
                          oauth1: '⚠️ High - Requires signature generation',
                          oauth2: '✅ Low - Bearer tokens, simpler flow'
                        },
                        {
                          feature: 'Security',
                          oauth1: '🔒 Cryptographic signatures (HMAC-SHA1)',
                          oauth2: '🔒 Relies on HTTPS/TLS'
                        },
                        {
                          feature: 'Token Types',
                          oauth1: '1 access token + token secret',
                          oauth2: 'Access token + optional refresh token'
                        },
                        {
                          feature: 'HTTPS Required',
                          oauth1: '❌ Optional (signatures work over HTTP)',
                          oauth2: '✅ Mandatory for security'
                        },
                        {
                          feature: 'Mobile Support',
                          oauth1: '⚠️ Limited (complex signatures)',
                          oauth2: '✅ Excellent (simpler flows)'
                        },
                        {
                          feature: 'SPA Support',
                          oauth1: '❌ Poor (requires server-side)',
                          oauth2: '✅ Good (implicit/PKCE flows)'
                        },
                        {
                          feature: 'Extensibility',
                          oauth1: '❌ Fixed specification',
                          oauth2: '✅ Framework with multiple grant types'
                        },
                        {
                          feature: 'Token Refresh',
                          oauth1: '❌ No built-in refresh mechanism',
                          oauth2: '✅ Built-in refresh tokens'
                        },
                        {
                          feature: 'Adoption',
                          oauth1: '📉 Declining (legacy systems)',
                          oauth2: '📈 Industry standard'
                        },
                        {
                          feature: 'Request Signing',
                          oauth1: '✅ Every request signed',
                          oauth2: '❌ No signing (HTTPS provides security)'
                        }
                      ].map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-900/50' : 'bg-gray-800'}>
                          <td className="border border-gray-700 p-3 font-semibold text-white">{row.feature}</td>
                          <td className="border border-gray-700 p-3 text-sm text-gray-300">{row.oauth1}</td>
                          <td className="border border-gray-700 p-3 text-sm text-gray-300">{row.oauth2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Migration Guidance */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-amber-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔄</span>
                  Migration from OAuth 1.0 to 2.0
                </h3>

                <div className="space-y-6">
                  <div className="bg-green-900/30 p-6 rounded-xl border border-green-700">
                    <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                      <span>✅</span> Why Migrate to OAuth 2.0?
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Simpler implementation and maintenance</li>
                      <li>• Better mobile and SPA support</li>
                      <li>• Industry standard with wider adoption</li>
                      <li>• More flexible grant types</li>
                      <li>• Better tooling and library support</li>
                      <li>• Native refresh token support</li>
                    </ul>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-700">
                    <h4 className="font-bold text-blue-400 mb-3">Migration Steps</h4>
                    <ol className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-400">1.</span>
                        <div><strong>Audit OAuth 1.0 Usage:</strong> Identify all systems using OAuth 1.0</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-400">2.</span>
                        <div><strong>Choose Grant Type:</strong> Authorization Code (most common), Client Credentials, or PKCE</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-400">3.</span>
                        <div><strong>Update Libraries:</strong> Replace OAuth 1.0 libraries with OAuth 2.0 equivalents</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-400">4.</span>
                        <div><strong>Implement New Flows:</strong> Refactor authentication logic</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-400">5.</span>
                        <div><strong>Testing:</strong> Comprehensive testing of new flows</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-400">6.</span>
                        <div><strong>Gradual Rollout:</strong> Migrate incrementally with fallback support</div>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-amber-900/30 p-6 rounded-xl border border-amber-700">
                    <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2">
                      <span>⚠️</span> When to Keep OAuth 1.0
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Legacy systems that can't use HTTPS</li>
                      <li>• Contractual requirements for specific security</li>
                      <li>• Third-party API still only supports OAuth 1.0</li>
                      <li>• Migration cost exceeds benefits</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span>📌</span>
                  OAuth 1.0 Summary
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold mb-3">Key Characteristics</h4>
                    <ul className="space-y-2">
                      <li>✓ Signature-based security</li>
                      <li>✓ Works without HTTPS (not recommended)</li>
                      <li>✓ Strong request integrity</li>
                      <li>✗ Complex implementation</li>
                      <li>✗ Poor mobile/SPA support</li>
                      <li>✗ Being phased out industry-wide</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3">Current Status</h4>
                    <p className="text-white/90 leading-relaxed">
                      OAuth 1.0 has been largely superseded by OAuth 2.0. Major platforms like Twitter completed their
                      migration to OAuth 2.0. While important to understand for legacy systems, new implementations
                      should use OAuth 2.0 with PKCE.
                    </p>
                  </div>
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

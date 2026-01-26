import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// JWT Token Flow Diagram
const JWTFlowDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">JWT Authentication Flow</text>

    <rect x="30" y="45" width="100" height="55" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="80" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Client</text>
    <text x="80" y="88" textAnchor="middle" fill="#93c5fd" fontSize="8">Login request</text>

    <rect x="180" y="45" width="120" height="55" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="240" y="70" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Auth Server</text>
    <text x="240" y="88" textAnchor="middle" fill="#86efac" fontSize="8">Verify credentials</text>

    <rect x="350" y="45" width="130" height="55" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="415" y="65" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Generate JWT</text>
    <text x="415" y="82" textAnchor="middle" fill="#fcd34d" fontSize="8">Header.Payload</text>
    <text x="415" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">.Signature</text>

    <rect x="530" y="45" width="110" height="55" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="585" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Client Stores</text>
    <text x="585" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="8">localStorage/cookie</text>

    <rect x="690" y="45" width="90" height="55" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="735" y="70" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">API Server</text>
    <text x="735" y="88" textAnchor="middle" fill="#fbcfe8" fontSize="8">Verify JWT</text>

    <path d="M 130 72 L 175 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 300 72 L 345 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 480 72 L 525 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 640 72 L 685 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>

    <rect x="200" y="120" width="400" height="45" rx="6" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    <text x="400" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">JWT: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.signature</text>
    <text x="400" y="157" textAnchor="middle" fill="#64748b" fontSize="8">Stateless - No server session required | Self-contained user info</text>
  </svg>
)

// JWT Structure Diagram
const JWTStructureDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">JWT Token Structure</text>

    <rect x="50" y="50" width="200" height="70" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Header</text>
    <text x="150" y="95" textAnchor="middle" fill="#fca5a5" fontSize="8">{"{"} alg: "HS256", typ: "JWT" {"}"}</text>
    <text x="150" y="110" textAnchor="middle" fill="#fca5a5" fontSize="8">Base64Url encoded</text>

    <text x="265" y="85" textAnchor="middle" fill="#94a3b8" fontSize="20" fontWeight="bold">.</text>

    <rect x="290" y="50" width="220" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Payload (Claims)</text>
    <text x="400" y="93" textAnchor="middle" fill="#c4b5fd" fontSize="8">sub, iat, exp, iss, aud</text>
    <text x="400" y="108" textAnchor="middle" fill="#c4b5fd" fontSize="8">Custom claims: roles, permissions</text>

    <text x="525" y="85" textAnchor="middle" fill="#94a3b8" fontSize="20" fontWeight="bold">.</text>

    <rect x="550" y="50" width="200" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Signature</text>
    <text x="650" y="93" textAnchor="middle" fill="#86efac" fontSize="8">HMAC-SHA256 / RS256</text>
    <text x="650" y="108" textAnchor="middle" fill="#86efac" fontSize="8">Verifies integrity</text>

    <rect x="150" y="140" width="500" height="30" rx="4" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="400" y="160" textAnchor="middle" fill="#60a5fa" fontSize="9">Signature = HMACSHA256(base64(header) + "." + base64(payload), secret)</text>
  </svg>
)

export default function JWT({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'structure', label: '🔍 Structure', icon: '🔍' },
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

            <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-2xl shadow-2xl p-8 text-white border border-purple-700">
              <h1 className="text-4xl font-bold mb-3" style={{
                background: 'linear-gradient(to right, #fca5a5, #ef4444)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>JWT (JSON Web Tokens)</h1>
              <p className="text-xl text-gray-300">Stateless Authentication & Authorization</p>
            </div>
          </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        {/* Tabs */}
        <div className="bg-gray-800 rounded-xl shadow-md p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
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
              {/* JWT Flow Diagram */}
              <div className="bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                <JWTFlowDiagram />
              </div>
              {/* What is JWT */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">💡</span>
                  What is JWT?
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  JSON Web Token (JWT) is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object.
                  It's digitally signed, making the information verifiable and trustworthy. JWTs are commonly used for authentication and
                  authorization in modern web applications.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Self-contained: carries all necessary information',
                    'Stateless: no server-side session storage needed',
                    'Compact: can be sent via URL, POST, or HTTP header',
                    'Cryptographically signed: ensures integrity',
                    'Industry standard: widely supported across platforms',
                    'Scalable: works well in distributed systems'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-purple-900/30 rounded-lg">
                      <span className="text-purple-400 font-bold text-sm mt-0.5">{idx + 1}</span>
                      <span className="text-gray-300 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-indigo-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Common Use Cases
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: 'Authentication',
                      description: 'User logs in and receives a JWT. Subsequent requests include the JWT to access protected resources without re-authenticating.',
                      icon: '🔐',
                      color: 'blue'
                    },
                    {
                      title: 'Information Exchange',
                      description: 'Securely transmit information between parties. Since JWTs are signed, you can verify the sender and ensure content integrity.',
                      icon: '📡',
                      color: 'green'
                    },
                    {
                      title: 'Single Sign-On (SSO)',
                      description: 'Enable users to authenticate once and access multiple applications without logging in again.',
                      icon: '🔄',
                      color: 'purple'
                    },
                    {
                      title: 'API Authorization',
                      description: 'Grant access to specific API endpoints based on claims and permissions encoded in the token.',
                      icon: '🔌',
                      color: 'orange'
                    }
                  ].map((useCase, index) => (
                    <div key={index} className={`bg-${useCase.color}-900/30 p-6 rounded-xl border-l-4 border-${useCase.color}-500`}>
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">{useCase.icon}</span>
                        <div>
                          <h4 className={`text-xl font-bold text-${useCase.color}-400 mb-2`}>{useCase.title}</h4>
                          <p className="text-gray-300">{useCase.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* JWT vs Sessions */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-amber-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">⚖️</span>
                  JWT vs Traditional Sessions
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                    <h4 className="font-bold text-green-400 mb-4 text-lg flex items-center gap-2">
                      <span>✅</span> JWT Advantages
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• No server-side storage (stateless)</li>
                      <li>• Better scalability across servers</li>
                      <li>• Works across domains (CORS friendly)</li>
                      <li>• Mobile-friendly (no cookies needed)</li>
                      <li>• Contains user info (reduces DB queries)</li>
                      <li>• Fine-grained permissions via claims</li>
                    </ul>
                  </div>

                  <div className="bg-amber-900/30 p-6 rounded-xl border-2 border-amber-700">
                    <h4 className="font-bold text-amber-400 mb-4 text-lg flex items-center gap-2">
                      <span>⚠️</span> Session Advantages
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Instant revocation (logout, ban user)</li>
                      <li>• Smaller payload (just session ID)</li>
                      <li>• Server controls all session data</li>
                      <li>• No token size limitations</li>
                      <li>• Easier to implement initially</li>
                      <li>• No client-side token management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="space-y-8">
              {/* Token Structure */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔍</span>
                  JWT Token Structure
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  A JWT consists of three parts separated by dots (.): <strong>Header.Payload.Signature</strong>
                </p>

                <div className="bg-gray-900 p-6 rounded-xl mb-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm font-mono">
                    <span className="text-red-400">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
                    <span className="text-white">.</span>
                    <span className="text-purple-400">eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</span>
                    <span className="text-white">.</span>
                    <span className="text-blue-400">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
                  </pre>
                </div>

                <div className="space-y-6">
                  {/* Header */}
                  <div className="bg-red-900/30 p-6 rounded-xl border-l-4 border-red-500">
                    <h4 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
                      <span>1.</span> Header (Algorithm & Token Type)
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Contains metadata about the token: signing algorithm and token type.
                    </p>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <pre className="text-sm text-gray-300">
{`{
  "alg": "HS256",      // Algorithm: HMAC SHA-256
  "typ": "JWT"         // Type: JSON Web Token
}`}
                      </pre>
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                      <strong>Common Algorithms:</strong> HS256 (HMAC), RS256 (RSA), ES256 (ECDSA)
                    </div>
                  </div>

                  {/* Payload */}
                  <div className="bg-purple-900/30 p-6 rounded-xl border-l-4 border-purple-500">
                    <h4 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                      <span>2.</span> Payload (Claims)
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Contains claims: statements about the user and additional metadata.
                    </p>
                    <div className="bg-gray-900 p-4 rounded-lg mb-4">
                      <pre className="text-sm text-gray-300">
{`{
  "sub": "1234567890",     // Subject: user ID
  "name": "John Doe",      // Custom claim
  "email": "john@example.com",
  "role": "admin",         // Authorization claim
  "iat": 1516239022,       // Issued at (timestamp)
  "exp": 1516242622        // Expiration (timestamp)
}`}
                      </pre>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-gray-900 p-3 rounded-lg">
                        <div className="font-bold text-purple-400 mb-2">Registered Claims</div>
                        <div className="text-gray-400">iss, sub, aud, exp, nbf, iat, jti</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded-lg">
                        <div className="font-bold text-purple-400 mb-2">Public Claims</div>
                        <div className="text-gray-400">Standardized in IANA registry</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded-lg">
                        <div className="font-bold text-purple-400 mb-2">Private Claims</div>
                        <div className="text-gray-400">Custom claims (name, role, etc.)</div>
                      </div>
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2">
                      <span>3.</span> Signature (Verification)
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Ensures the token hasn't been tampered with. Created by encoding header + payload and signing with secret/private key.
                    </p>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <pre className="text-sm text-gray-300">
{`HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)`}
                      </pre>
                    </div>
                    <div className="mt-4 p-3 bg-amber-900/30 rounded-lg border border-amber-700">
                      <strong className="text-amber-400">⚠️ Security Note:</strong>
                      <span className="text-gray-300"> The signature protects integrity but does NOT encrypt the payload. Never store sensitive data in JWT claims!</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Standard Claims */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">📝</span>
                  Standard Claims (RFC 7519)
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { claim: 'iss (Issuer)', desc: 'Who issued the token (e.g., "auth.example.com")' },
                    { claim: 'sub (Subject)', desc: 'Who the token is about (usually user ID)' },
                    { claim: 'aud (Audience)', desc: 'Who the token is intended for (e.g., "api.example.com")' },
                    { claim: 'exp (Expiration)', desc: 'When the token expires (Unix timestamp)' },
                    { claim: 'nbf (Not Before)', desc: 'Token not valid before this time (Unix timestamp)' },
                    { claim: 'iat (Issued At)', desc: 'When the token was issued (Unix timestamp)' },
                    { claim: 'jti (JWT ID)', desc: 'Unique identifier for the token' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-green-900/30 p-4 rounded-lg border-2 border-green-700">
                      <div className="font-bold text-green-400 mb-1">{item.claim}</div>
                      <div className="text-sm text-gray-300">{item.desc}</div>
                    </div>
                  ))}
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
                  Java Implementation (jjwt library)
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-orange-400 mb-3">1. Add Dependency (Maven)</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-orange-400 mb-3">2. Generate JWT Token</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`@Service
public class JwtService {

    private static final String SECRET_KEY = "your-256-bit-secret-key-here-min-32-chars";

    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .claim("role", "ADMIN")
                .claim("email", "user@example.com")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hours
                .signWith(getSigningKey())
                .compact();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-orange-400 mb-3">3. Validate & Parse JWT Token</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`public Claims extractAllClaims(String token) {
    return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
}

public String extractUsername(String token) {
    return extractAllClaims(token).getSubject();
}

public boolean isTokenValid(String token, String username) {
    final String tokenUsername = extractUsername(token);
    return (tokenUsername.equals(username) && !isTokenExpired(token));
}

private boolean isTokenExpired(String token) {
    return extractAllClaims(token).getExpiration().before(new Date());
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-orange-400 mb-3">4. Spring Security Filter</h4>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        final String username = jwtService.extractUsername(jwt);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(jwt, username)) {
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                    );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Token Refresh */}
              <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-cyan-600">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔄</span>
                  Refresh Token Strategy
                </h3>
                <p className="text-gray-300 mb-6">
                  Use short-lived access tokens (15 min) with long-lived refresh tokens (7 days) for better security.
                </p>

                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-6">
                  <pre className="text-green-400 text-sm">
{`public TokenResponse generateTokenPair(String username) {
    String accessToken = Jwts.builder()
            .subject(username)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000)) // 15 min
            .signWith(getSigningKey())
            .compact();

    String refreshToken = Jwts.builder()
            .subject(username)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000)) // 7 days
            .signWith(getSigningKey())
            .compact();

    return new TokenResponse(accessToken, refreshToken);
}

public String refreshAccessToken(String refreshToken) {
    String username = extractUsername(refreshToken);
    if (!isTokenExpired(refreshToken)) {
        return generateToken(username);
    }
    throw new InvalidTokenException("Refresh token expired");
}`}
                  </pre>
                </div>

                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                  <strong className="text-blue-400">💡 Best Practice:</strong>
                  <span className="text-gray-300"> Store refresh tokens securely (HttpOnly cookies or encrypted storage). Rotate refresh tokens on each use.</span>
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
                  Security Best Practices
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: '1. Use Strong Secret Keys',
                      description: 'HS256 requires minimum 256-bit (32 characters) secret key. Use cryptographically random keys.',
                      code: 'SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);',
                      color: 'red'
                    },
                    {
                      title: '2. Set Short Expiration Times',
                      description: 'Access tokens should expire quickly (5-15 minutes). Use refresh tokens for longer sessions.',
                      code: '.expiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000))',
                      color: 'orange'
                    },
                    {
                      title: '3. Validate All Claims',
                      description: 'Always verify issuer (iss), audience (aud), expiration (exp), and not-before (nbf) claims.',
                      code: 'Jwts.parser().requireIssuer("myapp").requireAudience("api")',
                      color: 'amber'
                    },
                    {
                      title: '4. Use HTTPS Only',
                      description: 'Never transmit JWTs over unencrypted connections. Always use HTTPS in production.',
                      code: 'Secure header: "Authorization: Bearer [token]"',
                      color: 'yellow'
                    },
                    {
                      title: '5. Store Tokens Securely',
                      description: 'Use HttpOnly cookies (not localStorage). Prevents XSS attacks from stealing tokens.',
                      code: 'response.addCookie(new Cookie("token", jwt) {{ setHttpOnly(true); setSecure(true); }})',
                      color: 'lime'
                    },
                    {
                      title: '6. Implement Token Blacklisting',
                      description: 'Maintain a blacklist/revocation list for logged-out or compromised tokens.',
                      code: 'redisTemplate.set("blacklist:" + jti, true, expirationTime);',
                      color: 'green'
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
                  Common Vulnerabilities
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      vuln: 'None Algorithm Attack',
                      desc: 'Attacker changes "alg" to "none" and removes signature',
                      mitigation: 'Always specify expected algorithm in parser. Never allow "none".',
                      code: 'Jwts.parser().verifyWith(key).build() // Enforces algorithm'
                    },
                    {
                      vuln: 'Weak Secret Key',
                      desc: 'Using predictable or short secret keys',
                      mitigation: 'Use cryptographically random keys of at least 256 bits',
                      code: 'Keys.secretKeyFor(SignatureAlgorithm.HS256)'
                    },
                    {
                      vuln: 'Token Not Validated',
                      desc: 'Not checking signature or expiration',
                      mitigation: 'Always validate signature, expiration, and issuer',
                      code: 'parser.parseSignedClaims(token) // Validates signature & expiration'
                    },
                    {
                      vuln: 'XSS via localStorage',
                      desc: 'Storing JWT in localStorage exposes to XSS attacks',
                      mitigation: 'Use HttpOnly cookies instead of localStorage',
                      code: 'cookie.setHttpOnly(true); cookie.setSecure(true);'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-red-900/30 p-6 rounded-xl border-2 border-red-700">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-3xl">🚨</span>
                        <div>
                          <h4 className="font-bold text-red-400 text-lg mb-1">{item.vuln}</h4>
                          <p className="text-gray-300 mb-2"><strong>Issue:</strong> {item.desc}</p>
                          <p className="text-gray-300 mb-3"><strong>Mitigation:</strong> {item.mitigation}</p>
                          <div className="bg-gray-900 p-3 rounded-lg">
                            <code className="text-green-400 text-sm">{item.code}</code>
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
                  JWT Security Checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Use strong, random secret keys (≥256 bits)',
                    'Set short token expiration (5-15 minutes)',
                    'Implement refresh token rotation',
                    'Always use HTTPS in production',
                    'Store tokens in HttpOnly cookies',
                    'Validate all claims (iss, aud, exp, nbf)',
                    'Implement token blacklist/revocation',
                    'Never store sensitive data in claims',
                    'Use algorithm whitelist (reject "none")',
                    'Implement rate limiting on auth endpoints',
                    'Log token generation and validation',
                    'Regular security audits and updates'
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

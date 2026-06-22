import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function WebSecurityFundamentals({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-red-700 hover:border-red-600 text-red-300 hover:text-red-200 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Security
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🔒 Web Security Fundamentals
            </h1>
            <span className="px-3 py-1 bg-red-900/50 text-red-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-red-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Protect applications and users with encryption, secure coding, and defense-in-depth hardening
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-red-900/30 text-red-300 rounded-lg text-sm font-medium border border-red-700">TLS / SSL</span>
            <span className="px-4 py-2 bg-orange-900/30 text-orange-300 rounded-lg text-sm font-medium border border-orange-700">OWASP Top 10</span>
            <span className="px-4 py-2 bg-amber-900/30 text-amber-300 rounded-lg text-sm font-medium border border-amber-700">Secure Coding</span>
            <span className="px-4 py-2 bg-rose-900/30 text-rose-300 rounded-lg text-sm font-medium border border-rose-700">Hardening</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'tls-ssl', 'web-attacks', 'hardening'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-red-400 bg-red-900/30 border-b-2 border-red-400 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'tls-ssl' && 'TLS / SSL'}
              {tab === 'web-attacks' && 'Web Attacks'}
              {tab === 'hardening' && 'Hardening'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-8 border-2 border-red-700">
              <h2 className="text-3xl font-bold text-white mb-6">The Security Landscape</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Modern web applications are exposed to the public internet, making them constant targets for automated
                scanners, bots, and motivated attackers. Security is not a single feature you add at the end — it is a
                continuous practice that spans the network, the transport layer, application code, infrastructure, and
                operational processes.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Effective security assumes breach: any single control can fail, so multiple independent layers must work
                together so that one compromised control does not lead to a total compromise.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-amber-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">🛡️ Defense in Depth</h2>
              <p className="text-gray-300 text-lg mb-6">
                Layer multiple, overlapping controls so that an attacker must defeat several independent defenses to reach
                sensitive data. No single layer is trusted to be perfect.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">🌐 Network Layer</h3>
                  <p className="text-gray-300">Firewalls, security groups, network segmentation, and DDoS protection at the edge</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">🔐 Transport Layer</h3>
                  <p className="text-gray-300">TLS encryption for all traffic so data cannot be read or tampered with in transit</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">🧩 Application Layer</h3>
                  <p className="text-gray-300">Input validation, output encoding, authentication, authorization, and secure session handling</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700 shadow-sm">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">💾 Data Layer</h3>
                  <p className="text-gray-300">Encryption at rest, least-privilege database accounts, and protected secret storage</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 rounded-2xl p-8 border-2 border-amber-700">
              <h2 className="text-3xl font-bold text-white mb-6">The CIA Triad</h2>
              <p className="text-gray-300 text-lg mb-6">
                The three foundational goals of information security. Every control ultimately serves one or more of these.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 text-xl mb-2">Confidentiality</h3>
                  <p className="text-gray-300 text-sm">Data is only accessible to authorized parties. Enforced through encryption, access control, and authentication.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 text-xl mb-2">Integrity</h3>
                  <p className="text-gray-300 text-sm">Data cannot be modified undetected. Enforced through hashing, message authentication codes (MAC), and signatures.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 text-xl mb-2">Availability</h3>
                  <p className="text-gray-300 text-sm">Systems and data remain accessible when needed. Protected through redundancy, rate limiting, and DDoS mitigation.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tls-ssl' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-8 border-2 border-red-700">
              <h2 className="text-3xl font-bold text-white mb-6">What TLS Provides</h2>
              <p className="text-gray-300 text-lg mb-6">
                TLS (Transport Layer Security) is the successor to SSL and secures data in transit between a client and
                server. SSL is deprecated and insecure; modern systems use TLS 1.2 or TLS 1.3.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 mb-2">🔐 Encryption</h3>
                  <p className="text-gray-300 text-sm">Data is encrypted with symmetric session keys so eavesdroppers cannot read it</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 mb-2">✅ Integrity</h3>
                  <p className="text-gray-300 text-sm">Authenticated encryption (AEAD) detects any tampering with the data in transit</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 mb-2">🪪 Authentication</h3>
                  <p className="text-gray-300 text-sm">Certificates prove the server is who it claims to be, preventing impersonation</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-amber-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">The TLS Handshake</h2>
              <p className="text-gray-300 text-lg mb-6">
                Before any application data flows, the client and server negotiate parameters and establish shared session
                keys without ever transmitting those keys in the clear.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                <ol className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="font-bold text-orange-400 min-w-[24px]">1.</span>
                    <span><strong>ClientHello:</strong> client sends supported TLS versions, cipher suites, and a random value</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-orange-400 min-w-[24px]">2.</span>
                    <span><strong>ServerHello:</strong> server picks the version and cipher suite, returns its own random value</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-orange-400 min-w-[24px]">3.</span>
                    <span><strong>Certificate:</strong> server presents its certificate chain so the client can verify identity</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-orange-400 min-w-[24px]">4.</span>
                    <span><strong>Key exchange:</strong> both sides perform (EC)DHE to derive a shared secret with forward secrecy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-orange-400 min-w-[24px]">5.</span>
                    <span><strong>Session keys:</strong> symmetric keys are derived from the shared secret and randoms</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-orange-400 min-w-[24px]">6.</span>
                    <span><strong>Finished:</strong> both sides confirm the handshake, then exchange encrypted application data</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 rounded-2xl p-8 border-2 border-amber-700">
              <h2 className="text-3xl font-bold text-white mb-6">Certificates & Certificate Authorities</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 mb-2">X.509 Certificates</h3>
                  <p className="text-gray-300">A certificate binds a public key to a domain name and is signed by a trusted Certificate Authority (CA). The browser trusts the server because it trusts the CA that signed the certificate.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 mb-2">Chain of Trust</h3>
                  <p className="text-gray-300">Browsers ship with a set of trusted root CAs. The server certificate is validated up the chain to a root the client already trusts. Tools like Let's Encrypt issue free, automatically renewed certificates.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 mb-2">HTTPS</h3>
                  <p className="text-gray-300">HTTPS is simply HTTP carried over a TLS connection. Use HSTS to force browsers to always connect over HTTPS and prevent protocol downgrade attacks.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-rose-700">
              <h2 className="text-3xl font-bold text-white mb-6">TLS 1.3 Improvements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-rose-700">
                  <h3 className="font-bold text-rose-400 mb-2">Faster Handshake</h3>
                  <p className="text-gray-300 text-sm">Reduced to a single round trip (1-RTT), with optional 0-RTT resumption</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-rose-700">
                  <h3 className="font-bold text-rose-400 mb-2">Forward Secrecy by Default</h3>
                  <p className="text-gray-300 text-sm">Only ephemeral (EC)DHE key exchange is allowed, so past sessions stay safe if keys leak</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-rose-700">
                  <h3 className="font-bold text-rose-400 mb-2">Removed Legacy Crypto</h3>
                  <p className="text-gray-300 text-sm">RSA key transport, RC4, MD5, SHA-1, and static cipher suites are eliminated</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-rose-700">
                  <h3 className="font-bold text-rose-400 mb-2">Encrypted Handshake</h3>
                  <p className="text-gray-300 text-sm">More of the handshake is encrypted, reducing metadata exposure</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'web-attacks' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-8 border-2 border-red-700">
              <h2 className="text-3xl font-bold text-white mb-6">SQL Injection</h2>
              <p className="text-gray-300 text-lg mb-4">
                Untrusted input is concatenated into a SQL query, letting an attacker alter the query's logic to read,
                modify, or destroy data. The fix is to use parameterized queries (prepared statements) so input is always
                treated as data, never as executable SQL.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-5 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 mb-3">❌ Vulnerable</h3>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto"><code className="text-sm text-red-200">{`String q = "SELECT * FROM users " +
  "WHERE name = '" + input + "'";
stmt.executeQuery(q);
// input = ' OR '1'='1 returns all rows`}</code></pre>
                </div>
                <div className="bg-gray-800 p-5 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">✅ Fixed</h3>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto"><code className="text-sm text-green-200">{`String q =
  "SELECT * FROM users WHERE name = ?";
PreparedStatement ps =
  conn.prepareStatement(q);
ps.setString(1, input);
ps.executeQuery();`}</code></pre>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-amber-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Cross-Site Scripting (XSS)</h2>
              <p className="text-gray-300 text-lg mb-4">
                An attacker injects malicious scripts that run in another user's browser. There are three main types:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Stored</h3>
                  <p className="text-gray-300 text-sm">Payload is saved on the server (e.g. a comment) and served to every viewer</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Reflected</h3>
                  <p className="text-gray-300 text-sm">Payload is echoed back from a request parameter, often via a crafted link</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">DOM-based</h3>
                  <p className="text-gray-300 text-sm">Client-side JavaScript writes untrusted data into the DOM unsafely</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg mb-4">
                Fix with context-aware output encoding and a strict Content Security Policy (CSP).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-5 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 mb-3">❌ Vulnerable</h3>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto"><code className="text-sm text-red-200">{`// renders raw user input as HTML
element.innerHTML = userComment;
// userComment can contain <script>...`}</code></pre>
                </div>
                <div className="bg-gray-800 p-5 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">✅ Fixed</h3>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto"><code className="text-sm text-green-200">{`// treat input as text, not markup
element.textContent = userComment;
// plus a response header:
// Content-Security-Policy: default-src 'self'`}</code></pre>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 rounded-2xl p-8 border-2 border-amber-700">
              <h2 className="text-3xl font-bold text-white mb-6">Cross-Site Request Forgery (CSRF)</h2>
              <p className="text-gray-300 text-lg mb-4">
                A malicious site tricks a logged-in user's browser into sending an authenticated state-changing request to
                your application using the user's existing session cookie. Defend with anti-CSRF tokens and SameSite cookies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-5 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 mb-3">❌ Vulnerable</h3>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto"><code className="text-sm text-red-200">{`// state change with no CSRF defense
POST /transfer
Cookie: session=abc
amount=1000&to=attacker
// auto-submitted by attacker's page`}</code></pre>
                </div>
                <div className="bg-gray-800 p-5 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">✅ Fixed</h3>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto"><code className="text-sm text-green-200">{`// require an unguessable token
POST /transfer
Cookie: session=abc; SameSite=Strict
X-CSRF-Token: 9f3c1a...
amount=1000&to=bob
// server validates token per session`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hardening' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-8 border-2 border-red-700">
              <h2 className="text-3xl font-bold text-white mb-6">Secure Secret Storage</h2>
              <p className="text-gray-300 text-lg mb-6">
                API keys, database passwords, and signing keys must never be hard-coded in source or committed to git, where
                they live forever in history and leak through repository access.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 mb-3">🔑 Use a Secrets Manager</h3>
                  <p className="text-gray-300">Store secrets in HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault with access control, rotation, and audit logging</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 mb-3">🌱 Environment Variables</h3>
                  <p className="text-gray-300">Inject secrets at runtime via environment variables; keep .env files out of git with .gitignore</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 mb-3">🚫 Never in Code or Git</h3>
                  <p className="text-gray-300">Scan repos with tools like gitleaks; if a secret is committed, rotate it immediately — deleting the line is not enough</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-red-700">
                  <h3 className="font-bold text-red-400 mb-3">♻️ Rotate Regularly</h3>
                  <p className="text-gray-300">Short-lived, automatically rotated credentials limit the damage window if a secret leaks</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-amber-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Firewalls & Port Management</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Close Unused Ports</h3>
                  <p className="text-gray-300">Every open port is attack surface. Expose only what is required (e.g. 443) and keep admin ports like SSH off the public internet or behind a bastion/VPN.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Least Privilege</h3>
                  <p className="text-gray-300">Default-deny: block all inbound traffic, then allow only specific ports from specific sources. Apply the same principle to service accounts and IAM roles.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Security Groups</h3>
                  <p className="text-gray-300">Cloud security groups and network ACLs act as virtual firewalls. Restrict ingress by port, protocol, and source CIDR, and segment tiers (web, app, database) into separate subnets.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 rounded-2xl p-8 border-2 border-amber-700">
              <h2 className="text-3xl font-bold text-white mb-6">DDoS Basics</h2>
              <p className="text-gray-300 text-lg mb-6">
                A Distributed Denial of Service attack overwhelms a target with traffic from many sources to exhaust its
                resources and make it unavailable. Attacks fall into three broad categories:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 mb-2">Volumetric</h3>
                  <p className="text-gray-300 text-sm">Saturate bandwidth with massive traffic floods (e.g. UDP or DNS amplification)</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 mb-2">Protocol</h3>
                  <p className="text-gray-300 text-sm">Exhaust server/firewall state tables (e.g. SYN floods abusing the TCP handshake)</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 mb-2">Application-layer</h3>
                  <p className="text-gray-300 text-sm">Low-volume but expensive requests (e.g. HTTP floods hitting costly endpoints)</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Mitigations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 mb-2">Rate Limiting</h3>
                  <p className="text-gray-300 text-sm">Cap requests per client/IP and throttle or drop abusive traffic</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 mb-2">CDN & WAF</h3>
                  <p className="text-gray-300 text-sm">Absorb volumetric attacks at the edge and filter malicious application-layer requests</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 mb-2">Autoscaling</h3>
                  <p className="text-gray-300 text-sm">Scale capacity horizontally to absorb traffic spikes while you respond</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-amber-700">
                  <h3 className="font-bold text-amber-400 mb-2">Blackholing</h3>
                  <p className="text-gray-300 text-sm">Route attack traffic to a null destination to protect the rest of the network</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

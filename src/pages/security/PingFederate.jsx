import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// PingFederate SSO Flow Diagram
const PingFederateSSODiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">PingFederate SSO Flow</text>

    <rect x="20" y="50" width="100" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="70" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">User /</text>
    <text x="70" y="84" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Browser</text>

    <rect x="160" y="50" width="110" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="215" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Service</text>
    <text x="215" y="84" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Provider (SP)</text>

    <rect x="310" y="50" width="120" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="370" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">PingFederate</text>
    <text x="370" y="84" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Server</text>

    <rect x="470" y="50" width="110" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="525" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Identity</text>
    <text x="525" y="84" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Provider (IdP)</text>

    <rect x="620" y="50" width="100" height="50" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="670" y="72" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Identity</text>
    <text x="670" y="84" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Store (LDAP)</text>

    <path d="M 120 75 L 155 75" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <path d="M 270 75 L 305 75" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <path d="M 430 75 L 465 75" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <path d="M 580 75 L 615 75" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>

    <text x="137" y="67" textAnchor="middle" fill="#94a3b8" fontSize="7">1</text>
    <text x="287" y="67" textAnchor="middle" fill="#94a3b8" fontSize="7">2</text>
    <text x="447" y="67" textAnchor="middle" fill="#94a3b8" fontSize="7">3</text>
    <text x="597" y="67" textAnchor="middle" fill="#94a3b8" fontSize="7">4</text>

    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
      </marker>
    </defs>

    <rect x="60" y="120" width="680" height="85" rx="6" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    <text x="400" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Supported Protocols &amp; Standards</text>
    <text x="140" y="165" textAnchor="middle" fill="#60a5fa" fontSize="9">SAML 2.0</text>
    <text x="290" y="165" textAnchor="middle" fill="#4ade80" fontSize="9">OAuth 2.0 / OIDC</text>
    <text x="440" y="165" textAnchor="middle" fill="#fbbf24" fontSize="9">WS-Federation</text>
    <text x="590" y="165" textAnchor="middle" fill="#f472b6" fontSize="9">SCIM</text>
    <text x="400" y="190" textAnchor="middle" fill="#64748b" fontSize="8">Enterprise SSO &amp; Identity Federation Hub</text>
  </svg>
)

export default function PingFederate({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'architecture', label: '🏗️ Architecture', icon: '🏗️' },
    { id: 'protocols', label: '🔗 Protocols', icon: '🔗' },
    { id: 'implementation', label: '⚙️ Implementation', icon: '⚙️' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-white p-6">
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="mb-6 px-6 py-3 bg-gray-800 border border-red-700 text-red-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold flex items-center gap-2"
            >
              <span>&larr;</span>
              <span>Back to Security</span>
            </button>

            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl shadow-2xl p-8 text-white border border-red-700">
              <h1 className="text-4xl font-bold mb-3" style={{
                background: 'linear-gradient(to right, #fca5a5, #ef4444)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>🔐 PingFederate</h1>
              <p className="text-xl text-gray-300">Enterprise Identity Federation &amp; SSO Platform</p>
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
                      ? 'bg-red-600 text-white shadow-lg'
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
                {/* SSO Flow Diagram */}
                <div className="bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-red-600">
                  <PingFederateSSODiagram />
                </div>

                {/* What is PingFederate */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-red-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">💡</span>
                    What is PingFederate?
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    PingFederate is an enterprise-grade identity federation server developed by Ping Identity. It provides
                    Single Sign-On (SSO), identity federation, API security, and centralized authentication for organizations
                    managing access across applications, partners, and cloud environments.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Enterprise Single Sign-On (SSO)',
                      'Identity federation across organizations',
                      'Multi-protocol support (SAML, OAuth, OIDC)',
                      'Centralized authentication hub',
                      'API access management',
                      'Integration with LDAP, AD, and databases'
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-red-900/30 rounded-lg">
                        <span className="text-red-400 font-bold text-sm mt-0.5">{idx + 1}</span>
                        <span className="text-gray-300 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Concepts */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📖</span>
                    Key Concepts
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        term: 'Identity Provider (IdP)',
                        icon: '🏢',
                        description: 'Authenticates users and asserts their identity to service providers',
                        example: 'Corporate Active Directory authenticating employees',
                        color: 'blue'
                      },
                      {
                        term: 'Service Provider (SP)',
                        icon: '📱',
                        description: 'Application that relies on PingFederate for authentication',
                        example: 'Salesforce, Workday, custom internal apps',
                        color: 'purple'
                      },
                      {
                        term: 'Federation',
                        icon: '🤝',
                        description: 'Trust relationship between IdP and SP enabling cross-domain SSO',
                        example: 'Partner organization accessing your portal without separate credentials',
                        color: 'green'
                      },
                      {
                        term: 'Token Translation',
                        icon: '🔄',
                        description: 'Converting tokens between protocols (e.g., SAML to OAuth)',
                        example: 'SAML assertion from IdP converted to OAuth access token for API',
                        color: 'orange'
                      }
                    ].map((item, index) => (
                      <div key={index} className={`bg-${item.color}-900/30 p-6 rounded-xl border-l-4 border-${item.color}-500`}>
                        <div className="flex items-start gap-4">
                          <span className="text-4xl">{item.icon}</span>
                          <div>
                            <h4 className={`font-bold text-${item.color}-400 text-lg mb-2`}>{item.term}</h4>
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

                {/* PingFederate vs Other Solutions */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-amber-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">⚖️</span>
                    PingFederate vs Other Identity Solutions
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="p-3 text-gray-400">Feature</th>
                          <th className="p-3 text-red-400">PingFederate</th>
                          <th className="p-3 text-blue-400">Okta</th>
                          <th className="p-3 text-green-400">Keycloak</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Deployment', 'On-prem / hybrid', 'Cloud-only (SaaS)', 'On-prem / container'],
                          ['SAML Support', 'Full (IdP + SP)', 'Full (IdP + SP)', 'Full (IdP + SP)'],
                          ['OAuth/OIDC', 'Full support', 'Full support', 'Full support'],
                          ['Enterprise Focus', 'Large enterprise', 'Mid-to-large', 'Any size'],
                          ['Licensing', 'Commercial', 'Commercial (SaaS)', 'Open source'],
                          ['Customization', 'Highly extensible', 'Limited', 'Highly extensible'],
                          ['Federation Hub', 'Native support', 'Via integration', 'Via configuration']
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b border-gray-700">
                            <td className="p-3 font-medium text-gray-300">{row[0]}</td>
                            <td className="p-3 text-gray-400">{row[1]}</td>
                            <td className="p-3 text-gray-400">{row[2]}</td>
                            <td className="p-3 text-gray-400">{row[3]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-8">
                {/* Core Components */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🏗️</span>
                    Core Components
                  </h3>

                  <div className="space-y-4">
                    {[
                      {
                        name: 'PingFederate Server (Runtime Engine)',
                        description: 'Core server processing authentication requests, issuing tokens, and managing federation connections. Handles all protocol processing.',
                        details: 'Runs as a Java application on port 9031 (admin) and 9999 (runtime). Supports clustering for HA.',
                        color: 'blue'
                      },
                      {
                        name: 'IdP Adapters',
                        description: 'Pluggable modules that connect PingFederate to identity stores for user authentication.',
                        details: 'Built-in adapters: HTML Form, Kerberos, Certificate, Composite. Custom adapters via Java SDK.',
                        color: 'green'
                      },
                      {
                        name: 'SP Adapters',
                        description: 'Handle delivery of identity information to service provider applications after authentication.',
                        details: 'OpenToken adapter for cookie-based SSO, custom adapters for legacy apps.',
                        color: 'purple'
                      },
                      {
                        name: 'Data Stores',
                        description: 'Connections to external identity repositories for user lookup and attribute retrieval.',
                        details: 'LDAP (Active Directory), JDBC databases, custom data store plugins.',
                        color: 'orange'
                      },
                      {
                        name: 'Authentication Policy Engine',
                        description: 'Flexible policy framework for multi-step, conditional authentication workflows.',
                        details: 'Supports MFA, risk-based auth, step-up authentication, and policy chaining.',
                        color: 'cyan'
                      }
                    ].map((component, idx) => (
                      <div key={idx} className={`bg-${component.color}-900/30 p-6 rounded-xl border-l-4 border-${component.color}-500`}>
                        <h4 className={`font-bold text-${component.color}-400 text-lg mb-2`}>{component.name}</h4>
                        <p className="text-gray-300 mb-2">{component.description}</p>
                        <div className="text-sm text-gray-400 bg-gray-900 p-3 rounded">
                          {component.details}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Federation Hub Model */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🌐</span>
                    Federation Hub Model
                  </h3>
                  <p className="text-lg text-gray-300 mb-6">
                    PingFederate acts as a central federation hub, brokering trust between multiple IdPs and SPs.
                    Instead of point-to-point connections, all parties connect to PingFederate, reducing complexity
                    from O(n&sup2;) to O(n) connections.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-900/30 p-6 rounded-xl border-2 border-red-700">
                      <h4 className="font-bold text-red-400 mb-3 text-lg flex items-center gap-2">
                        <span>❌</span> Without Hub (Point-to-Point)
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>&#x2022; Each SP connects directly to each IdP</li>
                        <li>&#x2022; N SPs &times; M IdPs = N&times;M connections</li>
                        <li>&#x2022; Complex certificate and metadata management</li>
                        <li>&#x2022; Adding a new partner requires updating all SPs</li>
                      </ul>
                    </div>

                    <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-700">
                      <h4 className="font-bold text-green-400 mb-3 text-lg flex items-center gap-2">
                        <span>✅</span> With PingFederate Hub
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>&#x2022; All SPs and IdPs connect to the hub</li>
                        <li>&#x2022; N SPs + M IdPs = N+M connections</li>
                        <li>&#x2022; Centralized certificate management</li>
                        <li>&#x2022; Adding a new partner is a single configuration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Deployment Architecture */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🖥️</span>
                    Deployment Architecture
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-green-900/30 p-6 rounded-xl border border-green-700">
                      <h4 className="font-bold text-green-400 mb-3">High Availability Cluster</h4>
                      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-green-400 text-sm">
{`┌─────────────────────────────────────────┐
│           Load Balancer (L7)            │
│        pingfederate.company.com         │
└──────────┬──────────────┬───────────────┘
           │              │
    ┌──────▼──────┐ ┌─────▼───────┐
    │   PF Node 1 │ │  PF Node 2  │
    │  (Active)   │ │  (Active)   │
    │  Port 9999  │ │  Port 9999  │
    └──────┬──────┘ └─────┬───────┘
           │              │
    ┌──────▼──────────────▼───────┐
    │    Shared Database / Cache   │
    │  (Session state, config)     │
    └──────────────┬──────────────┘
                   │
    ┌──────────────▼──────────────┐
    │     Identity Stores          │
    │  (LDAP / AD / Database)      │
    └─────────────────────────────┘`}
                        </pre>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { title: 'Admin Console', port: '9999', desc: 'Configuration and management UI' },
                        { title: 'Runtime Engine', port: '9031', desc: 'Handles SSO and token requests' },
                        { title: 'Provisioner', port: 'N/A', desc: 'SCIM-based user provisioning' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-gray-900 p-4 rounded-lg text-center">
                          <h5 className="font-bold text-blue-400 mb-1">{item.title}</h5>
                          <div className="text-xs text-gray-500 mb-2">Port: {item.port}</div>
                          <div className="text-sm text-gray-400">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Authentication Policies */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-orange-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📋</span>
                    Authentication Policy Tree
                  </h3>
                  <p className="text-lg text-gray-300 mb-6">
                    PingFederate uses a tree-based policy engine that allows branching logic for authentication decisions.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`Authentication Policy Tree Example:
─────────────────────────────────
├── [Start] → HTML Form Adapter
│   ├── Success → Check MFA Policy
│   │   ├── MFA Required → PingID Adapter
│   │   │   ├── Success → Done (Issue Token)
│   │   │   └── Failure → Access Denied
│   │   └── MFA Not Required → Done (Issue Token)
│   └── Failure → Check Certificate
│       ├── Valid Cert → Done (Issue Token)
│       └── Invalid → Access Denied

Policy Conditions:
• IP-based rules (internal vs external network)
• Group membership (admin vs regular user)
• Risk score from PingOne Protect
• Application-specific requirements`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'protocols' && (
              <div className="space-y-8">
                {/* SAML 2.0 */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">1️⃣</span>
                    SAML 2.0 (Primary Federation Protocol)
                  </h3>
                  <p className="text-lg text-gray-300 mb-6">
                    SAML is the most widely used protocol in PingFederate for enterprise SSO. It supports both
                    SP-Initiated and IdP-Initiated flows with XML-based assertions.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-700">
                      <h4 className="font-bold text-blue-400 mb-3">SP-Initiated SSO Flow</h4>
                      <ol className="space-y-2 text-sm text-gray-300">
                        <li>1. User accesses SP application (e.g., Salesforce)</li>
                        <li>2. SP generates SAML AuthnRequest, redirects to PingFederate</li>
                        <li>3. PingFederate authenticates user (via adapter)</li>
                        <li>4. PingFederate creates SAML Response with assertions</li>
                        <li>5. User is redirected back to SP with SAML Response</li>
                        <li>6. SP validates assertion and grants access</li>
                      </ol>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`<!-- SAML 2.0 Assertion (simplified) -->
<saml:Assertion xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="_abc123" IssueInstant="2024-01-15T10:30:00Z">

  <saml:Issuer>https://pingfederate.company.com</saml:Issuer>

  <saml:Subject>
    <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">
      john.doe@company.com
    </saml:NameID>
  </saml:Subject>

  <saml:Conditions NotBefore="2024-01-15T10:30:00Z"
                   NotOnOrAfter="2024-01-15T10:35:00Z">
    <saml:AudienceRestriction>
      <saml:Audience>https://salesforce.com</saml:Audience>
    </saml:AudienceRestriction>
  </saml:Conditions>

  <saml:AttributeStatement>
    <saml:Attribute Name="email">
      <saml:AttributeValue>john.doe@company.com</saml:AttributeValue>
    </saml:Attribute>
    <saml:Attribute Name="groups">
      <saml:AttributeValue>Engineering</saml:AttributeValue>
    </saml:Attribute>
  </saml:AttributeStatement>
</saml:Assertion>`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* OAuth 2.0 / OIDC */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">2️⃣</span>
                    OAuth 2.0 / OpenID Connect
                  </h3>
                  <p className="text-lg text-gray-300 mb-6">
                    PingFederate acts as an OAuth 2.0 Authorization Server and OpenID Connect Provider,
                    issuing access tokens and ID tokens for modern applications and APIs.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {[
                      { grant: 'Authorization Code + PKCE', use: 'Web & mobile apps', recommended: true },
                      { grant: 'Client Credentials', use: 'Service-to-service', recommended: true },
                      { grant: 'Token Exchange (RFC 8693)', use: 'Microservice chains', recommended: true },
                      { grant: 'Device Authorization', use: 'Smart TVs, IoT', recommended: false }
                    ].map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-lg border ${item.recommended ? 'bg-green-900/30 border-green-700' : 'bg-gray-900 border-gray-600'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={item.recommended ? 'text-green-400' : 'text-gray-400'}>{item.recommended ? '✅' : '⚙️'}</span>
                          <strong className={item.recommended ? 'text-green-400' : 'text-gray-300'}>{item.grant}</strong>
                        </div>
                        <div className="text-sm text-gray-400">{item.use}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`# PingFederate OAuth/OIDC Endpoints
Authorization:  /as/authorization.oauth2
Token:          /as/token.oauth2
UserInfo:       /as/userinfo.oauth2
JWKS:           /pf/JWKS
Discovery:      /.well-known/openid-configuration
Revocation:     /as/revoke_token.oauth2
Introspection:  /as/introspect.oauth2`}
                    </pre>
                  </div>
                </div>

                {/* WS-Federation */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">3️⃣</span>
                    WS-Federation
                  </h3>
                  <p className="text-lg text-gray-300 mb-6">
                    Used primarily for integration with Microsoft environments (ADFS, SharePoint, Office 365).
                    PingFederate supports WS-Federation passive profile for browser-based SSO.
                  </p>

                  <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700">
                    <h4 className="font-bold text-purple-400 mb-3">Common WS-Federation Use Cases</h4>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div>&#x2022; <strong>Office 365 SSO:</strong> PingFederate as IdP for Microsoft 365 authentication</div>
                      <div>&#x2022; <strong>SharePoint Integration:</strong> Federated authentication for SharePoint portals</div>
                      <div>&#x2022; <strong>ADFS Replacement:</strong> Migrating from ADFS to PingFederate while maintaining WS-Fed</div>
                      <div>&#x2022; <strong>Legacy .NET Apps:</strong> SSO for applications using Windows Identity Foundation (WIF)</div>
                    </div>
                  </div>
                </div>

                {/* SCIM */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-orange-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">4️⃣</span>
                    SCIM (User Provisioning)
                  </h3>
                  <p className="text-lg text-gray-300 mb-6">
                    System for Cross-domain Identity Management (SCIM) automates user lifecycle management -
                    creating, updating, and deprovisioning user accounts across connected applications.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
                    <pre className="text-green-400 text-sm">
{`# SCIM 2.0 Provisioning Flow

1. User Created in HR System (Workday)
   → PingFederate SCIM Inbound
   → Create user in Active Directory

2. User Updated (department change)
   → PingFederate SCIM Outbound
   → Update user attributes in Salesforce, ServiceNow

3. User Terminated
   → PingFederate SCIM Outbound
   → Deactivate accounts in all connected apps

# SCIM API Example
POST /scim/v2/Users
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "userName": "john.doe@company.com",
  "name": { "givenName": "John", "familyName": "Doe" },
  "emails": [{ "value": "john.doe@company.com", "primary": true }],
  "active": true
}`}
                    </pre>
                  </div>
                </div>

                {/* Protocol Comparison */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-cyan-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📊</span>
                    Protocol Selection Guide
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="p-3 text-gray-400">Scenario</th>
                          <th className="p-3 text-gray-400">Recommended Protocol</th>
                          <th className="p-3 text-gray-400">Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Enterprise web SSO', 'SAML 2.0', 'Mature, widely adopted in enterprises'],
                          ['Mobile / SPA apps', 'OAuth 2.0 + OIDC', 'Token-based, lightweight, PKCE support'],
                          ['API authorization', 'OAuth 2.0', 'Bearer tokens, scope-based access'],
                          ['Microsoft integration', 'WS-Federation', 'Native O365 / SharePoint support'],
                          ['User provisioning', 'SCIM 2.0', 'Standard for lifecycle management'],
                          ['Microservice auth', 'OAuth 2.0 (Client Credentials)', 'Service-to-service tokens']
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b border-gray-700">
                            <td className="p-3 font-medium text-gray-300">{row[0]}</td>
                            <td className="p-3 text-blue-400">{row[1]}</td>
                            <td className="p-3 text-gray-400">{row[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'implementation' && (
              <div className="space-y-8">
                {/* SP Connection Configuration */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔧</span>
                    Configuring an SP Connection (SAML)
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-gray-800 border-l-4 border-green-500 p-4 rounded-lg shadow">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                        <div>
                          <strong className="text-white">Import SP Metadata</strong>
                          <div className="text-sm text-gray-400 mt-1">
                            Upload the SP metadata XML or enter the metadata URL. This contains the SP entity ID,
                            assertion consumer service URL, and signing certificate.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 border-l-4 border-blue-500 p-4 rounded-lg shadow">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                        <div>
                          <strong className="text-white">Configure Attribute Contract</strong>
                          <div className="text-sm text-gray-400 mt-1">
                            Define which user attributes to include in the SAML assertion (email, name, groups, etc.)
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 border-l-4 border-purple-500 p-4 rounded-lg shadow">
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                        <div>
                          <strong className="text-white">Map Adapter to Connection</strong>
                          <div className="text-sm text-gray-400 mt-1">
                            Link an IdP adapter (authentication method) and map adapter attributes to the assertion contract.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 border-l-4 border-orange-500 p-4 rounded-lg shadow">
                      <div className="flex items-start gap-3">
                        <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">4</div>
                        <div>
                          <strong className="text-white">Set Signing &amp; Encryption</strong>
                          <div className="text-sm text-gray-400 mt-1">
                            Configure assertion signing certificate and optional encryption. Use SHA-256 for signing.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 border-l-4 border-cyan-500 p-4 rounded-lg shadow">
                      <div className="flex items-start gap-3">
                        <div className="bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">5</div>
                        <div>
                          <strong className="text-white">Activate Connection</strong>
                          <div className="text-sm text-gray-400 mt-1">
                            Enable the connection and test with SP-initiated SSO. Verify assertion contents with SAML tracer.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OAuth Client Configuration */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔑</span>
                    OAuth 2.0 Client Configuration
                  </h3>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-6">
                    <pre className="text-green-400 text-sm">
{`# PingFederate Admin API - Create OAuth Client
POST /pf-admin-api/v1/oauth/clients

{
  "clientId": "my-web-app",
  "name": "My Web Application",
  "redirectUris": ["https://app.company.com/callback"],
  "grantTypes": [
    "AUTHORIZATION_CODE",
    "REFRESH_TOKEN"
  ],
  "clientAuth": {
    "type": "SECRET",
    "secret": "generated-client-secret"
  },
  "oidcPolicy": {
    "grantAccessSessionRevocationApi": false,
    "pairwiseIdentifierUserType": false,
    "sectorIdentifierUri": null,
    "idTokenSigningAlgorithm": "RS256"
  },
  "jwksSettings": {
    "jwksUrl": "https://app.company.com/.well-known/jwks.json"
  },
  "accessTokenManagerRef": {
    "id": "jwt_access_token_manager"
  },
  "defaultAccessTokenManagerRef": {
    "id": "jwt_access_token_manager"
  },
  "requirePushedAuthorizationRequests": false,
  "requireProofKeyForCodeExchange": true
}`}
                    </pre>
                  </div>
                </div>

                {/* Spring Boot Integration */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">☕</span>
                    Spring Boot Integration with PingFederate
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-purple-400 mb-3">1. OIDC Client Configuration (application.yml)</h4>
                      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-green-400 text-sm">
{`spring:
  security:
    oauth2:
      client:
        registration:
          pingfederate:
            client-id: my-web-app
            client-secret: \${PF_CLIENT_SECRET}
            scope: openid, profile, email
            authorization-grant-type: authorization_code
            redirect-uri: "{baseUrl}/login/oauth2/code/pingfederate"
        provider:
          pingfederate:
            issuer-uri: https://pingfederate.company.com
            authorization-uri: https://pingfederate.company.com/as/authorization.oauth2
            token-uri: https://pingfederate.company.com/as/token.oauth2
            user-info-uri: https://pingfederate.company.com/as/userinfo.oauth2
            jwk-set-uri: https://pingfederate.company.com/pf/JWKS`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-purple-400 mb-3">2. Resource Server (JWT Validation)</h4>
                      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-green-400 text-sm">
{`spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://pingfederate.company.com
          jwk-set-uri: https://pingfederate.company.com/pf/JWKS

---
@Configuration
@EnableWebSecurity
public class PingFederateSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(pingFederateJwtConverter())
                )
            );
        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter pingFederateJwtConverter() {
        // PingFederate typically uses "scope" or custom claims for roles
        JwtGrantedAuthoritiesConverter converter =
            new JwtGrantedAuthoritiesConverter();
        converter.setAuthoritiesClaimName("groups");
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
                      <h4 className="text-lg font-bold text-purple-400 mb-3">3. SAML Integration (Spring Security SAML)</h4>
                      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-green-400 text-sm">
{`<!-- Maven dependency -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-saml2-service-provider</artifactId>
</dependency>

---
# application.yml
spring:
  security:
    saml2:
      relyingparty:
        registration:
          pingfederate:
            entity-id: https://myapp.company.com
            signing:
              credentials:
                - private-key-location: classpath:saml/sp-private.key
                  certificate-location: classpath:saml/sp-cert.crt
            assertingparty:
              metadata-uri: https://pingfederate.company.com/pf/federation_metadata.ping?PartnerSpId=myapp`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Token Translation */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-orange-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔄</span>
                    Token Translation (SAML to OAuth)
                  </h3>
                  <p className="text-lg text-gray-300 mb-6">
                    PingFederate can translate between protocols, allowing a SAML-authenticated user to
                    obtain an OAuth access token for API access - bridging legacy and modern architectures.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`# Token Exchange Flow (RFC 8693)
# Convert SAML assertion to OAuth access token

POST /as/token.oauth2
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
&subject_token=<base64-encoded-saml-assertion>
&subject_token_type=urn:ietf:params:oauth:token-type:saml2
&requested_token_type=urn:ietf:params:oauth:token-type:access_token
&client_id=my-api-client
&client_secret=client-secret
&scope=api:read api:write

# Response
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token"
}`}
                    </pre>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-xl shadow-xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span>✅</span>
                    PingFederate Implementation Checklist
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Use HTTPS for all PingFederate endpoints',
                      'Enable PKCE for all OAuth public clients',
                      'Configure certificate rotation procedures',
                      'Set up audit logging for all SSO events',
                      'Implement session timeout policies',
                      'Use strong signing algorithms (RS256+)',
                      'Configure IP-based access policies',
                      'Test failover in HA cluster setup',
                      'Implement SCIM for user lifecycle management',
                      'Document all federation partner connections',
                      'Monitor token issuance rates for anomalies',
                      'Keep PingFederate updated to latest patch'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-red-200">&#x2713;</span>
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

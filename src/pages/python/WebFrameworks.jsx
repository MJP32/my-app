import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import Breadcrumb from '../../components/Breadcrumb'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

// SVG Diagram Components

// 1. Request-Response Cycle Diagram
const RequestResponseDiagram = () => (
  <svg viewBox="0 0 600 200" style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
    <defs>
      <linearGradient id="clientGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="serverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="responseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6d28d9" />
      </linearGradient>
      <marker id="arrowHead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
      <marker id="arrowHeadReturn" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#a78bfa" />
      </marker>
    </defs>

    {/* Client Box */}
    <rect x="20" y="60" width="120" height="80" rx="10" fill="url(#clientGradient)" />
    <text x="80" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Client</text>
    <text x="80" y="115" textAnchor="middle" fill="#bfdbfe" fontSize="11">Browser/App</text>

    {/* Server Box */}
    <rect x="240" y="60" width="120" height="80" rx="10" fill="url(#serverGradient)" />
    <text x="300" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Server</text>
    <text x="300" y="115" textAnchor="middle" fill="#a7f3d0" fontSize="11">Flask/Django</text>

    {/* Response Box */}
    <rect x="460" y="60" width="120" height="80" rx="10" fill="url(#responseGradient)" />
    <text x="520" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Response</text>
    <text x="520" y="115" textAnchor="middle" fill="#ddd6fe" fontSize="11">HTML/JSON</text>

    {/* Request Arrow */}
    <path d="M 145 85 L 235 85" stroke="#60a5fa" strokeWidth="3" fill="none" markerEnd="url(#arrowHead)" />
    <text x="190" y="75" textAnchor="middle" fill="#93c5fd" fontSize="10">HTTP Request</text>

    {/* Process Arrow */}
    <path d="M 365 100 L 455 100" stroke="#60a5fa" strokeWidth="3" fill="none" markerEnd="url(#arrowHead)" />
    <text x="410" y="90" textAnchor="middle" fill="#93c5fd" fontSize="10">Generate</text>

    {/* Return Arrow */}
    <path d="M 460 130 C 300 180, 200 180, 140 130" stroke="#a78bfa" strokeWidth="3" fill="none" markerEnd="url(#arrowHeadReturn)" />
    <text x="300" y="175" textAnchor="middle" fill="#c4b5fd" fontSize="10">HTTP Response</text>
  </svg>
)

// 2. Flask Architecture Diagram
const FlaskArchitectureDiagram = () => (
  <svg viewBox="0 0 650 280" style={{ width: '100%', maxWidth: '650px', height: 'auto' }}>
    <defs>
      <linearGradient id="flaskBlack" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#374151" />
        <stop offset="100%" stopColor="#1f2937" />
      </linearGradient>
      <linearGradient id="flaskWhite" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f9fafb" />
        <stop offset="100%" stopColor="#e5e7eb" />
      </linearGradient>
      <marker id="flaskArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="10" y="10" width="630" height="260" rx="15" fill="#111827" stroke="#374151" strokeWidth="2" />

    {/* Title */}
    <text x="325" y="40" textAnchor="middle" fill="#f9fafb" fontSize="16" fontWeight="bold">Flask Application Architecture</text>

    {/* Request Entry */}
    <rect x="30" y="70" width="100" height="60" rx="8" fill="url(#flaskBlack)" stroke="#6b7280" strokeWidth="2" />
    <text x="80" y="95" textAnchor="middle" fill="#f9fafb" fontSize="12" fontWeight="bold">Request</text>
    <text x="80" y="112" textAnchor="middle" fill="#9ca3af" fontSize="10">HTTP</text>

    {/* Routes/URL Rules */}
    <rect x="170" y="70" width="100" height="60" rx="8" fill="url(#flaskWhite)" stroke="#374151" strokeWidth="2" />
    <text x="220" y="95" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">Routes</text>
    <text x="220" y="112" textAnchor="middle" fill="#6b7280" fontSize="10">@app.route</text>

    {/* Views/Functions */}
    <rect x="310" y="70" width="100" height="60" rx="8" fill="url(#flaskBlack)" stroke="#6b7280" strokeWidth="2" />
    <text x="360" y="95" textAnchor="middle" fill="#f9fafb" fontSize="12" fontWeight="bold">Views</text>
    <text x="360" y="112" textAnchor="middle" fill="#9ca3af" fontSize="10">Functions</text>

    {/* Templates */}
    <rect x="450" y="70" width="100" height="60" rx="8" fill="url(#flaskWhite)" stroke="#374151" strokeWidth="2" />
    <text x="500" y="95" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">Templates</text>
    <text x="500" y="112" textAnchor="middle" fill="#6b7280" fontSize="10">Jinja2</text>

    {/* Response */}
    <rect x="520" y="170" width="100" height="60" rx="8" fill="url(#flaskBlack)" stroke="#6b7280" strokeWidth="2" />
    <text x="570" y="195" textAnchor="middle" fill="#f9fafb" fontSize="12" fontWeight="bold">Response</text>
    <text x="570" y="212" textAnchor="middle" fill="#9ca3af" fontSize="10">HTML/JSON</text>

    {/* Database (optional) */}
    <rect x="310" y="170" width="100" height="60" rx="8" fill="url(#flaskWhite)" stroke="#374151" strokeWidth="2" />
    <text x="360" y="195" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">Database</text>
    <text x="360" y="212" textAnchor="middle" fill="#6b7280" fontSize="10">SQLAlchemy</text>

    {/* Arrows */}
    <path d="M 135 100 L 165 100" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#flaskArrow)" />
    <path d="M 275 100 L 305 100" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#flaskArrow)" />
    <path d="M 415 100 L 445 100" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#flaskArrow)" />
    <path d="M 500 135 L 500 160 L 520 160 L 520 165" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#flaskArrow)" />
    <path d="M 360 135 L 360 165" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#flaskArrow)" />
    <path d="M 360 135 L 360 150 L 500 150 L 500 135" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" fill="none" />
  </svg>
)

// 3. Django MVT Diagram
const DjangoMVTDiagram = () => (
  <svg viewBox="0 0 600 320" style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
    <defs>
      <linearGradient id="djangoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="djangoDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0f4c3a" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>
      <marker id="djangoArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="10" y="10" width="580" height="300" rx="15" fill="#0c1f17" stroke="#16a34a" strokeWidth="2" />

    {/* Title */}
    <text x="300" y="40" textAnchor="middle" fill="#4ade80" fontSize="16" fontWeight="bold">Django MVT Pattern</text>

    {/* URL Dispatcher */}
    <rect x="230" y="60" width="140" height="50" rx="8" fill="url(#djangoGreen)" />
    <text x="300" y="85" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">URL Dispatcher</text>
    <text x="300" y="100" textAnchor="middle" fill="#dcfce7" fontSize="10">urls.py</text>

    {/* Model */}
    <rect x="50" y="160" width="130" height="70" rx="10" fill="url(#djangoDark)" stroke="#22c55e" strokeWidth="2" />
    <text x="115" y="190" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">Model</text>
    <text x="115" y="210" textAnchor="middle" fill="#86efac" fontSize="10">models.py</text>
    <text x="115" y="222" textAnchor="middle" fill="#6b7280" fontSize="9">Database/ORM</text>

    {/* View */}
    <rect x="235" y="160" width="130" height="70" rx="10" fill="url(#djangoDark)" stroke="#22c55e" strokeWidth="2" />
    <text x="300" y="190" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">View</text>
    <text x="300" y="210" textAnchor="middle" fill="#86efac" fontSize="10">views.py</text>
    <text x="300" y="222" textAnchor="middle" fill="#6b7280" fontSize="9">Business Logic</text>

    {/* Template */}
    <rect x="420" y="160" width="130" height="70" rx="10" fill="url(#djangoDark)" stroke="#22c55e" strokeWidth="2" />
    <text x="485" y="190" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">Template</text>
    <text x="485" y="210" textAnchor="middle" fill="#86efac" fontSize="10">*.html</text>
    <text x="485" y="222" textAnchor="middle" fill="#6b7280" fontSize="9">Presentation</text>

    {/* Response */}
    <rect x="230" y="260" width="140" height="40" rx="8" fill="url(#djangoGreen)" />
    <text x="300" y="285" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">HTTP Response</text>

    {/* Arrows */}
    <path d="M 300 115 L 300 155" stroke="#4ade80" strokeWidth="2" fill="none" markerEnd="url(#djangoArrow)" />
    <text x="315" y="138" fill="#86efac" fontSize="9">Route</text>

    <path d="M 230 195 L 185 195" stroke="#4ade80" strokeWidth="2" fill="none" markerEnd="url(#djangoArrow)" />
    <text x="207" y="188" fill="#86efac" fontSize="9">Query</text>

    <path d="M 180 190 L 230 190" stroke="#4ade80" strokeWidth="2" fill="none" strokeDasharray="4" />
    <text x="207" y="205" fill="#6b7280" fontSize="9">Data</text>

    <path d="M 370 195 L 415 195" stroke="#4ade80" strokeWidth="2" fill="none" markerEnd="url(#djangoArrow)" />
    <text x="390" y="188" fill="#86efac" fontSize="9">Context</text>

    <path d="M 485 235 L 485 250 L 300 250 L 300 255" stroke="#4ade80" strokeWidth="2" fill="none" markerEnd="url(#djangoArrow)" />
    <text x="400" y="248" fill="#86efac" fontSize="9">Rendered HTML</text>
  </svg>
)

// 4. Middleware Diagram
const MiddlewareDiagram = () => (
  <svg viewBox="0 0 600 350" style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
    <defs>
      <linearGradient id="middleware1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="middleware2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="middleware3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <linearGradient id="middlewareCore" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <marker id="mwArrowDown" markerWidth="8" markerHeight="6" refX="4" refY="6" orient="auto">
        <polygon points="0 0, 8 0, 4 6" fill="#60a5fa" />
      </marker>
      <marker id="mwArrowUp" markerWidth="8" markerHeight="6" refX="4" refY="0" orient="auto">
        <polygon points="4 0, 8 6, 0 6" fill="#a78bfa" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="10" y="10" width="580" height="330" rx="15" fill="#111827" stroke="#374151" strokeWidth="2" />

    {/* Title */}
    <text x="300" y="40" textAnchor="middle" fill="#f9fafb" fontSize="16" fontWeight="bold">Middleware Pipeline</text>

    {/* Request Label */}
    <text x="120" y="70" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">REQUEST</text>
    <path d="M 120 80 L 120 300" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5" />

    {/* Response Label */}
    <text x="480" y="70" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">RESPONSE</text>
    <path d="M 480 80 L 480 300" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5" />

    {/* Middleware Layer 1 - Security */}
    <rect x="170" y="85" width="260" height="45" rx="8" fill="url(#middleware1)" />
    <text x="300" y="110" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Security Middleware</text>
    <text x="300" y="122" textAnchor="middle" fill="#fecaca" fontSize="9">CORS, CSRF, Headers</text>
    <path d="M 120 107 L 165 107" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#mwArrowDown)" />
    <path d="M 435 107 L 480 107" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#mwArrowUp)" />

    {/* Middleware Layer 2 - Auth */}
    <rect x="170" y="145" width="260" height="45" rx="8" fill="url(#middleware2)" />
    <text x="300" y="170" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Authentication Middleware</text>
    <text x="300" y="182" textAnchor="middle" fill="#fed7aa" fontSize="9">JWT, Session, OAuth</text>
    <path d="M 120 167 L 165 167" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#mwArrowDown)" />
    <path d="M 435 167 L 480 167" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#mwArrowUp)" />

    {/* Middleware Layer 3 - Logging */}
    <rect x="170" y="205" width="260" height="45" rx="8" fill="url(#middleware3)" />
    <text x="300" y="230" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Logging Middleware</text>
    <text x="300" y="242" textAnchor="middle" fill="#fef08a" fontSize="9">Request/Response Logging</text>
    <path d="M 120 227 L 165 227" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#mwArrowDown)" />
    <path d="M 435 227 L 480 227" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#mwArrowUp)" />

    {/* Application Core */}
    <rect x="200" y="270" width="200" height="50" rx="10" fill="url(#middlewareCore)" />
    <text x="300" y="295" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Application</text>
    <text x="300" y="310" textAnchor="middle" fill="#dcfce7" fontSize="10">Views / Handlers</text>
    <path d="M 120 295 L 195 295" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#mwArrowDown)" />
    <path d="M 405 295 L 480 295" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#mwArrowUp)" />

    {/* Vertical connecting lines */}
    <path d="M 300 130 L 300 145" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3" />
    <path d="M 300 190 L 300 205" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3" />
    <path d="M 300 250 L 300 270" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3" />
  </svg>
)

// 5. RESTful API Diagram
const RESTfulAPIDiagram = () => (
  <svg viewBox="0 0 650 320" style={{ width: '100%', maxWidth: '650px', height: 'auto' }}>
    <defs>
      <linearGradient id="getGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="postGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="putGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="deleteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="resourceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect x="10" y="10" width="630" height="300" rx="15" fill="#111827" stroke="#374151" strokeWidth="2" />

    {/* Title */}
    <text x="325" y="40" textAnchor="middle" fill="#f9fafb" fontSize="16" fontWeight="bold">RESTful API Endpoints</text>

    {/* Resource */}
    <rect x="260" y="60" width="130" height="50" rx="10" fill="url(#resourceGradient)" />
    <text x="325" y="85" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">/api/users</text>
    <text x="325" y="100" textAnchor="middle" fill="#ddd6fe" fontSize="10">Resource</text>

    {/* GET - Read */}
    <rect x="40" y="140" width="130" height="70" rx="8" fill="url(#getGradient)" />
    <text x="105" y="165" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">GET</text>
    <text x="105" y="182" textAnchor="middle" fill="#dcfce7" fontSize="10">Read/Retrieve</text>
    <text x="105" y="198" textAnchor="middle" fill="#bbf7d0" fontSize="9">200 OK</text>

    {/* POST - Create */}
    <rect x="190" y="140" width="130" height="70" rx="8" fill="url(#postGradient)" />
    <text x="255" y="165" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">POST</text>
    <text x="255" y="182" textAnchor="middle" fill="#dbeafe" fontSize="10">Create New</text>
    <text x="255" y="198" textAnchor="middle" fill="#bfdbfe" fontSize="9">201 Created</text>

    {/* PUT - Update */}
    <rect x="340" y="140" width="130" height="70" rx="8" fill="url(#putGradient)" />
    <text x="405" y="165" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PUT</text>
    <text x="405" y="182" textAnchor="middle" fill="#fed7aa" fontSize="10">Update/Replace</text>
    <text x="405" y="198" textAnchor="middle" fill="#fdba74" fontSize="9">200 OK</text>

    {/* DELETE - Remove */}
    <rect x="490" y="140" width="130" height="70" rx="8" fill="url(#deleteGradient)" />
    <text x="555" y="165" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">DELETE</text>
    <text x="555" y="182" textAnchor="middle" fill="#fecaca" fontSize="10">Remove</text>
    <text x="555" y="198" textAnchor="middle" fill="#fca5a5" fontSize="9">204 No Content</text>

    {/* Connecting lines from resource */}
    <path d="M 280 110 L 105 135" stroke="#6b7280" strokeWidth="1.5" />
    <path d="M 310 110 L 255 135" stroke="#6b7280" strokeWidth="1.5" />
    <path d="M 340 110 L 405 135" stroke="#6b7280" strokeWidth="1.5" />
    <path d="M 370 110 L 555 135" stroke="#6b7280" strokeWidth="1.5" />

    {/* Example endpoints */}
    <rect x="40" y="230" width="280" height="60" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="1" />
    <text x="50" y="250" fill="#4ade80" fontSize="11" fontFamily="monospace">GET  /api/users</text>
    <text x="190" y="250" fill="#9ca3af" fontSize="10">List all users</text>
    <text x="50" y="270" fill="#4ade80" fontSize="11" fontFamily="monospace">GET  /api/users/123</text>
    <text x="210" y="270" fill="#9ca3af" fontSize="10">Get user 123</text>

    <rect x="340" y="230" width="280" height="60" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="1" />
    <text x="350" y="250" fill="#60a5fa" fontSize="11" fontFamily="monospace">POST /api/users</text>
    <text x="490" y="250" fill="#9ca3af" fontSize="10">Create user</text>
    <text x="350" y="270" fill="#ef4444" fontSize="11" fontFamily="monospace">DELETE /api/users/123</text>
    <text x="530" y="270" fill="#9ca3af" fontSize="10">Delete user</text>
  </svg>
)

export default function WebFrameworks({ onBack, breadcrumb }) {
  const { isDarkTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('flask')

  const sections = [
    { id: 'flask', title: 'Flask Basics' },
    { id: 'fastapi', title: 'FastAPI' },
    { id: 'django', title: 'Django Overview' },
    { id: 'rest', title: 'REST API Design' },
    { id: 'auth', title: 'Authentication' },
    { id: 'database', title: 'Database Integration' }
  ]

  const cardStyle = {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginBottom: '1.5rem'
  }

  const headingStyle = {
    color: '#60a5fa',
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem'
  }

  const subHeadingStyle = {
    color: '#93c5fd',
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '0.75rem',
    marginTop: '1.25rem'
  }

  const textStyle = {
    color: '#d1d5db',
    lineHeight: '1.6'
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
        padding: '2rem'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#60a5fa',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>&larr;</span> Back
        </button>

        {/* Breadcrumb */}
        {breadcrumb && <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />}

        {/* Title */}
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#f9fafb',
            marginBottom: '0.5rem'
          }}
        >
          Python Web Frameworks
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
          A comprehensive guide to Flask, FastAPI, Django, and REST API development
        </p>

        {/* Section Navigation */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeSection === section.id ? '#3b82f6' : '#374151',
                color: activeSection === section.id ? '#ffffff' : '#d1d5db',
                fontWeight: activeSection === section.id ? '600' : '400',
                transition: 'all 0.2s'
              }}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Flask Basics Section */}
        {activeSection === 'flask' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>Flask Basics</h2>
              <p style={textStyle}>
                Flask is a lightweight WSGI web framework that provides essential tools for building web applications
                without imposing a specific project structure.
              </p>

              <h3 style={subHeadingStyle}>HTTP Request/Response Cycle</h3>
              <p style={{ ...textStyle, marginBottom: '1rem' }}>
                Understanding how HTTP requests flow through a web application is fundamental to building web services.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.5rem' }}>
                <RequestResponseDiagram />
              </div>

              <h3 style={subHeadingStyle}>Flask Application Architecture</h3>
              <p style={{ ...textStyle, marginBottom: '1rem' }}>
                Flask applications follow a simple but powerful architecture where requests are routed to view functions that return responses.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <FlaskArchitectureDiagram />
              </div>

              <h3 style={subHeadingStyle}>Basic Application Setup</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from flask import Flask, render_template, request, jsonify, redirect, url_for

app = Flask(__name__)

# Basic route
@app.route('/')
def home():
    return 'Hello, World!'

# Route with variable
@app.route('/user/<username>')
def show_user(username):
    return f'User: {username}'

# Route with type converter
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'

if __name__ == '__main__':
    app.run(debug=True, port=5000)`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>HTTP Methods</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from flask import Flask, request, jsonify

app = Flask(__name__)

# Handle multiple HTTP methods
@app.route('/api/items', methods=['GET', 'POST'])
def handle_items():
    if request.method == 'GET':
        # Return list of items
        items = [{'id': 1, 'name': 'Item 1'}, {'id': 2, 'name': 'Item 2'}]
        return jsonify(items)

    elif request.method == 'POST':
        # Create new item from JSON body
        data = request.get_json()
        new_item = {'id': 3, 'name': data.get('name')}
        return jsonify(new_item), 201

# Handle PUT and DELETE
@app.route('/api/items/<int:item_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_item(item_id):
    if request.method == 'GET':
        return jsonify({'id': item_id, 'name': f'Item {item_id}'})

    elif request.method == 'PUT':
        data = request.get_json()
        return jsonify({'id': item_id, 'name': data.get('name')})

    elif request.method == 'DELETE':
        return '', 204`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Request Handling</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from flask import Flask, request

app = Flask(__name__)

@app.route('/form', methods=['POST'])
def handle_form():
    # Access form data
    username = request.form.get('username')
    password = request.form.get('password')

    # Access query parameters
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)

    # Access JSON body
    json_data = request.get_json()

    # Access headers
    auth_header = request.headers.get('Authorization')
    content_type = request.content_type

    # Access files
    uploaded_file = request.files.get('document')
    if uploaded_file:
        uploaded_file.save(f'/uploads/{uploaded_file.filename}')

    # Access cookies
    session_id = request.cookies.get('session_id')

    return jsonify({'status': 'success'})`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Templates with Jinja2</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from flask import Flask, render_template

app = Flask(__name__)

@app.route('/profile/<username>')
def profile(username):
    user = {
        'name': username,
        'email': f'{username}@example.com',
        'posts': [
            {'title': 'First Post', 'content': 'Hello World'},
            {'title': 'Second Post', 'content': 'Flask is great'}
        ]
    }
    return render_template('profile.html', user=user)

# templates/profile.html
"""
<!DOCTYPE html>
<html>
<head>
    <title>{{ user.name }}'s Profile</title>
</head>
<body>
    <h1>{{ user.name }}</h1>
    <p>Email: {{ user.email }}</p>

    <h2>Posts</h2>
    {% for post in user.posts %}
        <article>
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
        </article>
    {% else %}
        <p>No posts yet.</p>
    {% endfor %}

    {% if user.is_admin %}
        <a href="{{ url_for('admin') }}">Admin Panel</a>
    {% endif %}
</body>
</html>
"""`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Blueprints for Modular Apps</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`# blueprints/auth.py
from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    # Login logic here
    return jsonify({'token': 'abc123'})

@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'Logged out'})

# blueprints/api.py
from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__, url_prefix='/api/v1')

@api_bp.route('/users')
def get_users():
    return jsonify([{'id': 1, 'name': 'John'}])

# app.py
from flask import Flask
from blueprints.auth import auth_bp
from blueprints.api import api_bp

app = Flask(__name__)
app.register_blueprint(auth_bp)
app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True)`}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {/* FastAPI Section */}
        {activeSection === 'fastapi' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>FastAPI</h2>
              <p style={textStyle}>
                FastAPI is a modern, high-performance web framework for building APIs with Python 3.7+
                based on standard Python type hints. It provides automatic documentation and validation.
              </p>

              <h3 style={subHeadingStyle}>Basic Application</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from fastapi import FastAPI, HTTPException, Query, Path
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(
    title="My API",
    description="A sample FastAPI application",
    version="1.0.0"
)

# Basic route
@app.get("/")
async def root():
    return {"message": "Hello World"}

# Path parameters with validation
@app.get("/items/{item_id}")
async def read_item(
    item_id: int = Path(..., title="Item ID", ge=1),
    q: Optional[str] = Query(None, max_length=50)
):
    return {"item_id": item_id, "q": q}

# Run with: uvicorn main:app --reload`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Pydantic Models for Request/Response</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

app = FastAPI()

# Enum for choices
class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

# Request model
class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    priority: Priority = Priority.medium
    due_date: Optional[datetime] = None

    class Config:
        schema_extra = {
            "example": {
                "title": "Complete project",
                "description": "Finish the API documentation",
                "priority": "high",
                "due_date": "2024-12-31T23:59:59"
            }
        }

# Response model
class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    priority: Priority
    due_date: Optional[datetime]
    created_at: datetime
    completed: bool = False

# Database simulation
tasks_db = []

@app.post("/tasks/", response_model=TaskResponse, status_code=201)
async def create_task(task: TaskCreate):
    new_task = TaskResponse(
        id=len(tasks_db) + 1,
        title=task.title,
        description=task.description,
        priority=task.priority,
        due_date=task.due_date,
        created_at=datetime.now()
    )
    tasks_db.append(new_task)
    return new_task

@app.get("/tasks/", response_model=List[TaskResponse])
async def list_tasks(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    priority: Optional[Priority] = None
):
    filtered = tasks_db
    if priority:
        filtered = [t for t in tasks_db if t.priority == priority]
    return filtered[skip:skip + limit]`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Async Endpoints</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from fastapi import FastAPI, BackgroundTasks
import asyncio
import httpx

app = FastAPI()

# Async HTTP client
async def fetch_external_data(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()

@app.get("/external-data")
async def get_external_data():
    # Fetch from multiple sources concurrently
    urls = [
        "https://api.example.com/data1",
        "https://api.example.com/data2"
    ]

    tasks = [fetch_external_data(url) for url in urls]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    return {"results": results}

# Background tasks
def send_notification(email: str, message: str):
    # Simulate sending email
    print(f"Sending to {email}: {message}")

@app.post("/tasks/{task_id}/complete")
async def complete_task(
    task_id: int,
    background_tasks: BackgroundTasks
):
    # Add background task
    background_tasks.add_task(
        send_notification,
        "user@example.com",
        f"Task {task_id} completed!"
    )
    return {"status": "completed", "task_id": task_id}`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Dependency Injection</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from fastapi import FastAPI, Depends, HTTPException, Header
from typing import Optional

app = FastAPI()

# Database dependency
async def get_db():
    db = DatabaseSession()
    try:
        yield db
    finally:
        db.close()

# Authentication dependency
async def get_current_user(
    authorization: Optional[str] = Header(None)
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")

    token = authorization.split(" ")[1]
    user = verify_token(token)  # Your verification logic

    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    return user

# Permission dependency
def require_role(required_role: str):
    async def role_checker(user = Depends(get_current_user)):
        if user.role != required_role:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user
    return role_checker

# Using dependencies
@app.get("/users/me")
async def read_current_user(user = Depends(get_current_user)):
    return user

@app.get("/admin/users")
async def list_all_users(
    user = Depends(require_role("admin")),
    db = Depends(get_db)
):
    return db.query(User).all()`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Automatic API Documentation</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from fastapi import FastAPI, Query, Path
from pydantic import BaseModel
from typing import List

app = FastAPI(
    title="User Management API",
    description="""
    ## User Management System

    This API provides endpoints for managing users:

    * **Create** new users
    * **Read** user information
    * **Update** user details
    * **Delete** users
    """,
    version="2.0.0",
    contact={
        "name": "API Support",
        "email": "support@example.com"
    }
)

class User(BaseModel):
    """User model for request/response"""
    id: int
    name: str
    email: str

@app.get(
    "/users/{user_id}",
    response_model=User,
    summary="Get a specific user",
    description="Retrieve a user by their unique identifier",
    response_description="The user details",
    tags=["users"]
)
async def get_user(
    user_id: int = Path(..., description="The unique user ID", example=123)
):
    """
    Get user by ID with all their information:

    - **user_id**: Required path parameter

    Returns the user object with id, name, and email.
    """
    return User(id=user_id, name="John Doe", email="john@example.com")

# Docs available at:
# - Swagger UI: http://localhost:8000/docs
# - ReDoc: http://localhost:8000/redoc
# - OpenAPI JSON: http://localhost:8000/openapi.json`}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {/* Django Section */}
        {activeSection === 'django' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>Django Overview</h2>
              <p style={textStyle}>
                Django is a high-level Python web framework that encourages rapid development and clean,
                pragmatic design. It follows the MTV (Model-Template-View) pattern.
              </p>

              <h3 style={subHeadingStyle}>Django Model-View-Template Pattern</h3>
              <p style={{ ...textStyle, marginBottom: '1rem' }}>
                Django uses the MTV pattern: Models handle data and database interactions, Views contain business logic,
                and Templates handle presentation.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <DjangoMVTDiagram />
              </div>

              <h3 style={subHeadingStyle}>Project Structure</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`# Create new project
django-admin startproject myproject
cd myproject

# Create new app
python manage.py startapp blog

# Project structure:
myproject/
    manage.py
    myproject/
        __init__.py
        settings.py
        urls.py
        wsgi.py
    blog/
        __init__.py
        admin.py
        apps.py
        models.py
        views.py
        urls.py
        templates/
            blog/
                post_list.html
                post_detail.html`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Models (ORM)</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`# blog/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "categories"
        ordering = ['name']

    def __str__(self):
        return self.name

class Post(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique_for_date='publish')
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='blog_posts'
    )
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='draft'
    )
    categories = models.ManyToManyField(Category, related_name='posts')

    class Meta:
        ordering = ['-publish']
        indexes = [
            models.Index(fields=['-publish']),
        ]

    def __str__(self):
        return self.title

# Create migrations
# python manage.py makemigrations
# python manage.py migrate`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Views</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`# blog/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import Q
from .models import Post, Category
from .forms import PostForm

# Function-based view
def post_list(request):
    posts = Post.objects.filter(status='published')

    # Search functionality
    query = request.GET.get('q')
    if query:
        posts = posts.filter(
            Q(title__icontains=query) |
            Q(body__icontains=query)
        )

    return render(request, 'blog/post_list.html', {'posts': posts})

def post_detail(request, year, month, day, slug):
    post = get_object_or_404(
        Post,
        slug=slug,
        status='published',
        publish__year=year,
        publish__month=month,
        publish__day=day
    )
    return render(request, 'blog/post_detail.html', {'post': post})

# Class-based views
class PostListView(ListView):
    model = Post
    template_name = 'blog/post_list.html'
    context_object_name = 'posts'
    paginate_by = 10

    def get_queryset(self):
        return Post.objects.filter(status='published')

class PostDetailView(DetailView):
    model = Post
    template_name = 'blog/post_detail.html'
    context_object_name = 'post'

class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    form_class = PostForm
    template_name = 'blog/post_form.html'

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

# API view returning JSON
@login_required
def post_api(request):
    posts = Post.objects.filter(status='published').values(
        'id', 'title', 'slug', 'publish'
    )
    return JsonResponse(list(posts), safe=False)`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>URL Configuration</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`# myproject/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls', namespace='blog')),
    path('api/', include('api.urls')),
]

# blog/urls.py
from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.PostListView.as_view(), name='post_list'),
    path(
        '<int:year>/<int:month>/<int:day>/<slug:slug>/',
        views.post_detail,
        name='post_detail'
    ),
    path('create/', views.PostCreateView.as_view(), name='post_create'),
    path('category/<slug:slug>/', views.category_posts, name='category'),
    path('api/posts/', views.post_api, name='post_api'),
]`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Templates</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`<!-- templates/base.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}My Blog{% endblock %}</title>
    {% load static %}
    <link rel="stylesheet" href="{% static 'css/style.css' %}">
</head>
<body>
    <nav>
        <a href="{% url 'blog:post_list' %}">Home</a>
        {% if user.is_authenticated %}
            <a href="{% url 'blog:post_create' %}">New Post</a>
            <span>Welcome, {{ user.username }}</span>
        {% else %}
            <a href="{% url 'login' %}">Login</a>
        {% endif %}
    </nav>

    <main>
        {% block content %}{% endblock %}
    </main>
</body>
</html>

<!-- templates/blog/post_list.html -->
{% extends 'base.html' %}

{% block title %}Blog Posts{% endblock %}

{% block content %}
    <h1>Blog Posts</h1>

    {% for post in posts %}
        <article>
            <h2>
                <a href="{% url 'blog:post_detail' post.publish.year post.publish.month post.publish.day post.slug %}">
                    {{ post.title }}
                </a>
            </h2>
            <p class="meta">
                Published {{ post.publish|date:"F j, Y" }} by {{ post.author }}
            </p>
            <p>{{ post.body|truncatewords:30 }}</p>
        </article>
    {% empty %}
        <p>No posts available.</p>
    {% endfor %}

    {% if page_obj.has_other_pages %}
        <div class="pagination">
            {% if page_obj.has_previous %}
                <a href="?page={{ page_obj.previous_page_number }}">Previous</a>
            {% endif %}
            <span>Page {{ page_obj.number }} of {{ page_obj.paginator.num_pages }}</span>
            {% if page_obj.has_next %}
                <a href="?page={{ page_obj.next_page_number }}">Next</a>
            {% endif %}
        </div>
    {% endif %}
{% endblock %}`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Django ORM Queries</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from blog.models import Post, Category
from django.db.models import Count, Q, F, Avg
from django.utils import timezone

# Basic queries
all_posts = Post.objects.all()
published = Post.objects.filter(status='published')
drafts = Post.objects.exclude(status='published')

# Get single object
post = Post.objects.get(id=1)
post = Post.objects.get_or_create(title='New Post', defaults={'body': '...'})

# Field lookups
recent = Post.objects.filter(publish__gte=timezone.now() - timedelta(days=7))
contains = Post.objects.filter(title__icontains='python')
starts = Post.objects.filter(title__startswith='How')

# Complex queries with Q objects
complex_query = Post.objects.filter(
    Q(title__icontains='django') | Q(body__icontains='django'),
    status='published'
)

# Ordering
ordered = Post.objects.order_by('-publish', 'title')

# Aggregation
stats = Post.objects.aggregate(
    total=Count('id'),
    avg_views=Avg('view_count')
)

# Annotation
categories = Category.objects.annotate(
    post_count=Count('posts')
).filter(post_count__gt=0)

# Select related (foreign key optimization)
posts = Post.objects.select_related('author').all()

# Prefetch related (many-to-many optimization)
posts = Post.objects.prefetch_related('categories').all()

# Update multiple records
Post.objects.filter(status='draft').update(status='published')

# F expressions (database-level operations)
Post.objects.filter(id=1).update(view_count=F('view_count') + 1)

# Raw SQL (when needed)
posts = Post.objects.raw('SELECT * FROM blog_post WHERE status = %s', ['published'])`}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {/* REST API Design Section */}
        {activeSection === 'rest' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>REST API Design</h2>
              <p style={textStyle}>
                RESTful APIs follow a set of conventions for creating web services that are scalable,
                stateless, and use standard HTTP methods for CRUD operations.
              </p>

              <h3 style={subHeadingStyle}>RESTful API Endpoints Overview</h3>
              <p style={{ ...textStyle, marginBottom: '1rem' }}>
                REST APIs map HTTP methods to CRUD operations on resources, providing a standardized way to interact with data.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <RESTfulAPIDiagram />
              </div>

              <h3 style={subHeadingStyle}>HTTP Methods and Status Codes</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`# HTTP Methods:
# GET     - Retrieve resource(s)
# POST    - Create new resource
# PUT     - Update entire resource
# PATCH   - Partial update
# DELETE  - Remove resource

# Common Status Codes:
# 200 OK                  - Success
# 201 Created             - Resource created
# 204 No Content          - Success with no response body
# 400 Bad Request         - Invalid request data
# 401 Unauthorized        - Authentication required
# 403 Forbidden           - Permission denied
# 404 Not Found           - Resource not found
# 409 Conflict            - Resource conflict
# 422 Unprocessable       - Validation error
# 500 Internal Error      - Server error`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Flask REST API Example</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from flask import Flask, request, jsonify, abort
from functools import wraps

app = Flask(__name__)

# In-memory database
users = {}
next_id = 1

# Error handlers
@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad Request', 'message': str(error.description)}), 400

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not Found', 'message': 'Resource not found'}), 404

# Validation decorator
def validate_json(*required_fields):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if not request.is_json:
                abort(400, description="Request must be JSON")
            data = request.get_json()
            for field in required_fields:
                if field not in data:
                    abort(400, description=f"Missing required field: {field}")
            return f(*args, **kwargs)
        return wrapper
    return decorator

# GET all users (with pagination)
@app.route('/api/users', methods=['GET'])
def get_users():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    user_list = list(users.values())
    start = (page - 1) * per_page
    end = start + per_page

    return jsonify({
        'users': user_list[start:end],
        'total': len(user_list),
        'page': page,
        'per_page': per_page,
        'pages': (len(user_list) + per_page - 1) // per_page
    })

# GET single user
@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    if user_id not in users:
        abort(404)
    return jsonify(users[user_id])

# POST create user
@app.route('/api/users', methods=['POST'])
@validate_json('name', 'email')
def create_user():
    global next_id
    data = request.get_json()

    # Check for duplicate email
    if any(u['email'] == data['email'] for u in users.values()):
        return jsonify({'error': 'Email already exists'}), 409

    user = {
        'id': next_id,
        'name': data['name'],
        'email': data['email'],
        'role': data.get('role', 'user')
    }
    users[next_id] = user
    next_id += 1

    return jsonify(user), 201

# PUT update user (full replacement)
@app.route('/api/users/<int:user_id>', methods=['PUT'])
@validate_json('name', 'email')
def update_user(user_id):
    if user_id not in users:
        abort(404)

    data = request.get_json()
    users[user_id] = {
        'id': user_id,
        'name': data['name'],
        'email': data['email'],
        'role': data.get('role', 'user')
    }
    return jsonify(users[user_id])

# PATCH partial update
@app.route('/api/users/<int:user_id>', methods=['PATCH'])
def patch_user(user_id):
    if user_id not in users:
        abort(404)

    data = request.get_json()
    user = users[user_id]

    if 'name' in data:
        user['name'] = data['name']
    if 'email' in data:
        user['email'] = data['email']
    if 'role' in data:
        user['role'] = data['role']

    return jsonify(user)

# DELETE user
@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    if user_id not in users:
        abort(404)

    del users[user_id]
    return '', 204`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>FastAPI REST API Example</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from fastapi import FastAPI, HTTPException, Query, Path
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

app = FastAPI()

# Pydantic models
class UserBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    role: str = "user"

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    role: Optional[str] = None

class UserResponse(UserBase):
    id: int
    created_at: datetime

class PaginatedUsers(BaseModel):
    users: List[UserResponse]
    total: int
    page: int
    per_page: int
    pages: int

# In-memory storage
users_db: dict[int, dict] = {}
next_id = 1

@app.get("/api/users", response_model=PaginatedUsers)
async def list_users(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=100)
):
    user_list = list(users_db.values())
    total = len(user_list)
    start = (page - 1) * per_page

    return PaginatedUsers(
        users=user_list[start:start + per_page],
        total=total,
        page=page,
        per_page=per_page,
        pages=(total + per_page - 1) // per_page
    )

@app.get("/api/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int = Path(..., ge=1)):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    return users_db[user_id]

@app.post("/api/users", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate):
    global next_id

    # Check duplicate email
    if any(u['email'] == user.email for u in users_db.values()):
        raise HTTPException(status_code=409, detail="Email already exists")

    new_user = {
        "id": next_id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "created_at": datetime.now()
    }
    users_db[next_id] = new_user
    next_id += 1

    return new_user

@app.put("/api/users/{user_id}", response_model=UserResponse)
async def replace_user(user_id: int, user: UserCreate):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")

    users_db[user_id] = {
        "id": user_id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "created_at": users_db[user_id]["created_at"]
    }
    return users_db[user_id]

@app.patch("/api/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user: UserUpdate):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")

    stored = users_db[user_id]
    update_data = user.dict(exclude_unset=True)

    for field, value in update_data.items():
        stored[field] = value

    return stored

@app.delete("/api/users/{user_id}", status_code=204)
async def delete_user(user_id: int):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")

    del users_db[user_id]
    return None`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Response Formatting Best Practices</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from flask import jsonify
from datetime import datetime

# Standard success response
def success_response(data, message="Success", status_code=200):
    return jsonify({
        "status": "success",
        "message": message,
        "data": data,
        "timestamp": datetime.utcnow().isoformat()
    }), status_code

# Standard error response
def error_response(message, status_code=400, errors=None):
    response = {
        "status": "error",
        "message": message,
        "timestamp": datetime.utcnow().isoformat()
    }
    if errors:
        response["errors"] = errors
    return jsonify(response), status_code

# Usage examples
@app.route('/api/users/<int:user_id>')
def get_user(user_id):
    user = find_user(user_id)
    if not user:
        return error_response("User not found", 404)
    return success_response(user)

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()

    # Validation
    errors = []
    if not data.get('name'):
        errors.append({"field": "name", "message": "Name is required"})
    if not data.get('email'):
        errors.append({"field": "email", "message": "Email is required"})

    if errors:
        return error_response("Validation failed", 422, errors)

    user = save_user(data)
    return success_response(user, "User created", 201)`}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {/* Authentication Section */}
        {activeSection === 'auth' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>Authentication</h2>
              <p style={textStyle}>
                Secure authentication is critical for web applications. This section covers JWT tokens,
                session management, and password handling best practices.
              </p>

              <h3 style={subHeadingStyle}>Middleware Pipeline</h3>
              <p style={{ ...textStyle, marginBottom: '1rem' }}>
                Authentication is typically implemented as middleware that intercepts requests before they reach your application logic.
                Understanding how requests pass through middleware layers is essential for implementing security.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <MiddlewareDiagram />
              </div>

              <h3 style={subHeadingStyle}>JWT Authentication with Flask</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from flask import Flask, request, jsonify
from functools import wraps
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'  # Use env variable in production

# User storage (use database in production)
users = {}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            data = jwt.decode(
                token,
                app.config['SECRET_KEY'],
                algorithms=['HS256']
            )
            current_user = users.get(data['user_id'])
            if not current_user:
                return jsonify({'error': 'User not found'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password required'}), 400

    if data['email'] in users:
        return jsonify({'error': 'User already exists'}), 409

    user_id = len(users) + 1
    users[data['email']] = {
        'id': user_id,
        'email': data['email'],
        'password': generate_password_hash(data['password']),
        'name': data.get('name', '')
    }

    return jsonify({'message': 'User created'}), 201

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()

    user = users.get(data.get('email'))
    if not user or not check_password_hash(user['password'], data.get('password', '')):
        return jsonify({'error': 'Invalid credentials'}), 401

    # Generate tokens
    access_token = jwt.encode({
        'user_id': user['id'],
        'email': user['email'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm='HS256')

    refresh_token = jwt.encode({
        'user_id': user['id'],
        'type': 'refresh',
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'token_type': 'Bearer',
        'expires_in': 3600
    })

@app.route('/auth/refresh', methods=['POST'])
def refresh():
    data = request.get_json()
    refresh_token = data.get('refresh_token')

    try:
        payload = jwt.decode(
            refresh_token,
            app.config['SECRET_KEY'],
            algorithms=['HS256']
        )
        if payload.get('type') != 'refresh':
            raise jwt.InvalidTokenError('Not a refresh token')

        new_access_token = jwt.encode({
            'user_id': payload['user_id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({'access_token': new_access_token})
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Refresh token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid refresh token'}), 401

@app.route('/api/profile', methods=['GET'])
@token_required
def profile(current_user):
    return jsonify({
        'id': current_user['id'],
        'email': current_user['email'],
        'name': current_user['name']
    })`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>FastAPI JWT Authentication</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional

app = FastAPI()

# Configuration
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class User(BaseModel):
    username: str
    email: str
    disabled: bool = False

class UserInDB(User):
    hashed_password: str

# Fake user database
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "email": "john@example.com",
        "hashed_password": pwd_context.hash("secret"),
        "disabled": False,
    }
}

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(username: str):
    if username in fake_users_db:
        user_dict = fake_users_db[username]
        return UserInDB(**user_dict)

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

@app.post("/auth/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Session-Based Authentication with Flask</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from flask import Flask, session, request, jsonify, redirect
from flask_session import Session
from functools import wraps
import redis

app = Flask(__name__)

# Session configuration
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = True
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url('redis://localhost:6379')
app.config['PERMANENT_SESSION_LIFETIME'] = 86400  # 24 hours

Session(app)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()

    # Validate credentials (implement your logic)
    user = authenticate(data['email'], data['password'])

    if user:
        session['user_id'] = user['id']
        session['email'] = user['email']
        session['role'] = user['role']
        session.permanent = True

        return jsonify({
            'message': 'Logged in successfully',
            'user': {
                'id': user['id'],
                'email': user['email']
            }
        })

    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/auth/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'})

@app.route('/auth/me', methods=['GET'])
@login_required
def get_current_user():
    return jsonify({
        'user_id': session['user_id'],
        'email': session['email'],
        'role': session.get('role', 'user')
    })

@app.route('/api/protected', methods=['GET'])
@login_required
def protected_route():
    return jsonify({'message': f"Hello, user {session['user_id']}!"})`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>OAuth2 with Google (FastAPI)</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from starlette.middleware.sessions import SessionMiddleware
import os

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="your-secret-key")

oauth = OAuth()
oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

@app.get('/auth/google')
async def google_login(request):
    redirect_uri = request.url_for('google_callback')
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get('/auth/google/callback')
async def google_callback(request):
    try:
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get('userinfo')

        if not user_info:
            raise HTTPException(status_code=400, detail="Failed to get user info")

        # Create or update user in database
        user = {
            'google_id': user_info['sub'],
            'email': user_info['email'],
            'name': user_info.get('name'),
            'picture': user_info.get('picture')
        }

        # Generate your own JWT token
        access_token = create_access_token(data={"sub": user['email']})

        # Redirect to frontend with token
        return RedirectResponse(
            url=f"http://localhost:3000/auth/callback?token={access_token}"
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))`}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {/* Database Integration Section */}
        {activeSection === 'database' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>Database Integration</h2>
              <p style={textStyle}>
                Python web frameworks integrate with databases through ORMs (Object-Relational Mappers)
                that provide a Pythonic interface for database operations.
              </p>

              <h3 style={subHeadingStyle}>SQLAlchemy with Flask</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

    # Relationship
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def __repr__(self):
        return f'<User {self.email}>'

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'created_at': self.created_at.isoformat()
        }

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    body = db.Column(db.Text)
    published = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Many-to-many relationship
    tags = db.relationship('Tag', secondary='post_tags', backref='posts')

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

# Association table for many-to-many
post_tags = db.Table('post_tags',
    db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)

# Create tables
with app.app_context():
    db.create_all()`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>SQLAlchemy CRUD Operations</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from flask import Flask, request, jsonify
from models import db, User, Post, Tag

app = Flask(__name__)

# CREATE
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()

    user = User(
        email=data['email'],
        password_hash=hash_password(data['password']),
        name=data.get('name')
    )

    db.session.add(user)
    db.session.commit()

    return jsonify(user.to_dict()), 201

# READ - Single
@app.route('/api/users/<int:user_id>')
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

# READ - List with filtering
@app.route('/api/users')
def list_users():
    query = User.query

    # Filter by active status
    if request.args.get('active'):
        query = query.filter_by(is_active=True)

    # Search by name
    if request.args.get('search'):
        query = query.filter(User.name.ilike(f"%{request.args['search']}%"))

    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    pagination = query.paginate(page=page, per_page=per_page)

    return jsonify({
        'users': [u.to_dict() for u in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    })

# UPDATE
@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()

    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)

    db.session.commit()

    return jsonify(user.to_dict())

# DELETE
@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    return '', 204

# Complex queries
@app.route('/api/posts/search')
def search_posts():
    from sqlalchemy import or_, and_

    query = Post.query.join(User)

    # Filter by multiple criteria
    if request.args.get('author_id'):
        query = query.filter(Post.user_id == request.args['author_id'])

    if request.args.get('published'):
        query = query.filter(Post.published == True)

    if request.args.get('tag'):
        query = query.filter(Post.tags.any(Tag.name == request.args['tag']))

    # Search in title or body
    if request.args.get('q'):
        search_term = f"%{request.args['q']}%"
        query = query.filter(
            or_(
                Post.title.ilike(search_term),
                Post.body.ilike(search_term)
            )
        )

    # Order by
    query = query.order_by(Post.created_at.desc())

    return jsonify([p.to_dict() for p in query.all()])`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Async SQLAlchemy with FastAPI</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import select, String
from typing import List
from pydantic import BaseModel

# Database setup
DATABASE_URL = "postgresql+asyncpg://user:pass@localhost/mydb"

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = async_sessionmaker(engine, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

# Model
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True)
    name: Mapped[str] = mapped_column(String(100))

# Pydantic schemas
class UserCreate(BaseModel):
    email: str
    name: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str

    class Config:
        from_attributes = True

# Dependency
async def get_db():
    async with async_session() as session:
        yield session

app = FastAPI()

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    db_user = User(email=user.email, name=user.name)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=List[UserResponse])
async def list_users(
    skip: int = 0,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(User).offset(skip).limit(limit)
    )
    return result.scalars().all()

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).where(User.id == user_id)
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Database Migrations with Alembic</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`# Initialize Alembic
# alembic init migrations

# alembic.ini configuration
"""
[alembic]
script_location = migrations
sqlalchemy.url = postgresql://user:pass@localhost/mydb
"""

# migrations/env.py
from alembic import context
from sqlalchemy import engine_from_config
from models import Base

target_metadata = Base.metadata

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )
        with context.begin_transaction():
            context.run_migrations()

# Create migration
# alembic revision --autogenerate -m "Add users table"

# migrations/versions/xxx_add_users_table.py
"""Add users table

Revision ID: abc123
Create Date: 2024-01-15
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('email', sa.String(120), unique=True, nullable=False),
        sa.Column('name', sa.String(100)),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now())
    )
    op.create_index('ix_users_email', 'users', ['email'])

def downgrade():
    op.drop_index('ix_users_email')
    op.drop_table('users')

# Run migrations
# alembic upgrade head

# Rollback
# alembic downgrade -1`}
              </SyntaxHighlighter>

              <h3 style={subHeadingStyle}>Django ORM Advanced Queries</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                }}
              >
{`from django.db.models import Count, Sum, Avg, F, Q, Value
from django.db.models.functions import Concat, Lower, TruncMonth
from myapp.models import User, Order, Product

# Aggregation
stats = Order.objects.aggregate(
    total_orders=Count('id'),
    total_revenue=Sum('total'),
    avg_order_value=Avg('total')
)

# Annotation (add computed fields)
users = User.objects.annotate(
    order_count=Count('orders'),
    total_spent=Sum('orders__total')
).filter(order_count__gt=5)

# Group by (using values + annotate)
monthly_sales = Order.objects.annotate(
    month=TruncMonth('created_at')
).values('month').annotate(
    total=Sum('total'),
    count=Count('id')
).order_by('month')

# Subquery
from django.db.models import Subquery, OuterRef

latest_order = Order.objects.filter(
    user=OuterRef('pk')
).order_by('-created_at')

users_with_latest = User.objects.annotate(
    latest_order_date=Subquery(latest_order.values('created_at')[:1])
)

# Complex Q queries
from datetime import timedelta
from django.utils import timezone

active_users = User.objects.filter(
    Q(last_login__gte=timezone.now() - timedelta(days=30)) &
    (Q(is_premium=True) | Q(orders__total__gte=100))
).distinct()

# F expressions for field comparisons
discounted_products = Product.objects.filter(
    sale_price__lt=F('price') * 0.8
)

# Update with F expression
Product.objects.filter(category='electronics').update(
    price=F('price') * 1.1
)

# Conditional expressions
from django.db.models import Case, When

users = User.objects.annotate(
    tier=Case(
        When(total_spent__gte=1000, then=Value('gold')),
        When(total_spent__gte=500, then=Value('silver')),
        default=Value('bronze')
    )
)

# Raw SQL (when needed)
users = User.objects.raw('''
    SELECT u.*, COUNT(o.id) as order_count
    FROM users u
    LEFT JOIN orders o ON o.user_id = u.id
    GROUP BY u.id
    HAVING COUNT(o.id) > 5
''')`}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

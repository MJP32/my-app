import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

const FRAMEWORK_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
  { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)' },
  { bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.3)' },
]

function SOAP({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'soap-fundamentals',
      name: 'SOAP Fundamentals',
      icon: '📡',
      color: '#f59e0b',
      description: 'SOAP protocol and web services basics',
      details: [
        {
          name: 'Protocol Overview',
          explanation: 'SOAP (Simple Object Access Protocol) is a protocol for exchanging structured information in web services using XML. SOAP messages are platform and language independent, making them ideal for enterprise integration. The protocol supports complex operations, transaction management, and security through WS-* standards.'
        },
        {
          name: 'XML-Based Messaging',
          explanation: 'XML-based messaging protocol for web services. Platform and language independent. WSDL (Web Services Description Language) describes service contract. Transport protocol: Usually HTTP/HTTPS, but can use SMTP, JMS.'
        },
        {
          name: 'SOAP Envelope',
          explanation: 'SOAP envelope structure consists of Header + Body. The Header contains authentication, transaction info, and metadata. The Body contains the actual request/response data. This structure enables standardized message processing.'
        },
        {
          name: 'Error Handling',
          explanation: 'Built-in error handling with SOAP faults. Fault elements contain faultcode, faultstring, and detail. Standard fault codes: Client, Server, VersionMismatch, MustUnderstand. Structured error information enables proper error recovery.'
        },
        {
          name: 'WS-Security',
          explanation: 'WS-Security for authentication and encryption. Supports username tokens, X.509 certificates, and SAML assertions. Message-level security independent of transport. Enables secure communication in enterprise environments.'
        },
        {
          name: 'Session Management',
          explanation: 'Stateful operations with session management. WS-Addressing for message routing and correlation. WS-ReliableMessaging for guaranteed delivery. Enables complex multi-step business transactions.'
        }
      ]
    },
    {
      id: 'jax-ws-implementation',
      name: 'JAX-WS Implementation',
      icon: '☕',
      color: '#3b82f6',
      description: 'Java API for XML Web Services',
      details: [
        {
          name: 'Overview',
          explanation: 'JAX-WS (Java API for XML Web Services) is the standard Java API for creating SOAP-based web services. It uses annotations to simplify development, automatically generates WSDL, and handles marshalling/unmarshalling of Java objects to/from XML. JAX-WS supports both contract-first (WSDL-first) and code-first approaches.'
        },
        {
          name: '@WebService Annotation',
          explanation: '@WebService marks a class as a web service endpoint. This annotation tells the JAX-WS runtime to expose the class as a SOAP service. It can specify serviceName, portName, targetNamespace, and endpointInterface for SEI pattern.'
        },
        {
          name: '@WebMethod Annotation',
          explanation: '@WebMethod exposes a method as a web service operation. By default, all public methods are exposed. Use exclude=true to hide methods from WSDL. operationName customizes the WSDL operation name.'
        },
        {
          name: '@WebParam Annotation',
          explanation: '@WebParam names and configures method parameters. Specifies parameter name in WSDL and SOAP messages. mode attribute controls IN, OUT, or INOUT parameters. header attribute moves parameters to SOAP header.'
        },
        {
          name: 'Code-First Approach',
          explanation: 'WSDL automatically generated from annotated classes. Start with Java code, let JAX-WS generate WSDL. Faster development for new services. May require customization for complex schemas.'
        },
        {
          name: 'Contract-First Approach',
          explanation: 'Generate Java from WSDL using wsimport tool. Start with WSDL contract, generate Java stubs. Better for interoperability and schema control. Preferred for enterprise integration scenarios.'
        },
        {
          name: 'SOAPBinding Configuration',
          explanation: 'Configure SOAP 1.1 vs 1.2, RPC vs Document style. Document/Literal is the most interoperable style. RPC/Encoded is legacy and less interoperable. Style affects message structure and WS-I compliance.'
        },
        {
          name: 'Message Handlers',
          explanation: 'Handlers intercept SOAP messages for cross-cutting concerns. SOAPHandler for message-level processing. LogicalHandler for payload-level processing. Use for logging, security, transformation.'
        }
      ]
    },
    {
      id: 'wsdl-client-generation',
      name: 'WSDL & Client Generation',
      icon: '📄',
      color: '#10b981',
      description: 'Service contracts and client creation',
      details: [
        {
          name: 'WSDL Overview',
          explanation: 'WSDL (Web Services Description Language) is an XML document that describes the web service interface, operations, message formats, and endpoints. It serves as a contract between service provider and consumer. Tools like wsimport generate Java client code from WSDL, enabling type-safe service invocation.'
        },
        {
          name: 'Types Section',
          explanation: 'Types define data structures using XML Schema (XSD). Complex types describe request/response objects. Simple types for primitives with restrictions. Imported schemas for shared definitions across services.'
        },
        {
          name: 'Messages Section',
          explanation: 'Messages define request/response message formats. Each message has parts referencing types. Input message for request, output message for response. Fault messages for error conditions.'
        },
        {
          name: 'PortType Section',
          explanation: 'PortType defines operations (methods) available. Each operation has input, output, and fault messages. Abstract interface independent of protocol. Named set of operations the service provides.'
        },
        {
          name: 'Binding Section',
          explanation: 'Binding specifies protocol (SOAP) and encoding. Links abstract portType to concrete protocol. Defines SOAP action, style, and encoding. transport attribute specifies HTTP, SMTP, etc.'
        },
        {
          name: 'Service Section',
          explanation: 'Service specifies endpoint URLs. Contains one or more port elements. Each port references a binding and address. Multiple ports for different protocols or locations.'
        },
        {
          name: 'wsimport Tool',
          explanation: 'wsimport generates Java from WSDL. Creates service class, port interface, and DTOs. Options: -keep (keep sources), -s (source dir), -p (package). Part of JDK for JAX-WS development.'
        },
        {
          name: 'Apache CXF wsdl2java',
          explanation: 'wsdl2java is Apache CXF tool for code generation. More options than wsimport. Supports JAX-WS and JAX-RS. Better handling of complex schemas and custom bindings.'
        }
      ]
    },
    {
      id: 'soap-client-error-handling',
      name: 'SOAP Client & Error Handling',
      icon: '🔌',
      color: '#ef4444',
      description: 'Consuming SOAP services and handling faults',
      details: [
        {
          name: 'Client Overview',
          explanation: 'SOAP clients invoke web service operations by sending XML messages. JAX-WS clients can be generated from WSDL or created programmatically. Error handling in SOAP uses fault elements with structured error information. Clients must handle SOAPFaultException and network errors appropriately.'
        },
        {
          name: 'Generated Client Stubs',
          explanation: 'Generated client stubs provide type-safe service access. Service class instantiation from WSDL. Port retrieval for making service calls. No manual XML parsing required.'
        },
        {
          name: 'Service Instantiation',
          explanation: 'Create Service instance with WSDL URL and QName. Service class generated by wsimport. QName identifies service in namespace. Service manages connection and port creation.'
        },
        {
          name: 'Port Retrieval',
          explanation: 'Get port (proxy) from Service for method calls. Port implements the service interface. Multiple ports for different endpoints. Port handles serialization and network calls.'
        },
        {
          name: 'SOAPFaultException',
          explanation: 'SOAPFaultException for service errors. Contains fault code, string, and detail. Thrown when service returns SOAP fault. Access fault information for error handling and logging.'
        },
        {
          name: 'WebServiceException',
          explanation: 'WebServiceException for client-side errors. Network failures, timeouts, configuration issues. Parent class for JAX-WS runtime exceptions. Catch for connection and transport errors.'
        },
        {
          name: 'Request/Response Handlers',
          explanation: 'Request/Response interceptors with handlers. SOAPHandler for full message access. Add headers, log messages, transform content. Handler chain configured in handler-chain.xml.'
        },
        {
          name: 'Timeout & Authentication',
          explanation: 'Timeout configuration for slow services. Set connect and request timeouts on binding provider. Authentication via WS-Security or HTTP headers. Configure credentials and security tokens.'
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Frameworks', icon: '🧩', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'SOAP Web Services', icon: '📡', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'SOAP Web Services', icon: '📡' })
    }

    return stack
  }

  const handleBreadcrumbClick = (index) => {
    const stack = buildBreadcrumbStack()
    if (stack[index].onClick) {
      stack[index].onClick()
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'var(--bg-primary)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #86efac, #4ade80)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  const navButtonStyle = {
    padding: '0.75rem 1.25rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            style={backButtonStyle}
            onClick={onBack}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to Frameworks
          </button>
          <h1 style={titleStyle}>SOAP Web Services</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              style={navButtonStyle}
              onClick={onNext}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={FRAMEWORK_COLORS}
        />
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics • Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={FRAMEWORK_COLORS.primary}
      />


      {/* Concept Detail Modal */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={FRAMEWORK_COLORS}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <h2 style={{ color: selectedConcept.color, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button onClick={handlePreviousConcept} disabled={selectedConceptIndex === 0} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>{selectedConceptIndex + 1}/{concepts.length}</span>
                <button onClick={handleNextConcept} disabled={selectedConceptIndex === concepts.length - 1} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>→</button>
                <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button key={i} onClick={() => setSelectedDetailIndex(i)} style={{ padding: '0.5rem 1rem', background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)', border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`, borderRadius: '0.5rem', color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedDetailIndex === i ? '600' : '400', transition: 'all 0.2s' }}>{detail.name}</button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default SOAP

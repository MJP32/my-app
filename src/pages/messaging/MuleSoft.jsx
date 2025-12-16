import { useState, useEffect } from 'react'

function MuleSoft({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  // Handle Escape key for modal navigation
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()

        if (selectedConcept) {
          setSelectedConcept(null)
        } else {
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedConcept, onBack])

  const concepts = [
    {
      id: 'anypoint',
      name: 'Anypoint Platform',
      icon: '🌐',
      color: '#00a1e0',
      description: 'Unified integration platform for API design, development, deployment, and management',
      details: [
        {
          name: 'Design Center',
          explanation: 'Visual API design with RAML or OAS specifications. Flow designer for integrations without code. Reusable API fragments and types. Mock services for early testing. Collaborative design with version control. API specification validation and linting.'
        },
        {
          name: 'Exchange',
          explanation: 'Central repository for reusable assets. API specifications, connectors, templates. Organization-wide asset sharing. Versioning and dependency management. Search and discovery. Public and private assets. Custom asset types and metadata.'
        },
        {
          name: 'Management Center',
          explanation: 'Centralized API and runtime management. Environment configuration (sandbox, production). Access management and permissions. API policies and SLA tiers. Analytics and monitoring dashboards. Alerting and notifications. Audit logging.'
        }
      ]
    },
    {
      id: 'apigateway',
      name: 'API Gateway',
      icon: '🚪',
      color: '#7c3aed',
      description: 'Secure, scalable gateway for managing API traffic, security, and policies',
      details: [
        {
          name: 'API Policies',
          explanation: 'Rate limiting and throttling policies. OAuth 2.0, JWT, and basic auth. IP whitelisting/blacklisting. Request/response transformation. Header injection and removal. Cross-origin resource sharing (CORS). Custom policy development.'
        },
        {
          name: 'API Proxies',
          explanation: 'Facade pattern for backend APIs. URL rewriting and path mapping. Load balancing across backends. SSL/TLS termination. Request routing based on headers. Response caching for performance. Circuit breaker patterns.'
        },
        {
          name: 'Analytics',
          explanation: 'Real-time API traffic monitoring. Response time and throughput metrics. Error rate tracking and alerting. Client usage patterns. Geographic distribution. Custom dashboards and reports. Integration with external analytics tools.'
        }
      ]
    },
    {
      id: 'dataweave',
      name: 'DataWeave',
      icon: '🔄',
      color: '#10b981',
      description: 'Powerful data transformation language for converting between formats like JSON, XML, CSV',
      details: [
        {
          name: 'Data Transformation',
          explanation: 'Declarative transformation syntax. JSON, XML, CSV, Java, flat files. Type coercion and formatting. Array and object manipulation. Conditional logic with pattern matching. Recursive transformations. Stream processing for large files.'
        },
        {
          name: 'Functions & Operators',
          explanation: 'Rich standard library of functions. String manipulation (upper, lower, trim). Date/time parsing and formatting. Math operations and aggregations. Array functions (map, filter, reduce). Object functions (pluck, mapObject). Custom function definitions.'
        },
        {
          name: 'Advanced Features',
          explanation: 'Variable and function definitions. Module imports and exports. Lazy evaluation for performance. Type system with generics. Pattern matching expressions. Tail call optimization. Integration with Java libraries.'
        }
      ]
    },
    {
      id: 'connectors',
      name: 'Connectors',
      icon: '🔌',
      color: '#f59e0b',
      description: 'Pre-built integrations with databases, SaaS applications, protocols, and enterprise systems',
      details: [
        {
          name: 'Database Connectors',
          explanation: 'JDBC connectivity for all major databases. Bulk operations for performance. Stored procedure calls. Connection pooling and management. Transaction support. Query builders and parameterization. Oracle, SQL Server, MySQL, PostgreSQL.'
        },
        {
          name: 'SaaS Connectors',
          explanation: 'Salesforce, SAP, Workday, ServiceNow. OAuth and API key authentication. Object and operation discovery. Bulk APIs for large data volumes. Real-time event handling. Custom object support. Field-level mapping.'
        },
        {
          name: 'Protocol Connectors',
          explanation: 'HTTP/HTTPS with REST support. SOAP web services with WSDL. FTP/SFTP file transfer. JMS, AMQP messaging. Email (SMTP, IMAP, POP3). LDAP directory services. WebSocket real-time communication.'
        }
      ]
    },
    {
      id: 'runtime',
      name: 'Mule Runtime',
      icon: '⚡',
      color: '#ef4444',
      description: 'Lightweight, Java-based runtime engine for executing integration flows',
      details: [
        {
          name: 'Flow Architecture',
          explanation: 'Message-driven processing model. Sources, processors, and scopes. Synchronous and asynchronous flows. Sub-flows for reusability. Private flows for encapsulation. Error handling scopes. Transaction management.'
        },
        {
          name: 'Deployment Options',
          explanation: 'CloudHub managed cloud runtime. Runtime Fabric on Kubernetes. On-premises standalone server. Hybrid deployment models. Auto-scaling capabilities. High availability clustering. Zero-downtime deployments.'
        },
        {
          name: 'Performance',
          explanation: 'Non-blocking I/O architecture. Thread pool configuration. Memory and CPU optimization. Connection pooling. Caching strategies. Batch processing for large volumes. Streaming for memory efficiency.'
        }
      ]
    },
    {
      id: 'apiledconnectivity',
      name: 'API-Led Connectivity',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Architectural approach organizing APIs into experience, process, and system layers',
      details: [
        {
          name: 'System APIs',
          explanation: 'Direct integration with systems of record. Database and ERP connectivity. Expose system data as APIs. Abstract complexity from consumers. Stable, well-documented contracts. Owned by system teams. Foundation for composability.'
        },
        {
          name: 'Process APIs',
          explanation: 'Orchestrate multiple system APIs. Business logic and validation. Cross-system data aggregation. Workflow and process automation. Owned by line-of-business teams. Reusable across experiences. Domain-driven design alignment.'
        },
        {
          name: 'Experience APIs',
          explanation: 'Tailored for specific consumers. Mobile, web, partner channels. Optimized response payloads. Consumer-specific authentication. Rapid iteration and deployment. Owned by digital teams. BFF (Backend for Frontend) pattern.'
        }
      ]
    },
    {
      id: 'cloudhub',
      name: 'CloudHub',
      icon: '☁️',
      color: '#06b6d4',
      description: 'Fully managed cloud integration platform-as-a-service (iPaaS)',
      details: [
        {
          name: 'Deployment',
          explanation: 'One-click deployment from Anypoint Studio. Environment management (sandbox, production). Worker sizing (vCore allocation). Multi-region deployment options. Rolling updates for zero downtime. Deployment history and rollback. CI/CD integration.'
        },
        {
          name: 'Networking',
          explanation: 'Dedicated load balancers. VPC for private connectivity. VPN tunnels to on-premises. Static IP addresses. SSL certificate management. DDoS protection. Custom domains and vanity URLs.'
        },
        {
          name: 'Operations',
          explanation: 'Application monitoring and logging. Log forwarding to Splunk, ELK. Alert definitions and escalations. Scheduler for batch jobs. Object store for persistence. Insight into runtime metrics. Support for production issues.'
        }
      ]
    },
    {
      id: 'security',
      name: 'Security',
      icon: '🔒',
      color: '#dc2626',
      description: 'Comprehensive security features for protecting APIs, data, and integrations',
      details: [
        {
          name: 'Authentication',
          explanation: 'OAuth 2.0 provider and client. OpenID Connect support. SAML for enterprise SSO. LDAP integration. API key management. Client credentials flow. JWT token validation and generation.'
        },
        {
          name: 'Authorization',
          explanation: 'Role-based access control (RBAC). API-level permissions. Environment-based access. Team and organization hierarchy. Fine-grained resource access. Custom permission schemes. Audit trail for compliance.'
        },
        {
          name: 'Data Protection',
          explanation: 'TLS/SSL encryption in transit. Tokenization for sensitive data. Secure properties for credentials. Secrets management integration. PCI DSS compliance support. HIPAA-ready configurations. Data masking in logs.'
        }
      ]
    }
  ]

  const selectedConceptData = concepts.find(c => c.id === selectedConcept)

  if (selectedConcept && selectedConceptData) {
    return (
      <div style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#f0f9ff',
        minHeight: '100vh'
      }}>
        <button
          onClick={() => setSelectedConcept(null)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
        >
          ← Back to Concepts
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <span style={{ fontSize: '3rem' }}>{selectedConceptData.icon}</span>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1f2937',
            margin: 0
          }}>
            {selectedConceptData.name}
          </h1>
        </div>

        <p style={{
          fontSize: '1.2rem',
          color: '#4b5563',
          marginBottom: '2rem',
          lineHeight: '1.8'
        }}>
          {selectedConceptData.description}
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {selectedConceptData.details.map((detail, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${selectedConceptData.color}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: selectedConceptData.color,
                marginBottom: '0.75rem'
              }}>
                {detail.name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4b5563',
                lineHeight: '1.8',
                margin: 0
              }}>
                {detail.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      backgroundColor: '#f0f9ff',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Back to {currentSubcategory || 'DevOps'}
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0
        }}>
          🔗 MuleSoft
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {onPrevious && (
          <button
            onClick={onPrevious}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              backgroundColor: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ← {previousName}
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              backgroundColor: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {nextName} →
          </button>
        )}
      </div>

      <p style={{
        fontSize: '1.2rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Master MuleSoft Anypoint Platform for building integrations, APIs, and connecting enterprise applications.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept) => (
          <button
            key={concept.id}
            onClick={() => setSelectedConcept(concept.id)}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: `3px solid ${concept.color}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 8px 24px ${concept.color}40`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                {concept.name}
              </h3>
            </div>
            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: 0
            }}>
              {concept.description}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '1rem',
              color: concept.color,
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Learn More →
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MuleSoft

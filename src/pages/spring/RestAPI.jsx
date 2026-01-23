import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

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
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

function RestAPI({ onBack, onPrevious, onNext, previousName, nextName }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'rest-principles',
      name: 'REST Principles',
      icon: '📐',
      color: '#3b82f6',
      description: 'Fundamental REST architectural constraints',
      details: [
        {
          name: 'Client-Server',
          explanation: 'REST enforces separation of concerns between client and server. The client handles user interface and user experience, while the server manages data storage and business logic. This separation allows each component to evolve independently, improving scalability and portability across multiple platforms.'
        },
        {
          name: 'Stateless',
          explanation: 'Each request from client to server must contain all information needed to understand and process the request. The server does not store any client context between requests. Session state is kept entirely on the client. This improves reliability, scalability, and visibility of interactions.'
        },
        {
          name: 'Cacheable',
          explanation: 'Responses must define themselves as cacheable or non-cacheable. Well-managed caching can eliminate some client-server interactions entirely, improving scalability and performance. Responses include cache headers like Cache-Control, ETag, and Last-Modified.'
        },
        {
          name: 'Uniform Interface',
          explanation: 'REST defines a uniform interface between components: identification of resources through URIs, manipulation through representations, self-descriptive messages, and hypermedia as the engine of application state (HATEOAS). This simplifies architecture and decouples implementations.'
        },
        {
          name: 'Layered System',
          explanation: 'The architecture allows for intermediate layers (proxies, gateways, load balancers) between client and server. Clients cannot tell whether they are connected directly to the end server or an intermediary. Layers improve scalability through load balancing and shared caches.'
        },
        {
          name: 'Richardson Maturity Model',
          explanation: 'A model for REST API maturity: Level 0 uses HTTP as transport (SOAP-like). Level 1 introduces resources with unique URIs. Level 2 uses HTTP verbs correctly (GET, POST, PUT, DELETE). Level 3 adds HATEOAS with hypermedia controls for discoverability.'
        }
      ]
    },
    {
      id: 'http-methods',
      name: 'HTTP Methods & Status Codes',
      icon: '🔤',
      color: '#10b981',
      description: 'HTTP verbs and response codes',
      details: [
        {
          name: 'GET',
          explanation: 'Retrieves a representation of a resource. GET requests are safe (no side effects), idempotent (same result on multiple calls), and cacheable. Use for reading data: GET /api/users returns all users, GET /api/users/123 returns user with ID 123.'
        },
        {
          name: 'POST',
          explanation: 'Creates a new resource or triggers a process. POST is not safe (modifies state) and not idempotent (multiple calls create multiple resources). Returns 201 Created with Location header pointing to the new resource. Use for creating: POST /api/users with user data in body.'
        },
        {
          name: 'PUT',
          explanation: 'Replaces the entire resource with the provided representation. PUT is idempotent - calling it multiple times produces the same result. Requires the complete resource representation. Returns 200 OK or 204 No Content. Use for full updates: PUT /api/users/123.'
        },
        {
          name: 'PATCH',
          explanation: 'Applies partial modifications to a resource. Unlike PUT, PATCH updates only the specified fields. May not be idempotent depending on implementation. Returns 200 OK with updated resource. Use for partial updates: PATCH /api/users/123 with only changed fields.'
        },
        {
          name: 'DELETE',
          explanation: 'Removes the specified resource. DELETE is idempotent - calling it multiple times on the same resource has the same effect (resource is deleted). Returns 204 No Content on success, 404 if resource does not exist. Use for removal: DELETE /api/users/123.'
        },
        {
          name: 'Status Codes',
          explanation: '2xx Success: 200 OK, 201 Created, 204 No Content. 4xx Client Errors: 400 Bad Request (invalid syntax), 401 Unauthorized (authentication required), 403 Forbidden (no permission), 404 Not Found, 409 Conflict. 5xx Server Errors: 500 Internal Server Error, 503 Service Unavailable.'
        }
      ]
    },
    {
      id: 'resource-design',
      name: 'Resource Design',
      icon: '🎯',
      color: '#f59e0b',
      description: 'URI design and resource modeling',
      details: [
        {
          name: 'Resource Naming',
          explanation: 'Use nouns not verbs for resource URIs. Use plural nouns for collections: /users, /products, /orders. Use singular identifiers for specific resources: /users/123. Avoid: /getUser, /createUser, /deleteUser. Good naming is intuitive and consistent.'
        },
        {
          name: 'Nested Resources',
          explanation: 'Represent relationships through hierarchical URIs. User orders: /users/123/orders. Specific order: /users/123/orders/456. User addresses: /users/123/addresses. Limit nesting depth to 2-3 levels. For deeper relationships, consider flat URIs with query parameters.'
        },
        {
          name: 'Query Parameters',
          explanation: 'Use query parameters for filtering, sorting, and pagination. Filtering: /products?category=electronics&inStock=true. Sorting: /users?sort=name,asc. Pagination: /users?page=1&size=20. Search: /products?q=laptop. Keep URIs clean and predictable.'
        },
        {
          name: 'Pagination',
          explanation: 'Offset-based pagination: /users?page=0&size=20. Cursor-based pagination: /users?limit=20&cursor=abc123. Include pagination metadata in response: totalElements, totalPages, currentPage. Use Link headers for navigation. Cursor-based is better for large, changing datasets.'
        },
        {
          name: 'Versioning',
          explanation: 'Version your API to manage breaking changes. URI versioning: /api/v1/users, /api/v2/users (most common, visible). Header versioning: Accept: application/vnd.api.v1+json. Query parameter: /api/users?version=1. Choose one approach and be consistent.'
        },
        {
          name: 'Sub-resources',
          explanation: 'Model sub-resources for related entities: /users/123/profile (singular, one-to-one), /users/123/orders (plural, one-to-many). Actions as sub-resources: /orders/123/cancel (POST). Consider whether to return embedded resources or links to reduce API calls.'
        }
      ]
    },
    {
      id: 'spring-boot-rest',
      name: 'Spring Boot REST',
      icon: '🍃',
      color: '#8b5cf6',
      description: 'Building REST APIs with Spring Boot',
      details: [
        {
          name: '@RestController',
          explanation: 'Combines @Controller and @ResponseBody. Methods return data directly serialized to JSON/XML instead of view names. @RequestMapping("/api/users") sets base URI. Automatically handles content negotiation based on Accept header. Central annotation for REST endpoints.'
        },
        {
          name: 'Mapping Annotations',
          explanation: '@GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping map HTTP methods to handler methods. Can specify path, consumes, produces. Example: @GetMapping("/{id}") maps GET /api/users/{id}. Cleaner than @RequestMapping(method=RequestMethod.GET).'
        },
        {
          name: 'Request Parameters',
          explanation: '@PathVariable extracts URI template variables: /users/{id}. @RequestParam reads query parameters: /users?status=active. @RequestBody deserializes JSON/XML body to Java object. @RequestHeader accesses HTTP headers. @Valid triggers bean validation on request body.'
        },
        {
          name: 'ResponseEntity',
          explanation: 'Provides full control over HTTP response: status code, headers, and body. ResponseEntity.ok(user) returns 200 with body. ResponseEntity.created(uri).body(user) returns 201 with Location header. ResponseEntity.notFound().build() returns 404. Essential for proper REST responses.'
        },
        {
          name: 'Exception Handling',
          explanation: '@ExceptionHandler in controller handles specific exceptions. @RestControllerAdvice provides global exception handling. Return ErrorResponse with status, message, timestamp. @ResponseStatus sets default status code on exceptions. Centralized error handling ensures consistent error responses.'
        },
        {
          name: 'CORS Configuration',
          explanation: '@CrossOrigin on controller or method enables cross-origin requests. WebMvcConfigurer.addCorsMappings() for global CORS config. Configure allowedOrigins, allowedMethods, allowedHeaders, maxAge. Essential for frontend applications on different domains calling your API.'
        }
      ]
    },
    {
      id: 'api-security',
      name: 'API Security',
      icon: '🔐',
      color: '#ec4899',
      description: 'Authentication and authorization',
      details: [
        {
          name: 'JWT Authentication',
          explanation: 'JSON Web Tokens are self-contained tokens with header, payload, and signature. Stateless authentication - server does not store session. Token contains user info and claims. Verify signature on each request. Include in Authorization: Bearer <token> header. Set appropriate expiration.'
        },
        {
          name: 'Spring Security',
          explanation: 'SecurityFilterChain configures HTTP security. Permit public endpoints, require authentication for protected ones. SessionCreationPolicy.STATELESS for REST APIs. Add JWT filter before UsernamePasswordAuthenticationFilter. Configure CSRF (usually disabled for APIs).'
        },
        {
          name: 'Method Security',
          explanation: '@EnableMethodSecurity enables method-level security. @PreAuthorize("hasRole(\'ADMIN\')") restricts to admin role. @PreAuthorize("isAuthenticated()") requires any authenticated user. SpEL expressions: #id == authentication.principal.id for owner-only access.'
        },
        {
          name: 'OAuth 2.0',
          explanation: 'Authorization framework for third-party access. Resource Owner (user), Client (app), Authorization Server, Resource Server. Grant types: Authorization Code (web apps), Client Credentials (service-to-service). Spring Security OAuth2 Resource Server validates tokens.'
        },
        {
          name: 'API Keys',
          explanation: 'Simple token-based authentication for services. Pass in X-API-Key header. Validate against stored keys. Good for service identification, not user authentication. Combine with rate limiting per key. Less secure than JWT/OAuth - no expiration, no claims.'
        },
        {
          name: 'Rate Limiting',
          explanation: 'Prevent API abuse by limiting requests per time period. Track requests per client (IP or API key). Return 429 Too Many Requests when exceeded. Include X-Rate-Limit and X-Rate-Remaining headers. Implement with filters, interceptors, or external tools like Redis.'
        }
      ]
    },
    {
      id: 'api-documentation',
      name: 'API Documentation',
      icon: '📚',
      color: '#06b6d4',
      description: 'OpenAPI/Swagger documentation',
      details: [
        {
          name: 'OpenAPI Specification',
          explanation: 'OpenAPI 3.0 is the industry standard for describing REST APIs. YAML or JSON format. Describes endpoints, parameters, request/response schemas, authentication. Machine-readable for code generation. Springdoc-openapi auto-generates from Spring Boot code.'
        },
        {
          name: 'Swagger UI',
          explanation: 'Interactive documentation interface at /swagger-ui.html. Browse and test endpoints directly. Shows request parameters, response schemas, example values. Supports authentication for protected endpoints. Essential for API consumers and testing.'
        },
        {
          name: '@Operation',
          explanation: 'Documents individual API operations. summary for brief description, description for details. @ApiResponses documents response codes and schemas. @Parameter describes query/path parameters with examples. Makes documentation specific and helpful.'
        },
        {
          name: '@Schema',
          explanation: 'Documents model properties. description, example, required, minLength, maxLength. accessMode for read-only fields (like ID). allowableValues for enums. format for dates, emails. Generates accurate request/response schemas in documentation.'
        },
        {
          name: 'Security Schemes',
          explanation: 'Document authentication requirements. Define security schemes: Bearer JWT, API Key, OAuth2. Apply globally or per-endpoint with @SecurityRequirement. Swagger UI shows lock icon and prompts for credentials. Essential for protected API documentation.'
        },
        {
          name: 'API Groups',
          explanation: 'GroupedOpenApi organizes endpoints into logical groups. Separate docs for public, admin, user APIs. pathsToMatch filters endpoints per group. Multiple Swagger UI dropdowns. Helps large APIs stay organized and navigable.'
        }
      ]
    },
    {
      id: 'api-best-practices',
      name: 'API Best Practices',
      icon: '✨',
      color: '#84cc16',
      description: 'REST API design patterns',
      details: [
        {
          name: 'Consistent Error Format',
          explanation: 'Standardize error responses: status code, error type, message, timestamp, path, validation errors array. Use @RestControllerAdvice for global handling. Map exceptions to appropriate HTTP status codes. Include enough detail for debugging without exposing internals.'
        },
        {
          name: 'HATEOAS',
          explanation: 'Hypermedia as the Engine of Application State. Include links in responses for discoverability: self, related resources, actions. EntityModel wraps resource with links. CollectionModel for collections. Clients navigate API through links, not hardcoded URLs.'
        },
        {
          name: 'Caching',
          explanation: 'Use HTTP caching headers: Cache-Control (max-age, no-cache), ETag (version hash), Last-Modified. Implement conditional requests: If-None-Match returns 304 Not Modified if unchanged. Reduces bandwidth and server load. Essential for read-heavy APIs.'
        },
        {
          name: 'Compression',
          explanation: 'Enable response compression to reduce bandwidth. server.compression.enabled=true in Spring Boot. Support gzip and deflate. Set minimum response size threshold. Significant performance improvement for JSON responses. Most clients handle automatically.'
        },
        {
          name: 'Request Validation',
          explanation: 'Validate all input with @Valid and Bean Validation annotations. @NotNull, @NotBlank, @Size, @Min, @Max, @Email, @Pattern. Custom validators for business rules. Return 400 Bad Request with field-level error details. Validate early, fail fast.'
        },
        {
          name: 'Monitoring & Metrics',
          explanation: 'Track API health and performance. Spring Boot Actuator exposes /actuator endpoints. Micrometer for metrics: request count, latency, error rate. Export to Prometheus, Grafana, CloudWatch. Set up alerts for anomalies. Monitor rate limit usage and abuse patterns.'
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
      { name: 'Frameworks', icon: '🛠️', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'REST API Design', icon: '🌐', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'REST API Design', icon: '🌐' })
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
    background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #0f172a 100%)',
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
          <h1 style={titleStyle}>REST API Design</h1>
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
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
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

export default RestAPI

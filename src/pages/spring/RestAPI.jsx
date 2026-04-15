import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import useVoiceConceptNavigation from '../../hooks/useVoiceConceptNavigation'

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

// REST Principles Diagram
const RESTPrinciplesDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">REST Architectural Constraints</text>
    <rect x="50" y="50" width="90" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="95" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Client</text>
    <text x="95" y="90" textAnchor="middle" fill="#93c5fd" fontSize="7">UI/UX</text>
    <text x="95" y="102" textAnchor="middle" fill="#93c5fd" fontSize="7">Stateless</text>
    <rect x="165" y="50" width="90" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="210" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Cache</text>
    <text x="210" y="92" textAnchor="middle" fill="#fcd34d" fontSize="7">Optional</text>
    <rect x="280" y="50" width="90" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="325" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Load</text>
    <text x="325" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="7">Balancer</text>
    <rect x="395" y="50" width="90" height="60" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="440" y="75" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Gateway</text>
    <text x="440" y="92" textAnchor="middle" fill="#67e8f9" fontSize="7">Layered</text>
    <rect x="510" y="50" width="90" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="555" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Server</text>
    <text x="555" y="90" textAnchor="middle" fill="#86efac" fontSize="7">Resources</text>
    <text x="555" y="102" textAnchor="middle" fill="#86efac" fontSize="7">Uniform I/F</text>
    <line x1="140" y1="80" x2="160" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="255" y1="80" x2="275" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="370" y1="80" x2="390" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="485" y1="80" x2="505" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <rect x="150" y="130" width="400" height="30" rx="4" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="1"/>
    <text x="350" y="150" textAnchor="middle" fill="#f472b6" fontSize="9">Uniform Interface: URIs • HTTP Methods • Self-descriptive Messages • HATEOAS</text>
  </svg>
)

// HTTP Methods Diagram
const HTTPMethodsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`HTTP Methods & Idempotency`}</text>
    <rect x="50" y="50" width="100" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">GET</text>
    <text x="100" y="92" textAnchor="middle" fill="#bbf7d0" fontSize="8">Read • Safe</text>
    <text x="100" y="104" textAnchor="middle" fill="#bbf7d0" fontSize="8">Idempotent ✓</text>
    <rect x="170" y="50" width="100" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="220" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">POST</text>
    <text x="220" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">Create • Unsafe</text>
    <text x="220" y="104" textAnchor="middle" fill="#bfdbfe" fontSize="8">Not Idempotent ✗</text>
    <rect x="290" y="50" width="100" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="340" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PUT</text>
    <text x="340" y="92" textAnchor="middle" fill="#fef3c7" fontSize="8">Replace • Unsafe</text>
    <text x="340" y="104" textAnchor="middle" fill="#fef3c7" fontSize="8">Idempotent ✓</text>
    <rect x="410" y="50" width="100" height="60" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="460" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PATCH</text>
    <text x="460" y="92" textAnchor="middle" fill="#ddd6fe" fontSize="8">Update • Unsafe</text>
    <text x="460" y="104" textAnchor="middle" fill="#ddd6fe" fontSize="8">May vary</text>
    <rect x="530" y="50" width="100" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="580" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">DELETE</text>
    <text x="580" y="92" textAnchor="middle" fill="#fecaca" fontSize="8">Remove • Unsafe</text>
    <text x="580" y="104" textAnchor="middle" fill="#fecaca" fontSize="8">Idempotent ✓</text>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="9">Idempotent = Same result when called multiple times</text>
  </svg>
)

// Resource Design Diagram
const ResourceDesignDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RESTful Resource URI Design</text>
    <rect x="50" y="45" width="600" height="90" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="2"/>
    <text x="70" y="70" fill="#22c55e" fontSize="10" fontFamily="monospace">/api/v1/users</text>
    <text x="250" y="70" fill="#64748b" fontSize="9">→ Collection (GET: list, POST: create)</text>
    <text x="70" y="90" fill="#3b82f6" fontSize="10" fontFamily="monospace">/api/v1/users/123</text>
    <text x="250" y="90" fill="#64748b" fontSize="9">→ Single Resource (GET, PUT, DELETE)</text>
    <text x="70" y="110" fill="#f59e0b" fontSize="10" fontFamily="monospace">/api/v1/users/123/orders</text>
    <text x="300" y="110" fill="#64748b" fontSize="9">→ Nested Collection</text>
    <text x="70" y="130" fill="#8b5cf6" fontSize="10" fontFamily="monospace">{`/api/v1/users?status=active&amp;page=1`}</text>
    <text x="380" y="130" fill="#64748b" fontSize="9">{`→ Filtering & Pagination`}</text>
    <text x="350" y="155" textAnchor="middle" fill="#64748b" fontSize="9">Nouns not verbs • Plural names • Hierarchical nesting</text>
  </svg>
)

// Spring Boot REST Diagram
const SpringBootRESTDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Spring Boot REST Request Flow</text>
    <rect x="30" y="50" width="80" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="70" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Client</text>
    <rect x="130" y="50" width="90" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="175" y="72" textAnchor="middle" fill="#a78bfa" fontSize="8">Dispatcher</text>
    <text x="175" y="86" textAnchor="middle" fill="#c4b5fd" fontSize="8">Servlet</text>
    <rect x="240" y="50" width="90" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="285" y="72" textAnchor="middle" fill="#4ade80" fontSize="8">@Rest</text>
    <text x="285" y="86" textAnchor="middle" fill="#86efac" fontSize="8">Controller</text>
    <rect x="350" y="50" width="90" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="395" y="80" textAnchor="middle" fill="#fbbf24" fontSize="9">@Service</text>
    <rect x="460" y="50" width="90" height="50" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="505" y="80" textAnchor="middle" fill="#f472b6" fontSize="9">Repository</text>
    <rect x="570" y="50" width="80" height="50" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="610" y="80" textAnchor="middle" fill="#22d3ee" fontSize="9">Database</text>
    <line x1="110" y1="75" x2="125" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="220" y1="75" x2="235" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="330" y1="75" x2="345" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="440" y1="75" x2="455" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="550" y1="75" x2="565" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">HTTP Request → JSON Serialization → Business Logic → Data Access</text>
  </svg>
)

// API Security Diagram
const APISecurityDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">JWT Authentication Flow</text>
    <rect x="50" y="50" width="90" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="95" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Client</text>
    <rect x="170" y="40" width="120" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="230" y="60" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Auth Server</text>
    <text x="230" y="78" textAnchor="middle" fill="#fcd34d" fontSize="8">1. Login</text>
    <text x="230" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">2. Issue JWT</text>
    <rect x="320" y="40" width="150" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="395" y="60" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">JWT Token</text>
    <text x="395" y="78" textAnchor="middle" fill="#c4b5fd" fontSize="7">Header.Payload.Signature</text>
    <text x="395" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="7">exp, sub, roles</text>
    <rect x="500" y="40" width="120" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="560" y="60" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">API Server</text>
    <text x="560" y="78" textAnchor="middle" fill="#86efac" fontSize="8">3. Verify signature</text>
    <text x="560" y="92" textAnchor="middle" fill="#86efac" fontSize="8">4. Check claims</text>
    <line x1="140" y1="75" x2="165" y2="75" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="290" y1="75" x2="315" y2="75" stroke="#8b5cf6" strokeWidth="2"/>
    <line x1="470" y1="75" x2="495" y2="75" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="9">Stateless auth • Self-contained tokens • No server session needed</text>
  </svg>
)

// API Documentation Diagram
const APIDocsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">OpenAPI / Swagger Integration</text>
    <rect x="50" y="50" width="140" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Spring Boot Code</text>
    <text x="120" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">@RestController</text>
    <rect x="220" y="50" width="140" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="290" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">springdoc-openapi</text>
    <text x="290" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">Auto-generate spec</text>
    <rect x="390" y="50" width="140" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="460" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">OpenAPI 3.0</text>
    <text x="460" y="92" textAnchor="middle" fill="#86efac" fontSize="8">/v3/api-docs</text>
    <rect x="560" y="50" width="100" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="610" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Swagger UI</text>
    <text x="610" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">Interactive</text>
    <line x1="190" y1="80" x2="215" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="360" y1="80" x2="385" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="530" y1="80" x2="555" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="140" textAnchor="middle" fill="#64748b" fontSize="9">Code → Spec → Interactive documentation • Try endpoints in browser</text>
  </svg>
)

const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|super|this|null|default)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean|var)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Set|HashSet|Map|HashMap|Optional|Stream|Exception|Override|Integer|Long|BigDecimal|LocalDate|Date|ResponseEntity|HttpStatus|RestController|RequestMapping|GetMapping|PostMapping|PutMapping|DeleteMapping|PatchMapping|PathVariable|RequestParam|RequestBody|ResponseBody|ResponseStatus|Valid|NotNull|NotBlank|ExceptionHandler|ControllerAdvice|RestTemplate|WebClient|HttpHeaders|MediaType|URI|UriComponentsBuilder|PageRequest|Page|Pageable|Sort)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function RestAPI({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'rest-principles',
      name: 'REST Principles',
      icon: '📐',
      color: '#3b82f6',
      description: 'Fundamental REST architectural constraints',
      diagram: RESTPrinciplesDiagram,
      details: [
        {
          name: 'Client-Server',
          explanation: 'REST enforces separation of concerns between client and server. The client handles user interface and user experience, while the server manages data storage and business logic. This separation allows each component to evolve independently, improving scalability and portability across multiple platforms.',
          codeExample: `// Server-side: REST Controller (Spring Boot)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        UserDto user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
}

// Client-side: JavaScript fetch (separate concern)
// fetch("http://localhost:8080/api/users/1")
//   .then(res => res.json())
//   .then(user => renderProfile(user));`
        },
        {
          name: 'Stateless',
          explanation: 'Each request from client to server must contain all information needed to understand and process the request. The server does not store any client context between requests. Session state is kept entirely on the client. This improves reliability, scalability, and visibility of interactions.',
          codeExample: `// Each request carries all needed info (JWT token + data)
@GetMapping("/orders")
public ResponseEntity<List<Order>> getOrders(
        @RequestHeader("Authorization") String token) {
    // Token contains user identity - no server session
    String userId = jwtService.extractUserId(token);
    List<Order> orders = orderService.findByUserId(userId);
    return ResponseEntity.ok(orders);
}

// Stateless config in Spring Security
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http.sessionManagement(session ->
        session.sessionCreationPolicy(
            SessionCreationPolicy.STATELESS));
    return http.build();
}`
        },
        {
          name: 'Cacheable',
          explanation: 'Responses must define themselves as cacheable or non-cacheable. Well-managed caching can eliminate some client-server interactions entirely, improving scalability and performance. Responses include cache headers like Cache-Control, ETag, and Last-Modified.',
          codeExample: `@GetMapping("/products/{id}")
public ResponseEntity<Product> getProduct(
        @PathVariable Long id) {
    Product product = productService.findById(id);
    String etag = Integer.toHexString(
        product.hashCode());

    return ResponseEntity.ok()
        .cacheControl(CacheControl.maxAge(
            30, TimeUnit.MINUTES))
        .eTag(etag)
        .body(product);
}

// Conditional request - returns 304 if unchanged
@GetMapping("/catalog")
public ResponseEntity<List<Product>> getCatalog(
        WebRequest request) {
    long lastModified = catalogService
        .getLastModifiedTime();
    if (request.checkNotModified(lastModified)) {
        return null; // 304 Not Modified
    }
    return ResponseEntity.ok()
        .lastModified(lastModified)
        .body(catalogService.findAll());
}`
        },
        {
          name: 'Uniform Interface',
          explanation: 'REST defines a uniform interface between components: identification of resources through URIs, manipulation through representations, self-descriptive messages, and hypermedia as the engine of application state (HATEOAS). This simplifies architecture and decouples implementations.',
          codeExample: `// Uniform interface: same patterns for all resources
@RestController
@RequestMapping("/api/v1")
public class UniformApiController {

    // Resource identification via URI
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(
            @PathVariable Long id) { ... }

    // Manipulation via representations (JSON)
    @PostMapping(value = "/users",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> createUser(
            @RequestBody User user) { ... }

    // Self-descriptive messages with proper headers
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody User user) {
        User updated = userService.update(id, user);
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(updated);
    }
}`
        },
        {
          name: 'Layered System',
          explanation: 'The architecture allows for intermediate layers (proxies, gateways, load balancers) between client and server. Clients cannot tell whether they are connected directly to the end server or an intermediary. Layers improve scalability through load balancing and shared caches.',
          codeExample: `// API Gateway layer routes to microservices
// Spring Cloud Gateway configuration
@Bean
public RouteLocator routes(
        RouteLocatorBuilder builder) {
    return builder.routes()
        .route("user-service", r -> r
            .path("/api/users/**")
            .uri("lb://user-service"))
        .route("order-service", r -> r
            .path("/api/orders/**")
            .uri("lb://order-service"))
        .build();
}

// The client calls the gateway; it doesn't know
// which backend service handles the request
// GET http://gateway:8080/api/users/123
//   -> routed to user-service:8081/api/users/123

// Load balancer filter example
@Bean
public GlobalFilter loggingFilter() {
    return (exchange, chain) -> {
        // Logging layer - transparent to client
        log.info("Request: {}",
            exchange.getRequest().getPath());
        return chain.filter(exchange);
    };
}`
        },
        {
          name: 'Richardson Maturity Model',
          explanation: 'A model for REST API maturity: Level 0 uses HTTP as transport (SOAP-like). Level 1 introduces resources with unique URIs. Level 2 uses HTTP verbs correctly (GET, POST, PUT, DELETE). Level 3 adds HATEOAS with hypermedia controls for discoverability.',
          codeExample: `// Level 0: Single endpoint, POST everything
// POST /api  { "action": "getUser", "id": 123 }

// Level 1: Resources with unique URIs
// POST /api/users/123  { "action": "get" }

// Level 2: Proper HTTP verbs + status codes
@GetMapping("/users/{id}")      // GET for reads
public ResponseEntity<User> get(@PathVariable Long id) {
    return ResponseEntity.ok(userService.findById(id));
}

@PostMapping("/users")          // POST for creation
public ResponseEntity<User> create(@RequestBody User u) {
    User saved = userService.save(u);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(saved);          // 201 Created
}

// Level 3: HATEOAS - hypermedia links
@GetMapping("/users/{id}")
public EntityModel<User> getWithLinks(
        @PathVariable Long id) {
    User user = userService.findById(id);
    return EntityModel.of(user,
        linkTo(methodOn(UserController.class)
            .getWithLinks(id)).withSelfRel(),
        linkTo(methodOn(OrderController.class)
            .getByUser(id)).withRel("orders"));
}`
        }
      ]
    },
    {
      id: 'http-methods',
      name: 'HTTP Methods & Status Codes',
      icon: '🔤',
      color: '#10b981',
      description: 'HTTP verbs and response codes',
      diagram: HTTPMethodsDiagram,
      details: [
        {
          name: 'GET',
          explanation: 'Retrieves a representation of a resource. GET requests are safe (no side effects), idempotent (same result on multiple calls), and cacheable. Use for reading data: GET /api/users returns all users, GET /api/users/123 returns user with ID 123.',
          codeExample: `@RestController
@RequestMapping("/api/users")
public class UserController {

    // GET /api/users - list all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    // GET /api/users/123 - get single user
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/users?role=ADMIN&active=true
    @GetMapping(params = "role")
    public ResponseEntity<List<User>> getUsersByRole(
            @RequestParam String role,
            @RequestParam(defaultValue = "true")
                boolean active) {
        return ResponseEntity.ok(
            userService.findByRole(role, active));
    }
}`
        },
        {
          name: 'POST',
          explanation: 'Creates a new resource or triggers a process. POST is not safe (modifies state) and not idempotent (multiple calls create multiple resources). Returns 201 Created with Location header pointing to the new resource. Use for creating: POST /api/users with user data in body.',
          codeExample: `// POST /api/users - create a new user
@PostMapping
public ResponseEntity<User> createUser(
        @Valid @RequestBody CreateUserRequest request) {
    User created = userService.create(request);

    // Build Location header: /api/users/{newId}
    URI location = UriComponentsBuilder
        .fromPath("/api/users/{id}")
        .buildAndExpand(created.getId())
        .toUri();

    // Return 201 Created with Location header
    return ResponseEntity.created(location)
        .body(created);
}

// POST for triggering actions (non-CRUD)
@PostMapping("/{id}/send-verification")
public ResponseEntity<Void> sendVerification(
        @PathVariable Long id) {
    userService.sendVerificationEmail(id);
    return ResponseEntity.accepted().build();
    // 202 Accepted - async processing
}`
        },
        {
          name: 'PUT',
          explanation: 'Replaces the entire resource with the provided representation. PUT is idempotent - calling it multiple times produces the same result. Requires the complete resource representation. Returns 200 OK or 204 No Content. Use for full updates: PUT /api/users/123.',
          codeExample: `// PUT /api/users/123 - replace entire user
@PutMapping("/{id}")
public ResponseEntity<User> replaceUser(
        @PathVariable Long id,
        @Valid @RequestBody User user) {
    // PUT replaces ALL fields - must send complete object
    if (!userService.exists(id)) {
        return ResponseEntity.notFound().build();
    }
    user.setId(id);
    User updated = userService.save(user);
    return ResponseEntity.ok(updated);
}

// Idempotent: calling twice with same data
// gives same result
// PUT /api/users/123 { "name": "John", "email": "j@x.com" }
// First call:  updates user -> 200 OK
// Second call: same update  -> 200 OK (same result)

// PUT can also create if resource doesn't exist
@PutMapping("/{id}")
public ResponseEntity<User> upsertUser(
        @PathVariable Long id,
        @RequestBody User user) {
    user.setId(id);
    boolean existed = userService.exists(id);
    User saved = userService.save(user);
    return existed
        ? ResponseEntity.ok(saved)
        : ResponseEntity.created(URI.create(
            "/api/users/" + id)).body(saved);
}`
        },
        {
          name: 'PATCH',
          explanation: 'Applies partial modifications to a resource. Unlike PUT, PATCH updates only the specified fields. May not be idempotent depending on implementation. Returns 200 OK with updated resource. Use for partial updates: PATCH /api/users/123 with only changed fields.',
          codeExample: `// PATCH /api/users/123 - partial update
@PatchMapping("/{id}")
public ResponseEntity<User> patchUser(
        @PathVariable Long id,
        @RequestBody Map<String, Object> updates) {
    User user = userService.findById(id)
        .orElseThrow(() -> new ResourceNotFound(
            "User not found: " + id));

    // Apply only the provided fields
    if (updates.containsKey("name")) {
        user.setName((String) updates.get("name"));
    }
    if (updates.containsKey("email")) {
        user.setEmail((String) updates.get("email"));
    }
    if (updates.containsKey("status")) {
        user.setStatus((String) updates.get("status"));
    }

    User updated = userService.save(user);
    return ResponseEntity.ok(updated);
}

// Request body only contains changed fields:
// PATCH /api/users/123
// { "status": "ACTIVE" }
// Other fields remain unchanged`
        },
        {
          name: 'DELETE',
          explanation: 'Removes the specified resource. DELETE is idempotent - calling it multiple times on the same resource has the same effect (resource is deleted). Returns 204 No Content on success, 404 if resource does not exist. Use for removal: DELETE /api/users/123.',
          codeExample: `// DELETE /api/users/123 - remove user
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteUser(
        @PathVariable Long id) {
    if (!userService.exists(id)) {
        return ResponseEntity.notFound().build();
    }
    userService.deleteById(id);
    return ResponseEntity.noContent().build();
    // 204 No Content - successful deletion
}

// Soft delete pattern (mark as deleted)
@DeleteMapping("/{id}")
public ResponseEntity<Void> softDeleteUser(
        @PathVariable Long id) {
    User user = userService.findById(id)
        .orElseThrow(() -> new ResourceNotFound(
            "User not found"));
    user.setDeleted(true);
    user.setDeletedAt(LocalDate.now());
    userService.save(user);
    return ResponseEntity.noContent().build();
}

// Idempotent: deleting twice is safe
// DELETE /api/users/123 -> 204 No Content
// DELETE /api/users/123 -> 404 Not Found`
        },
        {
          name: 'Status Codes',
          explanation: '2xx Success: 200 OK, 201 Created, 204 No Content. 4xx Client Errors: 400 Bad Request (invalid syntax), 401 Unauthorized (authentication required), 403 Forbidden (no permission), 404 Not Found, 409 Conflict. 5xx Server Errors: 500 Internal Server Error, 503 Service Unavailable.',
          codeExample: `// Returning proper status codes
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)  // 201
    public Order createOrder(@Valid @RequestBody Order o) {
        return orderService.create(o);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(
            @PathVariable Long id) {
        return orderService.findById(id)
            .map(ResponseEntity::ok)          // 200
            .orElse(ResponseEntity
                .notFound().build());          // 404
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Order> cancelOrder(
            @PathVariable Long id) {
        try {
            Order cancelled = orderService.cancel(id);
            return ResponseEntity.ok(cancelled);
        } catch (IllegalStateException e) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)   // 409
                .build();
        }
    }
}`
        }
      ]
    },
    {
      id: 'resource-design',
      name: 'Resource Design',
      icon: '🎯',
      color: '#f59e0b',
      description: 'URI design and resource modeling',
      diagram: ResourceDesignDiagram,
      details: [
        {
          name: 'Resource Naming',
          explanation: 'Use nouns not verbs for resource URIs. Use plural nouns for collections: /users, /products, /orders. Use singular identifiers for specific resources: /users/123. Avoid: /getUser, /createUser, /deleteUser. Good naming is intuitive and consistent.',
          codeExample: `// GOOD: Nouns, plural, consistent
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @GetMapping             // GET /api/v1/products
    public List<Product> list() { ... }

    @GetMapping("/{id}")    // GET /api/v1/products/42
    public Product get(@PathVariable Long id) { ... }

    @PostMapping            // POST /api/v1/products
    public Product create(@RequestBody Product p) { ... }

    @DeleteMapping("/{id}") // DELETE /api/v1/products/42
    public void delete(@PathVariable Long id) { ... }
}

// BAD: Verbs in URIs (anti-pattern)
// GET  /api/getProducts
// POST /api/createProduct
// POST /api/deleteProduct/42

// GOOD: Use hyphens for multi-word resources
// /api/v1/order-items
// /api/v1/product-categories
// BAD: camelCase or underscores
// /api/v1/orderItems
// /api/v1/product_categories`
        },
        {
          name: 'Nested Resources',
          explanation: 'Represent relationships through hierarchical URIs. User orders: /users/123/orders. Specific order: /users/123/orders/456. User addresses: /users/123/addresses. Limit nesting depth to 2-3 levels. For deeper relationships, consider flat URIs with query parameters.',
          codeExample: `@RestController
@RequestMapping("/api/users/{userId}/orders")
public class UserOrderController {

    // GET /api/users/123/orders
    @GetMapping
    public List<Order> getUserOrders(
            @PathVariable Long userId) {
        return orderService.findByUserId(userId);
    }

    // GET /api/users/123/orders/456
    @GetMapping("/{orderId}")
    public Order getUserOrder(
            @PathVariable Long userId,
            @PathVariable Long orderId) {
        return orderService.findByUserAndId(
            userId, orderId);
    }

    // POST /api/users/123/orders
    @PostMapping
    public ResponseEntity<Order> createOrder(
            @PathVariable Long userId,
            @RequestBody Order order) {
        order.setUserId(userId);
        Order created = orderService.save(order);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(created);
    }
}

// Too deep? Use flat URI with query param
// AVOID: /users/123/orders/456/items/789/reviews
// BETTER: /reviews?orderId=456&itemId=789`
        },
        {
          name: 'Query Parameters',
          explanation: 'Use query parameters for filtering, sorting, and pagination. Filtering: /products?category=electronics&inStock=true. Sorting: /users?sort=name,asc. Pagination: /users?page=1&size=20. Search: /products?q=laptop. Keep URIs clean and predictable.',
          codeExample: `// GET /api/products?category=electronics&minPrice=100
@GetMapping
public List<Product> searchProducts(
        @RequestParam(required = false) String category,
        @RequestParam(defaultValue = "0") double minPrice,
        @RequestParam(defaultValue = "10000") double maxPrice,
        @RequestParam(defaultValue = "name") String sortBy,
        @RequestParam(defaultValue = "asc") String order) {

    return productService.search(
        category, minPrice, maxPrice, sortBy, order);
}

// GET /api/products?q=laptop&inStock=true
@GetMapping(params = "q")
public List<Product> fullTextSearch(
        @RequestParam String q,
        @RequestParam(defaultValue = "true")
            boolean inStock) {
    return productService.search(q, inStock);
}

// Multiple values: GET /api/products?tag=java&tag=spring
@GetMapping(params = "tag")
public List<Product> filterByTags(
        @RequestParam List<String> tag) {
    return productService.findByTags(tag);
}`
        },
        {
          name: 'Pagination',
          explanation: 'Offset-based pagination: /users?page=0&size=20. Cursor-based pagination: /users?limit=20&cursor=abc123. Include pagination metadata in response: totalElements, totalPages, currentPage. Use Link headers for navigation. Cursor-based is better for large, changing datasets.',
          codeExample: `// Offset-based: GET /api/users?page=0&size=20&sort=name,asc
@GetMapping
public ResponseEntity<Page<User>> getUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size,
        @RequestParam(defaultValue = "name") String sort) {

    Pageable pageable = PageRequest.of(
        page, size, Sort.by(sort));
    Page<User> users = userService.findAll(pageable);
    return ResponseEntity.ok(users);
}

// Response includes metadata:
// {
//   "content": [ ... ],
//   "totalElements": 150,
//   "totalPages": 8,
//   "number": 0,       <- current page
//   "size": 20,
//   "first": true,
//   "last": false
// }

// Cursor-based pagination for large datasets
@GetMapping("/feed")
public ResponseEntity<CursorPage<Post>> getFeed(
        @RequestParam(required = false) String cursor,
        @RequestParam(defaultValue = "20") int limit) {
    CursorPage<Post> page = postService
        .findAfterCursor(cursor, limit);
    return ResponseEntity.ok(page);
}`
        },
        {
          name: 'Versioning',
          explanation: 'Version your API to manage breaking changes. URI versioning: /api/v1/users, /api/v2/users (most common, visible). Header versioning: Accept: application/vnd.api.v1+json. Query parameter: /api/users?version=1. Choose one approach and be consistent.',
          codeExample: `// Strategy 1: URI versioning (most common)
@RestController
@RequestMapping("/api/v1/users")
public class UserControllerV1 {
    @GetMapping("/{id}")
    public UserV1Dto getUser(@PathVariable Long id) {
        return userService.getUserV1(id);
    }
}

@RestController
@RequestMapping("/api/v2/users")
public class UserControllerV2 {
    @GetMapping("/{id}")
    public UserV2Dto getUser(@PathVariable Long id) {
        // V2 includes additional fields
        return userService.getUserV2(id);
    }
}

// Strategy 2: Header versioning
@GetMapping(value = "/{id}",
    headers = "X-API-Version=1")
public UserV1Dto getUserV1(@PathVariable Long id) {
    return userService.getUserV1(id);
}

// Strategy 3: Content negotiation
@GetMapping(value = "/{id}",
    produces = "application/vnd.myapi.v1+json")
public UserV1Dto getUserContentV1(
        @PathVariable Long id) {
    return userService.getUserV1(id);
}`
        },
        {
          name: 'Sub-resources',
          explanation: 'Model sub-resources for related entities: /users/123/profile (singular, one-to-one), /users/123/orders (plural, one-to-many). Actions as sub-resources: /orders/123/cancel (POST). Consider whether to return embedded resources or links to reduce API calls.',
          codeExample: `@RestController
@RequestMapping("/api/users/{userId}")
public class UserSubResourceController {

    // One-to-one: GET /api/users/123/profile
    @GetMapping("/profile")
    public Profile getProfile(
            @PathVariable Long userId) {
        return profileService.findByUserId(userId);
    }

    // One-to-many: GET /api/users/123/addresses
    @GetMapping("/addresses")
    public List<Address> getAddresses(
            @PathVariable Long userId) {
        return addressService.findByUserId(userId);
    }

    // Action as sub-resource
    // POST /api/users/123/deactivate
    @PostMapping("/deactivate")
    public ResponseEntity<User> deactivate(
            @PathVariable Long userId) {
        User user = userService.deactivate(userId);
        return ResponseEntity.ok(user);
    }

    // POST /api/users/123/avatar (file upload)
    @PostMapping("/avatar")
    public ResponseEntity<String> uploadAvatar(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {
        String url = storageService.store(file);
        userService.updateAvatar(userId, url);
        return ResponseEntity.ok(url);
    }
}`
        }
      ]
    },
    {
      id: 'spring-boot-rest',
      name: 'Spring Boot REST',
      icon: '🍃',
      color: '#8b5cf6',
      description: 'Building REST APIs with Spring Boot',
      diagram: SpringBootRESTDiagram,
      details: [
        {
          name: '@RestController',
          explanation: 'Combines @Controller and @ResponseBody. Methods return data directly serialized to JSON/XML instead of view names. @RequestMapping("/api/users") sets base URI. Automatically handles content negotiation based on Accept header. Central annotation for REST endpoints.',
          codeExample: `// @RestController = @Controller + @ResponseBody
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Returns JSON automatically (Jackson)
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id)
            .orElseThrow(() ->
                new ResourceNotFoundException(
                    "User not found: " + id));
    }

    // Content negotiation via Accept header
    // Accept: application/json -> JSON response
    // Accept: application/xml  -> XML response
    @GetMapping(value = "/{id}",
        produces = { MediaType.APPLICATION_JSON_VALUE,
                     MediaType.APPLICATION_XML_VALUE })
    public User getUserNegotiated(
            @PathVariable Long id) {
        return userService.findById(id).orElseThrow();
    }
}`
        },
        {
          name: 'Mapping Annotations',
          explanation: '@GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping map HTTP methods to handler methods. Can specify path, consumes, produces. Example: @GetMapping("/{id}") maps GET /api/users/{id}. Cleaner than @RequestMapping(method=RequestMethod.GET).',
          codeExample: `@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping                    // GET /api/products
    public List<Product> list() { ... }

    @GetMapping("/{id}")           // GET /api/products/5
    public Product get(
            @PathVariable Long id) { ... }

    @PostMapping(                  // POST /api/products
        consumes = MediaType.APPLICATION_JSON_VALUE)
    public Product create(
            @RequestBody Product p) { ... }

    @PutMapping("/{id}")           // PUT /api/products/5
    public Product replace(
            @PathVariable Long id,
            @RequestBody Product p) { ... }

    @PatchMapping("/{id}")         // PATCH /api/products/5
    public Product update(
            @PathVariable Long id,
            @RequestBody Map<String, Object> fields) {
        return productService.patch(id, fields);
    }

    @DeleteMapping("/{id}")        // DELETE /api/products/5
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable Long id) {
        productService.delete(id);
    }
}`
        },
        {
          name: 'Request Parameters',
          explanation: '@PathVariable extracts URI template variables: /users/{id}. @RequestParam reads query parameters: /users?status=active. @RequestBody deserializes JSON/XML body to Java object. @RequestHeader accesses HTTP headers. @Valid triggers bean validation on request body.',
          codeExample: `@RestController
@RequestMapping("/api/orders")
public class OrderController {

    // @PathVariable: GET /api/orders/42
    @GetMapping("/{id}")
    public Order getById(@PathVariable Long id) {
        return orderService.findById(id);
    }

    // @RequestParam: GET /api/orders?status=SHIPPED
    @GetMapping
    public List<Order> findByStatus(
            @RequestParam(defaultValue = "ALL")
                String status) {
        return orderService.findByStatus(status);
    }

    // @RequestBody: POST /api/orders (JSON body)
    @PostMapping
    public Order create(
            @Valid @RequestBody CreateOrderRequest req) {
        return orderService.create(req);
    }

    // @RequestHeader: custom header access
    @GetMapping("/export")
    public ResponseEntity<byte[]> export(
            @RequestHeader("Accept-Language")
                String lang,
            @RequestHeader(value = "X-Timezone",
                defaultValue = "UTC") String tz) {
        byte[] report = reportService.generate(lang, tz);
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .body(report);
    }
}`
        },
        {
          name: 'ResponseEntity',
          explanation: 'Provides full control over HTTP response: status code, headers, and body. ResponseEntity.ok(user) returns 200 with body. ResponseEntity.created(uri).body(user) returns 201 with Location header. ResponseEntity.notFound().build() returns 404. Essential for proper REST responses.',
          codeExample: `@RestController
@RequestMapping("/api/users")
public class UserController {

    // 200 OK with body
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(
            @PathVariable Long id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }

    // 201 Created with Location header
    @PostMapping
    public ResponseEntity<User> createUser(
            @Valid @RequestBody User user) {
        User saved = userService.save(user);
        URI location = URI.create(
            "/api/users/" + saved.getId());
        return ResponseEntity
            .created(location)
            .body(saved);
    }

    // Custom headers in response
    @GetMapping("/count")
    public ResponseEntity<Long> countUsers() {
        long count = userService.count();
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Total-Count",
            String.valueOf(count));
        return new ResponseEntity<>(
            count, headers, HttpStatus.OK);
    }

    // 204 No Content
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}`
        },
        {
          name: 'Exception Handling',
          explanation: '@ExceptionHandler in controller handles specific exceptions. @RestControllerAdvice provides global exception handling. Return ErrorResponse with status, message, timestamp. @ResponseStatus sets default status code on exceptions. Centralized error handling ensures consistent error responses.',
          codeExample: `// Global exception handler
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(
            ResourceNotFoundException ex) {
        return new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            LocalDate.now());
    }

    @ExceptionHandler(
        MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
            .forEach(e -> errors.put(
                e.getField(),
                e.getDefaultMessage()));
        return new ErrorResponse(400,
            "Validation failed", errors);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGeneral(Exception ex) {
        return new ErrorResponse(500,
            "Internal server error", null);
    }
}

// Custom exception with status
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException
        extends RuntimeException {
    public ResourceNotFoundException(String msg) {
        super(msg);
    }
}`
        },
        {
          name: 'CORS Configuration',
          explanation: '@CrossOrigin on controller or method enables cross-origin requests. WebMvcConfigurer.addCorsMappings() for global CORS config. Configure allowedOrigins, allowedMethods, allowedHeaders, maxAge. Essential for frontend applications on different domains calling your API.',
          codeExample: `// Method-level CORS
@CrossOrigin(origins = "http://localhost:3000")
@GetMapping("/api/users")
public List<User> getUsers() { ... }

// Controller-level CORS
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
public class PublicController { ... }

// Global CORS configuration (recommended)
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(
            CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(
                "http://localhost:3000",
                "https://myapp.com")
            .allowedMethods(
                "GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}

// CORS with Spring Security
@Bean
public SecurityFilterChain filterChain(
        HttpSecurity http) throws Exception {
    http.cors(cors -> cors
        .configurationSource(corsConfig()));
    return http.build();
}`
        }
      ]
    },
    {
      id: 'api-security',
      name: 'API Security',
      icon: '🔐',
      color: '#ec4899',
      description: 'Authentication and authorization',
      diagram: APISecurityDiagram,
      details: [
        {
          name: 'JWT Authentication',
          explanation: 'JSON Web Tokens are self-contained tokens with header, payload, and signature. Stateless authentication - server does not store session. Token contains user info and claims. Verify signature on each request. Include in Authorization: Bearer <token> header. Set appropriate expiration.',
          codeExample: `// JWT utility service
@Service
public class JwtService {

    private final String SECRET = "my-secret-key";

    public String generateToken(UserDetails user) {
        return Jwts.builder()
            .setSubject(user.getUsername())
            .claim("roles", user.getAuthorities())
            .setIssuedAt(new Date())
            .setExpiration(new Date(
                System.currentTimeMillis()
                + 86400000)) // 24 hours
            .signWith(SignatureAlgorithm.HS256, SECRET)
            .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
            .setSigningKey(SECRET)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public boolean isTokenValid(String token,
            UserDetails user) {
        String username = extractUsername(token);
        return username.equals(user.getUsername())
            && !isTokenExpired(token);
    }
}

// Login endpoint returns JWT
@PostMapping("/auth/login")
public ResponseEntity<AuthResponse> login(
        @RequestBody LoginRequest request) {
    Authentication auth = authManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()));
    String token = jwtService.generateToken(
        (UserDetails) auth.getPrincipal());
    return ResponseEntity.ok(
        new AuthResponse(token));
}`
        },
        {
          name: 'Spring Security',
          explanation: 'SecurityFilterChain configures HTTP security. Permit public endpoints, require authentication for protected ones. SessionCreationPolicy.STATELESS for REST APIs. Add JWT filter before UsernamePasswordAuthenticationFilter. Configure CSRF (usually disabled for APIs).',
          codeExample: `@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            // Disable CSRF for REST APIs
            .csrf(csrf -> csrf.disable())

            // Stateless session management
            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS))

            // URL-based authorization
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**")
                    .permitAll()
                .requestMatchers("/api/public/**")
                    .permitAll()
                .requestMatchers("/api/admin/**")
                    .hasRole("ADMIN")
                .anyRequest().authenticated())

            // Add JWT filter
            .authenticationProvider(authProvider)
            .addFilterBefore(jwtAuthFilter,
                UsernamePasswordAuthenticationFilter
                    .class);

        return http.build();
    }
}`
        },
        {
          name: 'Method Security',
          explanation: '@EnableMethodSecurity enables method-level security. @PreAuthorize("hasRole(\'ADMIN\')") restricts to admin role. @PreAuthorize("isAuthenticated()") requires any authenticated user. SpEL expressions: #id == authentication.principal.id for owner-only access.',
          codeExample: `@Configuration
@EnableMethodSecurity
public class MethodSecurityConfig { }

@RestController
@RequestMapping("/api/users")
public class UserController {

    // Only ADMIN role can list all users
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    // Owner or ADMIN can view profile
    @PreAuthorize(
        "#id == authentication.principal.id "
        + "or hasRole('ADMIN')")
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    // Any authenticated user
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id,
            @RequestBody User user) {
        return userService.update(id, user);
    }

    // Post-filter: return only owned resources
    @PostFilter(
        "filterObject.ownerId == "
        + "authentication.principal.id")
    @GetMapping("/my-orders")
    public List<Order> getMyOrders() {
        return orderService.findAll();
    }
}`
        },
        {
          name: 'OAuth 2.0',
          explanation: 'Authorization framework for third-party access. Resource Owner (user), Client (app), Authorization Server, Resource Server. Grant types: Authorization Code (web apps), Client Credentials (service-to-service). Spring Security OAuth2 Resource Server validates tokens.',
          codeExample: `// OAuth2 Resource Server configuration
@Configuration
public class OAuth2ResourceServerConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http.oauth2ResourceServer(oauth2 ->
            oauth2.jwt(jwt -> jwt
                .jwtAuthenticationConverter(
                    jwtAuthConverter())));
        return http.build();
    }

    // Convert JWT claims to Spring authorities
    @Bean
    public JwtAuthenticationConverter
            jwtAuthConverter() {
        var converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(
            jwt -> {
                List<String> roles = jwt.getClaimAsStringList("roles");
                return roles.stream()
                    .map(role -> new SimpleGrantedAuthority(
                        "ROLE_" + role))
                    .collect(Collectors.toList());
            });
        return converter;
    }
}

// application.yml
// spring:
//   security:
//     oauth2:
//       resourceserver:
//         jwt:
//           issuer-uri: https://auth.example.com
//           jwk-set-uri: https://auth.example.com/.well-known/jwks.json`
        },
        {
          name: 'API Keys',
          explanation: 'Simple token-based authentication for services. Pass in X-API-Key header. Validate against stored keys. Good for service identification, not user authentication. Combine with rate limiting per key. Less secure than JWT/OAuth - no expiration, no claims.',
          codeExample: `// API Key filter
@Component
public class ApiKeyFilter extends OncePerRequestFilter {

    @Value("\${api.keys}")
    private List<String> validApiKeys;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String apiKey = request
            .getHeader("X-API-Key");

        if (apiKey == null
                || !validApiKeys.contains(apiKey)) {
            response.setStatus(
                HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(
                "Invalid API Key");
            return;
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(
            HttpServletRequest request) {
        // Skip filter for public endpoints
        return request.getRequestURI()
            .startsWith("/api/public");
    }
}

// Usage: curl -H "X-API-Key: abc123" /api/data`
        },
        {
          name: 'Rate Limiting',
          explanation: 'Prevent API abuse by limiting requests per time period. Track requests per client (IP or API key). Return 429 Too Many Requests when exceeded. Include X-Rate-Limit and X-Rate-Remaining headers. Implement with filters, interceptors, or external tools like Redis.',
          codeExample: `// Rate limiting interceptor
@Component
public class RateLimitInterceptor
        implements HandlerInterceptor {

    // Simple in-memory rate limiter
    private final Map<String, List<Long>> requests
        = new HashMap<>();
    private static final int MAX_REQUESTS = 100;
    private static final long WINDOW_MS = 60000;

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler) throws Exception {

        String clientId = request
            .getHeader("X-API-Key");
        if (clientId == null) {
            clientId = request.getRemoteAddr();
        }

        long now = System.currentTimeMillis();
        requests.putIfAbsent(clientId,
            new ArrayList<>());
        List<Long> timestamps = requests.get(clientId);
        timestamps.removeIf(
            t -> t < now - WINDOW_MS);

        response.setHeader("X-Rate-Limit",
            String.valueOf(MAX_REQUESTS));
        response.setHeader("X-Rate-Remaining",
            String.valueOf(
                MAX_REQUESTS - timestamps.size()));

        if (timestamps.size() >= MAX_REQUESTS) {
            response.setStatus(429);
            response.getWriter()
                .write("Rate limit exceeded");
            return false;
        }

        timestamps.add(now);
        return true;
    }
}`
        }
      ]
    },
    {
      id: 'api-documentation',
      name: 'API Documentation',
      icon: '📚',
      color: '#06b6d4',
      description: 'OpenAPI/Swagger documentation',
      diagram: APIDocsDiagram,
      details: [
        {
          name: 'OpenAPI Specification',
          explanation: 'OpenAPI 3.0 is the industry standard for describing REST APIs. YAML or JSON format. Describes endpoints, parameters, request/response schemas, authentication. Machine-readable for code generation. Springdoc-openapi auto-generates from Spring Boot code.',
          codeExample: `// Add springdoc-openapi dependency
// build.gradle:
// implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.3.0'

// OpenAPI configuration
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("User Management API")
                .version("1.0")
                .description("REST API for users")
                .contact(new Contact()
                    .name("Dev Team")
                    .email("dev@example.com")))
            .addSecurityItem(new SecurityRequirement()
                .addList("Bearer Auth"))
            .components(new Components()
                .addSecuritySchemes("Bearer Auth",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}

// Auto-generated spec at: /v3/api-docs
// Swagger UI at: /swagger-ui.html
// application.yml:
// springdoc:
//   api-docs:
//     path: /v3/api-docs
//   swagger-ui:
//     path: /swagger-ui.html`
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

  useVoiceConceptNavigation(concepts, setSelectedConceptIndex, setSelectedDetailIndex)

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
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  {DiagramComponent && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  {detail.codeExample && (
                    <div style={{
                      backgroundColor: '#1e293b',
                      padding: '1.5rem',
                      borderRadius: '0.5rem',
                      borderLeft: `4px solid ${selectedConcept.color}`,
                      overflow: 'auto',
                      marginTop: '1rem'
                    }}>
                      <SyntaxHighlighter code={detail.codeExample} />
                    </div>
                  )}
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

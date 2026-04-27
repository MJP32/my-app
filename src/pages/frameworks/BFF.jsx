import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

const SyntaxHighlighter = ({ code, language = 'java' }) => {
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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|super|this|null|default|record|sealed|permits|yield|var)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Map|HashMap|Optional|Exception|Override|Integer|Long|Component|Bean|Configuration|Autowired|Service|RestController|GetMapping|PostMapping|RequestMapping|PathVariable|RequestBody|ResponseEntity|Mono|Flux|WebClient|CircuitBreaker|Retry|TimeLimiter|CompletableFuture|Duration|HttpStatus|RestClient|RequestParam|Value|Slf4j|Log|Logger|CacheConfig|Cacheable|CacheEvict)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  const highlightJS = (code) => {
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

    highlighted = highlighted.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|import|export|from|default|async|await|new|class|extends|super|this|typeof|instanceof|of|in|yield)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(Promise|Error|Map|Set|Array|Object|JSON|console|Math|Date|Response|Request|Router)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')
      .replace(/=&gt;/g, '<span style="color: #c586c0;">=&gt;</span>')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  const highlightYaml = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^(\s*)([\w.-]+)(:)/gm, '$1<span style="color: #569cd6;">$2</span><span style="color: #d4d4d4;">$3</span>')
      .replace(/(#.*$)/gm, '<span style="color: #6a9955; font-style: italic;">$1</span>')
      .replace(/:\s+(true|false)\b/g, ': <span style="color: #569cd6;">$1</span>')
      .replace(/:\s+(\d+)/g, ': <span style="color: #b5cea8;">$1</span>')
    return highlighted
  }

  const highlight = language === 'javascript' ? highlightJS : language === 'yaml' ? highlightYaml : highlightJava

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
      <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
    </pre>
  )
}

const cardStyle = {
  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
  padding: '2rem',
  borderRadius: '12px',
  border: '1px solid #374151'
}

const codeBlockStyle = {
  backgroundColor: '#1e1e1e',
  padding: '1.25rem',
  borderRadius: '8px',
  border: '1px solid #374151'
}

const h2Style = { fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }
const pStyle = { fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }
const tipStyle = {
  backgroundColor: '#064e3b',
  padding: '1rem',
  borderRadius: '8px',
  borderLeft: '4px solid #10b981'
}

function BFF({ onBack, breadcrumb }) {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#6ee7b7',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(16, 185, 129, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(16, 185, 129, 0.2)'
          }}
        >
          Back
        </button>
      </div>

      {breadcrumb && (
        <Breadcrumb
          breadcrumbStack={[
            breadcrumb.section && { name: breadcrumb.section.name, icon: breadcrumb.section.icon, onClick: breadcrumb.section.onClick },
            breadcrumb.category && { name: breadcrumb.category.name, onClick: breadcrumb.category.onClick },
            breadcrumb.topic && { name: breadcrumb.topic }
          ].filter(Boolean)}
          colors={breadcrumb.colors}
          onMainMenu={breadcrumb.onMainMenu}
        />
      )}

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0.5rem',
        background: 'linear-gradient(to right, #6ee7b7, #34d399)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Backend for Frontend (BFF)
      </h1>
      <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Dedicated backend services tailored for each frontend experience
      </p>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #374151',
        overflowX: 'auto',
        flexWrap: 'nowrap'
      }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'architecture', label: 'Architecture' },
          { id: 'spring-bff', label: 'Spring Boot BFF' },
          { id: 'node-bff', label: 'Node.js BFF' },
          { id: 'auth-security', label: 'Auth & Security' },
          { id: 'caching', label: 'Caching' },
          { id: 'testing', label: 'Testing' },
          { id: 'real-world', label: 'Real-World' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab.id ? '#10b981' : 'transparent',
              color: activeSection === tab.id ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== tab.id) {
                e.target.style.backgroundColor = '#374151'
                e.target.style.color = '#d1d5db'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== tab.id) {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#9ca3af'
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>What is the BFF Pattern?</h2>
            <p style={pStyle}>
              The Backend for Frontend (BFF) pattern creates dedicated backend services for each type of frontend client.
              Instead of a single general-purpose API serving mobile, web, and desktop clients, each client gets its own
              tailored backend that aggregates, transforms, and optimizes data specifically for that experience.
            </p>
            <div style={tipStyle}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>The Core Problem:</strong> Mobile apps need compact payloads with minimal fields, web dashboards
                need rich aggregated data, and admin panels need detailed operational views &mdash; a single API cannot
                optimally serve all of them without becoming bloated.
              </p>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              Architecture Diagram
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #374151',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              color: '#d4d4d4',
              overflowX: 'auto',
              whiteSpace: 'pre'
            }}>
{`  Mobile App ──────> Mobile BFF ──────┐
                                      ├──> User Service
  Web Browser ─────> Web BFF ─────────┤
                                      ├──> Product Service
  Admin Panel ─────> Admin BFF ───────┤
                                      ├──> Order Service
  Smart TV ────────> TV BFF ──────────┘
                                           Inventory Service

  Each BFF:
  - Aggregates calls to multiple microservices
  - Transforms responses to client-specific shapes
  - Handles auth and session management for its client
  - Owns its deployment lifecycle independently`}
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Key Benefits</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                { title: 'Optimized Payloads', desc: 'Each client receives exactly the data it needs - no over-fetching or under-fetching' },
                { title: 'Simplified Frontend', desc: 'Frontend developers consume a clean API instead of orchestrating multiple service calls' },
                { title: 'Independent Deployability', desc: 'Deploy mobile BFF changes without affecting web experience and vice versa' },
                { title: 'Team Ownership', desc: 'Frontend teams own their BFF - they control the API contract they consume' },
                { title: 'Protocol Translation', desc: 'BFF can use gRPC to backend services while exposing REST or GraphQL to clients' },
                { title: 'Security Isolation', desc: 'Each BFF enforces security policies specific to its client context' }
              ].map((item, index) => (
                <div key={index} style={{
                  backgroundColor: '#1f2937',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #374151'
                }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>When to Use vs. When NOT to Use</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div style={{ backgroundColor: '#064e3b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #10b981' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#6ee7b7', marginBottom: '0.75rem' }}>Use BFF When</h3>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.8' }}>
                  <li>Multiple client types need different data shapes</li>
                  <li>Frontend teams want ownership of their API</li>
                  <li>Complex aggregation from many microservices</li>
                  <li>Different auth mechanisms per client type</li>
                  <li>Performance requirements vary by client</li>
                </ul>
              </div>
              <div style={{ backgroundColor: '#4c1d1d', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ef4444' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#fca5a5', marginBottom: '0.75rem' }}>Avoid BFF When</h3>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.8' }}>
                  <li>Only one client type (just a web app)</li>
                  <li>All clients need the same data shapes</li>
                  <li>Small team - BFF per client adds overhead</li>
                  <li>Simple CRUD with no aggregation needed</li>
                  <li>API Gateway with transformation is sufficient</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>BFF vs API Gateway</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #374151' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: '#6ee7b7' }}>Aspect</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: '#6ee7b7' }}>BFF</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: '#6ee7b7' }}>API Gateway</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Purpose', 'Client-specific API tailoring', 'Cross-cutting concerns (routing, auth, rate limiting)'],
                    ['Scope', 'One per client type', 'Single gateway for all clients'],
                    ['Logic', 'Business aggregation and transformation', 'Infrastructure concerns only'],
                    ['Ownership', 'Frontend / product team', 'Platform / infrastructure team'],
                    ['Data shaping', 'Deep response transformation', 'Minimal or no transformation'],
                    ['Deployment', 'Independently per client', 'Shared infrastructure']
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #374151' }}>
                      <td style={{ padding: '0.75rem', color: '#d1d5db', fontWeight: '600' }}>{row[0]}</td>
                      <td style={{ padding: '0.75rem', color: '#9ca3af' }}>{row[1]}</td>
                      <td style={{ padding: '0.75rem', color: '#9ca3af' }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Architecture Section */}
      {activeSection === 'architecture' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Single BFF Per Client Type</h2>
            <p style={pStyle}>
              The most common approach: each client platform gets its own dedicated BFF service. The mobile BFF
              returns lightweight payloads, the web BFF returns richer data, and the admin BFF exposes operational endpoints.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`// Web BFF - returns full product details with reviews
@RestController
@RequestMapping("/api/products")
public class WebProductController {

    private final ProductService productService;
    private final ReviewService reviewService;
    private final RecommendationService recService;

    @GetMapping("/{id}")
    public WebProductDetailDTO getProduct(@PathVariable String id) {
        var product = productService.getProduct(id);
        var reviews = reviewService.getReviews(id);
        var recommendations = recService.getRecommendations(id);

        return new WebProductDetailDTO(
            product.id(), product.name(), product.description(),
            product.fullImageUrl(),       // high-res for web
            product.specifications(),     // full spec list
            reviews,                      // all reviews
            recommendations               // 12 recommendations
        );
    }
}

// Mobile BFF - returns compact product summary
@RestController
@RequestMapping("/api/products")
public class MobileProductController {

    private final ProductService productService;
    private final ReviewService reviewService;

    @GetMapping("/{id}")
    public MobileProductDTO getProduct(@PathVariable String id) {
        var product = productService.getProduct(id);
        var reviewSummary = reviewService.getReviewSummary(id);

        return new MobileProductDTO(
            product.id(), product.name(),
            product.thumbnailUrl(),       // compressed for mobile
            product.shortDescription(),   // truncated text
            reviewSummary.averageRating(),// just the rating
            reviewSummary.count()         // just the count
        );
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>BFF with GraphQL Aggregation</h2>
            <p style={pStyle}>
              Use GraphQL in the BFF layer to let clients query exactly what they need. The BFF resolves
              fields by calling the appropriate microservices behind the scenes.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="javascript" code={`// GraphQL BFF - Apollo Server aggregating REST microservices
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = \`
  type Product {
    id: ID!
    name: String!
    price: Float!
    inventory: Inventory
    reviews: [Review!]!
  }
  type Inventory { available: Int!, warehouse: String! }
  type Review { rating: Int!, comment: String!, author: String! }
  type Query { product(id: ID!): Product }
\`;

const resolvers = {
  Query: {
    product: async (_, { id }) => {
      const res = await fetch(\`http://catalog-service/products/\${id}\`);
      return res.json();
    }
  },
  Product: {
    inventory: async (parent) => {
      const res = await fetch(
        \`http://inventory-service/stock/\${parent.id}\`
      );
      return res.json();
    },
    reviews: async (parent) => {
      const res = await fetch(
        \`http://review-service/reviews?productId=\${parent.id}\`
      );
      return res.json();
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(\`GraphQL BFF ready at \${url}\`);`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>BFF with gRPC Backend + REST Frontend</h2>
            <p style={pStyle}>
              BFF exposes REST to frontend clients but uses high-performance gRPC to communicate with
              backend microservices. This combines developer-friendly REST for frontends with efficient
              binary protocols internally.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@RestController
@RequestMapping("/api/dashboard")
public class DashboardBFFController {

    // gRPC stubs for backend communication
    private final UserServiceGrpc.UserServiceBlockingStub userStub;
    private final OrderServiceGrpc.OrderServiceBlockingStub orderStub;
    private final AnalyticsServiceGrpc.AnalyticsServiceBlockingStub analyticsStub;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getDashboard(
            @RequestHeader("X-User-Id") String userId) {
        // gRPC calls to backend services
        var userProfile = userStub.getProfile(
            ProfileRequest.newBuilder().setUserId(userId).build()
        );
        var recentOrders = orderStub.getRecentOrders(
            OrderQuery.newBuilder().setUserId(userId).setLimit(5).build()
        );
        var analytics = analyticsStub.getUserAnalytics(
            AnalyticsRequest.newBuilder().setUserId(userId).build()
        );

        // Transform gRPC responses to REST-friendly DTO
        return ResponseEntity.ok(new DashboardSummaryDTO(
            userProfile.getDisplayName(),
            recentOrders.getOrdersList().stream()
                .map(o -> new OrderSummary(o.getId(), o.getTotal(), o.getStatus()))
                .toList(),
            new AnalyticsSummary(
                analytics.getTotalSpent(),
                analytics.getOrderCount(),
                analytics.getFavoriteCategory()
            )
        ));
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Edge BFF vs Domain BFF</h2>
            <p style={pStyle}>
              Edge BFFs sit at the network edge per client type. Domain BFFs organize by business domain
              and can serve multiple clients. Choose based on team structure and complexity.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#6ee7b7', marginBottom: '0.5rem' }}>Edge BFF</h3>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                  One BFF per client type at the edge. Mobile BFF, Web BFF, etc. Each aggregates across all domains.
                  Best when frontend teams own their full experience.
                </p>
              </div>
              <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#6ee7b7', marginBottom: '0.5rem' }}>Domain BFF</h3>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                  One BFF per business domain (Checkout BFF, Catalog BFF). Each serves all client types
                  with client-specific endpoints. Best when domain teams own services end-to-end.
                </p>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Shared Libraries Between BFFs</h2>
            <p style={pStyle}>
              Extract common concerns into shared libraries to avoid duplication across BFFs while
              keeping BFFs independently deployable.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`// shared-bff-commons library
// Shared DTOs
public record ServiceError(String code, String message, Instant timestamp) {}

// Shared auth token extraction
public class TokenExtractor {
    public static String extractBearerToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        throw new UnauthorizedException("Missing bearer token");
    }
}

// Shared resilience configuration
@Configuration
public class SharedResilienceConfig {
    @Bean
    public CircuitBreakerConfig defaultCircuitBreakerConfig() {
        return CircuitBreakerConfig.custom()
            .failureRateThreshold(50)
            .waitDurationInOpenState(Duration.ofSeconds(30))
            .slidingWindowSize(10)
            .build();
    }
}

// Each BFF imports the shared library:
// build.gradle
// dependencies {
//     implementation project(':shared-bff-commons')
//     implementation 'org.springframework.boot:spring-boot-starter-web'
// }`} />
            </div>
          </div>
        </div>
      )}

      {/* Spring Boot BFF Section */}
      {activeSection === 'spring-bff' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Project Setup</h2>
            <p style={pStyle}>
              A Spring Boot BFF uses WebClient for non-blocking downstream calls and exposes REST
              endpoints tailored to the frontend client.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`// build.gradle dependencies
// implementation 'org.springframework.boot:spring-boot-starter-webflux'
// implementation 'org.springframework.boot:spring-boot-starter-web'
// implementation 'io.github.resilience4j:resilience4j-spring-boot3'
// implementation 'org.springframework.boot:spring-boot-starter-cache'

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient userServiceClient() {
        return WebClient.builder()
            .baseUrl("http://user-service:8081")
            .defaultHeader("Content-Type", "application/json")
            .filter(logRequest())
            .build();
    }

    @Bean
    public WebClient orderServiceClient() {
        return WebClient.builder()
            .baseUrl("http://order-service:8082")
            .defaultHeader("Content-Type", "application/json")
            .build();
    }

    @Bean
    public WebClient inventoryServiceClient() {
        return WebClient.builder()
            .baseUrl("http://inventory-service:8083")
            .build();
    }

    private ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(req -> {
            log.debug("BFF calling: {} {}", req.method(), req.url());
            return Mono.just(req);
        });
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Aggregating Multiple Service Calls</h2>
            <p style={pStyle}>
              The BFF controller orchestrates calls to multiple downstream services and merges them
              into a single client-optimized response.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@RestController
@RequestMapping("/api/web/profile")
public class WebProfileBFFController {

    private final WebClient userClient;
    private final WebClient orderClient;

    @GetMapping("/{userId}")
    public Mono<WebProfileDTO> getProfile(@PathVariable String userId) {
        Mono<UserDetails> user = userClient.get()
            .uri("/users/{id}", userId)
            .retrieve()
            .bodyToMono(UserDetails.class);

        Mono<List<Order>> orders = orderClient.get()
            .uri("/orders?userId={id}&limit=10", userId)
            .retrieve()
            .bodyToFlux(Order.class)
            .collectList();

        // Mono.zip runs both calls concurrently
        return Mono.zip(user, orders)
            .map(tuple -> {
                var u = tuple.getT1();
                var o = tuple.getT2();
                return new WebProfileDTO(
                    u.name(), u.email(), u.avatarUrl(),
                    u.memberSince(),
                    o.stream().map(ord -> new OrderSummary(
                        ord.id(), ord.total(),
                        ord.status(), ord.createdAt()
                    )).toList(),
                    o.stream()
                        .mapToDouble(Order::total).sum()
                );
            });
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Parallel Calls with CompletableFuture</h2>
            <p style={pStyle}>
              For servlet-based BFFs, use CompletableFuture to parallelize downstream service calls
              and reduce overall latency.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@Service
public class DashboardAggregator {

    private final RestClient userClient;
    private final RestClient analyticsClient;
    private final RestClient notificationClient;
    private final ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

    public DashboardDTO buildDashboard(String userId) {
        var userFuture = CompletableFuture.supplyAsync(
            () -> userClient.get()
                .uri("/users/{id}", userId)
                .retrieve()
                .body(UserProfile.class),
            executor
        );

        var statsFuture = CompletableFuture.supplyAsync(
            () -> analyticsClient.get()
                .uri("/analytics/user/{id}/summary", userId)
                .retrieve()
                .body(UserStats.class),
            executor
        );

        var notifFuture = CompletableFuture.supplyAsync(
            () -> notificationClient.get()
                .uri("/notifications?userId={id}&unread=true", userId)
                .retrieve()
                .body(new ParameterizedTypeReference<List<Notification>>() {}),
            executor
        );

        // Wait for all three in parallel
        CompletableFuture.allOf(userFuture, statsFuture, notifFuture).join();

        return new DashboardDTO(
            userFuture.join(),
            statsFuture.join(),
            notifFuture.join()
        );
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Response Shaping: Backend DTOs to Frontend DTOs</h2>
            <p style={pStyle}>
              The BFF transforms verbose backend responses into clean, client-specific shapes using
              Java records and mapping logic.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`// Backend service returns this (verbose, internal)
record BackendProduct(
    String productId, String sku, String internalCode,
    String title, String longDescription, String shortDescription,
    BigDecimal wholesalePrice, BigDecimal retailPrice, BigDecimal tax,
    String warehouseCode, int stockCount, int reservedCount,
    List<BackendImage> images, Map<String, String> metadata,
    Instant createdAt, Instant updatedAt, String createdBy
) {}

// Mobile BFF shapes it to this (compact, client-friendly)
record MobileProductCard(
    String id,
    String name,
    String thumbnail,
    String price,
    boolean inStock
) {}

@Component
public class MobileProductMapper {

    public MobileProductCard toMobileCard(BackendProduct p) {
        return new MobileProductCard(
            p.productId(),
            p.title(),
            pickSmallestImage(p.images()),
            formatPrice(p.retailPrice()),
            (p.stockCount() - p.reservedCount()) > 0
        );
    }

    private String pickSmallestImage(List<BackendImage> images) {
        return images.stream()
            .filter(img -> "thumbnail".equals(img.type()))
            .findFirst()
            .map(BackendImage::url)
            .orElse("/placeholder.png");
    }

    private String formatPrice(BigDecimal price) {
        return "$" + price.setScale(2, RoundingMode.HALF_UP);
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Error Handling with Resilience4j</h2>
            <p style={pStyle}>
              Wrap downstream calls with circuit breakers and fallbacks to prevent cascading failures
              when a microservice is down.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@Service
public class ResilientProductService {

    private final WebClient catalogClient;
    private final WebClient pricingClient;

    @CircuitBreaker(name = "catalogService", fallbackMethod = "catalogFallback")
    @Retry(name = "catalogService")
    @TimeLimiter(name = "catalogService")
    public CompletableFuture<ProductDetail> getProductDetail(String id) {
        return catalogClient.get()
            .uri("/catalog/products/{id}", id)
            .retrieve()
            .bodyToMono(ProductDetail.class)
            .toFuture();
    }

    // Fallback returns cached or default data
    public CompletableFuture<ProductDetail> catalogFallback(
            String id, Throwable ex) {
        log.warn("Catalog service unavailable for {}: {}", id, ex.getMessage());
        return CompletableFuture.completedFuture(
            new ProductDetail(id, "Product Unavailable",
                "Details temporarily unavailable", null)
        );
    }

    @CircuitBreaker(name = "pricingService", fallbackMethod = "pricingFallback")
    public Mono<PriceInfo> getPrice(String productId) {
        return pricingClient.get()
            .uri("/pricing/{id}", productId)
            .retrieve()
            .bodyToMono(PriceInfo.class);
    }

    public Mono<PriceInfo> pricingFallback(String productId, Throwable ex) {
        return Mono.just(new PriceInfo(productId, null, "Price unavailable"));
    }
}

// application.yml
// resilience4j:
//   circuitbreaker:
//     instances:
//       catalogService:
//         failureRateThreshold: 50
//         waitDurationInOpenState: 30s
//         slidingWindowSize: 10
//   retry:
//     instances:
//       catalogService:
//         maxAttempts: 3
//         waitDuration: 500ms
//   timelimiter:
//     instances:
//       catalogService:
//         timeoutDuration: 3s`} />
            </div>
          </div>
        </div>
      )}

      {/* Node.js BFF Section */}
      {activeSection === 'node-bff' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Express BFF Setup</h2>
            <p style={pStyle}>
              A lightweight Node.js BFF using Express to aggregate microservice calls. Node excels here
              due to its non-blocking I/O model for concurrent outbound HTTP requests.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="javascript" code={`import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
app.use(cors({ origin: 'https://myapp.com' }));
app.use(helmet());
app.use(express.json());

const SERVICES = {
  user:      'http://user-service:8081',
  order:     'http://order-service:8082',
  catalog:   'http://catalog-service:8083',
  inventory: 'http://inventory-service:8084'
};

// Helper: fetch from a microservice with timeout
async function fetchService(service, path, token) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(\`\${SERVICES[service]}\${path}\`, {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal
    });
    if (!res.ok) throw new Error(\`\${service} returned \${res.status}\`);
    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}

app.listen(4000, () => console.log('BFF listening on port 4000'));`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Parallel Fetching with Promise.all</h2>
            <p style={pStyle}>
              Aggregate data from multiple services concurrently. Use Promise.allSettled when you want
              partial results even if some services fail.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="javascript" code={`// Mobile BFF: Product detail endpoint
app.get('/api/mobile/products/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(' ')[1];

  try {
    // Fire all requests concurrently
    const [product, inventory, reviewSummary] = await Promise.all([
      fetchService('catalog', \`/products/\${id}\`, token),
      fetchService('inventory', \`/stock/\${id}\`, token),
      fetchService('catalog', \`/reviews/\${id}/summary\`, token)
    ]);

    // Shape response for mobile
    res.json({
      id: product.id,
      name: product.title,
      image: product.images?.[0]?.thumbnail || null,
      price: product.retailPrice,
      inStock: inventory.available > 0,
      rating: reviewSummary.averageRating,
      reviewCount: reviewSummary.totalCount
    });
  } catch (err) {
    console.error('Product aggregation failed:', err);
    res.status(502).json({ error: 'Service temporarily unavailable' });
  }
});

// Using Promise.allSettled for graceful degradation
app.get('/api/mobile/home', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  const results = await Promise.allSettled([
    fetchService('catalog', '/featured', token),
    fetchService('order', '/recent?limit=3', token),
    fetchService('user', '/notifications/count', token)
  ]);

  res.json({
    featured:      results[0].status === 'fulfilled' ? results[0].value : [],
    recentOrders:  results[1].status === 'fulfilled' ? results[1].value : [],
    notifications: results[2].status === 'fulfilled' ? results[2].value : 0
  });
});`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>GraphQL BFF with Apollo Server</h2>
            <p style={pStyle}>
              Apollo Server as a BFF lets frontends query exactly the fields they need. The BFF resolves
              each field by calling the appropriate REST microservice.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="javascript" code={`import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const typeDefs = \`
  type User {
    id: ID!
    name: String!
    email: String!
    orders(limit: Int): [Order!]!
    loyaltyPoints: Int!
  }
  type Order {
    id: ID!
    total: Float!
    status: String!
    items: [OrderItem!]!
  }
  type OrderItem { productName: String!, quantity: Int!, price: Float! }
  type Query { me: User }
\`;

const resolvers = {
  Query: {
    me: async (_, __, { token }) => {
      return fetchService('user', '/me', token);
    }
  },
  User: {
    orders: async (user, { limit = 5 }, { token }) => {
      const orders = await fetchService(
        'order', \`/orders?userId=\${user.id}&limit=\${limit}\`, token
      );
      return orders;
    },
    loyaltyPoints: async (user, _, { token }) => {
      const loyalty = await fetchService(
        'user', \`/loyalty/\${user.id}\`, token
      );
      return loyalty.points;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use('/graphql', expressMiddleware(server, {
  context: async ({ req }) => ({
    token: req.headers.authorization?.split(' ')[1]
  })
}));`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Response Transformation and Field Filtering</h2>
            <p style={pStyle}>
              Transform verbose backend responses into lean, client-specific shapes. Support field
              selection via query parameters for flexible clients.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="javascript" code={`// Transformation utilities
function transformForMobile(backendProduct) {
  return {
    id: backendProduct.productId,
    name: backendProduct.title,
    image: backendProduct.images?.find(i => i.type === 'thumbnail')?.url,
    price: formatCurrency(backendProduct.retailPrice),
    inStock: backendProduct.stockCount > backendProduct.reservedCount
    // Omits: sku, internalCode, wholesalePrice, warehouse, metadata, etc.
  };
}

function transformForWeb(backendProduct) {
  return {
    ...transformForMobile(backendProduct),
    description: backendProduct.longDescription,
    specs: backendProduct.metadata,
    images: backendProduct.images.map(i => i.url),
    pricing: {
      retail: formatCurrency(backendProduct.retailPrice),
      tax: formatCurrency(backendProduct.tax),
      total: formatCurrency(backendProduct.retailPrice + backendProduct.tax)
    }
  };
}

// Optional field filtering via query param: ?fields=id,name,price
function filterFields(data, fields) {
  if (!fields) return data;
  const allowed = new Set(fields.split(','));
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => allowed.has(key))
  );
}

app.get('/api/web/products/:id', async (req, res) => {
  const product = await fetchService('catalog', \`/products/\${req.params.id}\`);
  const webProduct = transformForWeb(product);
  res.json(filterFields(webProduct, req.query.fields));
});`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Auth Token Forwarding Middleware</h2>
            <p style={pStyle}>
              Middleware that extracts the client auth token and attaches it to all downstream
              service calls, ensuring end-to-end authentication.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="javascript" code={`// Auth middleware: validate token and attach to request context
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // Validate token with auth service
    const user = await fetchService('user', '/auth/validate', token);
    req.user = user;
    req.serviceToken = token; // Forward to downstream calls
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Apply to all BFF routes
app.use('/api', authMiddleware);

// Token is available in route handlers
app.get('/api/mobile/dashboard', async (req, res) => {
  const [profile, orders] = await Promise.all([
    fetchService('user', \`/users/\${req.user.id}\`, req.serviceToken),
    fetchService('order', \`/orders?userId=\${req.user.id}\`, req.serviceToken)
  ]);
  res.json({ profile, recentOrders: orders.slice(0, 3) });
});`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Error Handling and Retry</h2>
            <p style={pStyle}>
              Implement retry with exponential backoff and circuit breaker logic to handle transient
              failures in downstream services.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="javascript" code={`// Retry with exponential backoff
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return res.json();
      if (res.status >= 400 && res.status < 500) {
        throw new Error(\`Client error \${res.status} - no retry\`);
      }
      throw new Error(\`Server error \${res.status}\`);
    } catch (err) {
      if (attempt === maxRetries || err.message.includes('no retry')) {
        throw err;
      }
      const delay = Math.pow(2, attempt) * 100; // 200, 400, 800ms
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

// Simple circuit breaker
class CircuitBreaker {
  constructor(threshold = 5, resetTimeMs = 30000) {
    this.failures = 0;
    this.threshold = threshold;
    this.resetTimeMs = resetTimeMs;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = 0;
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  onSuccess() { this.failures = 0; this.state = 'CLOSED'; }
  onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.resetTimeMs;
    }
  }
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Auth & Security Section */}
      {activeSection === 'auth-security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Token Relay: Forwarding JWT to Microservices</h2>
            <p style={pStyle}>
              The simplest auth pattern: the BFF receives a JWT from the client and forwards it to
              downstream microservices. Each service validates the token independently.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@Component
public class TokenRelayFilter implements WebFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String token = exchange.getRequest().getHeaders()
            .getFirst("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            // Store token in reactive context for downstream calls
            return chain.filter(exchange)
                .contextWrite(ctx -> ctx.put("AUTH_TOKEN", token));
        }
        return chain.filter(exchange);
    }
}

@Service
public class TokenRelayWebClient {

    private final WebClient.Builder webClientBuilder;

    // WebClient that automatically forwards the token
    public WebClient createRelayClient(String baseUrl) {
        return webClientBuilder
            .baseUrl(baseUrl)
            .filter((request, next) -> {
                return Mono.deferContextual(ctx -> {
                    String token = ctx.getOrDefault("AUTH_TOKEN", "");
                    var modified = ClientRequest.from(request)
                        .header("Authorization", token)
                        .build();
                    return next.exchange(modified);
                });
            })
            .build();
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>BFF as OAuth2 Confidential Client</h2>
            <p style={pStyle}>
              Instead of the SPA holding tokens (vulnerable to XSS), the BFF acts as an OAuth2 confidential
              client. It manages sessions via HTTP-only cookies and exchanges tokens with the auth server.
              This is significantly more secure for browser-based applications.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`// BFF holds client secret - never exposed to browser
// build.gradle: spring-boot-starter-oauth2-client

@Configuration
@EnableWebFluxSecurity
public class BFFSecurityConfig {

    @Bean
    public SecurityWebFilterChain securityFilterChain(ServerHttpSecurity http) {
        return http
            .oauth2Login(oauth2 -> oauth2
                .authorizationRequestResolver(customResolver())
            )
            .oauth2Client(Customizer.withDefaults())
            .csrf(csrf -> csrf
                .csrfTokenRepository(CookieServerCsrfTokenRepository.withHttpOnlyFalse())
            )
            .authorizeExchange(auth -> auth
                .pathMatchers("/api/public/**").permitAll()
                .anyExchange().authenticated()
            )
            .build();
    }
}

// application.yml
// spring:
//   security:
//     oauth2:
//       client:
//         registration:
//           bff-client:
//             client-id: web-bff
//             client-secret: \${BFF_CLIENT_SECRET}
//             scope: openid,profile,email
//             authorization-grant-type: authorization_code
//         provider:
//           bff-client:
//             issuer-uri: https://auth.example.com/realms/myapp

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @GetMapping("/me")
    public Mono<Map<String, Object>> currentUser(
            @AuthenticationPrincipal OidcUser user) {
        return Mono.just(Map.of(
            "name", user.getFullName(),
            "email", user.getEmail(),
            "roles", user.getAuthorities().stream()
                .map(Object::toString).toList()
        ));
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Token Exchange for Service-to-Service Calls</h2>
            <p style={pStyle}>
              The BFF exchanges the user session for service-specific tokens using OAuth2 Token Exchange (RFC 8693).
              This gives downstream services scoped tokens instead of the user's full access token.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@Service
public class TokenExchangeService {

    private final WebClient authClient;

    @Value("\${bff.client-id}")
    private String clientId;

    @Value("\${bff.client-secret}")
    private String clientSecret;

    /**
     * Exchange user token for a service-scoped token.
     * The downstream service receives a token with limited scope.
     */
    public Mono<String> exchangeForServiceToken(
            String userToken, String targetService) {
        return authClient.post()
            .uri("/oauth/token")
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .bodyValue(
                "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" +
                "&subject_token=" + userToken +
                "&subject_token_type=urn:ietf:params:oauth:token-type:access_token" +
                "&audience=" + targetService +
                "&client_id=" + clientId +
                "&client_secret=" + clientSecret
            )
            .retrieve()
            .bodyToMono(TokenResponse.class)
            .map(TokenResponse::accessToken);
    }
}

// Usage in BFF controller
@GetMapping("/orders")
public Mono<List<Order>> getOrders(@AuthenticationPrincipal JwtAuthenticationToken jwt) {
    return tokenExchangeService
        .exchangeForServiceToken(jwt.getToken().getTokenValue(), "order-service")
        .flatMap(serviceToken ->
            orderClient.get()
                .uri("/orders")
                .header("Authorization", "Bearer " + serviceToken)
                .retrieve()
                .bodyToFlux(Order.class)
                .collectList()
        );
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>CSRF Protection in BFF</h2>
            <p style={pStyle}>
              When the BFF manages sessions with cookies, CSRF protection is essential. The BFF issues
              a CSRF token that the frontend must include on state-changing requests.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@Configuration
public class CsrfConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf
                // Store CSRF token in a cookie readable by JS
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                // Ignore CSRF for webhook endpoints
                .ignoringRequestMatchers("/api/webhooks/**")
            )
            .build();
    }
}

// Frontend reads XSRF-TOKEN cookie and sends it as X-XSRF-TOKEN header:
//
// fetch('/api/orders', {
//   method: 'POST',
//   credentials: 'include',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
//   },
//   body: JSON.stringify(orderData)
// });`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Rate Limiting Per Client Type</h2>
            <p style={pStyle}>
              Apply different rate limits based on client type. Mobile clients may have stricter limits
              to protect battery and bandwidth, while admin tools may need higher throughput.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@Component
public class ClientTypeRateLimiter implements WebFilter {

    private final Map<String, RateLimiter> limiters = new ConcurrentHashMap<>();

    // Different limits per client
    private static final Map<String, Integer> LIMITS = Map.of(
        "mobile",  100,   // 100 req/min
        "web",     200,   // 200 req/min
        "admin",   500    // 500 req/min
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String clientType = exchange.getRequest().getHeaders()
            .getFirst("X-Client-Type");
        if (clientType == null) clientType = "web";

        int limit = LIMITS.getOrDefault(clientType, 100);
        RateLimiter limiter = limiters.computeIfAbsent(
            clientType,
            k -> RateLimiter.of(k, RateLimiterConfig.custom()
                .limitForPeriod(limit)
                .limitRefreshPeriod(Duration.ofMinutes(1))
                .timeoutDuration(Duration.ZERO)
                .build())
        );

        if (limiter.acquirePermission()) {
            return chain.filter(exchange);
        }
        exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
        return exchange.getResponse().setComplete();
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Request Validation and Sanitization</h2>
            <p style={pStyle}>
              The BFF validates and sanitizes all incoming requests before forwarding to microservices,
              acting as a security boundary.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@RestController
@RequestMapping("/api/web/orders")
public class OrderBFFController {

    @PostMapping
    public ResponseEntity<?> createOrder(@Valid @RequestBody CreateOrderRequest req) {
        // Jakarta Bean Validation runs first via @Valid
        // Then BFF applies additional business validation
        if (req.items().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Order must have at least one item"));
        }
        if (req.items().size() > 50) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Maximum 50 items per order"));
        }

        // Sanitize text fields before forwarding
        var sanitized = new ServiceOrderRequest(
            sanitize(req.shippingAddress()),
            sanitize(req.notes()),
            req.items().stream()
                .map(i -> new ServiceOrderItem(i.productId(), i.quantity()))
                .toList()
        );

        return ResponseEntity.ok(orderService.create(sanitized));
    }

    private String sanitize(String input) {
        if (input == null) return null;
        // Strip HTML tags and trim
        return input.replaceAll("<[^>]*>", "").trim();
    }
}

record CreateOrderRequest(
    @NotBlank String shippingAddress,
    String notes,
    @NotEmpty List<OrderItemRequest> items
) {}

record OrderItemRequest(
    @NotBlank String productId,
    @Min(1) @Max(100) int quantity
) {}`} />
            </div>
          </div>
        </div>
      )}

      {/* Caching Section */}
      {activeSection === 'caching' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Response Caching per Client Type</h2>
            <p style={pStyle}>
              Different clients have different freshness requirements. Mobile can cache aggressively
              to save bandwidth, while web dashboards need fresher data.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@RestController
@RequestMapping("/api/{clientType}/catalog")
public class CatalogBFFController {

    private final CatalogService catalogService;

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories(
            @PathVariable String clientType) {
        var categories = catalogService.getCategories();

        // Different cache durations per client type
        String cacheControl = switch (clientType) {
            case "mobile" -> "public, max-age=3600";   // 1 hour
            case "web"    -> "public, max-age=300";     // 5 minutes
            case "admin"  -> "no-cache";                // always fresh
            default       -> "public, max-age=600";
        };

        return ResponseEntity.ok()
            .header("Cache-Control", cacheControl)
            .header("Vary", "X-Client-Type, Authorization")
            .body(categories);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Object> getProduct(
            @PathVariable String clientType,
            @PathVariable String id) {
        var product = catalogService.getProduct(id);

        String cacheControl = switch (clientType) {
            case "mobile" -> "public, max-age=1800, stale-while-revalidate=3600";
            case "web"    -> "public, max-age=60, stale-while-revalidate=300";
            default       -> "no-store";
        };

        return ResponseEntity.ok()
            .header("Cache-Control", cacheControl)
            .header("ETag", product.version())
            .body(product);
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Redis Caching in BFF Layer</h2>
            <p style={pStyle}>
              Use Redis to cache aggregated responses at the BFF layer. This avoids redundant calls
              to multiple microservices for frequently requested data.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@Service
@CacheConfig(cacheNames = "bff-product-cache")
public class CachedProductAggregator {

    private final WebClient catalogClient;
    private final WebClient inventoryClient;
    private final WebClient reviewClient;

    @Cacheable(key = "'web-product-' + #productId",
               unless = "#result == null")
    public ProductPageDTO getProductPage(String productId) {
        // This entire aggregation result is cached
        var product = catalogClient.get()
            .uri("/products/{id}", productId)
            .retrieve().bodyToMono(Product.class).block();

        var stock = inventoryClient.get()
            .uri("/stock/{id}", productId)
            .retrieve().bodyToMono(StockInfo.class).block();

        var reviews = reviewClient.get()
            .uri("/reviews?productId={id}&limit=10", productId)
            .retrieve().bodyToFlux(Review.class).collectList().block();

        return new ProductPageDTO(product, stock, reviews);
    }

    @CacheEvict(key = "'web-product-' + #productId")
    public void evictProductCache(String productId) {
        // Called when product, inventory, or reviews change
    }
}

// Redis cache configuration
@Configuration
@EnableCaching
public class RedisCacheConfig {

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory factory) {
        var defaultConfig = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(5))
            .serializeValuesWith(
                SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer())
            );

        return RedisCacheManager.builder(factory)
            .cacheDefaults(defaultConfig)
            .withCacheConfiguration("bff-product-cache",
                defaultConfig.entryTtl(Duration.ofMinutes(10)))
            .build();
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Request Deduplication</h2>
            <p style={pStyle}>
              When multiple frontend components fire the same request simultaneously, the BFF
              deduplicates them into a single downstream call and shares the result.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@Component
public class RequestDeduplicator {

    // In-flight request cache: same key = same request in progress
    private final ConcurrentHashMap<String, CompletableFuture<?>> inFlight
        = new ConcurrentHashMap<>();

    @SuppressWarnings("unchecked")
    public <T> CompletableFuture<T> deduplicate(
            String key, Supplier<CompletableFuture<T>> requestSupplier) {

        return (CompletableFuture<T>) inFlight.computeIfAbsent(key, k -> {
            CompletableFuture<T> future = requestSupplier.get();
            // Remove from map when complete (success or failure)
            future.whenComplete((result, error) -> inFlight.remove(k));
            return future;
        });
    }
}

// Usage: multiple components request same user profile
@Service
public class ProfileService {

    private final RequestDeduplicator deduplicator;
    private final WebClient userClient;

    public CompletableFuture<UserProfile> getProfile(String userId) {
        return deduplicator.deduplicate(
            "user-profile-" + userId,
            () -> userClient.get()
                .uri("/users/{id}", userId)
                .retrieve()
                .bodyToMono(UserProfile.class)
                .toFuture()
        );
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Payload Optimization by Client</h2>
            <p style={pStyle}>
              Mobile clients receive compressed, minimal payloads while web clients get the full response.
              The BFF dynamically adjusts response format based on the requesting client.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@RestController
@RequestMapping("/api/products")
public class AdaptiveProductController {

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(
            @PathVariable String id,
            @RequestHeader(value = "X-Client-Type", defaultValue = "web") String clientType,
            @RequestHeader(value = "Accept-Encoding", required = false) String encoding) {

        var fullProduct = productService.getFullProduct(id);

        Object body = switch (clientType) {
            case "mobile" -> new MobileProduct(
                fullProduct.id(),
                fullProduct.name(),
                fullProduct.thumbnailUrl(),     // small image
                fullProduct.formattedPrice(),
                fullProduct.inStock()
            );
            case "tv" -> new TVProduct(
                fullProduct.id(),
                fullProduct.name(),
                fullProduct.heroImageUrl(),      // large hero image
                fullProduct.formattedPrice()
            );
            default -> fullProduct;              // full payload for web
        };

        var builder = ResponseEntity.ok()
            .header("Content-Type", "application/json");

        // Enable gzip for mobile to further reduce payload
        if ("mobile".equals(clientType) && encoding != null
                && encoding.contains("gzip")) {
            builder.header("Content-Encoding", "gzip");
        }

        return builder.body(body);
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>CDN Integration with BFF</h2>
            <p style={pStyle}>
              Place a CDN in front of the BFF for cacheable responses. The BFF sets appropriate
              cache headers and Vary headers to enable CDN caching per client type.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@Component
public class CDNCacheHeaderFilter implements WebFilter {

    // Paths that are CDN-cacheable
    private static final Set<String> CACHEABLE = Set.of(
        "/api/catalog", "/api/categories", "/api/featured"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            var path = exchange.getRequest().getPath().value();
            var headers = exchange.getResponse().getHeaders();

            if (CACHEABLE.stream().anyMatch(path::startsWith)) {
                // Tell CDN to cache, but vary by client type
                headers.set("Cache-Control", "public, max-age=300, s-maxage=600");
                headers.set("Vary", "X-Client-Type, Accept-Encoding");
                headers.set("CDN-Cache-Control", "max-age=600");
                // Surrogate key for targeted cache invalidation
                headers.set("Surrogate-Key", extractSurrogateKey(path));
            } else {
                // Dynamic content: no CDN caching
                headers.set("Cache-Control", "private, no-store");
            }
        }));
    }

    private String extractSurrogateKey(String path) {
        // /api/catalog/products/123 -> catalog products product-123
        return String.join(" ", path.split("/")).trim();
    }
}

// Invalidation: POST to CDN API when backend data changes
// curl -X POST https://cdn.example.com/purge
//   -H "Surrogate-Key: product-123"`} />
            </div>
          </div>
        </div>
      )}

      {/* Testing Section */}
      {activeSection === 'testing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Unit Testing BFF Aggregation Logic</h2>
            <p style={pStyle}>
              Test the BFF service layer in isolation by mocking downstream service clients.
              Focus on verifying correct aggregation and transformation logic.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@ExtendWith(MockitoExtension.class)
class DashboardAggregatorTest {

    @Mock WebClient userClient;
    @Mock WebClient orderClient;
    @Mock WebClient.RequestHeadersUriSpec<?> uriSpec;
    @Mock WebClient.ResponseSpec responseSpec;

    @InjectMocks DashboardAggregator aggregator;

    @Test
    void shouldAggregateDashboardData() {
        // Arrange
        var user = new UserProfile("u1", "Alice", "alice@test.com");
        var orders = List.of(
            new Order("o1", 99.99, "SHIPPED"),
            new Order("o2", 49.50, "DELIVERED")
        );

        when(userClient.get()).thenReturn(uriSpec);
        when(uriSpec.uri(anyString(), anyString())).thenReturn(uriSpec);
        when(uriSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(UserProfile.class))
            .thenReturn(Mono.just(user));

        when(orderClient.get()).thenReturn(uriSpec);
        when(responseSpec.bodyToFlux(Order.class))
            .thenReturn(Flux.fromIterable(orders));

        // Act
        var dashboard = aggregator.buildDashboard("u1").block();

        // Assert
        assertThat(dashboard.userName()).isEqualTo("Alice");
        assertThat(dashboard.recentOrders()).hasSize(2);
        assertThat(dashboard.totalSpent()).isEqualTo(149.49);
    }

    @Test
    void shouldReturnPartialDataWhenOrderServiceFails() {
        // Arrange
        setupUserClient(new UserProfile("u1", "Alice", "alice@test.com"));
        when(responseSpec.bodyToFlux(Order.class))
            .thenReturn(Flux.error(new WebClientResponseException(
                503, "Service Unavailable", null, null, null)));

        // Act
        var dashboard = aggregator.buildDashboard("u1").block();

        // Assert - graceful degradation
        assertThat(dashboard.userName()).isEqualTo("Alice");
        assertThat(dashboard.recentOrders()).isEmpty();
        assertThat(dashboard.orderServiceAvailable()).isFalse();
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Integration Testing with WireMock</h2>
            <p style={pStyle}>
              Use WireMock to simulate downstream microservices and test the BFF end-to-end,
              including HTTP client behavior, error handling, and response transformation.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWireMock(port = 0)
class ProductBFFIntegrationTest {

    @Autowired TestRestTemplate restTemplate;

    @Test
    void shouldAggregateProductFromMultipleServices() {
        // Stub catalog service
        stubFor(get(urlEqualTo("/products/p1"))
            .willReturn(aResponse()
                .withHeader("Content-Type", "application/json")
                .withBody("""
                    {"id":"p1","title":"Laptop","price":999.99,
                     "images":[{"type":"thumbnail","url":"/img/laptop-sm.jpg"}]}
                """)));

        // Stub inventory service
        stubFor(get(urlEqualTo("/stock/p1"))
            .willReturn(aResponse()
                .withHeader("Content-Type", "application/json")
                .withBody("""
                    {"productId":"p1","available":42,"warehouse":"US-EAST"}
                """)));

        // Stub review service
        stubFor(get(urlPathEqualTo("/reviews"))
            .withQueryParam("productId", equalTo("p1"))
            .willReturn(aResponse()
                .withHeader("Content-Type", "application/json")
                .withBody("""
                    [{"rating":5,"comment":"Great!","author":"Bob"}]
                """)));

        // Call the BFF endpoint
        var response = restTemplate.getForEntity(
            "/api/web/products/p1", WebProductDTO.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().name()).isEqualTo("Laptop");
        assertThat(response.getBody().inStock()).isTrue();
        assertThat(response.getBody().reviews()).hasSize(1);
    }

    @Test
    void shouldHandleDownstreamTimeout() {
        stubFor(get(urlEqualTo("/products/p2"))
            .willReturn(aResponse()
                .withFixedDelay(5000)  // 5s delay
                .withStatus(200)));

        var response = restTemplate.getForEntity(
            "/api/web/products/p2", Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.GATEWAY_TIMEOUT);
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Contract Testing with Pact</h2>
            <p style={pStyle}>
              The BFF is a consumer of microservice APIs. Use Pact to define and verify the contract
              between the BFF and each downstream service.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`// BFF as Pact Consumer - defines what it expects from Catalog Service
@ExtendWith(PactConsumerTestExt.class)
@PactTestFor(providerName = "CatalogService", port = "8083")
class CatalogServiceContractTest {

    @Pact(consumer = "WebBFF")
    public V4Pact getProductPact(PactDslWithProvider builder) {
        return builder
            .given("product p1 exists")
            .uponReceiving("a request for product p1")
                .path("/products/p1")
                .method("GET")
            .willRespondWith()
                .status(200)
                .headers(Map.of("Content-Type", "application/json"))
                .body(new PactDslJsonBody()
                    .stringType("id", "p1")
                    .stringType("title", "Test Product")
                    .numberType("price", 29.99)
                    .array("images")
                        .object()
                            .stringType("type", "thumbnail")
                            .stringType("url", "/img/test.jpg")
                        .closeObject()
                    .closeArray())
            .toPact(V4Pact.class);
    }

    @Test
    @PactTestFor(pactMethod = "getProductPact")
    void shouldParseProductResponse(MockServer mockServer) {
        var client = WebClient.create(mockServer.getUrl());
        var product = client.get()
            .uri("/products/p1")
            .retrieve()
            .bodyToMono(CatalogProduct.class)
            .block();

        assertThat(product.id()).isEqualTo("p1");
        assertThat(product.title()).isEqualTo("Test Product");
        assertThat(product.images()).isNotEmpty();
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Load Testing the BFF Layer</h2>
            <p style={pStyle}>
              The BFF is a critical aggregation point. Load test it to ensure it handles concurrent
              requests and downstream latency gracefully.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="javascript" code={`// k6 load test script for BFF endpoints
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },   // ramp up to 50 users
    { duration: '3m', target: 200 },  // ramp up to 200 users
    { duration: '2m', target: 200 },  // sustain 200 users
    { duration: '1m', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],    // less than 1% failure rate
  }
};

const BASE_URL = 'http://localhost:4000';
const TOKEN = 'test-bearer-token';

export default function () {
  // Test product aggregation endpoint
  const productRes = http.get(
    \`\${BASE_URL}/api/web/products/p1\`,
    { headers: { 'Authorization': \`Bearer \${TOKEN}\` } }
  );

  check(productRes, {
    'product status is 200': (r) => r.status === 200,
    'product has name': (r) => JSON.parse(r.body).name !== undefined,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Test dashboard aggregation
  const dashRes = http.get(
    \`\${BASE_URL}/api/web/dashboard\`,
    { headers: { 'Authorization': \`Bearer \${TOKEN}\` } }
  );

  check(dashRes, {
    'dashboard status is 200': (r) => r.status === 200,
    'has user data': (r) => JSON.parse(r.body).userName !== undefined,
  });

  sleep(1);
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>End-to-End Testing Through BFF</h2>
            <p style={pStyle}>
              E2E tests verify the full flow from frontend request through BFF to real (or containerized)
              microservices and back. Use Testcontainers for realistic environments.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class BFFEndToEndTest {

    @Container
    static GenericContainer<?> catalogService = new GenericContainer<>("catalog-service:latest")
        .withExposedPorts(8081);

    @Container
    static GenericContainer<?> orderService = new GenericContainer<>("order-service:latest")
        .withExposedPorts(8082);

    @DynamicPropertySource
    static void configureServiceUrls(DynamicPropertyRegistry registry) {
        registry.add("services.catalog.url", () ->
            "http://localhost:" + catalogService.getMappedPort(8081));
        registry.add("services.order.url", () ->
            "http://localhost:" + orderService.getMappedPort(8082));
    }

    @Autowired
    TestRestTemplate restTemplate;

    @Test
    void shouldReturnFullProductPageThroughBFF() {
        // Seed test data in catalog service
        restTemplate.postForEntity(
            "http://localhost:" + catalogService.getMappedPort(8081) + "/products",
            new CreateProduct("Test Product", 49.99), Void.class);

        // Call BFF
        var response = restTemplate.getForEntity(
            "/api/web/products/test-product-1", WebProductDTO.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().name()).isEqualTo("Test Product");
        assertThat(response.getBody().price()).isEqualTo("$49.99");
    }
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Real-World Section */}
      {activeSection === 'real-world' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>E-Commerce BFF: Product Page Aggregation</h2>
            <p style={pStyle}>
              A product page on an e-commerce site needs data from catalog, pricing, inventory, reviews,
              and recommendation services. The BFF orchestrates all of this into a single call for the frontend.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@RestController
@RequestMapping("/api/web/shop")
public class ECommerceWebBFF {

    private final WebClient catalogClient;
    private final WebClient pricingClient;
    private final WebClient inventoryClient;
    private final WebClient reviewClient;
    private final WebClient recClient;

    @GetMapping("/products/{slug}")
    public Mono<ProductPageDTO> getProductPage(@PathVariable String slug) {
        Mono<CatalogProduct> product = catalogClient.get()
            .uri("/catalog/products/{slug}", slug)
            .retrieve().bodyToMono(CatalogProduct.class);

        return product.flatMap(p -> {
            Mono<PricingInfo> price = pricingClient.get()
                .uri("/pricing/{sku}", p.sku())
                .retrieve().bodyToMono(PricingInfo.class)
                .onErrorReturn(new PricingInfo(p.sku(), null, "Unavailable"));

            Mono<StockLevel> stock = inventoryClient.get()
                .uri("/inventory/{sku}", p.sku())
                .retrieve().bodyToMono(StockLevel.class)
                .onErrorReturn(new StockLevel(p.sku(), 0, false));

            Mono<ReviewSummary> reviews = reviewClient.get()
                .uri("/reviews/summary?productId={id}", p.id())
                .retrieve().bodyToMono(ReviewSummary.class)
                .onErrorReturn(ReviewSummary.empty());

            Mono<List<Recommendation>> recs = recClient.get()
                .uri("/recommendations/{id}?limit=8", p.id())
                .retrieve().bodyToFlux(Recommendation.class).collectList()
                .onErrorReturn(List.of());

            return Mono.zip(price, stock, reviews, recs)
                .map(tuple -> new ProductPageDTO(
                    p.name(), p.description(), p.images(),
                    tuple.getT1().displayPrice(),
                    tuple.getT1().originalPrice(),
                    tuple.getT2().available() > 0,
                    tuple.getT2().estimatedDelivery(),
                    tuple.getT3().averageRating(),
                    tuple.getT3().totalReviews(),
                    tuple.getT4()
                ));
        });
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Trading Platform: Mobile vs Web BFF</h2>
            <p style={pStyle}>
              A trading platform where mobile shows a portfolio summary with key metrics, while the
              web dashboard shows detailed analytics, charts data, and full position history &mdash;
              both consuming the same underlying services.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`// Mobile BFF - compact portfolio overview
@RestController
@RequestMapping("/api/mobile/portfolio")
public class MobilePortfolioBFF {

    @GetMapping
    public MobilePortfolioDTO getPortfolio(@RequestHeader("X-User-Id") String userId) {
        var positions = portfolioService.getPositions(userId);
        var marketData = marketService.getCurrentPrices(
            positions.stream().map(Position::ticker).toList()
        );

        double totalValue = positions.stream()
            .mapToDouble(p -> p.shares() * marketData.get(p.ticker()).price())
            .sum();
        double totalGain = positions.stream()
            .mapToDouble(p -> (marketData.get(p.ticker()).price() - p.avgCost()) * p.shares())
            .sum();

        return new MobilePortfolioDTO(
            formatCurrency(totalValue),
            formatPercent(totalGain / (totalValue - totalGain)),
            totalGain >= 0 ? "up" : "down",
            positions.size()
        );
    }
}

// Web BFF - detailed analytics dashboard
@RestController
@RequestMapping("/api/web/portfolio")
public class WebPortfolioBFF {

    @GetMapping
    public WebPortfolioDTO getPortfolio(@RequestHeader("X-User-Id") String userId) {
        var positions = portfolioService.getPositions(userId);
        var marketData = marketService.getCurrentPrices(
            positions.stream().map(Position::ticker).toList()
        );
        var history = analyticsService.getPerformanceHistory(userId, 90);
        var dividends = incomeService.getDividendSchedule(userId);
        var sectorAllocation = analyticsService.getSectorBreakdown(userId);

        return new WebPortfolioDTO(
            positions.stream().map(p -> toDetailedPosition(p, marketData)).toList(),
            history,            // 90-day chart data points
            dividends,          // upcoming dividend calendar
            sectorAllocation,   // pie chart data
            calculateMetrics(positions, marketData)  // Sharpe ratio, beta, etc.
        );
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Netflix-Style BFF: Device-Specific Experiences</h2>
            <p style={pStyle}>
              Different devices need fundamentally different data: TV needs large artwork and simplified
              navigation, phone needs compact cards, and browser needs full metadata. Each gets a tailored BFF.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`// TV BFF - large artwork, minimal text, simple navigation
@RestController
@RequestMapping("/api/tv/browse")
public class TVBrowseBFF {

    @GetMapping("/home")
    public TVHomeScreen getHomeScreen(@RequestHeader("X-User-Id") String userId) {
        var continueWatching = watchService.getContinueWatching(userId, 6);
        var rows = catalogService.getPersonalizedRows(userId, 5);

        return new TVHomeScreen(
            continueWatching.stream()
                .map(w -> new TVCard(
                    w.titleId(), w.title(),
                    w.landscapeArtwork16x9(),  // large landscape image for TV
                    w.progressPercent()
                )).toList(),
            rows.stream()
                .map(r -> new TVRow(r.title(), r.items().stream()
                    .map(i -> new TVCard(i.id(), i.title(),
                        i.landscapeArtwork16x9(), null))
                    .limit(8)    // TV rows show max 8 items
                    .toList()
                )).toList()
        );
    }
}

// Phone BFF - compact portrait cards, vertical scroll
@RestController
@RequestMapping("/api/phone/browse")
public class PhoneBrowseBFF {

    @GetMapping("/home")
    public PhoneHomeScreen getHomeScreen(@RequestHeader("X-User-Id") String userId) {
        var continueWatching = watchService.getContinueWatching(userId, 10);
        var rows = catalogService.getPersonalizedRows(userId, 8);

        return new PhoneHomeScreen(
            continueWatching.stream()
                .map(w -> new PhoneCard(
                    w.titleId(), w.title(),
                    w.portraitArtwork2x3(),     // portrait image for phone
                    w.progressPercent(),
                    w.durationLeft()            // "23 min left"
                )).toList(),
            rows.stream()
                .map(r -> new PhoneRow(r.title(), r.items().stream()
                    .map(i -> new PhoneCard(i.id(), i.title(),
                        i.portraitArtwork2x3(), null, null))
                    .limit(15)  // phone rows can scroll further
                    .toList()
                )).toList()
        );
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Migration: Monolith to BFF to Microservices</h2>
            <p style={pStyle}>
              Use the BFF as a strangler fig pattern to incrementally extract microservices from a monolith.
              The BFF routes some calls to the monolith and others to new microservices.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@Service
public class HybridProductService {

    private final WebClient monolithClient;     // legacy monolith
    private final WebClient catalogMicroservice; // new microservice

    @Value("\${feature.use-new-catalog:false}")
    private boolean useNewCatalog;

    /**
     * Route to new microservice or legacy monolith based on feature flag.
     * This allows gradual migration without big-bang cutover.
     */
    public Mono<Product> getProduct(String id) {
        if (useNewCatalog) {
            return catalogMicroservice.get()
                .uri("/v2/products/{id}", id)
                .retrieve()
                .bodyToMono(Product.class)
                .onErrorResume(ex -> {
                    // Fallback to monolith if new service fails
                    log.warn("New catalog failed, falling back to monolith", ex);
                    return getFromMonolith(id);
                });
        }
        return getFromMonolith(id);
    }

    private Mono<Product> getFromMonolith(String id) {
        return monolithClient.get()
            .uri("/api/legacy/products/{id}", id)
            .retrieve()
            .bodyToMono(LegacyProduct.class)
            .map(this::convertLegacyToNew);  // normalize to new DTO
    }

    private Product convertLegacyToNew(LegacyProduct legacy) {
        return new Product(
            legacy.getProductCode(),
            legacy.getProductName(),
            legacy.getDesc(),
            legacy.getRetailPriceWithTax()
        );
    }
}`} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Multi-Tenant BFF</h2>
            <p style={pStyle}>
              Different tenant types get different BFF behavior: enterprise tenants get rich analytics,
              free-tier tenants get basic data, and white-label tenants get customized branding responses.
            </p>
            <div style={codeBlockStyle}>
              <SyntaxHighlighter language="java" code={`@RestController
@RequestMapping("/api/dashboard")
public class MultiTenantBFFController {

    private final TenantService tenantService;
    private final AnalyticsService analyticsService;
    private final BrandingService brandingService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboard(
            @RequestHeader("X-Tenant-Id") String tenantId,
            @RequestHeader("X-User-Id") String userId) {

        var tenant = tenantService.getTenant(tenantId);
        var dashboard = new LinkedHashMap<String, Object>();

        // Base data for all tenants
        dashboard.put("summary", getSummary(userId));

        // Enterprise tenants get advanced analytics
        if (tenant.plan() == Plan.ENTERPRISE) {
            dashboard.put("analytics", analyticsService.getAdvancedAnalytics(tenantId));
            dashboard.put("customReports", analyticsService.getCustomReports(tenantId));
            dashboard.put("teamMetrics", analyticsService.getTeamPerformance(tenantId));
        }

        // Pro tenants get basic analytics
        if (tenant.plan() == Plan.PRO || tenant.plan() == Plan.ENTERPRISE) {
            dashboard.put("charts", analyticsService.getBasicCharts(tenantId));
            dashboard.put("exportEnabled", true);
        }

        // White-label tenants get custom branding
        if (tenant.isWhiteLabel()) {
            dashboard.put("branding", brandingService.getBranding(tenantId));
            dashboard.put("customDomain", tenant.customDomain());
        }

        return ResponseEntity.ok(dashboard);
    }
}`} />
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}

export default BFF

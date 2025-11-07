import { useState, useEffect, useRef } from 'react'
import { useModalFocus } from '../../hooks/useModalFocus'

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Store protected content with placeholders
    const protectedContent = []
    let placeholder = 0

    // Protect comments first
    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting to remaining code
    highlighted = highlighted
      // Keywords - purple
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')

      // Boolean and primitives - blue
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')

      // Types and classes - light green
      .replace(/\b(String|List|ArrayList|LinkedList|HashMap|TreeMap|HashSet|TreeSet|Map|Set|Queue|Deque|Collection|Arrays|Collections|Thread|Runnable|Executor|ExecutorService|CompletableFuture|Stream|Optional|Path|Files|Pattern|Matcher|StringBuilder|StringBuffer|Integer|Double|Float|Long|Short|Byte|Character|Boolean|Object|System|Math|Scanner|BufferedReader|FileReader|FileWriter|PrintWriter|InputStream|OutputStream|Exception|RuntimeException|IOException|SQLException|WeakReference|SoftReference|PhantomReference|ReferenceQueue)\b/g, '<span style="color: #4ec9b0;">$1</span>')

      // Annotations - yellow
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

      // Numbers - light green
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')

      // Method calls - yellow
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    // Restore protected content
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

function MicroservicePatterns({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  // Comprehensive modal focus management
  const { modalRef, firstFocusableRef } = useModalFocus(onBack)

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentContent = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.includes('// ═══════════════════════════════════════════════════════════════════════════')) {
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentContent.join('\n')
          })
          currentContent = []
        }

        if (i + 1 < lines.length && lines[i + 1].includes('// ✦')) {
          currentSection = lines[i + 1].replace('// ✦', '').trim()
          i += 2
          continue
        }
      }

      if (currentSection) {
        currentContent.push(line)
      }
    }

    if (currentSection && currentContent.length > 0) {
      sections.push({
        title: currentSection,
        code: currentContent.join('\n')
      })
    }

    return sections
  }

  const microservicePatterns = [
    {
      name: 'API Gateway',
      icon: '🚪',
      explanation: `Single entry point for all client requests that routes to appropriate microservices. Handles cross-cutting concerns like authentication, authorization, rate limiting, request/response transformation, and protocol translation. Reduces client complexity by providing unified interface and aggregating responses from multiple services. Essential for microservices architectures to simplify client communication.

Key Benefits:
• Single entry point for all clients (mobile, web, third-party)
• Centralized authentication and authorization
• Request routing and load balancing
• Response aggregation (Backend for Frontend pattern)
• Protocol translation (REST to gRPC)
• Rate limiting and throttling
• Request/response transformation
• SSL termination and security enforcement

Technologies: Kong, NGINX, AWS API Gateway, Azure API Management, Spring Cloud Gateway, Netflix Zuul, Istio/Envoy service mesh integration.`,
      diagram: () => (
        <svg viewBox="0 0 700 400" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="apiGatewayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="serviceBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>
          <rect x="50" y="20" width="100" height="50" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <text x="100" y="50" fontSize="14" fontWeight="600" fill="#6366f1" textAnchor="middle">Mobile</text>
          <rect x="200" y="20" width="100" height="50" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <text x="250" y="50" fontSize="14" fontWeight="600" fill="#6366f1" textAnchor="middle">Web</text>
          <rect x="350" y="20" width="100" height="50" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <text x="400" y="50" fontSize="14" fontWeight="600" fill="#6366f1" textAnchor="middle">Desktop</text>
          <rect x="150" y="130" width="200" height="80" rx="12" fill="url(#apiGatewayGrad)" stroke="#4f46e5" strokeWidth="3" />
          <text x="250" y="165" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">API Gateway</text>
          <text x="250" y="190" fontSize="12" fill="white" opacity="0.9" textAnchor="middle">Route • Auth • Rate Limit</text>
          <line x1="100" y1="70" x2="200" y2="130" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow1)" />
          <line x1="250" y1="70" x2="250" y2="130" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow1)" />
          <line x1="400" y1="70" x2="300" y2="130" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow1)" />
          <rect x="50" y="280" width="120" height="60" rx="8" fill="url(#serviceBoxGrad)" />
          <text x="110" y="310" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">User Service</text>
          <rect x="210" y="280" width="120" height="60" rx="8" fill="url(#serviceBoxGrad)" />
          <text x="270" y="310" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">Order Service</text>
          <rect x="370" y="280" width="130" height="60" rx="8" fill="url(#serviceBoxGrad)" />
          <text x="435" y="305" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Payment</text>
          <text x="435" y="325" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Service</text>
          <line x1="200" y1="210" x2="110" y2="280" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow1)" />
          <line x1="250" y1="210" x2="270" y2="280" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow1)" />
          <line x1="300" y1="210" x2="435" y2="280" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow1)" />
          <text x="250" y="380" fontSize="12" fill="#6b7280" textAnchor="middle" fontStyle="italic">
            Single entry point routing to multiple microservices
          </text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Spring Cloud Gateway Configuration
// ═══════════════════════════════════════════════════════════════════════════

// API Gateway with Spring Cloud Gateway
@SpringBootApplication
public class ApiGatewayApplication {
  public static void main(String[] args) {
    SpringApplication.run(ApiGatewayApplication.class, args);
  }
}

// application.yml - Gateway routing configuration
/*
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/api/users/**
          filters:
            - RewritePath=/api/users/(?<segment>.*), /\${segment}

        - id: order-service
          uri: lb://ORDER-SERVICE
          predicates:
            - Path=/api/orders/**
          filters:
            - AddRequestHeader=X-Service, order-service
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Custom Filters and Authentication
// ═══════════════════════════════════════════════════════════════════════════

// Custom authentication filter
@Component
public class AuthenticationFilter implements GatewayFilter {

  @Autowired
  private JwtUtil jwtUtil;

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    ServerHttpRequest request = exchange.getRequest();

    if (!request.getHeaders().containsKey("Authorization")) {
      throw new RuntimeException("Missing authorization header");
    }

    String token = request.getHeaders().get("Authorization").get(0);
    if (token != null && token.startsWith("Bearer ")) {
      token = token.substring(7);
    }

    try {
      jwtUtil.validateToken(token);
    } catch (Exception e) {
      throw new RuntimeException("Invalid token");
    }

    return chain.filter(exchange);
  }
}
// Output: Validates JWT token before routing to services

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Rate Limiting and Circuit Breaker
// ═══════════════════════════════════════════════════════════════════════════

// Rate limiting filter
@Configuration
public class GatewayConfig {

  @Bean
  public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
    return builder.routes()
      .route("rate_limited_route", r -> r.path("/api/public/**")
        .filters(f -> f
          .requestRateLimiter(config -> config
            .setRateLimiter(redisRateLimiter())
            .setKeyResolver(userKeyResolver()))
          .circuitBreaker(config -> config
            .setName("myCircuitBreaker")
            .setFallbackUri("/fallback/public")))
        .uri("lb://PUBLIC-SERVICE"))
      .build();
  }

  @Bean
  public RedisRateLimiter redisRateLimiter() {
    return new RedisRateLimiter(10, 20); // 10 requests per second, burst 20
  }

  @Bean
  public KeyResolver userKeyResolver() {
    return exchange -> Mono.just(
      exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Request Aggregation Pattern
// ═══════════════════════════════════════════════════════════════════════════

// Backend for Frontend - Aggregate responses
@RestController
@RequestMapping("/api/aggregate")
public class AggregationController {

  @Autowired
  private WebClient.Builder webClientBuilder;

  @GetMapping("/user-profile/{userId}")
  public Mono<UserProfile> getUserProfile(@PathVariable String userId) {
    Mono<User> userMono = webClientBuilder.build()
      .get()
      .uri("http://USER-SERVICE/users/" + userId)
      .retrieve()
      .bodyToMono(User.class);

    Mono<List<Order>> ordersMono = webClientBuilder.build()
      .get()
      .uri("http://ORDER-SERVICE/orders?userId=" + userId)
      .retrieve()
      .bodyToFlux(Order.class)
      .collectList();

    Mono<Preferences> prefsMono = webClientBuilder.build()
      .get()
      .uri("http://PREFS-SERVICE/preferences/" + userId)
      .retrieve()
      .bodyToMono(Preferences.class);

    return Mono.zip(userMono, ordersMono, prefsMono)
      .map(tuple -> new UserProfile(
        tuple.getT1(),
        tuple.getT2(),
        tuple.getT3()
      ));
  }
}
// Output: Single response with user, orders, and preferences data`
    },
    {
      name: 'Circuit Breaker',
      icon: '🔌',
      explanation: `Prevents cascading failures by monitoring service calls and stopping requests to failing services. Implements three states: Closed (normal operation), Open (failing fast), and Half-Open (testing recovery). Provides fallback mechanisms for graceful degradation when services are unavailable. Essential for building resilient microservices that handle failures gracefully.

Circuit States:
• Closed: Normal operation, all requests pass through
• Open: Threshold exceeded, fail fast without calling service (return fallback)
• Half-Open: After timeout, test if service recovered with limited requests

Key Features:
• Failure detection and threshold monitoring
• Automatic state transitions
• Fallback mechanisms (cached data, default responses)
• Health checks and automatic recovery
• Metrics and monitoring integration
• Prevent cascading failures across services

Implementation: Resilience4j, Spring Cloud Circuit Breaker, Istio/Envoy service mesh, Netflix Hystrix (deprecated).`,
      diagram: () => (
        <svg viewBox="0 0 700 450" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="closedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="openGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="halfOpenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#6b7280" />
            </marker>
          </defs>
          <rect x="50" y="50" width="150" height="100" rx="12" fill="url(#closedGrad)" stroke="#059669" strokeWidth="3" />
          <text x="125" y="85" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">CLOSED</text>
          <text x="125" y="110" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Normal Operation</text>
          <text x="125" y="130" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Requests Pass</text>
          <rect x="275" y="50" width="150" height="100" rx="12" fill="url(#openGrad)" stroke="#dc2626" strokeWidth="3" />
          <text x="350" y="85" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">OPEN</text>
          <text x="350" y="110" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Failures Detected</text>
          <text x="350" y="130" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Fail Fast</text>
          <rect x="162" y="250" width="150" height="100" rx="12" fill="url(#halfOpenGrad)" stroke="#d97706" strokeWidth="3" />
          <text x="237" y="285" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">HALF-OPEN</text>
          <text x="237" y="310" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Testing Recovery</text>
          <text x="237" y="330" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Limited Requests</text>
          <line x1="200" y1="100" x2="275" y2="100" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow2)" />
          <text x="237" y="90" fontSize="10" fill="#374151" textAnchor="middle">Threshold</text>
          <text x="237" y="105" fontSize="10" fill="#374151" textAnchor="middle">Exceeded</text>
          <line x1="350" y1="150" x2="280" y2="250" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow2)" />
          <text x="330" y="210" fontSize="10" fill="#374151" textAnchor="middle">After</text>
          <text x="330" y="225" fontSize="10" fill="#374151" textAnchor="middle">Timeout</text>
          <line x1="190" y1="300" x2="125" y2="150" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow2)" />
          <text x="140" y="220" fontSize="10" fill="#374151" textAnchor="middle">Success</text>
          <line x1="284" y1="300" x2="350" y2="150" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow2)" />
          <text x="335" y="220" fontSize="10" fill="#374151" textAnchor="middle">Failure</text>
          <text x="237" y="420" fontSize="12" fill="#6b7280" textAnchor="middle" fontStyle="italic">
            Circuit Breaker State Machine - Prevents Cascading Failures
          </text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Resilience4j Circuit Breaker Setup
// ═══════════════════════════════════════════════════════════════════════════

// Add Resilience4j dependency
/*
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-circuitbreaker-resilience4j</artifactId>
</dependency>
*/

// application.yml - Circuit breaker configuration
/*
resilience4j:
  circuitbreaker:
    instances:
      paymentService:
        registerHealthIndicator: true
        slidingWindowSize: 10
        minimumNumberOfCalls: 5
        permittedNumberOfCallsInHalfOpenState: 3
        waitDurationInOpenState: 10s
        failureRateThreshold: 50
        slowCallRateThreshold: 50
        slowCallDurationThreshold: 2s
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Circuit Breaker with Fallback
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class PaymentService {

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private CircuitBreakerFactory circuitBreakerFactory;

  public PaymentResponse processPayment(PaymentRequest request) {
    CircuitBreaker circuitBreaker = circuitBreakerFactory.create("paymentService");

    return circuitBreaker.run(
      () -> {
        // Call external payment service
        return restTemplate.postForObject(
          "http://PAYMENT-SERVICE/api/payments",
          request,
          PaymentResponse.class
        );
      },
      throwable -> {
        // Fallback method
        System.out.println("Circuit breaker activated, using fallback");
        return getPaymentFallback(request);
      }
    );
  }

  private PaymentResponse getPaymentFallback(PaymentRequest request) {
    PaymentResponse fallback = new PaymentResponse();
    fallback.setStatus("PENDING");
    fallback.setMessage("Payment service temporarily unavailable. Request queued.");
    fallback.setTransactionId("FALLBACK-" + UUID.randomUUID());
    return fallback;
  }
}
// Output: Returns fallback when payment service fails

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Annotation-Based Circuit Breaker
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class OrderService {

  @Autowired
  private RestTemplate restTemplate;

  @CircuitBreaker(name = "orderService", fallbackMethod = "getOrderFallback")
  @Retry(name = "orderService")
  @TimeLimiter(name = "orderService")
  public CompletableFuture<Order> getOrder(Long orderId) {
    return CompletableFuture.supplyAsync(() ->
      restTemplate.getForObject(
        "http://ORDER-SERVICE/orders/" + orderId,
        Order.class
      )
    );
  }

  private CompletableFuture<Order> getOrderFallback(Long orderId, Exception ex) {
    System.out.println("Circuit breaker fallback for order: " + orderId);
    Order fallbackOrder = new Order();
    fallbackOrder.setId(orderId);
    fallbackOrder.setStatus("UNAVAILABLE");
    return CompletableFuture.completedFuture(fallbackOrder);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Circuit Breaker Events and Monitoring
// ═══════════════════════════════════════════════════════════════════════════

@Component
public class CircuitBreakerEventListener {

  @EventListener
  public void onCircuitBreakerEvent(CircuitBreakerOnStateTransitionEvent event) {
    System.out.println("Circuit Breaker State Transition: " +
      event.getStateTransition().getFromState() + " -> " +
      event.getStateTransition().getToState());

    // Send alert when circuit opens
    if (event.getStateTransition().getToState() == CircuitBreaker.State.OPEN) {
      alertService.sendAlert("Circuit breaker opened for: " +
        event.getCircuitBreakerName());
    }
  }

  @EventListener
  public void onCircuitBreakerError(CircuitBreakerOnErrorEvent event) {
    System.out.println("Circuit Breaker Error: " +
      event.getThrowable().getMessage());
    metricsService.incrementErrorCount(event.getCircuitBreakerName());
  }
}

// Actuator endpoint for circuit breaker status
// GET /actuator/circuitbreakers
/*
{
  "circuitBreakers": {
    "paymentService": {
      "state": "CLOSED",
      "failureRate": "10.0%",
      "slowCallRate": "5.0%",
      "bufferedCalls": 10,
      "failedCalls": 1
    }
  }
}
*/`
    },
    {
      name: 'Service Discovery',
      icon: '🔍',
      explanation: `Enables automatic detection and location of service instances in a microservices architecture. Services register themselves with a central registry on startup and deregister on shutdown. Clients query the registry to find available service instances, enabling dynamic scaling and load balancing. Essential for cloud-native applications where service instances are constantly changing.

Discovery Patterns:
• Client-Side Discovery: Client queries registry and selects instance (Netflix Eureka, Ribbon)
• Server-Side Discovery: Load balancer queries registry and routes (AWS ELB, Kubernetes Service)
• Service Mesh: Platform-level discovery with sidecar proxies (Istio, Linkerd)

Key Features:
• Dynamic service registration and deregistration
• Health checks and automatic instance removal
• Load balancing across service instances
• Metadata and versioning support
• Multi-datacenter awareness
• Integration with service mesh

Technologies: Netflix Eureka, Consul, etcd, ZooKeeper, Kubernetes Service Discovery, AWS Cloud Map.`,
      diagram: () => (
        <svg viewBox="0 0 800 450" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="registryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="serviceInstGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>
          <rect x="300" y="20" width="200" height="80" rx="12" fill="url(#registryGrad)" stroke="#4f46e5" strokeWidth="3" />
          <text x="400" y="55" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">Service Registry</text>
          <text x="400" y="80" fontSize="12" fill="white" opacity="0.9" textAnchor="middle">Eureka • Consul</text>
          <rect x="50" y="180" width="140" height="70" rx="8" fill="url(#serviceInstGrad)" stroke="#6366f1" strokeWidth="2" />
          <text x="120" y="210" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">Service A</text>
          <text x="120" y="230" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Instance 1</text>
          <rect x="220" y="180" width="140" height="70" rx="8" fill="url(#serviceInstGrad)" stroke="#6366f1" strokeWidth="2" />
          <text x="290" y="210" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">Service A</text>
          <text x="290" y="230" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Instance 2</text>
          <rect x="440" y="180" width="140" height="70" rx="8" fill="url(#serviceInstGrad)" stroke="#6366f1" strokeWidth="2" />
          <text x="510" y="210" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">Service B</text>
          <text x="510" y="230" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Instance 1</text>
          <rect x="610" y="180" width="140" height="70" rx="8" fill="url(#serviceInstGrad)" stroke="#6366f1" strokeWidth="2" />
          <text x="680" y="210" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">Service B</text>
          <text x="680" y="230" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Instance 2</text>
          <line x1="120" y1="180" x2="350" y2="100" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow3)" />
          <text x="200" y="135" fontSize="10" fill="#10b981" fontWeight="600">Register</text>
          <line x1="290" y1="180" x2="380" y2="100" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow3)" />
          <line x1="510" y1="180" x2="420" y2="100" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow3)" />
          <line x1="680" y1="180" x2="450" y2="100" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow3)" />
          <rect x="320" y="330" width="160" height="70" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <text x="400" y="360" fontSize="15" fontWeight="600" fill="#6366f1" textAnchor="middle">Client Service</text>
          <text x="400" y="380" fontSize="11" fill="#6b7280" textAnchor="middle">Query Registry</text>
          <line x1="400" y1="100" x2="400" y2="330" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow3)" />
          <text x="420" y="220" fontSize="10" fill="#f59e0b" fontWeight="600">Discover</text>
          <text x="400" y="430" fontSize="12" fill="#6b7280" textAnchor="middle" fontStyle="italic">
            Service Registry with Dynamic Registration and Discovery
          </text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Eureka Server Setup
// ═══════════════════════════════════════════════════════════════════════════

// Eureka Server
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
  public static void main(String[] args) {
    SpringApplication.run(EurekaServerApplication.class, args);
  }
}

// application.yml - Eureka Server config
/*
server:
  port: 8761

eureka:
  client:
    registerWithEureka: false
    fetchRegistry: false
  server:
    enableSelfPreservation: false
*/
// Output: Eureka dashboard at http://localhost:8761

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Service Registration (Client)
// ═══════════════════════════════════════════════════════════════════════════

// Service registration with Eureka
@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
  public static void main(String[] args) {
    SpringApplication.run(UserServiceApplication.class, args);
  }
}

// application.yml - Service registration config
/*
spring:
  application:
    name: USER-SERVICE

eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
    registerWithEureka: true
    fetchRegistry: true
  instance:
    hostname: localhost
    preferIpAddress: true
    leaseRenewalIntervalInSeconds: 10
    leaseExpirationDurationInSeconds: 30
    metadataMap:
      version: 1.0
      environment: production
*/
// Output: USER-SERVICE registered with Eureka

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Service Discovery and Load Balancing
// ═══════════════════════════════════════════════════════════════════════════

// Client-side load balancing with Spring Cloud LoadBalancer
@Configuration
public class LoadBalancerConfig {

  @Bean
  @LoadBalanced
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }

  @Bean
  @LoadBalanced
  public WebClient.Builder webClientBuilder() {
    return WebClient.builder();
  }
}

@Service
public class OrderService {

  @Autowired
  private RestTemplate restTemplate;

  public User getUserById(Long userId) {
    // Service name instead of hostname:port
    // LoadBalancer automatically discovers instances
    return restTemplate.getForObject(
      "http://USER-SERVICE/api/users/" + userId,
      User.class
    );
  }
}
// Output: Automatically discovers and load balances across USER-SERVICE instances

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Health Checks and Custom Metadata
// ═══════════════════════════════════════════════════════════════════════════

// Custom health check
@Component
public class CustomHealthCheck implements HealthIndicator {

  @Override
  public Health health() {
    boolean databaseUp = checkDatabaseConnection();
    boolean cacheUp = checkCacheConnection();

    if (databaseUp && cacheUp) {
      return Health.up()
        .withDetail("database", "connected")
        .withDetail("cache", "connected")
        .build();
    }
    return Health.down()
      .withDetail("database", databaseUp ? "connected" : "down")
      .withDetail("cache", cacheUp ? "connected" : "down")
      .build();
  }

  private boolean checkDatabaseConnection() {
    return true; // Check database
  }

  private boolean checkCacheConnection() {
    return true; // Check cache
  }
}

// Programmatic instance metadata
@Component
public class EurekaInstanceConfigurer {

  @Autowired
  private EurekaInstanceConfig eurekaInstanceConfig;

  @PostConstruct
  public void addMetadata() {
    Map<String, String> metadata = eurekaInstanceConfig.getMetadataMap();
    metadata.put("region", "us-east-1");
    metadata.put("zone", "us-east-1a");
    metadata.put("capabilities", "payments,notifications");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Discovery Client API
// ═══════════════════════════════════════════════════════════════════════════

// Using DiscoveryClient API directly
@Service
public class ServiceDiscoveryHelper {

  @Autowired
  private DiscoveryClient discoveryClient;

  public List<String> getAvailableServices() {
    return discoveryClient.getServices();
  }

  public List<ServiceInstance> getInstances(String serviceName) {
    return discoveryClient.getInstances(serviceName);
  }

  public void printServiceInfo(String serviceName) {
    List<ServiceInstance> instances = discoveryClient.getInstances(serviceName);

    for (ServiceInstance instance : instances) {
      System.out.println("Service ID: " + instance.getServiceId());
      System.out.println("Host: " + instance.getHost());
      System.out.println("Port: " + instance.getPort());
      System.out.println("URI: " + instance.getUri());
      System.out.println("Metadata: " + instance.getMetadata());
      System.out.println("---");
    }
  }
}
// Output: Lists all registered service instances with details`
    },
    {
      name: 'Saga Pattern',
      icon: '🔄',
      explanation: `Manages distributed transactions across multiple microservices using a sequence of local transactions with compensating actions. Unlike traditional two-phase commit, sagas provide eventual consistency through either orchestration (centralized coordinator) or choreography (event-driven). Essential for complex business processes that span multiple services like order processing, payment, inventory, and shipping.

Saga Types:
• Orchestration-Based: Central coordinator (Saga Execution Coordinator) manages the workflow
• Choreography-Based: Services coordinate through events, no central controller

Compensating Transactions:
• Semantic undo operations (not ACID rollback)
• RefundPayment compensates ChargePayment
• CancelReservation compensates ReserveInventory
• Must be idempotent and handle partial failures

Use Cases: E-commerce checkout, travel booking, financial transactions, order fulfillment, multi-step workflows.

Technologies: Axon Framework, Eventuate, Camunda, Apache Camel, Spring Cloud, custom implementations.`,
      diagram: () => (
        <svg viewBox="0 0 750 450" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="sagaOrcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="sagaStepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrow4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
            </marker>
            <marker id="arrowComp" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
            </marker>
          </defs>
          <text x="375" y="30" fontSize="16" fontWeight="bold" fill="#6366f1" textAnchor="middle">Orchestration-Based Saga</text>
          <rect x="280" y="50" width="190" height="70" rx="10" fill="url(#sagaOrcGrad)" stroke="#4f46e5" strokeWidth="2" />
          <text x="375" y="80" fontSize="15" fontWeight="bold" fill="white" textAnchor="middle">Saga Coordinator</text>
          <text x="375" y="100" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Controls Workflow</text>
          <rect x="50" y="200" width="130" height="60" rx="8" fill="url(#sagaStepGrad)" />
          <text x="115" y="225" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Reserve</text>
          <text x="115" y="245" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Inventory</text>
          <rect x="220" y="200" width="130" height="60" rx="8" fill="url(#sagaStepGrad)" />
          <text x="285" y="225" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Process</text>
          <text x="285" y="245" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Payment</text>
          <rect x="390" y="200" width="130" height="60" rx="8" fill="url(#sagaStepGrad)" />
          <text x="455" y="225" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Schedule</text>
          <text x="455" y="245" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Shipping</text>
          <rect x="560" y="200" width="130" height="60" rx="8" fill="url(#sagaStepGrad)" />
          <text x="625" y="230" fontSize="13" fontWeight="600" fill="white" textAnchor="middle">Complete</text>
          <line x1="320" y1="120" x2="115" y2="200" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow4)" />
          <line x1="360" y1="120" x2="285" y2="200" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow4)" />
          <line x1="400" y1="120" x2="455" y2="200" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow4)" />
          <line x1="440" y1="120" x2="625" y2="200" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow4)" />
          <text x="230" y="175" fontSize="10" fill="#6366f1" fontWeight="600">Step 1</text>
          <text x="315" y="175" fontSize="10" fill="#6366f1" fontWeight="600">Step 2</text>
          <text x="460" y="175" fontSize="10" fill="#6366f1" fontWeight="600">Step 3</text>
          <text x="545" y="175" fontSize="10" fill="#6366f1" fontWeight="600">Step 4</text>
          <rect x="50" y="330" width="130" height="55" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
          <text x="115" y="355" fontSize="12" fontWeight="600" fill="#ef4444" textAnchor="middle">Cancel</text>
          <text x="115" y="372" fontSize="12" fontWeight="600" fill="#ef4444" textAnchor="middle">Inventory</text>
          <rect x="220" y="330" width="130" height="55" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
          <text x="285" y="355" fontSize="12" fontWeight="600" fill="#ef4444" textAnchor="middle">Refund</text>
          <text x="285" y="372" fontSize="12" fontWeight="600" fill="#ef4444" textAnchor="middle">Payment</text>
          <line x1="115" y1="260" x2="115" y2="330" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowComp)" />
          <line x1="285" y1="260" x2="285" y2="330" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowComp)" />
          <text x="50" y="320" fontSize="10" fill="#ef4444" fontWeight="600">Compensate</text>
          <text x="220" y="320" fontSize="10" fill="#ef4444" fontWeight="600">Compensate</text>
          <text x="375" y="430" fontSize="12" fill="#6b7280" textAnchor="middle" fontStyle="italic">
            Orchestrated Transaction with Compensating Actions
          </text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Orchestration-Based Saga with State Machine
// ═══════════════════════════════════════════════════════════════════════════

// Saga coordinator using state machine
@Service
public class OrderSagaOrchestrator {

  @Autowired
  private InventoryService inventoryService;

  @Autowired
  private PaymentService paymentService;

  @Autowired
  private ShippingService shippingService;

  @Autowired
  private SagaStateRepository sagaStateRepository;

  public OrderResult processOrder(Order order) {
    SagaState saga = new SagaState(order.getId());
    saga.setState("STARTED");
    sagaStateRepository.save(saga);

    try {
      // Step 1: Reserve Inventory
      saga.setState("RESERVING_INVENTORY");
      ReservationResult reservation = inventoryService.reserveItems(order.getItems());
      saga.setReservationId(reservation.getId());
      sagaStateRepository.save(saga);

      // Step 2: Process Payment
      saga.setState("PROCESSING_PAYMENT");
      PaymentResult payment = paymentService.chargePayment(order.getPaymentInfo());
      saga.setPaymentId(payment.getId());
      sagaStateRepository.save(saga);

      // Step 3: Schedule Shipping
      saga.setState("SCHEDULING_SHIPPING");
      ShippingResult shipping = shippingService.scheduleShipping(order.getShippingAddress());
      saga.setShippingId(shipping.getId());
      sagaStateRepository.save(saga);

      // Success
      saga.setState("COMPLETED");
      sagaStateRepository.save(saga);
      return new OrderResult(true, "Order completed successfully");

    } catch (Exception e) {
      // Compensate in reverse order
      compensate(saga);
      return new OrderResult(false, "Order failed: " + e.getMessage());
    }
  }

  private void compensate(SagaState saga) {
    saga.setState("COMPENSATING");

    if (saga.getShippingId() != null) {
      shippingService.cancelShipping(saga.getShippingId());
    }

    if (saga.getPaymentId() != null) {
      paymentService.refundPayment(saga.getPaymentId());
    }

    if (saga.getReservationId() != null) {
      inventoryService.releaseReservation(saga.getReservationId());
    }

    saga.setState("COMPENSATED");
    sagaStateRepository.save(saga);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Choreography-Based Saga with Events
// ═══════════════════════════════════════════════════════════════════════════

// Event-driven saga with Kafka/RabbitMQ
@Service
public class OrderEventHandler {

  @Autowired
  private KafkaTemplate<String, Object> kafkaTemplate;

  @Autowired
  private OrderRepository orderRepository;

  // Step 1: Create order and publish event
  public void createOrder(Order order) {
    order.setStatus("PENDING");
    orderRepository.save(order);

    OrderCreatedEvent event = new OrderCreatedEvent(
      order.getId(),
      order.getItems(),
      order.getTotalAmount()
    );
    kafkaTemplate.send("order-events", event);
  }

  // Step 2: Listen to inventory reserved event
  @KafkaListener(topics = "inventory-events")
  public void handleInventoryReserved(InventoryReservedEvent event) {
    System.out.println("Inventory reserved: " + event.getOrderId());

    // Trigger payment
    PaymentRequestEvent paymentEvent = new PaymentRequestEvent(
      event.getOrderId(),
      event.getAmount()
    );
    kafkaTemplate.send("payment-events", paymentEvent);
  }

  // Step 3: Listen to payment processed event
  @KafkaListener(topics = "payment-events")
  public void handlePaymentProcessed(PaymentProcessedEvent event) {
    System.out.println("Payment processed: " + event.getOrderId());

    // Trigger shipping
    ShippingRequestEvent shippingEvent = new ShippingRequestEvent(
      event.getOrderId(),
      event.getAddress()
    );
    kafkaTemplate.send("shipping-events", shippingEvent);
  }

  // Handle failures - compensate
  @KafkaListener(topics = "payment-failed-events")
  public void handlePaymentFailed(PaymentFailedEvent event) {
    System.out.println("Payment failed, compensating: " + event.getOrderId());

    // Release inventory
    InventoryReleaseEvent releaseEvent = new InventoryReleaseEvent(
      event.getOrderId()
    );
    kafkaTemplate.send("inventory-events", releaseEvent);

    // Update order status
    Order order = orderRepository.findById(event.getOrderId()).get();
    order.setStatus("FAILED");
    orderRepository.save(order);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Saga State Persistence and Recovery
// ═══════════════════════════════════════════════════════════════════════════

// Saga state entity
@Entity
@Table(name = "saga_state")
public class SagaState {
  @Id
  private String sagaId;

  private String orderId;
  private String state;
  private String reservationId;
  private String paymentId;
  private String shippingId;

  private LocalDateTime startTime;
  private LocalDateTime lastUpdateTime;

  @ElementCollection
  private List<String> completedSteps = new ArrayList<>();

  // Getters and setters
}

// Saga recovery service
@Service
public class SagaRecoveryService {

  @Autowired
  private SagaStateRepository sagaStateRepository;

  @Scheduled(fixedDelay = 60000) // Every minute
  public void recoverStuckSagas() {
    LocalDateTime timeout = LocalDateTime.now().minusMinutes(10);

    List<SagaState> stuckSagas = sagaStateRepository
      .findByStateNotInAndLastUpdateTimeBefore(
        Arrays.asList("COMPLETED", "COMPENSATED"),
        timeout
      );

    for (SagaState saga : stuckSagas) {
      System.out.println("Recovering stuck saga: " + saga.getSagaId());

      // Retry or compensate based on state
      if (saga.getState().startsWith("PROCESSING")) {
        retrySaga(saga);
      } else {
        compensateSaga(saga);
      }
    }
  }

  private void retrySaga(SagaState saga) {
    // Retry logic based on current state
  }

  private void compensateSaga(SagaState saga) {
    // Compensate completed steps
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Idempotent Operations and Deduplication
// ═══════════════════════════════════════════════════════════════════════════

// Idempotent payment service
@Service
public class IdempotentPaymentService {

  @Autowired
  private PaymentRepository paymentRepository;

  public PaymentResult chargePayment(String idempotencyKey, PaymentInfo info) {
    // Check if already processed
    Optional<Payment> existing = paymentRepository
      .findByIdempotencyKey(idempotencyKey);

    if (existing.isPresent()) {
      System.out.println("Duplicate payment request, returning existing result");
      return new PaymentResult(existing.get());
    }

    // Process payment
    Payment payment = new Payment();
    payment.setIdempotencyKey(idempotencyKey);
    payment.setAmount(info.getAmount());
    payment.setStatus("COMPLETED");
    paymentRepository.save(payment);

    return new PaymentResult(payment);
  }

  public void refundPayment(String paymentId) {
    Payment payment = paymentRepository.findById(paymentId).get();

    // Check if already refunded
    if ("REFUNDED".equals(payment.getStatus())) {
      System.out.println("Payment already refunded");
      return;
    }

    payment.setStatus("REFUNDED");
    paymentRepository.save(payment);
  }
}`
    },
    {
      name: 'CQRS',
      icon: '📊',
      explanation: `Command Query Responsibility Segregation separates read and write operations into distinct models. Commands change state without returning data, while queries return data without changing state. Enables independent optimization and scaling of read and write workloads. Often combined with Event Sourcing for event-driven architectures.

Key Principles:
• Commands: State changes, business logic validation, domain events
• Queries: Read-optimized models, denormalized views, no business logic
• Different databases for reads and writes (polyglot persistence)
• Eventual consistency between command and query models

Benefits:
• Independent scaling of reads and writes
• Optimized data models for each use case
• Better security (separate read/write permissions)
• Multiple specialized read models from same data
• Simplified queries with denormalized views

Technologies: Axon Framework, Event Store, Kafka, separate RDBMS/NoSQL databases, materialized views, search engines (Elasticsearch).`,
      diagram: () => (
        <svg viewBox="0 0 750 400" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="commandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="queryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrow5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
            </marker>
            <marker id="arrowSync" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
            </marker>
          </defs>
          <text x="375" y="30" fontSize="18" fontWeight="bold" fill="#6366f1" textAnchor="middle">CQRS Pattern</text>
          <rect x="50" y="70" width="280" height="100" rx="12" fill="url(#commandGrad)" stroke="#4f46e5" strokeWidth="3" />
          <text x="190" y="105" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Command Side (Write)</text>
          <text x="190" y="130" fontSize="12" fill="white" opacity="0.9" textAnchor="middle">Business Logic</text>
          <text x="190" y="150" fontSize="12" fill="white" opacity="0.9" textAnchor="middle">State Changes</text>
          <rect x="420" y="70" width="280" height="100" rx="12" fill="url(#queryGrad)" stroke="#059669" strokeWidth="3" />
          <text x="560" y="105" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Query Side (Read)</text>
          <text x="560" y="130" fontSize="12" fill="white" opacity="0.9" textAnchor="middle">Optimized Views</text>
          <text x="560" y="150" fontSize="12" fill="white" opacity="0.9" textAnchor="middle">Denormalized Data</text>
          <rect x="80" y="230" width="220" height="60" rx="8" fill="#ddd6fe" stroke="#6366f1" strokeWidth="2" />
          <text x="190" y="255" fontSize="14" fontWeight="600" fill="#6366f1" textAnchor="middle">Write Database</text>
          <text x="190" y="275" fontSize="11" fill="#6b7280" textAnchor="middle">PostgreSQL • MySQL</text>
          <rect x="450" y="230" width="220" height="60" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
          <text x="560" y="255" fontSize="14" fontWeight="600" fill="#10b981" textAnchor="middle">Read Database</text>
          <text x="560" y="275" fontSize="11" fill="#6b7280" textAnchor="middle">MongoDB • Elasticsearch</text>
          <line x1="190" y1="170" x2="190" y2="230" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow5)" />
          <line x1="560" y1="170" x2="560" y2="230" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow5)" />
          <line x1="300" y1="260" x2="450" y2="260" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowSync)" />
          <text x="375" y="250" fontSize="11" fill="#f59e0b" fontWeight="600">Event</text>
          <text x="375" y="265" fontSize="11" fill="#f59e0b" fontWeight="600">Sync</text>
          <rect x="50" y="330" width="110" height="40" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="105" y="355" fontSize="12" fontWeight="600" fill="#6366f1" textAnchor="middle">CreateOrder</text>
          <rect x="180" y="330" width="110" height="40" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="235" y="355" fontSize="12" fontWeight="600" fill="#6366f1" textAnchor="middle">UpdateUser</text>
          <rect x="470" y="330" width="100" height="40" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
          <text x="520" y="355" fontSize="12" fontWeight="600" fill="#10b981" textAnchor="middle">GetOrders</text>
          <rect x="590" y="330" width="100" height="40" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
          <text x="640" y="355" fontSize="12" fontWeight="600" fill="#10b981" textAnchor="middle">GetUsers</text>
          <text x="375" y="395" fontSize="12" fill="#6b7280" textAnchor="middle" fontStyle="italic">
            Separate models for Write and Read operations
          </text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Command Model (Write Side)
// ═══════════════════════════════════════════════════════════════════════════

// Command - represents state change intent
public class CreateOrderCommand {
  private final String orderId;
  private final String customerId;
  private final List<OrderItem> items;
  private final BigDecimal totalAmount;

  // Constructor, getters
}

public class UpdateOrderStatusCommand {
  private final String orderId;
  private final String newStatus;

  // Constructor, getters
}

// Command Handler - processes commands
@Service
public class OrderCommandHandler {

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private EventPublisher eventPublisher;

  @Transactional
  public void handle(CreateOrderCommand command) {
    // Validate business rules
    if (command.getTotalAmount().compareTo(BigDecimal.ZERO) <= 0) {
      throw new InvalidOrderException("Total amount must be positive");
    }

    // Create aggregate
    Order order = new Order(
      command.getOrderId(),
      command.getCustomerId(),
      command.getItems()
    );

    // Save to write database
    orderRepository.save(order);

    // Publish domain event
    OrderCreatedEvent event = new OrderCreatedEvent(
      order.getId(),
      order.getCustomerId(),
      order.getItems(),
      order.getTotalAmount(),
      LocalDateTime.now()
    );
    eventPublisher.publish(event);
  }

  @Transactional
  public void handle(UpdateOrderStatusCommand command) {
    Order order = orderRepository.findById(command.getOrderId())
      .orElseThrow(() -> new OrderNotFoundException());

    order.updateStatus(command.getNewStatus());
    orderRepository.save(order);

    eventPublisher.publish(new OrderStatusUpdatedEvent(
      order.getId(),
      command.getNewStatus(),
      LocalDateTime.now()
    ));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Query Model (Read Side)
// ═══════════════════════════════════════════════════════════════════════════

// Query DTOs - optimized for reads
public class OrderSummaryDto {
  private String orderId;
  private String customerName;
  private String status;
  private BigDecimal totalAmount;
  private LocalDateTime createdAt;
  private int itemCount;

  // Getters and setters
}

public class CustomerOrderHistoryDto {
  private String customerId;
  private String customerName;
  private List<OrderSummaryDto> orders;
  private BigDecimal totalSpent;

  // Getters and setters
}

// Query Repository - denormalized read model
@Repository
public interface OrderQueryRepository extends JpaRepository<OrderReadModel, String> {
  List<OrderReadModel> findByCustomerId(String customerId);
  List<OrderReadModel> findByStatus(String status);
  List<OrderReadModel> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}

// Query Handler
@Service
public class OrderQueryHandler {

  @Autowired
  private OrderQueryRepository queryRepository;

  public OrderSummaryDto getOrderSummary(String orderId) {
    OrderReadModel model = queryRepository.findById(orderId)
      .orElseThrow(() -> new OrderNotFoundException());

    return mapToSummaryDto(model);
  }

  public CustomerOrderHistoryDto getCustomerOrderHistory(String customerId) {
    List<OrderReadModel> orders = queryRepository.findByCustomerId(customerId);

    CustomerOrderHistoryDto dto = new CustomerOrderHistoryDto();
    dto.setCustomerId(customerId);
    dto.setCustomerName(orders.get(0).getCustomerName());
    dto.setOrders(orders.stream()
      .map(this::mapToSummaryDto)
      .collect(Collectors.toList()));
    dto.setTotalSpent(orders.stream()
      .map(OrderReadModel::getTotalAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add));

    return dto;
  }

  private OrderSummaryDto mapToSummaryDto(OrderReadModel model) {
    OrderSummaryDto dto = new OrderSummaryDto();
    dto.setOrderId(model.getId());
    dto.setCustomerName(model.getCustomerName());
    dto.setStatus(model.getStatus());
    dto.setTotalAmount(model.getTotalAmount());
    dto.setCreatedAt(model.getCreatedAt());
    dto.setItemCount(model.getItemCount());
    return dto;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Event-Driven Synchronization
// ═══════════════════════════════════════════════════════════════════════════

// Event listener updates read model
@Service
public class OrderReadModelProjection {

  @Autowired
  private OrderQueryRepository queryRepository;

  @Autowired
  private CustomerService customerService;

  @EventListener
  @Async
  public void on(OrderCreatedEvent event) {
    // Build denormalized read model
    Customer customer = customerService.getCustomer(event.getCustomerId());

    OrderReadModel readModel = new OrderReadModel();
    readModel.setId(event.getOrderId());
    readModel.setCustomerId(event.getCustomerId());
    readModel.setCustomerName(customer.getName());
    readModel.setCustomerEmail(customer.getEmail());
    readModel.setStatus("PENDING");
    readModel.setTotalAmount(event.getTotalAmount());
    readModel.setItemCount(event.getItems().size());
    readModel.setCreatedAt(event.getTimestamp());

    // Save to read database (could be different DB)
    queryRepository.save(readModel);

    System.out.println("Read model updated for order: " + event.getOrderId());
  }

  @EventListener
  @Async
  public void on(OrderStatusUpdatedEvent event) {
    OrderReadModel readModel = queryRepository.findById(event.getOrderId())
      .orElseThrow();

    readModel.setStatus(event.getNewStatus());
    readModel.setLastModifiedAt(event.getTimestamp());

    queryRepository.save(readModel);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Separate Controllers for Commands and Queries
// ═══════════════════════════════════════════════════════════════════════════

// Command Controller - write operations
@RestController
@RequestMapping("/api/orders/commands")
public class OrderCommandController {

  @Autowired
  private OrderCommandHandler commandHandler;

  @PostMapping
  public ResponseEntity<Void> createOrder(@RequestBody CreateOrderRequest request) {
    CreateOrderCommand command = new CreateOrderCommand(
      UUID.randomUUID().toString(),
      request.getCustomerId(),
      request.getItems(),
      request.getTotalAmount()
    );

    commandHandler.handle(command);

    return ResponseEntity.accepted().build(); // 202 Accepted
  }

  @PutMapping("/{orderId}/status")
  public ResponseEntity<Void> updateStatus(
      @PathVariable String orderId,
      @RequestBody UpdateStatusRequest request) {

    UpdateOrderStatusCommand command = new UpdateOrderStatusCommand(
      orderId,
      request.getNewStatus()
    );

    commandHandler.handle(command);

    return ResponseEntity.accepted().build();
  }
}

// Query Controller - read operations
@RestController
@RequestMapping("/api/orders/queries")
public class OrderQueryController {

  @Autowired
  private OrderQueryHandler queryHandler;

  @GetMapping("/{orderId}")
  public ResponseEntity<OrderSummaryDto> getOrder(@PathVariable String orderId) {
    OrderSummaryDto order = queryHandler.getOrderSummary(orderId);
    return ResponseEntity.ok(order);
  }

  @GetMapping("/customer/{customerId}")
  public ResponseEntity<CustomerOrderHistoryDto> getCustomerOrders(
      @PathVariable String customerId) {
    CustomerOrderHistoryDto history = queryHandler
      .getCustomerOrderHistory(customerId);
    return ResponseEntity.ok(history);
  }
}
// Output: Commands return 202 Accepted, Queries return 200 OK with data`
    },
    {
      name: 'Event Sourcing',
      icon: '📜',
      explanation: `Stores all changes to application state as a sequence of immutable events rather than just the current state. Events are facts that happened in the past and cannot be changed. Current state is derived by replaying events from the event store. Provides complete audit trail, temporal queries, and ability to rebuild state at any point in time.

Core Concepts:
• Event Store: Append-only log of domain events (OrderCreated, ItemAdded, OrderShipped)
• Event Replay: Rebuild aggregate state by replaying events in sequence
• Snapshots: Performance optimization, periodic state captures
• Projections: Derive read models from event stream

Benefits:
• Complete audit trail and history
• Time travel - query state at any point
• Event-driven integration
• Debugging and troubleshooting
• What-if analysis and replay

Challenges: Complexity, eventual consistency, event versioning, query difficulty, steep learning curve.

Technologies: Event Store DB, Axon Framework, Kafka, custom implementations, Greg Young's Event Store.`,
      diagram: () => (
        <svg viewBox="0 0 800 400" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="eventStoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="eventGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrow6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>
          <text x="400" y="30" fontSize="18" fontWeight="bold" fill="#6366f1" textAnchor="middle">Event Sourcing Pattern</text>
          <rect x="50" y="60" width="700" height="120" rx="10" fill="url(#eventStoreGrad)" stroke="#4f46e5" strokeWidth="3" />
          <text x="400" y="90" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Event Store - Append-Only Log</text>
          <rect x="70" y="110" width="130" height="50" rx="6" fill="url(#eventGrad)" />
          <text x="135" y="135" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Event 1:</text>
          <text x="135" y="150" fontSize="10" fill="white" opacity="0.9" textAnchor="middle">OrderCreated</text>
          <rect x="220" y="110" width="130" height="50" rx="6" fill="url(#eventGrad)" />
          <text x="285" y="135" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Event 2:</text>
          <text x="285" y="150" fontSize="10" fill="white" opacity="0.9" textAnchor="middle">ItemAdded</text>
          <rect x="370" y="110" width="130" height="50" rx="6" fill="url(#eventGrad)" />
          <text x="435" y="135" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Event 3:</text>
          <text x="435" y="150" fontSize="10" fill="white" opacity="0.9" textAnchor="middle">PaymentMade</text>
          <rect x="520" y="110" width="130" height="50" rx="6" fill="url(#eventGrad)" />
          <text x="585" y="135" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Event 4:</text>
          <text x="585" y="150" fontSize="10" fill="white" opacity="0.9" textAnchor="middle">OrderShipped</text>
          <text x="680" y="140" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">→</text>
          <line x1="400" y1="180" x2="400" y2="230" stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrow6)" />
          <text x="420" y="210" fontSize="12" fill="#6366f1" fontWeight="600">Replay Events</text>
          <rect x="250" y="250" width="300" height="80" rx="10" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <text x="400" y="280" fontSize="15" fontWeight="bold" fill="#6366f1" textAnchor="middle">Current State</text>
          <text x="400" y="305" fontSize="12" fill="#6b7280" textAnchor="middle">Order: Shipped</text>
          <text x="400" y="322" fontSize="12" fill="#6b7280" textAnchor="middle">Items: [Product A], Payment: Completed</text>
          <rect x="600" y="250" width="150" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="675" y="280" fontSize="13" fontWeight="bold" fill="#f59e0b" textAnchor="middle">Snapshot</text>
          <text x="675" y="302" fontSize="10" fill="#6b7280" textAnchor="middle">(Performance</text>
          <text x="675" y="318" fontSize="10" fill="#6b7280" textAnchor="middle">Optimization)</text>
          <text x="400" y="380" fontSize="12" fill="#6b7280" textAnchor="middle" fontStyle="italic">
            Event Stream → Current State (Complete Audit Trail)
          </text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Domain Events Definition
// ═══════════════════════════════════════════════════════════════════════════

// Domain events - immutable facts
public class OrderCreatedEvent {
  private final String orderId;
  private final String customerId;
  private final LocalDateTime timestamp;

  public OrderCreatedEvent(String orderId, String customerId, LocalDateTime timestamp) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.timestamp = timestamp;
  }

  // Only getters, no setters (immutable)
  public String getOrderId() { return orderId; }
  public String getCustomerId() { return customerId; }
  public LocalDateTime getTimestamp() { return timestamp; }
}

public class ItemAddedEvent {
  private final String orderId;
  private final String productId;
  private final int quantity;
  private final BigDecimal price;
  private final LocalDateTime timestamp;

  // Constructor and getters only
}

public class OrderShippedEvent {
  private final String orderId;
  private final String trackingNumber;
  private final LocalDateTime timestamp;

  // Constructor and getters only
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Event Store Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Event store entity
@Entity
@Table(name = "event_store")
public class StoredEvent {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long sequence;

  private String aggregateId;
  private String eventType;

  @Lob
  private String eventData; // JSON serialized event

  private LocalDateTime timestamp;
  private Long version;

  // Getters and setters
}

// Event store repository
@Repository
public interface EventStoreRepository extends JpaRepository<StoredEvent, Long> {
  List<StoredEvent> findByAggregateIdOrderByVersionAsc(String aggregateId);
  List<StoredEvent> findByAggregateIdAndVersionGreaterThanOrderByVersionAsc(
    String aggregateId, Long version
  );
}

// Event store service
@Service
public class EventStore {

  @Autowired
  private EventStoreRepository repository;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ApplicationEventPublisher eventPublisher;

  @Transactional
  public void saveEvent(String aggregateId, Object event) {
    StoredEvent storedEvent = new StoredEvent();
    storedEvent.setAggregateId(aggregateId);
    storedEvent.setEventType(event.getClass().getSimpleName());
    storedEvent.setEventData(serializeEvent(event));
    storedEvent.setTimestamp(LocalDateTime.now());
    storedEvent.setVersion(getNextVersion(aggregateId));

    repository.save(storedEvent);

    // Publish event for projections
    eventPublisher.publishEvent(event);
  }

  public List<Object> getEvents(String aggregateId) {
    return repository.findByAggregateIdOrderByVersionAsc(aggregateId)
      .stream()
      .map(this::deserializeEvent)
      .collect(Collectors.toList());
  }

  private String serializeEvent(Object event) {
    try {
      return objectMapper.writeValueAsString(event);
    } catch (Exception e) {
      throw new RuntimeException("Failed to serialize event", e);
    }
  }

  private Object deserializeEvent(StoredEvent stored) {
    try {
      Class<?> eventClass = Class.forName("com.example.events." + stored.getEventType());
      return objectMapper.readValue(stored.getEventData(), eventClass);
    } catch (Exception e) {
      throw new RuntimeException("Failed to deserialize event", e);
    }
  }

  private Long getNextVersion(String aggregateId) {
    return repository.findByAggregateIdOrderByVersionAsc(aggregateId)
      .stream()
      .mapToLong(StoredEvent::getVersion)
      .max()
      .orElse(0L) + 1;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Event-Sourced Aggregate
// ═══════════════════════════════════════════════════════════════════════════

// Aggregate root - state from events
public class Order {
  private String id;
  private String customerId;
  private List<OrderItem> items = new ArrayList<>();
  private String status;
  private BigDecimal totalAmount = BigDecimal.ZERO;

  private List<Object> uncommittedEvents = new ArrayList<>();

  // Replay events to rebuild state
  public void replay(List<Object> events) {
    for (Object event : events) {
      apply(event);
    }
  }

  // Apply event to change state
  private void apply(Object event) {
    if (event instanceof OrderCreatedEvent) {
      OrderCreatedEvent e = (OrderCreatedEvent) event;
      this.id = e.getOrderId();
      this.customerId = e.getCustomerId();
      this.status = "CREATED";
    } else if (event instanceof ItemAddedEvent) {
      ItemAddedEvent e = (ItemAddedEvent) event;
      this.items.add(new OrderItem(e.getProductId(), e.getQuantity(), e.getPrice()));
      this.totalAmount = this.totalAmount.add(e.getPrice().multiply(
        BigDecimal.valueOf(e.getQuantity())
      ));
    } else if (event instanceof OrderShippedEvent) {
      this.status = "SHIPPED";
    }
  }

  // Command methods that generate events
  public void create(String customerId) {
    OrderCreatedEvent event = new OrderCreatedEvent(
      this.id,
      customerId,
      LocalDateTime.now()
    );
    apply(event);
    uncommittedEvents.add(event);
  }

  public void addItem(String productId, int quantity, BigDecimal price) {
    ItemAddedEvent event = new ItemAddedEvent(
      this.id,
      productId,
      quantity,
      price,
      LocalDateTime.now()
    );
    apply(event);
    uncommittedEvents.add(event);
  }

  public List<Object> getUncommittedEvents() {
    return uncommittedEvents;
  }

  public void markEventsAsCommitted() {
    uncommittedEvents.clear();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Aggregate Repository with Event Sourcing
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class OrderRepository {

  @Autowired
  private EventStore eventStore;

  public Order findById(String orderId) {
    List<Object> events = eventStore.getEvents(orderId);

    if (events.isEmpty()) {
      return null;
    }

    Order order = new Order();
    order.replay(events);
    return order;
  }

  @Transactional
  public void save(Order order) {
    List<Object> events = order.getUncommittedEvents();

    for (Object event : events) {
      eventStore.saveEvent(order.getId(), event);
    }

    order.markEventsAsCommitted();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Snapshots for Performance
// ═══════════════════════════════════════════════════════════════════════════

// Snapshot entity
@Entity
@Table(name = "snapshots")
public class Snapshot {
  @Id
  private String aggregateId;

  @Lob
  private String state;

  private Long version;
  private LocalDateTime timestamp;

  // Getters and setters
}

// Snapshot repository
@Repository
public interface SnapshotRepository extends JpaRepository<Snapshot, String> {
}

// Enhanced repository with snapshots
@Service
public class OptimizedOrderRepository {

  @Autowired
  private EventStore eventStore;

  @Autowired
  private SnapshotRepository snapshotRepository;

  @Autowired
  private ObjectMapper objectMapper;

  private static final int SNAPSHOT_FREQUENCY = 100;

  public Order findById(String orderId) {
    // Load from snapshot if available
    Optional<Snapshot> snapshot = snapshotRepository.findById(orderId);

    Order order = new Order();
    Long fromVersion = 0L;

    if (snapshot.isPresent()) {
      order = deserializeSnapshot(snapshot.get());
      fromVersion = snapshot.get().getVersion();
    }

    // Load events after snapshot
    List<Object> events = eventStore.getEventsAfterVersion(orderId, fromVersion);
    order.replay(events);

    return order;
  }

  @Transactional
  public void save(Order order) {
    List<Object> events = order.getUncommittedEvents();

    for (Object event : events) {
      eventStore.saveEvent(order.getId(), event);
    }

    // Create snapshot periodically
    Long totalEvents = eventStore.getEventCount(order.getId());
    if (totalEvents % SNAPSHOT_FREQUENCY == 0) {
      createSnapshot(order, totalEvents);
    }

    order.markEventsAsCommitted();
  }

  private void createSnapshot(Order order, Long version) {
    Snapshot snapshot = new Snapshot();
    snapshot.setAggregateId(order.getId());
    snapshot.setState(serializeOrder(order));
    snapshot.setVersion(version);
    snapshot.setTimestamp(LocalDateTime.now());

    snapshotRepository.save(snapshot);
    System.out.println("Snapshot created at version: " + version);
  }

  private String serializeOrder(Order order) {
    try {
      return objectMapper.writeValueAsString(order);
    } catch (Exception e) {
      throw new RuntimeException("Failed to serialize snapshot", e);
    }
  }

  private Order deserializeSnapshot(Snapshot snapshot) {
    try {
      return objectMapper.readValue(snapshot.getState(), Order.class);
    } catch (Exception e) {
      throw new RuntimeException("Failed to deserialize snapshot", e);
    }
  }
}
// Output: Snapshots reduce event replay time for long event streams`
    },
    {
      name: 'Sidecar Pattern',
      icon: '🛸',
      explanation: `Deploys a helper component alongside the main application in the same host/pod to provide supporting features. The sidecar runs in a separate process but shares resources with the main application. Decouples cross-cutting concerns from application code, enabling polyglot microservices. Foundation for service mesh architectures.

Common Use Cases:
• Service mesh proxies (Envoy, Linkerd)
• Logging and monitoring agents
• Configuration watchers and reloaders
• Security enforcers and authentication
• Circuit breakers and retry logic
• Protocol translation and TLS termination
• Service discovery clients

Benefits:
• Technology agnostic (works with any language)
• Reusable across all services
• Independent versioning and updates
• Reduces application complexity
• Centralized configuration
• Consistent behavior across services

Deployment: Kubernetes sidecar containers, Docker Compose multi-container, same lifecycle management.`,
      diagram: () => (
        <svg viewBox="0 0 700 450" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="podGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#e0e7ff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#c7d2fe', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="mainAppGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="sidecarAppGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrow7" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>
          <text x="350" y="30" fontSize="18" fontWeight="bold" fill="#6366f1" textAnchor="middle">Sidecar Pattern - Kubernetes Pod</text>
          <rect x="50" y="60" width="600" height="330" rx="15" fill="url(#podGrad)" stroke="#6366f1" strokeWidth="3" strokeDasharray="10,5" />
          <text x="350" y="90" fontSize="14" fontWeight="600" fill="#6366f1" textAnchor="middle">Pod (Shared Resources & Network)</text>
          <rect x="100" y="120" width="220" height="230" rx="12" fill="url(#mainAppGrad)" stroke="#4f46e5" strokeWidth="3" />
          <text x="210" y="155" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Main Application</text>
          <text x="210" y="180" fontSize="12" fill="white" opacity="0.9" textAnchor="middle">Business Logic</text>
          <rect x="120" y="200" width="180" height="40" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="210" y="225" fontSize="11" fontWeight="600" fill="#6366f1" textAnchor="middle">Core Functionality</text>
          <rect x="120" y="255" width="180" height="40" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="210" y="280" fontSize="11" fontWeight="600" fill="#6366f1" textAnchor="middle">REST API</text>
          <rect x="120" y="310" width="180" height="30" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="210" y="330" fontSize="10" fontWeight="600" fill="#6366f1" textAnchor="middle">Port: 8080</text>
          <rect x="380" y="120" width="220" height="230" rx="12" fill="url(#sidecarAppGrad)" stroke="#6366f1" strokeWidth="3" />
          <text x="490" y="155" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Sidecar Container</text>
          <text x="490" y="180" fontSize="12" fill="white" opacity="0.9" textAnchor="middle">Cross-Cutting Concerns</text>
          <rect x="400" y="200" width="180" height="30" rx="6" fill="#ddd6fe" stroke="#6366f1" strokeWidth="1.5" />
          <text x="490" y="220" fontSize="10" fontWeight="600" fill="#4f46e5" textAnchor="middle">Logging Agent</text>
          <rect x="400" y="240" width="180" height="30" rx="6" fill="#ddd6fe" stroke="#6366f1" strokeWidth="1.5" />
          <text x="490" y="260" fontSize="10" fontWeight="600" fill="#4f46e5" textAnchor="middle">Metrics Collector</text>
          <rect x="400" y="280" width="180" height="30" rx="6" fill="#ddd6fe" stroke="#6366f1" strokeWidth="1.5" />
          <text x="490" y="300" fontSize="10" fontWeight="600" fill="#4f46e5" textAnchor="middle">Service Mesh Proxy</text>
          <rect x="400" y="320" width="180" height="20" rx="4" fill="#ddd6fe" stroke="#6366f1" strokeWidth="1.5" />
          <text x="490" y="334" fontSize="9" fontWeight="600" fill="#4f46e5" textAnchor="middle">Config Watcher</text>
          <line x1="320" y1="250" x2="380" y2="250" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow7)" />
          <text x="350" y="240" fontSize="10" fill="#6366f1" fontWeight="600">Shared</text>
          <text x="350" y="253" fontSize="10" fill="#6366f1" fontWeight="600">Volume</text>
          <text x="350" y="420" fontSize="12" fill="#6b7280" textAnchor="middle" fontStyle="italic">
            Main App + Sidecar sharing same Pod resources
          </text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Kubernetes Sidecar Container Configuration
// ═══════════════════════════════════════════════════════════════════════════

// Kubernetes Deployment with Sidecar
/*
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: order-service
    spec:
      containers:
      # Main application container
      - name: order-service
        image: order-service:1.0
        ports:
        - containerPort: 8080
        volumeMounts:
        - name: shared-logs
          mountPath: /var/log/app

      # Logging sidecar
      - name: log-aggregator
        image: fluentd:latest
        volumeMounts:
        - name: shared-logs
          mountPath: /var/log/app
        env:
        - name: FLUENT_ELASTICSEARCH_HOST
          value: "elasticsearch.default.svc.cluster.local"

      # Envoy proxy sidecar
      - name: envoy-proxy
        image: envoyproxy/envoy:latest
        ports:
        - containerPort: 9901
        volumeMounts:
        - name: envoy-config
          mountPath: /etc/envoy

      volumes:
      - name: shared-logs
        emptyDir: {}
      - name: envoy-config
        configMap:
          name: envoy-config
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Main Application with Sidecar Communication
// ═══════════════════════════════════════════════════════════════════════════

// Main application - unaware of sidecar
@RestController
@RequestMapping("/api/orders")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @GetMapping("/{id}")
  public Order getOrder(@PathVariable String id) {
    // Application logic only
    // Sidecar handles:
    // - Request logging
    // - Metrics collection
    // - Distributed tracing
    // - Authentication (via service mesh)
    return orderService.getOrder(id);
  }

  @PostMapping
  public Order createOrder(@RequestBody CreateOrderRequest request) {
    // Sidecar automatically:
    // - Adds correlation ID
    // - Enforces rate limits
    // - Handles retries
    // - Circuit breaking
    return orderService.createOrder(request);
  }
}

// Service calls go through sidecar proxy
@Service
public class OrderService {

  // Call other services via localhost sidecar
  private static final String INVENTORY_SERVICE = "http://localhost:15001/api/inventory";

  @Autowired
  private RestTemplate restTemplate;

  public Order createOrder(CreateOrderRequest request) {
    // Sidecar intercepts this call and:
    // 1. Resolves service discovery
    // 2. Load balances across instances
    // 3. Handles TLS encryption
    // 4. Adds tracing headers
    InventoryResponse inventory = restTemplate.getForObject(
      INVENTORY_SERVICE + "/check?productId=" + request.getProductId(),
      InventoryResponse.class
    );

    // Create order logic
    Order order = new Order();
    order.setId(UUID.randomUUID().toString());
    order.setProductId(request.getProductId());
    return order;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Envoy Proxy Sidecar Configuration
// ═══════════════════════════════════════════════════════════════════════════

// Envoy sidecar configuration (envoy.yaml)
/*
static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address:
        address: 0.0.0.0
        port_value: 15001
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: inventory_service
              domains: ["*"]
              routes:
              - match:
                  prefix: "/api/inventory"
                route:
                  cluster: inventory_cluster
          http_filters:
          - name: envoy.filters.http.router

  clusters:
  - name: inventory_cluster
    connect_timeout: 0.25s
    type: STRICT_DNS
    lb_policy: ROUND_ROBIN
    load_assignment:
      cluster_name: inventory_cluster
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: inventory-service.default.svc.cluster.local
                port_value: 8080
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Logging Sidecar Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Docker Compose with logging sidecar
/*
version: '3.8'

services:
  # Main application
  order-service:
    image: order-service:1.0
    ports:
      - "8080:8080"
    volumes:
      - shared-logs:/var/log/app
    environment:
      - LOG_PATH=/var/log/app/application.log

  # Logging sidecar
  fluentd:
    image: fluentd:latest
    volumes:
      - shared-logs:/var/log/app
      - ./fluentd.conf:/fluentd/etc/fluent.conf
    depends_on:
      - order-service
    environment:
      - ELASTICSEARCH_HOST=elasticsearch
      - ELASTICSEARCH_PORT=9200

volumes:
  shared-logs:
*/

// Fluentd configuration (fluentd.conf)
/*
<source>
  @type tail
  path /var/log/app/*.log
  pos_file /var/log/app/fluentd.pos
  tag app.logs
  <parse>
    @type json
    time_key timestamp
    time_format %Y-%m-%dT%H:%M:%S.%L%z
  </parse>
</source>

<filter app.logs>
  @type record_transformer
  <record>
    service_name "order-service"
    environment "production"
  </record>
</filter>

<match app.logs>
  @type elasticsearch
  host \#{ENV['ELASTICSEARCH_HOST']}
  port \#{ENV['ELASTICSEARCH_PORT']}
  logstash_format true
  logstash_prefix app-logs
</match>
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Config Watcher Sidecar
// ═══════════════════════════════════════════════════════════════════════════

// Config watcher sidecar - watches for config changes
public class ConfigWatcherSidecar {

  private static final String SHARED_CONFIG_PATH = "/etc/config/application.yml";
  private static final String APP_RELOAD_URL = "http://localhost:8080/actuator/refresh";

  public static void main(String[] args) throws Exception {
    WatchService watchService = FileSystems.getDefault().newWatchService();
    Path configDir = Paths.get("/etc/config");

    configDir.register(
      watchService,
      StandardWatchEventKinds.ENTRY_MODIFY
    );

    System.out.println("Config watcher sidecar started");

    while (true) {
      WatchKey key = watchService.take();

      for (WatchEvent<?> event : key.pollEvents()) {
        if (event.context().toString().equals("application.yml")) {
          System.out.println("Config file changed, reloading app...");

          // Trigger app reload via HTTP
          HttpClient client = HttpClient.newHttpClient();
          HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(APP_RELOAD_URL))
            .POST(HttpRequest.BodyPublishers.noBody())
            .build();

          HttpResponse<String> response = client.send(
            request,
            HttpResponse.BodyHandlers.ofString()
          );

          System.out.println("App reload response: " + response.statusCode());
        }
      }

      key.reset();
    }
  }
}

// Kubernetes ConfigMap mount for sidecar
/*
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  application.yml: |
    server:
      port: 8080
    app:
      feature:
        enabled: true
---
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
      - name: order-service
        volumeMounts:
        - name: config
          mountPath: /etc/config

      - name: config-watcher
        image: config-watcher:latest
        volumeMounts:
        - name: config
          mountPath: /etc/config

      volumes:
      - name: config
        configMap:
          name: app-config
*/`
    }
  ]

  // Use ref to access current selectedConcept in event handler
  const selectedConceptRef = useRef(selectedConcept)
  useEffect(() => {
    selectedConceptRef.current = selectedConcept
  }, [selectedConcept])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentSelectedConcept = selectedConceptRef.current

      // Handle Escape to go back
      if (e.key === 'Escape') {
        if (currentSelectedConcept) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedConcept(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }


  return (
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        padding: '2rem',
        maxWidth: '1600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        border: '3px solid rgba(99, 102, 241, 0.4)'
      }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            ref={firstFocusableRef}
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            ← Back to Menu
          </button>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1f2937',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              🏗️ Microservice Patterns
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '6px',
                marginTop: '0.25rem',
                display: 'inline-block'
              }}>
                {currentSubcategory}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(99, 102, 241, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Microservice patterns are proven architectural solutions for building distributed systems.
          These patterns address common challenges like service communication, data management, resilience, and deployment.
        </p>
      </div>


      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          microservicePatterns.map((pattern, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(pattern)}
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid rgba(99, 102, 241, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'
                e.currentTarget.style.borderColor = '#6366f1'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(99, 102, 241, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{pattern.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#6366f1',
                  margin: '0 0 0.5rem 0'
                }}>
                  {pattern.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {pattern.explanation.substring(0, 100)}...
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#6366f1',
                marginTop: '1rem'
              }}>
                Click to explore →
              </div>
            </div>
          ))
        ) : (
          <>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                Microservice Patterns
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {microservicePatterns.map((pattern, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleConceptClick(pattern)}
                    style={{
                      backgroundColor: selectedConcept?.name === pattern.name
                        ? 'rgba(99, 102, 241, 0.15)'
                        : 'rgba(99, 102, 241, 0.05)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedConcept?.name === pattern.name
                        ? '3px solid #6366f1'
                        : '2px solid rgba(99, 102, 241, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedConcept?.name !== pattern.name) {
                        e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedConcept?.name !== pattern.name) {
                        e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)'
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{pattern.icon}</span>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: selectedConcept?.name === pattern.name ? '#6366f1' : '#1f2937'
                      }}>
                        {pattern.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#6366f1',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h3>

              {selectedConcept.diagram && (
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(99, 102, 241, 0.2)',
                  marginBottom: '1.5rem'
                }}>
                  {selectedConcept.diagram()}
                </div>
              )}

              <div style={{
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                marginBottom: '1.5rem'
              }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#374151',
                  fontWeight: '500',
                  margin: 0,
                  lineHeight: '1.7',
                  whiteSpace: 'pre-line',
                  textAlign: 'justify'
                }}>
                  {selectedConcept.explanation}
                </p>
              </div>

              <div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#6366f1',
                  margin: '0 0 1rem 0'
                }}>
                  💻 Code Examples
                </h4>
                {(() => {
                  const sections = parseCodeSections(selectedConcept.codeExample)
                  if (sections.length === 0) {
                    return (
                      <div style={{
                        backgroundColor: '#1e293b',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '2px solid #334155'
                      }}>
                        <SyntaxHighlighter code={selectedConcept.codeExample} />
                      </div>
                    )
                  }
                  return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {sections.map((section, index) => {
                        const sectionKey = `${selectedConcept.name}-${index}`
                        const isExpanded = expandedSections[sectionKey]
                        return (
                          <div
                            key={index}
                            style={{
                              backgroundColor: 'white',
                              borderRadius: '12px',
                              border: '2px solid rgba(99, 102, 241, 0.3)',
                              overflow: 'hidden'
                            }}
                          >
                            <button
                              onClick={() => toggleSection(sectionKey)}
                              style={{
                                width: '100%',
                                padding: '1.25rem',
                                backgroundColor: isExpanded ? 'rgba(99, 102, 241, 0.15)' : 'white',
                                border: 'none',
                                borderBottom: isExpanded ? '2px solid rgba(99, 102, 241, 0.3)' : 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                                textAlign: 'left'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.15)'
                              }}
                              onMouseLeave={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.style.backgroundColor = 'white'
                                }
                              }}
                            >
                              <span style={{
                                fontSize: '1.05rem',
                                fontWeight: '700',
                                color: '#6366f1'
                              }}>
                                {section.title}
                              </span>
                              <span style={{
                                fontSize: '1.5rem',
                                color: '#6366f1',
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                              }}>
                                ▼
                              </span>
                            </button>
                            {isExpanded && (
                              <div style={{
                                backgroundColor: '#1e293b',
                                padding: '1.5rem'
                              }}>
                                <SyntaxHighlighter code={section.code} />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MicroservicePatterns
